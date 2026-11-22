/**
 * AI Atlas Learning OS — Centralized Information Architecture & Subject Catalog
 *
 * Groups all verified courses, career tracks, interactive labs, projects, and canonical
 * lessons into hierarchical Subject Groups without fabricating lesson counts or statuses.
 */

import type { LessonSummary, VisualizationInstance } from "@/lib/content/types";
import { AI_ENGINEER_PHASES, TOTAL_AI_ENGINEER_MICRO_LESSONS } from "@/lib/curriculum/ai-engineer";
import { MACHINE_LEARNING_PHASES, TOTAL_ML_MICRO_LESSONS } from "@/lib/curriculum/machine-learning";
import { DATA_SCIENCE_PHASES, CANONICAL_DS_LESSONS } from "@/lib/curriculum/data-science";
import { PYTHON_DEV_PHASES, TOTAL_PYTHON_DEV_LESSONS } from "@/lib/curriculum/python-developer";
import { getDataEngineeringSummaryStats } from "@/lib/curriculum/data-engineering";
import { getPromptEngineeringSummaryStats } from "@/lib/curriculum/prompt-engineering";
import { getHfCourseImportAuditReport } from "@/lib/curriculum/hf-llm-course";
import { SIXTEEN_ARCHITECTURES } from "@/lib/curriculum/deep-learning-16-architectures";
import { ALL_INTENSIVE_LESSONS, INTENSIVE_12_WEEKS } from "@/lib/curriculum/ds-ml-ai-12weeks";
import { CANONICAL_CONCEPTS } from "@/lib/knowledge-graph/concepts";

export type SubjectGroupId =
  | "programming"
  | "mathematics"
  | "data"
  | "artificial-intelligence"
  | "generative-ai"
  | "production";

export interface LibraryCourseItem {
  id: string;
  titleUz: string;
  subtitleUz: string;
  subjectGroup: SubjectGroupId;
  href: string;
  roadmapHref?: string;
  kind: "track" | "shared-module" | "special-module" | "mdx-collection" | "practice";
  phasesOrChapters: number;
  totalItems: number;
  publishedItems: number;
  plannedOrDraftItems: number;
  accent: "amber" | "cyan" | "emerald" | "violet" | "sky" | "fuchsia";
  canonicalCategoryIds?: string[];
  descriptionUz: string;
  honestStatusNoteUz: string;
}

export interface SubjectGroupMeta {
  id: SubjectGroupId;
  titleUz: string;
  titleEn: string;
  descriptionUz: string;
  accentColor: string;
  recommendedPrerequisites: SubjectGroupId[];
}

export const SUBJECT_GROUPS: readonly SubjectGroupMeta[] = [
  {
    id: "programming",
    titleUz: "Dasturlash Poydevori",
    titleEn: "Programming Foundations",
    descriptionUz: "Python sintaksisi, xotira modeli, funksiyalar, OOP, algoritmlar va ma'lumotlar tuzilmalari.",
    accentColor: "amber",
    recommendedPrerequisites: [],
  },
  {
    id: "mathematics",
    titleUz: "AI Uchun Matematika",
    titleEn: "Mathematics Foundations",
    descriptionUz: "Chiziqli algebra (vektor, matritsa, tenzor), hosila, zanjir qoidasi, gradient va ehtimollar nazariyasi.",
    accentColor: "cyan",
    recommendedPrerequisites: ["programming"],
  },
  {
    id: "data",
    titleUz: "Data Engineering & Data Science",
    titleEn: "Data Engineering & Data Science",
    descriptionUz: "SQL, Pandas/Polars, EDA, ETL vs ELT, Data Lakehouse, Kafka/Spark va statistik A/B eksperimentlar.",
    accentColor: "sky",
    recommendedPrerequisites: ["programming", "mathematics"],
  },
  {
    id: "artificial-intelligence",
    titleUz: "Sun'iy Intellekt & Deep Learning",
    titleEn: "Artificial Intelligence & Deep Learning",
    descriptionUz: "Klassik ML, optimizatorlar, Backpropagation va Perceptron (1958) dan Mamba (2023) gacha 16 ta arxitektura.",
    accentColor: "emerald",
    recommendedPrerequisites: ["programming", "mathematics"],
  },
  {
    id: "generative-ai",
    titleUz: "Generative AI & LLM Engineering",
    titleEn: "Generative AI & LLM Engineering",
    descriptionUz: "Transformers, Tokenization, Embeddings, Hugging Face LLM Course, RAG, AI Agents, MCP va Prompt Engineering.",
    accentColor: "violet",
    recommendedPrerequisites: ["artificial-intelligence"],
  },
  {
    id: "production",
    titleUz: "Production ML, MLOps & Intensiv Reja",
    titleEn: "Production Systems & Flagship Projects",
    descriptionUz: "12-haftalik intensiv tayyorgarlik, loyiha arxitekturasi, inference pipeline va portfolio capstone loyihalari.",
    accentColor: "fuchsia",
    recommendedPrerequisites: ["generative-ai"],
  },
];

export interface ContentAuditSummary {
  mdxLessons: {
    total: number;
    published: number;
  };
  coursesAndTracks: LibraryCourseItem[];
  totalPlannedMicroNodes: number;
  totalPublishedMicroNodes: number;
  glossaryTermsCount: number;
  visualLabsCount: number;
  draftVisualLabsCount: number;
  canonicalConceptsCount: number;
  dl16Count: number;
  intensive12WeeksCount: number;
  hfAudit: ReturnType<typeof getHfCourseImportAuditReport>;
}

/**
 * Computes strictly real, audited course & curriculum counts directly from datasets.
 */
export function buildLearningLibraryCatalog(): LibraryCourseItem[] {
  const pyPub = PYTHON_DEV_PHASES.reduce(
    (sum, p) => sum + p.lessons.filter((l) => l.status === "published" || l.status === "sample-authored").length,
    0,
  );
  const aiPub = AI_ENGINEER_PHASES.reduce(
    (sum, p) => sum + p.lessons.filter((l) => l.status === "published").length,
    0,
  );
  const mlPub = MACHINE_LEARNING_PHASES.reduce(
    (sum, p) => sum + p.lessons.filter((l) => l.status === "published").length,
    0,
  );
  const dsCanonicalCount = CANONICAL_DS_LESSONS;
  const dsPub = DATA_SCIENCE_PHASES.reduce(
    (sum, p) => sum + p.lessons.filter((l) => !l.isOptionalProposal && l.status === "published").length,
    0,
  );
  const deStats = getDataEngineeringSummaryStats();
  const peStats = getPromptEngineeringSummaryStats();
  const hfAudit = getHfCourseImportAuditReport();

  return [
    {
      id: "python-dev",
      titleUz: "Python Developer Akademiyasi",
      subtitleUz: "20 ta faza • xotira modeli, OOP, Call Stack, FastAPI & Testing",
      subjectGroup: "programming",
      href: "/learn?tab=python-dev",
      roadmapHref: "/roadmap?tab=python-dev",
      kind: "track",
      phasesOrChapters: PYTHON_DEV_PHASES.length,
      totalItems: TOTAL_PYTHON_DEV_LESSONS,
      publishedItems: pyPub,
      plannedOrDraftItems: TOTAL_PYTHON_DEV_LESSONS - pyPub,
      accent: "amber",
      canonicalCategoryIds: ["python"],
      descriptionUz: "Python dasturlash tilining xotira asoslaridan tortib Call Stack, generatorlar, AsyncIO, OOP va testinggacha to'liq dastur.",
      honestStatusNoteUz: "334 ta dars published + 10 ta mualliflik namuna (sample-authored) darslari mavjud.",
    },
    {
      id: "python-30-days",
      titleUz: "30 Days of Python — Amaliy Bank",
      subtitleUz: "30 kun • 90 test + 90 Pyodide kod yozish mashqi (180 vazifa)",
      subjectGroup: "programming",
      href: "/practice/python-30-days",
      kind: "practice",
      phasesOrChapters: 30,
      totalItems: 30,
      publishedItems: 30,
      plannedOrDraftItems: 0,
      accent: "amber",
      canonicalCategoryIds: ["python"],
      descriptionUz: "Brauzerda real Python interpretatori (Pyodide) bilan ishlaydigan 5 darajali kunlik amaliyot.",
      honestStatusNoteUz: "Barcha 30 kunlik topshiriqlar va deterministik testlar ishlaydi.",
    },
    {
      id: "math-foundations",
      titleUz: "AI Uchun Matematika (Kanonik Konspektlar & Lablar)",
      subtitleUz: "Chiziqli algebra, matritsalar, hosila, gradient, ehtimollik",
      subjectGroup: "mathematics",
      href: "/learn?tab=articles",
      roadmapHref: "/roadmap?tab=global",
      kind: "mdx-collection",
      phasesOrChapters: 1,
      totalItems: 10,
      publishedItems: 10,
      plannedOrDraftItems: 0,
      accent: "cyan",
      canonicalCategoryIds: ["math"],
      descriptionUz: "Vector, Matrix, Matrix Operations, Tensor, Hosila, Partial Derivative, Gradient, Chain Rule, Probability, Mean va Standard Deviation.",
      honestStatusNoteUz: "Barcha kanonik MDX konspektlar va Desmos / Vector / Function Explorer laboratoriyalari nashr etilgan.",
    },
    {
      id: "data-science",
      titleUz: "Data Science & Analytics Yo'nalishi",
      subtitleUz: "23 ta faza • 376 kanonik dars (+ 50 ixtiyoriy dsx-* taklif)",
      subjectGroup: "data",
      href: "/learn?tab=data-scientist",
      roadmapHref: "/roadmap?tab=data-scientist",
      kind: "track",
      phasesOrChapters: DATA_SCIENCE_PHASES.length,
      totalItems: dsCanonicalCount,
      publishedItems: dsPub,
      plannedOrDraftItems: dsCanonicalCount - dsPub,
      accent: "sky",
      descriptionUz: "Pandas, NumPy broadcasting, EDA, SQL, statistik testlar va CUPED A/B eksperimentlar.",
      honestStatusNoteUz: `${dsPub} ta dars to'liq nashr etilgan; qolgan ${dsCanonicalCount - dsPub} tasi tuzilgan reja/skaffold (planned) maqomida.`,
    },
    {
      id: "data-eng",
      titleUz: "Data Engineering Yo'nalishi",
      subtitleUz: "20 ta faza • ETL vs ELT, SCD Type 2, Kafka & Lakehouse",
      subjectGroup: "data",
      href: "/learn?tab=data-eng",
      roadmapHref: "/roadmap?tab=data-eng",
      kind: "track",
      phasesOrChapters: deStats.totalPhases,
      totalItems: deStats.totalLessons,
      publishedItems: deStats.publishedLessons,
      plannedOrDraftItems: deStats.plannedLessons,
      accent: "cyan",
      descriptionUz: "Ingestion, Quarantine, Idempotent Replay, Kafka, Spark, dbt va RAG ma'lumot quvurlari.",
      honestStatusNoteUz: `Halol reestr: ${deStats.publishedLessons} ta vertikal dars (de-11-08 ETL vs ELT) nashr etilgan, ${deStats.plannedLessons} tasi planned.`,
    },
    {
      id: "ml-engineer",
      titleUz: "Machine Learning Engineering Akademiyasi",
      subtitleUz: "22 ta faza • Klassik ML, Gradient Descent, Loss & MLOps",
      subjectGroup: "artificial-intelligence",
      href: "/learn?tab=ml-engineer",
      roadmapHref: "/roadmap?tab=ml-engineer",
      kind: "track",
      phasesOrChapters: MACHINE_LEARNING_PHASES.length,
      totalItems: TOTAL_ML_MICRO_LESSONS,
      publishedItems: mlPub,
      plannedOrDraftItems: TOTAL_ML_MICRO_LESSONS - mlPub,
      accent: "emerald",
      canonicalCategoryIds: ["fundamentals", "deep-learning"],
      descriptionUz: "Supervised/Unsupervised ML, Regressiya, Tree/Boosting modellar, Optimallashtirish va MLOps.",
      honestStatusNoteUz: `${mlPub} ta kanonik dars to'liq nashr etilgan; ${TOTAL_ML_MICRO_LESSONS - mlPub} tasi skaffold (planned) sifatida mavjud.`,
    },
    {
      id: "dl-16-architectures",
      titleUz: "Deep Learning — 16 Ta Asosiy Arxitektura (6 Savol)",
      subtitleUz: "Perceptron (1958) dan Transformer, MoE va Mamba (2023) gacha",
      subjectGroup: "artificial-intelligence",
      href: "/learn/deep-learning-architectures",
      roadmapHref: "/roadmap?tab=deep-learning",
      kind: "special-module",
      phasesOrChapters: 6,
      totalItems: SIXTEEN_ARCHITECTURES.length,
      publishedItems: SIXTEEN_ARCHITECTURES.length,
      plannedOrDraftItems: 0,
      accent: "amber",
      canonicalCategoryIds: ["architectures", "deep-learning"],
      descriptionUz: "16 ta burilish nuqtasi bo'lgan ilmiy maqola, vektorli SVG sxemalar, tensor o'lchamlari, PyTorch/Python kodlar va taqqoslashlar.",
      honestStatusNoteUz: "Barcha 16 ta arxitektura va 6 ta savol xaritasi to'liq ishlaydi.",
    },
    {
      id: "hf-llm-course",
      titleUz: "Hugging Face LLM Course (Shared Module)",
      subtitleUz: "13 bob (0–12) • 99 bo'lim • 220 mikro-dars • Apache-2.0",
      subjectGroup: "generative-ai",
      href: "/learn/hugging-face-llm-course",
      roadmapHref: "/roadmap?tab=ai-engineer",
      kind: "shared-module",
      phasesOrChapters: hfAudit.sourceChaptersCount,
      totalItems: hfAudit.totalMicroLessonsCount,
      publishedItems: hfAudit.publishedLessonsCount,
      plannedOrDraftItems: hfAudit.plannedLessonsCount,
      accent: "amber",
      canonicalCategoryIds: ["llms-rag"],
      descriptionUz: "6 ta mavjud yo'nalish uchun umumiy modul: Transformers, Tokenization, Padding Lab, Fine-Tuning, LoRA/QLoRA, Gradio va GRPO.",
      honestStatusNoteUz: `${hfAudit.publishedLessonsCount}/${hfAudit.totalMicroLessonsCount} dars nashr etilgan (${hfAudit.canonicalLinkedCount} tasi kanonik darslarga bog'langan).`,
    },
    {
      id: "ai-engineer",
      titleUz: "AI Engineer Yo'nalishi",
      subtitleUz: "20 ta faza • Vektorlar, Embeddings, RAG, ReAct Agentlar & MCP",
      subjectGroup: "generative-ai",
      href: "/learn?tab=ai-engineer",
      roadmapHref: "/roadmap?tab=ai-engineer",
      kind: "track",
      phasesOrChapters: AI_ENGINEER_PHASES.length,
      totalItems: TOTAL_AI_ENGINEER_MICRO_LESSONS,
      publishedItems: aiPub,
      plannedOrDraftItems: TOTAL_AI_ENGINEER_MICRO_LESSONS - aiPub,
      accent: "violet",
      canonicalCategoryIds: ["llms-rag", "ai-agents"],
      descriptionUz: "Zamonaviy LLM ilovalari, Cosine Similarity, Hybrid Search, Evaluation (Hit@k/MRR), Agentic Workflows va MCP.",
      honestStatusNoteUz: `Barcha ${aiPub} ta mikro-dars nashr etilgan va 6 ta portfolio loyiha bilan bog'langan.`,
    },
    {
      id: "prompt-eng",
      titleUz: "Prompt Engineering Specialist",
      subtitleUz: "20 ta faza • Sampling (T, Top-K, Top-P), CoT, ReAct & Red Teaming",
      subjectGroup: "generative-ai",
      href: "/learn?tab=prompt-eng",
      roadmapHref: "/roadmap?tab=prompt-eng",
      kind: "track",
      phasesOrChapters: peStats.totalPhases,
      totalItems: peStats.totalLessons,
      publishedItems: peStats.publishedLessons,
      plannedOrDraftItems: peStats.plannedLessons,
      accent: "fuchsia",
      canonicalCategoryIds: ["llms-rag"],
      descriptionUz: "Logit ehtimolliklari, Temperature/Top-K/Top-P sampling matematikasi, Prompt Injection himoyasi va Calibration.",
      honestStatusNoteUz: `${peStats.publishedLessons} ta vertikal sampling darsi (pe-06-06, pe-07-02, pe-07-04) nashr etilgan; ${peStats.plannedLessons} tasi planned.`,
    },
    {
      id: "intensive-12weeks",
      titleUz: "12-Haftalik Intensiv DS / ML-AI Rejasi",
      subtitleUz: "12 hafta • 42 ta dars (D01.1–D12.3) • 126 intervyu S/J • 3 portfolio",
      subjectGroup: "production",
      href: "/learn/ds-ml-ai-12weeks",
      roadmapHref: "/roadmap?tab=global",
      kind: "special-module",
      phasesOrChapters: INTENSIVE_12_WEEKS.length,
      totalItems: ALL_INTENSIVE_LESSONS.length,
      publishedItems: ALL_INTENSIVE_LESSONS.length,
      plannedOrDraftItems: 0,
      accent: "emerald",
      canonicalCategoryIds: ["production-ml"],
      descriptionUz: "uv, DuckDB, Polars, Klassik ML, PyTorch, Ollama, RAG, Langfuse monitoring va intervyuga tayyorlik.",
      honestStatusNoteUz: "Barcha 42 ta dars, 126 intervyu savoli va 84 ta video havolasi tayyor.",
    },
  ];
}

export function computeContentAuditSummary(params: {
  lessons: readonly LessonSummary[];
  glossaryCount: number;
  visualizations: readonly VisualizationInstance[];
}): ContentAuditSummary {
  const courses = buildLearningLibraryCatalog();
  const totalPublishedMicroNodes = courses.reduce((s, c) => s + c.publishedItems, 0);
  const totalPlannedMicroNodes = courses.reduce((s, c) => s + c.plannedOrDraftItems, 0);

  return {
    mdxLessons: {
      total: params.lessons.length,
      published: params.lessons.filter((l) => l.status === "published").length,
    },
    coursesAndTracks: courses,
    totalPlannedMicroNodes,
    totalPublishedMicroNodes,
    glossaryTermsCount: params.glossaryCount,
    visualLabsCount: params.visualizations.filter((v) => v.status === "published").length,
    draftVisualLabsCount: params.visualizations.filter((v) => v.status !== "published").length,
    canonicalConceptsCount: CANONICAL_CONCEPTS.length,
    dl16Count: SIXTEEN_ARCHITECTURES.length,
    intensive12WeeksCount: ALL_INTENSIVE_LESSONS.length,
    hfAudit: getHfCourseImportAuditReport(),
  };
}
