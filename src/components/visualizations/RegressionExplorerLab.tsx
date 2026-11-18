"use client";

import React, { useState, useMemo } from "react";
import {
  RotateCcw,
  Sliders,
  TrendingUp,
  AlertTriangle,
  Info,
  Sparkles,
  Calculator,
  CheckCircle2,
} from "lucide-react";

export interface DataPoint {
  id: number;
  x: number;
  y: number;
}

const PRESET_DATASETS: Record<string, { label: string; points: DataPoint[]; note: string }> = {
  clean: {
    label: "Toza Chiziqli (Clean Linear)",
    points: [
      { id: 1, x: 1, y: 2.2 },
      { id: 2, x: 2, y: 3.5 },
      { id: 3, x: 3, y: 4.8 },
      { id: 4, x: 4, y: 6.1 },
      { id: 5, x: 5, y: 7.4 },
      { id: 6, x: 6, y: 8.6 },
    ],
    note: "Deyarli mukammal chiziqli bog‘liqlik, qoldiqlar (residuals) minimal.",
  },
  noisy: {
    label: "Realistik Shovqinli (Moderate Noise)",
    points: [
      { id: 1, x: 1, y: 2.8 },
      { id: 2, x: 2, y: 2.9 },
      { id: 3, x: 3, y: 5.6 },
      { id: 4, x: 4, y: 5.2 },
      { id: 5, x: 5, y: 7.9 },
      { id: 6, x: 6, y: 8.1 },
      { id: 7, x: 7, y: 9.8 },
    ],
    note: "Haqiqiy tajriba ma’lumotlariga xos shovqin va dispersiya.",
  },
  outlier: {
    label: "Outlierli Holat (Extreme Outlier)",
    points: [
      { id: 1, x: 1, y: 2.0 },
      { id: 2, x: 2, y: 3.2 },
      { id: 3, x: 3, y: 4.5 },
      { id: 4, x: 4, y: 5.8 },
      { id: 5, x: 5, y: 7.0 },
      { id: 6, x: 6, y: 1.5 }, // Aniq outlier
    ],
    note: "6-nuqta (x=6, y=1.5) kuchli anomaliya. MSE kvadratik xatolik bo‘lgani uchun bu nuqta chiziqni pastga tortadi.",
  },
};

export function computeOls(points: readonly DataPoint[]): { slope: number; intercept: number } {
  const n = points.length;
  if (n < 2) return { slope: 1, intercept: 0 };
  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let num = 0;
  let den = 0;
  for (const p of points) {
    num += (p.x - meanX) * (p.y - meanY);
    den += (p.x - meanX) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = meanY - slope * meanX;
  return { slope: Number(slope.toFixed(3)), intercept: Number(intercept.toFixed(3)) };
}

export function computeRegressionMetrics(
  points: readonly DataPoint[],
  slope: number,
  intercept: number
): {
  residuals: Array<{ id: number; x: number; y: number; yHat: number; error: number; sqError: number }>;
  mse: number;
  rmse: number;
  mae: number;
  r2: number;
  ssTot: number;
  ssRes: number;
} {
  const n = points.length;
  if (n === 0) {
    return { residuals: [], mse: 0, rmse: 0, mae: 0, r2: 0, ssTot: 0, ssRes: 0 };
  }

  const meanY = points.reduce((acc, p) => acc + p.y, 0) / n;
  let ssTot = 0;
  let ssRes = 0;
  let absErrSum = 0;

  const residuals = points.map((p) => {
    const yHat = slope * p.x + intercept;
    const error = p.y - yHat;
    const sqError = error ** 2;
    ssRes += sqError;
    ssTot += (p.y - meanY) ** 2;
    absErrSum += Math.abs(error);
    return {
      id: p.id,
      x: p.x,
      y: p.y,
      yHat: Number(yHat.toFixed(2)),
      error: Number(error.toFixed(2)),
      sqError: Number(sqError.toFixed(3)),
    };
  });

  const mse = ssRes / n;
  const rmse = Math.sqrt(mse);
  const mae = absErrSum / n;
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

  return {
    residuals,
    mse: Number(mse.toFixed(4)),
    rmse: Number(rmse.toFixed(4)),
    mae: Number(mae.toFixed(4)),
    r2: Number(r2.toFixed(4)),
    ssTot: Number(ssTot.toFixed(3)),
    ssRes: Number(ssRes.toFixed(3)),
  };
}

export function RegressionExplorerLab() {
  const [datasetKey, setDatasetKey] = useState<string>("noisy");
  const points = PRESET_DATASETS[datasetKey]?.points ?? PRESET_DATASETS.noisy!.points;

  // Initial OLS fit
  const ols = useMemo(() => computeOls(points), [points]);

  const [slope, setSlope] = useState<number>(1.1);
  const [intercept, setIntercept] = useState<number>(1.2);

  const metrics = useMemo(() => {
    return computeRegressionMetrics(points, slope, intercept);
  }, [points, slope, intercept]);

  const handleResetToOls = () => {
    setSlope(ols.slope);
    setIntercept(ols.intercept);
  };

  // SVG coordinate transformation
  // x range: 0..8, y range: 0..12
  const svgWidth = 520;
  const svgHeight = 280;
  const padding = 36;
  const plotW = svgWidth - padding * 2;
  const plotH = svgHeight - padding * 2;

  const scaleX = (x: number) => padding + (x / 8) * plotW;
  const scaleY = (y: number) => svgHeight - padding - (y / 12) * plotH;

  const lineX1 = 0;
  const lineY1 = slope * lineX1 + intercept;
  const lineX2 = 8;
  const lineY2 = slope * lineX2 + intercept;

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Interaktiv Regressiya, Qoldiqlar (Residuals) va MSE Laboratoriyasi
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chiziqli regressiya modeli parametrlarini o‘zgartiring va kvadratik xatolik (MSE)
            hamda determinatsiya koeffitsiyenti ($R^2$) qanday hisoblanishini real vaqtda kuzating.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToOls}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Optimal OLS ga tiklash (w={ols.slope}, b={ols.intercept})</span>
        </button>
      </div>

      {/* Preset selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Dataset namunasi:</span>
        {Object.entries(PRESET_DATASETS).map(([key, data]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setDatasetKey(key);
              const newOls = computeOls(data.points);
              setSlope(newOls.slope);
              setIntercept(newOls.intercept);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              datasetKey === key
                ? "bg-emerald-950/80 border-emerald-400 text-emerald-200"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {data.label}
          </button>
        ))}
      </div>

      {/* Main interactive grid: Plot + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* SVG Plot (7 cols) */}
        <div className="lg:col-span-7 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Model: ŷ = {slope}x + {intercept}</span>
            <span className="text-amber-400 font-bold">MSE: {metrics.mse}</span>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto bg-slate-950/90 rounded-lg border border-slate-800/60"
          >
            {/* Grid lines */}
            {[2, 4, 6, 8, 10].map((yVal) => (
              <line
                key={`grid-y-${yVal}`}
                x1={padding}
                y1={scaleY(yVal)}
                x2={svgWidth - padding}
                y2={scaleY(yVal)}
                stroke="#334155"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            ))}
            {[2, 4, 6].map((xVal) => (
              <line
                key={`grid-x-${xVal}`}
                x1={scaleX(xVal)}
                y1={padding}
                x2={scaleX(xVal)}
                y2={svgHeight - padding}
                stroke="#334155"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={svgHeight - padding}
              x2={svgWidth - padding}
              y2={svgHeight - padding}
              stroke="#64748b"
              strokeWidth="1.5"
            />
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={svgHeight - padding}
              stroke="#64748b"
              strokeWidth="1.5"
            />

            {/* Axis labels */}
            <text x={svgWidth - padding - 10} y={svgHeight - padding + 18} fill="#94a3b8" fontSize="10" fontFamily="monospace">x</text>
            <text x={padding - 18} y={padding + 10} fill="#94a3b8" fontSize="10" fontFamily="monospace">y</text>

            {/* Residual lines (dashed from data point to regression line) */}
            {metrics.residuals.map((r) => (
              <line
                key={`res-${r.id}`}
                x1={scaleX(r.x)}
                y1={scaleY(r.y)}
                x2={scaleX(r.x)}
                y2={scaleY(r.yHat)}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            ))}

            {/* Regression Line */}
            <line
              x1={scaleX(lineX1)}
              y1={scaleY(lineY1)}
              x2={scaleX(lineX2)}
              y2={scaleY(lineY2)}
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Data Points */}
            {points.map((p) => (
              <circle
                key={`point-${p.id}`}
                cx={scaleX(p.x)}
                cy={scaleY(p.y)}
                r="5"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="2"
              />
            ))}
          </svg>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
              Dataset nuqtalari (y)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-500 inline-block" />
              Regressiya chizig‘i (ŷ)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-400 inline-block border-t border-dashed" />
              Qoldiqlar (Residuals)
            </span>
          </div>
        </div>

        {/* Controls & Metrics Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {/* Sliders */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Parametrlarni sozlash</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Nishablik / Og‘ish (w, slope):</span>
                <span className="text-emerald-400 font-bold">{slope}</span>
              </div>
              <input
                type="range"
                min="-1.5"
                max="3.0"
                step="0.05"
                value={slope}
                onChange={(e) => setSlope(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Siljish (b, intercept):</span>
                <span className="text-emerald-400 font-bold">{intercept}</span>
              </div>
              <input
                type="range"
                min="-3.0"
                max="8.0"
                step="0.1"
                value={intercept}
                onChange={(e) => setIntercept(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Computed Metrics Cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Mean Squared Error (MSE)</div>
              <div className="text-base font-black text-amber-400 font-mono mt-0.5">{metrics.mse}</div>
              <div className="text-[10px] text-slate-500">Kamayishi maqsad</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">R² Score (Determinatsiya)</div>
              <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                {(metrics.r2 * 100).toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-500">Tushuntirilgan dispersiya</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Root MSE (RMSE)</div>
              <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{metrics.rmse}</div>
              <div className="text-[10px] text-slate-500">Asl birlikdagi xato</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Mean Absolute Error (MAE)</div>
              <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{metrics.mae}</div>
              <div className="text-[10px] text-slate-500">Kvadratlanmagan qoldiq</div>
            </div>
          </div>

          {/* Math note */}
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-200">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>Matematik bog‘liqlik:</span>
            </div>
            <p>
              MSE formulasida har bir xatolik kvadratga oshiriladi:{" "}
              <code className="text-amber-300 font-mono">e_i² = (y_i - ŷ_i)²</code>. Shu sababli u
              kichik xatolarga kam, katta xatolarga (outlier) o‘ta qattiq jazo qo‘llaydi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
