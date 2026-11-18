import type { ContentRepository } from "@/lib/content/repository";
import type { GlossaryTerm, Lesson, VisualizationInstance } from "@/lib/content/types";
import type { SearchDocument, SearchIndex } from "./core";

/**
 * Builds the search index from visible content (server / build time).
 * Long lessons are split into heading sections so results can deep-link to
 * the matching section (`/learn/slug#heading`) and no single document is huge.
 */

const MAX_SECTION_CHARS = 6000;

export function lessonDocuments(lesson: Lesson): SearchDocument[] {
  const docs: SearchDocument[] = [
    {
      id: `lesson:${lesson.id}`,
      kind: "lesson",
      title: lesson.title,
      description: lesson.description,
      tags: lesson.tags,
      body: lesson.sections.find((section) => section.heading === null)?.text.slice(0, MAX_SECTION_CHARS) ?? "",
      url: `/learn/${lesson.slug}`,
      category: lesson.category,
    },
  ];
  lesson.sections.forEach((section, index) => {
    if (section.heading === null || !section.headingId) return;
    docs.push({
      id: `section:${lesson.id}:${index}`,
      kind: "section",
      title: section.heading,
      parentTitle: lesson.title,
      description: "",
      tags: [],
      body: section.text.slice(0, MAX_SECTION_CHARS),
      url: `/learn/${lesson.slug}#${section.headingId}`,
      category: lesson.category,
    });
  });
  return docs;
}

export function glossaryDocument(term: GlossaryTerm): SearchDocument {
  return {
    id: `glossary:${term.id}`,
    kind: "glossary",
    title: term.term,
    description: term.translation ?? "",
    tags: term.aliases,
    body: term.plainText.slice(0, MAX_SECTION_CHARS),
    url: `/glossary#${term.id}`,
  };
}

export function visualizationDocument(viz: VisualizationInstance): SearchDocument {
  return {
    id: `visualization:${viz.id}`,
    kind: "visualization",
    title: viz.title,
    description: viz.description,
    tags: [viz.type],
    body: "",
    url: `/visual-lab/${viz.id}`,
  };
}

export function buildSearchIndex(
  repository: Pick<ContentRepository, "lessons" | "glossary" | "visualizations">,
  generatedAt: string = new Date().toISOString(),
): SearchIndex {
  return {
    version: 1,
    generatedAt,
    documents: [
      ...repository.lessons.flatMap(lessonDocuments),
      ...repository.glossary.map(glossaryDocument),
      ...repository.visualizations.map(visualizationDocument),
    ],
  };
}
