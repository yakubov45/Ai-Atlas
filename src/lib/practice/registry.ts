/**
 * Practice Lessons Registry
 *
 * Central repository of authored, reviewed, and planned hands-on exercises.
 * Maps canonical lesson IDs and micro-lesson IDs to their practice contract.
 */

import type { LessonPractice, PracticeExample } from "./types";
import type { LearningDepth } from "@/lib/curriculum/paths";
import { PYTHON_344_LESSONS_MAP } from "@/lib/curriculum/python-344-curriculum";
import { getAi291LessonById } from "@/lib/curriculum/ai-engineering-291-dataset";
import { getMlDs520LessonById } from "@/lib/curriculum/ml-ds-520-dataset";
import { getHfLessonById } from "@/lib/curriculum/hf-llm-course";

export const PUBLISHED_PRACTICES: LessonPractice[] = [
  // -------------------------------------------------------------------------
  // 0. Python Foundation: Python Basics, Variables, Memory & Collections
  // -------------------------------------------------------------------------
  {
    id: "prac-py-basics",
    lessonId: "py-01-01",
    aliases: ["python-basics", "basics", "py-basics-canonical"],
    depth: "overview",
    objectiveUz:
      "Python o'zgaruvchilari, dinamik tiplash, xotira modeli (is vs ==), to'plamlar va shart operatorlarini amaliy kodda to'g'ri ishlatish.",
    prerequisites: [],
    theorySteps: [
      {
        id: "th-pyb-1",
        title: "Xotira Modeli va Havolalar (is vs ==)",
        bodyMdx:
          "Python'da o'zgaruvchi qiymatning o'zi emas, balki Heap xotiradagi obyektga ko'rsatkichdir. `==` qiymatlarni solishtiradi, `is` esa xotira manzilini (`id()`) tekshiradi. `b = a` aliasing (bitta obyektga ikki nom) yaratadi; xavfsiz alohida nusxa olish uchun `a.copy()` yoki `list(a)` ishlatiladi.",
      },
      {
        id: "th-pyb-2",
        title: "Dinamik Tiplash va Shart Operatorlari",
        bodyMdx:
          "Python tiplarni dinamik aniqlaydi. `if / elif / else` orqali shartlar yuqoridan pastga tekshiriladi va birinchi to'g'ri kelgan blok bajariladi. Masalani yechishda oddiy 'brute force' (tsikl orqali birma-bir tekshirish) ham, optimallashtirilgan usullar ham birdek qabul qilinadi.",
      },
    ],
    examples: [
      {
        id: "ex-pyb-memory",
        titleUz: "1-misol: Xavfsiz nusxa olish va Aliasing oldini olish",
        explanationUz:
          "Asl ro'yxatni o'zgartirmasdan, yangi xotira manzilida xavfsiz nusxa yaratish va element qo'shish.",
        input: "items = [10, 20], new_val = 30",
        code: `items = [10, 20]
# Xavfsiz mustaqil nusxa yaratish:
safe_copy = items.copy()
safe_copy.append(30)

print("Asl ro'yxat:", items)       # [10, 20] - o'zgarmasdan qoldi
print("Yangi ro'yxat:", safe_copy) # [10, 20, 30]
print("is tekshiruvi:", safe_copy is items) # False`,
        expectedOutput: "Asl ro'yxat: [10, 20]\nYangi ro'yxat: [10, 20, 30]\nis tekshiruvi: False",
        walkthrough: [
          "1-qator: `items` ro'yxati xotirada yaratildi.",
          "3-qator: `.copy()` orqali xotirada yangi mustaqil ro'yxat bloki ochildi.",
          "4-qator: `safe_copy` ga yangi son qo'shildi, lekin asl `items` tegilmadi.",
          "7-qator: `safe_copy is items` amali `False` qaytardi, ya'ni xotiralari ajratilgan.",
        ],
        whyThisOutputUz:
          "Agar `.copy()` o'rniga `safe_copy = items` yozilganida, `items` ham `[10, 20, 30]` ga aylanib qolardi.",
      },
      {
        id: "ex-pyb-filter",
        titleUz: "2-misol: Shart va to'plam bilan filtrlash (Brute Force vs Optimal)",
        explanationUz:
          "Talabalar ballaridan faqat o'tish balidan yuqorilarini ajratib olish.",
        input: "scores = [45, 88, 62, 30, 95], min_pass = 60",
        code: `scores = [45, 88, 62, 30, 95]
min_pass = 60

# Oddiy (Brute Force) usul:
passed = []
for s in scores:
    if s >= min_pass:
        passed.append(s)

print("O'tgan ballar:", passed)`,
        expectedOutput: "O'tgan ballar: [88, 62, 95]",
        walkthrough: [
          "1-2-qatorlar: Kirish ma'lumotlari berildi.",
          "5-qator: Natija uchun yangi bo'sh ro'yxat ochildi.",
          "6-7-qatorlar: Har bir ball tekshirilib, faqat 60 dan kattalari qo'shildi.",
        ],
        whyThisOutputUz:
          "Oddiy for tsikli orqali barcha mos keluvchi ballar saralab olindi.",
      },
    ],
    exercise: {
      id: "ex-py-basics-starter",
      titleUz: "1-daraja (Oson): Foydalanuvchi status matnini shakllantirish",
      instructionsUz:
        "`format_user_badge(name: str, score: int, is_active: bool) -> str` funksiyasini yozing:\n" +
        "1. Agar `is_active` rost (`True`) bo'lsa va `score >= 60`, `\"Faol talaba: {NAME} ({score} ball)\"` qaytarsin (bunda `name` katta harflar bilan yozilsin).\n" +
        "2. Agar `is_active` yolg'on (`False`) bo'lsa, `\"Nofaol: {NAME}\"` qaytarsin.\n" +
        "3. Agar `is_active` rost bo'lsa, lekin `score < 60`, `\"Qayta topshirish: {NAME} ({score} ball)\"` qaytarsin.\n" +
        "Maslahat: Satrlarni katta harfga o'tkazish uchun `name.upper()` dan foydalaning.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def format_user_badge(name: str, score: int, is_active: bool) -> str:
    # 1-daraja (Oson): Shart operatorlari va satrlar
    pass
`,
      expectedBehaviorUz:
        "Foydalanuvchi faolligi va balliga qarab to'g'ri status matnini qaytaradi.",
      hintsUz: [
        "Birinchi navbatda `if not is_active:` shartini tekshirib, darhol natija qaytarishingiz mumkin.",
        "Katta harf qilish: `upper_name = name.upper()`.",
        "f-string bilan formatlang: `f'Faol talaba: {upper_name} ({score} ball)'`.",
      ],
      testCases: [
        {
          id: "test-pyb-starter-1",
          descriptionUz: "Faol va o'tgan talaba: `format_user_badge('ali', 85, True)`",
          input: "name='ali', score=85, is_active=True",
          expectedOutput: "Faol talaba: ALI (85 ball)",
          assertionCode: "format_user_badge('ali', 85, True) == 'Faol talaba: ALI (85 ball)'",
        },
        {
          id: "test-pyb-starter-2",
          descriptionUz: "Faol lekin o'ta olmagan talaba: `format_user_badge('vali', 40, True)`",
          input: "name='vali', score=40, is_active=True",
          expectedOutput: "Qayta topshirish: VALI (40 ball)",
          assertionCode: "format_user_badge('vali', 40, True) == 'Qayta topshirish: VALI (40 ball)'",
        },
        {
          id: "test-pyb-starter-3",
          descriptionUz: "Nofaol foydalanuvchi: `format_user_badge('hasan', 90, False)`",
          input: "name='hasan', score=90, is_active=False",
          expectedOutput: "Nofaol: HASAN",
          assertionCode: "format_user_badge('hasan', 90, False) == 'Nofaol: HASAN'",
        },
        {
          id: "test-pyb-starter-4",
          descriptionUz: "Bo'sh ism bilan chekka holat: `format_user_badge('', 70, True)`",
          input: "name='', score=70, is_active=True",
          expectedOutput: "Faol talaba:  (70 ball)",
          assertionCode: "format_user_badge('', 70, True) == 'Faol talaba:  (70 ball)'",
        },
      ],
      modelSolution: `def format_user_badge(name: str, score: int, is_active: bool) -> str:
    n = name.upper()
    if not is_active:
        return f"Nofaol: {n}"
    if score >= 60:
        return f"Faol talaba: {n} ({score} ball)"
    return f"Qayta topshirish: {n} ({score} ball)"`,
      solutionExplanationUz:
        "Avval `name.upper()` qilib olinadi, so'ng `is_active` va `score` bo'yicha shart tekshiriladi.",
    },
    exercises: [
      {
        id: "ex-py-basics-starter",
        titleUz: "1-daraja (Oson): Foydalanuvchi status matnini shakllantirish",
        instructionsUz:
          "`format_user_badge(name: str, score: int, is_active: bool) -> str` funksiyasini yozing:\n" +
          "1. Agar `is_active` rost (`True`) bo'lsa va `score >= 60`, `\"Faol talaba: {NAME} ({score} ball)\"` qaytarsin.\n" +
          "2. Agar `is_active` yolg'on (`False`) bo'lsa, `\"Nofaol: {NAME}\"` qaytarsin.\n" +
          "3. Agar `is_active` rost bo'lsa, lekin `score < 60`, `\"Qayta topshirish: {NAME} ({score} ball)\"` qaytarsin.\n" +
          "Bunda `name` har doim katta harflar bilan yozilishi shart (`name.upper()`).",
        language: "python",
        runtime: "pyodide",
        difficulty: "starter",
        assessment: "deterministic",
        starterCode: `def format_user_badge(name: str, score: int, is_active: bool) -> str:
    # 1-daraja (Oson): Shart operatorlari va satrlar
    pass
`,
        expectedBehaviorUz:
          "Foydalanuvchi faolligi va balliga qarab to'g'ri status matnini qaytaradi.",
        hintsUz: [
          "Birinchi navbatda `if not is_active:` shartini tekshirib, darhol natija qaytarishingiz mumkin.",
          "Katta harf qilish: `upper_name = name.upper()`.",
          "f-string bilan formatlang: `f'Faol talaba: {upper_name} ({score} ball)'`.",
        ],
        testCases: [
          {
            id: "test-pyb-starter-1",
            descriptionUz: "Faol va o'tgan talaba: `format_user_badge('ali', 85, True)`",
            input: "name='ali', score=85, is_active=True",
            expectedOutput: "Faol talaba: ALI (85 ball)",
            assertionCode: "format_user_badge('ali', 85, True) == 'Faol talaba: ALI (85 ball)'",
          },
          {
            id: "test-pyb-starter-2",
            descriptionUz: "Faol lekin o'ta olmagan talaba: `format_user_badge('vali', 40, True)`",
            input: "name='vali', score=40, is_active=True",
            expectedOutput: "Qayta topshirish: VALI (40 ball)",
            assertionCode: "format_user_badge('vali', 40, True) == 'Qayta topshirish: VALI (40 ball)'",
          },
          {
            id: "test-pyb-starter-3",
            descriptionUz: "Nofaol foydalanuvchi: `format_user_badge('hasan', 90, False)`",
            input: "name='hasan', score=90, is_active=False",
            expectedOutput: "Nofaol: HASAN",
            assertionCode: "format_user_badge('hasan', 90, False) == 'Nofaol: HASAN'",
          },
          {
            id: "test-pyb-starter-4",
            descriptionUz: "Bo'sh ism bilan chekka holat: `format_user_badge('', 70, True)`",
            input: "name='', score=70, is_active=True",
            expectedOutput: "Faol talaba:  (70 ball)",
            assertionCode: "format_user_badge('', 70, True) == 'Faol talaba:  (70 ball)'",
          },
        ],
        modelSolution: `def format_user_badge(name: str, score: int, is_active: bool) -> str:
    n = name.upper()
    if not is_active:
        return f"Nofaol: {n}"
    if score >= 60:
        return f"Faol talaba: {n} ({score} ball)"
    return f"Qayta topshirish: {n} ({score} ball)"`,
        solutionExplanationUz:
          "Avval `name.upper()` qilinadi, so'ng `if/elif/else` orqali kerakli format qaytariladi.",
      },
      {
        id: "ex-py-basics-core",
        titleUz: "2-daraja (O‘rta): Xotira xavfsizligi va Aliasing oldini olish",
        instructionsUz:
          "`check_memory_safety(original_list: list, new_items: list) -> list` funksiyasini yozing:\n" +
          "1. Funksiya `original_list` ga tegmasdan (`original_list` o'zgarmasdan qolishi shart!), yangi xotira ajratib, unga `new_items` elementlarini qo'shgan holda yangi ro'yxat qaytarsin.\n" +
          "2. Qaytarilgan ro'yxat `original_list` bilan bir xil xotira manzili bo'lmasligi (`result is not original_list`) shart!\n" +
          "3. Qaytarilgan ro'yxat elementlari tartibi buzilmasligi kerak.\n" +
          "Eslatma: Talaba bu masalani oddiy 'brute force' tsiklida (`for x in original_list: ...`) yangi ro'yxatga qo'shib yechsa ham, yoki `.copy()` usulida yechsa ham — tizim ikkala yondashuvni ham qabul qiladi!",
        language: "python",
        runtime: "pyodide",
        difficulty: "core",
        assessment: "deterministic",
        starterCode: `def check_memory_safety(original_list: list, new_items: list) -> list:
    # 2-daraja (O'rta): Xotira modeli (is vs ==) va xavfsiz nusxa
    # DIQQAT: original_list o'zgarib ketmasligi shart!
    pass
`,
        expectedBehaviorUz:
          "Asl ro'yxatga ziyon yetkazmasdan, yangi mustaqil xotirada birlashtirilgan ro'yxat hosil qiladi.",
        hintsUz: [
          "Brute Force usuli: yangi `result = []` ochib, `for` tsikli orqali avval `original_list`, keyin `new_items` elementlarini qo'shishingiz mumkin.",
          "Tezkor usul: `result = original_list.copy() + list(new_items)`.",
          "`result = original_list` deb yozmang — bu xotira manzilini nusxalaydi va aliasing xatosiga olib keladi.",
        ],
        testCases: [
          {
            id: "test-pyb-core-1",
            descriptionUz: "Elementlar to'g'ri qo'shilishi: `check_memory_safety([1, 2], [3, 4]) == [1, 2, 3, 4]`",
            input: "original_list=[1, 2], new_items=[3, 4]",
            expectedOutput: "[1, 2, 3, 4]",
            assertionCode: "check_memory_safety([1, 2], [3, 4]) == [1, 2, 3, 4]",
          },
          {
            id: "test-pyb-core-2",
            descriptionUz: "Xotira xavfsizligi: Asl ro'yxat o'zgarmasligi va `result is not original_list`",
            input: "a = [10, 20]; res = check_memory_safety(a, [30])",
            expectedOutput: "a == [10, 20] and res is not a",
            assertionCode: `(lambda: (
    a := [10, 20],
    res := check_memory_safety(a, [30]),
    a == [10, 20] and (res is not a) and res == [10, 20, 30]
)[-1])()`,
          },
          {
            id: "test-pyb-core-3",
            descriptionUz: "Bo'sh qo'shimcha ro'yxat: `check_memory_safety([5], []) == [5]`",
            input: "original_list=[5], new_items=[]",
            expectedOutput: "[5]",
            assertionCode: `(lambda: (
    a := [5],
    res := check_memory_safety(a, []),
    a == [5] and (res is not a) and res == [5]
)[-1])()`,
          },
          {
            id: "test-pyb-core-4",
            descriptionUz: "Ikkala ro'yxat bo'sh bo'lganda yangi xotira: `check_memory_safety([], []) == []`",
            input: "original_list=[], new_items=[]",
            expectedOutput: "[]",
            assertionCode: `(lambda: (
    a := [],
    res := check_memory_safety(a, []),
    res == [] and (res is not a)
)[-1])()`,
          },
        ],
        modelSolution: `def check_memory_safety(original_list: list, new_items: list) -> list:
    # Xavfsiz mustaqil nusxa yaratish (Brute force yoki copy bilan)
    result = list(original_list)
    for item in new_items:
        result.append(item)
    return result`,
        solutionExplanationUz:
          "`list(original_list)` yangi xotira obyekti ajratadi, shuning uchun `original_list` o'zgarmaydi va `result is not original_list` sharti bajariladi.",
      },
      {
        id: "ex-py-basics-challenge",
        titleUz: "3-daraja (Qiyin): Duplikatlarni tozalash va ko'rsatkichlarni jamlash",
        instructionsUz:
          "`clean_and_aggregate_scores(records: list[dict], min_threshold: int) -> dict` funksiyasini yozing:\n" +
          "1. `records` — talabalar natijalari: `[{\"id\": 1, \"ball\": 80}, {\"id\": 2, \"ball\": 45}, {\"id\": 1, \"ball\": 90}]`.\n" +
          "2. E'tibor bering: Ro'yxatda bir xil `id` li duplikatlar bo'lishi mumkin! Har bir unikal talaba uchun ro'yxatdagi OXIRGI ko'ringan ball hisobga olinsin.\n" +
          "3. Faqat balli `min_threshold` dan kichik bo'lmagan (`ball >= min_threshold`) talabalar saralab olinsin.\n" +
          "4. Natija sifatida quyidagi lug'at qaytarilsin:\n" +
          "   `{\"count\": int, \"average\": float}`\n" +
          "   Bunda `count` — saralangan unikal talabalar soni, `average` — ularning o'rtacha balli (`round(..., 1)` bilan yaxlitlangan).\n" +
          "5. Agar mos talabalar topilmasa yoki kirish bo'sh bo'lsa: `{\"count\": 0, " +
          "\"average\": 0.0}` qaytaring.\n" +
          "Brute Force qo'llab-quvvatlanadi: Oddiy tsikl va ro'yxat orqali qo'lda tekshirsangiz ham, lug'at orqali tez yechsangiz ham to'liq qabul qilinadi!",
        language: "python",
        runtime: "pyodide",
        difficulty: "challenge",
        assessment: "deterministic",
        starterCode: `def clean_and_aggregate_scores(records: list[dict], min_threshold: int) -> dict:
    # 3-daraja (Qiyin): Duplikatlarni tozalash, filtrlash va statistikani hisoblash
    # records = [{"id": 1, "ball": 85}, ...]
    pass
`,
        expectedBehaviorUz:
          "Duplikatlarni oxirgi qiymat bo'yicha tozalab, chegara balldan yuqori natijalarning soni va o'rtachasini qaytaradi.",
        hintsUz: [
          "Brute Force usul: Oxirgi ko'ringan qiymatni olish uchun ro'yxatni boshidan oxirigacha aylanib, `latest = {}` lug'atiga `latest[item['id']] = item['ball']` deb yozishingiz mumkin.",
          "Filtrlash: `latest` dagi barcha ballarni `if ball >= min_threshold` bo'yicha `filtered` ro'yxatiga yig'ing.",
          "O'rtacha ball: `round(sum(filtered) / len(filtered), 1)`.",
        ],
        testCases: [
          {
            id: "test-pyb-chal-1",
            descriptionUz: "Standart yozuvlar: 2 ta talaba, ikkalasi ham o'tgan",
            input: "records=[{'id': 1, 'ball': 80}, {'id': 2, 'ball': 90}], min_threshold=70",
            expectedOutput: "{'count': 2, 'average': 85.0}",
            assertionCode: `clean_and_aggregate_scores([{'id': 1, 'ball': 80}, {'id': 2, 'ball': 90}], 70) == {'count': 2, 'average': 85.0}`,
          },
          {
            id: "test-pyb-chal-2",
            descriptionUz: "Takroriy ID: Oxirgi ball qabul qilinadi (id 1: 50 -> 80)",
            input: "records=[{'id': 1, 'ball': 50}, {'id': 1, 'ball': 80}], min_threshold=60",
            expectedOutput: "{'count': 1, 'average': 80.0}",
            assertionCode: `clean_and_aggregate_scores([{'id': 1, 'ball': 50}, {'id': 1, 'ball': 80}], 60) == {'count': 1, 'average': 80.0}`,
          },
          {
            id: "test-pyb-chal-3",
            descriptionUz: "Min chegaradan past natija: Hech kim o'tmadi",
            input: "records=[{'id': 1, 'ball': 40}], min_threshold=60",
            expectedOutput: "{'count': 0, 'average': 0.0}",
            assertionCode: `clean_and_aggregate_scores([{'id': 1, 'ball': 40}], 60) == {'count': 0, 'average': 0.0}`,
          },
          {
            id: "test-pyb-chal-4",
            descriptionUz: "Bo'sh ro'yxat chekka holati",
            input: "records=[], min_threshold=50",
            expectedOutput: "{'count': 0, 'average': 0.0}",
            assertionCode: `clean_and_aggregate_scores([], 50) == {'count': 0, 'average': 0.0}`,
          },
        ],
        modelSolution: `def clean_and_aggregate_scores(records: list[dict], min_threshold: int) -> dict:
    if not records:
        return {"count": 0, "average": 0.0}
    
    # Oxirgi ballarni saqlash (Brute force / Dict hash map)
    latest_scores = {}
    for r in records:
        latest_scores[r["id"]] = r["ball"]
        
    passed_scores = [ball for ball in latest_scores.values() if ball >= min_threshold]
    if not passed_scores:
        return {"count": 0, "average": 0.0}
        
    avg = round(sum(passed_scores) / len(passed_scores), 1)
    return {"count": len(passed_scores), "average": avg}`,
        solutionExplanationUz:
          "Lug'at yordamida takroriy ID lar birma-bir yangilanadi (oxirgi qiymat saqlanadi). So'ng `min_threshold` bo'yicha filtrlanib, o'rtacha ball hisoblanadi.",
      },
    ],
    status: "published",
    sourceRefs: ["python-docs-2024"],
  },

  // -------------------------------------------------------------------------
  // 1. Python Developer: Functions & Return Values (canonical functions)
  // -------------------------------------------------------------------------
  {
    id: "prac-py-functions",
    lessonId: "py-06-01",
    aliases: ["functions", "py-functions", "python-functions"],
    depth: "overview",
    objectiveUz:
      "Python'da `def` orqali funksiya yaratish, argumentlarni qabul qilish va `return` yordamida natijani to'g'ri qaytarishni o'rganish.",
    prerequisites: ["variables", "datatypes"],
    theorySteps: [
      {
        id: "th-fn-1",
        title: "Funksiya nima va nega kerak?",
        bodyMdx:
          "Funksiya — bitta aniq vazifani bajaruvchi, qayta ishlatiladigan kod blokidir. `def` kalit so'zi bilan e'lon qilinadi va qavs ichida parametrlarni qabul qiladi.",
      },
      {
        id: "th-fn-2",
        title: "`return` va `print` o'rtasidagi asosiy farq",
        bodyMdx:
          "`print()` faqat konsolga matn chiqaradi, lekin dastur xotirasida hech narsa saqlamaydi (qiymati `None`). `return` esa hisoblangan natijani funksiyani chaqirgan joyga qaytaradi va uni boshqa hisob-kitoblarda ishlatish imkonini beradi.",
      },
    ],
    examples: [
      {
        id: "ex-py-add",
        titleUz: "1-misol: Ikkita sonni qo'shuvchi oddiy funksiya",
        explanationUz:
          "Bu misolda `add` funksiyasi ikkita sonni qabul qiladi, ularni qo'shadi va yig'indini `return` orqali qaytaradi.",
        input: "a = 3, b = 5",
        code: `def add(a: int, b: int) -> int:
    return a + b

result = add(3, 5)
print("Yig'indi:", result)`,
        expectedOutput: "Yig'indi: 8",
        walkthrough: [
          "1-qator: `def add(a, b):` — ikkita parametr qabul qiluvchi `add` funksiyasi e'lon qilindi.",
          "2-qator: `return a + b` — `3 + 5 = 8` hisoblanib, natija funksiyadan tashqariga qaytarildi.",
          "4-qator: `result = add(3, 5)` — qaytgan `8` soni `result` o'zgaruvchisiga saqlandi.",
          "5-qator: `print()` orqali natija ekranga chop etildi.",
        ],
        whyThisOutputUz:
          "`return` ishlagani sababli `result` o'zgaruvchisi `8` soniga ega bo'ldi. Agar `return` o'rniga `print` ishlatilganida, `result` qiymati `None` bo'lib qolardi.",
      },
      {
        id: "ex-py-cart",
        titleUz: "2-misol: Savatchadagi narxlarni hisoblash (Real hayotiy misol)",
        explanationUz:
          "Savatdagi mahsulotlar narxlari ro'yxatini olib, ularning umumiy summasini hisoblaydigan funksiya.",
        input: "prices = [12.50, 45.00, 7.50]",
        code: `def calculate_cart_total(prices: list[float]) -> float:
    if not prices:
        return 0.0
    total = sum(prices)
    return round(total, 2)

cart = [12.50, 45.00, 7.50]
print("Jami summa:", calculate_cart_total(cart))`,
        expectedOutput: "Jami summa: 65.0",
        walkthrough: [
          "1-qator: `calculate_cart_total(prices)` funksiyasi ro'yxat qabul qiladi.",
          "2-3-qatorlar: `if not prices:` — agar savat bo'sh bo'lsa, xatoliksiz darhol `0.0` qaytadi.",
          "4-qator: `sum(prices)` orqali ro'yxatdagi barcha narxlar qo'shiladi: `12.5 + 45.0 + 7.5 = 65.0`.",
          "5-qator: Umumiy summa qaytariladi.",
        ],
        whyThisOutputUz:
          "Barcha elementlar yig'indisi topilib, aniq float son sifatida qaytarildi.",
      },
    ],
    exercise: {
      id: "ex-calc-total",
      titleUz: "Savatchadagi umumiy summani chegirma bilan hisoblash",
      instructionsUz:
        "`calculate_total(prices, discount=0.0)` funksiyasini yozing:\n" +
        "1. `prices` — mahsulot narxlaridan iborat ro'yxat (list of float).\n" +
        "2. `discount` — chegirma foizi (standart holatda `0.0`, masalan, `10.0` bu 10% chegirma).\n" +
        "3. Agar `prices` ro'yxati bo'sh bo'lsa (`[]`), funksiya `0.0` qaytarsin.\n" +
        "4. Agar chegirma berilgan bo'lsa, umumiy summadan chegirma foizini ayirib tashlang.\n" +
        "5. Natijani float son sifatida `return` qiling.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def calculate_total(prices: list[float], discount: float = 0.0) -> float:
    # Kodingizni shu yerga yozing
    pass
`,
      expectedBehaviorUz:
        "`calculate_total([100, 50], discount=10)` chaqirilganda `135.0` qaytishi kerak (150 dan 10% chegirma ayirildi). Bo'sh ro'yxatda `0.0` qaytishi kerak.",
      hintsUz: [
        "Ro'yxatdagi sonlar yig'indisini olish uchun `sum(prices)` funksiyasidan foydalaning.",
        "Chegirmani hisoblash formulasi: `total = sum(prices); chegirma_summasi = total * (discount / 100.0)`. Yakuniy natija: `total - chegirma_summasi`.",
        "Bo'sh ro'yxat holatini boshida tekshiring: `if not prices: return 0.0` va oxirida qiymatni `return float(...)` orqali qaytaring.",
      ],
      testCases: [
        {
          id: "test-empty",
          descriptionUz: "Bo'sh ro'yxat berilganda 0.0 qaytishi kerak: `calculate_total([]) == 0.0`",
          input: "prices = []",
          expectedOutput: "0.0",
          assertionCode: "math.isclose(calculate_total([]), 0.0, rel_tol=1e-5)",
        },
        {
          id: "test-standard",
          descriptionUz: "Chegirmasiz oddiy narxlar: `calculate_total([10, 20, 30]) == 60.0`",
          input: "prices = [10, 20, 30]",
          expectedOutput: "60.0",
          assertionCode: "math.isclose(calculate_total([10, 20, 30]), 60.0, rel_tol=1e-5)",
        },
        {
          id: "test-decimal",
          descriptionUz: "Kasr sonli narxlar: `calculate_total([19.99, 10.01]) == 30.0`",
          input: "prices = [19.99, 10.01]",
          expectedOutput: "30.0",
          assertionCode: "math.isclose(calculate_total([19.99, 10.01]), 30.0, rel_tol=1e-5)",
        },
        {
          id: "test-discount",
          descriptionUz: "10% chegirma bilan: `calculate_total([100, 50], discount=10) == 135.0`",
          input: "prices = [100, 50], discount = 10",
          expectedOutput: "135.0",
          assertionCode: "math.isclose(calculate_total([100, 50], discount=10), 135.0, rel_tol=1e-5)",
        },
      ],
      modelSolution: `def calculate_total(prices: list[float], discount: float = 0.0) -> float:
    if not prices:
        return 0.0
    total = sum(prices)
    if discount > 0:
        total -= total * (discount / 100.0)
    return float(total)`,
      solutionExplanationUz:
        "Avval bo'sh ro'yxat tekshirildi. So'ng `sum()` orqali yig'indi hisoblandi va foiz ayirib tashlandi. Vaqt murakkabligi: O(N), Xotira: O(1).",
    },
    status: "published",
    sourceRefs: ["python-docs-functions"],
  },

  // -------------------------------------------------------------------------
  // 2. AI Engineer / Vectors: Cosine Similarity (vector / embeddings)
  // -------------------------------------------------------------------------
  {
    id: "prac-ai-cosine",
    lessonId: "vector",
    aliases: ["vectors", "cosine-similarity"],
    depth: "understand",
    objectiveUz:
      "Vektorlar orasidagi kosinus o'xshashligini (Cosine Similarity) skalyar ko'paytma va Evklid normalari orqali dasturlash.",
    prerequisites: ["vector", "dot-product"],
    theorySteps: [
      {
        id: "th-cos-1",
        title: "Kosinus o'xshashligi (Cosine Similarity) nima?",
        bodyMdx:
          "Sun'iy intellekt va LLM larda so'zlar va hujjatlar embedding (vektor) shaklida ifodalanadi. Ikki vektorning ma'nosi qanchalik yaqinligini bilish uchun ularning orasidagi burchak kosinusi hisoblanadi: $\\cos(\\theta) = \\frac{A \\cdot B}{\\|A\\| \\|B\\|}$.",
      },
      {
        id: "th-cos-2",
        title: "Nega Evklid masofasi emas, balki burchak muhim?",
        bodyMdx:
          "Kosinus o'xshashligi vektorning uzunligiga (magnitudasiga) emas, aynan uning yo'nalishiga qaraydi. Uzun matn va qisqa matn bitta mavzuda bo'lsa, ularning yo'nalishi bir xil bo'ladi.",
      },
    ],
    examples: [
      {
        id: "ex-cos-2d",
        titleUz: "1-misol: 2D ortogonal (bir-biriga tik) vektorlar",
        explanationUz:
          "X o'qi bo'yicha [1, 0] va Y o'qi bo'yicha [0, 1] vektorlari orasidagi burchak 90° bo'lib, o'xshashligi 0 ga teng.",
        input: "a = [1, 0], b = [0, 1]",
        code: `import math

def simple_cosine(a: list[float], b: list[float]) -> float:
    dot = a[0]*b[0] + a[1]*b[1]
    norm_a = math.sqrt(a[0]**2 + a[1]**2)
    norm_b = math.sqrt(b[0]**2 + b[1]**2)
    return dot / (norm_a * norm_b)

vec_a = [1.0, 0.0]
vec_b = [0.0, 1.0]
print("O'xshashlik:", simple_cosine(vec_a, vec_b))`,
        expectedOutput: "O'xshashlik: 0.0",
        walkthrough: [
          "1. `dot = 1*0 + 0*1 = 0` (skalyar ko'paytma 0).",
          "2. `norm_a = 1.0`, `norm_b = 1.0`.",
          "3. `0.0 / (1.0 * 1.0) = 0.0` — vektorlar mutlaqo bog'liq emas.",
        ],
        whyThisOutputUz:
          "Burchak 90 gradus bo'lgani sababli kosinus qiymati 0.0 chiqdi.",
      },
      {
        id: "ex-cos-embed",
        titleUz: "2-misol: Har xil uzunlikdagi, ammo yo'nalishi bir xil bo'lgan vektorlar",
        explanationUz:
          "Bir xil yo'nalishdagi [0.2, 0.8] va uning 2 baravar kattalashgan [0.4, 1.6] nusxasi o'xshashligi 1.0 ga teng.",
        input: "doc1 = [0.2, 0.8], doc2 = [0.4, 1.6]",
        code: `import math

def cosine_similarity(v1: list[float], v2: list[float]) -> float:
    dot = sum(a * b for a, b in zip(v1, v2))
    norm1 = math.sqrt(sum(a**2 for a in v1))
    norm2 = math.sqrt(sum(b**2 for b in v2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)

doc1 = [0.2, 0.8]
doc2 = [0.4, 1.6]
print("Semantik o'xshashlik:", round(cosine_similarity(doc1, doc2), 4))`,
        expectedOutput: "Semantik o'xshashlik: 1.0",
        walkthrough: [
          "1. `zip(v1, v2)` orqali mos koordinatalar ko'paytirilib yig'ildi.",
          "2. Vektorlarning uzunliklari hisoblandi.",
          "3. Skalyar ko'paytma uzunliklar ko'paytmasiga bo'lindi va aynan 1.0 chiqdi.",
        ],
        whyThisOutputUz:
          "Kosinus o'lchovi uzunlik farqini e'tiborsiz qoldiradi va faqat yo'nalishni solishtiradi.",
      },
    ],
    exercise: {
      id: "ex-cosine-sim",
      titleUz: "Ixtiyoriy o'lchamli vektorlar uchun Cosine Similarity yozish",
      instructionsUz:
        "`cosine_similarity(vec_a, vec_b)` funksiyasini yozing:\n" +
        "1. `vec_a` va `vec_b` — bir xil o'lchamdagi sonlar ro'yxati (list of float).\n" +
        "2. Skalyar ko'paytma ($A \\cdot B = \\sum a_i b_i$) ni hisoblang.\n" +
        "3. Har bir vektor normasini ($\\|A\\| = \\sqrt{\\sum a_i^2}$, $\\|B\\| = \\sqrt{\\sum b_i^2}$) hisoblang.\n" +
        "4. Agar vektorlardan birining normasi 0 bo'lsa (nol vektor), `0.0` qaytarsin.\n" +
        "5. Natijani float son sifatida `return dot / (norm_a * norm_b)` qilib qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    # Kodingizni shu yerga yozing
    pass
`,
      expectedBehaviorUz:
        "`cosine_similarity([1, 0], [0, 1])` uchun `0.0`, `cosine_similarity([3, 4], [3, 4])` uchun esa `1.0` qaytishi kerak.",
      hintsUz: [
        "Skalyar ko'paytma: `dot = sum(a * b for a, b in zip(vec_a, vec_b))`.",
        "Normalar: `norm_a = math.sqrt(sum(x**2 for x in vec_a))` va `norm_b` xuddi shunday.",
        "Bo'lishdan oldin maxraj nol emasligini tekshiring: `if norm_a == 0 or norm_b == 0: return 0.0`.",
      ],
      testCases: [
        {
          id: "test-orthogonal",
          descriptionUz: "Tik vektorlar: `cosine_similarity([1, 0], [0, 1]) == 0.0`",
          input: "vec_a = [1, 0], vec_b = [0, 1]",
          expectedOutput: "0.0",
          assertionCode:
            "math.isclose(cosine_similarity([1.0, 0.0], [0.0, 1.0]), 0.0, abs_tol=1e-5)",
        },
        {
          id: "test-identical",
          descriptionUz: "Bir xil vektorlar: `cosine_similarity([3, 4], [3, 4]) == 1.0`",
          input: "vec_a = [3, 4], vec_b = [3, 4]",
          expectedOutput: "1.0",
          assertionCode:
            "math.isclose(cosine_similarity([3.0, 4.0], [3.0, 4.0]), 1.0, abs_tol=1e-5)",
        },
        {
          id: "test-opposite",
          descriptionUz: "Qarama-qarshi vektorlar: `cosine_similarity([1, 2, 3], [-1, -2, -3]) == -1.0`",
          input: "vec_a = [1, 2, 3], vec_b = [-1, -2, -3]",
          expectedOutput: "-1.0",
          assertionCode:
            "math.isclose(cosine_similarity([1.0, 2.0, 3.0], [-1.0, -2.0, -3.0]), -1.0, abs_tol=1e-5)",
        },
        {
          id: "test-embeddings",
          descriptionUz: "3D embeddinglar: `cosine_similarity([0.5, 0.5, 0.5], [0.2, 0.2, 0.2]) == 1.0`",
          input: "vec_a = [0.5, 0.5, 0.5], vec_b = [0.2, 0.2, 0.2]",
          expectedOutput: "1.0",
          assertionCode:
            "math.isclose(cosine_similarity([0.5, 0.5, 0.5], [0.2, 0.2, 0.2]), 1.0, abs_tol=1e-5)",
        },
      ],
      modelSolution: `import math

def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    if not vec_a or not vec_b or len(vec_a) != len(vec_b):
        return 0.0
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a ** 2 for a in vec_a))
    norm_b = math.sqrt(sum(b ** 2 for b in vec_b))
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return float(dot / (norm_a * norm_b))`,
      solutionExplanationUz:
        "Skalyar ko'paytma va Evklid normalari hisoblandi. Nolga bo'linish xatosi bartaraf etildi. Vaqt murakkabligi: O(D), bu yerda D — vektor o'lchami.",
    },
    status: "published",
    sourceRefs: ["vaswani-2017", "mikolov-2013"],
  },

  // -------------------------------------------------------------------------
  // 3. Machine Learning: Gradient Descent 1D Update (gradient-descent)
  // -------------------------------------------------------------------------
  {
    id: "prac-ml-gd",
    lessonId: "gradient-descent",
    aliases: ["gradient", "gradient_descent"],
    depth: "overview",
    objectiveUz:
      "Gradient Descent parametr yangilanish formulasini: $x_{t+1} = x_t - \\alpha \\cdot \\nabla f(x_t)$ kodda amalga oshirish.",
    prerequisites: ["gradient", "learning-rate"],
    theorySteps: [
      {
        id: "th-gd-1",
        title: "Gradient Descent formulasi",
        bodyMdx:
          "Har bir qadamda parametr ($x$) gradient yo'nalishiga teskari, o'rganish tezligi ($\\alpha$) kattaligida yangilanadi: $x_{t+1} = x_t - \\alpha \\cdot \\text{gradient}$.",
      },
    ],
    examples: [
      {
        id: "ex-gd-step",
        titleUz: "1-misol: Bitta parametrni gradient bo'yicha yangilash",
        explanationUz:
          "Agar parametr $x_0 = 7.0$, o'rganish tezligi $\\alpha = 0.25$ va gradient $8.0$ bo'lsa, yangi qiymat $5.0$ bo'ladi.",
        input: "current_x = 7.0, lr = 0.25, grad = 8.0",
        code: `def gradient_step(x: float, lr: float, grad: float) -> float:
    return x - lr * grad

x1 = gradient_step(7.0, 0.25, 8.0)
print("Yangi x1:", x1)`,
        expectedOutput: "Yangi x1: 5.0",
        walkthrough: [
          "1. `lr * grad = 0.25 * 8.0 = 2.0` (qadam kattaligi).",
          "2. `x - 2.0 = 7.0 - 2.0 = 5.0`.",
          "3. Yangi parametr qiymati qaytarildi.",
        ],
        whyThisOutputUz: "Gradient musbat bo'lgani uchun parametr kamaytirildi.",
      },
    ],
    exercise: {
      id: "ex-gd-update",
      titleUz: "Gradient Descent yangilanish funksiyasini yozish",
      instructionsUz:
        "`gradient_step(x, learning_rate, gradient)` funksiyasini yozing:\n" +
        "Formula: $x - (\\text{learning\\_rate} \\times \\text{gradient})$.\n" +
        "Natijani float sifatida qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def gradient_step(x: float, learning_rate: float, gradient: float) -> float:
    # Kodingizni shu yerga yozing
    pass
`,
      expectedBehaviorUz:
        "`gradient_step(7.0, 0.25, 8.0)` uchun `5.0` qaytishi kerak.",
      hintsUz: [
        "Oddiy arifmetik ayirish: `return x - learning_rate * gradient`.",
      ],
      testCases: [
        {
          id: "test-gd-1",
          descriptionUz: "`gradient_step(7.0, 0.25, 8.0) == 5.0`",
          input: "x = 7.0, lr = 0.25, grad = 8.0",
          expectedOutput: "5.0",
          assertionCode: "math.isclose(gradient_step(7.0, 0.25, 8.0), 5.0, abs_tol=1e-5)",
        },
        {
          id: "test-gd-2",
          descriptionUz: "Manfiy gradient bilan: `gradient_step(2.0, 0.1, -4.0) == 2.4`",
          input: "x = 2.0, lr = 0.1, grad = -4.0",
          expectedOutput: "2.4",
          assertionCode: "math.isclose(gradient_step(2.0, 0.1, -4.0), 2.4, abs_tol=1e-5)",
        },
      ],
      modelSolution: `def gradient_step(x: float, learning_rate: float, gradient: float) -> float:
    return float(x - learning_rate * gradient)`,
      solutionExplanationUz: "Standart 1D Gradient Descent qadami.",
    },
    status: "published",
    sourceRefs: ["kingma-2014"],
  },
];

/**
 * Retrieves the authored practice contract for a lesson.
 * Matches canonical lesson ID, micro-lesson ID or alias.
 */
export function getLessonPractice(
  lessonId: string,
  _depth?: LearningDepth,
): LessonPractice | null {
  const normalized = lessonId.toLowerCase().trim();

  const found = PUBLISHED_PRACTICES.find((p) => {
    const matchesId =
      p.lessonId.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      p.aliases?.some((a) => a.toLowerCase() === normalized);
    if (!matchesId) return false;
    return true;
  });

  if (found) return found;

  const richLesson = PYTHON_344_LESSONS_MAP[normalized];
  if (richLesson && richLesson.practiceTasks && richLesson.practiceTasks.length > 0) {
    const taskIndex =
      _depth === "master" ? Math.min(1, richLesson.practiceTasks.length - 1) : 0;
    const task = richLesson.practiceTasks[taskIndex]!;
    return {
      id: `prac-${richLesson.id}-${task.difficulty}`,
      lessonId: richLesson.id,
      depth: _depth ?? "understand",
      objectiveUz: richLesson.learningObjectiveUz,
      prerequisites: richLesson.prerequisites,
      theorySteps: [
        {
          id: `th-${richLesson.id}-1`,
          title: "Nazariy asoslar va tamoyil",
          bodyMdx: richLesson.theoryUz,
        },
      ],
      examples: [
        {
          id: `ex-${richLesson.id}-1`,
          titleUz: richLesson.examples[0]?.titleUz ?? "1-misol",
          explanationUz: richLesson.examples[0]?.explanationUz ?? "",
          code: richLesson.examples[0]?.code ?? "print('Python')",
          expectedOutput: richLesson.examples[0]?.expectedOutput ?? "",
          walkthrough: [richLesson.examples[0]?.explanationUz ?? ""],
          whyThisOutputUz: "Python interpreter qoidalari asosida bajarildi.",
        },
        ...(richLesson.examples[1]
          ? [
              {
                id: `ex-${richLesson.id}-2`,
                titleUz: richLesson.examples[1].titleUz,
                explanationUz: richLesson.examples[1].explanationUz,
                code: richLesson.examples[1].code,
                expectedOutput: richLesson.examples[1].expectedOutput,
                walkthrough: [richLesson.examples[1].explanationUz],
                whyThisOutputUz: "Python interpreter qoidalari asosida bajarildi.",
              },
            ]
          : []),
      ] as unknown as [PracticeExample, PracticeExample] | [PracticeExample],
      exercise: {
        id: task.id,
        titleUz: task.titleUz,
        instructionsUz: task.instructionsUz,
        language: "python",
        runtime: "pyodide",
        difficulty: task.difficulty,
        assessment: "deterministic",
        starterCode: task.starterCode,
        expectedBehaviorUz: task.instructionsUz,
        hintsUz: task.hintsUz,
        testCases: [
          {
            id: `${task.id}-tc-1`,
            descriptionUz: "Asosiy kirish qiymatlari uchun test holati",
          },
        ],
        testRunnerCode: task.testCode,
      },
      status: "published",
    };
  }

  const aiLesson = getAi291LessonById(normalized);
  if (aiLesson && aiLesson.practiceTasks && aiLesson.practiceTasks.length > 0) {
    const taskIndex =
      _depth === "master" ? Math.min(1, aiLesson.practiceTasks.length - 1) : 0;
    const task = aiLesson.practiceTasks[taskIndex]!;
    return {
      id: `prac-${aiLesson.id}-${task.difficulty}`,
      lessonId: aiLesson.id,
      depth: _depth ?? "understand",
      objectiveUz: aiLesson.learningObjectiveUz,
      prerequisites: aiLesson.prerequisites,
      theorySteps: [
        {
          id: `th-${aiLesson.id}-1`,
          title: "Nazariy asoslar va AI tamoyillari",
          bodyMdx: aiLesson.theoryUz,
        },
      ],
      examples: [
        {
          id: `ex-${aiLesson.id}-1`,
          titleUz: aiLesson.examples[0]?.titleUz ?? "1-misol",
          explanationUz: aiLesson.examples[0]?.explanationUz ?? "",
          code: aiLesson.examples[0]?.code ?? "print('AI')",
          expectedOutput: aiLesson.examples[0]?.expectedOutput ?? "",
          walkthrough: [aiLesson.examples[0]?.explanationUz ?? ""],
          whyThisOutputUz: "AI muhandisligi tamoyili asosida hisoblandi.",
        },
        ...(aiLesson.examples[1]
          ? [
              {
                id: `ex-${aiLesson.id}-2`,
                titleUz: aiLesson.examples[1].titleUz,
                explanationUz: aiLesson.examples[1].explanationUz,
                code: aiLesson.examples[1].code,
                expectedOutput: aiLesson.examples[1].expectedOutput,
                walkthrough: [aiLesson.examples[1].explanationUz],
                whyThisOutputUz: "AI muhandisligi tamoyili asosida hisoblandi.",
              },
            ]
          : []),
      ] as unknown as [PracticeExample, PracticeExample] | [PracticeExample],
      exercise: {
        id: task.id,
        titleUz: task.titleUz,
        instructionsUz: task.instructionsUz,
        language: "python",
        runtime: "pyodide",
        difficulty: task.difficulty,
        assessment: "deterministic",
        starterCode: task.starterCode,
        expectedBehaviorUz: task.instructionsUz,
        hintsUz: task.hintsUz,
        testCases: [
          {
            id: `${task.id}-tc-1`,
            descriptionUz: "AI Engineer amaliy test holati",
          },
        ],
        testRunnerCode: task.testCode,
      },
      status: "published",
    };
  }

  const mlDsLesson = getMlDs520LessonById(normalized);
  if (mlDsLesson && mlDsLesson.practiceTasks && mlDsLesson.practiceTasks.length > 0) {
    const taskIndex =
      _depth === "master" ? Math.min(1, mlDsLesson.practiceTasks.length - 1) : 0;
    const task = mlDsLesson.practiceTasks[taskIndex]!;
    return {
      id: `prac-${mlDsLesson.id}-${task.difficulty}`,
      lessonId: mlDsLesson.id,
      depth: _depth ?? "understand",
      objectiveUz: mlDsLesson.learningObjectiveUz,
      prerequisites: mlDsLesson.pythonPrerequisites,
      theorySteps: [
        {
          id: `th-${mlDsLesson.id}-1`,
          title: "Nazariy asoslar va ML/DS tamoyillari",
          bodyMdx: mlDsLesson.theoryUz,
        },
      ],
      examples: [
        {
          id: `ex-${mlDsLesson.id}-1`,
          titleUz: mlDsLesson.examples[0]?.titleUz ?? "1-misol",
          explanationUz: mlDsLesson.examples[0]?.explanationUz ?? "",
          code: mlDsLesson.examples[0]?.code ?? "import numpy as np",
          expectedOutput: mlDsLesson.examples[0]?.expectedOutput ?? "",
          walkthrough: [mlDsLesson.examples[0]?.explanationUz ?? ""],
          whyThisOutputUz: "ML/DS algoritmlari va Python interpreter qoidalari asosida bajarildi.",
        },
        ...(mlDsLesson.examples[1]
          ? [
              {
                id: `ex-${mlDsLesson.id}-2`,
                titleUz: mlDsLesson.examples[1].titleUz,
                explanationUz: mlDsLesson.examples[1].explanationUz,
                code: mlDsLesson.examples[1].code,
                expectedOutput: mlDsLesson.examples[1].expectedOutput,
                walkthrough: [mlDsLesson.examples[1].explanationUz],
                whyThisOutputUz: "ML/DS algoritmlari va Python interpreter qoidalari asosida bajarildi.",
              },
            ]
          : []),
      ] as unknown as [PracticeExample, PracticeExample] | [PracticeExample],
      exercise: {
        id: task.id,
        titleUz: task.titleUz,
        instructionsUz: task.instructionsUz,
        language: "python",
        runtime: "pyodide",
        difficulty: task.difficulty,
        assessment: "deterministic",
        starterCode: task.starterCode,
        expectedBehaviorUz: task.instructionsUz,
        hintsUz: task.hintsUz,
        testCases: [
          {
            id: `${task.id}-tc-1`,
            descriptionUz: "ML & Data Science amaliy test holati",
          },
        ],
        testRunnerCode: task.testCode,
      },
      status: "published",
    };
  }

  const hfLesson = getHfLessonById(normalized);
  if (hfLesson && hfLesson.publishStatus === "published" && hfLesson.publishedContent) {
    const pub = hfLesson.publishedContent;
    const activeDepth = _depth ?? "understand";
    return {
      id: `prac-${hfLesson.id}-${activeDepth}`,
      lessonId: hfLesson.id,
      depth: activeDepth,
      objectiveUz: hfLesson.objective,
      prerequisites: pub.prerequisitesUz,
      theorySteps: [
        {
          id: `th-${hfLesson.id}-overview`,
          title: pub.depths.overview.titleUz,
          bodyMdx: pub.depths.overview.bodyUz,
        },
        {
          id: `th-${hfLesson.id}-understand`,
          title: pub.depths.understand.titleUz,
          bodyMdx: pub.depths.understand.bodyUz,
        },
        {
          id: `th-${hfLesson.id}-master`,
          title: pub.depths.master.titleUz,
          bodyMdx: pub.depths.master.bodyUz,
        },
      ],
      examples: [pub.example1, pub.example2],
      exercise: pub.exercise,
      status: "published",
      sourceRefs: [hfLesson.sourceAttribution.chapterUrl],
    };
  }

  return null;
}

export function hasPractice(lessonId: string): boolean {
  return getLessonPractice(lessonId) !== null;
}
