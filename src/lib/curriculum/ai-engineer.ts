/**
 * Canonical 20-Phase, 291-Micro-Lesson AI Engineer Curriculum Registry.
 *
 * Source of truth:
 * - `src/content/curriculum/ai-engineer-curriculum.json` (imported from `ai engineering/AI_Engineer_Curriculum.json`)
 * - `ai engineering/AI_Engineer_20_Phase_Roadmap.md`
 * - `ai engineering/AI_Engineer_Micro_Lesson_Namuna.md`
 */

import rawCurriculum from "@/content/curriculum/ai-engineer-curriculum.json";
import type { LearningDepth, TopicRole } from "./paths";
import {
  AI_291_LESSONS_MAP,
  AI_291_PHASES,
  type Ai291Lesson,
  type AiExampleItem,
  type AiCommonMistakeItem,
  type AiQuizQuestion,
  type AiPracticeTask,
} from "./ai-engineering-291-dataset";

export type AiEngineerTrackId =
  | "general-ai"
  | "llm-apps"
  | "rag-engineer"
  | "agent-mcp"
  | "local-ai"
  | "multimodal";

export type MicroLessonStatus = "planned" | "draft" | "reviewed" | "published";

export interface GuidedLearningStep {
  id: string;
  stepNumber: number;
  depth: LearningDepth;
  type: "intuition" | "visual" | "calculation" | "formula" | "code" | "misconception" | "checkpoint";
  title: string;
  body: string;
  codeSnippet?: string;
  formula?: string;
  visualizationId?:
    | "cosine-similarity-explorer"
    | "rag-sandbox-explorer"
    | "self-attention-explorer"
    | "function-explorer"
    | "gradient-descent-1d"
    | "neural-network-explorer";
  provenance: "source-backed" | "curriculum-scaffold" | "illustrative-example";
  tushunmadim: {
    simplerBreakdown: string;
    numericMicroExample: string;
    prerequisiteLessonId?: string;
    prerequisiteTitle?: string;
  };
  checkpoint?: {
    question: string;
    options: readonly string[];
    correctIndex: number;
    explanation: string;
    whyQuestion: string;
  };
}

export interface AiEngineerMicroLesson {
  id: string;
  phaseId: string;
  order: number;
  title: string;
  status: MicroLessonStatus;
  publishedDepths: LearningDepth[];
  targetDepths: LearningDepth[];
  sourceRefs: string[];
  objective: string;
  prerequisites: string[];
  relatedResearchSlug?: string;
  visualizationId?: GuidedLearningStep["visualizationId"];
  visualFlow?: readonly { step: number; label: string; detail: string }[];
  guidedSteps?: readonly GuidedLearningStep[];
  theoryUz?: string;
  examples?: AiExampleItem[];
  commonMistakes?: AiCommonMistakeItem[];
  quiz?: AiQuizQuestion[];
  practiceTasks?: AiPracticeTask[];
  summaryTakeaways?: string[];
  upstreamUrl?: string;
  learningObjectiveUz?: string;
  pythonPrerequisites?: string[];
}

export interface AiEngineerPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  visualizationConcept: string;
  projectMilestone: string;
  completionCriteria: string;
  relatedResearchSlugs: readonly string[];
  defaultVisualizationId: NonNullable<GuidedLearningStep["visualizationId"]>;
  lessons: readonly AiEngineerMicroLesson[];
}

export interface AiEngineerTrack {
  id: AiEngineerTrackId;
  label: string;
  shortLabel: string;
  description: string;
  deepPhaseIds: readonly string[];
  supportingPhaseIds: readonly string[];
  electivePhaseIds: readonly string[];
}

export interface PracticalProjectMilestone {
  id: string;
  number: number;
  title: string;
  phaseRange: string;
  phaseIds: readonly string[];
  verifiableOutcome: string;
}

export const AI_ENGINEER_TRACKS: readonly AiEngineerTrack[] = [
  {
    id: "general-ai",
    label: "General AI Engineer",
    shortLabel: "General AI",
    description:
      "01–10 va 12–19 bosqichlarni to‘liq qamrab oluvchi universal AI muhandisi yo‘nalishi (11 va 20 — qiziqishga ko‘ra chuqurlashish).",
    deepPhaseIds: [
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
      "12", "13", "14", "15", "16", "17", "18", "19",
    ],
    supportingPhaseIds: [],
    electivePhaseIds: ["11", "20"],
  },
  {
    id: "llm-apps",
    label: "AI Application / LLM Engineer",
    shortLabel: "LLM Apps",
    description:
      "Tayyor LLM API, Prompt/Context Engineering, Structured Output, xavfsizlik va Production AI ilovalarini qurish (Phase 03–10, 19).",
    deepPhaseIds: ["03", "04", "05", "06", "07", "08", "09", "10", "19"],
    supportingPhaseIds: ["01", "02", "12", "14", "15"],
    electivePhaseIds: ["11", "20"],
  },
  {
    id: "rag-engineer",
    label: "RAG Engineer",
    shortLabel: "RAG Engineer",
    description:
      "Embeddings, Vektor matematika, Vector DB, Hujjat indeksatsiyasi, Grounded Retrieval, Citation va Hit@k/MRR baholash (Phase 03–09, 12–16, 19).",
    deepPhaseIds: ["03", "04", "05", "06", "07", "08", "09", "12", "13", "14", "15", "16", "19"],
    supportingPhaseIds: ["01", "02", "10"],
    electivePhaseIds: ["17", "18"],
  },
  {
    id: "agent-mcp",
    label: "AI Agent / MCP Engineer",
    shortLabel: "Agents & MCP",
    description:
      "Avtonom ReAct agentlar, Tool Calling, ruxsatlar (permissions), Model Context Protocol (MCP) va kuzatuvchanlik (Phase 03–10, 17–19).",
    deepPhaseIds: ["03", "04", "05", "06", "07", "08", "09", "10", "17", "18", "19"],
    supportingPhaseIds: ["12", "13", "14", "15", "16"],
    electivePhaseIds: ["11", "20"],
  },
  {
    id: "local-ai",
    label: "Local AI Engineer",
    shortLabel: "Local AI",
    description:
      "Open-weight modellar, GGUF, Quantization, RAM/VRAM hisobi, Ollama/LM Studio va lokal xavfsiz inference (Phase 03–06, 10–11, 19).",
    deepPhaseIds: ["03", "04", "05", "06", "10", "11", "19"],
    supportingPhaseIds: ["01", "02", "07", "08", "09"],
    electivePhaseIds: ["12", "14", "15"],
  },
  {
    id: "multimodal",
    label: "Multimodal AI Engineer",
    shortLabel: "Multimodal AI",
    description:
      "Matn, tasvir (Vision Q&A), nutq (STT/TTS) va audio quvurlarini birlashtiruvchi multimodal AI tizimlari (Phase 03–10, 19–20).",
    deepPhaseIds: ["03", "04", "05", "06", "07", "08", "09", "10", "19", "20"],
    supportingPhaseIds: ["12", "13", "14", "15", "16", "17", "18"],
    electivePhaseIds: ["11"],
  },
];

export const PRACTICAL_PROJECTS: readonly PracticalProjectMilestone[] = [
  {
    id: "proj-1-fastapi",
    number: 1,
    title: "Python + FastAPI servis",
    phaseRange: "Phase 02–03",
    phaseIds: ["02", "03"],
    verifiableOutcome: "Pydantic sxema validatsiyasi va REST endpoint xatosiz ishlashi.",
  },
  {
    id: "proj-2-llm-streaming",
    number: 2,
    title: "LLM API + Prompt + JSON + Streaming",
    phaseRange: "Phase 04–09",
    phaseIds: ["04", "05", "06", "07", "08", "09"],
    verifiableOutcome: "To‘g‘ri JSON format, timeout/retry xatolarni ushlash va server-side API kalit himoyasi.",
  },
  {
    id: "proj-3-local-guardrails",
    number: 3,
    title: "Local LLM + Basic Guardrails",
    phaseRange: "Phase 10–11",
    phaseIds: ["10", "11"],
    verifiableOutcome: "Lokal inference (Ollama/GGUF) va prompt injection/ruxsat cheklovlari.",
  },
  {
    id: "proj-4-rag-qa",
    number: 4,
    title: "RAG hujjat savol-javobi",
    phaseRange: "Phase 12–16",
    phaseIds: ["12", "13", "14", "15", "16"],
    verifiableOutcome: "Source citation ([chunk-id]), No-Answer siyosati va Hit@k / MRR qidiruv testlari.",
  },
  {
    id: "proj-5-agent-mcp",
    number: 5,
    title: "Tool Agent + MCP + Evals",
    phaseRange: "Phase 17–19",
    phaseIds: ["17", "18", "19"],
    verifiableOutcome: "Tool permission darvozasi, request tracing va regression evaluation.",
  },
  {
    id: "proj-6-multimodal-capstone",
    number: 6,
    title: "Multimodal AI & Capstone (“AI Knowledge Assistant”)",
    phaseRange: "Phase 20",
    phaseIds: ["20"],
    verifiableOutcome: "RAG + Read-only MCP Tool + No-answer + Prompt-injection himoyasi + Evaluation hisobot.",
  },
];

// ---------------------------------------------------------------------------
// Authored Vertical Slice Micro-Lessons (Phase 12 & Phase 14–16)
// ---------------------------------------------------------------------------

const AUTHORED_MICRO_LESSONS: Record<
  string,
  {
    status: MicroLessonStatus;
    publishedDepths: LearningDepth[];
    objective: string;
    prerequisites: string[];
    sourceRefs: string[];
    visualizationId: GuidedLearningStep["visualizationId"];
    guidedSteps: readonly GuidedLearningStep[];
  }
> = {
  "12.02": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "2D vektorni koordinata tekisligida (x, y) yo‘nalish va uzunlikka ega strelka sifatida qurish va tahlil qilish.",
    prerequisites: ["12.01"],
    sourceRefs: ["sanderson-2017", "goodfellow-2016"],
    visualizationId: "cosine-similarity-explorer",
    guidedSteps: [
      {
        id: "12.02-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Muammo: Bitta son yetarli bo‘lmaganda",
        body: "Haroratni bitta son bilan (+25°C) aytish mumkin. Ammo xaritada harakatni aytish uchun ikkita ma’lumot kerak: sharqqa qancha (x) va shimolga qancha (y) yurildi? Shu juftlik (x, y) — 2D vektordir.",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Shaxmat taxtasida yurish uchun ustun va qatorni birgalikda aytgandek, 2D vektor ham (gorizontal, vertikal) qadamlar juftligidir.",
          numericMicroExample: "A = (1, 0) — 1 qadam o‘ngga, 0 qadam yuqoriga. B = (0, 1) — 0 qadam o‘ngga, 1 qadam yuqoriga.",
          prerequisiteLessonId: "12.01",
          prerequisiteTitle: "12.01 — Koordinata nima?",
        },
      },
      {
        id: "12.02-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — 2D Vektorni jonli tekislikda sinab ko‘rish",
        body: "Quyidagi laboratoriyada b₁ (X) va b₂ (Y) slayderlarini suring. B = (x, y) strelkasi (0, 0) boshlang‘ich nuqtadan qaysi tomonga qarashini kuzating.",
        visualizationId: "cosine-similarity-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Slayderni b₁ = 1, b₂ = 1 ga qo‘ysangiz, strelka 45° burchak ostida o‘ng-yuqoriga qaraydi.",
          numericMicroExample: "B = (1, 1) -> X bo‘yicha +1, Y bo‘yicha +1.",
        },
      },
      {
        id: "12.02-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Kod va Tekshiruv",
        body: "Python’da 2D vektor oddiy tuple `(x, y)` yoki `list[float]` sifatida ifodalanadi.",
        codeSnippet: `A = (1.0, 0.0)\nB = (1.0, 1.0)\nprint("A vektor o'lchami (dimension):", len(A)) # 2`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Vektor ichida nechta son bo‘lsa, uning o‘lchami (dimension) shunga teng.",
          numericMicroExample: "(1, 0) da 2 ta komponent bor -> 2D.",
        },
        checkpoint: {
          question: "B = (-2, 0) vektori koordinata tekisligida qaysi yo‘nalishga qaraydi?",
          options: [
            "Chap tomonga (X o‘qi bo‘ylab manfiy yo‘nalishda, uzunligi 2)",
            "Yuqoriga (Y o‘qi bo‘ylab)",
            "O‘ng tomonga",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! b₁ = -2 chapga 2 birlikni, b₂ = 0 esa vertikal siljish yo‘qligini bildiradi.",
          whyQuestion: "Nega (0, 0) vektorda yo‘nalish bo‘lmaydi? Chunki boshlang‘ich va tugash nuqtasi ustma-ust tushadi.",
        },
      },
    ],
  },

  "12.04": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "Vektor uzunligini (L2 Norm ||A||) Pifagor teoremasi orqali hisoblash va nol vektor holatini ajratish.",
    prerequisites: ["12.02"],
    sourceRefs: ["sanderson-2017", "goodfellow-2016"],
    visualizationId: "cosine-similarity-explorer",
    guidedSteps: [
      {
        id: "12.04-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Vektor uzunligi (Norm) nima?",
        body: "Vektorning normi ||A|| — bu (0, 0) nuqtadan vektor uchigacha bo‘lgan to‘g‘ri chiziqli masofa (strelkaning haqiqiy uzunligi).",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Xonaning burchagidan3 metr o‘ngga va 4 metr oldinga yursangiz, burchakdan sizgacha to‘g‘ri chiziq 5 metr bo‘ladi (Pifagor teoremasi).",
          numericMicroExample: "A = (3, 4) -> ||A|| = √(3² + 4²) = √(9 + 16) = √25 = 5.",
          prerequisiteLessonId: "12.02",
          prerequisiteTitle: "12.02 — 2D vektor",
        },
      },
      {
        id: "12.04-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "formula",
        title: "Qadam 2 — L2 Norm formulasi va hisobi",
        body: "2D vektor A = (a₁, a₂) uchun uzunlik komponentlar kvadratlari yig‘indisining kvadrat ildiziga teng: ||A|| = √(a₁² + a₂²). C = (1, 1) bo‘lsa: ||C|| = √(1² + 1²) = √2 ≈ 1.4142.",
        formula: "\\|A\\| = \\sqrt{a_1^2 + a_2^2}",
        visualizationId: "cosine-similarity-explorer",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Manfiy son kvadrati ham musbat bo‘lgani uchun (masalan, (-3)² = 9), vektor uzunligi hech qachon manfiy bo‘lmaydi. Faqat (0, 0) da norm 0 ga teng.",
          numericMicroExample: "A = (1, 0) -> √(1² + 0²) = 1. C = (1, 1) -> √(1² + 1²) = √2 ≈ 1.4142.",
          prerequisiteLessonId: "12.02",
          prerequisiteTitle: "12.02 — 2D vektor",
        },
      },
      {
        id: "12.04-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Kod va Tekshiruv",
        body: "Python’da `math.sqrt(sum(x * x for x in a))` orqali istalgan o‘lchamli vektor normi hisoblanadi.",
        codeSnippet: `import math\ndef vector_norm(a: tuple[float, ...]) -> float:\n    return math.sqrt(sum(x * x for x in a))\n\nprint("||C|| for (1, 1):", round(vector_norm((1, 1)), 4)) # 1.4142`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Har bir koordinatani o‘ziga ko‘paytirib (`x * x`), yig‘indidan ildiz (`math.sqrt`) olamiz.",
          numericMicroExample: "(3, 4) -> 3*3 + 4*4 = 25 -> sqrt(25) = 5.0.",
        },
        checkpoint: {
          question: "A = (3, 4) vektorining uzunligi (L2 normi ||A||) nechaga teng?",
          options: ["5", "7", "12"],
          correctIndex: 0,
          explanation: "To‘g‘ri! ||A|| = √(3² + 4²) = √(9 + 16) = √25 = 5.",
          whyQuestion: "Nima uchun norm faqat B=(0,0) bo‘lgandagina 0 ga teng bo‘ladi?",
        },
      },
    ],
  },

  "12.05": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "Ikki vektorning skalyar ko‘paytmasini (Dot Product A·B) mos komponentlarni ko‘paytirib qo‘shish orqali hisoblash.",
    prerequisites: ["12.02", "12.04"],
    sourceRefs: ["sanderson-2017", "goodfellow-2016"],
    visualizationId: "cosine-similarity-explorer",
    guidedSteps: [
      {
        id: "12.05-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Dot Product nima uchun kerak?",
        body: "Ikki vektor bir-biri bilan qanchalik 'hamohang' yo‘nalganini tekshirish uchun mos koordinatalarni ko‘paytirib qo‘shamiz. Natija vektor emas, bitta son (skalyar) bo‘ladi.",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "1-koordinatani 1-koordinataga, 2-koordinatani 2-koordinataga ko‘paytiring va natijalarni qo‘shing.",
          numericMicroExample: "A = (1, 0), C = (1, 1) -> A·C = 1×1 + 0×1 = 1.",
          prerequisiteLessonId: "12.02",
          prerequisiteTitle: "12.02 — 2D vektor",
        },
      },
      {
        id: "12.05-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "formula",
        title: "Qadam 2 — Formula va ishora ma’nosi",
        body: "A·B = a₁b₁ + a₂b₂. Agar burchak 90° bo‘lsa (tik vektorlar), Dot Product aynan 0 chiqadi! O‘tkir burchakda (<90°) musbat, o‘tmas burchakda (>90°) manfiy chiqadi.",
        formula: "A \\cdot B = a_1 b_1 + a_2 b_2",
        visualizationId: "cosine-similarity-explorer",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Laboratoriyada '90° (Tik): B=(0,1)' tugmasini bosing: 1×0 + 0×1 = 0 chiqishini ko‘rasiz.",
          numericMicroExample: "A=(2, 3), B=(4, -1) -> 2×4 + 3×(-1) = 8 - 3 = 5.",
          prerequisiteLessonId: "12.04",
          prerequisiteTitle: "12.04 — Vektor uzunligi (norm)",
        },
      },
      {
        id: "12.05-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Kod va Tekshiruv",
        body: "Dot product vektor uzunligiga ham bog‘liq: vektorlardan biri 10 barobar uzaysa, burchak o‘zgarmasa ham dot product 10 barobar oshadi. Shu sababli sof yo‘nalishni o‘lchash uchun keyingi darsda Cosine Similarity ga o‘tamiz.",
        codeSnippet: `def dot_product(a: tuple[float, ...], b: tuple[float, ...]) -> float:\n    return sum(x * y for x, y in zip(a, b))\n\nprint("A·C:", dot_product((1, 0), (1, 1))) # 1`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "`zip(a, b)` mos elementlarni juftlaydi, `x * y` ko‘paytiradi, `sum` esa qo‘shadi.",
          numericMicroExample: "A=(1,0), B=(0,1) -> 1*0 + 0*1 = 0.",
        },
        checkpoint: {
          question: "A = (1, 0) va B = (0, 1) vektorlarining Dot Product (A·B) qiymati nechaga teng?",
          options: ["0 (chunki ular 90° tik joylashgan)", "1", "2"],
          correctIndex: 0,
          explanation: "To‘g‘ri! 1×0 + 0×1 = 0.",
          whyQuestion: "Nima uchun Dot Product ning o‘zi sof yo‘nalish o‘xshashligini o‘lchashga yetarli emas?",
        },
      },
    ],
  },

  "12.07": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "Ikki nol bo‘lmagan vektor orasidagi burchak kosinusini (Cosine Similarity) dot product va norm yordamida hisoblash hamda nol vektor xatolarini ushlash.",
    prerequisites: ["12.02", "12.04", "12.05"],
    sourceRefs: ["sanderson-2017", "goodfellow-2016"],
    visualizationId: "cosine-similarity-explorer",
    guidedSteps: [
      {
        id: "12.07-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Muammo: Uzunlik emas, yo‘nalish muhim bo‘lganda",
        body: "Tasavvur qiling, ikkita yo‘nalishni taqqoslamoqchisiz. Bir vektor uzun, boshqasi qisqa bo‘lishi mumkin. Bizga bu safar uzunlik emas, yo‘nalish qanchalik o‘xshash ekani qiziq.",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Kompas strelkasi kichik bo‘lsa ham, katta bo‘lsa ham shimolni ko‘rsatsa — ularning yo‘nalishi 100% bir xil (+1).",
          numericMicroExample: "A = (1, 0) va D = (5, 0) turli uzunlikda, lekin bir xil yo‘nalishda -> cos = 1.",
          prerequisiteLessonId: "12.02",
          prerequisiteTitle: "12.02 — 2D vektor",
        },
      },
      {
        id: "12.07-step-2",
        stepNumber: 2,
        depth: "overview",
        type: "intuition",
        title: "Qadam 2 — Cosine similarity nima?",
        body: "Cosine similarity ikki nol bo‘lmagan vektor orasidagi burchak kosinusini hisoblaydi: +1 — bir yo‘nalish (0°), 0 — tik (90°), −1 — qarama-qarshi yo‘nalish (180°).",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Qiymat doim -1 va +1 orasida chiqadi. 1 ga qanchalik yaqin bo‘lsa, burchak shunchalik kichik.",
          numericMicroExample: "0° -> cos = 1.0 | 45° -> cos ≈ 0.7071 | 90° -> cos = 0.0 | 180° -> cos = -1.0.",
          prerequisiteLessonId: "12.02",
          prerequisiteTitle: "12.02 — 2D vektor",
        },
      },
      {
        id: "12.07-step-3",
        stepNumber: 3,
        depth: "overview",
        type: "visual",
        title: "Qadam 3 — Oddiy tasvir: A=(1,0), B=(0,1), C=(1,1)",
        body: "A = (1, 0) → o‘ngga qaragan strelka. B = (0, 1) → yuqoriga qaragan strelka (A ga 90° tik). C = (1, 1) → 45° yo‘nalishdagi strelka (A bilan qisman bir yo‘nalishda).",
        visualizationId: "cosine-similarity-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Quyidagi laboratoriyada 90° va 45° namuna tugmalarini bosib, strelkalar burchagini solishtiring.",
          numericMicroExample: "A=(1,0) va B=(0,1) o‘rtasidagi burchak = 90°.",
        },
        checkpoint: {
          question: "Mini-check: A = (1, 0) va B = (0, 1) vektorlari o‘rtasidagi burchak necha gradus?",
          options: ["90°", "45°", "180°"],
          correctIndex: 0,
          explanation: "To‘g‘ri! Gorizontal (X) va vertikal (Y) o‘qlar o‘zaro 90° tik kesishadi.",
          whyQuestion: "Nega 90° burchakda yo‘nalish o‘xshashligi 0 deb olinadi?",
        },
      },
      {
        id: "12.07-step-4",
        stepNumber: 4,
        depth: "understand",
        type: "calculation",
        title: "Qadam 4 — Dot product nimani beradi?",
        body: "A = (1, 0) va C = (1, 1) uchun skalyar ko‘paytma (dot product): A·C = 1×1 + 0×1 = 1.",
        formula: "A \\cdot C = 1 \\times 1 + 0 \\times 1 = 1",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Mos koordinatalarni bir-biriga ko‘paytirib qo‘shamiz: x₁·x₂ + y₁·y₂. Agar norm yoki dot product tushunarsiz bo‘lsa, 12.04 darsiga o‘ting va aynan shu qadamga qayting!",
          numericMicroExample: "1×1 + 0×1 = 1 + 0 = 1.",
          prerequisiteLessonId: "12.04",
          prerequisiteTitle: "12.04 — Vektor uzunligi (norm)",
        },
      },
      {
        id: "12.07-step-5",
        stepNumber: 5,
        depth: "understand",
        type: "calculation",
        title: "Qadam 5 — Vektor uzunliklari (Norm)",
        body: "Har bir vektorning Pifagor teoremasi bo‘yicha uzunligi (L2 normasi): ||A|| = √(1² + 0²) = 1 va ||C|| = √(1² + 1²) = √2 ≈ 1.4142.",
        formula: "\\|A\\| = \\sqrt{1^2 + 0^2} = 1, \\quad \\|C\\| = \\sqrt{1^2 + 1^2} = \\sqrt{2} \\approx 1.4142",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Vektor uzunligi — (0,0) boshlang‘ich nuqtadan (x,y) nuqtagacha bo‘lgan masofa.",
          numericMicroExample: "C=(1,1) uchun √(1+1) = √2 ≈ 1.4142.",
          prerequisiteLessonId: "12.04",
          prerequisiteTitle: "12.04 — Vektor uzunligi (norm)",
        },
      },
      {
        id: "12.07-step-6",
        stepNumber: 6,
        depth: "understand",
        type: "formula",
        title: "Qadam 6 — Cosine similarity formulasi",
        body: "Endi dot productni vektorlar uzunliklari ko‘paytmasiga bo‘lamiz: cos(A, C) = (A·C) / (||A|| · ||C||) = 1 / (1 × √2) ≈ 0.7071 (45°).",
        formula: "\\cos(A, C) = \\frac{A \\cdot C}{\\|A\\|\\,\\|C\\|} = \\frac{1}{1 \\times \\sqrt{2}} \\approx 0.7071",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Dot productni ikkala vektor uzunliklari ko‘paytmasiga bo‘lish orqali uzunlik ta’sirini yo‘qotamiz — faqat burchak kosinusi qoladi.",
          numericMicroExample: "1 / 1.41421356 = 0.70710678 ≈ 0.7071.",
          prerequisiteLessonId: "12.05",
          prerequisiteTitle: "12.05 — Dot product",
        },
      },
      {
        id: "12.07-step-7",
        stepNumber: 7,
        depth: "understand",
        type: "visual",
        title: "Qadam 7 — Interaktiv tajriba: Vektor B ni o‘zgartiring",
        body: "Quyidagi interaktiv laboratoriyada B vektor koordinatalarini o‘zgartirib, A·B, ||A||, ||B||, cos(θ) va burchak gradusini jonli kuzating.",
        visualizationId: "cosine-similarity-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Slayder orqali B_x va B_y ni o‘zgartiring yoki 0°, 45°, 90°, 180° namuna tugmalarini bosing.",
          numericMicroExample: "B=(1,0) -> cos=1; B=(1,1) -> cos≈0.7071; B=(0,1) -> cos=0.",
        },
      },
      {
        id: "12.07-step-8",
        stepNumber: 8,
        depth: "understand",
        type: "misconception",
        title: "Qadam 8 — Muhim ogohlantirish: Soxta foiz talqinidan saqlaning",
        body: "0.7071 — shu 2D geometrik misoldagi burchak kosinusi (cos 45°). Bu 'ikki matn 70.71% bir xil' degani emas! Haqiqiy matn embeddinglari yuzlab yoki minglab o‘lchamli bo‘ladi.",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Cosine similarity matndagi so‘zlar foizini emas, embedding fazodagi yo‘nalish yaqinligini ko‘rsatadi.",
          numericMicroExample: "cos(45°) ≈ 0.7071 — bu geometrik nisbat.",
        },
      },
      {
        id: "12.07-step-9",
        stepNumber: 9,
        depth: "understand",
        type: "misconception",
        title: "Qadam 9 — Ko‘p uchraydigan xato: Nol vektor B = (0, 0)",
        body: "Agar B = (0, 0) bo‘lsa, ||B|| = 0 bo‘ladi. Formulada maxraj ||A|| × ||B|| = 0 bo‘lib qoladi. Nolga bo‘lish mumkin emas va nol vektorning yo‘nalishi yo‘q!",
        formula: "\\|B\\| = 0 \\implies \\frac{A \\cdot B}{\\|A\\| \\times 0} \\text{ — aniqlanmagan!}",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Nuqtaning (0,0) strelka yo‘nalishi bo‘lmaydi, shuning uchun u bilan burchak o‘lchab bo‘lmaydi.",
          numericMicroExample: "B=(0,0) -> ||B||=0 -> ValueError('Nol vektor uchun cosine aniqlanmagan').",
        },
      },
      {
        id: "12.07-step-10",
        stepNumber: 10,
        depth: "master",
        type: "code",
        title: "Qadam 10 — Master: Python funksiyasi va xatolarni tekshirish",
        body: "Vektor o‘lchamlari mosligini, bo‘sh emasligini va nol vektor emasligini tekshiruvchi toza Python funksiyasi.",
        codeSnippet: `import math

def cosine_similarity(a: tuple[float, ...], b: tuple[float, ...]) -> float:
    if len(a) != len(b):
        raise ValueError("Vektor o'lchamlari mos emas")
    if not a:
        raise ValueError("Vektor bo'sh bo'lmasin")
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        raise ValueError("Nol vektor uchun cosine aniqlanmagan")
    return dot / (norm_a * norm_b)`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Agar norm_a == 0 yoki norm_b == 0 bo‘lsa, 0 ga bo‘lish yuz bermasligi uchun ValueError qaytaramiz.",
          numericMicroExample: "cosine_similarity((1,0), (1,1)) -> 0.70710678",
          prerequisiteLessonId: "12.04",
          prerequisiteTitle: "12.04 — Vektor uzunligi (norm)",
        },
      },
      {
        id: "12.07-step-11",
        stepNumber: 11,
        depth: "master",
        type: "code",
        title: "Qadam 11 — Master: Assert testlar bilan tekshirish",
        body: "Har bir muhandislik funksiyasi aniq chegara holatlari (45°, 90°, 180°) bilan test qilinishi shart.",
        codeSnippet: `assert math.isclose(cosine_similarity((1, 0), (1, 1)), 1 / math.sqrt(2))
assert math.isclose(cosine_similarity((1, 0), (0, 1)), 0.0)
assert math.isclose(cosine_similarity((2, 0), (-3, 0)), -1.0)`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "math.isclose suzuvchi nuqtali sonlarni (floating-point) xavfsiz solishtiradi.",
          numericMicroExample: "1 / math.sqrt(2) ≈ 0.7071067811865475",
        },
      },
      {
        id: "12.07-step-12",
        stepNumber: 12,
        depth: "master",
        type: "calculation",
        title: "Qadam 12 — Master amaliy mashq: A=(2,0) va B=(-3,0)",
        body: "1) A=(2,0) va B=(-3,0) uchun cosine similarity toping: dot = -6, ||A|| = 2, ||B|| = 3 -> cos = -6 / 6 = -1.0.\n2) Nima uchun natija manfiy? Chunki vektorlar 180° qarama-qarshi yo‘nalishda.\n3) Nima uchun B=(0,0) bo‘lsa xato qaytishi kerak? Chunki 0 ga bo‘lish va yo‘nalishsiz vektor uchun burchak mavjud emas.",
        formula: "\\cos((2,0), (-3,0)) = \\frac{2 \\times (-3) + 0 \\times 0}{2 \\times 3} = \\frac{-6}{6} = -1",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Uzunliklar 2 va 3 bo‘lsa ham, maxrajda 2×3=6 ga bo‘lingani uchun natija sof -1 chiqadi.",
          numericMicroExample: "-6 / (2 * 3) = -1.0",
        },
      },
      {
        id: "12.07-step-13",
        stepNumber: 13,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 13 — Yakuniy tekshiruv va keyingi darsga o‘tish",
        body: "Agar tushungan bo‘lsangiz: → 12.08 — Euclidean distance va cosine farqi. Agar norm yoki dot productda qiynalsangiz: → 12.04 yoki 12.05 ga qayting.",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Cosine similarity faqat burchakka qaraydi, Euclidean distance esa uchlari orasidagi to‘g‘ri chiziqli masofani o‘lchaydi.",
          numericMicroExample: "Keyingi qadam: 12.08 — Euclidean distance va cosine farqi.",
          prerequisiteLessonId: "12.05",
          prerequisiteTitle: "12.05 — Dot product",
        },
        checkpoint: {
          question: "A = (2, 0) va B = (-3, 0) vektorlari uchun Cosine Similarity nechaga teng va nega?",
          options: [
            "-1 ga teng, chunki ikki vektor 180° qarama-qarshi yo‘nalishda joylashgan (-6 / (2 × 3) = -1)",
            "0 ga teng, chunki ular tik joylashgan",
            "-6 ga teng, chunki 2 × (-3) = -6",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! Dot product = -6, uzunliklar 2 va 3. -6 / (2 × 3) = -1. Uzunliklar 2 va 3 bo‘lsa ham cosine aniq -1 chiqadi!",
          whyQuestion: "Nima uchun B = (0, 0) bo‘lganda 0 qaytarish o‘rniga ValueError qaytarish kerak?",
        },
      },
    ],
  },

  "14.06": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "Hujjatlarni Chunk size va Chunk overlap bilan bo‘laklash hamda chegaradagi ma’no uzilishini bartaraf etish.",
    prerequisites: ["01.08", "01.09"],
    sourceRefs: ["lewis-2020"],
    visualizationId: "rag-sandbox-explorer",
    guidedSteps: [
      {
        id: "14.06-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Nima uchun butun kitobni promptga joylab bo‘lmaydi?",
        body: "100 betlik hujjatni har bir savolda LLM ga yuborish qimmat, sekin va 'lost-in-the-middle' (o‘rtadagi faktlarni e’tiborsiz qoldirish) muammosini keltirib chiqaradi. Shuning uchun hujjat mantiqiy bo‘laklarga — chunk'larga ajratiladi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Kitobdan bitta qoidani topish uchun butun kitobni ko‘chirib yozmaysiz — faqat kerakli paragrafni (chunkni) olasiz.",
          numericMicroExample: "1000 so‘zli matn 30 so‘zdan ~35 ta kichik chunkka bo‘linadi.",
        },
      },
      {
        id: "14.06-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Chunk size va Chunk overlap tajribasi",
        body: "Quyidagi RAG laboratoriyasida 'Chunk size' va 'Chunk overlap' slayderlarini o‘zgartiring: overlap 0 bo‘lganda jumla o‘rtasidan uzilib qolishi, overlap qo‘shilganda esa qo‘shni chunklar bog‘lanishi saqlanishini kuzating.",
        visualizationId: "rag-sandbox-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Overlap — bu 1-bo‘lakning oxirgi 5–6 so‘zini 2-bo‘lakning boshida ham takrorlashdir, shunda jumla uzilib qolmaydi.",
          numericMicroExample: "Size = 28, Overlap = 6 bo‘lsa, har yangi chunk 28 - 6 = 22 so‘z oldinga siljiydi.",
        },
      },
      {
        id: "14.06-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Kod va Tekshiruv",
        body: "Sirpanuvchi oyna (sliding window) algoritmi: `step = chunk_size - overlap`.",
        codeSnippet: `def chunk_words(words: list[str], size: int, overlap: int) -> list[str]:
    step = max(1, size - overlap)
    return [" ".join(words[i:i + size]) for i in range(0, len(words), step)]`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "`range(0, len(words), step)` har safar `size - overlap` qadamga siljiydi.",
          numericMicroExample: "size=20, overlap=5 -> step=15 (0..20, 15..35, 30..50).",
        },
        checkpoint: {
          question: "Chunk overlap nima uchun ishlatiladi?",
          options: [
            "Bo‘laklar chegarasida kesilib qolgan jumla va kontekst ma’nosini yo‘qotmaslik uchun",
            "Vektor o‘lchamini 2 barobar kamaytirish uchun",
            "API kalitni shifrlash uchun",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! Overlap chegara nuqtasidagi so‘zlar ikkala qo‘shni bo‘lakda ham qatnashishini ta’minlaydi.",
          whyQuestion: "Agar overlap chunk_size ga teng bo‘lib qolsa qanday xato yuz beradi (step = 0)?",
        },
      },
    ],
  },

  "15.08": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "RAG tizimida Grounded Generation, aniq manba ko‘rsatish (Citation [chunk-id]) va No-Answer siyosatini amalga oshirish.",
    prerequisites: ["12.07", "14.06"],
    sourceRefs: ["lewis-2020"],
    visualizationId: "rag-sandbox-explorer",
    guidedSteps: [
      {
        id: "15.08-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Grounded Answer va Citation nima?",
        body: "Ishonchli AI muhandisligida model o‘z ichki xotirasidan taxmin qilmasligi kerak: har bir javob topilgan hujjat bo‘lagiga (`[doc-id#c1]`) tayanishi va foydalanuvchiga aynan qaysi bo‘lakdan olinganini ko‘rsatishi shart.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Ilmiy maqolada har bir fakt oxirida [1] manba ko‘rsatilganidek, RAG javobi ham o‘zi tayangan chunk ID ni ko‘rsatadi.",
          numericMicroExample: "Javob + [doc-rag-citation#c1] (similarity = 0.89).",
          prerequisiteLessonId: "14.06",
          prerequisiteTitle: "14.06 — Chunk nima?",
        },
      },
      {
        id: "15.08-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — No-Answer siyosatini jonli tekshirish",
        body: "Quyidagi laboratoriyada 'NO-ANSWER TEST (Tashqi savol)' tugmasini bosing yoki 'No-Answer chegarasi' slayderini ko‘taring: o‘xshashlik past bo‘lganda tizim to‘qima javob bermasdan, halol ravishda ma’lumot yo‘qligini aytadi.",
        visualizationId: "rag-sandbox-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Agar eng yaqin topilgan hujjatning Cosine Similarity qiymati chegaradan (masalan, 0.20 dan) kichik bo‘lsa, LLM chaqirilmaydi yoki 'Manbada topilmadi' javobi qaytariladi.",
          numericMicroExample: "max_sim = 0.000 < threshold (0.20) -> No-Answer!",
          prerequisiteLessonId: "12.07",
          prerequisiteTitle: "12.07 — Cosine similarity",
        },
      },
      {
        id: "15.08-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Tekshiruv: Hallucination oldini olish",
        body: "RAG tizimida Hit@k, MRR va No-Answer testlari birgalikda sifatni kafolatlaydi.",
        visualizationId: "rag-sandbox-explorer",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Laboratoriyaning 'Phase 16: Hit@k & MRR Baholash' tabiga o‘tib, 4 ta test savolida qidiruv aniqligini tekshirib ko‘ring.",
          numericMicroExample: "1-o‘rinda topilsa RR = 1/1 = 1.0, 2-o‘rinda topilsa RR = 1/2 = 0.5.",
        },
        checkpoint: {
          question: "Agar foydalanuvchi korporativ hujjatlarda umuman yo‘q mavzuda savol bersa va top-k qidiruv juda past similarity qaytarsa, RAG tizimi nima qilishi kerak?",
          options: [
            "No-Answer siyosatini qo‘llab, manbada tasdiqlangan ma’lumot topilmaganini ochiq bildirish",
            "Ichki og‘irliklardan taxminiy javob to‘qib, yolg‘on citation qo‘shish",
            "Eng past ball olgan chunkni to‘g‘ri javob deb ko‘rsatish",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! No-Answer siyosati gallyutsinatsiya va noto‘g‘ri qarorlarning oldini oluvchi asosiy muhandislik himoyasidir.",
          whyQuestion: "Nima uchun yolg‘on citation oddiy gallyutsinatsiyadan ham xavfliroq?",
        },
      },
    ],
  },

  "17.05": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    objective: "ReAct (Reason + Act) paradigmasi bo'yicha agentning fikrlash, amal bajarish va natijani kuzatish siklini to'liq tushunish va dasturiy boshqarish.",
    prerequisites: ["17.04", "py-06-01", "py-18-01"],
    sourceRefs: ["yao-2022-react", "upstream-day-22"],
    visualizationId: "rag-sandbox-explorer",
    guidedSteps: [
      {
        id: "17.05-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — ReAct nima: Fikrlash va Harakat Sintezi",
        body: "ReAct (Reason + Act) — bu LLM agentining bir vaqtning o'zida ham qadam-baqadam fikrlash (Thought), ham tashqi vositalarni chaqirish (Action) va natijani ko'rish (Observation) qobiliyatidir. Bu usul gallyutsinatsiyalarni keskin kamaytiradi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Odam murakkab masalani yechishda avval o'ylaydi ('kalkulyatorni ochishim kerak'), keyin hisoblaydi, so'ng natijaga qarab keyingi qadamni belgilaydi.",
          numericMicroExample: "Thought -> Action: calculate(12 * 8) -> Observation: 96 -> Finish: 'Natija 96'.",
          prerequisiteLessonId: "17.04",
          prerequisiteTitle: "17.04 — AI Agent anatomiyasi",
        },
      },
      {
        id: "17.05-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "code",
        title: "Qadam 2 — ReAct Loop Sikli va Asboblar (Tools)",
        body: "Agent har bir siklda tashqi asbobdan qaytgan natijani (Observation) o'z kontekstiga kiritadi. Agar natija to'liq bo'lsa, 'finish' signali bilan foydalanuvchiga yakuniy javobni qaytaradi.",
        codeSnippet: `def react_step(state: dict, tool_result: str = "") -> dict:
    if tool_result:
        return {"action": "finish", "answer": f"Hisoblandi: {tool_result}"}
    return {"action": "call_tool", "tool": "calc", "arg": "12 * 8"}`,
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Asbob chaqirilib natija olinguncha agent 'kutish' holatida bo'ladi; natija kelgach, yangi fikr bilan keyingi harakatni tanlaydi.",
          numericMicroExample: "Qadam 1: call_tool -> Qadam 2: finish",
        },
      },
      {
        id: "17.05-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Xavfsiz Cheklovlar (max_iterations) va Tekshiruv",
        body: "ReAct agentlari cheksiz tsiklga (infinite loop) tushib qolmasligi uchun doimo qat'iy max_iterations chegarasi bilan o'ralishi kerak.",
        provenance: "curriculum-scaffold",
        tushunmadim: {
          simplerBreakdown: "Agar agent 5 qadam ichida natijaga yetolmasa, tokenlar zoe ketmasligi uchun to'xtatilib, xato xabari beriladi.",
          numericMicroExample: "max_iterations = 5 -> agar step == 5 bo'lsa to'xtash.",
        },
        checkpoint: {
          question: "ReAct arxitekturasida asosiy 3 ta sikl bosqichining to'g'ri ketma-ketligi qaysi?",
          options: [
            "Thought (Fikr) → Action (Harakat) → Observation (Kuzatuv)",
            "Action → Observation → Thought",
            "Observation → Finish → Action",
            "Prompt → Output → Test",
          ],
          correctIndex: 0,
          explanation: "To'g'ri! ReAct = Reason + Act. Avval fikrlash (Thought), keyin amal (Action) va natijani kuzatish (Observation) sikli ishlaydi.",
          whyQuestion: "Nega agent harakat qilmasdan oldin fikrlashi (Thought) uning aniqligini oshiradi?",
        },
      },
    ],
  },
};

// Map each of the 20 phases to related existing Deep Research lessons & default simulator
const PHASE_ENRICHMENT: Record<
  string,
  {
    relatedResearchSlugs: readonly string[];
    defaultVisualizationId: NonNullable<GuidedLearningStep["visualizationId"]>;
  }
> = {
  "01": {
    relatedResearchSlugs: ["artificial-intelligence", "machine-learning", "deep-learning", "llm"],
    defaultVisualizationId: "self-attention-explorer",
  },
  "02": {
    relatedResearchSlugs: ["production-ready-ml-structure", "atomic-note"],
    defaultVisualizationId: "function-explorer",
  },
  "03": {
    relatedResearchSlugs: ["production-ready-ml-structure", "production-ml-pipeline"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "04": {
    relatedResearchSlugs: ["tokenization", "transformers", "llm", "backpropagation"],
    defaultVisualizationId: "self-attention-explorer",
  },
  "05": {
    relatedResearchSlugs: ["llm", "transformers"],
    defaultVisualizationId: "self-attention-explorer",
  },
  "06": {
    relatedResearchSlugs: ["llm", "production-ml-pipeline"],
    defaultVisualizationId: "self-attention-explorer",
  },
  "07": {
    relatedResearchSlugs: ["prompt-engineering", "llm"],
    defaultVisualizationId: "self-attention-explorer",
  },
  "08": {
    relatedResearchSlugs: ["probability", "tools", "prompt-engineering"],
    defaultVisualizationId: "function-explorer",
  },
  "09": {
    relatedResearchSlugs: ["memory", "prompt-engineering", "rag"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "10": {
    relatedResearchSlugs: ["prompt-engineering", "ai-agent", "tools"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "11": {
    relatedResearchSlugs: ["llm", "tensor", "matrix-operations"],
    defaultVisualizationId: "neural-network-explorer",
  },
  "12": {
    relatedResearchSlugs: ["vector", "matrix", "matrix-operations", "embeddings"],
    defaultVisualizationId: "cosine-similarity-explorer",
  },
  "13": {
    relatedResearchSlugs: ["embeddings", "rag", "vector"],
    defaultVisualizationId: "cosine-similarity-explorer",
  },
  "14": {
    relatedResearchSlugs: ["rag", "tokenization", "embeddings"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "15": {
    relatedResearchSlugs: ["rag", "embeddings", "prompt-engineering"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "16": {
    relatedResearchSlugs: ["rag", "loss-functions", "probability"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "17": {
    relatedResearchSlugs: ["ai-agent", "tools", "memory"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "18": {
    relatedResearchSlugs: ["tools", "ai-agent", "production-ml-pipeline"],
    defaultVisualizationId: "rag-sandbox-explorer",
  },
  "19": {
    relatedResearchSlugs: ["production-ml-pipeline", "production-ready-ml-structure", "loss-functions"],
    defaultVisualizationId: "gradient-descent-1d",
  },
  "20": {
    relatedResearchSlugs: ["cnn", "transformers", "rag", "ai-agent"],
    defaultVisualizationId: "neural-network-explorer",
  },
};

export const AI_ENGINEER_PHASES: readonly AiEngineerPhase[] = rawCurriculum.phases.map(
  (rawPhase) => {
    const enrich = PHASE_ENRICHMENT[rawPhase.id] ?? {
      relatedResearchSlugs: ["artificial-intelligence"],
      defaultVisualizationId: "function-explorer" as const,
    };

    const lessons: AiEngineerMicroLesson[] = rawPhase.lessons.map((rawLesson, idx) => {
      const authored = AUTHORED_MICRO_LESSONS[rawLesson.id];
      const rich = AI_291_LESSONS_MAP[rawLesson.id];
      const prevLessonId = idx > 0 ? rawPhase.lessons[idx - 1]?.id : undefined;

      return {
        id: rawLesson.id,
        phaseId: rawPhase.id,
        order: rawLesson.order,
        title: rawLesson.title,
        status: "published",
        publishedDepths: ["overview", "understand", "master"],
        targetDepths: rawLesson.targetDepths as LearningDepth[],
        sourceRefs: authored ? authored.sourceRefs : rawLesson.sourceRefs,
        objective: authored
          ? authored.objective
          : (rich?.learningObjectiveUz ?? `“${rawLesson.title}” tushunchasini Overview, Understand va Master bosqichlarida amaliy misol hamda tekshiruv savoli orqali o‘zlashtirish.`),
        prerequisites: authored
          ? authored.prerequisites
          : (rich?.prerequisites ?? (prevLessonId ? [prevLessonId] : [])),
        relatedResearchSlug: enrich.relatedResearchSlugs[0],
        visualizationId: authored?.visualizationId ?? enrich.defaultVisualizationId,
        guidedSteps: authored?.guidedSteps,
        visualFlow: rich?.visualFlow,
        theoryUz: rich?.theoryUz,
        examples: rich?.examples,
        commonMistakes: rich?.commonMistakes,
        quiz: rich?.quiz,
        practiceTasks: rich?.practiceTasks,
        summaryTakeaways: rich?.summaryTakeaways,
        upstreamUrl: rich?.upstreamUrl,
        learningObjectiveUz: rich?.learningObjectiveUz,
        pythonPrerequisites: (rich?.prerequisites ?? []).filter((p: string) => p.startsWith("py-")),
      };
    });

    return {
      id: rawPhase.id,
      order: rawPhase.order,
      title: rawPhase.title,
      sourceSection: rawPhase.sourceSection,
      visualizationConcept: rawPhase.visualizationConcept,
      projectMilestone: rawPhase.projectMilestone,
      completionCriteria:
        "Mikro-dars chekpointlarini bajara oladi, mini-loyihani ishga tushiradi va natijani tushuntiradi; darslar soni o‘z-o‘zidan mastery hisoblanmaydi.",
      relatedResearchSlugs: enrich.relatedResearchSlugs,
      defaultVisualizationId: enrich.defaultVisualizationId,
      lessons,
    };
  },
);

export const TOTAL_AI_ENGINEER_MICRO_LESSONS: number = AI_ENGINEER_PHASES.reduce(
  (sum, p) => sum + p.lessons.length,
  0,
);

export function getAiEngineerPhase(phaseId: string): AiEngineerPhase | undefined {
  return AI_ENGINEER_PHASES.find((p) => p.id === phaseId);
}

export function getAiEngineerMicroLesson(lessonId: string): {
  phase: AiEngineerPhase;
  lesson: AiEngineerMicroLesson;
  prevLesson: AiEngineerMicroLesson | null;
  nextLesson: AiEngineerMicroLesson | null;
} | null {
  const flat: { phase: AiEngineerPhase; lesson: AiEngineerMicroLesson }[] = [];
  for (const phase of AI_ENGINEER_PHASES) {
    for (const lesson of phase.lessons) {
      flat.push({ phase, lesson });
    }
  }
  const index = flat.findIndex((item) => item.lesson.id === lessonId);
  if (index === -1) return null;
  const current = flat[index]!;
  return {
    phase: current.phase,
    lesson: current.lesson,
    prevLesson: index > 0 ? flat[index - 1]!.lesson : null,
    nextLesson: index + 1 < flat.length ? flat[index + 1]!.lesson : null,
  };
}

export function getPhasePriorityForTrack(
  phaseId: string,
  trackId: AiEngineerTrackId | null | undefined,
): {
  priority: TopicRole;
  recommendedDepth: LearningDepth;
  labelUz: string;
} {
  const track =
    AI_ENGINEER_TRACKS.find((t) => t.id === trackId) ?? AI_ENGINEER_TRACKS[0]!;
  if (track.deepPhaseIds.includes(phaseId)) {
    return {
      priority: "core",
      recommendedDepth: "master",
      labelUz: "Core (Master)",
    };
  }
  if (track.supportingPhaseIds.includes(phaseId)) {
    return {
      priority: "supporting",
      recommendedDepth: "understand",
      labelUz: "Supporting (Understand)",
    };
  }
  if (track.electivePhaseIds.includes(phaseId)) {
    return {
      priority: "advanced",
      recommendedDepth: "understand",
      labelUz: "Advanced Elective",
    };
  }
  return {
    priority: "optional",
    recommendedDepth: "overview",
    labelUz: "Optional (Overview)",
  };
}

/**
 * Returns full authored steps for published vertical-slice micro-lessons, or structured
 * Overview / Understand / Master curriculum scaffold steps for planned micro-lessons.
 */
export function getGuidedStepsForMicroLesson(
  lesson: AiEngineerMicroLesson,
  phase: AiEngineerPhase,
): readonly GuidedLearningStep[] {
  if (lesson.guidedSteps && lesson.guidedSteps.length > 0) {
    return lesson.guidedSteps;
  }
  const prereqId = lesson.prerequisites[0];
  const q0 = lesson.quiz?.[0];

  return [
    {
      id: `${lesson.id}-step-1`,
      stepNumber: 1,
      depth: "overview",
      type: "intuition",
      title: `Qadam 1 — Overview: ${lesson.title} nima va nega kerak?`,
      body: lesson.theoryUz
        ? `${lesson.theoryUz}\n\nUshbu dars Phase ${phase.id} (${phase.title}) doirasida o‘rganiladi.`
        : `${lesson.objective} Ushbu dars Phase ${phase.id} (${phase.title}) tarkibiga kiradi va “${phase.sourceSection}” bo‘limiga asoslanadi.`,
      codeSnippet: lesson.examples?.[0]?.code,
      provenance: "curriculum-scaffold",
      tushunmadim: {
        simplerBreakdown: `“${lesson.title}” — ${phase.title} bosqichidagi amaliy qadamlardan biri bo‘lib, ${phase.projectMilestone} loyihasini qurishda bevosita ishlatiladi.`,
        numericMicroExample: `Phase ${phase.id} maqsadi: ${phase.projectMilestone}`,
        ...(prereqId
          ? {
              prerequisiteLessonId: prereqId,
              prerequisiteTitle: `Oldingi tayanch dars (${prereqId})`,
            }
          : {}),
      },
      checkpoint: q0
        ? {
            question: q0.promptUz,
            options: q0.options,
            correctIndex: q0.correctIndex,
            explanation: q0.explanationUz,
            whyQuestion: "Nega ushbu tushunchani amaliy kodda to'g'ri qo'llash muhim?",
          }
        : {
            question: `“${lesson.title}” (${lesson.id}) mikro-darsi qaysi bosqich va amaliy vazifaga xizmat qiladi?`,
            options: [
              `Phase ${phase.id}: ${phase.title} — ${phase.projectMilestone}`,
              "Faqat nazariy tarix, amaliy kod va tizimga aloqasi yo‘q",
              "Faqat frontend CSS bezaklari uchun",
            ],
            correctIndex: 0,
            explanation: `Ushbu mikro-dars Phase ${phase.id} (${phase.title}) doirasida “${phase.projectMilestone}” natijasiga erishish uchun xizmat qiladi.`,
            whyQuestion: "Nega har bir mikro-darsni amaliy mini-loyiha bilan bog‘lab o‘rganish muhim?",
          },
    },
    {
      id: `${lesson.id}-step-2`,
      stepNumber: 2,
      depth: "understand",
      type: "visual",
      title: `Qadam 2 — Understand: Mexanizm va namunaviy kod`,
      body: lesson.examples?.[1]?.explanationUz
        ? `Tahlil: ${lesson.examples[1].explanationUz}\n\nVizual konsept: ${phase.visualizationConcept}.`
        : `Vizual model: ${phase.visualizationConcept}. Manba bo‘limi: ${phase.sourceSection}. Ushbu qadamda kirish ma’lumotlari qanday qilib bosqichma-bosqich yakuniy natijaga aylanishi tahlil qilinadi.`,
      codeSnippet: lesson.examples?.[1]?.code || lesson.examples?.[0]?.code,
      visualizationId: lesson.visualizationId ?? phase.defaultVisualizationId,
      provenance: "curriculum-scaffold",
      tushunmadim: {
        simplerBreakdown: `Vizual oqimni kuzating: ${phase.visualizationConcept}. Har bir blok bitta aniq kirish va chiqishga ega.`,
        numericMicroExample: `Vizual konsept: ${phase.visualizationConcept}`,
        ...(prereqId
          ? {
              prerequisiteLessonId: prereqId,
              prerequisiteTitle: `Oldingi tayanch dars (${prereqId})`,
            }
          : {}),
      },
    },
    {
      id: `${lesson.id}-step-3`,
      stepNumber: 3,
      depth: "master",
      type: "code",
      title: `Qadam 3 — Master: Keng tarqalgan xatolar va amaliy mezon`,
      body:
        lesson.commonMistakes && lesson.commonMistakes.length > 0
          ? lesson.commonMistakes
              .map(
                (m, idx) =>
                  `Xato #${idx + 1}: ${m.mistakeUz}\n• Alomati: ${m.symptomUz}\n• To‘g‘rilash: ${m.correctionUz}`,
              )
              .join("\n\n") + `\n\nBitirish mezoni: ${phase.completionCriteria}.`
          : `Bitirish mezoni: ${phase.completionCriteria}. Mini-loyiha: ${phase.projectMilestone}.`,
      codeSnippet: lesson.examples?.[0]?.code,
      provenance: "curriculum-scaffold",
      tushunmadim: {
        simplerBreakdown: "Master darajasida tushunchani kodda va chekka holatlarda (edge-cases) sinab ko‘ramiz.",
        numericMicroExample: `Tekshiruv: ${phase.completionCriteria}`,
      },
    },
  ];
}
