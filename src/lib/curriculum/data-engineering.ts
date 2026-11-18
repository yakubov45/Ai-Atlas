/**
 * Data Engineering 20-Phase Curriculum Registry (`de-01` .. `de-20`, 358 micro-lessons)
 *
 * Loads `src/content/curriculum/data-engineering-curriculum.json` and exposes:
 * - All 20 phases (`de-01` .. `de-20`)
 * - All 358 micro-lesson plans (`de-01-01` .. `de-20-30`)
 * - 5-track priority mapping (`data-engineer`, `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`)
 * - Conservative `reuseCandidate` links (`human_review_required_no_auto_alias`)
 * - 27 external learning resources marked `user_supplied_not_live_verified`
 * - Complete vertical slice for `de-11-08` (`ETL vs ELT qayerda mos?`) across Overview, Understand (20 micro-steps), and Master depths
 */

import rawCurriculum from "@/content/curriculum/data-engineering-curriculum.json";
import type { LearningDepth } from "@/lib/curriculum/paths";

export type DataEngineeringTrackId =
  | "data-engineer"
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "python-developer";

export type DataEngineeringTrackRole =
  | "core"
  | "supporting"
  | "optional"
  | "advanced";

export interface DataEngineeringSourceRef {
  sourceFile: string;
  section: string;
  kind: string;
}

export interface DataEngineeringReuseCandidate {
  contentId: string;
  policy: string;
}

export interface DataEngineeringLessonNode {
  id: string;
  order: number;
  title: string;
  status: "planned" | "published";
  publishedDepths: LearningDepth[];
  targetDepths: LearningDepth[];
  sourceRefs: DataEngineeringSourceRef[];
  resourceIds: string[];
  prerequisites: string[];
  visualizationIds: string[];
  authoringOrigin: string;
  reuseCandidate: DataEngineeringReuseCandidate | null;
}

export interface DataEngineeringPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  prerequisitePhaseIds: string[];
  priorityForDataEngineering: string;
  visualization: {
    id: string;
    concept: string;
    status: "proposed" | "working";
  };
  projectMilestone: string;
  lessons: DataEngineeringLessonNode[];
}

export interface DataEngineeringResourceItem {
  id: string;
  title: string;
  provider: string;
  sourceSection: string;
  url: string;
  urlStatus: string;
  availabilityStatus: string;
}

export interface DataEngineeringCheckpointQuestion {
  id: string;
  depth: LearningDepth;
  questionUz: string;
  optionsUz: string[];
  correctIndex: number;
  explanationUz: string;
}

export interface DataEngineeringAuthoredSlice {
  lessonId: string;
  slug: string;
  titleUz: string;
  phaseId: string;
  estimatedMinutes: Record<LearningDepth, number>;
  overview: {
    whatItIsUz: string;
    whyItMattersUz: string;
    realLifeAnalogyUz: string;
    comparisonRows: Array<{
      aspectUz: string;
      etlUz: string;
      eltUz: string;
    }>;
  };
  understand: {
    mechanismIntroUz: string;
    schemaRulesUz: string[];
  };
  master: {
    dataContractRulesUz: string[];
    quarantineVsSilentDropUz: string;
    idempotencyProofUz: string;
    manimScriptPath: string;
    manimVideoUrl: string;
    pythonEnginePath: string;
  };
  detourPrerequisites: Array<{
    lessonId: string;
    titleUz: string;
    whyNeededUz: string;
  }>;
  checkpoints: DataEngineeringCheckpointQuestion[];
}

const AUTHORED_VERTICAL_SLICE_IDS = new Set<string>(["de-11-08"]);

export const DATA_ENGINEERING_PHASES: readonly DataEngineeringPhase[] = (
  rawCurriculum.phases as DataEngineeringPhase[]
).map((phase) => ({
  ...phase,
  visualization: {
    ...phase.visualization,
    status: phase.id === "de-11" ? "working" : phase.visualization.status,
  },
  lessons: phase.lessons.map((lesson) => {
    const isAuthored = AUTHORED_VERTICAL_SLICE_IDS.has(lesson.id);
    return {
      ...lesson,
      status: isAuthored ? "published" : "planned",
      publishedDepths: isAuthored
        ? (["overview", "understand", "master"] as LearningDepth[])
        : [],
    };
  }),
}));

export const DATA_ENGINEERING_LESSONS: readonly DataEngineeringLessonNode[] =
  DATA_ENGINEERING_PHASES.flatMap((p) => p.lessons);

export const DATA_ENGINEERING_RESOURCES: readonly DataEngineeringResourceItem[] =
  Object.values(
    rawCurriculum.resourceIndex as Record<string, DataEngineeringResourceItem>
  );

export const DATA_ENGINEERING_SPECIAL_NOTES: readonly string[] =
  rawCurriculum.source.specialNotes;

export const ETL_VS_ELT_VERTICAL_SLICE: DataEngineeringAuthoredSlice = {
  lessonId: "de-11-08",
  slug: "etl-vs-elt",
  titleUz: "ETL vs ELT: Ma’lumot quvuri ichida nima sodir bo‘ladi?",
  phaseId: "de-11",
  estimatedMinutes: {
    overview: 4,
    understand: 12,
    master: 25,
  },
  overview: {
    whatItIsUz:
      "Data pipeline manbadan (API, OLTP baza, loglar) kelayotgan xom yozuvlarni tahlil uchun yaroqli jadvalga aylantiradi. Asosiy arxitektura savoli: ma’lumotni maqsadli omborga yuklashdan OLDIN tozalaymizmi (ETL) yoki avval xom holatda staging jadvalga yuklab, keyin ombor ichida SQL/dbt bilan tozalaymizmi (ELT)?",
    whyItMattersUz:
      "Agar transformatsiya qoidasi o‘zgarsa yoki bitta yozuvda xato ('oops') bo‘lsa, ELT rejimida xom staging jadval saqlangani uchun manba API’ni qayta bezovta qilmasdan omborning o‘zida qayta hisoblash (re-transform) mumkin. ETL эса qat’iy regulyatsiya yoki omborga kirishdan oldin PII maskalash kerak bo‘lganda ustunlik qiladi.",
    realLifeAnalogyUz:
      "ETL — bu mevalarni dalaning o‘zida saralab va yuvib, omborga faqat qadoqlangan toza mevalarni kiritish. ELT — bu barcha terilgan hosilni avval omborning qabulxonasiga (raw staging) tushirib, saralash va yuvishni ombor ichidagi zamonaviy sexda bajarishdir.",
    comparisonRows: [
      {
        aspectUz: "Ketma-ketlik",
        etlUz: "Extract → Transform & Validate → Load (Clean)",
        eltUz: "Extract → Load (Raw Staging) → Transform & Validate → Clean Tables",
      },
      {
        aspectUz: "Xom ma’lumot omborda saqlanadimi?",
        etlUz: "Yo‘q, faqat tozalangan ma’lumot maqsadli jadvalga yoziladi",
        eltUz: "Ha, raw_orders_events staging jadvalida barcha xom yozuvlar saqlanadi",
      },
      {
        aspectUz: "Qachon qulay?",
        etlUz: "Maxfiy PII filtrlash, kichik maqsadli baza, tashqi Python/Spark worker",
        eltUz: "Zamonaviy DWH/Lakehouse (Postgres, BigQuery, Snowflake, DuckDB, dbt)",
      },
    ],
  },
  understand: {
    mechanismIntroUz:
      "5 ta sintetik buyurtma hodisasi (`e-001`..`e-005`) misolida har bir yozuvning taqdirini 20 ta mikro-qadamda kuzatamiz. `e-003` (`135.00`) eski `e-001` (`120.00`) buyurtmasini yangilaydi, `e-004` (`amountText='oops'`) esa yashirincha o‘chirilmasdan karantin jadvaliga (`reason='invalid_amount'`) tushadi.",
    schemaRulesUz: [
      "eventId: string — noyob hodisa identifikatori (takroriy eventId kelsa deduplikatsiya qilinadi).",
      "orderId: int — buyurtma identifikatori (bir buyurtma bir necha marta yangilanishi mumkin).",
      "amountText → amount: Decimal (> 0) — pul miqdori ikkilik float emas, aniq o‘nli tiyinlarda hisoblanadi.",
      "updatedAt: ISO-8601 UTC — bitta orderId uchun eng so‘nggi updatedAt g‘olib bo‘ladi (Last-Write-Wins).",
    ],
  },
  master: {
    dataContractRulesUz: [
      "eventId bo‘sh bo‘lmasligi va takror kelganda idempotent ravishda o‘tkazib yuborilishi shart.",
      "amount musbat Decimal (> 0.00) bo‘lishi shart; 'oops' yoki <= 0 qiymatlar quarantine jadvaliga reason bilan yoziladi.",
      "orderId bo‘yicha ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC, event_id DESC) = 1 qoidasi bilan upsert qilinadi.",
    ],
    quarantineVsSilentDropUz:
      "Agar `e-004` (`amountText='oops'`) ni shunchaki `WHERE amount > 0` bilan hech qayerga yozmasdan tashlab yuborsak (silent drop), moliya bo‘limi buyurtma #103 nega hisobotdan yo‘qolib qolganini hech qachon topa olmaydi. Shu sababli production quvurlar yaroqsiz qatorlarni `quarantine_orders` jadvaliga xato sababi (`reason='invalid_amount'`) bilan yozadi.",
    idempotencyProofUz:
      "Idempotentlik sharti: f(batch) = f(batch + batch). 5 ta hodisali batchni 1 marta ishga tushirsak ham, 2 marta qayta (replay) yuborsak ham yakuniy toza jadvalda aniq 3 ta buyurtma (`101 -> 135.00`, `102 -> 80.00`, `104 -> 20.00`) va jami tushum `235.00` bo‘lib qoladi.",
    manimScriptPath: "examples/manim/etl_elt_pipeline.py",
    manimVideoUrl: "/animations/etl_elt_pipeline.mp4",
    pythonEnginePath: "examples/python/etl_elt_engine.py",
  },
  detourPrerequisites: [
    {
      lessonId: "de-01-15",
      titleUz: "Data pipeline nima?",
      whyNeededUz: "Manbadan maqsadli jadvalgacha bo‘lgan oqim bosqichlarini tushunish uchun.",
    },
    {
      lessonId: "de-02-06",
      titleUz: "JSON faylni o‘qish va yozish",
      whyNeededUz: "Manbadan keladigan xom JSON hodisalarini parse qilish uchun.",
    },
    {
      lessonId: "de-03-01",
      titleUz: "Relational jadval: row va column",
      whyNeededUz: "Staging, Quarantine va Clean Target jadvallari tuzilishini bilish uchun.",
    },
    {
      lessonId: "de-11-01",
      titleUz: "Data ingestion nima?",
      whyNeededUz: "Extract va Load bosqichlarining vazifasini ajratib olish uchun.",
    },
  ],
  checkpoints: [
    {
      id: "cp-de-11-08-1",
      depth: "overview",
      questionUz: "Xom yozuvlar avval ombordagi staging jadvalga yuklanib, so‘ng SQL/dbt orqali tozalansa, bu qaysi yondashuv?",
      optionsUz: [
        "ELT (Extract → Load Raw Staging → Transform)",
        "ETL (Extract → Transform → Load)",
        "Faqat CDC (Change Data Capture)",
        "Silent Drop Pipeline",
      ],
      correctIndex: 0,
      explanationUz:
        "ELT yondashuvida xom ma’lumotlar avval omborning staging qatlamiga yuklanadi (Load), so‘ngra ombor ichida transformatsiya (Transform) bajariladi.",
    },
    {
      id: "cp-de-11-08-2",
      depth: "understand",
      questionUz: "Sintetik misolda `e-004` (`orderId=103`, `amountText='oops'`) yozuvi bilan nima sodir bo‘ladi?",
      optionsUz: [
        "Quarantine jadvaliga `reason='invalid_amount'` bilan yoziladi va clean jadvalga kirmaydi",
        "`0.00` qiymat bilan clean jadvalga qo‘shiladi",
        "Izsiz (silent drop) o‘chirib yuboriladi",
        "Butun pipeline abadiy to‘xtab qoladi va barcha buyurtmalar o‘chiriladi",
      ],
      correctIndex: 0,
      explanationUz:
        "Data engineeringda yaroqsiz qatorlar yashirincha o‘chirilmaydi (no silent drop): `e-004` karantin jadvaliga `invalid_amount` sababi bilan tushadi.",
    },
    {
      id: "cp-de-11-08-3",
      depth: "understand",
      questionUz: "`orderId=101` uchun `e-001` (`120.00`, `09:00Z`) va `e-003` (`135.00`, `10:00Z`) kelganda yakuniy jami tushum qancha bo‘ladi?",
      optionsUz: [
        "235.00 (135.00 + 80.00 + 20.00)",
        "355.00 (120.00 + 135.00 + 80.00 + 20.00)",
        "220.00 (120.00 + 80.00 + 20.00)",
        "240.00",
      ],
      correctIndex: 0,
      explanationUz:
        "Order 101 uchun `10:00Z > 09:00Z` bo‘lgani sababli `135.00` g‘olib chiqadi. `135.00 + 80.00 + 20.00 = 235.00`.",
    },
    {
      id: "cp-de-11-08-4",
      depth: "master",
      questionUz: "Agar ayni 5 ta hodisali batch xatolik tufayli 2 marta ketma-ket yuborilsa (replay), idempotent pipelineda yakuniy buyurtmalar soni va jami tushum qanday bo‘ladi?",
      optionsUz: [
        "3 ta buyurtma va 235.00 jami tushum (o‘zgarmaydi)",
        "6 ta buyurtma va 470.00 jami tushum",
        "10 ta buyurtma va 470.00 jami tushum",
        "0 ta buyurtma",
      ],
      correctIndex: 0,
      explanationUz:
        "Idempotent pipeline `eventId` deduplikatsiyasi va `orderId` upsert qoidasi tufayli batch qayta yuborilganda ham natijani o‘zgartirmaydi (`3` ta buyurtma, `235.00`).",
    },
  ],
};

/**
 * Classifies how each Data Engineering phase (`de-01`..`de-20`) relates to the
 * 5 platform tracks (`data-engineer`, `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`).
 */
export function getDataEngineeringPhaseRoleForTrack(
  phaseId: string,
  trackId: DataEngineeringTrackId
): {
  role: DataEngineeringTrackRole;
  recommendedDepth: LearningDepth;
  labelUz: string;
} {
  if (trackId === "data-engineer") {
    return {
      role: "core",
      recommendedDepth: "master",
      labelUz: "Core (Master)",
    };
  }

  const aiSupporting = new Set(["de-01", "de-07", "de-11", "de-12", "de-14", "de-17", "de-18", "de-19"]);
  if (trackId === "ai-engineer") {
    if (phaseId === "de-20") {
      return {
        role: "advanced",
        recommendedDepth: "master",
        labelUz: "Advanced AI Data (Master)",
      };
    }
    if (aiSupporting.has(phaseId)) {
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

  const mlSupporting = new Set(["de-02", "de-03", "de-07", "de-10", "de-13", "de-17", "de-18", "de-19", "de-20"]);
  if (trackId === "ml-engineer") {
    if (mlSupporting.has(phaseId)) {
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

  const dsSupporting = new Set(["de-03", "de-04", "de-08", "de-09", "de-16", "de-18"]);
  if (trackId === "data-scientist") {
    if (dsSupporting.has(phaseId)) {
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

  // python-developer
  const pySupporting = new Set(["de-02", "de-11", "de-17", "de-19"]);
  if (pySupporting.has(phaseId)) {
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

export function getDataEngineeringSummaryStats() {
  const totalPhases = DATA_ENGINEERING_PHASES.length;
  const totalLessons = DATA_ENGINEERING_LESSONS.length;
  const publishedLessons = DATA_ENGINEERING_LESSONS.filter(
    (l) => l.status === "published"
  ).length;
  const plannedLessons = totalLessons - publishedLessons;
  const reuseCandidateCount = DATA_ENGINEERING_LESSONS.filter(
    (l) => l.reuseCandidate !== null
  ).length;
  const resourceCount = DATA_ENGINEERING_RESOURCES.length;

  return {
    totalPhases,
    totalLessons,
    publishedLessons,
    plannedLessons,
    reuseCandidateCount,
    resourceCount,
  };
}
