---
id: batch-normalization
term: "Batch Normalization"
translation: "To'plamli normalizatsiya"
category: "Deep Learning"
level: "advanced"
aliases: ["BatchNorm", "BN", "Mini-batch normalizatsiyasi"]
related: ["deep-learning", "gradient-descent"]
lessons: ["batch-normalization", "mean", "standard-deviation"]
sources: ["ioffe-2015"]
simpleDefinition: "Har bir mashq to'plamida (mini-batch) oraliq qatlam signallarining o'rtacha qiymatini 0 va tarqoqligini 1 ga keltirib, o'qitishni bir necha barobar tezlashtiruvchi usul."
example: "Agar bir darsda mavzular birdan juda qiyinlashib ketsa, talabalar tushunmay qoladi; normalizatsiya qiyinlik darajasini standart me'yorda ushlab turadi."
technicalExplanation: "Internal Covariate Shift'ni yumshatish, o'rganiladigan scale (gamma) va shift (beta) parametrlari orqali nochiziqli vakillikni saqlagan holda barqaror gradient oqimini ta'minlash."
formula: "\\hat{x}_i = \\frac{x_i - \\mu_{\\mathcal{B}}}{\\sqrt{\\sigma_{\\mathcal{B}}^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
2015-yilda Ioffe va Szegedy tomonidan kiritilgan ushbu texnika zamonaviy chuqur konvolyutsion va qatlamli neyron tarmoqlarni tezkor o'qitish imkonini berdi.