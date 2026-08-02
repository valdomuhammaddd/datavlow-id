"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState, useTransition } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";
import type { AlertEvent, AuditLog, Site } from "@/types/database.types";

type SettingsTab = "sites" | "alerts" | "audit" | "health";

function SettingsPanelInner() {
  const { t } = useGlobalUI();
  const search = useSearchParams();
  const initialTab = (search.get("tab") as SettingsTab | null) ?? "sites";
  const [tab, setTab] = useState<SettingsTab>(
    ["sites", "alerts", "audit", "health"].includes(initialTab)
      ? initialTab
      : "sites",
  );

  useEffect(() => {
    const next = search.get("tab") as SettingsTab | null;
    if (next && ["sites", "alerts", "audit", "health"].includes(next)) {
      setTab(next);
    }
  }, [search]);
  const [sites, setSites] = useState<Site[]>([]);
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [audit, setAudit] = useState<AuditLog[]>([]);
  const [siteName, setSiteName] = useState("");
  const [region, setRegion] = useState("Sector-7G");
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const load = useCallback(async () => {
    const [s, a, au, h] = await Promise.all([
      fetch("/api/v1/sites", { cache: "no-store" }),
      fetch("/api/v1/alerts?limit=50", { cache: "no-store" }),
      fetch("/api/v1/audit?limit=80", { cache: "no-store" }),
      fetch("/api/health", { cache: "no-store" }),
    ]);
    if (s.ok) {
      const json = (await s.json()) as { data: Site[] };
      setSites(json.data ?? []);
    }
    if (a.ok) {
      const json = (await a.json()) as { data: AlertEvent[] };
      setAlerts(json.data ?? []);
    }
    if (au.ok) {
      const json = (await au.json()) as { data: AuditLog[] };
      setAudit(json.data ?? []);
    }
    if (h.ok) setHealth((await h.json()) as Record<string, unknown>);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const createSite = () => {
    start(async () => {
      setError(null);
      const res = await fetch("/api/v1/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: siteName, region }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        setError(json.error ?? "Create site failed");
        return;
      }
      setSiteName("");
      await load();
    });
  };

  const ack = (id: number) => {
    start(async () => {
      await fetch("/api/v1/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ack", id }),
      });
      await load();
    });
  };

  const tabs = [
    ["sites", t("tabSites"), "apartment"],
    ["alerts", t("tabAlerts"), "notifications_active"],
    ["audit", t("tabAudit"), "history"],
    ["health", t("tabHealth"), "monitor_heart"],
  ] as const;

  return (
    <AppShell>
      <header className="mb-8">
        <p className="font-label-caps text-[10px] text-primary tracking-[0.14em] mb-1">
          INDUSTRIAL CONTROL PLANE
        </p>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {t("settings")}
        </h2>
        <p className="text-on-surface-variant text-sm mt-1 max-w-2xl">
          {t("settingsDesc")}
        </p>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <nav className="glass-panel rounded-xl p-3 h-fit space-y-1">
          {tabs.map(([id, label, icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                tab === id
                  ? "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-container/20 text-primary border border-primary/30 font-label-caps text-[11px]"
                  : "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-variant/40 font-label-caps text-[11px]"
              }
            >
              <span className="material-symbols-outlined text-[18px]">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div>
          {tab === "sites" ? (
            <section className="space-y-4">
              <div className="glass-panel rounded-xl p-5">
                <h3 className="font-label-caps text-[11px] text-primary mb-4">
                  {t("tabSites")} · FIELD REGISTRY
                </h3>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder={t("siteName")}
                    className="flex-1 bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm text-on-surface"
                  />
                  <input
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder={t("region")}
                    className="md:w-48 bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm text-on-surface"
                  />
                  <button
                    type="button"
                    disabled={pending || !siteName.trim()}
                    onClick={createSite}
                    className="px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs font-bold disabled:opacity-50"
                  >
                    {t("addSite")}
                  </button>
                </div>
              </div>
              <ul className="glass-panel rounded-xl divide-y divide-border-glass">
                {sites.map((s) => (
                  <li
                    key={s.id}
                    className="px-5 py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-on-surface">{s.name}</p>
                      <p className="text-xs text-on-surface-variant font-data-mono mt-0.5">
                        {s.id.slice(0, 8)}…
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs text-on-surface-variant font-label-caps">
                      {s.region}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {tab === "alerts" ? (
            <section className="glass-panel rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border-glass">
                <h3 className="font-label-caps text-[11px] text-primary">
                  {t("tabAlerts")} · SCADA EVENT BUS
                </h3>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container-low">
                  <tr>
                    <th className="px-4 py-3">{t("severity")}</th>
                    <th className="px-4 py-3">{t("message")}</th>
                    <th className="px-4 py-3">{t("devices")}</th>
                    <th className="px-4 py-3">{t("time")}</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((a) => (
                    <tr key={a.id} className="border-t border-border-glass">
                      <td className="px-4 py-3 uppercase text-xs text-on-surface">
                        {a.severity}
                      </td>
                      <td className="px-4 py-3 text-on-surface">{a.message}</td>
                      <td className="px-4 py-3 font-data-mono text-xs text-on-surface-variant">
                        {a.device_id ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant text-xs">
                        {new Date(a.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {!a.acknowledged ? (
                          <button
                            type="button"
                            onClick={() => ack(a.id)}
                            className="text-primary text-xs hover:underline"
                          >
                            {t("ack")}
                          </button>
                        ) : (
                          <span className="text-on-surface-variant text-xs">
                            ACK
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!alerts.length ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-on-surface-variant"
                      >
                        {t("noAlerts")}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </section>
          ) : null}

          {tab === "audit" ? (
            <section className="glass-panel rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border-glass">
                <h3 className="font-label-caps text-[11px] text-primary">
                  {t("tabAudit")} · IMMUTABLE TRAIL
                </h3>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container-low">
                  <tr>
                    <th className="px-4 py-3">{t("action")}</th>
                    <th className="px-4 py-3">{t("entity")}</th>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">{t("time")}</th>
                  </tr>
                </thead>
                <tbody>
                  {audit.map((row) => (
                    <tr key={row.id} className="border-t border-border-glass">
                      <td className="px-4 py-3 font-data-mono text-xs text-on-surface">
                        {row.action}
                      </td>
                      <td className="px-4 py-3 text-on-surface">{row.entity}</td>
                      <td className="px-4 py-3 font-data-mono text-xs text-on-surface-variant">
                        {row.entity_id ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-on-surface-variant text-xs">
                        {new Date(row.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ) : null}

          {tab === "health" ? (
            <section className="glass-panel rounded-xl p-6 space-y-4">
              <h3 className="font-label-caps text-[11px] text-primary">
                {t("tabHealth")} · PLATFORM PROBE
              </h3>
              <pre className="font-data-mono text-xs overflow-x-auto text-on-surface bg-surface-container-low rounded-lg p-4 border border-border-glass">
                {JSON.stringify(health, null, 2)}
              </pre>
              <button
                type="button"
                onClick={() => void load()}
                className="px-4 py-2 rounded-lg border border-border-glass font-label-caps text-xs text-on-surface"
              >
                {t("refreshProbe")}
              </button>
            </section>
          ) : null}

          {error ? (
            <p className="mt-4 text-error-alert text-sm font-label-caps">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

export function SettingsPanel() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="text-on-surface-variant">Loading…</p>
        </AppShell>
      }
    >
      <SettingsPanelInner />
    </Suspense>
  );
}
