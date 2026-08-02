"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { TelemetryLog, WaterStatus } from "@/types/database.types";
import type { LedgerRow } from "@/lib/ledger/query";

const PAGE_SIZE = 25;

export type LedgerStatusFilter = "all" | WaterStatus;

type LedgerPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

/**
 * Spreadsheet ledger — fetches ONLY from `/api/v1/ledger`.
 */
export function useTelemetryLedger() {
  const [rows, setRows] = useState<LedgerRow[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LedgerStatusFilter>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<LedgerPagination>({
    page: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
    });
    if (query.trim()) params.set("nodeId", query.trim());
    if (statusFilter !== "all") params.set("status", statusFilter);

    try {
      const res = await fetch(`/api/v1/ledger?${params.toString()}`, {
        cache: "no-store",
      });
      const json = (await res.json()) as {
        data?: LedgerRow[];
        pagination?: LedgerPagination;
        error?: string;
      };

      if (!res.ok) {
        setError(json.error ?? `Ledger failed (${res.status})`);
        setIsLoading(false);
        return;
      }

      setRows(json.data ?? []);
      setPagination(
        json.pagination ?? {
          page,
          pageSize: PAGE_SIZE,
          total: json.data?.length ?? 0,
          totalPages: 1,
        },
      );
      setError(null);
    } catch (err) {
      console.error("[useTelemetryLedger] fetch error:", err);
      setError(err instanceof Error ? err.message : "Ledger fetch failed");
    } finally {
      setIsLoading(false);
    }
  }, [page, query, statusFilter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Client-side debounce for search: reset to page 1 when filters change
  const setQueryAndReset = useCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, []);

  const setStatusAndReset = useCallback((value: LedgerStatusFilter) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const pageCount = pagination.totalPages;
  const pageWindow = useMemo(() => {
    const current = Math.max(0, page - 1);
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i);
    }
    const start = Math.max(0, Math.min(current - 1, pageCount - 3));
    return [start, start + 1, start + 2].filter((i) => i < pageCount);
  }, [page, pageCount]);

  const stats = useMemo(() => {
    if (!rows.length) {
      return { avgPh: null, avgTds: null, avgTemp: null, nodeCount: 0 };
    }

    let phSum = 0;
    let tdsSum = 0;
    let tempSum = 0;
    let phN = 0;
    let tdsN = 0;
    let tempN = 0;
    const nodes = new Set<string>();

    for (const row of rows) {
      nodes.add(row.device_id);
      if (row.ph != null) {
        phSum += Number(row.ph);
        phN += 1;
      }
      if (row.tds != null) {
        tdsSum += Number(row.tds);
        tdsN += 1;
      }
      if (row.temp != null) {
        tempSum += Number(row.temp);
        tempN += 1;
      }
    }

    return {
      avgPh: phN ? phSum / phN : null,
      avgTds: tdsN ? tdsSum / tdsN : null,
      avgTemp: tempN ? tempSum / tempN : null,
      nodeCount: nodes.size,
    };
  }, [rows]);

  return {
    /** Current page rows from API — bind directly to table. */
    pageRows: rows,
    /** Alias for export of current page (API-backed). */
    filtered: rows,
    query,
    setQuery: setQueryAndReset,
    statusFilter,
    setStatusFilter: setStatusAndReset,
    filtersOpen,
    setFiltersOpen,
    /** 0-based page index for UI buttons */
    page: page - 1,
    setPage: (updater: number | ((p: number) => number)) => {
      setPage((prev) => {
        const zeroBased = typeof updater === "function" ? updater(prev - 1) : updater;
        return Math.max(1, zeroBased + 1);
      });
    },
    pageCount,
    pageWindow,
    pageSize: PAGE_SIZE,
    totalEstimate: pagination.total,
    stats,
    isLoading,
    isLive: false,
    error,
    refresh,
  };
}
