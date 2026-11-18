"use client";

import React from "react";
import katex from "katex";
import { ArrowRight, Calculator } from "lucide-react";

export interface FormulaDisplayProps {
  title?: string;
  symbolic: string;
  substituted?: string;
  derivative?: string;
  computedResult?: { label: string; value: number | string };
  context?: string;
  className?: string;
}

/**
 * Normalizes mixed LaTeX / Unicode math strings into clean KaTeX-compatible LaTeX
 * and compiles them via katex.renderToString.
 */
export function normalizeMathExpression(raw: string): string {
  let expr = raw
    .trim()
    .replace(/^\$\$([\s\S]*)\$\$$/, "$1")
    .replace(/^\$([\s\S]*)\$$/, "$1");

  expr = expr
    .replace(/—/g, "\\text{---}")
    .replace(/·/g, " \\cdot ")
    .replace(/×/g, " \\times ")
    .replace(/→/g, " \\rightarrow ")
    .replace(/√dₖ/g, "\\sqrt{d_k}")
    .replace(/dₖ/g, "d_k")
    .replace(/\|\|/g, "\\|")
    .replace(/(?<!\\)%/g, "\\%");

  expr = expr
    .replace(/α_freq/g, "\\alpha_{\\text{freq}}")
    .replace(/α/g, "\\alpha")
    .replace(/β/g, "\\beta")
    .replace(/γ/g, "\\gamma")
    .replace(/θ/g, "\\theta")
    .replace(/λ/g, "\\lambda")
    .replace(/μ/g, "\\mu")
    .replace(/σ/g, "\\sigma")
    .replace(/η/g, "\\eta")
    .replace(/Δ/g, "\\Delta")
    .replace(/ŷ/g, "\\hat{y}");

  expr = expr.replace(/Σ_([a-zA-Z0-9]+)/g, "\\sum_{$1}");
  expr = expr.replace(/(\\Sigma|Σ)(?![a-zA-Z])/g, "\\sum ");

  expr = expr.replace(/\b([a-zA-Z])_([a-zA-Z0-9]{2,})\b/g, (_match, base, sub) => {
    return `${base}_{${sub}}`;
  });

  const ops = [
    "ReLU",
    "Sigmoid",
    "Softmax",
    "Softplus",
    "GELU",
    "Swish",
    "Attention",
    "LayerNorm",
  ];
  for (const op of ops) {
    const re = new RegExp(`(?<!\\\\operatorname\\{|\\\\text\\{)\\b${op}\\b`, "g");
    expr = expr.replace(re, `\\operatorname{${op}}`);
  }

  return expr;
}

export function renderLatexToHtml(
  expression: string,
  displayMode = false,
): string {
  const normalized = normalizeMathExpression(expression);

  return katex.renderToString(normalized, {
    displayMode,
    throwOnError: false,
    strict: "ignore",
  });
}

function renderTitleWithInlineLatex(text: string): React.ReactNode {
  const colonIdx = text.indexOf(":");
  if (colonIdx !== -1) {
    const prefix = text.slice(0, colonIdx + 1);
    const mathCandidate = text.slice(colonIdx + 1).trim();
    if (/[\\_{}^]/.test(mathCandidate)) {
      return (
        <>
          {prefix}{" "}
          <span
            className="normal-case inline-block ml-1 text-violet-200"
            dangerouslySetInnerHTML={{
              __html: renderLatexToHtml(mathCandidate, false),
            }}
          />
        </>
      );
    }
  }
  return text;
}

/**
 * Splits a multi-step calculation string (separated by `\rightarrow` or `→`)
 * into individual step strings so each step renders on its own clean line.
 */
function splitCalculationSteps(expr: string): string[] {
  const parts = expr
    .split(/\\rightarrow|→/g)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [expr];
}

export function FormulaDisplay({
  title = "Matematik Formula va Hisoblash",
  symbolic,
  substituted,
  derivative,
  computedResult,
  context,
  className = "",
}: FormulaDisplayProps) {
  const symbolicSteps = splitCalculationSteps(symbolic);
  const substitutedSteps = substituted
    ? splitCalculationSteps(substituted)
    : [];
  const derivativeSteps = derivative
    ? splitCalculationSteps(derivative)
    : [];

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg text-slate-200 space-y-3.5 ${className}`}
    >
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
            <Calculator className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider leading-snug">
            {renderTitleWithInlineLatex(title)}
          </span>
        </div>

        {computedResult && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-950/90 border border-cyan-800/50 font-mono text-xs shrink-0">
            <span className="text-slate-400">{computedResult.label}:</span>
            <span className="font-extrabold text-cyan-300 text-sm">
              {typeof computedResult.value === "number"
                ? computedResult.value.toFixed(4)
                : computedResult.value}
            </span>
          </div>
        )}
      </div>

      {/* Formula Blocks — Full Width Stacked Layout (Never Clipped) */}
      <div className="space-y-3">
        {/* 1. Symbolic Formula */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/80 border border-violet-500/25 space-y-1.5">
          <div className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-wider">
            Asosiy Formula
          </div>
          <div className="w-full overflow-x-auto overflow-y-hidden px-1.5 py-1 text-left scrollbar-thin">
            {symbolicSteps.length === 1 ? (
              <div
                className="text-xs sm:text-sm md:text-base text-violet-100 whitespace-nowrap text-left"
                dangerouslySetInnerHTML={{
                  __html: renderLatexToHtml(symbolicSteps[0]!, false),
                }}
              />
            ) : (
              <div className="space-y-1.5 text-left">
                {symbolicSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-violet-100 whitespace-nowrap"
                  >
                    {idx > 0 && (
                      <ArrowRight className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderLatexToHtml(step, false),
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. Substituted Numbers (Step-by-Step Calculation) */}
        {substitutedSteps.length > 0 && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-cyan-500/25 space-y-2">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Sonli Hisoblash (Qadamma-qadam)
            </div>
            <div className="w-full overflow-x-auto overflow-y-hidden px-1.5 py-1 space-y-2 scrollbar-thin">
              {substitutedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base text-cyan-100 whitespace-nowrap"
                >
                  {substitutedSteps.length > 1 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-cyan-950 border border-cyan-700/50 text-[10px] font-mono font-bold text-cyan-300 shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(step, false),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Derivative if applicable */}
        {derivativeSteps.length > 0 && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/25 space-y-2">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              Hosilasi (Derivative / Qiyalik)
            </div>
            <div className="w-full overflow-x-auto overflow-y-hidden px-1.5 py-1 space-y-1.5 scrollbar-thin">
              {derivativeSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-amber-200 whitespace-nowrap"
                >
                  {derivativeSteps.length > 1 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-amber-950 border border-amber-700/50 text-[10px] font-mono font-bold text-amber-300 shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: renderLatexToHtml(step, false),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {context && (
        <p className="text-xs text-slate-300 border-t border-slate-800/80 pt-2.5 leading-relaxed">
          💡 {context}
        </p>
      )}
    </div>
  );
}
