"use client";

import React, { useState, useMemo, useRef } from "react";
import type { FunctionPlotConfig, PlotColor } from "@/lib/visualizations/configs";
import { compileExpression } from "@/lib/math/expression";
import { sampleFunction, niceTicks, autoRange, formatNumber } from "@/lib/math/numeric";
import { Slider } from "@/components/ui/Slider";
import { RotateCcw } from "lucide-react";

export interface FunctionPlotProps {
  config: FunctionPlotConfig;
  className?: string;
}

const COLOR_MAP: Record<PlotColor, { stroke: string; fill: string; text: string }> = {
  violet: { stroke: "#8b5cf6", fill: "rgba(139, 92, 246, 0.1)", text: "text-violet-400" },
  cyan: { stroke: "#06b6d4", fill: "rgba(6, 182, 212, 0.1)", text: "text-cyan-400" },
  amber: { stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.1)", text: "text-amber-400" },
  emerald: { stroke: "#10b981", fill: "rgba(16, 185, 129, 0.1)", text: "text-emerald-400" },
  rose: { stroke: "#f43f5e", fill: "rgba(244, 63, 94, 0.1)", text: "text-rose-400" },
  sky: { stroke: "#0284c7", fill: "rgba(2, 132, 199, 0.1)", text: "text-sky-400" },
};

const DEFAULT_COLORS: PlotColor[] = ["violet", "cyan", "amber", "emerald", "rose", "sky"];

export function FunctionPlot({ config, className = "" }: FunctionPlotProps) {
  // Parameter state initialized from config defaults
  const [params, setParams] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    config.parameters.forEach((p) => {
      initial[p.id] = p.default;
    });
    return initial;
  });

  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());
  const [hoverX, setHoverX] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Compile expressions
  const compiledExpressions = useMemo(() => {
    return config.expressions.map((exprDef) => {
      try {
        const compiled = compileExpression(exprDef.expr);
        return { ...exprDef, compiled, error: null };
      } catch (err) {
        return {
          ...exprDef,
          compiled: null,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    });
  }, [config.expressions]);

  // Sample points for each expression
  const [xMin, xMax] = config.xDomain;
  const samples = config.samples ?? 200;

  const seriesData = useMemo(() => {
    return compiledExpressions.map((item, index) => {
      const colorKey = item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]!;
      if (!item.compiled) {
        return { ...item, colorKey, points: [], fn: null };
      }
      const fn = (x: number) => item.compiled!.evaluate({ ...params, x });
      const points = sampleFunction(fn, xMin, xMax, samples);
      return { ...item, colorKey, points, fn };
    });
  }, [compiledExpressions, params, xMin, xMax, samples]);

  // Compute Y domain
  const [yMin, yMax] = useMemo(() => {
    if (config.yDomain) return config.yDomain;
    const allPoints = seriesData.flatMap((s) => s.points);
    return autoRange(allPoints, 0.15);
  }, [config.yDomain, seriesData]);

  // SVG dimensions
  const width = 640;
  const height = 360;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Scale functions
  const scaleX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const scaleY = (y: number) => padding.top + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;
  const invertX = (px: number) => xMin + ((px - padding.left) / plotWidth) * (xMax - xMin);

  // Axis ticks
  const xTicks = useMemo(() => niceTicks(xMin, xMax, 6), [xMin, xMax]);
  const yTicks = useMemo(() => niceTicks(yMin, yMax, 5), [yMin, yMax]);

  // Hover tracker
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    if (px >= padding.left && px <= width - padding.right) {
      setHoverX(invertX(px));
    } else {
      setHoverX(null);
    }
  };

  const resetParameters = () => {
    const initial: Record<string, number> = {};
    config.parameters.forEach((p) => {
      initial[p.id] = p.default;
    });
    setParams(initial);
  };

  // Build SVG Path segments
  const buildPath = (points: Array<{ x: number; y: number } | null>) => {
    let d = "";
    let inSegment = false;
    for (const pt of points) {
      if (pt === null || !Number.isFinite(pt.y) || pt.y < yMin - (yMax - yMin) * 2 || pt.y > yMax + (yMax - yMin) * 2) {
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
  };

  return (
    <div className={`flex flex-col w-full h-full text-slate-100 ${className}`}>
      {/* Legend & Expression Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 bg-slate-900/40 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          {seriesData.map((s) => {
            const isHidden = hiddenSeries.has(s.id);
            const color = COLOR_MAP[s.colorKey];
            return (
              <button
                key={s.id}
                onClick={() => {
                  const next = new Set(hiddenSeries);
                  if (next.has(s.id)) next.delete(s.id);
                  else next.add(s.id);
                  setHiddenSeries(next);
                }}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  isHidden
                    ? "opacity-40 line-through bg-slate-900 text-slate-500"
                    : "bg-slate-900/80 border border-slate-800 text-slate-200"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color.stroke }}
                />
                <span className="font-medium">{s.label}:</span>
                <span className="font-mono text-slate-400">{s.expr}</span>
              </button>
            );
          })}
        </div>

        {config.parameters.length > 0 && (
          <button
            onClick={resetParameters}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Parametrlarni tiklash</span>
          </button>
        )}
      </div>

      {/* Main SVG Plot Stage */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverX(null)}
          className="w-full max-h-[360px] select-none"
        >
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
          {yMin <= 0 && yMax >= 0 && (
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={scaleY(0)}
              y2={scaleY(0)}
              stroke="#475569"
              strokeWidth="1.5"
            />
          )}

          {/* Tick Labels */}
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

          {/* Axis Titles */}
          {config.xLabel && (
            <text
              x={width - padding.right}
              y={height - padding.bottom + 32}
              fontSize="11"
              fill="#cbd5e1"
              textAnchor="end"
            >
              {config.xLabel}
            </text>
          )}
          {config.yLabel && (
            <text
              x={padding.left}
              y={padding.top - 6}
              fontSize="11"
              fill="#cbd5e1"
              textAnchor="start"
            >
              {config.yLabel}
            </text>
          )}

          {/* Render Curve Paths */}
          {seriesData.map((s) => {
            if (hiddenSeries.has(s.id)) return null;
            const pathData = buildPath(s.points);
            const color = COLOR_MAP[s.colorKey];
            return (
              <path
                key={s.id}
                d={pathData}
                fill="none"
                stroke={color.stroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            );
          })}

          {/* Hover Crosshair & Tooltip */}
          {hoverX !== null && (
            <g>
              <line
                x1={scaleX(hoverX)}
                x2={scaleX(hoverX)}
                y1={padding.top}
                y2={height - padding.bottom}
                stroke="#38bdf8"
                strokeDasharray="2 2"
                strokeWidth="1.5"
              />
              {seriesData.map((s) => {
                if (hiddenSeries.has(s.id) || !s.fn) return null;
                const yVal = s.fn(hoverX);
                if (!Number.isFinite(yVal) || yVal < yMin || yVal > yMax) return null;
                const sx = scaleX(hoverX);
                const sy = scaleY(yVal);
                const color = COLOR_MAP[s.colorKey];
                return (
                  <circle
                    key={`hover-pt-${s.id}`}
                    cx={sx}
                    cy={sy}
                    r="4"
                    fill={color.stroke}
                    stroke="#0b0f19"
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Hover telemetry HUD */}
        {hoverX !== null && (
          <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700/80 rounded-lg p-2.5 text-xs shadow-lg font-mono">
            <div className="text-slate-400">
              x: <span className="text-white font-semibold">{formatNumber(hoverX, 3)}</span>
            </div>
            {seriesData.map((s) => {
              if (hiddenSeries.has(s.id) || !s.fn) return null;
              const yVal = s.fn(hoverX);
              const color = COLOR_MAP[s.colorKey];
              return (
                <div key={`hud-${s.id}`} className={color.text}>
                  {s.label}:{" "}
                  <span className="font-semibold">{formatNumber(yVal, 4)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Parameter Sliders */}
      {config.parameters.length > 0 && (
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {config.parameters.map((param) => (
            <Slider
              key={param.id}
              label={param.label}
              value={params[param.id] ?? param.default}
              min={param.min}
              max={param.max}
              step={param.step}
              description={param.description}
              onChange={(val) => setParams((prev) => ({ ...prev, [param.id]: val }))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
