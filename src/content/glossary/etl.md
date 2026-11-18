---
id: etl
term: "ETL / ELT"
translation: "Ma'lumot quvuri (ETL / ELT)"
category: "Data Engineering"
level: "intermediate"
aliases: ["Extract Transform Load", "Ma'lumotlar quvuri", "Data Pipeline"]
related: ["rag", "machine-learning"]
lessons: ["production-ml-pipeline"]
sources: ["goodfellow-2016"]
simpleDefinition: "Ma'lumotlarni turli manbalardan yig'ib olish (Extract), tozalab kerakli shaklga keltirish (Transform) va tahliliy bazaga yuklash (Load) jarayoni."
example: "Saytdagi foydalanuvchilar harakatlarini loglardan yig'ib, duplikatlarni tozalab, AI tavsiya tizimi uchun tayyor jadvallarga yozish."
technicalExplanation: "Katta ma'lumotlar oqimini (Apache Spark, Kafka, Airflow) orqali partiyaviy (batch) yoki real-vaqt rejimida yagona ma'lumotlar omboriga o'tkazish quvuri."
formula: "\\text{Raw Data} \\to \\text{Extract} \\to \\text{Transform} \\to \\text{Load} \\to \\text{Lakehouse}"
origin:
  - document: "ai glossary.md"
    section: "Kanonik lug'at"
    note: "Rasmiy tasdiqlangan atama ta'rifi"
status: published
---
Sifatli ma'lumotlar quvuri bo'lmasa, har qanday murakkab AI modeli yomon natija beradi («Garbage in, garbage out»).