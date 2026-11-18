---
id: transformer
term: "Transformer"
translation: "Transformer arxitekturasi"
category: "LLM & Generative AI"
level: "advanced"
aliases: ["Transformer Architecture", "Attention is all you need"]
related: ["self-attention", "llm", "embedding", "batch-normalization"]
lessons: ["transformers", "llm"]
sources: ["vaswani-2017"]
simpleDefinition: "Barcha zamonaviy katta til modellarining (GPT, Claude, Gemini, LLaMA) negizida yotgan, o'zaro diqqatga asoslangan kuchli neyron tarmoq arxitekturasi."
example: "ChatGPT matn yaratishda aynan Transformer arxitekturasining Decoder bloklaridan foydalanadi."
technicalExplanation: "Rekursiyadan holi, ko'p boshli diqqat (Multi-Head Attention), qatlam normalizatsiyasi (LayerNorm) va Feed-Forward tarmoqlardan tashkil topgan parallel arxitektura."
formula: "\\text{MultiHead}(Q, K, V) = \\operatorname{Concat}(\\text{head}_1, \\dots, \\text{head}_h) W^O"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
2017-yilda Vaswani et al. tomonidan taklif etilgan Transformer arxitekturasi zamonaviy generativ AI inqilobining poydevori hisoblanadi.