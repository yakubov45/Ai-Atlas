/**
 * AI Atlas Learning OS — Node Syllabus, Requirements & Prerequisite Breakdown Engine
 *
 * Powers detailed, untruncated inspection modals across BOTH:
 * - Global Unified Roadmap (`/roadmap`)
 * - Interactive Knowledge Graph (`/learn/map`)
 *
 * Answers cleanly for every node:
 * 1. Qancha mavzu o'rganish kerak bundan oldin (exact transitive & direct counts + ordered chain)
 * 2. Nimalar kerak bo'ladi (concrete foundations, math & tools needed before starting)
 * 3. Ushbu mavzuda aniq nimalar o'rganiladi (numbered explicit syllabus topics)
 */

import { CANONICAL_CONCEPTS, getConceptById } from "@/lib/knowledge-graph/concepts";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import {
  buildPrerequisiteAdjacency,
  collectAncestors,
  topologicalSortConcepts,
} from "@/lib/knowledge-graph/learning-paths";
import type { ConceptRelationType, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import {
  GLOBAL_ROADMAP_NODES,
  getGlobalNodeById,
  type CareerBranchId,
  type GlobalRoadmapNode,
} from "./global-roadmap";
import { isCanonicalItemCompleted } from "./progress-sync";
import type { LearningState } from "@/lib/progress/repository";

export interface NodeSyllabusMeta {
  requirementsUz: string[];
  topicsCoveredUz: string[];
}

/** Explicit, curated requirements & syllabus topics for every Global Roadmap node */
export const GLOBAL_NODE_SYLLABUS: Readonly<Record<string, NodeSyllabusMeta>> = {
  "gn-python-basics": {
    requirementsUz: [
      "Hech qanday dasturlash tajribasi shart emas — noldan boshlanadi",
      "Kompyuterda Python 3.10+ yoki brauzer ichidagi Pyodide muhiti",
    ],
    topicsCoveredUz: [
      "O'zgaruvchilar, dinamik tiplash va type hints (int, float, str, bool)",
      "Python xotira modeli: stack vs heap havolalari, `is` va `==` farqi",
      "Mutable vs Immutable obyektlar (`list`, `dict`, `set`, `tuple`) va `.copy()`",
      "Shartli tarmoqlanish (`if/elif/else`) va `for`/`while` sikllari",
      "uv muhiti, ruff lint, pytest va Git asoslari",
    ],
  },
  "gn-python-functions": {
    requirementsUz: [
      "Python o'zgaruvchilar, tiplar, `list` va `dict` bilan ishlay olish",
      "`for`/`while` sikllari va shart operatorlarini tushunish",
    ],
    topicsCoveredUz: [
      "Funksiyalar e'lon qilish, `*args` / `**kwargs` va default argumentlar",
      "LEGB qoidasi: Local, Enclosing, Global va Built-in ko'rinish sohasi",
      "Rekursiya va Call Stack ishlash mexanizmi (base case va stack overflow)",
      "Lambda funksiyalar, generatorlar (`yield`) va dekorator asoslari",
      "Kontekst menejerlar (`with`) va modul strukturalari",
    ],
  },
  "gn-python-oop": {
    requirementsUz: [
      "Funksiyalar, Scope va asosiy ma'lumotlar tuzilmalari (`gn-python-functions`)",
      "Xatolar bilan ishlash (`try/except`) haqida boshlang'ich tushuncha",
    ],
    topicsCoveredUz: [
      "Klasslar, obyektlar, `__init__`, merosxo'rlik va polimorfizm (PyTorch `nn.Module` uslubida)",
      "Pydantic bilan qat'iy ma'lumotlar sxemasi va validatsiyasi",
      "Asinxron dasturlash (`async/await`, event loop) va API chaqiruvlar",
      "FastAPI orqali `/predict` va `/health` REST endpointlarini qurish",
      "Logging, Docker konteyner asoslari va birlik testlar (`pytest`)",
    ],
  },
  "gn-vectors-cosine": {
    requirementsUz: [
      "Maktab algebrasi: koordinatalar tekisligi va Pifagor teoremasi",
      "Python ro'yxatlari (`list`) bilan oddiy sikl yozish (`gn-python-basics`)",
    ],
    topicsCoveredUz: [
      "Vektor tushunchasi, o'lchami (dimension) va L1 / L2 Evklid normasi",
      "Skalyar ko'paytma (Dot Product): geometrik va algebraik talqin",
      "Cosine Similarity formulasi va uning vektor uzunligiga bog'liq emasligi",
      "AI tizimlarida qo'llanilishi: semantik matn o'xshashligi va Q·K ballari",
    ],
  },
  "gn-matrices-tensors": {
    requirementsUz: [
      "Vektorlar va skalyar ko'paytma (`gn-vectors-cosine`)",
      "Indekslash va ko'p o'lchamli ro'yxatlar bilan ishlash",
    ],
    topicsCoveredUz: [
      "Matritsa turlari, transpozitsiya (`A^T`) va birlik matritsa",
      "Matritsani vektorga va matritsani matritsaga ko'paytirish shartlari `(m×n) @ (n×k)`",
      "Tenzorlar (0D skalyar → 4D rasm batch `(B, C, H, W)`) va shape moslash",
      "Chiziqli transformatsiya `Y = XW + b` va neyron qatlamlar bilan bog'liqligi",
    ],
  },
  "gn-calculus-gradients": {
    requirementsUz: [
      "Funksiyalar grafigi va chiziqli tenglamalar asoslari",
      "Vektor va matritsa amallari (`gn-vectors-cosine`, `gn-matrices-tensors` tavsiya etiladi)",
    ],
    topicsCoveredUz: [
      "Hosila: o'zgarish tezligi va urinma chiziq qiyaligi",
      "Qisman (xususiy) hosilalar (Partial Derivatives) ko'p o'zgaruvchili funksiyalarda",
      "Gradient vektori (`∇f`) — eng tez o'sish va pasayish yo'nalishi",
      "Zanjir qoidasi (Chain Rule) — murakkab funksiyalar orqali hosila uzatish",
    ],
  },
  "gn-probability-stats": {
    requirementsUz: [
      "O'rta maktab arifmetikasi va foizlar/kasrlar",
      "Python bazaviy hisob-kitoblar (`gn-python-basics`)",
    ],
    topicsCoveredUz: [
      "Ehtimollik, shartli ehtimollik va Bayes teoremasi",
      "O'rtacha qiymat (Mean / Matematik kutilma), Median va Dispersiya / Standard Deviation",
      "Normal (Gauss) va Bernoulli taqsimotlari",
      "Logitlardan Softmax orqali ehtimolliklarga o'tish va ishonch oralig'i",
    ],
  },
  "gn-numpy-pandas": {
    requirementsUz: [
      "Python asoslari: ro'yxatlar, lug'atlar, sikllar (`gn-python-basics`)",
      "Matritsa va tenzor o'lchamlari haqida tushuncha (`gn-matrices-tensors` tavsiya)",
    ],
    topicsCoveredUz: [
      "NumPy arraylar: vektorlash (vectorization) va Broadcasting qoidalari",
      "Pandas / Polars bilan DataFrame filtratsiya, `groupby` va aggreggatsiya",
      "Yetishmayotgan qiymatlar (NaN), dublikatlar va ma'lumot turlarini tozalash",
      "SQL asoslari: `SELECT`, `JOIN`, `CTE (WITH)` va `WINDOW` funksiyalari",
    ],
  },
  "gn-etl-elt": {
    requirementsUz: [
      "Pandas va SQL so'rovlari tajribasi (`gn-numpy-pandas`)",
      "Fayl formatlari (CSV, JSON, Parquet) bilan ishlash",
    ],
    topicsCoveredUz: [
      "ETL vs ELT arxitektura farqlari va qachon qaysi birini tanlash",
      "Sxema tekshiruvi, noto'g'ri yozuvlarni Quarantine (karantin) jadvallariga ajratish",
      "Idempotent replay: qayta ishga tushirilganda dublikat bermaydigan pipeline",
      "SCD Type 2, CDC oqimlari, Kafka/Spark va Data Lakehouse konsepsiyasi",
    ],
  },
  "gn-eda-analytics": {
    requirementsUz: [
      "Ehtimollik va dispersiya asoslari (`gn-probability-stats`)",
      "Pandas/SQL orqali jadvallarni guruhlash (`gn-numpy-pandas`)",
    ],
    topicsCoveredUz: [
      "Exploratory Data Analysis (EDA): taqsimotlar, korrelyatsiya va outlierlarni aniqlash",
      "Gipotezalarni tekshirish: p-qiymat, ishonch oralig'i (CI) va Bootstrap",
      "A/B test dizayni: namuna hajmi, Type I / Type II xatolar",
      "CUPED orqali eksperiment dispersiyasini kamaytirish texnikasi",
    ],
  },
  "gn-classical-ml": {
    requirementsUz: [
      "NumPy va Pandas jadvallari (`gn-numpy-pandas`)",
      "Ehtimollik asoslari (`gn-probability-stats`) va chiziqli funksiya",
    ],
    topicsCoveredUz: [
      "Supervised vs Unsupervised Learning turlari va Linear/Logistic Regression",
      "Yo'qotish funksiyalari: MSE, MAE, Binary va Categorical Cross-Entropy",
      "Data Leakage (ma'lumot sizib chiqishi) xatolari va Train/Val/Test + Cross-Validation",
      "Decision Trees, Random Forest, XGBoost va baholash metrikalari (Precision, Recall, PR-AUC, F1)",
    ],
  },
  "gn-gradient-descent": {
    requirementsUz: [
      "Hosila, Zanjir qoidasi va Gradient vektori (`gn-calculus-gradients`)",
      "Klassik regressiya va Loss funksiyasi (`gn-classical-ml`)",
    ],
    topicsCoveredUz: [
      "Gradient Descent yangilash qoidasi: `theta <- theta - lr * grad`",
      "Learning Rate tanlash: juda kichik (sekin) vs juda katta (portlash / tebranish)",
      "Batch vs Stochastic (SGD) vs Mini-Batch Gradient Descent",
      "Momentum, RMSProp, Adam va AdamW optimizatorlari hamda Cosine Annealing",
    ],
  },
  "gn-backprop": {
    requirementsUz: [
      "Gradient Descent (`gn-gradient-descent`) va Matritsalar (`gn-matrices-tensors`)",
      "Zanjir qoidasi (`gn-calculus-gradients`)",
    ],
    topicsCoveredUz: [
      "Ko'p qatlamli neyron tarmoqda Forward Pass va Loss hisoblash",
      "Hisoblash graflari va Backpropagation (Autograd) orqali gradient tarqatish",
      "ReLU, GELU, Sigmoid aktivatsiya funksiyalari va Vanishing Gradient muammosi",
      "Batch Normalization (`train()` vs `eval()` rejimlari), Dropout va Checkpoint saqlash",
    ],
  },
  "gn-perceptron-mlp": {
    requirementsUz: [
      "Backpropagation va neyron tarmoq asoslari (`gn-backprop`)",
      "Chiziqli tenglama va dot product (`gn-vectors-cosine`)",
    ],
    topicsCoveredUz: [
      "Perceptron (1958, Rosenblatt): bitta chiziqli chegaralovchi neyron imkoniyatlari",
      "XOR muammosi: nega bitta qatlam chiziqli ajralmaydigan masalani yecha olmaydi",
      "MLP (1986, Rumelhart, Hinton, Williams): yashirin qatlamlar va aktivatsiyalar kuchi",
      "PyTorch `nn.Linear` + ReLU bilan XOR masalasini amalda o'qitish",
    ],
  },
  "gn-cnn-resnet": {
    requirementsUz: [
      "Perceptron va MLP asoslari (`gn-perceptron-mlp`)",
      "4D Tenzor shakllari `(B, C, H, W)` tushunchasi (`gn-matrices-tensors`)",
    ],
    topicsCoveredUz: [
      "CNN (1998, LeCun LeNet-5): konvolyutsiya yadrosi, stride, padding va Max/Avg Pooling",
      "Chiqish tenzori o'lchamini hisoblash va parametrlar tejamkorligi",
      "Chuqur tarmoqlarda degradatsiya muammosi",
      "ResNet (2015): `y = F(x) + x` Residual Skip Connection va gradient erkin oqimi",
    ],
  },
  "gn-seq-models": {
    requirementsUz: [
      "MLP / Backpropagation (`gn-perceptron-mlp`)",
      "Vektor o'xshashligi va Embedding g'oyasi (`gn-vectors-cosine`)",
    ],
    topicsCoveredUz: [
      "Word Embeddings (2013): Skip-Gram, CBOW va vektor fazosida so'z semantikasi",
      "RNN (1990) va Backpropagation Through Time (BPTT) da xotira so'nishi",
      "LSTM (1997) va GRU (2014): Forget/Input/Output eshiklari hamda Cell State",
      "Seq2Seq (2014) Bottleneck muammosi va Bahdanau Additive Attention yechimi",
    ],
  },
  "gn-self-attention": {
    requirementsUz: [
      "Ketma-ketlik modellari va Attention g'oyasi (`gn-seq-models`)",
      "Skalyar ko'paytma va Matritsa ko'paytmasi (`gn-vectors-cosine`, `gn-matrices-tensors`)",
    ],
    topicsCoveredUz: [
      "Self-Attention: har bir tokenning Query (Q), Key (K) va Value (V) proyeksiyalari",
      "Scaled Dot-Product Attention formulasi va `√d_k` masshtablash sababi",
      "Multi-Head Attention, Positional Encoding va LayerNorm + Residual",
      "BERT (2018, Bidirectional Encoder/MLM) vs GPT (2018, Causal Masked Decoder) farqi",
    ],
  },
  "gn-tokenization": {
    requirementsUz: [
      "Transformer asoslari (`gn-self-attention`)",
      "Python stringlar va lug'atlar bilan ishlash",
    ],
    topicsCoveredUz: [
      "So'z, belgi (character) va subword tokenizatsiya farqlari (o'zbekcha matnlarda token sarfi)",
      "Byte-Pair Encoding (BPE) merge algoritmi va WordPiece/Unigram",
      "Batching, `input_ids`, Padding tokeni va `attention_mask` (0 vs 1 maskalash)",
      "Tokenizer xatolari tufayli model chiqishining buzilishini testlash",
    ],
  },
  "gn-embeddings": {
    requirementsUz: [
      "Cosine Similarity matematikasi (`gn-vectors-cosine`)",
      "Tokenizatsiya va Transformer kontekst vektori (`gn-tokenization`)",
    ],
    topicsCoveredUz: [
      "Matnlarni yuqori o'lchamli zich embedding vektorlariga aylantirish",
      "Kontekstual vs statik embeddinglar va bi-encoder modeli",
      "ANN (Approximate Nearest Neighbors): HNSW, IVF va Cosine/L2 indekslari",
      "Vektor ma'lumotlar bazalari bilan o'zbekcha semantik qidiruv qurish",
    ],
  },
  "gn-hf-finetuning": {
    requirementsUz: [
      "Transformerlar va Tokenization (`gn-self-attention`, `gn-tokenization`)",
      "Gradient Descent / AdamW (`gn-gradient-descent`) va PyTorch asoslari",
    ],
    topicsCoveredUz: [
      "Hugging Face `AutoModel`, `AutoTokenizer` va `Trainer` pipeline",
      "Full Fine-Tuning vs PEFT: LoRA (`W + B·A`) past-rank matritsa adapterlari",
      "4-bit kvantlash (NF4) + QLoRA bilan iste'mol GPU da model o'qitish",
      "SFT, DPO va Open R1 GRPO Alignment asoslari hamda overfitting nazorati",
    ],
  },
  "gn-prompt-sampling": {
    requirementsUz: [
      "Tokenizatsiya va keyingi token ehtimolligi (`gn-tokenization`)",
      "Softmax ehtimollik taqsimoti (`gn-probability-stats`)",
    ],
    topicsCoveredUz: [
      "Tizim ko'rsatmalari (System Prompt), Few-Shot va Chain-of-Thought (CoT)",
      "Inference parametrlari: Temperature, Top-K, Top-P (Nucleus) va Repetition Penalty",
      "JSON Structured Output sxemalari va deterministik generatsiya",
      "Prompt Injection, Jailbreak va Guardrails xavfsizlik tekshiruvlari",
    ],
  },
  "gn-rag-systems": {
    requirementsUz: [
      "Embeddings va Vektor bazalari (`gn-embeddings`)",
      "Prompt Engineering va kontekst boshqaruvi (`gn-prompt-sampling`)",
    ],
    topicsCoveredUz: [
      "Hujjatlarni qayta ishlash va Chunking strategiyalari (o'lcham va overlap)",
      "Dense Vector + BM25 Hybrid Search va Reciprocal Rank Fusion (RRF)",
      "Cross-Encoder Reranking va manbaga asoslangan javob (Grounded Citation)",
      "Dalil yetishmaganda rad etish va baholash (Hit@k, MRR, Faithfulness, Ragas)",
    ],
  },
  "gn-agents-tools": {
    requirementsUz: [
      "Prompt Engineering va Structured Output (`gn-prompt-sampling`)",
      "Python funksiyalar va JSON sxemalar (`gn-python-functions`)",
    ],
    topicsCoveredUz: [
      "Function Calling / Tool Calling: modelga xavfsiz vosita sxemasini berish",
      "ReAct sikli: Thought → Action → Observation → Final Answer",
      "Qisqa muddatli suhbat oynasi va uzoq muddatli tashqi Agent xotirasi",
      "Model Context Protocol (MCP): standart client-server vosita integratsiyasi va ruxsatlar",
    ],
  },
  "gn-moe-mamba": {
    requirementsUz: [
      "Self-Attention & Transformer (`gn-self-attention`)",
      "Matritsa hisob-kitoblari va KV Cache xotira sarfi tushunchasi",
    ],
    topicsCoveredUz: [
      "Mixture of Experts (MoE): Router tarmog'i, Sparse Top-K gating va load balancing",
      "Transformer `O(N^2)` attention va o'suvchi KV Cache xotira muammosi",
      "Mamba (Selective SSM / S6): uzluksiz holat fazosi, `O(N)` vaqt va `O(1)` xotira",
      "Transformer vs Mamba amaliy murosalari (exact recall vs uzun ketma-ketlik)",
    ],
  },
  "gn-mlops-prod": {
    requirementsUz: [
      "RAG va Python API / OOP asoslari (`gn-rag-systems`, `gn-python-oop`)",
      "Model baholash metrikalari tushunchasi",
    ],
    topicsCoveredUz: [
      "Lokal LLM inference: GGUF kvantlash, RAM/VRAM hisoblash, Ollama, llama.cpp va vLLM",
      "FastAPI Streaming Gateway, timeout, retry va Redis kesh + Docker Compose",
      "Yuklama testi (Locust p95/throughput), CI/CD, Canary/Shadow va Rollback",
      "Observability & Xavfsizlik: Prometheus, Grafana, Langfuse tracing, PII himoyasi va System Card / Runbook",
    ],
  },
};

/** Maps Global Career Branches to Knowledge Graph concepts so `/learn/map` can also filter by Career! */
export const CAREER_TO_KG_TARGET_CONCEPTS: Readonly<Record<CareerBranchId, string[]>> = {
  all: [],
  "ai-engineer": [
    "rag-retrieval-augmented",
    "model-context-protocol",
    "production-mlops-serving",
    "transformer-architecture",
  ],
  "ml-engineer": [
    "gradient-boosting-xgboost",
    "backpropagation-autograd",
    "dl-resnet",
    "production-mlops-serving",
  ],
  "data-scientist": [
    "ab-testing-experimentation",
    "sql-relational-databases",
    "pandas-data-wrangling",
    "gradient-boosting-xgboost",
  ],
  "data-engineer": [
    "sql-relational-databases",
    "docker-containerization",
    "vector-databases-indexing",
    "rag-retrieval-augmented",
  ],
  "llm-engineer": [
    "dl-gpt",
    "dl-bert",
    "dl-moe",
    "dl-mamba",
    "fine-tuning-lora-peft",
  ],
  "rag-engineer": [
    "reranking-hybrid-search",
    "rag-retrieval-augmented",
    "vector-databases-indexing",
    "embeddings-vector-spaces",
  ],
  "agent-mcp": [
    "model-context-protocol",
    "ai-agents-react-loop",
    "function-calling-tools",
    "prompt-engineering-cot",
  ],
  "local-ai": [
    "fine-tuning-lora-peft",
    "dl-mamba",
    "docker-containerization",
    "production-mlops-serving",
  ],
  multimodal: [
    "dl-resnet",
    "dl-cnn",
    "transformer-architecture",
    "dl-lstm",
  ],
  "python-dev": [
    "python-oop",
    "python-async-concurrency",
    "api-rest-fastapi",
    "docker-containerization",
  ],
};

export function getKgConceptSubsetForCareer(career: CareerBranchId): Set<string> | null {
  if (career === "all") return null;
  const targets = CAREER_TO_KG_TARGET_CONCEPTS[career] ?? [];
  if (targets.length === 0) return null;

  const { prereqsOf } = buildPrerequisiteAdjacency(true);
  const included = new Set<string>();

  for (const target of targets) {
    included.add(target);
    for (const anc of collectAncestors(target, prereqsOf)) {
      included.add(anc);
    }
  }

  // Also ensure any EXTENDS targets for selected anchors are preserved if source was targeted
  for (const rel of CONCEPT_RELATIONS) {
    if (rel.type === "EXTENDS" && targets.includes(rel.target)) {
      included.add(rel.source);
    }
  }

  return included;
}

export interface GlobalNodeBreakdown {
  node: GlobalRoadmapNode;
  directRequired: GlobalRoadmapNode[];
  directRecommended: GlobalRoadmapNode[];
  orderedPrereqChain: Array<{
    node: GlobalRoadmapNode;
    relationKind: "required" | "recommended";
    isDone: boolean;
  }>;
  totalPrereqCount: number;
  donePrereqCount: number;
  remainingPrereqCount: number;
  prepMinutes: number;
  requirementsUz: string[];
  topicsCoveredUz: string[];
  nextUnlockedNodes: GlobalRoadmapNode[];
}

export function getGlobalNodeFullBreakdown(
  nodeId: string,
  state: LearningState,
): GlobalNodeBreakdown | null {
  const node = getGlobalNodeById(nodeId);
  if (!node) return null;

  const isDoneFn = (n: GlobalRoadmapNode) =>
    isCanonicalItemCompleted(state, n.canonicalConceptId) ||
    Boolean(state.knownConcepts[n.canonicalConceptId]) ||
    n.associatedLessons.some(
      (l) => isCanonicalItemCompleted(state, l.id) || Boolean(state.knownConcepts[l.id]),
    );

  // Compute transitive ancestors preserving required vs recommended distinction
  const ancestorKind = new Map<string, "required" | "recommended">();
  const directReqSet = new Set(node.requiredPrerequisites);
  const queue: Array<{ id: string; kind: "required" | "recommended" }> = [
    ...node.requiredPrerequisites.map((id) => ({ id, kind: "required" as const })),
    ...node.recommendedPrerequisites.map((id) => ({ id, kind: "recommended" as const })),
  ];

  while (queue.length > 0) {
    const curr = queue.shift()!;
    const prev = ancestorKind.get(curr.id);
    if (!prev || (prev === "recommended" && curr.kind === "required")) {
      ancestorKind.set(curr.id, curr.kind);
      const currNode = getGlobalNodeById(curr.id);
      if (currNode) {
        for (const p of currNode.requiredPrerequisites) {
          queue.push({ id: p, kind: curr.kind });
        }
        for (const p of currNode.recommendedPrerequisites) {
          queue.push({ id: p, kind: "recommended" });
        }
      }
    }
  }

  const orderedPrereqChain = GLOBAL_ROADMAP_NODES.filter((n) => ancestorKind.has(n.id)).map((n) => ({
    node: n,
    relationKind: directReqSet.has(n.id) ? ("required" as const) : ancestorKind.get(n.id)!,
    isDone: isDoneFn(n),
  }));

  const directRequired = node.requiredPrerequisites
    .map((id) => getGlobalNodeById(id))
    .filter((x): x is GlobalRoadmapNode => Boolean(x));

  const directRecommended = node.recommendedPrerequisites
    .map((id) => getGlobalNodeById(id))
    .filter((x): x is GlobalRoadmapNode => Boolean(x));

  const donePrereqCount = orderedPrereqChain.filter((x) => x.isDone).length;
  const totalPrereqCount = orderedPrereqChain.length;
  const remainingPrereqCount = totalPrereqCount - donePrereqCount;
  const prepMinutes = orderedPrereqChain
    .filter((x) => !x.isDone)
    .reduce((sum, x) => sum + x.node.estimatedMinutes, 0);

  const syllabus = GLOBAL_NODE_SYLLABUS[node.id] ?? {
    requirementsUz:
      directRequired.length > 0
        ? directRequired.map((r) => `${r.titleUz} mavzusini tushunish`)
        : ["Asosiy mantiqiy fikrlash va Python boshlang'ich muhiti"],
    topicsCoveredUz: node.associatedLessons.map((l) => l.label),
  };

  const nextUnlockedNodes = GLOBAL_ROADMAP_NODES.filter(
    (other) =>
      other.requiredPrerequisites.includes(node.id) ||
      other.recommendedPrerequisites.includes(node.id),
  );

  return {
    node,
    directRequired,
    directRecommended,
    orderedPrereqChain,
    totalPrereqCount,
    donePrereqCount,
    remainingPrereqCount,
    prepMinutes,
    requirementsUz: syllabus.requirementsUz,
    topicsCoveredUz: syllabus.topicsCoveredUz,
    nextUnlockedNodes,
  };
}

export interface KgConceptBreakdown {
  concept: KnowledgeConcept;
  orderedPrereqChain: Array<{
    concept: KnowledgeConcept;
    isDone: boolean;
    isDirect: boolean;
    relationType?: ConceptRelationType;
  }>;
  totalPrereqCount: number;
  donePrereqCount: number;
  remainingPrereqCount: number;
  prepMinutes: number;
  directDownstream: Array<{
    concept: KnowledgeConcept;
    type: ConceptRelationType;
    desc?: string;
  }>;
  requirementsUz: string[];
  topicsCoveredUz: string[];
}

export function getKgConceptFullBreakdown(
  conceptId: string,
  knownConceptIds: readonly string[],
  completedLessonIds: readonly string[],
): KgConceptBreakdown | null {
  const concept = getConceptById(conceptId);
  if (!concept) return null;

  const { prereqsOf } = buildPrerequisiteAdjacency(true);
  const ancestors = collectAncestors(concept.id, prereqsOf);
  const sortedAncestors = topologicalSortConcepts(ancestors);

  const knownSet = new Set(knownConceptIds);
  const doneLessonSet = new Set(completedLessonIds);

  const isConceptDone = (c: KnowledgeConcept) =>
    knownSet.has(c.id) || c.crossTrackLessonLinks.some((l) => doneLessonSet.has(l.lessonId));

  const directEdgeBySource = new Map<string, ConceptRelationType>();
  for (const r of CONCEPT_RELATIONS) {
    if (
      r.target === concept.id &&
      (r.type === "REQUIRES" || r.type === "RECOMMENDED_BEFORE" || r.type === "EXTENDS")
    ) {
      directEdgeBySource.set(r.source, r.type);
    }
  }

  const orderedPrereqChain = sortedAncestors.map((c) => ({
    concept: c,
    isDone: isConceptDone(c),
    isDirect: directEdgeBySource.has(c.id),
    relationType: directEdgeBySource.get(c.id),
  }));

  const donePrereqCount = orderedPrereqChain.filter((x) => x.isDone).length;
  const totalPrereqCount = orderedPrereqChain.length;
  const remainingPrereqCount = totalPrereqCount - donePrereqCount;
  const prepMinutes = orderedPrereqChain
    .filter((x) => !x.isDone)
    .reduce((sum, x) => sum + (x.concept.estimatedMinutes ?? 30), 0);

  const directDownstream: KgConceptBreakdown["directDownstream"] = [];
  for (const r of CONCEPT_RELATIONS) {
    if (r.source === concept.id) {
      const tgt = getConceptById(r.target);
      if (tgt) {
        directDownstream.push({ concept: tgt, type: r.type, desc: r.descriptionUz });
      }
    }
  }

  // Pull matching curated Global Node syllabus if mapped, otherwise synthesize crisp explicit items
  const matchedGlobalNode = GLOBAL_ROADMAP_NODES.find((g) => g.canonicalConceptId === concept.id);
  const matchedSyllabus = matchedGlobalNode ? GLOBAL_NODE_SYLLABUS[matchedGlobalNode.id] : undefined;

  const requirementsUz = matchedSyllabus?.requirementsUz ?? [
    ...(orderedPrereqChain.filter((x) => x.isDirect).length > 0
      ? orderedPrereqChain
          .filter((x) => x.isDirect)
          .map((x) => `${x.concept.nameUz} (${x.concept.name}) asoslarini bilish`)
      : ["Boshlang'ich mantiqiy tafakkur va Python bilan ishlash ko'nikmasi"]),
    ...(concept.formula ? ["Asosiy matematik ifodalar va tenglamalarni o'qiy olish"] : []),
    ...(concept.codeSnippet ? [`${concept.codeSnippet.language} muhitida oddiy kod yurgiza olish`] : []),
  ];

  const topicsCoveredUz = matchedSyllabus?.topicsCoveredUz ?? [
    concept.summaryUz,
    ...concept.crossTrackLessonLinks.map((l) => `${l.title} (${l.lessonId})`),
    ...(concept.formula ? [`Matematik formula va tahlil: ${concept.formula.explanationUz}`] : []),
    ...(concept.codeSnippet ? [`Amaliy kod: ${concept.codeSnippet.explanationUz}`] : []),
    concept.keyTakeawayUz,
  ];

  return {
    concept,
    orderedPrereqChain,
    totalPrereqCount,
    donePrereqCount,
    remainingPrereqCount,
    prepMinutes,
    directDownstream,
    requirementsUz,
    topicsCoveredUz,
  };
}
