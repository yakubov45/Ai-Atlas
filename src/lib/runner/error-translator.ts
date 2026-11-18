/**
 * Educational Error Translator (Python & JavaScript -> Uzbek)
 *
 * Explains common programming runtime and syntax errors in friendly,
 * encouraging Uzbek without technical jargon.
 */

export function translateErrorToUzbek(errorString: string): {
  errorName: string;
  summaryUz: string;
  suggestionUz: string;
} {
  const text = errorString.trim();

  if (/IndentationError/i.test(text)) {
    return {
      errorName: "IndentationError (Bo‘shliq xatosi)",
      summaryUz:
        "Python’da kod bloklari (funksiya, if, for) 4 ta bo‘shliq (space) bilan surilishi shart.",
      suggestionUz:
        "Qatorlar boshidagi bo‘shliqlarni tekshiring. `def` yoki `for` dan keyingi qatorlar o‘ngga 4 bo‘shliq surilgan bo‘lishi kerak.",
    };
  }

  if (/SyntaxError/i.test(text)) {
    return {
      errorName: "SyntaxError (Sintaksis xatosi)",
      summaryUz:
        "Python kodingiz tuzilishini tushuna olmadi. Odatda `:` belgisi, qavs yoki qo‘shtirnoq yopilmay qolgan bo‘ladi.",
      suggestionUz:
        "`def ... :` yoki `if ... :` oxirida ikki nuqta borligini, barcha qavslar va qo‘shtirnoqlar juft yopilganini tekshiring.",
    };
  }

  if (/NameError/i.test(text)) {
    const match = text.match(/name '(\w+)' is not defined/i);
    const varName = match ? `'${match[1]}'` : "o‘zgaruvchi";
    return {
      errorName: "NameError (Noma'lum nom)",
      summaryUz: `${varName} nomli o‘zgaruvchi yoki funksiya hali yaratilmagan yoki nomi xato yozilgan.`,
      suggestionUz:
        "Nomning to‘g‘ri yozilganini (katta-kichik harflar farq qiladi) va uni ishlatishdan oldin e'lon qilganingizni tekshiring.",
    };
  }

  if (/TypeError/i.test(text)) {
    return {
      errorName: "TypeError (Ma'lumot turi xatosi)",
      summaryUz:
        "Amal kutilmagan ma'lumot turi ustida bajarildi (masalan, son bilan matnni qo‘shish yoki noto‘g‘ri argument uzatish).",
      suggestionUz:
        "O‘zgaruvchilar turini tekshiring. Kerak bo‘lsa `int()`, `float()` yoki `str()` orqali turni o‘giring.",
    };
  }

  if (/ZeroDivisionError/i.test(text)) {
    return {
      errorName: "ZeroDivisionError (Nolga bo‘lish)",
      summaryUz:
        "Matematikada sonni nolga bo‘lib bo‘lmaydi. Bo‘luvchi qiymat 0 ga teng bo‘lib qolgan.",
      suggestionUz:
        "Bo‘lish amali oldidan maxraj nol emasligini `if maxraj != 0:` orqali tekshiring.",
    };
  }

  if (/IndexError/i.test(text)) {
    return {
      errorName: "IndexError (Ro‘yxat chegarasi)",
      summaryUz:
        "Ro‘yxatda mavjud bo‘lmagan indeksdagi elementni olishga harakat qilindi.",
      suggestionUz:
        "Python’da indekslash 0 dan boshlanadi. Masalan, 3 ta elementli ro‘yxatda eng oxirgi indeks 2 bo‘ladi (`len(arr) - 1`).",
    };
  }

  if (/KeyError/i.test(text)) {
    return {
      errorName: "KeyError (Lug‘at kaliti topilmadi)",
      summaryUz: "Lug‘at (dict) ichida bunday kalit mavjud emas.",
      suggestionUz:
        "Kalit to‘g‘ri kiritilganini tekshiring yoki xavfsiz qidirish uchun `dict.get(key, default)` dan foydalaning.",
    };
  }

  if (/AssertionError/i.test(text)) {
    return {
      errorName: "AssertionError (Kutilgan natija chiqmadi)",
      summaryUz:
        "Funksiyangiz ishladi, ammo test bergan kiritish uchun kutilgan to‘g‘ri qiymatni qaytarmadi.",
      suggestionUz:
        "Qaytgan natija va kutilgan natijani solishtiring. Algoritm shartlarini (masalan, chekka holatlarni) qayta ko‘rib chiqing.",
    };
  }

  if (/TimeoutError|timed out/i.test(text)) {
    return {
      errorName: "TimeoutError (Vaqt chegarasi tugadi)",
      summaryUz:
        "Dastur belgilangan vaqt ichida yakunlanmadi. Kodingizda cheksiz sikl (`while True:`) yuzaga kelgan bo‘lishi mumkin.",
      suggestionUz:
        "Sikl qadamlarini tekshiring. Sikl har bir qadamda to‘xtash shartiga yaqinlashayotganiga ishonch hosil qiling.",
    };
  }

  return {
    errorName: "Ishga tushirish xatosi (Runtime Error)",
    summaryUz: "Kod bajarilishi davomida xatolik yuz berdi.",
    suggestionUz: text.slice(0, 150),
  };
}
