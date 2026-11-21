# -*- coding: utf-8 -*-
"""
Enrichment data for Weeks 4 and 5 (D04.1 - D05.4)
"""

ENRICH_W4_W5 = {
    "D04.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Data Leakage (Ma'lumot Sizib Chiqishi) — 2 ta Asosiy Shakli",
                "explanationUz": "ML intervyularidagi eng muhim mavzu — **Data Leakage**. U ikki xil bo'ladi: 1) **Target Leakage** — featurelar orasida faqat natija sodir bo'lgandan KEYIN paydo bo'ladigan ustun qolib ketishi (masalan, mijoz ketishini bashorat qilishda `cancellation_reason_code` yoki `last_exit_survey_score` ustunini modelga berib yuborish); 2) **Train-Test Preprocessing Leakage** — `StandardScaler`, `SimpleImputer` yoki `SMOTE` ni `train_test_split` dan OLDIN butun jadvalga `.fit_transform()` qilish.",
                "codeExample": "import numpy as np\n\n# XATO USUL (Leakage): butun X ustida mean/std olish\nX = np.array([10.0, 12.0, 14.0, 1000.0]) # 1000.0 testga tushadigan outlier\nbad_train_norm = (X[:3] - X.mean()) / X.std()\n\n# TO'G'RI USUL: faqat X_train (X[:3]) ustida mean/std olish!\ntrain_mean, train_std = X[:3].mean(), X[:3].std()\ngood_train_norm = (X[:3] - train_mean) / train_std\nprint('Leakage bo\\'lgan train:', np.round(bad_train_norm, 3))\nprint('Toza (Leakage-free) train:', np.round(good_train_norm, 3))",
                "outputOrNoteUz": "Natija: Testdagi `1000.0` qiymati XATO usulda train qiymatlarini `[-0.58, -0.57, -0.57]` qilib buzib yubordi! Toza usulda esa `[-1.225, 0.0, 1.225]` chiqdi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Scikit-Learn Pipeline va ColumnTransformer",
                "explanationUz": "Cross-Validation (`K-Fold`) paytida 5 ta foldning har birida scaler va imputer faqat o'sha foldning 4 ta train bo'lagida `.fit()` bo'lib, 1 ta validatsiya bo'lagiga `.transform()` bo'lishi shart. Buni qo'lda yozish xatoga olib keladi. Scikit-Learn `Pipeline` va `ColumnTransformer` sonli ustunlarni (`SimpleImputer + StandardScaler`) va kategorik ustunlarni (`OneHotEncoder(handle_unknown='ignore')`) yagona kapsulaga birlashtirib, har bir CV fold ichida 100% leakage-free ishlashni kafolatlaydi.",
                "codeExample": "pipeline_architecture = [\n    ('num_branch', 'SimpleImputer(median) -> StandardScaler()', ['age', 'monthly_bill']),\n    ('cat_branch', 'SimpleImputer(most_frequent) -> OneHotEncoder(handle_unknown=ignore)', ['tariff', 'region']),\n    ('classifier', 'LogisticRegression(class_weight=balanced)', ['all_transformed_features']),\n]\nfor step, ops, cols in pipeline_architecture:\n    print(f'[{step:10}] {ops:65} <- {cols}')",
                "outputOrNoteUz": "Natija: Bitta `pipe.fit(X_train, y_train)` va `pipe.predict_proba(X_test)` chaqiruvi barcha transformatsiyalarni xavfsiz bajaradi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: StratifiedKFold vs GroupKFold vs TimeSeriesSplit",
                "explanationUz": "Oddiy random `KFold` hamma joyda ham ishlamaydi! 1) **Nomutanosib klasslarda** (5% Churn) har bir foldda aynan 5% Churn bo'lishi uchun `StratifiedKFold` shart; 2) **Bitta mijozdan bir nechta qator bo'lsa** (tibbiy tahlillar, tranzaksiyalar), ayni mijoz ham train, ham testga tushib qolmasligi uchun `GroupKFold(groups=user_id)` shart; 3) **Vaqtga bog'liq ma'lumotda** kelajakdan o'tmishni bashorat qilmaslik uchun `TimeSeriesSplit` shart.",
                "codeExample": "cv_strategies = {\n    'Imbalanced Binary/Multiclass': 'StratifiedKFold(n_splits=5)',\n    'Multiple rows per User/Patient': 'GroupKFold(n_splits=5) with groups=user_id',\n    'Temporal / Financial Forecasting': 'TimeSeriesSplit(n_splits=5) (expanding window)',\n}\nfor case, strat in cv_strategies.items():\n    print(f'{case:34} -> {strat}')",
                "outputOrNoteUz": "Natija: To'g'ri CV strategiyasini tanlash oflayn metrika bilan production metrikasi mos tushishining #1 garovidir."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Leakage vs Toza Cross-Validation Farqini Tajribada Ko'rish",
                "scenarioUz": "Tasodifiy shovqin ustida feature selection'ni CV dan oldin qilsak qanday soxta aniqlik chiqishini isbotlash.",
                "howToUseUz": "Kodni ishga tushirib soxta (leaked) va haqiqiy (honest) korrelyatsiya farqini ko'ring.",
                "code": "import numpy as np\n\nnp.random.seed(42)\n# 100 ta qator, 500 ta butunlay tasodifiy (foydasiz) ustun va tasodifiy target y\nX = np.random.randn(100, 500)\ny = np.random.randint(0, 2, size=100)\n\n# XATO: Butun 100 qatorda y bilan eng kuchli korrelyatsiyali ustunni tanlash (Leakage!)\ncorrs_all = [abs(np.corrcoef(X[:, j], y)[0, 1]) for j in range(500)]\nbest_j_leaked = int(np.argmax(corrs_all))\nprint('XATO (Butun datada tanlangan ustun test korrelyatsiyasi):', round(float(np.corrcoef(X[80:, best_j_leaked], y[80:])[0, 1]), 3))\n\n# TO'G'RI: Faqat Train (X[:80]) da tanlab, Test (X[80:]) da tekshirish\ncorrs_train = [abs(np.corrcoef(X[:80, j], y[:80])[0, 1]) for j in range(500)]\nbest_j_clean = int(np.argmax(corrs_train))\nprint('TO\\'G\\'RI (Trainda tanlangan ustunning haqiqiy Test korrelyatsiyasi):', round(float(np.corrcoef(X[80:, best_j_clean], y[80:])[0, 1]), 3))",
                "expectedOutput": "XATO (Butun datada tanlangan ustun test korrelyatsiyasi): 0.412\nTO'G'RI (Trainda tanlangan ustunning haqiqiy Test korrelyatsiyasi): 0.031",
                "breakdownUz": "Butun datada feature tanlanganda tasodifiy shovqindan `0.412` soxta signal chiqdi, toza splitda esa u aslida `0.031` (shovqin) ekani fosh bo'ldi!"
            },
            {
                "titleUz": "2-misol: OneHotEncoder handle_unknown='ignore' Himoyasi",
                "scenarioUz": "Train vaqtida faqat `['Toshkent', 'Samarqand']` bor edi, ammo production'da `'Xiva'` kelib qoldi. Model qulamasligi uchun nima qilinadi?",
                "howToUseUz": "Yangi kategoriyani xavfsiz nol vektorga o'tkazish kodini sinang.",
                "code": "known_cats = ['Toshkent', 'Samarqand', 'Buxoro']\n\ndef safe_one_hot(city: str, vocab: list[str]) -> list[int]:\n    return [1 if city == c else 0 for c in vocab]\n\nprint('Toshkent ->', safe_one_hot('Toshkent', known_cats))\nprint('Xiva (Yangi, handle_unknown=ignore) ->', safe_one_hot('Xiva', known_cats))",
                "expectedOutput": "Toshkent -> [1, 0, 0]\nXiva (Yangi, handle_unknown=ignore) -> [0, 0, 0]",
                "breakdownUz": "`handle_unknown='ignore'` yangi kategoriyada `ValueError` otmasdan `[0, 0, 0]` vektor qaytaradi va API barqaror ishlaydi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Data Leakage (Target & Preprocessing)",
                "category": "Classic ML",
                "definitionUz": "Modelni o'qitish vaqtida production inferens paytida mavjud bo'lmaydigan kelajak yoki test to'plami axborotining modelga sizib o'tishi.",
                "analogyOrExampleUz": "Talabaga imtihondan oldin aynan imtihonga tushadigan savollarning javob varag'ini ko'rsatib qo'yish — u imtihondan 100% oladi, ammo haqiqiy ishda hech narsa bilmaydi.",
                "connectedTo": [
                    {
                        "targetTerm": "Portfolio-1 Churn Evaluation Criteria",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "4-hafta portfolio himoyasida birinchi tekshiriladigan mezon — Pipeline ichida Data Leakage yo'qligidir."
                    }
                ]
            },
            {
                "term": "Scikit-Learn Pipeline & ColumnTransformer",
                "category": "Classic ML",
                "definitionUz": "Ma'lumotlarni tozalash, masshtablash, kodlash va modelni yagona `.fit()` / `.predict()` interfeysiga bog'lovchi kompozit arxitektura.",
                "analogyOrExampleUz": "Zavod quvuri: xomashyo bir boshidan kirib, yuvish, kesish va qadoqlash apparatlaridan inson qo'li tegmasdan avtomatik o'tishi.",
                "connectedTo": [
                    {
                        "targetTerm": "MLflow Model Packaging (`mlflow.sklearn`)",
                        "targetLessonId": "D04.3",
                        "relationshipUz": "MLflow'ga faqat modelning o'zini emas, balki butun `Pipeline` (preprocessor + model) ni bitta artefakt sifatida saqlaymiz."
                    }
                ]
            },
            {
                "term": "Cross-Validation (Stratified / Group / TimeSeries)",
                "category": "Classic ML",
                "definitionUz": "Ma'lumotni $K$ ta bo'lakka bo'lib, modelning umumlashtirish (generalization) qobiliyatini va barqarorligini ($\\mu \\pm \\sigma$) baholash usuli.",
                "analogyOrExampleUz": "Sportchini bitta stadionda emas, 5 xil ob-havo va maydonda sinab o'rtacha natijasini olish.",
                "connectedTo": [
                    {
                        "targetTerm": "Confidence Intervals for Model Metrics",
                        "targetLessonId": "D03.4",
                        "relationshipUz": "3-haftadagi ishonch oralig'i bu yerda 5-Fold CV ballari (`mean_auc ± 1.96 * std_auc`) sifatida qo'llaniladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d04-1-int-1",
                "level": "Junior",
                "questionUz": "`StandardScaler` da `.fit()`, `.transform()` va `.fit_transform()` metodlari qayerda va qanday ishlatiladi?",
                "interviewerIntentUz": "Train va Test to'plamlarini qayta ishlashning oltin qoidasini bilishini tekshirish.",
                "strongAnswerUz": "`.fit_transform()` FAQAT `X_train` ustida chaqiriladi — u train to'plamining $\\mu$ va $\\sigma$ parametrlarini hisoblab oladi (`.fit()`) va train'ni masshtablaydi (`.transform()`). `X_val`, `X_test` va production'dagi yangi ma'lumotlarda esa FAQAT `.transform()` chaqiriladi (ya'ni train'dan olingan $\\mu$ va $\\sigma$ ishlatiladi). Agar `X_test` ustida `.fit_transform()` chaqirilsa, bu qo'pol Data Leakage va masshtab buzilishi hisoblanadi.",
                "redFlagUz": "'`X_train` ga ham, `X_test` ga ham `.fit_transform()` qilaman' deyish.",
                "followUpQuestionUz": "Savol: Agar production'da bitta mijoz uchun (`1` ta qator) `.fit_transform()` qilib qo'yilsa nima bo'ladi? Javob: 1 ta qatorning o'z o'rtachasi o'ziga teng bo'lgani uchun `x - mean = 0` bo'lib, barcha feature'lar `0.0` ga aylanib ketadi!"
            },
            {
                "id": "d04-1-int-2",
                "level": "Middle",
                "questionUz": "Mijozning kredit to'lov qobiliyatini bashorat qilish modelida `ROC-AUC = 0.998` chiqdi. Quvonish o'rniga nimadan shubhalanasiz va qanday tekshirasiz?",
                "interviewerIntentUz": "Target Leakage diagnostikasini bilishini sinash.",
                "strongAnswerUz": "Jadvalli (tabular) biznes masalalarida `0.998` AUC deyarli 100% ehtimol bilan **Target Leakage** belgisidir! Tekshirish tartibi: 1) `Feature Importance` (yoki SHAP) grafigini chiqaraman — odatda bitta leaked ustun ahamiyatning 90%+ qismini egallab olgan bo'ladi (masalan `collection_agency_assigned`, `late_fee_paid` yoki `account_closed_date`); 2) Vaqt tamg'alarini (`timestamp`) tekshiraman — feature qiymati target voqeasidan keyin yangilangan bo'lishi mumkin; 3) ID yoki dublikat qatorlar train va test orasida bo'linib qolganini tekshiraman.",
                "redFlagUz": "'Demak modelim juda zo'r chiqqan, darhol production'ga chiqaraman' deyish.",
                "followUpQuestionUz": "Savol: Target Encoding (kategoriyani target o'rtachasi bilan kodlash) da leakage qanday oldi olinadi? Javob: Out-of-fold (OOF) target encoding va Bayesian smoothing (`m-estimate`) orqali, faqat train fold ichida hisoblash bilan."
            },
            {
                "id": "d04-1-int-3",
                "level": "Senior / Production",
                "questionUz": "SMOTE (sintetik oversampling) ni Cross-Validation dan OLDIN qo'llash nima uchun halokatli xato?",
                "interviewerIntentUz": "Eng ko'p uchraydigan CV + Oversampling xatosini bilishini tekshirish.",
                "strongAnswerUz": "Agar SMOTE `K-Fold` bo'linishidan oldin butun train to'plamga qo'llansa, SMOTE kam uchraydigan klass nuqtalari orasida chiziqli interpolatsiya qilib egizak sintetik nuqtalar yaratadi. Keyin K-Fold bo'linganda, asl nuqta Train foldga, uning deyarli nusxasi bo'lgan sintetik qo'shnisi esa Validation foldga tushadi! Natijada CV balli `0.95` ko'rsatadi, real production'da esa `0.60` ga qulaydi. SMOTE faqat `imblearn.pipeline.Pipeline` ichida, har bir CV foldning FAQAT train qismiga qo'llanilishi (va validatsiya foldi asl tabiiy nisbatda qolishi) shart.",
                "redFlagUz": "'Avval SMOTE bilan balanslab olib, keyin `train_test_split` qilaman' deyish.",
                "followUpQuestionUz": "Savol: Zamonaviy Gradient Boosting (LightGBM/XGBoost) da SMOTE o'rniga nima tavsiya etiladi? Javob: Asl taqsimotni buzmasdan `scale_pos_weight` (yoki `class_weight='balanced'`) va ehtimollik threshold tuning + PR-AUC optimallashtirish."
            }
        ],
        "videos": [
            {
                "id": "vid-d04-1-en",
                "title": "Data Splitting (Train/Validation/Test) | Data Leakage | Stratified & Time Series",
                "channel": "RoboSathi",
                "language": "en",
                "youtubeId": "DGM9wktXyjE",
                "youtubeUrl": "https://www.youtube.com/watch?v=DGM9wktXyjE",
                "durationOrTimestamp": "To'liq vizual tahlil",
                "whatItExplainsUz": "Train/Validation/Test bo'linishi, Data Leakage qanday yuzaga kelishi, Stratified Sampling va Time Series Split qoidalari vizual ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, yuqoridagi 1-amaliy misoldagi Leaked vs Clean feature selection kodini ishga tushirib natijani solishtiring."
            },
            {
                "id": "vid-d04-1-ru",
                "title": "Урок 2. Валидация в Data Science и Data Leakage",
                "channel": "Ruslan Senatorov",
                "language": "ru",
                "youtubeId": "vwO-asADnsY",
                "youtubeUrl": "https://www.youtube.com/watch?v=vwO-asADnsY",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "Real musobaqalar va production loyihalarda uchraydigan Data Leakage turlari va to'g'ri validatsiya sxemasini tanlash tushuntirilgan.",
                "howToUseVideoUz": "O'z loyihangizda qaysi CV turi (`StratifiedKFold`, `GroupKFold`, `TimeSeriesSplit`) mos kelishini aniqlash uchun chek-list tuzing."
            }
        ],
        "quiz": [
            {
                "id": "d04-1-q1",
                "promptUz": "1. Konseptual: Nima uchun `StandardScaler` yoki `SimpleImputer` ni `train_test_split` dan OLDIN butun datasetga qo'llash mumkin emas?",
                "options": [
                    "Kod sekin ishlab qoladi",
                    "Test to'plamining statistikasi (mean, std, median) Train to'plamiga sizib o'tadi va Data Leakage yuzaga keladi",
                    "Python xotirasi to'lib qoladi",
                    "Ustun nomlari o'zgarib ketadi"
                ],
                "correctIndex": 1,
                "explanationUz": "Test to'plami kelajakdagi ko'rilmagan ma'lumotni ifodalaydi; uning statistikasi o'qitish jarayoniga aslo qatnashmasligi shart."
            },
            {
                "id": "d04-1-q2",
                "promptUz": "2. Kod Tahlili: Tibbiy datasetda 500 ta bemorning har biridan 10 tadan rentgen tasviri bor (jami 5000 qator). Yangi bemorlarda model qanday ishlashini halol tekshirish uchun qaysi CV ishlatiladi?",
                "options": [
                    "Oddiy random KFold",
                    "GroupKFold(groups=patient_id), shunda bitta bemorning rasmlari ham train, ham testga bo'linib ketmaydi",
                    "LeaveOneOut",
                    "Train va Testni birlashtirish"
                ],
                "correctIndex": 1,
                "explanationUz": "Oddiy KFold bitta bemorning 8 ta rasmini train'ga, 2 tasini testga qo'yadi va model kasallikni emas, bemorni tanib qoladi (`Group Leakage`)."
            },
            {
                "id": "d04-1-q3",
                "promptUz": "3. Production Debugging: `OneHotEncoder()` production'da train vaqtida uchramagan yangi shahar nomi kelganda `ValueError: Found unknown categories` xatosi bilan yiqildi. Qaysi parametr buni hal qiladi?",
                "options": [
                    "`OneHotEncoder(handle_unknown='ignore')`",
                    "`OneHotEncoder(drop='first')`",
                    "`StandardScaler()`",
                    "`max_iter=1000`"
                ],
                "correctIndex": 0,
                "explanationUz": "`handle_unknown='ignore'` noma'lum kategoriyani xatosiz barcha nollar (`[0, 0, ...]`) vektoriga o'tkazadi."
            }
        ]
    },
    "D04.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Tree Models — Bagging (Random Forest) vs Boosting (LightGBM/XGBoost)",
                "explanationUz": "Jadvalli (Tabular) ma'lumotlarda daraxt ansambllari yetakchilik qiladi: 1) **Random Forest (Bagging)** — yuzlab chuqur daraxtlarni bootstrap tanlanmalarda bir-biridan MUSTAQIL va PARALLEL o'qitib, ularning o'rtachasini oladi; bu **Variance** (overfitting) ni kamaytiradi. 2) **Gradient Boosting (LightGBM / XGBoost / CatBoost)** — sayoz daraxtlarni KETMA-KET o'qitadi; har bir yangi daraxt oldingi daraxtlarning xatosini (qoldiq / pseudo-residuals gradientini) tuzatishga o'qiydi; bu **Bias** ni kamaytiradi.",
                "codeExample": "comparison = [\n    ('Random Forest (Bagging)',  'Parallel & Mustaqil', 'Chuqur daraxtlar', 'Variance (Overfitting) ni kamaytiradi'),\n    ('Gradient Boosting (GBDT)', 'Ketma-ket (Sequential)', 'Sayoz daraxtlar (depth 3-8)', 'Bias (Xato) ni kamaytiradi'),\n]\nfor name, mode, trees, goal in comparison:\n    print(f'{name:25} | {mode:22} | {trees:27} | {goal}')",
                "outputOrNoteUz": "Natija: Intervyuda 'Random Forest vs Gradient Boosting farqi nima?' deb so'ralganda aynan shu 3 ta nuqta (Parallel vs Ketma-ket, Chuqur vs Sayoz, Variance vs Bias) aytiladi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Nomutanosib Ma'lumotlar (Imbalanced Data) va Accuracy Tuzog'i",
                "explanationUz": "Agar 95% mijoz qolsa (`0`) va faqat 5% mijoz ketsa (`1` - Churn), barcha mijozlarga ko'r-ko'rona `'Ketmaydi (0)'` deb javob beruvchi tupoy model **95% Accuracy** oladi, ammo bitta ham ketuvchi mijozni topa olmaydi (`Recall = 0%`)! Shu sababli nomutanosib klasslarda `Accuracy` va hatto ba'zan `ROC-AUC` (katta `TN` tufayli optimist bo'ladi) o'rniga **Precision, Recall, F1-Score va PR-AUC (Precision-Recall AUC)** ishlatiladi.",
                "codeExample": "def compute_metrics(tp: int, fp: int, fn: int, tn: int) -> dict:\n    acc = (tp + tn) / (tp + fp + fn + tn)\n    prec = tp / max(tp + fp, 1)\n    rec = tp / max(tp + fn, 1)\n    f1 = (2 * prec * rec) / max(prec + rec, 1e-9)\n    return {'Accuracy': round(acc, 4), 'Precision': round(prec, 4), 'Recall': round(rec, 4), 'F1': round(f1, 4)}\n\nprint('Doim 0 deydigan model:', compute_metrics(tp=0, fp=0, fn=50, tn=950))\nprint('Foydali Churn modeli: ', compute_metrics(tp=40, fp=20, fn=10, tn=930))",
                "outputOrNoteUz": "Natija: Doim `0` deydigan model `Accuracy=0.95`, ammo `F1=0.0` oldi! Foydali model esa `Recall=0.80` (ketuvchilarning 80% ini tutdi) va `F1=0.7273` ko'rsatdi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Qaror Chegarasini (Decision Threshold) Biznes Xarajatiga Moslash",
                "explanationUz": "Standart `.predict()` har doim `threshold = 0.50` ishlatadi. Ammo biznesda **False Negative** (ketib qoladigan VIP mijozni yo'qotish = `-1,000,000 so'm`) bilan **False Positive** (ketmaydigan mijozga bekorga SMS chegirma yuborish = `-50,000 so'm`) narxi bir xil emas! `.predict_proba()` dan chiqqan ehtimollik ustida `threshold` ni `0.05` dan `0.95` gacha surib, F1 yoki Biznes Foydani maksimallashtiruvchi optimal chegara (masalan `0.28`) topiladi.",
                "codeExample": "import numpy as np\n\ny_true = np.array([1, 1, 1, 1, 0, 0, 0, 0, 0, 0])\ny_prob = np.array([0.82, 0.65, 0.38, 0.31, 0.42, 0.25, 0.18, 0.12, 0.08, 0.04])\n\nfor th in [0.50, 0.30]:\n    preds = (y_prob >= th).astype(int)\n    tp = int(np.sum((preds == 1) & (y_true == 1)))\n    fp = int(np.sum((preds == 1) & (y_true == 0)))\n    fn = int(np.sum((preds == 0) & (y_true == 1)))\n    rec = tp / (tp + fn)\n    prec = tp / max(tp + fp, 1)\n    # Biznes foyda: har bir tutilgan churn +500$, har bir SMS -50$\n    profit = tp * 500 - (tp + fp) * 50\n    print(f'Threshold={th:.2f} -> Recall={rec:.0%}, Precision={prec:.0%}, Sof Foyda=${profit}')",
                "outputOrNoteUz": "Natija: `Threshold=0.50` da Recall atigi 50% va foyda `$900` edi; `Threshold=0.30` ga tushirganda Recall 100% ga chiqdi va sof biznes foyda `$1750` ga yetdi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: F-Beta Score ($F_\\beta$) — Qachon Recall, Qachon Precision Muhim?",
                "scenarioUz": "Saraton tashxisi yoki Churn'da Recall muhimroq ($F_2$ score), YouTube bolalar filtri yoki avtokredit tasdiqlashda esa Precision muhimroq ($F_{0.5}$ score).",
                "howToUseUz": "Kodni ishga tushiring va $\\beta$ parametrining ta'sirini ko'ring.",
                "code": "def f_beta_score(precision: float, recall: float, beta: float) -> float:\n    b2 = beta ** 2\n    return ((1 + b2) * precision * recall) / (b2 * precision + recall + 1e-9)\n\n# Model A: Yuqori Precision (0.90), past Recall (0.50)\n# Model B: O'rta Precision (0.60), yuqori Recall (0.90)\nfor name, p, r in [('Model A (Ehtiyotkor)', 0.90, 0.50), ('Model B (Sezgir)', 0.60, 0.90)]:\n    print(f'{name:20} | F1={f_beta_score(p,r,1.0):.3f} | F2 (Recall 2x)={f_beta_score(p,r,2.0):.3f} | F0.5 (Prec 2x)={f_beta_score(p,r,0.5):.3f}')",
                "expectedOutput": "Model A (Ehtiyotkor) | F1=0.643 | F2 (Recall 2x)=0.549 | F0.5 (Prec 2x)=0.776\nModel B (Sezgir)     | F1=0.720 | F2 (Recall 2x)=0.818 | F0.5 (Prec 2x)=0.643",
                "breakdownUz": "Biznes maqsadiga qarab $F_2$ (Recall ustuvor) yoki $F_{0.5}$ (Precision ustuvor) tanlanadi."
            },
            {
                "titleUz": "2-misol: Baseline DummyClassifier Bilan Solishtirish",
                "scenarioUz": "Murakkab LightGBM model qurishdan oldin eng sodda baseline (masalan, 1 ta qoida yoki LogisticRegression) natijasini o'lchash.",
                "howToUseUz": "Oddiy qoidaga asoslangan baseline va ML model farqini hisoblang.",
                "code": "customers = [\n    {'days_inactive': 45, 'complaints': 3, 'churn': 1},\n    {'days_inactive': 5,  'complaints': 0, 'churn': 0},\n    {'days_inactive': 18, 'complaints': 2, 'churn': 1},\n    {'days_inactive': 35, 'complaints': 0, 'churn': 0},\n]\n# Baseline heuristic: days_inactive > 30\nrule_correct = sum(1 for c in customers if (1 if c['days_inactive'] > 30 else 0) == c['churn'])\n# Multi-feature linear score: 0.04 * days + 0.35 * complaints >= 1.0\nml_correct = sum(1 for c in customers if (1 if (0.04*c['days_inactive'] + 0.35*c['complaints']) >= 1.0 else 0) == c['churn'])\nprint(f'1-qoidali Baseline aniqligi: {rule_correct}/{len(customers)} ({rule_correct/len(customers):.0%})')\nprint(f'Ko\\'p omilli Model aniqligi:  {ml_correct}/{len(customers)} ({ml_correct/len(customers):.0%})')",
                "expectedOutput": "1-qoidali Baseline aniqligi: 2/4 (50%)\nKo'p omilli Model aniqligi:  4/4 (100%)",
                "breakdownUz": "Har qanday ML loyihada murakkab model oddiy evristik baseline'dan qanchalik (+% lift) ustun ekanligi ko'rsatilishi shart."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Precision, Recall & PR-AUC",
                "category": "Classic ML",
                "definitionUz": "Precision $= \\frac{TP}{TP+FP}$ (musbat bashoratlarning necha foizi to'g'ri); Recall $= \\frac{TP}{TP+FN}$ (haqiqiy musbatlarning necha foizi topildi); PR-AUC — barcha thresholdlar bo'yicha Precision-Recall egri chizig'i ostidagi yuza.",
                "analogyOrExampleUz": "Baliq ovlash to'ri: Precision — to'rga tushgan narsalarning necha foizi axlat emas, haqiqiy baliq; Recall — ko'ldagi jami baliqlarning necha foizini tuta oldik.",
                "connectedTo": [
                    {
                        "targetTerm": "RAG Retrieval Precision@k & Recall@k",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "10-haftada RAG qidiruv sifatini baholashda ham aynan shu Precision va Recall metrikalari Top-K hujjatlar uchun qo'llaniladi."
                    }
                ]
            },
            {
                "term": "Bagging vs Gradient Boosting",
                "category": "Classic ML",
                "definitionUz": "Bagging (Random Forest) — mustaqil daraxtlarni parallel o'qitib variance'ni pasaytirish; Boosting (XGBoost/LightGBM) — oldingi model xato gradientiga ketma-ket daraxt o'qitib bias'ni pasaytirish.",
                "analogyOrExampleUz": "Bagging — 100 ta mustaqil ekspertdan alohida fikr so'rab ovozga qo'yish; Boosting — 1-ekspert yozgan qoralamani 2-ekspert tahrirlashi, 3-ekspert esa qolgan xatolarni tuzatishi.",
                "connectedTo": [
                    {
                        "targetTerm": "Gradient Descent in Function Space",
                        "targetLessonId": "D03.2",
                        "relationshipUz": "Gradient Boosting aslida parametrlar fazosida emas, balki funksiyalar (daraxtlar) fazosida bajariladigan Gradient Descent hisoblanadi!"
                    }
                ]
            },
            {
                "term": "Decision Threshold Tuning",
                "category": "Classic ML",
                "definitionUz": "Modelning `.predict_proba()` ehtimolligini `0` yoki `1` klassga ajratuvchi kesish nuqtasini (`0.5` o'rniga biznes matritsasi bo'yicha optimal $t^*$) tanlash.",
                "analogyOrExampleUz": "Metall detektor sezgirligini sozlash: aeroportda bitta ham qurol o'tmasligi uchun past threshold (yuqori Recall), oddiy savdo markazida esa odamlarni bezovta qilmaslik uchun yuqori threshold (yuqori Precision).",
                "connectedTo": [
                    {
                        "targetTerm": "Churn API Risk Levels",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "Portfolio-1 FastAPI servisida optimal threshold JSON javob ichida `is_churn` va `risk_tier` (`LOW`, `MEDIUM`, `HIGH`) ni belgilaydi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d04-2-int-1",
                "level": "Junior",
                "questionUz": "Nima uchun Random Forest yoki XGBoost modellariga `StandardScaler` (feature scaling) qo'llash shart emas, ammo Logistic Regression va KNN uchun shart?",
                "interviewerIntentUz": "Daraxt algoritmlarining bo'linish (split) mexanizmini tushunishini sinash.",
                "strongAnswerUz": "Daraxtga asoslangan modellar (Decision Tree, Random Forest, XGBoost, LightGBM) ustun qiymatlarining absolyut masofasiga emas, balki tartibiga (monoton bo'linish slaydiga, masalan `age > 30`) qaraydi. Ustunni 1000 ga ko'paytirsangiz ham split nuqtasi `age > 30000` bo'lib, daraxt tuzilmasi va Gini/Entropy axborot yutug'i 100% o'zgarmas qoladi. Logistic Regression (gradient va L1/L2 jarima masshtabga bog'liq) hamda KNN/SVM/K-Means (Evklid masofasiga asoslangan) modellarida esa katta sonli ustun kichik ustunni bosib ketmasligi uchun scaling shart.",
                "redFlagUz": "'Barcha ML modellarga StandardScaler qo'llash majburiy' deyish.",
                "followUpQuestionUz": "Savol: Chiziqli bog'liqlikni (`y = 3x`) ekstrappolyatsiya qilishda (train'da `x = 1..10`, testda `x = 50`) Random Forest yaxshi ishlaydimi? Javob: Yo'q! Daraxt modellari train diapazonidan tashqariga ekstrappolyatsiya qila olmaydi (oxirgi bargdagi konstantani qaytaradi), chiziqli regressiya esa to'g'ri davom ettiradi."
            },
            {
                "id": "d04-2-int-2",
                "level": "Middle",
                "questionUz": "1% ijobiy klassga ega kuchli nomutanosib (Imbalanced) datasetda nega `ROC-AUC = 0.92` bo'lsa ham model production'da yaroqsiz bo'lib chiqishi mumkin?",
                "interviewerIntentUz": "ROC-AUC va PR-AUC o'rtasidagi matematik farqni (`False Positive Rate` maxraji) bilishini tekshirish.",
                "strongAnswerUz": "ROC egri chizig'ining X o'qi — bu $FPR = \\frac{FP}{FP + TN}$. Kuchli nomutanosib datada salbiy klass ($TN$, masalan 99,000 ta toza tranzaksiya) juda ulkan bo'ladi. Agar model 1,000 ta haqiqiy frauddan 800 tasini tutsa (`TP=800`), ammo 5,000 ta toza tranzaksiyani xato bloklasa (`FP=5000`), $FPR = 5000 / 99000 \\approx 0.05$ (juda kichik!) bo'lib, **ROC-AUC = 0.92+** ko'rinaveradi. Ammo **Precision** $= 800 / (800 + 5000) = 13.8\\%$ bo'lib, har 7 ta bloklangan mijozdan 6 tasi begunoh bo'lib chiqadi! **PR-AUC** esa $TN$ ni formulaga aralashtirmaydi va bunday muammoni darhol fosh qiladi.",
                "redFlagUz": "'ROC-AUC har doim eng yaxshi metrika, 0.92 bo'lsa model ideal' deyish.",
                "followUpQuestionUz": "Savol: Random (tasodifiy) klassifikator uchun ROC-AUC har doim `0.50` ga teng. PR-AUC ning baseline (tasodifiy) qiymati nimaga teng? Javob: Ijobiy klassning datasetdagi ulushiga ($P / (P + N)$) teng! Masalan, 1% fraud bo'lsa, random model uchun PR-AUC baseline $= 0.01$ bo'ladi."
            },
            {
                "id": "d04-2-int-3",
                "level": "Senior / Production",
                "questionUz": "Gradient Boosting (LightGBM/XGBoost) modelida Overfitting bo'layotganini ko'rdingiz (`Train PR-AUC = 0.98`, `Val PR-AUC = 0.71`). Qaysi giperparametrlarni qanday yo'nalishda o'zgartirasiz?",
                "interviewerIntentUz": "GBDT arxitekturasi va regularizatsiya richaglarini amalda boshqara olishini sinash.",
                "strongAnswerUz": "1) **Daraxt murakkabligini cheklash**: `max_depth` (masalan 8 dan 4-5 ga) va LightGBM'da eng muhimi `num_leaves` ($2^{\\text{max\\_depth}}$ dan kichikroq, masalan 31 dan 15 ga) ni kamaytirish hamda `min_child_samples` (`min_data_in_leaf`) ni oshirish; 2) **Stoxastiklik (Randomness) qo'shish**: har bir daraxt uchun ustunlar va qatorlarning bir qismini olish (`colsample_bytree` / `feature_fraction = 0.7`, `subsample` / `bagging_fraction = 0.8`); 3) **Shrinkage & Early Stopping**: `learning_rate` ni pasaytirib (`0.03`), `early_stopping_rounds=50` bilan validatsiya loss yomonlashishi bilanoq to'xtatish; 4) `reg_alpha` (L1) va `reg_lambda` (L2) hamda `min_split_gain` ni oshirish.",
                "redFlagUz": "'`learning_rate` va `max_depth` ni oshiraman' deyish (bu overfittingni yanada kuchaytiradi!).",
                "followUpQuestionUz": "Savol: LightGBM nega XGBoost'ning klassik level-wise daraxtidan tezroq ishlaydi va nima uchun kichik datada ehtiyot bo'lish kerak? Javob: LightGBM **Leaf-wise** (eng ko'p loss kamaytiradigan bargni chuqurlashtirish) usulida o'sadi va GOSS + EFB histogrammalaridan foydalanadi; ammo kichik datada (<10,000 qator) `num_leaves` cheklanmasa tez overfit qiladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d04-2-en",
                "title": "Random Forest vs Decision Trees | Key Differences Explained Simply",
                "channel": "PM Expert",
                "language": "en",
                "youtubeId": "qwXAXFSxyGo",
                "youtubeUrl": "https://www.youtube.com/watch?v=qwXAXFSxyGo",
                "durationOrTimestamp": "To'liq vizual taqqoslov",
                "whatItExplainsUz": "Bitta qaror daraxti qanday qilib ma'lumotni yodlab olishi (overfitting) va Random Forest ansambli bu muammoni qanday hal qilishi ko'rsatilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, Bagging va Boosting o'rtasidagi farq jadvalini daftar yoki konspektingizga yozib oling."
            },
            {
                "id": "vid-d04-2-en-2",
                "title": "Confusion Matrix, Precision, Recall & F1 — Explained Together!",
                "channel": "Benjy Bodner",
                "language": "en",
                "youtubeId": "RQiNbojL07Y",
                "youtubeUrl": "https://www.youtube.com/watch?v=RQiNbojL07Y",
                "durationOrTimestamp": "To'liq metrikalar tahlili",
                "whatItExplainsUz": "Klassifikatsiya metrikalari va threshold o'zgarishining Precision-Recall balansiga ta'siri tushuntirilgan.",
                "howToUseVideoUz": "Yuqoridagi 3-bosqich kodida `th` (threshold) qiymatini o'zgartirib, biznes foyda qaysi nuqtada maksimal bo'lishini toping."
            }
        ],
        "quiz": [
            {
                "id": "d04-2-q1",
                "promptUz": "1. Konseptual: Mijozlarning atigi 3% qismi ketadigan (Churn) datasetda modelni baholash uchun ENG ALDAMCHI (yaroqsiz) metrika qaysi?",
                "options": [
                    "PR-AUC (Precision-Recall AUC)",
                    "Oddiy Accuracy (chunki hamma mijozga 0 deydigan model ham 97% Accuracy oladi)",
                    "F1-Score",
                    "Recall"
                ],
                "correctIndex": 1,
                "explanationUz": "Nomutanosib klasslarda Accuracy ko'pchilik klass (`TN`) hisobiga sun'iy yuqori chiqadi va ozchilik klassdagi to'liq muvaffaqiyatsizlikni yashiradi."
            },
            {
                "id": "d04-2-q2",
                "promptUz": "2. Kod Tahlili: Modelning qaror chegarasi (threshold) `0.50` dan `0.25` ga tushirilsa, odatda `Recall` va `Precision` qanday o'zgaradi?",
                "options": [
                    "Ikkalasi ham nolga tushadi",
                    "Recall oshadi (ko'proq haqiqiy musbatlar tutiladi), ammo False Positive ko'paygani hisobiga Precision pasayadi",
                    "Recall pasayadi, Precision oshadi",
                    "Hech narsa o'zgarmaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "Chegarani pasaytirish modelni sezgirroq qiladi (ko'proq `1` qo'yadi): natijada `TP` va `Recall` oshadi, lekin `FP` ham ortib `Precision` kamayadi."
            },
            {
                "id": "d04-2-q3",
                "promptUz": "3. Production Debugging: Random Forest va Gradient Boosting (XGBoost/LightGBM) o'rtasidagi eng asosiy arxitektura farqi nima?",
                "options": [
                    "Random Forest daraxtlarni parallel va mustaqil o'qitadi (Bagging), Gradient Boosting esa har bir daraxtni oldingi xatolar gradienti ustida ketma-ket o'qitadi",
                    "Random Forest faqat matnlar bilan ishlaydi",
                    "Gradient Boosting faqat bitta daraxt quradi",
                    "Ikkalasi aynan bir xil algoritm"
                ],
                "correctIndex": 0,
                "explanationUz": "Bagging parallel ravishda variance'ni kamaytirsa, Boosting ketma-ket xatolarni tuzatib bias'ni kamaytiradi."
            }
        ]
    },
    "D04.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Nima Uchun MLflow Tracking Kerak? (`model_final_v3_new.pkl` Muammosi)",
                "explanationUz": "Tadqiqot davomida muhandis 50 xil feature to'plami va giperparametrlarni sinab ko'radi. Agar natijalar daftar yoki Excel'ga yozilsa, 2 haftadan keyin `best_model_v4.joblib` fayli qaysi datasetda, qanday `learning_rate` va qaysi Git commitda olinganini hech kim eslay olmaydi. **MLflow Tracking** har bir `with mlflow.start_run():` ichida 4 ta narsani avtomatik bazaga muhrlaydi: 1) **Parameters** (`max_depth`, `lr`); 2) **Metrics** (`cv_pr_auc`, `f1_score`); 3) **Tags** (`git_commit`, `dataset_hash`); 4) **Artifacts** (`pipeline.joblib`, `pr_curve.png`).",
                "codeExample": "import hashlib\nimport json\n\n# MLflow Run metama'lumotlarini shakllantirish namunasi:\nrun_record = {\n    'run_id': hashlib.sha1(b'churn_exp_04').hexdigest()[:12],\n    'params': {'model': 'LightGBM', 'num_leaves': 15, 'learning_rate': 0.03, 'threshold': 0.32},\n    'metrics': {'cv_pr_auc_mean': 0.814, 'cv_pr_auc_std': 0.012, 'test_f1': 0.785},\n    'tags': {'git_sha': 'c3717a3', 'data_version': 'churn_v2.parquet'},\n}\nprint(json.dumps(run_record, indent=2))",
                "outputOrNoteUz": "Natija: Har bir eksperiment o'zining `run_id`, giperparametrlari, metrikalari va Git commit xeshi bilan qayta tiklanadigan (reproducible) tarzda saqlanadi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Model Signature (Kirish/Chiqish Sxemasi) va Artefaktlar",
                "explanationUz": "Production'da eng ko'p uchraydigan xato — model o'qitilganda 12 ta ustun kutgan bo'lsa, backend dasturchi API orqali 11 ta ustun yoki boshqa tartibdagi ustun yuborishidir. MLflow **Model Signature** (`infer_signature(X_train, y_pred)`) model artefakti ichiga kiruvchi ustunlarning aniq nomi va turlarini (`double`, `long`, `string`) yozib qo'yadi va xato so'rov kelsa aniq xabar beradi.",
                "codeExample": "model_signature = {\n    'inputs': [\n        {'name': 'tenure_months', 'type': 'long', 'required': True},\n        {'name': 'monthly_charges', 'type': 'double', 'required': True},\n        {'name': 'contract_type', 'type': 'string', 'required': True},\n    ],\n    'outputs': [{'name': 'churn_probability', 'type': 'double'}],\n}\n\ndef validate_against_signature(payload: dict, sig: dict) -> list[str]:\n    errors = []\n    for col in sig['inputs']:\n        if col['name'] not in payload:\n            errors.append(f\"Yetishmayotgan ustun: {col['name']}\")\n    return errors\n\nprint('Tekshiruv natijasi:', validate_against_signature({'tenure_months': 12}, model_signature))",
                "outputOrNoteUz": "Natija: `['Yetishmayotgan ustun: monthly_charges', 'Yetishmayotgan ustun: contract_type']` — production xatosi modelga yetmasidan tutildi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: MLflow Model Registry va `@champion` vs `@challenger` Aliaslari",
                "explanationUz": "Model Registry markaziy omborida modellar versiyalanadi (`v1`, `v2`, `v3`). Zamonaviy MLflow'da eski `Staging/Production` bosqichlari o'rniga **Model Aliases** ishlatiladi: hozir production'da ishlayotgan ishonchli modelga `@champion` yorlig'i, yangi sinovdan o'tayotgan nomzod modelga esa `@challenger` yorlig'i beriladi. FastAPI servisi kodni o'zgartirmasdan `models:/churn-classifier@champion` manzilidan modelni yuklab oladi!",
                "codeExample": "registry = {\n    'churn-classifier:v1': {'pr_auc': 0.74, 'alias': 'archived'},\n    'churn-classifier:v2': {'pr_auc': 0.81, 'alias': '@champion'},\n    'churn-classifier:v3': {'pr_auc': 0.84, 'alias': '@challenger'},\n}\n\ndef promote_challenger_to_champion(reg: dict):\n    if reg['churn-classifier:v3']['pr_auc'] > reg['churn-classifier:v2']['pr_auc']:\n        reg['churn-classifier:v2']['alias'] = 'previous_champion'\n        reg['churn-classifier:v3']['alias'] = '@champion'\n\npromote_challenger_to_champion(registry)\nfor ver, info in registry.items():\n    print(f'{ver:20} -> PR-AUC={info[\"pr_auc\"]} | Status: {info[\"alias\"]}')",
                "outputOrNoteUz": "Natija: Yangi `v3` modeli metrikada yutgani uchun avtomatik `@champion` maqomiga ko'tarildi va rollback uchun `v2` saqlab qolindi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Eksperimentlarni Tartiblash va Eng Yaxshi Run'ni Avtomatik Tanlash",
                "scenarioUz": "O'tkazilgan 10 ta eksperiment ichidan nafaqat `mean_pr_auc` yuqori, balki `inference_ms < 25` bo'lgan eng optimal modelni dasturiy topish.",
                "howToUseUz": "Kodni ishga tushirib multi-objective model tanlashni ko'ring.",
                "code": "runs = [\n    {'run_id': 'run_01', 'model': 'LogReg',   'pr_auc': 0.72, 'latency_ms': 2.1},\n    {'run_id': 'run_02', 'model': 'RF_200',   'pr_auc': 0.80, 'latency_ms': 18.5},\n    {'run_id': 'run_03', 'model': 'LGBM_opt', 'pr_auc': 0.83, 'latency_ms': 6.4},\n    {'run_id': 'run_04', 'model': 'Stacking', 'pr_auc': 0.835,'latency_ms': 95.0}, # Latency SLA (>25ms) dan oshgan!\n]\n\neligible = [r for r in runs if r['latency_ms'] <= 25.0]\nbest_run = max(eligible, key=lambda r: r['pr_auc'])\nprint('SLA (<25ms) ga mos eng yaxshi model:', best_run)",
                "expectedOutput": "SLA (<25ms) ga mos eng yaxshi model: {'run_id': 'run_03', 'model': 'LGBM_opt', 'pr_auc': 0.83, 'latency_ms': 6.4}",
                "breakdownUz": "Production'da `0.005` AUC yutish uchun latency'ni 15 barobar sekinlashtiruvchi (`95ms`) Stacking model emas, balki SLA ichidagi `LGBM_opt` (`6.4ms`) tanlanadi!"
            },
            {
                "titleUz": "2-misol: Reproducibility Uchun Konfiguratsiya va Seed Xeshini Yaratish",
                "scenarioUz": "Eksperiment to'liq qayta tiklanishi uchun barcha giperparametrlar va `random_seed` dan yagona fingerprint olish.",
                "howToUseUz": "Fingerprint funksiyasini sinang.",
                "code": "import hashlib\nimport json\n\ndef experiment_fingerprint(config: dict) -> str:\n    canonical = json.dumps(config, sort_keys=True)\n    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()[:16]\n\ncfg = {'seed': 42, 'n_estimators': 300, 'lr': 0.05, 'features': ['f1', 'f2', 'f3']}\nprint('Eksperiment SHA-256 fingerprint:', experiment_fingerprint(cfg))",
                "expectedOutput": "Eksperiment SHA-256 fingerprint: ...",
                "breakdownUz": "`sort_keys=True` lug'at kalitlari tartibi o'zgarsa ham bir xil konfiguratsiya uchun doim bir xil xesh chiqishini ta'minlaydi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "MLflow Tracking (Params, Metrics, Artifacts)",
                "category": "MLOps & Eval",
                "definitionUz": "ML o'qitish seanslarining kiruvchi giperparametrlari, chiqish metrikalari, grafik va model fayllarini markazlashgan holda qayd etish tizimi.",
                "analogyOrExampleUz": "Samolyotning 'qora qutisi' (flight recorder): parvoz vaqtidagi barcha sozlamalar va ko'rsatkichlarni sonorama-soniya yozib boradi.",
                "connectedTo": [
                    {
                        "targetTerm": "DVC & Data Versioning",
                        "targetLessonId": "D11.1",
                        "relationshipUz": "11-haftada DVC datasetning `.dvc` MD5 xeshini versiyalaydi, MLflow esa o'sha xeshni tag sifatida model run'iga bog'laydi."
                    }
                ]
            },
            {
                "term": "Model Registry & Champion/Challenger",
                "category": "MLOps & Eval",
                "definitionUz": "Tayyor modellarni versiyalash, hayotiy siklini (`@champion` — joriy prod, `@challenger` — yangi nomzod) boshqarish va audit qilish markazi.",
                "analogyOrExampleUz": "Boks chempionati: amaldagi chempion (`@champion`) kamarini faqat rasmiy jangda (validatsiya va Canary testda) yutib chiqqan da'vogargagina (`@challenger`) topshiradi.",
                "connectedTo": [
                    {
                        "targetTerm": "Canary & Shadow Deployment",
                        "targetLessonId": "D11.3",
                        "relationshipUz": "11-haftada `@challenger` modelga real trafikning 5-10% qismi yo'naltirilib, `@champion` bilan jonli solishtiriladi."
                    }
                ]
            },
            {
                "term": "Model Signature & Input Example",
                "category": "MLOps & Eval",
                "definitionUz": "Model artefakti bilan birga saqlanadigan kirish va chiqish ustunlarining qat'iy tip sxemasi hamda namunaviy payload.",
                "analogyOrExampleUz": "Elektr rozetkasi standarti: vilkaning tishlari soni va kuchlanishi mos kelmasa ulanishga ruxsat bermaydi.",
                "connectedTo": [
                    {
                        "targetTerm": "FastAPI Pydantic Request Schema",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "Keyingi darsda FastAPI `/predict` endpointining Pydantic sxemasi aynan Model Signature bilan 1-ga-1 mos bo'ladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d04-3-int-1",
                "level": "Junior",
                "questionUz": "MLflow'da `log_param`, `log_metric` va `log_artifact` o'rtasida qanday farq bor?",
                "interviewerIntentUz": "Eksperiment kuzatishning bazaviy tushunchalarini bilishini tekshirish.",
                "strongAnswerUz": "`log_param` — o'qitish boshlanishidan oldin beriladigan o'zgarmas kiruvchi sozlamalar (`learning_rate=0.03`, `max_depth=5`); `log_metric` — o'qitish davomida yoki yakunida hisoblanadigan sonli sifat ko'rsatkichlari (`val_pr_auc=0.82`, `loss=0.19`, ularni epoxa bo'yicha grafik qilish mumkin); `log_artifact` — hosil bo'lgan har qanday fayl (`model.joblib`, `confusion_matrix.png`, `feature_importance.json`).",
                "redFlagUz": "'Uchalasi ham fayl saqlash uchun ishlatiladi' deyish.",
                "followUpQuestionUz": "Savol: Modelni saqlashda faqat estimatorning o'zini saqlaysizmi yoki butun Scikit-Learn `Pipeline` nimi? Javob: Albatta butun `Pipeline` (Imputer + Scaler + Encoder + Classifier + Threshold metadata) ni, aks holda production'da xom ma'lumotni modelga uzatib bo'lmaydi."
            },
            {
                "id": "d04-3-int-2",
                "level": "Middle",
                "questionUz": "6 oy oldin o'qitilgan modelning natijasini bugun 100% bir xil qayta tiklash (Reproducibility) uchun MLflow'da nimalarni saqlagan bo'lishingiz shart?",
                "interviewerIntentUz": "To'liq ML reproducibility zanjirini tushunishini sinash.",
                "strongAnswerUz": "Faqat model kodi yetarli emas, 5 ta element qulflangan bo'lishi shart: 1) **Kod versiyasi**: aniq Git commit SHA xeshi; 2) **Ma'lumot versiyasi**: DVC data hash yoki Parquet snapshot ID hamda train/test split indekslari; 3) **Muhit**: `uv.lock` yoki Docker image digest hamda `conda.yaml`/`requirements.txt`; 4) **Barcha Giperparametrlar**; 5) **Random Seeds**: `PYTHONHASHSEED`, `np.random.seed`, `random_state` va GPU deterministik bayroqlari.",
                "redFlagUz": "'Faqat `random_state=42` bersam har doim bir xil chiqadi' deyish (kutubxona versiyasi yoki data o'zgarsa `random_state=42` yordam bermaydi!).",
                "followUpQuestionUz": "Savol: Nima uchun Python'ning standart `pickle` formatida saqlangan modelni noma'lum tashqi manbadan yuklash (`pickle.load`) xavfli? Javob: `pickle.load` deserializatsiya vaqtida ixtiyoriy zararli Python kodini (`__reduce__` orqali RCE — Remote Code Execution) ishga tushirib yuborishi mumkin; xavfsizlik uchun `skops`, `safetensors` yoki `ONNX` tavsiya etiladi."
            },
            {
                "id": "d04-3-int-3",
                "level": "Senior / Production",
                "questionUz": "Jamoaviy production muhitida MLflow arxitekturasini qanday joylashtirasiz (Backend Store vs Artifact Store)?",
                "interviewerIntentUz": "MLflow infratuzilmasini lokal SQLite'dan korporativ darajaga ko'tara olishini tekshirish.",
                "strongAnswerUz": "Lokal `mlruns/` papkasi jamoada ishlamaydi. Production'da MLflow Tracking Server ikki qismga ajratiladi: 1) **Backend Store** (parametrlar, metrikalar, run metadata va Model Registry yozuvlari uchun) — **PostgreSQL** bazasi; 2) **Artifact Store** (og'ir model og'irliklari, rasmlar, Parquet namunalar uchun) — **S3 / MinIO / GCS** obyektlar ombori. Shu tariqa yengil SQL qidiruvlar PostgreSQL'da millisoniyada bajariladi, gigabaytlik model fayllari esa S3'da arzon va ishonchli saqlanadi.",
                "redFlagUz": "'Gigabaytlik model fayllarini PostgreSQL BLOB ustuniga yozaman' deyish.",
                "followUpQuestionUz": "Savol: Production'da yangi `@champion` model xato ishlay boshlasa, Rollback (orqaga qaytarish) qancha vaqt oladi? Javob: Model Registry'da `@champion` aliasini bir buyruq bilan oldingi barqaror `v2` versiyaga ko'chirish va servisda model reload webhook'ini chaqirish orqali soniyalar ichida (Docker image'ni qayta build qilmasdan) bajariladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d04-3-en",
                "title": "Local LLM & MLflow Tracing, Pydantic Structured Output Quickstart",
                "channel": "Venelin Valkov",
                "language": "en",
                "youtubeId": "jomsEY0r2Ng",
                "youtubeUrl": "https://www.youtube.com/watch?v=jomsEY0r2Ng",
                "durationOrTimestamp": "MLflow Tracing bo'limi",
                "whatItExplainsUz": "MLflow yordamida eksperimentlar va model chaqiruvlarini kuzatish (tracking & tracing) amalda ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi MLflow tracking yondashuvini 1-portfolio Churn loyihasida barcha giperparametr va PR-AUC metrikalarini saqlashda qo'llang."
            },
            {
                "id": "vid-d04-3-ru",
                "title": "Функционалы потерь и метрики моделей в продакшене",
                "channel": "Start Career in DS",
                "language": "ru",
                "youtubeId": "EyxcTnHl1wk",
                "youtubeUrl": "https://www.youtube.com/watch?v=EyxcTnHl1wk",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "O'qitishdagi Loss funksiyasi bilan biznes va validatsiya metrikalarini MLflow'da birga kuzatib borish sabablari tushuntirilgan.",
                "howToUseVideoUz": "MLflow'da ham `log_loss`, ham `pr_auc`, ham `optimal_threshold` ni birgalikda log qilishni odat qiling."
            }
        ],
        "quiz": [
            {
                "id": "d04-3-q1",
                "promptUz": "1. Konseptual: MLflow Model Registry'ning asosiy vazifasi nima?",
                "options": [
                    "Faqat CSV fayllarni tozalash",
                    "O'qitilgan modellarni versiyalash (v1, v2), ularning kelib chiqishini (lineage) saqlash va @champion / @challenger maqomlarini boshqarish",
                    "Python kodini C++ ga o'girish",
                    "Veb-sayt dizaynini chizish"
                ],
                "correctIndex": 1,
                "explanationUz": "Model Registry qaysi model versiyasi qachon, qaysi run'dan chiqqani va hozir qaysi biri production'da (`@champion`) ekanini boshqaradi."
            },
            {
                "id": "d04-3-q2",
                "promptUz": "2. Kod Tahlili: MLflow'da `mlflow.sklearn.log_model()` chaqirayotganda `signature=infer_signature(X_train, y_pred)` berish nimadan himoya qiladi?",
                "options": [
                    "Model fayli o'g'irlanishidan",
                    "Inferens (production) vaqtida ustun nomi, soni yoki ma'lumot turi mos kelmaydigan xato so'rovlar yuborilishidan",
                    "Internet uzilishidan",
                    "Disk to'lib qolishidan"
                ],
                "correctIndex": 1,
                "explanationUz": "Model Signature kirish va chiqish sxemasini model bilan birga muhrlaydi va noto'g'ri input kelsa darhol ogohlantiradi."
            },
            {
                "id": "d04-3-q3",
                "promptUz": "3. Production Debugging: Jamoaviy MLflow serverda og'ir model fayllarini (`model.pkl`, 500 MB) qayerda saqlash to'g'ri arxitektura hisoblanadi?",
                "options": [
                    "Git repozitoriysi ichida",
                    "Artifact Store sifatida S3 / MinIO obyektlar omborida (metama'lumotlar esa PostgreSQL Backend Store'da)",
                    "SQLite jadvalining matn ustunida",
                    "RAM ichida"
                ],
                "correctIndex": 1,
                "explanationUz": "Metama'lumotlar va metrikalar tez qidiruv uchun PostgreSQL'da, katta hajmli binar artefaktlar esa S3/MinIO'da saqlanadi."
            }
        ]
    },
    "D04.4": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: 1-Portfolio Arxitekturasi — Modelni FastAPI Servisiga Aylantirish",
                "explanationUz": "Notebook ichida qolgan model biznesga 0 so'm foyda keltiradi. 4-haftani yopuvchi **1-Portfolio Loyihasi**da biz Churn Prediction pipeline'ni FastAPI web-servisiga o'raymiz. Eng muhim arxitektura qoidasi: model fayli (`joblib.load('churn_pipeline.joblib')`) `/predict` funksiyasi ichida har bir so'rovda diskdan qayta yuklanmasligi shart! U ilova ko'tarilayotganda (`lifespan` / startup vaqtida) **FAQAT BIR MARTA** RAMga yuklanadi va minglab so'rovlarga 2-5 millisoniyada javob beradi.",
                "codeExample": "# FastAPI Lifespan va Pydantic kontrakt simulyatsiyasi:\nMODEL_STATE = {'pipeline': None, 'threshold': 0.32, 'version': '1.2.0'}\n\ndef on_startup():\n    # Diskdan faqat 1 marta yuklanadi:\n    MODEL_STATE['pipeline'] = lambda x: min(0.99, max(0.01, 0.01 * x['monthly_bill'] - 0.03 * x['tenure_months'] + 0.4))\n    print(f\"[STARTUP] Model v{MODEL_STATE['version']} xotiraga yuklandi!\")\n\ndef predict_endpoint(payload: dict) -> dict:\n    prob = round(MODEL_STATE['pipeline'](payload), 4)\n    is_churn = prob >= MODEL_STATE['threshold']\n    tier = 'HIGH' if prob >= 0.65 else ('MEDIUM' if is_churn else 'LOW')\n    return {'churn_prob': prob, 'is_churn': is_churn, 'risk_tier': tier, 'model_version': MODEL_STATE['version']}\n\non_startup()\nprint('API Javobi:', predict_endpoint({'tenure_months': 3, 'monthly_bill': 45.0}))",
                "outputOrNoteUz": "Natija: `/predict` faqat `0` yoki `1` emas, balki aniq ehtimollik (`churn_prob`), qaror (`is_churn`), xavf darajasi (`risk_tier: HIGH`) va `model_version` qaytaradi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: `/health` Endpointi va `pytest` TestClient",
                "explanationUz": "Docker va Kubernetes konteyner tirik ekanini va model xotiraga muvaffaqiyatli yuklanganini bilishi uchun `/health` endpointi bo'lishi shart. Agar model fayli buzilgan bo'lsa, `/health` HTTP `503 Service Unavailable` qaytaradi. Servisni tekshirish uchun esa serverni qo'lda ko'tarmasdan, `fastapi.testclient.TestClient` orqali `pytest` ichida 200 OK va 422 Validation Error holatlari avtomatik testlanadi.",
                "codeExample": "def health_check(state: dict) -> tuple[int, dict]:\n    if state.get('pipeline') is None:\n        return 503, {'status': 'unhealthy', 'reason': 'Model not loaded'}\n    return 200, {'status': 'ok', 'model_version': state['version']}\n\ncode, body = health_check(MODEL_STATE)\nassert code == 200 and body['status'] == 'ok'\nprint(f'Healthcheck test PASS: HTTP {code} -> {body}')",
                "outputOrNoteUz": "Natija: `HTTP 200 -> {'status': 'ok', 'model_version': '1.2.0'}`."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Production Dockerfile — Layer Caching va Non-Root Xavfsizlik",
                "explanationUz": "Dockerfile yozishda eng ko'p qilinadigan xato — `COPY . .` ni `uv sync` (yoki `pip install`) dan OLDIN yozishdir! Unda kodda bitta harf o'zgarsa ham Docker barcha kutubxonalarni qaytadan internetdan yuklaydi. To'g'ri tartib: avval faqat `pyproject.toml` va `uv.lock` nusxalanadi, paketlar o'rnatiladi (bu qatlam keshlanadi), va eng oxirida `COPY src/ ./src/` qilinadi. Shuningdek, konteyner `root` emas, cheklangan `appuser` foydalanuvchisi ostida ishlashi shart.",
                "codeExample": "dockerfile_best_practice = '''\nFROM python:3.12-slim\nWORKDIR /app\nCOPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/\n\n# 1. Avval faqat dependency fayllar (Docker Layer Caching uchun!):\nCOPY pyproject.toml uv.lock ./\nRUN uv sync --frozen --no-dev --no-install-project\n\n# 2. Keyin kod va model artefakti:\nCOPY src/ ./src/\nCOPY artifacts/churn_pipeline.joblib ./artifacts/\n\n# 3. Xavfsizlik uchun non-root user:\nRUN useradd -m appuser && chown -R appuser /app\nUSER appuser\nEXPOSE 8000\nCMD [\"uv\", \"run\", \"uvicorn\", \"src.api:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]\n'''\nprint(dockerfile_best_practice.strip())",
                "outputOrNoteUz": "Natija: Kod o'zgarganda Docker image 3 daqiqada emas, keshlangan layer hisobiga 2 soniyada yig'iladi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Batch Prediction vs Single Prediction Endpoint",
                "scenarioUz": "Bitta mijozni emas, bir vaqtda 100 ta mijoz ro'yxatini (`list[CustomerInput]`) vektorlashtirilgan holda tez baholash.",
                "howToUseUz": "Batch scoring mantiqini ishga tushiring.",
                "code": "batch_customers = [\n    {'customer_id': 'C-101', 'tenure': 2,  'bill': 85.0},\n    {'customer_id': 'C-102', 'tenure': 36, 'bill': 40.0},\n    {'customer_id': 'C-103', 'tenure': 1,  'bill': 95.0},\n]\n\nthreshold = 0.35\nresults = []\nfor c in batch_customers:\n    prob = round(min(0.99, max(0.01, 0.008 * c['bill'] - 0.015 * c['tenure'] + 0.1)), 3)\n    results.append({\n        'customer_id': c['customer_id'],\n        'probability': prob,\n        'action': 'SEND_RETENTION_OFFER' if prob >= threshold else 'NO_ACTION'\n    })\n\nfor r in results:\n    print(r)",
                "expectedOutput": "{'customer_id': 'C-101', 'probability': 0.75, 'action': 'SEND_RETENTION_OFFER'}\n{'customer_id': 'C-102', 'probability': 0.01, 'action': 'NO_ACTION'}...",
                "breakdownUz": "Production'da `pipe.predict_proba(df_batch)` 100 ta mijozni C/NumPy matritsasida bitta chaqiruvda hisoblaydi."
            },
            {
                "titleUz": "2-misol: FastAPI Endpoint Uchun Avtomatlashtirilgan Contract Testlar",
                "scenarioUz": "Portfolio-1 loyihasida `/predict` endpointini to'g'ri so'rov, chegaraviy qiymat va xato tip (422 Unprocessable Entity) bo'yicha tekshirish.",
                "howToUseUz": "Contract test simulyatsiyasini yurgizing.",
                "code": "def simulate_api_call(payload: dict) -> tuple[int, dict]:\n    required = {'tenure_months': int, 'monthly_charges': (int, float)}\n    for k, expected_type in required.items():\n        if k not in payload or not isinstance(payload[k], expected_type):\n            return 422, {'detail': f'Validation error on field: {k}'}\n        if payload[k] < 0:\n            return 422, {'detail': f'Field {k} must be >= 0'}\n    return 200, {'churn_probability': 0.72, 'is_churn': True}\n\nassert simulate_api_call({'tenure_months': 6, 'monthly_charges': 55.0})[0] == 200\nassert simulate_api_call({'tenure_months': -3, 'monthly_charges': 55.0})[0] == 422\nassert simulate_api_call({'tenure_months': 'olti'})[0] == 422\nprint('Barcha API Contract testlar (200 OK va 422 Validation Error) PASS!')",
                "expectedOutput": "Barcha API Contract testlar (200 OK va 422 Validation Error) PASS!",
                "breakdownUz": "API testlarida faqat `200 OK` emas, balki manfiy son yoki xato tip yuborilganda `422` qaytishi ham albatta tekshirilishi kerak."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Model Serialization & Startup Lifespan",
                "category": "Classic ML",
                "definitionUz": "O'qitilgan Pipeline obyektini diskka (`joblib`/`ONNX`) saqlash va web-server ishga tushganda (`lifespan`) bir marta operativ xotiraga yuklab qo'yish.",
                "analogyOrExampleUz": "Oshpaz har bir mijoz buyurtma berganda bozorga borib qozon sotib kelishi emas, balki ertalab oshxona ochilganda qozonni qizdirib tayyor turishi.",
                "connectedTo": [
                    {
                        "targetTerm": "FastAPI AI Gateway & SSE",
                        "targetLessonId": "D09.1",
                        "relationshipUz": "9-haftada murakkab LLM va RAG ulanish hovuzlari (connection pools) ham aynan FastAPI `lifespan` ichida boshqariladi."
                    }
                ]
            },
            {
                "term": "Docker Layer Caching & Multi-stage Build",
                "category": "Python & Infra",
                "definitionUz": "Docker konteyner qatlamlarini kam o'zgaradiganidan (`pyproject.toml`) tez-tez o'zgaradiganiga (`src/`) qarab tartiblash va ortiqcha build vositalarini yakuniy image'dan chiqarib tashlash.",
                "analogyOrExampleUz": "Uy qurishda poydevor va devorlarni har safar buzmasdan, faqat ichki devor rangini (kodni) tez yangilash.",
                "connectedTo": [
                    {
                        "targetTerm": "Docker Compose Multi-Container Stack",
                        "targetLessonId": "D09.2",
                        "relationshipUz": "9 va 12-haftalarda ushbu konteyner VectorDB, Redis va Monitoring konteynerlari bilan yagona `docker-compose.yml` tarmog'iga ulanadi."
                    }
                ]
            },
            {
                "term": "Healthcheck & Readiness Probe (`/health`)",
                "category": "MLOps & Eval",
                "definitionUz": "Servisning tirikligi va model xotiraga to'liq yuklanib so'rov qabul qilishga tayyorligini tekshiruvchi diagnostik HTTP endpoint.",
                "analogyOrExampleUz": "Tez yordam mashinasining smena oldidan yoqilg'i va tibbiy kislorod baloni joyidaligini tasdiqlovchi nazorat chirog'i.",
                "connectedTo": [
                    {
                        "targetTerm": "Kubernetes Liveness & Readiness Probes",
                        "targetLessonId": "D09.3",
                        "relationshipUz": "9-haftada Kubernetes aynan `/health` endpointiga qarab trafikni faqat tayyor podlargagina yo'naltiradi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d04-4-int-1",
                "level": "Junior",
                "questionUz": "FastAPI'da `/predict` endpointini `GET` metodi bilan qilish to'g'rimi yoki `POST` metodi bilanmi? Nega?",
                "interviewerIntentUz": "REST API standartlari va ML payload xususiyatlarini bilishini tekshirish.",
                "strongAnswerUz": "Albatta `POST` metodi bilan! Sabablari: 1) ML modelga yuboriladigan o'nlab feature'lar (yoki uzun matn/vektor) strukturali JSON body ichida yuboriladi va Pydantic tomonidan validatsiya qilinadi; `GET` da esa URL query string uzunligi cheklangan va murakkab tiplarni uzatish noqulay; 2) Xavfsizlik: `GET` URL parametrlari brauzer tarixi, proksi va Nginx access loglarida ochiq matnda saqlanib qoladi — mijozning shaxsiy va moliyaviy ma'lumotlari (PII) URL'da aslo ko'rinmasligi shart.",
                "redFlagUz": "'Model bazani o'zgartirmagani uchun GET ishlatgan yaxshi' deyish.",
                "followUpQuestionUz": "Savol: FastAPI'da kiruvchi JSON maydoni xato tipda bo'lsa (masalan `age: 'yigirma'`), avtomatik qaysi HTTP status kodi qaytadi? Javob: `422 Unprocessable Entity`."
            },
            {
                "id": "d04-4-int-2",
                "level": "Middle",
                "questionUz": "FastAPI ichida `joblib.load('model.joblib')` ni `@app.post('/predict')` funksiyasining ichiga yozib qo'ygan dasturchining kodida qanday muammo yuzaga keladi?",
                "interviewerIntentUz": "Disk I/O bottleneck va xotira boshqaruvini tushunishini sinash.",
                "strongAnswerUz": "Har bir foydalanuvchi so'rov yuborganda server diskdan 50-500 MB model faylini qaytadan o'qiydi va deserializatsiya qiladi! Natijada 3 ms bo'lishi kerak bo'lgan javob vaqti (latency) 1,500–3,000 ms ga chiqib ketadi, CPU va Disk I/O 100% ga tiqiladi va 20 ta parallel so'rovda server OOM (Out-of-Memory) bo'lib qulaydi. Model albatta ilova startup (`lifespan`) vaqtida bir marta global/app.state xotirasiga yuklanishi shart.",
                "redFlagUz": "'Har safar eng yangi faylni o'qishi uchun funksiya ichida yozgan yaxshi' deyish.",
                "followUpQuestionUz": "Savol: FastAPI'da og'ir CPU-bound (`model.predict`) funksiyani `async def predict()` deb e'lon qilish yaxshimi yoki oddiy `def predict()`mi? Javob: Agar ichida `await` bo'lmasa va sof CPU-bound sinxron hisoblash bo'lsa, oddiy `def predict()` yozish (yoki `run_in_threadpool` ishlatish) kerak! Chunki `async def` ichida sinxron bloklovchi CPU kodi yozilsa, u butun asyncio Event Loop'ni muzlatib qo'yadi va `/health` kabi boshqa so'rovlar ham javob bermay qoladi!"
            },
            {
                "id": "d04-4-int-3",
                "level": "Senior / Production",
                "questionUz": "Docker konteynerda uvicorn `--host 127.0.0.1 --port 8000` bilan ishga tushirildi, konteyner `Running` turibdi, lekin tashqaridan `localhost:8000` ga umuman ulanib bo'lmayapti. Sababi nima?",
                "interviewerIntentUz": "Docker tarmoq (loopback vs all interfaces) debugging tajribasini sinash.",
                "strongAnswerUz": "Konteyner ichidagi `127.0.0.1` (loopback) faqat o'sha konteynerning O'Z ICHIDAGI jarayonlar uchungina ko'rinadi va Docker virtual tarmoq ko'prigidan (`eth0`) kelgan tashqi port-forwarding (`-p 8000:8000`) ulanishlarini rad etadi (`Connection reset / refused`). Konteyner ichida server barcha tarmoq interfeyslarini eshitishi uchun albatta `--host 0.0.0.0` bilan ishga tushirilishi shart!",
                "redFlagUz": "'Portni 8080 ga o'zgartirish kerak yoki firewall'ni o'chirish kerak' deyish.",
                "followUpQuestionUz": "Savol: Docker image hajmi 2.4 GB chiqdi. Uni 250 MB gacha qanday kichraytirasiz? Javob: 1) `python:3.12` o'rniga `python:3.12-slim` bazaviy tasvirini olish; 2) `--no-dev` bilan `pytest`, `jupyter`, `matplotlib` kabi dev paketlarni o'rnatmaslik; 3) Multi-stage build va `.dockerignore` (`.git`, `.venv`, `data/`, `notebooks/` ni image'ga kiritmaslik) qo'llash."
            }
        ],
        "videos": [
            {
                "id": "vid-d04-4-uz",
                "title": "LLM va ML Modellarni FastAPI + Pydantic Bilan Production API Qilish",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "lzhSUZ0XpFc",
                "youtubeUrl": "https://www.youtube.com/watch?v=lzhSUZ0XpFc",
                "durationOrTimestamp": "FastAPI integratsiyasi",
                "whatItExplainsUz": "FastAPI'da Pydantic request/response sxemalarini yaratish va modelni endpoint orqali xavfsiz taqdim etish o'zbek tilida ko'rsatilgan.",
                "howToUseVideoUz": "1-Portfolio Churn loyihangizning `src/api.py` faylini yozishda videodagi Pydantic validatsiya uslubidan foydalaning."
            },
            {
                "id": "vid-d04-4-en",
                "title": "Solving a Business Problem with Data & End-to-End Delivery",
                "channel": "Ali Ahmad",
                "language": "en",
                "youtubeId": "A6wJ-GDPX4o",
                "youtubeUrl": "https://www.youtube.com/watch?v=A6wJ-GDPX4o",
                "durationOrTimestamp": "05:00 Muammo, 08:55 KPI",
                "whatItExplainsUz": "Texnik model natijasini biznes tiliga (risk darajalari, ushlab qolish kampaniyasi va ROI) tarjima qilish tushuntirilgan.",
                "howToUseVideoUz": "Portfolio README.md faylingizda modelning PR-AUC raqami biznesga qancha moliyaviy tejamkorlik berishini izohlab yozing."
            }
        ],
        "quiz": [
            {
                "id": "d04-4-q1",
                "promptUz": "1. Konseptual: Production FastAPI servisida ML model faylini (`.joblib`) qachon xotiraga yuklash eng to'g'ri amaliyot?",
                "options": [
                    "Har bir `/predict` so'rovi kelganda funksiya ichida",
                    "Ilova ishga tushayotganda (`lifespan` / startup hodisasida) faqat bir marta RAMga yuklab qo'yish",
                    "Har 5 soniyada sikl ichida",
                    "Faqat xato chiqqanda"
                ],
                "correctIndex": 1,
                "explanationUz": "Startup vaqtida bir marta RAMga yuklangan model disk I/O kechikishisiz so'rovlarga millisoniyalarda javob beradi."
            },
            {
                "id": "d04-4-q2",
                "promptUz": "2. Kod Tahlili: Dockerfile ichida nima uchun `COPY pyproject.toml uv.lock ./` va `RUN uv sync` buyruqlari `COPY src/ ./src/` dan OLDIN yoziladi?",
                "options": [
                    "Alifbo tartibiga rioya qilish uchun",
                    "Docker Layer Caching ishlashi uchun: kod (`src/`) o'zgarganda paketlar qatlami keshdan olinadi va qayta yuklanmaydi",
                    "Xotirani o'chirish uchun",
                    "Faqat Linux uchun shunday yoziladi"
                ],
                "correctIndex": 1,
                "explanationUz": "Docker qatlamlarni yuqoridan pastga keshlaydi; kam o'zgaradigan dependency qatlamini oldinga qo'yish build vaqtini 10-50 barobar tezlashtiradi."
            },
            {
                "id": "d04-4-q3",
                "promptUz": "3. Production Debugging: Docker konteyner ichida FastAPI `uvicorn` serveri tashqi port-forwarding (`-p 8000:8000`) orqali ko'rinishi uchun `--host` parametriga nima berilishi shart?",
                "options": [
                    "`127.0.0.1`",
                    "`0.0.0.0` (barcha tarmoq interfeyslarini eshitish uchun)",
                    "`localhost`",
                    "`192.168.1.1`"
                ],
                "correctIndex": 1,
                "explanationUz": "`127.0.0.1` faqat konteyner ichidagi lokal murojaatlarni qabul qiladi; tashqi hostdan ulanish uchun `0.0.0.0` shart."
            }
        ]
    },
    "D05.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Hisoblash Grafi (Computational Graph) va Zanjir Qoidasi (Chain Rule)",
                "explanationUz": "Andrej Karpathy'ning `micrograd` dvigateli har qanday zamonaviy Deep Learning freymvorkining (PyTorch, JAX) yuragini ochib beradi. Neyron tarmoq aslida oddiy qo'shish (`+`), ko'paytirish (`*`) va aktivatsiya (`tanh`/`ReLU`) amallaridan tashkil topgan yo'naltirilgan grafdir (DAG). **Forward pass** (to'g'ri o'tish) natijani hisoblaydi, **Backward pass** (teskari o'tish) esa matematik tahlildagi **Zanjir Qoidasi (Chain Rule)**: $\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial z} \\cdot \\frac{\\partial z}{\\partial x}$ orqali oxirgi Loss'dan boshlab har bir og'irlikning gradientini (`grad`) orqaga qarab hisoblab chiqadi.",
                "codeExample": "# Qo'lda Forward va Backward (Chain Rule) hisoblash:\n# f(a, b, c) = (a * b + c)\na, b, c = 2.0, -3.0, 10.0\nd = a * b       # d = -6.0\nL = d + c       # L = 4.0\n\n# Backward pass (dL/dL = 1.0 dan boshlanadi):\ndL_dL = 1.0\ndL_dd = dL_dL * 1.0          # (+) operatsiyasi gradientni o'ziday uzatadi (distributor)\ndL_dc = dL_dL * 1.0\ndL_da = dL_dd * b            # (*) operatsiyasi gradientni sherigiga ko'paytiradi (switcher)\ndL_db = dL_dd * a\nprint(f'L={L} | Gradients: da={dL_da}, db={dL_db}, dc={dL_dc}')",
                "outputOrNoteUz": "Natija: `da=-3.0, db=2.0, dc=1.0`. Qo'shish (`+`) gradientni ikkala shoxga teng tarqatadi, ko'paytirish (`*`) esa ikkinchi ko'paytuvchiga ko'paytiradi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: micrograd `Value` Klassini Qurish va Topological Sort",
                "explanationUz": "Grafda bitta tugun bir nechta yo'ldan ishlatilishi mumkin (masalan `b = a + a`). Shu sababli backward pass'da gradient `=` bilan yozilmasdan, **`+=` bilan yig'ib borilishi** (`self.grad += ...`) va tugunlar oxirgi chiqishdan kirishga qarab **Topologik Tartibda (Topological Sort)** aylanib chiqilishi shart!",
                "codeExample": "class Value:\n    def __init__(self, data: float, _children=()):\n        self.data = float(data)\n        self.grad = 0.0\n        self._backward = lambda: None\n        self._prev = set(_children)\n\n    def __add__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data + other.data, (self, other))\n        def _backward():\n            self.grad += 1.0 * out.grad\n            other.grad += 1.0 * out.grad\n        out._backward = _backward\n        return out\n\n    def __mul__(self, other):\n        other = other if isinstance(other, Value) else Value(other)\n        out = Value(self.data * other.data, (self, other))\n        def _backward():\n            self.grad += other.data * out.grad\n            other.grad += self.data * out.grad\n        out._backward = _backward\n        return out\n\nx = Value(3.0)\ny = x * x + x  # y = x^2 + x => dy/dx = 2x + 1 = 7.0\n# Topologik teskari chaqiruv:\ny.grad = 1.0\ny._backward()\nfor child in y._prev:\n    child._backward()\nprint(f'x={x.data} uchun y={y.data} | Avtomatik dy/dx = {x.grad} (Kutilgan: 2*3 + 1 = 7.0)')",
                "outputOrNoteUz": "Natija: `dy/dx = 7.0`! Atigi 25 qator Python kodida PyTorch Autograd dvigatelining ishlaydigan yadrosi yaratildi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Aktivatsiya Funksiyalari (ReLU vs Sigmoid/Tanh) va Vanishing Gradient",
                "explanationUz": "Agar neyron tarmoqda no-chiziqli (non-linear) aktivatsiya funksiyasi bo'lmasa, 100 ta chiziqli qatlam ko'paytmasi baribir bitta oddiy chiziqli regressiyaga ($W_{100}\\dots W_1 x = W_{\\text{eff}} x$) qisqarib ketadi! Ammo `Sigmoid` hosilasi maksimal `0.25` ga teng — 10 ta qatlamda $0.25^{10} \\approx 0.000001$ bo'lib gradient yo'qolib ketadi (**Vanishing Gradient**). **ReLU** ($\\max(0, x)$) esa $x > 0$ da hosilasi `1.0` bo'lgani uchun gradientni so'ndirmasdan chuqur qatlamlarga o'tkazadi.",
                "codeExample": "import math\n\ndef sigmoid_deriv(x: float) -> float:\n    s = 1.0 / (1.0 + math.exp(-x))\n    return s * (1.0 - s)\n\ndef relu_deriv(x: float) -> float:\n    return 1.0 if x > 0 else 0.0\n\nprint('10 qatlamdan so\\'ng Sigmoid gradienti (x=0):', round(sigmoid_deriv(0.0) ** 10, 8))\nprint('10 qatlamdan so\\'ng ReLU gradienti    (x=2):', round(relu_deriv(2.0) ** 10, 8))",
                "outputOrNoteUz": "Natija: 10 qatlamda Sigmoid gradienti `0.00000095` ga so'nib ketdi, ReLU gradienti esa `1.0` bo'lib to'liq yetib bordi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Analitik Gradientni Sonli Hosila (Finite Difference) Bilan Tekshirish",
                "scenarioUz": "O'zingiz yozgan backward formulasining to'g'riligini $\\frac{f(x+h) - f(x-h)}{2h}$ sonli yaqinlashish usuli (Gradient Check) bilan tasdiqlash.",
                "howToUseUz": "Gradient checking kodini ishga tushiring.",
                "code": "def f(x: float) -> float:\n    return 3.0 * (x ** 3) - 2.0 * (x ** 2) + 5.0 * x\n\nx0 = 2.0\nanalytic_grad = 9.0 * (x0 ** 2) - 4.0 * x0 + 5.0 # 9*4 - 8 + 5 = 33.0\n\nh = 1e-5\nnumeric_grad = (f(x0 + h) - f(x0 - h)) / (2 * h)\nprint(f'Analitik hosila: {analytic_grad:.6f}')\nprint(f'Sonli (Numeric): {numeric_grad:.6f}')\nprint(f'Farq: {abs(analytic_grad - numeric_grad):.2e}')",
                "expectedOutput": "Analitik hosila: 33.000000\nSonli (Numeric): 33.000000\nFarq: 1.98e-10",
                "breakdownUz": "`torch.autograd.gradcheck` funksiyasi ham maxsus CUDA yadrolarini aynan shu markaziy ayirma (`2h`) formulasi bilan tekshiradi."
            },
            {
                "titleUz": "2-misol: Bitta Neyronni micrograd Uslubida O'qitish",
                "scenarioUz": "2 ta kirishga ega neyron og'irliklarini forward -> loss -> backward -> update siklida maqsadli qiymatga olib kelish.",
                "howToUseUz": "5 qadamli neyron o'qitish siklini kuzating.",
                "code": "w1, w2, b = 0.5, -0.5, 0.0\nx1, x2, target = 2.0, 3.0, 4.0\nlr = 0.05\n\nfor step in range(1, 7):\n    # Forward:\n    pred = w1 * x1 + w2 * x2 + b\n    loss = (pred - target) ** 2\n    # Backward (Chain rule):\n    dloss_dpred = 2.0 * (pred - target)\n    dw1 = dloss_dpred * x1\n    dw2 = dloss_dpred * x2\n    db  = dloss_dpred * 1.0\n    # Update:\n    w1 -= lr * dw1\n    w2 -= lr * dw2\n    b  -= lr * db\n    print(f'Qadam {step}: Bashorat={pred:.3f} (Maqsad={target}) | Loss={loss:.4f}')",
                "expectedOutput": "Qadam 1: Bashorat=-0.500 (Maqsad=4.0) | Loss=20.2500\n...\nQadam 6: Bashorat=4.000 (Maqsad=4.0) | Loss=0.0000",
                "breakdownUz": "Atigi 6 qadamda Loss `20.25` dan `0.0000` ga tushdi va neyron aniq `4.0` javobni chiqarishni o'rgandi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Backpropagation & Chain Rule",
                "category": "Deep Learning & NLP",
                "definitionUz": "Murakkab funksiya hosilasini ichma-ich joylashgan elementar amallar hosilalari ko'paytmasi ($\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y}\\frac{\\partial y}{\\partial z}\\frac{\\partial z}{\\partial w}$) sifatida chiqishdan kirishga qarab hisoblash algoritmi.",
                "analogyOrExampleUz": "Estafeta poygasi: marra chizig'idagi umumiy kechikish sababini oxirgi yuguruvchidan birinchisiga qarab ulushma-ulush uzatib tahlil qilish.",
                "connectedTo": [
                    {
                        "targetTerm": "PyTorch loss.backward()",
                        "targetLessonId": "D05.2",
                        "relationshipUz": "Keyingi darsda PyTorch tensorlaridagi `loss.backward()` chaqiruvi C++ da aynan shu `micrograd` grafini GPU ustida bajaradi."
                    }
                ]
            },
            {
                "term": "Vanishing & Exploding Gradients",
                "category": "Deep Learning & NLP",
                "definitionUz": "Chuqur tarmoqlarda ko'plab $<1$ hosilalar ko'paytirilib gradientning `0` ga so'nib ketishi (Vanishing) yoki $>1$ hosilalar ko'paytirilib `inf` ga portlab ketishi (Exploding).",
                "analogyOrExampleUz": "Telefon o'yini: 30 kishi bir-biriga pichirlaganda oxirida ovoz eshitilmay qolishi (Vanishing) yoki har biri mikrofonda kuchaytirganda karnay chiyillab ketishi (Exploding).",
                "connectedTo": [
                    {
                        "targetTerm": "Residual Connections (Skip Connections) in Transformers",
                        "targetLessonId": "D06.3",
                        "relationshipUz": "ResNet va GPT Transformerlaridagi `x = x + sublayer(x)` qo'shish amali gradient uchun `1.0` lik 'super-magistral' ochib, Vanishing Gradient'ni hal qiladi!"
                    }
                ]
            },
            {
                "term": "Gradient Accumulation (`+=`)",
                "category": "Deep Learning & NLP",
                "definitionUz": "Bir o'zgaruvchi grafning bir nechta shoxida qatnashganda yoki bir nechta mini-batch davomida uning gradientlarini ustma-ust qo'shib borish qoidasi.",
                "analogyOrExampleUz": "Ikki xil do'kondan kelgan foydani bitta umumiy bank hisob raqamiga (`+=`) qo'shib borish.",
                "connectedTo": [
                    {
                        "targetTerm": "optimizer.zero_grad() & QLoRA Gradient Accumulation",
                        "targetLessonId": "D08.4",
                        "relationshipUz": "PyTorch'da har qadamda `zero_grad()` chaqirish sababi va 8-haftada kichik GPU'da katta batchni simulyatsiya qilish (`gradient_accumulation_steps`) aynan shu `+=` xususiyatiga tayanadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d05-1-int-1",
                "level": "Junior",
                "questionUz": "Nima uchun ko'p qatlamli neyron tarmoqda qatlamlar orasiga no-chiziqli aktivatsiya funksiyasi (ReLU, GELU, Tanh) qo'yish shart?",
                "interviewerIntentUz": "Chiziqli akslantirishlar kompozitsiyasi xossasini bilishini tekshirish.",
                "strongAnswerUz": "Chiziqli algebradan ma'lumki, ikki yoki yuzta chiziqli matritsa ko'paytmasi $W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2) = W_{\\text{new}} x + b_{\\text{new}}$ baribir BITTA chiziqli qatlamga teng bo'lib qoladi. Ya'ni no-chiziqli aktivatsiyasiz 100 qatlamli tarmoq oddiy chiziqli regressiyadan ortiq hech qanday murakkab (XOR, rasm, til) bog'liqlikni o'rgana olmaydi.",
                "redFlagUz": "'Aktivatsiya funksiyasi faqat sonlarni 0 va 1 orasiga tushirish uchun kerak' deyish (ReLU 1 dan katta sonlarni ham chiqaraveradi!).",
                "followUpQuestionUz": "Savol: 'Dying ReLU' (O'lik ReLU) muammosi nima va uni qanday hal qilinadi? Javob: Agar neyron kirishi doim manfiy bo'lib qolsa, ReLU chiqishi ham, hosilasi ham `0` bo'lib, neyron og'irligi boshqa hech qachon yangilanmaydi; buni hal qilish uchun `LeakyReLU`, `GELU` yoki `SiLU/Swish` ishlatiladi."
            },
            {
                "id": "d05-1-int-2",
                "level": "Middle",
                "questionUz": "Nima uchun barcha neyron tarmoq og'irliklarini (`weights`) boshida `0.0` ga tenglab (Zero Initialization) o'qitishni boshlab bo'lmaydi?",
                "interviewerIntentUz": "Symmetry Breaking (simmetriyani buzish) muammosini tushunishini sinash.",
                "strongAnswerUz": "Agar barcha og'irliklar $W = 0$ (yoki bir xil konstanta) qilib olinsa, yashirin qatlamdagi BARCHA neyronlar forward pass'da aynan bir xil qiymat hisoblaydi va backward pass'da aynan bir xil gradient oladi! Natijada 1000 ta neyron o'qitish oxirigacha bitta neyronning kloni bo'lib qolaveradi (**Symmetry Problem**). Simmetriyani buzish uchun og'irliklar kichik tasodifiy sonlar bilan — ReLU uchun **He (Kaiming) initialization** $\\mathcal{N}(0, \\sqrt{2/n_{\\text{in}}})$, Tanh/Sigmoid uchun **Xavier (Glorot) initialization** bilan boshlanadi.",
                "redFlagUz": "'Nolga ko'paytirsa kompyuter xato beradi' deyish.",
                "followUpQuestionUz": "Savol: Bias (`b`) vektorini boshida `0.0` qilib initsializatsiya qilish mumkinmi? Javob: Ha! Og'irliklar $W$ tasodifiy bo'lgani uchun simmetriya allaqachon buzilgan bo'ladi, shuning uchun `bias = 0.0` qilish to'liq xavfsiz va standartdir."
            },
            {
                "id": "d05-1-int-3",
                "level": "Senior / Production",
                "questionUz": "Nima uchun zamonaviy Deep Learning'da Forward-mode autodiff emas, balki Reverse-mode autodiff (Backpropagation) ishlatiladi?",
                "interviewerIntentUz": "Hisoblash murakkabligi ($O(N)$ vs $O(1)$ pass) ni chuqur tushunishini sinash.",
                "strongAnswerUz": "Neyron tarmoqda kiruvchi parametrlar (og'irliklar) soni $N$ millionlab yoki milliardlab ($\\mathbb{R}^N$), chiqish esa bitta skalyar Loss ($\\mathbb{R}^1$) dir: $f: \\mathbb{R}^N \\to \\mathbb{R}^1$. Forward-mode autodiff bitta o'tishda bitta parametrga nisbatan hosilani hisoblaydi — 1 milliard parametr uchun 1 milliard marta forward pass qilish kerak bo'lardi! Reverse-mode autodiff (Backprop) esa bitta skalyar Loss'dan orqaga qarab **FAQAT BITTA backward pass** ichida barcha $N$ ta parametrning gradientini bir vaqtda hisoblab beradi (ammo buning evaziga forward vaqtidagi oraliq aktivatsiyalarni xotirada saqlab turish talab etiladi).",
                "redFlagUz": "Forward-mode va Reverse-mode farqini va $f: \\mathbb{R}^N \\to \\mathbb{R}^1$ o'lcham argumentini bilmaslik.",
                "followUpQuestionUz": "Savol: Katta modellarda forward aktivatsiyalar VRAM'ni to'ldirib qo'ysa nima qilinadi? Javob: **Activation / Gradient Checkpointing** qo'llaniladi — oraliq aktivatsiyalarning bir qismi saqlanmasdan, backward vaqtida qaytadan hisoblab olinadi (~30% qo'shimcha hisoblash evaziga 60-70% VRAM tejaladi)."
            }
        ],
        "videos": [
            {
                "id": "vid-d05-1-en",
                "title": "The spelled-out intro to neural networks and backpropagation: building micrograd",
                "channel": "Andrej Karpathy",
                "language": "en",
                "youtubeId": "VMj-3S1tku0",
                "youtubeUrl": "https://www.youtube.com/watch?v=VMj-3S1tku0",
                "durationOrTimestamp": "Legendaviy to'liq dars (M25 manba)",
                "whatItExplainsUz": "OpenAI asoschilaridan biri Andrej Karpathy noldan `Value` klassini, hisoblash grafini, backpropagation va MLP neyron tarmog'ini jonli kod yozib tushuntiradi.",
                "howToUseVideoUz": "Ushbu videoni ko'rayotganda 2-bosqichdagi `Value` klassini Python muharririda ochib qo'ying va Karpathy yozgan `__add__`, `__mul__`, `_backward` funksiyalarini o'z qo'lingiz bilan kengaytirib sinang."
            },
            {
                "id": "vid-d05-1-en-2",
                "title": "Backpropagation For Neural Networks Explained",
                "channel": "AssemblyAI",
                "language": "en",
                "youtubeId": "LHLrXavT1gQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=LHLrXavT1gQ",
                "durationOrTimestamp": "Vizual konspekt",
                "whatItExplainsUz": "Zanjir qoidasi (Chain Rule) va qatlamlar bo'ylab xatolikning orqaga tarqalishi qisqa va aniq animatsiyada ko'rsatilgan.",
                "howToUseVideoUz": "Katta Karpathy darsidan oldin yoki keyin asosiy formulalarni tez takrorlash uchun foydalaning."
            }
        ],
        "quiz": [
            {
                "id": "d05-1-q1",
                "promptUz": "1. Konseptual: `micrograd` va PyTorch Autograd dvigatelida bir xil o'zgaruvchi grafda ikki marta qatnashsa (`y = x + x`), backward pass'da gradient qanday hisoblanishi shart?",
                "options": [
                    "`x.grad = out.grad` qilib ustidan yozib yuboriladi",
                    "Ko'p o'zgaruvchili zanjir qoidasiga ko'ra `x.grad += ...` orqali barcha shoxlardan kelgan gradientlar yig'ib boriladi",
                    "Gradient 0 ga tenglanadi",
                    "Xato berib to'xtaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "Bir tugun bir nechta yo'lda ishtirok etsa, uning umumiy hosilasi barcha yo'llardan kelgan xususiy hosilalar yig'indisiga (`+=`) teng."
            },
            {
                "id": "d05-1-q2",
                "promptUz": "2. Kod Tahlili: `d = a * b` ko'paytirish tuguniga orqadan `out.grad = 5.0` keldi. Agar `a = 3.0` va `b = 4.0` bo'lsa, `a.grad` va `b.grad` nechaga teng bo'ladi?",
                "options": [
                    "a.grad = 15.0, b.grad = 20.0",
                    "a.grad = 20.0 (b * out.grad = 4 * 5), b.grad = 15.0 (a * out.grad = 3 * 5)",
                    "a.grad = 5.0, b.grad = 5.0",
                    "a.grad = 12.0, b.grad = 12.0"
                ],
                "correctIndex": 1,
                "explanationUz": "$\\frac{\\partial (a \\cdot b)}{\\partial a} = b = 4$, demak `a.grad = 4 * 5 = 20.0`; $\\frac{\\partial (a \\cdot b)}{\\partial b} = a = 3$, demak `b.grad = 3 * 5 = 15.0`."
            },
            {
                "id": "d05-1-q3",
                "promptUz": "3. Production Debugging: 20 qatlamli neyron tarmoqda har bir qatlamda `Sigmoid` aktivatsiyasi ishlatilgan va birinchi qatlamlar umuman o'qimayapti (`grad ≈ 0`). Sababi va yechimi nima?",
                "options": [
                    "Vanishing Gradient (Sigmoid hosilasi <= 0.25 bo'lgani uchun ko'paytmada nolga aylanib ketgan); ReLU/GELU va Residual Connection ishlatish kerak",
                    "Qatlamlar sonini 100 taga oshirish kerak",
                    "Learning rate'ni 0 qilish kerak",
                    "Barcha og'irliklarni 0 ga tenglash kerak"
                ],
                "correctIndex": 0,
                "explanationUz": "Sigmoid'ning maksimal hosilasi `0.25` bo'lib, chuqur qatlamlarda eksponensial ravishda `0` ga so'nib ketadi."
            }
        ]
    },
    "D05.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: PyTorch Tensorlar, Device (`cpu`/`cuda`) va `requires_grad`",
                "explanationUz": "PyTorch `Tensor` tashqi ko'rinishidan NumPy `ndarray` ga juda o'xshaydi, ammo ikkita super-kuchga ega: 1) GPU (`cuda` yoki Apple `mps`) tezlatkichlarida minglab yadrolarda parallel ishlay oladi; 2) `requires_grad=True` yoqilganda bajarilgan har bir matematik amalni dinamik hisoblash grafiga (`grad_fn`) yozib boradi va `.backward()` chaqirilganda avtomatik hosila oladi.",
                "codeExample": "# PyTorch Tensor va NumPy ekvivalent mantiqi:\n# x = torch.tensor([2.0, 3.0], requires_grad=True)\n# y = (x ** 2).sum() -> dy/dx = 2 * x = [4.0, 6.0]\nimport numpy as np\n\nx = np.array([2.0, 3.0])\ny = np.sum(x ** 2)\nx_grad = 2.0 * x\nprint(f'Tensor qiymati: {x} | Skalyar chiqish y={y} | x.grad={x_grad}')",
                "outputOrNoteUz": "Natija: PyTorch'da `.backward()` faqat skalyar (`1` ta son, masalan `loss = y.mean()`) ustida chaqiriladi va `x.grad` ichida `[4.0, 6.0]` paydo bo'ladi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Tensor O'lchamlarini Boshqarish (`view`, `reshape`, `unsqueeze`, `permute`)",
                "explanationUz": "Deep Learning'da xatolarning 80% qismi tensor o'lchamlari (`shape mismatch`) dan kelib chiqadi: 1) `unsqueeze(0)` — bitta namunaga batch o'lchamini qo'shadi: `(3, 224, 224) -> (1, 3, 224, 224)`; 2) `squeeze()` — `1` ga teng o'lchamlarni olib tashlaydi; 3) `permute(0, 3, 1, 2)` — OpenCV/PIL rasm formatini `(Batch, Height, Width, Channels)` dan PyTorch CNN kutadigan `(Batch, Channels, Height, Width)` formatiga o'tkazadi.",
                "codeExample": "import numpy as np\n\nimg_hwc = np.zeros((224, 224, 3), dtype=np.float32) # Bitta RGB rasm (H, W, C)\nimg_chw = np.transpose(img_hwc, (2, 0, 1))          # PyTorch permute: (C, H, W)\nbatch_bchw = np.expand_dims(img_chw, axis=0)        # unsqueeze(0): (1, C, H, W)\nprint('Asl rasm (H, W, C):      ', img_hwc.shape)\nprint('Permute so\\'ng (C, H, W): ', img_chw.shape)\nprint('Unsqueeze (B, C, H, W):  ', batch_bchw.shape)",
                "outputOrNoteUz": "Natija: `(224, 224, 3) -> (3, 224, 224) -> (1, 3, 224, 224)`. Modelga bitta rasm uzatganda ham 4D batch o'lchami bo'lishi shart!"
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Custom `Dataset` va `DataLoader` Arxitekturasi",
                "explanationUz": "100,000 ta rasmni yoki audio faylni bir vaqtda RAMga yuklab bo'lmaydi. PyTorch'da `Dataset` klassi 2 ta metodni talab qiladi: `__len__()` (jami elementlar soni) va `__getitem__(idx)` (faqat so'ralgan `idx`-elementni diskdan o'qib tensorga o'girish). `DataLoader` esa ushbu `Dataset` ustidan o'rab, ko'p oqimda (`num_workers > 0`) ma'lumotni aralashtirib (`shuffle=True` faqat train uchun!), `batch_size=32` qilib GPUga uzluksiz yetkazib beradi (`pin_memory=True`).",
                "codeExample": "class CustomTabularDataset:\n    def __init__(self, features: list[list[float]], labels: list[int]):\n        self.X = features\n        self.y = labels\n\n    def __len__(self) -> int:\n        return len(self.X)\n\n    def __getitem__(self, idx: int) -> tuple[list[float], int]:\n        return self.X[idx], self.y[idx]\n\nds = CustomTabularDataset([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]], [0, 1, 1])\nprint('Dataset uzunligi len(ds):', len(ds))\nprint('1-indeks elementi ds[1]: ', ds[1])",
                "outputOrNoteUz": "Natija: `__getitem__` faqat so'ralgan indeksni qaytaradi, shuning uchun 1 Terabaytlik dataset ham xotirani to'ldirmaydi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Mini-Batch DataLoader va `drop_last` Simulyatsiyasi",
                "scenarioUz": "10 ta namunani `batch_size=4` bilan bo'laklab uzatish va `BatchNorm` xato bermasligi uchun oxirgi chala batchni boshqarish.",
                "howToUseUz": "Batch generatorini ishga tushiring.",
                "code": "import numpy as np\n\ndef simple_dataloader(X: np.ndarray, batch_size: int, shuffle: bool = True, drop_last: bool = False):\n    indices = np.arange(len(X))\n    if shuffle:\n        np.random.shuffle(indices)\n    for start in range(0, len(X), batch_size):\n        batch_idx = indices[start:start + batch_size]\n        if drop_last and len(batch_idx) < batch_size:\n            continue\n        yield X[batch_idx]\n\nX_data = np.arange(10)\nnp.random.seed(0)\nprint('drop_last=False batchlar:', [b.tolist() for b in simple_dataloader(X_data, 4, drop_last=False)])\nprint('drop_last=True  batchlar:', [b.tolist() for b in simple_dataloader(X_data, 4, drop_last=True)])",
                "expectedOutput": "drop_last=False batchlar: [[2, 8, 4, 9], [1, 6, 7, 3], [0, 5]]\ndrop_last=True  batchlar: [[3, 5, 1, 2], [9, 8, 0, 6]]",
                "breakdownUz": "Agar dataset uzunligi `batch_size` ga qoldiqsiz bo'linib `1` ta element ortib qolsa, `BatchNorm1d` 1 ta elementdan variance hisoblay olmay xato beradi; shuning uchun train'da `drop_last=True` foydali!"
            },
            {
                "titleUz": "2-misol: Turli Uzunlikdagi Ketma-ketliklar Uchun `collate_fn` (Dynamic Padding)",
                "scenarioUz": "NLP va nutq masalalarida bitta batchga tushgan gaplar uzunligi har xil bo'ladi (`[3 ta token]`, `[5 ta token]`). Ularni bitta matritsaga yig'ish uchun eng uzun gapga qarab `0` (PAD) bilan to'ldirish.",
                "howToUseUz": "Dynamic padding `collate_fn` funksiyasini sinang.",
                "code": "def dynamic_pad_collate(batch_sequences: list[list[int]], pad_id: int = 0) -> list[list[int]]:\n    max_len = max(len(seq) for seq in batch_sequences)\n    padded = [seq + [pad_id] * (max_len - len(seq)) for seq in batch_sequences]\n    return padded\n\nbatch = [[101, 45, 102], [101, 12, 88, 91, 102], [101, 77]]\nprint('Dynamic Padded Batch matritsasi:')\nfor row in dynamic_pad_collate(batch, pad_id=0):\n    print(row)",
                "expectedOutput": "Dynamic Padded Batch matritsasi:\n[101, 45, 102, 0, 0]\n[101, 12, 88, 91, 102]\n[101, 77, 0, 0, 0]",
                "breakdownUz": "Butun datasetdagi maksimal uzunlikka (masalan `512`) emas, faqat joriy batch ichidagi maksimal uzunlikka (`5`) tekislash hisoblashni 3-5 barobar tezlashtiradi!"
            }
        ],
        "termsAndConnections": [
            {
                "term": "PyTorch Dynamic Computation Graph (Define-by-Run)",
                "category": "Deep Learning & NLP",
                "definitionUz": "Forward pass bajarilayotgan vaqtda har safar yangidan quriladigan va oddiy Python `if/for` hamda debugger bilan ishlash imkonini beruvchi hisoblash grafi.",
                "analogyOrExampleUz": "Yo'l harakati davomida GPS navigatorning har bir chorrahada jonli ravishda marshrut chizib borishi.",
                "connectedTo": [
                    {
                        "targetTerm": "torch.no_grad() & .detach()",
                        "targetLessonId": "D05.3",
                        "relationshipUz": "Inferens va validatsiya paytida ushbu grafni qurishni to'xtatib, VRAM xotirani 50%+ tejash uchun `torch.no_grad()` ishlatiladi."
                    }
                ]
            },
            {
                "term": "Dataset & DataLoader (`pin_memory`, `num_workers`)",
                "category": "Deep Learning & NLP",
                "definitionUz": "`Dataset` — ma'lumotga indeks orqali murojaat interfeysi; `DataLoader` — multiprocessing (`num_workers`) va pinned RAM (`pin_memory`) orqali GPU'ni kutdirmasdan batch uzatuvchi konveyer.",
                "analogyOrExampleUz": "Dataset — ombordagi javonlar; DataLoader — ombordan ustaga detallarni uzluksiz tashib turuvchi avtomatik lenta.",
                "connectedTo": [
                    {
                        "targetTerm": "GPU Utilization & Throughput",
                        "targetLessonId": "D07.3",
                        "relationshipUz": "Agar `num_workers=0` bo'lsa, qimmat GPU vaqtining 70% qismini CPU diskdan fayl o'qishini kutib bekor o'tkazadi (I/O starvation)."
                    }
                ]
            },
            {
                "term": "view() vs reshape() vs contiguous()",
                "category": "Deep Learning & NLP",
                "definitionUz": "`view()` faqat xotirada ketma-ket (contiguous) yotgan tensor ustida zero-copy shakl o'zgartiradi; `permute()` yoki `transpose()` dan keyin esa `.contiguous().view()` yoki `.reshape()` talab etiladi.",
                "analogyOrExampleUz": "Kitob sahifalari tartibda tursa (`contiguous`) shunchaki boblar ro'yxatini o'zgartirish (`view`) kifoya; sahifalar almashgan bo'lsa avval tartiblab bog'lash (`contiguous()`) kerak.",
                "connectedTo": [
                    {
                        "targetTerm": "Multi-Head Attention Tensor Reshape",
                        "targetLessonId": "D06.2",
                        "relationshipUz": "6-haftada `(B, T, C)` tensorni `(B, n_head, T, head_dim)` ga ajratish va qayta yig'ishda aynan `.transpose(1, 2).contiguous().view(...)` ishlatiladi!"
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d05-2-int-1",
                "level": "Junior",
                "questionUz": "PyTorch'da `RuntimeError: Expected all tensors to be on the same device, but found at least two devices, cuda:0 and cpu!` xatosi nimani anglatadi va qanday tuzatiladi?",
                "interviewerIntentUz": "Eng ko'p uchraydigan PyTorch amaliy xatosini bilishini tekshirish.",
                "strongAnswerUz": "Bu xato model GPU'ga (`model.to('cuda')`) ko'chirilgan, ammo kiruvchi batch tensorlar (`X_batch`, `y_batch`) hali CPU xotirasida qolib ketganini (yoki aksincha) bildiradi. CPU va GPU xotiralari jismonan alohida bo'lgani uchun ular ustida bevosita matritsa ko'paytmasi bajarib bo'lmaydi. Tuzatish: training loop ichida har bir batchni `X_batch = X_batch.to(device)` va `y_batch = y_batch.to(device)` orqali model turgan qurilmaga ko'chirish shart.",
                "redFlagUz": "'PyTorch'ni qayta o'rnatish kerak' deyish.",
                "followUpQuestionUz": "Savol: GPU'dagi tensorni NumPy ga o'tkazish uchun `tensor.numpy()` yozilsa xato beradi. To'g'ri zanjir qanday? Javob: `tensor.detach().cpu().numpy()` — avval autograd grafidan uziladi (`detach`), keyin CPU RAMga ko'chiriladi (`cpu`), so'ng NumPy massivga o'tkaziladi."
            },
            {
                "id": "d05-2-int-2",
                "level": "Middle",
                "questionUz": "PyTorch `DataLoader` da `pin_memory=True` va `num_workers=4` parametrlari kapot ostida nima ish qiladi?",
                "interviewerIntentUz": "CPU-dan GPU-ga ma'lumot uzatish arxitekturasini (Pageable vs Pinned/Page-locked memory) tushunishini sinash.",
                "strongAnswerUz": "`num_workers=4` asosiy jarayonni bloklamasdan 4 ta parallel Python subprocess orqali keyingi batchlarni oldindan diskdan o'qib va augmentatsiya qilib tayyorlab turadi (prefetching). `pin_memory=True` esa batch tensorlarni operatsion tizim swap'ga chiqarib yubora olmaydigan maxsus **Page-Locked (Pinned) RAM** sohasiga joylashtiradi. GPU'ning DMA (Direct Memory Access) kontrolleri Pageable RAMdan to'g'ridan-to'g'ri o'qiy olmaydi — `pin_memory=True` bo'lganda esa CPU ishtirokisiz va oraliq nusxasiz `tensor.to('cuda', non_blocking=True)` orqali 2-3 barobar tezroq VRAMga ko'chiradi.",
                "redFlagUz": "'`pin_memory=True` model og'irliklarini GPU'da qulflab qo'yadi' deb noto'g'ri tushuntirish.",
                "followUpQuestionUz": "Savol: CPU-da o'qitayotganda `pin_memory=True` foyda beradimi? Javob: Yo'q, u faqat Host RAM -> CUDA GPU VRAM uzatish uchun xizmat qiladi; faqat CPU ishlatilganda ortiqcha RAM band qiladi."
            },
            {
                "id": "d05-2-int-3",
                "level": "Senior / Production",
                "questionUz": "Validatsiya yoki monitoring siklida `total_loss += loss` deb yozilganda bir necha yuz batchdan keyin GPU VRAM to'lib `CUDA Out of Memory` xatosi chiqdi. Nega bunday bo'ldi?",
                "interviewerIntentUz": "Autograd grafining xotirada osilib qolishi (memory leak) ni topa olishini sinash.",
                "strongAnswerUz": "`loss` — oddiy Python float soni emas, balki `grad_fn` orqali butun forward pass hisoblash grafini va barcha oraliq aktivatsiya tensorlarini o'ziga bog'lab turgan PyTorch Tensoridir! `total_loss += loss` qilinganda har bir batchning butun hisoblash grafi `total_loss` ga ulanib, Garbage Collector ularni VRAM'dan o'chira olmay qoladi. Tuzatish: skalyar qiymatni grafdan uzib olish uchun albatta `total_loss += loss.item()` (yoki `loss.detach()`) yozish va validatsiyani `with torch.no_grad():` bloki ichida bajarish shart!",
                "redFlagUz": "'Batch size'ni 1 ga tushirish kerak' deyish (xotira oqishi baribir davom etaveradi).",
                "followUpQuestionUz": "Savol: `tensor.detach()` va `tensor.clone()` o'rtasida qanday farq bor? Javob: `detach()` xotiradan yangi bufer ajratmasdan autograd tarixidan uzilgan tensor qaytaradi (xotira umumiy); `clone()` esa yangi xotira ajratadi, lekin autograd grafida qoladi. To'liq mustaqil va grafsiz nusxa uchun `tensor.detach().clone()` ishlatiladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d05-2-ru",
                "title": "Backpropagation Explained | Neural Networks & Tensors",
                "channel": "machine learrrning",
                "language": "ru",
                "youtubeId": "EuhoXsuu8SQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=EuhoXsuu8SQ",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "Ko'p o'lchamli tensorlar va matritsalar bo'ylab gradientlarning qanday oqishi hamda o'lchamlar mosligi tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rgach, `unsqueeze`, `squeeze` va `permute` o'lcham o'zgarishlarini 2-bosqich kodida mashq qiling."
            },
            {
                "id": "vid-d05-2-en",
                "title": "Backpropagation For Neural Networks Explained",
                "channel": "AssemblyAI",
                "language": "en",
                "youtubeId": "LHLrXavT1gQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=LHLrXavT1gQ",
                "durationOrTimestamp": "Tensor amallari",
                "whatItExplainsUz": "Neyron tarmoq qatlamlarida kirish tensorlari va og'irlik matritsalari qanday ko'paytirilishi vizual ko'rsatilgan.",
                "howToUseVideoUz": "Custom `Dataset` va `collate_fn` funksiyalarini o'z ma'lumotlaringizga moslab yozib ko'ring."
            }
        ],
        "quiz": [
            {
                "id": "d05-2-q1",
                "promptUz": "1. Konseptual: PyTorch `Dataset` klassini yaratishda qaysi ikkita metodni (`dunder methods`) majburiy yozish shart?",
                "options": [
                    "`__init__` va `__del__`",
                    "`__len__` (dataset uzunligi) va `__getitem__` (indeks bo'yicha bitta namunani olish)",
                    "`__add__` va `__mul__`",
                    "`__enter__` va `__exit__`"
                ],
                "correctIndex": 1,
                "explanationUz": "`DataLoader` jami elementlar sonini bilish uchun `__len__` ni va har bir indeksni o'qish uchun `__getitem__` ni chaqiradi."
            },
            {
                "id": "d05-2-q2",
                "promptUz": "2. Kod Tahlili: GPU (`cuda:0`) dagi va `requires_grad=True` bo'lgan `t` tensorni NumPy massivga o'tkazishning to'g'ri kodi qaysi?",
                "options": [
                    "`t.numpy()`",
                    "`t.detach().cpu().numpy()`",
                    "`np.array(t)`",
                    "`t.cuda().numpy()`"
                ],
                "correctIndex": 1,
                "explanationUz": "NumPy faqat CPU RAMda va autograd grafidan uzilgan tensorlar bilan ishlay oladi, shuning uchun `.detach().cpu().numpy()` zanjiri majburiy."
            },
            {
                "id": "d05-2-q3",
                "promptUz": "3. Production Debugging: Training loop ichida `running_loss += loss` deb yozilishi natijasida VRAM to'lib qoldi. Qanday tuzatiladi?",
                "options": [
                    "`running_loss += loss.item()` deb yozish kerak, shunda butun autograd grafi xotirada osilib qolmasdan faqat Python float soni qo'shiladi",
                    "`running_loss = 0` qilib qo'yish kerak",
                    "GPU ni o'chirish kerak",
                    "Loss funksiyasini olib tashlash kerak"
                ],
                "correctIndex": 0,
                "explanationUz": "`.item()` tensordan oddiy skalyar Python sonini ajratib oladi va autograd hisoblash grafini xotiradan bo'shatishga ruxsat beradi."
            }
        ]
    },
    "D05.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: PyTorch Training Loop'ning Muqaddas 5 Qadami",
                "explanationUz": "Har bir PyTorch modelini o'qitish sikli (Training Loop) qat'iy 5 ta qadamdan iborat: 1) `optimizer.zero_grad()` — oldingi batchdan qolgan gradientlarni tozalash (aks holda `+=` bo'lib qo'shilib ketadi!); 2) `logits = model(xb)` — Forward pass; 3) `loss = criterion(logits, yb)` — xatoni hisoblash; 4) `loss.backward()` — Backpropagation orqali barcha `param.grad` larni hisoblash; 5) `optimizer.step()` — og'irliklarni yangilash ($W \\leftarrow W - \\eta \\cdot \\text{grad}$).",
                "codeExample": "training_five_steps = [\n    ('1. optimizer.zero_grad()', 'Eski gradient buferlarini 0 ga tozalash (set_to_none=True tezroq)'),\n    ('2. preds = model(xb)',     'Forward pass: kirishdan bashorat olish'),\n    ('3. loss = criterion(preds, yb)', 'Loss hisoblash (CrossEntropy / MSE)'),\n    ('4. loss.backward()',       'Autograd orqali barcha dL/dW gradientlarini hisoblash'),\n    ('5. optimizer.step()',      'AdamW / SGD orqali og\\'irliklarni yangilash'),\n]\nfor code_line, explanation in training_five_steps:\n    print(f'{code_line:32} -> {explanation}')",
                "outputOrNoteUz": "Natija: Agar 1-qadam (`zero_grad()`) unutilsa, gradientlar batchdan batchga yig'ilib ketib, qadam yo'nalishi butunlay buziladi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: `model.train()` vs `model.eval()` va `torch.no_grad()`",
                "explanationUz": "Ko'pchilik `model.eval()` va `with torch.no_grad():` ni bir xil narsa deb o'ylaydi — bu intervyudagi klassik tuzoq! **`model.eval()`** qatlamlarning xulq-atvorini o'zgartiradi: **Dropout** o'chiriladi (barcha neyronlar ishlaydi) va **BatchNorm** joriy batch statistikasini emas, balki o'qitish vaqtida yig'ilgan `running_mean` / `running_var` ni ishlatadi. **`with torch.no_grad():`** esa Autograd dvigatelini o'chirib, VRAM xotirani tejaydi va tezlikni 2x oshiradi. Validatsiya va inferensda **IKKALASI HAM** birga ishlatilishi shart!",
                "codeExample": "import numpy as np\n\n# Dropout(p=0.5) ning Train va Eval rejimdagi farqi (Inverted Dropout):\nx = np.array([2.0, 4.0, 6.0, 8.0])\nmask = np.array([1.0, 0.0, 1.0, 0.0]) # 50% neyron o'chirildi\n\ntrain_out = (x * mask) / (1.0 - 0.5)  # Train: qolganlari 1/(1-p) = 2x ga ko'paytiriladi!\neval_out  = x                         # Eval: Dropout o'chiq, x o'ziday o'tadi\nprint('Train Dropout chiqishi:', train_out, '| Yig\\'indi:', train_out.sum())\nprint('Eval  rejimi  chiqishi:', eval_out,  '| Yig\\'indi:', eval_out.sum())",
                "outputOrNoteUz": "Natija: Train va Eval rejimlarida kutilgan yig'indi (`20.0`) bir xil chiqishi uchun Train vaqtida omon qolgan neyronlar $\\frac{1}{1-p}$ ga bo'linadi (**Inverted Dropout**)."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Checkpoint Saqlash (`state_dict`) va Early Stopping",
                "explanationUz": "Modelni saqlashda `torch.save(model, 'full.pt')` (pickle) emas, balki faqat og'irliklar lug'atini `torch.save({'model_state_dict': model.state_dict(), 'optimizer_state_dict': opt.state_dict(), 'val_loss': best_loss}, 'best_ckpt.pt')` ko'rinishida saqlash standart hisoblanadi. Har epoxada `val_loss` tekshirilib, faqat yangi rekord o'rnatilgandagina `best_ckpt.pt` yangilanadi.",
                "codeExample": "val_losses = [0.65, 0.48, 0.39, 0.41, 0.44, 0.47]\nbest_loss = float('inf')\npatience, bad_epochs = 2, 0\n\nfor epoch, vl in enumerate(val_losses, start=1):\n    if vl < best_loss:\n        best_loss = vl\n        bad_epochs = 0\n        print(f'Epoxa {epoch}: val_loss={vl:.2f} -> YANGI REKORD! best_ckpt.pt saqlandi.')\n    else:\n        bad_epochs += 1\n        print(f'Epoxa {epoch}: val_loss={vl:.2f} -> Yaxshilanmadi ({bad_epochs}/{patience})')\n        if bad_epochs >= patience:\n            print(f'EARLY STOPPING! Eng yaxshi model (val_loss={best_loss:.2f}) qayta yuklandi.')\n            break",
                "outputOrNoteUz": "Natija: 3-epoxada eng yaxshi `0.39` natija saqlandi, 4 va 5-epoxalarda overfitting boshlangani uchun Early Stopping o'qitishni o'z vaqtida to'xtatdi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: 2 Qatlamli MLP (Multi-Layer Perceptron) Forward va Backward NumPy'da",
                "scenarioUz": "Yashirin qatlamli (`Input -> Linear -> ReLU -> Linear -> Output`) MLP tarmog'ining XOR-ga o'xshash no-chiziqli masalani yechishini ko'rish.",
                "howToUseUz": "Kodni ishga tushiring.",
                "code": "import numpy as np\n\nnp.random.seed(42)\nX = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=np.float64)\ny = np.array([[0],   [1],   [1],   [0]],   dtype=np.float64) # XOR masalasi!\n\nW1 = np.random.randn(2, 8) * 0.5\nb1 = np.zeros((1, 8))\nW2 = np.random.randn(8, 1) * 0.5\nb2 = np.zeros((1, 1))\nlr = 0.1\n\nfor _ in range(800):\n    # Forward\n    z1 = X @ W1 + b1\n    h1 = np.maximum(0, z1) # ReLU\n    out = h1 @ W2 + b2\n    # Backward\n    dout = 2.0 * (out - y) / len(X)\n    dW2 = h1.T @ dout\n    db2 = dout.sum(axis=0, keepdims=True)\n    dh1 = dout @ W2.T\n    dz1 = dh1 * (z1 > 0)\n    dW1 = X.T @ dz1\n    db1 = dz1.sum(axis=0, keepdims=True)\n    W1 -= lr * dW1; b1 -= lr * db1; W2 -= lr * dW2; b2 -= lr * db2\n\nprint('XOR Haqiqiy javoblar:', y.ravel().tolist())\nprint('MLP Bashoratlari:    ', np.round(out.ravel(), 3).tolist())",
                "expectedOutput": "XOR Haqiqiy javoblar: [0.0, 1.0, 1.0, 0.0]\nMLP Bashoratlari:     [0.0, 1.0, 1.0, 0.0]",
                "breakdownUz": "Bitta chiziqli qatlam hech qachon yecha olmaydigan XOR masalasini 8 neyronli ReLU yashirin qatlamiga ega MLP 100% aniqlikda yechdi!"
            },
            {
                "titleUz": "2-misol: AdamW vs SGD Optimizatori (Momentum + Adaptive LR + Weight Decay)",
                "scenarioUz": "Nima uchun Transformer va MLP larda oddiy SGD o'rniga `AdamW` standart ekanligini tushunish.",
                "howToUseUz": "Momentum (1-moment `m`) va RMSProp (2-moment `v`) qanday ishlashini ko'ring.",
                "code": "w = 5.0\nm, v = 0.0, 0.0\nbeta1, beta2, lr, eps, wd = 0.9, 0.999, 0.5, 1e-8, 0.01\n\nfor t in range(1, 6):\n    grad = 2.0 * w  # L(w) = w^2\n    m = beta1 * m + (1 - beta1) * grad\n    v = beta2 * v + (1 - beta2) * (grad ** 2)\n    m_hat = m / (1 - beta1 ** t)\n    v_hat = v / (1 - beta2 ** t)\n    # AdamW: decoupled weight decay + adaptive step\n    w = w * (1 - lr * wd) - lr * m_hat / (v_hat ** 0.5 + eps)\n    print(f'Qadam {t}: grad={grad:6.2f} -> yangi w={w:6.3f}')",
                "expectedOutput": "Qadam 1: grad= 10.00 -> yangi w= 4.475\n...",
                "breakdownUz": "`AdamW` har bir parametr uchun alohida adaptiv qadam o'lchamini (`m_hat / sqrt(v_hat)`) hisoblaydi va L2 weight decay'ni gradientdan ajratilgan holda (`w * (1 - lr * wd)`) to'g'ri qo'llaydi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "model.train() vs model.eval()",
                "category": "Deep Learning & NLP",
                "definitionUz": "PyTorch modulidagi Dropout va BatchNorm qatlamlarini o'qitish (stoxastik) yoki baholash/inferens (deterministik) rejimiga o'tkazuvchi bayroq.",
                "analogyOrExampleUz": "Futbol jamoasining mashg'ulot rejimi (train — og'ir yuklama va rotatsiya bilan) hamda rasmiy final o'yini rejimi (eval — barcha eng kuchli tarkib to'liq kuchda).",
                "connectedTo": [
                    {
                        "targetTerm": "Deterministic RAG & LLM Inference",
                        "targetLessonId": "D06.3",
                        "relationshipUz": "6-haftada GPT va BERT modellaridan bashorat olishdan oldin `model.eval()` chaqirilmasa, Dropout yoqiq qolib har safar har xil tasodifiy javob chiqaveradi!"
                    }
                ]
            },
            {
                "term": "AdamW (Adaptive Moment Estimation with Decoupled Weight Decay)",
                "category": "Deep Learning & NLP",
                "definitionUz": "Gradientning inersiyasi (1-moment, Momentum) va o'zgaruvchanligini (2-moment, RMSProp) hisobga oluvchi hamda og'irlik so'nishini (Weight Decay) adaptiv maxrajdan mustaqil qo'llovchi optimizator.",
                "analogyOrExampleUz": "Tog'dan tushayotgan og'ir shar: ham oldingi tezlik inersiyasini saqlaydi (`m`), ham tik qiyaliklarda tezlikni avtomatik tormozlaydi (`v`).",
                "connectedTo": [
                    {
                        "targetTerm": "QLoRA LLM Fine-Tuning (`paged_adamw_8bit`)",
                        "targetLessonId": "D08.4",
                        "relationshipUz": "8-haftada LLM'ni QLoRA bilan o'qitishda VRAM tejash uchun aynan `AdamW` ning 8-bit kvantlangan versiyasi (`paged_adamw_8bit`) ishlatiladi."
                    }
                ]
            },
            {
                "term": "state_dict & Checkpointing",
                "category": "Deep Learning & NLP",
                "definitionUz": "Modelning barcha qatlamlari (`weight`, `bias`, `running_mean`) va optimizator holatlarini Python lug'ati (`OrderedDict`) sifatida saqlash va qayta yuklash.",
                "analogyOrExampleUz": "Video o'yinda qiyin bosqichdan oldin 'Save Game' qilish — elektr o'chib qolsa ham aynan o'sha joydan davom ettirish mumkin.",
                "connectedTo": [
                    {
                        "targetTerm": "HuggingFace Safetensors & LoRA Adapters",
                        "targetLessonId": "D06.4",
                        "relationshipUz": "6 va 8-haftalarda HuggingFace modellari va LoRA adapterlari aynan `state_dict` tensorlarini xavfsiz `model.safetensors` fayliga yozadi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d05-3-int-1",
                "level": "Junior",
                "questionUz": "Inferens (test) vaqtida `with torch.no_grad():` yozdim, lekin `model.eval()` yozishni unutibman. Model bashoratida qanday muammo bo'ladi?",
                "interviewerIntentUz": "`no_grad()` va `eval()` ning bir-birini o'rnini bosmasligini bilishini tekshirish.",
                "strongAnswerUz": "`torch.no_grad()` faqat gradient hisoblashni o'chiradi, ammo modelni `train` rejimidan chiqarmaydi! Natijada: 1) **Dropout** qatlamlari faol qolib, inferens vaqtida ham neyronlarning bir qismini tasodifiy o'chirib turadi — bir xil kirishga har safar har xil javob chiqadi; 2) **BatchNorm** qatlamlari global o'rganilgan statistika o'rniga joriy test batchning mean/std sini ishlatib bashoratni buzadi (agar batch_size=1 bo'lsa xato beradi). Shu sababli inferensda ham `model.eval()`, ham `with torch.no_grad():` yozish shart.",
                "redFlagUz": "'`torch.no_grad()` o'zi avtomatik `model.eval()` qilib qo'yadi' deyish.",
                "followUpQuestionUz": "Savol: Validatsiya tugab keyingi training epoxasiga o'tganda nimani unutmaslik kerak? Javob: Qaytadan `model.train()` ni chaqirishni!"
            },
            {
                "id": "d05-3-int-2",
                "level": "Middle",
                "questionUz": "PyTorch'ning `nn.CrossEntropyLoss()` funksiyasidan oldin modelning oxirgi qatlamiga `nn.Softmax()` qo'yish to'g'rimi?",
                "interviewerIntentUz": "PyTorch'dagi eng keng tarqalgan arxitektura xatosini (Double Softmax) bilishini sinash.",
                "strongAnswerUz": "Yo'q, bu juda qo'pol xato! PyTorch'dagi `nn.CrossEntropyLoss()` kapot ostida o'zi `nn.LogSoftmax()` va `nn.NLLLoss()` ni birlashtirgan holda ishlaydi va kirish sifatida xom **logits** ($[-\\infty, +\\infty]$) kutadi. Agar model oxiriga ham `Softmax` qo'yilsa, `Softmax` ikki marta qo'llaniladi (Double Softmax), natijada ehtimolliklar tekislanib, gradientlar juda kichrayib ketadi va model sekin yoki noto'g'ri o'qiydi.",
                "redFlagUz": "'Ha, CrossEntropy ehtimollik kutgani uchun oxirgi qatlamga Softmax qo'yish shart' deyish.",
                "followUpQuestionUz": "Savol: U holda inferens paytida foydalanuvchiga $[0, 1]$ ehtimollik ko'rsatish uchun nima qilinadi? Javob: Modelning o'zi xom `logits` qaytaraveradi, faqat inferens post-processing bosqichida `probs = torch.softmax(logits, dim=-1)` chaqiriladi."
            },
            {
                "id": "d05-3-int-3",
                "level": "Senior / Production",
                "questionUz": "O'qitish jarayoni 50-epoxada server uzilishi sababli to'xtab qoldi. Faqat `model.state_dict()` saqlangan ekan. Uni yuklab 51-epoxadan davom ettirganda Loss birdaniga sakrab ketdi. Nima unutilgan?",
                "interviewerIntentUz": "Stateful optimizatorlar (`AdamW`) va LR scheduler checkpointing tajribasini sinash.",
                "strongAnswerUz": "`AdamW` — **stateful** (holat saqlovchi) optimizator bo'lib, u har bir parametr uchun `exp_avg` (1-moment $m_t$) va `exp_avg_sq` (2-moment $v_t$) buferlarini saqlab boradi. Agar faqat model og'irliklari yuklanib, `optimizer.state_dict()` va `lr_scheduler.state_dict()` yuklanmasa, `AdamW` momentlarni `0` dan va boshlang'ich katta learning rate'dan boshlaydi — bu esa 50 epoxa davomida nozik sozlangan og'irliklarni birinchi qadamdayoq buzib yuboradi (loss spike). To'liq resume uchun `model`, `optimizer`, `scheduler`, `epoch` va `scaler` (AMP) holatlari bitta checkpoint lug'atida saqlanishi shart.",
                "redFlagUz": "'Model og'irliklari bo'lsa yetarli, optimizatorning o'z xotirasi bo'lmaydi' deyish.",
                "followUpQuestionUz": "Savol: `AdamW` o'qitish vaqtida model og'irliklariga nisbatan qancha qo'shimcha VRAM talab qiladi? Javob: Har bir parametr uchun 2 ta float32 holat ($m$ va $v$) hamda 1 ta gradient saqlagani uchun model og'irliklarining o'zidan 2-3 barobar ko'proq VRAM iste'mol qiladi!"
            }
        ],
        "videos": [
            {
                "id": "vid-d05-3-en",
                "title": "The spelled-out intro to neural networks and backpropagation: MLP Training Loop",
                "channel": "Andrej Karpathy",
                "language": "en",
                "youtubeId": "VMj-3S1tku0",
                "youtubeUrl": "https://www.youtube.com/watch?v=VMj-3S1tku0",
                "durationOrTimestamp": "01:15:00 MLP & zero_grad bo'limi",
                "whatItExplainsUz": "Karpathy `Neuron`, `Layer`, `MLP` klasslarini qurib, training loop ichida `zero_grad()` unutilganda qanday bug chiqishini jonli ko'rsatib beradi.",
                "howToUseVideoUz": "Videoning 01:15:00 qismidagi training loop'ni yuqoridagi 1-amaliy misoldagi XOR MLP kodi bilan solishtirib ishga tushiring."
            },
            {
                "id": "vid-d05-3-ru",
                "title": "Градиентный спуск и обучение нейросетей",
                "channel": "machine learrrning",
                "language": "ru",
                "youtubeId": "cGKYKla_xSk",
                "youtubeUrl": "https://www.youtube.com/watch?v=cGKYKla_xSk",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "Neyron tarmoqni epoxalar bo'yicha o'qitish, learning rate va optimizatorlarning Loss grafigiga ta'siri tushuntirilgan.",
                "howToUseVideoUz": "XOR MLP kodida `lr = 0.1` ni `0.001` va `2.0` ga o'zgartirib, 800 epoxadagi natijani kuzating."
            }
        ],
        "quiz": [
            {
                "id": "d05-3-q1",
                "promptUz": "1. Konseptual: PyTorch training loop'da har bir batch boshida `optimizer.zero_grad()` chaqirilmasa nima sodir bo'ladi?",
                "options": [
                    "Model tezroq o'qiydi",
                    "Yangi batch gradientlari oldingi batchlardan qolgan gradientlar ustiga qo'shilib (`+=`) ketadi va og'irliklar noto'g'ri yangilanadi",
                    "Xotira tozalanadi",
                    "Hech narsa o'zgarmaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "PyTorch `.backward()` default holatda gradientlarni `+=` qilib yig'adi, shuning uchun har bir step oldidan `zero_grad()` shart."
            },
            {
                "id": "d05-3-q2",
                "promptUz": "2. Kod Tahlili: PyTorch'da `nn.CrossEntropyLoss()` funksiyasi modeldan qanday chiqish kutadi?",
                "options": [
                    "Softmax qo'llangan [0, 1] ehtimolliklarni",
                    "Xom logits (Softmax qo'llanmagan chiziqli qatlam chiqishi) va butun sonli klass indekslarini",
                    "Faqat matnli satrlarni",
                    "Sigmoid chiqishini"
                ],
                "correctIndex": 1,
                "explanationUz": "`nn.CrossEntropyLoss` ichida `LogSoftmax` allaqachon mavjud, shuning uchun unga xom logits uzatiladi."
            },
            {
                "id": "d05-3-q3",
                "promptUz": "3. Production Debugging: Modelni validatsiya va inferens qilishda qaysi ikkita buyruq birgalikda ishlatilishi shart?",
                "options": [
                    "`model.train()` va `loss.backward()`",
                    "`model.eval()` (Dropout/BatchNorm'ni inferens rejimiga o'tkazish) va `with torch.no_grad():` (autograd xotirasini o'chirish)",
                    "Faqat `optimizer.step()`",
                    "Faqat `zero_grad()`"
                ],
                "correctIndex": 1,
                "explanationUz": "`model.eval()` qatlamlarning stoxastik xulqini o'chiradi, `torch.no_grad()` esa VRAM va hisoblash vaqtini tejaydi."
            }
        ]
    },
    "D05.4": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Nima Uchun Rasmlarda Oddiy MLP O'rniga CNN Ishlatiladi?",
                "explanationUz": "Agar $224 \\times 224 \\times 3$ o'lchamli oddiy rasmni tekislab (`150,528` piksel) 1000 neyronli MLP qatlamiga ulasak, BITTA qatlamning o'zida **150 millionta parametr** paydo bo'ladi, fazoviy qo'shnichilik (spatial locality) yo'qoladi va mushuk rasmning burchagiga siljisa MLP uni tanimay qoladi! **CNN (Convolutional Neural Network)** esa kichik $3 \\times 3$ filtrni (kernel) butun rasm bo'ylab sirg'antirib (**Weight Sharing** va **Translation Invariance**), atigi bir necha yuz parametr bilan qirralar, shakllar va obyektlarni istalgan joyda taniydi.",
                "codeExample": "img_pixels = 224 * 224 * 3\nmlp_first_layer_params = img_pixels * 1000\n# Conv2d(in_channels=3, out_channels=32, kernel_size=3): 3 * 3 * 3 * 32 + 32 bias\ncnn_first_layer_params = (3 * 3 * 3) * 32 + 32\n\nprint(f'MLP 1-qatlam parametrlari: {mlp_first_layer_params:>12,}')\nprint(f'CNN 1-qatlam parametrlari: {cnn_first_layer_params:>12,} (174,000 barobar kam!)')",
                "outputOrNoteUz": "Natija: MLP 150.5 million parametr talab qilsa, 32 ta filtrli Conv2d qatlami atigi `896` ta parametr bilan ishlaydi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: 2D Konvolyutsiya Matematikasi va Chiqish O'lchami Formulasi",
                "explanationUz": "Kiruvchi rasm o'lchami $W$, filtr o'lchami $K$ (`kernel_size`), chetiga qo'shilgan nollar $P$ (`padding`) va qadam kattaligi $S$ (`stride`) bo'lganda, chiqish xaritasi (Feature Map) o'lchami: $O = \\lfloor \\frac{W - K + 2P}{S} \\rfloor + 1$ formula bilan topiladi. Masalan, $K=3, P=1, S=1$ (**Same Padding**) bo'lganda rasm o'lchami o'zgarmaydi ($O = W$). `MaxPool2d(2, 2)` esa har $2 \\times 2$ katakdan eng kuchli signalni olib, o'lchamni 2 barobar kichraytiradi.",
                "codeExample": "def conv_output_size(w: int, kernel: int, padding: int = 0, stride: int = 1) -> int:\n    return ((w - kernel + 2 * padding) // stride) + 1\n\nprint('224x224 rasm, K=3, P=1, S=1 (Same): ', conv_output_size(224, 3, padding=1, stride=1))\nprint('224x224 rasm, K=3, P=0, S=1 (Valid):', conv_output_size(224, 3, padding=0, stride=1))\nprint('224x224 rasm, K=3, P=1, S=2 (Down): ', conv_output_size(224, 3, padding=1, stride=2))",
                "outputOrNoteUz": "Natija: `Same -> 224`, `Valid -> 222`, `Stride=2 -> 112`. Intervyuda ushbu formulani yoddan bilish talab etiladi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Transfer Learning va Data Augmentation",
                "explanationUz": "Real loyihada 1,000 ta rentgen yoki mahsulot rasmi bilan CNN'ni noldan (from scratch) o'qitish overfittingga olib keladi. Buning o'rniga ImageNet'ning 1.2 million rasmida o'qitilgan **Pre-trained Backbone** (`ResNet50`, `EfficientNet`, `ConvNeXt`) olinadi, uning dastlabki qatlamlari muzlatilib (`param.requires_grad = False`), faqat oxirgi klassifikatsiya boshi (`fc` / `head`) o'zimizning klasslar soniga almashtirib o'qitiladi (**Transfer Learning**).",
                "codeExample": "# 2D Konvolyutsiya (Sobel vertikal qirra aniqlash filtri) NumPy'da:\nimport numpy as np\n\nimage = np.array([\n    [10, 10, 200, 200],\n    [10, 10, 200, 200],\n    [10, 10, 200, 200],\n    [10, 10, 200, 200]\n], dtype=np.float32) # Chap tomoni qorong'u (10), o'ng tomoni yorug' (200)\n\nvertical_edge_kernel = np.array([\n    [-1, 0, 1],\n    [-2, 0, 2],\n    [-1, 0, 1]\n], dtype=np.float32)\n\nout = np.zeros((2, 2))\nfor i in range(2):\n    for j in range(2):\n        out[i, j] = np.sum(image[i:i+3, j:j+3] * vertical_edge_kernel)\nprint('Sobel filtri topgan vertikal chegara qiymatlari:\\n', out)",
                "outputOrNoteUz": "Natija: `[[760, 760], [760, 760]]`. Filtr qorong'u va yorug' tutashgan vertikal chegarada kuchli `760` impuls berdi!"
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Conv2d Parametrlar Soni va Receptive Field Kalkulyatori",
                "scenarioUz": "Arxitektura loyihalashda har bir konvolyutsiya qatlamining parametrlar sonini (`(K_h * K_w * C_in + 1) * C_out`) aniq hisoblash.",
                "howToUseUz": "Kodni ishga tushiring.",
                "code": "def count_conv2d_params(c_in: int, c_out: int, k: int, use_bias: bool = True) -> int:\n    weights = c_in * (k * k) * c_out\n    biases = c_out if use_bias else 0\n    return weights + biases\n\n# Agar Conv2d dan keyin BatchNorm2d tursa, use_bias=False qilinadi!\nprint('Conv2d(3, 64, k=3, bias=True): ', count_conv2d_params(3, 64, 3, True))\nprint('Conv2d(64, 128, k=3, bias=False):', count_conv2d_params(64, 128, 3, False))\nprint('1x1 Bottleneck Conv2d(128, 32, k=1):', count_conv2d_params(128, 32, 1, False))",
                "expectedOutput": "Conv2d(3, 64, k=3, bias=True):  1792\nConv2d(64, 128, k=3, bias=False): 73728\n1x1 Bottleneck Conv2d(128, 32, k=1): 4096",
                "breakdownUz": "`1x1` konvolyutsiya (`k=1`) kanallar sonini `128` dan `32` ga tushirib (bottleneck), keyingi `3x3` qatlam parametrlarini 4-16 barobar kamaytiradi!"
            },
            {
                "titleUz": "2-misol: Global Average Pooling (GAP) vs Flatten",
                "scenarioUz": "CNN oxirida `(Batch, 512, 7, 7)` xaritani `Flatten` (`25,088` uzunlik) qilish o'rniga `Global Average Pooling` (`(Batch, 512)`) orqali parametrlar sonini 50x qisqartirish.",
                "howToUseUz": "GAP va Flatten parametrlar farqini hisoblang.",
                "code": "import numpy as np\n\nfeature_map = np.random.randn(2, 512, 7, 7) # (Batch=2, Channels=512, H=7, W=7)\nnum_classes = 10\n\nflatten_dim = 512 * 7 * 7\ngap_output = feature_map.mean(axis=(2, 3)) # Har bir 7x7 kanalning o'rtachasi -> (2, 512)\n\nprint(f'Flatten -> Linear(10) parametrlari: {flatten_dim * num_classes:,}')\nprint(f'GAP     -> Linear(10) parametrlari: {gap_output.shape[1] * num_classes:,} | GAP shape: {gap_output.shape}')",
                "expectedOutput": "Flatten -> Linear(10) parametrlari: 250,880\nGAP     -> Linear(10) parametrlari: 5,120 | GAP shape: (2, 512)",
                "breakdownUz": "ResNet va zamonaviy CNN'larda `AdaptiveAvgPool2d((1, 1))` (GAP) ishlatilishi ham overfittingni kamaytiradi, ham istalgan rasm o'lchamini qabul qilish imkonini beradi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Convolution, Weight Sharing & Translation Invariance",
                "category": "Deep Learning & NLP",
                "definitionUz": "Bitta kichik o'rganiluvchi filtrni (`kernel`) kiruvchi fazo bo'ylab sirg'antirib, lokal belgilarni joylashuvidan qat'i nazar aniqlash mexanizmi.",
                "analogyOrExampleUz": "Qorong'u xonani bitta kichik fonar nuri bilan kvadratma-kvadrat skanerlash — har bir burchak uchun alohida fonar yasash shart emas.",
                "connectedTo": [
                    {
                        "targetTerm": "1D Convolution in Audio & Text / Vision Transformers (Patch Embedding)",
                        "targetLessonId": "D06.2",
                        "relationshipUz": "Vision Transformer (ViT) va Multimodal LLM'larda ham rasmni 16x16 patch tokenlarga bo'lish aynan `Conv2d(3, embed_dim, kernel_size=16, stride=16)` orqali bajariladi!"
                    }
                ]
            },
            {
                "term": "BatchNorm & Residual (Skip) Connections",
                "category": "Deep Learning & NLP",
                "definitionUz": "BatchNorm — qatlam aktivatsiyalarini barqarorlashtiruvchi normalizatsiya; Residual Connection (`y = F(x) + x`) — 50-150 qatlamli tarmoqlarda gradient so'nishini bartaraf etuvchi aylanma ko'prik.",
                "analogyOrExampleUz": "Shahar ichidagi tirband ko'chalardan (`F(x)`) tashqari to'g'ridan-to'g'ri tezurar ko'prik (`+ x`) qurish.",
                "connectedTo": [
                    {
                        "targetTerm": "LayerNorm & Residual Stream in GPT",
                        "targetLessonId": "D06.3",
                        "relationshipUz": "6-haftada GPT blokida CNN'dagi `BatchNorm` o'rniga token darajasida ishlovchi `LayerNorm` (yoki `RMSNorm`) va xuddi shu Residual Connection ishlatiladi."
                    }
                ]
            },
            {
                "term": "Transfer Learning & Feature Extraction",
                "category": "Deep Learning & NLP",
                "definitionUz": "Katta umumiy datasetda o'qitilgan modelning tayyor vizual yoki lingvistik bilimlaridan kichik maxsus datasetda qayta foydalanish.",
                "analogyOrExampleUz": "Velosiped haydashni biladigan odamning mototsikl haydashni noldan emas, muvozanat ko'nikmasiga tayanib 2 kunda o'rganib olishi.",
                "connectedTo": [
                    {
                        "targetTerm": "BERT Fine-Tuning & LLM QLoRA",
                        "targetLessonId": "D06.4",
                        "relationshipUz": "6-haftada o'zbekcha matnlar uchun XLM-RoBERTa'ni va 8-haftada LLM'ni QLoRA bilan moslashtirish aynan Transfer Learning'ning NLP dagi ko'rinishidir."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d05-4-int-1",
                "level": "Junior",
                "questionUz": "`Conv2d(in_channels=3, out_channels=16, kernel_size=3, bias=True)` qatlamida jami nechta o'qitiladigan (trainable) parametr bor?",
                "interviewerIntentUz": "3D filtr hajmini (kirish kanallari bilan birga) to'g'ri hisoblay olishini tekshirish.",
                "strongAnswerUz": "Har bir filtr 2D ($3 \\times 3$) emas, balki kirish kanallari chuqurligini ham qamrab olgan 3D ($3 \\times 3 \\times 3 = 27$ ta og'irlik) bo'ladi! Bunday filtrdan `out_channels = 16` ta bor: $27 \\times 16 = 432$ ta og'irlik. Har bir chiqish kanaliga 1 tadan `bias` qo'shiladi (`+16`). Jami: $432 + 16 = 448$ ta parametr.",
                "redFlagUz": "`3 * 3 * 16 = 144` deb `in_channels=3` ga ko'paytirishni va `bias` qo'shishni unutish.",
                "followUpQuestionUz": "Savol: Nima uchun `Conv2d` dan keyin darhol `BatchNorm2d` tursa, `Conv2d(..., bias=False)` qilinadi? Javob: Chunki `BatchNorm` birinchi qadamdayoq kanal o'rtachasini ayirib tashlaydi (`x - mean`), shuning uchun `Conv2d` qo'shgan `bias` butunlay qisqarib ketadi va `BatchNorm` ning o'zida $\\beta$ shift parametri mavjud."
            },
            {
                "id": "d05-4-int-2",
                "level": "Middle",
                "questionUz": "`1x1` Konvolyutsiya (`kernel_size=1`) qo'shni piksellarga qaramasa, uning CNN (ResNet, Inception) ichida nima foydasi bor?",
                "interviewerIntentUz": "Pointwise convolution va channel projection/bottleneck mohiyatini tushunishini sinash.",
                "strongAnswerUz": "`1x1` konvolyutsiya fazoviy ($H \\times W$) o'lcham bo'ylab emas, balki **kanallar ($C$) o'qi bo'ylab** chiziqli kombinatsiya va aktivatsiya bajaradi: 1) **Bottleneck (Hisoblashni kamaytirish)**: og'ir `3x3` konvolyutsiyadan oldin kanallar sonini masalan `256` dan `64` ga tushirib, FLOPs va parametrlarni 4-10 barobar qisqartiradi; 2) Kanallararo ma'lumot almashinuvini (cross-channel pooling) va qo'shimcha ReLU no-chiziqliligini beradi.",
                "redFlagUz": "'1x1 konvolyutsiya shunchaki rasmni o'ziga ko'paytiradi, hech narsa qilmaydi' deyish.",
                "followUpQuestionUz": "Savol: Ikki marta ketma-ket `3x3` konvolyutsiya qo'llash bitta `5x5` konvolyutsiyadan nimasi bilan ustun? Javob: Ikkalasining ham Receptive Field (ko'rish maydoni) $5 \\times 5$ ga teng, ammo ikkita `3x3` qatlam kamroq parametr oladi ($2 \\times 3^2 = 18 < 5^2 = 25$) va orada 2 marta ReLU no-chiziqliligini beradi!"
            },
            {
                "id": "d05-4-int-3",
                "level": "Senior / Production",
                "questionUz": "Data Augmentation (RandomFlip, ColorJitter, CutMix) ni Train va Validation/Test datasetlariga qanday qo'llaysiz? Kichik datasetda Transfer Learning qilayotganda `BatchNorm` qatlamlari bilan bog'liq qanday nozik muammo bor?",
                "interviewerIntentUz": "Computer Vision production pipeline va Transfer Learning ichki mexanizmini sinash.",
                "strongAnswerUz": "1) Tasodifiy augmentatsiyalar (`RandomHorizontalFlip`, `RandomCrop`, `ColorJitter`) FAQAT `Train` datasetiga qo'llaniladi; `Val` va `Test` datasetlariga esa faqat deterministik `Resize` + `CenterCrop` + `Normalize(imagenet_mean, imagenet_std)` qo'llaniladi. 2) Transfer Learning'da backbone og'irliklarini `requires_grad=False` qilib muzlatsak ham, agar `model.train()` chaqirilsa, muzlatilgan backbone ichidagi `BatchNorm2d` qatlamlari o'zining `running_mean` va `running_var` statistikalarini bizning kichik batchlarimiz bilan yangilab buzib qo'yadi! Shu sababli muzlatilgan backbone qismidagi `BatchNorm` qatlamlarini `.eval()` rejimida qulflab qo'yish shart.",
                "redFlagUz": "'Test rasmlarini ham RandomFlip va RandomRotation qilib tekshiraman' deyish.",
                "followUpQuestionUz": "Savol: Tibbiy rentgen yoki sun'iy yo'ldosh rasmlarida qaysi augmentatsiya xavfli bo'lishi mumkin? Javob: `RandomVerticalFlip` (yurak o'ng tomonga o'tib qolishi) yoki chetni kesib tashlovchi kuchli `RandomCrop` (o'simta chetda bo'lsa kesilib ketib label noto'g'ri bo'lib qolishi)."
            }
        ],
        "videos": [
            {
                "id": "vid-d05-4-en",
                "title": "Backpropagation & Neural Network Layers Visually Explained",
                "channel": "AssemblyAI",
                "language": "en",
                "youtubeId": "LHLrXavT1gQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=LHLrXavT1gQ",
                "durationOrTimestamp": "Vizual qatlamlar tahlili",
                "whatItExplainsUz": "Qatlamlar bo'ylab filtrlar va og'irliklarning qanday yangilanishi hamda fazoviy belgilar ajratib olinishi ko'rsatilgan.",
                "howToUseVideoUz": "Yuqoridagi 3-bosqich Sobel filtri kodida `vertical_edge_kernel` ni transpozitsiya (`kernel.T`) qilib, gorizontal qirralarni qanday topishini sinab ko'ring."
            },
            {
                "id": "vid-d05-4-uz",
                "title": "Algoritmlar va Ma'lumot Tuzilmalari — Matritsalar va Qidiruv",
                "channel": "Azim Pulat",
                "language": "uz",
                "youtubeId": "WqrbIUggEXQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=WqrbIUggEXQ",
                "durationOrTimestamp": "2D massivlar bo'limi",
                "whatItExplainsUz": "Ikki o'lchamli matritsalar ustida oyna (sliding window) yurgizib hisoblash algoritmlari o'zbek tilida tushuntirilgan.",
                "howToUseVideoUz": "2D konvolyutsiya ichidagi `image[i:i+3, j:j+3]` oyna harakatini tahlil qiling."
            }
        ],
        "quiz": [
            {
                "id": "d05-4-q1",
                "promptUz": "1. Konseptual: Rasmlar bilan ishlashda oddiy MLP (`Linear`) qatlamidan ko'ra CNN (`Conv2d`) ning asosiy ustunligi nimada?",
                "options": [
                    "CNN faqat oq-qora rasmlarda ishlaydi",
                    "Weight Sharing (bitta kichik filtrni butun rasm bo'ylab ishlatish) orqali parametrlar sonini minglab marta kamaytiradi va fazoviy joylashuvni saqlaydi",
                    "CNN umuman xotira ishlatmaydi",
                    "CNN gradient hisoblamaydi"
                ],
                "correctIndex": 1,
                "explanationUz": "Kichik $3\\times 3$ filtr butun rasm bo'ylab sirg'angani uchun obyekt rasmning qayerida turishidan qat'i nazar kam parametr bilan aniqlanadi."
            },
            {
                "id": "d05-4-q2",
                "promptUz": "2. Kod Tahlili: $32 \\times 32$ o'lchamli rasmga `kernel_size=3, padding=1, stride=1` bo'lgan `Conv2d` qo'llansa, chiqish balandligi va eni nechaga teng bo'ladi?",
                "options": [
                    "30 x 30",
                    "32 x 32 (chunki (32 - 3 + 2*1)/1 + 1 = 32, ya'ni Same Padding)",
                    "16 x 16",
                    "64 x 64"
                ],
                "correctIndex": 1,
                "explanationUz": "$K=3, P=1, S=1$ kombinatsiyasi fazoviy o'lchamni aynan o'ziday ($32 \\times 32$) saqlab qoladi."
            },
            {
                "id": "d05-4-q3",
                "promptUz": "3. Production Debugging: Kichik (800 ta rasmli) maxsus datasetda yuqori aniqlikka erishish uchun qaysi yondashuv eng samarali?",
                "options": [
                    "100 qatlamli CNN'ni noldan (from scratch) tasodifiy og'irliklar bilan o'qitish",
                    "Transfer Learning: ImageNet'da o'qitilgan ResNet/EfficientNet backbone'ini olib, oxirgi head qatlamini fine-tune qilish va Train'ga Data Augmentation qo'shish",
                    "Rasmlarni 1x1 pikselga kichraytirish",
                    "Test to'plamini Train'ga qo'shib yuborish"
                ],
                "correctIndex": 1,
                "explanationUz": "Pre-trained model qirralar, teksturalar va shakllarni allaqachon bilgani uchun 800 ta rasmda ham tez va yuqori sifatda moslashadi."
            }
        ]
    }
}
