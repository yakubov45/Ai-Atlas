---
id: cosine-similarity
term: "Cosine Similarity"
translation: "Kosinus o'xshashligi"
category: "Matematika"
level: "beginner"
aliases: ["Vektorlar burchagi", "Burchak kosinusi"]
related: ["vector", "embedding", "rag"]
lessons: ["vector", "embeddings"]
sources: ["vaswani-2017"]
simpleDefinition: "Ikki vektor orasidagi burchak kosinusi orqali ularning ma'no jihatdan qanchalik bir xil yo'nalishda ekanini o'lchovchi mezon (-1 dan 1 gacha)."
example: "Bir xil yo'nalishdagi so'zlar uchun kosinus 1 ga teng (o'xshash), perpendikulyar bo'lsa 0 (bog'liq emas), teskari bo'lsa -1."
technicalExplanation: "Skalyar ko'paytmani vektorlarning Evklid uzunliklari ko'paytmasiga bo'lish orqali vektorlar kattaligiga bog'liq bo'lmagan yo'nalish o'xshashligini hisoblash."
formula: "\\cos(\\theta) = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Kosinus o'xshashligi semantik qidiruv, tavsiya tizimlari va RAG arxitekturalarida eng mos matnlarni topish uchun standart mezon hisoblanadi.