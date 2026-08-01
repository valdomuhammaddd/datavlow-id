"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";

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
  const [deviceId, setDeviceId] = useState("DV-7729");
  const [state, setState] = useState<HardwareState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const load = useCallback(async () => {
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

  const act = (body: Record<string, unknown>) => {
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
          Virtual ESP32 LCD 16x2 + sensor bench
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="glass-panel rounded-xl p-6 space-y-4">
          <label className="block space-y-1">
            <span className="font-label-caps text-[10px] text-on-surface-variant">
              DEVICE ID
            </span>
            <input
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm"
            />
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
              disabled={pending}
              onClick={() => act({ action: "button_press", button: "left" })}
              className="flex-1 py-3 rounded-lg border border-border-glass font-label-caps text-xs"
            >
              ◀ LEFT
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => act({ action: "button_press", button: "right" })}
              className="flex-1 py-3 rounded-lg border border-border-glass font-label-caps text-xs"
            >
              RIGHT ▶
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                act({
                  action: "toggle_sensors",
                  sensors_enabled: !state?.sensors_enabled,
                })
              }
              className="flex-1 py-3 rounded-lg bg-surface-container font-label-caps text-xs"
            >
              TOGGLE SENSORS
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => act({ action: "refresh_lcd" })}
              className="flex-1 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs font-bold"
            >
              REFRESH LCD
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
                <div key={label} className="rounded-lg bg-bg-obsidian p-3">
                  <p className="text-[10px] font-label-caps text-on-surface-variant">
                    {label}
                  </p>
                  <p className="text-headline-md font-headline-md">{value}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                act({
                  action: "set_readings",
                  ph: 7.2,
                  tds: 280,
                  turbidity: 1.2,
                  temp: 25.4,
                })
              }
              className="py-2 rounded-lg border border-border-glass text-xs font-label-caps"
            >
              NOMINAL SAMPLE
            </button>
            <button
              type="button"
              disabled={pending}
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
              ALERT SAMPLE
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
          <p className="text-xs text-on-surface-variant">
            NOMINAL / ALERT SAMPLE juga mengirim ke{" "}
            <span className="text-primary">telemetry_logs</span> (device_id =
            API key simulasi) sehingga Dashboard & Analytics ikut live.
          </p>

          {error ? (
            <p className="text-error-alert text-sm font-label-caps">{error}</p>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
