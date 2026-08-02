import { getSearchParams, jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, isWaterStatus, toFiniteNumber } from "@/lib/api/validate";
import {
  deleteLedgerRow,
  parseLedgerFilters,
  queryLedger,
} from "@/lib/ledger/query";
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

/** Remove a single telemetry row by id. */
export async function DELETE(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;

    if (!isObject(body.data)) {
      return jsonError("Invalid body", 400);
    }

    const id = toFiniteNumber(body.data.id);
    if (id == null || id < 1) {
      return jsonError("id is required", 400);
    }

    const supabase = createAdminClient();
    const { error } = await deleteLedgerRow(supabase, Math.trunc(id));

    if (error) {
      console.error("[ledger] delete failed:", error.message);
      return jsonError("Failed to delete ledger row", 500);
    }

    return jsonOk({ deleted: Math.trunc(id) });
  } catch (err) {
    console.error("[ledger] delete unhandled:", err);
    return jsonError("Internal server error", 500);
  }
}
