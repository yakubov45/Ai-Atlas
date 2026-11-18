/**
 * Deterministic Pedagogical Execution Engines for the Python Developer Curriculum (`python-dev-2026`):
 *
 * 1. Phase 10 (`py-10-10`, `py-10-11`, `py-10-12`): Recursion & Conceptual Call Stack (`factorial(n)` for n = 0..7)
 *    matching `Python_Recursion_Micro_Lesson_Namuna.md`.
 * 2. Phase 03 / 05 / 06 (`py-03-13`, `py-05-18`, `py-06-07`): Python Reference, Equality (`==`) vs Identity (`is`),
 *    Aliasing vs `.copy()`, and the Mutable Default Argument Trap.
 * 3. Phase 08 / 10 (`py-10-13`, `py-10-14`, `py-10-15`): Binary Search (`O(log n)` with sorted precondition check)
 *    vs Linear Search (`O(n)`).
 *
 * Note: This engine models Python's conceptual call stack and object reference semantics
 * deterministically in TypeScript; it does not claim to be a bit-for-bit CPython memory dump.
 */

export interface CallStackFrameItem {
  depth: number;
  argN: number;
  state: "waiting-for-child" | "base-case" | "returning";
  pendingExpression: string;
  resolvedValue: number | null;
}

export interface FactorialTraceStep {
  stepNumber: number;
  phase: "call" | "return";
  activeArgN: number;
  codeLine: 2 | 4 | 5 | 6;
  titleUz: string;
  explanationUz: string;
  expressionText: string;
  returnedValue: number | null;
  stackSnapshot: CallStackFrameItem[];
}

export interface FactorialCallStackTrace {
  inputN: number;
  valid: boolean;
  errorType: "ValueError" | null;
  errorMessage: string | null;
  finalResult: number | null;
  totalCalls: number;
  maxStackDepth: number;
  timeComplexity: "O(1)" | "O(n)";
  spaceComplexity: "O(1)" | "O(n)";
  steps: FactorialTraceStep[];
}

export function factorialValue(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("ValueError: n must be non-negative");
  }
  let acc = 1;
  for (let i = 2; i <= n; i++) {
    acc *= i;
  }
  return acc;
}

/**
 * Generates the exact step-by-step call & return stack trace for `factorial(n)`.
 * For n = 4, produces the exact 8 steps specified in `Python_Recursion_Micro_Lesson_Namuna.md`.
 */
export function computeFactorialCallStack(n: number): FactorialCallStackTrace {
  if (!Number.isInteger(n) || n < 0) {
    return {
      inputN: n,
      valid: false,
      errorType: "ValueError",
      errorMessage: 'ValueError: "n must be non-negative" (n < 0 uchun faktorial aniqlanmagan)',
      finalResult: null,
      totalCalls: 1,
      maxStackDepth: 1,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      steps: [],
    };
  }

  const clampedN = Math.min(7, n);

  // Special case n === 0: 1 call that immediately hits base case `n <= 1`
  if (clampedN === 0) {
    const steps: FactorialTraceStep[] = [
      {
        stepNumber: 1,
        phase: "call",
        activeArgN: 0,
        codeLine: 4,
        titleUz: "factorial(0) chaqiriladi — Base case tekshiruvi",
        explanationUz:
          "factorial(0) chaqirildi. 0 <= 1 sharti bajarilgani uchun rekursiv chaqiriq bo‘lmaydi (base case).",
        expressionText: "factorial(0) → n <= 1 (True)",
        returnedValue: null,
        stackSnapshot: [
          {
            depth: 1,
            argN: 0,
            state: "base-case",
            pendingExpression: "return 1",
            resolvedValue: null,
          },
        ],
      },
      {
        stepNumber: 2,
        phase: "return",
        activeArgN: 0,
        codeLine: 5,
        titleUz: "factorial(0) base case: 1 qaytaradi",
        explanationUz:
          "0! = 1 matematik ta’rifiga ko‘ra, factorial(0) bevosita 1 qiymatini qaytaradi va call stack bo‘shaydi.",
        expressionText: "factorial(0) = 1",
        returnedValue: 1,
        stackSnapshot: [
          {
            depth: 1,
            argN: 0,
            state: "returning",
            pendingExpression: "1",
            resolvedValue: 1,
          },
        ],
      },
    ];

    return {
      inputN: 0,
      valid: true,
      errorType: null,
      errorMessage: null,
      finalResult: 1,
      totalCalls: 1,
      maxStackDepth: 1,
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      steps,
    };
  }

  // For n >= 1 (e.g. n = 4 -> 8 steps: 4 calls down to 1, then 4 returns back up to n)
  const steps: FactorialTraceStep[] = [];
  let stepCounter = 1;

  // Phase A: Push calls from k = clampedN down to 1
  for (let currentArg = clampedN; currentArg >= 1; currentArg--) {
    const isBaseCase = currentArg === 1;
    const stackSnapshot: CallStackFrameItem[] = [];

    for (let k = clampedN; k >= currentArg; k--) {
      const depth = clampedN - k + 1;
      if (k === 1) {
        stackSnapshot.push({
          depth,
          argN: 1,
          state: "base-case",
          pendingExpression: "return 1 (base case: n <= 1)",
          resolvedValue: null,
        });
      } else {
        stackSnapshot.push({
          depth,
          argN: k,
          state: "waiting-for-child",
          pendingExpression: `${k} * factorial(${k - 1})`,
          resolvedValue: null,
        });
      }
    }

    steps.push({
      stepNumber: stepCounter++,
      phase: "call",
      activeArgN: currentArg,
      codeLine: isBaseCase ? 4 : 6,
      titleUz: isBaseCase
        ? `factorial(1) chaqirildi — Base case (n <= 1) topildi!`
        : `factorial(${currentArg}) chaqirildi → ${currentArg} * factorial(${currentArg - 1}) kutilmoqda`,
      explanationUz: isBaseCase
        ? `factorial(1) da n <= 1 sharti True bo‘ldi. Endi yangi rekursiv chaqiriq ochilmaydi.`
        : `${currentArg} > 1 bo‘lgani uchun funksiya natijani darhol bera olmaydi: u stack'da kutib turadi va factorial(${currentArg - 1}) ni chaqiradi.`,
      expressionText: isBaseCase
        ? "factorial(1) → base case (n <= 1)"
        : `factorial(${currentArg}) = ${currentArg} * factorial(${currentArg - 1})`,
      returnedValue: null,
      stackSnapshot,
    });
  }

  // Phase B: Unwind stack from k = 1 up to clampedN
  let runningProduct = 1;
  for (let currentArg = 1; currentArg <= clampedN; currentArg++) {
    const childValue = runningProduct;
    runningProduct = currentArg === 1 ? 1 : currentArg * childValue;

    const stackSnapshot: CallStackFrameItem[] = [];
    for (let k = clampedN; k >= currentArg; k--) {
      const depth = clampedN - k + 1;
      if (k === currentArg) {
        stackSnapshot.push({
          depth,
          argN: k,
          state: "returning",
          pendingExpression:
            k === 1 ? "return 1" : `return ${k} * ${childValue} = ${runningProduct}`,
          resolvedValue: runningProduct,
        });
      } else {
        stackSnapshot.push({
          depth,
          argN: k,
          state: "waiting-for-child",
          pendingExpression: `${k} * factorial(${k - 1})`,
          resolvedValue: null,
        });
      }
    }

    steps.push({
      stepNumber: stepCounter++,
      phase: "return",
      activeArgN: currentArg,
      codeLine: currentArg === 1 ? 5 : 6,
      titleUz:
        currentArg === 1
          ? "factorial(1) base case: 1 qaytaradi"
          : `factorial(${currentArg}) endi ${currentArg} * ${childValue} = ${runningProduct} qaytaradi`,
      explanationUz:
        currentArg === 1
          ? "Base case 1 qiymatini o‘zini chaqirgan yuqoridagi funksiya qavatiga qaytaradi."
          : `factorial(${currentArg - 1}) dan qaytgan ${childValue} qiymati ${currentArg} ga ko‘paytirilib, natija (${runningProduct}) yuqoriga uzatiladi.`,
      expressionText:
        currentArg === 1
          ? "factorial(1) → 1"
          : `factorial(${currentArg}) = ${currentArg} * ${childValue} = ${runningProduct}`,
      returnedValue: runningProduct,
      stackSnapshot,
    });
  }

  return {
    inputN: clampedN,
    valid: true,
    errorType: null,
    errorMessage: null,
    finalResult: runningProduct,
    totalCalls: clampedN,
    maxStackDepth: clampedN,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    steps,
  };
}

// ---------------------------------------------------------------------------
// 2. Python Object Reference, Identity (`is`) vs Equality (`==`), and Mutable Defaults
// ---------------------------------------------------------------------------

export type ReferenceScenarioId = "aliasing" | "shallow-copy" | "mutable-default";

export interface PythonReferenceAnalysis {
  scenarioId: ReferenceScenarioId;
  titleUz: string;
  codeSnippet: string;
  varAValue: string;
  varBValue: string;
  equalityResult: boolean; // a == b
  identityResult: boolean; // a is b
  memoryExplanationUz: string;
  pitfallWarningUz: string;
}

export function analyzePythonReferenceScenario(
  scenarioId: ReferenceScenarioId,
): PythonReferenceAnalysis {
  if (scenarioId === "aliasing") {
    return {
      scenarioId,
      titleUz: "Aliasing: b = a (Bitta list obyektiga ikkita nom)",
      codeSnippet: `a = [10, 20]
b = a          # Yangi list yaratilmadi! b ham a ko'rsatgan obyektga bog'landi
b.append(30)
print(a)       # [10, 20, 30]
print(a == b)  # True (qiymatlari teng)
print(a is b)  # True (aynan bitta xotira obyekti)`,
      varAValue: "[10, 20, 30]",
      varBValue: "[10, 20, 30]",
      equalityResult: true,
      identityResult: true,
      memoryExplanationUz:
        "Python’da assignment (`b = a`) obyektni nusxalamaydi, balki `b` nomini `a` ko‘rsatib turgan aynan o‘sha list obyektiga bog‘laydi (aliasing). Shu sababli `b.append(30)` a ni ham o‘zgartiradi.",
      pitfallWarningUz:
        "Ehtiyot bo‘ling: funksiyaga list uzatib, ichida `.append()` qilsangiz, tashqaridagi asl list ham o‘zgarib ketadi!",
    };
  }

  if (scenarioId === "shallow-copy") {
    return {
      scenarioId,
      titleUz: "Shallow Copy: b = a.copy() (Alohida yangi list obyekti)",
      codeSnippet: `a = [10, 20]
b = a.copy()   # Yangi list obyekti yaratildi
print(a == b)  # True (qiymatlari bir xil: [10, 20])
print(a is b)  # False (ikki xil obyekt!)
b.append(30)
print(a)       # [10, 20] (o'zgarmadi)`,
      varAValue: "[10, 20]",
      varBValue: "[10, 20, 30]",
      equalityResult: false,
      identityResult: false,
      memoryExplanationUz:
        "`a.copy()` (yoki `a[:]`) tashqi list uchun yangi konteyner yaratadi. `append(30)` faqat `b` ni o‘zgartiradi, `a` esa `[10, 20]` holicha qoladi.",
      pitfallWarningUz:
        "`==` qiymatlar tengligini tekshiradi, `is` esa ikkita o‘zgaruvchi aynan bitta obyekt ekanini tekshiradi. `None` ni tekshirishda doimo `x is None` yozing.",
    };
  }

  return {
    scenarioId: "mutable-default",
    titleUz: "Mutable Default Tuzog‘i: def add_item(x, items=[])",
    codeSnippet: `# ❌ XATOLI KOD: default list funksiya e'lon qilinganda BIR MARTA yaratiladi
def bad_append(x, items=[]):
    items.append(x)
    return items

r1 = bad_append("AI")  # ['AI']
r2 = bad_append("ML")  # ['AI', 'ML']  <-- Avvalgi chaqiriq izi qolib ketdi!

# ✅ TO'G'RI KOD: default sifatida None ishlating
def safe_append(x, items=None):
    if items is None:
        items = []
    items.append(x)
    return items`,
    varAValue: "bad_append('ML') → ['AI', 'ML']",
    varBValue: "safe_append('ML') → ['ML']",
    equalityResult: false,
    identityResult: true,
    memoryExplanationUz:
      "Python’da default parametr qiymati (`items=[]`) funksiya har chaqirilganda emas, balki `def` qatori o‘qilgan vaqtda BIR MARTA yaratiladi. Natijada barcha chaqiriqlar bitta umumiy listni to‘ldirib boradi.",
    pitfallWarningUz:
      "Default argument sifatida hech qachon `[]`, `{}` yoki `set()` bermang — har doim `None` berib, funksiya ichida yangi kolleksiya yarating.",
  };
}

// ---------------------------------------------------------------------------
// 3. Binary Search (O(log n)) vs Linear Search (O(n)) Step Comparison
// ---------------------------------------------------------------------------

export interface BinarySearchStep {
  stepNumber: number;
  low: number;
  mid: number;
  high: number;
  midValue: number;
  decisionUz: string;
}

export interface SearchComparisonResult {
  array: readonly number[];
  target: number;
  isSorted: boolean;
  preconditionErrorUz: string | null;
  foundIndex: number;
  linearSearchComparisons: number;
  binarySearchComparisons: number | null;
  binarySteps: BinarySearchStep[];
}

export function compareBinaryAndLinearSearch(
  array: readonly number[],
  target: number,
): SearchComparisonResult {
  let isSorted = true;
  for (let i = 1; i < array.length; i++) {
    if ((array[i] ?? 0) < (array[i - 1] ?? 0)) {
      isSorted = false;
      break;
    }
  }

  let linearComparisons = 0;
  let foundIndex = -1;
  for (let i = 0; i < array.length; i++) {
    linearComparisons++;
    if (array[i] === target) {
      foundIndex = i;
      break;
    }
  }

  if (!isSorted) {
    return {
      array,
      target,
      isSorted: false,
      preconditionErrorUz:
        "Xatolik: Binary Search faqat tartiblangan (sorted) ketma-ketlikda ishlaydi! Tartiblanmagan ro‘yxatda yarmini tashlab yuborish to‘g‘ri elementni yo‘qotib qo‘yadi.",
      foundIndex,
      linearSearchComparisons: linearComparisons,
      binarySearchComparisons: null,
      binarySteps: [],
    };
  }

  const binarySteps: BinarySearchStep[] = [];
  let low = 0;
  let high = array.length - 1;
  let stepNumber = 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midValue = array[mid]!;

    if (midValue === target) {
      binarySteps.push({
        stepNumber: stepNumber++,
        low,
        mid,
        high,
        midValue,
        decisionUz: `Topildi! array[${mid}] == ${target}`,
      });
      break;
    } else if (midValue < target) {
      binarySteps.push({
        stepNumber: stepNumber++,
        low,
        mid,
        high,
        midValue,
        decisionUz: `${midValue} < ${target} → chap yarmini tashlaymiz (low = ${mid + 1})`,
      });
      low = mid + 1;
    } else {
      binarySteps.push({
        stepNumber: stepNumber++,
        low,
        mid,
        high,
        midValue,
        decisionUz: `${midValue} > ${target} → o‘ng yarmini tashlaymiz (high = ${mid - 1})`,
      });
      high = mid - 1;
    }
  }

  return {
    array,
    target,
    isSorted: true,
    preconditionErrorUz: null,
    foundIndex,
    linearSearchComparisons: linearComparisons,
    binarySearchComparisons: binarySteps.length,
    binarySteps,
  };
}
