"use client";

import React, { useState } from "react";
import {
  SPECIALIZATION_PATHS,
  DEPTH_META,
  type SpecializationId,
  type OnboardingProfile,
} from "@/lib/curriculum/paths";
import { useLearning } from "@/hooks/use-learning";
import {
  Sparkles,
  Cpu,
  Bot,
  Layers,
  Server,
  CheckCircle2,
  Compass,
  SlidersHorizontal,
  BookOpen,
  Eye,
  GraduationCap,
} from "lucide-react";

const PATH_ICONS = {
  sparkles: Sparkles,
  cpu: Cpu,
  bot: Bot,
  layers: Layers,
  server: Server,
} as const;

export interface SpecializationSelectorProps {
  compact?: boolean;
  onSelectPath?: (pathId: SpecializationId | null) => void;
}

export function SpecializationSelector({
  compact = false,
  onSelectPath,
}: SpecializationSelectorProps) {
  const { state, setSelectedPath, setOnboarding } = useLearning();
  const [showOnboarding, setShowOnboarding] = useState(false);

  const selectedPathId = state.selectedPathId;
  const activePath = SPECIALIZATION_PATHS.find((p) => p.id === selectedPathId) ?? null;

  const [draftOnboarding, setDraftOnboarding] = useState<OnboardingProfile>(
    state.onboarding ?? {
      currentLevel: "beginner",
      pythonComfort: "basic",
      mathComfort: "formulas",
      preferredStyle: "visual",
    },
  );

  const handleChoosePath = (id: SpecializationId | null) => {
    setSelectedPath(id);
    onSelectPath?.(id);
  };

  const handleSaveOnboarding = () => {
    setOnboarding(draftOnboarding);
    setShowOnboarding(false);
  };

  return (
    <div className="rounded-3xl bg-slate-900/70 border border-slate-800 p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Shaxsiy O‘quv Yo‘nalishi (Learning Path)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 tracking-tight">
            1. O‘z yo‘nalishingizni tanlang — tizim dars chuqurligini moslashtiradi
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
            Tanlangan mutaxassislik bo‘yicha asosiy mavzular{" "}
            <strong className="text-violet-300">Deep Learning Path (Understand / Master)</strong>{" "}
            darajasida, boshqa yo‘nalishlar esa vaqtingizni tejash uchun{" "}
            <strong className="text-cyan-300">Level 1 — Overview</strong> darajasida tavsiya etiladi.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {selectedPathId && (
            <button
              type="button"
              onClick={() => handleChoosePath(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
            >
              Barcha yo‘nalishlar
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowOnboarding((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/50 hover:bg-violet-900/50 text-violet-300 border border-violet-800/50 text-xs font-medium transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Darajani sozlash</span>
          </button>
        </div>
      </div>

      {/* Specialization Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SPECIALIZATION_PATHS.map((path) => {
          const Icon = PATH_ICONS[path.icon];
          const isSelected = selectedPathId === path.id;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => handleChoosePath(isSelected ? null : path.id)}
              className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                isSelected
                  ? "bg-violet-950/40 border-violet-500 shadow-lg shadow-violet-950/40"
                  : "bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                      isSelected
                        ? "bg-violet-600 text-white border-violet-400"
                        : "bg-slate-900 text-slate-300 border-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Tanlangan
                    </span>
                  )}
                </div>

                <div className="font-bold text-sm text-slate-100">{path.title}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {path.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="text-violet-300">{path.coreSlugs.length} Core dars</span>
                <span>+{path.supportingSlugs.length} tayanch</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Path Summary + Overview vs Deep Learning Path Comparison */}
      {activePath && (
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-violet-800/40 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 space-y-1">
            <div className="text-xs font-semibold text-violet-300">
              Tanlangan yo‘nalish: {activePath.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activePath.targetOutcome}
            </p>
          </div>
          <div className="md:col-span-3 p-3 rounded-xl bg-violet-950/30 border border-violet-800/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Deep Learning Path</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Tanlangan yo‘nalishdagi {activePath.coreSlugs.length} ta asosiy mavzuni{" "}
              <strong className="text-slate-200">Understand &amp; Master</strong> darajasida chuqur o‘rganish.
            </p>
          </div>
          <div className="md:col-span-3 p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
              <Eye className="w-3.5 h-3.5" />
              <span>Overview Mode</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Boshqa yo‘nalishlar haqida 3–5 daqiqalik{" "}
              <strong className="text-slate-200">Level 1 — Overview</strong> umumiy tushuncha.
            </p>
          </div>
        </div>
      )}

      {/* 3 Depth Levels Visual Legend (when not compact) */}
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {(["overview", "understand", "master"] as const).map((depth) => {
            const meta = DEPTH_META[depth];
            return (
              <div
                key={depth}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100">{meta.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-800">
                    {meta.estimatedMinutes}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{meta.summary}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Optional Skippable Onboarding Drawer */}
      {showOnboarding && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>Boshlang‘ich tajribangizni belgilang (ixtiyoriy — istalgan vaqt o‘zgartirish mumkin)</span>
            </div>
            <button
              type="button"
              onClick={() => setShowOnboarding(false)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Yopish
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <div className="text-slate-400 font-medium">1. AI bo‘yicha darajangiz:</div>
              {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() =>
                    setDraftOnboarding((prev) => ({ ...prev, currentLevel: lvl }))
                  }
                  className={`w-full text-left px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    draftOnboarding.currentLevel === lvl
                      ? "bg-violet-950/50 border-violet-500 text-violet-200 font-semibold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {lvl === "beginner"
                    ? "Boshlang‘ich (0 dan)"
                    : lvl === "intermediate"
                      ? "O‘rta (Asoslarni bilaman)"
                      : "Ilg‘or (Arxitektura va Math)"}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="text-slate-400 font-medium">2. Matematika bilan qulaylik:</div>
              {(["overview", "formulas", "derivations"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() =>
                    setDraftOnboarding((prev) => ({ ...prev, mathComfort: m }))
                  }
                  className={`w-full text-left px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    draftOnboarding.mathComfort === m
                      ? "bg-cyan-950/50 border-cyan-500 text-cyan-200 font-semibold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {m === "overview"
                    ? "Vizual va analogiya ustuvor"
                    : m === "formulas"
                      ? "Formulalar va sonli misollar"
                      : "To‘liq isbot va hosilalar"}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="text-slate-400 font-medium">3. O‘rganish uslubi:</div>
              {(["visual", "code", "math", "balanced"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() =>
                    setDraftOnboarding((prev) => ({ ...prev, preferredStyle: st }))
                  }
                  className={`w-full text-left px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    draftOnboarding.preferredStyle === st
                      ? "bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {st === "visual"
                    ? "Interaktiv Vizual & Animatsiya"
                    : st === "code"
                      ? "Amaliy Kod (NumPy / PyTorch)"
                      : st === "math"
                        ? "Matematik tahlil"
                        : "Muvozanatli (Barchasi)"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleSaveOnboarding}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold cursor-pointer"
            >
              Saqlash va qo‘llash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
