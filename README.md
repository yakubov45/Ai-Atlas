# AI Atlas — Interaktiv Sun'iy Intellekt O'quv Platformasi (Phase 1)

AI Atlas — universitet talabalari va tadqiqotchilar uchun sun'iy intellekt tushunchalarini interaktiv vizualizatsiyalar, animatsiyali diagrammalar, matematik grafiklar va tizimli o'quv yo'l xaritasi orqali chuqur o'rganish platformasi.

> **Asosiy falsafa:** "AI haqida shunchaki o'qimang. Uning qanday ishlashini tadqiq qiling."

---

## 🎯 1-bosqich (Phase 1) Ko'lami

Ushbu bosqichda platformaning to'liq arxitekturasi, dizayn tizimi, interaktiv vizualizatsiya infratuzilmasi, MDX rendering tizimi va talaba o'quv tajribasi (progress, bookmarks, qidiruv) qurildi.

**Qat'iy chegara:** 1-bosqichda sun'iy intellekt bo'yicha uydirma yoki qalbaki ta'limiy maqolalar joylanmadi. Barcha haqiqiy dars kontenti 2-bosqichda yetkazib beriladigan 196 sahifalik Deep Research materiallaridan olinadi.

---

## 🚀 Texnologiyalar Steki

- **Frontend:** Next.js 16 (App Router, Turbopack, Server & Client Components)
- **UI & Stillar:** React 19, Tailwind CSS v4, Lucide Icons, Next Themes / Data Attributes
- **Matematika & Kod:** KaTeX (matematik formulalar), Shiki/MDX (kod bloklari, nusxalash, yig'ish)
- **Vizualizatsiya:** Vektorli SVG, Dynamic imports, xavfsiz ifoda tahlilchisi (evalsiz matematik hisob-kitoblar)
- **Kontent infratuzilmasi:** MDX, Zod (sxema validatsiyasi), Gray-Matter, Unified / Remark / Rehype
- **State & Saqlash:** React 19 SyncExternalStore, LocalStorage (guest o'quv progressi, xatcho'plar, sozlamalar)
- **Sifat & Test:** TypeScript Strict Mode, Vitest (jsdom), ESLint 9

---

## 📂 Loyiha Tuzilmasi

```text
src/
  app/                      # Next.js App Router marshrutlari
    (site)/                 # Bosh sahifa
    learn/                  # Darslar kutubxonasi & filtrlash
    learn/[slug]/           # 3 ustunli texnik dars o'quvchisi
    roadmap/                # Ma'lumotlarga asoslangan yo'l xaritasi (graf & ro'yxat)
    visual-lab/             # Vizual laboratoriya & modullar
    visual-lab/[id]/        # To'liq ekranli vizualizatsiya o'yinchisi
    glossary/               # Alifboli AI atamalar glossariysi
    bookmarks/              # Saqlangan darslar va vizualizatsiyalar
    settings/               # Mavzu, animatsiya, shrift va ma'lumotlar
    api/search-index/       # Qidiruv indeksi API endpointi
  components/
    ui/                     # Button, Badge, Card, Slider, Input, EmptyState
    layout/                 # Header, Footer, Breadcrumbs, TableOfContents
    lessons/                # LessonCard, LessonReader, Sidebar, Bookmark, Complete, Origin
    visualizations/         # FlowDiagram, FunctionPlot, GradientDescentPlot, Container
    roadmap/                # RoadmapGraph, RoadmapList
    search/                 # SearchDialog (Cmd+K tezkor qidiruv)
    mdx/                    # MdxRenderer, CodeBlock, MathBlock, Callout, Cite, Term
  content/                  # Phase 2 uchun tayyorlangan kontent repozitoriysi
    categories.json         # Taksonomiya kategoriyalari
    lessons/                # MDX darslar
    glossary/               # Atamalar
    references/             # Ilmiy manbalar va maqolalar
    visualizations/         # Vizualizatsiya konfiguratsiyalari (JSON)
  lib/                      # Sof biznes logika va algoritmlar
    content/                # Sxema, loader, validator, mdx rendering
    graph/                  # Siklni aniqlash, qatlamli layout, yo'lni yoritish
    math/                   # Xavfsiz parser, sonli hosila, gradient tushish
    search/                 # O'zbekcha tokenizatsiya, BM25-uslubidagi skoring
    progress/               # Guest o'quv progressi va reaktiv store
    preferences/            # Mavzu va ko'rinish sozlamalari
    visualizations/         # Modullar reestri va konfiguratsiya sxemalari
tests/                      # Vitest unit va integratsion testlari
scripts/                    # Kontentni tekshirish va indekslash skriptlari
```

---

## 🛠️ O'rnatish va Ishga Tushirish

### 1. Talablar

- Node.js: `v20.9.0` yoki undan yuqori
- Paket menejeri: `npm` (yoki `pnpm` / `bun`)

### 2. O'rnatish

```bash
npm install
```

### 3. Dasturchi rejimida ishga tushirish

```bash
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching.

### 4. Kontentni tekshirish (Schema & Semantika)

```bash
npm run content:validate
```

### 5. Testlarni ishga tushirish

```bash
npm run test
```

### 6. To'liq tekshiruv (Typecheck + Lint + Test + Validate)

```bash
npm run check
```

### 7. Production build tayyorlash

```bash
npm run build
npm run start
```

---

## 🎨 Asosiy Imkoniyatlar (Phase 1)

1. **3 Ustunli Texnik Dars O'quvchisi:**
   - Chapda: kategoriyalarga ajratilgan darslar va tugatilish belgilari
   - O'rtada: MDX matn, KaTeX formulalar, Shiki kod bloklari (nusxalash, yig'ish), interaktiv vizualizatsiya slaydlari
   - O'ngda: Sahifa mundarijasi (scroll spyi bilan avtomatik yoritish)
   - Yuqorida: O'qish foizi indikatori

2. **Interaktiv Vizualizatsiyalar:**
   - **Oqim diagrammasi (Flow Diagram):** Avtomatik qatlamli joylashuv, tugunni tanlaganda bog'liq yo'lni yoritish, bosqichma-bosqich animatsiyali walkthrough (play, pause, step, reset), zoom va pan.
   - **Funksiya grafigi (Function Plot):** Hech qanday `eval` ishlatmaydigan xavfsiz matematik ifoda tahlilchisi, dinamik parametr slayderlari, kursor bilan aniq koordinatalarni ko'rish.
   - **Gradient tushish (Gradient Descent 1D):** Real vaqtda o'rganish tezligi ($\eta$) va boshlang'ich nuqtani o'zgartirib optimizatsiyani kuzatish, yaqinlashish/uzoqlashish holati monitoringi.
   - **Rejalashtirilgan modullar:** Neyron tarmoq, Transformer, Attention matritsasi, Embedding fazosi va RAG pipeline arxitekturaviy reestri.

3. **O'quv Yo'l Xaritasi (Roadmap):**
   - Darslarning `prerequisites` metadatasidan avtomatik quriladi (hech qanday bog'liqlik o'ylab topilmagan).
   - Graf ko'rinishi (zoom, pan, darsni ochish) va qulay Ro'yxat ko'rinishi.

4. **Tezkor Qidiruv (Cmd+K / Ctrl+K):**
   - O'zbek tili xususiyatlariga (o' / o' / oʻ) moslashtirilgan qidiruv.
   - Dars sarlavhalari, teglari, atamalar va bo'limlar bo'yicha chuqur qidiruv.

5. **Talaba Tajribasi va Maxfiylik:**
   - Ro'yxatdan o'tmasdan LocalStorage orqali progress saqlash.
   - Ma'lumotlarni JSON fayl sifatida eksport va import qilish.
   - Qorong'i va yorug' mavzular, kamaytirilgan harakat (reduced-motion), shrift o'lchamlari.
