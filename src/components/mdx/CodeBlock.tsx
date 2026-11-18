"use client";

import React, { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

export interface CodeBlockProps {
  children?: string;
  className?: string;
  language?: string;
  title?: string;
  maxLinesCollapsed?: number;
}

export function CodeBlock({
  children = "",
  className = "",
  language = "python",
  title,
  maxLinesCollapsed = 24,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract language from className if present (e.g., "language-python")
  const langMatch = className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1] : language;

  const codeText = typeof children === "string" ? children.trim() : String(children).trim();
  const lines = codeText.split("\n");
  const isCollapsible = lines.length > maxLinesCollapsed;
  const displayedCode = isCollapsible && !isExpanded
    ? lines.slice(0, maxLinesCollapsed).join("\n")
    : codeText;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative my-5 rounded-xl border border-slate-800 bg-slate-950/90 shadow-md overflow-hidden text-xs font-mono group">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          {title && <span className="ml-2 font-sans font-medium text-slate-300">{title}</span>}
        </div>

        <div className="flex items-center gap-2">
          {lang && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
              {lang}
            </span>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={uz.code.copy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-sans">{uz.code.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[10px] font-sans">{uz.common.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 text-slate-200 leading-relaxed font-mono">
        <pre>
          <code>{displayedCode}</code>
        </pre>
      </div>

      {/* Expand/Collapse footer if long */}
      {isCollapsible && (
        <div className="border-t border-slate-800/60 bg-slate-900/50 p-2 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 font-sans font-medium"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>{uz.code.collapse}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>{uz.code.showAll.replace("{n}", String(lines.length))}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
