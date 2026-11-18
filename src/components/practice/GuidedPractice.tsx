"use client";

import React, { useState, useMemo } from "react";
import type { LessonPractice } from "@/lib/practice/types";
import { ExampleViewer } from "./ExampleViewer";
import { PracticeLab, type PracticeResultInfo } from "./PracticeLab";
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
} from "lucide-react";

export interface GuidedPracticeProps {
  practice: LessonPractice;
  initialCode?: string;
  initialSubStep?: "theory" | "examples" | "exercise";
  hideHeaderSteps?: boolean;
  onCompleted?: (result: PracticeResultInfo) => void;
  className?: string;
}

export function GuidedPractice({
  practice,
  initialCode,
  initialSubStep = "theory",
  hideHeaderSteps = false,
  onCompleted,
  className = "",
}: GuidedPracticeProps) {
  const [subStep, setSubStep] = useState<"theory" | "examples" | "exercise">(
    hideHeaderSteps ? "exercise" : initialSubStep
  );
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);

  const availableExercises = useMemo(() => {
    if (practice.exercises && practice.exercises.length > 0) {
      return practice.exercises;
    }
    return [practice.exercise];
  }, [practice]);

  const activeExercise =
    availableExercises[selectedExerciseIndex] ?? availableExercises[0]!;

  const handleExerciseCompleted = (info: PracticeResultInfo) => {
    setIsPassed(true);
    onCompleted?.(info);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Mini-Stepper: 1. Nazariya -> 2. Namunalar -> 3. Kod yozish (hidden if parent is already in practice step) */}
      {!hideHeaderSteps && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Amaliy O‘rganish Bosqichlari:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSubStep("theory")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                subStep === "theory"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              1. Nazariy Asos
            </button>

            <button
              type="button"
              onClick={() => setSubStep("examples")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                subStep === "examples"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              2. Namunaviy Misollar (2 ta)
            </button>

            <button
              type="button"
              onClick={() => setSubStep("exercise")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                subStep === "exercise"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : isPassed
                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-600/50"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>3. Amaliy Kod Yozish (Laboratoriya)</span>
              {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>
      )}

      {/* SubStep 1: Theory */}
      {subStep === "theory" && (
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>O‘quv Maqsadi va Qisqa Nazariya</span>
            </h4>
            <button
              type="button"
              onClick={() => setSubStep("examples")}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <span>Misollarni ko‘rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-cyan-200">
            🎯 <strong>Dars Maqsadi:</strong> {practice.objectiveUz}
          </div>

          <div className="space-y-3">
            {practice.theorySteps.map((step) => (
              <div
                key={step.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
              >
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {step.title}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.bodyMdx}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubStep 2: Two Examples */}
      {subStep === "examples" && (
        <div className="space-y-4">
          <ExampleViewer examples={practice.examples} />
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setSubStep("exercise")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <span>O‘zingiz sinab ko‘ring (Kod yozish)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SubStep 3: Interactive Practice Lab with Progressive Difficulty Selector */}
      {subStep === "exercise" && (
        <div className="space-y-4">
          {availableExercises.length > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Qiyinlik darajasini tanlang:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {availableExercises.map((ex, idx) => {
                  const isSelected = selectedExerciseIndex === idx;
                  const difficultyBadge =
                    ex.difficulty === "starter"
                      ? "🟢 1-daraja: Oson (Starter)"
                      : ex.difficulty === "core"
                      ? "🟡 2-daraja: O‘rta (Core)"
                      : "🔴 3-daraja: Qiyin (Challenge)";
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => setSelectedExerciseIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-violet-600 text-white shadow-md shadow-violet-900/40 ring-1 ring-violet-400"
                          : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {difficultyBadge}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <PracticeLab
            key={activeExercise.id}
            exercise={activeExercise}
            lessonId={practice.lessonId}
            depth={practice.depth}
            initialCode={initialCode}
            onCompleted={handleExerciseCompleted}
          />
        </div>
      )}
    </div>
  );
}
