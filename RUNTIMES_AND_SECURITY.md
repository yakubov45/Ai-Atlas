# AI Platform: Runtimes and Security Architecture (Bajarilish Muhiti va Xavfsizlik)

Ushbu hujjat AI Atlas platformasida foydalanuvchilar tomonidan yozilgan kodlarni xavfsiz, izolyatsiyalangan holda bajarish mexanizmlari, ruxsat etilgan va taqiqlangan amaliyotlarni belgilaydi.

---

## 1. Asosiy Xavfsizlik Qoidasi

> [!CAUTION]
> **QAT'IY QOIDA:** Foydalanuvchi kodi HECH QACHON server tomonidagi Next.js API marshrutlarida (Node.js runtime yoki serverless funktsiyalarda) bevosita `eval()` yoki ruxsatsiz shell orqali bajarilmaydi.
> Barcha student kodlari mijozning o'z brauzerida xavfsiz WebAssembly sandboxi orqali amalga oshiriladi.

---

## 2. Brauzer Muhitida Bajarilish (Client-Side Sandboxes)

### 2.1. Python Runtimes: Pyodide (WebAssembly)
- **Mexanizm:** Mozilla va Pyodide jamoasi tomonidan WebAssembly formatiga yig'ilgan to'liq CPython distributivi (`v0.26.4`).
- **Resurs izolyatsiyasi:** Pyodide brauzerning xotira chegarasida (WASM Linear Memory) ishlaydi.
- **Tizimga kirish taqiqlangan:** Pyodide ichidagi kod foydalanuvchining mahalliy fayllariga, drayverlariga yoki ruxsat etilmagan lokal tarmoqlariga kira olmaydi.
- **Vaqt chegarasi (Timeout Protection):** Cheksiz sikllarning (`while True:`) oldini olish uchun har bir ijro `Promise.race()` yordamida standart 8 soniyalik (testlarda 3-5 soniya) taymer bilan himoyalangan.
- **Konsol ushlab qolish:** `setStdout` va `setStderr` hodisalari orqali foydalanuvchining barcha `print()` va xato xabarlari xavfsiz matn ko'rinishida ushlab qolinadi va interaktiv konsolga uzatiladi.

### 2.2. SQL Runtimes (Rejalashtirilgan)
- Data Engineering va Data Science yo'nalishlarida SQL darslari uchun **sql.js** (SQLite WebAssembly) ishlatiladi.
- Barcha amallar talabaning brauzer xotirasida (in-memory SQLite) bajariladi, server ma'lumotlar bazalariga hech qanday so'rov yuborilmaydi.

### 2.3. JavaScript / TypeScript Runtimes
- Izolyatsiyalangan `Function()` konteksti yoki Web Worker orqali bajariladi.
- `window`, `document`, `fetch`, `localStorage` ob'ektlariga kirish to'liq cheklanadi.

---

## 3. Og'ir va Murakkab Muhitlar (External Notebook Policy)

Quyidagi texnologiyalar brauzer WebAssembly quvvatidan oshib ketadi va maxsus tashqi muhit talab qiladi:
- **PyTorch / TensorFlow Chuqur O'qitish:** GPU (CUDA) tezlatgichlarini talab qiladi.
- **Docker / Kubernetes:** Linux Kernel darajasidagi konteynerizatsiyani talab qiladi.
- **Apache Spark & Apache Kafka:** Taqsimlangan JVM klasterlarini talab qiladi.

### Bunday darslar uchun siyosat:
1. Brauzer ichida ushbu kutubxonalarning **sof Python/NumPy analitik qismlari** o'rgatiladi (masalan: `cosine_similarity`, `gradient_step`, `attention_scores`).
2. Katta modelni o'qitish, Docker konteynerini yurgizish yoki Kafka clusterini ulash darslari uchun:
   - Tayyor va sinovdan o'tgan **Google Colab**, **Kaggle Notebook** yoki **GitHub Codespaces** havolalari taqdim etiladi.
   - Talabaga o'z kompyuterida ishga tushirish uchun barcha konfiguratsiya fayllari (`Dockerfile`, `docker-compose.yml`, `requirements.txt`) dars materialida aniq keltiriladi.

---

## 4. Talaba Progressi va Maxfiylik

- Barcha yozilgan kodlar, urinishlar soni va test natijalari talabaning brauzeridagi `LocalStorage` ichida xavfsiz kalit ostida saqlanadi (`practiceSubmissions`).
- Talaba o'z xohishi bilan "Sozlamalar" sahifasidan barcha o'quv tarixini JSON formatida eksport qilishi yoki tozalashi mumkin.
- Foydalanuvchining shaxsiy kodlari tashqi serverlarga yuborilmaydi.
