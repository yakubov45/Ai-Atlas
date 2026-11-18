/**
 * Personalized Specialization Paths & Topic Role Classification Engine.
 *
 * Implements the learning model from `reja.md`:
 * 1. Student chooses a specialization (ML Engineer, LLM Engineer, AI Agent Engineer, Deep Learning, Production MLOps).
 * 2. Topics are classified per specialization into:
 *    - `core`: Deep Learning Path (recommended depth: `master` or `understand`)
 *    - `supporting`: Important foundation/context (recommended depth: `understand`)
 *    - `optional`: Overview path for adjacent domains (recommended depth: `overview`)
 *    - `advanced`: Deep research / production mastery (recommended depth: `master`)
 */

export type LearningDepth = "overview" | "understand" | "master";

export type TopicRole = "core" | "supporting" | "optional" | "advanced";

export type SpecializationId =
  | "llm-engineer"
  | "ml-engineer"
  | "agent-engineer"
  | "deep-learning"
  | "mlops-engineer"
  | "data-engineer"
  | "prompt-engineer";

export interface OnboardingProfile {
  currentLevel: "beginner" | "intermediate" | "advanced";
  pythonComfort: "none" | "basic" | "comfortable";
  mathComfort: "overview" | "formulas" | "derivations";
  preferredStyle: "visual" | "code" | "math" | "balanced";
  completedOnboardingAt?: string;
}

export interface SpecializationPath {
  id: SpecializationId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  targetOutcome: string;
  icon: "sparkles" | "cpu" | "bot" | "layers" | "server";
  color: "violet" | "cyan" | "emerald" | "amber" | "rose";
  coreSlugs: readonly string[];
  supportingSlugs: readonly string[];
  advancedSlugs: readonly string[];
}

export const DEPTH_META: Record<
  LearningDepth,
  {
    levelNumber: 1 | 2 | 3;
    title: string;
    uzLabel: string;
    badge: string;
    summary: string;
    estimatedMinutes: string;
  }
> = {
  overview: {
    levelNumber: 1,
    title: "Level 1 — Overview",
    uzLabel: "Umumiy tushuncha",
    badge: "Overview",
    summary:
      "Mavzu nima? Nega kerak? Qayerda ishlatiladi? Oddiy analogiya va bitta vizual misol. Boshqa yo‘nalishlarni yuzaki o‘rganish uchun.",
    estimatedMinutes: "3–5 daqiqa",
  },
  understand: {
    levelNumber: 2,
    title: "Level 2 — Understand",
    uzLabel: "Mexanizm va Vizual",
    badge: "Understand",
    summary:
      "Qanday ishlaydi? Bosqichma-bosqich mexanizm, parametrlar, formulalar, interaktiv mini-laboratoriya va Manim animatsiyalari.",
    estimatedMinutes: "10–15 daqiqa",
  },
  master: {
    levelNumber: 3,
    title: "Level 3 — Master",
    uzLabel: "Matematika va Kod",
    badge: "Master",
    summary:
      "Matematik asoslar, NumPy/PyTorch hisoblashlari, haqiqiy arxitektura, tajribalar, amaliy loyiha va chuqur testlar.",
    estimatedMinutes: "20–30 daqiqa",
  },
};

export const SPECIALIZATION_PATHS: readonly SpecializationPath[] = [
  {
    id: "llm-engineer",
    title: "LLM Engineer",
    shortTitle: "LLM Engineer",
    subtitle: "Transformers, Self-Attention, Tokenization, Embeddings, RAG va Prompt Engineering",
    description:
      "Katta til modellarining ichki arxitekturasi (Query/Key/Value, Multi-Head Attention), tokenizatsiya, vektor embeddinglar va RAG tizimlarini chuqur o‘rganish yo‘nalishi.",
    targetOutcome:
      "Transformer va zamonaviy LLM arxitekturalarini noldan tushunish, NumPy/PyTorch da Attention yozish hamda RAG quvurlarini loyihalash.",
    icon: "sparkles",
    color: "violet",
    coreSlugs: [
      "transformers",
      "llm",
      "tokenization",
      "embeddings",
      "prompt-engineering",
      "rag",
      "memory",
      "matrix-operations",
      "probability",
    ],
    supportingSlugs: [
      "artificial-intelligence",
      "deep-learning",
      "rnn",
      "lstm",
      "vector",
      "matrix",
      "tensor",
      "standard-deviation",
      "loss-functions",
      "adam",
    ],
    advancedSlugs: [
      "ai-agent",
      "tools",
      "backpropagation",
      "batch-normalization",
      "production-ml-pipeline",
    ],
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    shortTitle: "ML Engineer",
    subtitle: "Matematik poydevor, Gradient Descent, Loss funksiyalar va Optimizatorlar",
    description:
      "Chiziqli algebra, hosila va gradientlar, ehtimollar nazariyasi, yo‘qotish funksiyalari hamda klassik va zamonaviy ML optimallashtirish usullari.",
    targetOutcome:
      "Mashinali o‘rganish algoritmlarining matematik negizini, gradient tushish dinamikasini va modelni o‘qitish jarayonini to‘liq o‘zlashtirish.",
    icon: "cpu",
    color: "cyan",
    coreSlugs: [
      "machine-learning",
      "math-for-deep-learning",
      "vector",
      "matrix",
      "matrix-operations",
      "hosila",
      "partial-derivative",
      "gradient",
      "probability",
      "mean",
      "standard-deviation",
      "loss-functions",
      "gradient-descent",
      "learning-rate",
    ],
    supportingSlugs: [
      "artificial-intelligence",
      "deep-learning",
      "chain-rule",
      "optimizers",
      "sgd",
      "adam",
      "tensor",
    ],
    advancedSlugs: [
      "backpropagation",
      "batch-normalization",
      "production-ready-ml-structure",
      "production-ml-pipeline",
    ],
  },
  {
    id: "agent-engineer",
    title: "AI Agent Engineer",
    shortTitle: "AI Agent Engineer",
    subtitle: "Avtonom AI Agentlar, ReAct sikli, Tools, Memory, RAG va LLM integratsiyasi",
    description:
      "LLM’larni shunchaki suhbatdosh emas, balki tashqi vositalar (Tools/API) bilan ishlay oladigan, xotiraga (Memory) ega va ReAct asosida fikrlaydigan avtonom tizimlarga aylantirish.",
    targetOutcome:
      "Thought → Action → Observation sikli, Function Calling, qisqa/uzoq muddatli xotira va RAG asosida avtonom agentlar yaratish.",
    icon: "bot",
    color: "emerald",
    coreSlugs: [
      "ai-agent",
      "tools",
      "memory",
      "rag",
      "prompt-engineering",
      "llm",
      "embeddings",
      "tokenization",
    ],
    supportingSlugs: [
      "artificial-intelligence",
      "transformers",
      "vector",
      "probability",
      "production-ready-ml-structure",
    ],
    advancedSlugs: [
      "production-ml-pipeline",
      "deep-learning",
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning Researcher",
    shortTitle: "Deep Learning",
    subtitle: "Neyron tarmoqlar, Backpropagation, Chain Rule, CNN, RNN, LSTM va Transformers",
    description:
      "Ko‘p qatlamli neyron tarmoqlarda to‘g‘ri va teskari tarqalish (Backpropagation), konvolyutsion (CNN), rekurrent (RNN/LSTM) va Transformer arxitekturalari.",
    targetOutcome:
      "Chuqur o‘rganish arxitekturalarining matematik formulalari, gradient oqimi va PyTorch tatbiqini chuqur egallash.",
    icon: "layers",
    color: "amber",
    coreSlugs: [
      "deep-learning",
      "backpropagation",
      "chain-rule",
      "gradient-descent",
      "learning-rate",
      "loss-functions",
      "optimizers",
      "sgd",
      "adam",
      "batch-normalization",
      "cnn",
      "rnn",
      "lstm",
      "transformers",
    ],
    supportingSlugs: [
      "math-for-deep-learning",
      "vector",
      "matrix",
      "matrix-operations",
      "tensor",
      "hosila",
      "partial-derivative",
      "gradient",
      "probability",
      "mean",
      "standard-deviation",
    ],
    advancedSlugs: [
      "llm",
      "embeddings",
      "tokenization",
    ],
  },
  {
    id: "mlops-engineer",
    title: "Production ML & MLOps",
    shortTitle: "Production ML",
    subtitle: "Production-Ready loyiha tuzilmasi, MLOps quvurlari, Monitoring va Arxitektura",
    description:
      "Tajriba (Jupyter Notebook) dan real sanoat darajasidagi modulli ML/AI tizimlariga o‘tish: ma’lumotlar quvuri, model reestri, CI/CD/CT va drift monitoringi.",
    targetOutcome:
      "Ishlab chiqarishga tayyor (Production-Ready) ML va LLM xizmatlarini loyihalash, testlash va monitoring qilish.",
    icon: "server",
    color: "rose",
    coreSlugs: [
      "production-ready-ml-structure",
      "production-ml-pipeline",
      "atomic-note",
      "useful-youtube-resources",
      "machine-learning",
      "deep-learning",
    ],
    supportingSlugs: [
      "llm",
      "rag",
      "ai-agent",
      "tools",
      "memory",
      "optimizers",
      "loss-functions",
    ],
    advancedSlugs: [
      "transformers",
      "batch-normalization",
    ],
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    shortTitle: "Data Engineer",
    subtitle: "ETL vs ELT, Data Warehousing, Lakehouse (Iceberg), Kafka, Spark, dbt, Airflow va AI Data Pipelines",
    description:
      "Xom ma’lumot manbalaridan (API, OLTP, CDC, Kafka) boshlab Data Warehouse, Lakehouse, dbt transformatsiyalari, Data Quality (Quarantine) va RAG vektor quvurlarigacha bo‘lgan 20 bosqichli muhandislik yo‘nalishi.",
    targetOutcome:
      "Idempotent ETL/ELT quvurlarini, SCD Type 2 tarix jadvallarini, Kafka/Spark oqimlarini va AI/RAG ma’lumot infratuzilmasini loyihalash.",
    icon: "server",
    color: "cyan",
    coreSlugs: [
      "production-ml-pipeline",
      "production-ready-ml-structure",
      "rag",
      "embeddings",
      "vector",
      "matrix",
    ],
    supportingSlugs: [
      "artificial-intelligence",
      "machine-learning",
      "llm",
      "tokenization",
      "memory",
      "probability",
    ],
    advancedSlugs: [
      "transformers",
      "ai-agent",
      "tools",
    ],
  },
  {
    id: "prompt-engineer",
    title: "Prompt Engineering Specialist",
    shortTitle: "Prompt Engineer",
    subtitle: "Prompt anatomiyasi, Temperature/Top-K/Top-P Sampling, Few-Shot, CoT/ToT, ReAct, Red Teaming va Calibration",
    description:
      "Til modellariga aniq ko‘rsatma berish, sampling parametrlarini (Temperature, Top-K, Top-P) matematik tushunish, Structured Output, Prompt Injection himoyasi va eval/kalibrovka tizimlarini qurish yo‘nalishi.",
    targetOutcome:
      "Ishonchli, manbaga asoslangan, JSON-validatsiyadan o‘tgan va Red-Team hamda regressiya testlari bilan tekshirilgan production prompt xizmatlarini loyihalash.",
    icon: "sparkles",
    color: "violet",
    coreSlugs: [
      "prompt-engineering",
      "llm",
      "tokenization",
      "transformers",
      "rag",
      "ai-agent",
      "tools",
      "memory",
    ],
    supportingSlugs: [
      "artificial-intelligence",
      "embeddings",
      "probability",
      "vector",
    ],
    advancedSlugs: [
      "production-ready-ml-structure",
      "production-ml-pipeline",
    ],
  },
];

export function getSpecializationPath(id: string | null | undefined): SpecializationPath {
  return (
    SPECIALIZATION_PATHS.find((p) => p.id === id) ?? SPECIALIZATION_PATHS[0]!
  );
}

/**
 * Determines how a lesson relates to a chosen specialization track.
 */
export function getLessonRoleInPath(
  lessonSlug: string,
  pathId: SpecializationId | null | undefined,
): {
  role: TopicRole;
  recommendedDepth: LearningDepth;
  roleLabelUz: string;
} {
  if (!pathId) {
    return {
      role: "core",
      recommendedDepth: "understand",
      roleLabelUz: "Standart O‘quv Yo‘li",
    };
  }
  const path = getSpecializationPath(pathId);
  if (path.coreSlugs.includes(lessonSlug)) {
    return {
      role: "core",
      recommendedDepth: "master",
      roleLabelUz: "Deep Learning Path (Asosiy)",
    };
  }
  if (path.advancedSlugs.includes(lessonSlug)) {
    return {
      role: "advanced",
      recommendedDepth: "master",
      roleLabelUz: "Chuqur Mutaxassislik (Master)",
    };
  }
  if (path.supportingSlugs.includes(lessonSlug)) {
    return {
      role: "supporting",
      recommendedDepth: "understand",
      roleLabelUz: "Tayanch Mavzu (Understand)",
    };
  }
  return {
    role: "optional",
    recommendedDepth: "overview",
    roleLabelUz: "Overview (Umumiy tanishuv)",
  };
}
