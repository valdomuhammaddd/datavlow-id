export type ExportRow = Record<string, string | number | boolean | null | undefined>;

function escapeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const raw = String(value);
  if (/[",\n\r]/.test(raw)) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

/**
 * Serialize rows to CSV and trigger a browser download.
 */
export function exportToCSV(
  data: ExportRow[],
  filename = `datavlow-telemetry-${Date.now()}.csv`,
): void {
  if (typeof window === "undefined") {
    throw new Error("exportToCSV can only run in the browser");
  }

  if (!data.length) {
    throw new Error("No data available to export");
  }

  const headers = Object.keys(data[0]);
  const lines = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((key) => escapeCsvCell(row[key])).join(","),
    ),
  ];

  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8;",
  });

  downloadBlob(blob, filename);
}

/**
 * Serialize rows to pretty JSON and trigger a browser download.
 */
export function exportToJSON(
  data: ExportRow[],
  filename = `datavlow-telemetry-${Date.now()}.json`,
): void {
  if (typeof window === "undefined") {
    throw new Error("exportToJSON can only run in the browser");
  }

  if (!data.length) {
    throw new Error("No data available to export");
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8;",
  });

  downloadBlob(blob, filename);
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/** Open a print-ready ledger document (Save as PDF from the browser). */
export function exportToPrintablePdf(
  data: ExportRow[],
  title = "DATAVLOW.ID Water Quality Ledger",
): void {
  if (typeof window === "undefined") {
    throw new Error("exportToPrintablePdf can only run in the browser");
  }
  if (!data.length) {
    throw new Error("No data available to export");
  }

  const headers = Object.keys(data[0]);
  const rowsHtml = data
    .map(
      (row) =>
        `<tr>${headers
          .map((h) => `<td>${escapeHtml(String(row[h] ?? ""))}</td>`)
          .join("")}</tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><title>${escapeHtml(title)}</title>
<style>
  body{font-family:ui-monospace,Menlo,monospace;padding:24px;color:#111}
  h1{font-size:18px;margin:0 0 8px}
  p{font-size:12px;color:#555;margin:0 0 16px}
  table{border-collapse:collapse;width:100%;font-size:11px}
  th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}
  th{background:#f3f4f6}
</style></head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>Generated ${new Date().toISOString()} · ${data.length} rows</p>
  <table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
  <tbody>${rowsHtml}</tbody></table>
  <script>window.onload=()=>window.print()</script>
</body></html>`;

  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) throw new Error("Popup blocked — allow popups to export PDF");
  win.document.write(html);
  win.document.close();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Map telemetry log rows into a flat export-friendly shape. */
export function telemetryToExportRows(
  logs: Array<{
    created_at: string;
    device_id: string;
    device_name?: string;
    ph: number | null;
    tds: number | null;
    turbidity: number | null;
    temp: number | null;
    crisp_score: number | null;
    water_status: string | null;
    action_message: string | null;
  }>,
): ExportRow[] {
  return logs.map((row) => ({
    timestamp: row.created_at,
    node_id: row.device_name || row.device_id,
    ph: row.ph,
    tds: row.tds,
    turbidity: row.turbidity,
    temp: row.temp,
    crisp_score: row.crisp_score,
    water_status: row.water_status,
    action_message: row.action_message,
  }));
}
