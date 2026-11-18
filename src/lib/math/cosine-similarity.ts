/**
 * Mathematical engine for Phase 12: Embeddings & Vector Mathematics (12.01 – 12.14).
 *
 * Implements exact 2D and N-D vector operations:
 * - Vector Norm (L2 length): ||A|| = sqrt(sum(a_i^2))
 * - Dot Product: A · B = sum(a_i * b_i)
 * - Cosine Similarity: cos(A, B) = (A · B) / (||A|| * ||B||)
 * - Angle in Degrees: arccos(clamp(cos(A, B), -1, 1)) * (180 / pi)
 * - Euclidean Distance (L2): ||A - B|| = sqrt(sum((a_i - b_i)^2))
 *
 * Strictly handles edge cases:
 * - Zero vector (||A|| === 0 or ||B|| === 0): returns `isZeroVectorError: true` and `cosine: null`
 *   (never returns NaN or fake 0).
 * - Dimension mismatch: throws a clear Uzbek error message.
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface CosineSimilarityResult {
  a: readonly number[];
  b: readonly number[];
  dotProduct: number;
  normA: number;
  normB: number;
  euclideanDistance: number;
  isZeroVectorError: boolean;
  errorMessage: string | null;
  cosine: number | null;
  angleDegrees: number | null;
  directionRelation: "same" | "acute" | "orthogonal" | "obtuse" | "opposite" | "undefined";
}

export function vectorNorm(v: readonly number[]): number {
  if (v.length === 0) {
    throw new Error("Vektor bo‘sh bo‘lmasin");
  }
  let sumSq = 0;
  for (let i = 0; i < v.length; i++) {
    const val = v[i] ?? 0;
    sumSq += val * val;
  }
  return Math.sqrt(sumSq);
}

export function vectorDotProduct(a: readonly number[], b: readonly number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vektor o‘lchamlari mos emas");
  }
  if (a.length === 0) {
    throw new Error("Vektor bo‘sh bo‘lmasin");
  }
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] ?? 0) * (b[i] ?? 0);
  }
  return sum;
}

export function euclideanDistance(a: readonly number[], b: readonly number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vektor o‘lchamlari mos emas");
  }
  let sumSq = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    sumSq += diff * diff;
  }
  return Math.sqrt(sumSq);
}

/**
 * Pure reference function matching `AI_Engineer_Micro_Lesson_Namuna.md` Step 10.
 * Throws ValueError-style Error on dimension mismatch, empty vector, or zero vector.
 */
export function cosineSimilarityStrict(a: readonly number[], b: readonly number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vektor o‘lchamlari mos emas");
  }
  if (a.length === 0) {
    throw new Error("Vektor bo‘sh bo‘lmasin");
  }
  const dot = vectorDotProduct(a, b);
  const normA = vectorNorm(a);
  const normB = vectorNorm(b);
  if (normA === 0 || normB === 0) {
    throw new Error("Nol vektor uchun cosine aniqlanmagan");
  }
  return dot / (normA * normB);
}

/**
 * Safe UI analyzer for interactive sliders (returns structured status when B=(0,0) instead of crashing).
 */
export function analyzeVectorPair(
  a: readonly number[],
  b: readonly number[],
): CosineSimilarityResult {
  if (a.length !== b.length) {
    throw new Error("Vektor o‘lchamlari mos emas");
  }
  if (a.length === 0) {
    throw new Error("Vektor bo‘sh bo‘lmasin");
  }

  const dotProduct = vectorDotProduct(a, b);
  const normA = vectorNorm(a);
  const normB = vectorNorm(b);
  const dist = euclideanDistance(a, b);

  if (normA === 0 || normB === 0) {
    return {
      a,
      b,
      dotProduct,
      normA,
      normB,
      euclideanDistance: dist,
      isZeroVectorError: true,
      errorMessage:
        "Nol vektor (0, 0) uzunlikka va yo‘nalishga ega emas — 0 ga bo‘lish mumkin bo‘lmagani sababli Cosine Similarity aniqlanmagan!",
      cosine: null,
      angleDegrees: null,
      directionRelation: "undefined",
    };
  }

  const rawCos = dotProduct / (normA * normB);
  const clampedCos = Math.min(1, Math.max(-1, rawCos));
  const angleRadians = Math.acos(clampedCos);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  let directionRelation: CosineSimilarityResult["directionRelation"] = "acute";
  if (Math.abs(clampedCos - 1) < 1e-5) {
    directionRelation = "same";
  } else if (Math.abs(clampedCos + 1) < 1e-5) {
    directionRelation = "opposite";
  } else if (Math.abs(clampedCos) < 1e-5) {
    directionRelation = "orthogonal";
  } else if (clampedCos > 0) {
    directionRelation = "acute";
  } else {
    directionRelation = "obtuse";
  }

  return {
    a,
    b,
    dotProduct,
    normA,
    normB,
    euclideanDistance: dist,
    isZeroVectorError: false,
    errorMessage: null,
    cosine: clampedCos,
    angleDegrees,
    directionRelation,
  };
}

export function generateCosinePythonCode(a: readonly number[], b: readonly number[]): string {
  const aTuple = `(${a.map((v) => v.toFixed(1)).join(", ")})`;
  const bTuple = `(${b.map((v) => v.toFixed(1)).join(", ")})`;
  return `import math

def cosine_similarity(a: tuple[float, ...], b: tuple[float, ...]) -> float:
    if len(a) != len(b):
        raise ValueError("Vektor o'lchamlari mos emas")
    if not a:
        raise ValueError("Vektor bo'sh bo'lmasin")
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        raise ValueError("Nol vektor uchun cosine aniqlanmagan")
    return dot / (norm_a * norm_b)

A = ${aTuple}
B = ${bTuple}
print("Cosine similarity:", round(cosine_similarity(A, B), 4))`;
}
