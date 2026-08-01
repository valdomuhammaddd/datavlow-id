import type { TelemetryLog } from "@/types/database.types";

export type ExportFormat = "csv" | "json" | "pdf";

export interface ExportRow {
  timestamp: string;
  node_id: string;
  ph: number | null;
  tds: number | null;
  turbidity: number | null;
  temp: number | null;
  crisp_score: number | null;
  water_status: string | null;
  action_message: string | null;
}

export function toExportRows(logs: TelemetryLog[]): ExportRow[] {
  return logs.map((row) => ({
    timestamp: row.created_at,
    node_id: row.device_id,
    ph: row.ph,
    tds: row.tds,
    turbidity: row.turbidity,
    temp: row.temp,
    crisp_score: row.crisp_score,
    water_status: row.water_status,
    action_message: row.action_message,
  }));
}

export function rowsToCsv(rows: ExportRow[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]) as (keyof ExportRow)[];
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((h) => escapeCsv(row[h])).join(","),
    ),
  ];
  return "\uFEFF" + lines.join("\r\n");
}

function escapeCsv(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  const raw = String(value);
  if (/[",\n\r]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`;
  return raw;
}

/** PDF-ready document model (consumable by a renderer / print pipeline). */
export function buildPdfPayload(rows: ExportRow[]) {
  const columns = [
    "timestamp",
    "node_id",
    "ph",
    "tds",
    "turbidity",
    "temp",
    "crisp_score",
    "water_status",
  ] as const;

  const statusCounts = rows.reduce(
    (acc, row) => {
      const key = row.water_status ?? "Unknown";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    format: "pdf" as const,
    title: "DATAVLOW.ID Water Quality Ledger",
    generatedAt: new Date().toISOString(),
    summary: {
      rowCount: rows.length,
      statusCounts,
    },
    columns: [...columns],
    rows: rows.map((r) => columns.map((c) => r[c])),
  };
}
