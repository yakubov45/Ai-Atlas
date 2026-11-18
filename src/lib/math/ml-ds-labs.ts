/**
 * Mathematical Engine for ML Engineer & Data Scientist Interactive Vertical Slices:
 *
 * 1. Phase 19 (`mlds-19-03` .. `mlds-19-10`): Confusion Matrix, Thresholding,
 *    Accuracy, Precision, Recall, Specificity, FPR, and F1-Score with strict
 *    zero-denominator protection (never returns NaN).
 * 2. Phase 14–15 (`mlds-14-01` .. `mlds-15-05`): A/B Experiment Design,
 *    Two-Proportion Z-Test, 95% Confidence Interval, MDE, and CUPED
 *    Pre-Experiment Covariate Variance Reduction (`Var_CUPED = Var * (1 - rho^2)`).
 *
 * All sample datasets are explicitly labeled as illustrative/synthetic teaching examples.
 */

export interface ConfusionMatrixCounts {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface ConfusionMatrixMetrics {
  counts: ConfusionMatrixCounts;
  total: number;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  specificity: number | null;
  falsePositiveRate: number | null;
  f1Score: number | null;
  warnings: string[];
}

export interface SyntheticPredictionSample {
  id: string;
  trueLabel: 0 | 1;
  predictedProbability: number;
}

/**
 * Explicitly labeled illustrative 12-item binary classification sample
 * for exploring how decision threshold changes TP, FP, FN, TN, Precision, and Recall.
 */
export const SYNTHETIC_BINARY_PREDICTIONS: readonly SyntheticPredictionSample[] = [
  { id: "sample-01", trueLabel: 1, predictedProbability: 0.94 },
  { id: "sample-02", trueLabel: 1, predictedProbability: 0.88 },
  { id: "sample-03", trueLabel: 1, predictedProbability: 0.76 },
  { id: "sample-04", trueLabel: 0, predictedProbability: 0.71 },
  { id: "sample-05", trueLabel: 1, predictedProbability: 0.64 },
  { id: "sample-06", trueLabel: 1, predictedProbability: 0.54 },
  { id: "sample-07", trueLabel: 0, predictedProbability: 0.48 },
  { id: "sample-08", trueLabel: 1, predictedProbability: 0.39 },
  { id: "sample-09", trueLabel: 0, predictedProbability: 0.31 },
  { id: "sample-10", trueLabel: 0, predictedProbability: 0.22 },
  { id: "sample-11", trueLabel: 0, predictedProbability: 0.14 },
  { id: "sample-12", trueLabel: 0, predictedProbability: 0.06 },
];

export function computeConfusionMatrixFromThreshold(
  threshold: number,
  samples: readonly SyntheticPredictionSample[] = SYNTHETIC_BINARY_PREDICTIONS,
): ConfusionMatrixCounts {
  const clamped = Math.min(1, Math.max(0, threshold));
  let tp = 0;
  let fp = 0;
  let fn = 0;
  let tn = 0;

  for (const item of samples) {
    const pred = item.predictedProbability >= clamped ? 1 : 0;
    if (item.trueLabel === 1 && pred === 1) tp++;
    else if (item.trueLabel === 0 && pred === 1) fp++;
    else if (item.trueLabel === 1 && pred === 0) fn++;
    else tn++;
  }

  return { tp, fp, fn, tn };
}

export function computeClassificationMetrics(
  counts: ConfusionMatrixCounts,
): ConfusionMatrixMetrics {
  const tp = Math.max(0, Math.round(counts.tp));
  const fp = Math.max(0, Math.round(counts.fp));
  const fn = Math.max(0, Math.round(counts.fn));
  const tn = Math.max(0, Math.round(counts.tn));
  const total = tp + fp + fn + tn;
  const warnings: string[] = [];

  if (total === 0) {
    warnings.push("Jami namunalar soni 0 ga teng — metrikalar aniqlanmagan.");
    return {
      counts: { tp, fp, fn, tn },
      total: 0,
      accuracy: null,
      precision: null,
      recall: null,
      specificity: null,
      falsePositiveRate: null,
      f1Score: null,
      warnings,
    };
  }

  const accuracy = (tp + tn) / total;

  let precision: number | null = null;
  if (tp + fp === 0) {
    warnings.push(
      "TP + FP = 0 (model hech bir namunani ijobiy deb topmadi) — Precision 0 ga bo‘lish sababli aniqlanmagan.",
    );
  } else {
    precision = tp / (tp + fp);
  }

  let recall: number | null = null;
  if (tp + fn === 0) {
    warnings.push(
      "TP + FN = 0 (haqiqiy ijobiy namunalar mavjud emas) — Recall aniqlanmagan.",
    );
  } else {
    recall = tp / (tp + fn);
  }

  let specificity: number | null = null;
  let falsePositiveRate: number | null = null;
  if (tn + fp === 0) {
    warnings.push(
      "TN + FP = 0 (haqiqiy salbiy namunalar mavjud emas) — Specificity va FPR aniqlanmagan.",
    );
  } else {
    specificity = tn / (tn + fp);
    falsePositiveRate = fp / (tn + fp);
  }

  let f1Score: number | null = null;
  if (precision !== null && recall !== null && precision + recall > 0) {
    f1Score = (2 * precision * recall) / (precision + recall);
  } else {
    warnings.push(
      "Precision + Recall = 0 yoki ulardan biri aniqlanmagan — F1-score aniqlanmagan.",
    );
  }

  return {
    counts: { tp, fp, fn, tn },
    total,
    accuracy,
    precision,
    recall,
    specificity,
    falsePositiveRate,
    f1Score,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// Phase 14–15: A/B Experiment & CUPED Variance Reduction Engine
// ---------------------------------------------------------------------------

export interface AbExperimentInput {
  controlVisitors: number;
  controlConversions: number;
  treatmentVisitors: number;
  treatmentConversions: number;
  /** Pre-experiment covariate correlation rho in [0, 0.95] for CUPED variance reduction */
  cupedCorrelationRho?: number;
}

export interface AbExperimentResult {
  controlRate: number;
  treatmentRate: number;
  absoluteLift: number;
  relativeLift: number | null;
  rawStandardError: number;
  cupedVarianceMultiplier: number;
  cupedStandardError: number;
  zScoreRaw: number | null;
  pValueRaw: number | null;
  zScoreCuped: number | null;
  pValueCuped: number | null;
  ci95Raw: [number, number];
  ci95Cuped: [number, number];
  decisionCuped: "significant-positive" | "significant-negative" | "inconclusive";
}

/**
 * Standard normal cumulative distribution function Phi(z) via Abramowitz & Stegun erf approximation.
 */
export function standardNormalCdf(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const erf =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}

export function evaluateAbExperiment(input: AbExperimentInput): AbExperimentResult {
  const nA = Math.max(1, Math.round(input.controlVisitors));
  const xA = Math.min(nA, Math.max(0, Math.round(input.controlConversions)));
  const nB = Math.max(1, Math.round(input.treatmentVisitors));
  const xB = Math.min(nB, Math.max(0, Math.round(input.treatmentConversions)));
  const rho = Math.min(0.95, Math.max(0, input.cupedCorrelationRho ?? 0));

  const pA = xA / nA;
  const pB = xB / nB;
  const absoluteLift = pB - pA;
  const relativeLift = pA > 0 ? absoluteLift / pA : null;

  const varA = (pA * (1 - pA)) / nA;
  const varB = (pB * (1 - pB)) / nB;
  const rawStandardError = Math.sqrt(varA + varB);

  // CUPED variance reduction: Var(Y_cuped) = Var(Y) * (1 - rho^2)
  const cupedVarianceMultiplier = 1 - rho * rho;
  const cupedStandardError = rawStandardError * Math.sqrt(cupedVarianceMultiplier);

  const zScoreRaw = rawStandardError > 0 ? absoluteLift / rawStandardError : null;
  const pValueRaw =
    zScoreRaw !== null ? 2 * (1 - standardNormalCdf(Math.abs(zScoreRaw))) : null;

  const zScoreCuped =
    cupedStandardError > 0 ? absoluteLift / cupedStandardError : null;
  const pValueCuped =
    zScoreCuped !== null
      ? 2 * (1 - standardNormalCdf(Math.abs(zScoreCuped)))
      : null;

  const ci95Raw: [number, number] = [
    absoluteLift - 1.96 * rawStandardError,
    absoluteLift + 1.96 * rawStandardError,
  ];
  const ci95Cuped: [number, number] = [
    absoluteLift - 1.96 * cupedStandardError,
    absoluteLift + 1.96 * cupedStandardError,
  ];

  let decisionCuped: AbExperimentResult["decisionCuped"] = "inconclusive";
  if (pValueCuped !== null && pValueCuped < 0.05) {
    decisionCuped =
      absoluteLift > 0 ? "significant-positive" : "significant-negative";
  }

  return {
    controlRate: pA,
    treatmentRate: pB,
    absoluteLift,
    relativeLift,
    rawStandardError,
    cupedVarianceMultiplier,
    cupedStandardError,
    zScoreRaw,
    pValueRaw,
    zScoreCuped,
    pValueCuped,
    ci95Raw,
    ci95Cuped,
    decisionCuped,
  };
}

// ---------------------------------------------------------------------------
// Data Scientist Deep-Dive Phase 12 (`dsx-12` / `mlds-15-05`):
// Exact 8-Observation CUPED Covariate Adjustment Engine
// Source: `Data_Scientist_Micro_Lesson_AB_CUPED.md`
// ---------------------------------------------------------------------------

export interface CupedObservation {
  id: string;
  group: "control" | "treatment";
  /** Pre-experiment covariate X (measured strictly before treatment) */
  x: number;
  /** Post-experiment outcome metric Y (measured during experiment) */
  y: number;
}

export interface CupedAdjustedObservation extends CupedObservation {
  xCentered: number;
  thetaAdjustment: number;
  yAdjusted: number;
}

export interface CupedSampleAnalysis {
  observations: CupedAdjustedObservation[];
  pooledMeanX: number;
  pooledMeanY: number;
  varXPopulation: number;
  covXYPopulation: number;
  theta: number;
  zeroVarianceWarning: boolean;
  controlMeanX: number;
  treatmentMeanX: number;
  covariateImbalance: number;
  controlRawMean: number;
  treatmentRawMean: number;
  rawDifference: number;
  controlAdjustedMean: number;
  treatmentAdjustedMean: number;
  adjustedDifference: number;
  controlRawVariance: number;
  controlAdjustedVariance: number;
  treatmentRawVariance: number;
  treatmentAdjustedVariance: number;
  warnings: string[];
}

/**
 * Exact 8-row synthetic educational dataset from `Data_Scientist_Micro_Lesson_AB_CUPED.md`:
 * Control: (1,3), (2,4), (3,7), (4,8) -> mean Y = 5.500, mean X = 2.500
 * Treatment: (3,8), (4,9), (5,12), (6,13) -> mean Y = 10.500, mean X = 4.500
 * Pooled X mean = 3.500, theta = 38/18 = 2.111111,
 * Control adjusted mean = 7.611, Treatment adjusted mean = 8.389, Adjusted diff = 0.778.
 */
export const CUPED_SYNTHETIC_OBSERVATIONS: readonly CupedObservation[] = [
  { id: "c-1", group: "control", x: 1, y: 3 },
  { id: "c-2", group: "control", x: 2, y: 4 },
  { id: "c-3", group: "control", x: 3, y: 7 },
  { id: "c-4", group: "control", x: 4, y: 8 },
  { id: "t-1", group: "treatment", x: 3, y: 8 },
  { id: "t-2", group: "treatment", x: 4, y: 9 },
  { id: "t-3", group: "treatment", x: 5, y: 12 },
  { id: "t-4", group: "treatment", x: 6, y: 13 },
];

export interface CupedSimulationModulators {
  /** Extra synthetic lift added to Treatment Y (default 0) */
  treatmentLiftDelta?: number;
  /** Shift applied to Treatment pre-period X to inspect covariate balance/imbalance (default 0) */
  treatmentCovariateShift?: number;
  /** Force all X to equal 3.5 to test Var(X) = 0 zero-denominator safety (default false) */
  forceZeroVarianceX?: boolean;
}

function meanOf(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function populationVarianceOf(values: readonly number[]): number {
  if (values.length === 0) return 0;
  const m = meanOf(values);
  return values.reduce((acc, v) => acc + (v - m) * (v - m), 0) / values.length;
}

export function computeCupedSampleAdjustment(
  baseObservations: readonly CupedObservation[] = CUPED_SYNTHETIC_OBSERVATIONS,
  modulators: CupedSimulationModulators = {},
): CupedSampleAnalysis {
  const liftDelta = modulators.treatmentLiftDelta ?? 0;
  const covShift = modulators.treatmentCovariateShift ?? 0;
  const forceZeroVar = modulators.forceZeroVarianceX ?? false;

  const transformed: CupedObservation[] = baseObservations.map((obs) => {
    const xVal = forceZeroVar
      ? 3.5
      : obs.group === "treatment"
        ? obs.x + covShift
        : obs.x;
    const yVal = obs.group === "treatment" ? obs.y + liftDelta : obs.y;
    return {
      ...obs,
      x: xVal,
      y: yVal,
    };
  });

  const n = transformed.length;
  const warnings: string[] = [];

  if (n === 0) {
    return {
      observations: [],
      pooledMeanX: 0,
      pooledMeanY: 0,
      varXPopulation: 0,
      covXYPopulation: 0,
      theta: 0,
      zeroVarianceWarning: true,
      controlMeanX: 0,
      treatmentMeanX: 0,
      covariateImbalance: 0,
      controlRawMean: 0,
      treatmentRawMean: 0,
      rawDifference: 0,
      controlAdjustedMean: 0,
      treatmentAdjustedMean: 0,
      adjustedDifference: 0,
      controlRawVariance: 0,
      controlAdjustedVariance: 0,
      treatmentRawVariance: 0,
      treatmentAdjustedVariance: 0,
      warnings: ["Kuzatuvlar ro‘yxati bo‘sh."],
    };
  }

  const pooledMeanX = meanOf(transformed.map((o) => o.x));
  const pooledMeanY = meanOf(transformed.map((o) => o.y));

  let sumSqX = 0;
  let sumCrossXY = 0;
  for (const obs of transformed) {
    const dx = obs.x - pooledMeanX;
    const dy = obs.y - pooledMeanY;
    sumSqX += dx * dx;
    sumCrossXY += dx * dy;
  }

  const varXPopulation = sumSqX / n;
  const covXYPopulation = sumCrossXY / n;

  // Note: Cov(X,Y) / Var(X) is identical whether N or (N - 1) is used in denominator.
  const zeroVarianceWarning = varXPopulation < 1e-12;
  const theta = zeroVarianceWarning ? 0 : sumCrossXY / sumSqX;

  if (zeroVarianceWarning) {
    warnings.push(
      "Var(X) = 0: barcha pre-experiment X qiymatlari bir xil bo‘lgani uchun theta = 0 ga tenglashtirildi (0 ga bo‘lish xatosi oldi olindi) va Y_adjusted = Y qoldirildi.",
    );
  }

  const adjustedObservations: CupedAdjustedObservation[] = transformed.map((obs) => {
    const xCentered = obs.x - pooledMeanX;
    const thetaAdjustment = theta * xCentered;
    const yAdjusted = obs.y - thetaAdjustment;
    return {
      ...obs,
      xCentered,
      thetaAdjustment,
      yAdjusted,
    };
  });

  const controlRows = adjustedObservations.filter((o) => o.group === "control");
  const treatmentRows = adjustedObservations.filter((o) => o.group === "treatment");

  const controlMeanX = meanOf(controlRows.map((o) => o.x));
  const treatmentMeanX = meanOf(treatmentRows.map((o) => o.x));
  const covariateImbalance = treatmentMeanX - controlMeanX;

  if (Math.abs(covariateImbalance) > 0.5) {
    warnings.push(
      `Pre-period kovariat muvozanatsizligi mavjud (Treatment X̄ - Control X̄ = ${covariateImbalance.toFixed(3)}). Kichik tanlanmada bu raw va adjusted farqlarning bir-biridan kuchli farq qilishiga olib keladi.`,
    );
  }

  const controlRawMean = meanOf(controlRows.map((o) => o.y));
  const treatmentRawMean = meanOf(treatmentRows.map((o) => o.y));
  const rawDifference = treatmentRawMean - controlRawMean;

  const controlAdjustedMean = meanOf(controlRows.map((o) => o.yAdjusted));
  const treatmentAdjustedMean = meanOf(treatmentRows.map((o) => o.yAdjusted));
  const adjustedDifference = treatmentAdjustedMean - controlAdjustedMean;

  const controlRawVariance = populationVarianceOf(controlRows.map((o) => o.y));
  const controlAdjustedVariance = populationVarianceOf(
    controlRows.map((o) => o.yAdjusted),
  );
  const treatmentRawVariance = populationVarianceOf(treatmentRows.map((o) => o.y));
  const treatmentAdjustedVariance = populationVarianceOf(
    treatmentRows.map((o) => o.yAdjusted),
  );

  return {
    observations: adjustedObservations,
    pooledMeanX,
    pooledMeanY,
    varXPopulation,
    covXYPopulation,
    theta,
    zeroVarianceWarning,
    controlMeanX,
    treatmentMeanX,
    covariateImbalance,
    controlRawMean,
    treatmentRawMean,
    rawDifference,
    controlAdjustedMean,
    treatmentAdjustedMean,
    adjustedDifference,
    controlRawVariance,
    controlAdjustedVariance,
    treatmentRawVariance,
    treatmentAdjustedVariance,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// Data Scientist Deep-Dive Phase 07 (`dsx-07-c013` / `mlds-13-07`):
// Central Limit Theorem (CLT) & Confidence Interval Monte Carlo Simulator
// ---------------------------------------------------------------------------

export type CltDistributionShape = "uniform" | "skewed-right" | "bimodal";

export interface CltSimulationResult {
  shape: CltDistributionShape;
  sampleSize: number;
  numDraws: number;
  populationMean: number;
  populationStd: number;
  theoreticalStandardError: number;
  empiricalMeanOfMeans: number;
  empiricalStandardError: number;
  ci95CoverageRate: number;
  sampleMeans: number[];
  histogramBins: { binStart: number; binEnd: number; count: number }[];
}

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function simulateCltSampling(params: {
  shape: CltDistributionShape;
  sampleSize: number;
  numDraws: number;
  seed?: number;
}): CltSimulationResult {
  const n = Math.min(100, Math.max(2, Math.round(params.sampleSize)));
  const B = Math.min(300, Math.max(20, Math.round(params.numDraws)));
  const rand = createSeededRandom(params.seed ?? 20261115);

  // Theoretical population moments on [0, 10]
  let populationMean = 5.0;
  let populationStd = Math.sqrt(100 / 12); // ~2.88675 for Uniform(0, 10)

  if (params.shape === "skewed-right") {
    // Exponential-like transformation on [0, 12], theoretical mean = 3.0, std = 3.0
    populationMean = 3.0;
    populationStd = 3.0;
  } else if (params.shape === "bimodal") {
    // Symmetric mixture around 2.0 and 8.0 with jitter in [-1, 1]
    // Var = 9 + 1/3 = 9.3333 -> std ~ 3.055
    populationMean = 5.0;
    populationStd = Math.sqrt(9 + 1 / 3);
  }

  const drawOneObservation = (): number => {
    const u = Math.max(1e-6, rand());
    if (params.shape === "uniform") {
      return u * 10;
    }
    if (params.shape === "skewed-right") {
      return -3.0 * Math.log(u);
    }
    // bimodal
    const clusterCenter = rand() < 0.5 ? 2.0 : 8.0;
    const jitter = (rand() - 0.5) * 2.0;
    return clusterCenter + jitter;
  };

  const theoreticalStandardError = populationStd / Math.sqrt(n);
  const sampleMeans: number[] = [];
  let coveredCount = 0;

  for (let b = 0; b < B; b++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += drawOneObservation();
    }
    const xBar = sum / n;
    sampleMeans.push(xBar);

    const ciLow = xBar - 1.96 * theoreticalStandardError;
    const ciHigh = xBar + 1.96 * theoreticalStandardError;
    if (populationMean >= ciLow && populationMean <= ciHigh) {
      coveredCount++;
    }
  }

  const empiricalMeanOfMeans = meanOf(sampleMeans);
  const empiricalStandardError = Math.sqrt(populationVarianceOf(sampleMeans));
  const ci95CoverageRate = coveredCount / B;

  const minBound = 0;
  const maxBound = 10;
  const binCount = 20;
  const binWidth = (maxBound - minBound) / binCount;
  const histogramBins = Array.from({ length: binCount }, (_, idx) => ({
    binStart: minBound + idx * binWidth,
    binEnd: minBound + (idx + 1) * binWidth,
    count: 0,
  }));

  for (const m of sampleMeans) {
    const idx = Math.min(
      binCount - 1,
      Math.max(0, Math.floor((m - minBound) / binWidth)),
    );
    const bin = histogramBins[idx];
    if (bin) {
      bin.count++;
    }
  }

  return {
    shape: params.shape,
    sampleSize: n,
    numDraws: B,
    populationMean,
    populationStd,
    theoreticalStandardError,
    empiricalMeanOfMeans,
    empiricalStandardError,
    ci95CoverageRate,
    sampleMeans,
    histogramBins,
  };
}

// ---------------------------------------------------------------------------
// Data Scientist Deep-Dive Phase 14 (`dsx-14-c011` / `mlds-15-14`):
// Ratio Metrics (CTR / Revenue per Session) & Delta Method Variance Engine
// ---------------------------------------------------------------------------

export interface RatioMetricUnit {
  unitId: string;
  /** Numerator N_i (e.g. clicks or order value) */
  numerator: number;
  /** Denominator D_i (e.g. impressions or sessions) */
  denominator: number;
}

export interface DeltaMethodRatioResult {
  unitCount: number;
  meanNumerator: number;
  meanDenominator: number;
  /** Ratio of sums: sum(N_i) / sum(D_i) = mean(N) / mean(D) */
  ratioOfSums: number | null;
  /** Naive mean of user-level ratios: mean(N_i / D_i) over units with D_i > 0 */
  meanOfUserRatios: number | null;
  varNumerator: number;
  varDenominator: number;
  covNumeratorDenominator: number;
  /** First-order Taylor / Delta Method variance of ratioOfSums */
  deltaMethodVariance: number | null;
  deltaMethodStandardError: number | null;
  ci95DeltaMethod: [number, number] | null;
  zeroDenominatorUnits: number;
  warnings: string[];
}

export const SYNTHETIC_CTR_USER_UNITS: readonly RatioMetricUnit[] = [
  { unitId: "user-1", numerator: 1, denominator: 2 },
  { unitId: "user-2", numerator: 2, denominator: 4 },
  { unitId: "user-3", numerator: 1, denominator: 10 },
  { unitId: "user-4", numerator: 3, denominator: 20 },
  { unitId: "user-5", numerator: 0, denominator: 14 },
  { unitId: "user-6", numerator: 5, denominator: 30 },
];

export function computeDeltaMethodRatio(
  units: readonly RatioMetricUnit[] = SYNTHETIC_CTR_USER_UNITS,
): DeltaMethodRatioResult {
  const k = units.length;
  const warnings: string[] = [];

  if (k === 0) {
    return {
      unitCount: 0,
      meanNumerator: 0,
      meanDenominator: 0,
      ratioOfSums: null,
      meanOfUserRatios: null,
      varNumerator: 0,
      varDenominator: 0,
      covNumeratorDenominator: 0,
      deltaMethodVariance: null,
      deltaMethodStandardError: null,
      ci95DeltaMethod: null,
      zeroDenominatorUnits: 0,
      warnings: ["Foydalanuvchilar ro‘yxati bo‘sh."],
    };
  }

  const zeroDenominatorUnits = units.filter((u) => u.denominator <= 0).length;
  if (zeroDenominatorUnits > 0) {
    warnings.push(
      `${zeroDenominatorUnits} ta foydalanuvchida denominator D_i <= 0: user-level N_i / D_i hisobida 0 ga bo‘lish yuzaga keladi.`,
    );
  }

  const meanNumerator = meanOf(units.map((u) => u.numerator));
  const meanDenominator = meanOf(units.map((u) => u.denominator));

  if (meanDenominator <= 1e-12) {
    warnings.push(
      "O‘rtacha denominator D̄ = 0 ga teng: Ratio of Sums va Delta Method variance aniqlanmagan.",
    );
    return {
      unitCount: k,
      meanNumerator,
      meanDenominator,
      ratioOfSums: null,
      meanOfUserRatios: null,
      varNumerator: 0,
      varDenominator: 0,
      covNumeratorDenominator: 0,
      deltaMethodVariance: null,
      deltaMethodStandardError: null,
      ci95DeltaMethod: null,
      zeroDenominatorUnits,
      warnings,
    };
  }

  const ratioOfSums = meanNumerator / meanDenominator;

  const validUnits = units.filter((u) => u.denominator > 0);
  const meanOfUserRatios =
    validUnits.length > 0
      ? meanOf(validUnits.map((u) => u.numerator / u.denominator))
      : null;

  const denomFactor = k > 1 ? k - 1 : 1;
  let sumSqN = 0;
  let sumSqD = 0;
  let sumCrossND = 0;
  for (const u of units) {
    const dn = u.numerator - meanNumerator;
    const dd = u.denominator - meanDenominator;
    sumSqN += dn * dn;
    sumSqD += dd * dd;
    sumCrossND += dn * dd;
  }

  const varNumerator = sumSqN / denomFactor;
  const varDenominator = sumSqD / denomFactor;
  const covNumeratorDenominator = sumCrossND / denomFactor;

  // Delta Method: Var(R_hat) ≈ (1 / (k * D_bar^2)) * (Var(N) - 2*R*Cov(N,D) + R^2*Var(D))
  const rawDeltaTerm =
    varNumerator -
    2 * ratioOfSums * covNumeratorDenominator +
    ratioOfSums * ratioOfSums * varDenominator;
  const deltaMethodVariance = Math.max(
    0,
    rawDeltaTerm / (k * meanDenominator * meanDenominator),
  );
  const deltaMethodStandardError = Math.sqrt(deltaMethodVariance);
  const ci95DeltaMethod: [number, number] = [
    ratioOfSums - 1.96 * deltaMethodStandardError,
    ratioOfSums + 1.96 * deltaMethodStandardError,
  ];

  return {
    unitCount: k,
    meanNumerator,
    meanDenominator,
    ratioOfSums,
    meanOfUserRatios,
    varNumerator,
    varDenominator,
    covNumeratorDenominator,
    deltaMethodVariance,
    deltaMethodStandardError,
    ci95DeltaMethod,
    zeroDenominatorUnits,
    warnings,
  };
}

