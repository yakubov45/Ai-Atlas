"use client";

import React, { useState } from "react";
import type { PracticeExample } from "@/lib/practice/types";
import {
  Code2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";

export interface ExampleViewerProps {
  examples: PracticeExample[];
  className?: string;
}

export function ExampleViewer({
  examples,
  className = "",
}: ExampleViewerProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [showWalkthrough, setShowWalkthrough] = useState<boolean>(true);

  if (!examples || examples.length === 0) return null;

  const current = examples[activeTab] ?? examples[0]!;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(current.code).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-4 ${className}`}
    >
      {/* Header and Example Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Namunaviy Kod Misollari
          </span>
        </div>

        {/* Example 1 vs Example 2 Tabs */}
        {examples.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            {examples.map((ex, idx) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                  setShowWalkthrough(true);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {idx + 1}-misol {idx === 0 ? "(Oddiy)" : "(Amaliy)"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Example Title and Explanation */}
      <div className="space-y-1.5">
        <h4 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{current.titleUz}</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {current.explanationUz}
        </p>
      </div>

      {/* Code Box with Copy */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800/80 text-[11px] text-slate-400">
          <span>Python kodi:</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer"
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
        <pre className="p-4 text-slate-200 overflow-x-auto leading-relaxed scrollbar-thin">
          <code>{current.code}</code>
        </pre>
      </div>

      {/* Input & Expected Output Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {current.input && (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Kiritish (Input):
            </span>
            <div className="font-mono text-cyan-300 text-xs">
              {current.input}
            </div>
          </div>
        )}

        <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-900/40 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            Kutilgan Natija (Expected Output):
          </span>
          <div className="font-mono text-emerald-300 text-xs font-bold">
            {current.expectedOutput}
          </div>
        </div>
      </div>

      {/* Step-by-Step Walkthrough Accordion */}
      {current.walkthrough && current.walkthrough.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setShowWalkthrough(!showWalkthrough)}
            className="w-full px-3.5 py-2.5 flex items-center justify-between text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="font-semibold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Qadamma-qadam tushuntirish ({current.walkthrough.length} qadam)</span>
            </span>
            {showWalkthrough ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showWalkthrough && (
            <div className="px-3.5 pb-3.5 space-y-2 border-t border-slate-800/60 pt-2.5 text-slate-300">
              {current.walkthrough.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 leading-relaxed">
                  <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0 mt-1" />
                  <span>{step}</span>
                </div>
              ))}

              {current.whyThisOutputUz && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[11px] text-amber-300/90 leading-relaxed">
                  💡 <strong>Nega aynan shunday natija chiqdi?</strong>{" "}
                  {current.whyThisOutputUz}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
