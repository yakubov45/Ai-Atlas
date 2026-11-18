# AI Atlas — Arxitektura va Texnik Qarorlar Hujjati

Ushbu hujjat **AI Atlas** platformasining 1-bosqichida qabul qilingan arxitekturaviy tamoyillar, ma'lumotlar modellari va texnik yechimlarni batafsil tushuntiradi.

---

## 1. Asosiy Tamoyillar

1. **Kontentga asoslangan dizayn (Content-Driven Architecture):**
   Interfeys komponentlari kontentdan to'liq ajratilgan. Yangi dars, kategoriya, manba yoki vizualizatsiya qo'shish uchun UI kodini o'zgartirish talab etilmaydi — faqat `src/content/` jildiga standart formatdagi fayllar kiritiladi.

2. **Haqiqiylik va Shaffoflik (Integrity & Traceability):**
   Platformada hech qanday qalbaki darslar, uydirma manbalar yoki yasama statistika mavjud emas. Har bir dars o'zining kelib chiqish hujjati (origin: Deep Research fayli, bo'limi va sahifasi) bilan bog'lanishi mumkin.

3. **Ishlash samaradorligi (Performance First):**
   Katta hajmdagi texnik materiallar (kelajakda 196 sahifa) talabaning oddiy noutbuki yoki mobil qurilmasida qotmasdan ochilishi lozim. Shuning uchun:
   - MDX darslar to'liq serverda yoki statik build paytida HTML ga kompilyatsiya qilinadi.
   - Og'ir interaktiv vizualizatsiya modullari `next/dynamic` orqali faqat kerak bo'lganda yuklanadi.
   - Qidiruv indeksi alohida yengil JSON formatida saqlanadi.

---

## 2. Axborot Arxitekturasi va Marshrutlash

Platforma Next.js App Router (v16) tuzilmasiga asoslangan:

- `/` — Bosh sahifa: platforma maqsadi, interaktiv AI abstrakt animatsiyasi, o'rganish vositalari va joriy o'quv holati.
- `/learn` — Darslar kutubxonasi: kategoriya, qiyinlik darajasi va teglar bo'yicha tezkor filtrlash.
- `/learn/[slug]` — Dars o'quvchisi: 3 ustunli professional o'qish muhiti (chapda mavzular, o'rtada MDX dars, o'ngda mundarija).
- `/roadmap` — O'quv yo'l xaritasi: darslarning `prerequisites` bog'liqliklaridan avtomatik quriladigan yo'naltirilgan graf.
- `/visual-lab` — Vizual laboratoriya: barcha interaktiv modullar va kontent vizualizatsiyalari sinov maydoni.
- `/visual-lab/[id]` — Alohida vizualizatsiyani to'liq ekranda o'rganish sahifasi.
- `/glossary` — AI atamalari glossariysi: alifbo bo'yicha navigatsiya, qidiruv va darslarga o'zaro havolalar.
- `/bookmarks` — Saqlangan darslar va vizualizatsiyalar ro'yxati.
- `/settings` — Mavzu, harakatlar (motion), shrift va mahalliy o'quv ma'lumotlarini boshqarish.
- `/api/search-index` — Qidiruv indeksini taqdim etuvchi keshlanuvchi API marshruti.

---

## 3. Kontent Infratuzilmasi (MDX & Zod)

Kontentni boshqarish tizimi quyidagi qatlamlardan iborat:

### A. Sxema va Qoidalar (`src/lib/content/schema.ts`)
Barcha kontent turlari Zod yordamida qat'iy tekshiriladi:
- `lessonFrontmatterSchema`: dars identifikatori, slug, qiyinlik, tartib, teglar, `prerequisites`, `visualizations`, `sources`, va `origin` (kelib chiqish manbasi).
- `categorySchema`: kategoriya nomi, tartibi va ikonkalari.
- `referenceSchema`: ilmiy maqola yoki kitobning bibliografik metama'lumotlari (mualliflar, yil, venue, DOI, URL).
- `visualizationInstanceSchema`: vizualizatsiya turi, sarlavhasi va modulga xos parametrlar konfiguratsiyasi.

### B. Statik Tahlil (`src/lib/content/markdown.ts`)
MDX darslarni kompilyatsiya qilmasdan turib:
- Mundarija (TOC) uchun `h2` va `h3` sarlavhalari ajratib olinadi va barqaror slug-ID beriladi.
- Dars matni so'zlari hisoblanadi va o'qish vaqti (200 so'z/daq) aniqlanadi.
- Hujjat ichidagi barcha ichki havolalar (`/learn/slug`, `glossary:id`, `ref:id`) tahlil qilinadi.

### C. Semantik Validatsiya (`src/lib/content/validate.ts`)
Loyihada bironta ham buzilgan havola qolmasligi uchun build paytida:
- Takroriy slug va dars ID lari aniqlanadi.
- Mavjud bo'lmagan dars, kategoriya yoki manbaga berilgan havolalar xato sifatida belgilanadi.
- Prerequisite zanjirlarida **yo'naltirilgan sikllar** (Cycle Detection) mavjudligi tekshiriladi.

---

## 4. Interaktiv Vizualizatsiya Arxitekturasi

Platformaning eng muhim qismi — qayta ishlatiladigan interaktiv modullar:

```text
src/components/visualizations/
  VisualizationContainer.tsx     # Sarlavha, to'liq ekran, reset, xatolik chegarasi
  loaders.tsx                    # Dinamik import va yuklanish skeleti
  FlowDiagram.tsx                # Tugun va bog'lanishli oqim diagrammasi
  FunctionPlot.tsx               # Xavfsiz matematik funksiya grafigi
  GradientDescentPlot.tsx        # 1D gradient tushish algoritmi
  PlannedModuleCard.tsx          # Rejalashtirilgan modullar yo'l xaritasi
```

### A. Xavfsiz Matematik Tahlilchi (`src/lib/math/expression.ts`)
Matematik vizualizatsiyalar foydalanuvchi yoki kontent muallifidan keladigan formulalarni chizishi kerak. Xavfsizlik maqsadida `eval` yoki `new Function` qat'iyan taqiqlangan. O'rniga xavfsiz **AST tokenizer va rekursiv parser** yaratildi. U quyidagilarni qo'llab-quvvatlaydi:
- Arifmetik amallar: `+`, `-`, `*`, `/`, `^` (darajaga ko'tarish).
- Matematik funksiyalar: `sin`, `cos`, `tan`, `exp`, `log`, `sqrt`, `abs`, `min`, `max` va boshqalar.
- Doimiylar: `pi`, `e`.
- Parametrlar va $x$ o'zgaruvchisi.

### B. Oqim Diagrammasi Moduli (`FlowDiagram.tsx`)
Murakkab AI jarayonlarini (masalan, Transformer yoki RAG quvuri) tushuntirish uchun mo'ljallangan:
- **Avtomatik qatlamli tartiblash (Sugiyama algoritmi asosi):** bog'liqliklar chuqurligi bo'yicha koordinatalar avtomatik hisoblanadi.
- **Interaktiv yoritish:** ixtiyoriy tugun bosilganda unga olib keluvchi va undan chiquvchi barcha yo'llar (ancestors & descendants) yoritiladi.
- **Walkthrough boshqaruvi:** Play, Pause, Step Forward, Step Back, Reset boshqaruv paneli orqali har bir qadam animatsiya bilan ko'rsatiladi.

### C. Gradient Tushish Moduli (`GradientDescentPlot.tsx`)
- Matematik funksiyaning sonli hosilasini hisoblaydi: $f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}$.
- O'rganish tezligi ($\eta$) slayderi orqali qadam kattaligi boshqariladi.
- Yaqinlashish (convergence) yoki uzoqlashish (divergence) holatini real vaqtda aniqlaydi.

---

## 5. Talaba O'quv Tajribasi va Maxfiylik

1-bosqichda tashqi ma'lumotlar bazasi yoki autentifikatsiya talab qilinmagani sababli, ma'lumotlar foydalanuvchining o'z brauzerida saqlanadi:

- **O'quv progressi:** Talaba darsni o'qib bo'lgach "Tugatildi" tugmasini bosadi. Barcha tugatilgan darslar va oxirgi o'qilgan bo'lim `LocalStorage` da saqlanadi.
- **Xatcho'plar:** Darslar va vizualizatsiyalar saqlab qo'yilishi mumkin.
- **Eksport/Import:** Talaba o'z progressini JSON fayl qilib yuklab olib, boshqa kompyuterga ko'chira oladi.
- **Repository Abstraction:** `src/lib/progress/repository.ts` interfeysi shunday yaratilganki, 2-bosqichda PostgreSQL yoki Firebase qo'shilganda UI kodiga tegilmaydi.

## 6. Mavzu va Maxsus Imkoniyatlar (Accessibility)

- **Mavzular:** Tizim sozlamasi, To'liq Qorong'i (Navy/Charcoal) va Yorug' (Slate) mavzular. Sahifa ochilishida "oq miltillash" (theme flash) bo'lmasligi uchun `<head>` qismida engil initsializatsiya skripti ishlaydi.
- **Kamaytirilgan harakat (Reduced Motion):** Talaba operatsion tizimida yoki sayt sozlamalarida "kamaytirilgan harakat"ni tanlagan bo'lsa, barcha doimiy animatsiyalar avtomatik o'chiriladi.
- **Klaviatura boshqaruvi:** Barcha interaktiv tugunlar va modullar Tab va Enter orqali boshqariladi. `Cmd+K` tezkor qidiruv oynasi ochadi.

---

## 7. Gibrid Vizualizatsiya Arxitekturasi: Manim CE va React Simulyatorlari

2-bosqichda platformaga Python Manim Community Edition bilan real vaqtdagi React interaktiv simulyatsiyalarini birlashtiruvchi gibrid rendering tizimi joriy etildi:

### A. Python Manim (Community Edition)
- **Vazifasi:** Matematik formulalarning geometrik ma'nosini tushuntiruvchi yuqori aniqlikdagi animatsiyalarni ishlab chiqish.
- **Ajratilgan quvur (Offline/Build-time):** Manim brauzerda yoki serverless Vercel handlerlarida ISHLATILMAYDI. Barcha sahifalar (`manim/scenes/*.py`) oldindan `manim/scripts/render.py` orqali MP4 formatida render qilinib, `public/animations/` katalogiga statik joylashtiriladi.
- **Dizayn uyg'unligi:** Qorong'i navy fon (`#090d16`), ranglar (cyan, violet, emerald, amber) veb-platforma bilan to'liq uyg'un.

### B. React Interaktiv Dvigateli
- **Vazifasi:** Slayderlar harakatlanganda darhol real vaqtda matematik qayta hisoblash, egri chiziqlar va tenzor qiymatlarini yangilash.
- **Komponentlar:**
  - `FunctionExplorer.tsx` — Chiziqli, kvadratik, ReLU, Sigmoid, Tanh va ularning analitik hosilalari.
  - `GradientDescent.tsx` — $L(x) = (x - 3)^2$ ustida analitik optimizator, overshooting va tarqalish holatlarini aniqlash.
  - `NeuralNetworkExplorer.tsx` — 2-qatlamli MLP arxitekturasi bo'ylab to'g'ri tarqalish (Forward Pass), $z = \sum w_i x_i + b$ va aktivatsiyalar tahlili.
  - `ManimVideoPlayer.tsx` — Reaktiv video pleyer: tezlikni sozlash (0.75x-1.5x), vaqt shkalasi, to'liq ekran va ovoz nazorati.
  - `VisualizationRenderer.tsx` — Gibrid konteyner: bir tugma bilan "Interaktiv Simulyatsiya" va "Manim Video Darsi" o'rtasida almashish imkoniyati.

