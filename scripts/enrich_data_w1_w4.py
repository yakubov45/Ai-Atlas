# -*- coding: utf-8 -*-
"""
Enrichment data for Weeks 1 to 4 (D01.1 - D04.4)
"""

ENRICH_W1_W4 = {
    "D01.1": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Nima uchun uv va src-layout kerak? (Muammo va Yechim)",
                "explanationUz": "An'anaviy `pip` va `venv` katta ML/AI loyihalarida (PyTorch, FastAPI, Pandas) paketlar ziddiyatini sekin hal qiladi va `requirements.txt` ko'pincha turli kompyuterlarda turlicha versiya o'rnatib qo'yadi. `uv` (Rust'da yozilgan paket menejeri) `uv.lock` fayli orqali har bir tranzitiv bog'liqlikning aniq xeshini qulflaydi. `src-layout` (`src/my_pkg/`) esa loyiha ildizidan kodni ishga tushirganda Python joriy papkadagi chala fayllarni emas, balki virtual muhitga to'g'ri o'rnatilgan paketni import qilishini kafolatlaydi.",
                "codeExample": "# Terminalda loyiha yaratish ketma-ketligi:\n# uv init --package csv-validator\n# uv add pydantic ruff pytest\n\nfrom pathlib import Path\nimport sys\n\nprint('Python ijro yo\\'li:', sys.executable)\nprint('Standart paket strukturasi: pyproject.toml + src/csv_validator/__init__.py')",
                "outputOrNoteUz": "Natija: Python ijro muhiti va paket tuzilmasi izolyatsiya qilinadi. Har bir jamoa a'zosi `uv sync` buyrug'i bilan 100% bir xil kutubxona versiyalarini 1-2 soniyada o'rnatadi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: CLI (Command Line Interface) Arxitekturasi va argparse",
                "explanationUz": "Data Scientist va ML muhandislar kodni faqat Jupyter Notebook ichida qoldirmasligi shart. Production serverlar, Airflow DAG'lar va Docker konteynerlar Python skriptlarini CLI argumentlari (`--input`, `--output`, `--strict`) orqali chaqiradi. `argparse` yoki `typer` kutubxonasi yordamida foydalanuvchi kiritgan bayroqlar (flags) avtomatik turlarga (`Path`, `int`, `float`) o'giriladi va `--help` hujjati generatsiya qilinadi.",
                "codeExample": "import argparse\n\ndef build_parser() -> argparse.ArgumentParser:\n    p = argparse.ArgumentParser(prog='csv-check', description='CSV sifatini tekshiruvchi CLI')\n    p.add_argument('--input', type=str, default='data/sales.csv', help='Kiruvchi CSV fayl')\n    p.add_argument('--max-errors', type=int, default=5, help='Maksimal ruxsat etilgan xatolar')\n    return p\n\nparser = build_parser()\nargs = parser.parse_args(['--input', 'users.csv', '--max-errors', '3'])\nprint(f'Fayl: {args.input} | Limit: {args.max_errors}')",
                "outputOrNoteUz": "Natija: `Fayl: users.csv | Limit: 3`. Argumentlar qat'iy tipga o'tkazildi va xato bayroq berilsa dastur xavfsiz xabar bilan to'xtaydi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Production Exit Code va Xatolarni Boshqarish",
                "explanationUz": "Linux va CI/CD (GitHub Actions) tizimlarida dastur muvaffaqiyatli tugasa `exit code 0`, xato bo'lsa `1` yoki undan katta son qaytarishi shart (`sys.exit(1)`). Agar CSV tekshiruvchi CLI xato qator topsa-yu, ammo `exit code 0` bilan tugasa, CI pipeline buni 'muvaffaqiyatli' deb o'ylaydi va buzuq ma'lumot baza yoki model o'qitish bosqichiga o'tib ketadi.",
                "codeExample": "def run_validation_job(total_rows: int, bad_rows: int, threshold: float = 0.05) -> int:\n    error_rate = bad_rows / max(total_rows, 1)\n    print(f'Jami: {total_rows}, Xato: {bad_rows} ({error_rate:.1%})')\n    if error_rate > threshold:\n        print('CRITICAL: Xatolar ulushi chegaradan oshdi! Exit code: 1')\n        return 1\n    print('OK: Ma\\'lumotlar toza. Exit code: 0')\n    return 0\n\ncode = run_validation_job(1000, 85, threshold=0.05)\nprint('Tizimga qaytarilgan kod:', code)",
                "outputOrNoteUz": "Natija: Xatolar ulushi 8.5% bo'lgani uchun funksiyadan `1` qaytadi va CI/CD pipeline avtomatik ravishda keyingi bosqichni to'xtatadi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: CSV Ustunlari va Bo'sh Qiymatlarni Tekshiruvchi CLI",
                "scenarioUz": "Mijozlardan har kuni keladigan `orders.csv` faylida ustunlar soni buzilgan yoki majburiy maydonlar bo'sh qolgan qatorlarni aniqlash.",
                "howToUseUz": "Quyidagi kodni Python muharririda ishga tushiring yoki fayl sifatida saqlab `uv run python validator.py` orqali sinab ko'ring.",
                "code": "raw_csv = '''order_id,user_id,amount,status\n1001,u1,250000,PAID\n1002,u2,,PENDING\n1003,u3,180000\n1004,u4,420000,PAID'''\n\nlines = [line.strip() for line in raw_csv.strip().split('\\n')]\nheader = lines[0].split(',')\n\nvalid_rows, errors = [], []\nfor idx, row in enumerate(lines[1:], start=2):\n    cols = row.split(',')\n    if len(cols) != len(header):\n        errors.append(f'{idx}-qator: ustunlar soni {len(cols)} ta (kutilgan: {len(header)})')\n    elif any(c == '' for c in cols):\n        errors.append(f'{idx}-qator: bo\\'sh qiymat mavjud -> {cols}')\n    else:\n        valid_rows.append(dict(zip(header, cols)))\n\nprint(f'To\\'g\\'ri qatorlar: {len(valid_rows)} ta')\nfor err in errors:\n    print('XATO:', err)",
                "expectedOutput": "To'g'ri qatorlar: 2 ta\nXATO: 3-qator: bo'sh qiymat mavjud -> ['1002', 'u2', '', 'PENDING']\nXATO: 4-qator: ustunlar soni 3 ta (kutilgan: 4)",
                "breakdownUz": "`enumerate(..., start=2)` orqali CSV ichidagi haqiqiy qator raqami (1-qator header bo'lgani uchun 2-qatordan boshlab) aniq ko'rsatiladi."
            },
            {
                "titleUz": "2-misol: pyproject.toml va CLI Entrypoint Sozlamasi",
                "scenarioUz": "Python skriptni har safar `python src/app.py` deb emas, balki terminalda to'g'ridan-to'g'ri `atlas-validate --file data.csv` buyrug'i sifatida chaqiriladigan qilish.",
                "howToUseUz": "`pyproject.toml` faylining `[project.scripts]` bo'limiga entrypoint qo'shiladi va `uv sync` bajariladi.",
                "code": "pyproject_toml_config = '''\n[project]\nname = \"atlas-validator\"\nversion = \"0.1.0\"\nrequires-python = \">=3.12\"\ndependencies = [\"pydantic>=2.7.0\"]\n\n[project.scripts]\natlas-validate = \"atlas_validator.cli:main\"\n'''\nprint('Entrypoint konfiguratsiyasi:')\nprint(pyproject_toml_config.strip())",
                "expectedOutput": "Entrypoint konfiguratsiyasi:\n[project]\nname = \"atlas-validator\"...",
                "breakdownUz": "`[project.scripts]` ichidagi `atlas-validate = \"atlas_validator.cli:main\"` yozuvi paket o'rnatilganda `.venv/bin/` ichiga ijro fayli yaratadi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "uv & Lockfile (uv.lock)",
                "category": "Python & Infra",
                "definitionUz": "Rust tilida yozilgan zamonaviy Python paket va virtual muhit menejeri; `uv.lock` barcha kutubxonalarning aniq versiya va kriptografik xeshlarini qayd etadi.",
                "analogyOrExampleUz": "Xuddi dorixonadagi muhrlangan retsept kabi: bugun Toshkentda yoki 6 oydan keyin Berlindagi serverda ochilsa ham aynan bir xil tarkib yig'iladi.",
                "connectedTo": [
                    {
                        "targetTerm": "GitHub Actions CI",
                        "targetLessonId": "D01.3",
                        "relationshipUz": "CI serverda `uv sync --frozen` orqali testlar lokal muhit bilan 100% bir xil versiyada tekshiriladi."
                    },
                    {
                        "targetTerm": "Multi-stage Dockerfile",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "4-haftadagi Churn API Docker konteynerini yig'ishda `uv` tasvir hajmini kichraytirish va build tezligini 10x oshirish uchun ishlatiladi."
                    }
                ]
            },
            {
                "term": "src-layout (Manba Katalogi Arxitekturasi)",
                "category": "Python & Infra",
                "definitionUz": "Paket kodini ildiz papkada emas, balki `src/<paket_nomi>/` ichida joylashtirish standarti.",
                "analogyOrExampleUz": "Zavodda xomashyo ombori (`src/`) va tayyor qadoqlangan mahsulot vitrinasi (`site-packages`) alohida tutilgani kabi.",
                "connectedTo": [
                    {
                        "targetTerm": "pytest Test Discovery",
                        "targetLessonId": "D01.3",
                        "relationshipUz": "pytest testlarni ishga tushirganda lokal faylni emas, balki haqiqiy o'rnatilgan paketni import qilib tekshirishini ta'minlaydi."
                    }
                ]
            },
            {
                "term": "Exit Status Code (Chiqish Kodi)",
                "category": "Python & Infra",
                "definitionUz": "Operatsion tizimga jarayon qanday yakunlanganini bildiruvchi butun son (0 = muvaffaqiyatli, 1..255 = xato).",
                "analogyOrExampleUz": "Svetofor signali: yashil (0) bo'lsa keyingi poyezd o'tadi, qizil (1) bo'lsa butun liniya to'xtaydi.",
                "connectedTo": [
                    {
                        "targetTerm": "Kubernetes Healthcheck & Probes",
                        "targetLessonId": "D09.3",
                        "relationshipUz": "9-haftada konteyner orkestratori jarayonning exit code va health holatiga qarab podni qayta ishga tushiradi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d01-1-int-1",
                "level": "Junior",
                "questionUz": "requirements.txt bilan pyproject.toml + uv.lock o'rtasida qanday farq bor?",
                "interviewerIntentUz": "Nomzodning reproducible (qayta tiklanuvchan) muhit va dependency resolution muammolarini tushunishini tekshirish.",
                "strongAnswerUz": "`requirements.txt` ko'pincha faqat yuqori darajali paketlarni yoki bitta OS uchun muzlatilgan ro'yxatni saqlaydi. `pyproject.toml` esa loyihaning bevosita talablarini (`dependencies`) va dev vositalarini (`dev-dependencies`) ajratadi, `uv.lock` esa barcha tranzitiv bog'liqliklarning aniq daraxtini, platforma cheklovlarini va SHA256 xeshlarini saqlaydi. Natijada 'mening kompyuterimda ishlagan edi' muammosi yo'qoladi.",
                "redFlagUz": "'Ikkalasi bir xil narsa, faqat nomi va formati boshqacha' deb javob berish.",
                "followUpQuestionUz": "Savol: CI serverda `uv sync` va `uv sync --frozen` o'rtasida nima farq bor? Javob: `--frozen` lock-faylni o'zgartirmasdan o'rnatadi; agar `pyproject.toml` va `uv.lock` mos kelmasa, xato berib buildni to'xtatadi."
            },
            {
                "id": "d01-1-int-2",
                "level": "Middle",
                "questionUz": "Nima uchun Python loyihalarida flat-layout (`my_pkg/`) o'rniga `src/my_pkg/` (src-layout) ishlatish tavsiya etiladi?",
                "interviewerIntentUz": "Python'ning `sys.path` qidiruv mexanizmi va qadoqlash xatolarini bilishini sinash.",
                "strongAnswerUz": "Python ishga tushganda joriy ishchi katalogni (`''`) `sys.path` ro'yxatining eng boshiga qo'yadi. Flat-layout'da `pytest` chaqirilsa, Python paketni virtual muhitdan emas, to'g'ridan-to'g'ri joriy papkadan import qiladi. Natijada `pyproject.toml` da unutilgan fayllar yoki buzilgan packaging xatosi lokal testda sezilmay qoladi. `src-layout` esa paketni editable (`uv pip install -e .`) qilib o'rnatishga majbur qiladi va haqiqiy o'rnatilgan holatni sinaydi.",
                "redFlagUz": "'Kod chiroyliroq ko'rinishi uchun yoki PEP-8 shuni talab qilgani uchun' deyish.",
                "followUpQuestionUz": "Savol: Editable install (`-e`) ichki qanday ishlaydi? Javob: `site-packages` ichiga `.pth` yo'naltiruvchi fayl (yoki zamonaviy import hook) qo'yib, kod o'zgarganda qayta o'rnatmasdan o'qish imkonini beradi."
            },
            {
                "id": "d01-1-int-3",
                "level": "Senior / Production",
                "questionUz": "Data pipeline'da ishlaydigan Python CLI vositasini loyihalashda qanday production talablarni qo'yasiz?",
                "interviewerIntentUz": "Nomzodning skript yozishdan haqiqiy production muhandisligiga o'tganligini tekshirish.",
                "strongAnswerUz": "1) Qat'iy CLI kontrakti (`argparse`/`typer` orqali tiplar va `--dry-run` rejimi); 2) Standartlashtirilgan Exit Code'lar (`0` muvaffaqiyat, `1` konfiguratsiya xatosi, `2` ma'lumot validatsiya xatosi); 3) `stdout` faqat natija/JSON uchun, `stderr` esa strukturali loglar uchun ajratilishi; 4) Idempotentlik (bir xil buyruq ikki marta yurgizilsa dublikat ma'lumot yaratmasligi).",
                "redFlagUz": "Faqat `input()` funksiyasi bilan foydalanuvchidan terminalda savol so'raydigan interaktiv skript yozishni aytish (avtomatlashgan serverda `input()` osilib qoladi!).",
                "followUpQuestionUz": "Savol: Nima uchun `input()` funksiyasi Airflow yoki Docker ichida xavfli? Javob: Chunki fon jarayonlarida interaktiv TTY bo'lmaydi va jarayon `EOFError` beradi yoki timeout bo'lguncha qotib qoladi."
            }
        ],
        "videos": [
            {
                "id": "vid-d01-1-uz",
                "title": "Python 2-dars: O'zgaruvchilar, ma'lumot turlari va dastur tuzilmasi",
                "channel": "Urobot",
                "language": "uz",
                "youtubeId": "04A7MUztSYQ",
                "youtubeUrl": "https://www.youtube.com/watch?v=04A7MUztSYQ",
                "durationOrTimestamp": "To'liq dars",
                "whatItExplainsUz": "Python dasturining asosiy ma'lumot turlari, skript fayllarini yaratish va terminal orqali ishga tushirish asoslari tushuntirilgan.",
                "howToUseVideoUz": "Videoni ko'rib bo'lgach, ushbu darsdagi `validate_csv` funksiyasida `str`, `int`, `dict` turlari qanday ishlatilganini solishtiring va pastdagi Python muharririda o'zingizning CSV satringizni qo'shib tekshiring."
            },
            {
                "id": "vid-d01-1-en",
                "title": "Python Return Vs Print() — Visual Explanation",
                "channel": "Data with Baraa",
                "language": "en",
                "youtubeId": "DZ2yBGzvlXk",
                "youtubeUrl": "https://www.youtube.com/watch?v=DZ2yBGzvlXk",
                "durationOrTimestamp": "To'liq vizual tahlil",
                "whatItExplainsUz": "Funksiyadan qiymat qaytarish (`return`) bilan ekranga chiqarish (`print`) o'rtasidagi tub farq va xotira oqimi vizual tushuntirilgan.",
                "howToUseVideoUz": "CLI vositalarida biznes mantiq funksiyasi doim `dict` yoki `int` (`return`) qaytarishi, faqat `main` qismigina natijani `print()` qilishi kerakligini tushunib oling."
            }
        ],
        "quiz": [
            {
                "id": "d01-1-q1",
                "promptUz": "1. Konseptual: Nega zamonaviy Python loyihalarida flat-layout o'rniga src-layout (`src/paket/`) tavsiya etiladi?",
                "options": [
                    "Faqat Windows operatsion tizimida ishlash uchun",
                    "Lokal joriy papkadagi chala fayllarni o'rnatilgan paket deb adashtirib import qilishning oldini olish uchun",
                    "Kod hajmini siqish va xotirani tejash uchun",
                    "Pyodide brauzerida tezroq yuklanishi uchun"
                ],
                "correctIndex": 1,
                "explanationUz": "src/ papkasi testlar yoki boshqa modullarning lokal chala fayllarni o'rnatilgan modul deb adashishidan himoya qiladi."
            },
            {
                "id": "d01-1-q2",
                "promptUz": "2. Kod Tahlili: `argparse` da `--max-errors` bayrog'i `type=int` qilib belgilangan. Foydalanuvchi `--max-errors besh` deb kiritsa nima sodir bo'ladi?",
                "options": [
                    "Dastur 'besh' so'zini avtomatik 5 raqamiga aylantiradi",
                    "argparse avtomatik ravishda invalid int value xatosini chiqaradi va nenol exit code bilan to'xtaydi",
                    "Qiymat None bo'lib ketadi va dastur davom etadi",
                    "Kompyuter qayta yonadi"
                ],
                "correctIndex": 1,
                "explanationUz": "argparse kiruvchi argumentlarni belgilangan tipga o'giradi; agar konversiya xato bersa, foydalanuvchiga aniq xato xabarini ko'rsatib exit code 2 bilan to'xtaydi."
            },
            {
                "id": "d01-1-q3",
                "promptUz": "3. Production Debugging: CSV validator skriptingiz 500 ta xato qator topdi va ekranga 'XATO TOPILDI' deb chiqardi, ammo GitHub Actions CI yashil (Success) bo'lib o'tib ketdi. Sababi nima?",
                "options": [
                    "GitHub Actions Python tilini tushunmaydi",
                    "Skript xato topganda `sys.exit(1)` chaqirmagan va standart `exit code 0` bilan yakunlangan",
                    "Print funksiyasi faqat lokalda ishlaydi",
                    "CSV fayl juda kichik bo'lgan"
                ],
                "correctIndex": 1,
                "explanationUz": "CI/CD tizimlari matnga emas, jarayonning exit code qiymatiga qaraydi. Xato holatda albatta `sys.exit(1)` qaytarilishi shart."
            }
        ]
    },
    "D01.2": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Generatorlar va Lazy Evaluation (O(1) Xotira)",
                "explanationUz": "Tasavvur qiling, sizda 25 GB hajmli `events.csv` fayli bor, noutbukingizda esa 16 GB RAM mavjud. Agar `lines = f.readlines()` yoki `[parse(x) for x in f]` yozsangiz, Python butun 25 GB ma'lumotni RAMga yuklashga urinadi va `MemoryError` (OOM) bilan qulaydi. `yield` kalit so'zi funksiyani **Generator**ga aylantiradi: u bir vaqtning o'zida faqat bitta qatorni xotiraga oladi, qayta ishlaydi va keyingi qatorga o'tganda oldingisini xotiradan bo'shatadi.",
                "codeExample": "import sys\n\nlist_comp = [x * 2 for x in range(100_000)]\ngen_expr = (x * 2 for x in range(100_000))\n\nprint(f'List xotira hajmi: {sys.getsizeof(list_comp):,} bayt')\nprint(f'Generator xotira hajmi: {sys.getsizeof(gen_expr):,} bayt')",
                "outputOrNoteUz": "Natija: List ~800,000 bayt joy egallasa, Generator elementlar soni 100 ming yoki 100 milliard bo'lishidan qat'i nazar atigi ~200 bayt (O(1)) joy egallaydi!"
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: Pydantic v2 bilan Qat'iy Ma'lumot Kontrakti",
                "explanationUz": "ML modelga yoki bazaga ketayotgan xom ma'lumot ko'pincha iflos bo'ladi (`age = '-5'`, `price = 'N/A'`). Pydantic v2 (Rust tilidagi `pydantic-core` dvigatelida ishlaydi) Python `Type Hints` asosida kiruvchi ma'lumotni ham tipga o'giradi (masalan `'42'` -> `42`), ham chegara shartlarini (`Field(ge=18, le=120)`) tekshiradi.",
                "codeExample": "from pydantic import BaseModel, Field, ValidationError\n\nclass Transaction(BaseModel):\n    tx_id: int\n    amount: float = Field(gt=0, description='Tranzaksiya summasi musbat bo\\'lishi shart')\n    currency: str = Field(pattern=r'^(UZS|USD)$')\n\ntry:\n    t1 = Transaction(tx_id='105', amount='45000.5', currency='UZS')\n    print('To\\'g\\'ri obyekt:', t1.model_dump())\n    t2 = Transaction(tx_id=106, amount=-500, currency='EUR')\nexcept ValidationError as e:\n    print('Validatsiya xatosi soni:', len(e.errors()))",
                "outputOrNoteUz": "Natija: `t1` avtomatik `int` va `float`ga o'girildi, `t2` esa ham manfiy summa, ham noto'g'ri valyuta bo'yicha 2 ta aniq xato qaytardi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: Context Manager (`with`) va Resurslar Xavfsizligi",
                "explanationUz": "Fayllar, ma'lumotlar bazasi ulanishlari (DB connections) va GPU xotira seanslari cheklangan resurslardir. Agar kod o'rtasida `Exception` yuz bersa, oddiy `f.close()` qatori bajarilmay qoladi va resurs oqishi (resource leak) yuzaga keladi. Context Manager (`__enter__` va `__exit__` yoki `@contextmanager`) xato chiqish-chiqmasligidan qat'i nazar resursning 100% yopilishini kafolatlaydi.",
                "codeExample": "from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef track_step(step_name: str):\n    start = time.perf_counter()\n    print(f'[START] {step_name}...')\n    try:\n        yield\n    finally:\n        elapsed = (time.perf_counter() - start) * 1000\n        print(f'[END] {step_name} ({elapsed:.2f} ms da yakunlandi)')\n\nwith track_step('CSV Oqimini Tozalash'):\n    total = sum(i * i for i in range(50_000))\n    print('Hisoblangan yig\\'indi:', total)",
                "outputOrNoteUz": "Natija: `finally` bloki tufayli hatto `with` ichida xato yuz bersa ham bajarilish vaqti o'lchanadi va resurs toza yopiladi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: Generator + Pydantic Yordamida Oqimli (Streaming) ETL Filtrlash",
                "scenarioUz": "Millionlab qatorli log oqimidan faqat validatsiyadan o'tgan yozuvlarni ajratib olish va xato qatorlar statistikasini yig'ish.",
                "howToUseUz": "Quyidagi kodni Python muharririda ishga tushiring va `raw_stream` ichiga yangi xato qatorlar qo'shib sinang.",
                "code": "raw_stream = [\n    '101,ali@mail.uz,24',\n    '102,baxtiyor@mail.uz,15',  # Yosh < 18 (xato)\n    'xato_id,nodir@mail.uz,30', # ID son emas (xato)\n    '104,malika@mail.uz,29'\n]\n\ndef parse_user_stream(lines):\n    for line_no, line in enumerate(lines, start=1):\n        parts = line.strip().split(',')\n        if len(parts) != 3:\n            yield {'ok': False, 'line': line_no, 'reason': 'Ustunlar soni xato'}\n            continue\n        try:\n            uid = int(parts[0])\n            email = parts[1]\n            age = int(parts[2])\n            if '@' not in email or age < 18:\n                raise ValueError('Email yoki yosh chegarasi xato')\n            yield {'ok': True, 'data': {'id': uid, 'email': email, 'age': age}}\n        except ValueError as err:\n            yield {'ok': False, 'line': line_no, 'reason': str(err)}\n\nfor item in parse_user_stream(raw_stream):\n    print(item)",
                "expectedOutput": "{'ok': True, 'data': {'id': 101, 'email': 'ali@mail.uz', 'age': 24}}\n{'ok': False, 'line': 2, 'reason': 'Email yoki yosh chegarasi xato'}\n{'ok': False, 'line': 3, 'reason': \"invalid literal for int() with base 10: 'xato_id'\"}\n{'ok': True, 'data': {'id': 104, 'email': 'malika@mail.uz', 'age': 29}}",
                "breakdownUz": "Generator har bir yozuvni alohida `yield` qiladi, bitta buzuq qator butun ETL oqimini to'xtatib qo'ymaydi (Dead-Letter Queue pattern)."
            },
            {
                "titleUz": "2-misol: Maxsus Validator bilan O'zbek Telefon Raqamini Normalizatsiya Qilish",
                "scenarioUz": "Foydalanuvchilar telefon raqamini `+998 90 123-45-67`, `998901234567` yoki `901234567` ko'rinishida yuboradi. Ularni yagona standartga keltirish.",
                "howToUseUz": "Telefon raqamlarini tozalash funksiyasini ishga tushiring.",
                "code": "def normalize_uz_phone(raw: str) -> str:\n    digits = ''.join(ch for ch in raw if ch.isdigit())\n    if len(digits) == 9:\n        digits = '998' + digits\n    if len(digits) != 12 or not digits.startswith('998'):\n        raise ValueError(f'Noto\\'g\\'ri O\\'zbekiston raqami: {raw}')\n    return f'+{digits}'\n\nsamples = ['+998 (90) 123-45-67', '93 555 44 33', '12345']\nfor s in samples:\n    try:\n        print(f'{s:22} -> {normalize_uz_phone(s)}')\n    except ValueError as e:\n        print(f'{s:22} -> XATO: {e}')",
                "expectedOutput": "+998 (90) 123-45-67    -> +998901234567\n93 555 44 33           -> +998935554433\n12345                  -> XATO: Noto'g'ri O'zbekiston raqami: 12345",
                "breakdownUz": "Ma'lumotlar bazaga yoki ML feature sifatida tushishidan oldin kanonik (yagona) formatga keltiriladi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Generator & Lazy Evaluation (`yield`)",
                "category": "Python & Infra",
                "definitionUz": "Qiymatlarni oldindan xotiraga to'liq yig'masdan, so'ralgan paytda bittalab hisoblab uzatuvchi iterator funksiya.",
                "analogyOrExampleUz": "Restoranda 1000 ta chuchvarani bir vaqtda stolga uyib qo'yish (`list`) emas, balki mijoz yeb bo'lishiga qarab issiq holda bitta likopchadan uzatib turish (`yield`).",
                "connectedTo": [
                    {
                        "targetTerm": "Polars LazyFrame",
                        "targetLessonId": "D02.2",
                        "relationshipUz": "2-haftada Polars ham aynan Lazy Evaluation tamoyili asosida faqat `.collect()` chaqirilganda optimal so'rovni bajaradi."
                    },
                    {
                        "targetTerm": "PyTorch DataLoader & IterableDataset",
                        "targetLessonId": "D05.2",
                        "relationshipUz": "5-haftada GPU xotirasi to'lib qolmasligi uchun rasmlar va matnlar generator/iterator orqali mini-batch qilib uzatiladi."
                    },
                    {
                        "targetTerm": "FastAPI SSE Streaming",
                        "targetLessonId": "D09.1",
                        "relationshipUz": "9-haftada LLM tokenlarini foydalanuvchiga so'zma-so'z uzatishda `async def` ichidagi `yield` generatori ishlatiladi."
                    }
                ]
            },
            {
                "term": "Pydantic Schema Validation",
                "category": "Python & Infra",
                "definitionUz": "Python type annotations yordamida runtime vaqtida kiruvchi ma'lumotlarni tekshiruvchi va serializatsiya qiluvchi kutubxona.",
                "analogyOrExampleUz": "Aeroportdagi pasport nazorati: hujjati to'g'ri bo'lgan yo'lovchini ichkariga kiritadi, soxta yoki muddati o'tganini darhol qaytaradi.",
                "connectedTo": [
                    {
                        "targetTerm": "FastAPI Request/Response Models",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "4-haftada Churn Prediction `/predict` endpointiga keluvchi JSON so'rovlar avtomatik Pydantic orqali tekshiriladi."
                    },
                    {
                        "targetTerm": "LLM Structured Output & Tool Calling",
                        "targetLessonId": "D08.3",
                        "relationshipUz": "8-haftada LLM'dan erkin matn emas, balki qat'iy JSON formatda javob olish uchun Pydantic sxemasi beriladi."
                    }
                ]
            },
            {
                "term": "Context Manager (`__enter__` / `__exit__`)",
                "category": "Python & Infra",
                "definitionUz": "`with` bloki orqali resurslarni (fayl, soket, tranzaksiya, GPU kontekst) xavfsiz ajratish va avtomatik tozalash protokoli.",
                "analogyOrExampleUz": "Mehmonxona xonasi: kirganda chiroq avtomatik yonadi (`__enter__`), xonadan chiqishingiz bilan (hatto shoshilib chiqsangiz ham) avtomatik o'chadi (`__exit__`).",
                "connectedTo": [
                    {
                        "targetTerm": "torch.no_grad() Context",
                        "targetLessonId": "D05.3",
                        "relationshipUz": "5-haftada PyTorch modelini baholashda gradient hisoblashni vaqtincha o'chirib VRAM tejash uchun `with torch.no_grad():` context manageri ishlatiladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d01-2-int-1",
                "level": "Junior",
                "questionUz": "Python'da `return` va `yield` o'rtasida qanday farq bor?",
                "interviewerIntentUz": "Generatorlarning ishlash mexanizmi va funksiya holati (state) saqlanishini bilishini tekshirish.",
                "strongAnswerUz": "`return` funksiyani butunlay yakunlaydi va uning lokal xotira stekini (`stack frame`) o'chirib yuboradi. `yield` esa funksiyani vaqtincha to'xtatib (pause), joriy qiymatni chaqiruvchiga qaytaradi va barcha lokal o'zgaruvchilar hamda bajarilish nuqtasini xotirada saqlab qoladi. Keyingi `next()` chaqiruvida funksiya to'xtagan joyidan davom etadi.",
                "redFlagUz": "'`yield` ham `return` bilan bir xil, faqat sikl ichida yoziladi' deyish.",
                "followUpQuestionUz": "Savol: Generator tugaganda qanday exception ko'tariladi? Javob: `StopIteration` exceptioni ko'tariladi (`for` sikli uni avtomatik ushlab siklni to'xtatadi)."
            },
            {
                "id": "d01-2-int-2",
                "level": "Middle",
                "questionUz": "Python'ning o'zidagi `dataclass` (yoki `TypedDict`) bilan `Pydantic BaseModel` o'rtasida qanday amaliy farq bor?",
                "interviewerIntentUz": "Static type checking bilan runtime data validation farqini tushunishini sinash.",
                "strongAnswerUz": "Standart `@dataclass` va `TypedDict` runtime vaqtida ma'lumot tiplarini tekshirmaydi — agar `age: int` maydoniga `'salom'` bersangiz ham obyekt xatosiz yaratilib ketaveradi. `Pydantic BaseModel` esa runtime vaqtida kiruvchi ma'lumotni parse qiladi, majburiy konversiya va chegara tekshiruvlarini (`Field(gt=0)`) bajaradi hamda xato bo'lsa `ValidationError` qaytaradi. Tashqi API, CSV yoki LLM output bilan ishlaganda Pydantic shart.",
                "redFlagUz": "'Dataclass eski, Pydantic yangi, har doim hamma joyda Pydantic ishlatish kerak' deyish (ichki hisob-kitoblarda dataclass yengilroq).",
                "followUpQuestionUz": "Savol: Pydantic v2 nima hisobiga v1 dan 5-50 barobar tezroq ishlaydi? Javob: Validatsiya yadrosi Python'dan Rust tiliga (`pydantic-core`) o'tkazilgani hisobiga."
            },
            {
                "id": "d01-2-int-3",
                "level": "Senior / Production",
                "questionUz": "100 GB hajmdagi CSV faylni 16 GB RAMli serverda tozalab, Parquet formatiga o'tkazish arxitekturasini qanday qurasiz?",
                "interviewerIntentUz": "Xotira cheklovlari (Out-of-Core processing) va oqimli qayta ishlash tajribasini baholash.",
                "strongAnswerUz": "Butun faylni RAMga yuklamasdan, chunked/streaming arxitektura qo'llayman: 1) Agar murakkab satr darajasidagi validatsiya kerak bo'lsa, generator orqali 50,000 qatordan batch yig'ib, `pyarrow.ParquetWriter` orqali diskka ketma-ket row-group sifatida yozaman; 2) Yoki analitik transformatsiya bo'lsa, Polars `scan_csv().filter(...).sink_parquet()` (streaming engine) yoki DuckDB `COPY (SELECT ... FROM read_csv_auto(...)) TO 'out.parquet'` ishlataman. Natijada RAM sarfi 500 MB dan oshmaydi.",
                "redFlagUz": "'Serverga swap xotira qo'shaman va `pd.read_csv()` qilaman' deyish.",
                "followUpQuestionUz": "Savol: Generatorni ikki marta ketma-ket `for` siklida aylantirsa nima bo'ladi? Javob: Ikkinchi sikl bo'sh o'tadi, chunki generator bir marta iste'mol qilingach (exhausted) tugaydi."
            }
        ],
        "videos": [
            {
                "id": "vid-d01-2-uz",
                "title": "LLM'dan toza JSON: Structured output + Pydantic + FastAPI",
                "channel": "Suhrob Abdullayev",
                "language": "uz",
                "youtubeId": "lzhSUZ0XpFc",
                "youtubeUrl": "https://www.youtube.com/watch?v=lzhSUZ0XpFc",
                "durationOrTimestamp": "AI Engineer 44 kun, 2-kun",
                "whatItExplainsUz": "O'zbek tilida Pydantic sxemalari orqali ma'lumotlarni qat'iy strukturalash, validatsiya qilish va AI/API tizimlarida qo'llash amalda ko'rsatilgan.",
                "howToUseVideoUz": "Videodagi `BaseModel` va `Field` yozilish uslubini ko'rib, ushbu darsdagi `UserRecord` klassiga yangi `phone` va `role` maydonlarini qo'shib kod muharririda sinab ko'ring."
            },
            {
                "id": "vid-d01-2-en",
                "title": "Python Data Structures: When to Use List, Tuple, Set, Dict",
                "channel": "Data with Baraa",
                "language": "en",
                "youtubeId": "h-zcj4DmqHk",
                "youtubeUrl": "https://www.youtube.com/watch?v=h-zcj4DmqHk",
                "durationOrTimestamp": "To'liq vizual qo'llanma",
                "whatItExplainsUz": "Python kolleksiyalarining xotirada qanday joylashishi, qachon ro'yxat (`list`), qachon o'zgarmas kortej (`tuple`) yoki xesh-jadval (`set`/`dict`) ishlatish kerakligi tushuntirilgan.",
                "howToUseVideoUz": "Katta oqimlarni qayta ishlashda qidiruv amallari uchun `list` (`O(n)`) o'rniga `set` yoki `dict` (`O(1)`) tanlash tezlikni qanday oshirishiga e'tibor qarating."
            }
        ],
        "quiz": [
            {
                "id": "d01-2-q1",
                "promptUz": "1. Konseptual: 10 Gigabayt hajmdagi log faylini tahlil qilishda qaysi usul RAM to'lib qolishining (OOM) oldini oladi?",
                "options": [
                    "f.readlines() orqali barcha qatorlarni ro'yxatga olish",
                    "Generator funksiya (`yield`) orqali har bir qatorni navbatma-navbat o'qish",
                    "JSON formatiga o'tkazib keyin yuklash",
                    "Recursion orqali fayl oxirigacha chaqirish"
                ],
                "correctIndex": 1,
                "explanationUz": "Generatorlar butun faylni xotiraga yuklamaydi, faqat o'sha paytda kerakli bitta yozuvni ushlaydi (O(1) xotira)."
            },
            {
                "id": "d01-2-q2",
                "promptUz": "2. Kod Tahlili: `g = (x for x in [1, 2, 3])` generatoridan `list(g)` olindi. Endi yana `list(g)` chaqirilsa natija nima bo'ladi?",
                "options": [
                    "[1, 2, 3] qaytadi",
                    "[] (bo'sh ro'yxat) qaytadi, chunki generator bir marta o'qilgach tugaydi (exhausted)",
                    "ValueError xatosi chiqadi",
                    "[3, 2, 1] teskari ro'yxat qaytadi"
                ],
                "correctIndex": 1,
                "explanationUz": "Generator iterator bo'lib, elementlari bir marta iste'mol qilingach tugaydi va keyingi safar bo'sh ro'yxat qaytaradi."
            },
            {
                "id": "d01-2-q3",
                "promptUz": "3. Production Debugging: Pydantic modelida `age: int = Field(ge=18)` yozilgan. Agar kiruvchi lug'atda `{'age': '25'}` (string ko'rinishida) kelsa nima bo'ladi?",
                "options": [
                    "Darhol TypeError xatosi beradi",
                    "Pydantic standart rejimda '25' satrini 25 butun soniga muvaffaqiyatli o'giradi (coercion) va tekshiruvdan o'tkazadi",
                    "Qiymatni 0 ga tenglab qo'yadi",
                    "Maydonni o'chirib yuboradi"
                ],
                "correctIndex": 1,
                "explanationUz": "Pydantic CSV va JSON oqimlari bilan qulay ishlash uchun mos keluvchi satrlarni avtomatik maqsadli tipga (`int`, `float`) o'giradi."
            }
        ]
    },
    "D01.3": {
        "microSteps": [
            {
                "stepNumber": 1,
                "titleUz": "1-bosqich: Ruff — Rust Tezligidagi Linter va Formatter",
                "explanationUz": "Ilgari Python loyihalarida kod uslubini tekshirish uchun 4-5 ta alohida sekin vosita (`Flake8`, `Black`, `isort`, `pyupgrade`) o'rnatilar edi. `Ruff` bularning barchasini bitta Rust binarida birlashtirib, 100 barobar tezroq ishlaydi. U nafaqat bo'sh joylarni tekislaydi, balki ishlatilmagan importlarni (`F401`), xavfli default argumentlarni (`def f(x=[])` — `B006`) va potensial buglarni kod ishga tushmasidanoq tutib beradi.",
                "codeExample": "# Xavfli Python anti-pattern (Ruff B006 buni darhol tutadi):\ndef append_bad(item, target=[]):\n    target.append(item)\n    return target\n\n# To'g'ri muhandislik yechimi:\ndef append_good(item, target=None):\n    if target is None:\n        target = []\n    target.append(item)\n    return target\n\nprint('Anti-pattern (2 marta chaqirganda):', append_bad(1), append_bad(2))\nprint('To\\'g\\'ri yechim (2 marta chaqirganda):', append_good(1), append_good(2))",
                "outputOrNoteUz": "Natija: `append_bad` funksiyasida default `[]` xotirada bitta obyekt bo'lib qolgani uchun `[1, 2]` bo'lib ketadi! Ruff linteri bunday yashirin xatolarni commit qilishdan oldin to'xtatadi."
            },
            {
                "stepNumber": 2,
                "titleUz": "2-bosqich: pytest — Fixture va Parametrize Bilan Avtomatlashtirilgan Testlash",
                "explanationUz": "Qo'lda `print()` qilib kod tekshirish professional muhandislikda qabul qilinmaydi. `pytest` yordamida har bir funksiya normal holat, chegaraviy holat (edge case: bo'sh fayl, `0`, `None`) va xato holat (`pytest.raises`) bo'yicha sinovdan o'tkaziladi. `@pytest.mark.parametrize` bitta test funksiyasini o'nlab turli kiruvchi qiymatlar bilan qisqa va toza tekshirish imkonini beradi.",
                "codeExample": "def calculate_discount(price: float, rate: float) -> float:\n    if price < 0 or not (0.0 <= rate <= 1.0):\n        raise ValueError('Narx yoki chegirma stavkasi noto\\'g\\'ri')\n    return round(price * (1.0 - rate), 2)\n\n# Parametrli test simulyatsiyasi:\ntest_cases = [\n    (100_000, 0.15, 85_000.0),\n    (50_000, 0.0, 50_000.0),\n    (200_000, 1.0, 0.0),\n]\nfor price, rate, expected in test_cases:\n    actual = calculate_discount(price, rate)\n    assert actual == expected, f'Xato: {actual} != {expected}'\nprint(f'Barcha {len(test_cases)} ta parametrli test muvaffaqiyatli o\\'tdi!')",
                "outputOrNoteUz": "Natija: Barcha chegara holatlar (0% chegirma, 100% chegirma, odatiy chegirma) avtomatik `assert` orqali tasdiqlandi."
            },
            {
                "stepNumber": 3,
                "titleUz": "3-bosqich: GitHub Actions CI Quvuri (Quality Gate)",
                "explanationUz": "Har bir dasturchi GitHub'ga `git push` yoki `Pull Request` qilganda, bulutda toza Linux konteyner ko'tarilib (`ubuntu-latest`), u yerda `uv sync`, `ruff check`, va `pytest --cov-fail-under=80` avtomatik bajariladi. Agar test qamrovi 80% dan tushib ketsa yoki bitta test sinsa, Pull Request bloklanadi va `main` tarmoq doimo barqaror saqlanadi.",
                "codeExample": "ci_steps = [\n    ('1. Checkout code', 'actions/checkout@v4', 'PASS'),\n    ('2. Setup uv & Python 3.12', 'astral-sh/setup-uv@v2', 'PASS'),\n    ('3. Lint & Format Check', 'uv run ruff check .', 'PASS'),\n    ('4. Unit Tests & Coverage >= 80%', 'uv run pytest --cov=src', 'PASS'),\n]\nfor step, cmd, status in ci_steps:\n    print(f'[{status}] {step:32} -> `{cmd}`')",
                "outputOrNoteUz": "Natija: 4 bosqichli Quality Gate (Sifat darvozasi) har bir commitda inson omilisiz kod sifatini nazorat qiladi."
            }
        ],
        "practicalExamples": [
            {
                "titleUz": "1-misol: CSV Validator Uchun Chegaraviy (Edge-Case) Testlar Yozish",
                "scenarioUz": "1-hafta yakuniy topshirig'i bo'lgan CSV Validator dasturini bo'sh fayl, buzilgan qator va to'g'ri qatorlarda avtomatik sinash.",
                "howToUseUz": "Quyidagi test to'plamini Python muharririda yurgizib `assert` tekshiruvlari qanday ishlashini ko'ring.",
                "code": "def validate_csv_content(text: str) -> dict:\n    lines = [l.strip() for l in text.strip().split('\\n') if l.strip()]\n    if not lines:\n        raise ValueError('CSV fayl bo\\'sh bo\\'lishi mumkin emas')\n    header_cols = len(lines[0].split(','))\n    valid = sum(1 for l in lines[1:] if len(l.split(',')) == header_cols)\n    invalid = (len(lines) - 1) - valid\n    return {'valid': valid, 'invalid': invalid}\n\n# 1-test: Normal va xato qatorlar aralash\nres = validate_csv_content('id,name\\n1,Ali\\n2,Vali,Extra\\n3,Gani')\nassert res == {'valid': 2, 'invalid': 1}\n\n# 2-test: Bo'sh fayl xato ko'tarishi shart\ntry:\n    validate_csv_content('   \\n  ')\n    assert False, 'ValueError ko\\'tarilmadi!'\nexcept ValueError as e:\n    print('Bo\\'sh fayl testi tutildi:', e)\n\nprint('Barcha unit testlar 100% PASS!')",
                "expectedOutput": "Bo'sh fayl testi tutildi: CSV fayl bo'sh bo'lishi mumkin emas\nBarcha unit testlar 100% PASS!",
                "breakdownUz": "Yaxshi test faqat to'g'ri kiruvchi ma'lumotni emas (`happy path`), balki dastur qachon va qanday xato qaytarishi kerakligini ham tekshiradi."
            },
            {
                "titleUz": "2-misol: Structured Logging (print o'rniga professional jurnal)",
                "scenarioUz": "Production serverda `print('xato')` deb yozilsa, u qachon, qaysi modulda va qanday jiddiylik darajasida (`INFO`, `WARNING`, `ERROR`) yuz berganini bilib bo'lmaydi.",
                "howToUseUz": "Standart `logging` modulini formatlangan holda sinab ko'ring.",
                "code": "import logging\nimport sys\n\nlogger = logging.getLogger('atlas_pipeline')\nlogger.setLevel(logging.INFO)\nhandler = logging.StreamHandler(sys.stdout)\nhandler.setFormatter(logging.Formatter('%(levelname)-8s | %(name)s | %(message)s'))\nlogger.handlers = [handler]\n\nlogger.info('CSV tekshiruvi boshlandi: rows=1500')\nlogger.warning('14-qatorda yosh maydoni bo\\'sh, default qiymat olindi')\nlogger.error('42-qatorda kritik sxema xatosi: ustunlar mos emas')",
                "expectedOutput": "INFO     | atlas_pipeline | CSV tekshiruvi boshlandi: rows=1500\nWARNING  | atlas_pipeline | 14-qatorda yosh maydoni bo'sh, default qiymat olindi\nERROR    | atlas_pipeline | 42-qatorda kritik sxema xatosi: ustunlar mos emas",
                "breakdownUz": "Log darajalari (`INFO`, `WARNING`, `ERROR`) keyinchalik 10-11-haftalarda Grafana/ELK monitoring tizimlarida avtomatik alert (ogohlantirish) yuborish uchun ishlatiladi."
            }
        ],
        "termsAndConnections": [
            {
                "term": "Static Analysis & Linting (Ruff)",
                "category": "Python & Infra",
                "definitionUz": "Dasturni ishga tushirmasdan turib, uning manba kodi (AST daraxti) ustida sintaktik, uslubiy va mantiqiy xatolarni tekshirish jarayoni.",
                "analogyOrExampleUz": "Samolyot havoga ko'tarilishidan oldin yerda barcha murvatlar va datchiklarni skaner orqali tekshirib chiqish.",
                "connectedTo": [
                    {
                        "targetTerm": "CI/CD Pipeline",
                        "targetLessonId": "D11.3",
                        "relationshipUz": "11-haftadagi MLOps quvurida model deploy qilinishidan oldin birinchi bo'lib Ruff va xavfsizlik linterlari ishlaydi."
                    }
                ]
            },
            {
                "term": "pytest Fixture & Mocking",
                "category": "Python & Infra",
                "definitionUz": "Test funksiyasi ishlashi uchun kerakli boshlang'ich muhitni (vaqtinchalik fayl, test bazasi, soxta API javobi) tayyorlab beruvchi va testdan so'ng tozalovchi mexanizm.",
                "analogyOrExampleUz": "Kimyo laboratoriyasida har bir tajriba oldidan toza probirka berib, tajriba tugagach uni yuvib qo'yuvchi laborant.",
                "connectedTo": [
                    {
                        "targetTerm": "FastAPI TestClient",
                        "targetLessonId": "D04.4",
                        "relationshipUz": "4-haftada Churn Prediction API endpointlarini serverni haqiqatda ko'tarmasdan `pytest` fixture ichida `TestClient` bilan sinaymiz."
                    }
                ]
            },
            {
                "term": "Continuous Integration (CI)",
                "category": "MLOps & Eval",
                "definitionUz": "Jamoa yozgan har bir kod o'zgarishini markaziy repozitoriyga qo'shishda avtomatik yig'ish, lint qilish va testlardan o'tkazish amaliyoti.",
                "analogyOrExampleUz": "Avtomobil zavodidagi konveyer nazorati: har bir detal keyingi цехga o'tishidan oldin avtomatik datchikdan o'tadi.",
                "connectedTo": [
                    {
                        "targetTerm": "Promptfoo & Ragas CI Regression",
                        "targetLessonId": "D10.1",
                        "relationshipUz": "10-haftada oddiy unit testlardan tashqari LLM prompti o'zgarganda RAG sifati tushib ketmaganini tekshiruvchi Eval CI qo'shiladi."
                    }
                ]
            }
        ],
        "interviewQA": [
            {
                "id": "d01-3-int-1",
                "level": "Junior",
                "questionUz": "Unit test bilan Integration test o'rtasida qanday farq bor?",
                "interviewerIntentUz": "Testlash piramidasi va izolyatsiya tushunchasini bilishini tekshirish.",
                "strongAnswerUz": "Unit test bitta kichik funksiya yoki klassni tashqi tizimlardan (baza, tarmoq, fayl tizimi) to'liq izolyatsiya qilgan holda (kerak bo'lsa mock bilan) millisoniyalar ichida tekshiradi. Integration test esa bir nechta komponentlarning (masalan, FastAPI endpoint + PostgreSQL baza + Redis kesh) birgalikda to'g'ri ishlashini tekshiradi.",
                "redFlagUz": "'Unit test kichik loyihada, integration test katta loyihada yoziladi' deyish.",
                "followUpQuestionUz": "Savol: `tmp_path` fixture nima vazifa bajaradi? Javob: `pytest` har bir test uchun operatsion tizimda alohida vaqtinchalik papka yaratib beradi va test tugagach uni avtomatik o'chiradi."
            },
            {
                "id": "d01-3-int-2",
                "level": "Middle",
                "questionUz": "Nima uchun ML va Data loyihalarida `print()` o'rniga `logging` modulini ishlatish shart?",
                "interviewerIntentUz": "Production observability va diagnostika madaniyatini tekshirish.",
                "strongAnswerUz": "`print()` faqat `stdout` ga oddiy matn yozadi — uni darajalar bo'yicha (`DEBUG`, `INFO`, `WARNING`, `ERROR`) filtrlab bo'lmaydi, vaqt tamg'asi (timestamp), fayl/qator raqami va trace_id avtomatik qo'shilmaydi. `logging` esa bitta konfiguratsiya orqali loglarni JSON formatda ham faylga, ham Prometheus/Loki/CloudWatch kabi markaziy monitoring tizimlariga yo'naltira oladi.",
                "redFlagUz": "'`print` sekin ishlagani uchun `logging` ishlatiladi' deb noto'g'ri sabab keltirish.",
                "followUpQuestionUz": "Savol: Production'da loglar qaysi formatda yozilgani ma'qul? Javob: JSON (Structured Logging) formatida, chunki log yig'uvchi tizimlar (`ELK`, `Datadog`, `Grafana Loki`) JSON maydonlari bo'yicha tez qidiruv va agregatsiya qila oladi."
            },
            {
                "id": "d01-3-int-3",
                "level": "Senior / Production",
                "questionUz": "ML/AI kod bazasida 95% test coverage (qamrov) bor, lekin production'da baribir xato chiqdi. Nega yuqori test coverage har doim ham sifatni kafolatlamaydi?",
                "interviewerIntentUz": "Code coverage metrikasining cheklovlarini va Data/Model testlash xususiyatlarini tushunishini sinash.",
                "strongAnswerUz": "Line coverage faqat qaysi kod qatorlari test vaqtida bajarilganini o'lchaydi, ammo: 1) `assert`lar qanchalik chuqur ekanini tekshirmaydi; 2) Chegaraviy ma'lumot turlari (`NaN`, `inf`, Unicode o'zbekcha belgilar, bo'sh massiv) kiritilmagan bo'lishi mumkin; 3) ML tizimlarida xato ko'pincha kodda emas, balki kiruvchi ma'lumot taqsimoti o'zgarishida (Data Drift) yoki tashqi servis (LLM API, DB) sekinlashishida yuz beradi. Shu sababli unit testlar bilan birga schema validation va data quality testlari zarur.",
                "redFlagUz": "'95% yetarli emas, 100% coverage qilsa umuman xato chiqmaydi' deb javob berish.",
                "followUpQuestionUz": "Savol: Tashqi pullik LLM API (masalan OpenAI) ishlatadigan funksiyani CI ichida qanday testlaysiz? Javob: `unittest.mock.patch` yoki `pytest-mock` orqali API chaqiruvini mock qilib, deterministik javob qaytarish orqali."
            }
        ],
        "videos": [
            {
                "id": "vid-d01-3-uz",
                "title": "#20 Qiymat qaytaruvchi funksiya va kodni modullarga ajratish",
                "channel": "Sariq dev",
                "language": "uz",
                "youtubeId": "VqEWbr1erXc",
                "youtubeUrl": "https://www.youtube.com/watch?v=VqEWbr1erXc",
                "durationOrTimestamp": "To'liq amaliy dars",
                "whatItExplainsUz": "Funksiyalarni toza va qayta ishlatiladigan (testlashga yaroqli) qilib yozish tamoyillari o'zbek tilida tushuntirilgan.",
                "howToUseVideoUz": "Funksiyangizni `pytest` bilan oson testlash uchun u tashqi global o'zgaruvchiga bog'lanmasligi, argument olib `return` qaytarishi kerakligini amalda qo'llang."
            },
            {
                "id": "vid-d01-3-en",
                "title": "Idempotency in Data Engineering: Prevent Duplicate Data",
                "channel": "DataZen",
                "language": "en",
                "youtubeId": "TYcMAMEupxI",
                "youtubeUrl": "https://www.youtube.com/watch?v=TYcMAMEupxI",
                "durationOrTimestamp": "To'liq arxitektura tahlili",
                "whatItExplainsUz": "Avtomatlashtirilgan quvurlar va CI/CD jarayonlarida qadamlarni qayta ishga tushirganda xatolar va dublikatlarning oldini olish tushuntirilgan.",
                "howToUseVideoUz": "1-haftalik yakuniy CSV validator loyihangizni GitHub Actions'da qayta-qayta ishga tushirganda bir xil deterministik natija berishini tekshiring."
            }
        ],
        "quiz": [
            {
                "id": "d01-3-q1",
                "promptUz": "1. Konseptual: CI (Continuous Integration) quvurining eng asosiy vazifasi nima?",
                "options": [
                    "Faqat fayllarni Google Drive ga zaxiralash",
                    "Har bir kod o'zgarishida linter va avtomatlashtirilgan testlarni mustaqil muhitda tekshirib, xatolarni erta aniqlash",
                    "Foydalanuvchilarga marketing xabarlarini yuborish",
                    "Kodni faqat HTML ga aylantirib berish"
                ],
                "correctIndex": 1,
                "explanationUz": "CI linter va testlarni har bir commit va PR da toza serverda tekshirib, asosiy kod bazasi buzilishining oldini oladi."
            },
            {
                "id": "d01-3-q2",
                "promptUz": "2. Kod Tahlili: `def add_tag(tag, tags=[]): tags.append(tag); return tags` funksiyasi `add_tag('ai')` va keyin `add_tag('ml')` deb chaqirilsa ikkinchi chaqiruv nima qaytaradi?",
                "options": [
                    "['ml'] qaytaradi",
                    "['ai', 'ml'] qaytaradi, chunki default list `tags=[]` funksiya yaratilganda xotirada bitta marta ajratiladi (mutable default bug)",
                    "TypeError xatosi beradi",
                    "None qaytaradi"
                ],
                "correctIndex": 1,
                "explanationUz": "Python'da default argumentlar funksiya e'lon qilingan vaqtda bir marta baholanadi. Ruff (`B006` qoidasi) ushbu xavfli xatoni darhol aniqlaydi."
            },
            {
                "id": "d01-3-q3",
                "promptUz": "3. Production Debugging: `pytest` da funksiya `ValueError` ko'tarishini qanday to'g'ri tekshirish kerak?",
                "options": [
                    "`assert func() == ValueError` deb yozish orqali",
                    "`with pytest.raises(ValueError): func()` kontekst menejeri orqali",
                    "`print(ValueError)` qilish orqali",
                    "Test faylini o'chirib tashlash orqali"
                ],
                "correctIndex": 1,
                "explanationUz": "`with pytest.raises(ValueError):` bloki funksiya kutilgan xatoni ko'targanda testni PASS qiladi, xato ko'tarmasa FAIL qiladi."
            }
        ]
    }
}
