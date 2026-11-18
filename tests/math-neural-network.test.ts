import { describe, it, expect } from "vitest";
import {
  computeForwardPass,
  activate,
  NETWORK_PRESETS,
} from "@/lib/math/neural-network";

describe("Neural Network Mathematical Engine", () => {
  it("computes activation functions properly", () => {
    expect(activate(-2, "relu")).toBe(0);
    expect(activate(3, "relu")).toBe(3);
    expect(activate(0, "sigmoid")).toBeCloseTo(0.5, 4);
    expect(activate(0, "tanh")).toBe(0);
    expect(activate(4.5, "linear")).toBe(4.5);
  });

  it("performs mathematically accurate forward pass on 2-layer network", () => {
    const config = NETWORK_PRESETS.xorPattern!.config;
    const trace = computeForwardPass([1.0, 0.0], config);

    expect(trace.inputValues).toEqual([1.0, 0.0]);
    expect(trace.layers.length).toBe(3); // Input, Hidden, Output

    // Check hidden layer neurons:
    // Neuron 0: w=[1.2, 1.2], b=-0.5 => z = 1.2*1 + 1.2*0 - 0.5 = 0.70 => ReLU(0.7) = 0.7
    const h0 = trace.layers[1]?.neurons[0];
    expect(h0?.weightedSum).toBeCloseTo(0.7, 4);
    expect(h0?.activationOutput).toBeCloseTo(0.7, 4);

    // Neuron 1: w=[-1.0, 1.5], b=0.2 => z = -1.0*1 + 1.5*0 + 0.2 = -0.80 => ReLU(-0.8) = 0
    const h1 = trace.layers[1]?.neurons[1];
    expect(h1?.weightedSum).toBeCloseTo(-0.8, 4);
    expect(h1?.activationOutput).toBe(0);

    // Output neuron:
    // w2=[1.8, -1.5, -1.5], b2=-0.3
    // h outputs: h0=0.7, h1=0, h2: w=[1.5, -1], b=0.2 => z = 1.5 - 0 + 0.2 = 1.7 => ReLU(1.7)=1.7
    // outSum = 1.8*0.7 + (-1.5)*0 + (-1.5)*1.7 + (-0.3) = 1.26 - 2.55 - 0.3 = -1.59
    // output = sigmoid(-1.59)
    const out = trace.layers[2]?.neurons[0];
    expect(out?.weightedSum).toBeCloseTo(-1.59, 3);
    expect(trace.finalOutput).toBeCloseTo(1 / (1 + Math.exp(1.59)), 3);
  });

  it("handles extreme and invalid numeric inputs safely without crash or NaN", () => {
    const trace = computeForwardPass([1e6, -1e6]);
    expect(Number.isFinite(trace.finalOutput)).toBe(true);
    expect(Number.isNaN(trace.finalOutput)).toBe(false);

    const trace2 = computeForwardPass([NaN, Infinity]);
    expect(Number.isFinite(trace2.finalOutput)).toBe(true);
    expect(Number.isNaN(trace2.finalOutput)).toBe(false);
  });

  it("generates 5 sequential execution steps for educational walkthrough", () => {
    const trace = computeForwardPass([0.5, -0.5]);
    expect(trace.executionSteps.length).toBe(5);
    expect(trace.executionSteps[0]?.activeLayerIndex).toBe(0);
    expect(trace.executionSteps[1]?.activeLayerIndex).toBe(1);
    expect(trace.executionSteps[4]?.activeLayerIndex).toBe(2);
  });
});
