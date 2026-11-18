# ML & Data Science — mustaqil o‘quv yo‘nalishlari

> Bu hujjat foydalanuvchi yuborgan ML/DS fayli asosida tuzilgan **yangi kurs dizayni**. Dastlabki manbaning 31 phase va 520 ta dars IDlari `canonical_source_520.json`da o‘zgarmas holatda saqlanadi. Kursdagi yangi fazalar, vazifalar va 50 ta DS mikro-darsi taklif bo‘lib, original manbadan olinmagan.

## Muammoga yechim

- **Machine Learning Engineering:** model training, evaluation, generalization, neural networks va production.
- **Data Science:** business questions, data quality, SQL, EDA, experiment, statistical inference, forecast, visualization va stakeholder communication.
- **Umumiy poydevor:** Python, NumPy, Pandas, matematika va ba’zi model tushunchalari. Canonical dars bir joyda saqlanadi; ikkala yo‘nalish unga havola qiladi.
- **Ajratilgan progress:** phase assessments, mini-projects, completion dashboard va yakuniy sertifikat kursga xos.
- **Ma’lumot va status:** 520 original darsdan 9 tasi `published`. Original `published` yozuvlari o‘zgartirilmaydi; yangi DS darslari `planned`.

## Track 1 — Machine Learning Engineering

| Bosqich | Mavzu | Mikro-dars | Talab | Asosiy loyiha |
|---|---|---:|---|---|
| `mle-01` | Kasb va ML jarayoni | 11 | core | Bir real muammo uchun data → model → evaluation → serve arxitekturasi |
| `mle-02` | Python, SQL va Git | 32 | core | CSV+SQL ma’lumotidan Git bilan boshqarilgan CLI hisobot |
| `mle-03` | NumPy va Pandas | 34 | core | NumPy vektor operatsiyalari va Pandas profiler |
| `mle-04` | Data ingestion, cleaning va EDA | 40 | core | CSV/API import → cleaning audit → taqsimot hisobotlari |
| `mle-05` | Linear algebra, calculus va optimization | 47 | core | NumPy gradient descent va SVD mini-laboratoriyasi |
| `mle-06` | Probability va model statistikasi | 28 | core | Sampling simulyatsiyasi + confidence interval tahlili |
| `mle-07` | Feature engineering va leakage-safe pipeline | 18 | core | sklearn ColumnTransformer + Pipeline |
| `mle-08` | Regression modellari | 18 | core | Ridge/Lasso/Linear Regression benchmark |
| `mle-09` | Classification va algoritmlar | 17 | core | 3 modelni bitta datasetda taqqoslash |
| `mle-10` | Model evaluation | 17 | core | Thresholdga sezgir classifier evaluation report |
| `mle-11` | Validation va tuning | 17 | core | Reproducible CV + Grid/Random Search |
| `mle-12` | Ensemble learning | 16 | core | Random Forest vs Gradient Boosting comparison |
| `mle-13` | Clustering | 16 | core | K-Means va Hierarchical clustering benchmark |
| `mle-14` | PCA va Autoencoder | 16 | core | PCA transform/inverse transform notebook |
| `mle-15` | Time Series Modeling | 14 | elective | Time-series baseline vs ARIMA |
| `mle-16` | Neural Network va Backpropagation | 19 | core | NumPy kichik MLP forward + gradient check |
| `mle-17` | PyTorch / TensorFlow | 17 | core | PyTorch MLP + validation metrics |
| `mle-18` | CNN / Computer Vision | 16 | core | CNN image classifier |
| `mle-19` | RNN, LSTM va Attention | 16 | core | Tiny RNN vs LSTM vs toy Attention |
| `mle-20` | Transformer va NLP | 20 | core | NumPy scaled dot-product attention demo |
| `mle-21` | Reinforcement Learning va XAI | 17 | elective | Q-learning Gridworld va model explanation |
| `mle-22` | MLOps va Production Capstone | 20 | core | End-to-end model API va drift monitoring loyiha |

**Jami:** 22 phase, 466 ta original dars havolasi. Bular original 520 dan tanlangan to‘plam, yangi nusxalar emas.

## Track 2 — Data Science

| Bosqich | Mavzu | Mikro-dars | Talab | Asosiy loyiha |
|---|---|---:|---|---|
| `ds-01` | Data Scientist kasbi va tahliliy fikrlash | 14 | core | Business problem + analytical question charter |
| `ds-02` | Python va Jupyter asoslari | 19 | core | Notebook + CSV statistikasi |
| `ds-03` | SQL, Git va relational data | 16 | core | SQL analitik report va Git README |
| `ds-04` | Biznes savol va KPI dizayni | 10 | core | Metric spec va metric tree |
| `ds-05` | Advanced SQL for Analytics | 10 | core | SQL cohort report |
| `ds-06` | Data collection va provenance | 15 | core | CSV+API+SQL → normalized schema |
| `ds-07` | NumPy, Pandas va grafiklar | 34 | core | Exploratory dataset profile notebook |
| `ds-08` | Data cleaning va sifat nazorati | 16 | core | Before/after cleaning quality report |
| `ds-09` | Exploratory Data Analysis (EDA) | 16 | core | Decision-oriented EDA memo |
| `ds-10` | Data Storytelling va Dashboard | 10 | core | Executive dashboard va findings memo |
| `ds-11` | Matematika Data Science uchun | 40 | supporting | PCA asoslari + gradient illustration |
| `ds-12` | Probability va distributions | 16 | core | Monte Carlo statistika notebook |
| `ds-13` | Statistical inference | 17 | core | Ikki guruhga hypothesis testing report |
| `ds-14` | Causal Thinking va Observational Analysis | 10 | advanced | Observed effect vs causal claims analysis |
| `ds-15` | A/B Testing | 16 | core | A/B test analysis report |
| `ds-16` | Advanced Experiments | 16 | advanced | CUPED toy experiment comparison |
| `ds-17` | Preprocessing va Feature Engineering | 18 | core | Leakage-safe sklearn pipeline |
| `ds-18` | Predictive analytics | 32 | core | Sales forecast baseline + churn classification |
| `ds-19` | Model evaluation va validation | 33 | core | Threshold, CV va test-set based review |
| `ds-20` | Segmentation va Dimensionality Reduction | 29 | core | Customer segmentation with PCA chart |
| `ds-21` | Forecasting va Time Series | 18 | core | Weekly demand forecasting report |
| `ds-22` | Interpretability va monitoring | 11 | supporting | Data drift va feature-importance limitation memo |
| `ds-23` | Data Science Capstone | 10 | core | Full stakeholder-ready data science portfolio |

**Jami:** 23 phase, 426 dars havolasi, shulardan 50 tasi yangi tavsiya qilingan DS darslari.

## Kurslar orasida mavzu qaytarilishini oldini olish

- Bir xil lesson `mlds-xx-yy` ikki trackda ochilishi mumkin, lekin DBda bitta `canonical_lesson_id` ishlatiladi.
- Shared theory va kod namunasi bir marta saqlanadi; kursga xos alohida quiz, case-study va assessment bo‘ladi.
- Python Academy o‘tilgan bo‘lsa, tegishli prerequisite uchun o‘rganilgan statusni ko‘rsatish mumkin; avtomatik skip foydalanuvchi tanlovi/diagnostikaga bog‘liq.
- AI Engineering Academy bog‘lanishlari “related learning” sifatida, majburiy prerequisite sifatida emas.
- Barcha identifikatorlar va holatlar migrationdan oldin exact-match auditdan o‘tsin.

## Har bir mikro-dars standartlari (implementatsiya uchun talab)

1. 200–450 so‘zli uzbekcha tushuntirish; qisqa, aniq va zarur nazariyani qamrab olsin. Bu hajm talab, hali yaratilgan kontent emas.
2. 2 ta real, ishlaydigan kod namunasi: (a) oddiy, (b) edge-case yoki real datasetga yaqin.
3. 3 ta nazariy/debugging savol, 2 ta mustaqil coding/data analysis amaliyoti; yechim darhol ochilmasin.
4. Test cases: normal, edge, invalid va (ML uchun) leakage; (DS uchun) aggregation/denominator/uncertainty checks.
5. Manba va kelib chiqishi (old ID + source section), vizual laboratoriya reference, va related lesson.
6. AI tutor: hint1 → hint2 → pseudocode; to‘liq yechim faqat foydalanuvchi so‘raganda yoki urinishlardan keyin.

## Mini-projectlar uchun qabul mezonlari

- Input schema va dataset provenance aniq.
- Noto‘g‘ri yoki bo‘sh ma’lumotda xatolik chiroyli qaytariladi.
- Reproducibility: seed, dependency, steps va output.
- Kod va hisobot alohida baholanadi; ML modeli uchun leakage/checkpoint, DS uchun metrics/stakeholder interpretation.
- Fake model score, synthetic real-world evidence, ishlab chiqilmagan demo “completed” deb ko‘rsatilmaydi.

## Rasmlar va vizual laboratoriyalar

Yuborgan matnda rasm fayllari yoki rasm havolalari yo‘q. Asl muallif vizualini ko‘chirish rejalashtirilmaydi; original SVG/Canvas/React laboratoriyalarni mustaqil yaratish uchun phase-level spec bor. Tashqi vizual uchun huquq va atributsiya tekshirilsin.

## Implementatsiya tartibi

1. Faqat READ-ONLY: mavjud lessons/DB schema va published contentni audit qilish.
2. Canonical import oldindan diff qilib, original `mlds-*` yozuvlari ko‘chirilmaydigan qatlam sifatida saqlanishi.
3. Yangi track/phase navigation va canonical foreign-key mapping qo‘shish.
4. ML va DS uchun 1 tadan pilot phase (masalan `mle-08` va `ds-07`) yaratish.
5. Unik kontent qo‘shilmasdan oldin permission, revision, test, licensing va progress tekshirilsin.
6. DS extensionlarni `dsx-*` bilan alohida content-origin sifatida create qilish.
7. Barcha phase va laboratoriyalarni e2e testdan o‘tkazish; prodga chiqmaslik.

## Cross-track example

`mlds-17-08` (MSE) ML yo‘lida regression loss, Data Science yo‘lida forecast error yoki model reporting kontekstida ochilishi mumkin. Canonical lesson matni bir xil, lekin course-specific assignment boshqacha.

## Muhim farqlash

**Original source:** `mlds-*` IDs, nomlar, published/planned, 31 original phase mini-projectlari, vizual descriptions. **Yangi taklif:** `mle-*`, `ds-*` navigatsion fazalar, `dsx-*` 50 ta qo‘shimcha dars, baholash rubrikalari, laboratoriya implementatsiya spetsifikatsiyasi.

### Scope nazorati

Data Science uchun `dsx-*` bo‘lgan 50 ta dars va ularga tegishli 5 ta phase **ixtiyoriy kengaytma**. Kursni faqat dastlabki 520 darsga asoslangan qilib ochish mumkin. Qo‘shimcha DS darslarini yaratish yoki import qilishdan oldin alohida ruxsat olinishi kerak.
