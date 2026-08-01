import type { SupabaseClient } from "@supabase/supabase-js";

import { toPositiveInt } from "@/lib/api/validate";
import type { Database, WaterStatus } from "@/types/database.types";

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

export async function queryLedger(
  supabase: SupabaseClient<Database>,
  filters: LedgerFilters,
) {
  const from = (filters.page - 1) * filters.pageSize;
  const to = from + filters.pageSize - 1;

  let query = supabase
    .from("telemetry_logs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.nodeId) {
    query = query.ilike("device_id", `%${filters.nodeId}%`);
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

  return {
    rows: data ?? [],
    total: count ?? 0,
    page: filters.page,
    pageSize: filters.pageSize,
    error,
  };
}
