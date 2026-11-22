"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  FlaskConical,
  FolderGit2,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  CAREER_BRANCHES,
  GLOBAL_ROADMAP_NODES,
  GLOBAL_STAGES,
  getGlobalNodeById,
  type CareerBranchId,
  type GlobalRoadmapNode,
} from "@/lib/learning-os/global-roadmap";
import { isCanonicalItemCompleted } from "@/lib/learning-os/progress-sync";
import { useLearning } from "@/hooks/use-learning";
import { KnowledgeRelationshipsButton } from "@/components/lessons/KnowledgeRelationshipsPanel";

const SOURCE_BADGE: Readonly<Record<string, string>> = {
  mdx: "Kanonik MDX",
  "python-dev": "Python Dev",
  "ai-eng": "AI Engineer",
  "ml-ds": "ML / DS",
  "hf-llm": "HF LLM",
  "dl-16": "16 DL Arx",
  "data-eng": "Data Eng",
  "prompt-eng": "Prompt Eng",
};

const DIFFICULTY_UZ: Readonly<Record<string, { label: string; cls: string }>> = {
  beginner: { label: "Boshlang'ich", cls: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30" },
  intermediate: { label: "O'rta", cls: "text-amber-300 bg-amber-500/10 border-amber-500/30" },
  advanced: { label: "Ilg'or", cls: "text-violet-300 bg-violet-500/10 border-violet-500/30" },
};

export function GlobalUnifiedRoadmap() {
  const { state, toggleCompleted, toggleConceptKnown, isConceptKnown } = useLearning();
  const [branch, setBranch] = useState<CareerBranchId>("all");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [difficulty, setDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState<number>(100);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(GLOBAL_ROADMAP_NODES[0]?.id ?? "gn-python-basics");

  const activeBranchMeta = useMemo(
    () => CAREER_BRANCHES.find((b) => b.id === branch) ?? CAREER_BRANCHES[0]!,
    [branch],
  );

  const visibleNodes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return GLOBAL_ROADMAP_NODES.filter((n) => {
      const matchBranch = branch === "all" || n.availableTracks.includes(branch);
      const matchDiff = difficulty === "all" || n.difficulty === difficulty;
      const matchSearch =
        !q ||
        n.titleUz.toLowerCase().includes(q) ||
        n.titleEn.toLowerCase().includes(q) ||
        n.whyItMattersUz.toLowerCase().includes(q);
      return matchBranch && matchDiff && matchSearch;
    });
  }, [branch, difficulty, search]);

  const stageGroups = useMemo(() => {
    return GLOBAL_STAGES.map((stage) => ({
      stage,
      nodes: visibleNodes
        .filter((n) => n.stageId === stage.id)
        .sort((a, b) => a.orderInStage - b.orderInStage),
    })).filter((g) => g.nodes.length > 0);
  }, [visibleNodes]);

  const isNodeDone = (node: GlobalRoadmapNode) =>
    isCanonicalItemCompleted(state, node.canonicalConceptId) ||
    node.associatedLessons.some((l) => isCanonicalItemCompleted(state, l.id));

  const isNodeKnown = (node: GlobalRoadmapNode) =>
    isConceptKnown(node.canonicalConceptId) ||
    node.associatedLessons.some((l) => isConceptKnown(l.id));

  const getMissingPrereqs = (node: GlobalRoadmapNode): GlobalRoadmapNode[] => {
    const missing: GlobalRoadmapNode[] = [];
    for (const reqId of node.requiredPrerequisites) {
      const reqNode = getGlobalNodeById(reqId);
      if (reqNode && !isNodeDone(reqNode) && !isNodeKnown(reqNode)) {
        missing.push(reqNode);
      }
    }
    return missing;
  };

  const selectedNode = useMemo(
    () => getGlobalNodeById(selectedNodeId) ?? visibleNodes[0] ?? GLOBAL_ROADMAP_NODES[0]!,
    [selectedNodeId, visibleNodes],
  );

  const completedVisibleCount = visibleNodes.filter(isNodeDone).length;
  const knownVisibleCount = visibleNodes.filter((n) => !isNodeDone(n) && isNodeKnown(n)).length;

  return (
    <div className="space-y-6">
      {/* Top Controls & Career Track Filter Bar */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Compass className="w-4 h-4" />
              <span>Yagona Global Yo&apos;l Xaritasi (10 Bosqich • 10 Kasb)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {activeBranchMeta.label}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl">
              {activeBranchMeta.descriptionUz} Ilg&apos;or mavzular hech qachon majburan qulflanmaydi — faqat oldingi shart bo&apos;yicha tavsiya beriladi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              Tugatilgan: <span className="text-emerald-300 font-bold">{completedVisibleCount}</span>/{visibleNodes.length}
              {knownVisibleCount > 0 && (
                <span className="text-amber-300 ml-2">+{knownVisibleCount} bilaman</span>
              )}
            </div>

            <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  viewMode === "map" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Xarita</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  viewMode === "list" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Ro&apos;yxat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Career Branch Filter Chips */}
        <div className="flex flex-wrap gap-1.5">
          {CAREER_BRANCHES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBranch(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                branch === b.id
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {b.shortLabel}
            </button>
          ))}
        </div>

        {/* Search, Difficulty & Zoom Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative min-w-[210px] flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mavzu yoki bosqich qidirish..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-1">
              {(["all", "beginner", "intermediate", "advanced"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                    difficulty === d
                      ? "bg-slate-700 text-white"
                      : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {d === "all" ? "Barcha daraja" : DIFFICULTY_UZ[d]?.label}
                </button>
              ))}
            </div>
          </div>

          {viewMode === "map" && (
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(80, z - 10))}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Kichiklashtirish"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-slate-400 w-10 text-center">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(120, z + 10))}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Kattalashtirish"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Split: 10-Stage Graph/List + Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4 overflow-x-auto pb-2">
          <div
            style={viewMode === "map" ? { fontSize: `${zoom}%` } : undefined}
            className="space-y-4 origin-top-left transition-all"
          >
            {stageGroups.map(({ stage, nodes }) => (
              <div
                key={stage.id}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-4 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${stage.colorClass}`}>
                      {stage.titleUz}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">{stage.subtitleUz}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {nodes.length} mavzu
                  </span>
                </div>

                <div
                  className={
                    viewMode === "map"
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                      : "space-y-2"
                  }
                >
                  {nodes.map((node) => {
                    const done = isNodeDone(node);
                    const known = !done && isNodeKnown(node);
                    const missing = getMissingPrereqs(node);
                    const isSelected = selectedNode.id === node.id;
                    const diffMeta = DIFFICULTY_UZ[node.difficulty]!;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`w-full text-left rounded-xl border p-3 transition-all cursor-pointer space-y-1.5 ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-950/30"
                            : done
                            ? "border-emerald-500/40 bg-emerald-950/15 hover:border-emerald-400/60"
                            : known
                            ? "border-amber-500/40 bg-amber-950/15 hover:border-amber-400/60"
                            : "border-slate-800 bg-slate-950/75 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${diffMeta.cls}`}>
                            {diffMeta.label}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px]">
                            {done && (
                              <span className="text-emerald-300 font-bold flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Tugatilgan
                              </span>
                            )}
                            {known && (
                              <span className="text-amber-300 font-bold">Bilaman</span>
                            )}
                            {!done && !known && missing.length > 0 && (
                              <span className="text-amber-400/90 flex items-center gap-0.5" title="Oldingi tavsiya mavzular mavjud">
                                <AlertTriangle className="w-3 h-3" /> {missing.length} tavsiya
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-xs font-bold text-white leading-snug">
                          {node.titleUz}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{node.associatedLessons.length} ta bog&apos;langan dars</span>
                          <span className="font-mono">~{node.estimatedMinutes} daq</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Node Inspector (5 cols, sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 rounded-3xl border border-cyan-500/30 bg-slate-950 p-5 sm:p-6 space-y-4 shadow-2xl">
          <div className="space-y-1.5 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                Mavzu Inspektori
              </span>
              <KnowledgeRelationshipsButton
                entityId={selectedNode.canonicalConceptId}
                fallbackMeta={{
                  title: selectedNode.titleUz,
                  summary: selectedNode.whyItMattersUz,
                }}
              />
            </div>
            <h3 className="text-lg font-extrabold text-white">{selectedNode.titleUz}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedNode.whyItMattersUz}</p>
          </div>

          {/* Non-blocking Prerequisite Advisory */}
          {(() => {
            const missing = getMissingPrereqs(selectedNode);
            if (missing.length === 0) return null;
            return (
              <div className="rounded-2xl border border-amber-500/35 bg-amber-950/25 p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Ushbu darsdan oldin quyidagilarni ko&apos;rib chiqish tavsiya etiladi (qulflanmagan):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missing.map((req) => (
                    <button
                      key={req.id}
                      type="button"
                      onClick={() => setSelectedNodeId(req.id)}
                      className="rounded-lg border border-amber-500/40 bg-slate-950 px-2.5 py-1 text-[11px] text-amber-200 hover:bg-amber-950/50 cursor-pointer"
                    >
                      {req.titleUz} →
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Quick Status Toggles */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => toggleCompleted(selectedNode.canonicalConceptId)}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                isNodeDone(selectedNode)
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-200"
                  : "border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-500/50"
              }`}
            >
              {isNodeDone(selectedNode) ? "✓ Tugatildi" : "Tugatilgan deb belgilash"}
            </button>
            <button
              type="button"
              onClick={() => toggleConceptKnown(selectedNode.canonicalConceptId)}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                isNodeKnown(selectedNode)
                  ? "border-amber-500 bg-amber-500/20 text-amber-200"
                  : "border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-500/50"
              }`}
            >
              {isNodeKnown(selectedNode) ? "✓ Allaqachon bilaman" : "Allaqachon bilaman"}
            </button>
          </div>

          {/* Associated Lessons across tracks & MDX */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tegishli Darslar ({selectedNode.associatedLessons.length})</span>
            </h4>
            <div className="space-y-1.5">
              {selectedNode.associatedLessons.map((lesson) => (
                <Link
                  key={`${lesson.source}-${lesson.id}`}
                  href={lesson.href}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-cyan-300 shrink-0">
                      {SOURCE_BADGE[lesson.source] ?? lesson.source}
                    </span>
                    <span className="text-slate-100 font-semibold truncate">{lesson.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Related Labs & Projects */}
          {(selectedNode.relatedLabs.length > 0 || selectedNode.associatedProjects.length > 0) && (
            <div className="grid grid-cols-1 gap-3 pt-1">
              {selectedNode.relatedLabs.length > 0 && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-2">
                  <span className="text-[11px] font-bold uppercase text-emerald-300 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Vizual Laboratoriyalar</span>
                  </span>
                  <div className="space-y-1">
                    {selectedNode.relatedLabs.map((lab) => (
                      <Link
                        key={lab.id}
                        href={lab.href}
                        className="flex items-center justify-between text-xs text-slate-200 hover:text-emerald-300"
                      >
                        <span>{lab.titleUz}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.associatedProjects.length > 0 && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase text-violet-300 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Amaliy Loyihalar</span>
                  </span>
                  <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                    {selectedNode.associatedProjects.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
