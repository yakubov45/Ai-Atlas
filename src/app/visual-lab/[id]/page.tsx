import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getContentRepository } from "@/lib/content/repository";
import { parseVisualizationConfig } from "@/lib/visualizations/validation";
import { VisualizationContainer } from "@/components/visualizations/VisualizationContainer";
import { RenderVisualization } from "@/components/visualizations/loaders";
import { VisualizationRenderer } from "@/components/visualizations/VisualizationRenderer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookmarkButton } from "@/components/lessons/BookmarkButton";
import { uz } from "@/i18n/dictionaries/uz";

interface VisualLabDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const repo = getContentRepository();
  return repo.visualizations.map((viz) => ({ id: viz.id }));
}

export async function generateMetadata({ params }: VisualLabDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const repo = getContentRepository();
  const viz = repo.getVisualization(id);

  if (!viz) return { title: uz.notFound.title };

  return {
    title: `${viz.title} | ${uz.lab.title}`,
    description: viz.description,
  };
}

export default async function VisualLabDetailPage({ params }: VisualLabDetailPageProps) {
  const { id } = await params;
  const repo = getContentRepository();
  const viz = repo.getVisualization(id);

  if (!viz) {
    notFound();
  }

  const parsed = parseVisualizationConfig(viz.type, viz.config);
  const relatedLessons = viz.relatedLessons
    .map((ref) => repo.getLesson(ref))
    .filter(Boolean) as NonNullable<ReturnType<typeof repo.getLesson>>[];

  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-8 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: uz.nav.visualLab, href: "/visual-lab" },
          { label: viz.title },
        ]}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            {viz.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {viz.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <BookmarkButton id={viz.id} kind="visualization" />
          <Link
            href="/visual-lab"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{uz.common.back}</span>
          </Link>
        </div>
      </div>

      {/* Visualization Canvas */}
      {id === "function-explorer" ||
      id === "gradient-descent-1d" ||
      id === "neural-network-explorer" ? (
        <VisualizationRenderer
          id={viz.id}
          type={viz.type}
          title={viz.title}
          description={viz.description}
          parsedConfig={parsed.ok ? parsed.value : undefined}
        />
      ) : parsed.ok ? (
        <VisualizationContainer
          title={viz.title}
          description={viz.description}
          status={viz.status}
          synthetic={viz.synthetic}
        >
          <RenderVisualization parsed={parsed.value} />
        </VisualizationContainer>
      ) : (
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300">
          <p className="font-semibold text-sm mb-2">{uz.lab.errorTitle}</p>
          <ul className="list-disc list-inside space-y-1 text-rose-400">
            {parsed.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Connected Lessons */}
      {relatedLessons.length > 0 && (
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{uz.lab.relatedLessons}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relatedLessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/learn/${lesson.slug}`}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-violet-500/50 transition-all text-xs"
              >
                <h4 className="font-semibold text-slate-100 line-clamp-1">{lesson.title}</h4>
                <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">{lesson.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
