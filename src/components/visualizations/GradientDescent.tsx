"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  createInitialGdState,
  stepGradientDescent,
  resetGradientDescent,
  computeLoss,
  GD_PRESETS,
  TARGET_MINIMUM,
  type GradientDescentState,
} from "@/lib/math/gradient-descent";
import { ParameterSlider } from "./ParameterControls";
import { FormulaDisplay } from "./FormulaDisplay";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info,
} from "lucide-react";

export function GradientDescent({ className = "" }: { className?: string }) {
  const [learningRate, setLearningRate] = useState<number>(0.25);
  const [initialX, setInitialX] = useState<number>(7.0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [state, setState] = useState<GradientDescentState>(() =>
    createInitialGdState(7.0, 0.25)
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // SVG coordinate bounds
  const svgWidth = 720;
  const svgHeight = 440;
  const padding = 45;

  const xMin = 0.0;
  const xMax = 8.0;
  const yMin = 0.0;
  const yMax = 22.0;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding);
  const toSvgY = (y: number) => svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);

  // Generate Loss parabola path
  const curvePath = useMemo(() => {
    let d = "";
    const samples = 180;
    const dx = (xMax - xMin) / samples;
    for (let i = 0; i <= samples; i++) {
      const x = xMin + i * dx;
      const y = computeLoss(x);
      const sx = toSvgX(x);
      const sy = toSvgY(Math.min(yMax, y));
      if (i === 0) d += `M ${sx.toFixed(1)} ${sy.toFixed(1)} `;
      else d += `L ${sx.toFixed(1)} ${sy.toFixed(1)} `;
    }
    return d;
  }, []);

  // Timer loop for auto-running steps
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.status === "converged" || prev.status === "diverged") {
            setIsRunning(false);
            return prev;
          }
          if (prev.iteration >= 50) {
            setIsRunning(false);
            return prev;
          }
          return stepGradientDescent(prev, learningRate);
        });
      }, 350);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, learningRate]);

  const handleStartPause = () => {
    if (state.status === "converged" || state.status === "diverged") {
      // If finished, reset first then start
      const fresh = resetGradientDescent(initialX, learningRate);
      setState(fresh);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleSingleStep = () => {
    setIsRunning(false);
    setState((prev) => stepGradientDescent(prev, learningRate));
  };

  const handleReset = () => {
    setIsRunning(false);
    setState(resetGradientDescent(initialX, learningRate));
  };

  const handlePresetSelect = (presetLr: number, presetId?: string) => {
    setIsRunning(false);
    const nextInitX = presetId === "namuna" ? 0.0 : initialX;
    if (presetId === "namuna") {
      setInitialX(0.0);
    }
    setLearningRate(presetLr);
    setState(resetGradientDescent(nextInitX, presetLr));
  };

  const handleInitialXChange = (val: number) => {
    setInitialX(val);
    if (!isRunning) {
      setState(resetGradientDescent(val, learningRate));
    }
  };

  // Status badges
  const renderStatusBadge = () => {
    switch (state.status) {
      case "converged":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Optimumga erishildi (x = {state.x.toFixed(3)})
          </span>
        );
      case "overshooting":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            Overshoot (Minimumdan o&apos;tib ketish)
          </span>
        );
      case "diverged":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-600/50 text-rose-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Tarqalish (Divergence / Gradient portlashi)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
            Iteratsiya: {state.iteration}
          </span>
        );
    }
  };

  return (
    <div className={`w-full flex flex-col gap-5 ${className}`}>
      {/* Top Presets Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1 mr-1">
            Rejimlar:
          </span>
          {GD_PRESETS.map((preset) => {
            const isSelected = Math.abs(learningRate - preset.learningRate) < 1e-4;
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.learningRate, preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/30 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {renderStatusBadge()}
      </div>

      {/* Main Grid: Left Parabola SVG, Right Controls & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (7 cols): Loss Curve & Optimization Animation */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden p-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
              <defs>
                <linearGradient id="parabolaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 2, 4, 6, 8].map((gx) => (
                <line
                  key={`gx-${gx}`}
                  x1={toSvgX(gx)}
                  y1={padding}
                  x2={toSvgX(gx)}
                  y2={svgHeight - padding}
                  stroke="#1e293b"
                  strokeWidth="0.8"
                />
              ))}
              {[0, 5, 10, 15, 20].map((gy) => (
                <line
                  key={`gy-${gy}`}
                  x1={padding}
                  y1={toSvgY(gy)}
                  x2={svgWidth - padding}
                  y2={toSvgY(gy)}
                  stroke="#1e293b"
                  strokeWidth="0.8"
                />
              ))}

              {/* Axes */}
              <line
                x1={padding}
                y1={toSvgY(0)}
                x2={svgWidth - padding}
                y2={toSvgY(0)}
                stroke="#475569"
                strokeWidth="1.5"
              />
              <line
                x1={toSvgX(0)}
                y1={padding}
                x2={toSvgX(0)}
                y2={svgHeight - padding}
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Axis labels */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tick) => (
                <text
                  key={`tx-${tick}`}
                  x={toSvgX(tick)}
                  y={toSvgY(0) + 16}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {tick}
                </text>
              ))}

              {[0, 5, 10, 15, 20].map((tick) => (
                <text
                  key={`ty-${tick}`}
                  x={toSvgX(0) - 8}
                  y={toSvgY(tick) + 3}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {tick}
                </text>
              ))}

              {/* Loss Curve */}
              <path d={curvePath} fill="none" stroke="url(#parabolaGradient)" strokeWidth="3" />

              {/* Target Minimum Flag at x = 3.0 */}
              <circle cx={toSvgX(TARGET_MINIMUM)} cy={toSvgY(0)} r="5" fill="#10b981" />
              <text
                x={toSvgX(TARGET_MINIMUM)}
                y={toSvgY(0) + 28}
                fill="#34d399"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                Minimum (x = 3.0)
              </text>

              {/* History Trajectory Dots & Lines */}
              {state.history.slice(0, -1).map((h, idx) => {
                const nextH = state.history[idx + 1];
                return (
                  <g key={`hist-${idx}`}>
                    <circle
                      cx={toSvgX(h.x)}
                      cy={toSvgY(Math.min(yMax, Math.max(0, h.loss)))}
                      r="3.5"
                      fill="#64748b"
                      opacity="0.8"
                    />
                    {nextH && (
                      <line
                        x1={toSvgX(h.x)}
                        y1={toSvgY(Math.min(yMax, Math.max(0, h.loss)))}
                        x2={toSvgX(nextH.x)}
                        y2={toSvgY(Math.min(yMax, Math.max(0, nextH.loss)))}
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                        opacity="0.6"
                      />
                    )}
                  </g>
                );
              })}

              {/* Current Point Dot with Gradient Arrow */}
              {Number.isFinite(state.x) && (
                <g>
                  {/* Tangent Line Preview */}
                  <line
                    x1={toSvgX(state.x - 0.6)}
                    y1={toSvgY(Math.min(yMax, Math.max(0, state.loss - 0.6 * state.gradient)))}
                    x2={toSvgX(state.x + 0.6)}
                    y2={toSvgY(Math.min(yMax, Math.max(0, state.loss + 0.6 * state.gradient)))}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Optimization Point */}
                  <circle
                    cx={toSvgX(state.x)}
                    cy={toSvgY(Math.min(yMax, Math.max(0, state.loss)))}
                    r="7"
                    fill="#38bdf8"
                    stroke="#090d16"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  />

                  {/* Gradient Direction Indicator */}
                  <line
                    x1={toSvgX(state.x)}
                    y1={toSvgY(Math.min(yMax, Math.max(0, state.loss)))}
                    x2={toSvgX(state.x + state.deltaX)}
                    y2={toSvgY(Math.min(yMax, Math.max(0, state.loss)))}
                    stroke="#ec4899"
                    strokeWidth="2.5"
                  />
                </g>
              )}
            </svg>

            {/* Step Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/80 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartPause}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md transition-colors"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pauza</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Boshlash</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSingleStep}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <StepForward className="w-4 h-4" />
                  <span>1 Qadam</span>
                </button>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta boshlash</span>
                </button>
              </div>

              <div className="font-mono text-xs text-slate-400">
                <span>Qadam kattaligi Δx = </span>
                <span className="font-bold text-cyan-300">
                  {state.deltaX >= 0 ? `+${state.deltaX.toFixed(3)}` : state.deltaX.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-200">Gradient Tushish Asosiy Qoidasi</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Gradient musbat bo&apos;lganda funksiya o&apos;sayotgan bo&apos;ladi, shuning uchun parametr kamaytiriladi (chapga yuriladi). Gradient manfiy bo&apos;lganda esa parametr oshiriladi (o&apos;ngga yuriladi).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Controls & Telemetry Calculations */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Formula Display Card */}
          <FormulaDisplay
            title="Gradient Tushish Yangilanish Formulasi"
            symbolic="x_{t+1} = x_t - \alpha \cdot \frac{dL}{dx}"
            substituted={`x_{${state.iteration + 1}} = ${state.x.toFixed(2)} - (${learningRate.toFixed(2)} · ${state.gradient.toFixed(2)}) = ${(
              state.x + state.deltaX
            ).toFixed(3)}`}
            derivative={`L'(x) = 2(x - 3) = 2(${state.x.toFixed(2)} - 3) = ${state.gradient.toFixed(2)}`}
            computedResult={{
              label: "L(x)",
              value: state.loss,
            }}
            context={`O'rganish tezligi α = ${learningRate.toFixed(2)}. ${
              learningRate > 1.0
                ? "DIQQAT: α > 1.0 bo'lgani uchun gradient tushish har qadamda yiroqlashadi!"
                : learningRate > 0.8
                ? "α juda katta bo'lgani sababli tebranishlar kuzatiladi."
                : "Optimal tezlik minimumga barqaror yaqinlashtiradi."
            }`}
          />

          {/* Parameter Sliders */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              Giperparametrlarni Sozlash
            </h4>

            <ParameterSlider
              id="lr"
              name="O'rganish Tezligi (Learning Rate η)"
              symbol="η"
              min={0.0}
              max={1.2}
              step={0.01}
              value={learningRate}
              defaultValue={0.25}
              description="Har bir iteratsiyada gradient yo'nalishida qo'yiladigan qadamning kattaligi (0…1.2)."
              onChange={(val) => {
                setLearningRate(val);
                if (!isRunning) {
                  setState((prev) => ({ ...prev, learningRate: val }));
                }
              }}
            />

            <ParameterSlider
              id="initX"
              name="Boshlang'ich Nuqta (w_start / x₀)"
              symbol="w₀"
              min={-5.0}
              max={10.0}
              step={0.5}
              value={initialX}
              defaultValue={7.0}
              description="Optimizatsiya boshlanadigan w (yoki x) parametrning dastlabki qiymati (−5…10)."
              onChange={handleInitialXChange}
            />
          </div>

          {/* Step History Log */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span>Iteratsiyalar Tarixi</span>
              <span className="text-[11px] font-mono text-slate-500">
                {state.history.length} qadam
              </span>
            </h4>
            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 font-mono text-[11px]">
              {state.history.map((h) => (
                <div
                  key={h.iteration}
                  className={`flex items-center justify-between px-2 py-1 rounded ${
                    h.iteration === state.iteration
                      ? "bg-violet-950/60 text-violet-200 border border-violet-800/40"
                      : "text-slate-400 hover:bg-slate-800/50"
                  }`}
                >
                  <span>t={h.iteration}</span>
                  <span>x={h.x.toFixed(2)}</span>
                  <span className="text-rose-400">L={h.loss.toFixed(3)}</span>
                  <span className="text-cyan-400">g={h.gradient.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
