/**
 * AI Atlas — Hugging Face LLM Course Shared Collection & Track Overlay Engine
 *
 * Integrates the 13-chapter (Chapters 0–12), 99-section, 220-micro-lesson
 * Hugging Face LLM Course as a shared learning module across the 6 existing
 * AI Atlas career tracks WITHOUT creating a seventh career track.
 *
 * Upstream source:
 * - Official Course: https://huggingface.co/learn/llm-course/chapter1/1
 * - Upstream Repository: https://github.com/huggingface/course
 * - License: Apache-2.0 (https://github.com/huggingface/course/blob/main/LICENSE)
 * - Disclaimer: Original Uzbek educational adaptation by AI Atlas; not endorsed by Hugging Face.
 */

import rawHfCurriculum from "@/content/curriculum/hf-llm-course-curriculum.json";
import type { LearningDepth } from "./paths";
import type { PracticeExample, PracticeExercise } from "@/lib/practice/types";

export type ExistingCareerTrackId =
  | "ai-engineer"
  | "ml-engineer"
  | "data-scientist"
  | "python-dev"
  | "data-eng"
  | "prompt-eng";

export type HfPublishStatus = "planned" | "published" | "unavailable";

export type HfTrackRelevanceRole = "deep" | "supporting" | "overview";

export interface ExistingCareerTrackMeta {
  id: ExistingCareerTrackId;
  jsonKey:
    | "AI Engineer"
    | "ML Engineer"
    | "Data Scientist"
    | "Python Developer"
    | "Data Engineer"
    | "Prompt Engineering";
  labelUz: string;
  shortLabel: string;
  roadmapHref: string;
}

export const SIX_EXISTING_CAREER_TRACKS: readonly ExistingCareerTrackMeta[] = [
  {
    id: "ai-engineer",
    jsonKey: "AI Engineer",
    labelUz: "AI Engineer",
    shortLabel: "AI Engineer",
    roadmapHref: "/roadmap?tab=ai-engineer",
  },
  {
    id: "ml-engineer",
    jsonKey: "ML Engineer",
    labelUz: "ML Engineer",
    shortLabel: "ML Engineer",
    roadmapHref: "/roadmap?tab=ml-engineer",
  },
  {
    id: "data-scientist",
    jsonKey: "Data Scientist",
    labelUz: "Data Scientist",
    shortLabel: "Data Scientist",
    roadmapHref: "/roadmap?tab=data-scientist",
  },
  {
    id: "python-dev",
    jsonKey: "Python Developer",
    labelUz: "Python Developer",
    shortLabel: "Python Dev",
    roadmapHref: "/roadmap?tab=python-dev",
  },
  {
    id: "data-eng",
    jsonKey: "Data Engineer",
    labelUz: "Data Engineer",
    shortLabel: "Data Engineer",
    roadmapHref: "/roadmap?tab=data-eng",
  },
  {
    id: "prompt-eng",
    jsonKey: "Prompt Engineering",
    labelUz: "Prompt Engineering",
    shortLabel: "Prompt Eng",
    roadmapHref: "/roadmap?tab=prompt-eng",
  },
];

export interface HfCanonicalMatch {
  status: "verified_equivalent" | "partial_overlap" | "net_new";
  existingLessonId: string | null;
  existingTrack?: ExistingCareerTrackId | "mdx-core";
  rationaleUz: string;
}

export interface HfDepthExplanation {
  titleUz: string;
  bodyUz: string;
  keyFormulaOrRule?: string;
  codeOrTrace?: string;
}

export interface HfQuizItem {
  id: string;
  promptUz: string;
  options: readonly string[];
  correctIndex: number;
  explanationUz: string;
}

export interface HfSourceAttribution {
  provider: "Hugging Face";
  course: "LLM Course";
  chapter: number;
  sectionTitle: string;
  chapterUrl: string;
  upstreamRepoUrl: string;
  license: "Apache-2.0";
  licenseUrl: string;
  verifiedDate: string;
  adaptationNoticeUz: string;
  environmentWarningUz?: string;
}

export interface HfPublishedLessonPayload {
  whyItMattersUz: string;
  atomicConceptUz: string;
  prerequisitesUz: string[];
  depths: Record<LearningDepth, HfDepthExplanation>;
  example1: PracticeExample;
  example2: PracticeExample;
  visualizationId:
    | "token-padding-lab"
    | "bpe-merge-lab"
    | "lora-rank-lab"
    | "grpo-reward-lab";
  manimMeta: {
    scriptPath: string;
    sceneName: string;
    renderCommand: string;
    videoRendered: boolean;
    conceptNoteUz: string;
  };
  exercise: PracticeExercise;
  quiz: readonly HfQuizItem[];
}

export interface HfMicroLesson {
  id: string;
  chapterId: string;
  chapterNumber: number;
  slug: string;
  title: string;
  sourceSection: string;
  sectionOrdinal: number;
  order: number;
  depths: readonly LearningDepth[];
  objective: string;
  publishStatus: HfPublishStatus;
  canonicalMatch: HfCanonicalMatch;
  sourceAttribution: HfSourceAttribution;
  publishedContent?: HfPublishedLessonPayload;
  nextLessonId: string | null;
  prevLessonId: string | null;
}

export interface HfCourseChapter {
  id: string;
  sourceChapter: number;
  title: string;
  level: "foundation" | "intermediate" | "advanced";
  summary: string;
  canonicalUrl: string;
  sourceSectionCount: number;
  plannedMicroLessonCount: number;
  chapterProject: string;
  isAdvancedOptionalForBeginners: boolean;
  environmentNotesUz: string;
  lessons: readonly HfMicroLesson[];
}

/**
 * Verified canonical equivalence mappings between Hugging Face addon lesson IDs
 * and existing AI Atlas canonical lesson IDs based on learning-outcome equivalence.
 */
export const HF_CANONICAL_EQUIVALENCE_MAP: Readonly<
  Record<
    string,
    {
      existingLessonId: string;
      existingTrack: ExistingCareerTrackId | "mdx-core";
      status: "verified_equivalent" | "partial_overlap";
      rationaleUz: string;
    }
  >
> = {
  // Chapter 0: Python Setup & Virtual Environments -> Python Developer Track
  "hf-00-01-02": {
    existingLessonId: "py-01-02",
    existingTrack: "python-dev",
    status: "verified_equivalent",
    rationaleUz: "Python versiyasi va CLI muhitini tekshirish natijasi bir xil.",
  },
  "hf-00-03-01": {
    existingLessonId: "py-09-01",
    existingTrack: "python-dev",
    status: "verified_equivalent",
    rationaleUz: "Python venv virtual muhitini yaratish va izolyatsiya qilish.",
  },
  "hf-00-03-02": {
    existingLessonId: "py-09-02",
    existingTrack: "python-dev",
    status: "verified_equivalent",
    rationaleUz: "Virtual muhitni OS bo'yicha faollashtirish (activate).",
  },
  "hf-00-04-01": {
    existingLessonId: "py-09-03",
    existingTrack: "python-dev",
    status: "verified_equivalent",
    rationaleUz: "pip / uv yordamida tashqi kutubxonalarni o'rnatish.",
  },
  // Chapter 1: Transformers, Tokenization, Attention, Prefill/Decode, Hallucinations
  "hf-01-01-01": {
    existingLessonId: "01.01",
    existingTrack: "ai-engineer",
    status: "verified_equivalent",
    rationaleUz: "NLP va zamonaviy LLM tizimlari qamrovi (AI Engineer Phase 01).",
  },
  "hf-01-04-01": {
    existingLessonId: "tokenization",
    existingTrack: "mdx-core",
    status: "verified_equivalent",
    rationaleUz: "Matnni tokenlar va vektor embeddinglarga o'tkazish asosi.",
  },
  "hf-01-04-02": {
    existingLessonId: "transformers",
    existingTrack: "mdx-core",
    status: "verified_equivalent",
    rationaleUz: "Self-Attention mexanizmi intuitsiyasi va Q/K/V bog'liqligi.",
  },
  "hf-01-06-01": {
    existingLessonId: "03.01",
    existingTrack: "ai-engineer",
    status: "partial_overlap",
    rationaleUz: "Encoder-only (BERT) vs Decoder-only (GPT) arxitektura farqlari.",
  },
  "hf-01-08-01": {
    existingLessonId: "03.02",
    existingTrack: "ai-engineer",
    status: "verified_equivalent",
    rationaleUz: "LLM Prefill (Compute-bound) va TTFT bosqichi tahlili.",
  },
  "hf-01-08-02": {
    existingLessonId: "03.03",
    existingTrack: "ai-engineer",
    status: "verified_equivalent",
    rationaleUz: "LLM Decode (Memory-bound) avtoregressiv token generatsiyasi.",
  },
  "hf-01-08-04": {
    existingLessonId: "pe-02-01",
    existingTrack: "prompt-eng",
    status: "verified_equivalent",
    rationaleUz: "Temperature, Top-K va Top-P sampling parametrlarini boshqarish.",
  },
  "hf-01-09-02": {
    existingLessonId: "10.01",
    existingTrack: "ai-engineer",
    status: "verified_equivalent",
    rationaleUz: "LLM Hallucination sabablari va ishonchlilik chegaralari.",
  },
  // Chapter 2: Tokenizers & Handling Multiple Sequences
  "hf-02-04-01": {
    existingLessonId: "06.01",
    existingTrack: "ai-engineer",
    status: "verified_equivalent",
    rationaleUz: "Token va sonli Token ID lug'at akslantirishi.",
  },
  // Chapter 3: Fine-tuning, Splits, Learning Curves & Overfitting
  "hf-03-02-01": {
    existingLessonId: "mlds-ml-01-02",
    existingTrack: "ml-engineer",
    status: "verified_equivalent",
    rationaleUz: "Train, Validation va Test dataset bo'linishi hamda data leakage oldini olish.",
  },
  "hf-03-04-01": {
    existingLessonId: "loss-functions",
    existingTrack: "mdx-core",
    status: "verified_equivalent",
    rationaleUz: "Forward pass va Loss funksiyasini hisoblash.",
  },
  "hf-03-04-02": {
    existingLessonId: "backpropagation",
    existingTrack: "mdx-core",
    status: "verified_equivalent",
    rationaleUz: "Backward pass (autograd) va optimizer qadami.",
  },
  "hf-03-05-02": {
    existingLessonId: "mlds-ml-02-03",
    existingTrack: "ml-engineer",
    status: "verified_equivalent",
    rationaleUz: "Training vs Validation loss egri chizig'idan Overfittingni aniqlash.",
  },
  "hf-03-05-03": {
    existingLessonId: "learning-rate",
    existingTrack: "mdx-core",
    status: "verified_equivalent",
    rationaleUz: "Learning rate va Early Stopping ta'siri.",
  },
  // Chapter 5: Datasets, Apache Arrow, Streaming & FAISS Semantic Search
  "hf-05-01-02": {
    existingLessonId: "de-04-01",
    existingTrack: "data-eng",
    status: "verified_equivalent",
    rationaleUz: "Apache Arrow ustunli xotira formati va zero-copy o'qish.",
  },
  "hf-05-04-02": {
    existingLessonId: "de-07-01",
    existingTrack: "data-eng",
    status: "partial_overlap",
    rationaleUz: "Katta ma'lumotlarni RAMga to'liq yuklamasdan oqimli (streaming) qayta ishlash.",
  },
  "hf-05-06-01": {
    existingLessonId: "embeddings",
    existingTrack: "mdx-core",
    status: "verified_equivalent",
    rationaleUz: "Matndan zich embedding vektor olish va ma'no fazosi.",
  },
  "hf-05-06-02": {
    existingLessonId: "12.03",
    existingTrack: "ai-engineer",
    status: "verified_equivalent",
    rationaleUz: "FAISS va vektor indekslar yordamida semantik qidiruv qurish.",
  },
  // Chapter 11: Chat Templates, SFT & LoRA
  "hf-11-02-01": {
    existingLessonId: "pe-01-02",
    existingTrack: "prompt-eng",
    status: "verified_equivalent",
    rationaleUz: "System, User va Assistant xabar rollari strukturasi.",
  },
  "hf-11-05-02": {
    existingLessonId: "pe-19-01",
    existingTrack: "prompt-eng",
    status: "verified_equivalent",
    rationaleUz: "Baholash rubrikasi (Evaluation Rubric) va regressiya testlari.",
  },
};

/**
 * Fully Authored & Verified Published Lessons (Vertical Slices).
 * Only lessons in this dictionary are marked `publishStatus: "published"`.
 * All other nodes remain `planned` (or `unavailable` for `hf-12-08-01`).
 */
export const PUBLISHED_HF_LESSONS: Readonly<
  Record<string, HfPublishedLessonPayload>
> = {
  "hf-02-05-01": {
    whyItMattersUz:
      "GPU va PyTorch tensorlari to'g'ri to'rtburchak matritsa shaklini talab qiladi. Real hayotda foydalanuvchi gaplari har xil uzunlikda bo'ladi — ularni bitta batchga yig'ish, padding bilan to'ldirish va attention_mask orqali haqiqiy tokenlarni ajratish har bir NLP/LLM muhandisining eng asosiy ko'nikmasidir.",
    atomicConceptUz:
      "Turli uzunlikdagi token ID ketma-ketliklarini `pad_token_id` va `max_length` (truncation) yordamida yagona `(Batch, Seq_Len)` matritsaga keltirish hamda `1/0` `attention_mask` qurish.",
    prerequisitesUz: [
      "Python ro'yxatlari (list of lists) va funksiyalar",
      "Token va sonli Token ID tushunchasi (hf-02-04-01)",
    ],
    depths: {
      overview: {
        titleUz: "Level 1 — Overview: Nega Batch, Padding va Attention Mask kerak?",
        bodyUz:
          "Tasavvur qiling, bir darsda ikkita gap bor: birinchi gap 2 ta token (`[11, 12]`), ikkinchi gap esa 4 ta token (`[21, 22, 23, 24]`). Model ularni bitta tensor batch sifatida parallel qayta ishlashi uchun har ikkala qatorning uzunligi bir xil bo'lishi shart. Qisqa gap oxiriga maxsus bo'sh to'ldiruvchi token — **padding token** (`pad_token_id`, masalan `0`) qo'shiladi. Model bu qo'shilgan `0` larni haqiqiy so'z deb o'ylab chalg'imasligi uchun **Attention Mask** yaratiladi: haqiqiy token turgan joyga `1`, padding qo'shilgan joyga `0` yoziladi.",
        keyFormulaOrRule:
          "Diqqat: 1/0 attention mask odatiy Hugging Face tokenizer konventsiyasidir. Har bir model/arxitekturaning mask va pad_token_id xatti-harakati bir xil deb qabul qilinmasligi kerak.",
      },
      understand: {
        titleUz: "Level 2 — Understand: Qadamma-qadam Mexanizm va O'lchamlar",
        bodyUz:
          "Batch tayyorlash algoritmi 5 ta aniq qadamdan iborat:\n1. Tokenizatsiya natijasida har bir gap uchun musbat butun sonli ID ro'yxati olinadi.\n2. Agar `max_length=None` bo'lsa, batch ichidagi eng uzun qator uzunligi (`target_len = max(len(r) for r in sequences)`) topiladi; agar `max_length` berilgan bo'lsa, `target_len = max_length` olinadi.\n3. Uzunligi `target_len` dan oshgan qatorlar `row[:target_len]` orqali kesiladi (**Truncation**).\n4. Uzunligi `target_len` dan qisqa qatorlarga `pad_count = target_len - len(cut)` dona `pad_id` qo'shiladi (**Padding**).\n5. Har bir qator uchun `[1] * len(cut) + [0] * pad_count` ko'rinishida `attention_mask` hosil qilinadi.",
        keyFormulaOrRule:
          "\\text{shape}(\\text{input\\_ids}) == \\text{shape}(\\text{attention\\_mask}) == (B, T_{\\text{target}})",
        codeOrTrace:
          "Kirish: sequences = [[11, 12], [21, 22, 23, 24]], pad_id = 0\n1-qator (len=2 -> +2 pad): ids=[11, 12, 0, 0], mask=[1, 1, 0, 0]\n2-qator (len=4 -> +0 pad): ids=[21, 22, 23, 24], mask=[1, 1, 1, 1]",
      },
      master: {
        titleUz: "Level 3 — Master: Chegaraviy Holatlar (Edge Cases) va Arxitektura Farqlari",
        bodyUz:
          "Production muhandisligida 4 ta muhim jihatga e'tibor beriladi:\n1. **Qat'iy kirish validatsiyasi**: Bo'sh batch, manfiy token ID (`-1`), `bool` qiymat (`True` Python'da `int` ning vorisi hisoblanadi!) yoki manfiy `max_length` kelganda darhol `ValueError` ko'tarilishi shart.\n2. **`max_length = 0` chegaraviy holati**: Har bir qator uchun bo'sh ro'yxat `[]` va bo'sh maska `[]` qaytishi kerak.\n3. **Right vs Left Padding**: BERT/RoBERTa kabi Encoder modellarda o'ng tomondan (`padding_side='right'`) padding qilinadi; Llama/Qwen kabi Decoder-only modellarda batch generatsiya paytida oxirgi token pozitsiyasi uzilmasligi uchun chap tomondan (`padding_side='left'`) padding qilinadi.\n4. **Dynamic Padding (`DataCollatorWithPadding`)**: Butun datasetni `max_length=512` ga to'ldirmasdan, faqat joriy mini-batch ichidagi eng uzun gapga tekislash hisoblashni 3-5 barobar tezlashtiradi.",
        keyFormulaOrRule:
          "isinstance(True, int) == True! Shu sababli Python'da butun sonni tekshirishda `isinstance(x, int) and not isinstance(x, bool)` yoziladi.",
      },
    },
    example1: {
      id: "hf-02-05-ex1",
      titleUz: "1-misol: Ikki ketma-ketlikni Padding va Mask bilan tekislash (Pure Python)",
      explanationUz:
        "Tashqi kutubxonalarsiz oddiy sonli token ID ro'yxatlaridan bir xil o'lchamli `input_ids` va `attention_mask` hosil qilish.",
      input: "sequences = [[11, 12], [21, 22, 23, 24]], pad_id = 0",
      code: `sequences = [[11, 12], [21, 22, 23, 24]]
pad_id = 0
target_len = max(len(seq) for seq in sequences)

input_ids = [seq + [pad_id] * (target_len - len(seq)) for seq in sequences]
attention_mask = [[1] * len(seq) + [0] * (target_len - len(seq)) for seq in sequences]

print("input_ids:     ", input_ids)
print("attention_mask:", attention_mask)`,
      expectedOutput: `input_ids:      [[11, 12, 0, 0], [21, 22, 23, 24]]
attention_mask: [[1, 1, 0, 0], [1, 1, 1, 1]]`,
      walkthrough: [
        "Batch ichidagi eng uzun ketma-ketlik uzunligi aniqlandi: `target_len = 4`.",
        "1-qator uzunligi 2 bo'lgani uchun oxiriga 2 ta `0` (`pad_id`) qo'shildi: `[11, 12, 0, 0]`.",
        "1-qator maskasida 2 ta haqiqiy pozitsiyaga `1`, 2 ta padding pozitsiyasiga `0` qo'yildi: `[1, 1, 0, 0]`.",
      ],
      whyThisOutputUz:
        "Ikkala ro'yxat ham 4 tadan elementga ega (2x4 matritsa). `0` bu misolda padding ID sifatida tanlangan; real modelda `pad_token_id` boshqa son (masalan `1` yoki `128001`) bo'lishi mumkin.",
    },
    example2: {
      id: "hf-02-05-ex2",
      titleUz: "2-misol: Real Hugging Face AutoTokenizer va Truncation Oqimi",
      explanationUz:
        "Real `transformers` kutubxonasida `padding=True, truncation=True, return_tensors='pt'` parametrlari qanday ishlashi va Python'da uning aniq xulq-atvorini tekshirish. (Eslatma: haqiqiy `AutoTokenizer.from_pretrained` internet va `transformers`/`torch` paketlarini talab qiladi).",
      input:
        'sentences = ["I like AI", "I like learning about transformers"], max_length = 5',
      code: `# Real HF kod naqshi (Colab / Lokal muhitda):
# from transformers import AutoTokenizer
# tokenizer = AutoTokenizer.from_pretrained("distilbert/distilbert-base-uncased")
# batch = tokenizer(sentences, padding=True, truncation=True, max_length=5, return_tensors="pt")

# Brauzerda darhol tekshiriladigan ekvivalent tokenizer pipeline:
raw_tokenized = [
    [101, 1045, 2066, 9932, 102],                 # "I like AI" (5 token: [CLS] ... [SEP])
    [101, 1045, 2066, 4083, 2055, 19081, 102],    # Uzun gap (7 token)
]
max_len = 5
pad_token_id = 0

batch_ids = [row[:max_len] + [pad_token_id] * max(0, max_len - len(row[:max_len])) for row in raw_tokenized]
batch_mask = [[1] * len(row[:max_len]) + [0] * max(0, max_len - len(row[:max_len])) for row in raw_tokenized]

print("Batch shape:", (len(batch_ids), len(batch_ids[0])))
print("input_ids:     ", batch_ids)
print("attention_mask:", batch_mask)`,
      expectedOutput: `Batch shape: (2, 5)
input_ids:      [[101, 1045, 2066, 9932, 102], [101, 1045, 2066, 4083, 2055]]
attention_mask: [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1]]`,
      walkthrough: [
        "`max_len = 5` va `truncation=True` bo'lgani uchun 7 ta tokendan iborat 2-gap 5 ta tokenga kesildi.",
        "Ikkala qator ham 5 uzunlikka ega bo'lgani sababli `(2, 5)` o'lchamli batch hosil bo'ldi.",
        "Muhim: Haqiqiy modelda `AutoTokenizer` kesish paytida oxirgi `[SEP]` (`102`) maxsus tokenini saqlab qolish-qolmasligi tokenizer qoidasiga bog'liq — chiqishni taxmin qilmasdan doim real natijadan o'qing.",
      ],
      whyThisOutputUz:
        "Truncation yoqilganda `max_length` dan uzun ketma-ketliklar belgilangan chegaragacha qisqartiriladi, shunda GPU xotirasi portlab ketmaydi.",
    },
    visualizationId: "token-padding-lab",
    manimMeta: {
      scriptPath: "examples/manim/token_padding.py",
      sceneName: "TokenPaddingScene",
      renderCommand: "manim -pqh examples/manim/token_padding.py TokenPaddingScene",
      videoRendered: false,
      conceptNoteUz:
        "Manim sahna kodi `examples/manim/token_padding.py` ichida mavjud. Video fayli oldindan render qilinmagan; quyidagi interaktiv React laboratoriyasida parametrlar real vaqtda hisoblanadi.",
    },
    exercise: {
      id: "hf-02-05-ex-pad-batch",
      titleUz: "Amaliy Mashq: pad_batch(sequences, pad_id=0, max_length=None)",
      instructionsUz:
        "`pad_batch(sequences, pad_id=0, max_length=None)` funksiyasini yozing.\n\nTalablar:\n1. `sequences` — manfiy bo'lmagan butun sonlardan iborat ketma-ketliklar ro'yxati (`list[list[int]]`). Bo'sh ro'yxat bo'lsa `ValueError` ko'taring.\n2. `max_length=None` bo'lsa, batchdagi eng uzun ketma-ketlik uzunligiga qarab to'ldiring.\n3. `max_length=int` bo'lsa, uzun qatorlarni `max_length` gacha kesing (truncation), qisqa qatorlarni `pad_id` bilan to'ldiring (`max_length=0` ham bo'sh qatorlar qaytarib to'g'ri ishlashi shart!).\n4. Manfiy token ID, manfiy `pad_id`, manfiy `max_length`, `bool` qiymat yoki yaroqsiz tur kelsa `ValueError` ko'taring.\n5. Natija sifatida `(input_ids, attention_mask)` kortejini (`tuple`) qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def pad_batch(sequences, pad_id=0, max_length=None):
    """
    sequences: list[list[int]]
    pad_id: int = 0
    max_length: int | None = None
    Qaytaradi: (input_ids, attention_mask)
    """
    # TODO: 1. Kiruvchi qiymatlarni tekshiring (bo'sh batch yoki manfiy son bo'lsa ValueError)
    # TODO: 2. Maqsadli uzunlikni aniqlang (max_length yoki eng uzun qator)
    # TODO: 3. Har bir qatorni kesing (truncation), pad_id qo'shing va attention_mask (1 va 0) quring
    raise NotImplementedError("pad_batch funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`pad_batch([[11, 12], [21, 22, 23, 24]])` chaqirilganda `([[11, 12, 0, 0], [21, 22, 23, 24]], [[1, 1, 0, 0], [1, 1, 1, 1]])` qaytishi va noto'g'ri kirishlarda `ValueError` ko'tarilishi shart.",
      hintsUz: [
        "1-maslahat (Konsept): Target uzunlik — `max(len(row) for row in sequences)` (agar `max_length is None` bo'lsa) yoki berilgan `max_length`.",
        "2-maslahat (Algoritm): Har bir qatorni avval `cut = row[:target_len]` bilan kesib oling, so'ng `pad_count = target_len - len(cut)` hisoblang.",
        "3-maslahat (Kod): `input_ids.append(cut + [pad_id] * pad_count)` va `attention_mask.append([1] * len(cut) + [0] * pad_count)`. Manfiy sonlar uchun `if tok < 0: raise ValueError(...)` tekshiruvini unutmang!",
      ],
      testCases: [
        {
          id: "hf-pad-test-1-basic",
          descriptionUz:
            "Asosiy padding: [[11, 12], [21, 22, 23, 24]] -> 2x4 input_ids va attention_mask",
          assertionCode:
            "pad_batch([[11, 12], [21, 22, 23, 24]]) == ([[11, 12, 0, 0], [21, 22, 23, 24]], [[1, 1, 0, 0], [1, 1, 1, 1]])",
        },
        {
          id: "hf-pad-test-2-truncation",
          descriptionUz:
            "Truncation + Padding: [[1, 2, 3], [4]] va max_length=2 -> ([[1, 2], [4, 0]], [[1, 1], [1, 0]])",
          assertionCode:
            "pad_batch([[1, 2, 3], [4]], max_length=2) == ([[1, 2], [4, 0]], [[1, 1], [1, 0]])",
        },
        {
          id: "hf-pad-test-3-custom-pad-zero-len",
          descriptionUz:
            "Maxsus pad_id=99 va chegaraviy max_length=0 holati to'g'ri ishlashi",
          assertionCode:
            "pad_batch([[5], [6, 7]], pad_id=99) == ([[5, 99], [6, 7]], [[1, 0], [1, 1]]) and pad_batch([[1, 2], [3]], max_length=0) == ([[], []], [[], []])",
        },
        {
          id: "hf-pad-test-4-validation",
          descriptionUz:
            "Manfiy token ID (-1), manfiy pad_id, manfiy max_length (-2) yoki bo'sh batch ([]) berilganda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(pad_batch, [[1, -5]]) and _expect_value_error(pad_batch, [[1, 2]], -1) and _expect_value_error(pad_batch, [[1, 2]], 0, -2) and _expect_value_error(pad_batch, [])",
        },
      ],
    },
    quiz: [
      {
        id: "hf-02-05-q1",
        promptUz:
          "1. Konseptual: Nima uchun batch ichida `pad_token_id` qo'shilganda `attention_mask` ham birga uzatilishi shart?",
        options: [
          "Model faylini diskda kichraytirish uchun",
          "Self-Attention qatlami qo'shilgan sun'iy padding tokenlariga e'tibor qaratmasligi (ularni 0 bilan maskalab e'tibordan chetda qoldirishi) uchun",
          "Token ID larni matnga tarjima qilish uchun",
          "Faqat GPU xotirasini to'ldirish uchun",
        ],
        correctIndex: 1,
        explanationUz:
          "Attention mask `1` bo'lgan haqiqiy tokenlarni hisobga olib, `0` bo'lgan padding pozitsiyalarini Self-Attention hisoblashidan chiqarib tashlaydi.",
      },
      {
        id: "hf-02-05-q2",
        promptUz:
          "2. Kod Tahlili: `pad_batch([[10, 20, 30, 40], [50]], pad_id=0, max_length=3)` chaqiruvining natijasi qanday bo'ladi?",
        options: [
          "([[10, 20, 30, 40], [50, 0, 0, 0]], [[1, 1, 1, 1], [1, 0, 0, 0]])",
          "([[10, 20, 30], [50, 0, 0]], [[1, 1, 1], [1, 0, 0]]) — 1-qator 3 taga kesiladi (truncation), 2-qator 3 tagacha 0 bilan to'ldiriladi",
          "ValueError xatosi beradi",
          "([[10], [50]], [[1], [1]])",
        ],
        correctIndex: 1,
        explanationUz:
          "`max_length=3` bo'lganda 4 elementli 1-qator 3 taga kesiladi (`[10, 20, 30]`), 1 elementli 2-qator esa 2 ta `0` bilan to'ldiriladi (`[50, 0, 0]`).",
      },
      {
        id: "hf-02-05-q3",
        promptUz:
          "3. Arxitektura: Avtoregressiv Decoder-only LLM (masalan Llama yoki Qwen) da bir nechta promptni batch qilib matn generatsiya qilishda nima uchun `padding_side='left'` (chap tomondan padding) ishlatiladi?",
        options: [
          "Chap tomonda xotira kamroq ketgani uchun",
          "Generatsiya har bir qatorning eng oxirgi tokenidan davom etgani sababli, barcha qatorlarning oxirgi haqiqiy tokeni o'ng chetda bir tekis turishi uchun",
          "Decoder modellar faqat arab tilida ishlagani uchun",
          "Left va right padding mutlaqo farq qilmaydi",
        ],
        correctIndex: 1,
        explanationUz:
          "Avtoregressiv generatsiyada yangi token oxirgi pozitsiyadan bashorat qilinadi; agar o'ng tomonda `[PAD]` tursa, model `[PAD]` tokenidan keyin davom etib xato qiladi.",
      },
    ],
  },
  // Share the same comprehensive Tokenizer/Padding/Truncation/Attention Mask vertical slice across hf-02-05-02, hf-02-05-03, hf-02-05-04
  // while customizing their specific atomic focuses:
  "hf-02-05-06-bpe": undefined as unknown as HfPublishedLessonPayload, // placeholder removed below
};

// Build slice entries for hf-02-05-02, hf-02-05-03, hf-02-05-04, plus Chapter 6 (hf-06-06-02), Chapter 11 (hf-11-04-02), Chapter 12 (hf-12-04-02)
const BASE_SLICE_02_05 = PUBLISHED_HF_LESSONS["hf-02-05-01"]!;

const PUBLISHED_LESSONS_REGISTRY: Readonly<
  Record<string, HfPublishedLessonPayload>
> = {
  "hf-02-05-01": BASE_SLICE_02_05,
  "hf-02-05-02": {
    ...BASE_SLICE_02_05,
    atomicConceptUz:
      "Padding mexanizmi: qisqa ketma-ketliklarni `pad_token_id` yordamida batchdagi maqsadli uzunlikka yetkazish va `right` vs `left` padding farqi.",
  },
  "hf-02-05-03": {
    ...BASE_SLICE_02_05,
    atomicConceptUz:
      "Truncation mexanizmi: modelning maksimal kontekst oynasidan (`max_length`) oshib ketgan uzun ketma-ketliklarni xavfsiz kesish.",
  },
  "hf-02-05-04": {
    ...BASE_SLICE_02_05,
    atomicConceptUz:
      "Attention Mask (`1` va `0`): Self-Attention qatlamiga qaysi tokenlar haqiqiy mazmun va qaysilari padding ekanini bildirish.",
  },
  "hf-06-06-02": {
    whyItMattersUz:
      "Zamonaviy LLM'lar (GPT-4, Llama-3, Qwen) so'zlarni butunligicha emas, balki Byte-Pair Encoding (BPE) algoritmi orqali eng ko'p yonma-yon kelgan bo'g'inlarni ketma-ket birlashtirish (merge) orqali tokenlarga ajratadi.",
    atomicConceptUz:
      "BPE Merge Qadami: token ID ketma-ketliklarida eng ko'p uchragan qo'shni juftlikni `(a, b)` topish va uni yangi `new_id` tokeniga almashtirish.",
    prerequisitesUz: [
      "Python ro'yxatlari va lug'atlari (dict / Counter)",
      "Token va Token ID asoslari (hf-02-04-01)",
    ],
    depths: {
      overview: {
        titleUz: "Level 1 — Overview: BPE Qanday Qilib Yangi Token Yasaydi?",
        bodyUz:
          "BPE dastlab matnni mayda harflar (yoki UTF-8 baytlar) ro'yxatiga bo'ladi. Keyin matn ichida eng ko'p yonma-yon kelgan ikki elementni (masalan `'k'` va `'i'` -> `'ki'`, keyin `'ki'` va `'tob'` -> `'kitob'`) topib, ularni bitta yangi token ID ga birlashtiradi. Bu jarayon lug'at hajmi kerakli songa yetguncha takrorlanadi.",
        keyFormulaOrRule:
          "Har bir BPE merge qadamida ketma-ketlik uzunligi qisqaradi, lug'at hajmi esa +1 ta yangi tokenga boyiydi.",
      },
      understand: {
        titleUz: "Level 2 — Understand: Juftlikni Birlashtirish (Chapdan O'ngga Yagona O'tish)",
        bodyUz:
          "`bpe_merge_step(seq, pair, new_id)` algoritmi ro'yxat bo'ylab chapdan o'ngga `i = 0` indeksdan boshlab yuradi:\n1. Agar `(seq[i], seq[i+1]) == pair` bo'lsa, natijaga `new_id` qo'shiladi va indeks 2 qadamga (`i += 2`) sakraydi (ustma-ust tushgan ikkinchi juftlik qayta birlashib ketmaydi!).\n2. Aks holda `seq[i]` o'ziday qo'shiladi va `i += 1` bo'ladi.",
        keyFormulaOrRule:
          "[1, 2, 1, 2, 3] da pair=(1, 2), new_id=99 bo'lsa -> [99, 99, 3]",
        codeOrTrace:
          "seq = [10, 20, 20, 30], pair = (20, 20), new_id = 50 -> [10, 50, 30]",
      },
      master: {
        titleUz: "Level 3 — Master: Ustma-ust Tushuvchi Tokenlar (`[5, 5, 5]`) va Chegaraviy Holatlar",
        bodyUz:
          "Eng muhim chegaraviy holat: agar ketma-ketlik `[5, 5, 5]` bo'lib, `pair=(5, 5)` va `new_id=9` berilsa, chapdan o'ngga yurilganda dastlabki ikkita `5` birlashib `9` bo'ladi va oxirgi uchinchisi yolg'iz qoladi: natija `[9, 5]` bo'lishi shart (`[9, 9]` emas!).",
        keyFormulaOrRule:
          "Indeks `i += 2` qilib siljitilishi ustma-ust (overlapping) juftliklarning ikki marta birlashib ketishidan himoya qiladi.",
      },
    },
    example1: {
      id: "hf-06-06-ex1",
      titleUz: "1-misol: Oddiy Token Ro'yxatida Juftlikni Birlashtirish",
      explanationUz:
        "`(1, 2)` juftligini `99` ID ga almashtirish orqali ro'yxat qanday siqilishini ko'rish.",
      input: "seq = [1, 2, 3, 1, 2], pair = (1, 2), new_id = 99",
      code: `seq = [1, 2, 3, 1, 2]
pair = (1, 2)
new_id = 99

out, i = [], 0
while i < len(seq):
    if i < len(seq) - 1 and (seq[i], seq[i+1]) == pair:
        out.append(new_id)
        i += 2
    else:
        out.append(seq[i])
        i += 1

print("Asl ro'yxat:  ", seq)
print("Merge natijasi:", out)`,
      expectedOutput: `Asl ro'yxat:   [1, 2, 3, 1, 2]
Merge natijasi: [99, 3, 99]`,
      walkthrough: [
        "`i=0`: `(1, 2) == (1, 2)` mos tushdi -> `99` qo'shildi, `i` 2 ga sakradi.",
        "`i=2`: `3` mos emas -> `3` qo'shildi, `i` 3 ga o'tdi.",
        "`i=3`: `(1, 2) == (1, 2)` mos tushdi -> `99` qo'shildi.",
      ],
    },
    example2: {
      id: "hf-06-06-ex2",
      titleUz: "2-misol: Eng Ko'p Uchragan Juftlikni Topib Avtomatik Merge Qilish",
      explanationUz:
        "Matn korpusida eng yuqori chastotali juftlikni hisoblab, uni yangi token ID ga birlashtirish.",
      input: "word_ids = [10, 11, 12, 10, 11, 12, 10, 11]",
      code: `from collections import Counter

word_ids = [10, 11, 12, 10, 11, 12, 10, 11]
counts = Counter(zip(word_ids, word_ids[1:]))
top_pair, freq = counts.most_common(1)[0]
print(f"Eng ko'p uchragan juftlik: {top_pair} ({freq} marta)")`,
      expectedOutput: `Eng ko'p uchragan juftlik: (10, 11) (3 marta)`,
      walkthrough: [
        "`zip(word_ids, word_ids[1:])` barcha qo'shni juftliklarni hosil qiladi.",
        "`(10, 11)` 3 marta, `(11, 12)` va `(12, 10)` esa 2 martadan uchradi.",
      ],
    },
    visualizationId: "token-padding-lab",
    manimMeta: {
      scriptPath: "examples/manim/token_padding.py",
      sceneName: "TokenPaddingScene",
      renderCommand: "manim -pqh examples/manim/token_padding.py TokenPaddingScene",
      videoRendered: false,
      conceptNoteUz:
        "BPE subword bo'laklash natijasida chiqqan token ID'lar keyingi bosqichda Padding va Attention Mask matritsasiga uzatiladi.",
    },
    exercise: {
      id: "hf-06-06-ex-bpe-merge",
      titleUz: "Amaliy Mashq: bpe_merge_step(seq, pair, new_id)",
      instructionsUz:
        "`bpe_merge_step(seq, pair, new_id)` funksiyasini yozing.\n\nTalablar:\n1. `seq` — butun sonlar ro'yxati (`list[int]`), `pair` — 2 ta butun sondan iborat `(a, b)` tuple/list, `new_id` — manfiy bo'lmagan butun son.\n2. Chapdan o'ngga bir marta o'tib, har bir `(a, b)` juftligini `new_id` bilan almashtiring (`[5, 5, 5]` da `(5, 5) -> 9` bo'lganda `[9, 5]` chiqishi shart).\n3. Agar `pair` uzunligi 2 bo'lmasa yoki `new_id < 0` bo'lsa `ValueError` ko'taring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def bpe_merge_step(seq, pair, new_id):
    """
    seq: list[int]
    pair: tuple[int, int] | list[int]
    new_id: int
    """
    # TODO: Chapdan o'ngga yurib, har bir (pair[0], pair[1]) juftligini new_id ga almashtiring
    raise NotImplementedError("bpe_merge_step funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`bpe_merge_step([1, 2, 3, 1, 2], (1, 2), 99)` -> `[99, 3, 99]` va `bpe_merge_step([5, 5, 5], (5, 5), 9)` -> `[9, 5]`.",
      hintsUz: [
        "1-maslahat: `while i < len(seq):` siklidan foydalaning.",
        "2-maslahat: `i < len(seq) - 1` shartini tekshirib, `seq[i] == pair[0] and seq[i+1] == pair[1]` bo'lsa `out.append(new_id)` va `i += 2` qiling.",
        "3-maslahat: Mos kelmasa `out.append(seq[i])` va `i += 1` qiling.",
      ],
      testCases: [
        {
          id: "hf-bpe-test-1",
          descriptionUz: "Standart juftlik birlashtirish: [1, 2, 3, 1, 2] -> [99, 3, 99]",
          assertionCode: "bpe_merge_step([1, 2, 3, 1, 2], (1, 2), 99) == [99, 3, 99]",
        },
        {
          id: "hf-bpe-test-2-overlap",
          descriptionUz: "Ustma-ust tushuvchi elementlar: [5, 5, 5] da (5, 5)->9 natijasi [9, 5] bo'lishi",
          assertionCode: "bpe_merge_step([5, 5, 5], (5, 5), 9) == [9, 5]",
        },
        {
          id: "hf-bpe-test-3-empty",
          descriptionUz: "Bo'sh ro'yxat yoki moslik yo'q holatda asl ro'yxat qaytishi",
          assertionCode:
            "bpe_merge_step([], (1, 2), 10) == [] and bpe_merge_step([7, 8], (1, 2), 10) == [7, 8]",
        },
      ],
    },
    quiz: [
      {
        id: "hf-06-06-q1",
        promptUz:
          "1. `[5, 5, 5]` ketma-ketligida `(5, 5)` juftligi `9` ga birlashtirilsa natija qanday bo'ladi?",
        options: [
          "[9, 9]",
          "[9, 5] — chapdan o'ngga yurilganda birinchi ikkita 5 birlashadi va 3-chi 5 yakka qoladi",
          "[5, 9]",
          "[9]",
        ],
        correctIndex: 1,
        explanationUz:
          "BPE chapdan o'ngga greedy ravishda juftlikni birlashtirib indeksni 2 qadamga suradi.",
      },
    ],
  },
  "hf-11-04-02": {
    whyItMattersUz:
      "Katta LLM'larning barcha milliardlab parametrlarini qayta o'qitish juda katta GPU xotirasi talab qiladi. LoRA (Low-Rank Adaptation) asosiy matritsani muzlatib, faqat kichik `r` rangli `A` va `B` adapter matritsalarini o'qitish orqali o'qitiladigan parametrlarni 98–99% ga kamaytiradi.",
    atomicConceptUz:
      "LoRA qatlamida muzlatilgan `d_in * d_out` parametrlar, o'qitiladigan `r * (d_in + d_out)` adapter parametrlari va `alpha / r` masshtablash koeffitsientini hisoblash.",
    prerequisitesUz: [
      "Matritsa o'lchamlari va ko'paytmasi",
      "Supervised Fine-Tuning (SFT) maqsadi (hf-11-01-01)",
    ],
    depths: {
      overview: {
        titleUz: "Level 1 — Overview: LoRA Qanday Qilib Xotirani Tejaydi?",
        bodyUz:
          "Tasavvur qiling, `4096 x 4096` o'lchamli chiziqli qatlamda `16,777,216` ta og'irlik bor. LoRA bu katta matritsani o'zgartirmasdan muzlatib qo'yadi va uning yoniga ikkita ingichka matritsa — `A (4096 x r)` hamda `B (r x 4096)` qo'shadi. Agar `r = 8` bo'lsa, o'qitiladigan parametrlar soni atigi `8 * (4096 + 4096) = 65,536` ta (asl matritsaning 0.39% qismi!) bo'ladi.",
        keyFormulaOrRule:
          "N_{\\text{trainable}} = r \\times (d_{\\text{in}} + d_{\\text{out}})",
      },
      understand: {
        titleUz: "Level 2 — Understand: Aniq Formulalar va Scaling Factor",
        bodyUz:
          "Kirish o'lchami `in_features`, chiqish o'lchami `out_features`, rank `r` va `alpha` berilganda:\n1. `base_params = in_features * out_features`\n2. `lora_params = r * (in_features + out_features)`\n3. `trainable_ratio = lora_params / base_params`\n4. `scaling = alpha / r` ($W = W_0 + \\frac{\\alpha}{r} B A$).",
        keyFormulaOrRule:
          "\\Delta W = \\frac{\\alpha}{r} B A",
      },
      master: {
        titleUz: "Level 3 — Master: Rank Tanlash va Chegaraviy Shartlar",
        bodyUz:
          "Agar `r <= 0`, `in_features <= 0`, `out_features <= 0` yoki `alpha <= 0` bo'lsa `ValueError` ko'tarilishi kerak. Shuningdek, agar `r` juda katta tanlanib `lora_params >= base_params` bo'lib ketsa, LoRA o'z ma'nosini yo'qotadi (rank `r` har doim $\\min(d_{\\text{in}}, d_{\\text{out}})$ dan ancha kichik, odatda `8, 16, 32, 64` qilib tanlanadi).",
      },
    },
    example1: {
      id: "hf-11-04-ex1",
      titleUz: "1-misol: 4096x4096 Qatlam Uchun r=16 LoRA Tejamkorligi",
      explanationUz: "Standart Transformer proyeksiyasi uchun LoRA parametrlarini hisoblash.",
      input: "in_features=4096, out_features=4096, r=16, alpha=32",
      code: `d_in, d_out, r, alpha = 4096, 4096, 16, 32
base_params = d_in * d_out
lora_params = r * (d_in + d_out)
ratio_pct = round((lora_params / base_params) * 100, 4)
scaling = alpha / r
print(f"Base: {base_params:,} | LoRA: {lora_params:,} ({ratio_pct}%) | scale={scaling}")`,
      expectedOutput: `Base: 16,777,216 | LoRA: 131,072 (0.7812%) | scale=2.0`,
      walkthrough: [
        "`base_params = 4096 * 4096 = 16,777,216`.",
        "`lora_params = 16 * (4096 + 4096) = 131,072` (atigi 0.7812%).",
      ],
    },
    example2: {
      id: "hf-11-04-ex2",
      titleUz: "2-misol: Turli Rank (r=4, 16, 64) Qiymatlarini Taqqoslash",
      explanationUz: "Rank oshgan sari parametrlar soni chiziqli o'sishini ko'rish.",
      input: "d_in=2048, d_out=2048, ranks=[4, 16, 64]",
      code: `for r in [4, 16, 64]:
    lp = r * (2048 + 2048)
    print(f"r={r:>2} -> lora_params={lp:>7,}")`,
      expectedOutput: `r= 4 -> lora_params= 16,384
r=16 -> lora_params= 65,536
r=64 -> lora_params=262,144`,
      walkthrough: [
        "Rank 4 barobar oshganda LoRA parametrlari ham aynan 4 barobar oshadi.",
      ],
    },
    visualizationId: "token-padding-lab",
    manimMeta: {
      scriptPath: "examples/manim/token_padding.py",
      sceneName: "TokenPaddingScene",
      renderCommand: "manim -pqh examples/manim/token_padding.py TokenPaddingScene",
      videoRendered: false,
      conceptNoteUz:
        "Haqiqiy LoRA fine-tuning GPU va TRL/PEFT kutubxonalarini talab qiladi; bu mashqda parametrlar va masshtablash qonuniyatini tekshiramiz.",
    },
    exercise: {
      id: "hf-11-04-ex-lora-stats",
      titleUz: "Amaliy Mashq: lora_layer_stats(in_features, out_features, r, alpha=16)",
      instructionsUz:
        "`lora_layer_stats(in_features, out_features, r, alpha=16)` funksiyasini yozing.\n\nTalablar:\n1. Agar `in_features <= 0`, `out_features <= 0`, `r <= 0` yoki `alpha <= 0` bo'lsa `ValueError` ko'taring.\n2. Quyidagi kalitlarga ega lug'at (`dict`) qaytaring:\n   - `'base_params'`: `in_features * out_features`\n   - `'lora_params'`: `r * (in_features + out_features)`\n   - `'scaling'`: `float(alpha) / float(r)`",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def lora_layer_stats(in_features, out_features, r, alpha=16):
    """
    Qaytaradi: {'base_params': int, 'lora_params': int, 'scaling': float}
    """
    # TODO: Musbat o'lchamlarni tekshiring va base_params, lora_params, scaling lug'atini qaytaring
    raise NotImplementedError("lora_layer_stats funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`lora_layer_stats(1000, 1000, 10, alpha=20)` -> `{'base_params': 1000000, 'lora_params': 20000, 'scaling': 2.0}`.",
      hintsUz: [
        "1-maslahat: `base_params = in_features * out_features`.",
        "2-maslahat: `lora_params = r * (in_features + out_features)`.",
        "3-maslahat: `scaling = float(alpha) / float(r)` va manfiy/nol argumentlarda `raise ValueError`.",
      ],
      testCases: [
        {
          id: "hf-lora-test-1",
          descriptionUz: "1000x1000 qatlam, r=10, alpha=20 hisob-kitobi",
          assertionCode:
            "lora_layer_stats(1000, 1000, 10, 20) == {'base_params': 1000000, 'lora_params': 20000, 'scaling': 2.0}",
        },
        {
          id: "hf-lora-test-2",
          descriptionUz: "4096x4096 qatlam, r=16, alpha=32 hisob-kitobi",
          assertionCode:
            "lora_layer_stats(4096, 4096, 16, 32) == {'base_params': 16777216, 'lora_params': 131072, 'scaling': 2.0}",
        },
      ],
    },
    quiz: [
      {
        id: "hf-11-04-q1",
        promptUz:
          "1. `in_features = 1000, out_features = 1000` bo'lgan qatlamga `r = 10` LoRA adapter qo'shilsa, nechta o'qitiladigan LoRA parametri hosil bo'ladi?",
        options: [
          "1,000,000 ta",
          "20,000 ta (chunki r * (1000 + 1000) = 10 * 2000 = 20,000)",
          "100 ta",
          "10,000 ta",
        ],
        correctIndex: 1,
        explanationUz: "$A$ matritsada $1000 \\times 10 = 10,000$, $B$ matritsada $10 \\times 1000 = 10,000$, jami $20,000$ parametr.",
      },
    ],
  },
  "hf-12-04-02": {
    whyItMattersUz:
      "DeepSeek-R1 va Open R1 kabi fikrlovchi (reasoning) modellarni o'qitishda ishlatiladigan GRPO (Group Relative Policy Optimization) algoritmi alohida Critic tarmog'ini saqlamasdan, bir xil savolga generatsiya qilingan $G$ ta javobning o'zaro mukofotlarini (rewards) guruh ichida normallashtirish orqali VRAMni keskin tejaydi.",
    atomicConceptUz:
      "GRPO Relative Advantage: guruhdagi har bir javob mukofoti $r_i$ dan guruh o'rtachasini ayirib, guruh standart og'ishiga bo'lish: $A_i = \\frac{r_i - \\text{mean}(r)}{\\text{std}(r) + \\epsilon}$.",
    prerequisitesUz: [
      "O'rtacha qiymat (mean) va standart og'ish (std)",
      " Chapter 12 ilg'or (Advanced) modul bo'lib, boshlang'ich AI Engineer uchun majburiy emas",
    ],
    depths: {
      overview: {
        titleUz: "Level 1 — Overview: GRPO Guruh Mukofotlarini Qanday Solishtiradi?",
        bodyUz:
          "Bitta matematik savolga model 4 ta turli yechim yozdi va tekshiruvchi funksiya ularga `[1.0, 0.0, 1.0, 0.2]` mukofot (reward) berdi. Qaysi javoblar rag'batlantirilishi, qaysilari jazolanishi kerak? GRPO shu 4 ta mukofotning o'rtachasini oladi: o'rtachadan yuqori ball olgan javoblar musbat ustunlik (`Advantage > 0`), o'rtachadan pastlari esa manfiy ustunlik (`Advantage < 0`) oladi.",
        keyFormulaOrRule:
          "A_i = \\frac{r_i - \\mu_r}{\\sigma_r + \\epsilon}",
      },
      understand: {
        titleUz: "Level 2 — Understand: Matematik Formula va Nol Dispersiya Himoyasi",
        bodyUz:
          "Guruhdagi $G$ ta mukofot $r = [r_1, \\dots, r_G]$ uchun:\n1. $\\mu = \\frac{1}{G}\\sum_{i=1}^G r_i$\n2. $\\sigma = \\sqrt{\\frac{1}{G}\\sum_{i=1}^G (r_i - \\mu)^2}$\n3. Agar barcha javoblar bir xil ball olgan bo'lsa ($\\sigma == 0$), nolga bo'linish xatosi chiqmasligi uchun barcha advantage qiymatlari `0.0` qaytariladi (yoki maxrajga `eps=1e-8` qo'shiladi).",
        keyFormulaOrRule:
          "\\sum_{i=1}^G A_i \\approx 0",
      },
      master: {
        titleUz: "Level 3 — Master: GRPO Cheklovlari va GPU Talabi",
        bodyUz:
          "Ogohlantirish: Haqiqiy GRPO o'qitish jarayoni har bir savol uchun $G=8..16$ tadan uzun reasoning zanjirini generatsiya qilishni va katta GPU VRAM resurslarini talab qiladi (brauzerda bajarilmaydi). Brauzerda biz GRPO'ning yadro matematik qismi — reward normalization'ni toza tekshiramiz.",
      },
    },
    example1: {
      id: "hf-12-04-ex1",
      titleUz: "1-misol: 4 ta Nomzod Javob Uchun Relative Advantage Hisoblash",
      explanationUz: "Toy reward ro'yxatini normallashtirib musbat va manfiy signallarni ajratish.",
      input: "rewards = [1.0, 0.0, 1.0, 0.0]",
      code: `import math

rewards = [1.0, 0.0, 1.0, 0.0]
mean_r = sum(rewards) / len(rewards)
var_r = sum((x - mean_r) ** 2 for x in rewards) / len(rewards)
std_r = math.sqrt(var_r)
advantages = [round((x - mean_r) / (std_r + 1e-8), 4) for x in rewards]

print("Mean:", mean_r, "| Std:", std_r)
print("Advantages:", advantages)`,
      expectedOutput: `Mean: 0.5 | Std: 0.5
Advantages: [1.0, -1.0, 1.0, -1.0]`,
      walkthrough: [
        "O'rtacha `0.5` va standart og'ish `0.5`.",
        "To'g'ri javoblar (`1.0`) `+1.0` rag'bat, xato javoblar (`0.0`) `-1.0` jazo oldi.",
      ],
    },
    example2: {
      id: "hf-12-04-ex2",
      titleUz: "2-misol: Barcha Javoblar Bir Xil Ball Olganda (Zero-Variance Edge Case)",
      explanationUz: "Agar guruhdagi barcha 4 ta javob ham xato (`[0.0, 0.0, 0.0, 0.0]`) chiqsa, advantage `0.0` bo'lishi.",
      input: "rewards = [0.0, 0.0, 0.0, 0.0]",
      code: `rewards = [0.0, 0.0, 0.0, 0.0]
mean_r = sum(rewards) / len(rewards)
advantages = [0.0 for _ in rewards]
print("Bir xil mukofotlarda advantage:", advantages)`,
      expectedOutput: `Bir xil mukofotlarda advantage: [0.0, 0.0, 0.0, 0.0]`,
      walkthrough: [
        "Farq bo'lmaganda hech bir javob boshqasidan ustun emas (`0.0`).",
      ],
    },
    visualizationId: "token-padding-lab",
    manimMeta: {
      scriptPath: "examples/manim/token_padding.py",
      sceneName: "TokenPaddingScene",
      renderCommand: "manim -pqh examples/manim/token_padding.py TokenPaddingScene",
      videoRendered: false,
      conceptNoteUz:
        "Toy reward normalization hisobi. Haqiqiy GRPO / Open-R1 training faqat ko'p GPU'li klaster yoki maxsus notebookda bajariladi.",
    },
    exercise: {
      id: "hf-12-04-ex-grpo-adv",
      titleUz: "Amaliy Mashq: compute_grpo_advantages(rewards)",
      instructionsUz:
        "`compute_grpo_advantages(rewards)` funksiyasini yozing.\n\nTalablar:\n1. `rewards` — kamida 2 ta sondan iborat ro'yxat (`len(rewards) < 2` bo'lsa `ValueError` ko'taring).\n2. Guruh o'rtachasi (`mean`) va populyatsiya standart og'ishini (`std = sqrt(sum((x - mean)**2 for x in rewards) / len(rewards))`) hisoblang.\n3. Agar `std == 0` bo'lsa, barcha elementlari `0.0` bo'lgan ro'yxat qaytaring; aks holda har bir element uchun `round((x - mean) / std, 4)` qiymatlar ro'yxatini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "challenge",
      assessment: "deterministic",
      starterCode: `import math

def compute_grpo_advantages(rewards):
    """
    rewards: list[float] (kamida 2 ta element)
    Qaytaradi: list[float] (har bir element 4 xonagacha yaxlitlangan relative advantage)
    """
    # TODO: Guruh o'rtachasi (mean) va standart og'ishini (std) hisoblab, normallashgan advantage ro'yxatini qaytaring
    raise NotImplementedError("compute_grpo_advantages funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`compute_grpo_advantages([1.0, 0.0, 1.0, 0.0])` -> `[1.0, -1.0, 1.0, -1.0]` va `compute_grpo_advantages([5.0, 5.0])` -> `[0.0, 0.0]`.",
      hintsUz: [
        "1-maslahat: `len(rewards) < 2` bo'lsa `raise ValueError`.",
        "2-maslahat: `std_r == 0` holatini alohida tekshirib `[0.0] * len(rewards)` qaytaring.",
        "3-maslahat: `[round((x - mean_r) / std_r, 4) for x in rewards]` qaytaring.",
      ],
      testCases: [
        {
          id: "hf-grpo-test-1",
          descriptionUz: "[1.0, 0.0, 1.0, 0.0] guruhida [1.0, -1.0, 1.0, -1.0] qaytishi",
          assertionCode:
            "compute_grpo_advantages([1.0, 0.0, 1.0, 0.0]) == [1.0, -1.0, 1.0, -1.0]",
        },
        {
          id: "hf-grpo-test-2-zero-std",
          descriptionUz: "Barcha mukofotlar teng [2.0, 2.0, 2.0] bo'lganda [0.0, 0.0, 0.0] qaytishi",
          assertionCode:
            "compute_grpo_advantages([2.0, 2.0, 2.0]) == [0.0, 0.0, 0.0]",
        },
      ],
    },
    quiz: [
      {
        id: "hf-12-04-q1",
        promptUz:
          "1. GRPO algoritmi klassik PPO (Proximal Policy Optimization) dan qaysi asosiy xotira ustunligi bilan farq qiladi?",
        options: [
          "Model og'irliklarini butunlay o'chirib yuboradi",
          "Alohida Critic (Value) modelini VRAMda saqlash o'rniga, bir savolga generatsiya qilingan guruh javoblarining o'rtacha mukofotini baseline sifatida ishlatadi",
          "Faqat CPU da ishlaydi",
          "Reward funksiyasini ishlatmaydi",
        ],
        correctIndex: 1,
        explanationUz:
          "GRPO guruh ichidagi nisbiy mukofotlardan (`group relative rewards`) baseline yasab, katta Critic tarmog'iga ehtiyoj qoldirmaydi.",
      },
    ],
  },
};

function getChapterEnvironmentNoticeUz(chapterNum: number): string {
  if (chapterNum === 0 || chapterNum === 2 || chapterNum === 6 || chapterNum === 8) {
    return "Pure Python mantiqi va algoritmlari brauzerning o'zida (Pyodide / Sandbox) ishlaydi. Haqiqiy pretrained model yuklash esa lokal muhit yoki Colab talab qiladi.";
  }
  if (chapterNum === 3 || chapterNum === 11 || chapterNum === 12) {
    return "OGOHLANTIRISH: Haqiqiy model fine-tuning (Trainer, SFT, LoRA, GRPO) GPU (Colab / Kaggle T4 yoki A100) hamda tarmoq orqali model yuklashni talab qiladi — brauzer ichida Pyodide'da katta model o'qitilmaydi.";
  }
  if (chapterNum === 4 || chapterNum === 9 || chapterNum === 10) {
    return "Eslatma: Hugging Face Hub'ga model/dataset push qilish yoki Spaces/Argilla joylashtirish foydalanuvchining shaxsiy HF tokeni va ochiq roziligini talab qiladi (tokenni hech qachon brauzer kodiga yozmang!).";
  }
  return "Nazariy va kichik Python mashqlari brauzerda ishlaydi; og'ir `transformers`/`datasets` pipeline'lari uchun tayyor Colab notebook tavsiya etiladi.";
}

// Build full normalized chapters and lessons list from HF_LLM_Course_Curriculum.json
const rawPhases = rawHfCurriculum.phases;

const flatRawLessonIds: string[] = rawPhases.flatMap((p) =>
  p.lessons.map((l) => l.id)
);

export const HF_COURSE_CHAPTERS: readonly HfCourseChapter[] = rawPhases.map(
  (phase) => {
    const chNum = phase.sourceChapter;
    const isAdvOptional = chNum === 12;
    const envNotice = getChapterEnvironmentNoticeUz(chNum);

    const lessons: HfMicroLesson[] = phase.lessons.map((rawLesson) => {
      const globalIdx = flatRawLessonIds.indexOf(rawLesson.id);
      const prevId =
        globalIdx > 0 ? (flatRawLessonIds[globalIdx - 1] ?? null) : null;
      const nextId =
        globalIdx >= 0 && globalIdx < flatRawLessonIds.length - 1
          ? (flatRawLessonIds[globalIdx + 1] ?? null)
          : null;

      const eqMatch = HF_CANONICAL_EQUIVALENCE_MAP[rawLesson.id];
      const canonicalMatch: HfCanonicalMatch = eqMatch
        ? {
            status: eqMatch.status,
            existingLessonId: eqMatch.existingLessonId,
            existingTrack: eqMatch.existingTrack,
            rationaleUz: eqMatch.rationaleUz,
          }
        : {
            status: "net_new",
            existingLessonId: null,
            rationaleUz:
              "Hugging Face LLM Course maxsus mavzusi (yangi rejalashtirilgan tugun).",
          };

      const publishedPayload = PUBLISHED_LESSONS_REGISTRY[rawLesson.id];
      const isUnavailableFuture =
        rawLesson.id === "hf-12-08-01" ||
        rawLesson.title.toLowerCase().includes("not yet available");

      const publishStatus: HfPublishStatus = isUnavailableFuture
        ? "unavailable"
        : publishedPayload
        ? "published"
        : "planned";

      return {
        id: rawLesson.id,
        chapterId: phase.id,
        chapterNumber: chNum,
        slug: rawLesson.slug,
        title: rawLesson.title,
        sourceSection: rawLesson.sourceSection,
        sectionOrdinal: rawLesson.sectionOrdinal,
        order: rawLesson.order,
        depths: ["overview", "understand", "master"] as const,
        objective: rawLesson.objective,
        publishStatus,
        canonicalMatch,
        sourceAttribution: {
          provider: "Hugging Face",
          course: "LLM Course",
          chapter: chNum,
          sectionTitle: rawLesson.source.sectionTitleFromUserOutline,
          chapterUrl: rawLesson.source.chapterUrl,
          upstreamRepoUrl: rawHfCurriculum.source.upstreamRepository,
          license: "Apache-2.0",
          licenseUrl: rawHfCurriculum.source.licenseUrl,
          verifiedDate: "2026-11-22",
          adaptationNoticeUz:
            "Manba: Hugging Face LLM Course (Apache-2.0). AI Atlas uchun o'zbek tilida qayta ishlangan va o'quv mashqlari bilan boyitilgan; Hugging Face tomonidan rasman tasdiqlangan tarjima emas.",
          environmentWarningUz: envNotice,
        },
        publishedContent: publishedPayload,
        prevLessonId: prevId,
        nextLessonId: nextId,
      };
    });

    return {
      id: phase.id,
      sourceChapter: chNum,
      title: phase.title,
      level: phase.level as "foundation" | "intermediate" | "advanced",
      summary: phase.summary,
      canonicalUrl: phase.canonicalUrl,
      sourceSectionCount: phase.sourceSectionCount,
      plannedMicroLessonCount: phase.plannedMicroLessonCount,
      chapterProject: phase.chapterProject,
      isAdvancedOptionalForBeginners: isAdvOptional,
      environmentNotesUz: envNotice,
      lessons,
    };
  }
);

export const ALL_HF_MICRO_LESSONS: readonly HfMicroLesson[] =
  HF_COURSE_CHAPTERS.flatMap((c) => c.lessons);

export const HF_LESSONS_BY_ID: Readonly<Record<string, HfMicroLesson>> =
  Object.fromEntries(ALL_HF_MICRO_LESSONS.map((l) => [l.id, l]));

export function getHfLessonById(id: string): HfMicroLesson | undefined {
  return HF_LESSONS_BY_ID[id];
}

/**
 * Resolves the canonical lesson ID for shared progress persistence across all tracks.
 * If an HF micro-lesson has a verified equivalent in AI Atlas, completing either one
 * marks the shared canonical ID as completed while keeping depth completion separate.
 */
export function resolveHfCanonicalLessonId(hfLessonId: string): string {
  const match = HF_CANONICAL_EQUIVALENCE_MAP[hfLessonId];
  if (match && match.status === "verified_equivalent") {
    return match.existingLessonId;
  }
  return hfLessonId;
}

/**
 * Returns the relevance role ("deep" | "supporting" | "overview") and recommended
 * depth for a given Hugging Face chapter (`hf-00`..`hf-12`) in one of the 6 existing career tracks.
 */
export function getHfChapterOverlayForTrack(
  chapterId: string,
  trackId: ExistingCareerTrackId
): {
  role: HfTrackRelevanceRole;
  recommendedDepth: LearningDepth;
  isRequiredForBeginner: boolean;
  badgeLabelUz: string;
} {
  const trackMeta =
    SIX_EXISTING_CAREER_TRACKS.find((t) => t.id === trackId) ??
    SIX_EXISTING_CAREER_TRACKS[0]!;
  const overlayConfig = rawHfCurriculum.trackOverlay[trackMeta.jsonKey];

  const isCh12 = chapterId === "hf-12";
  const isDeep = overlayConfig.deepChapterIds.includes(chapterId);
  const isSupporting = overlayConfig.supportingChapterIds.includes(chapterId);

  if (isDeep) {
    return {
      role: "deep",
      recommendedDepth: isCh12 ? "understand" : "master",
      isRequiredForBeginner: !isCh12,
      badgeLabelUz: isCh12
        ? "Ilg'or / Ixtiyoriy (Advanced)"
        : "Asosiy Chuqur (Deep / Master)",
    };
  }

  if (isSupporting) {
    return {
      role: "supporting",
      recommendedDepth: isCh12 ? "overview" : "understand",
      isRequiredForBeginner: false,
      badgeLabelUz: isCh12
        ? "Ilg'or Tadqiqot (Boshlovchilar uchun ixtiyoriy)"
        : "Qo'llab-quvvatlovchi (Supporting / Understand)",
    };
  }

  return {
    role: "overview",
    recommendedDepth: "overview",
    isRequiredForBeginner: false,
    badgeLabelUz: "Umumiy Tanishuv (Overview)",
  };
}

export interface HfCourseImportAuditReport {
  curriculumId: string;
  courseName: string;
  license: string;
  licenseUrl: string;
  officialCourseUrl: string;
  sixthTrackIntactNoSeventhTrackCreated: boolean;
  existingCareerTracksCount: number;
  sourceChaptersCount: number;
  outlineSectionsCount: number;
  totalMicroLessonsCount: number;
  publishedLessonsCount: number;
  plannedLessonsCount: number;
  unavailableLessonsCount: number;
  canonicalLinkedCount: number;
  netNewCount: number;
  publishedLessonIds: string[];
  unavailableLessonIds: string[];
}

export function getHfCourseImportAuditReport(): HfCourseImportAuditReport {
  const published = ALL_HF_MICRO_LESSONS.filter(
    (l) => l.publishStatus === "published"
  );
  const planned = ALL_HF_MICRO_LESSONS.filter(
    (l) => l.publishStatus === "planned"
  );
  const unavailable = ALL_HF_MICRO_LESSONS.filter(
    (l) => l.publishStatus === "unavailable"
  );
  const linked = ALL_HF_MICRO_LESSONS.filter(
    (l) => l.canonicalMatch.existingLessonId !== null
  );
  const netNew = ALL_HF_MICRO_LESSONS.filter(
    (l) => l.canonicalMatch.existingLessonId === null
  );

  const totalSections = HF_COURSE_CHAPTERS.reduce(
    (acc, ch) => acc + ch.sourceSectionCount,
    0
  );

  return {
    curriculumId: rawHfCurriculum.curriculumId,
    courseName: rawHfCurriculum.name,
    license: rawHfCurriculum.source.license,
    licenseUrl: rawHfCurriculum.source.licenseUrl,
    officialCourseUrl: rawHfCurriculum.source.officialCourseUrl,
    sixthTrackIntactNoSeventhTrackCreated:
      SIX_EXISTING_CAREER_TRACKS.length === 6,
    existingCareerTracksCount: SIX_EXISTING_CAREER_TRACKS.length,
    sourceChaptersCount: HF_COURSE_CHAPTERS.length,
    outlineSectionsCount: totalSections,
    totalMicroLessonsCount: ALL_HF_MICRO_LESSONS.length,
    publishedLessonsCount: published.length,
    plannedLessonsCount: planned.length,
    unavailableLessonsCount: unavailable.length,
    canonicalLinkedCount: linked.length,
    netNewCount: netNew.length,
    publishedLessonIds: published.map((l) => l.id),
    unavailableLessonIds: unavailable.map((l) => l.id),
  };
}
