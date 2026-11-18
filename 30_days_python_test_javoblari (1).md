# 30 Days of Python — test javoblari

90 test uchun javoblar. Avval mustaqil yech, keyin tekshir. Amaliy mashqlarning tayyor kodi bu faylda yo‘q.

## Day 01 — Introduction — Python asoslari

- **01.T1:** B — float, int.
- **01.T2:** `2 3 512`.
- **01.T3:** TypeError; `print("Jami:", 12)` yoki `str(12)`.

## Day 02 — Variables, Built-in Functions

- **02.T1:** C.
- **02.T2:** `9 21 12`.
- **02.T3:** `input` str qaytaradi; `int(age) + 5`.

## Day 03 — Operators

- **03.T1:** B.
- **03.T2:** `-4 3 True`.
- **03.T3:** `or` bu yerda hamma yoshni qabul qiladi; `18 <= age <= 25` yoki `and`.

## Day 04 — Strings

- **04.T1:** B — `yh`.
- **04.T2:** `nhy`.
- **04.T3:** String immutable; `s = "b" + s[1:]`.

## Day 05 — Lists

- **05.T1:** B.
- **05.T2:** `[1, 2, 3, 4] [9, 2, 3]`.
- **05.T3:** `sort()` None qaytaradi. `a.sort(); print(a[0])` yoki `a = sorted(a)`.

## Day 06 — Tuples

- **06.T1:** C.
- **06.T2:** `(1, [2, 3, 4])` — ichki list mutable.
- **06.T3:** ValueError; `a, *b = (1, 2, 3)`.

## Day 07 — Sets

- **07.T1:** C.
- **07.T2:** `5 2 3`.
- **07.T3:** List hashable emas; `s.add((1, 2))`.

## Day 08 — Dictionaries

- **08.T1:** B.
- **08.T2:** `{'a': 6, 'c': 3}`.
- **08.T3:** List hashable emas; `{(1, 2): "x"}`.

## Day 09 — Conditionals

- **09.T1:** B.
- **09.T2:** Ikki qator: A, B.
- **09.T3:** 90+ birinchi shartga ham tushadi; yuqori chegarani birinchi tekshir.

## Day 10 — Loops

- **10.T1:** A.
- **10.T2:** `12 5`.
- **10.T3:** i=2 da cheksiz sikl; `continue` dan oldin i ni oshir yoki shartni qayta tuz.

## Day 11 — Functions

- **11.T1:** A.
- **11.T2:** `[1] [1, 2] [3]` — default list chaqiruvlar orasida saqlanadi.
- **11.T3:** `print` o‘rniga `return`; bo‘sh list uchun oldindan kelishilgan None yoki ValueError.

## Day 12 — Modules

- **12.T1:** B.
- **12.T2:** `-3 -2 9`.
- **12.T3:** `math.sqrt(16)` yoki `from math import sqrt`.

## Day 13 — List Comprehension

- **13.T1:** A.
- **13.T2:** `[(1, 0), (2, 0), (2, 1)]`.
- **13.T3:** `[x for x in nums if x > 0]`; `[x if x > 0 else 0 for x in nums]`.

## Day 14 — Higher Order Functions

- **14.T1:** B.
- **14.T2:** `20`.
- **14.T3:** `[lambda i=i: i for i in range(3)]` — default argument orqali.

## Day 15 — Python Type Errors

- **15.T1:** B.
- **15.T2:** ValueError, KeyError, ZeroDivisionError, NameError, TypeError.
- **15.T3:** TypeError (None + int); `prices.get('b', 0)+5`.

## Day 16 — Python DateTime

- **16.T1:** C.
- **16.T2:** `2024-03-01`.
- **16.T3:** ValueError; `%d/%m/%Y`. `datetime` classi import qilingan bo‘lishi kerak.

## Day 17 — Exception Handling

- **17.T1:** C — odatiy try/except oqimida.
- **17.T2:** Ikki qator: A, C.
- **17.T3:** Umumiy handler ValueErrorni avval ushlab qoladi; maxsus exception birinchi bo‘lishi kerak.

## Day 18 — Regular Expressions

- **18.T1:** B.
- **18.T2:** `['12', '003', '7']`.
- **18.T3:** `.` newline dan boshqa belgiga mos; literal nuqta `r'\.'`.

## Day 19 — File Handling

- **19.T1:** A.
- **19.T2:** `abcde`.
- **19.T3:** `dump` file object kutadi; `with open('out.json','w',encoding='utf-8') as f: json.dump(data,f)`.

## Day 20 — Python Package Manager

- **20.T1:** B.
- **20.T2:** Aynan 2.32.5.
- **20.T3:** Yo‘q, `json` Python standard library tarkibida.

## Day 21 — Classes and Objects

- **21.T1:** B.
- **21.T2:** `[10, 20] [10, 20]` — class attribute umumiy.
- **21.T3:** `def __init__(self, name):` — instance avtomatik uzatiladi.

## Day 22 — Web Scraping

- **22.T1:** B.
- **22.T2:** `['A', 'B']`.
- **22.T3:** `find` None qaytarishi mumkin. Tag mavjudligini tekshir, keyin `get_text()`.

## Day 23 — Virtual Environment

- **23.T1:** B.
- **23.T2:** B. PowerShell siyosati to‘sqinlik qilsa `.venv\Scripts\python.exe` dan bevosita foydalanish mumkin.
- **23.T3:** Terminal/IDEda `sys.executable` va `python -m pip --version` yo‘llarini solishtir, IDE interpreterini venvga yo‘naltir.

## Day 24 — Statistics

- **24.T1:** B.
- **24.T2:** `2.5 2.5 1.25`.
- **24.T3:** Sample stdev uchun kamida 2 qiymat kerak; `pstdev([5])` = 0.

## Day 25 — Pandas

- **25.T1:** A.
- **25.T2:** `{'A': 6, 'B': 9}`.
- **25.T3:** Default yangi DataFrame qaytaradi; `df = df.dropna()` yoki mos holda inplace.

## Day 26 — Python Web

- **26.T1:** A.
- **26.T2:** `Hi Ali` (200, boshqa sozlama bo‘lmasa).
- **26.T3:** `request.form.get('name')` ni olib tekshir; yo‘q/bo‘sh bo‘lsa aniq 400 yoki forma xabari qaytar.

## Day 27 — Python with MongoDB

- **27.T1:** A.
- **27.T2:** 5 (document mos kelgan va update muvaffaqiyatli bo‘lsa).
- **27.T3:** `find_one` None qaytaradi; document None emasligini tekshir.

## Day 28 — API

- **28.T1:** B.
- **28.T2:** `[1]`.
- **28.T3:** Timeout/tarmoq xatosi; HTTP error; JSON parse yoki schema xatosi. Timeout, status tekshiruvi, alohida exception va validation.

## Day 29 — Building API

- **29.T1:** A.
- **29.T2:** 4; ikkinchi request 409.
- **29.T3:** Client xatosi 400 (yoki API shartnomasiga mos 422); JSON sintaksisi, maydon turlari va biznes qoidalari tekshirilsin. 500 kutilmagan server xatosi uchun.

## Day 30 — Conclusions — yakuniy integratsiya

- **30.T1:** B.
- **30.T2:** `20`.
- **30.T3:** Yo‘q. Response body, hisob-kitob, validatsiya, side effect, bo‘sh/chegara holatlar va xatodagi o‘zgarmas state testlari kerak.
