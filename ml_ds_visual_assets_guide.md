# Visual asset integration — ML/DS

**Hozirgi holat:** Faqat 31 ta vizual laboratoriya ta’rifi bor. Foydalanuvchi yuborgan TXT fayl rasm fayllari yoki to‘liq tashqi repository URL keltirmaydi. Shuning uchun rasm ko‘chirilmadi.

## Asset yo‘riqnomasi

1. Foydalanuvchi rasm manbasini yuborgandan so‘ng repo URL, branch, commit va license’ni qayd et.
2. Repo ichida `*.png`, `*.webp`, `*.jpg`, `*.svg`, Markdown `![caption](relative/path)`, HTML img va Mermaid bloklarini ro‘yxatga ol.
3. `asset-manifest.json` ichida `id`, `repo_url`, `commit`, `source_file`, `credit`, `license`, `sha256`, `related_lesson_ids`, `format`, `visibility` saqlansin.
4. Litsenziya aniq ruxsat bermasa asl rasmni ommaviy sahifaga copy qilma; manbaga havola yoki original vizual laboratoriya ishlab chiq.
5. SVG va Mermaidni sanitizatsiyadan o‘tkaz. Rasm va chartlarda alt text, lazy-load, responsive image qo‘llanilsin.
6. Bitta ko‘p darsga tegishli asset bitta fayl bo‘lib qolsin, darslar ID orqali unga bog‘lansin.
7. Har interaktiv lab matematik testga ega bo‘lsin; rasm uning o‘rniga hisoblanmasin.

## Reproducing an original diagram

Matematik simulyatsiyalarni React + SVG/Canvas orqali noldan yoz. Masalan, `mlds-22-04` uchun K-Means centroid update har bir berilgan nuqtaning o‘rtachasini hisoblab chizsin, screenshot birikmasini ishlatma.

## Example asset manifest

```json
{
  "id": "mlds-lab-22-diagram",
  "sourceFile": null,
  "author": "original authoring required",
  "license": "pending creation",
  "sha256": null,
  "relatedLessonIds": ["mlds-22-04", "mlds-22-07", "mlds-22-08"],
  "status": "planned"
}
```
