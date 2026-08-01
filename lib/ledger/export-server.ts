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

/** PDF-ready document model + printable HTML for Save-as-PDF. */
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

  const title = "DATAVLOW.ID Water Quality Ledger";
  const generatedAt = new Date().toISOString();
  const headerCells = columns.map((c) => `<th>${c}</th>`).join("");
  const bodyRows = rows
    .map(
      (r) =>
        `<tr>${columns
          .map((c) => `<td>${escapeHtml(String(r[c] ?? ""))}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><title>${title}</title>
<style>
  body{font-family:ui-monospace,Menlo,monospace;padding:24px;color:#111}
  h1{font-size:18px} table{border-collapse:collapse;width:100%;font-size:11px}
  th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}
  th{background:#f3f4f6}
</style></head>
<body>
  <h1>${title}</h1>
  <p>Generated ${generatedAt} · ${rows.length} rows</p>
  <p>Status counts: ${escapeHtml(JSON.stringify(statusCounts))}</p>
  <table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>
</body></html>`;

  return {
    format: "pdf" as const,
    title,
    generatedAt,
    summary: {
      rowCount: rows.length,
      statusCounts,
    },
    columns: [...columns],
    rows: rows.map((r) => columns.map((c) => r[c])),
    html,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
