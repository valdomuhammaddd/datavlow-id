"use client";

/**
 * @deprecated Prefer `useRealtimeTelemetry` (Phase 3 canonical hook).
 * Kept as a thin re-export so existing imports keep working.
 */
export {
  useRealtimeTelemetry as useTelemetryStream,
  type RealtimeChartPoint as ChartPoint,
  type UseRealtimeTelemetryResult as UseTelemetryStreamResult,
} from "@/hooks/useRealtimeTelemetry";
