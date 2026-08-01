"use client";

import Link from "next/link";
import { memo, useDeferredValue, useMemo } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";
import { useFleetStats } from "@/hooks/useFleetStats";
import {
  useRealtimeTelemetry,
  type RealtimeChartPoint as ChartPoint,
} from "@/hooks/useRealtimeTelemetry";
import { buildKineticWavePath } from "@/lib/telemetry/chart-path";
import type { TelemetryLog, WaterStatus } from "@/types/database.types";

function formatNum(value: number | null | undefined, digits = 1): string {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }
  return Number(value).toFixed(digits);
}

function statusLabel(status: WaterStatus | string | null | undefined): string {
  if (!status) return "STANDBY";
  return String(status).toUpperCase();
}

function phHint(ph: number | null | undefined): string {
  if (ph == null) return "—";
  if (ph >= 6.5 && ph <= 8.5) return "Stable Range";
  return "Out of Range";
}

function tdsHint(tds: number | null | undefined): string {
  if (tds == null) return "—";
  if (tds < 500) return "Nominal Ops";
  return "Elevated TDS";
}

function turbidityHint(turbidity: number | null | undefined): string {
  if (turbidity == null) return "—";
  if (turbidity < 5) return "Clear Clarity";
  return "High Turbidity";
}

function tempHint(temp: number | null | undefined, baseline = 24.5): string {
  if (temp == null) return "—";
  const delta = temp - baseline;
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(1)}° Variance`;
}

export function PrecisionTelemetryDashboard() {
  const { t } = useGlobalUI();
  const { latest, chartSeries, isLive, isLoading, error } =
    useRealtimeTelemetry();
  const fleet = useFleetStats();

  const deferredSeries = useDeferredValue(chartSeries);

  const waterStatus = latest?.water_status ?? null;
  const crispScore =
    latest?.crisp_score != null ? Number(latest.crisp_score) : null;
  const actionMessage = latest?.action_message ?? null;

  const badge = useMemo(() => {
    if (waterStatus === "Baik") return t("systemOptimal");
    if (waterStatus === "Cukup Baik") return t("systemCaution");
    if (waterStatus === "Tidak Baik") return t("systemAlert");
    return t("awaitingTelemetry");
  }, [waterStatus, t]);

  return (
    <AppShell>
      <StatusBanner
        isLoading={isLoading}
        waterStatus={waterStatus}
        crispScore={crispScore}
        actionMessage={actionMessage}
        badge={badge}
        fuzzyLabel={t("fuzzyEngine")}
        scoreLabel={t("aggregateScore")}
        error={error}
      />

      <KpiGrid
        latest={latest}
        realTimeLabel={t("realTime")}
        labels={{
          acidity: t("acidity"),
          tds: t("tdsLevel"),
          turbidity: t("turbidity"),
          temperature: t("temperature"),
        }}
      />

      <KineticChart
        series={deferredSeries}
        isLive={isLive}
        title={t("telemetryTopography")}
        subtitle={t("kineticTrends")}
        liveLabel={t("liveStream")}
        connectingLabel={t("connecting")}
      />

      <UtilityRow
        online={fleet.summary.online}
        total={fleet.summary.total}
        openAlerts={fleet.openAlerts}
        isLive={isLive}
        isLoading={isLoading || fleet.isLoading}
        labels={{
          nodesOnline: t("nodesOnline"),
          systemAlerts: t("systemAlerts"),
          uplinkStatus: t("uplinkStatus"),
          none: t("none"),
          critical: t("critical"),
          healthy: t("healthy"),
          alert: t("alert"),
          live: t("live"),
          syncing: t("syncing"),
          idle: t("idle"),
        }}
      />

      <Link
        href="/devices"
        className="fixed bottom-24 md:bottom-8 right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg glow-cyan hover:scale-110 active:scale-95 transition-all z-40"
        aria-label={t("addDevice")}
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add
        </span>
      </Link>
    </AppShell>
  );
}

const StatusBanner = memo(function StatusBanner({
  isLoading,
  waterStatus,
  crispScore,
  actionMessage,
  badge,
  fuzzyLabel,
  scoreLabel,
  error,
}: {
  isLoading: boolean;
  waterStatus: WaterStatus | string | null;
  crispScore: number | null;
  actionMessage: string | null;
  badge: string;
  fuzzyLabel: string;
  scoreLabel: string;
  error: string | null;
}) {
  const scoreWidth = Math.min(100, Math.max(0, crispScore ?? 0));

  return (
    <section className="mb-gutter">
      <div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <span className="text-label-caps font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">
              {fuzzyLabel}
            </span>
            <div className="flex items-baseline gap-4">
              <h2 className="text-display-lg font-display-lg text-on-surface leading-none">
                {isLoading ? "…" : statusLabel(waterStatus)}
              </h2>
              <div className="h-2 w-32 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container glow-cyan transition-all duration-500"
                  style={{ width: `${scoreWidth}%` }}
                />
              </div>
            </div>
            {actionMessage ? (
              <p className="mt-2 text-body-base font-body-base text-on-surface-variant max-w-xl">
                {actionMessage}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-end">
            <span className="text-label-caps font-label-caps text-primary mb-1">
              {scoreLabel}
            </span>
            <span className="text-display-lg font-display-lg text-primary-container leading-none animate-pulse-slow">
              {crispScore != null ? crispScore.toFixed(2) : "—"}
            </span>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-high/50 px-6 py-3 rounded-full border border-border-glass">
            <span className="material-symbols-outlined text-success-glow animate-pulse">
              verified_user
            </span>
            <span className="text-body-base font-body-base text-on-surface">
              {badge}
            </span>
          </div>
        </div>
        {error ? (
          <p className="relative z-10 mt-3 text-label-caps font-label-caps text-error-alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
});

const KpiGrid = memo(function KpiGrid({
  latest,
  realTimeLabel,
  labels,
}: {
  latest: TelemetryLog | null;
  realTimeLabel: string;
  labels: {
    acidity: string;
    tds: string;
    turbidity: string;
    temperature: string;
  };
}) {
  const ph = latest?.ph != null ? Number(latest.ph) : null;
  const tds = latest?.tds != null ? Number(latest.tds) : null;
  const turbidity = latest?.turbidity != null ? Number(latest.turbidity) : null;
  const temp = latest?.temp != null ? Number(latest.temp) : null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-widget-gap mb-gutter">
      <KpiCard
        icon="water_ph"
        realTimeLabel={realTimeLabel}
        title={labels.acidity}
        value={formatNum(ph, 1)}
        unit="pH"
        hint={phHint(ph)}
        hintClass="text-success-glow"
        hintIcon="trending_up"
      />
      <KpiCard
        icon="blur_on"
        realTimeLabel={realTimeLabel}
        title={labels.tds}
        value={formatNum(tds, 0)}
        unit="ppm"
        hint={tdsHint(tds)}
        hintClass="text-primary"
        hintIcon="swap_vert"
      />
      <KpiCard
        icon="waves"
        realTimeLabel={realTimeLabel}
        title={labels.turbidity}
        value={formatNum(turbidity, 1)}
        unit="NTU"
        hint={turbidityHint(turbidity)}
        hintClass="text-success-glow"
        hintIcon="check_circle"
      />
      <KpiCard
        icon="thermostat"
        realTimeLabel={realTimeLabel}
        title={labels.temperature}
        value={formatNum(temp, 1)}
        unit="°C"
        hint={tempHint(temp)}
        hintClass="text-tertiary"
        hintIcon="device_thermostat"
      />
    </section>
  );
});

const KpiCard = memo(function KpiCard({
  icon,
  realTimeLabel,
  title,
  value,
  unit,
  hint,
  hintClass,
  hintIcon,
}: {
  icon: string;
  realTimeLabel: string;
  title: string;
  value: string;
  unit: string;
  hint: string;
  hintClass: string;
  hintIcon: string;
}) {
  return (
    <div className="glass-panel neon-border rounded-xl p-6 group hover:bg-surface-glass/10 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <span className="material-symbols-outlined text-primary">{icon}</span>
        </div>
        <span className="text-label-caps font-label-caps text-on-surface-variant">
          {realTimeLabel}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-body-base font-body-base text-on-surface-variant">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-headline-md font-headline-md text-on-surface">
            {value}
          </span>
          <span className="text-label-caps font-label-caps text-on-surface-variant">
            {unit}
          </span>
        </div>
      </div>
      <div className={`mt-4 flex items-center gap-2 ${hintClass}`}>
        <span className="material-symbols-outlined text-sm">{hintIcon}</span>
        <span className="text-label-caps font-label-caps">{hint}</span>
      </div>
    </div>
  );
});

const KineticChart = memo(function KineticChart({
  series,
  isLive,
  title,
  subtitle,
  liveLabel,
  connectingLabel,
}: {
  series: ChartPoint[];
  isLive: boolean;
  title: string;
  subtitle: string;
  liveLabel: string;
  connectingLabel: string;
}) {
  const { area, stroke } = useMemo(
    () => buildKineticWavePath(series),
    [series],
  );
  const bufferLoad = Math.min(100, Math.round((series.length / 25) * 100));

  return (
    <section className="mb-gutter">
      <div className="glass-panel rounded-xl p-6 relative overflow-hidden min-h-[320px]">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="text-headline-md font-headline-md text-on-surface">
              {title}
            </h3>
            <p className="text-body-base font-body-base text-on-surface-variant">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={
                isLive
                  ? "text-label-caps font-label-caps text-success-glow"
                  : "text-label-caps font-label-caps text-on-surface-variant"
              }
            >
              {isLive ? liveLabel : connectingLabel}
            </span>
            <span className="text-data-mono font-data-mono text-primary">
              {bufferLoad}% UTILIZED
            </span>
          </div>
        </div>

        <div className="relative h-64">
          <svg
            className="absolute bottom-0 w-full h-64 overflow-visible pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 1600 400"
          >
            <path d={area} fill="url(#gradient1)" opacity="0.1" />
            <path
              d={stroke}
              fill="none"
              stroke="rgba(0, 209, 255, 0.4)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: "rgba(0, 209, 255, 0.5)",
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: "rgba(0, 209, 255, 0)",
                    stopOpacity: 0,
                  }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
});

const UtilityRow = memo(function UtilityRow({
  online,
  total,
  openAlerts,
  isLive,
  isLoading,
  labels,
}: {
  online: number;
  total: number;
  openAlerts: number;
  isLive: boolean;
  isLoading: boolean;
  labels: Record<string, string>;
}) {
  return (
    <section className="mt-gutter grid grid-cols-1 lg:grid-cols-3 gap-widget-gap">
      <Link
        href="/devices"
        className="glass-panel p-6 rounded-xl flex items-center justify-between hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">memory</span>
          </div>
          <div>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {labels.nodesOnline}
            </span>
            <h4 className="text-headline-md font-headline-md text-on-surface">
              {online} / {total}
            </h4>
          </div>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant">
          chevron_right
        </span>
      </Link>
      <Link
        href="/settings?tab=alerts"
        className="glass-panel p-6 rounded-xl flex items-center justify-between hover:border-primary/40 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">
              notifications_active
            </span>
          </div>
          <div>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {labels.systemAlerts}
            </span>
            <h4 className="text-headline-md font-headline-md text-on-surface">
              {openAlerts > 0 ? `${openAlerts} ${labels.critical}` : labels.none}
            </h4>
          </div>
        </div>
        <span className="px-2 py-1 bg-surface-container text-success-glow text-label-caps font-label-caps rounded">
          {openAlerts > 0 ? labels.alert : labels.healthy}
        </span>
      </Link>
      <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary">cloud_sync</span>
          </div>
          <div>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {labels.uplinkStatus}
            </span>
            <h4 className="text-headline-md font-headline-md text-on-surface">
              {isLive ? labels.live : isLoading ? labels.syncing : labels.idle}
            </h4>
          </div>
        </div>
        {isLive ? (
          <div className="w-4 h-4 rounded-full bg-success-glow shadow-[0_0_8px_#00FFC2]" />
        ) : (
          <div className="w-4 h-4 rounded-full border-2 border-tertiary border-t-transparent animate-spin" />
        )}
      </div>
    </section>
  );
});
