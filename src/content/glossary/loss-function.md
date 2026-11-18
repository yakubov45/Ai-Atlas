---
id: loss-function
term: "Loss Function"
translation: "Yo'qotish funksiyasi"
category: "Machine Learning"
level: "intermediate"
aliases: ["Cost Function", "Xatolik funksiyasi", "Maqsad funksiyasi"]
related: ["gradient-descent", "machine-learning", "backpropagation"]
lessons: ["loss-functions", "gradient-descent"]
sources: ["goodfellow-2016"]
simpleDefinition: "Modelning bergan javobi haqiqiy to'g'ri javobdan qanchalik uzoqlashganini bitta son bilan baholovchi jarima ko'rsatkichi."
example: "Model 100$ deb bashorat qildi, lekin haqiqatda 120$ edi. Kvadratik xatolik: (100 - 120)^2 = 400."
technicalExplanation: "Klassifikatsiyada Cross-Entropy, regressiyada esa Mean Squared Error (MSE) kabi differensiallanuvchi jarima mezonlari."
formula: "\\text{MSE} = \\frac{1}{N} \\sum_{i=1}^N (y_i - \\hat{y}_i)^2"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Modelni o'qitishdan maqsad — aynan shu yo'qotish funksiyasining qiymatini minimumga tushirishdan iboratdir.