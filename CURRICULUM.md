# AI Atlas — AI Engineer 20-Phase Curriculum & 291 Micro-Lesson Architecture

Ushbu hujjat `ai engineering/` paketi (`AI_Engineer_20_Phase_Roadmap.md`, `AI_Engineer_Curriculum.json`, `AI_Engineer_Micro_Lesson_Namuna.md`, `AI_Engineer_Website_Agent_Prompt.md`) asosida qurilgan **20 ta faza**, **291 ta mikro-dars**, **6 ta ixtisoslik yo‘nalishi (Tracks)** va **6 ta amaliy loyiha + Capstone** arxitekturasini tavsiflaydi.

---

## 1. O‘qitish Modeli va 3 Chuqurlik Darajasi

Har bir mikro-dars (`01.01` dan `20.17` gacha) 3 ta chuqurlik darajasiga bo‘linadi:

1. **Level 1 — Overview (`overview`)**:
   - Mavzu nima? Nima uchun kerak? Qayerda ishlatiladi?
   - Hayotiy analogiya va bitta vizual misol.
2. **Level 2 — Understand (`understand`)**:
   - Qanday ishlaydi? Bosqichma-bosqich mexanizm, interaktiv laboratoriya, matematik formula va Manim animatsiyasi.
   - **"Tushunmadim" (Remediation & Prerequisite Detour)**: Soddaroq tushuntirish, sonli misol va tayanch darsga o‘tish (`detourReturnTo` orqali aynan kelgan dars, chuqurlik va qadamga bir tugma bilan qaytish).
3. **Level 3 — Master (`master`)**:
   - Matematik chekka holatlar (masalan, nol vektor xatosi, yuqori o‘lchamli fazo), Python / NumPy / PyTorch kod hisoblashlari, RAG metrikalari (`Hit@k`, `MRR`) va amaliy muhandislik qarorlari.

---

## 2. 6 ta AI Engineer Ixtisoslik Yo‘nalishlari (Tracks)

| Track ID | Nomi | Core (Majburiy) Fazalar | Supporting (Tayanch) Fazalar | Advanced Fazalar |
|---|---|---|---|---|
| `general-ai` | **General AI Engineer** | `01`–`20` (barcha 20 ta faza) | — | `11`, `19`, `20` |
| `llm-apps` | **AI Application / LLM Engineer** | `01`, `02`, `09`, `10`, `12`, `13`, `14`, `17`, `18`, `20` | `03`, `06`, `07`, `08`, `15`, `16` | `11`, `19` |
| `rag-engineer` | **RAG Engineer** | `01`, `02`, `03`, `09`, `12`, `13`, `14`, `15`, `16`, `18`, `20` | `07`, `08`, `10`, `17` | `11`, `19` |
| `agent-mcp` | **AI Agent / MCP Engineer** | `01`, `02`, `09`, `10`, `13`, `14`, `17`, `18`, `20` | `03`, `12`, `15`, `16` | `11`, `19` |
| `local-ai` | **Local AI Engineer** | `01`, `02`, `06`, `07`, `09`, `10`, `11`, `12`, `18`, `19`, `20` | `03`, `04`, `05`, `08`, `13`, `14` | `15`, `16`, `17` |
| `multimodal` | **Multimodal AI Engineer** | `01`, `02`, `06`, `07`, `08`, `09`, `10`, `12`, `18`, `19`, `20` | `03`, `13`, `14`, `17` | `11`, `15`, `16` |

---

## 3. 20 ta Faza va 291 ta Mikro-Dars Jadvali

| Phase ID | Faza Nomi | Mikro-darslar oralig‘i | Darslar soni | Mini-Loyiha | Vizual / Interaktiv Laboratoriya |
|---|---|---|---:|---|---|
| `01` | Dasturlash va kompyuter asoslari | `01.01` – `01.15` | 15 | CLI JSON validator va log parser | Request -> API -> JSON -> Parser oqim diagrammasi |
| `02` | AI Engineer uchun Python | `02.01` – `02.18` | 18 | Async AI API client (retry va timeout bilan) | Sync va Async so'rovlar vaqt chizig'i |
| `03` | Ma'lumotlar tuzilmasi, fayllar va SQL | `03.01` – `03.14` | 14 | Hujjatlarni tozalash va SQLite bazaga yuklash | Raw text -> Clean text -> Chunk -> Table pipeline |
| `04` | Matematika: chiziqli algebra, ehtimollik va optimizatsiya | `04.01` – `04.18` | 18 | NumPy bilan cosine similarity va 1D gradient descent | 2D vektor burchagi va loss tepalikdan tushish |
| `05` | Klassik Machine Learning va baholash | `05.01` – `05.16` | 16 | Klassifikator va confusion matrix hisobot | Train/Val/Test va precision-recall trade-off |
| `06` | Neyron tarmoqlar va Deep Learning asoslari | `06.01` – `06.17` | 17 | 2 qatlamli neyron tarmoqni NumPy va PyTorch'da qurish | Forward va backward signal oqimi |
| `07` | PyTorch va zamonaviy DL arxitekturalar | `07.01` – `07.14` | 14 | PyTorch training loop va model checkpoint | CNN, RNN, LSTM va Transformer taqqoslash |
| `08` | NLP evolutsiyasi va Transformer arxitekturasi | `08.01` – `08.20` | 20 | 1D va 2D attention kalkulyator | Q, K, V, Softmax va Value vaznli yig'indisi (`AttentionExplorer`) |
| `09` | LLM asoslari, tokenizatsiya va inference | `09.01` – `09.16` | 16 | Token counter, cost estimator va sampling playground | Temperature va top-p ehtimollik taqsimoti |
| `10` | Prompt Engineering va Structured Outputs | `10.01` – `10.14` | 14 | JSON schema asosida ma'lumot ajratuvchi xizmat | Prompt -> LLM -> Schema validator -> Retry |
| `11` | Fine-tuning, LoRA, QLoRA va Alignment | `11.01` – `11.14` | 14 | Prompting, RAG yoki LoRA tanlash qaror jadvali | Frozen base weight + kichik LoRA adapter |
| `12` | Embeddings, similarity va Vector Database | `12.01` – `12.14` | 14 | Mini semantic search engine | 2D embedding maydoni va Cosine Similarity (`CosineSimilarityExplorer`) |
| `13` | Ma'lumot tayyorlash, parsing va chunking | `13.01` – `13.12` | 12 | Markdown/PDF chunker va metadata indeksator | Chunk size va overlap slayderi (`RagPipelineExplorer`) |
| `14` | RAG asoslari: kichik, ishlaydigan tizim | `14.01` – `14.12` | 12 | Manba ko'rsatadigan mini RAG | Savol -> Top-k chunk -> Grounded javob (`RagPipelineExplorer`) |
| `15` | Advanced RAG, Hybrid Search va Reranking | `15.01` – `15.14` | 14 | BM25 + vector hybrid search va reranker | Dense + Sparse -> Fusion -> Reranker |
| `16` | RAG va LLM baholash: sifat, xavfsizlik va narx | `16.01` – `16.12` | 12 | 20 savollik RAG evaluation skripti | Faithfulness, Relevance, Hit@k va MRR (`RagPipelineExplorer`) |
| `17` | AI Agents, Function Calling va MCP | `17.01` – `17.16` | 16 | Tool-use agent: qidiruv, kalkulyator va fayl o'qish | Goal -> Plan -> Tool -> Observation -> Stop |
| `18` | Backend, FastAPI, Docker, Streaming va Production | `18.01` – `18.16` | 16 | FastAPI + SSE streaming + Docker AI xizmati | Client -> API -> Queue -> Cache -> Model |
| `19` | Local AI, Quantization, Multimodal va Inference | `19.01` – `19.12` | 12 | Lokal model va API model benchmark | FP16, INT8, INT4 xotira/sifat taqqoslash |
| `20` | Xavfsizlik, Guardrails, Monitoring va AI mahsulot | `20.01` – `20.17` | 17 | To'liq AI Knowledge Assistant (Capstone) | Guardrail -> Router -> RAG/Agent -> Eval -> Logs |

**Jami (AI Engineer)**: **20 ta faza**, **291 ta mikro-dars**.

---

## 4. Machine Learning Engineer + AI & Data Scientist (31 ta Faza • 520 ta Mikro-Dars — `mlds-01`..`mlds-31`)

`ml learning/ML_DataScience_31_Phase_Roadmap.md`, `ML_DataScience_Curriculum.json` va `ML_DataScience_Micro_Lesson_Namuna.md` asosida platformaga **31 ta faza** va **520 ta mikro-dars** (`mlds-01-01` dan `mlds-31-20` gacha) qo‘shildi.

### 3 ta ML / Data Science Yo‘nalishi (`ML_DS_TRACKS`):
1. **Machine Learning Engineer (`ml-engineer`)**: Matematika, ma’lumot tayyorlash, Supervised/Unsupervised ML, model o‘qitish va validatsiya, Ensembles, Deep Learning va MLOps deployment.
2. **AI & Data Scientist (`data-scientist`)**: SQL/Python, EDA, ehtimollik va statistik inference, A/B testing dizayni, CUPED/stratification, Econometrics, Time Series va interpretatsion ML.
3. **AI Engineer uchun ML/DS poydevori (`ai-engineer-bridge`)**: Oldingi 20-fazali AI Engineer yo‘liga qo‘shimcha ko‘prik (`01.01`..`20.17` IDlar o‘zgartirilmasdan saqlangan va o‘zaro crosslink qilingan).

### Asosiy Interaktiv Vertikal Kesimlar (ML & Data Science):
- **`mlds-11-13` — Gradient descent g‘oyasi (11 qadamli to‘liq dars)**:
  - $L(w) = (w - 3)^2$, hosila $\frac{dL}{dw} = 2(w - 3)$, $w_{t+1} = w_t - \eta \frac{dL}{dw}(w_t)$.
  - `w = 0, η = 0.1` uchun 3 ta iteratsiya jadvali: `(1, 0.600, 5.760)`, `(2, 1.080, 3.6864)`, `(3, 1.464, 2.359296)`.
  - `"Tushunmadim"` prerequisite detour: `mlds-11-04` (*Derivative intuitiv ma’nosi*) va `mlds-11-09` (*Gradient vector nima?*) darslariga o‘tib, aynan kelgan qadamga qaytish.
  - Manim animatsiyasi (`public/animations/gradient-descent/gradient_descent.mp4`) + React interaktiv grafik (`w_start: -5..10`, `η: 0..1.2`, Step, Play, Pause, Reset).
- **`mlds-19-03` — Confusion Matrix, Precision, Recall va F1-Score Lab**:
  - 12 ta namunaviy ehtimollik ustida Threshold ($\tau$) slayderi yoki qo‘lda `TP`, `FP`, `FN`, `TN` boshqaruvi hamda nol maxraj (`TP + FP = 0`) himoyasi.
- **`mlds-14-01` — A/B Testing, p-value, 95% CI va CUPED Variance Reduction Lab**:
  - Control va Treatment konversiyalari, $z$-score, ikki tomonlama $p$-value va pre-experiment kovariata korrelyatsiyasi $\rho$ orqali CUPED dispersiyani kamaytirish ($\text{Var}_{\text{CUPED}} = \text{Var} \cdot (1 - \rho^2)$).

---

## 4.5. Data Scientist 20-Phase Deep-Dive Kengaytmasi (`dsx-01`..`dsx-20` • 309 ta Navigatsiya Tuguni)

`data scientist/Data_Scientist_20_Phase_Roadmap.md`, `Data_Scientist_Deep_Curriculum.json`, `Data_Scientist_Micro_Lesson_AB_CUPED.md` va `Data_Scientist_Website_Agent_Prompt.md` asosida mavjud `data-scientist` yo‘nalishining chuqurlashtirilgan kengaytmasi qo‘shildi:
- **20 ta faza (`dsx-01`..`dsx-20`)** va **309 ta navigatsiya tuguni (`dsx-01-n001`..`dsx-20-n014`)**:
  - **152 ta `reuse-existing` (`↗`) tugun**: Mavjud `mlds-*` mikro-darslariga qayta yo‘naltiradi va `resolveCanonicalProgressKey` (`contentRef`) orqali progressni ikkala ko‘rinishda sinxron saqlaydi.
  - **157 ta `proposed-extension` (`+`) tugun**: Data Scientist uchun chuqurlashtirilgan eksperiment, ekonometrika, time series va MLOps mavzulari (`dsx-01-c006`..`dsx-20-c014`).
- **To‘liq ishlangan Data Scientist Vertikal Kesimlari**:
  1. **`dsx-12-c011` (`mlds-15-05`) — A/B Testing → CUPED (9 qadamli namuna dars)**:
     - 8 ta synthetic kuzatuv (`Control: (1,3),(2,4),(3,7),(4,8)`, `Treatment: (3,8),(4,9),(5,12),(6,13)`), `Pooled X mean = 3.500`, $\theta = \operatorname{Cov}(X,Y)/\operatorname{Var}(X) = 38/18 \approx 2.111111$, `Raw difference = 5.000`, `Control adjusted mean = 7.611`, `Treatment adjusted mean = 8.389`, `Adjusted difference = 0.778`.
     - `Var(X) = 0` nol maxraj himoyasi, `examples/python/cuped_demo.py` (tashqi kutubxonasiz ishlaydigan Python skripti) va `examples/manim/ab_experiment.py` → `public/animations/ab_experiment.mp4` Manim animatsiyasi.
  2. **`dsx-07-c013` (`mlds-13-07`) — Markaziy Limit Teoremasi (CLT) va 95% CI Simulyatori**:
     - Qiyshiq (`skewed-right`), ikki cho‘qqili (`bimodal`) va tekis (`uniform`) populyatsiyalardan qayta-qayta tanlanma olish, $\text{SE} = \sigma / \sqrt{n}$ va 95% CI qamrovini tekshirish.
  3. **`dsx-14-c011` (`mlds-15-14`) — Ratio Metrics (CTR) va Delta Method Lab**:
     - `Ratio of Sums` ($\sum N_i / \sum D_i$) va `Mean of User Ratios` ($\frac{1}{k}\sum N_i/D_i$) farqi hamda birinchi tartibli Taylor / Delta Method dispersiya formulasi.

---

## 4.8. Python Developer 20-Phase Shared Foundation (`py-01`..`py-20` • 344 ta Mikro-Dars)

`Python/Python_Developer_20_Phase_Roadmap.md`, `Python_Developer_Curriculum.json`, `Python_Recursion_Micro_Lesson_Namuna.md` va `Python_Developer_Website_Agent_Prompt.md` asosida platformaga **20 ta faza (`py-01`..`py-20`)** va **344 ta mikro-dars (`py-01-01`..`py-20-21`)** qo‘shildi:
- **4 ta yo‘nalish uchun moslashtirilgan ustuvorlik (`trackPriority`)**: `python-developer`, `ai-engineer`, `ml-engineer`, `data-scientist`.
- **29 ta `existingContentCandidate` tugun**: Mavjud `mlds-02-*` va `mlds-03-*` darslariga avtomatik alias qilmasdan, alohida `py-*` ID ostida saqlanadi va nomzod kesishma sifatida ko‘rsatiladi (`candidate-mapping-require-review`).
- **To‘liq ishlangan Python Vertikal Kesimlari**:
  1. **`py-10-10` / `py-10-12` — Recursion va Call Stack (`factorial(n)`)**:
     - `n = 0..7` hamda `n = -1 (ValueError)` uchun deterministik chaqiriq va qaytish (`Push` / `Pop`) qadamlari (`n = 4` da `Python_Recursion_Micro_Lesson_Namuna.md` dagi aniq 8 qadam).
     - `FactorialCallStackLab.tsx` (`Previous`, `Play/Pause`, `Next Step`, `Reset`) + Manim Community v0.22.0 animatsiyasi (`examples/manim/factorial_call_stack.py` → `public/animations/factorial_call_stack.mp4`).
  2. **`py-03-13` / `py-05-18` / `py-06-07` — Python Reference Semantics**:
     - `==` (qiymat tengligi) va `is` (obyekt aynanligi) farqi, `b = a` (aliasing) vs `b = a.copy()`, hamda `def fn(items=[])` mutable default argument tuzog‘i.
  3. **`py-10-13` / `py-10-14` — Binary Search `O(log n)` vs Linear Search `O(n)`**:
     - Tartiblanganlik (`sorted`) sharti buzilganda xatolik tahlili va qadam-baqadam indeks taqqoslash.

---

## 4.9. Data Engineer 20-Phase Shared Pathway (`de-01`..`de-20` • 358 ta Mikro-Dars)

`data engineering/Data_Engineering_20_Phase_Roadmap.md`, `Data_Engineering_Curriculum.json`, `Data_Engineering_Micro_Lesson_ETL_ELT.md` va `Data_Engineering_Website_Agent_Prompt.md` asosida platformaga 5-chi asosiy mutaxassislik sifatida **Data Engineer (`de-01`..`de-20`, 358 ta mikro-dars `de-01-01`..`de-20-30`)** qo‘shildi:
- **5 ta kasbiy yo‘nalish bo‘yicha moslashuvchan ustuvorlik (`tracks`)**: `data-engineer` (Core), `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`.
- **Halol maqom (`status`)**: `de-11-08` (`ETL vs ELT qayerda mos?`) barcha 3 chuqurlik darajasida (`Overview`, `Understand` 20 qadam, `Master`) to‘liq `published` sifatida taqdim etildi; qolgan 357 ta mikro-dars esa `planned` maqomida saqlanadi.
- **27 ta foydalanuvchi taqdim etgan tashqi manba (`resourceIndex`)**: `urlStatus: "user_supplied_not_live_verified"` sifatida ochiq ko‘rsatilgan.
- **To‘liq ishlangan Data Engineering Vertikal Kesimi va Mini-Laboratoriyalari (`ETLvsELTLab.tsx`)**:
  1. **`de-11-08` — ETL vs ELT Pipeline, Quarantine va Idempotent Upsert (20 qadam)**:
     - 5 ta sintetik buyurtma hodisasi (`e-001`..`e-005`): `4` ta yaroqli hodisa, `1` ta karantin (`e-004` `amountText="oops"` → `reason="invalid_amount"`, hech qachon yashirincha o‘chirilmaydi / no silent drop), `3` ta yakuniy buyurtma (`101 -> 135.00`, `102 -> 80.00`, `104 -> 20.00`) va aniq o‘nli tiyinlarda hisoblangan `235.00` jami tushum.
     - Takroriy `eventId` va Replay Idempotency sinovi (`batch + batch` yuborilganda ham `3` ta buyurtma va `235.00` o‘zgarmaydi).
     - `examples/python/etl_elt_engine.py` (Decimal asosidagi Python dvigateli) + `examples/manim/etl_elt_pipeline.py` → `public/animations/etl_elt_pipeline.mp4` Manim animatsiyasi.
  2. **`de-08-12` — Slowly Changing Dimension (SCD Type 2) Tarix Jadvali**:
     - `valid_from`, `valid_to`, `is_current` ustunlari orqali ustma-ust tushmaydigan (non-overlapping) tarixiy davrlar simulyatori.
  3. **`de-14-07` / `de-14-09` — Kafka Partition Key va Ordering Simulyatori**:
     - `partition = orderId % numPartitions` orqali bir xil `orderId` (`101`) hodisalari har doim bitta partition ichida ketma-ket offset olishini ko‘rsatadi.

---

## 4.10. Prompt Engineering Specialist 20-Phase Pathway (`pe-01`..`pe-20` • 313 ta Mikro-Dars)

`prompt engineering/Prompt_Engineering_20_Phase_Roadmap.md`, `Prompt_Engineering_Curriculum.json`, `Prompt_Engineering_Micro_Lesson_Sampling.md` va `Prompt_Engineering_Website_Agent_Prompt.md` asosida platformaga 6-chi asosiy mutaxassislik sifatida **Prompt Engineering Specialist (`pe-01`..`pe-20`, 313 ta mikro-dars `pe-01-01`..`pe-20-18`)** qo‘shildi:
- **6 ta kasbiy yo‘nalish bo‘yicha moslashuvchan ustuvorlik (`trackPriority`)**: `prompt-engineer` (Core), `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`, `data-engineer`.
- **Halol maqom (`status`)**: `pe-06-06` (`Temperature`), `pe-07-02` (`Top-K`) va `pe-07-04` (`Top-P`) bog‘langan vertikal dars tugunlari barcha 3 chuqurlik darajasida (`Overview`, `Understand`, `Master`) `published` sifatida taqdim etildi; qolgan 310 ta mikro-dars esa `planned` maqomida saqlanadi.
- **22 ta `candidateReuse` bog‘lanishi**: Mavjud `ai-engineer` darslariga avtomatik alias qilmasdan, `review_required_not_an_alias` sifatida ko‘rsatiladi.
- **13 ta manba nomi (`resourceIndex`)**: `urlStatus: "not_supplied_or_live_verified"` sifatida ochiq ko‘rsatilgan.
- **To‘liq ishlangan Prompt Engineering Vertikal Kesimi va Mini-Laboratoriyalari (`SamplingPlayground.tsx`)**:
  1. **`pe-06-06` / `pe-07-02` / `pe-07-04` — Temperature, Top-K, Top-P va Seeded Sampling**:
     - 4 ta sintetik logit (`Python=2.4`, `matematika=1.4`, `LLM=0.6`, `fizika=-0.2`) ustida `T=1, K=4, P=1` da aniq `Python: 62.21%, matematika: 22.89%, LLM: 10.28%, fizika: 4.62%` taqsimoti.
     - Stabil softmax (`exp((z - max(z))/T)`), `T=0` greedy holati (API determinizm eslatmasi bilan), `Top-K` kesish, `Top-P` nucleus filtrlash va o‘quv `frequency_penalty` (`z'_i = z_i - α·c_i`) operatori.
     - `examples/python/sampling_math.py` + `examples/manim/sampling_explained.py` → `public/animations/sampling_explained.mp4` Manim animatsiyasi.
  2. **`pe-03-01` / `pe-15-10` / `pe-17-05` — Prompt Anatomy va Delimiter Escaping**:
     - `<instruction>`, `<context>`, `<user_input trust="untrusted">` va `<output_format>` bloklari hamda `</user_input>` breakout hujumini XML escaping bilan zararsizlantirish (va server ruxsatlari zarurligi haqida ogohlantirish).
  3. **`pe-19-14` / `pe-19-16` — Calibration va Overconfidence Gap**:
     - Modelning o‘z-o‘zini baholashi (self-rating) haqiqiy kalibrovkaga teng emasligini Brier Score va Empirical Accuracy orqali ko‘rsatish.

---

## 5. 6 ta Amaliy Loyiha va Yakuniy Capstone

1. **Loyiha #1 (Fazalar 01, 02, 10)**: *Structured AI CLI Assistant* — Pydantic JSON sxema, retry va token/cost hisoblagich.
2. **Loyiha #2 (Fazalar 04, 12)**: *Embedding Explorer va Semantic Search* — Dot product, Norm, Cosine Similarity (`12.07`) va Top-k qidiruv.
3. **Loyiha #3 (Fazalar 03, 13, 14)**: *Manbali Mini-RAG* — Chunking (`chunkSize`, `chunkOverlap`), Cosine retrieval, `[chunkId]` manba ko‘rsatish va No-Answer Policy (`14.06`).
4. **Loyiha #4 (Fazalar 15, 16)**: *Hybrid RAG + Evaluation Suite* — BM25 + Vector qidiruv, Reranker hamda `Hit@k` va `MRR` baholash jadvali (`15.08`).
5. **Loyiha #5 (Faza 17)**: *MCP va Tool-Using Agent* — Qat'iy JSON Schema, `max_steps` cheklovi va xavfsiz tool calling.
6. **Loyiha #6 (Fazalar 18, 19, 20)**: *Production AI Service* — FastAPI, SSE streaming, Docker, Guardrails va monitoring.
7. **Yakuniy Capstone (Fazalar 01–20)**: **AI Knowledge Assistant** — O‘zbek tilidagi texnik hujjatlar ustida ishlovchi, manba ko‘rsatuvchi, baholangan va xavfsiz AI muhandislik tizimi.
