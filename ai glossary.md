# AI Glossary — Interactive Knowledge Dictionary

You are a Senior Next.js Developer, Educational UX Designer, and AI Knowledge Architect.

Improve the existing `/glossary` page of my AI Learning Platform.

DO NOT rebuild the project.

## Objective

Create a beginner-friendly, searchable, interactive AI terminology dictionary integrated with the existing six learning paths.

## Requirements

1. Build a clean glossary homepage with a search bar, category filters, and alphabetic navigation.
2. Reuse existing curriculum and research terminology. Do not generate fake definitions or citations.
3. Each terminology entry must contain:
   - English term
   - Uzbek explanation
   - Short beginner-friendly definition
   - Real-world example where supported
   - Technical explanation
   - Optional mathematical formula
   - Related concepts
   - Related lessons
   - Sources when available
   - Optional Manim/React visualization
4. Use progressive disclosure. Show the simple definition first, then reveal technical details.
5. Support clicking glossary terms directly inside MDX lessons without leaving the current lesson.
6. Open a lightweight definition popover with a link to the full glossary entry.
7. Automatically link related terms using canonical curriculum IDs.
8. Support Uzbek explanations while preserving English technical terminology.
9. Implement fuzzy search with keyboard-friendly interactions.
10. Keep the design simple, responsive, and consistent with the existing dark/light theme.
11. Support visualizations for mathematical and architectural concepts where appropriate.
12. Reuse existing lessons across learning paths instead of creating duplicates.
13. Only show published, verified definitions to students.
14. Do not invent educational sources, formulas, or model outputs.
15. Preserve the existing website architecture and user progress.

## UI Structure

- Search
- Topic/category filters
- Alphabetical term index
- Term cards
- Simple definition preview
- Detailed term view
- Related concepts
- Related lesson links

## Content Model

Use a type-safe glossary registry that references existing canonical lesson IDs.

Each entry should have a stable unique ID, slug, category, source references, and publication status.

Make all glossary entries data-driven.

## Implementation Order

1. Inspect existing glossary and content systems.
2. Define a normalized glossary schema.
3. Build the search and filter experience.
4. Build the term detail component.
5. Add MDX inline terminology popovers.
6. Connect terms to existing lessons and visualizations.
7. Import verified terms from available curriculum documents.
8. Validate links, definitions, responsiveness, and accessibility.

## Final Goal

A beginner should be able to understand an unfamiliar AI term within 15–30 seconds, then optionally explore its technical details and related learning materials.

The glossary must function as a learning aid, not as a separate duplicate course.


1. Glossariy bosh sahifasi
AI Glossariysi
Murakkab AI terminlarini sodda tushuntirishlar, misollar va vizualizatsiyalar orqali o‘rganing.




BarchasiLLMMachine LearningMatematikaAI EngineerData EngineerPrompt EngineeringAsosiy

Namuna lug‘at — 10 ta atama topildi
Artificial IntelligenceKompyuter tizimlarining odatda inson aqli bilan bog‘liq vazifalarni bajarishiga imkon beradigan soha.Machine LearningMa'lumotlardan qonuniyatlarni o‘rganib, bashorat yoki qaror chiqarishga yordam beruvchi usullar.Gradient DescentFunksiyaning qiymatini kamaytirish uchun parametrlarni gradientga qarama-qarshi yo‘nalishda yangilash usuli.TokenModel matnni qayta ishlashda foydalanadigan birlik. So‘z, so‘z bo‘lagi yoki belgi bo‘lishi mumkin.EmbeddingToken yoki boshqa ma’lumotni sonli vektor orqali ifodalash usuli.LLMBatafsil darsga bog‘lanadiSelf-AttentionTokenlar o‘rtasidagi bog‘liqlikni attention vaznlari yordamida hisoblaydigan mexanizm.RAGJavob yaratishdan oldin tashqi manbalardan tegishli ma'lumotlarni topib, model kontekstiga qo‘shish arxitekturasi.ETLMa'lumotlarni olish, o‘zgartirish va belgilangan tizimga yuklash jarayoni.PrecisionModel musbat deb belgilagan natijalarning qanchasi haqiqatda musbat ekanini ko‘rsatuvchi metrika.TemperatureModel token tanlash ehtimollarining taqsimotini boshqaradigan sampling parametri.

2. Har bir termin ichida nimalar bo‘lishi kerak?
Masalan, foydalanuvchi Embedding atamasini ochdi.
Embedding
LLM • Vector Representation
Boshlang‘ich

Oddiy tushuntirish

Embedding — so‘z, gap yoki boshqa ma'lumotni kompyuter matematik hisoblay oladigan sonli vektorga aylantirish usuli.

Vizual misol
Mushuk
Matn
[0.8, 0.2, 0.6]
Vektor

Soddalashtirilgan o‘quv misoli. Vektor qiymatlari haqiqiy modeldan olinmagan.
Chuqurroq o‘rganish

O‘quvchi xohlasa, vektorlarning geometrik yaqinligi, cosine similarity va embedding modellari haqida batafsil darsga o‘tadi.
Vector
Cosine Similarity
Semantic Search


3. Qaysi kategoriyalarni qo‘shamiz?
Kategoriya	Terminlarga misollar
AI asoslari	AI, AGI, Inference, Training
Python	Variable, Function, Iterator, Decorator
Matematika	Vector, Matrix, Gradient, Derivative
Machine Learning	Regression, Classificatm   m ion, Overfitting
Deep Learning	Neuron, Loss, Backpropagation, CNN
LLM & Generative AI	Transformer, Token, Embedding, Attention
AI Engineer	RAG, Vector DB, Agent, MCP
Data Science	EDA, p-value, A/B Testing, CUPED
Data Engineering	ETL, ELT, Kafka, Spark, Airflow
Prompt Engineering	Zero-Shot, Few-Shot, Temperature 