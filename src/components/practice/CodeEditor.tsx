"use client";

import React, { useRef, useId } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
  onRun?: () => void;
  onReset?: () => void;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "python",
  readOnly = false,
  minHeight = "240px",
  onRun,
  onReset,
  className = "",
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = React.useState(false);
  const id = useId();

  const lines = value.split("\n");
  const lineCount = Math.max(1, lines.length);

  // Handle Tab and Indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter or Cmd + Enter to Run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onRun?.();
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces
      const nextValue = value.substring(0, start) + "    " + value.substring(end);
      onChange(nextValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-950/95 overflow-hidden font-mono shadow-xl transition-all focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/15 ${className}`}
    >
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            {language} Muhiti
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Kodni boshlang'ich holatga qaytarish"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-[11px] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Qaytarish</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            title="Kodni nusxalash"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-[11px] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">Nusxalandi</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Nusxa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Textarea with Line Numbers */}
      <div className="flex relative items-stretch" style={{ minHeight }}>
        {/* Line Numbers Gutter */}
        <div
          aria-hidden="true"
          className="select-none py-3 px-3 text-right text-slate-600 bg-slate-950/80 border-r border-slate-900 text-xs font-mono shrink-0 w-12"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <label htmlFor={id} className="sr-only">
          Kod muharriri
        </label>
        <textarea
          id={id}
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="w-full h-full p-3 bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none scrollbar-thin"
          style={{ minHeight }}
          placeholder="# Kodingizni shu yerga yozing..."
        />
      </div>

      {/* Editor Bottom Keyboard Hint */}
      <div className="px-4 py-1.5 bg-slate-950 border-t border-slate-900/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Ctrl + Enter: Kodni ishga tushirish</span>
        <span>Tab: 4 ta bo'shliq</span>
      </div>
    </div>
  );
}
