import { describe, it, expect } from "vitest";
import {
  analyzeVectorPair,
  cosineSimilarityStrict,
  vectorDotProduct,
  vectorNorm,
  euclideanDistance,
} from "@/lib/math/cosine-similarity";

describe("Phase 12 — Cosine Similarity & Vector Math Engine", () => {
  it("computes exact dot product, norms, cosine similarity and 45° angle for A=(1,0) and C=(1,1)", () => {
    const res = analyzeVectorPair([1, 0], [1, 1]);

    expect(res.isZeroVectorError).toBe(false);
    expect(res.errorMessage).toBeNull();
    expect(res.dotProduct).toBeCloseTo(1, 6);
    expect(res.normA).toBeCloseTo(1, 6);
    expect(res.normB).toBeCloseTo(Math.SQRT2, 6);
    expect(res.cosine).toBeCloseTo(1 / Math.SQRT2, 4); // ~0.7071
    expect(res.angleDegrees).toBeCloseTo(45, 2);
  });

  it("computes cosine = 1 (0° angle) for parallel vectors in the same direction", () => {
    const res = analyzeVectorPair([1, 2], [2, 4]);
    expect(res.isZeroVectorError).toBe(false);
    expect(res.cosine).toBeCloseTo(1.0, 6);
    expect(res.angleDegrees).toBeCloseTo(0, 4);
    expect(res.directionRelation).toBe("same");
  });

  it("computes cosine = 0 (90° angle) for orthogonal vectors A=(1,0) and B=(0,1)", () => {
    const res = analyzeVectorPair([1, 0], [0, 1]);
    expect(res.isZeroVectorError).toBe(false);
    expect(res.dotProduct).toBe(0);
    expect(res.cosine).toBeCloseTo(0, 6);
    expect(res.angleDegrees).toBeCloseTo(90, 4);
    expect(res.directionRelation).toBe("orthogonal");
  });

  it("computes cosine = -1 (180° angle) for opposite vectors A=(2,0) and B=(-3,0)", () => {
    const res = analyzeVectorPair([2, 0], [-3, 0]);
    expect(res.isZeroVectorError).toBe(false);
    expect(res.dotProduct).toBe(-6);
    expect(res.normA).toBe(2);
    expect(res.normB).toBe(3);
    expect(res.cosine).toBeCloseTo(-1, 6);
    expect(res.angleDegrees).toBeCloseTo(180, 4);
    expect(res.directionRelation).toBe("opposite");
  });

  it("explicitly detects zero vector B=(0,0) and returns an educational error without NaN", () => {
    const res = analyzeVectorPair([1, 2], [0, 0]);
    expect(res.isZeroVectorError).toBe(true);
    expect(res.cosine).toBeNull();
    expect(res.angleDegrees).toBeNull();
    expect(res.errorMessage).toContain("Nol vektor");
    expect(Number.isNaN(res.dotProduct)).toBe(false);
    expect(() => cosineSimilarityStrict([1, 2], [0, 0])).toThrow(
      "Nol vektor uchun cosine aniqlanmagan",
    );
  });

  it("computes N-dimensional cosine similarity, norm, dot product and Euclidean distance", () => {
    expect(cosineSimilarityStrict([1, 2, 3], [1, 2, 3])).toBeCloseTo(1, 6);
    expect(vectorNorm([3, 4])).toBe(5);
    expect(vectorDotProduct([3, 4], [1, 2])).toBe(11);
    expect(euclideanDistance([0, 0], [3, 4])).toBe(5);
  });
});
