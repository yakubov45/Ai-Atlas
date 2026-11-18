# AI Platform: Practice-First Content Creation Guide (Qo'llanma)

Ushbu hujjat platformada mavjud 6 ta ta'lim yo'nalishi (AI Engineer, Machine Learning Engineer, Data Scientist, Python Developer, Data Engineer, Prompt Engineering) bo'yicha nazariy darslarni amaliy kodlash darslariga aylantirish uchun to'liq standartlarni belgilaydi.

---

## 1. Asosiy Pedagogik Ketma-Ketlik

Har bir amaliy dars qat'iy ravishda quyidagi 7 bosqichli sikldan iborat bo'lishi shart:

$$\text{Nazariya} \longrightarrow \text{1-namuna} \longrightarrow \text{2-namuna} \longrightarrow \text{Kod yozish} \longrightarrow \text{Kodni yurgizish} \longrightarrow \text{Testlar} \longrightarrow \text{Tushunarli fikr-mulohaza (Feedback)}$$

1. **Nazariya (Theory):** Mavzuning asosiy g'oyasi sodda va professional o'zbek tilida, ortiqcha murakkablashtirmasdan tushuntiriladi.
2. **1-namuna (Simple Example):** Eng sodda, tushunarli bazaviy kod, uning aniq kiruvchi ma'lumotlari (input), kutilgan natijasi (output) va har bir qatorining tahlili.
3. **2-namuna (Real-world Example):** Real amaliyotda yoki ishlab chiqarishda (production) uchraydigan hayotiy misol. "Nega aynan shunday natija chiqdi?" degan izoh bilan.
4. **Kod yozish (Coding Exercise):** Talabaning o'zi brauzerdagi Code Editor ichida kod yozishi yoki mavjud shablonni to'ldirishi.
5. **Kodni yurgizish (Run Code):** Xavfsiz brauzer sandboxi (Pyodide / WebAssembly) orqali haqiqiy kod bajarilishi va `print()` chiqishlari (stdout) ko'rsatilishi.
6. **Avtomatlashtirilgan Testlar (Automated Tests):** 3-5 ta deterministik test keyslar (oddiy holat, chegaraviy holatlar, nol/bo'sh qiymatlar).
7. **Pedagogik Fikr-mulohaza (Feedback in Uzbek):** Sintaksis yoki mantiqiy xatolar yuz berganda inglizcha quruq traceback emas, do'stona o'zbekcha yo'l-yo'riq berilishi.

---

## 2. Dars Kontrakt Sxemasi (`LessonPractice`)

Har bir yangi amaliy topshiriq `src/lib/practice/types.ts` dagi TypeScript interfeyslariga to'liq mos kelishi va `src/lib/practice/registry.ts` ro'yxatiga kiritilishi lozim:

```typescript
export interface LessonPractice {
  id: string;                    // Masalan: "prac-py-functions"
  lessonId: string;              // Kanonik dars ID yoki mikro-dars ID: "py-06-01"
  aliases?: string[];            // Bog'liq qidiruv kalitlari: ["functions", "py-functions"]
  depth: LearningDepth;          // "overview" | "understand" | "master"
  objectiveUz: string;           // Dars maqsadi (o'zbek tilida)
  prerequisites: string[];       // Tayanch mavzular
  theorySteps: Array<{
    id: string;
    title: string;
    bodyMdx: string;
  }>;
  examples: [PracticeExample, PracticeExample]; // Kamida 2 ta namuna
  exercise: PracticeExercise;    // Amaliy topshiriq
  status: "published" | "planned" | "review";
}
```

---

## 3. Namunalar Standarti (`PracticeExample`)

Har bir namunada quyidagi maydonlar to'liq to'ldirilishi shart:
- `titleUz`: Misol nomi (masalan: *"1-misol: Ikkita sonni qo'shuvchi funksiya"*).
- `input`: Aniq parametrlar (masalan: `a = 3, b = 5`).
- `code`: To'liq ishlovchi Python/JS kodi.
- `expectedOutput`: Konsolga chiqadigan aniq natija.
- `walkthrough`: Qadamma-qadam qatorlar tahlili:
  - `1-qator: ...`
  - `2-qator: ...`
- `whyThisOutputUz`: *"Nega aynan shunday natija chiqdi?"* savoliga tushuntirish.

---

## 4. Topshiriq va Testlar Standarti (`PracticeExercise`)

Topshiriq quyidagi xususiyatlarga ega bo'lishi kerak:
1. **Starter Code:** Boshlang'ich shablon funksiya imzosi va `pass` bilan beriladi:
   ```python
   def calculate_total(prices: list[float], discount: float = 0.0) -> float:
       # Kodingizni shu yerga yozing
       pass
   ```
2. **Bosqichma-bosqich Yordam (3 ta Hint):**
   - **1-daraja (Konseptual):** Foydalaniladigan funksiya yoki matematik formula g'oyasi (`sum()`, `math.sqrt`).
   - **2-daraja (Algoritmik):** Qadamlar tartibi (bo'sh ro'yxatni tekshirish, formulani qo'llash).
   - **3-daraja (Aniq ishora):** Kod qatori bo'yicha to'g'ridan-to'g'ri maslahat (`if not prices: return 0.0`).
3. **Deterministik Testlar:**
   - **Oddiy holat:** Standart ma'lumotlar bilan tekshirish.
   - **Chegaraviy holat:** Manfiy sonlar, kasr sonlar, maksimal qiymatlar.
   - **Nol / Bo'sh qiymat:** `[]`, `0`, `None`, nol vektorlar (`[0, 0]`).
   - Har bir test uchun `assertionCode` yoziladi:
     `math.isclose(calculate_total([100, 50], 10), 135.0, rel_tol=1e-5)`

---

## 5. Dasturlashga Aloqador Bo'lmagan (Konseptual) Mavzular

AI yo'nalishidagi barcha mavzular ham toza kod yozishni talab qilmaydi (masalan: *Prompt Engineering prinsiplari*, *AI etikasi*, *Arxitektura tanlovi*). 

Bunday darslarda sun'iy yoki ma'nosiz kod yozdirilmaydi! Buning o'rniga:
- **Prompt Engineering:** Berilgan zaif promptni yaxshilash va uning natijasini tahlil qilish.
- **Data Engineering:** Berilgan JSON yoki jadval sxemasidan ortiqcha/xato maydonlarni tozalash.
- **Arxitektura (MLOps):** Ikki xil arxitektura o'rtasidagi tradeofflarni baholash va to'g'ri parametr konfiguratsiyasini tuzish.

---

## 6. Sifat Nazorati va Testdan O'tkazish

Yangi amaliy dars qo'shilganda:
1. `tests/practice-runner.test.ts` ichida referens yechim barcha testlardan o'tishi tekshiriladi.
2. Xato yechimlar ataylab kiritilib, testlar to'g'ri qizil bo'lishi va o'zbekcha xato matni chiqishi tasdiqlanadi.
3. `npm run check` orqali to'liq tizim (typecheck, lint, test, content:validate) tekshiruvdan o'tkaziladi.
