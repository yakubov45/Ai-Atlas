import { z } from "zod";

/**
 * Content schemas for AI Atlas.
 *
 * Every piece of educational content (lessons, glossary terms, references,
 * visualization instances, categories) is validated against these schemas
 * before it can reach the UI. The schemas intentionally contain NO default
 * educational data — they only describe shape.
 */

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

/**
 * - draft:     work in progress, visible only in preview mode
 * - review:    content transformed from research, awaiting human review
 * - published: visible to students
 * - example:   format/rendering fixtures — never educational content
 */
export const CONTENT_STATUSES = ["draft", "review", "published", "example"] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const idSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(SLUG_PATTERN, "Faqat kichik lotin harflari, raqamlar va '-' (kebab-case) ishlatilishi kerak");

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}(T.*)?$/, "ISO sana formati kutilgan (YYYY-MM-DD)");

/**
 * Source traceability: where in the original Deep Research export a piece of
 * content came from. Makes the Phase 2 content transformation auditable.
 */
export const originSchema = z
  .object({
    /** Original Deep Research document (file name or title). */
    document: z.string().min(1),
    /** Section heading inside the original document. */
    section: z.string().min(1).optional(),
    /** Page or page range in the original export, e.g. "12" or "12-18". */
    pages: z.string().min(1).optional(),
    /** Free-form auditor note (e.g. "split from section 3.2"). */
    note: z.string().min(1).optional(),
  })
  .strict();
export type Origin = z.infer<typeof originSchema>;

export const lessonFrontmatterSchema = z
  .object({
    id: idSchema,
    title: z.string().min(1).max(200),
    slug: idSchema,
    description: z.string().min(1).max(500),
    category: idSchema,
    difficulty: z.enum(DIFFICULTIES),
    order: z.number().int().nonnegative(),
    tags: z.array(z.string().min(1).max(60)).default([]),
    /** Lesson ids (or slugs) that should be studied first. Drives the roadmap. */
    prerequisites: z.array(idSchema).default([]),
    /** Lesson ids (or slugs) explicitly related to this one. */
    related: z.array(idSchema).default([]),
    /** Visualization instance ids embedded in / associated with this lesson. */
    visualizations: z.array(idSchema).default([]),
    /** Reference ids (see content/references). Order defines citation numbers. */
    sources: z.array(idSchema).default([]),
    /** Traceability back to the original research documents. */
    origin: z.array(originSchema).default([]),
    status: z.enum(CONTENT_STATUSES).default("draft"),
    locale: z.string().min(2).max(10).default("uz"),
    updated: isoDateSchema.optional(),
    /** Optional override; otherwise computed from word count. */
    estimatedMinutes: z.number().int().positive().optional(),
  })
  .strict();
export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
export type LessonFrontmatterInput = z.input<typeof lessonFrontmatterSchema>;

export const CATEGORY_ICONS = [
  "brain",
  "network",
  "sigma",
  "cpu",
  "layers",
  "sparkles",
  "database",
  "bot",
  "book-open",
  "file-code",
  "flask",
  "compass",
] as const;
export type CategoryIcon = (typeof CATEGORY_ICONS)[number];

export const categorySchema = z
  .object({
    id: idSchema,
    title: z.string().min(1).max(120),
    description: z.string().max(400).optional(),
    order: z.number().int().nonnegative(),
    icon: z.enum(CATEGORY_ICONS).optional(),
    /** Categories used only by example/fixture content. */
    example: z.boolean().default(false),
  })
  .strict();
export type Category = z.infer<typeof categorySchema>;

export const categoriesFileSchema = z.array(categorySchema);

export const REFERENCE_TYPES = [
  "paper",
  "book",
  "article",
  "documentation",
  "website",
  "report",
  "video",
  "other",
] as const;

export const referenceSchema = z
  .object({
    id: idSchema,
    type: z.enum(REFERENCE_TYPES),
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).default([]),
    year: z.number().int().min(1800).max(2100).optional(),
    venue: z.string().min(1).optional(),
    url: z.url().optional(),
    doi: z.string().min(1).optional(),
    accessed: isoDateSchema.optional(),
    /** Deep Research document in which this citation appeared. */
    sourceDocument: z.string().min(1).optional(),
    note: z.string().min(1).optional(),
  })
  .strict();
export type Reference = z.infer<typeof referenceSchema>;

export const referencesFileSchema = z.array(referenceSchema);

export const glossaryFrontmatterSchema = z
  .object({
    id: idSchema,
    /** Term as displayed (usually the English technical term). */
    term: z.string().min(1).max(120),
    /** Uzbek translation/explanation of the term name, if any. */
    translation: z.string().min(1).max(160).optional(),
    aliases: z.array(z.string().min(1)).default([]),
    /** Related glossary term ids. */
    related: z.array(idSchema).default([]),
    /** Lesson ids (or slugs) where the term is discussed. */
    lessons: z.array(idSchema).default([]),
    sources: z.array(idSchema).default([]),
    origin: z.array(originSchema).default([]),
    status: z.enum(CONTENT_STATUSES).default("draft"),
    category: z.string().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    simpleDefinition: z.string().optional(),
    technicalExplanation: z.string().optional(),
    formula: z.string().optional(),
    example: z.string().optional(),
    visualizationId: z.string().optional(),
  })
  .strict();
export type GlossaryFrontmatter = z.infer<typeof glossaryFrontmatterSchema>;

export const VISUALIZATION_TYPES = [
  "flow-diagram",
  "function-plot",
  "gradient-descent",
  "neural-network",
  "transformer",
  "attention-matrix",
  "embedding-space",
  "rag-pipeline",
] as const;
export type VisualizationType = (typeof VISUALIZATION_TYPES)[number];

export const visualizationInstanceSchema = z
  .object({
    id: idSchema,
    type: z.enum(VISUALIZATION_TYPES),
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(1000),
    status: z.enum(CONTENT_STATUSES).default("draft"),
    relatedLessons: z.array(idSchema).default([]),
    sources: z.array(idSchema).default([]),
    origin: z.array(originSchema).default([]),
    /** True when the data is synthetic test data rather than research data. */
    synthetic: z.boolean().default(false),
    /** Type-specific configuration, validated by the visualization registry. */
    config: z.unknown(),
  })
  .strict();
export type VisualizationInstanceFrontmatter = z.infer<typeof visualizationInstanceSchema>;

/** Human-readable flattening of zod issues. */
export function formatZodIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
    return `${path}: ${issue.message}`;
  });
}
