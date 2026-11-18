"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Play,
  Sliders,
  Cpu,
  BarChart3,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";

export function InteractiveShowcaseSection() {
  const [activeTab, setActiveTab] = useState<"neural" | "gradient" | "pandas">("neural");

  // Demo A: Neural Network State
  const [x1, setX1] = useState(0.8);
  const [x2, setX2] = useState(-0.4);
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(-2.0);
  const [bias, setBias] = useState(0.3);
  const [activationType, setActivationType] = useState<"sigmoid" | "relu">("sigmoid");

  const z = Number((x1 * w1 + x2 * w2 + bias).toFixed(3));
  const sigmoid = (val: number) => 1 / (1 + Math.exp(-val));
  const relu = (val: number) => Math.max(0, val);
  const activationOut = Number(
    (activationType === "sigmoid" ? sigmoid(z) : relu(z)).toFixed(4)
  );

  // Demo B: Gradient Descent State
  // Loss function: L(w) = w^2 (minimum at w = 0, dL/dw = 2w)
  const [w, setW] = useState(4.0);
  const [learningRate, setLearningRate] = useState(0.15);
  const [history, setHistory] = useState<Array<{ step: number; w: number; loss: number; grad: number }>>([
    { step: 0, w: 4.0, loss: 16.0, grad: 8.0 },
  ]);

  const stepGradient = () => {
    const currentW = w;
    const grad = 2 * currentW;
    const nextW = Number((currentW - learningRate * grad).toFixed(3));
    const nextLoss = Number((nextW * nextW).toFixed(4));
    const nextGrad = Number((2 * nextW).toFixed(3));

    setW(nextW);
    setHistory((prev) => [
      ...prev.slice(-6),
      { step: prev.length, w: nextW, loss: nextLoss, grad: nextGrad },
    ]);
  };

  const resetGradient = () => {
    setW(4.0);
    setHistory([{ step: 0, w: 4.0, loss: 16.0, grad: 8.0 }]);
  };

  // Demo C: Pandas Data Aggregation State
  const initialData = [
    { model: "Llama-3-8B", type: "Open Source", context: 8, tokensPerSec: 110, latencyMs: 25 },
    { model: "Mistral-7B", type: "Open Source", context: 32, tokensPerSec: 125, latencyMs: 22 },
    { model: "DeepSeek-V3", type: "Open Source", context: 64, tokensPerSec: 95, latencyMs: 30 },
    { model: "Claude-3.5", type: "Proprietary", context: 200, tokensPerSec: 75, latencyMs: 45 },
    { model: "GPT-4o", type: "Proprietary", context: 128, tokensPerSec: 85, latencyMs: 40 },
    { model: "Gemini-1.5", type: "Proprietary", context: 1000, tokensPerSec: 80, latencyMs: 42 },
  ];

  const [filterType, setFilterType] = useState<"All" | "Open Source" | "Proprietary">("All");
  const [aggMetric, setAggMetric] = useState<"tokensPerSec" | "latencyMs" | "context">("tokensPerSec");

  const filteredData =
    filterType === "All"
      ? initialData
      : initialData.filter((item) => item.type === filterType);

  const avgMetric = Number(
    (
      filteredData.reduce((acc, curr) => acc + curr[aggMetric], 0) /
      filteredData.length
    ).toFixed(1)
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interaktiv Tajriba</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Ko‘rib tushun. Kod yozib o‘rgan.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Platformamizda nazariya quruq matn emas. Quyidagi mini-laboratoriyalarda parametrlarni o‘zgartiring va formulalar qanday hisoblanishini real vaqtda ko‘ring.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
          <button
            type="button"
            onClick={() => setActiveTab("neural")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "neural"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>A: Neyron Tarmog‘i (Forward Pass)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gradient")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "gradient"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>B: Gradient Descent (Optimizatsiya)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pandas")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pandas"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>C: Data Science (Pandas Aggregation)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Showcase Panel */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        {/* ================= DEMO A: NEURAL NETWORK ================= */}
        {activeTab === "neural" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                  Neyron Matematikasi
                </span>
                <h3 className="text-xl font-bold text-slate-100">
                  Chiziqli kombinatsiya va Aktivatsiya
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Formula: <code className="text-cyan-300">z = w₁x₁ + w₂x₂ + b</code>, so‘ngra <code className="text-emerald-300">y = σ(z)</code>.
                </p>
              </div>

              {/* Sliders */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Kirish x₁: <strong>{x1.toFixed(2)}</strong></span>
                    <span>Og‘irlik w₁: <strong>{w1.toFixed(2)}</strong></span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={x1}
                    onChange={(e) => setX1(parseFloat(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Kirish x₂: <strong>{x2.toFixed(2)}</strong></span>
                    <span>Og‘irlik w₂: <strong>{w2.toFixed(2)}</strong></span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={x2}
                    onChange={(e) => setX2(parseFloat(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Siljish (Bias b): <strong>{bias.toFixed(2)}</strong></span>
                    <span>Aktivatsiya turi:</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      value={bias}
                      onChange={(e) => setBias(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <select
                      value={activationType}
                      onChange={(e) => setActivationType(e.target.value as "sigmoid" | "relu")}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-750 text-slate-200 text-xs"
                    >
                      <option value="sigmoid">Sigmoid</option>
                      <option value="relu">ReLU</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-violet-950/30 border border-violet-800/40 text-xs space-y-1">
                <div className="text-violet-300 font-semibold">Hisoblash bosqichlari:</div>
                <div className="font-mono text-slate-300 text-[11px]">
                  z = ({x1.toFixed(1)} × {w1.toFixed(1)}) + ({x2.toFixed(1)} × {w2.toFixed(1)}) + ({bias.toFixed(1)}) = <strong>{z}</strong>
                </div>
                <div className="font-mono text-emerald-300 text-[11px]">
                  y = {activationType === "sigmoid" ? `1 / (1 + e^(${-z}))` : `max(0, ${z})`} = <strong>{activationOut}</strong>
                </div>
              </div>
            </div>

            {/* Right: Visual SVG Neuron Diagram */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-md h-[280px] bg-slate-950 rounded-2xl border border-slate-800 p-4 relative flex items-center justify-center">
                <svg viewBox="0 0 400 240" className="w-full h-full select-none">
                  {/* Edges from inputs to summation */}
                  <line x1="80" y1="60" x2="200" y2="120" stroke="#8b5cf6" strokeWidth={Math.max(1, Math.abs(w1) * 2)} strokeOpacity="0.7" />
                  <line x1="80" y1="180" x2="200" y2="120" stroke="#8b5cf6" strokeWidth={Math.max(1, Math.abs(w2) * 2)} strokeOpacity="0.7" />
                  <line x1="200" y1="120" x2="320" y2="120" stroke="#10b981" strokeWidth="3" strokeOpacity="0.9" />

                  {/* Input Nodes */}
                  <circle cx="80" cy="60" r="22" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                  <text x="80" y="65" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">x₁: {x1.toFixed(1)}</text>

                  <circle cx="80" cy="180" r="22" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                  <text x="80" y="185" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">x₂: {x2.toFixed(1)}</text>

                  {/* Neuron Center (Summation + Activation) */}
                  <circle cx="200" cy="120" r="34" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
                  <text x="200" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Σ: {z}</text>
                  <text x="200" y="132" textAnchor="middle" fill="#94a3b8" fontSize="9">b={bias.toFixed(1)}</text>

                  {/* Output Node */}
                  <circle cx="320" cy="120" r="26" fill="#064e3b" stroke="#10b981" strokeWidth="3" />
                  <text x="320" y="125" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">y: {activationOut}</text>
                </svg>
              </div>

              <div className="pt-3 flex items-center justify-between w-full max-w-md text-xs">
                <span className="text-slate-400">Tushuncha: Sun&apos;iy neyron (Perceptron)</span>
                <Link
                  href="/roadmap?tab=ml-engineer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>To‘liq neyron darsini ochish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ================= DEMO B: GRADIENT DESCENT ================= */}
        {activeTab === "gradient" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Controls & Numbers */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Matematik Optimizatsiya
                </span>
                <h3 className="text-xl font-bold text-slate-100">
                  Gradient Descent qadamlari
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Yo‘qotish funksiyasi: <code className="text-cyan-300">L(w) = w²</code>. Gradient: <code className="text-amber-300">dL/dw = 2w</code>.
                  Yangi parametr: <code className="text-emerald-300">w_new = w - η × (dL/dw)</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>O‘rganish tezligi (Learning Rate η):</span>
                    <strong className="text-cyan-400">{learningRate.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.4"
                    step="0.05"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Joriy og‘irlik (w)</div>
                    <div className="text-base font-bold text-slate-100">{w.toFixed(3)}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Yo‘qotish (Loss)</div>
                    <div className="text-base font-bold text-emerald-400">{(w * w).toFixed(4)}</div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={stepGradient}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Qadam bosish (Step)</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetGradient}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs transition-colors"
                    title="Qayta tiklash"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tiklash</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Quadratic Valley Curve SVG */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-md h-[280px] bg-slate-950 rounded-2xl border border-slate-800 p-4 relative flex items-center justify-center">
                <svg viewBox="-5 -1 10 18" className="w-full h-full select-none">
                  {/* Coordinate Axes */}
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#334155" strokeWidth="0.2" />
                  <line x1="0" y1="0" x2="0" y2="17" stroke="#334155" strokeWidth="0.2" />

                  {/* Parabola: L(w) = w^2 */}
                  <path
                    d="M -4 16 Q 0 -2 4 16"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="0.3"
                  />

                  {/* Global Minimum Target */}
                  <circle cx="0" cy="0" r="0.4" fill="#10b981" />

                  {/* Current Moving Parameter Dot */}
                  <circle
                    cx={Math.max(-4.5, Math.min(4.5, w))}
                    cy={Math.min(16, w * w)}
                    r="0.5"
                    fill="#f59e0b"
                    stroke="#fff"
                    strokeWidth="0.15"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              <div className="pt-3 flex items-center justify-between w-full max-w-md text-xs">
                <span className="text-slate-400">Optimizatsiya maqsadi: w = 0 (Minimum Loss)</span>
                <Link
                  href="/visual-lab/gradient-descent"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>To‘liq laboratoriyani ochish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ================= DEMO C: PANDAS DATA AGGREGATION ================= */}
        {activeTab === "pandas" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Data Science & Tahlil
                </span>
                <h3 className="text-xl font-bold text-slate-100">
                  Pandas GroupBy & Aggregatsiya
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kod ekvivalenti: <code className="text-emerald-300">df.groupby(&apos;type&apos;)[&apos;{aggMetric}&apos;].mean()</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="space-y-1.5">
                  <div className="text-slate-400 text-[11px]">Model toifasi bo‘yicha filtr:</div>
                  <div className="flex gap-2">
                    {(["All", "Open Source", "Proprietary"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFilterType(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          filterType === t
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-slate-400 text-[11px]">Tahlil metrikani tanlang:</div>
                  <div className="flex gap-2">
                    {[
                      { id: "tokensPerSec", label: "Tezlik (tok/s)" },
                      { id: "latencyMs", label: "Latency (ms)" },
                      { id: "context", label: "Kontekst (k)" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setAggMetric(m.id as any)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          aggMetric === m.id
                            ? "bg-cyan-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">O‘rtacha ko‘rsatkich:</span>
                  <span className="text-base font-bold text-emerald-400">{avgMetric} birlik</span>
                </div>
              </div>
            </div>

            {/* Right: Data Table & Bar Representation */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-md bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="text-xs font-mono text-slate-400 flex justify-between border-b border-slate-800 pb-2">
                  <span>Model</span>
                  <span>Toifa</span>
                  <span>{aggMetric}</span>
                </div>

                <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                  {filteredData.map((row) => (
                    <div
                      key={row.model}
                      className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-900/80 border border-slate-800"
                    >
                      <span className="font-semibold text-slate-200">{row.model}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                        {row.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{
                            width: `${Math.min(100, Math.max(15, row[aggMetric] * 0.7))}px`,
                          }}
                        />
                        <span className="font-mono text-emerald-300 text-right w-10">
                          {row[aggMetric]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between w-full max-w-md text-xs">
                <span className="text-slate-400">Pandas Data Analysis & Visualization</span>
                <Link
                  href="/roadmap?tab=data-scientist"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Data Science laboratoriyasini ochish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
