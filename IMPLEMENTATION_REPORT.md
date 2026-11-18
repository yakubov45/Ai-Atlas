# AI Atlas — To'liq Amalga Oshirish Hisoboti (IMPLEMENTATION REPORT)

**Loyiha:** AI Atlas — Interaktiv Sun'iy Intellekt O'quv Platformasi  
**Bosqich:** Phase 1 (Arxitektura & MDX) + Phase 2 (Deep Research Ingestion & Manim Interaktiv Vizualizatsiya Dvigateli) + Phase 3 (Shaxsiylashtirilgan Mikro-Ta'lim Modeli, 3 Chuqurlik Darajasi, Transformer 20 Mikro-Darsi va Q/K/V Mini-Laboratoriya)  
**Holat:** 100% Yakunlandi va Ishlab Chiqarishga Tayyor (Production-Ready)  

---

## 1. Loyiha Qamrovi va Natijalar

| Yo'nalish | Holati | Ko'rsatkichlar / Natijalar |
| :--- | :---: | :--- |
| **Next.js 16 (App Router) + Turbopack** | ✅ Ishlamoqda | Next.js 16.4.6, React 19, TypeScript strict mode |
| **Dizayn Tizimi (Tailwind CSS v4)** | ✅ Bajarildi | Dark/Light mavzular (zero-flash), neon aksentlar (violet/cyan), mobil moslashuvchan |
| **Shaxsiy Yo'nalishlar (5 ta Track)** | ✅ Bajarildi | `LLM Engineer`, `ML Engineer`, `AI Agent Engineer`, `Deep Learning`, `Production ML` |
| **3 ta Chuqurlik Darajasi (Learning Depths)** | ✅ Bajarildi | `Level 1 — Overview`, `Level 2 — Understand`, `Level 3 — Master` |
| **4 Ustunli Mikro-Dars Tizimi** | ✅ Bajarildi | `1. Intuitsiya`, `2. Vizual & Lab`, `3. Matematika`, `4. Amaliyot (Kod)` + `5. Mini-test` |
| **Transformer 20 Mikro-Dars Yo'li** | ✅ 5 modul • 20 dars | *Attention Is All You Need* asosida 5 ta modul va 20 ta atomik mikro-dars |
| **Q/K/V Attention Mini-Laboratoriya** | ✅ Bajarildi | $Q=1.0 \implies$ Token A ($26.9\%$), Token B ($73.1\%$), Vaznli yig'indi $= 4.924$ + Matritsali Heatmap |
| **Adaptiv Yordam ("Bu qismni tushunmadim")** | ✅ Bajarildi | Soddaroq hayotiy analogiya, sonli misol va etishmayotgan tayanch darslarga havola |
| **Kanonik MDX Darslar** | ✅ 39 ta dars | 7 ta yo'nalish bo'yicha ilmiy ta'riflar, matematik formulalar va Python kodlari |
| **Haqiqiy Ilmiy Manbalar (References)** | ✅ 15 ta manba | Vaswani (2017), Bahdanau (2014), LeCun (1998), Kingma (2014), Hochreiter (1997) va b. |
| **Manim CE Animatsiyalar Quvuri** | ✅ 4 ta video | Function Explorer, Gradient Descent, Neural Network va Self-Attention (Q/K/V) MP4 |
| **Avtomatik Tekshiruv (Test & Lint)** | ✅ 100% Yashil | 11 ta test fayli (44 ta test), 0 ta TypeScript xatosi, 0 ta ESLint xatosi |
| **Production Build (SSG)** | ✅ 52+ sahifa | Barcha statik sahifalar muvaffaqiyatli pre-render qilindi (`next build`) |

---

## 2. Yangi O'qitish Modeli (`reja.md` asosida)

### 2.1. O'quvchi o'z yo'nalishini tanlaydi (`src/lib/curriculum/paths.ts` & `SpecializationSelector.tsx`)
O'quvchi 5 ta mutaxassislikdan birini tanlaydi:
- **LLM Engineer** (*Transformers*, *Tokenization*, *Embeddings*, *LLM*, *RAG*, *Prompt Engineering*)
- **ML Engineer** (*Machine Learning*, *Math for DL*, *Gradient Descent*, *Loss Functions*, *Optimizers*)
- **AI Agent Engineer** (*AI Agent*, *Tools*, *Memory*, *RAG*, *Prompt Engineering*)
- **Deep Learning Researcher** (*Deep Learning*, *Backpropagation*, *CNN*, *RNN*, *LSTM*, *Transformers*)
- **Production ML & MLOps** (*Production-Ready ML Structure*, *Production ML Pipeline*)

Tanlangan yo'nalishga qarab barcha 39 ta mavzu avtomatik ravishda ikki oqimga ajratiladi:
- **Deep Learning Path (Asosiy va Tayanch mavzular):** Tanlangan yo'nalishni chuqur (`Understand` va `Master` darajasida) o'rganish.
- **Overview (Boshqa yo'nalishlar haqida umumiy tushuncha):** Yondosh yo'nalishlarni vaqtni tejagan holda 3–5 daqiqalik `Level 1 — Overview` darajasida o'rganish.

### 2.2. Har bir mavzuda 3 ta chuqurlik darajasi (`LearningDepth`)
1. **Level 1 — Overview:** Mavzu nima? Nega kerak? Qayerda ishlatiladi? Oddiy analogiya va bitta vizual misol.
2. **Level 2 — Understand:** Qanday ishlaydi? Bosqichma-bosqich mexanizm, parametrlar, formulalar, interaktiv mini-laboratoriya va Manim animatsiyalari.
3. **Level 3 — Master:** Matematik asoslar, NumPy/PyTorch hisoblashlari, haqiqiy arxitektura, tajribalar va chuqur testlar.

> **Progress tizimi (`src/lib/progress/store.ts`):** `Overview` darajasini tugatish `Master` darajasini tugallangan deb belgilamaydi — har bir chuqurlik (`completedDepths`) va mikro-dars (`completedMicroLessons`) alohida saqlanadi.

### 2.3. Transformer — 20 ta Mikro-Dars va 5 ta Modul (`src/lib/curriculum/transformer-path.ts`)
`/learn/transformers` sahifasida *Attention Is All You Need* maqolasi 5 ta modul va 20 ta kichik darsga bo'lingan:
- **Modul 1 — Asosiy tushunchalar (4 dars):** 1. Transformer nima va nima uchun kerak? 2. RNN qanday ishlaydi? 3. LSTM nimani yaxshilagan? 4. Nega parallel hisoblash muhim?
- **Modul 2 — Matnni tayyorlash (4 dars):** 5. Token nima? 6. Tokenni vektorga aylantirish — Embedding 7. Vektor va matritsa nima? 8. Positional Encoding nima uchun kerak?
- **Modul 3 — Self-Attention (6 dars):** 9. Attention tushunchasi 10. Query, Key va Value 11. Dot Product va similarity 12. Scaling va $\sqrt{d_k}$ 13. Softmax va attention weights 14. Value'larning vaznli yig'indisi
- **Modul 4 — Transformer ichki tuzilishi (3 dars):** 15. Multi-Head Attention 16. Feed-Forward, Residual va Norm 17. Encoder, Decoder va Masked Attention
- **Modul 5 — Natija va amaliyot (3 dars):** 18. Training va inference farqi 19. Transformer va RNN taqqoslash 20. NumPy bilan bitta attention hisoblash

### 2.4. Mini-Laboratoriya: Q/K/V Attention qanday hisoblanadi? (`AttentionExplorer.tsx` & `src/lib/math/attention.ts`)
- **1D Illustrativ Rejim ($d_k = 1$):**
  - Query ($Q$) slayderi (standart $Q = 1.0$)
  - **Token A** ($K = 1, V = 2$) $\implies$ Softmax vazni: **26.9%**
  - **Token B** ($K = 2, V = 6$) $\implies$ Softmax vazni: **73.1%**
  - **Attention natijasi:** $2 \times \text{weight}_A + 6 \times \text{weight}_B =$ **4.924**
  - Jonli NumPy kodi va $K, V, d_k$ parametrlarini o'zgartirib sinash imkoniyati.
- **Ko'p Tokenli Matritsa va Masking Rejimi:**
  - *"Bank daryo qirg'og'ida joylashgan"* gapi uchun to'liq $QK^T / \sqrt{d_k}$ issiqlik xaritasi (Heatmap), $\sqrt{d_k}$ masshtablashni yoqish/o'chirish va **Decoder Causal Mask ($-\infty$)** tajribasi.
- **Manim Animatsiyasi:** `public/animations/attention/self_attention.mp4` (189.5 KB).
