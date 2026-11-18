"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, FileText, Sparkles, Boxes, ChevronRight } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { uz } from "@/i18n/dictionaries/uz";
import type { SearchDocumentKind, SearchResult } from "@/lib/search/core";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { search, loading } = useSearch();
  const [query, setQuery] = useState("");
  const [activeKind, setActiveKind] = useState<SearchDocumentKind | "all">("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl/Cmd+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else onClose(); // parent handles open
      }
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [open]);

  const results: SearchResult[] = query.trim()
    ? search(query, {
        limit: 15,
        kinds: activeKind === "all" ? undefined : [activeKind],
      })
    : [];

  const handleSelect = (result: SearchResult) => {
    onClose();
    router.push(result.document.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  if (!open) return null;

  const kindIcons: Record<SearchDocumentKind, React.ElementType> = {
    lesson: BookOpen,
    section: FileText,
    glossary: Sparkles,
    visualization: Boxes,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 divide-y divide-slate-800"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={uz.search.placeholder}
            className="w-full bg-transparent border-0 text-slate-100 placeholder:text-slate-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800">
            ESC
          </kbd>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/40 text-xs overflow-x-auto">
          {(["all", "lesson", "section", "glossary", "visualization"] as const).map((kind) => {
            const active = activeKind === kind;
            const label =
              kind === "all" ? uz.common.all : uz.search.kinds[kind as SearchDocumentKind];
            return (
              <button
                key={kind}
                onClick={() => setActiveKind(kind)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  active
                    ? "bg-violet-600/30 text-violet-300 border border-violet-500/40 font-medium"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {loading && (
            <div className="p-8 text-center text-sm text-slate-400">
              {uz.common.loading}
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-400">
              {uz.search.noResults.replace("{q}", query)}
            </div>
          )}

          {!loading && !query.trim() && (
            <div className="p-8 text-center text-xs text-slate-500">
              {uz.search.empty}
            </div>
          )}

          {results.map((item, index) => {
            const isSelected = index === selectedIndex;
            const Icon = kindIcons[item.document.kind] || BookOpen;
            return (
              <div
                key={item.document.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                  isSelected ? "bg-slate-800/90 text-white" : "text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <div
                  className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                    isSelected ? "bg-violet-600/30 text-violet-300" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm truncate">{item.document.title}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {uz.search.kinds[item.document.kind]}
                    </span>
                  </div>
                  {item.document.parentTitle && (
                    <p className="text-xs text-cyan-400/90 truncate mt-0.5">
                      {item.document.parentTitle}
                    </p>
                  )}
                  {item.snippet ? (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.snippet}</p>
                  ) : item.document.description ? (
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {item.document.description}
                    </p>
                  ) : null}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 self-center shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↑</kbd>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↓</kbd>
              <span>{uz.search.navigate}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">↵</kbd>
              <span>{uz.search.select}</span>
            </span>
          </div>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700">esc</kbd> {uz.search.closeHint}
          </span>
        </div>
      </div>
    </div>
  );
}
