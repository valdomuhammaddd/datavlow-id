"use client";

import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";
import { useTelemetryLedger } from "@/hooks/useTelemetryLedger";
import {
  exportToCSV,
  exportToJSON,
  exportToPrintablePdf,
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
    statusFilter,
    setStatusFilter,
    filtersOpen,
    setFiltersOpen,
    page,
    setPage,
    pageCount,
    pageWindow,
    totalEstimate,
    stats,
    isLoading,
    isLive,
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

  const handleExportPdf = useCallback(() => {
    try {
      exportToPrintablePdf(exportRows, "DATAVLOW.ID Water Quality Ledger");
      setExportError(null);
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    }
  }, [exportRows]);

  const lastSync = filtered[0]?.created_at;

  return (
    <AppShell>
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
              onClick={handleExportPdf}
              className="px-4 py-2 font-label-caps text-label-caps rounded-md text-on-surface hover:bg-surface-variant transition-colors flex items-center space-x-2"
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
                onClick={() => setFiltersOpen((v) => !v)}
                className={
                  filtersOpen || statusFilter !== "all"
                    ? "p-1.5 rounded bg-primary/15 text-primary"
                    : "p-1.5 rounded hover:bg-surface-variant transition-colors text-on-surface-variant"
                }
                aria-label="Filter status"
              >
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <span
                className={
                  isLive
                    ? "font-label-caps text-[10px] text-success-glow"
                    : "font-label-caps text-[10px] text-on-surface-variant"
                }
              >
                {isLive ? "LIVE" : "IDLE"}
              </span>
            </div>
          </div>

          {filtersOpen ? (
            <div className="px-6 py-3 border-b border-border-glass flex flex-wrap gap-2">
              {(
                [
                  ["all", "ALL"],
                  ["Baik", "BAIK"],
                  ["Cukup Baik", "CUKUP"],
                  ["Tidak Baik", "ALERT"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setStatusFilter(value);
                    setPage(0);
                  }}
                  className={
                    statusFilter === value
                      ? "px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-caps text-[10px]"
                      : "px-3 py-1 rounded-full border border-border-glass font-label-caps text-[10px] text-on-surface-variant"
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}

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
              {pageWindow.map((i) => (
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

        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                {t("activeNodes")}
              </h4>
              <p className="font-body-base text-body-base text-on-surface">
                {stats.nodeCount} node · {filtered.length} rows in view
              </p>
            </div>
            <Link
              href="/devices"
              className="px-4 py-2 rounded-lg border border-border-glass font-label-caps text-xs hover:border-primary"
            >
              MANAGE FLEET
            </Link>
          </div>
          <p className="text-sm text-on-surface-variant">
            Spatial map placeholder retired — gunakan Devices untuk status node
            realtime dan Simulation untuk inject sample ke ledger live.
          </p>
        </div>
    </AppShell>
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
