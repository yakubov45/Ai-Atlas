---
id: vector
term: "Vector"
translation: "Vektor"
category: "Matematika"
level: "beginner"
aliases: ["Sonlar massivi", "Yo'naltirilgan kesma", "1D Tensor"]
related: ["matrix", "embedding", "cosine-similarity", "gradient"]
lessons: ["vector", "embeddings"]
sources: ["goodfellow-2016"]
simpleDefinition: "Bir nechta sonlarning tartiblangan ro'yxati. Geometriyada u fazodagi yo'nalish va kattalikni (masofani) bildiradi."
example: "2D vektor: [x=3, y=4] — boshlang'ich nuqtadan 3 birlik o'ngga va 4 birlik yuqoriga yo'nalish."
technicalExplanation: "d-o'lchamli haqiqiy vektor fazosining (R^d) elementi. AI modellarida har bir o'lcham ob'ektning ma'lum bir semantik xususiyatini ifodalaydi."
formula: "\\mathbf{v} = [v_1, v_2, \\dots, v_d]^T \\in \\mathbb{R}^d, \\quad \\|\\mathbf{v}\\|_2 = \\sqrt{\\sum_{i=1}^d v_i^2}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Vektorlar — AI va chuqur o'rganishda matnlar, tasvirlar, audio va model parametrlarini sonli ko'rinishda ifodalashning eng asosiy poydevoridir.