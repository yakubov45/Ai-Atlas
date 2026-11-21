# -*- coding: utf-8 -*-
"""
Combines base 12-week curriculum with deep granular enrichment data for all 42 lessons (D01.1 - D12.3)
and writes src/lib/curriculum/ds-ml-ai-12weeks.ts
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from enrich_data_w1_w4 import ENRICH_W1_W4
from enrich_data_w2_w3 import ENRICH_W2_W3
from enrich_data_w4_w5 import ENRICH_W4_W5
from enrich_data_w6_w7 import ENRICH_W6_W7
from enrich_data_w8_w9 import ENRICH_W8_W9
from enrich_data_w10_w12 import ENRICH_W10_W12

ALL_ENRICHMENTS = {}
for part in (ENRICH_W1_W4, ENRICH_W2_W3, ENRICH_W4_W5, ENRICH_W6_W7, ENRICH_W8_W9, ENRICH_W10_W12):
    ALL_ENRICHMENTS.update(part)

# Load base WEEKS, SOURCES, GAP_MATERIALS from generate-12weeks-full.py
base_code = Path("scripts/generate-12weeks-full.py").read_text(encoding="utf-8")
exec_globals = {}
exec(base_code.split("ts_content =")[0], exec_globals)

WEEKS = exec_globals["WEEKS"]
SOURCES = exec_globals["SOURCES"]
GAP_MATERIALS = exec_globals["GAP_MATERIALS"]

total_lessons = 0
total_micro_steps = 0
total_examples = 0
total_terms = 0
total_interview_qa = 0
total_videos = 0
total_quizzes = 0

for week in WEEKS:
    for lesson in week["lessons"]:
        lid = lesson["id"]
        if lid not in ALL_ENRICHMENTS:
            raise KeyError(f"Missing enrichment for lesson {lid}!")
        enr = ALL_ENRICHMENTS[lid]
        lesson["microSteps"] = enr["microSteps"]
        lesson["practicalExamples"] = enr["practicalExamples"]
        lesson["termsAndConnections"] = enr["termsAndConnections"]
        lesson["interviewQA"] = enr["interviewQA"]
        lesson["videos"] = enr["videos"]
        lesson["quiz"] = enr["quiz"]

        total_lessons += 1
        total_micro_steps += len(lesson["microSteps"])
        total_examples += len(lesson["practicalExamples"])
        total_terms += len(lesson["termsAndConnections"])
        total_interview_qa += len(lesson["interviewQA"])
        total_videos += len(lesson["videos"])
        total_quizzes += len(lesson["quiz"])

PORTFOLIO_PROJECTS = [
    {
        "id": "portfolio-1",
        "weekSpan": "1-4-haftalar",
        "titleUz": "1-Portfolio: Tabular Churn ML Pipeline va Production API",
        "goalUz": "Mijozlarning ketish (Churn) ehtimolini bashorat qiluvchi to'liq klassik ML tizimi. Scikit-Learn Pipeline, nomutanosib klasslar uchun PR-AUC optimallashtirish, FastAPI /predict va /health endpointlari, pytest testlari va Dockerfile.",
        "techStack": ["Python 3.12", "uv", "Scikit-Learn", "Polars", "FastAPI", "Docker", "MLflow", "pytest"],
        "deliverables": [
            "Mijozlar ketishini tahlil qiluvchi toza EDA notebooki",
            "Scikit-Learn Pipeline bilan train/evaluate qiluvchi skript",
            "FastAPI web-servisi (input validatsiya, proba, risk level)",
            "Konteynerlashtirilgan Dockerfile va ishga tushirish yo'riqnomasi (README.md)",
            "80%+ test qamrovli pytest testlari"
        ],
        "evaluationCriteria": [
            "Data Leakage yo'qligi va cross-validation to'g'ri qo'llanilganligi",
            "Nomutanosib klasslarda optimal threshold va PR-AUC asoslanganligi",
            "Docker build va /health tekshiruvi xatosiz o'tishi"
        ]
    },
    {
        "id": "portfolio-2",
        "weekSpan": "5-8-haftalar",
        "titleUz": "2-Portfolio: Mahalliy O'zbekcha RAG Tizimi va QLoRA Fine-Tuning",
        "goalUz": "O'zbek tilidagi qonun hujjatlari va korporativ bilimlardan aniq iqtibos (citation [1], [2]) bilan javob beruvchi mahalliy RAG tizimi hamda 1B-3B modelini QLoRA bilan o'qitish.",
        "techStack": ["PyTorch", "HuggingFace", "Ollama / llama.cpp", "ChromaDB / Qdrant", "RankBM25", "PEFT / QLoRA", "FastAPI"],
        "deliverables": [
            "Matnlarni semantik bo'laklash (Chunking) va BGE/Qwen embedding quvuri",
            "Gibrid qidiruv (BM25 + Dense Vector Search) va Reranking",
            "O'zbek tilidagi qat'iy Anti-Hallucination prompt shabloni",
            "Kaggle/Colab da QLoRA orqali instruksiyalarga moslashtirilgan LoRA adapteri",
            "30 ta savolli golden set (golden_uz_30.jsonl) orqali baholash hisoboti"
        ],
        "evaluationCriteria": [
            "Javoblarda keltirilgan iqtiboslarning haqiqiy kontekstga 100% mosligi",
            "Hujjatda javob bo'lmaganda model to'qimamasdan buni ochiq tan olishi",
            "16 GB RAM da Ollama/llama.cpp orqali CPU inferensi barqarorligi"
        ]
    },
    {
        "id": "portfolio-3",
        "weekSpan": "9-12-haftalar",
        "titleUz": "3-Portfolio (Capstone): Korporativ E2E RAG Stack, Observability va CI/CD",
        "goalUz": "To'liq ishlab chiqarish (Production-Grade) AI tizimi. FastAPI Gateway, Redis kesh, Prometheus/Grafana metrikalari, Langfuse tracing, Ragas baholash va Runbook.",
        "techStack": ["FastAPI", "Docker Compose", "Redis", "Prometheus", "Grafana", "Langfuse", "Ragas", "Locust", "GitHub Actions"],
        "deliverables": [
            "Bitta buyruq bilan ko'tariluvchi docker-compose.yml (Gateway, VectorDB, Redis, Monitoring)",
            "Server-Sent Events (SSE) streaming javoblar",
            "Locust yuklama testi (p95 latency va concurrency xaritasi)",
            "Langfuse orqali har bir LLM chaqiruvining trace, token narxi va latency monitoringi",
            "To'liq ishlab chiqarish System Card va Runbook (nosozliklarni bartaraf etish yo'riqnomasi)"
        ],
        "evaluationCriteria": [
            "Docker Compose bitta buyruq bilan xatosiz ko'tarilishi",
            "Yuklama ostida p95 latency ning 3 soniyadan oshmasligi",
            "Texnik intervyu himoyasi va arxitektura tanlovlarining to'liq asoslanishi"
        ]
    }
]

ts_output = f"""/**
 * AI Atlas — 12-Haftalik Intensiv Data Science & ML-AI Engineering O'quv Dasturi (Boyitilgan Versiya)
 * Manbalar: deepresearch.md, data scientist ML-AI Engineering.md va AI Atlas YouTube Katalogi
 * - 12 Hafta, 42 ta Dars (D01.1–D12.3)
 * - {total_micro_steps} ta Qadamma-qadam Maydalab Tushuntirish Bosqichi (MicroSteps)
 * - {total_examples} ta Real Amaliy Misol va Qanday Ishlatilishi Qo'llanmasi
 * - {total_terms} ta Terminlar va Ularning O'zaro Bog'liqlik Xaritasi
 * - {total_interview_qa} ta Junior / Middle / Senior Texnik Intervyu Savol-Javoblari
 * - {total_videos} ta Tasdiqlangan Video Darslar va Ulardan Foydalanish Yo'riqnomasi
 * - {total_quizzes} ta Checkpoint Test Savollari
 */

export interface IntensiveQuizItem {{
  id: string;
  promptUz: string;
  options: string[];
  correctIndex: number;
  explanationUz: string;
}}

export interface IntensiveMicroStep {{
  stepNumber: number;
  titleUz: string;
  explanationUz: string;
  codeExample: string;
  outputOrNoteUz: string;
}}

export interface IntensivePracticalExample {{
  titleUz: string;
  scenarioUz: string;
  howToUseUz: string;
  code: string;
  expectedOutput: string;
  breakdownUz: string;
}}

export interface IntensiveConceptLink {{
  targetTerm: string;
  targetLessonId: string;
  relationshipUz: string;
}}

export interface IntensiveTermConnection {{
  term: string;
  category: "Python & Infra" | "Data & SQL" | "Math & Stats" | "Classic ML" | "Deep Learning & NLP" | "LLM & RAG" | "MLOps & Eval";
  definitionUz: string;
  analogyOrExampleUz: string;
  connectedTo: IntensiveConceptLink[];
}}

export interface IntensiveInterviewQuestion {{
  id: string;
  level: "Junior" | "Middle" | "Senior / Production";
  questionUz: string;
  interviewerIntentUz: string;
  strongAnswerUz: string;
  redFlagUz: string;
  followUpQuestionUz: string;
}}

export interface IntensiveVideoResource {{
  id: string;
  title: string;
  channel: string;
  language: "uz" | "en" | "ru";
  youtubeId: string;
  youtubeUrl: string;
  durationOrTimestamp: string;
  whatItExplainsUz: string;
  howToUseVideoUz: string;
}}

export interface IntensiveLessonItem {{
  id: string;
  titleUz: string;
  sourceIds: string[];
  theoryUz: string;
  codeSnippet: string;
  keyTakeawaysUz: string[];
  microSteps: IntensiveMicroStep[];
  practicalExamples: IntensivePracticalExample[];
  termsAndConnections: IntensiveTermConnection[];
  interviewQA: IntensiveInterviewQuestion[];
  videos: IntensiveVideoResource[];
  quiz: IntensiveQuizItem[];
}}

export interface IntensiveWeekItem {{
  weekNumber: number;
  titleUz: string;
  focusUz: string;
  deliverableUz: string;
  lessons: IntensiveLessonItem[];
}}

export interface CurriculumSourceItem {{
  id: string;
  name: string;
  author: string;
  url: string;
  lang: string;
  license: string;
  role: string;
}}

export interface GapMaterialItem {{
  id: string;
  titleUz: string;
  lessonId: string;
  desc: string;
}}

export interface PortfolioProjectSpec {{
  id: string;
  weekSpan: string;
  titleUz: string;
  goalUz: string;
  techStack: string[];
  deliverables: string[];
  evaluationCriteria: string[];
}}

export const INTENSIVE_12_WEEKS: IntensiveWeekItem[] = {json.dumps(WEEKS, indent=2, ensure_ascii=False)};

export const ALL_INTENSIVE_LESSONS: IntensiveLessonItem[] = INTENSIVE_12_WEEKS.flatMap((w) => w.lessons);

export function getIntensiveLessonById(id: string): IntensiveLessonItem | undefined {{
  return ALL_INTENSIVE_LESSONS.find((l) => l.id === id);
}}

export const CURRICULUM_55_SOURCES: CurriculumSourceItem[] = {json.dumps(SOURCES, indent=2, ensure_ascii=False)};

export const ORIGINAL_9_GAP_MATERIALS: GapMaterialItem[] = {json.dumps(GAP_MATERIALS, indent=2, ensure_ascii=False)};

export const PORTFOLIO_PROJECTS: PortfolioProjectSpec[] = {json.dumps(PORTFOLIO_PROJECTS, indent=2, ensure_ascii=False)};
"""

out_path = Path("src/lib/curriculum/ds-ml-ai-12weeks.ts")
out_path.write_text(ts_output, encoding="utf-8")

print(f"SUCCESS! Wrote {out_path} ({out_path.stat().st_size / 1024:.1f} KB)")
print(f"Stats: {total_lessons} lessons | {total_micro_steps} micro-steps | {total_examples} practical examples | {total_terms} terms | {total_interview_qa} interview Q&As | {total_videos} videos | {total_quizzes} quiz items")
