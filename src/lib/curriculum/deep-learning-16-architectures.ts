/**
 * Deep Learning: 16 Foundational Architectures & 6 Big Questions (1958 - 2023)
 *
 * Based on the historical evolutionary map of deep learning research:
 * - 16 landmark papers
 * - 16 canonical architectural schematics
 * - 6 foundational questions that shaped AI history
 */

export interface DlArchitecturePaper {
  title: string;
  authors: string;
  institution: string;
  year: number;
  citationKey: string;
  arxivOrDoiUrl?: string;
}

export type DlQuestionCategory =
  | "one_neuron"
  | "picture_vision"
  | "read_sentence"
  | "sentence_translation"
  | "all_to_all_attention"
  | "scaling_and_ssm";

export interface DlQuestionGroup {
  id: DlQuestionCategory;
  number: number;
  questionEn: string;
  questionUz: string;
  timeSpan: string;
  architectureIds: string[];
  intuitionUz: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

export interface DlArchitecture {
  id: string;
  number: number;
  name: string;
  fullNameUz: string;
  year: number;
  questionCategory: DlQuestionCategory;
  paper: DlArchitecturePaper;
  summaryUz: string;
  whyInventedUz: string;
  keyInnovationUz: string;
  formula: string;
  formulaExplanationUz: string;
  strengthsUz: string[];
  limitationsUz: string[];
  diagramType:
    | "perceptron"
    | "mlp"
    | "cnn"
    | "resnet"
    | "word_embeddings"
    | "rnn"
    | "lstm"
    | "gru"
    | "seq2seq"
    | "attention"
    | "self_attention"
    | "transformer"
    | "bert"
    | "gpt"
    | "moe"
    | "mamba";
  codeSnippet: string;
}

export const DL_QUESTION_GROUPS: readonly DlQuestionGroup[] = [
  {
    id: "one_neuron",
    number: 1,
    questionEn: "What can one neuron learn?",
    questionUz: "Bitta neyron nimani o'rgana oladi?",
    timeSpan: "1958 — 1986",
    architectureIds: ["perceptron", "mlp"],
    intuitionUz:
      "Bitta sun'iy neyron (Perceptron) faqat chiziqli ajraluvchi (AND, OR) funksiyalarni bajara oladi, lekin XOR kabi no-chiziqli mantiqni yecha olmaydi. Ko'p qatlamli tarmoq (MLP) va Backpropagation (xatolikni teskari tarqatish) bu to'siqni olib tashlab, har qanday uzluksiz funksiyani approksimatsiya qilish imkonini berdi.",
    colorScheme: {
      bg: "bg-amber-950/40",
      border: "border-amber-500/50",
      text: "text-amber-300",
      glow: "shadow-amber-500/20",
    },
  },
  {
    id: "picture_vision",
    number: 2,
    questionEn: "How do we look at a picture?",
    questionUz: "Biz rasmni qanday ko'ramiz va tahlil qilamiz?",
    timeSpan: "1998 — 2015",
    architectureIds: ["cnn", "resnet"],
    intuitionUz:
      "Rasmdagi piksellarni tekis vektorga aylantirish fazoviy munosabatlarni buzadi va milliardlab ortiqcha parametr talab qiladi. CNN konvolyutsiya filtrlari orqali tasvirdagi lokal qonuniyatlarni (chetlar, teksturalar) o'rganadi. ResNet esa qatlamlar 100 tadan oshganda gradient yo'qolishining (vanishing gradient) oldini olish uchun 'skip connection' (qoldiq bog'lanish) ixtiro qildi.",
    colorScheme: {
      bg: "bg-blue-950/40",
      border: "border-blue-500/50",
      text: "text-blue-300",
      glow: "shadow-blue-500/20",
    },
  },
  {
    id: "read_sentence",
    number: 3,
    questionEn: "How do we read a sentence?",
    questionUz: "Matn va ketma-ketliklarni qanday o'qiymiz?",
    timeSpan: "1990 — 2014",
    architectureIds: ["word_embeddings", "rnn", "lstm", "gru"],
    intuitionUz:
      "So'zlar bir vaqtda berilgan son emas, vaqt o'qi bo'ylab keladigan diskret ketma-ketlikdir. Word2Vec so'zlarni semantik ma'noga ega zich vektorlarga joylashtirdi. Elman RNN yashirin holat (hidden state) orqali vaqtinchalik xotira berdi. LSTM va GRU esa 'gate' (darvoza) mexanizmlari bilan uzoq muddatli bog'liqliklarni saqlab qolishni o'rgandi.",
    colorScheme: {
      bg: "bg-emerald-950/40",
      border: "border-emerald-500/50",
      text: "text-emerald-300",
      glow: "shadow-emerald-500/20",
    },
  },
  {
    id: "sentence_translation",
    number: 4,
    questionEn: "How do we turn one sentence into another?",
    questionUz: "Bir gapni boshqa gapga (tarjima) qanday aylantiramiz?",
    timeSpan: "2014",
    architectureIds: ["seq2seq", "attention"],
    intuitionUz:
      "Matnni boshqa tilga tarjima qilishda kirish va chiqish uzunliklari farq qiladi. Seq2Seq (Encoder-Decoder) butun gapni bitta yagona siqilgan vektorga (bottleneck) joylashtirdi, bu uzun gaplarda xotirani yo'qotardi. Bahdanau Attention esa dekoderga tarjima jarayonida enkoderning istalgan so'ziga to'g'ridan-to'g'ri 'e'tibor qaratish' imkonini berib, inqilob qildi.",
    colorScheme: {
      bg: "bg-cyan-950/40",
      border: "border-cyan-500/50",
      text: "text-cyan-300",
      glow: "shadow-cyan-500/20",
    },
  },
  {
    id: "all_to_all_attention",
    number: 5,
    questionEn: "What if every word looks at every word?",
    questionUz: "Barcha so'zlar bir vaqtda bir-biriga qarasa-chi?",
    timeSpan: "2017 — 2018",
    architectureIds: ["self_attention", "transformer", "bert", "gpt"],
    intuitionUz:
      "RNN ketma-ketlikni sekin, birma-bir o'qishi GPU da parallel hisoblashga to'sqinlik qildi. Self-Attention (Q, K, V) barcha tokenlarni bir lahzada o'zaro taqqosladi. Transformer rekursiyani butunlay olib tashladi. BERT ikki tomonlama (bidirectional) tushunishni, GPT esa avtoregressiv (causal) generatsiyani o'zlashtirib, zamonaviy LLM davrini ochdi.",
    colorScheme: {
      bg: "bg-violet-950/40",
      border: "border-violet-500/50",
      text: "text-violet-300",
      glow: "shadow-violet-500/20",
    },
  },
  {
    id: "scaling_and_ssm",
    number: 6,
    questionEn: "How do we make it bigger, and read longer?",
    questionUz: "Modelni qanday kattalashtiramiz va kontekstni uzaytiramiz?",
    timeSpan: "2017 — 2023",
    architectureIds: ["moe", "mamba"],
    intuitionUz:
      "Model parametrlarini yuzlab milliardlarga yetkazish va 1 millionlab tokenli kontekstlarni qayta ishlashda Transformerning O(N^2) kvadratik xarajati to'siq bo'ladi. Mixture of Experts (MoE) har bir token uchun faqat saralangan bir nechta ekspertni chaqirib, hisobni tejaydi. Mamba (Selective State Space Model) esa O(N) chiziqli vaqtda xotirani boshqarish orqali yangi arxitekturani taqdim etdi.",
    colorScheme: {
      bg: "bg-fuchsia-950/40",
      border: "border-fuchsia-500/50",
      text: "text-fuchsia-300",
      glow: "shadow-fuchsia-500/20",
    },
  },
];

export const SIXTEEN_ARCHITECTURES: readonly DlArchitecture[] = [
  // 1. Perceptron (1958)
  {
    id: "perceptron",
    number: 1,
    name: "Perceptron",
    fullNameUz: "Bir Qatlamli Perseptron (Rosenblatt Neyroni)",
    year: 1958,
    questionCategory: "one_neuron",
    paper: {
      title: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain",
      authors: "Frank Rosenblatt",
      institution: "Cornell Aeronautical Laboratory",
      year: 1958,
      citationKey: "Rosenblatt, 1958",
    },
    summaryUz:
      "Sun'iy intellekt tarixidagi birinchi o'rganuvchi sun'iy neyron modeli. Kiruvchi signallarni og'irliklar (weights) bilan ko'paytirib, yig'indini pog'onali (Heaviside step) aktivatsiya funksiyasidan o'tkazadi.",
    whyInventedUz:
      "Biologik miyadagi neyronlarning axborot saqlash va tanib olish qobiliyatini matematik model ko'rinishida apparatli amalga oshirish.",
    keyInnovationUz:
      "Xatolikka asoslangan og'irliklarni yangilash qoidasi: w = w + eta * (y_true - y_pred) * x.",
    formula: "y = \\Theta\\left(\\sum_{i=1}^n w_i x_i + b\\right), \\quad \\Theta(z) = \\begin{cases} 1 & z \\ge 0 \\\\ 0 & z < 0 \\end{cases}",
    formulaExplanationUz:
      "Vektorlar skalyar ko'paytmasi w^T x + b nol yoki undan katta bo'lsa neyron faollashadi (1), aks holda (0) bo'ladi.",
    strengthsUz: [
      "Chiziqli ajraluvchi masalalarda kafolatlangan yaqinlashuv (Perceptron Convergence Theorem)",
      "Oddiy va apparat darajasida juda tez hisoblanadi",
    ],
    limitationsUz: [
      "Faqat chiziqli ajraluvchi muammolarni yecha oladi (1969-yilda Minskiy va Papert XOR masalasini yecha olmasligini isbotlagan)",
      "Pog'onali funksiya hosilaga ega bo'lmagani uchun gradient descent qo'llab bo'lmaydi",
    ],
    diagramType: "perceptron",
    codeSnippet: `def perceptron_step(inputs, weights, bias):
    # inputs: [x1, x2], weights: [w1, w2]
    total = sum(x * w for x, w in zip(inputs, weights)) + bias
    return 1 if total >= 0 else 0`,
  },

  // 2. MLP (1986)
  {
    id: "mlp",
    number: 2,
    name: "MLP (Multi-Layer Perceptron)",
    fullNameUz: "Ko'p Qatlamli Perseptron va Backpropagation",
    year: 1986,
    questionCategory: "one_neuron",
    paper: {
      title: "Learning representations by back-propagating errors",
      authors: "David E. Rumelhart, Geoffrey E. Hinton, Ronald J. Williams",
      institution: "UC San Diego, Carnegie Mellon University",
      year: 1986,
      citationKey: "Rumelhart et al., 1986",
    },
    summaryUz:
      "Kirish, bir yoki bir nechta yashirin (hidden) va chiqish qatlamlaridan iborat to'liq bog'langan (dense) neyron tarmog'i. Sigmoid/ReLU orqali ixtiyoriy no-chiziqli funksiyalarni o'rgana oladi.",
    whyInventedUz:
      "Bitta neyronning XOR cheklovini yengib o'tish va ko'p qatlamli tarmoqlarning og'irliklarini zanjir qoidasi (Chain Rule) orqali avtomatik o'qitish.",
    keyInnovationUz:
      "Backpropagation (xatolikni teskari tarqatish) algoritmi orqali har bir qatlam parametriga nisbatan xatolik gradientini hisoblash.",
    formula: "h = \\sigma(W_1 x + b_1), \\quad \\hat{y} = g(W_2 h + b_2), \\quad \\frac{\\partial \\mathcal{L}}{\\partial W_1} = \\frac{\\partial \\mathcal{L}}{\\partial \\hat{y}} \\frac{\\partial \\hat{y}}{\\partial h} \\frac{\\partial h}{\\partial W_1}",
    formulaExplanationUz:
      "Zanjir qoidasi yordamida chiqishdagi yo'qotish (loss) qatlamlar bo'ylab orqaga uzatiladi va og'irliklar yangilanadi.",
    strengthsUz: [
      "Universal Function Approximator: yetarli neyron bilan istalgan uzluksiz funksiyani ifodalay oladi",
      "Jadval ma'lumotlari (tabular data) va umumiy tasniflash uchun asosiy poydevor",
    ],
    limitationsUz: [
      "Piksellar yoki matnlar kabi fazoviy va vaqtinchalik tuzilmani hisobga olmaydi",
      "Qatlamlar chuqurlashgani sari gradient yo'qolishi (vanishing gradient) yuzaga keladi",
    ],
    diagramType: "mlp",
    codeSnippet: `import math

def mlp_forward(x, W1, b1, W2, b2):
    # Hidden layer with ReLU
    h = [max(0.0, sum(xi * w for xi, w in zip(x, col)) + b) for col, b in zip(W1, b1)]
    # Output layer
    out = [sum(hi * w for hi, w in zip(h, col)) + b for col, b in zip(W2, b2)]
    return out`,
  },

  // 3. CNN (1998)
  {
    id: "cnn",
    number: 3,
    name: "CNN (Convolutional Neural Network)",
    fullNameUz: "Konvolyutsion Neyron Tarmog'i (LeNet-5)",
    year: 1998,
    questionCategory: "picture_vision",
    paper: {
      title: "Gradient-Based Learning Applied to Document Recognition",
      authors: "Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner",
      institution: "AT&T Labs, Bell Labs",
      year: 1998,
      citationKey: "LeCun et al., 1998",
    },
    summaryUz:
      "Tasvirlar bilan ishlashga mo'ljallangan arxitektura. Konvolyutsiya filtrlari (kernels) va pooling qatlamlari orqali tasvirdan ierarxik xususiyatlarni (chetlar, burchaklar, obyekt qismlari) ajratadi.",
    whyInventedUz:
      "2D tasvirlarni to'liq bog'langan tarmoqqa uzatish fazoviy siljishlarga sezgir (translation-variant) va parametrlar soni behuda ko'p bo'lardi.",
    keyInnovationUz:
      "Lokal bog'lanish (local receptive fields) va parametr almashish (weight sharing / translation invariance).",
    formula: "S(i, j) = (I * K)(i, j) = \\sum_m \\sum_n I(i - m, j - n) K(m, n)",
    formulaExplanationUz:
      "Kichik filtr K tasvir I ustida siljib, har bir sohada skalyar ko'paytma hosil qiladi va xususiyat xaritasi (feature map) yaratadi.",
    strengthsUz: [
      "Tasvirdagi obyekt qayerda joylashishidan qat'i nazar bir xil filtr uni taniy oladi",
      "Parametrlar soni MLP ga qaraganda yuzlab barobar kam",
    ],
    limitationsUz: [
      "Juda chuqur tarmoqlarda (20+ qatlam) o'qitish barqarorligini yo'qotadi",
      "Uzoq masofali global kontekstni bitta qatlamda ushlay olmaydi",
    ],
    diagramType: "cnn",
    codeSnippet: `def conv2d_single_channel(image, kernel):
    # image: HxW, kernel: KhxKw
    ih, iw = len(image), len(image[0])
    kh, kw = len(kernel), len(kernel[0])
    out_h, out_w = ih - kh + 1, iw - kw + 1
    return [
        [sum(image[i+m][j+n] * kernel[m][n] for m in range(kh) for n in range(kw))
         for j in range(out_w)]
        for i in range(out_h)
    ]`,
  },

  // 4. ResNet (2015)
  {
    id: "resnet",
    number: 4,
    name: "ResNet (Residual Networks)",
    fullNameUz: "Qoldiq Bog'lanishli Chuqur Tarmoq (Residual Connections)",
    year: 2015,
    questionCategory: "picture_vision",
    paper: {
      title: "Deep Residual Learning for Image Recognition",
      authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
      institution: "Microsoft Research",
      year: 2015,
      citationKey: "He et al., 2015",
    },
    summaryUz:
      "Tarmoq qatlamlari ustidan to'g'ridan-to'g'ri o'tuvchi 'skip connection' (aylanma yo'l) qo'shilgan inqilobiy arxitektura. 50, 101, 152 qatlamli tarmoqlarni oson o'qitish imkonini berdi.",
    whyInventedUz:
      "20 qatlamdan keyin tarmoqlar o'qitilish tezligi pasayib, xatolik ko'payishi (degradation problem / vanishing gradient) yuzaga kelardi.",
    keyInnovationUz:
      "Qatlamlar to'g'ridan-to'g'ri H(x) ni emas, balki qoldiq funksiya F(x) = H(x) - x ni o'rganadi. Natijada chiqish y = F(x) + x bo'ladi.",
    formula: "y = \\mathcal{F}(x, \\{W_i\\}) + x, \\quad \\frac{\\partial \\mathcal{E}}{\\partial x} = \\frac{\\partial \\mathcal{E}}{\\partial y} \\left(\\frac{\\partial \\mathcal{F}}{\\partial x} + 1\\right)",
    formulaExplanationUz:
      "+ 1 hadining mavjudligi gradientlarning hech qanday to'siqsiz eng quyi qatlamlargacha o'chmasdan yetib borishini ta'minlaydi.",
    strengthsUz: [
      "Tarmoq chuqurligini 1000 qatlamgacha kengaytirish imkoniyati",
      "Zamonaviy barcha arxitekturalar (shu jumladan Transformer) ResNet skip connection'idan foydalanadi",
    ],
    limitationsUz: [
      "Ko'p kanalli feature maplar RAM/VRAM sarfini oshiradi",
      "O'lchamlar o'zgarganda 1x1 konvolyutsion proyeksiyalar talab etiladi",
    ],
    diagramType: "resnet",
    codeSnippet: `def residual_block(x, conv_weights, conv_bias):
    # F(x): convolution + activation
    fx = [max(0.0, xi * w + b) for xi, w, b in zip(x, conv_weights, conv_bias)]
    # Identity shortcut: y = F(x) + x
    return [f + orig for f, orig in zip(fx, x)]`,
  },

  // 5. Word Embeddings (2013)
  {
    id: "word_embeddings",
    number: 5,
    name: "Word Embeddings (Word2Vec)",
    fullNameUz: "So'z Vektorlari (Distributed Word Representations)",
    year: 2013,
    questionCategory: "read_sentence",
    paper: {
      title: "Efficient Estimation of Word Representations in Vector Space",
      authors: "Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean",
      institution: "Google",
      year: 2013,
      citationKey: "Mikolov et al., 2013",
    },
    summaryUz:
      "So'zlarni siyrak (sparse) one-hot vektorlar o'rniga uzluksiz, past o'lchamli zich (dense) vektor fazosiga akslantirish usuli (Skip-Gram va CBOW).",
    whyInventedUz:
      "One-hot kodlash so'zlar o'rtasidagi ma'nodoshlikni (king - man + woman = queen) ifodalay olmasdi va lug'at o'lchami ortishi bilan xotira portlardi.",
    keyInnovationUz:
      "So'zlar o'zlarining konteksti (qo'shnilari) orqali ma'no kasb etishi: semantik jihatdan yaqin so'zlar vektor fazosida bir-biriga yaqin joylashadi.",
    formula: "\\mathcal{L}_{\\text{Skip-Gram}} = \\sum_{t=1}^T \\sum_{-c \\le j \\le c, j \\ne 0} \\log P(w_{t+j} \\mid w_t), \\quad P(w_O \\mid w_I) = \\frac{\\exp(v_{w_O}'^\\top v_{w_I})}{\\sum_{w} \\exp(v_w'^\\top v_{w_I})}",
    formulaExplanationUz:
      "Berilgan markaziy so'z v_{w_I} orqali uning atrofidagi kontekst so'zlar ehtimolligini maksimal qilish o'rganiladi.",
    strengthsUz: [
      "Vektorlar arifmetikasi: vektor('qirol') - vektor('erkak') + vektor('ayol') ~ vektor('qirolicha')",
      "O'lcham 50,000 talik siyrak vektordan 300 talik ixcham zich vektorga qisqaradi",
    ],
    limitationsUz: [
      "Polisemiya (ko'p ma'noli so'zlar): masalan 'olma' so'zi meva yoki harakat bo'lishidan qat'i nazar bitta qat'iy vektorga ega",
      "Statik bo'lib, kontekstga qarab o'zgarmaydi",
    ],
    diagramType: "word_embeddings",
    codeSnippet: `class EmbeddingLookup:
    def __init__(self, vocab_size, emb_dim):
        # Weight matrix: vocab_size x emb_dim
        self.weights = [[0.1 * (i + j) for j in range(emb_dim)] for i in range(vocab_size)]

    def forward(self, token_id):
        # Direct lookup (equivalent to one_hot @ weights)
        return self.weights[token_id]`,
  },

  // 6. RNN (1990)
  {
    id: "rnn",
    number: 6,
    name: "RNN (Recurrent Neural Network)",
    fullNameUz: "Rekurrent Neyron Tarmog'i (Elman Tarmog'i)",
    year: 1990,
    questionCategory: "read_sentence",
    paper: {
      title: "Finding Structure in Time",
      authors: "Jeffrey L. Elman",
      institution: "UC San Diego",
      year: 1990,
      citationKey: "Elman, 1990",
    },
    summaryUz:
      "Vaqt bo'yicha orqaga qaytuvchi bog'lanishga ega neyron tarmog'i. Har bir qadamda yangi kirish x_t va oldingi yashirin holat h_{t-1} birlashtirilib, xotira yangilanadi.",
    whyInventedUz:
      "Ixtiyoriy uzunlikdagi matn va vaqtli qatorlarni bitta umumiy vazn matritsasi bilan ketma-ket qayta ishlash zarurati.",
    keyInnovationUz:
      "Yashirin holat (hidden state h_t) — oldingi barcha o'tgan qadamlarning siqilgan xotira ifodasi.",
    formula: "h_t = \\tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h), \\quad y_t = W_{hy} h_t + b_y",
    formulaExplanationUz:
      "Joriy kiruvchi x_t va o'tgan qadam xotirasi h_{t-1} tanh orqali yangi h_t holatiga aylantiriladi.",
    strengthsUz: [
      "Ixtiyoriy uzunlikdagi ketma-ketliklarni qabul qila oladi",
      "Vaqt bo'yicha parametrlar umumiy bo'lgani uchun model hajmi ketma-ketlik uzunligiga bog'liq emas",
    ],
    limitationsUz: [
      "Vanishing / Exploding Gradient tufayli 10-15 qadamdan naridagi ma'lumotni butunlay unutadi",
      "Ketma-ket (sequential) hisoblangani sababli GPU da parallel o'qitib bo'lmaydi",
    ],
    diagramType: "rnn",
    codeSnippet: `import math

def rnn_cell(xt, h_prev, Wxh, Whh, bh):
    raw = sum(x * w for x, w in zip(xt, Wxh)) + sum(h * w for h, w in zip(h_prev, Whh)) + bh
    return math.tanh(raw)`,
  },

  // 7. LSTM (1997)
  {
    id: "lstm",
    number: 7,
    name: "LSTM (Long Short-Term Memory)",
    fullNameUz: "Uzoq-Qisqa Muddatli Xotira Tarmog'i",
    year: 1997,
    questionCategory: "read_sentence",
    paper: {
      title: "Long Short-Term Memory",
      authors: "Sepp Hochreiter, Jürgen Schmidhuber",
      institution: "TU München, IDSIA",
      year: 1997,
      citationKey: "Hochreiter & Schmidhuber, 1997",
    },
    summaryUz:
      "RNN ning gradient yo'qolish muammosini hal qilgan afsonaviy arxitektura. O'z ichiga 'Cell State' (asosiy xotira avtomagistrali) hamda 3 ta darvozani (Forget, Input, Output) oladi.",
    whyInventedUz:
      "Klassik RNN 100+ qadamli jumlalarda boshdagi kontekstni yo'qotib qo'yishi natijasida til modellarida grammatik xatolar yuzaga kelardi.",
    keyInnovationUz:
      "Cell State ustida additiv yangilanish: axborot xotiraga qo'shiladi va eskirgani Forget gate orqali nazoratli o'chiriladi.",
    formula: "\\begin{aligned} f_t &= \\sigma(W_f [h_{t-1}, x_t] + b_f) \\\\ i_t &= \\sigma(W_i [h_{t-1}, x_t] + b_i) \\\\ c_t &= f_t \\odot c_{t-1} + i_t \\odot \\tilde{c}_t \\\\ o_t &= \\sigma(W_o [h_{t-1}, x_t] + b_o) \\\\ h_t &= o_t \\odot \\tanh(c_t) \\end{aligned}",
    formulaExplanationUz:
      "f_t — nima unutilishi kerakligini, i_t — yangi nima yozilishi kerakligini, o_t — tashqariga nima chiqarilishini boshqaradi.",
    strengthsUz: [
      "100+ qadamli uzoq vaqtli bog'liqliklarni ishonchli saqlaydi",
      "NLP, nutqni aniqlash va mashina tarjimasida 20 yil davomida SOTA standart bo'ldi",
    ],
    limitationsUz: [
      "Murakkab: har bir katakda 4 ta neyron tarmog'i mavjud (hisoblash xarajati yuqori)",
      "Hali ham ketma-ketlik bo'yicha hisoblanadi (parallelizatsiya cheklovi)",
    ],
    diagramType: "lstm",
    codeSnippet: `def lstm_cell(xt, h_prev, c_prev, f_gate, i_gate, c_cand, o_gate):
    # Cell state update: forget old + add new candidate
    c_t = f_gate * c_prev + i_gate * c_cand
    # Hidden state
    h_t = o_gate * (c_t / (1.0 + abs(c_t)))  # soft tanh approx
    return h_t, c_t`,
  },

  // 8. GRU (2014)
  {
    id: "gru",
    number: 8,
    name: "GRU (Gated Recurrent Unit)",
    fullNameUz: "Ixcham Darvozali Rekurrent Birligi",
    year: 2014,
    questionCategory: "read_sentence",
    paper: {
      title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation",
      authors: "Kyunghyun Cho et al., Yoshua Bengio",
      institution: "Université de Montréal",
      year: 2014,
      citationKey: "Cho et al., 2014",
    },
    summaryUz:
      "LSTM ning soddalashtirilgan va tezroq varianti. Alohida Cell State'ni olib tashlab, Reset va Update nomli 2 ta darvoza orqali xotirani boshqaradi.",
    whyInventedUz:
      "LSTM dagi ortiqcha parametrlarni kamaytirish, xotirani tejash va o'qitish tezligini oshirish.",
    keyInnovationUz:
      "Update gate (z_t) bir vaqtning o'zida ham forget, ham input vazifasini bajaradi: (1 - z_t) * oldingi + z_t * yangi.",
    formula: "\\begin{aligned} z_t &= \\sigma(W_z [h_{t-1}, x_t]) \\\\ r_t &= \\sigma(W_r [h_{t-1}, x_t]) \\\\ \\tilde{h}_t &= \\tanh(W [r_t \\odot h_{t-1}, x_t]) \\\\ h_t &= (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t \\end{aligned}",
    formulaExplanationUz:
      "r_t o'tgan holat qanchalik hisobga olinishini (reset), z_t esa yangi holat ulushini belgilaydi.",
    strengthsUz: [
      "LSTM ga qaraganda ~25% kamroq parametr va tezroq o'rganish",
      "Kichikroq datasetlarda LSTM bilan bir xil yoki undan yaxshiroq natija",
    ],
    limitationsUz: [
      "Ketma-ket hisoblash sababli Transformer darajasidagi masshtablashga ega emas",
    ],
    diagramType: "gru",
    codeSnippet: `def gru_cell(xt, h_prev, reset_gate, update_gate, h_cand):
    # Linear interpolation between previous and candidate state
    h_t = (1.0 - update_gate) * h_prev + update_gate * h_cand
    return h_t`,
  },

  // 9. Seq2Seq (2014)
  {
    id: "seq2seq",
    number: 9,
    name: "Seq2Seq (Sequence to Sequence)",
    fullNameUz: "Ketma-ketlikdan Ketma-ketlikka (Encoder-Decoder)",
    year: 2014,
    questionCategory: "sentence_translation",
    paper: {
      title: "Sequence to Sequence Learning with Neural Networks",
      authors: "Ilya Sutskever, Oriol Vinyals, Quoc V. Le",
      institution: "Google",
      year: 2014,
      citationKey: "Sutskever et al., 2014",
    },
    summaryUz:
      "Bir uzunlikdagi ketma-ketlikni boshqa uzunlikdagi ketma-ketlikka o'tkazuvchi arxitektura. Enkoder butun gapni o'qib bitta vektorga siqadi, Dekoder esa undan yangi gap generatsiya qiladi.",
    whyInventedUz:
      "Klassik RNN lar faqat bir xil uzunlikdagi kirish-chiqishda ishlardi; mashina tarjimasida esa 'Inglizcha (5 so'z) -> O'zbekcha (3 so'z)' bo'lishi mumkin.",
    keyInnovationUz:
      "Encoder-Decoder ajratilishi va kontekst vektori (Context Vector) orqali erkin o'lchamli tarjima.",
    formula: "v = \\text{Encoder}(x_1, \\dots, x_T), \\quad P(y_1, \\dots, y_{T'} \\mid x) = \\prod_{t=1}^{T'} P(y_t \\mid v, y_1, \\dots, y_{t-1})",
    formulaExplanationUz:
      "Enkoderning oxirgi yashirin holati v dekoderning boshlang'ich nuqtasi bo'lib xizmat qiladi.",
    strengthsUz: [
      "Turli uzunlikdagi ketma-ketliklar bilan ishlash imkoniyati",
      "Google Translate'ning neyron tarjimaga o'tishining asosi bo'ldi",
    ],
    limitationsUz: [
      "Bottleneck muammosi: 40-50 so'zdan uzun jumlalarning ma'nosi bitta kichik vektorga sig'may yo'qolardi",
    ],
    diagramType: "seq2seq",
    codeSnippet: `def seq2seq_forward(encoder_states, decoder_cell_fn, max_len=10):
    # Context bottleneck is the last encoder state
    context_vector = encoder_states[-1]
    dec_state = context_vector
    output_tokens = []
    for _ in range(max_len):
        token, dec_state = decoder_cell_fn(dec_state)
        output_tokens.append(token)
        if token == "<EOS>":
            break
    return output_tokens`,
  },

  // 10. Attention (2014)
  {
    id: "attention",
    number: 10,
    name: "Attention (Bahdanau Attention)",
    fullNameUz: "Dinamik E'tibor Mexanizmi (Additive Alignment)",
    year: 2014,
    questionCategory: "sentence_translation",
    paper: {
      title: "Neural Machine Translation by Jointly Learning to Align and Translate",
      authors: "Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio",
      institution: "Jacobs University Bremen, Université de Montréal",
      year: 2014,
      citationKey: "Bahdanau et al., 2014",
    },
    summaryUz:
      "Dekoderga butun gapni siqilgan bitta vektordan o'qish o'rniga, har bir yangi so'zni tarjima qilishda enkoderdagi eng muhim so'zlarga dinamik e'tibor (vazn) qaratish imkoniyatini berdi.",
    whyInventedUz:
      "Seq2Seq modelidagi axborot tor bo'g'izi (information bottleneck) muammosini yo'qotish.",
    keyInnovationUz:
      "Dinamik tekislangan kontekst vektori: c_i = sum_j (alpha_ij * h_j). Har bir qadamda yangi e'tibor taqsimoti hisoblanadi.",
    formula: "e_{ij} = v_a^\\top \\tanh(W_a s_{i-1} + U_a h_j), \\quad \\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_k \\exp(e_{ik})}, \\quad c_i = \\sum_j \\alpha_{ij} h_j",
    formulaExplanationUz:
      "Dekoder holati s_{i-1} va enkoder holati h_j o'rtasida muvofiqlik balli hisoblanadi va Softmax bilan ehtimollikka aylanadi.",
    strengthsUz: [
      "Uzun jumlalarda tarjima sifatining keskin oshishi",
      "Model qarorlarining shaffofligi: e'tibor matritsasi qaysi so'z qaysinisiga qarayotganini ko'rsatadi",
    ],
    limitationsUz: [
      "Hali ham ostida sekin ishlovchi RNN/LSTM tarmog'iga bog'liq edi",
    ],
    diagramType: "attention",
    codeSnippet: `import math

def compute_attention_weights(decoder_state, encoder_states):
    # Dot-product alignment scores
    scores = [sum(d * h for d, h in zip(decoder_state, enc)) for enc in encoder_states]
    max_s = max(scores)
    exps = [math.exp(s - max_s) for s in scores]
    weights = [e / sum(exps) for e in exps]
    return weights`,
  },

  // 11. Self-Attention (2017)
  {
    id: "self_attention",
    number: 11,
    name: "Self-Attention",
    fullNameUz: "O'z-o'ziga E'tibor (Scaled Dot-Product Attention)",
    year: 2017,
    questionCategory: "all_to_all_attention",
    paper: {
      title: "Attention Is All You Need",
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit et al.",
      institution: "Google Brain, Google Research",
      year: 2017,
      citationKey: "Vaswani et al., 2017",
    },
    summaryUz:
      "Ketma-ketlikdagi har bir tokenning shu ketma-ketlikdagi boshqa barcha tokenlar bilan bog'liqligini bir vaqtda hisoblaydigan mexanizm. Query (Q), Key (K) va Value (V) proyeksiyalariga asoslanadi.",
    whyInventedUz:
      "RNN larning ketma-ket (O(N)) hisoblanish zanjirini buzish va butun matn kontekstini O(1) qadamda bir-biriga bog'lash.",
    keyInnovationUz:
      "Masshtablangan skalyar ko'paytma (Scaled Dot-Product) va Multi-Head Attention.",
    formula: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V",
    formulaExplanationUz:
      "Q va K ko'paytmasi barcha so'zlar juftligi o'rtasidagi o'xshashlik matritsasini beradi, sqrt(d_k) esa gradient to'yinishini oldini oladi.",
    strengthsUz: [
      "Mukammal parallelizatsiya: butun matn matritsa ko'paytmasi sifatida bir zumda hisoblanadi",
      "Istalgan ikki token orasidagi masofa doimo 1 qadam (O(1) path length)",
    ],
    limitationsUz: [
      "Kvadratik hisoblash murakkabligi: O(N^2) vaqt va xotira talab qiladi (uzun matnlarda GPU xotirasi to'ladi)",
    ],
    diagramType: "self_attention",
    codeSnippet: `import math

def self_attention_single_head(Q, K, V):
    # Q, K, V: seq_len x d_k
    d_k = len(Q[0])
    scale = math.sqrt(d_k)
    # Compute attention scores: Q @ K.T / sqrt(d_k)
    scores = [[sum(q * k for q, k in zip(qi, kj)) / scale for kj in K] for qi in Q]
    # Softmax per row
    weights = []
    for row in scores:
        max_v = max(row)
        exps = [math.exp(v - max_v) for v in row]
        weights.append([e / sum(exps) for e in exps])
    # Weighted sum: weights @ V
    return [[sum(w * v for w, v in zip(row, col)) for col in zip(*V)] for row in weights]`,
  },

  // 12. Transformer (2017)
  {
    id: "transformer",
    number: 12,
    name: "Transformer",
    fullNameUz: "To'liq Transformer Arxitekturasi (Encoder-Decoder)",
    year: 2017,
    questionCategory: "all_to_all_attention",
    paper: {
      title: "Attention Is All You Need",
      authors: "Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin",
      institution: "Google Brain",
      year: 2017,
      citationKey: "Vaswani et al., 2017",
    },
    summaryUz:
      "Rekursiya va konvolyutsiyani butunlay chiqarib tashlagan, faqat Attention, Feed-Forward tarmoqlari, Layer Normalization va Residual connection'larga tayangan davr yaratuvchi arxitektura.",
    whyInventedUz:
      "GPU klasterlarida milliardlab tokenlar ustida cheksiz masshtablanuvchi yagona poydevor yaratish.",
    keyInnovationUz:
      "Stacked Multi-Head Self-Attention + Positional Encoding (chunki RNN yo'qligi sababli so'z tartibini qo'lda berish kerak).",
    formula: "\\text{FFN}(x) = \\max(0, x W_1 + b_1) W_2 + b_2, \\quad \\text{PE}_{(pos, 2i)} = \\sin(pos / 10000^{2i/d_{\\text{model}}})",
    formulaExplanationUz:
      "Har bir blok Self-Attention -> Add & Norm -> FFN -> Add & Norm tartibida N marta takrorlanadi.",
    strengthsUz: [
      "Barcha zamonaviy NLP, LLM, Vision (ViT) va multimodal tizimlarning umumiy asosi",
      "Masshtablash qonunlariga (Scaling Laws) mukammal buysunadi",
    ],
    limitationsUz: [
      "O(N^2) kontekst xarajatlari",
      "Katta hisoblash quvvati va ulkan datasetlar talab etadi",
    ],
    diagramType: "transformer",
    codeSnippet: `def transformer_block(x, attention_fn, ffn_fn):
    # Sub-layer 1: Self-Attention + Residual + Norm
    attn_out = attention_fn(x)
    x1 = [xi + ai for xi, ai in zip(x, attn_out)]
    # Sub-layer 2: Feed-Forward + Residual + Norm
    ffn_out = ffn_fn(x1)
    return [xi + fi for xi, fi in zip(x1, ffn_out)]`,
  },

  // 13. BERT (2018)
  {
    id: "bert",
    number: 13,
    name: "BERT",
    fullNameUz: "Ikki Tomonlama Enkoder Transformer (Bidirectional)",
    year: 2018,
    questionCategory: "all_to_all_attention",
    paper: {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
      institution: "Google AI Language",
      year: 2018,
      citationKey: "Devlin et al., 2018",
    },
    summaryUz:
      "Faqat Transformer Enkoder qatlamlaridan iborat bo'lib, jumlani bir vaqtda ham chapdan-o'ngga, ham o'ngdan-chapga o'qib chuqur ma'no ajratuvchi model.",
    whyInventedUz:
      "Avvalgi modellar so'zni faqat chapdagi kontekst bo'yicha tushunardi; matn tasniflash va savol-javobda esa to'liq ikki tomonlama kontekst zarur.",
    keyInnovationUz:
      "Masked Language Model (MLM): matndagi 15% tokenlar [MASK] qilinadi va model ularni ikki taraflama kontekstdan topishga o'rgatiladi.",
    formula: "\\mathcal{L}_{\\text{MLM}}(\\theta) = -\\sum_{i \\in \\text{masked}} \\log P(x_i \\mid \\tilde{X}; \\theta)",
    formulaExplanationUz:
      "Model niqoblangan so'zlarni tiklash jarayonida butun tilning grammatik va semantik qoidalarini o'zlashtiradi.",
    strengthsUz: [
      "Matnni tushunish, sentiment analiz, NER va qidiruvda beqiyos aniqlik",
      "Kichik o'lchamlarda ham (110M / 340M) juda yuqori samaradorlik",
    ],
    limitationsUz: [
      "Avtoregressiv matn generatsiyasini (chat/yozish) bajara olmaydi (chunki chiqish qatlamida causal mask yo'q)",
    ],
    diagramType: "bert",
    codeSnippet: `def mask_tokens(tokens, mask_token="[MASK]", mask_prob=0.15):
    # Simulated MLM masking
    masked = []
    labels = []
    for tok in tokens:
        if tok == "muhim":  # Example target
            masked.append(mask_token)
            labels.append(tok)
        else:
            masked.append(tok)
            labels.append(-100)
    return masked, labels`,
  },

  // 14. GPT (2018)
  {
    id: "gpt",
    number: 14,
    name: "GPT (Generative Pre-trained Transformer)",
    fullNameUz: "Avtoregressiv Dekoder Transformer (Causal LLM)",
    year: 2018,
    questionCategory: "all_to_all_attention",
    paper: {
      title: "Improving Language Understanding by Generative Pre-Training",
      authors: "Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever",
      institution: "OpenAI",
      year: 2018,
      citationKey: "Radford et al., 2018",
    },
    summaryUz:
      "Faqat Transformer Dekoder qatlamlaridan iborat generativ model. Sabab-oqibatli (causal mask) e'tibor orqali keyingi tokenni ketma-ket bashorat qiladi.",
    whyInventedUz:
      "Katta hajmdagi yorliqsiz matnlardan o'z-o'zini o'qitish (unsupervised pre-training) orqali barcha NLP vazifalarini bitta generativ modelda birlashtirish.",
    keyInnovationUz:
      "Causal Masked Self-Attention: har bir token faqat o'zidan oldin kelgan so'zlarga qaray oladi, kelajakdagi tokenlar ko'rinmaydi.",
    formula: "\\mathcal{L}_{\\text{Causal}}(\\theta) = -\\sum_{i=1}^n \\log P(x_i \\mid x_1, \\dots, x_{i-1}; \\theta), \\quad M_{ij} = \\begin{cases} 0 & i \\ge j \\\\ -\\infty & i < j \\end{cases}",
    formulaExplanationUz:
      "Quyi uchburchakli maska modelga keyingi so'zni generatsiya qilish imkonini beradi.",
    strengthsUz: [
      "Matn yozish, suhbatlashish, kod generatsiyasi va ijodiy vazifalarni bajarish",
      "Few-shot va in-context learning xususiyati (GPT-3/4)",
    ],
    limitationsUz: [
      "Inference paytida har bir yangi token ketma-ket chiqariladi (Memory-bound autoregressive decoding)",
      "Hallucination (mavjud bo'lmagan faktlarni to'qib chiqarish) xavfi",
    ],
    diagramType: "gpt",
    codeSnippet: `def apply_causal_mask(scores):
    # scores: N x N matrix
    N = len(scores)
    masked = []
    for i in range(N):
        row = []
        for j in range(N):
            row.append(scores[i][j] if j <= i else -1e9)
        masked.append(row)
    return masked`,
  },

  // 15. Mixture of Experts (2017)
  {
    id: "moe",
    number: 15,
    name: "Mixture of Experts (MoE)",
    fullNameUz: "Siyrak Ekspertlar Qorishmasi (Sparse MoE)",
    year: 2017,
    questionCategory: "scaling_and_ssm",
    paper: {
      title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer",
      authors: "Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis et al.",
      institution: "Google Brain",
      year: 2017,
      citationKey: "Shazeer et al., 2017",
    },
    summaryUz:
      "Standart FFN qatlami o'rniga o'nlab parallel ekspert neyron tarmoqlari va marshrutlovchi (Router / Gating network) qo'yilgan arxitektura. Har bir token uchun faqat Top-1 yoki Top-2 ekspert ishga tushadi.",
    whyInventedUz:
      "Model parametrlarini trilliongacha kattalashtirish, lekin har bir so'z uchun hisoblash (FLOPs) xarajatini kichik model darajasida saqlab qolish.",
    keyInnovationUz:
      "Siyrak marshrutlash (Sparse Top-K Gating): parametrlar ko'payadi, ammo hisob hajmi oshmaydi.",
    formula: "y = \\sum_{i \\in \\text{TopK}} G(x)_i E_i(x), \\quad G(x) = \\text{Softmax}(\\text{TopK}(H(x), k)), \\quad H(x) = x W_g + \\epsilon",
    formulaExplanationUz:
      "Router H(x) har bir tokenni eng mos k ta ekspertga (masalan 8 tadan 2 tasiga) yo'naltiradi.",
    strengthsUz: [
      "Mixtral 8x7B va DeepSeek-V3/R1 kabi zamonaviy modellarning asosiy kuchi",
      "Katta bilim sig'imi bilan birga yuqori inference tezligi",
    ],
    limitationsUz: [
      "Barcha ekspertlar VRAMda turishi kerak (RAM/VRAM sarfi katta)",
      "Routing collapse: ba'zi ekspertlar ortiqcha yuklanib, qolganlari ishlamay qolishi mumkin",
    ],
    diagramType: "moe",
    codeSnippet: `def moe_route_top2(x, router_weights, experts):
    # Compute routing logits: x @ W_g
    logits = [sum(xi * w for xi, w in zip(x, col)) for col in zip(*router_weights)]
    # Top-2 indices
    ranked = sorted(range(len(logits)), key=lambda i: logits[i], reverse=True)[:2]
    # Evaluate only selected experts
    out = [0.0] * len(x)
    for idx in ranked:
        expert_out = experts[idx](x)
        out = [o + e * 0.5 for o, e in zip(out, expert_out)]
    return out, ranked`,
  },

  // 16. Mamba (2023)
  {
    id: "mamba",
    number: 16,
    name: "Mamba (State Space Model)",
    fullNameUz: "Selektiv Holatlar Fazosi Modeli (Selective SSM / S6)",
    year: 2023,
    questionCategory: "scaling_and_ssm",
    paper: {
      title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
      authors: "Albert Gu, Tri Dao",
      institution: "Carnegie Mellon University, Princeton University",
      year: 2023,
      citationKey: "Gu & Dao, 2023",
    },
    summaryUz:
      "Transformerning O(N^2) cheklovini yenguvchi chiziqli O(N) vaqtli yangi arxitektura. Klassik uzluksiz boshqaruv nazariyasidagi State Space modelini kiruvchi ma'lumotga bog'liq dinamik parametrlar bilan boyitgan.",
    whyInventedUz:
      "Transformer 100K+ tokenli kontekstlarda xotirani portlatadi; RNN esa uzoq ma'lumotni saqlay olmaydi. Ikkalasining ustunligini birlashtirish zarur edi.",
    keyInnovationUz:
      "Selektiv holat mexanizmi (S6) va apparatga moslashtirilgan (Hardware-aware SRAM Flash Scan) parallel algoritmi.",
    formula: "h_t = \\bar{A}_t h_{t-1} + \\bar{B}_t x_t, \\quad y_t = C_t h_t, \\quad \\bar{A}_t = \\exp(\\Delta_t A), \\quad \\bar{B}_t = (\\Delta_t A)^{-1}(\\bar{A}_t - I) \\Delta_t B",
    formulaExplanationUz:
      "Delta parametrining kirishga bog'liqligi modelga qaysi ma'lumotni eslab qolish va qaysinisini o'tkazib yuborishni selektiv tanlash imkonini beradi.",
    strengthsUz: [
      "Inference paytida O(1) xotira (KV cache yo'q!) va O(N) chiziqli vaqt",
      "Millionlab tokenli uzun ketma-ketliklarni bir zumda tahlil qilish",
    ],
    limitationsUz: [
      "In-context retrieval va nusxa olish (copying) vazifalarida ba'zan Transformerdan biroz ortda qolishi mumkin",
      "Arxitektura hali yosh va optimallashtirilgan GPU yadrolari kamroq",
    ],
    diagramType: "mamba",
    codeSnippet: `def mamba_step(xt, h_prev, delta, A, B, C):
    # Selective discretization
    A_bar = 1.0 - delta * A  # Euler approx of exp(-delta * A)
    B_bar = delta * B
    # Recurrent state update (Linear time, constant memory)
    h_t = A_bar * h_prev + B_bar * xt
    # Output projection
    y_t = C * h_t
    return y_t, h_t`,
  },
];

export function getDlArchitectureById(id: string): DlArchitecture | undefined {
  return SIXTEEN_ARCHITECTURES.find((a) => a.id === id);
}

export function getDlArchitecturesByQuestion(
  questionId: DlQuestionCategory
): readonly DlArchitecture[] {
  return SIXTEEN_ARCHITECTURES.filter((a) => a.questionCategory === questionId);
}
