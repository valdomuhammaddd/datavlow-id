import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, isWaterStatus, toFiniteNumber } from "@/lib/api/validate";
import { runFuzzyMamdani } from "@/lib/fuzzy/mamdani";
import {
  categorizeCommand,
  formatTelegramAlert,
  parseTelegramUpdate,
  type TelegramAlertCategory,
} from "@/lib/simulation/telegram";
import type { WaterStatus } from "@/types/database.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Telegram bot alert simulation.
 *
 * Accepts either:
 * 1) Native Telegram Update JSON (webhook), or
 * 2) Direct simulation payload:
 *    { category?, ph, tds, turbidity, temp, chat_id?, deviceName? }
 */
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;

    const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (secret) {
      const header = request.headers.get("x-telegram-bot-api-secret-token");
      if (header !== secret) {
        return jsonError("Unauthorized webhook", 401);
      }
    }

    // Path A: Telegram Update
    const update = parseTelegramUpdate(body.data);
    if (update.kind !== "unknown") {
      return handleTelegramUpdate(update);
    }

    // Path B: Direct simulation / internal alert dispatch
    if (!isObject(body.data)) {
      return jsonError("Payload must be a JSON object", 400);
    }

    const ph = toFiniteNumber(body.data.ph);
    const tds = toFiniteNumber(body.data.tds);
    const turbidity = toFiniteNumber(body.data.turbidity);
    const temp = toFiniteNumber(body.data.temp);

    let category: TelegramAlertCategory | undefined = isWaterStatus(
      body.data.category,
    )
      ? body.data.category
      : undefined;

    let action_message =
      typeof body.data.action_message === "string"
        ? body.data.action_message
        : undefined;

    if (!category && ph != null && tds != null && turbidity != null) {
      const fuzzy = runFuzzyMamdani({ ph, tds, turbidity });
      category = fuzzy.water_status;
      action_message = action_message ?? fuzzy.action_message;
    }

    if (!category) {
      return jsonError(
        "Provide category or ph/tds/turbidity for classification",
        400,
      );
    }

    const message = formatTelegramAlert({
      category,
      ph: ph ?? undefined,
      tds: tds ?? undefined,
      turbidity: turbidity ?? undefined,
      temp: temp ?? undefined,
      action_message,
      deviceName:
        typeof body.data.deviceName === "string"
          ? body.data.deviceName
          : undefined,
    });

    message.chat_id =
      typeof body.data.chat_id === "string" || typeof body.data.chat_id === "number"
        ? body.data.chat_id
        : process.env.TELEGRAM_DEFAULT_CHAT_ID;

    const delivery = await maybeSendTelegram(message);

    return jsonOk({
      simulated: !delivery.sent,
      delivery,
      message,
      category,
    });
  } catch (err) {
    console.error("[telegram/webhook] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}

async function handleTelegramUpdate(update: {
  kind: "message" | "callback" | "unknown";
  chatId?: string | number;
  text?: string;
  callbackData?: string;
}) {
  if (update.kind === "callback") {
    const yes = update.callbackData === "daily_report_yes";
    const message = formatTelegramAlert({
      category: "Baik",
      action_message: yes
        ? "Daily report is ready. Summary: all sensors within nominal range."
        : "Okay — report dismissed.",
    });
    message.chat_id = update.chatId;
    const delivery = await maybeSendTelegram(message);
    return jsonOk({ simulated: !delivery.sent, delivery, message });
  }

  const text = update.text ?? "";
  const command = categorizeCommand(text);

  if (command === "help") {
    const message = {
      chat_id: update.chatId,
      category: "Baik" as WaterStatus,
      text: "DATAVLOW_BOT commands:\n/status — current quality\n/baik /cukup /tidak — simulate alerts",
      parse_mode: "HTML" as const,
    };
    const delivery = await maybeSendTelegram(message);
    return jsonOk({ simulated: !delivery.sent, delivery, message });
  }

  const category: TelegramAlertCategory =
    command === "status" ? "Baik" : command;

  const message = formatTelegramAlert({
    category,
    action_message:
      command === "status"
        ? "✅ System: All sensors operational"
        : undefined,
    ph: 7.2,
    tds: 450,
    turbidity: 1.5,
    temp: 24.5,
  });
  message.chat_id = update.chatId;

  const delivery = await maybeSendTelegram(message);
  return jsonOk({ simulated: !delivery.sent, delivery, message, category });
}

async function maybeSendTelegram(message: {
  chat_id?: string | number;
  text: string;
  parse_mode?: string;
  reply_markup?: unknown;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token || message.chat_id == null) {
    return {
      sent: false,
      reason: "TELEGRAM_BOT_TOKEN or chat_id missing — returning simulated payload",
    };
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: message.chat_id,
          text: message.text,
          parse_mode: message.parse_mode ?? "HTML",
          reply_markup: message.reply_markup,
        }),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      return { sent: false, reason: errText };
    }

    return { sent: true as const };
  } catch (err) {
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "Telegram send failed",
    };
  }
}
