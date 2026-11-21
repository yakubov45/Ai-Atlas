Data Scientist / ML-AI Engineer: 3 oylik intensiv roadmap
Nov 13, 2026 · @jurabek
Maqsad va rejim
12 haftadan keyin natija: local LLM'ni ishga tushira oladigan, RAG va fine-tuning qila oladigan, modelni Docker + API + monitoring bilan productionga chiqara oladigan, intervyuda mid+ darajadagi savollarga javob bera oladigan mutaxassis. Boshlang'ich nuqta: Python asoslari.
Bosim rejimi (haftasiga 6 kun, kuniga 6–8 soat):
Vaqt	Faoliyat	Davomiyligi
Ertalab	Nazariya: kurs, kitob, maqola	2 soat
Kunduzi	Kod: mashqlar, mini-loyiha	3–4 soat
Kechqurun	Takrorlash: 20 ta termin + 5 ta intervyu savoli, LeetCode/SQL 1 masala	1–1.5 soat
Yakshanba	Haftalik loyihani GitHub'ga push, README, 1 sahifa xulosa	3 soat
Qoidalar:
•	Har hafta oxirida GitHub'da ishlaydigan loyiha bo'lishi shart. Kod yo'q bo'lsa, hafta yopilmaydi.
•	Video ko'rishdan ko'ra kod yozishga 2 barobar ko'p vaqt ajrating.
•	Har bir yangi tushunchani o'z so'zingiz bilan 3 gapda tushuntirib yozing (Feynman usuli).
•	Ingliz tilidagi hujjatlarni (docs) to'g'ridan-to'g'ri o'qing: sohadagi barcha asosiy manbalar ingliz tilida.
Kerakli jihozlar: kamida 16 GB RAM; NVIDIA GPU (8 GB+ VRAM) bo'lsa yaxshi, bo'lmasa Google Colab / Kaggle (bepul T4 GPU), keyinroq RunPod yoki Vast.ai (soatbay ijaraga GPU).
Umumiy xarita: 12 hafta
 
12 haftalik roadmap · 3 bosqich, 3 loyiha
Har bosqich portfolio loyihasi bilan yopiladi: loyiha GitHub'da ishlamaguncha keyingi oyga o'tmang. 7-hafta (local LLM) butun rejaning markazi — keyingi barcha loyihalar shunga tayanadi.
1-oy: Poydevor (1–4 haftalar)
1-oy oxirida klassik ML modelini o'qitib, baholab, FastAPI orqali taqdim eta olasiz.
1-hafta: Python pro + muhit
•	Python chuqurroq: type hints, dataclass, pydantic, generator va iterator, decorator, context manager, async/await asoslari, exception handling, logging.
•	Muhit: uv yoki poetry, virtual env, pyproject.toml, Git (branch, PR, rebase), Linux terminal (ssh, tmux, htop, nvidia-smi), Jupyter va VS Code.
•	Kod sifati: ruff, black, pytest (fixture, parametrize), pre-commit.
•	Amaliyot: CLI tool yozish (typer) + testlar + GitHub Actions'da CI.
2-hafta: Data bilan ishlash + SQL
•	NumPy: array, broadcasting, vektorlashtirish (for siklsiz hisoblash).
•	Pandas / Polars: groupby, merge, pivot, window funksiyalar, missing values, katta fayllar (parquet, chunk).
•	SQL: JOIN, GROUP BY, CTE, window funksiyalar (ROW_NUMBER, LAG), indekslar. PostgreSQL o'rnating.
•	Vizualizatsiya + EDA: matplotlib, seaborn, plotly; taqsimot, outlier, korrelyatsiya.
•	Amaliyot: Kaggle datasetida to'liq EDA notebook + SQL'da 20 ta so'rov.
3-hafta: Matematika va statistika (amaliy darajada)
•	Chiziqli algebra: vektor, matritsa ko'paytmasi, dot product, norma, eigenvalue (PCA uchun), cosine similarity (embedding'lar uchun).
•	Calculus: hosila, gradient, chain rule — backpropagation tushunish uchun yetarli.
•	Ehtimollik va statistika: taqsimotlar, Bayes teoremasi, gipoteza testi, p-value, ishonch intervali, A/B test, bootstrap.
•	Optimizatsiya: gradient descent, learning rate, SGD, Adam.
•	Amaliyot: NumPy'da noldan linear regression va logistic regression + gradient descent.
4-hafta: Klassik ML (scikit-learn)
•	Algoritmlar: linear/logistic regression, decision tree, random forest, gradient boosting (XGBoost, LightGBM, CatBoost), KNN, SVM, K-means, PCA.
•	Jarayon: train/val/test split, cross-validation, feature engineering, scaling, encoding, data leakage, Pipeline, hyperparameter tuning (Optuna).
•	Metrikalar: accuracy, precision, recall, F1, ROC-AUC, PR-AUC, MAE, RMSE, R²; nomutanosib klasslar (class weight, SMOTE).
•	Tushuntiriluvchanlik: feature importance, SHAP.
•	Amaliyot (1-loyiha): churn yoki kredit skoring modeli → MLflow'da tajriba kuzatuvi → FastAPI endpoint → Dockerfile.
2-oy: Deep Learning, LLM va Local LLM (5–8 haftalar)
2-oy oxirida o'z kompyuteringizda yoki ijaraga olingan GPU'da open-source LLM'ni ishga tushirasiz, RAG tizimini qurasiz va LoRA bilan fine-tuning qilasiz.
5-hafta: Deep Learning asoslari (PyTorch)
•	PyTorch: tensor, autograd, nn.Module, Dataset/DataLoader, training loop, GPU'ga ko'chirish, mixed precision (fp16/bf16), checkpoint saqlash.
•	Nazariya: perceptron, MLP, aktivatsiya funksiyalari (ReLU, GELU), loss funksiyalari, backpropagation, overfitting, dropout, batch/layer normalization, weight decay, learning rate scheduler.
•	Arxitekturalar (umumiy tushuncha): CNN, RNN/LSTM, nima uchun Transformer ularni almashtirdi.
•	Amaliyot: noldan MLP va kichik CNN; Karpathy'ning micrograd va makemore darslarini takrorlang.
6-hafta: NLP va Transformer ichidan
•	Tokenizatsiya: BPE, WordPiece, SentencePiece; o'zbek tili tokenizatsiyasi muammolari (bitta so'z ko'p tokenga bo'linadi → narx va kontekst ortadi).
•	Transformer: embedding, positional encoding (RoPE), self-attention (Q, K, V), multi-head attention, FFN, residual, decoder-only arxitektura, KV cache.
•	Generatsiya: temperature, top-k, top-p, greedy va sampling, repetition penalty, stop tokens, context window.
•	Hugging Face: transformers, datasets, tokenizers, Hub; AutoModelForCausalLM, pipeline, chat template.
•	Embedding'lar: sentence-transformers, cosine similarity, MTEB reyting jadvali.
•	Amaliyot: Karpathy'ning nanoGPT ("Let's build GPT") darsini to'liq qayta yozing; BERT'ni matn klassifikatsiyasi uchun fine-tune qiling.
7-hafta: Local LLM'larni ishlatish (asosiy hafta)
•	Model oilalari: Llama, Qwen, Mistral, Gemma, DeepSeek, Phi va boshqa open-weight modellar. Base va Instruct farqi, litsenziyalar (tijoriy foydalanishga ruxsat bormi).
•	Xotira hisobi: parametrlar soni × bayt. 7B model fp16'da ~14 GB, 8-bitda ~7 GB, 4-bitda ~4 GB + KV cache uchun qo'shimcha joy.
•	Kvantlash (quantization): GGUF (Q4_K_M, Q5_K_M, Q8_0), GPTQ, AWQ, bitsandbytes (NF4), FP8. Sifat va tezlik o'rtasidagi kelishuv.
•	Ishga tushirish vositalari:
o	Ollama — eng oson, lokal dev uchun; Modelfile, REST API.
o	llama.cpp — CPU va Apple Silicon'da, GGUF formati, llama-server.
o	LM Studio — GUI, tez sinash uchun.
o	vLLM — productionda GPU serving: PagedAttention, continuous batching, OpenAI-mos API.
o	SGLang, TGI (Text Generation Inference), NVIDIA TensorRT-LLM / Triton — yuqori yuklama uchun muqobillar.
•	OpenAI-compatible API: barcha vositalar /v1/chat/completions beradi → kodingiz provayderga bog'lanib qolmaydi (openai SDK + base_url).
•	Amaliyot: bitta modelni Ollama, llama.cpp va vLLM'da ishga tushiring; tokens/sec, TTFT (birinchi token vaqti) va VRAM sarfini jadvalga yozib solishtiring.
8-hafta: RAG, agentlar va fine-tuning
•	RAG pipeline: hujjat yuklash → chunking (hajm, overlap) → embedding → vector DB (Qdrant, Chroma, pgvector, FAISS) → retrieval (hybrid: BM25 + vektor) → reranking (cross-encoder) → prompt → javob + manba.
•	Freymvorklar: LangChain, LlamaIndex, LangGraph; avval ularsiz oddiy Python'da yozib, keyin freymvorkni ishlating.
•	Prompt engineering: system prompt, few-shot, chain-of-thought, structured output (JSON schema, instructor, outlines), function/tool calling.
•	Agentlar: tool calling sikli, ReAct, MCP (Model Context Protocol), xotira, xatolardan tiklanish.
•	Fine-tuning: qachon kerak (RAG yetmasa, uslub/format kerak bo'lsa), SFT, LoRA, QLoRA, PEFT, TRL, Unsloth, Axolotl; DPO (preference tuning); dataset formati (chat template), overfitting xavfi, LoRA adapterlarini merge qilish.
•	Amaliyot (2-loyiha): o'zbek tilidagi hujjatlar bo'yicha local RAG chatbot (Qdrant + vLLM/Ollama + reranker), manba ko'rsatish bilan. Qo'shimcha: kichik modelni (1–8B) QLoRA bilan o'z datasetingizda fine-tune qilib, GGUF'ga eksport qilib Ollama'ga yuklang.
3-oy: Production, MLOps va LLMOps (9–12 haftalar)
3-oy oxirida LLM servisi Docker'da ishlaydi, yuklama ostida sinovdan o'tgan, baholash (eval), monitoring va xavfsizlik qatlamlariga ega bo'ladi.
9-hafta: Serving va infratuzilma
•	API qatlami: FastAPI (async), streaming javob (SSE), Pydantic validatsiya, rate limiting, autentifikatsiya (API key, JWT), timeout va retry.
•	Docker: multi-stage build, CUDA base image, NVIDIA Container Toolkit, docker compose (API + vLLM + Qdrant + Redis + Postgres).
•	Kubernetes asoslari: Pod, Deployment, Service, Ingress, GPU node, HPA (autoscaling), Helm; KServe yoki Ray Serve haqida umumiy tushuncha.
•	Optimizatsiya: continuous batching, KV cache, prefix caching, speculative decoding, tensor parallelism (bir nechta GPU), max_model_len va gpu_memory_utilization sozlamalari.
•	Kesh: javoblar uchun Redis, semantic cache (o'xshash savollarga tayyor javob).
•	Amaliyot: 2-loyihani docker compose bilan to'liq stack qilib ko'taring.
10-hafta: Yuklama sinovi va baholash (evaluation)
•	Load testing: Locust yoki k6; metrikalar: TTFT, TPOT (har bir token vaqti), throughput (tokens/sec, req/sec), p50/p95/p99 latency, concurrency, GPU utilization. vLLM'ning o'z benchmark skriptlari.
•	Sig'im rejalash: "N ta parallel foydalanuvchi uchun qancha GPU kerak?" degan savolga raqam bilan javob bering; narxni hisoblang ($/1M token, self-hosted va API solishtiruvi).
•	LLM eval: golden dataset (50–200 ta savol-javob), LLM-as-a-judge, RAGAS (faithfulness, answer relevancy, context precision/recall), DeepEval, promptfoo, lm-evaluation-harness.
•	Regressiya testlari: model yoki prompt o'zgarganda eval avtomatik CI'da ishlaydi.
•	Amaliyot: loyihangizga eval suite va load test hisobotini qo'shing (grafiklar bilan).
11-hafta: MLOps / LLMOps va monitoring
•	Tajriba va model registr: MLflow, Weights & Biases; versiyalash: DVC (data), Git (kod), model registry.
•	Pipeline orkestratsiya: Airflow, Prefect yoki Dagster; retraining pipeline.
•	Observability: Prometheus + Grafana (latency, xatolar, GPU), strukturali loglar, OpenTelemetry tracing; LLM uchun Langfuse, Arize Phoenix yoki LangSmith (har bir so'rov, prompt, token, narx).
•	Drift: data drift, concept drift, Evidently AI; LLMda: savol turlari o'zgarishi, javob sifati pasayishi, foydalanuvchi feedback (like/dislike).
•	Deploy strategiyalari: blue-green, canary, shadow deployment, A/B test, rollback.
•	CI/CD: GitHub Actions: lint → test → eval → build image → deploy.
12-hafta: Xavfsizlik, guardrails va yakuniy loyiha
•	Xavfsizlik: prompt injection (to'g'ridan-to'g'ri va hujjat ichidagi), jailbreak, ma'lumot sizishi (PII), OWASP Top 10 for LLM Applications.
•	Guardrails: input/output filtrlash, Llama Guard yoki boshqa moderatsiya modeli, NeMo Guardrails, JSON schema validatsiya, tool'lar uchun ruxsatlar (least privilege).
•	Hallucination kamaytirish: grounding, manba ko'rsatish, "bilmayman" deyishga ruxsat, past ishonchda insonga yo'naltirish.
•	Ma'lumot maxfiyligi: local LLM'ning asosiy afzalligi — ma'lumot serverdan chiqmaydi (bank, tibbiyot, davlat sektori uchun muhim).
•	Yakuniy (3-loyiha): quyidagi "Portfolio loyihalar" bo'limidagi capstone; demo video, arxitektura diagrammasi, README, eval va load test natijalari bilan.
Portfolio loyihalar
GitHub'da 3 ta chuqur loyiha 10 ta yuzaki loyihadan kuchliroq. Har birida README, arxitektura sxemasi, ishga tushirish yo'riqnomasi, metrikalar va demo bo'lsin.
#	Loyiha	Hafta	Texnologiyalar	Ko'rsatadigan ko'nikma
1	Churn / kredit skoring xizmati	4	pandas, LightGBM, Optuna, SHAP, MLflow, FastAPI, Docker	Klassik ML, metrika tanlash, model taqdim etish
2	O'zbek tilidagi hujjatlar uchun local RAG chatbot	8	Ollama/vLLM, Qdrant, BM25 + reranker, LangGraph, Streamlit	Local LLM, retrieval sifati, manba ko'rsatish
3	Capstone: production darajadagi LLM platforma	12	vLLM, FastAPI, Redis, Postgres, Langfuse, Prometheus/Grafana, RAGAS, Locust, GitHub Actions, Docker/K8s	Serving, eval, monitoring, xavfsizlik, CI/CD
+	QLoRA fine-tune (ixtiyoriy)	8	Unsloth/TRL, PEFT, GGUF eksport	Fine-tuning, dataset tayyorlash
Capstone uchun g'oyalar (birini tanlang):
•	Bank yoki telekom uchun ichki support assistenti: reglamentlar bo'yicha RAG + tiketlarni avtomatik klassifikatsiya.
•	Yuridik hujjatlar (O'zbekiston qonunchiligi) bo'yicha savol-javob tizimi, manba moddalarini ko'rsatadi.
•	Call-center audio → Whisper bilan transkripsiya → LLM bilan xulosa va sentiment tahlil.
Capstone README'sida bo'lishi shart: arxitektura diagrammasi; nima uchun aynan shu model va kvantlash tanlangani; load test jadvali (concurrency, p95 latency, tokens/sec); eval natijalari; 1 GPU'dagi oylik narx hisobi; ma'lum cheklovlar va keyingi qadamlar.
Asosiy terminlar lug'ati
Har kuni kechqurun 20 ta terminni takrorlang. Har birini 1 gapda, misol bilan tushuntira olishingiz kerak.
ML va statistika
Termin	Ma'nosi
Overfitting / Underfitting	Model train datani yodlab oladi va yangi datada yomon ishlaydi / model juda sodda, hatto train datani ham o'rgana olmaydi
Bias–variance tradeoff	Sodda model = yuqori bias, murakkab model = yuqori variance; maqsad — ikkalasining muvozanati
Data leakage	Train paytida modelga test yoki kelajakdagi ma'lumot sizib o'tishi; natijalar soxta yaxshi chiqadi
Cross-validation	Datani k qismga bo'lib, navbat bilan har birida test qilish; baho barqarorroq bo'ladi
Regularization (L1/L2)	Katta og'irliklarni jazolash orqali overfittingni kamaytirish; L1 feature tanlaydi
Precision / Recall	Ijobiy deb topilganlarning qanchasi to'g'ri / haqiqiy ijobiylarning qanchasi topildi
ROC-AUC	Turli chegaralarda klasslarni ajrata olish qobiliyati; 0.5 = tasodifiy, 1.0 = mukammal
Gradient boosting	Ketma-ket daraxtlar: har biri oldingisining xatosini tuzatadi (XGBoost, LightGBM)
Feature engineering	Xom datadan modelga foydali belgilar yaratish
p-value	Nol gipoteza to'g'ri bo'lsa, shunday yoki undan ham keskin natija olish ehtimoli
Data drift	Productiondagi kiruvchi data taqsimoti train datadan farq qila boshlashi
Deep Learning va Transformer
Termin	Ma'nosi
Backpropagation	Chain rule orqali loss'ning har bir og'irlikka nisbatan gradientini hisoblash
Learning rate	Har qadamda og'irliklar qancha o'zgarishi; juda katta = beqaror, juda kichik = sekin
Epoch / Batch	Butun datadan bir marta o'tish / bir qadamda ishlanadigan namunalar guruhi
Embedding	So'z, matn yoki obyektning ma'nosini saqlovchi zich vektor
Token	Model ishlaydigan matn birligi (so'z bo'lagi); ingliz tilida ~0.75 so'z
Self-attention	Har bir token boshqa barcha tokenlarga qanchalik e'tibor berishini Q, K, V orqali hisoblash
Context window	Model bir vaqtda ko'ra oladigan maksimal tokenlar soni
KV cache	Oldingi tokenlarning Key/Value'larini saqlab, generatsiyani tezlashtirish; VRAM'ni ko'p yeydi
Temperature / Top-p	Generatsiya tasodifiyligi / eng ehtimoliy tokenlardan p ulushini tanlash
Hallucination	Model ishonch bilan noto'g'ri yoki to'qib chiqarilgan ma'lumot berishi
Local LLM va serving
Termin	Ma'nosi
Open-weight model	Og'irliklari ochiq yuklab olinadigan model (Llama, Qwen, Mistral)
Quantization	Og'irliklarni 16-bitdan 8/4-bitga siqish; xotira 2–4 baravar kamayadi, sifat biroz tushadi
GGUF	llama.cpp va Ollama ishlatadigan kvantlangan model formati
GPTQ / AWQ	GPU uchun 4-bitli kvantlash usullari; vLLM qo'llab-quvvatlaydi
VRAM	GPU xotirasi; model og'irliklari + KV cache shu yerga sig'ishi kerak
Inference	O'qitilgan modeldan javob olish jarayoni
PagedAttention	vLLM'ning KV cache'ni sahifalarga bo'lib boshqarishi; xotira isrofi kamayadi
Continuous batching	Yangi so'rovlarni batch'ga to'xtamasdan qo'shib borish; throughput bir necha baravar oshadi
TTFT / TPOT	Birinchi token chiqquncha vaqt / har bir keyingi token vaqti
Throughput	Vaqt birligida ishlanadigan token yoki so'rovlar soni
Tensor parallelism	Bitta modelni bir nechta GPU'ga bo'lib joylashtirish
Speculative decoding	Kichik model taxmin qiladi, katta model tekshiradi; tezlik oshadi
RAG, fine-tuning, agentlar
Termin	Ma'nosi
RAG	Javob berishdan oldin bilim bazasidan tegishli matnlarni topib, promptga qo'shish
Chunking	Hujjatlarni qidirish uchun bo'laklarga bo'lish
Vector database	Embedding'larni saqlab, o'xshashlik bo'yicha tez qidiradigan baza (Qdrant, pgvector)
Hybrid search	Kalit so'z (BM25) va vektor qidiruvni birlashtirish
Reranker	Topilgan nomzodlarni savolga moslik bo'yicha qayta tartiblovchi model
Fine-tuning	Tayyor modelni o'z datangizda qo'shimcha o'qitish
LoRA / QLoRA	Faqat kichik qo'shimcha matritsalarni o'qitish / buni 4-bitli bazaviy model ustida qilish
SFT / DPO	Namunaviy javoblar bilan o'qitish / afzal ko'rilgan va rad etilgan javoblar juftligi bilan o'qitish
Function / tool calling	Model tashqi funksiyani chaqirish uchun strukturali so'rov qaytarishi
Agent	LLM + tool'lar + sikl: reja tuzadi, harakat qiladi, natijaga qarab davom etadi
MCP	Model Context Protocol: LLM ilovalarini tool va ma'lumot manbalariga ulash standarti
Prompt injection	Foydalanuvchi yoki hujjat ichidagi matn orqali model ko'rsatmalarini buzish hujumi
Guardrails	Kirish va chiqishni tekshiruvchi xavfsizlik qatlamlari
LLM-as-a-judge	Javob sifatini boshqa LLM yordamida baholash
MLOps
Termin	Ma'nosi
MLOps / LLMOps	Modelni o'qitish, deploy qilish, kuzatish va yangilashni avtomatlashtirish amaliyoti
Model registry	Model versiyalari va ularning holati (staging, production) saqlanadigan joy
Canary deployment	Yangi versiyani avval trafikning kichik qismiga chiqarish
Shadow deployment	Yangi model real so'rovlarni oladi, lekin javobi foydalanuvchiga ko'rsatilmaydi
Observability	Loglar, metrikalar va trace'lar orqali tizim ichida nima bo'layotganini ko'rish
p95 latency	So'rovlarning 95% shu vaqtdan tezroq javob oladi
SLA / SLO	Mijozga berilgan kafolat / ichki maqsad ko'rsatkich (masalan, p95 < 2 s)
Intervyu savol-javoblar
Mid+ intervyuda faqat ta'rif emas, balki trade-off (kelishuv) va real tajriba so'raladi. Javobni doim "bu nima → qachon ishlatiladi → kamchiligi → men qanday qilganman" tartibida tuzing.
ML asoslari
1.	Overfittingni qanday aniqlaysiz va kamaytirasiz? Train va validation metrikalari orasidagi katta farq orqali. Kamaytirish: ko'proq data, regularization, sodda model, dropout, early stopping, cross-validation, augmentatsiya.
2.	Nomutanosib klasslar (masalan 1% fraud) bilan qanday ishlaysiz? Accuracy o'rniga PR-AUC, recall, F1 ishlataman; class_weight, oversampling yoki undersampling qo'llayman; chegarani (threshold) biznes xarajatiga qarab tanlayman.
3.	Precision va recall'dan qaysi biri muhimroq? Vaziyatga bog'liq: saraton skriningida recall (bemorni o'tkazib yubormaslik), spam filtrda precision (muhim xatni yo'qotmaslik).
4.	Data leakage misolini keltiring. Scaling'ni split'dan oldin butun datada qilish, yoki kelajakdagi ma'lumotdan feature yasash. Yechim: Pipeline va vaqt bo'yicha split.
5.	Random forest va gradient boosting farqi? RF — parallel mustaqil daraxtlar, variance'ni kamaytiradi. Boosting — ketma-ket daraxtlar, bias'ni kamaytiradi, odatda aniqroq, lekin sozlashga sezgirroq.
6.	Modelingiz productionda yomonlashdi. Nima qilasiz? Avval data pipeline xatosini tekshiraman, keyin data drift va concept drift'ni o'lchayman, oxirgi data bilan qayta o'qitaman, monitoring va alert qo'shaman.
Deep Learning va LLM
7.	Self-attention qanday ishlaydi? Har bir token uchun Query, Key, Value hisoblanadi; softmax(QKᵀ/√d)·V orqali har bir token boshqalardan qancha ma'lumot olishini aniqlaydi. Murakkablik ketma-ketlik uzunligi bo'yicha kvadratik.
8.	KV cache nima va nima uchun muhim? Generatsiyada oldingi tokenlarning K va V qiymatlari qayta hisoblanmaydi, saqlanadi. Tezlik oshadi, lekin VRAM sarfi kontekst uzunligi va parallel so'rovlar soniga proporsional o'sadi.
9.	Temperature 0 va 1 farqi? 0 — deterministik, eng ehtimoliy token; faktik javoblar va JSON uchun. 1 — xilma-xil, ijodiy matn uchun.
10.	Hallucination'ni qanday kamaytirasiz? RAG bilan grounding, manba ko'rsatishni talab qilish, past temperature, "bilmayman" deyishga ruxsat, eval va faithfulness metrikasi bilan o'lchash.
11.	Base va Instruct model farqi? Base faqat keyingi tokenni bashorat qiladi. Instruct SFT va RLHF/DPO bilan ko'rsatmalarga amal qilishga o'qitilgan, chat template talab qiladi.
Local LLM va serving
12.	8B modelni 16 GB VRAM'li GPU'da ishga tushirish mumkinmi? fp16'da og'irliklar ~16 GB, KV cache'ga joy qolmaydi. 8-bit (~8 GB) yoki 4-bit AWQ/GPTQ (~5 GB) kvantlash bilan bemalol, kontekst va parallellik uchun joy qoladi.
13.	Ollama, llama.cpp va vLLM'ni qachon tanlaysiz? Ollama — lokal dev va prototip. llama.cpp — CPU, Mac, edge qurilmalar. vLLM — GPU'da ko'p foydalanuvchili production: continuous batching va PagedAttention tufayli throughput yuqori.
14.	Kvantlash sifatga qanday ta'sir qiladi? 8-bitda yo'qotish deyarli sezilmaydi, 4-bitda (Q4_K_M, AWQ) odatda kichik; 3-bit va undan pastda sezilarli. Kichik modellar kvantlashga sezgirroq. Har doim o'z eval to'plamingizda tekshiring.
15.	Latency yuqori. Nimalarni tekshirasiz? TTFT va TPOT'ni alohida o'lchayman. TTFT uzun bo'lsa — prompt uzunligi, navbat, prefix caching. TPOT sekin bo'lsa — model hajmi, kvantlash, GPU yuklamasi, batch hajmi. Keyin max_num_seqs va gpu_memory_utilization'ni sozlayman.
16.	Self-hosted yoki API: qanday qaror qilasiz? Ma'lumot maxfiyligi, yuklama hajmi, kerakli sifat, jamoa tajribasi va umumiy narx (GPU + DevOps vaqti) bo'yicha. Kam yuklamada API arzonroq; doimiy katta yuklama yoki maxfiy ma'lumotda self-hosted.
RAG va fine-tuning
17.	RAG va fine-tuning: qachon qaysi biri? Bilim tez-tez yangilansa va manba kerak bo'lsa — RAG. Uslub, format, maxsus vazifa yoki qisqa promptlar kerak bo'lsa — fine-tuning. Ko'pincha ikkalasi birga.
18.	RAG yomon javob beryapti. Qanday debug qilasiz? Retrieval va generatsiyani alohida baholayman: to'g'ri chunk topildimi (recall@k)? Topilmasa — chunking, embedding modeli, hybrid search, reranker. Topilgan, lekin javob yomon bo'lsa — prompt, model, kontekst tartibi.
19.	Chunk hajmini qanday tanlaysiz? Hujjat turiga qarab (odatda 300–1000 token, 10–20% overlap), lekin yakuniy tanlov eval to'plamida bir nechta variantni solishtirib qilinadi. Sarlavha va bo'lim tuzilmasini saqlash muhim.
20.	LoRA qanday ishlaydi va nima uchun samarali? Og'irlik o'zgarishini ikkita kichik past rangli matritsa ko'paytmasi (W + BA) sifatida o'rganadi. Parametrlarning 1% dan kamini o'qitadi, xotira va vaqt tejaladi, adapterni almashtirish oson.
Production va tizim dizayni
21.	1000 foydalanuvchili ichki chatbot uchun arxitektura chizing. Load balancer → FastAPI (auth, rate limit) → semantic cache (Redis) → RAG servis (Qdrant + reranker) → vLLM klasteri (autoscaling) + Postgres (tarix) + Langfuse/Prometheus (kuzatuv) + guardrails qatlami. Sig'imni load test bilan hisoblayman.
22.	LLM tizimini qanday baholaysiz? Offline: golden dataset, RAGAS, LLM-as-a-judge, inson tekshiruvi. Online: foydalanuvchi feedback, A/B test, latency va narx. Har bir o'zgarish CI'da regressiya evalidan o'tadi.
23.	Prompt injection'dan qanday himoyalanasiz? Foydalanuvchi va hujjat matnini ko'rsatmalardan ajrataman, tool'larga minimal ruxsat beraman, xavfli harakatlar uchun inson tasdig'ini talab qilaman, kirish va chiqishni filtrlayman. 100% himoya yo'qligini tan olaman.
24.	Yangi model versiyasini qanday xavfsiz chiqarasiz? Eval → shadow deployment → canary (5–10% trafik) → metrikalarni solishtirish → bosqichma-bosqich 100% → tayyor rollback rejasi.
Behavioral (xulq-atvor) savollar
•	Eng qiyin loyihangiz va unda qilgan aniq qaroringiz haqida gapiring (STAR usuli: vaziyat, vazifa, harakat, natija raqam bilan).
•	Biznes jamoasiga ML cheklovlarini qanday tushuntirgansiz?
•	Model kutilgandek ishlamagan holat va undan nima o'rgandingiz?
Resurslar, checklist va mid+ mezonlari
Asosiy resurslar
Mavzu	Resurs	Turi
Python	"Fluent Python" (Luciano Ramalho)	Kitob
ML	"Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow" (Aurélien Géron)	Kitob
ML	Andrew Ng — Machine Learning Specialization (Coursera)	Kurs
Matematika	3Blue1Brown — Linear Algebra va Neural Networks seriyalari	Video
Deep Learning	Andrej Karpathy — "Neural Networks: Zero to Hero"	Video + kod
Deep Learning	fast.ai — Practical Deep Learning for Coders	Kurs
LLM	Hugging Face LLM Course (NLP Course)	Bepul kurs
LLM	"Build a Large Language Model (From Scratch)" (Sebastian Raschka)	Kitob
LLM ilovalar	"AI Engineering" (Chip Huyen)	Kitob
Production	"Designing Machine Learning Systems" (Chip Huyen)	Kitob
MLOps	Made With ML (Goku Mohandas), MLOps Zoomcamp (DataTalks.Club)	Bepul kurs
Local LLM	Ollama, llama.cpp, vLLM, Unsloth rasmiy hujjatlari (docs) va GitHub repo'lari	Hujjat
Hamjamiyat	r/LocalLLaMA, Hugging Face Discord, Kaggle	Forum
Haftalik nazorat checklisti
•	☐ 1-hafta: CLI tool + testlar + CI GitHub'da
•	☐ 2-hafta: EDA notebook + 20 ta SQL so'rov
•	☐ 3-hafta: NumPy'da noldan linear/logistic regression
•	☐ 4-hafta: 1-loyiha (ML model + FastAPI + Docker + MLflow)
•	☐ 5-hafta: PyTorch'da MLP va CNN, micrograd
•	☐ 6-hafta: nanoGPT qayta yozilgan, BERT fine-tune
•	☐ 7-hafta: Ollama / llama.cpp / vLLM benchmark jadvali
•	☐ 8-hafta: 2-loyiha (local RAG chatbot) + QLoRA tajribasi
•	☐ 9-hafta: docker compose'da to'liq stack
•	☐ 10-hafta: load test va eval hisobotlari
•	☐ 11-hafta: monitoring (Langfuse + Grafana) va CI/CD
•	☐ 12-hafta: 3-loyiha (capstone), demo video, rezyume yangilangan
Mid+ darajaga tayyorlik mezonlari
•	Biznes muammosini ML vazifasiga aylantira olasiz va to'g'ri metrikani asoslab tanlaysiz.
•	7–14B modelni kvantlash bilan GPU'ga joylay olasiz va kerakli VRAM'ni oldindan hisoblaysiz.
•	vLLM serverini sozlab, load test o'tkazib, p95 latency va throughput raqamlarini aytib bera olasiz.
•	RAG sifatini raqamlar bilan o'lchaysiz va retrieval yoki generatsiya muammosini ajrata olasiz.
•	Fine-tuning qachon kerak va qachon keraksizligini asoslay olasiz, QLoRA'ni amalda qilgansiz.
•	Docker, CI/CD, monitoring va deploy strategiyalari bilan tizimni mustaqil productionga chiqara olasiz.
•	Xavfsizlik (prompt injection, PII) va narx bo'yicha trade-off'larni tushuntira olasiz.
Muhim eslatma: 3 oy — bu juda zich reja. Mid+ darajadagi ishga kirishda real production tajribasi ham hisobga olinadi, shuning uchun capstone'ni iloji boricha real foydalanuvchi yoki real data bilan sinang (freelance, open-source hissa, tanish kompaniyada pilot). 13-haftadan boshlab haftasiga 5–10 ta vakansiyaga topshirib, intervyu takrorlashni davom ettiring.
