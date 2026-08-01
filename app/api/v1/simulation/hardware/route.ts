import { getSearchParams, jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import {
  isObject,
  toFiniteNumber,
  toNonEmptyString,
} from "@/lib/api/validate";
import {
  applyHardwareAction,
  getOrCreateHardwareState,
  type HardwareAction,
  type HardwareActionBody,
} from "@/lib/simulation/hardware";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACTIONS: HardwareAction[] = [
  "button_press",
  "toggle_sensors",
  "set_readings",
  "refresh_lcd",
];

/** GET current LCD + sensor simulation state. */
export async function GET(request: Request) {
  try {
    const deviceId =
      toNonEmptyString(getSearchParams(request).get("device_id"), 128) ??
      "DV-7729";

    const supabase = createAdminClient();
    const result = await getOrCreateHardwareState(supabase, deviceId);

    if (result.error || !result.data) {
      return jsonError(result.error ?? "Failed to load hardware state", 500);
    }

    return jsonOk({
      data: {
        ...result.data,
        display: {
          line1: result.data.lcd_line1,
          line2: result.data.lcd_line2,
        },
      },
    });
  } catch (err) {
    console.error("[simulation/hardware] GET error:", err);
    return jsonError("Internal server error", 500);
  }
}

/**
 * POST actions: button_press | toggle_sensors | set_readings | refresh_lcd
 * Updates virtual ESP32 LCD 16x2 strings for Simulation Center UI.
 */
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;
    if (!isObject(body.data)) {
      return jsonError("Payload must be a JSON object", 400);
    }

    const device_id =
      toNonEmptyString(body.data.device_id, 128) ?? "DV-7729";
    const action = body.data.action;

    if (typeof action !== "string" || !ACTIONS.includes(action as HardwareAction)) {
      return jsonError(
        "action must be button_press | toggle_sensors | set_readings | refresh_lcd",
        400,
      );
    }

    const payload: HardwareActionBody = {
      device_id,
      action: action as HardwareAction,
      button:
        body.data.button === "left" || body.data.button === "right"
          ? body.data.button
          : undefined,
      sensors_enabled:
        typeof body.data.sensors_enabled === "boolean"
          ? body.data.sensors_enabled
          : undefined,
      ph: toFiniteNumber(body.data.ph) ?? undefined,
      tds: toFiniteNumber(body.data.tds) ?? undefined,
      turbidity: toFiniteNumber(body.data.turbidity) ?? undefined,
      temp: toFiniteNumber(body.data.temp) ?? undefined,
    };

    const supabase = createAdminClient();
    const result = await applyHardwareAction(supabase, payload);

    if (!result.ok) {
      return jsonError(result.error, 500);
    }

    return jsonOk({
      data: {
        ...result.state,
        display: {
          line1: result.state.lcd_line1,
          line2: result.state.lcd_line2,
        },
      },
    });
  } catch (err) {
    console.error("[simulation/hardware] POST error:", err);
    return jsonError("Internal server error", 500);
  }
}
