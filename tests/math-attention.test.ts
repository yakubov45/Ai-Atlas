import { describe, it, expect } from "vitest";
import {
  computeOneDimAttention,
  computeMatrixAttention,
  DEFAULT_1D_TOKENS,
  DEFAULT_MATRIX_TOKENS,
  generateAttentionNumpySnippet,
} from "@/lib/math/attention";

describe("Scaled Dot-Product Attention Math Engine", () => {
  it("reproduces the exact 1D Q/K/V illustrative mini-lab values (Q=1.0 -> 26.9%, 73.1%, output=4.924)", () => {
    const result = computeOneDimAttention(1.0, DEFAULT_1D_TOKENS, 1.0);

    expect(result.steps).toHaveLength(2);
    const tokenA = result.steps[0]!;
    const tokenB = result.steps[1]!;

    // Softmax weights: e^1 / (e^1 + e^2) = 26.894%, e^2 / (e^1 + e^2) = 73.106%
    expect(tokenA.weightPercent).toBeCloseTo(26.9, 1);
    expect(tokenB.weightPercent).toBeCloseTo(73.1, 1);
    expect(tokenA.weight + tokenB.weight).toBeCloseTo(1.0, 6);

    // Output: 2 * 0.26894142 + 6 * 0.73105858 = 4.924234
    expect(result.output).toBeCloseTo(4.924, 3);
  });

  it("gives equal 50% / 50% weights and average value when Query Q = 0", () => {
    const result = computeOneDimAttention(0.0, DEFAULT_1D_TOKENS, 1.0);
    expect(result.steps[0]!.weightPercent).toBeCloseTo(50.0, 5);
    expect(result.steps[1]!.weightPercent).toBeCloseTo(50.0, 5);
    expect(result.output).toBeCloseTo(4.0, 5);
  });

  it("shifts attention toward Token B as Q increases positively, and toward Token A when Q is negative", () => {
    const highPositive = computeOneDimAttention(5.0, DEFAULT_1D_TOKENS, 1.0);
    expect(highPositive.steps[1]!.weight).toBeGreaterThan(0.99);
    expect(highPositive.output).toBeGreaterThan(5.9);

    const negativeQ = computeOneDimAttention(-3.0, DEFAULT_1D_TOKENS, 1.0);
    expect(negativeQ.steps[0]!.weight).toBeGreaterThan(0.95);
    expect(negativeQ.output).toBeLessThan(2.25);
  });

  it("computes multi-token matrix attention with normalized softmax rows and causal masking", () => {
    const unmasked = computeMatrixAttention(DEFAULT_MATRIX_TOKENS, {
      useScaling: true,
      causalMask: false,
    });

    for (const row of unmasked.weights) {
      const sum = row.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 6);
    }

    const masked = computeMatrixAttention(DEFAULT_MATRIX_TOKENS, {
      useScaling: true,
      causalMask: true,
    });

    // In causal masking, token i cannot attend to future token j > i
    for (let i = 0; i < masked.weights.length; i++) {
      const row = masked.weights[i]!;
      const sum = row.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 6);
      for (let j = i + 1; j < row.length; j++) {
        expect(row[j]).toBeCloseTo(0.0, 8);
      }
    }
  });

  it("generates a valid NumPy snippet reflecting current parameters", () => {
    const res = computeOneDimAttention(1.0, DEFAULT_1D_TOKENS, 1.0);
    const code = generateAttentionNumpySnippet(res);
    expect(code).toContain("import numpy as np");
    expect(code).toContain("4.924");
  });
});
