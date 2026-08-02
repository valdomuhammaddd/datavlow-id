"use client";

import { useEffect, useState } from "react";

/**
 * Mini command-center badge: simulated / measured network latency.
 */
export function NetworkHealthBadge() {
  const [latency, setLatency] = useState<number | null>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const probe = async () => {
      const started = performance.now();
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const ms = Math.round(performance.now() - started);
        if (cancelled) return;
        setLatency(ms);
        setOk(res.ok);
      } catch {
        if (cancelled) return;
        setLatency(null);
        setOk(false);
      }
    };

    void probe();
    const id = window.setInterval(() => void probe(), 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const display = latency == null ? "—" : `${latency}ms`;
  const tone =
    !ok || latency == null
      ? "bad"
      : latency < 300
        ? "good"
        : latency < 1000
          ? "warn"
          : "bad";

  return (
    <div
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-glass bg-surface-container/60 backdrop-blur-md"
      title="System latency & network health"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          tone === "good"
            ? "bg-success-glow shadow-[0_0_6px_var(--success-glow)]"
            : tone === "warn"
              ? "bg-tertiary-container"
              : "bg-error-alert"
        }`}
      />
      <span className="font-label-caps text-[9px] text-on-surface-variant tracking-wider">
        NET
      </span>
      <span
        className={`font-data-mono text-[11px] tabular-nums ${
          tone === "good"
            ? "text-success-glow"
            : tone === "warn"
              ? "text-tertiary-container"
              : "text-error-alert"
        }`}
      >
        {display}
      </span>
    </div>
  );
}
