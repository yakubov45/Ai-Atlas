"use client";

import React, { useRef, useState, useMemo } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  Code2,
} from "lucide-react";

export interface PythonCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  onReset?: () => void;
  isRunning?: boolean;
  output?: string;
  error?: string;
  errorDetailsUz?: string;
  executionTimeMs?: number;
  placeholder?: string;
  minHeight?: string;
  className?: string;
  label?: string;
  runtimeLabel?: string;
}

export function PythonCodeEditor({
  value,
  onChange,
  onRun,
  onReset,
  isRunning = false,
  output,
  error,
  errorDetailsUz,
  executionTimeMs,
  placeholder = "# Python kodingizni shu yerga yozing...",
  minHeight = "240px",
  className = "",
  label = "Python Muharriri",
  runtimeLabel = "Python 3.12 REPL / Native",
}: PythonCodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"terminal" | "diagnostics">("terminal");

  // Calculate line numbers
  const lineCount = useMemo(() => {
    return Math.max(1, value.split("\n").length);
  }, [value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  // True Python Keyboard Behavior
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Run shortcut: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (onRun && !isRunning) {
        onRun();
      }
      return;
    }

    const { selectionStart, selectionEnd } = textarea;

    // TAB or SHIFT+TAB
    if (e.key === "Tab") {
      e.preventDefault();
      const tabSpaces = "    "; // 4 spaces standard PEP-8

      if (e.shiftKey) {
        // Shift+Tab: Unindent
        const beforeCursor = value.substring(0, selectionStart);
        const lastNewLine = beforeCursor.lastIndexOf("\n");
        const lineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
        const lineText = value.substring(lineStart, selectionStart);

        if (lineText.startsWith(tabSpaces)) {
          const newValue =
            value.substring(0, lineStart) +
            lineText.substring(tabSpaces.length) +
            value.substring(selectionStart);
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = selectionStart - tabSpaces.length;
            textarea.selectionEnd = selectionEnd - tabSpaces.length;
          }, 0);
        }
      } else {
        // Tab: Insert 4 spaces
        const newValue =
          value.substring(0, selectionStart) +
          tabSpaces +
          value.substring(selectionEnd);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = selectionStart + tabSpaces.length;
          textarea.selectionEnd = selectionStart + tabSpaces.length;
        }, 0);
      }
      return;
    }

    // ENTER: Python Auto-Indentation
    if (e.key === "Enter") {
      e.preventDefault();
      const beforeCursor = value.substring(0, selectionStart);
      const afterCursor = value.substring(selectionEnd);
      const lastNewLine = beforeCursor.lastIndexOf("\n");
      const currentLine =
        lastNewLine === -1
          ? beforeCursor
          : beforeCursor.substring(lastNewLine + 1);

      // Measure current indentation
      const match = currentLine.match(/^(\s*)/);
      let currentIndent = match ? match[1] : "";

      // If line ends with ':' increase indentation by 4 spaces
      const trimmed = currentLine.trim();
      if (trimmed.endsWith(":")) {
        currentIndent += "    ";
      }

      const insertText = "\n" + currentIndent;
      const newValue = beforeCursor + insertText + afterCursor;
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = selectionStart + insertText.length;
        textarea.selectionEnd = selectionStart + insertText.length;
      }, 0);
      return;
    }

    // BACKSPACE: Smart 4-space un-indent
    if (e.key === "Backspace" && selectionStart === selectionEnd) {
      const beforeCursor = value.substring(0, selectionStart);
      if (beforeCursor.endsWith("    ")) {
        // Check if only spaces precede on this line
        const lastNewLine = beforeCursor.lastIndexOf("\n");
        const lineStart = lastNewLine === -1 ? 0 : lastNewLine + 1;
        const lineText = beforeCursor.substring(lineStart);
        if (/^\s+$/.test(lineText)) {
          e.preventDefault();
          const newValue =
            value.substring(0, selectionStart - 4) +
            value.substring(selectionStart);
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = selectionStart - 4;
            textarea.selectionEnd = selectionStart - 4;
          }, 0);
        }
      }
    }
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-950/95 overflow-hidden shadow-2xl flex flex-col ${className}`}
    >
      {/* Editor Header & Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-slate-800 mx-1" />
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{label}</span>
          </div>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px]">
            {runtimeLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Kodni asliga qaytarish"
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Qaytarish</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            title="Kodni nusxalash"
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">{copied ? "Nusxalandi" : "Nusxa"}</span>
          </button>

          {onRun && (
            <button
              type="button"
              onClick={onRun}
              disabled={isRunning}
              title="Kodni ishga tushirish (Ctrl+Enter)"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "Bajarilmoqda..." : "Ishga tushirish"}</span>
              <kbd className="hidden md:inline-block ml-1 px-1 py-0.2 bg-amber-700/30 text-[9px] rounded font-mono">
                Ctrl+↵
              </kbd>
            </button>
          )}
        </div>
      </div>

      {/* Code Editor Body with Line Numbers */}
      <div className="relative flex font-mono text-xs sm:text-sm bg-slate-950 overflow-hidden">
        {/* Line Numbers Gutter */}
        <div
          aria-hidden="true"
          className="select-none py-3 px-3 text-right bg-slate-900/40 border-r border-slate-800/60 text-slate-600 text-xs font-mono shrink-0 w-12"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          style={{ minHeight }}
          className="w-full flex-1 p-3 bg-transparent text-amber-200/90 font-mono text-xs sm:text-sm leading-6 focus:outline-none resize-y selection:bg-amber-500/30"
        />
      </div>

      {/* Terminal / Output View */}
      {(output !== undefined || error !== undefined || isRunning) && (
        <div className="border-t border-slate-800 bg-slate-950 flex flex-col">
          {/* Output Toolbar Tabs */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/70 border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("terminal")}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "terminal"
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Terminal className="w-3 h-3 text-amber-400" />
                <span>Konsol Chiqishi</span>
              </button>

              {errorDetailsUz && (
                <button
                  type="button"
                  onClick={() => setActiveTab("diagnostics")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === "diagnostics"
                      ? "bg-rose-950/80 border border-rose-500/40 text-rose-200"
                      : "text-rose-400 hover:text-rose-300"
                  }`}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Xatolik Diagnostikasi</span>
                </button>
              )}
            </div>

            {executionTimeMs !== undefined && executionTimeMs > 0 && (
              <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                <Clock className="w-3 h-3" />
                <span>{executionTimeMs} ms</span>
              </div>
            )}
          </div>

          {/* Tab 1: Terminal stdout/stderr */}
          {activeTab === "terminal" && (
            <div className="p-3.5 font-mono text-xs leading-relaxed max-h-56 overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-amber-400 py-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Python interpretatori bajarmoqda...</span>
                </div>
              ) : error ? (
                <div className="space-y-2">
                  <div className="text-rose-400 whitespace-pre-wrap">{error}</div>
                  {errorDetailsUz && (
                    <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs">
                      <strong>Maslahat:</strong> {errorDetailsUz}
                    </div>
                  )}
                </div>
              ) : output ? (
                <div className="text-emerald-300/90 whitespace-pre-wrap">{output}</div>
              ) : (
                <div className="text-slate-500 italic">
                  Chiqish bo&apos;sh. Ishga tushirish uchun &apos;Ishga tushirish&apos; tugmasini bosing yoki print() dan foydalaning.
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Uzbek Diagnostics */}
          {activeTab === "diagnostics" && errorDetailsUz && (
            <div className="p-3.5 bg-rose-950/20 text-xs text-rose-200 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>O&apos;zbek tilidagi tushuntirish va to&apos;g&apos;rilash yo&apos;li:</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-rose-900/50 text-slate-200 whitespace-pre-wrap">
                {errorDetailsUz}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
