# AI Platform: Practice-First Learning Implementation Report

**Sana:** 2026-yil 16-noyabr  
**Holati:** Muvaffaqiyatli yakunlandi (Production Ready)  
**Asosiy vazifa:** AI Atlas platformasini nazariy o'rganishdan to'liq amaliy kod yozish va avtomatlashtirilgan testlarga ega interaktiv platformaga aylantirish.

---

## 1. Bajarilgan Asosiy Talablar

1. **Sayt yaxlitligi saqlandi:**
   - Sayt noldan qayta qurilmadi.
   - Mavjud barcha 39 ta kanonik MDX darslar, ularning sluglari, darslararo bog'liqliklar va foydalanuvchilarning oldingi o'quv progressi to'liq saqlab qolindi.
   - Hech qanday soxta (fake) "Run" tugmalari yoki qalbaki test natijalari yaratilmadi.
2. **7 bosqichli amaliy sikl joriy etildi:**
   $$\text{Nazariya} \longrightarrow \text{1-namuna} \longrightarrow \text{2-namuna} \longrightarrow \text{Kod yozish} \longrightarrow \text{Kodni yurgizish} \longrightarrow \text{Testlar} \longrightarrow \text{O'zbekcha Feedback}$$
3. **Foydalanuvchi interfeysi (UI) kengaytirildi va ekran chetlariga moslashtirildi:**
   - Notebook va keng monitorlarda ma'lumotlar siqilib qolmasligi uchun konteyner kengligi `max-w-[1720px]` ga yetkazildi.
   - Formula kartalaridagi matnlar va hisob-kitoblar gorizontal qirqilib ketmaydigan qilib yangilandi.
   - Neyron tarmoq Manim animatsiyasi qayta render qilinib, yashirin qatlam qiymatlari (`a_1, a_2, a_3`) doiralar ustiga tushib qolishi bartaraf etildi.

---

## 2. To'liq Ishga Tushirilgan Vertikal Kesimlar (Vertical Slices)

### 2.1. 1-kesim: Python Developer — Funksiyalar va Qaytish Qiymatlari (`py-06-01` / `functions`)
- **Nazariya:** `def`, parametrlar, `return` va `print` o'rtasidagi farq o'zbek tilida tushuntirildi.
- **1-namuna:** Ikkita sonni qo'shuvchi `add(a, b)` funksiyasi, har bir qator tahlili bilan.
- **2-namuna:** Savatcha narxlarini hisoblovchi hayotiy misol (`calculate_cart_total`).
- **Amaliy topshiriq:** `calculate_total(prices: list[float], discount: float = 0.0) -> float`:
  - 1-test: Bo'sh ro'yxat (`calculate_total([]) == 0.0`)
  - 2-test: Chegirmasiz standart narxlar (`calculate_total([10, 20, 30]) == 60.0`)
  - 3-test: Kasr sonlar (`calculate_total([19.99, 10.01]) == 30.0`)
  - 4-test: 10% chegirma bilan (`calculate_total([100, 50], 10) == 135.0`)
- **3 darajali ko'rsatmalar (Hints):**
  - 1-daraja: `sum(prices)` funksiyasi
  - 2-daraja: Chegirma formulasi: `total -= total * (discount / 100.0)`
  - 3-daraja: Bo'sh ro'yxatni tekshirish: `if not prices: return 0.0`
- **Model yechim:** To'liq to'g'ri kod va tahlil.

### 2.2. 2-kesim: AI Engineer — Vektorlar va Kosinus O'xshashligi (`vector`)
- **Nazariya:** Skalyar ko'paytma va Evklid normasi orqali burchak kosinusini topish.
- **1-namuna:** 2D fazodagi perpendikulyar vektorlar (`[1, 0]` va `[0, 1]` $\rightarrow 0.0$).
- **2-namuna:** 3D semantik embeddinglar o'xshashligi (`[0.2, 0.8]` va `[0.4, 1.6]` $\rightarrow 1.0$).
- **Amaliy topshiriq:** `cosine_similarity(vec_a, vec_b) -> float`:
  - 1-test: Tik vektorlar (`[1, 0]` va `[0, 1]` $\rightarrow 0.0$)
  - 2-test: Bir xil vektorlar (`[3, 4]` va `[3, 4]` $\rightarrow 1.0$)
  - 3-test: Qarama-qarshi vektorlar (`[1, 2, 3]` va `[-1, -2, -3]` $\rightarrow -1.0$)
  - 4-test: Embeddinglar (`[0.5, 0.5, 0.5]` va `[0.2, 0.2, 0.2]` $\rightarrow 1.0$)
- **Model yechim va 3 darajali ko'rsatmalar.**

### 2.3. 3-kesim: Machine Learning — 1D Gradient Descent Parametr Yangilanishi (`gradient-descent`)
- **Topshiriq:** `gradient_step(x: float, learning_rate: float, gradient: float) -> float`
- **Deterministik testlar:** Musbat, manfiy va nol gradient qadamlari.

---

## 3. Yangi Yaratilgan Komponentlar va Modullar

| Fayl yo'li | Vazifasi |
|---|---|
| `src/lib/practice/types.ts` | Amaliy topshiriqlar, test keyslar va namunalar TypeScript turlari |
| `src/lib/runner/types.ts` | Kod bajarilishi va test natijalari interfeyslari |
| `src/lib/runner/error-translator.ts` | Python/JS xatolarini do'stona o'zbek tiliga tarjima qilish |
| `src/lib/runner/python-runner.ts` | Brauzerda Pyodide (WASM) va xavfsiz izolyatsiyalangan runner |
| `src/lib/runner/index.ts` | Runtimelar bo'yicha markaziy dispetcher |
| `src/lib/practice/registry.ts` | Chop etilgan va rejalashtirilgan topshiriqlar registri |
| `src/components/practice/CodeEditor.tsx` | Qator raqamlari, Tab (4 bo'shliq), Ctrl+Enter yorlig'iga ega muharrir |
| `src/components/practice/ExampleViewer.tsx` | 2 ta bosqichma-bosqich namunani ko'rsatish paneli |
| `src/components/practice/PracticeLab.tsx` | Kod yozish, yurgizish, testlar, konsol va 3-darajali yordamchi |
| `src/components/practice/GuidedPractice.tsx` | Nazariya $\rightarrow$ Namunalar $\rightarrow$ Kod laboratoriyasi mini-steyperi |
| `tests/practice-runner.test.ts` | Kod ijrochisi, xatolar tarjimoni va topshiriqlarning avtomatlashtirilgan testlari |
| `PRACTICE_CONTENT_GUIDE.md` | Yangi amaliy darslarni qo'shish bo'yicha batafsil qo'llanma |
| `RUNTIMES_AND_SECURITY.md` | Xavfsizlik qoidalari va WebAssembly sandbox arxitekturasi |

---

## 4. Tekshiruv Natijalari (Verification)

1. **TypeScript Typecheck (`npm run typecheck`):**
   - 0 ta xatolik. To'liq tip xavfsizligi ta'minlandi.
2. **ESLint (`npm run lint`):**
   - 0 ta xatolik, 0 ta ogohlantirish. Barcha qat'iy qoidalar qondirildi.
3. **Avtomatlashtirilgan Testlar (`npm test`):**
   - **20 ta test fayli** to'liq ishga tushdi.
   - **104 ta unit/integratsiya testlari** 100% muvaffaqiyatli o'tdi.
4. **Kontent Validatsiyasi (`npm run content:validate`):**
   - 7 ta kategoriya, 39 ta kanonik dars, 341 ta glossariy atamasi, 15 ta manba va 7 ta interaktiv vizualizatsiya to'liq tekshirildi.
5. **Production Build (`npm run build`):**
   - Turbopack orqali barcha **55 ta statik va dinamik sahifalar** xatosiz yig'ildi.
