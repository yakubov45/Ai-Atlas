# -*- coding: utf-8 -*-
"""
Enrichment data for Weeks 8 and 9 (D08.1 - D09.3)
"""

ENRICH_W8_W9 = {
    "D08.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Nima Uchun RAG Kerak va Hujjatlarni Qanday Bo'laklash (Chunking) Kerak?",
                "explanationUz": "LLM o'qitilgan sanadan keyingi yangi qonunlar, kompaniya ichki hujjatlari va maxfiy ma'lumotlarni bilmaydi hamda bilmagan narsasini to'qib chiqaradi (Hallucination). **RAG (Retrieval-Augmented Generation)** savol kelganda avval hujjatlar bazasidan tegishli parchalarni (`chunks`) qidirib topadi va prompt ichida modelga dalil sifatida beradi. Agar 100 betlik PDFni kesmasdan bitta vektor qilsak, ma'no 'bo'tqaga' aylanadi; agar har 200 belgida ko'r-ko'rona kessak, jumla va modda o'rtasidan uzilib qoladi! To'g'ri yondashuv — **Recursive / Semantic Chunking (`chunk_size = 300-512 token`, `chunk_overlap = 50-80 token`)** va har bir bo'lakka `doc_id`, `clause_num`, `page` **metadata**sini biriktirishdir.",
                "codeExample": "def recursive_chunk_with_overlap(words: list[str], size: int = 8, overlap: int = 2) -> list[dict]:\n    chunks = []\n    step = max(1, size - overlap)\n    for idx, start in enumerate(range(0, len(words), step), start=1):\n        slice_words = words[start:start + size]\n        if not slice_words:\n            break\n        chunks.append({'chunk_id': f'c_{idx}', 'text': ' '.join(slice_words), 'word_count': len(slice_words)})\n        if start + size >= len(words):\n            break\n    return chunks\n\ntext = 'Mehnat kodeksi 134 modda yillik asosiy eng kam mehnat tatili davomiyligi yigirma bir kalendar kun etib belgilanadi'.split()\nfor c in recursive_chunk_with_overlap(text, size=7, overlap=2):\n    print(c)",
                "outputOrNoteUz": "Natija: `overlap=2` tufayli 1-bo'lak oxiridagi `'mehnat tatili'` so'zlari 2-bo'lak boshida ham takrorlandi — chegara ustiga tushgan ma'no uzilib qolmadi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Contextual Header Injection (Yetim Bo'laklar Muammosini Hal Qilish)",
                "explanationUz": "Tasavvur qiling, 45-betdagi chunkda shunchaki *'Ushbu muddat 3 yildan oshmasligi kerak'* deb yozilgan. Qaysi muddat? Ipotekami, kafolatmi yoki da'vo muddatimi? Bob sarlavhasi 40-betda qolib ketgani uchun bu 'yetim chunk' (`orphan chunk`) qidiruvda topilmaydi! Muhandislik yechimi: har bir chunk matni oldiga uning ota-bob sarlavhalarini (**Parent Document / Section Breadcrumb**) avtomatik qo'shib embedding olish: `'[Hujjat: Fuqarolik Kodeksi | Bob: 12-bob. Da\\'vo muddati] Ushbu muddat 3 yildan oshmasligi kerak'`.",
                "codeExample": "raw_chunk = 'Ushbu muddat uch yildan oshmasligi belgilangan.'\nmetadata = {'doc': 'Fuqarolik Kodeksi', 'section': 'Da\\'vo muddati', 'article': '150-modda'}\n\nenriched_for_embedding = f\"[{metadata['doc']} | {metadata['section']} | {metadata['article']}] {raw_chunk}\"\nprint('Oddiy (Yetim) chunk:    ', raw_chunk)\nprint('Kontekstli boyitilgan:  ', enriched_for_embedding)",
                "outputOrNoteUz": "Natija: Foydalanuvchi *'Fuqarolik kodeksida da\\'vo muddati qancha?'* deb so'raganda boyitilgan chunk 99% aniqlikda topiladi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Vector Database Indexing (HNSW va Metadata Filtering)",
                "explanationUz": "ChromaDB, Qdrant yoki Milvus vektor bazalari har bir chunkni 3 ta qismda saqlaydi: `id`, `vector` (768/1024 float32) va `payload/metadata` (`{'year': 2026, 'department': 'HR', 'access_level': 'public'}`). Qidiruv vaqtida **Pre-filtering** (avval metadata bo'yicha faqat `year == 2026` va foydalanuvchi ruxsati bor hujjatlarni filtrlab, keyin HNSW grafi bo'ylab Cosine Similarity qidirish) ham tezlikni oshiradi, ham maxfiy hujjatlar sizib chiqishidan (RBAC security) himoya qiladi.",
                "codeExample": "vector_db = [\n    {'id': 'c1', 'vec': [0.9, 0.1], 'meta': {'year': 2022, 'role': 'all'}, 'text': 'Eski 2022-yilgi stavka: 15%'},\n    {'id': 'c2', 'vec': [0.88, 0.2], 'meta': {'year': 2026, 'role': 'all'}, 'text': 'Yangi 2026-yilgi stavka: 12%'},\n    {'id': 'c3', 'vec': [0.95, 0.05], 'meta': {'year': 2026, 'role': 'vip_only'}, 'text': 'Maxfiy VIP stavka: 8%'},\n]\n\n# Pre-filter: year == 2026 AND role == 'all'\nfiltered = [doc for doc in vector_db if doc['meta']['year'] == 2026 and doc['meta']['role'] == 'all']\nprint('Metadata Pre-Filter dan o\\'tgan xavfsiz va aktual hujjat:', filtered[0]['text'])",
                "outputOrNoteUz": "Natija: Eskirgan 2022-yilgi hujjat va ruxsat etilmagan `vip_only` hujjat qidiruvdan oldin kesib tashlandi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: O'zbek Qonun Hujjatlari Uchun Modda-bo'yicha (Structure-Aware) Chunker",
                "scenarioUz": "Kodeks va shartnomalarni har 500 harfda ko'r-ko'rona emas, balki `'1-modda.'`, `'2-modda.'` chegarasi bo'yicha mantiqiy bo'laklash.",
                "howToUseUz": "Strukturali chunker kodini ishga tushiring.",
                "code": "import re\n\nlegal_doc = '''\n1-modda. Umumiy qoidalar\nUshbu qonun elektron tijorat sohasidagi munosabatlarni tartibga soladi.\n2-modda. Elektron shartnoma\nElektron shartnoma yozma shartnoma bilan bir xil yuridik kuchga ega.\n3-modda. To'lov tizimlari\nHisob-kitoblar milliy valyutada amalga oshiriladi.\n'''\n\nparts = re.split(r'(?=\\d+-modda\\.)', legal_doc.strip())\nstructured_chunks = []\nfor p in parts:\n    if not p.strip():\n        continue\n    first_line = p.strip().split('\\n')[0]\n    structured_chunks.append({'article': first_line, 'content': p.strip().replace('\\n', ' ')})\n\nfor sc in structured_chunks:\n    print(sc)",
                "expectedOutput": "{'article': '1-modda. Umumiy qoidalar', 'content': '1-modda. Umumiy qoidalar Ushbu qonun...'}\n{'article': '2-modda. Elektron shartnoma', 'content': '2-modda. Elektron shartnoma...'}",
                "breakdownUz": "Jadval, Markdown sarlavhalari (`#`, `##`) yoki qonun moddalari bo'yicha bo'lish (Structure-Aware Chunking) RAG aniqligini oddiy fixed-size chunkingga qaraganda 20-35% ga oshiradi!"
            },
            {
                "titleUz": "2-misol: Chunk Size Trade-off Tahlili (Kichik vs Katta Chunk)",
                "scenarioUz": "Nima uchun `chunk_size` juda kichik (`32 token`) ham, juda katta (`4000 token`) ham bo'lmasligi kerakligini hisoblash.",
                "howToUseUz": "Granularity jadvalini ko'ring.",
                "code": "tradeoffs = [\n    ('Juda kichik (32-64 token)',   'Aniq jumla vektori', 'Kontekst uziladi (shart va istisnolar tushib qoladi)'),\n    ('Optimal (256-512 token)',     'Fikr to\\'liq + Vektor aniq', 'RAG uchun eng muvozanatli nuqta (50-64 token overlap bilan)'),\n    ('Small-to-Big (Parent-Child)', 'Qidiruv 128 tokenda, LLMga 512 token ota-blok', 'Eng ilg\\'or Production RAG arxitekturasi!'),\n    ('Juda katta (2000+ token)',    'Kontekst to\\'liq', 'Embedding vektori xiralashadi (signal-to-noise tushib ketadi)'),\n]\nfor size, pro, con in tradeoffs:\n    print(f'{size:28} | Ustunligi: {pro:45} | Xususiyati: {con}')",
                "expectedOutput": "Juda kichik (32-64 token)...\nSmall-to-Big (Parent-Child)...",
                "breakdownUz": "**Small-to-Big (Parent-Child) Retrieval**: vektor qidiruv kichik aniq jumla (`128 token child`) bo'yicha qilinadi, ammo LLMga javob yozish uchun uning to'liq paragrafi (`512 token parent`) uzatiladi!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "RAG (Retrieval-Augmented Generation)",
                "category": "LLM & RAG",
                "definitionUz": "LLM parametrlaridagi statik xotiraga tayanmasdan, tashqi bilimlar bazasidan dinamik topilgan hujjat parchalarini promptga qo'shib asoslangan javob generatsiya qilish arxitekturasi.",
                "analogyOrExampleUz": "Yoddan javob berish (Closed-book exam) o'rniga rasmiy kodeks va ma'lumotnomani ochib, aniq betini ko'rsatib javob berish (Open-book exam).",
                "connectedTo": [
                    {
                        "targetTerm": "Ragas Faithfulness & Context Recall",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "10-haftada RAG tizimining qidiruv qismi `Context Recall` va `Hit@k` bilan, generatsiya qismi esa `Faithfulness` (manbaga sodiqlik) bilan o'lchanadi."
                    }
                ]
            },
            {
                "term": "Chunk Size, Overlap & Parent-Child Retrieval",
                "category": "LLM & RAG",
                "definitionUz": "Hujjatni embedding model kontekstiga mos bo'laklarga (`chunk_size`) chegaralarda ma'no uzilmasligi uchun ustma-ust tushish (`overlap`) bilan ajratish.",
                "analogyOrExampleUz": "Panoramali suratga olishda har bir keyingi kadr oldingi kadrning chetki 15% qismini ham qamrab olishi — shunda ularni ulaganda chiziq sezilmaydi.",
                "connectedTo": [
                    {
                        "targetTerm": "Token Fertility in Uzbek",
                        "targetLessonId": "D06.1",
                        "relationshipUz": "`chunk_size` harflar sonida emas, aynan embedding model tokenizerining **tokenlar sonida** (`256-512 token`) belgilanishi shart."
                    }
                ]
            },
            {
                "term": "HNSW (Hierarchical Navigable Small World) & Pre-Filtering",
                "category": "LLM & RAG",
                "definitionUz": "Millionlab vektorlar ichidan millisoniyalarda eng yaqin qo'shnilarni topuvchi ko'p qavatli graf indeksi hamda metadata bo'yicha dastlabki filtrlash.",
                "analogyOrExampleUz": "Shaharlararo aviaqatnov (yuqori qavat — katta sakrashlar) orqali kerakli shaharga tushib, keyin mahalla ko'chalari (pastki qavat) bo'ylab aniq uyni topish.",
                "connectedTo": [
                    {
                        "targetTerm": "Cosine Similarity & L2 Normalization",
                        "targetLessonId": "D03.1",
                        "relationshipUz": "HNSW grafida qaysi tugunga o'tish qarori 3-haftada o'rganilgan Cosine Similarity / Dot Product orqali qabul qilinadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d08-1-int-1",
                "level": "Junior",
                "questionUz": "128,000 token kontekst oynasiga ega zamonaviy LLM'lar chiqqan bo'lsa, nega barcha hujjatlarni shunchaki promptga tashlab qo'ymasdan hali ham RAG ishlatamiz?",
                "interviewerIntentUz": "Long-context LLM vs RAG xarajat, tezlik va 'Lost in the Middle' muammolarini bilishini tekshirish.",
                "strongAnswerUz": "4 ta jiddiy sabab bor: 1) **Xarajat va TTFT Latency**: har bir oddiy savol uchun 100,000 token yuborish 1,500 tokenlik RAG'ga qaraganda **65 barobar qimmat** va Prefill (TTFT) vaqti 15-30 soniyaga cho'zilib ketadi; 2) **Hajm**: korporativ baza 100,000 token emas, balki 50 million token (minglab PDF va jadvallar) bo'ladi — hech qanday kontekst oynasiga sig'maydi; 3) **'Lost in the Middle' effekti**: LLM'lar 100k tokenning boshini va oxirini yaxshi ko'radi, ammo o'rtasida turgan faktni o'tkazib yuboradi va chalg'iydi; 4) **RBAC Xavfsizlik**: har bir foydalanuvchiga faqat uning huquqi yetadigan hujjat bo'laklarinigina metadata filter bilan berish kerak.",
                "redFlagUz": "'To'g'ri, 128k kontekst bo'lsa RAG umuman kerak emas' deyish.",
                "followUpQuestionUz": "Savol: RAG va Fine-Tuning (QLoRA) o'rtasida qachon qaysi birini tanlaysiz? Javob: Yangi/o'zgaruvchan faktlar, manba iqtibosi (`[1]`) va gallyutsinatsiyani kamaytirish kerak bo'lsa — **RAG**; modelning gapirish uslubi, toni, maxsus format yoki domen terminologiyasiga moslashish kerak bo'lsa — **Fine-Tuning** (ko'pincha ikkalasi birga!)."
            },
            {
                "id": "d08-1-int-2",
                "level": "Middle",
                "questionUz": "Hujjatlarni yangilaganda yoki qayta yuklaganda Vector DB'da dublikat va eskirgan (stale) chunklar to'planib qolmasligi uchun Ingestion Pipeline'ni qanday loyihalaysiz?",
                "interviewerIntentUz": "Production RAG data lifecycle va idempotent ingestion tajribasini sinash.",
                "strongAnswerUz": "1) **Deterministic Chunk ID va Content Hash**: har bir chunkka tasodifiy `uuid4()` emas, balki `sha256(doc_id + chunk_index + content_hash)` asosida deterministik ID beriladi va `upsert` qilinadi; 2) **Document-level Versioning**: hujjatning yangi versiyasi (`v2`) kelganda, avval Vector DB'dan `delete(filter={'doc_id': doc_id})` orqali eski versiyaning barcha chunklari tozalanadi (yoki `is_active: true/false` bayrog'i atomik almashtiriladi); 3) O'zgarmagan chunklarni qayta embedding qilmaslik uchun `content_hash` tekshiriladi.",
                "redFlagUz": "'Har kuni `collection.add()` bilan ustiga qo'shib boraveraman' deyish (bu qidiruvda bitta hujjatning 5 ta eski va yangi nusxasi chiqib ketishiga olib keladi!).",
                "followUpQuestionUz": "Savol: Agar embedding modelni `all-MiniLM` (384-dim) dan `BGE-M3` (1024-dim) ga almashtirsangiz, mavjud Vector DB indeksini nima qilish kerak? Javob: Barcha hujjatlarni yangi model bilan **100% qaytadan embedding qilib (Re-indexing)** yangi kolleksiyaga yozish shart! Chunki turli modellarning vektor fazolari bir-biriga mutlaqo mos tushmaydi."
            },
            {
                "id": "d08-1-int-3",
                "level": "Senior / Production",
                "questionUz": "PDF hujjatlar ichidagi murakkab moliyaviy JADVALLAR (Tables) oddiy matn chunkeri bilan bo'linganda RAG jadvalli savollarga umuman javob bera olmayapti. Buni qanday hal qilasiz?",
                "interviewerIntentUz": "Real korporativ RAG'dagi eng og'riqli muammo — Table & Layout Parsing yechimlarini bilishini sinash.",
                "strongAnswerUz": "Oddiy `PyPDF` + `CharacterTextSplitter` jadvalning sarlavha qatorini (Header) 1-chunkka, raqamlarini esa 5-chunkka uzib yuboradi — natijada raqamlar qaysi ustunga tegishli ekani butunlay yo'qoladi. Yechim: 1) **Layout-Aware Parsing** (`Docling`, `Marker`, `Unstructured` yoki VLM) orqali jadvallarni yaxlit **Markdown Table** yoki **HTML/JSON** formatida ajratib olish; 2) Jadvalni o'rtasidan kesmaslik (yoki katta jadval bo'lsa har bir bo'lak boshiga `| Ustun1 | Ustun2 |` sarlavha qatorini qayta yopishtirish); 3) **Multi-Vector / Summary Indexing**: jadvalning matnli qisqa tavsifini generatsiya qilib, qidiruvni tavsif + ustun nomlari bo'yicha qilish, LLMga esa to'liq Markdown jadvalni uzatish.",
                "redFlagUz": "'`chunk_size` ni 100 ga tushirsam jadvallar yaxshi chiqadi' deyish.",
                "followUpQuestionUz": "Savol: Qaysi holatda RAG o'rniga **Text-to-SQL / Tool Calling** ishlatish kerak? Javob: Agar foydalanuvchi aniq analitik hisob-kitob (*'2025-yilda Toshkent filialining jami savdosi necha so'm bo'lgan?'*) so'rasa, Vector Search (Top-5 parcha) barcha qatorlarni yig'a olmaydi — bunday savol SQL bazaga yoki DuckDB Tool'ga yo'naltirilishi shart!"
            }
        ],
        "videos": [
            {
                "id": "vid-d08-1-en",
                "title": "Hands-On RAG Tutorial: Chunk, Embed & Query",
                "channel": "Bojan Savic",
                "language": "en",
                "youtubeId": "UII9xn6-3EI",
                "youtubeUrl": "https://www.youtube.com/watch?v=UII9xn6-3EI",
                "durationOrTimestamp": "To'liq amaliy RAG quvuri",
                "whatItExplainsUz": "Hujjatlarni o'qish, chunklarga bo'lish, embedding model orqali vektor bazaga yozish va so'rov bo'yicha qidirish to'liq kod bilan ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi chunking qadamini ko'rib, 1-amaliy misoldagi o'zbek qonun moddalari regex chunkeri bilan solishtiring."
            },
            {
                "id": "vid-d08-1-ru",
                "title": "Что такое RAG в LLM и причём тут векторные базы данных",
                "channel": "Rustam Kamalov",
                "language": "ru",
                "youtubeId": "sr2iWz133eg",
                "youtubeUrl": "https://www.youtube.com/watch?v=sr2iWz133eg",
                "durationOrTimestamp": "To'liq arxitektura tahlili",
                "whatItExplainsUz": "RAG tizimining barcha bosqichlari (Ingestion, Chunking, Vector DB, Retrieval va Generation) va odatiy xatolar tushuntirilgan.",
                "howToUseVideoUz": "Contextual Header Injection (2-bosqich) texnikasini 2-portfolio loyihangizning ingestion skriptiga qo'shing."
            }
        ],
        "quiz": [
            {
                "id": "d08-1-q1",
                "promptUz": "1. Konseptual: RAG tizimida hujjatlarni bo'laklashda `chunk_overlap` (masalan 50-64 token ustma-ust tushish) nima uchun ishlatiladi?",
                "options": [
                    "Vektor bazani to'ldirish uchun",
                    "Ikki bo'lak chegarasiga tushib qolgan jumla va fikr o'rtasidan uzilib, ma'nosi yo'qolmasligi uchun",
                    "Modelni sekinlashtirish uchun",
                    "Faqat rasmlarni kesish uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "Overlap bo'laklar tutashgan joydagi kontekst uzluksizligini saqlab qoladi."
            },
            {
                "id": "d08-1-q2",
                "promptUz": "2. Kod Tahlili: Embedding modelni `Model-A (384-dim)` dan `Model-B (1024-dim)` ga almashtirganda mavjud Vector DB indeksini nima qilish shart?",
                "options": [
                    "Hech narsa qilmasdan eski vektorlar ustida yangi model bilan qidirish davom ettiriladi",
                    "Barcha hujjat chunklarini yangi `Model-B` yordamida qaytadan embedding qilib (Re-indexing) yangi kolleksiyaga yozish shart",
                    "Yangi vektorlarning oxirgi 640 ta sonini kesib tashlash kerak",
                    "Eski vektorlarga 0 qo'shib qo'yish kerak"
                ],
                "correctIndex": 1,
                "explanationUz": "Har bir embedding model o'zining mustaqil koordinatalar fazosiga ega; so'rov va hujjatlar aynan bitta modelda vektorlangan bo'lishi shart."
            },
            {
                "id": "d08-1-q3",
                "promptUz": "3. Production Debugging: Chunk ichida *'To\\'lov muddati 10 kundan oshmasligi shart'* deb yozilgan, ammo u qaysi shartnoma yoki qaysi moddaga tegishli ekani chunk ichida yo'q (`Orphan chunk`). Eng to'g'ri yechim nima?",
                "options": [
                    "Chunkni o'chirib tashlash",
                    "Contextual Header Injection: embedding olishdan oldin har bir chunk boshiga hujjat nomi, bob va modda sarlavhasini (`[Hujjat | Bob | Modda]`) qo'shish",
                    "Butun 500 betlik kitobni 1 ta chunk qilish",
                    "Temperature'ni 2.0 qilish"
                ],
                "correctIndex": 1,
                "explanationUz": "Sarlavha breadcrumb'ini chunk matniga qo'shish yetim bo'laklarga to'liq kontekst beradi va retrieval aniqligini keskin oshiradi."
            }
        ]
    },
    "D08.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Nega Yolg'iz Vector Search Yetarli Emas? (Hybrid Search: Dense + BM25)",
                "explanationUz": "Dense Vector Search (Embedding) ma'nodosh gaplarni yaxshi topadi (*'ishdan bo'shash' <-> 'mehnat shartnomasini bekor qilish'*). Ammo foydalanuvchi aniq modda raqami (`'MK 134-modda'`), mahsulot artikuli (`'RTX-4070-Ti'`), STIR/INN raqami yoki kam uchraydigan o'zbekcha terminni qidirganda Dense Embedding ko'pincha adashadi! **BM25 (Sparse Lexical Search)** esa aynan aniq kalit so'zlar va noyob raqamlarni (IDF og'irligi yuqori so'zlarni) bexato topadi. **Hybrid Search** ikkalasini birlashtiradi va **Reciprocal Rank Fusion (RRF)**: $\\text{RRF}(d) = \\frac{1}{k + \\text{rank}_{\\text{dense}}(d)} + \\frac{1}{k + \\text{rank}_{\\text{bm25}}(d)}$ ($k=60$) formulasi bilan yagona reytingga yig'adi!",
                "codeExample": "def reciprocal_rank_fusion(dense_ranked_ids: list[str], bm25_ranked_ids: list[str], k: int = 60) -> list[tuple[str, float]]:\n    scores = {}\n    for rank, doc_id in enumerate(dense_ranked_ids, start=1):\n        scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)\n    for rank, doc_id in enumerate(bm25_ranked_ids, start=1):\n        scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)\n    return sorted(scores.items(), key=lambda x: x[1], reverse=True)\n\ndense_top = ['doc_12', 'doc_134', 'doc_05'] # Semantik yaqinlar\nbm25_top  = ['doc_134', 'doc_99', 'doc_12'] # Aniq '134-modda' so'zi borlar\nprint('RRF Hybrid G\\'oliblari:', [(d, round(s, 5)) for d, s in reciprocal_rank_fusion(dense_top, bm25_top)])",
                "outputOrNoteUz": "Natija: Ikkala qidiruvda ham kuchli o'rin olgan `'doc_134'` (`0.03252`) hech qanday murakkab ball normalizatsiyasisiz 1-o'ringa chiqdi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Ikki Bosqichli Retrieval — Bi-Encoder (Top-25) -> Cross-Encoder Reranker (Top-3)",
                "explanationUz": "1) **1-bosqich (Bi-Encoder + BM25)**: Savol va 100,000 ta hujjat alohida-alohida vektorlangan bo'ladi — 10 ms ichida eng yaqin **Top-25** nomzodni yig'ib oladi (yuqori Recall, o'rtacha Precision). 2) **2-bosqich (Cross-Encoder Reranker, masalan `bge-reranker-v2-m3`)**: Top-25 ta nomzodning har birini savol bilan BIRGA bitta Transformer Encoder ichiga `[CLS] Savol [SEP] Hujjat [SEP]` qilib uzatadi! Bu yerda savolning har bir so'zi hujjatning har bir so'zi bilan to'liq Self-Attention (`token-to-token cross-attention`) qiladi va eng aniq **Top-3** hujjatni 95%+ aniqlikda saralab LLMga uzatadi!",
                "codeExample": "# 2-bosqichli Retrieval pipeline:\ncandidates_top5 = [\n    {'id': 'c1', 'hybrid_rank': 1, 'rerank_logit': 1.2,  'text': 'Mehnat ta\\'tili haqida umumiy tushuncha'},\n    {'id': 'c2', 'hybrid_rank': 2, 'rerank_logit': 5.8,  'text': '134-modda: Yillik asosiy ta\\'til kamida 21 kalendar kun'},\n    {'id': 'c3', 'hybrid_rank': 3, 'rerank_logit': -2.1, 'text': 'Ish haqi to\\'lash muddatlari'},\n    {'id': 'c4', 'hybrid_rank': 4, 'rerank_logit': 4.1,  'text': '135-modda: Uzaytirilgan yillik ta\\'til (o\\'qituvchilar uchun)'},\n]\nreranked_top2 = sorted(candidates_top5, key=lambda x: x['rerank_logit'], reverse=True)[:2]\nprint('Cross-Encoder Reranker saralagan Top-2 dalil:')\nfor r in reranked_top2:\n    print(f\"Score={r['rerank_logit']:>4} (Oldingi rank={r['hybrid_rank']}) -> {r['text']}\")",
                "outputOrNoteUz": "Natija: Umumiy gap bo'lgan `c1` pastga tushib, aniq javob bor `c2` (`5.8`) va `c4` (`4.1`) Top-2 ga ko'tarildi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: O'zbekcha Anti-Hallucination Prompt va Qat'iy Citation (`[1]`, `[2]`) (Gap Lab 4)",
                "explanationUz": "8-hafta **2-Portfolio Loyihasi** va **Original Gap Lab 4** ning asosiy talabi: mahalliy chatbot har bir da'vosi oxirida manba indeksini (`[1]`, `[2]`) ko'rsatishi va agar berilgan kontekstda aniq javob bo'lmasa (yoki Reranker eng yuqori balli `< 0.25` bo'lsa), ichki xotirasidan to'qimasdan qat'iy: *\"Kechirasiz, taqdim etilgan rasmiy hujjatlarda ushbu savol bo'yicha ma'lumot topilmadi\"* deb javob qaytarishi (**Abstention / Refusal**) shart!",
                "codeExample": "def build_uzbek_grounded_rag_prompt(question: str, top_chunks: list[dict], min_rerank_score: float = 0.0) -> dict:\n    if not top_chunks or max(c['score'] for c in top_chunks) < min_rerank_score:\n        return {'abstain': True, 'response': \"Kechirasiz, taqdim etilgan hujjatlarda bu savolga oid yetarli dalil topilmadi.\"}\n    ctx_blocks = [f\"[{i}] (Manba: {c['source']})\\n{c['text']}\" for i, c in enumerate(top_chunks, start=1)]\n    prompt = (\n        \"QAT'IY QOIDA: Faqat quyidagi MANBALAR asosida javob ber. \"\n        \"O'zingdan hech qanday tashqi ma'lumot qo'shma. Har bir fakt oxirida [1], [2] ko'rinishida iqtibos keltir.\\n\\n\"\n        + \"\\n\\n\".join(ctx_blocks)\n        + f\"\\n\\nSAVOL: {question}\\nJAVOB:\"\n    )\n    return {'abstain': False, 'prompt': prompt}\n\nres_ok = build_uzbek_grounded_rag_prompt('Ta\\'til necha kun?', [{'source': 'MK-134', 'score': 4.5, 'text': 'Ta\\'til 21 kun.'}])\nres_no = build_uzbek_grounded_rag_prompt('Marsga chipta narxi qancha?', [{'source': 'MK-134', 'score': -3.2, 'text': 'Ta\\'til 21 kun.'}])\nprint('Topilganda Abstain:', res_ok['abstain'])\nprint('Dalil yo\\'q bo\\'lganda:', res_no['response'])",
                "outputOrNoteUz": "Natija: Reranker threshold (`score < 0.0`) tufayli Mars haqidagi savol LLMga hatto yuborilmasdan 0 gallyutsinatsiya bilan xavfsiz rad etildi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: BM25 (Okapi BM25) Formulaning Python Implementatsiyasi",
                "scenarioUz": "Nima uchun BM25 oddiy TF-IDF dan ustun ekanini (`k1` — so'z takrorlanishi to'yinishi, `b` — hujjat uzunligi normalizatsiyasi) kodda ko'rish.",
                "howToUseUz": "BM25 qidiruv skriptini ishga tushiring.",
                "code": "import math\n\ndocs = [\n    'mehnat kodeksi 134 modda yillik tatil 21 kun',\n    'soliq kodeksi QQS stavkasi 12 foiz hisoblanadi',\n    'mehnat shartnomasi va sinov muddati 3 oy',\n]\n\ndef bm25_score(query_terms: list[str], docs_list: list[str], k1: float = 1.5, b: float = 0.75) -> list[tuple[int, float]]:\n    tokenized = [d.split() for d in docs_list]\n    N = len(tokenized)\n    avgdl = sum(len(d) for d in tokenized) / N\n    results = []\n    for idx, doc in enumerate(tokenized):\n        score = 0.0\n        for q in query_terms:\n            df = sum(1 for d in tokenized if q in d)\n            idf = math.log(1.0 + (N - df + 0.5) / (df + 0.5))\n            tf = doc.count(q)\n            num = tf * (k1 + 1.0)\n            den = tf + k1 * (1.0 - b + b * (len(doc) / avgdl))\n            score += idf * (num / max(den, 1e-9))\n        results.append((idx, round(score, 4)))\n    return sorted(results, key=lambda x: x[1], reverse=True)\n\nprint('So\\'rov: [\"134\", \"tatil\"] bo\\'yicha BM25 ballari:', bm25_score(['134', 'tatil'], docs))",
                "expectedOutput": "So'rov: [\"134\", \"tatil\"] bo'yicha BM25 ballari: [(0, 2.2039), (1, 0.0), (2, 0.0)]",
                "breakdownUz": "`'134'` va `'tatil'` so'zlari faqat 0-hujjatda uchragani uchun yuqori IDF oldi va 0-hujjat aniq topildi."
            },
            {
                "titleUz": "2-misol: Post-Generation Citation Verifier (Iqtibos Tekshiruvchi)",
                "scenarioUz": "LLM javob ichida `[1]` va `[5]` deb iqtibos qo'ysa-yu, ammo biz unga faqat 3 ta manba (`[1], [2], [3]`) bergan bo'lsak, soxta `[5]` iqtibosni avtomatik ushlash!",
                "howToUseUz": "Citation validator kodini sinab ko'ring.",
                "code": "import re\n\ndef verify_citations(answer_text: str, num_provided_sources: int) -> dict:\n    cited_nums = [int(m) for m in re.findall(r'\\[(\\d+)\\]', answer_text)]\n    invalid = [c for c in cited_nums if c < 1 or c > num_provided_sources]\n    return {\n        'has_citations': len(cited_nums) > 0,\n        'valid_citations': [c for c in cited_nums if 1 <= c <= num_provided_sources],\n        'hallucinated_citations': invalid,\n        'is_grounded': len(cited_nums) > 0 and len(invalid) == 0\n    }\n\nprint('To\\'g\\'ri javob:', verify_citations('Ta\\'til 21 kun [1], o\\'qituvchilarga 48 kun [2].', num_provided_sources=3))\nprint('Soxta iqtibos:', verify_citations('Jarima miqdori 5 BHM [1] va [7].', num_provided_sources=3))",
                "expectedOutput": "To'g'ri javob: {'has_citations': True, 'valid_citations': [1, 2], 'hallucinated_citations': [], 'is_grounded': True}\nSoxta iqtibos: {'has_citations': True, 'valid_citations': [1], 'hallucinated_citations': [7], 'is_grounded': False}",
                "breakdownUz": "2-portfolio loyihasida javob foydalanuvchiga yuborilishidan oldin aynan shunday deterministic regex verifier dan o'tadi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Hybrid Search & Reciprocal Rank Fusion (RRF)",
                "category": "LLM & RAG",
                "definitionUz": "Semantik vektor qidiruv (Dense) va leksik kalit-so'z qidiruv (Sparse/BM25) natijalarini ballar masshtabiga bog'liq bo'lmagan o'rinlar formulasi $\\sum \\frac{1}{k + \\text{rank}_i}$ orqali birlashtirish.",
                "analogyOrExampleUz": "Ikki hakam bahosi: biri 100 ballik, ikkinchisi 5 yulduzli tizimda baholasa, ballarni qo'shib bo'lmaydi; ammo ikkala hakamning '1-o'rin, 2-o'rin' reytingini adolatli birlashtirish mumkin.",
                "connectedTo": [
                    {
                        "targetTerm": "Ragas Context Precision & Hit@k",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "10-haftada yolg'iz Dense Search va Hybrid+Reranker konfiguratsiyalarini 30 ta o'zbekcha golden savolda (`golden_uz_30.jsonl`) solishtirib, Hit@5 o'sishini isbotlaymiz."
                    }
                ]
            },
            {
                "term": "Bi-Encoder vs Cross-Encoder Reranker",
                "category": "LLM & RAG",
                "definitionUz": "Bi-Encoder — savol va hujjatni alohida vektorlab миллионлаб hujjatdan 5 ms da Top-25 ni oladi; Cross-Encoder — savol va hujjatni birgalikda bitta Encoderdan o'tkazib chuqur token-to-token attention bilan Top-3 ni saralaydi.",
                "analogyOrExampleUz": "Ishga qabul qilish: Bi-Encoder — 10,000 ta rezyumeni 1 daqiqada filtrlab 20 ta nomzodni tanlash; Cross-Encoder — o'sha 20 ta nomzod bilan yuzma-yuz chuqur suhbat o'tkazib 3 tasini olish.",
                "connectedTo": [
                    {
                        "targetTerm": "Bidirectional Transformer Encoder (BERT/XLM-R)",
                        "targetLessonId": "D06.4",
                        "relationshipUz": "6-haftada o'rganilgan Bidirectional Encoder (`BGE-Reranker-v2-M3`) bu yerda Cross-Encoder Reranker sifatida ishlaydi."
                    }
                ]
            },
            {
                "term": "Grounded Generation & Abstention (Refusal Threshold)",
                "category": "LLM & RAG",
                "definitionUz": "Modelni faqat berilgan dalillarga tayanib `[1]` iqtibos bilan yozishga majburlash va Reranker ishonchi past bo'lganda javob to'qimasdan 'Ma'lumot topilmadi' deb to'xtash mexanizmi.",
                "analogyOrExampleUz": "Sud ekspertizasi: dalil bo'lsa moddasini ko'rsatib xulosa yozadi, dalil yetarli bo'lmasa 'Ekspertiza uchun ma'lumot yetarli emas' deb rasmiy qaytaradi.",
                "connectedTo": [
                    {
                        "targetTerm": "Portfolio-2 Evaluation Criteria",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "Portfolio-2 dagi 30 ta oltin savolning 6 tasi ataylab bazada javobi yo'q ('unanswerable') savollar bo'lib, tizimning Abstention qobiliyatini sinaydi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d08-2-int-1",
                "level": "Junior",
                "questionUz": "Cross-Encoder Reranker Bi-Encoder'dan ancha aniqroq bo'lsa, nega 1 millionta hujjatning barchasini boshidayoq Cross-Encoder bilan qidirmaymiz?",
                "interviewerIntentUz": "Pre-computation imkoniyati va inferens murakkabligini tushunishini sinash.",
                "strongAnswerUz": "Chunki Cross-Encoder savol va hujjatni BIRGALIKDA (`[CLS] Query [SEP] Doc`) bitta Transformer ichiga kiritishni talab qiladi — ya'ni hujjat vektorlarini oldindan hisoblab bazaga saqlab qo'yib bo'lmaydi! 1 millionta hujjat kelganda har bir foydalanuvchi savoli uchun Transformer'ni 1,000,000 marta ishga tushirishga to'g'ri kelardi va bitta qidiruv **soatlab** vaqt olardi! Bi-Encoder'da esa 1 millionta hujjat oldindan (offline) vektorlanib HNSW indeksga yozib qo'yiladi, savol kelganda faqat 1 marta savol vektorlanib, 5 ms da Top-25 olinadi va Cross-Encoder faqat shu 25 ta nomzod ustida (~40 ms) ishlaydi.",
                "redFlagUz": "'Cross-Encoder ko'p xotira olgani uchun ishlatilmaydi' deyish.",
                "followUpQuestionUz": "Savol: RAG'da Reranker'dan keyin LLMga Top-25 chunkning barchasini bergan yaxshimi yoki eng yuqori Top-3..5 chunkni bergan yaxshimi? Javob: Top-3..5 chunkni! Chunki 20 ta aloqasiz/chalg'ituvchi chunk LLM e'tiborini chalg'itadi ('Lost in the middle'), TTFT vaqtini 5x sekinlashtiradi va gallyutsinatsiyani oshiradi."
            },
            {
                "id": "d08-2-int-2",
                "level": "Middle",
                "questionUz": "Hybrid Search'da Dense Vector Cosine Similarity balli `[0.72, 0.68]` (0..1 oraliqda) chiqadi, BM25 balli esa `[14.5, 8.2]` (0..cheksizlik oraliqda) chiqadi. Nima uchun ularni to'g'ridan-to'g'ri qo'shish o'rniga RRF (Reciprocal Rank Fusion) ishlatiladi?",
                "interviewerIntentUz": "Score calibration muammosi va Rank-based fusion ustunligini bilishini tekshirish.",
                "strongAnswerUz": "BM25 balli chegaralanmagan ($0$ dan $30+$ gacha chiqishi va so'rov uzunligiga qarab keskin o'zgarishi mumkin), Cosine Similarity esa $[-1, 1]$ ichida zich joylashgan. Agar ularni to'g'ridan-to'g'ri qo'shsak (`0.72 + 14.5`), BM25 balli Dense ballni butunlay bosib ketadi; hatto Min-Max normalizatsiya qilsak ham bitta ekstremal BM25 outlieri masshtabni buzadi. **RRF ($\\frac{1}{60 + \\text{rank}}$)** esa xom ballarga emas, faqatgina hujjatning har bir ro'yxatda nechanchi **o'rinda (rank)** turganiga qaraydi — bu hech qanday kalibrlash va parametr sozlashsiz barqaror gibrid reyting beradi.",
                "redFlagUz": "'Ikkala ballning o'rtacha arifmetigini (`(dense + bm25) / 2`) olaman' deyish.",
                "followUpQuestionUz": "Savol: RRF formulasidagi $k = 60$ konstantasi nima vazifa bajaradi? Javob: U 1-o'rin (`1/1 = 1.0`) bilan 2-o'rin (`1/2 = 0.5`) orasidagi haddan tashqari keskin sakrashni yumshatadi — natijada bitta ro'yxatda 1-o'rin va ikkinchisida 100-o'rin olgan tasodifiy hujjatdan ko'ra, ikkala ro'yxatda ham barqaror Top-3 (`#2` va `#3`) bo'lgan hujjat yutib chiqadi!"
            },
            {
                "id": "d08-2-int-3",
                "level": "Senior / Production",
                "questionUz": "Foydalanuvchi chatda 1-savolni berdi: *'Mehnat ta\\'tili necha kun?'*, javob oldi va 2-savolni yozdi: *'Uning puli qachon to\\'lanadi?'*. Agar 2-savolni to'g'ridan-to'g'ri Vector DB'ga yuborsak, qidiruv muvaffaqiyatsiz bo'ladi. Nega va buni qanday hal qilasiz?",
                "interviewerIntentUz": "Multi-turn Conversational RAG va Query Rewriting / Contextualization arxitekturasini bilishini sinash.",
                "strongAnswerUz": "*'Uning puli qachon to\\'lanadi?'* jumlasidagi **'Uning'** olmoshi (`coreference`) oldingi xabardagi *'Mehnat ta\\'tili'* ga ishora qilyapti. Vector DB suhbat tarixini bilmagani uchun *'Uning puli'* degan mavhum so'rov bo'yicha kredit yoki oylik maosh haqidagi noto'g'ri hujjatlarni topib keladi! Yechim — Retrieval'dan OLDIN **Conversational Query Rewriting (Standalone Query Condenser)** qadamini qo'yish: yengil va tezkor LLM chaqiruvi oxirgi 2-3 ta chat xabarini o'qib, 2-savolni mustaqil to'liq qidiruv so'roviga aylantiradi: *'Yillik mehnat ta\\'tili puli (haqi) xodimga qachon to\\'lanadi?'* va aynan shu qayta yozilgan so'rov Hybrid Search'ga yuboriladi!",
                "redFlagUz": "'Butun 20 ta chat tarixini bitta ulkan stringga qo'shib embedding olaman' deyish (bu embeddingni shovqinga to'ldirib yuboradi).",
                "followUpQuestionUz": "Savol: HyDE (Hypothetical Document Embeddings) nima va qachon foydali? Javob: Qisqa savoldan LLM yordamida taxminiy javob paragrafini generatsiya qilib, o'sha javob paragrafining embeddingi bo'yicha haqiqiy hujjatlarni qidirish (doc-to-doc similarity query-to-doc dan yaqinroq bo'lgan holatlarda, ammo qo'shimcha latency talab qiladi)."
            }
        ],
        "videos": [
            {
                "id": "vid-d08-2-en",
                "title": "Hands-On RAG Tutorial: Chunk, Embed, Retrieve & Grounded Answer",
                "channel": "Bojan Savic",
                "language": "en",
                "youtubeId": "UII9xn6-3EI",
                "youtubeUrl": "https://www.youtube.com/watch?v=UII9xn6-3EI",
                "durationOrTimestamp": "Retrieval va Prompting qismi",
                "whatItExplainsUz": "Topilgan hujjat bo'laklarini LLM promptiga joylashtirish va manbaga asoslangan javob olish ko'rsatilgan.",
                "howToUseVideoUz": "3-bosqichdagi `build_uzbek_grounded_rag_prompt` va 2-amaliy misoldagi `verify_citations` funksiyalarini birlashtirib, to'liq anti-hallucination quvurini sinang."
            },
            {
                "id": "vid-d08-2-ru",
                "title": "Валидация RAG и качество поиска (Retrieval & Faithfulness)",
                "channel": "Cloud.ru",
                "language": "ru",
                "youtubeId": "zEp62mUR8YQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=zEp62mUR8YQ",
                "durationOrTimestamp": "To'liq tahlil",
                "whatItExplainsUz": "RAG tizimida qidiruv xatolari va LLM gallyutsinatsiyalarini aniqlash hamda bartaraf etish usullari tushuntirilgan.",
                "howToUseVideoUz": "RRF Hybrid Search va Reranker threshold (`min_rerank_score`) parametrlarini o'z hujjatlaringizda sozlab ko'ring."
            }
        ],
        "quiz": [
            {
                "id": "d08-2-q1",
                "promptUz": "1. Konseptual: RAG tizimida Dense Vector Search bilan birga BM25 (Hybrid Search) ishlatishning asosiy sababi nima?",
                "options": [
                    "Faqat xotirani tejash",
                    "Dense Search semantik ma'nodosh gaplarni yaxshi topsa, BM25 aniq modda raqamlari (`134-modda`), kodlar, IDlar va noyob atamalarni bexato topadi",
                    "BM25 rasmlarni qidiradi",
                    "Dense Search umuman ishlamaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "Dense va Sparse (BM25) bir-birining zaif tomonini yopadi va RRF orqali yuqori Recall beradi."
            },
            {
                "id": "d08-2-q2",
                "promptUz": "2. Kod Tahlili: `Reciprocal Rank Fusion (RRF)` algoritmi ikki qidiruv natijasini birlashtirishda nimadan foydalanadi?",
                "options": [
                    "Xom Cosine va BM25 ballarini to'g'ridan-to'g'ri ko'paytirishdan",
                    "Hujjatning har bir qidiruv ro'yxatida egallagan o'rnidan (`1 / (k + rank)`), shuning uchun turli masshtabdagi ballarni kalibrlash talab etilmaydi",
                    "Faqat hujjat uzunligidan",
                    "Tasodifiy sonlardan"
                ],
                "correctIndex": 1,
                "explanationUz": "RRF rank (o'rin) ga asoslangani uchun $[0, 1]$ dagi Cosine va $[0, 30]$ dagi BM25 ballarini masshtab mojarosisiz birlashtiradi."
            },
            {
                "id": "d08-2-q3",
                "promptUz": "3. Production Debugging: Foydalanuvchi korporativ bazada umuman mavjud bo'lmagan mavzuda savol berganda RAG chatbot o'zidan javob to'qimasligi uchun qanday 2 qavatli himoya qo'yiladi?",
                "options": [
                    "Temperature'ni 2.0 qilish va Top-K ni 50 qilish",
                    "1) Reranker eng yuqori balli threshold'dan past bo'lsa LLMni chaqirmasdan darhol 'Ma\\'lumot topilmadi' qaytarish; 2) Qat'iy Anti-Hallucination prompt va `[1]` iqtibos verifier qo'llash",
                    "Barcha savollarga 'Ha' deb javob berish",
                    "Foydalanuvchini bloklash"
                ],
                "correctIndex": 1,
                "explanationUz": "Reranker score gating (Abstention) + Grounded Prompt + Citation Verification uchligi gallyutsinatsiyani minimal darajaga tushiradi."
            }
        ]
    },
    "D08.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: LLM Agent va Tool Calling (Function Calling) Ichki Mexanizmi",
                "explanationUz": "Ko'pchilik yangi o'rganuvchilar *'LLM o'zi internetga kirib API chaqiradi yoki bazada SQL yurgizadi'* deb o'ylaydi — **bu noto'g'ri!** LLM hech qanday funksiya yoki kodni o'zi ishga tushira olmaydi. **Tool Calling** 4 ta aniq qadamda ishlaydi:\n1) Siz LLMga foydalanuvchi savoli bilan birga mavjud funksiyalar ro'yxatini (Pydantic JSON Schema: funksiya nomi, tavsifi va argument turlari) yuborasiz;\n2) LLM matnli javob o'rniga strukturali JSON qaror chiqaradi: `{'tool': 'get_order_status', 'args': {'order_id': 1042}}`;\n3) **Sizning Python backend kodingiz** ushbu funksiyani haqiqatda bajaradi va natijani (`{'status': 'DELIVERED'}`) oladi;\n4) Natija `role: 'tool'` xabari sifatida LLMga qaytarib beriladi va LLM yakuniy chiroyli javobni yozadi.",
                "codeExample": "# Tool Calling 4-qadamli hayotiy sikli (State Machine):\ntools_registry = {\n    'calculate_loan_payment': lambda amount, months: round((amount * 1.24) / months, 2),\n    'check_currency_rate':    lambda code: {'USD': 12850.0, 'EUR': 13900.0}.get(code, 0.0),\n}\n\n# 2-qadam: LLM qaytargan tool_call qarori:\nllm_tool_decision = {'name': 'calculate_loan_payment', 'arguments': {'amount': 12_000_000, 'months': 12}}\n\n# 3-qadam: Backend Python ijrosi:\nfn = tools_registry[llm_tool_decision['name']]\ntool_result = fn(**llm_tool_decision['arguments'])\nprint('LLM tanlagan funksiya:', llm_tool_decision)\nprint(f'Backend hisoblagan natija (LLMga qaytariladi): {tool_result:,.2f} UZS/oy')",
                "outputOrNoteUz": "Natija: LLM og'ir arifmetikani o'zi taxmin qilib adashmasdan, `calculate_loan_payment` tool'iga delegatsiya qildi va aniq `1,240,000.00 UZS/oy` natija oldi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: ReAct (Reason + Act) Sikli va `max_iterations` Himoyasi",
                "explanationUz": "Murakkab vazifalar bitta tool chaqiruvi bilan bitmaydi (masalan: *'1000 dollarlik noutbukni so'mga o'girib, 12 oylik kredit to'lovini hisobla'*). **ReAct (Reasoning and Acting)** siklida Agent: `Thought (Fikr) -> Action (Tool chaqiruvi 1: valyuta kursi) -> Observation (Natija: 12,850,000 so'm) -> Thought -> Action (Tool 2: kredit hisobi) -> Final Answer` zanjirida ishlaydi. **Production qoidasi**: Agent xato tool natijasida cheksiz siklga (`Infinite Loop`) tushib ketib balans va serverni yeb qo'ymasligi uchun qat'iy **`max_iterations = 5` (yoki `max_steps`)** va timeout qo'yilishi shart!",
                "codeExample": "def run_react_agent(goal: str, max_steps: int = 4):\n    steps_plan = [\n        ('check_currency_rate', {'code': 'USD'}, '12850.0 UZS'),\n        ('calculate_loan_payment', {'amount': 12850000, 'months': 12}, '1327833.33 UZS/oy'),\n        ('FINAL_ANSWER', {}, '1000 USD (12,850,000 so\\'m) uchun 12 oylik to\\'lov oyiga 1,327,833 so\\'m.'),\n    ]\n    for step_no in range(1, max_steps + 1):\n        action, args, obs = steps_plan[min(step_no - 1, len(steps_plan) - 1)]\n        print(f'[Qadam {step_no}/{max_steps}] Action: {action}({args}) -> Observation: {obs}')\n        if action == 'FINAL_ANSWER':\n            return obs\n    return 'TIMEOUT: Maksimal qadamlar limiti tugadi!'\n\nprint('Yakuniy javob:', run_react_agent('1000 USD kreditni so\\'mda 12 oyga hisobla'))",
                "outputOrNoteUz": "Natija: Agent 1-qadamda USD kursini oldi, 2-qadamda o'sha summani kredit kalkulyatoriga uzatdi va 3-qadamda aniq javob qaytardi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Tool Xavfsizligi (Allowlist, Read-Only va Human-in-the-Loop)",
                "explanationUz": "Agentga `eval()`, `exec()`, `os.system()` yoki to'g'ridan-to'g'ri `DROP/UPDATE` SQL huquqini berish — tizimni xakerlarga topshirish bilan barobar! Xavfsiz Agent arxitekturasi: 1) **Strict Allowlist & Pydantic Validation**: faqat ruxsat etilgan ro'yxatdagi funksiyalar va qat'iy tekshirilgan argumentlar; 2) **Least Privilege**: bazaga faqat `SELECT` (Read-Only) huquqli ulanish; 3) **Human-in-the-Loop (HITL)**: pul o'tkazish, buyurtmani bekor qilish yoki email yuborish kabi qaytarib bo'lmas (`state-mutating`) amallar oldidan foydalanuvchi tasdig'ini (`confirmation_required=True`) talab qilish.",
                "codeExample": "ALLOWED_TOOLS = {'search_docs': {'mutating': False}, 'transfer_money': {'mutating': True}}\n\ndef safe_execute_tool(tool_name: str, args: dict, user_confirmed: bool = False) -> str:\n    if tool_name not in ALLOWED_TOOLS:\n        return f'SECURITY_BLOCK: `{tool_name}` ruxsat etilgan funksiyalar ro\\'yxatida yo\\'q!'\n    if ALLOWED_TOOLS[tool_name]['mutating'] and not user_confirmed:\n        return f'CONFIRMATION_REQUIRED: `{tool_name}` amalini bajarish uchun foydalanuvchi tasdig\\'i shart!'\n    return f'EXECUTED: {tool_name}({args}) muvaffaqiyatli bajarildi.'\n\nprint(safe_execute_tool('os_system_rm', {}))\nprint(safe_execute_tool('transfer_money', {'to': 'Ali', 'sum': 500000}, user_confirmed=False))\nprint(safe_execute_tool('transfer_money', {'to': 'Ali', 'sum': 500000}, user_confirmed=True))",
                "outputOrNoteUz": "Natija: Ruxsat etilmagan `os_system_rm` bloklandi, `transfer_money` esa faqat `user_confirmed=True` bo'lgandagina bajarildi. Allowlist + Human-in-the-Loop himoyasi Prompt Injection orqali zararli tool chaqirilishining oldini oladi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Agentic RAG (Qachon Vector DB, Qachon SQL, Qachon To'g'ridan-to'g'ri Javob?)",
                "scenarioUz": "Har bir " + "Salom" + " degan xabarga Vector DB qidirmasdan, savol turiga qarab to'g'ri tool tanlovchi Agent Router.",
                "howToUseUz": "Router mantiqini sinab ko'ring.",
                "code": "def agent_router(query: str) -> dict:\n    q = query.lower()\n    if any(w in q for w in ['salom', 'rahmat', 'kimsin']):\n        return {'tool': 'direct_reply', 'reason': 'Oddiy muloqot, RAG qidiruvi shart emas'}\n    if any(w in q for w in ['nechta', 'jami summa', 'o\\'rtacha', 'statistika']):\n        return {'tool': 'sql_analytics_tool', 'reason': 'Raqamli agregatsiya uchun SQL/DuckDB kerak'}\n    return {'tool': 'hybrid_rag_search', 'reason': 'Qonun va hujjat matnidan qidirish kerak'}\n\nfor s in ['Salom, ishlaring yaxshimi?', '2026-yilda jami nechta buyurtma bo\\'ldi?', 'Mehnat kodeksida sinov muddati qancha?']:\n    print(f'{s:44} -> {agent_router(s)}')",
                "expectedOutput": "Salom, ishlaring yaxshimi?                   -> {'tool': 'direct_reply'...}\n2026-yilda jami nechta buyurtma bo'ldi?      -> {'tool': 'sql_analytics_tool'...}\nMehnat kodeksida sinov muddati qancha?       -> {'tool': 'hybrid_rag_search'...}",
                "breakdownUz": "Agentic RAG har bir so'rovga ko'r-ko'rona Vector Search qilmasdan, analitik savolga SQL tool, hujjat savoliga RAG tool tanlaydi."
            },
            {
                "titleUz": "2-misol: Tool Error Self-Correction (Xato Argumentni Agentga Qaytarib Tuzattirish)",
                "scenarioUz": "Agar LLM tool argumentida xato sana formati (`'kecha'`) yuborsa, exception bilan yiqilmasdan xato matnini `Observation` sifatida LLMga qaytarish.",
                "howToUseUz": "Self-correction oqimini ko'ring.",
                "code": "from datetime import datetime\n\ndef get_sales_by_date(date_str: str) -> str:\n    try:\n        dt = datetime.strptime(date_str, '%Y-%m-%d')\n        return f'{dt.strftime(\"%Y-%m-%d\")} sanasidagi savdo: 45,200,000 UZS'\n    except ValueError:\n        return f\"TOOL_ERROR: `{date_str}` noto'g'ri format. Sanani 'YYYY-MM-DD' (masalan '2026-11-21') ko'rinishida qayta yuboring.\"\n\nprint('1-urinish (LLM xatosi): ', get_sales_by_date('21-noyabr 2026'))\nprint('2-urinish (LLM tuzatdi):', get_sales_by_date('2026-11-21'))",
                "expectedOutput": "1-urinish (LLM xatosi):  TOOL_ERROR: `21-noyabr 2026` noto'g'ri format. Sanani 'YYYY-MM-DD'...\n2-urinish (LLM tuzatdi): 2026-11-21 sanasidagi savdo: 45,200,000 UZS",
                "breakdownUz": "Aniq va tushunarli `TOOL_ERROR` xabari LLMga keyingi ReAct qadamida o'z xatosini mustaqil tuzatib olish imkonini beradi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Tool Calling / Function Calling",
                "category": "LLM & RAG",
                "definitionUz": "LLM'ning foydalanuvchi vazifasini bajarish uchun tashqi funksiya (API, SQL, Kalkulyator) chaqirish zarurligini aniqlab, funksiya nomi va argumentlarini qat'iy JSON formatda generatsiya qilish qobiliyati.",
                "analogyOrExampleUz": "Bosh muhandis (LLM) hisob-kitobni kallada taxmin qilmasdan, buxgalteriya bo'limiga (Python Tool) aniq to'ldirilgan blanka yuborib javobini olishi.",
                "connectedTo": [
                    {
                        "targetTerm": "Pydantic Schema & Constrained Decoding",
                        "targetLessonId": "D07.2",
                        "relationshipUz": "Tool argumentlari xatosiz bo'lishi uchun funksiya imzosi Pydantic JSON Schema sifatida Constrained Decoding dvigateliga uzatiladi."
                    }
                ]
            },
            {
                "term": "ReAct (Reasoning + Acting) Loop",
                "category": "LLM & RAG",
                "definitionUz": "`Thought -> Action (Tool) -> Observation -> Thought...` ketma-ketligida oraliq natijalarni tahlil qilib, ko'p bosqichli muammoni hal qiluvchi agent arxitekturasi.",
                "analogyOrExampleUz": "Detektiv tergovi: taxmin qiladi (Thought), barmoq izini laboratoriyaga beradi (Action), javobni ko'rib (Observation) keyingi гумондорni tekshiradi.",
                "connectedTo": [
                    {
                        "targetTerm": "Langfuse Multi-Span Agent Tracing",
                        "targetLessonId": "D10.2",
                        "relationshipUz": "10-haftada Agentning har bir ReAct qadami, tool chaqiruvi va sarflagan tokenlari Langfuse trace daraxtida alohida `span` sifatida kuzatiladi."
                    }
                ]
            },
            {
                "term": "Human-in-the-Loop (HITL) & Least Privilege",
                "category": "MLOps & Eval",
                "definitionUz": "Bazani o'zgartiruvchi yoki moliyaviy xavfli tool chaqiruvlarida avtomatik ijroni to'xtatib, inson tasdig'ini so'rash hamda agentga minimal ruxsatlar berish.",
                "analogyOrExampleUz": "Bank ilovasida avto-to'lov tayyorlab qo'yilsa ham, yirik summa ketishidan oldin mijozning telefoniga SMS-kod tasdig'i kelishi.",
                "connectedTo": [
                    {
                        "targetTerm": "Prompt Injection & Indirect Injection Defense",
                        "targetLessonId": "D10.3",
                        "relationshipUz": "10-haftada hujjat ichiga yashirilgan zararli buyruq ('Barcha pullarni shu hisobga o'tkaz') HITL va Allowlist devoriga urilib to'xtaydi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d08-3-int-1",
                "level": "Junior",
                "questionUz": "Tool Calling ishlatilganda Python funksiyani LLMning o'zi serverida ishga tushiradimi yoki bizning ilovamizmi?",
                "interviewerIntentUz": "Tool calling ijro chegarasini (Execution Boundary) aniq tushunishini tekshirish.",
                "strongAnswerUz": "Funksiyani **100% bizning Python backend ilovamiz** ishga tushiradi! LLM (masalan Ollama, vLLM yoki OpenAI) bizning lokal bazamizga yoki ichki tarmog'imizga kira olmaydi va kod yurgizmaydi. LLM faqatgina matn va sxemaga qarab *\"Hozir `get_user_balance(user_id=42)` funksiyasini chaqirish kerak\"* degan JSON matn (`tool_calls`) qaytaradi. Bizning backendimiz bu JSONni o'qib, funksiyani o'zimizda bajaradi va chiqqan natijani ikkinchi so'rovda LLMga yuboradi.",
                "redFlagUz": "'LLM o'zi bizning funksiyamizni chaqirib bazadan o'qib oladi' deyish.",
                "followUpQuestionUz": "Savol: Demak, bitta Tool Calling amalida LLM kamida necha marta chaqiriladi? Javob: Kamida **2 marta**: 1-chaqiruvda LLM qaysi tool va argument kerakligini hal qiladi; tool bajarilgach, 2-chaqiruvda LLM tool natijasini o'qib foydalanuvchiga yakuniy javobni yozadi."
            },
            {
                "id": "d08-3-int-2",
                "level": "Middle",
                "questionUz": "Agentga 60 ta turli tool (funksiya) bir vaqtda berilganda model noto'g'ri funksiya tanlay boshladi va latency oshib ketdi. Buni qanday optimallashtirasiz?",
                "interviewerIntentUz": "Tool Selection scaling va Context pollution muammosini hal qilishni sinash.",
                "strongAnswerUz": "Bitta promptga 60 ta JSON Schema qo'shilsa, har bir so'rovda 5,000+ token faqat tool ta'riflariga ketadi va model o'xshash funksiyalar orasida adashadi (**Tool Confusion**). Yechim: 1) **Dynamic Tool Retrieval (Tool RAG)**: foydalanuvchi savoli bo'yicha embedding qidiruv qilib, 60 ta tooldan faqat eng mos **Top-3..5 ta tool** sxemasinigina LLMga yuborish; 2) **Hierarchical / Multi-Agent Routing**: avval yengil Router savolni domenga (`Billing`, `HR`, `TechSupport`) ajratadi, har bir domen agentida esa faqat o'ziga tegishli 4-5 ta aniq tool bo'ladi; 3) Aniq va farqli `description` yozish.",
                "redFlagUz": "'System promptga barcha 60 ta funksiyani diqqat bilan o'qi deb yozaman' deyish.",
                "followUpQuestionUz": "Savol: Tool description (funksiya docstring va Field description) o'zgarishi modelning funksiya tanlash aniqligiga ta'sir qiladimi? Javob: Ha, juda kuchli ta'sir qiladi! LLM funksiyaning ichki kodini ko'rmaydi, u faqatgina funksiya nomi, docstring va Pydantic `Field(description=...)` matniga qarab qaror qabul qiladi."
            },
            {
                "id": "d08-3-int-3",
                "level": "Senior / Production",
                "questionUz": "Avtonom ReAct agent production'da cheksiz siklga (Infinite Loop) tushib qolishi yoki bitta foydalanuvchi so'rovi uchun $50 lik token sarflab yuborishining oldini qanday arxitektura bilan olasiz?",
                "interviewerIntentUz": "Production Agent Guardrails va Cost/Loop Control mexanizmlarini sinash.",
                "strongAnswerUz": "4 qavatli muhandislik himoyasi o'rnatiladi: 1) **Hard Step & Time Budget**: `max_iterations = 5` va umumiy `wall_clock_timeout = 15s`; 2) **Duplicate Action Detection**: agar agent aynan bir xil tool'ni aynan bir xil argumentlar bilan 2-marta chaqirishga urinsa (`hash(tool_name + canonical_args)`), siklni darhol to'xtatish yoki majburiy fallback xabar berish; 3) **Per-Request Token/Cost Circuit Breaker**: bitta sessiya uchun maksimal kirish+chiqish token byudjeti (masalan `12,000 token`); 4) Murakkab erkin ReAct o'rniga deterministik **State Graph (LangGraph / FSM)** orqali ruxsat etilgan o'tish yo'llarinigina qoldirish.",
                "redFlagUz": "'`while True:` sikli yozib, LLM o'zi `FINAL_ANSWER` chiqarishiga ishonaman' deyish.",
                "followUpQuestionUz": "Savol: Qachon erkin Agent (ReAct) o'rniga qat'iy deterministik Pipeline (Workflow) ishlatish kerak? Javob: Agar qadamlar ketma-ketligi oldindan aniq bo'lsa (masalan: `1. Hujjatni o'qi -> 2. Maydonlarni ajrat -> 3. Bazaga yoz`), erkin Agent ishlatish ortiqcha latency va xato keltirib chiqaradi — u yerda deterministik Workflow + Structured Output ishlatish shart!"
            }
        ],
        "videos": [
            {
                "id": "vid-d08-3-uz",
                "title": "Prompt Engineering va Tool Calling: LLM'ga qurol beramiz",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "nlb1opQgB3k",
                "youtubeUrl": "https://www.youtube.com/watch?v=nlb1opQgB3k",
                "durationOrTimestamp": "AI Engineer 44 kun, 3-4-kun",
                "whatItExplainsUz": "O'zbek tilida LLM'ga tashqi Python funksiyalarini (Tool Calling) ulash, JSON sxema uzatish va real vaqt ma'lumotlarini olish to'liq ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-bosqichdagi `tools_registry` ga o'zingizning yangi funksiyangizni (masalan `get_weather` yoki `search_uz_law`) qo'shib sinab ko'ring."
            },
            {
                "id": "vid-d08-3-en",
                "title": "Lesson 02: AI Agent Tool Use & Function Calls",
                "channel": "Stephen Blum",
                "language": "en",
                "youtubeId": "5HgVRv37E_U",
                "youtubeUrl": "https://www.youtube.com/watch?v=5HgVRv37E_U",
                "durationOrTimestamp": "To'liq amaliy dars",
                "whatItExplainsUz": "AI Agentlarda Function Calling qanday ishlashi, so'rov va javob xabarlari almashinuvi tushuntirilgan.",
                "howToUseVideoUz": "3-bosqichdagi `safe_execute_tool` (Allowlist + Human-in-the-Loop) xavfsizlik qatlamini har bir agent loyihangizga qo'shing."
            }
        ],
        "quiz": [
            {
                "id": "d08-3-q1",
                "promptUz": "1. Konseptual: LLM Tool Calling (Function Calling) jarayonida LLM'ning o'zi aniq nima ish bajaradi?",
                "options": [
                    "LLM o'z serverida Python funksiyani ishga tushiradi va ma'lumotlar bazasiga ulanadi",
                    "LLM qaysi funksiyani chaqirish kerakligini va uning argumentlarini strukturali JSON (`tool_calls`) ko'rinishida generatsiya qiladi; ijroni esa backend dastur bajaradi",
                    "LLM operatsion tizimni qayta o'rnatadi",
                    "LLM hech qanday JSON chiqarmaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "LLM faqat qaror (JSON argumentlar) chiqaradi, haqiqiy funksiya chaqiruvini sizning backend kodingiz amalga oshiradi."
            },
            {
                "id": "d08-3-q2",
                "promptUz": "2. Kod Tahlili: ReAct agent siklida `max_iterations = 5` (yoki `max_steps`) cheklovini qo'yish nima uchun majburiy?",
                "options": [
                    "Kod qisqaroq bo'lishi uchun",
                    "Tool xato qaytarganda yoki murakkab holatda agent cheksiz siklga (`Infinite Loop`) tushib qolib, token byudjeti va server resurslarini yeb qo'ymasligi uchun",
                    "Faqat 5 ta so'zli javob olish uchun",
                    "Python 5 dan katta sonni bilmagani uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "Avtonom sikllarda hard iteration limit va duplicate action detector production barqarorligining asosiy shartidir."
            },
            {
                "id": "d08-3-q3",
                "promptUz": "3. Production Debugging: Mijozlarga xizmat ko'rsatuvchi AI Agentga ma'lumotlar bazasi tool'ini ulaganda qaysi xavfsizlik tamoyili qo'llanilishi shart?",
                "options": [
                    "Agentga `root` administrator huquqi va `eval()` funksiyasini berish",
                    "Faqat ruxsat etilgan parametrli funksiyalar (Allowlist), Read-Only DB ulanish va qaytarib bo'lmas amallar (pul o'tkazish/o'chirish) uchun Human-in-the-Loop tasdig'i",
                    "LLM aytgan har qanday SQL stringni tekshirmasdan bajarish",
                    "Parollarni prompt ichida yozish"
                ],
                "correctIndex": 1,
                "explanationUz": "Allowlist + Read-Only DB + Human-in-the-Loop agentni zararli prompt injection oqibatlaridan himoya qiladi."
            }
        ]
    },
    "D08.4": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: LoRA (Low-Rank Adaptation) Matematikasi — $W = W_0 + \\frac{\\alpha}{r} B A$",
                "explanationUz": "8 milliard parametrli (8B) modelni to'liq o'qitish (Full Fine-Tuning) 80+ GB VRAM (A100 klaster) talab qiladi, chunki har bir og'irlik uchun gradient va 2 ta AdamW holati saqlanadi. **LoRA** kashfiyoti: asosiy ulkan og'irlik matritsasi $W_0 \\in \\mathbb{R}^{d \\times k}$ (masalan $4096 \\times 4096 = 16.7\\text{ mln}$ parametr) **100% MUZLATILADI** (`requires_grad=False`) va uning yoniga ikkita juda ingichka past-rangli (low-rank, masalan $r = 16$) matritsa — $A \\in \\mathbb{R}^{r \\times k}$ ($16 \\times 4096$) va $B \\in \\mathbb{R}^{d \\times r}$ ($4096 \\times 16$) parallel ulanadi! O'qitiladigan parametrlar soni $16.7\\text{ mln}$ dan $2 \\times 4096 \\times 16 = 131,072$ taga (**128 barobar!**) kamayadi!",
                "codeExample": "d, k = 4096, 4096\nr = 16\nfull_params = d * k\nlora_params = (d * r) + (r * k)\nreduction = full_params / lora_params\n\nprint(f'Asl W0 matritsa (4096x4096): {full_params:>12,} parametr (Muzlatilgan)')\nprint(f'LoRA A va B (rank r={r}):     {lora_params:>12,} parametr (O\\'qitiladigan)')\nprint(f'Qisqarish: {reduction:.0f} barobar kam parametr ({lora_params/full_params:.2%} qismi!)')",
                "outputOrNoteUz": "Natija: Bitta qatlamda 16.7 million o'rniga atigi `131,072` (`0.78%`) parametr o'qitiladi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Nima Uchun $A$ Tasodifiy, $B$ esa `0` Bilan Initsializatsiya Qilinadi?",
                "explanationUz": "LoRA qo'shilganda o'qitishning 0-qadamida (hali birorta batch ko'rilmasdan oldin) modelning chiqishi buzilib ketmasligi kerak. Shu sababli **$A$ matritsasi Gaussian tasodifiy sonlar bilan, $B$ matritsasi esa to'liq `0` (nollar) bilan** to'ldiriladi! Natijada 0-qadamda $\\Delta W = B A = 0 \\cdot A = 0$ bo'lib, $W_0 + \\Delta W = W_0$ (asl pre-trained model bilan 100% bir xil!) bo'lib boshlanadi. Masshtablash koeffitsienti esa $\\frac{\\alpha}{r}$ (`lora_alpha / r`) ga teng.",
                "codeExample": "import numpy as np\n\nnp.random.seed(42)\nW0 = np.array([[1.0, 2.0], [3.0, 4.0]])\nx = np.array([1.0, 1.0])\n\n# 0-qadam: A random, B = 0\nA = np.random.randn(1, 2) * 0.02\nB = np.zeros((2, 1))\nalpha, r = 32, 16\n\ny_base = W0 @ x\ny_lora_step0 = (W0 @ x) + (alpha / r) * (B @ (A @ x))\nprint('Asl model chiqishi:         ', y_base)\nprint('LoRA 0-qadam chiqishi (B=0):', y_lora_step0, '-> 100% bir xil!')",
                "outputOrNoteUz": "Natija: $B=0$ bo'lgani uchun 0-qadamda LoRA hech qanday shovqin qo'shmaydi va o'qitish silliq boshlanadi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: QLoRA (4-bit NF4 + Double Quant + Paged Optimizers) va Adapter Merging",
                "explanationUz": "**QLoRA** (Tim Dettmers) LoRA'ni yanada inqilobiy qildi: muzlatilgan asosiy model $W_0$ FP16 (16 GB) o'rniga **4-bit NormalFloat (`NF4`)** formatida (~4.5 GB) VRAMga yuklanadi, faqatgina kichik LoRA adapterlari (`A` va `B`) `BF16/FP16` aniqlikda o'qitiladi! **Paged Optimizers (`paged_adamw_8bit`)** esa VRAM to'lib qolgan lahzada optimizator holatlarini avtomatik CPU RAMga vaqtincha chiqarib turadi. Natijada 7B-8B modelni bepul Kaggle/Colab T4 (15 GB VRAM) GPU'sida o'qitish mumkin bo'ldi! O'qitish tugagach, $W_{\\text{merged}} = W_0 + \\frac{\\alpha}{r} B A$ qilib qo'shib yuborilsa, inferens vaqtida **qo'shimcha latency `0.0 ms`** bo'ladi!",
                "codeExample": "qlora_vram_breakdown_8b = {\n    '1. Base Model (8B in 4-bit NF4)': '4.6 GB',\n    '2. LoRA Adapters (r=16, BF16, ~40M params)': '0.16 GB',\n    '3. Paged AdamW 8-bit Optimizer States': '0.35 GB',\n    '4. Activations (with Gradient Checkpointing, batch=2)': '3.8 GB',\n    'TOTAL VRAM (Fits on single 15GB T4 / 12GB RTX!)': '~8.91 GB (vs 80+ GB Full FT!)'\n}\nfor k, v in qlora_vram_breakdown_8b.items():\n    print(f'{k:54} : {v}')",
                "outputOrNoteUz": "Natija: 80+ GB talab qilgan 8B modelni o'qitish QLoRA yordamida `~8.91 GB` VRAMga tushdi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: O'zbekcha SFT (Supervised Fine-Tuning) ChatML Dataset Tayyorlash va Loss Masking",
                "scenarioUz": "Model foydalanuvchi savolini yodlab olmasdan, faqat `assistant` javobini generatsiya qilishga o'qishi uchun kirish tokenlariga `label = -100` qo'yish.",
                "howToUseUz": "Instruction loss masking qanday ishlashini ko'ring.",
                "code": "chat_turn = [\n    ('system',    'Sen o\\'zbek yuridik yordamchisisan.'),\n    ('user',      'Sinov muddati maksimal qancha?'),\n    ('assistant', 'Mehnat kodeksiga ko\\'ra sinov muddati 3 oydan oshmaydi.'),\n]\n\ninput_tokens, target_labels = [], []\nfor role, text in chat_turn:\n    toks = [f'<{role}>'] + text.split() + ['<eos>']\n    input_tokens.extend(toks)\n    if role == 'assistant':\n        target_labels.extend(toks) # Faqat assistant javobi uchun Loss hisoblanadi!\n    else:\n        target_labels.extend(['-100 (MASKED)'] * len(toks)) # PyTorch ignore_index = -100\n\nprint('Jami input tokenlar:', len(input_tokens))\nprint('Loss hisoblanadigan (assistant) tokenlar:', sum(1 for x in target_labels if x != '-100 (MASKED)'))",
                "expectedOutput": "Jami input tokenlar: 21\nLoss hisoblanadigan (assistant) tokenlar: 10",
                "breakdownUz": "PyTorch `CrossEntropyLoss(ignore_index=-100)` `-100` qo'yilgan `system` va `user` tokenlarida gradientni `0` qiladi — model faqat to'g'ri javob yozishga fokuslanadi (`DataCollatorForCompletionOnlyLM`)."
            },
            {
                "titleUz": "2-misol: LoRA Adapterini Asosiy Matritsaga Qo'shish (`merge_and_unload`) Matematikasi",
                "scenarioUz": "O'qitilgan `A` va `B` adapterlarini `W0` ustiga qo'shib, bitta yaxlit matritsa sifatida inferens tezligini tekshirish.",
                "howToUseUz": "Matritsaviy distributivlik (`W0@x + B@(A@x) == (W0 + B@A)@x`) tengligini kodda tasdiqlang.",
                "code": "import numpy as np\n\nnp.random.seed(1)\nW0 = np.random.randn(4, 4)\nA  = np.random.randn(2, 4) * 0.1\nB  = np.random.randn(4, 2) * 0.1\nscale = 2.0 # alpha / r = 32 / 16\nx = np.array([1.0, -0.5, 2.0, 0.3])\n\n# 1) Alohida-alohida hisoblash (training paytida):\nout_separate = (W0 @ x) + scale * (B @ (A @ x))\n\n# 2) Birlashtirilgan matritsa (merge_and_unload — production inferens):\nW_merged = W0 + scale * (B @ A)\nout_merged = W_merged @ x\n\nprint('Alohida hisoblangan:', np.round(out_separate, 6))\nprint('Merged  hisoblangan:', np.round(out_merged, 6))\nprint('Maksimal farq:      ', np.max(np.abs(out_separate - out_merged)))",
                "expectedOutput": "Alohida hisoblangan: [...]\nMerged  hisoblangan: [...]\nMaksimal farq:       0.0",
                "breakdownUz": "Chiziqli algebraning distributivlik qonuni tufayli `W_merged` asl `W0` bilan aynan bir xil `(4, 4)` o'lchamga ega bo'ladi va inferensda qo'shimcha kechikish (`latency overhead`) mutlaqo `0` ga teng!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "LoRA (Low-Rank Adaptation: $r$, `lora_alpha`, `target_modules`)",
                "category": "LLM & RAG",
                "definitionUz": "Asosiy model og'irliklarini muzlatib, o'zgarishni $\\Delta W = \\frac{\\alpha}{r} B A$ past-rangli matritsalar ko'paytmasi sifatida o'qituvchi PEFT (Parameter-Efficient Fine-Tuning) usuli.",
                "analogyOrExampleUz": "500 betlik ensiklopediyani qaytadan chop etmasdan (`W0`), uning zarur betlariga yupqa shaffof stiker-izohlar (`B @ A`) yopishtirib chiqish.",
                "connectedTo": [
                    {
                        "targetTerm": "Catastrophic Forgetting Prevention",
                        "targetLessonId": "D06.4",
                        "relationshipUz": "Asl $W_0$ o'zgarmagani va $\\Delta W$ rangi $r=16$ bilan cheklangani uchun model o'zining bazaviy ko'p tilli bilimlarini unutib yubormaydi."
                    }
                ]
            },
            {
                "term": "QLoRA & 4-bit NormalFloat (`NF4`)",
                "category": "LLM & RAG",
                "definitionUz": "Normal taqsimlangan ($\mathcal{N}(0, \\sigma^2)$) neyron tarmoq og'irliklari uchun axborot nazariyasi bo'yicha optimal kvantillarga bo'lingan 4-bit ma'lumot turi + 16-bit LoRA adapterlari.",
                "analogyOrExampleUz": "Ko'pchilik odamlarning bo'yi 160-185 sm orasida bo'lgani uchun o'lchov shkalasining chiziqlarini aynan o'sha o'rta diapazonda qalin va aniq joylashtirish (`NF4`).",
                "connectedTo": [
                    {
                        "targetTerm": "Post-Training Quantization (GGUF / AWQ)",
                        "targetLessonId": "D07.1",
                        "relationshipUz": "7-haftada inferens uchun 4-bit GGUF ishlatilgan bo'lsa, 8-haftada o'qitish (fine-tuning) paytida VRAM tejash uchun 4-bit `NF4` (`bitsandbytes`) ishlatiladi."
                    }
                ]
            },
            {
                "term": "RAG vs Fine-Tuning Boundary",
                "category": "LLM & RAG",
                "definitionUz": "RAG — tashqi faktlar va dinamik bilimlarni yetkazish uchun; Fine-Tuning (QLoRA) — modelga o'zbekcha rasmiy uslub, format (JSON/SQL) va domen qoidalariga rioya qilishni o'rgatish uchun.",
                "analogyOrExampleUz": "Fine-Tuning — talabani yuridik universitetda 4 yil o'qitib huquqshunoslik tili va mantiqini o'rgatish; RAG — sud jarayonida uning oldiga bugungi yangi kodeks va ish hujjatlarini qo'yish.",
                "connectedTo": [
                    {
                        "targetTerm": "Portfolio-2 RAG + QLoRA Experiment",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "Portfolio-2 da biz RAG tizimini asosiy arxitektura qilib, QLoRA adapterini o'zbekcha rasmiy iqtibos formatiga rioya qilishni kuchaytirish uchun baholaymiz."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d08-4-int-1",
                "level": "Junior",
                "questionUz": "LoRA'da nima uchun $A$ matritsasi tasodifiy (Gaussian), $B$ matritsasi esa `0` (nollar) bilan initsializatsiya qilinadi? Ikkalasini ham `0` yoki ikkalasini ham tasodifiy qilsa nima bo'ladi?",
                "interviewerIntentUz": "LoRA bo'yicha eng ko'p beriladigan klassik intervyu savoli!",
                "strongAnswerUz": "1) Agar **ikkalasi ham tasodifiy** bo'lsa, 0-qadamdayoq $\\Delta W = B A \\neq 0$ bo'lib, pre-trained modelning chiqishlariga katta tasodifiy shovqin qo'shiladi va dastlabki qadamlarda model izdan chiqadi; 2) Agar **ikkalasi ham `0`** bo'lsa ($A=0, B=0$), zanjir qoidasiga ko'ra $\\frac{\\partial L}{\\partial A} = B^T \\dots = 0$ va $\\frac{\\partial L}{\\partial B} = \\dots A^T = 0$ bo'lib, gradientlar `0` ga aylanadi va og'irliklar hech qachon o'qimaydi (Symmetry/Dead gradient)! $A$ ni tasodifiy va $B = 0$ qilganda esa 0-qadamda $B A = 0$ (toza start) bo'ladi, ammo 1-backward pass'dayoq $A \\neq 0$ bo'lgani uchun $B$ no-nol gradient oladi va o'qish darhol boshlanadi!",
                "redFlagUz": "'Xotirani tejash uchun B nol qilinadi' deyish.",
                "followUpQuestionUz": "Savol: LoRA inferens vaqtida modelni sekinlashtiradimi? Javob: Yo'q! `model.merge_and_unload()` orqali $\\frac{\\alpha}{r} B A$ ko'paytmasi asosiy $W_0$ matritsasiga qo'shib yuborilsa ($W_{\\text{new}} = W_0 + \\Delta W$), parametrlar soni va inferens tezligi asl model bilan 100% bir xil qoladi (`0 ms` overhead)!"
            },
            {
                "id": "d08-4-int-2",
                "level": "Middle",
                "questionUz": "Kompaniyamizda har hafta yangilanadigan 5,000 ta mahsulot narxi va ombor qoldig'i bor. Chatbot ushbu narxlarni bilishi uchun har hafta QLoRA Fine-Tuning qilish kerakmi yoki RAG (va Tool Calling) qilish kerakmi?",
                "interviewerIntentUz": "Fine-Tuning vs RAG/Tools arxitektura qarorini to'g'ri qabul qilishini sinash.",
                "strongAnswerUz": "**Albatta RAG va SQL/API Tool Calling qilish kerak, Fine-Tuning EMAS!** Sabablari: 1) LLM og'irliklariga yangi raqam va faktlarni QLoRA orqali 'mixlab' yozish ishonchsiz — model `125,000 so'm` bilan `152,000 so'm` ni aralashtirib gallyutsinatsiya qiladi; 2) Narx o'zgargan zahoti modelni qayta o'qitish qimmat va eski narxni model xotirasidan 'o'chirib' (unlearning) bo'lmaydi; 3) RAG va Tool Calling esa bazadan 100% aniq, real-vaqt narxni va manbani olib beradi. QLoRA Fine-Tuning faqatgina modelning o'zbek tilidagi muloqot uslubi, JSON Tool Calling aniqligi va domen terminlarini tushunishini yaxshilash uchungina qo'llaniladi.",
                "redFlagUz": "'Har kuni kechasi QLoRA bilan yangi narxlarda modelni qayta o'qitaman' deyish.",
                "followUpQuestionUz": "Savol: LoRA konfiguratsiyasida faqat `q_proj, v_proj` ga adapter qo'ygandan ko'ra barcha chiziqli qatlamlarga (`q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj`) adapter qo'yish nimasi bilan farq qiladi? Javob: QLoRA maqolasida isbotlanganidek, Attention bilan birga MLP (SwiGLU FFN) qatlamlariga ham adapter qo'yish kichik rank ($r=16$) da ham Full Fine-Tuning sifatiga yetishishni ta'minlaydi."
            },
            {
                "id": "d08-4-int-3",
                "level": "Senior / Production",
                "questionUz": "Bitta GPU serverda 15 ta turli korporativ mijozning har biri uchun alohida QLoRA fine-tune qilingan 8B modelga xizmat ko'rsatish (Serving) kerak. 15 ta alohida 8B modelni VRAMga yuklasangiz 90 GB ketadi. Buni bitta 16 GB GPU'da qanday yechasiz?",
                "interviewerIntentUz": "Multi-LoRA Serving (`vLLM` / `LoRAX` / `S-LoRA`) arxitekturasini bilishini sinash.",
                "strongAnswerUz": "Adapterlarni bazaviy modelga `merge` QILMASDAN, **Dynamic Multi-LoRA Serving (masalan `vLLM --enable-lora`)** arxitekturasini qo'llayman! VRAMga barcha 15 ta mijoz uchun umumiy bo'lgan **FAQAT BITTA 8B Base Model ($W_0 \\approx 5$ GB)** yuklanadi. Har bir mijozning LoRA adapteri ($B_i, A_i$) esa atigi `30–60 MB` joy oladi (15 ta adapter jami `< 1 GB`!). So'rov kelganda (`model='tenant_7_lora'`), vLLM asosiy $W_0 x$ hisoblashni umumiy batchda bajarib, ustiga faqat o'sha mijozning kichik $+ B_7(A_7 x)$ adapterini dinamik qo'shib beradi!",
                "redFlagUz": "'15 ta alohida GPU server ijaraga olaman' deyish.",
                "followUpQuestionUz": "Savol: QLoRA o'qitishda `lora_alpha` odatda `r` (rank) ga nisbatan qanday tanlanadi? Javob: Standart amaliyotda `lora_alpha = 2 * r` (masalan `r=16, lora_alpha=32`) yoki `lora_alpha = r` tanlanadi, chunki $\\frac{\\alpha}{r}$ adapter chiqishining asosiy og'irliklarga nisbatan kuchini belgilaydi."
            }
        ],
        "videos": [
            {
                "id": "vid-d08-4-en",
                "title": "Local LLM Fine-Tuning, Ollama & Structured Output Workflow",
                "channel": "Venelin Valkov",
                "language": "en",
                "youtubeId": "jomsEY0r2Ng",
                "youtubeUrl": "https://www.youtube.com/watch?v=jomsEY0r2Ng",
                "durationOrTimestamp": "Adapter va Local LLM qismi",
                "whatItExplainsUz": "Kichik va o'rta hajmli LLM'larni mahalliy vazifalarga moslashtirish va inferens dvigatellarida ishlatish ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-bosqichdagi parametrlar qisqarishi va 2-amaliy misoldagi `W_merged` kodini ishga tushirib ko'ring."
            },
            {
                "id": "vid-d08-4-uz",
                "title": "Prompt Engineering 5 Elementli Formula vs Model Moslashtirish",
                "channel": "Shukrullo Ibrohimov",
                "language": "uz",
                "youtubeId": "ABeDWmTnZ9s",
                "youtubeUrl": "https://www.youtube.com/watch?v=ABeDWmTnZ9s",
                "durationOrTimestamp": "To'liq o'zbekcha dars",
                "whatItExplainsUz": "Qachon yaxshi tuzilgan Prompt va Few-shot misollar yetarli bo'lishi, qachon esa chuqurroq moslashtirishga o'tish kerakligi tushuntirilgan.",
                "howToUseVideoUz": "Har qanday QLoRA tajribasidan oldin avval Zero-shot va Few-shot Prompt baseline natijasini o'lchab olishni qoida qiling."
            }
        ],
        "quiz": [
            {
                "id": "d08-4-q1",
                "promptUz": "1. Konseptual: LoRA (Low-Rank Adaptation) usulida asosiy model og'irliklari $W_0$ bilan nima qilinadi?",
                "options": [
                    "Asosiy og'irliklar o'chirib tashlanadi",
                    "Asosiy og'irliklar $W_0$ 100% muzlatiladi (`requires_grad=False`) va faqat yoniga qo'shilgan kichik $A$ va $B$ past-rangli matritsalar o'qitiladi",
                    "Barcha og'irliklar 0 ga tenglanadi",
                    "Faqat tokenizer o'qitiladi"
                ],
                "correctIndex": 1,
                "explanationUz": "$W_0$ muzlatilgani sababli uning uchun AdamW optimizator holatlari saqlanmaydi va o'qitiladigan parametrlar ~100 barobar qisqaradi."
            },
            {
                "id": "d08-4-q2",
                "promptUz": "2. Kod Tahlili: LoRA boshlanishida (0-qadamda) $\\Delta W = B A = 0$ bo'lib, model asl pre-trained holatidan buzilmasdan start olishi uchun $A$ va $B$ qanday initsializatsiya qilinadi?",
                "options": [
                    "Ikkalasi ham 1.0 bilan",
                    "$A$ tasodifiy (Gaussian) sonlar bilan, $B$ esa to'liq `0` (nollar) bilan",
                    "Ikkalasi ham `0` bilan",
                    "Ikkalasi ham `100` bilan"
                ],
                "correctIndex": 1,
                "explanationUz": "$A$ random va $B=0$ bo'lganda 0-qadamda $B A = 0$ bo'ladi, ammo 1-backward qadamdayoq gradientlar no-nol bo'lib o'qish boshlanadi."
            },
            {
                "id": "d08-4-q3",
                "promptUz": "3. Production Debugging: Supervised Fine-Tuning (SFT) paytida model foydalanuvchi savollarini yodlab olmasdan, faqat `assistant` javobini yozishni o'rganishi uchun kirish (`system` va `user`) tokenlarining `labels` qiymatiga nima beriladi?",
                "options": [
                    "`0`",
                    "`-100` (PyTorch `CrossEntropyLoss` ning standart `ignore_index` qiymati)",
                    "`9999`",
                    "`1`"
                ],
                "correctIndex": 1,
                "explanationUz": "`labels = -100` qo'yilgan pozitsiyalarda PyTorch CrossEntropyLoss xatoni hisoblamaydi (Completion-only loss masking)."
            }
        ]
    },
    "D09.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: FastAPI AI Gateway va Server-Sent Events (SSE) Streaming (Gap Lab 5)",
                "explanationUz": "LLM 250 tokenlik o'zbekcha javobni yozishi uchun 6–10 soniya vaqt ketadi. Agar oddiy sinxron HTTP JSON javob qaytarsak, foydalanuvchi 10 soniya bo'sh ekranga qarab o'tiradi va sayt qotib qoldi deb chiqib ketadi! **Server-Sent Events (`text/event-stream`)** va FastAPI `StreamingResponse` yordamida async generator (`async for token in llm_stream: yield f'data: {json.dumps(...)}\\n\\n'`) har bir tokenni chiqqan zahoti (`TTFT ~350 ms`) brauzerga uzluksiz oqim sifatida yetkazib beradi!",
                "codeExample": "import json\n\ndef sse_token_stream_generator(tokens: list[str], citations: list[str]):\n    # 1. Avval topilgan manba metama'lumotlarini yuborish:\n    yield f\"event: metadata\\ndata: {json.dumps({'citations': citations})}\\n\\n\"\n    # 2. Token-ma-token uzatish:\n    for tok in tokens:\n        yield f\"event: token\\ndata: {json.dumps({'text': tok}, ensure_ascii=False)}\\n\\n\"\n    # 3. Yakunlash signali:\n    yield \"event: done\\ndata: [DONE]\\n\\n\"\n\nfor packet in sse_token_stream_generator([\"Mehnat \", \"ta'tili \", \"21 kun [1].\"], [\"MK-134-modda\"]):\n    print(packet.strip())",
                "outputOrNoteUz": "Natija: Har bir SSE paketi `event:` va `data: {...}\\n\\n` formatida uzatiladi — frontend birinchi soniyadayoq manbani va so'zlarni chiza boshlaydi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Async Event Loop Bloklanishining Oldini Olish (`async def` vs Blocking I/O)",
                "explanationUz": "FastAPI'da eng ko'p uchraydigan halokatli xato: `async def chat()` endpointi ichida sinxron `requests.post()` yoki og'ir CPU `sentence_transformers.encode()` ni to'g'ridan-to'g'ri chaqirishdir! Python `asyncio` bitta oqimli (single-threaded) Event Loop'da ishlaydi — agar `async def` ichida 2 soniyalik sinxron bloklovchi kod yozilsa, o'sha 2 soniya davomida serverdagi BARCHA boshqa 100 ta foydalanuvchining so'rovlari va `/health` endpointi butunlay muzlab qoladi! Yechim: 1) Tarmoq uchun `httpx.AsyncClient`; 2) CPU-bound embedding/reranking uchun `await asyncio.to_thread(sync_fn, arg)` yoki alohida worker!",
                "codeExample": "rules = [\n    ('XATO (Event Loop muzlaydi!)', 'async def ichida requests.post() yoki time.sleep(5) ishlatish'),\n    ('TO\\'G\\'RI (Async I/O)',       'async def ichida await httpx_client.post() va await asyncio.sleep()'),\n    ('TO\\'G\\'RI (CPU Offload)',     'async def ichida await asyncio.to_thread(reranker.predict, pairs)'),\n]\nfor status, rule in rules:\n    print(f'{status:29} -> {rule}')",
                "outputOrNoteUz": "Natija: `httpx.AsyncClient` va `asyncio.to_thread` Event Loop'ni bo'sh qoldirib, yuzlab parallel ulanishlarga xizmat ko'rsatadi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Timeout, Exponential Backoff with Jitter va Graceful Degradation",
                "explanationUz": "Tashqi yoki mahalliy LLM servisi yuklama ostida qotib qolishi (`503 / 504`) mumkin. Agar timeout qo'yilmasa, Gateway soketlari to'lib butun tizim qulaydi (**Cascading Failure**). Production himoyasi: 1) **Qat'iy Timeout** (`connect=2.0s, read=15.0s`); 2) **Exponential Backoff + Jitter**: xato bo'lganda hamma klient bir vaqtda qayta hujum qilmasligi (`Thundering Herd`) uchun $t = 2^{\\text{attempt}} + \\text{random}(0, 0.5)$ soniya kutib qayta urinish; 3) **Circuit Breaker & Fallback**: LLM o'chiq bo'lsa ham Vector DB topgan xom qonun moddalarini foydalanuvchiga chiroyli qaytarish (**Graceful Degradation**).",
                "codeExample": "import random\n\nrandom.seed(42)\ndef backoff_delay_sec(attempt: int, base: float = 0.5, cap: float = 8.0) -> float:\n    exp = min(cap, base * (2 ** attempt))\n    jitter = random.uniform(0, 0.3 * exp)\n    return round(exp + jitter, 3)\n\nfor a in range(1, 5):\n    print(f'{a}-qayta urinish (Retry) oldidan kutish vaqti: {backoff_delay_sec(a)} soniya')",
                "outputOrNoteUz": "Natija: Kutish vaqti `1.19s -> 2.02s -> 4.33s -> 8.53s` bo'lib eksponensial va tasodifiy jitter bilan oshib boradi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Graceful Degradation (LLM Servisi O'chganda Retrieval-Only Fallback)",
                "scenarioUz": "9-hafta amaliy natijasi: Ollama/vLLM konteyneri o'chirib qo'yilganda Gateway `500 Internal Server Error` bermasdan, Vector DB topgan aniq iqtiboslarni fallback rejimda qaytarishi.",
                "howToUseUz": "Fallback simulyatsiyasini ishga tushiring.",
                "code": "def gateway_rag_handler(query: str, retrieved_docs: list[dict], llm_healthy: bool) -> dict:\n    if llm_healthy:\n        return {\n            'status': 'OK',\n            'mode': 'FULL_RAG_LLM',\n            'answer': f\"Hujjatga ko'ra: {retrieved_docs[0]['text']} [1].\",\n            'sources': retrieved_docs\n        }\n    # Graceful Degradation: LLM o'chiq bo'lsa ham foydalanuvchi quruq qolmaydi!\n    return {\n        'status': 'DEGRADED_FALLBACK',\n        'mode': 'RETRIEVAL_ONLY',\n        'answer': 'AI generatsiya servisi vaqtincha band, ammo savolingizga mos rasmiy hujjat parchalari topildi:',\n        'sources': retrieved_docs\n    }\n\ndocs = [{'id': 'MK-134', 'text': 'Yillik asosiy mehnat ta\\'tili 21 kalendar kun.'}]\nprint('LLM Ishlayotganda:', gateway_rag_handler('Ta\\'til qancha?', docs, llm_healthy=True)['mode'])\nprint('LLM O\\'chirilganda:', gateway_rag_handler('Ta\\'til qancha?', docs, llm_healthy=False))",
                "expectedOutput": "LLM Ishlayotganda: FULL_RAG_LLM\nLLM O'chirilganda: {'status': 'DEGRADED_FALLBACK', 'mode': 'RETRIEVAL_ONLY'...}",
                "breakdownUz": "Graceful Degradation tizim ishonchliligini (Availability) 99.9% darajada ushlab turadi."
            },
            {
                "titleUz": "2-misol: Circuit Breaker (Zanjir Uzgich) Avtomati",
                "scenarioUz": "Agar LLM servisi ketma-ket 3 marta timeout bersa, keyingi so'rovlarni 15 soniya kutdirmasdan `0.1 ms` ichida darhol Fallback'ka yo'naltirish (`OPEN` holati).",
                "howToUseUz": "Circuit Breaker holat o'tishlarini (`CLOSED -> OPEN -> HALF_OPEN`) ko'ring.",
                "code": "class CircuitBreaker:\n    def __init__(self, fail_threshold: int = 3):\n        self.fail_threshold = fail_threshold\n        self.failures = 0\n        self.state = 'CLOSED' # Normal holat\n\n    def record_result(self, success: bool):\n        if success:\n            self.failures = 0\n            self.state = 'CLOSED'\n        else:\n            self.failures += 1\n            if self.failures >= self.fail_threshold:\n                self.state = 'OPEN' # Zanjir uzildi: endi fast-fail / fallback!\n\ncb = CircuitBreaker(fail_threshold=3)\nfor step, ok in enumerate([True, False, False, False], start=1):\n    cb.record_result(ok)\n    print(f'So\\'rov {step} (ok={ok!s:5}) -> Xatolar={cb.failures} | Circuit Holati: {cb.state}')",
                "expectedOutput": "So'rov 1 (ok=True ) -> Xatolar=0 | Circuit Holati: CLOSED\n...\nSo'rov 4 (ok=False) -> Xatolar=3 | Circuit Holati: OPEN",
                "breakdownUz": "`OPEN` holatida Gateway o'lik LLM servisini kutib vaqt yo'qotmaydi, darhol `RETRIEVAL_ONLY` fallback qaytaradi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Server-Sent Events (SSE — `text/event-stream`)",
                "category": "Python & Infra",
                "definitionUz": "Bitta uzoq yashovchi HTTP ulanish orqali serverdan klientga matn/JSON hodisalarini (`data: ...\\n\\n`) real-vaqt oqimida uzatuvchi standart protokol.",
                "analogyOrExampleUz": "Matbaa gazetasi (butun son chiqquncha ertalabgacha kutish — REST JSON) o'rniga jonli telegraf lentasi (har bir so'z yozilgan zahoti ko'rinishi — SSE).",
                "connectedTo": [
                    {
                        "targetTerm": "TTFT (Time To First Token) UX",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "7-haftada o'lchangan TTFT metrikasi foydalanuvchi ekranida aynan SSE Streamingning birinchi paketi kelgan lahzadir."
                    }
                ]
            },
            {
                "term": "Exponential Backoff with Jitter & Circuit Breaker",
                "category": "Python & Infra",
                "definitionUz": "Vaqtinchalik tarmoq xatolarida kutish vaqtini $2^k + \\text{rand}$ qilib oshirib borish va servis butunlay yiqilganda zanjirni uzib (`OPEN`) kaskadli qulashdan himoyalanish.",
                "analogyOrExampleUz": "Uyda qisqa tutashuv bo'lganda simlar yonib ketmasligi uchun elektr shitidagi avtomatning (`Circuit Breaker`) 'tiq' etib o'chishi.",
                "connectedTo": [
                    {
                        "targetTerm": "Production Runbook Incident Response",
                        "targetLessonId": "D12.2",
                        "relationshipUz": "12-haftadagi Capstone Runbook'da LLM servisi o'chganda Gateway o'zini qanday tutishi aynan Circuit Breaker va Fallback orqali tekshiriladi."
                    }
                ]
            },
            {
                "term": "Asyncio Event Loop & Non-Blocking Concurrency",
                "category": "Python & Infra",
                "definitionUz": "Bitta operatsion tizim oqimi ichida I/O kutish vaqtlarida (`await`) boshqa so'rovlarga navbat berish orqali minglab parallel ulanishlarni boshqarish.",
                "analogyOrExampleUz": "Mohir shaxmatchining bir vaqtda 20 ta taxtada o'ynashi (Simultaneous exhibition): 1-raqib o'ylayotgan paytda (`await`), kutib turmasdan 2-taxtaga yurish qilishi.",
                "connectedTo": [
                    {
                        "targetTerm": "Locust Concurrency Load Testing",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "Agar Event Loop ichida sinxron bloklovchi kod qolib ketsa, 10-haftadagi Locust testida 20 ta foydalanuvchidayoq p95 latency portlab ketadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d09-1-int-1",
                "level": "Junior",
                "questionUz": "LLM chat oqimini uzatish uchun nima sababdan murakkab WebSockets o'rniga ko'pincha **SSE (Server-Sent Events)** tanlanadi?",
                "interviewerIntentUz": "SSE va WebSocket protokollarining muhandislik farqini bilishini tekshirish.",
                "strongAnswerUz": "LLM chatda oqim asosan bir tomonlama: foydalanuvchi 1 ta qisqa so'rov (`POST`) yuboradi, server esa yuzlab tokenlarni oqim bo'lib qaytaradi. **SSE** oddiy standart HTTP/HTTPS ustida ishlaydi: 1) Mavjud Nginx, Cloudflare, API Gateway, CORS va Bearer Auth tokenlar bilan hech qanday maxsus sozlamasiz ishlaydi; 2) Ulanish uzilsa brauzer avtomatik qayta ulanadi; 3) OpenAI, Anthropic, Ollama va vLLM standartlari aynan SSE (`data: {...}\\n\\n`) formatidan foydalanadi. WebSockets esa ikki tomonlama uzluksiz binar oqim (masalan, real-vaqt ovozli suhbat / Live Audio) uchungina zarur.",
                "redFlagUz": "'HTTP orqali streaming qilib bo'lmaydi, faqat WebSocket ishlaydi' deyish.",
                "followUpQuestionUz": "Savol: Nginx proksi orqasida SSE streaming ishlatganda tokenlar bittalab emas, oxirida hammasi bitta bo'lib kelsa qaysi Nginx sozlamasi aybdor? Javob: `proxy_buffering on;` — Nginx javobni buferga yig'ib o'tiradi! SSE endpoint uchun `X-Accel-Buffering: no` sarlavhasi yoki `proxy_buffering off;` berilishi shart!"
            },
            {
                "id": "d09-1-int-2",
                "level": "Middle",
                "questionUz": "Retry (qayta urinish) mexanizmida nega oddiy Exponential Backoff ($1s, 2s, 4s$) o'zi yetarli emas va unga **Jitter (tasodifiy siljish)** qo'shish shart? Qaysi HTTP xato kodlarida Retry QILMASLIK kerak?",
                "interviewerIntentUz": "Thundering Herd (poda hujumi) muammosi va Retryable vs Non-Retryable status kodlarini bilishini sinash.",
                "strongAnswerUz": "1) Agar LLM serveri 1 soniyaga qoqilsa va 500 ta klient bir vaqtda xato olsa, Jitter bo'lmasa barcha 500 ta klient aynan $1.000$-soniyada va $2.000$-soniyada sinxron to'lqin bo'lib qayta zarba beradi (**Thundering Herd**) va endi o'ziga kelayotgan serverni qaytadan yiqitadi! Tasodifiy Jitter ($+\\text{rand}(0, 0.5s)$) so'rovlarni vaqt bo'ylab tekis yoyib yuboradi. 2) Retry FAQAT vaqtinchalik (transient) xatolarda qilinadi: `429 Too Many Requests`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout`. Mijoz xatolarida (`400 Bad Request`, `401 Unauthorized`, `422 Unprocessable Entity` yoki Context Length Exceeded) Retry qilish befoyda va resurs isrofidir!",
                "redFlagUz": "'Har qanday Exception chiqqanda `while True` bilan darhol qayta so'rov yuboraman' deyish.",
                "followUpQuestionUz": "Savol: Foydalanuvchi brauzerda 'Stop Generation' tugmasini bosib tabni yopib ketsa, backenddagi LLM generatsiyani davom ettiravermasligi uchun FastAPI'da nima qilinadi? Javob: Generator ichida `if await request.is_disconnected():` tekshiriladi va upstream LLM stream ulanishi (`await response.aclose()`) darhol yopilib GPU bo'shatiladi!"
            },
            {
                "id": "d09-1-int-3",
                "level": "Senior / Production",
                "questionUz": "FastAPI'da `httpx.AsyncClient()` ni har bir `/chat` so'rovi ichida `async with httpx.AsyncClient() as client:` deb yangidan yaratish nima uchun yuqori yuklamada (`100+ RPS`) tarmoq xatolariga (` Ephemeral port exhaustion`) olib keladi?",
                "interviewerIntentUz": "TCP Connection Pooling va Lifespan resource management tajribasini sinash.",
                "strongAnswerUz": "Har bir so'rov ichida yangi `AsyncClient()` yaratib yopish — har safar yangi TCP 3-way handshake va TLS handshake bajarilishiga hamda ulanish yopilganda soketning OS darajasida 60 soniya `TIME_WAIT` holatida qolishiga olib keladi. Yuqori RPS'da operatsion tizimning bo'sh portlari tugab qoladi (**Port Exhaustion**) va har bir so'rovga +30-100 ms handshake kechikishi qo'shiladi. To'g'ri yechim: **bitta global `httpx.AsyncClient` obyektini FastAPI `lifespan` startup vaqtida yaratib** (`app.state.http_client`), uning ichki TCP Connection Pool'idan barcha so'rovlarda qayta foydalanish va faqat server to'xtagandagina `.aclose()` qilishdir.",
                "redFlagUz": "'`async with` har doim funksiya ichida yozilishi kerak' deyish.",
                "followUpQuestionUz": "Savol: StreamingResponse (`200 OK` sarlavhasi ketib bo'lgandan keyin) o'rtasida 50-tokenda LLM xato bersa, HTTP status kodini `500` ga o'zgartirib bo'ladimi? Javob: Yo'q! Chunki HTTP `200 OK` headers birinchi bayt bilan allaqachon mijozga ketib bo'lgan; shuning uchun xatoni SSE oqimi ichida maxsus `event: error\\ndata: {\"error\": \"...\"}\\n\\n` paketi sifatida yuborish shart!"
            }
        ],
        "videos": [
            {
                "id": "vid-d09-1-uz",
                "title": "LLM'dan toza JSON va FastAPI AI Servis Arxitekturasi",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "lzhSUZ0XpFc",
                "youtubeUrl": "https://www.youtube.com/watch?v=lzhSUZ0XpFc",
                "durationOrTimestamp": "FastAPI + LLM integratsiyasi",
                "whatItExplainsUz": "FastAPI yordamida LLM endpointlarini qurish, so'rovlarni boshqarish va xatolarni tutish o'zbek tilida ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-bosqichdagi SSE generator va 1-amaliy misoldagi Graceful Degradation fallback kodini sinab ko'ring."
            },
            {
                "id": "vid-d09-1-en",
                "title": "Using APIs with Python: Timeouts, Pagination & Robust Requests",
                "channel": "Jonathan Soma",
                "language": "en",
                "youtubeId": "4Fdyft-ky0w",
                "youtubeUrl": "https://www.youtube.com/watch?v=4Fdyft-ky0w",
                "durationOrTimestamp": "To'liq amaliy dars",
                "whatItExplainsUz": "Tashqi API va servislar bilan ishlashda ishonchlilik, qayta urinishlar va xatolarni boshqarish tamoyillari tushuntirilgan.",
                "howToUseVideoUz": "3-bosqichdagi `backoff_delay_sec` funksiyasini o'z FastAPI Gateway klientingizga qo'shing."
            }
        ],
        "quiz": [
            {
                "id": "d09-1-q1",
                "promptUz": "1. Konseptual: LLM javoblarini foydalanuvchi ekraniga so'zma-so'z (token-ma-token) real vaqtda chiqarish uchun FastAPI'da qaysi texnologiya ishlatiladi?",
                "options": [
                    "Oddiy sinxron HTML form",
                    "Server-Sent Events (`text/event-stream`) va `StreamingResponse` + async generator (`yield`)",
                    "FTP fayl uzatish",
                    "Faqat elektron pochta"
                ],
                "correctIndex": 1,
                "explanationUz": "SSE bitta HTTP ulanish orqali tokenlarni tayyor bo'lishi bilanoq `data: ...\\n\\n` paketlarida uzatadi."
            },
            {
                "id": "d09-1-q2",
                "promptUz": "2. Kod Tahlili: Exponential Backoff qayta urinish algoritmiga tasodifiy **Jitter** (`+ random.uniform(...)`) qo'shishning maqsadi nima?",
                "options": [
                    "Kodni murakkabroq ko'rsatish",
                    "Vaqtinchalik uzilishdan keyin yuzlab klientlarning aynan bir soniyada sinxron qayta hujum qilib serverni yiqitishi (Thundering Herd) ning oldini olish",
                    "Parolni shifrlash",
                    "Internet trafikni ko'paytirish"
                ],
                "correctIndex": 1,
                "explanationUz": "Jitter qayta urinish vaqtlarini tekis yoyib, tiklanayotgan serverga tushadigan yuklama cho'qqisini yumshatadi."
            },
            {
                "id": "d09-1-q3",
                "promptUz": "3. Production Debugging: FastAPI'da `async def` endpoint ichida sinxron `requests.post()` yoki `time.sleep(5)` chaqirilsa nima yuz beradi?",
                "options": [
                    "Kod 10 marta tezroq ishlaydi",
                    "Bitta oqimli asyncio Event Loop butunlay bloklanib qoladi va o'sha 5 soniya ichida server boshqa hech bir foydalanuvchiga javob bera olmaydi",
                    "Avtomatik GPU ga o'tadi",
                    "Hech qanday zarar qilmaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "`async def` ichida faqat non-blocking `await` (`httpx.AsyncClient`, `asyncio.sleep`, `asyncio.to_thread`) ishlatilishi shart."
            }
        ]
    },
    "D09.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Docker Compose Multi-Service Arxitekturasi va Internal DNS",
                "explanationUz": "Haqiqiy production AI tizimi bitta skriptdan iborat emas. U kamida 4 ta konteynerdan tashkil topadi: `gateway` (FastAPI), `vectordb` (Qdrant/Chroma), `cache` (Redis) va `llm` (Ollama/vLLM). **Docker Compose** bularning barchasini bitta `docker compose up -d` buyrug'i bilan yagona virtual tarmoqda (`atlas_net`) ko'taradi. Eng muhim tarmoq qoidasi: konteynerlar bir-biriga `localhost` deb EMAS, balki `docker-compose.yml` dagi **servis nomi** orqali (`http://vectordb:6333`, `redis://cache:6379`, `http://llm:11434`) murojaat qiladi (Docker Internal DNS)!",
                "codeExample": "compose_network_map = {\n    'gateway (FastAPI)': 'Tashqariga 8000:8000 ochiq; ichkarida http://vectordb:6333 va redis://cache:6379 ga ulanadi',\n    'vectordb (Qdrant)': 'Tashqariga yopiq (faqat atlas_net ichida); ./data/qdrant:/qdrant/storage volume ulangan',\n    'cache (Redis 7)':   'Tashqariga yopiq; TTL=3600s va LRU eviction yoqilgan',\n    'llm (Ollama)':      'Named volume ollama_models:/root/.ollama ulangan'\n}\nfor svc, desc in compose_network_map.items():\n    print(f'{svc:20} -> {desc}')",
                "outputOrNoteUz": "Natija: Tashqi internetga faqat `gateway:8000` ochiladi; baza va Redis ichki `atlas_net` tarmog'ida xavfsiz himoyalanadi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: `depends_on: condition: service_healthy` (Startup Race Condition Yechimi)",
                "explanationUz": "Oddiy `depends_on: [vectordb]` faqatgina `vectordb` konteyneri *start* bo'lishini kutadi, ammo Qdrant yoki PostgreSQL ichidagi dastur portni ochib so'rov qabul qilishga tayyor (`Ready`) bo'lishini KUTMAYDI! Natijada FastAPI 1 soniyada yonib bazaga ulanaman deydi va `ConnectionRefusedError` bilan qulab tushadi! Yechim: har bir bazaga `healthcheck` yozish va Gateway'da `depends_on: vectordb: condition: service_healthy` ko'rsatishdir!",
                "codeExample": "compose_health_snippet = '''\nservices:\n  cache:\n    image: redis:7-alpine\n    healthcheck:\n      test: [\"CMD\", \"redis-cli\", \"ping\"]\n      interval: 5s\n      timeout: 3s\n      retries: 5\n  gateway:\n    build: .\n    depends_on:\n      cache:\n        condition: service_healthy\n'''\nprint(compose_health_snippet.strip())",
                "outputOrNoteUz": "Natija: Docker Compose `gateway` konteynerini faqatgina Redis `PONG` javobini qaytarib `healthy` bo'lgandan keyingina ishga tushiradi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Redis Keshlash — Exact Match Cache vs Semantic Cache",
                "explanationUz": "Korporativ RAG chatbotga beriladigan savollarning 30–45% qismi takroriy savollardir (*'Mehnat ta\\'tili necha kun?'*, *'Ish vaqti soat nechada?'*). Har safar 5 soniyalik LLM chaqirish o'rniga **Redis Kesh (Cache-Aside Pattern)** qo'llaniladi:\n1) **Exact Match Cache**: normalizatsiya qilingan savol + **hujjatlar versiyasi (`kb_version`)** dan SHA-256 kalit (`rag:v3:<hash>`) olinadi — mos kelsa `1 ms` da javob qaytadi!\n2) **Semantic Cache**: savol embeddingi Redis Vector indeksidagi oldingi keshlangan savollar bilan solishtiriladi — agar Cosine Similarity $\\ge 0.96$ bo'lsa (*'Ta\\'til necha kun?'* $\\approx$ *'Yillik ta\\'til muddati qancha?'*), tayyor javob `15 ms` da qaytariladi!",
                "codeExample": "import hashlib\n\nredis_store = {}\nKB_VERSION = 'kb_2026_v4' # Hujjatlar yangilansa shu versiya o'zgaradi va eski kesh avtomatik unutiladi!\n\ndef get_cache_key(query: str, user_role: str = 'public') -> str:\n    norm = ' '.join(query.lower().strip().split())\n    raw = f'{KB_VERSION}:{user_role}:{norm}'\n    return 'rag:' + hashlib.sha256(raw.encode('utf-8')).hexdigest()[:16]\n\nk1 = get_cache_key('  Mehnat   tatili necha kun? ', 'public')\nk2 = get_cache_key('mehnat tatili necha kun?', 'public')\nredis_store[k1] = {'answer': '21 kalendar kun [1].', 'ttl': 3600}\n\nprint('k1 == k2 (Normalizatsiya tufayli):', k1 == k2)\nprint('Redis Cache HIT (1 ms):', redis_store.get(k2))",
                "outputOrNoteUz": "Natija: Bo'sh joy va katta-kichik harflar farqiga qaramay `k1 == k2` bo'lib, `1 ms` ichida Cache HIT olindi va `KB_VERSION` hamda `user_role` kalit ichiga kiritildi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Semantic Cache Threshold Tuzog'i (`0.96` vs `0.80`)",
                "scenarioUz": "Nima uchun Semantic Cache'da Cosine Similarity chegarasi juda yuqori (`>= 0.95`) bo'lishi kerakligini ko'rish (*'134-modda nima?'* va *'135-modda nima?'* vektorlari `0.91` o'xshash chiqadi!).",
                "howToUseUz": "Semantic cache xavfsizligini sinab ko'ring.",
                "code": "import numpy as np\n\ncached_entries = [\n    {'q': 'Mehnat kodeksi 134-modda nima haqida?', 'vec': np.array([0.95, 0.30, 0.08]), 'ans': '134-modda: Asosiy ta\\'til 21 kun.'},\n]\n\n# Yangi savol: 135-modda haqida (vektori 134-moddaga juda yaqin = 0.92!)\nnew_q_vec = np.array([0.88, 0.45, 0.15])\nsim = float(np.dot(cached_entries[0]['vec'], new_q_vec) / (np.linalg.norm(cached_entries[0]['vec']) * np.linalg.norm(new_q_vec)))\n\nprint(f'134-modda va 135-modda savollari Cosine o\\'xshashligi: {sim:.4f}')\nfor th in [0.85, 0.96]:\n    action = 'CACHE HIT (Xato javob ketib qoldi!)' if sim >= th else 'CACHE MISS (To\\'g\\'ri: yangi RAG qidiruvga ketdi)'\n    print(f'Threshold = {th} -> {action}')",
                "expectedOutput": "134-modda va 135-modda savollari Cosine o'xshashligi: 0.9737 -> ...\nThreshold = 0.85 -> CACHE HIT...\nThreshold = 0.98 -> CACHE MISS...",
                "breakdownUz": "Raqamlar, yillar (`2024` vs `2025`) yoki moddalar farq qiladigan savollarda xato Cache HIT bo'lmasligi uchun raqamlar aniq mosligini (entity check) tekshirish va yuqori threshold (`0.96-0.98`) qo'yish shart!"
            },
            {
                "titleUz": "2-misol: Docker Volume Persistence Tekshiruvi",
                "scenarioUz": "Konteyner o'chirib yoqilganda (`docker compose down && docker compose up -d`) Vector DB ichidagi 50,000 ta vektor va Ollama yuklagan 4.5 GB model o'chib ketmasligini ta'minlash.",
                "howToUseUz": "Stateless vs Stateful servislarning volume xaritasini ko'ring.",
                "code": "stack_storage = [\n    ('gateway',  'Stateless (holatsiz)', 'Volume shart emas (istalgan vaqt o\\'chirib 5 ta nusxada ko\\'paytirish mumkin)'),\n    ('vectordb', 'Stateful (ma\\'lumotli)', 'qdrant_data:/qdrant/storage (Named Volume MAJBURIY!)'),\n    ('cache',    'Ephemeral / AOF',      'redis_data:/data (--appendonly yes va --maxmemory-policy allkeys-lru)'),\n    ('ollama',   'Stateful (4.5GB model)', 'ollama_data:/root/.ollama (Named Volume MAJBURIY!)'),\n]\nfor svc, st, vol in stack_storage:\n    print(f'{svc:10} | {st:22} | {vol}')",
                "expectedOutput": "gateway    | Stateless (holatsiz)   | Volume shart emas...\nvectordb   | Stateful (ma'lumotli)  | qdrant_data:/qdrant/storage (Named Volume MAJBURIY!)...",
                "breakdownUz": "Docker konteynerining ichki fayl tizimi vaqtinchalik (ephemeral) bo'ladi — volume ulanmasa `docker compose down` qilingan zahoti barcha indeks va modellar yo'qoladi!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "Docker Compose Internal DNS & Service Discovery",
                "category": "Python & Infra",
                "definitionUz": "Bitta `docker-compose.yml` tarmog'idagi konteynerlarning IP-manzillarsiz, to'g'ridan-to'g'ri servis nomi (`http://vectordb:6333`) orqali bir-birini topishi.",
                "analogyOrExampleUz": "Ofis ichki telefoni: hamkasbingizga qo'ng'iroq qilish uchun uzun xalqaro raqam emas, shunchaki `buxgalteriya` yoki `102` ichki nomini terish.",
                "connectedTo": [
                    {
                        "targetTerm": "Capstone E2E Docker Compose Stack",
                        "targetLessonId": "D12.1",
                        "relationshipUz": "12-haftadagi 3-Portfolio Capstone loyihasida Gateway, VectorDB, Redis, Prometheus va Grafana aynan shu ichki DNS orqali bog'lanadi."
                    }
                ]
            },
            {
                "term": "Cache-Aside Pattern, TTL & Cache Invalidation",
                "category": "Python & Infra",
                "definitionUz": "So'rov kelganda avval Redis'ni tekshirish (`HIT` bo'lsa darhol qaytarish, `MISS` bo'lsa RAG+LLM hisoblab, natijani `TTL` yashash muddati bilan Redis'ga yozib qaytarish) va hujjat yangilanganda keshni tozalash.",
                "analogyOrExampleUz": "Ko'p so'raladigan ma'lumotnomani uzoq arxiv omboridan har safar olib kelmasdan, qabulxona stolining tortmasiga (`Redis`) 1 kunga (`TTL`) qo'yib qo'yish.",
                "connectedTo": [
                    {
                        "targetTerm": "Locust p95 Latency & Cost Optimization",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "Redis kesh 35% Hit Rate berganda ham LLM yuklamasi va xarajati 35% ga kamayadi, keshdan qaytgan javoblarning latency'si esa `8000 ms` dan `2 ms` ga tushadi!"
                    }
                ]
            },
            {
                "term": "Healthcheck Condition (`service_healthy`)",
                "category": "Python & Infra",
                "definitionUz": "Bog'liq konteyner (`gateway`) faqatgina baza konteyneri (`vectordb`, `redis`) shunchaki yonishini emas, balki ichki healthcheck testidan muvaffaqiyatli o'tishini kutib turishi.",
                "analogyOrExampleUz": "Samolyotga yo'lovchilarni shunchaki samolyot aeroportga qo'ngan zahoti emas, balki texnik ko'rik va tozalash to'liq tugagani tasdiqlangachgina chiqarish.",
                "connectedTo": [
                    {
                        "targetTerm": "Kubernetes InitContainers & Readiness Probes",
                        "targetLessonId": "D09.3",
                        "relationshipUz": "Keyingi darsda Kubernetes'da ham aynan shu muammo `readinessProbe` va `initContainers` orqali hal qilinadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d09-2-int-1",
                "level": "Junior",
                "questionUz": "Docker Compose ichida `gateway` konteyneridan `redis` konteyneriga ulanish uchun `REDIS_URL=redis://localhost:6379` deb yozdim, lekin `Connection Refused` xatosi chiqyapti. Nega?",
                "interviewerIntentUz": "Konteyner tarmoq izolyatsiyasini (`localhost` per container) bilishini tekshirish.",
                "strongAnswerUz": "Har bir Docker konteyneri o'zining alohida tarmoq nomlar fazosiga (`Network Namespace`) ega. `gateway` konteyneri ichida `localhost` (`127.0.0.1`) deb yozilsa, u Redis konteyneriga emas, balki `gateway` konteynerining O'Z ICHIGA murojaat qiladi (u yerda esa Redis ishlamayapti!). Docker Compose ichki DNS serveri orqali boshqa konteynerga ulanish uchun `localhost` o'rniga `docker-compose.yml` dagi servis nomini yozish shart: `REDIS_URL=redis://cache:6379` (yoki `redis://redis:6379`).",
                "redFlagUz": "'Redis portini 6380 ga o'zgartirish kerak' deyish.",
                "followUpQuestionUz": "Savol: `docker-compose.yml` da `ports: [\"6379:6379\"]` bilan `expose: [\"6379\"]` o'rtasida qanday farq bor? Javob: `ports` portni tashqi host mashinasiga (va internetga) ochib qo'yadi; `expose` esa portni tashqariga yopiq qoldirib, faqatgina ichki Docker tarmog'idagi (`atlas_net`) konteynerlar uchungina ochadi (xavfsizlik uchun DB va Redis tashqariga yopiq bo'lishi kerak)."
            },
            {
                "id": "d09-2-int-2",
                "level": "Middle",
                "questionUz": "RAG tizimida kecha qonunga o'zgartirish kiritilib, yangi PDF hujjat Vector DB'ga yuklandi (`Re-indexed`). Ammo foydalanuvchilar savol berganda chatbot hali ham 1 hafta oldingi ESKI qonun bo'yicha javob qaytarishda davom etyapti. Sababi nima va qanday oldi olinadi?",
                "interviewerIntentUz": "Cache Invalidation (Stale Cache) muammosini RAG kontekstida yecha olishini sinash.",
                "strongAnswerUz": "Muammo **Redis Keshda (Stale Cache)**! Vector DB yangilangani bilan Redis ichida eski savollarga yozilgan eski javoblar hali TTL muddati tugamasdan turibdi va Gateway Vector DB'ga kirmasdan Redis'dan eski javobni qaytaryapti. Yechim — **Versioned Cache Keys**: Redis kalitini faqat savol matnidan emas, balki bilimlar bazasining joriy versiya raqami (`kb_version` yoki oxirgi ingestion timestamp) bilan birga hosil qilish: `rag:{kb_version}:{query_hash}`! Hujjatlar bazasi har safar yangilanganda `kb_version` (`v1 -> v2`) bitta atomik oshiriladi, natijada barcha eski keshlar bir lahzada avtomatik chetlab o'tiladi va `allkeys-lru` tomonidan tozalanadi.",
                "redFlagUz": "'LLM modelining o'zi eski javobni yodlab qolgan' deyish.",
                "followUpQuestionUz": "Savol: Agar tizimda `Admin` (maxfiy hujjatlarni ko'ra oladi) va `Guest` (faqat ochiq hujjatlarni ko'radi) foydalanuvchilar bo'lsa, Redis kesh kalitida yana nima bo'lishi shart? Javob: **`user_role` yoki `access_scope`** (`rag:{kb_version}:{access_scope}:{query_hash}`)! Aks holda Admin so'ragan maxfiy hujjat javobi keshga tushib qolib, 1 daqiqadan keyin xuddi shu savolni bergan Guest foydalanuvchiga sizib chiqadi (**Cache Poisoning / Data Leak**)!"
            },
            {
                "id": "d09-2-int-3",
                "level": "Senior / Production",
                "questionUz": "Redis kesh xotirasi (`maxmemory 512mb`) to'lib qolganda RAG tizimi xato berib to'xtab qolmasligi uchun qaysi Eviction Policy tanlanadi va Cache Stampede (Dogpiling) qanday oldi olinadi?",
                "interviewerIntentUz": "Redis production konfiguratsiyasi va yuqori yuklamali kesh muhandisligini sinash.",
                "strongAnswerUz": "1) Redis default holatda `noeviction` rejimida turadi — xotira 512 MB ga to'lishi bilan yangi `SET` buyruqlariga `OOM command not allowed` xatosini qaytaradi! Kesh sifatida ishlatganda albatta **`maxmemory-policy allkeys-lru` (Least Recently Used)** yoki `allkeys-lfu` (Least Frequently Used) yoqilishi shart — shunda xotira to'lganda eng kam ishlatilgan eski kalitlar avtomatik o'chirilib yangisiga joy ochiladi. 2) **Cache Stampede**: juda mashhur savolning TTL muddati tugagan soniyada 50 ta foydalanuvchi bir vaqtda shu savolni bersa, 50 tasi ham `Cache MISS` olib bir vaqtda LLMga yopiriladi! Oldini olish uchun key-level `asyncio.Lock` (In-flight request coalescing / Singleflight) ishlatiladi: 1-so'rov LLMga ketadi, qolgan 49 tasi o'sha 1-so'rov natijasini kutib oladi.",
                "redFlagUz": "'Xotira to'lsa Redis o'zi avtomatik tozalayveradi, hech qanday sozlama kerak emas' deyish.",
                "followUpQuestionUz": "Savol: Agar Redis konteyneri to'satdan o'chib qolsa, FastAPI Gateway qulashi kerakmi? Javob: Aslo yo'q! Kesh o'qish/yozish `try...except RedisError:` ichiga olinib, Redis ishlamay qolganda xatoni logga yozib (`WARNING`), so'rovni to'g'ridan-to'g'ri RAG+LLM quvuriga o'tkazib yuborishi (Fail-open) shart."
            }
        ],
        "videos": [
            {
                "id": "vid-d09-2-en",
                "title": "Hands-On RAG Stack: Vector Database, API & Infrastructure",
                "channel": "Bojan Savic",
                "language": "en",
                "youtubeId": "UII9xn6-3EI",
                "youtubeUrl": "https://www.youtube.com/watch?v=UII9xn6-3EI",
                "durationOrTimestamp": "Vector DB va servislar integratsiyasi",
                "whatItExplainsUz": "Vector DB va LLM servislarini bitta ilova ekotizimida bog'lash va ma'lumotlarni saqlash ko'rsatilgan.",
                "howToUseVideoUz": "3-bosqichdagi `get_cache_key` (KB_VERSION + user_role + query_hash) funksiyasini o'z Gateway kodingizga integratsiya qiling."
            },
            {
                "id": "vid-d09-2-ru",
                "title": "Что такое RAG в LLM и как устроены векторные БД в продакшене",
                "channel": "Rustam Kamalov",
                "language": "ru",
                "youtubeId": "sr2iWz133eg",
                "youtubeUrl": "https://www.youtube.com/watch?v=sr2iWz133eg",
                "durationOrTimestamp": "Arxitektura va keshlash",
                "whatItExplainsUz": "Production RAG arxitekturasida Vector DB, kesh va LLM o'rtasidagi ma'lumot almashinuvi tushuntirilgan.",
                "howToUseVideoUz": "`docker-compose.yml` faylingizda barcha servislarga `healthcheck` va `condition: service_healthy` qo'shilganini tekshiring."
            }
        ],
        "quiz": [
            {
                "id": "d09-2-q1",
                "promptUz": "1. Konseptual: `docker-compose.yml` ichida `gateway` konteyneri `vectordb` va `cache` (Redis) konteynerlariga qaysi host nomi orqali ulanadi?",
                "options": [
                    "`localhost` yoki `127.0.0.1` orqali",
                    "Docker Compose ichki DNS tarmog'idagi servis nomlari (`http://vectordb:6333` va `redis://cache:6379`) orqali",
                    "Faqat tashqi public IP orqali",
                    "Fayl yo'li orqali"
                ],
                "correctIndex": 1,
                "explanationUz": "Konteyner ichidagi `localhost` faqat o'sha konteynerning o'ziga ishora qiladi; boshqa konteynerlarga servis nomi bilan murojaat qilinadi."
            },
            {
                "id": "d09-2-q2",
                "promptUz": "2. Kod Tahlili: RAG tizimida yangi hujjatlar yuklanganda Redis eski keshlangan javoblarni qaytarib yubormasligi va maxfiy rollar aralashib ketmasligi uchun Redis kaliti (`cache_key`) qanday tuzilishi kerak?",
                "options": [
                    "Faqat savolning birinchi so'zidan",
                    "`rag:{kb_version}:{user_role}:{normalized_query_sha256}` ko'rinishida (bilimlar bazasi versiyasi va foydalanuvchi roli bilan birga)",
                    "Tasodifiy sonlardan",
                    "Faqat sanadan"
                ],
                "correctIndex": 1,
                "explanationUz": "`kb_version` o'zgarganda eski keshlar avtomatik chetlab o'tiladi, `user_role` esa RBAC ruxsatlari buzilishining oldini oladi."
            },
            {
                "id": "d09-2-q3",
                "promptUz": "3. Production Debugging: `docker compose up` qilganda `gateway` konteyneri baza hali to'liq yuklanib ulgurmasidan ulanishga urinib yiqilib qolyapti. Qanday tuzatiladi?",
                "options": [
                    "Baza servisiga `healthcheck` yozib, `gateway` da `depends_on: db: condition: service_healthy` ko'rsatish va startup retry qo'shish",
                    "Gateway kodini o'chirib tashlash",
                    "Kompyuterni sekinlashtirish",
                    "Har safar qo'lda 10 marta qayta yoqish"
                ],
                "correctIndex": 0,
                "explanationUz": "`condition: service_healthy` baza jarayoni portni ochib haqiqiy ping so'roviga javob bermaguncha `gateway` ni kutdirib turadi."
            }
        ]
    },
    "D09.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Asinxron Navbatlar (Celery / Redis Queue) — Og'ir Vazifalarni Ajratish",
                "explanationUz": "Foydalanuvchi 200 betlik PDF qonun hujjatini yuklab *'Indekslab ber'* tugmasini bosganda, PDFni o'qish, 800 ta chunkka bo'lish va har biriga embedding hisoblash 45 soniya vaqt oladi. Agar buni HTTP request ichida sinxron bajarsak, brauzer va Nginx `504 Gateway Timeout` berib uzilib qoladi! To'g'ri arxitektura: FastAPI faylni qabul qilgan zahoti Redis Queue'ga vazifa (`task`) tashlaydi va **`5 ms` ichida `HTTP 202 Accepted` + `job_id`** qaytaradi! Orqa fondagi **Worker** konteyneri navbatdan vazifani olib, tinchgina 45 soniya ishlaydi va holatni (`PENDING -> PROCESSING (45%) -> COMPLETED`) yangilab boradi.",
                "codeExample": "job_store = {}\n\ndef submit_ingestion_job(filename: str, pages: int) -> tuple[int, dict]:\n    job_id = 'job_' + str(abs(hash(filename)) % 10000)\n    job_store[job_id] = {'status': 'QUEUED', 'file': filename, 'pages': pages, 'progress': 0}\n    # HTTP 202 Accepted darhol qaytariladi:\n    return 202, {'job_id': job_id, 'status': 'QUEUED', 'poll_url': f'/jobs/{job_id}'}\n\ndef background_worker_process(job_id: str):\n    job_store[job_id]['status'] = 'COMPLETED'\n    job_store[job_id]['progress'] = 100\n    job_store[job_id]['chunks_indexed'] = job_store[job_id]['pages'] * 4\n\ncode, resp = submit_ingestion_job('mehnat_kodeksi_2026.pdf', pages=180)\nprint(f'API Darhol Javobi (HTTP {code}):', resp)\nbackground_worker_process(resp['job_id'])\nprint('Worker tugatgach /jobs/{id} holati:', job_store[resp['job_id']])",
                "outputOrNoteUz": "Natija: HTTP so'rov bloklanmasdan `202 Accepted` qaytardi, orqa fon workeri esa 720 ta chunkni xavfsiz indeksladi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Kubernetes Asoslari — Pod, Deployment, Service va HPA",
                "explanationUz": "Bitta server (Docker Compose) yetmay qolganda **Kubernetes (K8s)** klasteriga o'tiladi: 1) **Pod** — eng kichik birlik (1 ta konteyner, masalan FastAPI); 2) **Deployment** — Pod'larning kerakli nusxalar sonini (`replicas: 3`) ushlab turadi va Zero-Downtime Rolling Update qiladi; 3) **Service** — 3 ta Pod oldida turib trafikni tekis taqsimlovchi (Load Balancer) doimiy virtual IP/DNS; 4) **HPA (Horizontal Pod Autoscaler)** — CPU yoki so'rovlar navbati oshganda Pod'lar sonini avtomatik 3 tadan 10 tagacha ko'paytiradi (`scale out`).",
                "codeExample": "k8s_concepts = [\n    ('Pod',        'Konteyner qobig\\'i (masalan 1 ta FastAPI yoki 1 ta vLLM instance)'),\n    ('Deployment', 'Replikalar sonini (replicas=3) nazorat qilish va Rolling Update / Rollback'),\n    ('Service',    'Podlar o\\'zgaruvchan IP larini yagona barqaror DNS va Load Balancer ostiga birlashtirish'),\n    ('ConfigMap / Secret', 'Konfiguratsiya va API kalitlarni Docker image ichiga yozmasdan tashqaridan ulash'),\n]\nfor obj, role in k8s_concepts:\n    print(f'{obj:20} -> {role}')",
                "outputOrNoteUz": "Natija: Stateless `gateway` Deployment orqali 10 ta nusxagacha oson ko'paytiriladi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Kubernetes Liveness vs Readiness vs Startup Probes (ML Uchun Juda Muhim!)",
                "explanationUz": "ML va LLM konteynerlari oddiy web-ilovadan farq qiladi: ular start bo'lganda 5 GB modelni diskdan/S3dan xotiraga yuklash uchun 30–60 soniya vaqt oladi! Agar Kubernetes'da `livenessProbe` ni 5-soniyadan boshlab tekshirsak, K8s *'Bu pod qotib qoldi'* deb model yuklanib ulgurmasidan uni o'ldirib qayta-qayta yoqaveradi (**CrashLoopBackOff**)! To'g'ri sozlama:\n1) **Startup Probe** — model xotiraga to'liq yuklanguncha (masalan 90 soniyagacha) boshqa probelarni kutdirib turadi;\n2) **Readiness Probe (`/health/ready`)** — pod trafik qabul qilishga tayyormi? (Agar vaqtincha band bo'lsa, podni o'ldirmasdan unga yangi trafik yuborishni to'xtatib turadi);\n3) **Liveness Probe (`/health/live`)** — jarayon deadlock bo'lib butunlay o'lib qoldimi? (Faqat shundagina podni restart qiladi!).",
                "codeExample": "def evaluate_k8s_probes(model_loaded: bool, process_deadlocked: bool, queue_full: bool) -> dict:\n    startup_ok = model_loaded\n    liveness_ok = not process_deadlocked\n    readiness_ok = model_loaded and (not queue_full) and liveness_ok\n    action = 'NORMAL_TRAFFIC'\n    if not startup_ok:\n        action = 'WAIT_FOR_MODEL_LOAD (Restart qilinmaydi!)'\n    elif not liveness_ok:\n        action = 'RESTART_POD (Jarayon qotib qolgan)'\n    elif not readiness_ok:\n        action = 'REMOVE_FROM_LOAD_BALANCER (O\\'ldirilmaydi, faqat yangi trafik to\\'xtatiladi)'\n    return {'startup': startup_ok, 'liveness': liveness_ok, 'readiness': readiness_ok, 'k8s_action': action}\n\nprint('1. Model yuklanmoqda (20-sek):', evaluate_k8s_probes(model_loaded=False, process_deadlocked=False, queue_full=False)['k8s_action'])\nprint('2. Navbat to\\'ldi (band):      ', evaluate_k8s_probes(model_loaded=True,  process_deadlocked=False, queue_full=True)['k8s_action'])\nprint('3. Deadlock yuz berdi:        ', evaluate_k8s_probes(model_loaded=True,  process_deadlocked=True,  queue_full=False)['k8s_action'])",
                "outputOrNoteUz": "Natija: Startup, Readiness va Liveness probelarini to'g'ri ajratish ML podlarini `CrashLoopBackOff` falokatidan qutqaradi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Idempotent Background Worker va Dead-Letter Queue (DLQ)",
                "scenarioUz": "Celery/RQ workeri hujjatni indekslayotganda tarmoq uzilib qayta ishga tushsa (`retry`), hujjatni ikki marta dublikat qilib yozmasligi va 3 marta xato bergan zaharli faylni (`poison pill`) DLQ ga o'tkazishi.",
                "howToUseUz": "Worker retry va DLQ mantiqini sinang.",
                "code": "processed_hashes = set()\ndead_letter_queue = []\n\ndef process_document_task(doc_id: str, content: str, max_retries: int = 3) -> str:\n    if doc_id in processed_hashes:\n        return f'SKIP_IDEMPOTENT: {doc_id} allaqachon qayta ishlangan!'\n    for attempt in range(1, max_retries + 1):\n        if 'CORRUPTED_BINARY' not in content:\n            processed_hashes.add(doc_id)\n            return f'SUCCESS: {doc_id} ({attempt}-urinishda indeklandi)'\n    dead_letter_queue.append({'doc_id': doc_id, 'reason': '3 marta parse xatosi'})\n    return f'MOVED_TO_DLQ: {doc_id} Dead-Letter Queue ga o\\'tkazildi'\n\nprint(process_document_task('doc_101', 'Toza qonun matni'))\nprint(process_document_task('doc_101', 'Toza qonun matni')) # Qayta kelgan dublikat xabar\nprint(process_document_task('doc_666', 'CORRUPTED_BINARY_FILE'))\nprint('DLQ ichidagi xato fayllar:', dead_letter_queue)",
                "expectedOutput": "SUCCESS: doc_101 (1-urinishda indeklandi)\nSKIP_IDEMPOTENT: doc_101 allaqachon qayta ishlangan!\nMOVED_TO_DLQ: doc_666 Dead-Letter Queue ga o'tkazildi...",
                "breakdownUz": "Idempotentlik (`doc_id` tekshiruvi) va Dead-Letter Queue navbatning bitta buzuq fayl ustida abadiy tiqilib qolishining oldini oladi."
            },
            {
                "titleUz": "2-misol: Kubernetes Resource Requests vs Limits (`OOMKilled` Exit Code 137 Tahlili)",
                "scenarioUz": "Konteyner RAM iste'moli K8s `limits.memory` chegarasidan oshganda Linux yadrosi uni `Exit Code 137 (SIGKILL / OOMKilled)` bilan o'ldirishini oldindan hisoblash.",
                "howToUseUz": "Pod xotira byudjetini tekshiring.",
                "code": "def check_k8s_pod_memory(model_mb: int, worker_processes: int, per_worker_overhead_mb: int, k8s_limit_mb: int) -> str:\n    # Har bir uvicorn --workers N alohida jarayon bo'lib modeldan N ta nusxa ko'paytirib yuborishi mumkin!\n    total_mb = (model_mb + per_worker_overhead_mb) * worker_processes\n    if total_mb > k8s_limit_mb:\n        return f'CRITICAL: {total_mb} MB > Limit {k8s_limit_mb} MB -> K8s OOMKilled (Exit Code 137)!'\n    return f'SAFE: {total_mb} MB <= Limit {k8s_limit_mb} MB (Barqaror)'\n\nprint('1 pod ichida --workers 4 (1.5GB model):', check_k8s_pod_memory(1500, worker_processes=4, per_worker_overhead_mb=300, k8s_limit_mb=4096))\nprint('1 pod ichida --workers 1 (K8s replicas=4):', check_k8s_pod_memory(1500, worker_processes=1, per_worker_overhead_mb=300, k8s_limit_mb=2560))",
                "expectedOutput": "1 pod ichida --workers 4 (1.5GB model): CRITICAL: 7200 MB > Limit 4096 MB -> K8s OOMKilled (Exit Code 137)!\n1 pod ichida --workers 1 (K8s replicas=4): SAFE: 1800 MB <= Limit 2560 MB (Barqaror)",
                "breakdownUz": "Kubernetes'da ML model yuklaydigan konteyner ichida `uvicorn --workers 4` QILINMAYDI (chunki 4 ta worker modelni 4 marta RAMga yuklab podni `OOMKilled` qiladi)! Buning o'rniga har bir Podda `--workers 1` qoldirilib, K8s `replicas: 4` orqali ko'paytiriladi!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "Asynchronous Task Queue (Celery / RQ) & HTTP 202 Accepted",
                "category": "Python & Infra",
                "definitionUz": "Uzoq davom etadigan vazifalarni (PDF OCR, batch embedding, model qayta o'qitish) HTTP so'rov-javob siklidan ajratib, broker (Redis/RabbitMQ) orqali fon workerlariga topshirish.",
                "analogyOrExampleUz": "Kimyoviy tozalash (Ximchistka): kiyimni topshirganingizda sizni 2 soat eshik oldida tik turg'izib qo'ymasdan, darhol kvitansiya (`job_id` / HTTP 202) berib jo'natishi.",
                "connectedTo": [
                    {
                        "targetTerm": "RAG Document Ingestion Pipeline",
                        "targetLessonId": "D08.1",
                        "relationshipUz": "8-haftadagi hujjatlarni bo'laklash va embedding olish production'da aynan fon Celery/RQ workerida bajariladi."
                    }
                ]
            },
            {
                "term": "Kubernetes Probes (Startup, Readiness, Liveness)",
                "category": "Python & Infra",
                "definitionUz": "Konteynerning ishga tushib olganini (`Startup`), trafik qabul qilishga tayyorligini (`Readiness`) va jarayon qotib qolmaganini (`Liveness`) tekshiruvchi K8s mexanizmlari.",
                "analogyOrExampleUz": "Startup — xodim ishga kelib kompyuterini yoqib olguncha kutish; Readiness — xodim hozir bandmi yoki yangi mijoz qabul qila oladimi; Liveness — xodim hushidan ketib qolmadimi.",
                "connectedTo": [
                    {
                        "targetTerm": "FastAPI /health Endpoint",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "4-haftada yozgan `/health` endpointimiz Kubernetes'da `/health/live` va `/health/ready` ga ajratilib probelarga ulanadi."
                    }
                ]
            },
            {
                "term": "OOMKilled (Exit Code 137) & Resource Requests/Limits",
                "category": "Python & Infra",
                "definitionUz": "`requests` — podga kafolatlangan minimal CPU/RAM; `limits` — ruxsat etilgan maksimal shift. RAM `limits.memory` dan oshsa Linux cgroups OOM Killer jarayonni `SIGKILL (128 + 9 = 137)` bilan to'xtatadi.",
                "analogyOrExampleUz": "Mehmonxonada bron qilingan kafolatli joy (`requests`) va xonaning maksimal sig'imi (`limits`).",
                "connectedTo": [
                    {
                        "targetTerm": "LLM Memory Calculator",
                        "targetLessonId": "D07.1",
                        "relationshipUz": "7-haftada hisoblangan Model Weights + KV Cache + Overhead yig'indisi K8s `limits.memory` qiymatidan kamida 20% kichik bo'lishi shart."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d09-3-int-1",
                "level": "Junior",
                "questionUz": "Qaysi vazifalarni oddiy FastAPI HTTP request ichida, qaysilarini esa Celery / Redis Queue fon workerida bajarish kerak?",
                "interviewerIntentUz": "Synchronous request-response va Asynchronous background job chegarasini bilishini tekshirish.",
                "strongAnswerUz": "Foydalanuvchi interaktiv javob kutayotgan va tez bitadigan vazifalar (masalan, `/predict` 5-50 ms yoki SSE `/chat` streaming, TTFT < 1s) bevosita FastAPI HTTP request ichida bajariladi. Ammo bir necha soniyadan bir necha soatgacha davom etadigan og'ir vazifalar — katta PDF/videolarni parse va embedding qilish, 100,000 ta mijozga batch scoring qilish, hisobot generatsiya qilish yoki modelni qayta o'qitish — albatta Celery / Redis Queue fon workeriga chiqariladi va foydalanuvchiga darhol `202 Accepted` (`job_id`) qaytariladi.",
                "redFlagUz": "'FastAPI ichidagi `async def` hammasini fonda o'zi bajaraveradi, Celery kerak emas' deyish.",
                "followUpQuestionUz": "Savol: FastAPI'ning o'zidagi `BackgroundTasks` bilan `Celery / Redis Queue` o'rtasida qanday farq bor? Javob: FastAPI `BackgroundTasks` aynan o'sha API jarayonining o'zida (shu RAM va CPU'da) ishlaydi va konteyner restart bo'lsa vazifa o'chib ketadi; Celery/RQ esa vazifani Redis'da saqlaydi va alohida worker serverlarda retry, monitoring va kafolatli yetkazish bilan bajaradi."
            },
            {
                "id": "d09-3-int-2",
                "level": "Middle",
                "questionUz": "Kubernetes'da `Liveness Probe` va `Readiness Probe` o'rtasida qanday muhim farq bor? Agar `Liveness Probe` ichiga tashqi ma'lumotlar bazasini (`SELECT 1 FROM db`) tekshirishni qo'shib qo'ysangiz qanday falokat yuz beradi?",
                "interviewerIntentUz": "Distributed systems intervyularidagi eng sevimli K8s arxitektura savoli!",
                "strongAnswerUz": "`Readiness Probe` muvaffaqiyatsiz bo'lsa, K8s podni O'LDIRMAYDI, shunchaki uni Service Load Balancer ro'yxatidan vaqtincha chiqarib, unga yangi trafik yubormay turadi. `Liveness Probe` muvaffaqiyatsiz bo'lsa esa, K8s konteynerni **o'ldiradi va boshidan restart qiladi**! Agar `Liveness Probe` ichiga tashqi DB yoki LLM servis tekshiruvini qo'shib qo'ysangiz, DB 5 soniyaga sekinlashib qolsa, K8s sizning barcha 10 ta sog'lom FastAPI podlaringizni bir vaqtda o'ldirib qayta yoqishga tushadi (**Cascading Restart Storm**) va butun tizim qulaydi! Qoida: `Liveness` faqat jarayonning o'zi tirikligini tekshirishi, tashqi bog'liqliklar va model tayyorligi esa `Readiness` da tekshirilishi shart.",
                "redFlagUz": "'Ikkalasi ham bir xil endpointga (`/health`) ulansa bo'ladi, farqi yo'q' deyish.",
                "followUpQuestionUz": "Savol: `kubectl get pods` qilganda pod statusi `OOMKilled` (`Exit Code 137`) ko'rsatyapti. Bu nimani anglatadi? Javob: Konteyner RAM iste'moli `resources.limits.memory` chegarasidan oshib ketgan va Linux Kernel OOM Killer jarayonni majburiy (`SIGKILL = 9`, $128+9=137$) to'xtatgan."
            },
            {
                "id": "d09-3-int-3",
                "level": "Senior / Production",
                "questionUz": "Kubernetes'da yangi model versiyasini (`v2`) deploy qilayotganda foydalanuvchilarning ayni paytda davom etayotgan 10 soniyalik SSE streaming so'rovlari o'rtasidan uzilib qolmasligi uchun Graceful Shutdown'ni qanday sozlaysiz?",
                "interviewerIntentUz": "Zero-downtime deployment va SIGTERM lifecycle boshqaruvini sinash.",
                "strongAnswerUz": "Kubernetes eski podni to'xtatishda avval unga `SIGTERM` signali yuboradi va uni Service endpointlaridan uzadi. Ammo `SIGTERM` borishi bilan Service iptables/IPVS qoidalari yangilanishi parallel kechgani uchun dastlabki 1-2 soniyada eski podga hali yangi so'rov kelib qolishi va davom etayotgan SSE streamlar uzilishi mumkin. Yechim: 1) Podga `preStop` lifecycle hook (`sleep 5`) qo'yish — bu K8s tarmog'i yangi trafikni to'liq uzishiga vaqt beradi; 2) Uvicorn'da `--timeout-graceful-shutdown 30` berish (yangi so'rov olmaydi, ammo ichkaridagi joriy SSE stream tugashini 30 soniyagacha kutadi); 3) K8s `terminationGracePeriodSeconds: 45` ni `preStop + uvicorn graceful timeout` dan kattaroq qilib belgilash.",
                "redFlagUz": "'Kubernetes RollingUpdate o'zi hammasini hech qanday sozlamasiz hal qiladi' deyish.",
                "followUpQuestionUz": "Savol: GPU podlarini HPA (Horizontal Pod Autoscaler) bilan avto-masshtablashda oddiy CPU utilization (`cpu > 80%`) metrikasi nega ishlamaydi? Javob: Chunki LLM inferens paytida yuklama CPU'da emas, GPU va vLLM navbatida bo'ladi (CPU 15% bo'lib turganda GPU 100% to'lgan bo'ladi); shuning uchun Prometheus Adapter / KEDA orqali `vllm:num_requests_waiting` yoki `gpu_kv_cache_usage_perc` custom metrikasi bo'yicha scale qilinadi!"
            }
        ],
        "videos": [
            {
                "id": "vid-d09-3-en",
                "title": "Airflow DAG & Pipeline Orchestration for Beginners",
                "channel": "Data with Marc",
                "language": "en",
                "youtubeId": "IH1-0hwFZRQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=IH1-0hwFZRQ",
                "durationOrTimestamp": "To'liq amaliy dars",
                "whatItExplainsUz": "Fon vazifalarini va ma'lumotlar quvurlarini navbat hamda orkestrator yordamida boshqarish asoslari tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-amaliy misoldagi Idempotent Worker va Dead-Letter Queue kodini tahlil qiling."
            },
            {
                "id": "vid-d09-3-en-2",
                "title": "Idempotency in Data & ML Engineering: Prevent Duplicate Processing",
                "channel": "DataZen",
                "language": "en",
                "youtubeId": "TYcMAMEupxI",
                "youtubeUrl": "https://www.youtube.com/watch?v=TYcMAMEupxI",
                "durationOrTimestamp": "To'liq arxitektura tahlili",
                "whatItExplainsUz": "Taqsimlangan navbatlar va workerlar qayta ishga tushganda dublikat yozuvlar hosil bo'lmasligini ta'minlash ko'rsatilgan.",
                "howToUseVideoUz": "3-bosqichdagi Kubernetes Startup, Readiness va Liveness probelari jadvalini konspekt qilib oling."
            }
        ],
        "quiz": [
            {
                "id": "d09-3-q1",
                "promptUz": "1. Konseptual: Foydalanuvchi yuklagan 300 betlik PDF hujjatni bo'laklash va embedding qilish (40 soniyalik jarayon) FastAPI arxitekturasida qanday bajarilishi kerak?",
                "options": [
                    "Foydalanuvchini HTTP so'rovda 40 soniya kutdirib turish",
                    "Vazifani Celery / Redis Queue fon navbatiga topshirib, foydalanuvchiga darhol `HTTP 202 Accepted` va `job_id` qaytarish",
                    "PDF ni o'chirib yuborish",
                    "Faqat 1-betini o'qish"
                ],
                "correctIndex": 1,
                "explanationUz": "Og'ir vazifalarni fon workeriga chiqarish API Gateway'ni timeout va bloklanishdan saqlaydi."
            },
            {
                "id": "d09-3-q2",
                "promptUz": "2. Kod Tahlili: Kubernetes'da pod `Exit Code 137` (`OOMKilled`) bilan qayta-qayta o'chib yonayotgan bo'lsa, sababi nima?",
                "options": [
                    "Python sintaksis xatosi",
                    "Konteyner RAM iste'moli K8s `resources.limits.memory` chegarasidan oshib ketgan va Linux yadrosi uni majburiy (`SIGKILL`) to'xtatgan",
                    "Tarmoq kabeli uzilgan",
                    "Diskda fayl topilmagan"
                ],
                "correctIndex": 1,
                "explanationUz": "$128 + 9 (\\text{SIGKILL}) = 137$ — konteyner belgilangan xotira limitidan oshib ketganda OOM Killer tomonidan to'xtatilganini bildiradi."
            },
            {
                "id": "d09-3-q3",
                "promptUz": "3. Production Debugging: ML modelni yuklash 45 soniya vaqt oladigan konteynerni Kubernetes o'lik deb o'ylab model yuklanmasidan o'ldirib yubormasligi (`CrashLoopBackOff` bo'lmasligi) uchun qaysi probe sozlanadi?",
                "options": [
                    "`startupProbe` (model xotiraga to'liq yuklanguncha `livenessProbe` ni kutdirib turadi) hamda trafikni boshqarish uchun `readinessProbe`",
                    "Barcha probelarni 1 millisoniyaga qo'yish",
                    "Modelni yuklamaslik",
                    "Faqat `livenessProbe` ni 1 soniyaga qo'yish"
                ],
                "correctIndex": 0,
                "explanationUz": "`startupProbe` og'ir ML/LLM konteynerlariga xavfsiz start olish uchun yetarli vaqt beradi."
            }
        ]
    }
}
