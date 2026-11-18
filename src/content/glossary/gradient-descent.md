---
id: gradient-descent
term: "Gradient Descent"
translation: "Gradient tushishi"
category: "Machine Learning"
level: "advanced"
aliases: ["GD", "Optimizatsiya usuli", "Gradientli pasayish"]
related: ["gradient", "loss-function", "learning-rate", "backpropagation"]
lessons: ["gradient-descent", "gradient"]
sources: ["goodfellow-2016", "kingma-2014"]
simpleDefinition: "Modelning xatoligini bosqichma-bosqich kamaytirish uchun parametrlarni qiyalik (gradient) ga teskari yo'nalishda yangilab borish algoritmi."
example: "Qalin tumanda tog'dan pastdagi eng chuqur vodiyga tushish uchun oyog'ingiz bilan nishablikni paypaslab, pastga qarab qadam tashlash."
technicalExplanation: "Differensiallanuvchi yo'qotish funksiyasining lokal minimumini topish uchun parametrlarni manfiy gradient yo'nalishida o'rganish tezligiga mutanosib yangilash."
formula: "\\theta_{t+1} = \\theta_t - \\alpha \\nabla f(\\theta_t)"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Gradient Descent va uning optimallashtirilgan turlari (SGD, Adam, AdamW) barcha neyron tarmoqlarni o'qitishning asosiy harakatlantiruvchi kuchidir.