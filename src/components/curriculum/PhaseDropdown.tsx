"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  Search,
  X,
} from "lucide-react";

export interface PhaseDropdownOption {
  id: string;
  badge: string;
  title: string;
  countLabel: string;
  subtitle?: string;
  hasPublished?: boolean;
}

export interface PhaseDropdownProps {
  id?: string;
  ariaLabel?: string;
  value: string;
  options: readonly PhaseDropdownOption[];
  onChange: (nextPhaseId: string) => void;
  accent?: "violet" | "emerald" | "cyan" | "amber";
}

const ACCENT_STYLES = {
  violet: {
    triggerBorder: "hover:border-violet-500/60 focus:border-violet-500",
    openBorder: "border-violet-500 ring-2 ring-violet-500/20",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    activeRow: "bg-violet-600/20 border-violet-500/50 text-white",
    activeBadge: "bg-violet-500 text-white border-violet-400",
    check: "text-violet-400",
  },
  emerald: {
    triggerBorder: "hover:border-emerald-500/60 focus:border-emerald-500",
    openBorder: "border-emerald-500 ring-2 ring-emerald-500/20",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    activeRow: "bg-emerald-600/20 border-emerald-500/50 text-white",
    activeBadge: "bg-emerald-500 text-slate-950 border-emerald-400",
    check: "text-emerald-400",
  },
  cyan: {
    triggerBorder: "hover:border-cyan-500/60 focus:border-cyan-500",
    openBorder: "border-cyan-500 ring-2 ring-cyan-500/20",
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    activeRow: "bg-cyan-600/20 border-cyan-500/50 text-white",
    activeBadge: "bg-cyan-500 text-slate-950 border-cyan-400",
    check: "text-cyan-400",
  },
  amber: {
    triggerBorder: "hover:border-amber-500/60 focus:border-amber-500",
    openBorder: "border-amber-500 ring-2 ring-amber-500/20",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    activeRow: "bg-amber-500/20 border-amber-500/50 text-white",
    activeBadge: "bg-amber-500 text-slate-950 border-amber-400",
    check: "text-amber-400",
  },
} as const;

export function PhaseDropdown({
  id,
  ariaLabel = "Fazani tanlang",
  value,
  options,
  onChange,
  accent = "violet",
}: PhaseDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const activeOptionRef = useRef<HTMLButtonElement>(null);

  const styles = ACCENT_STYLES[accent];
  const currentIdx = Math.max(
    0,
    options.findIndex((o) => o.id === value),
  );
  const selected = options[currentIdx] ?? options[0];

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.title.toLowerCase().includes(q) ||
        o.badge.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q),
    );
  }, [options, search]);

  // Close on click outside or Escape
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Scroll active phase into view when opened
  useEffect(() => {
    if (open && activeOptionRef.current) {
      activeOptionRef.current.scrollIntoView({
        block: "nearest",
      });
    }
  }, [open]);

  const handleSelect = (phaseId: string) => {
    onChange(phaseId);
    setOpen(false);
    setSearch("");
  };

  const prevOption = currentIdx > 0 ? options[currentIdx - 1] : null;
  const nextOption =
    currentIdx < options.length - 1 ? options[currentIdx + 1] : null;

  return (
    <div ref={containerRef} className="relative space-y-2">
      {/* Main Trigger + Quick Prev/Next Controls */}
      <div className="flex items-stretch gap-1.5">
        <button
          id={id}
          type="button"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((prev) => !prev)}
          className={`flex-1 min-w-0 text-left rounded-xl bg-slate-950/90 border px-3 py-2.5 transition-all flex items-center justify-between gap-2.5 cursor-pointer shadow-sm ${
            open
              ? styles.openBorder
              : `border-slate-800 ${styles.triggerBorder}`
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`shrink-0 px-2 py-0.5 rounded-lg border text-[11px] font-mono font-bold ${styles.badge}`}
            >
              {selected?.badge ?? value}
            </span>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {selected?.title}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {selected?.countLabel} • {currentIdx + 1}/{options.length} faza
              </div>
            </div>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              open ? "rotate-180 text-white" : ""
            }`}
          />
        </button>

        {/* Quick Prev / Next Phase Stepper */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            disabled={!prevOption}
            onClick={() => prevOption && onChange(prevOption.id)}
            title={
              prevOption
                ? `Oldingi faza: ${prevOption.badge} — ${prevOption.title}`
                : "Birinchi faza"
            }
            className="h-full px-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={!nextOption}
            onClick={() => nextOption && onChange(nextOption.id)}
            title={
              nextOption
                ? `Keyingi faza: ${nextOption.badge} — ${nextOption.title}`
                : "Oxirgi faza"
            }
            className="h-full px-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Custom Dropdown Panel */}
      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-slate-700/90 bg-slate-950/98 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Search Input Header */}
          <div className="p-2.5 border-b border-slate-800/90 bg-slate-900/70 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Fazani qidirish (masalan: RAG, SQL, Phase 12)..."
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="p-1 rounded-md text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                Mos faza topilmadi.
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.id === value;
                return (
                  <button
                    key={option.id}
                    ref={isSelected ? activeOptionRef : null}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? styles.activeRow
                        : "border-transparent bg-slate-900/40 text-slate-300 hover:bg-slate-900 hover:border-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span
                        className={`mt-0.5 shrink-0 px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${
                          isSelected
                            ? styles.activeBadge
                            : "bg-slate-900 text-slate-300 border-slate-800"
                        }`}
                      >
                        {option.badge}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold leading-snug line-clamp-1">
                          {option.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                          <span>{option.countLabel}</span>
                          {option.hasPublished && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-sans font-medium">
                              Interactive Lab
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check
                        className={`w-4 h-4 shrink-0 ${styles.check}`}
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer hint */}
          <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between text-[10px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>Jami {options.length} ta bosqich</span>
            </span>
            <span>Yopish uchun Esc</span>
          </div>
        </div>
      )}
    </div>
  );
}
