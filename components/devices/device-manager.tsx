"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { StatusDot } from "@/components/ui/status-dot";
import { useGlobalUI } from "@/context/GlobalUIContext";
import type { Device, Site } from "@/types/database.types";

type Summary = {
  total: number;
  online: number;
  offline: number;
  error: number;
};

export function DeviceManager() {
  const { t } = useGlobalUI();
  const [devices, setDevices] = useState<Device[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    online: 0,
    offline: 0,
    error: 0,
  });
  const [name, setName] = useState("");
  const [siteId, setSiteId] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const load = useCallback(async () => {
    const [devRes, siteRes] = await Promise.all([
      fetch("/api/v1/devices", { cache: "no-store" }),
      fetch("/api/v1/sites", { cache: "no-store" }),
    ]);
    if (devRes.ok) {
      const json = (await devRes.json()) as {
        data?: Device[];
        summary?: Summary;
      };
      setDevices(json.data ?? []);
      setSummary(
        json.summary ?? {
          total: json.data?.length ?? 0,
          online: 0,
          offline: 0,
          error: 0,
        },
      );
    } else if (devRes.status === 401) {
      setError(t("sessionExpired"));
    }
    if (siteRes.ok) {
      const json = (await siteRes.json()) as { data: Site[] };
      setSites(json.data ?? []);
      if (!siteId && json.data?.[0]?.id) setSiteId(json.data[0].id);
    }
  }, [siteId, t]);

  useEffect(() => {
    void load();
  }, [load]);

  const register = () => {
    start(async () => {
      setError(null);
      setCreatedKey(null);
      const res = await fetch("/api/v1/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          site_id: siteId || undefined,
        }),
      });
      const json = (await res.json()) as { data?: Device; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Register failed");
        return;
      }
      setCreatedKey(json.data?.api_key ?? null);
      setName("");
      await load();
    });
  };

  const ping = (id: string) => {
    start(async () => {
      await fetch("/api/v1/devices/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: id }),
      });
      await load();
    });
  };

  const rotate = (id: string) => {
    if (!window.confirm("Rotate API key? ESP32 must be updated.")) return;
    start(async () => {
      const res = await fetch(`/api/v1/devices/${id}/rotate`, { method: "POST" });
      const json = (await res.json()) as { data?: Device; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Rotate failed");
        return;
      }
      setCreatedKey(json.data?.api_key ?? null);
      await load();
    });
  };

  const revoke = (id: string) => {
    if (!window.confirm("Revoke this device key permanently?")) return;
    start(async () => {
      const res = await fetch(`/api/v1/devices/${id}/revoke`, { method: "POST" });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        setError(json.error ?? "Revoke failed");
        return;
      }
      await load();
    });
  };

  return (
    <AppShell>
      <header className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {t("devices")}
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">{t("devicesDesc")}</p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {(
          [
            [t("total"), summary.total],
            [t("online"), summary.online],
            [t("offline"), summary.offline],
            [t("errorStatus"), summary.error],
          ] as const
        ).map(([label, value]) => (
          <div key={String(label)} className="glass-panel rounded-xl p-4">
            <p className="font-label-caps text-[10px] text-on-surface-variant">
              {label}
            </p>
            <p className="text-headline-md font-headline-md text-on-surface mt-1">
              {value}
            </p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-xl p-6 mb-8 space-y-4">
        <h3 className="font-label-caps text-label-caps text-primary">
          {t("addDevice")} — API KEY WIZARD
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("deviceNamePlaceholder")}
            className="bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary"
          />
          <select
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            className="bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm text-on-surface outline-none focus:border-primary"
          >
            <option value="">{t("noSite")}</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.region}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={pending || !name.trim()}
            onClick={register}
            className="rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold py-2.5 disabled:opacity-50"
          >
            {t("generateKey")}
          </button>
        </div>
        {createdKey ? (
          <div className="rounded-lg border border-primary/40 bg-primary/5 p-4">
            <p className="font-label-caps text-[10px] text-primary mb-2">
              {t("copyOnce")}
            </p>
            <code className="font-data-mono text-sm text-on-surface break-all">
              {createdKey}
            </code>
            <button
              type="button"
              className="mt-3 block text-xs text-primary hover:underline"
              onClick={() => void navigator.clipboard.writeText(createdKey)}
            >
              {t("copyClipboard")}
            </button>
          </div>
        ) : null}
        {error ? (
          <p className="text-error-alert text-sm font-label-caps">{error}</p>
        ) : null}
      </section>

      <section className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container-low font-label-caps text-[10px] text-on-surface-variant">
            <tr>
              <th className="px-4 py-3">{t("deviceName")}</th>
              <th className="px-4 py-3">{t("status")}</th>
              <th className="px-4 py-3">{t("lastPing")}</th>
              <th className="px-4 py-3">{t("latency")}</th>
              <th className="px-4 py-3">{t("apiKey")}</th>
              <th className="px-4 py-3">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d.id} className="border-t border-border-glass">
                <td className="px-4 py-3 font-medium text-on-surface">{d.name}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 uppercase text-xs text-on-surface">
                    <StatusDot status={d.status} />
                    {d.status === "online" ? t("online") : t("offline")}
                  </span>
                </td>
                <td className="px-4 py-3 text-on-surface-variant">
                  {d.last_ping
                    ? new Date(d.last_ping).toLocaleString()
                    : "—"}
                </td>
                <td className="px-4 py-3 text-on-surface">
                  {d.latency_ms != null ? `${d.latency_ms} ms` : "—"}
                </td>
                <td className="px-4 py-3 font-data-mono text-xs text-on-surface">
                  {maskKey(d.api_key)}
                </td>
                <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => ping(d.id)}
                    className="text-primary text-xs hover:underline"
                  >
                    {t("ping")}
                  </button>
                  <button
                    type="button"
                    onClick={() => rotate(d.id)}
                    className="text-tertiary text-xs hover:underline"
                  >
                    {t("rotate")}
                  </button>
                  <button
                    type="button"
                    onClick={() => revoke(d.id)}
                    className="text-error-alert text-xs hover:underline"
                  >
                    {t("revoke")}
                  </button>
                </td>
              </tr>
            ))}
            {!devices.length ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-on-surface-variant"
                >
                  {t("noDevicesYet")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}

function maskKey(key: string): string {
  if (key.length <= 12) return "••••••••";
  return `${key.slice(0, 6)}…${key.slice(-4)}`;
}
