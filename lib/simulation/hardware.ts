import type { SupabaseClient } from "@supabase/supabase-js";

import { runFuzzyMamdani } from "@/lib/fuzzy/mamdani";
import type { Database, SimulationHardware } from "@/types/database.types";

export type HardwareAction =
  | "button_press"
  | "toggle_sensors"
  | "set_readings"
  | "refresh_lcd";

export interface HardwareActionBody {
  device_id: string;
  action: HardwareAction;
  button?: "left" | "right";
  sensors_enabled?: boolean;
  ph?: number;
  tds?: number;
  turbidity?: number;
  temp?: number;
}

function formatLcd(ph: number, tds: number, status: string): {
  lcd_line1: string;
  lcd_line2: string;
} {
  // 16x2 constraints — truncate safely
  const line1 = `pH:${ph.toFixed(1)} TDS:${Math.round(tds)}`.slice(0, 16);
  const line2 = `Status: ${status}`.slice(0, 16);
  return { lcd_line1: line1.padEnd(16).slice(0, 16), lcd_line2: line2.padEnd(16).slice(0, 16) };
}

export async function getOrCreateHardwareState(
  supabase: SupabaseClient<Database>,
  deviceId: string,
): Promise<{ data: SimulationHardware | null; error: string | null }> {
  const { data: existing, error: readError } = await supabase
    .from("simulation_hardware")
    .select("*")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (readError) return { data: null, error: readError.message };
  if (existing) return { data: existing as SimulationHardware, error: null };

  const seed = {
    device_id: deviceId,
    ph: 7.2,
    tds: 450,
    turbidity: 1.5,
    temp: 24.5,
    sensors_enabled: true,
    lcd_line1: "pH:7.2 TDS:450  ",
    lcd_line2: "Status: BAIK    ",
    last_button: null as string | null,
    uptime_seconds: 0,
    rssi: -64,
    voltage: 3.31,
  };

  const { data: created, error: insertError } = await supabase
    .from("simulation_hardware")
    .insert(seed)
    .select("*")
    .single();

  if (insertError) return { data: null, error: insertError.message };
  return { data: created as SimulationHardware, error: null };
}

export async function applyHardwareAction(
  supabase: SupabaseClient<Database>,
  body: HardwareActionBody,
) {
  const current = await getOrCreateHardwareState(supabase, body.device_id);
  if (current.error || !current.data) {
    return { ok: false as const, error: current.error ?? "State unavailable" };
  }

  let next = { ...current.data };

  switch (body.action) {
    case "button_press": {
      const btn = body.button ?? "left";
      next.last_button = btn;
      // Cycle LCD pages on button press (simulates menu navigation)
      if (btn === "left") {
        next.lcd_line1 = `RSSI:${next.rssi}dBm`.padEnd(16).slice(0, 16);
        next.lcd_line2 = `V:${next.voltage.toFixed(2)}          `.slice(0, 16);
      } else {
        const lcd = formatLcd(next.ph, next.tds, next.water_status ?? "BAIK");
        next = { ...next, ...lcd };
      }
      break;
    }
    case "toggle_sensors": {
      next.sensors_enabled =
        body.sensors_enabled !== undefined
          ? body.sensors_enabled
          : !next.sensors_enabled;
      if (!next.sensors_enabled) {
        next.lcd_line1 = "SENSORS OFF     ";
        next.lcd_line2 = "Standby         ";
      }
      break;
    }
    case "set_readings":
    case "refresh_lcd": {
      if (body.ph !== undefined) next.ph = body.ph;
      if (body.tds !== undefined) next.tds = body.tds;
      if (body.turbidity !== undefined) next.turbidity = body.turbidity;
      if (body.temp !== undefined) next.temp = body.temp;

      const fuzzy = runFuzzyMamdani({
        ph: next.ph,
        tds: next.tds,
        turbidity: next.turbidity,
      });
      next.water_status = fuzzy.water_status;
      next.crisp_score = fuzzy.crisp_score;
      next.action_message = fuzzy.action_message;

      if (next.sensors_enabled) {
        const lcd = formatLcd(
          next.ph,
          next.tds,
          fuzzy.water_status.toUpperCase(),
        );
        next = { ...next, ...lcd };
      }
      break;
    }
    default:
      return { ok: false as const, error: "Unknown action" };
  }

  next.updated_at = new Date().toISOString();
  next.uptime_seconds = (next.uptime_seconds ?? 0) + 1;

  const { data, error } = await supabase
    .from("simulation_hardware")
    .update({
      ph: next.ph,
      tds: next.tds,
      turbidity: next.turbidity,
      temp: next.temp,
      sensors_enabled: next.sensors_enabled,
      lcd_line1: next.lcd_line1,
      lcd_line2: next.lcd_line2,
      last_button: next.last_button,
      water_status: next.water_status,
      crisp_score: next.crisp_score,
      action_message: next.action_message,
      uptime_seconds: next.uptime_seconds,
      rssi: next.rssi,
      voltage: next.voltage,
      updated_at: next.updated_at,
    })
    .eq("device_id", body.device_id)
    .select("*")
    .single();

  if (error) return { ok: false as const, error: error.message };

  // Mirror sample readings into live telemetry so dashboard/alerts update.
  if (body.action === "set_readings" || body.action === "refresh_lcd") {
    await mirrorSimulationToTelemetry(supabase, data as SimulationHardware);
  }

  return { ok: true as const, state: data as SimulationHardware };
}

async function mirrorSimulationToTelemetry(
  supabase: SupabaseClient<Database>,
  state: SimulationHardware,
) {
  const apiKey = state.device_id;

  const { data: existing } = await supabase
    .from("devices")
    .select("api_key, revoked_at")
    .eq("api_key", apiKey)
    .maybeSingle();

  if (!existing) {
    await supabase.from("devices").insert({
      name: `Sim ${apiKey}`,
      api_key: apiKey,
      status: "online",
      last_ping: new Date().toISOString(),
      health: "simulated",
    });
  } else if (existing.revoked_at) {
    return;
  }

  await supabase.rpc("ingest_telemetry", {
    p_api_key: apiKey,
    p_ph: state.ph,
    p_tds: state.tds,
    p_turbidity: state.turbidity,
    p_temp: state.temp,
    p_crisp_score: state.crisp_score,
    p_water_status: state.water_status,
    p_action_message: state.action_message,
  });
}
