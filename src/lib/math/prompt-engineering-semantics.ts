/**
 * Pure Prompt Engineering Mathematical & Simulation Engines
 *
 * Implements deterministic, side-effect-free engines for the Prompt Engineering
 * specialization (`pe-01` .. `pe-20`, 313 micro-lessons):
 * 1. `pe-06-06` / `pe-07-02` / `pe-07-04` — Synthetic Token Sampling Pipeline:
 *    `frequency_penalty (optional) -> stable softmax(T) -> top-k -> renormalize -> top-p -> renormalize -> seeded sample`
 *    Verified against `Prompt_Engineering_Micro_Lesson_Sampling.md`:
 *    At z = [2.4, 1.4, 0.6, -0.2], T=1, K=4, P=1:
 *    Python = 62.21%, matematika = 22.89%, LLM = 10.28%, fizika = 4.62%.
 * 2. `pe-03-01` / `pe-15-10` / `pe-17-05` — Prompt Anatomy & Trust-Boundary Delimiter Escaping simulator.
 * 3. `pe-19-14` / `pe-19-16` — Calibration & Reliability Diagram (Brier Score + Expected Calibration Error) engine.
 */

export interface TokenCandidateInput {
  token: string;
  logit: number;
  historyCount?: number;
}

export interface TokenSamplingStageRow {
  token: string;
  rawLogit: number;
  adjustedLogit: number;
  softmaxProb: number;
  afterTopKProb: number;
  keptByTopK: boolean;
  cumulativeBeforeTopP: number;
  finalProb: number;
  keptByTopP: boolean;
  finalPercentFormatted: string;
}

export interface SamplingParameters {
  temperature: number;
  topK: number;
  topP: number;
  frequencyPenalty?: number;
  seed?: number;
  candidates?: readonly TokenCandidateInput[];
}

export interface SamplingPipelineResult {
  isSyntheticToyModel: true;
  temperature: number;
  isGreedyZeroTemp: boolean;
  topK: number;
  topP: number;
  frequencyPenalty: number;
  seed: number;
  randomDrawU: number;
  rows: TokenSamplingStageRow[];
  selectedToken: string;
  totalFinalProb: number;
  pipelineOrderNote: string;
}

export const DEFAULT_SYNTHETIC_LOGITS: readonly TokenCandidateInput[] = [
  { token: "Python", logit: 2.4, historyCount: 2 },
  { token: "matematika", logit: 1.4, historyCount: 0 },
  { token: "LLM", logit: 0.6, historyCount: 1 },
  { token: "fizika", logit: -0.2, historyCount: 0 },
];

/**
 * Deterministic 32-bit PRNG (Mulberry32) mapping integer seed -> u in [0, 1).
 */
export function seededUniform01(seed: number): number {
  let t = (Math.trunc(seed) + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Pedagogical frequency penalty operator:
 * z'_i = z_i - frequencyPenalty * historyCount_i
 * (Explicitly documented as an educational operator, not a vendor-specific API clone.)
 */
export function applyFrequencyPenalty(
  candidates: readonly TokenCandidateInput[],
  frequencyPenalty: number = 0
): number[] {
  if (!Number.isFinite(frequencyPenalty) || frequencyPenalty < 0) {
    throw new Error("frequencyPenalty must be a finite non-negative number.");
  }
  return candidates.map((c) => {
    if (!Number.isFinite(c.logit)) {
      throw new Error(`Non-finite logit for token '${c.token}'.`);
    }
    const count = Math.max(0, Math.trunc(c.historyCount ?? 0));
    return c.logit - frequencyPenalty * count;
  });
}

/**
 * Numerically stable softmax with explicit greedy mode when temperature === 0.
 */
export function stableSoftmaxWithTemperature(
  logits: readonly number[],
  temperature: number
): { probs: number[]; isGreedy: boolean } {
  if (logits.length === 0) {
    throw new Error("Logits array must not be empty.");
  }
  if (!Number.isFinite(temperature) || temperature < 0) {
    throw new Error("Temperature must be a finite number >= 0.");
  }

  const maxLogit = Math.max(...logits);

  // Explicit illustrative greedy case when T === 0
  if (temperature === 0) {
    const winners = logits.map((z) => (Math.abs(z - maxLogit) < 1e-12 ? 1 : 0));
    const winnerCount = winners.reduce<number>((a, b) => a + b, 0);
    return {
      probs: winners.map((w) => w / winnerCount),
      isGreedy: true,
    };
  }

  const safeT = Math.max(temperature, 1e-6);
  const exps = logits.map((z) => Math.exp((z - maxLogit) / safeT));
  const sumExp = exps.reduce((a, b) => a + b, 0);
  return {
    probs: exps.map((e) => e / sumExp),
    isGreedy: false,
  };
}

/**
 * Full sampling pipeline:
 * softmax(T) -> top-k -> renormalize -> top-p -> renormalize -> seeded sample
 */
export function runSamplingPipeline(
  params: SamplingParameters
): SamplingPipelineResult {
  const candidates = params.candidates ?? DEFAULT_SYNTHETIC_LOGITS;
  const n = candidates.length;
  if (n === 0) {
    throw new Error("At least one token candidate is required.");
  }

  const topK = Math.trunc(params.topK);
  if (!Number.isFinite(topK) || topK < 1 || topK > n) {
    throw new Error(`topK must be an integer between 1 and ${n}.`);
  }

  const topP = params.topP;
  if (!Number.isFinite(topP) || topP <= 0 || topP > 1) {
    throw new Error("topP must satisfy 0 < topP <= 1.");
  }

  const frequencyPenalty = params.frequencyPenalty ?? 0;
  const adjustedLogits = applyFrequencyPenalty(candidates, frequencyPenalty);
  const { probs: softmaxProbs, isGreedy } = stableSoftmaxWithTemperature(
    adjustedLogits,
    params.temperature
  );

  // Sort indices by descending softmax probability (tie-break by original index)
  const sortedIndices = candidates
    .map((_, idx) => idx)
    .sort((a, b) => {
      const diff = softmaxProbs[b]! - softmaxProbs[a]!;
      return Math.abs(diff) > 1e-12 ? diff : a - b;
    });

  // Step 1: Top-K truncation + renormalization
  const keptTopKSet = new Set(sortedIndices.slice(0, topK));
  const rawTopKProbs = softmaxProbs.map((p, idx) => (keptTopKSet.has(idx) ? p : 0));
  const sumTopK = rawTopKProbs.reduce((a, b) => a + b, 0);
  const afterTopKProbs = rawTopKProbs.map((p) => (sumTopK > 0 ? p / sumTopK : 0));

  // Step 2: Top-P (nucleus) filtering in descending order of afterTopKProbs + renormalization
  const keptTopPSet = new Set<number>();
  const cumulativeByIdx = new Array<number>(n).fill(0);
  let runningCumulative = 0;

  for (const idx of sortedIndices) {
    const p = afterTopKProbs[idx]!;
    if (p <= 0) {
      cumulativeByIdx[idx] = runningCumulative;
      continue;
    }
    const prevCumulative = runningCumulative;
    runningCumulative += p;
    cumulativeByIdx[idx] = runningCumulative;

    // Keep token if it is the very first active token OR previous cumulative < topP
    if (keptTopPSet.size === 0 || prevCumulative < topP - 1e-12) {
      keptTopPSet.add(idx);
    }
  }

  const rawTopPProbs = afterTopKProbs.map((p, idx) => (keptTopPSet.has(idx) ? p : 0));
  const sumTopP = rawTopPProbs.reduce((a, b) => a + b, 0);
  const finalProbs = rawTopPProbs.map((p) => (sumTopP > 0 ? p / sumTopP : 0));

  // Step 3: Deterministic seeded sampling over finalProbs
  const seed = params.seed ?? 7;
  const u = seededUniform01(seed);
  let cdf = 0;
  let selectedToken = candidates[sortedIndices[0]!]!.token;
  for (let i = 0; i < n; i++) {
    const prob = finalProbs[i]!;
    if (prob <= 0) continue;
    cdf += prob;
    if (u <= cdf + 1e-12) {
      selectedToken = candidates[i]!.token;
      break;
    }
  }

  const rows: TokenSamplingStageRow[] = candidates.map((c, idx) => ({
    token: c.token,
    rawLogit: c.logit,
    adjustedLogit: Number(adjustedLogits[idx]!.toFixed(4)),
    softmaxProb: softmaxProbs[idx]!,
    afterTopKProb: afterTopKProbs[idx]!,
    keptByTopK: keptTopKSet.has(idx),
    cumulativeBeforeTopP: cumulativeByIdx[idx]!,
    finalProb: finalProbs[idx]!,
    keptByTopP: keptTopPSet.has(idx),
    finalPercentFormatted: `${(finalProbs[idx]! * 100).toFixed(2)}%`,
  }));

  return {
    isSyntheticToyModel: true,
    temperature: params.temperature,
    isGreedyZeroTemp: isGreedy,
    topK,
    topP,
    frequencyPenalty,
    seed,
    randomDrawU: Number(u.toFixed(4)),
    rows,
    selectedToken,
    totalFinalProb: Number(finalProbs.reduce((a, b) => a + b, 0).toFixed(6)),
    pipelineOrderNote:
      "softmax(T) → top-k → renormalize → top-p → renormalize → sample (sintetik o‘quv konveyeri; turli API provayderlarida tartib farq qilishi mumkin)",
  };
}

/**
 * 2. Prompt Anatomy & Delimiter Escaping Simulator (`pe-03-01` / `pe-15-10` / `pe-17-05`)
 */
export interface PromptAnatomyInput {
  instruction: string;
  context: string;
  untrustedUserInput: string;
  outputFormat: string;
  escapeDelimiters: boolean;
}

export interface PromptAnatomyResult {
  renderedPrompt: string;
  containsDelimiterBreakoutAttempt: boolean;
  breakoutNeutralizedByEscaping: boolean;
  securityAdvisoryUz: string;
}

export function buildStructuredPromptWithBoundary(
  input: PromptAnatomyInput
): PromptAnatomyResult {
  const breakoutPattern = /<\/?(user_input|system|instruction)>/i;
  const containsDelimiterBreakoutAttempt = breakoutPattern.test(
    input.untrustedUserInput
  );

  const safeUserData = input.escapeDelimiters
    ? input.untrustedUserInput
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
    : input.untrustedUserInput;

  const renderedPrompt = [
    `<instruction>\n${input.instruction.trim()}\n</instruction>`,
    `<context>\n${input.context.trim()}\n</context>`,
    `<user_input trust="untrusted">\n${safeUserData.trim()}\n</user_input>`,
    `<output_format>\n${input.outputFormat.trim()}\n</output_format>`,
  ].join("\n\n");

  return {
    renderedPrompt,
    containsDelimiterBreakoutAttempt,
    breakoutNeutralizedByEscaping:
      containsDelimiterBreakoutAttempt && input.escapeDelimiters,
    securityAdvisoryUz:
      "Muhim: XML delimiter va escaping strukturaviy ajratishga yordam beradi, biroq yolg‘iz o‘zi Prompt Injection’dan 100% himoya qilmaydi — tool ruxsatlari (least privilege) va server validatsiyasi shart.",
  };
}

/**
 * 3. Calibration & Reliability Evaluator (`pe-19-14` / `pe-19-16`)
 */
export interface CalibrationSample {
  id: string;
  predictedConfidence: number; // in [0, 1]
  actualCorrect: 0 | 1;
}

export interface CalibrationSummary {
  sampleCount: number;
  meanConfidence: number;
  empiricalAccuracy: number;
  brierScore: number;
  overconfidenceGap: number;
}

export const DEFAULT_CALIBRATION_SAMPLES: readonly CalibrationSample[] = [
  { id: "q-1", predictedConfidence: 0.95, actualCorrect: 1 },
  { id: "q-2", predictedConfidence: 0.90, actualCorrect: 0 },
  { id: "q-3", predictedConfidence: 0.85, actualCorrect: 1 },
  { id: "q-4", predictedConfidence: 0.80, actualCorrect: 0 },
  { id: "q-5", predictedConfidence: 0.60, actualCorrect: 1 },
  { id: "q-6", predictedConfidence: 0.55, actualCorrect: 0 },
];

export function computeCalibrationMetrics(
  samples: readonly CalibrationSample[] = DEFAULT_CALIBRATION_SAMPLES
): CalibrationSummary {
  if (samples.length === 0) {
    return {
      sampleCount: 0,
      meanConfidence: 0,
      empiricalAccuracy: 0,
      brierScore: 0,
      overconfidenceGap: 0,
    };
  }
  const n = samples.length;
  const meanConfidence =
    samples.reduce((acc, s) => acc + s.predictedConfidence, 0) / n;
  const empiricalAccuracy =
    samples.reduce((acc, s) => acc + s.actualCorrect, 0) / n;
  const brierScore =
    samples.reduce(
      (acc, s) => acc + Math.pow(s.predictedConfidence - s.actualCorrect, 2),
      0
    ) / n;

  return {
    sampleCount: n,
    meanConfidence: Number(meanConfidence.toFixed(4)),
    empiricalAccuracy: Number(empiricalAccuracy.toFixed(4)),
    brierScore: Number(brierScore.toFixed(4)),
    overconfidenceGap: Number((meanConfidence - empiricalAccuracy).toFixed(4)),
  };
}
