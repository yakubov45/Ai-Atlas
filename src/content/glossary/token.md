---
id: token
term: "Token"
translation: "Token (Matn birligi)"
category: "LLM & Generative AI"
level: "beginner"
aliases: ["Tokens", "Subwords", "Tokenizatsiya birligi"]
related: ["embedding", "llm", "transformer"]
lessons: ["tokenization", "llm"]
sources: ["karpathy-2023"]
simpleDefinition: "Til modeli matnni o'qishda va yaratishda foydalanadigan eng kichik parcha (so'z, so'z qismi yoki belgi)."
example: "«O'zbekiston» so'zi model lug'atida «O'z», «bek», «iston» kabi kichik bo'laklarga (subwords) ajratiladi."
technicalExplanation: "BPE (Byte-Pair Encoding) yoki WordPiece algoritmlari yordamida xom baytlardan lug'at indekslariga aylantiriladigan butun sonli identifikator."
formula: "\\text{Tokenizer}: \\text{String} \\to \\{t_1, t_2, \\dots, t_n\\}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Token — tabiiy tilni qayta ishlashda model xom matnni sonli hisoblashlarga tayyorlash uchun ajratadigan eng asosiy atomik ma'lumot birligidir.