"use client";

import Link from "next/link";
import { memo, useCallback, useMemo, useState, useTransition } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";
import { useTelemetryLedger } from "@/hooks/useTelemetryLedger";
import type { LedgerRow } from "@/lib/ledger/query";
import { exportToCSV, telemetryToExportRows } from "@/lib/exportData";

function formatNum(value: number | null | undefined, digits = 1): string {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return Number(value).toFixed(digits);
}

function statusClass(status: string | null): string {
  if (status === "Baik") return "text-success-glow bg-success-glow/10";
  if (status === "Cukup Baik") {
    return "text-tertiary-container bg-tertiary-container/10";
  }
  if (status === "Tidak Baik") {
    return "text-error-alert bg-error-alert/10";
  }
  return "text-on-surface-variant bg-surface-variant/40";
}

/**
 * Water Quality Ledger — SPREADSHEET VIEW ONLY.
 */
export function HistoricalLedger() {
  const { t } = useGlobalUI();
  const {
    pageRows,
    filtered,
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
    isLoading,
    error,
    refresh,
  } = useTelemetryLedger();

  const [exportError, setExportError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();

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

  const handleDelete = useCallback(
    (id: number) => {
      if (!window.confirm(t("deleteRowConfirm"))) return;
      start(async () => {
        const res = await fetch("/api/v1/ledger", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) {
          setActionMsg(t("deleteFail"));
          return;
        }
        setActionMsg(t("deleteOk"));
        await refresh();
      });
    },
    [refresh, t],
  );

  return (
    <AppShell>
      <header className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <p className="font-label-caps text-[10px] text-primary tracking-[0.14em]">
            {t("spreadsheetView")}
          </p>
          <h2 className="font-display text-2xl font-bold text-on-surface tracking-tight">
            {t("historicalLedger")}
          </h2>
          <p className="text-sm text-on-surface-variant mt-1 max-w-xl">
            {t("historicalLedgerDesc")}{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              {t("dashboard")}
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-[11px] font-bold flex items-center gap-2 hover:brightness-110"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {t("exportCsv")}
          </button>
          <button
            type="button"
            onClick={() => void refresh()}
            className="px-4 py-2.5 rounded-lg border border-border-glass font-label-caps text-[11px] hover:border-primary/40"
          >
            {t("refresh")}
          </button>
        </div>
      </header>

      {(exportError || error || actionMsg) && (
        <p
          className={`mb-4 text-label-caps font-label-caps ${
            actionMsg && !error && !exportError
              ? "text-success-glow"
              : "text-error-alert"
          }`}
        >
          {exportError || error || actionMsg}
        </p>
      )}

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border-glass flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              className="bg-bg-obsidian border border-border-glass rounded-lg text-sm pl-10 pr-4 py-2 w-56 text-on-surface focus:border-primary outline-none"
              placeholder={t("searchDeviceName")}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className={
                filtersOpen || statusFilter !== "all"
                  ? "p-2 rounded-lg bg-primary/15 text-primary"
                  : "p-2 rounded-lg hover:bg-surface-variant text-on-surface-variant"
              }
              aria-label="Filter status"
            >
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <span className="font-label-caps text-[10px] text-on-surface-variant">
              {totalEstimate} {t("rows")}
            </span>
          </div>
        </div>

        {filtersOpen ? (
          <div className="px-4 py-3 border-b border-border-glass flex flex-wrap gap-2">
            {(
              [
                ["all", "filterAll"],
                ["Baik", "filterBaik"],
                ["Cukup Baik", "filterCukup"],
                ["Tidak Baik", "filterAlert"],
              ] as const
            ).map(([value, key]) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={
                  statusFilter === value
                    ? "px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-caps text-[10px]"
                    : "px-3 py-1 rounded-full border border-border-glass font-label-caps text-[10px] text-on-surface-variant"
                }
              >
                {t(key)}
              </button>
            ))}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  {t("timestamp")}
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  {t("deviceName")}
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  pH
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  TDS
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  {t("turbidity")}
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  {t("temperature")}
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  {t("status")}
                </th>
                <th className="px-4 py-3 font-label-caps text-[10px] text-on-surface-variant border-b border-border-glass">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-glass/50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-on-surface-variant font-label-caps text-sm"
                  >
                    {t("syncing")}
                  </td>
                </tr>
              ) : pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-on-surface-variant font-label-caps text-sm"
                  >
                    {t("noLedgerRows")}
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <LedgerRowView
                    key={row.id}
                    row={row as LedgerRow}
                    processingLabel={t("processing")}
                    deleteLabel={t("delete")}
                    pending={pending}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-border-glass flex justify-between items-center">
          <p className="font-label-caps text-[10px] text-on-surface-variant">
            {t("pageOf")} {page + 1} / {pageCount} · {t("showing")}{" "}
            {pageRows.length} {t("of")} {totalEstimate}
          </p>
          <div className="flex items-center gap-1">
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
    </AppShell>
  );
}

const LedgerRowView = memo(function LedgerRowView({
  row,
  processingLabel,
  deleteLabel,
  pending,
  onDelete,
}: {
  row: LedgerRow;
  processingLabel: string;
  deleteLabel: string;
  pending: boolean;
  onDelete: (id: number) => void;
}) {
  const time = new Date(row.created_at);
  const timeLabel = Number.isNaN(time.getTime())
    ? row.created_at
    : time.toLocaleString();
  const status = row.water_status?.trim()
    ? row.water_status
    : processingLabel;

  return (
    <tr className="hover:bg-[var(--row-hover)] transition-colors">
      <td className="px-4 py-2.5 font-data-mono text-xs text-on-surface whitespace-nowrap">
        {timeLabel}
      </td>
      <td className="px-4 py-2.5 font-data-mono text-xs text-primary tracking-wide font-semibold">
        {row.device_name || row.device_id}
      </td>
      <td className="px-4 py-2.5 font-data-mono text-xs text-on-surface">
        {formatNum(row.ph, 2)}
      </td>
      <td className="px-4 py-2.5 font-data-mono text-xs text-on-surface">
        {formatNum(row.tds, 0)}
      </td>
      <td className="px-4 py-2.5 font-data-mono text-xs text-on-surface">
        {formatNum(row.turbidity, 2)}
      </td>
      <td className="px-4 py-2.5 font-data-mono text-xs text-on-surface">
        {formatNum(row.temp, 1)}
      </td>
      <td className="px-4 py-2.5">
        <span
          className={`px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase tracking-wider ${statusClass(row.water_status)}`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-2.5">
        <button
          type="button"
          disabled={pending}
          onClick={() => onDelete(row.id)}
          className="text-error-alert text-xs font-label-caps hover:underline disabled:opacity-40"
        >
          {deleteLabel}
        </button>
      </td>
    </tr>
  );
});
