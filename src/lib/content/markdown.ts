import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Heading, Root, RootContent } from "mdast";
import type { ContentFormat, ContentRefKind, ContentRefUse, LessonSection, TocHeading } from "./types";

/**
 * Markdown/MDX analysis that runs WITHOUT compiling the document:
 * headings (TOC), plain text (search), sections, and content references
 * (for link validation). The same heading-id algorithm is reused by the
 * MDX compiler so TOC anchors always match rendered ids.
 */

export function parseMarkdown(body: string, format: ContentFormat): Root {
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkMath);
  if (format === "mdx") processor.use(remarkMdx);
  return processor.parse(body) as Root;
}

interface HeadingData {
  id?: string;
  hProperties?: Record<string, unknown>;
}

/**
 * Assigns stable ids to every heading (h1–h6) and returns TOC entries for
 * h2/h3. Mutates the tree (sets `data.hProperties.id`).
 */
export function assignHeadingIds(tree: Root): TocHeading[] {
  const slugger = new GithubSlugger();
  const toc: TocHeading[] = [];
  visit(tree, "heading", (node: Heading) => {
    const text = toString(node).trim();
    const id = slugger.slug(text) || `section-${toc.length + 1}`;
    const data = (node.data ??= {}) as HeadingData;
    data.id = id;
    data.hProperties = { ...(data.hProperties ?? {}), id };
    if (node.depth === 2 || node.depth === 3) toc.push({ id, text, depth: node.depth });
  });
  return toc;
}

/** Remark plugin wrapper for the MDX compiler. */
export function remarkHeadingIds() {
  return (tree: Root) => {
    assignHeadingIds(tree);
  };
}

const SKIP_TEXT_TYPES = new Set(["code", "math", "inlineMath", "mdxjsEsm", "mdxFlowExpression", "mdxTextExpression", "html"]);

function collectText(node: RootContent | Root, out: string[]): void {
  if (SKIP_TEXT_TYPES.has(node.type)) return;
  if (node.type === "text" || node.type === "inlineCode") {
    out.push(node.value);
    return;
  }
  if ("children" in node) {
    for (const child of node.children as RootContent[]) collectText(child, out);
    if (node.type === "paragraph" || node.type === "heading" || node.type === "listItem" || node.type === "tableCell") out.push(" ");
  }
}

export function extractPlainText(tree: Root): string {
  const out: string[] = [];
  collectText(tree, out);
  return out.join("").replace(/\s+/g, " ").trim();
}

/** Splits the document into heading-delimited sections (h2/h3) for search. */
export function extractSections(tree: Root): LessonSection[] {
  const sections: LessonSection[] = [];
  let current: LessonSection = { headingId: null, heading: null, text: "" };
  const buffer: string[] = [];
  const flush = () => {
    current.text = buffer.join("").replace(/\s+/g, " ").trim();
    if (current.text || current.heading) sections.push(current);
    buffer.length = 0;
  };
  for (const node of tree.children) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      flush();
      const data = node.data as HeadingData | undefined;
      current = { headingId: data?.id ?? null, heading: toString(node).trim(), text: "" };
    } else {
      collectText(node, buffer);
      buffer.push(" ");
    }
  }
  flush();
  return sections;
}

export function countWords(text: string): number {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/** ~200 wpm for technical material in a second language. */
export function estimateReadingMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 200));
}

// ---------------------------------------------------------------------------
// Content references (internal links & component ids)
// ---------------------------------------------------------------------------

const SCHEME_KIND: Record<string, ContentRefKind> = {
  lesson: "lesson",
  glossary: "glossary",
  viz: "visualization",
  ref: "reference",
};

/** Parses an internal href into a content reference, or null for external/other links. */
export function parseInternalHref(href: string): Omit<ContentRefUse, "raw" | "line"> | null {
  const scheme = /^(lesson|glossary|viz|ref):([^#?\s]+)(?:#(.+))?$/.exec(href);
  if (scheme) {
    const kind = SCHEME_KIND[scheme[1] as string] as ContentRefKind;
    return { kind, target: scheme[2] as string, ...(scheme[3] ? { anchor: scheme[3] } : {}) };
  }
  const learn = /^\/learn\/([^/#?]+)\/?(?:#(.+))?$/.exec(href);
  if (learn) return { kind: "lesson", target: learn[1] as string, ...(learn[2] ? { anchor: learn[2] } : {}) };
  const glossary = /^\/glossary\/?#(.+)$/.exec(href);
  if (glossary) return { kind: "glossary", target: glossary[1] as string };
  const viz = /^\/visual-lab\/([^/#?]+)\/?$/.exec(href);
  if (viz) return { kind: "visualization", target: viz[1] as string };
  return null;
}

interface MdxJsxAttributeLike {
  type: string;
  name?: string;
  value?: unknown;
}

interface MdxJsxElementLike {
  type: "mdxJsxFlowElement" | "mdxJsxTextElement";
  name: string | null;
  attributes: MdxJsxAttributeLike[];
  position?: { start: { line: number } };
}

/** Components whose `id` attribute points at other content. */
const COMPONENT_REFS: Record<string, ContentRefKind> = {
  Visualization: "visualization",
  Cite: "reference",
  Term: "glossary",
  LessonLink: "lesson",
};

function attributeValue(element: MdxJsxElementLike, name: string): string | null {
  const attribute = element.attributes.find((a) => a.type === "mdxJsxAttribute" && a.name === name);
  return attribute && typeof attribute.value === "string" ? attribute.value : null;
}

export function extractContentRefs(tree: Root): { refs: ContentRefUse[]; hasEsm: boolean } {
  const refs: ContentRefUse[] = [];
  let hasEsm = false;
  visit(tree, (node) => {
    const line = node.position?.start.line;
    if (node.type === "link" || node.type === "definition") {
      const url = (node as { url: string }).url;
      const parsed = parseInternalHref(url);
      if (parsed) refs.push({ ...parsed, raw: url, ...(line ? { line } : {}) });
      return;
    }
    if (node.type === "mdxjsEsm") {
      hasEsm = true;
      return;
    }
    if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
      const element = node as unknown as MdxJsxElementLike;
      const kind = element.name ? COMPONENT_REFS[element.name] : undefined;
      if (!kind) return;
      const target = attributeValue(element, kind === "lesson" ? "slug" : "id") ?? attributeValue(element, "id");
      if (target) refs.push({ kind, target, raw: `<${element.name} ${target}>`, ...(line ? { line } : {}) });
    }
  });
  return { refs, hasEsm };
}

export interface MarkdownAnalysis {
  headings: TocHeading[];
  sections: LessonSection[];
  plainText: string;
  wordCount: number;
  readingMinutes: number;
  refs: ContentRefUse[];
  hasEsm: boolean;
}

export function analyzeMarkdown(body: string, format: ContentFormat): MarkdownAnalysis {
  const tree = parseMarkdown(body, format);
  const headings = assignHeadingIds(tree);
  const plainText = extractPlainText(tree);
  const wordCount = countWords(plainText);
  const { refs, hasEsm } = extractContentRefs(tree);
  return {
    headings,
    sections: extractSections(tree),
    plainText,
    wordCount,
    readingMinutes: estimateReadingMinutes(wordCount),
    refs,
    hasEsm,
  };
}
