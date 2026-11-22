"use client";

import React, { useMemo, useState } from "react";
import type { NeuralLearnVisualId } from "@/lib/curriculum/how-neural-learn";
import { ColoredTermText } from "@/components/curriculum/ColoredTermText";
import { Lightbulb, Play, RotateCcw, Sparkles } from "lucide-react";

interface HowNeuralLearnVisualsProps {
  visualId: NeuralLearnVisualId;
}

/**
 * 12 ta mikro-dars uchun boshlang'ich o'quvchiga maksimal sodda,
 * tushunarli va interaktiv vizualizatsiyalar to'plami.
 */
export function HowNeuralLearnVisuals({ visualId }: HowNeuralLearnVisualsProps) {
  switch (visualId) {
    case "sound-neuron":
      return <SoundNeuronVisual />;
    case "activation-bend":
      return <ActivationBendVisual />;
    case "deep-vs-wide":
      return <DeepVsWideVisual />;
    case "forward-softmax":
      return <ForwardSoftmaxVisual />;
    case "loss-curve":
      return <LossCurveVisual />;
    case "chain-rule-flow":
      return <ChainRuleVisual />;
    case "backprop-vs-optimizer":
      return <BackpropVsOptimizerVisual />;
    case "gd-step":
      return <GradientDescentVisual />;
    case "learning-rate-compare":
      return <LearningRateCompareVisual />;
    case "batch-epoch":
      return <BatchEpochVisual />;
    case "overfitting-early-stop":
      return <OverfittingEarlyStopVisual />;
    case "gpu-matmul-llm":
      return <GpuMatmulLlmVisual />;
  }
}

/* -------------------------------------------------------------------------- */
/* 1. Sound Neuron (Weight & Bias)                                            */
/* -------------------------------------------------------------------------- */

function SoundNeuronVisual() {
  const [x, setX] = useState(0.5);
  const [w, setW] = useState(1.67);
  const [b, setB] = useState(-0.3);

  const z = w * x + b;
  const output = Math.max(0, z);
  const isLit = output > 0.1;

  return (
    <div className="space-y-4">
      <p className="text-xs text-neutral-300">
        <ColoredTermText text="Ovoz balandligi Input (x) sifatida kiradi. Weight (w) ovozni kuchaytiradi yoki pasaytiradi, Bias (b) esa chiroqni yoqish chegarasini belgilaydi." />
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs">
          <label className="block">
            <div className="mb-1 flex justify-between">
              <span className="text-cyan-300 font-semibold">Ovoz Input (x)</span>
              <span className="font-mono text-white">{x.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </label>
          <label className="block">
            <div className="mb-1 flex justify-between">
              <span className="text-cyan-300 font-semibold">Weight (w)</span>
              <span className="font-mono text-white">{w.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-2}
              max={3}
              step={0.05}
              value={w}
              onChange={(e) => setW(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </label>
          <label className="block">
            <div className="mb-1 flex justify-between">
              <span className="text-cyan-300 font-semibold">Bias (b)</span>
              <span className="font-mono text-white">{b.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-1.5}
              max={1.5}
              step={0.05}
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setX(0.5);
              setW(1.67);
              setB(-0.3);
            }}
            className="inline-flex items-center gap-1 rounded border border-white/15 px-2.5 py-1 text-[11px] text-neutral-300 hover:bg-white/10"
          >
            <RotateCcw className="h-3 w-3" /> Maqoladagi qiymatlar (w=1.67, b=-0.3)
          </button>
        </div>

        {/* Sxema */}
        <div className="md:col-span-2 flex flex-col justify-between rounded-xl border border-white/10 bg-[#080d17] p-4">
          <svg viewBox="0 0 540 160" className="w-full h-36">
            {/* Input */}
            <rect x="16" y="50" width="96" height="60" rx="12" fill="#0e2235" stroke="#22d3ee" strokeWidth="2" />
            <text x="64" y="76" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">Input x</text>
            <text x="64" y="96" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">{x.toFixed(2)}</text>

            {/* Edge x -> neuron */}
            <line x1="112" y1="80" x2="210" y2="80" stroke="#22d3ee" strokeWidth="3" />
            <rect x="130" y="52" width="64" height="22" rx="6" fill="#0b1524" stroke="#06b6d4" />
            <text x="162" y="67" textAnchor="middle" fill="#a5f3fc" fontSize="11">× w = {w.toFixed(2)}</text>

            {/* Neuron core */}
            <circle cx="265" cy="80" r="48" fill="#0f2922" stroke="#34d399" strokeWidth="2.5" />
            <text x="265" y="68" textAnchor="middle" fill="#6ee7b7" fontSize="11">z = w·x + b</text>
            <text x="265" y="86" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">{z.toFixed(3)}</text>
            <text x="265" y="103" textAnchor="middle" fill="#fbbf24" fontSize="10">b = {b.toFixed(2)}</text>

            {/* Arrow -> Activation */}
            <line x1="313" y1="80" x2="365" y2="80" stroke="#34d399" strokeWidth="3" />

            {/* ReLU box */}
            <rect x="368" y="48" width="152" height="64" rx="14" fill={isLit ? "#2a230a" : "#111622"} stroke={isLit ? "#facc15" : "#475569"} strokeWidth="2.5" />
            <text x="444" y="72" textAnchor="middle" fill="#a7f3d0" fontSize="11">ReLU(z) = max(0, z)</text>
            <text x="444" y="96" textAnchor="middle" fill={isLit ? "#fde047" : "#94a3b8"} fontSize="17" fontWeight="bold">
              {output.toFixed(3)} {isLit ? "💡" : "🌑"}
            </text>
          </svg>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs">
            <span className="text-neutral-300">
              Hisob: <code className="text-emerald-300">({w.toFixed(2)} × {x.toFixed(2)}) + ({b.toFixed(2)}) = {z.toFixed(3)}</code>
            </span>
            <span className={isLit ? "font-semibold text-amber-300 flex items-center gap-1" : "text-neutral-400 flex items-center gap-1"}>
              <Lightbulb className="h-3.5 w-3.5" />
              {isLit ? "Chiroq YONDI (musbat chiqish)" : "Chiroq O'CHIQ (chiqish nol)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Activation Functions (ReLU vs Sigmoid vs Tanh + Correction #4)          */
/* -------------------------------------------------------------------------- */

function ActivationBendVisual() {
  const [fn, setFn] = useState<"relu" | "sigmoid" | "tanh">("sigmoid");
  const [x, setX] = useState(0); // Default 0 -> Sigmoid(0) = 0.5 aniqligini ko'rsatadi

  const val = useMemo(() => {
    if (fn === "relu") return Math.max(0, x);
    if (fn === "sigmoid") return 1 / (1 + Math.exp(-x));
    return Math.tanh(x);
  }, [fn, x]);

  const pts = useMemo(() => {
    const arr: string[] = [];
    for (let xi = -4; xi <= 4; xi += 0.2) {
      const y =
        fn === "relu"
          ? Math.max(0, xi)
          : fn === "sigmoid"
          ? 1 / (1 + Math.exp(-xi))
          : Math.tanh(xi);
      const sx = ((xi + 4) / 8) * 440 + 40;
      const sy = fn === "relu" ? 150 - (y / 4) * 120 : fn === "sigmoid" ? 150 - y * 110 : 95 - y * 55;
      arr.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
    return arr.join(" ");
  }, [fn]);

  const dotX = ((x + 4) / 8) * 440 + 40;
  const dotY =
    fn === "relu"
      ? 150 - (val / 4) * 120
      : fn === "sigmoid"
      ? 150 - val * 110
      : 95 - val * 55;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {(["relu", "sigmoid", "tanh"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFn(k)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                fn === k
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50"
                  : "bg-white/5 text-neutral-400 border border-white/10 hover:text-white"
              }`}
            >
              {k === "relu" ? "ReLU" : k === "sigmoid" ? "Sigmoid" : "Tanh"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setFn("sigmoid");
            setX(0);
          }}
          className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/20"
        >
          x = 0 holatini tekshirish (Sigmoid(0) = 0.5)
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-white/10 bg-[#080d17] p-3">
          <svg viewBox="0 0 520 180" className="w-full h-44">
            {/* Axes */}
            <line x1="40" y1="150" x2="480" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
            <line x1="260" y1="20" x2="260" y2="165" stroke="#475569" strokeWidth="1.5" />
            <polyline fill="none" stroke="#34d399" strokeWidth="3" points={pts} />
            {/* Point */}
            <circle cx={dotX} cy={dotY} r="7" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
            <text x={dotX + 10} y={Math.max(24, dotY - 8)} fill="#fde047" fontSize="12" fontWeight="bold">
              ({x.toFixed(1)}, {val.toFixed(3)})
            </text>
            <text x="266" y="32" fill="#94a3b8" fontSize="10">x = 0 o&apos;qi</text>
          </svg>
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs">
          <label className="block">
            <div className="mb-1 flex justify-between">
              <span className="text-emerald-300 font-semibold">Kirish x</span>
              <span className="font-mono text-white">{x.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.1}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </label>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 space-y-1">
            <div className="text-neutral-400">Hozirgi natija:</div>
            <div className="font-mono text-base font-bold text-emerald-300">
              {fn.toUpperCase()}({x.toFixed(1)}) = {val.toFixed(4)}
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-300">
            <ColoredTermText
              text={
                fn === "sigmoid" && Math.abs(x) < 0.05
                  ? "Diqqat: Input = 0 va Bias = 0 bo'lsa ham Sigmoid(0) = 0.5 chiqaradi, nol emas!"
                  : fn === "relu"
                  ? "ReLU manfiy qiymatlarni 0 qiladi, musbatlarini to'g'ri chiziq bilan o'tkazadi — shuning uchun nolinear burilish beradi."
                  : "Tanh -1 dan +1 gacha simmetrik siqadi va Tanh(0) = 0."
              }
            />
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Architecture: Deep vs Wide                                              */
/* -------------------------------------------------------------------------- */

function DeepVsWideVisual() {
  const [arch, setArch] = useState<"linear" | "wide" | "deep">("deep");

  const presets = {
    linear: {
      name: "1 Qatlam (784 → 10)",
      acc: "92.40%",
      params: 7850,
      layers: [8, 10],
      desc: "Hidden Layer yo'q — faqat oddiy chiziqli chegara chizadi.",
    },
    wide: {
      name: "Keng Tarmoq (784 → 32 → 10)",
      acc: "95.58%",
      params: 25450,
      layers: [8, 6, 10],
      desc: "1 ta Hidden Layer 32 ta neyron bilan qirralar va shakllarni ajratadi.",
    },
    deep: {
      name: "Chuqur Tarmoq (784 → 64 → 32 → 10)",
      acc: "96.35%",
      params: 52650,
      layers: [8, 7, 5, 10],
      desc: "Ko'p Hidden Layer — avval chiziq, keyin halqa/burchak, so'ngra butun raqamni taniydi.",
    },
  }[arch];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["linear", "wide", "deep"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setArch(k)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              arch === k
                ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-300"
                : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
            }`}
          >
            {k === "linear" ? "Chiziqli (92.4%)" : k === "wide" ? "Wide 1-Hidden (95.58%)" : "Deep 2-Hidden (96.35%)"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-white/10 bg-[#080d17] p-3">
          <svg viewBox="0 0 520 190" className="w-full h-44">
            {presets.layers.map((count, colIdx) => {
              const totalCols = presets.layers.length;
              const cx = 60 + (colIdx * 400) / Math.max(1, totalCols - 1);
              const nextCount = presets.layers[colIdx + 1];
              const nextCx =
                colIdx + 1 < totalCols
                  ? 60 + ((colIdx + 1) * 400) / Math.max(1, totalCols - 1)
                  : 0;
              return (
                <g key={colIdx}>
                  {nextCount
                    ? Array.from({ length: count }).map((_, i) => {
                        const y1 = 95 + (i - (count - 1) / 2) * (130 / Math.max(count, 6));
                        return Array.from({ length: nextCount }).map((__, j) => {
                          const y2 = 95 + (j - (nextCount - 1) / 2) * (130 / Math.max(nextCount, 6));
                          return (
                            <line
                              key={`${i}-${j}`}
                              x1={cx}
                              y1={y1}
                              x2={nextCx}
                              y2={y2}
                              stroke={colIdx === 0 ? "#22d3ee" : "#a855f7"}
                              strokeOpacity="0.22"
                              strokeWidth="1"
                            />
                          );
                        });
                      })
                    : null}
                  {Array.from({ length: count }).map((_, i) => {
                    const cy = 95 + (i - (count - 1) / 2) * (130 / Math.max(count, 6));
                    const fill =
                      colIdx === 0
                        ? "#06b6d4"
                        : colIdx === totalCols - 1
                        ? "#10b981"
                        : "#8b5cf6";
                    return <circle key={i} cx={cx} cy={cy} r="6" fill={fill} stroke="#0f172a" strokeWidth="1.5" />;
                  })}
                  <text x={cx} y="180" textAnchor="middle" fill="#cbd5e1" fontSize="10">
                    {colIdx === 0
                      ? "Input (784)"
                      : colIdx === totalCols - 1
                      ? "Output (10)"
                      : `Hidden ${colIdx}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-2.5 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs">
          <div className="font-semibold text-white">{presets.name}</div>
          <div className="flex justify-between rounded bg-white/5 px-2.5 py-1.5">
            <span className="text-neutral-400">MNIST Aniqlik:</span>
            <span className="font-mono font-bold text-emerald-300">{presets.acc}</span>
          </div>
          <div className="flex justify-between rounded bg-white/5 px-2.5 py-1.5">
            <span className="text-neutral-400">Parametrlar (W+b):</span>
            <span className="font-mono font-bold text-cyan-300">{presets.params.toLocaleString()}</span>
          </div>
          <p className="text-neutral-300 leading-relaxed">
            <ColoredTermText text={presets.desc} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Forward Propagation & Softmax (60% misoli — Correction #1)              */
/* -------------------------------------------------------------------------- */

function ForwardSoftmaxVisual() {
  const [logits, setLogits] = useState<[number, number, number]>([1.6, 0.9, 0.4]);

  const { probs, predIdx, lossOnClass0 } = useMemo(() => {
    const maxL = Math.max(...logits);
    const exps = logits.map((l) => Math.exp(l - maxL));
    const sum = exps.reduce((a, b) => a + b, 0);
    const p = exps.map((e) => e / sum);
    const idx = p.indexOf(Math.max(...p));
    return {
      probs: p,
      predIdx: idx,
      lossOnClass0: -Math.log(Math.max(p[0] ?? 0, 1e-6)),
    };
  }, [logits]);

  const setCorrect60Preset = () => {
    // Taxminan Class 0 uchun ~60% ehtimol beruvchi logitlar
    setLogits([1.8, 0.7, 0.65]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-neutral-300">
          Haqiqiy javob: <strong className="text-emerald-300">Class 0 (&quot;Raqam 0&quot;)</strong>. Logitlarni o&apos;zgartirib Softmax va Loss qanday o&apos;zgarishini ko&apos;ring:
        </span>
        <button
          type="button"
          onClick={setCorrect60Preset}
          className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300 hover:bg-amber-500/20"
        >
          60% To&apos;g&apos;ri Javob misoli (Correction #1)
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs">
          {["Class 0 (To'g'ri)", "Class 1", "Class 2"].map((label, i) => (
            <label key={label} className="block">
              <div className="mb-1 flex justify-between">
                <span className={i === 0 ? "text-emerald-300 font-semibold" : "text-neutral-300"}>
                  Logit z{i} ({label})
                </span>
                <span className="font-mono text-white">{(logits[i] ?? 0).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={4}
                step={0.05}
                value={logits[i] ?? 0}
                onChange={(e) => {
                  const next = [...logits] as [number, number, number];
                  next[i] = Number(e.target.value);
                  setLogits(next);
                }}
                className="w-full accent-emerald-400"
              />
            </label>
          ))}
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-[#080d17] p-4 text-xs">
          <div className="font-semibold text-white">Softmax Ehtimolliklari (Jami = 100%)</div>
          {probs.map((p, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className={i === 0 ? "text-emerald-300 font-semibold" : "text-neutral-300"}>
                  Class {i} {i === 0 ? "(Target)" : ""}
                </span>
                <span className="font-mono text-white">{(p * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full transition-all ${i === 0 ? "bg-emerald-400" : "bg-cyan-500/70"}`}
                  style={{ width: `${Math.round(p * 100)}%` }}
                />
              </div>
            </div>
          ))}

          <div className="mt-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <div>
              Bashorat: <strong className={predIdx === 0 ? "text-emerald-300" : "text-rose-300"}>Class {predIdx} ({predIdx === 0 ? "To'g'ri" : "Xato"})</strong>
            </div>
            <div className="mt-1">
              Cross-Entropy Loss: <strong className="font-mono text-amber-300">{lossOnClass0.toFixed(3)}</strong>
            </div>
            <p className="mt-1 text-[11px] text-neutral-300">
              {predIdx === 0 && (probs[0] ?? 0) < 0.95
                ? "Model to'g'ri topgan bo'lsa ham Loss nol emas! Gradientlar baribir Weightlarni 100% ga yaqinlashtirish uchun yangilanadi."
                : predIdx === 0
                ? "Ishonch juda yuqori (~100%), shuning uchun Loss nolga yaqinlashdi."
                : "Bashorat xato, Loss katta — Backpropagation vaznlarni kuchli o'zgartiradi."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Loss Curve (Cross-Entropy & MSE)                                        */
/* -------------------------------------------------------------------------- */

function LossCurveVisual() {
  const [p, setP] = useState(0.09); // Maqoladagi boshlang'ich 9% holati
  const ce = -Math.log(Math.max(p, 0.01));

  const path = useMemo(() => {
    const arr: string[] = [];
    for (let x = 0.03; x <= 0.99; x += 0.02) {
      const yVal = Math.min(4, -Math.log(x));
      const sx = 40 + x * 430;
      const sy = 155 - (yVal / 4) * 130;
      arr.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
    return arr.join(" ");
  }, []);

  const dotX = 40 + p * 430;
  const dotY = 155 - (Math.min(4, ce) / 4) * 130;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-white/10 bg-[#080d17] p-3">
          <svg viewBox="0 0 510 175" className="w-full h-44">
            <line x1="40" y1="155" x2="480" y2="155" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="155" stroke="#475569" strokeWidth="1.5" />
            <polyline fill="none" stroke="#f59e0b" strokeWidth="3" points={path} />
            <circle cx={dotX} cy={dotY} r="7" fill="#34d399" stroke="#fff" strokeWidth="2" />
            <text x={Math.min(350, dotX + 10)} y={Math.max(28, dotY - 6)} fill="#fde047" fontSize="11" fontWeight="bold">
              p={(p * 100).toFixed(0)}% → Loss={ce.toFixed(2)}
            </text>
            <text x="240" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">
              To&apos;g&apos;ri javob ehtimoli (p)
            </text>
          </svg>
        </div>

        <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs">
          <label className="block">
            <div className="mb-1 flex justify-between">
              <span className="text-emerald-300 font-semibold">To&apos;g&apos;ri sinf ehtimoli p</span>
              <span className="font-mono text-white">{(p * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.99}
              step={0.01}
              value={p}
              onChange={(e) => setP(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Boshlanish 9%", val: 0.09 },
              { label: "To'g'ri 60%", val: 0.6 },
              { label: "Ishonchli 95%", val: 0.95 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => setP(b.val)}
                className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-neutral-200 hover:bg-white/15"
              >
                {b.label}
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-amber-400/20 bg-amber-500/10 p-2.5 font-mono text-amber-200">
            Loss = -ln({p.toFixed(2)}) = <strong>{ce.toFixed(3)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Derivatives & Chain Rule + Finite Difference                            */
/* -------------------------------------------------------------------------- */

function ChainRuleVisual() {
  const [x1, setX1] = useState(2);
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(3);
  const target = 4;
  const x2 = w1 * x1;
  const x3 = w2 * x2;
  const loss = (x3 - target) ** 2;
  const dLossDx3 = 2 * (x3 - target);
  const dLossDw2 = dLossDx3 * x2;
  const dLossDw1 = dLossDx3 * w2 * x1;
  const h = 0.01;
  const finiteDiffW1 = (((w2 * ((w1 + h) * x1) - target) ** 2) - loss) / h;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3 text-xs">
        <label className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="mb-1 flex justify-between"><span className="text-cyan-300">x₁ (Input)</span><span>{x1}</span></div>
          <input type="range" min={1} max={4} step={0.5} value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full accent-cyan-400" />
        </label>
        <label className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="mb-1 flex justify-between"><span className="text-cyan-300">w₁ (1-qavat)</span><span>{w1}</span></div>
          <input type="range" min={-1} max={2} step={0.1} value={w1} onChange={(e) => setW1(Number(e.target.value))} className="w-full accent-cyan-400" />
        </label>
        <label className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="mb-1 flex justify-between"><span className="text-cyan-300">w₂ (2-qavat)</span><span>{w2}</span></div>
          <input type="range" min={0.5} max={4} step={0.5} value={w2} onChange={(e) => setW2(Number(e.target.value))} className="w-full accent-cyan-400" />
        </label>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 text-xs space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2">
            <div className="text-[10px] text-emerald-300">Oldinga (Forward)</div>
            <div className="font-mono text-white">x₂ = {x2.toFixed(2)}</div>
          </div>
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/20 p-2">
            <div className="text-[10px] text-emerald-300">Bashorat (Target=4)</div>
            <div className="font-mono text-white">x₃ = {x3.toFixed(2)}</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 border border-amber-400/20 p-2">
            <div className="text-[10px] text-amber-300">Loss = (x₃-4)²</div>
            <div className="font-mono text-white">{loss.toFixed(3)}</div>
          </div>
          <div className="rounded-lg bg-amber-500/10 border border-amber-400/20 p-2">
            <div className="text-[10px] text-amber-300">∂L/∂x₃ = 2(x₃-4)</div>
            <div className="font-mono text-white">{dLossDx3.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-amber-400/25 bg-black/40 p-3">
            <div className="font-semibold text-amber-300">Chain Rule (Orqaga zanjir ko&apos;paytmasi)</div>
            <div className="mt-1 font-mono text-white">∂L/∂w₂ = (∂L/∂x₃) · x₂ = {dLossDw2.toFixed(3)}</div>
            <div className="mt-1 font-mono text-emerald-300">∂L/∂w₁ = (∂L/∂x₃) · w₂ · x₁ = <strong>{dLossDw1.toFixed(3)}</strong></div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="font-semibold text-neutral-200">Finite Difference taqqoslash (h = 0.01)</div>
            <div className="mt-1 font-mono text-neutral-300">(L(w₁+0.01) - L(w₁)) / 0.01 = <strong>{finiteDiffW1.toFixed(3)}</strong></div>
            <p className="mt-1 text-[11px] text-neutral-400">
              Ikkisi deyarli bir xil, lekin Backpropagation millionlab vaznlar uchun gradientni 1 marta hisoblaydi!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Backpropagation vs Optimizer                                            */
/* -------------------------------------------------------------------------- */

function BackpropVsOptimizerVisual() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [w, setW] = useState(2.0);
  const [grad, setGrad] = useState<number | null>(null);
  const lr = 0.25;
  const loss = (w - 0.5) ** 2;

  const advance = () => {
    if (step === 0 || step === 3) {
      setStep(1);
    } else if (step === 1) {
      setGrad(2 * (w - 0.5));
      setStep(2);
    } else if (step === 2) {
      const g = grad ?? 2 * (w - 0.5);
      setW(Number((w - lr * g).toFixed(4)));
      setStep(3);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3 text-xs">
        <div className={`rounded-xl border p-3.5 transition ${step === 1 ? "border-emerald-400 bg-emerald-500/15" : "border-white/10 bg-black/30"}`}>
          <div className="font-semibold text-emerald-300">1. Forward & Loss</div>
          <div className="mt-2 font-mono text-white">W = {w.toFixed(3)}</div>
          <div className="font-mono text-amber-300">Loss = {loss.toFixed(4)}</div>
          <div className="mt-1 text-[11px] text-neutral-400">Vazn o&apos;zgarmaydi.</div>
        </div>
        <div className={`rounded-xl border p-3.5 transition ${step === 2 ? "border-amber-400 bg-amber-500/15" : "border-white/10 bg-black/30"}`}>
          <div className="font-semibold text-amber-300">2. Backpropagation (Hisobchi)</div>
          <div className="mt-2 font-mono text-white">
            Gradient = {grad !== null ? grad.toFixed(3) : "—"}
          </div>
          <div className="mt-1 text-[11px] text-neutral-300">Faqat yo&apos;nalishni hisoblaydi — W ni O&apos;ZGARTIRMAYDI!</div>
        </div>
        <div className={`rounded-xl border p-3.5 transition ${step === 3 ? "border-violet-400 bg-violet-500/15" : "border-white/10 bg-black/30"}`}>
          <div className="font-semibold text-violet-300">3. Optimizer (Ijrochi)</div>
          <div className="mt-2 font-mono text-white">W_new = W - 0.25·Grad</div>
          <div className="mt-1 text-[11px] text-neutral-300">Aynan shu bosqich vaznni yangilaydi!</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={advance}
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-violet-500"
        >
          <Play className="h-3.5 w-3.5" />
          {step === 0 || step === 3
            ? "1-bosqich: Forward & Loss"
            : step === 1
            ? "2-bosqich: Backprop (Gradient olish)"
            : "3-bosqich: Optimizer (W yangilash)"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setW(2.0);
            setGrad(null);
          }}
          className="inline-flex items-center gap-1 rounded-lg border border-white/15 px-3 py-2 text-xs text-neutral-300 hover:bg-white/10"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Qayta boshlash
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. Gradient Descent Step                                                   */
/* -------------------------------------------------------------------------- */

function GradientDescentVisual() {
  const [w, setW] = useState(-1.5);
  const [opt, setOpt] = useState<"sgd" | "momentum" | "adam">("sgd");
  const [velocity, setVelocity] = useState(0);

  const grad = 2 * (w - 2.0); // Minimum w = 2.0
  const loss = (w - 2.0) ** 2 + 0.15;

  const stepOnce = () => {
    const lr = opt === "adam" ? 0.35 : 0.18;
    if (opt === "momentum") {
      const nextV = 0.6 * velocity + lr * grad;
      setVelocity(nextV);
      setW((prev) => Number((prev - nextV).toFixed(3)));
    } else if (opt === "adam") {
      const stepVal = lr * Math.sign(grad) * Math.min(1, Math.abs(grad) * 0.5);
      setW((prev) => Number((prev - stepVal).toFixed(3)));
    } else {
      setW((prev) => Number((prev - lr * grad).toFixed(3)));
    }
  };

  const curvePts = useMemo(() => {
    const arr: string[] = [];
    for (let xi = -2.2; xi <= 6.2; xi += 0.2) {
      const y = (xi - 2.0) ** 2 + 0.15;
      const sx = ((xi + 2.2) / 8.4) * 440 + 40;
      const sy = 155 - Math.min(18, y) * 7.2;
      arr.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
    return arr.join(" ");
  }, []);

  const clampedW = Math.max(-2.2, Math.min(6.2, w));
  const ballX = ((clampedW + 2.2) / 8.4) * 440 + 40;
  const ballY = 155 - Math.min(18, (clampedW - 2.0) ** 2 + 0.15) * 7.2;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {(["sgd", "momentum", "adam"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setOpt(m);
                setW(-1.5);
                setVelocity(0);
              }}
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                opt === m
                  ? "border-violet-400/50 bg-violet-500/20 text-violet-300"
                  : "border-white/10 bg-white/5 text-neutral-400"
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={stepOnce}
            className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
          >
            1 Qadam Tashlash →
          </button>
          <button
            type="button"
            onClick={() => {
              setW(-1.5);
              setVelocity(0);
            }}
            className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-neutral-300 hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3">
        <svg viewBox="0 0 520 175" className="w-full h-44">
          <polyline fill="none" stroke="#8b5cf6" strokeWidth="3" points={curvePts} />
          <line x1={((2 + 2.2) / 8.4) * 440 + 40} y1="20" x2={((2 + 2.2) / 8.4) * 440 + 40} y2="160" stroke="#10b981" strokeDasharray="4" />
          <circle cx={ballX} cy={ballY} r="8" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
          <text x="40" y="25" fill="#cbd5e1" fontSize="11">
            w = {w.toFixed(3)} | Loss = {loss.toFixed(3)} | Gradient = {grad.toFixed(2)}
          </text>
          <text x={((2 + 2.2) / 8.4) * 440 + 45} y="34" fill="#34d399" fontSize="10">Minimum (w=2.0)</text>
        </svg>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. Learning Rate Comparison (4 ta holat + Correction #3)                   */
/* -------------------------------------------------------------------------- */

function LearningRateCompareVisual() {
  const [lr, setLr] = useState(0.15);

  const history = useMemo(() => {
    const arr: number[] = [];
    let w = 2.0;
    for (let i = 0; i <= 10; i++) {
      arr.push(w);
      const grad = 2 * w; // Loss(w) = w^2 => min at 0
      w = w - lr * grad;
      if (Math.abs(w) > 10) break;
    }
    return arr;
  }, [lr]);

  const statusText =
    lr < 0.04
      ? "Juda kichik Learning Rate: qadam mayda bo'lgani uchun sekin tushadi (lekin to'g'ri yo'nalishda!)."
      : lr <= 0.45
      ? "Optimal Learning Rate: barqaror va tez minimumga yetib boradi."
      : lr < 1.0
      ? "Katta Learning Rate: minimum atrofida u yoqdan bu yoqqa sakraydi."
      : "Haddan tashqari katta (lr >= 1.0): xato kamayish o'rniga portlab ortib ketadi!";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {[
          { label: "Juda kichik (0.02)", val: 0.02 },
          { label: "Optimal (0.20)", val: 0.2 },
          { label: "Katta tebranish (0.85)", val: 0.85 },
          { label: "Portlash (1.15)", val: 1.15 },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setLr(p.val)}
            className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
              Math.abs(lr - p.val) < 0.01
                ? "border-violet-400/50 bg-violet-500/20 text-violet-300"
                : "border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-12 rounded-xl border border-white/10 bg-[#080d17] p-3.5 text-xs">
        <div className="sm:col-span-8">
          <div className="mb-1 text-[11px] text-neutral-400">
            10 qadamda Loss = w² qiymati (w = 2.0 dan boshlanadi):
          </div>
          <div className="flex items-end gap-1.5 h-32 pt-4">
            {history.map((wVal, idx) => {
              const l = Math.min(20, wVal * wVal);
              const hPct = Math.max(4, Math.min(100, (l / 16) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-t transition-all ${
                      l > 5 ? "bg-rose-500/80" : l < 0.3 ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                    style={{ height: `${hPct}%` }}
                    title={`Step ${idx}: Loss=${(wVal * wVal).toFixed(3)}`}
                  />
                  <span className="mt-1 text-[10px] text-neutral-400">{idx}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="sm:col-span-4 space-y-2 flex flex-col justify-between">
          <label className="block">
            <div className="flex justify-between mb-1">
              <span className="text-violet-300 font-semibold">Learning Rate (η)</span>
              <span className="font-mono text-white">{lr.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.01}
              max={1.25}
              step={0.01}
              value={lr}
              onChange={(e) => setLr(Number(e.target.value))}
              className="w-full accent-violet-400"
            />
          </label>
          <p className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-[11px] leading-relaxed text-neutral-200">
            <ColoredTermText text={statusText} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 10. Batch, Mini-Batch & Epoch                                              */
/* -------------------------------------------------------------------------- */

function BatchEpochVisual() {
  const totalSamples = 12;
  const [batchSize, setBatchSize] = useState<1 | 4 | 12>(4);
  const [stepIndex, setStepIndex] = useState(0);

  const stepsPerEpoch = totalSamples / batchSize;
  const epoch = Math.floor(stepIndex / stepsPerEpoch) + 1;
  const batchInEpoch = stepIndex % stepsPerEpoch;
  const startItem = batchInEpoch * batchSize;
  const endItem = startItem + batchSize - 1;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex gap-1.5">
          {([1, 4, 12] as const).map((bs) => (
            <button
              key={bs}
              type="button"
              onClick={() => {
                setBatchSize(bs);
                setStepIndex(0);
              }}
              className={`rounded-lg border px-2.5 py-1 font-semibold ${
                batchSize === bs
                  ? "border-violet-400/50 bg-violet-500/20 text-violet-300"
                  : "border-white/10 bg-white/5 text-neutral-300"
              }`}
            >
              {bs === 1 ? "SGD (Batch=1)" : bs === 4 ? "Mini-Batch (Batch=4)" : "Full Batch (12)"}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setStepIndex((s) => s + 1)}
          className="rounded-lg bg-violet-600 px-3 py-1.5 font-semibold text-white hover:bg-violet-500"
        >
          Keyingi Optimizer qadami →
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-4 space-y-3 text-xs">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {Array.from({ length: totalSamples }).map((_, idx) => {
            const active = idx >= startItem && idx <= endItem;
            return (
              <div
                key={idx}
                className={`rounded-lg border py-2.5 text-center font-mono font-bold transition ${
                  active
                    ? "border-emerald-400 bg-emerald-500/25 text-emerald-200 scale-105"
                    : idx < startItem
                    ? "border-white/10 bg-white/10 text-neutral-400"
                    : "border-white/5 bg-white/[0.02] text-neutral-500"
                }`}
              >
                #{idx + 1}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-neutral-200">
          <span>
            Hozirgi <strong className="text-violet-300">Epoch #{epoch}</strong> |{" "}
            <strong className="text-emerald-300">Batch {batchInEpoch + 1} / {stepsPerEpoch}</strong>
          </span>
          <span>
            1 ta Epoch = {stepsPerEpoch} ta parametr yangilash qadami
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 11. Overfitting, Regularization & Early Stopping                           */
/* -------------------------------------------------------------------------- */

function OverfittingEarlyStopVisual() {
  const [epoch, setEpoch] = useState(10);
  const [useLargeDataset, setUseLargeDataset] = useState(false);

  const trainLoss = (e: number) => 1.5 * Math.exp(-0.16 * e) + 0.04;
  const valLoss = (e: number) =>
    useLargeDataset
      ? 1.5 * Math.exp(-0.14 * e) + 0.14
      : 1.45 * Math.exp(-0.17 * e) + 0.25 + (e > 10 ? 0.042 * (e - 10) ** 1.35 : 0);

  const makePolyline = (fn: (e: number) => number) => {
    const arr: string[] = [];
    for (let e = 1; e <= 30; e++) {
      const x = 35 + ((e - 1) / 29) * 440;
      const y = 155 - Math.min(1.6, fn(e)) * 80;
      arr.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return arr.join(" ");
  };

  const curX = 35 + ((epoch - 1) / 29) * 440;
  const curTrain = trainLoss(epoch);
  const curVal = valLoss(epoch);
  const isOverfitting = !useLargeDataset && epoch > 11;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUseLargeDataset(false)}
            className={`rounded-lg border px-2.5 py-1 font-semibold ${
              !useLargeDataset
                ? "border-rose-400/50 bg-rose-500/15 text-rose-200"
                : "border-white/10 bg-white/5 text-neutral-400"
            }`}
          >
            1,000 rasm (Overfitting xavfi)
          </button>
          <button
            type="button"
            onClick={() => setUseLargeDataset(true)}
            className={`rounded-lg border px-2.5 py-1 font-semibold ${
              useLargeDataset
                ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200"
                : "border-white/10 bg-white/5 text-neutral-400"
            }`}
          >
            60,000 rasm + Regularization (95.58%)
          </button>
        </div>
        <span className="text-neutral-400">Epoch: <strong className="text-white">{epoch}</strong></span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3 space-y-2">
        <svg viewBox="0 0 500 175" className="w-full h-44">
          {!useLargeDataset ? (
            <rect
              x={35 + ((10 - 1) / 29) * 440}
              y="18"
              width={475 - (35 + ((10 - 1) / 29) * 440)}
              height="137"
              fill="#ef4444"
              fillOpacity="0.1"
            />
          ) : null}
          <polyline fill="none" stroke="#22d3ee" strokeWidth="2.5" points={makePolyline(trainLoss)} />
          <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" points={makePolyline(valLoss)} />
          <line x1={curX} y1="15" x2={curX} y2="155" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
          <text x="45" y="26" fill="#22d3ee" fontSize="10">━ Train Loss ({curTrain.toFixed(2)})</text>
          <text x="165" y="26" fill="#f59e0b" fontSize="10">━ Validation Loss ({curVal.toFixed(2)})</text>
          {!useLargeDataset ? (
            <text x={35 + ((10 - 1) / 29) * 440 + 4} y="38" fill="#fca5a5" fontSize="9">
              Early Stopping nuqtasi (Epoch ~10)
            </text>
          ) : null}
        </svg>

        <input
          type="range"
          min={1}
          max={30}
          value={epoch}
          onChange={(e) => setEpoch(Number(e.target.value))}
          className="w-full accent-emerald-400"
        />
        <div className="text-xs text-neutral-300">
          {isOverfitting ? (
            <span className="text-rose-300 font-medium">
              ⚠️ Epoch {epoch}: Model mashq rasmlarini yodlab olyapti (Train Loss tushyapti, lekin Validation Loss ko&apos;tarildi)! Early Stopping bilan Epoch 10 da to&apos;xtatish kerak edi.
            </span>
          ) : (
            <span className="text-emerald-300 font-medium">
              ✓ Epoch {epoch}: Train va Validation xatolari birgalikda tushmoqda (sog&apos;lom umumlashtirish).
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. GPU Matrix Multiplication & LLM Mode (Correction #5)                   */
/* -------------------------------------------------------------------------- */

function GpuMatmulLlmVisual() {
  const [llmMode, setLlmMode] = useState<"causal" | "masked">("causal");

  return (
    <div className="grid gap-4 md:grid-cols-2 text-xs">
      {/* GPU Matrix Multiplication */}
      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="font-semibold text-fuchsia-300 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          GPU: Parallel Matrix Multiplication
        </div>
        <div className="flex items-center justify-around rounded-lg bg-black/40 p-3 font-mono text-[11px]">
          <div className="rounded border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-2 text-center">
            <div className="text-cyan-300">Input X</div>
            <div className="text-white font-bold">(64, 784)</div>
          </div>
          <span className="text-neutral-400 font-bold">@</span>
          <div className="rounded border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-2 text-center">
            <div className="text-emerald-300">Weight W</div>
            <div className="text-white font-bold">(784, 32)</div>
          </div>
          <span className="text-neutral-400 font-bold">=</span>
          <div className="rounded border border-fuchsia-400/40 bg-fuchsia-500/10 px-2.5 py-2 text-center">
            <div className="text-fuchsia-300">Output Z</div>
            <div className="text-white font-bold">(64, 32)</div>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-neutral-300">
          <ColoredTermText text="CPU 64 ta rasmni ketma-ket hisoblaganida uzoq vaqt ketadi. GPU minglab yadrolarda Matrix Multiplication orqali barcha 64×32=2,048 ta chiqishni bir vaqtning o'zida hisoblaydi." />
        </p>
      </div>

      {/* Causal vs Masked LLM */}
      <div className="rounded-xl border border-white/10 bg-[#080d17] p-3.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-cyan-300">LLM Qanday O&apos;qitiladi?</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setLlmMode("causal")}
              className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                llmMode === "causal" ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40" : "bg-white/5 text-neutral-400"
              }`}
            >
              Causal (GPT)
            </button>
            <button
              type="button"
              onClick={() => setLlmMode("masked")}
              className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                llmMode === "masked" ? "bg-violet-500/25 text-violet-200 border border-violet-400/40" : "bg-white/5 text-neutral-400"
              }`}
            >
              Masked (BERT)
            </button>
          </div>
        </div>

        {llmMode === "causal" ? (
          <div className="space-y-2 rounded-lg bg-black/40 p-3">
            <div className="flex flex-wrap items-center gap-1.5 font-mono">
              <span className="rounded bg-white/10 px-2 py-1 text-white">Sun&apos;iy</span>
              <span className="rounded bg-white/10 px-2 py-1 text-white">intellekt</span>
              <span className="rounded bg-white/10 px-2 py-1 text-white">tezkor</span>
              <span className="text-neutral-500">→</span>
              <span className="rounded border border-cyan-400/60 bg-cyan-500/20 px-2 py-1 font-bold text-cyan-200">
                [Keyingi token: ?]
              </span>
            </div>
            <p className="text-[11px] text-neutral-300">
              <strong className="text-cyan-300">Causal Next-Token Prediction:</strong> GPT / Llama faqat chap tomondagi avvalgi tokenlarga qarab keyingi tokenni bashorat qiladi.
            </p>
          </div>
        ) : (
          <div className="space-y-2 rounded-lg bg-black/40 p-3">
            <div className="flex flex-wrap items-center gap-1.5 font-mono">
              <span className="rounded bg-white/10 px-2 py-1 text-white">Sun&apos;iy</span>
              <span className="rounded border border-violet-400/60 bg-violet-500/20 px-2 py-1 font-bold text-violet-200">
                [MASK]
              </span>
              <span className="rounded bg-white/10 px-2 py-1 text-white">tezkor</span>
              <span className="rounded bg-white/10 px-2 py-1 text-white">rivojlanmoqda</span>
            </div>
            <p className="text-[11px] text-neutral-300">
              <strong className="text-violet-300">Masked Language Modeling:</strong> BERT esa yashirilgan [MASK] tokenni ham chap, ham o&apos;ng kontekst yordamida tiklaydi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
