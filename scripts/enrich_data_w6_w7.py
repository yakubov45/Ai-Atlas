# -*- coding: utf-8 -*-
"""
Enrichment data for Weeks 6 and 7 (D06.1 - D07.3)
"""

ENRICH_W6_W7 = {
    "D06.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: O'zbek Tili Morfologiyasi va Subword Tokenizatsiya (BPE / WordPiece)",
                "explanationUz": "O'zbek tili — **agglyutinativ til** (so'z o'zagiga ko'plab qo'shimchalar ketma-ket ulanadi: `kitob + lar + imiz + dagi + lar + dan`). Agar so'z darajasida (word-level) lug'at qursak, bitta o'zakning 500 xil shakli lug'atni millionlab so'zga shishirib yuboradi va yangi qo'shimchali so'z `<UNK>` (noma'lum) bo'lib qoladi. Agar harf darajasida (char-level) qilsak, ketma-ketlik juda uzayib ma'no yo'qoladi. Yechim — **Subword Tokenization (BPE / WordPiece / Unigram)**: u eng ko'p uchraydigan harf juftliklarini birlashtirib, o'zak (`kitob`) va qo'shimchalarni (`##lar`, `##imiz`, `##dan`) alohida ma'noli bo'laklar sifatida kodlaydi!",
                "codeExample": "def normalize_uzbek_apostrophes(text: str) -> str:\n    # O'zbek tilidagi o', g' va tutuq belgisi (') ning 5 xil Unicode shaklini yagona standartga keltirish:\n    variants = ['\\u2018', '\\u2019', '\\u02bb', '\\u02bc', '`']\n    for v in variants:\n        text = text.replace(v, \"'\")\n    return text\n\nraw_samples = [\"O\\u2018zbekiston\", \"O\\u2019zbekiston\", \"O`zbekiston\", \"O'zbekiston\"]\nnormed = {normalize_uzbek_apostrophes(s) for s in raw_samples}\nprint('4 xil yozilgan so\\'z normalizatsiyadan so\\'ng:', normed, '| Noyob shakl soni:', len(normed))",
                "outputOrNoteUz": "Natija: 4 xil Unicode apostrof bilan yozilgan `O'zbekiston` so'zi bitta kanonik shaklga keltirildi! Aks holda tokenizer ularni 4 ta butunlay boshqa so'z deb qabul qiladi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Token Fertility (Nega O'zbekcha Matn LLM'da Qimmatroq va Sekinroq?)",
                "explanationUz": "**Fertility (Token zichligi)** — 1 ta so'z o'rtacha nechta tokenga bo'linishini ko'rsatadi. Ingliz tiliga moslangan eski tokenizerlarda (masalan GPT-3.5 / Llama-2) 1 ta inglizcha so'z ~1.3 token bo'lsa, 1 ta o'zbekcha so'z 3–5 ta mayda bo'lakka (`O`, `'`, `z`, `bek`, `ist`, `onda`) parchalanib ketadi! Bu 3 ta oqibatga olib keladi: 1) Kontekst oynasi 3x tez to'ladi; 2) API narxi 3x qimmatga tushadi; 3) Generatsiya 3x sekinlashadi (chunki LLM har bir token uchun 1 marta forward pass qiladi). Zamonaviy ko'p tilli modellar (`Qwen2.5`, `Gemma-2`, `GPT-4o`, `XLM-RoBERTa`) 128k–256k lug'at bilan bu farqni ancha qisqartirgan.",
                "codeExample": "en_text = 'Artificial intelligence changes the world'\nuz_text = \"Sun'iy intellekt dunyoni o'zgartirmoqda\"\n\n# Ingliz-markaziy va Ko'p-tilli tokenizer simulyatsiyasi:\nen_tokens = ['Artificial', 'intelligence', 'changes', 'the', 'world']\nuz_legacy_tokens = ['Sun', \"'\", 'iy', 'int', 'elle', 'kt', 'dun', 'yoni', 'o', \"'\", 'zgar', 'tir', 'moq', 'da']\nuz_modern_tokens = [\"Sun'iy\", 'intellekt', 'dunyoni', \"o'zgartir\", 'moqda']\n\nprint(f'Inglizcha ({len(en_text.split())} so\\'z): {len(en_tokens)} token | Fertility = {len(en_tokens)/5:.2f}')\nprint(f'O\\'zbekcha Eski Tokenizer:  {len(uz_legacy_tokens)} token | Fertility = {len(uz_legacy_tokens)/4:.2f} (3.5x qimmat!)')\nprint(f'O\\'zbekcha Qwen/XLM-R:      {len(uz_modern_tokens)} token | Fertility = {len(uz_modern_tokens)/4:.2f}')",
                "outputOrNoteUz": "Natija: Eski tokenizerda 4 ta o'zbekcha so'z 14 ta tokenga (`Fertility = 3.50`) bo'linib ketdi, zamonaviy ko'p tilli tokenizerda esa 5 ta tokenga (`Fertility = 1.25`) tushdi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Dense Embeddings (`nn.Embedding`) — Diskret ID'dan Ma'nolar Fazosiga",
                "explanationUz": "Tokenizer matnni butun sonlar ro'yxatiga (`[1542, 892, 44]`) aylantiradi. Ammo `1542` va `1543` sonlari orasida matematik yaqinlik yo'q. `nn.Embedding(vocab_size, embed_dim)` — bu o'qitiladigan ulkan qidiruv jadvali (lookup table matritsasi $E \\in \\mathbb{R}^{V \\times d}$) bo'lib, har bir token ID'ga $d$-o'lchamli (masalan 768 yoki 1024) zich vektor beradi. O'qitish davomida ma'nodosh so'zlarning (`Toshkent`, `Samarqand`, `poytaxt`) vektorlari fazoda bir-biriga yaqinlashadi.",
                "codeExample": "import numpy as np\n\nnp.random.seed(7)\nvocab = {'<PAD>': 0, 'kredit': 1, 'ipoteka': 2, 'olma': 3}\n# 4 ta token, har biri 3 o'lchamli embedding vektorga ega:\nembedding_table = np.array([\n    [0.0,  0.0,  0.0], # 0: <PAD>\n    [0.91, 0.85, 0.12], # 1: kredit\n    [0.88, 0.82, 0.15], # 2: ipoteka\n    [0.05, 0.10, 0.95], # 3: olma\n])\n\ntoken_ids = [1, 2]\nembedded_seq = embedding_table[token_ids] # Lookup O(1)!\nprint('Token ID [1, 2] uchun Embedding matritsasi (shape 2x3):\\n', embedded_seq)",
                "outputOrNoteUz": "Natija: One-hot vektor ko'paytmasi o'rniga `embedding_table[token_ids]` indeks bo'yicha `O(1)` vaqtda mos qatorlarni kesib oladi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Byte-Pair Encoding (BPE) Algoritmini Noldan Kodlash",
                "scenarioUz": "Karpathy'ning `minbpe` uslubida eng ko'p yonma-yon kelgan token juftligini topib, yangi token ID ga birlashtirish (`merge`) jarayonini ko'rish.",
                "howToUseUz": "BPE merge qadamlarini Python muharririda ishga tushiring.",
                "code": "from collections import Counter\n\ndef get_pair_stats(ids: list[int]) -> Counter:\n    return Counter(zip(ids, ids[1:]))\n\ndef merge_pair(ids: list[int], pair: tuple[int, int], new_id: int) -> list[int]:\n    out, i = [], 0\n    while i < len(ids):\n        if i < len(ids) - 1 and (ids[i], ids[i+1]) == pair:\n            out.append(new_id)\n            i += 2\n        else:\n            out.append(ids[i])\n            i += 1\n    return out\n\n# 'kitoblar kitoblarimiz' baytlari:\ntext_ids = list('kitoblar kitoblar'.encode('utf-8'))\nprint('Boshlang\\'ich uzunlik:', len(text_ids))\nfor step in range(3):\n    top_pair, freq = get_pair_stats(text_ids).most_common(1)[0]\n    new_tok = 256 + step\n    text_ids = merge_pair(text_ids, top_pair, new_tok)\n    print(f'Merge {step+1}: juftlik {top_pair} (freq={freq}) -> yangi ID {new_tok} | Yangi uzunlik: {len(text_ids)}')",
                "expectedOutput": "Boshlang'ich uzunlik: 17\nMerge 1: juftlik (107, 105) (freq=2) -> yangi ID 256 | Yangi uzunlik: 15...",
                "breakdownUz": "Har bir merge qadamida eng ko'p takrorlangan bo'g'in bitta yangi tokenga siqilib, ketma-ketlik uzunligi qisqarib boradi."
            },
            {
                "titleUz": "2-misol: Mean Pooling Bilan Gap Embeddingini Olish (Sentence Embedding)",
                "scenarioUz": "Tokenlarning alohida vektorlaridan (`(Seq_len, Dim)`) butun gapni ifodalovchi bitta vektor (`(Dim,)`) yasashda `<PAD>` tokenlarini maskalash.",
                "howToUseUz": "Attention mask bilan to'g'ri Mean Pooling hisoblashni sinang.",
                "code": "import numpy as np\n\n# 3 ta token + 2 ta <PAD> (jami 5 uzunlik, dim=3)\ntoken_embeds = np.array([\n    [0.8, 0.2, 0.4],\n    [0.6, 0.4, 0.5],\n    [0.7, 0.3, 0.6],\n    [0.0, 0.0, 0.0], # PAD\n    [0.0, 0.0, 0.0], # PAD\n])\nattention_mask = np.array([[1], [1], [1], [0], [0]]) # 1 = haqiqiy token, 0 = PAD\n\n# XATO: oddiy mean(axis=0) PAD nollarini ham 5 ga bo'lib, vektorni kichraytirib yuboradi!\nbad_pool = token_embeds.mean(axis=0)\n# TO'G'RI: faqat mask=1 bo'lgan tokenlar yig'indisini haqiqiy tokenlar soniga (3 ga) bo'lish!\ngood_pool = (token_embeds * attention_mask).sum(axis=0) / attention_mask.sum()\n\nprint('Xato (PAD qo\\'shilgan) mean:', np.round(bad_pool, 3))\nprint('To\\'g\\'ri (Maskalangan) mean:', np.round(good_pool, 3))",
                "expectedOutput": "Xato (PAD qo'shilgan) mean: [0.42 0.18 0.3 ]\nTo'g'ri (Maskalangan) mean: [0.7  0.3  0.5 ]",
                "breakdownUz": "Sentence-Transformers (`BGE-M3`, `multilingual-e5`) da Mean Pooling qilayotganda albatta `attention_mask` ga ko'paytirib, haqiqiy uzunlikka bo'lish shart!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "Subword Tokenization (BPE / WordPiece / SentencePiece)",
                "category": "Deep Learning & NLP",
                "definitionUz": "Matnni statistik chastotaga ko'ra to'liq so'zlar, o'zaklar, qo'shimchalar va yakka belgilardan iborat optimal lug'at birliklariga (`token ID`) ajratish algoritmi.",
                "analogyOrExampleUz": "Lego konstruktori: har bir yangi o'yinchoqni yaxlit quyish o'rniga, har qanday shaklni yasash mumkin bo'lgan standart g'ishtchalardan yig'ish.",
                "connectedTo": [
                    {
                        "targetTerm": "LLM Pricing, Latency & Context Window",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "7-haftada KV Cache hajmi va generatsiya vaqti so'zlar soniga emas, aynan tokenizer chiqargan **tokenlar soniga** to'g'ri proporsional bo'ladi."
                    }
                ]
            },
            {
                "term": "Token Fertility & Multilingual Vocabulary",
                "category": "Deep Learning & NLP",
                "definitionUz": "Bitta so'zni kodlash uchun sarflanadigan o'rtacha tokenlar soni ($N_{\\text{tokens}} / N_{\\text{words}}$). Past fertility ($1.1 - 1.4$) tilning tokenizerda yaxshi qo'llab-quvvatlanganini bildiradi.",
                "analogyOrExampleUz": "Valyuta ayirboshlash kursi: yaxshi tokenizerda 1 ta o'zbekcha so'z 1 ta tanga tursa, yomon tokenizerda 4 ta mayda chaqaga bo'linib ketadi.",
                "connectedTo": [
                    {
                        "targetTerm": "Uzbek RAG Chunk Size in Tokens",
                        "targetLessonId": "D08.1",
                        "relationshipUz": "8-haftada o'zbekcha hujjatlarni 512 tokenlik bo'laklarga (chunk) bo'lganda, tokenizerning fertility ko'rsatkichiga qarab bitta chunkka nechta so'z sig'ishi aniqlanadi."
                    }
                ]
            },
            {
                "term": "Embedding Lookup & Mean Pooling",
                "category": "Deep Learning & NLP",
                "definitionUz": "Diskret token ID'larni uzluksiz $\\mathbb{R}^d$ vektor fazosiga akslantirish va token vektorlarini `attention_mask` hisobiga o'rtachalab butun jumla vektorini olish.",
                "analogyOrExampleUz": "Har bir so'zning pasport raqamiga (`ID`) qarab uning 768 ta xarakter xususiyatidan iborat psixologik portretini (`embedding`) ochish.",
                "connectedTo": [
                    {
                        "targetTerm": "Cosine Similarity & Vector DB",
                        "targetLessonId": "D03.1",
                        "relationshipUz": "3-haftada o'rganilgan Cosine Similarity aynan shu Mean Pooling'dan chiqqan jumla embeddinglari orasidagi ma'no yaqinligini o'lchaydi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d06-1-int-1",
                "level": "Junior",
                "questionUz": "Nima uchun zamonaviy NLP va LLM modellarida Word-level (so'zma-so'z) yoki Character-level (harfma-harf) emas, balki Subword (BPE) tokenizatsiya ishlatiladi?",
                "interviewerIntentUz": "Lug'at hajmi (Vocab size), OOV (`<UNK>`) va ketma-ketlik uzunligi (`Seq len`) o'rtasidagi oltin o'rtaliqni tushunishini sinash.",
                "strongAnswerUz": "Word-level tokenizatsiyada qo'shimchalar va xato yozilgan so'zlar tufayli lug'at millionlab so'zga shishib ketadi, embedding matritsasi ($V \\times d$) xotirani yeb qo'yadi va lug'atda yo'q har qanday yangi so'z `<UNK>` bo'lib ma'nosi butunlay yo'qoladi. Character-level'da esa lug'at kichik bo'lsa-da, gap uzunligi 5-7 barobar cho'zilib ketadi va Attention ($O(T^2)$) hisoblashi portlaydi. **Subword (BPE)** ikkalasining afzalligini birlashtiradi: ko'p uchraydigan so'zlarni yaxlit qoldiradi, kam uchraydigan so'zlarni esa tanish o'zak va qo'shimchalarga bo'lib, `<UNK>` muammosini butunlay yo'qotadi.",
                "redFlagUz": "'BPE faqat bo'sh joy (`split()`) bo'yicha so'zlarni ajratadi' deyish.",
                "followUpQuestionUz": "Savol: Byte-level BPE (GPT-2/3/4, Llama-3, Qwen) da umuman `<UNK>` tokeni chiqishi mumkinmi? Javob: Yo'q! Chunki bazaviy alifbo barcha 256 ta UTF-8 baytdan boshlanadi — har qanday belgi, smaylik yoki yangi tildagi harf eng yomon holatda o'zining UTF-8 baytlariga bo'linib 100% kodlanadi."
            },
            {
                "id": "d06-1-int-2",
                "level": "Middle",
                "questionUz": "O'zbek tilidagi korporativ ma'lumotlar bilan ishlaganda matnni tokenizatsiyadan oldin qanday maxsus preprocessing qoidalaridan o'tkazish kerak?",
                "interviewerIntentUz": "O'zbek tili NLP amaliyotidagi real muammolarni (apostrof xilma-xilligi, kirill-lotin) bilishini tekshirish.",
                "strongAnswerUz": "1) **Apostrof normalizatsiyasi**: o'zbek lotin yozuvidagi `o'`, `g'` va tutuq belgisi foydalanuvchi klaviaturasiga qarab 5-6 xil Unicode belgi (`'`, `‘`, `’`, `ʻ`, `ʼ`, `` ` ``) bilan keladi — ularni yagona standartga keltirmasa embedding va BM25 qidiruvda bir xil so'z topilmay qoladi; 2) **Kirill va Lotin (Dual-script) boshqaruvi**: hujjatlar aralash alifboda bo'lsa transliteratsiya yoki ikki alifboni ham tushunadigan ko'p tilli embedding (`BGE-M3`) tanlash; 3) NFC Unicode normalizatsiyasi.",
                "redFlagUz": "'Ingliz tili uchun yozilgan `re.sub(r\"[^a-zA-Z]\", \" \", text)` regexni qo'llayman' deyish (bu regex `'`, `o'`, `g'` va kirill harflarini buzib tashlaydi!).",
                "followUpQuestionUz": "Savol: Nima uchun zamonaviy BPE tokenizerlarda (BERT/GPT) классик stemming/lemmatization (qo'shimchalarni kesib tashlash) qilinmaydi? Javob: Chunki qo'shimchalarni kesib tashlash zamon, inkor (`-ma`) va egalik ma'nosini yo'qotadi (`борди` vs `бормади`); subword tokenizerning o'zi o'zak va qo'shimchani alohida token qilib, ularning barcha grammatik ma'nosini saqlab qoladi!"
            },
            {
                "id": "d06-1-int-3",
                "level": "Senior / Production",
                "questionUz": "Word2Vec / FastText kabi statik embeddinglar bilan BERT / BGE-M3 kabi kontekstual (Contextual) embeddinglar o'rtasida qanday fundamental farq bor?",
                "interviewerIntentUz": "Polysemy (ko'p ma'nolilik) va Self-Attention kontekstualizatsiyasini tushunishini sinash.",
                "strongAnswerUz": "Statik embeddinglarda (`Word2Vec`, `GloVe`, yoki Transformerning 0-qavat `nn.Embedding` jadvalida) har bir so'z kontekstdan qat'i nazar FAQAT BITTA qotib qolgan vektorga ega — masalan, *'U ko'zini **yosh**ga to'ldirdi'* va *'U hali juda **yosh** mutaxassis'* gaplaridagi `'yosh'` (ko'z yoshi vs yosh yigit) yoki `'olma'` (meva vs fe'l) so'zlari bir xil vektor oladi. BERT / BGE-M3 kabi kontekstual modellarda esa token vektori $L$ ta Self-Attention qatlamidan o'tib, atrofdagi so'zlar bilan boyitiladi — natijada `'yosh'` so'zi ikki gapda ikki xil, kontekstga mos vektor oladi.",
                "redFlagUz": "'Farqi faqat vektor o'lchamida: Word2Vec 300 o'lchamli, BERT 768 o'lchamli' deyish.",
                "followUpQuestionUz": "Savol: `multilingual-e5` modelidan foydalanayotganda so'rov va hujjat oldiga `'query: '` va `'passage: '` prefikslarini qo'shishni unutsangiz nima bo'ladi? Javob: Model asimmetrik qidiruvga aynan shu prefikslar bilan contrastive o'qitilgani uchun retrieval sifati (Recall@5 / nDCG) 10-20% ga keskin tushib ketadi!"
            }
        ],
        "videos": [
            {
                "id": "vid-d06-1-uz",
                "title": "Kun 1. LLM qanday ishlaydi? Tokenlar va nega o'zbekcha matn qimmatroq?",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "3w2ws7xyXYE",
                "youtubeUrl": "https://www.youtube.com/watch?v=3w2ws7xyXYE",
                "durationOrTimestamp": "AI Engineer 44 kun, 1-kun",
                "whatItExplainsUz": "O'zbek tilidagi matnlarning LLM tokenizerlarida qanday bo'laklarga ajralishi, token fertility, narx va tezlikka ta'siri jonli misollarda tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, yuqoridagi 2-bosqich Fertility kodida o'zingizning o'zbekcha jumlalaringizni sinab ko'ring."
            },
            {
                "id": "vid-d06-1-en",
                "title": "How LLMs Read Text: Tokenization Explained Visually (BPE, Special Tokens)",
                "channel": "Caspi Mind",
                "language": "en",
                "youtubeId": "eEd_CnX3vGQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=eEd_CnX3vGQ",
                "durationOrTimestamp": "To'liq vizual tahlil",
                "whatItExplainsUz": "BPE algoritmining harflarni qanday birlashtirishi va maxsus tokenlar (`<|endoftext|>`, `<|im_start|>`, `[CLS]`) vazifasi vizual animatsiyada ko'rsatilgan.",
                "howToUseVideoUz": "1-amaliy misoldagi BPE `merge_pair` funksiyasini videodagi animatsiya bilan qadamma-qadam solishtiring."
            }
        ],
        "quiz": [
            {
                "id": "d06-1-q1",
                "promptUz": "1. Konseptual: O'zbek tilidagi matnlarni qayta ishlashda Subword (BPE / WordPiece) tokenizatsiyaning asosiy afzalligi nimada?",
                "options": [
                    "Faqat inglizcha so'zlarni qoldirib, o'zbekchasini o'chirib yuboradi",
                    "So'z o'zaklari va qo'shimchalarni (`kitob`, `##lar`, `##imiz`) alohida tokenlarga ajratib, lug'atda yo'q (<UNK>) so'zlar muammosini hal qiladi",
                    "Matnni rasmga aylantiradi",
                    "Xotirani 100 barobar ko'paytiradi"
                ],
                "correctIndex": 1,
                "explanationUz": "Agglyutinativ tillarda BPE o'zak va qo'shimchalarni samarali kodlab, cheklangan lug'at bilan istalgan so'z shaklini ifodalaydi."
            },
            {
                "id": "d06-1-q2",
                "promptUz": "2. Kod Tahlili: Gapdagi 3 ta haqiqiy token va 2 ta `<PAD>` tokenidan Mean Pooling orqali gap embeddingini olishda nima uchun `attention_mask` ga ko'paytirish va `mask.sum()` (`3`) ga bo'lish shart?",
                "options": [
                    "Vektor uzunligini 0 qilish uchun",
                    "Padding nol vektorlari umumiy o'rtachani (5 ga bo'lib) sun'iy ravishda kichraytirib va buzib yubormasligi uchun",
                    "Faqat GPU ishlashi uchun",
                    "Tokenlarni teskari tartiblash uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "Oddiy `.mean(axis=0)` 3 ta token yig'indisini 5 ga bo'lib yuboradi; maskalangan pooling esa faqat haqiqiy tokenlar o'rtachasini oladi."
            },
            {
                "id": "d06-1-q3",
                "promptUz": "3. Production Debugging: O'zbekcha RAG qidiruvida foydalanuvchi `O‘zbekiston` deb qidirganda bazadagi `O'zbekiston` hujjati topilmayapti. Eng birinchi qilinadigan yechim nima?",
                "options": [
                    "Bazani o'chirib qayta yig'ish",
                    "Ingestion va Query bosqichlarida barcha apostrof va tutuq belgisi Unicode variantlarini (`‘`, `’`, `ʻ`, `` ` ``) yagona standart `'` belgisiga normalizatsiya qilish",
                    "Faqat katta harflarda qidirish",
                    "Top-K ni 1 ga tushirish"
                ],
                "correctIndex": 1,
                "explanationUz": "O'zbek matnlarida Unicode apostrof normalizatsiyasi qilinmasa, bir xil so'z turli token ID'larga bo'linib ketadi."
            }
        ]
    },
    "D06.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Self-Attention Intuitsiyasi — Query (Q), Key (K) va Value (V)",
                "explanationUz": "*\"Ot ko'prikdan o'tdi, chunki **u** juda tez edi\"* gapidagi **'u'** olmoshi nimaga tegishli — otgami yoki ko'prikka? **Self-Attention** har bir tokenga gapdagi barcha boshqa tokenlarga 'qarash' va kontekst yig'ish imkonini beradi. Buning uchun har bir token vektori $x_i$ 3 ta matritsaga ko'paytirilib 3 xil rolga kiradi: 1) **Query ($Q = X W_Q$)** — 'Men qanday ma'lumot qidiryapman?'; 2) **Key ($K = X W_K$)** — 'Menda qanday ma'lumot yorlig'i bor?'; 3) **Value ($V = X W_V$)** — 'Agar menga e'tibor qaratsang, senga uzatadigan haqiqiy mazmunim'.",
                "codeExample": "import numpy as np\n\n# 3 ta token ('Ot', 'tez', 'u'), har biri 4 o'lchamli:\nX = np.array([\n    [1.0, 0.0, 1.0, 0.0], # 0: Ot\n    [0.0, 1.0, 0.0, 1.0], # 1: tez\n    [0.9, 0.1, 0.8, 0.0], # 2: u ('Ot' ga yaqin so'rov)\n])\n# Sodda holatda W_Q = W_K = W_V = I deb olsak:\nraw_scores = X @ X.T\nprint('Q @ K.T o\\'xshashlik matritsasi (3x3):\\n', np.round(raw_scores, 2))",
                "outputOrNoteUz": "Natija: 2-qator (`'u'`) 0-ustun (`'Ot'`) bilan `1.70` yuqori ball, 1-ustun (`'tez'`) bilan `0.10` past ball ko'rsatdi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Scaled Dot-Product Attention Formulasi va $\\sqrt{d_k}$ Sababi",
                "explanationUz": "Mashhur formula: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$. **Nima uchun $\\sqrt{d_k}$ ga bo'linadi?** Agar vektor o'lchami $d_k = 64$ yoki $128$ bo'lsa, $Q K^T$ skalyar ko'paytmasining dispersiyasi (variance) $d_k$ marta kattalashib ketadi ($\\pm 30$ kabi katta sonlar chiqadi). Katta sonlar `Softmax` ga kirganda eng kattasi `1.0`, qolgan barchasi `0.0000` (one-hot) bo'lib qoladi va Softmax hosilasi `0` ga aylanib **gradient o'ladi (Vanishing Gradient)**! $\\sqrt{d_k}$ ga bo'lish dispersiyani qaytadan `1.0` ga tushirib, Softmax'ni yumshoq va o'qitiluvchan hududda ushlab turadi.",
                "codeExample": "import numpy as np\n\ndef softmax(x: np.ndarray) -> np.ndarray:\n    e = np.exp(x - np.max(x, axis=-1, keepdims=True))\n    return e / np.sum(e, axis=-1, keepdims=True)\n\nd_k = 64\nraw_logits = np.array([16.0, 8.0, 4.0]) # sqrt(64)=8 ga bo'linmagan katta logitlar\nscaled_logits = raw_logits / np.sqrt(d_k)\n\nprint('Bo\\'linmagan Softmax (saturatsiya!):', np.round(softmax(raw_logits), 5))\nprint('sqrt(d_k) ga bo\\'lingan Softmax:     ', np.round(softmax(scaled_logits), 4))",
                "outputOrNoteUz": "Natija: Bo'linmaganda `[0.99966, 0.00034, 0.00001]` (gradient o'lgan!), $\\sqrt{d_k}$ ga bo'linganda esa `[0.6652, 0.2447, 0.0900]` (sog'lom taqsimot) chiqdi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Multi-Head Attention va $O(T^2)$ Kvadratik Murakkablik",
                "explanationUz": "Bitta Attention boshi (Single Head) faqat bitta turdagi bog'liqlikka e'tibor qaratishi mumkin. **Multi-Head Attention (MHA)** embedding o'lchamini $d_{\\text{model}} = 768$ ni $h = 12$ ta boshga ($d_k = 768 / 12 = 64$) bo'lib, parallel ravishda 1-boshda grammatik bog'liqlikni, 2-boshda olmoshlarni, 3-boshda vaqt va joyni kuzatadi, so'ng ularni `Concat` qilib $W_O$ matritsaga ko'paytiradi. Ammo $Q K^T$ matritsasi $T \\times T$ o'lchamli bo'lgani uchun kontekst uzunligi $T$ 4 barobar oshsa, Attention hisoblashi va xotirasi $4^2 = 16$ barobar oshadi ($O(T^2)$)!",
                "codeExample": "for seq_len in [512, 2048, 8192, 32768]:\n    attn_matrix_elements = seq_len * seq_len\n    fp16_mb = (attn_matrix_elements * 2) / (1024 ** 2) # 1 ta head uchun FP16 bayt\n    print(f'T = {seq_len:>5} token -> T^2 = {attn_matrix_elements:>11,} juftlik | 1-head matritsa: {fp16_mb:>7.2f} MB')",
                "outputOrNoteUz": "Natija: `T=512` da atigi `0.50 MB` bo'lgan matritsa `T=32,768` da bitta boshning o'zi uchun `2,048 MB (2 GB)` ga yetadi! (FlashAttention aynan shu $T \\times T$ matritsani HBM xotiraga yozmasdan SRAM keshda bloklab hisoblaydi)."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: To'liq Scaled Dot-Product Attention Funksiyasi NumPy'da",
                "scenarioUz": "Kiruvchi $Q, K, V$ matritsalaridan Attention og'irliklarini (`attn_weights`) va kontekst vektorini (`context`) hisoblash.",
                "howToUseUz": "Kodni ishga tushiring va har bir qatordagi og'irliklar yig'indisi `1.0` ga tengligini tekshiring.",
                "code": "import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray):\n    d_k = Q.shape[-1]\n    scores = (Q @ K.T) / np.sqrt(d_k)\n    # Barqaror Softmax:\n    exp_s = np.exp(scores - np.max(scores, axis=-1, keepdims=True))\n    weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)\n    output = weights @ V\n    return output, weights\n\nnp.random.seed(0)\nQ = np.random.randn(3, 4)\nK = np.random.randn(3, 4)\nV = np.array([[10.0, 0.0], [0.0, 20.0], [5.0, 5.0]])\n\nout, w = scaled_dot_product_attention(Q, K, V)\nprint('Attention Weights (har qator yig\\'indisi = 1.0):\\n', np.round(w, 3))\nprint('Yakuniy boyitilgan Context Vektorlar (3x2):\\n', np.round(out, 2))",
                "expectedOutput": "Attention Weights (har qator yig'indisi = 1.0):\n [[0.347 0.254 0.399] ...]\nYakuniy boyitilgan Context Vektorlar (3x2):\n [[5.46 7.07] ...]",
                "breakdownUz": "Chiqish vektori $V$ qatorlarining Attention ehtimolliklari bo'yicha o'lchangan o'rtacha yig'indisi (weighted sum) hisoblanadi."
            },
            {
                "titleUz": "2-misol: Positional Encoding (Sinusoidal va RoPE Sababi)",
                "scenarioUz": "Self-Attention o'z holicha so'zlar tartibini bilmaydi ('It mushukni quvdi' va 'Mushuk itni quvdi' to'plam sifatida bir xil ko'rinadi). Pozitsiya vektorini qo'shish.",
                "howToUseUz": "Sinusoidal pozitsion kodlash formulasini sinab ko'ring.",
                "code": "import numpy as np\n\ndef sinusoidal_positional_encoding(max_len: int, d_model: int) -> np.ndarray:\n    pe = np.zeros((max_len, d_model))\n    pos = np.arange(0, max_len)[:, np.newaxis]\n    div = np.exp(np.arange(0, d_model, 2) * -(np.log(10000.0) / d_model))\n    pe[:, 0::2] = np.sin(pos * div)\n    pe[:, 1::2] = np.cos(pos * div)\n    return pe\n\npe = sinusoidal_positional_encoding(max_len=4, d_model=6)\nprint('4 ta pozitsiya uchun 6 o\\'lchamli Positional Encoding:\\n', np.round(pe, 3))",
                "expectedOutput": "4 ta pozitsiya uchun 6 o'lchamli Positional Encoding:\n [[ 0.     1.     0.     1.     0.     1.   ]\n [ 0.841  0.54   0.046  0.999  0.002  1.   ]...]",
                "breakdownUz": "Zamonaviy LLM'larda (Llama-3, Qwen, Mistral) mutlaq pozitsiya o'rniga **RoPE (Rotary Position Embedding)** — $Q$ va $K$ vektorlarini nisbiy masofa burchagiga burish usuli ishlatiladi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Scaled Dot-Product Attention ($Q, K, V$)",
                "category": "Deep Learning & NLP",
                "definitionUz": "So'rov ($Q$) va Kalit ($K$) vektorlarining ichki ko'paytmasini $\\sqrt{d_k}$ ga masshtablab, Softmax orqali Qiymat ($V$) vektorlarining vaznli yig'indisini oluvchi mexanizm.",
                "analogyOrExampleUz": "Kutubxona katalogi: sizning qidiruv so'rovingiz ($Q$), kitob muqovasidagi teglar ($K$) bilan solishtiriladi va moslik darajasiga qarab kitob ichidagi mazmun ($V$) o'qib olinadi.",
                "connectedTo": [
                    {
                        "targetTerm": "KV Cache in LLM Serving",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "7-haftada avtoregressiv generatsiya paytida oldingi tokenlarning $K$ va $V$ matritsalarini qayta hisoblamaslik uchun ularni VRAMda **KV Cache** sifatida saqlaymiz!"
                    }
                ]
            },
            {
                "term": "Multi-Head Attention (MHA) vs GQA",
                "category": "Deep Learning & NLP",
                "definitionUz": "MHA — har bir Query boshi uchun alohida Key va Value boshi; **GQA (Grouped-Query Attention)** — bir nechta Query boshiga bitta umumiy Key-Value boshini ulab, KV Cache xotirasini 4-8 barobar tejash (Llama-3, Qwen2.5).",
                "analogyOrExampleUz": "MHA — 8 ta tergovchining har birida shaxsiy kotib bo'lishi; GQA — हर 4 ta tergovchi bitta umumiy kotib va arxivdan ($K, V$) foydalanishi.",
                "connectedTo": [
                    {
                        "targetTerm": "16 GB RAM Local LLM Memory Budget",
                        "targetLessonId": "D07.1",
                        "relationshipUz": "7-haftada Llama-3 8B modelining 16 GB RAMga uzun kontekst bilan sig'ishining asosiy siri — unda 32 ta Query head uchun atigi 8 ta KV head (GQA) ishlatilganidir!"
                    }
                ]
            },
            {
                "term": "RoPE (Rotary Position Embedding) & FlashAttention",
                "category": "Deep Learning & NLP",
                "definitionUz": "RoPE — tokenlar orasidagi nisbiy masofani 2D aylanish matritsasi burchagi orqali kodlash; FlashAttention — GPU SRAM tiling orqali $T \\times T$ matritsani HBMga yozmasdan $O(T)$ xotirada aniq Attention hisoblash.",
                "analogyOrExampleUz": "FlashAttention — katta daftar sahifasini uzoqdagi omborga (HBM) borib-kelib yozmasdan, stol ustidagi kichik bloknotda (SRAM) bo'laklab hisoblab tugatish.",
                "connectedTo": [
                    {
                        "targetTerm": "Long-Context RAG Chunking",
                        "targetLessonId": "D08.1",
                        "relationshipUz": "RoPE va FlashAttention zamonaviy LLM'larga 32k–128k kontekst oynasida RAG hujjatlarini qabul qilish imkonini beradi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d06-2-int-1",
                "level": "Junior",
                "questionUz": "Self-Attention formulasida nima uchun $Q K^T$ ko'paytmasi $\\sqrt{d_k}$ ga bo'linadi?",
                "interviewerIntentUz": "Transformer arxitekturasi bo'yicha #1 eng ko'p beriladigan intervyu savoli!",
                "strongAnswerUz": "Agar $q$ va $k$ vektorlarining komponentlari $\\mu=0, \\sigma^2=1$ mustaqil tasodifiy miqdorlar bo'lsa, ularning ichki ko'paytmasi $q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i$ ning o'rtachasi $0$, ammo dispersiyasi (**variance**) $d_k$ ga, standart og'ishi esa $\\sqrt{d_k}$ ga teng bo'lib qoladi. $d_k = 64$ yoki $128$ bo'lganda ko'paytma juda katta musbat va manfiy qiymatlar oladi. Bu qiymatlar `Softmax` ga kirganda funksiya to'yinish (saturation) zonasiga tushib, bitta element `1.0`, qolganlari `0.0` bo'lib qoladi va Softmax Jacobian hosilasi `0` ga aylanib gradient yo'qoladi. $\\sqrt{d_k}$ ga bo'lish dispersiyani qaytadan $\\sigma^2 = 1$ ga normallashtiradi.",
                "redFlagUz": "'Sonlar xotiraga sig'ishi uchun yoki hisoblash tezroq bo'lishi uchun bo'linadi' deyish.",
                "followUpQuestionUz": "Savol: Softmax'ni kompyuterda hisoblashda `exp(x)` overflow (`inf`) bo'lmasligi uchun qanday matematik hiyla (trick) ishlatiladi? Javob: `exp(x - max(x))` — har bir qatordan o'sha qatorning maksimal elementini ayirish! Bu Softmax natijasini umuman o'zgartirmaydi, lekin ko'rsatkich $\\le 0$ bo'lib overflow hech qachon yuz bermaydi."
            },
            {
                "id": "d06-2-int-2",
                "level": "Middle",
                "questionUz": "Eski RNN / LSTM arxitekturalariga nisbatan Self-Attention (Transformer) ning 2 ta asosiy ustunligi va 1 ta kamchiligi nimada?",
                "interviewerIntentUz": "RNN vs Transformer arxitektura trade-off'larini tushunishini sinash.",
                "strongAnswerUz": "Ustunliklari: 1) **Parallelizatsiya**: RNN tokenlarni $t_1 \\to t_2 \\to \\dots \\to t_T$ ketma-ket hisoblagani uchun GPU'da parallel o'qitib bo'lmaydi; Transformer esa o'qitish vaqtida butun gapdagi barcha tokenlarni bitta matritsa ko'paytmasi bilan parallel hisoblaydi; 2) **Uzoq masofali bog'liqlik ($O(1)$ path length)**: RNN'da 1-so'zdan 500-so'zgacha signal 500 ta qadamdan o'tib unutiladi, Self-Attention'da esa har qanday ikki token orasidagi masofa 1 qadamga teng. Kamchiligi: **Kvadratik murakkablik $O(T^2)$** — kontekst uzunligi $T$ juda katta bo'lganda hisoblash va xotira kvadratik o'sadi (RNN'da esa $O(T)$ chiziqli edi).",
                "redFlagUz": "'Transformerda parametrlar soni kamroq bo'lgani uchun tez ishlaydi' deyish.",
                "followUpQuestionUz": "Savol: Nima uchun Transformer'ga Positional Encoding qo'shish majburiy, RNN'da esa shart emas edi? Javob: RNN tokenlarni ketma-ket qabul qilgani uchun tartib arxitekturaning o'zida bor edi; Self-Attention esa pozitsiya qo'shilmasa **permutation-equivariant** (to'plam operatsiyasi) bo'lib, so'zlar joyi almashsa ham sezmaydi."
            },
            {
                "id": "d06-2-int-3",
                "level": "Senior / Production",
                "questionUz": "Multi-Head Attention'da 1 ta katta bosh ($d_{\\text{model}} = 768$) ishlatish bilan 12 ta kichik bosh ($12 \\times 64 = 768$) ishlatishda parametrlar va FLOPs soni necha barobar farq qiladi?",
                "interviewerIntentUz": "Multi-Head Attention o'lchamlarining matematik ekvivalentligini bilishini tekshirish.",
                "strongAnswerUz": "**Umuman farq qilmaydi (1 barobar — aynan teng)!** Chunki 12 ta boshning har biri to'liq $768$ o'lchamda emas, balki $d_k = 768 / 12 = 64$ o'lchamli kichik fazoda (subspace) ishlaydi. Amalda $W_Q, W_K, W_V$ matritsalari bitta yirik $(768 \\times 768)$ chiziqli qatlam sifatida ko'paytirilib, keyin tensor `.view(B, T, 12, 64).transpose(1, 2)` orqali 12 ta boshga bo'linadi. Demak, hisoblash xarajati 1 ta katta bosh bilan deyarli bir xil bo'lgan holda, model 12 ta mustaqil semantik/sintaktik ko'rish burchagiga (representation subspaces) ega bo'ladi!",
                "redFlagUz": "'12 ta head bo'lsa parametrlar va hisoblash 12 barobar ko'payadi' deb javob berish!",
                "followUpQuestionUz": "Savol: Grouped-Query Attention (GQA) va Multi-Query Attention (MQA) nima uchun o'ylab topilgan? Javob: Generatsiya (inferens) vaqtida asosiy bottleneck hisoblash emas, balki VRAMdan KV Cache'ni o'qish o'tkazuvchanligidir (Memory Bandwidth). GQA $K$ va $V$ boshlari sonini 4-8 marta qisqartirib, sifatni yo'qotmasdan KV Cache hajmini 4-8 barobar kichraytiradi."
            }
        ],
        "videos": [
            {
                "id": "vid-d06-2-en",
                "title": "Attention in transformers, step-by-step | Deep Learning Chapter 6",
                "channel": "3Blue1Brown",
                "language": "en",
                "youtubeId": "eMlx5fFNoYc",
                "youtubeUrl": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
                "durationOrTimestamp": "To'liq 3D vizual shoh asar",
                "whatItExplainsUz": "Grant Sanderson (3Blue1Brown) tomonidan Query, Key, Value matritsalari, Dot Product, Softmax va kontekst vektorining shakllanishi 3D animatsiyada mukammal tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rib bo'lgach, 1-amaliy misoldagi `scaled_dot_product_attention(Q, K, V)` kodini o'zgartirib, har bir matritsa o'lchamini tekshiring."
            },
            {
                "id": "vid-d06-2-ru",
                "title": "How Attention Works: A Simple Explanation for Beginners",
                "channel": "MLinside",
                "language": "ru",
                "youtubeId": "Iwzui77MLjc",
                "youtubeUrl": "https://www.youtube.com/watch?v=Iwzui77MLjc",
                "durationOrTimestamp": "To'liq tushuntirish",
                "whatItExplainsUz": "Self-Attention va Multi-Head Attention mexanizmlari sodda misollar va chizmalar yordamida tahlil qilingan.",
                "howToUseVideoUz": "Intervyudagi $\\sqrt{d_k}$ va Multi-Head Attention savollariga javob berish uchun asosiy formulalarni yozib oling."
            }
        ],
        "quiz": [
            {
                "id": "d06-2-q1",
                "promptUz": "1. Konseptual: Self-Attention formulasida $Q K^T$ ko'paytmasini $\\sqrt{d_k}$ ga bo'lishning matematik maqsadi nima?",
                "options": [
                    "Vektorlarni butun songa aylantirish",
                    "Katta $d_k$ o'lchamda skalyar ko'paytma dispersiyasini 1 ga normallashtirib, Softmax to'yinishi (saturation) va gradient yo'qolishining oldini olish",
                    "Matn tilini o'zgartirish",
                    "Xotirani 2 barobar ko'paytirish"
                ],
                "correctIndex": 1,
                "explanationUz": "Masshtablash bo'lmasa logitlar juda kattalashib, Softmax one-hot vektorga aylanib qoladi va gradientlar `0` ga tushadi."
            },
            {
                "id": "d06-2-q2",
                "promptUz": "2. Kod Tahlili: Standart Self-Attention qatlamida kiruvchi ketma-ketlik uzunligi $T = 1000$ tokendan $T = 4000$ tokenga (4 barobar) oshirilsa, Attention matritsasi ($T \\times T$) hajmi necha barobar oshadi?",
                "options": [
                    "4 barobar",
                    "16 barobar (chunki murakkablik $O(T^2)$ kvadratik: $4^2 = 16$)",
                    "2 barobar",
                    "O'zgarmaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "Har bir token barcha tokenlar bilan juftlik hosil qilgani uchun matritsa elementlari soni $T^2$ qonuniyati bo'yicha $4^2 = 16$ marta o'sadi."
            },
            {
                "id": "d06-2-q3",
                "promptUz": "3. Production Debugging: Transformer modelidan Positional Encoding (RoPE yoki Sinusoidal) butunlay olib tashlansa (va causal mask bo'lmasa), model gapga qanday qaraydi?",
                "options": [
                    "Model umuman ishga tushmaydi",
                    "Model so'zlar tartibini va o'rnini farqlay olmay qoladi ('It mushukni quvdi' va 'Mushuk itni quvdi' bir xil to'plam bo'lib ko'rinadi)",
                    "Model 10 barobar aqlliroq bo'ladi",
                    "Faqat birinchi so'zni o'qiydi"
                ],
                "correctIndex": 1,
                "explanationUz": "Self-Attention pozitsiya ma'lumotisiz to'plam operatsiyasi (permutation-equivariant) hisoblanadi."
            }
        ]
    },
    "D06.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Decoder-Only (GPT) va Causal Masking (Kelajakka Mo'ralashni Taqiqlash)",
                "explanationUz": "GPT (Generative Pre-trained Transformer) — **Avtoregressiv Decoder-Only** model bo'lib, uning vazifasi oldingi tokenlar $w_1, \\dots, w_t$ asosida keyingi token $w_{t+1}$ ni topishdir. O'qitish vaqtida butun gap parallel uzatilganida $t$-token $t+1$-tokendagi tayyor javobni ko'rib qo'ymasligi (cheating / look-ahead leakage bo'lmasligi) uchun $Q K^T$ matritsasining asosiy diagonaldan yuqori uchburchagi Softmax'dan OLDIN **`-inf` (manfiy cheksizlik)** bilan to'ldiriladi (**Causal Mask**). Softmax ichida $e^{-\\infty} = 0$ bo'lib, kelajak tokenlarining og'irligi aynan `0.0` ga aylanadi!",
                "codeExample": "import numpy as np\n\nT = 4\nscores = np.ones((T, T)) # 4x4 ballar\n# Yuqori uchburchak (k=1) kelajak tokenlari:\nmask = np.triu(np.ones((T, T), dtype=bool), k=1)\nmasked_scores = np.where(mask, -1e9, scores)\n\nexp_s = np.exp(masked_scores - np.max(masked_scores, axis=-1, keepdims=True))\ncausal_weights = exp_s / np.sum(exp_s, axis=-1, keepdims=True)\nprint('Causal Attention Weights (Quyi uchburchak):\\n', np.round(causal_weights, 3))",
                "outputOrNoteUz": "Natija: 0-token faqat o'zini (`[1, 0, 0, 0]`), 1-token `[0.5, 0.5, 0, 0]`, 2-token esa `[0.333, 0.333, 0.333, 0]` ni ko'radi — kelajak 100% yopilgan!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Pre-LayerNorm Transformer Bloki va Residual Stream",
                "explanationUz": "Karpathy'ning `nanoGPT` va zamonaviy Llama/Qwen arxitekturasida har bir Transformer bloki ikki qismdan iborat bo'lib, normalizatsiya (`LayerNorm` yoki `RMSNorm`) blokdan keyin emas, balki kirishda (**Pre-Norm**) bajariladi va natija asosiy oqimga qo'shiladi (**Residual Stream**):\n1) $x \\leftarrow x + \\text{CausalSelfAttention}(\\text{LN}_1(x))$\n2) $x \\leftarrow x + \\text{MLP/SwiGLU}(\\text{LN}_2(x))$\nPre-Norm arxitekturasi 32–120 qatlamli LLM'larni warmup'siz ham barqaror o'qitish imkonini beradi.",
                "codeExample": "import numpy as np\n\ndef rms_norm(x: np.ndarray, eps: float = 1e-6) -> np.ndarray:\n    rms = np.sqrt(np.mean(x ** 2, axis=-1, keepdims=True) + eps)\n    return x / rms\n\nx_stream = np.array([[2.0, -4.0, 6.0, 8.0]])\normed = rms_norm(x_stream)\nprint('Asl vektor:    ', x_stream)\nprint('RMSNorm so\\'ng: ', np.round(normed, 4), '| RMS =', round(float(np.sqrt(np.mean(normed**2))), 4))",
                "outputOrNoteUz": "Natija: `RMSNorm` (`LayerNorm` dan o'rtacha ayirishni olib tashlab faqat kvadrat o'rtacha ildizga bo'ladi) hisoblashni 10-15% tezlashtiradi va Llama-3/Qwen'da standartdir."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Dekodlash Strategiyalari — Temperature, Top-K va Top-P (Nucleus)",
                "explanationUz": "Modelning oxirgi `lm_head` qatlamidan lug'atdagi har bir token uchun `logits` chiqadi. Keyingi tokenni tanlashda: 1) **Temperature ($\\tau$)**: `logits / T` — $\\tau \\to 0$ (Greedy) eng ehtimolli bitta javobni deterministik tanlaydi (faktik RAG, SQL va kod yozish uchun $\\tau = 0.0 - 0.2$ shart!); $\\tau > 1.0$ esa taqsimotni tekislab ijodiy/tasodifiy qiladi; 2) **Top-K**: faqat eng yuqori $K$ ta tokenni qoldiradi; 3) **Top-P (Nucleus Sampling)**: yig'indi ehtimolligi $P$ (masalan `0.90`) ga yetguncha eng kuchli tokenlar yadrosini dinamik tanlaydi.",
                "codeExample": "import numpy as np\n\nlogits = np.array([4.0, 2.5, 1.0, -1.0]) # 4 ta nomzod token\nfor temp in [0.2, 1.0, 2.5]:\n    scaled = logits / temp\n    probs = np.exp(scaled - np.max(scaled))\n    probs /= probs.sum()\n    print(f'Temperature = {temp:<3} -> Ehtimolliklar: {np.round(probs, 4)}')",
                "outputOrNoteUz": "Natija: `Temp=0.2` da 1-token ehtimoli `0.9994` (qat'iy aniq), `Temp=2.5` da esa `[0.50, 0.27, 0.15, 0.07]` (tasodifiylik va gallyutsinatsiya xavfi yuqori!)."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Top-P (Nucleus Sampling) Filtrini Noldan Yozish",
                "scenarioUz": "Ehtimolligi past 'dum' (tail) tokenlarni kesib tashlab, faqat yig'indisi `p=0.90` bo'lgan ishonchli tokenlar ichidan tanlash.",
                "howToUseUz": "Top-P algoritmini Python muharririda ishga tushiring.",
                "code": "import numpy as np\n\ndef top_p_filtering(probs: dict[str, float], p_threshold: float = 0.90) -> dict[str, float]:\n    sorted_items = sorted(probs.items(), key=lambda x: x[1], reverse=True)\n    kept, cum_prob = {}, 0.0\n    for tok, prob in sorted_items:\n        kept[tok] = prob\n        cum_prob += prob\n        if cum_prob >= p_threshold:\n            break\n    total = sum(kept.values())\n    return {k: round(v / total, 4) for k, v in kept.items()}\n\nnext_token_probs = {'Toshkent': 0.62, 'Samarqand': 0.21, 'Buxoro': 0.09, 'Oy': 0.05, 'Mars': 0.03}\nprint('Top-P (p=0.90) dan o\\'tgan va qayta normallangan tokenlar:')\nprint(top_p_filtering(next_token_probs, p_threshold=0.90))",
                "expectedOutput": "Top-P (p=0.90) dan o'tgan va qayta normallangan tokenlar:\n{'Toshkent': 0.6739, 'Samarqand': 0.2283, 'Buxoro': 0.0978}",
                "breakdownUz": "`'Oy'` va `'Mars'` kabi mantiqsiz dum tokenlar (`0.05 + 0.03`) kesib tashlanib, gallyutsinatsiyaning oldi olindi!"
            },
            {
                "titleUz": "2-misol: Teacher Forcing va Shifted Targets (`x` va `y` siljishi)",
                "scenarioUz": "nanoGPT o'qitishda uzun matndan bir vaqtning o'zida `block_size` ta o'qitish misolini `(x = chunk[:-1], y = chunk[1:])` qilib olish.",
                "howToUseUz": "Siljigan target juftliklarini ko'ring.",
                "code": "tokens = ['<BOS>', 'Men', 'sun\\'iy', 'intellekt', 'o\\'rganaman', '<EOS>']\nx = tokens[:-1]\ny = tokens[1:]\n\nprint('x (Kirish):', x)\nprint('y (Target):', y)\nprint('\\nBitta ketma-ketlik ichidagi 5 ta parallel o\\'qitish vazifasi:')\nfor t in range(len(x)):\n    print(f'Kontekst: {x[:t+1]} -> Bashorat qilish kerak: `{y[t]}`')",
                "expectedOutput": "Kontekst: ['<BOS>'] -> Bashorat qilish kerak: `Men`\nKontekst: ['<BOS>', 'Men'] -> Bashorat qilish kerak: `sun'iy`...",
                "breakdownUz": "Causal mask tufayli GPT bitta forward pass'da barcha $T$ ta prefiks pozitsiyasi uchun Loss'ni bir vaqtda parallel hisoblaydi!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "Causal Masking (Autoregressive Lower-Triangular Mask)",
                "category": "Deep Learning & NLP",
                "definitionUz": "Decoder-only LLM'larda $t$-pozitsiyadagi token $t$ dan keyingi kelajak tokenlariga e'tibor qaratmasligi uchun yuqori uchburchakni $-\\infty$ bilan yopish.",
                "analogyOrExampleUz": "Imtihon kitobchasida keyingi betlarni qog'oz bilan yopib, faqat o'qilgan satrlargagina qarab davomini yozish.",
                "connectedTo": [
                    {
                        "targetTerm": "BERT Bidirectional Encoder vs GPT Causal Decoder",
                        "targetLessonId": "D06.4",
                        "relationshipUz": "Keyingi darsdagi BERT modelida Causal Mask YO'Q (u gapning chap va o'ng tomonini bir vaqtda ko'radi), GPT'da esa Causal Mask MAJBURIY."
                    }
                ]
            },
            {
                "term": "Temperature, Top-K & Top-P (Nucleus Sampling)",
                "category": "LLM & RAG",
                "definitionUz": "LLM chiqargan logitlar taqsimotining o'tkirligini (`Temperature`) va ruxsat etilgan nomzod tokenlar to'plamini (`Top-K`, `Top-P`) boshqaruvchi inferens giperparametrlari.",
                "analogyOrExampleUz": "Temperature=0 — har doim menyudagi eng mashhur 1-taomni tanlash; Temperature=1.2 — lotereya aylantirib yangi ekzotik taomni tatib ko'rish.",
                "connectedTo": [
                    {
                        "targetTerm": "Anti-Hallucination RAG & Tool Calling",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "8-haftadagi qonun hujjatlari RAG tizimi va JSON Tool Calling'da model to'qima javob chiqarmasligi uchun `temperature=0.0` (yoki `0.1`) qilib qulflanadi."
                    }
                ]
            },
            {
                "term": "Pre-Norm (`RMSNorm`) & SwiGLU FFN",
                "category": "Deep Learning & NLP",
                "definitionUz": "Zamonaviy Transformer bloklarida Attention va Feed-Forward qatlamlaridan oldin qo'llaniladigan Root-Mean-Square normalizatsiya hamda darvozali (`Swish-Gated Linear Unit`) MLP.",
                "analogyOrExampleUz": "Har bir kuchaytirgich blokiga kirishdan oldin elektr kuchlanishini stabilizator (`RMSNorm`) orqali me'yorga keltirish.",
                "connectedTo": [
                    {
                        "targetTerm": "QLoRA Target Modules (`q_proj`, `v_proj`, `gate_proj`, `up_proj`, `down_proj`)",
                        "targetLessonId": "D08.4",
                        "relationshipUz": "8-haftada Llama/Qwen'ni QLoRA bilan o'qitishda adapterlar aynan Attention va SwiGLU FFN chiziqli proyeksiyalariga ulanadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d06-3-int-1",
                "level": "Junior",
                "questionUz": "Causal Masking'da kelajak tokenlarining ballariga Softmax'dan oldin `0` emas, balki `-inf` (`-1e9`) yozilishining sababi nima?",
                "interviewerIntentUz": "Softmax eksponentasi ($e^x$) xossasini aniq bilishini tekshirish.",
                "strongAnswerUz": "Chunki Softmax formulasida har bir element $e^x$ darajaga oshiriladi! Agar kelajak tokeniga `0` yozib qo'ysak, $e^0 = 1$ bo'lib, u nolga aylanmaydi va kelajak tokeni katta musbat og'irlik olib ketadi! Softmax chiqishi aynan `0.0` bo'lishi uchun eksponenta darajasiga $-\\infty$ berish shart, chunki $\\lim_{x \\to -\\infty} e^x = 0$.",
                "redFlagUz": "'0 yozsa ham bo'ladi, baribir ko'paytmada nol bo'lib ketadi' deyish.",
                "followUpQuestionUz": "Savol: `Temperature` parametri `0` ga yaqinlashganda (`T -> 0`) Softmax taqsimoti nimaga aylanadi? Javob: **Argmax (Greedy Decoding)** — eng katta logitga ega tokenning ehtimoli `1.0` (100%) ga, qolgan barcha tokenlarniki `0.0` ga teng bo'lgan deterministik one-hot taqsimotga aylanadi."
            },
            {
                "id": "d06-3-int-2",
                "level": "Middle",
                "questionUz": "Top-K sampling bilan Top-P (Nucleus) sampling o'rtasida qanday farq bor va nima uchun Top-P ko'pincha aqlliroq ishlaydi?",
                "interviewerIntentUz": "Yassi (flat) va o'tkir (peaked) ehtimollik taqsimotlarida sampling xulqini tushunishini sinash.",
                "strongAnswerUz": "`Top-K` (masalan $K=50$) har doim qat'iy 50 ta tokenni oladi: 1) Agar keyingi so'z aniq bo'lsa (*'O'zbekiston poytaxti — ...'* -> `'Toshkent'` 99%), `Top-K=50` yana 49 ta mantiqsiz so'zni ham ro'yxatga qo'shib qo'yadi; 2) Agar gap boshlanishi ko'p variantli (yassi taqsimot) bo'lsa, 50 ta so'z yetarli bo'lmasligi mumkin. **Top-P (Nucleus, masalan $p=0.90$)** esa nomzodlar sonini taqsimot shakliga qarab **dinamik** o'zgartiradi: ishonch 99% bo'lganda faqat 1 dona `'Toshkent'` tokenini qoldiradi, noaniq joyda esa yig'indi 90% ga yetguncha 30-100 ta mos tokenni oladi.",
                "redFlagUz": "'Top-K va Top-P bir xil, faqat biri butun son, ikkinchisi kasr son' deyish.",
                "followUpQuestionUz": "Savol: Korporativ RAG yoki SQL query generatorda `temperature`, `top_p` ni qanday sozlaysiz? Javob: `temperature=0.0` (greedy) yoki `temperature=0.1, top_p=0.9`, chunki u yerda ijodiylik emas, 100% faktik aniqlik va qayta tiklanuvchanlik (reproducibility) talab qilinadi."
            },
            {
                "id": "d06-3-int-3",
                "level": "Senior / Production",
                "questionUz": "GPT modelini o'qitish (Training) parallel bajariladi deymiz, ammo matn generatsiya qilish (Inference) nega ketma-ket (sekin, token-ma-token) bajariladi?",
                "interviewerIntentUz": "Teacher Forcing (training) va Autoregressive Generation (inference) o'rtasidagi tub farqni tushunishini sinash.",
                "strongAnswerUz": "Training vaqtida bizda butun haqiqiy matn (`ground truth`) oldindan mavjud (**Teacher Forcing**) — Causal Mask yordamida barcha $T$ ta pozitsiyaning kirishini bitta matritsada berib, barcha $T$ ta keyingi token bashoratini BITTA forward pass'da parallel hisoblay olamiz (Compute-bound). Inference (generatsiya) vaqtida esa kelajakdagi tokenlar hali mavjud emas! Model $t+1$-tokenni generatsiya qilib, uni kirish oxiriga qo'shmaguncha $t+2$-tokenni hisoblay olmaydi. Shu sababli $N$ ta javob tokenini yozish uchun model og'irliklarini VRAM'dan $N$ marta ketma-ket o'qib, $N$ ta forward pass qilishga majbur (Memory-bandwidth bound).",
                "redFlagUz": "'Inference'da GPU sekinroq rejimda ishlaydi' deyish.",
                "followUpQuestionUz": "Savol: Avtoregressiv generatsiyani sifatni yo'qotmasdan 2-3 barobar tezlashtiruvchi **Speculative Decoding** qanday ishlaydi? Javob: Kichik tezkor 'Draft' model (masalan 1B) tezda 5 ta taxminiy token yozadi, katta 'Target' model (70B) esa u 5 ta tokenni bitta parallel forward pass'da tekshirib tasdiqlaydi!"
            }
        ],
        "videos": [
            {
                "id": "vid-d06-3-en",
                "title": "Let's build GPT: from scratch, in code, spelled out",
                "channel": "Andrej Karpathy",
                "language": "en",
                "youtubeId": "kCc8FmEb1nY",
                "youtubeUrl": "https://www.youtube.com/watch?v=kCc8FmEb1nY",
                "durationOrTimestamp": "Legendaviy nanoGPT darsi (M27 manba)",
                "whatItExplainsUz": "Andrej Karpathy bo'sh PyTorch faylidan boshlab Bigram model, Self-Attention, Causal Mask, Multi-Head Attention, Residual Connections, LayerNorm va to'liq GPT-2 arxitekturasini qadamma-qadam yozib o'qitadi.",
                "howToUseVideoUz": "Ushbu darsdagi Causal Mask va Teacher Forcing kodlarini video bilan birgalikda Python muharririda ishga tushirib o'rganing."
            },
            {
                "id": "vid-d06-3-ru",
                "title": "Как работает нейросеть простыми словами: токены, контекст и генерация",
                "channel": "Лысый из браузера",
                "language": "ru",
                "youtubeId": "ne8yL9l7W2E",
                "youtubeUrl": "https://www.youtube.com/watch?v=ne8yL9l7W2E",
                "durationOrTimestamp": "To'liq tushuntirish",
                "whatItExplainsUz": "Avtoregressiv token-ma-token generatsiya, kontekst oynasi, temperature va gallyutsinatsiya sabablari sodda tilda tushuntirilgan.",
                "howToUseVideoUz": "Temperature va Top-P parametrlarining generatsiya sifatiga ta'sirini 1-amaliy misolda tekshirib ko'ring."
            }
        ],
        "quiz": [
            {
                "id": "d06-3-q1",
                "promptUz": "1. Konseptual: GPT (Decoder-Only) modelida Causal Masking'ning asosiy vazifasi nima?",
                "options": [
                    "Model hajmini kichraytirish",
                    "O'qitish vaqtida $t$-pozitsiyadagi token $t$ dan keyingi kelajak tokenlarini ko'rib qo'ymasligini (yuqori uchburchakni -inf qilish orqali) ta'minlash",
                    "Matnni ingliz tiliga tarjima qilish",
                    "GPU haroratini pasaytirish"
                ],
                "correctIndex": 1,
                "explanationUz": "Causal Mask avtoregressiv xususiyatni saqlaydi: har bir token faqat o'zi va o'zidan oldingi tokenlargagina qaray oladi."
            },
            {
                "id": "d06-3-q2",
                "promptUz": "2. Kod Tahlili: Faktik aniqlik talab qilinadigan korporativ RAG yoki SQL generatsiyasida `temperature` parametrini qanday belgilash kerak?",
                "options": [
                    "`temperature = 2.5` (maksimal tasodifiylik)",
                    "`temperature = 0.0` (yoki `0.1`, eng yuqori ehtimolli tokenlarni barqaror va deterministik tanlash uchun)",
                    "`temperature = -5.0`",
                    "`temperature = 100.0`"
                ],
                "correctIndex": 1,
                "explanationUz": "Past temperatura (`0.0 - 0.1`) taqsimot cho'qqisini kuchaytirib, modelning to'qima (gallyutsinatsiya) so'zlar tanlash ehtimolini minimallashtiradi."
            },
            {
                "id": "d06-3-q3",
                "promptUz": "3. Production Debugging: Nima uchun GPT modelini o'qitish (Training) barcha tokenlar bo'yicha parallel kechadi, ammo matn yozish (Inference) token-ma-token ketma-ket bajariladi?",
                "options": [
                    "Training'da butun matn oldindan ma'lum (Teacher Forcing), Inference'da esa har bir keyingi token oldingi generatsiya qilingan tokenga bog'liq",
                    "Inference vaqtida PyTorch o'chib qoladi",
                    "Training'da GPU, Inference'da faqat disk ishlaydi",
                    "Farqi yo'q, ikkalasi ham ketma-ket"
                ],
                "correctIndex": 0,
                "explanationUz": "Avtoregressiv generatsiyada $w_{t+1}$ tokeni chiqmaguncha $w_{t+2}$ uchun kirish mavjud bo'lmaydi."
            }
        ]
    },
    "D06.4": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Encoder-Only (BERT / XLM-RoBERTa) vs Decoder-Only (GPT) — Qachon Qaysi Biri?",
                "explanationUz": "Hamma vazifaga katta 8B-70B GPT qo'llash — chumchuqni zambarak bilan otishdir! **Encoder-Only (BERT, RoBERTa, XLM-RoBERTa, DeBERTa)** modellarida Causal Mask yo'q — ular **Bidirectional** (ikki yo'nalishli) bo'lib, so'zning ham chap, ham o'ng kontekstini bir vaqtda ko'radi. Shu sababli: 1) **Matn Klassifikatsiyasi** (murojaat turi, sentiment, spam); 2) **NER** (Named Entity Recognition — F.I.Sh., sana, summa ajratish); 3) **RAG Embedding va Cross-Encoder Reranking** vazifalarida 270M parametrli `XLM-RoBERTa` 8B GPT'dan **20-50 barobar tezroq, arzonroq va ko'pincha aniqroq** ishlaydi!",
                "codeExample": "architecture_guide = [\n    ('Encoder-Only (BERT / XLM-RoBERTa)', 'Bidirectional (Chap + O\\'ng)', 'Klassifikatsiya, NER, Embedding, Reranker (2-10 ms)'),\n    ('Decoder-Only (GPT / Llama / Qwen)', 'Causal (Faqat Chapdan O\\'ngga)', 'Matn generatsiya, Chat, RAG Javob yozish, Kod yozish'),\n    ('Encoder-Decoder (T5 / Whisper)',    'Bidirectional Enc + Causal Dec', 'Tarjima, Audio-to-Text transkripsiya'),\n]\nfor arch, attn, use_case in architecture_guide:\n    print(f'{arch:34} | {attn:28} | {use_case}')",
                "outputOrNoteUz": "Natija: Muhandislik intervyusida 'Har doim LLM ishlataman' deyish o'rniga vazifaga qarab Encoder vs Decoder tanlashni asoslash yuqori baholanadi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: O'zbekcha Matn Klassifikatsiyasi va Macro-F1 vs Micro-F1",
                "explanationUz": "XLM-RoBERTa gap boshiga maxsus `<s>` (`[CLS]`) tokenini qo'yadi. 12 ta Attention qatlamidan o'tgach, aynan shu 0-indeksdagi `[CLS]` token vektori (`hidden_states[:, 0, :]`) butun gapning jamlangan ma'nosini o'zida saqlaydi va `nn.Linear(768, num_classes)` klassifikatsiya boshiga uzatiladi. Ko'p klassli (masalan, 10 xil shikoyat turi) nomutanosib datada modelni baholash uchun **Macro-F1** (har bir klassning F1 ballini hisoblab, teng vaznda o'rtachasini olish) ishlatiladi, chunki u kam uchraydigan klasslardagi xatoni yashirmaydi!",
                "codeExample": "# 3 ta klass: Karta (900 ta, F1=0.95), Kredit (80 ta, F1=0.80), VIP-Valyuta (20 ta, F1=0.40)\nf1_scores = [0.95, 0.80, 0.40]\nsupports  = [900,  80,   20]\n\nmacro_f1 = sum(f1_scores) / len(f1_scores)\nweighted_f1 = sum(f * s for f, s in zip(f1_scores, supports)) / sum(supports)\nprint(f'Weighted-F1 (ko\\'pchilik klass yashirgan): {weighted_f1:.4f}')\nprint(f'Macro-F1    (ozchilik klassni fosh etgan): {macro_f1:.4f}')",
                "outputOrNoteUz": "Natija: `Weighted-F1 = 0.9270` a'lo ko'rinsa-da, `Macro-F1 = 0.7167` VIP-Valyuta klassida model yomon (`0.40`) ishlayotganini aniq ko'rsatdi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Fine-Tuning Best Practices — Differential LR, Warmup va Mixed Precision",
                "explanationUz": "Pre-trained BERT/XLM-RoBERTa og'irliklari allaqachon millioner matnlarda pishgan, ammo yangi qo'shilgan `classification_head` tasodifiy og'irliklardan boshlanadi. Agar boshidayoq katta learning rate (`1e-2`) bersak, tayyor lingvistik bilimlar buzilib ketadi (**Catastrophic Forgetting**). To'g'ri retsept: 1) Kichik learning rate (`2e-5` – `5e-5`); 2) Dastlabki 10% qadamda LR ni `0` dan sekin ko'tarish (**Linear Warmup**) va keyin Cosine decay; 3) `fp16=True` yoki `bf16=True` (Mixed Precision) bilan VRAMni 2x tejash.",
                "codeExample": "def get_warmup_cosine_lr(step: int, total_steps: int, warmup_steps: int, max_lr: float = 3e-5) -> float:\n    import math\n    if step < warmup_steps:\n        return max_lr * (step / max(1, warmup_steps))\n    progress = (step - warmup_steps) / max(1, total_steps - warmup_steps)\n    return max_lr * 0.5 * (1.0 + math.cos(math.pi * progress))\n\nfor s in [0, 50, 100, 500, 900, 1000]:\n    print(f'Qadam {s:>4}/1000 -> LR = {get_warmup_cosine_lr(s, 1000, warmup_steps=100):.6f}')",
                "outputOrNoteUz": "Natija: Dastlabki 100 qadamda LR `0.000000` dan `0.000030` ga yumshoq ko'tariladi (Warmup) va 1000-qadamgacha silliq `0` ga tushadi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: O'zbekcha Mijoz Murojaatlarini Yo'naltiruvchi (Intent Router) Klassifikator",
                "scenarioUz": "Bank yoki telekom chatiga kelgan o'zbekcha xabarni 4 ms ichida tegishli bo'limga (`KREDIT`, `KARTA_BLOK`, `TARIF`, `SHIKOYAT`) yo'naltirish.",
                "howToUseUz": "Intent routing va confidence fallback mantiqini sinang.",
                "code": "import numpy as np\n\nlabels = ['KREDIT', 'KARTA_BLOK', 'TARIF', 'SHIKOYAT']\n\ndef route_message(text: str, logits: list[float], min_conf: float = 0.65) -> dict:\n    arr = np.array(logits)\n    probs = np.exp(arr - arr.max()) / np.sum(np.exp(arr - arr.max()))\n    best_idx = int(np.argmax(probs))\n    conf = float(probs[best_idx])\n    target = labels[best_idx] if conf >= min_conf else 'HUMAN_OPERATOR_FALLBACK'\n    return {'text': text, 'department': target, 'confidence': round(conf, 4)}\n\nprint(route_message('Plastik kartam bankomatda qolib ketdi, bloklab bering', [0.2, 3.8, -0.5, 0.4]))\nprint(route_message('Salom, bir narsa so\\'ramoqchi edim', [0.3, 0.2, 0.4, 0.1]))",
                "expectedOutput": "{'text': 'Plastik kartam...', 'department': 'KARTA_BLOK', 'confidence': 0.9032}\n{'text': 'Salom, bir narsa...', 'department': 'HUMAN_OPERATOR_FALLBACK', 'confidence': 0.2981}",
                "breakdownUz": "Production klassifikatorlarda past ishonch (`confidence < 0.65`) bo'lganda xato bo'limga yubormasdan `HUMAN_OPERATOR_FALLBACK` (operatorga yoki aniqlashtiruvchi savolga) yo'naltirish shart."
            },
            {
                "titleUz": "2-misol: Backbone Muzlatish (Freezing) vs Full Fine-Tuning Parametrlar Hisobi",
                "scenarioUz": "16 GB RAM yoki kichik T4 GPU'da faqat oxirgi 2 ta Transformer qatlamini va klassifikatsiya boshini o'qitish orqali tezlikni oshirish.",
                "howToUseUz": "Qatlamlarni tanlab muzlatish samarasini hisoblang.",
                "code": "total_layers = 12\nparams_per_layer = 7_100_000\nembedding_params = 190_000_000 # Ko'p tilli katta lug'at\nhead_params = 768 * 5\n\nfull_trainable = embedding_params + (total_layers * params_per_layer) + head_params\nlast_2_trainable = (2 * params_per_layer) + head_params\n\nprint(f'Full Fine-Tuning o\\'qitiladigan parametrlar:      {full_trainable:>12,}')\nprint(f'Faqat oxirgi 2 qatlam + Head o\\'qitilganda:       {last_2_trainable:>12,} ({last_2_trainable/full_trainable:.1%} qismi!)')",
                "expectedOutput": "Full Fine-Tuning o'qitiladigan parametrlar:       275,203,840\nFaqat oxirgi 2 qatlam + Head o'qitilganda:         14,203,840 (5.2% qismi!)",
                "breakdownUz": "190M parametrli ko'p tilli embedding qatlamini muzlatish VRAM sarfini keskin kamaytiradi va boshqa tillardagi bilimni saqlab qoladi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Bidirectional Encoder (BERT / XLM-RoBERTa) & Masked Language Modeling (MLM)",
                "category": "Deep Learning & NLP",
                "definitionUz": "Gap ichidagi yashirilgan (`[MASK]`) so'zlarni chap va o'ng kontekstga bir vaqtda qarab topish orqali chuqur matn tushunishga o'qitilgan Transformer Encoder.",
                "analogyOrExampleUz": "Matndagi bo'sh qoldirilgan so'zni topish uchun jumlaning ham boshini, ham oxirini o'qib ma'no chiqarish.",
                "connectedTo": [
                    {
                        "targetTerm": "Cross-Encoder Reranker in RAG",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "8-haftada RAG topgan 20 ta nomzod hujjatni savol bilan birga `[CLS] Savol [SEP] Hujjat [SEP]` qilib eng aniq 3 tasini saralovchi **Reranker** aynan Encoder (BERT/BGE-Reranker) modelidir!"
                    }
                ]
            },
            {
                "term": "Macro-F1 vs Micro-F1 vs Weighted-F1",
                "category": "MLOps & Eval",
                "definitionUz": "Macro-F1 — barcha klasslar F1 ballarining oddiy o'rtachasi (har bir klass teng huquqli); Weighted-F1 — klass hajmiga ko'ra vaznli o'rtacha; Micro-F1 — global TP/FP/FN bo'yicha hisoblangan ko'rsatkich.",
                "analogyOrExampleUz": "Macro-F1 — BMT Bosh Assambleyasi (katta va kichik davlat 1 tadan teng ovozga ega); Weighted-F1 — aholi soniga qarab ovoz berish.",
                "connectedTo": [
                    {
                        "targetTerm": "Imbalanced Classification Evaluation",
                        "targetLessonId": "D04.2",
                        "relationshipUz": "4-haftada ikki klassli masalada PR-AUC ishlatilgan bo'lsa, 6-haftada ko'p klassli NLP masalada aynan **Macro-F1** asosiy mezon bo'ladi."
                    }
                ]
            },
            {
                "term": "Catastrophic Forgetting & Linear Warmup",
                "category": "Deep Learning & NLP",
                "definitionUz": "Pre-trained modelni yangi vazifaga o'qitish boshida katta gradient zarbasi tufayli oldingi o'rganilgan bazaviy bilimlarning buzilib ketishi va uning oldini oluvchi LR Warmup.",
                "analogyOrExampleUz": "Muzdek dvigatelni birdaniga 7000 oborotda haydamasdan, dastlabki daqiqalarda sekin qizdirib olish (Warmup).",
                "connectedTo": [
                    {
                        "targetTerm": "LoRA & QLoRA Fine-Tuning",
                        "targetLessonId": "D08.4",
                        "relationshipUz": "8-haftada asosiy LLM og'irliklarini 100% muzlatib, faqat kichik LoRA adapterlarini o'qitish Catastrophic Forgetting'ga qarshi eng kuchli himoyadir."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d06-4-int-1",
                "level": "Junior",
                "questionUz": "BERT (Encoder) va GPT (Decoder) o'rtasidagi eng asosiy arxitektura va o'qitish vazifasi farqi nima?",
                "interviewerIntentUz": "NLP'ning ikki ustun arxitekturasini aniq ajrata olishini tekshirish.",
                "strongAnswerUz": "1) **Attention yo'nalishi**: BERT — **Bidirectional Encoder** (Causal mask yo'q, har bir token gapdagi barcha chap va o'ng tokenlarni ko'radi); GPT — **Unidirectional Causal Decoder** (har bir token faqat o'zidan oldingi chap tokenlarni ko'radi). 2) **Pre-training vazifasi**: BERT **Masked Language Modeling (MLM)** — gap ichidan yashirilgan 15% `[MASK]` tokenlarni tiklashga o'qiydi; GPT esa **Causal Language Modeling (CLM / Next-Token Prediction)** — keyingi tokenni bashorat qilishga o'qiydi. 3) **Qo'llanilishi**: BERT — matn tahlili (klassifikatsiya, NER, embedding, reranking); GPT — matn generatsiyasi.",
                "redFlagUz": "'BERT eski model, GPT yangi model, boshqa farqi yo'q' deyish.",
                "followUpQuestionUz": "Savol: Nima uchun BERT o'z holicha ravon uzun matn generatsiya qila olmaydi? Javob: Chunki u chapdan o'ngga avtoregressiv $P(w_t | w_{<t})$ taqsimotga emas, balki ikki tomonlama kontekst mavjud bo'lganda bo'sh joyni to'ldirishga o'qitilgan."
            },
            {
                "id": "d06-4-int-2",
                "level": "Middle",
                "questionUz": "Kuniga 5 millionta o'zbekcha SMS va mijoz izohlarini 8 ta kategoriyaga ajratish kerak. Buning uchun GPT-4o / Llama-3-70B ishlatasizmi yoki fine-tuned XLM-RoBERTa-base (270M)mi? Asoslab bering.",
                "interviewerIntentUz": "Senior muhandislik qarori: Latency, Cost va Accuracy trade-off'ini hisoblay olishini sinash.",
                "strongAnswerUz": "Production'da **Fine-tuned XLM-RoBERTa-base (yoki DistilBERT/DeBERTa)** tanlanadi! Sabablari: 1) **Tezlik (Latency)**: Encoder bitta forward pass'da (token generatsiya qilmasdan!) 2–5 ms ichida javob beradi; 70B LLM esa 200–800 ms oladi (100x sekin); 2) **Xarajat (Cost)**: 270M model bitta arzon T4 GPU yoki hatto CPU'da kuniga 5 mln xabarni bemalol qayta ishlaydi; 70B LLM yoki pullik API esa minglab dollar xarajat talab qiladi; 3) **Aniqlik**: 2,000–5,000 ta belgilangan (labeled) domenga xos misolda fine-tune qilingan Encoder yopiq klassifikatsiyada zero-shot katta LLM'dan yuqori yoki teng Macro-F1 beradi. Katta LLM'dan esa faqat boshlang'ich 5,000 ta datasetni yarim-avtomat belgilash (Synthetic Labeling / Teacher) uchun foydalanish oqilona!",
                "redFlagUz": "'Har bir SMS uchun GPT-4 API chaqiraman' deyish.",
                "followUpQuestionUz": "Savol: Agar belgilangan (labeled) ma'lumot atigi 20 dona bo'lsa-chi? Javob: U holda dastlab Few-Shot LLM yoki SetFit (Contrastive Sentence-Transformer) bilan MVP chiqarib, loglardan ma'lumot yig'ilgach XLM-RoBERTa student modelga distillatsiya qilinadi."
            },
            {
                "id": "d06-4-int-3",
                "level": "Senior / Production",
                "questionUz": "BERT / XLM-RoBERTa modelini fine-tune qilganda `learning_rate = 1e-2` berildi va 1-epoxadan keyin model barcha misollarga faqat eng ko'p uchraydigan bitta klassni chiqarib qoldi. Nima sodir bo'ldi?",
                "interviewerIntentUz": "Representation Collapse / Catastrophic Forgetting diagnostikasini sinash.",
                "strongAnswerUz": "Pre-trained Transformer uchun `lr = 1e-2` haddan tashqari ulkan (standart `2e-5` dan **500 barobar katta!**). Birinchi bir nechta batchdayoq tasodifiy initsializatsiya qilingan `classifier_head` dan kelgan ulkan gradientlar pre-trained Attention qatlamlarining nozik og'irliklarini vayron qilib yuborgan (**Catastrophic Forgetting / Representation Collapse**). Natijada `[CLS]` vektori kirish matniga bog'liq bo'lmagan doimiy konstantaga aylanib qolgan va model Loss'ni minimallashtirish uchun faqat prior ehtimoli eng katta klassni (`majority class`) bashorat qilishga tushib qolgan. Tuzatish: `lr = 2e-5`, `warmup_ratio = 0.1`, `weight_decay = 0.01` va `gradient_clip_val = 1.0`.",
                "redFlagUz": "'Epoxalar sonini 100 taga ko'paytirish kerak' deyish.",
                "followUpQuestionUz": "Savol: Differential Learning Rate nima? Javob: Pre-trained backbone qatlamlariga kichik LR (`2e-5`), yangi qo'shilgan tasodifiy `classifier_head` qatlamiga esa kattaroq LR (`1e-4` yoki `5e-4`) berish usuli."
            }
        ],
        "videos": [
            {
                "id": "vid-d06-4-uz",
                "title": "AI Engineer 44 kun: Tokenlar, O'zbekcha Matn va Transformer Modellar",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "3w2ws7xyXYE",
                "youtubeUrl": "https://www.youtube.com/watch?v=3w2ws7xyXYE",
                "durationOrTimestamp": "O'zbekcha NLP bo'limi",
                "whatItExplainsUz": "O'zbek tilidagi matnlar bilan Transformer modellarini ishlatish va fine-tuning tamoyillari tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-amaliy misoldagi `Intent Router` klassifikatoriga yangi o'zbekcha murojaat turlarini qo'shib sinab ko'ring."
            },
            {
                "id": "vid-d06-4-en",
                "title": "Attention in Transformers, Step-by-Step (Encoder & Contextual Representations)",
                "channel": "3Blue1Brown",
                "language": "en",
                "youtubeId": "eMlx5fFNoYc",
                "youtubeUrl": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
                "durationOrTimestamp": "Kontekstual boyitish qismi",
                "whatItExplainsUz": "Qatlamdan qatlamga o'tgan sari so'z va `[CLS]` vektorlari qanday qilib butun jumla ma'nosini o'ziga singdirishi ko'rsatilgan.",
                "howToUseVideoUz": "Macro-F1 va Weighted-F1 hisoblash kodini o'z klassifikatsiya vazifangizda asosiy baholash skripti sifatida saqlab oling."
            }
        ],
        "quiz": [
            {
                "id": "d06-4-q1",
                "promptUz": "1. Konseptual: Matn klassifikatsiyasi, NER va Reranking vazifalarida 70B Decoder LLM o'rniga 270M Encoder (`XLM-RoBERTa`) ishlatishning asosiy ustunligi nimada?",
                "options": [
                    "Encoder faqat rasmlar bilan ishlaydi",
                    "Encoder ikki tomonlama (bidirectional) kontekstni bitta forward pass'da ko'radi, 20-50x tezroq (2-5 ms) va ancha arzon ishlaydi",
                    "Encoder umuman o'qitishni talab qilmaydi",
                    "Encoder uzun hikoyalar yozadi"
                ],
                "correctIndex": 1,
                "explanationUz": "Encoder token-ma-token generatsiya qilmasdan bitta o'tishda ikki tomonlama kontekstni tahlil qilib klassifikatsiya logitlarini chiqaradi."
            },
            {
                "id": "d06-4-q2",
                "promptUz": "2. Kod Tahlili: 10 ta klassdan iborat nomutanosib datasetda kam uchraydigan klasslardagi sifatni ham adolatli baholash uchun qaysi metrika tanlanadi?",
                "options": [
                    "Oddiy Accuracy",
                    "Macro-F1 (har bir klassning F1 ballini alohida hisoblab, barcha klasslarga teng vazn berib o'rtachasini olish)",
                    "Faqat ko'pchilik klassning Precision balli",
                    "MSE"
                ],
                "correctIndex": 1,
                "explanationUz": "Macro-F1 10,000 ta misolli klassga ham, 50 ta misolli muhim klassga ham teng $1/C$ ulush beradi."
            },
            {
                "id": "d06-4-q3",
                "promptUz": "3. Production Debugging: Pre-trained BERT / XLM-RoBERTa modelini fine-tune qilish uchun eng mos Learning Rate diapazoni qaysi?",
                "options": [
                    "`1.0` dan `10.0` gacha",
                    "`2e-5` dan `5e-5` gacha (Linear Warmup bilan birgalikda)",
                    "`0.5`",
                    "`0.0`"
                ],
                "correctIndex": 1,
                "explanationUz": "Pre-trained og'irliklarni buzib yubormaslik (Catastrophic Forgetting bo'lmasligi) uchun $2\\times 10^{-5}$ atrofida kichik learning rate va warmup ishlatiladi."
            }
        ]
    },
    "D07.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: LLM Xotira Arifmetikasi — Og'irliklar, KV Cache va Overhead",
                "explanationUz": "AI muhandis intervyusida so'raladigan eng amaliy savol: *'8 milliard parametrli (8B) modelni ishga tushirish uchun necha GB RAM/VRAM kerak?'* Formula 3 ta qismdan iborat:\n1) **Model Weights** $= N_{\\text{params}} \\times \\text{bytes\\_per\\_param}$ (FP16/BF16 da 2 bayt $\\to 8 \\times 2 = 16$ GB; INT4 / Q4_K_M da ~0.56 bayt $\\to 8 \\times 0.56 \\approx 4.5$ GB);\n2) **KV Cache** $= 2 \\times n_{\\text{layers}} \\times n_{\\text{kv\\_heads}} \\times d_{\\text{head}} \\times \\text{seq\\_len} \\times \\text{batch} \\times 2\\text{ bayt}$;\n3) **Activation & Runtime Overhead** ($\\approx 0.8 - 1.5$ GB).",
                "codeExample": "def estimate_llm_memory_gb(params_b: float, bits: float, ctx_len: int = 4096) -> dict:\n    weights_gb = params_b * (bits / 8.0)\n    # O'rtacha GQA KV cache (~0.12 MB har 1 token uchun 8B modelda) va 1.0 GB runtime bufer:\n    kv_cache_gb = (ctx_len * 0.00012) * (params_b / 8.0)\n    overhead_gb = 1.0\n    total_gb = weights_gb + kv_cache_gb + overhead_gb\n    return {'weights_gb': round(weights_gb, 2), 'kv_gb': round(kv_cache_gb, 2), 'total_gb': round(total_gb, 2)}\n\nfor name, p, b in [('Llama-3-8B (FP16)', 8.0, 16), ('Llama-3-8B (Q4_K_M ~4.5bit)', 8.0, 4.5), ('Qwen2.5-3B (Q4_K_M)', 3.0, 4.5)]:\n    res = estimate_llm_memory_gb(p, b, ctx_len=4096)\n    fits_16gb = 'HA (16GB RAMga sig\\'adi)' if res['total_gb'] <= 12.5 else 'YO\\'Q (Sig\\'maydi!)'\n    print(f'{name:28} -> Jami: {res[\"total_gb\"]:>5.2f} GB (Weights: {res[\"weights_gb\"]} GB) | {fits_16gb}')",
                "outputOrNoteUz": "Natija: 8B model FP16 holatda `17.49 GB` talab qilib 16 GB noutbukni qotirib qo'yadi; `Q4_K_M` kvantlashda esa `6.0 GB` bo'lib 16 GB RAMda bemalol uchadi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Post-Training Quantization (PTQ) — FP16 dan INT8 va INT4 ga O'tish",
                "explanationUz": "**Kvantlash (Quantization)** — 16-bitli (`float16` / `bfloat16`) uzluksiz og'irliklarni 8-bit (`[-127..127]`) yoki 4-bit (`[-8..7]`, jami 16 ta diskret sath) butun sonlarga siqishdir. Barcha millionlab og'irliklarni bitta scale bilan siqsak, bitta outlier butun aniqlikni buzadi. Shu sababli zamonaviy **Block-wise Quantization (`Q4_K_M`)** matritsani kichik 32 yoki 64 elementli bloklarga bo'lib, har bir blokka o'zining `scale` ($S = \\frac{\\max(|W|)}{q_{\\max}}$) ko'paytuvchisini beradi!",
                "codeExample": "import numpy as np\n\n# 1-blok og'irliklari (FP32) -> Symmetric INT4 (-7..+7) kvantlash va qayta tiklash:\nw_fp = np.array([-0.42, -0.15, 0.0, 0.28, 0.63], dtype=np.float32)\nq_max = 7.0\nscale = np.max(np.abs(w_fp)) / q_max\n\nw_int4 = np.round(w_fp / scale).astype(np.int8)\nw_dequant = w_int4 * scale\nmae_err = np.mean(np.abs(w_fp - w_dequant))\nprint('Asl FP32 og\\'irliklar:      ', w_fp)\nprint('Siqilgan INT4 (-7..7):     ', w_int4.tolist(), '| Scale =', round(float(scale), 4))\nprint('Qayta tiklangan (Dequant): ', np.round(w_dequant, 3), f'| O\\'rtacha xato: {mae_err:.4f}')",
                "outputOrNoteUz": "Natija: Xotira 4-8 barobar qisqargan bo'lsa-da, qayta tiklangan og'irliklarning o'rtacha xatosi atigi `0.014` bo'ldi!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Kvantlash Formatlari Ekotizimi — GGUF vs AWQ vs GPTQ vs EXL2",
                "explanationUz": "Qaysi formatni qachon tanlash kerak? 1) **GGUF (`llama.cpp` / `Ollama`)** — CPU, Apple Silicon (M1/M2/M3) va gibrid CPU+GPU uchun #1 format; bitta faylda ham metadata, ham tokenizer, ham kvantlangan tensorlar yotadi va `mmap` orqali darhol yuklanadi; 2) **AWQ (Activation-Aware Weight Quantization)** — eng muhim 1% salient (aktivatsiyasi kuchli) og'irlik kanallarini himoyalab, NVIDIA GPU'larda (`vLLM`) eng yuqori sifat va tezlik beradi; 3) **GPTQ / EXL2** — faqat NVIDIA GPU uchun mo'ljallangan formatlar.",
                "codeExample": "quant_formats = [\n    ('GGUF (Q4_K_M / Q5_K_M)', 'CPU, Mac M-series, Hybrid GPU', 'Ollama, llama.cpp', '16GB RAM noutbuk uchun #1 tanlov'),\n    ('AWQ (4-bit)',            'Faqat NVIDIA GPU (CUDA)',       'vLLM, TGI, LMDeploy', 'Production GPU server uchun #1'),\n    ('bitsandbytes (NF4)',     'NVIDIA GPU (Training/QLoRA)',   'HuggingFace PEFT', 'Fine-tuning (QLoRA) uchun #1'),\n]\nfor fmt, hw, eng, role in quant_formats:\n    print(f'{fmt:23} | {hw:29} | {eng:19} | {role}')",
                "outputOrNoteUz": "Natija: 16 GB RAMli CPU noutbukda `AWQ` yoki `vLLM` ishlatib bo'lmaydi — u yerda `GGUF (Q4_K_M)` + `Ollama/llama.cpp` ishlatiladi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: 16 GB RAM Noutbuk Uchun Aniq Hardware Feasibility Kalkulyatori (Gap Lab 2)",
                "scenarioUz": "Operatsion tizim (Windows/Linux + Brauzer + VS Code) ~4.5 GB RAM band qilganda qolgan ~11.5 GB bo'sh xotiraga qaysi model va qancha kontekst sig'ishini hisoblash.",
                "howToUseUz": "Turli model va kvantlash turlarini kalkulyatorda sinang.",
                "code": "def check_16gb_ram_feasibility(model_name: str, params_b: float, bits: float, ctx_tokens: int) -> str:\n    os_reserved_gb = 4.5\n    available_gb = 16.0 - os_reserved_gb # 11.5 GB bo'sh\n    weights_gb = params_b * (bits / 8.0)\n    kv_gb = (ctx_tokens / 1024.0) * 0.12 * (params_b / 8.0)\n    runtime_gb = 0.8\n    needed = weights_gb + kv_gb + runtime_gb\n    status = 'SAFE (Barqaror)' if needed <= 9.5 else ('TIGHT (Chegarada)' if needed <= available_gb else 'OOM (Swap/Qulash!)')\n    return f'{model_name:26} | Kerak: {needed:5.2f} / {available_gb} GB -> [{status}]'\n\nconfigs = [\n    ('Qwen2.5-3B-Instruct Q4_K_M', 3.0, 4.5, 8192),\n    ('Llama-3.1-8B-Instruct Q4_K_M', 8.0, 4.5, 4096),\n    ('Llama-3.1-8B-Instruct Q8_0',   8.0, 8.5, 8192),\n    ('Qwen2.5-14B-Instruct Q4_K_M', 14.0, 4.5, 4096),\n]\nfor name, p, b, ctx in configs:\n    print(check_16gb_ram_feasibility(name, p, b, ctx))",
                "expectedOutput": "Qwen2.5-3B-Instruct Q4_K_M | Kerak:  2.67 / 11.5 GB -> [SAFE (Barqaror)]\nLlama-3.1-8B-Instruct Q4_K_M | Kerak:  5.78 / 11.5 GB -> [SAFE (Barqaror)]\nLlama-3.1-8B-Instruct Q8_0   | Kerak: 10.26 / 11.5 GB -> [TIGHT (Chegarada)]\nQwen2.5-14B-Instruct Q4_K_M| Kerak:  9.52 / 11.5 GB -> [TIGHT (Chegarada)]",
                "breakdownUz": "16 GB RAMda RAG (VectorDB + Embedding model + LLM birga ishlashi) uchun eng oltin nuqta — **3B–8B `Q4_K_M` model + 4096 kontekst** hisoblanadi."
            },
            {
                "titleUz": "2-misol: Kvantlash Sifat Yo'qotishi (Perplexity vs Bits Trade-off)",
                "scenarioUz": "Nima uchun `Q4_K_M` (4-bit) eng optimal nuqta, `Q2_K` (2-bit) esa model mantiqini buzib qo'yishini ko'rish.",
                "howToUseUz": "Bitlar soni va Perplexity (qancha past bo'lsa shuncha yaxshi) jadvalini tahlil qiling.",
                "code": "quants = [\n    ('FP16 (16-bit Baseline)', 16.0, 6.20, '100% sifat, ammo 2x-3.5x ko\\'p xotira va sekin'),\n    ('Q8_0 (8-bit)',           8.5,  6.22, '+0.3% farq — deyarli FP16 bilan bir xil'),\n    ('Q5_K_M (5-bit)',         5.7,  6.28, '+1.3% farq — juda yuqori aniqlik'),\n    ('Q4_K_M (4-bit SweetSpot)',4.6, 6.38, '+2.9% farq — Tezlik/Xotira/Sifat bo\\'yicha #1 optimal!'),\n    ('Q2_K (2-bit Extreme)',   2.7,  8.95, '+44% yomonlashuv — o\\'zbek tilida kuchli gallyutsinatsiya!'),\n]\nfor q, b, ppl, note in quants:\n    print(f'{q:26} | {b:>4.1f} bit/param | Perplexity: {ppl:.2f} | {note}')",
                "expectedOutput": "FP16 (16-bit Baseline)     | 16.0 bit/param | Perplexity: 6.20...\nQ4_K_M (4-bit SweetSpot)   |  4.6 bit/param | Perplexity: 6.38...",
                "breakdownUz": "`Q4_K_M` muhim Attention va `lm_head` tensorlarini 6-bitda, oddiy FFN tensorlarini 4-bitda (K-quants mixed precision) saqlagani uchun sifatni deyarli yo'qotmaydi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "GGUF & K-Quants (`Q4_K_M`, `Q5_K_M`, `Q8_0`)",
                "category": "LLM & RAG",
                "definitionUz": "Georgi Gerganov (`llama.cpp`) yaratgan binar model formati; `K_M` (K-quants Medium) modelning sezgir qatlamlariga ko'proq bit (6-bit), qolgan qatlamlariga 4-bit ajratuvchi aralash kvantlash sxemasi.",
                "analogyOrExampleUz": "Rasmni siqishda odamning yuzi va ko'zlarini (Attention/Output) yuqori sifatda qoldirib, orqa fon osmonni (FFN) kuchliroq siqish.",
                "connectedTo": [
                    {
                        "targetTerm": "Ollama & llama.cpp Local Serving",
                        "targetLessonId": "D07.2",
                        "relationshipUz": "Keyingi darsda Ollama va llama.cpp aynan shu GGUF fayllarini `mmap` orqali yuklab 16 GB RAMda ishga tushiradi."
                    }
                ]
            },
            {
                "term": "AWQ (Activation-Aware Weight Quantization)",
                "category": "LLM & RAG",
                "definitionUz": "Og'irliklarning o'ziga emas, balki kiruvchi **aktivatsiyalar kattaligiga** qarab eng muhim 1% og'irlik kanallarini masshtablash orqali himoya qiluvchi GPU 4-bit kvantlash usuli.",
                "analogyOrExampleUz": "Yuk tashishda barcha qutilarni bir xil siqmasdan, ichida mo'rt billur idish bor 1% qutilarni maxsus himoya ramkasiga olish.",
                "connectedTo": [
                    {
                        "targetTerm": "vLLM Production GPU Serving",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "vLLM serverida yuqori throughput (RPS) olish uchun NVIDIA GPU'larda GGUF emas, balki AWQ yoki FP8 kvantlangan modellar ishlatiladi."
                    }
                ]
            },
            {
                "term": "Memory-Bandwidth Bound Decode",
                "category": "LLM & RAG",
                "definitionUz": "LLM har bitta tokenni yozish uchun barcha milliardlab og'irliklarni RAM/VRAMdan protsessor registrlariga ko'chirib o'qishga majbur bo'lishi; shuning uchun 4-bit kvantlash modelni nafaqat kichraytiradi, balki **2-3 barobar tezlashtiradi**!",
                "analogyOrExampleUz": "Tor eshikdan 16 tonnalik yukni (`FP16`) olib o'tishdan ko'ra 4.5 tonnalik siqilgan yukni (`Q4_K_M`) olib o'tish 3.5 marta tezroq bitadi.",
                "connectedTo": [
                    {
                        "targetTerm": "Decode Tokens/sec (ITL) vs Prefill (TTFT)",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "7-hafta 3-darsda Decode tezligi (`tok/s`) aynan xotira o'tkazuvchanligiga (`GB/s / Model_Size_GB`) teng ekanini benchmarkda o'lchaymiz."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d07-1-int-1",
                "level": "Junior",
                "questionUz": "7B yoki 8B parametrli LLM'ni FP16 formatidan 4-bit (`Q4_K_M`) formatiga kvantlaganda nima uchun u faqat kamroq xotira olibgina qolmay, balki tokenlarni 2-3 barobar TEZROQ ham generatsiya qiladi?",
                "interviewerIntentUz": "Compute-bound vs Memory-bandwidth bound farqini bilishini tekshirish (ko'pchilik dequantization hisobiga sekinlashadi deb o'ylaydi!).",
                "strongAnswerUz": "Bitta foydalanuvchi uchun token-ma-token generatsiya (Decode bosqichi) protsessor hisoblash quvvatiga (FLOPs) emas, balki **Xotira O'tkazuvchanligiga (Memory Bandwidth — RAM/VRAMdan CPU/GPU yadrosiga ma'lumot tashish tezligiga)** tayanadi! Har bitta tokenni chiqarish uchun butun model og'irliklarini xotiradan o'qib chiqish kerak. FP16 da har bir token uchun xotiradan `16 GB` ma'lumot tashilsa, 4-bit (`Q4_K_M`) da atigi `~4.5 GB` ma'lumot tashiladi! Xotiradan 3.5 barobar kam bayt o'qilgani uchun registrlardagi yengil dequantization xarajatiga qaramay generatsiya (`tokens/sec`) 2.5–3 barobar tezlashadi!",
                "redFlagUz": "'4-bitda dequantization qilish kerak bo'lgani uchun FP16 dan sekinroq ishlaydi' deyish.",
                "followUpQuestionUz": "Savol: DDR4/DDR5 CPU RAM o'tkazuvchanligi `~40-60 GB/s` bo'lsa, `4.5 GB` lik `8B Q4_K_M` model CPU'da nazariy maksimal sekundiga nechta token chiqara oladi? Javob: $50\\text{ GB/s} / 4.5\\text{ GB} \\approx 11\\text{ token/sek}$ (real amalda 7-10 tok/s)!"
            },
            {
                "id": "d07-1-int-2",
                "level": "Middle",
                "questionUz": "`Q4_0` bilan `Q4_K_M` o'rtasida qanday farq bor va nima uchun o'zbek tili kabi kam resursli tillarda `Q2_K` yoki `Q3_K_S` ishlatish xavfli?",
                "interviewerIntentUz": "K-quants arxitekturasi va kvantlashning ko'p tilli bilimga ta'sirini tushunishini sinash.",
                "strongAnswerUz": "`Q4_0` barcha tensorlarni bir xil oddiy 4-bit bloklarda siqadi. `Q4_K_M` (**K-quants Medium**) esa super-bloklar (double quantization — scale'larning o'zini ham kvantlash) va **aralash aniqlik (mixed precision)** ishlatadi: u modelning eng sezgir tensorlarini (`attention.wv`, `ffn_down`, `token_embd`, `output.weight`) 6-bitda (`Q6_K`), qolgan qatlamlarini 4-bitda saqlaydi. O'zbek tili modelning 'long-tail' (kamroq uchragan) parametrlarida joylashgani sababli, `Q2_K` yoki `Q3` kabi agressiv siqish birinchi bo'lib aynan kam resursli tillar grammatikasi va faktlarini buzib yuboradi. O'zbek tili uchun minimal tavsiya — `Q4_K_M` yoki `Q5_K_M`.",
                "redFlagUz": "'Harflari chiroyli bo'lgani uchun Q4_K_M deyiladi, Q2_K ham bir xil ishlaydi' deyish.",
                "followUpQuestionUz": "Savol: `AWQ` kvantlash algoritmi qanday qilib 1% eng muhim og'irliklarni FP16 da alohida saqlamasdan (mixed-precision hardware penaltiesiz) himoya qiladi? Javob: Muhim kanallarni kvantlashdan oldin $s > 1$ ko'paytuvchiga ko'paytirib (va kiruvchi aktivatsiyani $s$ ga bo'lib) kvantlash xatosini matematik ravishda kichraytiradi!"
            },
            {
                "id": "d07-1-int-3",
                "level": "Senior / Production",
                "questionUz": "24 GB VRAMli RTX 3090/4090 GPU serverda 8B AWQ model (`~5.5 GB`) ko'tarildi. Qolgan 18 GB VRAM bo'sh turibdi deb kontekst oynasini `65,536` qilib va `20` ta parallel foydalanuvchi (`batch_size=20`) qo'yilganda server OOM bo'lib quladi. Nima hisobga olinmagan?",
                "interviewerIntentUz": "Parallel so'rovlarda KV Cache'ning chiziqli ko'payishini ($B \\times T$) aniq hisoblay olishini sinash.",
                "strongAnswerUz": "Model og'irliklari (`5.5 GB`) barcha foydalanuvchilar uchun bitta nusxada umumiy turadi, ammo **KV Cache har bir faol parallel so'rov (`batch_size = B`) uchun ALOHIDA** ajratiladi! Llama-3 8B (GQA) da 1,024 tokenlik kontekst ~128 MB KV Cache oladi. $T = 65,536$ (64k) token bitta foydalanuvchi uchun $64 \\times 0.128\\text{ GB} = 8.19\\text{ GB}$ VRAM oladi; 20 ta parallel foydalanuvchi uchun esa $20 \\times 8.19\\text{ GB} = 163.8\\text{ GB}$ VRAM kerak bo'ladi! Yechim: maksimal kontekst uzunligini (`max_model_len = 8192`), parallel ketma-ketliklar limitini (`max_num_seqs`) va FP8 KV Cache kvantlashini sozlash.",
                "redFlagUz": "'Model 5.5 GB bo'lsa, 100 ta foydalanuvchida ham 5.5 GB turaveradi' deyish.",
                "followUpQuestionUz": "Savol: KV Cache hajmini model arxitekturasini o'zgartirmasdan inferens vaqtida 2 barobar qisqartirish uchun qaysi sozlama yoqiladi? Javob: **KV Cache Quantization (`kv_cache_dtype='fp8'` yoki `q8_0`)** — $K$ va $V$ tensorlarini FP16 o'rniga 8-bitda saqlash!"
            }
        ],
        "videos": [
            {
                "id": "vid-d07-1-en",
                "title": "Local LLM Quickstart: Ollama, Memory, Structured Output & Tracing",
                "channel": "Venelin Valkov",
                "language": "en",
                "youtubeId": "jomsEY0r2Ng",
                "youtubeUrl": "https://www.youtube.com/watch?v=jomsEY0r2Ng",
                "durationOrTimestamp": "Mahalliy LLM va xotira qismi",
                "whatItExplainsUz": "Mahalliy kompyuterda kvantlangan LLM modellarni tanlash, yuklash va Python dasturiga ulash ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-amaliy misoldagi `check_16gb_ram_feasibility` kalkulyatorida o'z kompyuteringiz RAM hajmini kiritib mos modelni hisoblang."
            },
            {
                "id": "vid-d07-1-uz",
                "title": "Kun 1. LLM arxitekturasi, parametrlar va resurslar sarfi",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "3w2ws7xyXYE",
                "youtubeUrl": "https://www.youtube.com/watch?v=3w2ws7xyXYE",
                "durationOrTimestamp": "Model hajmi va tokenlar",
                "whatItExplainsUz": "Model parametrlari soni (3B, 7B, 70B) va kontekst uzunligining xotira hamda tezlikka ta'siri o'zbek tilida tushuntirilgan.",
                "howToUseVideoUz": "Nima uchun 16 GB RAMda 3B–8B `Q4_K_M` model eng to'g'ri muhandislik tanlovi ekanini daftaringizga yozib oling."
            }
        ],
        "quiz": [
            {
                "id": "d07-1-q1",
                "promptUz": "1. Konseptual: 8 milliard parametrli (8B) LLM modelning faqat og'irliklari (Weights) `FP16` (16-bit) va `Q4_K_M` (~4.5-bit) formatlarida taxminan qancha xotira egallaydi?",
                "options": [
                    "FP16 da 2 GB, Q4_K_M da 1 GB",
                    "FP16 da ~16 GB (8B * 2 bayt), Q4_K_M da esa ~4.5 GB (8B * 0.56 bayt)",
                    "Ikkalasida ham 80 GB",
                    "FP16 da 4 GB, Q4_K_M da 16 GB"
                ],
                "correctIndex": 1,
                "explanationUz": "16-bit = 2 bayt (`8 * 2 = 16 GB`), ~4.5-bit = ~0.56 bayt (`8 * 0.56 ≈ 4.5 GB`)."
            },
            {
                "id": "d07-1-q2",
                "promptUz": "2. Kod Tahlili: 16 GB RAMga ega, alohida NVIDIA GPU'si bo'lmagan (CPU-only) noutbukda mahalliy LLM ishga tushirish uchun qaysi format va dvigatel tanlanadi?",
                "options": [
                    "FP16 + vLLM",
                    "GGUF (Q4_K_M) + Ollama / llama.cpp",
                    "AWQ + TensorRT-LLM",
                    "70B FP32 model"
                ],
                "correctIndex": 1,
                "explanationUz": "vLLM va AWQ faqat NVIDIA GPU talab qiladi; CPU va 16 GB RAM uchun GGUF (`Q4_K_M`) va `llama.cpp` / `Ollama` standart hisoblanadi."
            },
            {
                "id": "d07-1-q3",
                "promptUz": "3. Production Debugging: Nima uchun modelni FP16 dan 4-bit (`Q4_K_M`) ga kvantlash token generatsiya tezligini (`tokens/sec`) 2-3 barobar oshiradi?",
                "options": [
                    "Chunki generatsiya (Decode) xotira o'tkazuvchanligiga (Memory Bandwidth) bog'liq — har bir token uchun RAM/VRAMdan 3.5 barobar kamroq bayt o'qiladi",
                    "Chunki model qatlamlari o'chirib tashlanadi",
                    "Chunki tokenlar qisqarib qoladi",
                    "Tezlik oshmaydi, aksincha 10 marta sekinlashadi"
                ],
                "correctIndex": 0,
                "explanationUz": "Decode bosqichi memory-bandwidth bound bo'lgani uchun xotiradan tashiladigan model hajmi necha barobar kichraysa, tezlik ham shuncha barobar oshadi."
            }
        ]
    },
    "D07.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: `llama.cpp` va `mmap` — Nega GGUF Model 1 Soniyada Yuklanadi?",
                "explanationUz": "Georgi Gerganov tomonidan toza C/C++ da (tashqi og'ir bog'liqliklarsiz) yozilgan `llama.cpp` dvigateli CPU'ning AVX2/AVX-512 vektorli registrlari va Apple Metal / CUDA yadrolarini maksimal darajada ishlatadi. Uning eng muhim tizimli siri — **`mmap()` (Memory-Mapped File I/O)**: 5 GB lik `.gguf` faylni diskdan RAMga `read()` bilan sekin ko'chirib o'tirmasdan, operatsion tizim virtual xotira sahifalarini to'g'ridan-to'g'ri diskdagi faylga bog'laydi (Zero-copy startup).",
                "codeExample": "engine_comparison = [\n    ('llama.cpp (llama-server)', 'Toza C/C++ dvigatel', 'Fine-grained flaglar (--ctx-size, -ngl, --parallel), GBNF grammatika'),\n    ('Ollama',                   'Go wrapper + llama.cpp', 'Modelfile, model menejment (`ollama pull/run`), REST API (:11434)'),\n]\nfor eng, arch, feat in engine_comparison:\n    print(f'{eng:26} | {arch:22} | {feat}')",
                "outputOrNoteUz": "Natija: Ollama kapot ostida aynan `llama.cpp` dvigatelini ishlatadi va ustiga Docker-ga o'xshash qulay model boshqaruvini qo'shadi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Ollama `Modelfile` va Muhim Konfiguratsiya Parametrlari",
                "explanationUz": "16 GB RAMda Ollama bilan ishlaganda 3 ta parametr hayot-mamot ahamiyatiga ega: 1) **`num_ctx`** — kontekst oynasi hajmi (default `2048`; RAG uchun `4096` yoki `8192` ga o'rnatiladi, ammo `32768` qilib yuborilsa KV Cache RAMni yeb qo'yadi!); 2) **`num_gpu` (`-ngl`)** — nechta Transformer qatlamini GPU'ga yuklash (hybrid offloading); 3) **`keep_alive`** — so'rov tugagandan keyin model RAMda qancha vaqt kutib turishi (RAG paytida Embedding model va LLM model navbatma-navbat sig'ishi uchun boshqariladi).",
                "codeExample": "modelfile_uz_rag = '''\nFROM qwen2.5:3b-instruct-q4_K_M\n\nPARAMETER temperature 0.1\nPARAMETER top_p 0.9\nPARAMETER num_ctx 4096\nPARAMETER repeat_penalty 1.1\n\nSYSTEM \"\"\"\nSen AI Atlas platformasining o'zbek tilidagi rasmiy texnik yordamchisisan.\nFaqat berilgan kontekst asosida aniq, iqtibosli ([1], [2]) javob ber.\n\"\"\"\n'''\nprint('Maxsus Ollama Modelfile konfiguratsiyasi:\\n' + modelfile_uz_rag.strip())",
                "outputOrNoteUz": "Natija: `ollama create atlas-uz-rag -f Modelfile` buyrug'i bilan o'zbekcha RAG uchun maxsus sozlangan mahalliy model yaratiladi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: OpenAI-Compatible API va JSON Schema / Structured Output",
                "explanationUz": "Ham `Ollama` (`http://localhost:11434/v1/chat/completions`), ham `llama-server` (`http://localhost:8080/v1/chat/completions`) **OpenAI API standarti** bilan 100% mos ishlaydi! Bu degani: kodda faqat `base_url` va `model` nomini o'zgartirish orqali lokal Ollama'dan bulutdagi vLLM yoki OpenAI'ga 1 qator kod bilan o'tish mumkin. Bundan tashqari, `format` (JSON schema / GBNF grammar) parametri token sampling paytida JSON sintaksisiga zid har qanday tokenning logitini `-inf` qilib, **100% kafolatlangan valid JSON** chiqaradi!",
                "codeExample": "import json\n\n# Ollama /v1/chat/completions Structured Output so'rov payload'i:\nrequest_payload = {\n    'model': 'atlas-uz-rag',\n    'messages': [\n        {'role': 'system', 'content': 'Murojaatni tahlil qilib JSON qaytar.'},\n        {'role': 'user', 'content': 'Kartamdan 50 ming yechib olindi, qaytarib bering!'}\n    ],\n    'temperature': 0.0,\n    'response_format': {\n        'type': 'json_schema',\n        'json_schema': {\n            'name': 'ticket_analysis',\n            'schema': {\n                'type': 'object',\n                'properties': {\n                    'category': {'type': 'string', 'enum': ['BILLING', 'TECH', 'OTHER']},\n                    'urgency': {'type': 'integer', 'minimum': 1, 'maximum': 5},\n                    'summary_uz': {'type': 'string'}\n                },\n                'required': ['category', 'urgency', 'summary_uz']\n            }\n        }\n    }\n}\nprint('OpenAI-mos Structured Output Payload:\\n', json.dumps(request_payload, indent=2, ensure_ascii=False))",
                "outputOrNoteUz": "Natija: GBNF / JSON Schema constrained decoding tufayli hatto kichik 3B model ham hech qachon JSON qavsini unutib qo'ymaydi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Hybrid CPU + GPU Offloading (`-ngl`) Xotira Taqsimoti Kalkulyatori",
                "scenarioUz": "Noutbukda 16 GB tizim RAM va 4 GB kichik RTX 3050 GPU bor. 32 qatlamli 8B modelning nechta qatlamini GPU VRAM'ga (`-ngl`), qolganini CPU RAM'ga joylashtirishni hisoblash.",
                "howToUseUz": "Kodni ishga tushirib optimal `-ngl` (n-gpu-layers) sonini toping.",
                "code": "def calculate_optimal_ngl(total_layers: int, model_gb: float, vram_gb: float, kv_gb: float = 0.6) -> dict:\n    usable_vram = max(0.0, vram_gb - kv_gb - 0.5) # 0.5 GB CUDA context zaxirasi\n    gb_per_layer = model_gb / total_layers\n    gpu_layers = min(total_layers, int(usable_vram // gb_per_layer))\n    cpu_layers = total_layers - gpu_layers\n    return {\n        'gpu_layers_ngl': gpu_layers,\n        'cpu_layers': cpu_layers,\n        'vram_used_gb': round(gpu_layers * gb_per_layer + kv_gb, 2),\n        'ram_used_gb': round(cpu_layers * gb_per_layer + 0.8, 2)\n    }\n\nprint('4 GB VRAM + 16 GB RAM (8B Q4_K_M = 4.6 GB, 32 qatlam):')\nprint(calculate_optimal_ngl(total_layers=32, model_gb=4.6, vram_gb=4.0))\nprint('8 GB VRAM + 16 GB RAM (8B Q4_K_M = 4.6 GB, 32 qatlam):')\nprint(calculate_optimal_ngl(total_layers=32, model_gb=4.6, vram_gb=8.0))",
                "expectedOutput": "4 GB VRAM + 16 GB RAM (8B Q4_K_M = 4.6 GB, 32 qatlam):\n{'gpu_layers_ngl': 20, 'cpu_layers': 12, 'vram_used_gb': 3.48, 'ram_used_gb': 2.52}\n8 GB VRAM + 16 GB RAM...\n{'gpu_layers_ngl': 32, 'cpu_layers': 0, 'vram_used_gb': 5.2, 'ram_used_gb': 0.8}",
                "breakdownUz": "4 GB VRAM'ga 20 ta qatlam (`-ngl 20`), qolgan 12 ta qatlam esa CPU RAM'ga tushib, model qulamasdan gibrid rejimda tez ishlaydi!"
            },
            {
                "titleUz": "2-misol: Lokal LLM Client va Fallback (Retry + Timeout) Simulyatsiyasi",
                "scenarioUz": "Ollama serveriga so'rov yuborish, javobni JSON sifatida parse qilish va vaqtni o'lchash.",
                "howToUseUz": "Client javob tahlilini ishga tushiring.",
                "code": "import json\nimport time\n\ndef mock_ollama_chat(prompt: str, num_ctx: int = 4096) -> dict:\n    t0 = time.perf_counter()\n    # Ollama javob strukturasi:\n    response_json = json.dumps({\n        'answer_uz': 'Mehnat kodeksining 134-moddasiga ko\\'ra yillik ta\\'til kamida 21 kalendar kun.',\n        'citations': ['MK-134-modda'],\n        'confidence': 'HIGH'\n    }, ensure_ascii=False)\n    dt_ms = (time.perf_counter() - t0) * 1000\n    return {\n        'model': 'qwen2.5:3b-instruct-q4_K_M',\n        'content': json.loads(response_json),\n        'prompt_eval_count': 412,\n        'eval_count': 28,\n        'latency_ms': round(dt_ms, 2)\n    }\n\nres = mock_ollama_chat('Yillik mehnat ta\\'tili necha kun?')\nprint('Parsed Structured Response:', res['content'])\nprint(f\"Tokenlar: Input={res['prompt_eval_count']}, Output={res['eval_count']}\")",
                "expectedOutput": "Parsed Structured Response: {'answer_uz': \"Mehnat kodeksining 134-moddasiga ko'ra...\", 'citations': ['MK-134-modda'], 'confidence': 'HIGH'}...",
                "breakdownUz": "Ollama javobidagi `prompt_eval_count` (kirish tokenlari) va `eval_count` (chiqish tokenlari) 7-hafta benchmark jadvalini to'ldirish uchun ishlatiladi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "llama.cpp & GGUF Memory Mapping (`mmap`)",
                "category": "LLM & RAG",
                "definitionUz": "C/C++ da yozilgan yengil LLM inferens dvigateli; `mmap` orqali model faylini diskdan operativ xotira adres fazosiga to'g'ridan-to'g'ri ulab, yuklanish vaqtini va dublikat buferlarni yo'qotadi.",
                "analogyOrExampleUz": "Kitobni qo'lda daftarga ko'chirib yozmasdan, to'g'ridan-to'g'ri kitob betiga xatcho'p qo'yib o'qish.",
                "connectedTo": [
                    {
                        "targetTerm": "Portfolio-2 Local Uzbek RAG Chatbot",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "8-haftadagi 2-portfolio loyihamiz internetga ulanmasdan 16 GB RAMda aynan `Ollama` / `llama.cpp` ustida ishlaydi."
                    }
                ]
            },
            {
                "term": "Constrained Decoding & GBNF Grammars",
                "category": "LLM & RAG",
                "definitionUz": "Token tanlash (sampling) bosqichida BNF grammatikasi yoki JSON Schema qoidalariga mos kelmaydigan barcha tokenlarni maskalab (`-inf`), 100% sintaktik to'g'ri JSON chiqarish mexanizmi.",
                "analogyOrExampleUz": "Poyezd relsi: poyezd (LLM) qaysi tezlikda yurmasin, relsdan (JSON sxemadan) chapga yoki o'ngga chiqib keta olmaydi.",
                "connectedTo": [
                    {
                        "targetTerm": "Reliable Agent Tool Calling",
                        "targetLessonId": "D08.3",
                        "relationshipUz": "8-haftada AI Agent funksiyani chaqirayotganda argumentlarni xatosiz JSON formatda berishi aynan Constrained Decoding orqali kafolatlanadi."
                    }
                ]
            },
            {
                "term": "Context Window (`num_ctx`) & Truncation Risk",
                "category": "LLM & RAG",
                "definitionUz": "Model bir so'rovda (kirish prompti + RAG hujjatlari + generatsiya qilinadigan javob) ko'ra oladigan maksimal tokenlar sig'imi.",
                "analogyOrExampleUz": "Ish stoli yuzasi: stol `2048` sm bo'lsa-yu, ustiga `3500` sm qog'oz qo'ysangiz, stolga sig'magan `1452` sm qismi (ko'pincha eng boshidagi System Prompt!) yerga tushib ketadi.",
                "connectedTo": [
                    {
                        "targetTerm": "RAG Context Packing & Reranking Top-K",
                        "targetLessonId": "D08.2",
                        "relationshipUz": "RAG tizimida 50 ta chunkni emas, Reranker saralagan eng aniq Top-3 yoki Top-5 chunkni `num_ctx=4096` ichiga joylashtiramiz."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d07-2-int-1",
                "level": "Junior",
                "questionUz": "Ollama'da RAG tizimi uchun 3,000 tokenlik hujjat + savol yuborildi, ammo model hujjatning boshidagi qoidalarni va System Prompt'ni umuman eslamayapti. Qaysi sozlama unutilgan?",
                "interviewerIntentUz": "Ollama'ning eng mashhur yashirin tuzog'ini (`default num_ctx = 2048`) bilishini tekshirish!",
                "strongAnswerUz": "Modelning o'zi (masalan Llama-3 yoki Qwen2.5) 32k–128k kontekstni qo'llab-quvvatlasa ham, **Ollama RAM/VRAMni tejash maqsadida default `num_ctx = 2048` qilib cheklab qo'yadi**! Agar 3,000 tokenlik prompt yuborilsa, Ollama xato qaytarmasdan, jimlik bilan boshidagi ~1,000 tokenni (System Prompt va birinchi hujjatlarni!) kesib tashlaydi (silent truncation). Tuzatish: `Modelfile` ichida `PARAMETER num_ctx 4096` (yoki `8192`) deb yozish yoki API so'rovida `options: {'num_ctx': 4096}` yuborish shart!",
                "redFlagUz": "'3B yoki 8B model o'zbek tilini tushunmagani uchun unutib qo'ygan' deyish.",
                "followUpQuestionUz": "Savol: U holda nega `num_ctx` ni har doim `128000` qilib qo'ymaymiz? Javob: Chunki `llama.cpp` ishga tushganda KV Cache buferini `num_ctx` ga moslab oldindan RAM/VRAMda band qiladi (`128000` token KV Cache'ning o'zi 15+ GB xotirani yeb qo'yib, 16 GB noutbukni darhol OOM qiladi)."
            },
            {
                "id": "d07-2-int-2",
                "level": "Middle",
                "questionUz": "LLM'dan JSON javob olishda promptga *'Faqat JSON qaytar'* deb yozish bilan Constrained Decoding (`response_format` / GBNF grammar) ishlatish o'rtasida qanday farq bor?",
                "interviewerIntentUz": "Probabilistic prompting vs Deterministic logit masking farqini tushunishini sinash.",
                "strongAnswerUz": "Promptga *'Faqat JSON qaytar'* deb yozilganda model ehtimollikka tayanadi — 95% holatda JSON qaytarsa ham, 5% holatda boshiga *\"Albatta, mana JSON: ```json ...\"* deb matn qo'shib yuboradi yoki oxirgi qavsni unutadi va `json.loads()` production'da yiqiladi. **Constrained Decoding (GBNF / JSON Schema)** esa generatsiyaning har bir qadamida Softmax'dan oldin avtomat (Finite State Machine) orqali faqat joriy JSON holatida ruxsat etilgan tokenlarnigina ochiq qoldirib, qolgan barcha tokenlarning logitini `-inf` qiladi. Natijada sintaktik xato JSON chiqish ehtimoli matematik ravishda **0.0%** ga tushadi!",
                "redFlagUz": "'Promptga KATTA HARFLARDA 3 marta yozsa 100% JSON qaytadi' deyish.",
                "followUpQuestionUz": "Savol: Constrained Decoding sintaktik to'g'rilikni kafolatlasa, semantik to'g'rilikni ham kafolatlaydimi? Javob: Yo'q! U JSON sxema va tiplar to'g'ri bo'lishini kafolatlaydi, ammo maydon ichidagi faktik qiymat to'g'ri bo'lishi uchun RAG konteksti va Pydantic biznes-mantiq validatsiyasi zarur."
            },
            {
                "id": "d07-2-int-3",
                "level": "Senior / Production",
                "questionUz": "16 GB RAMli CPU serverda (`8 ta jismoniy Physical Core`, `16 ta Hyper-Threading Logical Thread`) `llama.cpp` ishga tushirildi. `--threads 16` berganda tezlik `--threads 8` ga qaraganda SEKINROQ chiqdi. Nega?",
                "interviewerIntentUz": "CPU Hyper-Threading, Memory Bandwidth contention va L3 cache thrashing mexanizmini bilishini sinash.",
                "strongAnswerUz": "LLM Decode bosqichi xotira o'tkazuvchanligiga (`Memory Bandwidth`) va SIMD (AVX2/AVX-512) birliklariga tayanadi. Hyper-Threading (SMT) mantiqiy oqimlari yangi jismoniy AVX vektor bloki yoki yangi RAM kanali qo'shmaydi — ikkita mantiqiy oqim bitta jismoniy yadroning L1/L2 keshini va SIMD registrlarini talashadi! `--threads 16` berilganda thread synchronization overhead (bariyer kutishlari) va cache thrashing tufayli tezlik 15-30% ga tushib ketadi. `llama.cpp` uchun oltin qoida: `--threads` soni mantiqiy oqimlarga emas, **jismoniy yadrolar soniga (`Physical Cores`, masalan `6` yoki `8`)** teng qilib belgilanadi.",
                "redFlagUz": "'--threads ni 32 yoki 64 qilsa yanada tezlashadi' deyish.",
                "followUpQuestionUz": "Savol: `mmap` yoqilgan holatda birinchi so'rov sekinroq chiqib, ikkinchi so'rovdan tezlashishining sababi nima? Javob: Birinchi so'rovda OS Page Fault orqali fayl sahifalarini diskdan Page Cache (RAM) ga tortib oladi (Cold start); keyingi so'rovlarda barcha sahifalar RAMda tayyor turadi (Warm)."
            }
        ],
        "videos": [
            {
                "id": "vid-d07-2-en",
                "title": "LangChain Quickstart with Local LLM | Ollama, Pydantic Structured Output, Tool Use",
                "channel": "Venelin Valkov",
                "language": "en",
                "youtubeId": "jomsEY0r2Ng",
                "youtubeUrl": "https://www.youtube.com/watch?v=jomsEY0r2Ng",
                "durationOrTimestamp": "To'liq amaliy dars",
                "whatItExplainsUz": "Ollama'ni o'rnatish, lokal modelni tortib olish va Python orqali Pydantic Structured Output hamda Tool Use bilan ishlatish ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi Ollama API chaqiruvlarini ko'rib, darsdagi `Modelfile` va `response_format` JSON sxemasini o'z kompyuteringizda sinab ko'ring."
            },
            {
                "id": "vid-d07-2-uz",
                "title": "LLM'dan toza JSON: Structured output + FastAPI",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "lzhSUZ0XpFc",
                "youtubeUrl": "https://www.youtube.com/watch?v=lzhSUZ0XpFc",
                "durationOrTimestamp": "To'liq o'zbekcha amaliyot",
                "whatItExplainsUz": "LLM javoblarini erkin matndan qat'iy JSON strukturasiga o'tkazish va backend servislarida xatosiz ishlatish o'zbek tilida tushuntirilgan.",
                "howToUseVideoUz": "3-bosqichdagi `ticket_analysis` JSON sxemasini o'z loyihangiz ehtiyojiga moslab kengaytiring."
            }
        ],
        "quiz": [
            {
                "id": "d07-2-q1",
                "promptUz": "1. Konseptual: Ollama'da uzun RAG kontekstlarini (`3000+` token) yuborganda model boshidagi ko'rsatmalarni jimlik bilan kesib tashlamasligi uchun qaysi parametrni oshirish shart?",
                "options": [
                    "`temperature`",
                    "`num_ctx` (chunki Ollama default holatda kontekstni 2048 token bilan cheklaydi)",
                    "`top_k`",
                    "`repeat_penalty`"
                ],
                "correctIndex": 1,
                "explanationUz": "Ollama'ning standart `num_ctx = 2048` limiti RAG uchun kamlik qiladi; uni `4096` yoki `8192` ga o'rnatish shart."
            },
            {
                "id": "d07-2-q2",
                "promptUz": "2. Kod Tahlili: `llama.cpp` va `Ollama` da `response_format` / GBNF Grammar (Constrained Decoding) qanday qilib 100% valid JSON chiqishini kafolatlaydi?",
                "options": [
                    "Xato JSON chiqsa qayta-qayta 100 marta so'rov yuboradi",
                    "Sampling vaqtida har bir qadamda JSON sxemasiga zid keluvchi barcha tokenlarning logitini `-inf` qilib maskalaydi",
                    "Javobni odam qo'lda tuzatadi",
                    "Faqat bo'sh lug'at `{}` qaytaradi"
                ],
                "correctIndex": 1,
                "explanationUz": "Constrained Decoding ruxsat etilmagan tokenlarni tanlash imkoniyatini matematik ravishda 0 ga tushiradi."
            },
            {
                "id": "d07-2-q3",
                "promptUz": "3. Production Debugging: 8 ta jismoniy yadroli (`8 Physical Cores`, `16 Logical Threads`) CPU'da `llama.cpp` eng yuqori tezlik ko'rsatishi uchun `--threads` parametriga qanday qiymat berish tavsiya etiladi?",
                "options": [
                    "`64`",
                    "Jismoniy yadrolar soniga teng (`8` yoki `6-8`), chunki Hyper-Threading mantiqiy oqimlari SIMD va kesh uchun raqobat (contention) keltirib chiqaradi",
                    "`1`",
                    "`1000`"
                ],
                "correctIndex": 1,
                "explanationUz": "LLM inferensi SIMD va memory-bandwidth bound bo'lgani uchun jismoniy yadrolar sonidan ko'p thread berish tezlikni pasaytiradi."
            }
        ]
    },
    "D07.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Prefill (Compute-Bound) vs Decode (Memory-Bound) va KV Cache",
                "explanationUz": "LLM so'rovni bajarishi ikki butunlay farqli fazadan iborat:\n1) **Prefill fazasi** — foydalanuvchi yuborgan 1,000 tokenlik promptni bir vaqtda parallel o'qib, barcha qatlamlar uchun boshlang'ich **Key ($K$) va Value ($V$)** tensorlarini hisoblab **KV Cache**ga yozish va 1-chi javob tokenini chiqarish (**TTFT — Time To First Token**). Bu faza matritsa-matritsa ko'paytmasi bo'lgani uchun **Compute-bound** (FLOPs ga bog'liq).\n2) **Decode fazasi** — har bir keyingi javob tokenini bittalab generatsiya qilish (**ITL — Inter-Token Latency** yoki **TPS — Tokens Per Second**). KV Cache tufayli oldingi 1,000 ta token qayta hisoblanmaydi ($O(T^2)$ dan $O(T)$ ga tushadi!), faqat yangi 1 dona token vektori model og'irliklariga ko'paytiriladi (**Memory-bandwidth bound**).",
                "codeExample": "# KV Cache bo'lmaganda vs KV Cache bo'lganda N=100 ta token yozish uchun hisoblanadigan token qadamlari:\nprompt_len = 500\ngen_tokens = 100\n\nwithout_kv_steps = sum(prompt_len + i for i in range(gen_tokens))\nwith_kv_steps = prompt_len + gen_tokens # Prefill (500) + har qadamda faqat 1 ta yangi token (100)\n\nprint(f'KV Cache YO\\'Q bo\\'lsa qayta ishlanadigan tokenlar: {without_kv_steps:>8,}')\nprint(f'KV Cache BOR bo\\'lsa qayta ishlanadigan tokenlar:  {with_kv_steps:>8,} ({without_kv_steps/with_kv_steps:.1f}x tejamkorlik!)')",
                "outputOrNoteUz": "Natija: KV Cache bo'lmasa 54,950 marta token hisoblanar edi, KV Cache bilan esa atigi 600 marta (91.6 barobar kam hisoblash!)."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: LLM Benchmark Metrikalari — TTFT, ITL, TPS va p95 Latency (Gap Lab 3)",
                "explanationUz": "LLM servisini baholashda bitta '3 soniyada javob berdi' degan raqam yetarli emas! 7-hafta **Original Gap Lab 3** talabiga ko'ra 4 ta metrika alohida o'lchanadi: 1) **TTFT (Time To First Token, ms)** — foydalanuvchi Enter bosgandan ekranda birinchi harf ko'ringuncha o'tgan vaqt (Streaming UX uchun TTFT < 500–800 ms bo'lsa foydalanuvchi tizimni lahzali deb his qiladi!); 2) **Decode Speed (`tok/s`)** — 1-tokendan keyingi o'qish tezligi (inson o'qish tezligi ~5–8 tok/s); 3) **E2E Latency (`p50`, `p95`, `p99`)**; 4) **Peak RAM/VRAM (GB)**.",
                "codeExample": "import numpy as np\n\ndef compute_llm_benchmark_stats(ttft_ms_list: list[float], decode_tps_list: list[float], out_tokens: int = 120) -> dict:\n    e2e_sec = [(ttft / 1000.0) + (out_tokens / tps) for ttft, tps in zip(ttft_ms_list, decode_tps_list)]\n    return {\n        'ttft_p50_ms': round(float(np.percentile(ttft_ms_list, 50)), 1),\n        'ttft_p95_ms': round(float(np.percentile(ttft_ms_list, 95)), 1),\n        'decode_tps_mean': round(float(np.mean(decode_tps_list)), 2),\n        'e2e_p95_sec': round(float(np.percentile(e2e_sec, 95)), 2)\n    }\n\nttfts = [320, 340, 310, 355, 330, 345, 325, 360, 335, 890] # 1 ta cold-start spike (890ms)\ntps_vals = [18.5, 18.2, 19.0, 17.8, 18.4, 18.1, 18.7, 17.9, 18.3, 16.5]\nprint('Benchmark Jadvali:', compute_llm_benchmark_stats(ttfts, tps_vals))",
                "outputOrNoteUz": "Natija: `ttft_p50 = 337.5 ms`, `ttft_p95 = 651.5 ms`, `decode_tps = 18.14 tok/s`, `e2e_p95 = 7.47 sek`."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: vLLM — PagedAttention va Continuous Batching",
                "explanationUz": "Nima uchun ko'p foydalanuvchili GPU production serverda Ollama emas, balki **vLLM** ishlatiladi? Oddiy tizimlarda har bir so'rov uchun maksimal `max_tokens=4096` KV Cache oldindan yaxlit (contiguous) VRAM blok sifatida band qilinadi — agar foydalanuvchi 100 token yozib to'xtasa, qolgan 3996 tokenlik VRAM isrof bo'ladi (60-80% fragmentation waste!). **vLLM** ning **PagedAttention** algoritmi OS virtual xotirasi kabi KV Cache'ni kichik (16 tokenlik) sahifalarga (blocks) bo'lib, faqat kerak bo'lganda dinamik ajratadi (isrof < 4%)! **Continuous Batching** esa 10 ta so'rovdan 1 tasi `<EOS>` bilan tugashi bilanoq qolgan 9 tasini kutmasdan uning o'rniga darhol navbatdagi yangi so'rovni qo'shib yuboradi (Throughput 5–20x oshadi!).",
                "codeExample": "# Static Batching vs PagedAttention + Continuous Batching VRAM samaradorligi:\nvram_budget_mb = 12_000 # KV Cache uchun 12 GB VRAM\nmax_ctx_mb = 512        # Maksimal 4096 token uchun 512 MB\nactual_avg_mb = 96      # Haqiqiy o'rtacha so'rov (750 token) = 96 MB\n\nstatic_max_users = vram_budget_mb // max_ctx_mb\npaged_max_users  = int((vram_budget_mb * 0.96) // actual_avg_mb)\nprint(f'An\\'anaviy Contiguous KV Cache sig\\'imi: {static_max_users} ta parallel so\\'rov (75% VRAM bo\\'sh yotadi!)')\nprint(f'vLLM PagedAttention sig\\'imi:          {paged_max_users} ta parallel so\\'rov ({paged_max_users/static_max_users:.1f}x ko\\'p!)')",
                "outputOrNoteUz": "Natija: Bir xil 12 GB VRAM ichida an'anaviy usul 23 ta foydalanuvchini sig'dirsa, vLLM PagedAttention 120 ta parallel foydalanuvchiga xizmat ko'rsatadi (5.2 barobar ko'p throughput!)."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Aniq KV Cache Hajmi Formulasi Kalkulyatori",
                "scenarioUz": "Model arxitekturasi (`n_layers`, `n_kv_heads`, `head_dim`) berilganda bitta token va butun kontekst uchun KV Cache baytlarini hisoblash.",
                "howToUseUz": "MHA (Llama-2-7B: 32 KV head) va GQA (Llama-3-8B: 8 KV head) farqini kodda ko'ring.",
                "code": "def kv_cache_size_mb(n_layers: int, n_kv_heads: int, head_dim: int, seq_len: int, batch: int = 1, bytes_per_val: int = 2) -> float:\n    # 2 (K va V) * layers * kv_heads * head_dim * seq_len * batch * bytes\n    total_bytes = 2 * n_layers * n_kv_heads * head_dim * seq_len * batch * bytes_per_val\n    return round(total_bytes / (1024 ** 2), 2)\n\n# Llama-2 7B (MHA: 32 KV heads) vs Llama-3 8B (GQA: 8 KV heads) at 8192 context:\nllama2_kv = kv_cache_size_mb(n_layers=32, n_kv_heads=32, head_dim=128, seq_len=8192)\nllama3_kv = kv_cache_size_mb(n_layers=32, n_kv_heads=8,  head_dim=128, seq_len=8192)\nllama3_fp8_kv = kv_cache_size_mb(n_layers=32, n_kv_heads=8, head_dim=128, seq_len=8192, bytes_per_val=1)\n\nprint(f'Llama-2 7B (MHA, 32 KV head, FP16) 8k ctx: {llama2_kv:>7.2f} MB (4 GB!)')\nprint(f'Llama-3 8B (GQA,  8 KV head, FP16) 8k ctx: {llama3_kv:>7.2f} MB (4x kichik!)')\nprint(f'Llama-3 8B (GQA,  8 KV head, FP8 ) 8k ctx: {llama3_fp8_kv:>7.2f} MB (8x kichik!)')",
                "expectedOutput": "Llama-2 7B (MHA, 32 KV head, FP16) 8k ctx: 4096.00 MB (4 GB!)\nLlama-3 8B (GQA,  8 KV head, FP16) 8k ctx: 1024.00 MB (4x kichik!)\nLlama-3 8B (GQA,  8 KV head, FP8 ) 8k ctx:  512.00 MB (8x kichik!)",
                "breakdownUz": "GQA (`n_kv_heads=8`) + FP8 KV Cache birgalikda 8k kontekst xotirasini 4 GB dan 512 MB ga tushiradi!"
            },
            {
                "titleUz": "2-misol: Prefix Caching (System Prompt va RAG Hujjatlarini Keshlash)",
                "scenarioUz": "Har bir so'rovda 1,500 tokenlik bir xil System Prompt va Qonun hujjati yuborilganda Prefill (TTFT) vaqtini 80% ga qisqartirish.",
                "howToUseUz": "Prefix Cache hit/miss vaqt farqini hisoblang.",
                "code": "def estimate_ttft_ms(system_tokens: int, user_tokens: int, prefill_tps: float = 1200.0, prefix_cached: bool = False) -> float:\n    tokens_to_compute = user_tokens if prefix_cached else (system_tokens + user_tokens)\n    return round((tokens_to_compute / prefill_tps) * 1000.0, 1)\n\nprint('Prefix Cache YO\\'Q (1500 sys + 100 user):', estimate_ttft_ms(1500, 100, prefix_cached=False), 'ms')\nprint('Prefix Cache BOR  (faqat 100 user token):', estimate_ttft_ms(1500, 100, prefix_cached=True), 'ms (16x tez TTFT!)')",
                "expectedOutput": "Prefix Cache YO'Q (1500 sys + 100 user): 1333.3 ms\nPrefix Cache BOR  (faqat 100 user token): 83.3 ms (16x tez TTFT!)",
                "breakdownUz": "Prompt tuzishda o'zgarmas qismni (System Prompt, Few-shot misollar) har doim ENG BOSHIGA, o'zgaruvchan savolni esa OXIRIGA qo'yish Prefix Caching ishlashining asosiy shartidir!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "KV Cache (Key-Value Cache)",
                "category": "LLM & RAG",
                "definitionUz": "Avtoregressiv generatsiya paytida oldingi tokenlarning har bir qatlamdagi $K$ va $V$ proyeksiyalarini xotirada saqlab qolib, har yangi qadamda faqat oxirgi 1 ta tokenni hisoblash mexanizmi.",
                "analogyOrExampleUz": "Matematikadan ko'p xonali sonni qo'shayotganda oldingi ustunlar yig'indisini boshidan sanamasdan, faqat dildagi qoldiqni yozib qo'yish.",
                "connectedTo": [
                    {
                        "targetTerm": "Scaled Dot-Product Attention ($Q, K, V$)",
                        "targetLessonId": "D06.2",
                        "relationshipUz": "Causal Mask tufayli oldingi tokenlarning $K$ va $V$ qiymatlari keyingi tokenlar qo'shilganda hech qachon o'zgarmaydi — aynan shu sababli ularni keshlash mumkin!"
                    }
                ]
            },
            {
                "term": "TTFT (Time To First Token) & ITL (Inter-Token Latency)",
                "category": "MLOps & Eval",
                "definitionUz": "TTFT — so'rov yuborilgandan 1-chi javob tokeni kelguncha o'tgan Prefill vaqti; ITL — keyingi har bir token orasidagi Decode kechikishi (`1000 / TPS` ms).",
                "analogyOrExampleUz": "Kran suvini ochish: TTFT — quvurdan birinchi tomchi tushguncha ketgan vaqt; ITL/TPS — suv oqa boshlagandan keyingi oqim tezligi.",
                "connectedTo": [
                    {
                        "targetTerm": "FastAPI Server-Sent Events (SSE) Streaming",
                        "targetLessonId": "D09.1",
                        "relationshipUz": "9-haftada foydalanuvchi 8 soniya to'liq javob tugashini kutib o'tirmasligi uchun SSE Streaming orqali 1-tokenni `TTFT = 350 ms` dayoq ekranga chiqaramiz!"
                    }
                ]
            },
            {
                "term": "PagedAttention & Continuous Batching (vLLM)",
                "category": "LLM & RAG",
                "definitionUz": "PagedAttention — KV Cache'ni OS sahifalari kabi bo'laklab VRAM isrofini <4% ga tushirish; Continuous Batching — batch ichida tugagan so'rov o'rniga har bir decode qadamida yangi so'rovni uzluksiz kiritish.",
                "analogyOrExampleUz": "Continuous Batching — restoranda 10 ta stoldan hamma bir vaqtda turib ketishini kutmasdan, bo'shagan bitta stolga darhol yangi mehmonni o'tqazish.",
                "connectedTo": [
                    {
                        "targetTerm": "Locust Load Testing & p95 SLA",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "10-haftada 20-50 ta parallel foydalanuvchi yuklama berganda Continuous Batching p95 latency'ni qanday ushlab turishini Locust bilan o'lchaymiz."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d07-3-int-1",
                "level": "Junior",
                "questionUz": "LLM generatsiyasida KV Cache nima uchun ishlatiladi va nima uchun faqat $K$ (Key) va $V$ (Value) keshlanadi-yu, $Q$ (Query) keshlanmaydi?",
                "interviewerIntentUz": "Self-Attention avtoregressiv qadamini chindan tushunganini tekshirish!",
                "strongAnswerUz": "$t$-qadamda yangi token generatsiya qilinayotganda bizga faqatgina o'sha oxirgi $t$-tokenning so'rov vektori **$q_t$** kerak bo'ladi! U oldingi barcha tokenlarning kalitlari ($k_1, k_2, \\dots, k_t$) bilan solishtiriladi va qiymatlari ($v_1, v_2, \\dots, v_t$) dan mazmun yig'adi. Oldingi qadamlardagi $q_1, \\dots, q_{t-1}$ vektorlari esa o'z ishini allaqachon tugatgan va keyingi qadamlarda boshqa hech qachon ishtirok etmaydi. Shu sababli faqat $K$ va $V$ matritsalarini keshlash kifoya — bu hisoblashni har qadamda $O(T^2)$ dan $O(T)$ ga tushiradi.",
                "redFlagUz": "'Q ham keshlanadi, shunchaki nomi qisqa bo'lishi uchun KV Cache deyilgan' deyish!",
                "followUpQuestionUz": "Savol: KV Cache tezlikni oshirsa, uning evaziga nimani qurbon qilamiz? Javob: **VRAM/RAM xotirasini!** Uzun kontekst va katta batch size'da KV Cache model og'irliklaridan ham ko'proq xotira yeb qo'yishi mumkin."
            },
            {
                "id": "d07-3-int-2",
                "level": "Middle",
                "questionUz": "LLM inferensida TTFT (Time To First Token) sekin bo'lsa muammo nimada, Decode (`tokens/sec`) sekin bo'lsa muammo nimada va har birini qanday optimallashtirasiz?",
                "interviewerIntentUz": "Prefill va Decode fazalarining apparat bottlenecklarini farqlay olishini sinash.",
                "strongAnswerUz": "1) **TTFT (Prefill)** — **Compute-bound** (parallel matritsa ko'paytmasi). TTFT sekin bo'lsa, kiruvchi prompt juda uzun (masalan, RAG 10,000 token tashlagan) yoki GPU FLOPs quvvati yetishmayapti. Yechim: **Prefix Caching** (System promptni keshlash), RAG kontekstini Reranker bilan Top-3 ga qisqartirish, FlashAttention-2 va Tensor Parallelism. 2) **Decode (`tok/s` / ITL)** — **Memory-bandwidth bound**. Decode sekin bo'lsa, har token uchun og'irliklarni xotiradan o'qish sekin kechyapti. Yechim: **4-bit/8-bit Kvantlash** (`Q4_K_M`, `AWQ`, `FP8`), **Speculative Decoding** va tezroq VRAMli GPU.",
                "redFlagUz": "'Ikkalasi ham bir xil narsa, faqat internet tezligiga bog'liq' deyish.",
                "followUpQuestionUz": "Savol: Foydalanuvchi 200 tokenlik javobni 10 soniyada to'liq ekranga chiqishini kutgandan ko'ra Streaming yoqilganda nega mamnun bo'ladi? Javob: Chunki Streaming jami vaqtni o'zgartirmasa ham, **Perceived Latency (TTFT)** ni 10 soniyadan `0.4 soniya`ga tushiradi va odam 20 tok/s tezlikda chiqayotgan matnni darhol o'qishni boshlaydi."
            },
            {
                "id": "d07-3-int-3",
                "level": "Senior / Production",
                "questionUz": "Static Batching bilan Continuous Batching (In-flight batching) hamda vLLM PagedAttention o'rtasidagi farqni tushuntirib bering.",
                "interviewerIntentUz": "Yuqori yuklamali LLM serving arxitekturasini chuqur bilishini sinash.",
                "strongAnswerUz": "**Static Batching**da 4 ta so'rov bitta batchga birlashtirilsa va 1-so'rov 20 ta tokenda tugasa, 4-so'rov esa 500 ta token yozsa — 1-so'rov foydalanuvchisi ham, u band qilgan GPU slot ham 500-token tugaguncha 480 qadam bekor kutib turadi (**Head-of-Line blocking**). **Continuous Batching** esa scheduling'ni so'rov darajasida emas, **har bir iteratsiya (1 token qadami) darajasida** bajaradi: 1-so'rov 20-tokenda `<EOS>` chiqarishi bilanoq darhol foydalanuvchiga qaytariladi va 21-qadamdayoq uning o'rniga navbatdagi yangi so'rov qo'shiladi. **PagedAttention** esa KV Cache xotirasini 16-tokenlik sahifalarga bo'lib, fragmentation isrofini 70% dan <4% ga tushiradi — bu esa Continuous Batching'ga bir vaqtda 5x ko'proq so'rovni VRAMga sig'dirish imkonini beradi.",
                "redFlagUz": "'vLLM faqat Python kodini C++ ga o'girgani uchun tez ishlaydi' deyish.",
                "followUpQuestionUz": "Savol: Prompt tuzishda Prefix Caching (Automatic Prefix Caching — APC) maksimal ishlashi uchun prompt qismlarini qanday tartibda joylashtirasiz? Javob: `[1. O'zgarmas System Prompt + Few-Shot Examples] -> [2. Umumiy Hujjat/Jadval Sxemasi] -> [3. Foydalanuvchining O'zgaruvchan Savoli]`. Agar o'zgaruvchan sana yoki `user_id` eng boshga qo'yilsa, prefix hash birinchi tokendayoq buziladi va kesh `0%` ishlaydi!"
            }
        ],
        "videos": [
            {
                "id": "vid-d07-3-en",
                "title": "Attention in Transformers & KV Projections Step-by-Step",
                "channel": "3Blue1Brown",
                "language": "en",
                "youtubeId": "eMlx5fFNoYc",
                "youtubeUrl": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
                "durationOrTimestamp": "Key va Value matritsalari qismi",
                "whatItExplainsUz": "Har bir token uchun Key va Value vektorlari qanday hosil bo'lishi va yangi token kelganda oldingi Key/Value'larga qanday murojaat qilinishi vizual ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, 1-amaliy misoldagi `kv_cache_size_mb` funksiyasida `seq_len` ni `4096` dan `32768` ga o'zgartirib xotira o'sishini hisoblang."
            },
            {
                "id": "vid-d07-3-ru",
                "title": "Как работает нейросеть: токены, контекст и скорость генерации",
                "channel": "Лысый из браузера",
                "language": "ru",
                "youtubeId": "ne8yL9l7W2E",
                "youtubeUrl": "https://www.youtube.com/watch?v=ne8yL9l7W2E",
                "durationOrTimestamp": "Kontekst va xotira bo'limi",
                "whatItExplainsUz": "Kontekst oynasi kattalashganda model xotirasi va birinchi javobgacha bo'lgan vaqt (TTFT) qanday o'zgarishi tushuntirilgan.",
                "howToUseVideoUz": "2-bosqichdagi TTFT, Decode TPS va p95 E2E benchmark kodini ishga tushirib ko'rsatkichlarni tahlil qiling."
            }
        ],
        "quiz": [
            {
                "id": "d07-3-q1",
                "promptUz": "1. Konseptual: Avtoregressiv LLM generatsiyasida nima uchun $K$ (Key) va $V$ (Value) vektorlari keshlanadi (KV Cache), ammo $Q$ (Query) keshlanmaydi?",
                "options": [
                    "Chunki Q har doim 0 ga teng",
                    "Chunki yangi tokenni generatsiya qilishda faqat oxirgi joriy tokenning Query ($q_t$) vektori oldingi barcha tokenlarning $K$ va $V$ vektorlari bilan solishtiriladi; eski $Q$ lar boshqa ishlatilmaydi",
                    "Chunki Q diskda saqlanadi",
                    "Q ham har doim keshlanadi"
                ],
                "correctIndex": 1,
                "explanationUz": "Causal Attention'da $t$-qadamda faqat $q_t$ barcha $K_{1..t}$ va $V_{1..t}$ larga murojaat qiladi."
            },
            {
                "id": "d07-3-q2",
                "promptUz": "2. Kod Tahlili: LLM benchmarkida `TTFT` (Time To First Token) va `ITL / TPS` (Decode Speed) mos ravishda qaysi bosqichlarni o'lchaydi?",
                "options": [
                    "Ikkalasi ham modelni internetdan yuklab olish vaqtini o'lchaydi",
                    "TTFT — kiruvchi promptni parallel qayta ishlash (Prefill) va 1-token chiqish vaqtini; TPS esa keyingi tokenlarning ketma-ket generatsiya (Decode) tezligini o'lchaydi",
                    "TTFT — disk hajmini, TPS — CPU haroratini o'lchaydi",
                    "Faqat oxirgi token vaqtini o'lchaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "TTFT Prefill (Compute-bound) samaradorligini, Decode TPS esa Memory-bandwidth bound generatsiya tezligini ko'rsatadi."
            },
            {
                "id": "d07-3-q3",
                "promptUz": "3. Production Debugging: Prefix Caching (Automatic Prefix Caching) maksimal foyda berishi uchun prompt qanday tartibda tuzilishi shart?",
                "options": [
                    "Har safar o'zgaradigan vaqt tamg'asi (`timestamp`) va foydalanuvchi savolini eng boshiga, System Prompt'ni oxiriga qo'yish",
                    "O'zgarmas qismni (System Prompt, qoidalar, few-shot misollar) promptning ENG BOSHIGA, o'zgaruvchan foydalanuvchi savolini esa ENG OXIRIGA qo'yish",
                    "Har bir so'rovda so'zlarni tasodifiy aralashtirish",
                    "System Prompt'ni o'chirib tashlash"
                ],
                "correctIndex": 1,
                "explanationUz": "Causal KV Cache faqat boshidan boshlab aynan bir xil bo'lgan tokenlar zanjirini (prefix) qayta ishlata oladi."
            }
        ]
    }
}
