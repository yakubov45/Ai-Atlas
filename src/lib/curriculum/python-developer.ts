import rawPythonCurriculum from "@/content/curriculum/python-dev-curriculum.json";
import type { LearningDepth, TopicRole } from "@/lib/curriculum/paths";
import type { PythonLabTab } from "@/components/visualizations/FactorialCallStackLab";
import {
  PYTHON_344_PHASES,
  PYTHON_344_LESSONS_MAP,
  type Python344Lesson,
  type Python344PhaseAssessment,
  type PythonQuizQuestionItem,
  type PythonPracticeTaskItem,
  type PythonExampleItem,
  type PythonCommonMistakeItem,
} from "./python-344-curriculum";

export type PythonTrackId =
  | "python-developer"
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist";

export interface PythonAtomicStep {
  stepNumber: number;
  id: string;
  depth: LearningDepth;
  title: string;
  explanationUz: string;
  codeSnippet?: string;
  keyTakeawayUz: string;
}

export interface PythonQuizQuestion {
  id: string;
  promptUz: string;
  options: string[];
  correctIndex: number;
  explanationUz: string;
}

export interface PythonMicroLesson {
  id: string;
  phaseId: string;
  phaseOrder: number;
  order: number;
  title: string;
  status: "published" | "sample-authored" | "planned";
  publishedDepths: LearningDepth[];
  targetDepths: LearningDepth[];
  sourceSection: string;
  prerequisites: string[];
  existingContentCandidate: string | null;
  reusePolicy: "new-planned-content" | "candidate-mapping-require-review";
  learningObjectiveUz: string;
  interactiveLabTab?: PythonLabTab;
  manimAssetPath?: string;
  steps?: PythonAtomicStep[];
  checkpointQuestions?: PythonQuizQuestion[];
  theoryUz?: string;
  examples?: PythonExampleItem[];
  commonMistakes?: PythonCommonMistakeItem[];
  quiz?: PythonQuizQuestionItem[];
  practiceTasks?: PythonPracticeTaskItem[];
  summaryTakeaways?: string[];
  nextLessonId?: string | null;
  prevLessonId?: string | null;
}

export interface PythonDeveloperPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  prerequisitePhaseIds: string[];
  visualizationId: string;
  visualizationConcept: string;
  visualizationStatus: "implemented" | "proposed";
  projectMilestone: string;
  trackPriority: Record<PythonTrackId, TopicRole>;
  lessons: PythonMicroLesson[];
  assessment?: Python344PhaseAssessment;
}

// ---------------------------------------------------------------------------
// Complete Authored Vertical Slice 1:
// `py-10-10` & `py-10-12` — Recursion va Call Stack (`factorial(n)`)
// Source: `Python_Recursion_Micro_Lesson_Namuna.md`
// ---------------------------------------------------------------------------

const RECURSION_FACTORIAL_STEPS: PythonAtomicStep[] = [
  {
    stepNumber: 1,
    id: "py-rec-1",
    depth: "overview",
    title: "1-qadam: Recursion nima va Base Case nega hayotiy zarur?",
    explanationUz:
      "Recursion — funksiyaning o‘z ichida o‘zini qayta chaqirishidir. Har bir chaqiriq masalani bitta kichikroq qadamga qisqartiradi (masalan, 4! ni topish uchun 4 × 3! ni hisoblash). Agar to‘xtash qoidasi — base case (n <= 1) bo‘lmasa, chaqiriqlar cheksiz davom etishga urinadi va Python `RecursionError` xatosini chiqaradi.",
    codeSnippet: `def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    keyTakeawayUz:
      "Har qanday to‘g‘ri rekursiv funksiyada 2 ta qism bo‘lishi shart: 1) Base case (to‘xtash sharti) va 2) Recursive step (base case tomon yaqinlashuvchi qadam).",
  },
  {
    stepNumber: 2,
    id: "py-rec-2",
    depth: "understand",
    title: "2-qadam: Chaqiriqlar zanjiri (Push Phase — Qadam 1..4)",
    explanationUz:
      "`factorial(4)` chaqirilganda Python natijani darhol bilmaydi, shuning uchun chaqiriqlarni Call Stack ustiga ketma-ket taxlaydi (Push):\n1. `factorial(4)` chaqiriladi → `4 > 1`, demak `4 * factorial(3)` hisoblanishi kerak (kutish rejimiga o‘tadi).\n2. `factorial(3)` → `3 * factorial(2)`.\n3. `factorial(2)` → `2 * factorial(1)`.\n4. `factorial(1)` → base case (`n <= 1`): yangi chaqiriq ochmasdan `1` qaytarishga tayyor bo‘ladi.",
    keyTakeawayUz:
      "Base case ga yetmaguncha hech bitta ko‘paytirish amali bajarilmaydi — barcha chaqiriqlar Call Stack’da o‘z kichik chaqirig‘ini kutib turadi.",
  },
  {
    stepNumber: 3,
    id: "py-rec-3",
    depth: "understand",
    title: "3-qadam: Stackdan qaytish (Pop / Return Phase — Qadam 5..8)",
    explanationUz:
      "Base case topilgach, Call Stack tepadan pastga qarab yechila boshlaydi (Unwinding):\n5. `factorial(1)` base case `1` qaytaradi.\n6. `factorial(2)` endi `2 * 1 = 2` qaytaradi.\n7. `factorial(3)` endi `3 * 2 = 6` qaytaradi.\n8. `factorial(4)` endi `4 * 6 = 24` qaytaradi va yakuniy natija olinadi!",
    codeSnippet: `assert factorial(0) == 1
assert factorial(1) == 1
assert factorial(3) == 6
assert factorial(4) == 24`,
    keyTakeawayUz:
      "Pastdagi interaktiv Call Stack laboratoriyasida n = 0..7 ni tanlab, Next/Previous va Play/Pause orqali har bir frame qanday ochilib-yopilishini kuzating.",
  },
  {
    stepNumber: 4,
    id: "py-rec-4",
    depth: "master",
    title: "4-qadam: Chegaraviy holatlar (n=0, n=-1) va Time/Space Complexity",
    explanationUz:
      "Master tahlil:\n• `factorial(0)` nima uchun `1`? — Bo‘sh ko‘paytmaning matematik ta’rifiga ko‘ra `0! = 1`, va funksiyamizda `0 <= 1` sharti darhol 1 ta chaqiriqda `1` qaytaradi.\n• `factorial(-1)` qanday holat? — Manfiy son uchun faktorial aniqlanmagan; `if n < 0: raise ValueError(...)` bo‘lmasa, `-1 <= 1` sharti xato ravishda `1` qaytarib yuborgan bo‘lardi!\n• Vaqt va xotira murakkabligi: `n > 1` uchun `O(n)` ta chaqiriq/ko‘paytirish (Time complexity) va Call Stack’da `O(n)` ta frame (Space complexity). Juda katta `n` da stack to‘lib ketmasligi uchun oddiy `for` loop (`O(1)` qo‘shimcha xotira) afzal.",
    keyTakeawayUz:
      "Konseptual call stack modelini CPython interpretatorining bitma-bit xotira strukturasidan farqlang; katta n uchun iterativ yechim xotirani tejaydi.",
  },
];

const RECURSION_CHECKPOINT_QUESTIONS: PythonQuizQuestion[] = [
  {
    id: "py-rec-q1",
    promptUz: "1. `factorial(3)` chaqirilganda base case qaysi chaqiriqda ishlaydi?",
    options: [
      "factorial(3) chaqirig‘ining o‘zida",
      "factorial(1) chaqirig‘ida (chunki n <= 1 sharti birinchi marta shu yerda True bo‘ladi)",
      "factorial(-1) chaqirig‘ida",
      "Base case umuman ishlamaydi",
    ],
    correctIndex: 1,
    explanationUz:
      "factorial(3) -> factorial(2) -> factorial(1) zanjirida n=1 bo‘lganda `n <= 1` bajariladi va 1 qaytariladi.",
  },
  {
    id: "py-rec-q2",
    promptUz: "2. `factorial(3)` yakunda qanday qiymat qaytaradi?",
    options: ["3", "24", "6", "1"],
    correctIndex: 2,
    explanationUz:
      "factorial(1)=1 -> factorial(2)=2*1=2 -> factorial(3)=3*2=6.",
  },
  {
    id: "py-rec-q3",
    promptUz: "3. `return n * factorial(n - 1)` qatori nimani bildiradi?",
    options: [
      "Funksiyani darhol to‘xtatib `n - 1` ni qaytaradi",
      "Har doim 1 qaytaradi",
      "Cheksiz sikl hosil qiladi",
      "Avval kichikroq masala `factorial(n - 1)` hisoblanishini kutadi, so‘ng qaytgan natijani `n` ga ko‘paytirib qaytaradi",
    ],
    correctIndex: 3,
    explanationUz:
      "Ko‘paytirish amali faqat `factorial(n - 1)` o‘z qiymatini qaytarganidan keyin bajariladi.",
  },
];

// ---------------------------------------------------------------------------
// Complete Authored Vertical Slice 2:
// `py-03-13` / `py-05-18` / `py-06-07` — `is` vs `==`, Aliasing & Mutable Defaults
// ---------------------------------------------------------------------------

const REFERENCE_SEMANTICS_STEPS: PythonAtomicStep[] = [
  {
    stepNumber: 1,
    id: "py-ref-1",
    depth: "overview",
    title: "1-qadam: Qiymat tengligi (`==`) va Obyekt aynanligi (`is`) farqi",
    explanationUz:
      "Python’da `a == b` ikkita o‘zgaruvchining ichidagi qiymatlar tengligini tekshiradi. `a is b` esa ikkita nom xotiradagi AYNAN BITTA obyektga ko‘rsatayotganini tekshiradi.",
    codeSnippet: `a = [10, 20]
b = [10, 20]
print(a == b)  # True (qiymatlari bir xil)
print(a is b)  # False (xotirada ikkita alohida list obyekti)`,
    keyTakeawayUz:
      "Qiymatlarni solishtirish uchun `==`, `None` bilan tekshirish uchun esa doimo `is None` / `is not None` ishlatiladi.",
  },
  {
    stepNumber: 2,
    id: "py-ref-2",
    depth: "understand",
    title: "2-qadam: Aliasing (`b = a`) va Shallow Copy (`b = a.copy()`)",
    explanationUz:
      "`b = a` yozilganda yangi list yaratilmaydi — ikkala nom bitta list obyektiga bog‘lanadi. Shu sababli `b.append(30)` qilinsa, `a` ham `[10, 20, 30]` bo‘lib qoladi. Alohida nusxa olish uchun `b = a.copy()` ishlatiladi.",
    keyTakeawayUz:
      "Mutable (o‘zgaruvchan) obyektlarni (`list`, `dict`, `set`) uzatishda aliasing yon ta’siridan ehtiyot bo‘ling.",
  },
  {
    stepNumber: 3,
    id: "py-ref-3",
    depth: "master",
    title: "3-qadam: Mutable Default Argument Tuzog‘i (`def fn(items=[])`)",
    explanationUz:
      "Python’da funksiyaning default argumenti funksiya chaqirilganda emas, balki `def` qatori bajarilganda BIR MARTA yaratiladi. Agar default sifatida `items=[]` yozilsa, barcha chaqiriqlar bitta listni birgalikda o‘zgartiradi!",
    codeSnippet: `def safe_append(x, items=None):
    if items is None:
        items = []
    items.append(x)
    return items`,
    keyTakeawayUz:
      "Default parametr sifatida hech qachon `[]` yoki `{}` yozmang — `None` ishlatib, funksiya ichida yangi list yarating.",
  },
];

// ---------------------------------------------------------------------------
// Complete Authored Vertical Slice 3:
// `py-10-13` & `py-10-14` — Binary Search Sharti va Step-by-Step O(log n)
// ---------------------------------------------------------------------------

const BINARY_SEARCH_STEPS: PythonAtomicStep[] = [
  {
    stepNumber: 1,
    id: "py-bs-1",
    depth: "overview",
    title: "1-qadam: Binary Search ishlashi uchun eng asosiy shart — Sorted Data",
    explanationUz:
      "Binary Search har qadamda qidiruv oralig‘ining o‘rtasini (`mid`) tekshirib, qolgan yarmini tashlab yuboradi. Bu mantiq faqat ro‘yxat oldindan TARTIBLANGAN (sorted) bo‘lsagina to‘g‘ri ishlaydi!",
    keyTakeawayUz:
      "Tartiblanmagan listda Binary Search qo‘llash qidirilayotgan elementni o‘tkazib yuborishga olib keladi.",
  },
  {
    stepNumber: 2,
    id: "py-bs-2",
    depth: "understand",
    title: "2-qadam: low, mid, high ko‘rsatkichlari va O(log n) tejamkorligi",
    explanationUz:
      "Har qadamda `mid = (low + high) // 2` olinadi. Agar `arr[mid] < target` bo‘lsa `low = mid + 1`, agar `arr[mid] > target` bo‘lsa `high = mid - 1` qilinadi. 1 000 000 ta elementda ko‘pi bilan 20 ta solishtirish yetarli!",
    codeSnippet: `def binary_search(arr: list[int], target: int) -> int:
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    keyTakeawayUz:
      "Pastdagi laboratoriyada tartiblangan va tartiblanmagan ro‘yxatda Binary Search hamda Linear Search qadamlarini solishtiring.",
  },
];

// ---------------------------------------------------------------------------
// Load & Enrich the 20-Phase, 344-Micro-Lesson Python Developer Registry
// ---------------------------------------------------------------------------

interface RawPythonLesson {
  id: string;
  order: number;
  title: string;
  status: string;
  publishedDepths: LearningDepth[];
  targetDepths: LearningDepth[];
  sourceRefs: { source: string; section: string; kind: string }[];
  prerequisites: string[];
  visualizationIds: string[];
  existingContentCandidate: string | null;
  reusePolicy: "new-planned-content" | "candidate-mapping-require-review";
}

interface RawPythonPhase {
  id: string;
  order: number;
  title: string;
  sourceSection: string;
  prerequisitePhaseIds: string[];
  visualization: {
    id: string;
    concept: string;
    status: string;
  };
  projectMilestone: string;
  trackPriority: Record<PythonTrackId, TopicRole>;
  lessons: RawPythonLesson[];
}

const rawData = rawPythonCurriculum as unknown as {
  curriculumId: string;
  counts: {
    phases: number;
    lessonNodes: number;
    existingContentCandidates: number;
    proposedNewNodes: number;
  };
  phases: RawPythonPhase[];
};

const RECURSION_SLICE_IDS = new Set(["py-10-10", "py-10-11", "py-10-12"]);
const REFERENCE_SLICE_IDS = new Set(["py-03-13", "py-05-17", "py-05-18", "py-06-07"]);
const BINARY_SEARCH_SLICE_IDS = new Set(["py-10-13", "py-10-14", "py-10-15"]);

export const PYTHON_DEV_PHASES: readonly PythonDeveloperPhase[] =
  rawData.phases.map((rawPhase) => {
    const isPhaseImplemented =
      rawPhase.id === "py-10" ||
      rawPhase.id === "py-03" ||
      rawPhase.id === "py-05" ||
      rawPhase.id === "py-06";

    const phaseAssessment = PYTHON_344_PHASES.find((p) => p.id === rawPhase.id)?.assessment;

    const lessons: PythonMicroLesson[] = rawPhase.lessons.map((rawLesson) => {
      const rich = PYTHON_344_LESSONS_MAP[rawLesson.id];

      if (RECURSION_SLICE_IDS.has(rawLesson.id)) {
        return {
          id: rawLesson.id,
          phaseId: rawPhase.id,
          phaseOrder: rawPhase.order,
          order: rawLesson.order,
          title: rawLesson.title,
          status: "sample-authored",
          publishedDepths: ["overview", "understand", "master"],
          targetDepths: ["overview", "understand", "master"],
          sourceSection: rawPhase.sourceSection,
          prerequisites:
            rawLesson.id === "py-10-10"
              ? ["py-06-01", "py-06-03", "py-09-01"]
              : rawLesson.prerequisites,
          existingContentCandidate: rawLesson.existingContentCandidate,
          reusePolicy: rawLesson.reusePolicy,
          learningObjectiveUz:
            "Talaba recursion nima ekanini, base case nima uchun zarurligini va funksiyalar qanday qaytishini factorial(4) misolida bosqichma-bosqich hisoblay oladi.",
          interactiveLabTab: "factorial-stack",
          manimAssetPath: "/animations/factorial_call_stack.mp4",
          steps: RECURSION_FACTORIAL_STEPS,
          checkpointQuestions: RECURSION_CHECKPOINT_QUESTIONS,
          theoryUz: rich?.theoryUz,
          examples: rich?.examples,
          commonMistakes: rich?.commonMistakes,
          quiz: rich?.quiz,
          practiceTasks: rich?.practiceTasks,
          summaryTakeaways: rich?.summaryTakeaways,
          nextLessonId: rich?.nextLessonId,
          prevLessonId: rich?.prevLessonId,
        };
      }

      if (REFERENCE_SLICE_IDS.has(rawLesson.id)) {
        return {
          id: rawLesson.id,
          phaseId: rawPhase.id,
          phaseOrder: rawPhase.order,
          order: rawLesson.order,
          title: rawLesson.title,
          status: "sample-authored",
          publishedDepths: ["overview", "understand", "master"],
          targetDepths: ["overview", "understand", "master"],
          sourceSection: rawPhase.sourceSection,
          prerequisites: rawLesson.prerequisites,
          existingContentCandidate: rawLesson.existingContentCandidate,
          reusePolicy: rawLesson.reusePolicy,
          learningObjectiveUz:
            "Python’da `==` va `is` farqini, list aliasing (`b = a`) va `.copy()` xatti-harakatini hamda mutable default argument tuzog‘ini tushunish.",
          interactiveLabTab: "reference-semantics",
          steps: REFERENCE_SEMANTICS_STEPS,
          theoryUz: rich?.theoryUz,
          examples: rich?.examples,
          commonMistakes: rich?.commonMistakes,
          quiz: rich?.quiz,
          practiceTasks: rich?.practiceTasks,
          summaryTakeaways: rich?.summaryTakeaways,
          nextLessonId: rich?.nextLessonId,
          prevLessonId: rich?.prevLessonId,
        };
      }

      if (BINARY_SEARCH_SLICE_IDS.has(rawLesson.id)) {
        return {
          id: rawLesson.id,
          phaseId: rawPhase.id,
          phaseOrder: rawPhase.order,
          order: rawLesson.order,
          title: rawLesson.title,
          status: "sample-authored",
          publishedDepths: ["overview", "understand", "master"],
          targetDepths: ["overview", "understand", "master"],
          sourceSection: rawPhase.sourceSection,
          prerequisites: rawLesson.prerequisites,
          existingContentCandidate: rawLesson.existingContentCandidate,
          reusePolicy: rawLesson.reusePolicy,
          learningObjectiveUz:
            "Binary Search ishlashi uchun tartiblanganlik (sorted) shartini va O(log n) vs O(n) qidiruv qadamlarini solishtirish.",
          interactiveLabTab: "binary-search",
          steps: BINARY_SEARCH_STEPS,
          theoryUz: rich?.theoryUz,
          examples: rich?.examples,
          commonMistakes: rich?.commonMistakes,
          quiz: rich?.quiz,
          practiceTasks: rich?.practiceTasks,
          summaryTakeaways: rich?.summaryTakeaways,
          nextLessonId: rich?.nextLessonId,
          prevLessonId: rich?.prevLessonId,
        };
      }

      const synthesizedSteps: PythonAtomicStep[] = [
        {
          stepNumber: 1,
          id: `${rawLesson.id}-step-1`,
          depth: "overview",
          title: `1-qadam: ${rawLesson.title} — Asosiy tushuncha va mexanizm`,
          explanationUz:
            rich?.theoryUz ||
            `Python Developer ${rawPhase.id.toUpperCase()} darsining nazariy asoslari va tushuntirilishi.`,
          codeSnippet: rich?.examples?.[0]?.code,
          keyTakeawayUz:
            rich?.summaryTakeaways?.[0] || `${rawLesson.title} asosiy tushunchasini o'zlashtirish.`,
        },
        {
          stepNumber: 2,
          id: `${rawLesson.id}-step-2`,
          depth: "understand",
          title: `2-qadam: Amaliy namunaviy kod va chuqur tahlil`,
          explanationUz:
            rich?.examples?.[1]?.explanationUz ||
            rich?.examples?.[0]?.explanationUz ||
            rich?.theoryUz ||
            "",
          codeSnippet: rich?.examples?.[1]?.code || rich?.examples?.[0]?.code,
          keyTakeawayUz:
            rich?.summaryTakeaways?.[1] || `${rawLesson.title} amaliy kod namunalarini tahlil qilish.`,
        },
        {
          stepNumber: 3,
          id: `${rawLesson.id}-step-3`,
          depth: "master",
          title: `3-qadam: Keng tarqalgan xatolar va master tahlil`,
          explanationUz:
            rich?.commonMistakes && rich.commonMistakes.length > 0
              ? rich.commonMistakes
                  .map(
                    (m, idx) =>
                      `Xato #${idx + 1}: ${m.mistakeUz}\n• Alomati: ${m.symptomUz}\n• To'g'ri yechim: ${m.correctionUz}`,
                  )
                  .join("\n\n")
              : "Chegaraviy qiymatlar, bo'sh to'plamlar va ma'lumot turlari mosligini doimo tekshirib boring.",
          keyTakeawayUz:
            rich?.summaryTakeaways?.[2] ||
            rich?.summaryTakeaways?.[0] ||
            "Toza va mustahkam Python kodi yozish.",
        },
      ];

      const synthesizedQuiz: PythonQuizQuestion[] =
        rich?.quiz?.map((q) => {
          const hasCode =
            q.promptUz.includes("```python") ||
            (q.codeSnippet && q.promptUz.includes(q.codeSnippet));
          return {
            id: q.id,
            promptUz:
              q.promptUz +
              (!hasCode && q.codeSnippet
                ? `\n\n\`\`\`python\n${q.codeSnippet}\n\`\`\``
                : ""),
            options: q.options,
            correctIndex: q.correctIndex,
            explanationUz: q.explanationUz,
          };
        }) ?? [];

      const stepsToUse: PythonAtomicStep[] =
        rich?.steps && rich.steps.length > 0
          ? rich.steps.map((s) => ({
              stepNumber: s.stepNumber,
              id: s.id,
              depth: s.depth,
              title: s.title,
              explanationUz: s.explanationUz,
              codeSnippet: s.codeSnippet,
              keyTakeawayUz: s.keyTakeawayUz,
            }))
          : synthesizedSteps;

      return {
        id: rawLesson.id,
        phaseId: rawPhase.id,
        phaseOrder: rawPhase.order,
        order: rawLesson.order,
        title: rawLesson.title,
        status: "published",
        publishedDepths: ["overview", "understand", "master"],
        targetDepths: rawLesson.targetDepths ?? ["overview", "understand", "master"],
        sourceSection: rawPhase.sourceSection,
        prerequisites: rawLesson.prerequisites,
        existingContentCandidate: rawLesson.existingContentCandidate,
        reusePolicy: rawLesson.reusePolicy,
        learningObjectiveUz:
          rich?.learningObjectiveUz ||
          `Python Developer ${rawPhase.id.toUpperCase()} (${rawPhase.title}) bosqichidagi mikro-dars. Nazorat ishi: ${rawPhase.projectMilestone}.`,
        steps: stepsToUse,
        checkpointQuestions: synthesizedQuiz,
        theoryUz: rich?.theoryUz,
        examples: rich?.examples,
        commonMistakes: rich?.commonMistakes,
        quiz: rich?.quiz,
        practiceTasks: rich?.practiceTasks,
        summaryTakeaways: rich?.summaryTakeaways,
        nextLessonId: rich?.nextLessonId,
        prevLessonId: rich?.prevLessonId,
      };
    });

    return {
      id: rawPhase.id,
      order: rawPhase.order,
      title: rawPhase.title,
      sourceSection: rawPhase.sourceSection,
      prerequisitePhaseIds: rawPhase.prerequisitePhaseIds,
      visualizationId: rawPhase.visualization.id,
      visualizationConcept: rawPhase.visualization.concept,
      visualizationStatus: isPhaseImplemented ? "implemented" : "proposed",
      projectMilestone: rawPhase.projectMilestone,
      trackPriority: rawPhase.trackPriority,
      assessment: phaseAssessment,
      lessons,
    };
  });

export const TOTAL_PYTHON_DEV_PHASES = PYTHON_DEV_PHASES.length; // 20
export const TOTAL_PYTHON_DEV_LESSONS = PYTHON_DEV_PHASES.reduce(
  (sum, p) => sum + p.lessons.length,
  0,
); // 344

const pythonLessonMap = new Map<string, PythonMicroLesson>();
for (const phase of PYTHON_DEV_PHASES) {
  for (const lesson of phase.lessons) {
    pythonLessonMap.set(lesson.id, lesson);
  }
}

export function getPythonMicroLessonById(
  id: string,
): PythonMicroLesson | undefined {
  return pythonLessonMap.get(id);
}

export interface PythonCurriculumValidationReport {
  valid: boolean;
  phaseCount: number;
  lessonCount: number;
  candidateCount: number;
  proposedNewCount: number;
  duplicateIds: string[];
  missingPrerequisites: string[];
}

export function validatePythonDeveloperCurriculum(): PythonCurriculumValidationReport {
  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];
  const missingPrerequisites: string[] = [];
  let candidateCount = 0;
  let proposedNewCount = 0;

  for (const phase of PYTHON_DEV_PHASES) {
    for (const lesson of phase.lessons) {
      if (seenIds.has(lesson.id)) {
        duplicateIds.push(lesson.id);
      }
      seenIds.add(lesson.id);

      if (lesson.existingContentCandidate !== null) {
        candidateCount++;
      } else {
        proposedNewCount++;
      }
    }
  }

  for (const phase of PYTHON_DEV_PHASES) {
    for (const lesson of phase.lessons) {
      for (const prereq of lesson.prerequisites) {
        if (!seenIds.has(prereq)) {
          missingPrerequisites.push(`${lesson.id}->${prereq}`);
        }
      }
    }
  }

  return {
    valid:
      PYTHON_DEV_PHASES.length === 20 &&
      TOTAL_PYTHON_DEV_LESSONS === 344 &&
      candidateCount === 29 &&
      proposedNewCount === 315 &&
      duplicateIds.length === 0 &&
      missingPrerequisites.length === 0,
    phaseCount: PYTHON_DEV_PHASES.length,
    lessonCount: TOTAL_PYTHON_DEV_LESSONS,
    candidateCount,
    proposedNewCount,
    duplicateIds,
    missingPrerequisites,
  };
}
