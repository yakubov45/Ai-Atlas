import fs from "node:fs";

const WEEKS_DATA = [
  {
    weekNumber: 1,
    titleUz: "Python va Zamonaviy Dasturiy Muhit",
    focusUz: "uv paket menejeri, loyiha arxitekturasi, CLI, Ruff linter, pytest va GitHub Actions CI. Type hints, generatorlar, context manager va Pydantic ma'lumot validatsiyasi.",
    deliverableUz: "CSV faylni tekshiruvchi CLI dasturi, 80%+ test qamrovi va ishlayotgan GitHub Actions CI quvuri.",
    lessons: [
      {
        id: "D01.1",
        titleUz: "Zamonaviy Python Muhiti: uv, Loyiha Tuzilmasi va CLI",
        sourceIds: ["M01", "M02"],
        theoryUz: "Python ekotizimida `uv` (Rust tilida yozilgan o'ta tezkor paket va Python versiya menejeri) an'anaviy `pip` va `venv` o'rnini egallamoqda. Professional loyihalar `pyproject.toml` orqali boshqariladi, src-layout (`src/loyiha/`) orqali import xatolaridan himoyalanadi.",
        codeSnippet: `# CLI dastur namunasi (Argparse va uv muhiti)
import argparse
from pathlib import Path

def validate_csv(path: Path) -> dict[str, int]:
    valid, invalid = 0, 0
    with open(path, "r", encoding="utf-8") as f:
        header = f.readline().strip().split(",")
        for line in f:
            fields = line.strip().split(",")
            if len(fields) == len(header):
                valid += 1
            else:
                invalid += 1
    return {"valid_rows": valid, "invalid_rows": invalid}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CSV ma'lumotlar yaxlitligini tekshiruvchi CLI")
    parser.add_argument("--file", type=Path, required=True, help="Tekshiriladigan CSV fayl yo'li")
    args = parser.parse_args()
    res = validate_csv(args.file)
    print(f"Hisobot: {res['valid_rows']} to'g'ri, {res['invalid_rows']} xato qatorlar.")`,
        keyTakeawaysUz: [
          "uv bilan virtual muhit yaratish 10-100 barobar tezroq ishlaydi.",
          "src-layout o'rnatilmagan paketlarni tasodifiy import qilishdan asraydi.",
          "CLI vositalari backend va data quvurlari uchun asosiy boshqaruv interfeysidir."
        ],
        quiz: [
          {
            id: "d01-1-q1",
            promptUz: "Nega zamonaviy Python loyihalarida flat-layout o'rniga src-layout tavsiya etiladi?",
            options: [
              "Faqat Windows operatsion tizimida ishlash uchun",
              "Lokal joriy papkadagi fayllarni o'rnatilgan paket sifatida adashtirib import qilishning oldini olish uchun",
              "Kod hajmini siqish va xotirani tejash uchun",
              "Pyodide brauzerida tezroq yuklanishi uchun"
            ],
            correctIndex: 1,
            explanationUz: "src/ papkasi testlar yoki boshqa modullarning lokal chala fayllarni o'rnatilgan modul deb adashishidan himoya qiladi."
          }
        ]
      },
      {
        id: "D01.2",
        titleUz: "Murakkab Python: Type Hints, Generatorlar, Context Manager va Pydantic",
        sourceIds: ["M03", "M04"],
        theoryUz: "Katta ma'lumotlar bilan ishlashda barcha qatorlarni birdan xotiraga (RAM) yuklash Out-Of-Memory (OOM) xatosiga olib keladi. `yield` orqali generatorlar qatorma-qator oqim (stream) yaratadi. Pydantic v2 esa kiruvchi ma'lumotlarni Rust yadrosi orqali yuqori tezlikda tekshiradi.",
        codeSnippet: `from collections.abc import Generator
from pydantic import BaseModel, Field, ValidationError

class UserRecord(BaseModel):
    user_id: int
    email: str
    age: int = Field(ge=18, le=120)

def stream_records(lines: list[str]) -> Generator[UserRecord | None, None, None]:
    for line in lines:
        parts = line.strip().split(",")
        try:
            yield UserRecord(user_id=int(parts[0]), email=parts[1], age=int(parts[2]))
        except (ValidationError, IndexError, ValueError):
            yield None

# Generator orqali xotirani tejash:
raw_data = ["1,alisher@example.com,25", "2,invalid_age,15", "3,bobur@domain.uz,30"]
for rec in stream_records(raw_data):
    if rec:
        print(f"Yaroqli: {rec.user_id} - {rec.email}")
    else:
        print("Xato yozuv e'tiborsiz qoldirildi.")`,
        keyTakeawaysUz: [
          "Generatorlar `yield` orqali xotirani minimal (O(1)) darajada ushlab turadi.",
          "Pydantic schema orqali ma'lumotlar tiplari va chegaralari kafolatlanadi.",
          "Context manager (`with`) resurslarni xavfsiz ochish va yopishni kafolatlaydi."
        ],
        quiz: [
          {
            id: "d01-2-q1",
            promptUz: "10 Gigabayt hajmdagi log faylini tahlil qilishda qaysi usul RAM to'lib qolishining oldini oladi?",
            options: [
              "f.readlines() orqali barcha qatorlarni ro'yxatga olish",
              "Generator funksiya (`yield`) orqali har bir qatorni navbatma-navbat o'qish",
              "JSON formatiga o'tkazib keyin yuklash",
              "Recursion orqali fayl oxirigacha chaqirish"
            ],
            correctIndex: 1,
            explanationUz: "Generatorlar butun faylni xotiraga yuklamaydi, faqat o'sha paytda kerakli bitta yozuvni ushlaydi."
          }
        ]
      },
      {
        id: "D01.3",
        titleUz: "Kod Sifati va Avtomatlashtirish: Ruff, pytest va GitHub Actions CI",
        sourceIds: ["M05", "ORIGINAL_GAP_1"],
        theoryUz: "Muhandislik madaniyati: Ruff linting va formatlashni C/Rust tezligida bajaradi. pytest orqali fixture va parametrli testlar yoziladi. GitHub Actions har bir Git commit va Pull Request da testlarni avtomatik ishga tushiradi (CI).",
        codeSnippet: `# GitHub Actions CI YAML (.github/workflows/ci.yml)
name: CI Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install uv
        uses: astral-sh/setup-uv@v2
      - name: Set up Python
        run: uv python install 3.12
      - name: Run Ruff Linter & Formatter
        run: uv run ruff check . && uv run ruff format --check .
      - name: Run Pytest with Coverage
        run: uv run pytest --cov=src --cov-fail-under=80`,
        keyTakeawaysUz: [
          "Ruff Flake8, Black va isort o'rnini bitta tezkor vosita bilan bosadi.",
          "pytest fixturelari testlar uchun toza holat va mock ob'yektlarni tayyorlaydi.",
          "CI quvuri singan kodning main branch ga qo'shilib ketishiga yo'l qo'ymaydi."
        ],
        quiz: [
          {
            id: "d01-3-q1",
            promptUz: "CI (Continuous Integration) quvurining asosiy vazifasi nima?",
            options: [
              "Faqat fayllarni Google Drive ga zaxiralash",
              "Har bir kod o'zgarishida linter va avtomatlashtirilgan testlarni tekshirib, xatolarni erta aniqlash",
              "Foydalanuvchilarga marketing xabarlarini yuborish",
              "Kodni faqat HTML ga aylantirib berish"
            ],
            correctIndex: 1,
            explanationUz: "CI linter va testlarni har bir commit va PR da mustaqil tekshirib, kod yaxlitligini ta'minlaydi."
          }
        ]
      }
    ]
  },
  {
    weekNumber: 2,
    titleUz: "Ma'lumotlar Muhandisligi va SQL",
    focusUz: "NumPy vektorli hisoblashlar, Pandas vs Polars taqqoslovi, EDA (Exploratory Data Analysis), SQL JOIN, Window funksiyalar va DuckDB analitikasi.",
    deliverableUz: "Bitta dataset bo'yicha chuqur EDA notebooki va 20 ta analitik SQL so'rovlar to'plami.",
    lessons: [
      {
        id: "D02.1",
        titleUz: "NumPy va Vektorli Hisoblashlar: Broadcasting va Xotira Joylashuvi",
        sourceIds: ["M06"],
        theoryUz: "NumPy C tilida yozilgan C-contiguous xotira massivlari ustida vektorli (SIMD) amallar bajaradi. Python sikllari (for loop) sekin bo'lsa, NumPy broadcasting orqali massivlar ustida bir necha yuz barobar tezroq hisob-kitob qiladi.",
        codeSnippet: `import numpy as np

# Python sikli vs NumPy Vektorlashtirish
prices = np.array([12000, 45000, 89000, 23000, 67000], dtype=np.float32)
discount_rate = 0.15

# Vektorli broadcasting (for siklisiz):
discounted = prices * (1.0 - discount_rate)
print("Chegirmali narxlar:", discounted)

# 2D Normalizatsiya (Z-Score):
matrix = np.random.randn(5, 3)
mean = matrix.mean(axis=0)
std = matrix.std(axis=0)
z_scores = (matrix - mean) / (std + 1e-7)
print("Normalizatsiya qilingan o'rtacha (0 ga yaqin):", z_scores.mean(axis=0))`,
        keyTakeawaysUz: [
          "NumPy massivlari bir jinsli (homogenous) bo'lib, xotirada ketma-ket joylashadi.",
          "Broadcasting o'lchamlari mos keluvchi massivlarni xotirada nusxa olmasdan kengaytiradi.",
          "Vektorli amallar for loop ga nisbatan 50-200 barobar samaraliroq."
        ],
        quiz: [
          {
            id: "d02-1-q1",
            promptUz: "Nima uchun NumPy hisob-kitoblari oddiy Python ro'yxatlaridan ancha tez ishlaydi?",
            options: [
              "NumPy matnlarni avtomatik o'chirib tashlagani uchun",
              "Massivlar C xotira tartibida ketma-ket saqlanadi va SIMD vektorli protsessor amallaridan foydalanadi",
              "Faqat bulut serverlarida ishlagani uchun",
              "Faqat butun sonlarni qabul qilgani uchun"
            ],
            correctIndex: 1,
            explanationUz: "Xotira ketma-ketligi va protsessorning vektorli ko'rsatmalari (SIMD) yuqori tezlikni ta'minlaydi."
          }
        ]
      },
      {
        id: "D02.2",
        titleUz: "Pandas va Polars: Xotira Samaradorligi va DataFrame Tahlili",
        sourceIds: ["M07", "M08"],
        theoryUz: "Pandas keng ommalashgan bo'lsa-da, katta ma'lumotlarda ko'p xotira talab qiladi. Rust asosidagi Polars esa Apache Arrow formatidan foydalanib, multithreading va Lazy execution orqali xotirani minimal darajada ishlatadi.",
        codeSnippet: `import polars as pl

# Polars LazyFrame orqali OOM xatosiz 1 million qatorni saralash
data = {
    "user_id": [101, 102, 103, 101, 102, 104],
    "amount": [250000, 120000, 450000, 300000, 80000, 600000],
    "status": ["PAID", "PENDING", "PAID", "PAID", "CANCELLED", "PAID"]
}

df = pl.DataFrame(data)

# Agregatsiya: har bir foydalanuvchi bo'yicha to'langan jami summa
summary = (
    df.lazy()
    .filter(pl.col("status") == "PAID")
    .group_by("user_id")
    .agg(
        pl.col("amount").sum().alias("total_spent"),
        pl.col("amount").count().alias("paid_orders_count")
    )
    .sort("total_spent", descending=True)
    .collect()
)
print(summary)`,
        keyTakeawaysUz: [
          "Polars LazyFrame so'rov grafigini optimallashtiradi va faqat kerakli ustunlarni o'qiydi.",
          "Apache Arrow nolinchi xotira nusxalash (zero-copy) imkonini beradi.",
          "Guruhlash va filtrlash analitikaning asosi hisoblanadi."
        ],
        quiz: [
          {
            id: "d02-2-q1",
            promptUz: "Polars'dagi LazyFrame ning oddiy DataFrame dan asosiy farqi nima?",
            options: [
              "Faqat bitta qatorni saqlay olishida",
              "Amallarni darhol bajarmasdan, so'rovlar rejasini tuzib, minimal xotira bilan optimallashtirib bajarishida",
              "Faqat ekranga matn chiqarishida",
              "Faqat Excel fayllarni o'qishida"
            ],
            correctIndex: 1,
            explanationUz: "LazyFrame butun hisoblash grafigini optimallashtiradi va faqat .collect() chaqirilganda samarali bajaradi."
          }
        ]
      },
      {
        id: "D02.3",
        titleUz: "EDA (Exploratory Data Analysis) va Data Cleaning Strategiyalari",
        sourceIds: ["M09"],
        theoryUz: "Machine Learning modelining sifati unga beriladigan ma'lumotlar tozaligiga (Garbage In, Garbage Out) bog'liq. Missing value (yetishmayotgan qiymatlar), outlierlar (chetlanishlar), tiplar chalkashligi va nomutanosibliklar tahlil qilinishi lozim.",
        codeSnippet: `import polars as pl

def audit_dataset(df: pl.DataFrame) -> dict:
    null_counts = {col: df[col].null_count() for col in df.columns}
    row_count = df.height
    duplicate_count = df.height - df.unique().height
    return {
        "total_rows": row_count,
        "duplicate_rows": duplicate_count,
        "null_report": {k: v for k, v in null_counts.items() if v > 0}
    }

sample = pl.DataFrame({
    "age": [25, None, 30, 45, 25],
    "income": [5000000, 7000000, None, 12000000, 5000000],
})
print("Audit hisoboti:", audit_dataset(sample))`,
        keyTakeawaysUz: [
          "Yetishmayotgan qiymatlarni (imputation) faqat train to'plami medianasi/modasi bilan to'ldirish kerak.",
          "Chetlanishlarni (outliers) IQR yoki Z-score orqali aniqlash zarur.",
          "EDA model qurishdan oldin biznes savollariga dastlabki javoblarni beradi."
        ],
        quiz: [
          {
            id: "d02-3-q1",
            promptUz: "Nega test to'plamidagi bo'sh qiymatlarni to'ldirishda test to'plamining o'rtacha qiymatini ishlatish taqiqlanadi?",
            options: [
              "Hisoblash uzoq vaqt olgani uchun",
              "Data Leakage (ma'lumot sizishi) yuz beradi; model kelajak ma'lumotlarini oldindan ko'rib qo'yadi",
              "Python bunga ruxsat bermagani uchun",
              "Faqat butun sonlar uchun ishlatilishi kerakligi sababli"
            ],
            correctIndex: 1,
            explanationUz: "Test ma'lumotlari faqat baholash uchun; har qanday statistik parametrlar faqat Train qismidan hisoblanishi shart."
          }
        ]
      },
      {
        id: "D02.4",
        titleUz: "SQL Mastery: JOIN, CTE, Window Funksiyalari va DuckDB Analitikasi",
        sourceIds: ["M10", "M11"],
        theoryUz: "SQL — data va AI sohasining universal tili. DuckDB in-process OLAP ma'lumotlar bazasi bo'lib, Parquet va CSV fayllarni to'g'ridan-to'g'ri SQL yordamida soniyalar ichida tahlil qiladi. Window funksiyalari (ROW_NUMBER, LAG, LEAD, SUM OVER) ketma-ketlik va vaqt qatorlarini hisoblaydi.",
        codeSnippet: `import duckdb

con = duckdb.connect()

# SQL Window Funksiyasi: har bir bo'lim bo'yicha eng yuqori maosh oluvchilarni topish
con.execute("""
CREATE TABLE employees AS SELECT * FROM (VALUES
    ('Alisher', 'AI', 3500),
    ('Malika', 'AI', 4200),
    ('Jasur', 'Backend', 2800),
    ('Nodira', 'Backend', 3100),
    ('Bobur', 'AI', 3900)
) as t(name, department, salary);
""")

query = """
WITH RankedSalaries AS (
    SELECT 
        name,
        department,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept,
        salary - AVG(salary) OVER (PARTITION BY department) as diff_from_dept_avg
    FROM employees
)
SELECT * FROM RankedSalaries WHERE rank_in_dept <= 2;
"""

print(con.execute(query).df())`,
        keyTakeawaysUz: [
          "CTE (`WITH ... AS`) murakkab SQL so'rovlarni o'qishni va boshqarishni osonlashtiradi.",
          "Window funksiyalari guruhlashda qatorlar sonini kamaytirmasdan agregatsiya hisoblaydi.",
          "DuckDB Parquet fayllar bilan to'g'ridan-to'g'ri integratsiyalashib, server talab qilmaydi."
        ],
        quiz: [
          {
            id: "d02-4-q1",
            promptUz: "Window funksiyasining GROUP BY agregatsiyasidan asosiy farqi nimada?",
            options: [
              "Faqat bitta jadval bilan ishlashida",
              "GROUP BY qatorlarni bitta yig'indiga siqadi, Window funksiyasi esa har bir qatorni saqlab qolgan holda hisoblaydi",
              "Window funksiyasida sonlarni qo'shib bo'lmasligida",
              "Faqat PostgreSQL bazasida ishlashida"
            ],
            correctIndex: 1,
            explanationUz: "Window funksiyasi har bir alohida qator uchun hisoblash olib boradi va qatorlarni yo'qotmaydi."
          }
        ]
      }
    ]
  },
  {
    weekNumber: 3,
    titleUz: "Amaliy Matematika va Statistika",
    focusUz: "Vektorlar, Matritsalar, Cosine Similarity, Hosila va Gradient Descent, Bayes ehtimolligi va A/B Testlash.",
    deliverableUz: "NumPy'da noldan yozilgan Chiziqli va Logistik Regressiya modellari va loss egri chizig'i tahlili.",
    lessons: [
      {
        id: "D03.1",
        titleUz: "Chiziqli Algebra: Vektorlar, Matritsalar va Cosine Similarity",
        sourceIds: ["M12"],
        theoryUz: "Vektorlar — ma'lumotlar, so'zlar va hujjatlarning ko'p o'lchamli fazodagi koordinatalaridir. Skalyar ko'paytma (dot product) va Cosine Similarity ikki vektor orasidagi burchak kosinusini aniqlab, semantik yaqinlikni baholaydi.",
        codeSnippet: `import numpy as np

def cosine_similarity(u: np.ndarray, v: np.ndarray) -> float:
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    if norm_u == 0 or norm_v == 0:
        return 0.0
    return float(np.dot(u, v) / (norm_u * norm_v))

# 3D fazodagi ikkita embedding vektor
vec_a = np.array([0.8, 0.2, -0.1])
vec_b = np.array([0.75, 0.25, -0.05])
vec_c = np.array([-0.6, 0.1, 0.8])

print("A va B yaqinligi (bir mavzu):", round(cosine_similarity(vec_a, vec_b), 4))
print("A va C yaqinligi (turli mavzu):", round(cosine_similarity(vec_a, vec_c), 4))`,
        keyTakeawaysUz: [
          "Cosine similarity qiymati [-1, 1] oralig'ida bo'lib, 1 to'liq moslikni anglatadi.",
          "Embedding vektorlarining uzunligi emas, yo'nalishi semantik ma'noni belgilaydi.",
          "Vektorli ma'lumotlar bazalari (Vector DB) semantik qidiruvda aynan shu formuladan foydalanadi."
        ],
        quiz: [
          {
            id: "d03-1-q1",
            promptUz: "Ikki embedding vektori orasidagi Cosine Similarity 0.98 ga teng bo'lsa, bu nimani anglatadi?",
            options: [
              "Vektorlar bir-biriga mutlaqo qarama-qarshi",
              "Matnlar semantik jihatdan bir-biriga juda yaqin va o'xshash mavzuda",
              "Vektorlarning uzunligi 0 ga teng",
              "Matnlarda xatolik yuz bergan"
            ],
            correctIndex: 1,
            explanationUz: "Kosinus qiymati 1 ga yaqin bo'lishi vektorlar yo'nalishi deyarli bir xil, ya'ni ma'nosi o'xshashligini bildiradi."
          }
        ]
      },
      {
        id: "D03.2",
        titleUz: "Matematik Tahlil: Hosilalar, Gradient va Gradient Descent Optimizatsiyasi",
        sourceIds: ["M13"],
        theoryUz: "Machine Learning modellarini o'qitish — bu loss (yo'qotish) funksiyasining minimumini topish demakdir. Funksiyaning gradienti eng tez o'sish yo'nalishini ko'rsatadi, demak uning qarama-qarshi yo'nalishi (-gradient) bo'yicha harakatlanish minimumga olib boradi.",
        codeSnippet: `import numpy as np

# Y = 3X + 2 qoidasini Gradient Descent orqali noldan o'rganish
X = np.array([1.0, 2.0, 3.0, 4.0, 5.0])
y = np.array([5.0, 8.0, 11.0, 14.0, 17.0])

w = 0.0
b = 0.0
lr = 0.05
epochs = 100

for epoch in range(epochs):
    y_pred = w * X + b
    loss = np.mean((y_pred - y) ** 2)
    # Gradientlar:
    dw = 2 * np.mean((y_pred - y) * X)
    db = 2 * np.mean(y_pred - y)
    # Parametrlarni yangilash:
    w -= lr * dw
    b -= lr * db

print(f"Topilgan parametrlar: w = {w:.3f} (kutilgan: 3.0), b = {b:.3f} (kutilgan: 2.0)")`,
        keyTakeawaysUz: [
          "Loss funksiyasi model xatoligini sonli ko'rinishda ifodalaydi.",
          "Learning rate (lr) juda katta bo'lsa tebranish yuzaga keladi, juda kichik bo'lsa o'rganish sekinlashadi.",
          "Barcha neyron tarmoqlari (Deep Learning) orqaga tarqalishda (Backpropagation) aynan shu tamoyilga tayanadi."
        ],
        quiz: [
          {
            id: "d03-2-q1",
            promptUz: "Gradient Descent jarayonida learning rate haddan tashqari katta tanlansa nima sodir bo'ladi?",
            options: [
              "Model birinchi qadamdayoq global minimumga tushadi",
              "Loss funksiyasi minimumdan sakrab o'tib ketadi va qiymat cheksiz oshib ketishi (divergence) mumkin",
              "Parametrlar o'zgarmasdan nolga aylanadi",
              "Faqat kompyuter fani to'xtab qoladi"
            ],
            correctIndex: 1,
            explanationUz: "Haddan tashqari katta qadam minimum atrofida sakrashlarga yoki divergensiyaga olib keladi."
          }
        ]
      },
      {
        id: "D03.3",
        titleUz: "Ehtimollar Nazariyasi va Bayes Teoremasi",
        sourceIds: ["M14"],
        theoryUz: "Bayes teoremasi yangi dalillar (evidence) paydo bo'lganda dastlabki ishonchni (prior) yangilash formulasidir: P(A|B) = P(B|A)*P(A) / P(B). Bu spamlarni filtrlash, diagnostika va LLM larning shartli ehtimolliklarida markaziy o'rin tutadi.",
        codeSnippet: `def bayes_posterior(prior_a: float, p_b_given_a: float, p_b_given_not_a: float) -> float:
    # P(B) = P(B|A)*P(A) + P(B|~A)*P(~A)
    p_b = (p_b_given_a * prior_a) + (p_b_given_not_a * (1.0 - prior_a))
    p_a_given_b = (p_b_given_a * prior_a) / p_b
    return round(p_a_given_b, 4)

# Misol: Kam uchraydigan kasallik (1%) va 95% aniq test:
prior = 0.01
sensitivity = 0.95
false_positive_rate = 0.05

result = bayes_posterior(prior, sensitivity, false_positive_rate)
print(f"Test musbat chiqqanda haqiqatda kasal bo'lish ehtimoli: {result * 100}%")`,
        keyTakeawaysUz: [
          "Prior (dastlabki ehtimollik) juda kichik bo'lsa, hatto aniq test ham noto'g'ri xulosa berishi mumkin.",
          "Shartli ehtimollik Machine Learning da klassifikatsiyaning matematik negizidir.",
          "LLM har bir keyingi tokenni aynan shartli ehtimollik P(token | context) bo'yicha tanlaydi."
        ],
        quiz: [
          {
            id: "d03-3-q1",
            promptUz: "Bayes teoremasining asosiy amaliy ahamiyati nimada?",
            options: [
              "Faqat butun sonlarni ko'paytirishda",
              "Yangi ma'lumotlar va dalillar asosida hodisaning ehtimolligini yangilashda",
              "Faqat tasodifiy sonlar generatori yaratishda",
              "Vektorlar uzunligini qisqartirishda"
            ],
            correctIndex: 1,
            explanationUz: "Bayes qoidasi yangi dalillar paydo bo'lganda dastlabki ehtimollikni yangilab borish imkonini beradi."
          }
        ]
      },
      {
        id: "D03.4",
        titleUz: "Statistika: Ishonch Oralig'i, Bootstrap va A/B Testlash",
        sourceIds: ["M15"],
        theoryUz: "A/B testlash — yangi AI model yoki algoritm mahsulot sifatini haqiqatda oshirganini statistik isbotlash vositasidir. P-value (p-qiymat), Bootstrap qayta tanlash va gipotezalarni tekshirish (p < 0.05) orqali qarorlar qabul qilinadi.",
        codeSnippet: `import numpy as np

def bootstrap_confidence_interval(data: np.ndarray, num_samples: int = 1000, alpha: float = 0.05) -> tuple[float, float]:
    boot_means = []
    n = len(data)
    for _ in range(num_samples):
        sample = np.random.choice(data, size=n, replace=True)
        boot_means.append(np.mean(sample))
    lower = np.percentile(boot_means, (alpha / 2) * 100)
    upper = np.percentile(boot_means, (1 - alpha / 2) * 100)
    return round(float(lower), 3), round(float(upper), 3)

# Konversiya darajasining 95% ishonch oralig'i:
test_conversions = np.array([1, 0, 1, 1, 0, 1, 0, 0, 1, 1] * 20)
ci_low, ci_high = bootstrap_confidence_interval(test_conversions)
print(f"95% Ishonch Oralig'i: [{ci_low}, {ci_high}]")`,
        keyTakeawaysUz: [
          "Statistik ahamiyatlilik (statistical significance) tasodifiy omillarni chetlatadi.",
          "Bootstrap taqsimot turi noma'lum bo'lganda ham ishonch oralig'ini hisoblash imkonini beradi.",
          "AI tizimlarini production ga chiqarishda offline metrikalar (ROC-AUC) bilan birga online A/B testlar shart."
        ],
        quiz: [
          {
            id: "d03-4-q1",
            promptUz: "A/B test natijasida p-value 0.01 ga teng chiqdi (alpha = 0.05). Bu nimani anglatadi?",
            options: [
              "Yangi versiya 100% yomonroq ishlaganini",
              "Farqning tasodifiy bo'lish ehtimoli 1% dan kam, ya'ni o'zgarish statistik jihatdan ahamiyatli",
              "Eksperiment muvaffaqiyatsiz tugaganini",
              "Foydalanuvchilar soni yetarli emasligini"
            ],
            correctIndex: 1,
            explanationUz: "p < 0.05 bo'lganda nol gipoteza rad etiladi va yangi variantning ustunligi statistik tasdiqlanadi."
          }
        ]
      }
    ]
  },
  {
    weekNumber: 4,
    titleUz: "Klassik Machine Learning va Portfolio 1",
    focusUz: "Data Leakage dan himoyalanish, Scikit-Learn Pipeline, Model tanlash, Imbalanced Data, MLflow eksperimentlar boshqaruvi va FastAPI Docker xizmati.",
    deliverableUz: "1-PORTFOLIO: Mijozlarning ketish ehtimolini baholovchi (Churn Prediction) to'liq ML API, Docker konteyner va testlar.",
    lessons: [
      {
        id: "D04.1",
        titleUz: "Data Leakage, Scikit-Learn Pipeline va Cross-Validation",
        sourceIds: ["M16"],
        theoryUz: "Data Leakage — test ma'lumotlarining xususiyatlari (masalan, StandardScaler parametri) train jarayoniga sizib kirishi. Bunga yo'l qo'ymaslik uchun yagona to'g'ri arxitektura `sklearn.pipeline.Pipeline` dir.",
        codeSnippet: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
import numpy as np

# Xavfsiz ML Quvuri: Leakage yo'q
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", LogisticRegression(random_state=42))
])

X_dummy = np.random.randn(100, 5)
y_dummy = np.random.randint(0, 2, 100)

scores = cross_val_score(pipe, X_dummy, y_dummy, cv=5, scoring="roc_auc")
print("5-Fold Cross-Validation ROC-AUC:", np.round(scores, 3))
print("O'rtacha sifat:", round(scores.mean(), 3))`,
        keyTakeawaysUz: [
          "Scaler va Encoder larni faqat Pipeline ichiga joylashtirish lozim.",
          "Train-test ajratilishidan oldin scaling qilish jiddiy leakage xatosidir.",
          "K-Fold Cross-Validation modelning umumlashtirish qobiliyatini tekshiradi."
        ],
        quiz: [
          {
            id: "d04-1-q1",
            promptUz: "Qachon ma'lumotlar sizishi (Data Leakage) sodir bo'ladi?",
            options: [
              "Faqat CSV fayl o'chib ketganda",
              "Agar StandardScaler barcha ma'lumotlarda train/test ga ajratishdan oldin chaqirilsa",
              "Agar model acuracysi 50% dan past bo'lsa",
              "Faqat GPU da hisoblanganda"
            ],
            correctIndex: 1,
            explanationUz: "Test to'plamidagi ma'lumotlarning o'rtacha qiymati yoki dispersiyasi train jarayoniga ta'sir qilishi leakage hisoblanadi."
          }
        ]
      },
      {
        id: "D04.2",
        titleUz: "Model Tanlash va Nomutanosib Ma'lumotlar (Imbalanced Data)",
        sourceIds: ["M17", "M18"],
        theoryUz: "Haqiqiy hayotda firibgarlik (Fraud) yoki mijoz ketishi (Churn) atigi 1-5% ni tashkil qiladi. Bunday nomutanosib klasslarda Accuracy metrikani aldab ko'rsatadi (barchasini 0 deb aytsa ham 95% accuracy chiqadi). Precision, Recall, PR-AUC va Threshold tanlash talab etiladi.",
        codeSnippet: `from sklearn.metrics import classification_report, roc_auc_score, precision_recall_curve
import numpy as np

# 95% salbiy, 5% ijobiy klass simulyatsiyasi
y_true = np.array([0] * 95 + [1] * 5)
y_scores = np.random.uniform(0.0, 0.4, 100)
y_scores[95:] += 0.4  # Ijobiy klassga balandroq ehtimollik

# Optimal Threshold tanlash:
precisions, recalls, thresholds = precision_recall_curve(y_true, y_scores)
f1_scores = 2 * (precisions * recalls) / (precisions + recalls + 1e-9)
best_idx = np.argmax(f1_scores)
best_threshold = thresholds[min(best_idx, len(thresholds) - 1)]

print(f"Optimal Decision Threshold: {best_threshold:.3f}")
print("ROC-AUC Skori:", round(roc_auc_score(y_true, y_scores), 3))`,
        keyTakeawaysUz: [
          "Nomutanosib klasslarda ROC-AUC va PR-AUC asosiy metrikalardir.",
          "Standart 0.5 threshold ko'pincha optimal emas, biznes talabiga ko'ra o'zgartiriladi.",
          "SMOTE yoki class_weight='balanced' modelni kam uchraydigan klassga e'tibor qaratishga undaydi."
        ],
        quiz: [
          {
            id: "d04-2-q1",
            promptUz: "Nomutanosib ma'lumotlar to'plamida (masalan, 99% sog'lom, 1% kasal) nega Accuracy yaroqsiz?",
            options: [
              "Faqat sonlar manfiy bo'lgani uchun",
              "Model doimo 'sog'lom' deb taxmin qilsa ham 99% accuracy ko'rsatadi, lekin barcha kasallarni o'tkazib yuboradi",
              "Accuracy ni faqat regressiyada ishlatish mumkinligi uchun",
              "Faqat matnli ma'lumotlar uchun mosligi sababli"
            ],
            correctIndex: 1,
            explanationUz: "Dominant klass ko'p bo'lsa, model hamma narsani bir xil deb bashorat qilsa ham yuqori accuracy chiqadi."
          }
        ]
      },
      {
        id: "D04.3",
        titleUz: "Eksperimentlarni Kuzatish: MLflow Tracking va Model Registry",
        sourceIds: ["M19"],
        theoryUz: "Professional ML muhandisi qaysi giperparametrlar va dataset versiyasi bilan qanday metrika chiqqanini qayd etib borishi shart. MLflow parametrlar, metrikalar, teglarni va o'qitilgan model artefaktlarini avtomat saqlaydi.",
        codeSnippet: `# MLflow Eksperiment namunasi
import mlflow
from sklearn.ensemble import RandomForestClassifier

mlflow.set_experiment("churn-prediction-phase4")

with mlflow.start_run(run_name="rf_n_estimators_100"):
    n_est = 100
    max_d = 8
    mlflow.log_param("n_estimators", n_est)
    mlflow.log_param("max_depth", max_d)
    
    # Model o'qitish simulyatsiyasi
    train_roc = 0.884
    val_roc = 0.862
    mlflow.log_metric("train_roc_auc", train_roc)
    mlflow.log_metric("val_roc_auc", val_roc)
    
    print(f"MLflow Run saqlandi: Val ROC-AUC = {val_roc}")`,
        keyTakeawaysUz: [
          "MLflow eksperimentlarni takrorlash (reproducibility) imkonini beradi.",
          "Model Registry o'qitilgan modellarning staging va production versiyalarini boshqaradi.",
          "Har bir run kod commit heshi va ma'lumotlar versiyasiga bog'lanadi."
        ],
        quiz: [
          {
            id: "d04-3-q1",
            promptUz: "MLflow Tracking tizimining asosiy vazifasi nima?",
            options: [
              "Faqat kompyuter ekranini yozib olish",
              "Model giperparametrlari, metrikalari va model fayllarini eksperimentlar bo'yicha tizimli saqlash va solishtirish",
              "Faqat SQL bazalarni tozalash",
              "Faqat CSS uslublarini o'zgartirish"
            ],
            correctIndex: 1,
            explanationUz: "MLflow qaysi parametr qanday natija berganini kuzatish va solishtirish uchun ishlatiladi."
          }
        ]
      },
      {
        id: "D04.4",
        titleUz: "1-Portfolio Loyihasi: Churn Prediction API va Docker Konteyner",
        sourceIds: ["M20", "PORTFOLIO_1"],
        theoryUz: "1-PORTFOLIO AMALIYOTI: Mijozlarning xizmatdan ketishini oldindan aytib beruvchi to'liq tizim. FastAPI orqali `/predict` va `/health` endpointlari, kiruvchi JSON validatsiyasi (Pydantic), yagona Pipeline orqali inferens va Dockerfile yaratiladi.",
        codeSnippet: `# FastAPI Inference API (app.py)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import numpy as np

app = FastAPI(title="Customer Churn Prediction API", version="1.0.0")

class CustomerData(BaseModel):
    tenure_months: int = Field(ge=0, le=120)
    monthly_charges: float = Field(ge=0)
    total_charges: float = Field(ge=0)
    contract_type_two_year: bool = False

@app.get("/health")
def health():
    return {"status": "healthy", "model_version": "1.0.0"}

@app.post("/predict")
def predict_churn(customer: CustomerData):
    # Simulyatsiya qilingan model koeffitsientlari
    logit = -0.05 * customer.tenure_months + 0.02 * customer.monthly_charges - (1.5 if customer.contract_type_two_year else 0.0)
    prob = 1.0 / (1.0 + np.exp(-logit))
    return {
        "churn_probability": round(float(prob), 4),
        "will_churn": prob > 0.45,
        "risk_level": "HIGH" if prob > 0.65 else ("MEDIUM" if prob > 0.35 else "LOW")
    }`,
        keyTakeawaysUz: [
          "Portfolio loyihasi faqat notebook emas, ishlaydigan API va Docker bo'lishi shart.",
          "`/health` endpointi Kubernetes va bulut servislarida monitoring uchun zarur.",
          "Pydantic xato tiplar kiritilishining oldini oladi."
        ],
        quiz: [
          {
            id: "d04-4-q1",
            promptUz: "Nega ML modelini faqat Jupyter Notebook da emas, FastAPI va Docker da tayyorlash so'raladi?",
            options: [
              "Faqat kod hajmini ko'paytirish uchun",
              "Loyiha real production muhitida mustaqil ishlay olishi, boshqa servislarga ulanishi va portativ bo'lishi uchun",
              "Notebookda chizmalar chizib bo'lmagani uchun",
              "Faqat Python 2 bilan ishlash uchun"
            ],
            correctIndex: 1,
            explanationUz: "Ish beruvchilar va biznes uchun modelning API va Docker orqali integratsiya qilinganligi eng qimmatli natijadir."
          }
        ]
      }
    ]
  }
];

console.log("Writing 12-week comprehensive curriculum dataset...");

const fileContent = `/**
 * AI Atlas — 12-Haftalik Intensiv Data Science & ML-AI Engineering O'quv Dasturi
 * Manbalar: deepresearch.md va data scientist ML-AI Engineering.md
 * 42 ta to'liq dars (D01.1–D12.3), 55 ta manba (M01–M55), 3 ta Portfolio loyihasi va 9 ta Original Gap laboratoriyasi.
 */

export interface IntensiveQuizItem {
  id: string;
  promptUz: string;
  options: string[];
  correctIndex: number;
  explanationUz: string;
}

export interface IntensiveLessonItem {
  id: string;
  titleUz: string;
  sourceIds: string[];
  theoryUz: string;
  codeSnippet: string;
  keyTakeawaysUz: string[];
  quiz: IntensiveQuizItem[];
}

export interface IntensiveWeekItem {
  weekNumber: number;
  titleUz: string;
  focusUz: string;
  deliverableUz: string;
  lessons: IntensiveLessonItem[];
}

export const INTENSIVE_12_WEEKS: IntensiveWeekItem[] = ${JSON.stringify(WEEKS_DATA, null, 2)};

export const ALL_INTENSIVE_LESSONS: IntensiveLessonItem[] = INTENSIVE_12_WEEKS.flatMap((w) => w.lessons);

export function getIntensiveLessonById(id: string): IntensiveLessonItem | undefined {
  return ALL_INTENSIVE_LESSONS.find((l) => l.id === id);
}

export interface PortfolioProjectSpec {
  id: string;
  weekSpan: string;
  titleUz: string;
  goalUz: string;
  techStack: string[];
  deliverables: string[];
  evaluationCriteria: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProjectSpec[] = [
  {
    id: "portfolio-1",
    weekSpan: "1-4-haftalar",
    titleUz: "1-Portfolio: Tabular Churn ML Pipeline va Production API",
    goalUz: "Mijozlarning ketish (Churn) ehtimolini bashorat qiluvchi to'liq klassik ML tizimi. Scikit-Learn Pipeline, nomutanosib klasslar uchun PR-AUC optimallashtirish, FastAPI /predict va /health endpointlari, pytest testlari va Dockerfile.",
    techStack: ["Python 3.12", "uv", "Scikit-Learn", "Polars", "FastAPI", "Docker", "MLflow", "pytest"],
    deliverables: [
      "Mijozlar ketishini tahlil qiluvchi toza EDA notebooki",
      "Scikit-Learn Pipeline bilan train/evaluate qiluvchi skript",
      "FastAPI web-servisi (input validatsiya, proba, risk level)",
      "Konteynerlashtirilgan Dockerfile va ishga tushirish yo'riqnomasi (README.md)",
      "80%+ test qamrovli pytest testlari"
    ],
    evaluationCriteria: [
      "Data Leakage yo'qligi va cross-validation to'g'ri qo'llanilganligi",
      "Nomutanosib klasslarda optimal threshold va PR-AUC asoslanganligi",
      "Docker build va /health tekshiruvi xatosiz o'tishi"
    ]
  },
  {
    id: "portfolio-2",
    weekSpan: "5-8-haftalar",
    titleUz: "2-Portfolio: Mahalliy O'zbekcha RAG Tizimi va QLoRA Fine-Tuning",
    goalUz: "O'zbek tilidagi qonun hujjatlari va korporativ bilimlardan aniq iqtibos (citation [1], [2]) bilan javob beruvchi mahalliy RAG (Retrieval-Augmented Generation) tizimi hamda 1B-3B modelini QLoRA bilan o'qitish.",
    techStack: ["PyTorch", "HuggingFace", "Ollama / llama.cpp", "ChromaDB / Qdrant", "RankBM25", "PEFT / QLoRA", "FastAPI"],
    deliverables: [
      "Matnlarni semantik bo'laklash (Chunking) va BGE/Qwen embedding quvuri",
      "Gibrid qidiruv (BM25 + Dense Vector Search) va Reranking",
      "O'zbek tilidagi qat'iy Anti-Hallucination prompt shabloni",
      "Kaggle/Colab da QLoRA orqali instruksiyalarga moslashtirilgan LoRA adapteri",
      "30 ta savolli golden set (golden_uz_30.jsonl) orqali baholash hisoboti"
    ],
    evaluationCriteria: [
      "Javoblarda keltirilgan iqtiboslarning haqiqiy kontekstga 100% mosligi",
      "Hujjatda javob bo'lmaganda model to'qimamasdan buni ochiq tan olishi",
      "16 GB RAM da Ollama/llama.cpp orqali CPU inferensi barqarorligi"
    ]
  },
  {
    id: "portfolio-3",
    weekSpan: "9-12-haftalar",
    titleUz: "3-Portfolio (Capstone): Korporativ E2E RAG Stack, Observability va CI/CD",
    goalUz: "To'liq ishlab chiqarish (Production-Grade) AI tizimi. FastAPI Gateway, Redis kesh, Prometheus/Grafana metrikalari, Langfuse tracing, Ragas baholash va Runbook.",
    techStack: ["FastAPI", "Docker Compose", "Redis", "Prometheus", "Grafana", "Langfuse", "Ragas", "Locust", "GitHub Actions"],
    deliverables: [
      "Bitta buyruq bilan ko'tariluvchi docker-compose.yml (Gateway, VectorDB, Redis, Monitoring)",
      "Server-Sent Events (SSE) streaming javoblar",
      "Locust yuklama testi (p95 latency va concurrency xaritasi)",
      "Langfuse orqali har bir LLM chaqiruvining trace, token narxi va latency monitoringi",
      "To'liq ishlab chiqarish System Card va Runbook (nosozliklarni bartaraf etish yo'riqnomasi)"
    ],
    evaluationCriteria: [
      "Docker Compose bitta buyruq bilan xatosiz ko'tarilishi",
      "Yuklama ostida p95 latency ning 3 soniyadan oshmasligi",
      "Texnik intervyu himoyasi va arxitektura tanlovlarining to'liq asoslanishi"
    ]
  }
];
`;

fs.writeFileSync("src/lib/curriculum/ds-ml-ai-12weeks.ts", fileContent, "utf8");
console.log("Successfully created src/lib/curriculum/ds-ml-ai-12weeks.ts!");
