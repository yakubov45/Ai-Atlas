# 30 Days of Python — testlar va amaliy mashqlar

**Manba:** [Asabeneh / 30-Days-Of-Python](https://github.com/Asabeneh/30-Days-Of-Python). Mavzular asl repo ketma-ketligida; savollar va vazifalar mustaqil tuzilgan.

**Jami:** 90 test + 90 amaliy mashq (180 topshiriq). Har kuni 1 nazariy test, 1 natijani oldindan topish, 1 debugging va 3 amaliy mashq. 30-kun — yakuniy integratsiya.

## Qoidalar

- Test kodini avval ishga tushirma: natija va sababini yoz, keyin tekshir.
- Mashq oldidan input/output, algoritm va kamida 3 test holatini yoz. Hali o‘tilmagan mavzuni majburan ishlatma; cheklovlar har mashqda berilgan.
- Level 3 — mustaqil asosiy masala; Level 4 — murakkabroq; Level 5 — bir nechta fikrni birlashtiruvchi challenge. Tayyor yechimlar berilmagan.
- Namunalar yagona test emas. Bo‘sh qiymat, takrorlar, chegaraviy holatlar va noto‘g‘ri inputni shartga muvofiq tekshir.
- Har kuni 3 test × 2 ball + 3 mashq × 8 ball = 30 ball. Amaliyot: ishlash 3, edge cases 2, algoritm 2, o‘qilishi 1. Jami 900 ball. 24/30 yoki yuqori bo‘lsa keyingi kunga o‘tishni tavsiya qilamiz.
- 20-kundan keyin kutubxonalar bilan ishlash, server va database topshiriqlarini o‘zingning lokal/test muhitida bajar; maxfiy kalitlarni kodga yozma.

## Mundarija

- 01. Introduction — Python asoslari
- 02. Variables, Built-in Functions
- 03. Operators
- 04. Strings
- 05. Lists
- 06. Tuples
- 07. Sets
- 08. Dictionaries
- 09. Conditionals
- 10. Loops
- 11. Functions
- 12. Modules
- 13. List Comprehension
- 14. Higher Order Functions
- 15. Python Type Errors
- 16. Python DateTime
- 17. Exception Handling
- 18. Regular Expressions
- 19. File Handling
- 20. Python Package Manager
- 21. Classes and Objects
- 22. Web Scraping
- 23. Virtual Environment
- 24. Statistics
- 25. Pandas
- 26. Python Web
- 27. Python with MongoDB
- 28. API
- 29. Building API
- 30. Conclusions — yakuniy integratsiya

---

## Day 01 — Introduction — Python asoslari

### A. Testlar

**01.T1 — Nazariya**

`type(5 / 2)` va `type(5 // 2)` natijalari qaysi? A) int, int B) float, int C) int, float D) float, float

**01.T2 — Output Prediction**

Kodni ishga tushirmasdan natijani top:
```python
print(17 % 5, 17 // 5, 2 ** 3 ** 2)
```

**01.T3 — Debugging**

`print("Jami: " + 12)` nima uchun xato beradi? Tuzat; son matn bilan bir qatorda chiqsin.

### B. Amaliy mashqlar

**01.P1 — Level 3**

Vaqtni ajratish. 7384 soniyani soat, daqiqa va soniyaga aylantir. Natija: `2:3:4`. Faqat arifmetik amallar; `if` va sikl yo‘q.

**01.P2 — Level 4**

Banknot hisoblash. 287000 so‘mni 100000, 50000, 20000, 10000, 5000, 2000, 1000 nominallarining eng kam soniga ajrat. Har bir nominaldan nechtadan va qoldiqni chiqar. Faqat `//`, `%` va arifmetika. Masalan 17000 → 10000×1, 5000×1, 2000×1.

**01.P3 — Level 5**

Raqamlar kubi. 5831 sonining to‘rtta raqamini alohida ajrat, teskari tartibdagi sonni va raqamlar kublari yig‘indisini hisobla. 1200 bilan ham tekshir. Stringga aylantirish va sikl taqiqlanadi.


---

## Day 02 — Variables, Built-in Functions

### A. Testlar

**02.T1 — Nazariya**

Qaysi nom Python o‘zgaruvchisi uchun yaroqli? A) `2price` B) `class` C) `total_price` D) `total-price`

**02.T2 — Output Prediction**

Natijani top:
```python
x = 7
x, y = x + 2, x * 3
print(x, y, max(x, y) - min(x, y))
```

**02.T3 — Debugging**

`age = input("Yosh: "); print(age + 5)` kodida nima xato? `20` kiritilsa 25 chiqishi kerak.

### B. Amaliy mashqlar

**02.P1 — Level 3**

Hisob-kitob. Narx, miqdor, chegirma foizi va QQS foizini input orqali ol. Avval chegirma, keyin QQS qo‘lla va yakuniy summani 2 kasrga yaxlitla. 100000, 2, 10, 12 → 201600.00.

**02.P2 — Level 4**

Uchta sonning o‘rtadagisini top. `min`, `max` hamda arifmetikadan foydalan; `if`, `sorted` va list ishlatma. 9, 2, 5 → 5; 3, 3, 9 → 3.

**02.P3 — Level 5**

To‘g‘ri to‘rtburchaklar. Ikki to‘rtburchakning bo‘yi va eni inputdan beriladi. Katta yuzani, kichik perimetrni va yuzalar farqini chiqar. O‘zgaruvchilarni aniq nomla. 3×4, 2×8 → 16, 14, 4.


---

## Day 03 — Operators

### A. Testlar

**03.T1 — Nazariya**

`not True or True and False` qiymati nima? A) True B) False C) None D) SyntaxError

**03.T2 — Output Prediction**

Natijani top:
```python
x = -17
print(x // 5, x % 5, 3 < 5 <= 5)
```

**03.T3 — Debugging**

Chegirma 18–25 yoshdagilarga. `age >= 18 or age <= 25` nega noto‘g‘ri? 17 va 26 yoshni ham tekshir.

### B. Amaliy mashqlar

**03.P1 — Level 3**

Kabisa yilini Boolean ifoda bilan aniqlash. 4 ga bo‘linadi va 100 ga bo‘linmaydi yoki 400 ga bo‘linadi. `if` ishlatma. 1900 → False; 2000 → True; 2024 → True.

**03.P2 — Level 4**

Shaxmat. (x1,y1) va (x2,y2) kataklari bir rangdaligini, bir ustun/qator yoki bir diagonalda ekanini alohida Boolean qiymatlarda chiqar. Koordinatalar 1–8 va boshlang‘ich kataklar turlicha.

**03.P3 — Level 5**

Kirish huquqi. `age`, `has_ticket`, `is_banned`, `is_vip` berilgan. Ban har doim ustun; boshqa holatda 18+ va chipta bor yoki VIP bo‘lsa kiradi. Bitta ifoda yozib, kamida 6 holatda tekshir. `if` yo‘q.


---

## Day 04 — Strings

### A. Testlar

**04.T1 — Nazariya**

`"python"[1:5:2]` qiymati? A) yt B) yh C) yhn D) pto

**04.T2 — Output Prediction**

Natijani top:
```python
s = "  PyTHON  "
print(s.strip().lower()[::-2])
```

**04.T3 — Debugging**

`s = "cat"; s[0] = "b"` kodidagi xatoni tushuntir va `bat` hosil qil.

### B. Amaliy mashqlar

**04.P1 — Level 3**

Matnni normallashtir. `"  PyThOn   is   FUN  "` → `"python is fun"`. `split`, `join`, `lower` mumkin; sikl yo‘q.

**04.P2 — Level 4**

Palindrom detektori. Harf registri, bo‘sh joy va vergulni hisobga olma. `"Never odd, or even"` → True; `"Python"` → False. Faqat string metodlari, slicing va taqqoslash.

**04.P3 — Level 5**

Email niqobi. `"muhammad@example.com"` → `"m******d@example.com"`; username kamida 2 belgili, bitta `@` kafolatlangan. Yulduzlar sonini uzunlikdan hisobla. Sikl va `if` yo‘q.


---

## Day 05 — Lists

### A. Testlar

**05.T1 — Nazariya**

Qaysi amal listni joyida o‘zgartirib, None qaytaradi? A) `sorted(x)` B) `x.sort()` C) `x[:]` D) `len(x)`

**05.T2 — Output Prediction**

Natijani top:
```python
a = [1, 2, 3]
b = a
c = a[:]
b.append(4)
c[0] = 9
print(a, c)
```

**05.T3 — Debugging**

`a = [3, 1, 2]; a = a.sort(); print(a[0])` xatosini tuzat.

### B. Amaliy mashqlar

**05.P1 — Level 3**

List rotation. `[1,2,3,4,5]` ni o‘ngga k=7 marta aylantir → `[4,5,1,2,3]`. List bo‘sh emas, k≥0; slicing va `%`, sikl yo‘q.

**05.P2 — Level 4**

O‘rtacha baholarning ta’sirini kamaytir. Kamida 5 ta ball berilgan listdan bitta eng katta va bitta eng kichik ballni chiqarib tashla, qolganlar o‘rtachasini hisobla. Original list o‘zgarmasin. `[10,20,20,30,100]` → 23.333... .

**05.P3 — Level 5**

Matritsa kesimi. 3×3 list berilgan: `[[1,2,3],[4,5,6],[7,8,9]]`. Asosiy diagonal, ikkinchi diagonal, o‘rta ustun qiymatlari va ikkala diagonalning markaz bir marta hisoblangan yig‘indisini top. Sikl ishlatma; natija yig‘indi 25.


---

## Day 06 — Tuples

### A. Testlar

**06.T1 — Nazariya**

Bir elementli tuple qaysi? A) `(5)` B) `[5]` C) `(5,)` D) `5`

**06.T2 — Output Prediction**

Natijani top:
```python
a = (1, [2, 3])
a[1].append(4)
print(a)
```

**06.T3 — Debugging**

`a, b = (1, 2, 3)` nega ishlamaydi? Qolgan elementlar `b` ga list bo‘lib tushsin.

### B. Amaliy mashqlar

**06.P1 — Level 3**

Koordinata. `p=(2,3)`, `q=(8,11)` orasidagi masofani va o‘rta nuqtani tuple sifatida hisobla. Masofa 10, o‘rta nuqta `(5.0,7.0)`.

**06.P2 — Level 4**

Tuple kesish. `(10,20,30,40,50,60)` dan slicing va tuple birlashtirish orqali `(50,60,10,20,30,40)` va `(60,50,40,30,20,10)` hosil qil; listga aylantirma.

**06.P3 — Level 5**

Uchta nuqtadan uchburchak yuzini koordinatalar formulasi bilan hisobla: `abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2`. `(0,0),(4,0),(0,3)` → 6. Har bir nuqta tuple; natijani `(nuqtalar_tuple, yuza)` shaklida saqla.


---

## Day 07 — Sets

### A. Testlar

**07.T1 — Nazariya**

Qaysi ifoda simmetrik farqni topadi? A) `a & b` B) `a | b` C) `a ^ b` D) `a - b`

**07.T2 — Output Prediction**

Natijani top (set tartibi muhim emas):
```python
a = {1, 2, 3, 4}
b = {3, 4, 5}
print(len(a | b), len(a & b), len(a ^ b))
```

**07.T3 — Debugging**

`s = set(); s.add([1, 2])` xatosini izohla; shu juftlikni setga qo‘shish usulini yoz.

### B. Amaliy mashqlar

**07.P1 — Level 3**

Kurs tahlili. Python, SQL, ML kurslari qatnashchilari setlari berilgan. Uchalasiga qatnashganlarni, aynan ikkitasiga qatnashganlarni va faqat bittasiga qatnashganlarni top. A={1,2,3}, B={2,3,4}, C={3,4,5} → {3}, {2,4}, {1,5}.

**07.P2 — Level 4**

Yo‘qolgan va takrorlangan ID. Kutilgan ID seti `{1,2,3,4,5}`, kelgan list `[1,2,2,4,7]`. Yetishmayotgan, begona va takroriy ortiqcha yozuvlar sonini top: `{3,5}`, `{7}`, 1. Sikl ishlatma.

**07.P3 — Level 5**

Jaccard o‘xshashlik. Ikki matnni lowercase qilib so‘z setlariga ajrat va kesishma/birlashma nisbatini top. `"python ai python"`, `"ai data"` → 1/3. Kamida bitta set bo‘sh bo‘lmasin. Sikl yo‘q.


---

## Day 08 — Dictionaries

### A. Testlar

**08.T1 — Nazariya**

`d.get("x", 0)` kalit yo‘q bo‘lsa nima qiladi? A) KeyError B) 0 qaytaradi, dict o‘zgarmaydi C) x kalitini kiritadi D) None

**08.T2 — Output Prediction**

Natijani top:
```python
d = {"a": 2, "b": 3}
d["a"] += d.get("c", 4)
d["c"] = d.pop("b")
print(d)
```

**08.T3 — Debugging**

`d = {[1, 2]: "x"}` xatosi nima? Kalitni o‘zgartirib tuzat.

### B. Amaliy mashqlar

**08.P1 — Level 3**

Mahsulot hisoboti. `{"cpu":{"price":200,"stock":3},"ram":{"price":50,"stock":8}}` uchun jami ombor qiymatini va RAM stockini 2 taga kamaytirgandan keyingi qiymatni hisobla. 1000 → 900. Faqat ma'lum kalitlar, sikl yo‘q.

**08.P2 — Level 4**

Sozlamalar. Default `{"theme":"light","lang":"uz","limit":10}` va user `{"theme":"dark","limit":25}`. Ikki dictni originalni o‘zgartirmasdan birlashtir; user qiymati ustun. So‘ng mavjud bo‘lmagan `timezone` uchun `UTC` qaytar.

**08.P3 — Level 5**

Pul o‘tkazmasi. `accounts={"A":1000,"B":400,"C":50}`. A dan B ga 250, B dan C ga 100 o‘tkaz. Yetarli balans kafolatlangan; yakuniy balanslar va jami pul o‘zgarmaganini Boolean bilan tekshir. Natija 750,550,150.


---

## Day 09 — Conditionals

### A. Testlar

**09.T1 — Nazariya**

`if` / `elif` / `else` zanjirida nechta blok bajariladi? A) hammasi B) ko‘pi bilan bittasi C) faqat else D) doim ikkitasi

**09.T2 — Output Prediction**

Natijani top:
```python
x = 12
if x % 2 == 0:
    print("A")
if x % 3 == 0:
    print("B")
else:
    print("C")
```

**09.T3 — Debugging**

`if score >= 60: print("Pass")` dan keyin `elif score >= 90: print("Excellent")` nega Excellent chiqarmaydi?

### B. Amaliy mashqlar

**09.P1 — Level 3**

Progressiv tarif. Birinchi 100 birlik 1000 so‘mdan, keyingi 100 birlik 1500, qolganlari 2000. 250 birlik → 350000; 0 → 0; manfiy → xato. Har segment alohida narxlanadi.

**09.P2 — Level 4**

Uchburchak klassifikatori. Uch musbat tomon bilan avval mavjudligini, keyin teng tomonli/teng yonli/turli tomonli ekanini va to‘g‘ri burchakli ekanini aniqlab chiqar. 3,4,5 → turli tomonli, to‘g‘ri burchakli; 1,2,3 → mavjud emas.

**09.P3 — Level 5**

Buyurtma qarori. Stock, miqdor, balans, narx, VIP, bloklangan holatini ol. Ustuvorlik: bloklangan → noto‘g‘ri miqdor → stock yetmaydi → balans yetmaydi → muvaffaqiyat. VIP 10% chegirma. Muvaffaqiyatda stock/balansni yangila; muvaffaqiyatsizlikda o‘zgartirma.


---

## Day 10 — Loops

### A. Testlar

**10.T1 — Nazariya**

`range(2, 9, 3)` elementlari? A) 2,5,8 B) 2,5,8,9 C) 3,6,9 D) 2,5

**10.T2 — Output Prediction**

Natijani top:
```python
s = 0
for i in range(1, 6):
    if i == 3:
        continue
    s += i
    if s > 7:
        break
print(s, i)
```

**10.T3 — Debugging**

`i=0; while i<5:` ichida `if i==2: continue` va undan keyin `i+=1` turgan bo‘lsa nima yuz beradi? Tuzat.

### B. Amaliy mashqlar

**10.P1 — Level 3**

Tub sonlar. 2 dan n gacha tub sonlarni top. `n=30` → `[2,3,5,7,11,13,17,19,23,29]`. Har bir sonni kvadrat ildizigacha tekshir; tashqi kutubxona yo‘q.

**10.P2 — Level 4**

Eng uzun ketma-ket o‘sish. `[3,4,5,1,2,8,9,0]` → `[1,2,8,9]`. Faqat yonma-yon elementlar; teng bo‘lsa o‘sish tugaydi. Teng uzunlikda birinchisi; bo‘sh list → `[]`. Bitta asosiy yurishda yech.

**10.P3 — Level 5**

Two Sum. `[3,2,4,7]`, target=6 → `(1,2)`. Turli indekslar; yechim bo‘lmasa None. Avval ichma-ich sikl, keyin dict yordamida bir yurishda yoz. `[3,3]`,6 → `(0,1)`. Tayyor qidiruv funksiyalari yo‘q.


---

## Day 11 — Functions

### A. Testlar

**11.T1 — Nazariya**

Funksiya ichida `return` bajarilgandan keyin nima bo‘ladi? A) funksiya tugaydi B) faqat sikl tugaydi C) kod davom etadi D) doim None qaytadi

**11.T2 — Output Prediction**

Natijani top:
```python
def f(x, nums=[]):
    nums.append(x)
    return nums[:]
print(f(1), f(2), f(3, []))
```

**11.T3 — Debugging**

`def average(nums): print(sum(nums)/len(nums))` ni `average([2,4]) + 1` da ishlatib bo‘lmaydi. Ikki muammoni top: qaytarish va bo‘sh list.

### B. Amaliy mashqlar

**11.P1 — Level 3**

`is_prime(n)`, `prime_factors(n)` funksiyalarini yoz. 84 → `[2,2,3,7]`, 1 → `[]`, 97 → `[97]`. n musbat butun son. Faktorlar ko‘paytmasi n bo‘lishi va barcha faktorlar tub ekanini tekshir.

**11.P2 — Level 4**

`longest_common_prefix(words)` — `['flower','flow','flight']` → `'fl'`; `[]` → `''`; ichida bo‘sh string bo‘lsa `''`. `os.path.commonprefix` ishlatma.

**11.P3 — Level 5**

`calculate_cart(cart, discounts, tax_rate)` yoz. Har mahsulot uchun qty va price; chegirma kategoriya asosida, soliq chegirmadan so‘ng. 100×2, 10% chegirma, 12% soliq → 201.6. Funksiya inputni o‘zgartirmasin; noto‘g‘ri miqdor uchun None. Hisobni kichik yordamchi funksiyalarga ajrat.


---

## Day 12 — Modules

### A. Testlar

**12.T1 — Nazariya**

`if __name__ == "__main__":` nima uchun? A) modul importini taqiqlaydi B) bevosita ishga tushganda blokni bajaradi C) hamma holatda bajaradi D) package yaratadi

**12.T2 — Output Prediction**

Natijani top:
```python
from math import floor, ceil, sqrt
print(floor(-2.1), ceil(-2.1), int(sqrt(81)))
```

**12.T3 — Debugging**

`import math; print(sqrt(16))` nima uchun ishlamaydi? Ikki turda to‘g‘rila.

### B. Amaliy mashqlar

**12.P1 — Level 3**

`geometry.py` va `main.py` yarat: aylana yuzi, masofa, uchburchak perimetri funksiyalari. `math` ishlat. Import qilinganda modul demo matn chiqarmasin.

**12.P2 — Level 4**

Zar simulyatori. `random.Random(42)` bilan 10000 marta ikkita zar tashla. Yig‘indi chastotasi va eng ko‘p uchragan yig‘indini top. Bir seed bir xil natija bersin, jami chastota 10000; nazariy eng ehtimolli yig‘indi 7.

**12.P3 — Level 5**

ID generator. `random`, `string` orqali 8 belgili IDlardan 1000 ta noyob qiymat hosil qil. Alfavit: A–Z va 0–9. To‘qnashuv yuz bersa qayta yarat; bo‘sh alfavit yoki imkoniyatdan katta miqdor uchun None. Bu xavfsizlik tokeni emas.


---

## Day 13 — List Comprehension

### A. Testlar

**13.T1 — Nazariya**

`[x*x for x in range(5) if x%2==0]` natijasi? A) [0,4,16] B) [4,16] C) [0,1,4,9,16] D) [0,2,4]

**13.T2 — Output Prediction**

Natijani top:
```python
print([(i,j) for i in range(3) for j in range(i)])
```

**13.T3 — Debugging**

`[x if x>0 for x in nums]` syntax xatosini ikki variantda tuzat: musbatlarni filtrlash va manfiylarni 0 qilish.

### B. Amaliy mashqlar

**13.P1 — Level 3**

Matritsani transponirlash. `[[1,2,3],[4,5,6]]` → `[[1,4],[2,5],[3,6]]`. Faqat list comprehension; NumPy va `zip` yo‘q; to‘rtburchak matritsa.

**13.P2 — Level 4**

`[(a,b,c)]` shaklida barcha Pifagor uchliklarini top: 1≤a<b<c≤n, a²+b²=c². n=15 ichida (3,4,5), (5,12,13), (6,8,10), (9,12,15) bo‘lishi kerak. Comprehension bilan va oddiy sikl bilan taqqosla.

**13.P3 — Level 5**

Savdo yozuvlarini tekislash. `[{"id":1,"items":[{"sku":"A","qty":2},{"sku":"B","qty":0}]},{"id":2,"items":[{"sku":"A","qty":3}]}]` → `[(1,'A',2),(2,'A',3)]`. Faqat qty>0, nested comprehension; original o‘zgarmasin.


---

## Day 14 — Higher Order Functions

### A. Testlar

**14.T1 — Nazariya**

`filter` funksiyasi nima qiladi? A) elementlarni o‘zgartiradi B) shartga moslarini tanlaydi C) kamaytiradi D) tartiblaydi

**14.T2 — Output Prediction**

Natijani top:
```python
from functools import reduce
xs = [1,2,3,4]
print(reduce(lambda a,b: a+b, map(lambda x:x*x, filter(lambda x:x%2==0, xs)), 0))
```

**14.T3 — Debugging**

`funcs = [lambda: i for i in range(3)]` ning barcha funksiyalari oxirgi i ni qaytaradi. Har biri o‘z qiymatini saqlashi uchun tuzat.

### B. Amaliy mashqlar

**14.P1 — Level 3**

Reyting. Studentlar `(name,score,age)` ko‘rinishida; score kamayish, age o‘sish, name alifbo tartibida sarala. `key` va lambda ishlat. `[('B',90,20),('A',90,19),('C',80,18)]` → A,B,C.

**14.P2 — Level 4**

`compose(f,g)` funksiya qaytarsin: `compose(f,g)(x) == f(g(x))`. Keyin `pipeline(*funcs)` yoz: funksiyalar berilgan tartibda ishlasin; bo‘sh pipeline x ni qaytarsin. Masalan +2, ×3, -1; x=4 → 17.

**14.P3 — Level 5**

`make_counter(start, step)` closure yarat. Har chaqiriqda keyingi son qaytsin; 2,3 → 2,5,8. Ikki counter mustaqil holatga ega bo‘lsin. Global variable va class ishlatma.


---

## Day 15 — Python Type Errors

### A. Testlar

**15.T1 — Nazariya**

`[1,2][5]` qanday xato? A) KeyError B) IndexError C) ValueError D) NameError

**15.T2 — Output Prediction**

Har biri mustaqil ishga tushirilsa qaysi xato chiqadi? `int('2.5')`; `{ }['x']`; `10/0`; `unknown_name`; `len(5)`.

**15.T3 — Debugging**

`prices={'a':10}; total=prices.get('b')+5` xatosi nima? b yo‘q bo‘lganda natija 5 bo‘lsin.

### B. Amaliy mashqlar

**15.P1 — Level 3**

`safe_lookup(data, index)` list va butun indeks olsin; noto‘g‘ri tur, bo‘sh list yoki chegaradan tashqari indeksda None qaytarsin. Manfiy indeksni Python qoidasi bo‘yicha qo‘lla. `try/except` ishlatma; shartlar yordamida oldini ol.

**15.P2 — Level 4**

`parse_quantity(value)` faqat musbat butun son yoki faqat raqamlardan tashkil topgan ASCII stringni qabul qilsin. `True`, `3.5`, `'-3'`, `'abc'`, `0` → None; `'003'` → 3. Xatoga uchramasidan oldin type va stringni tekshir.

**15.P3 — Level 5**

Bug laboratoriyasi: `cart=[{'price':'10','qty':2},{'price':5},{'price':None,'qty':4}]`. Har yozuvda qaysi xato paydo bo‘lishini aniqlab hujjatlashtir. Keyin valid yozuvlar yig‘indisini va invalid indekslarni qaytar; string raqam qabul qilinsin, yetishmagan qty yoki None narx qabul qilinmasin. Natija `(20,[1,2])`. `try/except` yo‘q.


---

## Day 16 — Python DateTime

### A. Testlar

**16.T1 — Nazariya**

Ikki `date` ni ayirish natijasi nima? A) int B) str C) timedelta D) datetime

**16.T2 — Output Prediction**

Natijani top:
```python
from datetime import date,timedelta
print(date(2024,2,28)+timedelta(days=2))
```

**16.T3 — Debugging**

`datetime.strptime('18/11/2026','%Y-%m-%d')` nega xato? Formatni to‘g‘rila.

### B. Amaliy mashqlar

**16.P1 — Level 3**

Yosh kalkulyatori. Tug‘ilgan sana va hisob sanasidan to‘liq yoshni top. 2000-11-19, 2026-11-18 → 25. 29-fevral uchun kabisa bo‘lmagan yilda tug‘ilgan kun 1-mart deb belgilansin. Kelajak sana → None.

**16.P2 — Level 4**

Bron to‘qnashuvi. Ikki `[start,end)` vaqt intervali ustma-ust tushgan daqiqalarini top. 10:00–11:30 va 11:00–12:00 → 30; 10:00–11:00 va 11:00–12:00 → 0. Sana almashishini ham tekshir; start≤end.

**16.P3 — Level 5**

Ombor yaroqlilik tahlili. Partiyalar `(id, received_date, shelf_life_days)` berilgan. `as_of` sanasida expiration, qolgan kun va holatni top: ≤0 expired, 1–3 warning, >3 normal. Expired birinchi, keyin eng erta expiration; id tie-breaker. Sana misoli: 2026-11-10 + 10 kun → 2026-11-20; 18-noyabrda warning.


---

## Day 17 — Exception Handling

### A. Testlar

**17.T1 — Nazariya**

`finally` odatda qachon bajariladi? A) faqat xato bo‘lsa B) faqat xato bo‘lmasa C) har ikki holatda D) hech qachon

**17.T2 — Output Prediction**

Natijani top:
```python
try:
    print(int('x'))
except ValueError:
    print('A')
else:
    print('B')
finally:
    print('C')
```

**17.T3 — Debugging**

`except Exception:` dan keyin `except ValueError:` yozishdagi mantiqiy muammo nima?

### B. Amaliy mashqlar

**17.P1 — Level 3**

`safe_divide(a,b)` yoz: int/float yoki raqamli string qabul qilsin; bo‘luvchi 0, noto‘g‘ri qiymat va tur uchun har xil xabar qaytarsin. Masalan `('12','3') → (4.0,None)`, `(1,0) → (None,'zero')`.

**17.P2 — Level 4**

Batch parser. `['12','x','5','-2',None,'10']` dan musbat intlar va indekslangan xatolarni yig‘. Har bir element mustaqil try/except; bittasi buzilsa qolganlari davom etsin. Natija `[12,5,10]`, xato indekslari 1,3,4.

**17.P3 — Level 5**

`transfer(accounts,src,dst,amount)` yoz. Kalit yo‘q, manfiy summa, bir xil hisob va balans yetishmasligi uchun alohida ValueError/KeyError holatlari; har qanday xatoda ikkala balans ham o‘zgarmasligi kerak. Muvaffaqiyat va muvaffaqiyatsizlik testlarini yoz.


---

## Day 18 — Regular Expressions

### A. Testlar

**18.T1 — Nazariya**

`re.fullmatch` nima qiladi? A) istalgan joydan topadi B) butun matn mosligini tekshiradi C) almashtiradi D) ro‘yxat qaytaradi

**18.T2 — Output Prediction**

Natijani top:
```python
import re
print(re.findall(r'\d+', 'a12 b003 c7'))
```

**18.T3 — Debugging**

`re.findall(r'.+', 'a.b')` da nuqta nega literal nuqta emas? Faqat nuqtani topadigan pattern yoz.

### B. Amaliy mashqlar

**18.P1 — Level 3**

Telefon tekshiruvi. Faqat `+998 90 123 45 67` yoki `+998901234567` formatini qabul qil. ASCII raqamlar; aralash separator, ortiqcha belgi va noto‘g‘ri uzunlik rad etilsin. `fullmatch` ishlat.

**18.P2 — Level 4**

Log parser. `2026-11-18 10:15:24 ERROR user=42 msg=Timeout` satridan sana, vaqt, level, user ID, xabarni named group yordamida ajrat. INFO/WARN/ERROR; ID raqam; format buzilsa None.

**18.P3 — Level 5**

Legal text parser. `1-modda. Kirish\nMatn A\n2-modda. Qoidalar\nMatn B` ni modda raqami, sarlavhasi va matni bo‘yicha segmentlarga ajrat. Sarlavha satr boshida; matn orasidagi `3-modda` eslatmasi yangi segment bo‘lmasin. 3 turli test yoz.


---

## Day 19 — File Handling

### A. Testlar

**19.T1 — Nazariya**

`with open(...) as f` afzalligi? A) faylni avtomatik yopadi B) doim yozadi C) faylni o‘chiradi D) faqat JSONni o‘qiydi

**19.T2 — Output Prediction**

Fayl avval `abc` saqlaydi. `open(path,'a')` orqali `write('de')` qilinadi. `read()` natijasi nima?

**19.T3 — Debugging**

JSON matnini `json.dump(data, 'out.json')` orqali yozishda nima xato? Tuzat.

### B. Amaliy mashqlar

**19.P1 — Level 3**

`word_report(path)` faylni satrma-satr o‘qisin, so‘zlar chastotasini hisoblansin. Registr va tinish belgilarini e’tiborsiz qil. Top-5: count kamayish, so‘z alifbo tartibi; bo‘sh fayl → `[]`. Encoding UTF-8.

**19.P2 — Level 4**

CSV audit. `id,qty,price` ustunli faylni `csv` moduli bilan o‘qi; qty musbat int, price manfiy emas. Valid savdolar yig‘indisi va invalid satr raqamlarini alohida JSONga yoz. Header birinchi satr hisoblanadi. Kamida 1 buzilgan satrli test.

**19.P3 — Level 5**

Faylga asoslangan task manager. JSONda task id, title, done; add, complete, delete, list operatsiyalari. Restartdan keyin saqlansin, buzilgan JSON holatida original faylni ustidan yozma. Takroriy ID bo‘lmasin; dastur o‘zi yaratgan vaqtinchalik fayl orqali xavfsiz saqlash bonus.


---

## Day 20 — Python Package Manager

### A. Testlar

**20.T1 — Nazariya**

`python -m pip install -r requirements.txt` nima qiladi? A) paketlarni o‘chiradi B) ro‘yxatdagi dependenciesni o‘rnatadi C) Pythonni yangilaydi D) requirements yaratadi

**20.T2 — Output Prediction**

`python -m pip install requests==2.32.5` muvaffaqiyatli bo‘lsa qaysi versiya o‘rnatilishi talab qilingan?

**20.T3 — Debugging**

`pip install json` standart `json` modulidan foydalanish uchun kerakmi? Nega?

### B. Amaliy mashqlar

**20.P1 — Level 3**

`requirements.txt` yarat: `requests==2.32.5`, `beautifulsoup4==4.13.4`. `python -m pip install -r requirements.txt`, `pip show`, `pip check` bilan tekshir. Versiyalar mashq uchun berilgan, eng so‘nggi deb da'vo qilinmaydi.

**20.P2 — Level 4**

Dependency audit. `math`, `requests`, `json`, `bs4`, `datetime`, `pandas` importlarini standard va third-partyga ajrat. Third-party import nomidan distributiv nomini aniqlab requirements tuz (bs4 → beautifulsoup4).

**20.P3 — Level 5**

Reproducibility. Alohida Python muhiti mavjud bo‘lsa undan foydalanib kichik terminal loyiha yarat; tashqi paket va uning aniq versiyasini yoz. `pip freeze` natijasini solishtir, READMEga install/run/verify buyruqlarini yoz. Boshqa muhitda takrorlash uchun to‘liq ro‘yxatni saqla; 23-kunda yangi venv bilan qayta sinaysan.


---

## Day 21 — Classes and Objects

### A. Testlar

**21.T1 — Nazariya**

`self` nima? A) class nomi B) joriy instancega reference C) global variable D) constructor qaytaradigan qiymat

**21.T2 — Output Prediction**

Natijani top:
```python
class Bank:
    history = []
    def add(self, x):
        self.history.append(x)
a, b = Bank(), Bank()
a.add(10)
b.add(20)
print(a.history, b.history)
```

**21.T3 — Debugging**

`class User: def __init__(name): ...` (to‘g‘ri indent qilingan deb ol) kodida `User('Ali')` nega TypeError beradi? Imzoni tuzat.

### B. Amaliy mashqlar

**21.P1 — Level 3**

BankAccount class. `deposit`, `withdraw`, `transfer`, `get_balance`, transaction history. Nol/manfiy miqdor rad etilsin; transfer xatoda hech bir hisobni o‘zgartirmasin. 2 mustaqil hisob bilan tekshir.

**21.P2 — Level 4**

Stack va Queue classlarini list yordamida yarat. Stack: push/pop/peek; Queue: enqueue/dequeue/peek. Bo‘sh holat None; size/is_empty. Browser history uchun Stack, xizmat navbati uchun Queue demo yoz. Har operatsiyaning murakkabligini tushuntir; `pop(0)` nega sekin?

**21.P3 — Level 5**

Kutubxona tizimi. `Book`, `Member`, `Library` classlari; kitob nusxalari, borrow/return, bir vaqtda 3 kitob limiti, bitta nusxani ikki odam olmasligi, tarix. Kamida 8 test. Inheritance bonus: StudentMember va StaffMember limitlari turlicha.


---

## Day 22 — Web Scraping

### A. Testlar

**22.T1 — Nazariya**

BeautifulSoup `select('.product')` nima qaytaradi? A) bitta matn B) CSS selectorga mos taglar ro‘yxati C) JSON D) URL

**22.T2 — Output Prediction**

Natijani top:
```python
from bs4 import BeautifulSoup
s = BeautifulSoup('<ul><li>A</li><li>B</li></ul>', 'html.parser')
print([x.get_text() for x in s.select('li')])
```

**22.T3 — Debugging**

`soup.find('h1').text` ba'zi sahifalarda AttributeError beradi. Sababi va himoya usuli?

### B. Amaliy mashqlar

**22.P1 — Level 3**

Mahsulot parseri. O‘zing yaratgan HTML fixtureda `div.product` ichida name va price bo‘lsin. List of dict qaytar, narxni son qil, yetishmagan nom/narxli kartani xato sifatida ajrat. Dastlab tarmoq ishlatma.

**22.P2 — Level 4**

Nisbiy linklar. HTML fixtureda `/p/1`, `/p/2`, takroriy `/p/1`, tashqi domen va `#top` bor. `urllib.parse.urljoin` yordamida faqat bir xil domen mahsulot URLlarini noyob qilib tartib bilan chiqar.

**22.P3 — Level 5**

Ruxsat berilgan demo saytda, masalan `https://books.toscrape.com/`, 3 sahifagacha title, price, next linkni yig‘. Timeout, HTTP status tekshiruvi, so‘rovlar orasida tanaffus, robots/foydalanish qoidalariga rioya; 1 sahifa xatosini log qil. JSONga yoz, fixture orqali offline test ham yarat.


---

## Day 23 — Virtual Environment

### A. Testlar

**23.T1 — Nazariya**

venvning asosiy vazifasi? A) global Pythonni o‘chiradi B) dependencylarni loyihalar bo‘yicha ajratadi C) internet tezligini oshiradi D) kodni kompilyatsiya qiladi

**23.T2 — Output Prediction**

Windows PowerShell: `python -m venv .venv` bajarildi, aktivlashtirish yo‘li qaysi? A) `source .venv/bin/activate` B) `.\.venv\Scripts\Activate.ps1` C) `pip activate` D) `python activate`

**23.T3 — Debugging**

Terminalda venv faol, lekin IDE boshqa interpreterda ishlagani sabab import xato. Qanday tekshirasan?

### B. Amaliy mashqlar

**23.P1 — Level 3**

`project_a` va `project_b` uchun ikkita venv yarat. A ga requests 2.32.5, B ga 2.31.0 o‘rnat (faqat o‘rganish muhiti). `sys.executable` va package version bilan izolyatsiyani isbotla.

**23.P2 — Level 4**

20-kundagi loyihani yangi toza venvda `requirements.txt` orqali tikla. `pip check` va import smoke-test yoz. `.venv`, `__pycache__`, `.env` ni `.gitignore` ga kirit.

**23.P3 — Level 5**

Environment doctor. `sys.version`, `sys.executable`, `sys.prefix != sys.base_prefix`, kerakli package versiyalarini chiqaruvchi script yoz. Paket yo‘q bo‘lsa ham script yiqilmasin; yakunda `OK` yoki `FAIL`. `importlib.metadata` ishlatish mumkin.


---

## Day 24 — Statistics

### A. Testlar

**24.T1 — Nazariya**

Qaysi metrika ekstremal qiymatga kamroq sezgir? A) mean B) median C) range D) variance

**24.T2 — Output Prediction**

Natijani top:
```python
from statistics import mean, median, pvariance
print(mean([1,2,3,4]), median([1,2,3,4]), pvariance([1,2,3,4]))
```

**24.T3 — Debugging**

`statistics.stdev([5])` xato beradi. Nega? Bitta qiymat uchun population stdev qancha?

### B. Amaliy mashqlar

**24.P1 — Level 3**

NumPy va statistics yordamida `[2,4,4,4,5,5,7,9]` uchun mean, median, population variance/std va sample variance/stdni hisobla. Population mean=5, variance=4, std=2. Formulani qo‘lda ham yoz va taqqosla.

**24.P2 — Level 4**

Z-score outlier detector. `[10,11,9,10,12,100]` uchun population mean/std, har nuqta z-score va `abs(z)>2` bo‘lgan qiymatlarni qaytar. Std=0 bo‘lsa outlier yo‘q. `[5,5,5]` ni tekshir.

**24.P3 — Level 5**

A/B tahlili. A: `[12,13,15,14,100]`, B: `[19,20,21,20,22]`. Mean, median, std va eng katta qiymat olib tashlangandagi meanlarni solishtir. Qaysi guruh barqarorroq? Kichik sample asosida sababiy yoki statistik ahamiyatli xulosa chiqarmaslikni tushuntir.


---

## Day 25 — Pandas

### A. Testlar

**25.T1 — Nazariya**

`df.loc` va `df.iloc` farqi? A) label/position B) position/label C) ikkalasi faqat ustun D) farq yo‘q

**25.T2 — Output Prediction**

Natijani top:
```python
import pandas as pd
df = pd.DataFrame({'g':['A','A','B'],'x':[2,4,9]})
print(df.groupby('g')['x'].sum().to_dict())
```

**25.T3 — Debugging**

`df.dropna()` chaqirildi, lekin original dfda NaN qoldi. Nima uchun? To‘g‘rila.

### B. Amaliy mashqlar

**25.P1 — Level 3**

Data cleaning. CSVda id, age, score mavjud; duplicate idlarda oxirgi yozuvni saqla, age va score ni numericga aylantir, age missing ni valid median bilan to‘ldir, score 0–100 dan tashqarida yoki missing bo‘lsa qatorni chiqar. Oldin/keyin qator soni va NaN hisoboti.

**25.P2 — Level 4**

Savdo dashboard dataset. `date,category,qty,price` ustunlaridan revenue yarat. Oy va kategoriya bo‘yicha groupby, eng daromadli 3 kategoriya (tie alifbo), oylar o‘sish foizi (oldingi oy 0 yoki yo‘q bo‘lsa NaN). Kamida 2 oy, 3 kategoriya, 1 invalid yozuvli fixture.

**25.P3 — Level 5**

Student risk dataset. `student_id,score,attendance,credits` asosida features jadvali yarat. Missing qiymatlar hisobotini chiqarmasdan yashirma; score<50 yoki attendance<60 bo‘lsa risk=True, ikkalasi ham ma'lum va shart bajarilmasa False, aks holda noma'lum. Risk foizi faqat aniqlanganlar orasida; boshqa guruhga missinglarni alohida chiqar. Bu ML model emas, qoida asosidagi tahlil.


---

## Day 26 — Python Web

### A. Testlar

**26.T1 — Nazariya**

Flask route nima? A) URLni Python handlerga bog‘laydi B) database index C) CSS klass D) pip paketi

**26.T2 — Output Prediction**

`@app.route('/hello/<name>')` handleri `return f'Hi {name}'` qilsa, `/hello/Ali` nima qaytaradi?

**26.T3 — Debugging**

`request.form['name']` POSTda maydon yo‘q bo‘lsa xato. Forma validatsiyasini qanday qilasan?

### B. Amaliy mashqlar

**26.P1 — Level 3**

Flask mini kalkulyator: GET forma, POST natija; plus/minus/multiply/divide. Noto‘g‘ri son va 0 ga bo‘lishda xato xabari. 5 ta Flask test client testi.

**26.P2 — Level 4**

Mahalliy task web app. HTML template, add/complete/list; dastlab in-memory saqlash. Task title bo‘sh bo‘lmasin, noto‘g‘ri ID 404; GET orqali holat o‘zgarmasin, POST ishlat. Foydalanuvchi matnini HTMLga xavfsiz render qil.

**26.P3 — Level 5**

Mahsulot katalogi. Flask + Jinja: 20 ta qo‘lda yaratilgan fixture mahsulot; qidiruv, category filter, price range va pagination. Query parametrlar birga ishlasin; noto‘g‘ri range/page rad etilsin; mahsulot detailda 404. Kamida 8 test.


---

## Day 27 — Python with MongoDB

### A. Testlar

**27.T1 — Nazariya**

MongoDB documentni Python bilan o‘qiganda odatda qanday turga mos keladi? A) dict B) tuple C) set D) int

**27.T2 — Output Prediction**

`update_one({'sku':'A'},{'$inc':{'stock':-2}})` oldingi stock=7 bo‘lsa yangisi qancha?

**27.T3 — Debugging**

`find_one({'sku':'missing'})['stock']` nima uchun yiqiladi? Tuzat.

### B. Amaliy mashqlar

**27.P1 — Level 3**

Mahalliy test MongoDBda products CRUD. sku unique index, name, price, stock; duplicate SKU va invalid miqdorlarni rad et. Database ulanish satrini kodga yozma; env orqali ol. Test database nomi alohida.

**27.P2 — Level 4**

Atomic stock reserve. Sku va qty uchun bitta `update_one` da `stock >= qty` sharti bilan `$inc` bajar. 5 stock, 4 va 4 rezerv → faqat bittasi muvaffaqiyatli, qoldiq 1. Return matched/modified natijasini tekshir; qty>0.

**27.P3 — Level 5**

Orders analytics. Order documentlarda status, created_at, items (sku,qty,price). Faqat paid orderlar bo‘yicha aggregation: unwind, revenue hisoblash, SKU bo‘yicha group, top-5 sort, sana filter. 4–5 fixture order bilan kutilgan hisobni qo‘lda tekshir.


---

## Day 28 — API

### A. Testlar

**28.T1 — Nazariya**

HTTP 429 nimani bildiradi? A) Not Found B) Too Many Requests C) Unauthorized D) OK

**28.T2 — Output Prediction**

Natijani top:
```python
payload = {'data':[{'id':1,'active':True},{'id':2,'active':False}]}
print([x['id'] for x in payload['data'] if x['active']])
```

**28.T3 — Debugging**

`requests.get(url).json()` da qaysi 3 holat muammo tug‘dirishi mumkin? Yechim strategiyasi?

### B. Amaliy mashqlar

**28.P1 — Level 3**

API client. `requests` bilan ruxsat etilgan demo API dan items ol; timeout, raise_for_status va response schema tekshir. `fetch_items()` xatoda boshqariladigan natija qaytarsin. Tarmoqsiz test uchun fake response yoki unittest.mock ishlat.

**28.P2 — Level 4**

Pagination collector. Mock APIda `items` va `next` bor. Barcha sahifalarni yig‘, duplicate idlarni birinchi uchrashuv bo‘yicha olib tashla, takrorlangan next yoki max_pages ga yetganda aniq to‘xta. 3 sahifali va loop fixture test qil.

**28.P3 — Level 5**

Retry/cache client. GET so‘rovida faqat vaqtinchalik xatolar (429, 502, 503, 504 va timeout) uchun max 3 urinish; backoff va Retry-Afterni hisobga ol (cheklangan kutish). 400/401/404 ni qaytarma. Muvaffaqiyatli response uchun 60s lokal cache; testlarda fake clock/sleep, haqiqiy kutish yo‘q.


---

## Day 29 — Building API

### A. Testlar

**29.T1 — Nazariya**

Yangi resource yaratilganda mos status? A) 201 B) 404 C) 500 D) 304

**29.T2 — Output Prediction**

Stock=7. API `reserve(3)` muvaffaqiyatli, keyin `reserve(5)` stock yetmasa 409 qaytaradi va holatni o‘zgartirmaydi. Yakuniy stock?

**29.T3 — Debugging**

API har qanday noto‘g‘ri JSONga 500 qaytaradi. Nima noto‘g‘ri? Status va validatsiya strategiyasi?

### B. Amaliy mashqlar

**29.P1 — Level 3**

Flask REST task API: GET/POST `/tasks`, GET/PATCH/DELETE `/tasks/<id>`. Title, done validation; 201 create, 404 missing, 400 invalid, 204 delete. Flask test clientda kamida 10 test.

**29.P2 — Level 4**

Inventory API: products CRUD, qidiruv/filter/page, stock reserve endpoint. SKU unique, price>=0, qty musbat int, stock yetmasa 409. MongoDB test bazasida atomic update; 2 concurrent rezerv testini yoz.

**29.P3 — Level 5**

Batch API. POST `/batch` ga 1–10 ta mustaqil `{id,sku,qty}` request keladi; har biriga indexed result, bitta invalid item qolganlarini to‘xtatmasin. Takroriy id butun batch uchun 400; valid batchda 200 va individual statuslar. Bir mahsulot rezervlarini input tartibida bajar; concurrency bonus uchun turli SKUlarni parallel ishlatib ko‘r, natijalar input tartibida qolsin.


---

## Day 30 — Conclusions — yakuniy integratsiya

### A. Testlar

**30.T1 — Nazariya**

Katta datasetni fayldan qayta ishlashda eng asosli yo‘l qaysi? A) hammasini har doim RAMga yuklash B) kerak bo‘lsa satr/chunk bo‘yicha ishlash C) exceptionni yashirish D) faqat global o‘zgaruvchi

**30.T2 — Output Prediction**

Natijani top:
```python
orders = [{'qty':2,'price':10,'status':'paid'}, {'qty':3,'price':5,'status':'cancelled'}]
print(sum(o['qty']*o['price'] for o in orders if o['status']=='paid'))
```

**30.T3 — Debugging**

Endpoint 200 qaytaradi, lekin noto‘g‘ri total hisoblaydi. Faqat status test yetarlimi? Qanday boshqa testlar kerak?

### B. Amaliy mashqlar

**30.P1 — Level 3**

Mini loyiha A — Legal Document Search. Mahalliy JSONda qonun id/title/text; regex bilan moddalarga ajrat, normalizatsiya, query so‘zlari bilan oddiy lexical score (kesishma yoki chastota), top-5 natija, manba id/modda. Teng score: id, modda tartibi. 20 ta sun'iy fixture va 10 test; natija topilmasa bo‘sh list. Flask API bonus. Bu RAG emas, uning retrieval asoslarini mashq qilish.

**30.P2 — Level 4**

Mini loyiha B — PC Inventory & Orders. Mahsulotlar va order MongoDB yoki JSON test storage; SKU CRUD, atomic yoki bir jarayonli xavfsiz rezerv, discount/tax, paid/cancel status, kunlik hisobot CSV. Flask API, unit/integration testlar; paytda stock manfiy bo‘lmasin. READMEda arxitektura va xato holatlari.

**30.P3 — Level 5**

Mini loyiha C — Data Quality Pipeline. Ruxsat etilgan API yoki offline fixture → extract → validate/normalize → duplicate idlarni tozalash → JSON/CSV → Pandas statistik hisobot → Flask summary API. Buzilgan yozuvlar alohida log; qayta run duplicate yaratmasin. Kamida 20 fixture, 5 invalid, 15 test; timeout va bo‘sh dataset sinovi. Faqat repo mavzulari, ML yoki tashqi orchestrator shart emas.

