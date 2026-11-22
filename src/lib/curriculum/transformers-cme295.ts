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
  | "grpo-onpolicy-distill";

export interface TransformerLectureMeta {
  lectureNumber: 1 | 2 | 3;
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
];

export interface TransformerMicroLesson {
  id: string;
  order: number;
  lectureNumber: 1 | 2 | 3;
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
];

export function getTransformerLessonById(
  id: string,
): TransformerMicroLesson | undefined {
  return TRANSFORMER_CME295_LESSONS.find((l) => l.id === id);
}
