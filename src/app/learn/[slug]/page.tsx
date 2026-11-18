import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getContentRepository } from "@/lib/content/repository";
import { ReadingProgress } from "@/components/lessons/ReadingProgress";
import { OriginCard } from "@/components/lessons/OriginCard";
import { RelatedLessons } from "@/components/lessons/RelatedLessons";
import { CitationList } from "@/components/mdx/Cite";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import { LessonExperienceClient } from "@/components/lessons/LessonExperienceClient";
import { buildLessonMicroStructure } from "@/lib/curriculum/micro-lessons";
import { BookOpen, AlertCircle } from "lucide-react";
import { uz } from "@/i18n/dictionaries/uz";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repo = getContentRepository();
  return repo.lessons.map((lesson) => ({
    slug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repo = getContentRepository();
  const lesson = repo.getLessonBySlug(slug);

  if (!lesson) {
    return { title: uz.notFound.title };
  }

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  if (slug === "python-basics") {
    redirect("/roadmap?tab=python-dev&lesson=py-01-01");
  }
  if (slug === "functions") {
    redirect("/roadmap?tab=python-dev&lesson=py-06-01");
  }

  const repo = getContentRepository();
  const lesson = repo.getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const category = repo.getCategory(lesson.category);
  const sidebarGroups = repo.getSidebar();
  const nav = repo.getNavigation(lesson.slug);
  const related = repo.getRelated(lesson);
  const references = lesson.sources
    .map((id) => repo.getReference(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof repo.getReference>>[];

  const microStructure = buildLessonMicroStructure({
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    category: lesson.category,
    body: lesson.body,
  });

  const referencesNode = (
    <div className="space-y-8 pt-6 border-t border-slate-800">
      <OriginCard origins={lesson.origin} />

      {references.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>{uz.lesson.references}</span>
          </h3>
          <CitationList references={references} />
        </section>
      )}

      <RelatedLessons items={related} />
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      {/* Top Reading Progress Bar */}
      <ReadingProgress lessonId={lesson.id} />

      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-5 lg:px-8 xl:px-10 py-5 sm:py-8">
        {lesson.status === "example" && (
          <div className="w-full mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 text-xs sm:text-sm text-rose-200 flex items-center gap-2.5 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{uz.status.exampleBanner}</span>
          </div>
        )}
        {lesson.status === "draft" && (
          <div className="w-full mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs sm:text-sm text-amber-200 flex items-center gap-2.5 shadow-lg">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{uz.status.draftBanner}</span>
          </div>
        )}

        <LessonExperienceClient
          lessonId={lesson.id}
          slug={lesson.slug}
          title={lesson.title}
          description={lesson.description}
          categoryTitle={category?.title}
          readingMinutes={lesson.readingMinutes}
          microStructure={microStructure}
          sidebarGroups={sidebarGroups}
          headings={lesson.headings}
          nextLesson={nav.next ?? null}
          prevLesson={nav.previous ?? null}
          relatedLessons={related.map((r) => ({ slug: r.lesson.slug, title: r.lesson.title }))}
          renderedSections={{
            intuitionNode: <MdxRenderer source={microStructure.sections.intuitionMdx} />,
            visualNode: <MdxRenderer source={microStructure.sections.visualMdx} />,
            mathNode: <MdxRenderer source={microStructure.sections.mathMdx} />,
            practiceNode: <MdxRenderer source={microStructure.sections.practiceMdx} />,
            summaryNode: <MdxRenderer source={microStructure.sections.summaryMdx} />,
            fullBodyNode: <MdxRenderer source={lesson.body} />,
            referencesNode,
          }}
        />
      </div>
    </div>
  );
}
