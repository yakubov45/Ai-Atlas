"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Database,
  Cpu,
  LineChart,
  Network,
  Server,
  CheckCircle2,
  Circle,
  ArrowRight,
  ExternalLink,
  Target,
  Clock,
  BookOpen,
} from "lucide-react";
import type { KnowledgeConcept } from "@/lib/knowledge-graph/types";
import {
  LEARNING_GOAL_PRESETS,
  generateLearningPath,
} from "@/lib/knowledge-graph/learning-paths";
import { CANONICAL_CONCEPTS, getConceptById } from "@/lib/knowledge-graph/concepts";

export interface LearningPathViewProps {
  onSelectConcept: (concept: KnowledgeConcept) => void;
  knownConceptIds: readonly string[];
  completedLessonIds: readonly string[];
  onToggleKnown: (conceptId: string) => void;
}

const PRESET_ICONS: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  database: Database,
  bot: Bot,
  cpu: Cpu,
  "line-chart": LineChart,
  network: Network,
  server: Server,
};

export function LearningPathView({
  onSelectConcept,
  knownConceptIds,
  completedLessonIds,
  onToggleKnown,
}: LearningPathViewProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("goal-transformers");
  const [customTargetId, setCustomTargetId] = useState<string>("");

  // Determine active target concept ID
  const activeTargetId = useMemo(() => {
    if (customTargetId) return customTargetId;
    const preset = LEARNING_GOAL_PRESETS.find((p) => p.id === selectedPresetId);
    return preset ? preset.targetConceptId : "transformer-architecture";
  }, [customTargetId, selectedPresetId]);

  // Generate personalized learning path
  const path = useMemo(() => {
    return generateLearningPath(
      activeTargetId,
      knownConceptIds,
      completedLessonIds,
      customTargetId ? undefined : selectedPresetId
    );
  }, [activeTargetId, knownConceptIds, completedLessonIds, customTargetId, selectedPresetId]);

  const activePreset = LEARNING_GOAL_PRESETS.find((p) => p.id === selectedPresetId);

  return (
    <div className="space-y-8">
      {/* Goal Presets Shelf */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-violet-400" />
            Tayyor Maqsadli O&apos;quv Yo&apos;llari
          </h3>
          <span className="text-xs text-slate-400">Kerakli maqsadni tanlang</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEARNING_GOAL_PRESETS.map((preset) => {
            const Icon = PRESET_ICONS[preset.icon] ?? Sparkles;
            const isSelected = selectedPresetId === preset.id && !customTargetId;

            return (
              <button
                key={preset.id}
                onClick={() => {
                  setCustomTargetId("");
                  setSelectedPresetId(preset.id);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-violet-950/60 border-violet-500 ring-2 ring-violet-500/30 shadow-lg"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-lg bg-slate-800 text-violet-400">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      ~{preset.estimatedHours} soat
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-snug">
                    {preset.titleUz}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.descriptionUz}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-violet-400 font-medium">
                  {preset.category}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Concept Picker */}
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-200">
            Yoki xaritadagi ixtiyoriy tushunchani maqsad qilib belgilang:
          </span>
          <p className="text-slate-400 text-[11px]">
            Tizim avtomatik ravishda barcha tayanch bilimlarni saralab, shaxsiy yo&apos;l hosil qiladi.
          </p>
        </div>

        <select
          value={customTargetId}
          onChange={(e) => setCustomTargetId(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-violet-500 outline-none w-full sm:w-auto min-w-[240px]"
        >
          <option value="">-- Standart maqsadlardan tanlash --</option>
          {CANONICAL_CONCEPTS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameUz} ({c.name})
            </option>
          ))}
        </select>
      </div>

      {/* Generated Path Output */}
      {path && (
        <div className="space-y-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
          {/* Path Header & Progress Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Shaxsiy Yo&apos;l Rejasi
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Maqsad: {path.targetConcept.nameUz}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-white">
                  {path.completedSteps} / {path.totalSteps} qadam ({path.progressPercentage}%)
                </span>
                <p className="text-xs text-slate-400">o&apos;zlashtirilgan</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-violet-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${path.progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Stepper list */}
          <div className="space-y-3">
            {path.orderedSteps.map((step) => {
              const isNext = step.recommendedNext;

              return (
                <div
                  key={step.concept.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    step.isCompleted
                      ? "bg-slate-950/40 border-emerald-500/30 text-slate-300"
                      : isNext
                      ? "bg-violet-950/40 border-violet-500/80 ring-1 ring-violet-500/50 shadow-md shadow-violet-950/40"
                      : "bg-slate-950/60 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Step number badge */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                        step.isCompleted
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : isNext
                          ? "bg-violet-600 text-white animate-pulse"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {step.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        step.stepNumber
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white">{step.concept.nameUz}</h4>
                        <span className="text-xs text-slate-400 font-mono">
                          ({step.concept.name})
                        </span>
                        {isNext && (
                          <span className="px-2 py-0.5 bg-violet-600 text-white rounded-full text-[10px] font-bold tracking-wide uppercase">
                            Keyingi tavsiya
                          </span>
                        )}
                        {step.isTarget && (
                          <span className="px-2 py-0.5 bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 rounded-full text-[10px] font-semibold">
                            Yakuniy Maqsad
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1 leading-relaxed">
                        {step.concept.summaryUz}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0 text-xs">
                    <button
                      onClick={() => onToggleKnown(step.concept.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                      title={step.isCompleted ? "O'zlashtirilgan" : "Bilaman deb belgilash"}
                    >
                      {step.isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Bilaman</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-500" />
                          <span>Bilaman deb belgilash</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectConcept(step.concept)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                    >
                      Tushuntirish
                    </button>

                    {step.primaryLessonLink && (
                      <Link
                        href={step.primaryLessonLink.href}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                          isNext
                            ? "bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-950"
                            : "bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Darsga o&apos;tish</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
