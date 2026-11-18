import rawDsDeepCurriculum from "@/content/curriculum/ds-deep-curriculum.json";
import {
  ML_DS_PHASES,
  getMlDsMicroLesson,
  type MlDsMicroLesson,
} from "@/lib/curriculum/ml-ds";
import type { LearningDepth } from "@/lib/curriculum/paths";

export type DsNodeContentPolicy = "reuse-existing" | "proposed-extension";

export type DsInteractiveLabId =
  | "cuped-deep-dive"
  | "clt-simulator"
  | "delta-method-ratio"
  | "confusion-matrix"
  | "ab-cuped"
  | "gradient-descent-1d";

export interface DsAtomicStep {
  stepNumber: number;
  id: string;
  depth: LearningDepth;
  title: string;
  objectiveUz: string;
  explanationUz: string;
  formulaLatex?: string;
  calculationTable?: {
    headers: string[];
    rows: string[][];
    captionUz?: string;
  };
  codeSnippet?: string;
  keyTakeawayUz: string;
}

export interface DsQuizQuestion {
  id: string;
  promptUz: string;
  options: string[];
  correctIndex: number;
  explanationUz: string;
}

export interface DsResourceLead {
  id: string;
  title: string;
  provider: string;
  format: string;
  sourceSection: string;
  url: string | null;
  urlStatus: "not-in-paste-unverified" | "verified";
}

export interface DsCurriculumNode {
  id: string;
  phaseId: string;
  phaseOrder: number;
  title: string;
  contentRef: string;
  contentPolicy: DsNodeContentPolicy;
  status: "published" | "sample-authored" | "linked-to-existing-planned-content" | "planned";
  sourceSection: string;
  sourceRefs: string[];
  targetDepths: LearningDepth[];
  publishedDepths: LearningDepth[];
  learningObjectiveUz: string;
  prerequisiteRefs: string[];
  interactiveLabId?: DsInteractiveLabId;
  manimAssetPath?: string;
  pythonRunnablePath?: string;
  steps?: DsAtomicStep[];
  checkpointQuestions?: DsQuizQuestion[];
}

export interface DsDeepPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  prerequisitePhaseIds: string[];
  coreOrSupporting: "core" | "supporting" | "advanced";
  teachingFocus: string;
  visualizationConcept: string;
  miniProject: string;
  resourceIds: string[];
  lessonNodes: DsCurriculumNode[];
}

export interface DsWorkflowStage {
  stageNumber: number;
  title: string;
  phaseRangeLabel: string;
  phaseIds: string[];
  summaryUz: string;
}

export const DS_WORKFLOW_STAGES: readonly DsWorkflowStage[] = [
  {
    stageNumber: 1,
    title: "Matematika, statistika va dasturlash poydevori",
    phaseRangeLabel: "Phase 01–08",
    phaseIds: ["dsx-01", "dsx-02", "dsx-03", "dsx-04", "dsx-05", "dsx-06", "dsx-07", "dsx-08"],
    summaryUz:
      "Data Scientist ish oqimi, reproduktiv Python/Pandas, analitik SQL, chiziqli algebra, matanaliz, ehtimollik, CLT va gipoteza testlari.",
  },
  {
    stageNumber: 2,
    title: "Data Cleaning va Exploratory Data Analysis (EDA)",
    phaseRangeLabel: "Phase 09 (+ Phase 02–03)",
    phaseIds: ["dsx-09"],
    summaryUz:
      "Dataset auditi, missing values mexanizmlari, outlier tahlili, segmentlar bo‘yicha taqsimot va EDA hisobotini modellashtirish rejasiga aylantirish.",
  },
  {
    stageNumber: 3,
    title: "Eksperimentlar (A/B, MDE, CUPED, CUPAC, Delta Method), Ekonometrika va Time Series",
    phaseRangeLabel: "Phase 10–16",
    phaseIds: ["dsx-10", "dsx-11", "dsx-12", "dsx-13", "dsx-14", "dsx-15", "dsx-16"],
    summaryUz:
      "A/A va A/B test dizayni, MDE va quvvat (Power), CUPED/CUPAC orqali dispersiyani kamaytirish, Ratio Metrics va Delta Method, sabab-oqibat (Causal Inference) hamda ARIMA prognozlash.",
  },
  {
    stageNumber: 4,
    title: "Klassik Machine Learning va Deep Learning",
    phaseRangeLabel: "Phase 17–18",
    phaseIds: ["dsx-17", "dsx-18"],
    summaryUz:
      "Klassik ML va ansambllar (Bagging/Boosting), biznes va ML metrikalar muvozanati, neyron tarmoqlar, CNN/RNN/Transformer va Transfer Learning.",
  },
  {
    stageNumber: 5,
    title: "MLOps, Monitoring va Biznes Capstone Loyihasi",
    phaseRangeLabel: "Phase 19–20",
    phaseIds: ["dsx-19", "dsx-20"],
    summaryUz:
      "Modelni notebookdan servisga olib chiqish, data/concept drift kuzatuvi va stakeholderlar uchun 1 betlik asoslangan Data Science hisoboti.",
  },
];

// ---------------------------------------------------------------------------
// Complete Authored Vertical Slice 1:
// `dsx-12-c011` — A/B Testing → CUPED: Y_adjusted = Y - theta(X - mean(X))
// Source: `Data_Scientist_Micro_Lesson_AB_CUPED.md`
// ---------------------------------------------------------------------------

const CUPED_DEEP_DIVE_STEPS: DsAtomicStep[] = [
  {
    stepNumber: 1,
    id: "cuped-step-1",
    depth: "overview",
    title: "1-qadam: Nima uchun A/B testda avvalgi faollik (Pre-period X) muhim?",
    objectiveUz:
      "Eksperiment boshlanishidan oldin o‘lchangan ko‘rsatkich (pre-experiment covariate) yordamida o‘lchov shovqinini kamaytirish g‘oyasini tushunish.",
    explanationUz:
      "Tasavvur qiling: yangi sahifa dizaynini A/B test qilyapsiz. Randomizatsiya xolis bo‘lsa ham, chekli tanlanmada ikki guruhning eksperimentdan oldingi faolligi biroz farq qilishi mumkin. Agar foydalanuvchi ilgari ham faol bo‘lgan bo‘lsa, eksperiment davomida ham ko‘pincha yuqori natija ko‘rsatadi. Eksperiment boshlanishidan oldingi X ko‘rsatkichni matematik hisobga olish orqali o‘lchov shovqinini (variance) kamaytirish usuli CUPED (Controlled-experiment Using Pre-Experiment Data) deb ataladi.",
    keyTakeawayUz:
      "CUPED eksperimentdan oldingi X ma’lumotga tayangan holda post-period Y dagi tabiiy o‘zgaruvchanlikning bir qismini olib tashlaydi.",
  },
  {
    stepNumber: 2,
    id: "cuped-step-2",
    depth: "overview",
    title: "2-qadam: X, Y, theta va Y_adjusted tushunchalari hamda kundalik analogiya",
    objectiveUz:
      "CUPED tenglamasidagi 4 ta asosiy komponentni va ularning o‘quvchilar ballari analogiyasidagi ma’nosini ajratish.",
    explanationUz:
      "Ikki o‘quvchi guruhining yakuniy imtihon ballarini (Y) solishtirishda ularning kurs boshlanishidan oldingi kirish testi darajasini (X) bilish yakuniy farqni aniqroq tushunishga yordam beradi:\n• X — treatment’dan oldin o‘lchangan metrika (pre-period covariate);\n• Y — eksperiment davomida o‘lchangan metrika (post-period outcome);\n• θ (theta) — X va Y orasidagi chiziqli bog‘liqlik koeffitsiyenti;\n• Y_adjusted — X ga bog‘liq bo‘lgan boshlang‘ich variatsiya olib tashlangan natija.",
    formulaLatex: "Y_{\\text{adjusted}} = Y - \\theta (X - \\overline{X})",
    keyTakeawayUz:
      "Muhim chegara: X aynan yangi metod (treatment) boshlanishidan OLDIN o‘lchangan bo‘lishi shart.",
  },
  {
    stepNumber: 3,
    id: "cuped-step-3",
    depth: "overview",
    title: "3-qadam: CUPED nima qilmaydi? (Muhim cheklovlar)",
    objectiveUz:
      "CUPED xolis randomizatsiya o‘rnini bosmasligini va har doim ham dispersiyani kamaytirishga kafolat bermasligini anglash.",
    explanationUz:
      "CUPED haqida ikkita xavfli yanglish tushunchadan saqlanish kerak:\n1) CUPED buzilgan (biased) randomizatsiyani tuzatadigan sehrli vosita emas;\n2) CUPED har qanday vaziyatda aniqlikni oshirishga kafolat bermaydi — agar X va Y orasida korrelyatsiya bo‘lmasa (θ ≈ 0) yoki tanlanma juda kichik bo‘lsa, CUPED sezilarli yutuq bermaydi.",
    keyTakeawayUz:
      "CUPED — xolis randomizatsiyalangan eksperimentning sezgirligini oshirish vositasi, ammo u noto‘g‘ri eksperiment dizaynini qutqarmaydi.",
  },
  {
    stepNumber: 4,
    id: "cuped-step-4",
    depth: "understand",
    title: "4-qadam: 8 ta kuzatuvdan iborat Synthetic Dataset va Oddiy A/B farqi",
    objectiveUz:
      "Control (n=4) va Treatment (n=4) guruhlaridagi 8 ta illustrativ kuzatuvda raw o‘rtachalarni hisoblash.",
    explanationUz:
      "Quyidagi 8 ta kuzatuv biz tuzgan synthetic educational example hisoblanadi (real Booking.com yoki DoorDash ma’lumotlari emas):\n• Control guruhi: (X=1, Y=3), (X=2, Y=4), (X=3, Y=7), (X=4, Y=8) → Control mean Y = (3+4+7+8)/4 = 5.500, Control mean X = 2.500.\n• Treatment guruhi: (X=3, Y=8), (X=4, Y=9), (X=5, Y=12), (X=6, Y=13) → Treatment mean Y = (8+9+12+13)/4 = 10.500, Treatment mean X = 4.500.\nOddiy (Raw) A/B farqi: Treatment − Control = 10.500 − 5.500 = 5.000.",
    formulaLatex: "\\Delta_{\\text{raw}} = \\overline{Y}_T - \\overline{Y}_C = 10.500 - 5.500 = 5.000",
    calculationTable: {
      headers: ["Guruh", "X (pre-period)", "Y (post-period)", "Guruh o‘rtachasi (Ȳ)"],
      rows: [
        ["Control #1..#4", "1, 2, 3, 4 (X̄_C = 2.500)", "3, 4, 7, 8", "5.500"],
        ["Treatment #1..#4", "3, 4, 5, 6 (X̄_T = 4.500)", "8, 9, 12, 13", "10.500"],
        ["Raw Difference", "ΔX̄ = +2.000", "—", "10.500 - 5.500 = 5.000"],
      ],
      captionUz:
        "Eslatma: n=4/4 bo‘lgan bu kichik synthetic misolda statistik significance haqida xulosa qilmaymiz.",
    },
    keyTakeawayUz:
      "E’tibor bering: Treatment guruhining eksperimentdan oldingi o‘rtachasi (X̄_T = 4.500) Control guruhinikidan (X̄_C = 2.500) ancha yuqori.",
  },
  {
    stepNumber: 5,
    id: "cuped-step-5",
    depth: "understand",
    title: "5-qadam: Pooled X mean va Theta = Cov(X,Y) / Var(X) ni hisoblash",
    objectiveUz:
      "Birlashgan (pooled) tanlanma bo‘yicha X o‘rtachasi, kovariatsiya, dispersiya va θ koeffitsiyentini aniq topish.",
    explanationUz:
      "Har ikkala guruhdagi barcha 8 ta kuzatuvni birlashtirib (pooled sample), X ning umumiy o‘rtachasini va θ koeffitsiyentini hisoblaymiz:\n• X = [1, 2, 3, 4, 3, 4, 5, 6] → Pooled X mean: X̄ = 28 / 8 = 3.500.\n• Y = [3, 4, 7, 8, 8, 9, 12, 13] → Pooled Y mean: Ȳ = 64 / 8 = 8.000.\n• ∑(X_i − X̄)² = (-2.5)² + (-1.5)² + (-0.5)² + 0.5² + (-0.5)² + 0.5² + 1.5² + 2.5² = 18.0.\n• ∑(X_i − X̄)(Y_i − Ȳ) = 12.5 + 6.0 + 0.5 + 0 + 0 + 0.5 + 6.0 + 12.5 = 38.0.\n• θ = Cov(X, Y) / Var(X) = 38.0 / 18.0 = 19 / 9 ≈ 2.111111.",
    formulaLatex: "\\theta = \\frac{\\operatorname{Cov}(X, Y)}{\\operatorname{Var}(X)} = \\frac{38}{18} \\approx 2.111111",
    keyTakeawayUz:
      "Cov(X,Y) va Var(X) bir xil maxrajga (N yoki N-1) bo‘lingani sababli θ nisbati har ikkala holatda aynan 38/18 = 2.111111 chiqadi.",
  },
  {
    stepNumber: 6,
    id: "cuped-step-6",
    depth: "understand",
    title: "6-qadam: Y_adjusted qiymatlari va Adjusted Difference (0.778)",
    objectiveUz:
      "Har bir guruh uchun CUPED orqali tekislangan o‘rtachalarni (7.611 va 8.389) hamda adjusted farqni (0.778) hisoblash.",
    explanationUz:
      "Endi Y_adjusted = Y − θ(X − X̄) formulasini qo‘llaymiz:\n• Control adjusted mean: Ȳ_C,adj = 5.500 − 2.111111 × (2.500 − 3.500) = 5.500 + 2.111111 = 7.611.\n• Treatment adjusted mean: Ȳ_T,adj = 10.500 − 2.111111 × (4.500 − 3.500) = 10.500 − 2.111111 = 8.389.\n• Adjusted difference: 8.389 − 7.611 = 0.778 (aniq kasrda 7/9).\nKo‘rib turibmizki, raw effect 5.000 edi, adjusted effect esa 0.778 bo‘ldi — chunki bu kichik misolda Treatment guruhi oldindan faolroq (X̄_T = 4.5 vs X̄_C = 2.5) edi!",
    formulaLatex: "\\overline{Y}_{T,\\text{adj}} - \\overline{Y}_{C,\\text{adj}} = 8.389 - 7.611 = 0.778",
    calculationTable: {
      headers: ["Ko‘rsatkich", "Qiymat", "Izoh"],
      rows: [
        ["Pooled X mean (X̄)", "3.500", "8 ta kuzatuvning umumiy pre-period o‘rtachasi"],
        ["Theta (θ)", "2.111111", "Cov(X,Y) / Var(X) = 38 / 18"],
        ["Control adjusted mean", "7.611", "5.500 - 2.111111 × (2.500 - 3.500)"],
        ["Treatment adjusted mean", "8.389", "10.500 - 2.111111 × (4.500 - 3.500)"],
        ["Adjusted difference", "0.778", "Raw 5.000 dan pre-period nomutanosiblik ayrildi"],
      ],
    },
    keyTakeawayUz:
      "Kichik tanlanmada guruhlarning boshlang‘ich X o‘rtachalari farq qilsa, CUPED raw farqni o‘sha pre-period farqqa mos ravishda tuzatadi.",
  },
  {
    stepNumber: 7,
    id: "cuped-step-7",
    depth: "understand",
    title: "7-qadam: Vizual laboratoriya — X/Y nuqtalar, Theta va Covariate Imbalance",
    objectiveUz:
      "Quyidagi interaktiv laboratoriyada 8 ta nuqtani, θ qiyaligini va pre-period muvozanat slayderini jonli sinab ko‘rish.",
    explanationUz:
      "Pastdagi interaktiv CUPED laboratoriyasida:\n1) «Namuna (8 kuzatuv)» tugmasini bosing — jadvaldagi 3.500, 2.111111, 7.611, 8.389 va 0.778 sonlarini tekshiring;\n2) «Muvozanatlangan X (ΔX = -2)» rejimini tanlang — bunda Treatment va Control guruhlarining pre-period X qiymatlari tenglashadi (X̄_T = X̄_C = 2.500), natijada Raw Difference (5.000) va Adjusted Difference (5.000) bir xil qolib, guruh ichidagi dispersiya keskin kamayadi;\n3) «Var(X) = 0» tugmasini bosib, nol maxraj xavfsizligini tekshiring.",
    keyTakeawayUz:
      "Katta va to‘g‘ri randomizatsiyalangan eksperimentda E[X̄_T - X̄_C] = 0 bo‘lgani uchun CUPED o‘rtacha bahoni siljitmasdan dispersiyani qisqartiradi.",
  },
  {
    stepNumber: 8,
    id: "cuped-step-8",
    depth: "master",
    title: "8-qadam: Matematik ehtiyotkorlik — Pre-treatment sharti va Var(X) = 0 himoyasi",
    objectiveUz:
      "Nima uchun X treatment’dan keyin o‘lchansa natija buzilishini (post-treatment bias) va Var(X) = 0 chegaraviy holatini tahlil qilish.",
    explanationUz:
      "Amaliyotda ikkita jiddiy xatodan himoyalanish shart:\n1) Post-treatment leakage: agar X kovariati eksperiment boshlanganidan KEYIN o‘lchangan bo‘lsa va treatment X ga ham ta’sir qilsa, Y − θ(X − X̄) formulasi haqiqiy treatment effektining bir qismini o‘chirib yuboradi (over-adjustment bias).\n2) Zero variance: agar barcha foydalanuvchilarda X bir xil son bo‘lsa, Var(X) = 0 bo‘ladi va θ = Cov(X,Y)/Var(X) da 0 ga bo‘lish yuzaga keladi. Dasturiy kodda Var(X) < ε bo‘lganda θ = 0 deb olinishi va ogohlantirish qaytarilishi kerak.",
    formulaLatex: "\\operatorname{Var}(X) = 0 \\implies \\theta := 0, \\quad Y_{\\text{adjusted}} = Y",
    keyTakeawayUz:
      "Kovariat faqat eksperiment boshlanishidan oldingi davrdan olinishi va kodda har doim Var(X) = 0 tekshiruvi bo‘lishi shart.",
  },
  {
    stepNumber: 9,
    id: "cuped-step-9",
    depth: "master",
    title: "9-qadam: Toza Python implementatsiyasi (examples/python/cuped_demo.py)",
    objectiveUz:
      "Hech qanday uchinchi tomon kutubxonasisiz yozilgan cuped_demo.py kodini satrma-satr o‘qish va ishga tushirish.",
    explanationUz:
      "Loyihadagi `examples/python/cuped_demo.py` skripti hech qanday tashqi kutubxonasiz (pure Python) 8 ta kuzatuv uchun Cov(X,Y), Var(X), θ va adjusted mean qiymatlarini hisoblaydi hamda `_self_test()` orqali barcha oraliq sonlarni tekshiradi.",
    codeSnippet: `def compute_cuped(observations):
    xs = [o.x_pre for o in observations]
    ys = [o.y_post for o in observations]
    x_bar = sum(xs) / len(xs)
    y_bar = sum(ys) / len(ys)

    sum_sq_x = sum((x - x_bar) ** 2 for x in xs)
    sum_cross_xy = sum((x - x_bar) * (y - y_bar) for x, y in zip(xs, ys))
    theta = 0.0 if abs(sum_sq_x) < 1e-12 else (sum_cross_xy / sum_sq_x)

    adjusted = [y - theta * (x - x_bar) for x, y in zip(xs, ys)]
    return x_bar, theta, adjusted

# Run: python examples/python/cuped_demo.py
# Output: Pooled X mean = 3.500, Theta = 2.111111, Adj diff = 0.778`,
    keyTakeawayUz:
      "Terminalda `python examples/python/cuped_demo.py` buyrug‘ini ishga tushirib, aynan shu natijalarni olishingiz mumkin.",
  },
];

const CUPED_CHECKPOINT_QUESTIONS: DsQuizQuestion[] = [
  {
    id: "cuped-q1",
    promptUz:
      "1. Nega CUPED kovariati X aynan eksperiment (treatment) boshlanishidan oldin o‘lchangan bo‘lishi shart?",
    options: [
      "Chunki X treatment ta’sirida o‘zgarsa, Y - θ(X - X̄) haqiqiy treatment effektining bir qismini ham ayirib yuboradi (post-treatment bias)",
      "Chunki Python faqat manfiy vaqtdagi sonlarni qo‘sha oladi",
      "Chunki post-period ma’lumotlar har doim butun son bo‘ladi",
      "Farqi yo‘q, X eksperiment tugagandan keyin o‘lchansa ham bo‘ladi",
    ],
    correctIndex: 0,
    explanationUz:
      "Agar treatment X ga ham ta’sir o‘tkazsa, X orqali tekislash treatment effektining o‘zini yashirib qo‘yadi.",
  },
  {
    id: "cuped-q2",
    promptUz:
      "2. 8 ta kuzatuvli namunaviy misolda Pooled X mean = 3.500 va θ = 2.111111 bo‘lganda, Raw difference (5.000) va Adjusted difference (0.778) nega farq qildi?",
    options: [
      "Chunki kichik tanlanmada Treatment guruhining boshlang‘ich X o‘rtachasi (4.500) Control guruhinikidan (2.500) yuqori edi va CUPED shu pre-period farqni hisobga oldi",
      "Chunki θ manfiy son chiqdi",
      "Chunki Var(X) = 0 bo‘lib qoldi",
      "Chunki Control guruhida kuzatuvlar soni 0 ga teng edi",
    ],
    correctIndex: 0,
    explanationUz:
      "Δ_adj = Δ_raw - θ(X̄_T - X̄_C) = 5.000 - 2.111111 × (4.500 - 2.500) = 5.000 - 4.222222 = 0.777778 ≈ 0.778.",
  },
  {
    id: "cuped-q3",
    promptUz:
      "3. Agar barcha foydalanuvchilarda pre-experiment X ko‘rsatkichi bir xil bo‘lib, Var(X) = 0 bo‘lsa, dastur θ ni qanday qayta ishlashi kerak?",
    options: [
      "0 ga bo‘lish (NaN/Infinity) xatosining oldini olish uchun θ = 0 deb olishi, Y_adjusted = Y qoldirishi va ogohlantirish chiqarishi kerak",
      "θ = 1000 deb olishi kerak",
      "Barcha Y qiymatlarini 0 ga tenglashtirishi kerak",
      "Manfiy ildiz chiqarishi kerak",
    ],
    correctIndex: 0,
    explanationUz:
      "Var(X) = 0 bo‘lganda X hech qanday qo‘shimcha ma’lumot bermaydi, shuning uchun θ = 0 olinadi va Y o‘zgarmaydi.",
  },
];

// ---------------------------------------------------------------------------
// Complete Authored Vertical Slice 2:
// `dsx-07-c013` — Central Limit Theorem (CLT) va Confidence Interval tajribasi
// ---------------------------------------------------------------------------

const CLT_DEEP_DIVE_STEPS: DsAtomicStep[] = [
  {
    stepNumber: 1,
    id: "clt-step-1",
    depth: "overview",
    title: "1-qadam: Populyatsiya qiyshiq bo‘lsa ham, o‘rtachalar taqsimoti qanday shakl oladi?",
    objectiveUz:
      "Populyatsiya taqsimoti (Population distribution) va tanlanma o‘rtachalari taqsimoti (Sampling distribution of the mean) farqini tushunish.",
    explanationUz:
      "Haqiqiy biznes ma’lumotlari (masalan, foydalanuvchi xarid summasi yoki sahifada o‘tkazgan vaqti) deyarli hech qachon simmetrik qo‘ng‘iroq (Normal) shaklida bo‘lmaydi — ular kuchli o‘ngga qiyshaygan (skewed) yoki ikki cho‘qqili (bimodal) bo‘ladi. Markaziy Limit Teoremasi (CLT) shuni ko‘rsatadiki: agar biz populyatsiyadan n hajmli mustaqil tanlanmalarni qayta-qayta olib, har birining o‘rtachasini (X̄) hisoblasak, n yetarlicha katta bo‘lganda o‘sha X̄ o‘rtachalarining taqsimoti Normal taqsimotga yaqinlashadi!",
    keyTakeawayUz:
      "CLT bitta kuzatuv X ning normal bo‘lishini emas, balki tanlanma o‘rtachasi X̄ ning taqsimoti normalga yaqinlashishini ifodalaydi.",
  },
  {
    stepNumber: 2,
    id: "clt-step-2",
    depth: "understand",
    title: "2-qadam: Standard Deviation (σ) va Standard Error (SE = σ / √n) farqi",
    objectiveUz:
      "Tanlanma hajmi n 4 marta oshganda Standard Error 2 marta qisqarishini formula va interaktiv CLT simulyatorida tekshirish.",
    explanationUz:
      "Populyatsiya standart chetlanishi σ — alohida kuzatuvlarning o‘rtachadan qanchalik tarqoq ekanini bildiradi (u n ga bog‘liq emas). Standard Error (SE) esa tanlanma o‘rtachasi X̄ ning haqiqiy μ atrofida qanchalik tebranishini o‘lchaydi:\n• n = 4 bo‘lganda SE = σ / √4 = σ / 2;\n• n = 25 bo‘lganda SE = σ / √25 = σ / 5;\n• n = 100 bo‘lganda SE = σ / √100 = σ / 10.",
    formulaLatex: "\\text{SE}(\\overline{X}) = \\frac{\\sigma}{\\sqrt{n}}, \\quad \\text{CI}_{95\\%} = \\overline{X} \\pm 1.96 \\cdot \\text{SE}",
    keyTakeawayUz:
      "95% Confidence Interval — xuddi shu usulda qurilgan intervallarning taxminan 95 foizi haqiqiy populyatsiya o‘rtachasi μ ni o‘z ichiga oladi deganidir.",
  },
  {
    stepNumber: 3,
    id: "clt-step-3",
    depth: "master",
    title: "3-qadam: Confidence Interval haqida keng tarqalgan xato va cheklovlar",
    objectiveUz:
      "Og‘ir dumli (heavy-tailed) taqsimotlarda kichik n uchun CLT sekin yaqinlashishini va CI talqinini tushunish.",
    explanationUz:
      "Klassik talqin: μ — o‘zgarmas parametr, [X̄ - 1.96·SE, X̄ + 1.96·SE] intervali esa tanlanmadan tanlanmaga o‘zgaradigan tasodifiy intervaldir. Shuningdek, agar populyatsiyada ekstremal outlierlar ko‘p bo‘lsa, n = 5 yoki n = 10 da normal yaqinlashuv yetarli bo‘lmasligi mumkin.",
    keyTakeawayUz:
      "Pastdagi CLT Monte-Karlo laboratoriyasida qiyshiq (Skewed) va ikki cho‘qqili (Bimodal) taqsimotlar uchun n ni 2 dan 60 gacha o‘zgartirib, SE va 95% CI qamrovini kuzating.",
  },
];

const CLT_CHECKPOINT_QUESTIONS: DsQuizQuestion[] = [
  {
    id: "clt-q1",
    promptUz:
      "Agar populyatsiya standart chetlanishi σ = 12 bo‘lsa va tanlanma hajmi n = 36 bo‘lsa, tanlanma o‘rtachasining Standard Error (SE) qiymati nechaga teng?",
    options: ["2.0", "12.0", "0.333", "6.0"],
    correctIndex: 0,
    explanationUz: "SE = σ / √n = 12 / √36 = 12 / 6 = 2.0.",
  },
];

// ---------------------------------------------------------------------------
// Complete Authored Vertical Slice 3:
// `dsx-14-c011` — Ratio Metrics (CTR) va Delta Method Variance
// ---------------------------------------------------------------------------

const DELTA_METHOD_STEPS: DsAtomicStep[] = [
  {
    stepNumber: 1,
    id: "delta-step-1",
    depth: "overview",
    title: "1-qadam: Ratio of Sums (∑N / ∑D) va Mean of User Ratios farqi",
    objectiveUz:
      "CTR kabi kasr metrikalarda eksperiment birligi (user) va hodisa birligi (impression) orasidagi farqni tushunish.",
    explanationUz:
      "Masalan, CTR = Jami kliklar (N) / Jami ko‘rishlar (D). Randomizatsiya foydalanuvchi (user) darajasida bo‘ladi, ammo har bir foydalanuvchi turlicha miqdorda sahifa ko‘radi (D_i). Shu sababli umumiy CTR ni hisoblashda Ratio of Sums (R̂ = ∑N_i / ∑D_i = N̄ / D̄) bilan har bir userning CTR larini o‘rtachalash (Mean of Ratios = (1/k)∑(N_i / D_i)) bir-biridan farq qiladi!",
    formulaLatex: "\\widehat{R} = \\frac{\\sum_{i=1}^k N_i}{\\sum_{i=1}^k D_i} = \\frac{\\overline{N}}{\\overline{D}}",
    keyTakeawayUz:
      "Bundan tashqari, D_i = 0 bo‘lgan foydalanuvchilarda N_i / D_i nolga bo‘lish xatosini keltirib chiqaradi.",
  },
  {
    stepNumber: 2,
    id: "delta-step-2",
    depth: "understand",
    title: "2-qadam: Delta Method — birinchi tartibli Taylor yaqinlashuvi orqali dispersiya",
    objectiveUz:
      "N_i va D_i bir xil foydalanuvchiga tegishli bo‘lgani uchun ularning kovariatsiyasini hisobga oluvchi Delta Method formulasini qo‘llash.",
    explanationUz:
      "Bir foydalanuvchining ko‘rishlari (D_i) va kliklari (N_i) o‘zaro bog‘liq (korrelyatsiyalangan). Shu sababli oddiy binomial formula ishlamaydi. Delta Method ikki o‘zgaruvchili N̄ / D̄ funksiyasini birinchi tartibli Taylor qatoriga yoyib, R̂ dispersiyasini quyidagicha baholaydi:",
    formulaLatex:
      "\\operatorname{Var}(\\widehat{R}) \\approx \\frac{1}{k \\cdot \\overline{D}^2} \\left( \\operatorname{Var}(N) - 2\\widehat{R}\\operatorname{Cov}(N, D) + \\widehat{R}^2\\operatorname{Var}(D) \\right)",
    keyTakeawayUz:
      "Cov(N, D) > 0 bo‘lganda -2·R̂·Cov(N, D) hadi umumiy dispersiyani kamaytiradi — buni hisobga olmaslik xato SE beradi.",
  },
  {
    stepNumber: 3,
    id: "delta-step-3",
    depth: "master",
    title: "3-qadam: Nol denominator himoyasi va interaktiv Ratio Metrics laboratoriyasi",
    objectiveUz:
      "Pastdagi Ratio Metrics va Delta Method laboratoriyasida foydalanuvchi klik/ko‘rishlarini o‘zgartirib, SE va 95% CI ni tekshirish.",
    explanationUz:
      "Agar D̄ = 0 bo‘lsa, kasr aniqlanmaydi. Quyidagi laboratoriyada 6 ta foydalanuvchining (N_i, D_i) juftliklaridan Ratio of Sums, Mean of Ratios, Cov(N, D) va Delta Method 95% ishonch oralig‘i jonli hisoblanadi.",
    keyTakeawayUz:
      "Metrika shartnomasida (Metric Definition Contract) har doim numerator, denominator, unit of analysis va D=0 qoidasi aniq yozilishi shart.",
  },
];

const DELTA_CHECKPOINT_QUESTIONS: DsQuizQuestion[] = [
  {
    id: "delta-q1",
    promptUz:
      "Nima uchun foydalanuvchi darajasida randomizatsiyalangan eksperimentda CTR (jami klik / jami impression) dispersiyasini oddiy Bernulli p(1-p)/N formulasi bilan hisoblab bo‘lmaydi?",
    options: [
      "Chunki bitta foydalanuvchining bir nechta impression va kliklari o‘zaro mustaqil emas — N_i va D_i tasodifiy miqdorlar bo‘lib, Delta Method orqali Var(N), Var(D) va Cov(N,D) hisobga olinishi kerak",
      "Chunki CTR har doim 1 dan katta bo‘ladi",
      "Chunki impressionlar soni har doim manfiy bo‘ladi",
      "Chunki Bernulli formulasi faqat matritsalar uchun ishlaydi",
    ],
    correctIndex: 0,
    explanationUz:
      "Randomization unit (user) va analysis event (impression) farq qilganda klaster ichidagi korrelyatsiyani Delta Method hisobga oladi.",
  },
];

// ---------------------------------------------------------------------------
// Load & Enrich the 20-Phase, 309-Node Data Scientist Deep-Dive Registry
// ---------------------------------------------------------------------------

interface RawDsJsonNode {
  id: string;
  title: string;
  contentRef: string;
  contentPolicy: DsNodeContentPolicy;
  status: string;
  sourceSection: string;
  depthPolicy?: string;
  targetDepths?: LearningDepth[];
  publishedDepths?: LearningDepth[];
  sourceRefs: string[];
  claimedSourceText?: boolean;
}

interface RawDsJsonPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  prerequisitePhaseIds: string[];
  coreOrSupporting: "core" | "supporting" | "advanced";
  teachingFocus: string;
  visualizationConcept: string;
  miniProject: string;
  resourceIds: string[];
  lessonNodes: RawDsJsonNode[];
}

const rawData = rawDsDeepCurriculum as unknown as {
  curriculumId: string;
  phaseCount: number;
  nodeCount: number;
  existingContentRefs: number;
  newPlannedContentEntries: number;
  phases: RawDsJsonPhase[];
  resourceIndex: Record<string, DsResourceLead>;
};

export const DS_RESOURCE_INDEX: Readonly<Record<string, DsResourceLead>> =
  rawData.resourceIndex;

function enrichNode(
  rawNode: RawDsJsonNode,
  phase: RawDsJsonPhase,
  nodeIndex: number,
): DsCurriculumNode {
  const prevNodeRef =
    nodeIndex > 0 ? phase.lessonNodes[nodeIndex - 1]?.contentRef ?? null : null;
  const defaultPrereqs = prevNodeRef ? [prevNodeRef] : [];

  // 1. Sample-authored complete vertical slice: CUPED (`dsx-12-c011` and `mlds-15-05`)
  if (rawNode.contentRef === "dsx-12-c011" || rawNode.contentRef === "mlds-15-05") {
    return {
      id: rawNode.id,
      phaseId: phase.id,
      phaseOrder: phase.order,
      title: rawNode.title,
      contentRef: rawNode.contentRef,
      contentPolicy: rawNode.contentPolicy,
      status: "sample-authored",
      sourceSection: rawNode.sourceSection,
      sourceRefs: ["cuped-booking", ...rawNode.sourceRefs],
      targetDepths: ["overview", "understand", "master"],
      publishedDepths: ["overview", "understand", "master"],
      learningObjectiveUz:
        "O‘quvchi pre-experiment covariate X, theta = Cov(X,Y)/Var(X), outcome adjustment Y_adjusted = Y - theta(X - X̄) va guruhlar farqini tushuntirib, 8 ta illustrativ kuzatuvda CUPED ni hisoblay oladi.",
      prerequisiteRefs: ["mlds-15-03", "mlds-15-04", "mlds-14-01"],
      interactiveLabId: "cuped-deep-dive",
      manimAssetPath: "/animations/ab_experiment.mp4",
      pythonRunnablePath: "examples/python/cuped_demo.py",
      steps: CUPED_DEEP_DIVE_STEPS,
      checkpointQuestions: CUPED_CHECKPOINT_QUESTIONS,
    };
  }

  // 2. Authored vertical slice: CLT & Confidence Interval (`dsx-07-c013` / `mlds-13-07`)
  if (rawNode.contentRef === "dsx-07-c013" || rawNode.contentRef === "mlds-13-07") {
    return {
      id: rawNode.id,
      phaseId: phase.id,
      phaseOrder: phase.order,
      title: rawNode.title,
      contentRef: rawNode.contentRef,
      contentPolicy: rawNode.contentPolicy,
      status: "sample-authored",
      sourceSection: rawNode.sourceSection,
      sourceRefs: ["stanford-intro-statistics", "statquest"],
      targetDepths: ["overview", "understand", "master"],
      publishedDepths: ["overview", "understand", "master"],
      learningObjectiveUz:
        "Markaziy Limit Teoremasi (CLT), Standard Error SE = σ/√n va 95% Confidence Interval qamrovini Monte-Karlo simulyatsiyasida tekshirish.",
      prerequisiteRefs: ["mlds-13-01", "mlds-13-06"],
      interactiveLabId: "clt-simulator",
      steps: CLT_DEEP_DIVE_STEPS,
      checkpointQuestions: CLT_CHECKPOINT_QUESTIONS,
    };
  }

  // 3. Authored vertical slice: Ratio Metrics & Delta Method (`dsx-14-c011` / `mlds-15-14`)
  if (rawNode.contentRef === "dsx-14-c011" || rawNode.contentRef === "mlds-15-14") {
    return {
      id: rawNode.id,
      phaseId: phase.id,
      phaseOrder: phase.order,
      title: rawNode.title,
      contentRef: rawNode.contentRef,
      contentPolicy: rawNode.contentPolicy,
      status: "sample-authored",
      sourceSection: rawNode.sourceSection,
      sourceRefs: ["delta-microsoft"],
      targetDepths: ["overview", "understand", "master"],
      publishedDepths: ["overview", "understand", "master"],
      learningObjectiveUz:
        "Ratio of Sums (∑N/∑D) va Mean of Ratios farqini hamda Delta Method orqali CTR dispersiyasini hisoblashni o‘rganish.",
      prerequisiteRefs: ["mlds-15-12", "mlds-15-13"],
      interactiveLabId: "delta-method-ratio",
      steps: DELTA_METHOD_STEPS,
      checkpointQuestions: DELTA_CHECKPOINT_QUESTIONS,
    };
  }

  // 4. Reuse-existing nodes that point to an already published `mlds-*` vertical slice
  if (rawNode.contentPolicy === "reuse-existing") {
    const existingLookup = getMlDsMicroLesson(rawNode.contentRef);
    const existingLesson: MlDsMicroLesson | undefined = existingLookup?.lesson;
    if (existingLesson && existingLesson.status === "published") {
      return {
        id: rawNode.id,
        phaseId: phase.id,
        phaseOrder: phase.order,
        title: rawNode.title,
        contentRef: rawNode.contentRef,
        contentPolicy: "reuse-existing",
        status: "published",
        sourceSection: rawNode.sourceSection,
        sourceRefs: rawNode.sourceRefs,
        targetDepths: existingLesson.targetDepths,
        publishedDepths: existingLesson.publishedDepths,
        learningObjectiveUz: existingLesson.notes,
        prerequisiteRefs: existingLesson.prerequisites,
        interactiveLabId:
          existingLesson.visualizationId === "confusion-matrix-explorer"
            ? "confusion-matrix"
            : existingLesson.visualizationId === "ab-cuped-explorer"
              ? "ab-cuped"
              : "gradient-descent-1d",
      };
    }

    return {
      id: rawNode.id,
      phaseId: phase.id,
      phaseOrder: phase.order,
      title: rawNode.title,
      contentRef: rawNode.contentRef,
      contentPolicy: "reuse-existing",
      status: "linked-to-existing-planned-content",
      sourceSection: rawNode.sourceSection,
      sourceRefs: rawNode.sourceRefs,
      targetDepths: ["overview", "understand", "master"],
      publishedDepths: [],
      learningObjectiveUz:
        existingLesson?.notes ??
        `Ushbu mavzu ML & Data Science 31-bosqichli dasturining «${rawNode.contentRef}» darsi bilan umumiy hisoblanadi.`,
      prerequisiteRefs: existingLesson?.prerequisites ?? defaultPrereqs,
    };
  }

  // 5. Proposed extension nodes (`dsx-*-c*`) remain honestly marked as `planned`
  return {
    id: rawNode.id,
    phaseId: phase.id,
    phaseOrder: phase.order,
    title: rawNode.title,
    contentRef: rawNode.contentRef,
    contentPolicy: "proposed-extension",
    status: "planned",
    sourceSection: rawNode.sourceSection,
    sourceRefs: rawNode.sourceRefs,
    targetDepths: rawNode.targetDepths ?? ["overview", "understand", "master"],
    publishedDepths: [],
    learningObjectiveUz: `Rejadagi chuqurlashtirilgan Data Scientist mikro-darsi (${phase.title} — ${rawNode.sourceSection}).`,
    prerequisiteRefs: defaultPrereqs,
  };
}

export const DS_DEEP_PHASES: readonly DsDeepPhase[] = rawData.phases.map(
  (phase) => ({
    id: phase.id,
    order: phase.order,
    title: phase.title,
    sourceSection: phase.sourceSection,
    prerequisitePhaseIds: phase.prerequisitePhaseIds,
    coreOrSupporting: phase.coreOrSupporting,
    teachingFocus: phase.teachingFocus,
    visualizationConcept: phase.visualizationConcept,
    miniProject: phase.miniProject,
    resourceIds: phase.resourceIds,
    lessonNodes: phase.lessonNodes.map((n, idx) => enrichNode(n, phase, idx)),
  }),
);

export const TOTAL_DS_DEEP_PHASES = DS_DEEP_PHASES.length; // 20
export const TOTAL_DS_DEEP_NODES = DS_DEEP_PHASES.reduce(
  (sum, p) => sum + p.lessonNodes.length,
  0,
); // 309

const nodeByIdMap = new Map<string, DsCurriculumNode>();
const nodeByContentRefMap = new Map<string, DsCurriculumNode>();

for (const phase of DS_DEEP_PHASES) {
  for (const node of phase.lessonNodes) {
    nodeByIdMap.set(node.id, node);
    if (!nodeByContentRefMap.has(node.contentRef)) {
      nodeByContentRefMap.set(node.contentRef, node);
    }
  }
}

export function getDsNodeByIdOrContentRef(
  idOrRef: string,
): DsCurriculumNode | undefined {
  return nodeByIdMap.get(idOrRef) ?? nodeByContentRefMap.get(idOrRef);
}

/**
 * Canonical progress key resolver:
 * Any node with `contentPolicy: "reuse-existing"` shares its completion state
 * via its canonical `contentRef` (`mlds-*`), so completing a lesson in the
 * 31-phase ML/DS view immediately marks it completed in the 20-phase Data Scientist Deep-Dive view (and vice versa).
 */
export function resolveCanonicalProgressKey(
  nodeOrContentRef: DsCurriculumNode | string,
): string {
  if (typeof nodeOrContentRef === "string") {
    const found = getDsNodeByIdOrContentRef(nodeOrContentRef);
    return found ? found.contentRef : nodeOrContentRef;
  }
  return nodeOrContentRef.contentRef;
}

export interface DsDeepValidationReport {
  valid: boolean;
  phaseCount: number;
  totalNodes: number;
  reuseExistingCount: number;
  proposedExtensionCount: number;
  unresolvedReuseRefs: string[];
  duplicateNodeIds: string[];
  missingResourceIds: string[];
}

export function validateDsDeepCurriculum(): DsDeepValidationReport {
  const existingMldsIds = new Set<string>();
  for (const p of ML_DS_PHASES) {
    for (const l of p.lessons) {
      existingMldsIds.add(l.id);
    }
  }

  const seenNodeIds = new Set<string>();
  const duplicateNodeIds: string[] = [];
  const unresolvedReuseRefs: string[] = [];
  const missingResourceIds: string[] = [];
  let reuseExistingCount = 0;
  let proposedExtensionCount = 0;

  for (const phase of DS_DEEP_PHASES) {
    for (const resId of phase.resourceIds) {
      if (!DS_RESOURCE_INDEX[resId]) {
        missingResourceIds.push(`${phase.id}:${resId}`);
      }
    }

    for (const node of phase.lessonNodes) {
      if (seenNodeIds.has(node.id)) {
        duplicateNodeIds.push(node.id);
      }
      seenNodeIds.add(node.id);

      if (node.contentPolicy === "reuse-existing") {
        reuseExistingCount++;
        if (!existingMldsIds.has(node.contentRef)) {
          unresolvedReuseRefs.push(`${node.id}->${node.contentRef}`);
        }
      } else {
        proposedExtensionCount++;
      }

      for (const refId of node.sourceRefs) {
        if (!DS_RESOURCE_INDEX[refId]) {
          missingResourceIds.push(`${node.id}:${refId}`);
        }
      }
    }
  }

  return {
    valid:
      DS_DEEP_PHASES.length === 20 &&
      TOTAL_DS_DEEP_NODES === 309 &&
      reuseExistingCount === 152 &&
      proposedExtensionCount === 157 &&
      unresolvedReuseRefs.length === 0 &&
      duplicateNodeIds.length === 0 &&
      missingResourceIds.length === 0,
    phaseCount: DS_DEEP_PHASES.length,
    totalNodes: TOTAL_DS_DEEP_NODES,
    reuseExistingCount,
    proposedExtensionCount,
    unresolvedReuseRefs,
    duplicateNodeIds,
    missingResourceIds,
  };
}
