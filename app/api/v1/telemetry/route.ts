import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import {
  isObject,
  isWaterStatus,
  toFiniteNumber,
  toNonEmptyString,
} from "@/lib/api/validate";
import { resolveFuzzyFields } from "@/lib/fuzzy/mamdani";
import { createAdminClient } from "@/lib/supabase/admin";
import type { WaterStatus } from "@/types/database.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface TelemetryPayload {
  api_key: string;
  ph: number;
  tds: number;
  turbidity: number;
  temp: number;
  crisp_score?: number;
  water_status?: WaterStatus;
  action_message?: string;
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;

    const parsed = parsePayload(body.data);
    if (!parsed.ok) return jsonError(parsed.error, 400);

    const payload = parsed.data;
    const supabase = createAdminClient();

    const { data: device, error: authError } = await supabase
      .from("devices")
      .select("api_key, revoked_at")
      .eq("api_key", payload.api_key)
      .maybeSingle();

    if (authError) {
      console.error("[telemetry] auth lookup failed:", authError.message);
      return jsonError("Authentication service unavailable", 503);
    }

    if (!device) {
      return jsonError("Unauthorized", 401);
    }

    if (device.revoked_at) {
      return jsonError("Device key revoked", 403);
    }

    const fuzzy = resolveFuzzyFields(payload);

    const { data: timestamp, error: ingestError } = await supabase.rpc(
      "ingest_telemetry",
      {
        p_api_key: payload.api_key,
        p_ph: payload.ph,
        p_tds: payload.tds,
        p_turbidity: payload.turbidity,
        p_temp: payload.temp,
        p_crisp_score: fuzzy.crisp_score,
        p_water_status: fuzzy.water_status,
        p_action_message: fuzzy.action_message,
      },
    );

    if (ingestError) {
      console.error("[telemetry] ingest failed:", ingestError.message);
      return jsonError("Failed to persist telemetry", 500);
    }

    if (
      fuzzy.water_status === "Tidak Baik" ||
      fuzzy.water_status === "Cukup Baik"
    ) {
      const severity =
        fuzzy.water_status === "Tidak Baik" ? "critical" : "warning";
      void supabase.from("alert_events").insert({
        device_id: payload.api_key,
        severity,
        water_status: fuzzy.water_status,
        message:
          fuzzy.action_message ??
          `Water quality ${fuzzy.water_status} (score ${fuzzy.crisp_score})`,
      });
    }

    return jsonOk({
      timestamp: timestamp ?? new Date().toISOString(),
      water_status: fuzzy.water_status,
      crisp_score: fuzzy.crisp_score,
    });
  } catch (err) {
    console.error("[telemetry] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}

function parsePayload(
  body: unknown,
): { ok: true; data: TelemetryPayload } | { ok: false; error: string } {
  if (!isObject(body)) return { ok: false, error: "Payload must be a JSON object" };

  const api_key = toNonEmptyString(body.api_key, 128);
  if (!api_key) return { ok: false, error: "api_key is required" };

  const ph = toFiniteNumber(body.ph);
  const tds = toFiniteNumber(body.tds);
  const turbidity = toFiniteNumber(body.turbidity);
  const temp = toFiniteNumber(body.temp);

  if (ph === null || tds === null || turbidity === null || temp === null) {
    return {
      ok: false,
      error: "ph, tds, turbidity, and temp must be finite numbers",
    };
  }

  let crisp_score: number | undefined;
  if (body.crisp_score !== undefined && body.crisp_score !== null) {
    const score = toFiniteNumber(body.crisp_score);
    if (score === null) {
      return { ok: false, error: "crisp_score must be a finite number" };
    }
    crisp_score = score;
  }

  let water_status: WaterStatus | undefined;
  if (body.water_status !== undefined && body.water_status !== null) {
    if (!isWaterStatus(body.water_status)) {
      return {
        ok: false,
        error: "water_status must be Baik | Cukup Baik | Tidak Baik",
      };
    }
    water_status = body.water_status;
  }

  let action_message: string | undefined;
  if (body.action_message !== undefined && body.action_message !== null) {
    if (typeof body.action_message !== "string") {
      return { ok: false, error: "action_message must be a string" };
    }
    action_message = body.action_message.slice(0, 500);
  }

  return {
    ok: true,
    data: {
      api_key,
      ph,
      tds,
      turbidity,
      temp,
      crisp_score,
      water_status,
      action_message,
    },
  };
}
