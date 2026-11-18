/**
 * 31 Domain Profiles for ML & Data Science Academy (520 Micro-Lessons)
 * Each profile contains authentic terminology, visual pipeline steps,
 * runnable code generators (using NumPy, Pandas, Scikit-learn, PyTorch, SciPy, etc.),
 * realistic developer mistakes, and practical unit-tested tasks.
 */

export const ML_PHASE_DOMAINS = {
  1: {
    tool: "Python / ML Workflow",
    domainTitle: "AI va ML Kasblari, Shaxsiy Yo‘l va Workflow",
    terms: "Supervised Learning, Unsupervised Learning, Feature, Label, Training vs Inference, Overfitting, Data Pipeline",
    visualSteps: [
      { step: 1, label: "Muammoni Aniqlash", detail: "Biznes maqsadni ML vazifasiga (Regressiya / Klassifikatsiya) aylantirish" },
      { step: 2, label: "Ma'lumotlar Quvuri", detail: "Datasetni to'plash, tozalash va Feature/Label larni ajratish" },
      { step: 3, label: "Modelni O'qitish", detail: "Train to'plamida o'qitish va Validation da baholash" },
      { step: 4, label: "Ishlab Chiqarish (Deploy)", detail: "Modelni API xizmat sifatida joylashtirish va monitoring" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — ML Masalasini Tasniflovchi (Problem Framing) Mantiq`,
      explanationUz: "ML muhandisi dastlab muammoni to'g'ri turga ajratishi lozim: uzluksiz qiymat bashorati -> Regressiya; diskret toifa -> Klassifikatsiya.",
      code: `def frame_ml_problem(target_type: str, has_labels: bool) -> dict:\n    if not has_labels:\n        return {"paradigm": "Unsupervised Learning", "task": "Clustering / Dimension Reduction"}\n    if target_type == "continuous":\n        return {"paradigm": "Supervised Learning", "task": "Regression", "metrics": ["MSE", "MAE", "R2"]}\n    return {"paradigm": "Supervised Learning", "task": "Classification", "metrics": ["Accuracy", "F1-Score", "ROC-AUC"]}\n\nprint("Uy narxini bashorat qilish:", frame_ml_problem("continuous", True))\nprint("Mijozlarni guruhlash:", frame_ml_problem("unknown", False))`,
      expectedOutput: "Uy narxini bashorat qilish: {'paradigm': 'Supervised Learning', 'task': 'Regression', 'metrics': ['MSE', 'MAE', 'R2']}\nMijozlarni guruhlash: {'paradigm': 'Unsupervised Learning', 'task': 'Clustering / Dimension Reduction'}"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Train / Test Split Qat'iy Chegara Mantiqi`,
      explanationUz: "Data Leakage ning oldini olish uchun ma'lumotlar modeli ko'rishidan oldin qat'iy ravishda Train va Test qismlariga ajratiladi.",
      code: `def simple_train_test_split(data: list, test_ratio: float = 0.2) -> tuple[list, list]:\n    split_idx = int(len(data) * (1.0 - test_ratio))\n    train = data[:split_idx]\n    test = data[split_idx:]\n    return train, test\n\ndataset = [f"sample_{i}" for i in range(10)]\ntrain_set, test_set = simple_train_test_split(dataset, 0.2)\nprint(f"Jami: {len(dataset)} | Train: {len(train_set)} ta | Test: {len(test_set)} ta")`,
      expectedOutput: "Jami: 10 | Train: 8 ta | Test: 2 ta"
    }),
    mistakes: (t) => [
      {
        mistakeUz: `${t} da Train va Test to'plamlarini aralashtirib yuborish (Data Leakage)`,
        symptomUz: "Model test paytida 99% aniqlik ko'rsatadi, lekin yangi ishlab chiqarish ma'lumotlarida qulaydi.",
        correctionUz: "Har qanday normallashtirish va statistik hisoblarni faqat Train to'plami asosida bajaring."
      },
      {
        mistakeUz: "Muammo turini noto'g'ri tanlash (masalan, toifalash masalasiga MSE qo'llash)",
        symptomUz: "Model chegaralari noaniq bo'lib, ehtimolliklar o'rniga ma'nosiz sonlar hosil bo'ladi.",
        correctionUz: "Toifali javoblar uchun Cross-Entropy yoki Log-Loss xatolik funksiyalaridan foydalaning."
      }
    ]
  },

  2: {
    tool: "Python",
    domainTitle: "Python: Ma'lumotlar Tahlili Poydevori",
    terms: "List Comprehension, Generator, Lambda, Typing, Dataclasses, Memory Efficiency",
    visualSteps: [
      { step: 1, label: "Xom Ma'lumot", detail: "Lug'at yoki ro'yxat ko'rinishidagi ma'lumotlar" },
      { step: 2, label: "Comprehension & Filter", detail: "Xotirada tezkor massiv transformatsiyasi" },
      { step: 3, label: "Generator Oqimi", detail: "Katta hajmli fayllarni qatorma-qator (Lazy) o'qish" },
      { step: 4, label: "Strukturalangan Obekt", detail: "Validatsiya qilingan DataClass shaklida saqlash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Xususiyatlarni Comprehension Orqali Qayta Ishlash`,
      explanationUz: "Ma'lumotlar to'plamidagi raqamli xususiyatlarni bir satrda tozalash va masshtablash.",
      code: `raw_features = [" 12.5 ", "25.0", " 8.2 ", "invalid", "100.1"]\n\ndef clean_and_parse(features: list[str]) -> list[float]:\n    cleaned = []\n    for f in features:\n        try:\n            cleaned.append(float(f.strip()))\n        except ValueError:\n            continue\n    return cleaned\n\nclean_vals = clean_and_parse(raw_features)\nprint("Tozalangan xususiyatlar:", clean_vals)`,
      expectedOutput: "Tozalangan xususiyatlar: [12.5, 25.0, 8.2, 100.1]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Xotirani Tejamkor Generator Bilan Oqimli O'qish`,
      explanationUz: "Millionlab satrli fayllarni butunlay RAM ga yuklamasdan generator (yield) yordamida o'qish.",
      code: `def batch_generator(data_list: list, batch_size: int = 2):\n    for i in range(0, len(data_list), batch_size):\n        yield data_list[i:i + batch_size]\n\nsamples = [10, 20, 30, 40, 50]\ngen = batch_generator(samples, batch_size=2)\nprint("1-partiya:", next(gen))\nprint("2-partiya:", next(gen))`,
      expectedOutput: "1-partiya: [10, 20]\n2-partiya: [30, 40]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Katta ro'yxatlarni birlashtirishda `+` operatorini takroriy chaqirish",
        symptomUz: "Python har safar yangi xotira ajratgani sababli dastur O(N^2) ga sekinlashadi.",
        correctionUz: "`list.append()` yoki `extend()` metodidan, yoki generatorlardan foydalaning."
      },
      {
        mistakeUz: "O'zgaruvchan (Mutable) qiymatlarni funksiyada default argument qilib qo'yish (`def f(x=[])`)",
        symptomUz: "Funksiya chaqiruvlari orasida ma'lumotlar yig'ilib qolib, g'alati noaniq xatoliklar beradi.",
        correctionUz: "Har doim `def f(x: list | None = None): if x is None: x = []` andozasini qo'llang."
      }
    ]
  },

  3: {
    tool: "SQL",
    domainTitle: "SQL va Ma'lumotlar Tuzilmalari",
    terms: "SELECT, JOIN (Inner, Left, Cross), GROUP BY, Window Functions, Hashing, Time Complexity O(1) vs O(N)",
    visualSteps: [
      { step: 1, label: "Xom Jadvallar", detail: "Foydalanuvchilar va Tranzaksiyalar jadvallari" },
      { step: 2, label: "JOIN Mantiqi", detail: "Primary va Foreign Key lar orqali jadvallarni birlashtirish" },
      { step: 3, label: "Agregatsiya", detail: "GROUP BY va SUM/AVG orqali ko'rsatkichlarni hisoblash" },
      { step: 4, label: "Tahliliy Natija", detail: "ML modeli uchun xususiyatlar (features) matritsasi" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — SQL GROUP BY va Agregatsiyaning Python Simulyatsiyasi`,
      explanationUz: "SQL dagi `SELECT category, AVG(price) FROM products GROUP BY category` mantiqining Python xotirasidagi algoritmi.",
      code: `sales_records = [\n    {"category": "elektronika", "price": 100.0},\n    {"category": "kitob", "price": 15.0},\n    {"category": "elektronika", "price": 200.0},\n    {"category": "kitob", "price": 25.0}\n]\n\ndef group_by_average(records: list[dict], group_key: str, val_key: str) -> dict[str, float]:\n    totals = {}\n    counts = {}\n    for r in records:\n        k = r[group_key]\n        totals[k] = totals.get(k, 0.0) + r[val_key]\n        counts[k] = counts.get(k, 0) + 1\n    return {k: round(totals[k] / counts[k], 2) for k in totals}\n\nprint("Kategoriyalar bo'yicha o'rtacha narx:", group_by_average(sales_records, "category", "price"))`,
      expectedOutput: "Kategoriyalar bo'yicha o'rtacha narx: {'elektronika': 150.0, 'kitob': 20.0}"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Hash Table Lookup (O(1)) vs Linear Search (O(N))`,
      explanationUz: "Katta ma'lumotlar bilan ishlaganda to'g'ri indekslangan hash jadvali qidiruv tezligini minglab marta oshiradi.",
      code: `user_index = {"user_1": {"name": "Ali", "balance": 500}, "user_2": {"name": "Vali", "balance": 1200}}\n\ndef get_user_fast(user_id: str) -> dict | None:\n    return user_index.get(user_id)  # O(1) qidiruv\n\nprint("Qidiruv natijasi:", get_user_fast("user_2")["name"])`,
      expectedOutput: "Qidiruv natijasi: Vali"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "LEFT JOIN da o'ng jadvaldagi NULL qiymatlarni hisobga olmaslik",
        symptomUz: "Matematik amallarda NULL (None) qo'shilganda butun ustun qiymati xato bo'lib chiqadi.",
        correctionUz: "SQL da `COALESCE(val, 0)` dan, Python da esa `val or 0` dan foydalaning."
      },
      {
        mistakeUz: "Katta jadvallarda indekslarsiz (Unindexed) qidiruv va birlashtirish qilish",
        symptomUz: "So'rov bajarilishi bir necha soniyadan daqiqalarga cho'zilib ketadi.",
        correctionUz: "Qidirilayotgan va JOIN qilinadigan ustunlarga B-Tree indekslarini qo'ying."
      }
    ]
  },

  4: {
    tool: "NumPy",
    domainTitle: "NumPy: Ko‘p O‘lchamli Massivlar va Vektorlashtirish",
    terms: "ndarray, Vectorization, Broadcasting, Strides, Slicing, Boolean Masking, np.axis",
    visualSteps: [
      { step: 1, label: "1D/2D Massiv", detail: "Bir xil turdagi raqamlar xotirada ketma-ket joylashadi" },
      { step: 2, label: "Broadcasting", detail: "Mos keluvchi o'lchamlar bo'ylab avtomatik yoyish" },
      { step: 3, label: "Vektorli Amallar", detail: "C darajasidagi tezkor SIMD parallel hisoblash" },
      { step: 4, label: "Filtrlangan Natija", detail: "Boolean mask orqali shartga mos indekslarni olish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Vektorlashtirilgan Hisoblash (Vectorization)`,
      explanationUz: "NumPy da sikllarsiz elementma-element hisoblash C tilida bajarilib, sof Python siklidan 50 baravar tez ishlaydi.",
      code: `import numpy as np\n\nx = np.array([10.0, 20.0, 30.0, 40.0])\ny = np.array([1.0, 2.0, 3.0, 4.0])\n\n# Vektorlashtirilgan ayirma va kvadrat\nresiduals = x - y\nsquared_residuals = residuals ** 2\nprint("Qoldiqlar:", residuals)\nprint("Kvadratlar:", squared_residuals)`,
      expectedOutput: "Qoldiqlar: [ 9. 18. 27. 36.]\nKvadratlar: [  81.  324.  729. 1296.]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Boolean Masking bilan Ma'lumotlarni Filtrlash`,
      explanationUz: "Mantiqiy shartlar yordamida massivdan chegaradan katta bo'lgan qiymatlarni bir amalda tanlab olish.",
      code: `import numpy as np\n\nscores = np.array([55, 88, 92, 45, 78, 60])\nmask = scores >= 70\npassing_scores = scores[mask]\nprint("Imtihondan o'tgan ballar (>=70):", passing_scores)`,
      expectedOutput: "Imtihondan o'tgan ballar (>=70): [88 92 78]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "NumPy massivlari ustida Python `for` sikli orqali aylanish",
        symptomUz: "Katta ma'lumotlarda dastur juda sekinlashib, NumPy ning barcha afzalligi yo'qoladi.",
        correctionUz: "Har doim vektorlashtirilgan funksiyalar va broadcasting dan foydalaning."
      },
      {
        mistakeUz: "Massiv nusxasi (copy) o'rniga virtual ko'rinish (view) ustida o'zgartirish kiritish",
        symptomUz: "Boshlang'ich massiv qiymatlari ham kutilmaganda o'zgarib ketadi.",
        correctionUz: "Asl ma'lumotni saqlab qolish zarur bo'lsa, `.copy()` metodini chaqiring."
      }
    ]
  },

  5: {
    tool: "Pandas",
    domainTitle: "Pandas: Ma'lumotlar Manipulyatsiyasi va Wrangling",
    terms: "Series, DataFrame, Index, GroupBy, Merge, Concat, Pivot Table, Missing Values (NaN)",
    visualSteps: [
      { step: 1, label: "DataFrame Yuklash", detail: "Jadvalli ma'lumotlar strukturasini xotiraga olish" },
      { step: 2, label: "Ustun Manipulyatsiyasi", detail: "Yangi xususiyatlar yaratish va tiplarni to'g'rilash" },
      { step: 3, label: "GroupBy Agregatsiya", detail: "Kategoriyalar bo'yicha jamlash (Mean, Sum, Count)" },
      { step: 4, label: "Pivot / Toza Jadval", detail: "Modelga uzatish uchun qulay formatga keltirish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — DataFrame Yaratish va Yangi Ustun Hisoblash`,
      explanationUz: "Pandas DataFrame orqali xususiyatlarni elementma-element vektorli amallar bilan yangilash.",
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    "mahsulot": ["A", "B", "C"],\n    "narx": [100.0, 250.0, 50.0],\n    "miqdor": [2, 1, 4]\n})\n\ndf["jami_qiymat"] = df["narx"] * df["miqdor"]\nprint(df[["mahsulot", "jami_qiymat"]])`,
      expectedOutput: "  mahsulot  jami_qiymat\n0        A        200.0\n1        B        250.0\n2        C        200.0"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — GroupBy va Ko'p O'lchamli Agregatsiya`,
      explanationUz: "Bir vaqtning o'zida har bir guruh uchun o'rtacha qiymat va elementlar sonini hisoblash.",
      code: `import pandas as pd\n\ndf = pd.DataFrame({\n    "shahar": ["Toshkent", "Samarqand", "Toshkent", "Buxoro"],\n    "sotuv": [120, 80, 150, 95]\n})\n\nagg_df = df.groupby("shahar")["sotuv"].agg(["count", "mean"]).reset_index()\nprint(agg_df)`,
      expectedOutput: "       shahar  count   mean\n0      Buxoro      1   95.0\n1   Samarqand      1   80.0\n2    Toshkent      2  135.0"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "DataFrame ustida `iterrows()` bilan sikl yozish",
        symptomUz: "Ma'lumotlar hajmi oshganda script soatlab vaqt talab qiladi.",
        correctionUz: "Vektorlashtirilgan ustun amallari yoki `.apply()` dan foydalaning."
      },
      {
        mistakeUz: "`SettingWithCopyWarning` ogohlantirishini e'tiborsiz qoldirish",
        symptomUz: "Filtrlangan qismga kiritilgan o'zgarishlar asosiy DataFrame ga ta'sir qilmay qoladi.",
        correctionUz: "Filtrlangandan so'ng aniq `.copy()` qiling yoki `.loc[row, col] = val` orqali yozing."
      }
    ]
  },

  6: {
    tool: "Data Ingestion",
    domainTitle: "Data Ingestion: Ma'lumotlarni Yig‘ish va Oqimlar",
    terms: "CSV, Parquet, JSON, Chunking, PyArrow, Schema Inference, Memory Management",
    visualSteps: [
      { step: 1, label: "Fayl Manbasi", detail: "CSV, Parquet yoki JSON formatidagi fayllar" },
      { step: 2, label: "Bo'laklab O'qish (Chunk)", detail: "RAM chegarasidan oshmaslik uchun 10,000 satrlab o'qish" },
      { step: 3, label: "Sxemani Fikslash", detail: "Tiplarni to'g'ri (float32, int16) belgilab xotirani tejash" },
      { step: 4, label: "Ingestion Quvuri", detail: "Tozalangan ma'lumotlarni ML bazasiga yo'naltirish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Parquet va CSV Formatlarining Xotira Tahlili Simulyatsiyasi`,
      explanationUz: "Parquet ustunli (columnar) siqish texnologiyasi hisobiga CSV dan 4-5 baravar kamroq xotira egallaydi va tezroq o'qiladi.",
      code: `def compare_storage_efficiency(rows: int, cols: int) -> dict:\n    raw_csv_kb = (rows * cols * 8) / 1024\n    parquet_kb = raw_csv_kb * 0.22  # Siqish koeffitsienti\n    return {"csv_kb": round(raw_csv_kb, 1), "parquet_kb": round(parquet_kb, 1), "savings_percent": 78.0}\n\nprint("100,000 satrli dataset xotirasi:", compare_storage_efficiency(100_000, 10))`,
      expectedOutput: "100,000 satrli dataset xotirasi: {'csv_kb': 7812.5, 'parquet_kb': 1718.8, 'savings_percent': 78.0}"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Katta CSV Fayllarni Bo'laklab (Chunksize) Qayta Ishlash`,
      explanationUz: "Hajmi RAM dan katta bo'lgan ma'lumotlarni kompyuterni qotirmasdan bo'laklab o'qish andozasi.",
      code: `def process_in_chunks(records: list, chunk_size: int = 3) -> list[int]:\n    totals = []\n    for i in range(0, len(records), chunk_size):\n        chunk = records[i:i + chunk_size]\n        totals.append(sum(chunk))\n    return totals\n\nsamples = [1, 2, 3, 4, 5, 6, 7, 8]\nprint("Har bir bo'lak yig'indisi:", process_in_chunks(samples, chunk_size=3))`,
      expectedOutput: "Har bir bo'lak yig'indisi: [6, 15, 15]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "10 GB li CSV faylni to'g'ridan-to'g'ri `pd.read_csv()` bilan ochishga urinish",
        symptomUz: "Tizimda MemoryError yuz beradi va operatsion tizim dasturni o'ldiradi.",
        correctionUz: "`pd.read_csv(filename, chunksize=10000)` yoki Parquet/DuckDB dan foydalaning."
      },
      {
        mistakeUz: "Kategorik ustunlarni standart 64-bit matn (`object`) formatida saqlash",
        symptomUz: "Xotira keraksiz ravishda 5 baravar ko'p band bo'ladi.",
        correctionUz: "Takrorlanuvchi matn ustunlarini `df[col] = df[col].astype('category')` ga o'giring."
      }
    ]
  },

  7: {
    tool: "Data Cleaning",
    domainTitle: "Data Cleaning va Tayyorlash",
    terms: "Missing Values, Mean/Median Imputation, Outlier Detection, IQR (Interquartile Range), Z-Score, Deduplication",
    visualSteps: [
      { step: 1, label: "Kamchiliklarni Topish", detail: "NaN, null va bo'sh qiymatlarni aniqlash" },
      { step: 2, label: "Imputatsiya", detail: "Median yoki o'rtacha qiymat bilan bo'sh o'rinlarni to'ldirish" },
      { step: 3, label: "Outlierlarni Saralash", detail: "IQR qoidasi bo'yicha anomaliyalarni kesish" },
      { step: 4, label: "Toza Dataset", detail: "Modelga tayyor, to'liq va tekshirilgan ma'lumotlar" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — IQR (Interquartile Range) Outlier Detektori`,
      explanationUz: "Ma'lumotlar tarqoqligi asosida $Q_1 - 1.5 \\times \\text{IQR}$ va $Q_3 + 1.5 \\times \\text{IQR}$ chegaralaridan tashqaridagi anomaliyalarni topish.",
      code: `import numpy as np\n\ndef detect_iqr_outliers(data: list[float]) -> dict:\n    q1 = np.percentile(data, 25)\n    q3 = np.percentile(data, 75)\n    iqr = q3 - q1\n    lower_bound = round(q1 - 1.5 * iqr, 2)\n    upper_bound = round(q3 + 1.5 * iqr, 2)\n    outliers = [x for x in data if x < lower_bound or x > upper_bound]\n    return {"q1": q1, "q3": q3, "bounds": (lower_bound, upper_bound), "outliers": outliers}\n\nvals = [10, 12, 11, 14, 13, 12, 95, 11, 13, -40]\nres = detect_iqr_outliers(vals)\nprint("Aniqlandigan chekka qiymatlar (Outliers):", res["outliers"])`,
      expectedOutput: "Aniqlandigan chekka qiymatlar (Outliers): [95, -40]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Yetishmaydigan Qiymatlarni Median Bilan To'ldirish (Imputation)`,
      explanationUz: "Outlierlar mavjud bo'lganda o'rtacha arifmetik qiymat (mean) siljib ketadi, shuning uchun median bilan to'ldirish xavfsizroqdir.",
      code: `def impute_median(values: list[float | None]) -> list[float]:\n    valid_nums = sorted([x for x in values if x is not None])\n    n = len(valid_nums)\n    median = valid_nums[n // 2] if n % 2 != 0 else (valid_nums[n//2 - 1] + valid_nums[n//2]) / 2.0\n    return [round(x if x is not None else median, 2) for x in values]\n\nraw_data = [10.0, None, 20.0, 30.0, None]\nprint("To'ldirilgan massiv:", impute_median(raw_data))`,
      expectedOutput: "To'ldirilgan massiv: [10.0, 20.0, 20.0, 30.0, 20.0]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Outlierlar ko'p bo'lgan ustunni oddiy o'rtacha (Mean) bilan to'ldirish",
        symptomUz: "To'ldirilgan qiymatlar sun'iy ravishda ko'tarilib, model xatoligi ortadi.",
        correctionUz: "Qiya (skewed) taqsimotlarda har doim Median imputationdan foydalaning."
      },
      {
        mistakeUz: "Yetishmaydigan satrlarni o'ylab ko'rmasdan shunchaki `.dropna()` bilan o'chirib yuborish",
        symptomUz: "Dataset hajmi 40-50% ga kamayib ketadi va muhim namunalar yo'qotiladi.",
        correctionUz: "Avval NaN ulushini tekshiring, agar 10% dan kam bo'lsa to'ldiring, 60% dan ko'p bo'lsa ustunni olib tashlang."
      }
    ]
  },

  8: {
    tool: "EDA / Stats",
    domainTitle: "Exploratory Data Analysis (EDA) va Statistik Tahlil",
    terms: "Pearson Correlation, Skewness, Kurtosis, Heatmap, Scatter Matrix, Box Plot, Distribution Analysis",
    visualSteps: [
      { step: 1, label: "Taqsimotni Ko'rish", detail: "Gistogramma orqali ma'lumotlar simmetriyasini o'rganish" },
      { step: 2, label: "Asimmetriya (Skewness)", detail: "O'ngga yoki chapga cho'zilgan dumlar mavjudligini aniqlash" },
      { step: 3, label: "Korrelyatsiya Matritsasi", detail: "Xususiyatlar orasidagi bog'liqlikni (-1 dan +1 gacha) hisoblash" },
      { step: 4, label: "Multikollinearlikni Yo'qotish", detail: "Bir-birini takrorlovchi ortiqcha ustunlarni chiqarib tashlash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Pearson Korrelyatsiya Koeffitsientini Hisoblash`,
      explanationUz: "Ikki o'zgaruvchi orasidagi chiziqli bog'liqlik darajasini $-1.0$ (teskari) dan $+1.0$ (to'g'ri) gacha baholash.",
      code: `import math\n\ndef pearson_correlation(x: list[float], y: list[float]) -> float:\n    n = len(x)\n    mean_x = sum(x) / n\n    mean_y = sum(y) / n\n    num = sum((a - mean_x) * (b - mean_y) for a, b in zip(x, y))\n    den = math.sqrt(sum((a - mean_x)**2 for a in x) * sum((b - mean_y)**2 for b in y))\n    if den == 0:\n        return 0.0\n    return round(num / den, 4)\n\nfeature_a = [1.0, 2.0, 3.0, 4.0, 5.0]\nfeature_b = [2.1, 4.0, 5.9, 8.1, 9.9]\nprint("Korrelyatsiya koeffitsienti:", pearson_correlation(feature_a, feature_b))`,
      expectedOutput: "Korrelyatsiya koeffitsienti: 0.9997"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Statistik Taqsimot Metrikalari (Mean, Std, Skewness)`,
      explanationUz: "Ma'lumotlar normal taqsimotga yaqinligini bilish uchun o'rtacha kvadratik og'ish va asimmetriyani hisoblash.",
      code: `import math\n\ndef calculate_distribution_stats(vals: list[float]) -> dict:\n    n = len(vals)\n    mean = sum(vals) / n\n    variance = sum((x - mean)**2 for x in vals) / (n - 1)\n    std_dev = math.sqrt(variance)\n    # Oddiy skewness baholash\n    skew = (sum((x - mean)**3 for x in vals) / n) / (std_dev**3) if std_dev > 0 else 0.0\n    return {"mean": round(mean, 2), "std": round(std_dev, 2), "skewness": round(skew, 2)}\n\nprint("Taqsimot parametrlari:", calculate_distribution_stats([10, 11, 12, 10, 11, 25]))`,
      expectedOutput: "Taqsimot parametrlari: {'mean': 13.17, 'std': 5.85, 'skewness': 1.63}"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Korrelyatsiya borligidan to'g'ridan-to'g'ri sabab-oqibat (Causation) xulosasini chiqarish",
        symptomUz: "Model tasodifiy korrelyatsiyaga (Spurious correlation) tayanib, noto'g'ri bashorat qila boshlaydi.",
        correctionUz: "Har doim gipotezalarni A/B testlari yoki domen bilimi orqali tasdiqlang."
      },
      {
        mistakeUz: "Kuchli multikollinearlik (r > 0.95) mavjud ikkita ustunni chiziqli modelda birga ishlatish",
        symptomUz: "Model koeffitsientlari beqaror bo'lib qoladi va p-value ko'rsatkichlari buziladi.",
        correctionUz: "Bir-biriga o'xshash xususiyatlardan bittasini qoldiring yoki VIF (Variance Inflation Factor) ni tekshiring."
      }
    ]
  },

  9: {
    tool: "NumPy",
    domainTitle: "Chiziqli Algebra I: Vektorlar va Matritsalar",
    terms: "Dot Product, Matrix Multiplication, Transpose, Vector Norms (L1, L2), Orthogonality, Cosine Distance",
    visualSteps: [
      { step: 1, label: "Vektorlar Fazolari", detail: "N-o'lchamli fazodagi nuqtalar va yo'nalishlar" },
      { step: 2, label: "Skalyar Ko'paytma", detail: "Ikki vektor o'rtasidagi proyeksiyani hisoblash (u · v)" },
      { step: 3, label: "Matritsa Ko'paytmasi", detail: "Chiziqli fazo transformatsiyasi (A @ B)" },
      { step: 4, label: "Norma va Masofa", detail: "Evklid uzunligini aniqlash va normallashtirish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Matritsalar Ko'paytmasi va Transponirlash`,
      explanationUz: "Chiziqli qatlamlar va regressiyada eng ko'p ishlatiladigan $C = A \\times B^T$ amali.",
      code: `import numpy as np\n\nA = np.array([[1, 2], [3, 4]])      # shape: (2, 2)\nB = np.array([[5, 6], [7, 8]])      # shape: (2, 2)\n\nC = np.dot(A, B)\nA_transposed = A.T\nprint("A @ B ko'paytmasi:\\n", C)\nprint("A transponirlangan:\\n", A_transposed)`,
      expectedOutput: "A @ B ko'paytmasi:\n [[19 22]\n [43 50]]\nA transponirlangan:\n [[1 3]\n [2 4]]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — L1 (Manhattan) va L2 (Euclidean) Vektor Normalari`,
      explanationUz: "Modelni regulyarizatsiya qilishda (Lasso va Ridge) qo'llaniladigan vektor uzunliklari hisobi.",
      code: `import numpy as np\n\nv = np.array([3.0, -4.0])\nl1_norm = np.sum(np.abs(v))\nl2_norm = np.linalg.norm(v)\nprint(f"Vektor: {v} | L1 norma: {l1_norm} | L2 norma: {l2_norm}")`,
      expectedOutput: "Vektor: [ 3. -4.] | L1 norma: 7.0 | L2 norma: 5.0"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Matritsalarni ko'paytirishda ichki o'lchamlar tengligini (A.cols == B.rows) tekshirmaslik",
        symptomUz: "ValueError: shapes not aligned xatoligi chiqadi.",
        correctionUz: "Har doim `A.shape[1] == B.shape[0]` shartiga ishonch hosil qiling."
      },
      {
        mistakeUz: "Elementma-element ko'paytirish (`*`) bilan matritsali ko'paytirishni (`@` yoki `np.dot`) chalkashtirish",
        symptomUz: "Hadamard mahsuli hisoblanib, kutilgan chiziqli transformatsiya bajarilmaydi.",
        correctionUz: "Matritsa ko'paytmasi uchun faqat `@` yoki `np.matmul()` dan foydalaning."
      }
    ]
  },

  10: {
    tool: "NumPy / SciPy",
    domainTitle: "Chiziqli Algebra II: Maxsus Matritsalar va Dekompozitsiya",
    terms: "Eigenvalues, Eigenvectors, SVD (Singular Value Decomposition), Determinant, Trace, Covariance Matrix",
    visualSteps: [
      { step: 1, label: "Matritsa Transformatsiyasi", detail: "Fazoni cho'zuvchi va buruvchi chiziqli operator" },
      { step: 2, label: "Xos Yo'nalishlar (Eigen)", detail: "Yo'nalishi o'zgarmasdan faqat cho'ziladigan vektorlar" },
      { step: 3, label: "SVD Dekompozitsiyasi", detail: "Matritsani U, Sigma va V^T ga ajratish" },
      { step: 4, label: "Asosiy Komponentlar", detail: "Eng katta eigenqiymatlar bo'yicha ma'lumotni siqish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Eigenvalues va Eigenvectors Hisoblash`,
      explanationUz: "Matritsaning xos qiymat va xos vektorlarini topish: $A v = \\lambda v$.",
      code: `import numpy as np\n\nA = np.array([[4.0, 1.0], [2.0, 3.0]])\neigenvalues, eigenvectors = np.linalg.eig(A)\nprint("Xos qiymatlar (Eigenvalues):", np.round(eigenvalues, 2))\nprint("1-xos vektor:\\n", np.round(eigenvectors[:, 0], 2))`,
      expectedOutput: "Xos qiymatlar (Eigenvalues): [5. 2.]\n1-xos vektor:\n [0.71 0.71]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — SVD (Singular Value Decomposition) Bilan Matritsani Qayta Tiklash`,
      explanationUz: "Har qanday $M$ matritsani $U \\Sigma V^T$ qismlariga ajratib, past o'lchamli siqish imkoniyati.",
      code: `import numpy as np\n\nX = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])\nU, S, Vt = np.linalg.svd(X, full_matrices=False)\nprint("Singulyar qiymatlar S:", np.round(S, 2))\nprint("U shakli:", U.shape, "| Vt shakli:", Vt.shape)`,
      expectedOutput: "Singulyar qiymatlar S: [9.53 0.51]\nU shakli: (3, 2) | Vt shakli: (2, 2)"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Kvadrat bo'lmagan matritsadan `np.linalg.eig()` chaqirish",
        symptomUz: "LinAlgError: Last 2 dimensions of the array must be square xatosi keladi.",
        correctionUz: "To'g'ri to'rtburchakli matritsalar uchun har doim SVD (`np.linalg.svd`) ishlatiladi."
      },
      {
        mistakeUz: "Determinanti nolga teng bo'lgan matritsani (Singular matrix) teskarilashga urinish",
        symptomUz: "LinAlgError: Singular matrix (teskari matritsa mavjud emas).",
        correctionUz: "Psevdo-teskari matritsani olish uchun `np.linalg.pinv()` dan foydalaning."
      }
    ]
  },

  11: {
    tool: "Calculus",
    domainTitle: "Matematik Analiz va Optimizatsiya (Gradient Descent)",
    terms: "Derivative, Partial Derivative, Gradient Vector, Chain Rule, Learning Rate, Gradient Descent, Convexity",
    visualSteps: [
      { step: 1, label: "Yo'qotish Funksiyasi (Loss)", detail: "Xatolik sathi L(w) balandligini aniqlash" },
      { step: 2, label: "Gradientni Hisoblash", detail: "Har bir parametr bo'yicha eng tik ko'tarilish yo'nalishini topish" },
      { step: 3, label: "Qadam Tashlash (Step)", detail: "O'rganish tezligi (learning rate) bilan teskari yo'nalishda siljish" },
      { step: 4, label: "Minimumga Yetish", detail: "Xatolik minimal bo'lgan nuqtada optimal parametrlarni topish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Sonli Hosila (Numerical Derivative) Hisoblagich`,
      explanationUz: "Markaziy ayirma formulasi orqali hosilani hisoblash: $f'(x) \\approx \\frac{f(x + h) - f(x - h)}{2h}$.",
      code: `def numerical_derivative(f, x: float, h: float = 1e-5) -> float:\n    return round((f(x + h) - f(x - h)) / (2 * h), 4)\n\n# f(x) = x^2 funksiyasining x = 3 dagi hosilasi (kutilgan: 2*3 = 6)\nres = numerical_derivative(lambda x: x**2, 3.0)\nprint("f(x)=x^2 ning x=3 dagi hosilasi:", res)`,
      expectedOutput: "f(x)=x^2 ning x=3 dagi hosilasi: 6.0"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — 1D Gradient Descent Optimizatsiya Qadami`,
      explanationUz: "Parametrni yangilash qoidasi: $w_{\\text{new}} = w_{\\text{old}} - \\alpha \\cdot \\nabla L$.",
      code: `def gradient_descent_step(w: float, learning_rate: float = 0.1) -> float:\n    grad = 2 * w  # L(w) = w^2 ning gradienti\n    return round(w - learning_rate * grad, 4)\n\nw = 5.0\nprint("Boshlang'ich og'irlik:", w)\nfor i in range(3):\n    w = gradient_descent_step(w, 0.1)\n    print(f"Qadam #{i+1}: w = {w}")`,
      expectedOutput: "Boshlang'ich og'irlik: 5.0\nQadam #1: w = 4.0\nQadam #2: w = 3.2\nQadam #3: w = 2.56"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "O'rganish tezligini (Learning Rate) o'ta katta qilib qo'yish",
        symptomUz: "Xatolik kamayish o'rniga cheksizlikka oshib ketadi (Exploding loss / Divergence).",
        correctionUz: "Kichikroq learning rate (0.01, 0.001) tanlang yoki LR Scheduler qo'llang."
      },
      {
        mistakeUz: "Lokal minimumda gradient 0 ga teng bo'lganda optimizatsiyani to'xtatib qo'yish",
        symptomUz: "Model global optimal yechimga yetib bormay, yomon nuqtada qotib qoladi.",
        correctionUz: "Momentum yoki Adam kabi inertsiyali optimizatorlardan foydalaning."
      }
    ]
  },

  12: {
    tool: "Probability",
    domainTitle: "Ehtimollik Nazariyasi",
    terms: "Bayes Theorem, Probability Density Function (PDF), CDF, Expected Value, Variance, Normal Distribution",
    visualSteps: [
      { step: 1, label: "Boshlang'ich Ehtimollik (Prior)", detail: "Hodisa yuz berishi haqidagi dastlabki ma'lumot" },
      { step: 2, label: "Kuzatuv (Likelihood)", detail: "Yangi dalilning kuzatilish ehtimoli P(B|A)" },
      { step: 3, label: "Bayes Formulani Qo'llash", detail: "Prior va Likelihood ni birlashtirish" },
      { step: 4, label: "Yangilangan Ehtimollik (Posterior)", detail: "Dalil asosida yangi ishonch darajasini hisoblash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Bayes Teoremasi Hisoblagichi`,
      explanationUz: "Formula: $P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$.",
      code: `def bayes_posterior(prior_a: float, likelihood_b_given_a: float, prob_b: float) -> float:\n    if prob_b == 0:\n        return 0.0\n    return round((likelihood_b_given_a * prior_a) / prob_b, 4)\n\n# Masalan kasallik ehtimoli (prior=0.01), test aniqligi (0.95), test musbat chiqish ehtimoli (0.05)\nposterior = bayes_posterior(0.01, 0.95, 0.05)\nprint("Test musbat chiqqanda kasal bo'lish ehtimoli:", posterior)`,
      expectedOutput: "Test musbat chiqqanda kasal bo'lish ehtimoli: 0.19"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Diskret Tasodifiy Miqdorning Matematik Kutilmasi (Expected Value)`,
      explanationUz: "Kutilma: $E[X] = \\sum x_i \\cdot P(x_i)$.",
      code: `def calculate_expected_value(values: list[float], probabilities: list[float]) -> float:\n    return round(sum(x * p for x, p in zip(values, probabilities)), 2)\n\nvals = [10.0, 20.0, 50.0]\nprobs = [0.5, 0.3, 0.2]  # yig'indisi 1.0\nprint("Matematik kutilma E[X]:", calculate_expected_value(vals, probs))`,
      expectedOutput: "Matematik kutilma E[X]: 21.0"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Ehtimolliklar yig'indisi 1.0 ga teng emasligini e'tibordan chetda qoldirish",
        symptomUz: "Hisoblangan ehtimolliklar 1 dan katta bo'lib ketadi va mantiqiy xato beradi.",
        correctionUz: "Har doim ehtimollik vektorini Softmax yoki `sum(p)` ga bo'lish orqali normallashtiring."
      },
      {
        mistakeUz: "Shartli ehtimollik $P(A|B)$ bilan birgalikdagi ehtimollik $P(A \\cap B)$ ni adashtirish",
        symptomUz: "Klassifikator bashorat qilgan ehtimollik ko'rsatkichi noto'g'ri interpretatsiya qilinadi.",
        correctionUz: "Doimo qaysi hodisa shart (berilgan) ekanligini ajratib oling."
      }
    ]
  },

  13: {
    tool: "Statistics",
    domainTitle: "Matematik Statistika va Xulosalar",
    terms: "Central Limit Theorem (CLT), Hypothesis Testing (H0 vs H1), p-value, t-test, Z-score, Confidence Interval",
    visualSteps: [
      { step: 1, label: "Nol Gipoteza (H0)", detail: "O'zgarishlar faqat tasodif ekanligini taxmin qilish" },
      { step: 2, label: "Test Statistikasi", detail: "Namuna o'rtachasi va dispersiyasidan T/Z statistikani topish" },
      { step: 3, label: "p-value Aniqlash", detail: "Nol gipoteza to'g'ri bo'lganda bunday natija chiqish ehtimoli" },
      { step: 4, label: "Qaror Qabul Qilish", detail: "p < 0.05 bo'lsa H0 rad etiladi va yangi metod g'olib deb topiladi" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Ikki Namunali T-Statistikani Hisoblash`,
      explanationUz: "Formula: $t = \\frac{\\bar{X}_1 - \\bar{X}_2}{\\sqrt{s_1^2/n_1 + s_2^2/n_2}}$.",
      code: `import math\n\ndef two_sample_t_stat(m1: float, s1: float, n1: int, m2: float, s2: float, n2: int) -> float:\n    se = math.sqrt((s1**2 / n1) + (s2**2 / n2))\n    if se == 0:\n        return 0.0\n    return round((m1 - m2) / se, 4)\n\n# 1-guruh (o'rtacha 55), 2-guruh (o'rtacha 50)\nt_val = two_sample_t_stat(55.0, 5.0, 30, 50.0, 4.0, 30)\nprint("Hisoblangan T-statistika:", t_val)`,
      expectedOutput: "Hisoblangan T-statistika: 4.2762"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — 95% Ishonchlilik Oralig'i (Confidence Interval)`,
      explanationUz: "Standart xato va $Z = 1.96$ koeffitsienti yordamida o'rtacha qiymat oralig'ini topish.",
      code: `import math\n\ndef confidence_interval_95(mean: float, std: float, n: int) -> tuple[float, float]:\n    margin = 1.96 * (std / math.sqrt(n))\n    return (round(mean - margin, 2), round(mean + margin, 2))\n\nci = confidence_interval_95(100.0, 15.0, 100)\nprint("95% Ishonchlilik oralig'i:", ci)`,
      expectedOutput: "95% Ishonchlilik oralig'i: (97.06, 102.94)"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "p-value 0.05 dan kichik bo'lishini effektning kattaligi deb tushunish",
        symptomUz: "Ahamiyatsiz kichik farq (masalan, 0.001%) statistik jihatdan katta yutuq deb noto'g'ri talqin qilinadi.",
        correctionUz: "Doimo p-value bilan birga Effekt Kattaligi (Effect Size / Cohen's d) ni ham o'lchang."
      },
      {
        mistakeUz: "Namuna hajmi kichik bo'lganda (n < 30) Z-test ishlatish",
        symptomUz: "Haqiqiy xatolik ehtimoli kamaytirib ko'rsatiladi.",
        correctionUz: "Kichik namunalarda har doim Student t-taqsimotidan (t-test) foydalaning."
      }
    ]
  },

  14: {
    tool: "A/B Testing",
    domainTitle: "A/B Testlash va Eksperimentlar Dizayni",
    terms: "Conversion Rate, Minimum Detectable Effect (MDE), Statistical Power (1 - Beta), Type I / II Error, Sample Size",
    visualSteps: [
      { step: 1, label: "Guruhlarga Bo'lish", detail: "Foydalanuvchilarni A (Nazorat) va B (Tajriba) ga tasodifiy ajratish" },
      { step: 2, label: "Trafikni Kuzatish", detail: "Har ikkala guruhda konversiyani (CR) qayd etish" },
      { step: 3, label: "Z-Test Tekshiruvi", detail: "Proportsiyalar farqining statistik ahamiyatini o'lchash" },
      { step: 4, label: "Qaror Qabul Qilish", detail: "Yangi xususiyatni barcha mijozlarga chiqarish yoki bekor qilish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Ikki Proportsiyali Z-Test (Conversion Rate)`,
      explanationUz: "A va B guruhlari konversiyalari orasidagi farqning tasodifiy emasligini tekshirish.",
      code: `import math\n\ndef z_test_proportions(clicks_a: int, n_a: int, clicks_b: int, n_b: int) -> dict:\n    p_a = clicks_a / n_a\n    p_b = clicks_b / n_b\n    p_pool = (clicks_a + clicks_b) / (n_a + n_b)\n    se = math.sqrt(p_pool * (1 - p_pool) * (1/n_a + 1/n_b))\n    z_score = round((p_b - p_a) / se, 4) if se > 0 else 0.0\n    return {"cr_a": round(p_a, 4), "cr_b": round(p_b, 4), "z_score": z_score, "significant_95": abs(z_score) > 1.96}\n\nres = z_test_proportions(120, 1000, 160, 1000)\nprint("A/B Natijasi:", res)`,
      expectedOutput: "A/B Natijasi: {'cr_a': 0.12, 'cr_b': 0.16, 'z_score': 2.5198, 'significant_95': True}"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Kerakli Namuna Hajmini (Sample Size) Hisoblash`,
      explanationUz: "Eksperiment ishonchli bo'lishi uchun har bir guruhga kamida qancha foydalanuvchi kerakligini aniqlash.",
      code: `def estimate_sample_size(baseline_p: float, mde: float) -> int:\n    # Sodda qoida: n ≈ 16 * p * (1-p) / mde^2\n    return int(16 * baseline_p * (1 - baseline_p) / (mde ** 2))\n\nneeded = estimate_sample_size(0.10, 0.02)  # 10% dan 12% ga o'sishni aniqlash\nprint("Har bir guruh uchun talab qilinadigan namuna soni:", needed)`,
      expectedOutput: "Har bir guruh uchun talab qilinadigan namuna soni: 3600"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Eksperiment tugamasdan turib natijalarga har kuni qarab, 'p < 0.05 bo'ldi' deb erta to'xtatish (Peeking Problem)",
        symptomUz: "I-tur xatoligi (False Positive) 5% dan 30-40% gacha keskin oshib ketadi.",
        correctionUz: "Namuna hajmi to'liq yig'ilguncha eksperimentni to'xtatmang yoki Sekvensial testlardan foydalaning."
      },
      {
        mistakeUz: "Trafik taqsimotida SRM (Sample Ratio Mismatch) xatosini tekshirmaslik",
        symptomUz: "50/50 rejalashtirilgan trafik 60/40 bo'lib qolib, xulosa butunlay xato chiqadi.",
        correctionUz: "Guruhlar soni mutanosibligini har doim Chi-kvadrat testi bilan tekshiring."
      }
    ]
  },

  15: {
    tool: "A/B Advanced",
    domainTitle: "Kengaytirilgan A/B Testlash va CUPED",
    terms: "CUPED (Controlled-experiment Using Pre-Experiment Data), Covariate, Variance Reduction, Stratification",
    visualSteps: [
      { step: 1, label: "Oldingi Ma'lumot (X)", detail: "Foydalanuvchilarning testdan oldingi faollik ko'rsatkichi" },
      { step: 2, label: "Eksperiment Natijasi (Y)", detail: "Test davridagi xatti-harakatlar o'lchovi" },
      { step: 3, label: "Kovariatsiya Koeffitsienti", detail: "Theta = Cov(Y, X) / Var(X) ni hisoblash" },
      { step: 4, label: "CUPED Metrikasi", detail: "Dispersiyani 30-50% ga qisqartirib, test vaqtini tejash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — CUPED Metrikasi va Dispersiyani Qisqartirish`,
      explanationUz: "Formula: $Y_{\\text{cuped}} = Y - \\theta (X - \\bar{X})$ bu yerda $\\theta = \\frac{\\text{Cov}(Y, X)}{\\text{Var}(X)}$.",
      code: `import numpy as np\n\ndef apply_cuped(y_experiment: np.ndarray, x_pre_experiment: np.ndarray) -> np.ndarray:\n    cov = np.cov(y_experiment, x_pre_experiment)[0, 1]\n    var_x = np.var(x_pre_experiment, ddof=1)\n    theta = cov / var_x if var_x > 0 else 0.0\n    return y_experiment - theta * (x_pre_experiment - np.mean(x_pre_experiment))\n\ny = np.array([12.0, 15.0, 20.0, 14.0, 18.0])\nx = np.array([10.0, 13.0, 19.0, 12.0, 17.0])\ny_cuped = apply_cuped(y, x)\nprint("Boshlang'ich dispersiya:", round(np.var(y), 2))\nprint("CUPED dispersiyasi (qisqargan):", round(np.var(y_cuped), 2))`,
      expectedOutput: "Boshlang'ich dispersiya: 7.76\nCUPED dispersiyasi (qisqargan): 0.22"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Kovariatsiya Orqali Kerakli Vaqtni Qisqartirish Bahosi`,
      explanationUz: "Dispersiya $1 - \\rho^2$ miqdorida qisqarsa, talab qilinadigan namuna va sinov muddati ham shuncha kamayadi.",
      code: `def calculate_sample_reduction_percent(correlation_rho: float) -> float:\n    # Variance reduction ratio = rho^2\n    return round((correlation_rho ** 2) * 100, 1)\n\nprint("Korrelyatsiya r=0.7 bo'lganda tejash foizi:", calculate_sample_reduction_percent(0.7), "%")`,
      expectedOutput: "Korrelyatsiya r=0.7 bo'lganda tejash foizi: 49.0 %"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Kovariata (X) sifatida eksperiment boshlanganidan KEYINGI ma'lumotlarni tanlash",
        symptomUz: "Eksperiment ta'siri kovariataning o'ziga ta'sir qilib, xulosa xato bo'ladi.",
        correctionUz: "X faqat eksperiment boshlanishidan OLDINGI davrga tegishli bo'lishi shart."
      },
      {
        mistakeUz: "Kovariata va eksperiment metrikasi o'rtasida korrelyatsiya yo'qligi",
        symptomUz: "CUPED hech qanday samara bermaydi va dispersiya o'zgarmaydi.",
        correctionUz: "Faqat $\\rho > 0.4$ bo'lgan kuchli bog'langan o'tmish ko'rsatkichlaridan foydalaning."
      }
    ]
  },

  16: {
    tool: "Scikit-learn",
    domainTitle: "Feature Engineering va Preprocessing",
    terms: "One-Hot Encoding, StandardScaler, RobustScaler, SimpleImputer, ColumnTransformer, Pipeline",
    visualSteps: [
      { step: 1, label: "Xom Xususiyatlar", detail: "Raqamli, toifali va yetishmaydigan ustunlar" },
      { step: 2, label: "Transformer Pipeline", detail: "One-Hot encoder va StandardScaler ni ajratish" },
      { step: 3, label: "Fit & Transform", detail: "Faqat Train to'plamida fit qilib, Leakage ni oldini olish" },
      { step: 4, label: "Matritsa", detail: "Modelga to'g'ridan-to'g'ri uzatiladigan toza float massiv" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — StandardScaler Matematik Transformatsiyasi`,
      explanationUz: "Formula: $z = \\frac{x - \\mu}{\\sigma}$. O'rtachani 0 va standart og'ishni 1 ga keltiradi.",
      code: `import numpy as np\n\ndef standard_scale(arr: np.ndarray) -> np.ndarray:\n    mean = np.mean(arr, axis=0)\n    std = np.std(arr, axis=0)\n    std[std == 0] = 1.0  # nolga bo'lish himoyasi\n    return np.round((arr - mean) / std, 3)\n\nX = np.array([[10.0], [20.0], [30.0], [40.0]])\nprint("Masshtablangan X:\\n", standard_scale(X))`,
      expectedOutput: "Masshtablangan X:\n [[-1.342]\n [-0.447]\n [ 0.447]\n [ 1.342]]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Scikit-learn Uslubida One-Hot Encoding`,
      explanationUz: "Toifali matnlarni model tushunadigan ikkilik (0 va 1) ustunlarga aylantirish.",
      code: `def simple_one_hot(categories: list[str]) -> tuple[list[str], list[list[int]]]:\n    unique_cats = sorted(list(set(categories)))\n    encoded = []\n    for c in categories:\n        row = [1 if c == u else 0 for u in unique_cats]\n        encoded.append(row)\n    return unique_cats, encoded\n\ncats, matrix = simple_one_hot(["Toshkent", "Buxoro", "Toshkent", "Samarqand"])\nprint("Unikal toifalar:", cats)\nprint("1-satr kodi:", matrix[0])`,
      expectedOutput: "Unikal toifalar: ['Buxoro', 'Samarqand', 'Toshkent']\n1-satr kodi: [0, 0, 1]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Masshtablashni (Scaling) Train va Test to'plamlarini ajratishdan oldin butun datasetga qo'llash",
        symptomUz: "Test ma'lumotlarining o'rtachasi va dispersiyasi Train ga sizib o'tadi (Data Leakage).",
        correctionUz: "Har doim `scaler.fit(X_train)` qilib, keyin `scaler.transform(X_test)` qiling."
      },
      {
        mistakeUz: "Ko'p unikal qiymatli toifali ustunni (High-cardinality) shunchaki One-Hot qilish",
        symptomUz: "Minglab yangi ustunlar hosil bo'lib xotira to'ladi (Curse of Dimensionality).",
        correctionUz: "Bunday hollarda Target Encoding yoki Frequency Encoding dan foydalaning."
      }
    ]
  },

  17: {
    tool: "Scikit-learn",
    domainTitle: "Regressiya Modellari (Linear, Ridge, Lasso)",
    terms: "Linear Regression, OLS (Ordinary Least Squares), MSE, RMSE, R-squared, L1 Lasso, L2 Ridge Regularization",
    visualSteps: [
      { step: 1, label: "Nuqtalar To'plami", detail: "X va y o'rtasidagi tarqoqlik grafigi" },
      { step: 2, label: "Eng Yaxshi Chiziq", detail: "Qoldiqlar kvadratlari yig'indisini (RSS) minimallashtirish" },
      { step: 3, label: "L1/L2 Regulyarizatsiya", detail: "Og'irliklar kattalashib ketmasligi uchun jazo qo'shish" },
      { step: 4, label: "Bashorat va Baho", detail: "R2 va RMSE orqali model sifatini aniqlash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Chiziqli Regressiya OLS Koeffitsientlari Formulasi`,
      explanationUz: "Formula: $\\beta = (X^T X)^{-1} X^T y$. Analitik minimal kvadratlar yechimi.",
      code: `import numpy as np\n\ndef solve_ols(x: list[float], y: list[float]) -> tuple[float, float]:\n    n = len(x)\n    mx, my = np.mean(x), np.mean(y)\n    slope = np.sum((x - mx) * (y - my)) / np.sum((x - mx)**2)\n    intercept = my - slope * mx\n    return round(float(slope), 2), round(float(intercept), 2)\n\nslope, intercept = solve_ols([1.0, 2.0, 3.0, 4.0], [3.0, 5.0, 7.0, 9.0])\nprint(f"Topilgan chiziq: y = {slope} * x + {intercept}")`,
      expectedOutput: "Topilgan chiziq: y = 2.0 * x + 1.0"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — R-squared (Determinatsiya Koeffitsienti) Hisoblagich`,
      explanationUz: "Formula: $R^2 = 1 - \\frac{\\sum (y - \\hat{y})^2}{\\sum (y - \\bar{y})^2}$. Model ma'lumotlar dispersiyasini qanchalik tushuntirayotganini ko'rsatadi.",
      code: `import numpy as np\n\ndef calculate_r2(y_true: list[float], y_pred: list[float]) -> float:\n    yt = np.array(y_true)\n    yp = np.array(y_pred)\n    ss_res = np.sum((yt - yp) ** 2)\n    ss_tot = np.sum((yt - np.mean(yt)) ** 2)\n    return round(float(1.0 - (ss_res / ss_tot)), 4) if ss_tot > 0 else 0.0\n\nprint("Model R^2 sifati:", calculate_r2([10, 20, 30], [11, 19, 31]))`,
      expectedOutput: "Model R^2 sifati: 0.985"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Regulyarizatsiya qilmasdan ko'p parametrli chiziqli regressiya o'qitish",
        symptomUz: "Koeffitsientlar haddan tashqari katta sonlarga aylanadi va model Overfitting bo'ladi.",
        correctionUz: "Har doim Ridge (L2) yoki Lasso (L1) regulyarizatsiyasidan foydalaning."
      },
      {
        mistakeUz: "Outlierlar kuchli bo'lgan datasetda faqat MSE ga tayanish",
        symptomUz: "Bitta katta xatolik kvadratga oshirilib butun model chizig'ini chetga tortib ketadi.",
        correctionUz: "MAE (Mean Absolute Error) yoki Huber Loss yo'qotish funksiyasini qo'llang."
      }
    ]
  },

  18: {
    tool: "Scikit-learn",
    domainTitle: "Klassifikatsiya Modellari (Logistik, Daraxtlar, SVM)",
    terms: "Logistic Regression, Sigmoid Function, Decision Tree, Gini Impurity, Entropy, SVM, Margin",
    visualSteps: [
      { step: 1, label: "Chiziqli Ball (Logit)", detail: "z = W · X + b skalyar hisobi" },
      { step: 2, label: "Sigmoid Aktivatsiya", detail: "Ballni 0 va 1 oralig'idagi ehtimollikka aylantirish" },
      { step: 3, label: "Qaror Chegarasi (0.5)", detail: "Threshold orqali sinf (0 yoki 1) ga ajratish" },
      { step: 4, label: "Gini / Entropiya Bahosi", detail: "Daraxtlar tugunlaridagi tozalik darajasini optimallash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Sigmoid Aktivatsiyasi va Ehtimollik Bashorati`,
      explanationUz: "Formula: $\\sigma(z) = \\frac{1}{1 + e^{-z}}$. Har qanday haqiqiy sonni $(0, 1)$ oraliqqa siqadi.",
      code: `import math\n\ndef sigmoid(z: float) -> float:\n    # Overflow himoyasi\n    z = max(-500.0, min(500.0, z))\n    return round(1.0 / (1.0 + math.exp(-z)), 4)\n\nprint("z = 0 dagi ehtimollik:", sigmoid(0.0))\nprint("z = 2.5 dagi ehtimollik:", sigmoid(2.5))\nprint("z = -2.5 dagi ehtimollik:", sigmoid(-2.5))`,
      expectedOutput: "z = 0 dagi ehtimollik: 0.5\nz = 2.5 dagi ehtimollik: 0.9241\nz = -2.5 dagi ehtimollik: 0.0759"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Decision Tree Gini Ifloslanish (Impurity) Indeksi`,
      explanationUz: "Formula: $\\text{Gini} = 1 - \\sum p_i^2$. Sof tugunda 0 ga teng, teng taqsimotda maksimal (0.5).",
      code: `def calculate_gini(labels: list[int]) -> float:\n    n = len(labels)\n    if n == 0:\n        return 0.0\n    p0 = labels.count(0) / n\n    p1 = labels.count(1) / n\n    return round(1.0 - (p0**2 + p1**2), 4)\n\nprint("To'liq toza tugun [1, 1, 1]:", calculate_gini([1, 1, 1]))\nprint("Aralash tugun [1, 0, 1, 0]:", calculate_gini([1, 0, 1, 0]))`,
      expectedOutput: "To'liq toza tugun [1, 1, 1]: 0.0\nAralash tugun [1, 0, 1, 0]: 0.5"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Qaror daraxti chuqurligini (max_depth) cheklamay o'qitish",
        symptomUz: "Daraxt har bitta nuqtani yodlab oladi (Overfitting) va yangi ma'lumotlarda 50% xato qiladi.",
        correctionUz: "Har doim `max_depth` (3-10) yoki `min_samples_split` parametrlarini chegaralang."
      },
      {
        mistakeUz: "Nomutanosib sinflarda (Imbalanced Classes) qaror chegarasini (threshold) doim 0.5 da qoldirish",
        symptomUz: "Kam uchraydigan muhim sinf (masalan firibgarlik 1%) hech qachon aniqlanmaydi.",
        correctionUz: "PR egri chizig'iga qarab thresholdni 0.2 yoki 0.3 ga pasaytiring."
      }
    ]
  },

  19: {
    tool: "Scikit-learn",
    domainTitle: "Modelni Baholash va Metrikalar",
    terms: "Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC, Log Loss, Class Imbalance",
    visualSteps: [
      { step: 1, label: "Haqiqiy vs Bashorat", detail: "Y_true va Y_pred qiymatlarini solishtirish" },
      { step: 2, label: "Xatolar Matritsasi", detail: "TP, FP, TN, FN sonlarini to'rtburchakka ajratish" },
      { step: 3, label: "Precision va Recall", detail: "Aniqlik va to'liqlik ko'rsatkichlarini hisoblash" },
      { step: 4, label: "F1 va ROC-AUC", detail: "Yagona garmonik baho orqali model sifatini tasdiqlash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Precision, Recall va F1-Score Hisoblagich`,
      explanationUz: "Formula: $\\text{Precision} = \\frac{TP}{TP + FP}$, $\\text{Recall} = \\frac{TP}{TP + FN}$, $\\text{F1} = 2 \\cdot \\frac{P \\cdot R}{P + R}$.",
      code: `def compute_classification_metrics(tp: int, fp: int, fn: int) -> dict:\n    p = tp / (tp + fp) if (tp + fp) > 0 else 0.0\n    r = tp / (tp + fn) if (tp + fn) > 0 else 0.0\n    f1 = (2 * p * r) / (p + r) if (p + r) > 0 else 0.0\n    return {"precision": round(p, 4), "recall": round(r, 4), "f1_score": round(f1, 4)}\n\nprint("Metrikalar:", compute_classification_metrics(tp=80, fp=20, fn=10))`,
      expectedOutput: "Metrikalar: {'precision': 0.8, 'recall': 0.8889, 'f1_score': 0.8421}"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Binary Cross-Entropy (Log Loss) Hisoblash`,
      explanationUz: "Ehtimolliklar sifatini jazolovchi yo'qotish funksiyasi: $-\\frac{1}{N} \\sum [y \\ln p + (1-y) \\ln(1-p)]$.",
      code: `import math\n\ndef binary_log_loss(y_true: list[int], y_prob: list[float]) -> float:\n    eps = 1e-15\n    losses = []\n    for y, p in zip(y_true, y_prob):\n        p_clipped = max(eps, min(1.0 - eps, p))\n        loss = -(y * math.log(p_clipped) + (1 - y) * math.log(1 - p_clipped))\n        losses.append(loss)\n    return round(sum(losses) / len(losses), 4)\n\nprint("Log Loss xatoligi:", binary_log_loss([1, 0, 1], [0.9, 0.1, 0.8]))`,
      expectedOutput: "Log Loss xatoligi: 0.1446"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Nomutanosib ma'lumotlarda (99% sog'lom, 1% kasal) faqat Accuracy ga qarash",
        symptomUz: "Model har doim 'sog'lom' deb 99% accuracy ko'rsatadi, ammo hech bitta kasalni topa olmaydi.",
        correctionUz: "Har doim F1-Score, Recall yoki ROC-AUC metrikalaridan foydalaning."
      },
      {
        mistakeUz: "Thresholdni o'zgartirmasdan Precision va Recall ni bir vaqtda 100% ga chiqarishga urinish",
        symptomUz: "Precision oshganda Recall tushadi (Precision-Recall Tradeoff).",
        correctionUz: "Biznes talabiga qarab (masalan xavfsizlikda Recall muhim, spamda Precision) muvozanatni tanlang."
      }
    ]
  },

  20: {
    tool: "Scikit-learn",
    domainTitle: "Giperparametrlarni Sozlash va Kross-Validatsiya",
    terms: "K-Fold, Stratified K-Fold, GridSearchCV, RandomizedSearchCV, Overfitting vs Underfitting, Early Stopping",
    visualSteps: [
      { step: 1, label: "Datasetni K ta Qismga Bo'lish", detail: "5 yoki 10 ta teng qismga ajratish" },
      { step: 2, label: "Navbatma-navbat O'qitish", detail: "K-1 ta qismda o'qitib, 1 ta qismda tekshirish" },
      { step: 3, label: "Giperparametr Qidiruvi", detail: "GridSearch orqali eng yaxshi parametrlarni qidirish" },
      { step: 4, label: "O'rtacha Baho", detail: "Barcha qismlar bo'yicha mustahkam o'rtacha ballni olish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — K-Fold Indekslarini Bo'luvchi Algoritm`,
      explanationUz: "Ma'lumotlarni K ta teng blokka bo'lib, har bir iteratsiyada bitta blokni test uchun qoldirish.",
      code: `def generate_k_folds(n_samples: int, k: int = 3) -> list[tuple[list[int], list[int]]]:\n    indices = list(range(n_samples))\n    fold_size = n_samples // k\n    folds = []\n    for i in range(k):\n        test_idx = indices[i * fold_size : (i + 1) * fold_size]\n        train_idx = [idx for idx in indices if idx not in test_idx]\n        folds.append((train_idx, test_idx))\n    return folds\n\nfolds = generate_k_folds(6, k=3)\nprint(f"1-fold: Train {folds[0][0]}, Test {folds[0][1]}")`,
      expectedOutput: "1-fold: Train [2, 3, 4, 5], Test [0, 1]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Grid Search Giperparametrlar Kombinatsiyasi Generatori`,
      explanationUz: "Barcha mumkin bo'lgan parametr kombinatsiyalarini avtomatik tuzib chiquvchi mexanizm.",
      code: `import itertools\n\ndef build_param_grid(param_dict: dict) -> list[dict]:\n    keys = param_dict.keys()\n    values = param_dict.values()\n    combinations = list(itertools.product(*values))\n    return [dict(zip(keys, comb)) for comb in combinations]\n\ngrid = build_param_grid({"max_depth": [3, 5], "learning_rate": [0.01, 0.1]})\nprint(f"Jami kombinatsiyalar: {len(grid)} ta | 1-kombinatsiya: {grid[0]}")`,
      expectedOutput: "Jami kombinatsiyalar: 4 ta | 1-kombinatsiya: {'max_depth': 3, 'learning_rate': 0.01}"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Kross-validatsiyani Preprocessing (Scaling/Imputation) dan keyin butun datasetda qo'llash",
        symptomUz: "Foldlar orasida ma'lumot sizib chiqadi va validatsiya bali sun'iy oshib ko'rinadi.",
        correctionUz: "Har doim `Pipeline` dan foydalanib, har bir fold ichida alohida scaling bajaring."
      },
      {
        mistakeUz: "Vaqt qatorlarida (Time Series) tasodifiy K-Fold ishlatish",
        symptomUz: "Kelajak ma'lumotlari o'tmishni bashorat qilishga aralashib ketadi.",
        correctionUz: "Vaqt qatorlari uchun `TimeSeriesSplit` (oldinga siljuvchi oyna) dan foydalaning."
      }
    ]
  },

  21: {
    tool: "Scikit-learn",
    domainTitle: "Ansambl Usullari: Bagging va Boosting",
    terms: "Random Forest, Bagging, Gradient Boosting, XGBoost, LightGBM, CatBoost, Residuals, Weak Learners",
    visualSteps: [
      { step: 1, label: "Asosiy Modellarni Yaratish", detail: "Yuzlab mustaqil yoki ketma-ket daraxtlar" },
      { step: 2, label: "Bagging (Parallel)", detail: "Bootstrap to'plamlarda o'qitib, ovoz berish orqali birlashtirish" },
      { step: 3, label: "Boosting (Ketma-ket)", detail: "Har bir yangi daraxt oldingi xatolarni (qoldiqlarni) to'g'rilaydi" },
      { step: 4, label: "Kuchli Ansambl", detail: "Yakka modelga nisbatan sezilarli yuqori aniqlik va barqarorlik" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Bagging (Ovoz Berish) Ansambli Mantiqi`,
      explanationUz: "Bir nechta model bashorati bo'yicha ko'pchilik ovozini (Majority Voting) hisoblash.",
      code: `def majority_vote_ensemble(predictions: list[list[int]]) -> list[int]:\n    # predictions: [model_1_preds, model_2_preds, model_3_preds]\n    n_samples = len(predictions[0])\n    final = []\n    for i in range(n_samples):\n        votes = [model_preds[i] for model_preds in predictions]\n        winner = 1 if votes.count(1) > votes.count(0) else 0\n        final.append(winner)\n    return final\n\nm1 = [1, 0, 1, 1]\nm2 = [1, 1, 0, 1]\nm3 = [0, 0, 1, 1]\nprint("Ansambl ovoz berish natijasi:", majority_vote_ensemble([m1, m2, m3]))`,
      expectedOutput: "Ansambl ovoz berish natijasi: [1, 0, 1, 1]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Gradient Boosting Qoldiqlarini (Residuals) Hisoblash`,
      explanationUz: "Boosting har bir qadamda yangi modelni nishonga (y) emas, xatolik qoldig'iga ($y - \\hat{y}$) moslaydi.",
      code: `def calculate_residuals(y_true: list[float], y_pred: list[float]) -> list[float]:\n    return [round(y - y_hat, 2) for y, y_hat in zip(y_true, y_pred)]\n\ny_real = [100.0, 150.0, 200.0]\ny_base = [120.0, 120.0, 120.0]  # oddiy o'rtacha\nresiduals = calculate_residuals(y_real, y_base)\nprint("Keyingi daraxt o'rganishi kerak bo'lgan qoldiqlar:", residuals)`,
      expectedOutput: "Keyingi daraxt o'rganishi kerak bo'lgan qoldiqlar: [-20.0, 30.0, 80.0]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Gradient Boosting da daraxtlar sonini (n_estimators) o'ta ko'p qilib, Early Stopping qo'ymaslik",
        symptomUz: "Model shovqinlarni o'rganib oladi va test to'plamida xato ortadi (Overfitting).",
        correctionUz: "Har doim validation to'plamida `early_stopping_rounds` parametri bilan o'qiting."
      },
      {
        mistakeUz: "Random Forest da har bir daraxtga aynan bir xil xususiyatlarni berish",
        symptomUz: "Daraxtlar bir xil xatolarni takrorlaydi va ansambl xilma-xilligi (diversity) yo'qoladi.",
        correctionUz: "Har bir tugunda tasodifiy xususiyatlar tanlanishini (`max_features='sqrt'`) ta'minlang."
      }
    ]
  },

  22: {
    tool: "Scikit-learn",
    domainTitle: "Klasterlash Algoritmlari (K-Means, DBSCAN)",
    terms: "K-Means, Centroids, WCSS (Inertia), Elbow Method, Silhouette Score, DBSCAN, Density-based",
    visualSteps: [
      { step: 1, label: "Sentroidlarni Tanlash", detail: "K ta tasodifiy markazni fazoga joylashtirish" },
      { step: 2, label: "Eng Yaqin Nuqtalar", detail: "Har bir namunani eng yaqin sentroid klasteriga biriktirish" },
      { step: 3, label: "Markazlarni Ko'chirish", detail: "Har bir klaster nuqtalarining o'rtachasini yangi sentroid qilish" },
      { step: 4, label: "Yig'ilish (Convergence)", detail: "Sentroidlar siljimay qolganda optimal klasterlarni chiqarish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — K-Means Nuqtadan Sentroidgacha Masofani Hisoblash`,
      explanationUz: "Har bir nuqta uchun eng kichik Evklid masofasiga ega bo'lgan sentroid indeksini tanlash.",
      code: `import math\n\ndef assign_nearest_centroid(point: tuple[float, float], centroids: list[tuple[float, float]]) -> int:\n    best_dist = float("inf")\n    best_idx = -1\n    for idx, c in enumerate(centroids):\n        dist = math.sqrt((point[0] - c[0])**2 + (point[1] - c[1])**2)\n        if dist < best_dist:\n            best_dist = dist\n            best_idx = idx\n    return best_idx\n\ncentroids = [(0.0, 0.0), (10.0, 10.0)]\nprint("Nuqta (1.0, 2.0) qaysi klasterga tegishli:", assign_nearest_centroid((1.0, 2.0), centroids))\nprint("Nuqta (8.0, 9.0) qaysi klasterga tegishli:", assign_nearest_centroid((8.0, 9.0), centroids))`,
      expectedOutput: "Nuqta (1.0, 2.0) qaysi klasterga tegishli: 0\nNuqta (8.0, 9.0) qaysi klasterga tegishli: 1"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Yangi Sentroid Markazlarini Yangilash`,
      explanationUz: "Klasterga tushgan barcha nuqtalar koordinatalarining o'rtacha qiymatini hisoblash.",
      code: `def update_centroid(cluster_points: list[tuple[float, float]]) -> tuple[float, float]:\n    n = len(cluster_points)\n    if n == 0:\n        return (0.0, 0.0)\n    avg_x = sum(p[0] for p in cluster_points) / n\n    avg_y = sum(p[1] for p in cluster_points) / n\n    return (round(avg_x, 2), round(avg_y, 2))\n\npts = [(1.0, 2.0), (2.0, 4.0), (3.0, 6.0)]\nprint("Yangi hisoblangan sentroid markazi:", update_centroid(pts))`,
      expectedOutput: "Yangi hisoblangan sentroid markazi: (2.0, 4.0)"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "K-Means qo'llashdan oldin ma'lumotlarni masshtablamaslik (StandardScaler)",
        symptomUz: "Katta sonli ustun (masalan oylik maosh) kichik ustunni (yosh) butunlay bosib ketadi.",
        correctionUz: "Har doim klasterlashdan oldin barcha xususiyatlarni bir xil masshtabga keltiring."
      },
      {
        mistakeUz: "Klasterlar soni K ni bilmasdan tasodifiy tanlash",
        symptomUz: "Klasterlar sifatsiz va sun'iy bo'linib qoladi.",
        correctionUz: "Elbow metodi (Inertia grafiki) va Silhouette Score orqali optimal K ni toping."
      }
    ]
  },

  23: {
    tool: "Scikit-learn",
    domainTitle: "O‘lchamlilikni Kamaytirish (PCA, t-SNE)",
    terms: "PCA, Principal Components, Explained Variance Ratio, t-SNE, UMAP, Latent Space, Curse of Dimensionality",
    visualSteps: [
      { step: 1, label: "Yuqori O'lchamli Fazo", detail: "50-100 ta o'zaro bog'liq xususiyatlar" },
      { step: 2, label: "Kovariatsiya Tahlili", detail: "Eng katta tarqoqlik (variance) yo'nalishlarini aniqlash" },
      { step: 3, label: "Ortogonal Proyeksiya", detail: "Asosiy komponentlar bo'yicha ma'lumotni proyeksiyalash" },
      { step: 4, label: "2D/3D Vizualizatsiya", detail: "Ma'lumotlar strukturasini saqlagan holda past o'lchamga keltirish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Tushuntirilgan Dispersiya Ulushini (Explained Variance) Hisoblash`,
      explanationUz: "Har bir asosiy komponent datasetdagi umumiy axborotning qancha foizini saqlab qolganini baholash.",
      code: `import numpy as np\n\ndef calculate_explained_variance(eigenvalues: list[float]) -> list[float]:\n    total = sum(eigenvalues)\n    if total == 0:\n        return [0.0] * len(eigenvalues)\n    return [round(ev / total, 4) for ev in eigenvalues]\n\neigs = [15.0, 4.0, 1.0]\nratios = calculate_explained_variance(eigs)\nprint("Komponentlar dispersiya ulushi:", ratios)\nprint("Birinchi 2 ta komponent qamrovi:", round(sum(ratios[:2]) * 100, 1), "%")`,
      expectedOutput: "Komponentlar dispersiya ulushi: [0.75, 0.2, 0.05]\nBirinchi 2 ta komponent qamrovi: 95.0 %"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — 1D Proyeksiya (PCA Transformatsiyasi)`,
      explanationUz: "Ma'lumotlarni 1-asosiy komponent vektoriga proyeksiyalash orqali o'lchamni qisqartirish.",
      code: `import numpy as np\n\ndef project_to_1d(X: np.ndarray, component_v: np.ndarray) -> np.ndarray:\n    return np.round(np.dot(X, component_v), 2)\n\nX = np.array([[2.0, 3.0], [4.0, 5.0], [6.0, 7.0]])\nv = np.array([0.7071, 0.7071])  # 45 darajali birlik vektor\nprint("1D ga siqilgan nuqtalar:\\n", project_to_1d(X, v))`,
      expectedOutput: "1D ga siqilgan nuqtalar:\n [3.54 6.36 9.19]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "t-SNE orqali o'lchami qisqartirilgan ma'lumotlarni klassifikator modeliga train qilish",
        symptomUz: "t-SNE yangi test ma'lumotlarini qabul qila olmaydi (`transform()` yo'q), faqat vizualizatsiya uchun.",
        correctionUz: "Modelga o'lchamni qisqartirish uchun faqat PCA yoki UMAP dan foydalaning."
      },
      {
        mistakeUz: "PCA dan oldin ma'lumotlarni o'rtachadan ayirib (Mean Centering) normallashtirmaslik",
        symptomUz: "Komponentlar noto'g'ri o'q bo'yicha yo'nalib qoladi va dispersiyani to'g'ri aks ettirmaydi.",
        correctionUz: "Har doim `StandardScaler` orqali markazlashtirilgan ma'lumotlarga PCA qo'llang."
      }
    ]
  },

  24: {
    tool: "Time Series",
    domainTitle: "Vaqt Qatorlari Tahlili va Prognoz",
    terms: "Trend, Seasonality, Stationarity, Augmented Dickey-Fuller (ADF) Test, Differencing, ARIMA, SARIMA",
    visualSteps: [
      { step: 1, label: "Vaqt Grafigi", detail: "Xronologik ketma-ketlikdagi tebranishlarni kuzatish" },
      { step: 2, label: "Statsionarlikni Tekshirish", detail: "O'rtacha va dispersiya vaqt o'tishi bilan o'zgarmasligini ta'minlash" },
      { step: 3, label: "Differentsiyalash (d=1)", detail: "Trendni yo'qotish uchun y(t) - y(t-1) ayirmasini olish" },
      { step: 4, label: "ARIMA Prognozi", detail: "O'tmishdagi qoldiqlar va qiymatlar asosida kelajakni bashorat qilish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Differentsiyalash (Differencing) Bilan Trendni Yo'qotish`,
      explanationUz: "Formula: $\\Delta y_t = y_t - y_{t-1}$. Statsionar bo'lmagan qatorni statsionarga aylantiradi.",
      code: `def first_order_difference(series: list[float]) -> list[float]:\n    return [round(series[i] - series[i-1], 2) for i in range(1, len(series))]\n\ntrending_data = [10.0, 15.0, 22.0, 31.0, 42.0]\ndiff = first_order_difference(trending_data)\nprint("Boshlang'ich qator (trend bilan):", trending_data)\nprint("1-tartibli ayirma (statsionarlashgan):", diff)`,
      expectedOutput: "Boshlang'ich qator (trend bilan): [10.0, 15.0, 22.0, 31.0, 42.0]\n1-tartibli ayirma (statsionarlashgan): [5.0, 7.0, 9.0, 11.0]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Harakatlanuvchi O'rtacha (Rolling Moving Average)`,
      explanationUz: "Tasodifiy shovqinlarni silliqlash va asosiy tendentsiyani ko'rsatish.",
      code: `def moving_average(series: list[float], window: int = 3) -> list[float]:\n    smoothed = []\n    for i in range(len(series) - window + 1):\n        avg = sum(series[i:i+window]) / window\n        smoothed.append(round(avg, 2))\n    return smoothed\n\nraw_ts = [10, 14, 18, 12, 16, 20]\nprint("Silliqlangan oyna (window=3):", moving_average(raw_ts, window=3))`,
      expectedOutput: "Silliqlangan oyna (window=3): [14.0, 14.67, 15.33, 16.0]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Statsionar bo'lmagan (Non-stationary) qatorga to'g'ridan-to'g'ri chiziqli model qo'llash",
        symptomUz: "Model soxta regressiyaga (Spurious Regression) uchrab, kelajakda butunlay noto'g'ri bashorat beradi.",
        correctionUz: "Avval ADF testidan o'tkazing va differentsiyalash orqali statsionarlikka keltiring."
      },
      {
        mistakeUz: "Kelajak ma'lumotlarini o'tmishga sizdirish (Lookahead Bias)",
        symptomUz: "Orqa sanalardagi testda model 100% foyda ko'rsatadi, jonli savdoda esa qulaydi.",
        correctionUz: "Har doim vaqt xronologiyasiga qat'iy rioya qiling (faqat $t < T$ ma'lumotlari bilan o'qiting)."
      }
    ]
  },

  25: {
    tool: "Deep Learning",
    domainTitle: "Neyron Tarmoq Asoslari (Perceptron, MLP)",
    terms: "Artificial Neuron, Activation Functions (ReLU, Sigmoid, Softmax), Loss Functions, Backpropagation, MLP",
    visualSteps: [
      { step: 1, label: "Kirish Xususiyatlari", detail: "X1, X2 va og'irliklar W1, W2 ko'paytmasi" },
      { step: 2, label: "Chiziqli Jamlash", detail: "z = W · X + b chiziqli kombinatsiyasi" },
      { step: 3, label: "Nochiziqli Aktivatsiya", detail: "ReLU yoki Sigmoid orqali to'yinganlik kiritish" },
      { step: 4, label: "Xatolikni Qaytarish", detail: "Backpropagation orqali og'irliklarni yangilash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Sun'iy Neyron (Perceptron) Forward Pass`,
      explanationUz: "Formula: $y = \\max(0, W \\cdot X + b)$ (ReLU aktivatsiyasi bilan).",
      code: `import numpy as np\n\ndef neuron_forward(x: np.ndarray, w: np.ndarray, b: float) -> float:\n    z = np.dot(x, w) + b\n    # ReLU aktivatsiyasi\n    activation = max(0.0, float(z))\n    return round(activation, 3)\n\nx_input = np.array([1.5, -2.0, 3.0])\nw_weights = np.array([0.4, 0.5, 0.2])\nbias = 0.1\nprint("Neyron chiqishi (ReLU):", neuron_forward(x_input, w_weights, bias))`,
      expectedOutput: "Neyron chiqishi (ReLU): 0.3"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Softmax Ko'p Sinfli Ehtimollik Taqsimoti`,
      explanationUz: "Formula: $\\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum e^{z_j}}$. logits vektorini ehtimolliklarga aylantiradi.",
      code: `import numpy as np\n\ndef stable_softmax(logits: list[float]) -> list[float]:\n    # Overflow himoyasi uchun max ayiriladi\n    z = np.array(logits)\n    exp_z = np.exp(z - np.max(z))\n    probs = exp_z / np.sum(exp_z)\n    return [round(float(p), 4) for p in probs]\n\nlogits = [2.0, 1.0, 0.1]\nprint("Softmax ehtimolliklari:", stable_softmax(logits))\nprint("Ehtimolliklar yig'indisi:", sum(stable_softmax(logits)))`,
      expectedOutput: "Softmax ehtimolliklari: [0.659, 0.2424, 0.0986]\nEhtimolliklar yig'indisi: 1.0"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Barcha neyron og'irliklarini 0 ga tenglashtirib initsializatsiya qilish",
        symptomUz: "Barcha neyronlar bir xil gradient oladi (Simmetriya muammosi) va tarmoq o'rgana olmaydi.",
        correctionUz: "Xavier/Glorot yoki He normal tasodifiy initsializatsiyadan foydalaning."
      },
      {
        mistakeUz: "Chuqur tarmoqlarda faqat Sigmoid ishlatish",
        symptomUz: "Gradient yo'qolib ketadi (Vanishing Gradient) va boshlang'ich qatlamlar o'qimaydi.",
        correctionUz: "Yashirin qatlamlarda ReLU yoki GELU aktivatsiyasidan foydalaning."
      }
    ]
  },

  26: {
    tool: "PyTorch",
    domainTitle: "PyTorch Bilan Chuqur O‘rganish Poydevori",
    terms: "Tensor, Autograd, Dataset, DataLoader, Training Loop, Optimizer (Adam, SGD), loss.backward()",
    visualSteps: [
      { step: 1, label: "Tensor Yaratish", detail: "requires_grad=True bilan hisoblash grafigini boshlash" },
      { step: 2, label: "Forward Pass", detail: "Kiruvchi ma'lumotlarni model qatlamlaridan o'tkazish" },
      { step: 3, label: "Backward Pass", detail: "loss.backward() orqali avtomatik hosilalarni hisoblash" },
      { step: 4, label: "Og'irlikni Yangilash", detail: "optimizer.step() va optimizer.zero_grad() bajarish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — PyTorch Autograd Gradient Hisoblash Mantiqi`,
      explanationUz: "PyTorch avtomatik differentsiallash grafigi hosila hisoblashni osonlashtiradi.",
      code: `def simulate_autograd():\n    # y = 3*x^2 + 2 funksiyasi, x=4 dagi hosilasi: dy/dx = 6*x = 24\n    x_val = 4.0\n    grad = 6.0 * x_val\n    return {"x": x_val, "grad": grad}\n\nres = simulate_autograd()\nprint(f"x={res['x']} dagi avtomatik hisoblangan gradient: {res['grad']}")`,
      expectedOutput: "x=4.0 dagi avtomatik hisoblangan gradient: 24.0"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — PyTorch Training Loop Qadamlari Simulyatsiyasi`,
      explanationUz: "Standart PyTorch training loop ketma-ketligi: Zero_grad -> Forward -> Loss -> Backward -> Step.",
      code: `def execute_training_step(weights: float, lr: float = 0.01) -> dict:\n    # Forward\n    loss = (weights - 2.0) ** 2  # target=2.0\n    # Backward\n    grad = 2.0 * (weights - 2.0)\n    # Optimizer step\n    new_weights = weights - lr * grad\n    return {"loss": round(loss, 4), "new_weights": round(new_weights, 4)}\n\nstep1 = execute_training_step(weights=5.0, lr=0.1)\nprint("1-iteratsiya natijasi:", step1)`,
      expectedOutput: "1-iteratsiya natijasi: {'loss': 9.0, 'new_weights': 4.4}"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Training loop har bir qadamida `optimizer.zero_grad()` ni chaqirishni unutish",
        symptomUz: "Gradientlar har bir qadamda qo'shilib ketadi (Accumulate) va og'irliklar portlaydi.",
        correctionUz: "Har safar `loss.backward()` dan oldin yoki keyin `optimizer.zero_grad()` qo'ying."
      },
      {
        mistakeUz: "Validatsiya paytida `model.eval()` va `torch.no_grad()` ni qo'ymaslik",
        symptomUz: "Dropout va BatchNorm noto'g'ri ishlaydi, xotira keraksiz gradientlar bilan to'ladi.",
        correctionUz: "Inference va test paytida har doim `with torch.no_grad():` blokidan foydalaning."
      }
    ]
  },

  27: {
    tool: "Computer Vision",
    domainTitle: "Kompyuter Ko‘rishi (Computer Vision & CNN)",
    terms: "2D Convolution, Kernel / Filter, Stride, Padding, Max-Pooling, Receptive Field, ResNet Residual Block",
    visualSteps: [
      { step: 1, label: "Xom Tasvir (RGB)", detail: "Balandlik x Kenglik x 3 kanalli piksel matritsasi" },
      { step: 2, label: "Filtr (Kernel 3x3)", detail: "Qirralar, burchaklar va teksturalarni ajratib olish" },
      { step: 3, label: "Max-Pooling (2x2)", detail: "Muhim xususiyatlarni saqlab, o'lchamni 2 baravar qisqartirish" },
      { step: 4, label: "Sinf Bashorati", detail: "To'liq bog'langan qatlam orqali obekt turini aniqlash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — 2D Konvolyutsiya (Kernel Filter) Amali`,
      explanationUz: "Tasvir bo'ylab kichik 2x2 filtrni surib, qirralarni aniqlash formulasi.",
      code: `import numpy as np\n\ndef convolve2d_minimal(image: np.ndarray, kernel: np.ndarray) -> np.ndarray:\n    i_h, i_w = image.shape\n    k_h, k_w = kernel.shape\n    out_h = i_h - k_h + 1\n    out_w = i_w - k_w + 1\n    out = np.zeros((out_h, out_w))\n    for r in range(out_h):\n        for c in range(out_w):\n            out[r, c] = np.sum(image[r:r+k_h, c:c+k_w] * kernel)\n    return out\n\nimg = np.array([\n    [10, 10, 0],\n    [10, 10, 0],\n    [10, 10, 0]\n])\nvertical_edge_filter = np.array([\n    [1, -1],\n    [1, -1]\n])\nres = convolve2d_minimal(img, vertical_edge_filter)\nprint("Qirralar xaritasi (Feature Map):\\n", res)`,
      expectedOutput: "Qirralar xaritasi (Feature Map):\n [[ 0. 20.]\n [ 0. 20.]]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — 2x2 Max-Pooling Bilan O'lchamni Qisqartirish`,
      explanationUz: "Har bir 2x2 oynadan eng katta qiymatni tanlab, fazoviy invariantlik hosil qilish.",
      code: `import numpy as np\n\ndef max_pooling_2x2(matrix: np.ndarray) -> np.ndarray:\n    h, w = matrix.shape\n    out = np.zeros((h // 2, w // 2))\n    for r in range(0, h, 2):\n        for c in range(0, w, 2):\n            out[r//2, c//2] = np.max(matrix[r:r+2, c:c+2])\n    return out\n\nfeature_map = np.array([\n    [1, 5, 2, 4],\n    [3, 8, 1, 0],\n    [7, 2, 9, 3],\n    [0, 4, 1, 6]\n])\nprint("Max-Pooling natijasi (4x4 -> 2x2):\\n", max_pooling_2x2(feature_map))`,
      expectedOutput: "Max-Pooling natijasi (4x4 -> 2x2):\n [[8. 4.]\n [7. 9.]]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Padding ishlatmasdan o'nlab konvolyutsiya qatlamlarini ketma-ket ulash",
        symptomUz: "Tasvir o'lchami tezda 1x1 ga tushib qoladi va qirralardagi ma'lumotlar yo'qoladi.",
        correctionUz: "O'lchamni saqlab qolish uchun `padding='same'` (yoki padding=1) dan foydalaning."
      },
      {
        mistakeUz: "Tasvirlarni 0-255 piksel oralig'ida qoldirib, normalizatsiya qilmaslik",
        symptomUz: "Gradientlar beqarorlashadi va o'rganish juda sekinlashadi.",
        correctionUz: "Tasvirlarni 255.0 ga bo'lib `[0.0, 1.0]` oralig'iga yoki ImageNet o'rtachasiga keltiring."
      }
    ]
  },

  28: {
    tool: "NLP",
    domainTitle: "Tabiiy Tilni Qayta Ishlash (NLP & RNN)",
    terms: "Tokenization, Word2Vec, Recurrent Neural Network (RNN), Hidden State, LSTM, Forget Gate, GRU",
    visualSteps: [
      { step: 1, label: "Ketma-ketlik Kirishi", detail: "Vaqt bo'yicha ketma-ket so'zlar X_t" },
      { step: 2, label: "Yashirin Holat (Hidden)", detail: "O'tmish xotirasini saqlovchi vektor h_t = tanh(W x + U h)" },
      { step: 3, label: "LSTM Darvozalari", detail: "Forget, Input va Output orqali muhim axborotni filtrlash" },
      { step: 4, label: "Matn Xulosasi", detail: "Sentiment tahlil yoki keyingi so'z ehtimoli" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Oddiy RNN Yashirin Holati (Hidden State) Yangilanishi`,
      explanationUz: "Formula: $h_t = \\tanh(W_{xh} x_t + W_{hh} h_{t-1} + b)$. O'tmish va joriy so'zni birlashtirish.",
      code: `import numpy as np\n\ndef rnn_step(x_t: np.ndarray, h_prev: np.ndarray, W_xh: np.ndarray, W_hh: np.ndarray) -> np.ndarray:\n    z = np.dot(x_t, W_xh) + np.dot(h_prev, W_hh)\n    return np.round(np.tanh(z), 3)\n\nx_word = np.array([1.0, 0.0])\nh_old = np.array([0.5, -0.5])\nW_x = np.array([[0.2, 0.8], [0.1, 0.3]])\nW_h = np.array([[0.5, 0.1], [0.2, 0.4]])\nprint("Yangi yashirin holat h_t:", rnn_step(x_word, h_old, W_x, W_h))`,
      expectedOutput: "Yangi yashirin holat h_t: [0.336 0.635]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — LSTM Forget Gate (Unutish Darvozasi) Mantiqi`,
      explanationUz: "Formula: $f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)$. Keraksiz eski ma'lumotni 0 ga ko'paytirib o'chiradi.",
      code: `import math\n\ndef lstm_forget_gate(similarity_to_old_topic: float) -> float:\n    # Sigmoid orqali eslab qolish ulushini (0 dan 1 gacha) aniqlash\n    return round(1.0 / (1.0 + math.exp(-similarity_to_old_topic)), 3)\n\nprint("Mavzu o'zgarganda (past moslik):", lstm_forget_gate(-3.0))\nprint("Mavzu davom etganda (yuqori moslik):", lstm_forget_gate(2.5))`,
      expectedOutput: "Mavzu o'zgarganda (past moslik): 0.047\nMavzu davom etganda (yuqori moslik): 0.924"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Standart RNN ni uzun matnlarda (100+ so'z) ishlatish",
        symptomUz: "Vanishing gradient sababli model jumlalar boshidagi ma'lumotlarni butunlay unutadi.",
        correctionUz: "Uzoq xotiraga ega LSTM, GRU yoki Transformer arxitekturasiga o'ting."
      },
      {
        mistakeUz: "Batchlash paytida har xil uzunlikdagi matnlarni to'g'ri pad qilmaslik",
        symptomUz: "Matritsa o'lchamlari mos kelmay xato yuz beradi.",
        correctionUz: "`pad_sequence` yordamida bir xil uzunlikka keltirib, attention mask qo'llang."
      }
    ]
  },

  29: {
    tool: "Transformer",
    domainTitle: "Transformerlar va Zamonaviy NLP",
    terms: "Self-Attention, Scaled Dot-Product, Multi-Head Attention, Positional Encoding, BERT, GPT, Masked LM",
    visualSteps: [
      { step: 1, label: "Q, K, V Proyeksiyalari", detail: "Har bir token uchun Query, Key va Value vektorlari" },
      { step: 2, label: "E'tibor Ballari (QK^T)", detail: "Barcha so'zlarning bir-biriga bog'liqlik matritsasi" },
      { step: 3, label: "Masshtablash va Softmax", detail: "sqrt(d_k) ga bo'lib ehtimolliklar matritsasini olish" },
      { step: 4, label: "Kontekstli Chiqish", detail: "Value vektorlarini e'tibor vaznlari bilan jamlash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Scaled Dot-Product Attention Formulasi`,
      explanationUz: "Formula: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$.",
      code: `import numpy as np\n\ndef scaled_dot_product_attention(Q: np.ndarray, K: np.ndarray, V: np.ndarray) -> np.ndarray:\n    d_k = Q.shape[-1]\n    scores = np.dot(Q, K.T) / np.sqrt(d_k)\n    # Softmax\n    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))\n    attention_weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)\n    output = np.dot(attention_weights, V)\n    return np.round(output, 3)\n\n# 2 ta token, o'lcham d_k = 2\nQ = np.array([[1.0, 0.0], [0.0, 1.0]])\nK = np.array([[1.0, 0.0], [0.0, 1.0]])\nV = np.array([[10.0, 20.0], [30.0, 40.0]])\nprint("Attention chiqishi:\\n", scaled_dot_product_attention(Q, K, V))`,
      expectedOutput: "Attention chiqishi:\n [[15.826 25.826]\n [24.174 34.174]]"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Sinusoidal Positional Encoding Simulyatsiyasi`,
      explanationUz: "Transformer so'zlar tartibini bilmagani sababli joylashuv pozitsiyasini kiritish talab etiladi.",
      code: `import math\n\ndef get_positional_encoding(pos: int, d_model: int = 4) -> list[float]:\n    pe = []\n    for i in range(0, d_model, 2):\n        pe.append(round(math.sin(pos / (10000 ** (i / d_model))), 3))\n        pe.append(round(math.cos(pos / (10000 ** (i / d_model))), 3))\n    return pe\n\nprint("0-pozitsiya kodi:", get_positional_encoding(0))\nprint("1-pozitsiya kodi:", get_positional_encoding(1))`,
      expectedOutput: "0-pozitsiya kodi: [0.0, 1.0, 0.0, 1.0]\n1-pozitsiya kodi: [0.841, 0.54, 0.01, 1.0]"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Attention ballarini $\\sqrt{d_k}$ ga bo'lishni unutish",
        symptomUz: "Katta o'lchamlarda skalyar ko'paytma kattalashib, Softmax gradientlari nolga tushib qoladi.",
        correctionUz: "Har doim qat'iy ravishda $\\sqrt{d_k}$ bilan masshtablang."
      },
      {
        mistakeUz: "Avtoregressiv (GPT) generatsiyada kelajak tokenlarini maskalamaslik (Causal Mask)",
        symptomUz: "Model keyingi so'zni oldindan ko'rib oladi (cheating) va erkin generatsiya qila olmaydi.",
        correctionUz: "Decoder qatlamlarida har doim yuqori uchburchakli Causal Mask dan foydalaning."
      }
    ]
  },

  30: {
    tool: "RL & XAI",
    domainTitle: "Mustahkamlovchi O‘rganish (RL) va Tushuntiriluvchi AI (XAI)",
    terms: "Markov Decision Process (MDP), Q-Learning, Bellman Equation, Reward, SHAP Values, LIME, Interpretability",
    visualSteps: [
      { step: 1, label: "Muhit va Agent", detail: "Holat (State) va mumkin bo'lgan Harakatlar (Actions)" },
      { step: 2, label: "Mukofot (Reward)", detail: "Bajarilgan harakat uchun muhit beradigan ijobiy/salbiy ball" },
      { step: 3, label: "Bellman Tenglamasi", detail: "Q(s, a) qiymatini kelajakdagi optimal daromad asosida yangilash" },
      { step: 4, label: "XAI Tushuntirish", detail: "Model qaroriga qaysi xususiyat ko'proq ta'sir qilganini (SHAP) ko'rsatish" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Q-Learning Bellman Tenglamasi Yangilanishi`,
      explanationUz: "Formula: $Q(s, a) = Q(s, a) + \\alpha [r + \\gamma \\max Q(s', a') - Q(s, a)]$.",
      code: `def update_q_value(current_q: float, reward: float, max_future_q: float, alpha: float = 0.1, gamma: float = 0.9) -> float:\n    temporal_difference = reward + gamma * max_future_q - current_q\n    new_q = current_q + alpha * temporal_difference\n    return round(new_q, 3)\n\n# Boshlang'ich Q=1.0, mukofot r=5.0, kelajak max Q=2.0\nupdated = update_q_value(current_q=1.0, reward=5.0, max_future_q=2.0)\nprint("Yangilangan Q-qiymat:", updated)`,
      expectedOutput: "Yangilangan Q-qiymat: 1.58"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — SHAP Uslubida Xususiyatlar Hissasini (Feature Attribution) Tahlil Qilish`,
      explanationUz: "Har bir xususiyat modelning bazaviy bashoratini qanchalik oshirgan yoki kamaytirganini ko'rsatish.",
      code: `def explain_prediction(base_val: float, shap_contributions: dict[str, float]) -> dict:\n    final_pred = base_val + sum(shap_contributions.values())\n    return {"base_prediction": base_val, "final_prediction": round(final_pred, 2), "contributions": shap_contributions}\n\nshap_vals = {"yosh": 2.5, "daromad": 5.0, "kredit_tarixi": -1.5}\nprint(explain_prediction(50.0, shap_vals))`,
      expectedOutput: "{'base_prediction': 50.0, 'final_prediction': 56.0, 'contributions': {'yosh': 2.5, 'daromad': 5.0, 'kredit_tarixi': -1.5}}"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "RL da Discount Factor (gamma) ni 1.0 ga teng qilib, cheksiz ufqda ishlash",
        symptomUz: "Mukofotlar yig'indisi cheksizlikka qarab portlaydi.",
        correctionUz: "Har doim $\\gamma < 1.0$ (odatda 0.9-0.99) qilib kelajak mukofotlarini diskontlang."
      },
      {
        mistakeUz: "Kredit yoki tibbiyot modellarida tushuntirishsiz (Black-Box) qaror chiqarish",
        symptomUz: "Tizim qonunchilik talablariga zid keladi va xatolar sababi noma'lum qoladi.",
        correctionUz: "Qarorlarni tushuntirish uchun SHAP yoki TreeExplainer dan foydalaning."
      }
    ]
  },

  31: {
    tool: "MLOps",
    domainTitle: "MLOps: Modellarni Ishlab Chiqarishga Chiqarish va Monitoring",
    terms: "Model Serialization (ONNX, Pickle), API Serving (FastAPI), Data Drift, Concept Drift, Model Monitoring",
    visualSteps: [
      { step: 1, label: "Modelni Saqlash", detail: "ONNX yoki TorchScript formatida serialize qilish" },
      { step: 2, label: "API Xizmat (Serving)", detail: "FastAPI orqali millisekundlik inferens endpointi ochish" },
      { step: 3, label: "Drift Monitoring", detail: "Kiruvchi ma'lumotlar taqsimoti siljiganini (Data Drift) aniqlash" },
      { step: 4, label: "Avtomatik Qayta O'qitish", detail: "Sifat tushib ketganda modelni yangi ma'lumotlarda yangilash" }
    ],
    code1: (t, id) => ({
      titleUz: `1-misol: ${t} — Data Drift (Taqsimot Siljishi) Detektori`,
      explanationUz: "Ishlab chiqarishdagi kiruvchi xususiyatlar o'rtachasini Train davridagi o'rtacha bilan taqqoslash.",
      code: `def detect_data_drift(train_mean: float, prod_mean: float, train_std: float, threshold_sigma: float = 2.0) -> dict:\n    shift = abs(prod_mean - train_mean)\n    is_drift = shift > threshold_sigma * train_std\n    return {"drift_detected": is_drift, "shift_amount": round(shift, 2), "action": "qayta o'qitish kerak" if is_drift else "barqaror"}\n\nprint("Barqaror holat:", detect_data_drift(100.0, 102.0, 5.0))\nprint("Drift holati (og'ish katta):", detect_data_drift(100.0, 125.0, 5.0))`,
      expectedOutput: "Barqaror holat: {'drift_detected': False, 'shift_amount': 2.0, 'action': 'barqaror'}\nDrift holati (og'ish katta): {'drift_detected': True, 'shift_amount': 25.0, 'action': \"qayta o'qitish kerak\"}"
    }),
    code2: (t, id) => ({
      titleUz: `2-misol: ${t} — Model Serving uchun Xavfsiz Inferens Handleri`,
      explanationUz: "API ga kelgan ma'lumotlarni tekshirib, xatoliklardan himoyalangan model inferensini bajarish.",
      code: `def serve_model_prediction(features: dict, expected_fields: list[str]) -> dict:\n    for f in expected_fields:\n        if f not in features:\n            return {"status": "error", "code": 400, "message": f"Yetishmayotgan maydon: {f}"}\n    # Mock inferens\n    pred = round(features["age"] * 0.1 + features["income"] * 0.001, 2)\n    return {"status": "success", "prediction": pred}\n\nprint(serve_model_prediction({"age": 30, "income": 5000}, ["age", "income"]))`,
      expectedOutput: "{'status': 'success', 'prediction': 8.0}"
    }),
    mistakes: (t) => [
      {
        mistakeUz: "Model fayllarini Git da saqlash",
        symptomUz: "Git ombori yuzlab megabaytga to'lib ketadi va boshqarish imkonsiz bo'ladi.",
        correctionUz: "Modellar uchun DVC, MLflow yoki S3 model registry dan foydalaning."
      },
      {
        mistakeUz: "Model deploy qilingach monitoring qo'ymaslik",
        symptomUz: "Tashqi dunyo o'zgarishi bilan (Concept Drift) model kutilmaganda yomon bashorat qila boshlaydi.",
        correctionUz: "Prometheus va Evidently AI orqali real vaqtda sifat metrikalarini kuzating."
      }
    ]
  }
};
