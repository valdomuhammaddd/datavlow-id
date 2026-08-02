"use client";

import Link from "next/link";
import { memo, useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/layout/app-shell";
import { FuzzyScoreGauge } from "@/components/dashboard/fuzzy-score-gauge";
import { StatusDot } from "@/components/ui/status-dot";
import { useGlobalUI } from "@/context/GlobalUIContext";
import { useFleetStats } from "@/hooks/useFleetStats";
import {
  useRealtimeTelemetry,
  type RealtimeChartPoint as ChartPoint,
} from "@/hooks/useRealtimeTelemetry";
import type { Device, TelemetryLog, WaterStatus } from "@/types/database.types";

function formatNum(value: number | null | undefined, digits = 1): string {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }
  return Number(value).toFixed(digits);
}

/** Banner / KPI status — missing water_status → Processing... */
function statusLabel(status: WaterStatus | string | null | undefined): string {
  if (!status) return "…";
  return String(status);
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

/**
 * Precision Telemetry — REAL-TIME GRAPH VIEW ONLY.
 * Spreadsheet lives at /ledger (and /analytics).
 */
export function PrecisionTelemetryDashboard() {
  const { t } = useGlobalUI();
  const { latest, chartSeries, isLive, isLoading, error, logs } =
    useRealtimeTelemetry();
  const fleet = useFleetStats();
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    void fetch("/api/v1/devices", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { data?: Device[] } | null) => {
        if (json?.data) setDevices(json.data);
      })
      .catch(() => undefined);
  }, []);

  const deferredSeries = useDeferredValue(chartSeries);

  const activeDevice = useMemo(() => {
    if (!latest?.device_id) return null;
    return devices.find((d) => d.api_key === latest.device_id) ?? null;
  }, [devices, latest?.device_id]);

  const waterStatus = latest?.water_status ?? null;
  const crispScore =
    latest?.crisp_score != null ? Number(latest.crisp_score) : null;
  const actionMessage = latest?.action_message ?? null;

  const badge = useMemo(() => {
    if (!waterStatus) return t("processing");
    if (waterStatus === "Baik") return t("systemOptimal");
    if (waterStatus === "Cukup Baik") return t("systemCaution");
    if (waterStatus === "Tidak Baik") return t("systemAlert");
    return t("processing");
  }, [waterStatus, t]);

  return (
    <AppShell>
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="font-label-caps text-[10px] text-primary tracking-[0.14em]">
            {t("realTime")} GRAPH VIEW
          </p>
          <h2 className="font-display text-2xl font-bold text-on-surface tracking-tight">
            {t("precisionTelemetry")}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {activeDevice ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-glass bg-surface-container/70">
                <StatusDot status={activeDevice.status} />
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  {t("activeDevice")}
                </span>
                <span className="font-data-mono text-sm text-primary font-semibold">
                  {activeDevice.name}
                </span>
                <span className="font-label-caps text-[10px] uppercase text-on-surface-variant">
                  {activeDevice.status === "online" ? t("online") : t("offline")}
                </span>
              </div>
            ) : latest?.device_id ? (
              <span className="text-sm text-on-surface-variant">
                {t("unknownDevice")}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-on-surface-variant mt-1">
            {t("precisionTelemetryDesc")} ({logs.length}/30)
          </p>
        </div>
        <Link
          href="/ledger"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-glass font-label-caps text-[11px] hover:border-primary/40"
        >
          <span className="material-symbols-outlined text-[18px]">table_chart</span>
          {t("openSpreadsheetLedger")}
        </Link>
      </div>

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
        title={t("kineticStreams")}
        subtitle={t("kineticStreamsDesc")}
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

function bannerGlow(score: number | null): string {
  if (score == null) return "from-primary/10";
  if (score > 80) return "from-cyan-400/20 via-transparent to-transparent shadow-[inset_0_0_40px_rgba(0,209,255,0.12)]";
  if (score >= 60) return "from-orange-500/20 via-transparent to-transparent shadow-[inset_0_0_40px_rgba(255,138,0,0.1)]";
  return "from-red-500/25 via-transparent to-transparent shadow-[inset_0_0_48px_rgba(255,61,0,0.15)] animate-pulse";
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
  const displayStatus = isLoading ? "…" : statusLabel(waterStatus);
  const score = isLoading ? null : crispScore;

  return (
    <section className="mb-gutter">
      <div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
        <div
          className={`absolute inset-0 bg-gradient-to-r opacity-80 ${bannerGlow(score)}`}
        />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <FuzzyScoreGauge score={score} size={148} />
            <div className="flex flex-col min-w-0">
              <span className="text-label-caps font-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">
                {fuzzyLabel}
              </span>
              <h2 className="text-display-lg font-display-lg text-on-surface leading-none truncate">
                {displayStatus}
              </h2>
              {actionMessage ? (
                <p className="mt-2 text-body-base font-body-base text-on-surface-variant max-w-xl">
                  {actionMessage}
                </p>
              ) : null}
              <p className="mt-2 text-label-caps font-label-caps text-on-surface-variant">
                {scoreLabel}:{" "}
                <span className="font-data-mono text-on-surface tabular-nums">
                  {score != null ? score.toFixed(1) : "—"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-high/50 px-6 py-3 rounded-full border border-border-glass shrink-0">
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

const SERIES_META = [
  {
    key: "ph" as const,
    label: "pH",
    unit: "pH",
    color: "#00d1ff",
    gradientId: "gradPh",
  },
  {
    key: "tds" as const,
    label: "TDS",
    unit: "ppm",
    color: "#ff8a00",
    gradientId: "gradTds",
  },
  {
    key: "turbidity" as const,
    label: "Turbidity",
    unit: "NTU",
    color: "#00ffc2",
    gradientId: "gradTurb",
  },
  {
    key: "temp" as const,
    label: "Temp",
    unit: "°C",
    color: "#feb127",
    gradientId: "gradTemp",
  },
];

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
  const bufferLoad = Math.min(100, Math.round((series.length / 30) * 100));
  const tickFill = "var(--on-surface-variant)";
  const gridStroke = "var(--grid-line)";

  return (
    <section className="mb-gutter">
      <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-5 relative z-10">
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
              {bufferLoad}% · {series.length}/30
            </span>
          </div>
        </div>

        {series.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-on-surface-variant font-label-caps text-sm">
            Waiting for telemetry…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERIES_META.map((meta, index) => {
              const latestVal = series[series.length - 1]?.[meta.key];
              return (
                <div
                  key={meta.key}
                  className="rounded-xl border border-border-glass bg-surface-container-low/60 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: meta.color,
                          boxShadow: `0 0 10px ${meta.color}`,
                        }}
                      />
                      <span className="font-label-caps text-[11px] text-on-surface tracking-wider">
                        {meta.label}
                      </span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant">
                        {meta.unit}
                      </span>
                    </div>
                    <span
                      className="font-data-mono text-lg font-semibold tabular-nums"
                      style={{ color: meta.color }}
                    >
                      {typeof latestVal === "number"
                        ? latestVal.toFixed(meta.key === "tds" ? 0 : 1)
                        : "—"}
                    </span>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={series}
                        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id={meta.gradientId}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={meta.color}
                              stopOpacity={0.45}
                            />
                            <stop
                              offset="100%"
                              stopColor={meta.color}
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          stroke={gridStroke}
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="time"
                          tick={{ fill: tickFill, fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          minTickGap={28}
                        />
                        <YAxis
                          tick={{ fill: tickFill, fontSize: 10 }}
                          axisLine={false}
                          tickLine={false}
                          width={36}
                          domain={["auto", "auto"]}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "var(--surface-container)",
                            border: "1px solid var(--glass-border)",
                            borderRadius: 8,
                            fontSize: 12,
                            color: "var(--on-surface)",
                          }}
                          labelStyle={{ color: meta.color }}
                          formatter={(value: number) => [
                            `${Number(value).toFixed(meta.key === "tds" ? 0 : 2)} ${meta.unit}`,
                            meta.label,
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey={meta.key}
                          name={meta.label}
                          stroke={meta.color}
                          strokeWidth={2.5}
                          fill={`url(#${meta.gradientId})`}
                          dot={false}
                          activeDot={{
                            r: 4,
                            strokeWidth: 0,
                            fill: meta.color,
                          }}
                          isAnimationActive
                          animationBegin={index * 120}
                          animationDuration={900}
                          animationEasing="ease-out"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
