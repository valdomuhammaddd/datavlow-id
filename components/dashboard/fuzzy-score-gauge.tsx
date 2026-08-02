"use client";

import { memo, useMemo } from "react";

type GaugeTone = "baik" | "cukup" | "buruk" | "idle";

function toneFromScore(score: number | null): GaugeTone {
  if (score == null || Number.isNaN(score)) return "idle";
  if (score > 80) return "baik";
  if (score >= 60) return "cukup";
  return "buruk";
}

const TONE = {
  baik: {
    stroke: "#00d1ff",
    glow: "drop-shadow(0 0 12px rgba(0,209,255,0.65))",
    label: "BAIK",
    pulse: false,
  },
  cukup: {
    stroke: "#ff8a00",
    glow: "drop-shadow(0 0 12px rgba(255,138,0,0.55))",
    label: "CUKUP BAIK",
    pulse: false,
  },
  buruk: {
    stroke: "#FF3D00",
    glow: "drop-shadow(0 0 14px rgba(255,61,0,0.7))",
    label: "TIDAK BAIK",
    pulse: true,
  },
  idle: {
    stroke: "#859399",
    glow: "none",
    label: "MEMPROSES...",
    pulse: false,
  },
} as const;

/**
 * Circular speedometer for Fuzzy crisp score (0–100).
 */
export const FuzzyScoreGauge = memo(function FuzzyScoreGauge({
  score,
  size = 148,
}: {
  score: number | null;
  size?: number;
}) {
  const tone = toneFromScore(score);
  const theme = TONE[tone];
  const clamped = Math.min(100, Math.max(0, score ?? 0));

  const { radius, circumference, offset, center } = useMemo(() => {
    const r = (size - 18) / 2;
    const c = 2 * Math.PI * r;
    // Arc uses ~270° (3/4 circle) for speedometer feel
    const arc = c * 0.75;
    const progress = (clamped / 100) * arc;
    return {
      radius: r,
      circumference: arc,
      offset: arc - progress,
      center: size / 2,
    };
  }, [size, clamped]);

  return (
    <div
      className={`relative flex flex-col items-center ${theme.pulse ? "animate-pulse" : ""}`}
      style={{ width: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-[135deg]">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={10}
          strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
          strokeLinecap="round"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={theme.stroke}
          strokeWidth={10}
          strokeDasharray={`${circumference} ${2 * Math.PI * radius}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: theme.glow, transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="font-label-caps text-[9px] text-on-surface-variant tracking-widest">
          CRISP SCORE
        </span>
        <span
          className="font-display text-3xl font-bold tabular-nums leading-none mt-1"
          style={{ color: theme.stroke }}
        >
          {score == null ? "—" : clamped.toFixed(0)}
        </span>
        <span
          className="font-label-caps text-[10px] mt-1 tracking-wider"
          style={{ color: theme.stroke }}
        >
          {theme.label}
        </span>
      </div>
    </div>
  );
});
