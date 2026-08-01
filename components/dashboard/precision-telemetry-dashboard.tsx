"use client";

import Link from "next/link";
import { memo, useDeferredValue, useMemo } from "react";

import { ThemeLanguageControls } from "@/components/ui/theme-language-controls";
import { useGlobalUI } from "@/context/GlobalUIContext";
import {
  useTelemetryStream,
  type ChartPoint,
} from "@/hooks/useTelemetryStream";
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
  const { latest, chartSeries, isLive, isLoading, error } = useTelemetryStream();

  // Defer chart path work so KPI banner paints first on high-frequency inserts
  const deferredSeries = useDeferredValue(chartSeries);

  const waterStatus = latest?.water_status ?? null;
  const crispScore =
    latest?.crisp_score != null ? Number(latest.crisp_score) : null;

  const badge = useMemo(() => {
    if (waterStatus === "Baik") return t("systemOptimal");
    if (waterStatus === "Cukup Baik") return t("systemCaution");
    if (waterStatus === "Tidak Baik") return t("systemAlert");
    return t("awaitingTelemetry");
  }, [waterStatus, t]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass">
        <div className="flex items-center gap-8">
          <h1 className="font-display-lg text-headline-md font-bold text-primary tracking-tighter">
            DATAVLOW.ID
          </h1>
          <nav className="hidden md:flex gap-6">
            <Link
              className="text-primary font-bold border-b-2 border-primary pb-1 font-body-base text-body-base"
              href="/"
            >
              {t("dashboard")}
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors font-body-base text-body-base"
              href="/"
            >
              {t("network")}
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors font-body-base text-body-base"
              href="/"
            >
              {t("devices")}
            </Link>
          </nav>
        </div>
        <ThemeLanguageControls />
      </header>

      <aside className="fixed left-0 top-0 h-full hidden lg:flex flex-col py-24 w-20 border-r border-border-glass bg-bg-obsidian z-40 items-center gap-8">
        <Link
          href="/"
          className="material-symbols-outlined text-primary bg-surface-glass p-3 rounded-xl border border-primary/20"
        >
          dashboard
        </Link>
        <button
          type="button"
          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all"
        >
          router
        </button>
        <button
          type="button"
          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all"
        >
          account_tree
        </button>
        <Link
          href="/analytics"
          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all"
        >
          analytics
        </Link>
        <div className="mt-auto flex flex-col gap-6 pb-8">
          <button
            type="button"
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all"
          >
            settings
          </button>
          <button
            type="button"
            className="material-symbols-outlined text-on-surface-variant hover:text-error transition-all"
          >
            logout
          </button>
        </div>
      </aside>

      <main className="pt-24 pl-margin-desktop pr-margin-desktop lg:pl-32 pb-margin-desktop min-h-screen">
        <StatusBanner
          isLoading={isLoading}
          waterStatus={waterStatus}
          crispScore={crispScore}
          badge={badge}
          fuzzyLabel={t("fuzzyEngine")}
          scoreLabel={t("aggregateScore")}
          error={error}
        />

        <KpiGrid latest={latest} realTimeLabel={t("realTime")} labels={{
          acidity: t("acidity"),
          tds: t("tdsLevel"),
          turbidity: t("turbidity"),
          temperature: t("temperature"),
        }} />

        <KineticChart
          series={deferredSeries}
          isLive={isLive}
          title={t("telemetryTopography")}
          subtitle={t("kineticTrends")}
          liveLabel={t("liveStream")}
          connectingLabel={t("connecting")}
        />

        <UtilityRow
          waterStatus={waterStatus}
          isLive={isLive}
          isLoading={isLoading}
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
      </main>

      <button
        type="button"
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg glow-cyan hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add
        </span>
      </button>
    </>
  );
}

const StatusBanner = memo(function StatusBanner({
  isLoading,
  waterStatus,
  crispScore,
  badge,
  fuzzyLabel,
  scoreLabel,
  error,
}: {
  isLoading: boolean;
  waterStatus: WaterStatus | string | null;
  crispScore: number | null;
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
    <section className="grid grid-cols-1 gap-gutter">
      <div className="glass-panel rounded-2xl relative overflow-hidden min-h-[500px] flex flex-col p-8">
        <div className="flex justify-between items-center mb-12 z-10">
          <div>
            <h3 className="text-headline-md font-headline-md text-on-surface">
              {title}
            </h3>
            <p className="text-body-base font-body-base text-on-surface-variant">
              {subtitle}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg border border-border-glass">
              <div
                className={`w-3 h-3 rounded-full bg-primary glow-cyan ${isLive ? "animate-pulse" : "opacity-40"}`}
              />
              <span className="text-label-caps font-label-caps text-on-surface">
                {isLive ? liveLabel : connectingLabel}
              </span>
            </div>
            <button
              type="button"
              className="material-symbols-outlined text-on-surface-variant hover:text-on-surface p-2 glass-panel rounded-lg"
            >
              more_vert
            </button>
          </div>
        </div>

        <div className="flex-grow relative kinetic-grid rounded-xl overflow-hidden chart-flow-mask">
          <div className="absolute bottom-8 left-8 flex gap-8 z-10">
            <div className="flex flex-col">
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                SAMPLING RATE
              </span>
              <span className="text-data-mono font-data-mono text-primary">
                {series.length > 1 ? "STREAM / PKT" : "125ms / PKT"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-caps font-label-caps text-on-surface-variant">
                BUFFER LOAD
              </span>
              <span className="text-data-mono font-data-mono text-primary">
                {bufferLoad}% UTILIZED
              </span>
            </div>
          </div>

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
  waterStatus,
  isLive,
  isLoading,
  labels,
}: {
  waterStatus: WaterStatus | string | null;
  isLive: boolean;
  isLoading: boolean;
  labels: Record<string, string>;
}) {
  return (
    <section className="mt-gutter grid grid-cols-1 lg:grid-cols-3 gap-widget-gap">
      <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">memory</span>
          </div>
          <div>
            <span className="text-label-caps font-label-caps text-on-surface-variant">
              {labels.nodesOnline}
            </span>
            <h4 className="text-headline-md font-headline-md text-on-surface">
              14 / 15
            </h4>
          </div>
        </div>
        <button
          type="button"
          className="material-symbols-outlined text-on-surface-variant"
        >
          chevron_right
        </button>
      </div>
      <div className="glass-panel p-6 rounded-xl flex items-center justify-between">
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
              {waterStatus === "Tidak Baik" ? labels.critical : labels.none}
            </h4>
          </div>
        </div>
        <span className="px-2 py-1 bg-surface-container text-success-glow text-label-caps font-label-caps rounded">
          {waterStatus === "Tidak Baik" ? labels.alert : labels.healthy}
        </span>
      </div>
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
