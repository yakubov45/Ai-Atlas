---
id: gradient
term: "Gradient"
translation: "Gradient (Ko'p o'lchamli qiyalik)"
category: "Matematika"
level: "advanced"
aliases: ["Qiyalik vektori", "Xususiy hosilalar vektori"]
related: ["gradient-descent", "hosila", "backpropagation"]
lessons: ["gradient", "gradient-descent"]
sources: ["goodfellow-2016", "kingma-2014"]
simpleDefinition: "Funksiya qaysi yo'nalishda eng tez o'sayotganini ko'rsatuvchi ko'p o'lchamli qiyalik vektori."
example: "Tog'da turganingizda, qaysi tomonga yursangiz eng tez balandlikka ko'tarilishingizni bildiruvchi yo'nalish."
technicalExplanation: "Ko'p o'zgaruvchili skalyar funksiyaning barcha argumentlar bo'yicha olingan birinchi tartibli xususiy hosilalari jamlangan ustun vektori."
formula: "\\nabla f(\\mathbf{x}) = \\left[ \\frac{\\partial f}{\\partial x_1}, \\frac{\\partial f}{\\partial x_2}, \\dots, \\frac{\\partial f}{\\partial x_n} \\right]^T"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Gradient — mashinali o'rganishda xatolik funksiyasini minimallashtirish uchun model parametrlarini to'g'ri tomonga burish imkonini beradi.