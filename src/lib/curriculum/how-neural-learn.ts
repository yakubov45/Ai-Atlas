/**
 * AI Atlas — "How Neural Networks Learn" (12 Interactive Micro-Lessons Module)
 *
 * Adapted and scientifically corrected from `howneyronlearn.md`.
 * Explicitly fixes 5 common beginner misconceptions:
 *  1. Perceptron rule vs gradient-based training on correct predictions (60% p -> loss > 0).
 *  2. Finite-difference numerical nudging vs analytical Chain Rule Backpropagation.
 *  3. Small Learning Rate causes slow convergence, not automatic local-minimum trapping.
 *  4. Zero input without bias gives 0 for linear/ReLU/Tanh, NOT for Sigmoid (Sigmoid(0)=0.5).
 *  5. Causal Next-Token Prediction (GPT) vs Bidirectional Masked Language Modeling (BERT).
 */

import type { PracticeExercise } from "@/lib/practice/types";

export const HOW_NEURAL_LEARN_FEATURED_VIDEO = {
  youtubeId: "uIMz7CHgshQ",
  youtubeUrl: "https://www.youtube.com/watch?v=uIMz7CHgshQ",
  embedUrl: "https://www.youtube-nocookie.com/embed/uIMz7CHgshQ?rel=0",
  title: "How Neural Networks Actually Learn",
  channelName: "The Third Hinge",
  channelUrl: "https://www.youtube.com/@thirdhinge",
  descriptionUz:
    "Ushbu modul uchun asosiy video qo'llanma: sun'iy neyron, Weight va Bias, Activation Function, Loss, Chain Rule, Backpropagation, Gradient Descent, Learning Rate, Overfitting va GPU Matrix Multiplication jarayonlari sodda vizual tarzda tushuntirilgan.",
} as const;

export type NeuralLearnVisualId =
  | "sound-neuron"
  | "activation-bend"
  | "deep-vs-wide"
  | "forward-softmax"
  | "loss-curve"
  | "chain-rule-flow"
  | "backprop-vs-optimizer"
  | "gd-step"
  | "learning-rate-compare"
  | "batch-epoch"
  | "overfitting-early-stop"
  | "gpu-matmul-llm";

export interface NeuralLearnMicroLesson {
  id: string;
  order: number;
  titleUz: string;
  subtitleEn: string;
  canonicalConceptId: string;
  estimatedMinutes: number;
  analogyUz: string;
  theoryParagraphsUz: string[];
  scientificCorrectionUz?: {
    mythUz: string;
    truthUz: string;
  };
  formulaLatex: string;
  formulaNoteUz: string;
  visualId: NeuralLearnVisualId;
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

export const HOW_NEURAL_LEARN_LESSONS: readonly NeuralLearnMicroLesson[] = [
  {
    id: "nn-01-neuron-weight-bias",
    order: 1,
    titleUz: "1. Sun'iy Neyron — Weight va Bias",
    subtitleEn: "Artificial Neuron — Weight & Bias",
    canonicalConceptId: "neural-networks-perceptrons",
    estimatedMinutes: 12,
    analogyUz:
      "Plinko doskasidagi qoziqchalarni tasavvur qiling: har bir qoziqni shunday sozlaymizki, sharcha kerakli savatga tushsin. Neyron xuddi shunday: kirish (x) ni Weight ga ko'paytiradi, Bias qo'shadi va chiqish beradi. Masalan, xonadagi ovoz balandligi 0.3 dan baland bo'lsa chiroqni yoqish kerak: w=1.67 qilsak 0.3×1.67=0.501 (yoqiladi), yoki w=1.0 va Bias=-0.3 qo'ysak 0.3-0.3=0 chegara siljiydi!",
    theoryParagraphsUz: [
      "Har qanday neyron tarmoqning eng kichik qurilish g'ishti bitta neyrondir. Neyron kiruvchi qiymatni Weight bilan ko'paytirib uning ahamiyatini belgilaydi, so'ng Bias qiymatini qo'shib qaror chegarasini siljitadi.",
      "Agar kirishlar nol bo'lsa (masalan, xonada to'liq jimjitlik yoki rasmda qora burchak), Bias siz neyron harakatlanish chegara nuqtasini o'zgartira olmaydi. O'qitish jarayonida ham Weight, ham Bias qiymatlari asta-sekin sozlanadi.",
    ],
    scientificCorrectionUz: {
      mythUz: "Noto'g'ri tushuncha: «To'g'ri javob bergan neyron hech qachon o'zgarmaydi».",
      truthUz:
        "Haqiqat: Bu faqat oddiy step-funksiyali Perceptron (1958) qoidasi uchun to'g'ri. Zamonaviy Gradient Descent bilan o'qitiladigan tarmoqlarda model to'g'ri klassifikatsiya qilganda ham (masalan, to'g'ri javob ehtimoli 60% bo'lsa), Loss nolga teng bo'lmaydi (-ln(0.6)=0.51) va Weights yanada ishonchliroq bo'lish uchun baribir yangilanadi!",
    },
    formulaLatex: "z = w \\cdot x + b \\qquad \\text{yoki ko'p kirishda: } z = \\sum_{i=1}^{n} w_i x_i + b",
    formulaNoteUz: "w — kirish ta'siri (Weight), b — siljitish chegarasi (Bias).",
    visualId: "sound-neuron",
    visualTitleUz: "Tovush va Chiroq Neyroni Simulyatori",
    pytorchSnippet: `import torch
import torch.nn as nn

neuron = nn.Linear(in_features=1, out_features=1)
with torch.no_grad():
    neuron.weight.fill_(1.0)
    neuron.bias.fill_(-0.3)

sound = torch.tensor([[0.4]])  # 0.3 dan baland tovush
score = neuron(sound)          # 1.0 * 0.4 - 0.3 = 0.1 >= 0 -> Chiroq ON!
print("Score:", round(score.item(), 3))`,
    exercise: {
      id: "ex-nn-01",
      titleUz: "Amaliy mashq: Chiroq yoqish neyronini yozing",
      instructionsUz:
        "`sound_neuron(x: float, w: float, b: float) -> int` funksiyasini yozing: u `z = w * x + b` ni hisoblasin va `z >= 0.5` bo'lsa `1`, aks holda `0` qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def sound_neuron(x: float, w: float, b: float) -> int:
    # z = w * x + b ni hisoblang
    pass

print(sound_neuron(0.4, 1.67, 0.0))`,
      expectedBehaviorUz: "w*x + b >= 0.5 bo'lsa 1, bo'lmasa 0 qaytaradi.",
      hintsUz: [
        "Avval z = w * x + b qiymatini hisoblang.",
        "Agar z >= 0.5 bo'lsa 1, aks holda 0 qaytaring.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "0.4 * 1.67 >= 0.5 bo'lgani uchun 1 qaytaradi", assertionCode: "sound_neuron(0.4, 1.67, 0.0) == 1" },
        { id: "tc2", descriptionUz: "0.2 * 1.67 < 0.5 bo'lgani uchun 0 qaytaradi", assertionCode: "sound_neuron(0.2, 1.67, 0.0) == 0" },
        { id: "tc3", descriptionUz: "Bias yordamida chegara siljishini tekshirish", assertionCode: "sound_neuron(0.0, 1.5, 0.6) == 1" },
      ],
      modelSolution: `def sound_neuron(x: float, w: float, b: float) -> int:
    z = w * x + b
    return 1 if z >= 0.5 else 0`,
      solutionExplanationUz: "Chiziqli yig'indini hisoblab 0.5 chegarasi bilan solishtirdik.",
    },
    quiz: {
      questionUz: "Agar model to'g'ri sinfga 60% ehtimol bersa, zamonaviy neyron tarmoqda Weight lar yangilanadimi?",
      options: [
        "Ha, chunki 60% da Loss > 0 bo'ladi va optimizer ishonchni oshirish uchun vaznlarni yangilaydi",
        "Yo'q, to'g'ri javob bergan neyron hech qachon o'zgarmaydi",
        "Faqat Bias o'zgaradi, Weight o'zgarmaydi",
      ],
      correctIndex: 0,
      explanationUz: "To'g'ri klassifikatsiya qilganda ham Cross-Entropy Loss > 0 bo'ladi (0.51), shuning uchun gradient-based tarmoqlar o'rganishda davom etadi.",
    },
  },

  {
    id: "nn-02-activation-functions",
    order: 2,
    titleUz: "2. Activation Functions — ReLU, Sigmoid, Tanh",
    subtitleEn: "Nolinearlik (Bend) Nima Uchun Kerak?",
    canonicalConceptId: "neural-networks-perceptrons",
    estimatedMinutes: 12,
    analogyUz:
      "Faqat Linear tenglamalarni ustma-ust qo'ying: birinchi qatlam to'g'ri chiziq chizadi, ikkinchisi uni buradi, uchinchisi siljitadi... 100 ta qatlam qo'shsangiz ham natija BARIBIR bitta to'g'ri chiziq bo'lib qoladi! Oxiriga kichik Activation Function (masalan, ReLU = max(0, z)) qo'shsak, chiziq «bukiladi». Ikkita bukilish V shaklini, ko'p bukilish esa murakkab to'lqin va yuz chizig'ini chiza oladi!",
    theoryParagraphsUz: [
      "ReLU manfiy qiymatlarni 0 qiladi va musbatlarni o'zgarishsiz o'tkazadi. Bu oddiy «bukilish» (Nonlinear xususiyat) tarmoqqa har qanday murakkab shakl va chegarani o'rganish imkonini beradi.",
      "ReLU dan tashqari Sigmoid (chiqishni 0 va 1 oralig'iga ehtimollik qilib siqadi) va Tanh (-1 dan +1 gacha markazlashtiradi) funksiyalari ham keng qo'llaniladi.",
    ],
    scientificCorrectionUz: {
      mythUz: "Noto'g'ri tushuncha: «Kirish 0 va Bias 0 bo'lsa, output ham doim 0 chiqadi».",
      truthUz:
        "Haqiqat: Bu chiziqli amal, ReLU(0)=0 va Tanh(0)=0 uchun to'g'ri. Ammo Sigmoid funksiyasida Sigmoid(0) = 1 / (1 + e^0) = 0.5 chiqadi! Ya'ni hamma Activation Function lar ham 0 da 0 bermaydi.",
    },
    formulaLatex: "\\text{ReLU}(z) = \\max(0, z), \\qquad \\sigma(z) = \\frac{1}{1 + e^{-z}}, \\qquad \\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}",
    formulaNoteUz: "Sigmoid(0) = 0.5, ReLU(0) = 0, Tanh(0) = 0.",
    visualId: "activation-bend",
    visualTitleUz: "ReLU Bukilishi vs Sigmoid & Tanh Taqqoslash",
    pytorchSnippet: `import torch

z = torch.tensor([-2.0, 0.0, 3.2])
print("ReLU:", torch.relu(z))        # [0.0, 0.0, 3.2]
print("Sigmoid:", torch.sigmoid(z))  # z=0 da 0.5000 beradi!
print("Tanh:", torch.tanh(z))        # z=0 da 0.0000 beradi`,
    exercise: {
      id: "ex-nn-02",
      titleUz: "Amaliy mashq: ReLU va Sigmoid funksiyalarini yozing",
      instructionsUz:
        "`relu(z)` (max(0.0, z)) va `sigmoid(z)` (1 / (1 + math.exp(-z))) funksiyalarini yozing.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def relu(z: float) -> float:
    pass

def sigmoid(z: float) -> float:
    pass

print("ReLU(-2):", relu(-2.0), "Sigmoid(0):", sigmoid(0.0))`,
      expectedBehaviorUz: "relu(-2)=0, relu(3.2)=3.2, sigmoid(0)=0.5 bo'lishi shart.",
      hintsUz: [
        "ReLU uchun return max(0.0, float(z)) dan foydalaning.",
        "Sigmoid uchun return 1.0 / (1.0 + math.exp(-z)) yozing.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "ReLU manfiy sonni 0 qiladi", assertionCode: "relu(-2.5) == 0.0" },
        { id: "tc2", descriptionUz: "ReLU musbat sonni saqlaydi", assertionCode: "round(relu(3.2), 2) == 3.2" },
        { id: "tc3", descriptionUz: "Sigmoid(0) aniq 0.5 ga teng", assertionCode: "abs(sigmoid(0.0) - 0.5) < 1e-6" },
      ],
      modelSolution: `import math

def relu(z: float) -> float:
    return max(0.0, float(z))

def sigmoid(z: float) -> float:
    return 1.0 / (1.0 + math.exp(-z))`,
      solutionExplanationUz: "ReLU bukilish beradi, Sigmoid esa 0 nuqtada 0.5 qaytaradi.",
    },
    quiz: {
      questionUz: "Agar Bias = 0 va kirish x = 0 bo'lsa, Sigmoid(0) ning qiymati nechaga teng?",
      options: ["0.5", "0.0", "-1.0"],
      correctIndex: 0,
      explanationUz: "1 / (1 + exp(0)) = 1 / 2 = 0.5, shuning uchun Sigmoid nol kirishda ham nol qaytarmaydi.",
    },
  },

  {
    id: "nn-03-architecture-layers",
    order: 3,
    titleUz: "3. Neural Network Architecture — Layers",
    subtitleEn: "Wide vs Deep Network & Parameters",
    canonicalConceptId: "neural-networks-perceptrons",
    estimatedMinutes: 12,
    analogyUz:
      "Qo'lda yozilgan raqamlarni (MNIST 28×28 = 784 piksel) tanish uchun bitta neyron yetmaydi. Rasmni bosqichma-bosqich o'qish — Deep Network kuchi: nuqtalardan -> qirralar, qirralardan -> aylana, aylanadan -> ko'z, ko'zlardan -> yuz! Bitta juda keng Wide Network esa hamma holatni alohida yodlab olishga majbur bo'ladi.",
    theoryParagraphsUz: [
      "Tarmoqda Input Layer (784 ta piksel) va Output Layer (10 ta raqam: 0..9) vazifaning o'zidan aniqlanadi. O'rtadagi Hidden Layers soni va enini esa muhandis tanlaydi.",
      "Masalan, 784 → 32 → 10 tarmoq MNIST testida 95.58% aniqlik bergan; 784 → 64 → 32 → 10 (kengroq va chuqurroq) tarmoq esa 96.35% ga yetgan. Har bir qo'shilgan Weight va Bias tarmoqning Parameters sonini belgilaydi.",
    ],
    formulaLatex: "\\text{Params} = (n_{\\text{in}} \\times n_{\\text{hidden}} + n_{\\text{hidden}}) + (n_{\\text{hidden}} \\times n_{\\text{out}} + n_{\\text{out}})",
    formulaNoteUz: "784 -> 32 -> 10 tarmoqda jami (784×32 + 32) + (32×10 + 10) = 25,450 ta parametr bor!",
    visualId: "deep-vs-wide",
    visualTitleUz: "Deep vs Wide & Parametr Kalkulyatori (MNIST 784)",
    pytorchSnippet: `import torch.nn as nn

# 784 -> 32 -> 10 (howneyronlearn.md dagi tarmoq: 25,450 parametr)
net = nn.Sequential(
    nn.Linear(784, 32),
    nn.ReLU(),
    nn.Linear(32, 10),
)
total_params = sum(p.numel() for p in net.parameters())
print("Jami Parameters:", total_params)  # 25450`,
    exercise: {
      id: "ex-nn-03",
      titleUz: "Amaliy mashq: 2 qatlamli tarmoq parametrlarini hisoblang",
      instructionsUz:
        "`count_params(n_in: int, n_hidden: int, n_out: int) -> int` funksiyasini yozing: har bir qatlam uchun `weights + biases` yig'indisini qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def count_params(n_in: int, n_hidden: int, n_out: int) -> int:
    # 1-qatlam: n_in * n_hidden + n_hidden
    # 2-qatlam: n_hidden * n_out + n_out
    pass

print("MNIST 784->32->10:", count_params(784, 32, 10))`,
      expectedBehaviorUz: "count_params(784, 32, 10) == 25450 qaytarishi kerak.",
      hintsUz: [
        "Birinchi qatlamda n_in * n_hidden ta Weight va n_hidden ta Bias bor.",
        "Ikkinchi qatlamda n_hidden * n_out ta Weight va n_out ta Bias bor.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "MNIST 784->32->10 jami 25,450 parametr", assertionCode: "count_params(784, 32, 10) == 25450" },
        { id: "tc2", descriptionUz: "Kichik 3->2->10 tarmoq 38 parametr (3*2+2 + 2*10+10 = 38)", assertionCode: "count_params(3, 2, 10) == 38" },
      ],
      modelSolution: `def count_params(n_in: int, n_hidden: int, n_out: int) -> int:
    layer1 = n_in * n_hidden + n_hidden
    layer2 = n_hidden * n_out + n_out
    return layer1 + layer2`,
      solutionExplanationUz: "Har bir Linear qatlamdagi Weights + Biases sonini jamladik.",
    },
    quiz: {
      questionUz: "Nima uchun Deep Network ko'pincha bitta ulkan Wide Network ga qaraganda samaraliroq o'rganadi?",
      options: [
        "Har bir qatlam oldingi qatlam topgan sodda qismlarni (qirra -> ko'z -> yuz) qayta ishlatadi",
        "Deep Network da hech qachon Bias kerak bo'lmaydi",
        "Chuqur tarmoqlar Activation Function ishlatmaydi",
      ],
      correctIndex: 0,
      explanationUz: "Iyerarxik bosqichma-bosqich xususiyatlarni qayta ishlatish murakkab naqshlarni kamroq parametr bilan o'rganishga yordam beradi.",
    },
  },

  {
    id: "nn-04-forward-pass",
    order: 4,
    titleUz: "4. Forward Propagation",
    subtitleEn: "Ma'lumotdan Bashorat va Softmax Ehtimolligigacha",
    canonicalConceptId: "neural-networks-perceptrons",
    estimatedMinutes: 12,
    analogyUz:
      "O'qitilmagan kichik tarmoqqa «7» raqamini beramiz. Tasodifiy boshlang'ich Weights sababli tarmoq «7» ga atigi 9% ehtimollik berib, «3» ni g'olib deb topadi. Forward Pass — kirishdan chiqishgacha har bir neyronning `weigh -> add Bias -> ReLU -> Softmax` zanjirini oldinga hisoblab chiqish jarayonidir.",
    theoryParagraphsUz: [
      "Forward Propagation paytida har bir qatlam oldingi qatlam chiqishini olib matritsa amali bajaradi va Activation Function dan o'tkazadi.",
      "Ko'p sinfli klassifikatsiya oxirida chiqish ballari (logits) Softmax orqali jami 1.0 (100%) ga teng bo'ladigan ehtimolliklarga aylantiriladi.",
    ],
    formulaLatex: "z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}, \\qquad p_i = \\text{Softmax}(z)_i = \\frac{e^{z_i}}{\\sum_j e^{z_j}}",
    formulaNoteUz: "Barcha Softmax ehtimolliklari yig'indisi har doim aniq 1.0 ga teng.",
    visualId: "forward-softmax",
    visualTitleUz: "Forward Pass & Softmax Ehtimollik Tarozisi",
    pytorchSnippet: `import torch

logits = torch.tensor([1.0, 2.4, 0.3])  # Masalan: [0, 3, 7] raqamlar ballari
probs = torch.softmax(logits, dim=0)
print("Ehtimolliklar:", [round(p, 3) for p in probs.tolist()])
print("Yig'indi:", round(probs.sum().item(), 4))`,
    exercise: {
      id: "ex-nn-04",
      titleUz: "Amaliy mashq: Softmax ehtimolliklarini hisoblang",
      instructionsUz:
        "`softmax(logits: list[float]) -> list[float]` funksiyasini yozing (sonli barqarorlik uchun `max(logits)` ni ayirib `math.exp` hisoblang).",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def softmax(logits: list[float]) -> list[float]:
    pass

print(softmax([2.0, 1.0, 0.1]))`,
      expectedBehaviorUz: "Chiqish ro'yxatining yig'indisi 1.0 bo'lib, eng katta logit eng katta ehtimollik oladi.",
      hintsUz: [
        "m = max(logits) oling va exps = [math.exp(x - m) for x in logits] hisoblang.",
        "Har bir elementni sum(exps) ga bo'ling.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Ehtimolliklar yig'indisi 1.0 ga teng", assertionCode: "abs(sum(softmax([2.0, 1.0, 0.1])) - 1.0) < 1e-6" },
        { id: "tc2", descriptionUz: "Teng ballar teng ehtimollik (0.5, 0.5) beradi", assertionCode: "abs(softmax([1.0, 1.0])[0] - 0.5) < 1e-6" },
      ],
      modelSolution: `import math

def softmax(logits: list[float]) -> list[float]:
    m = max(logits)
    exps = [math.exp(x - m) for x in logits]
    total = sum(exps)
    return [e / total for e in exps]`,
      solutionExplanationUz: "Maksimum qiymatni ayirish overflow dan saqlaydi, so'ng yig'indiga bo'lib ehtimolliklar olinadi.",
    },
    quiz: {
      questionUz: "Softmax funksiyasi neyron tarmoq chiqishiga qanday xossa beradi?",
      options: [
        "Barcha chiqish qiymatlarini 0 dan 1 gacha va jami yig'indisi 1.0 bo'lgan ehtimolliklarga aylantiradi",
        "Manfiy sonlarni shunchaki 0 ga tenglashtiradi",
        "Vaznlarni avtomatik yangilaydi",
      ],
      correctIndex: 0,
      explanationUz: "Softmax har bir sinfga nisbiy ehtimollik ulushini beradi va jami 100% ga normallashtiradi.",
    },
  },

  {
    id: "nn-05-loss-functions",
    order: 5,
    titleUz: "5. Loss Functions — MSE va Cross-Entropy",
    subtitleEn: "Model Qanchalik Xato Qilganini Bitta Sonda O'lchash",
    canonicalConceptId: "loss-cost-functions",
    estimatedMinutes: 12,
    analogyUz:
      "Model «7» raqamiga atigi 9% ehtimollik berdi. Bizga model qanchalik adashganini aytuvchi bitta son kerak — bu Loss! Agar to'g'ri javobga 100% bersa Loss=0 bo'lishi, ehtimollik 0 ga yaqinlashganda esa Loss keskin portlashi kerak. Aynan manfiy logarifm (`-ln(p)`) shunday ishlaydi: `p = 0.09` bo'lsa `Loss = 2.37`!",
    theoryParagraphsUz: [
      "Klassifikatsiya vazifalarida Cross-Entropy Loss (`-ln(p_true)`), uzluksiz sonlarni bashorat qilishda (regressiyada) esa MSE — `0.5 * (y - y_hat)^2` ishlatiladi.",
      "To'g'ri sinf ehtimolligi 60% (`0.60`) ga yetsa ham (ya'ni model allaqachon to'g'ri javobni tanlayotgan bo'lsa ham), `-ln(0.60) = 0.51` nol emas — shuning uchun gradient tizimi modelni 99%+ ishonchgacha yaxshilashda davom etadi.",
    ],
    formulaLatex: "\\mathcal{L}_{\\text{CE}} = -\\ln(p_{\\text{true}}), \\qquad \\mathcal{L}_{\\text{MSE}} = \\frac{1}{2}(\\hat{y} - y)^2",
    formulaNoteUz: "p = 0.09 -> Loss = 2.408 (taxminan 2.37); p = 0.60 -> Loss = 0.511; p = 0.99 -> Loss = 0.01.",
    visualId: "loss-curve",
    visualTitleUz: "Cross-Entropy Loss (`-ln(p)`) va Ehtimollik Slayderi",
    pytorchSnippet: `import torch
import torch.nn as nn

ce = nn.CrossEntropyLoss()
logits = torch.tensor([[2.1, 0.2]])  # 0-sinf ehtimoli ~87%
loss = ce(logits, torch.tensor([0]))
print("Loss (to'g'ri sinfda ham > 0):", round(loss.item(), 4))`,
    exercise: {
      id: "ex-nn-05",
      titleUz: "Amaliy mashq: Cross-Entropy va MSE Loss hisoblang",
      instructionsUz:
        "`cross_entropy_single(p_true: float) -> float` va `mse_single(y_pred: float, y_true: float) -> float` (`0.5 * (y_pred - y_true) ** 2`) funksiyalarini yozing.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def cross_entropy_single(p_true: float) -> float:
    pass

def mse_single(y_pred: float, y_true: float) -> float:
    pass

print("p=0.6 loss:", round(cross_entropy_single(0.6), 4))`,
      expectedBehaviorUz: "p_true kichiklashgani sayin Loss katta chiqadi; y_pred==y_true da MSE=0.",
      hintsUz: [
        "Cross-Entropy uchun -math.log(max(p_true, 1e-12)) qaytaring.",
        "MSE uchun 0.5 * (y_pred - y_true) ** 2 hisoblang.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "p=0.6 da Cross-Entropy ~0.5108 (>0)", assertionCode: "abs(cross_entropy_single(0.6) - (-math.log(0.6))) < 1e-5" },
        { id: "tc2", descriptionUz: "p=1.0 da Cross-Entropy = 0", assertionCode: "abs(cross_entropy_single(1.0)) < 1e-6" },
        { id: "tc3", descriptionUz: "MSE(5.0, 3.0) = 2.0", assertionCode: "abs(mse_single(5.0, 3.0) - 2.0) < 1e-6" },
      ],
      modelSolution: `import math

def cross_entropy_single(p_true: float) -> float:
    return -math.log(max(p_true, 1e-12))

def mse_single(y_pred: float, y_true: float) -> float:
    return 0.5 * (y_pred - y_true) ** 2`,
      solutionExplanationUz: "Logarifmik jarima past ehtimolni kuchli jazolaydi, MSE esa kvadratik farqni o'lchaydi.",
    },
    quiz: {
      questionUz: "To'g'ri javob ehtimolligi 9% dan 90% ga ko'tarilganda Cross-Entropy Loss qanday o'zgaradi?",
      options: [
        "Keskin kamayadi (~2.41 dan ~0.105 gacha)",
        "Ikki barobar oshadi",
        "O'zgarishsiz qoladi",
      ],
      correctIndex: 0,
      explanationUz: "-ln(0.09) = 2.41, -ln(0.90) = 0.105 — ishonch oshishi bilan xato keskin tushadi.",
    },
  },

  {
    id: "nn-06-derivatives-chain-rule",
    order: 6,
    titleUz: "6. Derivatives va Chain Rule",
    subtitleEn: "Finite Difference (Taxminiy) vs Analytical Chain Rule",
    canonicalConceptId: "backpropagation-autograd",
    estimatedMinutes: 14,
    analogyUz:
      "Bitta Weight ni +0.05 ga ozgina turtib Loss -0.0065 ga kamayishini kuzatish — juda tushunarli tajriba! Ammo 25,450 ta parametrni bitta-bitta turtish uchun tarmoqni 60 million marta ishga tushirishga to'g'ri keladi. Zanjir qoidasi (Chain Rule) esa `y = w·x + b` kabi oddiy qadamlarning hosilasini zanjirdek bir-biriga ko'paytirib aniq javobni 1 martada topadi.",
    theoryParagraphsUz: [
      "Derivative (hosila) parametr 1 birlikka o'zgarganda natija qanchaga o'zgarishini (yo'nalish va kuchni) bildiradi: `y = w*x + b` da `dy/dw = x`, `dy/db = 1`, `dy/dx = w`.",
      "Ikki qatlamli zanjirda `x2 = w1*x1 + b1`, `x3 = w2*x2 + b2`, `L = 0.5*(y - x3)^2` bo'lsa, Chain Rule orqali `dL/dw1 = (dL/dx3) * (dx3/dx2) * (dx2/dw1)` aniq hisoblanadi.",
    ],
    scientificCorrectionUz: {
      mythUz: "Noto'g'ri tushuncha: «Weight ni ozgina siljitish va Backpropagation — bitta usul».",
      truthUz:
        "Haqiqat: Bitta vaznni ozgina (`h`) ga o'zgartirish — bu **Finite Difference** (sonli taxminiy baho). U gradient tekshirish (gradient checking) va tushunish uchun yaxshi, lekin Backpropagation barcha aniq analitik hosilalarni Chain Rule orqali 1 ta orqaga yurishda hisoblaydi!",
    },
    formulaLatex: "\\frac{\\partial \\mathcal{L}}{\\partial w_1} = \\frac{\\partial \\mathcal{L}}{\\partial x_3} \\cdot \\frac{\\partial x_3}{\\partial x_2} \\cdot \\frac{\\partial x_2}{\\partial w_1}",
    formulaNoteUz: "Taxminiy: (L(w+h) - L(w)) / h  vs  Aniq: Chain Rule mahalliy hosilalar ko'paytmasi.",
    visualId: "chain-rule-flow",
    visualTitleUz: "Chain Rule Zanjiri vs Finite Difference Turtish",
    pytorchSnippet: `import torch

x1 = torch.tensor(2.0)
w1 = torch.tensor(1.5, requires_grad=True)
b1 = torch.tensor(0.5, requires_grad=True)
w2 = torch.tensor(2.0, requires_grad=True)
y_true = torch.tensor(10.0)

x2 = w1 * x1 + b1
x3 = w2 * x2
loss = 0.5 * (x3 - y_true) ** 2
loss.backward()  # Chain Rule bir pasda w1, b1, w2 gradientini topdi!
print("dL/dw1:", w1.grad.item(), "dL/dw2:", w2.grad.item())`,
    exercise: {
      id: "ex-nn-06",
      titleUz: "Amaliy mashq: 2 qadamli zanjirda Chain Rule gradientini hisoblang",
      instructionsUz:
        "`chain_rule_grads(x1, w1, b1, w2, b2, y_true)` funksiyasini yozing: `x2 = w1*x1 + b1`, `x3 = w2*x2 + b2`, `L = 0.5*(x3 - y_true)**2` uchun `(dL_dw1, dL_dw2)` tuple qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def chain_rule_grads(x1: float, w1: float, b1: float, w2: float, b2: float, y_true: float) -> tuple[float, float]:
    # 1. Forward pass: x2, x3
    # 2. Backward pass: dL_dx3 = (x3 - y_true), dL_dw2, dL_dx2, dL_dw1
    pass

print(chain_rule_grads(2.0, 1.5, 1.0, 2.0, 0.0, 10.0))`,
      expectedBehaviorUz: "Analytical Chain Rule bo'yicha (dL_dw1, dL_dw2) juftligini aniq qaytaradi.",
      hintsUz: [
        "dL_dx3 = x3 - y_true; dL_dw2 = dL_dx3 * x2.",
        "dL_dx2 = dL_dx3 * w2; dL_dw1 = dL_dx2 * x1.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Aniq gradient (dL/dw1, dL/dw2) tekshiruvi", assertionCode: "chain_rule_grads(2.0, 1.5, 1.0, 2.0, 0.0, 10.0) == (-8.0, -8.0)" },
        { id: "tc2", descriptionUz: "Nol xatolikda barcha gradientlar 0", assertionCode: "chain_rule_grads(2.0, 1.0, 0.0, 2.0, 0.0, 4.0) == (0.0, 0.0)" },
      ],
      modelSolution: `def chain_rule_grads(x1: float, w1: float, b1: float, w2: float, b2: float, y_true: float) -> tuple[float, float]:
    x2 = w1 * x1 + b1
    x3 = w2 * x2 + b2
    dL_dx3 = x3 - y_true
    dL_dw2 = dL_dx3 * x2
    dL_dx2 = dL_dx3 * w2
    dL_dw1 = dL_dx2 * x1
    return (dL_dw1, dL_dw2)`,
      solutionExplanationUz: "Orqadan oldinga har bir tugun hosilalarini ko'paytirib dL/dw2 va dL/dw1 olindi.",
    },
    quiz: {
      questionUz: "Finite Difference (vaznni +0.05 siljitish) bilan Backpropagation orasidagi asosiy farq nima?",
      options: [
        "Finite Difference faqat bitta vazn uchun taxminiy baho beradi; Backprop esa Chain Rule bilan barcha aniq gradientlarni 1 o'tishda topadi",
        "Finite Difference faqat GPU da ishlaydi",
        "Backpropagation vaznlarni gradient hisoblamasdan yangilaydi",
      ],
      correctIndex: 0,
      explanationUz: "Milliardsiz parametrlarni bitta-bitta turtish imkonsiz; Chain Rule esa 1 backward o'tishda hammasini topadi.",
    },
  },

  {
    id: "nn-07-backpropagation",
    order: 7,
    titleUz: "7. Backpropagation (Va Optimizer bilan Farqi)",
    subtitleEn: "Backpropagation Gradientni O'lchaydi — Optimizer Yangilaydi",
    canonicalConceptId: "backpropagation-autograd",
    estimatedMinutes: 13,
    analogyUz:
      "Tarmoq oxiridan (Loss) boshiga qarab qaytamiz. Har bir qatlam ikki ishni qiladi: (1) o'z Weight va Bias lariga kelgan gradientni saqlab qoladi, (2) kirishlar orqali oldingi qatlamga gradientni uzatadi. E'tibor bering: Backpropagation vaznlarni UMUMAN o'zgartirmaydi — u faqat termometr kabi ta'sir kuchini o'lchaydi!",
    theoryParagraphsUz: [
      "Bitta orqaga yurishdan keyin 38 ta yoki millionlab parametrlar uchun bitta umumiy ro'yxat — Gradient tayyor bo'ladi.",
      "Neyronlarga hech qachon 'sening chiqishing 0.8 bo'lsin' deb buyruq berilmaydi; Backpropagation faqat Loss ga ta'sir qiyaligini hisoblaydi. Parametrlarni esa keyingi bosqichda Optimizer yangilaydi.",
    ],
    formulaLatex: "\\text{Gradient} = \\nabla_{\\theta}\\mathcal{L} = \\left[\\frac{\\partial \\mathcal{L}}{\\partial w_1},\\; \\frac{\\partial \\mathcal{L}}{\\partial b_1},\\; \\dots\\right] \\quad (\\text{Backprop o'zgartirmaydi, o'lchaydi!})",
    formulaNoteUz: "1) Input -> 2) Forward -> 3) Loss -> 4) Backprop (o'lchash) -> 5) Optimizer (yangilash).",
    visualId: "backprop-vs-optimizer",
    visualTitleUz: "5-Qadamli O'qitish Tsikli: Backprop vs Optimizer",
    pytorchSnippet: `import torch

w = torch.tensor([3.0], requires_grad=True)
loss = (w * 2.0 - 4.0) ** 2
loss.backward()  # 4-qadam: Backprop faqat w.grad ni to'ldiradi, w HALI 3.0!
print("Backprop dan keyin w:", w.item(), "| grad:", w.grad.item())`,
    exercise: {
      id: "ex-nn-07",
      titleUz: "Amaliy mashq: Ko'p qirrali qatlamdan orqaga gradient yig'ing",
      instructionsUz:
        "Agar bitta neyron ikkita keyingi neyronga ulangan bo'lsa, undagi umumiy gradient kirib kelgan ikkita gradient yig'indisiga teng. `accumulate_grad(upstream_grads: list[float], local_deriv: float) -> float` funksiyasini yozing.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def accumulate_grad(upstream_grads: list[float], local_deriv: float) -> float:
    pass

print(accumulate_grad([1.5, -0.5], 2.0))`,
      expectedBehaviorUz: "Barcha kelgan gradientlar yig'indisini local_deriv ga ko'paytirib qaytaradi.",
      hintsUz: [
        "Multivariate Chain Rule bo'yicha bir nechta shoxdan kelgan gradientlar qo'shiladi: sum(upstream_grads).",
        "So'ng sum(upstream_grads) * local_deriv qaytaring.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Shoxlangan gradientlar yig'ilib mahalliy hosilaga ko'paytiriladi", assertionCode: "accumulate_grad([1.5, -0.5], 2.0) == 2.0" },
        { id: "tc2", descriptionUz: "Bitta tarmoq bo'lganda to'g'ri ishlaydi", assertionCode: "accumulate_grad([4.0], 0.5) == 2.0" },
      ],
      modelSolution: `def accumulate_grad(upstream_grads: list[float], local_deriv: float) -> float:
    return sum(upstream_grads) * local_deriv`,
      solutionExplanationUz: "Har bir chiqish shoxidan qaytgan gradientlar yig'ilib mahalliy hosila bilan ko'paytiriladi.",
    },
    quiz: {
      questionUz: "Backpropagation va Optimizer ning eng muhim vazifa farqi nimada?",
      options: [
        "Backpropagation gradientlarni o'lchaydi (vaznni o'zgartirmaydi); Optimizer shu gradientlar asosida Weight va Bias ni yangilaydi",
        "Backpropagation vaznni yangilaydi, Optimizer esa Loss ni hisoblaydi",
        "Ikkalasi ham faqat Forward Pass da ishlaydi",
      ],
      correctIndex: 0,
      explanationUz: "Backprop — o'lchov asbobi (dL/dW), Optimizer — o'zgartiruvchi mexanizm (W_new = W - lr * grad).",
    },
  },

  {
    id: "nn-08-gradient-descent-optimizers",
    order: 8,
    titleUz: "8. Gradient Descent va Optimizers",
    subtitleEn: "Barcha Parametrlarni Bir Vaqtda Yangilash",
    canonicalConceptId: "gradient-descent-optimizers",
    estimatedMinutes: 12,
    analogyUz:
      "Endi 38 ta yoki milliardlab gradient qo'limizda! Optimizer hammasi uchun bir vaqtda qaror qabul qiladi: qaysi Weight ning qiyaligi kuchli bo'lsa — u kattaroq qadam tashlaydi; kichik bo'lsa — sezilar-sezilmas siljiydi. Tepalikdan tushayotgan koptok eng tik pastga qarab yo'l olganidek.",
    theoryParagraphsUz: [
      "Gradient Descent formulasi sodda: `W_new = W - lr * grad`. Minus belgisi muhim, chunki gradient funksiya o'sadigan tarafni ko'rsatadi, biz esa Loss ni KAMAYTIRISH uchun qarama-qarshi tarafga yuramiz.",
      "Zamonaviy AI tizimlarida oddiy SGD dan tashqari Momentum (inersiya) va AdamW (har bir parametrga mos qadam + Weight Decay) keng qo'llaniladi.",
    ],
    formulaLatex: "W_{\\text{new}} = W - \\eta \\cdot \\nabla_W \\mathcal{L}, \\qquad b_{\\text{new}} = b - \\eta \\cdot \\nabla_b \\mathcal{L}",
    formulaNoteUz: "eta (Learning Rate) ga gradient ko'paytirilib eski parametrdan ayriladi.",
    visualId: "gd-step",
    visualTitleUz: "Gradient Descent Qadam-baqadam Tushish Simulyatori",
    pytorchSnippet: `import torch

w = torch.tensor([5.0], requires_grad=True)
optimizer = torch.optim.SGD([w], lr=0.2)
for step in range(3):
    optimizer.zero_grad()
    loss = (w - 1.0) ** 2
    loss.backward()
    optimizer.step()  # 5-qadam: Optimizer w ni yangiladi!
    print(f"Step {step+1}: w={w.item():.3f}, loss={loss.item():.3f}")`,
    exercise: {
      id: "ex-nn-08",
      titleUz: "Amaliy mashq: SGD yangilash funksiyasini yozing",
      instructionsUz:
        "`sgd_step(weights: list[float], grads: list[float], lr: float) -> list[float]` funksiyasini yozing: har bir `w - lr * g` ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def sgd_step(weights: list[float], grads: list[float], lr: float) -> list[float]:
    pass

print(sgd_step([5.0, -2.0], [8.0, -4.0], 0.1))`,
      expectedBehaviorUz: "Har bir parametr gradientga teskari yo'nalishda lr*g miqdorida yangilanadi.",
      hintsUz: [
        "List comprehension ishlating: [w - lr * g for w, g in zip(weights, grads)].",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "[5.0, -2.0] - 0.1*[8.0, -4.0] == [4.2, -1.6]", assertionCode: "[round(v, 4) for v in sgd_step([5.0, -2.0], [8.0, -4.0], 0.1)] == [4.2, -1.6]" },
      ],
      modelSolution: `def sgd_step(weights: list[float], grads: list[float], lr: float) -> list[float]:
    return [w - lr * g for w, g in zip(weights, grads)]`,
      solutionExplanationUz: "Barcha vaznlar gradientning teskari yo'nalishida proporsional yangilandi.",
    },
    quiz: {
      questionUz: "Gradient Descent formulasi W_new = W - lr * grad da nega minus (-) ishorasi qo'yiladi?",
      options: [
        "Chunki gradient Loss o'sadigan tarafni ko'rsatadi; xatoni kamaytirish uchun teskari tarafga yurish kerak",
        "Minus ishorasi Learning Rate ni oshiradi",
        "Weight har doim manfiy bo'lishi shart",
      ],
      correctIndex: 0,
      explanationUz: "Gradient — eng tez o'sish yo'nalishi; minimumga tushish uchun uning qarama-qarshi (-grad) yo'nalishidan yuriladi.",
    },
  },

  {
    id: "nn-09-learning-rate",
    order: 9,
    titleUz: "9. Learning Rate (O'rganish Tezligi)",
    subtitleEn: "Sekin Tushish vs Optimal vs Portlash",
    canonicalConceptId: "gradient-descent-optimizers",
    estimatedMinutes: 11,
    analogyUz:
      "Bitta gradient o'lchovi — atrofdagi boshqa vaznlar joyida turganda to'g'ri. Agar hammasi birdan juda katta sakrasa (Learning Rate = 20), Loss 2.00 dan tushish o'rniga 8.99 ga portlab uchib ketadi! Juda kichik qadam (0.05) da esa 2.00 -> 1.97 bo'lib juda sekin siljiydi. O'rtacha qadamda esa 2.00 -> 0.92 ga chiroyli tushadi.",
    theoryParagraphsUz: [
      "Learning Rate (`eta`) — o'qitishdagi eng muhim giperparametrlardan biri. U gradient vektorining qanchalik ulushini har qadamda qo'llashni hal qiladi.",
      "To'g'ri Learning Rate formula bilan topilmaydi: kichik eksperimentlar (`lr = 1e-4 .. 1e-1` yoki LR Finder + Cosine Schedule) orqali sinab tanlanadi.",
    ],
    scientificCorrectionUz: {
      mythUz: "Noto'g'ri tushuncha: «Juda kichik Learning Rate o'z-o'zidan lokal minimumga tushirib qo'yadi».",
      truthUz:
        "Haqiqat: Kichik Learning Rate odatda o'rganishni keskin sekinlashtiradi va berilgan epoch ichida yetib borishga ulgurmay qolishi mumkin, ammo u lokal minimumga tushishning avtomatik sababi emas. Katta tarmoqlarda ko'pincha egar nuqtalar (saddle points) ko'p uchraydi va Momentum/AdamW buni yaxshi yengadi.",
    },
    formulaLatex: "\\eta_{\\text{small}} \\Rightarrow \\text{sekin konvergentsiya}, \\qquad \\eta_{\\text{too large}} \\Rightarrow \\mathcal{L} \\to \\infty \\text{ (tebranish/portlash)}",
    formulaNoteUz: "Tajribadan misol: lr=0.05 (2.00 -> 1.97), lr=2 (2.00 -> 0.92), lr=20 (2.00 -> 8.99!).",
    visualId: "learning-rate-compare",
    visualTitleUz: "Learning Rate Tajribasi: Juda Kichik vs Optimal vs Juda Katta",
    pytorchSnippet: `import torch

for lr in [0.05, 0.4, 1.1]:
    w = torch.tensor([5.0], requires_grad=True)
    for _ in range(4):
        loss = (w - 1.0) ** 2
        loss.backward()
        with torch.no_grad():
            w -= lr * w.grad
        w.grad.zero_()
    print(f"lr={lr}: yakuniy loss={((w-1)**2).item():.3f}")`,
    exercise: {
      id: "ex-nn-09",
      titleUz: "Amaliy mashq: Berilgan Learning Rate bilan Loss traektoriyasini tekshiring",
      instructionsUz:
        "`run_gd_1d(start_w: float, target: float, lr: float, steps: int) -> float` funksiyasini yozing: `L = (w - target)**2` (gradient `2*(w - target)`) ustida `steps` marta tushib yakuniy Loss ni qaytarsin.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def run_gd_1d(start_w: float, target: float, lr: float, steps: int) -> float:
    w = start_w
    for _ in range(steps):
        grad = 2.0 * (w - target)
        # w ni yangilang
    return (w - target) ** 2

print("lr=0.1:", run_gd_1d(5.0, 1.0, 0.1, 5))`,
      expectedBehaviorUz: "lr=0.2 da loss tez kamayadi, lr=1.2 da esa portlab oshadi.",
      hintsUz: [
        "Har bir qadamda w = w - lr * grad yozing.",
        "Sikl tugagach (w - target) ** 2 qaytaring.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Yaxshi lr=0.2 da loss 16 dan kichrayadi", assertionCode: "run_gd_1d(5.0, 1.0, 0.2, 5) < 1.0" },
        { id: "tc2", descriptionUz: "Juda katta lr=1.2 da loss boshlang'ich 16 dan oshib portlaydi", assertionCode: "run_gd_1d(5.0, 1.0, 1.2, 5) > 50.0" },
      ],
      modelSolution: `def run_gd_1d(start_w: float, target: float, lr: float, steps: int) -> float:
    w = start_w
    for _ in range(steps):
        grad = 2.0 * (w - target)
        w = w - lr * grad
    return (w - target) ** 2`,
      solutionExplanationUz: "lr=1.2 bo'lganda qadam juda katta bo'lib minimumdan narigi tomonga sakrab ketadi.",
    },
    quiz: {
      questionUz: "Learning Rate haddan tashqari katta (masalan, 20) qo'yilsa nima sodir bo'ladi?",
      options: [
        "Loss kamayish o'rniga keskin oshib ketishi (portlashi) mumkin",
        "Model 1 qadamda 100% aniqlikka chiqadi",
        "Overfitting darhol yo'qoladi",
      ],
      correctIndex: 0,
      explanationUz: "Juda katta qadam o'lchangan mahalliy qiyalik ishonchli bo'lgan sohadan tashqariga sakrab Loss ni oshiradi.",
    },
  },

  {
    id: "nn-10-batch-epoch",
    order: 10,
    titleUz: "10. Batch, Mini-Batch va Epoch",
    subtitleEn: "Qarama-qarshi Gradientlarni Muvozanatlash",
    canonicalConceptId: "gradient-descent-optimizers",
    estimatedMinutes: 10,
    analogyUz:
      "Bitta misol Weight ni yuqoriga tortadi, ikkinchisi esa pastga! Qay biriga ishonamiz? Ikkalasining ham gradientini alohida hisoblab, o'rtacha qiymatini olamiz — bu Batch. Masalan, 60,000 rasmni 128 tadan Mini-Batch qilib o'tib chiqish va hammasini bir marta ko'rib tugatish — 1 Epoch deyiladi.",
    theoryParagraphsUz: [
      "Full Batch (butun dataset) juda sekin va xotiraga sig'maydi; 1 talik yangilash esa juda shovqinli. Shu sababli Mini-Batch (odatda 32, 64, 128 yoki 256 namuna) oltin o'rtalikdir.",
      "Agar datasetda 60,000 ta namuna va Batch Size = 60 bo'lsa, 1 Epoch davomida Optimizer vaznlarni roppa-rosa 1,000 marta yangilaydi.",
    ],
    formulaLatex: "g_{\\text{batch}} = \\frac{1}{B} \\sum_{i=1}^{B} \\nabla_{\\theta} \\mathcal{L}_i, \\qquad \\text{Steps per Epoch} = \\left\\lceil \\frac{N_{\\text{train}}}{B} \\right\\rceil",
    formulaNoteUz: "B — Batch Size, N_train — jami o'quv namunalari soni.",
    visualId: "batch-epoch",
    visualTitleUz: "Mini-Batch Gradient O'rtachalash & Epoch Kalkulyatori",
    pytorchSnippet: `from torch.utils.data import DataLoader, TensorDataset
import torch

X = torch.randn(1000, 10)
y = torch.randint(0, 2, (1000,))
loader = DataLoader(TensorDataset(X, y), batch_size=100, shuffle=True)
print("1 Epoch dagi qadamlar (batches):", len(loader))  # 10 ta Mini-Batch`,
    exercise: {
      id: "ex-nn-10",
      titleUz: "Amaliy mashq: 1 Epoch dagi yangilashlar soni va o'rtacha gradient",
      instructionsUz:
        "`steps_per_epoch(total_samples: int, batch_size: int) -> int` va `mean_batch_gradient(grads: list[float]) -> float` funksiyalarini yozing.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `import math

def steps_per_epoch(total_samples: int, batch_size: int) -> int:
    pass

def mean_batch_gradient(grads: list[float]) -> float:
    pass`,
      expectedBehaviorUz: "Bo'linishda qoldiq bo'lsa tepaga yaxlitlaydi (ceil) va o'rtacha gradientni qaytaradi.",
      hintsUz: [
        "math.ceil(total_samples / batch_size) ishlating.",
        "sum(grads) / len(grads) orqali Batch gradientini o'rtachalang.",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "1000 namuna, batch 128 -> 8 ta qadam", assertionCode: "steps_per_epoch(1000, 128) == 8" },
        { id: "tc2", descriptionUz: "[3.0, -1.0] qarama-qarshi gradientlar o'rtachasi 1.0", assertionCode: "abs(mean_batch_gradient([3.0, -1.0]) - 1.0) < 1e-6" },
      ],
      modelSolution: `import math

def steps_per_epoch(total_samples: int, batch_size: int) -> int:
    return math.ceil(total_samples / batch_size)

def mean_batch_gradient(grads: list[float]) -> float:
    return sum(grads) / len(grads)`,
      solutionExplanationUz: "Qoldiq namunalarni yo'qotmaslik uchun math.ceil qo'llanadi va batch gradienti o'rtachalanadi.",
    },
    quiz: {
      questionUz: "Agar 6,000 ta o'quv rasmi va Mini-Batch hajmi 60 bo'lsa, 1 Epoch davomida tarmoq vaznlari necha marta yangilanadi?",
      options: ["100 marta", "6,000 marta", "1 marta"],
      correctIndex: 0,
      explanationUz: "6000 / 60 = 100 ta Mini-Batch bor, har biridan keyin 1 marta update bo'ladi.",
    },
  },

  {
    id: "nn-11-overfitting-regularization",
    order: 11,
    titleUz: "11. Overfitting, Regularization va Early Stopping",
    subtitleEn: "Yodlab Olishdan Saqlanish: Train / Validation / Test",
    canonicalConceptId: "model-evaluation-metrics",
    estimatedMinutes: 13,
    analogyUz:
      "Atigi 1,000 ta rasm bilan keng tarmoqni uzoq o'qitsangiz, u savollarni tushunish o'rniga sahifalarni yodlab oladi! Train Loss tushaveradi, lekin tarmoq ko'rmagan Validation to'plamida xatolik 10-epoch dan keyin yana ko'tariladi. Shuning uchun eng yaxshi 10-epoch Checkpoint ni saqlab olamiz (Early Stopping -> 88.83%). 60,000 rasm bilan esa haqiqiy Generalization (95.58%) ga erishiladi.",
    theoryParagraphsUz: [
      "Ma'lumotlar 3 qismga bo'linadi: Train (o'qitish), Validation (qayta-qayta nazorat va eng yaxshi epochni tanlash) va Test (yakunda faqat bir marta xolis baholash).",
      "Overfitting ga qarshi 4 asosiy qurol: ko'proq xilma-xil ma'lumot (Data Augmentation), Early Stopping, Weight Decay (L2 Regularization) va Dropout (o'qitishda tasodifiy neyronlarni o'chirib yuborish).",
    ],
    formulaLatex: "\\mathcal{L}_{\\text{reg}} = \\mathcal{L}_{\\text{data}} + \\lambda \\sum w_i^2 \\qquad (\\text{Early Stopping: } \\arg\\min_{t} \\mathcal{L}_{\\text{val}}(t))",
    formulaNoteUz: "Validation loss minimal bo'lgan epoch dagi Checkpoint tanlanadi.",
    visualId: "overfitting-early-stop",
    visualTitleUz: "Train vs Validation Loss & Early Stopping Nuqtasi",
    pytorchSnippet: `# Early Stopping & Checkpoint mantiqi
best_val_loss = float("inf")
best_epoch = 0
for epoch, val_loss in enumerate([1.8, 1.2, 0.9, 1.05, 1.3], start=1):
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        best_epoch = epoch  # Checkpoint saqlash
print(f"Eng yaxshi Checkpoint: Epoch {best_epoch} (val_loss={best_val_loss})")`,
    exercise: {
      id: "ex-nn-11",
      titleUz: "Amaliy mashq: Early Stopping eng yaxshi epochini aniqlang",
      instructionsUz:
        "`find_best_epoch(val_losses: list[float]) -> int` funksiyasini yozing (1-indeksli eng kichik Validation Loss bo'lgan epoch raqamini qaytarsin).",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def find_best_epoch(val_losses: list[float]) -> int:
    pass

print(find_best_epoch([1.8, 1.2, 0.91, 0.98, 1.15]))`,
      expectedBehaviorUz: "Minimal Validation Loss uchragan 1-based epoch raqamini qaytaradi.",
      hintsUz: [
        "Eng kichik qiymat indeksini topib +1 qo'shing (val_losses.index(min(val_losses)) + 1).",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "Eng kichik val_loss 3-epoch da (0.91)", assertionCode: "find_best_epoch([1.8, 1.2, 0.91, 0.98, 1.15]) == 3" },
        { id: "tc2", descriptionUz: "Birinchi epoch eng yaxshi bo'lsa 1 qaytaradi", assertionCode: "find_best_epoch([0.4, 0.5, 0.7]) == 1" },
      ],
      modelSolution: `def find_best_epoch(val_losses: list[float]) -> int:
    return val_losses.index(min(val_losses)) + 1`,
      solutionExplanationUz: "Validation to'plamidagi minimal xatolik bo'lgan epoch Overfitting boshlanishidan oldingi eng optimal Checkpoint dir.",
    },
    quiz: {
      questionUz: "Nima uchun Test to'plami bilan modelni har epoch da tekshirish mumkin emas?",
      options: [
        "Chunki model sozlamalari Test to'plamiga moslashib qoladi va yakuniy Generalization bahosi soxta yuqori chiqadi",
        "Test to'plami faqat 1 ta rasmdan iborat bo'ladi",
        "PyTorch Test to'plamida ishlamaydi",
      ],
      correctIndex: 0,
      explanationUz: "Epoch va giperparametrlarni tanlash uchun Validation ishlatiladi; Test esa model umuman ko'rmagan ma'lumotlarda yakunda faqat 1 marta ishlatiladi.",
    },
  },

  {
    id: "nn-12-gpu-matmul-pytorch",
    order: 12,
    titleUz: "12. GPU, Matrix Multiplication va PyTorch Loop",
    subtitleEn: "Parallel Hisoblash, Training Loop & LLM Pre-Training Aniqligi",
    canonicalConceptId: "linear-algebra-matrices",
    estimatedMinutes: 15,
    analogyUz:
      "784 ta piksel va 32 ta neyronning barcha vaznlarini jadvalga — Matritsaga yig'amiz! Batch dagi misollarni qator qilib qo'ysak, bitta Matrix Multiplication hammasi uchun ko'paytirib-qo'shishni BIR VAQTDA hisoblaydi. CPU har xil ishga mos universaldor usta; GPU esa minglab bir xil matritsa amallarini bir soniyada bajaruvchi armiya!",
    theoryParagraphsUz: [
      "Qatlam ichidagi har bir katakcha qo'shnisiga bog'liq bo'lmagan mustaqil ko'paytirib-qo'shishdir — shuning uchun GPU da parallel bajariladi. Qatlamlar esa ketma-ket navbat kutadi.",
      "PyTorch da to'liq Training Loop 5 qatordan iborat: optimizer.zero_grad() -> Forward -> Loss -> loss.backward() -> optimizer.step().",
    ],
    scientificCorrectionUz: {
      mythUz: "Noto'g'ri tushuncha: «Hamma LLM lar bir xil usulda so'zni yashirib topishni o'rganadi».",
      truthUz:
        "Haqiqat: Bu yerda ikkita model oilasini ajratish shart! **GPT / Llama** kabi modellar **Causal Next-Token Prediction** (faqat chapdagi tokenlarga qarab keyingi so'zni bashorat qilish) bilan o'qitiladi. **BERT** kabi **Masked Language Modeling** (MLM) modellari esa gap o'rtasidagi `[MASK]` so'zni chap va o'ng tomondagi kontekstdan tiklaydi.",
    },
    formulaLatex: "Y_{(B \\times 32)} = X_{(B \\times 784)} \\cdot W_{(784 \\times 32)} + b_{(32)}",
    formulaNoteUz: "Bitta Batch Matrix Multiplication B ta namunani GPU da bir vaqtda hisoblaydi.",
    visualId: "gpu-matmul-llm",
    visualTitleUz: "Matritsa Ko'paytirish Shakli, GPU Parallelizmi & Causal vs Masked LLM",
    pytorchSnippet: `import torch
import torch.nn as nn

# To'liq minimalist PyTorch Training Loop
model = nn.Sequential(nn.Linear(4, 8), nn.ReLU(), nn.Linear(8, 2))
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-2)
loss_fn = nn.CrossEntropyLoss()

x_batch = torch.randn(16, 4)
y_batch = torch.randint(0, 2, (16,))

for epoch in range(3):
    optimizer.zero_grad()          # 1. Oldingi gradientlarni tozalash
    logits = model(x_batch)        # 2. Forward Pass (Matrix Multiplication)
    loss = loss_fn(logits, y_batch)# 3. Loss Function
    loss.backward()                # 4. Backpropagation
    optimizer.step()               # 5. Optimizer yangilashi
print("Yakuniy batch loss:", round(loss.item(), 4))`,
    exercise: {
      id: "ex-nn-12",
      titleUz: "Amaliy mashq: 2D Matritsa Ko'paytirish (X @ W + b) yozing",
      instructionsUz:
        "`linear_batch_forward(X: list[list[float]], W: list[list[float]], b: list[float]) -> list[list[float]]` funksiyasini yozing (X shakli B×D, W shakli D×K).",
      language: "python",
      runtime: "pyodide",
      difficulty: "challenge",
      assessment: "deterministic",
      starterCode: `def linear_batch_forward(X: list[list[float]], W: list[list[float]], b: list[float]) -> list[list[float]]:
    pass

print(linear_batch_forward([[1.0, 2.0]], [[1.0, 0.0], [0.5, 2.0]], [0.0, 1.0]))`,
      expectedBehaviorUz: "(B x D) va (D x K) matritsalarni ko'paytirib b ni qo'shgan B x K natija qaytaradi.",
      hintsUz: [
        "Har bir batch qatori x uchun va har bir chiqish ustuni j uchun: sum(x[d] * W[d][j] for d in range(D)) + b[j].",
      ],
      testCases: [
        { id: "tc1", descriptionUz: "1x2 va 2x2 matritsa ko'paytmasi + bias to'g'ri", assertionCode: "linear_batch_forward([[1.0, 2.0]], [[1.0, 0.0], [0.5, 2.0]], [0.0, 1.0]) == [[2.0, 5.0]]" },
        { id: "tc2", descriptionUz: "2 ta batch namunasi birga hisoblanadi", assertionCode: "len(linear_batch_forward([[1.0, 0.0], [0.0, 1.0]], [[2.0], [3.0]], [1.0])) == 2" },
      ],
      modelSolution: `def linear_batch_forward(X: list[list[float]], W: list[list[float]], b: list[float]) -> list[list[float]]:
    d_in = len(W)
    d_out = len(b)
    out = []
    for row in X:
        out.append([sum(row[d] * W[d][j] for d in range(d_in)) + b[j] for j in range(d_out)])
    return out`,
      solutionExplanationUz: "X @ W + b batch matritsa ko'paytmasi har bir misolni parallel hisoblash shaklini beradi.",
    },
    quiz: {
      questionUz: "GPT (Causal) va BERT (Masked Language Model) o'rtasidagi asosiy pre-training farqi nimada?",
      options: [
        "GPT faqat oldingi (chapdagi) tokenlarga qarab keyingi tokenni bashorat qiladi; BERT esa yashirilgan [MASK] so'zni ikki tomonlama kontekstdan tiklaydi",
        "BERT faqat rasmlarda ishlaydi, GPT faqat raqamlarda",
        "Ikkalasi ham hech qachon Tokenizer ishlatmaydi",
      ],
      correctIndex: 0,
      explanationUz: "Causal Next-Token Prediction chapdan o'ngga matn yaratishda, Masked LM esa ikki tomonlama tushunishda ishlatiladi.",
    },
  },
];

export function getNeuralLearnLessonById(id: string): NeuralLearnMicroLesson | undefined {
  return HOW_NEURAL_LEARN_LESSONS.find((l) => l.id === id);
}
