/**
 * 30 Days of Python: 5-Darajali Amaliyot va Testlar Banki
 *
 * Manba: Asabeneh / 30-Days-Of-Python
 * 30 kunlik to'liq testlar (90 ta) va amaliy mashqlar (90 ta), jami 180 topshiriq.
 * Har bir kun maksimal 30 ball (Jami 900 ball).
 */

export interface Python30DayQuiz {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctLetter: string;
  explanation: string;
  points: number;
}

export interface Python30DayPrediction {
  id: string;
  title: string;
  prompt: string;
  code: string;
  expectedOutput: string;
  explanation: string;
  points: number;
}

export interface Python30DayDebugging {
  id: string;
  title: string;
  prompt: string;
  buggyCode: string;
  explanation: string;
  points: number;
}

export interface Python30DayExercise {
  id: string;
  dayNumber: number;
  level: 3 | 4 | 5;
  levelLabel: string;
  title: string;
  description: string;
  points: number;
}

export interface Python30DayData {
  dayNumber: number;
  title: string;
  topic: string;
  group: "1-3" | "4-8" | "9-11" | "12-15" | "16-20" | "21-25" | "26-30";
  groupTitle: string;
  t1: Python30DayQuiz;
  t2: Python30DayPrediction;
  t3: Python30DayDebugging;
  p1: Python30DayExercise;
  p2: Python30DayExercise;
  p3: Python30DayExercise;
}

export const PYTHON_30_DAYS_DATA: Python30DayData[] = [
  {
    "dayNumber": 1,
    "title": "01 — Introduction — Python asoslari",
    "topic": "Introduction — Python asoslari",
    "group": "1-3",
    "groupTitle": "1–3 kunlar: Python asoslari, o‘zgaruvchilar, operatorlar",
    "t1": {
      "id": "01.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`type(5 / 2)` va `type(5 // 2)` natijalari qaysi?",
      "options": [
        "A) int, int",
        "B) float, int",
        "C) int, float",
        "D) float, float"
      ],
      "correctLetter": "B",
      "explanation": "B — float, int.",
      "points": 2
    },
    "t2": {
      "id": "01.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Kodni ishga tushirmasdan natijani top:",
      "code": "print(17 % 5, 17 // 5, 2 ** 3 ** 2)",
      "expectedOutput": "2 3 512",
      "explanation": "`2 3 512`.",
      "points": 2
    },
    "t3": {
      "id": "01.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`print(\"Jami: \" + 12)` nima uchun xato beradi? Tuzat; son matn bilan bir qatorda chiqsin.",
      "buggyCode": "print(\"Jami: \" + 12)",
      "explanation": "TypeError; `print(\"Jami:\", 12)` yoki `str(12)`.",
      "points": 2
    },
    "p1": {
      "id": "01.P1",
      "dayNumber": 1,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Vaqtni ajratish",
      "description": "Vaqtni ajratish. 7384 soniyani soat, daqiqa va soniyaga aylantir. Natija: `2:3:4`. Faqat arifmetik amallar; `if` va sikl yo‘q.",
      "points": 8
    },
    "p2": {
      "id": "01.P2",
      "dayNumber": 1,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Banknot hisoblash",
      "description": "Banknot hisoblash. 287000 so‘mni 100000, 50000, 20000, 10000, 5000, 2000, 1000 nominallarining eng kam soniga ajrat. Har bir nominaldan nechtadan va qoldiqni chiqar. Faqat `//`, `%` va arifmetika. Masalan 17000 → 10000×1, 5000×1, 2000×1.",
      "points": 8
    },
    "p3": {
      "id": "01.P3",
      "dayNumber": 1,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Raqamlar kubi",
      "description": "Raqamlar kubi. 5831 sonining to‘rtta raqamini alohida ajrat, teskari tartibdagi sonni va raqamlar kublari yig‘indisini hisobla. 1200 bilan ham tekshir. Stringga aylantirish va sikl taqiqlanadi.",
      "points": 8
    }
  },
  {
    "dayNumber": 2,
    "title": "02 — Variables, Built-in Functions",
    "topic": "Variables, Built-in Functions",
    "group": "1-3",
    "groupTitle": "1–3 kunlar: Python asoslari, o‘zgaruvchilar, operatorlar",
    "t1": {
      "id": "02.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Qaysi nom Python o‘zgaruvchisi uchun yaroqli?",
      "options": [
        "A) `2price`",
        "B) `class`",
        "C) `total_price`",
        "D) `total-price`"
      ],
      "correctLetter": "C",
      "explanation": "C.",
      "points": 2
    },
    "t2": {
      "id": "02.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "x = 7\nx, y = x + 2, x * 3\nprint(x, y, max(x, y) - min(x, y))",
      "expectedOutput": "9 21 12",
      "explanation": "`9 21 12`.",
      "points": 2
    },
    "t3": {
      "id": "02.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`age = input(\"Yosh: \"); print(age + 5)` kodida nima xato? `20` kiritilsa 25 chiqishi kerak.",
      "buggyCode": "age = input(\"Yosh: \"); print(age + 5)",
      "explanation": "`input` str qaytaradi; `int(age) + 5`.",
      "points": 2
    },
    "p1": {
      "id": "02.P1",
      "dayNumber": 2,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Hisob-kitob",
      "description": "Hisob-kitob. Narx, miqdor, chegirma foizi va QQS foizini input orqali ol. Avval chegirma, keyin QQS qo‘lla va yakuniy summani 2 kasrga yaxlitla. 100000, 2, 10, 12 → 201600.00.",
      "points": 8
    },
    "p2": {
      "id": "02.P2",
      "dayNumber": 2,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Uchta sonning o‘rtadagisini top",
      "description": "Uchta sonning o‘rtadagisini top. `min`, `max` hamda arifmetikadan foydalan; `if`, `sorted` va list ishlatma. 9, 2, 5 → 5; 3, 3, 9 → 3.",
      "points": 8
    },
    "p3": {
      "id": "02.P3",
      "dayNumber": 2,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "To‘g‘ri to‘rtburchaklar",
      "description": "To‘g‘ri to‘rtburchaklar. Ikki to‘rtburchakning bo‘yi va eni inputdan beriladi. Katta yuzani, kichik perimetrni va yuzalar farqini chiqar. O‘zgaruvchilarni aniq nomla. 3×4, 2×8 → 16, 14, 4.",
      "points": 8
    }
  },
  {
    "dayNumber": 3,
    "title": "03 — Operators",
    "topic": "Operators",
    "group": "1-3",
    "groupTitle": "1–3 kunlar: Python asoslari, o‘zgaruvchilar, operatorlar",
    "t1": {
      "id": "03.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`not True or True and False` qiymati nima?",
      "options": [
        "A) True",
        "B) False",
        "C) None",
        "D) SyntaxError"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "03.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "x = -17\nprint(x // 5, x % 5, 3 < 5 <= 5)",
      "expectedOutput": "-4 3 True",
      "explanation": "`-4 3 True`.",
      "points": 2
    },
    "t3": {
      "id": "03.T3",
      "title": "Debugging (Level 3)",
      "prompt": "Chegirma 18–25 yoshdagilarga. `age >= 18 or age <= 25` nega noto‘g‘ri? 17 va 26 yoshni ham tekshir.",
      "buggyCode": "age >= 18 or age <= 25",
      "explanation": "`or` bu yerda hamma yoshni qabul qiladi; `18 <= age <= 25` yoki `and`.",
      "points": 2
    },
    "p1": {
      "id": "03.P1",
      "dayNumber": 3,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Kabisa yilini Boolean ifoda bilan aniqlash",
      "description": "Kabisa yilini Boolean ifoda bilan aniqlash. 4 ga bo‘linadi va 100 ga bo‘linmaydi yoki 400 ga bo‘linadi. `if` ishlatma. 1900 → False; 2000 → True; 2024 → True.",
      "points": 8
    },
    "p2": {
      "id": "03.P2",
      "dayNumber": 3,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Shaxmat",
      "description": "Shaxmat. (x1,y1) va (x2,y2) kataklari bir rangdaligini, bir ustun/qator yoki bir diagonalda ekanini alohida Boolean qiymatlarda chiqar. Koordinatalar 1–8 va boshlang‘ich kataklar turlicha.",
      "points": 8
    },
    "p3": {
      "id": "03.P3",
      "dayNumber": 3,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Kirish huquqi",
      "description": "Kirish huquqi. `age`, `has_ticket`, `is_banned`, `is_vip` berilgan. Ban har doim ustun; boshqa holatda 18+ va chipta bor yoki VIP bo‘lsa kiradi. Bitta ifoda yozib, kamida 6 holatda tekshir. `if` yo‘q.",
      "points": 8
    }
  },
  {
    "dayNumber": 4,
    "title": "04 — Strings",
    "topic": "Strings",
    "group": "4-8",
    "groupTitle": "4–8 kunlar: String, List, Tuple, Set, Dictionary",
    "t1": {
      "id": "04.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`\"python\"[1:5:2]` qiymati?",
      "options": [
        "A) yt",
        "B) yh",
        "C) yhn",
        "D) pto"
      ],
      "correctLetter": "B",
      "explanation": "B — `yh`.",
      "points": 2
    },
    "t2": {
      "id": "04.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "s = \"  PyTHON  \"\nprint(s.strip().lower()[::-2])",
      "expectedOutput": "nhy",
      "explanation": "`nhy`.",
      "points": 2
    },
    "t3": {
      "id": "04.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`s = \"cat\"; s[0] = \"b\"` kodidagi xatoni tushuntir va `bat` hosil qil.",
      "buggyCode": "s = \"cat\"; s[0] = \"b\"",
      "explanation": "String immutable; `s = \"b\" + s[1:]`.",
      "points": 2
    },
    "p1": {
      "id": "04.P1",
      "dayNumber": 4,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Matnni normallashtir",
      "description": "Matnni normallashtir. `\"  PyThOn   is   FUN  \"` → `\"python is fun\"`. `split`, `join`, `lower` mumkin; sikl yo‘q.",
      "points": 8
    },
    "p2": {
      "id": "04.P2",
      "dayNumber": 4,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Palindrom detektori",
      "description": "Palindrom detektori. Harf registri, bo‘sh joy va vergulni hisobga olma. `\"Never odd, or even\"` → True; `\"Python\"` → False. Faqat string metodlari, slicing va taqqoslash.",
      "points": 8
    },
    "p3": {
      "id": "04.P3",
      "dayNumber": 4,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Email niqobi",
      "description": "Email niqobi. `\"muhammad@example.com\"` → `\"m******d@example.com\"`; username kamida 2 belgili, bitta `@` kafolatlangan. Yulduzlar sonini uzunlikdan hisobla. Sikl va `if` yo‘q.",
      "points": 8
    }
  },
  {
    "dayNumber": 5,
    "title": "05 — Lists",
    "topic": "Lists",
    "group": "4-8",
    "groupTitle": "4–8 kunlar: String, List, Tuple, Set, Dictionary",
    "t1": {
      "id": "05.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Qaysi amal listni joyida o‘zgartirib, None qaytaradi?",
      "options": [
        "A) `sorted(x)`",
        "B) `x.sort()`",
        "C) `x[:]`",
        "D) `len(x)`"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "05.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "a = [1, 2, 3]\nb = a\nc = a[:]\nb.append(4)\nc[0] = 9\nprint(a, c)",
      "expectedOutput": "[1, 2, 3, 4] [9, 2, 3]",
      "explanation": "`[1, 2, 3, 4] [9, 2, 3]`.",
      "points": 2
    },
    "t3": {
      "id": "05.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`a = [3, 1, 2]; a = a.sort(); print(a[0])` xatosini tuzat.",
      "buggyCode": "a = [3, 1, 2]; a = a.sort(); print(a[0])",
      "explanation": "`sort()` None qaytaradi. `a.sort(); print(a[0])` yoki `a = sorted(a)`.",
      "points": 2
    },
    "p1": {
      "id": "05.P1",
      "dayNumber": 5,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "List rotation",
      "description": "List rotation. `[1,2,3,4,5]` ni o‘ngga k=7 marta aylantir → `[4,5,1,2,3]`. List bo‘sh emas, k≥0; slicing va `%`, sikl yo‘q.",
      "points": 8
    },
    "p2": {
      "id": "05.P2",
      "dayNumber": 5,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "O‘rtacha baholarning ta’sirini kamaytir",
      "description": "O‘rtacha baholarning ta’sirini kamaytir. Kamida 5 ta ball berilgan listdan bitta eng katta va bitta eng kichik ballni chiqarib tashla, qolganlar o‘rtachasini hisobla. Original list o‘zgarmasin. `[10,20,20,30,100]` → 23.333... .",
      "points": 8
    },
    "p3": {
      "id": "05.P3",
      "dayNumber": 5,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Matritsa kesimi",
      "description": "Matritsa kesimi. 3×3 list berilgan: `[[1,2,3],[4,5,6],[7,8,9]]`. Asosiy diagonal, ikkinchi diagonal, o‘rta ustun qiymatlari va ikkala diagonalning markaz bir marta hisoblangan yig‘indisini top. Sikl ishlatma; natija yig‘indi 25.",
      "points": 8
    }
  },
  {
    "dayNumber": 6,
    "title": "06 — Tuples",
    "topic": "Tuples",
    "group": "4-8",
    "groupTitle": "4–8 kunlar: String, List, Tuple, Set, Dictionary",
    "t1": {
      "id": "06.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Bir elementli tuple qaysi?",
      "options": [
        "A) `(5)`",
        "B) `[5]`",
        "C) `(5,)`",
        "D) `5`"
      ],
      "correctLetter": "C",
      "explanation": "C.",
      "points": 2
    },
    "t2": {
      "id": "06.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "a = (1, [2, 3])\na[1].append(4)\nprint(a)",
      "expectedOutput": "(1, [2, 3, 4]) — ichki list mutable",
      "explanation": "`(1, [2, 3, 4])` — ichki list mutable.",
      "points": 2
    },
    "t3": {
      "id": "06.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`a, b = (1, 2, 3)` nega ishlamaydi? Qolgan elementlar `b` ga list bo‘lib tushsin.",
      "buggyCode": "a, b = (1, 2, 3)",
      "explanation": "ValueError; `a, *b = (1, 2, 3)`.",
      "points": 2
    },
    "p1": {
      "id": "06.P1",
      "dayNumber": 6,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Koordinata",
      "description": "Koordinata. `p=(2,3)`, `q=(8,11)` orasidagi masofani va o‘rta nuqtani tuple sifatida hisobla. Masofa 10, o‘rta nuqta `(5.0,7.0)`.",
      "points": 8
    },
    "p2": {
      "id": "06.P2",
      "dayNumber": 6,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Tuple kesish",
      "description": "Tuple kesish. `(10,20,30,40,50,60)` dan slicing va tuple birlashtirish orqali `(50,60,10,20,30,40)` va `(60,50,40,30,20,10)` hosil qil; listga aylantirma.",
      "points": 8
    },
    "p3": {
      "id": "06.P3",
      "dayNumber": 6,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Uchta nuqtadan uchburchak yuzini koordinatalar formulasi bilan hisobla: `abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2`",
      "description": "Uchta nuqtadan uchburchak yuzini koordinatalar formulasi bilan hisobla: `abs(x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2`. `(0,0),(4,0),(0,3)` → 6. Har bir nuqta tuple; natijani `(nuqtalar_tuple, yuza)` shaklida saqla.",
      "points": 8
    }
  },
  {
    "dayNumber": 7,
    "title": "07 — Sets",
    "topic": "Sets",
    "group": "4-8",
    "groupTitle": "4–8 kunlar: String, List, Tuple, Set, Dictionary",
    "t1": {
      "id": "07.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Qaysi ifoda simmetrik farqni topadi?",
      "options": [
        "A) `a & b`",
        "B) `a | b`",
        "C) `a ^ b`",
        "D) `a - b`"
      ],
      "correctLetter": "C",
      "explanation": "C.",
      "points": 2
    },
    "t2": {
      "id": "07.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top (set tartibi muhim emas):",
      "code": "a = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint(len(a | b), len(a & b), len(a ^ b))",
      "expectedOutput": "5 2 3",
      "explanation": "`5 2 3`.",
      "points": 2
    },
    "t3": {
      "id": "07.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`s = set(); s.add([1, 2])` xatosini izohla; shu juftlikni setga qo‘shish usulini yoz.",
      "buggyCode": "s = set(); s.add([1, 2])",
      "explanation": "List hashable emas; `s.add((1, 2))`.",
      "points": 2
    },
    "p1": {
      "id": "07.P1",
      "dayNumber": 7,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Kurs tahlili",
      "description": "Kurs tahlili. Python, SQL, ML kurslari qatnashchilari setlari berilgan. Uchalasiga qatnashganlarni, aynan ikkitasiga qatnashganlarni va faqat bittasiga qatnashganlarni top. A={1,2,3}, B={2,3,4}, C={3,4,5} → {3}, {2,4}, {1,5}.",
      "points": 8
    },
    "p2": {
      "id": "07.P2",
      "dayNumber": 7,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Yo‘qolgan va takrorlangan ID",
      "description": "Yo‘qolgan va takrorlangan ID. Kutilgan ID seti `{1,2,3,4,5}`, kelgan list `[1,2,2,4,7]`. Yetishmayotgan, begona va takroriy ortiqcha yozuvlar sonini top: `{3,5}`, `{7}`, 1. Sikl ishlatma.",
      "points": 8
    },
    "p3": {
      "id": "07.P3",
      "dayNumber": 7,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Jaccard o‘xshashlik",
      "description": "Jaccard o‘xshashlik. Ikki matnni lowercase qilib so‘z setlariga ajrat va kesishma/birlashma nisbatini top. `\"python ai python\"`, `\"ai data\"` → 1/3. Kamida bitta set bo‘sh bo‘lmasin. Sikl yo‘q.",
      "points": 8
    }
  },
  {
    "dayNumber": 8,
    "title": "08 — Dictionaries",
    "topic": "Dictionaries",
    "group": "4-8",
    "groupTitle": "4–8 kunlar: String, List, Tuple, Set, Dictionary",
    "t1": {
      "id": "08.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`d.get(\"x\", 0)` kalit yo‘q bo‘lsa nima qiladi?",
      "options": [
        "A) KeyError",
        "B) 0 qaytaradi, dict o‘zgarmaydi",
        "C) x kalitini kiritadi",
        "D) None"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "08.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "d = {\"a\": 2, \"b\": 3}\nd[\"a\"] += d.get(\"c\", 4)\nd[\"c\"] = d.pop(\"b\")\nprint(d)",
      "expectedOutput": "{'a': 6, 'c': 3}",
      "explanation": "`{'a': 6, 'c': 3}`.",
      "points": 2
    },
    "t3": {
      "id": "08.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`d = {[1, 2]: \"x\"}` xatosi nima? Kalitni o‘zgartirib tuzat.",
      "buggyCode": "d = {[1, 2]: \"x\"}",
      "explanation": "List hashable emas; `{(1, 2): \"x\"}`.",
      "points": 2
    },
    "p1": {
      "id": "08.P1",
      "dayNumber": 8,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Mahsulot hisoboti",
      "description": "Mahsulot hisoboti. `{\"cpu\":{\"price\":200,\"stock\":3},\"ram\":{\"price\":50,\"stock\":8}}` uchun jami ombor qiymatini va RAM stockini 2 taga kamaytirgandan keyingi qiymatni hisobla. 1000 → 900. Faqat ma'lum kalitlar, sikl yo‘q.",
      "points": 8
    },
    "p2": {
      "id": "08.P2",
      "dayNumber": 8,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Sozlamalar",
      "description": "Sozlamalar. Default `{\"theme\":\"light\",\"lang\":\"uz\",\"limit\":10}` va user `{\"theme\":\"dark\",\"limit\":25}`. Ikki dictni originalni o‘zgartirmasdan birlashtir; user qiymati ustun. So‘ng mavjud bo‘lmagan `timezone` uchun `UTC` qaytar.",
      "points": 8
    },
    "p3": {
      "id": "08.P3",
      "dayNumber": 8,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Pul o‘tkazmasi",
      "description": "Pul o‘tkazmasi. `accounts={\"A\":1000,\"B\":400,\"C\":50}`. A dan B ga 250, B dan C ga 100 o‘tkaz. Yetarli balans kafolatlangan; yakuniy balanslar va jami pul o‘zgarmaganini Boolean bilan tekshir. Natija 750,550,150.",
      "points": 8
    }
  },
  {
    "dayNumber": 9,
    "title": "09 — Conditionals",
    "topic": "Conditionals",
    "group": "9-11",
    "groupTitle": "9–11 kunlar: Conditionals, Loops, Functions",
    "t1": {
      "id": "09.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`if` / `elif` / `else` zanjirida nechta blok bajariladi?",
      "options": [
        "A) hammasi",
        "B) ko‘pi bilan bittasi",
        "C) faqat else",
        "D) doim ikkitasi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "09.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "x = 12\nif x % 2 == 0:\n    print(\"A\")\nif x % 3 == 0:\n    print(\"B\")\nelse:\n    print(\"C\")",
      "expectedOutput": "Ikki qator: A, B",
      "explanation": "Ikki qator: A, B.",
      "points": 2
    },
    "t3": {
      "id": "09.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`if score >= 60: print(\"Pass\")` dan keyin `elif score >= 90: print(\"Excellent\")` nega Excellent chiqarmaydi?",
      "buggyCode": "if score >= 60: print(\"Pass\")",
      "explanation": "90+ birinchi shartga ham tushadi; yuqori chegarani birinchi tekshir.",
      "points": 2
    },
    "p1": {
      "id": "09.P1",
      "dayNumber": 9,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Progressiv tarif",
      "description": "Progressiv tarif. Birinchi 100 birlik 1000 so‘mdan, keyingi 100 birlik 1500, qolganlari 2000. 250 birlik → 350000; 0 → 0; manfiy → xato. Har segment alohida narxlanadi.",
      "points": 8
    },
    "p2": {
      "id": "09.P2",
      "dayNumber": 9,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Uchburchak klassifikatori",
      "description": "Uchburchak klassifikatori. Uch musbat tomon bilan avval mavjudligini, keyin teng tomonli/teng yonli/turli tomonli ekanini va to‘g‘ri burchakli ekanini aniqlab chiqar. 3,4,5 → turli tomonli, to‘g‘ri burchakli; 1,2,3 → mavjud emas.",
      "points": 8
    },
    "p3": {
      "id": "09.P3",
      "dayNumber": 9,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Buyurtma qarori",
      "description": "Buyurtma qarori. Stock, miqdor, balans, narx, VIP, bloklangan holatini ol. Ustuvorlik: bloklangan → noto‘g‘ri miqdor → stock yetmaydi → balans yetmaydi → muvaffaqiyat. VIP 10% chegirma. Muvaffaqiyatda stock/balansni yangila; muvaffaqiyatsizlikda o‘zgartirma.",
      "points": 8
    }
  },
  {
    "dayNumber": 10,
    "title": "10 — Loops",
    "topic": "Loops",
    "group": "9-11",
    "groupTitle": "9–11 kunlar: Conditionals, Loops, Functions",
    "t1": {
      "id": "10.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`range(2, 9, 3)` elementlari?",
      "options": [
        "A) 2,5,8",
        "B) 2,5,8,9",
        "C) 3,6,9",
        "D) 2,5"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "10.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "s = 0\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    s += i\n    if s > 7:\n        break\nprint(s, i)",
      "expectedOutput": "12 5",
      "explanation": "`12 5`.",
      "points": 2
    },
    "t3": {
      "id": "10.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`i=0; while i<5:` ichida `if i==2: continue` va undan keyin `i+=1` turgan bo‘lsa nima yuz beradi? Tuzat.",
      "buggyCode": "i=0; while i<5:",
      "explanation": "i=2 da cheksiz sikl; `continue` dan oldin i ni oshir yoki shartni qayta tuz.",
      "points": 2
    },
    "p1": {
      "id": "10.P1",
      "dayNumber": 10,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Tub sonlar",
      "description": "Tub sonlar. 2 dan n gacha tub sonlarni top. `n=30` → `[2,3,5,7,11,13,17,19,23,29]`. Har bir sonni kvadrat ildizigacha tekshir; tashqi kutubxona yo‘q.",
      "points": 8
    },
    "p2": {
      "id": "10.P2",
      "dayNumber": 10,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Eng uzun ketma-ket o‘sish",
      "description": "Eng uzun ketma-ket o‘sish. `[3,4,5,1,2,8,9,0]` → `[1,2,8,9]`. Faqat yonma-yon elementlar; teng bo‘lsa o‘sish tugaydi. Teng uzunlikda birinchisi; bo‘sh list → `[]`. Bitta asosiy yurishda yech.",
      "points": 8
    },
    "p3": {
      "id": "10.P3",
      "dayNumber": 10,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Two Sum",
      "description": "Two Sum. `[3,2,4,7]`, target=6 → `(1,2)`. Turli indekslar; yechim bo‘lmasa None. Avval ichma-ich sikl, keyin dict yordamida bir yurishda yoz. `[3,3]`,6 → `(0,1)`. Tayyor qidiruv funksiyalari yo‘q.",
      "points": 8
    }
  },
  {
    "dayNumber": 11,
    "title": "11 — Functions",
    "topic": "Functions",
    "group": "9-11",
    "groupTitle": "9–11 kunlar: Conditionals, Loops, Functions",
    "t1": {
      "id": "11.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Funksiya ichida `return` bajarilgandan keyin nima bo‘ladi?",
      "options": [
        "A) funksiya tugaydi",
        "B) faqat sikl tugaydi",
        "C) kod davom etadi",
        "D) doim None qaytadi"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "11.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "def f(x, nums=[]):\n    nums.append(x)\n    return nums[:]\nprint(f(1), f(2), f(3, []))",
      "expectedOutput": "[1] [1, 2] [3] — default list chaqiruvlar orasida saqlanadi",
      "explanation": "`[1] [1, 2] [3]` — default list chaqiruvlar orasida saqlanadi.",
      "points": 2
    },
    "t3": {
      "id": "11.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`def average(nums): print(sum(nums)/len(nums))` ni `average([2,4]) + 1` da ishlatib bo‘lmaydi. Ikki muammoni top: qaytarish va bo‘sh list.",
      "buggyCode": "def average(nums): print(sum(nums)/len(nums))",
      "explanation": "`print` o‘rniga `return`; bo‘sh list uchun oldindan kelishilgan None yoki ValueError.",
      "points": 2
    },
    "p1": {
      "id": "11.P1",
      "dayNumber": 11,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`is_prime(n)`, `prime_factors(n)` funksiyalarini yoz",
      "description": "`is_prime(n)`, `prime_factors(n)` funksiyalarini yoz. 84 → `[2,2,3,7]`, 1 → `[]`, 97 → `[97]`. n musbat butun son. Faktorlar ko‘paytmasi n bo‘lishi va barcha faktorlar tub ekanini tekshir.",
      "points": 8
    },
    "p2": {
      "id": "11.P2",
      "dayNumber": 11,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "`longest_common_prefix(words)` — `['flower','flow','flight']` → `'fl'`; `[]` → `''`; ichida bo‘sh string bo‘lsa `''`",
      "description": "`longest_common_prefix(words)` — `['flower','flow','flight']` → `'fl'`; `[]` → `''`; ichida bo‘sh string bo‘lsa `''`. `os.path.commonprefix` ishlatma.",
      "points": 8
    },
    "p3": {
      "id": "11.P3",
      "dayNumber": 11,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "`calculate_cart(cart, discounts, tax_rate)` yoz",
      "description": "`calculate_cart(cart, discounts, tax_rate)` yoz. Har mahsulot uchun qty va price; chegirma kategoriya asosida, soliq chegirmadan so‘ng. 100×2, 10% chegirma, 12% soliq → 201.6. Funksiya inputni o‘zgartirmasin; noto‘g‘ri miqdor uchun None. Hisobni kichik yordamchi funksiyalarga ajrat.",
      "points": 8
    }
  },
  {
    "dayNumber": 12,
    "title": "12 — Modules",
    "topic": "Modules",
    "group": "12-15",
    "groupTitle": "12–15 kunlar: Modules, Comprehension, Higher Order Functions, Errors",
    "t1": {
      "id": "12.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`if __name__ == \"__main__\":` nima uchun?",
      "options": [
        "A) modul importini taqiqlaydi",
        "B) bevosita ishga tushganda blokni bajaradi",
        "C) hamma holatda bajaradi",
        "D) package yaratadi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "12.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "from math import floor, ceil, sqrt\nprint(floor(-2.1), ceil(-2.1), int(sqrt(81)))",
      "expectedOutput": "-3 -2 9",
      "explanation": "`-3 -2 9`.",
      "points": 2
    },
    "t3": {
      "id": "12.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`import math; print(sqrt(16))` nima uchun ishlamaydi? Ikki turda to‘g‘rila.",
      "buggyCode": "import math; print(sqrt(16))",
      "explanation": "`math.sqrt(16)` yoki `from math import sqrt`.",
      "points": 2
    },
    "p1": {
      "id": "12.P1",
      "dayNumber": 12,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`geometry",
      "description": "`geometry.py` va `main.py` yarat: aylana yuzi, masofa, uchburchak perimetri funksiyalari. `math` ishlat. Import qilinganda modul demo matn chiqarmasin.",
      "points": 8
    },
    "p2": {
      "id": "12.P2",
      "dayNumber": 12,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Zar simulyatori",
      "description": "Zar simulyatori. `random.Random(42)` bilan 10000 marta ikkita zar tashla. Yig‘indi chastotasi va eng ko‘p uchragan yig‘indini top. Bir seed bir xil natija bersin, jami chastota 10000; nazariy eng ehtimolli yig‘indi 7.",
      "points": 8
    },
    "p3": {
      "id": "12.P3",
      "dayNumber": 12,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "ID generator",
      "description": "ID generator. `random`, `string` orqali 8 belgili IDlardan 1000 ta noyob qiymat hosil qil. Alfavit: A–Z va 0–9. To‘qnashuv yuz bersa qayta yarat; bo‘sh alfavit yoki imkoniyatdan katta miqdor uchun None. Bu xavfsizlik tokeni emas.",
      "points": 8
    }
  },
  {
    "dayNumber": 13,
    "title": "13 — List Comprehension",
    "topic": "List Comprehension",
    "group": "12-15",
    "groupTitle": "12–15 kunlar: Modules, Comprehension, Higher Order Functions, Errors",
    "t1": {
      "id": "13.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`[x*x for x in range(5) if x%2==0]` natijasi?",
      "options": [
        "A) [0,4,16]",
        "B) [4,16]",
        "C) [0,1,4,9,16]",
        "D) [0,2,4]"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "13.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "print([(i,j) for i in range(3) for j in range(i)])",
      "expectedOutput": "[(1, 0), (2, 0), (2, 1)]",
      "explanation": "`[(1, 0), (2, 0), (2, 1)]`.",
      "points": 2
    },
    "t3": {
      "id": "13.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`[x if x>0 for x in nums]` syntax xatosini ikki variantda tuzat: musbatlarni filtrlash va manfiylarni 0 qilish.",
      "buggyCode": "[x if x>0 for x in nums]",
      "explanation": "`[x for x in nums if x > 0]`; `[x if x > 0 else 0 for x in nums]`.",
      "points": 2
    },
    "p1": {
      "id": "13.P1",
      "dayNumber": 13,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Matritsani transponirlash",
      "description": "Matritsani transponirlash. `[[1,2,3],[4,5,6]]` → `[[1,4],[2,5],[3,6]]`. Faqat list comprehension; NumPy va `zip` yo‘q; to‘rtburchak matritsa.",
      "points": 8
    },
    "p2": {
      "id": "13.P2",
      "dayNumber": 13,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "`[(a,b,c)]` shaklida barcha Pifagor uchliklarini top: 1≤a<b<c≤n, a²+b²=c²",
      "description": "`[(a,b,c)]` shaklida barcha Pifagor uchliklarini top: 1≤a<b<c≤n, a²+b²=c². n=15 ichida (3,4,5), (5,12,13), (6,8,10), (9,12,15) bo‘lishi kerak. Comprehension bilan va oddiy sikl bilan taqqosla.",
      "points": 8
    },
    "p3": {
      "id": "13.P3",
      "dayNumber": 13,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Savdo yozuvlarini tekislash",
      "description": "Savdo yozuvlarini tekislash. `[{\"id\":1,\"items\":[{\"sku\":\"A\",\"qty\":2},{\"sku\":\"B\",\"qty\":0}]},{\"id\":2,\"items\":[{\"sku\":\"A\",\"qty\":3}]}]` → `[(1,'A',2),(2,'A',3)]`. Faqat qty>0, nested comprehension; original o‘zgarmasin.",
      "points": 8
    }
  },
  {
    "dayNumber": 14,
    "title": "14 — Higher Order Functions",
    "topic": "Higher Order Functions",
    "group": "12-15",
    "groupTitle": "12–15 kunlar: Modules, Comprehension, Higher Order Functions, Errors",
    "t1": {
      "id": "14.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`filter` funksiyasi nima qiladi?",
      "options": [
        "A) elementlarni o‘zgartiradi",
        "B) shartga moslarini tanlaydi",
        "C) kamaytiradi",
        "D) tartiblaydi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "14.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "from functools import reduce\nxs = [1,2,3,4]\nprint(reduce(lambda a,b: a+b, map(lambda x:x*x, filter(lambda x:x%2==0, xs)), 0))",
      "expectedOutput": "20",
      "explanation": "`20`.",
      "points": 2
    },
    "t3": {
      "id": "14.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`funcs = [lambda: i for i in range(3)]` ning barcha funksiyalari oxirgi i ni qaytaradi. Har biri o‘z qiymatini saqlashi uchun tuzat.",
      "buggyCode": "funcs = [lambda: i for i in range(3)]",
      "explanation": "`[lambda i=i: i for i in range(3)]` — default argument orqali.",
      "points": 2
    },
    "p1": {
      "id": "14.P1",
      "dayNumber": 14,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Reyting",
      "description": "Reyting. Studentlar `(name,score,age)` ko‘rinishida; score kamayish, age o‘sish, name alifbo tartibida sarala. `key` va lambda ishlat. `[('B',90,20),('A',90,19),('C',80,18)]` → A,B,C.",
      "points": 8
    },
    "p2": {
      "id": "14.P2",
      "dayNumber": 14,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "`compose(f,g)` funksiya qaytarsin: `compose(f,g)(x) == f(g(x))`",
      "description": "`compose(f,g)` funksiya qaytarsin: `compose(f,g)(x) == f(g(x))`. Keyin `pipeline(*funcs)` yoz: funksiyalar berilgan tartibda ishlasin; bo‘sh pipeline x ni qaytarsin. Masalan +2, ×3, -1; x=4 → 17.",
      "points": 8
    },
    "p3": {
      "id": "14.P3",
      "dayNumber": 14,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "`make_counter(start, step)` closure yarat",
      "description": "`make_counter(start, step)` closure yarat. Har chaqiriqda keyingi son qaytsin; 2,3 → 2,5,8. Ikki counter mustaqil holatga ega bo‘lsin. Global variable va class ishlatma.",
      "points": 8
    }
  },
  {
    "dayNumber": 15,
    "title": "15 — Python Type Errors",
    "topic": "Python Type Errors",
    "group": "12-15",
    "groupTitle": "12–15 kunlar: Modules, Comprehension, Higher Order Functions, Errors",
    "t1": {
      "id": "15.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`[1,2][5]` qanday xato?",
      "options": [
        "A) KeyError",
        "B) IndexError",
        "C) ValueError",
        "D) NameError"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "15.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Har biri mustaqil ishga tushirilsa qaysi xato chiqadi? `int('2.5')`; `{ }['x']`; `10/0`; `unknown_name`; `len(5)`.",
      "code": "",
      "expectedOutput": "ValueError, KeyError, ZeroDivisionError, NameError, TypeError",
      "explanation": "ValueError, KeyError, ZeroDivisionError, NameError, TypeError.",
      "points": 2
    },
    "t3": {
      "id": "15.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`prices={'a':10}; total=prices.get('b')+5` xatosi nima? b yo‘q bo‘lganda natija 5 bo‘lsin.",
      "buggyCode": "prices={'a':10}; total=prices.get('b')+5",
      "explanation": "TypeError (None + int); `prices.get('b', 0)+5`.",
      "points": 2
    },
    "p1": {
      "id": "15.P1",
      "dayNumber": 15,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`safe_lookup(data, index)` list va butun indeks olsin; noto‘g‘ri tur, bo‘sh list yoki chegaradan tashqari indeksda None qaytarsin",
      "description": "`safe_lookup(data, index)` list va butun indeks olsin; noto‘g‘ri tur, bo‘sh list yoki chegaradan tashqari indeksda None qaytarsin. Manfiy indeksni Python qoidasi bo‘yicha qo‘lla. `try/except` ishlatma; shartlar yordamida oldini ol.",
      "points": 8
    },
    "p2": {
      "id": "15.P2",
      "dayNumber": 15,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "`parse_quantity(value)` faqat musbat butun son yoki faqat raqamlardan tashkil topgan ASCII stringni qabul qilsin",
      "description": "`parse_quantity(value)` faqat musbat butun son yoki faqat raqamlardan tashkil topgan ASCII stringni qabul qilsin. `True`, `3.5`, `'-3'`, `'abc'`, `0` → None; `'003'` → 3. Xatoga uchramasidan oldin type va stringni tekshir.",
      "points": 8
    },
    "p3": {
      "id": "15.P3",
      "dayNumber": 15,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Bug laboratoriyasi: `cart=[{'price':'10','qty':2},{'price':5},{'price':None,'qty':4}]`",
      "description": "Bug laboratoriyasi: `cart=[{'price':'10','qty':2},{'price':5},{'price':None,'qty':4}]`. Har yozuvda qaysi xato paydo bo‘lishini aniqlab hujjatlashtir. Keyin valid yozuvlar yig‘indisini va invalid indekslarni qaytar; string raqam qabul qilinsin, yetishmagan qty yoki None narx qabul qilinmasin. Natija `(20,[1,2])`. `try/except` yo‘q.",
      "points": 8
    }
  },
  {
    "dayNumber": 16,
    "title": "16 — Python DateTime",
    "topic": "Python DateTime",
    "group": "16-20",
    "groupTitle": "16–20 kunlar: DateTime, Exception, Regex, Files, Packages",
    "t1": {
      "id": "16.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Ikki `date` ni ayirish natijasi nima?",
      "options": [
        "A) int",
        "B) str",
        "C) timedelta",
        "D) datetime"
      ],
      "correctLetter": "C",
      "explanation": "C.",
      "points": 2
    },
    "t2": {
      "id": "16.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "from datetime import date,timedelta\nprint(date(2024,2,28)+timedelta(days=2))",
      "expectedOutput": "2024-03-01",
      "explanation": "`2024-03-01`.",
      "points": 2
    },
    "t3": {
      "id": "16.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`datetime.strptime('18/11/2026','%Y-%m-%d')` nega xato? Formatni to‘g‘rila.",
      "buggyCode": "datetime.strptime('18/11/2026','%Y-%m-%d')",
      "explanation": "ValueError; `%d/%m/%Y`. `datetime` classi import qilingan bo‘lishi kerak.",
      "points": 2
    },
    "p1": {
      "id": "16.P1",
      "dayNumber": 16,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Yosh kalkulyatori",
      "description": "Yosh kalkulyatori. Tug‘ilgan sana va hisob sanasidan to‘liq yoshni top. 2000-11-19, 2026-11-18 → 25. 29-fevral uchun kabisa bo‘lmagan yilda tug‘ilgan kun 1-mart deb belgilansin. Kelajak sana → None.",
      "points": 8
    },
    "p2": {
      "id": "16.P2",
      "dayNumber": 16,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Bron to‘qnashuvi",
      "description": "Bron to‘qnashuvi. Ikki `[start,end)` vaqt intervali ustma-ust tushgan daqiqalarini top. 10:00–11:30 va 11:00–12:00 → 30; 10:00–11:00 va 11:00–12:00 → 0. Sana almashishini ham tekshir; start≤end.",
      "points": 8
    },
    "p3": {
      "id": "16.P3",
      "dayNumber": 16,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Ombor yaroqlilik tahlili",
      "description": "Ombor yaroqlilik tahlili. Partiyalar `(id, received_date, shelf_life_days)` berilgan. `as_of` sanasida expiration, qolgan kun va holatni top: ≤0 expired, 1–3 warning, >3 normal. Expired birinchi, keyin eng erta expiration; id tie-breaker. Sana misoli: 2026-11-10 + 10 kun → 2026-11-20; 18-noyabrda warning.",
      "points": 8
    }
  },
  {
    "dayNumber": 17,
    "title": "17 — Exception Handling",
    "topic": "Exception Handling",
    "group": "16-20",
    "groupTitle": "16–20 kunlar: DateTime, Exception, Regex, Files, Packages",
    "t1": {
      "id": "17.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`finally` odatda qachon bajariladi?",
      "options": [
        "A) faqat xato bo‘lsa",
        "B) faqat xato bo‘lmasa",
        "C) har ikki holatda",
        "D) hech qachon"
      ],
      "correctLetter": "C",
      "explanation": "C — odatiy try/except oqimida.",
      "points": 2
    },
    "t2": {
      "id": "17.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "try:\n    print(int('x'))\nexcept ValueError:\n    print('A')\nelse:\n    print('B')\nfinally:\n    print('C')",
      "expectedOutput": "Ikki qator: A, C",
      "explanation": "Ikki qator: A, C.",
      "points": 2
    },
    "t3": {
      "id": "17.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`except Exception:` dan keyin `except ValueError:` yozishdagi mantiqiy muammo nima?",
      "buggyCode": "except Exception:",
      "explanation": "Umumiy handler ValueErrorni avval ushlab qoladi; maxsus exception birinchi bo‘lishi kerak.",
      "points": 2
    },
    "p1": {
      "id": "17.P1",
      "dayNumber": 17,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`safe_divide(a,b)` yoz: int/float yoki raqamli string qabul qilsin; bo‘luvchi 0, noto‘g‘ri qiymat va tur uchun har xil xabar qaytarsin",
      "description": "`safe_divide(a,b)` yoz: int/float yoki raqamli string qabul qilsin; bo‘luvchi 0, noto‘g‘ri qiymat va tur uchun har xil xabar qaytarsin. Masalan `('12','3') → (4.0,None)`, `(1,0) → (None,'zero')`.",
      "points": 8
    },
    "p2": {
      "id": "17.P2",
      "dayNumber": 17,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Batch parser",
      "description": "Batch parser. `['12','x','5','-2',None,'10']` dan musbat intlar va indekslangan xatolarni yig‘. Har bir element mustaqil try/except; bittasi buzilsa qolganlari davom etsin. Natija `[12,5,10]`, xato indekslari 1,3,4.",
      "points": 8
    },
    "p3": {
      "id": "17.P3",
      "dayNumber": 17,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "`transfer(accounts,src,dst,amount)` yoz",
      "description": "`transfer(accounts,src,dst,amount)` yoz. Kalit yo‘q, manfiy summa, bir xil hisob va balans yetishmasligi uchun alohida ValueError/KeyError holatlari; har qanday xatoda ikkala balans ham o‘zgarmasligi kerak. Muvaffaqiyat va muvaffaqiyatsizlik testlarini yoz.",
      "points": 8
    }
  },
  {
    "dayNumber": 18,
    "title": "18 — Regular Expressions",
    "topic": "Regular Expressions",
    "group": "16-20",
    "groupTitle": "16–20 kunlar: DateTime, Exception, Regex, Files, Packages",
    "t1": {
      "id": "18.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`re.fullmatch` nima qiladi?",
      "options": [
        "A) istalgan joydan topadi",
        "B) butun matn mosligini tekshiradi",
        "C) almashtiradi",
        "D) ro‘yxat qaytaradi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "18.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "import re\nprint(re.findall(r'\\d+', 'a12 b003 c7'))",
      "expectedOutput": "['12', '003', '7']",
      "explanation": "`['12', '003', '7']`.",
      "points": 2
    },
    "t3": {
      "id": "18.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`re.findall(r'.+', 'a.b')` da nuqta nega literal nuqta emas? Faqat nuqtani topadigan pattern yoz.",
      "buggyCode": "re.findall(r'.+', 'a.b')",
      "explanation": "`.` newline dan boshqa belgiga mos; literal nuqta `r'\\.'`.",
      "points": 2
    },
    "p1": {
      "id": "18.P1",
      "dayNumber": 18,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Telefon tekshiruvi",
      "description": "Telefon tekshiruvi. Faqat `+998 90 123 45 67` yoki `+998901234567` formatini qabul qil. ASCII raqamlar; aralash separator, ortiqcha belgi va noto‘g‘ri uzunlik rad etilsin. `fullmatch` ishlat.",
      "points": 8
    },
    "p2": {
      "id": "18.P2",
      "dayNumber": 18,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Log parser",
      "description": "Log parser. `2026-11-18 10:15:24 ERROR user=42 msg=Timeout` satridan sana, vaqt, level, user ID, xabarni named group yordamida ajrat. INFO/WARN/ERROR; ID raqam; format buzilsa None.",
      "points": 8
    },
    "p3": {
      "id": "18.P3",
      "dayNumber": 18,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Legal text parser",
      "description": "Legal text parser. `1-modda. Kirish\\nMatn A\\n2-modda. Qoidalar\\nMatn B` ni modda raqami, sarlavhasi va matni bo‘yicha segmentlarga ajrat. Sarlavha satr boshida; matn orasidagi `3-modda` eslatmasi yangi segment bo‘lmasin. 3 turli test yoz.",
      "points": 8
    }
  },
  {
    "dayNumber": 19,
    "title": "19 — File Handling",
    "topic": "File Handling",
    "group": "16-20",
    "groupTitle": "16–20 kunlar: DateTime, Exception, Regex, Files, Packages",
    "t1": {
      "id": "19.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`with open(...) as f` afzalligi?",
      "options": [
        "A) faylni avtomatik yopadi",
        "B) doim yozadi",
        "C) faylni o‘chiradi",
        "D) faqat JSONni o‘qiydi"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "19.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Fayl avval `abc` saqlaydi. `open(path,'a')` orqali `write('de')` qilinadi. `read()` natijasi nima?",
      "code": "",
      "expectedOutput": "abcde",
      "explanation": "`abcde`.",
      "points": 2
    },
    "t3": {
      "id": "19.T3",
      "title": "Debugging (Level 3)",
      "prompt": "JSON matnini `json.dump(data, 'out.json')` orqali yozishda nima xato? Tuzat.",
      "buggyCode": "json.dump(data, 'out.json')",
      "explanation": "`dump` file object kutadi; `with open('out.json','w',encoding='utf-8') as f: json.dump(data,f)`.",
      "points": 2
    },
    "p1": {
      "id": "19.P1",
      "dayNumber": 19,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`word_report(path)` faylni satrma-satr o‘qisin, so‘zlar chastotasini hisoblansin",
      "description": "`word_report(path)` faylni satrma-satr o‘qisin, so‘zlar chastotasini hisoblansin. Registr va tinish belgilarini e’tiborsiz qil. Top-5: count kamayish, so‘z alifbo tartibi; bo‘sh fayl → `[]`. Encoding UTF-8.",
      "points": 8
    },
    "p2": {
      "id": "19.P2",
      "dayNumber": 19,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "CSV audit",
      "description": "CSV audit. `id,qty,price` ustunli faylni `csv` moduli bilan o‘qi; qty musbat int, price manfiy emas. Valid savdolar yig‘indisi va invalid satr raqamlarini alohida JSONga yoz. Header birinchi satr hisoblanadi. Kamida 1 buzilgan satrli test.",
      "points": 8
    },
    "p3": {
      "id": "19.P3",
      "dayNumber": 19,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Faylga asoslangan task manager",
      "description": "Faylga asoslangan task manager. JSONda task id, title, done; add, complete, delete, list operatsiyalari. Restartdan keyin saqlansin, buzilgan JSON holatida original faylni ustidan yozma. Takroriy ID bo‘lmasin; dastur o‘zi yaratgan vaqtinchalik fayl orqali xavfsiz saqlash bonus.",
      "points": 8
    }
  },
  {
    "dayNumber": 20,
    "title": "20 — Python Package Manager",
    "topic": "Python Package Manager",
    "group": "16-20",
    "groupTitle": "16–20 kunlar: DateTime, Exception, Regex, Files, Packages",
    "t1": {
      "id": "20.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`python -m pip install -r requirements.txt` nima qiladi?",
      "options": [
        "A) paketlarni o‘chiradi",
        "B) ro‘yxatdagi dependenciesni o‘rnatadi",
        "C) Pythonni yangilaydi",
        "D) requirements yaratadi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "20.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "`python -m pip install requests==2.32.5` muvaffaqiyatli bo‘lsa qaysi versiya o‘rnatilishi talab qilingan?",
      "code": "",
      "expectedOutput": "Aynan 2.32.5",
      "explanation": "Aynan 2.32.5.",
      "points": 2
    },
    "t3": {
      "id": "20.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`pip install json` standart `json` modulidan foydalanish uchun kerakmi? Nega?",
      "buggyCode": "pip install json",
      "explanation": "Yo‘q, `json` Python standard library tarkibida.",
      "points": 2
    },
    "p1": {
      "id": "20.P1",
      "dayNumber": 20,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`requirements",
      "description": "`requirements.txt` yarat: `requests==2.32.5`, `beautifulsoup4==4.13.4`. `python -m pip install -r requirements.txt`, `pip show`, `pip check` bilan tekshir. Versiyalar mashq uchun berilgan, eng so‘nggi deb da'vo qilinmaydi.",
      "points": 8
    },
    "p2": {
      "id": "20.P2",
      "dayNumber": 20,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Dependency audit",
      "description": "Dependency audit. `math`, `requests`, `json`, `bs4`, `datetime`, `pandas` importlarini standard va third-partyga ajrat. Third-party import nomidan distributiv nomini aniqlab requirements tuz (bs4 → beautifulsoup4).",
      "points": 8
    },
    "p3": {
      "id": "20.P3",
      "dayNumber": 20,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Reproducibility",
      "description": "Reproducibility. Alohida Python muhiti mavjud bo‘lsa undan foydalanib kichik terminal loyiha yarat; tashqi paket va uning aniq versiyasini yoz. `pip freeze` natijasini solishtir, READMEga install/run/verify buyruqlarini yoz. Boshqa muhitda takrorlash uchun to‘liq ro‘yxatni saqla; 23-kunda yangi venv bilan qayta sinaysan.",
      "points": 8
    }
  },
  {
    "dayNumber": 21,
    "title": "21 — Classes and Objects",
    "topic": "Classes and Objects",
    "group": "21-25",
    "groupTitle": "21–25 kunlar: OOP, Scraping, Venv, Statistics, Pandas",
    "t1": {
      "id": "21.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`self` nima?",
      "options": [
        "A) class nomi",
        "B) joriy instancega reference",
        "C) global variable",
        "D) constructor qaytaradigan qiymat"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "21.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "class Bank:\n    history = []\n    def add(self, x):\n        self.history.append(x)\na, b = Bank(), Bank()\na.add(10)\nb.add(20)\nprint(a.history, b.history)",
      "expectedOutput": "[10, 20] [10, 20] — class attribute umumiy",
      "explanation": "`[10, 20] [10, 20]` — class attribute umumiy.",
      "points": 2
    },
    "t3": {
      "id": "21.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`class User: def __init__(name): ...` (to‘g‘ri indent qilingan deb ol) kodida `User('Ali')` nega TypeError beradi? Imzoni tuzat.",
      "buggyCode": "class User: def __init__(name): ...",
      "explanation": "`def __init__(self, name):` — instance avtomatik uzatiladi.",
      "points": 2
    },
    "p1": {
      "id": "21.P1",
      "dayNumber": 21,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "BankAccount class",
      "description": "BankAccount class. `deposit`, `withdraw`, `transfer`, `get_balance`, transaction history. Nol/manfiy miqdor rad etilsin; transfer xatoda hech bir hisobni o‘zgartirmasin. 2 mustaqil hisob bilan tekshir.",
      "points": 8
    },
    "p2": {
      "id": "21.P2",
      "dayNumber": 21,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Stack va Queue classlarini list yordamida yarat",
      "description": "Stack va Queue classlarini list yordamida yarat. Stack: push/pop/peek; Queue: enqueue/dequeue/peek. Bo‘sh holat None; size/is_empty. Browser history uchun Stack, xizmat navbati uchun Queue demo yoz. Har operatsiyaning murakkabligini tushuntir; `pop(0)` nega sekin?",
      "points": 8
    },
    "p3": {
      "id": "21.P3",
      "dayNumber": 21,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Kutubxona tizimi",
      "description": "Kutubxona tizimi. `Book`, `Member`, `Library` classlari; kitob nusxalari, borrow/return, bir vaqtda 3 kitob limiti, bitta nusxani ikki odam olmasligi, tarix. Kamida 8 test. Inheritance bonus: StudentMember va StaffMember limitlari turlicha.",
      "points": 8
    }
  },
  {
    "dayNumber": 22,
    "title": "22 — Web Scraping",
    "topic": "Web Scraping",
    "group": "21-25",
    "groupTitle": "21–25 kunlar: OOP, Scraping, Venv, Statistics, Pandas",
    "t1": {
      "id": "22.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "BeautifulSoup `select('.product')` nima qaytaradi?",
      "options": [
        "A) bitta matn",
        "B) CSS selectorga mos taglar ro‘yxati",
        "C) JSON",
        "D) URL"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "22.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "from bs4 import BeautifulSoup\ns = BeautifulSoup('<ul><li>A</li><li>B</li></ul>', 'html.parser')\nprint([x.get_text() for x in s.select('li')])",
      "expectedOutput": "['A', 'B']",
      "explanation": "`['A', 'B']`.",
      "points": 2
    },
    "t3": {
      "id": "22.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`soup.find('h1').text` ba'zi sahifalarda AttributeError beradi. Sababi va himoya usuli?",
      "buggyCode": "soup.find('h1').text",
      "explanation": "`find` None qaytarishi mumkin. Tag mavjudligini tekshir, keyin `get_text()`.",
      "points": 2
    },
    "p1": {
      "id": "22.P1",
      "dayNumber": 22,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Mahsulot parseri",
      "description": "Mahsulot parseri. O‘zing yaratgan HTML fixtureda `div.product` ichida name va price bo‘lsin. List of dict qaytar, narxni son qil, yetishmagan nom/narxli kartani xato sifatida ajrat. Dastlab tarmoq ishlatma.",
      "points": 8
    },
    "p2": {
      "id": "22.P2",
      "dayNumber": 22,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Nisbiy linklar",
      "description": "Nisbiy linklar. HTML fixtureda `/p/1`, `/p/2`, takroriy `/p/1`, tashqi domen va `#top` bor. `urllib.parse.urljoin` yordamida faqat bir xil domen mahsulot URLlarini noyob qilib tartib bilan chiqar.",
      "points": 8
    },
    "p3": {
      "id": "22.P3",
      "dayNumber": 22,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Ruxsat berilgan demo saytda, masalan `https://books",
      "description": "Ruxsat berilgan demo saytda, masalan `https://books.toscrape.com/`, 3 sahifagacha title, price, next linkni yig‘. Timeout, HTTP status tekshiruvi, so‘rovlar orasida tanaffus, robots/foydalanish qoidalariga rioya; 1 sahifa xatosini log qil. JSONga yoz, fixture orqali offline test ham yarat.",
      "points": 8
    }
  },
  {
    "dayNumber": 23,
    "title": "23 — Virtual Environment",
    "topic": "Virtual Environment",
    "group": "21-25",
    "groupTitle": "21–25 kunlar: OOP, Scraping, Venv, Statistics, Pandas",
    "t1": {
      "id": "23.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "venvning asosiy vazifasi?",
      "options": [
        "A) global Pythonni o‘chiradi",
        "B) dependencylarni loyihalar bo‘yicha ajratadi",
        "C) internet tezligini oshiradi",
        "D) kodni kompilyatsiya qiladi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "23.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Windows PowerShell: `python -m venv .venv` bajarildi, aktivlashtirish yo‘li qaysi? A) `source .venv/bin/activate` B) `.\\.venv\\Scripts\\Activate.ps1` C) `pip activate` D) `python activate`",
      "code": "",
      "expectedOutput": "B. PowerShell siyosati to‘sqinlik qilsa .venv\\Scripts\\python.exe dan bevosita foydalanish mumkin",
      "explanation": "B. PowerShell siyosati to‘sqinlik qilsa `.venv\\Scripts\\python.exe` dan bevosita foydalanish mumkin.",
      "points": 2
    },
    "t3": {
      "id": "23.T3",
      "title": "Debugging (Level 3)",
      "prompt": "Terminalda venv faol, lekin IDE boshqa interpreterda ishlagani sabab import xato. Qanday tekshirasan?",
      "buggyCode": "",
      "explanation": "Terminal/IDEda `sys.executable` va `python -m pip --version` yo‘llarini solishtir, IDE interpreterini venvga yo‘naltir.",
      "points": 2
    },
    "p1": {
      "id": "23.P1",
      "dayNumber": 23,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "`project_a` va `project_b` uchun ikkita venv yarat",
      "description": "`project_a` va `project_b` uchun ikkita venv yarat. A ga requests 2.32.5, B ga 2.31.0 o‘rnat (faqat o‘rganish muhiti). `sys.executable` va package version bilan izolyatsiyani isbotla.",
      "points": 8
    },
    "p2": {
      "id": "23.P2",
      "dayNumber": 23,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "20-kundagi loyihani yangi toza venvda `requirements",
      "description": "20-kundagi loyihani yangi toza venvda `requirements.txt` orqali tikla. `pip check` va import smoke-test yoz. `.venv`, `__pycache__`, `.env` ni `.gitignore` ga kirit.",
      "points": 8
    },
    "p3": {
      "id": "23.P3",
      "dayNumber": 23,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Environment doctor",
      "description": "Environment doctor. `sys.version`, `sys.executable`, `sys.prefix != sys.base_prefix`, kerakli package versiyalarini chiqaruvchi script yoz. Paket yo‘q bo‘lsa ham script yiqilmasin; yakunda `OK` yoki `FAIL`. `importlib.metadata` ishlatish mumkin.",
      "points": 8
    }
  },
  {
    "dayNumber": 24,
    "title": "24 — Statistics",
    "topic": "Statistics",
    "group": "21-25",
    "groupTitle": "21–25 kunlar: OOP, Scraping, Venv, Statistics, Pandas",
    "t1": {
      "id": "24.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Qaysi metrika ekstremal qiymatga kamroq sezgir?",
      "options": [
        "A) mean",
        "B) median",
        "C) range",
        "D) variance"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "24.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "from statistics import mean, median, pvariance\nprint(mean([1,2,3,4]), median([1,2,3,4]), pvariance([1,2,3,4]))",
      "expectedOutput": "2.5 2.5 1.25",
      "explanation": "`2.5 2.5 1.25`.",
      "points": 2
    },
    "t3": {
      "id": "24.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`statistics.stdev([5])` xato beradi. Nega? Bitta qiymat uchun population stdev qancha?",
      "buggyCode": "statistics.stdev([5])",
      "explanation": "Sample stdev uchun kamida 2 qiymat kerak; `pstdev([5])` = 0.",
      "points": 2
    },
    "p1": {
      "id": "24.P1",
      "dayNumber": 24,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "NumPy va statistics yordamida `[2,4,4,4,5,5,7,9]` uchun mean, median, population variance/std va sample variance/stdni hisobla",
      "description": "NumPy va statistics yordamida `[2,4,4,4,5,5,7,9]` uchun mean, median, population variance/std va sample variance/stdni hisobla. Population mean=5, variance=4, std=2. Formulani qo‘lda ham yoz va taqqosla.",
      "points": 8
    },
    "p2": {
      "id": "24.P2",
      "dayNumber": 24,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Z-score outlier detector",
      "description": "Z-score outlier detector. `[10,11,9,10,12,100]` uchun population mean/std, har nuqta z-score va `abs(z)>2` bo‘lgan qiymatlarni qaytar. Std=0 bo‘lsa outlier yo‘q. `[5,5,5]` ni tekshir.",
      "points": 8
    },
    "p3": {
      "id": "24.P3",
      "dayNumber": 24,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "A/B tahlili",
      "description": "A/B tahlili. A: `[12,13,15,14,100]`, B: `[19,20,21,20,22]`. Mean, median, std va eng katta qiymat olib tashlangandagi meanlarni solishtir. Qaysi guruh barqarorroq? Kichik sample asosida sababiy yoki statistik ahamiyatli xulosa chiqarmaslikni tushuntir.",
      "points": 8
    }
  },
  {
    "dayNumber": 25,
    "title": "25 — Pandas",
    "topic": "Pandas",
    "group": "21-25",
    "groupTitle": "21–25 kunlar: OOP, Scraping, Venv, Statistics, Pandas",
    "t1": {
      "id": "25.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "`df.loc` va `df.iloc` farqi?",
      "options": [
        "A) label/position",
        "B) position/label",
        "C) ikkalasi faqat ustun",
        "D) farq yo‘q"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "25.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "import pandas as pd\ndf = pd.DataFrame({'g':['A','A','B'],'x':[2,4,9]})\nprint(df.groupby('g')['x'].sum().to_dict())",
      "expectedOutput": "{'A': 6, 'B': 9}",
      "explanation": "`{'A': 6, 'B': 9}`.",
      "points": 2
    },
    "t3": {
      "id": "25.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`df.dropna()` chaqirildi, lekin original dfda NaN qoldi. Nima uchun? To‘g‘rila.",
      "buggyCode": "df.dropna()",
      "explanation": "Default yangi DataFrame qaytaradi; `df = df.dropna()` yoki mos holda inplace.",
      "points": 2
    },
    "p1": {
      "id": "25.P1",
      "dayNumber": 25,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Data cleaning",
      "description": "Data cleaning. CSVda id, age, score mavjud; duplicate idlarda oxirgi yozuvni saqla, age va score ni numericga aylantir, age missing ni valid median bilan to‘ldir, score 0–100 dan tashqarida yoki missing bo‘lsa qatorni chiqar. Oldin/keyin qator soni va NaN hisoboti.",
      "points": 8
    },
    "p2": {
      "id": "25.P2",
      "dayNumber": 25,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Savdo dashboard dataset",
      "description": "Savdo dashboard dataset. `date,category,qty,price` ustunlaridan revenue yarat. Oy va kategoriya bo‘yicha groupby, eng daromadli 3 kategoriya (tie alifbo), oylar o‘sish foizi (oldingi oy 0 yoki yo‘q bo‘lsa NaN). Kamida 2 oy, 3 kategoriya, 1 invalid yozuvli fixture.",
      "points": 8
    },
    "p3": {
      "id": "25.P3",
      "dayNumber": 25,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Student risk dataset",
      "description": "Student risk dataset. `student_id,score,attendance,credits` asosida features jadvali yarat. Missing qiymatlar hisobotini chiqarmasdan yashirma; score<50 yoki attendance<60 bo‘lsa risk=True, ikkalasi ham ma'lum va shart bajarilmasa False, aks holda noma'lum. Risk foizi faqat aniqlanganlar orasida; boshqa guruhga missinglarni alohida chiqar. Bu ML model emas, qoida asosidagi tahlil.",
      "points": 8
    }
  },
  {
    "dayNumber": 26,
    "title": "26 — Python Web",
    "topic": "Python Web",
    "group": "26-30",
    "groupTitle": "26–30 kunlar: Flask, MongoDB, API, yakuniy loyihalar",
    "t1": {
      "id": "26.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Flask route nima?",
      "options": [
        "A) URLni Python handlerga bog‘laydi",
        "B) database index",
        "C) CSS klass",
        "D) pip paketi"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "26.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "`@app.route('/hello/<name>')` handleri `return f'Hi {name}'` qilsa, `/hello/Ali` nima qaytaradi?",
      "code": "",
      "expectedOutput": "Hi Ali (200, boshqa sozlama bo‘lmasa)",
      "explanation": "`Hi Ali` (200, boshqa sozlama bo‘lmasa).",
      "points": 2
    },
    "t3": {
      "id": "26.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`request.form['name']` POSTda maydon yo‘q bo‘lsa xato. Forma validatsiyasini qanday qilasan?",
      "buggyCode": "request.form['name']",
      "explanation": "`request.form.get('name')` ni olib tekshir; yo‘q/bo‘sh bo‘lsa aniq 400 yoki forma xabari qaytar.",
      "points": 2
    },
    "p1": {
      "id": "26.P1",
      "dayNumber": 26,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Flask mini kalkulyator: GET forma, POST natija; plus/minus/multiply/divide",
      "description": "Flask mini kalkulyator: GET forma, POST natija; plus/minus/multiply/divide. Noto‘g‘ri son va 0 ga bo‘lishda xato xabari. 5 ta Flask test client testi.",
      "points": 8
    },
    "p2": {
      "id": "26.P2",
      "dayNumber": 26,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Mahalliy task web app",
      "description": "Mahalliy task web app. HTML template, add/complete/list; dastlab in-memory saqlash. Task title bo‘sh bo‘lmasin, noto‘g‘ri ID 404; GET orqali holat o‘zgarmasin, POST ishlat. Foydalanuvchi matnini HTMLga xavfsiz render qil.",
      "points": 8
    },
    "p3": {
      "id": "26.P3",
      "dayNumber": 26,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Mahsulot katalogi",
      "description": "Mahsulot katalogi. Flask + Jinja: 20 ta qo‘lda yaratilgan fixture mahsulot; qidiruv, category filter, price range va pagination. Query parametrlar birga ishlasin; noto‘g‘ri range/page rad etilsin; mahsulot detailda 404. Kamida 8 test.",
      "points": 8
    }
  },
  {
    "dayNumber": 27,
    "title": "27 — Python with MongoDB",
    "topic": "Python with MongoDB",
    "group": "26-30",
    "groupTitle": "26–30 kunlar: Flask, MongoDB, API, yakuniy loyihalar",
    "t1": {
      "id": "27.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "MongoDB documentni Python bilan o‘qiganda odatda qanday turga mos keladi?",
      "options": [
        "A) dict",
        "B) tuple",
        "C) set",
        "D) int"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "27.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "`update_one({'sku':'A'},{'$inc':{'stock':-2}})` oldingi stock=7 bo‘lsa yangisi qancha?",
      "code": "",
      "expectedOutput": "5 (document mos kelgan va update muvaffaqiyatli bo‘lsa)",
      "explanation": "5 (document mos kelgan va update muvaffaqiyatli bo‘lsa).",
      "points": 2
    },
    "t3": {
      "id": "27.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`find_one({'sku':'missing'})['stock']` nima uchun yiqiladi? Tuzat.",
      "buggyCode": "find_one({'sku':'missing'})['stock']",
      "explanation": "`find_one` None qaytaradi; document None emasligini tekshir.",
      "points": 2
    },
    "p1": {
      "id": "27.P1",
      "dayNumber": 27,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Mahalliy test MongoDBda products CRUD",
      "description": "Mahalliy test MongoDBda products CRUD. sku unique index, name, price, stock; duplicate SKU va invalid miqdorlarni rad et. Database ulanish satrini kodga yozma; env orqali ol. Test database nomi alohida.",
      "points": 8
    },
    "p2": {
      "id": "27.P2",
      "dayNumber": 27,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Atomic stock reserve",
      "description": "Atomic stock reserve. Sku va qty uchun bitta `update_one` da `stock >= qty` sharti bilan `$inc` bajar. 5 stock, 4 va 4 rezerv → faqat bittasi muvaffaqiyatli, qoldiq 1. Return matched/modified natijasini tekshir; qty>0.",
      "points": 8
    },
    "p3": {
      "id": "27.P3",
      "dayNumber": 27,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Orders analytics",
      "description": "Orders analytics. Order documentlarda status, created_at, items (sku,qty,price). Faqat paid orderlar bo‘yicha aggregation: unwind, revenue hisoblash, SKU bo‘yicha group, top-5 sort, sana filter. 4–5 fixture order bilan kutilgan hisobni qo‘lda tekshir.",
      "points": 8
    }
  },
  {
    "dayNumber": 28,
    "title": "28 — API",
    "topic": "API",
    "group": "26-30",
    "groupTitle": "26–30 kunlar: Flask, MongoDB, API, yakuniy loyihalar",
    "t1": {
      "id": "28.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "HTTP 429 nimani bildiradi?",
      "options": [
        "A) Not Found",
        "B) Too Many Requests",
        "C) Unauthorized",
        "D) OK"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "28.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "payload = {'data':[{'id':1,'active':True},{'id':2,'active':False}]}\nprint([x['id'] for x in payload['data'] if x['active']])",
      "expectedOutput": "[1]",
      "explanation": "`[1]`.",
      "points": 2
    },
    "t3": {
      "id": "28.T3",
      "title": "Debugging (Level 3)",
      "prompt": "`requests.get(url).json()` da qaysi 3 holat muammo tug‘dirishi mumkin? Yechim strategiyasi?",
      "buggyCode": "requests.get(url).json()",
      "explanation": "Timeout/tarmoq xatosi; HTTP error; JSON parse yoki schema xatosi. Timeout, status tekshiruvi, alohida exception va validation.",
      "points": 2
    },
    "p1": {
      "id": "28.P1",
      "dayNumber": 28,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "API client",
      "description": "API client. `requests` bilan ruxsat etilgan demo API dan items ol; timeout, raise_for_status va response schema tekshir. `fetch_items()` xatoda boshqariladigan natija qaytarsin. Tarmoqsiz test uchun fake response yoki unittest.mock ishlat.",
      "points": 8
    },
    "p2": {
      "id": "28.P2",
      "dayNumber": 28,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Pagination collector",
      "description": "Pagination collector. Mock APIda `items` va `next` bor. Barcha sahifalarni yig‘, duplicate idlarni birinchi uchrashuv bo‘yicha olib tashla, takrorlangan next yoki max_pages ga yetganda aniq to‘xta. 3 sahifali va loop fixture test qil.",
      "points": 8
    },
    "p3": {
      "id": "28.P3",
      "dayNumber": 28,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Retry/cache client",
      "description": "Retry/cache client. GET so‘rovida faqat vaqtinchalik xatolar (429, 502, 503, 504 va timeout) uchun max 3 urinish; backoff va Retry-Afterni hisobga ol (cheklangan kutish). 400/401/404 ni qaytarma. Muvaffaqiyatli response uchun 60s lokal cache; testlarda fake clock/sleep, haqiqiy kutish yo‘q.",
      "points": 8
    }
  },
  {
    "dayNumber": 29,
    "title": "29 — Building API",
    "topic": "Building API",
    "group": "26-30",
    "groupTitle": "26–30 kunlar: Flask, MongoDB, API, yakuniy loyihalar",
    "t1": {
      "id": "29.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Yangi resource yaratilganda mos status?",
      "options": [
        "A) 201",
        "B) 404",
        "C) 500",
        "D) 304"
      ],
      "correctLetter": "A",
      "explanation": "A.",
      "points": 2
    },
    "t2": {
      "id": "29.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Stock=7. API `reserve(3)` muvaffaqiyatli, keyin `reserve(5)` stock yetmasa 409 qaytaradi va holatni o‘zgartirmaydi. Yakuniy stock?",
      "code": "",
      "expectedOutput": "4; ikkinchi request 409",
      "explanation": "4; ikkinchi request 409.",
      "points": 2
    },
    "t3": {
      "id": "29.T3",
      "title": "Debugging (Level 3)",
      "prompt": "API har qanday noto‘g‘ri JSONga 500 qaytaradi. Nima noto‘g‘ri? Status va validatsiya strategiyasi?",
      "buggyCode": "",
      "explanation": "Client xatosi 400 (yoki API shartnomasiga mos 422); JSON sintaksisi, maydon turlari va biznes qoidalari tekshirilsin. 500 kutilmagan server xatosi uchun.",
      "points": 2
    },
    "p1": {
      "id": "29.P1",
      "dayNumber": 29,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Flask REST task API: GET/POST `/tasks`, GET/PATCH/DELETE `/tasks/<id>`",
      "description": "Flask REST task API: GET/POST `/tasks`, GET/PATCH/DELETE `/tasks/<id>`. Title, done validation; 201 create, 404 missing, 400 invalid, 204 delete. Flask test clientda kamida 10 test.",
      "points": 8
    },
    "p2": {
      "id": "29.P2",
      "dayNumber": 29,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Inventory API: products CRUD, qidiruv/filter/page, stock reserve endpoint",
      "description": "Inventory API: products CRUD, qidiruv/filter/page, stock reserve endpoint. SKU unique, price>=0, qty musbat int, stock yetmasa 409. MongoDB test bazasida atomic update; 2 concurrent rezerv testini yoz.",
      "points": 8
    },
    "p3": {
      "id": "29.P3",
      "dayNumber": 29,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Batch API",
      "description": "Batch API. POST `/batch` ga 1–10 ta mustaqil `{id,sku,qty}` request keladi; har biriga indexed result, bitta invalid item qolganlarini to‘xtatmasin. Takroriy id butun batch uchun 400; valid batchda 200 va individual statuslar. Bir mahsulot rezervlarini input tartibida bajar; concurrency bonus uchun turli SKUlarni parallel ishlatib ko‘r, natijalar input tartibida qolsin.",
      "points": 8
    }
  },
  {
    "dayNumber": 30,
    "title": "30 — Conclusions — yakuniy integratsiya",
    "topic": "Conclusions — yakuniy integratsiya",
    "group": "26-30",
    "groupTitle": "26–30 kunlar: Flask, MongoDB, API, yakuniy loyihalar",
    "t1": {
      "id": "30.T1",
      "title": "Nazariy Test (Level 1)",
      "question": "Katta datasetni fayldan qayta ishlashda eng asosli yo‘l qaysi?",
      "options": [
        "A) hammasini har doim RAMga yuklash",
        "B) kerak bo‘lsa satr/chunk bo‘yicha ishlash",
        "C) exceptionni yashirish",
        "D) faqat global o‘zgaruvchi"
      ],
      "correctLetter": "B",
      "explanation": "B.",
      "points": 2
    },
    "t2": {
      "id": "30.T2",
      "title": "Output Prediction (Level 2)",
      "prompt": "Natijani top:",
      "code": "orders = [{'qty':2,'price':10,'status':'paid'}, {'qty':3,'price':5,'status':'cancelled'}]\nprint(sum(o['qty']*o['price'] for o in orders if o['status']=='paid'))",
      "expectedOutput": "20",
      "explanation": "`20`.",
      "points": 2
    },
    "t3": {
      "id": "30.T3",
      "title": "Debugging (Level 3)",
      "prompt": "Endpoint 200 qaytaradi, lekin noto‘g‘ri total hisoblaydi. Faqat status test yetarlimi? Qanday boshqa testlar kerak?",
      "buggyCode": "",
      "explanation": "Yo‘q. Response body, hisob-kitob, validatsiya, side effect, bo‘sh/chegara holatlar va xatodagi o‘zgarmas state testlari kerak.",
      "points": 2
    },
    "p1": {
      "id": "30.P1",
      "dayNumber": 30,
      "level": 3,
      "levelLabel": "Level 3 — Asosiy Mashq",
      "title": "Mini loyiha A — Legal Document Search",
      "description": "Mini loyiha A — Legal Document Search. Mahalliy JSONda qonun id/title/text; regex bilan moddalarga ajrat, normalizatsiya, query so‘zlari bilan oddiy lexical score (kesishma yoki chastota), top-5 natija, manba id/modda. Teng score: id, modda tartibi. 20 ta sun'iy fixture va 10 test; natija topilmasa bo‘sh list. Flask API bonus. Bu RAG emas, uning retrieval asoslarini mashq qilish.",
      "points": 8
    },
    "p2": {
      "id": "30.P2",
      "dayNumber": 30,
      "level": 4,
      "levelLabel": "Level 4 — Problem Solving",
      "title": "Mini loyiha B — PC Inventory & Orders",
      "description": "Mini loyiha B — PC Inventory & Orders. Mahsulotlar va order MongoDB yoki JSON test storage; SKU CRUD, atomic yoki bir jarayonli xavfsiz rezerv, discount/tax, paid/cancel status, kunlik hisobot CSV. Flask API, unit/integration testlar; paytda stock manfiy bo‘lmasin. READMEda arxitektura va xato holatlari.",
      "points": 8
    },
    "p3": {
      "id": "30.P3",
      "dayNumber": 30,
      "level": 5,
      "levelLabel": "Level 5 — Real-world Challenge",
      "title": "Mini loyiha C — Data Quality Pipeline",
      "description": "Mini loyiha C — Data Quality Pipeline. Ruxsat etilgan API yoki offline fixture → extract → validate/normalize → duplicate idlarni tozalash → JSON/CSV → Pandas statistik hisobot → Flask summary API. Buzilgan yozuvlar alohida log; qayta run duplicate yaratmasin. Kamida 20 fixture, 5 invalid, 15 test; timeout va bo‘sh dataset sinovi. Faqat repo mavzulari, ML yoki tashqi orchestrator shart emas.",
      "points": 8
    }
  }
];
