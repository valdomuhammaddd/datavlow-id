import { randomBytes } from "crypto";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, DeviceStatus } from "@/types/database.types";

export function generateApiKey(): string {
  return `dv_${randomBytes(24).toString("hex")}`;
}

export async function listDevices(
  supabase: SupabaseClient<Database>,
  opts: { includeRevoked?: boolean } = {},
) {
  let query = supabase
    .from("devices")
    .select("*")
    .order("last_ping", { ascending: false, nullsFirst: false });

  if (!opts.includeRevoked) {
    query = query.is("revoked_at", null);
  }

  return query;
}

export interface RegisterDeviceInput {
  name: string;
  api_key?: string;
  status?: DeviceStatus;
  site_id?: string | null;
  notes?: string | null;
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
      site_id: input.site_id ?? null,
      notes: input.notes ?? null,
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
    .select("id, api_key, name, status, revoked_at")
    .eq("id", deviceId)
    .maybeSingle();

  if (lookupError) {
    return { ok: false as const, error: lookupError.message, status: 503 };
  }
  if (!device) {
    return { ok: false as const, error: "Device not found", status: 404 };
  }
  if (device.revoked_at) {
    return { ok: false as const, error: "Device key revoked", status: 403 };
  }

  const timestamp = new Date().toISOString();
  const latency_ms = Math.round((performance.now() - started) * 100) / 100;
  const health =
    latency_ms < 200 ? "healthy" : latency_ms < 800 ? "degraded" : "slow";

  const { error: updateError } = await supabase
    .from("devices")
    .update({
      last_ping: timestamp,
      status: "online",
      latency_ms,
      health,
    })
    .eq("id", deviceId);

  if (updateError) {
    return { ok: false as const, error: updateError.message, status: 500 };
  }

  return {
    ok: true as const,
    device,
    latency_ms,
    last_ping: timestamp,
    health,
  };
}

export async function rotateDeviceKey(
  supabase: SupabaseClient<Database>,
  deviceId: string,
) {
  const { data: device, error: lookupError } = await supabase
    .from("devices")
    .select("id, name, revoked_at")
    .eq("id", deviceId)
    .maybeSingle();

  if (lookupError) {
    return { ok: false as const, error: lookupError.message, status: 503 };
  }
  if (!device) {
    return { ok: false as const, error: "Device not found", status: 404 };
  }
  if (device.revoked_at) {
    return { ok: false as const, error: "Device already revoked", status: 403 };
  }

  const api_key = generateApiKey();
  const { data, error } = await supabase
    .from("devices")
    .update({
      api_key,
      status: "offline",
      last_ping: null,
      health: "rotated",
    })
    .eq("id", deviceId)
    .select("*")
    .single();

  if (error) {
    return { ok: false as const, error: error.message, status: 500 };
  }

  return { ok: true as const, data };
}

export async function revokeDevice(
  supabase: SupabaseClient<Database>,
  deviceId: string,
) {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("devices")
    .update({
      revoked_at: now,
      status: "offline",
      health: "revoked",
    })
    .eq("id", deviceId)
    .is("revoked_at", null)
    .select("*")
    .maybeSingle();

  if (error) {
    return { ok: false as const, error: error.message, status: 500 };
  }
  if (!data) {
    return { ok: false as const, error: "Device not found or already revoked", status: 404 };
  }

  return { ok: true as const, data };
}
