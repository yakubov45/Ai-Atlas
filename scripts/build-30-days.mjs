import fs from "node:fs";

const testsMd = fs.readFileSync("30_days_python_test_va_amaliyot.md", "utf8");
const answersMd = fs.readFileSync("30_days_python_test_javoblari.md", "utf8");

// Parse answers
const answersMap = {};
const dayAnswerSections = answersMd.split(/^## Day /m).slice(1);
for (const sec of dayAnswerSections) {
  const lines = sec.split("\n");
  for (const line of lines) {
    const m = line.match(/^-\s+\*\*(\d+\.T\d+):\*\*\s+(.*)$/);
    if (m) answersMap[m[1]] = m[2].trim();
  }
}

const daySections = testsMd.split(/^## Day /m).slice(1);
const allDays = [];

for (let i = 0; i < daySections.length; i++) {
  const sec = daySections[i];
  const firstLine = sec.split("\n")[0].trim();
  const dayNum = parseInt(firstLine.match(/^(\d+)/)[1], 10);
  const dayStr = String(dayNum).padStart(2, "0");

  const parts = firstLine.split("—").map((s) => s.trim());
  const title = firstLine;
  const topic = parts.slice(1).join(" — ") || firstLine;

  let group = "1-3";
  let groupTitle = "1–3 kunlar: Python asoslari, o‘zgaruvchilar, operatorlar";
  if (dayNum >= 4 && dayNum <= 8) {
    group = "4-8";
    groupTitle = "4–8 kunlar: String, List, Tuple, Set, Dictionary";
  } else if (dayNum >= 9 && dayNum <= 11) {
    group = "9-11";
    groupTitle = "9–11 kunlar: Conditionals, Loops, Functions";
  } else if (dayNum >= 12 && dayNum <= 15) {
    group = "12-15";
    groupTitle = "12–15 kunlar: Modules, Comprehension, Higher Order Functions, Errors";
  } else if (dayNum >= 16 && dayNum <= 20) {
    group = "16-20";
    groupTitle = "16–20 kunlar: DateTime, Exception, Regex, Files, Packages";
  } else if (dayNum >= 21 && dayNum <= 25) {
    group = "21-25";
    groupTitle = "21–25 kunlar: OOP, Scraping, Venv, Statistics, Pandas";
  } else if (dayNum >= 26 && dayNum <= 30) {
    group = "26-30";
    groupTitle = "26–30 kunlar: Flask, MongoDB, API, yakuniy loyihalar";
  }

  // T1
  const t1Match = sec.match(/\*\*(\d+\.T1\s*—[^*]+)\*\*\s+([\s\S]*?)(?=\*\*\d+\.T2)/);
  const t1Raw = t1Match ? t1Match[2].trim() : "";
  const t1Ans = answersMap[dayStr + ".T1"] || "";

  let t1Question = t1Raw;
  let t1Options = [];
  const optIndex = t1Raw.indexOf("A)");
  if (optIndex !== -1) {
    t1Question = t1Raw.substring(0, optIndex).trim();
    const optsPart = t1Raw.substring(optIndex);
    t1Options = optsPart.split(/(?=[A-D]\))/).map((o) => o.trim()).filter(Boolean);
  }

  // Determine correct choice letter (A, B, C, D)
  let t1CorrectLetter = "A";
  const ansLetterMatch = t1Ans.match(/^([A-D])\b/);
  if (ansLetterMatch) {
    t1CorrectLetter = ansLetterMatch[1];
  }

  // T2
  const t2Match = sec.match(/\*\*(\d+\.T2\s*—[^*]+)\*\*\s+([\s\S]*?)(?=\*\*\d+\.T3)/);
  const t2Raw = t2Match ? t2Match[2].trim() : "";
  const t2Ans = answersMap[dayStr + ".T2"] || "";
  let t2Prompt = "Kodni ishga tushirmasdan, miyangizda hisoblab natijani toping:";
  let t2Code = "";
  const codeBlockMatch = t2Raw.match(/```python([\s\S]*?)```/);
  if (codeBlockMatch) {
    t2Code = codeBlockMatch[1].trim();
    t2Prompt = t2Raw.replace(/```python[\s\S]*?```/, "").trim() || t2Prompt;
  } else {
    t2Prompt = t2Raw;
  }

  // Clean expected output for T2
  let t2CleanAns = t2Ans.replace(/`/g, "").trim();
  if (t2CleanAns.endsWith(".")) {
    t2CleanAns = t2CleanAns.slice(0, -1).trim();
  }

  // T3
  const t3Match = sec.match(/\*\*(\d+\.T3\s*—[^*]+)\*\*\s+([\s\S]*?)(?=### B\. Amaliy mashqlar)/);
  const t3Raw = t3Match ? t3Match[2].trim() : "";
  const t3Ans = answersMap[dayStr + ".T3"] || "";

  // Extract buggy code snippet from T3 if enclosed in backticks
  let t3BuggyCode = "";
  const backtickMatches = t3Raw.match(/`([^`]+)`/g);
  if (backtickMatches && backtickMatches.length > 0) {
    t3BuggyCode = backtickMatches[0].replace(/`/g, "");
  }

  // P1, P2, P3
  const p1Match = sec.match(/\*\*(\d+\.P1\s*—[^*]+)\*\*\s+([\s\S]*?)(?=\*\*\d+\.P2)/);
  const p2Match = sec.match(/\*\*(\d+\.P2\s*—[^*]+)\*\*\s+([\s\S]*?)(?=\*\*\d+\.P3)/);
  const p3Match = sec.match(/\*\*(\d+\.P3\s*—[^*]+)\*\*\s+([\s\S]*?)(?=(?:---|\n## Day |$))/);

  const p1Raw = p1Match ? p1Match[2].trim() : "";
  const p2Raw = p2Match ? p2Match[2].trim() : "";
  const p3Raw = p3Match ? p3Match[2].trim() : "";

  // Titles for P1, P2, P3
  const p1TitleMatch = p1Raw.match(/^([^.\n]+)\./);
  const p2TitleMatch = p2Raw.match(/^([^.\n]+)\./);
  const p3TitleMatch = p3Raw.match(/^([^.\n]+)\./);

  allDays.push({
    dayNumber: dayNum,
    title,
    topic,
    group,
    groupTitle,
    t1: {
      id: `${dayStr}.T1`,
      title: "Nazariy Test (Level 1)",
      question: t1Question,
      options: t1Options,
      correctLetter: t1CorrectLetter,
      explanation: t1Ans,
      points: 2,
    },
    t2: {
      id: `${dayStr}.T2`,
      title: "Output Prediction (Level 2)",
      prompt: t2Prompt,
      code: t2Code,
      expectedOutput: t2CleanAns,
      explanation: t2Ans,
      points: 2,
    },
    t3: {
      id: `${dayStr}.T3`,
      title: "Debugging (Level 3)",
      prompt: t3Raw,
      buggyCode: t3BuggyCode,
      explanation: t3Ans,
      points: 2,
    },
    p1: {
      id: `${dayStr}.P1`,
      dayNumber: dayNum,
      level: 3,
      levelLabel: "Level 3 — Asosiy Mashq",
      title: p1TitleMatch ? p1TitleMatch[1].trim() : "Asosiy Mashq",
      description: p1Raw,
      points: 8,
    },
    p2: {
      id: `${dayStr}.P2`,
      dayNumber: dayNum,
      level: 4,
      levelLabel: "Level 4 — Problem Solving",
      title: p2TitleMatch ? p2TitleMatch[1].trim() : "Problem Solving",
      description: p2Raw,
      points: 8,
    },
    p3: {
      id: `${dayStr}.P3`,
      dayNumber: dayNum,
      level: 5,
      levelLabel: "Level 5 — Real-world Challenge",
      title: p3TitleMatch ? p3TitleMatch[1].trim() : "Real-world Challenge",
      description: p3Raw,
      points: 8,
    },
  });
}

const fileContent = `/**
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

export const PYTHON_30_DAYS_DATA: Python30DayData[] = ${JSON.stringify(allDays, null, 2)};
`;

fs.writeFileSync("src/lib/curriculum/python-30-days-data.ts", fileContent, "utf8");
console.log("Successfully wrote src/lib/curriculum/python-30-days-data.ts with", allDays.length, "days.");
