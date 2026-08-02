import type { SupabaseClient } from "@supabase/supabase-js";

import { toPositiveInt } from "@/lib/api/validate";
import type { Database, TelemetryLog, WaterStatus } from "@/types/database.types";

export type LedgerRow = TelemetryLog & {
  device_name: string;
};

export interface LedgerFilters {
  nodeId?: string;
  status?: WaterStatus;
  dateFrom?: string;
  dateTo?: string;
  page: number;
  pageSize: number;
}

export function parseLedgerFilters(
  params: URLSearchParams,
): LedgerFilters {
  const nodeId = params.get("nodeId")?.trim() || undefined;
  const status = params.get("status")?.trim() || undefined;
  const dateFrom = params.get("dateFrom") || params.get("from") || undefined;
  const dateTo = params.get("dateTo") || params.get("to") || undefined;
  const page = toPositiveInt(params.get("page"), 1);
  const pageSize = toPositiveInt(params.get("pageSize"), 25, 200);

  return {
    nodeId,
    status: status as WaterStatus | undefined,
    dateFrom,
    dateTo,
    page,
    pageSize,
  };
}

async function deviceNameMap(
  supabase: SupabaseClient<Database>,
  keys: string[],
): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  if (!keys.length) return map;

  const { data } = await supabase
    .from("devices")
    .select("api_key, name")
    .in("api_key", keys);

  for (const d of data ?? []) {
    map.set(d.api_key, d.name);
  }
  return map;
}

export async function queryLedger(
  supabase: SupabaseClient<Database>,
  filters: LedgerFilters,
) {
  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  // Resolve device-name search → matching api_keys
  let deviceKeysFromName: string[] | null = null;
  if (filters.nodeId) {
    const { data: named } = await supabase
      .from("devices")
      .select("api_key")
      .ilike("name", `%${filters.nodeId}%`);
    deviceKeysFromName = (named ?? []).map((d) => d.api_key);
  }

  let query = supabase
    .from("telemetry_logs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.nodeId) {
    if (deviceKeysFromName && deviceKeysFromName.length > 0) {
      query = query.in("device_id", deviceKeysFromName);
    } else {
      query = query.ilike("device_id", `%${filters.nodeId}%`);
    }
  }
  if (filters.status) {
    query = query.eq("water_status", filters.status);
  }
  if (filters.dateFrom) {
    query = query.gte("created_at", filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.lte("created_at", filters.dateTo);
  }

  const { data, error, count } = await query.range(from, to);
  const rows = data ?? [];
  const names = await deviceNameMap(
    supabase,
    [...new Set(rows.map((r) => r.device_id))],
  );

  const enriched: LedgerRow[] = rows.map((r) => ({
    ...r,
    device_name: names.get(r.device_id) ?? r.device_id,
  }));

  return {
    rows: enriched,
    total: count ?? 0,
    page: filters.page,
    pageSize: filters.pageSize,
    error,
  };
}

export async function deleteLedgerRow(
  supabase: SupabaseClient<Database>,
  id: number,
) {
  return supabase.from("telemetry_logs").delete().eq("id", id);
}
