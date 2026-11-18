/**
 * Feedforward Neural Network Engine.
 * Supports configurable 2-layer MLP (Input -> Hidden -> Output),
 * customizable weights & biases, activation functions (ReLU, Sigmoid, Tanh, Linear),
 * step-by-step layer propagation, and detailed mathematical inspection traces.
 */

import { safeSigmoid, safeTanh } from "./functions";

export type ActivationType = "relu" | "sigmoid" | "tanh" | "linear";

export interface NeuronComputation {
  layerIndex: number;
  neuronIndex: number;
  label: string;
  inputs: number[];
  weights: number[];
  bias: number;
  weightedSum: number; // z = sum(w_i * x_i) + b
  sumFormula: string;  // e.g. "(0.50 * 1.00) + (-0.20 * 0.50) + 0.10"
  activationType: ActivationType;
  activationOutput: number; // a = f(z)
  activationFormula: string; // e.g. "sigmoid(0.50)"
}

export interface NetworkLayer {
  name: string;
  neurons: NeuronComputation[];
}

export interface ForwardPassTrace {
  inputValues: number[];
  layers: NetworkLayer[];
  finalOutput: number;
  executionSteps: Array<{
    step: number;
    title: string;
    description: string;
    activeLayerIndex: number;
    activeNeuronIndices: number[];
  }>;
}

export interface NetworkConfig {
  inputCount: number;
  hiddenCount: number;
  outputCount: number;
  hiddenActivation: ActivationType;
  outputActivation: ActivationType;
  // W1: hiddenCount x inputCount
  weights1: number[][];
  // b1: hiddenCount
  biases1: number[];
  // W2: outputCount x hiddenCount
  weights2: number[][];
  // b2: outputCount
  biases2: number[];
}

export function activate(z: number, type: ActivationType): number {
  switch (type) {
    case "relu":
      return Math.max(0, z);
    case "sigmoid":
      return safeSigmoid(z);
    case "tanh":
      return safeTanh(z);
    case "linear":
      return z;
    default:
      return z;
  }
}

export function activationFormulaText(z: number, type: ActivationType): string {
  const zStr = z.toFixed(3);
  switch (type) {
    case "relu":
      return `\\max(0, ${zStr})`;
    case "sigmoid":
      return `\\sigma(${zStr}) = \\frac{1}{1 + e^{-${zStr}}}`;
    case "tanh":
      return `\\tanh(${zStr})`;
    case "linear":
      return zStr;
  }
}

/** Pre-defined educational network presets */
export const NETWORK_PRESETS: Record<string, { name: string; description: string; config: NetworkConfig }> = {
  xorPattern: {
    name: "XOR Qaror Mantiqi",
    description: "Nochiziqli chegaraga ega klassik XOR masalasi: 2 ta kirish, 3 ta yashirin neyron va 1 ta ehtimollik chiqishi.",
    config: {
      inputCount: 2,
      hiddenCount: 3,
      outputCount: 1,
      hiddenActivation: "relu",
      outputActivation: "sigmoid",
      weights1: [
        [1.2, 1.2],
        [-1.0, 1.5],
        [1.5, -1.0],
      ],
      biases1: [-0.5, 0.2, 0.2],
      weights2: [[1.8, -1.5, -1.5]],
      biases2: [-0.3],
    },
  },
  linearClassifier: {
    name: "Chiziqli Ajratgich (Sigmoid)",
    description: "Chiziqli chegara orqali ikkita sinfni ajratuvchi silliq logistik model.",
    config: {
      inputCount: 2,
      hiddenCount: 2,
      outputCount: 1,
      hiddenActivation: "tanh",
      outputActivation: "sigmoid",
      weights1: [
        [0.8, -0.6],
        [-0.7, 0.9],
      ],
      biases1: [0.1, -0.1],
      weights2: [[1.2, 1.1]],
      biases2: [0.0],
    },
  },
  deepFeatureExtractor: {
    name: "Xususiyatlarni Ajratuvchi (Feature Extractor)",
    description: "Tanh va ReLU kombinatsiyasi orqali fazoviy almashtirishlarni namoyish qiladi.",
    config: {
      inputCount: 2,
      hiddenCount: 3,
      outputCount: 1,
      hiddenActivation: "tanh",
      outputActivation: "linear",
      weights1: [
        [1.0, 0.5],
        [-0.8, 1.2],
        [0.4, -1.1],
      ],
      biases1: [0.2, -0.3, 0.1],
      weights2: [[0.7, -0.9, 1.2]],
      biases2: [0.5],
    },
  },
};

export const DEFAULT_NETWORK_CONFIG: NetworkConfig = NETWORK_PRESETS.xorPattern!.config;

/**
 * Computes forward pass through the 2-layer network with full numerical and formula traceability.
 */
export function computeForwardPass(
  inputs: [number, number],
  config: NetworkConfig = DEFAULT_NETWORK_CONFIG
): ForwardPassTrace {
  const safeInputs: [number, number] = [
    Number.isFinite(inputs[0]) ? Math.max(-10, Math.min(10, inputs[0])) : 0,
    Number.isFinite(inputs[1]) ? Math.max(-10, Math.min(10, inputs[1])) : 0,
  ];

  // 1. Input Layer
  const inputLayer: NetworkLayer = {
    name: "Kirish Qatlami (Input Layer)",
    neurons: [
      {
        layerIndex: 0,
        neuronIndex: 0,
        label: "x_1",
        inputs: [],
        weights: [],
        bias: 0,
        weightedSum: safeInputs[0],
        sumFormula: `x_1 = ${safeInputs[0].toFixed(2)}`,
        activationType: "linear",
        activationOutput: safeInputs[0],
        activationFormula: safeInputs[0].toFixed(2),
      },
      {
        layerIndex: 0,
        neuronIndex: 1,
        label: "x_2",
        inputs: [],
        weights: [],
        bias: 0,
        weightedSum: safeInputs[1],
        sumFormula: `x_2 = ${safeInputs[1].toFixed(2)}`,
        activationType: "linear",
        activationOutput: safeInputs[1],
        activationFormula: safeInputs[1].toFixed(2),
      },
    ],
  };

  // 2. Hidden Layer
  const hiddenNeurons: NeuronComputation[] = [];
  const hiddenOutputs: number[] = [];

  for (let j = 0; j < config.hiddenCount; j++) {
    const w = config.weights1[j] ?? [0, 0];
    const b = config.biases1[j] ?? 0;
    const weightedSum = (w[0] ?? 0) * safeInputs[0] + (w[1] ?? 0) * safeInputs[1] + b;
    const act = activate(weightedSum, config.hiddenActivation);
    hiddenOutputs.push(act);

    const sumFormula = `(${w[0]?.toFixed(2)} · ${safeInputs[0].toFixed(2)}) + (${w[1]?.toFixed(2)} · ${safeInputs[1].toFixed(2)}) + (${b.toFixed(2)})`;

    hiddenNeurons.push({
      layerIndex: 1,
      neuronIndex: j,
      label: `h_{${j + 1}}`,
      inputs: safeInputs,
      weights: w,
      bias: b,
      weightedSum,
      sumFormula,
      activationType: config.hiddenActivation,
      activationOutput: act,
      activationFormula: activationFormulaText(weightedSum, config.hiddenActivation),
    });
  }

  const hiddenLayer: NetworkLayer = {
    name: `Yashirin Qatlam (${config.hiddenActivation.toUpperCase()})`,
    neurons: hiddenNeurons,
  };

  // 3. Output Layer
  const outputNeurons: NeuronComputation[] = [];
  const wOut = config.weights2[0] ?? hiddenOutputs.map(() => 0);
  const bOut = config.biases2[0] ?? 0;

  let outSum = bOut;
  const formulaParts: string[] = [];
  for (let j = 0; j < config.hiddenCount; j++) {
    const term = (wOut[j] ?? 0) * hiddenOutputs[j]!;
    outSum += term;
    formulaParts.push(`(${wOut[j]?.toFixed(2)} · ${hiddenOutputs[j]?.toFixed(2)})`);
  }
  formulaParts.push(`(${bOut.toFixed(2)})`);

  const finalOutput = activate(outSum, config.outputActivation);

  outputNeurons.push({
    layerIndex: 2,
    neuronIndex: 0,
    label: "\\hat{y}",
    inputs: hiddenOutputs,
    weights: wOut,
    bias: bOut,
    weightedSum: outSum,
    sumFormula: formulaParts.join(" + "),
    activationType: config.outputActivation,
    activationOutput: finalOutput,
    activationFormula: activationFormulaText(outSum, config.outputActivation),
  });

  const outputLayer: NetworkLayer = {
    name: `Chiqish Qatlami (${config.outputActivation.toUpperCase()})`,
    neurons: outputNeurons,
  };

  const executionSteps = [
    {
      step: 0,
      title: "1. Kirish signallari qabul qilindi",
      description: `Tarmoqqa kiruvchi qiymatlar: x₁ = ${safeInputs[0].toFixed(2)}, x₂ = ${safeInputs[1].toFixed(2)}.`,
      activeLayerIndex: 0,
      activeNeuronIndices: [0, 1],
    },
    {
      step: 1,
      title: "2. Yashirin qatlam: Tortilgan yig'indilar (z)",
      description: `Har bir yashirin neyron kirish signallari va vaznlar skalyar ko'paytmasiga siljish (bias) qo'shadi: zⱼ = ∑(wⱼᵢ · xᵢ) + bⱼ.`,
      activeLayerIndex: 1,
      activeNeuronIndices: [0, 1, 2],
    },
    {
      step: 2,
      title: "3. Yashirin qatlam: Aktivatsiya funksiyasi a = f(z)",
      description: `Chiziqli bo'lmagan ${config.hiddenActivation.toUpperCase()} funksiyasi har bir zⱼ ga qo'llanilib, faollashuv signali aⱼ hisoblanadi.`,
      activeLayerIndex: 1,
      activeNeuronIndices: [0, 1, 2],
    },
    {
      step: 3,
      title: "4. Chiqish qatlami: Yakuniy chiziqli kombinatsiya",
      description: `Yashirin qatlam aktivatsiyalari chiqish vaznlari bilan ko'paytirilib, z_out = ∑(wⱼ · aⱼ) + b yig'indisi topiladi.`,
      activeLayerIndex: 2,
      activeNeuronIndices: [0],
    },
    {
      step: 4,
      title: "5. Chiqish aktivatsiyasi va Bashorat (ŷ)",
      description: `${config.outputActivation.toUpperCase()} funksiyasi qo'llanilib, tarmoqning yakuniy chiqishi ŷ = ${finalOutput.toFixed(4)} hosil qilindi.`,
      activeLayerIndex: 2,
      activeNeuronIndices: [0],
    },
  ];

  return {
    inputValues: safeInputs,
    layers: [inputLayer, hiddenLayer, outputLayer],
    finalOutput,
    executionSteps,
  };
}
