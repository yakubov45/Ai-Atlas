# -*- coding: utf-8 -*-
"""
Enrichment data for Weeks 2 and 3 (D02.1 - D03.4)
"""

ENRICH_W2_W3 = {
    "D02.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Python List vs NumPy ndarray — Xotira Arxitekturasi",
                "explanationUz": "Oddiy Python `list` ichidagi har bir element — xotiraning turli burchaklarida yotgan 28 baytlik `PyObject` ko'rsatkichi (pointer). 1 million sonni `for` siklida qo'shganda Python 1 million marta tip tekshiradi va xotirada sakraydi (Cache Miss). `NumPy ndarray` esa barcha sonlarni (masalan `float32` = 4 bayt) operativ xotirada uzluksiz ketma-ket (C-contiguous buffer) saqlaydi va protsessorning SIMD (Single Instruction, Multiple Data) registrlari orqali bitta taktda 8-16 ta sonni bir vaqtda hisoblaydi.",
                "codeExample": "import numpy as np\n\narr = np.array([10.5, 20.0, 35.5, 50.0], dtype=np.float32)\nprint('Element turi (dtype):', arr.dtype)\nprint('Bitta element hajmi (bayt):', arr.itemsize)\nprint('Jami massiv bufer hajmi (bayt):', arr.nbytes)\nprint('Strides (keyingi elementgacha bayt qadami):', arr.strides)",
                "outputOrNoteUz": "Natija: `float32` turidagi 4 ta element jami atigi 16 bayt joy oladi va har 4 baytda keyingi element joylashgan."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Broadcasting Qoidalari (Nusxa Olmasdan Kengaytirish)",
                "explanationUz": "O'lchamlari turlicha bo'lgan massivlar ustida arifmetik amal bajarilganda NumPy kichik massivni xotirada ko'paytirmasdan (`stride=0` virtual ko'rinish orqali) katta massiv o'lchamiga moslashtiradi. Qoida: o'lchamlar o'ngdan chapga solishtiriladi; ikki o'lcham mos bo'lishi uchun ular teng bo'lishi yoki ulardan biri `1` ga teng bo'lishi shart (masalan `(5, 3)` va `(1, 3)` -> mos; `(5, 3)` va `(5,)` -> xato, `(5, 1)` qilish kerak).",
                "codeExample": "import numpy as np\n\n# 4 ta filialning 3 oylik savdosi: shape (4, 3)\nsales = np.array([[100, 120, 150],\n                  [80,  90,  110],\n                  [200, 210, 250],\n                  [60,  75,  95]], dtype=np.float64)\n\n# Har bir oy uchun soliq koeffitsienti: shape (3,)\ntax_rate = np.array([0.12, 0.12, 0.15])\n\nnet_sales = sales * (1.0 - tax_rate)  # (4, 3) * (3,) -> Broadcasting!\nprint('Broadcasting natijasi shape:', net_sales.shape)\nprint('1-filial sof savdo:', net_sales[0])",
                "outputOrNoteUz": "Natija: `(3,)` vektor avtomatik `(1, 3)` va keyin `(4, 3)` shaklga virtual yoyilib, hech qanday `for` siklisiz barcha 4 ta filial uchun hisoblandi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: View vs Copy va Boolean Masking",
                "explanationUz": "NumPy'da oddiy kesish (`slice = arr[1:3]`) yangi massiv yaratmaydi, balki asl massiv xotirasiga qaragan **View** (oyna) qaytaradi — ya'ni `slice[0] = 999` qilsangiz asl massiv ham o'zgarib ketadi! Boolean masking (`arr[arr > 0]`) esa har doim yangi **Copy** (nusxa) qaytaradi.",
                "codeExample": "import numpy as np\n\nbase = np.array([10, 20, 30, 40, 50])\nview_slice = base[1:4]       # View (xotira umumiy)\nsafe_copy = base[1:4].copy() # Mustaqil nusxa\n\nview_slice[0] = 999\nprint('View o\\'zgarganda asl massiv:', base)\nprint('Oldindan olingan .copy() nusxasi:', safe_copy)",
                "outputOrNoteUz": "Natija: `base` massivning 1-indeksi `999` bo'lib ketdi! Asl ma'lumotni buzmaslik uchun `.copy()` ishlatish zarur."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Z-Score Normalizatsiya (Feature Scaling) Vektorli Usulda",
                "scenarioUz": "ML modelga uzatishdan oldin ustunlardagi qiymatlarni o'rtachasi 0 va standart og'ishi 1 bo'lgan masshtabga (`z = (X - mean) / std`) keltirish.",
                "howToUseUz": "Kodni ishga tushiring va `axis=0` ustunlar bo'yicha qanday ishlashini kuzating.",
                "code": "import numpy as np\n\n# 4 ta mijoz: [Yosh, Oylik daromad (so'm), Xaridlar soni]\nX = np.array([\n    [22, 4_000_000, 3],\n    [35, 12_000_000, 15],\n    [48, 18_000_000, 25],\n    [29, 8_000_000, 9]\n], dtype=np.float64)\n\nmean = X.mean(axis=0, keepdims=True) # shape (1, 3)\nstd = X.std(axis=0, keepdims=True) + 1e-8\nX_norm = (X - mean) / std\n\nprint('Ustunlar o\\'rtachasi (normalizatsiyadan so\\'ng):', np.round(X_norm.mean(axis=0), 4))\nprint('Normalizatsiya qilingan matritsa:\\n', np.round(X_norm, 3))",
                "expectedOutput": "Ustunlar o'rtachasi (normalizatsiyadan so'ng): [0. 0. 0.]\nNormalizatsiya qilingan matritsa:\n [[-1.183 -1.249 -1.225] ...]",
                "breakdownUz": "`keepdims=True` o'lchamni `(1, 3)` holatda ushlab turadi, bu esa broadcasting paytida o'lcham xatolarining oldini oladi."
            },
            {
                "titleUz": "2-misol: np.where Bilan Vektorli Shartli Kategoriyalash",
                "scenarioUz": "Millionlab tranzaksiyalarni `if/else` siklisiz 'VIP', 'Standard' yoki 'Micro' segmentlarga ajratish.",
                "howToUseUz": "Ichma-ich `np.where` orqali vektorli segmentatsiyani sinab ko'ring.",
                "code": "import numpy as np\n\namounts = np.array([15_000, 250_000, 1_500_000, 80_000, 3_200_000])\nsegments = np.where(\n    amounts >= 1_000_000, 'VIP',\n    np.where(amounts >= 100_000, 'STANDARD', 'MICRO')\n)\nfor amt, seg in zip(amounts, segments):\n    print(f'{amt:>10,} UZS -> {seg}')",
                "expectedOutput": "    15,000 UZS -> MICRO\n   250,000 UZS -> STANDARD\n 1,500,000 UZS -> VIP...",
                "breakdownUz": "`np.where(condition, x, y)` C darajasida butun massiv bo'ylab shartni parallel tekshiradi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Vectorization & SIMD",
                "category": "Data & SQL",
                "definitionUz": "Skalyar sikllardan (`for`) voz kechib, butun massiv ustida protsessorning vektorli registrlari orqali bitta komanda bilan amal bajarish.",
                "analogyOrExampleUz": "G'ishtlarni bittalab qo'lda tashish o'rniga, poddon bilan kran yordamida bir ko'tarishda ko'chirish.",
                "connectedTo": [
                    {
                        "targetTerm": "Cosine Similarity Matrix",
                        "targetLessonId": "D03.1",
                        "relationshipUz": "3-haftada minglab vektorlar o'rtasidagi o'xshashlikni bitta matritsa ko'paytmasi (`A @ B.T`) bilan hisoblashning asosi."
                    },
                    {
                        "targetTerm": "PyTorch GPU Tensors",
                        "targetLessonId": "D05.2",
                        "relationshipUz": "5-haftada NumPy `ndarray` tushunchasi bevosita minglab GPU yadrolarida ishlovchi PyTorch `Tensor`lariga aylanadi."
                    }
                ]
            },
            {
                "term": "Broadcasting",
                "category": "Data & SQL",
                "definitionUz": "Mos keluvchi turli o'lchamli massivlar ustida xotiradan ortiqcha nusxa olmasdan arifmetik amal bajarish mexanizmi.",
                "analogyOrExampleUz": "Bitta shtamp (muhr) ni mingta qog'oz varag'iga ketma-ket bosish — muhrdan mingta yasash shart emas.",
                "connectedTo": [
                    {
                        "targetTerm": "Attention Masking in Transformers",
                        "targetLessonId": "D06.2",
                        "relationshipUz": "6-haftada Transformer Self-Attention matritsasiga `(Batch, 1, Seq, Seq)` o'lchamli causal maskani qo'shishda broadcasting ishlatiladi."
                    }
                ]
            },
            {
                "term": "Memory View vs Copy",
                "category": "Data & SQL",
                "definitionUz": "View — mavjud massiv xotira buferiga yangi metadata (offset/strides) bilan qarash; Copy — xotirada yangi mustaqil bufer ajratish.",
                "analogyOrExampleUz": "View — bitta Google Docs hujjatiga ikki kishi bir vaqtda kirib tahrirlashi; Copy — faylni yuklab olib alohida o'zgartirish.",
                "connectedTo": [
                    {
                        "targetTerm": "Zero-Copy Apache Arrow (Polars)",
                        "targetLessonId": "D02.2",
                        "relationshipUz": "Keyingi darsda Polars va DuckDB ma'lumotlarni bir-biriga nusxa olmasdan (Zero-Copy) uzatishda shu prinsipdan foydalanadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d02-1-int-1",
                "level": "Junior",
                "questionUz": "Nima uchun NumPy massivi oddiy Python ro'yxatidan (`list`) 50-100 barobar tezroq ishlaydi va kamroq xotira oladi?",
                "interviewerIntentUz": "Nomzodning C-contiguous xotira, boxing/unboxing va CPU cache locality tushunchalarini bilishini tekshirish.",
                "strongAnswerUz": "Uchta asosiy sabab bor: 1) Bir jinslilik (`homogenous dtype`): har bir elementda `PyObject` sarlavhasi va tip tekshiruvi yo'q; 2) Xotira ketma-ketligi (`Contiguous Memory`): elementlar RAMda yonma-yon turgani uchun CPU L1/L2 keshiga butun blok bo'lib yuklanadi (cache locality); 3) C/Fortran darajasidagi SIMD vektorli protsessor ko'rsatmalari Python GIL va bytecode interpretatsiyasisiz bajariladi.",
                "redFlagUz": "'Chunki NumPy yangi kutubxona va C++ da yozilgan' deb yuza javob berish.",
                "followUpQuestionUz": "Savol: `np.array([1, 2.5, 'uch'])` qilsangiz `dtype` nima bo'ladi? Javob: Barcha elementlar eng umumiy tip bo'lgan Unicode string (`<U32`) ga majburan o'tkaziladi (upcasting) va sonli tezlik yo'qoladi."
            },
            {
                "id": "d02-1-int-2",
                "level": "Middle",
                "questionUz": "`A` massiv o'lchami `(32, 1, 64)` va `B` massiv o'lchami `(10, 64)`. `A + B` amali bajariladimi va natija shape qanday bo'ladi?",
                "interviewerIntentUz": "Broadcasting qoidalarini aniq hisoblay olishini tekshirish.",
                "strongAnswerUz": "Ha, bajariladi! O'ngdan chapga tekshiramiz: `(32, 1, 64)` va `(1, 10, 64)` (chap tomonga `1` qo'shiladi). Oxirgi o'lcham: `64 == 64` (mos); o'rta o'lcham: `1` va `10` -> `10` ga kengayadi; birinchi o'lcham: `32` va `1` -> `32` ga kengayadi. Yakuniy natija o'lchami `(32, 10, 64)` bo'ladi.",
                "redFlagUz": "'Xato beradi, chunki birida 3 ta o'lcham, ikkinchisida 2 ta o'lcham bor' deyish.",
                "followUpQuestionUz": "Savol: `(100, 5)` massivdan har bir qatorning o'z o'rtachasini (`shape (100,)`) ayirish uchun nima qilish kerak? Javob: `X - X.mean(axis=1, keepdims=True)` (shape `(100, 1)` bo'lishi shart)."
            },
            {
                "id": "d02-1-int-3",
                "level": "Senior / Production",
                "questionUz": "NumPy'da `arr.reshape()` bilan `arr.T` (transpozitsiya) xotirada yangi massiv yaratadimi? Bu production tezligiga qanday ta'sir qiladi?",
                "interviewerIntentUz": "Strides va C-order vs Fortran-order xotira o'qish tezligini tushunishini sinash.",
                "strongAnswerUz": "`arr.T` xotiradan nusxa olmaydi (`O(1)` vaqt), u shunchaki `shape` va `strides` juftligini teskari qilib qo'yadi (View). Ammo transpozitsiyadan keyin massiv C-contiguous bo'lmay qoladi. Agar keyingi qadamda qatorlar bo'yicha og'ir matritsa amali yoki C-kutubxona chaqirilsa, xotirada katta qadam bilan sakrab o'qish (cache thrashing) sababli tezlik 3-5 barobar tushib ketishi yoki yashirin `np.ascontiguousarray()` nusxasi yaratilishi mumkin.",
                "redFlagUz": "'Transpozitsiya hamma elementlarni yangidan ko'chirib yozadi' deyish.",
                "followUpQuestionUz": "Savol: Massiv contiguous ekanini qanday tekshirasiz? Javob: `arr.flags['C_CONTIGUOUS']` orqali."
            }
        ],
        "videos": [
            {
                "id": "vid-d02-1-en",
                "title": "Embeddings Explained: Vectors, Cosine Similarity & Vector Operations",
                "channel": "kodblok",
                "language": "en",
                "youtubeId": "jmZhhCcqygM",
                "youtubeUrl": "https://www.youtube.com/watch?v=jmZhhCcqygM",
                "durationOrTimestamp": "To'liq vizual dars",
                "whatItExplainsUz": "Vektorlar va massivlar ustida matematik amallar AI va ma'lumotlar tahlilida qanday ishlashi vizual ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi vektor amallarini ko'rgach, yuqoridagi Z-score normalizatsiya kodida `axis=0` ni `axis=1` ga o'zgartirib, natija qanday farq qilishini Python muharririda sinang."
            },
            {
                "id": "vid-d02-1-uz",
                "title": "Algoritmlar va Ma'lumot Tuzilmalari — Xotira va Massivlar",
                "channel": "Azim Pulat",
                "language": "uz",
                "youtubeId": "WqrbIUggEXQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=WqrbIUggEXQ",
                "durationOrTimestamp": "Massivlar va xotira bo'limi",
                "whatItExplainsUz": "Ma'lumot tuzilmalarining operativ xotirada (RAM) joylashishi va indeks bo'yicha `O(1)` murojaat mexanizmi o'zbek tilida tushuntirilgan.",
                "howToUseVideoUz": "Massiv xotira adreslari qanday hisoblanishini (`base_addr + index * itemsize`) NumPy `strides` bilan bog'lab tahlil qiling."
            }
        ],
        "quiz": [
            {
                "id": "d02-1-q1",
                "promptUz": "1. Konseptual: Nima uchun NumPy hisob-kitoblari oddiy Python ro'yxatlaridan ancha tez ishlaydi?",
                "options": [
                    "NumPy matnlarni avtomatik o'chirib tashlagani uchun",
                    "Massivlar C xotira tartibida ketma-ket saqlanadi va SIMD vektorli protsessor amallaridan foydalanadi",
                    "Faqat bulut serverlarida ishlagani uchun",
                    "Faqat butun sonlarni qabul qilgani uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "Xotira ketma-ketligi va protsessorning vektorli ko'rsatmalari (SIMD) yuqori tezlikni ta'minlaydi."
            },
            {
                "id": "d02-1-q2",
                "promptUz": "2. Kod Tahlili: `a = np.array([1, 2, 3, 4]); b = a[:2]; b[0] = 99` bajarilganda `a[0]` qiymati nima bo'ladi?",
                "options": [
                    "1 bo'lib qoladi",
                    "99 ga o'zgaradi, chunki oddiy kesish (`a[:2]`) yangi nusxa emas, balki View (umumiy xotira oynasi) qaytaradi",
                    "IndexError xatosi beradi",
                    "0 ga aylanadi"
                ],
                "correctIndex": 1,
                "explanationUz": "NumPy slicing xotirani tejash uchun View qaytaradi; mustaqil nusxa olish uchun `a[:2].copy()` yozish kerak."
            },
            {
                "id": "d02-1-q3",
                "promptUz": "3. Production Debugging: `X` matritsa o'lchami `(500, 10)`. `X - X.mean(axis=1)` yozilganda `ValueError: operands could not be broadcast together with shapes (500,10) (500,)` xatosi chiqdi. Qanday tuzatiladi?",
                "options": [
                    "`X.mean(axis=1, keepdims=True)` ishlatib o'rtachani `(500, 1)` shaklida saqlash kerak",
                    "`X` matritsani ro'yxatga o'tkazish kerak",
                    "`axis=5` berish kerak",
                    "NumPy versiyasini pasaytirish kerak"
                ],
                "correctIndex": 0,
                "explanationUz": "`(500, 10)` va `(500, 1)` o'ngdan chapga solishtirilganda `10` va `1` mos tushadi va har bir qatordan o'z o'rtachasi ayiriladi."
            }
        ]
    },
    "D02.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Pandas (Eager) vs Polars (Lazy + Apache Arrow)",
                "explanationUz": "Pandas har bir qadamni darhol bajaradi (`Eager execution`) va har bir oraliq amal uchun RAMda yangi DataFrame nusxasini yaratadi (masalan 2 GB jadval uchun 10-15 GB RAM ketishi mumkin). Rust tilida yozilgan `Polars` esa **Apache Arrow** ustunli xotira formatida ishlaydi, barcha CPU yadrolarini parallel ishlatadi va `LazyFrame` (`.lazy()`) rejimida so'rovlar rejasini (`Query Plan`) tuzib, faqat kerakli ustun va qatorlarnigina diskdan o'qiydi.",
                "codeExample": "# Pandas va Polars mantiqiy taqqoslovi (standart Python simulyatsiyasi):\ndata = [\n    {'user_id': 101, 'status': 'PAID', 'amount': 250_000},\n    {'user_id': 102, 'status': 'PENDING', 'amount': 120_000},\n    {'user_id': 101, 'status': 'PAID', 'amount': 300_000},\n    {'user_id': 103, 'status': 'CANCELLED', 'amount': 80_000},\n]\n# Predicate Pushdown: avval faqat PAID filtrlanadi, keyin guruhlanadi\ntotals = {}\nfor row in data:\n    if row['status'] == 'PAID':\n        totals[row['user_id']] = totals.get(row['user_id'], 0) + row['amount']\nprint('PAID mijozlar jami xaridi:', totals)",
                "outputOrNoteUz": "Natija: `{101: 550000}`. Polars LazyFrame aynan shu kabi filtrni eng boshga surib (Predicate Pushdown), keraksiz qatorlarni umuman xotiraga olmaydi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Ustun Turlarini Optimallashtirish (Downcasting & Categoricals)",
                "explanationUz": "Pandas'da CSV o'qilganda butun sonlar avtomatik `int64` (8 bayt), kasr sonlar `float64` (8 bayt), takrorlanuvchi matnlar (`'Toshkent'`, `'Samarqand'`) esa og'ir `object` (har biri ~50+ bayt) bo'lib yuklanadi. Yosh ustunini `int8` (-128..127, 1 bayt) ga, viloyat nomini esa `category` (lug'at indeksi) ga o'tkazish DataFrame xotira hajmini **70-85% ga qisqartiradi**.",
                "codeExample": "rows_count = 1_000_000\nint64_mb = (rows_count * 8) / (1024 ** 2)\nint8_mb = (rows_count * 1) / (1024 ** 2)\nstr_obj_mb = (rows_count * 56) / (1024 ** 2)\ncat_mb = (rows_count * 1 + 12 * 56) / (1024 ** 2)\n\nprint(f'Yosh ustuni: int64 = {int64_mb:.2f} MB -> int8 = {int8_mb:.2f} MB')\nprint(f'Viloyat ustuni (12 xil): object = {str_obj_mb:.2f} MB -> category = {cat_mb:.2f} MB')",
                "outputOrNoteUz": "Natija: 1 million qatorda bitta viloyat ustuni 53.4 MB dan 0.95 MB ga tushadi (55 barobar tejamkorlik!)."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: CSV vs Parquet — Ustunli (Columnar) Saqlash",
                "explanationUz": "CSV — matnli qator formati bo'lib, unda tiplar saqlanmaydi va 50 ta ustundan 2 tasini o'qish uchun ham butun faylni boshidan oxirigacha parse qilishga to'g'ri keladi. **Apache Parquet** esa binar ustunli format: u har bir ustunni alohida siqadi (ZSTD/Snappy), tiplar sxemasini saqlaydi va min/max statistika yordamida keraksiz bloklarni o'qimasdan tashlab ketadi.",
                "codeExample": "formats = [\n    ('CSV (Matnli, qatorli)', '1000 MB', '18.5 sek', 'Tiplar yo\\'qoladi'),\n    ('Parquet (Binar, ustunli)', '140 MB', '0.6 sek', 'Tiplar + Statistika saqlanadi'),\n]\nfor fmt, size, read_time, note in formats:\n    print(f'{fmt:26} | Hajm: {size:8} | O\\'qish: {read_time:9} | {note}')",
                "outputOrNoteUz": "Natija: Parquet fayli diskda 7 barobar kam joy oladi va analitik so'rovlarda 30 barobar tezroq o'qiladi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Guruhlash va Agregatsiya (GroupBy + Window ulushi)",
                "scenarioUz": "Har bir savdo kategoriyasining umumiy tushumdagi foiz ulushini va o'rtacha chekini hisoblash.",
                "howToUseUz": "Quyidagi analitik agregatsiya kodini ishga tushiring.",
                "code": "orders = [\n    {'cat': 'Elektronika', 'amount': 4_500_000},\n    {'cat': 'Elektronika', 'amount': 3_500_000},\n    {'cat': 'Kiyim', 'amount': 800_000},\n    {'cat': 'Kiyim', 'amount': 1_200_000},\n    {'cat': 'Kitoblar', 'amount': 500_000},\n]\n\ntotal_rev = sum(o['amount'] for o in orders)\nby_cat = {}\nfor o in orders:\n    c = o['cat']\n    by_cat.setdefault(c, []).append(o['amount'])\n\nfor cat, vals in by_cat.items():\n    s = sum(vals)\n    share = (s / total_rev) * 100\n    print(f'{cat:12} | Soni: {len(vals)} | Jami: {s:>10,} | Ulushi: {share:5.1f}%')",
                "expectedOutput": "Elektronika  | Soni: 2 | Jami:  8,000,000 | Ulushi:  76.2%\nKiyim        | Soni: 2 | Jami:  2,000,000 | Ulushi:  19.0%\nKitoblar     | Soni: 1 | Jami:    500,000 | Ulushi:   4.8%",
                "breakdownUz": "Pandas'da bu `df.groupby('cat')['amount'].agg(['count', 'sum'])` va Polars'da `df.group_by('cat').agg(pl.col('amount').sum())` orqali bajariladi."
            },
            {
                "titleUz": "2-misol: SettingWithCopy xatosining oldini olish va Method Chaining",
                "scenarioUz": "DataFrame'ni filtrlash va yangi ustun qo'shishda asl jadvalni buzib qo'ymasdan toza transformatsiya zanjiri qurish.",
                "howToUseUz": "Funksiya orqali toza transformatsiya quvurini sinab ko'ring.",
                "code": "def transform_transactions(records: list[dict]) -> list[dict]:\n    # Asl ro'yxatni o'zgartirmasdan yangi toza oqim qaytarish (Immutable pipeline)\n    result = []\n    for r in records:\n        if r['amount'] <= 0:\n            continue\n        fee = round(r['amount'] * 0.015, 2)\n        result.append({**r, 'fee': fee, 'net_amount': r['amount'] - fee})\n    return result\n\nraw = [{'id': 1, 'amount': 100_000}, {'id': 2, 'amount': -50}, {'id': 3, 'amount': 250_000}]\nclean = transform_transactions(raw)\nprint('Asl yozuvlar soni:', len(raw), '| Tozalangan:', len(clean))\nfor c in clean:\n    print(c)",
                "expectedOutput": "Asl yozuvlar soni: 3 | Tozalangan: 2\n{'id': 1, 'amount': 100000, 'fee': 1500.0, 'net_amount': 98500.0}...",
                "breakdownUz": "Har bir transformatsiya funksiyasi kiruvchi ma'lumotni mutatsiya qilmasdan (side-effect'siz) yangi natija qaytarishi testlash va debuggingni osonlashtiradi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Predicate & Projection Pushdown",
                "category": "Data & SQL",
                "definitionUz": "So'rov optimizatori tomonidan qator filtrlarini (`Predicate`) va faqat kerakli ustunlarni (`Projection`) faylni o'qish bosqichining eng boshiga ko'chirish.",
                "analogyOrExampleUz": "Kutubxonadan 1000 ta kitobni uyga tashib kelib ichidan bittasini tanlash emas, balki javonning o'zidayoq faqat kerakli kitobning kerakli bobini ochib olish.",
                "connectedTo": [
                    {
                        "targetTerm": "DuckDB In-Process OLAP",
                        "targetLessonId": "D02.4",
                        "relationshipUz": "DuckDB va Polars Parquet fayllarini o'qishda aynan Pushdown orqali gigabaytlab ma'lumotni 1 soniyada tahlil qiladi."
                    }
                ]
            },
            {
                "term": "Apache Parquet & Arrow",
                "category": "Data & SQL",
                "definitionUz": "Parquet — diskda ustunli siqilgan saqlash standarti; Apache Arrow — operativ xotirada (RAM) ustunli Zero-Copy almashinuv standarti.",
                "analogyOrExampleUz": "Parquet — vakuumda siqilgan yuk qutisi (tashish va saqlash uchun); Arrow — ustaxonada darhol ishlashga tayyor ochiq asboblar paneli.",
                "connectedTo": [
                    {
                        "targetTerm": "DVC Data Versioning",
                        "targetLessonId": "D11.1",
                        "relationshipUz": "11-haftada ML datasetlarni versiyalashda CSV o'rniga Parquet formatda saqlash S3 xotira xarajatini va o'qitish vaqtini keskin kamaytiradi."
                    }
                ]
            },
            {
                "term": "Categorical Encoding / Memory Downcasting",
                "category": "Data & SQL",
                "definitionUz": "Takrorlanuvchi satrlarni kichik butun sonli lug'at indekslariga va katta son turlarini (`int64`) kichikroq turlarga (`int16`/`int8`) o'tkazish.",
                "analogyOrExampleUz": "Har safar 'O'zbekiston Respublikasi, Toshkent shahri' deb to'liq yozish o'rniga `01` kodini qo'yib ketish.",
                "connectedTo": [
                    {
                        "targetTerm": "Scikit-Learn ColumnTransformer",
                        "targetLessonId": "D04.1",
                        "relationshipUz": "4-haftada kategorik ustunlar ML model uchun `OneHotEncoder` yoki `TargetEncoder` ga uzatiladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d02-2-int-1",
                "level": "Junior",
                "questionUz": "Pandas'da `df.apply(func, axis=1)` nima uchun katta jadvallarda juda sekin ishlaydi?",
                "interviewerIntentUz": "Vektorli ustun amallari bilan qatorma-qator Python sikli farqini bilishini tekshirish.",
                "strongAnswerUz": "`df.apply(..., axis=1)` aslida kapot ostida oddiy Python `for` siklini aylantiradi va har bir qator uchun yangi `pd.Series` obyektini yaratadi. Bu C/SIMD vektorizatsiyasini butunlay yo'qqa chiqaradi. Uning o'rniga vektorli ustun amallari (`df['a'] + df['b']`, `np.where`, `np.select`) ishlatilsa 50-200 barobar tezroq ishlaydi.",
                "redFlagUz": "'`apply` Pandas'ning eng tez funksiyasi, har doim `apply` ishlatish kerak' deyish.",
                "followUpQuestionUz": "Savol: Polars'da nima uchun custom Python `map_elements` o'rniga Polars Expressions (`pl.col(...)`) ishlatish kerak? Javob: Chunki Polars Expressions Rust dvigatelida parallel va GIL'siz bajariladi."
            },
            {
                "id": "d02-2-int-2",
                "level": "Middle",
                "questionUz": "Nima uchun Data Science va ML quvurlarida CSV o'rniga Parquet formatidan foydalanish standart hisoblanadi?",
                "interviewerIntentUz": "Row-oriented vs Column-oriented storage farqini va I/O bottleneckni tushunishini sinash.",
                "strongAnswerUz": "1) Ustunli (Columnar) tuzilma: 100 ta ustunli jadvaldan 5 ta feature kerak bo'lsa, Parquet diskdan faqat o'sha 5 ta ustunni o'qiydi (Projection Pushdown); 2) Har bir ustun bir xil tipda bo'lgani uchun (masalan, faqat sana yoki faqat kategoriya) Run-Length va Dictionary encoding bilan 5-10 barobar kuchli siqiladi; 3) Sxema (data types) fayl ichida saqlanadi — CSV kabi `'0012'` kodni `12` soniga buzib yubormaydi; 4) Row-group min/max metama'lumotlari orqali filtrga tushmaydigan bloklarni o'qimasdan o'tib ketadi.",
                "redFlagUz": "'Parquet faqat Apache Spark uchun kerak, oddiy Python'da CSV yaxshiroq' deyish.",
                "followUpQuestionUz": "Savol: Qaysi holatda qatorli (Row-oriented) format ustunlidan yaxshiroq? Javob: OLTP tranzaksion bazalarda (masalan PostgreSQL'da bitta mijozning barcha maydonlarini `WHERE user_id = 5` deb tez-tez yangilash va yozishda)."
            },
            {
                "id": "d02-2-int-3",
                "level": "Senior / Production",
                "questionUz": "8 GB RAMli konteynerda 12 GB CSV faylni Pandas bilan `pd.read_csv()` qilganda OOM (Out-of-Memory) bo'lyapti. Kodni qanday qutqarasiz?",
                "interviewerIntentUz": "Real production xotira muammosini hal qilish ko'nikmasini sinash.",
                "strongAnswerUz": "Bir nechta yechim bor: 1) Eng samaralisi — Polars `pl.scan_csv('file.csv').filter(...).group_by(...).collect(streaming=True)` yoki DuckDB ishlatish (streaming rejimda 12 GB faylni 300 MB RAM bilan qayta ishlaydi); 2) Agar Pandas'da qolish shart bo'lsa: `usecols=[...]` bilan faqat kerakli ustunlarni olish, `dtype={'cat': 'category', 'val': 'float32'}` berish va `chunksize=100_000` parametri bilan faylni bo'laklab iterator orqali qayta ishlash.",
                "redFlagUz": "'Pandas o'zi siqib oladi, faqat `low_memory=False` yozish kerak' deyish (`low_memory=False` aksincha ko'proq RAM yeydi!).",
                "followUpQuestionUz": "Savol: Pandas 2.0+ da `dtype_backend='pyarrow'` nima beradi? Javob: NumPy o'rniga Apache Arrow ustunli xotirasini ishlatib, satrlar (`string[pyarrow]`) va `NA` qiymatlarda RAM sarfini 2-4 barobar kamaytiradi."
            }
        ],
        "videos": [
            {
                "id": "vid-d02-2-en",
                "title": "Parquet File Format - Explained to a 5 Year Old!",
                "channel": "Data Mozart",
                "language": "en",
                "youtubeId": "5NA57Pfpdr4",
                "youtubeUrl": "https://www.youtube.com/watch?v=5NA57Pfpdr4",
                "durationOrTimestamp": "To'liq vizual tushuntirish",
                "whatItExplainsUz": "Qatorli (CSV) va ustunli (Parquet) fayl formatlarining diskda qanday saqlanishi, Row Group va siqish mexanizmi juda sodda tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, nima uchun Polars va DuckDB Parquet fayllaridan faqat kerakli ustunlarni millisoniyada o'qib olishini tahlil qiling."
            },
            {
                "id": "vid-d02-2-en-2",
                "title": "Data Cleaning in Pandas | Python Pandas Tutorials",
                "channel": "Alex The Analyst",
                "language": "en",
                "youtubeId": "bDhvCp3_lYw",
                "youtubeUrl": "https://www.youtube.com/watch?v=bDhvCp3_lYw",
                "durationOrTimestamp": "To'liq amaliyot",
                "whatItExplainsUz": "Real jadval ustida dublikatlarni tozalash, ustun tiplarini tekislash va filtrlash qadamma-qadam ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi Pandas amallarini darsdagi Polars `lazy().filter().group_by()` sintaksisi bilan taqqoslab o'rganing."
            }
        ],
        "quiz": [
            {
                "id": "d02-2-q1",
                "promptUz": "1. Konseptual: Polars `LazyFrame` (`.lazy()`) rejimining asosiy ustunligi nimada?",
                "options": [
                    "Faqat kichik jadvallarda ishlaydi",
                    "So'rovni darhol bajarmasdan Query Plan tuzadi, faqat kerakli ustun va qatorlarni o'qiydi (Pushdown) hamda xotirani tejaydi",
                    "Ma'lumotlarni avtomatik rasmga aylantiradi",
                    "Internet tezligini oshiradi"
                ],
                "correctIndex": 1,
                "explanationUz": "Lazy execution butun transformatsiya zanjirini tahlil qilib, ortiqcha hisob-kitob va xotira sarfini kesib tashlaydi."
            },
            {
                "id": "d02-2-q2",
                "promptUz": "2. Kod Tahlili: 10 million qatorli jadvalda `region` ustuni faqat 14 ta viloyat nomidan iborat. Ushbu ustunni `object` (string) dan `category` turiga o'tkazish nima beradi?",
                "options": [
                    "Xotira hajmi o'zgarmaydi",
                    "RAM sarfi 10-50 barobar kamayadi va `groupby('region')` amali keskin tezlashadi",
                    "Barcha viloyat nomlari o'chib ketadi",
                    "Faqat birinchi 14 ta qator qoladi"
                ],
                "correctIndex": 1,
                "explanationUz": "Category turi har bir qatorda uzun matn saqlash o'rniga 1 baytlik butun son indeksini va 14 elementli kichik lug'atni saqlaydi."
            },
            {
                "id": "d02-2-q3",
                "promptUz": "3. Production Debugging: Pandas DataFrame'da 5 million qator ustida murakkab shartli ustun yaratishda qaysi usul ENG SEKIN ishlaydi?",
                "options": [
                    "`np.where()` vektorli funksiyasi",
                    "`df.apply(lambda row: ..., axis=1)` qatorma-qator Python funksiyasi",
                    "`np.select()` vektorli shartlar ro'yxati",
                    "Polars `.with_columns(pl.when(...).then(...))` ifodasi"
                ],
                "correctIndex": 1,
                "explanationUz": "`apply(..., axis=1)` C vektorizatsiyasidan chiqib ketib, har bir qatorni Python obyektiga o'ragan holda sekin siklda aylantiradi."
            }
        ]
    },
    "D02.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Yetishmayotgan Qiymatlar (Missing Data: MCAR, MAR, MNAR)",
                "explanationUz": "Ma'lumot tozalashda barcha `NaN` qiymatlarni ko'r-ko'rona `dropna()` bilan o'chirib tashlash yoki o'rtacha (`mean`) bilan to'ldirish xavfli! Avval sababini aniqlash shart: 1) **MCAR** (Missing Completely at Random) — tasodifiy datchik uzilishi; 2) **MAR** (Missing at Random) — boshqa ustunga bog'liq; 3) **MNAR** (Missing Not at Random) — yuqori daromadli odamlar oyligini ataylab yozmasligi. MNAR holatida `is_income_missing = 1` degan alohida indikator ustun yaratish ML model uchun juda kuchli signal beradi!",
                "codeExample": "records = [\n    {'id': 1, 'salary': 5_000_000},\n    {'id': 2, 'salary': None},      # Yashirilgan daromad\n    {'id': 3, 'salary': 7_000_000},\n    {'id': 4, 'salary': None},\n]\nvalid_salaries = sorted(r['salary'] for r in records if r['salary'] is not None)\nmedian_sal = valid_salaries[len(valid_salaries) // 2]\n\nfor r in records:\n    r['salary_missing_flag'] = 1 if r['salary'] is None else 0\n    r['salary_imputed'] = median_sal if r['salary'] is None else r['salary']\n    print(r)",
                "outputOrNoteUz": "Natija: Ham `salary_missing_flag` (yo'qlik signali) saqlandi, ham `salary_imputed` median bilan to'ldirildi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Outlier (G'ayritabiiy Qiymat) va IQR vs Z-Score",
                "explanationUz": "Agar ma'lumotda bitta xato ekstremal qiymat bo'lsa (masalan oylik maoshlar ichida `999,999,999,999`), oddiy o'rtacha (`mean`) va standart og'ish (`std`) o'zi buzilib ketadi. Shu sababli qiyshiq (skewed) taqsimotlarda **IQR (Interquartile Range = Q3 - Q1)** va **Mediana (Q2)** ishlatiladi, chunki kvantillar ekstremal chetki qiymatlarga chidamli (robust).",
                "codeExample": "import numpy as np\n\nsalaries = np.array([4.0, 4.5, 5.0, 5.2, 5.8, 6.0, 6.5, 7.0, 500.0]) # 500 mln - outlier\nprint(f'Mean (buzilgan): {salaries.mean():.2f} mln | Median (barqaror): {np.median(salaries):.2f} mln')\n\nq1, q3 = np.percentile(salaries, [25, 75])\niqr = q3 - q1\nupper_fence = q3 + 1.5 * iqr\noutliers = salaries[salaries > upper_fence]\nprint(f'Q1={q1}, Q3={q3}, IQR={iqr}, Yuqori chegara={upper_fence} -> Outlierlar: {outliers}')",
                "outputOrNoteUz": "Natija: O'rtacha 60.44 mln ga sakrab ketgan bo'lsa, mediana 5.80 mln da barqaror qoldi va IQR 500.0 ni aniq outlier sifatida tutdi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Simpson Paradoksi va Taqsimot Tahlili",
                "explanationUz": "EDA'da faqat umumiy yig'indi yoki o'rtachaga qarash xavfli: umumiy ma'lumotda ijobiy ko'ringan trend, guruhlarga (masalan, shahar/qishloq yoki mobil/desktop) bo'lib qaralganda teskari bo'lib chiqishi mumkin (**Simpson's Paradox**). Har doim ma'lumotni asosiy segmentlar (`cohort` / `segment`) kesimida tekshirish shart.",
                "codeExample": "# Umumiy konversiya vs platforma kesimida konversiya:\nsegments = {\n    'Mobile':  {'visitors': 9000, 'buyers': 450},  # 5.0%\n    'Desktop': {'visitors': 1000, 'buyers': 150},  # 15.0%\n}\nfor seg, d in segments.items():\n    cr = (d['buyers'] / d['visitors']) * 100\n    print(f'{seg:8}: {d[\"buyers\"]}/{d[\"visitors\"]} -> Konversiya: {cr:.1f}%')",
                "outputOrNoteUz": "Natija: Umumiy konversiya 6.0% ko'rinsa-da, aslida Desktop (15%) va Mobile (5%) bir-biridan 3 barobar farq qiladi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Winsorization (Outlierlarni O'chirmasdan Chegaralash / Clipping)",
                "scenarioUz": "Mijozlarni jadvaldan o'chirib yubormasdan, ekstremal 1% va 99% chetki qiymatlarni chegara nuqtasiga tekislash (`np.clip`).",
                "howToUseUz": "Kodni ishga tushiring va `np.clip` qanday ishlashini ko'ring.",
                "code": "import numpy as np\n\ndata = np.array([-50.0, 12.0, 15.0, 18.0, 22.0, 25.0, 29.0, 31.0, 950.0])\np10, p90 = np.percentile(data, [10, 90])\ncapped = np.clip(data, p10, p90)\n\nprint('Asl qiymatlar:       ', data)\nprint('Clipped (Winsorized):', np.round(capped, 1))",
                "expectedOutput": "Asl qiymatlar:        [-50.  12.  15.  18.  22.  25.  29.  31. 950.]\nClipped (Winsorized): [ -0.4  12.   15.   18.   22.   25.   29.   31.  205.8]",
                "breakdownUz": "Winsorization qatorlarni yo'qotmasdan (sample size saqlanadi), chiziqli modellarni ekstremal shovqindan himoya qiladi."
            },
            {
                "titleUz": "2-misol: Avtomatlashtirilgan Data Quality Audit Funksiyasi",
                "scenarioUz": "Yangi dataset kelganda har bir ustunning bo'sh qiymatlari, dublikatlari va noyob qiymatlar sonini bitta hisobotda chiqarish.",
                "howToUseUz": "Audit funksiyasini ishga tushiring.",
                "code": "dataset = [\n    {'id': 1, 'city': 'Toshkent', 'spend': 120},\n    {'id': 2, 'city': None,       'spend': 85},\n    {'id': 1, 'city': 'Toshkent', 'spend': 120}, # Dublikat\n    {'id': 3, 'city': 'Buxoro',   'spend': None},\n]\n\ncols = dataset[0].keys()\nn = len(dataset)\nunique_rows = len({tuple(r.items()) for r in dataset})\nprint(f'Jami qatorlar: {n} | Dublikat qatorlar: {n - unique_rows}')\nfor c in cols:\n    nulls = sum(1 for r in dataset if r[c] is None)\n    uniq = len({r[c] for r in dataset if r[c] is not None})\n    print(f'Ustun `{c:6}` -> Null: {nulls} ({nulls/n:.0%}) | Unique: {uniq}')",
                "expectedOutput": "Jami qatorlar: 4 | Dublikat qatorlar: 1\nUstun `id    ` -> Null: 0 (0%) | Unique: 3...",
                "breakdownUz": "Har qanday EDA jarayoni model qurishdan oldin aynan shunday Data Health Check jadvalidan boshlanishi shart."
            }
        ],
        "termsAndConnections": [
            {
                "term": "IQR (Interquartile Range) & Robust Statistics",
                "category": "Data & SQL",
                "definitionUz": "75-persentil (`Q3`) va 25-persentil (`Q1`) o'rtasidagi farq (`IQR = Q3 - Q1`). Chetki ekstremal qiymatlarga ta'sirchan bo'lmagan tarqoqlik o'lchovi.",
                "analogyOrExampleUz": "Sinfdagi o'quvchilar bo'yini o'lchaganda eng baland va eng past 25% bolalarni chetga surib, o'rtadagi 50% asosiy guruhni tahlil qilish.",
                "connectedTo": [
                    {
                        "targetTerm": "Latency Percentiles (p50, p95, p99)",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "7 va 10-haftalarda LLM va API tezligini o'lchashda o'rtacha vaqt emas, balki `p95` va `p99` kvantillari ishlatiladi."
                    }
                ]
            },
            {
                "term": "Missing Data Mechanisms (MCAR / MAR / MNAR)",
                "category": "Data & SQL",
                "definitionUz": "Ma'lumot nima sababdan yo'qligini tasniflash tizimi: butunlay tasodifiy (MCAR), kuzatilgan omilga bog'liq (MAR) yoki yashiringan qiymatning o'ziga bog'liq (MNAR).",
                "analogyOrExampleUz": "Imtihonga kelmagan talaba: avtobus buzilgani uchun kelmadi (MCAR) vs tayyorlanmagani uchun ataylab kelmadi (MNAR).",
                "connectedTo": [
                    {
                        "targetTerm": "SimpleImputer in Scikit-Learn Pipeline",
                        "targetLessonId": "D04.1",
                        "relationshipUz": "4-haftada `SimpleImputer(strategy='median', add_indicator=True)` aynan train fold ichida data leakage'siz imputation qiladi."
                    }
                ]
            },
            {
                "term": "Log-Transformation for Skewed Data",
                "category": "Math & Stats",
                "definitionUz": "O'ngga kuchli cho'zilgan (right-skewed: narxlar, daromadlar, ko'rishlar soni) taqsimotni `np.log1p(x)` (`ln(1 + x)`) orqali simmetrik normal shaklga yaqinlashtirish.",
                "analogyOrExampleUz": "Rixter zilzila shkalasi: 10 barobarlik ulkan farqlarni 1, 2, 3 kabi ixcham chiziqli qadamlarga tushirish.",
                "connectedTo": [
                    {
                        "targetTerm": "Linear Regression Residuals",
                        "targetLessonId": "D03.2",
                        "relationshipUz": "3-haftada chiziqli regressiya xatolari (MSE) yirik qiymatlarda portlab ketmasligi uchun target `log1p` bilan transformatsiya qilinadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d02-3-int-1",
                "level": "Junior",
                "questionUz": "Qachon bo'sh qiymatlarni (`NaN`) o'rtacha (`mean`) bilan, qachon `mediana` bilan to'ldirish kerak?",
                "interviewerIntentUz": "Taqsimot shakli (Normal vs Skewed) va outlier ta'sirini tushunishini sinash.",
                "strongAnswerUz": "Agar ustun simmetrik (normalga yaqin) taqsimlangan bo'lsa va unda ekstremal outlierlar bo'lmasa, `mean` ishlatiladi. Ammo moliyaviy va real xulq-atvor ma'lumotlari (uy narxi, maosh, xarid summasi, sessiya vaqti) deyarli har doim kuchli qiyshiq (`skewed`) va outlierlarga boy bo'ladi — bunday holatda `mean` sun'iy shishib ketgani uchun albatta `mediana` (yoki guruh kesimidagi mediana) ishlatish shart.",
                "redFlagUz": "'Farqi yo'q, har doim `fillna(0)` yoki `fillna(df.mean())` qilaman' deyish.",
                "followUpQuestionUz": "Savol: Nima uchun `fillna(0)` xavfli bo'lishi mumkin? Javob: Masalan, bemor harorati yoki uy maydoni ustuniga `0` yozish model uchun mavjud bo'lmagan sun'iy ekstremal nuqta yaratib, regressiya og'irliklarini buzadi."
            },
            {
                "id": "d02-3-int-2",
                "level": "Middle",
                "questionUz": "EDA jarayonida topilgan outlier (chetki qiymat) larni har doim o'chirib tashlash kerakmi?",
                "interviewerIntentUz": "Ma'lumot xatosi bilan haqiqiy muhim biznes signalini farqlay olishini tekshirish.",
                "strongAnswerUz": "Yo'q! Avval outlierning tabiatini aniqlash kerak: 1) Agar bu texnik xato bo'lsa (masalan `yosh = 250` yoki `narx = -100`), uni tozalash yoki `NaN` qilish shart; 2) Agar bu haqiqiy ekstremal hodisa bo'lsa (masalan, Fraud / firibgarlik tranzaksiyasi, VIP mijoz xaridi yoki serverdagi DDoS hujum), uni o'chirib tashlash modelni eng muhim biznes holatiga 'ko'r' qilib qo'yadi. Bunday holda `log1p` transformatsiya, Winsorization (`clip`) yoki Tree-based modellar (Random Forest / LightGBM) qo'llaniladi.",
                "redFlagUz": "'Ha, IQR chegarasidan chiqqan barcha qatorlarni avtomatik o'chirib tashlayman' deyish.",
                "followUpQuestionUz": "Savol: Qaysi ML algoritmlar outlierlarga eng ta'sirchan, qaysilari chidamli? Javob: Chiziqli va masofaga asoslangan modellar (Linear Regression, KNN, K-Means, SVM) juda ta'sirchan; Decision Tree, Random Forest va Gradient Boosting (split nuqtalariga asoslangani uchun) feature outlierlariga chidamli."
            },
            {
                "id": "d02-3-int-3",
                "level": "Senior / Production",
                "questionUz": "Imputation (bo'sh qiymatlarni to'ldirish) va outlier chegaralarini (`Q1`, `Q3`) butun dataset ustida train/test split'dan OLDIN hisoblash nega katta xato?",
                "interviewerIntentUz": "Data Leakage (ma'lumot sizib chiqishi) ning nozik ko'rinishini tushunishini sinash.",
                "strongAnswerUz": "Agar medianani yoki `Q1/Q3` kvantillarini `train_test_split` dan oldin butun jadval bo'yicha hisoblasak, Test to'plamidagi kelajak ma'lumotlarining statistikasi Train to'plamiga sizib o'tadi (**Preprocessing Data Leakage**). Natijada oflayn validatsiya metrikasi sun'iy yuqori chiqadi, production'da esa yangi ma'lumot kelganda model xato qiladi. Barcha statistikalar (`median`, `mean`, `IQR`) FAQAT `X_train` ustida `.fit()` qilinib, `X_test` ga `.transform()` orqali qo'llanilishi shart.",
                "redFlagUz": "'Medianani butun datasetda hisoblasa aniqroq chiqadi, shuning uchun splitdan oldin qilinadi' deyish.",
                "followUpQuestionUz": "Savol: Vaqt qatorlarida (Time Series) bo'sh qiymatlarni `bfill()` (backward fill — kelajakdagi qiymat bilan to'ldirish) qilish mumkinmi? Javob: Aslo yo'q! Bu kelajakdan ma'lumot o'g'irlash (Look-ahead bias) hisoblanadi; faqat `ffill()` (forward fill — o'tmishdagi oxirgi ma'lum qiymat) ruxsat etiladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d02-3-en",
                "title": "Tutorial: Exploratory Data Analysis (EDA) in Python",
                "channel": "Coursera",
                "language": "en",
                "youtubeId": "ZGbI-RZ5KGw",
                "youtubeUrl": "https://www.youtube.com/watch?v=ZGbI-RZ5KGw",
                "durationOrTimestamp": "To'liq EDA amaliyoti",
                "whatItExplainsUz": "Datasetni birinchi marta ochganda taqsimotlarni tekshirish, korrelyatsiya, bo'sh qiymatlar va anomaliyalarni topish ketma-ketligi ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi qadamlarni ko'rib, yuqoridagi `Data Quality Audit` va `IQR Outlier` kodlarini o'z datasetlaringizda birinchi qadam sifatida ishlating."
            },
            {
                "id": "vid-d02-3-ru",
                "title": "Метод DROP: Удаление строк и обработка пропусков в DataFrame",
                "channel": "Виктория Юферева",
                "language": "ru",
                "youtubeId": "U-syc3mxojQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=U-syc3mxojQ",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "DataFrame ichida bo'sh qatorlar va ustunlarni ehtiyotkorlik bilan filtrlash hamda tozalash usullari tushuntirilgan.",
                "howToUseVideoUz": "Qachon qatorni o'chirish (`drop`), qachon esa flag qo'yib imputation qilish kerakligini taqqoslang."
            }
        ],
        "quiz": [
            {
                "id": "d02-3-q1",
                "promptUz": "1. Konseptual: Maoshlar yoki uy narxlari kabi kuchli o'ngga cho'zilgan (right-skewed) ustunda bo'sh qiymatlarni to'ldirish uchun qaysi statistika eng barqaror?",
                "options": [
                    "Arifmetik o'rtacha (Mean)",
                    "Mediana (50-persentil), chunki u ekstremal outlierlarga ta'sirchan emas",
                    "Maksimal qiymat (Max)",
                    "Standart og'ish (Std)"
                ],
                "correctIndex": 1,
                "explanationUz": "Mediana taqsimotning qoq o'rtasidagi nuqta bo'lib, chetdagi milliardlik qiymatlar uni siljita olmaydi."
            },
            {
                "id": "d02-3-q2",
                "promptUz": "2. Kod Tahlili: `Q1 = 10`, `Q3 = 30` bo'lsa, Tukey qoidasiga ko'ra (`Q3 + 1.5 * IQR`) yuqori outlier chegarasi nechaga teng?",
                "options": [
                    "45 ga",
                    "60 ga (chunki IQR = 30 - 10 = 20; 30 + 1.5 * 20 = 60)",
                    "40 ga",
                    "100 ga"
                ],
                "correctIndex": 1,
                "explanationUz": "`IQR = Q3 - Q1 = 20`. Yuqori chegara `Q3 + 1.5 * 20 = 30 + 30 = 60`."
            },
            {
                "id": "d02-3-q3",
                "promptUz": "3. Production Debugging: Vaqt qatorlari (Time Series) prognozlash modelida bo'sh qiymatlar `df.bfill()` (backward fill) bilan to'ldirilgan va testda 99% aniqlik chiqqan, ammo production'da model ishlamayapti. Sababi nima?",
                "options": [
                    "Kompyuter vaqti noto'g'ri",
                    "`bfill()` kelajakdagi qiymatni o'tmishga ko'chirib yozgani uchun Look-Ahead Data Leakage yuz bergan",
                    "Jadval juda kichik",
                    "Format xatosi"
                ],
                "correctIndex": 1,
                "explanationUz": "Real vaqtda (production) kelajak hali sodir bo'lmagan bo'ladi, shuning uchun Time Series'da faqat o'tmishdan (`ffill`) foydalanish mumkin."
            }
        ]
    },
    "D02.4": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: SQL JOIN Turlari va Ko'payib Ketish (Fan-out) Xavfi",
                "explanationUz": "Data Scientist intervyularining 90% qismida SQL JOIN so'raladi. `INNER JOIN` faqat ikkala jadvalda mos kelganlarni oladi; `LEFT JOIN` chap jadvaldagi BARCHA qatorlarni saqlab qoladi (o'ngda moslik bo'lmasa `NULL` qo'yadi). Eng xavfli xato: agar o'ng jadvalda bitta `user_id` ga 3 ta qator to'g'ri kelsa (1-to-Many), `LEFT JOIN` chap jadvaldagi summani 3 marta takrorlab, `SUM(amount)` ni sun'iy shishirib yuboradi (**Join Fan-out Trap**)! Yechim: JOIN qilishdan oldin CTE ichida o'ng jadvalni `user_id` bo'yicha guruhlab (`1-to-1`) olish.",
                "codeExample": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.executescript('''\nCREATE TABLE users (user_id INT, name TEXT);\nCREATE TABLE orders (order_id INT, user_id INT, amount INT);\nINSERT INTO users VALUES (1, 'Ali'), (2, 'Malika'), (3, 'Sardor');\nINSERT INTO orders VALUES (101, 1, 200), (102, 1, 350), (103, 2, 150);\n''')\n\nrows = cur.execute('''\nSELECT u.name, COUNT(o.order_id) AS order_cnt, COALESCE(SUM(o.amount), 0) AS total_spent\nFROM users u\nLEFT JOIN orders o ON u.user_id = o.user_id\nGROUP BY u.user_id, u.name\nORDER BY total_spent DESC;\n''').fetchall()\nfor r in rows:\n    print(r)",
                "outputOrNoteUz": "Natija: `('Ali', 2, 550)`, `('Malika', 1, 150)`, `('Sardor', 0, 0)`. `LEFT JOIN` va `COALESCE` tufayli xaridi yo'q Sardor ham `0` bilan hisobotda ko'rindi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: CTE (`WITH`) va Window Funksiyalari (`OVER PARTITION BY`)",
                "explanationUz": "Oddiy `GROUP BY` qatorlarni bitta satrga yig'ib (collapse) yuboradi. **Window funksiyalari** (`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `SUM() OVER(...)`) esa qatorlarni yo'qotmasdan, har bir qator yoniga o'z guruhi (`PARTITION BY`) bo'yicha reyting, oldingi oy qiymati yoki yuguruvchi yig'indini (Running Total) hisoblab qo'shadi.",
                "codeExample": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.executescript('''\nCREATE TABLE sales (dept TEXT, emp TEXT, revenue INT);\nINSERT INTO sales VALUES\n('AI', 'Ali', 500), ('AI', 'Vali', 500), ('AI', 'Gani', 300),\n('Data', 'Malika', 700), ('Data', 'Nodir', 400);\n''')\n\nrows = cur.execute('''\nSELECT dept, emp, revenue,\n       ROW_NUMBER() OVER (PARTITION BY dept ORDER BY revenue DESC) as row_num,\n       RANK()       OVER (PARTITION BY dept ORDER BY revenue DESC) as rnk,\n       DENSE_RANK() OVER (PARTITION BY dept ORDER BY revenue DESC) as dense_rnk\nFROM sales;\n''').fetchall()\nfor r in rows:\n    print(f'{r[0]:4} | {r[1]:6} | Rev: {r[2]} | ROW_NUM={r[3]} | RANK={r[4]} | DENSE={r[5]}')",
                "outputOrNoteUz": "Natija: Ali va Vali bir xil 500 natija ko'rsatganda `ROW_NUMBER` (1, 2, 3), `RANK` (1, 1, 3 — 2 sakrab ketadi), `DENSE_RANK` esa (1, 1, 2) beradi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: LAG() va Running Total Bilan Dinamika Tahlili",
                "explanationUz": "Time-series va ML feature engineering'da mijozning bugungi xaridini uning oldingi xaridi bilan solishtirish (`LAG(amount, 1)`) va boshidan beri to'plangan xaridini (`SUM(amount) OVER (PARTITION BY user_id ORDER BY dt)`) chiqarish eng ko'p ishlatiladigan SQL pattern hisoblanadi.",
                "codeExample": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.executescript('''\nCREATE TABLE daily_rev (dt TEXT, rev INT);\nINSERT INTO daily_rev VALUES ('2026-01-01', 100), ('2026-01-02', 150), ('2026-01-03', 120), ('2026-01-04', 200);\n''')\n\nrows = cur.execute('''\nSELECT dt, rev,\n       LAG(rev, 1) OVER (ORDER BY dt) AS prev_day_rev,\n       rev - LAG(rev, 1, rev) OVER (ORDER BY dt) AS diff,\n       SUM(rev) OVER (ORDER BY dt) AS running_total\nFROM daily_rev;\n''').fetchall()\nfor r in rows:\n    print(f'Sana: {r[0]} | Tushum: {r[1]} | Kecha: {str(r[2]):4} | Farq: {r[3]:+4} | Yig\\'indi: {r[4]}')",
                "outputOrNoteUz": "Natija: Har bir kun uchun kechagi kun bilan farq (`diff`) va o'sib boruvchi jami (`running_total`) bitta so'rovda hisoblandi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Har Bir Bo'limdan Top-2 Xodimni Ajratib Olish (CTE + DENSE_RANK)",
                "scenarioUz": "SQL intervyularidagi eng mashhur masala: 'Har bir departament bo'yicha eng ko'p daromad keltirgan Top-N xodimni toping'.",
                "howToUseUz": "Quyidagi SQLite kodini Python muharririda ishga tushirib natijani ko'ring.",
                "code": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.executescript('''\nCREATE TABLE employees (dept TEXT, name TEXT, salary INT);\nINSERT INTO employees VALUES\n('ML', 'Aziz', 4000), ('ML', 'Bekzod', 3500), ('ML', 'Doniyor', 2800),\n('DS', 'Malika', 4200), ('DS', 'Nilufar', 3900), ('DS', 'Otabek', 3100);\n''')\n\nquery = '''\nWITH ranked_emp AS (\n    SELECT dept, name, salary,\n           DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rnk\n    FROM employees\n)\nSELECT dept, name, salary, rnk\nFROM ranked_emp\nWHERE rnk <= 2;\n'''\nfor row in cur.execute(query):\n    print(row)",
                "expectedOutput": "('DS', 'Malika', 4200, 1)\n('DS', 'Nilufar', 3900, 2)\n('ML', 'Aziz', 4000, 1)\n('ML', 'Bekzod', 3500, 2)",
                "breakdownUz": "Window funksiyasini to'g'ridan-to'g'ri `WHERE` ichida yozib bo'lmaydi (chunki `WHERE` window'dan oldin bajariladi), shuning uchun avval CTE (`WITH ranked_emp AS (...)`) ichida hisoblab, tashqi `SELECT` da `WHERE rnk <= 2` qilinadi."
            },
            {
                "titleUz": "2-misol: Mijozlarning Qaytish Oralig'ini (Retention / Churn Lag) Hisoblash",
                "scenarioUz": "4-haftadagi Churn Prediction modeli uchun mijozning xaridlar orasidagi o'rtacha kunlar farqini SQL orqali feature sifatida yasash.",
                "howToUseUz": "Kodni ishga tushiring.",
                "code": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.executescript('''\nCREATE TABLE visits (user_id INT, visit_day INT);\nINSERT INTO visits VALUES (1, 1), (1, 5), (1, 12), (2, 2), (2, 25);\n''')\n\nq = '''\nWITH gaps AS (\n    SELECT user_id, visit_day,\n           visit_day - LAG(visit_day) OVER (PARTITION BY user_id ORDER BY visit_day) AS days_since_last\n    FROM visits\n)\nSELECT user_id, ROUND(AVG(days_since_last), 1) AS avg_gap_days\nFROM gaps\nWHERE days_since_last IS NOT NULL\nGROUP BY user_id;\n'''\nfor row in cur.execute(q):\n    print(f'User {row[0]} -> O\\'rtacha tashrif oralig\\'i: {row[1]} kun')",
                "expectedOutput": "User 1 -> O'rtacha tashrif oralig'i: 5.5 kun\nUser 2 -> O'rtacha tashrif oralig'i: 23.0 kun",
                "breakdownUz": "User 2 ning tashrif oralig'i 23 kun bo'lgani uning ketib qolish (Churn) xavfi yuqoriligini ko'rsatuvchi kuchli ML feature hisoblanadi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Window Function (`OVER PARTITION BY`)",
                "category": "Data & SQL",
                "definitionUz": "Jadval qatorlarini qisqartirmasdan (collapse qilmasdan), joriy qatorga bog'liq 'oyna' (guruh yoki tartiblangan ketma-ketlik) ustida agregat yoki tartib hisoblovchi SQL mexanizmi.",
                "analogyOrExampleUz": "Sinfdagi har bir o'quvchining kundaligiga uning o'z bahosi yoniga sinfdagi o'rnini va sinf o'rtacha bahosini yozib chiqish — hech bir o'quvchi ro'yxatdan o'chirilmaydi.",
                "connectedTo": [
                    {
                        "targetTerm": "Churn Feature Engineering",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "4-haftadagi 1-portfolio loyihasida mijozning oxirgi 3 oydagi xarid dinamikasini (rolling average va lag) hisoblashda ishlatiladi."
                    }
                ]
            },
            {
                "term": "SQL Logical Execution Order",
                "category": "Data & SQL",
                "definitionUz": "SQL dvigateli so'rovni yozilgan tartibda (`SELECT` dan) emas, balki `FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> WINDOW -> SELECT -> DISTINCT -> ORDER BY -> LIMIT` tartibida bajarishi.",
                "analogyOrExampleUz": "Oshpaz taom tayyorlashda menyudagi nomidan emas, avval ombordan masalliq olish (`FROM`), saralash (`WHERE`) va pishirish (`GROUP BY`) dan boshlashi.",
                "connectedTo": [
                    {
                        "targetTerm": "CTE (Common Table Expressions)",
                        "targetLessonId": "D02.4",
                        "relationshipUz": "`WINDOW` funksiyalari `WHERE` dan keyin bajarilgani sababli, `ROW_NUMBER()` natijasini filtrlash uchun CTE (`WITH`) ishlatish zarur."
                    }
                ]
            },
            {
                "term": "DuckDB (In-Process Analytical OLAP)",
                "category": "Data & SQL",
                "definitionUz": "Alohida server o'rnatishni talab qilmaydigan (SQLite kabi dastur ichida ishlaydigan), ammo ustunli vektorlashtirilgan OLAP analitikaga ixtisoslashgan SQL dvigateli.",
                "analogyOrExampleUz": "Cho'ntakka sig'adigan, ammo yuk mashinasi kuchiga ega mahalliy BigQuery / ClickHouse.",
                "connectedTo": [
                    {
                        "targetTerm": "Polars & Parquet Zero-Copy",
                        "targetLessonId": "D02.2",
                        "relationshipUz": "DuckDB to'g'ridan-to'g'ri Parquet fayllari va Polars/Pandas DataFrame'lari ustida nusxa olmasdan SQL so'rovlarini bajaradi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d02-4-int-1",
                "level": "Junior",
                "questionUz": "SQL'da `WHERE` bilan `HAVING` o'rtasida qanday farq bor?",
                "interviewerIntentUz": "SQL bajarilish tartibi va agregatsiyadan oldingi/keyingi filtrlashni bilishini tekshirish.",
                "strongAnswerUz": "`WHERE` guruhlashdan (`GROUP BY`) OLDIN bajariladi va alohida xom qatorlarni filtrlaydi (shuning uchun `WHERE` ichida `SUM()` yoki `COUNT()` yozib bo'lmaydi). `HAVING` esa `GROUP BY` dan KEYIN bajariladi va guruhlangan agregat natijalarni (masalan, `HAVING COUNT(*) >= 5`) filtrlaydi. Samaradorlik uchun mumkin bo'lgan barcha shartlarni `WHERE` da berish kerak, shunda `GROUP BY` kamroq qator ustida ishlaydi.",
                "redFlagUz": "'`HAVING` faqat `SELECT` oxirida yoziladigan `WHERE` ning sinonimi' deyish.",
                "followUpQuestionUz": "Savol: `SELECT dept, SUM(salary) AS total FROM emp WHERE total > 1000 GROUP BY dept` nega xato beradi? Javob: Chunki `WHERE` bajarilayotgan paytda hali `GROUP BY` ham, `SELECT` ichidagi `total` taxallusi (alias) ham hisoblanmagan bo'ladi."
            },
            {
                "id": "d02-4-int-2",
                "level": "Middle",
                "questionUz": "`ROW_NUMBER()`, `RANK()` va `DENSE_RANK()` window funksiyalari bir xil qiymatlar (ties) uchrab qolganda qanday farq qiladi?",
                "interviewerIntentUz": "Analitik SQL reyting masalalarini aniq yechish qobiliyatini sinash.",
                "strongAnswerUz": "Agar ikkita xodim bir xil eng yuqori `500` ball olgan bo'lsa va uchinchisi `400` olgan bo'lsa: 1) `ROW_NUMBER()` har biriga noyob ketma-ket raqam beradi: `1, 2, 3` (durangni tan olmaydi); 2) `RANK()` bir xil qiymatlarga bir xil o'rin beradi, ammo keyingi o'rinni o'tkazib yuboradi: `1, 1, 3`; 3) `DENSE_RANK()` bir xil qiymatlarga bir xil o'rin beradi va keyingi o'rinni uzluksiz davom ettiradi: `1, 1, 2`.",
                "redFlagUz": "'Uchalasi ham bir xil reyting chiqaradi' deyish.",
                "followUpQuestionUz": "Savol: Dublikat yozuvlardan faqat eng oxirgi sanadagi bittasini olib qolish (deduplication) uchun qaysi birini ishlatasiz? Javob: `ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC) = 1`, chunki durang bo'lganda ham faqat bitta qator qolishi shart."
            },
            {
                "id": "d02-4-int-3",
                "level": "Senior / Production",
                "questionUz": "`LEFT JOIN orders o ON u.id = o.user_id WHERE o.status = 'PAID'` so'rovida qanday yashirin mantiqiy xato bor?",
                "interviewerIntentUz": "SQL JOIN va NULL filtrlashdagi eng ko'p uchraydigan production xatosini topa olishini sinash.",
                "strongAnswerUz": "Agar foydalanuvchining umuman buyurtmasi bo'lmasa, `LEFT JOIN` uning `o.status` ustunini `NULL` qilib to'ldiradi. Keyin `WHERE o.status = 'PAID'` sharti ishlaganda, `NULL = 'PAID'` yolg'on (`UNKNOWN`) bo'lgani uchun buyurtmasi yo'q barcha foydalanuvchilar jadvaldan o'chib ketadi va `LEFT JOIN` amalda oddiy `INNER JOIN` ga aylanib qoladi! Chap jadvaldagi barcha foydalanuvchilarni saqlab qolish uchun shartni `WHERE` da emas, `LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'PAID'` ko'rinishida `ON` ichida yozish shart.",
                "redFlagUz": "Xatoni sezmasdan 'Bu so'rov barcha foydalanuvchilarni va ularning PAID buyurtmalarini qaytaradi' deyish.",
                "followUpQuestionUz": "Savol: PostgreSQL'da `COUNT(*)` va `COUNT(o.order_id)` o'rtasida `LEFT JOIN` dan keyin qanday farq bo'ladi? Javob: `COUNT(*)` buyurtmasi yo'q (`NULL`) qatorni ham `1` deb sanab qo'yadi; `COUNT(o.order_id)` esa faqat `NULL` bo'lmagan haqiqiy buyurtmalarni (`0`) to'g'ri sanaydi!"
            }
        ],
        "videos": [
            {
                "id": "vid-d02-4-uz",
                "title": "JOIN bilan bir-biriga aloqador jadvallarni birlashtirish | SQL",
                "channel": "Khan Academy Uzbek",
                "language": "uz",
                "youtubeId": "5jMVPxgqbsw",
                "youtubeUrl": "https://www.youtube.com/watch?v=5jMVPxgqbsw",
                "durationOrTimestamp": "To'liq o'zbekcha dars",
                "whatItExplainsUz": "Bir nechta jadvallarni kalit ustunlar (`Primary Key` va `Foreign Key`) orqali `JOIN` va `LEFT JOIN` yordamida bog'lash o'zbek tilida tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, yuqoridagi 1-bosqich SQLite kodida `LEFT JOIN` ni `INNER JOIN` ga almashtirib, Sardor natijadan qanday tushib qolishini Python muharririda sinab ko'ring."
            },
            {
                "id": "vid-d02-4-en",
                "title": "SQL Window Functions Basics (Visually Explained) | PARTITION BY, ORDER BY",
                "channel": "Data with Baraa",
                "language": "en",
                "youtubeId": "o666k19mZwE",
                "youtubeUrl": "https://www.youtube.com/watch?v=o666k19mZwE",
                "durationOrTimestamp": "To'liq vizual dars",
                "whatItExplainsUz": "`GROUP BY` va `OVER (PARTITION BY ... ORDER BY ...)` o'rtasidagi farq animatsiyalar orqali juda aniq ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi `PARTITION BY` va `ORDER BY` oynalarini tushunib, 2-amaliy misoldagi Top-2 xodim va `LAG` so'rovlarini o'zgartirib mashq qiling."
            }
        ],
        "quiz": [
            {
                "id": "d02-4-q1",
                "promptUz": "1. Konseptual: SQL Window funksiyasining (`OVER (PARTITION BY ...)`) oddiy `GROUP BY` dan asosiy farqi nimada?",
                "options": [
                    "Window funksiya faqat matnlar bilan ishlaydi",
                    "Window funksiya asl qatorlarni yig'ib (qisqartirib) yubormasdan, har bir qator yoniga guruh bo'yicha hisoblangan qiymatni qo'shadi",
                    "Window funksiya bazani o'chirib yuboradi",
                    "GROUP BY dan 100 marta sekin ishlaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "`GROUP BY` qatorlarni guruh bo'yicha bitta satrga qisqartirsa, Window funksiya barcha qatorlarni saqlagan holda oynaviy agregatsiya qiladi."
            },
            {
                "id": "d02-4-q2",
                "promptUz": "2. Kod Tahlili: Qiymatlar `[100, 100, 90]` bo'lganda `RANK()` va `DENSE_RANK()` mos ravishda qanday o'rinlarni qaytaradi?",
                "options": [
                    "RANK: (1, 2, 3) | DENSE_RANK: (1, 1, 2)",
                    "RANK: (1, 1, 3) | DENSE_RANK: (1, 1, 2)",
                    "RANK: (1, 1, 2) | DENSE_RANK: (1, 1, 3)",
                    "Ikkalasi ham (1, 2, 3)"
                ],
                "correctIndex": 1,
                "explanationUz": "`RANK()` durangdan keyingi o'rinni o'tkazib yuboradi (`1, 1, 3`), `DENSE_RANK()` esa zich ketma-ketlikni saqlaydi (`1, 1, 2`)."
            },
            {
                "id": "d02-4-q3",
                "promptUz": "3. Production Debugging: `users` jadvalida 1000 ta mijoz bor. `LEFT JOIN orders` qilib, har bir mijozning buyurtmalar sonini topishda `COUNT(*)` ishlatilgan edi, buyurtmasi yo'q mijozlarda ham `0` o'rniga `1` chiqib qoldi. Qanday tuzatiladi?",
                "options": [
                    "`COUNT(*)` o'rniga o'ng jadvaldagi ustunni `COUNT(orders.order_id)` deb sanash kerak (u NULL qiymatlarni sanamaydi)",
                    "`COUNT(*) - 1` deb yozish kerak",
                    "`RIGHT JOIN` qilish kerak",
                    "Jadvalni o'chirish kerak"
                ],
                "correctIndex": 0,
                "explanationUz": "`COUNT(*)` qatorning o'zini sanaydi (hatto o'ng tomoni `NULL` bo'lsa ham 1 ta qator bor); `COUNT(o.order_id)` esa faqat `NULL` bo'lmagan buyurtmalarni sanaydi."
            }
        ]
    },
    "D03.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Vektorlar, Ichki Ko'paytma (Dot Product) va Norma",
                "explanationUz": "AI va ML olamida har qanday obyekt (mijoz profili, rasm, o'zbekcha gap) $n$-o'lchamli fazodagi nuqta — **vektor** $\\mathbf{x} \\in \\mathbb{R}^n$ sifatida ifodalanadi. Ikki vektorning ichki ko'paytmasi $\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^n a_i b_i$ ularning bir yo'nalishga qanchalik mos tushishini ko'rsatadi. Vektorning uzunligi (L2 normasi) esa $\\|\\mathbf{a}\\|_2 = \\sqrt{\\sum a_i^2}$ ga teng.",
                "codeExample": "import numpy as np\n\na = np.array([3.0, 4.0])\nb = np.array([6.0, 8.0])\n\ndot_ab = np.dot(a, b)\nnorm_a = np.linalg.norm(a)\nnorm_b = np.linalg.norm(b)\nprint(f'Dot product: {dot_ab} | ||a|| = {norm_a} | ||b|| = {norm_b}')",
                "outputOrNoteUz": "Natija: `Dot product: 50.0 | ||a|| = 5.0 | ||b|| = 10.0`. `a` va `b` bir xil yo'nalishda yotgani uchun `dot_ab == norm_a * norm_b` bo'ldi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Cosine Similarity vs Euclidean Distance (L2 Masofa)",
                "explanationUz": "**Cosine Similarity** $\\cos(\\theta) = \\frac{\\mathbf{a} \\cdot \\mathbf{b}}{\\|\\mathbf{a}\\| \\|\\mathbf{b}\\|}$ vektorlarning uzunligiga emas, faqat ular orasidagi **burchakka** qaraydi ($[-1, 1]$ oraliqda). Nima uchun matn va LLM embeddinglarida Evklid masofasi emas, Cosine Similarity ishlatiladi? Chunki qisqa gap ('Kredit olish') va shu mavzudagi uzun maqola vektorining uzunligi (magnitudasi) farq qilishi mumkin, ammo ma'no yo'nalishi (burchagi) bir xil bo'ladi!",
                "codeExample": "import numpy as np\n\ndef cosine_sim(u: np.ndarray, v: np.ndarray) -> float:\n    return float(np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v) + 1e-9))\n\nq_short = np.array([1.0, 2.0, 1.0])        # Qisqa so'rov\ndoc_same_topic = np.array([5.0, 10.0, 5.0]) # Shu mavzudagi 5x uzun hujjat\ndoc_other = np.array([1.0, 0.0, 2.0])       # Boshqa mavzudagi qisqa hujjat\n\nprint(f'Shu mavzu: Cosine={cosine_sim(q_short, doc_same_topic):.4f} | L2 masofa={np.linalg.norm(q_short - doc_same_topic):.2f}')\nprint(f'Yot mavzu: Cosine={cosine_sim(q_short, doc_other):.4f} | L2 masofa={np.linalg.norm(q_short - doc_other):.2f}')",
                "outputOrNoteUz": "Natija: L2 masofa yot mavzuni yaqinroq (`2.24 < 9.80`) deb adashdi, Cosine Similarity esa bir xil mavzudagi hujjatni `1.0000` (100% mos) deb to'g'ri topdi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Matritsaviy Top-K Qidiruv (Batch Cosine Search)",
                "explanationUz": "Production RAG tizimida 10,000 ta hujjat vektorini `for` siklida bittalab solishtirish sekin ishlaydi. Agar barcha hujjat vektorlarini oldindan L2 normaga bo'lib normalizatsiya qilib qo'ysak ($\\|\\mathbf{d}_i\\|=1$) va so'rovni ham normalizatsiya qilsak ($\\|\\mathbf{q}\\|=1$), Cosine Similarity shunchaki bitta matritsa ko'paytmasiga (`scores = D_norm @ q_norm`) aylanadi!",
                "codeExample": "import numpy as np\n\n# 4 ta hujjatning 3 o'lchamli embedding matritsasi\nD = np.array([\n    [0.9, 0.1, 0.0], # 0: Kredit shartlari\n    [0.1, 0.8, 0.2], # 1: Depozit foizlari\n    [0.85, 0.2, 0.05], # 2: Ipoteka krediti\n    [0.0, 0.1, 0.95] # 3: Valyuta kursi\n], dtype=np.float32)\n\n# Oldindan qatorlar bo'yicha L2 normalizatsiya:\nD_norm = D / (np.linalg.norm(D, axis=1, keepdims=True) + 1e-9)\n\nq = np.array([0.95, 0.15, 0.0], dtype=np.float32)\nq_norm = q / (np.linalg.norm(q) + 1e-9)\n\nscores = D_norm @ q_norm # Bitta matritsa-vektor ko'paytmasi!\ntop_idx = np.argsort(scores)[::-1]\nprint('Reyting (eng yaqin hujjatlar):', [(int(i), round(float(scores[i]), 4)) for i in top_idx])",
                "outputOrNoteUz": "Natija: `0-hujjat (0.9989)` va `2-hujjat (0.9951)` bitta `@` amali bilan eng yaqin deb topildi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Mini Semantik Qidiruv Dvigateli (O'zbekcha Hujjatlar Uchun)",
                "scenarioUz": "So'rov vektoriga eng yaqin Top-2 hujjatni va ularning Cosine o'xshashlik ballini chiqarish.",
                "howToUseUz": "Kodni ishga tushiring va `query_vec` qiymatlarini o'zgartirib natijani kuzating.",
                "code": "import numpy as np\n\ndocs = [\n    ('Python uv va pytest', np.array([0.92, 0.10, 0.05, 0.02])),\n    ('SQL Window Functions', np.array([0.15, 0.88, 0.12, 0.04])),\n    ('PyTorch CNN va GPU', np.array([0.08, 0.10, 0.95, 0.15])),\n    ('RAG va Vector Search', np.array([0.05, 0.12, 0.30, 0.92])),\n]\n\nquery_vec = np.array([0.04, 0.08, 0.25, 0.96]) # RAG haqida so'rov\n\nresults = []\nfor title, vec in docs:\n    sim = float(np.dot(query_vec, vec) / (np.linalg.norm(query_vec) * np.linalg.norm(vec)))\n    results.append((sim, title))\n\nfor sim, title in sorted(results, reverse=True):\n    print(f'Score: {sim:.4f} -> {title}')",
                "expectedOutput": "Score: 0.9984 -> RAG va Vector Search\nScore: 0.3910 -> PyTorch CNN va GPU...",
                "breakdownUz": "6 va 8-haftalardagi Qdrant, ChromaDB va FAISS vektor bazalari kapot ostida aynan shu matematikani bajaradi."
            },
            {
                "titleUz": "2-misol: Nol Vektor (Zero-Vector) Himoyasi",
                "scenarioUz": "Agar bo'sh matn kelsa yoki barcha feature'lar 0 bo'lsa, `0 / 0 = NaN` xatosi butun qidiruv natijasini buzmasligini ta'minlash.",
                "howToUseUz": "Epsilon (`1e-9`) yoki norma tekshiruvi bilan xavfsiz funksiyani sinang.",
                "code": "import numpy as np\n\ndef safe_cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:\n    na = np.linalg.norm(a)\n    nb = np.linalg.norm(b)\n    if na == 0.0 or nb == 0.0:\n        return 0.0\n    return float(np.dot(a, b) / (na * nb))\n\nprint('Normal vektorlar:', safe_cosine_similarity(np.array([1.0, 0.0]), np.array([1.0, 0.0])))\nprint('Nol vektor bilan:', safe_cosine_similarity(np.array([0.0, 0.0]), np.array([1.0, 2.0])))",
                "expectedOutput": "Normal vektorlar: 1.0\nNol vektor bilan: 0.0",
                "breakdownUz": "Chegaraviy `0.0` norma tekshiruvi production API'ni `NaN` JSON serializatsiya xatosidan qutqaradi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Cosine Similarity",
                "category": "Math & Stats",
                "definitionUz": "Ikki vektor orasidagi burchak kosinusi: $\\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\|\\mathbf{a}\\|\\|\\mathbf{b}\\|}$. Qiymati $1$ (bir xil yo'nalish), $0$ (ortogonal/aloqasiz) va $-1$ (qarama-qarshi) orasida bo'ladi.",
                "analogyOrExampleUz": "Ikki fonarning nuri qanchalik bir nuqtaga qarab yo'nalganini o'lchash — fonarning quvvati (uzunligi) emas, faqat yo'nalish burchagi muhim.",
                "connectedTo": [
                    {
                        "targetTerm": "Text Embeddings & Semantic Search",
                        "targetLessonId": "D06.1",
                        "relationshipUz": "6-haftada o'zbekcha matnlarni 768 yoki 1024 o'lchamli vektorlarga o'girib, ma'nodosh gaplarni topishda ishlatiladi."
                    },
                    {
                        "targetTerm": "Dense Vector Retrieval in RAG",
                        "targetLessonId": "D08.1",
                        "relationshipUz": "8-haftadagi 2-portfolio RAG tizimida foydalanuvchi savoliga eng mos qonun moddasini topishning asosi."
                    }
                ]
            },
            {
                "term": "Dot Product & Matrix Multiplication (`@`)",
                "category": "Math & Stats",
                "definitionUz": "Vektorlarning mos koordinatalari ko'paytmalari yig'indisi; matritsalarda esa `(M, K) @ (K, N) -> (M, N)` chiziqli akslantirish.",
                "analogyOrExampleUz": "Savatdagi mahsulotlar soni vektori bilan ularning narxlari vektorini ko'paytirib umumiy chek summasini topish.",
                "connectedTo": [
                    {
                        "targetTerm": "Scaled Dot-Product Attention (Q @ K.T)",
                        "targetLessonId": "D06.2",
                        "relationshipUz": "Transformer arxitekturasining yuragi bo'lgan $\\text{Attention}(Q,K,V) = \\text{softmax}(QK^T/\\sqrt{d_k})V$ formulasi aynan matritsaviy Dot Product hisoblanadi."
                    }
                ]
            },
            {
                "term": "L2 Normalization (Unit Vector)",
                "category": "Math & Stats",
                "definitionUz": "Vektorni o'zining L2 uzunligiga bo'lib, uzunligi $\\|\\hat{\\mathbf{u}}\\|_2 = 1$ ga teng birlik sfera yuzasiga tushirish.",
                "analogyOrExampleUz": "Barcha o'qlarni bir xil 1 metrlik standart uzunlikka keltirish, shunda faqat ularning burchagi qoladi.",
                "connectedTo": [
                    {
                        "targetTerm": "FAISS / Qdrant Inner Product Index",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "Vektorlar L2-normalizatsiya qilinsa, murakkab Cosine Similarity oddiy va super-tezkor Dot Product (`IndexFlatIP`) bilan bir xil bo'lib qoladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d03-1-int-1",
                "level": "Junior",
                "questionUz": "Ikki vektor orasidagi Cosine Similarity `0` ga teng bo'lsa, bu nimani anglatadi? `-1` bo'lsa-chi?",
                "interviewerIntentUz": "Geometrik intuitsiyani tekshirish.",
                "strongAnswerUz": "`0` bo'lsa, vektorlar o'zaro $90^\\circ$ burchak ostida (ortogonal / perpendikulyar) joylashgan, ya'ni ular orasida chiziqli korrelyatsiya yoki umumiy yo'nalish yo'q. `-1` bo'lsa, vektorlar $180^\\circ$ qarama-qarshi yo'nalgan ($\mathbf{b} = -c\\mathbf{a}$).",
                "redFlagUz": "'0 bo'lsa vektorlar bir-biriga teng, -1 bo'lsa xato chiqqan' deyish.",
                "followUpQuestionUz": "Savol: Agar ikkala vektorning barcha koordinatalari musbat sonlar bo'lsa (masalan TF-IDF yoki ReLU chiqishi), Cosine Similarity manfiy chiqishi mumkinmi? Javob: Yo'q, musbat chorakda burchak $90^\\circ$ dan oshmaydi va qiymat $[0, 1]$ oraliqda bo'ladi."
            },
            {
                "id": "d03-1-int-2",
                "level": "Middle",
                "questionUz": "Qachon Cosine Similarity o'rniga Euclidean Distance (L2) yoki Dot Product ishlatish ma'qul?",
                "interviewerIntentUz": "Magnituda (uzunlik) ahamiyatli bo'lgan vaziyatlarni ajrata olishini sinash.",
                "strongAnswerUz": "Cosine Similarity vektor uzunligini (magnitudani) yo'qotadi. Agar vektor uzunligi muhim biznes ma'nosini bersa — masalan, mijozning xarid chastotasi va summasi (`[1, 2]` yangi mijoz vs `[100, 200]` VIP mijoz — ularning Cosine o'xshashligi 1.0 bo'lib qoladi!) — u holda L2 (Euclidean) masofa ishlatish shart. Matn ma'nosi qidiruvida yoki L2-normalizatsiyalangan embeddinglarda esa Cosine / Dot Product ishlatiladi.",
                "redFlagUz": "'Har doim hamma joyda Cosine Similarity yaxshiroq' deyish.",
                "followUpQuestionUz": "Savol: L2-normalizatsiyalangan ikki birlik vektor uchun Euclidean masofa va Cosine Similarity o'rtasida qanday aniq formula bor? Javob: $\\|\\mathbf{u} - \\mathbf{v}\\|_2^2 = 2(1 - \\cos\\theta)$. Ya'ni birlik sferada L2 masofa bo'yicha tartiblash bilan Cosine bo'yicha tartiblash 100% bir xil natija beradi!"
            },
            {
                "id": "d03-1-int-3",
                "level": "Senior / Production",
                "questionUz": "1024 o'lchamli fazoda (High-dimensional space) KNN yoki vektor qidiruvda 'Curse of Dimensionality' (O'lchamlar la'nati) qanday namoyon bo'ladi?",
                "interviewerIntentUz": "Yuqori o'lchamli fazo geometriyasi va ANN (Approximate Nearest Neighbors) zaruratini tushunishini sinash.",
                "strongAnswerUz": "O'lchamlar soni $d$ oshgan sari tasodifiy nuqtalar orasidagi eng yaqin va eng uzoq masofalar nisbati $1$ ga yaqinlashadi (distance concentration) va deyarli barcha tasodifiy vektorlar o'zaro ortogonal ($\\cos\\theta \\approx 0$) bo'lib qoladi. Bundan tashqari, $d > 20$ da KD-Tree kabi aniq daraxt indekslari oddiy brute-force qidiruvdan farq qilmay qoladi. Shu sababli production vektor bazalarida HNSW (grafga asoslangan) yoki IVF-PQ (kvantlangan klasterlar) kabi ANN algoritmlari qo'llaniladi.",
                "redFlagUz": "'O'lcham ko'paysa faqat RAM ko'proq ketadi, matematik farqi yo'q' deyish.",
                "followUpQuestionUz": "Savol: HNSW indeksida `efSearch` parametrini oshirish nimani o'zgartiradi? Javob: Recall (aniqlik) oshadi, ammo qidiruv latency (kechikish vaqti) ham oshadi."
            }
        ],
        "videos": [
            {
                "id": "vid-d03-1-en",
                "title": "Embeddings Explained: Vectors, Cosine Similarity & Semantic Search",
                "channel": "kodblok",
                "language": "en",
                "youtubeId": "jmZhhCcqygM",
                "youtubeUrl": "https://www.youtube.com/watch?v=jmZhhCcqygM",
                "durationOrTimestamp": "To'liq vizual dars",
                "whatItExplainsUz": "Vektorlar fazosi, burchak kosinusi va ularning semantik qidiruvda qanday qo'llanilishi grafik animatsiyalar bilan tushuntirilgan.",
                "howToUseVideoUz": "Videodagi 2D/3D vektor burchaklarini ko'rgach, yuqoridagi Batch Cosine Search kodida `D_norm @ q_norm` qanday ishlashini sinab ko'ring."
            },
            {
                "id": "vid-d03-1-ru",
                "title": "Эмбеддинги и поиск по векторному индексу",
                "channel": "Лисий архив",
                "language": "ru",
                "youtubeId": "RCyHSpQht4w",
                "youtubeUrl": "https://www.youtube.com/watch?v=RCyHSpQht4w",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "Vektor indekslar, masofa metrikalari (L2, Cosine, Inner Product) va tezkor qidiruv mexanizmi tahlil qilingan.",
                "howToUseVideoUz": "Qachon L2 normalizatsiya qilib Dot Product ishlatish tezlikni oshirishini konspekt qilib oling."
            }
        ],
        "quiz": [
            {
                "id": "d03-1-q1",
                "promptUz": "1. Konseptual: Matn embeddinglarini solishtirishda Evklid masofasidan ko'ra Cosine Similarity afzal ko'rilishining asosiy sababi nima?",
                "options": [
                    "Cosine Similarity faqat butun sonlar bilan ishlagani uchun",
                    "Vektor uzunligiga (matn hajmiga) emas, balki ma'no yo'nalishi (vektorlar orasidagi burchak) ga e'tibor bergani uchun",
                    "Xotirani tozalab turgani uchun",
                    "Matritsalarni ishlatmagani uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "Cosine Similarity burchakni o'lchaydi, shuning uchun bir xil mavzudagi qisqa va uzun matnlar yuqori o'xshashlik ko'rsatadi."
            },
            {
                "id": "d03-1-q2",
                "promptUz": "2. Kod Tahlili: `u = [1, 0]` va `v = [0, 5]` vektorlari orasidagi Cosine Similarity nechaga teng?",
                "options": [
                    "1.0 ga",
                    "0.0 ga, chunki ularning ichki ko'paytmasi (1*0 + 0*5 = 0) ga teng va ular o'zaro perpendikulyar",
                    "5.0 ga",
                    "-1.0 ga"
                ],
                "correctIndex": 1,
                "explanationUz": "Koordinata o'qlari bo'ylab yotgan ortogonal vektorlarning skalyar ko'paytmasi 0 ga teng."
            },
            {
                "id": "d03-1-q3",
                "promptUz": "3. Production Debugging: Barcha hujjat vektorlari va so'rov vektori oldindan L2-normalizatsiya qilingan (`||x|| = 1`). Cosine Similarity hisoblashning eng tezkor usuli qaysi?",
                "options": [
                    "Har safar qaytadan kvadrat ildiz va bo'lish amalini bajarish",
                    "To'g'ridan-to'g'ri skalyar / matritsa ko'paytmasi (`D_norm @ q_norm`), chunki maxrajdagi normalar ko'paytmasi 1 * 1 = 1 ga teng",
                    "Vektorlarni matnga aylantirib solishtirish",
                    "Python for siklida aylantirish"
                ],
                "correctIndex": 1,
                "explanationUz": "Birlik vektorlar uchun $\\cos(\\theta) = \\mathbf{u} \\cdot \\mathbf{v}$ bo'lib, bo'lish va ildiz chiqarish amallariga hojat qolmaydi."
            }
        ]
    },
    "D03.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Loss Funksiyasi (MSE) va Gradient Nima?",
                "explanationUz": "Chiziqli regressiya $\\hat{y} = w x + b$ modelida bizning maqsadimiz — bashorat $\\hat{y}$ bilan haqiqiy qiymat $y$ orasidagi o'rtacha kvadratik xatoni (**MSE** = $\\frac{1}{N}\\sum (\\hat{y}_i - y_i)^2$) minimal nuqtaga tushirishdir. **Gradient** ($\\nabla L = [\\frac{\\partial L}{\\partial w}, \\frac{\\partial L}{\\partial b}]$) — funksiya eng tez O'SADIGAN yo'nalishni ko'rsatuvchi vektor. Demak, xatoni KAMAYTIRISH uchun gradientga qarama-qarshi yo'nalishda ($-\\eta \\nabla L$) qadam tashlaymiz!",
                "codeExample": "import numpy as np\n\nx = np.array([1.0, 2.0, 3.0, 4.0])\ny = np.array([5.0, 8.0, 11.0, 14.0]) # Haqiqiy qonuniyat: y = 3*x + 2\n\nw, b = 0.0, 0.0\ny_hat = w * x + b\nmse = np.mean((y_hat - y) ** 2)\ndw = (2 / len(x)) * np.dot(x, (y_hat - y))\ndb = (2 / len(x)) * np.sum(y_hat - y)\nprint(f'Boshlang\\'ich MSE={mse:.2f} | Gradient: dw={dw:.2f}, db={db:.2f}')",
                "outputOrNoteUz": "Natija: `dw=-55.0, db=-19.0`. Gradient manfiy, demak `-lr * dw` qilganimizda `w` va `b` musbat tomonga (`3` va `2` ga qarab) o'sadi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Learning Rate ($\\eta$) — Konvergensiya vs Divergensiya",
                "explanationUz": "**Learning Rate (`lr`)** — har bir qadamning kattaligini belgilovchi giperparametr ($w \\leftarrow w - \\eta \\cdot dw$). Agar `lr` juda kichik bo'lsa (`1e-6`), model minglab epoxada ham minimumga yetib bormaydi. Agar `lr` haddan tashqari katta bo'lsa (`0.5`), model minimum chuqurligidan narigi qirg'oqqa sakrab o'tib ketadi (overshooting) va Loss kamayish o'rniga cheksizlikka qarab portlaydi (`inf` / `NaN` divergence)!",
                "codeExample": "import numpy as np\n\nx = np.array([1.0, 2.0, 3.0, 4.0])\ny = np.array([5.0, 8.0, 11.0, 14.0])\n\nfor lr, label in [(0.001, 'Juda kichik'), (0.05, 'Optimal'), (0.25, 'Juda katta (Divergensiya)')]:\n    w, b = 0.0, 0.0\n    for _ in range(30):\n        err = (w * x + b) - y\n        w -= lr * (2 / len(x)) * np.dot(x, err)\n        b -= lr * (2 / len(x)) * np.sum(err)\n    final_loss = np.mean(((w * x + b) - y) ** 2)\n    print(f'LR={lr:<5} ({label:25}) -> 30-qadam MSE: {final_loss:.4f} | w={w:.2f}, b={b:.2f}')",
                "outputOrNoteUz": "Natija: `LR=0.05` da MSE `0.0049` gacha tushdi (`w=3.04, b=1.88`), `LR=0.25` da esa Loss `69,800+` ga portlab ketdi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Logistik Regressiya, Sigmoid va Binary Cross-Entropy (Log-Loss)",
                "explanationUz": "Klassifikatsiya masalasida (masalan, Mijoz ketadimi: `1` yoki `0`) chiziqli chiqish $z = wx + b$ ni $[0, 1]$ ehtimollik oralig'iga tushirish uchun **Sigmoid** funksiyasi $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ qo'llaniladi. Sigmoid ustida MSE ishlatsak funksiya noqavariq (non-convex) bo'lib qoladi; shuning uchun **Binary Cross-Entropy (Log-Loss)**: $L = -\\frac{1}{N}\\sum [y\\ln(p) + (1-y)\\ln(1-p)]$ ishlatiladi.",
                "codeExample": "import numpy as np\n\ndef sigmoid(z: np.ndarray) -> np.ndarray:\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -250, 250)))\n\ndef binary_cross_entropy(y_true: np.ndarray, y_prob: np.ndarray) -> float:\n    eps = 1e-12\n    p = np.clip(y_prob, eps, 1.0 - eps)\n    return float(-np.mean(y_true * np.log(p) + (1.0 - y_true) * np.log(1.0 - p)))\n\ny_true = np.array([1, 0, 1, 1])\np_good = np.array([0.92, 0.08, 0.88, 0.95])\np_bad  = np.array([0.15, 0.85, 0.20, 0.10])\nprint(f'Yaxshi model Log-Loss: {binary_cross_entropy(y_true, p_good):.4f}')\nprint(f'Yomon model Log-Loss:  {binary_cross_entropy(y_true, p_bad):.4f}')",
                "outputOrNoteUz": "Natija: Ishonchli to'g'ri bashoratda Log-Loss `0.0870` (juda past), teskari xato bashoratda esa `1.9392` (qattiq jazo)."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: L2 Regularizatsiya (Ridge) Bilan Gradient Descent",
                "scenarioUz": "Model og'irliklari (`w`) haddan tashqari kattalashib overfitting bo'lmasligi uchun Loss funksiyasiga $\\lambda \\|w\\|_2^2$ jarima qo'shish.",
                "howToUseUz": "Kodni ishga tushiring va `l2_lambda` og'irliklarni qanday jilovlashini ko'ring.",
                "code": "import numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 3)\ntrue_w = np.array([2.5, -1.5, 0.5])\ny = X @ true_w + np.random.randn(50) * 0.1\n\nw = np.zeros(3)\nlr, l2_lambda = 0.1, 0.05\nfor epoch in range(100):\n    grad = (2 / len(X)) * (X.T @ (X @ w - y)) + 2 * l2_lambda * w\n    w -= lr * grad\n\nprint('Haqiqiy og\\'irliklar:', true_w)\nprint('Topilgan og\\'irliklar:', np.round(w, 3))",
                "expectedOutput": "Haqiqiy og'irliklar: [ 2.5 -1.5  0.5]\nTopilgan og'irliklar: [ 2.382 -1.418  0.465]",
                "breakdownUz": "`2 * l2_lambda * w` hadi har qadamda og'irliklarni `0` ga tomon biroz tortib turadi (Weight Decay)."
            },
            {
                "titleUz": "2-misol: Mini-Batch SGD vs Full-Batch GD",
                "scenarioUz": "Millionlab qatorli datasetda har qadamda butun bazani emas, 32 yoki 64 qatorli mini-batchni olib tez yangilash.",
                "howToUseUz": "Mini-batch siklini sinab ko'ring.",
                "code": "import numpy as np\n\nX = np.linspace(0, 10, 100)\ny = 4.0 * X + 1.5\nw, b = 0.0, 0.0\nbatch_size, lr = 20, 0.01\n\nfor epoch in range(15):\n    for i in range(0, len(X), batch_size):\n        xb, yb = X[i:i+batch_size], y[i:i+batch_size]\n        err = (w * xb + b) - yb\n        w -= lr * (2 / len(xb)) * np.dot(xb, err)\n        b -= lr * (2 / len(xb)) * np.sum(err)\n\nprint(f'15 epoxadan so\\'ng: w={w:.3f} (kutilgan 4.0), b={b:.3f} (kutilgan 1.5)')",
                "expectedOutput": "15 epoxadan so'ng: w=4.041 (kutilgan 4.0), b=1.224 (kutilgan 1.5)",
                "breakdownUz": "100 ta qator va `batch_size=20` bo'lganda har bitta epoxa ichida og'irliklar 1 marta emas, 5 marta yangilanadi!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "Gradient Descent & Learning Rate",
                "category": "Math & Stats",
                "definitionUz": "Loss funksiyasidan parametrlar bo'yicha olingan xususiy hosilalar vektoriga (`gradient`) teskari yo'nalishda $\\theta \\leftarrow \\theta - \\eta \\nabla L(\\theta)$ qadam tashlab minimumni topish algoritmi.",
                "analogyOrExampleUz": "Quyuq tumanda tog' cho'qqisidan vodiy tubiga tushish: oyoq ostidagi eng tik nishablikni paypaslab topib, o'sha tomonga qadam tashlash.",
                "connectedTo": [
                    {
                        "targetTerm": "Backpropagation & Autograd",
                        "targetLessonId": "D05.1",
                        "relationshipUz": "5-haftada chuqur neyron tarmoqlarda millionlab parametrlar uchun gradient zanjir qoidasi (Chain Rule / Backprop) bilan hisoblanib, aynan Gradient Descent (`AdamW` / `SGD`) bilan yangilanadi."
                    }
                ]
            },
            {
                "term": "Loss Function (MSE vs Cross-Entropy)",
                "category": "Math & Stats",
                "definitionUz": "Model bashorati bilan haqiqiy javob orasidagi xatolikni bitta skalyar songa aylantiruvchi differensiallanuvchi funksiya (regressiya uchun MSE/MAE, klassifikatsiya uchun Log-Loss).",
                "analogyOrExampleUz": "Kamondan o'q uzganda nishon markazidan necha santimetr chetga tekkanini o'lchovchi jarima shkalasi.",
                "connectedTo": [
                    {
                        "targetTerm": "LLM Next-Token Cross-Entropy Loss",
                        "targetLessonId": "D06.3",
                        "relationshipUz": "6-haftada GPT modelini o'qitishda ham keyingi tokenni topish xatosi aynan Cross-Entropy Loss orqali hisoblanadi."
                    }
                ]
            },
            {
                "term": "Feature Scaling Effect on Gradient",
                "category": "Classic ML",
                "definitionUz": "Ustunlar masshtabi turlicha bo'lsa (`yosh: 20..60` vs `oylik: 5,000,000`), Loss yuzasi cho'zilgan tor ellipsga aylanib, gradient zig-zag sakrashi va sekin yaqinlashishi.",
                "analogyOrExampleUz": "Tor va tik darada u qirg'oqdan bu qirg'oqqa urilib tushish; normalizatsiya esa darani dumaloq kosaga aylantirib to'g'ri markazga tushiradi.",
                "connectedTo": [
                    {
                        "targetTerm": "StandardScaler in Pipeline",
                        "targetLessonId": "D04.1",
                        "relationshipUz": "4-haftada chiziqli va neyron modellardan oldin `StandardScaler` qo'yishning matematik sababi aynan gradient barqarorligidir."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d03-2-int-1",
                "level": "Junior",
                "questionUz": "Nima uchun Gradient Descent'da gradientni qo'shmasdan, uni AYIRAMIZ (`w = w - lr * grad`)?",
                "interviewerIntentUz": "Gradient vektorining matematik yo'nalishini tushunishini sinash.",
                "strongAnswerUz": "Matematik tahlildan ma'lumki, funksiyaning gradient vektori har doim funksiya qiymati ENG TEZ O'SADIGAN (ko'tariladigan) yo'nalishga ishora qiladi. Bizning maqsadimiz xatolikni (Loss funksiyasini) ko'paytirish emas, balki MINIMALLASHTIRISH bo'lgani uchun gradientga $180^\\circ$ qarama-qarshi yo'nalishda (`-grad`) qadam tashlaymiz.",
                "redFlagUz": "'Formula shunaqa yozilgan, qo'shsa ham bo'ladi' deyish.",
                "followUpQuestionUz": "Savol: Qaysi holatda Gradient Ascent (`+ lr * grad`) ishlatiladi? Javob: Funksiyani maksimallashtirish kerak bo'lganda — masalan, Log-Likelihood'ni maksimallashtirishda (MLE) yoki Reinforcement Learning'da kutilgan mukofotni (Reward) oshirishda."
            },
            {
                "id": "d03-2-int-2",
                "level": "Middle",
                "questionUz": "Regressiyada MSE (Mean Squared Error) va MAE (Mean Absolute Error) o'rtasida qanday farq bor? Qachon Huber Loss ishlatiladi?",
                "interviewerIntentUz": "Loss funksiyalarining outlierlarga ta'sirchanligi va hosila xususiyatlarini bilishini tekshirish.",
                "strongAnswerUz": "MSE xatoni kvadratga oshirgani uchun (`e^2`) katta outlierlarga juda qattiq jarima beradi va model outlierga moslashib buzilishi mumkin, ammo u hamma nuqtada silliq hosilaga (`2e`) ega. MAE (`|e|`) esa outlierlarga chidamli (robust), lekin `e = 0` nuqtada hosilasi uzilgan ($\\pm 1$ orasida sakraydi). **Huber Loss** ikkalasining eng yaxshi tomonini birlashtiradi: kichik xatolarda kvadratik (MSE kabi silliq), katta xatolarda ($|e| > \\delta$) esa chiziqli (MAE kabi outlierga chidamli) ishlaydi.",
                "redFlagUz": "'MAE har doim MSE dan kichik bo'lgani uchun MAE yaxshiroq' deyish.",
                "followUpQuestionUz": "Savol: MSE ni minimallashtiruvchi konstanta bashorat nimaga teng, MAE ni minimallashtiruvchi-chi? Javob: MSE ni minimallashtiruvchi nuqta — arifmetik o'rtacha (`Mean`), MAE ni minimallashtiruvchi nuqta esa — `Mediana`!"
            },
            {
                "id": "d03-2-int-3",
                "level": "Senior / Production",
                "questionUz": "Training vaqtida Loss birdaniga `NaN` bo'lib ketdi. Eng ehtimolli 4 ta texnik sabab va ularning yechimini ayting.",
                "interviewerIntentUz": "Real model o'qitishdagi debugging tajribasini sinash.",
                "strongAnswerUz": "1) **Learning Rate juda katta**: gradient qadami portlab `inf` ga chiqib ketgan -> `lr` ni kamaytirish va warmup qo'shish; 2) **Kiruvchi ma'lumotda `NaN`/`inf` yoki masshtablanmagan ulkan son bor** -> `np.isnan(X).any()` tekshiruvi va `StandardScaler`; 3) **Log(0) yoki 0 ga bo'lish**: Cross-Entropy ichida `log(0)` bo'lgan -> ehtimollikni `np.clip(p, 1e-12, 1-1e-12)` qilish yoki PyTorch `BCEWithLogitsLoss` (LogSumExp trick) ishlatish; 4) **Exploding Gradients** (chuqur tarmoqlarda) -> Gradient Clipping (`clip_grad_norm_`) qo'llash.",
                "redFlagUz": "'Modelni qayta ishga tushiraman yoki kompyuterni o'chirib yoqaman' deyish.",
                "followUpQuestionUz": "Savol: Nima uchun `BCEWithLogitsLoss` alohida `Sigmoid + BCELoss` dan barqarorroq? Javob: U Sigmoid va Log'ni bitta matematik formulaga birlashtirib (`log-sum-exp` trick), juda katta manfiy/musbat $z$ larda float underflow/overflow bo'lishining oldini oladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d03-2-uz",
                "title": "2.4 Linear Regression va Gradient Descent #1 (O'zbek tilida)",
                "channel": "Machine Learning Lab",
                "language": "uz",
                "youtubeId": "M4BIZRXnfTI",
                "youtubeUrl": "https://www.youtube.com/watch?v=M4BIZRXnfTI",
                "durationOrTimestamp": "To'liq o'zbekcha dars",
                "whatItExplainsUz": "Chiziqli regressiya xatolik funksiyasi va Gradient Descent qadamlari o'zbek tilida grafik va formulalar bilan tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, yuqoridagi 2-bosqich kodida `lr` qiymatini `0.01`, `0.05`, `0.25` qilib o'zgartirib, Loss qanday o'zgarishini amalda sinab ko'ring."
            },
            {
                "id": "vid-d03-2-en",
                "title": "Gradient Descent, Step-by-Step",
                "channel": "StatQuest with Josh Starmer",
                "language": "en",
                "youtubeId": "sDv4f4s2SB8",
                "youtubeUrl": "https://www.youtube.com/watch?v=sDv4f4s2SB8",
                "durationOrTimestamp": "To'liq vizual dars",
                "whatItExplainsUz": "Dunyo bo'yicha eng mashhur vizual dars: hosila, learning rate va qadam o'lchami (step size) animatsiya orqali qadamma-qadam hisoblab ko'rsatilgan.",
                "howToUseVideoUz": "StatQuest'dagi `intercept` (`b`) va `slope` (`w`) bo'yicha olingan xususiy hosilalarni darsdagi `dw` va `db` NumPy qatorlari bilan solishtiring."
            }
        ],
        "quiz": [
            {
                "id": "d03-2-q1",
                "promptUz": "1. Konseptual: Gradient Descent jarayonida Learning Rate (`lr`) haddan tashqari katta tanlansa nima yuz beradi?",
                "options": [
                    "Model har doim 1 qadamda ideal minimumga tushadi",
                    "Qadamlar minimum nuqtadan sakrab o'tib ketadi (overshooting) va Loss kamayish o'rniga portlab (divergensiya) ketadi",
                    "Model avtomatik to'xtaydi",
                    "Xotira 10 barobar kamayadi"
                ],
                "correctIndex": 1,
                "explanationUz": "Haddan tashqari katta learning rate gradient yo'nalishida minimum vodiydan narigi tepalikka sakrab ketishga va Loss'ning `inf`/`NaN` bo'lishiga olib keladi."
            },
            {
                "id": "d03-2-q2",
                "promptUz": "2. Kod Tahlili: `L(w) = (w - 3)^2` funksiyasining `w = 5` nuqtadagi hosilasi `dL/dw` nechaga teng va `lr = 0.1` bo'lsa yangi `w` qanday bo'ladi?",
                "options": [
                    "Hosila = 4; yangi w = 5 - 0.1 * 4 = 4.6 (minimum 3 ga yaqinlashdi)",
                    "Hosila = -4; yangi w = 5.4",
                    "Hosila = 0; w o'zgarmaydi",
                    "Hosila = 10; yangi w = 4.0"
                ],
                "correctIndex": 0,
                "explanationUz": "`dL/dw = 2*(w - 3) = 2*(5 - 3) = 4`. Yangi qiymat `w = 5 - 0.1 * 4 = 4.6` bo'lib, minimum nuqta (`w=3`) tomon siljiydi."
            },
            {
                "id": "d03-2-q3",
                "promptUz": "3. Production Debugging: Binary Cross-Entropy hisoblashda model `p = 1.0` va haqiqiy qiymat `y = 0` bo'lganda `np.log(1 - p)` -> `-inf` va `NaN` berdi. Buning standart yechimi nima?",
                "options": [
                    "Ehtimollikni `np.clip(p, 1e-12, 1.0 - 1e-12)` bilan chegaralash yoki logits ustida barqaror funksiya ishlatish",
                    "Logarifm o'rniga qo'shish ishlatish",
                    "Ushbu qatorni o'chirib yuborish",
                    "Learning rate'ni 100 qilish"
                ],
                "correctIndex": 0,
                "explanationUz": "`np.clip` orqali `0` va `1` chegaralaridan kichik `epsilon` (`1e-12`) masofada ushlab turish `log(0)` xatosidan to'liq himoya qiladi."
            }
        ]
    },
    "D03.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Shartli Ehtimollik va Bayes Teoremasi Mohiyati",
                "explanationUz": "Bayes teoremasi $P(A|B) = \\frac{P(B|A) P(A)}{P(B)}$ yangi dalil ($B$) paydo bo'lganda bizning boshlang'ich ishonchimiz (**Prior** $P(A)$) qanday qilib yangilangan ishonchga (**Posterior** $P(A|B)$) aylanishini ifodalaydi. Bu yerda $P(B|A)$ — **Likelihood** (agar $A$ rost bo'lsa, $B$ belgining uchrash ehtimoli), $P(B) = P(B|A)P(A) + P(B|\\neg A)P(\\neg A)$ esa umumiy normalizatsiya maxrajidir.",
                "codeExample": "def bayes_posterior(prior_a: float, likelihood_b_given_a: float, false_pos_b_given_not_a: float) -> float:\n    p_not_a = 1.0 - prior_a\n    p_b = (likelihood_b_given_a * prior_a) + (false_pos_b_given_not_a * p_not_a)\n    return (likelihood_b_given_a * prior_a) / p_b\n\n# Kam uchraydigan hodisa (1% fraud), detektor aniqligi 99%, yolg'on trevoga 5%\npost = bayes_posterior(prior_a=0.01, likelihood_b_given_a=0.99, false_pos_b_given_not_a=0.05)\nprint(f'Signal chiqqanda haqiqiy Fraud bo\\'lish ehtimoli: {post:.2%}')",
                "outputOrNoteUz": "Natija: Detektor 99% sezgir bo'lsa ham, hodisa juda kam (1%) uchragani va 5% yolg'on trevoga bo'lgani uchun haqiqiy Fraud ehtimoli atigi `16.67%` chiqdi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Base Rate Fallacy (Boshlang'ich Ulush Tuzog'i)",
                "explanationUz": "Nima uchun 99% aniqlikdagi detektor atigi 16.67% ishonch berdi? Tasavvur qiling, 10,000 ta tranzaksiyadan atigi 100 tasi (1%) haqiqiy Fraud. Detektor 100 ta Frauddan 99 tasini to'g'ri tutadi (`TP = 99`). Ammo qolgan 9,900 ta TOZA tranzaksiyaning 5% qismida yolg'on signal chaladi (`FP = 495`)! Jami 99 + 495 = 594 ta signaldan faqat 99 tasi haqiqiy: $99 / 594 = 16.67\\%$. Bu **Imbalanced Classification** (4-hafta) uchun eng muhim matematik qonuniyatdir!",
                "codeExample": "total_tx = 10_000\nreal_fraud = int(total_tx * 0.01)      # 100\nreal_clean = total_tx - real_fraud      # 9900\n\ntp = int(real_fraud * 0.99)             # 99 ta haqiqiy fraud tutildi\nfp = int(real_clean * 0.05)             # 495 ta toza tranzaksiya xato bloklandi!\nprecision = tp / (tp + fp)\nprint(f'TP={tp}, FP={fp} -> Precision (P(Fraud|Alert)): {precision:.2%}')",
                "outputOrNoteUz": "Natija: `TP=99, FP=495 -> Precision: 16.67%`. Yolg'on pozitivlar (`FP`) kam uchraydigan klassni bosib ketdi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Naive Bayes va Laplace Smoothing (Matn Klassifikatsiyasi)",
                "explanationUz": "O'zbekcha SMS yoki izohlarni Spam/Normal ga ajratishda har bir so'zning ehtimolliklari ko'paytiriladi: $P(C | w_1, \\dots, w_n) \\propto P(C) \\prod_{i=1}^n P(w_i | C)$. Agar testda yangi so'z uchrab qolsa va $P(w_i | C) = 0$ bo'lsa, butun ko'paytma `0` bo'lib ketmasligi uchun **Laplace Smoothing** ($\\alpha = 1$ qo'shish) va kichik sonlar ko'paytmasi underflow bo'lmasligi uchun **Log-Probability** ($\\sum \\ln P(w_i|C)$) ishlatiladi.",
                "codeExample": "import math\n\nspam_words = {'yutuq': 15, 'pul': 12, 'aksiya': 10, 'salom': 2}\nham_words  = {'salom': 20, 'hisobot': 15, 'uchrashuv': 12, 'pul': 3}\nvocab_size = 10\n\ndef log_prob(words: list[str], counts: dict, prior: float) -> float:\n    total = sum(counts.values())\n    score = math.log(prior)\n    for w in words:\n        # Laplace smoothing: (count + 1) / (total + V)\n        p_w = (counts.get(w, 0) + 1) / (total + vocab_size)\n        score += math.log(p_w)\n    return score\n\nmsg = ['yutuq', 'pul', 'aksiya']\nprint('Spam log-score:', round(log_prob(msg, spam_words, 0.3), 3))\nprint('Ham  log-score:', round(log_prob(msg, ham_words, 0.7), 3))",
                "outputOrNoteUz": "Natija: Spam log-score (`-5.573`) Ham log-score (`-10.892`) dan ancha yuqori bo'lgani uchun xabar SPAM deb topildi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Ketma-ket Bayesian Yangilanish (Sequential Updating)",
                "scenarioUz": "Birinchi tekshiruvdan so'ng chiqqan Posterior ehtimollikni ikkinchi mustaqil tekshiruv uchun yangi Prior sifatida ishlatish.",
                "howToUseUz": "Ketma-ket 2 ta detektor ishlaganda ishonch qanday 16.7% dan 79.2% ga oshishini ko'ring.",
                "code": "def update_belief(prior: float, tpr: float, fpr: float) -> float:\n    return (tpr * prior) / (tpr * prior + fpr * (1.0 - prior))\n\np0 = 0.01 # Boshlang'ich prior: 1%\np1 = update_belief(p0, tpr=0.99, fpr=0.05) # 1-qoida signali\np2 = update_belief(p1, tpr=0.95, fpr=0.05) # 2-mustaqil ML model tasdig'i\n\nprint(f'Boshlang\\'ich Prior:       {p0:.2%}')\nprint(f'1-detektordan so\\'ng:     {p1:.2%}')\nprint(f'2-detektor tasdig\\'idan:  {p2:.2%}')",
                "expectedOutput": "Boshlang'ich Prior:       1.00%\n1-detektordan so'ng:     16.67%\n2-detektor tasdig'idan:  79.17%",
                "breakdownUz": "Ikki bosqichli tekshiruv (Rule + ML yoki Bi-Encoder + Cross-Encoder Reranker) yolg'on trevogalarni keskin kamaytiradi."
            },
            {
                "titleUz": "2-misol: Maximum Likelihood Estimation (MLE) vs MAP",
                "scenarioUz": "Tanga 3 marta tashlanganda 3 marta 'Gerb' tushdi. Oddiy MLE ehtimolni 100% deb yuboradi, Bayesian Prior (Beta taqsimot) esa uni sog'lom chegarada ushlaydi.",
                "howToUseUz": "MLE va Laplace/Beta smoothing farqini sinang.",
                "code": "heads, total = 3, 3\nmle_prob = heads / total\n# Beta(2, 2) prior bilan MAP / Posterior mean:\nbayes_prob = (heads + 2) / (total + 4)\nprint(f'3/3 gerb tushganda: MLE = {mle_prob:.2%} (overconfident) | Bayesian = {bayes_prob:.2%} (regularized)')",
                "expectedOutput": "3/3 gerb tushganda: MLE = 100.00% (overconfident) | Bayesian = 71.43% (regularized)",
                "breakdownUz": "Kichik tanlanmada (small sample size) Prior qo'shish modelni haddan tashqari keskin xulosa chiqarishdan (overfitting) saqlaydi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Prior, Likelihood & Posterior",
                "category": "Math & Stats",
                "definitionUz": "Prior $P(A)$ — tajribagacha bo'lgan boshlang'ich ehtimol; Likelihood $P(B|A)$ — gipoteza ostida kuzatuv ehtimoli; Posterior $P(A|B)$ — dalildan keyingi yangilangan ehtimol.",
                "analogyOrExampleUz": "Shifokor tashxisi: bemor xonaga kirmasidan kasallikning aholidagi uchrashi (Prior), tahlil natijasi (Likelihood) va tahlildan keyingi yakuniy tashxis (Posterior).",
                "connectedTo": [
                    {
                        "targetTerm": "Precision & PR-AUC in Imbalanced ML",
                        "targetLessonId": "D04.2",
                        "relationshipUz": "4-haftada o'rganiladigan `Precision = TP / (TP + FP)` aslida aynan Bayesian Posterior $P(y=1 | \\hat{y}=1)$ hisoblanadi!"
                    }
                ]
            },
            {
                "term": "Laplace Smoothing (Add-1 / Add-alpha)",
                "category": "Math & Stats",
                "definitionUz": "Kuzatilmagan hodisa ehtimoli `0` bo'lib ko'paytmani yo'qqa chiqarmasligi uchun suratga $\\alpha$, maxrajga $\\alpha |V|$ qo'shish usuli.",
                "analogyOrExampleUz": "Yangi ochilgan do'konning hali birorta ham salbiy bahosi yo'q bo'lsa ham, hisob-kitobda nolga bo'linmaslik uchun 1 ta neytral ovoz zaxira qilish.",
                "connectedTo": [
                    {
                        "targetTerm": "BM25 Lexical Scoring in RAG",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "8-haftadagi BM25 qidiruv formulasida ham noyob so'zlarning IDF og'irligini hisoblashda $+0.5$ smoothing qo'llaniladi."
                    }
                ]
            },
            {
                "term": "Log-Likelihood & Numerical Underflow",
                "category": "Math & Stats",
                "definitionUz": "Ko'plab kichik ehtimolliklar ko'paytmasi ($0.01 \\times 0.002 \\dots$) kompyuter float64 aniqligidan tushib `0.0` bo'lib qolmasligi uchun logarifmlar yig'indisiga ($\\sum \\ln p_i$) o'tish.",
                "analogyOrExampleUz": "Juda kichik kasrlarni ko'paytirish o'rniga ularning daraja ko'rsatkichlarini oddiy qo'shish.",
                "connectedTo": [
                    {
                        "targetTerm": "LLM Token Logprobs & Perplexity",
                        "targetLessonId": "D06.3",
                        "relationshipUz": "LLM har bir generatsiya qilingan token ishonchini aynan `logprob` sifatida qaytaradi va Perplexity $= \\exp(-\\frac{1}{N}\\sum \\ln P(w_i))$ orqali o'lchanadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d03-3-int-1",
                "level": "Junior",
                "questionUz": "Kasallik aholining 0.1% qismida uchraydi. Testning sezgirligi (Sensitivity/Recall) 99%, yolg'on musbat (False Positive Rate) darajasi 1%. Test musbat chiqqan odamning rostdan kasal bo'lish ehtimoli qancha?",
                "interviewerIntentUz": "Klassik Bayes intervyu masalasini yecha olishini tekshirish.",
                "strongAnswerUz": "100,000 kishidan 100 nafari (0.1%) kasal, 99,900 nafari sog'lom. Test 100 ta kasaldan 99 tasini to'g'ri topadi (`TP = 99`). Ammo 99,900 ta sog'lom odamning 1% ida xato musbat chiqadi (`FP = 999`). Jami musbat testlar: $99 + 999 = 1098$ ta. Shulardan haqiqiy kasallar ulushi: $99 / 1098 \\approx 9.02\\%$. Ya'ni test 99% aniq bo'lsa ham, Base Rate juda kichikligi sababli ehtimollik atigi ~9%!",
                "redFlagUz": "'99% yoki 98% bo'ladi' deb javob berish.",
                "followUpQuestionUz": "Savol: Qanday qilib bu ehtimollikni 90%+ ga chiqarish mumkin? Javob: Birinchi test musbat chiqqan guruhga (endi ularda Prior = 9.02% bo'ldi!) ikkinchi mustaqil tasdiqlovchi testni qo'llash orqali."
            },
            {
                "id": "d03-3-int-2",
                "level": "Middle",
                "questionUz": "Naive Bayes algoritmi nega 'Naive' (Sodda) deb ataladi va bu faraz buzilsa ham u nega matn klassifikatsiyasida yaxshi ishlaydi?",
                "interviewerIntentUz": "Shartli mustaqillik (Conditional Independence) farazini va klassifikatsiya qaror chegarasini tushunishini sinash.",
                "strongAnswerUz": "U 'Naive' deyiladi, chunki klass berilganda barcha belgilar (masalan gapdagi so'zlar) bir-biridan o'zaro shartli mustaqil ($P(w_1, w_2 | C) = P(w_1|C)P(w_2|C)$) deb faraz qiladi. Real tilda so'zlar bog'liq ('sun'iy' va 'intellekt' birga keladi). Shunga qaramay, klassifikatsiya uchun bizga aniq ehtimollik qiymati emas, balki qaysi klassning `argmax` bahosi kattaroq ekanligi (tartibi) muhim — shuning uchun qaror chegarasi (decision boundary) ko'pincha to'g'ri qolaveradi.",
                "redFlagUz": "'Chunki u juda oddiy va kichik kod bilan yoziladi' deyish.",
                "followUpQuestionUz": "Savol: Naive Bayes ehtimolliklari (`predict_proba`) yaxshi kalibrlangan bo'ladimi? Javob: Yo'q! Mustaqillik farazi buzilgani uchun u ehtimolliklarni `0` yoki `1` ga juda yaqin (overconfident) chiqaradi; aniq ehtimollik kerak bo'lsa `CalibratedClassifierCV` (Platt scaling / Isotonic) qo'llash kerak."
            },
            {
                "id": "d03-3-int-3",
                "level": "Senior / Production",
                "questionUz": "L2 Regularizatsiya (Ridge) va L1 Regularizatsiya (Lasso) ning Bayesian nuqtai nazardan ma'nosi nima?",
                "interviewerIntentUz": "Maximum A Posteriori (MAP) va Regularizatsiya o'rtasidagi chuqur matematik bog'liqlikni bilishini tekshirish.",
                "strongAnswerUz": "MSE Loss ustida L2 regularizatsiya ($\\lambda \\|w\\|_2^2$) qo'llash — og'irliklar $w$ ga markazi 0 da bo'lgan **Normal (Gaussian) Prior** $w_i \\sim \\mathcal{N}(0, \\sigma^2)$ berib, Maximum A Posteriori (MAP) bahosini topish bilan 100% ekvivalentdir! L1 regularizatsiya ($\\lambda \\|w\\|_1$, Lasso) esa og'irliklarga o'tkir cho'qqili **Laplace Prior** berishga teng bo'lib, aynan shu o'tkir cho'qqi ko'plab ahamiyatsiz og'irliklarni aynan `0` ga tushirib (feature selection / sparsity) yuboradi.",
                "redFlagUz": "Regularizatsiya va Bayesian Prior orasidagi bog'liqlikni bilmaslik.",
                "followUpQuestionUz": "Savol: Qachon L1 (Lasso) o'rniga ElasticNet ishlatasiz? Javob: O'zaro kuchli korrelyatsiyaga ega (multicollinear) ustunlar guruhi bo'lganda Lasso ulardan tasodifiy bittasini tanlab qolganini o'chiradi, ElasticNet (`L1 + L2`) esa bog'liq guruhni barqaror ushlab qoladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d03-3-en",
                "title": "Confusion Matrix, Precision, Recall & F1 — Explained Together!",
                "channel": "Benjy Bodner",
                "language": "en",
                "youtubeId": "RQiNbojL07Y",
                "youtubeUrl": "https://www.youtube.com/watch?v=RQiNbojL07Y",
                "durationOrTimestamp": "To'liq vizual tahlil",
                "whatItExplainsUz": "True Positive, False Positive, Precision ($P(y=1|\\hat{y}=1)$) va Recall ($P(\\hat{y}=1|y=1)$) shartli ehtimollik sifatida vizual ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi Precision va Recall ta'riflarini Bayes formulasidagi Posterior (`Precision`) va Likelihood (`Recall`) bilan bog'lab kodda tekshiring."
            },
            {
                "id": "vid-d03-3-uz",
                "title": "KPI va Biznes Metrikalarni To'g'ri Qo'yish",
                "channel": "MFaktor",
                "language": "uz",
                "youtubeId": "WG8TpAqrWSo",
                "youtubeUrl": "https://www.youtube.com/watch?v=WG8TpAqrWSo",
                "durationOrTimestamp": "Analitik qarorlar bo'limi",
                "whatItExplainsUz": "Biznesda xato qarorlar (yolg'on trevoga vs o'tkazib yuborilgan imkoniyat) narxini o'lchash va ko'rsatkichlarni to'g'ri belgilash tushuntirilgan.",
                "howToUseVideoUz": "Fraud va Churn masalalarida False Positive va False Negative biznesga qancha zarar keltirishini hisoblab ko'ring."
            }
        ],
        "quiz": [
            {
                "id": "d03-3-q1",
                "promptUz": "1. Konseptual: Bayes formulasida $P(A)$ va $P(A|B)$ mos ravishda qanday nomlanadi?",
                "options": [
                    "Variance va Standard Deviation",
                    "Prior (boshlang'ich ehtimol) va Posterior (dalildan keyingi yangilangan ehtimol)",
                    "Precision va Accuracy",
                    "Gradient va Loss"
                ],
                "correctIndex": 1,
                "explanationUz": "$P(A)$ yangi dalil ko'rilmasidan oldingi Prior ehtimol, $P(A|B)$ esa $B$ dalil kuzatilgandan keyingi Posterior ehtimoldir."
            },
            {
                "id": "d03-3-q2",
                "promptUz": "2. Kod Tahlili: Naive Bayes matn klassifikatorida nega ehtimolliklar ko'paytmasi $\\prod P(w_i|C)$ o'rniga logarifmlar yig'indisi $\\sum \\ln P(w_i|C)$ hisoblanadi?",
                "options": [
                    "Faqat manfiy sonlar chiqarish uchun",
                    "Ko'plab kichik sonlar ko'paytmasi float64 da 0.0 bo'lib qolishi (numerical underflow) ning oldini olish uchun",
                    "Matn uzunligini qisqartirish uchun",
                    "Xotirani tozalash uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "100 ta so'zning $0.001$ kabi ehtimolliklari ko'paytirilsa $10^{-300}$ bo'lib `0.0` ga aylanib qoladi; logarifmlar yig'indisi esa barqaror ishlaydi."
            },
            {
                "id": "d03-3-q3",
                "promptUz": "3. Production Debugging: Naive Bayes modelida o'qitish to'plamida uchramagan bitta yangi so'z kelishi bilan barcha klasslar ehtimoli `0` bo'lib qolyapti. Qanday tuzatiladi?",
                "options": [
                    "Laplace Smoothing (Add-1 / Add-alpha) qo'shish kerak",
                    "Yangi so'zlarni taqiqlash kerak",
                    "Learning rate'ni oshirish kerak",
                    "Modelni o'chirib tashlash kerak"
                ],
                "correctIndex": 0,
                "explanationUz": "Laplace smoothing suratga $+1$ va maxrajga $+|V|$ qo'shib, hech bir so'z ehtimoli `0` bo'lib qolmasligini ta'minlaydi."
            }
        ]
    },
    "D03.4": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Ishonch Oralig'i (Confidence Interval) va Standart Xato (SE)",
                "explanationUz": "Hech qachon biznesga bitta yalang'och raqam ('O'rtacha chek 120,000 so'm yoki Model F1 = 0.84') aytilmasligi kerak — tanlanma kichik bo'lsa bu tasodif bo'lishi mumkin! **Standart Xato** $SE = \\frac{s}{\\sqrt{n}}$ tanlanma o'rtachasining qanchalik tebranishini ko'rsatadi. **95% Ishonch Oralig'i (95% CI)** $\\bar{x} \\pm 1.96 \\cdot SE$ haqiqiy populatsiya o'rtachasi katta ehtimol bilan qaysi diapazonda yotishini bildiradi.",
                "codeExample": "import numpy as np\n\nnp.random.seed(7)\nsample = np.random.normal(loc=150_000, scale=30_000, size=100)\nmean = np.mean(sample)\nse = np.std(sample, ddof=1) / np.sqrt(len(sample))\nci_low, ci_high = mean - 1.96 * se, mean + 1.96 * se\nprint(f'O\\'rtacha: {mean:,.0f} UZS | 95% CI: [{ci_low:,.0f}, {ci_high:,.0f}] UZS')",
                "outputOrNoteUz": "Natija: Tanlanma hajmi $n$ 4 barobar oshsa, $\\sqrt{n}$ hisobiga noaniqlik oralig'i 2 barobar torayadi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Bootstrap Resampling — Har Qanday Metrika Uchun CI",
                "explanationUz": "Klassik formula ($\\bar{x} \\pm 1.96 SE$) faqat oddiy o'rtacha uchun va normal taqsimotda ishlaydi. Ammo **Mediana**, **95-persentil latency**, yoki **F1-score / PR-AUC** uchun ishonch oralig'ini qanday topamiz? Yechim: **Bootstrap**! Mavjud $N$ ta ma'lumotdan qaytarish bilan (with replacement) 1,000–10,000 marta yangi tanlanma tortib, har birida metrikani hisoblaymiz va `2.5%` hamda `97.5%` kvantillarini olamiz.",
                "codeExample": "import numpy as np\n\nnp.random.seed(42)\nlatencies_ms = np.random.exponential(scale=120.0, size=200) # Kuchli qiyshiq taqsimot\n\nboot_Medians = []\nfor _ in range(2000):\n    resample = np.random.choice(latencies_ms, size=len(latencies_ms), replace=True)\n    boot_Medians.append(np.median(resample))\n\nlow, high = np.percentile(boot_Medians, [2.5, 97.5])\nprint(f'Asl Mediana: {np.median(latencies_ms):.1f} ms | Bootstrap 95% CI: [{low:.1f}, {high:.1f}] ms')",
                "outputOrNoteUz": "Natija: Hech qanday normal taqsimot farazisiz mediananing 95% ishonch oralig'i `[71.4, 98.7] ms` aniq topildi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: A/B Testlash, p-value va Statistical Power",
                "explanationUz": "Yangi ML tavsiya algoritmi (`B - Treatment`) eski algoritmdan (`A - Control`) rostdan yaxshimi yoki bu tasodifiy shovqinmi? **Nol gipoteza ($H_0$)**: 'Farq yo'q ($\\mu_B - \\mu_A = 0$)'. **p-value** — agar aslida hech qanday farq bo'lmasa ($H_0$ rost bo'lsa), kamida shunchalik katta farqni tasodifan kuzatish ehtimoli. Agar $p < \\alpha$ ($0.05$) bo'lsa, $H_0$ rad etiladi va o'zgarish statistik ahamiyatli (statistically significant) deb topiladi.",
                "codeExample": "import numpy as np\n\n# A guruh (1000 user, 100 xarid = 10.0%), B guruh (1000 user, 132 xarid = 13.2%)\nn_a, conv_a = 1000, 100\nn_b, conv_b = 1000, 132\np_a, p_b = conv_a / n_a, conv_b / n_b\n\np_pool = (conv_a + conv_b) / (n_a + n_b)\nse_diff = np.sqrt(p_pool * (1 - p_pool) * (1/n_a + 1/n_b))\nz_stat = (p_b - p_a) / se_diff\nprint(f'Konversiya o\\'sishi: +{(p_b - p_a):.1%} | Z-statistika: {z_stat:.2f} (> 1.96 => Statistik ahamiyatli!)')",
                "outputOrNoteUz": "Natija: `Z = 2.24 > 1.96` ($p \\approx 0.025 < 0.05$). Demak, +3.2% o'sish tasodif emas!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Permutation Test (Ikki Guruh O'rtasidagi Farqni Simulyatsiya Bilan Tekshirish)",
                "scenarioUz": "Murakkab statistik jadvallarsiz A va B guruh o'rtasidagi farq tasodifiy bo'lish ehtimolini (exact p-value) Python'da hisoblash.",
                "howToUseUz": "Kodni ishga tushiring.",
                "code": "import numpy as np\n\nnp.random.seed(10)\ngroup_a = np.array([10, 12, 11, 14, 13, 12, 10, 15])\ngroup_b = np.array([16, 18, 15, 19, 17, 20, 14, 18])\nobs_diff = group_b.mean() - group_a.mean()\n\ncombined = np.concatenate([group_a, group_b])\ncount_extreme = 0\ntrials = 5000\nfor _ in range(trials):\n    perm = np.random.permutation(combined)\n    diff = perm[len(group_a):].mean() - perm[:len(group_a)].mean()\n    if abs(diff) >= abs(obs_diff):\n        count_extreme += 1\n\np_val = count_extreme / trials\nprint(f'Kuzatilgan farq: +{obs_diff:.2f} | Permutation p-value: {p_val:.4f}')",
                "expectedOutput": "Kuzatilgan farq: +5.00 | Permutation p-value: 0.0004",
                "breakdownUz": "5000 ta tasodifiy aralashtirishda bunday katta farq deyarli chiqmadi (`p = 0.0004 < 0.05`), demak B guruh rostdan ustun."
            },
            {
                "titleUz": "2-misol: Multiple Testing va Bonferroni Tuzatishi",
                "scenarioUz": "Agar bir vaqtda 20 ta turli tugma rangini A/B test qilsangiz, $\\alpha=0.05$ da hech bo'lmasa bittasi tasodifan 'yutib chiqish' ehtimoli $1 - 0.95^{20} = 64\\%$ ga yetadi!",
                "howToUseUz": "Bonferroni chegarasini hisoblab ko'ring.",
                "code": "alpha = 0.05\nm_tests = 20\nfalse_alarm_prob = 1.0 - (1.0 - alpha) ** m_tests\nbonferroni_alpha = alpha / m_tests\nprint(f'20 ta testda tasodifiy yolg\\'on yutuq ehtimoli: {false_alarm_prob:.1%}')\nprint(f'Bonferroni yangi qat\\'iy chegarasi: p < {bonferroni_alpha:.4f}')",
                "expectedOutput": "20 ta testda tasodifiy yolg'on yutuq ehtimoli: 64.2%\nBonferroni yangi qat'iy chegarasi: p < 0.0025",
                "breakdownUz": "Ko'p gipotezani bir vaqtda tekshirganda $\\alpha / m$ (Bonferroni) yoki Benjamini-Hochberg (FDR) tuzatishi shart."
            }
        ],
        "termsAndConnections": [
            {
                "term": "p-value & Type I / Type II Errors",
                "category": "Math & Stats",
                "definitionUz": "Type I Error ($\\alpha$, False Positive) — aslida farq yo'q bo'lsa ham 'farq bor' deb xato xulosa qilish; Type II Error ($\\beta$, False Negative) — haqiqiy farqni sezmay qolish. Statistical Power $= 1 - \\beta$.",
                "analogyOrExampleUz": "Sud qarori: Type I — aybsiz odamni jazolash; Type II — haqiqiy aybdorni qo'yib yuborish.",
                "connectedTo": [
                    {
                        "targetTerm": "Data Drift Detection (KS-Test / PSI)",
                        "targetLessonId": "D11.2",
                        "relationshipUz": "11-haftada Evidently AI yangi kelayotgan production ma'lumotlari eski train ma'lumotlaridan o'zgarganini (Drift) aynan statistik test p-value orqali aniqlaydi."
                    }
                ]
            },
            {
                "term": "Bootstrap Resampling",
                "category": "Math & Stats",
                "definitionUz": "Mavjud tanlanmadan qaytarish bilan (`replace=True`) ko'p marta qayta tanlanma olib, har qanday murakkab metrikaning empirik taqsimoti va ishonch oralig'ini topish.",
                "analogyOrExampleUz": "Bitta savatdagi mevalardan qayta-qayta tasodifiy tortib ko'rib, o'rtacha og'irlik qanchalik luqillashini baholash.",
                "connectedTo": [
                    {
                        "targetTerm": "Bagging & Random Forest",
                        "targetLessonId": "D04.2",
                        "relationshipUz": "Random Forest algoritmidagi 'Bagging' so'zi aynan **Bootstrap Aggregating** qisqartmasidir — har bir daraxt bootstrap tanlanma ustida o'qitiladi!"
                    }
                ]
            },
            {
                "term": "Statistical vs Practical Significance (MDE)",
                "category": "Math & Stats",
                "definitionUz": "Minimum Detectable Effect (MDE) — biznes uchun xarajatni oqlaydigan minimal amaliy o'sish; juda katta tanlanmada +0.001% o'sish ham $p < 0.05$ chiqishi mumkin, ammo amaliy foydasi nol bo'ladi.",
                "analogyOrExampleUz": "Dori qon bosimini 0.01 birlikka tushirishi 1 million bemorda statistik tasdiqlanishi mumkin, lekin bemor sog'lig'iga amaliy foydasi yo'q.",
                "connectedTo": [
                    {
                        "targetTerm": "Canary & Shadow Model Rollout",
                        "targetLessonId": "D11.3",
                        "relationshipUz": "11-haftada yangi ML modelni eski model bilan online A/B va Canary rejimida solishtirganda ham statistik, ham biznes MDE tekshiriladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d03-4-int-1",
                "level": "Junior",
                "questionUz": "`p-value = 0.03` degani 'Nol gipoteza ($H_0$) rost bo'lish ehtimoli 3%' deganimi?",
                "interviewerIntentUz": "Data Science intervyularidagi #1 eng ko'p beriladigan tuzoq savol!",
                "strongAnswerUz": "Yo'q, bu eng keng tarqalgan xato talqin! `p-value` — bu $P(H_0 | \\text{Data})$ EMAS, balki $P(\\text{Data yoki undan ekstremal natija} | H_0 \\text{ rost})$ deganidir. Ya'ni: 'Agar ikki versiya orasida aslida HECH QANDAY farq bo'lmaganida edi ($H_0$ 100% rost deb faraz qilinganda), bunday yoki bundan katta farqni tasodifan ko'rishimiz ehtimoli 3% bo'lardi'.",
                "redFlagUz": "'Ha, p=0.03 degani yangi versiya 97% ehtimol bilan yaxshiroq degani' deb javob berish.",
                "followUpQuestionUz": "Savol: 95% Confidence Interval (Ishonch oralig'i) `[-0.5%, +4.2%]` chiqdi. Bu nimani anglatadi? Javob: Oraliq ichida `0` mavjud bo'lgani uchun $\\alpha=0.05$ darajada farq statistik ahamiyatli EMAS ($p > 0.05$)."
            },
            {
                "id": "d03-4-int-2",
                "level": "Middle",
                "questionUz": "A/B testni 2 hafta davom ettirish rejalashtirilgan edi, ammo 3-kuni qaraganimizda `p-value = 0.04` chiqdi. Testni shu zahoti to'xtatib, B versiyani g'olib deb e'lon qilish mumkinmi?",
                "interviewerIntentUz": "Peeking problem (erta mo'ralash xatosi) va hafta kunlari sezonalitesini tushunishini sinash.",
                "strongAnswerUz": "Aslo yo'q! Bu **Peeking Problem** deyiladi: har kuni `p-value` ga qarab, u tasodifan $0.05$ dan pastga tushgan kuni testni to'xtatish False Positive (Type I Error) darajasini 5% dan 25-30% gacha oshirib yuboradi! Bundan tashqari, 3 kun ichida dam olish kunlari (shanba-yakshanba) foydalanuvchi xulq-atvori va Novelty Effect (yangilik effekti) qamrab olinmaydi. Test oldindan Power Analysis orqali hisoblangan sample size va kamida to'liq 1-2 haftalik biznes sikli tugaguncha davom etishi shart (yoki Sequential Testing chegaralari ishlatilishi kerak).",
                "redFlagUz": "'Ha, p < 0.05 chiqdimi, vaqtni tejash uchun darhol to'xtatish kerak' deyish.",
                "followUpQuestionUz": "Savol: Sample Size (kerakli foydalanuvchilar soni) test boshlanishidan oldin qaysi 4 ta parametr asosida hisoblanadi? Javob: 1) Baseline konversiya; 2) Minimum Detectable Effect (MDE); 3) $\\alpha$ (odatda 0.05); 4) Power $1 - \\beta$ (odatda 0.80)."
            },
            {
                "id": "d03-4-int-3",
                "level": "Senior / Production",
                "questionUz": "A/B testda 50/50 bo'linish belgilangan edi, ammo tahlil vaqtida A guruhda 50,000 ta, B guruhda esa 47,200 ta foydalanuvchi borligi aniqlandi. Bunda `p-value` hisoblashdan oldin nimani tekshirasiz?",
                "interviewerIntentUz": "Sample Ratio Mismatch (SRM) va eksperiment telemetriya xatolarini bilishini tekshirish.",
                "strongAnswerUz": "Bu **Sample Ratio Mismatch (SRM)** xavfidir! Agar Chi-square ($\\chi^2$) goodness-of-fit testi 50/50 nisbatning buzilganini ko'rsatsa ($p_{\\text{SRM}} < 0.001$), A/B testning BARCHA natijalari yaroqsiz hisoblanadi. Sababi: B versiyada sahifa sekin yuklangani uchun foydalanuvchilar log yozilmasidan chiqib ketgan bo'lishi, bot filtri B guruhga boshqacha ishlagani yoki redirect bug bo'lishi mumkin (Survivorship bias). Avval SRM sababi bartaraf etilib, eksperiment qayta boshlanadi.",
                "redFlagUz": "'Guruhlar soni sal farq qilsa hech narsa qilmaydi, formula o'zi hisobga oladi' deyish.",
                "followUpQuestionUz": "Savol: Ijtimoiy tarmoq yoki taksi ilovasida (masalan Toshkentdagi haydovchilar va yo'lovchilar) oddiy user-level random A/B split nega ishlamaydi? Javob: Network Interference (SUTVA buzilishi) — B guruhdagi haydovchi A guruhdagi yo'lovchining buyurtmasini olib qo'yadi; shuning uchun Geo-split yoki Time-switchback dizayni ishlatiladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d03-4-en",
                "title": "P-Value, Confidence Interval and Significance Explained",
                "channel": "IHDE Academy",
                "language": "en",
                "youtubeId": "xvcvPZi5hI0",
                "youtubeUrl": "https://www.youtube.com/watch?v=xvcvPZi5hI0",
                "durationOrTimestamp": "To'liq vizual dars",
                "whatItExplainsUz": "Gipoteza testlash, p-value, $\\alpha = 0.05$ va 95% ishonch oralig'i o'rtasidagi bog'liqlik grafiklarda ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, yuqoridagi Bootstrap va Permutation test kodlarida sample size'ni kichraytirib, ishonch oralig'i qanday kengayishini kuzating."
            },
            {
                "id": "vid-d03-4-ru",
                "title": "A/B ТЕСТИРОВАНИЕ простыми словами",
                "channel": "Noukash",
                "language": "ru",
                "youtubeId": "omntvfihdnM",
                "youtubeUrl": "https://www.youtube.com/watch?v=omntvfihdnM",
                "durationOrTimestamp": "To'liq amaliy tahlil",
                "whatItExplainsUz": "IT mahsulotlarda va ML tizimlarida A/B testlarni rejalashtirish, metrikalar tanlash va xatolardan qochish tushuntirilgan.",
                "howToUseVideoUz": "Intervyudagi Peeking Problem va Sample Ratio Mismatch savollariga javob berishda videodagi misollardan foydalaning."
            }
        ],
        "quiz": [
            {
                "id": "d03-4-q1",
                "promptUz": "1. Konseptual: Mediana, 95-persentil latency yoki F1-score kabi murakkab metrikalar uchun normal taqsimot farazisiz 95% ishonch oralig'ini topishning eng universal usuli qaysi?",
                "options": [
                    "Faqat oddiy o'rtacha formulasini qo'llash",
                    "Bootstrap resampling (qaytarish bilan minglab marta qayta tanlanma olib kvantillarni hisoblash)",
                    "Ma'lumotni 2 ga ko'paytirish",
                    "p-value ni 1 ga tenglash"
                ],
                "correctIndex": 1,
                "explanationUz": "Bootstrap har qanday taqsimot va har qanday metrika uchun empirik ishonch oralig'ini hisoblay oladi."
            },
            {
                "id": "d03-4-q2",
                "promptUz": "2. Kod Tahlili: A/B testda $\\mu_B - \\mu_A$ farqining 95% ishonch oralig'i `[+1.2%, +4.8%]` chiqdi. Bu nimani bildiradi?",
                "options": [
                    "Farq statistik ahamiyatli emas",
                    "Oraliq 0 ni o'z ichiga olmagani va to'liq musbat bo'lgani uchun B versiya $\\alpha=0.05$ darajada statistik ahamiyatli ravishda ustun",
                    "A versiya yutgan",
                    "Test xato ishlagan"
                ],
                "correctIndex": 1,
                "explanationUz": "95% CI ichida `0` yo'q bo'lsa, bu ikki tomonlama testda $p < 0.05$ ekanligini va o'sish ishonchli ekanini anglatadi."
            },
            {
                "id": "d03-4-q3",
                "promptUz": "3. Production Debugging: 14 kunlik A/B testning 2-kunida `p = 0.04` ko'rindi deb testni muddatidan oldin to'xtatish (Peeking) qanday xavf tug'diradi?",
                "options": [
                    "Hech qanday xavfi yo'q, vaqt tejaladi",
                    "False Positive (Type I Error) ehtimolini 5% dan 25-30% gacha oshirib yuboradi va hafta kunlari effektini o'tkazib yuboradi",
                    "Server xotirasi to'lib qoladi",
                    "Foydalanuvchilar tizimdan chiqib ketadi"
                ],
                "correctIndex": 1,
                "explanationUz": "Har kuni p-value'ga mo'ralab erta to'xtatish tasodifiy shovqinni 'g'alaba' deb qabul qilish ehtimolini keskin oshiradi."
            }
        ]
    }
}
