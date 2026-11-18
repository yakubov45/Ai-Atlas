---
id: rag
term: "Retrieval-Augmented Generation (RAG)"
translation: "Qidiruv bilan boyitilgan generatsiya"
category: "AI Engineer"
level: "intermediate"
aliases: ["RAG", "Vektor qidiruvli generatsiya"]
related: ["llm", "embedding", "ai-agent", "cosine-similarity"]
lessons: ["rag", "embeddings"]
sources: ["lewis-2020"]
simpleDefinition: "Model o'z bilmagan narsasini to'qib chiqarmasligi uchun javob berishdan oldin kompaniya hujjatlaridan kerakli ma'lumotni topib, uning kontekstiga qo'shish usuli."
example: "Kompaniya xodimi ichki siyosat haqida so'raganda, tizim avval 100 betlik PDF qo'llanmadan tegishli moddani topadi va modelga havola bilan javob yozdiradi."
technicalExplanation: "Vektor bazasidagi semantik qidiruv (retrieval) va generativ model kontekstini birlashtiruvchi, gallyutsinatsiyani keskin kamaytiruvchi arxitektura."
formula: "P(y \\mid x) = \\sum_{z \\in \\text{Docs}} P(z \\mid x) P(y \\mid x, z)"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
RAG texnologiyasi modellarni qayta o'qitmasdan, eng so'nggi va xususiy ma'lumotlar bilan ishlash imkoniyatini taqdim etadi.