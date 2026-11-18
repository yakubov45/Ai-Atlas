# Mikro-dars namunasi — Recursion va Call Stack (`factorial`)

> Phase 10 • `py-10-10` va `py-10-12` bilan bog‘liq mavzu • Draft educational lesson; publishing requires content review.

## O‘quv maqsadi
Talaba recursion nima ekanini, base case nima uchun zarurligini va funksiyalar qanday qaytishini `factorial(4)` misolida o‘z qo‘li bilan bosqichma-bosqich hisoblay oladi.

### Overview — 1 daqiqalik intuitiv tushuncha
**Recursion** — funksiya o‘zini yana chaqirishi. Har chaqiriq kichikroq masalani yechishga harakat qiladi. To‘xtash qoidasi (`base case`) bo‘lmasa, chaqiriqlar cheksiz davom etishga urinadi va Python odatda `RecursionError` chiqaradi.

Misol: `4! = 4 × 3 × 2 × 1 = 24`.

### Understand — 8 kichik qadam
1. `factorial(4)` deb chaqiramiz. Natija hozircha noma’lum.
2. `4 > 1`, shuning uchun `4 * factorial(3)` hisoblanadi.
3. `factorial(3)` → `3 * factorial(2)`.
4. `factorial(2)` → `2 * factorial(1)`.
5. `factorial(1)` base case: `1` qaytaradi.
6. `factorial(2)` endi `2 * 1 = 2` qaytaradi.
7. `factorial(3)` endi `3 * 2 = 6` qaytaradi.
8. `factorial(4)` `4 * 6 = 24` qaytaradi.

**Interaktiv vazifa:** `n` ni 0–7 oralig‘ida o‘zgartirib `Next/Previous`, `Play/Pause` orqali chaqiriq va qaytishlar ketma-ketligini kuzating. Bu Python call stack'ining **konseptual modeli**, CPython xotirasining aynan bitma-bit tasviri emas.

### Minimal kod

```python
def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return 1
    return n * factorial(n - 1)

assert factorial(0) == 1
assert factorial(4) == 24
```

### Master — izlash va tekshirish
- `factorial(0)` nima uchun `1`? — bu faktorialning matematik ta’rifi.
- `factorial(-1)` qanday holat? — bizning funksiyada `ValueError`.
- Nima uchun `factorial(4)` da 4 ta chaqiriq bo‘ladi, `factorial(0)` da faqat bitta?
- Time complexity: `O(n)` ko‘paytirish/chaqiriq; recursion call stack `O(n)` (n>1).
- Katta `n` uchun recursion cheklovi sabab loop foydaliroq bo‘lishi mumkin.

### Mini-checkpoint
1. `factorial(3)` chaqirilganda base case qaysi chaqiriqda ishlaydi?
2. `factorial(3)` qanday qiymat qaytaradi?
3. `return n * factorial(n-1)` qatori nimani bildiradi?

**Javoblar:** 1) `factorial(1)`; 2) `6`; 3) kichikroq masala hisobini kutadi, keyin n ga ko‘paytiradi.

### Vizual komponentlar
- React: `examples/react/FactorialCallStackLab.tsx` (haqiqiy qadamlar bilan)
- Manim: `examples/manim/factorial_call_stack.py` (render qilinmagan starter kod)

### Source provenance
User-provided Python Developer roadmap → `2. Data Structures and Algorithms` → `Recursion & Sorting Algorithms`. Kod va hisoblash misoli shu roadmapdagi tushunchani o‘rgatish uchun yangi yaratilgan pedagogik namuna; tashqi ilmiy manba yoki Python runtime bilan mustaqil verifikatsiya qilingan tadqiqot da’vosi emas.
