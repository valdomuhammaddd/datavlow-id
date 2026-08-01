import type { WaterStatus } from "@/types/database.types";

export const WATER_STATUSES: readonly WaterStatus[] = [
  "Baik",
  "Cukup Baik",
  "Tidak Baik",
];

export function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

export function toNonEmptyString(
  value: unknown,
  maxLen = 256,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLen) return null;
  return trimmed;
}

export function toPositiveInt(
  value: unknown,
  fallback: number,
  max = 1000,
): number {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : NaN;
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(Math.floor(n), max);
}

export function isWaterStatus(value: unknown): value is WaterStatus {
  return typeof value === "string" && WATER_STATUSES.includes(value as WaterStatus);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
