# 🐍 Python Developer — 20 Phase, mikro-darsli o‘quv xaritasi

> **Holat:** curriculum reja. Barcha mikro-darslar tayyor dars emas. Material faqat foydalanuvchi yuborgan Python Developer roadmap asosida bo‘lingan.

**Bosqichlar:** 20  •  **Mikro-dars tugunlari:** 344  •  **Mavjud darsga moslash uchun NOMZOD havolalar:** 29  •  **Yangi reja tugunlari:** 315

## O‘qitish prinsiplar

1. Bitta mikro-dars bitta kichik tushuncha yoki amalni o‘rgatadi.
2. Har mavzu uchun Overview (oddiy), Understand (vizual, qadamma-qadam), Master (kod, test, loyiha) darajasi mavjud; kontent faqat yozilib tekshirilgach ochiladi.
3. Har dars: oddiy analogiya → input/output → qisqa kod → real bosqichli simulyatsiya → xatolar → mini mashq.
4. `Tushunmadim` tugmasi prerequisite ga olib boradi va qaytish yo‘lini saqlaydi.
5. Python Developer uchun Core bo‘lgan bilim boshqa AI/ML/DS yo‘llari uchun shared prerequisites sifatida ko‘rsatiladi; dars IDlar takrorlanmaydi.

## 20 phase — tez ko‘rish

| Phase | Modul | Mikrodarslar | Nazorat ishi |
|---|---|---:|---|
| 01 | Python muhiti va ilk dastur | 12 | Birinchi Python CLI — input → output |
| 02 | O‘zgaruvchilar va sodda turlar | 16 | Kalkulyator: ism, yosh va qiymatlar |
| 03 | Operatorlar va ifodalar | 14 | Chegirma va QQS kalkulyatori |
| 04 | Shart operatorlari va sikllar | 16 | Mini viktorina CLI |
| 05 | List, Tuple, Set va Dictionary | 19 | Telefon kontaktlar CLI |
| 06 | Funksiyalar, scope va exceptions | 20 | Funksiyali CLI calculator |
| 07 | Fayllar va modullar | 17 | CSV/JSONdan hisobot yaratuvchi CLI |
| 08 | Big-O, array va linked list | 17 | LinkedList append/search CLI |
| 09 | Stack, Queue va Heap | 14 | Browser History + task queue |
| 10 | HashMap, daraxtlar va algoritmlar | 20 | Qidiruv va sorting benchmark CLI |
| 11 | OOP asoslari | 15 | Student/course tracker OOP |
| 12 | OOP advanced: inheritance, polymorphism | 17 | Payment provider abstraction |
| 13 | Comprehensions, iterator va generator | 15 | Million yozuvni streaming qayta ishlash |
| 14 | Decorator, regex va context manager | 17 | Decoratorli logging / fayl filtratori |
| 15 | Python muhitlari va paketlash | 18 | pyproject.toml bilan CLI paket |
| 16 | HTTP va Python web frameworklari | 21 | REST API: notes / todos |
| 17 | Concurrency: Thread, Process va Async | 21 | Parallel I/O downloader + CPU benchmark |
| 18 | Static typing va data validation | 16 | Pydantic schema bilan API input |
| 19 | Testing, linting va hujjat | 18 | Testlangan, hujjatlangan kutubxona |
| 20 | Production Python capstone | 21 | To‘liq FastAPI + CLI + tests + docs loyiha |

## Har bir phase va mikro-darslar

### Phase 01: Python muhiti va ilk dastur

**Manba bo‘limi:** 1. Learn the Basics

**Vizual lab g‘oyasi:** Python interpretatori, terminal va kodni bajarish (hali faqat reja)

**Mini-loyiha:** Birinchi Python CLI — input → output

- [ ] `py-01-01` — Python nima va qaysi vazifalarda ishlatiladi?
- [ ] `py-01-02` — Interpreter va .py fayli nima?
- [ ] `py-01-03` — Python versiyasini tekshirish
- [ ] `py-01-04` — Terminal va shell nima?
- [ ] `py-01-05` — REPL va .py skript farqi
- [ ] `py-01-06` — Python faylini ishga tushirish
- [ ] `py-01-07` — print() bilan natija chiqarish
- [ ] `py-01-08` — input() orqali foydalanuvchi ma’lumotini olish
- [ ] `py-01-09` — Indentation nima?
- [ ] `py-01-10` — SyntaxError bilan tanishish
- [ ] `py-01-11` — Comment yozish (#)
- [ ] `py-01-12` — Kichik Hello World CLI ni yig‘ish

### Phase 02: O‘zgaruvchilar va sodda turlar

**Manba bo‘limi:** 1. Learn the Basics

**Vizual lab g‘oyasi:** Variable qiymatlarining vaqt bo‘yicha o‘zgarishi (hali faqat reja)

**Mini-loyiha:** Kalkulyator: ism, yosh va qiymatlar

- [ ] `py-02-01` — Variable va assignment nima?  *(existing candidate: `mlds-02-02`, review required)*
- [ ] `py-02-02` — O‘zgaruvchiga nom berish qoidalari
- [ ] `py-02-03` — int turi nima?  *(existing candidate: `mlds-02-03`, review required)*
- [ ] `py-02-04` — float turi nima?  *(existing candidate: `mlds-02-03`, review required)*
- [ ] `py-02-05` — bool turi nima?  *(existing candidate: `mlds-02-03`, review required)*
- [ ] `py-02-06` — str turi nima?  *(existing candidate: `mlds-02-03`, review required)*
- [ ] `py-02-07` — None va NoneType
- [ ] `py-02-08` — type() va isinstance() farqi
- [ ] `py-02-09` — Bir qatorda assignment
- [ ] `py-02-10` — O‘zgaruvchi qiymatini yangilash
- [ ] `py-02-11` — String concatenation
- [ ] `py-02-12` — f-string orqali formatlash
- [ ] `py-02-13` — str metodlari bilan ishlash
- [ ] `py-02-14` — Index va slice
- [ ] `py-02-15` — int(), float(), str() casting
- [ ] `py-02-16` — Noto‘g‘ri casting va ValueError

### Phase 03: Operatorlar va ifodalar

**Manba bo‘limi:** 1. Learn the Basics

**Vizual lab g‘oyasi:** Operatorlar ketma-ketligi va ifodalar jadvali (hali faqat reja)

**Mini-loyiha:** Chegirma va QQS kalkulyatori

- [ ] `py-03-01` — Qo‘shish va ayirish operatorlari
- [ ] `py-03-02` — Ko‘paytirish va oddiy bo‘lish
- [ ] `py-03-03` — Butun bo‘lish //
- [ ] `py-03-04` — Qoldiq olish %
- [ ] `py-03-05` — Daraja operatori **
- [ ] `py-03-06` — Taqqoslash operatorlari == va !=
- [ ] `py-03-07` — > va < taqqoslashlari
- [ ] `py-03-08` — and, or, not operatorlari
- [ ] `py-03-09` — Operator precedence
- [ ] `py-03-10` — Qavs bilan bajarilish tartibi
- [ ] `py-03-11` — Truthiness nima?
- [ ] `py-03-12` — in va not in operatorlari
- [ ] `py-03-13` — is va == farqi
- [ ] `py-03-14` — Floating-point aniqlik cheklovi

### Phase 04: Shart operatorlari va sikllar

**Manba bo‘limi:** 1. Learn the Basics

**Vizual lab g‘oyasi:** Flowchart: if → elif → else va loop iteration (hali faqat reja)

**Mini-loyiha:** Mini viktorina CLI

- [ ] `py-04-01` — if qachon ishlaydi?  *(existing candidate: `mlds-02-07`, review required)*
- [ ] `py-04-02` — else orqali alternativ yo‘l  *(existing candidate: `mlds-02-07`, review required)*
- [ ] `py-04-03` — elif yordamida bir nechta holat
- [ ] `py-04-04` — Nested if va indentatsiya
- [ ] `py-04-05` — match-case qayerda qulay?
- [ ] `py-04-06` — for loop nimani takrorlaydi?  *(existing candidate: `mlds-02-08`, review required)*
- [ ] `py-04-07` — range() bilan ketma-ketlik  *(existing candidate: `mlds-02-09`, review required)*
- [ ] `py-04-08` — while loop va condition  *(existing candidate: `mlds-02-08`, review required)*
- [ ] `py-04-09` — break operatori
- [ ] `py-04-10` — continue operatori
- [ ] `py-04-11` — Loop bilan list elementlarini ko‘rish
- [ ] `py-04-12` — enumerate() qanday ishlaydi?  *(existing candidate: `mlds-02-09`, review required)*
- [ ] `py-04-13` — zip() orqali parallel yurish
- [ ] `py-04-14` — Cheksiz siklni aniqlash
- [ ] `py-04-15` — Loop xatolarini debug qilish
- [ ] `py-04-16` — Mini viktorina natijasini hisoblash

### Phase 05: List, Tuple, Set va Dictionary

**Manba bo‘limi:** 1. Learn the Basics

**Vizual lab g‘oyasi:** Mutable va immutable kolleksiyalar; indekslash (hali faqat reja)

**Mini-loyiha:** Telefon kontaktlar CLI

- [ ] `py-05-01` — List yaratish  *(existing candidate: `mlds-02-04`, review required)*
- [ ] `py-05-02` — List indexing va negative index  *(existing candidate: `mlds-02-04`, review required)*
- [ ] `py-05-03` — List slicing
- [ ] `py-05-04` — append, extend va insert
- [ ] `py-05-05` — remove, pop va del
- [ ] `py-05-06` — List sort va sorted farqi
- [ ] `py-05-07` — Tuple nima va nima uchun kerak?  *(existing candidate: `mlds-02-05`, review required)*
- [ ] `py-05-08` — Tuple unpacking
- [ ] `py-05-09` — Set va unique values  *(existing candidate: `mlds-02-05`, review required)*
- [ ] `py-05-10` — Set union/intersection/difference
- [ ] `py-05-11` — Dict: key/value juftligi  *(existing candidate: `mlds-02-06`, review required)*
- [ ] `py-05-12` — Dictga qiymat qo‘shish va yangilash
- [ ] `py-05-13` — Dict orqali qidirish
- [ ] `py-05-14` — get() va KeyError
- [ ] `py-05-15` — Dict items(), keys(), values()
- [ ] `py-05-16` — Nested collections
- [ ] `py-05-17` — Mutable va immutable farqi
- [ ] `py-05-18` — Reference va shallow copy tushunchasi
- [ ] `py-05-19` — Kolleksiya tanlash trade-off

### Phase 06: Funksiyalar, scope va exceptions

**Manba bo‘limi:** 1. Learn the Basics

**Vizual lab g‘oyasi:** Function call stack + scope diagram (hali faqat reja)

**Mini-loyiha:** Funksiyali CLI calculator

- [ ] `py-06-01` — def bilan funksiya yaratish  *(existing candidate: `mlds-02-10`, review required)*
- [ ] `py-06-02` — Parametr va argument farqi  *(existing candidate: `mlds-02-10`, review required)*
- [ ] `py-06-03` — return nima qiladi?  *(existing candidate: `mlds-02-10`, review required)*
- [ ] `py-06-04` — None qaytarish
- [ ] `py-06-05` — Positional argument
- [ ] `py-06-06` — Keyword argument
- [ ] `py-06-07` — Default parametr va mutable default ehtiyoti
- [ ] `py-06-08` — *args va **kwargs kirish
- [ ] `py-06-09` — Multiple return va tuple unpacking
- [ ] `py-06-10` — Local variable  *(existing candidate: `mlds-02-11`, review required)*
- [ ] `py-06-11` — Global variable tushunchasi
- [ ] `py-06-12` — nonlocal scope tushunchasi
- [ ] `py-06-13` — LEGB qidiruv tartibi
- [ ] `py-06-14` — Built-in min, max, sum, len
- [ ] `py-06-15` — Exception nima?
- [ ] `py-06-16` — try va except
- [ ] `py-06-17` — Aniq exception turini ushlash
- [ ] `py-06-18` — else va finally bloklari
- [ ] `py-06-19` — raise orqali xato chiqarish
- [ ] `py-06-20` — Xatoni yashirmasdan qayta ishlash

### Phase 07: Fayllar va modullar

**Manba bo‘limi:** 4. Advanced Topics

**Vizual lab g‘oyasi:** File read/write stream va import graph (hali faqat reja)

**Mini-loyiha:** CSV/JSONdan hisobot yaratuvchi CLI

- [ ] `py-07-01` — Path va fayl manzili
- [ ] `py-07-02` — open() bilan matn o‘qish
- [ ] `py-07-03` — with context manager asoslari
- [ ] `py-07-04` — Faylga write va append
- [ ] `py-07-05` — UTF-8 encoding
- [ ] `py-07-06` — JSON o‘qish va yozish
- [ ] `py-07-07` — CSV matn formati bilan tanishish
- [ ] `py-07-08` — pathlib.Path bilan fayllar
- [ ] `py-07-09` — glob pattern bilan qidirish
- [ ] `py-07-10` — Module va import  *(existing candidate: `mlds-02-16`, review required)*
- [ ] `py-07-11` — from ... import ...
- [ ] `py-07-12` — __name__ == "__main__"
- [ ] `py-07-13` — Standard library nima?
- [ ] `py-07-14` — Custom module yaratish
- [ ] `py-07-15` — Package va __init__.py tushunchasi
- [ ] `py-07-16` — Relative/absolute imports
- [ ] `py-07-17` — Import side effect tushunchasi

### Phase 08: Big-O, array va linked list

**Manba bo‘limi:** 2. Data Structures and Algorithms

**Vizual lab g‘oyasi:** Big-O taqqoslash va pointer diagram (hali faqat reja)

**Mini-loyiha:** LinkedList append/search CLI

- [ ] `py-08-01` — DSA nima va qachon kerak?
- [ ] `py-08-02` — Time complexity nima?  *(existing candidate: `mlds-03-02`, review required)*
- [ ] `py-08-03` — Space complexity nima?
- [ ] `py-08-04` — O(1) intuitiv
- [ ] `py-08-05` — O(n) intuitiv
- [ ] `py-08-06` — O(log n) intuitiv
- [ ] `py-08-07` — O(n²) intuitiv
- [ ] `py-08-08` — Best, average va worst case
- [ ] `py-08-09` — Python list asosida dynamic array
- [ ] `py-08-10` — Array indekslash va append
- [ ] `py-08-11` — List insert/delete xarajati
- [ ] `py-08-12` — Node va next pointer
- [ ] `py-08-13` — Singly Linked List yaratish
- [ ] `py-08-14` — LinkedList traverse
- [ ] `py-08-15` — LinkedList append va prepend
- [ ] `py-08-16` — LinkedList qidirish
- [ ] `py-08-17` — Array vs LinkedList taqqoslash

### Phase 09: Stack, Queue va Heap

**Manba bo‘limi:** 2. Data Structures and Algorithms

**Vizual lab g‘oyasi:** Stack push/pop, FIFO queue va heap prioritet animatsiyasi (hali faqat reja)

**Mini-loyiha:** Browser History + task queue

- [ ] `py-09-01` — Stack LIFO nima?  *(existing candidate: `mlds-03-01`, review required)*
- [ ] `py-09-02` — push va pop operatsiyalari
- [ ] `py-09-03` — Stack bilan browser history
- [ ] `py-09-04` — Qavs balansini Stack orqali tekshirish
- [ ] `py-09-05` — Queue FIFO nima?  *(existing candidate: `mlds-03-01`, review required)*
- [ ] `py-09-06` — enqueue va dequeue
- [ ] `py-09-07` — deque nima uchun kerak?
- [ ] `py-09-08` — Queue orqali ishlar navbati
- [ ] `py-09-09` — Priority queue tushunchasi
- [ ] `py-09-10` — Heap strukturasi nima?
- [ ] `py-09-11` — Min-heap va max-heap
- [ ] `py-09-12` — heapq bilan push/pop
- [ ] `py-09-13` — Stack va Queue trade-off
- [ ] `py-09-14` — Amaliy navbat simulyatsiyasi

### Phase 10: HashMap, daraxtlar va algoritmlar

**Manba bo‘limi:** 2. Data Structures and Algorithms

**Vizual lab g‘oyasi:** Hash collision, BST traversal va sorting frame stepper (hali faqat reja)

**Mini-loyiha:** Qidiruv va sorting benchmark CLI

- [ ] `py-10-01` — Hash nima?
- [ ] `py-10-02` — HashMap va dictionary bog‘liqligi
- [ ] `py-10-03` — Hash collision tushunchasi
- [ ] `py-10-04` — Average va worst-case lookup
- [ ] `py-10-05` — Binary tree node nima?
- [ ] `py-10-06` — BST va tartib qoidasi
- [ ] `py-10-07` — BST insert
- [ ] `py-10-08` — BST search
- [ ] `py-10-09` — BST inorder traversal
- [ ] `py-10-10` — Recursion nima?
- [ ] `py-10-11` — Base case va recursive case
- [ ] `py-10-12` — Call stack qanday o‘sadi?
- [ ] `py-10-13` — Binary Search sharti  *(existing candidate: `mlds-03-03`, review required)*
- [ ] `py-10-14` — Binary Search step-by-step
- [ ] `py-10-15` — Linear Search  *(existing candidate: `mlds-03-03`, review required)*
- [ ] `py-10-16` — Bubble Sort intuitiv
- [ ] `py-10-17` — Merge Sort va divide-and-conquer
- [ ] `py-10-18` — Quick Sort pivot tushunchasi
- [ ] `py-10-19` — Sorting stable va unstable tushunchasi
- [ ] `py-10-20` — Algorithm complexity comparison

### Phase 11: OOP asoslari

**Manba bo‘limi:** 3. Object-Oriented Programming

**Vizual lab g‘oyasi:** Class → Object diagram va instance state (hali faqat reja)

**Mini-loyiha:** Student/course tracker OOP

- [ ] `py-11-01` — OOP nima va nega kerak?  *(existing candidate: `mlds-02-17`, review required)*
- [ ] `py-11-02` — Class e’lon qilish  *(existing candidate: `mlds-02-17`, review required)*
- [ ] `py-11-03` — Object / instance yaratish
- [ ] `py-11-04` — __init__ konstruktori
- [ ] `py-11-05` — self nimani bildiradi?
- [ ] `py-11-06` — Instance attributes
- [ ] `py-11-07` — Instance methods
- [ ] `py-11-08` — Class attributes
- [ ] `py-11-09` — @classmethod nima?
- [ ] `py-11-10` — @staticmethod nima?
- [ ] `py-11-11` — __str__ bilan o‘qiladigan matn
- [ ] `py-11-12` — __repr__ bilan developer ko‘rinishi
- [ ] `py-11-13` — Composition nima?
- [ ] `py-11-14` — OOP va oddiy function trade-off
- [ ] `py-11-15` — Kichik Student class loyiha

### Phase 12: OOP advanced: inheritance, polymorphism

**Manba bo‘limi:** 3. Object-Oriented Programming

**Vizual lab g‘oyasi:** Inheritance tree va method resolution path (hali faqat reja)

**Mini-loyiha:** Payment provider abstraction

- [ ] `py-12-01` — Inheritance tushunchasi
- [ ] `py-12-02` — Parent va child class
- [ ] `py-12-03` — super() bilan ota metod
- [ ] `py-12-04` — Method overriding
- [ ] `py-12-05` — Polymorphism nima?
- [ ] `py-12-06` — Duck typing tushunchasi
- [ ] `py-12-07` — Encapsulation amaliy qoida
- [ ] `py-12-08` — Public va underscore convention
- [ ] `py-12-09` — Name mangling nima emas?
- [ ] `py-12-10` — Properties @property
- [ ] `py-12-11` — Getter va setterlar
- [ ] `py-12-12` — Abstract interface tushunchasi
- [ ] `py-12-13` — Multiple inheritance haqida kirish
- [ ] `py-12-14` — Dunder __eq__ va __len__
- [ ] `py-12-15` — Dunder __iter__ ga kirish
- [ ] `py-12-16` — Inheritance vs composition
- [ ] `py-12-17` — OOP dizaynidagi xatolar

### Phase 13: Comprehensions, iterator va generator

**Manba bo‘limi:** 4. Advanced Topics

**Vizual lab g‘oyasi:** Eager list vs lazy generator memory-flow (hali faqat reja)

**Mini-loyiha:** Million yozuvni streaming qayta ishlash

- [ ] `py-13-01` — List comprehension sintaksisi
- [ ] `py-13-02` — List comprehension shart bilan
- [ ] `py-13-03` — Nested comprehension qanday o‘qiladi?
- [ ] `py-13-04` — Dict comprehension
- [ ] `py-13-05` — Set comprehension
- [ ] `py-13-06` — Iterable va iterator farqi
- [ ] `py-13-07` — iter() va next()
- [ ] `py-13-08` — StopIteration
- [ ] `py-13-09` — Generator function va yield
- [ ] `py-13-10` — Generator expression
- [ ] `py-13-11` — Lazy evaluation
- [ ] `py-13-12` — Generator bilan xotira foydalanish
- [ ] `py-13-13` — yield from tushunchasi
- [ ] `py-13-14` — range obyektining xususiyatlari
- [ ] `py-13-15` — Iteratorni qayta ishlatish cheklovi

### Phase 14: Decorator, regex va context manager

**Manba bo‘limi:** 4. Advanced Topics

**Vizual lab g‘oyasi:** Decorator wrapping flow va regex matching (hali faqat reja)

**Mini-loyiha:** Decoratorli logging / fayl filtratori

- [ ] `py-14-01` — Lambda expression nima?
- [ ] `py-14-02` — map/filter va comprehension tanlovi
- [ ] `py-14-03` — Higher-order function
- [ ] `py-14-04` — First-class function tushunchasi
- [ ] `py-14-05` — Closure nima?
- [ ] `py-14-06` — Decorator nima?
- [ ] `py-14-07` — @wrapper va functools.wraps
- [ ] `py-14-08` — Argumentli decorator asoslari
- [ ] `py-14-09` — Regex literal va metabelgilar
- [ ] `py-14-10` — re.search vs re.match
- [ ] `py-14-11` — re.findall va re.sub
- [ ] `py-14-12` — Greedy va non-greedy
- [ ] `py-14-13` — Context manager nima?
- [ ] `py-14-14` — with blokining hayot sikli
- [ ] `py-14-15` — Custom context manager (__enter__/__exit__)
- [ ] `py-14-16` — contextlib.contextmanager
- [ ] `py-14-17` — Procedural, functional va OOP yondashuvlari

### Phase 15: Python muhitlari va paketlash

**Manba bo‘limi:** 5. Package Managers, Configuration & Environments

**Vizual lab g‘oyasi:** Dependency graph va isolated venv model (hali faqat reja)

**Mini-loyiha:** pyproject.toml bilan CLI paket

- [ ] `py-15-01` — PyPI nima?
- [ ] `py-15-02` — pip install / uninstall
- [ ] `py-15-03` — pip freeze qachon kerak?
- [ ] `py-15-04` — venv yaratish  *(existing candidate: `mlds-02-18`, review required)*
- [ ] `py-15-05` — Virtual muhitni faollashtirish
- [ ] `py-15-06` — Virtual environment nega kerak?
- [ ] `py-15-07` — requirements.txt
- [ ] `py-15-08` — pyproject.toml nima?
- [ ] `py-15-09` — Dependency versions va lockfiles
- [ ] `py-15-10` — uv package manager asoslari
- [ ] `py-15-11` — Poetry haqida tushuncha
- [ ] `py-15-12` — Conda nima va qachon kerak?
- [ ] `py-15-13` — pdm tushunchasi
- [ ] `py-15-14` — pyenv Python versiyalari
- [ ] `py-15-15` — pipx CLI vositalar uchun
- [ ] `py-15-16` — Package vs application
- [ ] `py-15-17` — Build va wheel tushunchasi
- [ ] `py-15-18` — Reproducible environment qoidalari

### Phase 16: HTTP va Python web frameworklari

**Manba bo‘limi:** 6. Learn a Framework

**Vizual lab g‘oyasi:** Request → routing → handler → response diagram (hali faqat reja)

**Mini-loyiha:** REST API: notes / todos

- [ ] `py-16-01` — Web server nima?
- [ ] `py-16-02` — HTTP request va response
- [ ] `py-16-03` — GET va POST farqi
- [ ] `py-16-04` — Status codes 2xx/4xx/5xx
- [ ] `py-16-05` — JSON API body
- [ ] `py-16-06` — REST API nimani anglatadi?
- [ ] `py-16-07` — Flask minimal route
- [ ] `py-16-08` — FastAPI minimal endpoint
- [ ] `py-16-09` — Django loyiha va app tushunchasi
- [ ] `py-16-10` — FastAPI vs Flask vs Django trade-off
- [ ] `py-16-11` — Route parameters
- [ ] `py-16-12` — Query parameters
- [ ] `py-16-13` — Request body
- [ ] `py-16-14` — Response model
- [ ] `py-16-15` — Pydantic validation asoslari
- [ ] `py-16-16` — API errors va HTTPException
- [ ] `py-16-17` — OpenAPI va Swagger UI
- [ ] `py-16-18` — ASGI va WSGI boshlang‘ich farqi
- [ ] `py-16-19` — Plotly Dash qayerda ishlatiladi?
- [ ] `py-16-20` — Pyramid, aiohttp, Tornado, Sanic, gevent overview
- [ ] `py-16-21` — Lokal REST API tekshirish

### Phase 17: Concurrency: Thread, Process va Async

**Manba bo‘limi:** 7. Concurrency

**Vizual lab g‘oyasi:** Timeline: sequential vs thread vs process vs asyncio (hali faqat reja)

**Mini-loyiha:** Parallel I/O downloader + CPU benchmark

- [ ] `py-17-01` — Concurrency va parallelism farqi
- [ ] `py-17-02` — I/O-bound va CPU-bound farqi
- [ ] `py-17-03` — CPython GIL haqida asosiy tushuncha
- [ ] `py-17-04` — GIL CPython versiyasiga bog‘liqligi
- [ ] `py-17-05` — threading.Thread
- [ ] `py-17-06` — Thread shared state
- [ ] `py-17-07` — Race condition va Lock
- [ ] `py-17-08` — multiprocessing.Process
- [ ] `py-17-09` — Process memory isolation
- [ ] `py-17-10` — ProcessPoolExecutor
- [ ] `py-17-11` — ThreadPoolExecutor
- [ ] `py-17-12` — async def va await
- [ ] `py-17-13` — Coroutine nima?
- [ ] `py-17-14` — asyncio event loop
- [ ] `py-17-15` — asyncio.create_task va gather
- [ ] `py-17-16` — Task cancellation
- [ ] `py-17-17` — Timeout qo‘llash
- [ ] `py-17-18` — Blocking call ichida async muammosi
- [ ] `py-17-19` — aiohttp haqida tushuncha
- [ ] `py-17-20` — Thread vs process vs asyncio tanlovi
- [ ] `py-17-21` — Oddiy I/O va CPU benchmark

### Phase 18: Static typing va data validation

**Manba bo‘limi:** 8. Static Typing, Code Formatting, Documentation & Testing

**Vizual lab g‘oyasi:** Type annotation → type checker → runtime validation (hali faqat reja)

**Mini-loyiha:** Pydantic schema bilan API input

- [ ] `py-18-01` — Dynamic typing va annotation farqi
- [ ] `py-18-02` — Type hint nima?
- [ ] `py-18-03` — list[str] va dict[str,int]
- [ ] `py-18-04` — Optional / None typing
- [ ] `py-18-05` — Union types
- [ ] `py-18-06` — Callable type hint
- [ ] `py-18-07` — TypedDict nima?
- [ ] `py-18-08` — Protocol tushunchasi
- [ ] `py-18-09` — Generic type tushunchasi
- [ ] `py-18-10` — mypy statik tekshirish
- [ ] `py-18-11` — pyright statik tekshirish
- [ ] `py-18-12` — pyre overview
- [ ] `py-18-13` — Pydantic BaseModel
- [ ] `py-18-14` — Pydantic Field va validation
- [ ] `py-18-15` — Type checking runtime kafolati emas
- [ ] `py-18-16` — Input validation uchun test

### Phase 19: Testing, linting va hujjat

**Manba bo‘limi:** 8. Static Typing, Code Formatting, Documentation & Testing

**Vizual lab g‘oyasi:** Red-green-refactor va test coverage flow (hali faqat reja)

**Mini-loyiha:** Testlangan, hujjatlangan kutubxona

- [ ] `py-19-01` — PEP 8 nima?
- [ ] `py-19-02` — ruff lint va format
- [ ] `py-19-03` — Black formatter
- [ ] `py-19-04` — pylint / yapf overview
- [ ] `py-19-05` — Unit test tushunchasi
- [ ] `py-19-06` — unittest bilan birinchi test
- [ ] `py-19-07` — pytest bilan birinchi test
- [ ] `py-19-08` — Test fixtures
- [ ] `py-19-09` — Parametrized tests
- [ ] `py-19-10` — Mocking tashqi xizmatlar
- [ ] `py-19-11` — Exception testlash
- [ ] `py-19-12` — doctest nima?
- [ ] `py-19-13` — tox muhitlar bo‘yicha testlash
- [ ] `py-19-14` — Sphinx dokumentatsiya
- [ ] `py-19-15` — Docstring yozish
- [ ] `py-19-16` — README va API qo‘llanma
- [ ] `py-19-17` — GitHub Actions test workflow kirish
- [ ] `py-19-18` — Coverage va false confidence

### Phase 20: Production Python capstone

**Manba bo‘limi:** 1–8 + Python Xaritasini Amaliy O‘zlashtirish Bosqichlari

**Vizual lab g‘oyasi:** CLI → API → validation → test → deployment workflow (hali faqat reja)

**Mini-loyiha:** To‘liq FastAPI + CLI + tests + docs loyiha

- [ ] `py-20-01` — Texnik talablar va loyiha scope
- [ ] `py-20-02` — Papka va package arxitekturasi
- [ ] `py-20-03` — venv/uv bilan muhit yaratish
- [ ] `py-20-04` — Data model va API schema
- [ ] `py-20-05` — FastAPI CRUD endpointlar
- [ ] `py-20-06` — Exception handling strategiyasi
- [ ] `py-20-07` — Fayl saqlash yoki kichik DB integratsiya
- [ ] `py-20-08` — Async I/O qarori
- [ ] `py-20-09` — Type checking va validation
- [ ] `py-20-10` — pytest testlarini yozish
- [ ] `py-20-11` — Lint/format pipeline
- [ ] `py-20-12` — API dokumentatsiya
- [ ] `py-20-13` — Environment variables
- [ ] `py-20-14` — Secrets hardcode qilmaslik
- [ ] `py-20-15` — Logging asoslari
- [ ] `py-20-16` — Docker overview (extension)
- [ ] `py-20-17` — CI sinovi
- [ ] `py-20-18` — Manual acceptance criteria
- [ ] `py-20-19` — Load test kirish (extension)
- [ ] `py-20-20` — Release checklist
- [ ] `py-20-21` — Portfolio README va demo

## Source → phase xaritasi

| Asl roadmap bo‘limi | Yangi phase |
|---|---|
| Learn the Basics | 01–06 (va fayl/module qismi 07) |
| DSA | 08–10 |
| OOP | 11–12 |
| Advanced Topics | 07, 13–14 |
| Package Managers & Environments | 15 |
| Learn a Framework | 16 |
| Concurrency | 17 |
| Static Typing, Formatting, Docs & Testing | 18–19 |
| 5 bosqichli practical sequence | 20 phase bo‘ylab mini-loyihalar + capstone |

## Manba va tekshiruvlar

Foydalanuvchi roadmap matnida rasmiy Python Tutorial, Real Python, Google’s Python Class, `roadmap.sh`, FastAPI docs, Flask Docs, Black, PyPI, PyPA va boshqa **nomlangan resurslar** ko‘rsatilgan. Ularning havolalari bu paketda to‘qib chiqarilmagan yoki mustaqil tasdiqlanmagan.
