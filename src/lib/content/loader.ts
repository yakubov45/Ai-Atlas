import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { analyzeMarkdown } from "./markdown";
import {
  categoriesFileSchema,
  formatZodIssues,
  glossaryFrontmatterSchema,
  lessonFrontmatterSchema,
  referencesFileSchema,
  visualizationInstanceSchema,
  type Category,
  type Reference,
} from "./schema";
import type {
  ContentCollection,
  ContentFormat,
  ContentIssue,
  GlossaryTerm,
  Lesson,
  VisualizationInstance,
} from "./types";

/**
 * File-system content loader (server / build-time only).
 *
 * Directory layout (relative to the content root):
 *   categories.json             – category taxonomy
 *   lessons/**\/*.{md,mdx}       – lessons (frontmatter + body)
 *   glossary/**\/*.{md,mdx}      – glossary terms (frontmatter + definition body)
 *   references/*.json           – arrays of bibliographic references
 *   visualizations/*.json       – visualization instances
 *
 * Nothing here ever reaches the client bundle; pages receive derived data.
 */

export const DEFAULT_CONTENT_ROOT = path.join(process.cwd(), "src", "content");

function listFiles(dir: string, extensions: readonly string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (extensions.includes(path.extname(entry.name).toLowerCase())) out.push(full);
    }
  };
  walk(dir);
  return out.sort();
}

function rel(rootDir: string, file: string): string {
  return path.relative(rootDir, file).split(path.sep).join("/");
}

function formatOf(file: string): ContentFormat {
  return path.extname(file).toLowerCase() === ".mdx" ? "mdx" : "md";
}

function readJson(file: string, issues: ContentIssue[], rootDir: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as unknown;
  } catch (error) {
    issues.push({
      severity: "error",
      code: "json-parse",
      file: rel(rootDir, file),
      message: `JSON o‘qib bo‘lmadi: ${error instanceof Error ? error.message : String(error)}`,
    });
    return undefined;
  }
}

/**
 * gray-matter parses unquoted YAML dates into Date objects; normalise them back
 * to ISO strings so they validate as `YYYY-MM-DD`.
 */
function normaliseFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    out[key] = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  }
  return out;
}

export function loadLessons(rootDir: string, issues: ContentIssue[]): Lesson[] {
  const lessons: Lesson[] = [];
  for (const file of listFiles(path.join(rootDir, "lessons"), [".md", ".mdx"])) {
    const relative = rel(rootDir, file);
    try {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      const parsed = lessonFrontmatterSchema.safeParse(normaliseFrontmatter(data));
      if (!parsed.success) {
        for (const message of formatZodIssues(parsed.error)) {
          issues.push({ severity: "error", code: "lesson-schema", file: relative, message });
        }
        continue;
      }
      const format = formatOf(file);
      const analysis = analyzeMarkdown(content, format);
      lessons.push({
        ...parsed.data,
        filePath: relative,
        format,
        body: content,
        headings: analysis.headings,
        sections: analysis.sections,
        plainText: analysis.plainText,
        wordCount: analysis.wordCount,
        readingMinutes: parsed.data.estimatedMinutes ?? analysis.readingMinutes,
        refs: analysis.refs,
        hasEsm: analysis.hasEsm,
      });
    } catch (error) {
      issues.push({
        severity: "error",
        code: "lesson-parse",
        file: relative,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return lessons;
}

export function loadGlossary(rootDir: string, issues: ContentIssue[]): GlossaryTerm[] {
  const terms: GlossaryTerm[] = [];
  for (const file of listFiles(path.join(rootDir, "glossary"), [".md", ".mdx"])) {
    const relative = rel(rootDir, file);
    try {
      const { data, content } = matter(fs.readFileSync(file, "utf8"));
      const parsed = glossaryFrontmatterSchema.safeParse(normaliseFrontmatter(data));
      if (!parsed.success) {
        for (const message of formatZodIssues(parsed.error)) {
          issues.push({ severity: "error", code: "glossary-schema", file: relative, message });
        }
        continue;
      }
      const format = formatOf(file);
      const analysis = analyzeMarkdown(content, format);
      terms.push({
        ...parsed.data,
        filePath: relative,
        format,
        body: content,
        plainText: analysis.plainText,
        refs: analysis.refs,
      });
    } catch (error) {
      issues.push({
        severity: "error",
        code: "glossary-parse",
        file: relative,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return terms;
}

export function loadCategories(rootDir: string, issues: ContentIssue[]): Category[] {
  const file = path.join(rootDir, "categories.json");
  if (!fs.existsSync(file)) return [];
  const json = readJson(file, issues, rootDir);
  if (json === undefined) return [];
  const parsed = categoriesFileSchema.safeParse(json);
  if (!parsed.success) {
    for (const message of formatZodIssues(parsed.error)) {
      issues.push({ severity: "error", code: "category-schema", file: "categories.json", message });
    }
    return [];
  }
  return parsed.data;
}

export function loadReferences(rootDir: string, issues: ContentIssue[]): Reference[] {
  const references: Reference[] = [];
  for (const file of listFiles(path.join(rootDir, "references"), [".json"])) {
    const json = readJson(file, issues, rootDir);
    if (json === undefined) continue;
    const parsed = referencesFileSchema.safeParse(json);
    if (!parsed.success) {
      for (const message of formatZodIssues(parsed.error)) {
        issues.push({ severity: "error", code: "reference-schema", file: rel(rootDir, file), message });
      }
      continue;
    }
    references.push(...parsed.data);
  }
  return references;
}

export function loadVisualizations(rootDir: string, issues: ContentIssue[]): VisualizationInstance[] {
  const out: VisualizationInstance[] = [];
  for (const file of listFiles(path.join(rootDir, "visualizations"), [".json"])) {
    const json = readJson(file, issues, rootDir);
    if (json === undefined) continue;
    const parsed = visualizationInstanceSchema.safeParse(json);
    if (!parsed.success) {
      for (const message of formatZodIssues(parsed.error)) {
        issues.push({ severity: "error", code: "visualization-schema", file: rel(rootDir, file), message });
      }
      continue;
    }
    out.push({ ...parsed.data, filePath: rel(rootDir, file) });
  }
  return out;
}

export function loadContentCollection(rootDir: string = DEFAULT_CONTENT_ROOT): ContentCollection {
  const issues: ContentIssue[] = [];
  return {
    rootDir,
    categories: loadCategories(rootDir, issues),
    lessons: loadLessons(rootDir, issues),
    glossary: loadGlossary(rootDir, issues),
    references: loadReferences(rootDir, issues),
    visualizations: loadVisualizations(rootDir, issues),
    issues,
  };
}
