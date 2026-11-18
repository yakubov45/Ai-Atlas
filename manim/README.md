# AI Atlas — Manim Community Edition Animatsiyalar Quvuri

Ushbu katalog **AI Atlas** platformasi uchun Python Manim Community Edition yordamida matematik va chuqur o'rganish (AI) algoritmlarini tushuntiruvchi yuqori sifatli animatsiyalarni yaratish infratuzilmasini o'z ichiga oladi.

## 1. Arxitektura va Printsiplar

- **Ofline / Build-time rendering:** Python Manim brauzer ichida yoki serverless Vercel handlerlarida ISHLATILMAYDI. Barcha animatsiyalar oldindan generatsiya qilinadi va Next.js `public/animations/` statik katalogiga joylashtiriladi.
- **Dizayn uyg'unligi:** Animatsiyalar fon rangi (`#090d16`), chiziqlar ranglari (`cyan`, `violet`, `amber`, `emerald`) va shriftlar AI Atlas veb-platformasining umumiy dizayn tizimiga to'liq mos keladi.
- **Matematik aniqlik:** Har bir animatsiya formulalar va hisob-kitoblarning real ma'nosini tushuntiradi.

## 2. Katalog Tuzilmasi

```text
manim/
  scenes/
    functions.py         # Chiziqli, kvadratik, ReLU, Sigmoid va Tanh funksiyalari
    gradient_descent.py  # Loss funksiyasi va 1D Gradient Descent yaqinlashishi
    neural_network.py    # 2-qatlamli neyron tarmoqda to'g'ri tarqalish (Forward Pass)
  scripts/
    render.py            # Avtomatlashtirilgan render va nusxalash skripti
  requirements.txt       # Python bog'liqliklari
  README.md              # Qo'llanma
```

## 3. O'rnatish va Ishga Tushirish

### A. Talablar:
- Python 3.10+
- Manim Community Edition: `pip install -r manim/requirements.txt`

### B. Barcha sahifalarni render qilish:
```bash
python manim/scripts/render.py --all
```

### C. Alohida sahifani render qilish:
```bash
# Funksiyalar:
python manim/scripts/render.py --scene functions

# Gradient Descent:
python manim/scripts/render.py --scene gradient_descent

# Neyron Tarmoq:
python manim/scripts/render.py --scene neural_network
```

Chiqish fayllari avtomatik tarzda `public/animations/` papkasiga nusxalanadi va Next.js video pleyeri (`ManimVideoPlayer.tsx`) orqali darhol ko'rsatiladi.
