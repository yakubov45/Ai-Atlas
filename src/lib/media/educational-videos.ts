/**
 * Video CMS Architecture & Educational Media Registry
 * Conforms to homepage.md Section 11 specifications.
 * Uses verified self-hosted MP4 assets in public/animations/.
 */

export interface EducationalVideo {
  id: string;
  title: string;
  description: string;
  sourceType: "youtube" | "self-hosted";
  sourceUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  lessonId?: string;
  trackId: "python-dev" | "ai-engineer" | "ml-engineer" | "data-scientist";
  trackTitle: string;
  captionsUrl?: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  tags: string[];
}

export const EDUCATIONAL_VIDEOS: readonly EducationalVideo[] = [
  {
    id: "vid-neural-network",
    title: "Neyron Tarmoqlari: Forward Pass va Aktivatsiya",
    description:
      "Ko'p qatlamli perseptron (MLP), og'irliklar (weights), siljish (bias) va chiziqli bo'lmagan aktivatsiya funksiyalarining ishlash mexanizmi.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/neural-network/neural_network.mp4",
    durationSeconds: 42,
    lessonId: "neural-networks",
    trackId: "ml-engineer",
    trackTitle: "Machine Learning Engineering",
    published: true,
    featured: true,
    sortOrder: 1,
    tags: ["Deep Learning", "Weights", "Activation", "Forward Pass"],
  },
  {
    id: "vid-gradient-descent",
    title: "Gradient Descent va Matematik Optimizatsiya",
    description:
      "Yo'qotish funksiyasi (Loss surface) bo'ylab qiyalik (gradient) hisoblash va o'rganish tezligi (learning rate) yordamida minimumga tushish.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/gradient-descent/gradient_descent.mp4",
    durationSeconds: 38,
    lessonId: "gradient-descent",
    trackId: "ml-engineer",
    trackTitle: "Machine Learning Engineering",
    published: true,
    featured: false,
    sortOrder: 2,
    tags: ["Optimization", "Gradient", "Loss Function", "Learning Rate"],
  },
  {
    id: "vid-cosine-similarity",
    title: "Vektorlar va Cosine Similarity Geometriyasi",
    description:
      "Ko'p o'lchovli fazoda semantik o'xshashlikni skalyar ko'paytma va vektorlar burchagi orqali o'lchash — RAG va qidiruv asosi.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/vectors/cosine_similarity.mp4",
    durationSeconds: 30,
    lessonId: "cosine-similarity",
    trackId: "ai-engineer",
    trackTitle: "AI Engineering",
    published: true,
    featured: false,
    sortOrder: 3,
    tags: ["Vector Space", "Cosine Similarity", "Embeddings", "RAG"],
  },
  {
    id: "vid-self-attention",
    title: "Self-Attention va Transformer Diqqat Mexanizmi",
    description:
      "Query, Key va Value matritsalari yordamida har bir tokenning kontekstdagi boshqa so'zlarga e'tiborini hisoblash matematikasi.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/attention/self_attention.mp4",
    durationSeconds: 45,
    lessonId: "transformer-attention",
    trackId: "ai-engineer",
    trackTitle: "AI Engineering",
    published: true,
    featured: false,
    sortOrder: 4,
    tags: ["Transformer", "Self-Attention", "LLM", "QKV Matrices"],
  },
  {
    id: "vid-factorial-stack",
    title: "Call Stack va Rekursiya Semantikasi",
    description:
      "Python interpretatorida funksiya chaqiruvlari Call Stack xotirasiga qanday yuklanadi va bazaviy holatda qanday qaytadi.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/factorial_call_stack.mp4",
    durationSeconds: 28,
    lessonId: "recursion-callstack",
    trackId: "python-dev",
    trackTitle: "Python Programming",
    published: true,
    featured: false,
    sortOrder: 5,
    tags: ["Recursion", "Call Stack", "Python Memory", "Algorithms"],
  },
  {
    id: "vid-function-explorer",
    title: "Python Funksiyalari va Dinamik Matematik Graflar",
    description:
      "Chiziqli, kvadratik va nochiziqli funksiyalarning koordinata sistemasidagi xatti-harakati va Python'da ifodalanishi.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/functions/function_explorer.mp4",
    durationSeconds: 35,
    lessonId: "python-functions",
    trackId: "python-dev",
    trackTitle: "Python Programming",
    published: true,
    featured: false,
    sortOrder: 6,
    tags: ["Functions", "Graphing", "Python", "Math"],
  },
  {
    id: "vid-ab-experiment",
    title: "A/B Test, P-Value va Statistik Gipoteza",
    description:
      "Boshqaruv (Control) va tajriba (Treatment) guruhlarini solishtirish, p-value hisoblash va gipotezani tekshirish usuli.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/ab_experiment.mp4",
    durationSeconds: 32,
    lessonId: "ab-testing",
    trackId: "data-scientist",
    trackTitle: "Data Science",
    published: true,
    featured: false,
    sortOrder: 7,
    tags: ["A/B Testing", "Statistics", "P-Value", "Hypothesis"],
  },
  {
    id: "vid-etl-elt",
    title: "ETL vs ELT: Ma'lumot Quvurlari va Lakehouse",
    description:
      "Katta hajmdagi ma'lumotlarni Extract, Transform, Load qilish zanjiri va zamonaviy Data Warehouse arxitekturasi.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/etl_elt_pipeline.mp4",
    durationSeconds: 40,
    lessonId: "etl-elt-pipelines",
    trackId: "data-scientist",
    trackTitle: "Data Science",
    published: true,
    featured: false,
    sortOrder: 8,
    tags: ["Data Pipelines", "ETL", "ELT", "Data Engineering"],
  },
  {
    id: "vid-sampling-explained",
    title: "LLM Logit Sampling va Temperature Boshqaruvi",
    description:
      "Til modellarida Softmax taqsimoti, Temperature, Top-K va Top-P sampling orqali generatsiyani deterministik yoki ijodiy qilish.",
    sourceType: "self-hosted",
    sourceUrl: "/animations/sampling_explained.mp4",
    durationSeconds: 34,
    lessonId: "prompt-sampling",
    trackId: "ai-engineer",
    trackTitle: "AI Engineering",
    published: true,
    featured: false,
    sortOrder: 9,
    tags: ["Prompt Engineering", "Temperature", "Sampling", "Logits"],
  },
];

export function getFeaturedVideo(): EducationalVideo {
  const found = EDUCATIONAL_VIDEOS.find((v) => v.featured && v.published);
  return found ?? EDUCATIONAL_VIDEOS[0]!;
}

export function getVideosByTrack(
  trackId?: string
): readonly EducationalVideo[] {
  if (!trackId || trackId === "all") {
    return EDUCATIONAL_VIDEOS.filter((v) => v.published);
  }
  return EDUCATIONAL_VIDEOS.filter(
    (v) => v.published && v.trackId === trackId
  );
}

export * from "./youtube-videos-data";
