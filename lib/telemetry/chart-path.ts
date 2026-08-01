import type { ChartPoint } from "@/hooks/useTelemetryStream";

/**
 * Builds an SVG path for the kinetic wave from telemetry points (crisp_score).
 * Preserves the decorative topography look from DESAINUI.
 */
export function buildKineticWavePath(
  series: ChartPoint[],
  width = 1600,
  height = 200,
): { area: string; stroke: string } {
  if (series.length === 0) {
    return {
      area:
        "M0 100 Q 200 50 400 150 T 800 100 T 1200 200 T 1600 50 L 1600 400 L 0 400 Z",
      stroke:
        "M0 150 Q 250 100 500 200 T 1000 100 T 1500 150 L 1500 400 L 0 400 Z",
    };
  }

  const values = series.map((p) => p.crisp_score);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 100);
  const span = Math.max(max - min, 1);

  const coords = values.map((value, index) => {
    const x =
      series.length === 1
        ? width / 2
        : (index / (series.length - 1)) * width;
    const norm = (value - min) / span;
    const y = height - norm * (height * 0.75) - 20;
    return { x, y };
  });

  const stroke = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const last = coords[coords.length - 1];
  const first = coords[0];
  const area = `${stroke} L ${last.x.toFixed(1)} ${height + 200} L ${first.x.toFixed(1)} ${height + 200} Z`;

  return { area, stroke };
}
