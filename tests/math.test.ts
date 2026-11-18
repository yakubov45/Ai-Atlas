import { describe, it, expect } from "vitest";
import { compileExpression } from "@/lib/math/expression";
import {
  numericDerivative,
  runGradientDescent,
} from "@/lib/math/numeric";

describe("Mathematical Expression Compiler & Numerics", () => {
  it("safely evaluates polynomials and functions without eval", () => {
    const expr = compileExpression("a * x^2 + b * sin(x) + c");
    const val = expr.evaluate({ a: 2, b: 3, c: 5, x: 0 });
    expect(val).toBe(5);

    const val2 = expr.evaluate({ a: 1, b: 0, c: 0, x: 4 });
    expect(val2).toBe(16);
  });

  it("handles operator precedence and parentheses correctly", () => {
    const expr = compileExpression("2 + 3 * 4 - (8 / 2)");
    expect(expr.evaluate({})).toBe(10);
  });

  it("supports implicit multiplication and AI activation functions", () => {
    // 2x -> 2 * x
    const expr1 = compileExpression("2x + 3");
    expect(expr1.evaluate({ x: 4 })).toBe(11);

    // 2(x+1) -> 2 * (x+1)
    const expr2 = compileExpression("2(x + 1)");
    expect(expr2.evaluate({ x: 3 })).toBe(8);

    // sigmoid(0) = 0.5
    const sig = compileExpression("sigmoid(x)");
    expect(sig.evaluate({ x: 0 })).toBeCloseTo(0.5, 4);

    // relu(-5) = 0, relu(5) = 5
    const relu = compileExpression("relu(x)");
    expect(relu.evaluate({ x: -5 })).toBe(0);
    expect(relu.evaluate({ x: 5 })).toBe(5);

    // gelu(0) = 0
    const gelu = compileExpression("gelu(x)");
    expect(gelu.evaluate({ x: 0 })).toBeCloseTo(0, 4);
  });

  it("calculates numerical derivatives accurately", () => {
    // f(x) = x^2 => f'(3) = 6
    const f = (x: number) => x * x;
    const deriv = numericDerivative(f, 3);
    expect(deriv).toBeCloseTo(6, 4);

    // f(x) = sin(x) => f'(0) = cos(0) = 1
    const derivSin = numericDerivative(Math.sin, 0);
    expect(derivSin).toBeCloseTo(1, 4);
  });

  it("runs 1D gradient descent to convergence on a convex function", () => {
    const f = (x: number) => x * x; // minimum at x = 0
    const { history, status } = runGradientDescent(f, 4, {
      learningRate: 0.1,
      maxIterations: 60,
      tolerance: 1e-4,
    });

    expect(status).toBe("converged");
    const last = history[history.length - 1]!;
    expect(Math.abs(last.x)).toBeLessThan(0.01);
  });
});
