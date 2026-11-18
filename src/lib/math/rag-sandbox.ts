/**
 * Phase 14–16 Interactive RAG (Retrieval-Augmented Generation) Mathematical & Algorithmic Engine.
 *
 * Performs genuine in-memory operations (never fabricated scores):
 * 1. Document Chunking with configurable `chunkSize` (in words) and `chunkOverlap`.
 * 2. Deterministic Concept-Vector Embedding & real Cosine Similarity (`analyzeVectorPair`).
 * 3. Top-k Retrieval with metadata filtering and `minSimilarityThreshold` (No-Answer Policy).
 * 4. Grounded Answer synthesis with exact `[chunk-id]` provenance citations.
 * 5. Evaluation Metrics (Phase 16): Hit@k and Mean Reciprocal Rank (MRR).
 */

import { analyzeVectorPair } from "./cosine-similarity";

export interface RagSourceDocument {
  id: string;
  title: string;
  category: "rag" | "agents" | "safety" | "local-ai";
  sourceRef: string;
  content: string;
}

export interface RagChunk {
  id: string;
  docId: string;
  docTitle: string;
  category: RagSourceDocument["category"];
  sourceRef: string;
  index: number;
  text: string;
  wordCount: number;
  embedding: number[];
}

export interface RetrievedChunk {
  chunk: RagChunk;
  similarity: number;
  dotProduct: number;
  rank: number;
}

export interface RagPipelineResult {
  query: string;
  queryEmbedding: number[];
  totalChunks: number;
  topK: number;
  threshold: number;
  allScoredChunks: RetrievedChunk[];
  selectedChunks: RetrievedChunk[];
  answered: boolean;
  noAnswerReason: string | null;
  groundedAnswer: string;
  citations: {
    chunkId: string;
    docTitle: string;
    sourceRef: string;
    similarity: number;
    excerpt: string;
  }[];
}

export interface EvalQueryCase {
  id: string;
  question: string;
  expectedDocId: string;
}

export interface RagEvalSummary {
  k: number;
  cases: {
    id: string;
    question: string;
    expectedDocId: string;
    foundRank: number | null;
    hitAtK: boolean;
    reciprocalRank: number;
  }[];
  hitRateAtK: number;
  mrr: number;
}

/**
 * Canonical 8-dimensional technical concept vocabulary used to compute real, transparent
 * bag-of-concepts embeddings in the browser without external API calls.
 */
export const RAG_CONCEPT_DIMENSIONS: readonly {
  dimName: string;
  keywords: readonly string[];
}[] = [
  {
    dimName: "chunk_index",
    keywords: ["chunk", "chunking", "overlap", "bo'lak", "indeks", "hujjat", "pdf", "markdown"],
  },
  {
    dimName: "vector_cosine",
    keywords: ["vektor", "embedding", "cosine", "similarity", "dot", "norm", "masofa", "qdrant", "chroma"],
  },
  {
    dimName: "retrieval_topk",
    keywords: ["retrieval", "top-k", "qidiruv", "kontekst", "manba", "citation", "grounded", "rag"],
  },
  {
    dimName: "no_answer_hallucination",
    keywords: ["hallucination", "no-answer", "to'qib", "ishonch", "javob yo'q", "chegara", "aniqlik"],
  },
  {
    dimName: "agent_react_tool",
    keywords: ["agent", "react", "tool", "function", "action", "observation", "loop", "permission"],
  },
  {
    dimName: "mcp_protocol",
    keywords: ["mcp", "host", "client", "server", "stdio", "resource", "discovery", "protokol"],
  },
  {
    dimName: "safety_injection",
    keywords: ["injection", "prompt", "xavfsizlik", "pii", "maxfiy", "guardrail", "trust"],
  },
  {
    dimName: "local_quantization",
    keywords: ["ollama", "gguf", "quantization", "vram", "lokal", "kvantlash", "ram"],
  },
];

export const DEFAULT_RAG_DOCUMENTS: readonly RagSourceDocument[] = [
  {
    id: "doc-rag-chunking",
    title: "Phase 14: Hujjatni Chunking va Overlap bilan bo‘laklash",
    category: "rag",
    sourceRef: "AI_Engineer_20_Phase_Roadmap.md (Phase 14, 14.06–14.10)",
    content:
      "RAG tizimida katta PDF yoki Markdown hujjatni butunligicha context window ichiga joylab bo‘lmaydi. Hujjat kichik chunk bo‘laklariga ajratiladi. Chunk size juda kichik bo‘lsa jumla ma’nosi uzilib qoladi, juda katta bo‘lsa ortiqcha shovqin kiradi. Chunk overlap qo‘shni bo‘laklar orasida umumiy so‘zlarni qoldirib, chegara joyidagi kontekst yo‘qolishining oldini oladi.",
  },
  {
    id: "doc-rag-citation",
    title: "Phase 15: Similarity Retrieval, Citation va No-Answer siyosati",
    category: "rag",
    sourceRef: "AI_Engineer_20_Phase_Roadmap.md (Phase 15, 15.01–15.09)",
    content:
      "Foydalanuvchi savoli embedding vektoriga aylantiriladi va vector database ichidan cosine similarity bo‘yicha eng yaqin top-k chunk qidirib topiladi. Grounded generation qoidasiga ko‘ra model faqat topilgan manba kontentiga tayanib javob berishi va har bir fakt uchun citation manba havolasini ko‘rsatishi shart. Agar topilgan chunk similarity ko‘rsatkichi past bo‘lsa, hallucination qilmaslik uchun no-answer siyosati ishga tushadi.",
  },
  {
    id: "doc-agent-mcp",
    title: "Phase 17–18: ReAct Agent sikli va Model Context Protocol (MCP)",
    category: "agents",
    sourceRef: "AI_Engineer_20_Phase_Roadmap.md (Phase 17–18, 17.05 & 18.01)",
    content:
      "AI Agent oddiy chatbotdan farqli o‘laroq ReAct loop orqali ishlaydi: reja tuzadi, tool function chaqiradi, observation natijasini oladi va stop condition bajarilguncha davom etadi. Model Context Protocol (MCP) esa Host, Client va Server o‘rtasida stdio yoki HTTP orqali xavfsiz tool discovery va resource almashinuvini standartlashtiradi.",
  },
  {
    id: "doc-safety-local",
    title: "Phase 10–11: Prompt Injection himoyasi va Lokal Quantization (GGUF)",
    category: "safety",
    sourceRef: "AI_Engineer_20_Phase_Roadmap.md (Phase 10–11, 10.03 & 11.04)",
    content:
      "Tashqi hujjat yoki foydalanuvchi matni ichiga yashirilgan zararli buyruq prompt injection deb ataladi; unga qarshi data va instruction trust boundary hamda tool permission guardrail qo‘llaniladi. Lokal modellarni Ollama va GGUF formatida ishga tushirishda quantization vaznlarni 16-bitdan 4-bitga tushirib, VRAM xotira sarfini kamaytiradi.",
  },
];

/**
 * Computes an 8D concept frequency vector for any text.
 */
export function computeConceptEmbedding(text: string): number[] {
  const lower = text.toLowerCase();
  return RAG_CONCEPT_DIMENSIONS.map((dim) => {
    let score = 0;
    for (const kw of dim.keywords) {
      if (lower.includes(kw)) {
        // Count occurrences
        const parts = lower.split(kw);
        score += parts.length - 1;
      }
    }
    return score;
  });
}

/**
 * Splits documents into overlapping word chunks and computes each chunk's embedding.
 */
export function chunkDocuments(
  docs: readonly RagSourceDocument[],
  chunkSizeWords: number = 28,
  chunkOverlapWords: number = 6,
): RagChunk[] {
  const safeSize = Math.max(8, Math.min(120, Math.round(chunkSizeWords)));
  const safeOverlap = Math.max(0, Math.min(safeSize - 4, Math.round(chunkOverlapWords)));
  const step = Math.max(1, safeSize - safeOverlap);

  const chunks: RagChunk[] = [];

  for (const doc of docs) {
    const words = doc.content.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;

    let chunkIdx = 1;
    for (let start = 0; start < words.length; start += step) {
      const slice = words.slice(start, start + safeSize);
      if (slice.length === 0) break;
      const chunkText = slice.join(" ");
      chunks.push({
        id: `${doc.id}#c${chunkIdx}`,
        docId: doc.id,
        docTitle: doc.title,
        category: doc.category,
        sourceRef: doc.sourceRef,
        index: chunkIdx,
        text: chunkText,
        wordCount: slice.length,
        embedding: computeConceptEmbedding(`${doc.title} ${chunkText}`),
      });
      chunkIdx++;
      if (start + safeSize >= words.length) break;
    }
  }

  return chunks;
}

/**
 * Runs the complete RAG pipeline: Query Embedding -> Cosine Similarity -> Top-K -> Grounded Answer / No-Answer.
 */
export function runRagSandboxPipeline(params: {
  query: string;
  documents?: readonly RagSourceDocument[];
  chunkSizeWords?: number;
  chunkOverlapWords?: number;
  topK?: number;
  minSimilarityThreshold?: number;
  categoryFilter?: RagSourceDocument["category"] | "all";
}): RagPipelineResult {
  const {
    query,
    documents = DEFAULT_RAG_DOCUMENTS,
    chunkSizeWords = 28,
    chunkOverlapWords = 6,
    topK = 2,
    minSimilarityThreshold = 0.2,
    categoryFilter = "all",
  } = params;

  const allChunks = chunkDocuments(documents, chunkSizeWords, chunkOverlapWords);
  const filteredChunks =
    categoryFilter === "all"
      ? allChunks
      : allChunks.filter((c) => c.category === categoryFilter);

  const queryEmbedding = computeConceptEmbedding(query);

  const scored = filteredChunks
    .map((chunk) => {
      const analysis = analyzeVectorPair(queryEmbedding, chunk.embedding);
      return {
        chunk,
        similarity: analysis.cosine ?? 0,
        dotProduct: analysis.dotProduct,
        rank: 0,
      };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const safeK = Math.max(1, Math.min(5, topK));
  const topCandidates = scored.slice(0, safeK);
  const aboveThreshold = topCandidates.filter(
    (c) => c.similarity >= minSimilarityThreshold && c.similarity > 0,
  );

  if (aboveThreshold.length === 0) {
    return {
      query,
      queryEmbedding,
      totalChunks: filteredChunks.length,
      topK: safeK,
      threshold: minSimilarityThreshold,
      allScoredChunks: scored,
      selectedChunks: topCandidates,
      answered: false,
      noAnswerReason: `Eng yuqori o‘xshashlik (${(topCandidates[0]?.similarity ?? 0).toFixed(3)}) belgilangan chegara (${minSimilarityThreshold.toFixed(2)}) dan past yoki 0 ga teng. Hallucination (to‘qib chiqarish) oldini olish uchun No-Answer siyosati qo‘llanildi.`,
      groundedAnswer:
        "Manba hujjatlarida ushbu savolga javob berish uchun yetarli tasdiqlangan ma’lumot topilmadi (No-Answer Policy).",
      citations: [],
    };
  }

  const citations = aboveThreshold.map((item) => ({
    chunkId: item.chunk.id,
    docTitle: item.chunk.docTitle,
    sourceRef: item.chunk.sourceRef,
    similarity: item.similarity,
    excerpt: item.chunk.text,
  }));

  const groundedParts = aboveThreshold.map(
    (item) => `${item.chunk.text} [${item.chunk.id}]`,
  );

  return {
    query,
    queryEmbedding,
    totalChunks: filteredChunks.length,
    topK: safeK,
    threshold: minSimilarityThreshold,
    allScoredChunks: scored,
    selectedChunks: aboveThreshold,
    answered: true,
    noAnswerReason: null,
    groundedAnswer: groundedParts.join(" "),
    citations,
  };
}

export const DEFAULT_EVAL_CASES: readonly EvalQueryCase[] = [
  {
    id: "eval-1",
    question: "Hujjatni chunk size va chunk overlap bilan bo'laklash nima uchun kerak?",
    expectedDocId: "doc-rag-chunking",
  },
  {
    id: "eval-2",
    question: "Top-k retrieval da citation manba ko'rsatish va no-answer siyosati qanday ishlaydi?",
    expectedDocId: "doc-rag-citation",
  },
  {
    id: "eval-3",
    question: "MCP protokoli va ReAct agent tool loop vazifasi nima?",
    expectedDocId: "doc-agent-mcp",
  },
  {
    id: "eval-4",
    question: "Prompt injection xavfsizligi va lokal GGUF quantization VRAM ga qanday ta'sir qiladi?",
    expectedDocId: "doc-safety-local",
  },
];

/**
 * Computes real Hit@k and MRR (Mean Reciprocal Rank) on a test set of queries (Phase 16).
 */
export function evaluateRetrievalMetrics(params: {
  cases?: readonly EvalQueryCase[];
  documents?: readonly RagSourceDocument[];
  chunkSizeWords?: number;
  chunkOverlapWords?: number;
  k?: number;
}): RagEvalSummary {
  const {
    cases = DEFAULT_EVAL_CASES,
    documents = DEFAULT_RAG_DOCUMENTS,
    chunkSizeWords = 28,
    chunkOverlapWords = 6,
    k = 2,
  } = params;

  const evalResults = cases.map((testCase) => {
    const res = runRagSandboxPipeline({
      query: testCase.question,
      documents,
      chunkSizeWords,
      chunkOverlapWords,
      topK: k,
      minSimilarityThreshold: 0.05,
    });

    const matchIndex = res.allScoredChunks.findIndex(
      (item) => item.chunk.docId === testCase.expectedDocId && item.similarity > 0,
    );
    const foundRank = matchIndex >= 0 ? matchIndex + 1 : null;
    const hitAtK = foundRank !== null && foundRank <= k;
    const reciprocalRank = foundRank !== null ? 1 / foundRank : 0;

    return {
      id: testCase.id,
      question: testCase.question,
      expectedDocId: testCase.expectedDocId,
      foundRank,
      hitAtK,
      reciprocalRank,
    };
  });

  const total = evalResults.length || 1;
  const hitRateAtK = evalResults.filter((r) => r.hitAtK).length / total;
  const mrr = evalResults.reduce((acc, r) => acc + r.reciprocalRank, 0) / total;

  return {
    k,
    cases: evalResults,
    hitRateAtK,
    mrr,
  };
}
