"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { StatusDot } from "@/components/ui/status-dot";
import { useGlobalUI } from "@/context/GlobalUIContext";
import type { Device } from "@/types/database.types";

type HardwareState = {
  device_id: string;
  ph: number;
  tds: number;
  turbidity: number;
  temp: number;
  sensors_enabled: boolean;
  lcd_line1: string;
  lcd_line2: string;
  water_status: string | null;
  crisp_score: number | null;
  uptime_seconds: number;
  rssi: number;
  voltage: number;
};

export function HardwareSim() {
  const { t } = useGlobalUI();
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [state, setState] = useState<HardwareState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  useEffect(() => {
    void fetch("/api/v1/devices", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { data?: Device[] } | null) => {
        const list = json?.data ?? [];
        setDevices(list);
        setDeviceId((prev) => {
          if (prev && list.some((d) => d.api_key === prev)) return prev;
          return list[0]?.api_key ?? "";
        });
      })
      .catch(() => undefined);
  }, []);

  const load = useCallback(async () => {
    if (!deviceId) return;
    const res = await fetch(
      `/api/v1/simulation/hardware?device_id=${encodeURIComponent(deviceId)}`,
      { cache: "no-store" },
    );
    const json = (await res.json()) as { data?: HardwareState; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Load failed");
      return;
    }
    setState(json.data ?? null);
    setError(null);
  }, [deviceId]);

  useEffect(() => {
    void load();
  }, [load]);

  const selected = devices.find((d) => d.api_key === deviceId);

  const act = (body: Record<string, unknown>) => {
    if (!deviceId) return;
    start(async () => {
      const res = await fetch("/api/v1/simulation/hardware", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: deviceId, ...body }),
      });
      const json = (await res.json()) as { data?: HardwareState; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Action failed");
        return;
      }
      setState(json.data ?? null);
    });
  };

  return (
    <AppShell>
      <header className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {t("simulation")}
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          {t("simulationDesc")}
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="glass-panel rounded-xl p-6 space-y-4">
          <label className="block space-y-1">
            <span className="font-label-caps text-[10px] text-on-surface-variant">
              {t("deviceNameLabel")}
            </span>
            {devices.length ? (
              <div className="flex items-center gap-2">
                <select
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm text-on-surface"
                >
                  {devices.map((d) => (
                    <option key={d.id} value={d.api_key}>
                      {d.name}
                    </option>
                  ))}
                </select>
                {selected ? <StatusDot status={selected.status} /> : null}
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant py-2">
                {t("noDeviceSelect")}
              </p>
            )}
          </label>

          <div className="rounded-lg bg-black border-4 border-zinc-700 p-4 font-data-mono text-[#33ff66] shadow-inner">
            <div className="text-xs opacity-60 mb-2">LCD 16x2</div>
            <div className="tracking-[0.2em] text-lg whitespace-pre">
              {(state?.lcd_line1 ?? "----------------").padEnd(16).slice(0, 16)}
            </div>
            <div className="tracking-[0.2em] text-lg whitespace-pre">
              {(state?.lcd_line2 ?? "----------------").padEnd(16).slice(0, 16)}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={pending || !deviceId}
              onClick={() => act({ action: "button_press", button: "left" })}
              className="flex-1 py-3 rounded-lg border border-border-glass font-label-caps text-xs text-on-surface"
            >
              {t("left")}
            </button>
            <button
              type="button"
              disabled={pending || !deviceId}
              onClick={() => act({ action: "button_press", button: "right" })}
              className="flex-1 py-3 rounded-lg border border-border-glass font-label-caps text-xs text-on-surface"
            >
              {t("right")}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={pending || !deviceId}
              onClick={() =>
                act({
                  action: "toggle_sensors",
                  sensors_enabled: !state?.sensors_enabled,
                })
              }
              className="flex-1 py-3 rounded-lg bg-surface-container font-label-caps text-xs text-on-surface"
            >
              {t("toggleSensors")}
            </button>
            <button
              type="button"
              disabled={pending || !deviceId}
              onClick={() => act({ action: "refresh_lcd" })}
              className="flex-1 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs font-bold"
            >
              {t("refreshLcd")}
            </button>
          </div>
        </section>

        <section className="glass-panel rounded-xl p-6 space-y-4">
          <h3 className="font-label-caps text-label-caps text-primary">
            SENSOR BENCH
          </h3>
          {state ? (
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ["pH", state.ph],
                  ["TDS", state.tds],
                  ["Turbidity", state.turbidity],
                  ["Temp", state.temp],
                  ["RSSI", state.rssi],
                  ["Voltage", state.voltage],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-lg bg-bg-obsidian border border-border-glass p-3">
                  <p className="text-[10px] font-label-caps text-on-surface-variant">
                    {label}
                  </p>
                  <p className="text-headline-md font-headline-md text-on-surface">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={pending || !deviceId}
              onClick={() =>
                act({
                  action: "set_readings",
                  ph: 7.2,
                  tds: 280,
                  turbidity: 1.2,
                  temp: 25.4,
                })
              }
              className="py-2 rounded-lg border border-border-glass text-xs font-label-caps text-on-surface"
            >
              {t("nominalSample")}
            </button>
            <button
              type="button"
              disabled={pending || !deviceId}
              onClick={() =>
                act({
                  action: "set_readings",
                  ph: 5.1,
                  tds: 980,
                  turbidity: 12,
                  temp: 31,
                })
              }
              className="py-2 rounded-lg border border-error-alert/40 text-error-alert text-xs font-label-caps"
            >
              {t("alertSample")}
            </button>
          </div>

          {state ? (
            <p className="text-sm text-on-surface-variant">
              Status:{" "}
              <span className="text-on-surface">{state.water_status ?? "—"}</span>
              {" · "}
              Score: {state.crisp_score ?? "—"}
              {" · "}
              Sensors: {state.sensors_enabled ? "ON" : "OFF"}
              {" · "}
              Uptime: {state.uptime_seconds}s
            </p>
          ) : null}

          {error ? (
            <p className="text-error-alert text-sm font-label-caps">{error}</p>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
