"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { TelemetryLog, WaterStatus } from "@/types/database.types";

const PAGE_SIZE = 25;
const FETCH_LIMIT = 200;
const CHANNEL = "ledger_telemetry_inserts";

export type LedgerStatusFilter = "all" | WaterStatus;

export function useTelemetryLedger() {
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LedgerStatusFilter>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalEstimate, setTotalEstimate] = useState(0);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const supabase = createClient();

    const { data, error: fetchError, count } = await supabase
      .from("telemetry_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(FETCH_LIMIT);

    if (fetchError) {
      setError(fetchError.message);
      setIsLoading(false);
      return;
    }

    setLogs((data ?? []) as TelemetryLog[]);
    setTotalEstimate(count ?? data?.length ?? 0);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refresh();

    const supabase = createClient();
    const channel = supabase
      .channel(CHANNEL)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "telemetry_logs",
        },
        (payload) => {
          const row = payload.new as TelemetryLog;
          if (!row?.id) return;
          setLogs((prev) => {
            if (prev.some((r) => r.id === row.id)) return prev;
            return [row, ...prev].slice(0, FETCH_LIMIT);
          });
          setTotalEstimate((n) => n + 1);
        },
      )
      .subscribe((status) => {
        setIsLive(status === "SUBSCRIBED");
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return logs.filter((row) => {
      if (statusFilter !== "all" && row.water_status !== statusFilter) {
        return false;
      }
      if (!q) return true;
      return row.device_id.toLowerCase().includes(q);
    });
  }, [logs, query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageRows = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const pageWindow = useMemo(() => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i);
    }
    const start = Math.max(0, Math.min(page - 1, pageCount - 3));
    return [start, start + 1, start + 2].filter((i) => i < pageCount);
  }, [page, pageCount]);

  useEffect(() => {
    if (page > pageCount - 1) setPage(0);
  }, [page, pageCount]);

  const stats = useMemo(() => {
    if (!filtered.length) {
      return { avgPh: null, avgTds: null, avgTemp: null, nodeCount: 0 };
    }

    let phSum = 0;
    let tdsSum = 0;
    let tempSum = 0;
    let phN = 0;
    let tdsN = 0;
    let tempN = 0;
    const nodes = new Set<string>();

    for (const row of filtered) {
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
  }, [filtered]);

  return {
    logs,
    filtered,
    pageRows,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    filtersOpen,
    setFiltersOpen,
    page,
    setPage,
    pageCount,
    pageWindow,
    pageSize: PAGE_SIZE,
    totalEstimate,
    stats,
    isLoading,
    isLive,
    error,
    refresh,
  };
}
