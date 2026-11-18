import { describe, it, expect } from "vitest";
import {
  computeLoss,
  computeGradient,
  createInitialGdState,
  stepGradientDescent,
  TARGET_MINIMUM,
} from "@/lib/math/gradient-descent";

describe("Gradient Descent Mathematical Simulator", () => {
  it("calculates exact analytical loss L(x) = (x - 3)^2 and gradient dL/dx = 2(x - 3)", () => {
    expect(computeLoss(TARGET_MINIMUM)).toBe(0);
    expect(computeGradient(TARGET_MINIMUM)).toBe(0);

    expect(computeLoss(5)).toBe(4); // (5 - 3)^2 = 4
    expect(computeGradient(5)).toBe(4); // 2 * (5 - 3) = 4

    expect(computeLoss(1)).toBe(4); // (1 - 3)^2 = 4
    expect(computeGradient(1)).toBe(-4); // 2 * (1 - 3) = -4
  });

  it("converges to target minimum (x=3.0) with optimal learning rate (0.25)", () => {
    let state = createInitialGdState(7.0, 0.25);
    expect(state.x).toBe(7.0);
    expect(state.loss).toBe(16.0); // (7 - 3)^2 = 16
    expect(state.gradient).toBe(8.0); // 2*(7 - 3) = 8

    // Step 1: nextX = 7 - 0.25 * 8 = 5.0
    state = stepGradientDescent(state);
    expect(state.x).toBeCloseTo(5.0, 5);
    expect(state.loss).toBeCloseTo(4.0, 5);

    // Step 2: nextX = 5 - 0.25 * 4 = 4.0
    state = stepGradientDescent(state);
    expect(state.x).toBeCloseTo(4.0, 5);

    // Run until convergence
    for (let i = 0; i < 30; i++) {
      state = stepGradientDescent(state);
    }

    expect(state.x).toBeCloseTo(TARGET_MINIMUM, 4);
    expect(state.loss).toBeCloseTo(0.0, 4);
    expect(state.status).toBe("converged");
  });

  it("detects overshooting with large learning rate (0.95)", () => {
    let state = createInitialGdState(7.0, 0.95);
    // Step 1: grad=8, deltaX = -0.95 * 8 = -7.6 => nextX = 7 - 7.6 = -0.6
    state = stepGradientDescent(state);
    expect(state.status).toBe("overshooting");
    expect(state.x).toBeLessThan(TARGET_MINIMUM);
  });

  it("detects divergence when learning rate exceeds critical bound (alpha > 1.0)", () => {
    // For f(x) = (x-3)^2, error ratio is |1 - 2*alpha|.
    // When alpha = 1.1, |1 - 2.2| = 1.2 > 1 => strictly diverges!
    let state = createInitialGdState(5.0, 1.1);
    for (let i = 0; i < 40; i++) {
      state = stepGradientDescent(state);
      if (state.status === "diverged") break;
    }
    expect(state.status).toBe("diverged");
  });
});
