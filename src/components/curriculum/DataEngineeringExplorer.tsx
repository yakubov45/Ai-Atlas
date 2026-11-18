"use client";

import React, { useMemo, useState } from "react";
import {
  DATA_ENGINEERING_PHASES,
  DATA_ENGINEERING_RESOURCES,
  DATA_ENGINEERING_SPECIAL_NOTES,
  ETL_VS_ELT_VERTICAL_SLICE,
  getDataEngineeringPhaseRoleForTrack,
  getDataEngineeringSummaryStats,
  type DataEngineeringTrackId,
} from "@/lib/curriculum/data-engineering";
import { DEPTH_META, type LearningDepth } from "@/lib/curriculum/paths";
import { ETLvsELTLab } from "@/components/visualizations/ETLvsELTLab";
import {
  Database,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  Search,
  Sparkles,
  BookOpen,
  Code2,
  AlertTriangle,
  Link2,
} from "lucide-react";

const TRACK_OPTIONS: Array<{ id: DataEngineeringTrackId; label: string }> = [
  { id: "data-engineer", label: "Data Engineer (Asosiy)" },
  { id: "ai-engineer", label: "AI Engineer" },
  { id: "ml-engineer", label: "ML Engineer" },
  { id: "data-scientist", label: "Data Scientist" },
  { id: "python-developer", label: "Python Developer" },
];

export interface DataEngineeringExplorerProps {
  initialPhaseId?: string;
}

export function DataEngineeringExplorer({
  initialPhaseId,
}: DataEngineeringExplorerProps = {}) {
  const stats = useMemo(() => getDataEngineeringSummaryStats(), []);

  const [selectedTrack, setSelectedTrack] =
    useState<DataEngineeringTrackId>("data-engineer");
  const [selectedDepth, setSelectedDepth] = useState<LearningDepth>("understand");
  const [showDetour, setShowDetour] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(
    initialPhaseId || "de-11"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showResources, setShowResources] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync URL function
  const syncUrl = (phaseId: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", "data-eng");
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
    url.searchParams.set("tab", "data-eng");
    url.searchParams.set("phase", selectedPhaseId);
    navigator.clipboard?.writeText(url.toString()).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // React to initialPhaseId prop change or URL deep-link
  React.useEffect(() => {
    if (initialPhaseId && DATA_ENGINEERING_PHASES.some((p) => p.id === initialPhaseId)) {
      setSelectedPhaseId(initialPhaseId);
    }
  }, [initialPhaseId]);

  // Checkpoint quiz answers
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const activePhase = useMemo(
    () =>
      DATA_ENGINEERING_PHASES.find((p) => p.id === selectedPhaseId) ??
      DATA_ENGINEERING_PHASES[10]!,
    [selectedPhaseId]
  );

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activePhase.lessons;
    return DATA_ENGINEERING_PHASES.flatMap((p) => p.lessons).filter(
      (l) =>
        l.id.toLowerCase().includes(q) ||
        l.title.toLowerCase().includes(q) ||
        (l.reuseCandidate?.contentId.toLowerCase().includes(q) ?? false)
    );
  }, [activePhase, searchQuery]);

  const slice = ETL_VS_ELT_VERTICAL_SLICE;

  return (
    <section
      id="data-engineering-curriculum"
      className="rounded-3xl bg-slate-900/75 border border-cyan-500/30 p-5 sm:p-7 space-y-7"
    >
      {/* Top Banner & Honest Status Counts */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
            <Database className="w-3.5 h-3.5" />
            <span>5-MUTAXASSISLIK YO‘NALISHI • DATA ENGINEERING (`de-01` .. `de-20`)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Data Engineer — 20 Bosqichli O‘quv Xaritasi va ETL vs ELT Vertikal Darsi
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Manbadan (Ingestion) boshlab Data Warehouse, Lakehouse (Iceberg/Delta), Kafka, Spark, dbt, Airflow va Multimodal RAG Data Pipeline’gacha bo‘lgan{" "}
            <strong className="text-slate-200">{stats.totalLessons} ta mikro-dars</strong>{" "}
            rejasi. Shundan{" "}
            <strong className="text-emerald-300">
              {stats.publishedLessons} ta vertikal namuna (`de-11-08`: ETL vs ELT)
            </strong>{" "}
            barcha 3 chuqurlik darajasida (Overview / Understand / Master) to‘liq interaktiv laboratoriya, Python dvigateli va Manim animatsiyasi bilan tayyorlandi; qolgan{" "}
            <strong className="text-amber-300">{stats.plannedLessons} ta mikro-dars</strong>{" "}
            esa halol ravishda <code>planned</code> maqomida saqlanadi.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="text-lg font-black text-cyan-300">{stats.totalPhases}</div>
            <div className="text-[10px] font-mono text-slate-400">Bosqich (`de-01..20`)</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="text-lg font-black text-slate-100">{stats.totalLessons}</div>
            <div className="text-[10px] font-mono text-slate-400">Mikro-dars rejasi</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center">
            <div className="text-lg font-black text-emerald-300">{stats.publishedLessons}</div>
            <div className="text-[10px] font-mono text-emerald-300/90">Published (`de-11-08`)</div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center">
            <div className="text-lg font-black text-amber-300">{stats.plannedLessons}</div>
            <div className="text-[10px] font-mono text-amber-300/90">Planned (Rejada)</div>
          </div>
        </div>
      </div>

      {/* Track Role Perspective Selector */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-bold text-slate-200">
            5 ta Kasbiy Yo‘nalish Bo‘yicha Moslashuvchan Chuqurlik (Shared Pathway)
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Reuse nomzodlari: {stats.reuseCandidateCount} ta (`human_review_required_no_auto_alias`)
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
                  ? "bg-cyan-600 text-white border-cyan-400 shadow-sm"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Vertical Slice: de-11-08 (ETL vs ELT) */}
      <div className="rounded-3xl bg-slate-950/90 border border-emerald-500/35 p-5 sm:p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[11px] font-mono font-bold text-emerald-300">
                PUBLISHED VERTICAL SLICE • {slice.lessonId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-300">
                Phase: {slice.phaseId} (Ingestion Patterns)
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-100">
              {slice.titleUz}
            </h3>
          </div>

          {/* 3 Depth Switcher + "Tushunmadim" Button */}
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
                  L{meta.levelNumber}: {meta.badge} ({ meta.uzLabel }) • {slice.estimatedMinutes[depth]} daq
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

        {/* "Tushunmadim" Detour Drawer */}
        {showDetour && (
          <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 space-y-3">
            <div className="text-xs font-bold text-amber-300">
              «Tushunmadim» — `de-11-08` ni oson tushunish uchun 4 ta tayanch mikro-dars:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {slice.detourPrerequisites.map((p) => (
                <div
                  key={p.lessonId}
                  className="p-3 rounded-xl bg-slate-950/90 border border-amber-800/40 space-y-1"
                >
                  <div className="text-xs font-mono font-bold text-amber-300">{p.lessonId}</div>
                  <div className="text-xs font-bold text-slate-100">{p.titleUz}</div>
                  <p className="text-[11px] text-slate-400">{p.whyNeededUz}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Depth Content Panels */}
        {selectedDepth === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 space-y-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <BookOpen className="w-4 h-4" />
                <span>Level 1 — Overview: Nima va Nega kerak?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {slice.overview.whatItIsUz}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {slice.overview.whyItMattersUz}
              </p>
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                <strong>Hayotiy analogiya:</strong> {slice.overview.realLifeAnalogyUz}
              </div>
            </div>

            <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200">
                ETL va ELT Taqqoslash Jadvali
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 pr-2">Mezon</th>
                      <th className="py-2 pr-2 text-violet-300">ETL</th>
                      <th className="py-2 text-cyan-300">ELT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {slice.overview.comparisonRows.map((row) => (
                      <tr key={row.aspectUz}>
                        <td className="py-2 pr-2 font-semibold text-slate-200">{row.aspectUz}</td>
                        <td className="py-2 pr-2">{row.etlUz}</td>
                        <td className="py-2">{row.eltUz}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedDepth === "understand" && (
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Sparkles className="w-4 h-4" />
              <span>Level 2 — Understand: 20 Qadamli Mexanizm va Sxema Qoidalari</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {slice.understand.mechanismIntroUz}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {slice.understand.schemaRulesUz.map((rule) => (
                <div
                  key={rule}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                >
                  • {rule}
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
                <span>Level 3 — Master: Data Contract, Quarantine vs Silent Drop va Idempotentlik</span>
              </div>
              <div className="space-y-2">
                {slice.master.dataContractRulesUz.map((rule) => (
                  <div
                    key={rule}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    • {rule}
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/30 text-xs text-rose-200">
                <strong>Quarantine vs Silent Drop:</strong> {slice.master.quarantineVsSilentDropUz}
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30 text-xs text-emerald-200">
                <strong>Idempotent Replay Isboti:</strong> {slice.master.idempotencyProofUz}
              </div>
            </div>

            <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-200">
                Ishchi Kod va Manim Animatsiya Manbalari
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300">
                  Python Engine: {slice.master.pythonEnginePath}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
                  Manim Script: {slice.master.manimScriptPath}
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300">
                  Rendered Video: {slice.master.manimVideoUrl}
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

        {/* Interactive Lab Embedded */}
        <ETLvsELTLab />

        {/* 4 Checkpoint Questions */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Tushunganni Tekshirish (Mini-Test: `de-11-08`)
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
                    <span className="text-cyan-300 uppercase">Daraja: {cp.depth}</span>
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

      {/* 20-Phase Curriculum Browser (`de-01` .. `de-20`) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-100">
              20 Bosqichli Data Engineering Reestri (`de-01` .. `de-20` • 358 ta mikro-dars)
            </h3>
            <p className="text-xs text-slate-400">
              Har bir bosqich uchun tanlangan yo‘nalish bo‘yicha rol (`Core`, `Supporting`, `Optional`, `Advanced`) va tavsiya etilgan chuqurlik ko‘rsatilgan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="de-11-08, Iceberg, Kafka..."
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowResources((p) => !p)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 cursor-pointer"
            >
              {showResources ? "Manbalarni yopish" : `Manbalar (${DATA_ENGINEERING_RESOURCES.length})`}
            </button>
          </div>
        </div>

        {/* Phase Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {DATA_ENGINEERING_PHASES.map((phase) => {
            const trackRole = getDataEngineeringPhaseRoleForTrack(
              phase.id,
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
                    ? "bg-cyan-950/60 border-cyan-400 shadow-md"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-cyan-300">{phase.id}</span>
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
              <div className="text-xs font-mono text-cyan-300">
                {searchQuery
                  ? `Qidiruv natijalari: "${searchQuery}" (${filteredLessons.length} ta dars)`
                  : `${activePhase.id} • Manba bo‘limi: ${activePhase.sourceSection}`}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                {searchQuery ? "Barcha bosqichlar bo‘yicha mos darslar" : activePhase.title}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              {!searchQuery && (
                <div className="text-xs font-mono text-slate-400 hidden sm:block">
                  Vizual g‘oya: {activePhase.visualization.concept} ({activePhase.visualization.status})
                </div>
              )}
              <button
                type="button"
                onClick={handleShareLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
                title="Faza havolasini nusxalash"
              >
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
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
                      <span className="text-[11px] font-mono font-bold text-cyan-300">
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

                  {lesson.reuseCandidate && (
                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-violet-300">
                      <span className="inline-flex items-center gap-1">
                        <Link2 className="w-3 h-3" />
                        Reuse candidate: {lesson.reuseCandidate.contentId}
                      </span>
                      <span className="text-slate-500">advisory</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional External Resources Panel (27 user-supplied links marked unverified) */}
        {showResources && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>
                  Foydalanuvchi keltirgan 27 ta tashqi manba (`urlStatus: user_supplied_not_live_verified`)
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {DATA_ENGINEERING_RESOURCES.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-200"
                >
                  <div className="truncate">
                    <div className="font-semibold truncate">{res.title}</div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {res.provider} • {res.availabilityStatus}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Technical Honesty Notes */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
          {DATA_ENGINEERING_SPECIAL_NOTES.map((note) => (
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
