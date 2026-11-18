"use client";

import React, { useState, useMemo } from "react";
import {
  computeForwardPass,
  NETWORK_PRESETS,
  DEFAULT_NETWORK_CONFIG,
  type ActivationType,
  type NetworkConfig,
  type NeuronComputation,
} from "@/lib/math/neural-network";
import { FormulaDisplay } from "./FormulaDisplay";
import {
  StepForward,
  RotateCcw,
  Sparkles,
  Layers,
  Cpu,
  Info,
} from "lucide-react";

export function NeuralNetworkExplorer({ className = "" }: { className?: string }) {
  const [config, setConfig] = useState<NetworkConfig>(DEFAULT_NETWORK_CONFIG);
  const [inputs, setInputs] = useState<[number, number]>([1.0, 0.5]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedNeuron, setSelectedNeuron] = useState<NeuronComputation | null>(null);

  // Compute forward pass trace
  const trace = useMemo(() => {
    return computeForwardPass(inputs, config);
  }, [inputs, config]);

  const currentStepInfo = trace.executionSteps[activeStep] ?? trace.executionSteps[0]!;

  const handlePresetSelect = (presetKey: string) => {
    const p = NETWORK_PRESETS[presetKey];
    if (p) {
      setConfig(p.config);
      setActiveStep(0);
      setSelectedNeuron(null);
    }
  };

  const handleActivationChange = (activation: ActivationType) => {
    setConfig((prev) => ({
      ...prev,
      hiddenActivation: activation,
    }));
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev < trace.executionSteps.length - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setActiveStep(0);
    setInputs([1.0, 0.5]);
    setSelectedNeuron(null);
  };

  // Node positions on SVG canvas
  const svgWidth = 680;
  const svgHeight = 400;

  const inputPositions = [
    { x: 120, y: 140, label: "x₁" },
    { x: 120, y: 260, label: "x₂" },
  ];

  const hiddenPositions = [
    { x: 340, y: 90, label: "h₁" },
    { x: 340, y: 200, label: "h₂" },
    { x: 340, y: 310, label: "h₃" },
  ];

  const outputPositions = [{ x: 560, y: 200, label: "ŷ" }];

  return (
    <div className={`w-full flex flex-col gap-5 ${className}`}>
      {/* Top Presets & Activations Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1 mr-1">
            Mavzular:
          </span>
          {Object.entries(NETWORK_PRESETS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => handlePresetSelect(key)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Activation Selector */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <span className="text-[11px] font-medium text-slate-400 px-1.5">Aktivatsiya:</span>
          {(["relu", "sigmoid", "tanh", "linear"] as ActivationType[]).map((act) => (
            <button
              key={act}
              onClick={() => handleActivationChange(act)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase font-bold transition-colors ${
                config.hiddenActivation === act
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Neural Network Canvas, Right Inspector & Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (7 cols): Interactive SVG Diagram */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden p-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connections: Input to Hidden */}
              {inputPositions.map((inP, i) =>
                hiddenPositions.map((hidP, j) => {
                  const weight = config.weights1[j]?.[i] ?? 0;
                  const isActive = activeStep >= 1;
                  const strokeColor = weight >= 0 ? "#38bdf8" : "#f43f5e";
                  const strokeWidth = Math.max(1, Math.min(4.5, Math.abs(weight) * 2));

                  return (
                    <g key={`w1-${i}-${j}`}>
                      <line
                        x1={inP.x}
                        y1={inP.y}
                        x2={hidP.x}
                        y2={hidP.y}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeOpacity={isActive ? 0.85 : 0.3}
                        filter={isActive ? "url(#glow)" : undefined}
                      />
                      <text
                        x={(inP.x + hidP.x) / 2 + (j - 1) * 8}
                        y={(inP.y + hidP.y) / 2 - 4}
                        fill="#94a3b8"
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        w={weight.toFixed(1)}
                      </text>
                    </g>
                  );
                })
              )}

              {/* Connections: Hidden to Output */}
              {hiddenPositions.map((hidP, j) =>
                outputPositions.map((outP, k) => {
                  const weight = config.weights2[k]?.[j] ?? 0;
                  const isActive = activeStep >= 3;
                  const strokeColor = weight >= 0 ? "#a855f7" : "#f43f5e";
                  const strokeWidth = Math.max(1, Math.min(5, Math.abs(weight) * 2.5));

                  return (
                    <g key={`w2-${j}-${k}`}>
                      <line
                        x1={hidP.x}
                        y1={hidP.y}
                        x2={outP.x}
                        y2={outP.y}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeOpacity={isActive ? 0.9 : 0.3}
                        filter={isActive ? "url(#glow)" : undefined}
                      />
                      <text
                        x={(hidP.x + outP.x) / 2}
                        y={(hidP.y + outP.y) / 2 - 4}
                        fill="#c084fc"
                        fontSize="9"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        w={weight.toFixed(1)}
                      </text>
                    </g>
                  );
                })
              )}

              {/* Input Nodes */}
              {inputPositions.map((inP, i) => {
                const neuron = trace.layers[0]?.neurons[i];
                const isSelected = selectedNeuron?.label === neuron?.label;
                return (
                  <g
                    key={`in-${i}`}
                    className="cursor-pointer"
                    onClick={() => neuron && setSelectedNeuron(neuron)}
                  >
                    <circle
                      cx={inP.x}
                      cy={inP.y}
                      r="24"
                      fill="#0f172a"
                      stroke={isSelected ? "#38bdf8" : "#0284c7"}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <text
                      x={inP.x}
                      y={inP.y - 2}
                      fill="#e2e8f0"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {inP.label}
                    </text>
                    <text
                      x={inP.x}
                      y={inP.y + 12}
                      fill="#38bdf8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {inputs[i]?.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Hidden Nodes */}
              {hiddenPositions.map((hidP, j) => {
                const neuron = trace.layers[1]?.neurons[j];
                const isSelected = selectedNeuron?.label === neuron?.label;
                const isActive = activeStep >= 2;
                return (
                  <g
                    key={`hid-${j}`}
                    className="cursor-pointer"
                    onClick={() => neuron && setSelectedNeuron(neuron)}
                  >
                    <circle
                      cx={hidP.x}
                      cy={hidP.y}
                      r="24"
                      fill="#1e1b4b"
                      stroke={isSelected ? "#c084fc" : isActive ? "#818cf8" : "#4338ca"}
                      strokeWidth={isSelected ? 3 : 2}
                      filter={isActive ? "url(#glow)" : undefined}
                    />
                    <text
                      x={hidP.x}
                      y={hidP.y - 3}
                      fill="#e2e8f0"
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {hidP.label}
                    </text>
                    <text
                      x={hidP.x}
                      y={hidP.y + 11}
                      fill="#c084fc"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {neuron ? neuron.activationOutput.toFixed(2) : "0.0"}
                    </text>
                  </g>
                );
              })}

              {/* Output Node */}
              {outputPositions.map((outP, k) => {
                const neuron = trace.layers[2]?.neurons[k];
                const isSelected = selectedNeuron?.label === neuron?.label;
                const isActive = activeStep >= 4;
                return (
                  <g
                    key={`out-${k}`}
                    className="cursor-pointer"
                    onClick={() => neuron && setSelectedNeuron(neuron)}
                  >
                    <circle
                      cx={outP.x}
                      cy={outP.y}
                      r="28"
                      fill="#064e3b"
                      stroke={isSelected ? "#34d399" : isActive ? "#10b981" : "#059669"}
                      strokeWidth={isSelected ? 3.5 : 2}
                      filter={isActive ? "url(#glow)" : undefined}
                    />
                    <text
                      x={outP.x}
                      y={outP.y - 4}
                      fill="#f8fafc"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {outP.label}
                    </text>
                    <text
                      x={outP.x}
                      y={outP.y + 12}
                      fill="#34d399"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {trace.finalOutput.toFixed(3)}
                    </text>
                  </g>
                );
              })}

              {/* Layer Titles */}
              <text x={120} y={40} fill="#94a3b8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Kirish (Inputs)
              </text>
              <text x={340} y={40} fill="#c084fc" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Yashirin ({config.hiddenActivation.toUpperCase()})
              </text>
              <text x={560} y={40} fill="#34d399" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                Chiqish ({config.outputActivation.toUpperCase()})
              </text>
            </svg>

            {/* Bottom Stepper Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/80 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextStep}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md transition-colors"
                >
                  <StepForward className="w-4 h-4" />
                  <span>Keyingi Qadam ({activeStep + 1}/5)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qaytarish</span>
                </button>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>{currentStepInfo.title}</span>
              </div>
            </div>
          </div>

          {/* Educational Step Description */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{currentStepInfo.description}</p>
          </div>
        </div>

        {/* Right Column (5 cols): Neuron Inspector & Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Selected Neuron Inspector Card */}
          {selectedNeuron ? (
            <FormulaDisplay
              title={`Neyron Tahlili: ${selectedNeuron.label}`}
              symbolic={
                selectedNeuron.layerIndex === 0
                  ? `x_{${selectedNeuron.neuronIndex + 1}}`
                  : `z = \\sum w_i \\cdot x_i + b \\rightarrow a = f(z)`
              }
              substituted={selectedNeuron.sumFormula}
              derivative={selectedNeuron.activationFormula}
              computedResult={{
                label: "Aktivatsiya a",
                value: selectedNeuron.activationOutput,
              }}
              context="Diagrammadagi istalgan neyron yoki bog'lanish ustiga bosib, uning ichki hisob-kitobini tekshirishingiz mumkin."
            />
          ) : (
            <FormulaDisplay
              title="Yakuniy Chiqish Formulasi"
              symbolic="\hat{y} = \sigma\left(\sum_{j=1}^3 w_j^{(2)} \cdot a_j^{(1)} + b^{(2)}\right)"
              substituted={trace.layers[2]?.neurons[0]?.sumFormula}
              derivative={trace.layers[2]?.neurons[0]?.activationFormula}
              computedResult={{
                label: "Bashorat ŷ",
                value: trace.finalOutput,
              }}
              context="Istalgan neyron ustiga bosib, uning skalyar ko'paytmasi va siljishini batafsil ko'ring."
            />
          )}

          {/* Input Controls */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Kirish Signallarini Sozlash (x₁, x₂)
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Kirish x₁</label>
                <input
                  type="number"
                  step="0.1"
                  min="-3"
                  max="3"
                  value={inputs[0]}
                  onChange={(e) => setInputs([parseFloat(e.target.value) || 0, inputs[1]])}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Kirish x₂</label>
                <input
                  type="number"
                  step="0.1"
                  min="-3"
                  max="3"
                  value={inputs[1]}
                  onChange={(e) => setInputs([inputs[0], parseFloat(e.target.value) || 0])}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Network Summary */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                Arxitektura:
              </span>
              <span className="font-mono text-slate-200">2 → 3 → 1 (MLP)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Umumiy parametrlar:
              </span>
              <span className="font-mono text-slate-200">9 ta vazn + 4 ta bias = 13</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
