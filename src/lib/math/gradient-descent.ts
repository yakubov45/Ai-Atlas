/**
 * Gradient Descent Mathematical Engine.
 * Implements exact analytical loss L(x) = (x - 3)^2, derivative dL/dx = 2(x - 3),
 * step-by-step history, convergence & divergence classification,
 * learning rate presets, and numerical stability.
 */

export interface GradientDescentState {
  iteration: number;
  x: number;
  loss: number;
  gradient: number;
  deltaX: number;
  learningRate: number;
  initialX: number;
  targetMinimum: number;
  status: "idle" | "running" | "converged" | "diverged" | "overshooting";
  history: Array<{
    iteration: number;
    x: number;
    loss: number;
    gradient: number;
    deltaX: number;
  }>;
}

export interface GradientDescentPreset {
  id: string;
  name: string;
  learningRate: number;
  description: string;
  expectedBehavior: "slow" | "optimal" | "oscillating" | "divergent";
}

export const GD_PRESETS: GradientDescentPreset[] = [
  {
    id: "namuna",
    name: "Namuna (w₀=0, η=0.10)",
    learningRate: 0.1,
    description: "Mikro-dars namunasi: w₀ = 0, η = 0.1 -> 1-qadam w=0.6 (L=5.76), 2-qadam w=1.08 (L=3.6864), 3-qadam w=1.464.",
    expectedBehavior: "optimal",
  },
  {
    id: "small",
    name: "Juda kichik (0.05)",
    learningRate: 0.05,
    description: "Gradient kichik qadamlar bilan juda sekin optimumga yaqinlashadi (sekin konvergensiya).",
    expectedBehavior: "slow",
  },
  {
    id: "optimal",
    name: "Optimal (0.25)",
    learningRate: 0.25,
    description: "Bir necha qadamda tebranishlarsiz aniq minimum x = 3.0 ga yetib boradi.",
    expectedBehavior: "optimal",
  },
  {
    id: "large",
    name: "Katta / Tebranma (0.95)",
    learningRate: 0.95,
    description: "Minimumdan o'tib ketadi (overshoot) va har ikki tomonga tebranib qiyinchilik bilan yaqinlashadi.",
    expectedBehavior: "oscillating",
  },
  {
    id: "divergent",
    name: "O'ta katta / Portlovchi (1.10)",
    learningRate: 1.1,
    description: "η > 1.0 bo'lganda har qadamda xatolik kattalashadi va gradient tushish to'liq tarqalib (diverge) ketadi.",
    expectedBehavior: "divergent",
  },
];

export const TARGET_MINIMUM = 3.0;

/** Loss: L(x) = (x - 3)^2 */
export function computeLoss(x: number, target = TARGET_MINIMUM): number {
  const diff = x - target;
  return diff * diff;
}

/** Derivative: dL/dx = 2(x - 3) */
export function computeGradient(x: number, target = TARGET_MINIMUM): number {
  return 2 * (x - target);
}

/** Initialise simulator state */
export function createInitialGdState(initialX = 7.0, learningRate = 0.25): GradientDescentState {
  const loss = computeLoss(initialX);
  const gradient = computeGradient(initialX);
  return {
    iteration: 0,
    x: initialX,
    loss,
    gradient,
    deltaX: 0,
    learningRate,
    initialX,
    targetMinimum: TARGET_MINIMUM,
    status: "idle",
    history: [
      {
        iteration: 0,
        x: initialX,
        loss,
        gradient,
        deltaX: 0,
      },
    ],
  };
}

/**
 * Executes a single gradient descent update step:
 * x_{t+1} = x_t - \alpha * dL/dx
 */
export function stepGradientDescent(
  currentState: GradientDescentState,
  learningRate?: number
): GradientDescentState {
  const alpha = learningRate ?? currentState.learningRate;
  const currentX = currentState.x;

  if (currentState.status === "converged" || currentState.status === "diverged") {
    return currentState;
  }

  // Calculate gradient
  const grad = computeGradient(currentX, currentState.targetMinimum);
  const deltaX = -alpha * grad;
  const nextX = currentX + deltaX;
  const nextLoss = computeLoss(nextX, currentState.targetMinimum);
  const nextGrad = computeGradient(nextX, currentState.targetMinimum);
  const nextIteration = currentState.iteration + 1;

  // Detect numerical overflow or divergence
  let newStatus: GradientDescentState["status"] = "running";
  if (!Number.isFinite(nextX) || !Number.isFinite(nextLoss) || Math.abs(nextX) > 1000 || nextLoss > 1e6 || (alpha > 1.0 && nextLoss > currentState.loss)) {
    newStatus = "diverged";
  } else if (Math.abs(nextGrad) < 1e-4) {
    newStatus = "converged";
  } else if (Math.sign(grad) !== Math.sign(nextGrad) && Math.abs(deltaX) > 0.5) {
    newStatus = "overshooting";
  }

  const updatedHistory = [
    ...currentState.history,
    {
      iteration: nextIteration,
      x: nextX,
      loss: nextLoss,
      gradient: nextGrad,
      deltaX,
    },
  ];

  return {
    ...currentState,
    iteration: nextIteration,
    x: nextX,
    loss: nextLoss,
    gradient: nextGrad,
    deltaX,
    learningRate: alpha,
    status: newStatus,
    history: updatedHistory,
  };
}

/**
 * Resets state back to iteration 0 with specified parameters
 */
export function resetGradientDescent(initialX: number, learningRate: number): GradientDescentState {
  return createInitialGdState(initialX, learningRate);
}
