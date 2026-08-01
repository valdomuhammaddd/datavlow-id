"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { TelemetryLog } from "@/types/database.types";

const HISTORY_LIMIT = 25;
const CHANNEL_NAME = "telemetry_logs_inserts";

export interface ChartPoint {
  id: number;
  ph: number;
  tds: number;
  turbidity: number;
  temp: number;
  crisp_score: number;
  created_at: string;
}

export interface UseTelemetryStreamResult {
  logs: TelemetryLog[];
  latest: TelemetryLog | null;
  chartSeries: ChartPoint[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
}

function toChartPoint(row: TelemetryLog): ChartPoint {
  return {
    id: row.id,
    ph: Number(row.ph ?? 0),
    tds: Number(row.tds ?? 0),
    turbidity: Number(row.turbidity ?? 0),
    temp: Number(row.temp ?? 0),
    crisp_score: Number(row.crisp_score ?? 0),
    created_at: row.created_at,
  };
}

function mergeInsert(prev: TelemetryLog[], incoming: TelemetryLog): TelemetryLog[] {
  if (prev.some((row) => row.id === incoming.id)) return prev;
  return [incoming, ...prev].slice(0, HISTORY_LIMIT);
}

/**
 * Fetches the last 25 telemetry rows, then streams INSERTs via Supabase Realtime.
 * State updates are minimal: isLive only flips once; chartSeries is memoized.
 */
export function useTelemetryStream(): UseTelemetryStreamResult {
  const [logs, setLogs] = useState<TelemetryLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const hydrate = useCallback(async () => {
    const supabase = createClient();

    const { data, error: fetchError } = await supabase
      .from("telemetry_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(HISTORY_LIMIT);

    if (!mounted.current) return;

    if (fetchError) {
      setError(fetchError.message);
      setIsLoading(false);
      return;
    }

    setLogs((data ?? []) as TelemetryLog[]);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    const supabase = createClient();

    void hydrate();

    const channel = supabase
      .channel(CHANNEL_NAME)
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
          setLogs((prev) => mergeInsert(prev, row));
        },
      )
      .subscribe((status) => {
        if (!mounted.current) return;
        // Avoid redundant setState when already live
        setIsLive((prev) => {
          const next = status === "SUBSCRIBED";
          return prev === next ? prev : next;
        });
      });

    return () => {
      mounted.current = false;
      void supabase.removeChannel(channel);
    };
  }, [hydrate]);

  const latest = useMemo(() => logs[0] ?? null, [logs]);

  const chartSeries = useMemo(() => {
    return [...logs].reverse().map(toChartPoint);
  }, [logs]);

  return {
    logs,
    latest,
    chartSeries,
    isLoading,
    isLive,
    error,
  };
}
