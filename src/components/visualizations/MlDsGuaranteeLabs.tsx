"use client";

import React, { useState, useMemo } from "react";
import {
  computeClassificationMetrics,
  computeConfusionMatrixFromThreshold,
  computeCupedSampleAdjustment,
  computeDeltaMethodRatio,
  evaluateAbExperiment,
  simulateCltSampling,
  SYNTHETIC_BINARY_PREDICTIONS,
  SYNTHETIC_CTR_USER_UNITS,
  type CltDistributionShape,
} from "@/lib/math/ml-ds-labs";
import { FormulaDisplay } from "./FormulaDisplay";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  FlaskConical,
  Percent,
  RotateCcw,
  Sliders,
  Sparkles,
} from "lucide-react";

export type MlDsGuaranteeLabTab =
  | "cuped-deep-dive"
  | "clt-simulator"
  | "delta-method-ratio"
  | "confusion-matrix"
  | "ab-cuped";

export function ConfusionMatrixExplorer({
  initialMode = "confusion-matrix",
}: {
  initialMode?: MlDsGuaranteeLabTab;
}) {
  const [labTab, setLabTab] = useState<MlDsGuaranteeLabTab>(initialMode);

  // 1. CUPED 8-Observation Deep-Dive State (`Data_Scientist_Micro_Lesson_AB_CUPED.md`)
  const [cupedLiftDelta, setCupedLiftDelta] = useState<number>(0);
  const [cupedCovariateShift, setCupedCovariateShift] = useState<number>(0);
  const [forceZeroVarX, setForceZeroVarX] = useState<boolean>(false);

  const cupedSample = useMemo(
    () =>
      computeCupedSampleAdjustment(undefined, {
        treatmentLiftDelta: cupedLiftDelta,
        treatmentCovariateShift: cupedCovariateShift,
        forceZeroVarianceX: forceZeroVarX,
      }),
    [cupedLiftDelta, cupedCovariateShift, forceZeroVarX],
  );

  // 2. CLT Monte Carlo Simulator State (`dsx-07-c013`)
  const [cltShape, setCltShape] = useState<CltDistributionShape>("skewed-right");
  const [cltSampleSize, setCltSampleSize] = useState<number>(16);
  const [cltNumDraws, setCltNumDraws] = useState<number>(120);

  const cltResult = useMemo(
    () =>
      simulateCltSampling({
        shape: cltShape,
        sampleSize: cltSampleSize,
        numDraws: cltNumDraws,
      }),
    [cltShape, cltSampleSize, cltNumDraws],
  );

  // 3. Ratio Metrics & Delta Method State (`dsx-14-c011`)
  const [includeZeroDenomUser, setIncludeZeroDenomUser] = useState<boolean>(false);
  const [clickMultiplier, setClickMultiplier] = useState<number>(1.0);

  const deltaMethodResult = useMemo(() => {
    const units = SYNTHETIC_CTR_USER_UNITS.map((u, idx) => ({
      unitId: u.unitId,
      numerator: Math.round(u.numerator * clickMultiplier),
      denominator: includeZeroDenomUser && idx === 4 ? 0 : u.denominator,
    }));
    return computeDeltaMethodRatio(units);
  }, [includeZeroDenomUser, clickMultiplier]);

  // 4. Confusion Matrix State (`mlds-19-03`)
  const [inputMode, setInputMode] = useState<"threshold" | "manual">("threshold");
  const [threshold, setThreshold] = useState<number>(0.5);
  const [manualTp, setManualTp] = useState<number>(5);
  const [manualFp, setManualFp] = useState<number>(1);
  const [manualFn, setManualFn] = useState<number>(1);
  const [manualTn, setManualTn] = useState<number>(5);

  const counts = useMemo(() => {
    if (inputMode === "threshold") {
      return computeConfusionMatrixFromThreshold(threshold);
    }
    return {
      tp: manualTp,
      fp: manualFp,
      fn: manualFn,
      tn: manualTn,
    };
  }, [inputMode, threshold, manualTp, manualFp, manualFn, manualTn]);

  const metrics = useMemo(
    () => computeClassificationMetrics(counts),
    [counts],
  );

  // 5. A/B Experiment + CUPED State (`mlds-14-01`)
  const [controlN, setControlN] = useState<number>(2000);
  const [controlX, setControlX] = useState<number>(200);
  const [treatmentN, setTreatmentN] = useState<number>(2000);
  const [treatmentX, setTreatmentX] = useState<number>(236);
  const [cupedRho, setCupedRho] = useState<number>(0.65);

  const abResult = useMemo(
    () =>
      evaluateAbExperiment({
        controlVisitors: controlN,
        controlConversions: controlX,
        treatmentVisitors: treatmentN,
        treatmentConversions: treatmentX,
        cupedCorrelationRho: cupedRho,
      }),
    [controlN, controlX, treatmentN, treatmentX, cupedRho],
  );

  const fmtPct = (v: number | null) =>
    v === null ? "Aniqlanmagan" : `${(v * 100).toFixed(1)}%`;

  // Coordinate helper for CUPED SVG Scatter Plot
  const toCupedSvgX = (xVal: number) => {
    const clamped = Math.min(9, Math.max(0, xVal));
    return 44 + (clamped / 9) * 320;
  };
  const toCupedSvgY = (yVal: number) => {
    const clamped = Math.min(18, Math.max(0, yVal));
    return 200 - (clamped / 18) * 170;
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 space-y-5">
      {/* Top Lab Switcher & Illustrative Provenance Notice */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setLabTab("cuped-deep-dive")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labTab === "cuped-deep-dive"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DS Phase 12: CUPED (8-Kuzatuvli Namuna)</span>
          </button>
          <button
            type="button"
            onClick={() => setLabTab("clt-simulator")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labTab === "clt-simulator"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>DS Phase 07: CLT va 95% CI Simulyator</span>
          </button>
          <button
            type="button"
            onClick={() => setLabTab("delta-method-ratio")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labTab === "delta-method-ratio"
                ? "bg-sky-500 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>DS Phase 14: Ratio Metrics & Delta Method</span>
          </button>
          <button
            type="button"
            onClick={() => setLabTab("confusion-matrix")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labTab === "confusion-matrix"
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ML Phase 19: Confusion Matrix</span>
          </button>
          <button
            type="button"
            onClick={() => setLabTab("ab-cuped")}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              labTab === "ab-cuped"
                ? "bg-cyan-600 text-slate-950 font-bold shadow-sm"
                : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Phase 10–11: A/B Conversion & Power</span>
          </button>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
          Synthetic Educational Example (Haqiqiy kompaniya loglari emas)
        </span>
      </div>

      {/* TAB 1: CUPED 8-OBSERVATION DEEP-DIVE LAB (`Data_Scientist_Micro_Lesson_AB_CUPED.md`) */}
      {labTab === "cuped-deep-dive" && (
        <div className="space-y-5">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setCupedLiftDelta(0);
                  setCupedCovariateShift(0);
                  setForceZeroVarX(false);
                }}
                className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                  cupedLiftDelta === 0 &&
                  cupedCovariateShift === 0 &&
                  !forceZeroVarX
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-200"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                Namuna (8 kuzatuv: Raw = 5.000, Adj = 0.778)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCupedLiftDelta(0);
                  setCupedCovariateShift(-2);
                  setForceZeroVarX(false);
                }}
                className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                  cupedCovariateShift === -2 && !forceZeroVarX
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-200"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                Muvozanatlangan Pre-Period X (X̄_T = X̄_C = 2.500 → Adj = 5.000)
              </button>
              <button
                type="button"
                onClick={() => {
                  setForceZeroVarX((prev) => !prev);
                }}
                className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                  forceZeroVarX
                    ? "bg-amber-500/20 border-amber-500 text-amber-200"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                Var(X) = 0 chegaraviy holatni sinash
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setCupedLiftDelta(0);
                setCupedCovariateShift(0);
                setForceZeroVarX(false);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Asliga qaytarish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Interactive Sliders & Dual-Color Scatter Plot */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-200">
                    <span>Treatment qo‘shimcha sintetik effekti (ΔY):</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {cupedLiftDelta >= 0 ? `+${cupedLiftDelta.toFixed(1)}` : cupedLiftDelta.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={4}
                    step={0.5}
                    value={cupedLiftDelta}
                    onChange={(e) => setCupedLiftDelta(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-200">
                    <span>Treatment pre-period X siljishi (Covariate Imbalance):</span>
                    <span className="font-mono font-bold text-cyan-300">
                      {cupedCovariateShift >= 0
                        ? `+${cupedCovariateShift.toFixed(1)}`
                        : cupedCovariateShift.toFixed(1)}{" "}
                      (X̄_T - X̄_C = {cupedSample.covariateImbalance.toFixed(2)})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={2}
                    step={0.5}
                    value={cupedCovariateShift}
                    disabled={forceZeroVarX}
                    onChange={(e) =>
                      setCupedCovariateShift(parseFloat(e.target.value))
                    }
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* SVG Scatter Plot: Pre-Period X vs Post-Period Y (Raw & Adjusted) */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    Pre-Period X va Post-Period Y (Bo‘sh doira = Raw Y, To‘liq doira = Y_adjusted)
                  </span>
                  <span className="font-mono text-[11px] text-amber-300">
                    X̄ = {cupedSample.pooledMeanX.toFixed(3)} | θ ={" "}
                    {cupedSample.theta.toFixed(4)}
                  </span>
                </div>
                <svg
                  viewBox="0 0 390 225"
                  className="w-full h-52 rounded-lg bg-slate-950 border border-slate-800/80"
                  role="img"
                  aria-label="CUPED Pre-period X vs Post-period Y scatter plot"
                >
                  {/* Axes */}
                  <line
                    x1={44}
                    y1={200}
                    x2={372}
                    y2={200}
                    stroke="#475569"
                    strokeWidth={1.5}
                  />
                  <line
                    x1={44}
                    y1={20}
                    x2={44}
                    y2={200}
                    stroke="#475569"
                    strokeWidth={1.5}
                  />
                  {/* Pooled X mean vertical line */}
                  <line
                    x1={toCupedSvgX(cupedSample.pooledMeanX)}
                    y1={22}
                    x2={toCupedSvgX(cupedSample.pooledMeanX)}
                    y2={200}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                  />
                  <text
                    x={toCupedSvgX(cupedSample.pooledMeanX) + 4}
                    y={34}
                    fill="#fcd34d"
                    fontSize={9}
                  >
                    X̄ = {cupedSample.pooledMeanX.toFixed(2)}
                  </text>

                  {/* Points & Adjustment Arrows */}
                  {cupedSample.observations.map((obs) => {
                    const cx = toCupedSvgX(obs.x);
                    const cyRaw = toCupedSvgY(obs.y);
                    const cyAdj = toCupedSvgY(obs.yAdjusted);
                    const color =
                      obs.group === "control" ? "#38bdf8" : "#10b981";
                    return (
                      <g key={obs.id}>
                        <line
                          x1={cx}
                          y1={cyRaw}
                          x2={cx}
                          y2={cyAdj}
                          stroke={color}
                          strokeDasharray="2 2"
                          strokeWidth={1.2}
                          opacity={0.7}
                        />
                        {/* Raw Y (hollow circle) */}
                        <circle
                          cx={cx}
                          cy={cyRaw}
                          r={4.5}
                          fill="#020617"
                          stroke={color}
                          strokeWidth={2}
                        />
                        {/* Adjusted Y (filled circle) */}
                        <circle cx={cx} cy={cyAdj} r={5} fill={color} />
                      </g>
                    );
                  })}

                  <text x={180} y={217} fill="#94a3b8" fontSize={10}>
                    Pre-experiment X →
                  </text>
                  <text x={8} y={32} fill="#94a3b8" fontSize={10}>
                    Y
                  </text>
                </svg>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                    Control (n=4)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    Treatment (n=4)
                  </span>
                  <span>Bo‘sh doira = Raw Y • To‘liq doira = Y_adjusted</span>
                </div>
              </div>
            </div>

            {/* Right: Intermediate Numbers, Formula & 8-Row Table */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Pooled X mean (X̄)</div>
                  <div className="text-base font-bold font-mono text-amber-300">
                    {cupedSample.pooledMeanX.toFixed(3)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Theta (θ = Cov/Var)</div>
                  <div className="text-base font-bold font-mono text-cyan-300">
                    {cupedSample.theta.toFixed(6)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Raw Difference</div>
                  <div className="text-base font-bold font-mono text-white">
                    {cupedSample.rawDifference.toFixed(3)}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {cupedSample.treatmentRawMean.toFixed(3)} −{" "}
                    {cupedSample.controlRawMean.toFixed(3)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Control Adj Mean</div>
                  <div className="text-base font-bold font-mono text-sky-300">
                    {cupedSample.controlAdjustedMean.toFixed(3)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Treatment Adj Mean</div>
                  <div className="text-base font-bold font-mono text-emerald-300">
                    {cupedSample.treatmentAdjustedMean.toFixed(3)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                  <div className="text-[11px] text-emerald-300 font-semibold">
                    Adjusted Difference
                  </div>
                  <div className="text-base font-bold font-mono text-emerald-300">
                    {cupedSample.adjustedDifference.toFixed(3)}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-200/70">
                    Guruh ichi Var: {cupedSample.controlRawVariance.toFixed(2)} →{" "}
                    {cupedSample.controlAdjustedVariance.toFixed(2)}
                  </div>
                </div>
              </div>

              <FormulaDisplay
                title="CUPED tenglamasi va oraliq sonlar"
                symbolic="\theta = \frac{\operatorname{Cov}(X,Y)}{\operatorname{Var}(X)}, \quad Y_{\text{adjusted}} = Y - \theta(X - \overline{X})"
                substituted={`X̄ = ${cupedSample.pooledMeanX.toFixed(3)}, θ = ${cupedSample.theta.toFixed(6)}, Ȳ_C,adj = ${cupedSample.controlAdjustedMean.toFixed(3)}, Ȳ_T,adj = ${cupedSample.treatmentAdjustedMean.toFixed(3)}`}
                computedResult={{
                  label: "Adjusted Difference (Ȳ_T,adj - Ȳ_C,adj)",
                  value: Number(cupedSample.adjustedDifference.toFixed(3)),
                }}
                context="Eslatma: n=4/4 bo‘lgan ushbu kichik synthetic misolda maqsad CUPED hisob ketma-ketligini va pre-period muvozanat rolini ko‘rsatishdir."
              />

              {/* 8-Row Calculation Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 font-mono">
                    <tr>
                      <th className="py-1.5 px-2.5">Guruh</th>
                      <th className="py-1.5 px-2.5">X (pre)</th>
                      <th className="py-1.5 px-2.5">Y (post)</th>
                      <th className="py-1.5 px-2.5">X − X̄</th>
                      <th className="py-1.5 px-2.5">Y_adjusted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono">
                    {cupedSample.observations.map((row) => (
                      <tr key={row.id} className="bg-slate-950/60">
                        <td
                          className={`py-1 px-2.5 font-semibold ${
                            row.group === "control"
                              ? "text-sky-300"
                              : "text-emerald-300"
                          }`}
                        >
                          {row.group === "control" ? "Control" : "Treatment"}
                        </td>
                        <td className="py-1 px-2.5 text-slate-300">
                          {row.x.toFixed(2)}
                        </td>
                        <td className="py-1 px-2.5 text-slate-300">
                          {row.y.toFixed(2)}
                        </td>
                        <td className="py-1 px-2.5 text-slate-400">
                          {row.xCentered >= 0
                            ? `+${row.xCentered.toFixed(2)}`
                            : row.xCentered.toFixed(2)}
                        </td>
                        <td className="py-1 px-2.5 text-white font-bold">
                          {row.yAdjusted.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {cupedSample.warnings.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-1">
                  {cupedSample.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLT & CONFIDENCE INTERVAL MONTE CARLO SIMULATOR (`dsx-07-c013`) */}
      {labTab === "clt-simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 space-y-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs">
            <div className="font-bold text-slate-200 text-sm">
              Markaziy Limit Teoremasi (CLT) Parametrlari
            </div>

            <div className="space-y-1.5">
              <div className="text-slate-300">Asl populyatsiya shakli:</div>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "skewed-right", label: "O‘ngga qiyshiq" },
                    { id: "bimodal", label: "Bimodal (2 cho‘qqi)" },
                    { id: "uniform", label: "Tekis (Uniform)" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCltShape(opt.id)}
                    className={`px-2.5 py-2 rounded-lg border font-medium cursor-pointer ${
                      cltShape === opt.id
                        ? "bg-amber-500/20 border-amber-500 text-amber-200"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Tanlanma hajmi (Sample size n):</span>
                <span className="font-mono font-bold text-amber-300">
                  n = {cltSampleSize}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={64}
                step={2}
                value={cltSampleSize}
                onChange={(e) => setCltSampleSize(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Qayta tanlashlar soni (Monte-Karlo B):</span>
                <span className="font-mono font-bold text-cyan-300">
                  B = {cltNumDraws}
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={240}
                step={30}
                value={cltNumDraws}
                onChange={(e) => setCltNumDraws(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <FormulaDisplay
              title="Standard Error (SE) formulasi"
              symbolic="\text{SE}(\overline{X}) = \frac{\sigma}{\sqrt{n}}"
              substituted={`SE = ${cltResult.populationStd.toFixed(3)} / √${cltResult.sampleSize} = ${cltResult.theoreticalStandardError.toFixed(3)}`}
              computedResult={{
                label: "Empirik SE (X̄)",
                value: Number(cltResult.empiricalStandardError.toFixed(3)),
              }}
              context="Tanlanma hajmi n oshgan sari o‘rtachalar tarqoqligi √n marta qisqaradi va gistogramma qo‘ng‘iroq shakliga yaqinlashadi."
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Populyatsiya μ vs X̄̄</div>
                <div className="font-mono text-sm font-bold text-white">
                  μ = {cltResult.populationMean.toFixed(2)} | X̄̄ ={" "}
                  {cltResult.empiricalMeanOfMeans.toFixed(2)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Nazariy SE vs Empirik SE</div>
                <div className="font-mono text-sm font-bold text-amber-300">
                  {cltResult.theoreticalStandardError.toFixed(3)} vs{" "}
                  {cltResult.empiricalStandardError.toFixed(3)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
                <div className="text-emerald-300 font-semibold">
                  95% CI Qamrovi (Coverage)
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  {(cltResult.ci95CoverageRate * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-200">
                Tanlanma o‘rtachalari (X̄) taqsimoti gistogrammasi (B = {cltResult.numDraws})
              </div>
              <div className="h-44 flex items-end gap-1 pt-4 px-2 bg-slate-950 rounded-lg border border-slate-800">
                {(() => {
                  const maxBinCount = Math.max(
                    1,
                    ...cltResult.histogramBins.map((b) => b.count),
                  );
                  return cltResult.histogramBins.map((bin, idx) => {
                    const heightPct = (bin.count / maxBinCount) * 100;
                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className="w-full bg-amber-500/80 rounded-t transition-all"
                          style={{ height: `${Math.max(2, heightPct * 1.25)}px` }}
                          title={`[${bin.binStart.toFixed(1)}, ${bin.binEnd.toFixed(1)}): ${bin.count} ta`}
                        />
                        {idx % 4 === 0 && (
                          <span className="text-[9px] font-mono text-slate-500">
                            {bin.binStart.toFixed(0)}
                          </span>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RATIO METRICS & DELTA METHOD LAB (`dsx-14-c011`) */}
      {labTab === "delta-method-ratio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 space-y-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 text-xs">
            <div className="font-bold text-slate-200 text-sm">
              Ratio Metrics (CTR = ∑Click / ∑Impression) va Delta Method
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Kliklar masshtabi (Numerator N_i multiplier):</span>
                <span className="font-mono font-bold text-sky-300">
                  ×{clickMultiplier.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2.5}
                step={0.5}
                value={clickMultiplier}
                onChange={(e) => setClickMultiplier(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeZeroDenomUser}
                onChange={(e) => setIncludeZeroDenomUser(e.target.checked)}
                className="accent-amber-500"
              />
              <span className="text-slate-300">
                User-5 da Denominator D_5 = 0 bo‘lishini sinash (0 ga bo‘lish himoyasi)
              </span>
            </label>

            <FormulaDisplay
              title="Delta Method Dispersiya Formulasi"
              symbolic="\operatorname{Var}(\widehat{R}) \approx \frac{\operatorname{Var}(N) - 2\widehat{R}\operatorname{Cov}(N,D) + \widehat{R}^2\operatorname{Var}(D)}{k \cdot \overline{D}^2}"
              substituted={`N̄ = ${deltaMethodResult.meanNumerator.toFixed(2)}, D̄ = ${deltaMethodResult.meanDenominator.toFixed(2)}, Cov(N,D) = ${deltaMethodResult.covNumeratorDenominator.toFixed(2)}`}
              computedResult={{
                label: "Delta Method SE(R̂)",
                value:
                  deltaMethodResult.deltaMethodStandardError !== null
                    ? Number(deltaMethodResult.deltaMethodStandardError.toFixed(4))
                    : "Aniqlanmagan",
              }}
              context="Ratio of Sums (∑N/∑D) va Mean of User Ratios ((1/k)∑(N_i/D_i)) bir-biriga teng emas!"
            />
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/40">
                <div className="text-sky-300 font-semibold">
                  Ratio of Sums (∑N / ∑D)
                </div>
                <div className="text-base font-bold font-mono text-white">
                  {deltaMethodResult.ratioOfSums !== null
                    ? `${(deltaMethodResult.ratioOfSums * 100).toFixed(2)}%`
                    : "Aniqlanmagan"}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">
                  Mean of User Ratios (1/k ∑ N_i/D_i)
                </div>
                <div className="text-base font-bold font-mono text-amber-300">
                  {deltaMethodResult.meanOfUserRatios !== null
                    ? `${(deltaMethodResult.meanOfUserRatios * 100).toFixed(2)}%`
                    : "Aniqlanmagan"}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400">Delta Method 95% CI</div>
                <div className="text-sm font-bold font-mono text-emerald-300">
                  {deltaMethodResult.ci95DeltaMethod
                    ? `[${(deltaMethodResult.ci95DeltaMethod[0] * 100).toFixed(1)}%, ${(deltaMethodResult.ci95DeltaMethod[1] * 100).toFixed(1)}%]`
                    : "—"}
                </div>
              </div>
            </div>

            {deltaMethodResult.warnings.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 space-y-1">
                {deltaMethodResult.warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CONFUSION MATRIX & THRESHOLD EXPLORER */}
      {labTab === "confusion-matrix" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setInputMode("threshold")}
                className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                  inputMode === "threshold"
                    ? "bg-violet-600/20 border-violet-500 text-violet-200"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                12 ta namunada Threshold (Chegara) orqali
              </button>
              <button
                type="button"
                onClick={() => setInputMode("manual")}
                className={`px-3 py-1.5 rounded-lg border font-medium cursor-pointer ${
                  inputMode === "manual"
                    ? "bg-violet-600/20 border-violet-500 text-violet-200"
                    : "bg-slate-900 border-slate-800 text-slate-400"
                }`}
              >
                TP / FP / FN / TN ni qo‘lda kiritish
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setThreshold(0.5);
                setManualTp(5);
                setManualFp(1);
                setManualFn(1);
                setManualTn(5);
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tiklash</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Controls & 2x2 Confusion Matrix Grid */}
            <div className="lg:col-span-6 space-y-4">
              {inputMode === "threshold" ? (
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-violet-400" />
                      <span>Klassifikatsiya chegarasi (Threshold τ):</span>
                    </span>
                    <span className="font-mono font-bold text-violet-300 text-sm">
                      τ = {threshold.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={0.95}
                    step={0.05}
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full accent-violet-500 cursor-pointer"
                  />
                  <div className="grid grid-cols-6 gap-1.5 pt-1">
                    {SYNTHETIC_BINARY_PREDICTIONS.map((item) => {
                      const pred = item.predictedProbability >= threshold ? 1 : 0;
                      const correct = pred === item.trueLabel;
                      return (
                        <div
                          key={item.id}
                          className={`p-1.5 rounded-lg border text-center font-mono text-[10px] ${
                            correct
                              ? "bg-emerald-950/50 border-emerald-600/40 text-emerald-300"
                              : "bg-rose-950/50 border-rose-600/40 text-rose-300"
                          }`}
                        >
                          <div>p={item.predictedProbability.toFixed(2)}</div>
                          <div className="text-[9px] text-slate-400">
                            y={item.trueLabel} | ŷ={pred}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "True Positive (TP)", val: manualTp, set: setManualTp },
                    { label: "False Positive (FP)", val: manualFp, set: setManualFp },
                    { label: "False Negative (FN)", val: manualFn, set: setManualFn },
                    { label: "True Negative (TN)", val: manualTn, set: setManualTn },
                  ].map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>{item.label}</span>
                        <span className="font-mono font-bold">{item.val}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        step={1}
                        value={item.val}
                        onChange={(e) => item.set(parseInt(e.target.value, 10))}
                        className="w-full accent-violet-500 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 2x2 Visual Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                  <div className="text-[11px] font-mono text-emerald-300 uppercase">
                    True Positive (TP)
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {counts.tp}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Haqiqiy: 1 • Bashorat: 1 (To‘g‘ri topilgan ijobiy)
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                  <div className="text-[11px] font-mono text-rose-300 uppercase">
                    False Positive (FP — Type I)
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {counts.fp}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Haqiqiy: 0 • Bashorat: 1 (Soxta trevoga)
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                  <div className="text-[11px] font-mono text-amber-300 uppercase">
                    False Negative (FN — Type II)
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {counts.fn}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Haqiqiy: 1 • Bashorat: 0 (O‘tkazib yuborilgan ijobiy)
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-1">
                  <div className="text-[11px] font-mono text-cyan-300 uppercase">
                    True Negative (TN)
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {counts.tn}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Haqiqiy: 0 • Bashorat: 0 (To‘g‘ri rad etilgan)
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Computed Metrics & Formulas */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    label: "Accuracy",
                    value: fmtPct(metrics.accuracy),
                    sub: `${counts.tp + counts.tn} / ${metrics.total}`,
                  },
                  {
                    label: "Precision",
                    value: fmtPct(metrics.precision),
                    sub: `${counts.tp} / (${counts.tp}+${counts.fp})`,
                  },
                  {
                    label: "Recall",
                    value: fmtPct(metrics.recall),
                    sub: `${counts.tp} / (${counts.tp}+${counts.fn})`,
                  },
                  {
                    label: "F1-Score",
                    value: fmtPct(metrics.f1Score),
                    sub: "Garmonik o‘rtacha",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1"
                  >
                    <div className="text-[11px] text-slate-400 font-semibold">
                      {m.label}
                    </div>
                    <div className="text-base font-bold font-mono text-violet-300">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>

              <FormulaDisplay
                title="Precision, Recall va F1-Score hisobi"
                symbolic="\text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall} = \frac{TP}{TP + FN}, \quad F_1 = \frac{2 \cdot P \cdot R}{P + R}"
                substituted={`P = ${counts.tp}/(${counts.tp}+${counts.fp}) = ${fmtPct(metrics.precision)}, R = ${counts.tp}/(${counts.tp}+${counts.fn}) = ${fmtPct(metrics.recall)}`}
                computedResult={{
                  label: "F1-Score",
                  value:
                    metrics.f1Score !== null
                      ? Number(metrics.f1Score.toFixed(4))
                      : "Aniqlanmagan",
                }}
                context="Threshold τ oshirilganda odatda FP kamayib Precision oshadi, lekin FN oshib Recall pasayadi (Precision-Recall trade-off)."
              />

              {metrics.warnings.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-1">
                  {metrics.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: A/B EXPERIMENT & CUPED VARIANCE REDUCTION LAB */}
      {labTab === "ab-cuped" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 space-y-3 bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs">
            <div className="font-bold text-slate-200 text-sm">
              A/B Guruhlari va CUPED Kovariata Sozlamalari
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Control guruhi foydalanuvchilari (n_A):</span>
                <span className="font-mono font-bold text-cyan-300">{controlN}</span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={250}
                value={controlN}
                onChange={(e) => setControlN(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Control konversiyalari (x_A):</span>
                <span className="font-mono font-bold text-cyan-300">
                  {controlX} ({(abResult.controlRate * 100).toFixed(2)}%)
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={Math.min(controlN, 1500)}
                step={5}
                value={controlX}
                onChange={(e) => setControlX(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Treatment guruhi foydalanuvchilari (n_B):</span>
                <span className="font-mono font-bold text-violet-300">
                  {treatmentN}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={250}
                value={treatmentN}
                onChange={(e) => setTreatmentN(parseInt(e.target.value, 10))}
                className="w-full accent-violet-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Treatment konversiyalari (x_B):</span>
                <span className="font-mono font-bold text-violet-300">
                  {treatmentX} ({(abResult.treatmentRate * 100).toFixed(2)}%)
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={Math.min(treatmentN, 1500)}
                step={2}
                value={treatmentX}
                onChange={(e) => setTreatmentX(parseInt(e.target.value, 10))}
                className="w-full accent-violet-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Pre-experiment kovariata korrelyatsiyasi (CUPED ρ):</span>
                <span className="font-mono font-bold text-emerald-300">
                  ρ = {cupedRho.toFixed(2)} (Var multiplier ={" "}
                  {abResult.cupedVarianceMultiplier.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={0.9}
                step={0.05}
                value={cupedRho}
                onChange={(e) => setCupedRho(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Oddiy A/B (CUPED siz)</div>
                <div className="font-mono text-sm font-bold text-white">
                  SE = {(abResult.rawStandardError * 100).toFixed(3)}%
                </div>
                <div className="font-mono text-xs text-slate-300">
                  p-value = {abResult.pValueRaw?.toFixed(4) ?? "—"}
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  95% CI: [{(abResult.ci95Raw[0] * 100).toFixed(2)}%,{" "}
                  {(abResult.ci95Raw[1] * 100).toFixed(2)}%]
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/40 space-y-1">
                <div className="text-emerald-300 font-semibold">
                  CUPED bilan (1 − ρ²)
                </div>
                <div className="font-mono text-sm font-bold text-white">
                  SE_cuped = {(abResult.cupedStandardError * 100).toFixed(3)}%
                </div>
                <div className="font-mono text-xs text-emerald-300 font-bold">
                  p-value = {abResult.pValueCuped?.toFixed(4) ?? "—"}
                </div>
                <div className="font-mono text-[11px] text-emerald-200/80">
                  95% CI: [{(abResult.ci95Cuped[0] * 100).toFixed(2)}%,{" "}
                  {(abResult.ci95Cuped[1] * 100).toFixed(2)}%]
                </div>
              </div>
            </div>

            <FormulaDisplay
              title="CUPED dispersiyani kamaytirish formulasi (Phase 15)"
              symbolic="\text{Var}(\hat{Y}_{\text{CUPED}}) = \text{Var}(\bar{Y}) \cdot (1 - \rho^2)"
              substituted={`SE_cuped = ${(abResult.rawStandardError * 100).toFixed(3)}% × √(1 - ${cupedRho.toFixed(2)}²) = ${(abResult.cupedStandardError * 100).toFixed(3)}%`}
              computedResult={{
                label: "Absolute Lift (p_B - p_A)",
                value: `${(abResult.absoluteLift * 100).toFixed(2)}%`,
              }}
              context="Eksperimentdan oldingi kovariata (masalan, foydalanuvchining oldingi haftadagi faolligi) yordamida shovqin kamaytiriladi va kichikroq MDE seziladi."
            />

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">
                <strong>Statistik qaror (α = 0.05): </strong>
                {abResult.decisionCuped === "significant-positive"
                  ? "Treatment guruhida statistik ahamiyatli ijobiy o‘sish kuzatildi (p < 0.05)."
                  : abResult.decisionCuped === "significant-negative"
                    ? "Treatment guruhida statistik ahamiyatli pasayish kuzatildi (p < 0.05)."
                    : "Farq statistik jihatdan tasdiqlanmadi (p ≥ 0.05) — namuna hajmini oshirish yoki uzoqroq kuzatish talab etiladi."}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
