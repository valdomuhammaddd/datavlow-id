import { randomBytes } from "crypto";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, DeviceStatus } from "@/types/database.types";

export function generateApiKey(): string {
  return `dv_${randomBytes(24).toString("hex")}`;
}

export async function listDevices(supabase: SupabaseClient<Database>) {
  return supabase
    .from("devices")
    .select("*")
    .order("last_ping", { ascending: false, nullsFirst: false });
}

export interface RegisterDeviceInput {
  name: string;
  api_key?: string;
  status?: DeviceStatus;
}

export async function registerDevice(
  supabase: SupabaseClient<Database>,
  input: RegisterDeviceInput,
) {
  const api_key = input.api_key?.trim() || generateApiKey();

  return supabase
    .from("devices")
    .insert({
      name: input.name.trim(),
      api_key,
      status: input.status ?? "offline",
      last_ping: null,
    })
    .select("*")
    .single();
}

/**
 * Soft ping: measures round-trip against Supabase and marks device online.
 * Returns latency_ms for fleet health UI.
 */
export async function pingDevice(
  supabase: SupabaseClient<Database>,
  deviceId: string,
) {
  const started = performance.now();

  const { data: device, error: lookupError } = await supabase
    .from("devices")
    .select("id, api_key, name, status")
    .eq("id", deviceId)
    .maybeSingle();

  if (lookupError) {
    return { ok: false as const, error: lookupError.message, status: 503 };
  }
  if (!device) {
    return { ok: false as const, error: "Device not found", status: 404 };
  }

  const timestamp = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("devices")
    .update({
      last_ping: timestamp,
      status: "online",
    })
    .eq("id", deviceId);

  const latency_ms = Math.round((performance.now() - started) * 100) / 100;

  if (updateError) {
    return { ok: false as const, error: updateError.message, status: 500 };
  }

  return {
    ok: true as const,
    device,
    latency_ms,
    last_ping: timestamp,
    health: latency_ms < 200 ? "healthy" : latency_ms < 800 ? "degraded" : "slow",
  };
}
