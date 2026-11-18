/**
 * Mathematical engine for Scaled Dot-Product Attention (Vaswani et al., 2017):
 *
 *   Attention(Q, K, V) = softmax((Q K^T) / sqrt(d_k)) V
 *
 * Includes both:
 * 1. The 1D illustrative mini-lab (d_k = 1, two tokens A and B) for intuitive exploration.
 * 2. Multi-token vector/matrix Scaled Dot-Product Attention with optional scaling and causal masking.
 */

export interface OneDimToken {
  id: string;
  label: string;
  key: number;
  value: number;
}

export interface OneDimAttentionStep {
  tokenId: string;
  label: string;
  key: number;
  value: number;
  rawScore: number;
  scaledScore: number;
  expScore: number;
  weight: number;
  weightPercent: number;
  weightedValue: number;
}

export interface OneDimAttentionResult {
  query: number;
  dk: number;
  scaleFactor: number;
  sumExp: number;
  steps: OneDimAttentionStep[];
  output: number;
}

export const DEFAULT_1D_TOKENS: readonly OneDimToken[] = [
  { id: "token-a", label: "Token A", key: 1.0, value: 2.0 },
  { id: "token-b", label: "Token B", key: 2.0, value: 6.0 },
];

/**
 * Computes 1D Scaled Dot-Product Attention for a scalar Query Q against a list of (K_i, V_i) tokens.
 * Default example: Q = 1.0, Token A (K=1, V=2), Token B (K=2, V=6), d_k = 1
 * -> weight A = 26.89% (~26.9%), weight B = 73.11% (~73.1%), output = 4.924.
 */
export function computeOneDimAttention(
  query: number,
  tokens: readonly OneDimToken[] = DEFAULT_1D_TOKENS,
  dk: number = 1,
): OneDimAttentionResult {
  const safeDk = Math.max(1e-6, dk);
  const scaleFactor = Math.sqrt(safeDk);

  const rawScores = tokens.map((t) => query * t.key);
  const scaledScores = rawScores.map((s) => s / scaleFactor);

  // Numerically stable softmax
  const maxScore = Math.max(...scaledScores, 0);
  const expScores = scaledScores.map((s) => Math.exp(s - maxScore));
  const sumExp = expScores.reduce((acc, v) => acc + v, 0) || 1;

  // Also compute unshifted exp for educational display when numbers are small
  const displayExpScores = scaledScores.map((s) => Math.exp(Math.min(50, Math.max(-50, s))));
  const displaySumExp = displayExpScores.reduce((acc, v) => acc + v, 0) || 1;

  const steps: OneDimAttentionStep[] = tokens.map((t, idx) => {
    const rawScore = rawScores[idx] ?? 0;
    const scaledScore = scaledScores[idx] ?? 0;
    const weight = (expScores[idx] ?? 0) / sumExp;
    const weightedValue = weight * t.value;
    return {
      tokenId: t.id,
      label: t.label,
      key: t.key,
      value: t.value,
      rawScore,
      scaledScore,
      expScore: displayExpScores[idx] ?? 0,
      weight,
      weightPercent: weight * 100,
      weightedValue,
    };
  });

  const output = steps.reduce((acc, s) => acc + s.weightedValue, 0);

  return {
    query,
    dk: safeDk,
    scaleFactor,
    sumExp: displaySumExp,
    steps,
    output,
  };
}

// ---------------------------------------------------------------------------
// Multi-Token Matrix Scaled Dot-Product Attention
// ---------------------------------------------------------------------------

export interface MatrixToken {
  id: string;
  token: string;
  q: number[];
  k: number[];
  v: number[];
}

export interface MatrixAttentionResult {
  tokens: string[];
  dk: number;
  scaleUsed: number;
  rawScores: number[][];
  scaledScores: number[][];
  weights: number[][];
  outputs: number[][];
}

export const DEFAULT_MATRIX_TOKENS: readonly MatrixToken[] = [
  {
    id: "t0",
    token: "Bank",
    q: [1.2, 0.8, -0.4, 0.5],
    k: [1.1, 0.7, -0.3, 0.4],
    v: [0.9, 0.1, 0.5, -0.2],
  },
  {
    id: "t1",
    token: "daryo",
    q: [0.3, 1.4, 0.9, -0.2],
    k: [1.3, 0.9, -0.2, 0.6],
    v: [0.2, 0.85, 0.7, 0.1],
  },
  {
    id: "t2",
    token: "qirg‘og‘ida",
    q: [0.5, 1.1, 0.7, 0.1],
    k: [0.9, 0.8, -0.1, 0.5],
    v: [0.1, 0.75, 0.8, 0.3],
  },
  {
    id: "t3",
    token: "joylashgan",
    q: [0.4, 0.3, 0.2, 0.8],
    k: [0.3, 0.2, 0.4, 0.7],
    v: [0.4, 0.3, 0.2, 0.9],
  },
];

export function dotProduct(a: readonly number[], b: readonly number[]): number {
  const len = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += (a[i] ?? 0) * (b[i] ?? 0);
  }
  return sum;
}

export function softmaxRow(scores: readonly number[]): number[] {
  const finiteScores = scores.filter((s) => Number.isFinite(s));
  if (finiteScores.length === 0) {
    return scores.map(() => 0);
  }
  const maxVal = Math.max(...finiteScores);
  const exps = scores.map((s) => (Number.isFinite(s) ? Math.exp(s - maxVal) : 0));
  const sum = exps.reduce((a, b) => a + b, 0);
  if (sum <= 0) return scores.map(() => 0);
  return exps.map((e) => e / sum);
}

/**
 * Computes full matrix Scaled Dot-Product Attention:
 *   S = Q K^T
 *   S_scaled = S / (useScaling ? sqrt(d_k * temperatureScale) : 1)
 *   W = softmax(mask(S_scaled))
 *   Z = W V
 */
export function computeMatrixAttention(
  items: readonly MatrixToken[] = DEFAULT_MATRIX_TOKENS,
  options: {
    useScaling?: boolean;
    causalMask?: boolean;
    dkOverride?: number;
  } = {},
): MatrixAttentionResult {
  const { useScaling = true, causalMask = false, dkOverride } = options;
  const n = items.length;
  const dk = dkOverride ?? (items[0]?.q.length || 1);
  const scaleUsed = useScaling ? Math.sqrt(Math.max(1, dk)) : 1;

  const rawScores: number[][] = [];
  const scaledScores: number[][] = [];
  const weights: number[][] = [];

  for (let i = 0; i < n; i++) {
    const rowRaw: number[] = [];
    const rowScaled: number[] = [];
    const qi = items[i]?.q ?? [];
    for (let j = 0; j < n; j++) {
      const kj = items[j]?.k ?? [];
      const raw = dotProduct(qi, kj);
      rowRaw.push(raw);
      if (causalMask && j > i) {
        rowScaled.push( Number.NEGATIVE_INFINITY );
      } else {
        rowScaled.push(raw / scaleUsed);
      }
    }
    rawScores.push(rowRaw);
    scaledScores.push(rowScaled);
    weights.push(softmaxRow(rowScaled));
  }

  const vDim = items[0]?.v.length || 1;
  const outputs: number[][] = [];
  for (let i = 0; i < n; i++) {
    const outRow = new Array<number>(vDim).fill(0);
    for (let j = 0; j < n; j++) {
      const w = weights[i]?.[j] ?? 0;
      const vj = items[j]?.v ?? [];
      for (let d = 0; d < vDim; d++) {
        outRow[d] = (outRow[d] ?? 0) + w * (vj[d] ?? 0);
      }
    }
    outputs.push(outRow);
  }

  return {
    tokens: items.map((t) => t.token),
    dk,
    scaleUsed,
    rawScores,
    scaledScores,
    weights,
    outputs,
  };
}

/**
 * Generates runnable NumPy code matching the current 1D Attention state.
 */
export function generateAttentionNumpySnippet(result: OneDimAttentionResult): string {
  const kVals = result.steps.map((s) => s.key.toFixed(2)).join(", ");
  const vVals = result.steps.map((s) => s.value.toFixed(2)).join(", ");
  const wVals = result.steps.map((s) => `${(s.weight * 100).toFixed(1)}%`).join(", ");
  return `import numpy as np

# 1. Kirish qiymatlari (bir o'lchamli illustrativ misol, d_k = ${result.dk})
Q = np.array([${result.query.toFixed(2)}])
K = np.array([${kVals}])
V = np.array([${vVals}])
d_k = ${result.dk}

# 2. Dot product va sqrt(d_k) ga bo'lish (Scaled Dot-Product)
scores = (Q * K) / np.sqrt(d_k)

# 3. Softmax orqali ehtimollik vaznlarini (attention weights) olish
exp_scores = np.exp(scores - np.max(scores))
weights = exp_scores / np.sum(exp_scores)
# Vaznlar: [${wVals}]

# 4. Value vektorlarining vaznli yig'indisi
output = np.sum(weights * V)
print("Attention weights:", np.round(weights, 4))
print("Attention natijasi:", round(float(output), 3)) # ${result.output.toFixed(3)}`;
}
