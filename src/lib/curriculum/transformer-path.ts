/**
 * Transformer 20-Micro-Lesson Learning Path (5 Modules • 20 Atomic Micro-Lessons).
 *
 * Implements the exact curriculum breakdown from `reja.md` and the user's specification,
 * grounded in Vaswani et al. (2017) "Attention Is All You Need" and Bahdanau et al. (2014).
 */

export interface MicroCheckpoint {
  question: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
  reviewHint: string;
  type?: "choice" | "input";
  acceptedAnswers?: readonly string[];
  inputPlaceholderUz?: string;
}

export interface AdaptiveHelpBlock {
  analogyTitle: string;
  simplerExplanation: string;
  numericWalkthrough: string;
  prerequisiteSlugs: readonly { slug: string; title: string }[];
}

export interface TransformerMicroLesson {
  id: string;
  index: number;
  moduleNumber: 1 | 2 | 3 | 4 | 5;
  moduleTitle: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  relatedSlug: string;
  intuition: string;
  visualExplanation: string;
  interactiveLab: "attention-1d" | "attention-matrix" | "function-explorer" | "neural-network";
  mathFormula: string;
  mathExplanation: string;
  codeSnippet: string;
  adaptiveHelp: AdaptiveHelpBlock;
  checkpoint: MicroCheckpoint;
}

export interface TransformerModuleGroup {
  moduleNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  lessons: readonly TransformerMicroLesson[];
}

export const TRANSFORMER_MICRO_LESSONS: readonly TransformerMicroLesson[] = [
  // =========================================================================
  // MODUL 1 — Asosiy tushunchalar (4 ta kichik dars)
  // =========================================================================
  {
    id: "tf-01-what-and-why",
    index: 1,
    moduleNumber: 1,
    moduleTitle: "Modul 1 — Asosiy tushunchalar",
    title: "Transformer nima va nima uchun kerak?",
    subtitle: "Vaswani et al. (2017) inqilobi va ketma-ketlikdan voz kechish",
    estimatedMinutes: 3,
    relatedSlug: "transformers",
    intuition:
      "2017-yilgacha matn bilan ishlovchi barcha modellar (RNN, LSTM) gapni xuddi odam harflab o‘qigandek chapdan o‘ngga bitta-bitta o‘qir edi. Transformer esa butun gapga bir vaqtning o‘zida (parallel) qaraydi va qaysi so‘z qaysi so‘z bilan bog‘liqligini Self-Attention orqali bir zumda aniqlaydi.",
    visualExplanation:
      "Ketma-ket (RNN: t₁ → t₂ → t₃) ishlash o‘rniga Transformer barcha tokenlarni matritsa sifatida qabul qilib, ularning o‘zaro bog‘lanish xaritasini bitta qadamda quradi.",
    interactiveLab: "attention-matrix",
    mathFormula: "\\text{Context}(X) = \\text{SelfAttention}(X), \\quad X \\in \\mathbb{R}^{n \\times d_{\\text{model}}}",
    mathExplanation:
      "Bu yerda n — gapdagi tokenlar soni, d_model — har bir tokenning vektor o‘lchami (masalan, 512). Barcha n ta token bitta X matritsaga jamlanib, bir vaqtda qayta ishlanadi.",
    codeSnippet: `# Transformer kirish matritsasi X: (n_tokens=4, d_model=8)
import numpy as np
X = np.random.randn(4, 8)
print("Kirish shakli (parallel):", X.shape) # (4, 8)`,
    adaptiveHelp: {
      analogyTitle: "Kutubxonada kitob o‘qish analogiyasi",
      simplerExplanation:
        "Tasavvur qiling, 100 betlik hujjatdan javob qidiryapsiz. RNN 1-betdan 100-betgacha birma-bir o‘qib chiqadi. Transformer esa 100 ta yordamchini bir vaqtda har bir betga qo‘yadi va ular o‘zaro gaplashib, 1 soniyada kerakli bog‘lanishni topadi.",
      numericWalkthrough:
        "100 ta so‘zli gapda RNN 100 ta ketma-ket qadam bajaradi. Transformer esa GPU da bitta matritsali ko‘paytirish (O(1) ketma-ket qadam) bilan barchasini hisoblaydi.",
      prerequisiteSlugs: [{ slug: "deep-learning", title: "Chuqur o‘rganish va MLP" }],
    },
    checkpoint: {
      question: "Transformer arxitekturasining RNN ga nisbatan eng katta ustunligi nimada?",
      options: [
        "Butun matnni parallel ravishda qayta ishlaydi va uzoq masofali so‘zlar bog‘lanishini yo‘qotmaydi",
        "Parametrlar soni doim 10 barobar kam bo‘ladi",
        "Matnni raqamlarga o‘girish (Embedding) talab qilinmaydi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Transformer rekurrent sikllardan voz kechib, barcha tokenlarni parallel ravishda Self-Attention orqali bog‘laydi.",
      reviewHint: "RNN ning bitta-bitta o‘qish cheklovini eslang.",
    },
  },
  {
    id: "tf-02-how-rnn-works",
    index: 2,
    moduleNumber: 1,
    moduleTitle: "Modul 1 — Asosiy tushunchalar",
    title: "RNN qanday ishlaydi?",
    subtitle: "Yashirin holat (hₜ) va ketma-ket xotira zanjiri",
    estimatedMinutes: 4,
    relatedSlug: "rnn",
    intuition:
      "Rekurrent Neyron Tarmoq (RNN) har bir yangi so‘zni o‘qiganda, oldingi so‘zlardan qolgan qisqa xulosani (yashirin holat h_{t-1}) oladi va uni yangi so‘z (x_t) bilan birlashtirib, yangi xulosa (h_t) hosil qiladi.",
    visualExplanation:
      "Vaqt qadamlari bo‘ylab h₁ → h₂ → h₃ → ... → h_t zanjiri uzatiladi. Gap uzaygan sari birinchi so‘z haqidagi axborot oxirgi qadamga yetib borguncha xiralashib ketadi.",
    interactiveLab: "function-explorer",
    mathFormula: "h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)",
    mathExplanation:
      "Har bir t-qadamda h_t ni hisoblash uchun albatta h_{t-1} tayyor bo‘lishi shart. Shu sababli 10-so‘zni hisoblash uchun 1..9-so‘zlar tugashini kutishga majburmiz.",
    codeSnippet: `import numpy as np
h = np.zeros(4) # Boshlang'ich xotira
W_hh, W_xh = np.eye(4) * 0.8, np.ones((4, 4)) * 0.2
for t in range(3):
    x_t = np.ones(4) * (t + 1)
    h = np.tanh(W_hh @ h + W_xh @ x_t)
print("3-qadamdan keyingi yashirin holat:", np.round(h, 3))`,
    adaptiveHelp: {
      analogyTitle: "Telefon o‘yini (Buzoq telefon) analogiyasi",
      simplerExplanation:
        "20 kishi qator turib, birinchi odam aytgan gapni quloqma-quloq oxirgi odamga yetkazsa, oxiriga borib gapning boshi unutib yuboriladi. RNN dagi h_t xotira ham xuddi shunday.",
      numericWalkthrough:
        "Agar har qadamda signal 0.5 ga ko‘paytirilsa, 10 qadamdan keyin 0.5^10 = 0.00097 (deyarli nol) qoladi — bu yo‘qoluvchi gradient (vanishing gradient) muammosidir.",
      prerequisiteSlugs: [{ slug: "backpropagation", title: "Backpropagation va Zanjir qoidasi" }],
    },
    checkpoint: {
      question: "Nima uchun RNN da uzoq gaplarning boshidagi ma’lumot unutilib ketadi?",
      options: [
        "Ko‘p qadamli matritsali ko‘paytirishlarda gradientlar juda kichrayib (Vanishing Gradient) ketgani uchun",
        "RNN faqat 3 ta so‘zni qabul qila olgani uchun",
        "tanh funksiyasi doim 100 dan katta qiymat qaytargani uchun",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Backpropagation Through Time (BPTT) davomida gradientlar ketma-ket ko‘paytirilib, nolga yaqinlashib qoladi.",
      reviewHint: "0.5 ni o‘z-o‘ziga 20 marta ko‘paytirsa nima bo‘lishini o‘ylab ko‘ring.",
    },
  },
  {
    id: "tf-03-what-lstm-improved",
    index: 3,
    moduleNumber: 1,
    moduleTitle: "Modul 1 — Asosiy tushunchalar",
    title: "LSTM nimani yaxshilagan?",
    subtitle: "Darvozalar (Gates) va hujayra holati (Cell State Cₜ)",
    estimatedMinutes: 4,
    relatedSlug: "rnn",
    intuition:
      "LSTM (Long Short-Term Memory) RNN ga maxsus 'magistral yo‘l' — Cell State (C_t) va 3 ta darvoza (Unutish, Kirish, Chiqish) qo‘shdi. Keraksiz ma’lumot o‘chiriladi, muhim ma’lumot esa o‘zgarmasdan uzoq masofaga olib o‘tiladi.",
    visualExplanation:
      "Sigmoid darvozalari 0 dan 1 gacha qiymat chiqaradi: 0 — 'darvozani yop (unut)', 1 — 'darvozani to‘liq och (eslab qol)'.",
    interactiveLab: "function-explorer",
    mathFormula: "C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t",
    mathExplanation:
      "E’tibor bering: C_t ni yangilashda matritsali ko‘paytirish emas, balki elementma-element qo‘shish (+) ishlatiladi. Qo‘shish amalidan hosila olinganda gradient yo‘qolib ketmaydi!",
    codeSnippet: `import numpy as np
sigmoid = lambda z: 1 / (1 + np.exp(-z))
c_prev = np.array([2.5, -1.0])
forget_gate = sigmoid(np.array([4.0, -4.0])) # [0.98, 0.02]
c_new = forget_gate * c_prev
print("Saqlangan xotira:", np.round(c_new, 3)) # 1-element saqlandi, 2-si unutildi`,
    adaptiveHelp: {
      analogyTitle: "Qayd daftarchasi va o‘chirg‘ich",
      simplerExplanation:
        "Oddiy RNN har yangi gapda butun varaqni boshidan yozadi. LSTM esa muhim faktlarni daftarda qoldirib (f_t ≈ 1), faqat eskirgan qismni o‘chirg‘ich bilan o‘chiradi (f_t ≈ 0).",
      numericWalkthrough:
        "Agar f_t = 0.99 bo‘lsa, C_{t-1} deyarli o‘zgarishsiz keyingi qadamga o‘tadi. Ammo LSTM ham baribir qadamma-qadam (ketma-ket) ishlashga majbur.",
      prerequisiteSlugs: [{ slug: "rnn", title: "RNN va LSTM" }],
    },
    checkpoint: {
      question: "LSTM yo‘qoluvchi gradient muammosini yumshatgan bo‘lsa ham, qaysi muammo saqlanib qoldi?",
      options: [
        "Ketma-ket hisoblash (t-qadam uchun t-1 ni kutish) va GPU da parallel o‘qitib bo‘lmaslik",
        "U faqat raqamlarni qabul qilib, matn bilan ishlay olmasligi",
        "Aktivatsiya funksiyasi yo‘qligi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! LSTM da ham C_t va h_t avvalgi qadamga bog‘liq bo‘lgani uchun minglab tokenli matnlarni parallel o‘qitib bo‘lmaydi.",
      reviewHint: "Ketma-ketlik (sequential bottleneck) muammosini eslang.",
    },
  },
  {
    id: "tf-04-why-parallelism-matters",
    index: 4,
    moduleNumber: 1,
    moduleTitle: "Modul 1 — Asosiy tushunchalar",
    title: "Nega parallel hisoblash muhim?",
    subtitle: "GPU arxitekturasi, O(1) ketma-ket operatsiya va zamonaviy LLM miqyosi",
    estimatedMinutes: 3,
    relatedSlug: "transformers",
    intuition:
      "Zamonaviy GPU’lar minglab kichik yadrolarga ega bo‘lib, katta matritsalarni bir vaqtda ko‘paytirish uchun yaratilgan. RNN GPU’ning 99% quvvatini kutishga majbur qilsa, Transformer barcha tokenlarni bitta matritsaga joylab, GPU’ni 100% quvvatda ishlatadi.",
    visualExplanation:
      "Jadvalda solishtiring: RNN da ketma-ket amallar soni O(n) va maksimal yo‘l uzunligi O(n). Self-Attention da esa ketma-ket amallar O(1) va istalgan ikki so‘z orasidagi masofa O(1)!",
    interactiveLab: "attention-matrix",
    mathFormula: "\\text{Max Path Length}(\\text{RNN}) = O(n), \\quad \\text{Max Path Length}(\\text{Self-Attention}) = O(1)",
    mathExplanation:
      "Vaswani et al. (2017) 1-jadvalida ko‘rsatilganidek, Self-Attention da 1-so‘z bilan 1000-so‘z to‘g‘ridan-to‘g‘ri bitta skalyar ko‘paytma orqali bog‘lanadi — orada 999 ta vositachi qadam yo‘q.",
    codeSnippet: `import numpy as np
# 512 ta tokenning barchasini bir vaqtda solishtirish:
Q = np.random.randn(512, 64)
K = np.random.randn(512, 64)
scores = Q @ K.T # Bitta matritsali ko'paytirishda 512x512 = 262,144 ta bog'lanish!
print("Attention matritsasi shakli:", scores.shape)`,
    adaptiveHelp: {
      analogyTitle: "1 ta kassa vs 100 ta o‘z-o‘ziga xizmat kassasining farqi",
      simplerExplanation:
        "RNN — bitta kassir: navbatdagi 100 mijoz bir-birini kutadi. Transformer — 100 ta parallel kassa: barcha 100 mijoz bir vaqtda xizmat oladi.",
      numericWalkthrough:
        "Trillionlab tokenli internet ma’lumotlarida GPT yoki Gemini modellarini o‘qitish faqatgina parallel matritsali hisoblash tufayli haftalar ichida amalga oshadi.",
      prerequisiteSlugs: [{ slug: "matrix-operations", title: "Chiziqli Algebra va Matritsalar" }],
    },
    checkpoint: {
      question: "Self-Attention qatlamida n ta tokendan iborat gapning 1-so‘zi va oxirgi n-so‘zi o‘rtasidagi axborot yo‘li uzunligi qancha?",
      options: [
        "O(1) — ular bevosita bir qadamda bog‘lanadi",
        "O(n) — barcha oraliq so‘zlardan o‘tishi shart",
        "O(n²) — har bir so‘zdan ikki marta o‘tadi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Q_1 va K_n vektorlari bevosita ko‘paytirilgani uchun ular orasidagi yo‘l uzunligi doim O(1) ga teng.",
      reviewHint: "Yo‘l uzunligi (path length) va umumiy hisoblash murakkabligi O(n²) ni farqlang.",
    },
  },

  // =========================================================================
  // MODUL 2 — Matnni tayyorlash (4 ta kichik dars)
  // =========================================================================
  {
    id: "tf-05-what-is-token",
    index: 5,
    moduleNumber: 2,
    moduleTitle: "Modul 2 — Matnni tayyorlash",
    title: "Token nima?",
    subtitle: "So‘zlar, bo‘laklar (Subwords / BPE) va lug‘at indekslari",
    estimatedMinutes: 3,
    relatedSlug: "tokenization",
    intuition:
      "Neyron tarmoqlar harflarni yoki so‘zlarni to‘g‘ridan-to‘g‘ri tushunmaydi. Matn avval 'token' deb ataluvchi atomik bo‘laklarga (ko‘p uchraydigan butun so‘zlar yoki qo‘shimchalar) ajratiladi va har bir tokenga lug‘atdagi tartib raqami (ID) beriladi.",
    visualExplanation:
      "Masalan, 'o‘qituvchilarimizga' so‘zi Byte-Pair Encoding (BPE) orqali ['o‘qituvchi', 'lar', 'imiz', 'ga'] kabi ma’noli bo‘laklarga ajratiladi — bu ham lug‘at hajmini kichik saqlaydi, ham notanish so‘zlar (OOV) muammosini yo‘qotadi.",
    interactiveLab: "attention-matrix",
    mathFormula: "\\text{Tokenizer}(\\text{Men kitob o'qidim}) \\rightarrow [1042, \\; 5891, \\; 3310] \\in \\{0, \\dots, |V|-1\\}^n",
    mathExplanation:
      "Bu yerda |V| — lug‘at (vocabulary) hajmi (masalan, 50,000 yoki 128,000 token). Matn n ta butun sondan iborat ketma-ketlikka aylanadi.",
    codeSnippet: `# Soddalashtirilgan lug'at va tokenizatsiya
vocab = {"<pad>": 0, "bank": 1, "daryo": 2, "qirg'og'i": 3, "da": 4}
tokens = ["bank", "daryo", "qirg'og'i", "da"]
token_ids = [vocab[t] for t in tokens]
print("Token ID lari:", token_ids) # [1, 2, 3, 4]`,
    adaptiveHelp: {
      analogyTitle: "LEGO kubiklari analogiyasi",
      simplerExplanation:
        "Har bir yangi o‘yinchoq uchun alohida yaxlit qolip yasash o‘rniga (butun so‘zlar), LEGO o‘rtacha kattalikdagi standart bo‘laklardan (subword tokenlar) istalgan murakkab shaklni yig‘adi.",
      numericWalkthrough:
        "Agar faqat harflarni olsak, gap juda uzun bo‘lib ketadi. Agar faqat butun so‘zlarni olsak, 10 millionta so‘z kerak bo‘ladi. Subword (BPE) 50,000–100,000 token bilan muvozanatni topadi.",
      prerequisiteSlugs: [{ slug: "tokenization", title: "Tokenizatsiya: BPE, WordPiece va Unigram" }],
    },
    checkpoint: {
      question: "Nima uchun zamonaviy LLM’lar matnni butun so‘zlarga emas, Subword (BPE) tokenlarga bo‘ladi?",
      options: [
        "Lug‘at hajmini cheklangan holda saqlab, kam uchraydigan va yangi so‘zlarni ham qismlardan ifodalash uchun",
        "Chunki kompyuter xotirasiga uzunligi 3 harfdan katta so‘z sig‘maydi",
        "Matematik formulalarni o‘chirib tashlash uchun",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! BPE eng ko‘p uchraydigan juftliklarni birlashtirib, o‘zak va qo‘shimchalarni samarali kodlaydi.",
      reviewHint: "O‘zbek tilidagi qo‘shimchalar ('-larimizga') qanday bo‘linishini eslang.",
    },
  },
  {
    id: "tf-06-token-to-embedding",
    index: 6,
    moduleNumber: 2,
    moduleTitle: "Modul 2 — Matnni tayyorlash",
    title: "Tokenni vektorga aylantirish — Embedding",
    subtitle: "Tartib raqamidan (ID) ma’noli ko‘p o‘lchamli koordinatalar fazosiga o‘tish",
    estimatedMinutes: 4,
    relatedSlug: "embeddings",
    intuition:
      "Token ID (masalan, 5891) shunchaki tartib raqami — u so‘zning ma’nosini bildirmaydi. Embedding jadvali har bir token ID ga d_model ta haqiqiy sondan iborat vektor (masalan, [0.12, -0.84, 0.55, ...]) beradi. Ma’nosi yaqin so‘zlarning vektorlari fazoda bir-biriga yaqin joylashadi.",
    visualExplanation:
      "Embedding matritsasi E ∈ R^{|V| × d_model} — bu ulkan qidiruv jadvali (lookup table). Token ID si i bo‘lsa, jadvalning i-qatori olinadi.",
    interactiveLab: "attention-matrix",
    mathFormula: "x_i = E[\\text{id}_i] \\cdot \\sqrt{d_{\\text{model}}}, \\quad x_i \\in \\mathbb{R}^{d_{\\text{model}}}",
    mathExplanation:
      "Transformer maqolasida (3.4-bo‘lim) olingan embedding vektori qo‘shimcha ravishda √d_model ga ko‘paytiriladi, shunda uning miqyosi Positional Encoding bilan mutanosib bo‘ladi.",
    codeSnippet: `import numpy as np
vocab_size, d_model = 10, 4
E = np.random.randn(vocab_size, d_model)
token_ids = [1, 2, 4]
X = E[token_ids] * np.sqrt(d_model)
print("Embedding matritsasi shakli:", X.shape) # (3, 4)`,
    adaptiveHelp: {
      analogyTitle: "Do‘kondagi mahsulot shtrix-kodi vs tarkib pasporti",
      simplerExplanation:
        "Token ID — bu shtrix-kod (masalan, #402). Shtrix-kodga qarab olma bilan nokning o‘xshashligini bilib bo‘lmaydi. Embedding — bu mahsulotning [shirinligi, rangi, suvli ekani, vazni] ro‘yxati bo‘lib, olma va nokning raqamlari bir-biriga juda yaqin bo‘ladi.",
      numericWalkthrough:
        "Masalan, 'Shoh' = [0.9, 0.8], 'Qirol' = [0.88, 0.79], 'Stol' = [-0.5, 0.1]. Birinchi ikki vektor fazoda yonma-yon turadi.",
      prerequisiteSlugs: [{ slug: "embeddings", title: "Embeddings: Vektorli tasvirlar" }],
    },
    checkpoint: {
      question: "Nima uchun neyron tarmoqqa token ID (masalan, 1042) ni to‘g‘ridan-to‘g‘ri berish o‘rniga Embedding vektori ishlatiladi?",
      options: [
        "Token ID lar shunchaki tasodifiy tartib raqami bo‘lib, semantik yaqinlikni ifodalamaydi; Embedding esa so‘z ma’nosini uzluksiz vektor fazoda ifodalaydi",
        "Chunki butun sonlarni ko‘paytirib bo‘lmaydi",
        "Embedding xotirani 100 barobar kamaytiradi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! ID=100 va ID=101 lug‘atda yonma-yon bo‘lsa ham, ma’nosi butunlay boshqa bo‘lishi mumkin. Embedding esa o‘qitiladigan xususiyatlar vektoridir.",
      reviewHint: "Shtrix-kod va mahsulot xususiyatlari farqini eslang.",
    },
  },
  {
    id: "tf-07-vectors-and-matrices",
    index: 7,
    moduleNumber: 2,
    moduleTitle: "Modul 2 — Matnni tayyorlash",
    title: "Vektor va matritsa nima?",
    subtitle: "Bitta token = Vektor, Butun gap = Matritsa, chiziqli proyeksiyalar",
    estimatedMinutes: 4,
    relatedSlug: "matrix-operations",
    intuition:
      "Bitta tokenning embeddingi — bu sonlar qatori (vektor, masalan 4 ta son). Gapdagi barcha tokenlarning vektorlarini ustma-ust taxlasak, 2 o‘lchamli jadval — matritsa (X) hosil bo‘ladi. Transformer ichidagi barcha amallar shu X matritsani vazn matritsalariga (W) ko‘paytirishdan iborat.",
    visualExplanation:
      "Agar gapda n = 3 ta token bo‘lsa va har biri d = 4 ta sondan iborat bo‘lsa, X matritsaning o‘lchami (3 × 4) bo‘ladi.",
    interactiveLab: "neural-network",
    mathFormula: "X = \\begin{bmatrix} — & x_1^T & — \\\\ — & x_2^T & — \\\\ — & x_3^T & — \\end{bmatrix} \\in \\mathbb{R}^{n \\times d_{\\text{model}}}",
    mathExplanation:
      "X matritsani W ∈ R^{d_model × d_k} matritsaga ko‘paytirganda (X · W), barcha n ta token bir vaqtning o‘zida yangi d_k o‘lchamli fazoga proyeksiyalanadi.",
    codeSnippet: `import numpy as np
X = np.array([
    [1.0, 0.5, -0.2, 0.8], # 1-token vektori
    [0.2, 1.2,  0.4, 0.1], # 2-token vektori
    [0.9, 0.1, -0.5, 0.7], # 3-token vektori
])
W = np.random.randn(4, 2) # (d_model=4, d_k=2)
projected = X @ W
print("Proyeksiya shakli:", projected.shape) # (3, 2)`,
    adaptiveHelp: {
      analogyTitle: "Sinf jurnali (Jadval) analogiyasi",
      simplerExplanation:
        "Bitta o‘quvchining fanlardan olgan baholari — bu vektor. Butun sinfdagi 30 ta o‘quvchining baholari yozilgan jadval — bu matritsa.",
      numericWalkthrough:
        "(3 × 4) o‘lchamli matritsani (4 × 2) o‘lchamli matritsaga ko‘paytirsak, ichki o‘lchamlar (4 va 4) qisqarib, natija (3 × 2) bo‘ladi.",
      prerequisiteSlugs: [{ slug: "matrix-operations", title: "Chiziqli Algebra: Vektorlar va Matritsalar" }],
    },
    checkpoint: {
      question: "Agar gapda 5 ta token bo‘lsa va har bir tokenning embedding o‘lchami 64 bo‘lsa, X kirish matritsasining o‘lchami qanday bo‘ladi?",
      options: ["5 × 64", "64 × 64", "5 × 5"],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Har bir qator bitta tokenni ifodalaydi (5 ta qator), har bir ustun esa embedding xususiyatini (64 ta ustun).",
      reviewHint: "Qatorlar soni = tokenlar soni (n), ustunlar soni = vektor o‘lchami (d).",
    },
  },
  {
    id: "tf-08-positional-encoding",
    index: 8,
    moduleNumber: 2,
    moduleTitle: "Modul 2 — Matnni tayyorlash",
    title: "Positional Encoding nima uchun kerak?",
    subtitle: "So‘z tartibini sinus va kosinus to‘lqinlari orqali vektorga muhrlash",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Transformer barcha so‘zlarga bir vaqtda qaragani uchun, u so‘zlarning tartibini bilmaydi ('It odamni tishladi' va 'Odam itni tishladi' bir xil to‘plam bo‘lib ko‘rinadi). Шу sababli har bir tokenning embedding vektoriga uning gapdagi o‘rnini bildiruvchi maxsus 'pozitsiya imzosi' — Positional Encoding qo‘shiladi.",
    visualExplanation:
      "Turli chastotali sin va cos funksiyalari har bir pozitsiya (pos = 0, 1, 2...) uchun noyob to‘lqin kombinatsiyasini beradi va modelga tokenlar orasidagi nisbiy masofani (pos + k) chiziqli hisoblash imkonini yaratadi.",
    interactiveLab: "function-explorer",
    mathFormula: "PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right), \\quad PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d_{\\text{model}}}}\\right)",
    mathExplanation:
      "Juft indekslar (2i) uchun sinus, toq indekslar (2i+1) uchun kosinus ishlatiladi. Yakuniy kirish: X_final = Embedding(X) + PE.",
    codeSnippet: `import numpy as np
def positional_encoding(seq_len, d_model):
    pos = np.arange(seq_len)[:, None]
    i = np.arange(0, d_model, 2)[None, :]
    angle_rates = 1 / np.power(10000.0, i / d_model)
    pe = np.zeros((seq_len, d_model))
    pe[:, 0::2] = np.sin(pos * angle_rates)
    pe[:, 1::2] = np.cos(pos * angle_rates)
    return pe

print("PE shakli (4 token, d=6):", np.round(positional_encoding(4, 6), 2))`,
    adaptiveHelp: {
      analogyTitle: "Konvert ustidagi vaqt shtampi (muhri)",
      simplerExplanation:
        "Agar sizga 10 ta xat bir vaqtda qutida kelsa, qaysi biri oldin yozilganini bilmaysiz. Positional Encoding — har bir xatning ustiga bosilgan sana va soat shtampidir.",
      numericWalkthrough:
        "Nima uchun oddiy 1, 2, 3, 1000 sonlarini qo‘shmaymiz? Chunki 1000 soni embedding qiymatlarini (-1..+1) butunlay bosib ketadi. Sin va Cos esa doim [-1, +1] oralig‘ida qoladi!",
      prerequisiteSlugs: [{ slug: "transformers", title: "Transformer va Positional Encoding" }],
    },
    checkpoint: {
      question: "Agar Transformer modelidan Positional Encoding olib tashlansa nima sodir bo‘ladi?",
      options: [
        "Model gapdagi so‘zlar o‘rnini (tartibini) farqlay olmay qoladi ('xaltadagi so‘zlar' kabi ko‘radi)",
        "Model faqat bitta so‘zni o‘qiy oladi",
        "Softmax vaznlari manfiy bo‘lib qoladi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Self-Attention o‘rin almashtirishga nisbatan invariant (permutation-equivariant) bo‘lgani uchun pozitsiya signali bo‘lmasa tartibni bilmaydi.",
      reviewHint: "'It odamni tishladi' vs 'Odam itni tishladi' misolini eslang.",
    },
  },

  // =========================================================================
  // MODUL 3 — Self-Attention (6 ta kichik dars)
  // =========================================================================
  {
    id: "tf-09-attention-concept",
    index: 9,
    moduleNumber: 3,
    moduleTitle: "Modul 3 — Self-Attention",
    title: "Attention tushunchasi",
    subtitle: "So‘zning ma’nosini kontekstdagi boshqa so‘zlarga qarab aniqlash",
    estimatedMinutes: 3,
    relatedSlug: "transformers",
    intuition:
      "'Bank daryo qirg‘og‘ida joylashgan' gapidagi 'Bank' so‘zi moliya muassasasimi yoki qirg‘oqmi? Inson buni bilish uchun 'daryo' va 'qirg‘og‘ida' so‘zlariga diqqat (attention) qaratadi. Self-Attention xuddi shu ishni matematik ravishda bajaradi: har bir so‘z gapdagi barcha boshqa so‘zlarga qarab o‘z ma’nosini boyitadi.",
    visualExplanation:
      "Quyidagi interaktiv laboratoriyada 'Ko‘p Tokenli Matritsa' rejimiga o‘ting va 'Bank' qatorini bosing: uning 'daryo' va 'qirg‘og‘ida' so‘zlariga yuqori foizli e’tibor qaratishini ko‘rasiz.",
    interactiveLab: "attention-matrix",
    mathFormula: "z_i = \\sum_{j=1}^{n} \\alpha_{ij} v_j, \\quad \\sum_{j=1}^{n} \\alpha_{ij} = 1, \\; \\alpha_{ij} \\ge 0",
    mathExplanation:
      "Har bir i-tokenning yangi kontekstual vektori z_i — gapdagi barcha j-tokenlar qiymatlarining (v_j) e’tibor vaznlari (α_{ij}) bo‘yicha olingan vaznli o‘rtachasidir.",
    codeSnippet: `# 'Bank' tokeni uchun kontekstual yig'indi
weights = [0.20, 0.45, 0.30, 0.05] # [Bank, daryo, qirg'og'ida, joylashgan]
print("Vaznlar yig'indisi:", sum(weights)) # 1.0 (100%)`,
    adaptiveHelp: {
      analogyTitle: "Detektivning guvohlarni so‘roq qilishi",
      simplerExplanation:
        "Bitta so‘z (Detektiv) o‘z vaziyatini tushunish uchun xonadagi barcha boshqa so‘zlardan (guvohlardan) ma’lumot so‘raydi. Eng aloqador guvohning gapiga 70% e’tibor beradi, aloqasiziga esa 2%.",
      numericWalkthrough:
        "Barcha e’tibor vaznlari (foizlari) qo‘shilganda doim 100% (1.0) chiqadi.",
      prerequisiteSlugs: [{ slug: "rnn", title: "RNN va Ketma-ketlik modellari" }],
    },
    checkpoint: {
      question: "Self-Attention mexanizmining asosiy vazifasi nima?",
      options: [
        "Har bir tokenning vektorini shu gapdagi boshqa aloqador tokenlar axboroti bilan boyitish (kontekstuallashtirish)",
        "Gapdagi so‘zlar sonini 2 barobar kamaytirish",
        "Matnni boshqa tilga lug‘at orqali so‘zma-so‘z almashtirish",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Statik embedding har doim bir xil bo‘lsa, Self-Attention chiqishi kontekstga qarab o‘zgaradi.",
      reviewHint: "'Bank' so‘zining daryo yoki pul kontekstidagi farqini eslang.",
    },
  },
  {
    id: "tf-10-query-key-value",
    index: 10,
    moduleNumber: 3,
    moduleTitle: "Modul 3 — Self-Attention",
    title: "Query, Key va Value",
    subtitle: "Har bir tokenning 3 xil roli: So‘rov (Q), Yorliq (K) va Mazmun (V)",
    estimatedMinutes: 5,
    relatedSlug: "transformers",
    intuition:
      "Nega bitta x_i vektorning o‘zini ishlatmasdan, undan 3 ta: Query (Q), Key (K) va Value (V) vektorlarini yasaymiz? Chunki 'Men nimani qidiryapman?' (Query), 'Menda nima borligini qanday e’lon qilaman?' (Key) va 'Agar menga e’tibor qaratsang, senga qanday ma’lumot beraman?' (Value) — bular uchta turli vazifadir!",
    visualExplanation:
      "Quyidagi 1D Mini-Laboratoriyada Query (Q) slayderini surib ko‘ring: Q o‘zgarganda Token A (K=1, V=2) va Token B (K=2, V=6) ga beriladigan vazn qanday o‘zgarishini bevosita sinab ko‘rasiz.",
    interactiveLab: "attention-1d",
    mathFormula: "Q = X W^Q, \\quad K = X W^K, \\quad V = X W^V",
    mathExplanation:
      "W^Q, W^K ∈ R^{d_model × d_k} va W^V ∈ R^{d_model × d_v} — model mashg‘ulot (training) paytida o‘rganadigan uchta mustaqil vazn matritsasidir.",
    codeSnippet: `import numpy as np
x = np.array([1.0, 0.5]) # Bitta token embeddingi
W_Q = np.array([[0.8, 0.2], [0.4, 0.9]])
W_K = np.array([[0.5, 0.7], [1.0, 0.1]])
W_V = np.array([[2.0, 0.0], [0.0, 6.0]])
q, k, v = x @ W_Q, x @ W_K, x @ W_V
print("Q:", q, "K:", k, "V:", v)`,
    adaptiveHelp: {
      analogyTitle: "YouTube qidiruvi analogiyasi",
      simplerExplanation:
        "1) Query (Q) — siz qidiruv satriga yozgan matn ('Python darsi'). 2) Key (K) — videolarning sarlavhasi va teglari. 3) Value (V) — videoning ichidagi haqiqiy kadrlar va ovoz. Tizim Q ni K bilan solishtiradi va eng mos kelgan V (videoni) sizga ko‘rsatadi!",
      numericWalkthrough:
        "Mini-laboratoriyada Q = 1.0 bo‘lganda: Token A (K=1) bilan moslik 1×1=1, Token B (K=2) bilan moslik 1×2=2. Shuning uchun Token B ko‘proq (73.1%) ulush oladi.",
      prerequisiteSlugs: [{ slug: "matrix-operations", title: "Chiziqli Algebra va Proyeksiyalar" }],
    },
    checkpoint: {
      question: "Self-Attention da e’tibor (moslik) ballarini hisoblash uchun qaysi ikkita vektor bir-biriga ko‘paytiriladi?",
      options: [
        "Query (Q) va Key (K)",
        "Query (Q) va Value (V)",
        "Key (K) va Value (V)",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Avval Q va K ko‘paytirilib moslik balli topiladi, Value (V) esa eng oxirgi bosqichda vaznlar bilan ko‘paytiriladi.",
      reviewHint: "Qidiruv so‘rovi (Query) sarlavha/yorliq (Key) bilan solishtirilishini eslang.",
    },
  },
  {
    id: "tf-11-dot-product-similarity",
    index: 11,
    moduleNumber: 3,
    moduleTitle: "Modul 3 — Self-Attention",
    title: "Dot Product va similarity",
    subtitle: "Ikki vektor bir-biriga qanchalik o‘xshashligini bitta ko‘paytma bilan o‘lchash",
    estimatedMinutes: 4,
    relatedSlug: "matrix-operations",
    intuition:
      "Query (q_i) va Key (k_j) vektorlari mos kelishini qanday o‘lchaymiz? Skalyar ko‘paytma (Dot Product) orqali! Agar ikki vektor bir xil yo‘nalishga qaragan bo‘lsa, ularning mos koordinatalari ko‘paytmasi katta musbat son chiqadi. Agar qarama-qarshi bo‘lsa — manfiy son.",
    visualExplanation:
      "1D Mini-Laboratoriyada Q ni manfiy (-2.0) qilib ko‘ring: endi K=1 bo‘lgan Token A ning balli (-2) K=2 bo‘lgan Token B ning ballidan (-4) kattaroq bo‘lib, Token A ustunlikka o‘tadi!",
    interactiveLab: "attention-1d",
    mathFormula: "\\text{score}(q_i, k_j) = q_i \\cdot k_j = \\sum_{m=1}^{d_k} q_{i,m} k_{j,m} = \\|q_i\\| \\|k_j\\| \\cos(\\theta)",
    mathExplanation:
      "Barcha tokenlar uchun buni matritsa ko‘rinishida yozsak: S = Q K^T. Bu bitta matritsali ko‘paytirishda har bir token juftligi uchun moslik ballarini beradi.",
    codeSnippet: `import numpy as np
q = np.array([1.0, 2.0])
k_A = np.array([1.0, 2.0])  # q bilan bir xil yo'nalishda
k_B = np.array([-1.0, 0.5]) # boshqa yo'nalishda
print("Score A:", np.dot(q, k_A)) # 5.0 (yuqori moslik)
print("Score B:", np.dot(q, k_B)) # 0.0 (ortogonal)`,
    adaptiveHelp: {
      analogyTitle: "Qiziqishlar anketasi",
      simplerExplanation:
        "Ikki kishi [Matematika, Musiqa] ga qiziqishini -1 dan +1 gacha baholadi. Agar ikkalasi ham [+1, +1] desa, ko‘paytmalar yig‘indisi 1×1 + 1×1 = +2 (do‘st!). Agar biri [+1, +1], ikkinchisi [-1, -1] desa, natija -2.",
      numericWalkthrough:
        "1D holatda (d_k = 1): Q = 1.0, K_A = 1.0 -> score_A = 1.0. K_B = 2.0 -> score_B = 2.0.",
      prerequisiteSlugs: [{ slug: "vector", title: "Skalyar ko‘paytma va Vektorlar" }],
    },
    checkpoint: {
      question: "Agar q = [2, 1] va k = [3, -1] bo‘lsa, ularning Dot Product (q · k) moslik balli nechaga teng?",
      options: ["5", "6", "4"],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! q · k = (2 × 3) + (1 × -1) = 6 - 1 = 5.",
      reviewHint: "Mos koordinatalarni ko‘paytirib, natijalarni qo‘shing: 2*3 + 1*(-1).",
    },
  },
  {
    id: "tf-12-scaling-sqrt-dk",
    index: 12,
    moduleNumber: 3,
    moduleTitle: "Modul 3 — Self-Attention",
    title: "Scaling va √dₖ",
    subtitle: "Nima uchun Dot Product natijasini √dₖ ga bo‘lish hayotiy zarur?",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Vektor o‘lchami d_k katta bo‘lganda (masalan, d_k = 64), 64 ta ko‘paytmaning yig‘indisi juda katta sonlarga (+25 yoki -25 ga) aylanib ketadi. Bunday katta sonlar Softmax ga kirsa, bitta token 99.9999% olib, qolganlari 0% ga tushib qoladi va gradientlar 0 bo‘lib, model o‘qishdan to‘xtaydi! √d_k ga bo‘lish dispersiyani qaytadan 1 ga tushiradi.",
    visualExplanation:
      "Mini-laboratoriyaning 'Ko‘p Tokenli Matritsa' tabiga o‘tib, d_k ni 64 ga qo‘ying va '√dₖ Scaling' tugmasini o‘chirib-yoqib ko‘ring: scaling yoqilganda vaznlar muvozanatli bo‘lishini ko‘rasiz.",
    interactiveLab: "attention-matrix",
    mathFormula: "\\text{Var}(q \\cdot k) = d_k \\implies \\text{Var}\\!\\left(\\frac{q \\cdot k}{\\sqrt{d_k}}\\right) = \\frac{d_k}{(\\sqrt{d_k})^2} = 1",
    mathExplanation:
      "Agar q_i va k_i o‘rtacha qiymati 0 va dispersiyasi 1 bo‘lgan mustaqil tasodifiy miqdorlar bo‘lsa, ularning d_k ta ko‘paytmasi yig‘indisining dispersiyasi d_k ga teng bo‘ladi. √d_k ga bo‘lish standart chetlanishni 1 ga qaytaradi.",
    codeSnippet: `import numpy as np
np.random.seed(42)
d_k = 64
Q, K = np.random.randn(100, d_k), np.random.randn(100, d_k)
raw_scores = Q @ K.T
scaled_scores = raw_scores / np.sqrt(d_k)
print("Raw std:", round(raw_scores.std(), 2))       # ~8.0 (sqrt(64))
print("Scaled std:", round(scaled_scores.std(), 2)) # ~1.0`,
    adaptiveHelp: {
      analogyTitle: "Ovoz kuchaytirgichni (Volume) me’yorga tushirish",
      simplerExplanation:
        "64 kishi bir vaqtda mikrofonga gapirsa, ovoz juda baland bo‘lib dinamik xirillab qoladi (to‘yinish / saturation). √64 = 8 ga bo‘lish ovozni yana toza eshitiladigan me’yorga tushiradi.",
      numericWalkthrough:
        "Masalan, e^20 / (e^20 + e^10) = 0.99995 (deyarli 1.0, hosilasi ~0). 8 ga bo‘lsak: e^2.5 / (e^2.5 + e^1.25) = 0.777 (sog‘lom gradient!).",
      prerequisiteSlugs: [{ slug: "standard-deviation", title: "Dispersiya va Standart chetlanish" }],
    },
    checkpoint: {
      question: "Agar d_k = 64 bo‘lsa, Scaled Dot-Product Attention formulasida QK^T natijasi nechaga bo‘linadi?",
      options: ["8 ga (chunki √64 = 8)", "64 ga", "2 ga"],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! √d_k = √64 = 8 ga bo‘linadi, shunda dispersiya d_k / (√d_k)² = 64 / 64 = 1 bo‘ladi.",
      reviewHint: "Formuladagi ildiz ostida d_k (√d_k) ifodasiga e’tibor bering.",
    },
  },
  {
    id: "tf-13-softmax-attention-weights",
    index: 13,
    moduleNumber: 3,
    moduleTitle: "Modul 3 — Self-Attention",
    title: "Softmax va attention weights",
    subtitle: "Xom moslik ballarini 0% dan 100% gacha bo‘lgan ehtimollik vaznlariga aylantirish",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Dot product natijasida manfiy yoki katta sonlar chiqishi mumkin (masalan, 1.0 va 2.0). Ularni to‘g‘ridan-to‘g‘ri ulush sifatida ishlatib bo‘lmaydi. Softmax funksiyasi har bir sonni e^x darajasiga ko‘tarib (musbat qiladi) va ularning yig‘indisiga bo‘ladi — natijada yig‘indisi aniq 1.0 (100%) ga teng bo‘lgan ulushlar hosil bo‘ladi.",
    visualExplanation:
      "1D Mini-Laboratoriyada Q = 1.0 bo‘lganda: Score A = 1.0, Score B = 2.0. e¹ ≈ 2.718, e² ≈ 7.389. Jami = 10.107. Demak: Weight A = 2.718 / 10.107 = 26.9%, Weight B = 7.389 / 10.107 = 73.1%!",
    interactiveLab: "attention-1d",
    mathFormula: "\\alpha_{ij} = \\text{softmax}(s_i)_j = \\frac{\\exp(s_{ij})}{\\sum_{m=1}^{n} \\exp(s_{im})}",
    mathExplanation:
      "Eksponenta (e^x) funksiyasi katta ballarni yanada ajratib ko‘rsatadi, kichik yoki manfiy ballarni esa 0 ga yaqinlashtiradi, lekin hech qachon mutlaq 0 qilmaydi (differensiallanuvchanlik saqlanadi).",
    codeSnippet: `import numpy as np
scores = np.array([1.0, 2.0])
exp_s = np.exp(scores) # [2.71828, 7.38906]
weights = exp_s / np.sum(exp_s)
print("Token A vazni:", f"{weights[0]*100:.1f}%") # 26.9%
print("Token B vazni:", f"{weights[1]*100:.1f}%") # 73.1%`,
    adaptiveHelp: {
      analogyTitle: "Pirogni ballarga qarab bo‘lishish",
      simplerExplanation:
        "Ikkita ishtirokchi musobaqada 1 va 2 ball oldi. Softmax ularga pirogning 26.9% va 73.1% qismini beradi — jami pirog doim 100% ga teng bo‘ladi.",
      numericWalkthrough:
        "Agar Q = 0 bo‘lsa, Score A = 0, Score B = 0. e^0 = 1. Vaznlar: 1/(1+1) = 50% va 50%. Slayderni 0.0 ga qo‘yib buni tekshirib ko‘ring!",
      prerequisiteSlugs: [{ slug: "probability", title: "Softmax va Ehtimollik taqsimoti" }],
    },
    checkpoint: {
      question: "1D Mini-Laboratoriyada Query Q = 1.0, Token A (K=1) va Token B (K=2) bo‘lganda Softmax vaznlari qanday taqsimlanadi?",
      options: [
        "Token A ≈ 26.9%, Token B ≈ 73.1%",
        "Token A = 50.0%, Token B = 50.0%",
        "Token A = 33.3%, Token B = 66.7%",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! e¹ / (e¹ + e²) ≈ 0.2689 (26.9%) va e² / (e¹ + e²) ≈ 0.7311 (73.1%).",
      reviewHint: "Yuqoridagi 1D Mini-Laboratoriyada Q = 1.0 qiymatini tekshirib ko‘ring.",
    },
  },
  {
    id: "tf-14-weighted-sum-of-values",
    index: 14,
    moduleNumber: 3,
    moduleTitle: "Modul 3 — Self-Attention",
    title: "Value'larning vaznli yig‘indisi",
    subtitle: "Softmax foizlarini Value (V) qiymatlariga ko‘paytirib yakuniy natijani olish",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Biz har bir tokenga qancha e’tibor berishni (vaznlarni) topdik: Token A ga 26.9%, Token B ga 73.1%. Endi har bir tokenning haqiqiy mazmunini — Value (V) qiymatini o‘z vazniga ko‘paytiramiz va qo‘shamiz. Natijada ko‘proq e’tibor olgan tokenning mazmuni yakuniy natijada ko‘proq aks etadi!",
    visualExplanation:
      "1D Mini-Laboratoriyada: V_A = 2, V_B = 6. Natija = 2 × 0.2689 + 6 × 0.7311 = 0.538 + 4.386 = 4.924! Q slayderini o‘ngga sursangiz natija 6.0 ga yaqinlashadi, chapga sursangiz 2.0 ga yaqinlashadi.",
    interactiveLab: "attention-1d",
    mathFormula: "\\text{Output} = \\sum_{j=1}^{n} w_j V_j = w_A V_A + w_B V_B = 0.2689 \\times 2 + 0.7311 \\times 6 = 4.924",
    mathExplanation:
      "Matritsa ko‘rinishida barcha tokenlar uchun bir vaqtda: Z = W · V, bu yerda W ∈ R^{n × n} — Softmax vaznlari matritsasi, V ∈ R^{n × d_v} — Value matritsasi.",
    codeSnippet: `import numpy as np
weights = np.array([0.26894142, 0.73105858])
V = np.array([2.0, 6.0])
output = np.sum(weights * V)
print("Yakuniy Attention natijasi:", round(output, 3)) # 4.924`,
    adaptiveHelp: {
      analogyTitle: "Bo‘yoqlarni foiz bo‘yicha aralashtirish",
      simplerExplanation:
        "Token A — oq bo‘yoq (V=2), Token B — to‘q ko‘k bo‘yoq (V=6). Agar idishga 26.9% A va 73.1% B quysangiz, aralashmaning rangi to‘q ko‘kka yaqinroq (4.924) chiqadi.",
      numericWalkthrough:
        "E’tibor bering: yakuniy natija (4.924) har doim eng kichik V (2.0) va eng katta V (6.0) oralig‘ida bo‘ladi, chunki vaznlar musbat va yig‘indisi 1 ga teng (qavariq kombinatsiya).",
      prerequisiteSlugs: [{ slug: "transformers", title: "Scaled Dot-Product Attention" }],
    },
    checkpoint: {
      question: "Agar V_A = 2, V_B = 6 bo‘lsa va Query juda katta musbat songa (masalan, Q = +10) o‘zgartirilsa, Attention natijasi qaysi songa yaqinlashadi?",
      options: [
        "6.0 ga (chunki Token B ning vazni ~100% ga yaqinlashadi)",
        "2.0 ga",
        "0.0 ga",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Q katta musbat bo‘lganda K_B = 2 > K_A = 1 bo‘lgani uchun Token B ning Softmax vazni 100% ga yaqinlashadi va natija 1.0 × 6 + 0.0 × 2 = 6.0 bo‘ladi.",
      reviewHint: "1D Mini-Laboratoriyada Q slayderini +4.0 ga surib natijani kuzating!",
    },
  },

  // =========================================================================
  // MODUL 4 — Transformer ichki tuzilishi (3 ta kichik dars)
  // =========================================================================
  {
    id: "tf-15-multi-head-attention",
    index: 15,
    moduleNumber: 4,
    moduleTitle: "Modul 4 — Transformer ichki tuzilishi",
    title: "Multi-Head Attention",
    subtitle: "Bitta emas, h = 8 ta mustaqil 'nigoh' bilan turli munosabatlarni tutish",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Gapni tahlil qilayotganda bitta so‘z bir vaqtning o‘zida bir nechta jihatga bog‘liq bo‘ladi: 1-kallak (head) sintaktik egasi kimligini qidirsa, 2-kallak fe’lning zamonini, 3-kallak esa olmosh qaysi otga tegishli ekanini qidiradi. Multi-Head Attention d_model o‘lchamni h ta kichik fazoga bo‘lib, har birida mustaqil Attention hisoblaydi.",
    visualExplanation:
      "Asl maqolada d_model = 512 va h = 8 ta kallak ishlatiladi. Demak har bir kallak o‘lchami d_k = d_v = 512 / 8 = 64. Oxirida 8 ta kallak natijalari yonma-yon ulanib (Concat), W^O ga ko‘paytiriladi.",
    interactiveLab: "attention-matrix",
    mathFormula: "\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O, \\quad \\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)",
    mathExplanation:
      "d_k = d_model / h bo‘lgani uchun 8 ta kallakning umumiy hisoblash qiymati to‘liq o‘lchamli bitta kallaknikiga deyarli teng!",
    codeSnippet: `import numpy as np
d_model, num_heads = 512, 8
d_k = d_model // num_heads # 64
heads_out = [np.random.randn(4, d_k) for _ in range(num_heads)]
concat_heads = np.concatenate(heads_out, axis=-1) # (4, 512)
W_O = np.random.randn(d_model, d_model)
mha_out = concat_heads @ W_O
print("Multi-Head natija shakli:", mha_out.shape) # (4, 512)`,
    adaptiveHelp: {
      analogyTitle: "Kino tanqidchilari hay’ati",
      simplerExplanation:
        "Bitta filmni 1 kishi baholasa faqat syujetga qarashi mumkin. 8 ta mutaxassis (rejissyor, operator, bastakor, aktyor...) bir vaqtda ko‘rsa, har biri o‘z sohasi bo‘yicha xulosa beradi va yakunda mukammal tahlil chiqadi.",
      numericWalkthrough:
        "Har bir head (4 × 64) matritsa qaytaradi. 8 ta head yonma-yon qo‘yilsa: 64 × 8 = 512 ustunli (4 × 512) matritsa tiklanadi.",
      prerequisiteSlugs: [{ slug: "transformers", title: "Multi-Head Attention" }],
    },
    checkpoint: {
      question: "Agar d_model = 512 va kallaklar soni h = 8 bo‘lsa, har bir attention kallagining vektor o‘lchami (d_k) nechaga teng?",
      options: ["64", "512", "4096"],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! d_k = d_model / h = 512 / 8 = 64.",
      reviewHint: "512 ni 8 ta teng bo‘lakka bo‘ling.",
    },
  },
  {
    id: "tf-16-ffn-residual-layernorm",
    index: 16,
    moduleNumber: 4,
    moduleTitle: "Modul 4 — Transformer ichki tuzilishi",
    title: "Feed-Forward, Residual va Norm",
    subtitle: "Tokenlar olgan ma’lumotni hazm qilish va gradient yo‘lini himoyalash",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Self-Attention tokenlar o‘rtasida axborot almashadi. Shundan so‘ng har bir token olgan ma’lumotini alohida 'mulohaza qilib qayta ishlashi' uchun 2 qatlamli Neyron Tarmoqdan (Position-wise FFN) o‘tadi. Qatlamlar chuqurlashganda signal yo‘qolmasligi uchun Residual Connection (x + Sublayer(x)) va LayerNorm qo‘llaniladi.",
    visualExplanation:
      "Residual ('aylanma ko‘prik') kirish x ni to‘g‘ridan-to‘g‘ri chiqishga qo‘shadi — bu Backpropagation paytida gradientlar uchun to‘siqsiz avtoban vazifasini bajaradi.",
    interactiveLab: "neural-network",
    mathFormula: "\\text{FFN}(x) = \\max(0, \\; xW_1 + b_1)W_2 + b_2, \\quad \\text{Out} = \\text{LayerNorm}(x + \\text{Sublayer}(x))",
    mathExplanation:
      "Transformer’da d_model = 512 bo‘lsa, FFN ichki qatlami d_ff = 2048 gacha kengayadi (ReLU yoki SwiGLU aktivatsiyasi bilan) va qaytadan 512 ga qisqaradi.",
    codeSnippet: `import numpy as np
def layer_norm(x, eps=1e-5):
    mean = x.mean(axis=-1, keepdims=True)
    std = x.std(axis=-1, keepdims=True)
    return (x - mean) / (std + eps)

x = np.random.randn(4, 8)
sublayer_out = np.maximum(0, x @ np.random.randn(8, 32)) @ np.random.randn(32, 8)
out = layer_norm(x + sublayer_out) # Residual + LayerNorm
print("Chiqish o'rtachasi ~0:", np.round(out.mean(axis=-1), 4))`,
    adaptiveHelp: {
      analogyTitle: "Yig‘ilish va shaxsiy xulosa",
      simplerExplanation:
        "Self-Attention — bu jamoaviy yig‘ilish (hamma bir-biri bilan fikr almashadi). FFN esa yig‘ilishdan keyin har bir xodim o‘z xonasiga kirib, eshitganlarini tahlil qilib yozib olishidir.",
      numericWalkthrough:
        "x + Sublayer(x) dan x bo‘yicha hosila olsak: 1 + d(Sublayer)/dx. Bu yerda '1' qo‘shiluvchisi gradient hech qachon 0 ga tushib qolmasligini kafolatlaydi!",
      prerequisiteSlugs: [
        { slug: "batch-normalization", title: "Normalizatsiya va Qatlam barqarorligi" },
      ],
    },
    checkpoint: {
      question: "Residual ulanish (x + Sublayer(x)) ning asosiy vazifasi nima?",
      options: [
        "Chuqur qatlamlar orqali gradientlarning yo‘qolmasdan (to‘g‘ridan-to‘g‘ri) oqib o‘tishini ta’minlash",
        "Lug‘at hajmini kamaytirish",
        "Tokenlarni alifbo tartibida saralash",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Residual aloqa tufayli 6, 32 yoki 96 qatlamli Transformerlarni barqaror o‘qitish mumkin bo‘ladi.",
      reviewHint: "f(x) + x dan hosila olinganda +1 hosil bo‘lishini eslang.",
    },
  },
  {
    id: "tf-17-encoder-decoder-masking",
    index: 17,
    moduleNumber: 4,
    moduleTitle: "Modul 4 — Transformer ichki tuzilishi",
    title: "Encoder, Decoder va Masked Attention",
    subtitle: "Matnni tushunish (Encoder) vs kelajakka qaramasdan so‘z generatsiya qilish (Decoder)",
    estimatedMinutes: 5,
    relatedSlug: "llm",
    intuition:
      "Encoder butun kirish gapni ikki tomondan (ham oldingi, ham keyingi so‘zlarni) ko‘rib tushunadi (masalan, BERT). Decoder esa javobni so‘zma-so‘z yozadi (masalan, GPT). Mashg‘ulot paytida Decoder javobni oldindan ko‘rib 'shpargalka' qilmasligi uchun kelajakdagi tokenlar ustiga Causal Mask (-∞) yopiladi!",
    visualExplanation:
      "Mini-laboratoriyaning 'Ko‘p Tokenli Matritsa' rejimida 'Decoder (Causal Mask)' tugmasini bosing: diagonalning yuqori o‘ng qismi -∞ (0%) bo‘lib yopilishini ko‘rasiz!",
    interactiveLab: "attention-matrix",
    mathFormula: "M_{ij} = \\begin{cases} 0, & \\text{agar } j \\le i \\\\ -\\infty, & \\text{agar } j > i \\end{cases}, \\quad \\text{Attention} = \\text{softmax}\\!\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right)V",
    mathExplanation:
      "j > i (kelajakdagi token) bo‘lganda ballga -∞ qo‘shiladi. Softmax ichida exp(-∞) = 0 bo‘lgani uchun i-token o‘zidan keyingi j-tokenga 0% e’tibor beradi.",
    codeSnippet: `import numpy as np
scores = np.ones((4, 4))
mask = np.triu(np.full((4, 4), -np.inf), k=1) # Yuqori uchburchak -inf
masked_scores = scores + mask
weights = np.exp(masked_scores) / np.sum(np.exp(masked_scores), axis=-1, keepdims=True)
print("Causal Masked Softmax vaznlari:\\n", np.round(weights, 2))`,
    adaptiveHelp: {
      analogyTitle: "Imtihonda javoblar varag‘ini qog‘oz bilan yopib turish",
      simplerExplanation:
        "3-so‘zni topayotganingizda faqat 1- va 2-so‘zni ko‘rishingiz mumkin, 4-so‘zning usti qora qog‘oz (Mask) bilan yopilgan bo‘ladi.",
      numericWalkthrough:
        "1-qator: [100%, 0%, 0%, 0%]. 2-qator: [50%, 50%, 0%, 0%]. 3-qator: [33.3%, 33.3%, 33.3%, 0%].",
      prerequisiteSlugs: [
        { slug: "llm", title: "Katta Til Modellari (LLM) va Decoder" },
      ],
    },
    checkpoint: {
      question: "Decoder-da Masked Self-Attention qatlamida kelajakdagi tokenlarni yopish uchun Softmax dan oldin ballarga qanday qiymat qo‘shiladi?",
      options: [
        "-∞ (minus cheksizlik), chunki e^(-∞) = 0 bo‘ladi",
        "0 (nol), chunki e^0 = 0 bo‘ladi",
        "+100, chunki katta sonlar o‘chib ketadi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Agar 0 qo‘shilsa, e^0 = 1 bo‘lib, kelajakdagi token baribir vazn olardi. -∞ qo‘shilgandagina exp(-∞) = 0 chiqadi.",
      reviewHint: "e^0 = 1 ekanini, e^(-∞) = 0 ekanini eslang!",
    },
  },

  // =========================================================================
  // MODUL 5 — Natija va amaliyot (3 ta kichik dars)
  // =========================================================================
  {
    id: "tf-18-training-vs-inference",
    index: 18,
    moduleNumber: 5,
    moduleTitle: "Modul 5 — Natija va amaliyot",
    title: "Training va inference farqi",
    subtitle: "Teacher Forcing orqali parallel o‘qitish vs Avtoregressiv ketma-ket generatsiya va KV-Cache",
    estimatedMinutes: 4,
    relatedSlug: "llm",
    intuition:
      "Mashg‘ulot (Training) paytida bizda tayyor to‘g‘ri javob matni bor — Causal Mask yordamida barcha tokenlar uchun keyingi so‘z bashoratini bitta parallel qadamda o‘qitamiz (Teacher Forcing). Ishlatish (Inference) paytida esa kelajakdagi so‘zlar hali yo‘q: model bitta so‘z chiqaradi, uni kirishga qo‘shib keyingi so‘zni chiqaradi (Autoregressive). Qayta-qayta hisoblamaslik uchun oldingi tokenlarning K va V vektorlari KV-Cache da saqlanadi!",
    visualExplanation:
      "Training = Parallel (barcha pozitsiyalar bir vaqtda). Inference = Ketma-ket (Prefill bosqichidan keyin Decode bosqichi tokenma-token davom etadi).",
    interactiveLab: "attention-matrix",
    mathFormula: "P(y_1, \\dots, y_T \\mid X) = \\prod_{t=1}^{T} P(y_t \\mid y_{<t}, X)",
    mathExplanation:
      "Avtoregressiv generatsiyada t-tokenni chiqarishda faqat yangi q_t vektori hisoblanadi, k_{1..t} va v_{1..t} esa KV-Cache xotirasidan olinadi.",
    codeSnippet: `# Avtoregressiv generatsiya va KV-Cache g'oyasi
generated = ["Men", "kitob"]
kv_cache_K, kv_cache_V = [], []
for step in range(2):
    new_token = "o'qidim" if step == 0 else "."
    generated.append(new_token)
print("Generatsiya qilingan gap:", " ".join(generated))`,
    adaptiveHelp: {
      analogyTitle: "Diktant tekshirish vs Insho yozish",
      simplerExplanation:
        "Tayyor yozilgan diktantni o‘qituvchi bir qarashda (Training) tekshiradi. Ammo o‘quvchi yangi insho yozayotganda (Inference) so‘zlarni bitta-bitta o‘ylab ketma-ket yozishga majbur.",
      numericWalkthrough:
        "KV-Cache bo‘lmasa, 1000-so‘zni yozish uchun oldingi 999 ta so‘zning K va V matritsalari qaytadan hisoblanardi (O(n²)). KV-Cache buni O(n) ga tushiradi.",
      prerequisiteSlugs: [{ slug: "llm", title: "LLM Inference va Avtoregressiya" }],
    },
    checkpoint: {
      question: "Nima uchun Transformer modelini o‘qitish (Training) to‘liq parallel bo‘la oladi, lekin matn generatsiya qilish (Inference) ketma-ket kechadi?",
      options: [
        "Chunki Training paytida to‘g‘ri matn oldindan ma’lum (Causal Mask bilan), Inference paytida esa keyingi qadam uchun avvalgi token generatsiya qilinishini kutish kerak",
        "Chunki Inference paytida GPU ishlatib bo‘lmaydi",
        "Chunki Training paytida Softmax ishlatilmaydi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! Avtoregressiv generatsiyada har bir yangi token keyingi qadamning kirishiga aylanadi.",
      reviewHint: "Teacher Forcing va Autoregressive generatsiya farqini eslang.",
    },
  },
  {
    id: "tf-19-transformer-vs-rnn-comparison",
    index: 19,
    moduleNumber: 5,
    moduleTitle: "Modul 5 — Natija va amaliyot",
    title: "Transformer va RNN taqqoslash",
    subtitle: "Murakkablik O(n² · d) vs O(n · d²), xotira va kontekst oynasi tahlili",
    estimatedMinutes: 4,
    relatedSlug: "transformers",
    intuition:
      "Transformer har doim ham RNN dan barcha ko‘rsatkichda arzonmi? Yo‘q! Odatdagi gaplarda (n < d, masalan n=512, d=4096) Self-Attention RNN dan tezroq. Ammo matn juda uzun bo‘lganda (n = 100,000 token), n × n o‘lchamli Attention matritsasi kvadratik O(n²) xotira va vaqt talab qiladi.",
    visualExplanation:
      "Muhandislik trade-off: RNN = O(n) xotira, lekin O(n) ketma-ket kutish va uzoqni unutish. Transformer = O(1) ketma-ket qadam va mukammal uzoq xotira, lekin O(n²) attention matritsasi.",
    interactiveLab: "function-explorer",
    mathFormula: "T_{\\text{Self-Attention}} = O(n^2 \\cdot d), \\qquad T_{\\text{RNN}} = O(n \\cdot d^2)",
    mathExplanation:
      "Shuning uchun zamonaviy LLM’larda O(n²) xotirani kamaytirish uchun FlashAttention, Grouped-Query Attention (GQA) va Sliding Window Attention qo‘llaniladi.",
    codeSnippet: `# n o'zgarganda n^2 * d va n * d^2 taqqoslash
d = 512
for n in [128, 512, 4096]:
    sa_ops = (n ** 2) * d
    rnn_ops = n * (d ** 2)
    print(f"n={n:4d} -> Self-Attention: {sa_ops:,} | RNN: {rnn_ops:,}")`,
    adaptiveHelp: {
      analogyTitle: "Guruhda hamma hamma bilan ko‘rishishi (Qo‘l berib so‘rashish)",
      simplerExplanation:
        "Xonada n kishi bo‘lsa va hamma bir-biri bilan qo‘l berib ko‘rishsa (Self-Attention), n × n ta ko‘rishish bo‘ladi. 10 kishida 100 ta, 1000 kishida 1,000,000 ta!",
      numericWalkthrough:
        "n = 128, d = 512 bo‘lganda Self-Attention 4 barobar kam amal bajaradi. n = 4096 bo‘lganda esa Self-Attention amallari 8 barobar ko‘payadi.",
      prerequisiteSlugs: [{ slug: "rnn", title: "RNN va Hisoblash murakkabligi" }],
    },
    checkpoint: {
      question: "Kontekst uzunligi n juda katta bo‘lganda (masalan, n = 128,000 token) standart Self-Attention ning asosiy muhandislik muammosi nima?",
      options: [
        "Tokenlar soniga nisbatan kvadratik O(n²) hisoblash va xotira murakkabligi",
        "Vanishing gradient tufayli 10-tokendan keyin xotira o‘chishi",
        "Faqat CPU da ishlashi",
      ],
      correctIndex: 0,
      explanation:
        "To‘g‘ri! n ta tokenning har biri n ta token bilan solishtirilgani uchun n × n matritsa O(n²) resurs talab qiladi.",
      reviewHint: "n kishi bir-biri bilan ko‘rishganda n × n juftlik chiqishini eslang.",
    },
  },
  {
    id: "tf-20-numpy-attention-from-scratch",
    index: 20,
    moduleNumber: 5,
    moduleTitle: "Modul 5 — Natija va amaliyot",
    title: "NumPy bilan bitta attention hisoblash",
    subtitle: "Yakuniy amaliyot: Noldan to‘liq Scaled Dot-Product Attention yozish va tekshirish",
    estimatedMinutes: 6,
    relatedSlug: "transformers",
    intuition:
      "Tabriklaymiz! Siz 19 ta qadamda Transformer va Self-Attention ning har bir g‘ishtini o‘rgandingiz. Endi hech qanday tayyor kutubxonasiz (faqat NumPy yordamida) 10 qator kod bilan to‘liq Scaled Dot-Product Attention funksiyasini yozamiz va 1D Mini-Laboratoriyadagi 4.924 natijasini hamda ko‘p o‘lchamli matritsa natijasini olamiz!",
    visualExplanation:
      "Quyidagi Mini-Laboratoriyada Q, K, V qiymatlarini o‘zgartiring va o‘ng tarafdagi NumPy kodida har bir qator qanday ishlashini kuzating.",
    interactiveLab: "attention-1d",
    mathFormula: "\\text{scaled\\_dot\\_product\\_attention}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V",
    mathExplanation:
      "4 ta aniq qadam: 1) scores = Q @ K.T / np.sqrt(d_k), 2) mask (ixtiyoriy), 3) weights = softmax(scores), 4) output = weights @ V.",
    codeSnippet: `import numpy as np

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    # 1-2. Dot product va sqrt(d_k) masshtablash
    scores = (Q @ K.T) / np.sqrt(d_k)
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)
    # 3. Numerik barqaror Softmax
    exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)
    # 4. Value'larning vaznli yig'indisi
    output = weights @ V
    return output, weights

# Mini-laboratoriya misolini tekshirish (Q=1, K=[1, 2], V=[2, 6], d_k=1):
Q = np.array([[1.0]])
K = np.array([[1.0], [2.0]])
V = np.array([[2.0], [6.0]])
out, w = scaled_dot_product_attention(Q, K, V)
print("Weights:", np.round(w * 100, 1)) # [[26.9, 73.1]] %
print("Output:", np.round(out, 3))      # [[4.924]]`,
    adaptiveHelp: {
      analogyTitle: "4 qadamli retsept",
      simplerExplanation:
        "1) Ko‘paytir (Q @ K.T), 2) Bo‘l (√d_k ga), 3) Foizga aylantir (Softmax), 4) Qiymatlarni yig‘ (weights @ V). Shu 4 qator kod ChatGPT, Claude va Gemini modellarining yuragi hisoblanadi!",
      numericWalkthrough:
        "Q = [[1.0]], K = [[1.0], [2.0]], V = [[2.0], [6.0]] kiritsangiz, funksiya aynan w = [[0.269, 0.731]] va out = [[4.924]] qaytaradi.",
      prerequisiteSlugs: [{ slug: "transformers", title: "Transformer Arxitekturasi" }],
    },
    checkpoint: {
      question: "`scaled_dot_product_attention(Q, K, V)` funksiyasida amallarning to‘g‘ri ketma-ketligi qaysi?",
      options: [
        "1) Q @ K.T  →  2) / √d_k  →  3) Softmax  →  4) @ V",
        "1) Softmax(Q)  →  2) @ V  →  3) / √d_k  →  4) @ K.T",
        "1) Q + K + V  →  2) ReLU  →  3) / d_k",
      ],
      correctIndex: 0,
      explanation:
        "Barakalla! Siz Transformer ning 20 ta mikro-darsdan iborat to‘liq kursini muvaffaqiyatli yakunladingiz!",
      reviewHint: "Attention(Q,K,V) = softmax(QK^T / √d_k)V formulasiga qarang.",
    },
  },
];

export const TRANSFORMER_MODULES: readonly TransformerModuleGroup[] = [
  {
    moduleNumber: 1,
    title: "Modul 1 — Asosiy tushunchalar",
    subtitle: "4 ta kichik dars • Transformer, RNN, LSTM va Parallelizm",
    lessons: TRANSFORMER_MICRO_LESSONS.filter((l) => l.moduleNumber === 1),
  },
  {
    moduleNumber: 2,
    title: "Modul 2 — Matnni tayyorlash",
    subtitle: "4 ta kichik dars • Token, Embedding, Matritsa va Positional Encoding",
    lessons: TRANSFORMER_MICRO_LESSONS.filter((l) => l.moduleNumber === 2),
  },
  {
    moduleNumber: 3,
    title: "Modul 3 — Self-Attention",
    subtitle: "6 ta kichik dars • Q, K, V, Dot Product, √dₖ, Softmax va Vaznli yig‘indi",
    lessons: TRANSFORMER_MICRO_LESSONS.filter((l) => l.moduleNumber === 3),
  },
  {
    moduleNumber: 4,
    title: "Modul 4 — Transformer ichki tuzilishi",
    subtitle: "3 ta kichik dars • Multi-Head, FFN/Residual/Norm, Encoder/Decoder va Masking",
    lessons: TRANSFORMER_MICRO_LESSONS.filter((l) => l.moduleNumber === 4),
  },
  {
    moduleNumber: 5,
    title: "Modul 5 — Natija va amaliyot",
    subtitle: "3 ta kichik dars • Training vs Inference, RNN taqqoslash va NumPy kod",
    lessons: TRANSFORMER_MICRO_LESSONS.filter((l) => l.moduleNumber === 5),
  },
];
