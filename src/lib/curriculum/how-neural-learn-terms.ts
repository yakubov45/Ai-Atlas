/**
 * AI Atlas — Color-Coded Technical Terminology System
 * for "How Neural Networks Learn" (12-Micro-Lesson Module).
 *
 * Groups core concepts into 5 semantic color families so learners immediately
 * recognize whether a term relates to:
 * - Structure & Parameters (cyan)
 * - Math & Forward Activations (emerald)
 * - Loss & Gradients / Backprop (amber / rose)
 * - Optimization & Training Loop (violet)
 * - Generalization, Hardware & LLMs (sky)
 */

export type TermColorFamily =
  | "structure"
  | "math"
  | "gradient"
  | "optimizer"
  | "systems";

export interface ColoredTermMeta {
  term: string;
  family: TermColorFamily;
  meaningUz: string;
}

export const TERM_FAMILY_STYLES: Readonly<
  Record<
    TermColorFamily,
    { labelUz: string; badgeCls: string; dotCls: string; legendCls: string }
  >
> = {
  structure: {
    labelUz: "Tuzilma va Parametrlar",
    badgeCls:
      "bg-cyan-500/15 text-cyan-200 border border-cyan-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-cyan-400",
    legendCls: "border-cyan-500/40 bg-cyan-950/40 text-cyan-200",
  },
  math: {
    labelUz: "Forward Pass & Aktivatsiya",
    badgeCls:
      "bg-emerald-500/15 text-emerald-200 border border-emerald-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-emerald-400",
    legendCls: "border-emerald-500/40 bg-emerald-950/40 text-emerald-200",
  },
  gradient: {
    labelUz: "Loss & Backpropagation",
    badgeCls:
      "bg-amber-500/15 text-amber-200 border border-amber-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-amber-400",
    legendCls: "border-amber-500/40 bg-amber-950/40 text-amber-200",
  },
  optimizer: {
    labelUz: "Optimizatsiya & Trening",
    badgeCls:
      "bg-violet-500/15 text-violet-200 border border-violet-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-violet-400",
    legendCls: "border-violet-500/40 bg-violet-950/40 text-violet-200",
  },
  systems: {
    labelUz: "Generalizatsiya, GPU & LLM",
    badgeCls:
      "bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/40 px-1.5 py-0.5 rounded-md font-semibold text-[0.92em]",
    dotCls: "bg-fuchsia-400",
    legendCls: "border-fuchsia-500/40 bg-fuchsia-950/40 text-fuchsia-200",
  },
};

export const NN_COLORED_TERMS: readonly ColoredTermMeta[] = [
  // Structure & Parameters (cyan)
  { term: "Weight", family: "structure", meaningUz: "Kirish signalining muhimligini boshqaruvchi o'rganiladigan koeffitsient (vazn)" },
  { term: "Weights", family: "structure", meaningUz: "Neyron kirishlariga ko'paytiriladigan barcha vazn parametrlar" },
  { term: "Bias", family: "structure", meaningUz: "Kirishlar 0 bo'lganda ham neyronning boshlang'ich faollashuv chegarasini siljituvchi qo'shimcha parametr" },
  { term: "Hidden Layer", family: "structure", meaningUz: "Kirish va chiqish qatlamlari orasidagi ichki qayta ishlash qatlami" },
  { term: "Hidden Layers", family: "structure", meaningUz: "Bosqichma-bosqich xususiyat ajratuvchi ko'p qatlamli ichki bloklar" },
  { term: "Input Layer", family: "structure", meaningUz: "Kirish ma'lumotlarini (masalan, 784 ta piksel) qabul qiluvchi birinchi qatlam" },
  { term: "Output Layer", family: "structure", meaningUz: "Yakuniy ballar yoki klass ehtimolliklarini beruvchi oxirgi qatlam" },
  { term: "Deep Network", family: "structure", meaningUz: "Ko'p ketma-ket yashirin qatlamlarga ega chuqur neyron tarmoq" },
  { term: "Wide Network", family: "structure", meaningUz: "Bitta qatlamda juda ko'p neyronga ega keng neyron tarmoq" },
  { term: "Parameters", family: "structure", meaningUz: "O'qitish davomida sozlanadigan barcha Weight va Bias lar yig'indisi" },
  { term: "Perceptron", family: "structure", meaningUz: "1958-yilda taklif etilgan bitta chiziqli chegara neyroni" },

  // Math & Forward Activations (emerald)
  { term: "Activation Function", family: "math", meaningUz: "Neyron yig'indisiga nochiziqlilik (bend) kirituvchi yakuniy funksiya" },
  { term: "Forward Propagation", family: "math", meaningUz: "Kirishdan chiqishgacha qatlamlar bo'ylab bashoratni hisoblash oqimi" },
  { term: "Forward Pass", family: "math", meaningUz: "Ma'lumotni tarmoqdan oldinga o'tkazib bashorat olish bosqichi" },
  { term: "ReLU", family: "math", meaningUz: "max(0, z): manfiy qiymatni 0 ga tushirib, musbatini saqlovchi mashhur nochiziqli funksiya" },
  { term: "Sigmoid", family: "math", meaningUz: "Har qanday sonni (0, 1) oralig'iga siquvchi funksiya; Sigmoid(0) = 0.5" },
  { term: "Tanh", family: "math", meaningUz: "Chiqiqshini (-1, 1) oralig'iga markazlashtiruvchi funksiya; Tanh(0) = 0" },
  { term: "Softmax", family: "math", meaningUz: "Chiqish ballarini yig'indisi 1.0 ga teng ehtimolliklarga aylantiruvchi funksiya" },
  { term: "Nonlinear", family: "math", meaningUz: "To'g'ri chiziqdan tashqari egri va murakkab shakllarni chiza oladigan munosabat" },
  { term: "Linear", family: "math", meaningUz: "Faqat tekis chiziq yoki tekislik chiza oladigan to'g'ri proporsional amal" },
  { term: "Matrix Multiplication", family: "math", meaningUz: "Butun qatlam va batchdagi barcha neyronlarni parallel ko'paytirib qo'shish amali" },

  // Loss & Gradients / Backprop (amber)
  { term: "Backpropagation", family: "gradient", meaningUz: "Chain Rule orqali har bir Weight va Bias ning Loss ga ta'sirini (gradientni) 1 o'tishda hisoblash usuli" },
  { term: "Chain Rule", family: "gradient", meaningUz: "Zanjir qoidasi: murakkab funksiyalar hosilasini ketma-ket mahalliy hosilalarga ko'paytirish" },
  { term: "Finite Difference", family: "gradient", meaningUz: "Weight ni ozgina siljitib (L(w+h)-L(w))/h usulida hosilani taxminiy baholash" },
  { term: "Cross-Entropy", family: "gradient", meaningUz: "Klassifikatsiyada to'g'ri sinf ehtimolligi pasayganda keskin oshuvchi -ln(p) yo'qotish funksiyasi" },
  { term: "Loss Function", family: "gradient", meaningUz: "Model bashorati haqiqiy javobdan qanchalik uzoqligini bitta sonda o'lchovchi mezon" },
  { term: "Derivative", family: "gradient", meaningUz: "Hosila: parametrni 1 birlikka o'zgartirganda natija qanchaga o'zgarishi (qiyalik)" },
  { term: "Gradient", family: "gradient", meaningUz: "Barcha parametrlar bo'yicha xususiy hosilalar vektori" },
  { term: "Autograd", family: "gradient", meaningUz: "PyTorch da hisoblash graflari bo'ylab gradientni avtomatik hisoblovchi mexanizm" },
  { term: "Loss", family: "gradient", meaningUz: "Model xatolik qiymati (qancha kichik bo'lsa shuncha yaxshi)" },
  { term: "MSE", family: "gradient", meaningUz: "Mean Squared Error: bashorat va haqiqiy qiymat farqi kvadratining o'rtachasi" },

  // Optimization & Training Loop (violet)
  { term: "Gradient Descent", family: "optimizer", meaningUz: "Gradientning teskari yo'nalishida qadam tashlab Loss ni kamaytirish algoritmi" },
  { term: "Learning Rate", family: "optimizer", meaningUz: "Har bir yangilashda gradientga ko'paytiriladigan qadam kattaligi (eta)" },
  { term: "Early Stopping", family: "optimizer", meaningUz: "Validation xatoligi osha boshlagan eng yaxshi epoch dagi modelni saqlab to'xtatish" },
  { term: "Regularization", family: "optimizer", meaningUz: "Overfitting ni kamaytirish uchun modelga qo'yiladigan jazo yoki cheklovlar" },
  { term: "Checkpoint", family: "optimizer", meaningUz: "O'qitish davomida saqlab qolingan model vaznlari nusxasi" },
  { term: "Mini-Batch", family: "optimizer", meaningUz: "Bir vaqtda gradienti o'rtachalanib yangilanadigan kichik misollar guruhi" },
  { term: "Optimizer", family: "optimizer", meaningUz: "Hisoblangan gradientlarni olib Weight va Bias larni haqiqatda yangilovchi algoritm" },
  { term: "AdamW", family: "optimizer", meaningUz: "Har bir parametrga moslashuvchan tezlik va weight decay beruvchi zamonaviy optimizator" },
  { term: "Batch", family: "optimizer", meaningUz: "Bir yangilash qadami uchun birga qayta ishlanadigan o'quv namunalari guruhi" },
  { term: "Epoch", family: "optimizer", meaningUz: "Butun o'quv datasetidan bir marta to'liq o'tish davri" },
  { term: "Dropout", family: "optimizer", meaningUz: "Yodlab olishni oldini olish uchun o'qitishda tasodifiy neyronlarni vaqtincha o'chirish" },
  { term: "SGD", family: "optimizer", meaningUz: "Stochastic Gradient Descent: kichik batchlar ustida gradient tushish" },

  // Generalization, Hardware & LLMs (fuchsia)
  { term: "Causal Next-Token Prediction", family: "systems", meaningUz: "GPT kabi modellarda faqat chapdagi tokenlarga qarab keyingi tokenni bashorat qilish" },
  { term: "Masked Language Modeling", family: "systems", meaningUz: "BERT kabi modellarda yashirilgan [MASK] tokenni ikki tomonlama kontekstdan topish" },
  { term: "Data Augmentation", family: "systems", meaningUz: "Mavjud tasvir/matnlarni burish, siljitish orqali sun'iy xilma-xil misollar yaratish" },
  { term: "Generalization", family: "systems", meaningUz: "Modelning ilgari ko'rmagan yangi ma'lumotlarda ham to'g'ri ishlash qobiliyati" },
  { term: "Overfitting", family: "systems", meaningUz: "Modelning umumiy qonuniyat o'rniga o'quv ma'lumotlarini shunchaki yodlab olishi" },
  { term: "Validation", family: "systems", meaningUz: "O'qitilmaydigan, faqat giperparametr va eng yaxshi epochni tanlash uchun tekshiruv to'plami" },
  { term: "Test", family: "systems", meaningUz: "Model sifatini yakunda atigi 1 marta xolis baholash uchun ajratilgan to'plam" },
  { term: "Train", family: "systems", meaningUz: "Model parametrlarini o'qitish uchun ishlatiladigan asosiy ma'lumotlar to'plami" },
  { term: "Tokenizer", family: "systems", meaningUz: "Matnni til modeli tushunadigan kichik bo'laklarga (token ID larga) bo'luvchi vosita" },
  { term: "GPU", family: "systems", meaningUz: "Minglab bir xil matritsa amallarini bir vaqtda parallel bajaruvchi grafik protsessor" },
  { term: "CPU", family: "systems", meaningUz: "Har xil ketma-ket mantiqiy vazifalarni bajaruvchi markaziy protsessor" },
];

export const TERM_LOOKUP = new Map<string, ColoredTermMeta>(
  NN_COLORED_TERMS.map((t) => [t.term.toLowerCase(), t]),
);

// Sorted longest-first so multi-word phrases ("Gradient Descent") match before single words ("Gradient")
export const TERM_REGEX = new RegExp(
  `\\b(${[...NN_COLORED_TERMS]
    .sort((a, b) => b.term.length - a.term.length)
    .map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})\\b`,
  "g",
);

export interface TextSegment {
  text: string;
  meta: ColoredTermMeta | null;
}

export function splitTextWithColoredTerms(input: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIdx = 0;

  TERM_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TERM_REGEX.exec(input)) !== null) {
    if (match.index > lastIdx) {
      segments.push({ text: input.slice(lastIdx, match.index), meta: null });
    }
    const matchedWord = match[0];
    const meta = TERM_LOOKUP.get(matchedWord.toLowerCase()) ?? null;
    segments.push({ text: matchedWord, meta });
    lastIdx = TERM_REGEX.lastIndex;
  }

  if (lastIdx < input.length) {
    segments.push({ text: input.slice(lastIdx), meta: null });
  }

  return segments;
}
