---
id: learning-rate
term: "Learning Rate"
translation: "O'rganish tezligi"
category: "Machine Learning"
level: "beginner"
aliases: ["Step Size", "Qadam kattaligi", "Alfa parametri"]
related: ["gradient-descent", "optimizer", "loss-function"]
lessons: ["learning-rate", "gradient-descent"]
sources: ["kingma-2014"]
simpleDefinition: "Har bir o'qitish qadamida model parametrlarini xatolikni kamaytirish tomoniga qanchalik katta sakrash bilan o'zgartirishni belgilovchi son."
example: "Juda katta qadam qo'ysangiz eng pastki nuqtadan oshib ketasiz; juda kichik qadam qo'ysangiz o'rganish juda sekinlashib ketadi."
technicalExplanation: "Gradientga ko'paytiriladigan giperparametr (alpha). Ko'pincha o'qitish davomida asta-sekin kamaytirib boriladi (Learning Rate Decay / Cosine Annealing)."
formula: "\\theta_{t+1} = \\theta_t - \\alpha_t \\cdot g_t"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
To'g'ri tanlangan o'rganish tezligi neyron tarmoqning muvaffaqiyatli konvergensiya qilishi uchun eng muhim giperparametrdir.