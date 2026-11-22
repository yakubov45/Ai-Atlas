"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  STANFORD_CME295_LECTURES,
  TRANSFORMER_CME295_LESSONS,
  getTransformerLessonById,
} from "@/lib/curriculum/transformers-cme295";
import { TRANSFORMER_TERM_DICTIONARY } from "@/lib/curriculum/transformers-cme295-terms";
import type { ColoredTermDictionary } from "@/lib/curriculum/colored-terms-engine";
import {
  ColoredTermsLegend,
  ColoredTermText,
} from "@/components/curriculum/ColoredTermText";
import { TransformersCme295Visuals } from "@/components/visualizations/TransformersCme295Visuals";
import { MathBlock } from "@/components/mdx/MathBlock";
import { PracticeLab } from "@/components/practice/PracticeLab";
import { KnowledgeRelationshipsButton } from "@/components/lessons/KnowledgeRelationshipsPanel";
import { getShuffledQuizOptions } from "@/lib/curriculum/quiz-utils";
import { useLearning } from "@/hooks/use-learning";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  ExternalLink,
  FlaskConical,
  HelpCircle,
  Layers,
  Lightbulb,
  Palette,
  Play,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

const TR_DICT = TRANSFORMER_TERM_DICTIONARY as unknown as ColoredTermDictionary<string>;

type FocusTab = "all" | "theory" | "visual" | "math-code" | "practice";

export interface TransformersCme295ExplorerProps {
  initialLessonId?: string;
}

export function TransformersCme295Explorer({
  initialLessonId = "tr-01-tokenization-bpe",
}: TransformersCme295ExplorerProps) {
  const {
    isMicroLessonCompleted,
    toggleMicroLessonCompleted,
    setMicroLessonCompleted,
  } = useLearning();

  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [outlineOpen, setOutlineOpen] = useState<boolean>(false);
  const [showTermsLegend, setShowTermsLegend] = useState<boolean>(false);
  const [videoOpen, setVideoOpen] = useState<boolean>(true);
  const [focusTab, setFocusTab] = useState<FocusTab>("all");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lesson");
    if (q && getTransformerLessonById(q)) {
      setActiveLessonId(q);
    }
  }, []);

  const lesson = useMemo(
    () => getTransformerLessonById(activeLessonId) ?? TRANSFORMER_CME295_LESSONS[0]!,
    [activeLessonId],
  );

  const currentLecture = useMemo(
    () =>
      STANFORD_CME295_LECTURES.find(
        (lec) => lec.lectureNumber === lesson.lectureNumber,
      ) ?? STANFORD_CME295_LECTURES[0]!,
    [lesson.lectureNumber],
  );

  const currentIdx = useMemo(
    () => TRANSFORMER_CME295_LESSONS.findIndex((l) => l.id === lesson.id),
    [lesson.id],
  );

  const completedCount = useMemo(
    () =>
      TRANSFORMER_CME295_LESSONS.filter((l) => isMicroLessonCompleted(l.id)).length,
    [isMicroLessonCompleted],
  );

  const progressPct = Math.round(
    (completedCount / TRANSFORMER_CME295_LESSONS.length) * 100,
  );

  const shuffledQuizOptions = useMemo(
    () =>
      getShuffledQuizOptions(
        lesson.id,
        lesson.quiz.options,
        lesson.quiz.correctIndex,
      ),
    [lesson.id, lesson.quiz.options, lesson.quiz.correctIndex],
  );

  const selectLesson = (id: string) => {
    setActiveLessonId(id);
    setSelectedQuizOption(null);
    setCopiedCode(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lesson", id);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const selectLectureFirstLesson = (lectureNum: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    const first = TRANSFORMER_CME295_LESSONS.find(
      (l) => l.lectureNumber === lectureNum,
    );
    if (first) selectLesson(first.id);
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(lesson.pytorchSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Clipboard unavailable in restricted contexts
    }
  };

  const prevLesson = currentIdx > 0 ? TRANSFORMER_CME295_LESSONS[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < TRANSFORMER_CME295_LESSONS.length - 1
      ? TRANSFORMER_CME295_LESSONS[currentIdx + 1]
      : null;

  const isDone = isMicroLessonCompleted(lesson.id);

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
      {/* Top Module Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-[#11091f] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-300">
              <Layers className="h-3.5 w-3.5" />
              <span>Stanford CME 295 • 7 Ta Ma&apos;ruza • 24 Mikro-dars</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Transformers &amp; Large Language Models
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <ColoredTermText
                dictionary={TR_DICT}
                text="Afshine va Shervin Amidi ning Stanford 1–7 ma'ruzalari asosida: Tokenization va BPE, Self-Attention, BERT vs GPT, Scaling Laws, MoE, RoPE/GQA/RMSNorm, Pre-Training (BPB), SFT/LoRA, PPO/GRPO/DAPO va On-Policy Distillation, FlashAttention/5D Parallelism/Speculative Decoding, Hybrid RAG/MCP/Harness hamda Pass@K/LLM-as-a-Judge/Bench Maxing — barchasi ajratilgan rangli terminlar va interaktiv mashqlar bilan."
              />
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0 w-full sm:w-auto">
            <div className="w-full sm:w-56 rounded-2xl border border-slate-800 bg-black/40 p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Modul progressi</span>
                <span className="font-mono font-bold text-emerald-300">
                  {completedCount}/{TRANSFORMER_CME295_LESSONS.length} ({progressPct}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7 Lecture Switcher Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {STANFORD_CME295_LECTURES.map((lec) => {
            const active = lec.lectureNumber === lesson.lectureNumber;
            const countInLecture = TRANSFORMER_CME295_LESSONS.filter(
              (l) => l.lectureNumber === lec.lectureNumber,
            ).length;
            return (
              <button
                key={lec.lectureNumber}
                type="button"
                onClick={() => selectLectureFirstLesson(lec.lectureNumber)}
                className={`rounded-xl border p-3 text-left transition cursor-pointer ${
                  active
                    ? "border-violet-400 bg-violet-500/15 text-white"
                    : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-violet-300">
                  {lec.lectureNumber}-Ma&apos;ruza • {countInLecture} ta dars
                </div>
                <div className="text-xs font-bold mt-0.5 line-clamp-1">
                  {lec.titleUz.replace(/^\d+-Ma'ruza:\s*/, "")}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setOutlineOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white hover:border-cyan-400/50 transition-colors cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>Darslar ro&apos;yxati ({TRANSFORMER_CME295_LESSONS.length} mikro-dars)</span>
            {outlineOpen ? (
              <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowTermsLegend((s) => !s)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              showTermsLegend
                ? "border-violet-400/60 bg-violet-500/20 text-violet-200"
                : "border-slate-700 bg-slate-900/90 text-slate-200 hover:border-violet-400/50"
            }`}
          >
            <Palette className="h-4 w-4 text-violet-300" />
            <span>Rangli Terminlar Lug&apos;ati ({TRANSFORMER_TERM_DICTIONARY.terms.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setVideoOpen((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              videoOpen
                ? "border-rose-400/60 bg-rose-500/20 text-rose-200"
                : "border-slate-700 bg-slate-900/90 text-slate-200 hover:border-rose-400/50"
            }`}
          >
            <Video className="h-4 w-4 text-rose-300" />
            <span>{videoOpen ? "Video Blokni Yopish" : "Ma'ruza Videosi"}</span>
          </button>

          <KnowledgeRelationshipsButton
            entityId={lesson.id}
            fallbackMeta={{ title: lesson.titleUz }}
          />
        </div>

        {/* Lecture Video Slot (Embeds automatically once youtubeId is provided) */}
        {videoOpen && (
          <div className="rounded-2xl border border-rose-500/30 bg-black/50 p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  <Play className="h-3.5 w-3.5" />
                  <span>{currentLecture.speakers}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">
                  {currentLecture.titleUz}
                </h2>
              </div>
              {currentLecture.youtubeUrl ? (
                <a
                  href={currentLecture.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-rose-400/50"
                >
                  <span>YouTube&apos;da ochish</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="rounded-full border border-rose-400/30 bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-200">
                  Video havolasi kutilmoqda
                </span>
              )}
            </div>

            {currentLecture.youtubeId ? (
              <div className="space-y-1.5">
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${currentLecture.youtubeId}?rel=0`}
                    title={currentLecture.titleUz}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  {currentLecture.placeholderNoteUz} Agar muallif tomonidan sayt ichida ijro etish cheklangan bo&apos;lsa, yuqoridagi <strong className="text-slate-200">&laquo;YouTube&apos;da ochish&raquo;</strong> tugmasi orqali to&apos;g&apos;ridan-to&apos;g&apos;ri tomosha qilishingiz mumkin.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-dashed border-rose-500/30 bg-slate-950/70 p-3.5 text-xs text-slate-300">
                <span>{currentLecture.placeholderNoteUz}</span>
                <span className="font-mono text-[11px] text-slate-500 shrink-0">
                  Manba: {currentLecture.sourceFile}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Collapsible Outline Drawer */}
        {outlineOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
            {TRANSFORMER_CME295_LESSONS.map((item) => {
              const active = item.id === lesson.id;
              const done = isMicroLessonCompleted(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    selectLesson(item.id);
                    setOutlineOpen(false);
                  }}
                  className={`flex items-center justify-between gap-2 rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    active
                      ? "border-violet-400 bg-violet-500/15 text-white"
                      : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <span>#{String(item.order).padStart(2, "0")}</span>
                      <span>• {item.lectureNumber}-ma&apos;ruza</span>
                      <span>• {item.estimatedMinutes} daq</span>
                    </div>
                    <div className="truncate text-xs font-bold mt-0.5">
                      {item.titleUz}
                    </div>
                  </div>
                  {done && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Terms Color Legend Drawer */}
        {showTermsLegend && (
          <div className="pt-2 border-t border-slate-800/80">
            <ColoredTermsLegend
              dictionary={TR_DICT}
              titleUz="Transformer & LLM Terminlari Rang Kodlari (bosib izohni o'qing)"
            />
          </div>
        )}
      </div>

      {/* Active Lesson Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-violet-500/15 border border-violet-500/30 px-2 py-0.5 font-mono font-bold text-violet-300">
                Mikro-dars #{lesson.order} / {TRANSFORMER_CME295_LESSONS.length} • {lesson.lectureNumber}-Ma&apos;ruza
              </span>
              <span className="text-slate-400">• ~{lesson.estimatedMinutes} daqiqa</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {lesson.titleUz}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">{lesson.subtitleEn}</p>
          </div>

          <button
            type="button"
            onClick={() => toggleMicroLessonCompleted(lesson.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
              isDone
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-200"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-400/50"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isDone ? "Tugatildi ✓" : "Tugatilgan deb belgilash"}</span>
          </button>
        </div>

        {/* Section Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "Barchasi (Ketma-ket)" },
            { id: "theory", label: "1. Sodda Tushuntirish" },
            { id: "visual", label: "2. Interaktiv Vizualizatsiya" },
            { id: "math-code", label: "3. Matematika & PyTorch" },
            { id: "practice", label: "4. Amaliy Kod & Test" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFocusTab(tab.id as FocusTab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                focusTab === tab.id
                  ? "bg-violet-500/20 border border-violet-400/50 text-violet-200"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: Analogiya, Nazariya & Key Insight */}
        {(focusTab === "all" || focusTab === "theory") && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Lightbulb className="h-4 w-4" />
                <span>Hayotiy Analogiya</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-100">
                <ColoredTermText text={lesson.analogyUz} dictionary={TR_DICT} />
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span>Ma&apos;ruza Tushuntirishi (rangli terminlarni bosib izohini o&apos;qing)</span>
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                {lesson.theoryParagraphsUz.map((paragraph, idx) => (
                  <p key={idx}>
                    <ColoredTermText text={paragraph} dictionary={TR_DICT} />
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-r from-violet-950/30 via-slate-900 to-emerald-950/30 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Muhim Muhandislik Xulosasi</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">
                {lesson.keyInsightUz.highlightUz}
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                <ColoredTermText text={lesson.keyInsightUz.explanationUz} dictionary={TR_DICT} />
              </p>
            </div>
          </section>
        )}

        {/* SECTION 2: Interaktiv Vizualizatsiya */}
        {(focusTab === "all" || focusTab === "visual") && (
          <section className="rounded-2xl border border-violet-500/25 bg-slate-900/50 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <FlaskConical className="h-4 w-4 text-violet-400" />
              <span>{lesson.visualTitleUz}</span>
            </div>
            <TransformersCme295Visuals visualId={lesson.visualId} />
          </section>
        )}

        {/* SECTION 3: Matematika & PyTorch Kodi */}
        {(focusTab === "all" || focusTab === "math-code") && (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5 space-y-2">
              <h3 className="text-sm font-bold text-white">Matematik Formula</h3>
              <MathBlock
                math={lesson.formulaLatex}
                explanation={lesson.formulaNoteUz}
              />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-fuchsia-400" />
                  <span>Python / PyTorch Kodi</span>
                </h3>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-slate-500 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" /> Nusxalandi
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Nusxa olish
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-black/70 p-3.5 text-xs font-mono leading-relaxed text-emerald-200">
                <code>{lesson.pytorchSnippet}</code>
              </pre>
            </div>
          </section>
        )}

        {/* SECTION 4: Amaliy Kod (Pyodide) & Checkpoint Test */}
        {(focusTab === "all" || focusTab === "practice") && (
          <section className="space-y-5">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="h-4 w-4 text-emerald-400" />
                <span>Amaliy Kodlash Mashqi (Brauzerda Ishlaydi)</span>
              </h3>
              <PracticeLab
                exercise={lesson.exercise}
                lessonId={lesson.id}
                onCompleted={(res) => {
                  if (res.testsPassed) {
                    setMicroLessonCompleted(lesson.id, true);
                  }
                }}
              />
            </div>

            <div className="rounded-2xl border border-violet-500/25 bg-violet-500/[0.04] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-200">
                <HelpCircle className="h-4 w-4 text-violet-400" />
                <span>Bilimni Tekshirish (Checkpoint Test)</span>
              </div>
              <p className="text-sm font-medium text-white">
                <ColoredTermText text={lesson.quiz.questionUz} dictionary={TR_DICT} />
              </p>

              <div className="grid gap-2 sm:grid-cols-2">
                {shuffledQuizOptions.map((opt, idx) => {
                  const chosen = selectedQuizOption === idx;
                  const showResult = selectedQuizOption !== null;
                  const cls = !showResult
                    ? "border-slate-800 bg-slate-900/70 text-slate-200 hover:border-violet-400/50"
                    : opt.isCorrect
                    ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-200"
                    : chosen
                    ? "border-rose-500/60 bg-rose-500/15 text-rose-200"
                    : "border-slate-800/60 bg-slate-900/40 text-slate-400";
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedQuizOption(idx)}
                      className={`rounded-xl border p-3 text-left text-xs leading-relaxed transition cursor-pointer ${cls}`}
                    >
                      <span className="font-mono font-bold mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {selectedQuizOption !== null && (
                <div className="rounded-xl border border-slate-700 bg-black/50 p-3 text-xs leading-relaxed text-slate-200">
                  <strong className="text-emerald-300">Izoh: </strong>
                  <ColoredTermText text={lesson.quiz.explanationUz} dictionary={TR_DICT} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          {prevLesson ? (
            <button
              type="button"
              onClick={() => selectLesson(prevLesson.id)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-violet-400/50 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-violet-400" />
              <span>
                Oldingi: #{prevLesson.order} {prevLesson.titleUz}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              type="button"
              onClick={() => selectLesson(nextLesson.id)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-xs font-extrabold text-white hover:bg-violet-400 cursor-pointer"
            >
              <span>
                Keyingi: #{nextLesson.order} {nextLesson.titleUz}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-bold text-emerald-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Stanford CME 295 ({STANFORD_CME295_LECTURES.length} Ma&apos;ruza / {TRANSFORMER_CME295_LESSONS.length} Dars) yakunlandi!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
