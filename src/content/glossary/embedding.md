---
id: embedding
term: "Embedding"
translation: "Vektorli tasvir"
category: "LLM & Generative AI"
level: "beginner"
aliases: ["Vector Embeddings", "Contextual Embeddings", "Dense Vectors"]
related: ["vector", "cosine-similarity", "transformer", "rag"]
lessons: ["embeddings", "vector"]
sources: ["vaswani-2017"]
simpleDefinition: "So'z, gap yoki boshqa ob'ektni kompyuter matematik hisoblay oladigan va ma'no yaqinligini aks ettiruvchi sonli vektorga aylantirish usuli."
example: "Matn: 'Mushuk' → [0.82, -0.15, 0.64], 'Kuchuk' → [0.80, -0.12, 0.61]. Ma'nosi yaqin bo'lgani uchun vektorlari fazoda bir-biriga juda yaqin joylashadi."
technicalExplanation: "Diskret tokenlarni uzluksiz past o'lchamli fazoga (R^{d_{\\text{model}}}) akslantiruvchi o'rganiladigan matritsa. Semantik bog'liqlik skalyar ko'paytma va burchak kosinusi orqali o'lchanadi."
formula: "\\mathbf{e}_i = \\mathbf{x}_i \\mathbf{W}_E, \\quad \\mathbf{e}_i \\in \\mathbb{R}^{d_{\\text{model}}}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Embedding — matn, tasvir yoki audio kabi diskret tushunchalarni semantik fazoda uzluksiz sonli vektorlar ko'rinishida ifodalaydi.