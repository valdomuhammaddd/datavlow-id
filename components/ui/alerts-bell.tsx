"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useGlobalUI } from "@/context/GlobalUIContext";
import type { AlertEvent } from "@/types/database.types";

/**
 * Header bell — open alerts for errors / water quality TIDAK BAIK.
 */
export function AlertsBell() {
  const { t } = useGlobalUI();
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [openCount, setOpenCount] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/alerts?unacked=1&limit=12", {
        cache: "no-store",
      });
      if (!res.ok) return;
      const json = (await res.json()) as {
        data?: AlertEvent[];
        open?: number;
      };
      setAlerts(json.data ?? []);
      setOpenCount(json.open ?? json.data?.length ?? 0);
    } catch {
      /* ignore probe failures */
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 20_000);
    return () => window.clearInterval(id);
  }, [load]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const ack = async (id: number) => {
    await fetch("/api/v1/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ack", id }),
    });
    await load();
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          void load();
        }}
        className="relative h-9 w-9 rounded-full border border-border-glass bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
        aria-label={t("notifications")}
        title={t("notifications")}
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        {openCount > 0 ? (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-error-alert text-white text-[9px] font-bold flex items-center justify-center leading-none">
            {openCount > 9 ? "9+" : openCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-11 w-[320px] max-w-[calc(100vw-2rem)] glass-panel rounded-xl border border-border-glass shadow-xl z-[70] overflow-hidden">
          <div className="px-4 py-3 border-b border-border-glass flex items-center justify-between">
            <p className="font-label-caps text-[10px] text-primary tracking-wider">
              {t("notifications")}
            </p>
            <Link
              href="/settings?tab=alerts"
              onClick={() => setOpen(false)}
              className="text-[10px] font-label-caps text-on-surface-variant hover:text-primary"
            >
              {t("viewAllAlerts")}
            </Link>
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-border-glass">
            {alerts.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-on-surface-variant">
                {t("noNotifications")}
              </li>
            ) : (
              alerts.map((a) => (
                <li key={a.id} className="px-4 py-3 hover:bg-[var(--row-hover)]">
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                        a.severity === "critical" || a.water_status === "Tidak Baik"
                          ? "bg-error-alert"
                          : a.severity === "warning" ||
                              a.water_status === "Cukup Baik"
                            ? "bg-tertiary-container"
                            : "bg-primary"
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-on-surface leading-snug line-clamp-2">
                        {a.message}
                      </p>
                      <p className="mt-1 font-label-caps text-[9px] text-on-surface-variant">
                        {(a.water_status ?? a.severity).toUpperCase()} ·{" "}
                        {new Date(a.created_at).toLocaleString()}
                      </p>
                      <button
                        type="button"
                        onClick={() => void ack(a.id)}
                        className="mt-1.5 text-[10px] font-label-caps text-primary hover:underline"
                      >
                        {t("ack")}
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
