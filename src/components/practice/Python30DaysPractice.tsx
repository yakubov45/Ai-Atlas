"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  PYTHON_30_DAYS_DATA,
  type Python30DayData,
} from "@/lib/curriculum/python-30-days-data";
import { runPythonCode } from "@/lib/runner/python-runner";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Play,
  RotateCcw,
  Trophy,
  Download,
  Brain,
  ChevronRight,
  ChevronLeft,
  Terminal,
  FileCode2,
  Layers,
} from "lucide-react";

export interface Python30DaysPracticeProps {
  initialDay?: number;
  allowedDays?: number[];
  className?: string;
  onDayComplete?: (dayNumber: number, score: number) => void;
}

interface UserProgress {
  scores: Record<string, number>; // key: "01.T1", value: points
  answers: Record<string, string>; // user entered text/choice
  userCodes: Record<string, string>; // user custom code for debugging/practice
}

const STORAGE_KEY = "ai_platform_python_30_days_progress_v1";

const DAY_GROUPS = [
  { id: "1-3", label: "Kun 1–3", subtitle: "Asoslar & Operatorlar" },
  { id: "4-8", label: "Kun 4–8", subtitle: "To'plamlar (List, Dict)" },
  { id: "9-11", label: "Kun 9–11", subtitle: "Shartlar, Sikllar, Funksiyalar" },
  { id: "12-15", label: "Kun 12–15", subtitle: "Modullar & Xatolar" },
  { id: "16-20", label: "Kun 16–20", subtitle: "Fayllar & Paketlar" },
  { id: "21-25", label: "Kun 21–25", subtitle: "OOP, Scraping, Pandas" },
  { id: "26-30", label: "Kun 26–30", subtitle: "Web, API & Yakuniy" },
] as const;

export function Python30DaysPractice({
  initialDay = 1,
  allowedDays,
  className = "",
  onDayComplete,
}: Python30DaysPracticeProps) {
  const [currentDay, setCurrentDay] = useState<number>(initialDay);
  const [activeLevelTab, setActiveLevelTab] = useState<1 | 2 | 3 | 4 | 5>(1);

  // User progress state
  const [progress, setProgress] = useState<UserProgress>({
    scores: {},
    answers: {},
    userCodes: {},
  });

  // Local interactive execution states
  const [selectedQuizChoice, setSelectedQuizChoice] = useState<string>("");
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const [predictedOutput, setPredictedOutput] = useState<string>("");
  const [predictionResult, setPredictionResult] = useState<{
    tested: boolean;
    matched: boolean;
    realOutput: string;
    messageUz: string;
  } | null>(null);

  const [debuggingCode, setDebuggingCode] = useState<string>("");
  const [debuggingOutput, setDebuggingOutput] = useState<string>("");
  const [debuggingRunning, setDebuggingRunning] = useState<boolean>(false);
  const [debuggingPassed, setDebuggingPassed] = useState<boolean>(false);

  const [practiceCode, setPracticeCode] = useState<string>("");
  const [practiceOutput, setPracticeOutput] = useState<string>("");
  const [practiceRunning, setPracticeRunning] = useState<boolean>(false);
  const [practicePassed, setPracticePassed] = useState<boolean>(false);

  const [challengeCode, setChallengeCode] = useState<string>("");
  const [challengeOutput, setChallengeOutput] = useState<string>("");
  const [challengeRunning, setChallengeRunning] = useState<boolean>(false);
  const [challengePassed, setChallengePassed] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress helper
  const saveProgressUpdate = useCallback(
    (updater: (prev: UserProgress) => UserProgress) => {
      setProgress((prev) => {
        const next = updater(prev);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [],
  );

  // Current day data lookup
  const dayData: Python30DayData = useMemo(() => {
    const found = PYTHON_30_DAYS_DATA.find((d) => d.dayNumber === currentDay);
    return found ?? (PYTHON_30_DAYS_DATA[0] as Python30DayData);
  }, [currentDay]);

  // Reset editor states when day changes
  useEffect(() => {
    const t3Key = `${dayData.t3.id}_code`;
    const p1Key = `${dayData.p1.id}_code`;
    const p2Key = `${dayData.p2.id}_code`;

    setSelectedQuizChoice(progress.answers[dayData.t1.id] || "");
    setQuizSubmitted(Boolean(progress.scores[dayData.t1.id]));

    setPredictedOutput(progress.answers[dayData.t2.id] || "");
    setPredictionResult(null);

    setDebuggingCode(
      progress.userCodes[t3Key] ||
        dayData.t3.buggyCode ||
        `# ${dayData.t3.title}\n# Xatoni toping va to'g'irlang:\n`,
    );
    setDebuggingOutput("");
    setDebuggingPassed(Boolean(progress.scores[dayData.t3.id]));

    setPracticeCode(
      progress.userCodes[p1Key] ||
        `# ${dayData.p1.id}: ${dayData.p1.title}\n# ${dayData.p1.description}\n\n`,
    );
    setPracticeOutput("");
    setPracticePassed(Boolean(progress.scores[dayData.p1.id]));

    setChallengeCode(
      progress.userCodes[p2Key] ||
        `# ${dayData.p2.id}: ${dayData.p2.title}\n# ${dayData.p2.description}\n\n`,
    );
    setChallengeOutput("");
    setChallengePassed(Boolean(progress.scores[dayData.p2.id]));
  }, [currentDay, dayData, progress.answers, progress.scores, progress.userCodes]);

  // Overall Score Calculation (max 900)
  const totalScore = useMemo(() => {
    return Object.values(progress.scores).reduce((a, b) => a + b, 0);
  }, [progress.scores]);

  // Day specific score (max 30)
  const currentDayScore = useMemo(() => {
    const t1 = progress.scores[dayData.t1.id] || 0;
    const t2 = progress.scores[dayData.t2.id] || 0;
    const t3 = progress.scores[dayData.t3.id] || 0;
    const p1 = progress.scores[dayData.p1.id] || 0;
    const p2 = progress.scores[dayData.p2.id] || 0;
    const p3 = progress.scores[dayData.p3.id] || 0;
    return Math.min(30, t1 + t2 + t3 + p1 + p2 + p3);
  }, [dayData, progress.scores]);

  // Score Rank Badge
  const userRank = useMemo(() => {
    if (totalScore >= 810) return { label: "Advanced", color: "text-emerald-400 bg-emerald-950/60 border-emerald-500/50" };
    if (totalScore >= 720) return { label: "Upper Intermediate", color: "text-cyan-400 bg-cyan-950/60 border-cyan-500/50" };
    if (totalScore >= 630) return { label: "Intermediate", color: "text-amber-400 bg-amber-950/60 border-amber-500/50" };
    if (totalScore >= 450) return { label: "Elementary", color: "text-blue-400 bg-blue-950/60 border-blue-500/50" };
    return { label: "Beginner", color: "text-slate-300 bg-slate-900 border-slate-700" };
  }, [totalScore]);

  // 1. Submit Level 1 Quiz
  const handleCheckQuiz = () => {
    if (!selectedQuizChoice) return;
    const choiceLetter = selectedQuizChoice.trim()[0];
    const isCorrect = choiceLetter === dayData.t1.correctLetter;

    setQuizSubmitted(true);
    if (isCorrect) {
      saveProgressUpdate((prev) => ({
        ...prev,
        scores: { ...prev.scores, [dayData.t1.id]: dayData.t1.points },
        answers: { ...prev.answers, [dayData.t1.id]: selectedQuizChoice },
      }));
    } else {
      saveProgressUpdate((prev) => ({
        ...prev,
        answers: { ...prev.answers, [dayData.t1.id]: selectedQuizChoice },
      }));
    }
  };

  // 2. Submit Level 2 Prediction
  const handleCheckPrediction = async () => {
    if (!predictedOutput.trim()) return;

    // Execute real code to obtain real output
    let realStdout = "";
    try {
      const res = await runPythonCode(dayData.t2.code, [], { runTests: false });
      realStdout = (res.stdout || "").trim();
    } catch {
      realStdout = dayData.t2.expectedOutput;
    }

    const cleanUser = predictedOutput.trim().replace(/\s+/g, " ");
    const cleanReal = (realStdout || dayData.t2.expectedOutput).trim().replace(/\s+/g, " ");
    const cleanExpected = dayData.t2.expectedOutput.trim().replace(/\s+/g, " ");

    const isMatch =
      cleanUser === cleanReal ||
      cleanUser === cleanExpected ||
      cleanReal.includes(cleanUser);

    if (isMatch) {
      setPredictionResult({
        tested: true,
        matched: true,
        realOutput: realStdout || dayData.t2.expectedOutput,
        messageUz: "Ajoyib! Miyangizda hisoblagan natijangiz haqiqiy kod natijasi bilan to'liq mos tushdi!",
      });
      saveProgressUpdate((prev) => ({
        ...prev,
        scores: { ...prev.scores, [dayData.t2.id]: dayData.t2.points },
        answers: { ...prev.answers, [dayData.t2.id]: predictedOutput },
      }));
    } else {
      setPredictionResult({
        tested: true,
        matched: false,
        realOutput: realStdout || dayData.t2.expectedOutput,
        messageUz: `Natija mos kelmadi. Siz kiritdingiz: "${predictedOutput}", haqiqiy natija esa: "${realStdout || dayData.t2.expectedOutput}"`,
      });
      saveProgressUpdate((prev) => ({
        ...prev,
        answers: { ...prev.answers, [dayData.t2.id]: predictedOutput },
      }));
    }
  };

  // 3. Run Level 3 Debugging Code
  const handleRunDebugging = async () => {
    setDebuggingRunning(true);
    setDebuggingOutput("Kodingiz Pyodide orqali tekshirilmoqda...");
    try {
      const res = await runPythonCode(debuggingCode, [], { runTests: false });
      const out = res.success
        ? res.stdout || "Kod xatosiz bajarildi!"
        : `Xatolik:\n${res.stderr || res.error || "Noma'lum xatolik"}`;
      setDebuggingOutput(out);

      // Check if code was fixed and executes without error
      if (res.success && !res.stderr) {
        setDebuggingPassed(true);
        saveProgressUpdate((prev) => ({
          ...prev,
          scores: { ...prev.scores, [dayData.t3.id]: dayData.t3.points },
          userCodes: { ...prev.userCodes, [`${dayData.t3.id}_code`]: debuggingCode },
        }));
      }
    } catch (e: unknown) {
      setDebuggingOutput(`Bajarishda xatolik yuz berdi: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setDebuggingRunning(false);
    }
  };

  // 4. Run Level 4 Problem Solving Code
  const handleRunPractice = async () => {
    setPracticeRunning(true);
    setPracticeOutput("Kodingiz brauzerda ishga tushirilmoqda...");
    try {
      const res = await runPythonCode(practiceCode, [], { runTests: false });
      const out = res.success
        ? res.stdout || "Kod xatosiz bajarildi (Chiqish mavjud emas)."
        : `Xatolik:\n${res.stderr || res.error || "Noma'lum xatolik"}`;
      setPracticeOutput(out);

      if (res.success && !res.stderr && practiceCode.trim().length > 15) {
        setPracticePassed(true);
        saveProgressUpdate((prev) => ({
          ...prev,
          scores: { ...prev.scores, [dayData.p1.id]: dayData.p1.points },
          userCodes: { ...prev.userCodes, [`${dayData.p1.id}_code`]: practiceCode },
        }));
      }
    } catch (e: unknown) {
      setPracticeOutput(`Bajarishda xatolik: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setPracticeRunning(false);
    }
  };

  // 5. Run Level 5 Real-world Challenge Code
  const handleRunChallenge = async () => {
    setChallengeRunning(true);
    setChallengeOutput("Kodingiz brauzerda ishga tushirilmoqda...");
    try {
      const res = await runPythonCode(challengeCode, [], { runTests: false });
      const out = res.success
        ? res.stdout || "Kod xatosiz bajarildi."
        : `Xatolik:\n${res.stderr || res.error || "Noma'lum xatolik"}`;
      setChallengeOutput(out);

      if (res.success && !res.stderr && challengeCode.trim().length > 15) {
        setChallengePassed(true);
        saveProgressUpdate((prev) => ({
          ...prev,
          scores: { ...prev.scores, [dayData.p2.id]: dayData.p2.points },
          userCodes: { ...prev.userCodes, [`${dayData.p2.id}_code`]: challengeCode },
        }));
      }
    } catch (e: unknown) {
      setChallengeOutput(`Bajarishda xatolik: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setChallengeRunning(false);
    }
  };

  // Navigation handlers
  const handlePrevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDay < 30) {
      setCurrentDay(currentDay + 1);
      if (onDayComplete) onDayComplete(currentDay, currentDayScore);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Platform & Header Overview Card */}
      <div className="rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl p-5 sm:p-7 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Terminal className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 tracking-tight">
                30 Days of Python — 5-Darajali Amaliyot Tizimi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Asabeneh / 30-Days-Of-Python asosidagi 180 ta topshiriq (90 test + 90 amaliy masala).
              Nazariyadan tortib mustaqil algoritm va real loyihagacha o&apos;rganing.
            </p>
          </div>

          {/* Overall Score & Badge */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2.5 sm:p-3 rounded-2xl shrink-0">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-800/40">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">
                Umumiy Natija: <span className="text-slate-100 font-bold">{totalScore}</span> / 900 ball
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${userRank.color}`}>
                  {userRank.label}
                </span>
                <span className="text-[11px] text-slate-500">
                  (Bugun: {currentDayScore}/30)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Resources Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 border border-slate-800/80 p-3 rounded-2xl">
          <div className="flex items-center gap-2 text-slate-300">
            <FileCode2 className="w-4 h-4 text-cyan-400" />
            <span>Markdown fayllar (Obsidian bilan mos, 30 kunlik):</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/30_days_python_test_va_amaliyot.md"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Mashqlar (.md)</span>
            </a>
            <a
              href="/30_days_python_test_javoblari.md"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Test Javoblari (.md)</span>
            </a>
          </div>
        </div>

        {/* Day Group Switcher & Day Navigation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Mavzular Guruhlari:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevDay}
                disabled={currentDay <= 1}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Oldingi kun"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-200 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800">
                Kun {currentDay} / 30
              </span>
              <button
                type="button"
                onClick={handleNextDay}
                disabled={currentDay >= 30}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Keyingi kun"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day Group Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {DAY_GROUPS.map((grp) => {
              const [startDayStr] = grp.id.split("-");
              const startDay = Number(startDayStr) || 1;
              const isActive =
                (grp.id === "1-3" && currentDay <= 3) ||
                (grp.id === "4-8" && currentDay >= 4 && currentDay <= 8) ||
                (grp.id === "9-11" && currentDay >= 9 && currentDay <= 11) ||
                (grp.id === "12-15" && currentDay >= 12 && currentDay <= 15) ||
                (grp.id === "16-20" && currentDay >= 16 && currentDay <= 20) ||
                (grp.id === "21-25" && currentDay >= 21 && currentDay <= 25) ||
                (grp.id === "26-30" && currentDay >= 26 && currentDay <= 30);

              return (
                <button
                  key={grp.id}
                  type="button"
                  onClick={() => setCurrentDay(startDay)}
                  className={`p-2 rounded-2xl text-left border transition-all cursor-pointer ${
                    isActive
                      ? "bg-violet-950/70 border-violet-600/80 text-violet-100 shadow-md shadow-violet-950"
                      : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="text-[11px] font-bold text-violet-300">{grp.label}</div>
                  <div className="text-[10px] truncate opacity-80">{grp.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* Quick Day Pill List (Allowed or nearby days) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
              const isAllowed = !allowedDays || allowedDays.includes(d);
              const isSelected = d === currentDay;
              const isPassed = (progress.scores[`${String(d).padStart(2, "0")}.T1`] || 0) > 0;

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setCurrentDay(d)}
                  className={`shrink-0 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md"
                      : isPassed
                      ? "bg-slate-900 text-emerald-400 border-emerald-500/40 hover:bg-slate-800"
                      : isAllowed
                      ? "bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800"
                      : "bg-slate-950 text-slate-600 border-slate-900 opacity-60 hover:opacity-100"
                  }`}
                >
                  {d}-kun
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day Info Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-violet-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            {dayData.groupTitle}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            {dayData.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
            Kunlik ball: <span className="text-amber-400 font-bold">{currentDayScore}</span> / 30
          </div>
        </div>
      </div>

      {/* 5-Level Stage Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <button
          type="button"
          onClick={() => setActiveLevelTab(1)}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeLevelTab === 1
              ? "bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/40"
              : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>🟢 Level 1</span>
            </span>
            <span className="text-[10px] text-slate-400">2 ball</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">Nazariy Test</div>
          <div className="text-[10px] text-slate-400">Tushunchalarni bilish</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveLevelTab(2)}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeLevelTab === 2
              ? "bg-blue-950/70 border-blue-500 text-blue-100 shadow-lg shadow-blue-950/40"
              : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
              <span>🔵 Level 2</span>
            </span>
            <span className="text-[10px] text-slate-400">2 ball</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">Output Prediction</div>
          <div className="text-[10px] text-slate-400">Oldindan hisoblab topish</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveLevelTab(3)}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeLevelTab === 3
              ? "bg-amber-950/70 border-amber-500 text-amber-100 shadow-lg shadow-amber-950/40"
              : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>🟡 Level 3</span>
            </span>
            <span className="text-[10px] text-slate-400">2 ball</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">Debugging</div>
          <div className="text-[10px] text-slate-400">Xatolarni tuzatish</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveLevelTab(4)}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
            activeLevelTab === 4
              ? "bg-orange-950/70 border-orange-500 text-orange-100 shadow-lg shadow-orange-950/40"
              : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
              <span>🟠 Level 4</span>
            </span>
            <span className="text-[10px] text-slate-400">8 ball</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">Problem Solving</div>
          <div className="text-[10px] text-slate-400">Mustaqil algoritm</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveLevelTab(5)}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer col-span-2 sm:col-span-1 ${
            activeLevelTab === 5
              ? "bg-rose-950/70 border-rose-500 text-rose-100 shadow-lg shadow-rose-950/40"
              : "bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
              <span>🔴 Level 5</span>
            </span>
            <span className="text-[10px] text-slate-400">8 ball</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">Challenge</div>
          <div className="text-[10px] text-slate-400">Bilimlarni birlashtirish</div>
        </button>
      </div>

      {/* Level 1: Nazariy test */}
      {activeLevelTab === 1 && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                Level 1: Nazariy Test ({dayData.t1.id})
              </h4>
            </div>
            <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
              +2 ball
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              {dayData.t1.question}
            </div>

            {dayData.t1.options && dayData.t1.options.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dayData.t1.options.map((opt, idx) => {
                  const letter = opt.trim()[0] || "";
                  const isSelected = Boolean(letter && selectedQuizChoice.startsWith(letter));
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedQuizChoice(opt);
                        setQuizSubmitted(false);
                      }}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? "bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-md"
                          : "bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                      }`}>
                        {letter}
                      </span>
                      <span>{opt.substring(2).trim()}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCheckQuiz}
                disabled={!selectedQuizChoice}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Javobni tekshirish
              </button>
              {quizSubmitted && (
                <span className="text-xs text-slate-400">
                  {selectedQuizChoice.startsWith(dayData.t1.correctLetter)
                    ? "To'g'ri javob berildi!"
                    : "Qayta urinib ko'ring."}
                </span>
              )}
            </div>

            {quizSubmitted && (
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                selectedQuizChoice.startsWith(dayData.t1.correctLetter)
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-200"
              }`}>
                <div className="flex items-center gap-2 font-bold">
                  {selectedQuizChoice.startsWith(dayData.t1.correctLetter) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Barakalla! To&apos;g&apos;ri javob tanlandi (+2 ball)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Noto&apos;g&apos;ri. To&apos;g&apos;ri javob: {dayData.t1.correctLetter}</span>
                    </>
                  )}
                </div>
                <div className="text-xs opacity-90 pl-6">
                  {dayData.t1.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Level 2: Output Prediction */}
      {activeLevelTab === 2 && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                Level 2: Output Prediction ({dayData.t2.id})
              </h4>
            </div>
            <span className="text-xs text-blue-400 font-semibold px-2.5 py-1 rounded-xl bg-blue-950/60 border border-blue-500/30">
              +2 ball
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 flex items-center gap-2.5">
            <Brain className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Asosiy qoida:</strong> Testdagi kodni dastlab ishga tushirmasdan, miyangizda hisoblab javob bering!
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              {dayData.t2.prompt}
            </div>

            {dayData.t2.code && (
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto">
                <pre>{dayData.t2.code}</pre>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">
                Sizning bashoratingiz (konsolga nima chiqadi?):
              </label>
              <input
                type="text"
                value={predictedOutput}
                onChange={(e) => setPredictedOutput(e.target.value)}
                placeholder="Hisoblangan natijani yozing..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCheckPrediction}
                disabled={!predictedOutput.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Bashoratni tekshirish & Kodni ishga tushirish</span>
              </button>
            </div>

            {predictionResult && (
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                predictionResult.matched
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                  : "bg-rose-950/40 border-rose-500/40 text-rose-200"
              }`}>
                <div className="flex items-center gap-2 font-bold">
                  {predictionResult.matched ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{predictionResult.messageUz} (+2 ball)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>{predictionResult.messageUz}</span>
                    </>
                  )}
                </div>
                <div className="text-xs opacity-90 pl-6">
                  <strong>Izoh:</strong> {dayData.t2.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Level 3: Debugging */}
      {activeLevelTab === 3 && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                Level 3: Debugging ({dayData.t3.id})
              </h4>
            </div>
            <span className="text-xs text-amber-400 font-semibold px-2.5 py-1 rounded-xl bg-amber-950/60 border border-amber-500/30">
              +2 ball
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-slate-300 font-medium bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              {dayData.t3.prompt}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Kodni to&apos;g&apos;irlang va ishga tushiring:</span>
                <span className="text-[11px] text-amber-400/80">Pyodide Sandbox</span>
              </label>
              <textarea
                value={debuggingCode}
                onChange={(e) => setDebuggingCode(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700/80 font-mono text-xs sm:text-sm text-amber-300 focus:outline-none focus:border-amber-500 transition-colors"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleRunDebugging}
                disabled={debuggingRunning}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{debuggingRunning ? "Tekshirilmoqda..." : "Kodni ishga tushirish (Pyodide)"}</span>
              </button>
              <button
                type="button"
                onClick={() => setDebuggingCode(dayData.t3.buggyCode || "")}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Asliga qaytarish</span>
              </button>
            </div>

            {debuggingOutput && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">Natija:</div>
                <div className="rounded-2xl bg-black/70 border border-slate-800 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap">
                  {debuggingOutput}
                </div>
              </div>
            )}

            {debuggingPassed && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Xatolik muvaffaqiyatli tuzatildi! (+2 ball)</span>
                </div>
                <div className="text-xs opacity-90 pl-6">
                  <strong>Tavsiya qilingan yechim:</strong> {dayData.t3.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Level 4: Problem Solving */}
      {activeLevelTab === 4 && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                Level 4: Problem Solving ({dayData.p1.id})
              </h4>
            </div>
            <span className="text-xs text-orange-400 font-semibold px-2.5 py-1 rounded-xl bg-orange-950/60 border border-orange-500/30">
              +8 ball
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-slate-200 font-medium bg-slate-950/60 p-4 rounded-2xl border border-slate-800 leading-relaxed">
              {dayData.p1.description}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Mustaqil algoritm yozing (Python Sandbox):</span>
                <span className="text-[11px] text-orange-400/80">Cheklovlarga rioya qiling</span>
              </label>
              <textarea
                value={practiceCode}
                onChange={(e) => setPracticeCode(e.target.value)}
                rows={9}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700/80 font-mono text-xs sm:text-sm text-amber-200 focus:outline-none focus:border-orange-500 transition-colors"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleRunPractice}
                disabled={practiceRunning}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{practiceRunning ? "Bajarilmoqda..." : "Kodni bajarish & Tekshirish"}</span>
              </button>
            </div>

            {practiceOutput && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">Terminal Natijasi:</div>
                <div className="rounded-2xl bg-black/70 border border-slate-800 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap">
                  {practiceOutput}
                </div>
              </div>
            )}

            {practicePassed && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ajoyib algoritm! Masala muvaffaqiyatli yechildi (+8 ball).</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Level 5: Real-world Challenge */}
      {activeLevelTab === 5 && (
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
              <h4 className="text-sm sm:text-base font-bold text-slate-100">
                Level 5: Real-world Challenge ({dayData.p2.id})
              </h4>
            </div>
            <span className="text-xs text-rose-400 font-semibold px-2.5 py-1 rounded-xl bg-rose-950/60 border border-rose-500/30">
              +8 ball
            </span>
          </div>

          <div className="space-y-4">
            <div className="text-xs sm:text-sm text-slate-200 font-medium bg-slate-950/60 p-4 rounded-2xl border border-slate-800 leading-relaxed">
              {dayData.p2.description}
            </div>

            {dayData.p3?.description && (
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-purple-300">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Qo&apos;shimcha Bonus Challenge ({dayData.p3.id}):</span>
                </div>
                <div className="opacity-90">{dayData.p3.description}</div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Murakkab topshiriq kodi:</span>
                <span className="text-[11px] text-rose-400/80">Chegaraviy holatlarni hisobga oling</span>
              </label>
              <textarea
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value)}
                rows={10}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700/80 font-mono text-xs sm:text-sm text-amber-200 focus:outline-none focus:border-rose-500 transition-colors"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleRunChallenge}
                disabled={challengeRunning}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{challengeRunning ? "Tekshirilmoqda..." : "Kodni bajarish & Tekshirish"}</span>
              </button>
            </div>

            {challengeOutput && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">Terminal Natijasi:</div>
                <div className="rounded-2xl bg-black/70 border border-slate-800 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap">
                  {challengeOutput}
                </div>
              </div>
            )}

            {challengePassed && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tabriklaymiz! Level 5 Challenge muvaffaqiyatli topshirildi (+8 ball).</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Completion Card & Next Day Navigation */}
      <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Kunlik umumiy ballingiz: <strong className="text-amber-400">{currentDayScore} / 30</strong> ball.
          {currentDayScore >= 24 ? " Ushbu kun muvaffaqiyatli o'zlashtirildi!" : " Keyingi kunga o'tish uchun kamida 24 ball to'plashingiz tavsiya etiladi."}
        </div>
        <div className="flex items-center gap-2">
          {currentDay > 1 && (
            <button
              type="button"
              onClick={handlePrevDay}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              ← Oldingi kun ({currentDay - 1})
            </button>
          )}
          {currentDay < 30 && (
            <button
              type="button"
              onClick={handleNextDay}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Keyingi kunga o&apos;tish ({currentDay + 1}-kun)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
