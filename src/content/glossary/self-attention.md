---
id: self-attention
term: "Self-Attention"
translation: "Ichki diqqat mexanizmi"
category: "LLM & Generative AI"
level: "advanced"
aliases: ["Scaled Dot-Product Attention", "Diqqat mexanizmi"]
related: ["transformer", "embedding", "vector", "matrix"]
lessons: ["transformers", "matrix-operations"]
sources: ["vaswani-2017"]
simpleDefinition: "Gapdagi har bir so'z boshqa barcha so'zlarga qarab, ularning qaysi biri bilan bog'liq ekanligini hisoblaydigan diqqat mexanizmi."
example: "«Bank xodimi daryo bo'yida o'tirdi» gapida «bank» so'zi «pul» emas, «daryo» bilan bog'liqligini kontekstdagi boshqa so'zlarga qarab tushunadi."
technicalExplanation: "Query va Key matritsalari ko'paytmasini masshtablab (ildiz ostida d_k), Softmax orqali ehtimollik taqsimotiga aylantirish va Value matritsasining vaznli yig'indisini olish."
formula: "\\operatorname{Attention}(Q, K, V) = \\operatorname{softmax}\\!\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Self-Attention mexanizmi Transformer modellariga so'zlar orasidagi uzoq masofali bog'liqliklarni rekurrent qadamlarsiz, to'liq parallel hisoblash imkonini beradi.