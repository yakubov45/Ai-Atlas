/**
 * Prompt Engineering 20-Phase Curriculum Registry (`pe-01` .. `pe-20`, 313 micro-lessons)
 *
 * Loads `src/content/curriculum/prompt-engineering-curriculum.json` and exposes:
 * - All 20 phases (`pe-01` .. `pe-20`)
 * - All 313 micro-lesson nodes (`pe-01-01` .. `pe-20-18`)
 * - 6-track priority mapping (`prompt-engineer`, `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`, `data-engineer`)
 * - 20 conservative `candidateReuse` cross-links (`review_required_not_an_alias`)
 * - 13 user-listed references (`not_supplied_or_live_verified`)
 * - Complete vertical slice for `pe-06-06` (Temperature), `pe-07-02` (Top-K), and `pe-07-04` (Top-P) across Overview, Understand, and Master depths
 */

import rawCurriculum from "@/content/curriculum/prompt-engineering-curriculum.json";
import type { LearningDepth } from "@/lib/curriculum/paths";

export type PromptEngineeringTrackId =
  | "prompt-engineer"
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "python-developer"
  | "data-engineer";

export type PromptEngineeringTrackRole =
  | "core"
  | "supporting"
  | "optional"
  | "advanced";

export interface PromptEngineeringSourceRef {
  source: string;
  section: string;
  sectionTitle: string;
  verification: string;
}

export interface PromptEngineeringCandidateReuse {
  newLessonId: string;
  existingCurriculum: string;
  existingLessonId: string;
  topicOverlap: string;
  status: string;
}

export interface PromptEngineeringLessonNode {
  id: string;
  order: number;
  title: string;
  status: "planned" | "published";
  publishedDepths: LearningDepth[];
  targetDepths: LearningDepth[];
  contentAvailability: string;
  sourceRefs: PromptEngineeringSourceRef[];
  prerequisites: string[];
  visualizationIds: string[];
  checkpointStatus: string;
  candidateReuse?: PromptEngineeringCandidateReuse | null;
}

export interface PromptEngineeringPhase {
  id: string;
  order: number;
  title: string;
  sourceSections: string[];
  prerequisitePhaseIds: string[];
  visualization: {
    id: string;
    description: string;
    status: "proposed" | "working";
    published: boolean;
  };
  projectMilestone: string;
  lessons: PromptEngineeringLessonNode[];
  trackPriority: Record<PromptEngineeringTrackId, string>;
}

export interface PromptEngineeringResourceItem {
  id: string;
  title: string;
  sourceSection: string;
  url: string | null;
  urlStatus: string;
  type: string;
}

export interface PromptEngineeringCheckpointQuestion {
  id: string;
  depth: LearningDepth;
  questionUz: string;
  optionsUz: string[];
  correctIndex: number;
  explanationUz: string;
}

const AUTHORED_VERTICAL_SLICE_IDS = new Set<string>([
  "pe-06-06",
  "pe-07-02",
  "pe-07-04",
]);

export const PROMPT_ENGINEERING_CANDIDATE_REUSE: readonly PromptEngineeringCandidateReuse[] =
  rawCurriculum.integration.candidateReuse as PromptEngineeringCandidateReuse[];

const reuseByNewLessonId = new Map<string, PromptEngineeringCandidateReuse>(
  PROMPT_ENGINEERING_CANDIDATE_REUSE.map((r) => [r.newLessonId, r])
);

export const PROMPT_ENGINEERING_PHASES: readonly PromptEngineeringPhase[] = (
  rawCurriculum.phases as PromptEngineeringPhase[]
).map((phase) => {
  const isWorkingPhase = phase.id === "pe-06" || phase.id === "pe-07";
  return {
    ...phase,
    visualization: {
      ...phase.visualization,
      status: isWorkingPhase ? "working" : phase.visualization.status,
      published: isWorkingPhase,
    },
    lessons: phase.lessons.map((lesson) => {
      const isAuthored = AUTHORED_VERTICAL_SLICE_IDS.has(lesson.id);
      return {
        ...lesson,
        status: isAuthored ? "published" : "planned",
        publishedDepths: isAuthored
          ? (["overview", "understand", "master"] as LearningDepth[])
          : [],
        contentAvailability: isAuthored
          ? "authored_vertical_slice"
          : lesson.contentAvailability,
        checkpointStatus: isAuthored ? "ready" : lesson.checkpointStatus,
        candidateReuse: reuseByNewLessonId.get(lesson.id) ?? null,
      };
    }),
  };
});

export const PROMPT_ENGINEERING_LESSONS: readonly PromptEngineeringLessonNode[] =
  PROMPT_ENGINEERING_PHASES.flatMap((p) => p.lessons);

export const PROMPT_ENGINEERING_RESOURCES: readonly PromptEngineeringResourceItem[] =
  rawCurriculum.resourceIndex as PromptEngineeringResourceItem[];

export const PROMPT_ENGINEERING_ACCURACY_NOTES: readonly string[] =
  rawCurriculum.accuracyNotes;

export const SAMPLING_VERTICAL_SLICE = {
  lessonIds: ["pe-06-06", "pe-07-02", "pe-07-04"] as const,
  primaryLessonId: "pe-06-06",
  titleUz:
    "Temperature, Top-K va Top-P: Keyingi Token Ehtimolliklarini Boshqarish",
  estimatedMinutes: {
    overview: 4,
    understand: 12,
    master: 25,
  } as Record<LearningDepth, number>,
  overview: {
    whatItIsUz:
      "Til modeli har bir qadamda keyingi bo‘lishi mumkin bo‘lgan tokenlar uchun xom baholar (logits) chiqaradi. Softmax bu baholarni ehtimollikka (yig‘indisi 100%) aylantiradi. Temperature ehtimollik taqsimoti qanchalik keskin yoki tekis bo‘lishini, Top-K eng yuqori K ta nomzod qolishini, Top-P esa yig‘indisi P chegarasiga yetadigan eng kichik yuqori nomzodlar yadrosini (nucleus) belgilaydi.",
    cautionUz:
      "Diqqat: Sampling parametrlari modelning ichki bilimini yoki faktik haqiqatni o‘zgartirmaydi — faqatgina nomzod tokenlar orasidan tanlash mexanizmini boshqaradi.",
    analogyUz:
      "Tasavvur qiling, 4 ta javob nomzodi bor: Python (logit 2.4), matematika (1.4), LLM (0.6), fizika (-0.2). Temperature < 1 yetakchi nomzodning ustunligini oshiradi, Top-K va Top-P esa past ehtimolli dum (tail) nomzodlarni kesib tashlaydi.",
  },
  understandSteps: [
    {
      step: 1,
      titleUz: "Qadam 1. Sintetik logits (o‘quv misoli)",
      bodyUz:
        "O‘quv maqsadida 4 ta nomzod tanladik: Python = 2.4, matematika = 1.4, LLM = 0.6, fizika = -0.2. Bu qiymatlar sintetik — haqiqiy o‘qitilgan modeldan olinmagan.",
    },
    {
      step: 2,
      titleUz: "Qadam 2. Softmax va Temperature (T = 1.0)",
      bodyUz:
        "p_i = exp(z_i / T) / Σ_j exp(z_j / T). T=1, K=4, P=1 bo‘lganda ehtimolliklar: Python = 62.21%, matematika = 22.89%, LLM = 10.28%, fizika = 4.62% (jami 100.00%).",
    },
    {
      step: 3,
      titleUz: "Qadam 3. Temperature o‘zgarishi (0 < T < 1, T > 1 va T = 0)",
      bodyUz:
        "0 < T < 1 katta logitli tokenlarga ko‘proq vazn beradi; T > 1 taqsimotni tekislaydi; T = 0 esa ushbu laboratoriyada eng katta logitni oluvchi greedy holat sifatida ko‘rsatiladi (ammo real cloud API’larda T=0 mutlaq determinizmni kafolatlamaydi).",
    },
    {
      step: 4,
      titleUz: "Qadam 4. Top-K filtrlash va qayta normallashtirish",
      bodyUz:
        "Avval eng katta K ta ehtimollik qoldiriladi va qolganlari 0 qilinadi, so‘ngra qolganlarning yig‘indisi 100% ga qayta normallashtiriladi (masalan, K=2 bo‘lsa faqat Python va matematika qoladi).",
    },
    {
      step: 5,
      titleUz: "Qadam 5. Top-P (Nucleus) filtrlash va ketma-ketlik",
      bodyUz:
        "Nomzodlar ehtimollik kamayish tartibida qo‘shib boriladi va yig‘indi P chegarasiga yetishi bilan to‘xtatiladi, so‘ng qayta normallashtiriladi. Laboratoriya tartibi: softmax → top-k → renormalize → top-p → renormalize → sample.",
    },
    {
      step: 6,
      titleUz: "Qadam 6. Seed va tasodifiy tanlash (Sampling)",
      bodyUz:
        "Yakuniy taqsimot tayyor bo‘lgach, tasodifiy son generatori (seed) yordamida ehtimollikka proporsional ravishda bitta token tanlanadi.",
    },
  ],
  master: {
    stableSoftmaxFormula:
      "p_i = exp((z_i - max(z)) / T) / Σ_j exp((z_j - max(z)) / T)",
    frequencyPenaltyFormula:
      "z'_i = z_i - α_freq · c_i (o‘quv operatori; c_i — tokenning tarixda uchrash soni)",
    pythonEnginePath: "examples/python/sampling_math.py",
    manimScriptPath: "examples/manim/sampling_explained.py",
    manimVideoUrl: "/animations/sampling_explained.mp4",
    edgeCasesUz: [
      "Probability = 0 bo‘lib qolgan nomzod hech qachon tanlanmasligi shart.",
      "top_k < 1 yoki top_p <= 0 noto‘g‘ri kirish sifatida rad etiladi.",
      "Juda kichik T > 0 qiymatlarida overflow bo‘lmasligi uchun max(z) ayirilgan stabil softmax ishlatiladi.",
      "Sampling parametrlarini sozlash modelning faktik to‘g‘riligini (hallucination yo‘qligini) kafolatlamaydi.",
    ],
  },
  detourPrerequisites: [
    {
      lessonId: "pe-02-06",
      titleUz: "Keyingi token ehtimoli nimani anglatadi?",
      whyNeededUz: "Til modeli matnni birma-bir token ehtimolliklari orqali davom ettirishini tushunish uchun.",
    },
    {
      lessonId: "pe-06-01",
      titleUz: "Logit nima?",
      whyNeededUz: "Softmax’dan oldingi xom chiziqli baholar (manfiy yoki musbat sonlar) ma’nosini bilish uchun.",
    },
    {
      lessonId: "pe-06-03",
      titleUz: "Softmax nima?",
      whyNeededUz: "Logitlarni [0, 1] oraliqdagi va yig‘indisi 1 ga teng ehtimollikka aylantirish uchun.",
    },
    {
      lessonId: "pe-07-01",
      titleUz: "Sampling pipeline nima?",
      whyNeededUz: "Temperature, Top-K va Top-P qaysi ketma-ketlikda qo‘llanishini tushunish uchun.",
    },
  ],
  checkpoints: [
    {
      id: "cp-pe-sampling-1",
      depth: "overview" as LearningDepth,
      questionUz: "Temperature T = 0.5 bo‘lganda (T = 1.0 ga nisbatan) ehtimollik taqsimoti qanday o‘zgaradi?",
      optionsUz: [
        "Keskinlashadi — eng katta logitli tokenning ehtimollik ulushi yanada oshadi",
        "Tekislanadi — barcha 4 ta tokenning ehtimoli 25% ga tenglashadi",
        "Logitlar manfiy songa aylanadi",
        "Model weights o‘zgaradi",
      ],
      correctIndex: 0,
      explanationUz:
        "0 < T < 1 bo‘lganda logitlar kichik songa bo‘linadi, natijada eksponent farqlari kattalashib, yetakchi token ulushi oshadi (keskinlashadi).",
    },
    {
      id: "cp-pe-sampling-2",
      depth: "understand" as LearningDepth,
      questionUz: "Sintetik logitlar (2.4, 1.4, 0.6, -0.2) da T=1, K=4, P=1 bo‘lganda Python va matematika ehtimolliklari qanday bo‘ladi?",
      optionsUz: [
        "Python: 62.21%, matematika: 22.89% (LLM: 10.28%, fizika: 4.62%)",
        "Python: 50.00%, matematika: 50.00%",
        "Python: 24.00%, matematika: 14.00%",
        "Python: 100.00%, matematika: 0.00%",
      ],
      correctIndex: 0,
      explanationUz:
        "Softmax formulasi bo‘yicha T=1 da exp(2.4), exp(1.4), exp(0.6), exp(-0.2) normallashtirilganda 62.21%, 22.89%, 10.28% va 4.62% hosil bo‘ladi.",
    },
    {
      id: "cp-pe-sampling-3",
      depth: "understand" as LearningDepth,
      questionUz: "Top-K = 1 tanlanganda nima sodir bo‘ladi?",
      optionsUz: [
        "Faqat eng yuqori ehtimolli 1 ta nomzod (Python) saqlanadi va uning yakuniy ehtimoli 100% bo‘ladi",
        "Eng past ehtimolli 1 ta nomzod saqlanadi",
        "Barcha 4 ta nomzod saqlanadi",
        "Xatolik yuz beradi",
      ],
      correctIndex: 0,
      explanationUz:
        "Top-K = 1 eng katta ehtimolli bitta nomzoddan boshqa barcha nomzodlarni 0 qiladi va qayta normallashtirishdan so‘ng u 100% bo‘ladi.",
    },
    {
      id: "cp-pe-sampling-4",
      depth: "master" as LearningDepth,
      questionUz: "Nima uchun haqiqiy production API’larda `temperature = 0` va `JSON Schema` birgalikda ishlatilsa ham javobni fakt-check qilish shart?",
      optionsUz: [
        "Chunki T=0 mutlaq determinizmni kafolatlamaydi, JSON Schema esa faqat sintaktik tuzilishni tekshiradi — faktik haqiqatni emas",
        "Chunki T=0 JSON formatini buzib yuboradi",
        "Chunki Top-P har doim 0 ga teng bo‘ladi",
        "Fakt-check qilish shart emas",
      ],
      correctIndex: 0,
      explanationUz:
        "Sampling va Structured Output faqat token tanlash hamda format sxemasini boshqaradi; model baribir ishonchli ohangda noto‘g‘ri fakt (hallucination) chiqarishi mumkin.",
    },
  ] satisfies PromptEngineeringCheckpointQuestion[],
};

export function getPromptEngineeringPhaseRoleForTrack(
  phase: PromptEngineeringPhase,
  trackId: PromptEngineeringTrackId
): {
  role: PromptEngineeringTrackRole;
  recommendedDepth: LearningDepth;
  labelUz: string;
} {
  const raw = phase.trackPriority?.[trackId] ?? "optional";
  if (raw === "core") {
    return {
      role: "core",
      recommendedDepth: "master",
      labelUz: "Core (Master)",
    };
  }
  if (raw === "supporting") {
    return {
      role: "supporting",
      recommendedDepth: "understand",
      labelUz: "Supporting (Understand)",
    };
  }
  return {
    role: "optional",
    recommendedDepth: "overview",
    labelUz: "Optional (Overview)",
  };
}

export function getPromptEngineeringSummaryStats() {
  const totalPhases = PROMPT_ENGINEERING_PHASES.length;
  const totalLessons = PROMPT_ENGINEERING_LESSONS.length;
  const publishedLessons = PROMPT_ENGINEERING_LESSONS.filter(
    (l) => l.status === "published"
  ).length;
  const plannedLessons = totalLessons - publishedLessons;
  const candidateReuseCount = PROMPT_ENGINEERING_CANDIDATE_REUSE.length;
  const resourceCount = PROMPT_ENGINEERING_RESOURCES.length;

  return {
    totalPhases,
    totalLessons,
    publishedLessons,
    plannedLessons,
    candidateReuseCount,
    resourceCount,
  };
}
