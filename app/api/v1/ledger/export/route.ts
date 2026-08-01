import { NextResponse } from "next/server";

import { getSearchParams, jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, isWaterStatus } from "@/lib/api/validate";
import {
  buildPdfPayload,
  rowsToCsv,
  toExportRows,
  type ExportFormat,
} from "@/lib/ledger/export-server";
import { parseLedgerFilters, queryLedger } from "@/lib/ledger/query";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return handleExport(getSearchParams(request));
}

export async function POST(request: Request) {
  const body = await parseJsonBody(request);
  if (!body.ok) return body.response;

  const params = getSearchParams(request);
  if (isObject(body.data)) {
    if (typeof body.data.format === "string") params.set("format", body.data.format);
    if (typeof body.data.nodeId === "string") params.set("nodeId", body.data.nodeId);
    if (typeof body.data.status === "string") params.set("status", body.data.status);
    if (typeof body.data.dateFrom === "string") params.set("dateFrom", body.data.dateFrom);
    if (typeof body.data.dateTo === "string") params.set("dateTo", body.data.dateTo);
  }

  return handleExport(params);
}

async function handleExport(params: URLSearchParams) {
  try {
    const format = (params.get("format") ?? "csv").toLowerCase() as ExportFormat;
    if (!["csv", "json", "pdf"].includes(format)) {
      return jsonError("format must be csv | json | pdf", 400);
    }

    const filters = parseLedgerFilters(params);
    // Export pulls a wider window than UI page size
    filters.page = 1;
    filters.pageSize = Math.min(filters.pageSize || 200, 1000);

    if (filters.status && !isWaterStatus(filters.status)) {
      return jsonError(
        "status must be Baik | Cukup Baik | Tidak Baik",
        400,
      );
    }

    const supabase = createAdminClient();
    const result = await queryLedger(supabase, filters);

    if (result.error) {
      console.error("[ledger/export] query failed:", result.error.message);
      return jsonError("Failed to export ledger", 500);
    }

    const rows = toExportRows(result.rows);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");

    if (format === "csv") {
      const csv = rowsToCsv(rows);
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="datavlow-ledger-${stamp}.csv"`,
        },
      });
    }

    if (format === "json") {
      return new NextResponse(JSON.stringify(rows, null, 2), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition": `attachment; filename="datavlow-ledger-${stamp}.json"`,
        },
      });
    }

    const document = buildPdfPayload(rows);
    return new NextResponse(document.html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="datavlow-ledger-${stamp}.html"`,
      },
    });
  } catch (err) {
    console.error("[ledger/export] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}
