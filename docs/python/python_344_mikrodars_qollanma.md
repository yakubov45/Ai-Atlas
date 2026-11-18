# Python Academy — 344 mikro-dars qo‘llanmasi

20 phase · 344 mikro-dars · 344 mustaqil mashq · 20 nazorat loyihasi

## Qanday foydalanish kerak?

- Python 3.10+ sintaksisi; umumiy o‘quv muhiti sifatida Python 3.12 tavsiya etiladi. Versiyaga xos xususiyatlar alohida belgilangan. Tashqi vositalarni ishlatishdan avval rasmiy hujjatini tekshiring.
- Har mashqda avval algoritm yoki kutilgan natijani qog‘ozda yozing, keyin kodni bajaring. Namunalarning ayrimlari ixcham kod fragmentlari yoki pseudocode: to‘liq dastur sifatida ko‘chirib ishlatishdan oldin importlar, o‘zgaruvchilar va indentationni to‘ldiring.
- Nazariya → namuna → mustaqil amaliyot → tekshirish. Mashqni normal, chegaraviy va (mavzuga mos) noto‘g‘ri input bilan sinang. Tayyor yechim berilmaydi.
- Dars ID lari, nomlari, Core/Supporting ajratilishi, manba statusi va nazorat ishi mavzulari foydalanuvchi ro‘yxatidan o‘zgartirilmagan. Nazariya, misollar, mashqlar va qabul mezonlari ushbu qo‘llanma uchun yangi yozilgan.
- Ba’zi oldindan kerak bo‘ladigan sintaksislar minimal tayanch sifatida ko‘rsatiladi (PY-01 da if, PY-04 da list, PY-08/PY-10 da Node, PY-10 da lambda). Ularning to‘liq darslari keyingi asl o‘rnida qoladi. PY-16 va PY-18 da validation/testing uchun faqat zarur tayanchlar beriladi.
- Kod yozish mashqlarida normal case, edge case va xatoni tahlil qilishni talab qiling; nazorat loyihalarida algoritm, kod, test va tushuntirish baholanadi.

## Mundarija
- [PY-01 — Python muhiti va ilk dastur](#py-01) (12 dars)
- [PY-02 — O‘zgaruvchilar va sodda turlar](#py-02) (16 dars)
- [PY-03 — Operatorlar va ifodalar](#py-03) (14 dars)
- [PY-04 — Shart operatorlari va sikllar](#py-04) (16 dars)
- [PY-05 — List, Tuple, Set va Dictionary](#py-05) (19 dars)
- [PY-06 — Funksiyalar, scope va exceptions](#py-06) (20 dars)
- [PY-07 — Fayllar va modullar](#py-07) (17 dars)
- [PY-08 — Big-O, array va linked list](#py-08) (17 dars)
- [PY-09 — Stack, Queue va Heap](#py-09) (14 dars)
- [PY-10 — HashMap, daraxtlar va algoritmlar](#py-10) (20 dars)
- [PY-11 — OOP asoslari](#py-11) (15 dars)
- [PY-12 — OOP advanced: inheritance, polymorphism](#py-12) (17 dars)
- [PY-13 — Comprehensions, iterator va generator](#py-13) (15 dars)
- [PY-14 — Decorator, regex va context manager](#py-14) (17 dars)
- [PY-15 — Python muhitlari va paketlash](#py-15) (18 dars)
- [PY-16 — HTTP va Python web frameworklari](#py-16) (21 dars)
- [PY-17 — Concurrency: Thread, Process va Async](#py-17) (21 dars)
- [PY-18 — Static typing va data validation](#py-18) (16 dars)
- [PY-19 — Testing, linting va hujjat](#py-19) (18 dars)
- [PY-20 — Production Python capstone](#py-20) (21 dars)

## PY-01

**Python muhiti va ilk dastur** · Core (Asosiy) · 12 mikro-dars

### py-01-01 — Python nima va qaysi vazifalarda ishlatiladi?

**Tushuncha.** Python umumiy maqsadli til; avtomatlashtirish, web, data science va AI uchun ishlatiladi. Interpreter kodni bajaradi.

**Kod / amaliy namuna.** `print("Python")`

**Mustaqil mashq.** Uchta real muammoni yoz va qaysi kirish, qayta ishlash, chiqish kerakligini tushuntir.

### py-01-02 — Interpreter va .py fayli nima?

**Tushuncha.** Interpreter Python kodini bajaruvchi dastur; .py oddiy matnli manba fayli.

**Kod / amaliy namuna.** `hello.py` ichida `print("Salom")`; terminalda `python hello.py`

**Mustaqil mashq.** Ikki .py fayl yarat, har birida boshqa xabar chiqar; fayl bilan interpreter vazifasini ajrat.

### py-01-03 — Python versiyasini tekshirish

**Tushuncha.** Versiya sintaksis va kutubxona mosligini belgilaydi.

**Kod / amaliy namuna.** `python --version` (Windows: `py --version`); macOS/Linux: `python3 --version`

**Mustaqil mashq.** Kompyuteringdagi versiyani top va Python 3 ekanligini tekshir.

### py-01-04 — Terminal va shell nima?

**Tushuncha.** Terminal buyruq kiritish interfeysi, shell esa buyruqlarni talqin qiladi.

**Kod / amaliy namuna.** `cd` va Windows `dir` yoki Unix `ls`

**Mustaqil mashq.** Terminaldan yangi loyiha papkasiga o‘t, ichidagi fayllarni ko‘rsat va joriy manzilni top.

### py-01-05 — REPL va .py skript farqi

**Tushuncha.** REPL kodni interaktiv bajaradi; skript saqlanadi va qayta ishga tushiriladi.

**Kod / amaliy namuna.** `python` ichida `2 + 3`; chiqish uchun `exit()`

**Mustaqil mashq.** Bir xil ifodani REPL va .py faylida bajar; nima uchun skriptda print kerakligini kuzat.

### py-01-06 — Python faylini ishga tushirish

**Tushuncha.** Skriptni bajarish uchun interpreterga fayl yo‘li beriladi.

**Kod / amaliy namuna.** `python hello.py`

**Mustaqil mashq.** Boshqa papkadan skriptni to‘liq yoki nisbiy yo‘l bilan ishga tushir; noto‘g‘ri nomda nima bo‘lishini kuzat.

### py-01-07 — print() bilan natija chiqarish

**Tushuncha.** print() qiymatlarni stdout ga chiqaradi; sep ajratuvchi, end yakun belgisidir.

**Kod / amaliy namuna.** `print("A", "B", sep="-")` → `A-B`

**Mustaqil mashq.** Uchta qatorli terminal vizitka yarat; bitta qatorda so‘zlarni / bilan ajrat.

### py-01-08 — input() orqali foydalanuvchi ma’lumotini olish

**Tushuncha.** input() foydalanuvchi kiritgan matnni str sifatida qaytaradi.

**Kod / amaliy namuna.** `name = input("Ism: ")`; `print("Salom", name)`

**Mustaqil mashq.** Ism, shahar va sevimli mashg‘ulotni so‘rab, bitta tushunarli xabar chiqar.

### py-01-09 — Indentation nima?

**Tushuncha.** Indentation kod bloklarini belgilaydi; odatda 4 bo‘sh joy ishlatiladi.

**Kod / amaliy namuna.** `if True:` ostida 4 bo‘sh joy bilan `print("OK")` (if batafsil PY-04 da)

**Mustaqil mashq.** Tayyor blokdagi noto‘g‘ri joylashgan printni tuzat; yangi shart yozish shart emas.

### py-01-10 — SyntaxError bilan tanishish

**Tushuncha.** SyntaxError kod sintaksisi noto‘g‘ri ekanini bildiradi; interpreter xato joyini ko‘rsatadi.

**Kod / amaliy namuna.** `print("Salom"` → SyntaxError

**Mustaqil mashq.** Uchta xato: yopilmagan qavs, yopilmagan qo‘shtirnoq, noto‘g‘ri if sintaksisini top va tuzat.

### py-01-11 — Comment yozish (#)

**Tushuncha.** # belgisi satr oxirigacha komment boshlaydi; interpreter uni bajarmaydi.

**Kod / amaliy namuna.** `# Salomlashish` keyin `print("Salom")`

**Mustaqil mashq.** Kichik skriptga nima uchun yozilganini tushuntiruvchi 2 izoh qo‘sh; kodni aynan takrorlovchi izoh yozma.

### py-01-12 — Kichik Hello World CLI ni yig‘ish

**Tushuncha.** CLI — terminal orqali ishlaydigan dastur; input → processing → output oqimi.

**Kod / amaliy namuna.** `name = input("Ism: ")`; `print("Xush kelibsiz,", name)`

**Mustaqil mashq.** Ism va shahar so‘rab foydalanuvchiga shaxsiy terminal kartasini chiqar; ikki xil kirish bilan tekshir.

### Nazorat ishi — Birinchi Python CLI — input → output

**Talablar:** Ism va shahar so‘ra; terminalda vizitka chiqar; comment bilan oqimni tushuntir.

**Tekshiruv holatlari:** Ali/Toshkent → Salom Ali, Toshkent; Vali/Samarqand → mos vizitka; input matn sifatida saqlansin.

**Cheklovlar:** Faqat print, input, assignment va comment; shart/sikl kerak emas.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-02

**O‘zgaruvchilar va sodda turlar** · Core (Asosiy) · 16 mikro-dars

### py-02-01 — Variable va assignment nima?

**Tushuncha.** Assignment nomni obyektga bog‘laydi; = matematik tenglik emas.

**Kod / amaliy namuna.** `score = 10`; `score = 15`; `print(score)` → 15

**Mustaqil mashq.** Uchta qiymatni nomla, birini o‘zgartir va natijani oldindan ayt.

### py-02-02 — O‘zgaruvchiga nom berish qoidalari

**Tushuncha.** Nom harf yoki underscore bilan boshlanadi, raqam keyin kelishi mumkin; keyword ishlatilmaydi.

**Kod / amaliy namuna.** `user_age = 20`; `2age = 20` xato

**Mustaqil mashq.** `user-name`, `class`, `2price`, `total_price` nomlarini tekshir va yaroqsizlarini tuzat.

### py-02-03 — int turi nima?

**Tushuncha.** int butun son turi, manfiy va katta butun sonlarni ham saqlaydi.

**Kod / amaliy namuna.** `count = 120`; `print(type(count))`

**Mustaqil mashq.** 3 ta butun son saqla, ularning turlarini chiqar va manfiy sonni ham tekshir.

### py-02-04 — float turi nima?

**Tushuncha.** float kasr sonlarni ikkilik yaqinlashuv bilan ifodalaydi.

**Kod / amaliy namuna.** `price = 12.5`; `print(type(price))`

**Mustaqil mashq.** Harorat, vazn va narxni float sifatida belgilab chiqar; `12` va `12.0` turlarini solishtir.

### py-02-05 — bool turi nima?

**Tushuncha.** bool mantiqiy True yoki False qiymatga ega.

**Kod / amaliy namuna.** `is_active = True`; `print(type(is_active))`

**Mustaqil mashq.** Uchta xizmat holatini bool bilan ifodala; True bilan "True" bir xil tip emasligini ko‘rsat.

### py-02-06 — str turi nima?

**Tushuncha.** str Unicode matn; qo‘shtirnoq yoki birtirnoq bilan yoziladi.

**Kod / amaliy namuna.** `city = "Toshkent"`; `print(city)`

**Mustaqil mashq.** Ism ichidagi apostrofni to‘g‘ri yoz, ko‘p qatorli matn ham yarat.

### py-02-07 — None va NoneType

**Tushuncha.** None qiymat yo‘qligini ifodalaydi; 0, False va bo‘sh matndan farq qiladi.

**Kod / amaliy namuna.** `result = None`; `print(type(result))`

**Mustaqil mashq.** Telefon raqami noma’lum foydalanuvchi uchun None, ma’lum foydalanuvchi uchun matn saqla.

### py-02-08 — type() va isinstance() farqi

**Tushuncha.** type() aniq turni qaytaradi; isinstance() meros turlarini ham hisobga oladi.

**Kod / amaliy namuna.** `print(type(True) is bool, isinstance(True, int))` → True True (is keyinroq o‘tiladi)

**Mustaqil mashq.** `3`, `3.0`, `"3"`, `None` uchun type va isinstance bilan natijani tekshir.

### py-02-09 — Bir qatorda assignment

**Tushuncha.** Bir qatorda bir nechta nomga qiymat berish yoki qiymatlarni almashtirish mumkin.

**Kod / amaliy namuna.** `a, b = 1, 2`; `a, b = b, a`

**Mustaqil mashq.** Uch nomdagi qiymatlarni a→b→c→a siklik almashtir; vaqtinchalik nom ishlatma.

### py-02-10 — O‘zgaruvchi qiymatini yangilash

**Tushuncha.** Yangilash eski nomga yangi qiymat bog‘laydi.

**Kod / amaliy namuna.** `points = 5`; `points = points + 2` → 7

**Mustaqil mashq.** Boshlang‘ich ball 10: ikki marta oshir va bir marta kamaytir; har bosqichni chiqar.

### py-02-11 — String concatenation

**Tushuncha.** + ikkita str ni birlashtiradi; str va int bevosita qo‘shilmaydi.

**Kod / amaliy namuna.** `"Ali" + " " + "Vali"`

**Mustaqil mashq.** Ism, familiya, shahar orqali formatlangan bir qator yoz; sonni hozircha matn sifatida ol.

### py-02-12 — f-string orqali formatlash

**Tushuncha.** F-string {} ichidagi ifodalarni matnga joylaydi.

**Kod / amaliy namuna.** `name = "Ali"`; `print(f"Salom, {name}")`

**Mustaqil mashq.** Mahsulot nomi va narxini f-string orqali terminal chekiga aylantir; kasrni 2 xona chiqar (`:.2f`).

### py-02-13 — str metodlari bilan ishlash

**Tushuncha.** Str metodlari yangi matn qaytaradi, asl string o‘zgarmaydi.

**Kod / amaliy namuna.** `"  SaLoM  ".strip().lower()` → `salom`

**Mustaqil mashq.** Keraksiz bo‘sh joylarni olib tashla, registrni kichraytir va bo‘sh joylarni `_` bilan almashtir.

### py-02-14 — Index va slice

**Tushuncha.** Index 0 dan boshlanadi; slice [start:stop:step] stopni olmaydi.

**Kod / amaliy namuna.** `"Python"[-1]` → n; `"Python"[1:4]` → yth

**Mustaqil mashq.** Parolning birinchi va oxirgi belgisini, teskari matnini va har ikkinchi belgisini chiqar.

### py-02-15 — int(), float(), str() casting

**Tushuncha.** Casting qiymatni boshqa turga o‘tkazadi; input odatda str bo‘ladi.

**Kod / amaliy namuna.** `int("42")`; `float("3.5")`; `str(42)`

**Mustaqil mashq.** Ikki sonni input orqali olib, int ga aylantir va yig‘indisini chiqar; kasr uchun float sinovi qil.

### py-02-16 — Noto‘g‘ri casting va ValueError

**Tushuncha.** Noto‘g‘ri qiymat castingda ValueError; int(float) kasrni nol tomonga kesadi.

**Kod / amaliy namuna.** `int("abc")` → ValueError; `int(-3.9)` → -3

**Mustaqil mashq.** `"12"`, `"12.5"`, `"abc"` ni int va float bilan alohida sinab, xatolar jadvalini tuz; try hali shart emas.

### Nazorat ishi — Kalkulyator: ism, yosh va qiymatlar

**Talablar:** Ism, yosh, ikkita son va narx; casting, yig‘indi, keyingi yosh va formatlangan chiqish.

**Tekshiruv holatlari:** Ali,20,2,3.5 → yosh 21 va summa 5.5; 0 va manfiy sonlar; noto‘g‘ri castingni tahlil qil.

**Cheklovlar:** Exception handling hali shart emas; invalid inputni qabul qilmaslik hujjatlashtirilsin.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-03

**Operatorlar va ifodalar** · Core (Asosiy) · 14 mikro-dars

### py-03-01 — Qo‘shish va ayirish operatorlari

**Tushuncha.** + va - sonlar yig‘indisi va ayirmasini hisoblaydi.

**Kod / amaliy namuna.** `100 + 25 - 10` → 115

**Mustaqil mashq.** Boshlang‘ich balans, ikkita kirim va chiqimdan yakuniy balans hisobla.

### py-03-02 — Ko‘paytirish va oddiy bo‘lish

**Tushuncha.** * ko‘paytiradi, / haqiqiy bo‘lish natijasini float beradi.

**Kod / amaliy namuna.** `7 * 3` → 21; `7 / 2` → 3.5

**Mustaqil mashq.** Xonaga kerakli plitka umumiy narxini va to‘rt kishiga bo‘lingan ulushni hisobla.

### py-03-03 — Butun bo‘lish //

**Tushuncha.** // natijani manfiy cheksizlik tomon yaxlitlaydi.

**Kod / amaliy namuna.** `7 // 3` → 2; `-7 // 3` → -3

**Mustaqil mashq.** 137 ta buyumni 12 talik qutilarga joyla; nechta to‘liq quti chiqishini hisobla.

### py-03-04 — Qoldiq olish %

**Tushuncha.** % bo‘lish qoldig‘ini qaytaradi; a = (a//b)*b + a%b.

**Kod / amaliy namuna.** `137 % 12` → 5

**Mustaqil mashq.** Sekundni soat, minut va sekundga ajrat; 3661 uchun 1:1:1 chiqsin.

### py-03-05 — Daraja operatori **

**Tushuncha.** ** darajaga ko‘taradi; kasr daraja ildizni ham ifodalashi mumkin.

**Kod / amaliy namuna.** `2 ** 5` → 32; `81 ** 0.5` → 9.0

**Mustaqil mashq.** Kub hajmi va kvadrat diagonali uchun formulalarni hisobla.

### py-03-06 — Taqqoslash operatorlari == va !=

**Tushuncha.** == qiymatlar tengligini, != teng emasligini tekshiradi.

**Kod / amaliy namuna.** `3 == 3.0` → True; `3 != 4` → True

**Mustaqil mashq.** Inputdan ikki kod olib, aynan mos yoki mos emasligini bool ko‘rinishda chiqar.

### py-03-07 — > va < taqqoslashlari

**Tushuncha.** >, <, >=, <= sonlarni tartib bo‘yicha taqqoslaydi.

**Kod / amaliy namuna.** `18 <= 20 < 65` → True

**Mustaqil mashq.** Harorat ruxsat oralig‘idami va chegaraga tengmi degan alohida natijalarni chiqar.

### py-03-08 — and, or, not operatorlari

**Tushuncha.** and ikkala, or kamida bitta, not inkor; and/or qisqa tutash bilan operand qaytarishi mumkin.

**Kod / amaliy namuna.** `True and not False` → True; `0 or 7` → 7

**Mustaqil mashq.** Kirish uchun yosh va ruxsat belgisidan mantiqiy ifoda tuz; to‘rt kombinatsiyani tekshir.

### py-03-09 — Operator precedence

**Tushuncha.** Daraja, unary operatorlar, ko‘paytirish/bo‘lish, qo‘shish/ayirish va taqqoslashlarning bajarilish tartibi bor.

**Kod / amaliy namuna.** `2 + 3 * 4` → 14; `-2**2` → -4

**Mustaqil mashq.** `2+3*4**2` va `10-6//4*2` ni qog‘ozda hisoblab tekshir.

### py-03-10 — Qavs bilan bajarilish tartibi

**Tushuncha.** Qavs ichidagi ifoda ustunlikni aniq qiladi.

**Kod / amaliy namuna.** `(2 + 3) * 4` → 20

**Mustaqil mashq.** 2, 3, 4 sonlari va +, * yordamida qavs joyini almashtirib 14 va 20 hosil qil.

### py-03-11 — Truthiness nima?

**Tushuncha.** Bo‘sh matn, None, 0 va bo‘sh kolleksiyalar falsy; boshqa ko‘p qiymatlar truthy.

**Kod / amaliy namuna.** `bool("")` → False; `bool("False")` → True

**Mustaqil mashq.** `0`, `-1`, `"0"`, `" "`, `None` uchun bool natijasini avval taxmin qil.

### py-03-12 — in va not in operatorlari

**Tushuncha.** in a’zolikni, not in yo‘qligini tekshiradi; str uchun substring qidiradi.

**Kod / amaliy namuna.** `"py" in "python"` → True

**Mustaqil mashq.** Emailda @ belgisi borligini va bo‘sh joy yo‘qligini tekshiradigan ifoda yoz (to‘liq validatsiya emas).

### py-03-13 — is va == farqi

**Tushuncha.** == qiymat tengligi, is obyekt identity; None bilan is ishlatish odatiy.

**Kod / amaliy namuna.** `a = None`; `print(a is None)` → True

**Mustaqil mashq.** `a = [1]`, `b = [1]` tayyor misolida `a == b` va `a is b` ni tekshir; list batafsil keyin.

### py-03-14 — Floating-point aniqlik cheklovi

**Tushuncha.** Float o‘nlik kasrni har doim aniq saqlamaydi; taqqoslashda tolerance kerak.

**Kod / amaliy namuna.** `0.1 + 0.2 == 0.3` → False; `abs(0.1+0.2-0.3) < 1e-9` → True

**Mustaqil mashq.** 0.1 ni 3 marta qo‘shish va 0.3 ni solishtir; pul hisobida butun tiyin bilan alternativ yarat.

### Nazorat ishi — Chegirma va QQS kalkulyatori

**Talablar:** Narx, miqdor, chegirma va QQS stavkasidan subtotal → chegirma → soliq → total.

**Tekshiruv holatlari:** 100000×2,10% chegirma,12% QQS → 201600 (mashq stavkasi); 0% chegirma; 100% chegirma → 0.

**Cheklovlar:** Formula tartibini yoz; pul qiymatini butun tiyin yoki yaxlitlash siyosati bilan boshqar; haqiqiy soliq stavkasi deb talqin qilma.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-04

**Shart operatorlari va sikllar** · Core (Asosiy) · 16 mikro-dars

### py-04-01 — if qachon ishlaydi?

**Tushuncha.** if shart truthy bo‘lsa blokni bajaradi.

**Kod / amaliy namuna.** `if age >= 18: print("Ruxsat")` (age oldindan beriladi)

**Mustaqil mashq.** Yosh 18 dan katta yoki teng bo‘lsa xabar chiqar; 17 va 18 ni tekshir.

### py-04-02 — else orqali alternativ yo‘l

**Tushuncha.** else if sharti bajarilmagan holatda ishlaydi.

**Kod / amaliy namuna.** `if n % 2 == 0: print("Juft")` va `else: print("Toq")`

**Mustaqil mashq.** Son musbatmi yoki musbat emasmi aniqlovchi dastur, nolni ham tekshir.

### py-04-03 — elif yordamida bir nechta holat

**Tushuncha.** elif shartlarni yuqoridan pastga tekshiradi; birinchi mos blok tanlanadi.

**Kod / amaliy namuna.** `if score >= 90: ...` / `elif score >= 70: ...` / `else: ...`

**Mustaqil mashq.** 0–100 ballni 5 darajaga ajrat; chegaraviy 59, 60, 89, 90 ni sinab ko‘r.

### py-04-04 — Nested if va indentatsiya

**Tushuncha.** Nested if ichki shartni faqat tashqi shart o‘tganda tekshiradi.

**Kod / amaliy namuna.** Yosh ruxsatidan keyin `if has_ticket:` bilan chipta tekshirish.

**Mustaqil mashq.** Bankomat: avval PIN, keyin balansni tekshir; har xatoga boshqa xabar chiqar.

### py-04-05 — match-case qayerda qulay?

**Tushuncha.** match-case (Python 3.10+) qiymat yoki pattern bo‘yicha yo‘nalish tanlaydi; case _ fallback.

**Kod / amaliy namuna.** `match command:` ostida `case "start": print("OK")` va `case _: print("?")`

**Mustaqil mashq.** add, help, exit buyruqlarini ajratadigan menyu yoz; noma’lum buyruqni ham tut.

### py-04-06 — for loop nimani takrorlaydi?

**Tushuncha.** for iterable elementlari bo‘ylab yuradi.

**Kod / amaliy namuna.** `for ch in "abc": print(ch)`

**Mustaqil mashq.** Matndagi har bir belgini alohida chiqar; a harflari sonini sanagich bilan top.

### py-04-07 — range() bilan ketma-ketlik

**Tushuncha.** range(start, stop, step) stopga yetmasdan sonlar beradi.

**Kod / amaliy namuna.** `for n in range(2, 10, 2): print(n)` → 2,4,6,8

**Mustaqil mashq.** 1–100 orasidagi 3 ga karrali sonlar yig‘indisini hisobla.

### py-04-08 — while loop va condition

**Tushuncha.** while shart rost bo‘lguncha takrorlanadi; shartni yangilash zarur.

**Kod / amaliy namuna.** `n = 3`; `while n > 0: print(n); n -= 1`

**Mustaqil mashq.** Sonni 2 ga butun bo‘lib, 0 bo‘lguncha necha qadam ketishini top.

### py-04-09 — break operatori

**Tushuncha.** break eng ichki sikldan darhol chiqadi.

**Kod / amaliy namuna.** `for n in range(10):` ichida `if n == 4: break`

**Mustaqil mashq.** To‘g‘ri PIN topilguncha, ko‘pi bilan 3 urinishga ruxsat ber.

### py-04-10 — continue operatori

**Tushuncha.** continue joriy iteratsiyaning qolganini tashlab keyingisiga o‘tadi.

**Kod / amaliy namuna.** `for n in range(6):` ichida juft bo‘lsa `continue`, aks holda print.

**Mustaqil mashq.** 1–50 ichida 3 ga bo‘linadi, ammo 5 ga bo‘linmaydigan sonlarni chiqar.

### py-04-11 — Loop bilan list elementlarini ko‘rish

**Tushuncha.** for listdagi elementlarni ketma-ket beradi; list sintaksisi hozir tayanch misol sifatida.

**Kod / amaliy namuna.** `for score in [10, 20, 30]: print(score)`

**Mustaqil mashq.** Tayyor `[7, 2, 9, 4]` ro‘yxatidagi eng kattasini maxsiz top.

### py-04-12 — enumerate() qanday ishlaydi?

**Tushuncha.** enumerate indeks va element juftligini beradi, start ixtiyoriy.

**Kod / amaliy namuna.** `for i, ch in enumerate("ABC", start=1): print(i, ch)`

**Mustaqil mashq.** Matnda birinchi unlining pozitsiyasini top; bo‘lmasa -1 chiqar.

### py-04-13 — zip() orqali parallel yurish

**Tushuncha.** zip bir necha iterable ni parallel yuradi; odatda eng qisqasida to‘xtaydi.

**Kod / amaliy namuna.** `for name, score in zip(["Ali", "Vali"], [80, 90]): print(name, score)`

**Mustaqil mashq.** Ikki tayyor ro‘yxatdagi narx va sonni juftlab jami to‘lovni hisobla; uzunlik farqini kuzat.

### py-04-14 — Cheksiz siklni aniqlash

**Tushuncha.** Cheksiz sikl shart hech qachon yolg‘on bo‘lmaganda yuz beradi.

**Kod / amaliy namuna.** `while True: ...` ataylab yoki yangilanmagan counter tufayli.

**Mustaqil mashq.** `i=0` va `while i<5: print(i)` kodini ishga tushirmasdan tahlil qilib tuzat.

### py-04-15 — Loop xatolarini debug qilish

**Tushuncha.** Loop debug: boshlanish, to‘xtash, update va off-by-one ni tekshirish.

**Kod / amaliy namuna.** `range(1, 5)` 5 ni olmaydi.

**Mustaqil mashq.** 1 dan 10 gacha sonlar yig‘indisini xato yozilgan range(1,10) bilan solishtir; 55 chiqishi kerak.

### py-04-16 — Mini viktorina natijasini hisoblash

**Tushuncha.** Viktorina uchun har javobni shart bilan tekshir va ballni yangila.

**Kod / amaliy namuna.** `score = 0`; `if input("2+2?") == "4": score += 1`

**Mustaqil mashq.** 3 savolli viktorina tuz, to‘g‘ri javoblar 0–3 va foizini chiqar; noto‘g‘ri input ham tekshir.

### Nazorat ishi — Mini viktorina CLI

**Talablar:** 5 savolli CLI, har to‘g‘ri javob uchun ball, yakuniy foiz va qayta urinish menyusi.

**Tekshiruv holatlari:** 5/5→100%; 0/5→0%; 3/5→60%; noma’lum menyu buyrug‘i.

**Cheklovlar:** if/elif/else, loop, break; murakkab kolleksiya yoki class majburiy emas.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-05

**List, Tuple, Set va Dictionary** · Core (Asosiy) · 19 mikro-dars

### py-05-01 — List yaratish

**Tushuncha.** List tartibli, o‘zgaruvchan kolleksiya; takroriy qiymatlar mumkin.

**Kod / amaliy namuna.** `items = ["olma", "anor", "olma"]`

**Mustaqil mashq.** 5 mahsulot ro‘yxatini yarat, uzunligini va elementlarini chiqar.

### py-05-02 — List indexing va negative index

**Tushuncha.** Index 0 dan, manfiy index oxirdan boshlanadi; diapazondan chiqish IndexError.

**Kod / amaliy namuna.** `[10,20,30][-2]` → 20

**Mustaqil mashq.** 7 elementli listning o‘rtasi, birinchi va oxirgi elementini indeks orqali top.

### py-05-03 — List slicing

**Tushuncha.** Slice listning tanlangan qismini yangi sayoz list qilib beradi.

**Kod / amaliy namuna.** `[1,2,3,4,5][::2]` → [1,3,5]

**Mustaqil mashq.** Listni ikki teng qismga ajrat, teskari nusxa yarat, originalni o‘zgartirma.

### py-05-04 — append, extend va insert

**Tushuncha.** append bitta element, extend iterable elementlari, insert joyga element qo‘shadi.

**Kod / amaliy namuna.** `a=[1]; a.extend([2,3]); a.insert(1,9)` → [1,9,2,3]

**Mustaqil mashq.** Savatchaga 2 ta mahsulotni birgalikda qo‘sh, ustuvor mahsulotni boshiga joyla.

### py-05-05 — remove, pop va del

**Tushuncha.** remove qiymatni, pop indeksni o‘chirib qaytaradi, del indeks/sliceni o‘chiradi.

**Kod / amaliy namuna.** `a=[4,2,4]; a.remove(4); a.pop()` → 4, a=[2]

**Mustaqil mashq.** Takroriy qiymatli ro‘yxatdan birinchi mos qiymatni va oxirgi elementni o‘chir; mavjud bo‘lmagan qiymatni tekshir.

### py-05-06 — List sort va sorted farqi

**Tushuncha.** sort() listni joyida tartiblaydi va None qaytaradi; sorted yangi list beradi.

**Kod / amaliy namuna.** `a=[3,1,2]; b=sorted(a)` → b=[1,2,3], a o‘zgarmaydi.

**Mustaqil mashq.** Ballarni o‘suvchi va kamayuvchi tartibda chiqar; originalni saqla.

### py-05-07 — Tuple nima va nima uchun kerak?

**Tushuncha.** Tuple tartibli, immutable kolleksiya; elementlarining o‘zi mutable bo‘lishi mumkin.

**Kod / amaliy namuna.** `point=(3,4); single=(3,)`

**Mustaqil mashq.** Koordinata va RGB rangni tuple sifatida ifodala; bitta elementli tuple turini tekshir.

### py-05-08 — Tuple unpacking

**Tushuncha.** Unpacking elementlarni mos nomlarga ajratadi; * qolganlarini listga oladi.

**Kod / amaliy namuna.** `first, *middle, last = (1,2,3,4)`

**Mustaqil mashq.** Koordinata juftligini x va y ga, 5 elementli tuple bosh/o‘rta/oxirga ajrat.

### py-05-09 — Set va unique values

**Tushuncha.** Set takrorlanmaydigan hashable elementlar to‘plami; tartibiga tayanilmaydi.

**Kod / amaliy namuna.** `set([1,2,1])` → {1,2}

**Mustaqil mashq.** Ikki guruhdan takroriy student IDlarni olib tashla va noyob sonini hisobla.

### py-05-10 — Set union/intersection/difference

**Tushuncha.** Union barcha, intersection umumiy, difference farqli elementlarni topadi.

**Kod / amaliy namuna.** `{1,2}.intersection({2,3})` → {2}

**Mustaqil mashq.** A va B kurslariga yozilganlardan ikkalasida, faqat A da va kamida bittasida bo‘lganlarni top.

### py-05-11 — Dict: key/value juftligi

**Tushuncha.** Dict hashable kalitni qiymatga bog‘laydi; kalitlar unique.

**Kod / amaliy namuna.** `user={"name":"Ali","age":20}`

**Mustaqil mashq.** 3 mahsulot nomini kalit, narxni qiymat qilib saqla va bittasini chiqar.

### py-05-12 — Dictga qiymat qo‘shish va yangilash

**Tushuncha.** Dictda d[key]=value yangi kalit qo‘shadi yoki eski qiymatni yangilaydi.

**Kod / amaliy namuna.** `d={"a":1}; d["a"]=2; d["b"]=3`

**Mustaqil mashq.** Ombor qoldiqlarini kirim va chiqim bilan yangila; mavjud bo‘lmagan mahsulotni qo‘sh.

### py-05-13 — Dict orqali qidirish

**Tushuncha.** in dictning kalitlarini tekshiradi; kalit orqali qiymat olinadi.

**Kod / amaliy namuna.** `"Ali" in {"Ali":"123"}` → True

**Mustaqil mashq.** Kontakt qidiruvi yoz; ism mavjud bo‘lsa raqamni, aks holda xabar chiqar.

### py-05-14 — get() va KeyError

**Tushuncha.** get mavjud bo‘lmagan kalit uchun default qaytaradi; [] KeyError chiqaradi.

**Kod / amaliy namuna.** `{"a":1}.get("b",0)` → 0

**Mustaqil mashq.** Matndagi harflar chastotasini get yordamida hisobla; yangi harf uchun 0 dan boshla.

### py-05-15 — Dict items(), keys(), values()

**Tushuncha.** keys, values, items dictning kalit, qiymat va juftlik view larini beradi.

**Kod / amaliy namuna.** `for k,v in {"a":1}.items(): print(k,v)`

**Mustaqil mashq.** Mahsulotlar narxidan umumiy summa va eng qimmat mahsulotni top.

### py-05-16 — Nested collections

**Tushuncha.** Kolleksiyalar ichma-ich bo‘lishi mumkin; kerakli qiymatga ketma-ket index/key orqali boriladi.

**Kod / amaliy namuna.** `users=[{"name":"Ali","scores":[90,80]}]; users[0]["scores"][1]` → 80

**Mustaqil mashq.** 3 student uchun ballar saqla; har birining o‘rtacha ballini chiqar.

### py-05-17 — Mutable va immutable farqi

**Tushuncha.** Mutable obyekt joyida o‘zgaradi; immutable o‘zgartirish yangi obyekt yaratadi.

**Kod / amaliy namuna.** `a=[1]; a.append(2)`; `s="a"; s=s+"b"`

**Mustaqil mashq.** List, dict, tuple va stringdan qaysilari joyida o‘zgarishini misollar bilan tekshir.

### py-05-18 — Reference va shallow copy tushunchasi

**Tushuncha.** Assignment reference ulashadi; shallow copy faqat tashqi kolleksiyani nusxalaydi.

**Kod / amaliy namuna.** `a=[[1]]; b=a.copy(); b[0].append(2)` → a=[[1,2]]

**Mustaqil mashq.** Nested listning ichki qiymatini o‘zgartirib alias va shallow copy farqini aniqlab, mustaqil ichki list nusxasini yarat.

### py-05-19 — Kolleksiya tanlash trade-off

**Tushuncha.** List tartib/index uchun, tuple doimiy tuzilma, set a’zolik, dict kalitli qidiruv uchun qulay.

**Kod / amaliy namuna.** Kontaktlar dict, navbat list, noyob ID set.

**Mustaqil mashq.** Kontaktlar, koordinata, buyurtmalar va takrorlanmas taglar uchun strukturani tanla; har tanlovning sababini yoz.

### Nazorat ishi — Telefon kontaktlar CLI

**Talablar:** In-memory kontaktlar: ADD, SEARCH, UPDATE, DELETE, LIST, EXIT.

**Tekshiruv holatlari:** Ali qo‘sh → search topadi; Ali yangila → yangi tel; yo‘q ism → aniq xabar; takroriy ism siyosati.

**Cheklovlar:** Dict asosiy saqlash; telefon string; kontaktlar restartdan so‘ng saqlanishi shart emas.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-06

**Funksiyalar, scope va exceptions** · Core (Asosiy) · 20 mikro-dars

### py-06-01 — def bilan funksiya yaratish

**Tushuncha.** def qayta chaqiriladigan kod blokini yaratadi; tanani faqat chaqirilganda bajaradi.

**Kod / amaliy namuna.** `def hello():` ostida `print("Salom")`; `hello()`

**Mustaqil mashq.** 3 marta bir xil menyu chiqaradigan funksiya yoz; takroriy printlarni olib tashla.

### py-06-02 — Parametr va argument farqi

**Tushuncha.** Parametr ta’rifdagi nom, argument chaqiruvdagi qiymat.

**Kod / amaliy namuna.** `def greet(name): print(name)`; `greet("Ali")`

**Mustaqil mashq.** Ikki parametrli funksiya orqali ism va shaharni formatla; ikki xil argument bilan chaqir.

### py-06-03 — return nima qiladi?

**Tushuncha.** return qiymatni chaqiruvchiga beradi va funksiyani tugatadi.

**Kod / amaliy namuna.** `def add(a,b): return a+b`

**Mustaqil mashq.** Narx va miqdordan summani qaytar; natijani boshqa hisobda ishlat, print bilan aralashtirma.

### py-06-04 — None qaytarish

**Tushuncha.** return yo‘q yoki bo‘sh return bo‘lsa, funksiya None qaytaradi.

**Kod / amaliy namuna.** `def f(): print(1)`; `x=f()` → x=None

**Mustaqil mashq.** Print qiluvchi va qiymat qaytaruvchi funksiyani yoz; natijalaridagi farqni tekshir.

### py-06-05 — Positional argument

**Tushuncha.** Positional argument parametrlar tartibiga mos bog‘lanadi.

**Kod / amaliy namuna.** `def sub(a,b): return a-b`; `sub(7,2)` → 5

**Mustaqil mashq.** Ayirish funksiyasida argumentlarni almashtirib natijani tahlil qil.

### py-06-06 — Keyword argument

**Tushuncha.** Keyword argument parametr nomi orqali bog‘lanadi.

**Kod / amaliy namuna.** `sub(b=2,a=7)` → 5

**Mustaqil mashq.** To‘rt parametrli buyurtma funksiyasini nomlangan argumentlar bilan turli tartibda chaqir.

### py-06-07 — Default parametr va mutable default ehtiyoti

**Tushuncha.** Default parametr bir marta ta’rif vaqtida hisoblanadi; mutable default holatni chaqiruvlar orasida ulashadi.

**Kod / amaliy namuna.** `def add(x, items=None):` ostida `if items is None: items=[]`, keyin append va return.

**Mustaqil mashq.** `items=[]` default ishlatilgan funksiyani ikki marta chaqir; None orqali xatoni tuzat.

### py-06-08 — *args va **kwargs kirish

**Tushuncha.** *args ortiqcha positional argumentlarni tuple, **kwargs keywordlarni dict qiladi.

**Kod / amaliy namuna.** `def total(*nums): return sum(nums)`

**Mustaqil mashq.** Istalgan sondagi ballni oladigan total; **kwargs bilan profil ma’lumotlarini chiqaruvchi funksiya yoz.

### py-06-09 — Multiple return va tuple unpacking

**Tushuncha.** Bir nechta qiymat return qilinsa tuple qaytadi; unpacking ajratadi.

**Kod / amaliy namuna.** `def bounds(a): return min(a),max(a)`; `lo,hi=bounds([3,9])`

**Mustaqil mashq.** Sonlar listidan minimum, maksimum va o‘rtachani qaytar; uch nomga ajrat.

### py-06-10 — Local variable

**Tushuncha.** Local variable funksiya ichida bog‘langan nom, tashqaridagi nom bilan bir xil bo‘lishi shart emas.

**Kod / amaliy namuna.** `x=5`; `def f(): x=2; return x`

**Mustaqil mashq.** Bir xil nomdagi local va global qiymatni chiqarib ajrat; tashqaridagi qiymatni o‘zgartirma.

### py-06-11 — Global variable tushunchasi

**Tushuncha.** Global nom modul darajasida; global kalit so‘zi funksiya ichidagi qayta assignment uchun ishlatiladi.

**Kod / amaliy namuna.** `count=0`; `def inc():` ostida `global count; count += 1`

**Mustaqil mashq.** Global sanagichni ikki marta chaqir, keyin global ishlatmay parametr/return bilan qayta yoz.

### py-06-12 — nonlocal scope tushunchasi

**Tushuncha.** nonlocal eng yaqin enclosing funksiya nomini qayta bog‘laydi.

**Kod / amaliy namuna.** Tashqi `count=0`; ichki `inc()` da `nonlocal count` va `count += 1`.

**Mustaqil mashq.** Ichki funksiya orqali sanagichni oshiruvchi outer yarat; ikkita mustaqil sanagichni sinab ko‘r.

### py-06-13 — LEGB qidiruv tartibi

**Tushuncha.** LEGB qidiruv tartibi: Local, Enclosing, Global, Built-in.

**Kod / amaliy namuna.** `len=5` modulda built-in len nomini soyalaydi.

**Mustaqil mashq.** Bir xil x nomini 3 scopedagi qiymat bilan ishlat; qaysi x topilishini oldindan ayt.

### py-06-14 — Built-in min, max, sum, len

**Tushuncha.** min/max ekstremum, sum yig‘indi, len element sonini beradi.

**Kod / amaliy namuna.** `a=[2,7,3]; sum(a)/len(a)` → 4.0

**Mustaqil mashq.** Bo‘sh bo‘lmagan ballar listidan 4 statistikani qaytar; bo‘sh listni alohida tekshir.

### py-06-15 — Exception nima?

**Tushuncha.** Exception bajarilish paytidagi xato signali; traceback kelib chiqishini ko‘rsatadi.

**Kod / amaliy namuna.** `10/0` → ZeroDivisionError

**Mustaqil mashq.** IndexError, KeyError, ValueError va ZeroDivisionError hosil qiluvchi kichik misollarni tahlil qil.

### py-06-16 — try va except

**Tushuncha.** try xavfli kodni bajaradi; except mos xato yuz bersa ishlaydi.

**Kod / amaliy namuna.** `try: n=int("x")` / `except ValueError: print("Son kerak")`

**Mustaqil mashq.** Input butun son bo‘lmasa xabar chiqar; dastur qulamasin.

### py-06-17 — Aniq exception turini ushlash

**Tushuncha.** Aniq exception turi faqat kutilgan xatoni ushlaydi; bare except ko‘p narsani yashiradi.

**Kod / amaliy namuna.** `except (ValueError, ZeroDivisionError): ...`

**Mustaqil mashq.** Bo‘lish kalkulyatorida son xatosi va nolga bo‘lish uchun alohida xabar yoz.

### py-06-18 — else va finally bloklari

**Tushuncha.** else try muvaffaqiyatli bo‘lsa, finally esa chiqishda odatda har holda ishlaydi.

**Kod / amaliy namuna.** `try: n=int("5")` / `except ValueError: ...` / `else: print(n)` / `finally: print("Tugadi")`

**Mustaqil mashq.** Muvaffaqiyat va xato holatida printlar tartibini oldindan top, keyin tekshir.

### py-06-19 — raise orqali xato chiqarish

**Tushuncha.** raise kutilmagan yoki ruxsat etilmagan holatni exception bilan signal qiladi.

**Kod / amaliy namuna.** `if amount < 0: raise ValueError("Manfiy summa")`

**Mustaqil mashq.** Manfiy yosh yoki 0 dan kichik miqdor uchun ValueError chiqaruvchi funksiya yoz.

### py-06-20 — Xatoni yashirmasdan qayta ishlash

**Tushuncha.** Xatoni kerakli qatlamda ushla; qo‘shimcha kontekst bilan qayta raise qil yoki aniq foydali xabar ber.

**Kod / amaliy namuna.** `except ValueError: print("Kiritish xatosi"); raise`

**Mustaqil mashq.** Parsing funksiyasi xatoni yuqoriga uzatsin, CLI esa foydalanuvchiga tushunarli xabar bersin; noto‘g‘ri qiymatni 0 qilib yashirma.

### Nazorat ishi — Funksiyali CLI calculator

**Talablar:** add/sub/mul/div funksiyalari, input parser, CLI menu, aniq exceptions.

**Tekshiruv holatlari:** 8/2→4; 8/0→xabar; abc→xabar; chiqish buyrug‘i ishlaydi.

**Cheklovlar:** Hisoblash va input/output alohida; xatoni yashirma; global state shart emas.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-07

**Fayllar va modullar** · Core (Asosiy) · 17 mikro-dars

### py-07-01 — Path va fayl manzili

**Tushuncha.** Path faylning manzili; absolute ildizdan, relative joriy working directorydan.

**Kod / amaliy namuna.** `data/report.txt` va `C:/data/report.txt`

**Mustaqil mashq.** Bir faylni joriy papkadan va boshqa papkadan qanday ochishni top.

### py-07-02 — open() bilan matn o‘qish

**Tushuncha.** open() fayl obyektini ochadi; read matnni o‘qiydi; close resursni yopadi.

**Kod / amaliy namuna.** `f=open("a.txt",encoding="utf-8"); text=f.read(); f.close()`

**Mustaqil mashq.** 3 qatorli fayl yarat, hammasini o‘qi va belgilar sonini chiqar.

### py-07-03 — with context manager asoslari

**Tushuncha.** with kontekst tugaganda faylni yopadi, exception bo‘lsa ham.

**Kod / amaliy namuna.** `with open("a.txt",encoding="utf-8") as f: text=f.read()`

**Mustaqil mashq.** Fayldagi bo‘sh bo‘lmagan qatorlar sonini with yordamida sanab ber.

### py-07-04 — Faylga write va append

**Tushuncha.** w faylni qayta yozadi (truncate), a oxiriga qo‘shadi.

**Kod / amaliy namuna.** `with open("log.txt","a",encoding="utf-8") as f: f.write("OK\n")`

**Mustaqil mashq.** Ikki ishga tushirishda loglar saqlansin, alohida report fayli esa yangilansin.

### py-07-05 — UTF-8 encoding

**Tushuncha.** UTF-8 Unicode matnni baytlarga kodlaydi; encoding mos bo‘lishi kerak.

**Kod / amaliy namuna.** `"O‘zbek".encode("utf-8")`

**Mustaqil mashq.** O‘zbek va kirill matnini UTF-8 bilan yoz va qayta o‘qi; asl matn bilan tengligini tekshir.

### py-07-06 — JSON o‘qish va yozish

**Tushuncha.** json.load fayldan Python qiymatlarini o‘qiydi, json.dump ularni yozadi.

**Kod / amaliy namuna.** `import json`; `with open("data.json","w",encoding="utf-8") as f: json.dump({"a":1},f)`

**Mustaqil mashq.** Kontakt dictni JSONga saqla, keyin ochib yangi kontakt qo‘sh va qayta yoz.

### py-07-07 — CSV matn formati bilan tanishish

**Tushuncha.** CSV jadval formatidir; csv moduli qo‘shtirnoq va delimiterlarni to‘g‘ri parse qiladi.

**Kod / amaliy namuna.** `import csv`; `with open("a.csv",newline="",encoding="utf-8") as f: rows=list(csv.DictReader(f))`

**Mustaqil mashq.** name,price,qty ustunlaridan jami narx hisobla; vergulli mahsulot nomini ham sinab ko‘r.

### py-07-08 — pathlib.Path bilan fayllar

**Tushuncha.** pathlib.Path fayl yo‘llari uchun obyektga yo‘naltirilgan qulay API.

**Kod / amaliy namuna.** `from pathlib import Path`; `p=Path("data")/"a.txt"; print(p.exists())`

**Mustaqil mashq.** Papka yarat (`mkdir`), fayl yoz (`write_text`) va mavjudligini tekshir.

### py-07-09 — glob pattern bilan qidirish

**Tushuncha.** glob pattern fayl nomlarini wildcard orqali qidiradi; rglob ichki papkalarni ham aylanadi.

**Kod / amaliy namuna.** `list(Path("data").glob("*.csv"))`

**Mustaqil mashq.** Faqat .csv fayllarni topib nomlarini sorted tartibida chiqar; .txt larni tashla.

### py-07-10 — Module va import

**Tushuncha.** Module odatda .py fayl; import uning nomlari uchun namespace beradi.

**Kod / amaliy namuna.** `import math`; `math.sqrt(81)` → 9.0

**Mustaqil mashq.** math moduli bilan aylana yuzasi va ildiz hisobla; import nomini adashtirma.

### py-07-11 — from ... import ...

**Tushuncha.** from ... import ... tanlangan nomni joriy namespacega olib kiradi.

**Kod / amaliy namuna.** `from math import sqrt`; `sqrt(16)`

**Mustaqil mashq.** `import math` va `from math import sqrt` ni ikkita skriptda solishtir; wildcard ishlatma.

### py-07-12 — __name__ == "__main__"

**Tushuncha.** __name__ bevosita bajarilgan modulda __main__, import qilinganda modul nomi.

**Kod / amaliy namuna.** `if __name__ == "__main__": main()`

**Mustaqil mashq.** Bir faylda funksiya va CLI yarat; import qilganda CLI input so‘ramasligini tekshir.

### py-07-13 — Standard library nima?

**Tushuncha.** Standard library Python bilan birga keladigan modullar to‘plami.

**Kod / amaliy namuna.** `import statistics`; `statistics.mean([2,4,6])`

**Mustaqil mashq.** math, datetime va json orqali sana bilan kichik hisob-kitob hisobotini yarat.

### py-07-14 — Custom module yaratish

**Tushuncha.** Custom module qayta ishlatiladigan funksiyalarni alohida faylga ajratadi.

**Kod / amaliy namuna.** `utils.py` da `def double(x): return x*2`; `main.py` da `from utils import double`

**Mustaqil mashq.** Narx hisoblashni utils.py ga, input/outputni main.py ga ajrat.

### py-07-15 — Package va __init__.py tushunchasi

**Tushuncha.** Package modullarni guruhlaydi; oddiy regular package __init__.py bilan belgilanadi.

**Kod / amaliy namuna.** `shop/__init__.py`, `shop/prices.py`; `from shop.prices import total`

**Mustaqil mashq.** Ikki moduldan iborat shop package yarat; ildizdan import qil.

### py-07-16 — Relative/absolute imports

**Tushuncha.** Absolute import to‘liq package yo‘lidan, relative import joriy packagega nisbatan.

**Kod / amaliy namuna.** `from shop.prices import total` va package ichida `from .prices import total`

**Mustaqil mashq.** Package ichidagi ikki modulni bog‘la; `python -m shop.main` bilan bajar.

### py-07-17 — Import side effect tushunchasi

**Tushuncha.** Import modulning yuqori darajadagi kodini odatda birinchi importda bajaradi; side effect kutilmagan amal bo‘lishi mumkin.

**Kod / amaliy namuna.** Import vaqtida `print("loaded")` chiqadi; main guard CLI ni ajratadi.

**Mustaqil mashq.** Import paytida fayl yaratadigan modulni top va ishga tushirishni main funksiyasiga ko‘chir.

### Nazorat ishi — CSV/JSONdan hisobot yaratuvchi CLI

**Talablar:** CSV/JSON faylidan mahsulot hisobotini o‘qi, qatorlarni tekshir, jami summani hisobla va JSONga yoz.

**Tekshiruv holatlari:** A 10×2, B 5×3 → 35; bo‘sh data → 0; yo‘q fayl va yaroqsiz qiymat → xabar.

**Cheklovlar:** with, UTF-8, csv/json, pathlib, custom module va main guard; bir nechta input faylni sinab ko‘r.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-08

**Big-O, array va linked list** · Supporting (Tayanch) · 17 mikro-dars

### py-08-01 — DSA nima va qachon kerak?

**Tushuncha.** DSA ma’lumotni qanday saqlash va muammoni qanday samarali yechishni o‘rganadi.

**Kod / amaliy namuna.** Listdan qidirish va dictdan kalit orqali qidirish.

**Mustaqil mashq.** 1000 kontakt uchun ikkita saqlash usulini tanla; qidiruv, qo‘shish va tartib talablarini yoz.

### py-08-02 — Time complexity nima?

**Tushuncha.** Time complexity input hajmi n o‘sganda operatsiyalar sonining o‘sishini ifodalaydi; Big-O yuqori asimptotik chegara.

**Kod / amaliy namuna.** `for x in a: print(x)` → O(n) iteratsiya.

**Mustaqil mashq.** n=10,100,1000 uchun bitta va ikkita nested loop iteratsiyalarini hisobla.

### py-08-03 — Space complexity nima?

**Tushuncha.** Space complexity inputga nisbatan xotira o‘sishi; auxiliary space qo‘shimcha xotirani bildiradi.

**Kod / amaliy namuna.** `b=a.copy()` → O(n) qo‘shimcha xotira.

**Mustaqil mashq.** Listni teskari nusxalash va faqat oxirgi qiymatni olishning qo‘shimcha xotirasini solishtir.

### py-08-04 — O(1) intuitiv

**Tushuncha.** O(1) bajarish xarajati n bilan o‘smaydi.

**Kod / amaliy namuna.** `a[0]` — list uchun O(1).

**Mustaqil mashq.** Listning birinchi va oxirgi elementini loopsiz ol; nima uchun n ga bog‘liq emasligini izohla.

### py-08-05 — O(n) intuitiv

**Tushuncha.** O(n) xarajat n ga proporsional o‘sadi.

**Kod / amaliy namuna.** `for x in a: total += x`

**Mustaqil mashq.** Listning min va maxini bitta loopda top; taqqoslashlar sonini hisobla.

### py-08-06 — O(log n) intuitiv

**Tushuncha.** O(log n) har qadamda masala hajmi doimiy nisbatda kichrayganda keladi.

**Kod / amaliy namuna.** `while n>1: n//=2`

**Mustaqil mashq.** 1024 va 1000 sonlarini 1 gacha ikkiga bo‘l; qadamlar sonini top.

### py-08-07 — O(n²) intuitiv

**Tushuncha.** O(n²) ko‘pincha har bir elementni har biri bilan taqqoslashda yuz beradi.

**Kod / amaliy namuna.** `for x in a:` ichida `for y in a: ...`

**Mustaqil mashq.** Takroriy element borligini barcha juftliklar bilan tekshir; o‘zini o‘zi taqqoslama.

### py-08-08 — Best, average va worst case

**Tushuncha.** Best/average/worst case turli inputlar uchun xarajat; average uchun input taqsimoti muhim.

**Kod / amaliy namuna.** Linear qidiruvda birinchi mos — O(1), oxirgi yoki yo‘q — O(n).

**Mustaqil mashq.** Bir qidiruv uchun bosh, oxir va mavjud bo‘lmagan qiymat sinovlarini tayyorla.

### py-08-09 — Python list asosida dynamic array

**Tushuncha.** Python list odatda dynamic array: joy yetmasa sig‘im oshiriladi, indeks tez.

**Kod / amaliy namuna.** `a=[]; a.append(1); a.append(2)`

**Mustaqil mashq.** 10, 100 va 1000 element qo‘sh; sig‘im va uzunlik bir tushuncha emasligini izohla.

### py-08-10 — Array indekslash va append

**Tushuncha.** List index O(1), append amortized O(1); ba’zi resize operatsiyalar qimmatroq.

**Kod / amaliy namuna.** `a.append(8); a[-1]`

**Mustaqil mashq.** n elementni append bilan to‘ldir va har 100-elementni indeks orqali o‘qi.

### py-08-11 — List insert/delete xarajati

**Tushuncha.** List o‘rtasiga insert/delete keyingi elementlarni siljitadi, O(n); oxiridan pop odatda O(1).

**Kod / amaliy namuna.** `a.insert(0,5); a.pop(0)`

**Mustaqil mashq.** Navbat usulida list boshidan 100 element o‘chir; nima uchun xarajat to‘planishini hisobla.

### py-08-12 — Node va next pointer

**Tushuncha.** Node qiymat va keyingi nodega reference saqlaydi. Bu phase uchun minimal class sintaksisi tayanch sifatida beriladi.

**Kod / amaliy namuna.** `class Node:` ichida `def __init__(self,value): self.value=value; self.next=None`

**Mustaqil mashq.** Tayyor Node shablonidan 3 node yasab next bilan bog‘la; class tafsiloti PY-11 da.

### py-08-13 — Singly Linked List yaratish

**Tushuncha.** Singly linked list head orqali boshlanadi; oxirgi node next=None.

**Kod / amaliy namuna.** `head=Node(1); head.next=Node(2)`

**Mustaqil mashq.** Tayyor Node bilan 4 ta tugun bog‘la, bo‘sh ro‘yxatda head=None bo‘lsin.

### py-08-14 — LinkedList traverse

**Tushuncha.** Traverse current node dan next orqali oxirigacha o‘tadi.

**Kod / amaliy namuna.** `cur=head`; `while cur is not None: print(cur.value); cur=cur.next`

**Mustaqil mashq.** Tugun qiymatlarini oddiy listga yig‘; head=None holatda [] qaytarsin.

### py-08-15 — LinkedList append va prepend

**Tushuncha.** Prepend headni yangilaydi O(1); tail mavjud bo‘lsa append O(1), aks holda O(n).

**Kod / amaliy namuna.** `node.next=head; head=node`

**Mustaqil mashq.** Head/tail shablonida append va prepend yoz; bo‘sh va bitta tugunli holatni tekshir.

### py-08-16 — LinkedList qidirish

**Tushuncha.** LinkedList search ketma-ket traverse qiladi; umumiy O(n).

**Kod / amaliy namuna.** `while cur is not None:` ichida `if cur.value==target: ...`

**Mustaqil mashq.** Birinchi mos qiymat indeksini, bo‘lmasa -1 qaytar; takroriy qiymatli list bilan tekshir.

### py-08-17 — Array vs LinkedList taqqoslash

**Tushuncha.** Array random access uchun, linked list ma’lum node yonida insert uchun qulay; node qidiruvi alohida xarajat.

**Kod / amaliy namuna.** List index O(1); singly LinkedList index O(n).

**Mustaqil mashq.** 1000 elementli ikki tuzilma uchun append, index, search va prepend xarajat jadvalini tuz.

### Nazorat ishi — LinkedList append/search CLI

**Talablar:** Minimal Node/LinkedList: APPEND, PREPEND, SEARCH, TRAVERSE; head/tail invariant.

**Tekshiruv holatlari:** Bo‘sh search→-1; append 7,3; prepend 9→[9,7,3]; search 7→1; duplicate birinchi indeks.

**Cheklovlar:** Tayyor minimal Node class tayanch sifatida; tail bilan append O(1), search O(n); built-in listni backend qilma.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-09

**Stack, Queue va Heap** · Supporting (Tayanch) · 14 mikro-dars

### py-09-01 — Stack LIFO nima?

**Tushuncha.** Stack oxirgi kelgan birinchi chiqadi (LIFO).

**Kod / amaliy namuna.** `stack=[1,2]; stack.pop()` → 2

**Mustaqil mashq.** 5 amal ketma-ketligida stackning har bosqichini chiz.

### py-09-02 — push va pop operatsiyalari

**Tushuncha.** Push qo‘shadi, pop oxirgi elementni olib tashlaydi; bo‘sh stackni tekshir.

**Kod / amaliy namuna.** `s=[]; s.append("A"); s.pop()`

**Mustaqil mashq.** push/pop/peek amallarini yoz; peek elementni o‘chirmasin.

### py-09-03 — Stack bilan browser history

**Tushuncha.** Browser historyda current oxirgi sahifa, BACK uchun avvalgi sahifa qolishi kerak.

**Kod / amaliy namuna.** `history=["home","docs"]; history.pop()` → docs

**Mustaqil mashq.** VISIT/BACK/CURRENT buyruqlarini simulyatsiya qil; history uzunligi 1 bo‘lsa BACK o‘zgartirmasin.

### py-09-04 — Qavs balansini Stack orqali tekshirish

**Tushuncha.** Ochilgan qavs push, yopilganda oxirgi mos qavs pop; yakunda stack bo‘sh.

**Kod / amaliy namuna.** `([{}])` valid; `([)]` invalid.

**Mustaqil mashq.** `()`, `[]`, `{}` aralashgan matnni tekshir; boshida yopuvchi va bo‘sh matnni sinab ko‘r.

### py-09-05 — Queue FIFO nima?

**Tushuncha.** Queue birinchi kelgan birinchi chiqadi (FIFO).

**Kod / amaliy namuna.** A,B,C kirsa, A avval chiqadi.

**Mustaqil mashq.** 5 mijozning kelish va xizmat ketma-ketligini navbat ko‘rinishida yoz.

### py-09-06 — enqueue va dequeue

**Tushuncha.** Enqueue oxiriga, dequeue boshidan oladi.

**Kod / amaliy namuna.** `q=[1,2]; q.append(3); q.pop(0)`

**Mustaqil mashq.** Navbatga qo‘shish va xizmat ko‘rsatish funksiyasi; bo‘sh queue uchun xabar.

### py-09-07 — deque nima uchun kerak?

**Tushuncha.** collections.deque ikki uchidan samarali qo‘shish/o‘chirish imkonini beradi.

**Kod / amaliy namuna.** `from collections import deque`; `q=deque([1,2]); q.popleft()`

**Mustaqil mashq.** List queue ni deque ga almashtir; boshidan pop xarajatini tushuntir.

### py-09-08 — Queue orqali ishlar navbati

**Tushuncha.** Task queue ishlarni kelish tartibida saqlaydi va worker olib bajaradi.

**Kod / amaliy namuna.** `q=deque(["email","report"]); task=q.popleft()`

**Mustaqil mashq.** ADD, PROCESS, STATUS amallaridan iborat task queue CLI yoz.

### py-09-09 — Priority queue tushunchasi

**Tushuncha.** Priority queue kelish vaqti emas, priority asosida element oladi.

**Kod / amaliy namuna.** `(1,"urgent")` kichik son yuqori ustuvorlik deb kelishib ol.

**Mustaqil mashq.** 3 shoshilinch va 2 oddiy vazifani ustuvorlik bo‘yicha chiqar; tenglikda FIFO bo‘lsin.

### py-09-10 — Heap strukturasi nima?

**Tushuncha.** Heap complete tree va heap invariantga asoslangan; butun list sorted bo‘lishi shart emas.

**Kod / amaliy namuna.** Min-heap misoli `[1,3,2,7,5]`.

**Mustaqil mashq.** Berilgan arrayda har parent <= children ekanini tekshir; indekslar 2*i+1 va 2*i+2.

### py-09-11 — Min-heap va max-heap

**Tushuncha.** Min-heap ildizida eng kichik, max-heap ildizida eng katta qiymat.

**Kod / amaliy namuna.** Min-heap `[1,4,3]`; max-heap `[9,4,7]`.

**Mustaqil mashq.** 6 narxdan 3 ta eng kichigini olish uchun qaysi heap ishlatilishini tushuntir.

### py-09-12 — heapq bilan push/pop

**Tushuncha.** heapq odatda min-heap; heappush/heappop O(log n), heapify O(n).

**Kod / amaliy namuna.** `import heapq; h=[]; heapq.heappush(h,3); heapq.heappop(h)`

**Mustaqil mashq.** Priority queue yoz; `(priority, arrival_index, task)` bilan barqaror tie-break ta’minla.

### py-09-13 — Stack va Queue trade-off

**Tushuncha.** Stack teskari tartib va undo uchun, queue adolatli xizmat, heap priority uchun.

**Kod / amaliy namuna.** Undo → stack; printer → queue; shoshilinch vazifa → heap.

**Mustaqil mashq.** 8 real holatni mos strukturalarga ajrat va noto‘g‘ri tanlov oqibatini yoz.

### py-09-14 — Amaliy navbat simulyatsiyasi

**Tushuncha.** Simulyatsiyada vaqt va navbat o‘zgarishini aniq qoidalar bilan hisoblash kerak.

**Kod / amaliy namuna.** Har minut kelgan mijoz enqueue, bo‘sh kassir dequeue.

**Mustaqil mashq.** Kelish va xizmat vaqti berilgan mijozlar uchun o‘rtacha kutish va eng uzun navbatni top.

### Nazorat ishi — Browser History + task queue

**Talablar:** Browser VISIT/BACK/CURRENT va task ADD/PROCESS/STATUS; alohida stack va deque.

**Tekshiruv holatlari:** VISIT A,B; BACK→A; yana BACK→oldingi yo‘q; queue A,B→PROCESS A, keyin B; bo‘sh queue.

**Cheklovlar:** Historyda bosh sahifani saqla; priority queue qo‘shimcha challenge, bir xil priority FIFO.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-10

**HashMap, daraxtlar va algoritmlar** · Supporting (Tayanch) · 20 mikro-dars

### py-10-01 — Hash nima?

**Tushuncha.** Hash kalitdan butun sonli xesh qiymatini hosil qiladi; bir xil teng hashable qiymatlarning hash qiymati teng bo‘ladi.

**Kod / amaliy namuna.** `hash("python")` (runlar orasida o‘zgarishi mumkin).

**Mustaqil mashq.** Oddiy sum(ord(c)) % 10 hash yoz; `ab` va `ba` ni solishtir.

### py-10-02 — HashMap va dictionary bog‘liqligi

**Tushuncha.** HashMap kalitni hash orqali slotga joylaydi; Python dict hash table asosidagi mapping.

**Kod / amaliy namuna.** `d={"A":10}; d["A"]` → 10

**Mustaqil mashq.** So‘zlar chastotasini dict orqali O(n) kutilgan vaqt bilan hisobla.

### py-10-03 — Hash collision tushunchasi

**Tushuncha.** Hash collision turli kalitlarning hash/slot mos kelishi; chaining yoki probing bilan hal qilinadi.

**Kod / amaliy namuna.** `sum(map(ord,"ab")) == sum(map(ord,"ba"))`

**Mustaqil mashq.** 5 bucketli chaining jadval shabloni yarat; 2 to‘qnashuvli kalitni to‘g‘ri qidir.

### py-10-04 — Average va worst-case lookup

**Tushuncha.** Hash table lookup odatda O(1) kutilgan, yomon collision holatida O(n) bo‘lishi mumkin.

**Kod / amaliy namuna.** Barcha kalitlar bitta bucketda bo‘lsa linear qidiruv.

**Mustaqil mashq.** Chaining jadvalda 10 ta kalit uchun bir va bir nechta bucket xarajatini sanab chiq.

### py-10-05 — Binary tree node nima?

**Tushuncha.** Binary tree node eng ko‘pi bilan ikkita child reference saqlaydi.

**Kod / amaliy namuna.** `node.left=None; node.right=None` (tayyor Node class shabloni).

**Mustaqil mashq.** 7 tugunli daraxtni chiz va reference bilan ulab chiq.

### py-10-06 — BST va tartib qoidasi

**Tushuncha.** BSTda har node uchun chapdagi kalitlar kichik, o‘ngdagi katta; duplicate qoidasi oldindan belgilanadi.

**Kod / amaliy namuna.** 5 ildiz, 3 chap, 7 o‘ng.

**Mustaqil mashq.** [8,3,10,1,6,14] ketma-ketligidan BST chiz; keyin 4 ni joylashtir.

### py-10-07 — BST insert

**Tushuncha.** BST insert taqqoslab mos bo‘sh childga node qo‘yadi; O(h), h daraxt balandligi.

**Kod / amaliy namuna.** `if value<cur.value: ...` aks holda o‘ngga.

**Mustaqil mashq.** Tayyor Node shablonida iterative insert yoz; duplicate ni rad et, bo‘sh daraxtni tekshir.

### py-10-08 — BST search

**Tushuncha.** BST search har taqqoslashda bitta yo‘nalishni tanlaydi; O(h).

**Kod / amaliy namuna.** `while cur:` orqali chap/o‘ngga o‘tish.

**Mustaqil mashq.** Topilgan node yoki None qaytar; root, leaf va yo‘q qiymatni sinab ko‘r.

### py-10-09 — BST inorder traversal

**Tushuncha.** Inorder chap → node → o‘ng; BSTda tartiblangan qiymatlar chiqadi. Recursion keyingi darsda, hozir stack bilan ham mumkin.

**Kod / amaliy namuna.** 3 ← 5 → 7 daraxti inorder: 3,5,7.

**Mustaqil mashq.** Stack yordamida iterative inorder yoz, yoki tayyor recursion shablonini trace qil.

### py-10-10 — Recursion nima?

**Tushuncha.** Recursion funksiya o‘zini kichikroq muammo bilan chaqiradi.

**Kod / amaliy namuna.** `def countdown(n):` ichida `if n<=0: return`, keyin print va `countdown(n-1)`.

**Mustaqil mashq.** n dan 1 gacha chiqarishni recursion bilan yoz; n=0 holatini tekshir.

### py-10-11 — Base case va recursive case

**Tushuncha.** Base case to‘xtash sharti, recursive case muammoni kichraytiradi.

**Kod / amaliy namuna.** `def fact(n): return 1 if n==0 else n*fact(n-1)` (n>=0).

**Mustaqil mashq.** 0 va musbat son uchun factorial yoz, manfiy inputni rad et.

### py-10-12 — Call stack qanday o‘sadi?

**Tushuncha.** Har recursive chaqiruv call stackda frame saqlaydi; qaytish teskari tartibda.

**Kod / amaliy namuna.** `fact(3)` → 3*fact(2) → 3*2*fact(1) → 6.

**Mustaqil mashq.** fact(4) uchun call stack push/pop tartibini chiz va depth ni top.

### py-10-13 — Binary Search sharti

**Tushuncha.** Binary search sorted kolleksiya va izchil taqqoslash talab qiladi.

**Kod / amaliy namuna.** `[1,3,5,7,9]` da target=7.

**Mustaqil mashq.** Sorted va unsorted listlarda binary search ishlatilishi nega farq qilishini ko‘rsat.

### py-10-14 — Binary Search step-by-step

**Tushuncha.** Binary search mid orqali qidiruv oralig‘ini yarimga qisqartiradi; O(log n).

**Kod / amaliy namuna.** `mid=(lo+hi)//2`; mos kelmasa `lo=mid+1` yoki `hi=mid-1`.

**Mustaqil mashq.** Iterative binary_search yoz; bo‘sh, bitta element va mavjud bo‘lmagan targetni tekshir.

### py-10-15 — Linear Search

**Tushuncha.** Linear search ketma-ket qaraydi va sorted bo‘lishni talab qilmaydi.

**Kod / amaliy namuna.** `for i,x in enumerate(a):` ichida `if x==target: return i`.

**Mustaqil mashq.** Birinchi va oxirgi mos indeksni topadigan ikki variant yoz; taqqoslashlarni sanab ber.

### py-10-16 — Bubble Sort intuitiv

**Tushuncha.** Bubble sort yonma-yon elementlarni solishtirib almashtiradi; worst O(n²).

**Kod / amaliy namuna.** `if a[j]>a[j+1]: a[j],a[j+1]=a[j+1],a[j]`

**Mustaqil mashq.** Bubble sort yoz; swap bo‘lmasa to‘xtatish bilan sorted inputni optimallashtir.

### py-10-17 — Merge Sort va divide-and-conquer

**Tushuncha.** Merge sort bo‘lib, qismlarni sort qilib, tartibli merge qiladi; O(n log n) vaqt, odatiy listda O(n) qo‘shimcha xotira.

**Kod / amaliy namuna.** `[1,4]` va `[2,3]` → `[1,2,3,4]`.

**Mustaqil mashq.** Avval ikki sorted listni merge qil; keyin recursive merge sort yoz.

### py-10-18 — Quick Sort pivot tushunchasi

**Tushuncha.** Quick sort pivot bo‘yicha partition qiladi; odatda O(n log n), worst O(n²).

**Kod / amaliy namuna.** Pivot 4: [2,1] < 4, [7,5] > 4.

**Mustaqil mashq.** Listni kichik/teng/katta qismlarga ajrat; duplicates bilan recursive sort sinovi yoz.

### py-10-19 — Sorting stable va unstable tushunchasi

**Tushuncha.** Stable sort teng keyli elementlar asl tartibini saqlaydi; unstable kafolatlamaydi.

**Kod / amaliy namuna.** `sorted([("A",2),("B",2)],key=lambda x:x[1])` A,B tartibini saqlaydi (lambda PY-14 da).

**Mustaqil mashq.** Teng balli studentlar ro‘yxatida avvalgi tartib saqlanishini tekshir; bubble sortda > vs >= ni solishtir.

### py-10-20 — Algorithm complexity comparison

**Tushuncha.** Algoritm tanlash data tartibi, hajmi, memory, worst-case va barqarorlikka bog‘liq.

**Kod / amaliy namuna.** Linear O(n), binary O(log n) sorted bo‘lsa; merge O(n log n).

**Mustaqil mashq.** 100,1000,5000 elementda qidiruv va sorting vaqtini perf_counter bilan o‘lcha; nusxalar bir xil bo‘lsin.

### Nazorat ishi — Qidiruv va sorting benchmark CLI

**Talablar:** Linear va binary search, bubble/merge/quick sort; bir xil input nusxalaridan benchmark.

**Tekshiruv holatlari:** [3,1,2,2] sort→[1,2,2,3]; bo‘sh list; binary search sorted data; target yo‘q→-1.

**Cheklovlar:** perf_counter, bir nechta takror, input hajmi va complexity jadvali; fake benchmark yo‘q.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-11

**OOP asoslari** · Supporting (Tayanch) · 15 mikro-dars

### py-11-01 — OOP nima va nega kerak?

**Tushuncha.** OOP holat va xatti-harakatni obyektga birlashtiradi; har muammoda shart emas.

**Kod / amaliy namuna.** Student: name, scores, average().

**Mustaqil mashq.** Student trackerda qaysi holat va metodlar bitta obyektga tegishli ekanini yoz.

### py-11-02 — Class e’lon qilish

**Tushuncha.** class obyektlar uchun tip va namespace e’lon qiladi.

**Kod / amaliy namuna.** `class Student: pass`

**Mustaqil mashq.** Student va Course bo‘sh classlarini yarat; ularning nomlarini chiqar.

### py-11-03 — Object / instance yaratish

**Tushuncha.** Instance classdan yaratilgan alohida obyekt.

**Kod / amaliy namuna.** `a=Student(); b=Student(); print(a is b)` → False

**Mustaqil mashq.** 3 Student instance yarat va ularning identitysi farqli ekanini tekshir.

### py-11-04 — __init__ konstruktori

**Tushuncha.** __init__ yangi instance holatini boshlang‘ich qiymat bilan sozlaydi (obyektni __new__ yaratadi).

**Kod / amaliy namuna.** `def __init__(self,name): self.name=name`

**Mustaqil mashq.** Name va age oluvchi Student __init__ yoz; ikkita instance yarat.

### py-11-05 — self nimani bildiradi?

**Tushuncha.** self instance metodining birinchi parametri; chaqiruvda avtomatik uzatiladi.

**Kod / amaliy namuna.** `a.greet()` taxminan `Student.greet(a)` bilan teng.

**Mustaqil mashq.** Ikki xil nomli obyekt uchun greet yoz; self bo‘lmasa keladigan xatoni tushuntir.

### py-11-06 — Instance attributes

**Tushuncha.** Instance attribute har bir instancega xos holatni saqlaydi.

**Kod / amaliy namuna.** `self.scores=[]`

**Mustaqil mashq.** Ikki student uchun mustaqil scores list yarat; biriga ball qo‘shish ikkinchisiga ta’sir qilmasin.

### py-11-07 — Instance methods

**Tushuncha.** Instance method self orqali holatni o‘qiydi yoki o‘zgartiradi.

**Kod / amaliy namuna.** `def add_score(self,score): self.scores.append(score)`

**Mustaqil mashq.** add_score va average metodlarini yoz; bo‘sh ball holati uchun None qaytar.

### py-11-08 — Class attributes

**Tushuncha.** Class attribute classga tegishli, instance orqali ham o‘qilishi mumkin; mutable qiymatni ulashish xavfi bor.

**Kod / amaliy namuna.** `class Student: school="PDP"`

**Mustaqil mashq.** Umumiy school va alohida name saqla; class attribute ni instance orqali shadow qilib ko‘r.

### py-11-09 — @classmethod nima?

**Tushuncha.** classmethod birinchi parametr cls oladi; alternative constructor uchun qulay.

**Kod / amaliy namuna.** `@classmethod` / `def from_text(cls,text): return cls(text.strip())`

**Mustaqil mashq.** `"Ali,20"` matnidan Student yaratadigan classmethod yoz.

### py-11-10 — @staticmethod nima?

**Tushuncha.** staticmethod self yoki cls olmaydi; class bilan mantiqiy bog‘liq util funksiya.

**Kod / amaliy namuna.** `@staticmethod` / `def valid_score(n): return 0<=n<=100`

**Mustaqil mashq.** Ball validatsiyasini staticmethod sifatida yoz va -1,0,100,101 ni sinab ko‘r.

### py-11-11 — __str__ bilan o‘qiladigan matn

**Tushuncha.** __str__ foydalanuvchi uchun o‘qilishi qulay string qaytaradi.

**Kod / amaliy namuna.** `def __str__(self): return self.name`

**Mustaqil mashq.** Student print qilinganda ism va ball soni chiqsin.

### py-11-12 — __repr__ bilan developer ko‘rinishi

**Tushuncha.** __repr__ debugging uchun obyektni noaniqliksiz ifodalashga harakat qiladi.

**Kod / amaliy namuna.** `def __repr__(self): return f"Student({self.name!r})"`

**Mustaqil mashq.** List ichidagi Studentlar repr yordamida o‘qilishi qulay bo‘lsin.

### py-11-13 — Composition nima?

**Tushuncha.** Composition obyekt boshqa obyektni atribut sifatida tutadi (has-a).

**Kod / amaliy namuna.** `class Course:` ichida `self.students=[]`

**Mustaqil mashq.** Coursega Student instance larni qo‘shish va ro‘yxatini chiqarish metodini yoz.

### py-11-14 — OOP va oddiy function trade-off

**Tushuncha.** OOP state va bog‘liq amallar ko‘p bo‘lsa qulay; stateless oddiy funksiya yengilroq.

**Kod / amaliy namuna.** `tax(price)` funksiya; `BankAccount.deposit()` obyekt.

**Mustaqil mashq.** 3 vazifani funksiya yoki class sifatida loyihala; tanlov sababini yoz.

### py-11-15 — Kichik Student class loyiha

**Tushuncha.** Student loyihasida validation, instance state va composition birga ishlaydi.

**Kod / amaliy namuna.** `student.add_score(90); course.add_student(student)`

**Mustaqil mashq.** Student/Course tracker yoz; duplicate ID, noto‘g‘ri ball, bo‘sh course va eng yuqori o‘rtachani tekshir.

### Nazorat ishi — Student/course tracker OOP

**Talablar:** Student, Course: score validation, student qo‘shish, o‘rtacha ball va top student, repr/str.

**Tekshiruv holatlari:** Ali [80,100]→90; bo‘sh score→None; duplicate ID rad; -1 va 101 rad.

**Cheklovlar:** Har instance alohida mutable state; Course contains Student; tashqi DB shart emas.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-12

**OOP advanced: inheritance, polymorphism** · Supporting (Tayanch) · 17 mikro-dars

### py-12-01 — Inheritance tushunchasi

**Tushuncha.** Inheritance parent class xatti-harakatini childga meros qiladi; is-a munosabatiga mos.

**Kod / amaliy namuna.** `class Dog(Animal): pass`

**Mustaqil mashq.** Vehicle parent va Car child yarat; umumiy metodni childdan chaqir.

### py-12-02 — Parent va child class

**Tushuncha.** Parent umumiy xususiyatlarni, child o‘ziga xos xususiyatlarni ifodalaydi.

**Kod / amaliy namuna.** `class SavingsAccount(Account): ...`

**Mustaqil mashq.** Employee va Manager classlarini yarat; umumiy ism, maxsus bo‘lim atributini ajrat.

### py-12-03 — super() bilan ota metod

**Tushuncha.** super() MRO bo‘yicha keyingi class metodiga murojaat qiladi, ko‘pincha parent initializer uchun.

**Kod / amaliy namuna.** `super().__init__(name)`

**Mustaqil mashq.** Child initda parentdagi name ni va childdagi role ni o‘rnat.

### py-12-04 — Method overriding

**Tushuncha.** Overriding childda bir xil nomli metodni boshqa xatti-harakat bilan almashtiradi.

**Kod / amaliy namuna.** `class Dog(Animal):` ichida `def speak(self): return "Woof"`

**Mustaqil mashq.** Ikki payment providerning fee metodini turlicha yoz; chaqiruv interfeysi bir xil bo‘lsin.

### py-12-05 — Polymorphism nima?

**Tushuncha.** Polymorphism bir xil interfeys orqali turli obyektlar turlicha ishlashidir.

**Kod / amaliy namuna.** `for p in providers: print(p.pay(100))`

**Mustaqil mashq.** Card va Cash classlari uchun pay metodini yoz; bir loopda ikkalasini ishlat.

### py-12-06 — Duck typing tushunchasi

**Tushuncha.** Duck typing obyektning aniq tipidan ko‘ra kerakli xatti-harakatiga qaraydi.

**Kod / amaliy namuna.** `def notify(sender): sender.send("OK")`

**Mustaqil mashq.** Email va Console senderlar yarat; inheritance ishlatmay bitta notify funksiyasida ishlat.

### py-12-07 — Encapsulation amaliy qoida

**Tushuncha.** Encapsulation ichki holatni aniq public metodlar orqali boshqaradi; invariantni himoya qiladi.

**Kod / amaliy namuna.** `account.deposit(50)` balance ni nazorat bilan o‘zgartiradi.

**Mustaqil mashq.** BankAccountda manfiy deposit va balansdan ortiq withdrawalni rad et.

### py-12-08 — Public va underscore convention

**Tushuncha.** Public nom foydalanish uchun, _name ichki API konvensiyasi; Python maxfiylikni majburlamaydi.

**Kod / amaliy namuna.** `self._balance=0`

**Mustaqil mashq.** Classning public metodlari va ichki atributlarini ajratib nomla; tashqaridan _balance ga tegmaslik qoidasini yoz.

### py-12-09 — Name mangling nima emas?

**Tushuncha.** __name name mangling orqali class nomi bilan o‘zgartiriladi; xavfsizlik yoki qat’iy private emas.

**Kod / amaliy namuna.** `self.__token` odatda `_ClassName__token` nomiga aylanadi.

**Mustaqil mashq.** Parent/child ikkisi __value ishlatsa qanday nomlar hosil bo‘lishini tekshir; maxfiy kalit saqlash deb qabul qilma.

### py-12-10 — Properties @property

**Tushuncha.** @property metodni atribut kabi o‘qishga imkon beradi; hisoblangan qiymat ham bo‘lishi mumkin.

**Kod / amaliy namuna.** `@property` / `def total(self): return self.price*self.qty`

**Mustaqil mashq.** Order uchun total property yarat; qty o‘zgarsa total avtomatik hisoblansin.

### py-12-11 — Getter va setterlar

**Tushuncha.** Setter assignmentni nazorat qiladi; getter va setter bir xil propertyga bog‘lanadi.

**Kod / amaliy namuna.** `@age.setter` / `def age(self,value): ...`

**Mustaqil mashq.** Age property 0–120 oralig‘ini qabul qilsin; noto‘g‘ri qiymat ValueError.

### py-12-12 — Abstract interface tushunchasi

**Tushuncha.** Abstract interface implementationlar bajarishi kerak bo‘lgan shartnomani bildiradi; abc bilan majburiy metod belgilanadi.

**Kod / amaliy namuna.** `from abc import ABC, abstractmethod`; `@abstractmethod` bilan pay.

**Mustaqil mashq.** PaymentProvider ABC va ikki konkret provider yoz; metod yetishmasa instance yaratib bo‘lmasin.

### py-12-13 — Multiple inheritance haqida kirish

**Tushuncha.** Multiple inheritance bir nechta parent; MRO metod qidirish tartibini belgilaydi.

**Kod / amaliy namuna.** `class C(A,B): pass`; `C.mro()`

**Mustaqil mashq.** A va B da bir xil method bo‘lsa C qaysisini chaqiradi? Parentlar tartibini almashtir.

### py-12-14 — Dunder __eq__ va __len__

**Tushuncha.** __eq__ qiymat tengligi, __len__ obyekt uzunligini ifodalash uchun protokol metodlari.

**Kod / amaliy namuna.** `def __len__(self): return len(self.items)`

**Mustaqil mashq.** Cart uchun len va ikkita Cartning itemlari tengligini tekshiruvchi __eq__ yoz; boshqa tip uchun NotImplemented qaytar.

### py-12-15 — Dunder __iter__ ga kirish

**Tushuncha.** __iter__ iterator qaytarib obyektni for sikliga moslaydi.

**Kod / amaliy namuna.** `def __iter__(self): return iter(self.items)`

**Mustaqil mashq.** Course classini for orqali studentlar bo‘ylab yuradigan qil.

### py-12-16 — Inheritance vs composition

**Tushuncha.** Inheritance is-a, composition has-a; composition bog‘liqlikni almashtirishga mos.

**Kod / amaliy namuna.** `Order` ichida `PaymentProvider` obyektini saqlash.

**Mustaqil mashq.** Payment service uchun provider subclassi emas, provider atributi bilan composition loyihala.

### py-12-17 — OOP dizaynidagi xatolar

**Tushuncha.** OOP xatolari: haddan tashqari inheritance, shared mutable state, noaniq mas’uliyat va qattiq bog‘liqlik.

**Kod / amaliy namuna.** God class barcha validation, payment, loggingni bajaradi.

**Mustaqil mashq.** Bitta katta shop classini 3 mas’uliyatga ajrat; qaysi invariant qayerda saqlanishini yoz.

### Nazorat ishi — Payment provider abstraction

**Talablar:** PaymentProvider ABC; Card va Cash simulyatorlari, PaymentService composition.

**Tekshiruv holatlari:** Amount=100 uchun belgilangan simulyatsiya fee; manfiy sum rad; provider yo‘q metod bilan abstract qoladi.

**Cheklovlar:** Real to‘lov yo‘q; polymorphism, validation, feyk tranzaksiya ma’lum belgilangan simulyatsiya, maxfiy ma’lumot so‘ramaslik.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-13

**Comprehensions, iterator va generator** · Supporting (Tayanch) · 15 mikro-dars

### py-13-01 — List comprehension sintaksisi

**Tushuncha.** List comprehension iteratsiyadan yangi list yasaydi.

**Kod / amaliy namuna.** `[x*x for x in range(5)]` → [0,1,4,9,16]

**Mustaqil mashq.** Oddiy loopdagi kvadratlar ro‘yxatini comprehension bilan qayta yoz.

### py-13-02 — List comprehension shart bilan

**Tushuncha.** Comprehension oxiridagi if elementni filtrlaydi; boshidagi if/else qiymat tanlaydi.

**Kod / amaliy namuna.** `[x*x for x in range(10) if x%2==0]`

**Mustaqil mashq.** -5 dan 5 gacha faqat musbat toq sonlar kvadratini ol.

### py-13-03 — Nested comprehension qanday o‘qiladi?

**Tushuncha.** Nested comprehension for larni chapdan o‘ngga nested loop tartibida bajaradi.

**Kod / amaliy namuna.** `[(i,j) for i in range(2) for j in range(3)]`

**Mustaqil mashq.** 2D matrixni bitta listga flatten qil; keyin 3x3 ko‘paytirish jadvali yarat.

### py-13-04 — Dict comprehension

**Tushuncha.** Dict comprehension key:value juftliklarini hisoblaydi; takroriy key oxirgi qiymatni saqlaydi.

**Kod / amaliy namuna.** `{x:x*x for x in range(4)}`

**Mustaqil mashq.** Ism va ball dictidan faqat 70+ ballarni yangi dictga ol.

### py-13-05 — Set comprehension

**Tushuncha.** Set comprehension unique hashable natijalar to‘plamini yasaydi.

**Kod / amaliy namuna.** `{x.lower() for x in ["A","a","B"]}` → a,b to‘plami.

**Mustaqil mashq.** Matndagi noyob kichik harflarni top; bo‘sh joylarni filtrla.

### py-13-06 — Iterable va iterator farqi

**Tushuncha.** Iterable iter() berishi mumkin; iterator next() bilan ketma-ket qiymat beradi va holat saqlaydi.

**Kod / amaliy namuna.** `it=iter([1,2]); next(it)` → 1

**Mustaqil mashq.** Bitta listdan ikkita iterator yarat, birini siljit va ikkinchisining natijasini kuzat.

### py-13-07 — iter() va next()

**Tushuncha.** iter iterator yaratadi, next navbatdagi qiymatni oladi.

**Kod / amaliy namuna.** `it=iter("AB"); next(it); next(it)` → A,B.

**Mustaqil mashq.** For ishlatmay 3 elementdan iterator orqali o‘t; next default qiymatini sinab ko‘r.

### py-13-08 — StopIteration

**Tushuncha.** Iterator tugaganda StopIteration chiqadi; for uni avtomatik ushlaydi.

**Kod / amaliy namuna.** `next(iter([]), None)` → None

**Mustaqil mashq.** while va try/except orqali iteratorni to‘liq o‘qiydigan kod yoz.

### py-13-09 — Generator function va yield

**Tushuncha.** Generator function yield bilan qiymat beradi va holatini keyingi nextgacha pauza qiladi.

**Kod / amaliy namuna.** `def count(n):` ichida `for i in range(n): yield i`

**Mustaqil mashq.** n gacha juft sonlarni generator bilan qaytar; hammasini birdan listga olma.

### py-13-10 — Generator expression

**Tushuncha.** Generator expression comprehensionga o‘xshaydi, lekin qiymatlarni talab bo‘yicha beradi.

**Kod / amaliy namuna.** `g=(x*x for x in range(10)); next(g)` → 0

**Mustaqil mashq.** 1 million kvadrat yig‘indisini generator expression bilan hisobla.

### py-13-11 — Lazy evaluation

**Tushuncha.** Lazy evaluation hisobni kerak bo‘lguncha kechiktiradi.

**Kod / amaliy namuna.** `g=(print(x) for x in range(3))` yaratishning o‘zida print bo‘lmaydi.

**Mustaqil mashq.** Generatorning yaratilishi va next paytida side effect qachon bo‘lishini oldindan ayt.

### py-13-12 — Generator bilan xotira foydalanish

**Tushuncha.** Streaming generator barcha elementni xotirada bir vaqtda saqlash zaruratini kamaytiradi.

**Kod / amaliy namuna.** `sum(x*x for x in range(100000))`

**Mustaqil mashq.** List va generator variantini tracemalloc bilan o‘lcha; natija bir xil, peak memory farqini qayd qil.

### py-13-13 — yield from tushunchasi

**Tushuncha.** yield from boshqa iterable qiymatlarini generator orqali delegatsiya qiladi.

**Kod / amaliy namuna.** `def both(): yield from [1,2]; yield from [3,4]`

**Mustaqil mashq.** Bir nechta listni yield from orqali bir oqimga aylantir.

### py-13-14 — range obyektining xususiyatlari

**Tushuncha.** range immutable sequence, butun ketma-ketlikni list sifatida saqlamaydi; qayta iteratsiya mumkin.

**Kod / amaliy namuna.** `range(0,1000000,2)[3]` → 6

**Mustaqil mashq.** range va list(range(...)) uzunligi, index va xotirasini solishtir.

### py-13-15 — Iteratorni qayta ishlatish cheklovi

**Tushuncha.** Iterator odatda bir martalik; tugagach qaytadan iterable yoki generator function chaqiruvini olish kerak.

**Kod / amaliy namuna.** `g=iter([1,2]); list(g)` → [1,2]; `list(g)` → [].

**Mustaqil mashq.** Bir generatorni ikki martalik hisobotda ishlatishdagi xatoni tuzat; kerak bo‘lsa factory yoz.

### Nazorat ishi — Million yozuvni streaming qayta ishlash

**Talablar:** Generator bilan 1 million sintetik yozuv yarat, streaming filter va aggregate qil, list bilan benchmark.

**Tekshiruv holatlari:** 0..999999 da juft sonlar 500000; bo‘sh iterator → 0; ikkinchi iteratsiya tugaganini tekshir.

**Cheklovlar:** Barcha yozuvni streaming variantda listga olma; tracemalloc peak va real elapsed solishtir.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-14

**Decorator, regex va context manager** · Supporting (Tayanch) · 17 mikro-dars

### py-14-01 — Lambda expression nima?

**Tushuncha.** Lambda bitta ifodali anonim funksiya yaratadi.

**Kod / amaliy namuna.** `double=lambda x:x*2`; `double(4)` → 8

**Mustaqil mashq.** Studentlarni ball bo‘yicha sorted key lambda bilan tartibla; oddiy def variantini yoz.

### py-14-02 — map/filter va comprehension tanlovi

**Tushuncha.** map o‘zgartiradi, filter tanlaydi; ikkalasi lazy iterator, comprehension ko‘pincha o‘qilishi oson.

**Kod / amaliy namuna.** `list(map(str,[1,2]))` → ["1","2"]

**Mustaqil mashq.** Sonlar listini musbatga filtrla va kvadratga ko‘tar; map/filter va comprehension variantlarini yoz.

### py-14-03 — Higher-order function

**Tushuncha.** Higher-order funksiya funksiya qabul qiladi yoki funksiya qaytaradi.

**Kod / amaliy namuna.** `def apply(f,x): return f(x)`

**Mustaqil mashq.** Ikkita turli transform funksiyasini bir apply metodida ishlat.

### py-14-04 — First-class function tushunchasi

**Tushuncha.** First-class function qiymat kabi nomga biriktiriladi, uzatiladi va qaytariladi.

**Kod / amaliy namuna.** `f=abs; f(-3)` → 3

**Mustaqil mashq.** Buyruq nomlari → funksiyalar dictini tuz; add/sub ni dict orqali chaqir.

### py-14-05 — Closure nima?

**Tushuncha.** Closure tashqi scope qiymatlarini saqlab qoladigan ichki funksiya.

**Kod / amaliy namuna.** `def multiplier(n): return lambda x:x*n`

**Mustaqil mashq.** double va triple closurelarini yarat; tashqi n alohida ekanini tekshir.

### py-14-06 — Decorator nima?

**Tushuncha.** Decorator funksiyani qabul qilib o‘ralgan funksiya qaytaradi; @ sintaksisi assignmentga teng.

**Kod / amaliy namuna.** `@decorate` taxminan `f=decorate(f)`

**Mustaqil mashq.** Funksiya chaqiruvidan oldin va keyin xabar chiqaruvchi decorator yoz; returnni saqla.

### py-14-07 — @wrapper va functools.wraps

**Tushuncha.** functools.wraps wrapperda original funksiya metadata sini saqlashga yordam beradi; @wrapper maxsus Python sintaksisi emas.

**Kod / amaliy namuna.** `from functools import wraps`; `@wraps(func)` bilan wrapper.

**Mustaqil mashq.** `*args, **kwargs` qabul qiluvchi log decorator yoz; __name__ oldin/keyin bir xil bo‘lsin.

### py-14-08 — Argumentli decorator asoslari

**Tushuncha.** Argumentli decorator odatda factory → decorator → wrapper qatlamlaridan iborat.

**Kod / amaliy namuna.** `@repeat(3)` repeat factory chaqiruvidir.

**Mustaqil mashq.** `@repeat(n)` yoz; n=0 uchun qoidani belgilab, return natijasini aniq tanla.

### py-14-09 — Regex literal va metabelgilar

**Tushuncha.** Regex literal matn va metabelgilar orqali pattern qidiradi; raw string qulay.

**Kod / amaliy namuna.** `r"\d+"` bir yoki ko‘p raqamlar.

**Mustaqil mashq.** Log matnidan 4 xonali yil va ID raqamlarni ajratadigan pattern yoz.

### py-14-10 — re.search vs re.match

**Tushuncha.** re.search istalgan joyda, re.match faqat boshida tekshiradi; fullmatch butun matn.

**Kod / amaliy namuna.** `re.search(r"\d+","ID42")` mos, match yo‘q.

**Mustaqil mashq.** `abc123`, `123abc`, `123` uchun search/match/fullmatch natijalarini taqqosla.

### py-14-11 — re.findall va re.sub

**Tushuncha.** findall mosliklarni ro‘yxat qiladi, sub mosliklarni almashtiradi.

**Kod / amaliy namuna.** `re.sub(r"\s+"," ","a   b")` → `a b`.

**Mustaqil mashq.** Matndan barcha raqamlarni ajrat; ortiqcha whitespace ni bitta bo‘sh joyga keltir.

### py-14-12 — Greedy va non-greedy

**Tushuncha.** Greedy quantifier imkon qadar ko‘p, non-greedy imkon qadar kam moslik oladi.

**Kod / amaliy namuna.** `<.*>` va `<.*?>` ni `<b>x</b>` da taqqosla.

**Mustaqil mashq.** Ikki quoted qiymatli logdan faqat ichki matnlarni ajrat; HTML parser o‘rnida regexni umumlashtirma.

### py-14-13 — Context manager nima?

**Tushuncha.** Context manager resurs ochish/yopish kabi vaqtinchalik holatni boshqaradi.

**Kod / amaliy namuna.** `with open("x.txt") as f: ...`

**Mustaqil mashq.** Fayl ochilgan va yopilgan holatini tekshir; exception bo‘lsa ham yopilishini kuzat.

### py-14-14 — with blokining hayot sikli

**Tushuncha.** with enter orqali kiradi, exit orqali chiqadi; exit exception haqida ma’lumot oladi.

**Kod / amaliy namuna.** `with resource as value:` blok tugaganda __exit__ chaqiriladi.

**Mustaqil mashq.** Oddiy trace kontekstida enter, body, exit ketma-ketligini yoz; bodyda xato holatini ham tahlil qil.

### py-14-15 — Custom context manager (__enter__/__exit__)

**Tushuncha.** Custom manager __enter__ context qiymatini qaytaradi, __exit__ cleanup qiladi; True qaytarsa exception bosilishi mumkin.

**Kod / amaliy namuna.** `def __enter__(self): return self`; `def __exit__(self,*exc): return False`

**Mustaqil mashq.** Timer context manager yoz; xato bo‘lsa ham elapsed vaqtni chiqar, xatoni yashirma.

### py-14-16 — contextlib.contextmanager

**Tushuncha.** contextlib.contextmanager generator yordamida context manager yaratadi; yield oldi setup, finally cleanup.

**Kod / amaliy namuna.** `@contextmanager` / `def managed():` ichida `try: yield value` va `finally: cleanup()`.

**Mustaqil mashq.** Vaqtinchalik log fayli ochadigan manager yoz; cleanup doim ishlasin.

### py-14-17 — Procedural, functional va OOP yondashuvlari

**Tushuncha.** Procedural amallar ketma-ketligi, functional transformlar, OOP state va metodlar asosida quriladi.

**Kod / amaliy namuna.** Bir xil ball hisobini loop, map va Student class bilan ifodalash.

**Mustaqil mashq.** Bir datasetni uch usulda hisobla; o‘qilish, state va testlanish bo‘yicha trade-off yoz.

### Nazorat ishi — Decoratorli logging / fayl filtratori

**Talablar:** Log decorator + regex fayl filtratori; context manager yordamida resursni yop.

**Tekshiruv holatlari:** INFO va ERROR satrlardan faqat ERROR; no match→bo‘sh; exceptionda log/cleanup.

**Cheklovlar:** wraps va return saqlansin; raw regex, aniq cleanup; exception yutilmasin.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-15

**Python muhitlari va paketlash** · Core (Asosiy) · 18 mikro-dars

### py-15-01 — PyPI nima?

**Tushuncha.** PyPI Python paketlarining ommaviy indeksi; paket ishonchliligi va litsenziyasini tekshir.

**Kod / amaliy namuna.** `https://pypi.org/` orqali package metadata ko‘rish.

**Mustaqil mashq.** requests paketining rasmiy nomi, versiya talabi va litsenziyasini tekshir; o‘xshash nomli paketlardan saqlan.

### py-15-02 — pip install / uninstall

**Tushuncha.** pip Python muhitiga paket o‘rnatadi yoki o‘chiradi; python -m pip kerakli interpreterga bog‘laydi.

**Kod / amaliy namuna.** `python -m pip install requests`; `python -m pip uninstall requests`

**Mustaqil mashq.** Test virtual muhitda paketni o‘rnat, import qil va o‘chir; tizim muhitini buzma.

### py-15-03 — pip freeze qachon kerak?

**Tushuncha.** pip freeze joriy muhitdagi o‘rnatilgan versiyalar snapshotini chiqaradi; universal lockfile emas.

**Kod / amaliy namuna.** `python -m pip freeze > requirements.txt`

**Mustaqil mashq.** Toza muhitda ikki paket o‘rnat, freeze natijasida transitive paketlarni top.

### py-15-04 — venv yaratish

**Tushuncha.** venv loyiha uchun interpreter bilan bog‘liq alohida paket muhitini yaratadi.

**Kod / amaliy namuna.** `python -m venv .venv`

**Mustaqil mashq.** Ikki loyihaga alohida .venv yarat va python yo‘lini tekshir.

### py-15-05 — Virtual muhitni faollashtirish

**Tushuncha.** Activation shell PATHini muhit interpreteriga yo‘naltiradi; activation majburiy emas.

**Kod / amaliy namuna.** PowerShell: `.\.venv\Scripts\Activate.ps1`; Unix: `source .venv/bin/activate`

**Mustaqil mashq.** Mühitni faollashtir, `python -m pip --version` ni tekshir, deactivate qil. Windows policy bloklasa to‘g‘ridan-to‘g‘ri .venv interpreterini ishlat.

### py-15-06 — Virtual environment nega kerak?

**Tushuncha.** Virtual environment dependency konfliktini kamaytiradi va loyiha muhitini ajratadi.

**Kod / amaliy namuna.** A loyihada package 1.x, B da 2.x alohida muhitlar.

**Mustaqil mashq.** Ikki muhitga turli mos paket versiyasini o‘rnat; bir-biriga ta’sir qilmasligini tekshir.

### py-15-07 — requirements.txt

**Tushuncha.** requirements.txt pip uchun dependency ro‘yxati; exact yoki diapazon talablarini yozishi mumkin.

**Kod / amaliy namuna.** `python -m pip install -r requirements.txt`

**Mustaqil mashq.** requirements.txt dan toza muhitni qayta tikla; loyiha importlarini tekshir.

### py-15-08 — pyproject.toml nima?

**Tushuncha.** pyproject.toml packaging metadata, build system va vosita konfiguratsiyasi uchun standart fayl.

**Kod / amaliy namuna.** `[project]` ostida `name`, `version`, `dependencies`.

**Mustaqil mashq.** CLI loyiha uchun minimal pyproject yoz; build backendni qo‘sh va `[project.scripts]` entry point belgilashni mashq qil.

### py-15-09 — Dependency versions va lockfiles

**Tushuncha.** Versiya constraints mos versiyalarni, lockfile yechilgan versiyalarni qayta tiklashga xizmat qiladi; vositalarning formatlari turlicha.

**Kod / amaliy namuna.** `requests>=2,<3` diapazon misoli.

**Mustaqil mashq.** Exact pin va diapazonni taqqosla; lockfile nima uchun commit qilinishini izohla.

### py-15-10 — uv package manager asoslari

**Tushuncha.** uv virtual muhit, dependency va Python loyiha ish oqimini boshqaruvchi vosita.

**Kod / amaliy namuna.** `uv init`; `uv add requests`; `uv run python main.py`

**Mustaqil mashq.** Alohida test papkada uv loyiha yarat, uv.lock ni kuzat va `uv sync --locked` bilan tekshir.

### py-15-11 — Poetry haqida tushuncha

**Tushuncha.** Poetry dependency resolution, lockfile va packagingni boshqaradi.

**Kod / amaliy namuna.** `poetry init`; `poetry add requests`; `poetry run python main.py`

**Mustaqil mashq.** Test loyihasida dependency qo‘shish, lock va run bosqichlarini uv/pip bilan solishtir.

### py-15-12 — Conda nima va qachon kerak?

**Tushuncha.** Conda environment va package manager, Python bo‘lmagan native dependencylar uchun ham qulay.

**Kod / amaliy namuna.** `conda create -n demo python=3.12`; `conda activate demo`

**Mustaqil mashq.** Ilmiy hisoblash loyihasida conda yoki venv tanloviga sabab yoz; conda mavjud bo‘lsa muhit yarat.

### py-15-13 — pdm tushunchasi

**Tushuncha.** pdm pyproject va lock asosidagi Python project manager.

**Kod / amaliy namuna.** `pdm init`; `pdm add requests`; `pdm run python main.py`

**Mustaqil mashq.** PDM workflow bilan dependency va lock vazifasini tushuntir; mavjud bo‘lsa test loyiha yarat.

### py-15-14 — pyenv Python versiyalari

**Tushuncha.** pyenv Python interpreter versiyalarini boshqaradi; Windowsda odatiy pyenv Unix bilan bir xil emas (pyenv-win yoki launcher alternativ).

**Kod / amaliy namuna.** Unix: `pyenv versions`; `pyenv local 3.12.0` (versiya o‘rnatilgan bo‘lsa).

**Mustaqil mashq.** Kompyuterdagi interpreterlar ro‘yxatini ol va loyiha uchun 3.12 ni tanlash usulini yoz.

### py-15-15 — pipx CLI vositalar uchun

**Tushuncha.** pipx Python CLI ilovalarini izolyatsiyalangan muhitlarga o‘rnatadi.

**Kod / amaliy namuna.** `pipx install black`; `pipx list`

**Mustaqil mashq.** CLI vosita bilan import qilinadigan kutubxona farqini ayt; test CLI ni pipx orqali o‘rnat.

### py-15-16 — Package vs application

**Tushuncha.** Package qayta ishlatiladigan tarqatma kod bo‘lishi mumkin; application ishga tushiriladigan mahsulot, ikkalasi ustma-ust kelishi mumkin.

**Kod / amaliy namuna.** Library `calc.add`, application `calc-cli`.

**Mustaqil mashq.** Hisoblash paketini import qilinadigan API va CLI entry pointga ajrat.

### py-15-17 — Build va wheel tushunchasi

**Tushuncha.** Build distributable artifact yaratadi; wheel odatda o‘rnatishga tayyor paket formati.

**Kod / amaliy namuna.** `python -m build` (build o‘rnatilgan bo‘lsa); `dist/*.whl`.

**Mustaqil mashq.** Minimal package build qil; wheelni boshqa toza muhitga o‘rnat va import/CLI ni tekshir.

### py-15-18 — Reproducible environment qoidalari

**Tushuncha.** Reproducible muhit Python talabi, dependencies, lock/pin, platform tafovuti va setup yo‘riqnomasi bilan ta’minlanadi.

**Kod / amaliy namuna.** README + pyproject.toml + lockfile.

**Mustaqil mashq.** Yangidan clone qilingan loyiha uchun 5 qadamli setup yoz va toza muhitda sinab chiq.

### Nazorat ishi — pyproject.toml bilan CLI paket

**Talablar:** Calc CLI paket: src layout, pyproject, entry point, dependency va README; wheel build.

**Tekshiruv holatlari:** Toza venvda wheel install; CLI 2+3→5; import ishlaydi; README setup qayta bajariladi.

**Cheklovlar:** Bitta package manager asosiy; qolganlari overview; lock/reproducibility tanlovini izohla.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-16

**HTTP va Python web frameworklari** · Supporting (Tayanch) · 21 mikro-dars

### py-16-01 — Web server nima?

**Tushuncha.** Web server HTTP so‘rovlarini qabul qilib response qaytaradi; framework ilova kodini tashkil qiladi.

**Kod / amaliy namuna.** Browser → server → response.

**Mustaqil mashq.** Notes ilovasi uchun client, server va data store vazifalarini chiz.

### py-16-02 — HTTP request va response

**Tushuncha.** Request method, URL, headers va ixtiyoriy bodydan; response status, headers va bodydan iborat.

**Kod / amaliy namuna.** `GET /notes` → `200 OK` + JSON.

**Mustaqil mashq.** Note yaratish va o‘qish uchun request/response tarkibini qog‘ozda yoz.

### py-16-03 — GET va POST farqi

**Tushuncha.** GET odatda o‘qish uchun safe, POST serverda qayta ishlash yoki yangi resurs yaratish uchun.

**Kod / amaliy namuna.** `GET /notes/1`; `POST /notes` body `{"title":"A"}`.

**Mustaqil mashq.** O‘qish, yaratish va qidirish amallariga method tanla; GETni yozish uchun ishlatma.

### py-16-04 — Status codes 2xx/4xx/5xx

**Tushuncha.** 2xx muvaffaqiyat, 4xx client xatosi, 5xx server xatosi.

**Kod / amaliy namuna.** 200 OK, 201 Created, 404 Not Found, 500 Internal Server Error.

**Mustaqil mashq.** 6 API holati uchun status tanla: create, not found, invalid input, server xatosi va boshqalar.

### py-16-05 — JSON API body

**Tushuncha.** JSON body ma’lumot almashish formatidir; Content-Type application/json ko‘rsatiladi.

**Kod / amaliy namuna.** `{"title":"Note","done":false}`

**Mustaqil mashq.** Note uchun valid JSON va 3 invalid JSON misoli yarat; Python dict bilan farqini izohla.

### py-16-06 — REST API nimani anglatadi?

**Tushuncha.** REST resurslar, stateless interaction va standart HTTP semantics asosidagi arxitektura uslubi.

**Kod / amaliy namuna.** `GET /notes/1`, `DELETE /notes/1`.

**Mustaqil mashq.** Todo uchun CRUD endpoint jadvali tuz; fe’lni URLga keraksiz qo‘shma.

### py-16-07 — Flask minimal route

**Tushuncha.** Flask WSGI mikroframework; route decorator URLni funksiya bilan bog‘laydi.

**Kod / amaliy namuna.** `from flask import Flask`; `app=Flask(__name__)`; `@app.get("/")` / `def home(): return {"ok":True}`

**Mustaqil mashq.** Flask o‘rnatilgan muhitda home va health route yoz; `flask --app main run` bilan lokal sinov.

### py-16-08 — FastAPI minimal endpoint

**Tushuncha.** FastAPI ASGI framework, annotationlardan validation va OpenAPI yaratadi.

**Kod / amaliy namuna.** `from fastapi import FastAPI`; `app=FastAPI()`; `@app.get("/")` / `def home(): return {"ok":True}`

**Mustaqil mashq.** `uvicorn main:app --reload` bilan local serverni ishga tushir, /docs orqali GET sinov.

### py-16-09 — Django loyiha va app tushunchasi

**Tushuncha.** Django project umumiy settings va URL konfiguratsiyasi, app muayyan funksional bo‘lim.

**Kod / amaliy namuna.** `django-admin startproject config .`; `python manage.py startapp notes`

**Mustaqil mashq.** Test Django loyihasida notes app yarat; project va app fayllarini ajratib tushuntir.

### py-16-10 — FastAPI vs Flask vs Django trade-off

**Tushuncha.** Flask kichik moslashuvchan app, FastAPI typed API, Django integratsiyalangan full-stack imkoniyatlari bilan qulay.

**Kod / amaliy namuna.** Admin/ORM kerak bo‘lsa Django; typed JSON API uchun FastAPI.

**Mustaqil mashq.** 3 loyiha uchun framework tanla va dependency, jamoa tajribasi, feature trade-offni yoz.

### py-16-11 — Route parameters

**Tushuncha.** Route parameter URL yo‘lining dinamik qismi.

**Kod / amaliy namuna.** `@app.get("/notes/{note_id}")` / `def get_note(note_id:int): ...`

**Mustaqil mashq.** ID orqali in-memory note topuvchi endpoint yoz; topilmagan IDni alohida ishlov ber.

### py-16-12 — Query parameters

**Tushuncha.** Query parameter URLdagi ? dan keyingi option/filter.

**Kod / amaliy namuna.** `GET /notes?limit=5`; `def list_notes(limit:int=10): ...`

**Mustaqil mashq.** limit va q orqali notes listini chekla va qidir; limit manfiy bo‘lmasin.

### py-16-13 — Request body

**Tushuncha.** Request body odatda POST/PATCH kabi so‘rovda murakkab ma’lumot oladi; FastAPI Pydantic modeldan parse qiladi.

**Kod / amaliy namuna.** `class Note(BaseModel): title:str`; `def create(note:Note): ...`

**Mustaqil mashq.** Title va content modelidan note yarat; missing title holatini sinab ko‘r.

### py-16-14 — Response model

**Tushuncha.** Response model chiqish tuzilmasini belgilaydi, validatsiya va filtrlashga yordam beradi.

**Kod / amaliy namuna.** `@app.get("/notes/{id}",response_model=NoteOut)`

**Mustaqil mashq.** Ichki maydonni public response modeldan chiqarib tashla; maxfiy ma’lumotni responsega bermaslikni tekshir.

### py-16-15 — Pydantic validation asoslari

**Tushuncha.** Pydantic model runtime validation va parsing qiladi; constraints orqali qiymatni cheklaydi.

**Kod / amaliy namuna.** `from pydantic import BaseModel,Field`; `title:str=Field(min_length=1)`

**Mustaqil mashq.** Note title bo‘sh yoki id noto‘g‘ri tipda bo‘lsa qanday validation javobi chiqishini tekshir.

### py-16-16 — API errors va HTTPException

**Tushuncha.** HTTPException clientga status va detail bilan kutilgan API xatosini bildiradi.

**Kod / amaliy namuna.** `raise HTTPException(status_code=404,detail="Note not found")`

**Mustaqil mashq.** Notes CRUDda unknown ID uchun 404 va duplicate uchun 409 qaytar.

### py-16-17 — OpenAPI va Swagger UI

**Tushuncha.** OpenAPI API kontraktining mashina o‘qiydigan sxemasi; Swagger UI interaktiv hujjat.

**Kod / amaliy namuna.** FastAPI `/openapi.json` va `/docs`.

**Mustaqil mashq.** Swaggerda POST va GETni sinab, schema va statuslarni tekshir.

### py-16-18 — ASGI va WSGI boshlang‘ich farqi

**Tushuncha.** WSGI sinxron web interfeysi; ASGI async va uzoq ulanishlarni ham qo‘llab-quvvatlaydi.

**Kod / amaliy namuna.** Flask WSGI; FastAPI ASGI.

**Mustaqil mashq.** Websocket va oddiy CRUD uchun qaysi interfeys mosligini izohla; ASGI o‘zi barcha kodni async qilmasligini ayt.

### py-16-19 — Plotly Dash qayerda ishlatiladi?

**Tushuncha.** Plotly Dash interaktiv analitik dashboard yaratish frameworki.

**Kod / amaliy namuna.** `from dash import Dash,html`; `app=Dash()`; `app.layout=html.H1("Report")`

**Mustaqil mashq.** 3 ta kategoriyali lokal datasetdan oddiy dashboard layout rejalashtir; Dash o‘rnatilsa ishga tushir.

### py-16-20 — Pyramid, aiohttp, Tornado, Sanic, gevent overview

**Tushuncha.** Pyramid moslashuvchan web framework; aiohttp async HTTP client/server; Tornado async networking/web; Sanic async web; gevent greenlet asosidagi concurrency kutubxonasi.

**Kod / amaliy namuna.** Har biri bir xil kategoriya emas: gevent framework emas.

**Mustaqil mashq.** 5 vositani framework/client-server/concurrency bo‘yicha tasnifla, bitta use-case yoz.

### py-16-21 — Lokal REST API tekshirish

**Tushuncha.** Lokal API testida method, status, JSON va xato holatlari tekshiriladi.

**Kod / amaliy namuna.** `curl http://127.0.0.1:8000/notes` yoki Swagger /docs.

**Mustaqil mashq.** Notes CRUD uchun create, list, get, update, delete va invalid input ketma-ketligini tekshir.

### Nazorat ishi — REST API: notes / todos

**Talablar:** Local Notes/Todos REST API (FastAPI), CRUD, Pydantic request/response, in-memory storage, docs.

**Tekshiruv holatlari:** POST→201; GET→200; unknown→404; invalid title→422; DELETE→204; query filter.

**Cheklovlar:** API kontrakt, status va Swagger; real auth/production deployment scopega kirmaydi.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-17

**Concurrency: Thread, Process va Async** · Supporting (Tayanch) · 21 mikro-dars

### py-17-01 — Concurrency va parallelism farqi

**Tushuncha.** Concurrency bir nechta ishning vaqt oralig‘ida davom etishi; parallelism bir vaqtning o‘zida haqiqiy bajarilishi.

**Kod / amaliy namuna.** Bitta kassir navbatlarni almashtirishi vs ikki kassir.

**Mustaqil mashq.** 4 vazifani concurrent yoki parallel qilib chiz; qaysida tezlik nega oshishi mumkinligini yoz.

### py-17-02 — I/O-bound va CPU-bound farqi

**Tushuncha.** I/O-bound tashqi resursni kutadi, CPU-bound hisoblash bilan band.

**Kod / amaliy namuna.** HTTP/file I/O vs katta prime hisoblash.

**Mustaqil mashq.** Download, image transform, database query, sortingni tasnifla; mos concurrency modelini taxmin qil.

### py-17-03 — CPython GIL haqida asosiy tushuncha

**Tushuncha.** CPython GIL odatiy GIL-enabled buildda bir vaqtning o‘zida Python bytecode bajaruvchi threadlarni cheklaydi; I/Oda GIL bo‘shashi mumkin.

**Kod / amaliy namuna.** 2 pure-Python CPU thread odatda 2x tez emas.

**Mustaqil mashq.** CPU loop va sleep I/O ni bir xil thread sonida solishtirish rejasini tuz.

### py-17-04 — GIL CPython versiyasiga bog‘liqligi

**Tushuncha.** GIL xatti-harakati Python build/versiya va extensionga bog‘liq; free-threaded buildlar mavjud, hamma muhitda GIL o‘chgan emas.

**Kod / amaliy namuna.** `import sys; print(sys.version)`; mavjud bo‘lsa `sys._is_gil_enabled()`.

**Mustaqil mashq.** O‘zingdagi build haqida versiya va GIL holatini aniqlab yoz; universal xulosa qilma.

### py-17-05 — threading.Thread

**Tushuncha.** Thread bitta process ichidagi bajarilish oqimi. start boshlaydi, join tugashini kutadi.

**Kod / amaliy namuna.** `from threading import Thread`; `t=Thread(target=work); t.start(); t.join()`

**Mustaqil mashq.** 2 ta sleep bilan simulyatsiya qilingan I/O ishini thread orqali bajar; sequential vaqt bilan solishtir.

### py-17-06 — Thread shared state

**Tushuncha.** Threadlar process xotirasini ulashadi; mutable shared state xavf tug‘diradi.

**Kod / amaliy namuna.** Ikkita thread bitta `results` listdan foydalanishi.

**Mustaqil mashq.** 2 worker natijalarini alohida saqlash va shared containerga yozishni solishtir.

### py-17-07 — Race condition va Lock

**Tushuncha.** Race condition natija bajarilish tartibiga bog‘liq bo‘lganda yuz beradi; Lock critical sectionni himoyalaydi.

**Kod / amaliy namuna.** `with lock: counter += 1`

**Mustaqil mashq.** Shared counterda read-modify-write orasida sun’iy kutish bilan race ko‘rsat; Lock bilan tuzat.

### py-17-08 — multiprocessing.Process

**Tushuncha.** Process alohida interpreter/xotira bilan ishlaydi; multiprocessing CPU ishlarni parallel bajarishi mumkin.

**Kod / amaliy namuna.** `from multiprocessing import Process`; main guard ichida start/join.

**Mustaqil mashq.** Top-level worker bilan 2 ta hisobni processda bajar; Windows main guard shartini tekshir.

### py-17-09 — Process memory isolation

**Tushuncha.** Processlar odatda bir-birining oddiy Python obyektlarini ulashmaydi; IPC kerak.

**Kod / amaliy namuna.** `multiprocessing.Queue()` orqali natija uzatish.

**Mustaqil mashq.** Child listga qo‘shgan qiymat parentda nega ko‘rinmasligini tekshir; Queue bilan uzat.

### py-17-10 — ProcessPoolExecutor

**Tushuncha.** ProcessPoolExecutor processlar poolida ishlaydi; funksiyalar picklable bo‘lishi kerak.

**Kod / amaliy namuna.** `with ProcessPoolExecutor() as pool: results=list(pool.map(work,inputs))`

**Mustaqil mashq.** Main guard va top-level work bilan 4 CPU taskni poolda bajar, sequential bilan solishtir.

### py-17-11 — ThreadPoolExecutor

**Tushuncha.** ThreadPoolExecutor thread poolini boshqaradi; I/O ishlariga qulay.

**Kod / amaliy namuna.** `with ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(work,inputs))`

**Mustaqil mashq.** 10 ta simulated I/O uchun 1,2,4 worker benchmark qil; barcha natijalarni saqla.

### py-17-12 — async def va await

**Tushuncha.** async def coroutine function, await kutish nuqtasida boshqaruvni event loopga berishi mumkin.

**Kod / amaliy namuna.** `async def work(): await asyncio.sleep(1)`

**Mustaqil mashq.** Ikki async funksiyani yoz; avval navbat bilan await qil va vaqtni o‘lcha.

### py-17-13 — Coroutine nima?

**Tushuncha.** Coroutine async funksiyani chaqirganda olinadigan obyekt; await yoki schedule qilish kerak.

**Kod / amaliy namuna.** `c=work()` o‘zi ishni to‘liq bajarmaydi; `asyncio.run(c)`

**Mustaqil mashq.** Coroutine yaratish va bajarish farqini log orqali ko‘rsat; unawaited coroutine qoldirma.

### py-17-14 — asyncio event loop

**Tushuncha.** Event loop tayyor tasklarni ishlatadi, I/O kutayotganlarini keyin davom ettiradi.

**Kod / amaliy namuna.** `asyncio.run(main())` loopni boshqaradi.

**Mustaqil mashq.** A va B tasklari turli sleep bilan chiqargan loglar tartibini taxmin qil.

### py-17-15 — asyncio.create_task va gather

**Tushuncha.** create_task coroutine ni schedule qiladi; gather bir nechta awaitable natijasini tartibda yig‘adi.

**Kod / amaliy namuna.** `results=await asyncio.gather(work(1),work(2))`

**Mustaqil mashq.** 3 simulated downloadni parallel kut; natijalar input tartibida bo‘lishini tekshir.

### py-17-16 — Task cancellation

**Tushuncha.** Task cancellation cooperative; CancelledError await nuqtasida yetkazilishi mumkin, cleanup finally da.

**Kod / amaliy namuna.** `task.cancel()`; `await task` (CancelledErrorni boshqar).

**Mustaqil mashq.** Uzoq taskni bekor qil; finally ishlashini tekshir va cancellationni noto‘g‘ri yutma.

### py-17-17 — Timeout qo‘llash

**Tushuncha.** Timeout kutiladigan vaqtni cheklaydi; asyncio.wait_for timeoutda taskni cancel qiladi va TimeoutError chiqaradi.

**Kod / amaliy namuna.** `await asyncio.wait_for(work(),timeout=0.1)`

**Mustaqil mashq.** Tez va sekin task uchun timeout qo‘y; muvaffaqiyat va timeoutni alohida qayta ishlov ber.

### py-17-18 — Blocking call ichida async muammosi

**Tushuncha.** Blocking call event loopni to‘sadi; async API yoki thread offloading kerak.

**Kod / amaliy namuna.** `time.sleep(1)` vs `await asyncio.sleep(1)`; `await asyncio.to_thread(blocking_fn)`.

**Mustaqil mashq.** Async task ichida blocking sleep ta’sirini o‘lcha va almashtir.

### py-17-19 — aiohttp haqida tushuncha

**Tushuncha.** aiohttp async HTTP client/server kutubxonasi; client session qayta ishlatiladi va yopiladi.

**Kod / amaliy namuna.** `async with aiohttp.ClientSession() as s:` ichida `async with s.get(url) as r: ...`

**Mustaqil mashq.** Lokal test APIga 5 async GET yubor; timeout, status va concurrency limitni boshqar.

### py-17-20 — Thread vs process vs asyncio tanlovi

**Tushuncha.** Thread blocking I/O, process pure-Python CPU, asyncio async I/O uchun ko‘pincha yaxshi; workload va buildga qarab benchmark qil.

**Kod / amaliy namuna.** Downloader → async/thread; CPU loop → process.

**Mustaqil mashq.** 3 xil workload uchun tanlov jadvali tuz, overhead va xotirani ham hisobga ol.

### py-17-21 — Oddiy I/O va CPU benchmark

**Tushuncha.** Benchmarkda bir xil vazifa, input, worker soni, warm-up, takroriy o‘lchov va to‘g‘ri natija kerak.

**Kod / amaliy namuna.** `time.perf_counter()` bilan elapsed.

**Mustaqil mashq.** Sequential, thread, process va mos async variantlar uchun median vaqtni chiqar; tezlashuvni real o‘lchovdan hisobla.

### Nazorat ishi — Parallel I/O downloader + CPU benchmark

**Talablar:** Lokal mock HTTP API downloader va CPU hisoblash benchmarki; sequential/thread/process/async mos variantlar.

**Tekshiruv holatlari:** 5 lokal I/O natija to‘liq; timeout xabari; CPU variantlarda bir xil hisob; worker limit.

**Cheklovlar:** Main guard; cancellation cleanup; median real performance; faqat lokal endpoint yoki ruxsatli resurs.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-18

**Static typing va data validation** · Core (Asosiy) · 16 mikro-dars

### py-18-01 — Dynamic typing va annotation farqi

**Tushuncha.** Python dynamic typing: qiymatning tipi runtime mavjud; annotation odatda runtime enforcement emas.

**Kod / amaliy namuna.** `x:int=5; x="text"` runtime o‘tishi mumkin, checker xato beradi.

**Mustaqil mashq.** Type hint bilan noto‘g‘ri assignmentni sinab ko‘r va static/runtime farqini yoz.

### py-18-02 — Type hint nima?

**Tushuncha.** Type hint parametr, return va variable kutilgan tipini ifodalaydi.

**Kod / amaliy namuna.** `def add(a:int,b:int)->int: return a+b`

**Mustaqil mashq.** Narx hisoblash va ism formatlash funksiyalariga type hint yoz.

### py-18-03 — list[str] va dict[str,int]

**Tushuncha.** Generik built-in annotation list va dict element tipini ifodalaydi.

**Kod / amaliy namuna.** `names:list[str]=["Ali"]`; `scores:dict[str,int]={"Ali":90}`

**Mustaqil mashq.** Student ballari uchun typed dict va list yoz; noto‘g‘ri tipli elementni checkerda tekshir.

### py-18-04 — Optional / None typing

**Tushuncha.** Optional[T] yoki T | None qiymat T yoki None bo‘lishi mumkinligini aytadi; default berilishi alohida.

**Kod / amaliy namuna.** `def find(id:int)->str | None: ...`

**Mustaqil mashq.** Qidiruv funksiyasidan None qaytishi mumkin; chaqiruvchi None ni tekshirsin.

### py-18-05 — Union types

**Tushuncha.** Union bir nechta ruxsat etilgan tipni ifodalaydi; narrowing orqali aniq tip ajratiladi.

**Kod / amaliy namuna.** `def show(x:int | str)->str: return str(x)`

**Mustaqil mashq.** int yoki str qabul qilib, isinstance bilan turiga mos qayta ishlovchi funksiya yoz.

### py-18-06 — Callable type hint

**Tushuncha.** Callable funksiya signature ni annotationda ifodalaydi.

**Kod / amaliy namuna.** `from collections.abc import Callable`; `def apply(f:Callable[[int],int],x:int)->int: return f(x)`

**Mustaqil mashq.** Typed apply uchun ikkita mos, bitta mos bo‘lmagan callback yoz; checkerda sinov.

### py-18-07 — TypedDict nima?

**Tushuncha.** TypedDict dict kalitlari va qiymat turlarining static sxemasini beradi; runtime validation qilmaydi.

**Kod / amaliy namuna.** `class User(TypedDict): name:str; age:int`

**Mustaqil mashq.** User TypedDict yoz; noto‘g‘ri key va tip holatini static checkerga ber.

### py-18-08 — Protocol tushunchasi

**Tushuncha.** Protocol structural typing: kerakli metodlar mavjud bo‘lsa mos deb qaraladi.

**Kod / amaliy namuna.** `class Sender(Protocol):` ichida `def send(self,msg:str)->None: ...`

**Mustaqil mashq.** Inheritance talab qilmaydigan ikkita sender yoz; Protocol bilan tekshir.

### py-18-09 — Generic type tushunchasi

**Tushuncha.** Generic tip parametr orqali kirish-chiqish bog‘liqligini saqlaydi.

**Kod / amaliy namuna.** `from typing import TypeVar`; `T=TypeVar("T")`; `def first(xs:list[T])->T: return xs[0]`

**Mustaqil mashq.** int va str listlar uchun first ishlat; return tipusini checker orqali tekshir.

### py-18-10 — mypy statik tekshirish

**Tushuncha.** mypy annotation asosida static xatolarni topadi.

**Kod / amaliy namuna.** `python -m mypy main.py` (mypy o‘rnatilgan bo‘lsa).

**Mustaqil mashq.** 3 tipi noto‘g‘ri funksiyani yoz, mypy xabarini tushun va tuzat.

### py-18-11 — pyright statik tekshirish

**Tushuncha.** Pyright static checker; IDE integratsiyasi va CLI mavjud.

**Kod / amaliy namuna.** `pyright main.py` (o‘rnatilgan bo‘lsa).

**Mustaqil mashq.** Bir xil typed faylni mypy va Pyright bilan tekshir; konfiguratsiya farqini qayd et.

### py-18-12 — pyre overview

**Tushuncha.** Pyre Python static type checker; loyiha konfiguratsiyasi va joriy qo‘llab-quvvatlashini rasmiy docsdan tekshirish kerak.

**Kod / amaliy namuna.** Pyre annotation tekshiruvchisi, runtime validator emas.

**Mustaqil mashq.** mypy, pyright, pyre uchun maqsad, setup va cheklov bo‘yicha qisqa taqqoslash yoz.

### py-18-13 — Pydantic BaseModel

**Tushuncha.** Pydantic BaseModel kiruvchi data ni runtime parse/validate qiladi.

**Kod / amaliy namuna.** `class User(BaseModel): name:str; age:int`; `User(name="Ali",age=20)`

**Mustaqil mashq.** User model yarat, valid va invalid inputlarni sinab ko‘r; `model_dump()` natijasini chiqar.

### py-18-14 — Pydantic Field va validation

**Tushuncha.** Field constraint va metadata beradi; strict tipi majburlash uchun alohida sozlanadi.

**Kod / amaliy namuna.** `age:int=Field(ge=0,le=120)`

**Mustaqil mashq.** Product modelda name min_length, price > 0, qty >=0 bo‘lsin; chegaralarni tekshir.

### py-18-15 — Type checking runtime kafolati emas

**Tushuncha.** Static typing xatolarni oldindan aniqlashga yordam beradi, tashqi data uchun runtime validation zarur.

**Kod / amaliy namuna.** TypedDict tashqi JSONni avtomatik tekshirmaydi, BaseModel tekshiradi.

**Mustaqil mashq.** Noto‘g‘ri JSONni typed dict annotation va Pydantic orqali sinab, farqini tushuntir.

### py-18-16 — Input validation uchun test

**Tushuncha.** Validation test normal, invalid, boundary va missing qiymatlarni qamraydi.

**Kod / amaliy namuna.** age=0,120,121,-1 va missing; pytest keyingi phase da.

**Mustaqil mashq.** Pydantic User uchun try/except yoki assert bilan testlar yoz; ValidationErrorni alohida tekshir.

### Nazorat ishi — Pydantic schema bilan API input

**Talablar:** Pydantic Product input: name, price, quantity; static annotations va runtime schema; kichik API endpoint.

**Tekshiruv holatlari:** Valid → 201; price=0, qty=-1, missing name → 422; optional field qoidasi.

**Cheklovlar:** TypedDict vs model farqini tushuntir; mypy/pyright natijasi va validation cases; pytest majburiy emas.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-19

**Testing, linting va hujjat** · Core (Asosiy) · 18 mikro-dars

### py-19-01 — PEP 8 nima?

**Tushuncha.** PEP 8 Python kodining o‘qiladigan uslubi uchun qo‘llanma, til sintaksisining o‘zi emas.

**Kod / amaliy namuna.** `total_price` snake_case, `StudentRecord` PascalCase.

**Mustaqil mashq.** Noaniq nom va notekis whitespace bilan yozilgan funksiyani uslub bo‘yicha yaxshila.

### py-19-02 — ruff lint va format

**Tushuncha.** Ruff lint xatolar/uslubni topadi, format kodni formatlaydi.

**Kod / amaliy namuna.** `ruff check .`; `ruff format .`

**Mustaqil mashq.** Test papkada unused import qo‘sh, ruff bilan top va formatla; mavjud loyihani ruxsatsiz mass o‘zgartirma.

### py-19-03 — Black formatter

**Tushuncha.** Black avtomatik code formatter; uslub tanlovlarini kamaytiradi.

**Kod / amaliy namuna.** `black --check .`; `black .`

**Mustaqil mashq.** Bir faylda Black formatdan oldin/keyin diffni ko‘r; kod xatti-harakati o‘zgarmasligini tekshir.

### py-19-04 — pylint / yapf overview

**Tushuncha.** Pylint static lint va ko‘proq diagnostika; YAPF formatter.

**Kod / amaliy namuna.** `pylint main.py`; `yapf --diff main.py` (vositalar o‘rnatilsa).

**Mustaqil mashq.** Ruff, Pylint, Black, YAPF ni linter/formatter bo‘yicha tasnifla; bitta izchil kombinatsiya tanla.

### py-19-05 — Unit test tushunchasi

**Tushuncha.** Unit test kichik birlik xatti-harakatini izolatsiyada tekshiradi.

**Kod / amaliy namuna.** `assert add(2,3)==5`

**Mustaqil mashq.** Discount funksiyasi uchun normal, zero va boundary testlar ro‘yxatini yoz.

### py-19-06 — unittest bilan birinchi test

**Tushuncha.** unittest standard library test framework; TestCase assertionlar beradi.

**Kod / amaliy namuna.** `class TestCalc(unittest.TestCase):` ichida `def test_add(self): self.assertEqual(add(2,3),5)`

**Mustaqil mashq.** 3 unittest yoz va `python -m unittest` bilan ishga tushir.

### py-19-07 — pytest bilan birinchi test

**Tushuncha.** pytest oddiy test funksiyalari va assert diagnostikasini qo‘llaydi.

**Kod / amaliy namuna.** `def test_add(): assert add(2,3)==5`

**Mustaqil mashq.** Yuqoridagi unittestlarni pytest uslubiga o‘gir; `python -m pytest` bilan bajar.

### py-19-08 — Test fixtures

**Tushuncha.** Fixture testga tayyor data/resurs beradi va kerak bo‘lsa teardown qiladi.

**Kod / amaliy namuna.** `@pytest.fixture` / `def cart(): return []`

**Mustaqil mashq.** Har test uchun mustaqil cart va `tmp_path` orqali vaqtinchalik fayl fixture ishlat.

### py-19-09 — Parametrized tests

**Tushuncha.** Parametrize bir testni bir nechta input/expected bilan bajaradi.

**Kod / amaliy namuna.** `@pytest.mark.parametrize("a,b,expected",[(2,3,5),(0,0,0)])`

**Mustaqil mashq.** Discount uchun 5 parametrli case yoz, chegaralar ham bo‘lsin.

### py-19-10 — Mocking tashqi xizmatlar

**Tushuncha.** Mock tashqi dependency nazorat qilinadigan o‘rinbosar bilan almashtirib unit testni izolyatsiya qiladi.

**Kod / amaliy namuna.** `from unittest.mock import Mock`; `client=Mock(); client.get.return_value={"ok":True}`

**Mustaqil mashq.** Networkga chiqmay API client natijasini test qil; failure side_effect bilan xatoni ham sinab ko‘r.

### py-19-11 — Exception testlash

**Tushuncha.** Exception test ruxsat etilmagan inputda kerakli exception chiqishini tekshiradi.

**Kod / amaliy namuna.** `with pytest.raises(ValueError): validate(-1)`

**Mustaqil mashq.** Nolga bo‘lish, manfiy price va noto‘g‘ri input uchun aniq exception test yoz.

### py-19-12 — doctest nima?

**Tushuncha.** doctest docstringdagi Python REPL misollarini bajarib expected output bilan solishtiradi.

**Kod / amaliy namuna.** `>>> add(2, 3)` keyingi qator `5`.

**Mustaqil mashq.** 2 doctestli funksiya yoz va `python -m doctest -v main.py` bilan tekshir.

### py-19-13 — tox muhitlar bo‘yicha testlash

**Tushuncha.** tox bir necha Python muhitida test komandalarini avtomatlashtiradi.

**Kod / amaliy namuna.** `tox` konfiguratsiyasida env_list va test commands.

**Mustaqil mashq.** Mavjud 2 interpreter uchun tox env rejalashtir; interpreter yo‘q bo‘lsa natijani uydirma.

### py-19-14 — Sphinx dokumentatsiya

**Tushuncha.** Sphinx dokumentatsiyani manba fayllar va autodocdan qurishi mumkin.

**Kod / amaliy namuna.** `sphinx-quickstart docs`; `sphinx-build -b html docs docs/_build`

**Mustaqil mashq.** Kichik calc kutubxonasi uchun install, usage va API bo‘limlari bo‘lgan docs yarat.

### py-19-15 — Docstring yozish

**Tushuncha.** Docstring funksiya/class/modulning vazifasi va kontraktini tushuntiradigan birinchi matn literalidir.

**Kod / amaliy namuna.** `def add(a,b):` ostida `"""Return the sum of a and b."""`

**Mustaqil mashq.** 3 funksiya uchun parametr, return va xato shartlarini docstringda yoz; kodni takrorlama.

### py-19-16 — README va API qo‘llanma

**Tushuncha.** README tez boshlash, install, usage, test va loyiha chegarasini tushuntiradi.

**Kod / amaliy namuna.** Setup → Example → Tests → API → Limitations.

**Mustaqil mashq.** Calc paketiga foydalanuvchi noldan ishga tushira oladigan README yoz.

### py-19-17 — GitHub Actions test workflow kirish

**Tushuncha.** GitHub Actions eventlarda CI joblarni runnerda bajaradi.

**Kod / amaliy namuna.** `.github/workflows/tests.yml`: checkout, setup-python, install, pytest.

**Mustaqil mashq.** Push va pull_requestda ishlaydigan test workflow yoz; action versiyalarini rasmiy docsdan tekshir.

### py-19-18 — Coverage va false confidence

**Tushuncha.** Coverage bajarilgan qator/branchlarni ko‘rsatadi, barcha xato topilganini kafolatlamaydi.

**Kod / amaliy namuna.** `pytest --cov=calc --cov-branch` (pytest-cov kerak).

**Mustaqil mashq.** 100% line coverage bo‘lsa ham noto‘g‘ri assertion bilan bug qolishini ko‘rsat; branch va edge test qo‘sh.

### Nazorat ishi — Testlangan, hujjatlangan kutubxona

**Talablar:** Calc yoki notes utility kutubxonasi: docstring, README, pytest fixtures/parametrize/mock, lint, CI.

**Tekshiruv holatlari:** Normal, boundary, invalid test; exception test; network mock; CI check.

**Cheklovlar:** Coverage maqsadi masalan 80% (kurs uchun), lekin asosiy behavior/test quality ustuvor; real report.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## PY-20

**Production Python capstone** · Supporting (Tayanch) · 21 mikro-dars

### py-20-01 — Texnik talablar va loyiha scope

**Tushuncha.** Scope loyiha nima qiladi va nima qilmasligini, acceptance criteria esa tekshiriladigan natijani belgilaydi.

**Kod / amaliy namuna.** Notes API: CRUD + CLI + validation + storage; auth bu scopega kirmaydi.

**Mustaqil mashq.** Notes loyihasi uchun 8 functional va 4 non-functional talab yoz; out-of-scope ni ajrat.

### py-20-02 — Papka va package arxitekturasi

**Tushuncha.** Package arxitekturasi mas’uliyatlarni ajratadi: API, domain, storage, CLI va tests.

**Kod / amaliy namuna.** `src/notes/{api.py,service.py,storage.py,cli.py,schemas.py}` + `tests/`.

**Mustaqil mashq.** Import yo‘nalishlarini chiz; API/CLI bitta service qatlamini ishlatsin, circular import bo‘lmasin.

### py-20-03 — venv/uv bilan muhit yaratish

**Tushuncha.** Izolyatsiyalangan muhit va deklarativ dependency loyiha qayta tiklanishini ta’minlaydi.

**Kod / amaliy namuna.** `uv sync --locked` (lock bo‘lsa) yoki `python -m venv .venv`.

**Mustaqil mashq.** Toza muhit yarat, FastAPI/Pydantic/test dependencylarni pyprojectda belgilab install qil.

### py-20-04 — Data model va API schema

**Tushuncha.** Data model ichki holat, API schema kirish/chiqish kontraktini belgilaydi.

**Kod / amaliy namuna.** `NoteCreate(title,content)`, `NoteOut(id,title,content)`

**Mustaqil mashq.** Create, Update va Read modellarini ajrat; ID server yaratadi va title validatsiyasi bo‘lsin.

### py-20-05 — FastAPI CRUD endpointlar

**Tushuncha.** CRUD endpointlar resurs yaratish, o‘qish, yangilash va o‘chirishni HTTP orqali beradi.

**Kod / amaliy namuna.** POST /notes → 201; GET /notes/{id} → 200/404; DELETE → 204.

**Mustaqil mashq.** In-memory repository bilan CRUD yoz, query limit va id xatolarini test qil.

### py-20-06 — Exception handling strategiyasi

**Tushuncha.** Domain xatosini HTTP/CLI xatosiga mos qatlamda aylantir; ichki stacktrace clientga chiqmasin.

**Kod / amaliy namuna.** `NoteNotFound` → API 404; CLI tushunarli stderr xabar.

**Mustaqil mashq.** NotFound, validation va storage failure holatlari uchun mapping yoz; 500 ni keraksiz 400 qilma.

### py-20-07 — Fayl saqlash yoki kichik DB integratsiya

**Tushuncha.** Fayl persistence kichik local appga, SQLite transactional structured data uchun mos; concurrency va atomicityni hisobga ol.

**Kod / amaliy namuna.** `sqlite3` parameterized `SELECT ... WHERE id=?`.

**Mustaqil mashq.** SQLite repository yoki atomik yozuvchi JSON storage tanla; restartdan keyin data saqlansin, duplicate/id xatosini boshqar.

### py-20-08 — Async I/O qarori

**Tushuncha.** Async I/O faqat mos nonblocking driver va workload bo‘lsa foydali; sync storage bilan oddiy def yetarli bo‘lishi mumkin.

**Kod / amaliy namuna.** SQLite sync accessni async def ichida bloklab qo‘ymaslik.

**Mustaqil mashq.** Storage uchun sync yoki async tanlovini yoz, bir xil load bilan o‘lchov rejasini tuz.

### py-20-09 — Type checking va validation

**Tushuncha.** Typing static kontrakt, validation tashqi inputni runtime tekshiradi.

**Kod / amaliy namuna.** `def get_note(id:int)->NoteOut: ...` va Pydantic schema.

**Mustaqil mashq.** Service va repository interfeyslariga hint qo‘sh; mypy/pyright va invalid API inputni tekshir.

### py-20-10 — pytest testlarini yozish

**Tushuncha.** pytest unit va integration testlar domain, repository va HTTP kontraktini qamraydi.

**Kod / amaliy namuna.** `from fastapi.testclient import TestClient`; `client.get("/notes")`.

**Mustaqil mashq.** CRUD, not found, invalid schema, restart persistence va CLI uchun testlar yoz; real data ishlatma.

### py-20-11 — Lint/format pipeline

**Tushuncha.** Lint/format pipeline kelishilgan uslubni va statik xatolarni CI da nazorat qiladi.

**Kod / amaliy namuna.** `ruff check .`; `ruff format --check .`; `python -m pytest`

**Mustaqil mashq.** Bitta tekshiruv komandalar ketma-ketligini yoz; xato bo‘lsa pipeline fail bo‘lsin.

### py-20-12 — API dokumentatsiya

**Tushuncha.** API docs endpoint, schema, status va autentifikatsiya chegarasini to‘g‘ri ko‘rsatadi.

**Kod / amaliy namuna.** FastAPI `/docs` + README curl misollari.

**Mustaqil mashq.** 5 CRUD endpoint uchun request/response misollari, 404/422 xatolari va run komandasini yoz.

### py-20-13 — Environment variables

**Tushuncha.** Environment variables muhitga bog‘liq sozlamalarni koddan ajratadi.

**Kod / amaliy namuna.** `import os; db_path=os.getenv("DB_PATH","notes.db")`

**Mustaqil mashq.** DB_PATH va LOG_LEVEL ni env orqali sozla; test/prod path bir-biridan ajralishini tekshir.

### py-20-14 — Secrets hardcode qilmaslik

**Tushuncha.** Secret API kalit yoki passwordni source codega yozmaslik kerak; env/secret store va gitignore ishlatiladi.

**Kod / amaliy namuna.** `.env.example` faqat placeholder; `.env` gitignore.

**Mustaqil mashq.** Dummy secret uchun env var va example file yarat; log, README va git diffda haqiqiy secret yo‘qligini tekshir.

### py-20-15 — Logging asoslari

**Tushuncha.** Logging strukturali diagnostika beradi; darajalar DEBUG, INFO, WARNING, ERROR.

**Kod / amaliy namuna.** `import logging; logger=logging.getLogger(__name__); logger.info("note created")`

**Mustaqil mashq.** CRUD va xatolar uchun log yoz; full request body yoki secretni loglama.

### py-20-16 — Docker overview (extension)

**Tushuncha.** Docker container ilova va runtime dependencylarini izolyatsiyalangan image sifatida ishga tushiradi; bu extension.

**Kod / amaliy namuna.** Dockerfile: Python base, dependency install, non-root user, app start.

**Mustaqil mashq.** Docker mavjud bo‘lsa local image build/run qil; health endpointni tekshir, secretsni imagega kiritma.

### py-20-17 — CI sinovi

**Tushuncha.** CI pull request/pushda test, lint va typingni avtomatik tekshiradi; deploy bu alohida qaror.

**Kod / amaliy namuna.** GitHub Actions → setup → install → checks.

**Mustaqil mashq.** CI workflow yoz; ataylab fail test bilan merge oldidan signal kelishini tekshir; auto-production deploy qo‘shma.

### py-20-18 — Manual acceptance criteria

**Tushuncha.** Manual acceptance ishlab turgan appni real user flow bo‘yicha tekshiradi.

**Kod / amaliy namuna.** Create → list → edit → delete → restart → error input.

**Mustaqil mashq.** 10 acceptance checklist tuz, har bandga expected va actual natija yoz.

### py-20-19 — Load test kirish (extension)

**Tushuncha.** Load test extension: nazoratli local/test muhitida latency, throughput va error rate o‘lchanadi.

**Kod / amaliy namuna.** Bir xil GET endpoint uchun 1 va 10 concurrent client.

**Mustaqil mashq.** Faqat o‘zingning local API ngda kichik load test qil; p50/p95 va error rate ni o‘lcha; productionga yuk bermagin.

### py-20-20 — Release checklist

**Tushuncha.** Release checklist dependency, tests, migration/backup, config, docs va rollback tayyorligini tekshiradi.

**Kod / amaliy namuna.** Version tag, passing CI, env setup, smoke test, rollback note.

**Mustaqil mashq.** Release oldidan pass/fail checklist yoz; critical failure bo‘lsa release qilma.

### py-20-21 — Portfolio README va demo

**Tushuncha.** Portfolio README muammo, arxitektura, setup, demo, test natijasi va cheklovlarni aniq ko‘rsatadi.

**Kod / amaliy namuna.** README + API examples + terminal demo.

**Mustaqil mashq.** Notes API + CLI uchun to‘liq README yoz, 2 daqiqalik demo flow tayyorla; o‘lchanmagan metrikani uydirma.

### Nazorat ishi — To‘liq FastAPI + CLI + tests + docs loyiha

**Talablar:** Notes FastAPI + CLI + SQLite/JSON repository, service, schema, tests, docs, env, logging va CI.

**Tekshiruv holatlari:** CRUD, persistence restart, invalid 422, missing 404, CLI/API bir xil storage, toza setup, secret scan.

**Cheklovlar:** Docker/load test optional; release checklist; production deploy talab emas; barcha test real ishga tushiriladi.

**Baholash (100 ball):** ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15.

---

## Rasmiy ma’lumotnoma

- Python: https://docs.python.org/3/
- Asl qo‘shimcha mashq manbasi: https://github.com/Asabeneh/30-Days-Of-Python
- Python packaging: https://packaging.python.org/
- FastAPI: https://fastapi.tiangolo.com/
- Pydantic: https://docs.pydantic.dev/
- pytest: https://docs.pytest.org/

Bu qo‘llanma 30 Days of Python reposining aynan nusxasi emas: foydalanuvchi bergan 20 phase / 344 darslik kengaytirilgan dastur asosida tuzilgan.
