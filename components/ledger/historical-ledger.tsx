"use client";

import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";

import { useGlobalUI } from "@/context/GlobalUIContext";
import { useTelemetryLedger } from "@/hooks/useTelemetryLedger";
import {
  exportToCSV,
  exportToJSON,
  telemetryToExportRows,
} from "@/lib/exportData";
import type { TelemetryLog } from "@/types/database.types";

function formatNum(value: number | null | undefined, digits = 1): string {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return Number(value).toFixed(digits);
}

function statusClass(status: string | null): string {
  if (status === "Baik") return "status-glow-baik text-success-glow bg-success-glow/10";
  if (status === "Cukup Baik") {
    return "status-glow-cukup text-tertiary-container bg-tertiary-container/10";
  }
  if (status === "Tidak Baik") {
    return "status-glow-tidak text-error-alert bg-error-alert/10";
  }
  return "text-on-surface-variant bg-surface-variant/40";
}

function relativeSync(iso: string | undefined, locale: string): string {
  if (!iso) return "—";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(0, Math.floor(diffMs / 60000));
  if (mins < 1) return locale === "ID" ? "<1m lalu" : "<1m ago";
  return locale === "ID" ? `${mins}m lalu` : `${mins}m ago`;
}

export function HistoricalLedger() {
  const { t, locale } = useGlobalUI();
  const {
    filtered,
    pageRows,
    query,
    setQuery,
    page,
    setPage,
    pageCount,
    totalEstimate,
    stats,
    isLoading,
    error,
  } = useTelemetryLedger();

  const [exportError, setExportError] = useState<string | null>(null);

  const exportRows = useMemo(
    () => telemetryToExportRows(filtered),
    [filtered],
  );

  const handleExportCsv = useCallback(() => {
    try {
      exportToCSV(exportRows, `datavlow-ledger-${Date.now()}.csv`);
      setExportError(null);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    }
  }, [exportRows]);

  const handleExportJson = useCallback(() => {
    try {
      exportToJSON(exportRows, `datavlow-ledger-${Date.now()}.json`);
      setExportError(null);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    }
  }, [exportRows]);

  const lastSync = filtered[0]?.created_at;

  return (
    <>
      <nav className="fixed left-0 top-0 h-full flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-50">
        <div className="px-6 mb-10">
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">
            DATAVLOW.ID
          </h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant opacity-60">
            {t("commandCenter")}
          </p>
        </div>
        <div className="flex-1 px-4 space-y-2">
          <Link
            className="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all"
            href="/"
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="font-label-caps text-label-caps">{t("dashboard")}</span>
          </Link>
          <a className="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
            <span className="material-symbols-outlined text-xl">router</span>
            <span className="font-label-caps text-label-caps">{t("devices")}</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
            <span className="material-symbols-outlined text-xl">account_tree</span>
            <span className="font-label-caps text-label-caps">{t("logicBuilder")}</span>
          </a>
          <Link
            className="flex items-center space-x-3 px-4 py-3 rounded bg-surface-glass text-primary border-l-4 border-primary translate-x-1 duration-200"
            href="/analytics"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              analytics
            </span>
            <span className="font-label-caps text-label-caps">{t("analytics")}</span>
          </Link>
          <a className="flex items-center space-x-3 px-4 py-3 rounded text-on-surface-variant hover:bg-surface-glass transition-all" href="#">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="font-label-caps text-label-caps">{t("settings")}</span>
          </a>
        </div>
        <div className="px-4 mt-auto space-y-2">
          <button
            type="button"
            className="w-full bg-primary-container text-on-primary-fixed font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-[1.02] transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="font-label-caps text-label-caps">{t("addDevice")}</span>
          </button>
          <div className="pt-6 border-t border-border-glass">
            <a className="flex items-center space-x-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">help</span>
              <span className="font-label-caps text-label-caps">{t("help")}</span>
            </a>
            <a className="flex items-center space-x-3 px-4 py-2 text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">logout</span>
              <span className="font-label-caps text-label-caps">{t("logout")}</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="ml-64 min-h-screen p-margin-desktop bg-bg-obsidian">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              {t("historicalLedger")}
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-1">
              {t("historicalLedgerDesc")}
            </p>
          </div>
          <div className="glass-panel rounded-lg p-1.5 flex items-center space-x-2">
            <span className="font-label-caps text-label-caps px-3 text-on-surface-variant/70">
              {t("export")}
            </span>
            <div className="h-4 w-[1px] bg-border-glass" />
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-4 py-2 font-label-caps text-label-caps rounded-md text-on-surface hover:bg-surface-variant transition-colors flex items-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              <span>CSV</span>
            </button>
            <button
              type="button"
              disabled
              title="PDF export coming soon"
              className="px-4 py-2 font-label-caps text-label-caps rounded-md text-on-surface/40 cursor-not-allowed flex items-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="px-4 py-2 font-label-caps text-label-caps rounded-md text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors flex items-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">code</span>
              <span>JSON</span>
            </button>
          </div>
        </header>

        {(exportError || error) && (
          <p className="mb-4 text-label-caps font-label-caps text-error-alert">
            {exportError || error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-widget-gap mb-8">
          <StatCard
            icon="water_drop"
            label={t("avgPh")}
            value={stats.avgPh != null ? stats.avgPh.toFixed(2) : "—"}
            unit="pH"
            hint={t("stableNominal")}
            hintClass="text-success-glow"
            hintIcon="trending_up"
          />
          <StatCard
            icon="opacity"
            label={t("tdsAggregate")}
            value={stats.avgTds != null ? Math.round(stats.avgTds).toString() : "—"}
            unit="ppm"
            hint={t("slightIncrease")}
            hintClass="text-tertiary-container"
            hintIcon="warning"
          />
          <StatCard
            icon="thermostat"
            label={t("meanTemp")}
            value={stats.avgTemp != null ? stats.avgTemp.toFixed(1) : "—"}
            unit="°C"
            hint={t("controlled")}
            hintClass="text-success-glow"
            hintIcon="check_circle"
          />
          <StatCard
            icon="sensors"
            label={t("activeNodes")}
            value={String(stats.nodeCount)}
            unit={t("online")}
            hint={`${t("lastSync")}: ${relativeSync(lastSync, locale)}`}
            hintClass="text-on-surface-variant"
            hintIcon="sync"
          />
        </div>

        <div className="glass-panel rounded-xl overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-border-glass bg-surface-glass flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-on-surface-variant">
                drag_indicator
              </span>
              <h3 className="font-label-caps text-label-caps text-on-surface">
                {t("dataStreamLedger")}
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  search
                </span>
                <input
                  className="bg-obsidian border-border-glass rounded text-sm pl-10 pr-4 py-1.5 w-48 focus:border-primary-container focus:ring-0 transition-all placeholder:text-on-surface-variant/40"
                  placeholder={t("searchNodeId")}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(0);
                  }}
                />
              </div>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface-variant">
                  filter_list
                </span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest">
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    Node ID
                  </th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    pH
                  </th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    TDS (ppm)
                  </th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    Turbidity
                  </th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    Temp (°C)
                  </th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant border-b border-border-glass">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-glass/50">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-on-surface-variant font-label-caps text-label-caps"
                    >
                      {t("syncing")}
                    </td>
                  </tr>
                ) : pageRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-on-surface-variant font-label-caps text-label-caps"
                    >
                      —
                    </td>
                  </tr>
                ) : (
                  pageRows.map((row) => <LedgerRow key={row.id} row={row} />)
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-border-glass bg-surface-glass flex justify-between items-center">
            <p className="font-label-caps text-[10px] text-on-surface-variant">
              {t("showing")} {pageRows.length} {t("of")}{" "}
              {filtered.length || totalEstimate} {t("recordedTelemetries")}
              {query ? ` · filter: "${query}"` : ""}
            </p>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="p-1 rounded text-on-surface-variant hover:bg-surface-variant disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: Math.min(pageCount, 3) }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  className={
                    page === i
                      ? "px-3 py-1 rounded bg-primary/20 text-primary font-data-mono text-xs border border-primary/30"
                      : "px-3 py-1 rounded hover:bg-surface-variant font-data-mono text-xs"
                  }
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                disabled={page >= pageCount - 1}
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                className="p-1 rounded text-on-surface-variant hover:bg-surface-variant disabled:opacity-30"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-widget-gap">
          <div className="lg:col-span-2 glass-panel p-6 rounded-xl h-64 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                {t("liveMap")}
              </h4>
              <p className="font-body-base text-body-base text-on-surface">
                {t("regionalSector")}
              </p>
            </div>
            <div className="absolute bottom-6 right-6 z-10 flex space-x-2">
              <div className="flex items-center space-x-2 bg-obsidian/80 backdrop-blur border border-border-glass px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-success-glow animate-pulse" />
                <span className="font-label-caps text-[10px]">
                  {t("realtimeTracking")}
                </span>
              </div>
            </div>
          </div>
          <div className="glass-panel p-0 rounded-xl overflow-hidden relative min-h-[16rem]">
            <div
              className="w-full h-full bg-cover bg-center absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbRMShkbBmQMKEwC2f1qKKpSO-NG9J6MMz5Uzk_pSHVoFQfOc4aX4eT_DonxyzTH8SIQd_lJsb0VnP1zPtcm_nFiwt1gLwp9enfi3VIw2PS8H-Dzi7_6sU8D2_llXnF9MaVKQRgA8gKl2n3wVkgKBODJ5A2Hhe_CL8RejhxAu1rKgau7CkjqSqhSIRiLCiUlUpo0HC10PoZmgAElAJ4XSQhTDJBdyOIlaF_V6oMw2J2-G7-PujFMxT7g')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h4 className="font-label-caps text-label-caps text-primary">
                {t("spatialNodeView")}
              </h4>
              <p className="font-label-caps text-[10px] text-on-surface-variant">
                {t("satelliteOverlay")}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const StatCard = memo(function StatCard({
  icon,
  label,
  value,
  unit,
  hint,
  hintClass,
  hintIcon,
}: {
  icon: string;
  label: string;
  value: string;
  unit: string;
  hint: string;
  hintClass: string;
  hintIcon: string;
}) {
  return (
    <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-5xl">{icon}</span>
      </div>
      <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
        {label}
      </p>
      <p className="font-headline-md text-headline-md text-primary">
        {value}{" "}
        <span className="text-xs text-on-surface-variant font-normal tracking-normal ml-1">
          {unit}
        </span>
      </p>
      <div className={`mt-4 flex items-center text-xs font-medium ${hintClass}`}>
        <span className="material-symbols-outlined text-sm mr-1">{hintIcon}</span>
        <span>{hint}</span>
      </div>
    </div>
  );
});

const LedgerRow = memo(function LedgerRow({ row }: { row: TelemetryLog }) {
  const time = new Date(row.created_at);
  const timeLabel = Number.isNaN(time.getTime())
    ? row.created_at
    : `${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} / ${time.toLocaleDateString()}`;

  return (
    <tr className="data-row transition-all group">
      <td className="px-6 py-3 font-data-mono text-data-mono text-on-surface-variant">
        {timeLabel}
      </td>
      <td className="px-6 py-3 font-data-mono text-data-mono text-primary font-medium tracking-wider">
        {row.device_id}
      </td>
      <td className="px-6 py-3 font-data-mono text-data-mono text-on-surface">
        {formatNum(row.ph, 2)}
      </td>
      <td className="px-6 py-3 font-data-mono text-data-mono text-on-surface">
        {formatNum(row.tds, 0)}
      </td>
      <td className="px-6 py-3 font-data-mono text-data-mono text-on-surface">
        {formatNum(row.turbidity, 2)} NTU
      </td>
      <td className="px-6 py-3 font-data-mono text-data-mono text-on-surface">
        {formatNum(row.temp, 1)}°
      </td>
      <td className="px-6 py-3">
        <span
          className={`px-3 py-1 rounded-full font-label-caps text-[10px] uppercase tracking-widest ${statusClass(row.water_status)}`}
        >
          {row.water_status ?? "—"}
        </span>
      </td>
    </tr>
  );
});
