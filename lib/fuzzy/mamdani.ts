import type { WaterStatus } from "@/types/database.types";

/**
 * Fuzzy Mamdani Inference Engine — Baku Mutu Air Kelas II (Indonesia).
 * Universe: crisp_score 0–100 (100 = pristine).
 */

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
  fired_rules: Array<{ id: string; strength: number; output: WaterStatus }>;
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

function and(...degrees: number[]): number {
  return Math.min(...degrees);
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Fuzzification aligned to Kelas II thresholds:
 * - pH: Asam (<6), Normal (6–8.5), Basa (>8.5)
 * - TDS: Rendah (<300), Sedang (300–500), Tinggi (>500)
 * - Turbidity: Jernih (<5), Agak Keruh (5–25), Keruh (>25)
 */
export function fuzzify(input: FuzzyInput) {
  const { ph: phVal, tds, turbidity } = input;

  const phMem = {
    asam: trap(phVal, 0, 0, 5.5, 6.5),
    normal: trap(phVal, 5.8, 6.5, 8.0, 8.8),
    basa: trap(phVal, 8.2, 8.8, 14, 14),
  };

  // Soft overlap around class boundaries for continuous Mamdani surfaces
  const tdsMem = {
    rendah: trap(tds, 0, 0, 250, 350),
    sedang: triangle(tds, 280, 400, 520),
    tinggi: trap(tds, 450, 550, 3000, 3000),
  };

  const turbMem = {
    jernih: trap(turbidity, 0, 0, 3.5, 6),
    agak_keruh: triangle(turbidity, 4, 12, 28),
    keruh: trap(turbidity, 20, 30, 200, 200),
  };

  return { ph: phMem, tds: tdsMem, turbidity: turbMem };
}

type OutLabel = "baik" | "cukup" | "buruk";

const OUTPUT_CENTROIDS: Record<OutLabel, number> = {
  baik: 90,
  cukup: 68,
  buruk: 28,
};

/**
 * Rule base (≥9). AND = MIN. Consequent clipped to output set centroid weight.
 */
function evaluateRules(m: ReturnType<typeof fuzzify>) {
  const rules: Array<{
    id: string;
    strength: number;
    out: OutLabel;
    status: WaterStatus;
  }> = [
    {
      id: "R1",
      strength: and(m.ph.normal, m.tds.rendah, m.turbidity.jernih),
      out: "baik",
      status: "Baik",
    },
    {
      id: "R2",
      strength: and(m.ph.normal, m.tds.sedang, m.turbidity.jernih),
      out: "baik",
      status: "Baik",
    },
    {
      id: "R3",
      strength: and(m.ph.normal, m.tds.rendah, m.turbidity.agak_keruh),
      out: "cukup",
      status: "Cukup Baik",
    },
    {
      id: "R4",
      strength: and(m.ph.normal, m.tds.sedang, m.turbidity.agak_keruh),
      out: "cukup",
      status: "Cukup Baik",
    },
    {
      id: "R5",
      strength: and(m.ph.asam, m.tds.rendah, m.turbidity.jernih),
      out: "cukup",
      status: "Cukup Baik",
    },
    {
      id: "R6",
      strength: and(m.ph.basa, m.tds.rendah, m.turbidity.jernih),
      out: "cukup",
      status: "Cukup Baik",
    },
    {
      id: "R7",
      strength: and(m.ph.normal, m.tds.tinggi, m.turbidity.jernih),
      out: "buruk",
      status: "Tidak Baik",
    },
    {
      id: "R8",
      strength: and(m.ph.normal, m.tds.sedang, m.turbidity.keruh),
      out: "buruk",
      status: "Tidak Baik",
    },
    {
      id: "R9",
      strength: and(m.ph.asam, m.tds.tinggi, m.turbidity.keruh),
      out: "buruk",
      status: "Tidak Baik",
    },
    {
      id: "R10",
      strength: and(m.ph.basa, m.tds.tinggi, m.turbidity.agak_keruh),
      out: "buruk",
      status: "Tidak Baik",
    },
    {
      id: "R11",
      strength: and(m.ph.asam, m.tds.sedang, m.turbidity.agak_keruh),
      out: "buruk",
      status: "Tidak Baik",
    },
    {
      id: "R12",
      strength: and(m.ph.normal, m.tds.rendah, m.turbidity.keruh),
      out: "buruk",
      status: "Tidak Baik",
    },
  ];

  return rules;
}

/** Weighted-average (centroid surrogate) defuzzification → crisp 0–100. */
function defuzzify(
  rules: ReturnType<typeof evaluateRules>,
): { crisp_score: number; water_status: WaterStatus } {
  const agg: Record<OutLabel, number> = { baik: 0, cukup: 0, buruk: 0 };
  for (const rule of rules) {
    agg[rule.out] = Math.max(agg[rule.out], rule.strength);
  }

  const weightSum = agg.baik + agg.cukup + agg.buruk;
  const crisp_score =
    weightSum <= 0
      ? 50
      : round1(
          (agg.baik * OUTPUT_CENTROIDS.baik +
            agg.cukup * OUTPUT_CENTROIDS.cukup +
            agg.buruk * OUTPUT_CENTROIDS.buruk) /
            weightSum,
        );

  // UI gauge bands: >80 BAIK · 60–80 CUKUP · <60 TIDAK BAIK
  let water_status: WaterStatus;
  if (crisp_score > 80) water_status = "Baik";
  else if (crisp_score >= 60) water_status = "Cukup Baik";
  else water_status = "Tidak Baik";

  return { crisp_score, water_status };
}

function buildActionMessage(
  status: WaterStatus,
  ph: number,
  tds: number,
  turbidity: number,
  score: number,
): string {
  const sensors = `pH ${ph.toFixed(1)} · TDS ${Math.round(tds)} · Turb ${turbidity.toFixed(1)} · skor ${score}`;
  if (status === "Baik") {
    return `✅ Mutu air Kelas II terpenuhi (${sensors})`;
  }
  if (status === "Cukup Baik") {
    return `⚠️ Mutu air marginal — pantau lanjutan (${sensors})`;
  }
  return `🚨 Di luar baku mutu — inspeksi segera (${sensors})`;
}

/**
 * Canonical entry: evaluateFuzzyMamdani(ph, tds, turbidity)
 */
export function evaluateFuzzyMamdani(
  ph: number,
  tds: number,
  turbidity: number,
): FuzzyResult {
  const input = { ph, tds, turbidity };
  const memberships = fuzzify(input);
  const rules = evaluateRules(memberships);
  const { crisp_score, water_status } = defuzzify(rules);

  return {
    crisp_score,
    water_status,
    action_message: buildActionMessage(
      water_status,
      ph,
      tds,
      turbidity,
      crisp_score,
    ),
    memberships: {
      ph: memberships.ph,
      tds: memberships.tds,
      turbidity: memberships.turbidity,
    },
    fired_rules: rules
      .filter((r) => r.strength > 0)
      .map((r) => ({
        id: r.id,
        strength: round1(r.strength),
        output: r.status,
      })),
  };
}

/** @deprecated Prefer evaluateFuzzyMamdani — kept for simulation callers. */
export function runFuzzyMamdani(input: FuzzyInput): FuzzyResult {
  return evaluateFuzzyMamdani(input.ph, input.tds, input.turbidity);
}

/**
 * Server ingest path: ALWAYS run Mamdani on sensor triplet.
 * ESP32-provided fuzzy fields are ignored so DB stays engine-authoritative.
 */
export function resolveFuzzyFields(input: {
  ph: number;
  tds: number;
  turbidity: number;
  crisp_score?: number;
  water_status?: WaterStatus;
  action_message?: string;
}) {
  const evaluated = evaluateFuzzyMamdani(input.ph, input.tds, input.turbidity);
  return {
    crisp_score: evaluated.crisp_score,
    water_status: evaluated.water_status,
    action_message: evaluated.action_message,
  };
}
