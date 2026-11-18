import fs from 'node:fs';

const raw = JSON.parse(fs.readFileSync('docs/python/python_344_curriculum.json', 'utf8'));

// Curated overrides for environment/CLI lessons that have prose notes
const CURATED_EXAMPLES = {
  "py-01-01": {
    code1: `# 1-misol: Python'da ilk dastur\nprint("Assalomu alaykum, Python dasturlash dunyosiga xush kelibsiz!")`,
    out1: "Assalomu alaykum, Python dasturlash dunyosiga xush kelibsiz!",
    code2: `# 2-misol: Oddiy arifmetik hisob va matnni chiqarish\nyosh = 20\nprint(f"Mening yoshim: {yosh}")`,
    out2: "Mening yoshim: 20",
    mistake: "print() funksiyasini katta 'Print' deb yozish",
    symptom: "NameError: name 'Print' is not defined",
    correction: "Python registrga sezgir (case-sensitive) til; har doim kichik harflarda 'print()' deb yozing."
  },
  "py-01-02": {
    code1: `# 1-misol: .py skript fayli ichidagi manba kodi\nxabar = "Python skripti interpretator orqali bajarilmoqda"\nprint(xabar)`,
    out1: "Python skripti interpretator orqali bajarilmoqda",
    code2: `# 2-misol: Foydalanuvchi ma'lumotlarini qabul qilish va formatlash\ndasturchi = "Alisher"\nloyha = "AI Platform"\nprint(f"{dasturchi} '{loyha}' loyihasi ustida ishlamoqda.")`,
    out2: "Alisher 'AI Platform' loyihasi ustida ishlamoqda.",
    mistake: "Fayl kengaytmasini .txt qilib saqlash yoki terminalda fayl yo'lini noto'g'ri ko'rsatish",
    symptom: "Fayl ochilmaydi yoki oddiy matn sifatida ochiladi",
    correction: "Python fayli har doim '.py' kengaytmasi bilan saqlanishi kerak (masalan, main.py)."
  },
  "py-01-03": {
    code1: `# 1-misol: Python versiyasini dastur ichidan aniqlash\nimport sys\nprint(f"Python versiyasi: {sys.version_info.major}.{sys.version_info.minor}")`,
    out1: "Python versiyasi: 3.12",
    code2: `# 2-misol: Python 3 talabiga muvofiqlikni tekshirish\nimport sys\nis_python3 = sys.version_info.major >= 3\nprint("Python 3 yoki undan yuqori:", is_python3)`,
    out2: "Python 3 yoki undan yuqori: True",
    mistake: "Tizimda eski Python 2 va yangi Python 3 o'rtasida chalkashish",
    symptom: "Sintaksis farqlari tufayli xatolar yuzaga keladi",
    correction: "Har doim 'python --version' yoki 'python3 --version' orqali 3.10+ versiya ishlatilayotganini tekshiring."
  },
  "py-01-04": {
    code1: `# 1-misol: Terminaldagi ishchi papka bilan ishlash\nimport os\nprint("Joriy papka mavjud:", os.path.exists("."))`,
    out1: "Joriy papka mavjud: True",
    code2: `# 2-misol: Ishchi papka nomini aniqlash\nimport os\nprint("Joriy papka nomi:", os.path.basename(os.getcwd()) or "root")`,
    out2: "Joriy papka nomi: ai platform",
    mistake: "Fayl saqlangan papkaga terminaldan o'tmasdan 'python script.py' buyrug'ini berish",
    symptom: "FileNotFoundError yoki No such file or directory",
    correction: "Avval 'cd papka_nomi' orqali skript joylashgan manzilga o'ting, so'ng faylni ishga tushiring."
  },
  "py-01-05": {
    code1: `# 1-misol: REPL va .py fayl farqi: skriptda ifodani ko'rish uchun print() shart\na = 2 + 3\nprint("Ifoda natijasi:", a)`,
    out1: "Ifoda natijasi: 5",
    code2: `# 2-misol: Natijani stdout oqimiga chiqarish\nism = "Botir"\nball = 95\nprint(f"Talaba: {ism}, To'plagan ball: {ball}")`,
    out2: "Talaba: Botir, To'plagan ball: 95",
    mistake: "Skript ichida faqat '2 + 3' deb yozib, natija terminalda ko'rinmaganidan hayron bo'lish",
    symptom: "Skript xatosiz tugaydi, lekin ekranga hech narsa chiqmaydi",
    correction: "REPL avtomatik qiymatni ko'rsatadi, ammo .py faylida har qanday qiymat 'print()' orqali chiqarilishi kerak."
  },
  "py-01-06": {
    code1: `# 1-misol: Skript bajarilishining boshlanishi va tugashi\nprint("Dastur boshlandi...")\nprint("Hisob-kitoblar bajarildi.")\nprint("Dastur muvaffaqiyatli yakunlandi.")`,
    out1: "Dastur boshlandi...\nHisob-kitoblar bajarildi.\nDastur muvaffaqiyatli yakunlandi.",
    code2: `# 2-misol: Bir nechta ma'lumotni ketma-ket chiqarish\nversiya = "1.0.0"\nmuallif = "Python Akademiyasi"\nprint(f"Dastur: {muallif}, Versiya: {versiya}")`,
    out2: "Dastur: Python Akademiyasi, Versiya: 1.0.0",
    mistake: "Skript nomida bo'sh joy (probel) ishlatish (masalan, 'mening kodim.py')",
    symptom: "Terminal probeldan keyingi qismni alohida argument deb tushunib xato beradi",
    correction: "Fayl nomlarida probel o'rniga tagchiziq (_) yoki defis (-) ishlating (masalan, 'mening_kodim.py')."
  },
  "py-01-07": {
    code1: `# 1-misol: print() ning sep va end parametrlari\nprint("Python", "AI", "Data", sep="-")\nprint("Yuklanmoqda", end="...")\nprint(" Tayyor!")`,
    out1: "Python-AI-Data\nYuklanmoqda... Tayyor!",
    code2: `# 2-misol: Bo'sh qator va maxsus formatlash\nprint("1-qator")\nprint() # bo'sh qator\nprint("3-qator", end=" [TUGADI]\\n")`,
    out2: "1-qator\n\n3-qator [TUGADI]",
    mistake: "sep va end argumentlarini print ichida matndan oldin qo'yish yoki noto'g'ri nomlash",
    symptom: "TypeError: unexpected keyword argument",
    correction: "sep va end har doim chop etiladigan qiymatlardan keyin kalit so'z sifatida berilishi kerak."
  },
  "py-01-08": {
    code1: `# 1-misol: Foydalanuvchidan ma'lumot olish (simulyatsiya)\nism = "Dilshod" # input("Ismingizni kiriting: ") o'rniga namuna\nprint(f"Assalomu alaykum, {ism}!")`,
    out1: "Assalomu alaykum, Dilshod!",
    code2: `# 2-misol: input() qaytargan ma'lumot har doim str ekanligi\nyosh_matn = "25"\nyosh_son = int(yosh_matn)\nprint(f"Kelasi yili yoshingiz: {yosh_son + 1}")`,
    out2: "Kelasi yili yoshingiz: 26",
    mistake: "input() dan kelgan qiymatni to'g'ridan-to'g'ri son bilan qo'shish (matn + son)",
    symptom: "TypeError: can only concatenate str (not 'int') to str",
    correction: "Arifmetik amallar bajarishdan avval 'int()' yoki 'float()' orqali son turiga o'giring."
  },
  "py-01-09": {
    code1: `# 1-misol: To'g'ri Indentation (4 ta bo'shliq)\nifoda = True\nif ifoda:\n    print("Shart bajarildi - blok ichida 4 ta bo'shliq bor")\nprint("Blokdan tashqaridagi kod")`,
    out1: "Shart bajarildi - blok ichida 4 ta bo'shliq bor\nBlokdan tashqaridagi kod",
    code2: `# 2-misol: Ichma-ich bloklar (Nested blocks)\nson = 10\nif son > 0:\n    print("Son musbat")\n    if son % 2 == 0:\n        print("Son juft (8 ta bo'shliq)")`,
    out2: "Son musbat\nSon juft (8 ta bo'shliq)",
    mistake: "Tab va bo'shliqlarni (space) aralashtirib yuborish yoki qator boshida tasodifiy probel qoldirish",
    symptom: "IndentationError: unexpected indent yoki unindent does not match any outer indentation level",
    correction: "Har doim 4 ta bo'sh joy (space) ishlating va zamonaviy matn muharririda indent sozlamasini 4 spaces qilib belgilang."
  },
  "py-01-10": {
    code1: `# 1-misol: To'g'ri tuzilgan sintaksis\nprint("Qavslar va qo'shtirnoqlar to'liq yopilgan")`,
    out1: "Qavslar va qo'shtirnoqlar to'liq yopilgan",
    code2: `# 2-misol: Ko'p qatorli matn va maxsus belgilar\nmatn = "1-qator\\n2-qator\\n3-qator"\nprint(matn)`,
    out2: "1-qator\n2-qator\n3-qator",
    mistake: "Ochilgan qo'shtirnoqni yoki qavsni yopishni unutish (masalan: print('Salom )",
    symptom: "SyntaxError: unterminated string literal yoki '(' was never closed",
    correction: "Har bir ochilgan qavs va qo'shtirnoq o'z jufti bilan yopilganini diqqat bilan tekshiring."
  },
  "py-01-11": {
    code1: `# 1-misol: Bir qatorli izohlar (#)\n# Ushbu kod foydalanuvchini tabriklaydi\nism = "Sanjar"\nprint(f"Tabriklaymiz, {ism}!") # qator oxiridagi izoh`,
    out1: "Tabriklaymiz, Sanjar!",
    code2: `# 2-misol: Kod mantig'ini tushuntirish\n# Narxga QQS (12%) qo'shish formulasini hisoblaymiz:\nasosiy_narx = 100000\nqqs_stavka = 0.12\nжами = asosiy_narx * (1 + qqs_stavka)\nprint("Jami to'lov:", jami)`,
    out2: "Jami to'lov: 112000.0",
    mistake: "Koddagi o'z-o'zidan ma'lum narsani keraksiz takrorlovchi izohlar yozish (masalan: x = 5 # x ga 5 berildi)",
    symptom: "Kod o'qilishini qiyinlashtiradi va visual shovqin yaratadi",
    correction: "Izohlarda 'nima qilingani' emas, 'nima uchun shunday qilingani' (mantiq va sabab) yozilishi maqsadga muvofiq."
  },
  "py-01-12": {
    code1: `# 1-misol: Hello World CLI kartochkasi\nism = "Olim"\nkasb = "Python Developer"\nprint("=" * 30)\nprint(f"KARTA: {ism} | {kasb}")\nprint("=" * 30)`,
    out1: "==============================\nKARTA: Olim | Python Developer\n==============================",
    code2: `# 2-misol: Interaktiv CLI hisobot namunasi\nshahar = "Samarqand"\ntemperatura = 22\nprint(f"Ob-havo ma'lumoti: {shahar} shahrida havo harorati {temperatura}°C.")`,
    out2: "Ob-havo ma'lumoti: Samarqand shahrida havo harorati 22°C.",
    mistake: "Chiqarish formatida qatorlarni chigal qilib stdout ga tartibsiz chiqarish",
    symptom: "Foydalanuvchi interfeysni tushunmay qoladi",
    correction: "Ajratuvchi chiziqlar ('=' * 30) va tartibli f-stringlar yordamida chiroyli terminal formati yarating."
  }
};

console.log('Curated examples count:', Object.keys(CURATED_EXAMPLES).length);
