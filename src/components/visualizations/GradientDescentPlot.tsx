"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import type { FunctionPlotConfig } from "@/lib/visualizations/configs";
import { compileExpression } from "@/lib/math/expression";
import {
  sampleFunction,
  niceTicks,
  autoRange,
  formatNumber,
  advanceDescent,
  startDescent,
  descentStatus,
  type DescentStep,
  type DescentStatus,
} from "@/lib/math/numeric";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Badge } from "@/components/ui/Badge";
import { uz } from "@/i18n/dictionaries/uz";

export interface GradientDescentPlotProps {
  config: FunctionPlotConfig;
  className?: string;
}

export function GradientDescentPlot({ config, className = "" }: GradientDescentPlotProps) {
  const descent = config.descent!;
  const [learningRate, setLearningRate] = useState<number>(descent.learningRate.default);
  const [startX, setStartX] = useState<number>(descent.start);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Compile target loss expression
  const targetExpr = config.expressions.find((e) => e.id === descent.expression) ?? config.expressions[0]!;
  const compiled = useMemo(() => compileExpression(targetExpr.expr), [targetExpr.expr]);
  const lossFn = useMemo(() => (x: number) => compiled.evaluate({ x }), [compiled]);

  // Optimization history
  const [history, setHistory] = useState<DescentStep[]>(() => startDescent(lossFn, descent.start));

  const status: DescentStatus = useMemo(() => {
    return descentStatus(history, {
      learningRate,
      maxIterations: descent.maxIterations,
      tolerance: 1e-5,
      divergenceBound: 1e4,
    });
  }, [history, learningRate, descent.maxIterations]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;
    if (status !== "running") {
      setIsPlaying(false);
      return;
    }

    const timer = setInterval(() => {
      setHistory((prev) => {
        const next = advanceDescent(lossFn, prev, {
          learningRate,
          maxIterations: descent.maxIterations,
          tolerance: 1e-5,
          divergenceBound: 1e4,
        });
        const st = descentStatus(next, {
          learningRate,
          maxIterations: descent.maxIterations,
        });
        if (st !== "running") setIsPlaying(false);
        return next;
      });
    }, descent.stepDurationMs ?? 400);

    return () => clearInterval(timer);
  }, [isPlaying, status, lossFn, learningRate, descent.maxIterations, descent.stepDurationMs]);

  // Reset function
  const handleReset = () => {
    setIsPlaying(false);
    setHistory(startDescent(lossFn, startX));
  };

  const handleStep = () => {
    if (status === "running") {
      setHistory((prev) =>
        advanceDescent(lossFn, prev, {
          learningRate,
          maxIterations: descent.maxIterations,
        }),
      );
    }
  };

  // Sample points for loss curve
  const [xMin, xMax] = config.xDomain;
  const samples = config.samples ?? 240;
  const curvePoints = useMemo(() => sampleFunction(lossFn, xMin, xMax, samples), [lossFn, xMin, xMax, samples]);

  // Y domain
  const [yMin, yMax] = useMemo(() => {
    if (config.yDomain) return config.yDomain;
    return autoRange(curvePoints, 0.2);
  }, [config.yDomain, curvePoints]);

  // SVG scaling
  const width = 640;
  const height = 360;
  const padding = { top: 25, right: 30, bottom: 40, left: 55 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const scaleX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const scaleY = (y: number) => padding.top + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

  const xTicks = useMemo(() => niceTicks(xMin, xMax, 6), [xMin, xMax]);
  const yTicks = useMemo(() => niceTicks(yMin, yMax, 5), [yMin, yMax]);

  // SVG path for curve
  const curvePath = useMemo(() => {
    let d = "";
    let inSegment = false;
    for (const pt of curvePoints) {
      if (!pt || !Number.isFinite(pt.y)) {
        inSegment = false;
        continue;
      }
      const sx = scaleX(pt.x);
      const sy = scaleY(pt.y);
      if (!inSegment) {
        d += `M ${sx} ${sy} `;
        inSegment = true;
      } else {
        d += `L ${sx} ${sy} `;
      }
    }
    return d;
  }, [curvePoints, xMin, xMax, yMin, yMax]);

  const currentStep = history[history.length - 1]!;

  const statusBadges: Record<DescentStatus, { label: string; variant: "violet" | "cyan" | "emerald" | "amber" | "rose" }> = {
    running: { label: uz.viz.running, variant: "cyan" },
    converged: { label: uz.viz.converged, variant: "emerald" },
    diverged: { label: uz.viz.diverged, variant: "rose" },
    "max-iterations": { label: uz.viz.maxIterations, variant: "amber" },
  };

  return (
    <div className={`flex flex-col w-full h-full text-slate-100 ${className}`}>
      {/* Top Telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-4 font-mono">
          <div>
            <span className="text-slate-400">{uz.viz.iteration}: </span>
            <span className="font-semibold text-white">{currentStep.iteration}</span>
            <span className="text-slate-500"> / {descent.maxIterations}</span>
          </div>
          <div>
            <span className="text-slate-400">x: </span>
            <span className="font-semibold text-cyan-400">{formatNumber(currentStep.x, 4)}</span>
          </div>
          <div>
            <span className="text-slate-400">f(x): </span>
            <span className="font-semibold text-violet-400">{formatNumber(currentStep.y, 4)}</span>
          </div>
          <div className="hidden sm:inline">
            <span className="text-slate-400">f'(x): </span>
            <span className="font-semibold text-amber-400">{formatNumber(currentStep.gradient, 4)}</span>
          </div>
        </div>

        <Badge variant={statusBadges[status].variant}>{statusBadges[status].label}</Badge>
      </div>

      {/* Main SVG Plot */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-h-[360px] select-none">
          <defs>
            <marker
              id="descent-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#f43f5e" />
            </marker>
          </defs>

          {/* Grid lines */}
          {xTicks.map((tick) => (
            <line
              key={`x-grid-${tick}`}
              x1={scaleX(tick)}
              x2={scaleX(tick)}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="#1e293b"
              strokeDasharray="3 3"
            />
          ))}
          {yTicks.map((tick) => (
            <line
              key={`y-grid-${tick}`}
              x1={padding.left}
              x2={width - padding.right}
              y1={scaleY(tick)}
              y2={scaleY(tick)}
              stroke="#1e293b"
              strokeDasharray="3 3"
            />
          ))}

          {/* Zero Axis lines */}
          {xMin <= 0 && xMax >= 0 && (
            <line
              x1={scaleX(0)}
              x2={scaleX(0)}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="#475569"
              strokeWidth="1.5"
            />
          )}

          {/* Axis Ticks */}
          {xTicks.map((tick) => (
            <text
              key={`x-lbl-${tick}`}
              x={scaleX(tick)}
              y={height - padding.bottom + 16}
              fontSize="10"
              fill="#94a3b8"
              textAnchor="middle"
              className="font-mono"
            >
              {formatNumber(tick, 2)}
            </text>
          ))}
          {yTicks.map((tick) => (
            <text
              key={`y-lbl-${tick}`}
              x={padding.left - 8}
              y={scaleY(tick) + 3}
              fontSize="10"
              fill="#94a3b8"
              textAnchor="end"
              className="font-mono"
            >
              {formatNumber(tick, 2)}
            </text>
          ))}

          {/* Loss Curve */}
          <path
            d={curvePath}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Trajectory lines between steps */}
          {history.map((step, i) => {
            if (i === 0) return null;
            const prev = history[i - 1]!;
            const sx1 = scaleX(prev.x);
            const sy1 = scaleY(prev.y);
            const sx2 = scaleX(step.x);
            const sy2 = scaleY(step.y);
            return (
              <line
                key={`step-line-${i}`}
                x1={sx1}
                y1={sy1}
                x2={sx2}
                y2={sy2}
                stroke="#f43f5e"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                markerEnd="url(#descent-arrow)"
              />
            );
          })}

          {/* Historical points */}
          {history.map((step, i) => {
            const sx = scaleX(step.x);
            const sy = scaleY(step.y);
            const isLast = i === history.length - 1;
            return (
              <circle
                key={`step-pt-${i}`}
                cx={sx}
                cy={sy}
                r={isLast ? 6 : 3.5}
                fill={isLast ? "#38bdf8" : "#f43f5e"}
                stroke="#0b0f19"
                strokeWidth="2"
                className="transition-all"
              />
            );
          })}
        </svg>
      </div>

      {/* Bottom Controls Bar */}
      <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            disabled={status !== "running" && !isPlaying}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? uz.viz.pause : uz.viz.play}</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            disabled={status !== "running" || isPlaying}
            onClick={handleStep}
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>{uz.viz.stepForward}</span>
          </Button>

          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{uz.viz.reset}</span>
          </Button>
        </div>

        {/* Sliders: Learning Rate & Start X */}
        <div className="flex-1 max-w-md w-full grid grid-cols-2 gap-4">
          <Slider
            label={uz.viz.learningRate}
            value={learningRate}
            min={descent.learningRate.min}
            max={descent.learningRate.max}
            step={descent.learningRate.step}
            onChange={(val) => {
              setLearningRate(val);
              handleReset();
            }}
          />

          <Slider
            label={uz.viz.startPoint}
            value={startX}
            min={xMin + 0.5}
            max={xMax - 0.5}
            step={0.1}
            onChange={(val) => {
              setStartX(val);
              setIsPlaying(false);
              setHistory(startDescent(lossFn, val));
            }}
          />
        </div>
      </div>
    </div>
  );
}
