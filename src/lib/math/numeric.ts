/** Pure numerical helpers for interactive mathematical visualizations. */

export interface Point {
  x: number;
  y: number;
}

export type RealFunction = (x: number) => number;

/**
 * Samples a function across [min, max]. Non-finite values are returned as
 * `null`, which chart renderers treat as gaps (discontinuities).
 */
export function sampleFunction(
  fn: RealFunction,
  min: number,
  max: number,
  samples: number,
): Array<Point | null> {
  const count = Math.max(2, Math.floor(samples));
  const step = (max - min) / (count - 1);
  const out: Array<Point | null> = [];
  for (let i = 0; i < count; i++) {
    const x = min + step * i;
    const y = fn(x);
    out.push(Number.isFinite(y) ? { x, y } : null);
  }
  return out;
}

/** Central-difference numerical derivative. */
export function numericDerivative(fn: RealFunction, x: number, h = 1e-5): number {
  const scale = Math.max(1, Math.abs(x));
  const step = h * scale;
  return (fn(x + step) - fn(x - step)) / (2 * step);
}

export interface DescentStep {
  iteration: number;
  x: number;
  y: number;
  gradient: number;
}

export type DescentStatus = "running" | "converged" | "diverged" | "max-iterations";

export interface DescentOptions {
  learningRate: number;
  maxIterations: number;
  /** Stop when |x_{n+1} - x_n| falls below this value. */
  tolerance?: number;
  /** Treat |x| above this bound as divergence. */
  divergenceBound?: number;
}

/** One gradient descent update: x ← x − η·f′(x). */
export function gradientDescentStep(fn: RealFunction, x: number, learningRate: number): DescentStep & { nextX: number } {
  const gradient = numericDerivative(fn, x);
  const nextX = x - learningRate * gradient;
  return { iteration: 0, x, y: fn(x), gradient, nextX };
}

export function descentStatus(
  history: readonly DescentStep[],
  options: DescentOptions,
): DescentStatus {
  const tolerance = options.tolerance ?? 1e-6;
  const bound = options.divergenceBound ?? 1e6;
  const last = history[history.length - 1];
  if (!last) return "running";
  if (!Number.isFinite(last.x) || !Number.isFinite(last.y) || Math.abs(last.x) > bound) return "diverged";
  const prev = history[history.length - 2];
  if (prev && Math.abs(last.x - prev.x) < tolerance) return "converged";
  if (last.iteration >= options.maxIterations) return "max-iterations";
  return "running";
}

/** Appends one iteration to an optimisation history (immutably). */
export function advanceDescent(
  fn: RealFunction,
  history: readonly DescentStep[],
  options: DescentOptions,
): DescentStep[] {
  const last = history[history.length - 1];
  if (!last) return [...history];
  if (descentStatus(history, options) !== "running") return [...history];
  const { nextX } = gradientDescentStep(fn, last.x, options.learningRate);
  const y = fn(nextX);
  return [
    ...history,
    { iteration: last.iteration + 1, x: nextX, y, gradient: numericDerivative(fn, nextX) },
  ];
}

export function startDescent(fn: RealFunction, startX: number): DescentStep[] {
  return [{ iteration: 0, x: startX, y: fn(startX), gradient: numericDerivative(fn, startX) }];
}

/** Runs gradient descent to completion (used by tests and non-animated mode). */
export function runGradientDescent(
  fn: RealFunction,
  startX: number,
  options: DescentOptions,
): { history: DescentStep[]; status: DescentStatus } {
  let history = startDescent(fn, startX);
  for (let i = 0; i < options.maxIterations + 1; i++) {
    if (descentStatus(history, options) !== "running") break;
    history = advanceDescent(fn, history, options);
  }
  return { history, status: descentStatus(history, options) };
}

/** "Nice" tick values for axes (1, 2, 5 × 10^n). */
export function niceTicks(min: number, max: number, targetCount = 8): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return [];
  const span = max - min;
  const rough = span / Math.max(1, targetCount);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const residual = rough / magnitude;
  const niceStep = (residual >= 5 ? 10 : residual >= 2 ? 5 : residual >= 1 ? 2 : 1) * magnitude;
  const start = Math.ceil(min / niceStep) * niceStep;
  const ticks: number[] = [];
  for (let v = start; v <= max + niceStep * 1e-9; v += niceStep) {
    ticks.push(Math.abs(v) < niceStep * 1e-9 ? 0 : Number(v.toPrecision(12)));
  }
  return ticks;
}

/** Automatic y-range from sampled points, with padding. */
export function autoRange(points: ReadonlyArray<Point | null>, padding = 0.1): [number, number] {
  let min = Infinity;
  let max = -Infinity;
  for (const p of points) {
    if (!p) continue;
    if (p.y < min) min = p.y;
    if (p.y > max) max = p.y;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [-1, 1];
  if (min === max) return [min - 1, max + 1];
  const pad = (max - min) * padding;
  return [min - pad, max + pad];
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function formatNumber(value: number, digits = 4): string {
  if (!Number.isFinite(value)) return value > 0 ? "∞" : value < 0 ? "−∞" : "NaN";
  if (value !== 0 && (Math.abs(value) >= 1e5 || Math.abs(value) < 1e-3)) return value.toExponential(2);
  return Number(value.toFixed(digits)).toString();
}
