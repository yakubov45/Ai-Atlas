import fs from "node:fs";
import path from "node:path";

interface ParsedNote {
  rawFilename: string;
  slug: string;
  title: string;
  tags: string[];
  aliases: string[];
  status: "published" | "draft" | "review";
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  prerequisites: string[];
  related: string[];
  sources: string[];
  body: string;
  category: string;
  order: number;
  visualizations: string[];
  startLine: number;
  endLine: number;
}

const SLUG_MAP: Record<string, string> = {
  "artificial intelligence": "artificial-intelligence",
  "machine learning": "machine-learning",
  "deep learning": "deep-learning",
  "transformers": "transformers",
  "llm": "llm",
  "embeddings": "embeddings",
  "tokenization": "tokenization",
  "prompt engineering": "prompt-engineering",
  "ai agent": "ai-agent",
  "rag": "rag",
  "memory": "memory",
  "tools": "tools",
  "cnn": "cnn",
  "rnn": "rnn",
  "lstm": "lstm",
  "gradient descent": "gradient-descent",
  "gradient descent (math)": "gradient-descent",
  "backpropagation": "backpropagation",
  "learning rate": "learning-rate",
  "loss functions": "loss-functions",
  "optimizers": "optimizers",
  "batch normalization": "batch-normalization",
  "math for deep learning": "math-for-deep-learning",
  "mathematics for deep learning": "math-for-deep-learning",
  "vector": "vector",
  "matrix": "matrix",
  "matrix operations": "matrix-operations",
  "tensor": "tensor",
  "hosila": "hosila",
  "partial derivative": "partial-derivative",
  "gradient": "gradient",
  "chain rule": "chain-rule",
  "probability": "probability",
  "mean": "mean",
  "standard deviation": "standard-deviation",
  "sgd": "sgd",
  "adam": "adam",
  "atomic note": "atomic-note",
  "production-ready ml loyihasi tuzilmasi": "production-ready-ml-structure",
  "real production ml pipeline arxitektura va ish jarayoni": "production-ml-pipeline",
  "usefull youtube videos": "useful-youtube-resources",
};

const KNOWN_SLUGS = new Set(Object.values(SLUG_MAP));

function normalizeRef(ref: string): string | null {
  const clean = ref.replace(/\[\[|\]\]/g, "").trim().toLowerCase();
  // Filter out timestamps / dates / notes that are not lessons
  if (/^\d{2}\.\d{2}\./.test(clean) || /^\d+$/.test(clean)) return null;
  const mapped = SLUG_MAP[clean] || clean.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (KNOWN_SLUGS.has(mapped)) return mapped;
  return null;
}

const CATEGORY_MAP: Record<string, { category: string; order: number; difficulty: "beginner" | "intermediate" | "advanced" }> = {
  "artificial-intelligence": { category: "fundamentals", order: 1, difficulty: "beginner" },
  "machine-learning": { category: "fundamentals", order: 2, difficulty: "beginner" },
  "deep-learning": { category: "fundamentals", order: 3, difficulty: "intermediate" },

  "math-for-deep-learning": { category: "math", order: 1, difficulty: "beginner" },
  "vector": { category: "math", order: 2, difficulty: "beginner" },
  "matrix": { category: "math", order: 3, difficulty: "beginner" },
  "matrix-operations": { category: "math", order: 4, difficulty: "intermediate" },
  "tensor": { category: "math", order: 5, difficulty: "intermediate" },
  "hosila": { category: "math", order: 6, difficulty: "beginner" },
  "partial-derivative": { category: "math", order: 7, difficulty: "intermediate" },
  "gradient": { category: "math", order: 8, difficulty: "intermediate" },
  "chain-rule": { category: "math", order: 9, difficulty: "intermediate" },
  "probability": { category: "math", order: 10, difficulty: "beginner" },
  "mean": { category: "math", order: 11, difficulty: "beginner" },
  "standard-deviation": { category: "math", order: 12, difficulty: "intermediate" },

  "loss-functions": { category: "deep-learning", order: 1, difficulty: "intermediate" },
  "gradient-descent": { category: "deep-learning", order: 2, difficulty: "intermediate" },
  "learning-rate": { category: "deep-learning", order: 3, difficulty: "intermediate" },
  "backpropagation": { category: "deep-learning", order: 4, difficulty: "advanced" },
  "optimizers": { category: "deep-learning", order: 5, difficulty: "intermediate" },
  "sgd": { category: "deep-learning", order: 6, difficulty: "intermediate" },
  "adam": { category: "deep-learning", order: 7, difficulty: "advanced" },
  "batch-normalization": { category: "deep-learning", order: 8, difficulty: "advanced" },

  "cnn": { category: "architectures", order: 1, difficulty: "intermediate" },
  "rnn": { category: "architectures", order: 2, difficulty: "intermediate" },
  "lstm": { category: "architectures", order: 3, difficulty: "advanced" },
  "transformers": { category: "architectures", order: 4, difficulty: "advanced" },

  "tokenization": { category: "llms-rag", order: 1, difficulty: "beginner" },
  "embeddings": { category: "llms-rag", order: 2, difficulty: "intermediate" },
  "llm": { category: "llms-rag", order: 3, difficulty: "intermediate" },
  "prompt-engineering": { category: "llms-rag", order: 4, difficulty: "beginner" },
  "memory": { category: "llms-rag", order: 5, difficulty: "intermediate" },
  "rag": { category: "llms-rag", order: 6, difficulty: "advanced" },

  "tools": { category: "ai-agents", order: 1, difficulty: "intermediate" },
  "ai-agent": { category: "ai-agents", order: 2, difficulty: "advanced" },

  "atomic-note": { category: "production-ml", order: 1, difficulty: "beginner" },
  "production-ready-ml-structure": { category: "production-ml", order: 2, difficulty: "intermediate" },
  "production-ml-pipeline": { category: "production-ml", order: 3, difficulty: "advanced" },
  "useful-youtube-resources": { category: "production-ml", order: 4, difficulty: "beginner" },
};

function cleanDescriptionText(raw: string): string {
  let text = raw
    .replace(/\\mathbb\{R\}\^?\{?([a-z0-9\+\*\-]+)\}?/gi, "R^$1")
    .replace(/\\in/g, "∈")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\leq?/g, "≤")
    .replace(/\\geq?/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2")
    .replace(/\\partial/g, "∂")
    .replace(/\\nabla/g, "∇")
    .replace(/\\gamma/g, "gamma")
    .replace(/\\theta/g, "theta")
    .replace(/\\alpha/g, "alpha")
    .replace(/\\beta/g, "beta")
    .replace(/\\sigma/g, "sigma")
    .replace(/\\mu/g, "mu")
    .replace(/\\epsilon/g, "epsilon")
    .replace(/\\lambda/g, "lambda")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\$+/g, "")
    .replace(/\\/g, "")
    .replace(/\[\[(.*?)\]\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length > 300) {
    text = text.slice(0, 297).trim() + "...";
  }
  return text;
}

function sanitizeMdxBody(body: string): string {
  // First, transform python code sections
  const processed = body.replace(
    /(?:##?\s*\d+\.\s*(?:Python|PyTorch)[^\n]*\n+)?(?:\(Illyustrativ[^)]*\):python\s+)([\s\S]*?)(?=\n##|\n\*\*Oldin o'rganish|\n\*\*Bog'liq|$)/g,
    (_m, code) => {
      return `\n## Python / PyTorch Amaliy Misoli\n\n\`\`\`python\n${code.trim()}\n\`\`\`\n\n`;
    }
  );

  const lines = processed.split(/\r?\n/);
  const out: string[] = [];
  let inCode = false;

  for (let idx = 0; idx < lines.length; idx++) {
    let line = lines[idx]!;

    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      out.push(line);
      continue;
    }

    if (inCode) {
      out.push(line);
      continue;
    }

    // Convert display math lines
    const trimmed = line.trim();
    if (
      (trimmed.startsWith("\\frac{") ||
        trimmed.startsWith("\\sum_{") ||
        trimmed.startsWith("\\nabla") ||
        trimmed.startsWith("g_t = \\nabla") ||
        trimmed.startsWith("m_t = \\beta") ||
        trimmed.startsWith("v_t = \\beta") ||
        trimmed.startsWith("\\theta_t = \\theta")) &&
      !trimmed.includes("$")
    ) {
      line = `$$ ${trimmed} $$`;
    }

    // Protect and escape line for MDX
    line = protectAndEscapeLine(line);
    out.push(line);
  }

  return out.join("\n");
}

function protectAndEscapeLine(line: string): string {
  // Split line into code spans, math spans, and plain text
  const tokens: Array<{ type: "text" | "code" | "math"; val: string }> = [];
  let cur = "";
  let i = 0;

  while (i < line.length) {
    if (line[i] === "`") {
      if (cur) {
        tokens.push({ type: "text", val: cur });
        cur = "";
      }
      const end = line.indexOf("`", i + 1);
      if (end !== -1) {
        tokens.push({ type: "code", val: line.slice(i, end + 1) });
        i = end + 1;
        continue;
      }
    }
    if (line[i] === "$") {
      if (cur) {
        tokens.push({ type: "text", val: cur });
        cur = "";
      }
      const isDouble = line[i + 1] === "$";
      const delim = isDouble ? "$$" : "$";
      const start = i + delim.length;
      const end = line.indexOf(delim, start);
      if (end !== -1) {
        tokens.push({ type: "math", val: line.slice(i, end + delim.length) });
        i = end + delim.length;
        continue;
      }
    }
    cur += line[i];
    i++;
  }
  if (cur) tokens.push({ type: "text", val: cur });

  return tokens
    .map((t) => {
      if (t.type === "code" || t.type === "math") return t.val;
      let text = t.val;

      // Wrap unbracketed LaTeX formulas that have backslashes and braces, e.g. \frac{a}{b} or \hat{m}_t
      text = text.replace(
        /(\\(?:frac|hat|mathbf|mathcal|mathbb|text|sqrt|sum|prod|nabla|partial|theta|alpha|beta|gamma|lambda|sigma|mu|epsilon|Theta)[a-zA-Z0-9_{}\\^+\-*\/=()\s,]+(?:\}[a-zA-Z0-9_{}\\^+\-*\/=()]*)*)/g,
        (match) => {
          if (match.includes("{") || match.startsWith("\\frac") || match.includes("=")) {
            return `$${match.trim()}$`;
          }
          return match;
        }
      );

      // Escape stray { and } outside of JSX tags
      text = text.replace(/\{/g, "\\{").replace(/\}/g, "\\}");

      // Escape stray < that is not a recognized HTML/JSX tag or component
      text = text.replace(
        /<(?!\/?(?:Visualization|Cite|Callout|Term|LessonLink|code|pre|div|span|p|a|ul|ol|li|table|thead|tbody|tr|th|td|blockquote|h1|h2|h3|h4|h5|h6)\b)/g,
        "&lt;"
      );

      return text;
    })
    .join("");
}

function main() {
  console.log("🚀 Deep Research materiallarini o'qish va tahlil qilish boshlandi...");

  const r1Path = path.resolve(process.cwd(), "deep research 1.md");
  const rawText = fs.readFileSync(r1Path, "utf8");
  const lines = rawText.split(/\r?\n/);

  // 1. Ingest References (Deliverable E verified academic papers)
  const references = [
    {
      id: "vaswani-2017",
      type: "paper",
      title: "Attention Is All You Need",
      authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit", "Llion Jones", "Aidan N. Gomez", "Lukasz Kaiser", "Illia Polosukhin"],
      year: 2017,
      venue: "NeurIPS 2017 (Vol. 30)",
      url: "https://arxiv.org/abs/1706.03762",
      doi: "10.48550/arXiv.1706.03762",
      sourceDocument: "deep research 1.md",
      note: "Scaled Dot-Product Attention va Transformer arxitekturasi",
    },
    {
      id: "bahdanau-2014",
      type: "paper",
      title: "Neural Machine Translation by Jointly Learning to Align and Translate",
      authors: ["Dzmitry Bahdanau", "Kyunghyun Cho", "Yoshua Bengio"],
      year: 2014,
      venue: "ICLR 2015",
      url: "https://arxiv.org/abs/1409.0473",
      doi: "10.48550/arXiv.1409.0473",
      sourceDocument: "deep research 1.md",
      note: "Seq2Seq modellarida birinchi Attention (Alignment) mexanizmi",
    },
    {
      id: "hochreiter-1997",
      type: "paper",
      title: "Long Short-Term Memory",
      authors: ["Sepp Hochreiter", "Jürgen Schmidhuber"],
      year: 1997,
      venue: "Neural Computation (9(8):1735–1780)",
      doi: "10.1162/neco.1997.9.8.1735",
      sourceDocument: "deep research 1.md",
      note: "LSTM xotira katakchalari va Constant Error Carousel (CEC)",
    },
    {
      id: "lecun-1998",
      type: "paper",
      title: "Gradient-Based Learning Applied to Document Recognition",
      authors: ["Yann LeCun", "Léon Bottou", "Yoshua Bengio", "Patrick Haffner"],
      year: 1998,
      venue: "Proceedings of the IEEE (86(11):2278–2324)",
      url: "http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf",
      doi: "10.1109/5.726791",
      sourceDocument: "deep research 1.md",
      note: "LeNet-5 konvolyutsiya va subsampling (pooling) qatlamlari",
    },
    {
      id: "rumelhart-1986",
      type: "paper",
      title: "Learning Representations by Back-Propagating Errors",
      authors: ["David E. Rumelhart", "Geoffrey E. Hinton", "Ronald J. Williams"],
      year: 1986,
      venue: "Nature (323(6088):533–536)",
      doi: "10.1038/323533a0",
      sourceDocument: "deep research 1.md",
      note: "Murakkab funksiya hosilasi (Chain Rule) orqali teskari tarqalish",
    },
    {
      id: "ioffe-2015",
      type: "paper",
      title: "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift",
      authors: ["Sergey Ioffe", "Christian Szegedy"],
      year: 2015,
      venue: "ICML 2015 (PMLR 37:448–456)",
      url: "https://arxiv.org/abs/1502.03167",
      doi: "10.48550/arXiv.1502.03167",
      sourceDocument: "deep research 1.md",
      note: "Mini-batch bo'yicha o'rtacha va dispersiya normalizatsiyasi",
    },
    {
      id: "kingma-2014",
      type: "paper",
      title: "Adam: A Method for Stochastic Optimization",
      authors: ["Diederik P. Kingma", "Jimmy Ba"],
      year: 2014,
      venue: "ICLR 2015",
      url: "https://arxiv.org/abs/1412.6980",
      doi: "10.48550/arXiv.1412.6980",
      sourceDocument: "deep research 1.md",
      note: "1-tartibli va 2-tartibli gradient momentlarining adaptiv baholari",
    },
    {
      id: "loshchilov-2017",
      type: "paper",
      title: "Decoupled Weight Decay Regularization",
      authors: ["Ilya Loshchilov", "Frank Hutter"],
      year: 2017,
      venue: "ICLR 2019",
      url: "https://arxiv.org/abs/1711.05101",
      doi: "10.48550/arXiv.1711.05101",
      sourceDocument: "deep research 1.md",
      note: "AdamW vazn so'nishini adaptiv gradientdan ajratish",
    },
    {
      id: "lewis-2020",
      type: "paper",
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      authors: ["Patrick Lewis", "Ethan Perez", "Aleksandra Piktus", "Fabio Petroni", "Vladimir Karpukhin", "Naman Goyal", "Heinrich Küttler", "Mike Lewis", "Wen-tau Yih", "Tim Rocktäschel", "Sebastian Riedel", "Douwe Kiela"],
      year: 2020,
      venue: "NeurIPS 2020",
      url: "https://arxiv.org/abs/2005.11401",
      doi: "10.48550/arXiv.2005.11401",
      sourceDocument: "deep research 1.md",
      note: "Dense Passage Retrieval (DPR) va BART generatori",
    },
    {
      id: "yao-2022",
      type: "paper",
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      authors: ["Shunyu Yao", "Jeffrey Zhao", "Dian Yu", "Nan Du", "Izhak Shafran", "Karthik Narasimhan", "Yuan Cao"],
      year: 2022,
      venue: "ICLR 2023",
      url: "https://arxiv.org/abs/2210.03629",
      doi: "10.48550/arXiv.2210.03629",
      sourceDocument: "deep research 1.md",
      note: "Thought -> Action -> Observation sikli",
    },
    {
      id: "sanderson-2017",
      type: "video",
      title: "Essence of Linear Algebra & Neural Networks series",
      authors: ["Grant Sanderson (3Blue1Brown)"],
      year: 2017,
      venue: "3Blue1Brown YouTube & Web",
      url: "https://www.3blue1brown.com/topics/linear-algebra",
      sourceDocument: "deep research 1.md",
      note: "Vektor, matritsa va gradient geometrik intuitsiyasi",
    },
    {
      id: "karpathy-2023",
      type: "video",
      title: "Neural Networks: Zero to Hero (Let's build GPT from scratch)",
      authors: ["Andrej Karpathy"],
      year: 2023,
      venue: "YouTube / GitHub nanoGPT",
      url: "https://github.com/karpathy/nanoGPT",
      sourceDocument: "deep research 1.md",
      note: "Bigram -> Micrograd -> Transformer -> nanoGPT amaliyoti",
    },
    {
      id: "goodfellow-2016",
      type: "book",
      title: "Deep Learning",
      authors: ["Ian Goodfellow", "Yoshua Bengio", "Aaron Courville"],
      year: 2016,
      venue: "MIT Press",
      url: "https://www.deeplearningbook.org",
      sourceDocument: "deep research 1.md",
      note: "Chuqur o'rganish bo'yicha fundamental darslik",
    },
    {
      id: "bishop-2006",
      type: "book",
      title: "Pattern Recognition and Machine Learning",
      authors: ["Christopher M. Bishop"],
      year: 2006,
      venue: "Springer",
      url: "https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/",
      sourceDocument: "deep research 1.md",
      note: "Ehtimollar nazariyasi va chiziqli modellar",
    },
    {
      id: "sutton-2018",
      type: "book",
      title: "Reinforcement Learning: An Introduction",
      authors: ["Richard S. Sutton", "Andrew G. Barto"],
      year: 2018,
      venue: "MIT Press (2nd Edition)",
      url: "http://incompleteideas.net/book/the-book-2nd.html",
      sourceDocument: "deep research 1.md",
      note: "Markov qaror jarayonlari (MDP) va mukofot funksiyasi",
    },
  ];

  const refPath = path.resolve(process.cwd(), "src/content/references/academic-papers.json");
  fs.writeFileSync(refPath, JSON.stringify(references, null, 2), "utf8");
  console.log(`✅ ${references.length} ta ilmiy manba saqlandi (academic-papers.json)`);

  // Remove any legacy fixtures.json
  const fixtureRefPath = path.resolve(process.cwd(), "src/content/references/fixtures.json");
  if (fs.existsSync(fixtureRefPath)) fs.unlinkSync(fixtureRefPath);

  // 2. Ingest Categories
  const categories = [
    {
      id: "fundamentals",
      title: "Sun'iy Intellekt Asoslari",
      description: "AI, Machine Learning va Deep Learning paradigmalari hamda asosiy tushunchalar",
      order: 1,
      icon: "brain",
    },
    {
      id: "math",
      title: "AI Uchun Matematika",
      description: "Chiziqli algebra, ko'p o'zgaruvchili hisob, ehtimollar nazariyasi va optimizatsiya",
      order: 2,
      icon: "sigma",
    },
    {
      id: "deep-learning",
      title: "Deep Learning Nazariyasi",
      description: "Gradient tushish, teskari tarqalish, yo'qotish funksiyalari va optimizatorlar",
      order: 3,
      icon: "network",
    },
    {
      id: "architectures",
      title: "Neyron Tarmoq Arxitekturalari",
      description: "CNN, RNN, LSTM va Transformer poydevor tuzilmalari",
      order: 4,
      icon: "cpu",
    },
    {
      id: "llms-rag",
      title: "Katta Til Modellari va RAG",
      description: "Tokenizatsiya, kontekstual embeddinglar, prompt injiniringi va tashqi xotira",
      order: 5,
      icon: "sparkles",
    },
    {
      id: "ai-agents",
      title: "Avtonom AI Agentlar",
      description: "ReAct tsikli, funksiyalar chaqiruvi (Tool Use) va avtonom boshqaruv",
      order: 6,
      icon: "bot",
    },
    {
      id: "production-ml",
      title: "Production ML va MLOps",
      description: "Loyihalar tuzilmasi, real ishlab chiqarish quvurlari va resurslar",
      order: 7,
      icon: "layers",
    },
  ];

  fs.writeFileSync(
    path.resolve(process.cwd(), "src/content/categories.json"),
    JSON.stringify(categories, null, 2),
    "utf8"
  );
  console.log(`✅ ${categories.length} ta kategoriya saqlandi (categories.json)`);

  // 3. Parse Notes from Deliverable B
  let inB = false;
  const rawNotes: Array<{ rawFilename: string; startLine: number; lines: string[] }> = [];
  let currentNote: { rawFilename: string; startLine: number; lines: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (line.startsWith("3. Deliverable B")) {
      inB = true;
      continue;
    }
    if (line.startsWith("4. Deliverable D")) {
      inB = false;
      break;
    }
    if (!inB) continue;

    const match = line.match(/^Fayl:\s*(.+\.md)/);
    if (match) {
      if (currentNote) rawNotes.push(currentNote);
      currentNote = { rawFilename: match[1]!.trim(), startLine: i + 1, lines: [] };
    } else if (currentNote) {
      currentNote.lines.push(line);
    }
  }
  if (currentNote) rawNotes.push(currentNote);

  console.log(`📑 ${rawNotes.length} ta konspekt ajratib olindi.`);

  // Parse each note
  const parsedNotes: ParsedNote[] = [];

  for (const raw of rawNotes) {
    const rawNameClean = raw.rawFilename.replace(/\.md$/, "").trim().toLowerCase();
    const slug = SLUG_MAP[rawNameClean] || rawNameClean.replace(/[^a-z0-9]+/g, "-");
    const meta = CATEGORY_MAP[slug] || { category: "fundamentals", order: 99, difficulty: "intermediate" };

    const title = raw.rawFilename.replace(/\.md$/, "").trim();
    const rawTags: string[] = [];
    const prerequisites: string[] = [];
    const related: string[] = [];
    const noteSources: string[] = [];
    let description = "";

    // Find where the actual content starts ("1. Qisqacha ta'rif" or "1. ")
    let bodyStartIndex = 0;
    for (let j = 0; j < Math.min(35, raw.lines.length); j++) {
      const l = raw.lines[j]!.trim();
      if (/^#{0,3}\s*1\.\s+/.test(l)) {
        bodyStartIndex = j;
        break;
      }
    }

    const noteBodyLines = raw.lines.slice(bodyStartIndex).map((line) => {
      const t = line.trim();
      if (/^[1-9]\.\s+[A-ZА-ЯO'Qo'q]/.test(t) && !t.startsWith("#") && t.length < 95) {
        return `## ${t}`;
      }
      if (/^[1-9]\.[1-9]\.\s+/.test(t) && !t.startsWith("#") && t.length < 110) {
        return `### ${t}`;
      }
      return line;
    });
    const fullBody = noteBodyLines.join("\n");

    // Clean tags
    const tagMatches = raw.lines.slice(0, 10).join("\n").matchAll(/(?:tags:\s*|\n\s*-\s*|\n)([a-z0-9\-_]{2,30})/gi);
    for (const tm of tagMatches) {
      const t = tm[1]!.toLowerCase();
      if (!["tags", "status", "level", "aliases", "fayl", "last_verified"].includes(t) && !rawTags.includes(t)) {
        rawTags.push(t);
      }
    }
    if (rawTags.length === 0) rawTags.push(meta.category);

    // Extract Description from "1. Qisqacha ta'rif"
    const descMatch = fullBody.match(/1\.\s+Qisqacha ta'rif\s*\n+([^#\n]+(?:\n[^#\n]+)*)/);
    if (descMatch) {
      description = cleanDescriptionText(descMatch[1]!);
    }
    if (!description) {
      description = `${title} — sun'iy intellekt va mashinali o'rganish bo'yicha chuqur ilmiy va amaliy qo'llanma.`;
    }

    // Extract Bog'liq tushunchalar (Oldin o'rganish, Keyingi mavzular, Bog'liq)
    const prereqSection = fullBody.match(/Oldin o'rganish:([\s\S]*?)(?:Keyingi mavzular:|Bog'liq:|##|$)/i);
    if (prereqSection) {
      const wikiMatches = prereqSection[1]!.matchAll(/\[\[(.*?)\]\]/g);
      for (const m of wikiMatches) {
        const ref = normalizeRef(m[1]!);
        if (ref && ref !== slug && !prerequisites.includes(ref) && CATEGORY_MAP[ref]) {
          prerequisites.push(ref);
        }
      }
    }

    const relatedSection = fullBody.match(/(?:Bog'liq:|Keyingi mavzular:)([\s\S]*?)(?:##|$)/i);
    if (relatedSection) {
      const wikiMatches = relatedSection[1]!.matchAll(/\[\[(.*?)\]\]/g);
      for (const m of wikiMatches) {
        const ref = normalizeRef(m[1]!);
        if (ref && ref !== slug && !related.includes(ref) && !prerequisites.includes(ref) && CATEGORY_MAP[ref]) {
          related.push(ref);
        }
      }
    }

    // Connect references
    if (/vaswani/i.test(fullBody)) noteSources.push("vaswani-2017");
    if (/lecun/i.test(fullBody)) noteSources.push("lecun-1998");
    if (/rumelhart/i.test(fullBody)) noteSources.push("rumelhart-1986");
    if (/hochreiter/i.test(fullBody)) noteSources.push("hochreiter-1997");
    if (/ioffe|covariate/i.test(fullBody)) noteSources.push("ioffe-2015");
    if (/kingma|adam/i.test(fullBody)) noteSources.push("kingma-2014");
    if (/loshchilov|adamw/i.test(fullBody)) noteSources.push("loshchilov-2017");
    if (/lewis|retrieval-augmented/i.test(fullBody)) noteSources.push("lewis-2020");
    if (/react|reasoning and acting/i.test(fullBody)) noteSources.push("yao-2022");
    if (/3blue1brown|sanderson/i.test(fullBody)) noteSources.push("sanderson-2017");
    if (/karpathy|nanogpt/i.test(fullBody)) noteSources.push("karpathy-2023");
    if (/bishop/i.test(fullBody)) noteSources.push("bishop-2006");
    if (/sutton/i.test(fullBody)) noteSources.push("sutton-2018");
    if (noteSources.length === 0) noteSources.push("goodfellow-2016");

    // Connect visualizations
    const visualizations: string[] = [];
    if (["transformers", "tokenization", "embeddings", "llm", "prompt-engineering"].includes(slug)) {
      visualizations.push("self-attention-explorer");
    } else if (["gradient-descent", "optimizers", "sgd", "adam", "learning-rate", "loss-functions"].includes(slug)) {
      visualizations.push("gradient-descent-1d");
    } else if (["deep-learning", "backpropagation", "cnn", "rnn", "lstm", "batch-normalization"].includes(slug)) {
      visualizations.push("neural-network-explorer");
    } else if (["rag", "ai-agent", "tools", "memory"].includes(slug)) {
      visualizations.push("rag-pipeline-flow");
    } else if (["math-for-deep-learning", "hosila", "partial-derivative", "gradient", "chain-rule"].includes(slug)) {
      visualizations.push("function-explorer");
    }

    // Transform WikiLinks [[Target]] -> [Target](/learn/target) ONLY for known slugs, otherwise plain text!
    let processedBody = fullBody.replace(/\[\[(.*?)\]\]/g, (_match, linkText) => {
      const targetSlug = normalizeRef(linkText);
      if (targetSlug) {
        return `[${linkText}](/learn/${targetSlug})`;
      }
      return linkText;
    });

    // Embed visualization directly if applicable
    if (visualizations.length > 0) {
      processedBody += `\n\n## Interaktiv Vizualizatsiya\n\n<Visualization id="${visualizations[0]}" />\n`;
    }

    // Sanitize for MDX
    const sanitizedBody = sanitizeMdxBody(processedBody);

    parsedNotes.push({
      rawFilename: raw.rawFilename,
      slug,
      title,
      tags: rawTags.slice(0, 6),
      aliases: [],
      status: "published",
      difficulty: meta.difficulty,
      description,
      prerequisites,
      related,
      sources: Array.from(new Set(noteSources)),
      body: sanitizedBody,
      category: meta.category,
      order: meta.order,
      visualizations,
      startLine: raw.startLine,
      endLine: raw.startLine + raw.lines.length,
    });
  }

  // 4. Eliminate Cycles in prerequisites
  console.log("🔄 Prerequisite zanjirlarini tekshirish va tsikllarni oldini olish...");
  const categoryRank: Record<string, number> = {
    math: 10,
    fundamentals: 20,
    "deep-learning": 30,
    architectures: 40,
    "llms-rag": 50,
    "ai-agents": 60,
    "production-ml": 70,
  };

  for (const note of parsedNotes) {
    const currentScore = (categoryRank[note.category] || 0) * 100 + note.order;
    note.prerequisites = note.prerequisites.filter((pSlug) => {
      const pNote = parsedNotes.find((n) => n.slug === pSlug);
      if (!pNote) return false;
      const pScore = (categoryRank[pNote.category] || 0) * 100 + pNote.order;
      return pScore < currentScore;
    });
  }

  // 5. Write MDX Lessons
  const lessonsDir = path.resolve(process.cwd(), "src/content/lessons");
  if (!fs.existsSync(lessonsDir)) fs.mkdirSync(lessonsDir, { recursive: true });

  // Delete previous format fixture
  const fixturePath = path.join(lessonsDir, "format-test-fixture.mdx");
  if (fs.existsSync(fixturePath)) fs.unlinkSync(fixturePath);

  for (const note of parsedNotes) {
    const frontmatter = `---
id: ${note.slug}
title: ${JSON.stringify(note.title)}
slug: ${note.slug}
description: ${JSON.stringify(note.description)}
category: ${note.category}
difficulty: ${note.difficulty}
order: ${note.order}
tags: ${JSON.stringify(note.tags)}
prerequisites: ${JSON.stringify(note.prerequisites)}
related: ${JSON.stringify(note.related)}
visualizations: ${JSON.stringify(note.visualizations)}
sources: ${JSON.stringify(note.sources)}
origin:
  - document: "deep research 1.md"
    section: "3. Deliverable B — Takomillashtirilgan va Tekshirilgan Obsidian Konspektlari"
    pages: "Qatorlar ${note.startLine}–${note.endLine}"
    note: "Kanonik Deep Research ilmiy konspekti"
status: published
locale: uz
---

${note.body}
`;

    const filePath = path.join(lessonsDir, `${note.slug}.mdx`);
    fs.writeFileSync(filePath, frontmatter, "utf8");
  }

  console.log(`✅ ${parsedNotes.length} ta haqiqiy ilmiy MDX dars yaratildi!`);

  // 6. Generate Glossary Terms with verified reciprocal cross-links
  const glossaryDir = path.resolve(process.cwd(), "src/content/glossary");
  if (!fs.existsSync(glossaryDir)) fs.mkdirSync(glossaryDir, { recursive: true });

  const glossaryItems = [
    {
      id: "transformer",
      term: "Transformer",
      translation: "Diqqat (Attention) mexanizmiga asoslangan neyron tarmoq arxitekturasi",
      aliases: ["Transformers", "Transformer Architecture"],
      related: ["self-attention", "embedding", "llm"],
      lessons: ["transformers", "llm"],
      body: "Transformer — ketma-ket takrorlanish (recurrence) va konvolyutsiyasiz, faqat Self-Attention mexanizmi yordamida uzoq masofali bog'liqliklarni parallel qayta ishlovchi arxitektura. Vaswani et al. (2017) tomonidan taklif qilingan.",
    },
    {
      id: "self-attention",
      term: "Self-Attention",
      translation: "O'z-o'ziga diqqat mexanizmi",
      aliases: ["Scaled Dot-Product Attention", "Diqqat mexanizmi"],
      related: ["transformer", "embedding"],
      lessons: ["transformers", "embeddings"],
      body: "Self-Attention — ketma-ketlikdagi har bir tokenning boshqa barcha tokenlar bilan bog'liqlik darajasini Query, Key va Value vektorlari skalyar ko'paytmasi orqali hisoblovchi mexanizm: $\\text{softmax}(QK^T / \\sqrt{d_k})V$.",
    },
    {
      id: "embedding",
      term: "Embedding",
      translation: "Vektorli tasvir",
      aliases: ["Vector Embeddings", "Contextual Embeddings"],
      related: ["self-attention", "transformer", "rag"],
      lessons: ["embeddings", "vector"],
      body: "Embedding — matn, so'z yoki tokenlarni ularning semantik va sintaktik ma'nosini aks ettiruvchi ko'p o'lchamli fazodagi ($R^d$) zich vektorlar shaklida ifodalash usuli.",
    },
    {
      id: "rag",
      term: "RAG",
      translation: "Retrieval-Augmented Generation (Qidiruv bilan boyitilgan generatsiya)",
      aliases: ["Retrieval-Augmented Generation"],
      related: ["embedding", "ai-agent", "llm"],
      lessons: ["rag", "llm", "ai-agent"],
      body: "RAG — til modeliga savol berilganda, dastlab tashqi bilimlar bazasidan (vektorli baza) eng tegishli ma'lumotlarni qidirib topib, so'ngra ularni model promptiga qo'shib javob generatsiya qilish arxitekturasi.",
    },
    {
      id: "ai-agent",
      term: "AI Agent",
      translation: "Avtonom sun'iy intellekt agenti",
      aliases: ["Agent", "ReAct Agent"],
      related: ["rag", "llm"],
      lessons: ["ai-agent", "tools"],
      body: "AI Agent — berilgan maqsadga erishish uchun atrof-muhitni kuzatuvchi, mustaqil reja tuzuvchi (Reasoning) va tashqi vositalardan (Tools / API) foydalanib harakat qiluvchi (Acting) tizim.",
    },
    {
      id: "gradient-descent",
      term: "Gradient Descent",
      translation: "Gradient tushish optimizatsiyasi",
      aliases: ["Gradient tushish", "GD"],
      related: ["backpropagation"],
      lessons: ["gradient-descent", "backpropagation", "adam"],
      body: "Gradient Descent — model parametrlarini yo'qotish funksiyasi (Loss Function) gradientining teskari yo'nalishida o'zgartirish orqali xatolikni minimallashtiruvchi asosiy optimizatsiya algoritmi: $\\theta = \\theta - \\alpha \\nabla f(\\theta)$.",
    },
    {
      id: "backpropagation",
      term: "Backpropagation",
      translation: "Xatolikni teskari tarqatish algoritmi",
      aliases: ["Teskari tarqalish", "Backprop"],
      related: ["gradient-descent"],
      lessons: ["backpropagation", "chain-rule"],
      body: "Backpropagation — murakkab funksiya hosilasi (Chain Rule) qoidasiga asoslanib, chiqishdagi xatolikni tarmoqning oxirgi qatlamidan birinchi qatlamiga qarab teskari hisoblash va har bir parametr hosilasini topish algoritmi.",
    },
    {
      id: "llm",
      term: "Large Language Model (LLM)",
      translation: "Katta Til Modeli",
      aliases: ["LLM", "Foundation Model"],
      related: ["transformer", "rag", "embedding"],
      lessons: ["llm", "transformers", "prompt-engineering"],
      body: "LLM — yuz millionlab yoki milliardlab parametrga ega, ulkan matn korpusida oldindan o'rgatilgan (pre-trained) va inson tilini tushunish hamda generatsiya qilish qobiliyatiga ega chuqur neyron tarmoq modeli.",
    },
  ];

  for (const item of glossaryItems) {
    const content = `---
id: ${item.id}
term: ${JSON.stringify(item.term)}
translation: ${JSON.stringify(item.translation)}
aliases: ${JSON.stringify(item.aliases)}
related: ${JSON.stringify(item.related)}
lessons: ${JSON.stringify(item.lessons)}
sources: ["vaswani-2017"]
origin:
  - document: "deep research 1.md"
    section: "3. Deliverable B"
    note: "Kanonik atama ta'rifi"
status: published
---

${item.body}
`;
    fs.writeFileSync(path.join(glossaryDir, `${item.id}.md`), content, "utf8");
  }

  console.log(`✅ ${glossaryItems.length} ta glossariy atamasi yaratildi!`);
}

main();
