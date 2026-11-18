import type {
  Category,
  ContentStatus,
  Difficulty,
  GlossaryFrontmatter,
  LessonFrontmatter,
  Reference,
  VisualizationInstanceFrontmatter,
} from "./schema";

export type { Category, ContentStatus, Difficulty, Reference };

export interface TocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export type ContentRefKind = "lesson" | "glossary" | "visualization" | "reference";

/** A reference from inside a document body to another piece of content. */
export interface ContentRefUse {
  kind: ContentRefKind;
  target: string;
  /** Optional in-page anchor (lesson:slug#anchor). */
  anchor?: string;
  /** How it appeared in the source (for error messages). */
  raw: string;
  line?: number;
}

export interface LessonSection {
  headingId: string | null;
  heading: string | null;
  text: string;
}

export type ContentFormat = "md" | "mdx";

export interface Lesson extends LessonFrontmatter {
  filePath: string;
  format: ContentFormat;
  body: string;
  headings: TocHeading[];
  sections: LessonSection[];
  plainText: string;
  wordCount: number;
  readingMinutes: number;
  refs: ContentRefUse[];
  /** True if the body contains MDX import/export statements (disallowed). */
  hasEsm: boolean;
}

/** Lightweight lesson data that is safe to send to client components. */
export interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  order: number;
  tags: string[];
  status: ContentStatus;
  readingMinutes: number;
  prerequisites: string[];
  visualizations: string[];
}

export interface GlossaryTerm extends GlossaryFrontmatter {
  filePath: string;
  format: ContentFormat;
  body: string;
  plainText: string;
  refs: ContentRefUse[];
}

export interface VisualizationInstance extends VisualizationInstanceFrontmatter {
  filePath: string;
}

export interface CategoryWithCount extends Category {
  lessonCount: number;
}

export type IssueSeverity = "error" | "warning";

export interface ContentIssue {
  severity: IssueSeverity;
  code: string;
  file: string;
  message: string;
}

export interface ContentCollection {
  rootDir: string;
  lessons: Lesson[];
  categories: Category[];
  glossary: GlossaryTerm[];
  references: Reference[];
  visualizations: VisualizationInstance[];
  /** Problems found while parsing files (schema errors, unreadable files...). */
  issues: ContentIssue[];
}

export interface NavLink {
  slug: string;
  title: string;
}

export interface LessonNavigation {
  previous: NavLink | null;
  next: NavLink | null;
}

export interface SidebarGroup {
  category: Category;
  lessons: LessonSummary[];
}
