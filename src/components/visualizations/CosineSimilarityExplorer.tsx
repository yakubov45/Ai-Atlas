"use client";

import React, { useState, useMemo } from "react";
import {
  analyzeVectorPair,
  generateCosinePythonCode,
} from "@/lib/math/cosine-similarity";
import { FormulaDisplay } from "./FormulaDisplay";
import {
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Code2,
  Check,
  Copy,
  Compass,
} from "lucide-react";

export interface CosineSimilarityExplorerProps {
  className?: string;
}

export function CosineSimilarityExplorer({
  className = "",
}: CosineSimilarityExplorerProps) {
  // Default matches AI_Engineer_Micro_Lesson_Namuna.md: A = (1, 0), B = (1, 1) -> cos ≈ 0.7071 (45°)
  const [ax, setAx] = useState<number>(1.0);
  const [ay, setAy] = useState<number>(0.0);
  const [bx, setBx] = useState<number>(1.0);
  const [by, setBy] = useState<number>(1.0);
  const [unlockA, setUnlockA] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(
    () => analyzeVectorPair([ax, ay], [bx, by]),
    [ax, ay, bx, by],
  );

  const pythonSnippet = useMemo(
    () => generateCosinePythonCode([ax, ay], [bx, by]),
    [ax, ay, bx, by],
  );

  const applyPreset = (newAx: number, newAy: number, newBx: number, newBy: number) => {
    setAx(newAx);
    setAy(newAy);
    setBx(newBx);
    setBy(newBy);
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(pythonSnippet).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  // SVG Coordinate mapping: range [-3, 3] -> [0, 360], center = (180, 180), scale = 50px per unit
  const center = 180;
  const scale = 50;
  const toSvgX = (x: number) => center + x * scale;
  const toSvgY = (y: number) => center - y * scale;

  const aEndX = toSvgX(ax);
  const aEndY = toSvgY(ay);
  const bEndX = toSvgX(bx);
  const bEndY = toSvgY(by);

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Top Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5 mr-1">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Namuna holatlar (12.07):</span>
          </span>
          <button
            type="button"
            onClick={() => applyPreset(1, 0, 1, 1)}
            className="px-3 py-1.5 rounded-xl bg-violet-600/25 hover:bg-violet-600/40 text-violet-200 border border-violet-500/40 font-mono cursor-pointer"
          >
            45°: A=(1,0), C=(1,1) → 0.7071
          </button>
          <button
            type="button"
            onClick={() => applyPreset(1, 0, 0, 1)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono cursor-pointer"
          >
            90° (Tik): B=(0,1) → 0.0000
          </button>
          <button
            type="button"
            onClick={() => applyPreset(2, 0, -3, 0)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono cursor-pointer"
          >
            180° (Qarama-qarshi): A=(2,0), B=(-3,0) → -1
          </button>
          <button
            type="button"
            onClick={() => applyPreset(1, 0, 0, 0)}
            className="px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-950/70 text-rose-300 border border-rose-800/50 font-mono cursor-pointer"
          >
            Nol vektor: B=(0,0) → Xato!
          </button>
        </div>

        <button
          type="button"
          onClick={() => applyPreset(1, 0, 1, 1)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Zero-Vector Explicit Mathematical Warning */}
      {result.isZeroVectorError && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/60 text-rose-200 flex items-start gap-3 text-xs sm:text-sm"
        >
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-rose-300">
              Matematik cheklov: Nol vektor uchun Cosine Similarity aniqlanmagan!
            </div>
            <p className="text-rose-200/90 leading-relaxed">
              {result.errorMessage} Maxrajdagi{" "}
              <code className="font-mono bg-rose-950 px-1.5 py-0.5 rounded">
                ||A|| × ||B|| = {result.normA.toFixed(2)} × {result.normB.toFixed(2)} = 0
              </code>{" "}
              bo‘lib qoldi. Dasturiy kodda bunday holatda <code className="font-mono">ValueError</code> qaytarilishi shart.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 2D Vector SVG Plane + Sliders */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Interactive 2D Coordinate SVG */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 shrink-0">
              <svg
                viewBox="0 0 360 360"
                className="w-[290px] h-[290px] sm:w-[320px] sm:h-[320px]"
                role="img"
                aria-label="2D Vektorlar va Cosine Similarity tekisligi"
              >
                <defs>
                  <marker
                    id="arrow-a"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#22d3ee" />
                  </marker>
                  <marker
                    id="arrow-b"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
                  </marker>
                </defs>

                {/* Grid lines */}
                {[-3, -2, -1, 0, 1, 2, 3].map((unit) => {
                  const pos = center + unit * scale;
                  return (
                    <g key={unit}>
                      <line
                        x1={pos}
                        y1={15}
                        x2={pos}
                        y2={345}
                        stroke={unit === 0 ? "#475569" : "#1e293b"}
                        strokeWidth={unit === 0 ? 1.5 : 1}
                      />
                      <line
                        x1={15}
                        y1={pos}
                        x2={345}
                        y2={pos}
                        stroke={unit === 0 ? "#475569" : "#1e293b"}
                        strokeWidth={unit === 0 ? 1.5 : 1}
                      />
                      {unit !== 0 && (
                        <>
                          <text
                            x={pos}
                            y={center + 14}
                            textAnchor="middle"
                            className="fill-slate-500 text-[9px] font-mono"
                          >
                            {unit}
                          </text>
                          <text
                            x={center - 10}
                            y={center - unit * scale + 3}
                            textAnchor="end"
                            className="fill-slate-500 text-[9px] font-mono"
                          >
                            {unit}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Unit circle dashed reference */}
                <circle
                  cx={center}
                  cy={center}
                  r={scale}
                  fill="none"
                  stroke="#334155"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />

                {/* Vector A (Cyan) */}
                {(ax !== 0 || ay !== 0) && (
                  <g>
                    <line
                      x1={center}
                      y1={center}
                      x2={aEndX}
                      y2={aEndY}
                      stroke="#22d3ee"
                      strokeWidth={3.5}
                      markerEnd="url(#arrow-a)"
                    />
                    <text
                      x={aEndX + (ax >= 0 ? 8 : -8)}
                      y={aEndY + (ay >= 0 ? -8 : 14)}
                      className="fill-cyan-300 text-[11px] font-mono font-bold"
                    >
                      A({ax.toFixed(1)}, {ay.toFixed(1)})
                    </text>
                  </g>
                )}

                {/* Vector B (Violet) */}
                {(bx !== 0 || by !== 0) ? (
                  <g>
                    <line
                      x1={center}
                      y1={center}
                      x2={bEndX}
                      y2={bEndY}
                      stroke="#a855f7"
                      strokeWidth={3.5}
                      markerEnd="url(#arrow-b)"
                    />
                    <text
                      x={bEndX + (bx >= 0 ? 8 : -48)}
                      y={bEndY + (by >= 0 ? -8 : 14)}
                      className="fill-violet-300 text-[11px] font-mono font-bold"
                    >
                      B({bx.toFixed(1)}, {by.toFixed(1)})
                    </text>
                  </g>
                ) : (
                  <circle cx={center} cy={center} r={6} fill="#f43f5e" />
                )}
              </svg>
            </div>

            {/* Sliders for B=(x, y) and optional A=(x, y) */}
            <div className="flex-1 w-full space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/90 border border-violet-500/30 space-y-3">
                <div className="text-xs font-bold text-violet-300">
                  Vektor B = ({bx.toFixed(1)}, {by.toFixed(1)}) slayderlari
                </div>

                <label className="block space-y-1 text-xs">
                  <div className="flex justify-between font-mono text-slate-300">
                    <span>b₁ (X o‘qi):</span>
                    <span className="text-violet-300 font-bold">{bx.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min={-3.0}
                    max={3.0}
                    step={0.5}
                    value={bx}
                    onChange={(e) => setBx(parseFloat(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                </label>

                <label className="block space-y-1 text-xs">
                  <div className="flex justify-between font-mono text-slate-300">
                    <span>b₂ (Y o‘qi):</span>
                    <span className="text-violet-300 font-bold">{by.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min={-3.0}
                    max={3.0}
                    step={0.5}
                    value={by}
                    onChange={(e) => setBy(parseFloat(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                </label>
              </div>

              {/* Vector A Controls */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 font-mono">
                    Vektor A = ({ax.toFixed(1)}, {ay.toFixed(1)})
                  </span>
                  <button
                    type="button"
                    onClick={() => setUnlockA((p) => !p)}
                    className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    {unlockA ? "A=(1,0) qilib qulflash" : "A vektorni ham o‘zgartirish"}
                  </button>
                </div>

                {unlockA && (
                  <div className="space-y-2 pt-1">
                    <label className="block space-y-1">
                      <span className="font-mono text-slate-400">a₁ (X): {ax.toFixed(1)}</span>
                      <input
                        type="range"
                        min={-3.0}
                        max={3.0}
                        step={0.5}
                        value={ax}
                        onChange={(e) => setAx(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="font-mono text-slate-400">a₂ (Y): {ay.toFixed(1)}</span>
                      <input
                        type="range"
                        min={-3.0}
                        max={3.0}
                        step={0.5}
                        value={ay}
                        onChange={(e) => setAy(parseFloat(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Dot Product (A·B)</div>
              <div className="text-base font-bold text-slate-100 mt-0.5">
                {result.dotProduct.toFixed(2)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Norm ||A|| va ||B||</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">
                {result.normA.toFixed(2)} | {result.normB.toFixed(2)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Burchak (θ)</div>
              <div className="text-base font-bold text-amber-300 mt-0.5">
                {result.angleDegrees !== null ? `${result.angleDegrees.toFixed(1)}°` : "Aniqlanmagan"}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-700/50">
              <div className="text-emerald-300 text-[10px]">Cosine Similarity</div>
              <div className="text-base font-extrabold text-emerald-400 mt-0.5">
                {result.cosine !== null ? result.cosine.toFixed(4) : "XATO (0/0)"}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Illustrativ misol (Phase 12.07):</strong> Bu 2D geometrik vektorlar real LLM embedding modelidan olinmagan. Maqsad — dot product, vektor normi va burchak kosinusi qanday hisoblanishini aniq raqamlarda ko‘rsatish.
            </span>
          </div>
        </div>

        {/* Right: Formula Breakdown & Live Python Code */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <FormulaDisplay
            title="Cosine Similarity (12.07)"
            symbolic="\cos(A, B) = \frac{A \cdot B}{\|A\| \cdot \|B\|}"
            substituted={`\\frac{(${ax}\\times${bx} + ${ay}\\times${by})}{${result.normA.toFixed(3)} \\times ${result.normB.toFixed(3)}} = \\frac{${result.dotProduct.toFixed(2)}}{${(result.normA * result.normB).toFixed(4)}}`}
            computedResult={{
              label: "cos(A, B)",
              value: result.cosine !== null ? result.cosine.toFixed(4) : "Aniqlanmagan",
            }}
            context="1.0 = bir xil yo'nalish (0°), 0.0 = tik/ortogonal (90°), -1.0 = qarama-qarshi yo'nalish (180°). Vektor uzunligi o'zgarsa ham yo'nalish bir xil bo'lsa cosine o'zgarmaydi."
          />

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Python kodi (12.07 Master namuna)</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Nusxa olindi</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Nusxalash</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <code>{pythonSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
