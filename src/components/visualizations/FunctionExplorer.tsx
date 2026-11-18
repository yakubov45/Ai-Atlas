"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  SUPPORTED_FUNCTIONS,
  type FunctionId,
} from "@/lib/math/functions";
import { ParameterSlider } from "./ParameterControls";
import { FormulaDisplay } from "./FormulaDisplay";
import { RotateCcw, Crosshair, Info } from "lucide-react";

export function FunctionExplorer({ className = "" }: { className?: string }) {
  const [selectedFuncId, setSelectedFuncId] = useState<FunctionId>("quadratic");
  const funcDef = SUPPORTED_FUNCTIONS[selectedFuncId];

  // Parameter state dictionary
  const [paramState, setParamState] = useState<Record<string, Record<string, number>>>({
    linear: { a: 1.0, b: 0.0 },
    quadratic: { a: 1.0, b: -2.0, c: 1.0 },
    relu: { scale: 1.0, threshold: 0.0 },
    sigmoid: { k: 1.0, shift: 0.0 },
    tanh: { k: 1.0, shift: 0.0 },
  });

  const currentParams = paramState[selectedFuncId] ?? {};

  // Hover cursor state for coordinate inspection
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number; slope: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // View bounds
  const [xMin, xMax] = funcDef.domainDefault;
  const [yMin, yMax] = funcDef.rangeDefault;

  // Coordinate transforms
  const svgWidth = 720;
  const svgHeight = 440;
  const padding = 45;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (svgWidth - 2 * padding);
  const toSvgY = (y: number) => svgHeight - padding - ((y - yMin) / (yMax - yMin)) * (svgHeight - 2 * padding);
  const fromSvgX = (svgX: number) => xMin + ((svgX - padding) / (svgWidth - 2 * padding)) * (xMax - xMin);

  // Compute curve points
  const points = useMemo(() => {
    const pts: Array<{ x: number; y: number }> = [];
    const steps = 300;
    const dx = (xMax - xMin) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + i * dx;
      const y = funcDef.evaluate(x, currentParams);
      if (Number.isFinite(y)) {
        pts.push({ x, y });
      }
    }
    return pts;
  }, [funcDef, currentParams, xMin, xMax]);

  // Generate SVG path string
  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    let d = "";
    let isDrawing = false;

    for (let i = 0; i < points.length; i++) {
      const pt = points[i]!;
      // Clamp to SVG view box
      const sx = toSvgX(pt.x);
      const sy = toSvgY(pt.y);

      // Skip points way outside Y bounds to prevent SVG distortion
      if (pt.y < yMin - 15 || pt.y > yMax + 15) {
        isDrawing = false;
        continue;
      }

      if (!isDrawing) {
        d += `M ${sx.toFixed(1)} ${sy.toFixed(1)} `;
        isDrawing = true;
      } else {
        d += `L ${sx.toFixed(1)} ${sy.toFixed(1)} `;
      }
    }
    return d;
  }, [points, yMin, yMax]);

  // Handle pointer hover
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const normalizedSvgX = (clientX / rect.width) * svgWidth;

    if (normalizedSvgX >= padding && normalizedSvgX <= svgWidth - padding) {
      const xVal = fromSvgX(normalizedSvgX);
      const yVal = funcDef.evaluate(xVal, currentParams);
      const slope = funcDef.derivative(xVal, currentParams);
      setHoverPos({ x: xVal, y: yVal, slope });
    } else {
      setHoverPos(null);
    }
  };

  const handleParamChange = (paramId: string, val: number) => {
    setParamState((prev) => ({
      ...prev,
      [selectedFuncId]: {
        ...prev[selectedFuncId],
        [paramId]: val,
      },
    }));
  };

  const handleResetCurrent = () => {
    const defaults: Record<string, number> = {};
    funcDef.parameters.forEach((p) => {
      defaults[p.id] = p.default;
    });
    setParamState((prev) => ({
      ...prev,
      [selectedFuncId]: defaults,
    }));
  };

  // Axis grid ticks
  const xTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = Math.ceil((xMax - xMin) / 10);
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += step) {
      ticks.push(x);
    }
    return ticks;
  }, [xMin, xMax]);

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = Math.max(1, Math.round((yMax - yMin) / 6));
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += step) {
      ticks.push(y);
    }
    return ticks;
  }, [yMin, yMax]);

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  return (
    <div className={`w-full flex flex-col gap-5 ${className}`}>
      {/* Top Tab Bar: Function Selection */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(SUPPORTED_FUNCTIONS) as FunctionId[]).map((fId) => {
            const item = SUPPORTED_FUNCTIONS[fId];
            const isSelected = selectedFuncId === fId;
            return (
              <button
                key={fId}
                onClick={() => {
                  setSelectedFuncId(fId);
                  setHoverPos(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/30 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
                }`}
              >
                {item.name.split(" ")[0]}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleResetCurrent}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Parametrlarni tiklash</span>
        </button>
      </div>

      {/* Main Grid: Left Graph SVG, Right Parameters & Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Graph Display Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden p-2">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoverPos(null)}
            >
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" strokeOpacity="0.4" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect x={padding} y={padding} width={svgWidth - 2 * padding} height={svgHeight - 2 * padding} fill="url(#gridPattern)" />

              {/* Axes lines */}
              {/* X Axis */}
              {originY >= padding && originY <= svgHeight - padding && (
                <line
                  x1={padding}
                  y1={originY}
                  x2={svgWidth - padding}
                  y2={originY}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
              )}
              {/* Y Axis */}
              {originX >= padding && originX <= svgWidth - padding && (
                <line
                  x1={originX}
                  y1={padding}
                  x2={originX}
                  y2={svgHeight - padding}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
              )}

              {/* X Ticks & Labels */}
              {xTicks.map((val) => {
                const sx = toSvgX(val);
                return (
                  <g key={`x-${val}`}>
                    <line x1={sx} y1={originY - 3} x2={sx} y2={originY + 3} stroke="#64748b" strokeWidth="1" />
                    <text
                      x={sx}
                      y={Math.min(svgHeight - padding + 15, Math.max(padding - 5, originY + 16))}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Y Ticks & Labels */}
              {yTicks.map((val) => {
                if (val === 0) return null;
                const sy = toSvgY(val);
                return (
                  <g key={`y-${val}`}>
                    <line x1={originX - 3} y1={sy} x2={originX + 3} y2={sy} stroke="#64748b" strokeWidth="1" />
                    <text
                      x={Math.max(padding - 6, Math.min(svgWidth - padding + 6, originX - 8))}
                      y={sy + 3}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* The Function Curve */}
              <path d={pathD} fill="none" stroke="url(#curveGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Interactive Hover HUD Crosshair */}
              {hoverPos && (
                <g>
                  {/* Crosshair guide lines */}
                  <line
                    x1={toSvgX(hoverPos.x)}
                    y1={padding}
                    x2={toSvgX(hoverPos.x)}
                    y2={svgHeight - padding}
                    stroke="#38bdf8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />
                  <line
                    x1={padding}
                    y1={toSvgY(hoverPos.y)}
                    x2={svgWidth - padding}
                    y2={toSvgY(hoverPos.y)}
                    stroke="#38bdf8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    opacity="0.7"
                  />

                  {/* Highlight point on curve */}
                  <circle
                    cx={toSvgX(hoverPos.x)}
                    cy={toSvgY(hoverPos.y)}
                    r="5.5"
                    fill="#38bdf8"
                    stroke="#090d16"
                    strokeWidth="2"
                  />

                  {/* Floating Tooltip */}
                  <g
                    transform={`translate(${Math.min(svgWidth - 140, Math.max(padding + 10, toSvgX(hoverPos.x) + 10))}, ${Math.max(
                      padding + 10,
                      toSvgY(hoverPos.y) - 45
                    )})`}
                  >
                    <rect width="120" height="38" rx="6" fill="#0f172a" stroke="#334155" opacity="0.95" />
                    <text x="8" y="16" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      x = {hoverPos.x.toFixed(2)}
                    </text>
                    <text x="8" y="29" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      f(x) = {hoverPos.y.toFixed(2)}
                    </text>
                  </g>
                </g>
              )}
            </svg>

            {/* Bottom HUD Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900/60 border-t border-slate-800 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {hoverPos
                    ? `x = ${hoverPos.x.toFixed(2)}, f(x) = ${hoverPos.y.toFixed(2)}`
                    : "Kursor orqali egri chiziq nuqtalarini ko'ring"}
                </span>
              </div>
              {hoverPos && (
                <span className="text-[11px] text-amber-300">
                  Hosilasi f&apos;(x) = {hoverPos.slope.toFixed(3)}
                </span>
              )}
            </div>
          </div>

          {/* AI Educational Context */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-200">{funcDef.name}</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">{funcDef.description}</p>
              <p className="text-cyan-300/90 text-[11px] font-medium leading-relaxed pt-1 border-t border-slate-800/40">
                🚀 Sun&apos;iy intellektda qo&apos;llanilishi: {funcDef.aiContext}
              </p>
            </div>
          </div>
        </div>

        {/* Controls and Formulas Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Formula Display Card */}
          <FormulaDisplay
            title={funcDef.name}
            symbolic={funcDef.symbolicLatex}
            substituted={funcDef.formatFormula(currentParams)}
            derivative={`f'(x) = ${funcDef.derivative(hoverPos?.x ?? 1, currentParams).toFixed(2)} (x = ${(hoverPos?.x ?? 1).toFixed(1)})`}
            computedResult={{
              label: "f(1.0)",
              value: funcDef.evaluate(1.0, currentParams),
            }}
            context="Slayderlarni o'zgartirganingizda egri chiziq va formuladagi koeffitsiyentlar real vaqtda yangilanadi."
          />

          {/* Sliders for current function parameters */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              Parametrlarni Sozlash
            </h4>

            {funcDef.parameters.map((param) => (
              <ParameterSlider
                key={param.id}
                id={param.id}
                name={param.name}
                symbol={param.symbol}
                min={param.min}
                max={param.max}
                step={param.step}
                value={currentParams[param.id] ?? param.default}
                defaultValue={param.default}
                description={param.description}
                onChange={(val) => handleParamChange(param.id, val)}
                onReset={() => handleParamChange(param.id, param.default)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
