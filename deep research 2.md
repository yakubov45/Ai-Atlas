
AI O'rganish Platformasi va Roadmap
Sun'iy Intellektni Noldan O'rganish Platformasi Uchun Arxitektura Tahlili va To'liq O'quv Xaritasi (Oddiy Kasrlardan Deep Learninggacha)
Sun'iy intellekt (AI) va Machine Learning (ML) sohasini oddiy matematik kasrlardan boshlab zamonaviy Deep Learning hamda Production AI darajasigacha o'rgatuvchi veb-sayt yaratish — bugungi global EdTech bozoridagi eng katta bo'shliqlardan birini to'ldiradi. roadmap.sh kabi dunyoning eng mashhur dasturchilar platformalari (GitHub’da 28 milliondan ortiq loyiha ichida Top-10 talikka kiruvchi va 353 000–372 000+ yulduzga ega resurs) kasbiy yo'nalishlarni vizual graflar orqali samarali ko'rsatsa-da, ularning matematika bo'limi to'g'ridan-to'g'ri oliy matematika — skalyarlar, vektorlar, tenzorlar, matritsalar dekompozitsiyasi (SVD), Yakobian va Gessian matritsalaridan boshlanadi. Aksincha, Khan Academy yoki Math Academy kabi platformalar maktab matematikasini arifmetika va kasrlardan boshlab tizimli o'rgatsa ham, ularda zamonaviy AI muhandisligi (PyTorch, Transformers, RAG, AI Agents, MLOps) bo'yicha amaliy karyera xaritasi mavjud emas. Siz qurmoqchi bo'lgan platformaning asosiy ustunligi aynan shu ikki dunyoni — fundamental matematik savodxonlik va amaliy AI muhandisligini yagona interaktiv bilimlar grafida (Knowledge Graph) birlashtirishdir.

Texnik jihatdan roadmap.sh kod bazasi (nilbuild/developer-roadmap) tahlili shuni ko'rsatadiki, bunday platformani noldan qurish uchun Astro (v5.7.13 SSR gibrid modeli), React (v19.1.0), Tailwind CSS, NanoStores va vizual tugunlar (nodes) bilan ishlovchi React Flow (@roadmapsh/editor) stekidan foydalanish yuqori tezlik hamda moslashuvchanlikni ta'minlaydi. Platformada har bir o'quv mavzusi vizual grafdagi alohida tugun (node-id) sifatida JSON formatida saqlanadi, uning ichki darsliklari va manbalari esa Git repozitoriysidagi Markdown (.md) fayllariga bog'lanadi. Bu arxitektura foydalanuvchiga har bir mavzuni done (tugatildi), learning (o'rganilmoqda), skipped (o'tkazib yuborildi) yoki removed (olib tashlandi) sifatida belgilash, shuningdek, Math Academy singari adaptiv diagnostika va XP (tajriba ballari) tizimi orqali o'zlashtirishni nazorat qilish imkonini beradi.

Kelajakda mustahkam karyera qurish uchun ushbu hisobotda roadmap.sh, Math Academy, Khan Academy, OSSU Data Science, DeepLearning.AI, fast.ai va Kaggle Learn platformalarining qiyosiy tahlili hamda sizning saytingiz ma'lumotlar bazasi (dataset) uchun tayyor 7 bosqichli Master Roadmap (Bosqich 0 dan Bosqich 6 gacha) taqdim etilgan. Ushbu xarita o'quvchini maktab arifmetikasi va kasrlardan boshlab, chiziqli algebra va matematik analiz (faqat ML uchun zarur mavzular saralangan holda), Python va klassik ML algoritmlarini noldan kodlash orqali Deep Learning (CNN, RNN, Transformers) hamda 2026–2027-yillarda yuqori talabga ega bo'lgan AI Engineering (LLM, RAG, MCP serverlari, AI Agentlar) darajasigacha olib chiqadi.

1. Roadmap.sh va Yetakchi Ta'lim Platformalarining Tahlili (Research & Benchmark)
Sun'iy intellektni o'rgatuvchi yangi avlod veb-saytini loyihalashdan avval, bozordagi yetakchi texnik va matematik platformalarning ichki tuzilishi, kontent arxitekturasi hamda pedagogik yondashuvlarini tahlil qilish zarur.

1.1. Roadmap.sh Platformasining Texnik Arxitekturasi va Ishlash Mexanizmi
Kamran Ahmed tomonidan asos solingan va Insight Partners investitsiya fondi hamda The New Stack media-ekotizimi tomonidan qo'llab-quvvatlanadigan roadmap.sh (kamranahmedse/developer-roadmap) dasturchilar uchun tizimli ta'lim beruvchi eng yirik ochiq manbali loyihalardan biridir. Sanoat tahlilchisi Kunal Ganglanining 2026-yilgi hisobotiga ko'ra, platformaning AI Engineer yo'nalishining o'ziga har oyda 90 000 ta yangi foydalanuvchi qo'shiladi. Oddiy blog postlar yoki darsliklardan farqli o'laroq, roadmap.sh "qaror qabul qilish charchog'i"ni (decision fatigue) yo'qotadi: foydalanuvchi "keyin nimani o'rganishim kerak?" deb ikkilanmaydi, chunki barcha mavzular o'zaro bog'langan yo'naltirilgan graf (flow diagram) ko'rinishida taqdim etiladi.

roadmap.sh kod bazasining (nilbuild/developer-roadmap / DeepWiki texnik hujjatlari) tahlili shuni ko'rsatadiki, tizim 84,5% TypeScript, 10,9% Astro, 3,1% JavaScript, 1,3% CSS va 0,2% Shell skriptlaridan tashkil topgan PNPM monorepo (pnpm-workspace.yaml) hisoblanadi. Uning arxitekturasi uchta asosiy qatlamni o'zaro bog'laydi. Birinchidan, server tomonida Astro (v5.7.13) freymvorkining @astrojs/node adapteri orqali Server-Side Rendering (SSR) gibrid modeli ishlaydi. Global qobiq src/layouts/BaseLayout.astro orqali shakllantirilsa, har bir o'quv xaritasi src/pages/[roadmapId]/index.astro sahifasida server tomonidan src/queries/official-roadmap.ts so'rovlari yordamida yuklanadi. Barqarorlikni ta'minlash uchun Playwright vizual regressiya testlari Astro va React komponentlari hamda SVG yoki Canvas elementlari to'liq chizilib bo'lishini tekshiradi.

Ikkinchidan, mijoz (client-side) qatlamida interaktivlik React (v19.1.0) komponentlari va Tailwind CSS orqali boshqariladi. Platformada xaritalarni chizish uchun ikkita renderlash dvigateli (renderer) qo'llaniladi. Eski avlod dvigateli (balsamiq / FrameRenderer) wireframe ko'rinishidagi .json fayllarni scripts/generate-renderer.sh va roadmap-renderer yordamida statik SVG formatiga o'giradi. Yangi avlod dvigateli (editor / FlowRoadmapRenderer va EditorRoadmap.tsx) esa React Flow (@roadmapsh/editor) kutubxonasiga asoslangan bo'lib, xaritalarni dinamik Nodes (tugunlar) va Edges (bog'lamalar) JSON graflari sifatida chizadi. Bu foydalanuvchilarga /r/[slug] manzili orqali shaxsiy xaritalar yaratish (CustomRoadmap.tsx), tugunlarni klaviatura yordamida surish yoki o'chirish hamda /r/embed (src/pages/r/embed.astro) orqali boshqa saytlarga iframe sifatida joylashtirish imkonini beradi.

Uchinchidan, ma'lumotlar qatlamida (src/data/roadmaps/ va roadmaps/) har bir yo'l xaritasi (roadmap-slug) ichidagi mavzular alohida Markdown fayllarda roadmaps/<roadmap-slug>/content/<topic-slug>@<node-id>.md (masalan, reading-files@S9wTlkbv9-R6dohhZ47hs.md) qat'iy konvensiyasi bo'yicha saqlanadi. Bu yerdagi @<node-id> unikal identifikatori Markdown faylni to'g'ridan-to'g'ri JSON grafdagi vizual quticha (node) bilan bog'laydi. Foydalanuvchi ekrandagi biror mavzu ustiga bosganda, NanoStores ($currentRoadmap) holat menejeri ishga tushib, TopicDetail.tsx oynasini ochadi va o'sha node-id ga tegishli qisqa tushuntirish, bepul resurslar hamda striming rejimida ishlovchi AI Tutor yordamchisini ko'rsatadi. Foydalanuvchi o'z progressini (done, learning, skipped, removed) belgilaganda, tizim SVG yoki React Flow elementlariga mos CSS klasslarni qo'llaydi va ma'lumotlarni api.roadmap.sh ga sinxronlashtirib, kunlik faollik zanjiri (streaks) hamda reyting jadvallarini (PersonalDashboard.tsx, TeamDashboard.tsx) yangilaydi.

http://googleusercontent.com/visual_element_0

1.2. Roadmap.sh dagi AI/ML Yo'nalishlari va Ularning Cheklovlari
roadmap.sh sun'iy intellekt sohasini bitta umumiy xaritaga birlashtirmasdan, uni mehnat bozoridagi aniq rollar (Role-based) va ko'nikmalar (Skill-based) bo'yicha bir nechta ixtisoslashgan xaritalarga ajratgan. Xususan, Machine Learning Roadmap (roadmap.sh/machine-learning) modellarni noldan yaratish va o'qitishga qaratilgan bo'lib, 10 ta asosiy bo'limni qamrab oladi: (1) Rolga kirish (ML Engineer va AI Engineer farqi), (2) Matematik poydevor (Chiziqli algebra, Calculus, Statistika va Ehtimollar, Diskret matematika), (3) Python asoslari va kutubxonalar (NumPy, Pandas, Matplotlib, Seaborn), (4) Ma'lumotlar bilan ishlash (SQL/NoSQL, API, IoT, JSON/Parquet/CSV/Excel, Data Cleaning, Feature Engineering, Scaling va Train-Test Splits), (5) ML yadrosi (Supervised, Unsupervised, Semi-supervised, Self-supervised va Reinforcement Learning), (6) Model tanlash va Regularizatsiya (Ridge, Lasso, ElasticNet, K-Fold, LOOCV), (7) Modellarni baholash (Accuracy, Precision, Recall, F1-Score, ROC-AUC, Log Loss, Confusion Matrix), (8) Deep Learning (Perceptrons, MLP, CNN, RNN/GRU/LSTM, Attention, Autoencoders, Transformers, GANs hamda TensorFlow, Keras, PyTorch, Scikit-learn), (9) NLP (Tokenization, Lemmatization, Stemming, Embeddings, Attention Models) va (10) Bog'liq xaritalar (MLOps, AI Engineer, AI Agents, Explainable AI).

Ikkinchi yirik yo'nalish — AI and Data Scientist Roadmap (roadmap.sh/ai-data-scientist) dastlab Careem kompaniyasining AI va Data Science jamoasi tomonidan tuzilgan bo'lib, biznes qarorlarini qabul qilish, chuqur statistika va eksperimentlarga urg'u beradi. Uning o'ziga xos jihati shundaki, unda klassik ML va Deep Learning'dan oldin A/B Testing (Booking.com'ning CUPED, DoorDash'ning CUPAC, Netflix'ning Stratification va Microsoft'ning Delta Method maqolalari bilan) hamda Ekonometrika (regressiya, vaqt qatorlari / Time Series, ARIMA modellari, taqsimotlarni moslashtirish) bo'limlari keltirilgan. Uchinchidan, AI Engineer (roadmap.sh/ai-engineer) va AI Agents (roadmap.sh/ai-agents) xaritalari tayyor (pre-trained) modellarni (OpenAI, Claude, Gemini, Mistral, Cohere hamda Hugging Face va Ollama orqali ochiq manbali modellarni) amaliy dasturiy mahsulotlarga integratsiya qilishga ixtisoslashgan. Bu yo'nalish Prompt Engineering, Embeddings, Vector Databases (Chroma, Pinecone, Weaviate, FAISS, LanceDB, Qdrant, Supabase, MongoDB Atlas, pgvector), RAG (Retrieval-Augmented Generation), Multimodal AI (Vision, DALL-E, Whisper), Context Engineering va AI xavfsizligini o'rgatadi.

Biroq tahlillarimiz roadmap.sh ning noldan boshlovchilar uchun 3 ta jiddiy kamchiligini ko'rsatadi:

Boshlang'ich matematika bo'shlig'i: roadmap.sh/machine-learning xaritasining matematika bo'limi bevosita Scalars, Vectors, Tensors, Eigenvalues, Singular Value Decomposition (SVD) hamda Jacobian, Hessian matritsalaridan boshlanadi. Oddiy kasrlar, darajalar, chiziqli tenglamalar, funksiyalar grafigi va hosila tushunchasini unutgan yoki bilmaydigan o'quvchi bu bosqichda qiynalib qoladi.
Ortiqcha mavzular yuki (Intimidation factor): Reddit'dagi r/datascience hamjamiyati muhokamalarida qayd etilishicha, roadmap.sh/ai-data-scientist xaritasi yangi boshlovchilar uchun haddan tashqari murakkab ko'rinadi; tajribali amaliyotchilar boshlang'ich bosqichda Ekonometrika va MLOps'ni o'tkazib turib, asosiy e'tiborni bitta matematika kursi, bazaviy statistika, Python, SQL hamda Pandas/Seaborn orqali EDA'ga qaratishni tavsiya etadilar.
Tashqi havolalarning eskirishi va o'quv muhitining yo'qligi: roadmap.sh o'zida to'liq kurs kontentini saqlamaydi, balki tashqi resurslarga yo'naltiradi; masalan, GitHub'dagi #5712-sonli murojaatda foydalanuvchilar ai-data-scientist xaritasidagi ko'plab tashqi havolalar xavfsiz ulanish xatosi (www.ojrq.net) tufayli ishlamay qolganini bildirgan.
1.3. Muqobil Platformalar Tahlili: Math Academy, Khan Academy, OSSU, DeepLearning.AI, Kaggle va Fast.ai
Siz qurmoqchi bo'lgan veb-sayt roadmap.sh ning vizual ustunligini boshqa ixtisoslashgan platformalarning pedagogik mexanizmlari bilan boyitishi lozim:

Math Academy va Justin Skycak metodologiyasi (mathacademy.com / justinmath.com): Aynan "oddiy matematik kasrlardan boshlab zamonaviy ML/AI gacha" muammosini tizimli hal qilgan o'quv dasturidir. Justin Skycak o'quv jarayonini 4 bosqichga (Stage 1: Foundational Math, Stage 2: Classical Machine Learning, Stage 3: Deep Learning, Stage 4: Cutting-Edge Machine Learning — Transformers, LLMs, Diffusion models) ajratadi. Platforma ma'lumotlariga ko'ra, uning adaptiv diagnostika va Fractional Implicit Repetition (FIR) tizimi an'anaviy 180 soatlik maktab/universitet darsini 20–40 soatlik fokuslangan amaliyotga (o'qish tezligini 4 barobargacha oshirgan holda, oyiga $49 evaziga) siqib beradi. Reddit (r/learnmath) va Hacker News foydalanuvchilari tajribasiga ko'ra, kattalar uchun mo'ljallangan uchta Mathematical Foundations (I–III) kursining har biri taxminan 4 000 XP (1 ta dars = ~10 XP = 10–20 daqiqa) hajmda bo'lib, arifmetikadan boshlab bir o'zgaruvchili analiz va bazaviy chiziqli algebragacha olib chiqadi; 242 ta mavzudan iborat Mathematics for Machine Learning kursi esa bir o'zgaruvchili analizni bilgan o'quvchidan taxminan 70 soat (yoki 2,5 oy) vaqt talab qiladi. Eng muhimi, u ML uchun zarur bo'lmagan oliy matematika mavzularini (masalan, Stoks teoremasi, divergensiya, rotor/curl, sferik koordinatalar, murakkab geometrik isbotlar va cheksiz qatorlarning yaqinlashish alomatlarini) o'quv dasturidan chiqarib tashlaydi.

Khan Academy (khanacademy.org): 180 milliondan ortiq ro'yxatdan o'tgan foydalanuvchi va 63 milliard daqiqalik o'quv ko'rsatkichiga ega bo'lgan bepul notijorat platforma bo'lib, boshlang'ich arifmetika va kasrlardan (3–4-sinf va Pre-algebra) boshlab Algebra 1/2, Geometriya, Trigonometriya, Precalculus, Calculus 1/2, Multivariable Calculus, Linear Algebra va Statistics & Probability gacha bo'lgan modullarni taqdim etadi. Platforma statistikasiga ko'ra, 1 ta ko'nikmani o'zlashtirish natijani +0,5 foiz punktga, 10 ta ko'nikma +5 foiz punktga, 60 ta ko'nikma esa +30 foiz punktga oshiradi; Khanmigo AI repetitori esa o'quvchiga mashqni noto'g'ri usulda ishlashga yo'l qo'ymaydi.

OSSU Data Science (github.com/ossu/data-science) va Amaliy AI Platformalar (DeepLearning.AI, fast.ai, Kaggle Learn): OSSU Data Science universitet darajasidagi ochiq o'quv dasturi bo'lib, kompyuter fanlari (Python, Java'da algoritmlar va ma'lumotlar tuzilmalari, Relyatsion bazalar, Data Warehouse va MongoDB), MIT universitetining 18.01 Single Variable Calculus, 18.06 Linear Algebra (3Blue1Brown vizual kurslari bilan), 18.02 Multivariable Calculus, Garvardning Stat 110 (Introduction to Probability) hamda Stenfordning Statistical Learning with Python (ISLP) kurslarini yagona ketma-ketlikka tizgan. Amaliy ML/DL bosqichida Andrew Ng tomonidan asos solingan DeepLearning.AI fundamental nazariya va qisqa kurslarni (Mathematics for Machine Learning and Data Science, Machine Learning Specialization, Deep Learning Specialization) taqdim etsa, fast.ai (Practical Deep Learning for Coders Part 1 & Part 2) 1-darsdanoq haqiqiy modellarni qurishga o'rgatadi. Kaggle Learn esa hech qanday dastur o'rnatmasdan, brauzer ichidagi Jupyter Notebook'da 3 soatlik bepul mikro-kurslar (Python, Pandas, Intro to SQL, Intro to Machine Learning) va sertifikatlar orqali tezkor amaliyot beradi.

2. AI Sohasida Mustahkam Karyera Qurish: Yo'nalishlar, Maoshlar va Bozor Talablari (2026–2027)
Sizning ikkinchi muhim maqsadingiz — ushbu o'quv jarayoni orqali kelajakda mustahkam karyera qurishdir. 2026–2027-yillardagi global IT mehnat bozori tahlili shuni ko'rsatadiki, sun'iy intellekt va ma'lumotlar sohasi 4 ta asosiy muhandislik va tahliliy rolga bo'lingan. Research.com keltirgan 2024-yilgi McKinsey AI Index tadqiqotiga ko'ra, tashkilotlarning 73 foizi ham modellarni yaratuvchi va tekshiruvchi Data Scientist'larga, ham ularni ishlab chiqarishga (production) joriy etuvchi AI muhandislarga birdek ehtiyoj sezadi.

Quyidagi jadvalda veb-saytingiz foydalanuvchilari uchun 4 ta asosiy karyera yo'nalishining aniq farqlari, vazifalari va texnologik steklari jamlangan:

Xususiyat

Data Analyst (Ma'lumotlar Tahlilchisi)

Data Scientist (Ma'lumotlar Olimi)

Machine Learning Engineer (ML Muhandisi)

AI Engineer (GenAI / Tizim Muhandisi)

Asosiy Maqsad

Turli manbalardan yig'ilgan ma'lumotlarni tahlil qilish va biznes uchun vizual taqdimotlar yaratish.

Statistik tahlil, eksperimentlar va ML yordamida murakkab ma'lumotlardan qonuniyatlarni topish va prognozlash.

Ma'lumotlardan mustaqil o'rganuvchi va avtomatik qaror qabul qiluvchi algoritmlar hamda tizimlarni yaratish.

Tayyor (pre-trained) AI modellar va vositalarni qo'llab, modellarni noldan o'qitmasdan amaliy mahsulotlar qurish.

Matematik Chuqurlik

Bazaviy statistika va ma'lumotlarni tekshirish.

Yuqori: Statistika, Ehtimollar nazariyasi, Chiziqli algebra, A/B Testing, Ekonometrika.

Juda yuqori: Calculus, Chiziqli algebra, Ehtimollar va optimizatsiya texnikalari (Gradient Descent).

Amaliy: Vektorlar o'xshashligi (Embeddings), token ehtimolliklari (temperature, top-p), baholash metrikalari.

Dasturlash va SWE Talabi

SQL, ilg'or Excel funksiyalari.

Python, R, SQL, Scala (dasturiy muhandislik amaliyotlariga kamroq urg'u).

Python, C++, Java; masshtablanuvchi tizim dizayni va kod optimizatsiyasiga kuchli urg'u.

Kuchli Software Engineering: Python (async), TypeScript, FastAPI, Docker, Kubernetes, CI/CD.

Asosiy Vositalar (Stack)

SQL, Excel, Tableau, Power BI, OpenRefine, Google Analytics.

Pandas, Matplotlib, Scikit-learn, Tableau, Hadoop, Spark, Jupyter, TensorFlow, PyTorch.

TensorFlow, PyTorch, Scikit-learn, Keras, XGBoost, GPUs, AWS.

OpenAI/Claude/Gemini API, Hugging Face, LangGraph, LlamaIndex, Qdrant/pgvector, MCP, vLLM, Ragas.

Asosiy Sohalar (2026–2027)

Sog'liqni saqlash, moliya, marketing, e-commerce, davlat sektori.

Moliya, sog'liqni saqlash, marketing, e-commerce (2027-yilda moliya va tibbiyotda talab yuqori).

Texnologiya, avtonom tizimlar (robot-mashinalar), robototexnika, fintech, R&D laboratoriyalar.

Texnologiya, avtonom tizimlar, sug'urta, korporativ SaaS va avtomatlashtirish.

Maosh Ko'rsatkichlari (roadmap.sh va BeInCareer 2026)

$82 000 – $86 200 / yiliga (AQSh).

$119 040 – $158 747 / yiliga (keng bozor diapazoni: $53 925 – $161 715).

ML Engineer -> Head of AI/ML o'sish yo'li; dasturiy muhandislar o'rtacha $105 596 dan boshlab tajriba bilan ko'proq topadi.

AQShda 150K (Entry) va $150K+ aksiya (Mid/Senior); Hindistonda ₹8–15 LPA dan ₹40–120 LPA+ gacha; MLOps+RAG+Agents +30–40% ustama beradi.

Sanoat amaliyotchilari va hisobotlariga ko'ra, 2026–2027-yillarda oddiy o'quvchini yuqori maoshli AI/ML muhandisidan ajratib turuvchi 5 ta hal qiluvchi amaliy qobiliyat mavjud:

Demolar emas, tizimlar haqida fikrlash (Systems over Demos): Jupyter Notebook'da ishlaydigan oddiy chat-botni har kim yoza oladi; yetakchi AI muhandislari birinchi qator kodni yozishdan oldin model "gallutsinatsiya" berganida (xato javob to'qiganida) tizim qanday ishlashi, kechikish vaqti (latency budget) va xatoliklardan silliq chiqish (graceful degradation) haqida o'ylaydi.
Baholash (Evaluation) tizimini birinchi o'ringa qo'yish: Jahon Iqtisodiy Forumining Future of Jobs Report 2025 hisobotida ko'nikmalar bo'shlig'i biznes transformatsiyasidagi eng katta to'siq sifatida ko'rsatilgan; AI muhandisligidagi eng muhim ko'nikma — modelni qurish emas, balki uning sifatini o'lchashdir. Kuchli muhandislar yangi funksiya qo'shishdan oldin Ragas, DeepEval yoki promptfoo yordamida 30–50 ta real savoldan iborat avtomatlashtirilgan baholash testlarini CI/CD (.github/workflows/evals.yml) ichiga joylashtiradi.
Narx egri chizig'ini (Cost Curve) hisoblash: Bitta so'rov uchun $0,02 arzon ko'rinishi mumkin, ammo oyiga 10 millionta so'rovga xizmat ko'rsatilganda bu juda katta mablag'ga aylanadi; amaliyotda bu hisob-kitobni oldindan qilmagan jamoalar bir oyda API xarajatlari uchun $50 000 dan ortiq mablag' yo'qotgan holatlar qayd etilgan. Tokenlarni keshlash (Redis) va vLLM hamda kvantlash (quantization) orqali samarali inference qurish yuqori baholanadi.
Model Context Protocol (MCP) va LangGraph: 2026-yilga kelib oddiy LangChain zanjirlari (LLMChain, initialize_agent) eskirdi (legacy); sanoatning og'irlik markazi LangGraph (durable state, persistence, human-in-the-loop) va MCP (Model Context Protocol) standartiga ko'chdi. Tashqi ma'lumotlar bazasi va vositalarni AI modellariga ulash uchun MCP serverlarini shunchaki chaqirib qolmay, ularni mustaqil yoza oladigan muhandislar mehnat bozorida jiddiy ustunlikka ega.
AI Xavfsizligi (Guardrails & Governance): Stenford Universitetining HAI 2026 AI Index Report hisobotida AI imkoniyatlari va boshqaruv tayyorgarligi (governance readiness) o'rtasidagi uzilish kengayib borayotgani ta'kidlangan; Prompt Injection hujumlaridan himoya, vositalarni izolyatsiya qilish (tool sandboxing) va shaxsiy ma'lumotlarni (PII) filtrlashni bilgan muhandislar yuqori ustama oladi.
3. Master Roadmap: Oddiy Matematik Kasrlardan Deep Learning va Production AI gacha To'liq Ma'lumotlar To'plami
Ushbu bo'lim siz qurmoqchi bo'lgan veb-saytning asosiy o'quv ma'lumotlar bazasi (Curriculum Dataset) hisoblanadi. Biz Math Academy va Khan Academy ning fundamental matematika ketma-ketligini OSSU Data Science hamda roadmap.sh ning Machine Learning, AI and Data Scientist va AI Engineer xaritalari bilan yagona, uzluksiz 7 bosqichli (Bosqich 0 dan Bosqich 6 gacha) tizimga birlashtirdik.

Bosqich 0: Elementar Arifmetika, Oddiy va O'nli Kasrlar hamda Pre-Algebra (Noldan Boshlash)
Justin Skycak ta'kidlaganidek, Machine Learning uchun fundamental matematikani o'rganish xuddi o'qishni o'rganishga o'xshaydi: savodxonlikka erishish keyingi barcha bilim eshiklarini ochadi, усиз esa zamonaviy AI olami o'quvchi uchun yopiqligicha qoladi. Agar o'quvchi maktab matematikasini unutgan bo'lsa, o'quv xaritasi bevosita oddiy kasrlardan (fractions) va Pre-algebra dan boshlanishi shart. Khan Academy va Math Academy standartlariga ko'ra, ushbu bosqich 6 ta ketma-ket o'quv modulini o'z ichiga oladi:

Modul №

Modul Nomi (Tugun / Node)

Ichki Mavzular (Khan Academy va Math Academy Asosida)

Keyingi Bosqich va AI Uchun Ahamiyati

0.1

Bo'luvchilar va Karralilar (Factors & Multiples)

Bo'luvchilar juftligi, bo'luvchi va karralilarni aniqlash, tub va murakkab sonlar (prime and composite numbers), tub ko'paytuvchilarga ajratish (prime factorization).

Kasrlarni qisqartirish va umumiy maxraj topish hamda algebraik ifodalarni ko'paytuvchilarga ajratish uchun poydevor.

0.2

Oddiy va O'nli Kasrlar (Fractions & Decimals)

Teng kuchli (ekvivalent) kasrlar va kasrlarni taqqoslash; kasrlarni qo'shish, ayirish, ko'paytirish va bo'lish; o'nli kasrlar xona birliklari (o'ndan birdan yuz minglargacha); manfiy sonlar va ratsional sonlar arifmetikasi.

Ehtimollar nazariyasi, nisbatlar, kasr darajalar va murakkab algebraik kasrlar bilan ishlashning asosiy tayanchi.

0.3

Qonuniyatlar va Jadvallar (Patterns)

Sonli va shaklli qonuniyatlar (patterns), qavslar qatnashgan ifodalarni hisoblash va tuzish, 2 ta o'zgaruvchini bog'lovchi qoidalar, ushbu qoidalardan jadvallar va grafiklar yasash.

Machine Learning'ning tub mohiyati — ma'lumotlar ichidagi qonuniyatlarni (pattern recognition) topish va kirish-chiqish o'zgaruvchilarini bog'lashdir.

0.4

Nisbatlar va Tezliklar (Ratios & Rates)

Bazaviy nisbatlar, qo'shaloq sonlar o'qi va nisbat jadvallari, ekvivalent nisbatlar, koordinata tekisligida nisbatlar, o'lchov birliklari, qism-butun nisbatlari (part-part-whole), birlik tezliklar (unit rates).

To'g'ri chiziq burchak koeffitsiyenti (slope), hosila (o'zgarish tezligi) va ML metrikalarini (Accuracy, Precision, Recall, Ratio Metrics) tushunishga olib boradi.

0.5

Foizlar (Percentages)

Foiz tushunchasi, kasr modellaridan foizlarni topish, kasr-o'nli kasr-foiz ekvivalentligi, tayanch (benchmark) foizlar, foizli matnli masalalar.

Ma'lumotlarni Train-Test qismlarga ajratish, foizli xatoliklarni va statistik ishonchlilik oraliqlarini hisoblash uchun zarur.

0.6

Darajalar, Amallar Tartibi va O'zgaruvchilar

Daraja ma'nosi, butun sonlar, oddiy va o'nli kasrlarning darajalari, 10 ning darajalari va ilmiy yozuv (scientific notation), kasr va darajalar bilan amallar tartibi; bir va ko'p o'zgaruvchili algebraik ifodalarni kasr/o'nli sonlarda hisoblash, taqsimot qonuni (distributive property), o'xshash hadlarni ixchamlash.

ML modellaridagi polinomlar, eksponentalar va o'rtacha kvadratik farqni (Loss Function L) hisoblash uchun bevosita tayyorgarlik.

Bosqich 1: Maktab Algebrasi, Geometriya, Trigonometriya va Precalculus (Funksiyalar va Vektorlar)
Kasrlar va algebraik ifodalar o'zlashtirilgach, o'quvchi Khan Academy ning maktab kurslari ketma-ketligi (Algebra basics \rightarrow Algebra 1 \rightarrow Geometry \rightarrow Algebra 2 \rightarrow Trigonometriya \rightarrow Precalculus) yoki Math Academy ning Mathematical Foundations I–II yo'nalishi bo'yicha funksiyalar va fazoviy almashtirishlarga o'tadi.

Birinchi navbatda Algebra 1 va Bazaviy Geometriya o'rganiladi: chiziqli tenglamalar va tengsizliklarni yechish, o'lchov birliklari bilan ishlash, to'g'ri chiziq grafigini chizish va burchak koeffitsiyenti (slope), tenglamalar sistemasi, darajali ifodalar va irratsional sonlar (radikallar), modulli va bo'lakli funksiyalar (absolute value & piecewise functions) hamda kvadrat funksiyalar va ko'phadlar (quadratics and polynomials). Geometriya qismidan faqat oliy matematika va ML uchun zarur bo'lgan mavzular — koordinatalar tekisligida analitik geometriya, masofa va o'rta nuqta, o'xshashlik va siljish/cho'zilish almashtirishlari (rigid transformations and dilations), uchburchaklar o'xshashligining AA mezoni hamda sirt yuzasi va hajmlar olinadi.

Keyingi qadamda Algebra 2, Trigonometriya va Precalculus modullari o'zlashtiriladi. Bu yerda o'quvchi ko'phadlar arifmetikasi va faktorizatsiyasi, funksiyalarni almashtirish (transformations of functions), eksponensial va logarifmik munosabatlar, ratsional funksiyalar (ularning nollari va asimptotalari) hamda trigonometrik funksiyalar va ayniyatlarni o'rganadi. Precalculus kursining 1-, 6- va 7-bo'limlari to'g'ridan-to'g'ri Deep Learning va Chiziqli algebraga ko'prik vazifasini bajaradi:

Murakkab (Composite) va Teskari (Inverse) Funksiyalar (Precalculus Unit 1): Murakkab funksiyalarni hisoblash va tuzish, funksiyaning teskarilanuvchanligini aniqlash va aniqlanish sohasini cheklash. Ko'p qatlamli neyron tarmoq va undagi murakkab funksiya hosilasi (Chain Rule) aynan composite funksiyalarga tayanadi.
Vektorlar (Precalculus Unit 6): Vektor komponentlari, vektor uzunligi (magnitude) va yo'nalishi, skalyarga ko'paytirish, vektorlarni qo'shish va ayirish.
Matritsalar (Precalculus Unit 7): Ma'lumotlarni matritsa ko'rinishida ifodalash va qayta ishlash, matritsalarni qo'shish, ayirish va ko'paytirish, matritsalarni tekislik hamda 3D/4D vektorlarning geometrik almashtirishlari (transformations) sifatida tushunish, 2x2 matritsaning teskarisini topish va tenglamalar sistemasini matritsa orqali yechish.
Matematik Filtr (Bosqich 1 da nimalarni o'tkazib yuborish kerak?): Math Academy o'quv dasturi tahliliga (r/learnmath) ko'ra, kattalar uchun mo'ljallangan tezlashtirilgan yo'nalishda ichki chizilgan burchaklar (inscribed angles), Fales teoremasi (Thales' theorem), uchburchaklar tengligining SSS va SAS mezonlari, kesma o'rtasi va uchburchak proporsionalligi teoremalari hamda konus kesimlarining (ellips va giperbola) fokus, direktrisa va ekssentrisitet xossalariga chuqur kirish shart emas — bu mavzular olib tashlanganda o'quvchi vaqtdan katta yutadi.

Bosqich 2: Oliy Matematika — Machine Learningning 3 Ustuni (Linear Algebra, Calculus, Probability & Statistics)
Ushbu bosqich roadmap.sh/machine-learning, roadmap.sh/ai-data-scientist, OSSU Data Science va Math Academy ning Mathematics for Machine Learning (242 ta mavzu) kurslarining yadrosini tashkil etadi. Bu bosqichni yakunlagan o'quvchi zamonaviy AI ilmiy maqolalarida uchraydigan matematik belgilarni — matematik kutilma (\mathbb{E}), standart chetlanish (\sigma), vektor normasi (\Vert), integrallash doimiysi (+C, hosila olinganda nolga aylanuvchi o'zgarmas) hamda model bashorati va haqiqiy qiymatlar orasidagi o'rtacha kvadratik farqni o'lchovchi yo'qotish funksiyasini (L) qiynalmasdan o'qiy oladi.

Ustun

Asosiy Mavzular (roadmap.sh va Math Academy Asosida)

O'tkazib Yuboriladigan (Keraksiz) Mavzular

Bepul va Asosiy Manbalar

1. Chiziqli Algebra (Linear Algebra)

Skalyarlar, Vektorlar, Matritsalar va Tenzorlar (Scalars, Vectors, Tensors); Vektor normasi (\Vert); Matritsa amallari; Determinant va Teskari matritsa (Inverse of Matrix); Xos sonlar va diagonallashtirish (Eigenvalues & Diagonalization); Singular Value Decomposition (SVD).

Murakkab abstrakt vektor fazolarining nazariy isbotlari.

3Blue1Brown: Essence of Linear Algebra, MIT 18.06SC Linear Algebra (OCW), Khan Academy: Linear Algebra.

2. Matematik Analiz (Single & Multivariable Calculus)

Limitlar, Hosilalar va Xususiy hosilalar (Derivatives & Partial Derivatives); Murakkab funksiya hosilasi (Chain Rule of Derivation — Backpropagation asosi); Gradient, Yakobian va Gessian (Gradient, Jacobian, Hessian); Bazaviy integrallar va 2-tartibli Teylor ko'phadlari.

Divergensiya, rotor (curl), sferik koordinatalar, Grin va Stoks teoremalari (Stokes' theorem), aylanish jismlari hajmi, qatorlarning yaqinlashish alomatlari, qiyalik maydonlari (slope fields).

MITx 18.01 Single Variable & MIT 18.02SC Multivariable Calculus, Math Academy, DeepLearning.AI Math for ML.

3. Ehtimollar, Statistika va Diskret Matematika

Ehtimollar asoslari va Bayes teoremasi; Deskriptiv statistika; Taqsimot turlari, tasodifiy miqdorlar, dispersiya va PDF; Inferensial statistika, tanlama, Markaziy Limit Teoremasi (CLT), Hypothesis Testing va ishonchlilik oraliqlari; Diskret matematika (graflar, to'plamlar, mantiq).

Ekonometrika (ARIMA, vaqt qatorlari) va murakkab A/B Testing (CUPED, CUPAC, Delta Method) — bular faqat Data Scientist yo'nalishi uchun kerak, ML/AI Engineer boshlanishiga o'tkazib yuborishi mumkin.

Harvard Stat 110 (Probability), Khan Academy Statistics, StatQuest (YouTube), Stanford Statistical Learning with Python (ISLP).

Bosqich 3: Dasturlash Asoslari (Python), Algoritmlar (DSA), SQL va Exploratory Data Analysis (EDA)
Matematik poydevor qurilgach (Phase 1–2), o'quvchi ma'lumotlarni dasturiy qayta ishlashga o'tadi. roadmap.[span_1](start_span)[span_1](end_span)sh/machine-learning, roadmap.sh/ai-data-scientist va OSSU Data Science talablariga ko'ra, ushbu bosqich to'rtta texnik blokdan iborat:

Birinchi blok — Python Dasturlash Tili va Dasturiy Muhandislik Asoslari: bazaviy sintaksis, o'zgaruvchilar va ma'lumot turlari, shart operatorlari va sikllar (conditionals & loops), ichki ma'lumotlar tuzilmalari (lists, dicts, sets), istisnolar (exceptions) va fayllarni boshqarish, funksiyalar hamda Obyektga Yo'naltirilgan Dasturlash (OOP — classes). Zamonaviy AI muhandisligi uchun shuningdek asinxron dasturlash (async/await), type hints, Git va GitHub versiyalarni boshqarish tizimi hamda Linux buyruqlar qatori (Bash terminal, fayllar, ruxsatlar, loglar, SSH) majburiy hisoblanadi.

Ikkinchi blok — Ma'lumotlar Tuzilmalari va Algoritmlar (DSA): roadmap.sh/ai-data-scientist, OSSU va Justin Skycak qo'llanmasiga ko'ra, kuchli muhandis saralash (sorting), qidirish (searching), ArrayLists, LinkedLists, Stacks, Queues, Binary Trees, Heaps, HashMaps, Divide and Conquer, Dijkstra, Dynamic Programming va graflar bo'ylab yurish (graph traversals) algoritmlarini bilishi hamda LeetCode mashqlarida qo'llay olishi kerak.

Uchinchi blok — Ma'lumotlar Manbalari, Bazalar va Formatlar: relyatsion ma'lumotlar bazalari (SQL — PostgreSQL, MySQL) va NoSQL (MongoDB, Cassandra, Redis), Data Warehouse tushunchalari, Internet API'lari (REST API — requests va httpx kutubxonalari bilan), mobil ilovalar va IoT qurilmalaridan ma'lumot yig'ish hamda JSON, Parquet, CSV va Excel formatlari bilan ishlash.

To'rtinchi blok — Ilmiy Kutubxonalar, Data Preprocessing va Exploratory Data Analysis (EDA): NumPy (massivlar va matritsalar), Pandas (ma'lumotlarni yuklash va manipulyatsiya qilish), Matplotlib va Seaborn (shuningdek Tableau va Power BI) yordamida vizual tahlil. Bu yerda o'quvchi Data Cleaning (xatolarni, bo'shliqlarni / missing holes va anomal qiymatlarni / outliers tozalash), Feature Engineering & Feature Selection (yangi belgilar yaratish va saralash), Feature Scaling & Normalization hamda Train-Test Data Splits jarayonlarini amalda bajaradi. Bepul manbalar sifatida Kaggle Learn: Python, Pandas, Intro to SQL, Google's Python Class va Exploratory Data Analysis with Python and Pandas kurslari tavsiya etiladi.

Bosqich 4: Klassik Machine Learning — Algoritmlar, Regularizatsiya va Modellarni Baholash
roadmap.sh/machine-learning (5-, 6-, 7-bo'limlar) va Justin Skycak'ning Stage 2: Classical Machine Learning metodikasiga ko'ra, o'quvchi avval asosiy regressiya va klassifikatsiya modellarining soddalashtirilgan versiyalarini (chiziqli regressiyadan tortib kichik ko'p qatlamli neyron tarmoqlargacha) Gradient Descent yordamida o'zi kodlab chiqishi, so'ngra Scikit-learn va XGBoost kutubxonalarida sanoat modellarini qurishi lozim. Algoritmlarni noldan yozish o'quvchida Loss funksiyasi va parametrlar optimizatsiyasi bo'yicha kuchli intuisiya hosil qiladi.

Machine Learning Paradigmalari: Supervised Learning (nazorat ostida o'qitish), Unsupervised Learning (nazoratsiz o'qitish), Semi-supervised Learning, Self-supervised Learning va Reinforcement Learning.
Supervised Learning (Regressiya va Klassifikatsiya): Regressiya uchun Linear Regression va Polynomial Regression; Klassifikatsiya uchun Logistic Regression, Support Vector Machines (SVM), K-Nearest Neighbors (KNN), Decision Trees, Random Forest va Gradient Boosting Machines (XGBoost).
Unsupervised Learning (Klasterlash va O'lchamni Qisqartirish): Klasterlash turlari (K-Means, Hierarchical, Overlapping, Exclusive, Probabilistic) hamda o'lchamni qisqartirish (Principal Component Analysis — PCA va Autoencoders).
Regularizatsiya, Validatsiya va Giperparametrlarni Sozlash: Underfitting va Overfitting muammosini hal qilish uchun Ridge, Lasso va ElasticNet regularizatsiya usullari; modelni tekshirish uchun K-Fold Cross-Validation va LOOCV (Leave-One-Out Cross-Validation); model tanlash va giperparametrlarni sozlash (Model Selection & Tuning).
Modellarni Baholash Metrikalari (Model Evaluation): Confusion Matrix, Accuracy, Precision & Recall, F1-Score, ROC-AUC va Log Loss.
Asosiy Darsliklar va Portfolio Loyiha: Andrew Ng'ning 3 ta kursdan iborat Machine Learning Specialization dasturi (Coursera), Justin Skycak'ning Introduction to Algorithms and Machine Learning bepul darsligi (Blondie24 shashka o'ynovchi AI ilmiy maqolasini kodda qayta tiklash mashqlari bilan), Christopher M. Bishop'ning Pattern Recognition & ML kitobi, Open Machine Learning Course (ODS) va Kaggle Learn: Intro to Machine Learning. Amaliy milestone sifatida uy-joy narxlarini bashorat qilish, elektron xatlarni klassifikatsiyalash yoki bank tranzaksiyalarida firibgarlikni (fraud detection) aniqlash modeli quriladi.
Bosqich 5: Deep Learning — Neyron Tarmoqlar, CNN, RNN, Transformers va Diffusion Modellari
Klassik ML o'zlashtirilgach, o'quvchi ko'p parametrli chuqur neyron tarmoqlarga (Stage 3: Deep Learning va Stage 4: Cutting-Edge ML) o'tadi. Bu yerda tarmoq arxitekturasi bajarilayotgan vazifaga (tasvir, ketma-ketlik, matn yoki generatsiya) qarab maxsus tanlanadi va modellar PyTorch (yoki TensorFlow / Keras) yordamida GPU'larda o'qitiladi:

Yo'nalish / Arxitektura

O'rganiladigan Aniq Texnik Mavzular (roadmap.sh Asosida)

Amaliy Qo'llanilishi va Asosiy Manbalar

1. Neural Network (NN) Asoslari

Perceptrons & Multi-Layer Perceptrons (MLP / Fully Connected NN); Forward propagation & Backpropagation; Activation Functions; Loss Functions; PyTorch tenzor amallari va GPU boshqaruvi.

Jadval va bazaviy chiziqsiz ma'lumotlarni modellashtirish; fast.ai Practical Deep Learning, De[span_2](start_span)[span_2](end_span)epLearning.AI Deep Learning Specialization, Deep Learning Book.

2. Convolutional Neural Networks (CNNs)

Convolution, Padding, Strides, Pooling qatlamlari; Transfer Learning.

Tasvirlarni klassifikatsiya qilish (Image Classification), segmentatsiya (Image Segmentation), rasm va videolarni tanish (OpenCV), tibbiy tasvirlar tahlili, avtonom avtomobillarda yo'l va piyodalarni aniqlash.

3. ketma-ketlik Modellari (RNNs) va NLP

NLP asoslari: Tokenization, Stemming, Lemmatization, Embeddings (spaCy, Hugging Face); RNN, GRU, LSTM arxitekturalari.

Matn hissiyotlarini tahlil qilish (Sentiment Analysis), nomlangan obyektlarni ajratish (Named Entity Recognition — NER), ketma-ketliklarni prognozlash.

4. Attention, Transformers va Generativ AI

Attention Mechanisms & Autoencoders; Transformers (Self-Attention va Multi-head Attention); Generative Adversarial Networks (GANs); Diffusion Models.

Yirik til modellari (LLMs) va tasvir generatsiyasi; "Attention is all you need" va "Denoising Diffusion Probabilistic Models" maqolalari, "The Illustrated Transformer".

5. Reinforcement Learning va XAI

Q-Learning, Deep Q-Networks (DQN), Policy Gradients, Actor-Critic Methods; Explainable AI (XAI).

O'yin AI'lari, robototexnika va murakkab tizimlarda qaror qabul qilish; Kaggle Learn: Intro to Game AI and Reinforcement Learning.

---

Bosqich 6: Production AI Engineering, RAG, AI Agentlar (MCP) va MLOps (6 Oylik Amaliy Karyera Rejasi)
Deep Learning nazariyasidan so'ng, dasturchini bozorda yuqori maoshli AI Engineer yoki MLOps Engineer darajasiga olib chiqish uchun roadmap.sh/ai-engineer, roadmap.sh/ai-agents, roadmap.sh/mlops hamda KodeKloud va HabibDev 2026-yilgi amaliy o'quv dasturlariga asoslangan 6 bosqichli (6 oylik) yagona portfolio loyiha ketma-ketligi bajariladi:

1-Oy — LLM API'lari, FastAPI va Structured Outputs: FastAPI (Routes, Pydantic sxemalari, async endpointlar, SQLAlchemy/Postgres) hamda LLM asoslarini (tokenizatsiya, kontekst oynasi, token narxlari, temperature, top-p, frequency/presence penalty) o'rganish. OpenAI, Anthropic Claude yoki Google Gemini API'lariga Python orqali ulanib, qat'iy strukturalangan JSON natija qaytaradigan va har bir so'rov narxini log qiladigan CLI/API ilova (main.py, pyproject.toml) yozish.
2-Oy — Prompt Engineering va Avtomatlashtirilgan Evaluation (CI/CD): ReAct prompting va kontekst muhandisligini (Context Engine[span_74](start_span)[span_74](end_span)ering) o'zlashtirish. promptfoo, Ragas yoki DeepEval yordamida 30–50 ta haqiqiy savoldan iborat baholash to'plamini (evals/questions.yaml, evals/test_answers.py) tuzib, uni GitHub Actions (.github/workflows/evals.yml) ga ulash — har bir prompt o'zgarishi kod bazaga qo'shilishidan (merge) oldin ball bilan baholanadi.
3-Oy — Embeddings, Vector Databases va RAG Pipeline: OpenAI Embeddings API va ochiq manbali Sentence Transformers yordamida hujjatlarni vektorlashtirish. pgvector (PostgreSQL), Chroma, [span_341](start_span)[span_341](end_span)[span_343](start_span)[span_343](end_span)Qdrant yoki Pinecone vektor bazasini ko'tarib (compose.yaml), hujjatlarni bo'laklash (Chunking) \rightarrow Embedding \rightarrow Vector Search \rightarrow Generation (manbalarga aniq iqtiboslar / citations bilan) zanjirini avval to'g'ridan-to'g'ri SDK'da, so'ngra LlamaIndex yordamida qurish.
4-Oy — AI Agentlar, Xotira (Memory) va Model Context Protocol (MCP): Agent siklini (perceive -> reason/plan -> act/invoke tool -> observe/reflect) avval freymvorksiz qo'lda yozib ko'rish, so'ngra LangGraph (state machines, conditional routing, checkpointing, human-in-the-loop) va ko'p agentli tizimlarga (CrewAI, AutoGen, PydanticAI) o'tish. Agentga qisqa va uzoq muddatli xotira (Redis, semantik va epizodik xotira) ulash hamda 2–3 ta vositani shaxsiy MCP Server (tools/mcp_server.py) orqali taqdim etish.
5-Oy — Deployment, Observability, Guardrails va MLOps: Xizmatni FastAPI va Docker (Dockerfile, Kubernetes / deploy/k8s.yaml) ichiga joylashtirish, AWS (Bedrock, SageMaker, ECS, Lambda), GCP Vertex AI yoki Azure AI bulutiga chiqarish. Langfuse yoki LangSmith (OpenTelemetry) orqali har bir qadamni kuzatish (tracing.py), Redis orqali rate-limiting va keshlash, 500 ta parallel foydalanuvchiga yuklama testi (load testing) hamda Prompt Injection va PII filtrlash himoyalarini o'rnatish.
6-Oy — Ochiq Modellar (Ollama, vLLM), LoRA/QLoRA Fine-Tuning va Ishga Kirish Portfoliosi: Hugging Face va Ollama orqali ochiq og'irlikdagi modellarni lokal sinash, LoRA / QLoRA yordamida tor vazifa uchun fine-tuning qilish (notes/lora.md) va vLLM orqali inference tezligini optimallashtirish. Natijada 3–5 ta to'liq ishlaydigan, arxitektura diagrammalari va baholash raqamlari keltirilgan GitHub repozitoriysidan iborat portfolio tayyor bo'ladi (sifat miqdordan muhim: 3 ta mukammal production loyiha 10 ta oddiy o'quv loyihasidan ustun turadi).
4. O'z Veb-Saytingizni Noldan Qurish Uchun Amaliy Texnik Loyiha (Implementation Blueprint)
Yuqoridagi tadqiqot va 7 bosqichli o'quv dasturini roadmap.sh va Math Academy darajasidagi interaktiv veb-saytga aylantirish uchun quyidagi aniq arxitektura va ma'lumotlar sxemasini qo'llashingiz tavsiya etiladi:

4.1. Tavsiya Etiladigan Texnologik Stek (Tech Stack)
roadmap.sh ning sinovdan o'tgan arxitekturasiga (nilbuild/developer-roadmap) asoslanib, loyihani PNPM monorepo (pnpm-workspace.yaml) sifatida quyidagi stekda ko'taring:

Asosiy Freymvork va SSR: Astro (v5.7+ / @astrojs/node) — barcha o'quv xaritalari (src/pages/[roadmapId]/index.astro), loyihalar (projects.astro) va darslik sahifalarini serverda tez yig'ish (SSR Hybrid) hamda qidiruv tizimlari (SEO) uchun.
Interaktiv UI va Graf Dvigateli: React (v19+), TypeScript, Tailwind CSS va React Flow (@xyflow/react / @roadmapsh/editor). React Flow sizga Bosqich 0 dan Bosqich 6 gacha bo'lgan barcha mavzularni interaktiv tugunlar (Nodes) va yo'nalishlar (Edges) sifatida chizish, klaviatura yordamida boshqarish hamda /r/embed orqali boshqa saytlarga ulashish imkonini beradi.
Mijoz Holati (State Management) va Backend Ma'lumotlar Bazasi: Brauzerda tugunlar holatini (done, learning, skipped, removed) va yon oynani (TopicDetail.ts[span_171](start_span)[span_171](end_span)[span_173](start_span)[span_173](end_span)[span_175](start_span)[span_175](end_span)x) boshqarish uchun NanoStores; foydalanuvchi profili (OAuth/Email), kunlik streak'lar, XP ballari, reyting jadvallari (leaderboards) va AI Tutor chat tarixini saqlash uchun esa PostgreSQL (yoki yengil variantda SQLite) hamda FastAPI / Node.js API.
4.2. Ma'lumotlar Bazasi va Kontent Sxemasi (JSON Graph + Markdown Git-CMS)
roadmap.sh ning roadmaps/<roadmap-slug>/content/<topic-slug>@<node-id>.md fayl saqlash tizimini Math Academy ning bilimlar grafi (Prerequisite Knowledge Graph va Fractional Implicit Repetition) bilan birlashtirib, har bir mavzu tuguni (node) uchun quyidagi ma'lumotlar sxemasini yarating:

Maydon Nomi (Field)

Ma'lumot Turi

Vazifasi va Misol (roadmap.sh + Math Academy Gibridi)

node_id

String

Vizual JSON grafdagi qutichani .md fayl bilan bog'lovchi unikal ID (masalan, fractions-intro@m0_u2_01).

stage

Integer (0–6)

Mavzuning qaysi bosqichga tegishli ekanligi (0: Pre-Algebra/Kasrlar, 2: Oliy matematika, 5: Deep Learning).

title_uz / title_en

String

Mavzuning o'zbekcha va xalqaro inglizcha nomi (masalan, "Xususiy hosilalar / Partial Derivatives").

prerequisites

Array<node_id>

Ushbu mavzuni ochish uchun o'quvchi oldin bilishi shart bo'lgan tugunlar ro'yxati (Math Academy adaptiv diagnostikasi uchun).

encompassed_nodes

Array<node_id>

Fractional Implicit Repetition (FIR) uchun: ushbu murakkab mavzu ishlanganda avtomatik takrorlanadigan oddiyroq mavzular ID'lari.

xp_value

Integer

Mavzuni tugatganda beriladigan tajriba balli (Math Academy standarti: 10 XP = 10–20 daqiqalik dars va mashq).

role_tracks

Arra[span_21](start_span)[span_21](end_span)y<String>

Karyera filtri: ["data-analyst",[span_52](start_span)[span_52](end_span) "data-scientist", "ml-engineer", "ai-engineer"] (masalan, Ekonometrika faqat data-scientist uchun yonadi).

ai_motivation_bridge

Markdown

"Bu matematik mavzu AI'da qayerda ishlatiladi?" savoliga aniq tushuntirish (masalan, Chain Rule darsida Backpropagation bog'liqligini ko'rsatish).

4.3. Platformani Bosqichma-Bosqich Ishga Tushirish Rejasi (MVP Execution)
1-Qadam (Git-CMS va Interaktiv Xarita Yadrosi): Astro, React Flow va NanoStores yordamida Bosqich 0 dan Bosqich 6 gacha bo'lgan vizual xaritani ko'taring. Har bir tugun bosilganda o'ng tomondan TopicDetail.tsx oynasi ochilib, o'zbek tilidagi qisqa konspekt, ai_motivation_bridge bloki hamda Khan Academy, 3Blue1Brown, MIT OCW, Kaggle Learn va fast.ai dagi tekshirilgan darslarga havolalarni chiqarsin.
2-Qadam (Progress Tracking, Karyera Filtri va Vazifalar Doskasi): Foydalanuvchilarga tugunlarni Done / Learning / Skipped qilish va kunlik XP maqsadlarini belgilash imkonini bering. Yuqori panelga "Karyera Rolini Tanlash" filtrini qo'shing: foydalanuvchi "AI Engineer" ni tanlasa, Ekonometrika va murakkab A/B Testing tugunlari xiralashib (optional bo'lib), asosiy yo'lak Python, FastAPI, RAG, Vector DB va MCP Agentlarga qaratilsin; "ML Engineer" yoki "Data Scientist" tanlanganda esa barcha oliy matematika va Deep Learning tugunlari to'liq faollashsin.
3-Qadam (Adaptiv Diagnostika, AI Tutor va Portfolio Tizimi): Math Academy va Khan Academy tajribasiga tayanib, har bir bosqich boshiga adaptiv diagnostik test qo'shing — agar foydalanuvchi kasrlar va maktab algebrasini bilsa, tizim Bosqich 0 va 1 ni avtomatik Done qilib, uni to'g'ridan-to'g'ri bilimida bo'shliq bor tugundan boshlatsin. Shuningdek, roadmap.sh ning projects.astro va striming AI Tutor (Khanmi[span_386](start_span)[span_386](end_span)[span_388](start_span)[span_388](end_span)[span_390](start_span)[span_390](end_span)go / [span_98](start_span)[span_98](end_span)roadmap.sh AI Tutor) tizimi kabi, har bir bosqich yakunida foydalanuvchidan GitHub repozitoriy havolasini (Milestone Project) qabul qiluvchi portfolio modulini ishga tushiring.
Источники
1. How to get from high school math to cutting-edge ML/AI - justinmath, https://www.justinmath.com/how-to-get-from-high-school-math-to-cutting-edge-ml-ai/ 2. Software Architect - Developer Roadmaps, https://roadmap.sh/software-architect 3. The AI Agents Roadmap Nobody Is Talking About (2026 Edition), https://dev.to/cypriantinasheaarons/the-ai-agents-roadmap-nobody-is-talking-about-2026-edition-5774 4. Courses - Math Academy, https://www.mathacademy.com/courses 5. AI Engineer Roadmap 2026 by Career Stage: Skills and Tools, https://www.kunalganglani.com/blog/ai-engineer-roadmap-2026 6. Math - Khan Academy, https://www.khanacademy.org/math 7. What Is Roadmap.sh? A Developer's Guide to Structured Learning, https://ones.com/blog/what-is-roadmap-sh-a-developers-guide-to-structured-learning/ 8. Math Academy, https://www.mathacademy.com/ 9. GitHub Repositories Ranking - UNPKG, https://unpkg.com/@wcj/github-rank@24.10.6/web/repos.html 10. Custom Roadmap Editor & Renderer | nilbuild/developer ... - DeepWiki, https://deepwiki.com/nilbuild/developer-roadmap/7.1-custom-roadmap-editor-and-renderer 11. nilbuild/developer-roadmap - DeepWiki, https://deepwiki.com/nilbuild/developer-roadmap 12. Recent Math Academy Users : r/learnmath - Reddit, https://www.reddit.com/r/learnmath/comments/1edeuw8/recent_math_academy_users/ 13. ADVANCED All-in-One Roadmap to Learn AI - Incubator.org, https://incubator.org/applications/blogs/advanced-all-in-one-roadmap-to-learn-ai 14. GitHub - ossu/data-science: 📊 Path to a free self-taught education in, https://github.com/ossu/data-science 15. Intro to Machine Learning - Kaggle, https://www.kaggle.com/learn/intro-to-machine-learning 16. AI Engineer Roadmap 2026: Skills, Tools & Salary Guide - Beincareer, https://beincareer.com/ai-engineer-roadmap-2026/ 17. AI Engineering Roadmap — Updated 2026 - Habib., https://www.habibdev.me/cv.pdf 18. awesome-stars/README.md at main - GitHub, https://github.com/PsiACE/awesome-stars/blob/main/README.md 19. Kamran Ahmed: Roadmap.sh, 1.25M-User Developer ... - YouTube, https://www.youtube.com/watch?v=QKtPamXNYoA 20. Roadmap.sh and The New Stack, https://thenewstack.io/roadmap-sh-and-the-new-stack/ 21. GitHub - offensive-vk/Roadmap.sh: Alert: This is a mirror of the, https://github.com/offensive-vk/Roadmap.sh 22. Visual Regression Tests | nilbuild/developer-roadmap | DeepWiki, https://deepwiki.com/nilbuild/developer-roadmap/11.1-visual-regression-tests 23. ML Engineer - roadmap.sh, https://roadmap.sh/r/ml-engineer-3dqvu 24. AI & Machine Learning - Developer Roadmaps, https://roadmap.sh/roadmaps/?g=AI+%26+Machine+Learning 25. AI and Data Scientist Roadmap, https://roadmap.sh/ai-data-scientist 26. AI and Data Scientist Roadmap 2023 | PDF | Statistics - Scribd, https://www.scribd.com/document/827578905/AI-and-Data-Scientist-Roadmap 27. AI-Data Science Pathway: Comprehensive Study Guide & Resources, https://www.studocu.vn/vn/document/dai-hoc-nong-lam-thanh-pho-ho-chi-minh/nhap-mon-tri-tue-nhan-tao/ai-data-scientist-lo-trinh-mon-tri-tue-nhan-tao/75979346 28. AI Engineer - Developer Roadmaps, https://roadmap.sh/ai-engineer 29. AI Engineer Roadmap - DEV Community, https://dev.to/roadmapsh/ai-engineer-roadmap-3n8 30. Does a Data Scientist need to learn all these skills? - Reddit, https://www.reddit.com/r/datascience/comments/1mc2zaz/does_a_data_scientist_need_to_learn_all_these/ 31. Ask HN: What Are You Working On? (June 2025) - Hacker News, https://news.ycombinator.com/item?id=44416093 32. This site can't provide a secure connection · Issue #5712 - GitHub, https://github.com/kamranahmedse/developer-roadmap/issues/5712 33. Free Online AI Courses in 2026 - Artificial Intelligence +, https://www.aiplusinfo.com/blog/discover-36-free-online-ai-courses/ 34. Math Academy pulled me out of the Valley of Despair - Hacker News, https://news.ycombinator.com/item?id=43241499 35. Pre-algebra | Khan Academy, https://www.khanacademy.org/math/pre-algebra 36. Precalculus | Math - Khan Academy, https://www.khanacademy.org/math/precalculus 37. Khan Academy | Khan Academy, https://www.khanacademy.org/ 38. Free Tech Learning Resources (Curated) - TechSkillHub, https://www.techskillhub.cv/resources 39. Best AI Tools for Students - AI Compass, https://ai-compass.in/collections/best-for-students 40. AI Courses - DeepLearning.AI, https://www.deeplearning.ai/courses?courses_date_desc%5BrefinementList%5D%5Bcourse_type%5D%5B0%5D=Specializations 41. course22-web/index.qmd at master · fastai/course22-web · GitHub, https://github.com/fastai/course22-web/blob/master/index.qmd 42. Learn Python - Kaggle, https://www.kaggle.com/learn/python 43. Kaggle Learn Course Certificates, https://www.kaggle.com/learn-course-certificates 44. Data Science vs Machine Learning: How are they different?, https://roadmap.sh/ai-data-scientist/vs-machine-learning 45. Data Science vs. AI: How I Would Choose My Path, https://roadmap.sh/ai-data-scientist/vs-ai 46. Data Science vs. Data Analytics: Which is Right for You?, https://roadmap.sh/ai-data-scientist/vs-data-analytics 47. 2027 AI Engineer vs Data Scientist: Which Path Fits AI Master's, https://research.com/online-degrees/artificial-intelligence/ai-engineer-vs-data-scientist-which-path-fits-ai-masters-graduates 48. Data Science vs Software Engineering: Which to Choose?, https://roadmap.sh/ai-data-scientist/vs-software-engineering 49. AI Engineer Roadmap: Skills, Stack and a 6 Month Plan - KodeKloud, https://kodekloud.com/blog/ai-engineer-roadmap/ 50. Math: Get ready courses - Khan Academy, https://www.khanacademy.org/math/get-ready-courses 51. Correct learning order for a senior math beginner?, https://support.khanacademy.org/hc/en-us/community/posts/4410062747789-Correct-learning-order-for-a-senior-math-beginner 52. Maths Course Order – «Քան - Khan Academy Help Center, https://support.khanacademy.org/hc/hy/community/posts/360076114812/comments/360013994072 53. Developer Roadmaps - roadmap.sh, https://roadmap.sh/ 54. MLOps Roadmap, https://roadmap.sh/mlops 55. How to become a data scientist as a biochemistry PhD? If I learn, https://www.quora.com/How-do-I-become-a-data-scientist-as-a-biochemistry-PhD-If-I-learn-more-math-could-I-eventually-become-a-full-on-machine-learning-AI-researcher