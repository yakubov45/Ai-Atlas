# ML & Data Science Academy — 31 Phase, 520 Micro-Lesson Integration Plan

**Scope:** Faqat foydalanuvchi yuborgan ML/DS roadmap (`Вставленный текст(9).txt`) va oldingi mavjud Python (344 lesson) hamda AI Engineering (291 lesson) ID ro‘yxatlari asosida. Tashqi repo URL yoki original rasm fayllari yuborilmagan. Shuning uchun hech qanday rasmni yuklab oldik yoki tashqi manbani tekshirdik deb da’vo qilmaymiz.

## 1. Source audit

- Asl faylda 31 phase va **520** noyob `mlds-NN-NN` dars ID mavjud.
- 5 `published` va 515 `planned`; mavjud published darslarni yaratish / overwrite qilish qat’iyan man etiladi.
- Har phase uchun bitta mini-loyiha va bittadan vizual laboratoriya briefi bor (31/31).
- Phase 01 matnida boshqalar kabi `mlds-01 (Phase 1)` va `14 ta mikro-dars` satri yo‘q; IDlarning o‘zidan 14 ta dars tasdiqlandi. Uning level metadatasi source’da yo‘q, sun’iy yozilmaydi.
- `I.1`, `II.8` kabi manba labels mavjud, lekin repo URL / to‘liq manba ma’lumotlari yo‘q. Bu labelsni URL sifatida talqin qilmang.

## 2. Uch akademiya o‘rtasidagi qoida

**Python Academy (344):** sintaksis, struktur, API, testlash uchun prerequisite; **ML/DS (520):** statistika, data, ML, DL va MLOps uchun asosiy yo‘l; **AI Engineering (291):** LLM, RAG, agents, inference kabi tegishli mavzular uchun qo‘shimcha o‘tish havolasi.

`relatedLessonIds` faqat tekshirilgan mavzu mosligida yaratiladi. Crosslink targeti mavjud bo‘lishi va release vaqtida tekshirilishi kerak. Bitta darsni uch platformada ko‘chirib ko‘paytirmang.

```text
User → Track chooser
      ├── Python Academy → canonical Python prerequisites
      ├── ML & Data Science → 31 phases → 520 micro lessons
      └── AI Engineering → canonical GenAI lessons
ML/DS lesson → theory → visual → examples → quiz → code practice → tests → phase project
```

## 3. Phase-by-phase roadmap

| Phase | Mavzu | Soni | Mini-loyiha | Vizual laboratoriya |
|---|---|---:|---|---|
| mlds-01 | AI va ML kasblari, shaxsiy yo‘l | 14 | Ikki professional yo‘nalishning individual learning path xaritasi | Kasbiy rollar xaritasi |
| mlds-02 | Python poydevori | 19 | CSV fayl statistikasi uchun Python CLI | Python bajarilish trayektori |
| mlds-03 | SQL, algoritmlar va Git | 16 | SQL bilan kichik analitik hisobot + Git repository | SQL transform simulator |
| mlds-04 | NumPy: massivlar va sonli hisoblash | 16 | NumPy bilan vektor va matritsa hisoblash utilitasi | NumPy shape va broadcasting |
| mlds-05 | Pandas va Data Visualization | 18 | Pandas bilan dataset profilini yaratuvchi notebook | Pandas data flow |
| mlds-06 | Data collection va formatlar | 15 | CSV, JSON va API’dan bir xil sxemaga ma’lumot tayyorlash | Data ingestion xaritasi |
| mlds-07 | Data cleaning va yetishmaydigan qiymatlar | 16 | Notoza jadvallarni audit qilib qayta tayyorlash notebook’i | Missing values laboratory |
| mlds-08 | EDA: ma’lumotni tushunish | 16 | EDA hisobot: taqsimot, outlier, missing, correlation | EDA exploration |
| mlds-09 | Chiziqli algebra I: vektor va matritsalar | 16 | NumPy bilan vektor, dot-product va matritsa ko‘paytirish laboratoriyasi | Vektor va matritsa geometriyasi |
| mlds-10 | Chiziqli algebra II: eigen va SVD | 15 | 2D nuqtalarda SVD va PCA komponentlarini taqqoslash | Eigenvector va SVD geometrik lab |
| mlds-11 | Calculus: hosila va gradient | 16 | Derivative va gradientni NumPy orqali hisoblash | Derivative va gradient descent |
| mlds-12 | Ehtimollik va taqsimotlar | 16 | Simulyatsiyada empirical ehtimolliklarni hisoblash | Probability sampler |
| mlds-13 | Statistik inference va gipotezalar | 17 | Ikki guruhni statistik taqqoslovchi notebook | Confidence interval explorer |
| mlds-14 | A/B testing poydevori | 16 | A/B test dizayni va interpretatsiya hisobotini tuzish | A/B testing simulator |
| mlds-15 | Ilg‘or eksperiment va ratio metrics | 16 | CUPED va oddiy A/B estimatorlarini toy datasetda qiyoslash | CUPED/CUPAC variance lab |
| mlds-16 | Preprocessing va Feature Engineering | 18 | Leakage-safe sklearn preprocessing Pipeline | Leakage-safe preprocessing |
| mlds-17 | Regression: sonli qiymatni bashorat qilish | 18 | scikit-learn regressiya loyihasi va residual tahlili | Linear regression loss explorer |
| mlds-18 | Classification va asosiy algoritmlar | 17 | KNN, Logistic Regression va Decision Tree taqqoslash | Classification decision boundary |
| mlds-19 | Model Evaluation metrikalari | 17 | Classification metrikalarini qo‘lda va sklearn bilan tekshirish | Confusion matrix metriks |
| mlds-20 | Validation, tuning va model tanlash | 17 | Reproducible cross-validation + hyperparameter search | K-Fold visualizer |
| mlds-21 | Ensembles: kuchli modellar kombinatsiyasi | 16 | Random Forest vs Gradient Boosting benchmark notebook (natija real hisoblanadi) | Bagging va boosting animation |
| mlds-22 | Unsupervised learning va clustering | 16 | K-Means va Hierarchical clustering taqqoslash | K-Means stepper |
| mlds-23 | Dimensionality Reduction va Autoencoders | 16 | PCA transform va reconstruction notebook | PCA projection explorer |
| mlds-24 | Econometrics va Time Series | 18 | ARIMA yordamida oddiy vaqt qatori prognozi va xatolik tekshiruvi | Time series decomposition |
| mlds-25 | Neural Network poydevori | 19 | Numpy yordamida kichik MLP forward hisoblash | Perceptron va MLP diagrammasi |
| mlds-26 | PyTorch/TensorFlow bilan Deep Learning | 17 | PyTorch’da MLP training loop va validation report | PyTorch training step timeline |
| mlds-27 | CNN va Computer Vision asoslari | 16 | Oddiy CNN image classifier (kichik dataset bilan) | Convolution kernel scanner |
| mlds-28 | RNN, LSTM, GRU va Attention | 16 | Toy RNN/LSTM va attention misolini hisoblash | RNN va attention compare |
| mlds-29 | Transformer, NLP va generative model | 20 | NumPy self-attention toy example + tokenizer va embeddings | Self-attention matrix explorer |
| mlds-30 | Reinforcement Learning va Explainable AI | 17 | Toy Q-learning gridworld va model explanation kartasi | Q-learning gridworld |
| mlds-31 | MLOps, Deployment va real loyiha | 20 | End-to-end train/eval/serve/monitor ML pipeline va hisobot | MLOps lifecycle explorer |

## 4. Har bir mikro-dars uchun aniq schema

```json
{
  "id": "mlds-22-04",
  "originalTitle": "K-Means intuitiv",
  "status": "planned",
  "phaseId": "mlds-22",
  "sourceSections": "I.5 Unsupervised Learning; II.6 Classic ML",
  "prerequisiteLessonIds": [],
  "relatedLessonIds": [],
  "theoryBlocks": [],
  "codeExamples": [],
  "quizQuestions": [],
  "practiceTasks": [],
  "visualLabId": "mlds-lab-22",
  "assetIds": [],
  "completionRules": {"quizPassRate": 0.7, "codeTestsMustPass": true}
}
```
`theoryBlocks`, `codeExamples` va savollar generated source mappingda bo‘sh: ular tayyor dars sifatida da’vo qilinmaydi. Agent yozib, tekshirishi kerak.

## 5. Dars pedagogikasi

1. “Nima va nega” Uzbek B1-B2 oddiy uslubida, atamalarni Inglizcha bilan bog‘lash.
2. Rasm/diagramma interaktiv bo‘lsa, real hisob-kitob; statik tasvir faqat licensed yoki original.
3. 2 ta kod misoli: **A** sodda 5–15 satr, **B** dataset bilan kichik ishlash. Kode self-contained yoki aniq dependency kerak.
4. 3 bilim testi: concept, output prediction, debugging. Tushunarsiz “hammasi to‘g‘ri” savollar yo‘q.
5. 2 amaliy kod mashq: intermediate va hard, boundary case va unit tests bilan.
6. Phase yakunida original mini-loyiha, reproducible result, README, test va review checklist.
7. Dars statusi original `published/planned`dan alohida `content_generation_status` bilan nazorat qilinadi.

## 6. 31 vizual laboratoriya: texnik qoida

`ml_ds_31_visual_labs.json` dagi barcha laboratoriyalar birma-bir implementatsiya qilinadi: input state, hisoblash funksiyasi, chart/diagram, natija, reset, tests. Har bir vizual reja hozir `spec_only`, real komponent emas.

### Qiyin mavzularni qanday o‘rgatish

- **Broadcasting (mlds-04-09):** `(3,1) + (1,4)` natijasi `(3,4)`, mos bo‘lmagan shape uchun xatoni vizual ko‘rsatish.
- **Derivative (mlds-11-04, published):** mavjud matnni o‘zgartirmasdan, original interaktiv grafigini alohida lab sifatida ulash.
- **Confusion matrix (mlds-19-03, published):** TP/FP/FN/TN slider va metrikalarni aniq formuladan hisoblash.
- **K-Means (mlds-22-04):** assignment/update/convergence stepper; centroidlar qiymati foydalanuvchi nuqtalaridan olinadi.
- **Self-attention (mlds-29-08):** QKᵀ/√dk → row-wise softmax → weighted V; mask bilan alohida rejim.
- **MLOps (mlds-31):** simulyatsiya bo‘lsa demo deb belgilash, haqiqiy telemetry bo‘lmasa production dashboard raqamlari ko‘rsatilmasin.

## 7. Rasm va diagramma pipeline

**Attachment holati:** berilgan `.txt` fayl matnli roadmap, original rasm fayllari va manba URL yo‘q. Shu bois yangi platformaga images avtomatik kiritilmagan.

Keyinchalik tasdiqlangan manba berilsa:
1. `git clone`/download faqat to‘g‘ri manba va ruxsat asosida; commit SHA yozib qo‘yish.
2. `.md`dagi `![](path)`, HTML `<img>`, Mermaid blocks va assets inventarizatsiya qilish.
3. Har asset uchun `id`, `sourceURL`, `license`, `author`, `credit`, `sha256`, `relatedLessonIds`, `format` metadata saqlash.
4. Ruxsat berilmagan fayllarni hostingga ko‘chirmaslik; aniq manbaga link berish yoki noldan original rasmlar chizish.
5. Diagrammalar uchun xavfsiz Mermaid renderer, statik PNG/WebP/SVG uchun optimize va lazy-loading; foydalanuvchi yuborgan SVG ichidagi scriptlarni sanitize qilish.
6. Rasm har bir dars uchun nusxalanmaydi; asset registry ID orqali qayta ishlatiladi.

### Asset registry schema

```json
{
  "id": "ml-gradient-flow-01",
  "type": "original_svg",
  "sourceURL": null,
  "license": "original_authoring_required",
  "sha256": null,
  "relatedLessonIds": ["mlds-11-09", "mlds-11-13"],
  "filePath": null,
  "status": "planned"
}
```

## 8. Integratsiya talablari

- **DB:** Track, Phase, Lesson, LessonPrerequisite, LessonRelation, VisualAsset, VisualLab, Quiz, Submission, ProjectEvaluation; status va progress distinct.
- **Migration:** idempotent upsert, published entries read-only, referential integrity, rollback, audit log.
- **Learner:** prerequisite check, completed markers, try again state, hints before solution, per-task hidden tests server-side.
- **Code runner:** Python execute faqat sandbox/container bilan CPU/RAM/time/network cheklovlarida; server secrets va internal endpointsga kira olmasin.
- **Data lab:** reproducible synthetic or explicitly attributed public datasets; no fabricated metrics.
- **Observability:** generated content QA status, lesson failures, lab errors, learner success no sensitive code logs.
- **Performance:** visual lab lazy-loaded, charts responsive, keyboard navigation and reduced-motion fallback.

## 9. Implementatsiya bosqichlari

**Sprint 0 (Audit):** existing DB/schema/read-only inspect; backups; 520 ids and 5 published lock.
**Sprint 1 (Pilot):** mlds-01, mlds-02 prereqs, mlds-04-09 broadcasting, mlds-19-03 locked published crosslink, mlds-22-04 K-Means original lab; import test.
**Sprint 2 (Core Python/Data):** phase 02–08; examples/tests, datasets and parser.
**Sprint 3 (Math/Statistics):** phase 09–15; vector, gradient, distribution and A/B labs.
**Sprint 4 (Classic ML):** phase 16–24; leakage-safe pipelines, metrics, clustering, time series.
**Sprint 5 (DL/MLOps):** phase 25–31; PyTorch, CNN, attention, RL and production.
**Sprint 6 (Release):** full link check, license audit, published content diff=0, performance, security, accessibility. Production deploy only explicit approval.

## 10. Qabul mezonlari

- [ ] 31 phase va 520 original lesson IDs va titles preserved.
- [ ] 5 published lesson unchanged; 515 planned lesson content release-gated.
- [ ] 31 original phase projects linked with tested acceptance criteria.
- [ ] 31 lab specs have working accessible implementation before status changed to implemented.
- [ ] All crosslinks reference existing IDs and are not forced to exist when missing.
- [ ] No copied repository images without license permission.
- [ ] Theory, quizzes, runnable code, expected outputs and hidden tests validated; no fake completions.
- [ ] No production writes/deploy by default.