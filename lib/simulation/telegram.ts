import type { WaterStatus } from "@/types/database.types";

export type TelegramAlertCategory = WaterStatus;

export interface TelegramOutboundMessage {
  chat_id?: string | number;
  category: TelegramAlertCategory;
  text: string;
  parse_mode?: "HTML" | "Markdown";
  reply_markup?: {
    inline_keyboard: Array<Array<{ text: string; callback_data: string }>>;
  };
}

const CATEGORY_PREFIX: Record<TelegramAlertCategory, string> = {
  Baik: "✅",
  "Cukup Baik": "⚠️",
  "Tidak Baik": "🚨",
};

export function formatTelegramAlert(input: {
  category: TelegramAlertCategory;
  ph?: number;
  tds?: number;
  turbidity?: number;
  temp?: number;
  action_message?: string;
  deviceName?: string;
}): TelegramOutboundMessage {
  const { category } = input;
  const prefix = CATEGORY_PREFIX[category];
  const device = input.deviceName ?? "DATAVLOW Node";

  const metrics = [
    input.ph != null ? `pH ${input.ph.toFixed(1)}` : null,
    input.tds != null ? `TDS ${Math.round(input.tds)}` : null,
    input.turbidity != null ? `Turb ${input.turbidity.toFixed(1)}` : null,
    input.temp != null ? `Temp ${input.temp.toFixed(1)}°C` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const body =
    input.action_message ??
    (category === "Baik"
      ? "System: All sensors operational"
      : category === "Cukup Baik"
        ? "Alert: Water quality marginal — monitoring"
        : "Critical: Water quality out of range");

  const text = [
    `${prefix} <b>${category}</b> — ${device}`,
    body,
    metrics ? `<code>${metrics}</code>` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    category,
    text,
    parse_mode: "HTML",
    reply_markup:
      category === "Baik"
        ? {
            inline_keyboard: [
              [
                { text: "Yes, show me", callback_data: "daily_report_yes" },
                { text: "Not now", callback_data: "daily_report_no" },
              ],
            ],
          }
        : undefined,
  };
}

/** Parse inbound Telegram webhook updates (message or callback). */
export function parseTelegramUpdate(update: unknown): {
  kind: "message" | "callback" | "unknown";
  chatId?: string | number;
  text?: string;
  callbackData?: string;
} {
  if (!update || typeof update !== "object") {
    return { kind: "unknown" };
  }

  const u = update as Record<string, unknown>;

  if (u.callback_query && typeof u.callback_query === "object") {
    const cq = u.callback_query as Record<string, unknown>;
    const message = cq.message as Record<string, unknown> | undefined;
    const chat = message?.chat as Record<string, unknown> | undefined;
    return {
      kind: "callback",
      chatId: chat?.id as string | number | undefined,
      callbackData: typeof cq.data === "string" ? cq.data : undefined,
      text: typeof cq.data === "string" ? cq.data : undefined,
    };
  }

  if (u.message && typeof u.message === "object") {
    const msg = u.message as Record<string, unknown>;
    const chat = msg.chat as Record<string, unknown> | undefined;
    return {
      kind: "message",
      chatId: chat?.id as string | number | undefined,
      text: typeof msg.text === "string" ? msg.text : undefined,
    };
  }

  return { kind: "unknown" };
}

export function categorizeCommand(text: string): TelegramAlertCategory | "status" | "help" {
  const lower = text.trim().toLowerCase();
  if (lower.includes("tidak baik") || lower.includes("critical")) return "Tidak Baik";
  if (lower.includes("cukup")) return "Cukup Baik";
  if (lower.includes("baik") || lower.includes("ok")) return "Baik";
  if (lower.includes("status") || lower.includes("update")) return "status";
  return "help";
}
