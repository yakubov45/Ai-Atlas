
AI Knowledge Base Obsidian Audit
Sun'iy Intellekt Muhandisligi Bilimlar Bazasi: Chuqur Ilmiy Tadqiqot va Obsidian Auditi Hisoboti
Ushbu hisobot sizning Obsidian bilimlar bazangiz (AI Map.md va unga bog'liq mavzular) uchun birlamchi ilmiy manbalar asosida o'tkazilgan texnik tekshiruv, xatolarni tuzatish, matematik asoslash va kanonik konspektlar to'plamini taqdim etadi. Ishchi muhit tekshirilganda mavjud .md fayllar yuklanmaganligi aniqlandi (Content not provided). Shu sababli, qat'iy ilmiy halollik qoidalariga muvofiq, mavjud matnlarni soxta audit qilishdan voz kechildi va barcha so'ralgan A–H bo'limlari bo'yicha birlamchi ilmiy maqolalar (Tier 1) hamda tasdiqlangan o'quv manbalari (Tier 3) asosida yangidan tekshirilgan, uch darajali (Beginner, Intermediate, Advanced) kanonik Obsidian hujjatlari ishlab chiqildi.

Tadqiqot jarayonida bilimlar bazasi arxitekturasidagi asosiy dublikatlar — xususan, Model Training va Mathematics for Deep Learning bo'limlarida takrorlangan Gradient Descent hamda Gradient Descent (Math) mavzulari yagona kanonik konspektga birlashtirildi. Shuningdek, chuqur o'rganishdagi ko'p uchraydigan noto'g'ri tushunchalar (masalan, 1998-yilgi LeNet-5 da ReLU, parametrsiz Max-Pooling va Softmax ishlatilgan degan xato qarash, original 1997-yilgi LSTM arxitekturasida Forget Gate bo'lgan degan da'vo, Adam optimizatorida L_2 regulyarizatsiya va Weight Decay ekvivalent degan xulosa hamda Batch Normalization faqat Internal Covariate Shift ni kamaytirish orqali yolg'iz o'zi 14 baravar tezlanish beradi degan bir yoqlama izoh) birlamchi manbalar yordamida ilmiy jihatdan tuzatildi. Manba matni to'liq tekshirilmagan (faqat bibliografik metama'lumotlari tasdiqlangan) yoki birlamchi manbalar bilan qamrab olinmagan qismlar esa qat'iy manba siyosatiga binoan aniq Tasdiqlanmagan maqomi bilan belgilandi.

1. Deliverable A — AI_Research_Audit.md
Ishchi katalogda foydalanuvchi tomonidan yuklangan .md fayllar mavjud emasligi sababli (Content not provided), quyidagi jadvalda so'ralgan barcha 39 ta mavzu (markaziy AI Map.md bilan birga) bo'yicha inventarizatsiya, aniqlangan konseptual xavflar, dublikatlar va tavsiya etilgan arxitekturaviy qarorlar keltirilgan.

Bo'lim

Mavzu (Fayl nomi)

Mavjud fayl holati

Aniqlik va Manba maqomi

Aniqlangan muammolar, dublikatlar va xavflar

Tavsiya etilgan amal

Qo'llab-quvvatlovchi manbalar

Root

AI Map.md

Content not provided

Verified (Yangi MOC)

Markaziy xarita barcha kanonik konspektlarni bog'lashi va dublikat havolalarni bartaraf etishi shart.

Expand / Update


A. Fundamentals

Artificial Intelligence.md

Content not provided

Partially Verified / Tasdiqlanmagan (Tarixiy qism)

Qo'lda yozilgan qoidalar va statistik/neyron o'rganish farqi ko'pincha chalkashtiriladi; ilk tarixiy sanalar joriy manbalarda yo'q (Tasdiqlanmagan).

Create / Expand


A. Fundamentals

Machine Learning.md

Content not provided

Verified

Supervised, unsupervised va online/stochastic o'rganish farqlari aniq matematik funksiyalar bilan ifodalanishi lozim.

Create / Expand


A. Fundamentals

Deep Learning.md

Content not provided

Verified

Qo'lda yasalgan (hand-crafted) belgilar va end-to-end representation learning farqi ko'rsatilishi kerak.

Create / Expand


B. LLMs

LLM.md

Content not provided

Verified

Auto-regressive keyingi tokenni bashorat qilish mexanizmi va o'qitish/generatsiya bosqichlari ajratilishi zarur.

Create / Expand


B. LLMs

Transformers.md

Content not provided

Verified

Original 2017-yilgi Encoder-Decoder arxitekturasi va keyingi GPT/ViT modellari farqlanishi shart.

Create / Correct


B. LLMs

Embeddings.md

Content not provided

Verified

Statik so'z vektorlari va attention orqali boyitilgan kontekstual embeddinglar farqi tushuntirilishi kerak.

Create / Expand


B. LLMs

Tokenization.md

Content not provided

Partially Verified / Tasdiqlanmagan (BPE ichki qadamlari)

Sennrich et al. (2015) bibliografiyasi va token tushunchasi tasdiqlangan; BPE ichki algoritmik qadamlari to'liq matn ko'rilmagani uchun Tasdiqlanmagan.

Create / Expand


B. LLMs

Prompt Engineering.md

Content not provided

Partially Verified / Tasdiqlanmagan

Kontekstual attention yangilanishi va ReAct bibliografiyasi mavjud, ammo maxsus prompt texnikalari uchun to'liq birlamchi matn yo'q (Tasdiqlanmagan).

Create / Expand


C. Agents & RAG

AI Agent.md

Content not provided

Partially Verified / Tasdiqlanmagan

Agentik tizimlar va ReAct (Yao et al., 2022) bibliografiyasi tasdiqlangan; ichki qadamlarning to'liq matni ko'rilmagani uchun Tasdiqlanmagan.

Create / Expand


C. Agents & RAG

RAG.md

Content not provided

Partially Verified / Tasdiqlanmagan

Lewis et al. (2020) bibliografiyasi tasdiqlangan; ichki RAG tenglamalari va chunking/reranking parametrlari to'liq matn yo'qligi bois Tasdiqlanmagan.

Create / Expand


C. Agents & RAG

Memory.md

Content not provided

Verified (Neyron qism) / Tasdiqlanmagan (Ilova qismi)

RNN/LSTM qisqa muddatli aktivatsiyalari va uzoq muddatli vaznlar farqi Hochreiter & Schmidhuber (1997) asosida to'liq tasdiqlangan.

Create / Correct


C. Agents & RAG

Tools.md

Content not provided

Partially Verified / Tasdiqlanmagan

Yao et al. (2022) ReAct bibliografiyasi mavjud; tool execution va JSON sxemalari to'liq matn yo'qligi sababli Tasdiqlanmagan.

Create / Expand


D. Architectures

CNN.md

Content not provided

Verified

LeNet-5 da zamonaviy Max-Pooling, ReLU va Softmax emas, balki o'rganiladigan subsampling, squashing funksiya va RBF ishlatilgan.

Create / Correct


D. Architectures

RNN.md

Content not provided

Verified

Vaqt bo'yicha ketma-ket hisoblash va vanishing/exploding gradient muammosining matematik sababi ko'rsatilishi kerak.

Create / Expand


D. Architectures

LSTM.md

Content not provided

Verified

Constant Error Carousel (CEC), w_{jj}=1.0, Input va Output darvozalari (original 1997-yilgi maqolada Forget Gate yo'q).

Create / Correct


E. Training

Gradient Descent.md

Content not provided

Verified

Gradient Descent (Math) bilan dublikat. Yagona kanonik konspektga birlashtirilishi shart.

Merge (Canonical)


E. Training

Backpropagation.md

Content not provided

Verified

Ko'p chiqishli tarmoqlarda barcha keyingi tugunlar bo'yicha hosilalar yig'indisi olinishi va finite-difference tekshiruvi.

Create / Correct


E. Training

Learning Rate.md

Content not provided

Verified

Step-size chegaralari, 1/\sqrt{t} pasayish (decay), cyclical learning rates va BN-x5 da 5 baravar oshirish.

Create / Expand


E. Training

Loss Functions.md

Content not provided

Verified

Xatolik funksiyasi E_p = D(D_p, F(Z_p, W)), kvadratik masofa, L_2 regulyarizatsiyalangan logistik regressiya va global yo'qotish.

Create / Expand


E. Training

Optimizers.md

Content not provided

Verified

SGD, Momentum, AdaGrad, RMSProp, Adam, AdaMax va AdamW algoritmlarining tizimli taqqoslanishi.

Create / Expand


E. Training

Batch Normalization.md

Content not provided

Verified

Mini-batch statistikasi (training) va populyatsiya statistikasi (inference) farqi; \gamma, \beta parametrlari; oldingi qatlam bias (b) ning bekor bo'lishi.

Create / Correct


F. Mathematics

Math for Deep Learning.md

Content not provided

Verified

Chiziqli algebra, matematik analiz, ehtimollar nazariyasi va optimallashtirishning neyron tarmoqlardagi o'rni.

Create / Expand


F. Mathematics

Vector.md

Content not provided

Verified

Dot product (q \cdot k), birlik vektorlar (e_k), L_2 va L_\infty normalari.

Create / Expand


F. Mathematics

Matrix.md

Content not provided

Verified

Vazn matritsalari (W), Query/Key/Value (Q, K, V) proyeksiyalari va diagonal hosila matritsalari.

Create / Expand


F. Mathematics

Matrix Operations.md

Content not provided

Verified

Matritsalarni ko'paytirish, transponirlash (Q K^T) va chiziqli proyeksiyalar.

Create / Expand


F. Mathematics

Tensor.md

Content not provided

Verified

Ko'p o'lchamli massivlar va GPU da parallel hisoblash.

Create / Expand


F. Mathematics

Hosila.md

Content not provided

Verified

Bir o'zgaruvchili funksiya hosilasi (f'(x)), logistik sigmoid hosilasi va to'yinish (saturation).

Create / Expand


F. Mathematics

Gradient.md

Content not provided

Verified

Xususiy hosilalar vektori \nabla f_t(\theta_t), gradient normasi va masshtabga nisbatan invariantlik.

Create / Expand


F. Mathematics

Partial Derivative.md

Content not provided

Verified

Yo'qotish funksiyasining har bir parametr va aktivatsiya bo'yicha xususiy hosilasi.

Create / Expand


F. Mathematics

Chain Rule.md

Content not provided

Verified

Murakkab funksiyalar hosilasi, tarmoqlangan hisoblash graflarida yo'llar yig'indisi va vaqt bo'yicha ko'paytma.

Create / Expand


F. Mathematics

Probability.md

Content not provided

Verified

Softmax ehtimollik taqsimoti, tasodifiy o'zgaruvchilar va generativ ehtimolliklar.

Create / Expand


F. Mathematics

Mean.md

Content not provided

Verified

Matematik kutilma E[x], mini-batch o'rtacha qiymati va eksponensial sirpanuvchi o'rtacha (1st moment m_t).

Create / Expand


F. Mathematics

Standard Deviation.md

Content not provided

Verified

Dispersiya \text{Var}[x], standart chetlanish, ikkinchi markazlashmagan moment v_t va \sqrt{d_k} masshtablash.

Create / Expand


F. Mathematics

Gradient Descent (Math).md

Content not provided

Verified (Merged)

Gradient Descent.md bilan dublikat. Yagona [[Gradient Descent]] kanonik fayliga yo'naltiriladi (alias).

Merge into [[Gradient Descent]]


F. Mathematics

SGD.md

Content not provided

Verified

Mini-batch stoxastik gradient bahosi, momentum va L_2 regulyarizatsiyaning SGD dagi ekvivalentligi (SGDW).

Create / Expand


F. Mathematics

Adam.md

Content not provided

Verified

1- va 2-tartibli momentlar (m_t, v_t), bias correction (\hat{m}_t, \hat{v}_t), SNR (m_t/\sqrt{v_t}), O(\sqrt{T}) regret va AdamW.

Create / Correct


G. Architecture & KM

Atomic Note.md

Content not provided

Partially Verified / Tasdiqlanmagan

Obsidian strukturasi so'rov talablari asosida loyihalandi; tashqi Zettelkasten adabiyoti joriy to'plamda yo'q (Tasdiqlanmagan).

Create (Framework)


G. Architecture & KM

Production-[span_9](start_span)[span_9](end_span)[span_11](start_span)[span_11](end_span)[span_13](start_span)[span_13](end_span)Ready ML Loyihasi Tuzilmasi.md

Content not provided

Partially Verified / Tasdiqlanmagan

nanoGPT kabi minimal modul tuzilmasi (~300 qator model + ~300 qator training) tasdiqlangan; kengaytirilgan MLOps vositalari Tasdiqlanmagan.

Create (Qualified)


G. Architecture & KM

Real Production ML Pipeline Arxitektura va Ish Jarayoni.md

Content not provided

Partially Verified / Tasdiqlanmagan

Ko'p modulli Graph Transformer Networks (bank cheklarini o'qish tizimi) tasdiqlangan; zamonaviy CI/CD MLOps qismi Tasdiqlanmagan.

Create (Qualified)


H. Resources

Usefull Youtube videos.md

Content not provided

Verified

3Blue1Brown va Andrej Karpathy videolarining aniq URL, sarlavha va maqsadlari tekshirildi.

Create / Verify


Asosiy Ilmiy Tuzatishlar (Fact-Checking Corrections)
Da'vo 1 (CNN / LeNet-5):
Noto'g'ri tushuncha: "LeNet-5 (1998) arxitekturasi zamonaviy CNNlar kabi parametrsiz Max-Pooling, ReLU aktivatsiya funksiyasi, to'liq bog'langan (fully connected) C3 qatlami hamda Softmax chiqishidan foydalanadi."
To'g'rilangan ilmiy fakt: LeCun et al. (1998) tomonidan yaratilgan original LeNet-5 arxitekturasida parametrsiz Max-Pooling emas, balki 4 ta qiymatni qo'shib, o'rganiladigan (trainable) koeffitsiyentga ko'paytiruvchi va o'rganiladigan bias qo'shib, sigmasimon (squashing) funksiyadan o'tkazuvchi Spatial Subsampling (S2 da 12 ta, S4 da 32 ta parametr) ishlatilgan. Bundan tashqari, C3 qatlami S2 dagi barcha 6 ta xarita bilan to'liq bog'lanmagan (to'liq bog'langandagi 2,416 ta parametr o'rniga 60 ta aloqa orqali 1,516 ta parametr ishlatilgan), chiqish qatlamida esa Softmax emas, balki 7x12 o'lchamli belgi bitmaplaridan olingan \pm 1 prototiplarga nisbatan kvadratik masofani hisoblovchi RBF birliklari qo'llanilgan.
Manba: LeCun et al., Proceedings of the IEEE, 1998.
Da'vo 2 (LSTM):
Noto'g'ri tushuncha: "Hochreiter va Schmidhuber (1997) tomonidan taqdim etilgan original LSTM arxitekturasi 3 ta darvoza — Input Gate, Forget Gate va Output Gate dan iborat."
To'g'rilangan ilmiy fakt: 1997-yilgi original LSTM maqolasida faqat Constant Error Carousel (CEC) (chiziqli birlik f_j(x)=x va o'z-o'ziga qat'iy w_{jj}=1.0 vaznli bog'lanish) hamda ikkita ko'paytiruvchi birlik — Input Gate (\text{in}_j) va Output Gate (\text{out}_j) kiritilgan: s_{c_j}(t) = s_{c_j}(t-1) + y^{\text{in}_j}(t) g(\text{net}_{c_j}(t)). Original 1997-yilgi maqolada Forget Gate mavjud bo'lmagan.
Manba: Hochreiter & Schmidhuber, Neural Computation, 9(8):1735–1780, 1997.
Da'vo 3 (Adam va Weight Decay):
Noto'g'ri tushuncha: "L_2 regulyarizatsiya va Weight Decay barcha optimizatorlarda, jumladan Adam da ham matematik jihatdan bir xil."
To'g'rilangan ilmiy fakt: Loshchilov va Hutter (2017/2019) isbotlaganidek (Proposition 1 va Proposition 2), L_2 regulyarizatsiya va Weight Decay faqat standart SGD uchun ekvivalentdir (bunda ham L_2 koeffitsiyenti \lambda' = \lambda / \alpha orqali o'rganish tezligiga bog'lanib qoladi). Adaptiv gradient usullarida (masalan, Adam) L_2 regulyarizatsiya qo'llanilganda, regulyarizator gradienti ham tarixiy gradient magnitudalari bilan birga moslashtiriladi (scaled). Natijada, katta gradientga ega bo'lgan vaznlar kutilganidan kamroq regulyarizatsiya qilinadi. Shu bois vaznlarning so'nishini gradient yangilanishidan ajratish (Decoupled Weight Decay — AdamW) talab etiladi: \theta_{t+1} = (1 - \lambda)\theta_t - \alpha M_t \nabla f_t(\theta_t).
Manba: Loshchilov & Hutter, ICLR 2019 (arXiv:1711.05101).
Da'vo 4 (Batch Normalization tezlanish sababi va 14x da'vosi):
Noto'g'ri tushuncha: "Batch Normalization yolg'iz o'zi har qanday tarmoqni 14 marta tezlashtiradi va bu faqat Internal Covariate Shift kamayishi tufayli yuz beradi."
To'g'rilangan ilmiy fakt: Ioffe va Szegedy (2015) tajribasida oddiy Inception tarmog'iga faqat Batch Normalization qo'shilganda, 72.2% single-crop aniqlikka erishish qadamlari 31.0 milliondan 13.3 millionga qisqargan. Mashhur "14 marta kam qadam" (2.1 million qadam) natijasiga esa BN-x5 retseptida — ya'ni BN bilan birgalikda boshlang'ich learning rate ni 5 baravar oshirish, Dropout ni olib tashlash, L_2 vazn jarimasini 5 baravar kamaytirish va learning rate decay ni 6 baravar tezlashtirish kabi qo'shimcha o'zgarishlar bilan erishilgan. Shuningdek, "Internal Covariate Shift"ning kamayishi tezlanishning yagona sababi ekanligi keyingi ilmiy ishlarda munozarali deb topilgan.
Manba: Ioffe & Szegedy, ICML 2015 (PMLR 37:448–456, arXiv:1502.03167).
2. Deliverable C — AI Map.md (Yangilangan Markaziy Xarita)
Quyidagi Markdown hujjati Obsidian omboringizning markaziy xaritasi (AI Map.md) hisoblanadi. Barcha mavzular yagona kanonik fayl nomlariga [[Wikilink]] orqali bog'langan.

tags:

moc
ai
knowledge-base aliases:
AI MOC
Artificial Intelligence Map status: verified level: beginner-to-advanced last_verified: 2026-11-14
AI Map — Sun'iy Intellekt Muhandisligi Bilimlar Bazasi
Ushbu markaziy xarita (Map of Content) Sun'iy Intellekt, Machine Learning, Deep Learning va zamonaviy LLM muhandisligi bo'yicha tekshirilgan kanonik konspektlarni o'zaro bog'laydi.

A. Artificial Intelligence Fundamentals
[[Artificial Intelligence]]
[[Machine Learning]]
[[Deep Learning]]
B. Large Language Models (LLMs)
[[LLM]]
[[Transformers]]
[[Embeddings]]
[[Tokenization]]
[[Prompt Engineering]]
C. AI Agents and Retrieval
[[AI Agent]]
[[RAG]]
[[Memory]]
[[Tools]]
D. Deep Learning Architectures
[[CNN]]
[[RNN]]
[[LSTM]]
E. Model Training
[[Gradient Descent]] (Matematik va muhandislik qismlarini birlashtirgan kanonik konspekt)
[[Backpropagation]]
[[Learning Rate]]
[[Loss Functions]]
[[Optimizers]]
[[Batch Normalization]]
F. Mathematics for Deep Learning
Mathematical Foundations
[[Math for Deep Learning]]
Linear Algebra
[[Vector]]
[[Matrix]]
[[Matrix Operations]]
[[Tensor]]
Calculus
[[Hosila]]
[[Gradient]]
[[Partial Derivative]]
[[Chain Rule]]
Probability and Statistics
[[Probability]]
[[Mean]]
[[Standard Deviation]]
Optimization
[[Gradient Descent]] (Alias: Gradient Descent (Math))
[[SGD]]
[[Adam]]
G. Software Architecture and Knowledge Management
[[Atomic Note]]
[[Production-Ready ML Loyihasi Tuzilmasi]]
[[Real Production ML Pipeline Arxitektura va Ish Jarayoni]]
H. Additional Learning Resources
[[Usefull Youtube videos]]
3. Deliverable B — Takomillashtirilgan va Tekshirilgan Obsidian Konspektlari
Quyida so'ralgan har bir bo'lim bo'yicha to'liq, Obsidian uchun tayyor konspektlar keltirilgan. Har bir konspekt uch darajali (1-daraja: Intuitiv/Boshlang'ich, 2-daraja: O'rta/Arxitekturaviy, 3-daraja: Yuqori/Matematik va Production) tushuntirish uslubida yozilgan.

Bo'lim A: Artificial Intelligence Fundamentals
Fayl: Artificial Intelligence.md
tags:

ai
fundamentals aliases:
AI
Sun'iy Intellekt status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Artificial Intelligence
1. Qisqacha ta'rif
Artificial Intelligence (AI) — murakkab axborotni qayta ishlash, belgilarni tanib olish, tabiiy tilni tahlil qilish va qaror qabul qilish kabi intellektual vazifalarni bajaruvchi hisoblash tizimlarini yaratishga qaratilgan kompyuter fanlari sohasi.

2. Nima uchun kerak?
An'anaviy dasturlashda muhandis barcha qoidalarni va xususiyatlarni oldindan qo'lda yozib chiqishi shart. Ammo qo'lyozma hujjatlarni o'qish yoki tabiiy tildagi matnlarni tarjima qilish kabi vazifalarda shakl va kontekst o'zgaruvchanligi (variability) juda yuqori bo'lib, ularni qo'lda yasalgan qoidalar (hand-crafted rules/features) bilan to'liq qamrab olish qiyin. AI tizimlari ushbu murakkablikni avtomatlashtirilgan algoritmlar va ma'lumotlardan o'rganish orqali hal qiladi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Tasavvur qiling, siz bank cheklaridagi qo'lyozma raqamlarni o'qiydigan dastur tuzmoqchisiz. Har bir inson "3" yoki "7" raqamini turlicha qiyalik va o'lchamda yozadi. Agar siz har bir chiziq va burchak uchun qat'iy mantiqiy qoidalarni qo'lda tuzib chiqsangiz, bu klassik qoidalarga asoslangan (Symbolic / Hand-Crafted) yondashuv bo'ladi. Agar tizimga minglab tayyor chek namunalarini ko'rsatib, muhim belgilarni piksellardan o'zi o'rganishiga imkon bersangiz, bu [[Machine Learning]] va [[Deep Learning]] ga asoslangan zamonaviy AI hisoblanadi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
Sun'iy intellekt tizimlari tarixiy va arxitekturaviy jihatdan ikki yirik yondashuvga ajratiladi:

Symbolic AI va Hand-Crafted Features: Tizim ekspertlar tomonidan oldindan belgilangan qoidalar va qo'lda yasalgan belgilar ustida ishlaydi. Masalan, LeCun et al. (1998) ta'kidlaganidek, an'anaviy hujjatlarni tanib olish tizimlari alohida-alohida qo'lda sozlangan modullardan (maydonni ajratish, segmentatsiya, belgini tanish va til modeli) iborat bo'lgan.
Statistical Learning va Connectionist (Neyron) yondashuv: Tizim minimal ishlov berilgan xom ma'lumotlardan (masalan, piksellar yoki matn tokenlaridan) ichki tasvirlarni (internal representations) gradientga asoslangan o'rganish orqali o'zi shakllantiradi.
AI, ML, DL va Generative AI o'rtasidagi munosabat
[[Artificial Intelligence]]: Eng keng tushuncha bo'lib, ham qoidalarga asoslangan, ham ma'lumotlardan o'rganuvchi tizimlarni o'z ichiga oladi.
[[Machine Learning]]: AI ning qismi bo'lib, ma'lumotlar ustida xatolik funksiyasini minimallashtiruvchi algoritmlardir.
[[Deep Learning]]: ML ning qismi bo'lib, ko'p qatlamli neyron tarmoqlar va [[Backpropagation]] yordamida ichki belgilarni (representations) avtomatik o'rganadi.
Generative AI: [[Deep Learning]] (xususan, [[Transformers]] va [[LLM]]) ustiga qurilgan, ketma-ketliklar yoki tasvirlarni yangidan generatsiya qiluvchi (masalan, auto-regressive) tizimlardir.
5. Matematik va Arxitekturaviy Asoslari (Level 3 — Advanced)
LeCun et al. (1998) bo'yicha, o'rganuvchi AI tizimi kirish namunasi Z_p ni o'rganiladigan parametrlar W yordamida bashorat Y_p = F(Z_p, W) ga akslantiradi. Murakkab ko'p modulli tizimlarda (masalan, Graph Transformer Networks da) har bir modulni alohida sozlash o'rniga, barcha modullar yo'naltirilgan graf sifatida birlashtirilib, global unumdorlik o'lchovi (global loss function) bo'yicha gradient yordamida birgalikda optimallashtiriladi.

Izoh (Manba maqomi): Qo'lda yasalgan belgilar va gradientga asoslangan connectionist yondashuvlar farqi LeCun et al. (1998) va Rumelhart et al. (1986) asosida tasdiqlangan; ammo Symbolic AI ning 1950–1970-yillardagi tarixiy konferensiyalari tafsilotlari joriy manbalar to'plamida mavjud emasligi sababli Tasdiqlanmagan deb belgilandi.

6. Ko'p uchraydigan xatolar va yanglish tushunchalar
Xato 1: "Qo'lda yasalgan belgilar (hand-crafted features) har doim xom ma'lumotlardan o'rganishdan ustun." — LeCun et al. (1998) yetarli ma'lumot va hisoblash quvvati bo'lganda piksellardan bevosita o'rganilgan belgilar ([[CNN]]) qo'lda yasalgan usullardan ustun kelishini ko'rsatdi.
Xato 2: "Neyron tarmoqlardagi neyronlar miya hujayrasining aniq biologik nusxasidir." — Yo'q, 3Blue1Brown ta'kidlaganidek, sun'iy neyron shunchaki raqamli qiymatni (activation, masalan, 0 va 1 orasidagi sonni) saqlovchi hisoblash birligidir.
7. Real-world applications
Bank cheklari va hujjatlarni avtomatik o'qish tizimlari (kuniga millionlab cheklarni qayta ishlagan tijoriy GTN/LeNet tizimlari).
Mashina tarjimasi va sintaktik tahlil (English constituency parsing).
Vizual qidiruv, tibbiy tasvirlar tahlili va agentik hujjat qayta ishlash tizimlari.
8. Bog'liq tushunchalar
Oldin o'rganish:

[[Math for Deep Learning]]
Keyingi mavzular:

[[Machine Learning]]
[[Deep Learning]]
Bog'liq:

[[LLM]]
[[AI Agent]]
9. Tekshirilgan manbalar
LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). Gradient-Based Learning Applied to Document Recognition. Proceedings of the IEEE, 86(11), 2278–2324. DOI: 10.1109/5.726791.
Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323, 533–536. DOI: 10.1038/323533a0.
Sanderson, G. [3Blue1Brown]. (2017). But what is a neural network? | Deep learning, chapter 1. YouTube. https://www.youtube.com/watch?v=aircAruvnKk
Fayl: Machine Learning.md
tags:

ai
machine-learning
fundamentals aliases:
ML
Mashinali o'rganish status: verified level: beginner-to-advanced last_verified: 2026-11-14
Machine Learning
1. Qisqacha ta'rif
Machine Learning (ML) — kompyuter tizimlariga aniq qoidalar yozmasdan, o'quv ma'lumotlari (training data) ustida xatolik funksiyasini minimallashtirish orqali murakkab qaror qabul qilish sirtlarini (decision surfaces) sintez qilish va yangi ma'lumotlar bo'yicha bashorat berish imkonini yaratuvchi algoritmlar sohasi.

2. Nima uchun kerak?
Yuqori o'lchamli kirish ma'lumotlarida (masalan, 28x28 o'lchamli tasvirdagi 784 ta pikselda) kirish va chiqish o'rtasidagi bog'liqlikni inson qo'lda formula ko'rinishida yoza olmaydi. LeCun et al. (1998) ko'rsatganidek, arxitektura vazifaga mos tanlanganda, gradientga asoslangan mashinali o'rganish minimal dastlabki ishlov berish (minimal preprocessing) bilan yuqori o'lchamli kirishlar uchun murakkab klassifikatorlarni qura oladi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Yosh bolaga raqamlarni tanishni o'rgatganda, unga murakkab geometrik formulalarni yodlatmaysiz. Unga ko'plab raqam namunalarini ko'rsatib, to'g'ri javobni aytasiz. Bola xato qilsa, tuzatasiz va u asta-sekin muhim belgilarni o'zi ajratib oladi. Machine Learning ham xuddi shunday: modelga kirish namunasi (Z_p) va kerakli javob (D_p) beriladi, model esa o'zining ichki parametrlarini (W) xatolarni kamaytirish uchun moslashtiradi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
Mashinali o'rganish vazifalari va algoritmlari quyidagi yo'nalishlarda qo'llaniladi:

Supervised Learning (Nazorat ostida o'rganish): Har bir kirish namunasi Z_p uchun aniq kerakli javob (desired label) D_p beriladi. Qo'lyozma raqamlarni tasniflash (MNIST), L_2-regulyarizatsiyalangan ko'p sinfli logistik regressiya, Support Vector Machines (SVM), k-Nearest Neighbors (kNN) va Multilayer Perceptron (MLP) bunga misol bo'ladi.
Unsupervised / Self-Supervised Representation Learning: Maxsus qo'lda belgilangan sinf yorliqlarisiz ma'lumotlarning taqsimlangan vektor tasvirlarini o'rganish (masalan, Mikolov et al., 2013 dagi Skip-gram va negative sampling yordamida iboralar vektorlarini o'rganish yoki [[LLM]] larda keyingi tokenni bashorat qilish).
Online va Stochastic Learning: Ma'lumotlar oqimi yoki mini-batchlar ustida nostatsionar (non-stationary) maqsad funksiyalarini ketma-ket optimallashtirish (Kingma & Ba, 2015).
(Eslatma: Reinforcement Learning — muhitda mukofot signali asosida harakat siyosatini o'rganish paradigmasi bo'lib, uning maxsus Bellman tenglamalari joriy birlamchi manbalar to'plamida keltirilmagani sababli Tasdiqlanmagan deb qayd etiladi; agentik harakat va mulohaza integratsiyasi uchun [[AI Agent]] ga qarang).

5. Matematik asoslari (Level 3 — Advanced)
LeCun et al. (1998) formallashtirganidek, gradientga asoslangan ML tizimi quyidagi matematik komponentlardan tashkil topadi:

Model funksiyasi: Y_p = F(Z_p, W) Bu yerda:
Z_p — p-chi kirish namunasi (input pattern),
W — barcha o'rganiladigan parametrlar (weights) to'plami,
Y_p — modelning bashorati (predicted label/output).
Namuna bo'yicha xatolik funksiyasi (Per-sample Loss): E_p = D\left(D_p, F(Z_p, W)\right) Bu yerda D_p — kerakli (desired) chiqish, D(\cdot, \cdot) esa bashorat va haqiqiy qiymat o'rtasidagi tafovutni o'lchovchi funksiya ([[Loss Functions]]).
Amaliy cheklovlar va Generalization: LeCun et al. (1998) ta'kidlaganidek, katta va yuqori o'lchamli real vazifalarda klassifikator tanlashda faqatgina umumiy xatolik foizi emas, balki o'qitish vaqti (training time), xotira sarfi (memory usage) va tasniflash tezligi (classification time) hal qiluvchi cheklov bo'lib xizmat qiladi. Shuningdek, o'quv va test ma'lumotlari taqsimoti o'zgarganda (covariate shift) model aniqligi pasayadi.
6. Amaliy misol va Python kodi
Quyidagi illyustrativ misolda NumPy yordamida oddiy chiziqli modelning Y_p = F(Z_p, W) bashorati va kvadratik xatoligi hisoblanishi ko'rsatilgan (Eslatma: Kod o'quv maqsadida keltirilgan, ishchi muhitda bajarilmagan):python import numpy as np

1. Kirish ma'lumotlari (3 ta namuna, 2 ta belgi/feature) - Shape: (3, 2)
Z = np.array([[1.0, 2.0], [2.0, 1.0], [3.0, 4.0]])

Haqiqiy nishon qiymatlar (desired targets D_p) - Shape: (3, 1)
D_target = np.array([[5.0], [4.0], [11.0]])

2. Parametrlar (Weights W) - Shape: (2, 1)
W = np.array([[1.0], [2.0]])

3. Forward pass: Y = Z @ W - Shape: (3, 1)
Y_pred = Z @ W

4. O'rtacha kvadratik xatolik (Discrepancy E_p)
loss = np.mean((D_target - Y_pred) 2) print("Bashoratlar:\n", Y_pred) print("O'rtacha kvadratik xatolik (Loss):", loss)

Kutilgan natija: Y_pred = [[5.], [4.], [11.]], Loss = 0.0
## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Artificial Intelligence]]
- [[Vector]]
- [[Matrix]]
- [[Probability]]

**Keyingi mavzular:**
- [[Deep Learning]]
- [[Loss Functions]]
- [[Gradient Descent]]

**Bog'liq:**
- [[SGD]]
- [[Adam]]

## 8. Tekshirilgan manbalar
- LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). *Gradient-Based Learning Applied to Document Recognition*. Proceedings of the IEEE, 86(11), 2278–2324. DOI: 10.1109/5.726791.
- Kingma, D. P., & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. ICLR 2015. arXiv:1412.6980.
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*. ICML 2015, PMLR 37:448–456.

Fayl: Deep Learning.md
tags:

ai
deep-learning
fundamentals aliases:
DL
Chuqur o'rganish status: verified level: beginner-to-advanced last_verified: 2026-11-14
Deep Learning
1. Qisqacha ta'rif
Deep Learning (Chuqur o'rganish) — [[Machine Learning]] ning maxsus yo'nalishi bo'lib, ko'p qatlamli (multilayer) sun'iy neyron tarmoqlar va [[Backpropagation]] algoritmi yordamida xom ma'lumotlardan vazifaga mos ichki tasvirlarni (internal representations / features) avtomatik ravishda o'rganadi.

2. Nima uchun kerak?
Rumelhart, Hinton va Williams (1986) ta'kidlaganidek, Perceptron convergence procedure kabi ilk oddiy usullar foydali yangi ichki belgilarni (features) yarata olmagan. Deep Learning yashirin qatlamlar (hidden layers) orqali kirish va chiqish o'rtasida murakkab abstrakt tasvirlarni avtomatik shakllantiradi; buning uchun yashirin birliklarga qo'lda nishon (target) berish shart emas, ular chiqish xatoligini kamaytirish jarayonida o'z-o'zidan shakllanadi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
3Blue1Brown (Grant Sanderson, 2017) tushuntirgan qo'lyozma raqamlarni tanish tarmog'ini ko'rib chiqaylik:

Input Layer (Kirish qatlami): 28x28 o'lchamli kulrang tasvirdagi har bir piksel uchun bittadan — jami 784 ta neyron mavjud. Har bir neyron piksel yorqinligini (0.0 — qora, 1.0 — oq) bildiruvchi sonni (activation) ushlab turadi.
Hidden Layers (Yashirin qatlamlar): Kirish va chiqish orasida, masalan, har birida 16 tadan neyron bo'lgan 2 ta yashirin qatlam joylashadi. Ular xom piksellarni bosqichma-bosqich chiziqlar, halqalar va qirralar kabi abstrakt qismlarga aylantiradi.
Output Layer (Chiqish qatlami): 0 dan 9 gacha bo'lgan raqamlarga mos keluvchi 10 ta neyron. Qaysi neyron eng yuqori aktivatsiya bersa (masalan, "3" neyroni eng yorqin yonsa), tarmoqning yakuniy javobi o'sha raqam bo'ladi.
4. Qanday ishlaydi? (Level 2 — Intermediate)
Qatlamli (layered feed-forward) neyron tarmoqda har bir kirish bo'lmagan birlik quyidagi amallarni bajaradi (Rumelhart et al., 1986):

Oldingi qatlam birliklaridan keluvchi chiqishlarni vaznlar bilan qo'shadi va siljish (bias — doimiy 1 ga teng qo'shimcha birlikdan keluvchi ulanish sifatida qaralishi mumkin) qo'shadi: z_j = \sum_i w_{ji} a_i + b_j.
Natijaga sigmasimon (sigmoid) yoki boshqa nochiziqli funksiyani qo'llaydi: a_j = f(z_j).
O'qitish jarayonida:

Forward computation: Kirishdan chiqishgacha barcha birliklar qiymati hisoblanadi (hosilalar hisoblanishidan oldin tarmoq chiqishi aniqlanadi).
Backward pass ([[Backpropagation]]): Haqiqiy chiqish vektori va kerakli chiqish vektori o'rtasidagi farq o'lchanib, [[Chain Rule]] orqali yashirin vaznlarga o'rganish signali uzatiladi.
Parameter update: [[Gradient Descent]], [[SGD]] yoki [[Adam]] orqali vaznlar yangilanadi.
5. Matematik asoslari va Masshtablash Muammolari (Level 3 — Advanced)
Chuqur tarmoqlarni kengaytirish va o'qitishda uchta asosiy texnik muammo yuzaga keladi:

Fazoviy struktura va parametrlar soni: Tasvirlarda yaqin piksellar o'zaro bog'liq. Oddiy to'liq bog'langan tarmoq bu strukturani yo'qotadi; [[CNN]] esa lokal retseptiv maydonlar va vaznlarni ulashish orqali buni hal qiladi (LeCun et al., 1998).
Ketma-ketliklarda uzoq vaqt oraliqlari va parallelizm: [[RNN]] larda xatolik signali vaqt bo'yicha eksponensial so'nadi; [[LSTM]] buni Constant Error Carousel orqali, [[Transformers]] esa rekurrentlikdan voz kechib parallel Self-Attention orqali hal qiladi (Hochreiter & Schmidhuber, 1997; Vaswani et al., 2017).
To'yinish (Saturation) va Internal Covariate Shift: To'g'ri hisoblangan hosilalar o'z-o'zidan to'yinish (saturation) yoki qiyin optimallashtirish landshafti muammosini hal qilmaydi (Rumelhart et al., 1986). Quyi qatlam parametrlari o'zgarganda yuqori qatlam kirishlari taqsimoti siljiydi; bu muammo to'g'ri vazn initsializatsiyasi (masalan, Xavier initialization) va [[Batch Normalization]] yordamida yumshatiladi (Ioffe & Szegedy, 2015).
6. Bog'liq tushunchalar
Oldin o'rganish:

[[Machine Learning]]
[[Matrix Operations]]
[[Chain Rule]]
Keyingi mavzular:

[[Backpropagation]]
[[CNN]]
[[RNN]]
[[LSTM]]
[[Transformers]]
Bog'liq:

[[Batch Normalization]]
[[Optimizers]]
7. Tekshirilgan manbalar
Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323, 533–536. DOI: 10.1038/323533a0.
LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). Gradient-Based Learning Applied to Document Recognition. Proceedings of the IEEE, 86(11), 2278–2324.
Sanderson, G. [3Blue1Brown]. (2017). But what is a neural network? | Deep learning, chapter 1. YouTube. https://www.youtube.com/watch?v=aircAruvnKk
Bo'lim B: Large Language Models (LLMs)
Transformer arxitekturasi va uning diqqat (attention) mexanizmi zamonaviy katta til modellarining poydevori hisoblanadi. Vaswani et al. (2017) tomonidan kiritilgan original Transformer modelida rekurrent va konvolyutsion qatlamlar o'rnini 6 ta bir xil Encoder qatlami va 6 ta bir xil Decoder qatlamidan iborat stek, sinusoidal pozitsion kodlash (Positional Encoding) hamda 8 ta parallel boshli (har birining o'lchami 64 ga teng bo'lgan) Multi-Head Scaled Dot-Product Attention mexanizmi egallaydi; bunda so'rovlar (Query), kalitlar (Key) va qiymatlar (Value) chiziqli proyeksiyalanib, skalyar ko'paytma \sqrt{d_k} ga bo'linadi, Softmax vaznlariga ko'paytiriladi va barcha boshlar chiqishlari birlashtiriladi (concatenated).

Fayl: Transformers.md
tags:

ai
deep-learning
llm
transformers aliases:
Transformer
Attention Is All You Need status: verified level: beginner-to-advanced last_verified: 2026-11-14
Transformers
1. Qisqacha ta'rif
Transformer — 2017-yilda Ashish Vaswani va hammualliflar ("Attention Is All You Need", NIPS 2017) tomonidan taklif etilgan, rekurrentlik ([[RNN]], [[LSTM]]) va konvolyutsiyalardan ([[CNN]]) butunlay voz kechib, ketma-ketliklarni (sequences) faqat Attention (Diqqat) mexanizmi va pozitsion kodlash (Positional Encoding) yordamida qayta ishlovchi neyron tarmoq arxitekturasi.

2. Nima uchun kerak?
Transformer yaratilgunga qadar ketma-ketliklarni qayta ishlash va mashina tarjimasida murakkab rekurrent ([[LSTM]], GRU) yoki konvolyutsion Encoder-Decoder modellari yetakchilik qilgan. Biroq rekurrent tarmoqlar tokenlarni chapdan o'ngga bittadan (ketma-ket) hisoblaydi: ular barcha tokenlar ustida parallel ishlay olmaydi. Transformer rekurrentlikdan voz kechib, parallel Multi-Head Attention dan foydalangani sababli:

O'qitish (training) davrida tokenlarni GPU da parallel qayta ishlash va ancha katta modellarni tezroq o'qitish imkonini beradi.
Ketma-ketlikdagi istalgan ikki pozitsiya o'rtasidagi maksimal yo'l uzunligini bir xil minimal darajaga tushirib, uzoq masofali sintaktik va semantik bog'liqliklarni samarali o'rganadi.
3. Intuitiv tushuntirish (Level 1 — Beginner)
3Blue1Brown (Grant Sanderson, 2024) misolini ko'rib chiqaylik: "paxmoq ko'k mavjudot" ("fluffy blue creature"). "Mavjudot" so'zi dastlab umumiy embedding vektoriga ega. Gapni tushunish uchun "paxmoq" va "ko'k" sifatlari "mavjudot" so'ziga e'tibor qaratib (attend), uning ma'nosini boyitishi kerak. Self-Attention blokida har bir token uchta rol o'ynaydi:

Query (Q — So'rov): Tokenning boshqa so'zlardan qidirayotgan ma'lumoti.
Key (K — Kalit): Boshqa so'zlarning ushbu so'rovga qanchalik mos kelishini bildiruvchi ko'rsatkichi.
Value (V — Qiymat): Agar Query va Key mos tushsa (ularning skalyar ko'paytmasi yuqori bo'lsa), tokenning embeddingini yangilash (\Delta e qo'shish) uchun uzatiladigan ma'no vektori.
4. Qanday ishlaydi? (Level 2 — Intermediate)
4.1. Original 2017-yilgi Arxitektura (Vaswani et al., 2017)
Original Transformer ketma-ketlikni o'zgartirish (sequence transduction / mashina tarjimasi) uchun Encoder-Decoder konfiguratsiyasida qurilgan:

Encoder: N = 6 ta bir xil qatlamdan (stack of N = 6 identical layers) tashkil topgan. U kirish belgilar ketma-ketligini (x_1, \dots, x_n) uzluksiz tasvirlar ketma-ketligiga z = (z_1, \dots, z_n) o'tkazadi. Har bir Encoder qatlamida ikkita qism-qatlam (sub-layers) bor:
Multi-Head Self-Attention: Bu yerda barcha Key, Value va Query vektorlari aynan bitta joydan — Encoderdagi oldingi qatlamning chiqishidan keladi. Encoderdagi har bir pozitsiya oldingi qatlamning barcha pozitsiyalariga murojaat qila oladi.
Position-wise Fully Connected Feed-Forward Network: Har bir pozitsiyaga alohida qo'llaniluvchi to'liq bog'langan tarmoq.
Decoder: z berilganda, chiqish ketma-ketligini (y_1, \dots, y_m) bitta elementdan auto-regressive tarzda (oldingi yaratilgan belgilarni qo'shimcha kirish sifatida olib) generatsiya qiladi. Decoder ham N = 6 ta qatlamdan iborat bo'lib, unda:
Masked Self-Attention: O'ng tomondagi (hali yaratilmagan) chiqish pozitsiyalariga murojaat qilishning oldini olish uchun diqqat bloki faqat chap tomondagi kirishlarni qabul qiladi.
Encoder-Decoder Cross-Attention: Tipik seq2seq diqqat mexanizmini takrorlaydi — Query decoderdan, Key va Value esa encoderdan olinadi.
Position-wise Feed-Forward Network.
Regulyarizatsiya va O'qitish: Original maqolada o'rganish tezligini o'zgartirish uchun maxsus formula, bir nechta joyda Dropout va Label Smoothing regulyarizatsiyasi qo'llanilgan.
4.2. Original (2017) va Keyingi Transformer Tizimlari Farqi
Xususiyat

Original Transformer (Vaswani et al., 2017)

Keyingi Transformer Tizimlari (GPT / ViT)

Arxitektura turi

Encoder-Decoder (N=6 qatlam)

GPT modellarida (masalan, GPT-2, GPT-3, nanoGPT) faqat keyingi tokenni bashorat qiluvchi Decoder-only bloklar; Vision Transformer (ViT) da tasvir bo'laklari (image patches) tokenlar ketma-ketligi sifatida qayta ishlanadi

Attention parametrlari

h = 8 parallel attention head, d_k = d_v = d_{\text{model}}/h = 64 (d_{\text{model}} = 512)

3Blue1Brown tahliliga ko'ra, GPT-3 da har bir blokda h = 96 attention head bo'lib, Key va Query matritsalari 12,288 ustun (embedding o'lchami) va d_k = 128 satrga ega

Vazifalar

English-to-French / German mashina tarjimasi va English Constituency Parsing

Umumiy matn generatsiyasi ([[LLM]]), tasvir va video generatsiya tizimlari

5. Matematik asoslari (Level 3 — Advanced)
5.1. Scaled Dot-Product Attention
So'rovlar, kalitlar va qiymatlar mos ravishda Q, K va V matritsalariga qadoqlanadi (packed together into matrices). Diqqat funksiyasi qiymatlarning vaznli yig'indisi sifatida hisoblanadi (Vaswani et al., 2017, Section 3.2.1):

\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V

Bu yerda:

Q — so'rovlar matritsasi,
K — kalitlar matritsasi (d_k o'lchamli),
V — qiymatlar matritsasi (d_v o'lchamli),
\frac{1}{\sqrt{d_k}} — masshtablash ko'paytuvchisi (scaling factor).
Nima uchun \sqrt{d_k} ga bo'linadi? Maqolada ikki keng tarqalgan diqqat funksiyasi — qo'shuvchi (additive attention) va skalyar ko'paytmali (dot-product / multiplicative attention) solishtiriladi. Kichik d_k qiymatlarida ikkala mexanizm o'xshash ishlaydi, ammo kattaroq d_k uchun masshtablashsiz dot-product attention yomonroq natija beradi. Sababi (Vaswani et al., 2017, Footnote 4): faraz qilaylik, q va k vektorlarining komponentlari o'zaro mustaqil, o'rtacha qiymati ([[Mean]]) 0 va dispersiyasi ([[Standard Deviation]] kvadrati) 1 ga teng bo'lgan tasodifiy o'zgaruvchilardir. U holda ularning skalyar ko'paytmasi q \cdot k = \sum_{i=1}^{d_k} q_i k_i ning o'rtachasi 0, dispersiyasi esa d_k ga teng bo'ladi. Katta d_k qiymatlarida skalyar ko'paytma miqdori juda kattalashib, \text{softmax} funksiyasini gradientlari o'ta kichik bo'lgan hududlarga (saturation regions) itarib yuboradi. Shu ta'sirni bartaraf etish uchun ko'paytmalar \frac{1}{\sqrt{d_k}} ga masshtablanadi.

5.2. Multi-Head Attention
d_{\text{model}} o'lchamli kalitlar, qiymatlar va so'rovlar bilan bitta diqqat funksiyasini bajarish o'rniga, ularni h marta (original maqolada h = 8) turli o'rganiladigan chiziqli proyeksiyalar yordamida d_k, d_k va d_v o'lchamlarga proyeksiyalash foydali ekanligi aniqlangan (Section 3.2.2). Har bir boshdan chiqqan diqqat natijalari parallel hisoblanib, birlashtiriladi (concatenated) va yakuniy chiziqli transformatsiyadan o'tkaziladi. Har bir boshning o'lchami kichraytirilgani (d_k = d_v = d_{\text{model}} / h = 64) tufayli umumiy hisoblash qiymati to'liq o'lchamli bitta boshli (single-head) diqqat bilan deyarli bir xil bo'ladi, ammo model embeddinglarni turli xil nuqtai nazarlardan boyitadi (3Blue1Brown tahlilida har bir bosh o'zgarish vektori \Delta e taklif qilib, ularning yig'indisi dastlabki embeddingga qo'shilishi ko'rsatilgan).

5.3. Sinusoidal Positional Encoding
Ketma-ketlik tartibini bildirish uchun Vaswani et al. (2017) turli chastotali sinus va kosinus funksiyalaridan foydalangan:

PE_{(\text{pos}, 2i)} = \sin\left(\frac{\text{pos}}{10000^{2i / d_{\text{model}}}}\right), \quad PE_{(\text{pos}, 2i+1)} = \cos\left(\frac{\text{pos}}{10000^{2i / d_{\text{model}}}}\right)

Bu yerda \text{pos} — pozitsiya, i esa o'lcham indeksi bo'lib, to'lqin uzunliklari 2\pi dan 10000 \cdot 2\pi gacha geometrik progressiya hosil qiladi. Mualliflar sinusoidal versiyani tanlash sababini shunday izohlaydilar: bu modelga o'qitish jarayonida uchraganidan ko'ra uzunroq ketma-ketlik uzunliklariga ekstrapolyatsiya qilish imkonini berishi mumkin.

5.4. Hisoblash murakkabligi (Computational Complexity)
RNN lar tokenlarni bittadan ketma-ket qayta ishlagani uchun ketma-ketlik bo'yicha parallel ishlay olmaydi. Transformerlar o'qitish vaqtida tokenlarni parallel qayta ishlashga ruxsat beradi, biroq standart Self-Attention ning hisoblash va xotira xarajatlari ketma-ketlik uzunligi (n) bo'yicha kvadratik o'sadi.

6. Python / PyTorch Amaliy Misoli
Quyida PyTorch yordamida Scaled Dot-Product Attention mexanizmining tenzor o'lchamlari bilan amalga oshirilishi keltirilgan (Illyustrativ kod, o'quv maqsadida):python import math import torch import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None): # Q, K, V shape: (batch_size, num_heads, seq_len, d_k) d_k = Q.size(-1)

# 1. Q va K^T ko'paytmasi va sqrt(d_k) ga bo'lish # scores shape: (batch_size, num_heads, seq_len, seq_len) scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

# 2. Agar decoder (causal mask) bo'lsa, o'ng tomondagi kelajak tokenlarni yopish if mask is not None: scores = scores.masked_fill(mask == 0, float('-inf'))

# 3. Softmax orqali diqqat vaznlarini olish attn_weights = F.softmax(scores, dim=-1)

# 4. Qiymatlar (V) ning vaznli yig'indisi # output shape: (batch_size, num_heads, seq_len, d_v) output = torch.matmul(attn_weights, V) return output, attn_weights

Kichik o'lchamli test: batch=1, heads=2, seq_len=4, d_k=8
torch.manual_seed(42) x_q = torch.randn(1, 2, 4, 8) out, weights = scaled_dot_product_attention(x_q, x_q, x_q) print("Output shape:", out.shape) # torch.Size([1, 2, 4, 8]) print("Attention weights shape:", weights.shape) # torch.Size([1, 2, 4, 4])

## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Matrix Operations]]
- [[Embeddings]]
- [[Probability]]
- [[Standard Deviation]]

**Keyingi mavzular:**
- [[LLM]]
- [[RAG]]
- [[AI Agent]]

**Bog'liq:**
- [[RNN]]
- [[LSTM]]

## 8. Tekshirilgan manbalar
- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). *Attention Is All You Need*. Advances in Neural Information Processing Systems 30 (NIPS 2017), pp. 5998–6008. arXiv:1706.03762.
- Sanderson, G. [3Blue1Brown]. (2024). *Attention in transformers, step-by-step | Deep Learning Chapter 6*. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
- Karpathy, A. (2023). *Let's build GPT: from scratch, in code, spelled out*. YouTube. https://www.youtube.com/watch?v=kCc8FmEb1nY

Fayl: LLM.md
tags:

ai
llm
deep-learning aliases:
Large Language Model
Katta til modellari status: verified level: beginner-to-advanced last_verified: 2026-11-14
LLM (Large Language Model)
1. Qisqacha ta'rif
Large Language Model (LLM) — [[Transformers]] arxitekturasiga asoslangan, matn bo'laklaridan (tokenlardan) keyingi so'z yoki tokenni bashorat qilish (next-token prediction) maqsadida o'qitilgan yirik neyron tarmoq (masalan, 124 million parametrli GPT-2 yoki ko'p milliard parametrli GPT-3).

2. Nima uchun kerak?
Avvalgi ketma-ketlik modellari (masalan, 380M parametrli 2 ta LSTM yoki 130M parametrli GRU asosidagi tarjima tizimlari) rekurrentlik tufayli parallel o'qitishda cheklangan va maxsus vazifalarga bog'langan edi. Transformer asosidagi LLM lar parallel o'qitish hisobiga juda katta korpuslarda o'qitilib, matn generatsiya qilish, tarjima va kod yozish kabi vazifalarni yagona auto-regressive mexanizm orqali bajaradi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
LLM matn parchasi berilganda keyingi so'zni bashorat qiladi. Buning uchun matn avval kichik bo'laklarga — tokenlarga ([[Tokenization]]) ajratiladi. Har bir token o'z ma'nosini va pozitsiyasini kodlovchi yuqori o'lchamli raqamlar ro'yxati ([[Embeddings]]) bilan bog'lanadi. [[Transformers]] ichidagi diqqat bloklari ushbu embeddinglarni kontekst asosida boyitadi va ketma-ketlikdagi oxirgi vektor asosida keyingi tokenning ehtimolliklari hisoblanadi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
3Blue1Brown (2024) va Andrej Karpathy (nanoGPT, 2023) tahlillariga asosan, LLM ning ichki ishlash oqimi quyidagicha:

Tokenization va Embedding: Kirish matni tokenlarga bo'linib, har bir token yuqori o'lchamli vektorga (masalan, GPT-3 da 12,288 o'lchamli embeddingga) aylantiriladi va pozitsion ma'lumot qo'shiladi.
Contextual Refinement (Attention + Feed-Forward): Har bir Transformer bloki (masalan, GPT-3 da 96 ta parallel attention head) boshqa tokenlardan kontekstual ma'noni ko'chirib olib, har bir pozitsiya uchun o'zgarish vektorini (\Delta e) dastlabki embeddingga qo'shadi.
Training vs. Inference:
Training (O'qitish): Ma'lumotlar yuklanib, model parallel ravishda keyingi tokenni bashorat qilishga o'qitiladi; bunda yo'qotish funksiyasi (loss) kamayishi va perplexity yaxshilanishi kuzatiladi.
Inference (Generatsiya): Model auto-regressive ishlaydi — har bir qadamda oldingi yaratilgan tokenlarni qo'shimcha kirish sifatida iste'mol qilib, ketma-ketlikdagi oxirgi vektor asosida bitta yangi token generatsiya qiladi.
5. Matematik va Muhandislik Asoslari (Level 3 — Advanced)
Auto-regressive model har bir t qadamda oldingi tokenlar (y_1, \dots, y_{t-1}) berilganda keyingi token y_t ning ehtimollik taqsimotini \text{softmax} orqali baholaydi va xarajatlarni (cost function) minimallashtirish uchun ko'p sonli parametrlarni sozlaydi. Andrej Karpathy'ning nanoGPT loyihasi ko'rsatganidek, kichik tajribalar (masalan, Shekspir asarlarida o'qitish) bitta GPU da taxminan 3 daqiqada yoki MacBook (Metal Performance Shaders) da bajarilishi mumkin bo'lsa, aynan shu ~600 qatorli arxitektura (300 qator model tavsifi + 300 qator o'qitish sikli) 124 million parametrli to'liq GPT-2 modelini qayta tiklash (reproduce) uchun masshtablanadi.

Izoh (Manba maqomi): Auto-regressive generatsiya, oxirgi vektordan bashorat olish, perplexity kuzatuvi va GPT-2/GPT-3 arxitekturaviy ko'rsatkichlari Vaswani et al. (2017), 3Blue1Brown (2024) va Karpathy (2023) asosida tasdiqlangan. Hallucinations va tashqi qidiruv bilan bog'liq masalalar [[RAG]] va [[AI Agent]] konspektlarida yoritilgan.

6. Bog'liq tushunchalar
Oldin o'rganish:

[[Transformers]]
[[Tokenization]]
[[Embeddings]]
Keyingi mavzular:

[[Prompt Engineering]]
[[RAG]]
[[AI Agent]]
Bog'liq:

[[Probability]]
[[Adam]]
7. Tekshirilgan manbalar
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Sanderson, G. [3Blue1Brown]. (2024). Attention in transformers, step-by-step | Deep Learning Chapter 6. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
Karpathy, A. (2023). Let's build GPT: from scratch, in code, spelled out. YouTube. https://www.youtube.com/watch?v=kCc8FmEb1nY
Fayl: Embeddings.md
tags:

ai
llm
embeddings aliases:
Embedding
Vector Embeddings status: verified level: beginner-to-advanced last_verified: 2026-11-14
Embeddings
1. Qisqacha ta'rif
Embeddings — matnning kichik birliklarini (tokenlar, so'zlar yoki iboralarni) ularning semantik va sintaktik ma'nosini hamda kontekstdagi pozitsiyasini kodlovchi yuqori o'lchamli vektorlar fazosida (\mathbb{R}^d) tasvirlash usuli.

2. Nima uchun kerak?
Neyron tarmoqlar matnli belgilarni bevosita matritsalarga ko'paytira olmaydi. Mikolov et al. (2013) va 3Blue1Brown (2024) ko'rsatganidek, so'z va tokenlarni yuqori o'lchamli taqsimlangan vektorlar (distributed vector representations) sifatida ifodalash orqali:

Ko'p sonli aniq sintaktik va semantik so'z munosabatlarini fazodagi yo'nalishlar sifatida ushlash mumkin.
[[Transformers]] dagi diqqat mexanizmi orqali bir so'zning ma'nosini boshqa so'zlardan olingan ma'lumot bilan boyitish mumkin.
3. Intuitiv tushuntirish (Level 1 — Beginner)
Har bir so'z dastlab ko'p o'lchamli fazoda o'zining ma'nosini va gapdagi o'rnini (position) bildiruvchi nuqta (vektor) sifatida joylashtiriladi. Masalan, "paxmoq ko'k mavjudot" jumlasida "mavjudot" so'zining dastlabki embeddingi diqqat blokidan o'tgach, "paxmoq" va "ko'k" so'zlaridan ma'lumot olib, yanada boyroq kontekstual ma'noga ega yangilangan embeddingga aylanadi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
Static Distributed Vector Representations (Mikolov et al., 2013): Skip-gram modeli va hierarchical softmax o'rnini bosuvchi negative sampling usuli yordamida millionlab so'z va iboralar (phrases) uchun sifatli vektor tasvirlarni tez o'rganish mumkin.
Contextual Embeddings in Transformers (Vaswani et al., 2017; 3Blue1Brown, 2024):
Token dastlab kirish embeddingi va Positional Encoding yig'indisi sifatida kodlanadi (original Transformerda d_{\text{model}} = 512, GPT-3 da d_{\text{model}} = 12,288).
Har bir Multi-Head Attention blokida Query, Key va Value matritsalari yordamida so'zlar orasidagi bog'liqlik (relevance grid) hisoblanadi.
Har bir attention head dastlabki embeddingga qo'shilishi kerak bo'lgan o'zgarish vektorini (\Delta e) hisoblaydi; barcha boshlardan chiqqan o'zgarishlar yig'ilib, dastlabki embeddingga qo'shiladi va refined (boyitilgan) embedding hosil bo'ladi.
5. Matematik asoslari va Python Misoli (Level 3 — Advanced)
Ikki embedding yoki Query/Key vektori q, k \in \mathbb{R}^d o'rtasidagi moslik (compatibility / similarity) ularning skalyar ko'paytmasi q \cdot k = \sum_{i=1}^d q_i k_i orqali baholanadi. (Illyustrativ PyTorch kodi, o'quv maqsadida):python import torch import torch.nn as nn

100 ta token uchun 16 o'lchamli embedding va pozitsion embedding qatlami
vocab_size, seq_len, d_model = 100, 4, 16 token_emb = nn.Embedding(vocab_size, d_model) pos_emb = nn.Embedding(seq_len, d_model)

4 ta token ID dan iborat ketma-ketlik
tokens = torch.tensor([10, 25, 42, 7]) positions = torch.arange(0, seq_len)

Token embedding + Positional embedding
x = token_emb(tokens) + pos_emb(positions) # Shape: (4, 16) print("Contextual input embedding shape:", x.shape)

## 6. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Vector]]
- [[Matrix]]
- [[Tokenization]]

**Keyingi mavzular:**
- [[Transformers]]
- [[LLM]]
- [[RAG]]

**Bog'liq:**
- [[Deep Learning]]

## 7. Tekshirilgan manbalar
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.
- Mikolov, T., Corrado, G., Dean, J., et al. (2013). *Distributed Representations of Words and Phrases and their Compositionality* / *Skip-gram*. (Referenced via literature record).
- Sanderson, G. [3Blue1Brown]. (2024). *Attention in transformers, step-by-step | Deep Learning Chapter 6*. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc

Fayl: Tokenization.md
tags:

ai
llm
tokenization aliases:
Tokenizer
Subword Units status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Tokenization
1. Qisqacha ta'rif
Tokenization — kirish matnini til modeli qayta ishlay oladigan kichikroq matn bo'laklariga (tokenlarga — so'zlar, subword birliklar yoki belgilarga) ajratish va ularni butun sonli identifikatorlarga (Token IDs) o'tkazish jarayoni.

2. Nima uchun kerak?
[[Transformers]] va [[LLM]] lar matnni bevosita satr sifatida emas, balki diskret tokenlar ketma-ketligi sifatida qabul qiladi va har bir tokenni [[Embeddings]] vektori bilan bog'laydi. Sennrich et al. (2015) ("Neural Machine Translation of Rare Words with Subword Units", arXiv:1508.07909) ko'rsatganidek, kamyob so'zlarni (rare words) subword birliklar orqali ifodalash neyron mashina tarjimasida muhim ahamiyatga ega.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Matnni modelga uzatishdan oldin uni bo'laklarga ajratish kerak. Masalan, uzun va kam uchraydigan so'zni butunligicha noma'lum deb tashlab ketish o'rniga, uni kichikroq ma'noli bo'laklarga (subword units) ajratsak, model har bir bo'lakning embedding vektoridan foydalanib umumiy ma'noni tushuna oladi.

4. Qanday ishlaydi va Muhandislik Qo'llanilishi (Level 2 & Level 3)
Har bir token o'zining lug'atdagi tartib raqami (Token ID) orqali yuqori o'lchamli embedding vektoriga bog'lanadi (3Blue1Brown, 2024).
Andrej Karpathy'ning nanoGPT (2023) o'quv dasturida ko'rsatilganidek, kichik o'quv tajribalarida (masalan, Shekspir dialoglarida) belgi darajasidagi (character-level) oddiy tokenizatsiya bilan modelni tezda ishga tushirish mumkin bo'lsa, 124M parametrli GPT-2 modelini qayta tiklashda subword tokenlardan foydalaniladi.
Izoh (Manba maqomi): Tokenlarning embeddinglar bilan bog'lanishi (3Blue1Brown, 2024), nanoGPT amaliyoti (Karpathy, 2023) hamda Sennrich et al. (2015, arXiv:1508.07909) maqolasining bibliografik ma'lumotlari tasdiqlangan; biroq arXiv:1508.07909 maqolasining to'liq ichki matni joriy qidiruv natijalarida ochilmaganligi sababli, BPE birlashtirishning ichki statistik detallari Tasdiqlanmagan deb belgilandi.

5. Python Amaliy Misoli
Quyida nanoGPT uslubidagi oddiy character-level tokenizator (satrni butun sonli Token ID larga o'tkazish va qaytarish) keltirilgan (Illyustrativ kod, o'quv maqsadida):python text = "salom ai" chars = sorted(list(set(text)))

Belgidan ID ga (stoi) va ID dan belgiga (itos) lug'atlar
stoi = {ch: i for i, ch in enumerate(chars)} itos = {i: ch for i, ch in enumerate(chars)}

encode = lambda s: [stoi[c] for c in s] decode = lambda l: ''.join([itos[i] for i in l])

token_ids = encode("salom") print("Token IDs:", token_ids) print("Decoded:", decode(token_ids))

## 6. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Machine Learning]]

**Keyingi mavzular:**
- [[Embeddings]]
- [[Transformers]]
- [[LLM]]

**Bog'liq:**
- [[Prompt Engineering]]

## 7. Tekshirilgan manbalar
- Sennrich, R., et al. (2015). *Neural Machine Translation of Rare Words with Subword Units*. arXiv:1508.07909. *(Bibliografik metama'lumot tasdiqlangan)*.
- Sanderson, G. [3Blue1Brown]. (2024). *Attention in transformers, step-by-step | Deep Learning Chapter 6*. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
- Karpathy, A. (2023). *Let's build GPT: from scratch, in code, spelled out*. YouTube. https://www.youtube.com/watch?v=kCc8FmEb1nY

Fayl: Prompt Engineering.md
tags:

ai
llm
prompt-engineering aliases:
Prompting
In-Context Learning status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Prompt Engineering
1. Qisqacha ta'rif
Prompt Engineering — [[LLM]] parametrlarini qayta o'qitmasdan, kirish matnini (prompt) strukturaviy shakllantirish orqali modelning diqqat (attention) mexanizmini va keyingi token bashoratini boshqarish usuli.

2. Nima uchun kerak?
[[Transformers]] ga asoslangan til modelining maqsadi matndagi keyingi so'zni bashorat qilishdir (3Blue1Brown, 2024). Modelning oxirgi pozitsiyadagi vektori oldingi barcha tokenlarning embeddinglaridan diqqat (attention) orqali ma'lumot yig'adi. Shu sababli kirish kontekstida berilgan ko'rsatmalar, misollar va mantiqiy mulohaza qadamlari (masalan, Yao et al., 2022 dagi ReAct: Synergizing Reasoning and Acting in Language Models) modelning chiqish ehtimolliklarini bevosita o'zgartiradi.

3. Qanday ishlaydi va Cheklovlari (Level 1 — Level 3)
Kontekstual Diqqat Yangilanishi (3Blue1Brown, 2024): Promptdagi har bir token Key va Value matritsalari orqali keyingi tokenlarning embeddinglarini boyitishda qatnashadi.
Reasoning va Acting Uyg'unligi: Yao et al. (2022, arXiv:2210.03629) til modellarida mantiqiy mulohaza yuritish (reasoning) va harakat qilishni (acting) birlashtirish yondashuvini taqdim etgan.
Arxitekturaviy Cheklovlar: Standart Self-Attention da hisoblash va xotira xarajatlari ketma-ketlik uzunligi bo'yicha kvadratik o'sadi (Vaswani et al., 2017), shu bois prompt uzunligini cheksiz oshirib bo'lmaydi.
Izoh (Manba maqomi): Transformerlarda kontekst tokenlarining diqqat mexanizmi orqali keyingi token bashoratiga ta'siri (3Blue1Brown, 2024; Vaswani et al., 2017) va Yao et al. (2022, arXiv:2210.03629) bibliografiyasi tasdiqlangan. Biroq arXiv:2210.03629 ning to'liq matni va boshqa prompt shablonlari joriy manbalar to'plamida ochilmaganligi sababli, maxsus prompting evristikalari Tasdiqlanmagan deb belgilandi.

4. Bog'liq tushunchalar
Oldin o'rganish:

[[LLM]]
[[Transformers]]
[[Tokenization]]
Keyingi mavzular:

[[AI Agent]]
[[RAG]]
Bog'liq:

[[Tools]]
[[Memory]]
5. Tekshirilgan manbalar
Sanderson, G. [3Blue1Brown]. (2024). Attention in transformers, step-by-step | Deep Learning Chapter 6. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). ReAct: Synergizing Reasoning and Acting in Language Models. arXiv:2210.03629. (Bibliografik metama'lumot tasdiqlangan).
Bo'lim C: AI Agents and Retrieval
Fayl: AI Agent.md
tags:

ai
agents
llm aliases:
Agent
ReAct Agent status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
AI Agent
1. Qisqacha ta'rif
AI Agent — til modelida mantiqiy mulohaza yuritish (reasoning) va harakat qilishni (acting) uyg'unlashtirib (masalan, Yao et al., 2022 dagi ReAct yondashuvi), ko'p modulli yoki ko'p qadamli vazifalarni bajaruvchi tizim.

2. Nima uchun kerak?
Oddiy bitta chaqiruvli klassifikator yoki til modelidan farqli o'laroq, murakkab amaliy vazifalar (masalan, LeCun et al., 1998 tahlilidagi ko'p bosqichli hujjatlarni qayta ishlash konveyerlari yoki bilimga asoslangan NLP vazifalari) bir nechta qadam va modullarning o'zaro muvofiqlashgan ishlashini talab qiladi. Shunyu Yao va hammualliflar (2022, arXiv:2210.03629) til modellarida mulohaza yuritish va harakat qilishni birlashtiruvchi ReAct tizimini taklif etganlar.

3. Bilim va Xotira Qatlamlarining Farqlanishi (Level 1 — Level 3)
AI muhandisligida tizim foydalanadigan axborot manbalarini quyidagicha farqlash muhim:

Model-internal knowledge (Uzoq muddatli parametrik xotira): Hochreiter & Schmidhuber (1997) ta'riflaganidek, neyron tarmoqning sekin o'zgaruvchan vaznlarida (W) mujassamlashgan bilimlar.
Short-term activations / Conversation context (Qisqa muddatli kontekst): Joriy kirish hodisalari va ketma-ketlik tokenlarining aktivatsiyalarida ([[RNN]]/[[LSTM]] ichki holati yoki [[Transformers]] kontekst oynasida) saqlanuvchi tezkor ma'lumot.
External retrieval (Tashqi qidiruv): [[RAG]] (Lewis et al., 2020) kabi bilimga asoslangan NLP vazifalarida tashqi manbalardan olinadigan ma'lumotlar.
Persistent application memory va Tools: Tashqi ilova xotirasi va vositalar ([[Tools]]).
Izoh (Manba maqomi): Neyron tarmoqlarda qisqa muddatli aktivatsiyalar va uzoq muddatli vaznlar farqi (Hochreiter & Schmidhuber, 1997), ko'p modulli tizimlar (LeCun et al., 1998) hamda Yao et al. (2022, arXiv:2210.03629) va Lewis et al. (2020, arXiv:2005.11401) bibliografiyalari tasdiqlangan. Biroq arXiv:2210.03629 maqolasining to'liq matni va multi-agent hamda production xavfsizlik protokollari joriy qidiruv parchalarida keltirilmagani sababli, ushbu qo'shimcha tafsilotlar Tasdiqlanmagan deb belgilandi.

4. Bog'liq tushunchalar
Oldin o'rganish:

[[LLM]]
[[Prompt Engineering]]
Keyingi mavzular:

[[Tools]]
[[RAG]]
[[Memory]]
Bog'liq:

[[Artificial Intelligence]]
5. Tekshirilgan manbalar
Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). ReAct: Synergizing Reasoning and Acting in Language Models. arXiv:2210.03629. (Bibliografik metama'lumot tasdiqlangan).
Hochreiter, S., & Schmidhuber, J. (1997). Long Short-Term Memory. Neural Computation, 9(8), 1735–1780.
LeCun, Y., et al. (1998). Gradient-Based Learning Applied to Document Recognition. Proceedings of the IEEE, 86(11), 2278–2324.
Fayl: RAG.md
tags:

ai
rag
llm
retrieval aliases:
Retrieval-Augmented Generation status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
RAG (Retrieval-Augmented Generation)
1. Qisqacha ta'rif
Retrieval-Augmented Generation (RAG) — Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni va hammualliflar (May 2020, "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", arXiv:2005.11401) tomonidan bilimga asoslangan (knowledge-intensive) NLP vazifalari uchun taklif etilgan, qidiruv (retrieval) va matn generatsiyasini (generation) birlashtiruvchi arxitektura.

2. Nima uchun kerak?
Standart [[LLM]] va [[Transformers]] modellari bilimlarni faqat o'z parametrlarida saqlaydi. Bilimga asoslangan murakkab NLP vazifalarida modelga tashqi hujjatlar bazasidan tegishli ma'lumotlarni vektor yaqinligi ([[Embeddings]], [[Vector]]) orqali qidirib topish va javobni shu ma'lumotlar asosida generatsiya qilish talab etiladi.

3. Arxitekturaviy Komponentlar va Manba Maqomi (Level 1 — Level 3)
RAG tizimlari [[Embeddings]] (yuqori o'lchamli semantik vektorlar), skalyar ko'paytma (dot product similarity) va [[Transformers]] generatorlariga tayanadi:

Embedding va Yaqinlik Qidiruvi: Matn bo'laklari va so'rovlar [[Embeddings]] fazosiga o'tkazilib, ular orasidagi o'xshashlik [[Vector]] skalyar ko'paytmasi orqali hisoblanadi.
Sequence Transduction / Generation: Topilgan kontekst [[Transformers]] asosidagi auto-regressive modelga uzatiladi.
Izoh (Manba maqomi): Lewis et al. (2020) maqolasining sarlavhasi, mualliflari, nashr sanasi (May 2020) va DOI (10.48550/arXiv.2005.11401) ko'rsatkichlari to'liq tasdiqlangan. Biroq ushbu maqolaning to'liq ichki matni, shuningdek, document ingestion, chunking overlap, vector databases, hybrid search, reranking va retrieval evaluation bo'yicha maxsus tajriba raqamlari joriy manbalar to'plamida mavjud emasligi sababli, manba tekshiruvi siyosatiga (Section 3) muvofiq Tasdiqlanmagan deb belgilandi va to'qima formulalar kiritilmadi.

4. Bog'liq tushunchalar
Oldin o'rganish:

[[Embeddings]]
[[Vector]]
[[Transformers]]
[[LLM]]
Keyingi mavzular:

[[AI Agent]]
[[Memory]]
Bog'liq:

[[Probability]]
5. Tekshirilgan manbalar
Lewis, P., Perez, E., Piktus, A., Petroni, F., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. arXiv:2005.11401. DOI: 10.48550/arXiv.2005.11401. (Bibliografik metama'lumot tasdiqlangan).
Fayl: Memory.md
tags:

ai
agents
memory
deep-learning aliases:
AI Memory
Short-term and Long-term Memory status: verified level: beginner-to-advanced last_verified: 2026-11-14
Memory
1. Qisqacha ta'rif
Sun'iy intellekt va neyron tarmoqlarda Memory (Xotira) axborotni vaqt qadamlari davomida saqlash mexanizmi bo'lib, Hochreiter va Schmidhuber (1997) tomonidan qisqa muddatli xotira (short-term memory — aktivatsiyalar) va uzoq muddatli xotira (long-term memory — sekin o'zgaruvchan vaznlar) sifatida formallashtirilgan. Zamonaviy [[LLM]] muhandisligida bunga joriy kontekst oynasi va tashqi qidiruv ([[RAG]]) xotirasi ham qo'shiladi.

2. Nima uchun kerak?
Ketma-ketliklarni qayta ishlashda (masalan, 1000 qadamdan ortiq vaqt oraliqlariga ega vazifalarda) tarmoq oldingi kirish hodisalarini eslab qolishi shart. Agar qisqa muddatli xotira tezda o'chib ketsa (vanishing gradient tufayli), tizim uzoq vaqt oraliqlarini bog'lay olmaydi.

3. Xotira Turlarining Aniq Texnik Farqlanishi (Level 1 — Level 3)
Xotira turi

Texnik joylashuvi

Yangilanish mexanizmi

Tasdiqlangan manba va arxitektura

1. Short-Term Memory (Qisqa muddatli aktivatsiyalar)

Rekurrent bog'lanishlar orqali saqlanuvchi ichki aktivatsiyalar va holatlar (s_{c_j}(t))

Har bir vaqt qadamida (forward pass) yangi kirish hodisalari bilan yangilanadi

Hochreiter & Schmidhuber (1997): [[RNN]] va [[LSTM]] Constant Error Carousel

2. Long-Term Memory (Uzoq muddatli model vaznlari)

Tarmoqning o'rganiladigan vazn matritsalari (W)

[[Backpropagation]] va [[Gradient Descent]] orqali sekin o'zgaradi (slowly changing weights)

Hochreiter & Schmidhuber (1997); Rumelhart et al. (1986)

3. Contextual Sequence Representation (Kontekst oynasi)

[[Transformers]] dagi ketma-ketlik tokenlarining boyitilgan embeddinglari

Self-Attention orqali pozitsiyalararo axborot almashish

Vaswani et al. (2017); 3Blue1Brown (2024)

4. External Retrieval / Application Memory

Tashqi bilimlar bazasi va ilova xotirasi

[[RAG]] va [[AI Agent]] qidiruv mexanizmlari

Lewis et al. (2020) (bibliografik); persistent application memory detallari Tasdiqlanmagan

4. Bog'liq tushunchalar
Oldin o'rganish:

[[RNN]]
[[LSTM]]
[[Transformers]]
Keyingi mavzular:

[[RAG]]
[[AI Agent]]
Bog'liq:

[[Embeddings]]
[[LLM]]
5. Tekshirilgan manbalar
Hochreiter, S., & Schmidhuber, J. (1997). Long Short-Term Memory. Neural Computation, 9(8), 1735–1780. DOI: 10.1162/neco.1997.9.8.1735.
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Sanderson, G. [3Blue1Brown]. (2024). Attention in transformers, step-by-step | Deep Learning Chapter 6. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
Fayl: Tools.md
tags:

ai
agents
tools aliases:
Tool Calling
Function Calling status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Tools (AI Agent Vositalari)
1. Qisqacha ta'rif
Tools (Vositalar) — [[AI Agent]] tizimlarida til modelining mantiqiy mulohaza yuritish (reasoning) qobiliyatini tashqi muhitda amaliy harakatlar (acting) bilan bog'lovchi tashqi funksiyalar va interfeyslar.

2. Nima uchun kerak?
Til modeli o'z holicha faqat keyingi token ehtimolligini hisoblaydi (3Blue1Brown, 2024). Tashqi tizimlar bilan ishlash uchun Yao et al. (2022, arXiv:2210.03629) tomonidan taklif etilgan ReAct: Synergizing Reasoning and Acting in Language Models paradigmasi mulohaza va harakatni birlashtiradi.

Izoh (Manba maqomi): Yao et al. (2022, arXiv:2210.03629) maqolasining bibliografik metama'lumoti tasdiqlangan; ammo tashqi tool calling, execution sandboxing va API sxemalari bo'yicha to'liq matn joriy manbalar to'plamida mavjud emasligi sababli Tasdiqlanmagan deb belgilandi.

3. Bog'liq tushunchalar
Oldin o'rganish:

[[LLM]]
[[Prompt Engineering]]
Keyingi mavzular:

[[AI Agent]]
[[RAG]]
Bog'liq:

[[Memory]]
4. Tekshirilgan manbalar
Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). ReAct: Synergizing Reasoning and Acting in Language Models. arXiv:2210.03629. (Bibliografik metama'lumot tasdiqlangan).
Bo'lim D: Deep Learning Architectures
Chuqur o'rganish arxitekturalarini o'rganishda tarixiy-ilmiy aniqlik juda muhimdir. Ko'plab zamonaviy darsliklarda LeCun va hammualliflarning 1998-yilgi LeNet-5 tarmog'i zamonaviy Max-Pooling va ReLU qatlamlari bilan noto'g'ri tasvirlanadi. Quyidagi vizual grafikda LeCun et al. (1998) maqolasidagi haqiqiy LeNet-5 qatlamlarining fazoviy o'lchamlari va o'rganiladigan parametrlari aniq sonlar bilan aks ettirilgan.

Fayl: CNN.md
tags:

ai
deep-learning
cnn
architectures aliases:
Convolutional Neural Network
LeNet-5 status: verified level: beginner-to-advanced last_verified: 2026-11-14
CNN (Convolutional Neural Network)
1. Qisqacha ta'rif
Convolutional Neural Network (CNN) — 2D fazoviy o'zgaruvchanlikka (2D shape variability) ega tasvirlar va qo'lyozma belgilarni tanib olish uchun loyihalangan, lokal retseptiv maydonlar (local receptive fields), vaznlarni ulashish (shared weights / weight replication) va fazoviy kichraytirish (spatial subsampling) g'oyalarini birlashtiruvchi neyron tarmoq arxitekturasi (LeCun, Bottou, Bengio, & Haffner, 1998).

2. Nima uchun kerak?
Tasvirni oddiy to'liq bog'langan tarmoqqa uzatish fazoviy strukturani yo'qotadi: tasvirda yaqin joylashgan piksellar o'zaro kuchli bog'langan bo'lib, kichik chiziq (stroke) tasvirning ko'plab joylarida uchrashi mumkin. Bundan tashqari, to'liq bog'langan qatlamlarda har bir kirish-chiqish juftligi uchun alohida vazn saqlash juda ko'p parametr talab qiladi. CNN lar bitta feature map ichida vaznlarni bog'lash (tying weights) orqali parametrlar sonini kamaytiradi va siljish (shift), masshtab (scale) hamda kichik buzilishlarga (distortion) nisbatan barqarorlikni ta'minlaydi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Butun rasmga birvarakayiga qarash o'rniga, 5x5 piksel o'lchamli kichik darchani (filtrni) rasm ustida yurgizib chiqasiz. Shu bitta detektor rasmning qayerida o'ziga mos chiziq yoki burchakni ko'rsa, o'sha joyda javob beradi. Natijada Feature Map (Belgilar xaritasi) hosil bo'ladi. So'ngra fazoviy kichraytirish (subsampling) qatlami 2x2 katakchalarni umumlashtirib, xarita o'lchamini ikki baravar kichraytiradi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
4.1. CNN ning uchta arxitekturaviy tamoyili (LeCun et al., 1998, Section II-A)
Local Receptive Fields: Har bir yashirin birlik butun tasvirga emas, balki kichik qo'shnichilik sohasiga (masalan, 5x5 hududga) ulanadi.
Shared Weights (Weight Replication): Bitta Feature Map ichidagi barcha birliklar aynan bir xil filtr vaznlarini va bitta biasni ulashadi. Bu translation invariance (siljishga nisbatan invariantlik) beradi va parametrlar sonini qisqartiradi.
Spatial Subsampling: Fazoviy aniqlikni (resolution) kamaytirib, kichik siljish va qiyshayishlarga sezgirlikni pasaytiradi.
4.2. Original LeNet-5 (1998) Arxitekturasi va Zamonaviy O'quv Modellaridan Farqi
Ko'pincha zamonaviy darsliklarda ReLU, parametrsiz Max-Pooling va Softmax qatlamiga ega tarmoq LeNet-5 deb ataladi; ammo LeCun et al. (1998, Section II-B) dagi haqiqiy LeNet-5 quyidagicha tuzilgan:

Input (32x32): MNIST raqami proporsiyasi saqlangan holda 20x20 sohaga sig'dirilib, massa markazi bo'yicha 28x28 maydonga markazlashtiriladi; LeNet-5 ning 32x32 kirishi esa uning atrofida qo'shimcha hoshiya qoldiradi.
C1 (Convolution): 6 ta 5x5 filtr \to 6 ta 28x28 o'lchamli feature map (6 \times 25 + 6 = 156 ta parametr).
S2 (Original Subsampling \neq Max-Pooling): Har bir 2x2 oynadagi 4 ta qiymat qo'shiladi, o'rganiladigan koeffitsiyentga ko'paytiriladi, o'rganiladigan bias qo'shiladi va sigmasimon (squashing) funksiyadan o'tkaziladi. Demak, har bir xarita 2 ta o'rganiladigan parametr qo'shadi (6 ta xarita bo'yicha S2 da 12 ta parametr; 14x14 o'lcham).
C3 (Qisman bog'langan Convolution — Table I): C3 dagi 16 ta chiqish xaritasi (10x10) S2 dagi barcha 6 ta xarita bilan to'liq bog'lanmagan! Ular original maqolaning I jadvalidagi sxema bo'yicha jami 60 ta aloqaga ega. Har bir aloqa 5x5 filtr (25 ta vazn) va har bir chiqish xaritasi bitta biasga ega bo'lib, jami 60 \times 25 + 16 = 1,516 ta o'rganiladigan parametrni tashkil etadi (agar 6 ta kirish va 16 ta chiqish to'liq bog'langanda 96 \times 25 + 16 = 2,416 ta parametr bo'lar edi).
S4 (Subsampling): 16 ta xarita ustida S2 kabi ishlaydi va 32 ta o'rganiladigan parametr qo'shadi (5x5 o'lcham).
C5 va F6: C5 (120 ta 5x5 filtr) 5x5 xaritani 120 ta qiymatga o'tkazadi (kirish kattaroq bo'lganda fazoviy bo'lishi sababli konvolyutsion qatlam deb ataladi); F6 esa bu 120 ta qiymatni 84 ta yashirin birlikka akslantiradi.
Output (Euclidean RBF — Equation 7): Har bir chiqish 7x12 o'lchamli belgi bitmaplaridan olingan qat'iy \pm 1 prototip vektoriga nisbatan kvadratik masofani o'lchaydi (kichik masofa — sinfga yaqinlikni bildiradi).
5. Matematik asoslari va Parametrlarni Hisoblash (Level 3 — Advanced)
Kirish tasviri H_{\text{in}} \times W_{\text{in}} = 32 \times 32 va kernel K \times K = 5 \times 5 (padding p=0, stride s=1) uchun C1 chiqish o'lchami:

H_{\text{out}} = H_{\text{in}} - K + 1 = 32 - 5 + 1 = 28

C3 qatlamidagi o'rganiladigan parametrlar sonining aniq formulasi:

\text{Params}_{C3} = N_{\text{links}} \times (K_h \times K_w) + C_{\text{out}} = 60 \times (5 \times 5) + 16 = 1500 + 16 = 1516

Kingma va Ba (2015) ta'kidlaganidek, to'liq bog'langan tarmoqlardan farqli ravishda, CNN larda vaznlarning ulashilishi (weight sharing) turli qatlamlarda gradientlarning miqdori (magnitude) keskin farq qilishiga olib keladi; shu sababli [[Adam]] kabi adaptiv optimizatorlar va [[Batch Normalization]] (bunda statistikalar feature map ning barcha pozitsiyalari va mini-batch bo'yicha jamlanadi) CNN larni o'qitishda juda samaralidir.

Qachon va nima uchun CNN hanuz dolzarb?
1998-yilda LeNet-5 o'sha davr CPU hisoblash quvvati va kichik (32x32) o'lchamlar bilan cheklangan bo'lsa-da, keyinchalik GPU larda masshtablangan CNN lar (AlexNet, Inception, ResNet) kompyuter ko'rish sohasining poydevoriga aylandi. Bugungi kunda ham optik belgilarni tanib olish (OCR), bank cheklarini qayta ishlash, tibbiy tasvirlar va cheklangan resursli (embedded) qurilmalarda CNN lar yuqori samaradorlik ko'rsatadi.

6. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch import torch.nn as nn

LeNet-5 C1 qatlamining o'lcham va parametrlarini tekshirish
conv_c1 = nn.Conv2d(in_channels=1, out_channels=6, kernel_size=5, stride=1, padding=0)

x = torch.randn(1, 1, 32, 32) # (batch=1, channel=1, H=32, W=32) out = conv_c1(x)

c1_params = sum(p.numel() for p in conv_c1.parameters()) print("C1 output shape:", out.shape) # torch.Size([1, 6, 28, 28]) print("C1 trainable params:", c1_params) # 6 * 25 + 6 = 156

## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Deep Learning]]
- [[Matrix Operations]]
- [[Tensor]]

**Keyingi mavzular:**
- [[Batch Normalization]]
- [[Transformers]]

**Bog'liq:**
- [[Backpropagation]]
- [[Adam]]

## 8. Tekshirilgan manbalar
- LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). *Gradient-Based Learning Applied to Document Recognition*. Proceedings of the IEEE, 86(11), 2278–2324. DOI: 10.1109/5.726791.
- Kingma, D. P., & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. ICLR 2015. arXiv:1412.6980.
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*. ICML 2015, PMLR 37:448–456.

Fayl: RNN.md
tags:

ai
deep-learning
rnn
architectures aliases:
Recurrent Neural Network
Rekurrent neyron tarmoqlar status: verified level: beginner-to-advanced last_verified: 2026-11-14
RNN (Recurrent Neural Network)
1. Qisqacha ta'rif
Recurrent Neural Network (RNN) — qayta aloqa (feedback connections) ulanishlariga ega bo'lgan neyron tarmoq arxitekturasi bo'lib, yaqin o'tmishdagi kirish hodisalari haqidagi ma'lumotni aktivatsiyalar ("qisqa muddatli xotira") ko'rinishida saqlab, ketma-ketliklarni vaqt qadamlari bo'yicha qayta ishlaydi (Hochreiter & Schmidhuber, 1997).

2. Nima uchun kerak?
Vaqtli ketma-ketliklar va tabiiy tildagi ma'lumotlarda t-vaqt qadamidagi javob oldingi vaqt qadamlaridagi kirish hodisalariga bog'liq bo'ladi. RNN vaqt bo'yicha yoyilganda (unfolded in time) oldingi qadam aktivatsiyalarini keyingi qadamga uzatish orqali ketma-ketliklarni modellash imkonini beradi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Gapni boshidan oxirigacha o'qiyotganingizda har bir so'zni alohida emas, balki oldingi so'zlardan qolgan "qisqa muddatli taassurot" (aktivatsiya) bilan birgalikda tushunasiz. Biroq oddiy RNN da bir jiddiy kamchilik bor: gap juda uzun bo'lsa (masalan, 100 yoki 1000 qadam), xatolik signali orqaga qaytayotganda yo haddan tashqari kattalashib ketadi (Exploding Gradient), yoki butunlay nolga aylanib yo'qolib ketadi (Vanishing Gradient).

4. Qanday ishlaydi? (Level 2 — Intermediate)
Sequential Operation (Ketma-ket ishlash): Vaswani et al. (2017) kontekstida ta'kidlanganidek, RNN lar ketma-ketlikdagi tokenlarni birinchisidan oxirgisigacha bittadan (one token at a time) qayta ishlaydi; ular ketma-ketlikdagi barcha tokenlar ustida parallel ishlay olmaydi.
Error Backflow Muammosi (Hochreiter & Schmidhuber, 1997, Section 1 & 3): Standart rekurrent tarmoqlarda xatolik signali vaqt bo'yicha orqaga tarqatilganda (masalan, Backpropagation Through Time — BPTT da) ikki holat yuz beradi:
Case 1 (Exploding): Xatolik signali eksponensial o'sib, vaznlarning tebranishiga (oscillating weights) olib keladi.
Case 2 (Vanishing): Xatolik signali eksponensial so'nadi, natijada uzoq vaqt oraliqlarini (long time lags) bog'lashni o'rganish juda ko'p vaqt oladi yoki umuman ishlamaydi.
5. Matematik asoslari: Hochreiter (1991 / 1997) Tahlili (Level 3 — Advanced)
Hochreiter va Schmidhuber (1997, Section 3) 1 dan n gacha indeksli kirish bo'lmagan birliklardan iborat to'liq bog'langan rekurrent tarmoqni tahlil qiladi. Har bir k-birlikning vaznli kirishi va aktivatsiyasi:

\text{net}_k(t) = \sum_{i} w_{ki} y_i(t-1), \quad y_k(t) = f_k\left(\text{net}_k(t)\right)$$-vaqtdagi  birligidan  qadam oldingi  vaqtdagi  birligiga qaytuvchi xatolik oqimi quyidagi ko'paytmalar yig'indisi bilan belgilanadi:

\sum_{l_1=1}^{n} \dots \sum_{l_{q-1}=1}^{n} \prod_{m=1}^{q} f'{l_m}\left(\text{net}{l_m}(t-m)\right) w_{l_m l_{m-1}}$$ Bu yerda [F'(t-m)]_{ij} = f'_i(\text{net}_i(t-m)) (agar i = j bo'lsa, aks holda 0) birinchi tartibli hosilalarning diagonal matritsasidir.

Agar barcha m lar uchun \left|f'_{l_m}\left(\text{net}_{l_m}(t-m)\right) w_{l_m l_{m-1}}\right| < 1.0 bo'lsa, eng katta ko'paytma ham q oshgani sari eksponensial ravishda kamayadi (xatolik yo'qoladi va maqbul vaqt ichida hech narsa o'rganilmaydi).
Xususan, agar f_{l_m} standart logistik sigmoid funksiyasi bo'lsa, uning hosilasining maksimal qiymati 0.25 ga teng (\max f'(x) = 0.25). Demak, vaznlarning absolyut qiymati 4.0 dan kichik bo'lsa (|w| < 4.0, ayniqsa o'qitishning boshlang'ich bosqichida), xatolik oqimi nolga intiladi. Kattaroq boshlang'ich vaznlarni ishlatish ham yordam bermaydi, chunki u holda hosila to'yinish (saturation) tufayli nolga intiladi yoki gradient portlab ketadi.
6. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch import torch.nn as nn

Oddiy RNN: input_size=4, hidden_size=8
rnn = nn.RNN(input_size=4, hidden_size=8, num_layers=1, batch_first=True)

Kirish ketma-ketligi: (batch=2, seq_len=5, features=4)
x = torch.randn(2, 5, 4) h0 = torch.zeros(1, 2, 8)

output, hn = rnn(x, h0) print("Output shape (all steps):", output.shape) # torch.Size([2, 5, 8]) print("Final hidden state shape:", hn.shape) # torch.Size([1, 2, 8])

## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Deep Learning]]
- [[Chain Rule]]
- [[Hosila]]

**Keyingi mavzular:**
- [[LSTM]]
- [[Transformers]]

**Bog'liq:**
- [[Backpropagation]]
- [[Memory]]

## 8. Tekshirilgan manbalar
- Hochreiter, S., & Schmidhuber, J. (1997). *Long Short-Term Memory*. Neural Computation, 9(8), 1735–1780. DOI: 10.1162/neco.1997.9.8.1735.
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.

Standart RNN lardagi gradientning eksponensial so'nish yoki portlash muammosini hal qilish uchun Hochreiter va Schmidhuber (1997) Constant Error Carousel (CEC) mexanizmiga asoslangan LSTM arxitekturasini yaratdilar. Quyidagi sxemada 1997-yilgi original LSTM xotira katakchasining ichki tuzilmasi va o'zgarmas xatolik oqimi ko'rsatilgan.

Fayl: LSTM.md
tags:

ai
deep-learning
lstm
architectures aliases:
Long Short-Term Memory
CEC status: verified level: beginner-to-advanced last_verified: 2026-11-14
LSTM (Long Short-Term Memory)
1. Qisqacha ta'rif
Long Short-Term Memory (LSTM) — 1997-yilda Sepp Hochreiter va Jürgen Schmidhuber (Neural Computation, 9(8):1735–1780) tomonidan [[RNN]] lardagi xatolikning orqaga oqimi (error backflow — vanishing va exploding gradients) muammolarini hal qilish uchun taklif etilgan, maxsus xotira katakchalari ichidagi Constant Error Carousel (CEC) orqali o'zgarmas xatolik oqimini ta'minlovchi rekurrent neyron tarmoq arxitekturasi va gradientga asoslangan o'qitish algoritmi.

2. Nima uchun kerak?
Oddiy rekurrent tarmoqlar va adaptiv ketma-ketlik bo'laklovchilar (chunker systems) shovqin darajasi oshganda va kirish ketma-ketliklari siqilmaydigan (incompressible) bo'lganda uzoq vaqt oraliqlarini bog'lay olmaydi. LSTM esa qisqa vaqt oraliqlaridagi qobiliyatini yo'qotmagan holda, shovqinli va siqilmaydigan kirish ketma-ketliklarida ham 1000 diskret vaqt qadamidan ortiq (in excess of 1000 discrete-time steps) minimal vaqt kechikishlarini bog'lashni o'rgana oladi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Oddiy RNN da xotira har qadamda nochiziqli funksiyadan va vaznlardan o'tib, o'z kuchini yo'qotadi. LSTM esa har bir xotira katakchasi markaziga chiziqli aylanma halqa — Constant Error Carousel (CEC) o'rnatadi. Bu halqaning o'z-o'ziga ulanish vazni qat'iy 1.0 ga teng bo'lgani uchun ichidagi ma'lumot va xatolik signali vaqt o'tishi bilan na ko'payib ketadi (exploding), na kamayib ketadi (vanishing). Katakchaga faqat Input Gate ruxsat bergan ma'lumot kiradi va undan faqat Output Gate ruxsat bergan ma'lumot tashqariga chiqadi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
Hochreiter va Schmidhuber (1997, Section 3 & 4) bo'yicha LSTM arxitekturasining ichki komponentlari:

Constant Error Carousel (CEC): Har bir j-birlikda xatolik oqimi o'zgarmas bo'lishi uchun aktivatsiya funksiyasi chiziqli bo'lishi va birlik aktivatsiyasi o'zgarmas qolishi kerak: y_j(t+1) = f_j\left(\text{net}_j(t+1)\right) = f_j\left(w_{jj} y_j(t)\right) = y_j(t) Tajribalarda bunga ayniyat funksiyasi f_j(x) = x, \forall x ni tanlash va o'z-o'ziga ulanish vaznini w_{jj} = 1.0 deb belgilash orqali erishiladi. Bu Constant Error Carousel (CEC) deb ataladi va LSTM ning markaziy xususiyati hisoblanadi.
Input Gate (\text{in}_j) va Output Gate (\text{out}_j): Har bir c_j xotira katakchasi markaziy chiziqli birlik (CEC) atrofida quriladi. \text{net}_{c_j} kirishidan tashqari, c_j ikkita ko'paytiruvchi birlikdan — Output Gate (\text{out}_j) va Input Gate (\text{in}_j) dan signal oladi.
Memory Cell Blocks: Bir xil Input Gate va bir xil Output Gate ni o'zaro bo'lishuvchi S ta xotira katakchalari "S o'lchamli xotira katakchalari bloki" (memory cell block of size S) ni hosil qiladi; bu taqsimlangan kirishlarni saqlashni osonlashtiradi.
Truncated Gradient (Kesilgan gradient): Xatolik signali CEC ichida o'zgarmas oqadi; faqatgina xatolik xotira katakchasidan Input Gate va g funksiyasi orqali tashqariga chiqqandagina, u Input Gate aktivatsiyasi va g' ga ko'paytiriladi, kiruvchi vaznlarni o'zgartirish uchun xizmat qiladi va so'ngra arxitekturaning maxsus nuqtalarida kesiladi (truncated — bu uzoq muddatli xatolik oqimiga zarar yetkazmaydi).
5. Matematik asoslari (Level 3 — Advanced)
Hochreiter & Schmidhuber (1997, Section 4) formulasiga ko'ra, t vaqt qadamida c_j xotira katakchasining ichki holati s_{c_j}(t) va chiqishi y^{c_j}(t) quyidagicha hisoblanadi:

s_{c_j}(0) = 0 \\ s_{c_j}(t) = s_{c_j}(t-1) + y^{\text{in}_j}(t) \, g\left(\text{net}_{c_j}(t)\right) \quad (t > 0 \text{ uchun}) \\ y^{c_j}(t) = y^{\text{out}_j}(t) \, h\left(s_{c_j}(t)\right)

Bu yerda:

s_{c_j}(t) — xotira katakchasining ichki holati (internal state / CEC),
y^{\text{in}_j}(t) — Input Gate ning t-vaqtdagi chiqish aktivatsiyasi,
y^{\text{out}_j}(t) — Output Gate ning t-vaqtdagi chiqish aktivatsiyasi,
g(\cdot) — \text{net}_{c_j} kirishini siquvchi (squashes) differensiallanuvchi funksiya,
h(\cdot) — ichki holat s_{c_j} dan hisoblangan katakcha chiqishini masshtablovchi (scales) differensiallanuvchi funksiya.
Tarixiy va freymvork eslatmasi: Original 1997-yilgi maqolada ichki holat yuqoridagi formulada ko'rsatilganidek s_{c_j}(t-1) ga qo'shib borilgan (unda Forget Gate bo'lmagan). Zamonaviy PyTorch nn.LSTM implementatsiyasi esa keyingi tadqiqotlarda kiritilgan Forget Gate bilan ishlaydi. Shuningdek, 2016–2017 yillarda mashina tarjimasida 380M parametrli ikki qismli (Encoder-Decoder) LSTM modellari (1-encoder qatlami bidirectional, qolgan 7 ta encoder va 8 ta decoder qatlami unidirectional) o'n yil davomida ishlab chiqilgan statistik yondashuvlardan ustun kelgan, keyinchalik esa parallelizm tufayli o'rnini [[Transformers]] ga bo'shatib bergan.

6. Python / PyTorch Amaliy Misoli
Quyida original 1997-yilgi LSTM katakchasining (s_{c_j}(t) va y^{c_j}(t)) PyTorch tenzorlarida bevosita ifodalanishi ko'rsatilgan (Illyustrativ kod, o'quv maqsadida):python import torch

Original 1997-yilgi LSTM katakchasining bitta vaqt qadami:
s_c(t) = s_c(t-1) + y_in(t) * g(net_c(t))
y_c(t) = y_out(t) * h(s_c(t))
s_prev = torch.tensor([0.5]) # s_{c_j}(t-1) net_c = torch.tensor([1.2]) # net_{c_j}(t) y_in = torch.sigmoid(torch.tensor([0.8])) # Input gate activation y_out = torch.sigmoid(torch.tensor([1.5])) # Output gate activation

g_net = torch.tanh(net_c) # Squashing function g s_curr = s_prev + y_in * g_net # CEC internal state update (w_jj = 1.0) y_c = y_out * torch.tanh(s_curr) # Cell output with scaling function h

print("Updated internal state s_c(t):", round(s_curr.item(), 4)) print("Cell output y_c(t):", round(y_c.item(), 4))

## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[RNN]]
- [[Chain Rule]]
- [[Hosila]]

**Keyingi mavzular:**
- [[Transformers]]
- [[Memory]]

**Bog'liq:**
- [[Backpropagation]]
- [[Gradient Descent]]

## 8. Tekshirilgan manbalar
- Hochreiter, S., & Schmidhuber, J. (1997). *Long Short-Term Memory*. Neural Computation, 9(8), 1735–1780. DOI: 10.1162/neco.1997.9.8.1735.
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.

Bo'lim E: Model Training (va Bo'lim F bilan Kanonik Integratsiya)
Chuqur neyron tarmoqlarni o'qitishni tezlashtirish va barqarorlashtirishda Ioffe va Szegedy (2015) tomonidan kiritilgan Batch Normalization muhim burilish yasadi. Shu bilan birga, maqoladagi tajriba natijalarini tahlil qilishda faqatgina BN qatlamini qo'shish (BN-Baseline) hamda o'rganish tezligini 5 baravarga oshirib, regulyarizatsiyani o'zgartirish (BN-x5) o'rtasidagi farqni aniq ko'rsatish talab etiladi. Quyidagi grafikda Ioffe va Szegedy (2015) ning ImageNet bo'yicha rasmiy tajriba ko'rsatkichlari taqqoslangan.

Fayl: Gradient Descent.md (Kanonik Konspekt: Training + Math)
tags:

ai
deep-learning
training
optimization
math aliases:
Gradient Descent (Math)
Gradient tushish usuli status: verified level: beginner-to-advanced last_verified: 2026-11-14
Gradient Descent (Matematik Asoslari va Muhandislik Implementatsiyasi)
(Eslatma: Ushbu kanonik konspekt Model Training bo'limidagi [[Gradient Descent]] hamda Mathematics for Deep Learning bo'limidagi [[Gradient Descent (Math)]] mavzularini dublikatsiz yagona manbada birlashtiradi.)

1. Qisqacha ta'rif
Gradient Descent — differensiallanuvchi yo'qotish funksiyasi E_p = D(D_p, F(Z_p, W)) ni minimallashtirish uchun birinchi tartibli iterativ optimallashtirish algoritmi bo'lib, model parametrlarini (\theta yoki W) funksiyaning gradientiga ([[Gradient]]) qarama-qarshi yo'nalishda qadam-baqadam yangilab boradi.

2. Nima uchun kerak?
Hochreiter va Schmidhuber (1997) ta'kidlaganidek, tasodifiy vaznlarni taxmin qilish (simple weight guessing) faqat juda oddiy o'yinchoq muammolarni yecha oladi; ko'p erkin parametrlarga (masalan, kirish vaznlariga) yoki yuqori vazn aniqligiga ega bo'lgan real vazifalarda tasodifiy taxmin qilish mutlaqo imkonsiz (completely infeasible) bo'lib qoladi. Gradient Descent vaznlarni xatolik kamayadigan yo'nalishda maqsadli yangilash imkonini beradi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Qalin tumanda tog' yonbag'rida turibsiz va eng pastdagi vodiyga (xatolik eng kam bo'lgan nuqtaga) tushmoqchisiz. Oyog'ingiz ostidagi yer qaysi tomonga eng tik ko'tarilayotganini sezishingiz mumkin — bu [[Gradient]] yo'nalishidir. Pastga tushish uchun gradientga qarama-qarshi (manfiy) yo'nalishda qadam tashlaysiz. Qadamingizning kattaligi esa [[Learning Rate]] (\alpha) hisoblanadi.

4. Matematik asoslari (Level 3 — Mathematical Foundations)
Faraz qilaylik, \theta_t \in \mathbb{R}^d — t-qadamdagi parametrlar vektori, f_t(\theta_t) — t-qadamdagi maqsad (loss) funksiyasi va \nabla f_t(\theta_t) — uning gradienti, \alpha esa o'rganish tezligi bo'lsin. Standart Gradient Descent yangilanish tenglamasi:

\theta_{t+1} = \theta_t - \alpha \nabla f_t(\theta_t)



\theta_{t+1} = (1 - \lambda)\theta_t - \alpha \nabla f_t(\theta_t)

Qadam-baqadam Sonli Misol (Worked Numerical Example)
Faraz qilaylik, bitta parametrli kvadratik yo'qotish funksiyasi berilgan:

f(\theta) = (\theta - 3)^2

Boshlang'ich qiymat \theta_0 = 7.0 va o'rganish tezligi \alpha = 0.25 bo'lsin (\lambda = 0).

1-qadam (Hosila formulasini topish): \frac{df(\theta)}{d\theta} = 2(\theta - 3)
2-qadam (\theta_0 = 7.0 nuqtadagi gradientni hisoblash): \nabla f(7.0) = 2(7.0 - 3) = 2(4.0) = 8.0 (Boshlang'ich xatolik: f(7.0) = (7.0 - 3)^2 = 16.0).
3-qadam (Parametrni yangilash): \theta_1 = \theta_0 - \alpha \nabla f(\theta_0) = 7.0 - 0.25 \times 8.0 = 7.0 - 2.0 = 5.0 (Yangi xatolik: f(5.0) = (5.0 - 3)^2 = 4.0 — xatolik 16.0 dan 4.0 ga tushdi).
4-qadam (Ikkinchi iteratsiya): \nabla f(5.0) = 2(5.0 - 3) = 4.0 \theta_2 = 5.0 - 0.25 \times 4.0 = 5.0 - 1.0 = 4.0 (Yangi xatolik: f(4.0) = (4.0 - 3)^2 = 1.0).
5. Muhandislik Implementatsiyasi: Mini-Batches va GPU (Level 2 & Level 3)
Ioffe va Szegedy (2015, Section 1) tahliliga ko'ra, N ta namunadan iborat o'quv to'plamida har qadamda m ta namunadan iborat mini-batch (x_1, \dots, x_m) ishlatiladi:

\frac{1}{m} \sum_{i=1}^{m} \frac{\partial \ell(x_i, \Theta)}{\partial \Theta}

Mini-batch yondashuvining ikkita fundamental muhandislik sababi bor:

Mini-batch bo'yicha hisoblangan gradient o'quv to'plami ustidagi haqiqiy gradientning bahosi (estimate) bo'lib, batch hajmi m kattalashgani sari uning sifati yaxshilanadi.
Zamonaviy hisoblash platformalarida (GPU larda) bitta mini-batch ustida hisoblashni bajarish alohida namunalar uchun m marta hisoblash bajarishdan ko'ra ancha samaralidir.
Muhim Muhandislik Cheklovlari (Rumelhart et al., 1986)
Differensiallash (backward pass) davomida aynan bir xil forward pass vaznlaridan foydalaniladi va barcha parametr hosilalari hisoblab bo'lingandan so'nggina alohida qadamda parametrlar yangilanadi.
To'g'ri hisoblangan gradient ma'lum bir yangilanish jadvali global optimumga yetishishini kafolatlamaydi: gradient qiyin, yomon shartlangan (poorly conditioned) yoki lokal jihatdan noqulay optimallashtirish landshafti bo'ylab yo'nalgan bo'lishi mumkin.
6. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch

Yuqoridagi sonli misolni PyTorch Autograd bilan tekshirish: f(theta) = (theta - 3)^2
theta = torch.tensor([7.0], requires_grad=True) lr = 0.25

for step in range(1, 3): # 1. Forward pass loss = (theta - 3.0) 2

# 2. Backward pass (gradientni hisoblash) loss.backward()

print(f"Qadam {step}: theta = {theta.item():.2f}, loss = {loss.item():.2f}, grad = {theta.grad.item():.2f}")

# 3. Parameter update (differensiallash tugagach, alohida qadamda) with torch.no_grad(): theta -= lr * theta.grad

# 4. Keyingi qadam uchun gradientni nolga tushirish theta.grad.zero_()

## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Hosila]]
- [[Partial Derivative]]
- [[Gradient]]

**Keyingi mavzular:**
- [[Backpropagation]]
- [[SGD]]
- [[Adam]]
- [[Optimizers]]

**Bog'liq:**
- [[Learning Rate]]
- [[Loss Functions]]

## 8. Tekshirilgan manbalar
- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). *Learning representations by back-propagating errors*. Nature, 323, 533–536. DOI: 10.1038/323533a0.
- LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). *Gradient-Based Learning Applied to Document Recognition*. Proceedings of the IEEE, 86(11), 2278–2324.
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*. ICML 2015, PMLR 37:448–456.
- Loshchilov, I., & Hutter, F. (2019). *Decoupled Weight Decay Regularization*. ICLR 2019. arXiv:1711.05101.

Fayl: Backpropagation.md
tags:

ai
deep-learning
training
backpropagation aliases:
Backprop
Error Back-Propagation status: verified level: beginner-to-advanced last_verified: 2026-11-14
Backpropagation
1. Qisqacha ta'rif
Backpropagation (Xatoliklarni orqaga tarqatish) — tarmoqning haqiqiy chiqish vektori va kerakli (desired) chiqish vektori o'rtasidagi farq o'lchovini minimallashtirish uchun ulanish vaznlarini qayta-qayta moslashtiruvchi, chiqishdan kirishga qarab [[Chain Rule]] bo'yicha hosilalarni hisoblovchi algoritm (Rumelhart, Hinton, & Williams, 1986).

2. Nima uchun kerak?
Ilk bir qatlamli Perceptron o'qitish usullari yashirin birliklarda (hidden units) yangi foydali belgilarni (features) yarata olmagan. Rumelhart et al. (1986, Nature 323, pp. 533–536; maqolaning o'zida David Parker va Yann LeCun tomonidan mustaqil qayta kashf etilgani ham qayd etilgan) ko'rsatganidek, Backpropagation yashirin birliklarga oldindan nishon (target) bermasdan, faqat chiqish maqsadidan kelib chiqib vazifa sohasining muhim ichki tasvirlarini (internal representations) o'rganish imkonini beradi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Ikki kirish, ikki yashirin birlik va ikki chiqishga ega tarmoqni tasavvur qiling. Yashirin qatlamdagi har bir neyron ikkala chiqish bashoratiga ham ta'sir qiladi. Demak, xatolik orqaga qaytayotganda, har bir yashirin neyron ikkala chiqishdan kelgan xatolik hissalarining yig'indisini qabul qilib oladi. Faqat bitta yo'lni tanlash gradientning bir qismini yo'qotib qo'yadi; teskari o'tish (reverse pass) haqiqiy hisoblash grafidagi barcha yo'llarni jamlaydi va aynan shu xususiyat algoritmga yuqori hisoblash samaradorligini beradi.

4. Qanday ishlaydi? (Level 2 — Intermediate)
Rumelhart et al. (1986) bo'yicha jarayon quyidagi qadamlardan iborat:

Forward Computation (Oldinga hisoblash): Qatlamli feed-forward tarmoqda har bir kirish bo'lmagan birlik oldingi birliklarning vaznli chiqishlarini qo'shadi (z_j, original maqolada x_j deb belgilangan) va sigmoid funksiyasini qo'llaydi. Siljish (bias) doimiy 1 ga mahkamlangan qo'shimcha birlikdan keluvchi ulanish sifatida ifodalanishi mumkin. Har qanday hosila hisoblanishidan oldin tarmoq chiqishi aniqlanadi.
Output Derivative (Chiqish qatlami hosilasi): Chiqish qatlami boshlang'ich hosilani beradi.
Reverse Recurrence (Yashirin birliklar uchun yig'indi): Har bir yashirin birlik o'zidan signal olgan barcha keyingi (downstream) iste'molchi birliklar bo'yicha hosilalar yig'indisini oladi.
Weight Update: Differensiallash davomida aynan bir xil forward vaznlari ishlatiladi, so'ngra alohida qadamda parametrlar yangilanadi.
5. Matematik asoslari va Finite Differences Tekshiruvi (Level 3 — Advanced)
Oldinga o'tish: z_j = \sum_{i} w_{ji} a_i + b_j, \quad a_j = \sigma(z_j) = \frac{1}{1 + e^{-z_j}}
Teskari rekursiya (Reverse recurrence): Chiqish qatlamidagi k-birliklar uchun \delta_k = \frac{\partial E}{\partial z_k} topilgach, yashirin qatlamdagi j-birlik barcha k iste'molchilaridan kelgan hissalarni qo'shadi: \frac{\partial E}{\partial a_j} = \sum_{k} \delta_k w_{kj}, \quad \delta_j = \frac{\partial E}{\partial z_j} = \sigma'(z_j) \sum_{k} \delta_k w_{kj} Vazn va bias hosilalari: \frac{\partial E}{\partial w_{ji}} = \delta_j a_i, \quad \frac{\partial E}{\partial b_j} = \delta_j
Qarama-qarshi ishorali yo'llarning qisqarishi (Path Cancellation)
Ikki chiqishli tarmoqda bitta yashirin birlik birinchi chiqishdan musbat, ikkinchi chiqishdan manfiy gradient ulushi olishi mumkin. Bu qarama-qarshi ishorali yo'llar yig'indida bir-birini qisman qisqartirishi (partly cancel) mumkin. Biroq yig'indining kichik chiqishi har bir alohida ta'sir kichik degani emas va hech bir yo'lni e'tiborsiz qoldirib bo'lmaydi.

Finite Differences (Chekli ayirmalar bilan tekshirish)
Har bir vazn va bias hosilasining to'g'riligini tekshirish uchun parametrni \pm \varepsilon ga siljitib, ikkita mustaqil forward pass orqali chekli ayirma hisoblanadi:

\frac{\partial E}{\partial \theta} \approx \frac{E(\theta + \varepsilon) - E(\theta - \varepsilon)}{2\varepsilon}

6. Python Amaliy Misoli (NumPy + Finite Difference Verification)
(Illyustrativ kod, o'quv maqsadida):python import numpy as np

def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))

def forward_loss(x, w1, b1, w2, b2, targets): z_h = w1 * x + b1 a_h = sigmoid(z_h) z_out = w2 * a_h + b2 a_out = sigmoid(z_out) loss = 0.5 * np.sum((a_out - targets) 2) return loss, a_h, a_out

x = 1.2 w1, b1 = 0.5, -0.1 w2 = np.array([0.8, -0.6]) # 2 ta chiqish (musbat va manfiy yo'l) b2 = np.array([0.1, 0.2]) targets = np.array([1.0, 0.0])

1. Analitik Backpropagation
loss, a_h, a_out = forward_loss(x, w1, b1, w2, b2, targets) delta_out = (a_out - targets) * (a_out * (1.0 - a_out)) delta_h = np.sum(delta_out * w2) * (a_h * (1.0 - a_h)) # Ikkala chiqish yig'indisi grad_w1_analytic = delta_h * x

2. Finite Difference Check
eps = 1e-5 loss_plus, _, _ = forward_loss(x, w1 + eps, b1, w2, b2, targets) loss_minus, _, _ = forward_loss(x, w1 - eps, b1, w2, b2, targets) grad_w1_fd = (loss_plus - loss_minus) / (2.0 * eps)

print("Analitik grad_w1:", round(grad_w1_analytic, 7)) print("Finite difference grad_w1:", round(grad_w1_fd, 7))

## 7. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Hosila]]
- [[Partial Derivative]]
- [[Chain Rule]]

**Keyingi mavzular:**
- [[Gradient Descent]]
- [[Optimizers]]
- [[Batch Normalization]]

**Bog'liq:**
- [[Deep Learning]]
- [[LSTM]]

## 8. Tekshirilgan manbalar
- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). *Learning representations by back-propagating errors*. Nature, 323, 533–536. DOI: 10.1038/323533a0.

Fayl: Learning Rate.md
tags:

ai
deep-learning
training
hyperparameters aliases:
Step Size
O'rganish tezligi
Learning Rate Schedule status: verified level: beginner-to-advanced last_verified: 2026-11-14
Learning Rate
1. Qisqacha ta'rif
Learning Rate (\alpha, Step Size) — [[Gradient Descent]] va stoxastik optimallashtirish algoritmlarida har bir qadamda parametrlar gradient yo'nalishi bo'yicha qanchalik katta miqdorga o'zgarishini belgilovchi giperparametr.

2. Nima uchun kerak?
Ioffe va Szegedy (2015) ko'rsatganidek, chuqur tarmoqlarni o'qitish odatda ehtiyotkor (kichik) o'rganish tezligini talab qiladi:

Odatda katta learning rate qatlam parametrlarining masshtabini (scale) oshirib yuboradi, bu esa [[Backpropagation]] davomida gradientlarni yanada kuchaytirib, modelning portlashiga (divergence) olib keladi. Masalan, Batch Normalization siz Inception tarmog'ida boshlang'ich learning rate ni (\alpha = 0.0015 dan) 5 baravar oshirish parametrlarni mashina cheksizligiga (machine infinity) olib chiqib ketgan.
Aksincha, [[Batch Normalization]] qo'llanilganda o'qitish parametrlar masshtabiga chidamli (resilient) bo'lib, 5 baravar yuqori learning rate (BN-x5) bilan o'qitishni keskin tezlashtirish imkonini beradi.
3. Learning Rate Schedules va Nazariy Xossalar (Level 1 — Level 3)
Step Size Bounding va Natural Annealing (Kingma & Ba, 2015): [[Adam]] optimizatorida qadam kattaligi \alpha giperparametri bilan taxminiy chegaralangan (approximately bounded by the stepsize hyperparameter). Shuningdek, optimumga yaqinlashganda signal-shovqin nisbati (m_t / \sqrt{v_t}) nolga intilib, qadam kattaligining tabiiy kichrayishi (automatic step size annealing) yuz beradi.
1/\sqrt{t} Decay Schedule (Kingma & Ba, 2015): Adam konvergensiya teoremasi (Theorem 4.1) va MNIST logistik regressiya tajribalarida qadam kattaligi vaqt qadami t bo'yicha quyidagicha kamaytiriladi: \alpha_t = \frac{\alpha}{\sqrt{t}}
Fixed, Drop-Step va Cosine / Cyclical Schedules (Loshchilov & Hutter, 2019): Loshchilov va Hutter (2019, Section 4.1) Adam va AdamW ni uch xil o'rganish tezligi jadvali (fixed learning rate, drop-step schedule va cosine/cyclical schedules) ustida baholab, vazn so'nishini ajratish (Decoupled Weight Decay) optimal learning rate \alpha va weight decay \lambda giperparametrlarini bir-biridan ancha mustaqil qilishini isbotlaganlar.
4. Bog'liq tushunchalar
Oldin o'rganish:

[[Gradient Descent]]
[[Gradient]]
Keyingi mavzular:

[[Optimizers]]
[[Adam]]
[[Batch Normalization]]
Bog'liq:

[[SGD]]
5. Tekshirilgan manbalar
Ioffe, S., & Szegedy, C. (2015). Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift. ICML 2015, PMLR 37:448–456.
Kingma, D. P., & Ba, J. (2015). Adam: A Method for Stochastic Optimization. ICLR 2015. arXiv:1412.6980.
Loshchilov, I., & Hutter, F. (2019). Decoupled Weight Decay Regularization. ICLR 2019. arXiv:1711.05101.
Fayl: Loss Functions.md
tags:

ai
deep-learning
training
loss-functions aliases:
Loss Function
Objective Function
Cost Function status: verified level: beginner-to-advanced last_verified: 2026-11-14
Loss Functions (Yo'qotish Funksiyalari)
1. Qisqacha ta'rif
Loss Function (Objective / Cost Function) — modelning bashorati Y_p = F(Z_p, W) va kerakli nishon chiqish D_p o'rtasidagi farqni (discrepancy) o'lchovchi funksiya: E_p = D(D_p, F(Z_p, W)) (LeCun et al., 1998).

2. Nima uchun kerak?
[[Backpropagation]] va [[Gradient Descent]] ulanish vaznlarini qaysi yo'nalishda o'zgartirishni bilishi uchun tarmoqning haqiqiy chiqish vektori va kerakli chiqish vektori o'rtasidagi tafovut differensiallanuvchi skalyar o'lchov sifatida ifodalanishi shart (Rumelhart et al., 1986).

3. Tasdiqlangan Yo'qotish Funksiyalari va Regulyarizatsiya (Level 1 — Level 3)
Squared Difference / Euclidean Prototype Distance:
Rumelhart et al. (1986) da haqiqiy va kerakli chiqish vektorlari orasidagi farq o'lchovi minimallashtiriladi.
LeCun et al. (1998, Section II-B, Equation 7) LeNet-5 ning oxirgi bosqichida sinf prototiplariga (\pm 1 bitli 7x12 shablonlarga) nisbatan kvadratik masofani (squared distance to a prototype) xatolik jarimasi sifatida hisoblaydi.
L_2-Regularized Multi-Class Logistic Regression (Kingma & Ba, 2015, Section 6): Ko'p sinfli klassifikatsiya vazifalarida (masalan, MNIST da) yaxshi o'rganilgan qavariq (convex) maqsad funksiyasi bo'lgan logistik regressiya (Cross-Entropy) va L_2 regulyarizatsiya hadidan foydalaniladi.
Label Smoothing Regularization (Vaswani et al., 2017): [[Transformers]] o'qitishda Dropout bilan bir qatorda chiqish taqsimoti uchun Label Smoothing regulyarizatsiyasi qo'llaniladi.
Global Loss Functions in Multi-Module Pipelines (LeCun et al., 1998): Graph Transformer Networks (GTNs) da bir nechta modullardan iborat hujjat tanish tizimi (segmentatsiya, tanish, til modeli) yagona global yo'qotish funksiyasi (masalan, perceptron-like loss) yordamida birgalikda o'qitiladi.
Training vs. Validation / Test Performance va Generalization
Loshchilov va Hutter (2019) hamda Ioffe va Szegedy (2015) tahlillarida ko'rsatilganidek, modelning o'quv to'plamidagi xatoligi (training performance) yaxshi bo'lishi uning validatsiya va test to'plamida ham yaxshi umumlashtirishini (generalization) avtomatik bildirmaydi (overfitting). Umumlashtirishni yaxshilash uchun Decoupled Weight Decay ([[Adam]], [[SGD]]), Dropout va [[Batch Normalization]] qo'llaniladi.

4. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch import torch.nn as nn

Label smoothing bilan Cross-Entropy Loss (Vaswani et al., 2017)
criterion = nn.CrossEntropyLoss(label_smoothing=0.1)

logits = torch.tensor([[2.5, 0.3, -1.2], [0.2, 1.8, 0.5]]) targets = torch.tensor([0, 1])

loss = criterion(logits, targets) print("Cross-Entropy Loss (with label smoothing):", round(loss.item(), 4))

## 5. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Machine Learning]]
- [[Probability]]
- [[Hosila]]

**Keyingi mavzular:**
- [[Backpropagation]]
- [[Gradient Descent]]
- [[Optimizers]]

**Bog'liq:**
- [[LLM]]
- [[CNN]]

## 6. Tekshirilgan manbalar
- LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). *Gradient-Based Learning Applied to Document Recognition*. Proceedings of the IEEE, 86(11), 2278–2324.
- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). *Learning representations by back-propagating errors*. Nature, 323, 533–536.
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.
- Kingma, D. P., & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. ICLR 2015. arXiv:1412.6980.

Fayl: Optimizers.md
tags:

ai
deep-learning
training
optimizers aliases:
Optimizer
Optimallashtirish algoritmlari status: verified level: beginner-to-advanced last_verified: 2026-11-14
Optimizers (Optimallashtiruvchilar)
1. Qisqacha ta'rif
Optimizers — stoxastik maqsad funksiyalarining gradientlari (\nabla f_t(\theta_t)) va ularning quyi tartibli momentlari asosida neyron tarmoq parametrlarini yangilovchi algoritmlar.

2. Nima uchun kerak?
Chuqur neyron tarmoqlarda (masalan, [[CNN]] larda vazn ulashilishi tufayli) turli qatlamlarda gradientlar juda farqli masshtablarga ega bo'ladi, ba'zi vazifalarda esa gradientlar siyrak (sparse) yoki maqsad funksiyasi nostatsionar (non-stationary) bo'ladi (Kingma & Ba, 2015). Optimizatorlar ushbu sharoitlarda tez konvergensiya va yaxshi umumlashtirishni (generalization) ta'minlaydi.

3. Asosiy Optimizatorlarning Ilmiy Taqqoslanishi (Level 1 — Level 3)
Kingma & Ba (2015, Section 1 & 5) hamda Loshchilov & Hutter (2019, Section 2) asosida optimizatorlarning taqqoslanishi:

Optimizator

Asosiy mexanizmi

AdaGrad / RMSProp / Adam bilan bog'liqligi va farqi

Regulyarizatsiya va Generalization xususiyati

[[SGD]] (with Momentum)

Gradient va 1-moment (m_t) yordamida yangilash

Prekonditsioner M_t = kI (adaptiv masshtablash yo'q)

Standart SGD da L_2 regulyarizatsiya va Weight Decay ekvivalent (ammo \lambda' = \lambda/\alpha orqali \alpha ga bog'langan). Ko'pincha adaptiv usullardan yaxshiroq umumlashtiradi.

AdaGrad (Duchi et al., 2011)

Siyrak gradientlar uchun adaptiv qadam

Kingma & Ba (2015) ko'rsatganidek, AdaGrad — bu Adam ning \beta_1 = 0, cheksiz kichik (1 - \beta_2) va bias correction siz versiyasiga mos keladi

Siyrak gradientlarda samarali.

RMSProp (with Momentum)

Kvadratik gradientning sirpanuvchi o'rtachasi

RMSProp with momentum o'z yangilanishlarini masshtablangan gradient ustida momentum olib hosil qiladi va bias-correction hadiga ega emas

Nostatsionar vazifalarda ishlaydi, ammo kichik \beta_2 yoki boshlang'ich qadamlarda bias correction yo'qligi katta qadamlarga olib keladi.

[[Adam]] (Kingma & Ba, 2015)

1-moment (m_t) va 2-xom moment (v_t) ning sirpanuvchi o'rtachasi

AdaGrad va RMSProp ustunliklarini birlashtiradi; Initialisation Bias Correction (\hat{m}_t, \hat{v}_t) kiritilgan

Standart L_2 regulyarizatsiya Adam da samarasiz, chunki regulyarizator gradienti ham adaptiv masshtablanib ketadi.

AdaMax (Kingma & Ba, 2015)

L_\infty (infinity norm) ga asoslangan Adam varianti

2-moment L_2 normasi o'rniga cheksizlik normasiga asoslanadi

Maxsus barqarorlik talab qilinadigan holatlar uchun.

AdamW (Loshchilov & Hutter, 2019)

Adam + Decoupled Weight Decay

Vazn so'nishi (\lambda \theta_{t-1}) adaptiv gradient mexanizmidan alohida qadam sifatida bajariladi

Barcha vaznlarni bir xil \lambda tezlikda regulyarizatsiya qiladi; tasvir klassifikatsiyasida standart Adam ga nisbatan test xatoligini 15% ga kamaytirgan.

Batafsil matematik formulalar, teoremalar va qadam-baqadam sonli misollar uchun [[SGD]] va [[Adam]] kanonik konspektlariga qarang.

4. Bog'liq tushunchalar
Oldin o'rganish:

[[Gradient Descent]]
[[Backpropagation]]
[[Mean]]
[[Standard Deviation]]
Keyingi mavzular:

[[SGD]]
[[Adam]]
[[Batch Normalization]]
Bog'liq:

[[Learning Rate]]
[[Loss Functions]]
5. Tekshirilgan manbalar
Kingma, D. P., & Ba, J. (2015). Adam: A Method for Stochastic Optimization. ICLR 2015. arXiv:1412.6980.
Loshchilov, I., & Hutter, F. (2019). Decoupled Weight Decay Regularization. ICLR 2019. arXiv:1711.05101.
Fayl: Batch Normalization.md
tags:

ai
deep-learning
training
batch-normalization aliases:
BatchNorm
BN status: verified level: beginner-to-advanced last_verified: 2026-11-14
Batch Normalization
1. Qisqacha ta'rif
Batch Normalization (BN) — 2015-yilda Sergey Ioffe va Christian Szegedy (ICML 2015, PMLR 37:448–456; ICML 2025 Test of Time Award sovrindori) tomonidan taklif etilgan, har bir o'quv mini-batchi bo'yicha qatlam kirishlarini (activations) markazlashtirish va masshtablash hamda o'rganiladigan \gamma va \beta parametrlari bilan ifodalash quvvatini tiklash orqali chuqur tarmoqlarni o'qitishni tezlashtiruvchi differensiallanuvchi transformatsiya.

2. Nima uchun kerak?
Ioffe va Szegedy (2015, Section 2) o'qitish davomida tarmoq parametrlari o'zgarishi tufayli ichki tarmoq aktivatsiyalari taqsimotining o'zgarishini Internal Covariate Shift deb ta'riflaganlar. Ilmiy adabiyotda (LeCun et al., 1998b; Wiesler & Ney, 2011) kirish ma'lumotlari oqartirilsa (whitened — ya'ni nol o'rtacha va birlik dispersiyaga chiziqli keltirilsa), tarmoq tezroq yaqinlashishi ma'lum edi. Biroq har bir qatlamni butun o'quv to'plami bo'yicha to'liq oqartirish kovariatsiya matritsasi, uning teskari kvadrat ildizi va hosilalarini hisoblashni talab qilib, juda qimmatga tushadi. Shuningdek, agar normalizatsiya gradient tushish qadamidan tashqarida amalga oshirilsa (masalan, x = u + b ga \hat{x} = x - E[x] qo'llanilsa va gradient qadami E[x] ning b ga bog'liqligini hisobga olmasa), b \leftarrow b + \Delta b yangilanishi keyingi normalizatsiyada qisqarib ketadi:

u + (b + \Delta b) - E[u + (b + \Delta b)] = u + b - E[u + b]

Ya'ni qatlam chiqishi ham, yo'qotish funksiyasi ham umuman o'zgarmaydi, parametr b esa cheksiz o'sib ketaveradi. Batch Normalization har bir skalyar aktivatsiyani mini-batch statistikasi yordamida modelning ichida, differensiallanuvchi tarzda normalizatsiya qiladi, natijada gradient ushbu normalizatsiyani to'liq hisobga oladi.

3. Intuitiv tushuntirish (Level 1 — Beginner)
Agar mini-batch hajmi 32 bo'lsa, har bir iteratsiyada 32 ta namuna tarmoqdan o'tadi. Batch Normalization har bir xususiyat (feature) uchun shu 32 ta namunaning o'rtacha qiymatini (\mu_{\mathcal{B}}) va standart chetlanishini (\sigma_{\mathcal{B}}) hisoblab, qiymatlarni o'rtachasi 0 va dispersiyasi 1 bo'lgan standart diapazonga keltiradi. So'ngra tarmoq o'zining nochiziqli ifodalash quvvatini yo'qotmasligi uchun natijani o'rganiladigan \gamma (scale) ga ko'paytirib, \beta (shift) ni qo'shadi.

4. Matematik asoslari va Algoritm 1 (Level 2 & Level 3)
4.1. Batch Normalizing Transform (Algorithm 1 — Ioffe & Szegedy, 2015)
Mini-batch \mathcal{B} = \{x_{1\dots m}\} ustida har bir x^{(k)} aktivatsiya uchun (soddalik uchun k indeksini tushirib qoldiramiz):

Mini-batch o'rtachasi ([[Mean]]): \mu_{\mathcal{B}} \leftarrow \frac{1}{m} \sum_{i=1}^{m} x_i
Mini-batch dispersiyasi ([[Standard Deviation]] kvadrati): \sigma_{\mathcal{B}}^2 \leftarrow \frac{1}{m} \sum_{i=1}^{m} (x_i - \mu_{\mathcal{B}})^2
Normalizatsiya: \hat{x}_i \leftarrow \frac{x_i - \mu_{\mathcal{B}}}{\sqrt{\sigma_{\mathcal{B}}^2 + \epsilon}} (bu yerda \epsilon — dispersiya nolga teng bo'lganda cheksizlikka bo'lishning oldini oluvchi sonli barqarorlik o'zgarmasi).
Scale and Shift: y_i \leftarrow \gamma \hat{x}_i + \beta \equiv \text{BN}_{\gamma, \beta}(x_i) Agar optimal bo'lsa, tarmoq \gamma^{(k)} = \sqrt{\text{Var}[x^{(k)}]} va \beta^{(k)} = E[x^{(k)}] ni o'rganib, dastlabki aktivatsiyalarni (identity transform) tiklay oladi.
4.2. Training vs. Inference va Convolutional BN
Training (O'qitish): Mini-batch (m > 1) statistikasi ishlatiladi.
Inference (Ishlatish): Mini-batchga bog'liqlik inference vaqtida na zarur va na maqsadga muvofiqdir — chiqish faqat kirishning o'ziga deterministik bog'liq bo'lishi shart. Shu sababli o'qitishdan so'ng batch statistikasi o'rniga populyatsiya baholari (population estimates) qo'yiladi va transformatsiya qat'iy affin akslantirishga (fixed affine map) aylanadi.
Convolutional Layers: [[CNN]] qatlamlarida statistikalar mini-batch va bitta feature map ning barcha fazoviy pozitsiyalari bo'yicha birgalikda jamlanadi (har bir feature map uchun bitta \gamma va bitta \beta).
4.3. ImageNet Eksperimental Natijalari va Ilmiy Munozaralar
14x Tezlanish va BN-x5 Retsepti: Boshlang'ich learning rate 0.0015 bo'lgan Baseline Inception 72.2% single-crop aniqlikka 31.0 million qadamda yetgan. Faqat BN qo'shishning o'zi buni 13.3 million qadamga tushirgan. 2.1 million qadam (14 marta kam qadam) natijasiga esa BN-x5 retseptida — ya'ni BN bilan birga learning rate ni 5 baravar oshirish, Dropout ni olib tashlash, L_2 vazn jarimasini 5 baravar kamaytirish, learning rate decay ni 6 marta tezlashtirish, local response normalization ni olib tashlash va o'quv misollarini yaxshiroq aralashtirish (shuffling — validatsiyada ~1% qo'shgan) orqali erishilgan (BN-x5 da ReLU o'rniga sigmoid qo'yilganda 69.8% maksimal aniqlikka erishilgan, BN siz sigmoid esa tasodifiy taxmin darajasida qolib ketgan).
Ensemble Natijasi: BN-Inception ansambli ImageNet da 4.9% top-5 validation error (50,000 tasvirda, oldingi Deep Image ansamblining 5.98% natijasiga nisbatan) va 4.82% top-5 test error ko'rsatib, inson baholovchilar aniqligidan o'zib ketgan.
Ilmiy munozara va Kichik Batch Cheklovi: BN ning muvaffaqiyati faqat "Internal Covariate Shift" kamayishi bilan bog'liqligi keyingi ishlarda munozaraga sabab bo'lgan (u optimallashtirishni silliqlashi va batch shovqini orqali regulyarizatsiya berishi ta'kidlanadi). Shuningdek, batch hajmi kichik yoki mustaqil bo'lmaganda (masalan, detection va segmentation da har bir GPU da atigi bir nechta rasm bo'lganda) BN aniqligi pasayadi (Ioffe, 2017 — Batch Renormalization; Wu & He, 2018 — Group Normalization).
5. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch import torch.nn as nn

CNN uchun 2D Batch Normalization (6 ta feature map, har biriga bitta gamma va beta)
bn2d = nn.BatchNorm2d(num_features=6, eps=1e-5)

Training mode: mini-batch m=4, C=6, H=14, W=14
bn2d.train() x_batch = torch.randn(4, 6, 14, 14) out_train = bn2d(x_batch)

Inference mode: deterministik, bitta namuna (m=1) bilan ham ishlaydi
bn2d.eval() out_eval = bn2d(x_batch[:1])

print("Gamma shape:", bn2d.weight.shape) # torch.Size([6]) print("Beta shape:", bn2d.bias.shape) # torch.Size([6]) print("Eval output shape:", out_eval.shape) # torch.Size([1, 6, 14, 14])

## 6. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Mean]]
- [[Standard Deviation]]
- [[Backpropagation]]

**Keyingi mavzular:**
- [[CNN]]
- [[Transformers]]

**Bog'liq:**
- [[Learning Rate]]
- [[SGD]]

## 7. Tekshirilgan manbalar
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*. Proceedings of the 32nd International Conference on Machine Learning (ICML 2015), PMLR 37:448–456. arXiv:1502.03167.

Bo'lim F: Mathematics for Deep Learning
Fayl: Math for Deep Learning.md
tags:

ai
math
deep-learning aliases:
Deep Learning Mathematics
Chuqur o'rganish matematikasi status: verified level: beginner-to-advanced last_verified: 2026-11-14
Math for Deep Learning
1. Qisqacha ta'rif
Math for Deep Learning — neyron tarmoqlarda ma'lumotlarni vektorlashgan tenzorlar sifatida tasvirlash, oldinga hisoblash (forward computation), teskari differensiallash ([[Backpropagation]]) va stoxastik optimallashtirishning nazariy asosini tashkil etuvchi to'rtta matematik yo'nalish: Linear Algebra, Calculus, Probability and Statistics hamda Optimization majmuasidir.

2. To'rtta Matematik Bo'lim va Neyron Tarmoqlar Bilan Bog'liqligi
Matematik bo'lim

Kanonik konspektlar

Neyron tarmoqni o'qitishdagi bevosita vazifasi

1. Linear Algebra

[[Vector]], [[Matrix]], [[Matrix Operations]], [[Tensor]]

Kirish ma'lumotlarini ([[Embeddings]], tasvirlar) va qatlam vaznlarini (W) saqlash hamda GPU da parallel ko'paytirish (Q K^T, W x + b) amallarini bajarish.

2. Calculus

[[Hosila]], [[Partial Derivative]], [[Gradient]], [[Chain Rule]]

Yo'qotish funksiyasining har bir parametrga nisbatan sezgirligini hisoblash va [[Backpropagation]] orqali xatolik signalini qatlamlar bo'ylab orqaga uzatish.

3. Probability & Statistics

[[Probability]], [[Mean]], [[Standard Deviation]]

Softmax ehtimolliklarini modellash, [[Batch Normalization]] da aktivatsiyalarni standartlashtirish (\mu_{\mathcal{B}}, \sigma_{\mathcal{B}}^2), [[Transformers]] da \sqrt{d_k} masshtablash va [[Adam]] da 1-/2-momentlarni baholash.

4. Optimization

[[Gradient Descent]], [[SGD]], [[Adam]]

Yuqori o'lchamli parametrlar fazosida yo'qotish funksiyasini iterativ minimallashtirish va Decoupled Weight Decay orqali regulyarizatsiya qilish.

3. Matematik Nazariya va Muhandislik Implementatsiyasi Farqi
Sonli barqarorlik (Numerical Stability): Matematik tenglamalarda bo'lish amali har qanday musbat dispersiya uchun o'rinli bo'lsa, kompyuter xotirasida standart chetlanish nolga teng bo'lib qolganda normalizatsiya cheksizlikka (\infty) ketib qoladi. Shu sababli [[Batch Normalization]] va [[Adam]] algoritmlarida maxrajga kichik \epsilon o'zgarmasi qo'shiladi (Ioffe & Szegedy, 2015; Kingma & Ba, 2015).
Vektorizatsiya va Mini-Batching: Matematik ta'riflarda har bir so'rov q yoki namuna x_i alohida yozilsa, amaliyotda ular Q, K, V matritsalariga va mini-batch tenzorlariga qadoqlanib, zamonaviy GPU larda parallel hisoblanadi (Vaswani et al., 2017; Ioffe & Szegedy, 2015).
4. Bog'liq tushunchalar
Keyingi mavzular:

[[Vector]]
[[Matrix]]
[[Hosila]]
[[Probability]]
[[Gradient Descent]]
5. Tekshirilgan manbalar
Rumelhart, D. E., et al. (1986). Learning representations by back-propagating errors. Nature, 323, 533–536.
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Ioffe, S., & Szegedy, C. (2015). Batch Normalization. ICML 2015.
Kingma, D. P., & Ba, J. (2015). Adam: A Method for Stochastic Optimization. ICLR 2015.
Fayl: Vector.md
tags:

ai
math
linear-algebra aliases:
Vektor
Vectors status: verified level: beginner-to-advanced last_verified: 2026-11-14
Vector (Vektor)
1. Qisqacha ta'rif
Vector (v \in \mathbb{R}^d) — d o'lchamli haqiqiy sonlar fazosidagi element bo'lib, tartiblangan komponentlar to'plamidan (v = [v_1, v_2, \dots, v_d]^T) tashkil topadi.

2. Nima uchun kerak?
Chuqur o'rganishda tokenlarning ma'no tasvirlari ([[Embeddings]]), diqqat mexanizmidagi so'rov va kalitlar (q, k), neyron qatlam aktivatsiyalari hamda parametrlar va ularning gradientlari (\theta_t, \nabla f_t(\theta_t) \in \mathbb{R}^d) vektorlar sifatida ifodalanadi.

3. Matematik Notatsiya va Formulalar (Level 1 — Level 3)
Birlik vektor (Unit Vector e_k — Hochreiter & Schmidhuber, 1997): Faqat k-chi komponenti 1 ga va qolgan barcha komponentlari 0 ga teng bo'lgan vektor: e_k = [0, \dots, 0, 1, 0, \dots, 0]^T
Skalyar ko'paytma (Dot Product — Vaswani et al., 2017): Ikki d_k o'lchamli q va k vektorlarining skalyar ko'paytmasi ularning mos komponentlari ko'paytmalarining yig'indisiga teng: q \cdot k = \sum_{i=1}^{d_k} q_i k_i
Vektor Normalari (L_2 va L_\infty — Kingma & Ba, 2015, Theorem 4.1):
L_2 (Yevklid) normasi: \|x\|_2 = \sqrt{\sum_{i=1}^{d} x_i^2}
L_\infty (Cheksizlik) normasi: \|x\|_\infty = \max_{1 \le i \le d} |x_i| (AdaMax optimizatori aynan shu normaga asoslanadi).
Qadam-baqadam Sonli Misol (Worked Numerical Example)
Berilgan: q = [2, -1, 3]^T va k = [1, 4, 2]^T (d_k = 3).

Skalyar ko'paytma (q \cdot k): q \cdot k = (2 \times 1) + (-1 \times 4) + (3 \times 2) = 2 - 4 + 6 = 4
L_2 normasi (\|q\|_2): \|q\|_2 = \sqrt{2^2 + (-1)^2 + 3^2} = \sqrt{4 + 1 + 9} = \sqrt{14} \approx 3.7417
L_\infty normasi (\|k\|_\infty): \|k\|_\infty = \max(|1|, |4|, |2|) = 4
4. Python / NumPy Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import numpy as np

q = np.array([2.0, -1.0, 3.0]) k = np.array([1.0, 4.0, 2.0])

print("Dot product:", np.dot(q, k)) # 4.0 print("L2 norm of q:", round(np.linalg.norm(q, 2), 4)) # 3.7417 print("L_inf norm of k:", np.linalg.norm(k, np.inf)) # 4.0

## 5. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Math for Deep Learning]]

**Keyingi mavzular:**
- [[Matrix]]
- [[Matrix Operations]]
- [[Embeddings]]
- [[Gradient]]

**Bog'liq:**
- [[Transformers]]

## 6. Tekshirilgan manbalar
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.
- Kingma, D. P., & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. ICLR 2015. arXiv:1412.6980.
- Hochreiter, S., & Schmidhuber, J. (1997). *Long Short-Term Memory*. Neural Computation, 9(8), 1735–1780.

Fayl: Matrix.md
tags:

ai
math
linear-algebra aliases:
Matritsa
Matrices status: verified level: beginner-to-advanced last_verified: 2026-11-14
Matrix (Matritsa)
1. Qisqacha ta'rif
Matrix (W \in \mathbb{R}^{m \times n}) — m ta satr va n ta ustundan iborat ikki o'lchamli sonlar jadvali bo'lib, vektor fazolar orasida chiziqli proyeksiya (linear projection) va vaznli ulanishlarni ifodalaydi.

2. Nima uchun kerak?
Simultaneous Computation (Vaswani et al., 2017): Amaliyotda diqqat funksiyasini alohida so'rovlar ustida bittadan bajarish o'rniga, so'rovlar to'plami bitta Q matritsasiga, kalitlar va qiymatlar esa K va V matritsalariga qadoqlanadi (packed together into matrices Q, K, V).
Linear Projections: [[Transformers]] dagi Multi-Head Attention mexanizmida har bir bosh o'zining o'rganiladigan chiziqli proyeksiya matritsalariga ega bo'ladi (masalan, 3Blue1Brown tahlilidagi GPT-3 da Key va Query matritsalari 12,288 ustun va 128 satrdan iborat).
3. Matematik Notatsiya va Maxsus Matritsalar (Level 1 — Level 3)
Hochreiter va Schmidhuber (1997, Section 3) notatsiyasiga ko'ra, W vazn matritsasining elementlari va ustun/satr vektorlari quyidagicha belgilanadi:

[W v]_i := [W]_{iv} = w_{iv} — v birligidan chiquvchi vazn vektori,
[W_u^T]_i := [W]_{ui} = w_{ui} — u birligiga kiruvchi vazn vektori.
Diagonal matritsa (F'(t-m)): Birinchi tartibli hosilalarning diagonal matritsasi bo'lib: [F'(t-m)]_{ij} = \begin{cases} 0, & \text{agar } i \neq j \\ f'_i\left(\text{net}_i(t-m)\right), & \text{aks holda } (i = j) \end{cases}
Birlik matritsa (I): Loshchilov & Hutter (2019, Proposition 2) da adaptiv optimizatorlarning prekonditsioner matritsasi skalyar birlik matritsaga teng emasligi (M_t \neq k I) ko'rsatilgan.
4. Bog'liq tushunchalar
Oldin o'rganish:

[[Vector]]
Keyingi mavzular:

[[Matrix Operations]]
[[Tensor]]
[[Transformers]]
Bog'liq:

[[Deep Learning]]
5. Tekshirilgan manbalar
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Hochreiter, S., & Schmidhuber, J. (1997). Long Short-Term Memory. Neural Computation, 9(8), 1735–1780.
Loshchilov, I., & Hutter, F. (2019). Decoupled Weight Decay Regularization. ICLR 2019. arXiv:1711.05101.
Sanderson, G. [3Blue1Brown]. (2024). Attention in transformers, step-by-step | Deep Learning Chapter 6. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
Fayl: Matrix Operations.md
tags:

ai
math
linear-algebra aliases:
Matritsa amallari
Matrix Multiplication status: verified level: beginner-to-advanced last_verified: 2026-11-14
Matrix Operations (Matritsa Amallari)
1. Qisqacha ta'rif
Matrix Operations — matritsalarni ko'paytirish (A B), transponirlash (K^T), chiziqli transformatsiya (W x + b) va birlashtirish (concatenation) kabi chiziqli algebra amallari bo'lib, neyron tarmoqlarda barcha qatlam hisoblashlarini GPU da parallel bajarish imkonini beradi.

2. Nima uchun kerak?
[[Transformers]] dagi Scaled Dot-Product Attention formulasida (\text{softmax}(\frac{Q K^T}{\sqrt{d_k}})V) barcha so'rovlar va barcha kalitlar orasidagi skalyar ko'paytmalarni hisoblash uchun Q matritsasi K matritsasining transponirlanganiga (K^T) ko'paytiriladi, so'ngra hosil bo'lgan vaznlar matritsasi V matritsasiga ko'paytiriladi.

3. Matematik Formulalar va Qadam-baqadam Sonli Misol (Level 1 — Level 3)
Q \in \mathbb{R}^{n \times d_k} va K \in \mathbb{R}^{m \times d_k} matritsalari berilgan bo'lsin:

Transponirlash (K^T \in \mathbb{R}^{d_k \times m}): K ning satrlari ustunlarga aylanadi: [K^T]_{ri} = K_{ir}.
Matritsalarni ko'paytirish (S = Q K^T \in \mathbb{R}^{n \times m}): S_{ij} = \sum_{r=1}^{d_k} Q_{ir} [K^T]_{rj} = \sum_{r=1}^{d_k} Q_{ir} K_{jr}
Qadam-baqadam Sonli Misol (Q K^T hisoblash)
Berilgan:

Q = \begin{bmatrix} 1 & 2 \\ 3 & 0 \end{bmatrix}, \quad K = \begin{bmatrix} 2 & 1 \\ 0 & 4 \end{bmatrix}

1-qadam (K^T ni topish): K^T = \begin{bmatrix} 2 & 0 \\ 1 & 4 \end{bmatrix}
2-qadam (S = Q K^T elementlarini hisoblash):
S_{11} = (1 \times 2) + (2 \times 1) = 2 + 2 = 4
S_{12} = (1 \times 0) + (2 \times 4) = 0 + 8 = 8
S_{21} = (3 \times 2) + (0 \times 1) = 6 + 0 = 6
S_{22} = (3 \times 0) + (0 \times 4) = 0 + 0 = 0 Natija: Q K^T = \begin{bmatrix} 4 & 8 \\ 6 & 0 \end{bmatrix}
4. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch

Q = torch.tensor([[1.0, 2.0], [3.0, 0.0]]) K = torch.tensor([[2.0, 1.0], [0.0, 4.0]])

S = torch.matmul(Q, K.T) print("Q @ K^T:\n", S)

Kutilgan natija: tensor([[4., 8.], [6., 0.]])
## 5. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Vector]]
- [[Matrix]]

**Keyingi mavzular:**
- [[Tensor]]
- [[Transformers]]
- [[CNN]]

**Bog'liq:**
- [[Deep Learning]]

## 6. Tekshirilgan manbalar
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.

Fayl: Tensor.md
tags:

ai
math
linear-algebra
pytorch aliases:
Tenzor
Tensors status: verified level: beginner-to-advanced last_verified: 2026-11-14
Tensor (Tenzor)
1. Qisqacha ta'rif
Tensor — skalyar (0D), [[Vector]] (1D) va [[Matrix]] (2D) tushunchalarini ko'p o'lchamli massivlarga umumlashtiruvchi ma'lumotlar tuzilmasi bo'lib, PyTorch kabi kutubxonalarda mini-batchlar, tasvir feature map lari va multi-head attention proyeksiyalarini GPU da parallel hisoblash uchun xizmat qiladi.

2. Nima uchun kerak?
Chuqur o'rganish modellarida ma'lumotlar bir vaqtning o'zida bir nechta o'lcham bo'yicha guruhlanadi:

[[CNN]] va [[Batch Normalization]]: Mini-batchdagi m ta tasvirning C ta feature map i va H \times W fazoviy pozitsiyalari 4-tartibli tenzor (m, C, H, W) sifatida qayta ishlanadi (masalan, LeNet-5 C1 chiqishi m x 6 x 28 x 28).
[[Transformers]]: Multi-Head Attention da h = 8 ta parallel bosh (har biri d_k = 64 o'lchamli) (batch_size, num_heads, seq_len, d_k) o'lchamli tenzor sifatida GPU da tezlashtiriladi.
3. Python / PyTorch Amaliy Misoli (Shape va Device Boshqaruvi)
(Illyustrativ kod, o'quv maqsadida):python import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

Transformer batch: batch_size=2, seq_len=5, d_model=512
x = torch.randn(2, 5, 512, device=device)

8 ta parallel attention head (d_k = 64) ga ajratish:
(2, 5, 512) -> (2, 5, 8, 64) -> (2, 8, 5, 64)
x_heads = x.view(2, 5, 8, 64).transpose(1, 2) print("Device:", device) print("Multi-head tensor shape:", x_heads.shape) # torch.Size([2, 8, 5, 64])

## 4. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Vector]]
- [[Matrix]]
- [[Matrix Operations]]

**Keyingi mavzular:**
- [[CNN]]
- [[Transformers]]
- [[Batch Normalization]]

**Bog'liq:**
- [[Backpropagation]]

## 5. Tekshirilgan manbalar
- Vaswani, A., et al. (2017). *Attention Is All You Need*. NIPS 2017. arXiv:1706.03762.
- LeCun, Y., et al. (1998). *Gradient-Based Learning Applied to Document Recognition*. Proceedings of the IEEE, 86(11), 2278–2324.
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization*. ICML 2015.
- Karpathy, A. (2023). *Let's build GPT: from scratch, in code, spelled out*. YouTube. https://www.youtube.com/watch?v=kCc8FmEb1nY

Fayl: Hosila.md
tags:

ai
math
calculus aliases:
Derivative
Funksiya hosilasi status: verified level: beginner-to-advanced last_verified: 2026-11-14
Hosila (Derivative)
1. Qisqacha ta'rif
Hosila (f'(x) yoki \frac{df}{dx}) — funksiya argumenti x o'zgarganda funksiya qiymati f(x) ning o'zgarish tezligini ifodalovchi matematik analiz tushunchasi.

2. Nima uchun kerak?
Neyron tarmoqlarda [[Backpropagation]] orqali xatolik signalini orqaga uzatishda har bir qatlamning aktivatsiya funksiyasi differensiallanuvchi bo'lishi shart. Aktivatsiya funksiyasining birinchi tartibli hosilasi f'(\text{net}_i) xatolik signalini qanchalik o'tkazish yoki so'ndirishini belgilaydi.

3. Matematik Asoslari: Sigmoid Hosilasi va Saturation (Level 1 — Level 3)
Logistik Sigmoid Funksiyasi va Uning Maksimal Hosilasi (Hochreiter & Schmidhuber, 1997, Section 3): \sigma(x) = \frac{1}{1 + e^{-x}}, \quad \sigma'(x) = \sigma(x)\left(1 - \sigma(x)\right) Logistik sigmoid hosilasining maksimal qiymati x = 0 nuqtada kuzatiladi va u 0.25 ga teng: \max_x \sigma'(x) = 0.5 \times (1 - 0.5) = 0.25 Agar kirish qiymati |x| juda kattalashib ketsa, funksiya to'yinish (saturation) hududiga tushib qoladi va \sigma'(x) \to 0 bo'lib, gradient oqimi to'xtab qoladi (Rumelhart et al., 1986; Ioffe & Szegedy, 2015; Vaswani et al., 2017).
Chiziqli Ayniyat Funksiyasi (Hochreiter & Schmidhuber, 1997): f_j(x) = x \implies f'_j(x) = 1.0 [[LSTM]] ning Constant Error Carousel (CEC) markazida hosila doimo 1.0 bo'lishi uchun aynan shu funksiya ishlatiladi.
Qadam-baqadam Sonli Misol
\sigma(x) = \frac{1}{1 + e^{-x}} funksiyaning x = 0 va x = 2 nuqtalardagi hosilasini hisoblaymiz:

x = 0 da: \sigma(0) = \frac{1}{1 + 1} = 0.5 \implies \sigma'(0) = 0.5 \times (1 - 0.5) = 0.25.
x = 2 da: \sigma(2) = \frac{1}{1 + e^{-2}} \approx \frac{1}{1 + 0.1353} \approx 0.8808 \implies \sigma'(2) = 0.8808 \times (1 - 0.8808) \approx 0.1050.
4. Bog'liq tushunchalar
Oldin o'rganish:

[[Math for Deep Learning]]
Keyingi mavzular:

[[Partial Derivative]]
[[Gradient]]
[[Chain Rule]]
[[Backpropagation]]
Bog'liq:

[[RNN]]
[[LSTM]]
[[Batch Normalization]]
5. Tekshirilgan manbalar
Hochreiter, S., & Schmidhuber, J. (1997). Long Short-Term Memory. Neural Computation, 9(8), 1735–1780.
Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323, 533–536.
Ioffe, S., & Szegedy, C. (2015). Batch Normalization. ICML 2015.
Fayl: Partial Derivative.md
tags:

ai
math
calculus aliases:
Xususiy hosila
Partial Derivatives status: verified level: beginner-to-advanced last_verified: 2026-11-14
Partial Derivative (Xususiy Hosila)
1. Qisqacha ta'rif
Partial Derivative (Xususiy hosila, \frac{\partial \ell}{\partial \theta_i}) — ko'p o'zgaruvchili yo'qotish funksiyasining boshqa barcha parametrlarni o'zgarmas deb hisoblagan holda, faqat bitta \theta_i parametri yoki y_i aktivatsiyasi bo'yicha olingan hosilasi.

2. Nima uchun kerak?
Neyron tarmoqlarda yo'qotish funksiyasi \ell bir vaqtning o'zida barcha qatlam vaznlari va aktivatsiyalariga bog'liq (Rumelhart et al., 1986; Ioffe & Szegedy, 2015). Har bir vaznni qanday yangilashni aniqlash uchun \frac{\partial \ell}{\partial w_{ji}} xususiy hosilasi hisoblanadi.

3. Matematik Formulalar va Qadam-baqadam Sonli Misol (Level 1 — Level 3)
Faraz qilaylik, bitta neyronning vaznli yig'indisi z = w_1 x_1 + w_2 x_2 + b va kvadratik xatoligi E = \frac{1}{2}(z - d)^2 bo'lsin (x_1 = 2, x_2 = 3, w_1 = 1, w_2 = 2, b = 0, d = 10):

1-qadam (Forward qiymatni topish): z = (1 \times 2) + (2 \times 3) + 0 = 2 + 6 = 8 E = \frac{1}{2}(8 - 10)^2 = \frac{1}{2}(-2)^2 = 2.0
2-qadam (z bo'yicha xususiy hosila): \frac{\partial E}{\partial z} = z - d = 8 - 10 = -2
3-qadam (w_1 va w_2 bo'yicha xususiy hosilalar): \frac{\partial z}{\partial w_1} = x_1 = 2 \implies \frac{\partial E}{\partial w_1} = \frac{\partial E}{\partial z} \cdot \frac{\partial z}{\partial w_1} = -2 \times 2 = -4 \frac{\partial z}{\partial w_2} = x_2 = 3 \implies \frac{\partial E}{\partial w_2} = \frac{\partial E}{\partial z} \cdot \frac{\partial z}{\partial w_2} = -2 \times 3 = -6
4. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch

w1 = torch.tensor(1.0, requires_grad=True) w2 = torch.tensor(2.0, requires_grad=True) x1, x2, d = 2.0, 3.0, 10.0

z = w1 * x1 + w2 * x2 E = 0.5 * (z - d) 2 E.backward()

print("dE/dw1:", w1.grad.item()) # -4.0 print("dE/dw2:", w2.grad.item()) # -6.0

## 5. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Hosila]]
- [[Vector]]

**Keyingi mavzular:**
- [[Gradient]]
- [[Chain Rule]]
- [[Gradient Descent]]
- [[Backpropagation]]

**Bog'liq:**
- [[Batch Normalization]]

## 6. Tekshirilgan manbalar
- Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). *Learning representations by back-propagating errors*. Nature, 323, 533–536.
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization*. ICML 2015.

Fayl: Gradient.md
tags:

ai
math
calculus aliases:
Gradient Vector
Gradient vektori status: verified level: beginner-to-advanced last_verified: 2026-11-14
Gradient
1. Qisqacha ta'rif
Gradient (g_t = \nabla_\theta f_t(\theta_t)) — maqsad funksiyasi f_t(\theta_t) ning barcha parametrlar bo'yicha [[Partial Derivative]] (xususiy hosilalari) ni jamlagan vektor bo'lib, i-chi elementi g_{t,i} = \frac{\partial f_t(\theta_t)}{\partial \theta_{t,i}} ga teng (Kingma & Ba, 2015).

2. Nima uchun kerak?
Gradient vektori parametrlar fazosida funksiyaning eng tez o'sish yo'nalishini ko'rsatadi. [[Gradient Descent]], [[SGD]] va [[Adam]] optimizatorlari yo'qotish funksiyasini minimallashtirish uchun aynan shu gradient vektoridan foydalanadi.

3. Matematik Xossalari: Masshtabga Nisbatan Invariantlik (Level 1 — Level 3)
Kingma va Ba (2015, Section 2) ko'rsatganidek:

Oddiy [[SGD]] da gradient vektori c koeffitsiyentga masshtablansa (c \cdot g_t), parametr yangilanishi ham c marta o'zgaradi.
[[Adam]] da esa effektiv qadam kattaligi \Delta_t gradientlarning diagonal masshtablanishiga nisbatan invariantdir: gradient g ni c omilga ko'paytirish 1-moment \hat{m}_t ni c marta, 2-moment \hat{v}_t ni esa c^2 marta masshtablaydi va ular nisbatda qisqarib ketadi: \frac{c \cdot \hat{m}_t}{\sqrt{c^2 \cdot \hat{v}_t}} = \frac{\hat{m}_t}{\sqrt{\hat{v}_t}}
Qadam-baqadam Sonli Misol
[[Partial Derivative]] konspektidagi misolda \frac{\partial E}{\partial w_1} = -4 va \frac{\partial E}{\partial w_2} = -6 topilgan edi. Ular birgalikda 2 o'lchamli gradient vektorini tashkil etadi:

\nabla_w E = \begin{bmatrix} -4 \\ -6 \end{bmatrix}

Agar bu gradientni c = 10 ga ko'paytirsak ([-40, -60]^T), har bir komponent uchun \frac{c \cdot g_i}{\sqrt{c^2 \cdot g_i^2}} = \frac{g_i}{|g_i|} = [-1, -1]^T nisbat o'zgarmas qoladi.

4. Bog'liq tushunchalar
Oldin o'rganish:

[[Vector]]
[[Hosila]]
[[Partial Derivative]]
Keyingi mavzular:

[[Gradient Descent]]
[[Backpropagation]]
[[SGD]]
[[Adam]]
Bog'liq:

[[Optimizers]]
5. Tekshirilgan manbalar
Kingma, D. P., & Ba, J. (2015). Adam: A Method for Stochastic Optimization. ICLR 2015. arXiv:1412.6980.
Fayl: Chain Rule.md
tags:

ai
math
calculus aliases:
Zanjir qoidasi
Murakkab funksiya hosilasi status: verified level: beginner-to-advanced last_verified: 2026-11-14
Chain Rule (Zanjir Qoidasi)
1. Qisqacha ta'rif
Chain Rule (Zanjir qoidasi) — murakkab kompozitsion funksiyalar hosilasini ichki va tashqi hosilalar ko'paytmasi (tarmoqlangan hisoblash graflarida esa barcha keyingi iste'molchi yo'llar yig'indisi) sifatida hisoblash qoidasi.

2. Nima uchun kerak?
Chuqur neyron tarmoqlarda [[Backpropagation]] (Rumelhart et al., 1986), vaqt bo'yicha xatolik oqimi (Hochreiter & Schmidhuber, 1997) va [[Batch Normalization]] orqali gradient o'tishi (Ioffe & Szegedy, 2015) to'liq Chain Rule ga asoslanadi.

3. Matematik Formulalari (Level 1 — Level 3)
Tarmoqlangan Grafda Yig'indi (Rumelhart et al., 1986): Agar yashirin birlik a_j keyingi qatlamdagi bir nechta z_k birliklariga ulansa, teskari o'tishda barcha k yo'llar bo'yicha yig'indi olinadi: \frac{\partial E}{\partial a_j} = \sum_{k} \frac{\partial E}{\partial z_k} \cdot \frac{\partial z_k}{\partial a_j}
Ketma-ket Qadamlar Bo'yicha Ko'paytma (Hochreiter & Schmidhuber, 1997): q ta vaqt qadami bo'yicha orqaga uzatilgan xatolik har bir qadamdagi hosila va vazn ko'paytmasini (\prod_{m=1}^{q} f'_{l_m} w_{l_m l_{m-1}}) o'z ichiga oladi.
Qadam-baqadam Sonli Misol (Ikki Chiqishli Tarmoqda Chain Rule)
Faraz qilaylik, yashirin birlik aktivatsiyasi a_h = 2.0 ikkita chiqishga ulanadi:

1-chiqish: z_1 = w_{1} a_h (w_1 = 3.0) va uning xatolik hosilasi \frac{\partial E}{\partial z_1} = 0.5.
2-chiqish: z_2 = w_{2} a_h (w_2 = -1.0) va uning xatolik hosilasi \frac{\partial E}{\partial z_2} = 0.8. Yashirin birlik a_h bo'yicha umumiy hosilani topamiz:
1-chiqishdan kelgan ulush: \frac{\partial E}{\partial z_1} \cdot \frac{\partial z_1}{\partial a_h} = 0.5 \times 3.0 = 1.5.
2-chiqishdan kelgan ulush: \frac{\partial E}{\partial z_2} \cdot \frac{\partial z_2}{\partial a_h} = 0.8 \times (-1.0) = -0.8.
Ikkala yo'l yig'indisi: \frac{\partial E}{\partial a_h} = 1.5 + (-0.8) = 0.7
4. Bog'liq tushunchalar
Oldin o'rganish:

[[Hosila]]
[[Partial Derivative]]
Keyingi mavzular:

[[Backpropagation]]
[[RNN]]
[[LSTM]]
[[Batch Normalization]]
Bog'liq:

[[Gradient Descent]]
5. Tekshirilgan manbalar
Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323, 533–536.
Hochreiter, S., & Schmidhuber, J. (1997). Long Short-Term Memory. Neural Computation, 9(8), 1735–1780.
Fayl: Probability.md
tags:

ai
math
probability aliases:
Ehtimollik
Probability Distribution
Softmax status: verified level: beginner-to-advanced last_verified: 2026-11-14
Probability (Ehtimollik)
1. Qisqacha ta'rif
Probability (Ehtimollik) — tasodifiy hodisalar yoki model bashoratlarining ishonchlilik taqsimotini [0, 1] oraliqda (yig'indisi 1 ga teng bo'lgan holda) ifodalovchi matematik nazariya.

2. Nima uchun kerak?
[[Transformers]] va [[LLM]]: Scaled Dot-Product Attention da so'rov va kalitlar ko'paytmasi \sqrt{d_k} ga bo'lingach, Softmax funksiyasi yordamida normalizatsiya qilinib, qiymatlar (V) ustida ehtimollik vaznlari (attention pattern) olinadi (Vaswani et al., 2017; 3Blue1Brown, 2024).
Tasodifiy O'zgaruvchilar Tahlili: Vazn initsializatsiyasi va attention masshtablashda kirish komponentlari o'rtacha qiymati 0 va dispersiyasi 1 ga teng bo'lgan o'zaro mustaqil tasodifiy o'zgaruvchilar (independent random variables) sifatida modellashtiriladi (Vaswani et al., 2017, Footnote 4).
3. Softmax Formulasi va Qadam-baqadam Sonli Misol (Level 1 — Level 3)
K ta elementdan iborat vektor s = [s_1, \dots, s_K]^T uchun Softmax ehtimolligi:

\text{softmax}(s)_i = \frac{e^{s_i}}{\sum_{j=1}^{K} e^{s_j}}

Qadam-baqadam Sonli Misol
Berilgan: s = [0.0, 1.0, 2.0].

Eksponentalar: e^{0.0} = 1.0000, e^{1.0} \approx 2.7183, e^{2.0} \approx 7.3891.
Yig'indi: 1.0000 + 2.7183 + 7.3891 = 11.1074.
Ehtimolliklar:
P(1) = \frac{1.0000}{11.1074} \approx 0.0900
P(2) = \frac{2.7183}{11.1074} \approx 0.2447
P(3) = \frac{7.3891}{11.1074} \approx 0.6652
4. Bog'liq tushunchalar
Oldin o'rganish:

[[Math for Deep Learning]]
[[Vector]]
Keyingi mavzular:

[[Mean]]
[[Standard Deviation]]
[[Loss Functions]]
[[Transformers]]
Bog'liq:

[[LLM]]
[[RAG]]
5. Tekshirilgan manbalar
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Sanderson, G. [3Blue1Brown]. (2024). Attention in transformers, step-by-step | Deep Learning Chapter 6. YouTube. https://www.youtube.com/watch?v=eMlx5fFNoYc
Fayl: Mean.md
tags:

ai
math
statistics aliases:
O'rtacha qiymat
Expected Value
First Moment status: verified level: beginner-to-advanced last_verified: 2026-11-14
Mean (O'rtacha Qiymat va Birinchi Moment)
1. Qisqacha ta'rif
Mean (E[x] yoki \mu) — tasodifiy o'zgaruvchining matematik kutilmasi (expected value) yoki ma'lumotlar to'plamining arifmetik o'rtacha qiymati (1st moment).

2. Nima uchun kerak?
[[Batch Normalization]] (Ioffe & Szegedy, 2015): Har bir qatlam aktivatsiyasi mini-batch o'rtachasi \mu_{\mathcal{B}} = \frac{1}{m}\sum_{i=1}^m x_i ni ayirish orqali nol o'rtachaga (zero mean) markazlashtiriladi, bu esa tarmoq konvergensiyasini tezlashtiradi.
[[Adam]] Optimizatori (Kingma & Ba, 2015): Gradientning 1-momenti (the mean) eksponensial sirpanuvchi o'rtacha m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t orqali baholanadi va \hat{m}_t = \frac{m_t}{1 - \beta_1^t} bilan siljishi tuzatiladi.
Qadam-baqadam Sonli Misol
Berilgan mini-batch: x = [2.0, 4.0, 6.0, 8.0] (m = 4):

\mu_{\mathcal{B}} = \frac{2.0 + 4.0 + 6.0 + 8.0}{4} = \frac{20.0}{4} = 5.0

Markazlashtirilgan qiymatlar (\hat{x}_i = x_i - \mu_{\mathcal{B}}): [-3.0, -1.0, 1.0, 3.0] (yangi o'rtacha qiymat 0.0 ga teng).

3. Bog'liq tushunchalar
Oldin o'rganish:

[[Probability]]
[[Vector]]
Keyingi mavzular:

[[Standard Deviation]]
[[Batch Normalization]]
[[Adam]]
Bog'liq:

[[Transformers]]
4. Tekshirilgan manbalar
Ioffe, S., & Szegedy, C. (2015). Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift. ICML 2015, PMLR 37:448–456.
Kingma, D. P., & Ba, J. (2015). Adam: A Method for Stochastic Optimization. ICLR 2015. arXiv:1412.6980.
Fayl: Standard Deviation.md
tags:

ai
math
statistics aliases:
Standart chetlanish
Variance
Dispersiya
Second Moment status: verified level: beginner-to-advanced last_verified: 2026-11-14
Standard Deviation va Variance (Standart Chetlanish va Dispersiya)
1. Qisqacha ta'rif
Variance (\text{Var}[x] = \sigma^2) — qiymatlarning o'rtacha qiymat \mu atrofida o'rtacha kvadratik tarqoqligi; Standard Deviation (\sigma = \sqrt{\text{Var}[x]}) esa dispersiyaning kvadrat ildizidir.

2. Nima uchun kerak?
[[Batch Normalization]] (Ioffe & Szegedy, 2015): Mini-batch dispersiyasi \sigma_{\mathcal{B}}^2 = \frac{1}{m}\sum_{i=1}^m (x_i - \mu_{\mathcal{B}})^2 hisoblanib, aktivatsiyalar \sqrt{\sigma_{\mathcal{B}}^2 + \epsilon} ga bo'linadi va birlik dispersiyaga (unit variance) keltiriladi.
[[Transformers]] Attention Scaling (Vaswani et al., 2017, Footnote 4): O'rtachasi 0 va dispersiyasi 1 bo'lgan d_k ta mustaqil tasodifiy komponentlarning skalyar ko'paytmasi q \cdot k dispersiyasi d_k ga (standart chetlanishi \sqrt{d_k} ga) teng bo'ladi; shu bois natija \sqrt{d_k} ga bo'linadi.
[[Adam]] 2nd Raw Moment (Kingma & Ba, 2015): Gradientning ikkinchi markazlashmagan momenti (uncentered variance E[g_t^2]) v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2 orqali kuzatilib, parametr yangilanishi \sqrt{\hat{v}_t} + \epsilon ga bo'linadi.
Qadam-baqadam Sonli Misol
Berilgan mini-batch: x = [2.0, 4.0, 6.0, 8.0] (m = 4, \mu_{\mathcal{B}} = 5.0):

Chetlanishlar kvadrati: (-3)^2 = 9, (-1)^2 = 1, 1^2 = 1, 3^2 = 9.
Dispersiya: \sigma_{\mathcal{B}}^2 = \frac{9 + 1 + 1 + 9}{4} = \frac{20}{4} = 5.0
Standart chetlanish: \sigma_{\mathcal{B}} = \sqrt{5.0} \approx 2.2361
3. Bog'liq tushunchalar
Oldin o'rganish:

[[Probability]]
[[Mean]]
Keyingi mavzular:

[[Batch Normalization]]
[[Transformers]]
[[Adam]]
Bog'liq:

[[Loss Functions]]
4. Tekshirilgan manbalar
Vaswani, A., et al. (2017). Attention Is All You Need. NIPS 2017. arXiv:1706.03762.
Ioffe, S., & Szegedy, C. (2015). Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift. ICML 2015, PMLR 37:448–456.
Kingma, D. P., & Ba, J. (2015). Adam: A Method for Stochastic Optimization. ICLR 2015. arXiv:1412.6980.
Fayl: SGD.md
tags:

ai
math
optimization
training aliases:
Stochastic Gradient Descent
SGD with Momentum
SGDW status: verified level: beginner-to-advanced last_verified: 2026-11-14
SGD (Stochastic Gradient Descent va Momentum)
1. Qisqacha ta'rif
Stochastic Gradient Descent (SGD) — mini-batch gradienti \nabla f_t(\theta_t) asosida model parametrlarini yangilovchi bazaviy stoxastik optimallashtirish algoritmi bo'lib, amaliyotda Momentum (\beta_1) va Weight Decay (\lambda) bilan qo'llaniladi.

2. Nima uchun kerak?
Ioffe va Szegedy (2015) ta'kidlaganidek, mini-batch SGD chuqur neyron tarmoqlarni o'qitishning samarali usulidir. Bundan tashqari, Loshchilov va Hutter (2019) ko'rsatganidek, standart SGD da Weight Decay va L_2 regulyarizatsiya matematik jihatdan ekvivalent bo'lsa-da, optimal L_2 koeffitsiyenti o'rganish tezligiga bog'lanib qolmasligi uchun ularni ajratish (SGDW) maqsadga muvofiqdir.

3. Matematik Asoslari: Proposition 1 va SGDW (Level 1 — Level 3)
Loshchilov va Hutter (2019, Section 2) bo'yicha:

Hanson & Pratt (1988) Weight Decay tenglamasi (Equation 1): \theta_{t+1} = (1 - \lambda)\theta_t - \alpha \nabla f_t(\theta_t)
Proposition 1 (Weight decay = L_2 reg for standard SGD): Standart SGD uchun Weight Decay standart L_2 regulyarizatsiyaga ekvivalentdir, biroq bu ekvivalentlik bajarilishi uchun L_2 regulyarizator koeffitsiyenti \lambda' quyidagicha tanlanishi shart: \lambda' = \frac{\lambda}{\alpha} Ya'ni \lambda' o'rganish tezligi \alpha bilan qattiq bog'lanib (tightly coupled) qoladi. Shu ikki giperparametr ta'sirini bir-biridan ajratish uchun SGD with Decoupled Weight Decay (SGDW, Algorithm 1) qo'llaniladi.
Qadam-baqadam Sonli Misol
Berilgan: \theta_0 = 10.0, gradient \nabla f_1(\theta_0) = 4.0, learning rate \alpha = 0.1 va weight decay \lambda = 0.02:

\theta_1 = (1 - 0.02) \times 10.0 - 0.1 \times 4.0 = 9.8 - 0.4 = 9.4

(Agar buni standart L_2 regulyarizatsiya \theta_1 = \theta_0 - \alpha(\nabla f_1(\theta_0) + \lambda' \theta_0) orqali olishni istasak, \lambda' = \frac{0.02}{0.1} = 0.2 qilib olishga majbur bo'lamiz: 10.0 - 0.1(4.0 + 0.2 \times 10.0) = 10.0 - 0.6 = 9.4).

4. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch

theta = torch.nn.Parameter(torch.tensor([10.0]))

Standart PyTorch SGD da weight_decay = lambda' = 0.2, lr = 0.1
optimizer = torch.optim.SGD([theta], lr=0.1, weight_decay=0.2)

theta.grad = torch.tensor([4.0]) optimizer.step() print("Updated theta:", round(theta.item(), 4)) # 9.4

## 5. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Gradient Descent]]
- [[Gradient]]
- [[Learning Rate]]

**Keyingi mavzular:**
- [[Adam]]
- [[Optimizers]]
- [[Batch Normalization]]

**Bog'liq:**
- [[Backpropagation]]

## 6. Tekshirilgan manbalar
- Loshchilov, I., & Hutter, F. (2019). *Decoupled Weight Decay Regularization*. ICLR 2019. arXiv:1711.05101.
- Ioffe, S., & Szegedy, C. (2015). *Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift*. ICML 2015.

Fayl: Adam.md
tags:

ai
math
optimization
training aliases:
Adaptive Moment Estimation
AdamW
AdaMax status: verified level: beginner-to-advanced last_verified: 2026-11-14
Adam va AdamW (Adaptive Moment Estimation & Decoupled Weight Decay)
1. Qisqacha ta'rif
Adam — Diederik P. Kingma va Jimmy Ba (ICLR 2015, arXiv:1412.6980) tomonidan taklif etilgan, stoxastik maqsad funksiyalarini quyi tartibli momentlarning (1-tartibli o'rtacha m_t va 2-tartibli markazlashmagan dispersiya v_t) adaptiv baholari asosida birinchi tartibli gradient yordamida optimallashtiruvchi algoritm. AdamW esa Ilya Loshchilov va Frank Hutter (ICLR 2019, arXiv:1711.05101) tomonidan kiritilgan, vaznlarning so'nishini (weight decay) Adam ning adaptiv gradient mexanizmidan ajratuvchi variantdir.

2. Nima uchun kerak?
Kingma va Ba (2015) ko'rsatganidek, Adam quyidagi muhim afzalliklarga ega:

Parametr yangilanishlarining miqdori gradientni diagonal qayta masshtablashga (rescaling) nisbatan invariantdir.
Qadam kattaligi (stepsize) \alpha giperparametri bilan taxminiy chegaralangan.
Statsionar maqsad funksiyasini talab qilmaydi va siyrak (sparse) gradientlar bilan ishlaydi.
Signal-shovqin nisbati (SNR = m_t / \sqrt{v_t}) orqali optimum yaqinida qadam kattaligini tabiiy ravishda kichraytiradi (step size annealing).
3. Matematik Asoslari (Level 1 — Level 3)
3.1. Original Adam Algoritmi va Bias Correction (Kingma & Ba, 2015, Section 2 & 3)
Algoritm gradientning (m_t) va kvadratik gradientning (v_t) eksponensial sirpanuvchi o'rtachalarini yangilab boradi, bu yerda \beta_1, \beta_2 \in [0, 1) giperparametrlari ushbu sirpanuvchi o'rtachalarning eksponensial so'nish tezligini boshqaradi:

g_t = \nabla_\theta f_t(\theta_{t-1})
m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t (1-moment — mean)
v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2 (2-xom moment — uncentered variance)
Initialisation Bias Correction: m_0 = 0 va v_0 = 0 bilan initsializatsiya qilingani sababli, dastlabki qadamlarda moment baholari nolga qarab siljigan (biased towards zero) bo'ladi. Ayniqsa siyrak gradientlarda ishonchli baho olish uchun 1 - \beta_2 kichik (masalan, \beta_2 = 0.999) tanlanganda, bias correction yo'qligi dastlabki qadamlarning juda katta bo'lib ketishiga olib keladi. Shu sababli siljish tuzatiladi: \hat{m}_t = \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t}
Parametrlarni yangilash: \theta_t = \theta_{t-1} - \alpha \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
Konvergensiya Tahlili (Theorem 4.1): Chegaralangan gradientlar (\|\nabla f_t(\theta)\|_2 \le G, \|\nabla f_t(\theta)\|_\infty \le G_\infty) va parametrlar orasidagi masofa chegaralangan (\|\theta_n - \theta_m\|_2 \le D, \|\theta_m - \theta_n\|_\infty \le D_\infty) bo'lganda hamda \alpha_t = \alpha / \sqrt{t} va \beta_{1,t} eksponensial kamayganda (masalan, \lambda = 1 - 10^{-8} bilan), Adam barcha T \ge 1 uchun O(\sqrt{T}) regret chegarasiga erishadi.

3.2. Proposition 2 va AdamW (Loshchilov & Hutter, 2019, Section 2)
Proposition 2 (Weight decay \neq L_2 reg for adaptive gradients): Prekonditsioner matritsasi M_t \neq k I bo'lgan adaptiv optimizator \mathcal{O} (\theta_{t+1} \leftarrow \theta_t - \alpha M_t \nabla f_t(\theta_t)) uchun hech qanday L_2 koeffitsiyenti \lambda' mavjud emaski, \mathcal{O} ni f_t(\theta) + \frac{\lambda'}{2}\|\theta\|_2^2 ustida weight decay siz ishlatish \mathcal{O} ni f_t(\theta) ustida \lambda \in \mathbb{R}^+ weight decay bilan (\theta_{t+1} \leftarrow (1 - \lambda)\theta_t - \alpha M_t \nabla f_t(\theta_t)) ishlatishga ekvivalent bo'lsa!

Sababi: L_2 regulyarizatsiyada yo'qotish funksiyasi gradienti va regulyarizator gradienti yig'indisi birgalikda adaptiv normalizatsiya qilinadi; natijada katta tipik gradient magnitudasiga (s) ega bo'lgan x vaznlari boshqa vaznlarga qaraganda kichikroq nisbiy miqdorda regulyarizatsiya qilinadi.
Decoupled Weight Decay (AdamW, Algorithm 2, Line 12): Vazn so'nishi qadamini adaptiv gradient mexanizmidan ajratadi va barcha vaznlarni bir xil \lambda tezlikda regulyarizatsiya qiladi. CIFAR-10 ResNet (100 epoxa) va tasvir klassifikatsiyasi tajribalarida AdamW standart o'rganish tezligida Adam ga nisbatan test xatoligini 15% ga kamaytirgan.
4. Qadam-baqadam Sonli Misol (t=1 qadamda Bias Correction va AdamW)
Berilgan: \theta_0 = 2.0, g_1 = 0.5, \alpha = 0.1, \beta_1 = 0.9, \beta_2 = 0.999, \epsilon = 10^{-8}, decoupled weight decay \lambda = 0.01:

m_1 = 0.9(0) + 0.1(0.5) = 0.05
v_1 = 0.999(0) + 0.001(0.5^2) = 0.00025
Bias correction: \hat{m}_1 = \frac{0.05}{1 - 0.9^1} = 0.5, \quad \hat{v}_1 = \frac{0.00025}{1 - 0.999^1} = 0.25
Adaptiv gradient qadami: \alpha \frac{\hat{m}_1}{\sqrt{\hat{v}_1} + \epsilon} \approx 0.1 \times \frac{0.5}{0.5} = 0.1
Decoupled weight decay qadami (\lambda \theta_0 = 0.01 \times 2.0 = 0.02) bilan yangi parametr: \theta_1 = 2.0 - 0.1 - 0.02 = 1.88
5. Python / PyTorch Amaliy Misoli
(Illyustrativ kod, o'quv maqsadida):python import torch

theta = torch.nn.Parameter(torch.tensor([2.0])) optimizer = torch.optim.AdamW([theta], lr=0.1, betas=(0.9, 0.999), eps=1e-8, weight_decay=0.1)

Eslatma: PyTorch AdamW da weight_decay lr ga ko'paytiriladi (lr * wd = 0.1 * 0.1 = 0.01 = lambda)
theta.grad = torch.tensor([0.5]) optimizer.step() print("Updated theta (AdamW):", round(theta.item(), 4)) # 1.88

## 6. Bog'liq tushunchalar

**Oldin o'rganish:**
- [[Gradient Descent]]
- [[Mean]]
- [[Standard Deviation]]
- [[SGD]]

**Keyingi mavzular:**
- [[Optimizers]]
- [[Transformers]]
- [[LLM]]

**Bog'liq:**
- [[Learning Rate]]

## 7. Tekshirilgan manbalar
- Kingma, D. P., & Ba, J. (2015). *Adam: A Method for Stochastic Optimization*. International Conference on Learning Representations (ICLR 2015). arXiv:1412.6980.
- Loshchilov, I., & Hutter, F. (2019). *Decoupled Weight Decay Regularization*. International Conference on Learning Representations (ICLR 2019). arXiv:1711.05101.

Bo'lim G: Software Architecture and Knowledge Management
Fayl: Atomic Note.md
tags:

knowledge-management
obsidian
architecture aliases:
Atomar konspekt
Canonical Note status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Atomic Note (Atomar Konspekt va Bilimlarni Boshqarish)
1. Qisqacha ta'rif
Atomic Note (Atomar konspekt) — Obsidian bilimlar bazasida har bir unikal ilmiy yoki muhandislik tushunchasi uchun bitta kanonik fayl (one canonical file) ajratish, dublikatlarni bartaraf etish va haqiqiy texnik bog'liqliklarni [[Wikilink]] orqali bog'lash tamoyili.

2. Nima uchun kerak?
Bilimlar bazasi kengayib borganda bitta mavzuni bir nechta papkada takrorlash (masalan, Gradient Descent ni ham Model Training, ham Mathematics bo'limida ikkita alohida fayl sifatida saqlash) ma'lumotlarning ikkilanishiga va eskirishiga olib keladi. Atomar konspekt arxitekturasi:

Har bir unikal tushuncha uchun bitta kanonik fayl yaratadi va ikkinchi nomni YAML aliases orqali unga yo'naltiradi.
Markaziy [[AI Map]] (MOC) orqali barcha mavzularga to'g'ridan-to'g'ri yetib borishni ta'minlaydi.
Har bir konspektda Oldin o'rganish, Keyingi mavzular va Bog'liq tushunchalarni aniq ajratib, toza Obsidian Graph hosil qiladi.
Izoh (Manba maqomi): Ushbu arxitekturaviy qoidalar joriy Obsidian audit talablari asosida tuzilgan; tashqi Zettelkasten metodologiyasi bo'yicha adabiyotlar joriy manbalar to'plamida mavjud emas (Tasdiqlanmagan).

3. Bog'liq tushunchalar
Bog'liq:

[[AI Map]]
[[Production-Ready ML Loyihasi Tuzilmasi]]
Fayl: Production-Ready ML Loyihasi Tuzilmasi.md
tags:

ai
mlops
software-architecture aliases:
ML Project Structure
ML Loyiha Arxitekturasi status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Production-Ready ML Loyihasi Tuzilmasi
1. Qisqacha ta'rif
Production-Ready ML Loyihasi Tuzilmasi — mashinali o'rganish tizimini o'qib tushunish, o'zgartirish, tekshirish (testing) va masshtablash oson bo'lgan aniq javobgarlikka ega dasturiy modullarga ajratish tamoyili.

2. Nima uchun kerak?
Haddan tashqari murakkab abstraksiyalar yoki tartibsiz monolit skriptlar modelning ichki ishlashini yashirib qo'yadi va xatolarni topishni qiyinlashtiradi. Andrej Karpathy'ning nanoGPT loyihasi (2023) ko'rsatganidek, bitta yagona majburiy loyiha shabloni mavjud emas — hatto 124 million parametrli to'liq GPT-2 modelini qayta tiklay oladigan (reproducible) kod bazasini ham ikkita aniq va toza faylga ajratish mumkin:

Model Definition (~300 qator): [[Transformers]] bloklari, attention heads, positional embeddings va layer normalization qatlamlari.
Training Loop (~300 qator): Ma'lumotlarni yuklash (data loading), [[Optimizers]] sozlamalari, o'qitish sikli, yo'qotish va perplexity monitoringi hamda checkpointing (model holatini saqlash).
3. Majburiy Komponentlar va Qo'shimcha Arxitekturaviy Tanlovlar
Komponent

Maqomi

Tasdiqlangan texnik vazifasi

Model & Architecture Module

Majburiy

Tarmoq qatlamlari va forward computation (nanoGPT model fayli; Karpathy, 2023).

Data Loading, Optimization & Checkpointing

Majburiy

Mini-batch uzatish, shuffling (Ioffe & Szegedy, 2015 da shuffling validatsiya aniqligini ~1% ga oshirgan), optimizatsiya va checkpoint saqlash (Karpathy, 2023).

Derivative & Numerical Verification

Majburiy

Har bir vazn va bias hosilasini finite differences (ikki mustaqil forward pass) orqali tekshirish (Rumelhart et al., 1986).

Kengaytirilgan MLOps (Data Versioning, Model Registry, CI/CD)

Loyiha ko'lamiga ko'ra / Tasdiqlanmagan

Katta sanoat tizimlarida qo'llaniladi; maxsus uchinchi tomon MLOps vositalari bo'yicha birlamchi manbalar joriy to'plamda mavjud emas (Tasdiqlanmagan).

4. Bog'liq tushunchalar
Oldin o'rganish:

[[Machine Learning]]
[[Deep Learning]]
Keyingi mavzular:

[[Real Production ML Pipeline Arxitektura va Ish Jarayoni]]
Bog'liq:

[[Atomic Note]]
[[Batch Normalization]]
5. Tekshirilgan manbalar
Karpathy, A. (2023). Let's build GPT: from scratch, in code, spelled out. YouTube. https://www.youtube.com/watch?v=kCc8FmEb1nY
Rumelhart, D. E., et al. (1986). Learning representations by back-propagating errors. Nature, 323, 533–536.
Ioffe, S., & Szegedy, C. (2015). Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift. ICML 2015.
Fayl: Real Production ML Pipeline Arxitektura va Ish Jarayoni.md
tags:

ai
mlops
production-pipeline aliases:
Production ML Pipeline
End-to-End ML Systems status: partially-verified level: beginner-to-advanced last_verified: 2026-11-14
Real Production ML Pipeline Arxitektura va Ish Jarayoni
1. Qisqacha ta'rif
Production ML Pipeline — ko'p modulli mashinali o'rganish tizimini global maqsad funksiyasi bo'yicha end-to-end o'qitish, deterministik inference rejimida ishga tushirish va kirish ma'lumotlari taqsimoti o'zgarishini (covariate shift) boshqarish jarayoni.

2. Tasdiqlangan Production Arxitektura Tamoyillari (Level 1 — Level 3)
2.1. Ko'p Modulli Tizimlarni Global O'qitish: Graph Transformer Networks (LeCun et al., 1998)
LeCun, Bottou, Bengio va Haffner (1998) ko'rsatganidek, haqiqiy sanoat tizimlari (masalan, tijoriy ravishda ishga tushirilib, kuniga millionlab bank cheklarini rekord aniqlikda o'qigan tizim) shunchaki "bitta rasm klassifikatori" emas, balki ko'p bosqichli konveyerdir (pipeline):

Field extraction (Maydonni ajratish)
Segmentation (Bo'laklarga ajratish)
Character / word recognition (Harf va so'zlarni tanib olish)
Language modeling (Til modeli)
An'anaviy ravishda har bir modul alohida loyihalanib va alohida sozlangan. LeCun et al. (1998) Graph Transformer Networks (GTNs) paradigmasi orqali bunday ko'p modulli tizimlarni yagona umumiy unumdorlik o'lchovi (global loss function) yordamida gradient usullari bilan global ravishda birgalikda o'qitishni (end-to-end differentiable pipelines) kiritdilar. Bunda segmentatsiya kabi yashirin o'zgaruvchilar (latent variables) interpretatsiya grafidagi eng qisqa yo'lni topish orqali barcha modullar bilan birgalikda moslashadi (co-adapt).

2.2. Deterministik Model Serving va Covariate Shift (Ioffe & Szegedy, 2015)
Deterministik Inference: Production serving vaqtida model chiqishi mini-batchdagi boshqa so'rovlarga bog'liq bo'lmasligi, balki faqat kirishning o'ziga deterministik bog'liq bo'lishi shart. [[Batch Normalization]] da buning uchun o'qitishdan keyin batch statistikasi populyatsiya baholari bilan almashtirilib, qat'iy affin akslantirishga (fixed affine map) biriktiriladi.
Covariate Shift va Amaliy Cheklovlar: O'qitish va test/production bosqichlari orasida kirish belgilari statistik taqsimotining o'zgarishi (covariate shift) hamda xotira sarfi, o'qitish vaqti va tasniflash vaqti (classification time) production klassifikatorini tanlashda asosiy muhandislik cheklovlari hisoblanadi (LeCun et al., 1998; Ioffe & Szegedy, 2015).
Izoh (Manba maqomi): GTN tijoriy bank cheklarini o'qish konveyeri (LeCun et al., 1998), deterministik inference va covariate shift (Ioffe & Szegedy, 2015) birlamchi manbalar bilan tasdiqlangan. Zamonaviy bulutli CI/CD, concept drift alerting, logging va observability vositalari bo'yicha spetsifikatsiyalar joriy manbalar to'plamida mavjud emasligi sababli Tasdiqlanmagan deb belgilandi.

3. Bog'liq tushunchalar
Oldin o'rganish:

[[Production-Ready ML Loyihasi Tuzilmasi]]
[[Batch Normalization]]
[[Loss Functions]]
Bog'liq:

[[CNN]]
[[RAG]]
[[AI Agent]]
4. Tekshirilgan manbalar
LeCun, Y., Bottou, L., Bengio, Y., & Haffner, P. (1998). Gradient-Based Learning Applied to Document Recognition. Proceedings of the IEEE, 86(11), 2278–2324. DOI: 10.1109/5.726791.
Ioffe, S., & Szegedy, C. (2015). Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift. ICML 2015, PMLR 37:448–456.
Bo'lim H: Additional Learning Resources
Fayl: Usefull Youtube videos.md
tags:

ai
resources
youtube
education aliases:
Useful YouTube Videos
Foydali YouTube videolar status: verified level: beginner-to-advanced last_verified: 2026-11-14
Usefull Youtube videos (Tekshirilgan Video Manbalar)
Ushbu konspektda faqat sarlavhasi, muallifi, nashr sanasi, mavzusi va aniq YouTube URL manzili tekshirilgan original o'quv videolari keltirilgan. Hech bir URL taxmin qilinmagan.

1. Tekshirilgan Videolar Jadvali
№

Video sarlavhasi

Muallif / Kanal

Nashr sanasi

To'g'ridan-to'g'ri URL

Bog'liq konspektlar

Prerekvizit darajasi va O'quv maqsadi

1

But what is a neural network? | Deep learning, chapter 1

3Blue1Brown (Grant Sanderson)

2017-10-05

https://www.youtube.com/watch?v=aircAruvnKk

[[Deep Learning]], [[Vector]], [[Matrix]], [[Hosila]]

Beginner: 28x28 (784 piksel) qo'lyozma raqamlarini tanish misolida neyronlar (0 va 1 orasidagi aktivatsiya tutuvchilar), 2 ta 16 neyronli yashirin qatlam, 10 ta chiqish neyroni va nochiziqlilik nima uchun muhimligini vizual tushuntiradi.

2

Visual intro to transformers | Chapter 5, Deep Learning

3Blue1Brown (Grant Sanderson)

2024-04-01

https://www.youtube.com/watch?v=wjZofJX0v4M

[[LLM]], [[Transformers]], [[Embeddings]], [[Tokenization]]

Beginner-to-Intermediate: GPT va Transformer modellarining umumiy ishlash tamoyilini, tokenlar, embeddinglar va keyingi so'zni bashorat qilish jarayonini vizual bayon qiladi.

3

Attention in transformers, step-by-step | Deep Learning Chapter 6 (shuningdek: Visualizing Attention, a Transformer's Heart)

3Blue1Brown (Grant Sanderson)

2024-04-07

https://www.youtube.com/watch?v=eMlx5fFNoYc

[[Transformers]], [[Matrix Operations]], [[Embeddings]], [[LLM]]

Intermediate-to-Advanced: Self-Attention, Multi-Head Attention va Cross-Attention mexanizmlarini qadam-baqadam tahlil qiladi (GPT-3 ning 12,288 o'lchamli embeddinglari, 96 ta attention head va 128 qatorli Key/Query matritsalari misolida).

4

Let's build GPT: from scratch, in code, spelled out.

Andrej Karpathy

2023

https://www.youtube.com/watch?v=kCc8FmEb1nY

[[Transformers]], [[LLM]], [[Production-Ready ML Loyihasi Tuzilmasi]]

Intermediate-to-Advanced: PyTorch va nanoGPT asosida auto-regressive GPT til modelini noldan kodda yozib ko'rsatadi. Prerekvizit: Karpathy o'z tavsiyasida avvalgi makemore videolarini ko'rishni, auto-regressive til modellash, tenzorlar va PyTorch nn asoslari bilan tanish bo'lishni talab qiladi.

Izoh (Manba maqomi): Yuqoridagi 4 ta video (3Blue1Brown va Andrej Karpathy) ning aniq URL manzillari va mazmuni to'liq tekshirildi. Nomzodlar ro'yxatidagi boshqa kanallar (Stanford University CS229, MIT OpenCourseWare, DeepLearning.AI, PyTorch official) bo'yicha aniq tasdiqlangan o'quv video URL manzillari joriy qidiruv natijalarida chiqmaganligi sababli, URL to'qib chiqarmaslik qoidasiga binoan ro'yxatga kiritilmadi (Tasdiqlanmagan).

2. Bog'liq tushunchalar
Bog'liq:

[[AI Map]]
[[Deep Learning]]
[[Transformers]]
[[LLM]]
4. Deliverable D — AI_Learning_Roadmap.md
Quyidagi o'quv xaritasi mavzularning ixtiyoriy murakkablik darajasiga emas, balki qat'iy matematik va arxitekturaviy prerekvizit bog'liqliklariga (dependency graph) asoslangan.

tags:

ai
roadmap
learning-path status: verified last_verified: 2026-11-14
AI Engineering Learning Roadmap (Prerekvizitlarga Asoslangan O'quv Yo'l Xaritasi)
Ushbu o'quv yo'l xaritasi har bir keyingi mavzuni o'zlashtirish uchun zarur bo'lgan matematik va muhandislik poydevorini ketma-ket bosqichlarda taqdim etadi.

Bosqich 1: Matematik Poydevor — Chiziqli Algebra va Ehtimollar
Maqsad: Ma'lumotlar va model vaznlarini ko'p o'lchamli fazoda ifodalash hamda statistik taqsimotlarni tushunish.

[[Math for Deep Learning]] (Umumiy ko'rinish)
[[Vector]] \to Skalyar ko'paytma (q \cdot k), birlik vektor (e_k), L_2 va L_\infty normalari.
[[Matrix]] \to Vazn matritsalari (W), chiziqli proyeksiyalar va diagonal matritsalar.
[[Matrix Operations]] \to Transponirlash (K^T) va matritsalarni ko'paytirish (Q K^T).
[[Tensor]] \to Ko'p o'lchamli massivlar va GPU da parallel hisoblash.
[[Probability]] \to Tasodifiy o'zgaruvchilar va Softmax ehtimollik taqsimoti.
[[Mean]] \to Matematik kutilma (E[x]), mini-batch o'rtachasi (\mu_{\mathcal{B}}) va 1-moment (m_t).
[[Standard Deviation]] \to Dispersiya (\sigma^2), standartlashtirish, \sqrt{d_k} masshtablash va 2-moment (v_t).
Bosqich 2: Matematik Analiz (Calculus) va Optimallashtirish Nazariyasi
Maqsad: Neyron tarmoq qanday qilib xatolikdan o'rganishini matematik jihatdan chiqarib bilish. 9. [[Hosila]] \to Funksiya o'zgarish tezligi va logistik sigmoid to'yinishi (\max \sigma'(x) = 0.25). 10. [[Partial Derivative]] \to Ko'p o'zgaruvchili funksiyada alohida vazn bo'yicha hosila. 11. [[Gradient]] \to Xususiy hosilalar vektori (\nabla_\theta f_t(\theta_t)) va masshtabga nisbatan invariantlik. 12. [[Chain Rule]] \to Ketma-ket va tarmoqlangan hisoblash graflarida hosilalar ko'paytmasi va yig'indisi. 13. [[Gradient Descent]] (Kanonik konspekt) \to Parametrlarni yangilash qoidasi va mini-batch me'yorlari.

Bosqich 3: AI, ML, DL Asoslari va Modelni O'qitish Mexanizmi
Maqsad: Ko'p qatlamli neyron tarmoqni noldan yig'ish va barqaror o'qitish. 14. [[Artificial Intelligence]] \to Hand-crafted qoidalar va gradientga asoslangan o'rganish farqi. 15. [[Machine Learning]] \to Y_p = F(Z_p, W), Supervised / Unsupervised / Online o'rganish. 16. [[Deep Learning]] + [[Usefull Youtube videos]] (3Blue1Brown Ch. 1) \to Yashirin qatlamlar va representation learning. 17. [[Loss Functions]] \to E_p = D(D_p, F(Z_p, W)), MSE, Cross-Entropy, Label Smoothing va Global Loss. 18. [[Backpropagation]] \to Forward/Backward pass, barcha iste'molchilar yig'indisi va finite-difference tekshiruvi. 19. [[Learning Rate]] \to Step size, 1/\sqrt{t} decay va cyclical schedules. 20. [[SGD]] \to Momentum, Proposition 1 (L_2 reg = Weight Decay) va SGDW. 21. [[Adam]] va [[Optimizers]] \to 1-/2-momentlar, Bias Correction, SNR, Proposition 2 va AdamW. 22. [[Batch Normalization]] \to Mini-batch normalizatsiya, \gamma, \beta parametrlari, training vs. deterministik inference.

Bosqich 4: Klassik Chuqur O'rganish Arxitekturalari (Fazoviy va Ketma-ketlik Modellari)
Maqsad: Tasvirlar va vaqtli ketma-ketliklar uchun maxsus arxitekturalarni tushunish. 23. [[CNN]] \to Lokal retseptiv maydonlar, shared weights, LeNet-5 (S2/S4 subsampling, C3 1,516 parametr) va zamonaviy konvolyutsiyalar. 24. [[RNN]] \to Rekurrent qisqa muddatli xotira va vanishing/exploding gradients matematikasi. 25. [[LSTM]] \to Constant Error Carousel (CEC, w_{jj}=1.0), Input va Output darvozalari (1000+ vaqt qadami).

Bosqich 5: Zamonaviy Katta Til Modellari (LLMs) va Transformerlar
Maqsad: Zamonaviy Generative AI arxitekturasini matematik va kod darajasida egallash. 26. [[Tokenization]] \to Tokenlar va subword birliklar (Sennrich et al., 2015). 27. [[Embeddings]] \to Taqsimlangan va kontekstual vektor fazolari. 28. [[Transformers]] + [[Usefull Youtube videos]] (3Blue1Brown Ch. 5–6) \to Scaled Dot-Product Attention, Multi-Head Attention (h=8, d_k=64), Sinusoidal Positional Encoding. 29. [[LLM]] + [[Usefull Youtube videos]] (Karpathy nanoGPT) \to Auto-regressive next-token prediction va GPT-2/GPT-3 arxitekturasi. 30. [[Prompt Engineering]] \to Kontekstual yangilanish va mulohaza yuritish.

Bosqich 6: Amaliy AI Muhandisligi — RAG, Agentlar va Production Tizimlari
Maqsad: Til modellarini tashqi bilimlar bazasi, vositalar va sanoat konveyerlari bilan integratsiya qilish. 31. [[Memory]] \to Qisqa muddatli aktivatsiyalar, uzoq muddatli vaznlar, kontekst oynasi va tashqi xotira. 32. [[RAG]] \to Bilimga asoslangan NLP vazifalarida qidiruv va generatsiya (Lewis et al., 2020). 33. [[Tools]] va [[AI Agent]] \to Mulohaza va harakat uyg'unligi (ReAct; Yao et al., 2022). 34. [[Atomic Note]], [[Production-Ready ML Loyihasi Tuzilmasi]] va [[Real Production ML Pipeline Arxitektura va Ish Jarayoni]] (Graph Transformer Networks; LeCun et al., 1998).

5. Deliverable E — AI_Research_Sources.md
Quyidagi jadvalda ushbu hisobot va Obsidian konspektlaridagi barcha matematik formulalar, arxitekturaviy qarorlar va tarixiy faktlarni tasdiqlash uchun foydalanilgan manbalar hamda ularning tekshiruv darajasi (to'liq matn parchalari tekshirilgan vs. faqat bibliografik metama'lumot tekshirilgan) aniq hujjatlashtirilgan.

№

Manba sarlavhasi

Muallif(lar) / Tashkilot

Nashr yili / Versiya

To'g'ridan-to'g'ri URL yoki DOI

Tegishli konspektlar

Qaysi da'vo yoki formulani tasdiqlaydi?

Tekshiruv maqomi

1

Attention Is All You Need

Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin (Google Brain / Google Research)

2017 (NIPS 2017, Vol. 30, pp. 5998–6008; arXiv v1: 12 Jun 2017, v7: 2 Aug 2023)

https://arxiv.org/abs/1706.03762 / DOI: 10.48550/arXiv.1706.03762

[[Transformers]], [[LLM]], [[Embeddings]], [[Vector]], [[Matrix Operations]], [[Standard Deviation]]

N=6 Encoder-Decoder tuzilmasi; Scaled Dot-Product Attention \text{softmax}(QK^T/\sqrt{d_k})V; q \cdot k dispersiyasi d_k ekanligi (Footnote 4); Multi-Head Attention (h=8, d_k=d_v=64); Sinusoidal Positional Encoding; kvadratik murakkablik.

Verified (Tier 1 Primary — Content Inspected)

2

Long Short-Term Memory

Sepp Hochreiter, Jürgen Schmidhuber (TU München / IDSIA)

1997 (Neural Computation, 9(8):1735–1780)

DOI: 10.1162/neco.1997.9.8.1735

[[LSTM]], [[RNN]], [[Memory]], [[Chain Rule]], [[Hosila]]

RNN larda vanishing/exploding gradientning \prod_{m=1}^q f'_{l_m} w_{l_m l_{m-1}} matematik tahlili ($\max \sigma' = 0.25,

w

3

Gradient-Based Learning Applied to Document Recognition

Yann LeCun, Léon Bottou, Yoshua Bengio, Patrick Haffner

1998 (Proceedings of the IEEE, 86(11):2278–2324)

DOI: 10.1109/5.726791

[[CNN]], [[Machine Learning]], [[Loss Functions]], [[Real Production ML Pipeline Arxitektura va Ish Jarayoni]]

Y_p = F(Z_p, W) va E_p = D(D_p, F(Z_p, W)) tenglamalari; LeNet-5 (32x32 kirish, C1, S2, C3, S4, C5, F6, RBF); S2/S4 dagi o'rganiladigan subsampling (12 va 32 parametr); C3 qisman bog'lanishi (1,516 vs 2,416 parametr); Graph Transformer Networks (GTN).

Verified (Tier 1 Primary — Content Inspected)

4

Learning representations by back-propagating errors

David E. Rumelhart, Geoffrey E. Hinton, Ronald J. Williams

1986 (Nature, Vol. 323, pp. 533–536)

DOI: 10.1038/323533a0

[[Backpropagation]], [[Deep Learning]], [[Chain Rule]], [[Partial Derivative]], [[Gradient Descent]]

Ko'p qatlamli tarmoqlarda ichki tasvirlarni (internal representations) o'rganish; barcha iste'molchi tugunlar bo'yicha hosilalar yig'indisini olish; qarama-qarshi ishorali yo'llarning qisqarishi; finite-difference tekshiruvi.

Verified (Tier 1 Primary — Content Inspected)

5

Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift

Sergey Ioffe, Christian Szegedy (Google)

2015 (ICML 2015, PMLR 37:448–456; ICML 2025 Test of Time Award)

https://arxiv.org/abs/1502.03167 / DOI: 10.48550/arXiv.1502.03167

[[Batch Normalization]], [[Mean]], [[Standard Deviation]], [[Learning Rate]], [[Gradient Descent]]

Algorithm 1 (\mu_{\mathcal{B}}, \sigma_{\mathcal{B}}^2, \hat{x}_i, y_i = \gamma \hat{x}_i + \beta); oldingi bias b ning qisqarib ketishi; training vs. deterministik inference; ImageNet natijalari (31.0M vs 13.3M vs 2.1M qadam; 4.9% val / 4.82% test top-5 error).

Verified (Tier 1 Primary — Content Inspected)

6

Adam: A Method for Stochastic Optimization

Diederik P. Kingma, Jimmy Ba (Univ. of Amsterdam / Univ. of Toronto)

2015 (ICLR 2015; arXiv v1: 22 Dec 2014, v9: 30 Jan 2017)

https://arxiv.org/abs/1412.6980 / DOI: 10.48550/arXiv.1412.6980

[[Adam]], [[Optimizers]], [[Mean]], [[Standard Deviation]], [[Gradient]], [[Vector]]

1- va 2-tartibli momentlar (m_t, v_t); Bias correction (\hat{m}_t, \hat{v}_t); Signal-to-Noise Ratio (m_t/\sqrt{v_t}); diagonal rescaling invariantligi; Theorem 4.1 (O(\sqrt{T}) regret); AdaMax (L_\infty norma).

Verified (Tier 1 Primary — Content Inspected)

7

Decoupled Weight Decay Regularization

Ilya Loshchilov, Frank Hutter

2019 (ICLR 2019; arXiv v1: 14 Nov 2017, v3: 4 Jan 2019)

https://arxiv.org/abs/1711.05101 / DOI: 10.48550/arXiv.1711.05101

[[Adam]], [[SGD]], [[Optimizers]], [[Learning Rate]]

Proposition 1 (SGD da Weight Decay = L_2 reg, \lambda' = \lambda/\alpha); Proposition 2 (Adaptiv gradientlarda Weight Decay \neq L_2 reg); SGDW (Algorithm 1) va AdamW (Algorithm 2); test xatoligini 15% ga kamaytirish.

Verified (Tier 1 Primary — Content Inspected)

8

Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks

Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, et al.

2020 (May 2020)

DOI: 10.48550/arXiv.2005.11401 / https://huggingface.co/papers/2005.11401

[[RAG]], [[Memory]], [[AI Agent]]

Bilimga asoslangan NLP vazifalari uchun Retrieval-Augmented Generation maqolasining bibliografik metama'lumoti (ichki tenglamalar to'liq matn ko'rilmagani uchun Tasdiqlanmagan deb belgilandi) .

Bibliographic Metadata Verified (Full Text Uninspected)

9

ReAct: Synergizing Reasoning and Acting in Language Models

Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao

2022

https://huggingface.co/papers/2210.03629 (arXiv:2210.03629)

[[AI Agent]], [[Tools]], [[Prompt Engineering]]

Til modellarida mulohaza yuritish (reasoning) va harakat qilishni (acting) birlashtirish maqolasining bibliografik metama'lumoti (ichki detallar Tasdiqlanmagan deb belgilandi) .

Bibliographic Metadata Verified (Full Text Uninspected)

10

Neural Machine Translation of Rare Words with Subword Units

Rico Sennrich, et al.

2015 (Published 31 Aug 2015)

https://huggingface.co/papers/1508.07909 (arXiv:1508.07909)

[[Tokenization]], [[LLM]]

Neyron mashina tarjimasida kam uchraydigan so'zlarni subword birliklar orqali ifodalash maqolasining bibliografik metama'lumoti.

Bibliographic Metadata Verified (Full Text Uninspected)

11

But what is a neural network? | Deep learning, chapter 1

Grant Sanderson (3Blue1Brown)

2017 (Oct 5, 2017)

https://www.youtube.com/watch?v=aircAruvnKk

[[Deep Learning]], [[Usefull Youtube videos]]

784 kirish neyroni (28x28), 2 ta 16 neyronli yashirin qatlam va 10 ta chiqish neyroni misolida neyron tarmoq intuitsiyasi.

Verified (Tier 3 Educational — Content Inspected)

12

Visual intro to transformers | Chapter 5 & Attention in transformers, step-by-step | Chapter 6

Grant Sanderson (3Blue1Brown)

2024 (Apr 1 & Apr 7, 2024)

https://www.youtube.com/watch?v=wjZofJX0v4M & https://www.youtube.com/watch?v=eMlx5fFNoYc

[[Transformers]], [[Embeddings]], [[LLM]], [[Usefull Youtube videos]]

Kontekstual embedding yangilanishi (\Delta e), GPT-3 (12,288 ustun va 128 satrli Key/Query matritsalari, 96 attention heads) misolida diqqat mexanizmi.

Verified (Tier 3 Educational — Content Inspected)

13

Let's build GPT: from scratch, in code, spelled out.

Andrej Karpathy

2023

https://www.youtube.com/watch?v=kCc8FmEb1nY

[[LLM]], [[Transformers]], [[Production-Ready ML Loyihasi Tuzilmasi]], [[Usefull Youtube videos]]

nanoGPT arxitekturasi (~300 qator model + ~300 qator training loop), GPT-2 (124M) ni qayta tiklash, 3 daqiqali Shakespeare o'qitish va PyTorch implementatsiyasi.

Verified (Tier 3 Educational — Content Inspected)

6. Deliverable F — AI_Research_Summary.md
Miqdoriy va Sifat Ko'rsatkichlari Xulosasi
So'ralgan jami mavzular soni (Inventarizatsiya): 39 ta (markaziy AI Map.md + A–H bo'limlaridagi 38 ta mavzu).
Foydalanuvchi tomonidan yuklangan mavjud fayllar soni: 0 ta (Content not provided — ishchi muhit bo'sh ekanligi aniqlandi va hech bir fayl soxta "audit qilindi" deb da'vo qilinmadi).
Dublikatlarni birlashtirish (Canonical Merging): 2 ta dublikat (Gradient Descent.md va Gradient Descent (Math).md) yagona [[Gradient Descent]] kanonik konspektiga birlashtirildi. Natijada 38 ta alohida kanonik Obsidian Markdown hujjati (AI Map.md + 37 ta mavzu konspekti) + AI_Learning_Roadmap.md to'liq taqdim etildi.
To'liq birlamchi manba matni va o'quv materiallari bilan tasdiqlangan (Verified) konspektlar soni: 29 ta (jumladan AI Map.md).
Qisman tasdiqlangan va to'liq matni ochilmagan qismlari Tasdiqlanmagan deb belgilangan (Partially Verified) konspektlar soni: 9 ta (Artificial Intelligence.md, Tokenization.md, Prompt Engineering.md, AI Agent.md, RAG.md, Tools.md, Atomic Note.md, Production-Ready ML Loyihasi Tuzilmasi.md, Real Production ML Pipeline Arxitektura va Ish Jarayoni.md).
Asosiy Ilmiy va Tashkiliy Yaxshilanishlar
Tarixiy va Matematik Aniqlik Tiklandi:
[[Transformers]]: Vaswani et al. (2017) dagi original Encoder-Decoder (N=6, d_{\text{model}}=512, h=8, d_k=64, sinusoidal positional encoding) va keyingi GPT/ViT modellari aniq ajratildi; \sqrt{d_k} masshtablashning dispersiyani d_k dan 1 ga tushirish isboti (Footnote 4) keltirildi.
[[CNN]]: LeCun et al. (1998) dagi LeNet-5 ning haqiqiy tuzilmasi (S2/S4 dagi 12 va 32 parametrli o'rganiladigan subsampling, C3 dagi 1,516 parametrli qisman bog'lanish va RBF chiqish qatlami) zamonaviy Max-Pooling/ReLU soddalashtirishlaridan farqlandi.
[[LSTM]] va [[RNN]]: Hochreiter & Schmidhuber (1997) asosida vanishing gradientning diagonal hosila matritsalari ko'paytmasi (\max \sigma'(x) = 0.25) orqali tahlili va Constant Error Carousel (w_{jj}=1.0) mexanizmi berildi.
[[Adam]] va [[SGD]]: Kingma & Ba (2015) ning bias correction (\hat{m}_t, \hat{v}_t) hamda Loshchilov & Hutter (2019) ning adaptiv optimizatorlarda L_2 regulyarizatsiya va Weight Decay ekvivalent emasligi (Proposition 1 va Proposition 2 — AdamW zarurati) teoremalari va sonli misollari kiritildi.
[[Batch Normalization]]: Ioffe & Szegedy (2015) dagi mini-batch (training) va populyatsiya (inference) statistikalari farqi, oldingi qatlam bias (b) ning qisqarib ketishi va BN-Baseline (13.3M qadam) vs BN-x5 (2.1M qadam — 14x) tezlanish omillari aniq raqamlar bilan ko'rsatildi.
Ochiq Qolgan Masalalar va Keyingi Bosqich (Unresolved Questions & Remaining Work)
Agar sizda mahalliy kompyuteringizda avval yozilgan .md fayllar mavjud bo'lsa, ularni keyingi sessiyada yuklaganingizda satrma-satr solishtirma diff-audit o'tkazish mumkin.
Joriy qidiruvda faqat bibliografik metama'lumotlari tasdiqlangan 3 ta maqola (arXiv:2005.11401 — RAG , arXiv:2210.03629 — ReAct , arXiv:1508.07909 — BPE) ning to'liq PDF matnlarini hamda zamonaviy MLOps infratuzilmasi hujjatlarini keyingi bosqichda yuklab, Tasdiqlanmagan deb belgilangan bo'limlarni to'liq birlamchi tenglamalar bilan kengaytirish tavsiya etiladi.
Источники
1. Attention is All you Need - NIPS, https://papers.neurips.cc/paper/7181-attention-is-all-you-need.pdf 2. LONG SHORT-TERM MEMORY 1 INTRODUCTION, http://www.bioinf.jku.at/publications/older/2604.pdf 3. Learning Representations by Back-Propagating Errors - Abhik Sarkar, https://www.abhik.ai/papers/backpropagation 4. Batch Normalization: Accelerating Deep Network Training by, https://computervisiononline.com/explains/batch-normalization-paper/ 5. (PDF) Gradient-based learning applied to document recognition, https://www.researchgate.net/publication/2985446_Gradient-based_learning_applied_to_document_recognition 6. [1412.6980] Adam: A Method for Stochastic Optimization - arXiv, https://arxiv.org/abs/1412.6980 7. [1711.05101] Decoupled Weight Decay Regularization - arXiv, https://arxiv.org/abs/1711.05101 8. Gradient-Based Learning Applied to Document Recognition - Medium, https://medium.com/@umairinayat/gradient-based-learning-applied-to-document-recognition-a-modern-reading-of-lecun-et-al-1998-0617cb53a3f5 9. arXiv:1711.05101v3 [cs.LG] 4 Jan 2019, https://arxiv.org/pdf/1711.05101 10. LeNet: Gradient-Based Learning Applied to Document Recognition, https://www.abhik.ai/papers/lenet 11. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, https://huggingface.co/papers/2005.11401 12. ReAct: Synergizing Reasoning and Acting in Language Models, https://huggingface.co/papers/2210.03629 13. Neural Machine Translation of Rare Words with Subword Units, https://huggingface.co/papers/1508.07909 14. Gradient-Based Learning Applied to Document Recognition (1998), https://tinycto.tv/ml-atlas/literature/lecun-1998-gradient-based-learning-applied-to-document-recognition 15. (PDF) Long Short-Term Memory - ResearchGate, https://www.researchgate.net/publication/13853244_Long_Short-Term_Memory 16. Reproduce “Decoupled Weight Decay Regularization” with AI agents, https://openresearch.sh/abs/1711.05101?paper=Decoupled+Weight+Decay+Regularization 17. Attention in Transformers. 3Blue1Brown Infographic Summary, https://medium.com/lazy-by-design/attention-in-transformers-3blue1brown-fbba4e826ab4 18. Attention Is All You Need - Wikipedia, https://en.wikipedia.org/wiki/Attention_Is_All_You_Need 19. (PDF) Attention is All you Need (2017) | Ashish Vaswani - SciSpace, https://scispace.com/papers/attention-is-all-you-need-1hodz0wcqb 20. Long Short-term Memory - Interactive Audio Lab, https://interactiveaudiolab.github.io/teaching/casa/HorchreiterSchmidhuber_LSTM.pdf 21. Batch Normalization: Accelerating Deep Network Training by ... - arXiv, https://arxiv.org/abs/1502.03167 22. [PDF] Batch Normalization: Accelerating Deep Network Training by, https://www.semanticscholar.org/paper/Batch-Normalization%3A-Accelerating-Deep-Network-by-Ioffe-Szegedy/995c5f5e62614fcb4d2796ad2faab969da51713e 23. Adam: A Method for Stochastic Optimization - arXiv, https://arxiv.org/pdf/1412.6980