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

  return (
    <AppShell>
      <header className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {t("settings")}
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Sites, alerts, audit trail, platform health
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            ["sites", "SITES"],
            ["alerts", "ALERTS"],
            ["audit", "AUDIT LOG"],
            ["health", "HEALTH"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={
              tab === id
                ? "px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs font-bold"
                : "px-4 py-2 rounded-lg border border-border-glass font-label-caps text-xs"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "sites" ? (
        <section className="space-y-4">
          <div className="glass-panel rounded-xl p-4 flex flex-col md:flex-row gap-3">
            <input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Site name"
              className="flex-1 bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
              className="md:w-48 bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={pending || !siteName.trim()}
              onClick={createSite}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs font-bold disabled:opacity-50"
            >
              ADD SITE
            </button>
          </div>
          <ul className="glass-panel rounded-xl divide-y divide-border-glass">
            {sites.map((s) => (
              <li key={s.id} className="px-4 py-3 flex justify-between">
                <span>{s.name}</span>
                <span className="text-on-surface-variant text-sm">{s.region}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "alerts" ? (
        <section className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container/50">
              <tr>
                <th className="px-4 py-3">SEVERITY</th>
                <th className="px-4 py-3">MESSAGE</th>
                <th className="px-4 py-3">DEVICE</th>
                <th className="px-4 py-3">TIME</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id} className="border-t border-border-glass">
                  <td className="px-4 py-3 uppercase text-xs">{a.severity}</td>
                  <td className="px-4 py-3">{a.message}</td>
                  <td className="px-4 py-3 font-data-mono text-xs">
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
                        Ack
                      </button>
                    ) : (
                      <span className="text-on-surface-variant text-xs">ACK</span>
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
                    No alerts yet
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </section>
      ) : null}

      {tab === "audit" ? (
        <section className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container/50">
              <tr>
                <th className="px-4 py-3">ACTION</th>
                <th className="px-4 py-3">ENTITY</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">TIME</th>
              </tr>
            </thead>
            <tbody>
              {audit.map((row) => (
                <tr key={row.id} className="border-t border-border-glass">
                  <td className="px-4 py-3 font-data-mono text-xs">{row.action}</td>
                  <td className="px-4 py-3">{row.entity}</td>
                  <td className="px-4 py-3 font-data-mono text-xs">
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
        <section className="glass-panel rounded-xl p-6">
          <pre className="font-data-mono text-xs overflow-x-auto text-on-surface-variant">
            {JSON.stringify(health, null, 2)}
          </pre>
          <button
            type="button"
            onClick={() => void load()}
            className="mt-4 px-4 py-2 rounded-lg border border-border-glass font-label-caps text-xs"
          >
            REFRESH PROBE
          </button>
        </section>
      ) : null}

      {error ? (
        <p className="mt-4 text-error-alert text-sm font-label-caps">{error}</p>
      ) : null}
    </AppShell>
  );
}

export function SettingsPanel() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="text-on-surface-variant">Loading settings…</p>
        </AppShell>
      }
    >
      <SettingsPanelInner />
    </Suspense>
  );
}
