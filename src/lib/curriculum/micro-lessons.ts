/**
 * Micro-Lesson & 3-Depth Decomposition Engine for all 39 AI Atlas Lessons.
 *
 * Every lesson in `src/content/lessons/*.mdx` has canonical research sections:
 *   1. Qisqacha ta'rif & 2. Nima uchun kerak? & 3. Intuitiv tushuntirish (Level 1 — Beginner)
 *   4. Qanday ishlaydi? (Level 2 — Intermediate)
 *   5. Matematik asoslari (Level 3 — Advanced)
 *   6. Python / PyTorch Amaliy Misoli
 *   7. Bog'liq tushunchalar & 8. Tekshirilgan manbalar
 *
 * This module decomposes any lesson into:
 * - 4 Pedagogical Pillars + 1 Checkpoint (`Intuitsiya`, `Vizual`, `Matematika`, `Amaliyot`, `Tekshiruv`)
 * - 3 Learning Depth Levels (`Level 1 — Overview`, `Level 2 — Understand`, `Level 3 — Master`)
 * - Interactive Mini-Lab assignment (`self-attention-explorer`, `gradient-descent-1d`, `function-explorer`, `neural-network-explorer`)
 * - Adaptive Help ("Bu qismni tushunmadim / Soddaroq tushuntir")
 */

import type { MicroCheckpoint } from "./transformer-path";

export type MicroStepId = "intuition" | "visual" | "math" | "practice" | "checkpoint";

export interface LessonMicroStructure {
  slug: string;
  title: string;
  interactiveLabId:
    | "self-attention-explorer"
    | "cosine-similarity-explorer"
    | "rag-sandbox-explorer"
    | "gradient-descent-1d"
    | "function-explorer"
    | "neural-network-explorer"
    | "python-basics-lab"
    | "python-functions-lab";
  sections: {
    intuitionMdx: string;
    visualMdx: string;
    mathMdx: string;
    practiceMdx: string;
    summaryMdx: string;
  };
  adaptiveHelp: {
    analogy: string;
    stepByStep: string;
    keyTakeaway: string;
  };
  checkpoint: MicroCheckpoint;
}

/**
 * Selects the best interactive simulator for a given lesson slug/category.
 */
export function getRecommendedLabForLesson(
  slug: string,
  category: string,
): LessonMicroStructure["interactiveLabId"] {
  // 1. Python Foundation Lessons (Strictly guarded against AI graphs and math derivatives)
  if (
    category === "python" ||
    slug === "python-basics" ||
    slug.includes("python") ||
    slug.startsWith("py-")
  ) {
    if (
      slug === "functions" ||
      slug.includes("factorial") ||
      slug.includes("recursion") ||
      slug.includes("call-stack") ||
      slug.includes("py-06")
    ) {
      return "python-functions-lab";
    }
    return "python-basics-lab";
  }

  // 2. Vector & Cosine Similarity
  if (
    slug.includes("embedding") ||
    slug.includes("vector") ||
    slug.includes("cosine")
  ) {
    return "cosine-similarity-explorer";
  }
  if (
    slug.includes("rag") ||
    slug.includes("chunking") ||
    slug.includes("retrieval")
  ) {
    return "rag-sandbox-explorer";
  }
  if (
    slug.includes("transformer") ||
    slug.includes("attention") ||
    slug.includes("token") ||
    slug.includes("llm") ||
    slug.includes("prompt") ||
    slug.includes("agent") ||
    slug.includes("memory") ||
    slug.includes("tools") ||
    category === "llms-rag" ||
    category === "ai-agents"
  ) {
    return "self-attention-explorer";
  }
  if (
    slug.includes("gradient-descent") ||
    slug.includes("learning-rate") ||
    slug.includes("loss") ||
    slug.includes("optimizer") ||
    slug.includes("sgd") ||
    slug.includes("adam")
  ) {
    return "gradient-descent-1d";
  }
  if (
    slug.includes("deep-learning") ||
    slug.includes("backprop") ||
    slug.includes("cnn") ||
    slug.includes("rnn") ||
    slug.includes("lstm") ||
    slug.includes("batch-norm") ||
    category === "architectures" ||
    category === "deep-learning"
  ) {
    return "neural-network-explorer";
  }
  return "function-explorer";
}

/**
 * Splits a canonical lesson MDX body into the 5 structured pedagogical sections.
 */
export function splitLessonBodyIntoSections(body: string): LessonMicroStructure["sections"] {
  const h2Regex = /^##\s+(.+)$/gm;
  const matches: { heading: string; startIndex: number }[] = [];
  let match: RegExpExecArray | null = null;

  while ((match = h2Regex.exec(body)) !== null) {
    matches.push({
      heading: match[1] ?? "",
      startIndex: match.index,
    });
  }

  if (matches.length === 0) {
    return {
      intuitionMdx: body,
      visualMdx: "",
      mathMdx: body,
      practiceMdx: "",
      summaryMdx: "",
    };
  }

  const chunks = matches.map((m, idx) => {
    const end = idx + 1 < matches.length ? matches[idx + 1]!.startIndex : body.length;
    return {
      rawHeading: m.heading.trim(),
      heading: m.heading.toLowerCase().trim(),
      fullMdx: body.slice(m.startIndex, end).trim(),
    };
  });

  // Check if numbered sections (e.g. 1., 2., 3., 4., 5.) exist
  const hasNumberedScheme = chunks.some((c) => /^[1-5]\./.test(c.rawHeading));

  if (hasNumberedScheme) {
    const getByNum = (num: number) =>
      chunks.find((c) => new RegExp(`^${num}\\.`).test(c.rawHeading))?.fullMdx ?? "";

    const sec1 = getByNum(1);
    const sec2 = getByNum(2);
    const sec3 = getByNum(3);
    const sec4 = getByNum(4);
    const sec5 = getByNum(5);
    const sec6 = getByNum(6);
    const sec7 = getByNum(7);
    const sec8 = getByNum(8);

    // If 6, 7, 8 exist (canonical multi-section research templates):
    if (sec6 || sec7 || sec8) {
      const practiceChunk =
        sec6 ||
        chunks.find((c) =>
          ["amaliy", "python", "pytorch", "misol", "kod"].some((kw) =>
            c.heading.includes(kw),
          ),
        )?.fullMdx ||
        "";

      return {
        intuitionMdx: [sec1, sec2, sec3].filter(Boolean).join("\n\n"),
        visualMdx: sec4 || "",
        mathMdx: sec5 || body,
        practiceMdx: practiceChunk,
        summaryMdx: [sec7, sec8].filter(Boolean).join("\n\n"),
      };
    }

    // 5-section micro-lesson (clean, non-overlapping mapping for Foundation topics):
    // 1 & 2 -> Step 1 (Intuition & Purpose)
    // 3 -> Step 3 (Mechanism / Syntax / Math rules)
    // 4 -> Step 4 (Practice / Code examples)
    // 5 -> Step 5 (Summary & Connections)
    return {
      intuitionMdx: [sec1, sec2].filter(Boolean).join("\n\n"),
      visualMdx: "",
      mathMdx: sec3 || body,
      practiceMdx: sec4 || "",
      summaryMdx: sec5 || "",
    };
  }

  // Non-numbered fallback: partition each chunk uniquely without repetition
  const usedChunkIndices = new Set<number>();
  const collectUniqueChunks = (keywords: string[], fallbackIdx: number): string => {
    const matched = chunks
      .map((c, idx) => ({ c, idx }))
      .filter(
        ({ c, idx }) =>
          !usedChunkIndices.has(idx) && keywords.some((kw) => c.heading.includes(kw))
      );

    if (matched.length > 0) {
      matched.forEach(({ idx }) => usedChunkIndices.add(idx));
      return matched.map(({ c }) => c.fullMdx).join("\n\n");
    }

    const fb = Math.min(fallbackIdx, chunks.length - 1);
    usedChunkIndices.add(fb);
    return chunks[fb]?.fullMdx ?? body;
  };

  return {
    intuitionMdx: collectUniqueChunks(["qisqacha", "nima uchun", "intuitiv"], 0),
    visualMdx: collectUniqueChunks(["qanday ishlaydi", "arxitektura", "vizual"], 1),
    mathMdx: collectUniqueChunks(["matematik", "formal", "mexanizm"], 2),
    practiceMdx: collectUniqueChunks(["python", "pytorch", "amaliy", "kod"], 3),
    summaryMdx: collectUniqueChunks(["bog'liq", "manbalar", "xulosa"], 4),
  };
}

/**
 * Generates adaptive "Bu qismni tushunmadim" help and a comprehension checkpoint for a lesson.
 */
export function buildLessonMicroStructure(params: {
  slug: string;
  title: string;
  description: string;
  category: string;
  body: string;
}): LessonMicroStructure {
  const { slug, title, description, category, body } = params;
  const sections = splitLessonBodyIntoSections(body);
  const interactiveLabId = getRecommendedLabForLesson(slug, category);

  const adaptiveHelp = {
    analogy: `${title} mavzusini oddiyroq tushunish uchun: ${description} Buni katta muammoni kichik, o‘lchanadigan matematik qadamlarga bo‘lib yechuvchi mexanizm sifatida tasavvur qiling.`,
    stepByStep:
      "1-qadam (Level 1 — Overview): Mavzu nima ekanini va qanday muammoni hal qilishini bilib oling.\n2-qadam (Level 2 — Understand): Vizual va Laboratoriya bo‘limida parametrlarni slayder orqali o‘zgartirib, natijani kuzating.\n3-qadam (Level 3 — Master): Matematik formula va Python/NumPy kodida har bir qator qanday ishlashini tekshiring.",
    keyTakeaway:
      "Formulani yodlashga shoshilmang: avval '2. Vizual & Lab' bo‘limidagi interaktiv laboratoriyada qiymatni o‘zgartirib, sabab-oqibatni ko‘ring.",
  };

  const checkpoint: MicroCheckpoint =
    slug === "transformers"
      ? {
          question:
            "Scaled Dot-Product Attention formulasida QK^T ko‘paytmasi nima uchun √d_k ga bo‘linadi?",
          options: [
            "Katta d_k o‘lchamlarda skalyar ko‘paytma dispersiyasi oshib ketib, Softmax to‘yinishi (gradient yo‘qolishi) oldini olish uchun",
            "Matritsa qatorlari sonini kamaytirish uchun",
            "Vektorlarni manfiy sonlarga aylantirish uchun",
          ],
          correctIndex: 0,
          explanation:
            "To‘g‘ri! Vaswani et al. (2017) ga ko‘ra, √d_k ga bo‘lish skalyar ko‘paytma dispersiyasini 1 ga tenglashtirib, Softmax gradientlarini sog‘lom saqlaydi.",
          reviewHint: "Matematika bo‘limidagi √d_k masshtablash izohiga va Mini-Laboratoriyaga qarang.",
        }
      : slug === "python-basics"
      ? {
          type: "input",
          question:
            "x = [10, 20] va y = [10, 20] bo'lganda, x == y ifodasi True beradi. Ammo x va y xotirada ikkita turli Heap manziliga egaligini (ya'ni id(x) != id(y)) tekshirish uchun qaysi mantiqiy operator ishlatiladi?",
          options: [
            "is operatori (xotira manzilini tekshiradi)",
            "== operatori (faqat qiymatlarni tekshiradi)",
            "in operatori (to'plam ichida borligini tekshiradi)",
          ],
          correctIndex: 0,
          acceptedAnswers: ["is", "is operatori"],
          inputPlaceholderUz: "Operator nomini kiriting...",
          explanation:
            "To'g'ri! 'is' operatori ikkala nom aynan bitta xotira manziliga (id()) bog'langanligini tekshiradi.",
          reviewHint: "2-qadamdagi 'Xotira Modeli (is vs ==)' tahliliga qarang.",
        }
      : slug === "functions"
      ? {
          type: "input",
          question:
            "Funksiya ichida hisoblangan qiymatni dastur xotirasiga chiqarib, keyingi amallar (masalan: total * 1.15) uchun saqlash imkonini beruvchi kalit so'z qaysi?",
          options: [
            "return kalit so'zi (qiymatni funksiyadan qaytaradi)",
            "print() funksiyasi (faqat ekranga chiqaradi)",
            "def kalit so'zi (funksiya e'lon qiladi)",
          ],
          correctIndex: 0,
          acceptedAnswers: ["return", "return kalit so'zi"],
          inputPlaceholderUz: "Kalit so'zni kiriting...",
          explanation:
            "To'g'ri! 'return' qiymatni qaytaradi. 'print()' esa faqat konsolga chiqaradi va funksiya None qaytaradi.",
          reviewHint: "2-qadamdagi 'return vs print' laboratoriyasiga qarang.",
        }
      : {
          question: `“${title}” mavzusini o‘rganishda qaysi yondashuv mexanizmni to‘g‘ri o‘zlashtirishni ta’minlaydi?`,
          options: [
            `Avval asosiy intuitsiya (${description.slice(0, 85)}...) va vizual oqimni tushunib, so‘ng matematik formula hamda kodda tekshirish`,
            "Faqat yakuniy natijani yodlab olib, kirish ma’lumotlari va cheklovlarni e’tiborsiz qoldirish",
            "Parametrlar o‘zgarishining natijaga ta’sirini tekshirmasdan taxminiy qiymat tanlash",
          ],
          correctIndex: 0,
          explanation:
            "To‘g‘ri! Har bir AI algoritmi 4 bosqichda (Intuitsiya → Vizual mexanizm → Matematika → Kod) o‘rganilganda mustahkam tushuncha hosil bo‘ladi.",
          reviewHint: "Intuitsiya va Vizual bo‘limlaridagi asosiy ta’rifni ko‘zdan kechiring.",
        };

  return {
    slug,
    title,
    interactiveLabId,
    sections,
    adaptiveHelp,
    checkpoint,
  };
}
