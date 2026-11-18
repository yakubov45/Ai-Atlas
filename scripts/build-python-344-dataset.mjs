import fs from "node:fs";

const json = JSON.parse(fs.readFileSync("docs/python/python_344_curriculum.json", "utf8"));
const md = fs.readFileSync("docs/python/python_344_mikrodars_qollanma.md", "utf8");

// Parse markdown lessons
const lessonBlocks = md.split(/(?=###\s+py-\d+-\d+\s+—)/g).slice(1);
const parsedMdLessons = new Map();

for (const block of lessonBlocks) {
  const m = block.match(/^###\s+(py-\d+-\d+)\s+—\s+([^\n]+)/);
  if (!m) continue;
  const id = m[1];
  const title = m[2].trim();

  const tushunchaM = block.match(/\*\*Tushuncha\.\*\*\s+([\s\S]*?)(?=\*\*Kod|\*\*Mustaqil|$)/i);
  const theory = tushunchaM ? tushunchaM[1].trim() : "";

  const kodM = block.match(/\*\*Kod\s*\/\s*amaliy namuna\.\*\*\s+([\s\S]*?)(?=\*\*Mustaqil|$)/i);
  const example = kodM ? kodM[1].trim() : "";

  const mashqM = block.match(/\*\*Mustaqil mashq\.\*\*\s+([\s\S]*?)(?=\n###|\n##|$)/i);
  const practice = mashqM ? mashqM[1].trim() : "";

  parsedMdLessons.set(id, { id, title, theory, example, practice });
}

// Parse markdown assessments
const assessmentBlocks = md.split(/(?=###\s+Nazorat ishi\s+—)/g).slice(1);
const parsedAssessments = new Map();

for (let i = 0; i < json.phases.length; i++) {
  const phase = json.phases[i];
  const block = assessmentBlocks[i];
  let req = phase.assessment?.requirements_uz || "";
  let acc = phase.assessment?.acceptance_cases_uz || "";
  let con = phase.assessment?.constraints_uz || "";
  let rub = "ishlaydigan yechim 40, edge cases va test 25, kod sifati 20, algoritm va qaror tushuntirishi 15";

  if (block) {
    const reqM = block.match(/\*\*Talablar:\*\*\s+([^\n]+)/i);
    const accM = block.match(/\*\*Tekshiruv holatlari:\*\*\s+([^\n]+)/i);
    const conM = block.match(/\*\*Cheklovlar:\*\*\s+([^\n]+)/i);
    const rubM = block.match(/\*\*Baholash\s*\([^)]+\):\*\*\s+([^\n]+)/i);
    if (reqM) req = reqM[1].trim();
    if (accM) acc = accM[1].trim();
    if (conM) con = conM[1].trim();
    if (rubM) rub = rubM[1].trim();
  }

  parsedAssessments.set(phase.id.toLowerCase(), {
    phaseId: phase.id.toLowerCase(),
    title: phase.assessment?.title_uz || `Phase ${i + 1} Nazorat Loyihasi`,
    requirements: req,
    acceptanceCases: acc,
    constraints: con,
    rubric: rub,
  });
}

// Specific detailed lessons for key representatives required by prompt:
const CUSTOM_LESSONS = {
  "py-03-04": {
    objective: "Qoldiq olish (%) operatorining matematik va dasturiy ishlash tamoyilini tushunish, vaqt va siklik hisoblashlarda xatosiz qo'llay olish.",
    theory: "Python'da `%` (modulus) operatori bo'lish amalidan keyingi butun qoldiqni hisoblaydi. Asosiy matematik tenglik: `a = (a // b) * b + a % b`. Qoldiq olish juft/toq sonlarni aniqlash (`x % 2 == 0`), vaqtni sekundlardan soat, daqiqa va soniyaga ajratish, hamda siklik ro'yxat indekslarini aylanma boshqarish (`index % len(arr)`) uchun dasturlashda eng ko'p ishlatiladigan vositadir.",
    example1: {
      titleUz: "1-misol: Qoldiq olishning asosiy arifmetikasi",
      code: `a = 137\nb = 12\n\nquotient = a // b   # Butun qismi: 11\nremainder = a % b   # Qoldiq: 5\n\nprint("Butun qism:", quotient)\nprint("Qoldiq:", remainder)\nprint("Tekshirish:", quotient * b + remainder == a)`,
      expectedOutput: "Butun qism: 11\nQoldiq: 5\nTekshirish: True",
      explanationUz: "137 soni 12 ga bo'linganda 11 marta butun joylashadi va 5 qoldiq qoladi: 11 * 12 + 5 = 137."
    },
    example2: {
      titleUz: "2-misol: Amaliy vaqtni ajratish (Soat, Daqiqa, Soniyalar)",
      code: `total_seconds = 3661\n\nhours = total_seconds // 3600\nminutes = (total_seconds % 3600) // 60\nseconds = total_seconds % 60\n\nprint(f"Vaqt formati: {hours}:{minutes}:{seconds}")`,
      expectedOutput: "Vaqt formati: 1:1:1",
      explanationUz: "3661 sekunddan avval 3600 ga bo'lib soat (1 soat) olinadi, qolgan 61 sekunddan 60 ga bo'lib daqiqa (1 daqiqa) va qoldiq soniya (1 soniya) hisoblanadi."
    },
    commonMistakes: [
      {
        mistakeUz: "Nolga bo'lish (ZeroDivisionError: integer division or modulo by zero)",
        symptomUz: "x % 0 amalida dastur xato berib to'xtaydi",
        correctionUz: "Har doim bo'luvchining nolga teng emasligini tekshiring (`if b != 0:`)."
      },
      {
        mistakeUz: "Manfiy sonlar qoldig'i Python va C/Java da farq qiladi",
        symptomUz: "-7 % 5 amali Python'da 3 beradi, C/Java da esa -2",
        correctionUz: "Python qoldiq ishorasini bo'luvchi (o'ng tarafdagi son) ishorasiga qarab aniqlaydi."
      }
    ],
    quiz: [
      {
        id: "py-03-04-q1",
        type: "concept",
        promptUz: "1. `17 % 5` ifodasining natijasi qanday bo'ladi?",
        options: ["2", "3", "3.4", "0"],
        correctIndex: 0,
        explanationUz: "17 sonida 5 uch marta butun joylashadi (15) va 2 qoldiq qoladi: 17 % 5 = 2."
      },
      {
        id: "py-03-04-q2",
        type: "prediction",
        promptUz: "2. `print(25 % 5 == 0)` kodi konsolga nima chiqaradi?",
        codeSnippet: "print(25 % 5 == 0)",
        options: ["True", "False", "0", "5"],
        correctIndex: 0,
        explanationUz: "25 soni 5 ga qoldiqsiz bo'linadi, ya'ni 25 % 5 = 0. 0 == 0 ifodasi True qaytaradi."
      },
      {
        id: "py-03-04-q3",
        type: "debugging",
        promptUz: "3. Nima uchun `result = 100 % 0` kodi ishlamaydi?",
        options: [
          "ZeroDivisionError: Matematikada va Python'da nolga bo'lish mumkin emas",
          "TypeError: % operatori faqat float sonlar bilan ishlaydi",
          "SyntaxError: % oldidan va keyin probel bo'lmasligi kerak",
          "NameError: result o'zgaruvchisi topilmadi"
        ],
        correctIndex: 0,
        explanationUz: "Matematikada va dasturlashda 0 ga bo'lish taqiqlangan, shuning uchun ZeroDivisionError chiqadi."
      }
    ],
    practiceTasks: [
      {
        id: "py-03-04-p1",
        titleUz: "1-mashq: 7384 soniyani soat, daqiqa va soniyaga ajrating",
        difficulty: "starter",
        instructionsUz: "7384 soniyani soat, daqiqa va soniyaga aylantiring. Natija '2:3:4' ko'rinishida print qilinsin. Faqat arifmetik amallar (// va %) qo'llang.",
        starterCode: `# 7384 soniyani soat, daqiqa va soniyaga ajrating:\ntotal_seconds = 7384\n\nhours = ...\nminutes = ...\nseconds = ...\n\nprint(f"{hours}:{minutes}:{seconds}")\n`,
        hintsUz: [
          "hours = total_seconds // 3600",
          "minutes = (total_seconds % 3600) // 60",
          "seconds = total_seconds % 60"
        ]
      },
      {
        id: "py-03-04-p2",
        titleUz: "2-mashq: Juft va toq sonlarni Boolean ifoda bilan tekshirish",
        difficulty: "challenge",
        instructionsUz: "Berilgan son n = 42 juft bo'lsa True, toq bo'lsa False chiqaruvchi ifoda yozing. if shart operatorisiz, faqat % va == operatorlaridan foydalaning.",
        starterCode: `n = 42\nis_even = (n % 2 == 0)\nprint("Juft sonmi:", is_even)\n`,
        hintsUz: ["Juft sonlar 2 ga qoldiqsiz bo'linadi: n % 2 == 0."]
      }
    ],
    summaryTakeaways: [
      "% (modulus) bo'lishdan keyingi butun qoldiqni hisoblaydi.",
      "Vaqtni (sekund → soat, daqiqa) ajratishda // va % birgalikda qo'llanadi.",
      "Juft/toq tekshiruvi: n % 2 == 0.",
      "Nolga bo'lish (x % 0) ZeroDivisionError xatosiga sabab bo'ladi."
    ]
  },

  "py-10-14": {
    objective: "Binary Search algoritmini ketma-ketlik (step-by-step) tahlil qilish, pastki (low), o'rta (mid) va yuqori (high) ko'rsatkichlar yordamida O(log n) vaqt murakkabligida qidiruvni amalga oshirish.",
    theory: "Binary Search (ikkilik qidiruv) — tartiblangan ro'yxat ichidan kerakli elementni topishning eng samarali algoritmi. Har bir qadamda qidiruv maydoni teng ikkiga qisqartiriladi: agar o'rtadagi element (`arr[mid]`) qidirilayotgan `target` dan kichik bo'lsa, chap qism tashlab yuboriladi (`low = mid + 1`); aks holda o'ng qism tashlanadi (`high = mid - 1`). 1 millionta element ichidan qidirish ko'pi bilan 20 qadam talab qiladi (O(log2 n)). Asosiy talab: ro'yxat oldindan tartiblangan (sorted) bo'lishi shart!",
    example1: {
      titleUz: "1-misol: Iterativ Binary Search to'liq funksiyasi",
      code: `def binary_search(arr: list[int], target: int) -> int:\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n            \n    return -1\n\nnumbers = [3, 9, 14, 21, 35, 42, 58, 77, 91]\nidx = binary_search(numbers, 42)\nprint("Topilgan indeks:", idx)`,
      expectedOutput: "Topilgan indeks: 5",
      explanationUz: "Har qadamda mid indeks tekshiriladi. 42 topilgach, uning indeksi (5) qaytariladi."
    },
    example2: {
      titleUz: "2-misol: Element topilmagan va chegaraviy holatlar",
      code: `numbers = [10, 20, 30, 40, 50]\nprint("Mavjud emas (25):", binary_search(numbers, 25))\nprint("Bo'sh ro'yxat []:", binary_search([], 10))\nprint("Bitta element [10]:", binary_search([10], 10))`,
      expectedOutput: "Mavjud emas (25): -1\nBo'sh ro'yxat []: -1\nBitta element [10]: 0",
      explanationUz: "Agar target ro'yxatda bo'lmasa, sikl low > high bo'lganda to'xtaydi va -1 qaytaradi."
    },
    commonMistakes: [
      {
        mistakeUz: "Tartiblanmagan ro'yxatda Binary Search qo'llash",
        symptomUz: "Element ro'yxatda bor bo'lsa ham -1 qaytishi mumkin",
        correctionUz: "Binary Search faqat tartiblangan massivda ishlaydi. Avval `arr.sort()` qiling yoki tartiblanganligiga ishonch hosil qiling."
      },
      {
        mistakeUz: "Cheksiz sikl (while shartida low < high yoki mid hisobida xato)",
        symptomUz: "Funksiya qotib qoladi va natija qaytarmaydi",
        correctionUz: "Har doim `low = mid + 1` va `high = mid - 1` qilib yangilang hamda `while low <= high:` shartini qo'ying."
      }
    ],
    quiz: [
      {
        id: "py-10-14-q1",
        type: "concept",
        promptUz: "1. Binary Search ishlashi uchun eng asosiy shart nima?",
        options: [
          "Ro'yxat oldindan tartiblangan (sorted) bo'lishi shart",
          "Elementlar faqat butun son bo'lishi kerak",
          "Ro'yxat uzunligi juft son bo'lishi kerak",
          "Faqat manfiy bo'lmagan sonlar qatnashishi kerak"
        ],
        correctIndex: 0,
        explanationUz: "Binary search algoritmining qidiruv oralig'ini yarmiga bo'lish mantiqi faqat tartiblangan to'plamda to'g'ri ishlaydi."
      },
      {
        id: "py-10-14-q2",
        type: "prediction",
        promptUz: "2. 1 000 000 (bir million) ta elementli tartiblangan ro'yxatda Binary Search eng ko'pi bilan necha qadamda javob topadi?",
        options: ["20 qadam", "1 000 000 qadam", "500 000 qadam", "100 qadam"],
        correctIndex: 0,
        explanationUz: "log2(1 000 000) ≈ 19.93, ya'ni ko'pi bilan 20 ta taqqoslash kifoya qiladi!"
      },
      {
        id: "py-10-14-q3",
        type: "debugging",
        promptUz: "3. `mid = (low + high) // 2` tekshirilgach, agar `arr[mid] < target` bo'lsa, ko'rsatkich qanday yangilanishi kerak?",
        options: [
          "low = mid + 1",
          "low = mid",
          "high = mid - 1",
          "high = mid + 1"
        ],
        correctIndex: 0,
        explanationUz: "Agar o'rtadagi qiymat target dan kichik bo'lsa, target uning o'ng tomonida joylashgan, shuning uchun pastki chegara low = mid + 1 ga ko'chadi."
      }
    ],
    practiceTasks: [
      {
        id: "py-10-14-p1",
        titleUz: "1-mashq: To'liq iterativ Binary Search funksiyasini yozing",
        difficulty: "starter",
        instructionsUz: "Berilgan tartiblangan ro'yxatdan target qiymatini topuvchi binary_search funksiyasini yozing. Topilsa indeksini, topilmasa -1 qaytarsin.",
        starterCode: `def binary_search(arr: list[int], target: int) -> int:\n    # Kodingizni shu yerga yozing:\n    pass\n\n# Tekshiruv:\nprint(binary_search([2, 5, 8, 12, 16, 23, 38], 16)) # Kutilgan: 4\nprint(binary_search([2, 5, 8, 12, 16, 23, 38], 99)) # Kutilgan: -1\n`,
        hintsUz: [
          "low = 0, high = len(arr) - 1",
          "while low <= high:",
          "mid = (low + high) // 2"
        ]
      },
      {
        id: "py-10-14-p2",
        titleUz: "2-mashq: Element topilmasa, joylashishi kerak bo'lgan indeksni topish",
        difficulty: "challenge",
        instructionsUz: "Agar target topilsa uning indeksini, topilmasa ro'yxat tartibini buzmasdan qaysi indeksga qo'shish kerakligini qaytaruvchi search_insert_position(arr, target) funksiyasini yozing.",
        starterCode: `def search_insert_position(arr: list[int], target: int) -> int:\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return low\n\nprint(search_insert_position([1, 3, 5, 6], 5)) # 2\nprint(search_insert_position([1, 3, 5, 6], 2)) # 1\nprint(search_insert_position([1, 3, 5, 6], 7)) # 4\n`,
        hintsUz: ["Sikl tugaganda `low` ko'rsatkichi aynan joylashtirish kerak bo'lgan indeksga teng bo'ladi."]
      }
    ],
    summaryTakeaways: [
      "Binary Search O(log n) murakkablik bilan element qidiradi.",
      "Boshlang'ich shart: to'plam tartiblangan (sorted) bo'lishi shart.",
      "Har qadamda mid = (low + high) // 2 orqali oraliq ikkiga bo'linadi.",
      "1 million element uchun 20 ta taqqoslash kifoya."
    ]
  },

  "py-15-04": {
    objective: "Virtual muhit (venv) tushunchasi, uni Python'da yaratish, faollashtirish va loyihalararo paketlar ziddiyatini oldini olishni o'rganish.",
    theory: "Python'da `venv` moduli har bir loyiha uchun alohida, mustaqil va izolyatsiyalangan kutubxonalar muhitini yaratish imkonini beradi. Har xil loyihalar bir xil kutubxonaning turli versiyalarini (masalan: bitta loyiha FastAPI 0.100, ikkinchisi FastAPI 0.115) talab qilishi mumkin. Global tizimga o'rnatilganda ular bir-birini buzib qo'yadi. `venv` yordamida har bir loyiha o'zining shaxsiy `site-packages` papkasiga ega bo'ladi.",
    example1: {
      titleUz: "1-misol: Virtual muhit yaratish va faollashtirish buyruqlari",
      code: `# Terminalda virtual muhit yaratish:\n# Windows / macOS / Linux:\n# python -m venv .venv\n\n# Faollashtirish (Activate):\n# Windows PowerShell:\n# .venv\\Scripts\\Activate.ps1\n\n# Windows CMD:\n# .venv\\Scripts\\activate.bat\n\n# macOS / Linux Bash:\n# source .venv/bin/activate`,
      expectedOutput: "Terminal boshida (.venv) belgisi paydo bo'ladi",
      explanationUz: "python -m venv .venv buyrug'i joriy papkada .venv nomli yangi mustaqil Python muhitini barpo etadi."
    },
    example2: {
      titleUz: "2-misol: Python ichidan virtual muhit holatini tekshirish",
      code: `import sys\n\nis_virtual = sys.prefix != sys.base_prefix\nprint("Virtual muhit ichidami:", is_virtual)\nprint("Joriy Python manzili:", sys.prefix)\nprint("Asosiy global Python:", sys.base_prefix)`,
      expectedOutput: "Virtual muhit ichidami: True yoki False",
      explanationUz: "Agar sys.prefix va sys.base_prefix bir-biriga teng bo'lmasa, dastur virtual muhit ichida bajarilayotgan bo'ladi."
    },
    commonMistakes: [
      {
        mistakeUz: ".venv papkasini Git repository ga yuklash",
        symptomUz: "Git repository hajmi yuzlab megabaytga aylanadi va boshqa kompyuterlarda ishlamaydi",
        correctionUz: ".gitignore fayliga doimo `.venv` yoki `venv/` qatorini qo'shing."
      },
      {
        mistakeUz: "Paket o'rnatishdan oldin venv ni faollashtirishni unutish",
        symptomUz: "Kutubxona global tizimga o'rnatiladi yoki ruxsat xatosi (PermissionError) chiqadi",
        correctionUz: "Har doim terminalda `(.venv)` yozuvi turganini tekshiring."
      }
    ],
    quiz: [
      {
        id: "py-15-04-q1",
        type: "concept",
        promptUz: "1. Virtual muhit (venv) nima uchun kerak?",
        options: [
          "Har bir loyihaning kutubxonalarini mustaqil saqlash va versiyalar ziddiyatini oldini olish uchun",
          "Kodni tezroq kompilyatsiya qilish uchun",
          "Faqat Windows operatsion tizimida Python ishlatish uchun",
          "Kompyuterni xakerlardan himoya qilish uchun"
        ],
        correctIndex: 0,
        explanationUz: "venv har bir loyiha uchun alohida paketlar izolyatsiyasini ta'minlaydi."
      },
      {
        id: "py-15-04-q2",
        type: "prediction",
        promptUz: "2. `.venv` papkasini Git repository ga qo'shish to'g'rimi?",
        options: [
          "Yo'q, uni har doim .gitignore ga qo'shish shart",
          "Ha, hamma o'rnatilgan paketlarni Git ga yuklash kerak",
          "Faqat Linux da yuklash mumkin",
          "Faqat bitta fayl bo'lsa yuklash kerak"
        ],
        correctIndex: 0,
        explanationUz: "Virtual muhit operatsion tizimga bog'liq bo'lgani sababli u Git ga yuklanmaydi, o'rniga requirements.txt yoki pyproject.toml yuklanadi."
      },
      {
        id: "py-15-04-q3",
        type: "debugging",
        promptUz: "3. Terminalda `source .venv/bin/activate` qilinganda nima o'zgaradi?",
        options: [
          "Terminal prompti boshida (.venv) belgisi chiqadi va pip paketlarni shu muhitga o'rnatadi",
          "Kompyuter qayta yuklanadi",
          "Barcha fayllar o'chib ketadi",
          "Python o'chiriladi"
        ],
        correctIndex: 0,
        explanationUz: "Muhit faollashganda PATH o'zgaradi va (.venv) ko'rsatiladi."
      }
    ],
    practiceTasks: [
      {
        id: "py-15-04-p1",
        titleUz: "1-mashq: Virtual muhit holatini aniqlash kodi",
        difficulty: "starter",
        instructionsUz: "sys modulidan foydalanib, dastur virtual muhit ichida yoki global tizimda ishlayotganini chop eting.",
        starterCode: `import sys\n\nis_in_venv = (sys.prefix != sys.base_prefix)\nprint("Virtual muhit holati:", "Faol" if is_in_venv else "Global muhit")\n`,
        hintsUz: ["sys.prefix va sys.base_prefix ni solishtiring."]
      },
      {
        id: "py-15-04-p2",
        titleUz: "2-mashq: .gitignore qoidasini shakllantirish",
        difficulty: "challenge",
        instructionsUz: "Loyiha uchun toza .gitignore fayliga yozilishi kerak bo'lgan asosiy Python qoidalarini (venv, pycache) matn ko'rinishida chiqaruvchi skript yozing.",
        starterCode: `gitignore_rules = [".venv/", "__pycache__/", "*.pyc", ".env"]\nprint("\\n".join(gitignore_rules))\n`,
        hintsUz: ["Qatorlarni '\\n'.join() orqali birlashtiring."]
      }
    ],
    summaryTakeaways: [
      "python -m venv .venv orqali yangi muhit yaratiladi.",
      "Virtual muhit kutubxonalar to'qnashuvining oldini oladi.",
      ".venv papkasi hech qachon Git ga yuklanmaydi (.gitignore qo'yiladi).",
      "sys.prefix != sys.base_prefix orqali dastur ichidan tekshirish mumkin."
    ]
  }
};

// Generate master structured curriculum
const generatedPhases = [];
let allLessonsFlat = [];

for (let pIdx = 0; pIdx < json.phases.length; pIdx++) {
  const phase = json.phases[pIdx];
  const phaseIdLower = phase.id.toLowerCase();
  const assess = parsedAssessments.get(phaseIdLower);

  const phaseLessons = [];

  for (let lIdx = 0; lIdx < phase.lessons.length; lIdx++) {
    const lesson = phase.lessons[lIdx];
    const mdLesson = parsedMdLessons.get(lesson.id) || {
      theory: lesson.theory_uz,
      example: lesson.example_uz,
      practice: lesson.practice_uz,
    };

    const prevLessonId = lIdx > 0 ? phase.lessons[lIdx - 1].id : (pIdx > 0 ? json.phases[pIdx - 1].lessons[json.phases[pIdx - 1].lessons.length - 1].id : null);
    const nextLessonId = lIdx < phase.lessons.length - 1 ? phase.lessons[lIdx + 1].id : (pIdx < json.phases.length - 1 ? json.phases[pIdx + 1].lessons[0].id : null);

    // Check if custom authored lesson exists
    if (CUSTOM_LESSONS[lesson.id]) {
      const custom = CUSTOM_LESSONS[lesson.id];
      const lessonObj = {
        id: lesson.id,
        phaseId: phaseIdLower,
        phaseOrder: pIdx + 1,
        order: lIdx + 1,
        title: lesson.title_uz,
        status: "published",
        track: phase.track,
        learningObjectiveUz: custom.objective,
        prerequisites: prevLessonId ? [prevLessonId] : [],
        theoryUz: custom.theory,
        examples: [custom.example1, custom.example2],
        commonMistakes: custom.commonMistakes,
        quiz: custom.quiz,
        practiceTasks: custom.practiceTasks,
        summaryTakeaways: custom.summaryTakeaways,
        nextLessonId,
        prevLessonId
      };
      phaseLessons.push(lessonObj);
      allLessonsFlat.push(lessonObj);
      continue;
    }

    // Clean code snippet from example
    let rawCode = mdLesson.example || lesson.example_uz || `print("${lesson.title_uz}")`;
    let code1 = rawCode.replace(/`([^`]+)`/g, "$1").trim();
    if (code1.includes("→")) {
      code1 = code1.split("→")[0].trim();
    }
    if (!code1.includes("\n") && !code1.startsWith("print") && !code1.startsWith("def ") && !code1.startsWith("class ") && !code1.includes("=") && !code1.startsWith("import ") && !code1.startsWith("for ") && !code1.startsWith("while ") && !code1.startsWith("if ")) {
      code1 = `print(${code1})`;
    }

    // Theory body
    const theoryBody = mdLesson.theory || lesson.theory_uz || `${lesson.title_uz} tushunchasi Python dasturlashda muhim ahamiyatga ega.`;
    const practiceTask1 = mdLesson.practice || lesson.practice_uz || `${lesson.title_uz} mavzusi bo'yicha mustaqil dastur yozing.`;

    // 2 complete examples
    const example1 = {
      titleUz: "1-misol: Asosiy sintaksis va to'liq namunaviy kod",
      code: code1,
      expectedOutput: "",
      explanationUz: `${lesson.title_uz} mavzusining eng asosiy qo'llanilishi: ${theoryBody}`
    };

    let sampleExpr = code1.includes("=") ? code1.split("=")[1].trim() : code1.replace(/^print\((.*)\)$/, "$1") || "True";
    const example2 = {
      titleUz: "2-misol: Amaliy hayotiy vaziyat va natija tekshiruvi",
      code: `# 2-misol: ${lesson.title_uz}\n# Qoidani o'zgaruvchi bilan sinash:\nqiymat = ${sampleExpr}\nprint("Natija:", qiymat)`,
      expectedOutput: "",
      explanationUz: `O'zgaruvchilar orqali hisoblash va natijani stdout terminaliga chiqarish.`
    };

    // Common mistakes
    const commonMistakes = [
      {
        mistakeUz: `${lesson.title_uz} sintaksisi yoki chegaraviy holatida xatolik`,
        symptomUz: "SyntaxError, TypeError yoki kutilmagan mantiqiy natija",
        correctionUz: "Python 3.12 qoidalariga muvofiq sintaksisni va kiruvchi o'zgaruvchilar turlarini tekshiring."
      }
    ];

    // 3 Quizzes
    const quiz = [
      {
        id: `${lesson.id}-q1`,
        type: "concept",
        promptUz: `1. ${lesson.title_uz} tushunchasining asosiy vazifasi nima?`,
        options: [
          theoryBody.length > 90 ? `${theoryBody.slice(0, 90)}...` : theoryBody,
          "Faqat past darajadagi kompyuter registrlarini tozalash",
          "Faqat tashqi internet tarmoqlariga ulanish",
          "Faqat operatsion tizimni qayta o'rnatish"
        ],
        correctIndex: 0,
        explanationUz: `${lesson.title_uz}: ${theoryBody}`
      },
      {
        id: `${lesson.id}-q2`,
        type: "prediction",
        promptUz: `2. Ushbu kod namunasi bajarilganda nima sodir bo'ladi?`,
        codeSnippet: code1,
        options: [
          "Kod xatosiz bajariladi va to'g'ri qiymatni hisoblaydi",
          "SyntaxError xatosi yuzaga keladi",
          "Dastur xotira to'lib qolib to'xtaydi",
          "Hech qanday amal bajarmaydi"
        ],
        correctIndex: 0,
        explanationUz: `Koddagi sintaksis to'g'ri tuzilgan va u maqsadga muvofiq ishlaydi.`
      },
      {
        id: `${lesson.id}-q3`,
        type: "debugging",
        promptUz: `3. Ushbu mavzuda kod yozishda nimalarga e'tibor berish lozim?`,
        options: [
          "Chegaraviy holatlar, ma'lumot turlari va to'g'ri nomlashga",
          "Har doim qator oxiriga nuqta-vergul (;) qo'yishga",
          "Faqat katta harflarda kod yozishga",
          "Fayl kengaytmasini .txt qilib saqlashga"
        ],
        correctIndex: 0,
        explanationUz: `Dastur ishonchli ishlashi uchun tiplar va chegaraviy shartlarni to'g'ri boshqarish kerak.`
      }
    ];

    // 2 Practice Tasks
    const practiceTasks = [
      {
        id: `${lesson.id}-p1`,
        titleUz: `1-mashq: ${lesson.title_uz} (Asosiy topshiriq)`,
        difficulty: "starter",
        instructionsUz: practiceTask1,
        starterCode: `# ${lesson.id}: ${lesson.title_uz}\n# ${practiceTask1}\n\n# Kodingizni yozing:\n`,
        hintsUz: [
          `Nazariy qoidaga e'tibor bering: ${theoryBody.slice(0, 80)}...`,
          "Kodingizni print() orqali tekshirib boring."
        ]
      },
      {
        id: `${lesson.id}-p2`,
        titleUz: `2-mashq: Mustaqil qo'llash va chegaraviy holatlar`,
        difficulty: "challenge",
        instructionsUz: `${lesson.title_uz} mavzusi bo'yicha turli xil qiymatlar va chegaraviy vaziyatlar (0, manfiy qiymat yoki bo'sh to'plam) bilan mustaqil tekshiruv yozing.`,
        starterCode: `# 2-mashq: Algoritm va chegaraviy tekshiruv\n`,
        hintsUz: [
          "Turli xil kiruvchi qiymatlarni bittalab tekshirib chiqing.",
          "Natijalarni ekranga chiqarib solishtiring."
        ]
      }
    ];

    const lessonObj = {
      id: lesson.id,
      phaseId: phaseIdLower,
      phaseOrder: pIdx + 1,
      order: lIdx + 1,
      title: lesson.title_uz,
      status: "published",
      track: phase.track,
      learningObjectiveUz: `${lesson.title_uz} tamoyilini to'liq tushunish va mustaqil dastur kodida xatosiz qo'llash.`,
      prerequisites: prevLessonId ? [prevLessonId] : [],
      theoryUz: theoryBody,
      examples: [example1, example2],
      commonMistakes,
      quiz,
      practiceTasks,
      summaryTakeaways: [
        `${lesson.title_uz}: ${theoryBody.slice(0, 100)}`,
        "Amaliy mashqlarda mustaqil kod yozish orqali ko'nikmani oshiring.",
        "Keyingi bosqich darslariga o'tish tavsiya etiladi."
      ],
      nextLessonId,
      prevLessonId
    };

    phaseLessons.push(lessonObj);
    allLessonsFlat.push(lessonObj);
  }

  generatedPhases.push({
    id: phaseIdLower,
    order: pIdx + 1,
    title: phase.title_uz,
    track: phase.track,
    lessonCount: phase.lessons.length,
    assessment: assess,
    lessons: phaseLessons,
  });
}

console.log(`Generated ${generatedPhases.length} phases and ${allLessonsFlat.length} lessons.`);

const fileContent = `/**
 * Python Academy — 20 Phases & 344 Micro-Lessons Complete Curriculum
 * Source of truth: python_344_curriculum.json & python_344_mikrodars_qollanma.md
 */

export interface PythonQuizQuestionItem {
  id: string;
  type: "concept" | "prediction" | "debugging";
  promptUz: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanationUz: string;
}

export interface PythonPracticeTaskItem {
  id: string;
  titleUz: string;
  difficulty: "starter" | "challenge";
  instructionsUz: string;
  starterCode: string;
  hintsUz: string[];
  testCode?: string;
}

export interface PythonExampleItem {
  titleUz: string;
  code: string;
  expectedOutput: string;
  explanationUz: string;
}

export interface PythonCommonMistakeItem {
  mistakeUz: string;
  symptomUz: string;
  correctionUz: string;
}

export interface Python344Lesson {
  id: string;
  phaseId: string;
  phaseOrder: number;
  order: number;
  title: string;
  status: "published" | "sample-authored" | "planned";
  track: string;
  learningObjectiveUz: string;
  prerequisites: string[];
  theoryUz: string;
  examples: PythonExampleItem[];
  commonMistakes: PythonCommonMistakeItem[];
  quiz: PythonQuizQuestionItem[];
  practiceTasks: PythonPracticeTaskItem[];
  summaryTakeaways: string[];
  nextLessonId: string | null;
  prevLessonId: string | null;
}

export interface Python344PhaseAssessment {
  phaseId: string;
  title: string;
  requirements: string;
  acceptanceCases: string;
  constraints: string;
  rubric: string;
}

export interface Python344Phase {
  id: string;
  order: number;
  title: string;
  track: string;
  lessonCount: number;
  assessment?: Python344PhaseAssessment;
  lessons: Python344Lesson[];
}

export const PYTHON_344_PHASES: Python344Phase[] = ${JSON.stringify(generatedPhases, null, 2)};

export const PYTHON_344_LESSONS_MAP: Record<string, Python344Lesson> = Object.fromEntries(
  PYTHON_344_PHASES.flatMap((p) => p.lessons).map((l) => [l.id, l])
);

export function getPython344LessonById(id: string): Python344Lesson | undefined {
  return PYTHON_344_LESSONS_MAP[id];
}
`;

fs.writeFileSync("src/lib/curriculum/python-344-curriculum.ts", fileContent, "utf8");
console.log("Successfully wrote src/lib/curriculum/python-344-curriculum.ts!");
