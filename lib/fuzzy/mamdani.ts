import type { WaterStatus } from "@/types/database.types";

export interface FuzzyInput {
  ph: number;
  tds: number;
  turbidity: number;
}

export interface FuzzyResult {
  crisp_score: number;
  water_status: WaterStatus;
  action_message: string;
  memberships: {
    ph: Record<string, number>;
    tds: Record<string, number>;
    turbidity: Record<string, number>;
  };
}

/** Triangular membership μ(x; a, b, c). */
function triangle(x: number, a: number, b: number, c: number): number {
  if (x <= a || x >= c) return 0;
  if (x === b) return 1;
  if (x < b) return (x - a) / (b - a || 1);
  return (c - x) / (c - b || 1);
}

/** Trapezoidal membership μ(x; a, b, c, d). */
function trap(x: number, a: number, b: number, c: number, d: number): number {
  if (x <= a || x >= d) return 0;
  if (x >= b && x <= c) return 1;
  if (x < b) return (x - a) / (b - a || 1);
  return (d - x) / (d - c || 1);
}

/**
 * Fuzzy Mamdani inference for water quality.
 * Outputs crisp_score (0–100) and discrete design-system status labels.
 */
export function runFuzzyMamdani(input: FuzzyInput): FuzzyResult {
  const { ph, tds, turbidity } = input;

  const phMem = {
    acid: trap(ph, 0, 0, 5.5, 6.5),
    normal: triangle(ph, 6.0, 7.0, 8.0),
    alkaline: trap(ph, 7.5, 8.5, 14, 14),
  };

  const tdsMem = {
    low: trap(tds, 0, 0, 200, 350),
    medium: triangle(tds, 250, 400, 550),
    high: trap(tds, 450, 600, 2000, 2000),
  };

  const turbMem = {
    clear: trap(turbidity, 0, 0, 1.5, 3),
    cloudy: triangle(turbidity, 2, 4, 6),
    murky: trap(turbidity, 5, 7, 50, 50),
  };

  // Rule firing strengths → output sets (baik / cukup / buruk)
  const rBaik = Math.min(phMem.normal, tdsMem.low, turbMem.clear);
  const rCukupA = Math.min(phMem.normal, tdsMem.medium, turbMem.clear);
  const rCukupB = Math.min(phMem.normal, tdsMem.low, turbMem.cloudy);
  const rBurukA = Math.max(phMem.acid, phMem.alkaline);
  const rBurukB = Math.max(tdsMem.high, turbMem.murky);
  const rCukup = Math.max(rCukupA, rCukupB);
  const rBuruk = Math.max(rBurukA, rBurukB);

  // Centroids of output fuzzy sets on 0–100 universe
  const centroids = { baik: 88, cukup: 62, buruk: 28 };
  const weights = {
    baik: rBaik,
    cukup: rCukup,
    buruk: rBuruk,
  };

  const weightSum = weights.baik + weights.cukup + weights.buruk;
  const crisp_score =
    weightSum === 0
      ? scoreHeuristic(ph, tds, turbidity)
      : round1(
          (weights.baik * centroids.baik +
            weights.cukup * centroids.cukup +
            weights.buruk * centroids.buruk) /
            weightSum,
        );

  const water_status = classifyStatus(crisp_score, ph, tds, turbidity);
  const action_message = buildActionMessage(water_status, ph, tds, turbidity);

  return {
    crisp_score,
    water_status,
    action_message,
    memberships: {
      ph: phMem,
      tds: tdsMem,
      turbidity: turbMem,
    },
  };
}

function classifyStatus(
  score: number,
  ph: number,
  tds: number,
  turbidity: number,
): WaterStatus {
  const hardFail =
    ph < 6.0 || ph > 8.5 || tds >= 500 || turbidity >= 5;
  if (hardFail || score < 45) return "Tidak Baik";
  if (score >= 75 && ph >= 6.5 && ph <= 8.5 && tds < 500 && turbidity < 5) {
    return "Baik";
  }
  return "Cukup Baik";
}

function scoreHeuristic(ph: number, tds: number, turbidity: number): number {
  const phOk = ph >= 6.5 && ph <= 8.5 ? 90 : 35;
  const tdsOk = tds < 500 ? 85 : 30;
  const turbOk = turbidity < 5 ? 88 : 28;
  return round1((phOk + tdsOk + turbOk) / 3);
}

function buildActionMessage(
  status: WaterStatus,
  ph: number,
  tds: number,
  turbidity: number,
): string {
  if (status === "Baik") {
    return `✅ System: All sensors operational (pH ${ph.toFixed(1)}, TDS ${Math.round(tds)}, Turb ${turbidity.toFixed(1)})`;
  }
  if (status === "Cukup Baik") {
    return `⚠️ Alert: Water quality marginal — pH ${ph.toFixed(1)} TDS ${Math.round(tds)} Turb ${turbidity.toFixed(1)}. Monitoring.`;
  }
  return `🚨 Critical: Water quality Tidak Baik — pH ${ph.toFixed(1)} TDS ${Math.round(tds)} Turb ${turbidity.toFixed(1)}. Immediate inspection advised.`;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Resolve optional ESP32 fuzzy fields with Mamdani fallback. */
export function resolveFuzzyFields(input: {
  ph: number;
  tds: number;
  turbidity: number;
  crisp_score?: number;
  water_status?: WaterStatus;
  action_message?: string;
}) {
  const needsFallback =
    input.crisp_score === undefined || input.water_status === undefined;

  if (!needsFallback) {
    return {
      crisp_score: input.crisp_score ?? null,
      water_status: input.water_status ?? null,
      action_message: input.action_message ?? null,
    };
  }

  const evaluated = runFuzzyMamdani(input);
  return {
    crisp_score: input.crisp_score ?? evaluated.crisp_score,
    water_status: input.water_status ?? evaluated.water_status,
    action_message: input.action_message ?? evaluated.action_message,
  };
}
