import { getSearchParams, jsonError, jsonOk } from "@/lib/api/http";
import { isWaterStatus } from "@/lib/api/validate";
import { parseLedgerFilters, queryLedger } from "@/lib/ledger/query";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const filters = parseLedgerFilters(getSearchParams(request));

    if (filters.status && !isWaterStatus(filters.status)) {
      return jsonError(
        "status must be Baik | Cukup Baik | Tidak Baik",
        400,
      );
    }

    const supabase = createAdminClient();
    const result = await queryLedger(supabase, filters);

    if (result.error) {
      console.error("[ledger] query failed:", result.error.message);
      return jsonError("Failed to query ledger", 500);
    }

    return jsonOk({
      data: result.rows,
      pagination: {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
        totalPages: Math.max(1, Math.ceil(result.total / result.pageSize)),
      },
      filters: {
        nodeId: filters.nodeId ?? null,
        status: filters.status ?? null,
        dateFrom: filters.dateFrom ?? null,
        dateTo: filters.dateTo ?? null,
      },
    });
  } catch (err) {
    console.error("[ledger] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}
