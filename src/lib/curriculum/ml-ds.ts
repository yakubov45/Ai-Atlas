/**
 * Canonical 31-Phase, 520-Micro-Lesson Machine Learning Engineer + AI & Data Scientist
 * + AI Engineer Bridge Curriculum Registry (`ml-ds-2026`).
 *
 * Source of truth:
 * - `src/content/curriculum/ml-ds-curriculum.json` (imported from `ml learning/ML_DataScience_Curriculum.json`)
 * - `ml learning/ML_DataScience_31_Phase_Roadmap.md`
 * - `ml learning/ML_DataScience_Micro_Lesson_Namuna.md`
 * - `ml learning/ML_DataScience_Website_Agent_Prompt.md`
 */

import rawMlDsCurriculum from "@/content/curriculum/ml-ds-curriculum.json";
import type { LearningDepth, TopicRole } from "./paths";
import type { GuidedLearningStep, MicroLessonStatus } from "./ai-engineer";
import { getMlDs520LessonById } from "./ml-ds-520-dataset";

export type MlDsTrackId = "ml-engineer" | "data-scientist" | "ai-engineer-bridge";

export type MlDsVisualizationId =
  | NonNullable<GuidedLearningStep["visualizationId"]>
  | "confusion-matrix-explorer"
  | "ab-cuped-explorer"
  | string;

export interface MlDsGuidedStep extends Omit<GuidedLearningStep, "visualizationId"> {
  visualizationId?: MlDsVisualizationId;
}

export interface MlDsMicroLesson {
  id: string;
  phaseId: string;
  order: number;
  title: string;
  slug: string;
  status: MicroLessonStatus;
  publishedDepths: LearningDepth[];
  targetDepths: LearningDepth[];
  prerequisites: string[];
  sourceSection: string;
  notes: string;
  /** Optional cross-link to an existing AI Engineer micro-lesson ID (e.g. "12.07") or canonical MDX slug */
  crosslinkedAiLessonId?: string;
  relatedResearchSlug?: string;
  visualizationId?: MlDsVisualizationId;
  guidedSteps?: readonly MlDsGuidedStep[];
  learningObjectiveUz?: string;
  theoryUz?: string;
  examples?: readonly {
    titleUz: string;
    explanationUz: string;
    code: string;
    expectedOutput: string;
  }[];
  commonMistakes?: readonly {
    symptomUz: string;
    mistakeUz: string;
    correctionUz: string;
  }[];
  quiz?: readonly {
    id: string;
    promptUz: string;
    options: readonly string[];
    correctIndex: number;
    explanationUz: string;
  }[];
  practiceTasks?: readonly {
    id: string;
    titleUz: string;
    instructionsUz: string;
    starterCode: string;
    testCode: string;
    hintsUz: readonly string[];
    difficulty: "starter" | "challenge";
  }[];
  summaryTakeaways?: readonly string[];
  visualFlow?: readonly { step: number; label: string; detail: string }[];
  pythonPrerequisites?: readonly string[];
  aiRelatedLessons?: readonly { id: string; title: string }[] | readonly string[];
  visualLabId?: string | null;
}

export interface MlDsPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  visualizationDescription: string;
  projectMilestone: string;
  trackPriority: Record<MlDsTrackId, TopicRole>;
  relatedResearchSlugs: readonly string[];
  defaultVisualizationId: MlDsVisualizationId;
  lessons: readonly MlDsMicroLesson[];
}

export interface MlDsTrack {
  id: MlDsTrackId;
  label: string;
  shortLabel: string;
  description: string;
  capstone: string;
  phasePriority: Record<string, TopicRole>;
}

export const ML_DS_TRACKS: readonly MlDsTrack[] = [
  {
    id: "ml-engineer",
    label: "Machine Learning Engineer",
    shortLabel: "ML Engineer",
    description:
      "Matematika, ma’lumot tayyorlash, Supervised/Unsupervised ML, model o‘qitish va validatsiya, Ensembles, Deep Learning va MLOps deployment.",
    capstone:
      "Data audit → Leakage-safe Pipeline → Model training → K-Fold Validation → Reproducible model → FastAPI Endpoint → Drift Monitoring.",
    phasePriority: rawMlDsCurriculum.tracks["ml-engineer"]
      .phasePriority as Record<string, TopicRole>,
  },
  {
    id: "data-scientist",
    label: "AI & Data Scientist",
    shortLabel: "Data Scientist",
    description:
      "SQL/Python, EDA, ehtimollik va statistik inference, A/B testing dizayni, CUPED/stratification, Econometrics, Time Series va interpretatsion ML.",
    capstone:
      "Stakeholder savoli → SQL/EDA → Gipoteza va A/B eksperiment → Statistik tahlil (CI, p-value, CUPED) → Prognoz/Model → Cheklovlar va qaror hisoboti.",
    phasePriority: rawMlDsCurriculum.tracks["data-scientist"]
      .phasePriority as Record<string, TopicRole>,
  },
  {
    id: "ai-engineer-bridge",
    label: "AI Engineer uchun ML/DS poydevori (Bridge)",
    shortLabel: "AI Engineer Bridge",
    description:
      "Oldingi 20-fazali AI Engineer yo‘liga qo‘shimcha ko‘prik: Python, NumPy, SQL, zaruriy Calculus/Chiziqli algebra, Supervised ML va Evaluation.",
    capstone:
      "Mavjud AI Engineer yo‘lidagi LLM/RAG/Agent servisga ML evaluation (Precision/Recall/F1, A/B test) yoki model-serving blokini ulash.",
    phasePriority: rawMlDsCurriculum.tracks["ai-engineer-bridge"]
      .phasePriority as Record<string, TopicRole>,
  },
];

// ---------------------------------------------------------------------------
// Authored Vertical Slice Micro-Lessons (`mlds-11-13` 11-step Gradient Descent,
// `mlds-11-04`, `mlds-11-09`, `mlds-19-03`, `mlds-14-01`, `mlds-15-04`)
// ---------------------------------------------------------------------------

const AUTHORED_MLDS_LESSONS: Record<
  string,
  {
    status: MicroLessonStatus;
    publishedDepths: LearningDepth[];
    prerequisites: string[];
    crosslinkedAiLessonId?: string;
    relatedResearchSlug?: string;
    visualizationId: MlDsVisualizationId;
    guidedSteps: readonly MlDsGuidedStep[];
  }
> = {
  "mlds-11-04": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-11-01", "mlds-11-02"],
    relatedResearchSlug: "gradient-descent",
    visualizationId: "function-explorer",
    guidedSteps: [
      {
        id: "mlds-11-04-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Derivative (Hosila) nima?",
        body: "Hosila — funksiyaning aynan bitta nuqtadagi o‘zgarish tezligi (urinma chiziq qiyaligi / slope). Agar x ni juda kichik Δx ga sursak, y qanchaga va qaysi tomonga o‘zgarishini ko‘rsatadi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Avtomobil spidometri aynan hozirgi soniyadagi tezlikni ko‘rsatganidek, hosila ham grafikning aynan shu nuqtadagi tikligini ko‘rsatadi.",
          numericMicroExample: "L(w) = (w - 3)² funksiyada w = 0 nuqtada qiyalik manfiy (-6), ya’ni funksiya pastga tushmoqda.",
        },
        checkpoint: {
          question: "Funksiya hosilasi f'(x) = 0 bo‘lgan nuqta nimani anglatadi?",
          options: [
            "Grafik qiyaligi gorizontal (0) bo‘lib, bu nuqta lokal minimum, maksimum yoki egar nuqta bo‘lishi mumkin",
            "Funksiya qiymati doimo 100 ga teng ekanini",
            "O‘zgaruvchi x manfiy ekanini",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! Urinma gorizontal bo‘lganda hosila 0 ga teng bo‘ladi (masalan, L(w)=(w-3)² da w=3 minimum nuqtada).",
          whyQuestion: "Nima uchun hosila ishorasi (musbat yoki manfiy) optimallashtirishda yo‘nalishni topishga yordam beradi?",
        },
      },
      {
        id: "mlds-11-04-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Kvadratik funksiya va hosila formulasi",
        body: "L(w) = (w - 3)² funksiyasining hosilasi daraja qoidasi va zanjir qoidasiga ko‘ra dL/dw = 2(w - 3) ga teng.",
        formula: "L(w) = (w - 3)^2 \\implies \\frac{dL}{dw} = 2(w - 3)",
        visualizationId: "function-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Daraja oldinga tushadi: (u²) hosilasi 2u. Bu yerda u = w - 3 bo‘lgani uchun hosila 2(w - 3).",
          numericMicroExample: "w = 0 -> 2(0 - 3) = -6 | w = 3 -> 2(3 - 3) = 0 | w = 5 -> 2(5 - 3) = +4.",
        },
      },
      {
        id: "mlds-11-04-step-3",
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: "Qadam 3 — Analitik va raqamli hosilani Python’da solishtirish",
        body: "Chekli ayirmalar usuli: (L(w + eps) - L(w - eps)) / (2 * eps) analitik hosila 2(w - 3) bilan ustma-ust tushadi.",
        codeSnippet: `def loss(w: float) -> float:
    return (w - 3.0) ** 2

def analytic_grad(w: float) -> float:
    return 2.0 * (w - 3.0)

def numeric_grad(w: float, eps: float = 1e-6) -> float:
    return (loss(w + eps) - loss(w - eps)) / (2.0 * eps)

assert abs(analytic_grad(0.0) - numeric_grad(0.0)) < 1e-7`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Numeric gradient juda kichik qadam (1e-6) bilan haqiqiy hosilani tekshirish (gradient check) uchun ishlatiladi.",
          numericMicroExample: "w=0 da analytic_grad = -6.0, numeric_grad ≈ -6.0000000001.",
        },
      },
    ],
  },

  "mlds-11-09": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-09-02", "mlds-11-04"],
    crosslinkedAiLessonId: "12.02",
    relatedResearchSlug: "gradient-descent",
    visualizationId: "gradient-descent-1d",
    guidedSteps: [
      {
        id: "mlds-11-09-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Gradient vektori nima?",
        body: "Funksiya bir nechta parametrga ega bo‘lganda (masalan w₁, w₂, ..., w_n), barcha xususiy hosilalarni bitta vektorga jamlagan ifoda Gradient vektori (∇L) deyiladi. Gradient doimo funksiyaning eng tez o‘sish yo‘nalishini ko‘rsatadi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Tog‘da turgan bo‘lsangiz, gradient vektori eng tik tepalikka qaraydi. Pastga (minimumga) tushish uchun esa uning teskarisiga (-∇L) yurish kerak!",
          numericMicroExample: "∇L(w₁, w₂) = [∂L/∂w₁, ∂L/∂w₂].",
          prerequisiteLessonId: "mlds-11-04",
          prerequisiteTitle: "mlds-11-04 — Derivative intuitiv ma’nosi",
        },
      },
      {
        id: "mlds-11-09-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "formula",
        title: "Qadam 2 — Nima uchun minus ishorasi bilan yangilaymiz?",
        body: "Gradient eng tez o‘sish tomonga qaragani uchun, xatolikni (loss) kamaytirish uchun parametrni gradientga teskari yo‘nalishda yangilaymiz: w_{t+1} = w_t - η·∇L(w_t).",
        formula: "\\nabla L(w) = \\left[\\frac{\\partial L}{\\partial w_1}, \\dots, \\frac{\\partial L}{\\partial w_n}\\right]^T, \\quad w_{t+1} = w_t - \\eta \\nabla L(w_t)",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Agar hosila manfiy bo‘lsa (masalan -6), minusga ko‘paytirganda -(-6) = +6 bo‘lib, w o‘ngga (minimum w=3 tomonga) yuradi.",
          numericMicroExample: "w_next = 0 - 0.1 * (-6) = +0.6.",
        },
      },
      {
        id: "mlds-11-09-step-3",
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: "Qadam 3 — 2D Gradient Vektorini NumPy’da hisoblash",
        body: "L(w₁, w₂) = (w₁ - 3)² + (w₂ + 2)² funksiyaning minimumi (3, -2) nuqtada joylashgan.",
        codeSnippet: `import numpy as np

w = np.array([0.0, 0.0])
grad = np.array([2.0 * (w[0] - 3.0), 2.0 * (w[1] + 2.0)]) # [-6.0, +4.0]
w_next = w - 0.1 * grad # [0.6, -0.4]`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Har bir koordinata o‘zining xususiy hosilasi bo‘yicha bir vaqtda yangilanadi.",
          numericMicroExample: "w₁: 0 -> 0.6 (3 ga yaqinlashdi), w₂: 0 -> -0.4 (-2 ga yaqinlashdi).",
        },
      },
    ],
  },

  "mlds-11-13": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-11-04", "mlds-11-09"],
    relatedResearchSlug: "gradient-descent",
    visualizationId: "gradient-descent-1d",
    guidedSteps: [
      {
        id: "mlds-11-13-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Masala: Xatolikni kamaytirish uchun w parametrni qayerga suramiz?",
        body: "Biz modelda xatolikni (Loss) kamaytirmoqchimiz. Buning uchun bitta w parametr bor. Uni qayerga sursak xatolik kichrayadi?\n\nDiqqat: Ushbu darsdagi L(w)=(w-3)² funksiyasi va raqamli qiymatlar tushuntirish uchun maxsus tanlangan illustrativ matematika bo‘lib, real model benchmarki emas.",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Modelning w parametri — bamisoli radioning ovoz sozlagichi. Xatolik nol bo‘ladigan aniq nuqtani (w=3) topishimiz kerak.",
          numericMicroExample: "Agar w=0 bo‘lsa xato katta (9), w=3 ga yaqinlashgan sari xato 0 ga tushadi.",
          prerequisiteLessonId: "mlds-11-04",
          prerequisiteTitle: "mlds-11-04 — Derivative intuitiv ma’nosi",
        },
      },
      {
        id: "mlds-11-13-step-2",
        stepNumber: 2,
        depth: "overview",
        type: "intuition",
        title: "Qadam 2 — Analogiya va uning cheklovi",
        body: "Tog‘ tepasidan pastga tushayotgandek tasavvur qiling. Qadam yo‘nalishi — qiyalikning teskarisi. Qadam uzunligi — learning rate (η).\n\nAnalogiya cheklovi: haqiqiy neural network loss funksiyasi millionlab parametrli va murakkab (non-convex) bo‘lishi mumkin; u har doim global eng past nuqtaga kafolatli yetib bormaydi.",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Ko‘zingiz bog‘langan holda oyoq ostidagi qiyalikni paypaslab, pastlik tomonga kichik qadam tashlaysiz.",
          numericMicroExample: "Qiyalik chapga tushsa — chapga yurasiz; o‘ngga tushsa — o‘ngga yurasiz.",
        },
      },
      {
        id: "mlds-11-13-step-3",
        stepNumber: 3,
        depth: "overview",
        type: "visual",
        title: "Qadam 3 — Eng sodda grafik: L(w) = (w - 3)²",
        body: "Tanlangan funksiya: L(w) = (w - 3)². Grafik parabola shaklida bo‘lib, eng past nuqtasi w = 3 da joylashgan va u yerda loss 0 ga teng.",
        formula: "L(w) = (w - 3)^2, \\quad L(3) = (3 - 3)^2 = 0",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Har qanday haqiqiy sonning kvadrati manfiy bo‘lmaydi (≥ 0). Eng kichik qiymat qavs ichi 0 bo‘lganda, ya’ni w = 3 da chiqadi.",
          numericMicroExample: "L(0) = (-3)² = 9 | L(2) = (-1)² = 1 | L(3) = 0² = 0 | L(4) = 1² = 1.",
        },
        checkpoint: {
          question: "Checkpoint: w = 3 bo‘lganda L(w) = (w - 3)² nechiga teng?",
          options: [
            "0 ga teng (eng kichik global minimum nuqta)",
            "3 ga teng",
            "9 ga teng",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! (3 - 3)² = 0² = 0.",
          whyQuestion: "Nima uchun (w - 3)² funksiyasi hech qachon 0 dan kichik (manfiy) qiymat qabul qilmaydi?",
        },
      },
      {
        id: "mlds-11-13-step-4",
        stepNumber: 4,
        depth: "understand",
        type: "formula",
        title: "Qadam 4 — Gradient nimani aytadi?",
        body: "Hosila: dL/dw = 2(w - 3). Hosila musbat bo‘lsa, kichik qadam bilan w ni kamaytirish, manfiy bo‘lsa, w ni oshirish lossni kamaytirish yo‘nalishidir.",
        formula: "\\frac{dL}{dw} = 2(w - 3)",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Agar hosila tushunchasi notanish bo‘lsa, quyidagi tugma orqali mlds-11-04 darsiga o‘tib, aynan shu 4-qadamga qaytishingiz mumkin!",
          numericMicroExample: "w = 0 da dL/dw = 2(0 - 3) = -6 (manfiy, demak w ni oshirish kerak).",
          prerequisiteLessonId: "mlds-11-04",
          prerequisiteTitle: "mlds-11-04 — Derivative intuitiv ma’nosi",
        },
      },
      {
        id: "mlds-11-13-step-5",
        stepNumber: 5,
        depth: "understand",
        type: "formula",
        title: "Qadam 5 — Update (yangilash) qoidasini o‘qish",
        body: "Har bir qadamda yangi parametr quyidagi qoida bilan hisoblanadi:\n• w_t — hozirgi parametr\n• η (eta) — qadam uzunligi, ya’ni learning rate\n• dL/dw — hozirgi gradient\n• w_{t+1} — yangi parametr",
        formula: "w_{t+1} = w_t - \\eta \\frac{dL}{dw}(w_t)",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Agar gradient vektori va minus ishorasi sababi tushunarsiz bo‘lsa, mlds-11-09 darsiga o‘tib ko‘ring va shu qadamga qayting.",
          numericMicroExample: "w_next = w_old - learning_rate * gradient",
          prerequisiteLessonId: "mlds-11-09",
          prerequisiteTitle: "mlds-11-09 — Gradient vector nima?",
        },
      },
      {
        id: "mlds-11-13-step-6",
        stepNumber: 6,
        depth: "understand",
        type: "calculation",
        title: "Qadam 6 — Sonli misolni qadamma-qadam hisoblaymiz (w₀ = 0, η = 0.1)",
        body: "Boshlang‘ich: w = 0, η = 0.1, boshlang‘ich loss L(0) = 9.000.\n• 1-iteratsiya: w_old = 0.000, Gradient = -6.000 -> w_new = 0 - 0.1×(-6) = 0.600, Loss = 5.760\n• 2-iteratsiya: w_old = 0.600, Gradient = -4.800 -> w_new = 0.6 - 0.1×(-4.8) = 1.080, Loss = 3.6864\n• 3-iteratsiya: w_old = 1.080, Gradient = -3.840 -> w_new = 1.08 - 0.1×(-3.84) = 1.464, Loss = 2.359296\nTekshiruv: Loss 9.000 -> 5.760 -> 3.6864 -> 2.359296 bo‘lib barqaror kamaydi!",
        formula: "w_1 = 0 - 0.1 \\times (-6) = 0.6, \\quad L(0.6) = (0.6 - 3)^2 = 5.76",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Har qadamda (w - 3) masofaning 20 foizi (2 * 0.1 = 0.2) qisqaradi va qolgan 80 foizi qoladi.",
          numericMicroExample: "Iter 1: w=0.6 (L=5.76) | Iter 2: w=1.08 (L=3.6864) | Iter 3: w=1.464 (L=2.359296).",
        },
      },
      {
        id: "mlds-11-13-step-7",
        stepNumber: 7,
        depth: "understand",
        type: "visual",
        title: "Qadam 7 — Interaktiv laboratoriya (Manim + React)",
        body: "Quyidagi laboratoriyada 'Namuna (w₀=0, η=0.10)' rejimini tanlab '1 Qadam' tugmasini 3 marta bosing va yuqoridagi jadval qiymatlarini tekshiring. So‘ng η ≥ 1.0 (masalan 1.10) qilib, optimallashtirish qanday tebranib uzoqlashishini (divergence) kuzating.",
        visualizationId: "gradient-descent-1d",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Manim tayyor video animatsiyani ko‘rsatadi, pastdagi React grafik esa siz slayderni surganingizda haqiqiy formula bilan jonli hisoblaydi.",
          numericMicroExample: "η = 1.10 va w₀ = 0 bo‘lganda 1-qadamda w₁ = 6.6 va L(6.6) = 12.96 > 9.0 (Loss oshib ketdi!).",
        },
      },
      {
        id: "mlds-11-13-step-8",
        stepNumber: 8,
        depth: "master",
        type: "code",
        title: "Qadam 8 — Master: Minimal Python implementatsiya",
        body: "Quyidagi Python kodi aynan 3 ta iteratsiyani bajarib, har bir qadamdagi w va loss(w) qiymatlarini chiqaradi.",
        codeSnippet: `w = 0.0
learning_rate = 0.1

def loss(w: float) -> float:
    return (w - 3.0) ** 2

def gradient(w: float) -> float:
    return 2.0 * (w - 3.0)

for step in range(3):
    g = gradient(w)
    w = w - learning_rate * g
    print(step + 1, round(w, 6), round(loss(w), 6))
# Natijalar:
# 1 0.6 5.76
# 2 1.08 3.6864
# 3 1.464 2.359296`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Siklda har safar avval gradient g hisoblanadi, keyin w yangilanadi.",
          numericMicroExample: "(1, 0.6, 5.76), (2, 1.08, 3.6864), (3, 1.464, 2.359296)",
        },
      },
      {
        id: "mlds-11-13-step-9",
        stepNumber: 9,
        depth: "master",
        type: "code",
        title: "Qadam 9 — Master: Unit testlar bilan tekshirish",
        body: "Kodimiz matematik formula bilan 10⁻⁹ aniqlikda mos kelishini assert testlar orqali tekshiramiz.",
        codeSnippet: `assert abs(loss(3) - 0.0) < 1e-9
assert abs(gradient(0) + 6.0) < 1e-9
assert abs((0 - 0.1 * gradient(0)) - 0.6) < 1e-9`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "gradient(0) = -6.0 bo‘lgani uchun gradient(0) + 6.0 = 0 bo‘ladi.",
          numericMicroExample: "0 - 0.1 * (-6.0) = 0.6.",
        },
      },
      {
        id: "mlds-11-13-step-10",
        stepNumber: 10,
        depth: "master",
        type: "misconception",
        title: "Qadam 10 — Model chegaralari va learning rate tuzoqlari",
        body: "• Juda kichik learning rate (η = 0.001): konvergentsiya juda sekin va ko‘p hisoblash talab qiladi.\n• Juda katta learning rate (η ≥ 1.0): L(w)=(w-3)² uchun η=1.0 da w=0 va w=6 orasida cheksiz sakraydi, η > 1.0 da esa har qadamda uzoqlashib portlaydi (divergence).\n• Haqiqiy modelda bir nechta weight, gradient vektori, dataset, mini-batch va Adam kabi adaptiv optimizer mavjud.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Qadam juda katta bo‘lsa, chuqurning narigi chetiga o‘tib ketib, yanada balandroqqa chiqib qolasiz.",
          numericMicroExample: "η = 1.0, w₀ = 0 -> w₁ = 6 (L=9) -> w₂ = 0 (L=9) — hech qachon w=3 ga tushmaydi!",
        },
      },
      {
        id: "mlds-11-13-step-11",
        stepNumber: 11,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 11 — Kichik topshiriq va yakuniy tekshiruv",
        body: "Mustaqil topshiriq: η = 0.5 va w₀ = 0 deb oling. w₁ va yangi lossni hisoblang. So‘ng η = 1.1 bo‘lganda nega loss o‘sishi mumkinligini tekshiring.",
        formula: "\\eta = 0.5, w_0 = 0 \\implies w_1 = 0 - 0.5 \\times (-6) = 3.0, \\quad L(3.0) = 0",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "η = 1.1 bo‘lsa: w₁ = 0 - 1.1×(-6) = 6.6. Yangi loss L(6.6) = (6.6 - 3)² = 3.6² = 12.96 (eski loss 9 dan katta!).",
          numericMicroExample: "η = 0.5 -> w₁ = 3.0 (L=0) | η = 1.1 -> w₁ = 6.6 (L=12.96 > 9).",
        },
        checkpoint: {
          question: "L(w) = (w - 3)² funksiyada w₀ = 0 va η = 1.1 bo‘lganda birinchi qadamdan keyin nima yuz beradi?",
          options: [
            "w₁ = 6.6 ga sakrab, yangi loss L(6.6) = 12.96 bo‘ladi — ya’ni boshlang‘ich L(0) = 9 dan ham oshib ketadi (divergence)",
            "w₁ = 3.0 ga tushib, loss 0 bo‘ladi",
            "w o‘zgarmasdan 0 da qoladi",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! w₁ = 0 - 1.1 × (-6) = 6.6 va L(6.6) = (3.6)² = 12.96 > 9. Learning rate haddan tashqari katta bo‘lgani uchun minimumdan o‘tib ketib, xatolik oshdi.",
          whyQuestion: "Nima uchun amaliyotda learning rate schedule (qadamni asta-sekin kichraytirish) qo‘llaniladi?",
        },
      },
    ],
  },

  "mlds-19-03": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-18-01", "mlds-19-01"],
    relatedResearchSlug: "machine-learning-basics",
    visualizationId: "confusion-matrix-explorer",
    guidedSteps: [
      {
        id: "mlds-19-03-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Nima uchun bitta Accuracy foizi yetarli emas?",
        body: "Agar 1000 ta tranzaksiyadan faqat 10 tasi firibgarlik (fraud) bo‘lsa, hammasini 'toza' deydigan dangasa model 99% Accuracy oladi, lekin barcha 10 ta firibgarlikni o‘tkazib yuboradi! Confusion Matrix esa xatolarni turlarga (TP, FP, FN, TN) ajratib ochib beradi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Soxta trevoga (FP) va xavfni ko‘rmay qolish (FN) bir xil xato emas. Ularni alohida sanash uchun 2×2 jadval — Confusion Matrix tuziladi.",
          numericMicroExample: "TP (to‘g‘ri topilgan ijobiy), FP (soxta trevoga), FN (o‘tkazib yuborilgan ijobiy), TN (to‘g‘ri rad etilgan).",
        },
      },
      {
        id: "mlds-19-03-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Interaktiv Confusion Matrix, Precision, Recall va F1 Lab",
        body: "Quyidagi laboratoriyada Threshold (τ) slayderini o‘zgartiring yoki TP/FP/FN/TN sonlarini qo‘lda boshqarib, Accuracy, Precision, Recall va F1-score qanday o‘zgarishini kuzating.",
        visualizationId: "confusion-matrix-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Precision = TP / (TP + FP) — model 'ijobiy' deganlarining necha foizi rostdan ijobiy? Recall = TP / (TP + FN) — haqiqiy ijobiylarning necha foizini model ushlay oldi?",
          numericMicroExample: "TP=5, FP=1, FN=1, TN=5 -> Precision = 5/6 ≈ 83.3%, Recall = 5/6 ≈ 83.3%, F1 = 83.3%.",
        },
      },
      {
        id: "mlds-19-03-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Master: Nol maxraj (Zero-Division) va F1-Score",
        body: "Agar model threshold juda yuqori bo‘lgani uchun hech bir namunani 1 deb bashorat qilmasa (TP = 0, FP = 0), Precision maxraji TP + FP = 0 bo‘ladi. Bunday holatda `NaN` chiqarmasdan aniq ogohlantirish berish kerak.",
        formula: "F_1 = \\frac{2 \\cdot \\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "F1-score — Precision va Recall ning garmonik o‘rtachasi; ikkalasidan biri 0 ga tushsa, F1 ham 0 bo‘ladi.",
          numericMicroExample: "Precision = 0.80, Recall = 0.50 -> F1 = (2 * 0.40) / 1.30 ≈ 0.6154.",
        },
        checkpoint: {
          question: "Tibbiy saraton skriningida haqiqiy kasallarni o‘tkazib yubormaslik (FN ni minimallashtirish) uchun qaysi metrika eng ustuvor?",
          options: [
            "Recall (Sensitivity = TP / (TP + FN))",
            "Faqat TN soni",
            "Model fayl hajmi",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! FN (kasalni sog‘lom deb yuborish) kam bo‘lishi uchun Recall = TP / (TP + FN) yuqori bo‘lishi shart.",
          whyQuestion: "Recall ni 100% qilish uchun thresholdni juda pasaytirsak, Precision ga nima bo‘ladi?",
        },
      },
    ],
  },

  "mlds-14-01": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-13-09", "mlds-13-10"],
    relatedResearchSlug: "machine-learning-basics",
    visualizationId: "ab-cuped-explorer",
    guidedSteps: [
      {
        id: "mlds-14-01-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — A/B Testing va Sabab-Oqibat (Causality)",
        body: "Yangi algoritm yoki tugma dizayni konversiyani oshirdimi yoki bu shunchaki mavsumiy tasodifmi? Foydalanuvchilarni tasodifiy ravishda Control (A — eski holat) va Treatment (B — yangi o‘zgarish) guruhlariga bo‘lib solishtirish A/B testing deyiladi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Ikki guruh aynan bir vaqtda va bir xil sharoitda sinovdan o‘tadi — faqat bitta omil (Treatment) farq qiladi.",
          numericMicroExample: "Control: 2000 kishidan 200 tasi xarid qildi (10.0%). Treatment: 2000 kishidan 236 tasi xarid qildi (11.8%).",
        },
      },
      {
        id: "mlds-14-01-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Interaktiv A/B Eksperiment, p-value, 95% CI va CUPED Lab",
        body: "Quyidagi laboratoriyada Control va Treatment guruhlari hajmini, konversiyalarini va CUPED pre-experiment korrelyatsiyasini (ρ) o‘zgartirib, Standard Error hamda p-value qanday o‘zgarishini sinab ko‘ring.",
        visualizationId: "ab-cuped-explorer",
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Agar 95% Confidence Interval ichida 0 qatnashmasa (va p-value < 0.05 bo‘lsa), farq statistik ahamiyatli hisoblanadi.",
          numericMicroExample: "CUPED ρ = 0.65 bo‘lganda dispersiya 1 - 0.65² = 0.5775 marta kichrayadi!",
        },
      },
      {
        id: "mlds-14-01-step-3",
        stepNumber: 3,
        depth: "master",
        type: "checkpoint",
        title: "Qadam 3 — Master: Peeking xatosi, Guardrail metrikalar va CUPED",
        body: "Eksperiment tugamasdan har kuni p-value ga qarab to‘xtatib qo‘yish (peeking) Type I xato (False Positive) ehtimolini keskin oshiradi. Qaror qabul qilishda Primary metric bilan birga Guardrail metric (masalan sahifa yuklanish tezligi yoki xatoliklar) buzilmagani tekshiriladi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Oldindan belgilangan sample size (namuna hajmi) to‘lguncha eksperimentni erta to‘xtatmaslik kerak.",
          numericMicroExample: "Primary metric: Konversiya (+1.8%), Guardrail metric: Latency (< 200ms).",
        },
        checkpoint: {
          question: "CUPED (Controlled-experiment Using Pre-Experiment Data) usulining asosiy vazifasi nima?",
          options: [
            "Eksperimentdan oldingi kovariata (pre-experiment covariate) yordamida baholash dispersiyasini (variance) kamaytirish va sezgirlikni oshirish",
            "Randomizatsiyani bekor qilish",
            "p-value ni sun’iy ravishda 0 ga tenglashtirish",
          ],
          correctIndex: 0,
          explanation: "To‘g‘ri! CUPED pre-experiment ma’lumot yordamida shovqinni (variance) 1 - ρ² marta kamaytiradi, bu esa kichikroq MDE ni aniqlash imkonini beradi.",
          whyQuestion: "Nima uchun CUPED da ishlatiladigan kovariata eksperiment boshlanishidan OLDIN olingan bo‘lishi shart?",
        },
      },
    ],
  },

  "mlds-04-09": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-04-01", "mlds-04-08"],
    relatedResearchSlug: "embeddings-and-vectors",
    visualizationId: "mlds-lab-04",
    guidedSteps: [
      {
        id: "mlds-04-09-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Overview: Broadcasting nima va nima uchun kerak?",
        body: "Broadcasting — NumPy'ning har xil o'lchamdagi (shape) massivlar ustida xotirada ortiqcha nusxa ko'chirmasdan arifmetik amallarni bajarish mexanizmi. Masalan (3, 1) ustun vektoriga (1, 4) qator vektorini qo'shganda, NumPy avtomatik ravishda ularni (3, 4) matritsa sifatida virtual kengaytiradi.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Massivlarni xotirada nusxalash C darajasida behuda RAM sarflaydi. Broadcasting virtual o'qlarni kengaytirib tezlik beradi.",
          numericMicroExample: "Shape (3, 1) + Shape (1, 4) -> Natijaviy shape (3, 4).",
        },
        checkpoint: {
          question: "Qaysi holatda ikki o'lcham (dimension) broadcasting uchun mos keladi?",
          options: [
            "Agar o'lchamlar teng bo'lsa yoki ulardan biri aynan 1 ga teng bo'lsa",
            "Faqat ikkala o'lcham juft son bo'lsa",
            "O'lchamlar har doim mos kelaveradi, cheklov yo'q",
          ],
          correctIndex: 0,
          explanation: "To'g'ri! NumPy o'ngdan chapga (trailing dimensions) qarab tekshiradi: har bir o'lcham yo teng, yoki biri 1 bo'lishi shart.",
          whyQuestion: "Nima uchun (3, 2) va (3, 3) massivlar ustida to'g'ridan-to'g'ri broadcasting ishlab bo'lmaydi?",
        },
      },
      {
        id: "mlds-04-09-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Understand: O'ngdan chapga moslik qoidasi",
        body: "Taqqoslash oxirgi o'lchamdan boshlanadi:\nA: (5, 1, 3)\nB:    (4, 3)\nOxirgi o'lcham: 3 va 3 -> Teng (OK)\nO'rtadagi: 1 va 4 -> Biri 1 (OK -> 4 ga kengayadi)\nBirinchi: 5 va 1 -> (OK -> 5 ga kengayadi)\nNatijaviy shape: (5, 4, 3).",
        formula: "\\text{shape}(A) = (3, 1), \\; \\text{shape}(B) = (1, 4) \\implies \\text{shape}(A + B) = (3, 4)",
        visualizationId: "mlds-lab-04",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Agar bitta o'qda 1 bo'lsa, u boshqa massivdagi son qanchalik katta bo'lsa, shuncha marta takrorlanadi.",
          numericMicroExample: "[[10], [20]] + [1, 2] -> [[11, 12], [21, 22]].",
        },
      },
      {
        id: "mlds-04-09-step-3",
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: "Qadam 3 — Master: Ma'lumotlarni markazlashtirish (Mean Centering)",
        body: "Har bir ustundan uning o'rtacha qiymatini ayirish amaliy ML'da eng ko'p uchraydigan broadcasting namunasidir:\nX: (N, D), mean: (D,) yoki (1, D) -> X - mean: (N, D).",
        codeSnippet: `import numpy as np

X = np.array([[10.0, 20.0], [30.0, 40.0], [50.0, 60.0]])
col_mean = X.mean(axis=0)
X_centered = X - col_mean
print("Centered X:\\n", X_centered)`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "col_mean (2,) massivi har bir qatordan avtomatik ayirib chiqiladi.",
          numericMicroExample: "[[10, 20]] - [30, 40] = [-20, -20].",
        },
      },
    ],
  },

  "mlds-22-04": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-22-01", "mlds-22-03"],
    relatedResearchSlug: "embeddings-and-vectors",
    visualizationId: "mlds-lab-22",
    guidedSteps: [
      {
        id: "mlds-22-04-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — K-Means klasterlash intuitiv tushunchasi",
        body: "K-Means — belgilanmagan (unsupervised) ma'lumotlarni K ta guruhga (klasterga) ajratuvchi iterativ algoritm. Har bir klaster o'zining markazi (centroid) bilan ifodalanadi. Maqsad: har bir nuqta va unga biriktirilgan centroid orasidagi Evklid masofalari kvadratlari yig'indisini minimallashtirish.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Tasavvur qiling, shaharda K ta tez yordam punkti qurmoqchisiz. Har bir uy o'ziga eng yaqin punktga biriktiriladi, so'ng punktlar uylarning o'rtasiga ko'chiriladi.",
          numericMicroExample: "Nuqtalar: [1, 2, 8, 9]. K=2 bo'lsa, Centroidlar: C1=1.5, C2=8.5.",
        },
        checkpoint: {
          question: "K-Means algoritmida har bir iteratsiyada qanday 2 asosiy qadam takrorlanadi?",
          options: [
            "Assignment (har bir nuqtani eng yaqin centroidga biriktirish) va Update (centroidlarni klaster o'rtachasiga siljitish)",
            "Gradient descent va Backpropagation",
            "Faqat tasodifiy nuqtalarni tanlash",
          ],
          correctIndex: 0,
          explanation: "To'g'ri! Lloyd algoritmi: 1) Assignment (Voronoi bo'linishi), 2) Centroidlarni o'rtacha (mean) ga yangilash.",
          whyQuestion: "Nima uchun K-Means global minimumga erishishni kafolatlamaydi (lokal minimumda to'xtab qolishi mumkin)?",
        },
      },
      {
        id: "mlds-22-04-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Assignment va Update qadamlarining matematik formulasi",
        body: "Assignment bosqichida har bir x_i uchun eng yaqin centroid c_j tanlanadi. Update bosqichida yangi centroid klasterdagi barcha nuqtalarning o'rtacha arifmetigi sifatida qayta hisoblanadi.",
        formula: "c_j = \\frac{1}{|S_j|} \\sum_{x_i \\in S_j} x_i",
        visualizationId: "mlds-lab-22",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Klasterdagi x larning o'rtachasi yangi markaz koordinatasini beradi.",
          numericMicroExample: "Klaster nuqtalari: (1, 2) va (3, 4) -> Yangi centroid: ((1+3)/2, (2+4)/2) = (2, 3).",
        },
      },
      {
        id: "mlds-22-04-step-3",
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: "Qadam 3 — Evklid masofasi va assignmentni NumPy'da hisoblash",
        body: "NumPy broadcasting yordamida N ta nuqtaning K ta centroiddan masofasini (N, K) matritsada bir amalda hisoblash va eng yaqin indeksni argmin orqali topish mumkin.",
        codeSnippet: `import numpy as np

points = np.array([[1.0, 2.0], [2.0, 1.0], [8.0, 9.0], [9.0, 8.0]])
centroids = np.array([[1.5, 1.5], [8.5, 8.5]])

diff = points[:, np.newaxis, :] - centroids[np.newaxis, :, :]
distances = np.linalg.norm(diff, axis=2)
assignments = np.argmin(distances, axis=1)
print("Klaster birikmalari:", assignments)`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Birinchi 2 nuqta 0-klasterga, keyingi 2 nuqta 1-klasterga biriktirildi.",
          numericMicroExample: "Masofa matrix: [[0.707, 9.9], [0.707, 9.9], [9.9, 0.707], [9.9, 0.707]].",
        },
      },
    ],
  },

  "mlds-01-01": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: [],
    relatedResearchSlug: "ai-history-and-paradigms",
    visualizationId: "mlds-lab-01",
    guidedSteps: [
      {
        id: "mlds-01-01-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — AI, ML va Deep Learning ierarxiyasi",
        body: "Sun'iy intellekt (AI) — inson aql-idrokini talab qiladigan vazifalarni kompyuterda modellashtiruvchi eng keng sohadir. Machine Learning (ML) — qoidalarni qo'lda yozmasdan, ma'lumotlardan qonuniyatlarni o'rganuvchi AI qismidir. Deep Learning (DL) esa ko'p qatlamli sun'iy neyron tarmoqlariga asoslangan ML qismidir.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Rus qo'g'irchoqlari (Matryoshka) kabi: AI eng kattasi, uning ichida ML, ML ning eng chuqur yadrosida DL joylashgan.",
          numericMicroExample: "Rule-based: if-else shartlar; ML: Random Forest, Linear Regression; DL: Transformers, CNN, LLM.",
        },
        checkpoint: {
          question: "An'anaviy dasturlash bilan Machine Learning orasidagi tub farq nimada?",
          options: [
            "An'anaviy dasturlash: Ma'lumot + Qoidalar -> Javob; Machine Learning: Ma'lumot + Javoblar -> Qoidalar (Model)",
            "Machine Learning faqat katta kompyuterlarda ishlaydi",
            "An'anaviy dasturlashda hech qachon xatolik bo'lmaydi",
          ],
          correctIndex: 0,
          explanation: "To'g'ri! ML yondashuvida inson qoidalarni yozmaydi, model kirish va chiqish juftliklaridan qoidalarni (vaznlar w va bias b ni) o'rganadi.",
          whyQuestion: "Nima uchun murakkab kompyuter ko'rishi (Computer Vision) masalalarida qo'lda if-else yozish imkonsiz?",
        },
      },
      {
        id: "mlds-01-01-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Paradigmalarning solishtirma tahlili",
        body: "Klassik ML jadval ma'lumotlari (tabular data) uchun feature engineering yordamida optimal ishlaydi. Deep Learning esa xom ma'lumotlar (tasvirlar, audio, matnlar)dan ierarxik xususiyatlarni mustaqil ajratib oladi.",
        visualizationId: "mlds-lab-01",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Klassik ML: mutaxassis muhim ustunlarni belgilab beradi. DL: neyron tarmoq pastki qatlamlarda chiziqlarni, yuqori qatlamlarda butun obyektlarni o'zi topadi.",
          numericMicroExample: "10 ming qatorli Excel jadval -> XGBoost; 1 million rasm -> ResNet/ViT.",
        },
      },
      {
        id: "mlds-01-01-step-3",
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: "Qadam 3 — Qoidaga asoslangan tizim vs ML modelini sinash",
        body: "Quyidagi misolda oddiy qoida va ma'lumotlardan o'rganuvchi yondashuvning solishtirmasi ko'rsatilgan.",
        codeSnippet: `def rule_based_spam_filter(text: str) -> bool:
    keywords = ["yutuq", "sovg'a", "bepul", "karta"]
    return any(k in text.lower() for k in keywords)

weights = {"yutuq": 2.4, "salom": -1.2, "bepul": 1.8, "uchrashuv": -0.9}
def ml_score(words: list[str]) -> float:
    return sum(weights.get(w.lower(), 0.0) for w in words)`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "Qoidaga asoslangan tizim qattiq 'ha/yo'q' deydi, ML vaznlari esa umumiy ehtimollik ko'rsatkichini beradi.",
          numericMicroExample: "['salom', 'uchrashuv'] -> -2.1 (Spam emas).",
        },
      },
    ],
  },

  "mlds-02-01": {
    status: "published",
    publishedDepths: ["overview", "understand", "master"],
    prerequisites: ["mlds-01-01"],
    relatedResearchSlug: "machine-learning-basics",
    visualizationId: "mlds-lab-02",
    guidedSteps: [
      {
        id: "mlds-02-01-step-1",
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: "Qadam 1 — Python interpretatori va xotira modeli",
        body: "Python interpretatsiyalanuvchi til bo'lib, har bir o'zgaruvchi xotiradagi (Heap) obyektga ko'rsatkichdir (reference). Oddiy b = a amali yangi ro'yxat yaratmaydi, faqat mavjud xotira manziliga yangi nom biriktiradi (aliasing). ML hisob-kitoblarida xotiradan to'g'ri foydalanish hal qiluvchi ahamiyatga ega.",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "O'zgaruvchi — obyektning o'zi emas, uning xotira manziliga ko'rsatkich qog'ozchasidir. Ikki kishi bitta uy manzilini ushlab turishi mumkin.",
          numericMicroExample: "a = [1, 2]; b = a; b.append(3) -> a ham [1, 2, 3] ga aylanadi!",
        },
        checkpoint: {
          question: "Python'da ikkita o'zgaruvchi aynan bitta xotira manzilida joylashganini qaysi operator tekshiradi?",
          options: [
            "is operatori (id() qiymatlarini solishtiradi)",
            "== operatori (qiymatlarni solishtiradi)",
            "in operatori",
          ],
          correctIndex: 0,
          explanation: "To'g'ri! a is b ularning xotiradagi manzili bir xilligini tekshiradi, a == b esa qiymatlari tengligini tekshiradi.",
          whyQuestion: "Nima uchun mustaqil yangi ro'yxat olish uchun a.copy() yoki list(a) dan foydalanish shart?",
        },
      },
      {
        id: "mlds-02-01-step-2",
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: "Qadam 2 — Python sikllari vs Vektorizatsiya (C darajasidagi tezlik)",
        body: "Python for-sikli dinamik tiplash va tekshiruvlar tufayli nisbatan sekin ishlaydi. NumPy massivlari esa xotirada ketma-ket joylashgan C massivlari bo'lib, SIMD ko'rsatmalari orqali 50-100 baravar tezroq ishlaydi.",
        visualizationId: "mlds-lab-02",
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: "Oddiy for sikli har bir elementga alohida qaraydi; Vektorizatsiya esa birdaniga 8-16 ta sonni bitta protsessor buyrug'i bilan hisoblaydi.",
          numericMicroExample: "1 million son yig'indisi: Python for = ~50ms, NumPy np.sum = ~0.6ms.",
        },
      },
      {
        id: "mlds-02-01-step-3",
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: "Qadam 3 — Aliasing va mustaqil xotira nusxasi testi",
        body: "Ro'yxat nusxasini to'g'ri ajratish va xotira mustaqilligini assert bilan tekshirish.",
        codeSnippet: `a = [10, 20, 30]
b = a          # Aliasing
c = a.copy()   # Mustaqil nusxa

b.append(40)
assert 40 in a
assert 40 not in c
assert (a is b) is True
assert (a is c) is False
print("Test muvaffaqiyatli: a =", a, "c =", c)`,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown: "b ga qo'shilgan element a da ham paydo bo'ldi, ammo c da yo'q.",
          numericMicroExample: "id(a) == id(b) != id(c).",
        },
      },
    ],
  },
};

const PHASE_RESEARCH_ENRICHMENT: Record<
  string,
  {
    relatedResearchSlugs: readonly string[];
    defaultVisualizationId: MlDsVisualizationId;
  }
> = {
  "mlds-01": { relatedResearchSlugs: ["ai-history-and-paradigms", "machine-learning-basics"], defaultVisualizationId: "function-explorer" },
  "mlds-02": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "function-explorer" },
  "mlds-03": { relatedResearchSlugs: ["chunking-and-indexing"], defaultVisualizationId: "rag-sandbox-explorer" },
  "mlds-04": { relatedResearchSlugs: ["embeddings-and-vectors"], defaultVisualizationId: "cosine-similarity-explorer" },
  "mlds-05": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "function-explorer" },
  "mlds-06": { relatedResearchSlugs: ["chunking-and-indexing"], defaultVisualizationId: "rag-sandbox-explorer" },
  "mlds-07": { relatedResearchSlugs: ["overfitting-and-underfitting"], defaultVisualizationId: "function-explorer" },
  "mlds-08": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "function-explorer" },
  "mlds-09": { relatedResearchSlugs: ["embeddings-and-vectors"], defaultVisualizationId: "cosine-similarity-explorer" },
  "mlds-10": { relatedResearchSlugs: ["embeddings-and-vectors"], defaultVisualizationId: "cosine-similarity-explorer" },
  "mlds-11": { relatedResearchSlugs: ["gradient-descent", "learning-rate-and-convergence", "loss-functions"], defaultVisualizationId: "gradient-descent-1d" },
  "mlds-12": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "ab-cuped-explorer" },
  "mlds-13": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "ab-cuped-explorer" },
  "mlds-14": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "ab-cuped-explorer" },
  "mlds-15": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "ab-cuped-explorer" },
  "mlds-16": { relatedResearchSlugs: ["overfitting-and-underfitting", "regularization-l1-l2-dropout"], defaultVisualizationId: "function-explorer" },
  "mlds-17": { relatedResearchSlugs: ["loss-functions", "gradient-descent"], defaultVisualizationId: "gradient-descent-1d" },
  "mlds-18": { relatedResearchSlugs: ["activation-functions", "machine-learning-basics"], defaultVisualizationId: "confusion-matrix-explorer" },
  "mlds-19": { relatedResearchSlugs: ["machine-learning-basics", "overfitting-and-underfitting"], defaultVisualizationId: "confusion-matrix-explorer" },
  "mlds-20": { relatedResearchSlugs: ["overfitting-and-underfitting", "regularization-l1-l2-dropout"], defaultVisualizationId: "confusion-matrix-explorer" },
  "mlds-21": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "confusion-matrix-explorer" },
  "mlds-22": { relatedResearchSlugs: ["embeddings-and-vectors"], defaultVisualizationId: "cosine-similarity-explorer" },
  "mlds-23": { relatedResearchSlugs: ["autoencoders", "embeddings-and-vectors"], defaultVisualizationId: "cosine-similarity-explorer" },
  "mlds-24": { relatedResearchSlugs: ["machine-learning-basics"], defaultVisualizationId: "function-explorer" },
  "mlds-25": { relatedResearchSlugs: ["deep-learning-foundations", "activation-functions", "backpropagation"], defaultVisualizationId: "neural-network-explorer" },
  "mlds-26": { relatedResearchSlugs: ["optimizers-sgd-momentum-adam", "batch-normalization"], defaultVisualizationId: "neural-network-explorer" },
  "mlds-27": { relatedResearchSlugs: ["cnn-convolutional-networks"], defaultVisualizationId: "neural-network-explorer" },
  "mlds-28": { relatedResearchSlugs: ["rnn-recurrent-networks", "lstm-and-gru", "self-attention-qkv"], defaultVisualizationId: "self-attention-explorer" },
  "mlds-29": { relatedResearchSlugs: ["transformers", "multi-head-attention", "positional-encoding", "gans"], defaultVisualizationId: "self-attention-explorer" },
  "mlds-30": { relatedResearchSlugs: ["rlhf-and-dpo", "ai-safety-and-hallucinations"], defaultVisualizationId: "function-explorer" },
  "mlds-31": { relatedResearchSlugs: ["quantization-fp16-int8-int4", "rag-evaluation-ragas"], defaultVisualizationId: "rag-sandbox-explorer" },
};

const CROSSLINKED_AI_ENGINEER_IDS: Record<string, string> = {
  "mlds-09-02": "12.02",
  "mlds-09-06": "12.04",
  "mlds-09-07": "12.05",
  "mlds-09-08": "12.07",
  "mlds-28-13": "08.10",
  "mlds-29-07": "08.01",
};

export const ML_DS_PHASES: readonly MlDsPhase[] = rawMlDsCurriculum.phases.map(
  (rawPhase) => {
    const enrich = PHASE_RESEARCH_ENRICHMENT[rawPhase.id] ?? {
      relatedResearchSlugs: ["machine-learning-basics"],
      defaultVisualizationId: "function-explorer" as const,
    };

    const lessons: MlDsMicroLesson[] = rawPhase.lessons.map((rawLesson, idx) => {
      const authored = AUTHORED_MLDS_LESSONS[rawLesson.id];
      const rich = getMlDs520LessonById(rawLesson.id);
      const prevId = idx > 0 ? rawPhase.lessons[idx - 1]?.id : undefined;
      const rawPrereqs = Array.isArray(rawLesson.prerequisites)
        ? (rawLesson.prerequisites as string[])
        : [];

      return {
        id: rawLesson.id,
        phaseId: rawPhase.id,
        order: rawLesson.order,
        title: rawLesson.title,
        slug: rawLesson.slug,
        status: authored
          ? authored.status
          : rich?.status === "published"
            ? "published"
            : (rawLesson.status as MicroLessonStatus),
        publishedDepths: authored
          ? authored.publishedDepths
          : rich?.status === "published"
            ? ["overview", "understand", "master"]
            : (rawLesson.publishedDepths as LearningDepth[]),
        targetDepths: rawLesson.targetDepths as LearningDepth[],
        prerequisites: authored
          ? authored.prerequisites
          : rawPrereqs.length > 0
            ? rawPrereqs
            : prevId
              ? [prevId]
              : [],
        sourceSection: rawPhase.sourceSection,
        notes: rawLesson.notes,
        crosslinkedAiLessonId:
          authored?.crosslinkedAiLessonId ??
          (typeof rich?.aiRelatedLessons?.[0] === "string"
            ? (rich.aiRelatedLessons[0] as string)
            : (rich?.aiRelatedLessons?.[0] as { id: string } | undefined)?.id ??
              CROSSLINKED_AI_ENGINEER_IDS[rawLesson.id]),
        relatedResearchSlug:
          authored?.relatedResearchSlug ?? enrich.relatedResearchSlugs[0],
        visualizationId:
          authored?.visualizationId ?? (rich?.visualLabId as MlDsVisualizationId) ?? enrich.defaultVisualizationId,
        guidedSteps: authored?.guidedSteps,
        learningObjectiveUz: rich?.learningObjectiveUz,
        theoryUz: rich?.theoryUz,
        examples: rich?.examples,
        commonMistakes: rich?.commonMistakes,
        quiz: rich?.quiz,
        practiceTasks: rich?.practiceTasks,
        summaryTakeaways: rich?.summaryTakeaways,
        pythonPrerequisites: rich?.pythonPrerequisites,
        aiRelatedLessons: rich?.aiRelatedLessons,
        visualFlow: rich?.visualFlow,
        visualLabId: rich?.visualLabId,
      };
    });

    return {
      id: rawPhase.id,
      order: rawPhase.order,
      title: rawPhase.title,
      sourceSection: rawPhase.sourceSection,
      visualizationDescription: rawPhase.visualization.description,
      projectMilestone: rawPhase.projectMilestone,
      trackPriority: rawPhase.trackPriority as Record<MlDsTrackId, TopicRole>,
      relatedResearchSlugs: enrich.relatedResearchSlugs,
      defaultVisualizationId: enrich.defaultVisualizationId,
      lessons,
    };
  },
);

export const TOTAL_ML_DS_MICRO_LESSONS: number = ML_DS_PHASES.reduce(
  (sum, p) => sum + p.lessons.length,
  0,
);

export function getMlDsPhase(phaseId: string): MlDsPhase | undefined {
  return ML_DS_PHASES.find((p) => p.id === phaseId);
}

export function getMlDsMicroLesson(lessonId: string): {
  phase: MlDsPhase;
  lesson: MlDsMicroLesson;
  prevLesson: MlDsMicroLesson | null;
  nextLesson: MlDsMicroLesson | null;
} | null {
  const flat: { phase: MlDsPhase; lesson: MlDsMicroLesson }[] = [];
  for (const phase of ML_DS_PHASES) {
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

export function getMlDsGuidedSteps(
  lesson: MlDsMicroLesson,
  phase: MlDsPhase,
): readonly MlDsGuidedStep[] {
  if (lesson.guidedSteps && lesson.guidedSteps.length > 0) {
    return lesson.guidedSteps;
  }
  const prereqId = lesson.prerequisites[0];
  const firstQuiz = lesson.quiz?.[0];

  if (lesson.theoryUz) {
    return [
      {
        id: `${lesson.id}-step-1`,
        stepNumber: 1,
        depth: "overview",
        type: "intuition",
        title: `Qadam 1 — Overview: ${lesson.title}`,
        body: `${lesson.learningObjectiveUz ?? lesson.title}\n\n${lesson.theoryUz.split("\n\n")[0] || lesson.theoryUz}`,
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: `“${lesson.title}” tushunchasi ${phase.title} bosqichining asosiy poydevori hisoblanadi.`,
          numericMicroExample: `Fazaning mini-loyihasi: ${phase.projectMilestone}`,
          ...(prereqId
            ? {
                prerequisiteLessonId: prereqId,
                prerequisiteTitle: `Oldingi tayanch dars (${prereqId})`,
              }
            : {}),
        },
        checkpoint: firstQuiz
          ? {
              question: firstQuiz.promptUz,
              options: [...firstQuiz.options],
              correctIndex: firstQuiz.correctIndex,
              explanation: firstQuiz.explanationUz,
              whyQuestion: "Nima uchun ushbu tamoyil ML va Data Science modellarida muhim hisoblanadi?",
            }
          : undefined,
      },
      {
        id: `${lesson.id}-step-2`,
        stepNumber: 2,
        depth: "understand",
        type: "visual",
        title: `Qadam 2 — Understand: Chuqur tahlil va vizual mexanizm`,
        body: lesson.theoryUz,
        visualizationId:
          lesson.visualizationId ??
          (lesson.visualLabId as MlDsVisualizationId) ??
          phase.defaultVisualizationId,
        provenance: "source-backed",
        tushunmadim: {
          simplerBreakdown: `Interaktiv laboratoriyada parametrlarni o‘zgartirib, model natijasini real vaqtda kuzating.`,
          numericMicroExample: `Vizual model: ${phase.visualizationDescription}`,
        },
      },
      {
        id: `${lesson.id}-step-3`,
        stepNumber: 3,
        depth: "master",
        type: "code",
        title: `Qadam 3 — Master: Namunaviy amaliy kod va tekshiruv`,
        body:
          lesson.examples?.[0]?.explanationUz ||
          `Mini-loyiha: ${phase.projectMilestone}. Namunaviy kodni sinab ko'ring va natijani tekshiring.`,
        codeSnippet: lesson.examples?.[0]?.code,
        provenance: "illustrative-example",
        tushunmadim: {
          simplerBreakdown:
            "Master bosqichida kodning to'g'ri ishlashi, chekka holatlar va reproducibility mezonlari o'rganiladi.",
          numericMicroExample: `Loyiha: ${phase.projectMilestone}`,
        },
      },
    ];
  }

  return [
    {
      id: `${lesson.id}-step-1`,
      stepNumber: 1,
      depth: "overview",
      type: "intuition",
      title: `Qadam 1 — Overview: ${lesson.title} (Tayyorlanmoqda / Planned)`,
      body: `Ushbu mikro-dars (${lesson.id}) Phase ${phase.order} (${phase.title}) tarkibiga kiradi. Manba bo‘limi: “${phase.sourceSection}”.\n\nHalollik eslatmasi: Ushbu mavzu reja-skeletda (status: planned) turibdi; uning tayyorlanayotgan vizual laboratoriyasi: “${phase.visualizationDescription}”.`,
      provenance: "curriculum-scaffold",
      tushunmadim: {
        simplerBreakdown: `“${lesson.title}” tushunchasi “${phase.projectMilestone}” amaliy loyihasini bajarish uchun poydevor bo‘lib xizmat qiladi.`,
        numericMicroExample: `Phase ${phase.id} mini-loyihasi: ${phase.projectMilestone}`,
        ...(prereqId
          ? {
              prerequisiteLessonId: prereqId,
              prerequisiteTitle: `Oldingi tayanch dars (${prereqId})`,
            }
          : {}),
      },
      checkpoint: {
        question: `“${lesson.title}” (${lesson.id}) mavzusi qaysi modul va mini-loyihaga tegishli?`,
        options: [
          `${phase.id} (${phase.title}) — ${phase.projectMilestone}`,
          "Faqat brauzer dizayni uchun",
          "Hech qanday ma’lumotlar yoki modellar bilan bog‘liq emas",
        ],
        correctIndex: 0,
        explanation: `Ushbu mikro-dars ${phase.id}: ${phase.title} bosqichidagi “${phase.projectMilestone}” vazifasiga kiradi.`,
        whyQuestion: "Nima uchun ML va Data Science mavzularini nazariya + kod + tekshiruv ketma-ketligida o‘rganish muhim?",
      },
    },
    {
      id: `${lesson.id}-step-2`,
      stepNumber: 2,
      depth: "understand",
      type: "visual",
      title: `Qadam 2 — Understand: Vizual laboratoriya va mexanizm`,
      body: `Rejalashtirilgan vizual model: ${phase.visualizationDescription}. Quyida ushbu fazaga biriktirilgan interaktiv matematik simulator bilan tajriba o‘tkazishingiz mumkin.`,
      visualizationId: lesson.visualizationId ?? phase.defaultVisualizationId,
      provenance: "curriculum-scaffold",
      tushunmadim: {
        simplerBreakdown: `Slayderlar orqali kirish parametrlarini o‘zgartirib, chiqish qiymatlari qanday o‘zgarishini kuzating.`,
        numericMicroExample: `Vizual model: ${phase.visualizationDescription}`,
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
      title: `Qadam 3 — Master: Amaliy mezon va Reproducibility`,
      body: `Mini-loyiha: ${phase.projectMilestone}. Completion gate: kamida bitta real amaliy topshiriq va asosiy checkpointlardan dalil; planned darslar avtomatik yakunlangan deb hisoblanmaydi.`,
      provenance: "curriculum-scaffold",
      tushunmadim: {
        simplerBreakdown: "Master bosqichida kodning qayta tiklanuvchanligi (reproducibility), chekka holatlar va xatolik tahlili tekshiriladi.",
        numericMicroExample: `Loyiha: ${phase.projectMilestone}`,
      },
    },
  ];
}

/**
 * Validates that all 520 ML/DS micro-lessons have valid prerequisite IDs and zero dependency cycles.
 */
export function validateMlDsPrerequisiteGraph(): {
  valid: boolean;
  missingIds: string[];
  cycles: string[][];
} {
  const map = new Map<string, MlDsMicroLesson>();
  for (const phase of ML_DS_PHASES) {
    for (const lesson of phase.lessons) {
      map.set(lesson.id, lesson);
    }
  }

  const missingIds: string[] = [];
  for (const lesson of map.values()) {
    for (const prereq of lesson.prerequisites) {
      if (!map.has(prereq)) {
        missingIds.push(`${lesson.id} -> ${prereq}`);
      }
    }
  }

  const visited = new Set<string>();
  const inStack = new Set<string>();
  const cycles: string[][] = [];

  function dfs(nodeId: string, path: string[]) {
    if (inStack.has(nodeId)) {
      cycles.push([...path, nodeId]);
      return;
    }
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    inStack.add(nodeId);

    const node = map.get(nodeId);
    if (node) {
      for (const prereq of node.prerequisites) {
        if (map.has(prereq)) {
          dfs(prereq, [...path, nodeId]);
        }
      }
    }
    inStack.delete(nodeId);
  }

  for (const id of map.keys()) {
    if (!visited.has(id)) {
      dfs(id, []);
    }
  }

  return {
    valid: missingIds.length === 0 && cycles.length === 0,
    missingIds,
    cycles,
  };
}
