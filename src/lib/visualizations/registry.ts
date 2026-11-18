import type { VisualizationType } from "@/lib/content/schema";

/**
 * Visualization module registry (metadata only — safe for server & client).
 *
 * `implemented`: fully working, usable from content today.
 * `partial`:     a working subset exists; remaining capabilities are listed as planned.
 * `planned`:     interface reserved; NOT implemented in Phase 1.
 *
 * Component loaders live in `src/components/visualizations/loaders.tsx` so this
 * file never pulls heavy client code into server bundles.
 */

export type VisualizationModuleStatus = "implemented" | "partial" | "planned";

export interface VisualizationCapability {
  label: string;
  done: boolean;
}

export interface VisualizationModuleMeta {
  type: VisualizationType;
  title: string;
  /** Describes what the MODULE does (UI capability), not educational content. */
  summary: string;
  status: VisualizationModuleStatus;
  capabilities: VisualizationCapability[];
  icon: "workflow" | "line-chart" | "trending-down" | "network" | "boxes" | "grid" | "scatter" | "database";
}

export const VISUALIZATION_MODULES: Record<VisualizationType, VisualizationModuleMeta> = {
  "flow-diagram": {
    type: "flow-diagram",
    title: "Oqim diagrammasi",
    summary: "Tugun va bog‘lanishlardan iborat qayta ishlatiladigan diagramma: tanlash, yo‘lni yoritish, bosqichma-bosqich oqim animatsiyasi.",
    status: "implemented",
    icon: "workflow",
    capabilities: [
      { label: "Ma’lumotga asoslangan tugunlar va bog‘lanishlar", done: true },
      { label: "Avtomatik qatlamli joylashuv yoki qo‘lda koordinatalar", done: true },
      { label: "Tugunni tanlash va bog‘liq yo‘lni yoritish", done: true },
      { label: "Bosqichma-bosqich oqim (play / pause / step / reset)", done: true },
      { label: "Zoom, pan va klaviatura boshqaruvi", done: true },
    ],
  },
  "function-plot": {
    type: "function-plot",
    title: "Interaktiv funksiya grafigi",
    summary: "Xavfsiz ifoda tahlilchisi asosidagi matematik grafik: parametr slayderlari, kursor bilan qiymatlarni ko‘rish, bir nechta egri chiziq.",
    status: "implemented",
    icon: "line-chart",
    capabilities: [
      { label: "Matnli ifodalar (eval ishlatilmaydi)", done: true },
      { label: "Parametr slayderlari va reset", done: true },
      { label: "Kursor / klaviatura orqali qiymatni o‘qish", done: true },
      { label: "Uzilishlarni to‘g‘ri chizish", done: true },
      { label: "Bir nechta ifoda va legenda", done: true },
    ],
  },
  "gradient-descent": {
    type: "gradient-descent",
    title: "Gradient tushish",
    summary: "Funksiya grafigi ustida 1D gradient tushish: o‘rganish tezligi, iteratsiyalar, start / pauza / qadam / reset hamda Manim animatsiyasi.",
    status: "implemented",
    icon: "trending-down",
    capabilities: [
      { label: "1D yo‘qotish funksiyasi va animatsiyali qadamlar", done: true },
      { label: "O‘rganish tezligi va boshlang‘ich nuqta boshqaruvi", done: true },
      { label: "Yaqinlashish / uzoqlashish holatini aniqlash", done: true },
      { label: "Overshooting va tarqalish chegaralarini ko‘rsatish", done: true },
      { label: "Manim CE matematik animatsiyasi bilan integratsiya", done: true },
    ],
  },
  "neural-network": {
    type: "neural-network",
    title: "Neyron tarmoq tadqiqotchisi",
    summary: "Ko‘p qatlamli neyron tarmoqda to‘g‘ri tarqalish (Forward Pass): kirish signallari, vaznlar, siljishlar, nochiziqli aktivatsiyalar va qadamma-qadam tahlil.",
    status: "implemented",
    icon: "network",
    capabilities: [
      { label: "2-qatlamli MLP arxitekturasi va real hisob-kitoblar", done: true },
      { label: "Vazn va siljishlarni (biases) interaktiv sozlash", done: true },
      { label: "Aktivatsiya funksiyalari (ReLU, Sigmoid, Tanh, Linear)", done: true },
      { label: "Qadamma-qadam to‘g‘ri tarqalish walkthrough", done: true },
      { label: "Neyronlar va bog‘lanishlarni alohida tekshirish (inspect)", done: true },
    ],
  },
  transformer: {
    type: "transformer",
    title: "Transformer arxitekturasi",
    summary: "Rejalashtirilgan: sozlanadigan bloklar, ma’lumot oqimi strelkalari, bosiladigan komponentlar (tushuntirishlar dars metadatasidan).",
    status: "planned",
    icon: "boxes",
    capabilities: [
      { label: "Sozlanadigan arxitektura bloklari", done: false },
      { label: "Komponent tushuntirishlari metadatadan", done: false },
    ],
  },
  "attention-matrix": {
    type: "attention-matrix",
    title: "Self-Attention & Q/K/V Mini-Laboratoriya",
    summary: "Scaled Dot-Product Attention mexanizmi: 1D Q/K/V interaktiv mini-laboratoriya, ko‘p tokenli issiqlik xaritasi, √dₖ masshtablash, Causal Masking va Manim animatsiyasi.",
    status: "implemented",
    icon: "grid",
    capabilities: [
      { label: "1D Q/K/V interaktiv mini-laboratoriya (Query slayderi va Softmax %)", done: true },
      { label: "Ko‘p tokenli Self-Attention issiqlik xaritasi (Heatmap)", done: true },
      { label: "√dₖ masshtablash va Causal Masking (Encoder/Decoder) tajribasi", done: true },
      { label: "Jonli NumPy kodi va Manim CE matematik animatsiyasi", done: true },
    ],
  },
  "embedding-space": {
    type: "embedding-space",
    title: "2D Vektor, Dot Product va Cosine Similarity (Phase 12)",
    summary: "2D koordinata tekisligida A va B vektorlari, skalyar ko‘paytma, vektor uzunligi (norm), burchak kosinusi, nol vektor cheklovi va Manim animatsiyasi.",
    status: "implemented",
    icon: "scatter",
    capabilities: [
      { label: "2D vektor slayderlari va burchak (θ) hisobi", done: true },
      { label: "Dot product, L2 Norm va Cosine Similarity", done: true },
      { label: "Nol vektor (0,0) xatoligini aniq ko‘rsatish", done: true },
      { label: "Python kodi va Manim CE matematik animatsiyasi", done: true },
    ],
  },
  "rag-pipeline": {
    type: "rag-pipeline",
    title: "RAG Quvuri: Chunking, Retrieval, Citation & Hit@k (Phase 14–16)",
    summary: "Hujjatlarni chunk size va overlap bilan bo‘laklash, Cosine Similarity bo‘yicha Top-k qidirish, Grounded Citation, No-Answer siyosati hamda Hit@k / MRR baholash.",
    status: "implemented",
    icon: "database",
    capabilities: [
      { label: "Interaktiv Chunk size va Chunk overlap sozlamalari", done: true },
      { label: "Haqiqiy Cosine Similarity qidiruvi va Top-k", done: true },
      { label: "Manba havolasi [chunkId] va No-Answer chegarasi", done: true },
      { label: "Phase 16 Hit@k va MRR metrikalarini jonli hisoblash", done: true },
    ],
  },
};

export function getVisualizationModule(type: VisualizationType): VisualizationModuleMeta {
  return VISUALIZATION_MODULES[type];
}

export function isRenderableType(type: VisualizationType): boolean {
  return VISUALIZATION_MODULES[type].status !== "planned";
}

export function listVisualizationModules(): VisualizationModuleMeta[] {
  const rank: Record<VisualizationModuleStatus, number> = { implemented: 0, partial: 1, planned: 2 };
  return Object.values(VISUALIZATION_MODULES).sort((a, b) => rank[a.status] - rank[b.status]);
}
