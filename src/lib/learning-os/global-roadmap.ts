/**
 * AI Atlas Learning OS — Unified Global Prerequisite-Based Roadmap (Section 6)
 *
 * Connects all courses, canonical MDX lessons, 16 Deep Learning architectures,
 * Hugging Face LLM Course modules, labs, and capstone projects into ONE coherent
 * 10-stage prerequisite graph with track overlays across 10 career branches.
 *
 * Never locks advanced topics automatically — exposes "Recommended before this" warnings.
 */

export type GlobalStageId =
  | "stage-1-programming"
  | "stage-2-math"
  | "stage-3-data"
  | "stage-4-classical-ml"
  | "stage-5-deep-learning"
  | "stage-6-architectures"
  | "stage-7-transformers"
  | "stage-8-llms"
  | "stage-9-genai"
  | "stage-10-production";

export type CareerBranchId =
  | "all"
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "data-engineer"
  | "llm-engineer"
  | "rag-engineer"
  | "agent-mcp"
  | "local-ai"
  | "multimodal"
  | "python-dev";

export interface GlobalStageMeta {
  id: GlobalStageId;
  order: number;
  titleUz: string;
  titleEn: string;
  subtitleUz: string;
  colorClass: string;
}

export interface GlobalRoadmapNode {
  id: string;
  canonicalConceptId: string;
  stageId: GlobalStageId;
  orderInStage: number;
  titleUz: string;
  titleEn: string;
  whyItMattersUz: string;
  requiredPrerequisites: string[];
  recommendedPrerequisites: string[];
  relatedConcepts: string[];
  associatedLessons: Array<{
    id: string;
    label: string;
    href: string;
    source: "mdx" | "python-dev" | "ai-eng" | "ml-ds" | "hf-llm" | "dl-16" | "nn-learn" | "stanford-cme295" | "data-eng" | "prompt-eng";
  }>;
  relatedLabs: Array<{
    id: string;
    titleUz: string;
    href: string;
  }>;
  associatedProjects: string[];
  availableTracks: CareerBranchId[];
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const CAREER_BRANCHES: ReadonlyArray<{
  id: CareerBranchId;
  label: string;
  shortLabel: string;
  descriptionUz: string;
}> = [
  { id: "all", label: "Barcha Yo'nalishlar (Umumiy)", shortLabel: "Umumiy", descriptionUz: "AI Atlas ekotizimidagi barcha 10 ta bosqich va to'liq bilim xaritasi." },
  { id: "ai-engineer", label: "AI Engineer", shortLabel: "AI Eng", descriptionUz: "LLM ilovalar, RAG, ReAct Agentlar, MCP va Production tizimlari." },
  { id: "ml-engineer", label: "ML Engineer", shortLabel: "ML Eng", descriptionUz: "Matematik asos, Klassik ML, Deep Learning, PyTorch va MLOps." },
  { id: "data-scientist", label: "Data Scientist", shortLabel: "Data Sci", descriptionUz: "Python, SQL, Pandas/Polars, EDA, statistika va A/B testlar." },
  { id: "data-engineer", label: "Data Engineer", shortLabel: "Data Eng", descriptionUz: "ETL vs ELT, Lakehouse, Kafka, Spark va RAG data ingestion." },
  { id: "llm-engineer", label: "LLM Engineer", shortLabel: "LLM Eng", descriptionUz: "Transformerlar, Tokenizatsiya, Pre-training, LoRA/QLoRA va Alignment." },
  { id: "rag-engineer", label: "RAG Engineer", shortLabel: "RAG Eng", descriptionUz: "Embeddings, Vektor bazalar, Hybrid Search, Reranking va Hit@k/MRR." },
  { id: "agent-mcp", label: "AI Agent / MCP Engineer", shortLabel: "Agent/MCP", descriptionUz: "Function Calling, ReAct sikli, Xotira va Model Context Protocol." },
  { id: "local-ai", label: "Local AI Engineer", shortLabel: "Local AI", descriptionUz: "GGUF kvantlash, VRAM hisob-kitobi, Ollama, llama.cpp va vLLM." },
  { id: "multimodal", label: "Multimodal AI Engineer", shortLabel: "Multimodal", descriptionUz: "CNN, Vision-Language, Audio/Speech va ko'p modalli modellar." },
  { id: "python-dev", label: "Python Developer", shortLabel: "Python Dev", descriptionUz: "Python sintaksisi, xotira, OOP, AsyncIO, FastAPI va Unit Testing." },
];

export const GLOBAL_STAGES: readonly GlobalStageMeta[] = [
  { id: "stage-1-programming", order: 1, titleUz: "1. Dasturlash Poydevori", titleEn: "Programming Fundamentals", subtitleUz: "Python, xotira semantikasi, funksiyalar, OOP va AsyncIO", colorClass: "border-amber-500/40 bg-amber-950/20 text-amber-300" },
  { id: "stage-2-math", order: 2, titleUz: "2. Matematika Poydevori", titleEn: "Mathematics Foundations", subtitleUz: "Vektorlar, matritsalar, hosila, gradient va ehtimollar", colorClass: "border-cyan-500/40 bg-cyan-950/20 text-cyan-300" },
  { id: "stage-3-data", order: 3, titleUz: "3. Ma'lumotlar Bilan Ishlash", titleEn: "Data Handling & Engineering", subtitleUz: "NumPy, Pandas, SQL, EDA va ETL vs ELT quvurlari", colorClass: "border-sky-500/40 bg-sky-950/20 text-sky-300" },
  { id: "stage-4-classical-ml", order: 4, titleUz: "4. Klassik Machine Learning", titleEn: "Machine Learning", subtitleUz: "Regressiya, Gradient Descent, Daraxtlar, XGBoost va Baholash", colorClass: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300" },
  { id: "stage-5-deep-learning", order: 5, titleUz: "5. Deep Learning Asoslari", titleEn: "Deep Learning", subtitleUz: "Perceptron, MLP, Backpropagation, Optimizers (SGD/Adam) va BatchNorm", colorClass: "border-orange-500/40 bg-orange-950/20 text-orange-300" },
  { id: "stage-6-architectures", order: 6, titleUz: "6. Neyron Tarmoq Arxitekturalari (16)", titleEn: "Neural Network Architectures", subtitleUz: "CNN, ResNet, Word Embeddings, RNN, LSTM, GRU, Seq2Seq va Attention", colorClass: "border-amber-500/40 bg-amber-950/25 text-amber-200" },
  { id: "stage-7-transformers", order: 7, titleUz: "7. Transformers va Diqqat Mexanizmi", titleEn: "Transformers", subtitleUz: "Self-Attention (Q, K, V), Multi-Head Attention, BERT va GPT", colorClass: "border-violet-500/40 bg-violet-950/20 text-violet-300" },
  { id: "stage-8-llms", order: 8, titleUz: "8. Katta Til Modellari (LLM & HF)", titleEn: "Language Models", subtitleUz: "Tokenization (BPE), Embeddings, Hugging Face LLM Course va LoRA/GRPO", colorClass: "border-fuchsia-500/40 bg-fuchsia-950/20 text-fuchsia-300" },
  { id: "stage-9-genai", order: 9, titleUz: "9. Generative AI Muhandisligi", titleEn: "Generative AI Engineering", subtitleUz: "Prompt Sampling, RAG, Hybrid Search, ReAct Agentlar va MCP", colorClass: "border-violet-500/50 bg-indigo-950/25 text-indigo-300" },
  { id: "stage-10-production", order: 10, titleUz: "10. Ilg'or Tizimlar, MoE/Mamba & MLOps", titleEn: "Advanced AI Systems & MLOps", subtitleUz: "Mixture of Experts, Mamba (SSM), FastAPI, Docker, Observability & Capstone", colorClass: "border-emerald-500/50 bg-emerald-950/25 text-emerald-300" },
];

export const GLOBAL_ROADMAP_NODES: readonly GlobalRoadmapNode[] = [
  // Stage 1
  {
    id: "gn-python-basics",
    canonicalConceptId: "python-variables-types",
    stageId: "stage-1-programming",
    orderInStage: 1,
    titleUz: "Python Asoslari, Tiplar va Xotira Modeli",
    titleEn: "Python Basics & Memory Model",
    whyItMattersUz: "Har qanday AI, ML va Data pipeline Python o'zgaruvchilari, xotira havolalari (is vs ==) va toza sintaksisga tayanadi.",
    requiredPrerequisites: [],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-python-functions", "gn-python-oop"],
    associatedLessons: [
      { id: "py-01-01", label: "Python Basics (py-01-01)", href: "/roadmap?tab=python-dev&lesson=py-01-01", source: "python-dev" },
      { id: "hf-00-01-01", label: "HF Setup (Ch.0)", href: "/learn/hugging-face-llm-course?lesson=hf-00-01-01", source: "hf-llm" },
    ],
    relatedLabs: [
      { id: "30-days-py", titleUz: "30 Days of Python (1–3-kunlar)", href: "/practice/python-30-days" },
    ],
    associatedProjects: ["CSV Validator CLI (12-Week D01)"],
    availableTracks: ["all", "python-dev", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "llm-engineer", "rag-engineer", "agent-mcp", "local-ai", "multimodal"],
    estimatedMinutes: 45,
    difficulty: "beginner",
  },
  {
    id: "gn-python-functions",
    canonicalConceptId: "python-functions-scope",
    stageId: "stage-1-programming",
    orderInStage: 2,
    titleUz: "Funksiyalar, Scope, Call Stack va Rekursiya",
    titleEn: "Functions, Scope & Recursion",
    whyItMattersUz: "Modulli kod, PyTorch/FastAPI interfeyslari hamda AI Agent Tool Calling funksiyalari aynan shu tamoyil ustiga quriladi.",
    requiredPrerequisites: ["gn-python-basics"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-python-oop", "gn-agents-tools"],
    associatedLessons: [
      { id: "py-06-01", label: "Funksiyalar (py-06-01)", href: "/roadmap?tab=python-dev&lesson=py-06-01", source: "python-dev" },
      { id: "py-10-10", label: "Recursion Call Stack (py-10-10)", href: "/roadmap?tab=python-dev&lesson=py-10-10", source: "python-dev" },
    ],
    relatedLabs: [
      { id: "python-functions-lab", titleUz: "Call Stack & Rekursiya Laboratoriyasi", href: "/roadmap?tab=python-dev&lesson=py-10-10" },
    ],
    associatedProjects: ["Algoritmik Qidiruv Moduli"],
    availableTracks: ["all", "python-dev", "ai-engineer", "ml-engineer", "data-scientist", "data-engineer", "llm-engineer", "agent-mcp"],
    estimatedMinutes: 50,
    difficulty: "beginner",
  },
  {
    id: "gn-python-oop",
    canonicalConceptId: "python-oop",
    stageId: "stage-1-programming",
    orderInStage: 3,
    titleUz: "OOP, AsyncIO va FastAPI Servislar",
    titleEn: "OOP, AsyncIO & FastAPI",
    whyItMattersUz: "PyTorch `nn.Module`, Scikit-Learn `BaseEstimator` va LLM API serverlari OOP hamda asinxron (`async/await`) dasturlashga tayanadi.",
    requiredPrerequisites: ["gn-python-functions"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-mlops-prod"],
    associatedLessons: [
      { id: "py-07-01", label: "OOP (py-07-01)", href: "/roadmap?tab=python-dev&lesson=py-07-01", source: "python-dev" },
      { id: "py-16-01", label: "FastAPI (py-16-01)", href: "/roadmap?tab=python-dev&lesson=py-16-01", source: "python-dev" },
    ],
    relatedLabs: [],
    associatedProjects: ["Churn Prediction FastAPI Endpoint"],
    availableTracks: ["all", "python-dev", "ai-engineer", "ml-engineer", "llm-engineer", "agent-mcp", "local-ai"],
    estimatedMinutes: 60,
    difficulty: "intermediate",
  },

  // Stage 2
  {
    id: "gn-vectors-cosine",
    canonicalConceptId: "dot-product-cosine",
    stageId: "stage-2-math",
    orderInStage: 1,
    titleUz: "Vektorlar, Skalyar Ko'paytma va Cosine Similarity",
    titleEn: "Vectors, Dot Product & Cosine Similarity",
    whyItMattersUz: "Semantik qidiruv, RAG retriever va Transformer Attention ballarining matematik yuragi skalyar ko'paytma va kosinus o'xshashligidir.",
    requiredPrerequisites: ["gn-python-basics"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-matrices-tensors", "gn-embeddings", "gn-self-attention"],
    associatedLessons: [
      { id: "vector", label: "Vector (MDX)", href: "/learn/vector", source: "mdx" },
      { id: "12.07", label: "Cosine similarity (12.07)", href: "/roadmap?tab=ai-engineer&lesson=12.07", source: "ai-eng" },
    ],
    relatedLabs: [
      { id: "cosine-similarity-explorer", titleUz: "2D Cosine Similarity Simulyatori", href: "/visual-lab/cosine-similarity-explorer" },
    ],
    associatedProjects: ["Semantik Hujjat Qidiruv Tizimi"],
    availableTracks: ["all", "ai-engineer", "ml-engineer", "data-scientist", "llm-engineer", "rag-engineer", "multimodal"],
    estimatedMinutes: 40,
    difficulty: "beginner",
  },
  {
    id: "gn-matrices-tensors",
    canonicalConceptId: "linear-algebra-matrices",
    stageId: "stage-2-math",
    orderInStage: 2,
    titleUz: "Matritsalar, Tenzorlar va Matritsa Amallari",
    titleEn: "Matrices, Tensors & Linear Transforms",
    whyItMattersUz: "Neyron tarmoqning har bir qatlami `Y = XW + b` matritsa ko'paytmasi orqali GPU da parallel bajariladi.",
    requiredPrerequisites: ["gn-vectors-cosine"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-calculus-gradients", "gn-perceptron-mlp"],
    associatedLessons: [
      { id: "matrix", label: "Matrix (MDX)", href: "/learn/matrix", source: "mdx" },
      { id: "matrix-operations", label: "Matrix Operations (MDX)", href: "/learn/matrix-operations", source: "mdx" },
      { id: "tensor", label: "Tensor (MDX)", href: "/learn/tensor", source: "mdx" },
      { id: "nn-12-gpu-matmul-pytorch", label: "GPU & Matrix Multiplication (nn-12)", href: "/learn/how-neural-networks-learn?lesson=nn-12-gpu-matmul-pytorch", source: "nn-learn" },
    ],
    relatedLabs: [
      { id: "function-explorer", titleUz: "Desmos & Funksiya Explorer", href: "/visual-lab/function-explorer" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "ml-engineer", "ai-engineer", "data-scientist", "llm-engineer", "multimodal"],
    estimatedMinutes: 45,
    difficulty: "intermediate",
  },
  {
    id: "gn-calculus-gradients",
    canonicalConceptId: "gradient-multivariate",
    stageId: "stage-2-math",
    orderInStage: 3,
    titleUz: "Hosila, Xususiy Hosila, Chain Rule va Gradient",
    titleEn: "Derivatives, Chain Rule & Gradients",
    whyItMattersUz: "Model o'qitilishi (Backpropagation) xatolikni har bir vaznga nisbatan zanjir qoidasi bilan differensiallashga tayanadi.",
    requiredPrerequisites: ["gn-vectors-cosine"],
    recommendedPrerequisites: ["gn-matrices-tensors"],
    relatedConcepts: ["gn-gradient-descent", "gn-backprop"],
    associatedLessons: [
      { id: "hosila", label: "Hosila (MDX)", href: "/learn/hosila", source: "mdx" },
      { id: "partial-derivative", label: "Partial Derivative (MDX)", href: "/learn/partial-derivative", source: "mdx" },
      { id: "gradient", label: "Gradient (MDX)", href: "/learn/gradient", source: "mdx" },
      { id: "chain-rule", label: "Chain Rule (MDX)", href: "/learn/chain-rule", source: "mdx" },
      { id: "mlds-11-04", label: "Hosila (mlds-11-04)", href: "/roadmap?tab=ml-engineer&lesson=mlds-11-04", source: "ml-ds" },
      { id: "nn-06-derivatives-chain-rule", label: "Derivatives & Chain Rule (nn-06)", href: "/learn/how-neural-networks-learn?lesson=nn-06-derivatives-chain-rule", source: "nn-learn" },
    ],
    relatedLabs: [
      { id: "function-explorer", titleUz: "Funksiya va Hosila Grafigi", href: "/visual-lab/function-explorer" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "ml-engineer", "llm-engineer", "multimodal"],
    estimatedMinutes: 55,
    difficulty: "intermediate",
  },
  {
    id: "gn-probability-stats",
    canonicalConceptId: "probability-distributions",
    stageId: "stage-2-math",
    orderInStage: 4,
    titleUz: "Ehtimollik, O'rtacha (Mean) va Dispersiya",
    titleEn: "Probability, Mean & Standard Deviation",
    whyItMattersUz: "Softmax ehtimolliklari, Batch Normalization, Cross-Entropy Loss va A/B testlash statistikasi aynan shu poydevorga tayanadi.",
    requiredPrerequisites: [],
    recommendedPrerequisites: ["gn-python-basics"],
    relatedConcepts: ["gn-eda-analytics", "gn-prompt-sampling"],
    associatedLessons: [
      { id: "probability", label: "Probability (MDX)", href: "/learn/probability", source: "mdx" },
      { id: "mean", label: "Mean (MDX)", href: "/learn/mean", source: "mdx" },
      { id: "standard-deviation", label: "Standard Deviation (MDX)", href: "/learn/standard-deviation", source: "mdx" },
    ],
    relatedLabs: [],
    associatedProjects: ["A/B Test & CUPED Simulator"],
    availableTracks: ["all", "data-scientist", "ml-engineer", "ai-engineer", "llm-engineer"],
    estimatedMinutes: 40,
    difficulty: "beginner",
  },

  // Stage 3
  {
    id: "gn-numpy-pandas",
    canonicalConceptId: "numpy-vectorization",
    stageId: "stage-3-data",
    orderInStage: 1,
    titleUz: "NumPy Vektorlash (Broadcasting) va Pandas / SQL",
    titleEn: "NumPy Broadcasting, Pandas & SQL",
    whyItMattersUz: "Katta jadvallar va tensor shakllarini xatosiz qayta ishlash ma'lumotlar muhandisligi va ML tayyorgarligining asosidir.",
    requiredPrerequisites: ["gn-python-basics"],
    recommendedPrerequisites: ["gn-matrices-tensors"],
    relatedConcepts: ["gn-eda-analytics", "gn-etl-elt"],
    associatedLessons: [
      { id: "mlds-04-09", label: "Broadcasting qoidalari (mlds-04-09)", href: "/roadmap?tab=data-scientist&lesson=mlds-04-09", source: "ml-ds" },
    ],
    relatedLabs: [
      { id: "pandas-agg", titleUz: "Pandas GroupBy & Aggregation Lab", href: "/roadmap?tab=data-scientist&phase=ds-07" },
    ],
    associatedProjects: ["Dataset EDA & 20 SQL Query Notebook"],
    availableTracks: ["all", "data-scientist", "data-engineer", "ml-engineer", "python-dev"],
    estimatedMinutes: 50,
    difficulty: "beginner",
  },
  {
    id: "gn-etl-elt",
    canonicalConceptId: "sql-relational-databases",
    stageId: "stage-3-data",
    orderInStage: 2,
    titleUz: "Data Engineering: ETL vs ELT, Quarantine va Idempotency",
    titleEn: "ETL vs ELT, Quarantine & Idempotent Pipelines",
    whyItMattersUz: "RAG va ML modellari sifati manbadan keladigan ma'lumotlarning aniqligi, karantin va takrorlanishga chidamliligiga bog'liq.",
    requiredPrerequisites: ["gn-numpy-pandas"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-rag-systems"],
    associatedLessons: [
      { id: "de-11-08", label: "ETL vs ELT (de-11-08)", href: "/roadmap?tab=data-eng&phase=de-11", source: "data-eng" },
    ],
    relatedLabs: [
      { id: "etl-vs-elt", titleUz: "ETL vs ELT Pipeline Lab", href: "/roadmap?tab=data-eng&phase=de-11" },
    ],
    associatedProjects: ["Idempotent Orders Pipeline (Quarantine & SCD2)"],
    availableTracks: ["all", "data-engineer", "ai-engineer", "rag-engineer"],
    estimatedMinutes: 45,
    difficulty: "intermediate",
  },
  {
    id: "gn-eda-analytics",
    canonicalConceptId: "exploratory-data-analysis",
    stageId: "stage-3-data",
    orderInStage: 3,
    titleUz: "EDA, A/B Testlash va CUPED Dispersiya Qisqartirish",
    titleEn: "EDA, A/B Testing & CUPED",
    whyItMattersUz: "Model yoki mahsulot o'zgarishining haqiqiy ta'sirini ilmiy isbotlash uchun ishonch oralig'i va p-qiymat tekshiruvi zarur.",
    requiredPrerequisites: ["gn-probability-stats", "gn-numpy-pandas"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-classical-ml"],
    associatedLessons: [
      { id: "mlds-14-01", label: "Statistik Tahlil (mlds-14-01)", href: "/roadmap?tab=data-scientist&lesson=mlds-14-01", source: "ml-ds" },
    ],
    relatedLabs: [
      { id: "ab-cuped", titleUz: "A/B & CUPED Eksperiment Simulyatori", href: "/roadmap?tab=data-scientist" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "data-scientist", "ml-engineer"],
    estimatedMinutes: 45,
    difficulty: "intermediate",
  },

  // Stage 4
  {
    id: "gn-classical-ml",
    canonicalConceptId: "supervised-learning-foundations",
    stageId: "stage-4-classical-ml",
    orderInStage: 1,
    titleUz: "Klassik ML, Regressiya, Loss Functions va Data Leakage",
    titleEn: "Classical ML, Regression & Loss Functions",
    whyItMattersUz: "Nazorat ostida va nazoratsiz o'qitish, Train/Test ajratish va yo'qotish funksiyalari barcha AI modellarining umumiy mantiqidir.",
    requiredPrerequisites: ["gn-numpy-pandas", "gn-probability-stats"],
    recommendedPrerequisites: ["gn-eda-analytics"],
    relatedConcepts: ["gn-gradient-descent", "gn-perceptron-mlp"],
    associatedLessons: [
      { id: "machine-learning", label: "Machine Learning (MDX)", href: "/learn/machine-learning", source: "mdx" },
      { id: "loss-functions", label: "Loss Functions (MDX)", href: "/learn/loss-functions", source: "mdx" },
      { id: "mlds-01-01", label: "AI / ML / DL (mlds-01-01)", href: "/roadmap?tab=ml-engineer&lesson=mlds-01-01", source: "ml-ds" },
      { id: "nn-05-loss-functions", label: "Loss Functions: MSE & Cross-Entropy (nn-05)", href: "/learn/how-neural-networks-learn?lesson=nn-05-loss-functions", source: "nn-learn" },
      { id: "nn-11-overfitting-regularization", label: "Overfitting & Early Stopping (nn-11)", href: "/learn/how-neural-networks-learn?lesson=nn-11-overfitting-regularization", source: "nn-learn" },
    ],
    relatedLabs: [
      { id: "regression-lab", titleUz: "Regression & Threshold Lab", href: "/roadmap?tab=ml-engineer&phase=mle-08" },
    ],
    associatedProjects: ["Portfolio #1: Customer Churn Model + FastAPI"],
    availableTracks: ["all", "ml-engineer", "data-scientist", "ai-engineer"],
    estimatedMinutes: 60,
    difficulty: "beginner",
  },
  {
    id: "gn-gradient-descent",
    canonicalConceptId: "gradient-descent-optimizers",
    stageId: "stage-4-classical-ml",
    orderInStage: 2,
    titleUz: "Gradient Descent, Learning Rate, SGD va AdamW",
    titleEn: "Gradient Descent, LR, SGD & AdamW",
    whyItMattersUz: "Neyron tarmoq va klassik modellar parametrlarini qadam-baqadam minimumga tushirish algoritmlari.",
    requiredPrerequisites: ["gn-calculus-gradients", "gn-classical-ml"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-backprop"],
    associatedLessons: [
      { id: "gradient-descent", label: "Gradient Descent (MDX)", href: "/learn/gradient-descent", source: "mdx" },
      { id: "learning-rate", label: "Learning Rate (MDX)", href: "/learn/learning-rate", source: "mdx" },
      { id: "sgd", label: "SGD (MDX)", href: "/learn/sgd", source: "mdx" },
      { id: "adam", label: "Adam / AdamW (MDX)", href: "/learn/adam", source: "mdx" },
      { id: "mlds-11-13", label: "Gradient Descent (mlds-11-13)", href: "/roadmap?tab=ml-engineer&lesson=mlds-11-13", source: "ml-ds" },
      { id: "nn-08-gradient-descent-optimizers", label: "Gradient Descent & Optimizers (nn-08)", href: "/learn/how-neural-networks-learn?lesson=nn-08-gradient-descent-optimizers", source: "nn-learn" },
      { id: "nn-09-learning-rate", label: "Learning Rate (nn-09)", href: "/learn/how-neural-networks-learn?lesson=nn-09-learning-rate", source: "nn-learn" },
      { id: "nn-10-batch-epoch", label: "Batch, Mini-Batch & Epoch (nn-10)", href: "/learn/how-neural-networks-learn?lesson=nn-10-batch-epoch", source: "nn-learn" },
    ],
    relatedLabs: [
      { id: "gradient-descent-1d", titleUz: "1D Gradient Descent Lab", href: "/visual-lab/gradient-descent-1d" },
    ],
    associatedProjects: ["NumPy Linear/Logistic Regression with LR Analysis"],
    availableTracks: ["all", "ml-engineer", "llm-engineer", "multimodal"],
    estimatedMinutes: 55,
    difficulty: "intermediate",
  },

  // Stage 5
  {
    id: "gn-backprop",
    canonicalConceptId: "backpropagation-autograd",
    stageId: "stage-5-deep-learning",
    orderInStage: 1,
    titleUz: "Deep Learning, Backpropagation va Batch Normalization",
    titleEn: "Deep Learning, Backprop & BatchNorm",
    whyItMattersUz: "Chuqur ko'p qatlamli neyron tarmoqlarda xatolikni teskari tarqatish (Autograd) va barqaror o'qitish mexanizmi.",
    requiredPrerequisites: ["gn-gradient-descent", "gn-matrices-tensors"],
    recommendedPrerequisites: ["gn-calculus-gradients"],
    relatedConcepts: ["gn-perceptron-mlp", "gn-cnn-resnet"],
    associatedLessons: [
      { id: "deep-learning", label: "Deep Learning (MDX)", href: "/learn/deep-learning", source: "mdx" },
      { id: "backpropagation", label: "Backpropagation (MDX)", href: "/learn/backpropagation", source: "mdx" },
      { id: "batch-normalization", label: "Batch Normalization (MDX)", href: "/learn/batch-normalization", source: "mdx" },
      { id: "nn-07-backpropagation", label: "Backpropagation vs Optimizer (nn-07)", href: "/learn/how-neural-networks-learn?lesson=nn-07-backpropagation", source: "nn-learn" },
    ],
    relatedLabs: [
      { id: "neural-network-explorer", titleUz: "Neyron Tarmoq Forward Pass Lab", href: "/visual-lab/neural-network-explorer" },
    ],
    associatedProjects: ["PyTorch Checkpoint & Inference Pipeline"],
    availableTracks: ["all", "ml-engineer", "llm-engineer", "multimodal"],
    estimatedMinutes: 60,
    difficulty: "intermediate",
  },

  // Stage 6 (16 Architectures integration!)
  {
    id: "gn-perceptron-mlp",
    canonicalConceptId: "neural-networks-perceptrons",
    stageId: "stage-6-architectures",
    orderInStage: 1,
    titleUz: "1–2. Perceptron (1958) va MLP (1986) — 1-Savol",
    titleEn: "Perceptron & MLP: What Can One Neuron Learn?",
    whyItMattersUz: "Bitta neyronning chiziqli chegarasidan ko'p qatlamli tarmoq va Backpropagation orqali XOR yechimiga o'tish.",
    requiredPrerequisites: ["gn-backprop"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-cnn-resnet", "gn-seq-models"],
    associatedLessons: [
      { id: "dl-16-perceptron", label: "Perceptron & MLP (16 Arxitektura)", href: "/learn/deep-learning-architectures", source: "dl-16" },
      { id: "nn-01-neuron-weight-bias", label: "Artificial Neuron: Weight & Bias (nn-01)", href: "/learn/how-neural-networks-learn?lesson=nn-01-neuron-weight-bias", source: "nn-learn" },
      { id: "nn-02-activation-functions", label: "Activation: ReLU, Sigmoid, Tanh (nn-02)", href: "/learn/how-neural-networks-learn?lesson=nn-02-activation-functions", source: "nn-learn" },
      { id: "nn-03-architecture-layers", label: "Neural Network Layers (nn-03)", href: "/learn/how-neural-networks-learn?lesson=nn-03-architecture-layers", source: "nn-learn" },
      { id: "nn-04-forward-pass", label: "Forward Propagation & Softmax (nn-04)", href: "/learn/how-neural-networks-learn?lesson=nn-04-forward-pass", source: "nn-learn" },
    ],
    relatedLabs: [
      { id: "dl-16-map", titleUz: "16 Arxitektura Interaktiv Xaritasi", href: "/learn/deep-learning-architectures" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "ml-engineer", "llm-engineer", "multimodal"],
    estimatedMinutes: 40,
    difficulty: "beginner",
  },
  {
    id: "gn-cnn-resnet",
    canonicalConceptId: "dl-cnn",
    stageId: "stage-6-architectures",
    orderInStage: 2,
    titleUz: "3–4. CNN (1998) va ResNet (2015) — 2-Savol (Tasvir)",
    titleEn: "CNN & ResNet: How Do We Look at a Picture?",
    whyItMattersUz: "Konvolyutsiya filtrlari bilan fazoviy naqshlarni aniqlash va Residual Skip Connection ($F(x)+x$) orqali 152+ qatlamni o'qitish.",
    requiredPrerequisites: ["gn-perceptron-mlp"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-seq-models"],
    associatedLessons: [
      { id: "cnn", label: "CNN (MDX)", href: "/learn/cnn", source: "mdx" },
      { id: "dl-16-resnet", label: "CNN & ResNet (16 Arxitektura)", href: "/learn/deep-learning-architectures", source: "dl-16" },
    ],
    relatedLabs: [
      { id: "dl-16-map", titleUz: "CNN & ResNet Vektor Sxemalari", href: "/learn/deep-learning-architectures" },
    ],
    associatedProjects: ["Tasvir Klassifikatori (CNN / ResNet)"],
    availableTracks: ["all", "multimodal", "ml-engineer"],
    estimatedMinutes: 50,
    difficulty: "intermediate",
  },
  {
    id: "gn-seq-models",
    canonicalConceptId: "dl-lstm",
    stageId: "stage-6-architectures",
    orderInStage: 3,
    titleUz: "5–10. Embeddings, RNN, LSTM, GRU, Seq2Seq & Attention — 3–4-Savollar",
    titleEn: "Sequence Models & Additive Attention (1990–2014)",
    whyItMattersUz: "Matnni ketma-ket o'qish, Vanishing Gradient ni eshiklar (CEC) bilan yengish va Encoder-Decoder da Bottleneck muammosini Attention bilan hal qilish.",
    requiredPrerequisites: ["gn-perceptron-mlp"],
    recommendedPrerequisites: ["gn-vectors-cosine"],
    relatedConcepts: ["gn-self-attention"],
    associatedLessons: [
      { id: "rnn", label: "RNN (MDX)", href: "/learn/rnn", source: "mdx" },
      { id: "lstm", label: "LSTM (MDX)", href: "/learn/lstm", source: "mdx" },
      { id: "dl-16-seq", label: "Arxitekturalar 5–10 (Word2Vec..Attention)", href: "/learn/deep-learning-architectures", source: "dl-16" },
    ],
    relatedLabs: [
      { id: "dl-16-map", titleUz: "RNN / LSTM / Seq2Seq / Attention Sxemalari", href: "/learn/deep-learning-architectures" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "llm-engineer", "ml-engineer", "ai-engineer", "multimodal"],
    estimatedMinutes: 65,
    difficulty: "intermediate",
  },

  // Stage 7
  {
    id: "gn-self-attention",
    canonicalConceptId: "attention-mechanism",
    stageId: "stage-7-transformers",
    orderInStage: 1,
    titleUz: "11–14. Self-Attention, Transformer, BERT & GPT — 5-Savol",
    titleEn: "Self-Attention, Transformer, BERT & GPT",
    whyItMattersUz: "Barcha so'zlar bir vaqtda bir-biriga $O(1)$ parallel qarashi, Encoder-only (BERT) tushunish va Causal Decoder (GPT) generatsiyasi.",
    requiredPrerequisites: ["gn-seq-models", "gn-vectors-cosine"],
    recommendedPrerequisites: ["gn-matrices-tensors"],
    relatedConcepts: ["gn-tokenization", "gn-embeddings"],
    associatedLessons: [
      { id: "transformers", label: "Transformers (MDX • 20 mikro-qadam)", href: "/learn/transformers", source: "mdx" },
      { id: "hf-01-04-02", label: "HF Ch.1 Attention & Transformer", href: "/learn/hugging-face-llm-course?lesson=hf-01-04-02", source: "hf-llm" },
      { id: "dl-16-transformer", label: "Self-Attention, Transformer, BERT, GPT", href: "/learn/deep-learning-architectures", source: "dl-16" },
      { id: "tr-03-self-attention-qkv", label: "Q/K/V Self-Attention (CME 295)", href: "/learn/transformers-cme295?lesson=tr-03-self-attention-qkv", source: "stanford-cme295" },
      { id: "tr-04-transformer-architecture", label: "Encoder-Decoder & Multi-Head (CME 295)", href: "/learn/transformers-cme295?lesson=tr-04-transformer-architecture", source: "stanford-cme295" },
      { id: "tr-05-bert-vs-gpt", label: "BERT vs GPT (CME 295)", href: "/learn/transformers-cme295?lesson=tr-05-bert-vs-gpt", source: "stanford-cme295" },
      { id: "tr-07-rope-gqa-rmsnorm", label: "RoPE, GQA & RMSNorm (CME 295)", href: "/learn/transformers-cme295?lesson=tr-07-rope-gqa-rmsnorm", source: "stanford-cme295" },
      { id: "tr-16-flashattention-hbm-sram", label: "FlashAttention & HBM/SRAM (CME 295)", href: "/learn/transformers-cme295?lesson=tr-16-flashattention-hbm-sram", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "self-attention-explorer", titleUz: "Q/K/V Self-Attention Heatmap Lab", href: "/visual-lab/self-attention-explorer" },
    ],
    associatedProjects: ["O'zbekcha Semantik Qidiruv & Kichik GPT"],
    availableTracks: ["all", "ai-engineer", "llm-engineer", "ml-engineer", "multimodal"],
    estimatedMinutes: 75,
    difficulty: "advanced",
  },

  // Stage 8
  {
    id: "gn-tokenization",
    canonicalConceptId: "tokenization-bpe",
    stageId: "stage-8-llms",
    orderInStage: 1,
    titleUz: "Tokenization, BPE, Padding va Attention Mask",
    titleEn: "Tokenization, Padding & Attention Mask",
    whyItMattersUz: "Har bir til modeli matnni subword tokenlarga bo'ladi; noto'g'ri padding/masking model chiqishini buzadi.",
    requiredPrerequisites: ["gn-self-attention"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-embeddings", "gn-hf-finetuning"],
    associatedLessons: [
      { id: "tokenization", label: "Tokenization (MDX)", href: "/learn/tokenization", source: "mdx" },
      { id: "hf-02-05-01", label: "HF Ch.2 Padding & Attention Mask", href: "/learn/hugging-face-llm-course?lesson=hf-02-05-01", source: "hf-llm" },
      { id: "hf-06-06-02", label: "HF Ch.6 BPE Merge Algorithm", href: "/learn/hugging-face-llm-course?lesson=hf-06-06-02", source: "hf-llm" },
      { id: "tr-01-tokenization-bpe", label: "Tokenization & BPE Tradeoff (CME 295)", href: "/learn/transformers-cme295?lesson=tr-01-tokenization-bpe", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "token-padding-lab", titleUz: "Tokenizer & Attention Mask Lab", href: "/learn/hugging-face-llm-course?lesson=hf-02-05-01" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "ai-engineer", "llm-engineer", "rag-engineer", "local-ai"],
    estimatedMinutes: 45,
    difficulty: "intermediate",
  },
  {
    id: "gn-embeddings",
    canonicalConceptId: "embeddings-vector-spaces",
    stageId: "stage-8-llms",
    orderInStage: 2,
    titleUz: "Embeddings, Vektor Fazosi va Vektor Bazalari",
    titleEn: "Embeddings & Vector Databases",
    whyItMattersUz: "Hujjat ma'nolarini raqamli vektorlarga aylantirib, millionlab parchalardan eng yaqinini millisekundlarda topish.",
    requiredPrerequisites: ["gn-vectors-cosine", "gn-tokenization"],
    recommendedPrerequisites: [],
    relatedConcepts: ["gn-rag-systems"],
    associatedLessons: [
      { id: "embeddings", label: "Embeddings (MDX)", href: "/learn/embeddings", source: "mdx" },
      { id: "13.01", label: "Vektor Bazalari (AI Eng Phase 13)", href: "/roadmap?tab=ai-engineer&phase=13", source: "ai-eng" },
      { id: "tr-02-embeddings-rnn-limits", label: "Embeddings, Word2Vec & RNN Limits (CME 295)", href: "/learn/transformers-cme295?lesson=tr-02-embeddings-rnn-limits", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "cosine-similarity-explorer", titleUz: "Embedding Space & Cosine Lab", href: "/visual-lab/cosine-similarity-explorer" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "ai-engineer", "rag-engineer", "llm-engineer", "data-scientist"],
    estimatedMinutes: 45,
    difficulty: "intermediate",
  },
  {
    id: "gn-hf-finetuning",
    canonicalConceptId: "fine-tuning-lora-peft",
    stageId: "stage-8-llms",
    orderInStage: 3,
    titleUz: "Hugging Face Fine-Tuning, LoRA/QLoRA va GRPO Alignment",
    titleEn: "Fine-Tuning, LoRA/QLoRA & RL Alignment",
    whyItMattersUz: "Katta modellarni kam VRAM bilan maxsus vazifalarga moslash (PEFT) va mukofot signallari (GRPO) bilan fikrlashini yaxshilash.",
    requiredPrerequisites: ["gn-self-attention", "gn-tokenization"],
    recommendedPrerequisites: ["gn-gradient-descent"],
    relatedConcepts: ["gn-moe-mamba"],
    associatedLessons: [
      { id: "hf-03-01-01", label: "HF Ch.3 Trainer Fine-Tuning", href: "/learn/hugging-face-llm-course?lesson=hf-03-01-01", source: "hf-llm" },
      { id: "hf-11-04-02", label: "HF Ch.11 LoRA & QLoRA", href: "/learn/hugging-face-llm-course?lesson=hf-11-04-02", source: "hf-llm" },
      { id: "hf-12-04-02", label: "HF Ch.12 Open R1 GRPO", href: "/learn/hugging-face-llm-course?lesson=hf-12-04-02", source: "hf-llm" },
      { id: "tr-09-pretraining-data-bpb", label: "Pre-Training, Teacher Forcing & BPB (CME 295)", href: "/learn/transformers-cme295?lesson=tr-09-pretraining-data-bpb", source: "stanford-cme295" },
      { id: "tr-10-midtraining-yarn-sft", label: "Mid-Training YaRN & SFT/LoRA (CME 295)", href: "/learn/transformers-cme295?lesson=tr-10-midtraining-yarn-sft", source: "stanford-cme295" },
      { id: "tr-11-alignment-rlhf-dpo", label: "RLHF (Bradley-Terry) & DPO (CME 295)", href: "/learn/transformers-cme295?lesson=tr-11-alignment-rlhf-dpo", source: "stanford-cme295" },
      { id: "tr-12-reasoning-grpo-distill", label: "Reasoning GRPO & On-Policy Distillation (CME 295)", href: "/learn/transformers-cme295?lesson=tr-12-reasoning-grpo-distill", source: "stanford-cme295" },
      { id: "tr-13-rl-policy-gradient", label: "RL Policy Gradient & Importance Sampling (CME 295)", href: "/learn/transformers-cme295?lesson=tr-13-rl-policy-gradient", source: "stanford-cme295" },
      { id: "tr-14-ppo-vs-grpo", label: "PPO vs GRPO/DAPO Clip & KL (CME 295)", href: "/learn/transformers-cme295?lesson=tr-14-ppo-vs-grpo", source: "stanford-cme295" },
      { id: "tr-15-on-policy-distillation", label: "Reverse KL & On-Policy Distillation (CME 295)", href: "/learn/transformers-cme295?lesson=tr-15-on-policy-distillation", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "lora-rank-lab", titleUz: "LoRA Rank & Parameter Savings Lab", href: "/learn/hugging-face-llm-course?lesson=hf-11-04-02" },
    ],
    associatedProjects: ["O'zbekcha QLoRA Fine-Tuning Tajribasi"],
    availableTracks: ["all", "llm-engineer", "ai-engineer", "ml-engineer", "local-ai"],
    estimatedMinutes: 65,
    difficulty: "advanced",
  },

  // Stage 9
  {
    id: "gn-prompt-sampling",
    canonicalConceptId: "prompt-engineering-cot",
    stageId: "stage-9-genai",
    orderInStage: 1,
    titleUz: "Prompt Engineering, Temperature / Top-K / Top-P va Red Teaming",
    titleEn: "Prompt Engineering, Sampling & Security",
    whyItMattersUz: "LLM javobining ijodiyligi, faktik aniqligi va Prompt Injection hujumlaridan himoyasi sampling va chegara dizayniga bog'liq.",
    requiredPrerequisites: ["gn-tokenization"],
    recommendedPrerequisites: ["gn-probability-stats"],
    relatedConcepts: ["gn-rag-systems", "gn-agents-tools"],
    associatedLessons: [
      { id: "prompt-engineering", label: "Prompt Engineering (MDX)", href: "/learn/prompt-engineering", source: "mdx" },
      { id: "pe-06-06", label: "Temperature/Top-K/Top-P (pe-06-06)", href: "/roadmap?tab=prompt-eng&phase=pe-06", source: "prompt-eng" },
      { id: "tr-08-decoding-prompting", label: "Decoding, Batch Invariance & CoT (CME 295)", href: "/learn/transformers-cme295?lesson=tr-08-decoding-prompting", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "sampling-playground", titleUz: "Sampling Playground (T / Top-K / Top-P)", href: "/roadmap?tab=prompt-eng&phase=pe-06" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "ai-engineer", "llm-engineer", "rag-engineer", "agent-mcp"],
    estimatedMinutes: 40,
    difficulty: "beginner",
  },
  {
    id: "gn-rag-systems",
    canonicalConceptId: "rag-retrieval-augmented",
    stageId: "stage-9-genai",
    orderInStage: 2,
    titleUz: "RAG Arxitekturasi, Gibrid Qidiruv (BM25+Vector) va Reranking",
    titleEn: "RAG, Hybrid Search & Reranking",
    whyItMattersUz: "Model hallutsinatsiyalarini kamaytirish va shaxsiy hujjatlardan manbali aniq javob qaytarishning sanoat standarti.",
    requiredPrerequisites: ["gn-embeddings", "gn-prompt-sampling"],
    recommendedPrerequisites: ["gn-etl-elt"],
    relatedConcepts: ["gn-agents-tools"],
    associatedLessons: [
      { id: "rag", label: "RAG (MDX)", href: "/learn/rag", source: "mdx" },
      { id: "14.06", label: "RAG Quvuri & Hit@k (14.06)", href: "/roadmap?tab=ai-engineer&lesson=14.06", source: "ai-eng" },
      { id: "tr-19-rag-hybrid-rerank", label: "Hybrid RAG, Cross-Encoder & NDCG (CME 295)", href: "/learn/transformers-cme295?lesson=tr-19-rag-hybrid-rerank", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "rag-sandbox-explorer", titleUz: "RAG Chunking & Hit@k Sandbox", href: "/visual-lab/rag-sandbox-explorer" },
      { id: "rag-pipeline-flow", titleUz: "RAG Oqim Diagrammasi", href: "/visual-lab/rag-pipeline-flow" },
    ],
    associatedProjects: ["Portfolio #2: O'zbekcha Manbali Lokal RAG Chatbot"],
    availableTracks: ["all", "ai-engineer", "rag-engineer", "llm-engineer", "data-engineer", "local-ai"],
    estimatedMinutes: 70,
    difficulty: "advanced",
  },
  {
    id: "gn-agents-tools",
    canonicalConceptId: "model-context-protocol",
    stageId: "stage-9-genai",
    orderInStage: 3,
    titleUz: "AI Agentlar (ReAct), Function Calling, Memory va MCP",
    titleEn: "ReAct AI Agents, Tool Use & MCP",
    whyItMattersUz: "Til modellarini real dunyo API lari, ma'lumotlar bazalari va tashqi vositalar bilan standart JSON-RPC (MCP) orqali ishlaydigan tizimga aylantirish.",
    requiredPrerequisites: ["gn-prompt-sampling", "gn-python-functions"],
    recommendedPrerequisites: ["gn-rag-systems"],
    relatedConcepts: ["gn-mlops-prod"],
    associatedLessons: [
      { id: "ai-agent", label: "AI Agent (MDX)", href: "/learn/ai-agent", source: "mdx" },
      { id: "tools", label: "Tools (MDX)", href: "/learn/tools", source: "mdx" },
      { id: "memory", label: "Memory (MDX)", href: "/learn/memory", source: "mdx" },
      { id: "17.05", label: "ReAct Loop (17.05)", href: "/roadmap?tab=ai-engineer&lesson=17.05", source: "ai-eng" },
      { id: "19.01", label: "MCP Protokoli (Phase 19)", href: "/roadmap?tab=ai-engineer&phase=19", source: "ai-eng" },
      { id: "tr-20-tools-mcp-caching", label: "Tool Calling, MCP & Prompt Caching (CME 295)", href: "/learn/transformers-cme295?lesson=tr-20-tools-mcp-caching", source: "stanford-cme295" },
      { id: "tr-21-harness-react-memory", label: "Agent Harness, ReAct & Compaction (CME 295)", href: "/learn/transformers-cme295?lesson=tr-21-harness-react-memory", source: "stanford-cme295" },
    ],
    relatedLabs: [],
    associatedProjects: ["Custom FastMCP Server + ReAct Agent"],
    availableTracks: ["all", "ai-engineer", "agent-mcp", "llm-engineer"],
    estimatedMinutes: 65,
    difficulty: "advanced",
  },

  // Stage 10
  {
    id: "gn-moe-mamba",
    canonicalConceptId: "dl-moe",
    stageId: "stage-10-production",
    orderInStage: 1,
    titleUz: "15–16. Mixture of Experts (MoE) va Mamba (Selective SSM) — 6-Savol",
    titleEn: "MoE & Mamba: Scaling Bigger & Reading Longer",
    whyItMattersUz: "MoE siyrak routing bilan FLOPs ni oshirmasdan parametr hajmini oshiradi; Mamba esa Attention dan farqli muqobil Selective State Space arxitekturasi sifatida O(N) vaqt va O(1) inference xotirasini ta'minlaydi.",
    requiredPrerequisites: ["gn-self-attention"],
    recommendedPrerequisites: ["gn-hf-finetuning"],
    relatedConcepts: ["gn-mlops-prod"],
    associatedLessons: [
      { id: "dl-16-moe-mamba", label: "MoE & Mamba (16 Arxitektura)", href: "/learn/deep-learning-architectures", source: "dl-16" },
      { id: "tr-06-scaling-laws-chinchilla", label: "Scaling Laws, Chinchilla & Sparse MoE (CME 295)", href: "/learn/transformers-cme295?lesson=tr-06-scaling-laws-chinchilla", source: "stanford-cme295" },
    ],
    relatedLabs: [
      { id: "dl-16-map", titleUz: "MoE Top-2 Router & Mamba S6 Simulyatori", href: "/learn/deep-learning-architectures" },
    ],
    associatedProjects: [],
    availableTracks: ["all", "llm-engineer", "local-ai", "ml-engineer"],
    estimatedMinutes: 55,
    difficulty: "advanced",
  },
  {
    id: "gn-mlops-prod",
    canonicalConceptId: "production-mlops-serving",
    stageId: "stage-10-production",
    orderInStage: 2,
    titleUz: "Local LLM, Docker, Serving, Evaluation & Observability Capstone",
    titleEn: "Local LLM, Serving, Eval & Production MLOps",
    whyItMattersUz: "Ollama/llama.cpp kvantlash, Docker Compose, Ragas/Locust yuklama testi, Prometheus/Langfuse monitoring va Runbook bilan haqiqiy ishlab chiqarish tizimini yaratish.",
    requiredPrerequisites: ["gn-rag-systems", "gn-python-oop"],
    recommendedPrerequisites: ["gn-agents-tools"],
    relatedConcepts: [],
    associatedLessons: [
      { id: "production-ready-ml-structure", label: "Production ML Tuzilmasi (MDX)", href: "/learn/production-ready-ml-structure", source: "mdx" },
      { id: "production-ml-pipeline", label: "Real Production Pipeline (MDX)", href: "/learn/production-ml-pipeline", source: "mdx" },
      { id: "12weeks-d12", label: "12-Haftalik Capstone & Runbook", href: "/learn/ds-ml-ai-12weeks", source: "mdx" },
      { id: "tr-17-5d-parallelism", label: "5D GPU Parallelism (CME 295)", href: "/learn/transformers-cme295?lesson=tr-17-5d-parallelism", source: "stanford-cme295" },
      { id: "tr-18-inference-roofline-speculative", label: "Roofline, PagedAttention & Speculative Decoding (CME 295)", href: "/learn/transformers-cme295?lesson=tr-18-inference-roofline-speculative", source: "stanford-cme295" },
      { id: "tr-22-metrics-passk-bleu", label: "Cohen's Kappa & Pass@K Evals (CME 295)", href: "/learn/transformers-cme295?lesson=tr-22-metrics-passk-bleu", source: "stanford-cme295" },
      { id: "tr-23-llm-as-judge-biases", label: "LLM-as-a-Judge & Bias Mitigation (CME 295)", href: "/learn/transformers-cme295?lesson=tr-23-llm-as-judge-biases", source: "stanford-cme295" },
      { id: "tr-24-agent-debugging-benchmarks", label: "Agent Debug, Bench Maxing & Goodhart's Law (CME 295)", href: "/learn/transformers-cme295?lesson=tr-24-agent-debugging-benchmarks", source: "stanford-cme295" },
    ],
    relatedLabs: [],
    associatedProjects: ["Portfolio #3: End-to-End Baholangan & Himoyalangan Servis"],
    availableTracks: ["all", "ai-engineer", "ml-engineer", "local-ai", "data-engineer"],
    estimatedMinutes: 80,
    difficulty: "advanced",
  },
];

export function getGlobalNodeById(id: string): GlobalRoadmapNode | undefined {
  return GLOBAL_ROADMAP_NODES.find((n) => n.id === id);
}
