/**
 * Comprehensive Published Content Builder for All 220 Hugging Face LLM Course Micro-Lessons
 * (Chapters hf-00 through hf-12, 99 Sections, 220 Micro-Lessons)
 *
 * Ensures every micro-lesson in the Hugging Face LLM Course collection follows the full
 * 9-step AI Atlas pedagogical standard:
 *   Theory (3 Depths: Overview / Understand / Master)
 *   -> Example 1 (Pure Python Traceable)
 *   -> Example 2 (Practical Hugging Face / Engineering Flow)
 *   -> Interactive Visualization & Manim Reference
 *   -> Coding Practice (Starter Code + 3 Progressive Hints)
 *   -> Run Code & Automated Tests (Deterministic Assertions + ValueError Edge Cases)
 *   -> Feedback & Quiz
 *   -> Next Lesson
 */

import type {
  HfCanonicalMatch,
  HfPublishedLessonPayload,
} from "./hf-llm-course";
import type { PracticeExercise } from "@/lib/practice/types";

export interface RawHfLessonInput {
  id: string;
  slug: string;
  title: string;
  sourceSection: string;
  sectionOrdinal: number;
  order: number;
  objective: string;
}

export interface RawHfPhaseInput {
  id: string;
  sourceChapter: number;
  title: string;
  level: string;
  summary: string;
  canonicalUrl: string;
  chapterProject: string;
}

interface ChapterBlueprint {
  domainSummaryUz: string;
  coreFormulaOrRule: string;
  productionTradeoffUz: string;
  exercise: PracticeExercise;
  buildExample1: (lesson: RawHfLessonInput) => {
    titleUz: string;
    explanationUz: string;
    input: string;
    code: string;
    expectedOutput: string;
    walkthrough: string[];
    whyThisOutputUz: string;
  };
  buildExample2: (lesson: RawHfLessonInput) => {
    titleUz: string;
    explanationUz: string;
    input: string;
    code: string;
    expectedOutput: string;
    walkthrough: string[];
    whyThisOutputUz: string;
  };
}

const CHAPTER_BLUEPRINTS: Record<number, ChapterBlueprint> = {
  0: {
    domainSummaryUz:
      "Python virtual muhiti (`venv`/`uv`), Google Colab GPU/CPU runtime tekshiruvi hamda `transformers`, `datasets` va `accelerate` kutubxonalarining reproduktiv (qayta tiklanuvchi) versiyalarini sozlash.",
    coreFormulaOrRule:
      "Reproducible Environment = Isolated Python (>=3.10) + Locked Package Versions + Device Fallback (cuda -> mps -> cpu)",
    productionTradeoffUz:
      "Global Python muhitiga paketlarni to'g'ridan-to'g'ri o'rnatish versiyalar to'qnashuviga (`dependency hell`) olib keladi. Production va ilmiy tajribalarda har bir loyiha izolyatsiyalangan virtual muhitda hamda aniq `device` (`cuda` mavjud bo'lmasa `cpu`) fallback tekshiruvi bilan ishga tushirilishi shart.",
    exercise: {
      id: "hf-ch00-ex-env-readiness",
      titleUz:
        "Amaliy Mashq: check_env_readiness(py_major, py_minor, has_venv, installed_pkgs)",
      instructionsUz:
        "`check_env_readiness(py_major, py_minor, has_venv, installed_pkgs)` funksiyasini yozing.\n\nTalablar:\n1. Agar `py_major < 0` yoki `py_minor < 0` bo'lsa `ValueError` ko'taring.\n2. Kerakli asosiy paketlar ro'yxati: `required = ['transformers', 'datasets', 'accelerate']`.\n3. `installed_pkgs` ichida yo'q bo'lgan paketlarni `missing` ro'yxatiga yig'ing (tartibni saqlang).\n4. Agar `(py_major > 3 or (py_major == 3 and py_minor >= 10))` va `bool(has_venv)` rost bo'lsa hamda `len(missing) == 0` bo'lsa `ready = True`, aks holda `False` bo'lsin.\n5. `{'ready': ready, 'missing': missing}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def check_env_readiness(py_major, py_minor, has_venv, installed_pkgs):
    """
    Muhitning Hugging Face LLM kursi uchun tayyorligini tekshiradi.
    Qaytaradi: {'ready': bool, 'missing': list[str]}
    """
    # TODO: 1. Manfiy versiya sonlarida ValueError ko'taring
    # TODO: 2. ['transformers', 'datasets', 'accelerate'] paketlaridan yetishmayotganlarini aniqlang
    # TODO: 3. Python >= 3.10, has_venv va missing bo'shligini tekshirib natijani qaytaring
    raise NotImplementedError("check_env_readiness funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`check_env_readiness(3, 11, True, ['transformers', 'datasets', 'accelerate'])` -> `{'ready': True, 'missing': []}`.",
      hintsUz: [
        "1-maslahat: `if py_major < 0 or py_minor < 0: raise ValueError('Versiya manfiy bo\\'lishi mumkin emas')`.",
        "2-maslahat: `required = ['transformers', 'datasets', 'accelerate']` va `missing = [p for p in required if p not in installed_pkgs]`.",
        "3-maslahat: `py_ok = (py_major > 3) or (py_major == 3 and py_minor >= 10)` va `ready = bool(py_ok and has_venv and len(missing) == 0)`.",
      ],
      testCases: [
        {
          id: "hf-ch00-test-1-ready",
          descriptionUz: "Python 3.11, venv faol va barcha 3 paket o'rnatilgan holat",
          assertionCode:
            "check_env_readiness(3, 11, True, ['transformers', 'datasets', 'accelerate', 'torch']) == {'ready': True, 'missing': []}",
        },
        {
          id: "hf-ch00-test-2-missing",
          descriptionUz: "Paket yetishmaganda yoki venv bo'lmaganda ready=False qaytishi",
          assertionCode:
            "check_env_readiness(3, 10, True, ['transformers']) == {'ready': False, 'missing': ['datasets', 'accelerate']} and check_env_readiness(3, 9, True, ['transformers', 'datasets', 'accelerate'])['ready'] == False",
        },
        {
          id: "hf-ch00-test-3-valerr",
          descriptionUz: "Manfiy versiya raqamida ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(check_env_readiness, -3, 10, True, []) and _expect_value_error(check_env_readiness, 3, -1, True, [])",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Python va Virtual Muhit Tekshiruvi`,
      explanationUz:
        "Lokal yoki Colab muhitida Python versiyasi hamda virtual muhit izolyatsiyasini dasturiy tekshirish.",
      input: "py_version = (3, 11), in_virtualenv = True",
      code: `py_version = (3, 11)
in_virtualenv = True
required_pkgs = ["transformers", "datasets", "accelerate"]
installed = {"transformers": "4.48.0", "datasets": "3.2.0", "accelerate": "1.3.0"}

missing = [p for p in required_pkgs if p not in installed]
is_ready = py_version >= (3, 10) and in_virtualenv and len(missing) == 0
print(f"Lesson: ${lesson.id} | Ready: {is_ready} | Missing: {missing}")`,
      expectedOutput: `Lesson: ${lesson.id} | Ready: True | Missing: []`,
      walkthrough: [
        "Python versiyasi `(3, 11) >= (3, 10)` shartidan o'tdi.",
        "Barcha 3 ta asosiy Hugging Face paketi o'rnatilganligi tasdiqlandi.",
      ],
      whyThisOutputUz:
        "Har qanday LLM tajribasini boshlashdan oldin muhit va paketlar versiyasini avtomatik tekshirish xatolarni erta ushlaydi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — Accelerator (CUDA / MPS / CPU) Fallback`,
      explanationUz:
        "GPU mavjud bo'lmasa kod to'xtab qolmasdan avtomatik ravishda CPU yoki Apple Silicon MPS qurilmasiga o'tish naqshi.",
      input: "has_cuda = False, has_mps = False",
      code: `# Real PyTorch / Accelerate qurilma tanlash mantiqi:
has_cuda = False
has_mps = False

device = "cuda" if has_cuda else ("mps" if has_mps else "cpu")
dtype = "bfloat16" if device == "cuda" else "float32"
print(f"Selected device: {device} | Recommended dtype: {dtype}")`,
      expectedOutput: `Selected device: cpu | Recommended dtype: float32`,
      walkthrough: [
        "`has_cuda` va `has_mps` yolg'on bo'lgani uchun xavfsiz `cpu` fallback tanlandi.",
        "CPU da `float32` aniqlik tanlanib, xatolik oldi olindi.",
      ],
      whyThisOutputUz:
        "Universal device-fallback yozish orqali bitta skript ham Colab T4 GPU da, ham oddiy noutbuk CPU sida o'zgarishsiz ishlaydi.",
    }),
  },
  1: {
    domainSummaryUz:
      "Transformer arxitekturalari (Encoder-only, Decoder-only, Encoder-Decoder), Self-Attention mexanizmi, LLM inference bosqichlari (Prefill TTFT vs Decode TPOT), sampling parametrlari hamda model cheklovlari (bias va hallucination).",
    coreFormulaOrRule:
      "\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V",
    productionTradeoffUz:
      "Har bir NLP vazifasiga ulkan Decoder-only LLM ishlatish shart emas: matn klassifikatsiyasi va NER uchun kichik Encoder-only (BERT/DeBERTa) modellar 10–50 barobar arzon va tez ishlaydi; matn generatsiyasi uchun Decoder-only, tarjima/summarization uchun esa Encoder-Decoder yoki instruksiyali Decoder tanlanadi.",
    exercise: {
      id: "hf-ch01-ex-select-arch",
      titleUz:
        "Amaliy Mashq: select_transformer_arch(task_name, context_tokens, max_ctx=4096)",
      instructionsUz:
        "`select_transformer_arch(task_name, context_tokens, max_ctx=4096)` funksiyasini yozing.\n\nTalablar:\n1. Agar `context_tokens < 0` yoki `max_ctx <= 0` bo'lsa `ValueError` ko'taring.\n2. `task_name` ga qarab optimal arxitekturani (`'arch'`) aniqlang:\n   - `'classification'`, `'ner'`, `'extractive_qa'` -> `'encoder'`\n   - `'generation'`, `'chat'`, `'code'` -> `'decoder'`\n   - `'translation'`, `'summarization'` -> `'encoder_decoder'`\n   - Boshqa noma'lum vazifa kelsa `ValueError` ko'taring.\n3. `fits_context = (context_tokens <= max_ctx)` qiymatini hisoblang.\n4. `{'arch': arch, 'fits_context': fits_context}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def select_transformer_arch(task_name, context_tokens, max_ctx=4096):
    """
    NLP vazifasi uchun optimal Transformer arxitekturasini va kontekst sig'imini tekshiradi.
    Qaytaradi: {'arch': str, 'fits_context': bool}
    """
    # TODO: 1. context_tokens < 0 yoki max_ctx <= 0 bo'lsa ValueError ko'taring
    # TODO: 2. task_name bo'yicha 'encoder', 'decoder' yoki 'encoder_decoder' tanlang
    # TODO: 3. {'arch': arch, 'fits_context': context_tokens <= max_ctx} qaytaring
    raise NotImplementedError("select_transformer_arch funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`select_transformer_arch('classification', 512, 4096)` -> `{'arch': 'encoder', 'fits_context': True}`.",
      hintsUz: [
        "1-maslahat: `if context_tokens < 0 or max_ctx <= 0: raise ValueError(...)`.",
        "2-maslahat: Uchta to'plam yoki lug'at tuzing: `encoder_tasks = {'classification', 'ner', 'extractive_qa'}`, `decoder_tasks = {'generation', 'chat', 'code'}`, `seq2seq_tasks = {'translation', 'summarization'}`.",
        "3-maslahat: Mos kelmasa `raise ValueError('Unknown task')`, mos kelsa `{'arch': arch, 'fits_context': context_tokens <= max_ctx}` qaytaring.",
      ],
      testCases: [
        {
          id: "hf-ch01-test-1-archs",
          descriptionUz: "Encoder, Decoder va Encoder-Decoder vazifalarini to'g'ri ajratish",
          assertionCode:
            "select_transformer_arch('classification', 300) == {'arch': 'encoder', 'fits_context': True} and select_transformer_arch('chat', 2048) == {'arch': 'decoder', 'fits_context': True} and select_transformer_arch('translation', 1024) == {'arch': 'encoder_decoder', 'fits_context': True}",
        },
        {
          id: "hf-ch01-test-2-ctx-overflow",
          descriptionUz: "Kontekst uzunligi max_ctx dan oshganda fits_context=False qaytishi",
          assertionCode:
            "select_transformer_arch('generation', 8192, max_ctx=4096) == {'arch': 'decoder', 'fits_context': False}",
        },
        {
          id: "hf-ch01-test-3-valerr",
          descriptionUz: "Manfiy token soni yoki noma'lum vazifada ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(select_transformer_arch, 'unknown_task', 100) and _expect_value_error(select_transformer_arch, 'chat', -10) and _expect_value_error(select_transformer_arch, 'chat', 100, 0)",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Arxitektura va Kontekst Tahlili`,
      explanationUz:
        "Vazifa turiga qarab Encoder, Decoder yoki Encoder-Decoder tanlash hamda Prefill/Decode xarajatini baholash.",
      input: "tasks = ['classification', 'chat', 'translation']",
      code: `arch_map = {
    "classification": "Encoder-only (BERT / RoBERTa)",
    "chat": "Decoder-only (Llama / Qwen / GPT)",
    "translation": "Encoder-Decoder (T5 / BART)",
}
for t in ["classification", "chat", "translation"]:
    print(f"{t:<15} -> {arch_map[t]}")`,
      expectedOutput: `classification  -> Encoder-only (BERT / RoBERTa)
chat            -> Decoder-only (Llama / Qwen / GPT)
translation     -> Encoder-Decoder (T5 / BART)`,
      walkthrough: [
        "Encoder-only modellar ikki yo'nalishli (bidirectional) kontekstni ko'rib, matnni tushunish vazifalarida eng yuqori samaradorlik beradi.",
        "Decoder-only modellar causal mask yordamida keyingi tokenni avtoregressiv bashorat qiladi.",
      ],
      whyThisOutputUz:
        "To'g'ri arxitekturani tanlash hisoblash xarajatini va javob kechikishini (latency) keskin kamaytiradi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — Prefill (TTFT) va Decode (TPOT) Vaqti`,
      explanationUz:
        "LLM inference jarayonida kiruvchi promptni parallel qayta ishlash (Prefill) va javob tokenlarini ketma-ket chiqarish (Decode) vaqtini hisoblash.",
      input: "prompt_tokens = 1000, gen_tokens = 50",
      code: `prompt_tokens = 1000
gen_tokens = 50
prefill_speed_tok_per_sec = 5000.0  # Compute-bound parallel prefill
decode_speed_tok_per_sec = 40.0     # Memory-bandwidth bound autoregressive decode

ttft_sec = prompt_tokens / prefill_speed_tok_per_sec
decode_sec = gen_tokens / decode_speed_tok_per_sec
total_sec = round(ttft_sec + decode_sec, 2)
print(f"TTFT: {ttft_sec:.2f}s | Decode: {decode_sec:.2f}s | Total: {total_sec:.2f}s")`,
      expectedOutput: `TTFT: 0.20s | Decode: 1.25s | Total: 1.45s`,
      walkthrough: [
        "1000 ta prompt tokeni parallel ravishda atigi 0.20 soniyada qayta ishlandi (`TTFT`).",
        "50 ta yangi token esa ketma-ket generatsiya qilingani sababli 1.25 soniya vaqt oldi.",
      ],
      whyThisOutputUz:
        "LLM javob tezligini optimallashtirishda chiqish tokenlari sonini (`max_new_tokens`) nazorat qilish eng muhim omildir.",
    }),
  },
  2: {
    domainSummaryUz:
      "`transformers` kutubxonasining ichki oqimi: `AutoTokenizer` (matn -> tokenlar -> `input_ids` & `attention_mask`), `AutoModel` / `AutoModelForSequenceClassification` (tensor -> `logits`), `softmax` ehtimolliklari, Padding va Truncation.",
    coreFormulaOrRule:
      "P(y = k \\mid x) = \\text{softmax}(z)_k = \\frac{e^{z_k - \\max(z)}}{\\sum_{j=1}^K e^{z_j - \\max(z)}}",
    productionTradeoffUz:
      "`pipeline()` tez prototiplash uchun qulay, ammo yuqori yuklamali servisda `AutoTokenizer` va `AutoModel` bosqichlarini qo'lda boshqarish (`dynamic padding`, `torch.no_grad()`, `bfloat16` va aniq `max_length` truncation) xotira va latency'ni 2–4 barobar yaxshilaydi.",
    exercise: {
      id: "hf-ch02-ex-logits-to-pred",
      titleUz: "Amaliy Mashq: logits_to_prediction(logits, id2label)",
      instructionsUz:
        "`logits_to_prediction(logits, id2label)` funksiyasini yozing.\n\nTalablar:\n1. `logits` — bo'sh bo'lmagan sonlar ro'yxati (`list[float]`), `id2label` — indeksdan yorliq nomiga o'tkazuvchi lug'at (`dict[int, str]`). Agar `logits` bo'sh bo'lsa yoki eng katta logit indeksi `id2label` ichida topilmasa `ValueError` ko'taring.\n2. Raqamli barqaror (numerically stable) Softmax hisoblang: har bir $z_i$ uchun $e^{z_i - \\max(z)}$ ni hisoblab, ularning yig'indisiga bo'ling.\n3. Eng katta ehtimollikka ega indeks (`best_id`) va uning 4 xonagacha yaxlitlangan ehtimolligini (`round(best_prob, 4)`) toping.\n4. `{'id': best_id, 'label': id2label[best_id], 'confidence': round(best_prob, 4)}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `import math

def logits_to_prediction(logits, id2label):
    """
    Modelning xom logits chiqishini Softmax orqali ehtimollik va label'ga aylantiradi.
    Qaytaradi: {'id': int, 'label': str, 'confidence': float}
    """
    # TODO: 1. Bo'sh logits yoki noto'g'ri id2label holatida ValueError ko'taring
    # TODO: 2. Max-shift bilan math.exp(z - max_z) orqali softmax ehtimolliklarini hisoblang
    # TODO: 3. Eng yuqori ehtimollikli indeks, label va round(prob, 4) ni qaytaring
    raise NotImplementedError("logits_to_prediction funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`logits_to_prediction([-1.5, 2.5], {0: 'NEGATIVE', 1: 'POSITIVE'})` -> `{'id': 1, 'label': 'POSITIVE', 'confidence': 0.982}`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(logits, list) or len(logits) == 0: raise ValueError(...)`.",
        "2-maslahat: `max_z = max(logits)`, `exps = [math.exp(z - max_z) for z in logits]`, `total = sum(exps)`, `probs = [e / total for e in exps]`.",
        "3-maslahat: `best_id = max(range(len(probs)), key=lambda i: probs[i])`. Agar `best_id not in id2label: raise ValueError(...)`.",
      ],
      testCases: [
        {
          id: "hf-ch02-test-1-positive",
          descriptionUz: "Ikkilik sentiment logits [-1.5, 2.5] dan POSITIVE va 0.982 ehtimollik olish",
          assertionCode:
            "logits_to_prediction([-1.5, 2.5], {0: 'NEGATIVE', 1: 'POSITIVE'}) == {'id': 1, 'label': 'POSITIVE', 'confidence': 0.982}",
        },
        {
          id: "hf-ch02-test-2-equal",
          descriptionUz: "Teng logits [1.0, 1.0] berilganda confidence=0.5 chiqishi",
          assertionCode:
            "logits_to_prediction([1.0, 1.0], {0: 'NEG', 1: 'POS'})['confidence'] == 0.5",
        },
        {
          id: "hf-ch02-test-3-valerr",
          descriptionUz: "Bo'sh logits yoki id2label ichida yo'q indeksda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(logits_to_prediction, [], {0: 'A'}) and _expect_value_error(logits_to_prediction, [1.0, 5.0], {0: 'ONLY_ZERO'})",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Logits dan Softmax Ehtimollikka O'tish`,
      explanationUz:
        "Transformer modelining oxirgi qatlamidan chiqqan xom `logits` sonlarini yig'indisi 1.0 ga teng ehtimollik taqsimotiga o'tkazish.",
      input: "logits = [-1.5, 2.5], id2label = {0: 'NEGATIVE', 1: 'POSITIVE'}",
      code: `import math

logits = [-1.5, 2.5]
id2label = {0: "NEGATIVE", 1: "POSITIVE"}

max_z = max(logits)
exps = [math.exp(z - max_z) for z in logits]
probs = [round(e / sum(exps), 4) for e in exps]
best_id = 0 if probs[0] >= probs[1] else 1

print("Probabilities:", probs)
print("Prediction:   ", id2label[best_id], f"({probs[best_id] * 100:.2f}%)")`,
      expectedOutput: `Probabilities: [0.018, 0.982]
Prediction:    POSITIVE (98.20%)`,
      walkthrough: [
        "Model xom logit sifatida `[-1.5, 2.5]` qaytardi (bular ehtimollik emas!).",
        "Softmax funksiyasi ularni `[0.018, 0.982]` ehtimolliklarga aylantirdi.",
      ],
      whyThisOutputUz:
        "Har qanday Hugging Face `AutoModelForSequenceClassification` modeli CrossEntropyLoss bilan ishlashi uchun xom logit qaytaradi; foydalanuvchiga ko'rsatishdan oldin Softmax qo'llaniladi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — End-to-End Tokenizer + Model Pipeline`,
      explanationUz:
        "`pipeline('sentiment-analysis')` pardasi ortidagi 3 qadamli (`AutoTokenizer` -> `AutoModel` -> `Post-processing`) oqim.",
      input: 'texts = ["AI Atlas juda foydali!", "Xatolik yuz berdi"]',
      code: `# Real Hugging Face 3-qadamli manual oqim:
# inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
# with torch.no_grad():
#     outputs = model(**inputs)
# probs = torch.softmax(outputs.logits, dim=-1)

simulated_batch_logits = [[-2.1, 3.0], [2.4, -1.8]]
labels = ["NEGATIVE", "POSITIVE"]
for i, row in enumerate(simulated_batch_logits):
    pred = labels[1 if row[1] > row[0] else 0]
    print(f"Row {i}: logits={row} -> {pred}")`,
      expectedOutput: `Row 0: logits=[-2.1, 3.0] -> POSITIVE
Row 1: logits=[2.4, -1.8] -> NEGATIVE`,
      walkthrough: [
        "1-gapda 1-indeks logiti (`3.0`) katta bo'lgani uchun `POSITIVE` tanlandi.",
        "2-gapda 0-indeks logiti (`2.4`) katta bo'lgani uchun `NEGATIVE` tanlandi.",
      ],
      whyThisOutputUz:
        "Pipeline ichidagi 3 bosqichni alohida yozish batching, custom threshold va xotirani aniq boshqarish imkonini beradi.",
    }),
  },
  3: {
    domainSummaryUz:
      "Pretrained modelni maxsus datasetda Fine-tuning qilish: `Dataset.map(batched=True)`, `DataCollatorWithPadding` (dynamic padding), `Trainer` API va `TrainingArguments`, PyTorch + `Accelerate` to'liq training loop hamda Learning Curves (Overfitting vs Underfitting) diagnostikasi.",
    coreFormulaOrRule:
      "\\theta_{t+1} = \\theta_t - \\eta_t \\cdot \\left(\\nabla_\\theta \\mathcal{L}_{\\text{CE}}(\\theta_t) + \\lambda \\theta_t\\right)",
    productionTradeoffUz:
      "Butun datasetni eng uzun matnga qarab oldindan `padding='max_length'` qilish GPU vaqtini behuda sarflaydi. `DataCollatorWithPadding` yordamida har bir batchni faqat o'sha batchdagi eng uzun qatorga moslab dinamik to'ldirish (`dynamic padding`) o'qitishni 2–3 barobar tezlashtiradi.",
    exercise: {
      id: "hf-ch03-ex-learning-curve",
      titleUz: "Amaliy Mashq: diagnose_training_curve(train_losses, val_losses)",
      instructionsUz:
        "`diagnose_training_curve(train_losses, val_losses)` funksiyasini yozing.\n\nTalablar:\n1. `train_losses` va `val_losses` — uzunliklari bir xil va kamida 2 ta musbat sondan iborat ro'yxatlar bo'lishi shart (aks holda `ValueError` ko'taring).\n2. `val_losses` eng kichik bo'lgan 1-asosli epoxa raqamini (`best_epoch = min_idx + 1`) toping.\n3. Holatni (`status`) aniqlang:\n   - Agar `train_losses[-1] < train_losses[0]` va `val_losses[-1] > min(val_losses) * 1.05` bo'lsa -> `'overfitting'`\n   - Aks holda, agar `train_losses[-1] >= train_losses[0] * 0.98` bo'lsa -> `'underfitting'`\n   - Aks holda -> `'healthy'`\n4. `{'status': status, 'best_epoch': best_epoch}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def diagnose_training_curve(train_losses, val_losses):
    """
    Training va Validation loss egri chizig'idan overfitting/underfitting va eng yaxshi epoxani aniqlaydi.
    Qaytaradi: {'status': str, 'best_epoch': int}
    """
    # TODO: 1. Ro'yxatlar uzunligi >= 2 va o'zaro tengligini tekshiring (aks holda ValueError)
    # TODO: 2. Eng kichik val_loss indeksidan best_epoch (1-indexed) ni hisoblang
    # TODO: 3. 'overfitting', 'underfitting' yoki 'healthy' holatini aniqlab qaytaring
    raise NotImplementedError("diagnose_training_curve funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`diagnose_training_curve([0.9, 0.5, 0.2, 0.08], [0.85, 0.48, 0.42, 0.55])` -> `{'status': 'overfitting', 'best_epoch': 3}`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(train_losses, list) or not isinstance(val_losses, list) or len(train_losses) < 2 or len(train_losses) != len(val_losses): raise ValueError(...)`.",
        "2-maslahat: `min_val = min(val_losses)` va `best_epoch = val_losses.index(min_val) + 1`.",
        "3-maslahat: `if train_losses[-1] < train_losses[0] and val_losses[-1] > min_val * 1.05: status = 'overfitting'`.",
      ],
      testCases: [
        {
          id: "hf-ch03-test-1-overfit",
          descriptionUz: "3-epoxadan keyin validation loss oshib ketganda overfitting va best_epoch=3 qaytishi",
          assertionCode:
            "diagnose_training_curve([0.9, 0.5, 0.2, 0.08], [0.85, 0.48, 0.42, 0.55]) == {'status': 'overfitting', 'best_epoch': 3}",
        },
        {
          id: "hf-ch03-test-2-healthy-underfit",
          descriptionUz: "Healthy va Underfitting holatlarini to'g'ri ajratish",
          assertionCode:
            "diagnose_training_curve([0.9, 0.6, 0.4], [0.88, 0.62, 0.43]) == {'status': 'healthy', 'best_epoch': 3} and diagnose_training_curve([0.9, 0.89, 0.895], [0.92, 0.91, 0.915])['status'] == 'underfitting'",
        },
        {
          id: "hf-ch03-test-3-valerr",
          descriptionUz: "Uzunligi mos bo'lmagan yoki 2 tadan kam epoxada ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(diagnose_training_curve, [0.5], [0.5]) and _expect_value_error(diagnose_training_curve, [0.5, 0.4], [0.5])",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Learning Curve va Early Stopping Tahlili`,
      explanationUz:
        "Epoxalar davomida Training va Validation loss qiymatlarini solishtirib, eng optimal checkpoint epoxasini topish.",
      input: "train = [0.88, 0.45, 0.21, 0.09], val = [0.84, 0.47, 0.41, 0.56]",
      code: `train_losses = [0.88, 0.45, 0.21, 0.09]
val_losses = [0.84, 0.47, 0.41, 0.56]

best_idx = min(range(len(val_losses)), key=lambda i: val_losses[i])
is_overfitting = val_losses[-1] > val_losses[best_idx] * 1.05
print(f"Best Epoch: {best_idx + 1} (val_loss={val_losses[best_idx]}) | Overfitting at end: {is_overfitting}")`,
      expectedOutput: `Best Epoch: 3 (val_loss=0.41) | Overfitting at end: True`,
      walkthrough: [
        "3-epoxada validation loss eng past (`0.41`) nuqtaga tushdi.",
        "4-epoxada train loss pasayishda davom etdi (`0.09`), ammo val loss `0.56` ga ko'tarilib ketdi (overfitting).",
      ],
      whyThisOutputUz:
        "`load_best_model_at_end=True` parametri aynan 3-epoxadagi eng yaxshi checkpointni saqlab qolish uchun ishlatiladi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — Dynamic Padding vs Static Padding Tejamkorligi`,
      explanationUz:
        "`DataCollatorWithPadding` yordamida har bir batchni faqat o'zining maksimal uzunligiga moslash qancha token hisobini tejashini o'lchash.",
      input: "batch_lengths = [18, 22, 15, 24], static_max_len = 512",
      code: `batch_lengths = [18, 22, 15, 24]
static_max_len = 512

static_tokens = len(batch_lengths) * static_max_len
dynamic_tokens = len(batch_lengths) * max(batch_lengths)
saved_pct = round((1 - dynamic_tokens / static_tokens) * 100, 1)
print(f"Static: {static_tokens} tok | Dynamic: {dynamic_tokens} tok | Saved: {saved_pct}%")`,
      expectedOutput: `Static: 2048 tok | Dynamic: 96 tok | Saved: 95.3%`,
      walkthrough: [
        "Static padding (`max_length=512`) 4 ta qator uchun `2048` ta token matritsasini yaratadi.",
        "Dynamic padding esa eng uzun qator (`24`) bo'yicha `4 * 24 = 96` ta token yaratib, hisoblashni 95.3% ga tejaydi.",
      ],
      whyThisOutputUz:
        "Hugging Face `Trainer` da `data_collator=DataCollatorWithPadding(tokenizer=tokenizer)` berish dynamic padding'ni avtomatik faollashtiradi.",
    }),
  },
  4: {
    domainSummaryUz:
      "Hugging Face Hub arxitekturasi: Git va Git-LFS asosidagi Model, Dataset va Spaces repozitoriylari, `push_to_hub()` API, commit/revision boshqaruvi hamda standart Model Card (`README.md` YAML metadata, litsenziya, metrikalar va cheklovlar) yaratish.",
    coreFormulaOrRule:
      "\\text{Hub Artifact} = \\text{config.json} + \\text{model.safetensors} + \\text{tokenizer.json} + \\text{README.md (Model Card)}",
    productionTradeoffUz:
      "Production muhitida model yuklayotganda `from_pretrained(repo_id, revision='<commit_hash>')` orqali aniq Git commit hash'ni qulflash (pin qilish) hamda eski `pytorch_model.bin` (pickle) o'rniga xavfsiz `model.safetensors` formatini ishlatish ixtiyoriy kod bajarilishi (arbitrary code execution) xavfini bartaraf etadi.",
    exercise: {
      id: "hf-ch04-ex-hub-card",
      titleUz: "Amaliy Mashq: validate_hub_repo_card(repo_id, license_name, metrics)",
      instructionsUz:
        "`validate_hub_repo_card(repo_id, license_name, metrics)` funksiyasini yozing.\n\nTalablar:\n1. `repo_id` — `'namespace/model-name'` ko'rinishidagi satr bo'lishi shart (ichida aynan bitta `'/'` bo'lishi hamda ikkala qism ham bo'sh bo'lmasligi shart, aks holda `ValueError` ko'taring).\n2. `has_license = isinstance(license_name, str) and len(license_name.strip()) > 0`.\n3. `has_metrics = isinstance(metrics, dict) and len(metrics) > 0`.\n4. `{'namespace': ns, 'model_name': name, 'ready_to_publish': bool(has_license and has_metrics)}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def validate_hub_repo_card(repo_id, license_name, metrics):
    """
    Hugging Face Hub repo identifikatori va Model Card tayyorligini tekshiradi.
    Qaytaradi: {'namespace': str, 'model_name': str, 'ready_to_publish': bool}
    """
    # TODO: 1. repo_id ichida aynan bitta '/' borligini va qismlari bo'sh emasligini tekshiring (ValueError)
    # TODO: 2. license_name va metrics mavjudligini tekshirib natijani qaytaring
    raise NotImplementedError("validate_hub_repo_card funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`validate_hub_repo_card('ai-atlas/uzbek-bert', 'apache-2.0', {'f1': 0.91})` -> `{'namespace': 'ai-atlas', 'model_name': 'uzbek-bert', 'ready_to_publish': True}`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(repo_id, str) or repo_id.count('/') != 1: raise ValueError(...)`.",
        "2-maslahat: `ns, name = [part.strip() for part in repo_id.split('/')]`. Agar `not ns or not name: raise ValueError(...)`.",
        "3-maslahat: `ready = bool(isinstance(license_name, str) and license_name.strip() and isinstance(metrics, dict) and len(metrics) > 0)`.",
      ],
      testCases: [
        {
          id: "hf-ch04-test-1-valid",
          descriptionUz: "To'g'ri namespace/model, litsenziya va metrikalarda ready_to_publish=True qaytishi",
          assertionCode:
            "validate_hub_repo_card('ai-atlas/uzbek-bert', 'apache-2.0', {'f1': 0.91}) == {'namespace': 'ai-atlas', 'model_name': 'uzbek-bert', 'ready_to_publish': True}",
        },
        {
          id: "hf-ch04-test-2-incomplete-card",
          descriptionUz: "Litsenziya yoki metrikalar bo'sh bo'lganda ready_to_publish=False qaytishi",
          assertionCode:
            "validate_hub_repo_card('ai-atlas/uzbek-bert', '', {'f1': 0.91})['ready_to_publish'] == False and validate_hub_repo_card('ai-atlas/uzbek-bert', 'mit', {})['ready_to_publish'] == False",
        },
        {
          id: "hf-ch04-test-3-valerr",
          descriptionUz: "Noto'g'ri repo_id formatida ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(validate_hub_repo_card, 'invalid_repo_id', 'mit', {'f1': 0.9}) and _expect_value_error(validate_hub_repo_card, '/only-model', 'mit', {'f1': 0.9})",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Hub Repozitoriy va Artefaktlar`,
      explanationUz:
        "`save_pretrained()` va `push_to_hub()` yaratadigan fayllar tarkibini tekshirish.",
      input: "repo_id = 'ai-atlas/uzbek-sentiment-v1'",
      code: `repo_id = "ai-atlas/uzbek-sentiment-v1"
ns, model_name = repo_id.split("/")
artifacts = ["config.json", "model.safetensors", "tokenizer.json", "special_tokens_map.json", "README.md"]
print(f"Namespace: {ns} | Model: {model_name} | Files: {len(artifacts)} ta")`,
      expectedOutput: `Namespace: ai-atlas | Model: uzbek-sentiment-v1 | Files: 5 ta`,
      walkthrough: [
        "Model og'irliklari (`model.safetensors`) va arxitektura konfiguratsiyasi (`config.json`) birga saqlanadi.",
        "Tokenizer va Model Card (`README.md`) ham bitta repozitoriyda versiyalanadi.",
      ],
      whyThisOutputUz:
        "Model va tokenizerni bitta repo'ga yuklash boshqa dasturchilarga `AutoModel.from_pretrained(repo_id)` orqali bir qatorda yuklab olish imkonini beradi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — Model Card YAML Metadata Tuzilishi`,
      explanationUz:
        "Hugging Face Hub qidiruv tizimi va filtrlarida model to'g'ri ko'rinishi uchun `README.md` boshidagi YAML blokini shakllantirish.",
      input: "language='uz', license='apache-2.0', f1=0.924",
      code: `yaml_header = """---
language:
- uz
license: apache-2.0
pipeline_tag: text-classification
model-index:
- name: uzbek-sentiment-v1
  results:
  - task:
      type: text-classification
    metrics:
    - type: f1
      value: 0.924
---"""
print(yaml_header.splitlines()[0], "| lines:", len(yaml_header.splitlines()))`,
      expectedOutput: `--- | lines: 15`,
      walkthrough: [
        "`pipeline_tag: text-classification` Hub sahifasida avtomatik Inference Widget paydo bo'lishini ta'minlaydi.",
        "`metrics` bo'limi modelning tekshirilgan sifat ko'rsatkichlarini hujjatlashtiradi.",
      ],
      whyThisOutputUz:
        "To'liq yozilgan Model Card modelning qaysi tilda, qanday litsenziyada va qanday cheklovlar bilan ishlashini shaffof ko'rsatadi.",
    }),
  },
  5: {
    domainSummaryUz:
      "`datasets` kutubxonasi: Apache Arrow xotiraga bog'langan (memory-mapped) ustunli jadval formati, lokal va masofaviy CSV/JSON/Parquet yuklash, `.map(batched=True)`, `.filter()`, gigant korpuslar uchun `streaming=True` (`IterableDataset`) hamda FAISS yordamida semantik vektor qidiruv.",
    coreFormulaOrRule:
      "\\text{sim}(q, d) = \\langle q, d \\rangle = \\sum_{i=1}^D q_i d_i \\quad (\\text{yoki } L_2 = \\|q - d\\|_2^2)",
    productionTradeoffUz:
      "100 GB lik matn korpusini oddiy Python `list` yoki Pandas orqali RAMga yuklash `MemoryError` keltirib chiqaradi. `datasets` kutubxonasining Apache Arrow `mmap` mexanizmi diskdan zero-copy o'qiydi, `streaming=True` esa datasetni diskka umuman yuklamasdan tarmoq orqali oqimli (`IterableDataset`) qayta ishlaydi.",
    exercise: {
      id: "hf-ch05-ex-dataset-faiss",
      titleUz: "Amaliy Mashq: filter_and_rank_dataset(records, min_tokens, query_vec)",
      instructionsUz:
        "`filter_and_rank_dataset(records, min_tokens, query_vec)` funksiyasini yozing.\n\nTalablar:\n1. Agar `min_tokens < 0` yoki `not isinstance(query_vec, list)` yoki `len(query_vec) == 0` bo'lsa `ValueError` ko'taring.\n2. `records` — har biri `{'id': str, 'tokens': int, 'embedding': list[float]}` bo'lgan lug'atlar ro'yxati.\n3. Faqat `r['tokens'] >= min_tokens` bo'lgan yozuvlarni qoldiring (`.filter()` analogi).\n4. Har bir qolgan yozuv uchun `query_vec` bilan skalyar ko'paytmani (`dot = sum(a * b for a, b in zip(r['embedding'], query_vec))`) hisoblang.\n5. Skalyar ko'paytmasi eng kattadan eng kichikka saralangan yozuv `'id'` lari ro'yxatini (`list[str]`) qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def filter_and_rank_dataset(records, min_tokens, query_vec):
    """
    Dataset yozuvlarini token uzunligi bo'yicha filtrlaydi va query_vec ga yaqinligi bo'yicha saralaydi.
    Qaytaradi: list[str] (saralangan record id'lari)
    """
    # TODO: 1. min_tokens < 0 yoki bo'sh query_vec bo'lsa ValueError ko'taring
    # TODO: 2. r['tokens'] >= min_tokens yozuvlarni ajrating
    # TODO: 3. Dot-product bo'yicha kamayish tartibida saralab, [r['id'] ...] ro'yxatini qaytaring
    raise NotImplementedError("filter_and_rank_dataset funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`filter_and_rank_dataset([{'id': 'd1', 'tokens': 5, 'embedding': [1.0, 0.0]}, {'id': 'd2', 'tokens': 20, 'embedding': [0.2, 0.9]}, {'id': 'd3', 'tokens': 30, 'embedding': [0.9, 0.1]}], 10, [1.0, 0.0])` -> `['d3', 'd2']`.",
      hintsUz: [
        "1-maslahat: `if min_tokens < 0 or not isinstance(query_vec, list) or len(query_vec) == 0: raise ValueError(...)`.",
        "2-maslahat: `valid = [r for r in records if r['tokens'] >= min_tokens]`.",
        "3-maslahat: `valid.sort(key=lambda r: sum(a * b for a, b in zip(r['embedding'], query_vec)), reverse=True)` va `[r['id'] for r in valid]` qaytaring.",
      ],
      testCases: [
        {
          id: "hf-ch05-test-1-filter-rank",
          descriptionUz: "Qisqa hujjatni (d1) filtrlab tashlab, qolganlarini semantik yaqinlik bo'yicha saralash",
          assertionCode:
            "filter_and_rank_dataset([{'id': 'd1', 'tokens': 5, 'embedding': [1.0, 0.0]}, {'id': 'd2', 'tokens': 20, 'embedding': [0.2, 0.9]}, {'id': 'd3', 'tokens': 30, 'embedding': [0.9, 0.1]}], 10, [1.0, 0.0]) == ['d3', 'd2']",
        },
        {
          id: "hf-ch05-test-2-empty",
          descriptionUz: "Hech bir yozuv min_tokens shartidan o'tmaganda bo'sh ro'yxat qaytishi",
          assertionCode:
            "filter_and_rank_dataset([{'id': 'd1', 'tokens': 3, 'embedding': [1.0]}], 10, [1.0]) == []",
        },
        {
          id: "hf-ch05-test-3-valerr",
          descriptionUz: "Manfiy min_tokens yoki bo'sh query_vec berilganda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(filter_and_rank_dataset, [], -1, [1.0]) and _expect_value_error(filter_and_rank_dataset, [], 5, [])",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Batched Map va Filter Oqimi`,
      explanationUz:
        "Katta matnlar to'plamidan juda qisqa satrlarni tozalab tashlash va so'zlar sonini hisoblash.",
      input: "rows = [{'text': 'Salom'}, {'text': 'Hugging Face Datasets Apache Arrow ustida ishlaydi'}]",
      code: `rows = [
    {"id": 1, "text": "Salom"},
    {"id": 2, "text": "Hugging Face Datasets Apache Arrow ustida ishlaydi"},
    {"id": 3, "text": "FAISS vektor qidiruvni tezlashtiradi"},
]
filtered = [
    {**r, "word_count": len(r["text"].split())}
    for r in rows
    if len(r["text"].split()) >= 4
]
print("Qolgan yozuvlar:", [(r["id"], r["word_count"]) for r in filtered])`,
      expectedOutput: `Qolgan yozuvlar: [(2, 7), (3, 4)]`,
      walkthrough: [
        "1-yozuvda atigi 1 ta so'z bo'lgani uchun filtrdan o'tmadi.",
        "2 va 3-yozuvlarga `word_count` ustuni qo'shildi.",
      ],
      whyThisOutputUz:
        "`dataset.filter()` va `dataset.map(batched=True)` operatsiyalari xotirani to'ldirmasdan Arrow ustunlarini bloklab yangilaydi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — FAISS Semantik Qidiruv Top-K`,
      explanationUz:
        "So'rov (query) embedding vektori bilan hujjatlar bazasi o'rtasidagi eng yaqin Top-K natijani topish (`get_nearest_examples`).",
      input: "query_emb = [0.9, 0.1], docs = 3 ta hujjat",
      code: `docs = [
    ("doc_sql", [0.1, 0.95]),
    ("doc_transformers", [0.92, 0.08]),
    ("doc_tokenizers", [0.85, 0.15]),
]
query = [0.9, 0.1]
ranked = sorted(
    docs,
    key=lambda item: sum(a * b for a, b in zip(item[1], query)),
    reverse=True,
)
print("Top-2 nearest:", [name for name, _ in ranked[:2]])`,
      expectedOutput: `Top-2 nearest: ['doc_transformers', 'doc_tokenizers']`,
      walkthrough: [
        "`doc_transformers` vektori `[0.92, 0.08]` so'rovga eng katta skalyar ko'paytma berdi.",
        "FAISS indeksi millionlab vektorlar ichida ushbu qidiruvni millisoniyalarda bajaradi.",
      ],
      whyThisOutputUz:
        "`dataset.add_faiss_index(column='embeddings')` RAG tizimlari uchun mahalliy vektor bazasi vazifasini bajaradi.",
    }),
  },
  6: {
    domainSummaryUz:
      "`tokenizers` kutubxonasi: Rust asosidagi Fast Tokenizers, `offset_mapping` orqali tokenni asl matndagi belgi indeksiga `(char_start, char_end)` bog'lash, 4 bosqichli tokenizer pipeline (`Normalization -> Pre-tokenization -> Model (BPE / WordPiece / Unigram) -> Post-processing`) va noldan yangi tokenizer o'qitish.",
    coreFormulaOrRule:
      "\\text{WordPiece Score}(a, b) = \\frac{\\text{freq}(ab)}{\\text{freq}(a) \\times \\text{freq}(b)}, \\quad \\text{BPE Score}(a, b) = \\text{freq}(ab)",
    productionTradeoffUz:
      "Ingliz tilida o'qitilgan tokenizer o'zbekcha matnni juda ko'p mayda subword bo'laklarga (`fertility > 3.0`) parchalab yuboradi, bu esa kontekst oynasini qisqartiradi va inference narxini oshiradi. `train_new_from_iterator()` bilan o'zbek korpusida moslashtirilgan tokenizer o'qitish tokenlar sonini 2 barobargacha qisqartiradi.",
    exercise: {
      id: "hf-ch06-ex-offset-extract",
      titleUz:
        "Amaliy Mashq: extract_answer_from_offsets(context, offsets, start_idx, end_idx)",
      instructionsUz:
        "`extract_answer_from_offsets(context, offsets, start_idx, end_idx)` funksiyasini yozing.\n\nTalablar:\n1. `context` — asl matn satri (`str`), `offsets` — har bir tokenning `(char_start, char_end)` indekslari ro'yxati (`list[tuple[int, int]]`).\n2. Agar `not isinstance(offsets, list)` yoki `len(offsets) == 0` yoki `start_idx < 0` yoki `end_idx < start_idx` yoki `end_idx >= len(offsets)` bo'lsa `ValueError` ko'taring.\n3. Boshlang'ich belgi indeksi `char_start = offsets[start_idx][0]` va tugash belgi indeksi `char_end = offsets[end_idx][1]` ni oling (agar `char_start < 0` yoki `char_end > len(context)` yoki `char_start > char_end` bo'lsa `ValueError` ko'taring).\n4. Asl matndan `context[char_start:char_end]` kesmasini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def extract_answer_from_offsets(context, offsets, start_idx, end_idx):
    """
    Fast Tokenizer offset_mapping yordamida token span (start_idx..end_idx) ga mos asl matn kesmasini ajratadi.
    Qaytaradi: str
    """
    # TODO: 1. start_idx va end_idx chegaralarini tekshiring (xato bo'lsa ValueError)
    # TODO: 2. char_start = offsets[start_idx][0] va char_end = offsets[end_idx][1] ni oling
    # TODO: 3. context[char_start:char_end] satrini qaytaring
    raise NotImplementedError("extract_answer_from_offsets funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`extract_answer_from_offsets('AI Atlas platformasi', [(0, 2), (3, 8), (9, 20)], 0, 1)` -> `'AI Atlas'`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(offsets, list) or len(offsets) == 0 or start_idx < 0 or end_idx < start_idx or end_idx >= len(offsets): raise ValueError(...)`.",
        "2-maslahat: `char_start = offsets[start_idx][0]` va `char_end = offsets[end_idx][1]`.",
        "3-maslahat: `return context[char_start:char_end]`.",
      ],
      testCases: [
        {
          id: "hf-ch06-test-1-span",
          descriptionUz: "Token indekslari (0..1) orqali 'AI Atlas' kesmasini asl matndan ajratish",
          assertionCode:
            "extract_answer_from_offsets('AI Atlas platformasi', [(0, 2), (3, 8), (9, 20)], 0, 1) == 'AI Atlas'",
        },
        {
          id: "hf-ch06-test-2-single-tok",
          descriptionUz: "Bitta subword/so'z indeksini (start_idx == end_idx) to'g'ri kesib olish",
          assertionCode:
            "extract_answer_from_offsets('Toshkent shahri', [(0, 8), (9, 15)], 0, 0) == 'Toshkent'",
        },
        {
          id: "hf-ch06-test-3-valerr",
          descriptionUz: "end_idx < start_idx yoki chegara tashqarisidagi indeksda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(extract_answer_from_offsets, 'Salom', [(0, 5)], 1, 0) and _expect_value_error(extract_answer_from_offsets, 'Salom', [(0, 5)], 0, 3) and _expect_value_error(extract_answer_from_offsets, 'Salom', [], 0, 0)",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Fast Tokenizer Offset Mapping`,
      explanationUz:
        "Subword tokenlarni asl matndagi belgi koordinatalariga `(start_char, end_char)` bog'lash.",
      input: "text = 'Oʻzbekiston', tokens = ['Oʻzbek', '##iston']",
      code: `text = "O'zbekiston"
offsets = [(0, 6), (6, 11)]
tokens = ["O'zbek", "##iston"]

for tok, (s, e) in zip(tokens, offsets):
    print(f"{tok:<10} -> chars ({s}, {e}) -> '{text[s:e]}'")`,
      expectedOutput: `O'zbek     -> chars (0, 6) -> 'O'zbek'
##iston    -> chars (6, 11) -> 'iston'`,
      walkthrough: [
        "`##iston` tokenidagi `##` prefiksi olib tashlansa ham, `offset_mapping` asl matndagi `(6, 11)` pozitsiyani aniq eslab qoladi.",
        "Extractive QA va NER vazifalarida javobni buzmasdan qaytarish uchun `offset_mapping` hal qiluvchi rol o'ynaydi.",
      ],
      whyThisOutputUz:
        "Fast Tokenizer (`return_offsets_mapping=True`) asl matndagi bo'shliqlar va tinish belgilarini yo'qotmasdan qayta tiklaydi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — BPE vs WordPiece Merge Baholash`,
      explanationUz:
        "BPE eng yuqori juftlik chastotasini (`freq(ab)`), WordPiece esa o'zaro axborot ulushini (`freq(ab) / (freq(a)*freq(b))`) tanlashini solishtirish.",
      input: "pair_ab_freq=10, freq_a=20, freq_b=25",
      code: `freq_ab, freq_a, freq_b = 10, 20, 25
bpe_score = freq_ab
wordpiece_score = round(freq_ab / (freq_a * freq_b), 4)
print(f"BPE score: {bpe_score} | WordPiece likelihood score: {wordpiece_score}")`,
      expectedOutput: `BPE score: 10 | WordPiece likelihood score: 0.02`,
      walkthrough: [
        "BPE faqat birgalikda necha marta uchraganiga (`10`) qaraydi.",
        "WordPiece esa alohida qismlar juda ko'p uchrasa (`20 * 25 = 500`), ularni birlashtirishga shoshilmaydi (`0.02`).",
      ],
      whyThisOutputUz:
        "BERT WordPiece'dan, GPT va Llama modellari esa Byte-level BPE'dan foydalanadi.",
    }),
  },
  7: {
    domainSummaryUz:
      "Klassik va zamonaviy NLP vazifalari: Token Classification (NER / POS va subword `-100` label alignment), Masked Language Modeling (MLM domain adaptation & Perplexity), Translation (BLEU), Summarization (ROUGE), Causal LM pretraining hamda Extractive Question Answering (`start_logits` / `end_logits`).",
    coreFormulaOrRule:
      "\\text{Perplexity (PPL)} = \\exp\\left(-\\frac{1}{N}\\sum_{t=1}^N \\log P_\\theta(x_t \\mid x_{<t})\\right) = \\exp(\\mathcal{L}_{\\text{CE}})",
    productionTradeoffUz:
      "So'z bir nechta subword tokenlarga bo'linganda (masalan `'Toshkentga' -> ['Toshkent', '##ga']`) NER yorlig'i moslashtirilmasa, tokenlar va yorliqlar uzunligi mos kelmay qoladi. Maxsus tokenlar (`None`) va davomiy subwordlarga PyTorch `CrossEntropyLoss` avtomatik e'tiborsiz qoldiradigan `-100` qiymatini berish standart yechimdir.",
    exercise: {
      id: "hf-ch07-ex-align-labels",
      titleUz:
        "Amaliy Mashq: align_labels_with_tokens(word_ids, word_labels, ignore_index=-100)",
      instructionsUz:
        "`align_labels_with_tokens(word_ids, word_labels, ignore_index=-100)` funksiyasini yozing.\n\nTalablar:\n1. `word_ids` — tokenizer qaytargan so'z indekslari ro'yxati (`list[int | None]`), `word_labels` — asl so'zlarning NER yorliqlari (`list[int]`). Agar `word_ids` bo'sh ro'yxat bo'lsa `ValueError` ko'taring.\n2. Har bir `w_id` uchun:\n   - Agar `w_id is None` bo'lsa (maxsus token `[CLS]`, `[SEP]`), `ignore_index` (`-100`) qo'ying.\n   - Agar `w_id` oldingi tokendagi `prev_w_id` bilan bir xil bo'lsa (subword davomi `##...`), `ignore_index` (`-100`) qo'ying.\n   - Aks holda (yangi so'zning birinchi subword tokeni), `word_labels[w_id]` qiymatini qo'ying (agar `w_id < 0` yoki `w_id >= len(word_labels)` bo'lsa `ValueError` ko'taring).\n3. Hosil bo'lgan yorliqlar ro'yxatini (`list[int]`) qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def align_labels_with_tokens(word_ids, word_labels, ignore_index=-100):
    """
    NER vazifasida so'z yorliqlarini subword tokenlarga moslashtiradi (maxsus va davomiy subwordlarga -100 beradi).
    Qaytaradi: list[int]
    """
    # TODO: 1. word_ids bo'sh bo'lsa ValueError ko'taring
    # TODO: 2. w_id is None yoki w_id == prev_w_id bo'lganda ignore_index (-100) qo'shing
    # TODO: 3. Yangi so'z boshlanganda word_labels[w_id] ni qo'shing va ro'yxatni qaytaring
    raise NotImplementedError("align_labels_with_tokens funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`align_labels_with_tokens([None, 0, 1, 1, None], [3, 5])` -> `[-100, 3, 5, -100, -100]`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(word_ids, list) or len(word_ids) == 0: raise ValueError(...)`.",
        "2-maslahat: `prev_w_id = None` o'zgaruvchisini saqlab boring. Har qadamda `if w_id is None or w_id == prev_w_id: aligned.append(ignore_index)`.",
        "3-maslahat: `else:` blokida `if w_id < 0 or w_id >= len(word_labels): raise ValueError(...)` va `aligned.append(word_labels[w_id])`. Sikl oxirida `prev_w_id = w_id`.",
      ],
      testCases: [
        {
          id: "hf-ch07-test-1-subword-align",
          descriptionUz: "[CLS], 2-subwordli so'z va [SEP] uchun [-100, 3, 5, -100, -100] hosil bo'lishi",
          assertionCode:
            "align_labels_with_tokens([None, 0, 1, 1, None], [3, 5]) == [-100, 3, 5, -100, -100]",
        },
        {
          id: "hf-ch07-test-2-three-subwords",
          descriptionUz: "3 bo'lakka bo'lingan so'zning faqat 1-bo'lagiga label, qolgan 2 tasiga -100 berilishi",
          assertionCode:
            "align_labels_with_tokens([0, 0, 0], [7]) == [7, -100, -100]",
        },
        {
          id: "hf-ch07-test-3-valerr",
          descriptionUz: "Bo'sh word_ids yoki word_labels chegarasidan tashqari indeksda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(align_labels_with_tokens, [], [1]) and _expect_value_error(align_labels_with_tokens, [0, 5], [1])",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Subword Token va NER Label Alignment`,
      explanationUz:
        "`word_ids()` yordamida so'z darajasidagi NER teglarini subword tokenlar darajasiga ko'chirish.",
      input: "words = ['Alisher', 'Toshkentda'], word_labels = [1, 2]",
      code: `word_ids = [None, 0, 0, 1, 1, None]
word_labels = [1, 2]  # 1: B-PER, 2: B-LOC

aligned = []
prev = None
for wid in word_ids:
    if wid is None or wid == prev:
        aligned.append(-100)
    else:
        aligned.append(word_labels[wid])
    prev = wid

print("word_ids:      ", word_ids)
print("aligned_labels:", aligned)`,
      expectedOutput: `word_ids:       [None, 0, 0, 1, 1, None]
aligned_labels: [-100, 1, -100, 2, -100, -100]`,
      walkthrough: [
        "`[CLS]` va `[SEP]` tokenlari `None` bo'lgani uchun `-100` oldi.",
        "Har bir so'zning ikkinchi subword bo'lagi ham `-100` oldi, shunda loss funksiyasi ularni ikki marta jazolamaydi.",
      ],
      whyThisOutputUz:
        "PyTorch `nn.CrossEntropyLoss(ignore_index=-100)` standarti `-100` belgilangan pozitsiyalarni gradient hisobidan avtomatik chiqarib tashlaydi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — Cross-Entropy Loss va Perplexity`,
      explanationUz:
        "Til modelining (`CausalLM` yoki `MaskedLM`) cross-entropy yo'qotishidan Perplexity (`math.exp(loss)`) metrikasini hisoblash.",
      input: "val_loss_before = 3.2, val_loss_after = 1.8",
      code: `import math

ppl_before = round(math.exp(3.2), 2)
ppl_after = round(math.exp(1.8), 2)
print(f"Perplexity Before: {ppl_before} -> After Domain Adaptation: {ppl_after}")`,
      expectedOutput: `Perplexity Before: 24.53 -> After Domain Adaptation: 6.05`,
      walkthrough: [
        "Loss `3.2` dan `1.8` ga tushganda modelning keyingi tokenni topishdagi ikkilanishi (Perplexity) `24.53` dan `6.05` ga kamaydi.",
      ],
      whyThisOutputUz:
        "Perplexity qanchalik kichik bo'lsa, til modeli o'sha soha matnini shunchalik ishonchli bashorat qiladi.",
    }),
  },
  8: {
    domainSummaryUz:
      "Transformers va PyTorch pipeline'larini tizimli debugging qilish: Python traceback'ni pastdan yuqoriga o'qish, `CUDA error: device-side assert triggered` sabablarini CPU da aniqlash, `NaN` loss va `CUDA Out of Memory (OOM)` yechimlari hamda Minimal Reproducible Example (MRE) yozish.",
    coreFormulaOrRule:
      "\\text{Valid Token ID Invariant: } 0 \\le \\text{token\\_id} < V_{\\text{embedding}}, \\quad \\text{Valid Label: } y \\in [0, C-1] \\cup \\{-100\\}",
    productionTradeoffUz:
      "GPU da yuz beradigan asinxron `CUDA device-side assert` xatosi ko'pincha noto'g'ri qatorni ko'rsatadi. Modelni vaqtincha CPU ga o'tkazib (`device='cpu'`), bitta kichik dummy batch ustida `0 <= token_id < vocab_size` va `batch_size == len(labels)` invariantlarini tekshirish xatoni bir necha soniyada topib beradi.",
    exercise: {
      id: "hf-ch08-ex-debug-pipeline",
      titleUz:
        "Amaliy Mashq: diagnose_pipeline_issue(vocab_size, token_ids, batch_shape, label_count)",
      instructionsUz:
        "`diagnose_pipeline_issue(vocab_size, token_ids, batch_shape, label_count)` funksiyasini yozing.\n\nTalablar:\n1. Agar `vocab_size <= 0` yoki `not isinstance(batch_shape, (tuple, list))` yoki `len(batch_shape) != 2` bo'lsa `ValueError` ko'taring.\n2. Agar `token_ids` ichidagi birorta token `t < 0` yoki `t >= vocab_size` bo'lsa -> `'TOKEN_ID_OUT_OF_BOUNDS'` satrini qaytaring.\n3. Aks holda, agar `batch_shape[0] != label_count` bo'lsa -> `'BATCH_LABEL_SHAPE_MISMATCH'` satrini qaytaring.\n4. Barcha tekshiruvlar to'g'ri bo'lsa -> `'OK'` satrini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def diagnose_pipeline_issue(vocab_size, token_ids, batch_shape, label_count):
    """
    Training pipeline kirish tensorlarida eng ko'p uchraydigan 2 ta xatoni oldindan ushlaydi.
    Qaytaradi: 'TOKEN_ID_OUT_OF_BOUNDS' | 'BATCH_LABEL_SHAPE_MISMATCH' | 'OK'
    """
    # TODO: 1. vocab_size <= 0 yoki batch_shape uzunligi 2 bo'lmasa ValueError ko'taring
    # TODO: 2. token_ids ichida [0, vocab_size - 1] dan tashqari son borligini tekshiring
    # TODO: 3. batch_shape[0] != label_count ekanini tekshiring, hammasi joyida bo'lsa 'OK' qaytaring
    raise NotImplementedError("diagnose_pipeline_issue funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`diagnose_pipeline_issue(30522, [101, 35000, 102], (2, 16), 2)` -> `'TOKEN_ID_OUT_OF_BOUNDS'`.",
      hintsUz: [
        "1-maslahat: `if vocab_size <= 0 or not isinstance(batch_shape, (tuple, list)) or len(batch_shape) != 2: raise ValueError(...)`.",
        "2-maslahat: `if any(t < 0 or t >= vocab_size for t in token_ids): return 'TOKEN_ID_OUT_OF_BOUNDS'`.",
        "3-maslahat: `if batch_shape[0] != label_count: return 'BATCH_LABEL_SHAPE_MISMATCH'`, oxirida `return 'OK'`.",
      ],
      testCases: [
        {
          id: "hf-ch08-test-1-oob",
          descriptionUz: "Token ID vocab_size dan katta bo'lganda TOKEN_ID_OUT_OF_BOUNDS qaytishi",
          assertionCode:
            "diagnose_pipeline_issue(30522, [101, 35000, 102], (2, 16), 2) == 'TOKEN_ID_OUT_OF_BOUNDS'",
        },
        {
          id: "hf-ch08-test-2-shape-ok",
          descriptionUz: "Batch va label soni farq qilganda BATCH_LABEL_SHAPE_MISMATCH, mos kelganda OK qaytishi",
          assertionCode:
            "diagnose_pipeline_issue(30522, [101, 2054, 102], (4, 16), 2) == 'BATCH_LABEL_SHAPE_MISMATCH' and diagnose_pipeline_issue(30522, [101, 2054, 102], (4, 16), 4) == 'OK'",
        },
        {
          id: "hf-ch08-test-3-valerr",
          descriptionUz: "vocab_size <= 0 yoki noto'g'ri batch_shape da ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(diagnose_pipeline_issue, 0, [1], (2, 4), 2) and _expect_value_error(diagnose_pipeline_issue, 100, [1], (2,), 2)",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Embedding Va Label Chegaralarini Tekshirish`,
      explanationUz:
        "Maxsus token qo'shilgandan keyin `model.resize_token_embeddings(len(tokenizer))` unutilganda kelib chiqadigan xatoni CPU da ushlash.",
      input: "model_vocab_size = 30522, new_tokenizer_len = 30525",
      code: `model_vocab_size = 30522
input_ids = [101, 2054, 30524, 102]

oob_tokens = [t for t in input_ids if t >= model_vocab_size]
print("Out-of-bounds token IDs:", oob_tokens)
print("Fix: model.resize_token_embeddings(len(tokenizer))")`,
      expectedOutput: `Out-of-bounds token IDs: [30524]
Fix: model.resize_token_embeddings(len(tokenizer))`,
      walkthrough: [
        "`30524` ID modelning `30522` o'lchamli embedding jadvalidan tashqarida joylashgan.",
        "GPU da bu noaniq CUDA assert beradi, oddiy tekshiruv esa sababni darhol ko'rsatadi.",
      ],
      whyThisOutputUz:
        "Tokenizerga har safar yangi special token qo'shilganda modelning embedding matritsasini ham kengaytirish shart.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — Minimal Reproducible Example (MRE) va Secret Sanitizing`,
      explanationUz:
        "GitHub Issue yoki Hugging Face Forumga xato yuborishdan oldin API tokenlarni (`hf_...`) avtomatik tozalash.",
      input: "log_line = 'Auth header Bearer hf_AbCdEf1234567890 failed'",
      code: `import re

log_line = "Auth header Bearer hf_AbCdEf1234567890 failed on repo ai-atlas/test"
sanitized = re.sub(r"hf_[A-Za-z0-9]+", "hf_***REDACTED***", log_line)
print("Sanitized log:", sanitized)`,
      expectedOutput: `Sanitized log: Auth header Bearer hf_***REDACTED*** failed on repo ai-atlas/test`,
      walkthrough: [
        "Regulyar ifoda (`hf_[A-Za-z0-9]+`) barcha Hugging Face tokenlarini topib, xavfsiz `hf_***REDACTED***` matniga almashtirdi.",
      ],
      whyThisOutputUz:
        "Ochiq forum yoki GitHub issue'ga haqiqiy `HF_TOKEN` ni joylashtirish hisobingizdagi barcha repozitoriylarni xavf ostiga qo'yadi.",
    }),
  },
  9: {
    domainSummaryUz:
      "Gradio va Hugging Face Spaces: `gr.Interface(fn, inputs, outputs)` orqali ML modelni interaktiv veb-ilovaga aylantirish, `gr.Blocks()` bilan murakkab event/state arxitekturasi qurish, kiruvchi ma'lumotlarni validatsiya qilish va Hugging Face Spaces'ga deploy qilish.",
    coreFormulaOrRule:
      "\\text{Gradio App} = \\text{Input Components} \\xrightarrow{\\text{Validation}} \\text{Inference Function } f(x) \\xrightarrow{\\text{Formatting}} \\text{Output Components}",
    productionTradeoffUz:
      "Og'ir Transformer modelni Gradio callback funksiyasining (`def predict(text):`) ichida yuklash har bir foydalanuvchi so'rovida modelni diskdan qayta o'qishga va serverning qotib qolishiga olib keladi. Model global scope'da bir marta yuklanishi, callback ichida esa faqat validatsiya va tez inference bajarilishi shart.",
    exercise: {
      id: "hf-ch09-ex-gradio-handler",
      titleUz:
        "Amaliy Mashq: format_gradio_response(prompt, raw_score, threshold=0.5)",
      instructionsUz:
        "`format_gradio_response(prompt, raw_score, threshold=0.5)` funksiyasini yozing.\n\nTalablar:\n1. Agar `not isinstance(prompt, str)` yoki `len(prompt.strip()) == 0` bo'lsa `ValueError` ko'taring.\n2. Agar `raw_score < 0.0` yoki `raw_score > 1.0` yoki `threshold <= 0.0` yoki `threshold >= 1.0` bo'lsa `ValueError` ko'taring.\n3. `clean_text = prompt.strip()`, `label = 'POSITIVE' if raw_score >= threshold else 'NEGATIVE'`, va `score_pct = round(raw_score * 100, 1)` qiymatlarini hisoblang.\n4. `{'text': clean_text, 'label': label, 'score_pct': score_pct}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "starter",
      assessment: "deterministic",
      starterCode: `def format_gradio_response(prompt, raw_score, threshold=0.5):
    """
    Gradio demo interfeysi uchun foydalanuvchi kiritmasini tekshiradi va model javobini formatlaydi.
    Qaytaradi: {'text': str, 'label': str, 'score_pct': float}
    """
    # TODO: 1. Bo'sh prompt yoki [0, 1] dan tashqari raw_score uchun ValueError ko'taring
    # TODO: 2. threshold bo'yicha 'POSITIVE'/'NEGATIVE' va round(raw_score * 100, 1) ni qaytaring
    raise NotImplementedError("format_gradio_response funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`format_gradio_response('  Ajoyib model! ', 0.926)` -> `{'text': 'Ajoyib model!', 'label': 'POSITIVE', 'score_pct': 92.6}`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(prompt, str) or not prompt.strip(): raise ValueError(...)`.",
        "2-maslahat: `if raw_score < 0.0 or raw_score > 1.0 or threshold <= 0.0 or threshold >= 1.0: raise ValueError(...)`.",
        "3-maslahat: `label = 'POSITIVE' if raw_score >= threshold else 'NEGATIVE'` va `round(raw_score * 100, 1)`.",
      ],
      testCases: [
        {
          id: "hf-ch09-test-1-pos",
          descriptionUz: "Bo'shliqlarni tozalab POSITIVE va 92.6% qaytarish",
          assertionCode:
            "format_gradio_response('  Ajoyib model! ', 0.926) == {'text': 'Ajoyib model!', 'label': 'POSITIVE', 'score_pct': 92.6}",
        },
        {
          id: "hf-ch09-test-2-neg-custom-thresh",
          descriptionUz: "Maxsus threshold=0.8 berilganda 0.75 ball NEGATIVE deb baholanishi",
          assertionCode:
            "format_gradio_response('Test matn', 0.75, threshold=0.8) == {'text': 'Test matn', 'label': 'NEGATIVE', 'score_pct': 75.0}",
        },
        {
          id: "hf-ch09-test-3-valerr",
          descriptionUz: "Bo'sh satr yoki 1.0 dan katta ehtimollikda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(format_gradio_response, '   ', 0.5) and _expect_value_error(format_gradio_response, 'Salom', 1.5)",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Gradio Inference Callback va Input Validation`,
      explanationUz:
        "Foydalanuvchi bo'sh matn yuborganda modelni behuda ishga tushirmasdan tushunarli xabar qaytaruvchi Gradio handler.",
      input: "user_input = '  Oʻzbek tilidagi LLM demo  '",
      code: `def gradio_predict(user_input: str):
    clean = user_input.strip()
    if not clean:
        return {"error": "Iltimos, bo'sh bo'lmagan matn kiriting!"}
    return {"POSITIVE": 0.94, "NEGATIVE": 0.06}

print(gradio_predict("  O'zbek tilidagi LLM demo  "))`,
      expectedOutput: `{'POSITIVE': 0.94, 'NEGATIVE': 0.06}`,
      walkthrough: [
        "Gradio `gr.Label()` komponenti lug'at (`dict[str, float]`) qabul qilib, avtomatik ravishda chiroyli progress bar chizadi.",
      ],
      whyThisOutputUz:
        "To'g'ri formatlangan Python lug'ati Gradio UI komponentlari bilan qo'shimcha HTML/CSS yozmasdan bog'lanadi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — gr.Blocks Event va State Boshqaruvi`,
      explanationUz:
        "Ko'p qadamli suhbat (chatbot) demolarida `gr.State` orqali suhbat tarixini yangilash mantiqi.",
      input: "history = [('Salom', 'Assalomu alaykum!')], new_msg = 'LoRA nima?'",
      code: `history = [("Salom", "Assalomu alaykum!")]
new_msg = "LoRA nima?"
bot_reply = "LoRA — kam rangli adapter matritsalar orqali samarali fine-tuning usuli."

updated_history = history + [(new_msg, bot_reply)]
print("Turns count:", len(updated_history), "| Last turn:", updated_history[-1][0])`,
      expectedOutput: `Turns count: 2 | Last turn: LoRA nima?`,
      walkthrough: [
        "Har bir yangi xabar avvalgi `history` ro'yxatiga yangi `(user, assistant)` juftligi sifatida qo'shiladi.",
      ],
      whyThisOutputUz:
        "`gr.State()` har bir foydalanuvchi sessiyasining tarixini boshqa foydalanuvchilarga aralashtirmasdan alohida saqlaydi.",
    }),
  },
  10: {
    domainSummaryUz:
      "Argilla yordamida yuqori sifatli datasetlar yaratish (Data-Centric AI): annotatsiya sxemasi (`LabelQuestion`, `RatingQuestion`, `RankingQuestion`), ekspertlar o'rtasidagi kelishuv darajasi (Inter-Annotator Agreement), bahsli namunalarni tozalash va RLHF/DPO uchun Hugging Face Hub'ga eksport qilish.",
    coreFormulaOrRule:
      "p_o = \\frac{1}{N}\\sum_{i=1}^N \\mathbb{I}(y_i^{(A)} = y_i^{(B)}), \\quad \\kappa = \\frac{p_o - p_e}{1 - p_e}",
    productionTradeoffUz:
      "100,000 ta shovqinli va bir-biriga zid avtomatik yorliqlangan ma'lumotdan ko'ra, Argilla'da 2–3 nafar ekspert kelishuvi (`agreement >= 0.85`) bilan tekshirilgan 2,000 ta toza instruksiya namunasi SFT va DPO modellarida ancha yuqori sifat beradi.",
    exercise: {
      id: "hf-ch10-ex-annotator-agreement",
      titleUz: "Amaliy Mashq: compute_annotator_agreement(labels_a, labels_b)",
      instructionsUz:
        "`compute_annotator_agreement(labels_a, labels_b)` funksiyasini yozing.\n\nTalablar:\n1. `labels_a` va `labels_b` — bir xil uzunlikdagi bo'sh bo'lmagan ro'yxatlar bo'lishi shart (aks holda `ValueError` ko'taring).\n2. Ikkala annotator bir xil yorliq bergan indekslar ro'yxatini (`consensus_indices = [i for i in range(n) if labels_a[i] == labels_b[i]]`) toping.\n3. Kuzatilgan kelishuv ulushini (`agreement = round(len(consensus_indices) / len(labels_a), 4)`) hisoblang.\n4. `{'agreement': agreement, 'consensus_indices': consensus_indices}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def compute_annotator_agreement(labels_a, labels_b):
    """
    Ikki annotator yorliqlari o'rtasidagi kelishuv ulushini va mos tushgan indekslarni hisoblaydi.
    Qaytaradi: {'agreement': float, 'consensus_indices': list[int]}
    """
    # TODO: 1. Ro'yxatlar bo'sh emasligi va uzunliklari tengligini tekshiring (ValueError)
    # TODO: 2. Mos tushgan indekslarni va round(matches / n, 4) ni hisoblab qaytaring
    raise NotImplementedError("compute_annotator_agreement funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`compute_annotator_agreement(['POS', 'NEG', 'POS', 'NEU'], ['POS', 'NEG', 'NEU', 'NEU'])` -> `{'agreement': 0.75, 'consensus_indices': [0, 1, 3]}`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(labels_a, list) or not isinstance(labels_b, list) or len(labels_a) == 0 or len(labels_a) != len(labels_b): raise ValueError(...)`.",
        "2-maslahat: `consensus = [i for i in range(len(labels_a)) if labels_a[i] == labels_b[i]]`.",
        "3-maslahat: `return {'agreement': round(len(consensus) / len(labels_a), 4), 'consensus_indices': consensus}`.",
      ],
      testCases: [
        {
          id: "hf-ch10-test-1-agree",
          descriptionUz: "4 tadan 3 ta moslikda agreement=0.75 va [0, 1, 3] indekslar qaytishi",
          assertionCode:
            "compute_annotator_agreement(['POS', 'NEG', 'POS', 'NEU'], ['POS', 'NEG', 'NEU', 'NEU']) == {'agreement': 0.75, 'consensus_indices': [0, 1, 3]}",
        },
        {
          id: "hf-ch10-test-2-zero",
          descriptionUz: "Umuman mos kelmaganda agreement=0.0 va [] qaytishi",
          assertionCode:
            "compute_annotator_agreement([1, 2], [2, 1]) == {'agreement': 0.0, 'consensus_indices': []}",
        },
        {
          id: "hf-ch10-test-3-valerr",
          descriptionUz: "Bo'sh ro'yxat yoki har xil uzunlikda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(compute_annotator_agreement, [], []) and _expect_value_error(compute_annotator_agreement, [1, 2], [1])",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Annotatorlar Kelishuvi va Sifat Filtri`,
      explanationUz:
        "Argilla'dan eksport qilingan yozuvlardan faqat ikkala ekspert bir xil baho bergan ishonchli namunalarni ajratib olish.",
      input: "annotator_1 = ['good', 'bad', 'good'], annotator_2 = ['good', 'good', 'good']",
      code: `a1 = ["good", "bad", "good", "bad"]
a2 = ["good", "good", "good", "bad"]

agreed_idx = [i for i, (x, y) in enumerate(zip(a1, a2)) if x == y]
rate = len(agreed_idx) / len(a1)
print(f"Agreement rate: {rate:.2f} | Trusted sample indices: {agreed_idx}")`,
      expectedOutput: `Agreement rate: 0.75 | Trusted sample indices: [0, 2, 3]`,
      walkthrough: [
        "1-indeksdagi namunada ekspertlar ikki xil (`'bad'` vs `'good'`) fikr bildirgani uchun u qayta ko'rib chiqishga yuboriladi.",
        "`[0, 2, 3]` indekslardagi namunalar esa golden datasetga qo'shiladi.",
      ],
      whyThisOutputUz:
        "Annotatorlar kelishuvini o'lchash ko'rsatma (annotation guideline) qanchalik tushunarli yozilganini ham tekshiradi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — DPO / Preference Pair Yaratish`,
      explanationUz:
        "Inson annotatorlari bergan reyting asosida `(prompt, chosen, rejected)` juftligini shakllantirish.",
      input: "resp_a (rating=5), resp_b (rating=2)",
      code: `record = {
    "prompt": "Overfittingni qanday kamaytirish mumkin?",
    "candidates": [
        {"text": "Dropout, weight decay va ko'proq data orqali.", "rating": 5},
        {"text": "Learning rate ni 1000 ga qo'yish orqali.", "rating": 1},
    ],
}
sorted_c = sorted(record["candidates"], key=lambda c: c["rating"], reverse=True)
dpo_pair = {
    "prompt": record["prompt"],
    "chosen": sorted_c[0]["text"],
    "rejected": sorted_c[-1]["text"],
}
print("Chosen:", dpo_pair["chosen"])`,
      expectedOutput: `Chosen: Dropout, weight decay va ko'proq data orqali.`,
      walkthrough: [
        "Eng yuqori reyting olgan javob `chosen`, past reyting olgan javob esa `rejected` sifatida belgilandi.",
      ],
      whyThisOutputUz:
        "TRL `DPOTrainer` va `RewardTrainer` aynan shu `prompt / chosen / rejected` ustunlaridan foydalanadi.",
    }),
  },
  11: {
    domainSummaryUz:
      "Katta til modellarini Supervised Fine-Tuning (SFT) qilish: Instruction datasetlar, Chat Templates (`<|im_start|>role...<|im_end|>`) va maxsus EOS/BOS tokenlari, TRL `SFTTrainer`, LoRA / QLoRA (`r`, `lora_alpha`, `target_modules`) hamda fine-tuned modelni baseline bilan baholash.",
    coreFormulaOrRule:
      "W = W_0 + \\Delta W = W_0 + \\frac{\\alpha}{r} B A, \\quad N_{\\text{LoRA}} = r \\cdot (d_{\\text{in}} + d_{\\text{out}})",
    productionTradeoffUz:
      "Chat modelni SFT qilishda noto'g'ri Chat Template yoki noto'g'ri `eos_token` ishlatilsa, model javobni qachon to'xtatishni bilmay cheksiz matn generatsiya qiladi. Har doim modelning o'z `tokenizer.apply_chat_template()` metodidan foydalanish va loss'ni faqat `assistant` javoblarida hisoblash (`DataCollatorForCompletionOnlyLM`) zarur.",
    exercise: {
      id: "hf-ch11-ex-chatml-format",
      titleUz: "Amaliy Mashq: format_chatml_messages(messages)",
      instructionsUz:
        "`format_chatml_messages(messages)` funksiyasini yozing.\n\nTalablar:\n1. `messages` — bo'sh bo'lmagan lug'atlar ro'yxati (`list[dict]`). Agar `messages` bo'sh bo'lsa `ValueError` ko'taring.\n2. Har bir xabarda `'role'` (`'system'`, `'user'` yoki `'assistant'` — boshqa bo'lsa `ValueError`) va bo'sh bo'lmagan `'content'` satri bo'lishi shart (aks holda `ValueError` ko'taring).\n3. Har bir xabarni `\"<|im_start|>{role}\\n{content.strip()}<|im_end|>\\n\"` ko'rinishida formatlab, barchasini bitta satrga birlashtirib qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "core",
      assessment: "deterministic",
      starterCode: `def format_chatml_messages(messages):
    """
    Suhbat xabarlar ro'yxatini standart ChatML (<|im_start|>role\\ncontent<|im_end|>\\n) formatiga o'tkazadi.
    Qaytaradi: str
    """
    # TODO: 1. messages bo'sh emasligini, har bir role ('system', 'user', 'assistant') va content to'g'riligini tekshiring
    # TODO: 2. Har bir xabarni "<|im_start|>{role}\\n{content}<|im_end|>\\n" shablonida birlashtirib qaytaring
    raise NotImplementedError("format_chatml_messages funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`format_chatml_messages([{'role': 'user', 'content': 'Salom'}, {'role': 'assistant', 'content': 'Assalomu alaykum!'}])` -> `'<|im_start|>user\\nSalom<|im_end|>\\n<|im_start|>assistant\\nAssalomu alaykum!<|im_end|>\\n'`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(messages, list) or len(messages) == 0: raise ValueError(...)`.",
        "2-maslahat: `valid_roles = {'system', 'user', 'assistant'}`. Har bir `m` uchun `role = m.get('role')`, `content = m.get('content')` ni tekshiring.",
        "3-maslahat: `parts.append(f'<|im_start|>{role}\\n{content.strip()}<|im_end|>\\n')` va `''.join(parts)` qaytaring.",
      ],
      testCases: [
        {
          id: "hf-ch11-test-1-chatml",
          descriptionUz: "User va Assistant xabarlarini to'g'ri ChatML maxsus tokenlari bilan formatlash",
          assertionCode:
            "format_chatml_messages([{'role': 'user', 'content': 'Salom'}, {'role': 'assistant', 'content': 'Assalomu alaykum!'}]) == '<|im_start|>user\\nSalom<|im_end|>\\n<|im_start|>assistant\\nAssalomu alaykum!<|im_end|>\\n'",
        },
        {
          id: "hf-ch11-test-2-system",
          descriptionUz: "System rolini ham o'z ichiga olgan 3 qadamli suhbatni to'g'ri formatlash",
          assertionCode:
            "format_chatml_messages([{'role': 'system', 'content': 'AI yordamchi'}, {'role': 'user', 'content': 'Savol'}]).startswith('<|im_start|>system\\nAI yordamchi<|im_end|>\\n')",
        },
        {
          id: "hf-ch11-test-3-valerr",
          descriptionUz: "Bo'sh ro'yxat, noto'g'ri rol yoki bo'sh content berilganda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(format_chatml_messages, []) and _expect_value_error(format_chatml_messages, [{'role': 'hacker', 'content': 'hi'}]) and _expect_value_error(format_chatml_messages, [{'role': 'user', 'content': '   '}])",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — ChatML Shablon va Special Tokens`,
      explanationUz:
        "Suhbat xabarlarini model tushunadigan `<|im_start|>` va `<|im_end|>` chegara tokenlari bilan bitta ketma-ketlikka yig'ish.",
      input: "messages = [{'role': 'user', 'content': 'LoRA nima?'}]",
      code: `messages = [
    {"role": "system", "content": "Siz o'zbek tilidagi AI ustozsiz."},
    {"role": "user", "content": "LoRA nima?"},
]
formatted = "".join(
    f"<|im_start|>{m['role']}\\n{m['content']}<|im_end|>\\n" for m in messages
) + "<|im_start|>assistant\\n"
print(formatted)`,
      expectedOutput: `<|im_start|>system
Siz o'zbek tilidagi AI ustozsiz.<|im_end|>
<|im_start|>user
LoRA nima?<|im_end|>
<|im_start|>assistant`,
      walkthrough: [
        "Oxiriga `<|im_start|>assistant\\n` (`add_generation_prompt=True`) qo'shilishi modelga javob yozish navbati kelganini bildiradi.",
      ],
      whyThisOutputUz:
        "`tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)` aynan shu strukturani avtomatik quradi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — QLoRA 4-Bit VRAM Xotira Tejamkorligi`,
      explanationUz:
        "7B parametrli LLMni FP16 (16-bit) va QLoRA NF4 (4-bit) formatlarida o'qitish uchun kerak bo'ladigan og'irlik xotirasini solishtirish.",
      input: "params_billions = 7.0",
      code: `params_b = 7.0
fp16_weights_gb = params_b * 2.0      # 2 bytes per parameter
nf4_weights_gb = params_b * 0.55      # ~0.55 bytes per parameter with quantization metadata
lora_adapters_gb = 0.15               # trainable fp16 adapters
print(f"FP16 weights: {fp16_weights_gb:.1f} GB | QLoRA 4-bit + Adapters: {nf4_weights_gb + lora_adapters_gb:.1f} GB")`,
      expectedOutput: `FP16 weights: 14.0 GB | QLoRA 4-bit + Adapters: 4.0 GB`,
      walkthrough: [
        "To'liq FP16 og'irliklarning o'zi 14 GB joy oladi (optimizer states bilan >56 GB).",
        "QLoRA 4-bit NF4 esa baza og'irliklarini ~4 GB ga tushirib, 7B modelni bitta 16 GB T4 GPU da o'qitish imkonini beradi.",
      ],
      whyThisOutputUz:
        "PEFT + bitsandbytes (`load_in_4bit=True`) va Unsloth zamonaviy LLM fine-tuning'ni oddiy GPU larda ham ochiq qiladi.",
    }),
  },
  12: {
    domainSummaryUz:
      "Fikrlovchi (Reasoning) modellarni o'qitish — Open R1 va DeepSeek-R1: `<think>...</think>` fikrlash zanjiri, qoidaga asoslangan tekshiriluvchi mukofotlar (Verifiable Format & Accuracy Rewards), 'Aha moment' (o'z-o'zini tekshirish xulq-atvori), GRPO (Group Relative Policy Optimization), TRL `GRPOTrainer` va Unsloth optimizatsiyasi.",
    coreFormulaOrRule:
      "A_i = \\frac{r_i - \\text{mean}(r_1, \\dots, r_G)}{\\text{std}(r_1, \\dots, r_G) + \\epsilon}, \\quad \\mathcal{J}_{\\text{GRPO}}(\\theta) = \\frac{1}{G}\\sum_{i=1}^G \\min\\left(\\rho_i A_i, \\text{clip}(\\rho_i, 1-\\epsilon, 1+\\epsilon)A_i\\right) - \\beta \\mathbb{D}_{\\text{KL}}(\\pi_\\theta \\| \\pi_{\\text{ref}})",
    productionTradeoffUz:
      "Neyron Reward Model (RM) ishlatilganda LLM 'reward hacking' qilib RMni aldashni o'rganib oladi va Critic modeli VRAMni ikki barobar ko'p yeydi. Matematika va dasturlashda deterministik tekshiriluvchi mukofot (`format_reward + accuracy_reward`) hamda Critic-free GRPO algoritmi xotirani 50% gacha tejab, barqaror reasoning o'rgatadi.",
    exercise: {
      id: "hf-ch12-ex-reasoning-reward",
      titleUz:
        "Amaliy Mashq: score_reasoning_completion(response_text, expected_answer)",
      instructionsUz:
        "`score_reasoning_completion(response_text, expected_answer)` funksiyasini yozing.\n\nTalablar:\n1. Agar `not isinstance(response_text, str)` yoki `not isinstance(expected_answer, str)` yoki `len(expected_answer.strip()) == 0` bo'lsa `ValueError` ko'taring.\n2. Format mukofotini (`format_reward`) hisoblang:\n   - Agar `'<think>'` va `'</think>'` teglari `response_text` ichida mavjud bo'lib, `response_text.find('<think>') < response_text.find('</think>')` bo'lsa -> `format_reward = 0.5`, aks holda `0.0`.\n3. Aniqlik mukofotini (`accuracy_reward`) hisoblang:\n   - Agar `format_reward == 0.5` bo'lsa, `</think>` tegidan keyingi yakuniy javob qismida `expected_answer.strip()` uchrasa -> `accuracy_reward = 1.0`, aks holda `0.0`.\n   - Agar `'</think>'` bo'lmasa, butun `response_text` ichida `expected_answer.strip()` uchrasa `1.0`, aks holda `0.0`.\n4. `{'format_reward': format_reward, 'accuracy_reward': accuracy_reward, 'total_reward': format_reward + accuracy_reward}` lug'atini qaytaring.",
      language: "python",
      runtime: "pyodide",
      difficulty: "challenge",
      assessment: "deterministic",
      starterCode: `def score_reasoning_completion(response_text, expected_answer):
    """
    Open R1 / GRPO uchun <think>...</think> format mukofoti (0.5) va to'g'ri javob mukofotini (1.0) hisoblaydi.
    Qaytaradi: {'format_reward': float, 'accuracy_reward': float, 'total_reward': float}
    """
    # TODO: 1. response_text va expected_answer to'g'ri satr ekanini tekshiring (bo'sh expected_answer bo'lsa ValueError)
    # TODO: 2. '<think>' va '</think>' tartibini tekshirib format_reward (0.5 yoki 0.0) bering
    # TODO: 3. Yakuniy javob qismida expected_answer.strip() borligini tekshirib accuracy_reward (1.0 yoki 0.0) bering
    raise NotImplementedError("score_reasoning_completion funksiyasini yozing")
`,
      expectedBehaviorUz:
        "`score_reasoning_completion('<think>2 + 2 = 4</think>Javob: 4', '4')` -> `{'format_reward': 0.5, 'accuracy_reward': 1.0, 'total_reward': 1.5}`.",
      hintsUz: [
        "1-maslahat: `if not isinstance(response_text, str) or not isinstance(expected_answer, str) or not expected_answer.strip(): raise ValueError(...)`.",
        "2-maslahat: `t_start = response_text.find('<think>')`, `t_end = response_text.find('</think>')`. Agar `t_start != -1 and t_end != -1 and t_start < t_end:` bo'lsa `fmt = 0.5` va `tail = response_text[t_end + len('</think>'):]`.",
        "3-maslahat: Aks holda `fmt = 0.0` va `tail = response_text`. Keyin `acc = 1.0 if expected_answer.strip() in tail else 0.0`.",
      ],
      testCases: [
        {
          id: "hf-ch12-test-1-full-reward",
          descriptionUz: "<think>...</think> formati va to'g'ri yakuniy javob uchun 1.5 ball qaytishi",
          assertionCode:
            "score_reasoning_completion('<think>15 * 3 = 45</think>Yakuniy javob: 45', '45') == {'format_reward': 0.5, 'accuracy_reward': 1.0, 'total_reward': 1.5}",
        },
        {
          id: "hf-ch12-test-2-partial",
          descriptionUz: "Format to'g'ri ammo javob xato bo'lsa 0.5, format yo'q ammo javob to'g'ri bo'lsa 1.0 qaytishi",
          assertionCode:
            "score_reasoning_completion('<think>Hisoblaymiz...</think>Javob: 99', '45') == {'format_reward': 0.5, 'accuracy_reward': 0.0, 'total_reward': 0.5} and score_reasoning_completion('Javob: 45', '45') == {'format_reward': 0.0, 'accuracy_reward': 1.0, 'total_reward': 1.0}",
        },
        {
          id: "hf-ch12-test-3-valerr",
          descriptionUz: "Bo'sh expected_answer berilganda ValueError ko'tarilishi",
          assertionCode:
            "_expect_value_error(score_reasoning_completion, '<think>a</think>b', '') and _expect_value_error(score_reasoning_completion, '<think>a</think>b', '   ')",
        },
      ],
    },
    buildExample1: (lesson) => ({
      titleUz: `1-misol: ${lesson.title} — Rule-Based Format va Accuracy Reward`,
      explanationUz:
        "DeepSeek-R1 va Open R1 da neyron reward model o'rniga deterministik `<think>...</think>` format va javob tekshiruvchi funksiya yozish.",
      input: "completion = '<think>3x = 12 => x = 4</think>Javob: 4', target = '4'",
      code: `completion = "<think>3x = 12 => x = 4</think>Javob: 4"
target = "4"

has_think = "<think>" in completion and "</think>" in completion
after_think = completion.split("</think>")[-1] if has_think else completion
fmt_r = 0.5 if has_think else 0.0
acc_r = 1.0 if target in after_think else 0.0
print(f"Format: {fmt_r} | Accuracy: {acc_r} | Total Reward: {fmt_r + acc_r}")`,
      expectedOutput: `Format: 0.5 | Accuracy: 1.0 | Total Reward: 1.5`,
      walkthrough: [
        "Model fikrlash jarayonini `<think>...</think>` ichiga olgani uchun `+0.5` format mukofoti oldi.",
        "`</think>` dan keyingi yakuniy xulosada to'g'ri `'4'` javobi turgani uchun `+1.0` aniqlik mukofoti oldi.",
      ],
      whyThisOutputUz:
        "Bunday deterministik mukofot funksiyasi reward hacking'ga yo'l qo'ymaydi va modelda o'z-o'zini tekshirish ('Aha moment') qobiliyatini uyg'otadi.",
    }),
    buildExample2: (lesson) => ({
      titleUz: `2-misol: ${lesson.sourceSection} — GRPO Group Rollout va Advantage`,
      explanationUz:
        "Bitta savolga generatsiya qilingan $G=4$ ta javobning mukofotlaridan Critic tarmog'isiz relative advantage hisoblash.",
      input: "group_rewards = [1.5, 0.5, 1.5, 0.5]",
      code: `import math

rewards = [1.5, 0.5, 1.5, 0.5]
mean_r = sum(rewards) / len(rewards)
std_r = math.sqrt(sum((r - mean_r) ** 2 for r in rewards) / len(rewards))
advantages = [round((r - mean_r) / std_r, 4) for r in rewards]
print("Mean reward:", mean_r, "| Group Advantages:", advantages)`,
      expectedOutput: `Mean reward: 1.0 | Group Advantages: [1.0, -1.0, 1.0, -1.0]`,
      walkthrough: [
        "To'liq to'g'ri (`1.5`) javoblar `+1.0` musbat gradient signali, faqat formati to'g'ri (`0.5`) javoblar esa `-1.0` signal oldi.",
      ],
      whyThisOutputUz:
        "GRPO har bir savolning murakkabligiga avtomatik moslashadi va alohida Value/Critic model saqlash zaruratini yo'qotadi.",
    }),
  },
};

export function buildPublishedHfLessonContent(
  rawLesson: RawHfLessonInput,
  phase: RawHfPhaseInput,
  canonicalMatch: HfCanonicalMatch
): HfPublishedLessonPayload {
  const chNum = phase.sourceChapter;
  const blueprint = CHAPTER_BLUEPRINTS[chNum] ?? CHAPTER_BLUEPRINTS[1]!;
  const isFutureSectionNote =
    rawLesson.id === "hf-12-08-01" ||
    rawLesson.title.toLowerCase().includes("not yet available");

  const canonicalNote =
    canonicalMatch.existingLessonId !== null
      ? `Ushbu dars AI Atlas'dagi kanonik \`${canonicalMatch.existingLessonId}\` (${canonicalMatch.existingTrack}) darsi bilan o'quv natijasi bo'yicha bog'langan.`
      : `Ushbu dars Hugging Face LLM Course ${chNum}-bobining ("${phase.title}") "${rawLesson.sourceSection}" bo'limiga mansub amaliy mikro-darsdir.`;

  const futureSynthesisBanner = isFutureSectionNote
    ? "Eslatma: Rasmiy Hugging Face kursining 12-bob 8-bo'limi ('Coming soon') ochiq kengaytma bo'limi hisoblanadi. AI Atlas'da ushbu yakuniy dars Open R1 va GRPO bo'yicha olingan barcha bilimlarni birlashtiruvchi yakuniy sintez va mustaqil tekshiruv amaliyoti sifatida to'liq nashr etildi. "
    : "";

  const ex1 = blueprint.buildExample1(rawLesson);
  const ex2 = blueprint.buildExample2(rawLesson);

  return {
    whyItMattersUz: `${futureSynthesisBanner}${rawLesson.objective} ${blueprint.domainSummaryUz} ${canonicalNote}`,
    atomicConceptUz: `${phase.title} (${rawLesson.sourceSection}) — "${rawLesson.title}": ${rawLesson.objective}`,
    prerequisitesUz: [
      chNum === 0
        ? "Asosiy kompyuter va terminal / brauzer savodxonligi"
        : `Hugging Face LLM Course ${chNum - 1}-bob asosiy tushunchalari`,
      `Bo'lim konteksti: ${rawLesson.sourceSection} (${rawLesson.id})`,
    ],
    depths: {
      overview: {
        titleUz: `Level 1 — Overview: ${rawLesson.title} Nima va Nega Kerak?`,
        bodyUz: `${futureSynthesisBanner}**${rawLesson.title}** mavzusi **${phase.title}** bobining *"${rawLesson.sourceSection}"* bo'limidagi ${rawLesson.order}-mikro-dars hisoblanadi.\n\n**Asosiy maqsad:** ${rawLesson.objective}\n\n**Kontekst va amaliy ahamiyati:** ${blueprint.domainSummaryUz} Ushbu bosqichda biz tushunchaning asosiy g'oyasini, kiruvchi ma'lumot qanday qabul qilinib, qanday natijaga aylanishini aniq mental model orqali o'zlashtiramiz.`,
        keyFormulaOrRule: blueprint.coreFormulaOrRule,
      },
      understand: {
        titleUz: `Level 2 — Understand: ${rawLesson.title} Mexanizmi va Algoritmik Oqimi`,
        bodyUz: `**Texnik mexanizm (${rawLesson.sourceSection}):**\n1. **Kirish va shartlar:** \`${rawLesson.title}\` bosqichida kiruvchi ma'lumotlar tiplari, o'lchamlari va chegaraviy shartlari tekshiriladi.\n2. **Asosiy qayta ishlash:** ${blueprint.domainSummaryUz}\n3. **Bob loyihasi bilan bog'liqligi:** Ushbu mikro-dars bobning yakuniy amaliy maqsadi — *"${phase.chapterProject}"* — ni qurishda bevosita poydevor vazifasini bajaradi.`,
        keyFormulaOrRule: blueprint.coreFormulaOrRule,
        codeOrTrace: `${rawLesson.id} (${rawLesson.slug}) -> Section: ${rawLesson.sourceSection} -> Verified Output & Deterministic Check`,
      },
      master: {
        titleUz: `Level 3 — Master: ProductionArxitektura, Trade-off va Chegaraviy Holatlar`,
        bodyUz: `**Production muhandislik tahlili:**\n${blueprint.productionTradeoffUz}\n\n**Xavfsizlik va sifat nazorati:** \`${rawLesson.title}\` komponentini real tizimga (API, training pipeline yoki baholash skriptiga) ulashda bo'sh kirishlar, manfiy indekslar, mos kelmaydigan tensor/ro'yxat uzunliklari hamda resurs cheklovlari (\`ValueError\` va fallback mexanizmlari) qat'iy tekshirilishi shart.`,
        keyFormulaOrRule:
          "Har bir kiruvchi parametrni validatsiya qilish -> deterministik hisoblash -> avtomatlashtirilgan testlar bilan tasdiqlash.",
      },
    },
    example1: {
      id: `${rawLesson.id}-ex1`,
      titleUz: ex1.titleUz,
      explanationUz: ex1.explanationUz,
      input: ex1.input,
      code: ex1.code,
      expectedOutput: ex1.expectedOutput,
      walkthrough: ex1.walkthrough,
      whyThisOutputUz: ex1.whyThisOutputUz,
    },
    example2: {
      id: `${rawLesson.id}-ex2`,
      titleUz: ex2.titleUz,
      explanationUz: ex2.explanationUz,
      input: ex2.input,
      code: ex2.code,
      expectedOutput: ex2.expectedOutput,
      walkthrough: ex2.walkthrough,
      whyThisOutputUz: ex2.whyThisOutputUz,
    },
    visualizationId: "token-padding-lab",
    manimMeta: {
      scriptPath: "examples/manim/token_padding.py",
      sceneName: "TokenPaddingScene",
      renderCommand:
        "manim -pqh examples/manim/token_padding.py TokenPaddingScene",
      videoRendered: false,
      conceptNoteUz: `Interaktiv vizual laboratoriya va Manim sahna kodi (${rawLesson.id}: ${rawLesson.title}). Quyidagi interaktiv laboratoriyada batch, token va maska parametrlarini jonli sinab ko'rishingiz mumkin.`,
    },
    exercise: {
      ...blueprint.exercise,
      id: `${rawLesson.id}-${blueprint.exercise.id}`,
      titleUz: `${rawLesson.title} — ${blueprint.exercise.titleUz}`,
    },
    quiz: [
      {
        id: `${rawLesson.id}-q1`,
        promptUz: `1. "${rawLesson.title}" (${rawLesson.sourceSection}) darsining asosiy amaliy vazifasi nimadan iborat?`,
        options: [
          "Model og'irliklarini tasodifiy sonlar bilan o'chirib yuborish",
          `${rawLesson.objective}`,
          "Faqat HTML va CSS dizaynini o'zgartirish",
          "Hech qanday tekshiruvsiz xom matnni diskdan o'chirish",
        ],
        correctIndex: 1,
        explanationUz: `To'g'ri! "${rawLesson.title}" darsining maqsadi: ${rawLesson.objective}`,
      },
      {
        id: `${rawLesson.id}-q2`,
        promptUz: `2. ${phase.title} bobida muhandislik va production samaradorligi uchun qaysi qoida eng muhim hisoblanadi?`,
        options: [
          "Kiruvchi ma'lumotlarni tekshirmasdan to'g'ridan-to'g'ri GPU ga yuborish",
          `${blueprint.productionTradeoffUz}`,
          "Har doim faqat eng katta 70B modelni CPU da ishlatish",
          "Xatolik yuz berganda traceback'ni o'qimasdan kodni qayta ishga tushirish",
        ],
        correctIndex: 1,
        explanationUz: blueprint.productionTradeoffUz,
      },
      {
        id: `${rawLesson.id}-q3`,
        promptUz: `3. Quyidagi amaliy mashq funksiyasida noto'g'ri yoki manfiy chegara qiymatlari berilganda dastur qanday xulq-atvor ko'rsatishi shart?`,
        options: [
          "Noto'g'ri javobni jim qaytarib ketishi kerak",
          "Aniq ValueError istisnosini (exception) ko'tarib, xato ma'lumot keyingi bosqichga o'tib ketishini to'xtatishi shart",
          "Cheksiz siklga tushib qolishi kerak",
          "Barcha testlarni o'chirib qo'yishi kerak",
        ],
        correctIndex: 1,
        explanationUz:
          "Fail-fast tamoyiliga ko'ra, yaroqsiz kirish parametrlarida darhol `ValueError` ko'tarish ML/LLM pipeline'ni yashirin xatolardan himoya qiladi.",
      },
    ],
  };
}
