/**
 * Backward-compatible wrapper around Fuzzy Mamdani inference.
 */
export {
  runFuzzyMamdani as evaluateWaterQuality,
  resolveFuzzyFields,
  type FuzzyInput as WaterQualityInput,
  type FuzzyResult as WaterQualityResult,
} from "@/lib/fuzzy/mamdani";
