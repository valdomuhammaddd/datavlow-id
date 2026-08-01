"use client";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";

const STEPS = [
  {
    title: "1. Create operator account",
    body: "Sign up at /signup, then sign in. Middleware protects all operator routes.",
  },
  {
    title: "2. Register a device",
    body: "Open Devices → generate API key → paste into ESP32 firmware as api_key.",
  },
  {
    title: "3. Stream telemetry",
    body: "POST /api/v1/telemetry with ph, tds, turbidity, temp. Fuzzy Mamdani classifies water quality.",
  },
  {
    title: "4. Watch live dashboard",
    body: "Realtime inserts update Precision Telemetry. Fleet stats show real online/offline counts.",
  },
  {
    title: "5. Automate & simulate",
    body: "Logic Builder dry-runs IF/THEN graphs. Simulation Center emulates LCD 16x2 hardware.",
  },
];

export function HelpCenter() {
  const { t } = useGlobalUI();

  return (
    <AppShell>
      <header className="mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {t("help")}
        </h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Operator quickstart for DATAVLOW.ID
        </p>
      </header>

      <div className="space-y-4 max-w-3xl">
        {STEPS.map((step) => (
          <article key={step.title} className="glass-panel rounded-xl p-5">
            <h3 className="font-label-caps text-label-caps text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {step.body}
            </p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
