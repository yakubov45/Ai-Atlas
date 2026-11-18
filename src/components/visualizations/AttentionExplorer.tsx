"use client";

import React, { useState, useMemo } from "react";
import {
  computeOneDimAttention,
  computeMatrixAttention,
  DEFAULT_1D_TOKENS,
  DEFAULT_MATRIX_TOKENS,
  generateAttentionNumpySnippet,
  type OneDimToken,
} from "@/lib/math/attention";
import { FormulaDisplay } from "./FormulaDisplay";
import {
  Sparkles,
  RotateCcw,
  Sliders,
  Grid,
  Code2,
  Info,
  Check,
  Copy,
  ArrowRight,
  Lock,
  Unlock,
} from "lucide-react";

export interface AttentionExplorerProps {
  initialMode?: "mini-lab" | "matrix";
  className?: string;
}

export function AttentionExplorer({
  initialMode = "mini-lab",
  className = "",
}: AttentionExplorerProps) {
  const [mode, setMode] = useState<"mini-lab" | "matrix">(initialMode);

  // 1D Mini-Lab state (defaults match user's exact specification: Q=1.0, Token A: K=1, V=2, Token B: K=2, V=6, d_k=1)
  const [query, setQuery] = useState<number>(1.0);
  const [tokens1D, setTokens1D] = useState<OneDimToken[]>([...DEFAULT_1D_TOKENS]);
  const [dk1D, setDk1D] = useState<number>(1.0);
  const [showAdvancedControls, setShowAdvancedControls] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Matrix Attention state
  const [selectedQueryIdx, setSelectedQueryIdx] = useState<number>(0);
  const [useScaling, setUseScaling] = useState<boolean>(true);
  const [causalMask, setCausalMask] = useState<boolean>(false);
  const [dkOverride, setDkOverride] = useState<number>(4);

  const oneDimResult = useMemo(
    () => computeOneDimAttention(query, tokens1D, dk1D),
    [query, tokens1D, dk1D],
  );

  const matrixResult = useMemo(
    () =>
      computeMatrixAttention(DEFAULT_MATRIX_TOKENS, {
        useScaling,
        causalMask,
        dkOverride,
      }),
    [useScaling, causalMask, dkOverride],
  );

  const numpySnippet = useMemo(
    () => generateAttentionNumpySnippet(oneDimResult),
    [oneDimResult],
  );

  const handleReset1D = () => {
    setQuery(1.0);
    setTokens1D([...DEFAULT_1D_TOKENS]);
    setDk1D(1.0);
  };

  const updateToken1D = (index: number, field: "key" | "value", val: number) => {
    setTokens1D((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: val } : item)),
    );
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(numpySnippet).catch(() => {});
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    }
  };

  const stepA = oneDimResult.steps[0];
  const stepB = oneDimResult.steps[1];

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Mode Switcher Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode("mini-lab")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              mode === "mini-lab"
                ? "bg-violet-600 text-white shadow-md shadow-violet-950/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>1D Mini-Laboratoriya (Q/K/V)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("matrix")}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              mode === "matrix"
                ? "bg-violet-600 text-white shadow-md shadow-violet-950/50"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Ko‘p Tokenli Matritsa &amp; Masking</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-800/50 text-amber-300 text-[11px] font-medium">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Illustrativ simulyatsiya</span>
          </span>

          {mode === "mini-lab" && (
            <button
              type="button"
              onClick={handleReset1D}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              title="Standart qiymatlarga qaytarish (Q = 1.0)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {mode === "mini-lab" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Interactive Q/K/V Mini-Lab */}
          <div className="lg:col-span-7 flex flex-col gap-5 p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                  Mini-laboratoriya: Attention qanday hisoblanadi?
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                  Query (Q) qiymatini o‘zgartiring va vaznlarni kuzating
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Query qiymatini suring. Ikkita tokenning attention vazni (Softmax %) va natijaviy vaznli yig‘indisi qanday o‘zgarishini jonli kuzating.
                </p>
              </div>
            </div>

            {/* Query (Q) Main Slider */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-violet-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="attention-query-slider"
                  className="text-xs font-semibold text-slate-200 flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                  <span>Query (Q)</span>
                </label>
                <span className="font-mono text-base font-bold text-violet-300 bg-violet-950/60 px-3 py-0.5 rounded-lg border border-violet-800/50">
                  {query.toFixed(1)}
                </span>
              </div>

              <input
                id="attention-query-slider"
                type="range"
                min={-3.0}
                max={4.0}
                step={0.1}
                value={query}
                onChange={(e) => setQuery(parseFloat(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer h-2 rounded-lg bg-slate-800"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>-3.0 (Token A ustun)</span>
                <span>0.0 (Teng: 50% / 50%)</span>
                <span>1.0 (Standart: 26.9% / 73.1%)</span>
                <span>+4.0 (Token B ustun)</span>
              </div>
            </div>

            {/* Token A and Token B Live Weight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {oneDimResult.steps.map((step, idx) => {
                const isTokenA = idx === 0;
                const barColor = isTokenA
                  ? "from-cyan-500 to-sky-400"
                  : "from-violet-500 to-fuchsia-400";
                const badgeBorder = isTokenA
                  ? "border-cyan-500/40 bg-cyan-950/20"
                  : "border-violet-500/40 bg-violet-950/20";

                return (
                  <div
                    key={step.tokenId}
                    className={`p-4 rounded-xl border ${badgeBorder} flex flex-col justify-between gap-3 transition-all`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-100">{step.label}</div>
                        <div className="text-xs font-mono text-slate-400 mt-0.5">
                          K = {step.key}, V = {step.value}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-extrabold font-mono text-slate-100">
                          {step.weightPercent.toFixed(1)}%
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          vazn: {step.weight.toFixed(4)}
                        </div>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-150`}
                        style={{ width: `${Math.min(100, Math.max(2, step.weightPercent))}%` }}
                      />
                    </div>

                    {/* Score & Weighted Contribution */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
                      <div>
                        Score (Q·K):{" "}
                        <span className="text-slate-200 font-semibold">
                          {step.scaledScore.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-right">
                        V×vazn:{" "}
                        <span className="text-emerald-300 font-semibold">
                          {step.weightedValue.toFixed(3)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final Weighted Sum Output Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-violet-950/40 border border-emerald-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Attention natijasi (Vaznli yig‘indi)
                </div>
                <div className="text-xs font-mono text-slate-300">
                  {stepA && stepB ? (
                    <>
                      {stepA.value} &times; {stepA.weight.toFixed(3)} + {stepB.value} &times;{" "}
                      {stepB.weight.toFixed(3)} ={" "}
                      <span className="text-slate-400">
                        {stepA.weightedValue.toFixed(3)} + {stepB.weightedValue.toFixed(3)}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 bg-slate-950/90 px-4 py-2 rounded-xl border border-emerald-700/50 self-start sm:self-auto">
                {oneDimResult.output.toFixed(3)}
              </div>
            </div>

            {/* Optional Advanced K, V, d_k controls */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvancedControls((prev) => !prev)}
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>
                  {showAdvancedControls
                    ? "K, V va dₖ parametrlarini yashirish"
                    : "Token A/B ning K, V va dₖ parametrlarini ham o‘zgartirib ko‘rish"}
                </span>
              </button>

              {showAdvancedControls && (
                <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {tokens1D.map((tok, idx) => (
                    <div key={tok.id} className="space-y-2">
                      <div className="font-semibold text-slate-200">{tok.label}</div>
                      <label className="block space-y-1">
                        <span className="text-slate-400 font-mono">
                          Key (K): {tok.key.toFixed(1)}
                        </span>
                        <input
                          type="range"
                          min={-2}
                          max={4}
                          step={0.5}
                          value={tok.key}
                          onChange={(e) =>
                            updateToken1D(idx, "key", parseFloat(e.target.value))
                          }
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="text-slate-400 font-mono">
                          Value (V): {tok.value.toFixed(1)}
                        </span>
                        <input
                          type="range"
                          min={-4}
                          max={10}
                          step={0.5}
                          value={tok.value}
                          onChange={(e) =>
                            updateToken1D(idx, "value", parseFloat(e.target.value))
                          }
                          className="w-full accent-emerald-400 cursor-pointer"
                        />
                      </label>
                    </div>
                  ))}

                  <div className="space-y-2">
                    <div className="font-semibold text-slate-200">Masshtablash (dₖ)</div>
                    <label className="block space-y-1">
                      <span className="text-slate-400 font-mono">
                        dₖ = {dk1D.toFixed(0)} (√dₖ = {Math.sqrt(dk1D).toFixed(2)})
                      </span>
                      <input
                        type="range"
                        min={1}
                        max={64}
                        step={1}
                        value={dk1D}
                        onChange={(e) => setDk1D(parseFloat(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      dₖ kattalashganda √dₖ ga bo‘lish Softmax vaznlarini yumshatib, gradient yo‘qolishining oldini oladi.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Honest Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Eslatma:</strong> Bu haqiqiy o‘qitilgan LLM modeldan olingan qiymatlar emas. Bir o‘lchamli, soddalashtirilgan scaled dot-product attention misoli, bunda standart holatda{" "}
                <code className="text-slate-200">dₖ = 1</code>. Maqsad — har bir arifmetik amalni shaffof ko‘rsatish.
              </span>
            </div>
          </div>

          {/* Right Panel: Step-by-Step Formula & Live NumPy Code */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <FormulaDisplay
              title="Scaled Dot-Product Attention"
              symbolic="\operatorname{Attention}(Q, K, V) = \operatorname{softmax}\!\left(\frac{Q K^T}{\sqrt{d_k}}\right) V"
              substituted={`Q = ${query.toFixed(1)},\\; d_k = ${dk1D} \\rightarrow w_A = ${(stepA?.weightPercent ?? 0).toFixed(1)}\\%,\\; w_B = ${(stepB?.weightPercent ?? 0).toFixed(1)}\\% \\rightarrow ${stepA?.value ?? 2} \\times ${(stepA?.weight ?? 0).toFixed(3)} + ${stepB?.value ?? 6} \\times ${(stepB?.weight ?? 0).toFixed(3)} = ${oneDimResult.output.toFixed(3)}`}
              computedResult={{
                label: "Natija",
                value: oneDimResult.output.toFixed(3),
              }}
              context="Har bir qadamda: 1) Q va K o'xshashligi (dot product) topiladi, 2) √dₖ ga bo'linadi, 3) Softmax orqali 0..100% vaznga aylantiriladi, 4) V qiymatlar vaznli qo'shiladi."
            />

            {/* Live NumPy Code Equivalence */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>NumPy kodi (Jonli qiymatlar bilan)</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 cursor-pointer"
                >
                  {copiedCode ? (
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
                <code>{numpySnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Multi-Token Matrix Self-Attention */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Ko‘p tokenli Self-Attention matritsasi
                </span>
                <h4 className="text-base font-bold text-slate-100 mt-0.5">
                  Tokenlar o‘rtasidagi kontekstual bog‘lanish issiqlik xaritasi
                </h4>
              </div>

              {/* Matrix Toggles */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUseScaling((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    useScaling
                      ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  √dₖ Scaling: {useScaling ? "Yoqilgan" : "O‘chirilgan"}
                </button>

                <button
                  type="button"
                  onClick={() => setCausalMask((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    causalMask
                      ? "bg-amber-950/40 border-amber-700/60 text-amber-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  {causalMask ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                  <span>{causalMask ? "Decoder (Causal Mask)" : "Encoder (To‘liq)"}</span>
                </button>
              </div>
            </div>

            {/* d_k Dimension Slider to demonstrate saturation */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-300">
                Vektor o‘lchami <code className="text-cyan-300">dₖ = {dkOverride}</code>{" "}
                (Bo‘luvchi:{" "}
                <code className="text-violet-300">
                  {matrixResult.scaleUsed.toFixed(2)}
                </code>
                )
              </div>
              <input
                type="range"
                min={1}
                max={64}
                step={1}
                value={dkOverride}
                onChange={(e) => setDkOverride(parseInt(e.target.value, 10))}
                className="w-full sm:w-48 accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-slate-400 font-mono text-[11px]">
                      Query (Q) \ Key (K)
                    </th>
                    {matrixResult.tokens.map((tok, j) => (
                      <th
                        key={tok + j}
                        className="p-2 text-center font-mono text-slate-300 font-semibold"
                      >
                        {tok}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixResult.tokens.map((rowTok, i) => {
                    const isSelectedRow = i === selectedQueryIdx;
                    return (
                      <tr
                        key={rowTok + i}
                        onClick={() => setSelectedQueryIdx(i)}
                        className={`cursor-pointer transition-colors ${
                          isSelectedRow ? "bg-violet-950/30" : "hover:bg-slate-800/40"
                        }`}
                      >
                        <td className="p-2 font-mono font-semibold text-slate-200 flex items-center gap-1.5">
                          <ArrowRight
                            className={`w-3.5 h-3.5 ${
                              isSelectedRow ? "text-violet-400" : "text-transparent"
                            }`}
                          />
                          <span>{rowTok}</span>
                        </td>
                        {matrixResult.weights[i]?.map((w, j) => {
                          const isMasked = causalMask && j > i;
                          const pct = w * 100;
                          return (
                            <td key={j} className="p-1.5 text-center">
                              <div
                                className="rounded-lg py-2.5 px-2 font-mono text-xs transition-all border"
                                style={{
                                  backgroundColor: isMasked
                                    ? "rgba(15, 23, 42, 0.8)"
                                    : `rgba(139, 92, 246, ${Math.max(0.08, w * 0.85)})`,
                                  borderColor: isSelectedRow
                                    ? "rgba(167, 139, 250, 0.5)"
                                    : "rgba(51, 65, 85, 0.5)",
                                }}
                              >
                                {isMasked ? (
                                  <span className="text-slate-600">-∞ (0%)</span>
                                ) : (
                                  <span className="text-slate-100 font-semibold">
                                    {pct.toFixed(1)}%
                                  </span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel: Selected Query Token Inspection */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
              Tanlangan Query Token tahlili
            </div>
            <h4 className="text-base font-bold text-slate-100">
              “{matrixResult.tokens[selectedQueryIdx]}” so‘zi boshqa tokenlarga qanday qaraydi?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jadvaldagi istalgan qatorni bosing. Quyida ushbu tokenning har bir Key token bilan Dot Product balli va Softmax ehtimolligi ko‘rsatilgan:
            </p>

            <div className="space-y-2.5">
              {matrixResult.tokens.map((tok, j) => {
                const raw = matrixResult.rawScores[selectedQueryIdx]?.[j] ?? 0;
                const scaled = matrixResult.scaledScores[selectedQueryIdx]?.[j] ?? 0;
                const weight = matrixResult.weights[selectedQueryIdx]?.[j] ?? 0;
                const isMasked = !Number.isFinite(scaled);

                return (
                  <div
                    key={tok + j}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{tok}</div>
                      <div className="text-[11px] font-mono text-slate-400">
                        Q·K = {raw.toFixed(2)} | Scaled:{" "}
                        {isMasked ? "-∞ (Masked)" : scaled.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-sm font-bold text-cyan-300">
                        {(weight * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-800/40 text-xs space-y-1">
              <div className="font-semibold text-violet-300">
                Yakuniy Kontekst Vektori (Z[{selectedQueryIdx}]):
              </div>
              <div className="font-mono text-slate-200">
                [
                {matrixResult.outputs[selectedQueryIdx]
                  ?.map((v) => v.toFixed(3))
                  .join(", ")}
                ]
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
