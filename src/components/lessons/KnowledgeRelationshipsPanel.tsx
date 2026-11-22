"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  FlaskConical,
  GitBranch,
  Layers,
  Network,
  Sparkles,
  X,
} from "lucide-react";
import {
  getRelationshipsForEntity,
  type CanonicalEdgeType,
  type RelatedEntityNode,
} from "@/lib/learning-os/relationships";

const EDGE_LABELS_UZ: Readonly<Record<CanonicalEdgeType, string>> = {
  prerequisite_of: "Asos / Talab",
  related_to: "Bog'liq",
  part_of: "Tarkibiy qism",
  used_in: "Qo'llaniladi",
  extends: "Kengaytiradi",
  alternative_to: "Muqobil yondashuv",
  applied_in: "Amaliyot",
};

const ROLE_BADGE_UZ: Readonly<Record<string, { label: string; cls: string }>> = {
  core: {
    label: "Asosiy",
    cls: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
  },
  supporting: {
    label: "Yordamchi",
    cls: "border-sky-500/40 bg-sky-500/15 text-sky-300",
  },
  advanced: {
    label: "Ilg'or",
    cls: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  },
  optional: {
    label: "Ixtiyoriy",
    cls: "border-slate-600/40 bg-slate-800/50 text-slate-300",
  },
};

export interface KnowledgeRelationshipsButtonProps {
  entityId: string;
  fallbackMeta?: {
    title?: string;
    summary?: string;
    prerequisites?: readonly string[];
    related?: readonly string[];
    visualizations?: readonly string[];
    mdxLookup?: Readonly<Record<string, { title: string; slug: string }>>;
  };
  className?: string;
  label?: string;
}

function RelationshipNodeList({
  title,
  emptyLabel,
  items,
  accentClass,
  onNavigate,
}: {
  title: string;
  emptyLabel: string;
  items: readonly RelatedEntityNode[];
  accentClass: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}>
          {title}
        </h4>
        <span className="text-[11px] font-mono text-slate-500">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-slate-500 italic">{emptyLabel}</p>
      ) : (
        <div className="space-y-1.5">
          {items.map((node) => (
            <Link
              key={`${title}-${node.id}-${node.href}`}
              href={node.href}
              onClick={onNavigate}
              className="group flex items-start justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 hover:border-cyan-500/40 hover:bg-slate-900 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                    {node.titleUz}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {EDGE_LABELS_UZ[node.edgeType]}
                  </span>
                </div>
                {node.reasonUz && (
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                    {node.reasonUz}
                  </p>
                )}
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniKnowledgeGraphSvg({
  centerTitle,
  prerequisites,
  relations,
  nextTopics,
}: {
  centerTitle: string;
  prerequisites: readonly RelatedEntityNode[];
  relations: readonly RelatedEntityNode[];
  nextTopics: readonly RelatedEntityNode[];
}) {
  const leftNodes = prerequisites.slice(0, 3);
  const topNodes = relations.slice(0, 3);
  const rightNodes = nextTopics.slice(0, 3);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/90 p-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
        <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
          <Network className="w-3.5 h-3.5" />
          <span>Mahalliy bog&apos;liqlik xaritasi</span>
        </span>
        <span>Oldingi ➔ Joriy ➔ Keyingi / Amaliyot</span>
      </div>
      <svg viewBox="0 0 640 190" className="w-full h-44 select-none">
        {/* Left column: Prerequisites */}
        {leftNodes.map((n, i) => {
          const y = 34 + i * 56;
          return (
            <g key={`pre-${n.id}`}>
              <path
                d={`M 150 ${y} C 200 ${y}, 215 95, 250 95`}
                fill="none"
                className="stroke-amber-400/60 stroke-[1.75]"
              />
              <rect
                x="12"
                y={y - 16}
                width="138"
                height="32"
                rx="8"
                className="fill-slate-900 stroke-amber-400/50 stroke-1"
              />
              <text
                x="81"
                y={y + 4}
                textAnchor="middle"
                className="fill-amber-200 text-[10px] font-semibold"
              >
                {n.titleUz.slice(0, 19)}
              </text>
            </g>
          );
        })}

        {/* Top row: Direct relations */}
        {topNodes.map((n, i) => {
          const x = 225 + i * 95;
          return (
            <g key={`rel-${n.id}`}>
              <line
                x1={x}
                y1="38"
                x2="320"
                y2="72"
                className="stroke-violet-400/60 stroke-1 stroke-dasharray-3"
                strokeDasharray="4 3"
              />
              <rect
                x={x - 42}
                y="8"
                width="84"
                height="28"
                rx="7"
                className="fill-slate-900 stroke-violet-400/50 stroke-1"
              />
              <text
                x={x}
                y="26"
                textAnchor="middle"
                className="fill-violet-200 text-[9.5px] font-medium"
              >
                {n.titleUz.slice(0, 13)}
              </text>
            </g>
          );
        })}

        {/* Center active node */}
        <rect
          x="248"
          y="72"
          width="144"
          height="46"
          rx="12"
          className="fill-cyan-950 stroke-cyan-400 stroke-2"
        />
        <text
          x="320"
          y="99"
          textAnchor="middle"
          className="fill-white text-[11px] font-bold"
        >
          {centerTitle.slice(0, 20)}
        </text>

        {/* Right column: Next & Applied */}
        {rightNodes.map((n, i) => {
          const y = 34 + i * 56;
          return (
            <g key={`next-${n.id}`}>
              <path
                d={`M 392 95 C 425 95, 440 ${y}, 490 ${y}`}
                fill="none"
                className="stroke-emerald-400/65 stroke-[1.75]"
              />
              <rect
                x="490"
                y={y - 16}
                width="138"
                height="32"
                rx="8"
                className="fill-slate-900 stroke-emerald-400/50 stroke-1"
              />
              <text
                x="559"
                y={y + 4}
                textAnchor="middle"
                className="fill-emerald-200 text-[10px] font-semibold"
              >
                {n.titleUz.slice(0, 19)}
              </text>
            </g>
          );
        })}

        <text x="81" y="182" textAnchor="middle" className="fill-amber-400/80 text-[9px] font-mono">
          Asos (Prerequisites)
        </text>
        <text x="320" y="182" textAnchor="middle" className="fill-cyan-400/80 text-[9px] font-mono">
          Joriy mavzu
        </text>
        <text x="559" y="182" textAnchor="middle" className="fill-emerald-400/80 text-[9px] font-mono">
          Keyingi / Amaliyot
        </text>
      </svg>
    </div>
  );
}

export function KnowledgeRelationshipsButton({
  entityId,
  fallbackMeta,
  className,
  label = "Bog'liqliklar",
}: KnowledgeRelationshipsButtonProps) {
  const [open, setOpen] = useState(false);

  const bundle = useMemo(() => {
    return getRelationshipsForEntity(entityId, fallbackMeta);
  }, [entityId, fallbackMeta]);

  const totalLinks =
    bundle.prerequisites.length +
    bundle.directRelations.length +
    bundle.usedIn.length +
    bundle.nextTopics.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors cursor-pointer"
        }
        aria-label={`${bundle.titleUz} bog'liqliklari`}
      >
        <Network className="w-3.5 h-3.5 text-cyan-400" />
        <span>{label}</span>
        {totalLinks > 0 && (
          <span className="rounded-full bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-mono text-cyan-300">
            {totalLinks}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Bilimlar bog'liqligi paneli"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-950 text-slate-100 shadow-2xl p-5 sm:p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                  <Network className="w-3.5 h-3.5" />
                  <span>Bilimlar Grafi • Bog&apos;liqliklar</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">{bundle.titleUz}</h3>
                {bundle.summaryUz && (
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {bundle.summaryUz}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={
                    bundle.matchedConceptId
                      ? `/learn/map?concept=${bundle.matchedConceptId}`
                      : "/learn/map"
                  }
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-200 hover:bg-violet-500/25 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>To&apos;liq xaritada ochish</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                  aria-label="Yopish"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive SVG Mini-Graph */}
            <MiniKnowledgeGraphSvg
              centerTitle={bundle.titleUz}
              prerequisites={bundle.prerequisites}
              relations={bundle.directRelations}
              nextTopics={
                bundle.nextTopics.length > 0 ? bundle.nextTopics : bundle.usedIn
              }
            />

            {/* 4 Typed Relationship Quadrants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RelationshipNodeList
                title="Oldin o'rganish kerak (Prerequisites)"
                emptyLabel="Ushbu mavzu mustaqil boshlang'ich nuqta sifatida o'rganilishi mumkin."
                items={bundle.prerequisites}
                accentClass="text-amber-300"
                onNavigate={() => setOpen(false)}
              />
              <RelationshipNodeList
                title="Keyingi mavzular (Next topics)"
                emptyLabel="Ushbu tushunchadan keyingi maxsus bosqich hali belgilanmagan."
                items={bundle.nextTopics}
                accentClass="text-emerald-300"
                onNavigate={() => setOpen(false)}
              />
              <RelationshipNodeList
                title="Bevosita bog'liq tushunchalar"
                emptyLabel="Bevosita bog'liq tushunchalar ro'yxati kengaytirilmoqda."
                items={bundle.directRelations}
                accentClass="text-violet-300"
                onNavigate={() => setOpen(false)}
              />
              <RelationshipNodeList
                title="Qayerda qo'llaniladi (Used in)"
                emptyLabel="Qo'llanish modullari keyingi tahrirda boyitiladi."
                items={bundle.usedIn}
                accentClass="text-cyan-300"
                onNavigate={() => setOpen(false)}
              />
            </div>

            {/* Bottom row: Learning paths, Labs, Practical Applications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Learning paths */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>O&apos;quv yo&apos;nalishlarida o&apos;rni</span>
                </h4>
                {bundle.learningPaths.length === 0 ? (
                  <p className="text-xs text-slate-500">Global asosiy o&apos;quv yo&apos;li tarkibida.</p>
                ) : (
                  <div className="space-y-1.5">
                    {bundle.learningPaths.map((p) => {
                      const badge = ROLE_BADGE_UZ[p.role] ?? ROLE_BADGE_UZ.optional!;
                      return (
                        <Link
                          key={p.id}
                          href={p.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1.5 text-xs hover:border-indigo-500/40"
                        >
                          <span className="text-slate-200 font-medium truncate">{p.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Associated Visual Labs */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Vizual laboratoriyalar</span>
                </h4>
                {bundle.associatedLabs.length === 0 ? (
                  <p className="text-xs text-slate-500">Bog&apos;langan vizual lab topilmadi.</p>
                ) : (
                  <div className="space-y-1.5">
                    {bundle.associatedLabs.map((lab) => (
                      <Link
                        key={lab.id}
                        href={lab.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1.5 text-xs text-slate-200 hover:border-emerald-500/40"
                      >
                        <span className="truncate">{lab.title}</span>
                        <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Practical applications */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Amaliy qo&apos;llanilishi</span>
                </h4>
                {bundle.practicalApplications.length === 0 ? (
                  <p className="text-xs text-slate-500">Asosiy nazariy va muhandislik poydevori.</p>
                ) : (
                  <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                    {bundle.practicalApplications.map((app) => (
                      <li key={app}>{app}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
