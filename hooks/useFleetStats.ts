"use client";

import { useCallback, useEffect, useState } from "react";

import type { AlertEvent, Device } from "@/types/database.types";

export type FleetSummary = {
  total: number;
  online: number;
  offline: number;
  error: number;
};

export function useFleetStats(pollMs = 30_000) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [summary, setSummary] = useState<FleetSummary>({
    total: 0,
    online: 0,
    offline: 0,
    error: 0,
  });
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [openAlerts, setOpenAlerts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [devRes, alertRes] = await Promise.all([
        fetch("/api/v1/devices", { cache: "no-store" }),
        fetch("/api/v1/alerts?limit=20&unacked=1", { cache: "no-store" }),
      ]);

      if (!devRes.ok) throw new Error("Failed to load devices");
      const devJson = (await devRes.json()) as {
        data: Device[];
        summary: FleetSummary;
      };
      setDevices(devJson.data ?? []);
      setSummary(
        devJson.summary ?? {
          total: 0,
          online: 0,
          offline: 0,
          error: 0,
        },
      );

      if (alertRes.ok) {
        const alertJson = (await alertRes.json()) as {
          data: AlertEvent[];
          open: number;
        };
        setAlerts(alertJson.data ?? []);
        setOpenAlerts(alertJson.open ?? 0);
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fleet stats failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => void refresh(), pollMs);
    return () => window.clearInterval(id);
  }, [refresh, pollMs]);

  return {
    devices,
    summary,
    alerts,
    openAlerts,
    isLoading,
    error,
    refresh,
  };
}
