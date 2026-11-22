/**
 * AI Atlas — Stanford CME 295: Transformers & Large Language Models
 * (12 Mikro-darsli To'liq O'quv Moduli — 3 ta Stanford Ma'ruzasi Asosida)
 *
 * Manba ma'ruzalar: Afshine Amidi & Shervin Amidi (Stanford University CME 295):
 *  - Lecture 1 (`transformers1.md`): Tokenization, BPE, Word2Vec/RNN Limits, Self-Attention Q/K/V & Transformer Architecture
 *  - Lecture 2 (`transformers2.md`): BERT vs GPT, Scaling Laws/Chinchilla, MoE, RoPE/GQA/RMSNorm, Decoding & Prompting
 *  - Lecture 3 (`transformers3.md`): Pre-Training/BPB, Mid-Training/YaRN, SFT/LoRA, RLHF/DPO & GRPO/On-Policy Distillation
 */

import type { PracticeExercise } from "@/lib/practice/types";

export type TransformerVisualId =
  | "bpe-tradeoff"
  | "word2vec-vs-rnn"
  | "qkv-attention"
  | "encoder-decoder-flow"
  | "bert-vs-gpt"
  | "chinchilla-moe"
  | "rope-gqa-rmsnorm"
  | "decoding-temperature"
  | "pretrain-bpb-collapse"
  | "yarn-sft-lora"
  | "rlhf-vs-dpo"
  | "grpo-onpolicy-distill"
  | "rl-policy-gradient"
  | "ppo-grpo-clip"
  | "distill-reverse-kl"
  | "flash-attention-tiling"
  | "parallelism-5d"
  | "roofline-speculative"
  | "rag-hybrid-ndcg"
  | "mcp-prompt-caching"
  | "react-harness-memory"
  | "kappa-passk-metrics"
  | "llm-judge-biases"
  | "benchmax-pareto";

export interface TransformerLectureMeta {
  lectureNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  titleUz: string;
  subtitleEn: string;
  speakers: string;
  sourceFile: string;
  /** Video tayyor bo'lganda youtubeId/youtubeUrl to'ldiriladi */
  youtubeId: string | null;
  youtubeUrl: string | null;
  placeholderNoteUz: string;
}

export const STANFORD_CME295_LECTURES: readonly TransformerLectureMeta[] = [
  {
    lectureNumber: 1,
    titleUz: "1-Ma'ruza: Tokenizatsiya, Word2Vec/RNN va Transformer Attention",
    subtitleEn: "Lecture 1: Tokenization, Embeddings, Q/K/V Self-Attention & Encoder-Decoder",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "transformers1.md",
    youtubeId: "114i2Kz-LZA",
    youtubeUrl: "https://www.youtube.com/watch?v=114i2Kz-LZA",
    placeholderNoteUz:
      "1-Ma'ruza: Tokenizatsiya, Word2Vec/RNN va Q/K/V Self-Attention videosi.",
  },
  {
    lectureNumber: 2,
    titleUz: "2-Ma'ruza: BERT vs GPT, Scaling Laws, MoE, RoPE/GQA va Prompting",
    subtitleEn: "Lecture 2: Transformer Variants, Chinchilla, Sparse MoE, Modern Upgrades & Decoding",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "transformers2.md",
    youtubeId: "GaIeu3npx04",
    youtubeUrl: "https://www.youtube.com/watch?v=GaIeu3npx04",
    placeholderNoteUz:
      "2-Ma'ruza: BERT/GPT, Scaling Laws, MoE, RoPE, GQA, Temperature & CoT videosi.",
  },
  {
    lectureNumber: 3,
    titleUz: "3-Ma'ruza: LLM Trening Sikli (Pre-Training → SFT → RLHF/DPO → GRPO)",
    subtitleEn: "Lecture 3: Pre-Training, YaRN Long Context, LoRA, Alignment & Reasoning Distillation",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "transformers3.md",
    youtubeId: "S3bCDcJhz4s",
    youtubeUrl: "https://www.youtube.com/watch?v=S3bCDcJhz4s",
    placeholderNoteUz:
      "3-Ma'ruza: Pre-Training, BPB, Mid-Training, SFT, LoRA, RLHF/DPO va GRPO Distillation videosi.",
  },
  {
    lectureNumber: 4,
    titleUz: "4-Ma'ruza: RL Matematikasi, PPO vs GRPO va On-Policy Distillation",
    subtitleEn: "Lecture 4: Policy Gradients, Importance Sampling, Clipping/KL & Reverse KL",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "transformer4.md",
    youtubeId: "3Vaj0Oka_t4",
    youtubeUrl: "https://www.youtube.com/watch?v=3Vaj0Oka_t4",
    placeholderNoteUz:
      "4-Ma'ruza: REINFORCE, Importance Sampling, PPO, GRPO/DAPO va On-Policy Distillation videosi.",
  },
  {
    lectureNumber: 5,
    titleUz: "5-Ma'ruza: LLM Tizimlari — FlashAttention, 5D Parallelism va Inference",
    subtitleEn: "Lecture 5: HBM/SRAM, 5D Parallelism, Roofline, PagedAttention, MLA & Speculative Decoding",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "lecture5.md",
    youtubeId: "25KIyaeI_Fg",
    youtubeUrl: "https://www.youtube.com/watch?v=25KIyaeI_Fg",
    placeholderNoteUz:
      "5-Ma'ruza: GPU xotira, FlashAttention, 5D Parallelism, Roofline, PagedAttention & Speculative Decoding.",
  },
  {
    lectureNumber: 6,
    titleUz: "6-Ma'ruza: AI Agentlar — RAG, Tools, MCP, Prompt Caching & Harness",
    subtitleEn: "Lecture 6: Hybrid RAG/NDCG, Tool Calling, MCP, ReAct, Compaction, Memory & Swarms",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "lecture6.md",
    youtubeId: "nU2a2lm6vDE",
    youtubeUrl: "https://www.youtube.com/watch?v=nU2a2lm6vDE",
    placeholderNoteUz:
      "6-Ma'ruza: Hybrid RAG, Re-Ranking, Tools, MCP, Prompt Caching, ReAct Harness va Coding Agents.",
  },
  {
    lectureNumber: 7,
    titleUz: "7-Ma'ruza: LLM & Agent Baholash — Pass@K, LLM-as-a-Judge & Bench Maxing",
    subtitleEn: "Lecture 7: Kappa, Pass@K, Judge Biases, Agent Failures, Benchmarks & Goodhart's Law",
    speakers: "Afshine Amidi & Shervin Amidi • Stanford CME 295",
    sourceFile: "lecture7.md",
    youtubeId: "uoSynlTDyMs",
    youtubeUrl: "https://www.youtube.com/watch?v=uoSynlTDyMs",
    placeholderNoteUz:
      "7-Ma'ruza: Cohen's Kappa, Pass@K, LLM-as-a-Judge biaslari, Agent debug, Pareto va Bench Maxing.",
  },
];

export interface TransformerMicroLesson {
  id: string;
  order: number;
  lectureNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  titleUz: string;
  subtitleEn: string;
  canonicalConceptId: string;
  estimatedMinutes: number;
  analogyUz: string;
  theoryParagraphsUz: string[];
  keyInsightUz: {
    highlightUz: string;
    explanationUz: string;
  };
  formulaLatex: string;
  formulaNoteUz: string;
  visualId: TransformerVisualId;
  visualTitleUz: string;
  pytorchSnippet: string;
  exercise: PracticeExercise;
  quiz: {
    questionUz: string;
    options: string[];
    correctIndex: number;
    explanationUz: string;
  };
}

export const TRANSFORMER_CME295_LESSONS: readonly TransformerMicroLesson[] = [
  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 1 (transformers1.md)                                           */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-01-tokenization-bpe",
    order: 1,
    lectureNumber: 1,
    titleUz: "1. Tokenization va BPE (Word vs Character vs Subword)",
    subtitleEn: "Lecture 1 • Vocabulary Size vs Sequence Length & Special Tokens",
    canonicalConceptId: "tokenization-bpe",
    estimatedMinutes: 12,
    analogyUz:
      "Matnni lego bo'laklariga ajratishni tasavvur qiling: agar har bir butun uyni bitta detal qilsangiz (Word), juda katta ombor (Vocabulary) kerak; agar faqat 1x1 mayda g'ishtchalardan yigsangiz (Character), uy qurish juda sekinlashadi (Sequence Length uzun). Oltin o'rtalik — ko'p uchraydigan devor va deraza bloklari (Subword / BPE)!",
    theoryParagraphsUz: [
      "Til modellari matnni emas, sonlarni tushunadi. Tokenization — kiruvchi matnni bo'linmas birliklarga (tokenlarga) ajratish va har birini Vocabulary ichidagi noyob raqamga bog'lash bosqichidir. Word-level usulda har bir so'z alohida token bo'ladi, lekin «bear» va «bears» bog'lanmay qoladi hamda notanish so'zda Out-of-Vocabulary xatosi chiqadi.",
      "Character-level da Out-of-Vocabulary muammosi yo'qoladi va xato yozuvga chidamli bo'ladi, biroq Sequence Length haddan tashqari uzayib ketadi — Attention murakkabligi uzunlikka bog'liq bo'lgani uchun hisoblash keskin sekinlashadi. Shu sababli zamonaviy LLM lar (~100k–200k lug'at bilan) Byte-Pair Encoding (BPE) kabi Subword algoritmini ishlatadi: «reading» -> «read» + «ing».",
      "Bundan tashqari modelga muloqot chegarasini aytish uchun maxsus tokenlar qo'shiladi: notanish so'z uchun [UNK], gap boshida <BOS>, generatsiya tugashini bildirish uchun <EOS>, va batchdagi qisqa gaplarni tenglashtirish uchun <PAD>.",
    ],
    keyInsightUz: {
      highlightUz: "Vocabulary hajmi va Sequence Length o'rtasidagi asosiy savdo (Tradeoff):",
      explanationUz:
        "Katta va sifatli Subword / BPE Vocabulary uzun matnlarni kamroq tokenlarga siqadi (Sequence Length qisqaradi), bu esa LLM tezligini oshiradi. Ko'p tilli modellar (masalan 200,000 tokenli) bitta lug'atni barcha tillar bilan bo'lishadi.",
    },
    formulaLatex: "\\text{BPE: } (t_a, t_b)^* = \\arg\\max_{(t_a, t_b)} \\text{freq}(t_a, t_b) \\;\\longrightarrow\\; t_{\\text{new}}",
    formulaNoteUz: "BPE korpusda eng ko'p yonma-yon kelgan token juftligini topib, yangi token sifatida Vocabulary ga qo'shadi.",
    visualId: "bpe-tradeoff",
    visualTitleUz: "BPE Birlashtirish va Vocabulary/Sequence Balansi Simulyatori",
    pytorchSnippet: `# BPE g'oyasi: eng ko'p uchraydigan qo'shni juftlikni birlashtirish
tokens = ["r", "e", "a", "d", "i", "n", "g"]
# BPE iteratsiyasi 'i'+'n'+'g' ni ko'p uchragani uchun 'ing' tokenga birlashtiradi
subword_tokens = ["read", "ing", "<EOS>"]
print("Word/Char vs Subword uzunligi:", len(tokens), "->", len(subword_tokens))`,
    exercise: {
      id: "ex-tr-01",
      titleUz: "Amaliy mashq: Eng ko'p uchragan qo'shni juftlikni (BPE step) birlashtirish",
      instructionsUz:
        "`bpe_merge_step(tokens: list[str]) -> list[str]` funksiyasini yozing: u ketma-ket juftliklardan eng ko'p uchragan `(a, b)` ni topsin (teng bo'lsa birinchi uchraganini) va ro'yxatdagi barcha yonma-yon `(a, b)` juftliklarini `a + b` bitta tokenga birlashtirib qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def bpe_merge_step(tokens: list[str]) -> list[str]:
    # 1. Qo'shni juftliklar chastotasini sanang
    # 2. Eng ko'p uchragan juftlikni (a + b) ga birlashtiring
    pass

print(bpe_merge_step(["a", "n", " ", "a", "n", "t"]))`,
      expectedBehaviorUz: "Eng ko'p uchragan qo'shni juftlikni bitta tokenga birlashtiradi.",
      hintsUz: [
        "Agar len(tokens) < 2 bo'lsa tokens nusxasini qaytaring.",
        "Sikl bilan juftliklar sonini hisoblab, eng katta chastotali pair = (best_a, best_b) ni toping.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Eng ko'p uchragan 'an' juftligini birlashtiradi", assertionCode: "bpe_merge_step(['a', 'n', '_', 'a', 'n', 't']) == ['an', '_', 'an', 't']" },
        { id: "tc2", descriptionUz: "Bir elementli ro'yxat o'zgarishsiz qaytadi", assertionCode: "bpe_merge_step(['hello']) == ['hello']" },
        { id: "tc3", descriptionUz: "Ketma-ket takrorlanishni to'g'ri birlashtiradi", assertionCode: "bpe_merge_step(['t', 'h', 'e', '_', 't', 'h']) == ['th', 'e', '_', 'th']" },
      ],
      modelSolution: `def bpe_merge_step(tokens: list[str]) -> list[str]:
    if len(tokens) < 2:
        return list(tokens)
    counts: dict[tuple[str, str], int] = {}
    for i in range(len(tokens) - 1):
        pair = (tokens[i], tokens[i + 1])
        counts[pair] = counts.get(pair, 0) + 1
    best_pair = max(counts, key=lambda p: counts[p])
    merged: list[str] = []
    i = 0
    while i < len(tokens):
        if i + 1 < len(tokens) and (tokens[i], tokens[i + 1]) == best_pair:
            merged.append(tokens[i] + tokens[i + 1])
            i += 2
        else:
            merged.append(tokens[i])
            i += 1
    return merged`,
      solutionExplanationUz: "BPE ning bitta qadamini yozdik: eng ko'p juftlik topiladi va chapdan o'ngga bitta tokenga yig'iladi.",
    },
    quiz: {
      questionUz: "Nima uchun zamonaviy LLM larda Word-level ham, Character-level ham emas, aynan BPE / Subword ishlatiladi?",
      options: [
        "Out-of-Vocabulary muammosini bartaraf etib, Vocabulary hajmi va Sequence Length orasida optimal balans beradi",
        "Chunki BPE faqat ingliz tilidagi so'zlarni o'chirib tashlaydi",
        "Chunki Character-level Vocabulary haddan tashqari katta bo'lib ketadi",
      ],
      correctIndex: 0,
      explanationUz: "Word-level katta Vocabulary va OOV beradi, Character-level esa juda uzun Sequence Length beradi; Subword (BPE) ikkalasini muvozanatlaydi.",
    },
  },
  {
    id: "tr-02-embeddings-rnn-limits",
    order: 2,
    lectureNumber: 1,
    titleUz: "2. Embeddings, Word2Vec va RNN Cheklovlari",
    subtitleEn: "Lecture 1 • One-Hot -> Word2Vec -> RNN/LSTM -> Attention G'oyasi",
    canonicalConceptId: "embeddings-vector-spaces",
    estimatedMinutes: 12,
    analogyUz:
      "One-Hot Encoding — har bir so'zni alohida yopiq qutiga solish (ular bir-biriga umuman o'xshamaydi). RNN esa katta kitobni faqat bitta kichik qog'ozga (Hidden State) konspekt qilib yozib boruvchi o'quvchi — 50-betga kelganda 1-betdagi ismni unutib qo'yadi!",
    theoryParagraphsUz: [
      "Tokenlarni raqamga o'girishning eng sodda yo'li One-Hot Encoding ([1,0,0...]), lekin ularning skalyar ko'paytmasi doim 0 (ortogonal) — ya'ni «teddy» va «soft» naqadar yaqinligini ko'rsatmaydi. Shu sababli Word2Vec (2013) CBOW yoki Skip-Gram kabi proxy task orqali ma'noli zich vektorlar — Embeddings o'rgandi («Paris -> France ≈ Berlin -> Germany»).",
      "Biroq Word2Vec da ikkita katta kamchilik bor edi: 1) So'z kontekstga qarab o'zgarmaydi («river bank» ham, «go to the bank» ham bir xil vektor oladi); 2) So'z tartibi ahamiyatsiz («the child hugs the bear» = «the bear hugs the child»). Buni yechish uchun RNN va LSTM ketma-ketlikni Hidden State orqali o'qidi.",
      "Lekin RNN/LSTM ham ikki devorga urildi: uzoq matnlarda Vanishing Gradient tufayli boshlanishdagi ma'lumot unutiladi (long-range dependency), hamda har bir so'z oldingi so'z hisoblanishini kutishga majbur bo'lgani uchun GPU da parallel o'qitish juda sekin kechadi. Yechim sifatida Attention tug'ildi: model o'tmishdagi istalgan tokenga to'g'ridan-to'g'ri ulanishi mumkin!",
    ],
    keyInsightUz: {
      highlightUz: "Nima uchun RNN dan Attention ga o'tildi?",
      explanationUz:
        "RNN barcha tarixni bitta siqilgan Hidden State ga tiqib, ketma-ket hisoblagani uchun uzoq gaplarni unutardi va GPU da parallel ishlamasdi. Attention esa barcha oldingi tokenlarga to'g'ridan-to'g'ri ko'prik quradi.",
    },
    formulaLatex: "h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t) \\quad \\text{(RNN ketma-ket bog'liqligi)}",
    formulaNoteUz: "RNN da t-qadamni hisoblash uchun albatta (t-1)-holat tugashini kutish shart — parallelizatsiya yo'q.",
    visualId: "word2vec-vs-rnn",
    visualTitleUz: "One-Hot vs Word2Vec (Bank muammosi) vs RNN Xotira Susayishi",
    pytorchSnippet: `import torch
import torch.nn as nn

# Oddiy Embedding jadvali: 1000 ta token -> 64 o'lchamli vektor
emb = nn.Embedding(num_embeddings=1000, embedding_dim=64)
token_ids = torch.tensor([12, 45, 7])  # "a cute bear"
vectors = emb(token_ids)
print("Embedding shakli:", vectors.shape)  # (3, 64)`,
    exercise: {
      id: "ex-tr-02",
      titleUz: "Amaliy mashq: One-Hot vektorlar ortogonalligi vs Embeddings o'xshashligi",
      instructionsUz:
        "`dot_product(a: list[float], b: list[float]) -> float` funksiyasini yozing va ikki vektorning skalyar ko'paytmasini hisoblang.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def dot_product(a: list[float], b: list[float]) -> float:
    # sum(ai * bi) ni qaytaring
    pass

print("One-hot:", dot_product([1, 0, 0], [0, 1, 0]))
print("Embed:", dot_product([0.8, 0.2], [0.7, 0.3]))`,
      expectedBehaviorUz: "Ikki ro'yxatning mos elementlari ko'paytmasi yig'indisini qaytaradi.",
      hintsUz: ["sum(x * y for x, y in zip(a, b)) ko'rinishida hisoblash mumkin."],
      testCases: [
        { id: "tc1", descriptionUz: "One-Hot vektorlar dot producti doim 0.0", assertionCode: "dot_product([1, 0, 0], [0, 1, 0]) == 0.0" },
        { id: "tc2", descriptionUz: "Yaqin Embeddings uchun musbat qiymat", assertionCode: "abs(dot_product([0.8, 0.2], [0.7, 0.3]) - 0.62) < 1e-6" },
      ],
      modelSolution: `def dot_product(a: list[float], b: list[float]) -> float:
    return float(sum(x * y for x, y in zip(a, b)))`,
      solutionExplanationUz: "One-Hot vektorlarda dot product 0 chiqadi, Embeddings da esa o'xshash ma'nolar katta skalyar ko'paytma beradi.",
    },
    quiz: {
      questionUz: "Word2Vec bilan «river bank» va «bank account» gaplaridagi «bank» so'zi qanday vektor oladi?",
      options: [
        "Ikkala gapda ham bir xil statik vektor oladi (kontekstga qarab o'zgarmaydi)",
        "Avtomatik ikki xil ma'noga ajraladi",
        "RNN hidden state orqali farqlanadi",
      ],
      correctIndex: 0,
      explanationUz: "Word2Vec har bir lug'at tokeniga bitta statik embedding tayinlaydi; kontekstga qarab dinamik ma'no berish uchun Self-Attention kerak.",
    },
  },
  {
    id: "tr-03-self-attention-qkv",
    order: 3,
    lectureNumber: 1,
    titleUz: "3. Self-Attention va Scaled Dot-Product (Q, K, V)",
    subtitleEn: "Lecture 1 • «Attention Is All You Need» Formulasi va Matritsa O'lchamlari",
    canonicalConceptId: "attention-mechanism",
    estimatedMinutes: 15,
    analogyUz:
      "Kutubxonada kitob qidirishni tasavvur qiling: sizning savolingiz — Query («teddy bear nimani anglatadi?»). Har bir javondagi yorliq — Key («cute», «is», «reading»). Yorliqlardan mosini topib, o'sha kitob ichidagi mazmun — Value larni aralashtirib yangi javob yasaysiz!",
    theoryParagraphsUz: [
      "2017-yilda «Attention Is All You Need» maqolasi RNN dagi ketma-ketlikdan butunlay voz kechdi va Self-Attention ni taklif qildi: endi har bir token o'zining yangi kontekstli ma'nosini gapdagi BARCHA tokenlarning vaznli yig'indisi sifatida parallel hisoblaydi.",
      "Har bir kirish embeddingi X (o'lchami n × d_model) uchta o'rganiladigan proyeksiya matritsasi W_Q, W_K, W_V orqali Query (Q), Key (K) va Value (V) ga aylanadi. Q · K^T matritsa ko'paytmasi (n × n) har bir juft so'z orasidagi o'xshashlikni beradi — masalan «teddy bear» uchun «cute» bilan skalyar ko'paytma baland chiqadi.",
      "Bu ko'paytma d_k kattalashganda dispersiya portlab ketmasligi uchun √d_k ga bo'linadi, Softmax bilan yig'indisi 1.0 bo'lgan ehtimollikka o'tkaziladi va V ga ko'paytiriladi. Shunda har bir token butun gap kontekstini o'z ichiga olgan yangi vektorga aylanadi.",
    ],
    keyInsightUz: {
      highlightUz: "Nima uchun √d_k ga bo'lamiz va Softmax bu yerda nimani bajaradi?",
      explanationUz:
        "d_k o'lchami katta bo'lsa Q·K^T qiymatlari juda kattalashib Softmax gradientlarini nolga siqib qo'yadi — √d_k ga bo'lish standart og'ishni 1 ga qaytaradi. Bu yerdagi Softmax oxirgi so'zni tanlash emas, Query ning boshqa tokenlar bo'ylab e'tibor taqsimotidir.",
    },
    formulaLatex: "\\text{Attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V",
    formulaNoteUz: "Q (n×d_k) · K^T (d_k×n) -> (n×n) diqqat xaritasi -> Softmax -> × V (n×d_v) = (n×d_v).",
    visualId: "qkv-attention",
    visualTitleUz: "«a cute teddy bear» Self-Attention (Q · K^T / √d_k) Jonli Matritsasi",
    pytorchSnippet: `import torch
import torch.nn.functional as F
import math

Q = torch.randn(1, 4, 8)  # (batch=1, seq_len=4, d_k=8)
K = torch.randn(1, 4, 8)
V = torch.randn(1, 4, 8)

scores = (Q @ K.transpose(-2, -1)) / math.sqrt(8)
weights = F.softmax(scores, dim=-1)
output = weights @ V
print("Diqqat matritsasi:", weights.shape, "Chiqish:", output.shape)`,
    exercise: {
      id: "ex-tr-03",
      titleUz: "Amaliy mashq: 1-qatorda Scaled Dot-Product Attention hisoblash",
      instructionsUz:
        "`single_query_attention(q: list[float], keys: list[list[float]], values: list[list[float]]) -> list[float]` funksiyasini yozing: `score_i = dot(q, keys[i]) / sqrt(len(q))`, so'ng `softmax(scores)` vaznlari bilan `values` larning vaznli yig'indisini hisoblang.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def single_query_attention(
    q: list[float],
    keys: list[list[float]],
    values: list[list[float]],
) -> list[float]:
    # 1. score_i = sum(a*b for a,b in zip(q, k)) / math.sqrt(len(q))
    # 2. softmax bilan vaznlarni oling
    # 3. values ustida vaznli yig'indi qaytaring
    pass`,
      expectedBehaviorUz: "Scaled dot-product attention chiqish vektorini qaytaradi.",
      hintsUz: [
        "Sonli barqarorlik uchun exp(s - max_s) ishlating.",
        "Har bir j indeks uchun sum(weights[i] * values[i][j]) hisoblang.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Bir xil key bo'lsa o'rtacha value qaytaradi", assertionCode: "abs(single_query_attention([1.0, 0.0], [[1.0, 0.0], [1.0, 0.0]], [[2.0, 0.0], [0.0, 4.0]])[0] - 1.0) < 1e-6 and abs(single_query_attention([1.0, 0.0], [[1.0, 0.0], [1.0, 0.0]], [[2.0, 0.0], [0.0, 4.0]])[1] - 2.0) < 1e-6" },
        { id: "tc2", descriptionUz: "Kuchli mos keyga katta vazn beradi", assertionCode: "single_query_attention([10.0, 0.0], [[10.0, 0.0], [0.0, 10.0]], [[1.0], [0.0]])[0] > 0.99" },
      ],
      modelSolution: `import math

def single_query_attention(
    q: list[float],
    keys: list[list[float]],
    values: list[list[float]],
) -> list[float]:
    scale = math.sqrt(len(q))
    scores = [sum(a * b for a, b in zip(q, k)) / scale for k in keys]
    max_s = max(scores)
    exps = [math.exp(s - max_s) for s in scores]
    denom = sum(exps)
    weights = [e / denom for e in exps]
    d_v = len(values[0])
    return [sum(weights[i] * values[i][j] for i in range(len(values))) for j in range(d_v)]`,
      solutionExplanationUz: "Query va Key lar skalyar ko'paytmasini √d_k ga bo'lib, Softmax orqali Value vektorlarini jamladik.",
    },
    quiz: {
      questionUz: "Q·K^T natijasini √d_k ga bo'lishning asosiy sababi nima?",
      options: [
        "d_k kattalashganda skalyar ko'paytma dispersiyasi oshib Softmax ni to'yingan (nol gradientli) zonaga tiqib qo'ymasligi uchun",
        "Sequence Length ni ikki baravar qisqartirish uchun",
        "Bias parametrlarini o'chirish uchun",
      ],
      correctIndex: 0,
      explanationUz: "Bo'lish dispersiyani nazoratda saqlaydi, natijada Softmax barqaror gradientlar beradi.",
    },
  },
  {
    id: "tr-04-transformer-architecture",
    order: 4,
    lectureNumber: 1,
    titleUz: "4. Transformer Arxitekturasi (Encoder-Decoder, Multi-Head & Residual)",
    subtitleEn: "Lecture 1 • 2017 Asl Arxitektura: 8 Bosh, Cross-Attention & Residual",
    canonicalConceptId: "transformer-architecture",
    estimatedMinutes: 14,
    analogyUz:
      "Bitta rasmga bitta ko'z bilan emas, 8 ta mutaxassis (Multi-Head Attention) bir vaqtda har xil burchakdan qaraydi: biri grammatikani, ikkinchisi olmosh bog'lanishini, uchinchisi ma'noni ushlaydi. Keyin barcha kuzatuvlar bitta jamlanma (W_O) ga birlashtiriladi.",
    theoryParagraphsUz: [
      "Asl 2017-yilgi Transformer tarjima uchun ikki qismdan iborat edi: chapda Encoder (N=6 blok, barcha kirish so'zlari o'zaro Self-Attention qiladi) va o'ngda Decoder (tarjima so'zlarini <BOS> dan <EOS> gacha bittadan avtoregressiv yaratadi). Har ikkisida ham asosiy sig'im va bilim saqlanadigan Feed-Forward Network (d_model -> d_ff -> d_model) mavjud.",
      "Decoder ichida ikki xil attention bor: 1) Masked Self-Attention — yuqori uchburchakka -∞ qo'yib kelajak tokenlariga qarashni yopadi (Softmax(-∞) = 0); 2) Cross-Attention — bunda Query Decoderdan keladi, Key va Value esa Encoderning yakuniy chiqishidan olinadi.",
      "Chuqur tarmoq barqaror o'qitilishi uchun 4 ta muhim muhandislik hiylasi qo'llangan: Residual Connection (x + Sublayer(x) gradient oqimini saqlaydi), Layer Normalization, treningda Dropout, va yakuniy maqsadni 100% dan 90% ga yumshatuvchi Label Smoothing.",
    ],
    keyInsightUz: {
      highlightUz: "Transformer dagi eng asosiy ikki dvigatel qaysi?",
      explanationUz:
        "Stanford ma'ruzasida Shervin ta'kidlaganidek: «Sehrning asosi — tokenlarni bog'lovchi Attention va asosiy parametr sig'imini saqlovchi Feed-Forward Network. Qolganlari (Residual, Norm, Dropout) esa ularni chuqur qatlamlarda barqaror o'qitish usullaridir».",
    },
    formulaLatex: "\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O, \\quad y = \\text{LayerNorm}(x + \\text{Sublayer}(x))",
    formulaNoteUz: "8 ta bosh natijasi birlashtirilib W^O bilan d_model o'lchamiga qaytariladi; Residual (x + ...) gradientni himoyalaydi.",
    visualId: "encoder-decoder-flow",
    visualTitleUz: "Encoder-Decoder, Cross-Attention va Causal Mask Sxemasi",
    pytorchSnippet: `import torch
import torch.nn as nn

layer = nn.TransformerDecoderLayer(d_model=64, nhead=8, dim_feedforward=256, batch_first=True)
tgt = torch.randn(1, 5, 64)     # Decoder kirishi (<BOS>...)
memory = torch.randn(1, 6, 64)  # Encoder chiqishi (K va V shu yerdan!)
causal_mask = nn.Transformer.generate_square_subsequent_mask(5)  # Kelajak = -inf
out = layer(tgt, memory, tgt_mask=causal_mask)
print("Decoder chiqishi:", out.shape)`,
    exercise: {
      id: "ex-tr-04",
      titleUz: "Amaliy mashq: Decoder uchun Causal (-inf / 0) Mask matritsasini tuzish",
      instructionsUz:
        "`make_causal_mask(n: int) -> list[list[float]]` funksiyasini yozing: `i >= j` (o'tmish va hozirgi token) uchun `0.0`, `i < j` (kelajakdagi taqiqlangan token) uchun `-1e9` qo'ysin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def make_causal_mask(n: int) -> list[list[float]]:
    # n x n o'lchamli pastki uchburchak 0.0, yuqori qismi -1e9 bo'lgan matritsa qaytaring
    pass

print(make_causal_mask(3))`,
      expectedBehaviorUz: "Diagonal va undan pasti 0.0, yuqori uchburchak -1e9 qaytaradi.",
      hintsUz: ["[[0.0 if j <= i else -1e9 for j in range(n)] for i in range(n)]"],
      testCases: [
        { id: "tc1", descriptionUz: "3x3 causal mask to'g'ri tuziladi", assertionCode: "make_causal_mask(3) == [[0.0, -1e9, -1e9], [0.0, 0.0, -1e9], [0.0, 0.0, 0.0]]" },
        { id: "tc2", descriptionUz: "n=1 bo'lganda [[0.0]]", assertionCode: "make_causal_mask(1) == [[0.0]]" },
      ],
      modelSolution: `def make_causal_mask(n: int) -> list[list[float]]:
    return [[0.0 if j <= i else -1e9 for j in range(n)] for i in range(n)]`,
      solutionExplanationUz: "Softmax dan oldin kelajak katakchalariga katta manfiy son qo'shilganda ehtimollik 0 ga tushadi.",
    },
    quiz: {
      questionUz: "Encoder-Decoder Transformer da Cross-Attention qatlamida Q, K va V qayerdan olinadi?",
      options: [
        "Query (Q) Decoderdan keladi; Key (K) va Value (V) esa Encoder chiqishidan olinadi",
        "Uchalasi ham faqat Encoderdan olinadi",
        "Uchalasi ham faqat Decoderdan olinadi",
      ],
      correctIndex: 0,
      explanationUz: "Tarjima qilinayotgan Decoder tokeni o'z so'rovini (Q) berib, Encoderdagi manba matn tokenlaridan (K, V) mos ma'lumotni tortib oladi.",
    },
  },

  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 2 (transformers2.md)                                           */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-05-bert-vs-gpt",
    order: 5,
    lectureNumber: 2,
    titleUz: "5. Encoder-Only (BERT) vs Decoder-Only (GPT)",
    subtitleEn: "Lecture 2 • Ikki Tomonlama Tushunish vs Avtoregressiv Matn Yaratish",
    canonicalConceptId: "dl-gpt",
    estimatedMinutes: 12,
    analogyUz:
      "BERT — butun sahifani birdaniga o'qib, o'rtada tushib qolgan so'zni chap ham o'ng tomondagi qatorlarga qarab topuvchi detektiv. GPT esa sahifa davomida chapdan o'ngga faqat oldingi yozuvlarga qarab keyingi so'zni yozib boruvchi yozuvchi.",
    theoryParagraphsUz: [
      "Asl Transformer dan so'ng tadqiqotchilar ikki yo'nalishga ajraldi. 2018-yilda BERT faqat Encoder qismini oldi: kirish boshiga [CLS] tokeni qo'shilib, ikki tomonlama Self-Attention orqali barcha tokenlar o'zaro bog'lanadi. Pre-Training da ikki proxy task ishlatiladi: Masked Language Modeling (tasodifiy [MASK] so'zni tiklash) va Next Sentence Prediction (NSP), so'ng vazifa uchun Fine-Tuning qilinadi.",
      "Ikkinchi oqim — GPT faqat Decoder qismini (Encoder va Cross-Attention siz!) oldi va barcha vazifalarni yagona «text-to-text» keyingi token bashorati sifatida birlashtirdi. Sentiment aniqlash uchun ham endi maxsus klassifikator o'qitish shart emas — shunchaki savol berish kifoya.",
      "Bugungi LLM lar deyarli to'liq Decoder-Only arxitekturasiga o'tdi. Sababi: u sodda, kirish va chiqishga alohida ishlov bermaydi, bitta Causal Masked Self-Attention va Feed-Forward Network zanjiridan iborat bo'lib, trillionlab tokenlarda juda yaxshi kengayadi.",
    ],
    keyInsightUz: {
      highlightUz: "Encoder-Decoder ham generatsiya qila olardi, nega Decoder-Only g'olib chiqdi?",
      explanationUz:
        "Encoder-Decoder da kirishga ikki tomonlama attention berib, chiqishga alohida blok ishlatish kerak edi. Decoder-Only hamma matnni bitta oqimda ko'rib, Causal Attention bilan bir xil shablonda ham tushunadi, ham matn yaratadi.",
    },
    formulaLatex: "\\text{BERT: } P(x_i \\mid x_{\\text{chap}}, x_{\\text{o'ng}}) \\qquad \\text{vs} \\qquad \\text{GPT: } P(x_t \\mid x_1, \\dots, x_{t-1})",
    formulaNoteUz: "BERT ikki tomonlama kontekstdan [MASK] ni tiklaydi; GPT esa faqat avvalgi tokenlarga qarab keyingi tokenni yaratadi.",
    visualId: "bert-vs-gpt",
    visualTitleUz: "BERT (Bidirectional Encoder) vs GPT (Causal Decoder) Taqqusi",
    pytorchSnippet: `import torch

# Causal mask (GPT): har token faqat chapga qaraydi
causal_attn = torch.tril(torch.ones(4, 4))
# Bidirectional (BERT): barcha tokenlar hamma bilan bog'lanadi
bidir_attn = torch.ones(4, 4)
print("GPT Causal mask:\\n", causal_attn)`,
    exercise: {
      id: "ex-tr-05",
      titleUz: "Amaliy mashq: Bidirectional vs Causal bog'lanishlar sonini solishtirish",
      instructionsUz:
        "`attention_pairs_count(seq_len: int, causal: bool) -> int` funksiyasini yozing: `causal=False` (BERT) bo'lsa `seq_len * seq_len`, `causal=True` (GPT) bo'lsa faqat pastki uchburchak `seq_len * (seq_len + 1) // 2` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def attention_pairs_count(seq_len: int, causal: bool) -> int:
    # Bidirectional -> n^2, Causal -> n*(n+1)//2
    pass`,
      expectedBehaviorUz: "BERT uchun n^2, GPT uchun n*(n+1)//2 qaytaradi.",
      hintsUz: ["if causal: return seq_len * (seq_len + 1) // 2"],
      testCases: [
        { id: "tc1", descriptionUz: "seq_len=4, causal=False -> 16", assertionCode: "attention_pairs_count(4, False) == 16" },
        { id: "tc2", descriptionUz: "seq_len=4, causal=True -> 10", assertionCode: "attention_pairs_count(4, True) == 10" },
      ],
      modelSolution: `def attention_pairs_count(seq_len: int, causal: bool) -> int:
    if causal:
        return seq_len * (seq_len + 1) // 2
    return seq_len * seq_len`,
      solutionExplanationUz: "Causal decoder faqat o'zi va chapdagi tokenlar (n(n+1)/2 juftlik) bilan bog'lanadi.",
    },
    quiz: {
      questionUz: "BERT ning [CLS] tokeni asosan nima maqsadda ishlatiladi?",
      options: [
        "Gap boshiga qo'yilib, butun kirish gapining umumlashgan tasvirini klassifikatsiya vazifalariga uzatish uchun",
        "Generatsiyani to'xtatuvchi <EOS> vazifasida",
        "GPU dagi KV Cache ni o'chirish uchun",
      ],
      correctIndex: 0,
      explanationUz: "Bidirectional Self-Attention tufayli [CLS] vektor barcha tokenlar bilan muloqot qilib, butun gap ma'nosini jamlaydi.",
    },
  },
  {
    id: "tr-06-scaling-laws-chinchilla",
    order: 6,
    lectureNumber: 2,
    titleUz: "6. Scaling Laws, Chinchilla va Mixture of Experts (MoE)",
    subtitleEn: "Lecture 2 • Compute-Optimal Balans (1:20) va Sparse MoE / Routing Collapse",
    canonicalConceptId: "dl-moe",
    estimatedMinutes: 15,
    analogyUz:
      "Katta korxonada matematika savoli tushsa, binodagi barcha 300 nafar xodimni (Dense model) majlisga yig'ish shart emas! Darvoza (Router) savolni ko'rib, faqat 8 nafar matematika/kod ekspertini chaqiradi (Sparse MoE) — ham tezkor, ham bilimli!",
    theoryParagraphsUz: [
      "2020-yilgi Scaling Laws shuni ko'rsatdiki, model hajmi, tokenlar soni va hisoblash (FLOPs — kichik s bilan jami amallar; FLOP/s — GPU tezligi) oshgani sayin Loss bashorat qilinadigan darajada kamayadi. 2022-yilda Chinchilla maqolasi ko'p modellar yetarlicha ma'lumotda o'qitilmaganini (undertrained) ochib berdi: berilgan byudjetda har 1 parametrga ~20 ta token (masalan 70B modelga 1.4T token) Compute-Optimal hisoblanadi.",
      "Ammo trillion parametrli zich (Dense) modellarni ishlatish juda qimmat. Mixture of Experts (MoE) buni hal qiladi: transformerning Feed-Forward Network qatlami o'rniga ko'plab ekspertlar qo'yiladi (masalan 256 yoki 384 ta) va Router har bir tokenda faqat Top-K (masalan K=8) ekspertni + barcha tokenlar uchun doimiy Shared Experts ni faollashtiradi.",
      "MoE o'qitishdagi eng katta xavf — Routing Collapse: boshida tasodifan tanlangan 1-2 ekspert ko'proq yangilanib kuchayaveradi, qolganlari esa «ishsiz» qolib ketadi. Buni tuzatish uchun Router ga barcha ekspertlarni tengroq ishlatishga majburlovchi Load Balancing Auxiliary Loss qo'shiladi (stop-gradient usuli yordamida).",
    ],
    keyInsightUz: {
      highlightUz: "Chinchilla qoidasi va ishlab chiqarish (Inference) farqi:",
      explanationUz:
        "Chinchilla (1 parametr : 20 token) trening byudjeti uchun optimal. Ammo real servisda kichikroq modelni 20 tadan ko'proq tokenlarda uzoq o'qitish (overtraining) foydaliroq bo'lishi mumkin — chunki foydalanuvchiga javob berish narxi arzonlashadi.",
    },
    formulaLatex: "\\hat{y} = \\sum_{i \\in \\text{Top-}K} g_i(x)\\, E_i(x), \\qquad \\mathcal{L}_{\\text{aux}} = \\alpha N \\sum_{i=1}^{N} f_i \\cdot P_i",
    formulaNoteUz: "Sparse MoE da faqat Top-K ekspert E_i ishlaydi; Load Balancing Loss (f_i · P_i) barcha ekspertlarga tokenlarni teng taqsimlaydi.",
    visualId: "chinchilla-moe",
    visualTitleUz: "Chinchilla (1:20) Kalkulyatori va Sparse MoE Router / Routing Collapse",
    pytorchSnippet: `import torch
import torch.nn as nn

# Top-2 Sparse MoE Router soddalashtirilgan ko'rinishi
gate = nn.Linear(64, 8)  # 8 ta ekspert uchun ball
x = torch.randn(4, 64)   # 4 ta token
probs = torch.softmax(gate(x), dim=-1)
top_weights, top_idx = torch.topk(probs, k=2, dim=-1)
print("Har bir tokenga tanlangan 2 ta ekspert:", top_idx.tolist())`,
    exercise: {
      id: "ex-tr-06",
      titleUz: "Amaliy mashq: Chinchilla tavsiya etgan token soni va MoE faollashish ulushi",
      instructionsUz:
        "`chinchilla_and_moe_stats(params_billions: float, active_experts: int, total_experts: int) -> tuple[float, float]` funksiyasini yozing: u Chinchilla optimal tokenlar sonini (milliardda `20 * params_billions`) hamda MoE da faol ekspertlar ulushini (`active_experts / total_experts`) qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def chinchilla_and_moe_stats(
    params_billions: float,
    active_experts: int,
    total_experts: int,
) -> tuple[float, float]:
    # (optimal_tokens_B, active_ratio) qaytaring
    pass`,
      expectedBehaviorUz: "20x token tavsiyasini va faol ekspert nisbatini qaytaradi.",
      hintsUz: ["return (20.0 * params_billions, active_experts / total_experts)"],
      testCases: [
        { id: "tc1", descriptionUz: "70B modelga 1400B (1.4T) token; 8/256 ekspert = 0.03125", assertionCode: "chinchilla_and_moe_stats(70.0, 8, 256)[0] == 1400.0 and abs(chinchilla_and_moe_stats(70.0, 8, 256)[1] - 0.03125) < 1e-6" },
      ],
      modelSolution: `def chinchilla_and_moe_stats(
    params_billions: float,
    active_experts: int,
    total_experts: int,
) -> tuple[float, float]:
    return (20.0 * params_billions, active_experts / total_experts)`,
      solutionExplanationUz: "Chinchilla ~20 token/parametr qoidasini va Sparse MoE ning atigi ~3% ekspert faollashtirish samarasini ko'rdik.",
    },
    quiz: {
      questionUz: "Transformer ichida Mixture of Experts (MoE) qatlami odatda qayerga joylashtiriladi?",
      options: [
        "Feed-Forward Network (FFN) o'rniga — chunki modelning eng ko'p parametri va hisoblash sig'imi aynan shu yerda",
        "Faqat Tokenizer ichiga",
        "SoftMax oxiridan ham keyinroq",
      ],
      correctIndex: 0,
      explanationUz: "Attention tokenlar o'rtasida aloqa o'rnatsa, asosiy parametr va hisoblash FFN qatlamida bo'ladi — shuning uchun FFN ekspertlarga bo'linadi.",
    },
  },
  {
    id: "tr-07-rope-gqa-rmsnorm",
    order: 7,
    lectureNumber: 2,
    titleUz: "7. Zamonaviy Transformer Yangilanishlari: RoPE, GQA, Sliding Window va RMSNorm",
    subtitleEn: "Lecture 2 • 2017 dan Hozirgacha Barcha Muhim Arxitektura O'zgarishlari",
    canonicalConceptId: "dl-gpt",
    estimatedMinutes: 15,
    analogyUz:
      "Soat millarini eslang: soat mili sekin, daqiqa o'rtacha, soniya tez aylanadi — ularning burchagi ayni vaqtni bildiradi! RoPE ham xuddi shunday: har bir juft o'lchamdagi Query va Key vektorini token pozitsiyasiga qarab ma'lum burchakka buradi.",
    theoryParagraphsUz: [
      "2017-yilda pozitsiya Sinusoidal (yoki o'rganiladigan) vektor ko'rinishida kirishga qo'shilardi, bu esa keyingi FFN qatlamlariga ham keraksiz pozitsiya shovqinini olib kirardi. Zamonaviy modellar buni faqat Attention ichiga kiritadi: T5/ALiBi chiziqli jarima qo'shsa, standartga aylangan RoPE (Rotary Position Embedding) Query va Key juft koordinatalarini pozitsiya m·θ ga aylantiradi — natijada Q·K^T faqat nisbiy masofa (n - m) ga bog'liq bo'ladi.",
      "Ikkinchi katta yangilanish xotira va tezlikka qaratilgan: Sliding Window Attention tokenni faqat yaqin qo'shnilar oynasiga qaratadi (ko'p blok ustma-ust qo'yilganda CNN receptive field kabi uzoqni ham ko'ra oladi). KV Cache xotirasini tejash uchun esa ko'pQuery lar bitta Key/Value guruhini bo'lishadigan Grouped Query Attention (GQA) ishlatiladi — Query saqlanmaydi, shuning uchun faqat K va V ni qisqartirish yetarli.",
      "Nihoyat normalizatsiyada ham ikkita muhim o'zgarish qilindi: Post-Norm (Norm(x + f(x))) o'rniga Residual oqimini toza saqlovchi Pre-Norm (x + f(Norm(x))), hamda o'rtachani ayirib o'tirmay faqat kvadrat ildiz o'rtachasi (RMS) bilan masshtablaydigan tezkor RMSNorm!",
    ],
    keyInsightUz: {
      highlightUz: "2017 Asl Transformer vs 2026 Zamonaviy LLM Qisqa Qiyosi:",
      explanationUz:
        "2017: Sinusoidal qo'shish + Global MHA + Post-Norm + LayerNorm. Hozir: RoPE aylanish + GQA + Sliding Window + Pre-Norm + RMSNorm.",
    },
    formulaLatex: "q_m^T k_n = (R_{\\theta, m} q)^T (R_{\\theta, n} k) = q^T R_{\\theta, n-m} k, \\qquad \\text{RMSNorm}(x) = \\frac{x}{\\sqrt{\\frac{1}{d}\\sum x_i^2 + \\epsilon}} \\odot \\gamma",
    formulaNoteUz: "RoPE da aylanish matritsalari ko'paytganda faqat nisbiy masofa (n-m) qoladi; RMSNorm esa o'rtachani ayirishsiz ishlaydi.",
    visualId: "rope-gqa-rmsnorm",
    visualTitleUz: "RoPE Burchak Aylanishi & GQA KV Cache Xotira Tejash Kalkulyatori",
    pytorchSnippet: `import torch

# RMSNorm ning PyTorch da sodda ko'rinishi (o'rtacha ayirilmaydi!)
def rms_norm(x: torch.Tensor, gamma: torch.Tensor, eps: float = 1e-6):
    rms = torch.sqrt(x.pow(2).mean(dim=-1, keepdim=True) + eps)
    return (x / rms) * gamma

x = torch.randn(2, 16)
print("RMSNorm chiqishi:", rms_norm(x, torch.ones(16)).shape)`,
    exercise: {
      id: "ex-tr-07",
      titleUz: "Amaliy mashq: 2D RoPE aylanishini vektor ustida bajarish",
      instructionsUz:
        "`rotate_2d(x0: float, x1: float, angle: float) -> tuple[float, float]` funksiyasini yozing: `[x0*cos(angle) - x1*sin(angle), x0*sin(angle) + x1*cos(angle)]` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def rotate_2d(x0: float, x1: float, angle: float) -> tuple[float, float]:
    # 2D aylanish matritsasini qo'llang
    pass`,
      expectedBehaviorUz: "Vektorni berilgan radian burchakka aylantiradi.",
      hintsUz: ["c = math.cos(angle); s = math.sin(angle); return (x0*c - x1*s, x0*s + x1*c)"],
      testCases: [
        { id: "tc1", descriptionUz: "90 gradus (pi/2) aylantirganda (1, 0) -> (0, 1)", assertionCode: "abs(rotate_2d(1.0, 0.0, __import__('math').pi / 2)[0]) < 1e-6 and abs(rotate_2d(1.0, 0.0, __import__('math').pi / 2)[1] - 1.0) < 1e-6" },
        { id: "tc2", descriptionUz: "0 radian aylantirganda vektor o'zgarmaydi", assertionCode: "rotate_2d(3.0, 4.0, 0.0) == (3.0, 4.0)" },
      ],
      modelSolution: `import math

def rotate_2d(x0: float, x1: float, angle: float) -> tuple[float, float]:
    c = math.cos(angle)
    s = math.sin(angle)
    return (x0 * c - x1 * s, x0 * s + x1 * c)`,
      solutionExplanationUz: "RoPE ning 2D blokli aylanish qadamini yozdik: Q va K uzunliklarini o'zgartirmasdan faqat burchaklarini siljitadi.",
    },
    quiz: {
      questionUz: "Grouped Query Attention (GQA) ning Multi-Head Attention (MHA) ga nisbatan asosiy yutug'i nimada?",
      options: [
        "Bir nechta Query boshi umumiy Key va Value ni bo'lishgani uchun KV Cache xotirasi keskin tejaladi",
        "Tokenizer hajmini 2 barobar oshiradi",
        "Pre-Norm ni Post-Norm ga almashtiradi",
      ],
      correctIndex: 0,
      explanationUz: "Autoregressive generatsiyada avvalgi tokenlarning K va V lari KV Cache da saqlanadi; GQA K/V boshlarini qisqartirib VRAM ni tejaydi.",
    },
  },
  {
    id: "tr-08-decoding-prompting",
    order: 8,
    lectureNumber: 2,
    titleUz: "8. Decoding Strategiyalari, Batch Invariance va Prompting",
    subtitleEn: "Lecture 2 • Temperature, Top-K/Top-P, Context Rot, In-Context Learning & CoT",
    canonicalConceptId: "prompt-engineering-cot",
    estimatedMinutes: 15,
    analogyUz:
      "Temperature — oshpazning ijodiylik tugmasi: T → 0 bo'lsa har safar bir xil eng ishonchli retseptni (deterministik), T > 1 bo'lsa dadil va kutilmagan yangi variantlarni sinab ko'radi. Context Rot esa 500 betlik kitob o'rtasiga yashirilgan bitta raqamni topish qiyinlashuviga o'xshaydi!",
    theoryParagraphsUz: [
      "Decoder chiqishidagi logitlar Vocabulary bo'yicha ehtimollikka aylanadi. Har doim eng katta ehtimolni olish (Greedy Search) yoki K ta eng yaxshi yo'lni saqlash (Beam Search) deterministik va robotik javob beradi. Xilma-xil muloqot uchun Temperature bilan ehtimollik egri chizig'i sozlanib, Top-K (eng kuchli K nomzod) yoki Top-P (yig'indi P ga yetguncha) dan tasodifiy tanlanadi. Qizig'i, Temperature = 0 bo'lsa ham amaliyotda GPU batching va suzuvchi nuqtali qo'shishning assotsiativ emasligi (Batch Invariance yo'qligi) sabab javob ozgina farq qilishi mumkin.",
      "Ishlab chiqarishda aniq JSON formati shart bo'lganda Guided Decoding keyingi ruxsat etilgan tokenlarni sintaksisga ko'ra cheklab, 100% to'g'ri JSON kafolatlaydi. Shu bilan birga, foydalanuvchi kiritgan prompt ham, model yozgan har bir javob tokeni ham bir xil Context Window ichida hisoblanadi.",
      "Muhim amaliy xavf — Context Rot: kontekst oynasi juda cho'zilganda (100K–1M), Needle-in-a-Haystack testlari model o'rtadagi faktni unutishi yoki adashishini ko'rsatadi; shuning uchun yangi chat ochish va Context Compaction muhim. Vazn o'zgartirmay sifatni oshirishda esa In-Context Learning (Zero-Shot / Few-Shot), Chain-of-Thought (bosqichma-bosqich fikrlash) va bir necha javobdan ko'pchilik ovozi bilan tanlovchi Self-Consistency qo'llaniladi.",
    ],
    keyInsightUz: {
      highlightUz: "Nima uchun Context Window cheksiz katta bo'lsa ham uni to'ldiravermaslik kerak?",
      explanationUz:
        "Attention O(n²) hisoblash narxidan tashqari, Context Rot tufayli ortiqcha shovqin ichida kerakli ma'lumotni topish sifati pasayadi — toza va ixcham kontekst doim yaxshiroq natija beradi.",
    },
    formulaLatex: "P_i = \\frac{\\exp(z_i / T)}{\\sum_{j=1}^{V} \\exp(z_j / T)}, \\qquad (a + b) + c \\neq a + (b + c)\\; \\text{(floating point)}",
    formulaNoteUz: "T kichik (<1) -> ehtimollik cho'qqisi o'tkir; T katta (>1) -> tekis taqsimot. Floating-point qo'shish tartibi T=0 da ham kichik farq berishi mumkin.",
    visualId: "decoding-temperature",
    visualTitleUz: "Temperature (T), Top-K / Top-P va Context Rot Simulyatori",
    pytorchSnippet: `import torch

logits = torch.tensor([3.0, 2.0, 0.5])
for temp in [0.3, 1.0, 2.0]:
    probs = torch.softmax(logits / temp, dim=-1)
    print(f"T={temp}:", [round(p, 3) for p in probs.tolist()])`,
    exercise: {
      id: "ex-tr-08",
      titleUz: "Amaliy mashq: Temperature bilan Softmax va Top-K ni hisoblash",
      instructionsUz:
        "`softmax_temperature(logits: list[float], temperature: float) -> list[float]` funksiyasini yozing: `temperature` ga bo'lingan logitlardan barqaror softmax ehtimolliklari ro'yxatini qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def softmax_temperature(logits: list[float], temperature: float) -> list[float]:
    # scaled = z / temperature ustida barqaror softmax hisoblang
    pass`,
      expectedBehaviorUz: "Berilgan Temperature bo'yicha yig'indisi 1.0 ga teng ehtimolliklar qaytaradi.",
      hintsUz: ["Har bir logitni temperature ga bo'ling, keyin max ni ayirib exp oling."],
      testCases: [
        { id: "tc1", descriptionUz: "Kichik temperature (0.2) eng katta logitga ~1.0 yaqin ehtimol beradi", assertionCode: "softmax_temperature([3.0, 1.0, 0.0], 0.2)[0] > 0.99" },
        { id: "tc2", descriptionUz: "Katta temperature ehtimollarni tekislaydi", assertionCode: "softmax_temperature([3.0, 1.0, 0.0], 5.0)[0] < 0.5 and abs(sum(softmax_temperature([3.0, 1.0, 0.0], 5.0)) - 1.0) < 1e-6" },
      ],
      modelSolution: `import math

def softmax_temperature(logits: list[float], temperature: float) -> list[float]:
    scaled = [z / temperature for z in logits]
    m = max(scaled)
    exps = [math.exp(z - m) for z in scaled]
    s = sum(exps)
    return [e / s for e in exps]`,
      solutionExplanationUz: "Temperature softmax taqsimotini o'tkirlashtirish yoki yumshatish orqali javob xilma-xilligini boshqaradi.",
    },
    quiz: {
      questionUz: "Agar LLM ga Temperature = 0 berilgan bo'lsa ham, ba'zan bir xil promptga biroz boshqacha javob chiqishining kompyuterdagi sababi nima?",
      options: [
        "GPU inference da so'rovlar har xil batchlarda qo'shilishi va floating-point amallarning assotsiativ emasligi (Batch Invariance buzilishi)",
        "Tokenizer tasodifiy so'zlarni o'chirib yuborishi",
        "Temperature = 0 tasodifiy shovqin qo'shishi",
      ],
      correctIndex: 0,
      explanationUz: "Suzuvchi nuqtali sonlarni turli tartibda qo'shish (floating-point non-associativity) kichik yaxlitlash farqi orqali chegara holatlarda boshqa tokenni chiqarishi mumkin.",
    },
  },

  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 3 (transformers3.md)                                           */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-09-pretraining-data-bpb",
    order: 9,
    lectureNumber: 3,
    titleUz: "9. Pre-Training, Teacher Forcing, Cross-Entropy va Bits Per Byte (BPB)",
    subtitleEn: "Lecture 3 • Parallel O'qitish, Ma'lumot Filtrlash va Model Collapse",
    canonicalConceptId: "loss-cost-functions",
    estimatedMinutes: 15,
    analogyUz:
      "Pre-Training da model yosh boladek internetdagi minglab kitob va kodlarni o'qib til tuzilishini tushunadi. Lekin ikki xil lug'atli (Tokenizer) modelni solishtirish uchun «sahifada nechta gap xato» emas, umumiy «bayt boshiga necha bit» (BPB) degan adolatli metr o'lchanadi!",
    theoryParagraphsUz: [
      "Pre-Training Transfer Learning ning poydevoridir: model trillionlab web, kod (GitHub), matematika va ilmiy matnlar ustida keyingi tokenni bashorat qilishni o'rganadi. Trening vaqtida biz tokenlarni bitta-bitta kutmaymiz: Teacher Forcing va Causal Masked Self-Attention tufayli butun hujjatning har bir pozitsiyasi parallel bashorat qilinadi — lekin model o'z xatosini emas, doim haqiqiy matndagi to'g'ri tokenni ko'rib o'rganadi (train vs inference tafovuti).",
      "Maqsad — haqiqiy ketma-ketlik ehtimolini maksimal qilish, ya'ni manfiy log-ehtimol o'rtachasini — Cross-Entropy Loss ni minimallashtirish. Ammo Cross-Entropy qiymati Tokenizer lug'atiga bog'liq bo'lgani uchun, turli tokenizerli modellarni adolatli taqqoslashda tokenizerdan mustaqil Bits Per Byte (BPB = (N_tokens / N_bytes) * Loss / ln(2)) ishlatiladi.",
      "Bugungi katta muammo — internetdagi CommonCrawl ma'lumotlarining ko'p qismi AI matnlari bilan ifloslangani (~1% sifatli qismi ajratib olinadi). Agar AI yaratgan matnda yana boshqa AI o'qitilaversa, kam uchraydigan boy ifodalar yo'qolib Model Collapse yuz beradi. Shuningdek, sifatli ma'lumot kam bo'lsa, uni ~4 martagacha takrorlab o'qitish foydali ekanligi tadqiqotlarda ko'rsatilgan.",
    ],
    keyInsightUz: {
      highlightUz: "Pre-Training tugagan model hali savollarga javob beruvchi yordamchi EMAS!",
      explanationUz:
        "Agar Pre-Training dan chiqqan modelga «O'yinchoq ayiqchani kir mashinada yuvsa bo'ladimi?» desangiz, u «Ha» yoki «Yo'q» deb javob bermaydi — balki maqola davomidek «...ayiqchalar paxta va poliesterdan tayyorlanadi» deb matnni davom ettirib ketadi!",
    },
    formulaLatex: "\\mathcal{L}_{\\text{CE}} = -\\frac{1}{T}\\sum_{t=1}^{T}\\log P_{\\theta}(x_t \\mid x_{<t}), \\qquad \\text{BPB} = \\frac{N_{\\text{tokens}}}{N_{\\text{bytes}}} \\cdot \\frac{\\mathcal{L}_{\\text{CE}}}{\\ln(2)}",
    formulaNoteUz: "BPB Cross-Entropy Loss ni bayt boshiga bitlarga aylantirib, turli tokenizerli modellarni xolis solishtirishga imkon beradi.",
    visualId: "pretrain-bpb-collapse",
    visualTitleUz: "Teacher Forcing Parallel Shift, BPB Metrikasi va Model Collapse",
    pytorchSnippet: `import math

# Bir xil gap uchun ikki xil tokenizerning BPB (Bits Per Byte) solishtirmasi
ce_loss_nats = 2.1
n_tokens, n_bytes = 25, 100
bpb = (n_tokens / n_bytes) * (ce_loss_nats / math.log(2))
print("Bits Per Byte (BPB):", round(bpb, 4))`,
    exercise: {
      id: "ex-tr-09",
      titleUz: "Amaliy mashq: Cross-Entropy Loss dan Bits Per Byte (BPB) ni hisoblash",
      instructionsUz:
        "`compute_bpb(loss_nats: float, num_tokens: int, num_bytes: int) -> float` funksiyasini yozing: `(num_tokens / num_bytes) * (loss_nats / math.log(2))` formulasini hisoblab qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def compute_bpb(loss_nats: float, num_tokens: int, num_bytes: int) -> float:
    # BPB formulasini hisoblang
    pass`,
      expectedBehaviorUz: "Berilgan loss, token soni va bayt soni bo'yicha BPB qaytaradi.",
      hintsUz: ["(num_tokens / num_bytes) * (loss_nats / math.log(2))"],
      testCases: [
        { id: "tc1", descriptionUz: "4 baytga 1 token to'g'ri kelsa loss ni 4*ln(2) ga bo'ladi", assertionCode: "abs(compute_bpb(__import__('math').log(2), 25, 100) - 0.25) < 1e-6" },
      ],
      modelSolution: `import math

def compute_bpb(loss_nats: float, num_tokens: int, num_bytes: int) -> float:
    return (num_tokens / num_bytes) * (loss_nats / math.log(2))`,
      solutionExplanationUz: "BPB tokenizer bo'laklashidagi farqlarni yo'qotib, modellar sifatini bayt darajasida taqqoslaydi.",
    },
    quiz: {
      questionUz: "Nima uchun internetdan yig'ilgan ma'lumotlarni filtrlamasdan LLM yaratgan matnlarda qayta-qayta Pre-Training qilish xavfli?",
      options: [
        "Model Collapse yuz berib, asl boy taqsimot va kam uchraydigan bilimlar yo'qolib boradi",
        "Chinchilla nisbati 1:1 ga tushib qoladi",
        "Tokenizer birdaniga character-level ga o'zgaradi",
      ],
      correctIndex: 0,
      explanationUz: "Model o'z sintetik cheklangan namunalaridan o'qisa, xilma-xillik qisqaradi va sifat yemiriladi (Model Collapse).",
    },
  },
  {
    id: "tr-10-midtraining-yarn-sft",
    order: 10,
    lectureNumber: 3,
    titleUz: "10. Mid-Training (YaRN Long Context) va SFT + LoRA",
    subtitleEn: "Lecture 3 • 4K dan 128K ga Cho'zish, Javobda Loss Hisoblash va LoRA",
    canonicalConceptId: "fine-tuning-lora-peft",
    estimatedMinutes: 15,
    analogyUz:
      "Pre-Training tugagan model — hamma darslikni o'qib chiqqan, lekin savolga qanday javob berishni bilmaydigan talaba. SFT unga imtihon savol–javob odobini o'rgatadi. LoRA esa butun qalin ensiklopediyani qayta yozmasdan, chetiga kichik yopishqoq eslatma (B·A) qo'shishdir!",
    theoryParagraphsUz: [
      "Zamonaviy pipeline da Pre-Training (4K kontekst) dan keyin Mid-Training keladi: sifatli kod (PR diff lar), kitoblar va mantiqiy ma'lumotlar Best-Fit Packing bilan qo'shiladi, hamda Context Window 128K–200K gacha cho'ziladi. Bunda RoPE burilishlari model ko'rmagan uzoq burchaklarga chiqib ketmasligi uchun YaRN usuli chastotalarni avvalgi o'rganilgan oraliqqa interpolyatsiya qiladi. Ammo baribir Knowledge Cutoff sanasigacha bo'lgan bilimlargina modelda saqlanadi.",
      "So'ngra SFT (Supervised Fine-Tuning) keladi: minglab yoki millionga yaqin yuqori sifatli «Instruction -> Response» juftliklarida model foydali yordamchiga aylanadi. Muhim qoida: SFT da foydalanuvchi kiritgan prompt uchun Loss hisoblanmaydi — model faqat assistant javobi (y_t | X, y_<t) ni bashorat qilishda jazolanadi!",
      "Milliardsiz/milliardlab parametrlarni to'liq qayta o'qitish o'rniga LoRA (Low-Rank Adaptation) ishlatiladi: asosiy vazn W_0 muzlatiladi va faqat kichik W_0 + B·A matritsalari o'rgatiladi. Yangi tadqiqotlar LoRA ni faqat Attention ga emas, Feed-Forward Network (FFN) matritsalariga ham qo'llash eng yaxshi natija berishini ko'rsatmoqda.",
    ],
    keyInsightUz: {
      highlightUz: "SFT da nima uchun Prompt tokenlarida Loss hisoblanmaydi?",
      explanationUz:
        "Foydalanuvchi nima so'rashini bashorat qilish bizning maqsadimiz emas — biz faqat berilgan savol (X) ga to'g'ri va foydali javob (Y) yozishni o'rgatamiz. Prompt qismida loss nolga maskalanadi.",
    },
    formulaLatex: "W = W_0 + \\Delta W = W_0 + B \\cdot A \\quad (B \\in \\mathbb{R}^{d \\times r},\\; A \\in \\mathbb{R}^{r \\times k},\\; r \\ll d,k)",
    formulaNoteUz: "LoRA da W_0 muzlatiladi va r (rank) juda kichik bo'lgani uchun o'qitiladigan parametrlar soni keskin kamayadi.",
    visualId: "yarn-sft-lora",
    visualTitleUz: "SFT Loss Mask (Prompt vs Javob) va LoRA Parametr Tejash Kalkulyatori",
    pytorchSnippet: `import torch
import torch.nn as nn

# LoRA g'oyasi: W0 muzlatiladi, faqat kichik rankli A va B o'qitiladi
d, r = 1024, 16
W0 = nn.Parameter(torch.randn(d, d), requires_grad=False)
A = nn.Parameter(torch.randn(r, d) * 0.01)
B = nn.Parameter(torch.zeros(d, r))
print("Asl vs LoRA parametr:", d * d, "vs", r * d + d * r)`,
    exercise: {
      id: "ex-tr-10",
      titleUz: "Amaliy mashq: LoRA parametr tejamkorligi va SFT javob loss ini hisoblash",
      instructionsUz:
        "`lora_savings(in_dim: int, out_dim: int, rank: int) -> tuple[int, int]` funksiyasini yozing: u to'liq matritsa parametrlari (`in_dim * out_dim`) va LoRA adapter parametrlari (`rank * (in_dim + out_dim)`) ni tuple qilib qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def lora_savings(in_dim: int, out_dim: int, rank: int) -> tuple[int, int]:
    # (full_params, lora_params) qaytaring
    pass`,
      expectedBehaviorUz: "To'liq vaznlar soni va LoRA da o'qitiladigan parametrlar sonini qaytaradi.",
      hintsUz: ["return (in_dim * out_dim, rank * (in_dim + out_dim))"],
      testCases: [
        { id: "tc1", descriptionUz: "4096x4096 va rank=16 -> 16,777,216 vs 131,072", assertionCode: "lora_savings(4096, 4096, 16) == (16777216, 131072)" },
      ],
      modelSolution: `def lora_savings(in_dim: int, out_dim: int, rank: int) -> tuple[int, int]:
    return (in_dim * out_dim, rank * (in_dim + out_dim))`,
      solutionExplanationUz: "rank=16 bo'lganda LoRA asl matritsa parametrlarining 1 foizidan ham kamini o'qitib, xotirani tejaydi.",
    },
    quiz: {
      questionUz: "YaRN usuli Mid-Training da nima vazifa bajaradi?",
      options: [
        "RoPE chastotalarini interpolyatsiya qilib, qisqa kontekstda (masalan 4K) o'qigan modelni 128K+ uzun kontekstga moslaydi",
        "Modelni matn o'rniga rasm chizishga o'rgatadi",
        "LoRA dagi A va B matritsalarini o'chirib tashlaydi",
      ],
      correctIndex: 0,
      explanationUz: "4K da o'qigan model 128K uzunlikda notanish RoPE burilishlariga duch keladi; YaRN chastotalarni moslab o'rganishni osonlashtiradi.",
    },
  },
  {
    id: "tr-11-alignment-rlhf-dpo",
    order: 11,
    lectureNumber: 3,
    titleUz: "11. Inson Afzalliklariga Moslash: RLHF (Bradley-Terry) va DPO",
    subtitleEn: "Lecture 3 • Reward Model, Reward Hacking, KL Penalty & Direct Preference Optimization",
    canonicalConceptId: "fine-tuning-lora-peft",
    estimatedMinutes: 15,
    analogyUz:
      "SFT modelga «nima yozishni» ko'rsatdi, lekin «nima yozmaslikni» va ohangingizni (do'stona, xavfsiz) aytmadi! Inson ikkita javobni solishtirib «B javob A dan yaxshi» desa, Reward Model hakam bo'lib ball qo'yadi; DPO esa hakam yollamasdan to'g'ridan-to'g'ri modelni g'olib javobga tortadi.",
    theoryParagraphsUz: [
      "Pre-Training va SFT faqat «to'g'ri misol» beradi, ammo yomon javoblardan qochishni o'rgatmaydi. Inson baholovchiga 1 dan 10 gacha ball qo'yishdan ko'ra ikkita javobni solishtirish (y_w — g'olib, y_l — mag'lub) osonroq. Shu juftli ma'lumotda Bradley-Terry formulasi asosida Reward Model o'qitiladi: u r(x, y_w) - r(x, y_l) farqining sigmoid ehtimolini maksimal qiladi.",
      "Keyin RLHF bosqichida muzlatilgan Reward Model hakamlik qilib, LLM siyosatini (pi_theta) yangilaydi. Lekin model faqat hakamni aldaydigan g'alati gaplarni topib ball olishi mumkin — bu Reward Hacking deyiladi! Shuning uchun objective funksiyaga SFT reference modelidan (pi_ref) uzoqlashishni jazolovchi KL divergence chegarasi qo'shiladi.",
      "RLHF da alohida Reward Model o'qitish va RL sozlash murakkab bo'lgani uchun DPO (Direct Preference Optimization) yaratildi: u mukofotni bevosita log(pi_theta / pi_ref) nisbatidan chiqarib, alohida Reward Model siz bitta supervised loss bilan g'olib javob ehtimolini oshiradi, mag'lubinikini pasaytiradi. Farqi: RLHF model o'zi yaratgan (On-Policy) javoblarda, DPO esa tayyor statik datasetda (Off-Policy) ishlaydi.",
    ],
    keyInsightUz: {
      highlightUz: "RLHF (On-Policy) va DPO (Off-Policy) orasidagi eng muhim farq:",
      explanationUz:
        "RLHF model o'zi chiqarayotgan javoblarni baholab moslaydi (On-Policy), lekin alohida Reward Model talab qiladi. DPO esa Reward Model siz sodda va tez ishlaydi, ammo tayyor statik (Off-Policy) juftliklar bilan cheklanadi.",
    },
    formulaLatex: "\\mathcal{L}_{\\text{RM}} = -\\mathbb{E}\\left[\\log \\sigma\\big(r_\\theta(x, y_w) - r_\\theta(x, y_l)\\big)\\right], \\qquad r \\propto \\log \\frac{\\pi_\\theta(y|x)}{\\pi_{\\text{ref}}(y|x)} \\text{ (DPO)}",
    formulaNoteUz: "Bradley-Terry juftli loss g'olib javob mukofotini oshiradi; DPO da esa Reward o'rniga reference modelga nisbat ishlatiladi.",
    visualId: "rlhf-vs-dpo",
    visualTitleUz: "Bradley-Terry Reward Model & KL Penalty (Reward Hacking) Simulyatori",
    pytorchSnippet: `import torch
import torch.nn.functional as F

# Bradley-Terry Reward Model loss: r_win > r_lose bo'lishini rag'batlantiradi
r_win = torch.tensor([2.4, 1.8], requires_grad=True)
r_lose = torch.tensor([0.5, 1.2], requires_grad=True)
loss = -F.logsigmoid(r_win - r_lose).mean()
print("Reward Model Loss:", round(loss.item(), 4))`,
    exercise: {
      id: "ex-tr-11",
      titleUz: "Amaliy mashq: Bradley-Terry juftli loss funksiyasini hisoblash",
      instructionsUz:
        "`bradley_terry_loss(r_win: float, r_lose: float) -> float` funksiyasini yozing: `diff = r_win - r_lose`, `prob = 1 / (1 + math.exp(-diff))` bo'lib, `-math.log(prob)` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def bradley_terry_loss(r_win: float, r_lose: float) -> float:
    # -log(sigmoid(r_win - r_lose)) ni hisoblang
    pass`,
      expectedBehaviorUz: "G'olib javob mukofoti katta bo'lganda kichik loss qaytaradi.",
      hintsUz: ["prob = 1.0 / (1.0 + math.exp(-(r_win - r_lose))); return -math.log(prob)"],
      testCases: [
        { id: "tc1", descriptionUz: "r_win == r_lose bo'lganda loss ln(2) ≈ 0.6931", assertionCode: "abs(bradley_terry_loss(1.5, 1.5) - __import__('math').log(2)) < 1e-6" },
        { id: "tc2", descriptionUz: "r_win > r_lose bo'lganda loss kichrayadi", assertionCode: "bradley_terry_loss(4.0, 0.0) < 0.05" },
      ],
      modelSolution: `import math

def bradley_terry_loss(r_win: float, r_lose: float) -> float:
    diff = r_win - r_lose
    prob = 1.0 / (1.0 + math.exp(-diff))
    return -math.log(prob)`,
      solutionExplanationUz: "G'olib javob mukofoti mag'lubnikidan qanchalik katta bo'lsa, Bradley-Terry yo'qotishi shuncha nolga yaqinlashadi.",
    },
    quiz: {
      questionUz: "RLHF da reference modelga nisbatan KL jarimasi qo'yilmasa qanday xavf yuzaga keladi?",
      options: [
        "Reward Hacking — LLM insoniy foydani emas, Reward Model ni aldaydigan g'alati matnlar yozib yuqori ball olishga o'tib ketadi",
        "Tokenizer so'zlarni o'chirib yuboradi",
        "Learning Rate avtomatik nolga tushadi",
      ],
      correctIndex: 0,
      explanationUz: "Reward Model mukammal emas; KL jarimasi LLM ni SFT dagi sog'lom til modelidan uzoqlashib ketishdan saqlaydi.",
    },
  },
  {
    id: "tr-12-reasoning-grpo-distill",
    order: 12,
    lectureNumber: 3,
    titleUz: "12. Reasoning Modellar (GRPO), Verifiable Rewards & On-Policy Distillation",
    subtitleEn: "Lecture 3 • <think> Tokenlar, RLVR / GRPO va GLM-5 Post-Training Pipeline",
    canonicalConceptId: "fine-tuning-lora-peft",
    estimatedMinutes: 16,
    analogyUz:
      "Murakkab matematika masalasini qoralama (scratchpad) da hisoblab keyin javob yozishni tasavvur qiling! Reasoning Model javobdan oldin yashirin <think> tokenlarida fikrlaydi. GRPO da esa bir savolga 4 ta urinish qilib, eng to'g'ri yechimni (testlar tasdiqlagan) rag'batlantiramiz!",
    theoryParagraphsUz: [
      "DeepSeek R1 kabi Reasoning Modellar oddiy bilim savollaridan farqli ravishda ko'p bosqichli mantiqiy fikrlashni (Chain-of-Thought) majburan promptsiz, o'z-o'zidan ichki <think> tokenlari orasida bajaradi. Amaliy jihatdan e'tibor bering: bu yashirin Think Tokens foydalanuvchiga ko'rinmasa ham Output Token sifatida hisoblanib haq olinadi va xavfsizlik/raqobat sababli ochiq ko'rsatilmaydi.",
      "Ularni o'qitishda insoniy noaniq Reward Model shart emas — matematika va kodlash testlari Verifiable Rewards (RLVR) beradi! GRPO (Group Relative Policy Optimization) bitta savolga modeldan G ta javob chiqaradi, har birining test natijasini guruh o'rtachasiga solishtirib Advantage hisoblaydi va o'rtachadan yaxshi yechimlarni kuchaytiradi.",
      "Biroq GRPO butun uzun javob uchun bitta siyrak (sparse: 0 yoki 1) mukofot beradi; DPO/SFT esa har bir tokenda zich signal bersa ham modelning o'zi yaratmagan (Off-Policy) matnda ishlaydi. Zamonaviy yechim — On-Policy Distillation: o'quvchi model o'zi generatsiya qilgan (On-Policy) javobning har bir tokenida kuchli ustoz modeldan (yoki GLM-5 dagi kabi oldingi bosqich checkpointi / to'g'ri javobni biluvchi o'zidan) zich token-darajali tuzatish oladi!",
    ],
    keyInsightUz: {
      highlightUz: "Zamonaviy GLM-5 darajasidagi to'liq LLM Trening Zanjiri:",
      explanationUz:
        "1) Pre-Training (30T token, web -> code/reasoning) -> 2) Mid-Training (128K–200K YaRN + Best-Fit Packing) -> 3) SFT (Assistant + Think + Tool calls) -> 4) Reasoning / Agentic / General RL (GRPO) -> 5) Cross-Stage On-Policy Distillation!",
    },
    formulaLatex: "A_i = \\frac{r_i - \\text{mean}(r_1, \\dots, r_G)}{\\text{std}(r_1, \\dots, r_G) + \\epsilon} \\quad \\text{(GRPO Guruh Ustunligi)}",
    formulaNoteUz: "GRPO bitta savol uchun olingan G ta javob ichida o'rtachadan yuqori ball olganlarini musbat ustunlik bilan rag'batlantiradi.",
    visualId: "grpo-onpolicy-distill",
    visualTitleUz: "GRPO Guruh Baholash va On-Policy vs Sparse/Dense Matritsasi",
    pytorchSnippet: `import torch

# GRPO guruh ustunligi (4 ta urinishdan 2 tasi to'g'ri chiqdi)
rewards = torch.tensor([0.0, 1.0, 1.0, 0.0])
advantages = (rewards - rewards.mean()) / (rewards.std(unbiased=False) + 1e-8)
print("GRPO Advantages:", [round(a, 2) for a in advantages.tolist()])`,
    exercise: {
      id: "ex-tr-12",
      titleUz: "Amaliy mashq: GRPO Guruh Nisbiy Ustunligini (Advantage) hisoblash",
      instructionsUz:
        "`grpo_advantages(rewards: list[float]) -> list[float]` funksiyasini yozing: `rewards` ro'yxatining o'rtachasi `mu` va populyatsiya standart og'ishi `sigma = sqrt(sum((r - mu)**2 for r in rewards) / len(rewards))` ni topib, agar `sigma == 0` bo'lsa nollar ro'yxatini, aks holda `[(r - mu) / sigma for r in rewards]` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def grpo_advantages(rewards: list[float]) -> list[float]:
    # mu va populyatsiya std asosida advantage hisoblang
    pass

print(grpo_advantages([0.0, 1.0, 1.0, 0.0]))`,
      expectedBehaviorUz: "Guruh ichida to'g'ri javoblarga musbat (+), xatolarga manfiy (-) ustunlik qaytaradi.",
      hintsUz: [
        "mu = sum(rewards) / len(rewards)",
        "var = sum((r - mu) ** 2 for r in rewards) / len(rewards)",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "[0, 1, 1, 0] -> [-1.0, 1.0, 1.0, -1.0]", assertionCode: "all(abs(a - b) < 1e-6 for a, b in zip(grpo_advantages([0.0, 1.0, 1.0, 0.0]), [-1.0, 1.0, 1.0, -1.0]))" },
        { id: "tc2", descriptionUz: "Hamma javob bir xil bo'lsa 0.0 qaytaradi", assertionCode: "grpo_advantages([1.0, 1.0, 1.0]) == [0.0, 0.0, 0.0]" },
      ],
      modelSolution: `import math

def grpo_advantages(rewards: list[float]) -> list[float]:
    n = len(rewards)
    mu = sum(rewards) / n
    var = sum((r - mu) ** 2 for r in rewards) / n
    sigma = math.sqrt(var)
    if sigma == 0.0:
        return [0.0] * n
    return [(r - mu) / sigma for r in rewards]`,
      solutionExplanationUz: "GRPO o'rtachadan yaxshi chiqqan javoblar ehtimolini oshiradi, yomonlarini esa pasaytiradi — alohida Value/Critic modelisiz!",
    },
    quiz: {
      questionUz: "On-Policy Distillation usuli SFT va GRPO ning qaysi ikki kuchli jihatini birlashtiradi?",
      options: [
        "Modelning o'zi yaratgan matnda ishlash (On-Policy) + Ustoz modeldan har bir tokenda zich signal olish (Dense)",
        "Albatta CommonCrawl ni o'chirish + Word2Vec ga qaytish",
        "Faqat Zero-Shot prompting + Post-Norm",
      ],
      correctIndex: 0,
      explanationUz: "GRPO On-Policy lekin faqat oxirida siyrak mukofot beradi; SFT/DPO zich signal bersa ham Off-Policy. On-Policy Distillation ikkalasining eng yaxshisini birlashtiradi.",
    },
  },

  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 4 (transformer4.md)                                            */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-13-rl-policy-gradient",
    order: 13,
    lectureNumber: 4,
    titleUz: "13. RL Asoslari, Policy Gradient & Importance Sampling",
    subtitleEn: "Lecture 4 • REINFORCE Log-Derivative, Generation vs Evaluation va Variance Reduction",
    canonicalConceptId: "fine-tuning-lora-peft",
    estimatedMinutes: 16,
    analogyUz:
      "Tasavvur qiling, o'quvchi har safar imtihon topshirganda +101 yoki +100 ball oladi: ikkisi ham katta musbat son bo'lgani uchun ustoz qaysi javobni kuchaytirib, qaysinisini kamaytirishda adashib shovqin qiladi! O'rtacha 100.5 ni ayirib (+0.5 vs -0.5) solishtirsangiz — gradient darhol tiniqlashadi!",
    theoryParagraphsUz: [
      "Reinforcement Learning (RL) da LLM bu Agent, uning keyingi token tanlash ehtimoli esa Policy (pi_theta). Bizning maqsadimiz kutilayotgan mukofotni (Reward) maksimal qilish — shuning uchun Gradient Descent emas, Gradient Ascent (theta + alpha * grad) qilamiz. Log-Derivative formulasi orqali gradient R * grad(log pi_theta) ko'rinishiga keladi: mukofot musbat bo'lsa action ehtimolini oshiradi, manfiy bo'lsa pasaytiradi.",
      "Ammo har bir qadamda LLM ga noldan avtoregressiv javob yozdirish (Rollout / Generation) juda sekin, tayyor javob ehtimolini baholash (Evaluation) esa Teacher Forcing tufayli parallel va arzon! Shu sababli eski siyosat (pi_old) bitta batch yaratadi va yangi siyosat bir necha qadam yangilanadi — farqni tuzatish uchun Importance Sampling Ratio rho = pi_theta / pi_old ishlatiladi.",
      "Vanil Policy Gradient ning 3 katta muammosi bor: 1) Absolyut mukofotlar (101 vs 100) gradient dispersiyasini shovqinli qiladi -> Baseline (o'rtacha kutilgan mukofot) kerak; 2) Yakuniy Reward butun javobga bir xil berilgani uchun oraliqdagi xato qadamlar ajratilmaydi; 3) Model SFT reference holatidan uzoqlashib Reward Hacking ga tushmasligi uchun cheklov zarur.",
    ],
    keyInsightUz: {
      highlightUz: "Maqola o'qishda 3 ta belgi chalkashuvidan ehtiyot bo'ling:",
      explanationUz:
        "Ko'p RL maqolalarida L deb belgilangan kattalik aslida minimallashtiriladigan Loss emas, maksimallashtiriladigan Objective bo'ladi; R esa Reward emas, ba'zan ehtimolliklar nisbati (Importance Sampling Ratio, bu darsda rho) ni bildiradi!",
    },
    formulaLatex: "\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_{\\text{old}}}\\!\\left[ \\frac{\\pi_\\theta(\\tau)}{\\pi_{\\text{old}}(\\tau)} (R(\\tau) - b) \\nabla_\\theta \\log \\pi_\\theta(\\tau) \\right]",
    formulaNoteUz: "Baseline b ayirilganda Advantage musbat/manfiy bo'lib gradient shovqini keskin kamayadi; pi_theta / pi_old esa bir batchni ko'p marta ishlatishga ruxsat beradi.",
    visualId: "rl-policy-gradient",
    visualTitleUz: "Baseline Shovqin Kamaytirish (+101/+100 vs +0.5/-0.5) & Importance Sampling",
    pytorchSnippet: `import torch

# Policy Gradient: musbat advantage ehtimolni oshiradi, manfiy pasaytiradi
log_probs = torch.tensor([-0.5, -1.2], requires_grad=True)
rewards = torch.tensor([101.0, 100.0])
advantages = rewards - rewards.mean()  # [+0.5, -0.5] baseline bilan!
objective = (advantages * log_probs).mean()
objective.backward()
print("Gradient (baseline bilan):", log_probs.grad.tolist())`,
    exercise: {
      id: "ex-tr-13",
      titleUz: "Amaliy mashq: Importance Sampling Ratio va Baseline bilan Policy Objective hisoblash",
      instructionsUz:
        "`policy_step_score(p_new: float, p_old: float, reward: float, baseline: float) -> float` funksiyasini yozing: `rho = p_new / p_old`, `adv = reward - baseline` bo'lib `rho * adv` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def policy_step_score(p_new: float, p_old: float, reward: float, baseline: float) -> float:
    # Importance Sampling nisbati * (reward - baseline)
    pass`,
      expectedBehaviorUz: "Reweight qilingan ustunlik qiymatini qaytaradi.",
      hintsUz: ["return (p_new / p_old) * (reward - baseline)"],
      testCases: [
        { id: "tc1", descriptionUz: "Baseline bilan +0.5 ustunlik va rho=1.2 -> 0.6", assertionCode: "abs(policy_step_score(0.6, 0.5, 101.0, 100.5) - 0.6) < 1e-6" },
        { id: "tc2", descriptionUz: "Yomon javobda manfiy natija", assertionCode: "abs(policy_step_score(0.4, 0.5, 100.0, 100.5) - (-0.4)) < 1e-6" },
      ],
      modelSolution: `def policy_step_score(p_new: float, p_old: float, reward: float, baseline: float) -> float:
    rho = p_new / p_old
    adv = reward - baseline
    return rho * adv`,
      solutionExplanationUz: "Importance Sampling nisbati eski rollout batchidan xavfsiz yangilanish olish imkonini beradi.",
    },
    quiz: {
      questionUz: "Nima uchun on-policy RL da eski batchdan (pi_old) bir necha yangilanish olish foydali?",
      options: [
        "Chunki avtoregressiv matn yaratish (Rollout) juda sekin, tayyor matn ehtimollarini parallel baholash (Evaluation) esa arzon",
        "Chunki Teacher Forcing faqat SFT da ishlaydi",
        "Chunki pi_old gradientni nolga aylantiradi",
      ],
      correctIndex: 0,
      explanationUz: "Tokenma-token generatsiya qimmat bo'lgani uchun bir marta olingan rollout ustidan Importance Sampling bilan bir nechta gradient qadami tashlanadi.",
    },
  },
  {
    id: "tr-14-ppo-vs-grpo",
    order: 14,
    lectureNumber: 4,
    titleUz: "14. PPO (Value Function + Clipping + KL) vs GRPO & DAPO Tuzatishlari",
    subtitleEn: "Lecture 4 • PPO 3 Siyosat, GAE, GRPO Uzunlik Bias (1/|o_i|) & Clip Chegaralari",
    canonicalConceptId: "fine-tuning-lora-peft",
    estimatedMinutes: 16,
    analogyUz:
      "PPO da sizning yoningizda har bir so'zdan keyin «hozircha necha ball olishga ketyapsan?» deb bashorat qiluvchi qimmat maslahatchi (Value Function) yuradi. GRPO esa bu maslahatchini olib tashlab, shunchaki 4 ta urinish qilib bir-biriga solishtiradi!",
    theoryParagraphsUz: [
      "PPO (Proximal Policy Optimization) ikkita qurol bilan barqarorlik beradi: 1) Har token darajasida kutilayotgan mukofotni taxmin qilib Advantage hisoblaydigan Value Function (va GAE); 2) Siyosat rho = pi_theta / pi_old ning [1-eps, 1+eps] dan chiqib ketishini kesuvchi Clipping + reference modeldan uzoqlashmaslik uchun KL Divergence jarimasi. Bunda 3 ta siyosat qatnashadi: pi_theta (o'qitilayotgan), pi_old (batch yaratgan) va pi_ref (muzlatilgan SFT asos).",
      "Biroq PPO Value Function ni policy bilan birga GPU xotirasida o'qitishni talab qilgani uchun juda og'ir. GRPO Value Function dan butunlay voz kechib, bir promptdan G ta javob chiqaradi va guruh o'rtachasiga nisbatan Advantage oladi.",
      "Lekin GRPO formulasi ham muammosiz emas! Har bir javob o_i ning uzunligiga 1/|o_i| ga bo'lingani uchun, model yomon (manfiy advantage) javob chiqarganda jarimani kichraytirish uchun javobni sun'iy ravishda cho'zib yuboradi (xato javob uzunlashaveradi, aniqlik esa platoga chiqadi)! DAPO va Dr. GRPO buni umumiy token soniga normallashtirib hamda kam ehtimolli kashfiyot tokenlariga ruxsat berish uchun yuqori/pastki Clipping epsilonini assimetrik qilib tuzatadi.",
    ],
    keyInsightUz: {
      highlightUz: "Nima uchun GRPO da aniqlik to'xtaganida ham javob uzunligi o'sishda davom etgan?",
      explanationUz:
        "1/|o_i| normallashtirish tufayli qisqa xato javob katta manfiy zarba oladi, uzun xato javob esa kichikroq zarba oladi — natijada model noto'g'ri chiqqan paytda uzunroq yozishni afzal ko'rib qoladi (DAPO shuni tuzatadi).",
    },
    formulaLatex: "J_{\\text{clip}}(\\theta) = \\min\\Big(\\rho_t A_t,\\; \\text{clip}(\\rho_t, 1-\\epsilon, 1+\\epsilon) A_t\\Big) - \\beta\\, \\text{KL}(\\pi_\\theta \\| \\pi_{\\text{ref}})",
    formulaNoteUz: "Clipping rho ni [1-eps, 1+eps] tashqarisida tekislab gradientni nolga tushiradi va keskin sakrashni to'xtatadi.",
    visualId: "ppo-grpo-clip",
    visualTitleUz: "PPO Clipping Egri Chizig'i va GRPO 1/|o_i| Uzunlik Ta'siri",
    pytorchSnippet: `import torch

rho = torch.tensor([0.7, 1.0, 1.4])
adv = torch.tensor([1.0, 1.0, 1.0])
eps = 0.2
clipped = torch.clamp(rho, 1 - eps, 1 + eps)
ppo_obj = torch.minimum(rho * adv, clipped * adv)
print("PPO Clipped objective:", ppo_obj.tolist())`,
    exercise: {
      id: "ex-tr-14",
      titleUz: "Amaliy mashq: PPO Clipped Surrogate Objective ni hisoblash",
      instructionsUz:
        "`ppo_clip_term(rho: float, advantage: float, eps: float = 0.2) -> float` funksiyasini yozing: `clipped_rho = max(1 - eps, min(1 + eps, rho))` va `min(rho * advantage, clipped_rho * advantage)` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def ppo_clip_term(rho: float, advantage: float, eps: float = 0.2) -> float:
    # Clipped surrogate qoidasini yozing
    pass`,
      expectedBehaviorUz: "Musbat va manfiy advantage uchun xavfsiz minimal surrogate qaytaradi.",
      hintsUz: ["clipped = max(1.0 - eps, min(1.0 + eps, rho))"],
      testCases: [
        { id: "tc1", descriptionUz: "Advantage > 0 da rho=1.5 bo'lsa 1.2 * A ga kesiladi", assertionCode: "abs(ppo_clip_term(1.5, 2.0, 0.2) - 2.4) < 1e-6" },
        { id: "tc2", descriptionUz: "Advantage < 0 da rho=0.5 bo'lsa 0.8 * A ga kesiladi", assertionCode: "abs(ppo_clip_term(0.5, -2.0, 0.2) - (-1.6)) < 1e-6" },
      ],
      modelSolution: `def ppo_clip_term(rho: float, advantage: float, eps: float = 0.2) -> float:
    clipped = max(1.0 - eps, min(1.0 + eps, rho))
    return min(rho * advantage, clipped * advantage)`,
      solutionExplanationUz: "Musbat ustunlikda 1+eps dan yuqoriga, manfiy ustunlikda 1-eps dan pastga sakrashni cheklaydi.",
    },
    quiz: {
      questionUz: "PPO dagi 3 ta siyosat (pi_theta, pi_old, pi_ref) dan qaysi biri butun RL bosqichi davomida o'zgarmas (muzlatilgan) bo'lib qoladi?",
      options: [
        "pi_ref (Reference / SFT asos modeli) — KL divergence orqali asosiy til qobiliyatini yo'qotmaslik uchun",
        "pi_theta — yangilanayotgan siyosat",
        "pi_old — har yangi batchda yangilanadi",
      ],
      correctIndex: 0,
      explanationUz: "pi_old har batchda yangilanadi, pi_theta har gradient qadamida yangilanadi; faqat pi_ref boshlang'ich tayanch sifatida doim sobit turadi.",
    },
  },
  {
    id: "tr-15-on-policy-distillation",
    order: 15,
    lectureNumber: 4,
    titleUz: "15. Outcome vs Process Supervision, Reverse KL & On-Policy Distillation",
    subtitleEn: "Lecture 4 • Muhrlangan Quti Mantiqi, Mode-Seeking KL & O'z-O'zini O'qitish",
    canonicalConceptId: "fine-tuning-lora-peft",
    estimatedMinutes: 15,
    analogyUz:
      "Muhrlangan qutidagi o'yinchoq ayiqcha oshxonaga ko'chirilsa: talaba «1-qadam: ayiqcha qutidan chiqib oshxonaga yurdi -> Javob: oshxona» desa, oxirgi javob to'g'ri, lekin 1-qadam mantiqsiz! GRPO hammasini maqtaydi; On-Policy Distillation da esa ustoz aynan «chiqib» so'zida qizil chiziq tortadi!",
    theoryParagraphsUz: [
      "RLVR / GRPO Outcome Supervision beradi — faqat yakuniy javob to'g'ri bo'lsa, oraliqdagi xato fikrlash qadamlariga ham bir xil mukofot tegadi. Process Supervision da har bir qadamni alohida belgilash esa juda qimmat va yana alohida model talab qiladi.",
      "On-Policy Distillation mukammal muvozanat topadi: talaba (Student) o'zi javob yozadi (On-Policy), kuchli Ustoz (Teacher) esa har bir yaratilgan tokenda o'z taqsimotini ko'rsatadi. Bu yerda oddiy Forward KL(T||S) o'rniga Reverse KL(S||T) ishlatiladi — u Mode-Seeking xususiyatiga ega bo'lib, kichikroq talaba ustozning barcha tarqoq variantlarini emas, eng kuchli va ishonchli cho'qqilarini o'zlashtiradi.",
      "Agar sizda tashqi katta ustoz bo'lmasa-chi? Teacher Forcing hiylasi bilan On-Policy Self-Distillation ishlaydi: model o'ziga prompt bilan birga haqiqiy yakuniy javobni ham ko'rsatib teacher distribution oladi, so'ng oddiy promptdagi o'zini o'sha taqsimotga moslaydi! Yoki matematika, kod va agentlik bo'yicha alohida mutaxassis o'qituvchilardan Multi-Teacher Distillation qilinadi.",
    ],
    keyInsightUz: {
      highlightUz: "Reverse KL(S || T) da nega talaba xato tokenga katta jarima oladi?",
      explanationUz:
        "Chunki yig'indi Student ehtimoli s_i bilan tortilgan: agar Student noto'g'ri tokenga yuqori s_i bersa (s_i > 0, t_i ≈ 0), log(s_i / t_i) juda kattalashib darhol o'sha xatoni yo'q qiladi.",
    },
    formulaLatex: "\\text{Reverse KL}(S \\| T) = \\sum_{i} S(i) \\log \\frac{S(i)}{T(i)}",
    formulaNoteUz: "S(i) og'irlik sifatida turadi: talaba yaratgan (S katta) lekin ustoz ma'qullamagan (T kichik) tokenlar kuchli jazolanadi.",
    visualId: "distill-reverse-kl",
    visualTitleUz: "Reverse KL (Mode-Seeking) va On-Policy Token Darajali Jarima",
    pytorchSnippet: `import torch

# Reverse KL(Student || Teacher): talaba taqsimoti ustozning cho'qqisiga intiladi
p_student = torch.tensor([0.6, 0.4])
p_teacher = torch.tensor([0.9, 0.1])
reverse_kl = torch.sum(p_student * torch.log(p_student / p_teacher))
print("Reverse KL:", round(reverse_kl.item(), 4))`,
    exercise: {
      id: "ex-tr-15",
      titleUz: "Amaliy mashq: Forward KL va Reverse KL divergence ni hisoblash",
      instructionsUz:
        "`reverse_kl(p_student: list[float], p_teacher: list[float]) -> float` funksiyasini yozing: `sum(s * math.log(s / t) for s, t in zip(p_student, p_teacher) if s > 0)` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def reverse_kl(p_student: list[float], p_teacher: list[float]) -> float:
    # sum(s * log(s / t)) ni hisoblang
    pass`,
      expectedBehaviorUz: "Student va Teacher taqsimotlari orasidagi Reverse KL qiymatini qaytaradi.",
      hintsUz: ["return sum(s * math.log(s / t) for s, t in zip(p_student, p_teacher) if s > 0)"],
      testCases: [
        { id: "tc1", descriptionUz: "Bir xil taqsimotda KL = 0.0", assertionCode: "abs(reverse_kl([0.7, 0.3], [0.7, 0.3])) < 1e-6" },
        { id: "tc2", descriptionUz: "Talaba noto'g'ri tokenga katta ehtimol bersa Reverse KL yuqori chiqadi", assertionCode: "reverse_kl([0.2, 0.8], [0.9, 0.1]) > 1.0" },
      ],
      modelSolution: `import math

def reverse_kl(p_student: list[float], p_teacher: list[float]) -> float:
    return float(sum(s * math.log(s / t) for s, t in zip(p_student, p_teacher) if s > 0.0))`,
      solutionExplanationUz: "Reverse KL talaba yaratgan xato tokenlarda kuchli signal berib, modelni ustozning asosiy modasiga yo'naltiradi.",
    },
    quiz: {
      questionUz: "On-Policy Self-Distillation da tashqi kattaroq ustoz modelisiz zich token signali qanday olinadi?",
      options: [
        "Xuddi o'sha modelga prompt bilan birga haqiqiy yakuniy javobni ham qo'shib berib, Teacher Forcing bilan ehtimollik olinadi",
        "Random tokenlardan foydalanib",
        "Faqat Zero-Shot bilan",
      ],
      correctIndex: 0,
      explanationUz: "Modelga to'g'ri yechimni kontekstga qo'shib bersak, u to'g'ri yo'l bo'ylab yaxshiroq token ehtimollarini beradi — keyin talaba (javobsiz) o'zini shunga moslaydi.",
    },
  },

  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 5 (lecture5.md)                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-16-flashattention-hbm-sram",
    order: 16,
    lectureNumber: 5,
    titleUz: "16. GPU Xotira Ierarxiyasi (HBM vs SRAM) & FlashAttention",
    subtitleEn: "Lecture 5 • Online Softmax, N×N Matritsadan Qochish & Aniq Qayta Hisoblash",
    canonicalConceptId: "attention-mechanism",
    estimatedMinutes: 16,
    analogyUz:
      "HBM (141 GB) — katta lekin ko'chadan narigi ombor; SRAM (100 MB) — ustaxonadagi stolingizning o'zi (10x tezroq)! Oddiy Attention har safar ulkan N×N qog'ozni omborga tashib yuradi. FlashAttention esa mayda bo'laklarni to'g'ridan-to'g'ri stolda (SRAM) online softmax bilan hisoblab ketadi!",
    theoryParagraphsUz: [
      "100B parametrli modelning o'zi FP16 (2 bayt/parametr) da 200 GB joy oladi — bu esa bitta eng kuchli H200 GPU (141 GB HBM) ga ham sig'maydi! Bundan tashqari, N=10,000 uzunlikdagi oddiy Self-Attention da N×N = 100M katakli matritsani sekin HBM ga yozib-o'qish eng katta to'siqdir.",
      "FlashAttention buni xotira ierarxiyasi bilan yechadi: HBM katta, ammo sekin (~TB/s); on-chip SRAM esa kichik (~100 MB), lekin o'ta tezkor (~10x tezroq). Softmax ning mahalliy emasligi (butun qator yig'indisini kutish) muammosi Online Softmax hiylasi bilan hal qilinadi: numerator N_t va denominator D_t ketma-ket bo'laklarda yangilanib, sonli barqarorlik uchun joriy maksimal qiymat m_t bo'yicha exp(m_prev - m_curr) ga qayta masshtablanadi.",
      "Qizig'i shundaki, FlashAttention taxminiy EMAS — matematik jihatdan 100% ANIQ (exact) natija beradi! Va Backward pass da ulkan N×N matritsani HBM dan o'qishdan ko'ra uni SRAM da qayta hisoblash (Recomputation) ko'proq GFLOP ishlatsa ham, umumiy vaqtni sezilarli tezlashtiradi (FlashAttention-2/3/4 Hopper va Blackwell GPU lariga moslangan).",
    ],
    keyInsightUz: {
      highlightUz: "Ko'proq hisoblash qilib, qanday qilib tezroq ishlash mumkin?",
      explanationUz:
        "Chunki zamonaviy GPU larda hisoblash emas, HBM xotirasidan ma'lumot tashish sekin! FlashAttention HBM ga o'qish-yozishni keskin kamaytirgani uchun qayta hisoblash bilan ham umumiy vaqt ancha qisqaradi.",
    },
    formulaLatex: "m_t = \\max(m_{t-1}, S_t), \\quad D_t = D_{t-1} e^{m_{t-1}-m_t} + e^{S_t - m_t}, \\quad N_t = N_{t-1} e^{m_{t-1}-m_t} + e^{S_t - m_t} V_t",
    formulaNoteUz: "Online Softmax har bir yangi token blokida maksimal m_t ni yangilab, avvalgi yig'indini e^{m_{t-1}-m_t} ga ko'paytirish bilan N×N matritsasiz aniq Attention beradi.",
    visualId: "flash-attention-tiling",
    visualTitleUz: "HBM vs SRAM & Online Softmax Qadamba-Qadam Simulyatori",
    pytorchSnippet: `import torch
import torch.nn.functional as F

q = torch.randn(1, 8, 512, 64, device="cpu", dtype=torch.float32)
k = torch.randn(1, 8, 512, 64)
v = torch.randn(1, 8, 512, 64)
# PyTorch SDPA mos apparatda avtomatik FlashAttention kernelini ishlatadi
out = F.scaled_dot_product_attention(q, k, v, is_causal=True)
print("SDPA / FlashAttention natija:", out.shape)`,
    exercise: {
      id: "ex-tr-16",
      titleUz: "Amaliy mashq: FlashAttention Online Softmax (N_t, D_t) ketma-ket yangilash",
      instructionsUz:
        "`online_softmax_attention(scores: list[float], values: list[float]) -> float` funksiyasini yozing: butun ro'yxat max ini oldindan ko'rmasdan, faqat `m`, `D`, `N` o'zgaruvchilarini siklda `exp(m_old - m_new)` rescaling bilan yangilab oxirida `N / D` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def online_softmax_attention(scores: list[float], values: list[float]) -> float:
    m = -float("inf")
    D = 0.0
    N = 0.0
    for s, v in zip(scores, values):
        # m_new, rescale = math.exp(m - m_new) (agar m != -inf) ni hisoblang
        pass
    return N / D`,
      expectedBehaviorUz: "Oddiy softmax(scores) * values bilan 100% bir xil aniq javob qaytaradi.",
      hintsUz: [
        "m_new = max(m, s); rescale = 0.0 if m == -float('inf') else math.exp(m - m_new)",
        "add_w = math.exp(s - m_new); D = D * rescale + add_w; N = N * rescale + add_w * v; m = m_new",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Online hisob oddiy softmax bilan aynan mos keladi", assertionCode: "abs(online_softmax_attention([1.0, 3.0, 2.0], [10.0, 20.0, 30.0]) - ((__import__('math').exp(1)*10 + __import__('math').exp(3)*20 + __import__('math').exp(2)*30)/(__import__('math').exp(1)+__import__('math').exp(3)+__import__('math').exp(2)))) < 1e-6" },
        { id: "tc2", descriptionUz: "Katta sonlarda (1000.0) overflow bermaydi", assertionCode: "abs(online_softmax_attention([1000.0, 1000.0], [4.0, 6.0]) - 5.0) < 1e-6" },
      ],
      modelSolution: `import math

def online_softmax_attention(scores: list[float], values: list[float]) -> float:
    m = -float("inf")
    D = 0.0
    N = 0.0
    for s, v in zip(scores, values):
        m_new = max(m, s)
        rescale = 0.0 if m == -float("inf") else math.exp(m - m_new)
        w = math.exp(s - m_new)
        D = D * rescale + w
        N = N * rescale + w * v
        m = m_new
    return N / D`,
      solutionExplanationUz: "FlashAttention ning yuragi: butun qatorni kutmasdan, barqaror Online Softmax orqali oqimli hisob qildik.",
    },
    quiz: {
      questionUz: "FlashAttention klassik Attention ga nisbatan taxminiy (approximation) natija beradimi?",
      options: [
        "Yo'q — FlashAttention matematik jihatdan 100% aniq (exact) natija beradi, faqat HBM/SRAM xotira harakatini optimallashtiradi",
        "Ha, softmax ni taxminiy chiziqli qiladi",
        "Ha, yarim tokenlarni tashlab yuboradi",
      ],
      correctIndex: 0,
      explanationUz: "Online Softmax numerator va denominatorini aynan saqlab qolgani uchun yakuniy natija klassik formula bilan bir xil chiqadi.",
    },
  },
  {
    id: "tr-17-5d-parallelism",
    order: 17,
    lectureNumber: 5,
    titleUz: "17. 5D Parallelism: Data (ZeRO), Tensor, Pipeline, Context & Expert",
    subtitleEn: "Lecture 5 • 4 Xotira Iste'molchisi & Ko'p GPU da Treningni Taqsimlash",
    canonicalConceptId: "linear-algebra-matrices",
    estimatedMinutes: 16,
    analogyUz:
      "Ulkan zavodda bitta mashina (1 GPU) yetmasa 5 xil taqsimot qilasiz: har kimga har xil buyurtma berish (Data), bitta og'ir stanokni ikkiga bo'lish (Tensor), konveyerni qavatlarga bo'lish (Pipeline), uzun lentani bo'laklash (Context) va ixtisoslashgan ustalarni alohida xonaga qo'yish (Expert)!",
    theoryParagraphsUz: [
      "Treningda GPU xotirasini 4 narsa yeydi: Model parametrlari, Forward Activations (sequence length va batchga proporsional), Gradientlar va Adam optimizer holatlari. Buni sig'dirish va tezlatish uchun 5D Parallelism qo'llaniladi.",
      "1) Data Parallelism + ZeRO: batch GPU larga bo'linadi; ZeRO parametr, gradient va optimizer holatlarini dublikat qilmay GPU larga taqsimlaydi (shard) — evaziga aloqa xarajati (communication) qo'shiladi. 2) Tensor Parallelism: bitta qatlam ichidagi Attention boshlari va FFN matritsa ko'paytmalari GPU larga bo'linadi.",
      "3) Pipeline Parallelism: ketma-ket qatlamlar turli GPU larga qo'yiladi (bunda oldingi/keyingi GPU ni kutish paytida Bubble bo'sh vaqti paydo bo'ladi). 4) Context Parallelism: juda uzun Sequence Length bo'linib, Key/Value bloklari GPU lar aro aylanib o'tadi. 5) Expert Parallelism: MoE ekspertlari alohida GPU larda saqlanib, tokenlar mos GPU ga yuboriladi.",
    ],
    keyInsightUz: {
      highlightUz: "ZeRO Data Parallelism nimaga Model Parallelism emas?",
      explanationUz:
        "Chunki ZeRO xotirani tejash uchun parametrlarni taqsimlasa ham, berilgan micro-batch ustidagi to'liq model hisoblashining barchasi o'sha bitta GPU ning o'zida bajariladi (kerakli vaznlar tarmoqdan chaqirib olinadi).",
    },
    formulaLatex: "\\text{Mem}_{\\text{FP16 Weights}} \\approx 2 \\cdot P \\text{ bytes}, \\qquad \\text{Trening Jami} \\gg \\text{Weights} \\;(\\text{+ Grads + Adam + Activations})",
    formulaNoteUz: "100B parametrli modelning o'zi FP16 da ~200 GB; Adam va Activations qo'shilganda terabaytlarga chiqadi.",
    visualId: "parallelism-5d",
    visualTitleUz: "5D Parallelism Topologiyasi & Pipeline Bubble Interaktiv Sxemasi",
    pytorchSnippet: `# 100B model uchun oddiy xotira bahosi (bytes)
params = 100e9
fp16_weights_gb = (params * 2) / 1e9  # 200 GB
# ZeRO bilan 8 GPU ga sharding: har bir GPU ga ~25 GB og'irlik + holat qismi tushadi
print("Jami FP16 vaznlar (GB):", fp16_weights_gb, "| 8 GPU ZeRO per GPU:", fp16_weights_gb / 8)`,
    exercise: {
      id: "ex-tr-17",
      titleUz: "Amaliy mashq: Model xotirasini hisoblash va ZeRO sharding bo'yicha GPU sonini topish",
      instructionsUz:
        "`min_gpus_for_weights(params_billions: float, gpu_mem_gb: float, bytes_per_param: int = 2) -> int` funksiyasini yozing: `math.ceil((params_billions * bytes_per_param) / gpu_mem_gb)` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def min_gpus_for_weights(params_billions: float, gpu_mem_gb: float, bytes_per_param: int = 2) -> int:
    # Kamida nechta GPU kerakligini math.ceil bilan toping
    pass`,
      expectedBehaviorUz: "Berilgan model hajmi uchun minimal GPU sonini butun son sifatida qaytaradi.",
      hintsUz: ["return math.ceil((params_billions * bytes_per_param) / gpu_mem_gb)"],
      testCases: [
        { id: "tc1", descriptionUz: "100B FP16 (200GB) -> 141GB H200 dan kamida 2 ta kerak", assertionCode: "min_gpus_for_weights(100.0, 141.0, 2) == 2" },
        { id: "tc2", descriptionUz: "70B FP16 (140GB) -> 1 ta H200 (141GB) ga sig'adi", assertionCode: "min_gpus_for_weights(70.0, 141.0, 2) == 1" },
      ],
      modelSolution: `import math

def min_gpus_for_weights(params_billions: float, gpu_mem_gb: float, bytes_per_param: int = 2) -> int:
    return math.ceil((params_billions * bytes_per_param) / gpu_mem_gb)`,
      solutionExplanationUz: "Faqat vaznlarni saqlashning o'zi uchun minimal GPU sonini hisobladik; real treningda activation va Adam uchun yana bir necha barobar ko'proq kerak bo'ladi.",
    },
    quiz: {
      questionUz: "Pipeline Parallelism da «Bubble» deganda nima tushuniladi?",
      options: [
        "Bir GPU keyingi yoki oldingi bosqichni kutish davomida bekor (idle) turib qolishi",
        "KV Cache ning bloklarga bo'linishi",
        "MoE routerining barcha ekspertni tanlashi",
      ],
      correctIndex: 0,
      explanationUz: "Ketma-ket GPU bosqichlarida oldingi bosqichlar orqaga qaytish (backward pass) navbatini kutib bekor qolishi Pipeline Bubble deyiladi.",
    },
  },
  {
    id: "tr-18-inference-roofline-speculative",
    order: 18,
    lectureNumber: 5,
    titleUz: "18. Inference Tezlashtirish: Roofline, PagedAttention, MLA & Speculative Decoding",
    subtitleEn: "Lecture 5 • Prefill Compute-Bound vs Decode Memory-Bound, B=16 Blok & Draft-Target Isbot",
    canonicalConceptId: "production-mlops-serving",
    estimatedMinutes: 17,
    analogyUz:
      "Speculative Decoding — kichik yordamchi (Draft Model) tezda 4 ta so'zni yozib beradi, professor (Target Model) esa barcha 4 so'zni BITTADA parallel tekshiradi! Agar 3 tasi to'g'ri chiqsa, 1 qadamda 3–4 token tayyor — va eng ajablanarlisi, matematika yakuniy taqsimotni 100% saqlaydi!",
    theoryParagraphsUz: [
      "Inference da 3 metrika muhim: TTFT (Time To First Token = Queue + Prefill), TPOT (har bir output token vaqti) va TTLT. Nima uchun 10K kirish + 10 chiqish tez, 10 kirish + 10K chiqish sekin (va output ~5x qimmat)? Chunki Prefill barcha promptni parallel qayta ishlab Compute-Bound bo'ladi; Decode esa bitta token chiqarish uchun ham barcha vaznlarni HBM dan tashib o'tgani uchun Memory Bandwidth ga bog'liq (Roofline Model da Ridge Point dan chapda — Memory-Bound!).",
      "Xotira isrofini yo'qotish uchun PagedAttention max output o'rnini oldindan band qilmay, KV Cache ni B=16 o'lchamli kichik bloklarga bo'lib fragmentation ni bartaraf etadi. Vazn/KV sonini qisqartirishda esa GQA (masalan G=2 / H=24 => 91% kam xotira!) va yanada ilg'or Multi-Latent Attention (MLA — barcha K/V larni bitta umumiy siqilgan latent vektorda saqlash) qo'llanadi.",
      "Nihoyat, avtoregressiv sekinlikni sindirish uchun Speculative Decoding ishlatiladi: Draft Model K ta token taklif qiladi, Target Model hammasini bir o'tishda tekshiradi (Rejection Sampling: T >= D bo'lsa qabul, aks holda T/D ehtimol bilan qabul; rad etilsa qoldiq taqsimotdan tanlash => min(D,T) + max(0, T-D) = T, ya'ni 100% asl taqsimot!). Draft uchun alohida model o'rniga bitta modelga K ta qo'shimcha bosh qo'yish (Multi-Token Prediction) ham mumkin.",
    ],
    keyInsightUz: {
      highlightUz: "Speculative Decoding javob sifatini pasaytirmasligining matematik kafolati:",
      explanationUz:
        "Acceptance min(D(x), T(x)) ga Rejection qoldiq taqsimoti max(0, T(x) - D(x)) qo'shilganda aynan T(x) chiqadi — ya'ni chiqish taqsimoti katta Target Model bilan 100% bir xil!",
    },
    formulaLatex: "\\min(D(x), T(x)) + \\max(0, T(x) - D(x)) = T(x), \\qquad \\text{GQA Tejash} = 1 - \\frac{G}{H}",
    formulaNoteUz: "Rejection sampling va qoldiq taqsimot yig'indisi har doim Target taqsimot T(x) ga teng bo'ladi.",
    visualId: "roofline-speculative",
    visualTitleUz: "Roofline Model, PagedAttention (B=16) va Speculative Decoding Tekshiruvi",
    pytorchSnippet: `# Speculative Decoding ehtimol saqlanishini tekshirish
D = [0.5, 0.3, 0.2]
T = [0.7, 0.1, 0.2]
p_reject = 1.0 - sum(min(d, t) for d, t in zip(D, T))
recovered = [min(d, t) + max(0.0, t - d) for d, t in zip(D, T)]
print("Tiklangan T:", recovered, "Asl T:", T)`,
    exercise: {
      id: "ex-tr-18",
      titleUz: "Amaliy mashq: Speculative Decoding taqsimot saqlanishi va GQA xotira tejashini hisoblash",
      instructionsUz:
        "`speculative_acceptance_rate(draft_probs: list[float], target_probs: list[float]) -> float` funksiyasini yozing: `sum(min(d, t) for d, t in zip(draft_probs, target_probs))` umumiy qabul qilish ehtimolini qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def speculative_acceptance_rate(draft_probs: list[float], target_probs: list[float]) -> float:
    # Qabul qilish ehtimoli sum(min(d, t)) ni qaytaring
    pass`,
      expectedBehaviorUz: "Draft va Target taqsimotlari qancha mos bo'lsa, qabul qilish darajasi shuncha 1.0 ga yaqin chiqadi.",
      hintsUz: ["return float(sum(min(d, t) for d, t in zip(draft_probs, target_probs)))"],
      testCases: [
        { id: "tc1", descriptionUz: "Bir xil taqsimot -> 1.0 qabul", assertionCode: "abs(speculative_acceptance_rate([0.5, 0.3, 0.2], [0.5, 0.3, 0.2]) - 1.0) < 1e-6" },
        { id: "tc2", descriptionUz: "[0.5, 0.5] va [0.7, 0.3] -> min(0.5,0.7)+min(0.5,0.3)=0.8", assertionCode: "abs(speculative_acceptance_rate([0.5, 0.5], [0.7, 0.3]) - 0.8) < 1e-6" },
      ],
      modelSolution: `def speculative_acceptance_rate(draft_probs: list[float], target_probs: list[float]) -> float:
    return float(sum(min(d, t) for d, t in zip(draft_probs, target_probs)))`,
      solutionExplanationUz: "Draft va Target taqsimotlari qanchalik yaqin bo'lsa (Knowledge Distillation orqali), Speculative Decoding shunchalik tez ishlaydi!",
    },
    quiz: {
      questionUz: "Nima uchun LLM da bitta token generatsiya qilish (Decode) Roofline modelda Memory-Bound bo'ladi?",
      options: [
        "Har bir yangi token chiqarish uchun modelning barcha milliardlab vaznlarini HBM dan tashib o'tish kerak, hisoblash esa atigi 1 tokenlik",
        "Chunki SRAM hajmi 1000 GB",
        "Chunki PagedAttention bloklari cheksiz katta",
      ],
      correctIndex: 0,
      explanationUz: "Arithmetic Intensity (FLOP / Byte) juda past bo'lgani uchun vaqtni GPU hisob tezligi emas, HBM -> SRAM xotira o'tkazish tezligi belgilaydi.",
    },
  },

  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 6 (lecture6.md)                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-19-rag-hybrid-rerank",
    order: 19,
    lectureNumber: 6,
    titleUz: "19. RAG Arxitekturasi, Hybrid Search (BM25+Vector), Cross-Encoder & NDCG",
    subtitleEn: "Lecture 6 • Bi-Encoder vs Cross-Encoder, Contextual Retrieval, NDCG/MRR va Coding da grep",
    canonicalConceptId: "rag-retrieval-augmented",
    estimatedMinutes: 16,
    analogyUz:
      "Millionlab kitobli kutubxonada avval tezkor Bi-Encoder + BM25 katalogi bilan ~100 ta eng o'xshash kitobni stolga keltirasiz (Recall). Keyin sinchkov Cross-Encoder Re-Ranker har birini savol bilan yonma-yon o'qib, eng to'g'ri Top-K sahifani LLM ga uzatadi!",
    theoryParagraphsUz: [
      "Oddiy LLM 3 chegara bilan to'qnashadi: Knowledge Cutoff (yangi va xususiy kodlarni bilmaydi), Context Rot (katta kontekstda fakt yo'qoladi) va Token narxi. Yechim — RAG (Retrieve, Augment, Generate): hujjatlar yuzlab tokenli qismlarga Chunking qilinadi (~10% overlap bilan gap ma'nosi uzilib qolmasligi uchun) va Contextual Retrieval bilan kontekst qo'shiladi.",
      "Qidiruv 2 bosqichli bo'ladi: 1) Nomzod yig'ish (Recall maksimal qilish) — Bi-Encoder semantik qidiruvi + BM25 aniq so'z qidiruvini birlashtiruvchi Hybrid Search (ba'zan HyDE yoki query rewriting bilan). Masalan «Where is Cuddly?» so'rovida vektor «Huggy» ga adashsa, BM25 «Cuddly» so'zini ushlaydi! 2) Re-Ranker: top-100 nomzod endi Cross-Encoder ga savol bilan bitta ketma-ketlikda kiritilib [CLS] orqali aniq tartiblanadi («qizil sharfli ko'k paypoq» nozik farqlarini ajratadi).",
      "Sifat NDCG@K, MRR (1/rank), Precision@K va Recall@K bilan o'lchanadi. Lekin muhim istisno: Coding Agents ko'pincha vektorli RAG o'rniga to'g'ridan-to'g'ri `grep` (regex aniq qidiruvi) ni ishlatadi — chunki kodda funksiya va o'zgaruvchi nomini aniq topish semantik o'xshashlikdan ancha tez va aniq!",
    ],
    keyInsightUz: {
      highlightUz: "Qachon Vector RAG o'rniga `grep` kuchliroq ishlaydi?",
      explanationUz:
        "Tabiiy tilda «ayiqcha yumshoq» ≈ «teddy is soft» deya turlicha aytilgani uchun Embedding/Hybrid RAG kerak; lekin dasturiy kodda `compute_loss` kabi aniq identifikatorlarni izlashda `grep` tezroq va xatosiz!",
    },
    formulaLatex: "\\text{NDCG}@K = \\frac{\\text{DCG}@K}{\\text{IDCG}@K}, \\qquad \\text{DCG}@K = \\sum_{i=1}^{K} \\frac{\\text{rel}_i}{\\log_2(i + 1)}",
    formulaNoteUz: "To'g'ri hujjat ro'yxat boshida (kichik i) tursa log_2(i+1) kichik bo'lib NDCG 1.0 ga yaqinlashadi.",
    visualId: "rag-hybrid-ndcg",
    visualTitleUz: "Bi-Encoder vs BM25 Hybrid Search & NDCG@K Kalkulyatori",
    pytorchSnippet: `# Hybrid RAG g'oyasi: Reciprocal Rank Fusion + DCG hisoblash
import math

rels = [1, 0, 1, 0]  # Top-4 natijada 1- va 3-o'rin kerakli
dcg = sum(r / math.log2(i + 2) for i, r in enumerate(rels))
idcg = sum(r / math.log2(i + 2) for i, r in enumerate(sorted(rels, reverse=True)))
print("NDCG@4:", round(dcg / idcg, 4))`,
    exercise: {
      id: "ex-tr-19",
      titleUz: "Amaliy mashq: Retrieval sifati uchun NDCG@K metrikasini hisoblash",
      instructionsUz:
        "`ndcg_at_k(relevances: list[float]) -> float` funksiyasini yozing: `dcg = sum(rel / math.log2(i + 2) for i, rel in enumerate(relevances))` va ideal tartib `sorted(relevances, reverse=True)` bo'yicha `idcg` ni toping; `idcg == 0` bo'lsa `0.0`, aks holda `dcg / idcg` qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def ndcg_at_k(relevances: list[float]) -> float:
    # DCG / IDCG ni hisoblang
    pass`,
      expectedBehaviorUz: "Ideal tartibda 1.0, noto'g'ri tartibda 0..1 oralig'ida ball qaytaradi.",
      hintsUz: ["i=0 uchun maxraj math.log2(0 + 2) = math.log2(2) = 1.0."],
      testCases: [
        { id: "tc1", descriptionUz: "Mukammal tartib [1, 1, 0] -> 1.0", assertionCode: "abs(ndcg_at_k([1.0, 1.0, 0.0]) - 1.0) < 1e-6" },
        { id: "tc2", descriptionUz: "Hech qanday mos hujjat bo'lmasa 0.0", assertionCode: "ndcg_at_k([0.0, 0.0, 0.0]) == 0.0" },
        { id: "tc3", descriptionUz: "Kerakli hujjat pastda [0, 1] bo'lsa < 1.0", assertionCode: "ndcg_at_k([0.0, 1.0]) < 0.7" },
      ],
      modelSolution: `import math

def ndcg_at_k(relevances: list[float]) -> float:
    dcg = sum(rel / math.log2(i + 2) for i, rel in enumerate(relevances))
    ideal = sorted(relevances, reverse=True)
    idcg = sum(rel / math.log2(i + 2) for i, rel in enumerate(ideal))
    if idcg == 0.0:
        return 0.0
    return float(dcg / idcg)`,
      solutionExplanationUz: "NDCG eng kerakli hujjatlarni Top-K ning boshiga chiqargan tizimlarga yuqori ball beradi.",
    },
    quiz: {
      questionUz: "Nima uchun Cross-Encoder barcha 1 million hujjatda emas, faqat Re-Ranking bosqichidagi ~100 nomzodda ishlatiladi?",
      options: [
        "Chunki har bir juftlikni (Query + Chunk) birga modeldan o'tkazish oldindan saqlab bo'lmaydigan qimmat hisob talab qiladi",
        "Chunki Cross-Encoder faqat rasmlarda ishlaydi",
        "Chunki Vector Database faqat Cross-Encoder saqlaydi",
      ],
      correctIndex: 0,
      explanationUz: "Bi-Encoder da hujjat vektorlari oldindan hisoblanadi; Cross-Encoder esa har savol bilan qayta Self-Attention qilgani uchun faqat kichik Top-N to'plamda qo'llanadi.",
    },
  },
  {
    id: "tr-20-tools-mcp-caching",
    order: 20,
    lectureNumber: 6,
    titleUz: "20. Tool Calling, MCP (Server/Client), Prompt Tartibi & Caching",
    subtitleEn: "Lecture 6 • 3-Bosqichli Tool Loop, Tool Selection, MCP 3 Quti & 10x Prompt Caching",
    canonicalConceptId: "model-context-protocol",
    estimatedMinutes: 15,
    analogyUz:
      "Prompt Caching xuddi har dars boshida o'sha qalin qo'llanmani stol ustida qoldirishga o'xshaydi! Agar o'zgaruvchan «Hozirgi vaqt: 17:55» ni eng tepaga qo'ysangiz — har safar kesh buziladi! O'zgarmas Tool ta'riflarini tepaga qo'ysangiz, har bir so'rov ~10 barobar arzonlashadi!",
    theoryParagraphsUz: [
      "LLM faqat javob yozadi — real dunyoda harakat qilish (GPS olish, veb qidiruv, kalkulyator, kod ishga tushirish, email yuborish) uchun Tool Calling 3 bosqichda ishlaydi: 1) LLM API ta'riflari/docstring asosida funksiya + argumentlarni bashorat qiladi; 2) Tashqi backend deterministik tarzda bajarib tuzilgan javob (masalan Enum/JSON) qaytaradi; 3) LLM shu javobdan foydalanuvchiga yakuniy gapni tuzadi.",
      "Kontekstga birdaniga yuzlab tool qo'yilsa ikkita falokat yuz beradi: Conflict Risk (bir nechta o'xshash tool o'zaro urishadi) va Context Rot. Shuning uchun avval yengil router orqali Tool Selection (tarix, profil va ruxsatlarga qarab kerakli kichik to'plam) tanlanadi. Turli modellarga bitta yozilgan tool ni ulash uchun esa MCP (Model Context Protocol) standart 3 ta tushuncha beradi: MCP Server / Client ichida Tools, Prompts va Resources.",
      "Uzoq Tool ta'riflari har so'rovda token yeyishini hal qilish uchun Prompt Caching ishlatiladi (~10x arzonroq, TTL masalan 5 daqiqa yoki 1 soat). Qat'iy qoida: doimiy o'zgarmas qism (System + Tool Definitions) ENG TEPADA, o'zgaruvchan User Context (sana/vaqt) va User Prompt esa PASTDA turishi shart!",
    ],
    keyInsightUz: {
      highlightUz: "Prompt Caching ning oltin tartib qoidasi:",
      explanationUz:
        "[Fixed System + Tool Definitions] -> [User Context (date/time)] -> [User Prompt]. Agar o'zgaruvchi vaqtni birinchi qatorga qo'ysangiz, prefix mos kelmay kesh 0% ishlaydi!",
    },
    formulaLatex: "\\text{Cache Hit} \\iff \\text{Prefix}_{t} = \\text{Prefix}_{t-1}, \\qquad \\text{Cost}_{\\text{cached}} \\approx 0.1 \\times \\text{Cost}_{\\text{input}}",
    formulaNoteUz: "Prefiks boshidan boshlab bir xil bo'lgan tokenlargina kesh narxida (~10x arzon) hisoblanadi.",
    visualId: "mcp-prompt-caching",
    visualTitleUz: "Prompt Caching Tartib O'yini & MCP (Tools / Prompts / Resources)",
    pytorchSnippet: `# Prompt tartibining kesh narxiga ta'siri (1000 tool token + 50 dinamik token)
tool_tokens, dynamic_tokens = 1000, 50
bad_order_cost = (tool_tokens + dynamic_tokens) * 1.0          # Hammasi to'liq narxda!
good_order_cost = (tool_tokens * 0.1) + (dynamic_tokens * 1.0) # Toollar 10x arzon keshda!
print("Yomon vs Yaxshi tartib narxi:", bad_order_cost, "vs", good_order_cost)`,
    exercise: {
      id: "ex-tr-20",
      titleUz: "Amaliy mashq: Prompt Caching bilan xabar tartibi xarajatini hisoblash",
      instructionsUz:
        "`prompt_cache_cost(fixed_tokens: int, dynamic_tokens: int, fixed_first: bool) -> float` funksiyasini yozing: `fixed_first=True` bo'lsa `fixed_tokens * 0.1 + dynamic_tokens * 1.0`, aks holda `(fixed_tokens + dynamic_tokens) * 1.0` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def prompt_cache_cost(fixed_tokens: int, dynamic_tokens: int, fixed_first: bool) -> float:
    # O'zgarmas qism boshida tursa 0.1x narx, bo'lmasa 1.0x
    pass`,
      expectedBehaviorUz: "Prefix caching to'g'ri tartiblanganda xarajatni keskin kamaytiradi.",
      hintsUz: ["if fixed_first: return fixed_tokens * 0.1 + dynamic_tokens * 1.0"],
      testCases: [
        { id: "tc1", descriptionUz: "Fixed tepada: 1000*0.1 + 50 = 150.0", assertionCode: "abs(prompt_cache_cost(1000, 50, True) - 150.0) < 1e-6" },
        { id: "tc2", descriptionUz: "Dinamik vaqt tepada: kesh buziladi = 1050.0", assertionCode: "abs(prompt_cache_cost(1000, 50, False) - 1050.0) < 1e-6" },
      ],
      modelSolution: `def prompt_cache_cost(fixed_tokens: int, dynamic_tokens: int, fixed_first: bool) -> float:
    if fixed_first:
        return fixed_tokens * 0.1 + dynamic_tokens * 1.0
    return (fixed_tokens + dynamic_tokens) * 1.0`,
      solutionExplanationUz: "O'zgarmas tool va tizim ko'rsatmalarini eng boshida saqlash kesh urishini kafolatlaydi.",
    },
    quiz: {
      questionUz: "MCP (Model Context Protocol) da Server va Client o'rtasida uchta asosiy standart nima?",
      options: [
        "Tools (bajariladigan amallar), Prompts (tayyor workflow shablonlari) va Resources (kontekst uchun ma'lumotlar)",
        "Pre-Training, Mid-Training va SFT",
        "HBM, SRAM va Cache",
      ],
      correctIndex: 0,
      explanationUz: "MCP Server har qanday LLM Client ga standart ko'rinishda Tools, Prompts va Resources taqdim etadi.",
    },
  },
  {
    id: "tr-21-harness-react-memory",
    order: 21,
    lectureNumber: 6,
    titleUz: "21. Agent Harness, ReAct Loop, Context Compaction, Memory & Swarms",
    subtitleEn: "Lecture 6 • Engine+Harness, A2A, Pi Compaction, AGENTS.md, Skills & Sub-Agents",
    canonicalConceptId: "ai-agents-react-loop",
    estimatedMinutes: 16,
    analogyUz:
      "LLM — bu kuchli dvigatel, lekin dvigatelning o'zi bilan yo'lga chiqa olmaysiz! Rul, g'ildiraklar, tormoz va yo'l xaritasi — bu Harness. Kontekst to'lganda esa hamma cheklarni cho'ntakda olib yurmay, qisqa xulosa daftarchaga (Context Compaction) ko'chirib yurasiz!",
    theoryParagraphsUz: [
      "Model qanchalik kuchli bo'lmasin, uning atrofidagi Harness (tool lar, xotira, siqish, promptlash, bajarish muhiti) bo'lmasa u haqiqiy agent bo'la olmaydi — xuddi dvigatel va mashina korpusidek ikkisi ham zarur. Agentlar ReAct (Reason + Act) siklida ishlaydi: Observe (holatni ko'rish) -> Plan -> Act (Tool chaqirish) -> Observe (natijani tekshirish), to maqsad bajarilguncha; ko'p agentlar o'zaro muloqotda A2A protokolidan foydalanadi.",
      "Uzoq sessiyada Context Window to'lib qolganda 3 ta Context Compaction usuli qo'llanadi: 1) Eski keraksiz tool natijalarini o'chirish; 2) Vaqt bo'yicha Sliding Window; 3) Pi agentidagi kabi joriy taraqqiyot va qolgan ishlarni qisqacha strukturalangan bo'limlarga jamlash (Structured Summarization). Sessiyadan tashqarida esa Short-Term Memory (kontekst oynasi) dan tashqari Long-Term Memory (RAG yoki maxsus saqlash tooli) ishlatiladi.",
      "Zamonaviy Coding Agents muhitida esa: har harakatni tasdiqlash o'rniga yengil xavfsizlik modeli (Auto-Approval), RAG o'rniga tezkor regex `grep`, loyiha qoidalarini saqlovchi `AGENTS.md`, takroriy jarayonlar uchun `Skills`, ekran boshqaruvi (`Computer Use` — skrinshotlar sabab hozircha sekin), hamda vazifalarni bo'lishuvchi Sub-Agents va Agent Swarms (xavfsizlik nazorati bilan!) keng qo'llaniladi.",
    ],
    keyInsightUz: {
      highlightUz: "Kodlash agentlarida Context Rot va Sub-Agent narxi muvozanati:",
      explanationUz:
        "Minimalist harness (masalan Pi) keraksiz sub-agent ochish va uzun kontekst shishirishdan qochadi — chunki har bir yangi sub-agent butun kontekstni noldan qayta to'ldirib qo'shimcha token xarajatini keltirib chiqaradi.",
    },
    formulaLatex: "\\text{Agent} = \\text{Model (Engine)} + \\text{Harness (Tools + Loop + Compaction + Memory)}",
    formulaNoteUz: "Zaif model + kuchli harness ham, kuchli model + yomon harness ham optimal natija bermaydi; ikkisi bir-birini to'ldiradi.",
    visualId: "react-harness-memory",
    visualTitleUz: "ReAct Termostat Sikli & Context Compaction (Siqish) Simulyatori",
    pytorchSnippet: `# Oddiy sliding-window vs structured summary context compaction
messages = ["sys", "t1", "tool_huge_log", "t2", "tool_huge_log2", "user_now"]
# Keraksiz katta tool loglarni tozalab va xulosa qo'shib siqish
compacted = ["sys", "[Summary: t1..t2 bajarildi]", "user_now"]
print("Asl vs Siqilgan token bloklari:", len(messages), "->", len(compacted))`,
    exercise: {
      id: "ex-tr-21",
      titleUz: "Amaliy mashq: Context Compaction bilan token chegarasini saqlash",
      instructionsUz:
        "`compact_history(messages: list[str], keep_last: int) -> list[str]` funksiyasini yozing: agar `len(messages) <= keep_last + 1` bo'lsa `list(messages)` ni, aks holda `[messages[0], '[SUMMARY]'] + messages[-keep_last:]` (1-tizim xabarini saqlab, o'rtani `[SUMMARY]` bilan almashtirib oxirgi `keep_last` ta xabarni) qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def compact_history(messages: list[str], keep_last: int) -> list[str]:
    # Boshi (system) va oxirgi keep_last xabarni saqlab o'rtani siqing
    pass`,
      expectedBehaviorUz: "System prompt va oxirgi xabarlarni saqlab, eski oraliq tarixni [SUMMARY] ga siqadi.",
      hintsUz: ["if len(messages) <= keep_last + 1: return list(messages)"],
      testCases: [
        { id: "tc1", descriptionUz: "6 xabardan oxirgi 2 tasini qoldirib siqish", assertionCode: "compact_history(['sys', 'a', 'b', 'c', 'd', 'e'], 2) == ['sys', '[SUMMARY]', 'd', 'e']" },
        { id: "tc2", descriptionUz: "Qisqa tarix o'zgarishsiz qoladi", assertionCode: "compact_history(['sys', 'a', 'b'], 2) == ['sys', 'a', 'b']" },
      ],
      modelSolution: `def compact_history(messages: list[str], keep_last: int) -> list[str]:
    if len(messages) <= keep_last + 1:
        return list(messages)
    return [messages[0], "[SUMMARY]"] + messages[-keep_last:]`,
      solutionExplanationUz: "Context Compaction uzoq ReAct sessiyasida boshlang'ich tizim qoidalarini yo'qotmasdan kontekstni toza saqlaydi.",
    },
    quiz: {
      questionUz: "Agent ekotizimida `AGENTS.md` va `Skills` ning asosiy vazifasi nima?",
      options: [
        "`AGENTS.md` loyiha qoidalari va uslubini saqlaydi, `Skills` esa takroriy ish oqimlarini ko'rsatma/skript sifatida avtomatlashtiradi",
        "Ikkalasi GPU dagi FlashAttention blokini o'chiradi",
        "Ular faqat Temperature=0 ni yoqadi",
      ],
      correctIndex: 0,
      explanationUz: "Codlash agentlari `AGENTS.md` orqali doimiy loyiha kontekstini, `Skills` orqali esa ko'p bosqichli qayta ishlanadigan retseptlarni oladi.",
    },
  },

  /* ---------------------------------------------------------------------- */
  /* MA'RUZA 7 (lecture7.md)                                                */
  /* ---------------------------------------------------------------------- */
  {
    id: "tr-22-metrics-passk-bleu",
    order: 22,
    lectureNumber: 7,
    titleUz: "22. Kelishuv (Cohen's Kappa), Verifiable (Pass@K) & Klassik NLP Metrikalar",
    subtitleEn: "Lecture 7 • Random Baseline vs Kappa, Pass@K Isboti, Consensus@K & BLEU/METEOR",
    canonicalConceptId: "model-evaluation-metrics",
    estimatedMinutes: 16,
    analogyUz:
      "Ikki hakam tanga tashlab tasodifan «o'tdi/yiqildi» desa ham 50% kelishib qolishi mumkin! Shu sababli oddiy foiz emas, tasodifni ayiruvchi Cohen's Kappa ishlatiladi. Kodda esa 10 urinishdan kamida bittasi testdan o'tishi ehtimoli Pass@K bilan xolis o'lchanadi!",
    theoryParagraphsUz: [
      "Subyektiv sifatni (masalan, foydalilik) insonlar baholaganda oddiy kelishuv foizi aldaydi: agar Alis va Bob 50% tasodifiy «Pass» aytsa, ular baribir 50% bir xil fikrda chiqadi! Cohen's Kappa kuzatilgan kelishuv (p_o) ni tasodifiy kutilgan kelishuv (p_e) ga solishtirib (-1..1, yaxshi chegara >= 0.8) o'lchaydi. Ammo insoniy baholash sekin va qimmat.",
      "Kod va matematika kabi aniq tekshiriladigan vazifalarda Pass@K — K ta urinishdan kamida 1 tasi barcha testdan o'tish ehtimoli o'lchanadi: N ta urinish chiqarib C ta to'g'risini sanasak, xolis baho `1 - C(N-C, K) / C(N, K)`. Temperature=0 da barcha urinish bir xil bo'lgani uchun Pass@K oshmaydi; T ~ 0.6–0.8 da esa xilma-xillik tufayli ko'tariladi! Matematika kabi test yo'q paytda esa Consensus@K (ko'pchilik ovozi) qo'llanadi.",
      "Tabiiy til tarjimasida BLEU (n-gram precision + qisqa javob jarimasi Brevity Penalty) va METEOR (recall + sinonimlar + bo'laklar tartibi penalty) keng tarqalgan. Biroq ularning katta kamchiligi: bitta fikrni boshqa so'zlar bilan chiroyli ifodalagan javoblarni tanimaydi va inson yozgan reference talab qiladi.",
    ],
    keyInsightUz: {
      highlightUz: "Pass@K da nima uchun (N-C)/N ning K-darajasi emas, kombinatorika `C(N-C, K)/C(N, K)` ishlatiladi?",
      explanationUz:
        "Chunki generatsiya qilingan N ta urinish ichidan K tasini qaytarmasdan (without replacement) tanlaymiz — har bir xato urinish tanlanganda qolgan xato urinishlar soni 1 taga kamayib boradi!",
    },
    formulaLatex: "\\kappa = \\frac{p_o - p_e}{1 - p_e}, \\qquad \\text{pass}@k = 1 - \\frac{\\binom{n - c}{k}}{\\binom{n}{k}}",
    formulaNoteUz: "Cohen's Kappa >= 0.8 kuchli kelishuvni bildiradi; Pass@K binom koeffitsiyentlari bilan xolis baholanadi.",
    visualId: "kappa-passk-metrics",
    visualTitleUz: "Cohen's Kappa & Unbiased Pass@K Kombinatorika Kalkulyatori",
    pytorchSnippet: `import math

# Unbiased Pass@K: n=10 urinishdan c=3 tasi to'g'ri, k=5 da pass@5 qancha?
n, c, k = 10, 3, 5
pass_at_k = 1.0 - (math.comb(n - c, k) / math.comb(n, k))
print(f"Pass@{k}: {pass_at_k:.4f}")`,
    exercise: {
      id: "ex-tr-22",
      titleUz: "Amaliy mashq: Cohen's Kappa va Unbiased Pass@K hisoblash",
      instructionsUz:
        "`pass_at_k(n: int, c: int, k: int) -> float` funksiyasini yozing: agar `n - c < k` bo'lsa `1.0` (chunki albatta kamida 1 ta to'g'ri urinish ichiga tushadi), aks holda `1.0 - math.comb(n - c, k) / math.comb(n, k)` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def pass_at_k(n: int, c: int, k: int) -> float:
    # Unbiased pass@k formulasini yozing
    pass`,
      expectedBehaviorUz: "Berilgan n, c, k uchun xolis pass@k ehtimolini qaytaradi.",
      hintsUz: ["if n - c < k: return 1.0"],
      testCases: [
        { id: "tc1", descriptionUz: "k=1 bo'lganda oddiy c/n nisbati chiqadi", assertionCode: "abs(pass_at_k(10, 4, 1) - 0.4) < 1e-6" },
        { id: "tc2", descriptionUz: "n-c < k bo'lganda albatta 1.0", assertionCode: "pass_at_k(5, 3, 4) == 1.0" },
        { id: "tc3", descriptionUz: "n=10, c=2, k=5 -> ~0.7778", assertionCode: "abs(pass_at_k(10, 2, 5) - (1.0 - 21 / 252)) < 1e-6" },
      ],
      modelSolution: `import math

def pass_at_k(n: int, c: int, k: int) -> float:
    if n - c < k:
        return 1.0
    return 1.0 - (math.comb(n - c, k) / math.comb(n, k))`,
      solutionExplanationUz: "Pass@K kombinatorika formulasi k=1 da oddiy to'g'ri javoblar ulushiga aylanadi va k katta bo'lganda ham xolis baho beradi.",
    },
    quiz: {
      questionUz: "Agar Alis va Bob tasodifan 50/50 ga o'tdi/yiqildi deb javob bersa, Cohen's Kappa qiymati nechaga teng chiqadi?",
      options: [
        "0.0 ga teng (chunki kuzatilgan 50% kelishuv tasodifiy kutilgan 50% bilan bir xil)",
        "1.0 ga teng",
        "0.5 ga teng",
      ],
      correctIndex: 0,
      explanationUz: "po = 0.5 va pe = 0.5 bo'lganda (po - pe)/(1 - pe) = 0 bo'ladi — shuning uchun Kappa tasodifiy mos kelishni fosh qiladi.",
    },
  },
  {
    id: "tr-23-llm-as-judge-biases",
    order: 23,
    lectureNumber: 7,
    titleUz: "23. LLM-as-a-Judge, Structured Outputs & Biaslarni Yengish",
    subtitleEn: "Lecture 7 • Hill-Climbing Loop, Position / Verbosity / Self-Enhancement Bias & Eng Yaxshi Amaliyotlar",
    canonicalConceptId: "model-evaluation-metrics",
    estimatedMinutes: 15,
    analogyUz:
      "LLM-as-a-Judge — xuddi qat'iy qo'llanma olgan yordamchi hakam! Lekin ehtiyot bo'ling: hakam har doim 1-o'rindagi varaqni yoqtirishi (Position Bias), uzun yozilgan inshoga uchishi (Verbosity Bias) yoki o'z dastxatini maqtashi (Self-Enhancement Bias) mumkin!",
    theoryParagraphsUz: [
      "Ochiq javoblarni (reference siz, turli uslubda) baholash uchun LLM-as-a-Judge ishlatiladi: u nafaqat ball, balki asosli izoh (Rationale) beradi. Hakam prompti qo'lda bir marta yozilmaydi: avval ~10+ namuna inson tomonidan belgilanadi -> baseline prompt qilinadi -> xato joylar tahlil qilinib agent sikli orqali prompt Hill-Climbing bilan sayqallanadi; chiqish esa Structured Outputs (Guided Decoding JSON) orqali kafolatlanadi.",
      "Hakam LLM ning 3 mashhur xatoligi (Bias): 1) Position Bias — A va B orasidan sifatidan qat'i nazar A ni (yoki oxirgini) tanlash -> o'rinlarini almashtirib 2 marta so'rash bilan aniqlanadi; 2) Verbosity Bias — qisqa to'g'ri javobdan ko'ra uzun cho'zilgan javobni ma'qullash -> promptda uzunlik mezon emasligini aniq aytish; 3) Self-Enhancement Bias — model o'zi yaratgan javobni afzal ko'rishi -> hakam sifatida boshqa kuchliroq model ishlatish.",
      "Eng yaxshi amaliyotlar: 1–10 shkalasi o'rniga aniq Binary Pass/Fail tanlang; balldan OLDIN Rationale yozdiring (fikrlash imkoni); doim inson baholari bilan kalibrlang va Temperature ni tushirib/Self-Consistency qo'llang. Yangi yo'nalish — kalibrlangan ehtimol beruvchi Decision Models (masalan Jev).",
    ],
    keyInsightUz: {
      highlightUz: "Nima uchun LLM hakamdan avval Rationale (izoh), keyin Score (ball) so'raladi?",
      explanationUz:
        "Chunki avtoregressiv model ballni birinchi token qilib chiqarsa, hali tahlil qilmasdan qaror qabul qilgan bo'ladi! Avval sababni yozdirish Chain-of-Thought kabi to'g'ri xulosaga olib keladi.",
    },
    formulaLatex: "\\text{Judge}_{\\text{swap-safe}}(A, B) = \\Big(\\text{Judge}(A, B) = A\\Big) \\land \\Big(\\text{Judge}(B, A) = A\\Big)",
    formulaNoteUz: "Position Bias ni aniqlash va neytrallashtirish uchun A/B juftlik o'rni almashtirilib ikki marta tekshiriladi.",
    visualId: "llm-judge-biases",
    visualTitleUz: "LLM-as-a-Judge Bias Tekshirgichi (Position / Verbosity / Binary)",
    pytorchSnippet: `# Position Bias ni aniqlash uchun juftlik o'rnini almashtirib tekshirish
def consistent_pairwise(pick_ab: str, pick_ba: str) -> str:
    # Agar ikkala tartibda ham bir xil nomzod yutsa -> barqaror
    return pick_ab if pick_ab == pick_ba else "TIE_BIAS_DETECTED"

print(consistent_pairwise("Model_A", "Model_B"))`,
    exercise: {
      id: "ex-tr-23",
      titleUz: "Amaliy mashq: Position Bias tekshiruvchi juftli hakam qarori",
      instructionsUz:
        "`position_bias_check(ab_winner: str, ba_winner: str) -> str` funksiyasini yozing: agar `ab_winner == ba_winner` bo'lsa g'olib nomini, aks holda (o'rin almashganda hakam fikri o'zgarsa) `'BIAS_CONFLICT'` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def position_bias_check(ab_winner: str, ba_winner: str) -> str:
    # Hakam qarori o'rin almashganda ham saqlanadimi?
    pass`,
      expectedBehaviorUz: "Barqaror g'olibni yoki position bias aniqlanganda BIAS_CONFLICT qaytaradi.",
      hintsUz: ["return ab_winner if ab_winner == ba_winner else 'BIAS_CONFLICT'"],
      testCases: [
        { id: "tc1", descriptionUz: "Ikkala tartibda ham A yutsa -> 'A'", assertionCode: "position_bias_check('A', 'A') == 'A'" },
        { id: "tc2", descriptionUz: "Doim 1-turgan nomzod yutsa (A, keyin B) -> 'BIAS_CONFLICT'", assertionCode: "position_bias_check('A', 'B') == 'BIAS_CONFLICT'" },
      ],
      modelSolution: `def position_bias_check(ab_winner: str, ba_winner: str) -> str:
    return ab_winner if ab_winner == ba_winner else "BIAS_CONFLICT"`,
      solutionExplanationUz: "O'rin almashtirish testi LLM-as-a-Judge dagi yashirin Position Bias ni avtomatik tutadi.",
    },
    quiz: {
      questionUz: "LLM-as-a-Judge qurishda 1–10 ball o'rniga Binary (Pass/Fail) baholash nima uchun afzal?",
      options: [
        "Insonlar ham 5 vs 6 orasida qiynalgani uchun 1–10 shkalasi shovqin beradi; Binary Pass/Fail aniq kalibrlanadi",
        "Chunki JSON faqat 0 va 1 qabul qiladi",
        "Chunki Binary baholashda Rationale kerak emas",
      ],
      correctIndex: 0,
      explanationUz: "Noaniq 1–10 ballar insoniy kelishuvni pasaytirib modelga shovqin o'tkazadi; Binary mezonlar barqaror va aniqroq.",
    },
  },
  {
    id: "tr-24-agent-debugging-benchmarks",
    order: 24,
    lectureNumber: 7,
    titleUz: "24. Agent Nosozliklari, Benchmarks, Bench Maxing & Goodhart's Law",
    subtitleEn: "Lecture 7 • ReAct 3-Bosqich Debug, METR Horizon, Pareto Frontier & Eval-Driven Development",
    canonicalConceptId: "production-mlops-serving",
    estimatedMinutes: 17,
    analogyUz:
      "Imtihon savollarini oldindan yodlab olib 100 ball olgan talabaga «PT o'rniga GMT vaqtida yoz» desangiz yiqiladi — mana shu Bench Maxing! Goodhart qonuni aytganidek: o'lchov ko'rsatkichi maqsadga aylansa, u sifatni o'lchamay qo'yadi!",
    theoryParagraphsUz: [
      "Agent javob bermasa muammo 3 joydan birida bo'ladi: 1) Tool bashoratida (router toolni qo'shmadi, model yo'q toolni gallyutsinatsiya qildi, noto'g'ri tool/argument berdi -> API nomini/tavsifini tushunarli qiling yoki modelni kuchaytiring); 2) Backend bajarishida (ValueError tashlash yoki hech narsa qaytarmaslik -> har doim modelga tushunarli strukturalangan natija qaytaring); 3) Yakuniy sintezda (tool 50KB axlat qaytardi va Context Rot yuz berdi -> chiqishni ixchamlang!).",
      "Model intellekti Artificial Analysis da 4 teng bo'lakda o'lchanadi: General, Knowledge Work, Coding (Terminal Bench) va Science. Ammo ommaviy benchmarklarda modellar Bench Maxing (yodlash) qilib qolishi mumkin: Max Bench sinovida shartni atigi ozgina o'zgartirish (masalan, sanani PT dan Zulu ga yoki katta harfni kichikka o'tkazish) reytingdagi «top» modellarni qulatib yuborgan! Shu sababli ZDR (Zero Data Retention) bilan yopiq private benchmarklar, sifatni xarajatsiz solishtiruvchi Pareto Frontier va Bench Guard tekshiruvlari hamda Text Arena ishlatiladi.",
      "Xulosa tamoyili: Goodhart's Law («o'lchov nishonga aylansa, yaxshi mezon bo'lmaydi») ni eslab, Eval-Driven Development qiling: agentingiz uchun eng muhim mezonlarni ajrating va iloji boricha LLM hakamdan ko'ra aniq Heuristik/Test tekshiruvlariga tayaning!",
    ],
    keyInsightUz: {
      highlightUz: "Agent Tool xato qilganda hech qachon jim xato yoki Stack Trace tashlamang!",
      explanationUz:
        "Backend Python Exception tashlasa yoki bo'sh javob bersa, LLM «ichki xato» deb taxmin qiladi yoki gallyutsinatsiya to'qiydi. Tool doim tushunarli strukturalangan holat qaytarishi shart.",
    },
    formulaLatex: "\\text{Goodhart's Law:} \\; \\text{Measure} \\to \\text{Target} \\implies \\neg\\text{Good Measure}; \\qquad \\text{Pareto: } \\max_{\\text{cost} \\le C} \\text{Quality}",
    formulaNoteUz: "Berilgan byudjet C da eng yuqori sifat beruvchi modellar Pareto Frontier chizig'ida yotadi.",
    visualId: "benchmax-pareto",
    visualTitleUz: "Pareto Frontier, Bench Maxing Tushishi & Agent 3-Bosqich Debugger",
    pytorchSnippet: `# Pareto-optimal modellarni filtrlash (cost kamroq va quality yuqoriroq bo'lsa ustun)
models = [("FastMini", 1.0, 72), ("Overpriced", 8.0, 70), ("FrontierBest", 5.0, 91)]
pareto = [
    m for m in models
    if not any(o[1] <= m[1] and o[2] >= m[2] and (o[1] < m[1] or o[2] > m[2]) for o in models)
]
print("Pareto Frontier modellari:", pareto)`,
    exercise: {
      id: "ex-tr-24",
      titleUz: "Amaliy mashq: Modellar ro'yxatidan Pareto Frontier ni aniqlash",
      instructionsUz:
        "`pareto_front(models: list[tuple[str, float, float]]) -> list[str]` funksiyasini yozing: har bir element `(name, cost, quality)` bo'lib, undan ham arzonroq (yoki teng narxda) hamda sifatliroq (qattiy ustun) boshqa model bo'lmagan Pareto-optimal modellar nomlarini kirish tartibida qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def pareto_front(models: list[tuple[str, float, float]]) -> list[str]:
    # Dominatsiya qilinmagan (cost <= va quality >=, kamida bittasida qat'iy yaxshi) modellarni qaytaring
    pass`,
      expectedBehaviorUz: "Qimmat va past sifatli modellarni chiqarib tashlab, Pareto chegarasidagi nomlarni qaytaradi.",
      hintsUz: [
        "Agar boshqa o uchun o_cost <= m_cost and o_qual >= m_qual and (o_cost < m_cost or o_qual > m_qual) bo'lsa, m Pareto emas.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Qimmat va sifatsiz 'Overpriced' chiqib ketadi", assertionCode: "pareto_front([('Mini', 1.0, 72), ('Overpriced', 8.0, 70), ('Pro', 5.0, 91)]) == ['Mini', 'Pro']" },
        { id: "tc2", descriptionUz: "Bir xil narxda sifatlirog'i yutadi", assertionCode: "pareto_front([('A', 2.0, 80), ('B', 2.0, 85)]) == ['B']" },
      ],
      modelSolution: `def pareto_front(models: list[tuple[str, float, float]]) -> list[str]:
    result: list[str] = []
    for name, cost, qual in models:
        dominated = any(
            oc <= cost and oq >= qual and (oc < cost or oq > qual)
            for _, oc, oq in models
        )
        if not dominated:
            result.append(name)
    return result`,
      solutionExplanationUz: "Pareto Frontier narx va sifat o'rtasidagi eng samarali modellarni tanlash imkonini beradi.",
    },
    quiz: {
      questionUz: "Max Bench eksperimentida ommaviy coding benchmarklarda faqat sana formati (PT -> Zulu) o'zgartirilganda ba'zi modellarning bali keskin tushishi nimadan dalolat beradi?",
      options: [
        "Bench Maxing — model vazifani chuqur tushunmagan, balki ommaviy benchmark shablonlarini yodlab olgan bo'lishi mumkin",
        "GPU SRAM sig'imi tugagan",
        "Tokenization BPE o'chib qolgan",
      ],
      correctIndex: 0,
      explanationUz: "Kichik format o'zgarishida sifatning qulashi modelning benchmark savollariga haddan ziyod moslashib (Bench Maxing) qolganini ko'rsatadi.",
    },
  },
];

export function getTransformerLessonById(
  id: string,
): TransformerMicroLesson | undefined {
  return TRANSFORMER_CME295_LESSONS.find((l) => l.id === id);
}
