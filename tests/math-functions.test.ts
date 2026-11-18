import { describe, it, expect } from "vitest";
import {
  SUPPORTED_FUNCTIONS,
  safeSigmoid,
  safeTanh,
  type FunctionId,
} from "@/lib/math/functions";

describe("Mathematical Functions Core", () => {
  it("evaluates linear function correctly with derivatives", () => {
    const fn = SUPPORTED_FUNCTIONS.linear;
    const params = { a: 2.5, b: -1.0 };
    expect(fn.evaluate(2, params)).toBe(4.0); // 2.5 * 2 - 1 = 4
    expect(fn.evaluate(-2, params)).toBe(-6.0);
    expect(fn.derivative(2, params)).toBe(2.5);
    expect(fn.formatFormula(params)).toContain("2.50x - 1.00");
  });

  it("evaluates quadratic function with vertex and analytical derivative", () => {
    const fn = SUPPORTED_FUNCTIONS.quadratic;
    const params = { a: 1.0, b: -4.0, c: 3.0 }; // (x - 2)^2 - 1 => roots at 1 and 3, vertex at x=2, y=-1
    expect(fn.evaluate(1, params)).toBe(0);
    expect(fn.evaluate(3, params)).toBe(0);
    expect(fn.evaluate(2, params)).toBe(-1);
    expect(fn.derivative(2, params)).toBe(0); // minimum slope is 0!
    expect(fn.derivative(4, params)).toBe(4); // 2*1*4 - 4 = 4
  });

  it("evaluates ReLU with piecewise derivative and threshold shifting", () => {
    const fn = SUPPORTED_FUNCTIONS.relu;
    const params = { scale: 1.5, threshold: 2.0 };
    expect(fn.evaluate(1.0, params)).toBe(0);
    expect(fn.evaluate(2.0, params)).toBe(0);
    expect(fn.evaluate(4.0, params)).toBe(3.0); // 1.5 * (4 - 2) = 3
    expect(fn.derivative(1.0, params)).toBe(0);
    expect(fn.derivative(3.0, params)).toBe(1.5);
  });

  it("handles Sigmoid and safe exponential bounds without NaN/overflow", () => {
    expect(safeSigmoid(0)).toBeCloseTo(0.5, 5);
    expect(safeSigmoid(100)).toBe(1.0);
    expect(safeSigmoid(-100)).toBe(0.0);
    expect(Number.isFinite(safeSigmoid(1e9))).toBe(true);
    expect(Number.isFinite(safeSigmoid(-1e9))).toBe(true);

    const fn = SUPPORTED_FUNCTIONS.sigmoid;
    const params = { k: 1.0, shift: 0.0 };
    expect(fn.evaluate(0, params)).toBeCloseTo(0.5, 4);
    // Derivative of sigmoid at x=0 is s * (1 - s) = 0.5 * 0.5 = 0.25
    expect(fn.derivative(0, params)).toBeCloseTo(0.25, 4);
  });

  it("handles Tanh symmetry and derivative bounds", () => {
    expect(safeTanh(0)).toBe(0);
    expect(safeTanh(100)).toBe(1.0);
    expect(safeTanh(-100)).toBe(-1.0);

    const fn = SUPPORTED_FUNCTIONS.tanh;
    const params = { k: 1.0, shift: 0.0 };
    expect(fn.evaluate(0, params)).toBe(0);
    // Derivative of tanh at 0 is 1 - 0 = 1
    expect(fn.derivative(0, params)).toBe(1);
    expect(fn.evaluate(2, params)).toBeCloseTo(Math.tanh(2), 5);
  });

  it("verifies all supported functions define expected fields", () => {
    const ids: FunctionId[] = ["linear", "quadratic", "relu", "sigmoid", "tanh"];
    for (const id of ids) {
      const def = SUPPORTED_FUNCTIONS[id];
      expect(def).toBeDefined();
      expect(def.parameters.length).toBeGreaterThan(0);
      expect(def.domainDefault[1]).toBeGreaterThan(def.domainDefault[0]);
    }
  });
});
