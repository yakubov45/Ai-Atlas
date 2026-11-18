---
id: backpropagation
term: "Backpropagation"
translation: "Xatolikni orqaga tarqatish"
category: "Deep Learning"
level: "advanced"
aliases: ["Backprop", "Orqaga tarqatish algoritmi"]
related: ["gradient-descent", "hosila", "deep-learning", "loss-function"]
lessons: ["backpropagation", "chain-rule"]
sources: ["rumelhart-1986"]
simpleDefinition: "Chiqishdagi xatolik neyron tarmoqning qaysi qatlamidagi qaysi vazn tufayli kelib chiqqanini matematik ravishda orqaga hisoblab beruvchi algoritm."
example: "Zavod konveyerida yakuniy mahsulotda nuqson chiqsa, qaysi dastgoh qancha xato qilganini boshidan orqaga qarab tekshirib chiqish."
technicalExplanation: "Murakkab funksiyalarni differensiallashning zanjir qoidasini (Chain Rule) hisoblash grafigi bo'ylab teskari yo'nalishda samarali qo'llash."
formula: "\\frac{\\partial \\mathcal{L}}{\\partial w_{ij}} = \\frac{\\partial \\mathcal{L}}{\\partial z_j} \\frac{\\partial z_j}{\\partial w_{ij}} = \\delta_j a_i"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
1986-yilda Rumelhart, Hinton va Williams tomonidan ommalashtirilgan ushbu algoritm zamonaviy chuqur neyron tarmoqlarni o'qitishning poydevori hisoblanadi.