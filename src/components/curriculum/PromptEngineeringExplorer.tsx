"use client";

import React, { useMemo, useState } from "react";
import {
  PROMPT_ENGINEERING_PHASES,
  PROMPT_ENGINEERING_RESOURCES,
  PROMPT_ENGINEERING_ACCURACY_NOTES,
  SAMPLING_VERTICAL_SLICE,
  getPromptEngineeringPhaseRoleForTrack,
  getPromptEngineeringSummaryStats,
  type PromptEngineeringTrackId,
} from "@/lib/curriculum/prompt-engineering";
import { DEPTH_META, type LearningDepth } from "@/lib/curriculum/paths";
import { SamplingPlayground } from "@/components/visualizations/SamplingPlayground";
import { FormulaDisplay } from "@/components/visualizations/FormulaDisplay";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  Search,
  BookOpen,
  Code2,
  AlertTriangle,
  Link2,
  Sliders,
} from "lucide-react";

const TRACK_OPTIONS: Array<{ id: PromptEngineeringTrackId; label: string }> = [
  { id: "prompt-engineer", label: "Prompt Engineer (Asosiy)" },
  { id: "ai-engineer", label: "AI Engineer" },
  { id: "ml-engineer", label: "ML Engineer" },
  { id: "data-scientist", label: "Data Scientist" },
  { id: "python-developer", label: "Python Developer" },
  { id: "data-engineer", label: "Data Engineer" },
];

export interface PromptEngineeringExplorerProps {
  initialPhaseId?: string;
}

export function PromptEngineeringExplorer({
  initialPhaseId,
}: PromptEngineeringExplorerProps = {}) {
  const stats = useMemo(() => getPromptEngineeringSummaryStats(), []);

  const [selectedTrack, setSelectedTrack] =
    useState<PromptEngineeringTrackId>("prompt-engineer");
  const [selectedDepth, setSelectedDepth] = useState<LearningDepth>("understand");
  const [showDetour, setShowDetour] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(
    initialPhaseId || "pe-06"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showResources, setShowResources] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync URL function
  const syncUrl = (phaseId: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "prompt-eng");
    url.searchParams.set("phase", phaseId);
    window.history.replaceState(null, "", url.toString());
  };

  const handleSelectPhase = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    syncUrl(phaseId);
  };

  const handleShareLink = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "prompt-eng");
    url.searchParams.set("phase", selectedPhaseId);
    navigator.clipboard?.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // React to initialPhaseId prop change or URL deep-link
  React.useEffect(() => {
    if (initialPhaseId && PROMPT_ENGINEERING_PHASES.some((p) => p.id === initialPhaseId)) {
      setSelectedPhaseId(initialPhaseId);
    }
  }, [initialPhaseId]);

  const activePhase = useMemo(
    () =>
      PROMPT_ENGINEERING_PHASES.find((p) => p.id === selectedPhaseId) ??
      PROMPT_ENGINEERING_PHASES[5]!,
    [selectedPhaseId]
  );

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activePhase.lessons;
    return PROMPT_ENGINEERING_PHASES.flatMap((p) => p.lessons).filter(
      (l) =>
        l.id.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q) ||
        (l.candidateReuse?.existingLessonId.toLowerCase().includes(q) ?? false)
    );
  }, [activePhase, searchQuery]);

  const slice = SAMPLING_VERTICAL_SLICE;

  return (
    <section
      id="prompt-engineering-curriculum"
      className="rounded-3xl bg-slate-900/75 border border-violet-500/30 p-5 sm:p-7 space-y-7"
    >
      {/* Top Banner & Honest Status Counts */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-xs font-mono text-violet-300">
            <Sliders className="w-3.5 h-3.5" />
            <span>6-MUTAXASSISLIK YO‘NALISHI • PROMPT ENGINEERING (`pe-01` .. `pe-20`)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Prompt Engineering Specialist — 20 Bosqichli O‘quv Xaritasi va Sampling (`Temperature / Top-K / Top-P`) Vertikal Darsi
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Prompt anatomiyasi, Token budjeti, Temperature/Top-K/Top-P sampling matematikasi, Few-shot, Step-back, CoT/ToT, ReAct, Structured JSON Schema, AI Red Teaming (Prompt Injection himoyasi) va Calibration bo‘yicha{" "}
            <strong className="text-slate-200">{stats.totalLessons} ta mikro-dars</strong>{" "}
            rejasi. Shundan{" "}
            <strong className="text-emerald-300">
              {stats.publishedLessons} ta bog‘langan vertikal dars tuguni (`pe-06-06`, `pe-07-02`, `pe-07-04`)
            </strong>{" "}
            barcha 3 chuqurlik darajasida (Overview / Understand / Master) interaktiv React playground, Python dvigateli va Manim animatsiyasi bilan tayyorlandi; qolgan{" "}
            <strong className="text-amber-300">{stats.plannedLessons} ta mikro-dars</strong>{" "}
            esa halol ravishda <code>planned</code> maqomida saqlanadi.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="text-lg font-black text-violet-300">{stats.totalPhases}</div>
            <div className="text-[10px] font-mono text-slate-400">Bosqich (`pe-01..20`)</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="text-lg font-black text-slate-100">{stats.totalLessons}</div>
            <div className="text-[10px] font-mono text-slate-400">Mikro-dars rejasi</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
            <div className="text-lg font-black text-emerald-300">{stats.publishedLessons}</div>
            <div className="text-[10px] font-mono text-emerald-300/90">
              Published (`pe-06/07`)
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center">
            <div className="text-lg font-black text-amber-300">{stats.plannedLessons}</div>
            <div className="text-[10px] font-mono text-amber-300/90">Planned (Rejada)</div>
          </div>
        </div>
      </div>

      {/* 6-Track Perspective Switcher */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-bold text-slate-200">
            6 ta Kasbiy Yo‘nalish Bo‘yicha Moslashuvchan Chuqurlik (Shared Pathway)
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Reuse nomzodlari: {stats.candidateReuseCount} ta (`review_required_not_an_alias`)
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRACK_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTrack(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedTrack === t.id
                  ? "bg-violet-600 text-white border-violet-400 shadow-sm"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Vertical Slice: pe-06-06 / pe-07-02 / pe-07-04 */}
      <div className="rounded-3xl bg-slate-950/90 border border-emerald-500/35 p-5 sm:p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-300">
                PUBLISHED VERTICAL SLICE • {slice.lessonIds.join(" • ")}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300">
                Phases: pe-06 &amp; pe-07 (LLM Configuration &amp; Sampling)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-100">
              {slice.titleUz}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["overview", "understand", "master"] as const).map((depth) => {
              const meta = DEPTH_META[depth];
              const isActive = selectedDepth === depth;
              return (
                <button
                  key={depth}
                  type="button"
                  onClick={() => setSelectedDepth(depth)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-400"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  L{meta.levelNumber}: {meta.badge} ({meta.uzLabel}) •{" "}
                  {slice.estimatedMinutes[depth]} daq
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setShowDetour((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-xs font-bold text-amber-300 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tushunmadim (Tayanch darslar)</span>
            </button>
          </div>
        </div>

        {/* "Tushunmadim" Prerequisite Detour */}
        {showDetour && (
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-3">
            <div className="text-xs font-bold text-amber-300">
              «Tushunmadim» — Sampling va Softmax’ni tushunish uchun 4 ta tayanch mikro-dars:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {slice.detourPrerequisites.map((p) => (
                <div
                  key={p.lessonId}
                  className="p-3 rounded-xl bg-slate-950/90 border border-amber-800/40 space-y-1"
                >
                  <div className="text-xs font-mono font-bold text-amber-300">
                    {p.lessonId}
                  </div>
                  <div className="text-xs font-bold text-slate-100">{p.titleUz}</div>
                  <p className="text-[11px] text-slate-400">{p.whyNeededUz}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Depth Views */}
        {selectedDepth === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
                <BookOpen className="w-4 h-4" />
                <span>Level 1 — Overview: Oddiy so‘zlar bilan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {slice.overview.whatItIsUz}
              </p>
              <div className="p-3 rounded-xl bg-violet-950/30 border border-violet-800/40 text-xs text-violet-200">
                <strong>Analogiya:</strong> {slice.overview.analogyUz}
              </div>
            </div>
            <div className="lg:col-span-5 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="text-xs font-bold text-rose-300">
                Muhim chegara (Ehtiyot bo‘ling!)
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {slice.overview.cautionUz}
              </p>
            </div>
          </div>
        )}

        {selectedDepth === "understand" && (
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Sparkles className="w-4 h-4" />
              <span>Level 2 — Understand: 6 Qadamli Raqamli Tushuntirish</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {slice.understandSteps.map((st) => (
                <div
                  key={st.step}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
                >
                  <div className="text-xs font-bold text-cyan-300">{st.titleUz}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.bodyUz}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDepth === "master" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Code2 className="w-4 h-4" />
                <span>
                  Level 3 — Master: Stabil Softmax, Frequency Penalty va Chegaraviy Holatlar
                </span>
              </div>
              <FormulaDisplay
                title="Stabil Softmax va Frequency Penalty (pe-06-06 / pe-07-02 / pe-07-04)"
                symbolic="p_i = \frac{\exp\!\left((z_i - \max_k z_k) / T\right)}{\sum_j \exp\!\left((z_j - \max_k z_k) / T\right)}"
                substituted="z'_i = z_i - \alpha_{\text{freq}} \cdot c_i"
                context="c_i — tokenning oldingi kontekstda uchrash soni; max_k z_k ni ayirish juda kichik T qiymatlarida overflow xatosining oldini oladi."
              />
              <div className="space-y-1.5">
                {slice.master.edgeCasesUz.map((ec) => (
                  <div
                    key={ec}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    • {ec}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200">
                Python Dvigateli va Manim Animatsiyasi
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300">
                  Python: {slice.master.pythonEnginePath}
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
                  Manim: {slice.master.manimScriptPath}
                </div>
              </div>
              <video
                src={slice.master.manimVideoUrl}
                controls
                className="w-full rounded-xl border border-slate-800"
              />
            </div>
          </div>
        )}

        {/* Embedded Interactive Sampling Playground */}
        <SamplingPlayground />

        {/* 4 Checkpoints */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Tushunganni Tekshirish (Mini-Test: `pe-06-06` / `pe-07-02` / `pe-07-04`)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {slice.checkpoints.map((cp) => {
              const selectedIdx = quizAnswers[cp.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = selectedIdx === cp.correctIndex;
              return (
                <div
                  key={cp.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-violet-300 uppercase">Daraja: {cp.depth}</span>
                    {isAnswered && (
                      <span
                        className={
                          isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"
                        }
                      >
                        {isCorrect ? "✓ To‘g‘ri!" : "✗ Qayta o‘ylab ko‘ring"}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-100">{cp.questionUz}</div>
                  <div className="space-y-1.5">
                    {cp.optionsUz.map((opt, idx) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setQuizAnswers((prev) => ({ ...prev, [cp.id]: idx }))
                        }
                        className={`w-full text-left p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                          selectedIdx === idx
                            ? idx === cp.correctIndex
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                              : "bg-rose-950/60 border-rose-500 text-rose-200"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {isAnswered && (
                    <p className="text-[11px] text-slate-400 pt-1">{cp.explanationUz}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 20-Phase Curriculum Browser (`pe-01` .. `pe-20`) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-100">
              20 Bosqichli Prompt Engineering Reestri (`pe-01` .. `pe-20` • 313 ta mikro-dars)
            </h3>
            <p className="text-xs text-slate-400">
              Har bir bosqich uchun tanlangan yo‘nalish bo‘yicha rol (`Core`, `Supporting`, `Optional`) va tavsiya etilgan chuqurlik ko‘rsatilgan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="pe-06-06, Top-P, ReAct..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowResources((p) => !p)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-violet-300 cursor-pointer"
            >
              {showResources
                ? "Manbalarni yopish"
                : `Manbalar (${PROMPT_ENGINEERING_RESOURCES.length})`}
            </button>
          </div>
        </div>

        {/* Phase Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {PROMPT_ENGINEERING_PHASES.map((phase) => {
            const trackRole = getPromptEngineeringPhaseRoleForTrack(
              phase,
              selectedTrack
            );
            const isSelected = phase.id === selectedPhaseId;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  handleSelectPhase(phase.id);
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-violet-950/60 border-violet-400 shadow-md"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-violet-300">{phase.id}</span>
                    <span className="text-slate-400">{phase.lessons.length} dars</span>
                  </div>
                  <div className="text-xs font-bold text-slate-100 line-clamp-2">
                    {phase.title}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/70">
                  <span>{trackRole.labelUz}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Detail & Lesson List */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="space-y-1">
              <div className="text-xs font-mono text-violet-300">
                {searchQuery
                  ? `Qidiruv natijalari: "${searchQuery}" (${filteredLessons.length} ta dars)`
                  : `${activePhase.id} • Manba bo‘limlari: ${activePhase.sourceSections.join(", ")}`}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                {searchQuery ? "Barcha bosqichlar bo‘yicha mos darslar" : activePhase.title}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              {!searchQuery && (
                <div className="text-xs font-mono text-slate-400 hidden sm:block">
                  Vizual g‘oya: {activePhase.visualization.description} (
                  {activePhase.visualization.status})
                </div>
              )}
              <button
                type="button"
                onClick={handleShareLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-violet-500/60 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
                title="Faza havolasini nusxalash"
              >
                <Link2 className="w-3.5 h-3.5 text-violet-400" />
                <span>{copiedLink ? "Havola nusxalandi! 🔗" : "Ulashish"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredLessons.map((lesson) => {
              const isPublished = lesson.status === "published";
              return (
                <div
                  key={lesson.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between gap-2 ${
                    isPublished
                      ? "bg-emerald-950/35 border-emerald-500/50"
                      : "bg-slate-900/70 border-slate-800/90"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-violet-300">
                        {lesson.id}
                      </span>
                      {isPublished ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          published (3/3)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-400">
                          <Clock className="w-3 h-3" />
                          planned
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-100">
                      {lesson.title}
                    </div>
                  </div>

                  {lesson.candidateReuse && (
                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                      <span className="inline-flex items-center gap-1">
                        <Link2 className="w-3 h-3" />
                        Overlap: {lesson.candidateReuse.existingCurriculum} (
                        {lesson.candidateReuse.existingLessonId})
                      </span>
                      <span className="text-slate-500">advisory</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Unverified External Resource Titles */}
        {showResources && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>
                Foydalanuvchi sanagan 13 ta manba nomi (`urlStatus: not_supplied_or_live_verified`)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PROMPT_ENGINEERING_RESOURCES.map((res) => (
                <div
                  key={res.id}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 space-y-0.5"
                >
                  <div className="font-semibold">{res.title}</div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Bo‘lim {res.sourceSection} • {res.urlStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accuracy Guardrails */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
          {PROMPT_ENGINEERING_ACCURACY_NOTES.map((note) => (
            <span
              key={note}
              className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800"
            >
              • {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
