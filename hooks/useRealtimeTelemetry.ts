"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { TelemetryLog, WaterStatus } from "@/types/database.types";

const HISTORY_LIMIT = 30;
const CHANNEL_NAME = "datavlow_telemetry_realtime";

export type RealtimeChartPoint = {
  id: number;
  time: string;
  ph: number;
  tds: number;
  turbidity: number;
  temp: number;
  crisp_score: number;
  created_at: string;
};

export type UseRealtimeTelemetryResult = {
  /** Newest-first capped buffer (max 30). */
  logs: TelemetryLog[];
  /** Most recent row — feed KPI cards + status banner. */
  latest: TelemetryLog | null;
  /** Chronological series (oldest → newest) for the Kinetic chart. */
  chartSeries: RealtimeChartPoint[];
  isLoading: boolean;
  isLive: boolean;
  error: string | null;
};

function toNumber(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatTimeLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function normalizeRow(raw: Record<string, unknown>): TelemetryLog | null {
  const id = typeof raw.id === "number" ? raw.id : Number(raw.id);
  if (!Number.isFinite(id)) return null;

  const waterRaw = raw.water_status;
  const water_status =
    waterRaw === "Baik" || waterRaw === "Cukup Baik" || waterRaw === "Tidak Baik"
      ? (waterRaw as WaterStatus)
      : null;

  return {
    id,
    device_id: String(raw.device_id ?? ""),
    ph: raw.ph == null ? null : toNumber(raw.ph),
    tds: raw.tds == null ? null : toNumber(raw.tds),
    turbidity: raw.turbidity == null ? null : toNumber(raw.turbidity),
    temp: raw.temp == null ? null : toNumber(raw.temp),
    crisp_score: raw.crisp_score == null ? null : toNumber(raw.crisp_score),
    water_status,
    action_message:
      typeof raw.action_message === "string" ? raw.action_message : null,
    created_at: String(raw.created_at ?? new Date().toISOString()),
  };
}

function toChartPoint(row: TelemetryLog): RealtimeChartPoint {
  return {
    id: row.id,
    time: formatTimeLabel(row.created_at),
    ph: Number(row.ph ?? 0),
    tds: Number(row.tds ?? 0),
    turbidity: Number(row.turbidity ?? 0),
    temp: Number(row.temp ?? 0),
    crisp_score: Number(row.crisp_score ?? 0),
    created_at: row.created_at,
  };
}

function prependCap(
  prev: TelemetryLog[],
  incoming: TelemetryLog,
): TelemetryLog[] {
  if (prev.some((row) => row.id === incoming.id)) return prev;
  return [incoming, ...prev].slice(0, HISTORY_LIMIT);
}

/**
 * Real-time telemetry for Precision Telemetry dashboard ONLY.
 * Ledger spreadsheet must use `/api/v1/ledger` — not this hook.
 */
export function useRealtimeTelemetry(): UseRealtimeTelemetryResult {
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
      console.error("[useRealtimeTelemetry] hydrate failed:", fetchError);
      setError(fetchError.message);
      setIsLoading(false);
      return;
    }

    const rows = ((data ?? []) as Record<string, unknown>[])
      .map(normalizeRow)
      .filter((r): r is TelemetryLog => r != null);

    console.log("Realtime hydrate:", rows.length, "rows", rows[0] ?? null);
    setLogs(rows);
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
          console.log("Realtime payload:", payload);
          const row = normalizeRow(payload.new as Record<string, unknown>);
          if (!row) {
            console.warn("[useRealtimeTelemetry] invalid INSERT payload", payload.new);
            return;
          }
          console.log("Realtime mapped row:", {
            id: row.id,
            ph: row.ph,
            tds: row.tds,
            turbidity: row.turbidity,
            temp: row.temp,
            water_status: row.water_status,
          });
          setLogs((prev) => prependCap(prev, row));
        },
      )
      .subscribe((status) => {
        console.log("[useRealtimeTelemetry] channel status:", status);
        if (!mounted.current) return;
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

  const chartSeries = useMemo(
    () => [...logs].reverse().map(toChartPoint),
    [logs],
  );

  return {
    logs,
    latest,
    chartSeries,
    isLoading,
    isLive,
    error,
  };
}
