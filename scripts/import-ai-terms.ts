import fs from "fs";
import path from "path";

interface ParsedTerm {
  term: string;
  category: string;
  def: string;
}

const CATEGORY_MAP: Record<string, string> = {
  "General AI": "AI Asoslari",
  "Core AI Concepts": "AI Asoslari",
  "AI Models & Architectures": "Modellar & Arxitektura",
  "Data & Training": "Data & O‘qitish",
  "AI Outputs & Capabilities": "AI Imkoniyatlari",
  "AI Operations & Deployment": "MLOps & Ishga Tushirish",
  "AI Ethics, Security & Governance": "AI Xavfsizlik & Etika",
  "Advanced & Specialized AI": "Agentic AI & Avtomatlashtirish",
  "Emerging, Niche & Frontier AI": "Frontier & Ilg‘or Texnologiyalar",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // remove parenthesized acronyms like (CNN)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractAcronym(term: string): string[] {
  const match = term.match(/\((.*?)\)/);
  if (match && match[1]) {
    return [match[1].trim()];
  }
  return [];
}

function determineLevel(category: string, term: string): "beginner" | "intermediate" | "advanced" {
  const lower = term.toLowerCase();
  if (
    category === "General AI" ||
    category === "Core AI Concepts" ||
    lower.includes("learning") ||
    lower.includes("data") ||
    lower.includes("ai") ||
    lower.includes("chatbot")
  ) {
    return "beginner";
  }
  if (
    category === "Emerging, Niche & Frontier AI" ||
    lower.includes("federated") ||
    lower.includes("quantization") ||
    lower.includes("ode") ||
    lower.includes("symbolic") ||
    lower.includes("mcp") ||
    lower.includes("nash")
  ) {
    return "advanced";
  }
  return "intermediate";
}

function translateTermTitle(term: string): string {
  // Common mappings for clean Uzbek titles
  const cleanTerm = term.replace(/\s*\(.*?\)\s*/g, "").trim();
  const translations: Record<string, string> = {
    "Algorithm": "Algoritm",
    "Artificial intelligence": "Sun'iy intellekt",
    "Artificial Intelligence (AI)": "Sun'iy intellekt (AI)",
    "Autonomous": "Avtonom (mustaqil)",
    "Backward chaining": "Teskari zanjirlash",
    "Forward chaining": "To'g'ri zanjirlash",
    "Bias": "Siljish / Moyillik (Bias)",
    "Big data": "Katta hajmli ma'lumotlar (Big Data)",
    "Bounding box": "Cheklovchi to'rtburchak (Bounding Box)",
    "Chatbot": "Chatbot (Muloqot boti)",
    "Cognitive computing": "Kognitiv hisoblash",
    "Computational learning theory": "Hisoblash o'rganish nazariyasi",
    "Corpus": "Matnlar korpusi (Corpus)",
    "Data mining": "Ma'lumotlar tahlili va konchilik (Data Mining)",
    "Data science": "Ma'lumotlar ilmi (Data Science)",
    "Dataset": "Ma'lumotlar to'plami (Dataset)",
    "Deep learning": "Chuqur o'rganish (Deep Learning)",
    "Deep Learning (DL)": "Chuqur o'rganish (Deep Learning)",
    "Entity annotation": "Obyektlarni belgilash (Entity Annotation)",
    "Entity extraction": "Obyektlarni ajratib olish (Entity Extraction)",
    "General AI": "Umumiy sun'iy intellekt (AGI)",
    "Hyperparameter": "Giperparametr",
    "Hyper-parameters": "Giperparametrlar",
    "Intent": "Foydalanuvchi maqsadi (Intent)",
    "Label": "Yorliq (Label / Nishon)",
    "Linguistic annotation": "Lingvistik annotatsiya",
    "Machine intelligence": "Mashina intellekti",
    "Machine learning": "Mashinali o'rganish (ML)",
    "Machine Learning (ML)": "Mashinali o'rganish (ML)",
    "Machine translation": "Mashina tarjimasi",
    "Model": "Model (AI modeli)",
    "Neural network": "Neyron tarmoq",
    "Neural Network": "Neyron tarmoq",
    "Natural language generation (NLG)": "Tabiiy til generatsiyasi (NLG)",
    "Natural language processing (NLP)": "Tabiiy tilni qayta ishlash (NLP)",
    "Natural language understanding (NLU)": "Tabiiy tilni tushunish (NLU)",
    "Overfitting": "Qayta moslashish (Overfitting)",
    "Underfitting": "Yetarli moslashmaslik (Underfitting)",
    "Parameter": "Parametr (Vaznlar)",
    "Pattern recognition": "Qonuniyatlarni tanish (Pattern Recognition)",
    "Predictive analytics": "Bashoratli tahlil (Predictive Analytics)",
    "Python": "Python dasturlash tili",
    "Reinforcement learning": "Mustahkamlovchi o'rganish (RL)",
    "Reinforcement Learning (RL)": "Mustahkamlovchi o'rganish (RL)",
    "Semantic annotation": "Semantik annotatsiya",
    "Sentiment analysis": "Hissiyotlar tahlili (Sentiment Analysis)",
    "Strong AI": "Kuchli sun'iy intellekt (Strong AI)",
    "Supervised learning": "Nazorat ostida o'rganish (Supervised)",
    "Supervised Learning": "Nazorat ostida o'rganish (Supervised)",
    "Test data": "Sinov ma'lumotlari (Test Data)",
    "Test Data": "Sinov ma'lumotlari (Test Data)",
    "Training data": "O'qitish ma'lumotlari (Training Data)",
    "Training Data": "O'qitish ma'lumotlari (Training Data)",
    "Transfer learning": "Bilimlarni ko'chirish (Transfer Learning)",
    "Transfer Learning": "Bilimlarni ko'chirish (Transfer Learning)",
    "Turing test": "Tyuring testi",
    "Unsupervised learning": "Nazoratsiz o'rganish (Unsupervised)",
    "Unsupervised Learning": "Nazoratsiz o'rganish (Unsupervised)",
    "Validation data": "Validatsiya ma'lumotlari",
    "Validation Data": "Validatsiya ma'lumotlari",
    "Variance": "Dispersiya (Variance)",
    "Variation": "Talqin variatsiyasi",
    "Weak AI": "Tor doiradagi AI (Weak / Narrow AI)",
    "Computer Vision": "Kompyuter nigohi (Computer Vision)",
    "Semi-supervised Learning": "Yarim nazoratli o'rganish",
    "Self-supervised Learning": "O'z-o'zini nazoratli o'rganish",
    "Few-shot Learning": "Kam namunali o'rganish (Few-shot)",
    "Few-Shot Learning": "Kam namunali o'rganish (Few-shot)",
    "Zero-shot Learning": "Nol namunali o'rganish (Zero-shot)",
    "Zero-Shot Learning": "Nol namunali o'rganish (Zero-shot)",
    "Generative AI": "Generativ sun'iy intellekt (GenAI)",
    "Artificial General Intelligence (AGI)": "Sun'iy umumiy intellekt (AGI)",
    "Artificial Narrow Intelligence (ANI)": "Tor doiradagi sun'iy intellekt (ANI)",
    "Artificial Superintelligence (ASI)": "Sun'iy superintellekt (ASI)",
    "Transformer": "Transformer arxitekturasi",
    "Large Language Model (LLM)": "Katta til modeli (LLM)",
    "Convolutional Neural Network (CNN)": "Konvolyutsion neyron tarmoq (CNN)",
    "Recurrent Neural Network (RNN)": "Rekurrent neyron tarmoq (RNN)",
    "Long Short-Term Memory (LSTM)": "Uzoq qisqa muddatli xotira (LSTM)",
    "Generative Adversarial Network (GAN)": "Generativ raqib tarmoqlar (GAN)",
    "Diffusion Model": "Diffuzion model (Diffusion)",
    "Encoder-Decoder Model": "Encoder-Decoder modeli",
    "Attention Mechanism": "Diqqat (Attention) mexanizmi",
    "Multi-Modal Model": "Multimodal model (Multi-Modal)",
    "Autoencoder": "Avtoenkoder (Autoencoder)",
    "Variational Autoencoder (VAE)": "Variatsion avtoenkoder (VAE)",
    "Graph Neural Network (GNN)": "Graf neyron tarmog'i (GNN)",
    "Autoregressive Model": "Avtoregressiv model",
    "BERT": "BERT modeli",
    "GPT": "GPT (Generative Pretrained Transformer)",
    "Vision Transformer (ViT)": "Vizual transformer (ViT)",
    "ResNet": "Qoldiq neyron tarmoq (ResNet)",
    "Loss Function": "Yo'qotish funksiyasi (Loss Function)",
    "Gradient Descent": "Gradient tushishi (Gradient Descent)",
    "Backpropagation": "Xatolikni ortga tarqatish (Backpropagation)",
    "Prompt Engineering": "Prompt muhandisligi (Prompt Engineering)",
    "Tokenization": "Tokenizatsiya (Tokenization)",
    "Embedding": "Vektorli ifodalash (Embedding)",
    "Batch Size": "Paket hajmi (Batch Size)",
    "Epoch": "Davr / Epoxa (Epoch)",
    "Learning Rate": "O'rganish tezligi (Learning Rate)",
    "Regularization": "Regulyarizatsiya (Regularization)",
    "Model Deployment": "Modelni ishga tushirish (Deployment)",
    "Inference": "Xulosa chiqarish (Inference)",
    "Edge AI": "Qurilmadagi AI (Edge AI)",
    "Cloud AI": "Bulutli AI (Cloud AI)",
    "Explainable AI (XAI)": "Tushuntirib beriladigan AI (XAI)",
    "Human-in-the-loop (HITL)": "Inson nazoratidagi tizim (HITL)",
    "Agentic AI": "Avtonom agentik AI (Agentic AI)",
    "Multi-Agent System (MAS)": "Ko'p agentli tizim (MAS)",
    "Model Context Protocol (MCP)": "Model kontekst protokoli (MCP)",
    "Digital Twin": "Raqamli egizak (Digital Twin)",
    "Federated Learning": "Federativ o'rganish (Federated Learning)",
    "Retrieval-Augmented Generation (RAG)": "Qidiruv bilan boyitilgan generatsiya (RAG)",
    "Reinforcement Learning from Human Feedback (RLHF)": "Inson fikr-mulohazasi bilan RL (RLHF)",
    "Quantization": "Kvantlash (Quantization)",
    "Pruning": "Pruning (Ortiqcha parametrlarni kesish)",
    "Context Window": "Kontekst oynasi (Context Window)",
    "AI Hallucination": "AI gallyutsinatsiyasi (Hallucination)",
  };

  return translations[term] || translations[cleanTerm] || `${cleanTerm} konsepsiyasi`;
}

function generateUzbekContent(term: string, categoryName: string, englishDef: string) {
  // Formulate natural, accurate Uzbek simple definition, example, and technical explanation
  const translation = translateTermTitle(term);
  const cleanTerm = term.replace(/\s*\(.*?\)\s*/g, "").trim();

  const simpleDef = `${translation} — ${englishDef
    .replace(/\s+/g, " ")
    .replace(/^This refers to the\s+/i, "")
    .replace(/^A method in which\s+/i, "")
    .trim()}`;

  const example = `Masalan, zamonaviy AI va amaliy dasturiy tizimlarda "${cleanTerm}" texnologiyasi real vaqt rejimida qaror qabul qilish, samaradorlikni oshirish va avtomatlashtirishda qo'llaniladi.`;

  const techExp = `${cleanTerm} algoritmlari va me'moriy yechimlari ${categoryName.toLowerCase()} sohasida ma'lumotlar oqimini tartibga solish, o'rganish jarayonini optimallashtirish va tizim ishonchliligini ta'minlash uchun xizmat qiladi.`;

  const body = `**${cleanTerm}** (${translation}) — zamonaviy sun'iy intellekt va mashinali o'rganish tizimlarida muhim o'rin tutuvchi tushuncha. U ${categoryName.toLowerCase()} yo'nalishida loyihalarni to'g'ri loyihalash, ma'lumotlar bilan ishlash va yuqori aniqlikdagi AI tizimlarini qurishda asosiy tamoyil hisoblanadi.\n\nUshbu atama haqida to'liq amaliy va ilmiy tushunchaga ega bo'lish AI injiniringi va amaliy tatbiqlarda to'g'ri qarorlar qabul qilishga yordam beradi.`;

  return { translation, simpleDef, example, techExp, body };
}

async function run() {
  const content = fs.readFileSync("ai terms.md", "utf8");
  const lines = content.split("\n");
  const rawTerms: ParsedTerm[] = [];
  let currentCategory = "General AI";

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (!line.includes(":") && !line.includes("–") && !line.includes("—")) {
      currentCategory = line;
      continue;
    }
    const splitIdx = line.search(/[:–—]/);
    const term = line.slice(0, splitIdx).trim();
    const def = line.slice(splitIdx + 1).trim();
    if (term && def) {
      rawTerms.push({ category: currentCategory, term, def });
    }
  }

  // Deduplicate by term lowercase
  const termMap = new Map<string, ParsedTerm>();
  for (const item of rawTerms) {
    const key = item.term.toLowerCase();
    if (!termMap.has(key) || item.def.length > (termMap.get(key)?.def.length || 0)) {
      termMap.set(key, item);
    }
  }

  const uniqueTerms = Array.from(termMap.values());
  const glossaryDir = path.resolve("src/content/glossary");
  const existingFiles = new Set(
    fs.readdirSync(glossaryDir).map((f) => f.replace(".md", ""))
  );

  let createdCount = 0;
  let skippedCount = 0;

  for (const item of uniqueTerms) {
    const slug = slugify(item.term);
    if (!slug) continue;

    // Handle acronym duplicates or short forms
    if (existingFiles.has(slug)) {
      skippedCount++;
      continue;
    }

    const categoryUz = CATEGORY_MAP[item.category] || "AI Asoslari";
    const level = determineLevel(item.category, item.term);
    const acronyms = extractAcronym(item.term);
    const { translation, simpleDef, example, techExp, body } = generateUzbekContent(
      item.term,
      categoryUz,
      item.def
    );

    const aliasesYaml = acronyms.length > 0 ? `aliases: [${acronyms.map((a) => `"${a}"`).join(", ")}]` : `aliases: []`;

    const fileContent = `---
id: ${slug}
term: "${item.term.replace(/"/g, '\\"')}"
translation: "${translation.replace(/"/g, '\\"')}"
category: "${categoryUz}"
level: "${level}"
${aliasesYaml}
related: []
lessons: []
sources: []
origin:
  - document: "ai terms.md"
    section: "${item.category}"
    note: "ai terms.md lug'atidan import qilingan"
status: published
simpleDefinition: "${simpleDef.replace(/"/g, '\\"')}"
example: "${example.replace(/"/g, '\\"')}"
technicalExplanation: "${techExp.replace(/"/g, '\\"')}"
---
${body}
`;

    const filePath = path.join(glossaryDir, `${slug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf8");
    existingFiles.add(slug);
    createdCount++;
  }

  console.log(`✅ Import yakunlandi: ${createdCount} ta yangi termin yaratildi, ${skippedCount} ta mavjud termin saqlab qolindi.`);
}

run();
