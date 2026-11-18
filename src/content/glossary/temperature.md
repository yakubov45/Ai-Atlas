---
id: temperature
term: "Temperature"
translation: "Harorat parametri"
category: "Prompt Engineering"
level: "beginner"
aliases: ["Sampling Temperature", "Tasodifiylik darajasi"]
related: ["llm", "few-shot", "token"]
lessons: ["prompt-engineering", "llm"]
sources: ["karpathy-2023"]
simpleDefinition: "Til modeli javob qaytarayotganda qanchalik ijodiy (tasodifiy) yoki qanchalik aniq (qat'iy) bo'lishini boshqaruvchi parametr."
example: "Harorat 0 bo'lsa model doim eng ehtimolli so'zni tanlaydi (matematika va kod uchun mos); 0.8 bo'lsa ijodiyroq va rang-barang javob beradi (she'r yoki ertak uchun)."
technicalExplanation: "Softmax kirishidagi logits qiymatlarini T ga bo'lish orqali ehtimollik taqsimotining entropiyasini o'zgartiruvchi koeffitsiyent."
formula: "P(w_i) = \\frac{\\exp(z_i / T)}{\\sum_j \\exp(z_j / T)}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Temperature parametri orqali modelning gallyutsinatsiya darajasini nazorat qilish va ijodiylik chegaralarini sozlash mumkin.