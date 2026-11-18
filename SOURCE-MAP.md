# AI Atlas — Source Map (`SOURCE-MAP.md`)

Ushbu hujjat foydalanuvchi tomonidan taqdim etilgan birlamchi o‘quv va ilmiy manbalar (`deep research 1.md`, `deep research 2.md`, `reja.md`, va `ai engineering/` katalogi) qanday qilib platformaning kod bazasi, darslari, matematik modullari va interaktiv laboratoriyalariga bog‘langanini aniq ko‘rsatadi.

---

## 1. Birlamchi Manba Hujjatlari → Platforma Fayllari Xaritasi

| Birlamchi Manba Fayli | Vazifasi | Platformadagi Implementatsiya Fayllari |
|---|---|---|
| `deep research 1.md` & `deep research 2.md` | 39 ta kanonik AI / ML / DL / LLM / RAG / Agent ilmiy maqolalari va akademik iqtiboslar | `src/content/lessons/*.mdx` (39 ta dars)<br>`src/content/references/academic-papers.json` (15 ta tasdiqlangan ilmiy manba)<br>`scripts/ingest-research.ts` |
| `reja.md` | 3-darajali chuqurlik tizimi (`Overview`, `Understand`, `Master`), 20-darsli Transformer Learning Path va Q/K/V Attention Mini-Lab talablari | `src/lib/curriculum/paths.ts`<br>`src/lib/curriculum/transformer-path.ts`<br>`src/lib/math/attention.ts`<br>`src/components/visualizations/AttentionExplorer.tsx`<br>`manim/scenes/attention.py` → `public/animations/attention/self_attention.mp4` |
| `ai engineering/AI_Engineer_20_Phase_Roadmap.md` | 20 ta faza (`Phase 01`..`Phase 20`), 6 ta ixtisoslik yo‘nalishi (Tracks), 6 ta amaliy loyiha + Capstone | `src/lib/curriculum/ai-engineer.ts`<br>`src/components/curriculum/AiEngineerExplorer.tsx`<br>`src/app/roadmap/RoadmapClient.tsx`<br>`CURRICULUM.md` |
| `ai engineering/AI_Engineer_Curriculum.json` | Barcha 20 ta faza va 291 ta mikro-darsning (`01.01`..`20.17`) mashina o‘qiy oladigan reestri | `src/content/curriculum/ai-engineer-curriculum.json`<br>`src/lib/curriculum/ai-engineer.ts` |
| `ai engineering/AI_Engineer_Micro_Lesson_Namuna.md` | `12.07 — Cosine similarity` uchun 13 qadamli (`Overview` 1–3, `Understand` 4–9, `Master` 10–13) namuna mikro-dars, nol vektor xatosi, "Tushunmadim" prerequisite detour (`12.04`) | `src/lib/math/cosine-similarity.ts`<br>`src/components/visualizations/CosineSimilarityExplorer.tsx`<br>`manim/scenes/cosine_similarity.py` → `public/animations/vectors/cosine_similarity.mp4`<br>`src/lib/curriculum/ai-engineer.ts` (`12.02`, `12.04`, `12.05`, `12.07`) |
| `ai engineering/AI_Engineer_Website_Agent_Prompt.md` | Vertikal kesimlar (Phase 12 Cosine Similarity + Phase 14–16 RAG Sandbox & Hit@k / MRR), halollik qoidalari va test mezonlari | `src/lib/math/rag-sandbox.ts`<br>`src/components/visualizations/RagPipelineExplorer.tsx`<br>`src/lib/progress/repository.ts` (`detourReturnTo`, `lastMicroStep`)<br>`tests/math-cosine-similarity.test.ts`<br>`tests/math-rag-sandbox.test.ts`<br>`tests/ai-engineer-curriculum.test.ts` |
| `ml learning/ML_DataScience_31_Phase_Roadmap.md` & `ML_DataScience_Curriculum.json` | 31 ta faza (`mlds-01`..`mlds-31`), 520 ta mikro-dars (`mlds-01-01`..`mlds-31-20`), 3 ta Track (`ml-engineer`, `data-scientist`, `ai-engineer-bridge`) | `src/content/curriculum/ml-ds-curriculum.json`<br>`src/lib/curriculum/ml-ds.ts`<br>`src/components/curriculum/MlDsExplorer.tsx` |
| `ml learning/ML_DataScience_Micro_Lesson_Namuna.md` & `ML_DataScience_Website_Agent_Prompt.md` | `mlds-11-13` (11 qadamli Gradient Descent $L(w)=(w-3)^2$), `mlds-11-04`, `mlds-11-09`, Phase 19 Confusion Matrix va Phase 14–15 A/B Test + CUPED laboratoriyalari | `src/lib/math/gradient-descent.ts`<br>`src/components/visualizations/GradientDescent.tsx`<br>`src/lib/math/ml-ds-labs.ts`<br>`src/components/visualizations/MlDsGuaranteeLabs.tsx`<br>`tests/ml-ds-curriculum.test.ts` |
| `data scientist/Data_Scientist_20_Phase_Roadmap.md` & `Data_Scientist_Deep_Curriculum.json` | 20 ta faza (`dsx-01`..`dsx-20`), 309 ta navigatsiya tuguni (152 `reuse-existing` `mlds-*` + 157 `proposed-extension` `dsx-*-c*`), 47 ta manba qidiruv yo‘nalishi (`resourceIndex`) | `src/content/curriculum/ds-deep-curriculum.json`<br>`src/lib/curriculum/ds-deep.ts`<br>`src/components/curriculum/DsDeepDivePanel.tsx` |
| `data scientist/Data_Scientist_Micro_Lesson_AB_CUPED.md` & `Data_Scientist_Website_Agent_Prompt.md` | 8 ta kuzatuvli CUPED namuna darsi (`X̄=3.500`, `θ=2.111111`, `Raw=5.000`, `Adj=0.778`), CLT Monte-Karlo simulyatori, Ratio Metrics & Delta Method laboratoriyasi, Python va Manim skriptlari | `examples/python/cuped_demo.py`<br>`examples/manim/ab_experiment.py` → `public/animations/ab_experiment.mp4`<br>`src/lib/math/ml-ds-labs.ts`<br>`src/components/visualizations/MlDsGuaranteeLabs.tsx`<br>`tests/ds-deep-curriculum.test.ts` |
| `Python/Python_Developer_20_Phase_Roadmap.md` & `Python_Developer_Curriculum.json` | 20 ta faza (`py-01`..`py-20`), 344 ta mikro-dars (`py-01-01`..`py-20-21`), 29 ta `existingContentCandidate` va 315 ta yangi reja tuguni | `src/content/curriculum/python-dev-curriculum.json`<br>`src/lib/curriculum/python-developer.ts`<br>`src/components/curriculum/PythonDeveloperExplorer.tsx` |
| `Python/Python_Recursion_Micro_Lesson_Namuna.md` & `Python_Developer_Website_Agent_Prompt.md` | `py-10-10` / `py-10-12` (`factorial(n)` Call Stack 8 qadamli darsi, `n=0..7` va `n=-1 ValueError`), `is` vs `==`, mutable default va Binary Search `O(log n)` laboratoriyalari | `src/lib/math/python-semantics.ts`<br>`src/components/visualizations/FactorialCallStackLab.tsx`<br>`examples/manim/factorial_call_stack.py` → `public/animations/factorial_call_stack.mp4`<br>`tests/python-developer-curriculum.test.ts` |
| `data engineering/Data_Engineering_20_Phase_Roadmap.md` & `Data_Engineering_Curriculum.json` | 20 ta faza (`de-01`..`de-20`), 358 ta mikro-dars (`de-01-01`..`de-20-30`), 5 ta Track (`data-engineer`, `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`), 27 ta manba (`resourceIndex`) | `src/content/curriculum/data-engineering-curriculum.json`<br>`src/lib/curriculum/data-engineering.ts`<br>`src/components/curriculum/DataEngineeringExplorer.tsx` |
| `data engineering/Data_Engineering_Micro_Lesson_ETL_ELT.md` & `Data_Engineering_Website_Agent_Prompt.md` | `de-11-08` (ETL vs ELT 20 qadamli dars: 5 ta sintetik hodisa, 4 valid, 1 quarantine `e-004`, 3 buyurtma, `235.00` tushum, replay idempotency), SCD Type 2 (`de-08-12`) va Kafka Partition (`de-14-09`) | `src/lib/math/data-engineering-semantics.ts`<br>`src/components/visualizations/ETLvsELTLab.tsx`<br>`examples/python/etl_elt_engine.py`<br>`examples/manim/etl_elt_pipeline.py` → `public/animations/etl_elt_pipeline.mp4`<br>`tests/data-engineering-curriculum.test.ts` |
| `prompt engineering/Prompt_Engineering_20_Phase_Roadmap.md` & `Prompt_Engineering_Curriculum.json` | 20 ta faza (`pe-01`..`pe-20`), 313 ta mikro-dars (`pe-01-01`..`pe-20-18`), 6 ta Track (`prompt-engineer`, `ai-engineer`, `ml-engineer`, `data-scientist`, `python-developer`, `data-engineer`), 22 ta `candidateReuse`, 13 ta manba (`resourceIndex`) | `src/content/curriculum/prompt-engineering-curriculum.json`<br>`src/lib/curriculum/prompt-engineering.ts`<br>`src/components/curriculum/PromptEngineeringExplorer.tsx` |
| `prompt engineering/Prompt_Engineering_Micro_Lesson_Sampling.md` & `Prompt_Engineering_Website_Agent_Prompt.md` | `pe-06-06` / `pe-07-02` / `pe-07-04` (Temperature, Top-K, Top-P sintetik logitlar `2.4, 1.4, 0.6, -0.2` → `62.21%, 22.89%, 10.28%, 4.62%`), Prompt Boundary Escaping (`pe-17-05`), Calibration (`pe-19-16`) | `src/lib/math/prompt-engineering-semantics.ts`<br>`src/components/visualizations/SamplingPlayground.tsx`<br>`examples/python/sampling_math.py`<br>`examples/manim/sampling_explained.py` → `public/animations/sampling_explained.mp4`<br>`tests/prompt-engineering-curriculum.test.ts` |

---

## 2. 20 ta Faza va 39 ta Kanonik MDX Maqolalar O‘rtasidagi Bog‘lanish (`sourceSection`)

| Phase ID | Faza Nomi | Bog‘langan Kanonik MDX Darslar (`src/content/lessons/*.mdx`) | Interaktiv Vizualizatsiya / Manim |
|---|---|---|---|
| `Phase 01` – `03` | Dasturlash, Python, SQL va Data | `ai-history-and-paradigms.mdx` (`01.01`–`03.14` rejalashtirilgan darslar `planned` maqomida) | Flow diagram |
| `Phase 04` | Matematika: Chiziqli Algebra va Optimizatsiya | `gradient-descent.mdx`, `learning-rate-and-convergence.mdx`, `loss-functions.mdx` | `FunctionExplorer.tsx` (`function_explorer.mp4`), `GradientDescent.tsx` (`gradient_descent.mp4`) |
| `Phase 05` | Klassik Machine Learning va Baholash | `machine-learning-basics.mdx`, `overfitting-and-underfitting.mdx`, `regularization-l1-l2-dropout.mdx` | `FunctionExplorer.tsx` |
| `Phase 06` | Neyron Tarmoqlar va Deep Learning Asoslari | `deep-learning-foundations.mdx`, `activation-functions.mdx`, `backpropagation.mdx`, `optimizers-sgd-momentum-adam.mdx` | `NeuralNetworkExplorer.tsx` (`neural_network.mp4`) |
| `Phase 07` | PyTorch va Zamonaviy DL Arxitekturalar | `batch-normalization.mdx`, `cnn-convolutional-networks.mdx`, `rnn-recurrent-networks.mdx`, `lstm-and-gru.mdx`, `autoencoders.mdx`, `gans.mdx`, `diffusion-models.mdx` | `NeuralNetworkExplorer.tsx` |
| `Phase 08` | NLP Evolutsiyasi va Transformer Arxitekturasi | `transformers.mdx`, `self-attention-qkv.mdx`, `multi-head-attention.mdx`, `positional-encoding.mdx` | `AttentionExplorer.tsx` (`self_attention.mp4`) + 20-darsli `TransformerMicroPathView.tsx` |
| `Phase 09` | LLM Asoslari, Tokenizatsiya va Inference | `tokenization-bpe.mdx`, `llm-foundations.mdx`, `inference-decoding-temperature.mdx` | `AttentionExplorer.tsx` |
| `Phase 10` | Prompt Engineering va Structured Outputs | `prompt-engineering.mdx` | Flow diagram |
| `Phase 11` | Fine-tuning, LoRA, QLoRA va Alignment | `fine-tuning-lora-qlora.mdx`, `rlhf-and-dpo.mdx` | Flow diagram |
| `Phase 12` | Embeddings, Similarity va Vector Database | `embeddings-and-vectors.mdx`, `vector-databases.mdx` + Guided mikro-darslar (`12.02`, `12.04`, `12.05`, `12.07`) | `CosineSimilarityExplorer.tsx` (`cosine_similarity.mp4`) |
| `Phase 13` | Ma'lumot Tayyorlash, Parsing va Chunking | `chunking-and-indexing.mdx` | `RagPipelineExplorer.tsx` (Chunk size & overlap) |
| `Phase 14` | RAG Asoslari: Kichik, Ishlaydigan Tizim | `rag-foundations.mdx` + Guided mikro-dars (`14.06`) | `RagPipelineExplorer.tsx` (Top-k retrieval, `[chunkId]` citation, No-Answer gate) |
| `Phase 15` | Advanced RAG, Hybrid Search va Reranking | `hybrid-search-and-reranking.mdx` + Guided mikro-dars (`15.08`) | `RagPipelineExplorer.tsx` |
| `Phase 16` | RAG va LLM Baholash: Sifat, Xavfsizlik va Narx | `rag-evaluation-ragas.mdx` | `RagPipelineExplorer.tsx` (`Hit@k` va `MRR` baholash jadvali) |
| `Phase 17` | AI Agents, Function Calling va MCP | `ai-agents-foundations.mdx`, `react-and-reasoning.mdx`, `agent-memory-systems.mdx`, `tool-calling-and-mcp.mdx`, `multi-agent-orchestration.mdx` | Flow diagram |
| `Phase 18` – `20` | Backend, Local AI, Guardrails va Production | `quantization-fp16-int8-int4.mdx`, `ai-safety-and-hallucinations.mdx` | Flow diagram |

---

## 3. Halollik va Sifat Nazorati (`Honest Status Policy`)

- To‘liq maqola yoki interaktiv vertikal kesimga ega darslar `status: "published"` sifatida belgilangan.
- Hali to‘liq matni yozilmagan mikro-darslar `status: "planned"` sifatida ochiq ko‘rsatilgan va hech qachon soxta tugallanish foizi yoki uydirma ilmiy iqtibos bilan to‘ldirilmagan.
