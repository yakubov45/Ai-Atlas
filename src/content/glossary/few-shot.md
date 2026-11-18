---
id: few-shot
term: "Few-Shot Prompting"
translation: "Namunalardan o'rganish prompti"
category: "Prompt Engineering"
level: "beginner"
aliases: ["Few-Shot Learning", "Misollar orqali ko'rsatish"]
related: ["temperature", "llm"]
lessons: ["prompt-engineering"]
sources: ["karpathy-2023"]
simpleDefinition: "Modelga vazifani tushuntirish uchun unga bir nechta (2–5 ta) tayyor savol-javob namunalarini berib, shunga qarab javob berishini so'rash usuli."
example: "«Inglizcha: Apple -> Olma; Inglizcha: Book -> Kitob; Inglizcha: Car -> ?» — model qolipni tushunib darhol «Mashina» deb javob beradi."
technicalExplanation: "Model parametrlarini yangilamasdan (in-context learning), kirish kontekstiga demonstratsiya juftliklarini kiritish orqali kutilgan format va xatti-harakatni induktsiya qilish."
formula: "\\text{Prompt} = (x_1, y_1) \\circ (x_2, y_2) \\dots \\circ (x_k, y_k) \\circ x_{\\text{query}}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Few-shot prompting — modellarni qayta o'qitishsiz yangi vazifalarni aniq bajarishga o'rgatishning eng tezkor usulidir.