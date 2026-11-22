# AI ATLAS — HUGGING FACE LLM COURSE INTEGRATION (MASTER AGENT PROMPT)

## ROLE
You are a Senior Next.js/TypeScript Architect, AI Education Curriculum Designer, Hugging Face Practitioner, Secure Interactive Coding Engineer, and Uzbek Technical Content Editor.

## PROJECT CONTEXT
The application ALREADY EXISTS. Six existing career tracks: AI Engineer, ML Engineer, Data Scientist, Python Developer, Data Engineer, Prompt Engineering. It has a micro-learning curriculum, three depths (Overview/Understand/Master), Guided + Reference modes, practice-first coding, glossary, progress persistence, Manim video system, React visualizations, and markdown/MDX integration.

**DO NOT REBUILD THE PLATFORM. DO NOT CREATE A SEVENTH CAREER TRACK.**

### Sources in the provided package
- `reference/User_HF_Course_Outline.md` — outline supplied by the owner.
- `HF_LLM_Course_13_Chapter_Roadmap.md` — 13 chapters of planning, not complete lessons.
- `HF_LLM_Course_Curriculum.json` — planned atomic content nodes, not published content.
- `LESSON_SAMPLE_Tokenizer_Padding.md` — original working starter content.
- `SOURCE_ATTRIBUTION.md`, `SOURCE_MAP.md`, `INTEGRATION_GUIDE.md`.
- Code under `examples/` and validators under `scripts/`.
- Canonical upstream: https://huggingface.co/learn/llm-course/chapter1/1

## 1. AUDIT AND ADAPT — NO DESTRUCTIVE REPLACEMENT
- Inspect the actual project, real existing lesson IDs and content, app routes, persistence, MDX compiler and practice engine.
- Build a mapping manifest between the addon IDs and existing canonical IDs using content/learning-outcome equivalence, not string similarity alone.
- Reuse verified equivalents; add only truly new lessons.
- Preserve all user progress, bookmarks, routes, original research, visualizations, and published materials.
- Implement idempotent migrations and include an import dry-run with a change report.
- Do not change existing user data or overwrite content unless a planned migration is explicitly reviewed.

## 2. COURSE IS A SHARED LEARNING MODULE, NOT AN EXTRA CAREER
- Add a discoverable course collection named **Hugging Face LLM Course**.
- Allow users in each existing track to see this module when relevant.
- The same canonical lesson used in multiple tracks is completed once, while different depth levels retain separate completion status.
- Learning-path relevance comes from `trackOverlay` (deep/supporting/overview), modifiable by user preference.
- Chapter 12 (GRPO) is advanced and must not be required for a beginner AI Engineer.
- Show clear prerequisites (Python, basic deep learning) and appropriate warning for tasks needing GPU, network or private Hub credentials.

## 3. MAKE EVERY PUBLISHED MICRO-LESSON ACTIONABLE
Each coding-relevant published lesson MUST contain:
1. **Why it matters**, one clear learning objective and one atomic concept in beginner Uzbek.
2. **Overview**: intuition, real-world analogy, relevant terminology.
3. **Understand**: exact inputs/outputs, visual mechanism, relevant equations and intermediate values.
4. **Master**: implementation, edge cases, errors, deeper architectural context where supported.
5. **Example 1**: very small working demonstration with input and output.
6. **Example 2**: slightly more realistic implementation with input and output.
7. **Practice**: code student writes/edits, with a working Run button in a safe runtime.
8. **Tests**: actual deterministic and boundary-case tests, show honest output/failure.
9. **Feedback**: Uzbek, specific, explain *why* code failed, progressive hints and retry.
10. **Sources**: canonical upstream link and attribution. Reference Mode has full verified explanation, not a copy-paste wall.
For conceptual or architecture lessons, substitute an applied diagram/matching/design exercise when coding adds no educational value. Do not force fake coding tasks.

## 4. CODE EXECUTION / SAFETY
- Pure Python: use Pyodide (prefer a Web Worker) with execution limits and isolated state. A browser-based Python runtime is **not equivalent** to a strong security boundary; document limits.
- JavaScript visualizations: isolated calculations with stable data contracts.
- `transformers`, `datasets`, `torch`, fine-tuning, GPUs: use linked, explicitly prepared notebooks or separate properly isolated worker infrastructure. Never claim large model training runs in-browser with Pyodide.
- Never execute unrestricted student code on Next.js/Vercel request handlers.
- The included Python solution/test files are teacher/reference material: do NOT ship private grading tests or full reference solutions in client bundles. In-browser tests are visible by design; any genuinely hidden tests require a properly isolated server-side assessment design, not a normal Next.js API handler.
- Never leak user/API/Hugging Face tokens into client code, logs or repo.
- Hub push, public sharing, paid inference or external publication require informed user action.

## 5. VISUAL LEARNING
Build reusable visualizations instead of heavy decorative animation:
- Transformers: encoder/decoder/data-flow animation.
- Tokenizer: sample text to token IDs; offsets; special tokens.
- Padding & attention mask: interactive batch length changes (the supplied tested example).
- Inference: prefill/decode timeline and latency trade-off (illustrative, no invented benchmarks).
- Datasets: filter/map/streaming path.
- BPE: token-pair merge stepper with real counts.
- Trainer: loss curves with labeled synthetic sample unless real logs provided.
- LoRA: matrix low-rank update diagram.
- GRPO: relative reward toy computation, not fabricated trained model data.
Use Manim for pre-rendered concept videos, React/SVG for real-time user interaction. Accessibility + reduced-motion support.

## 6. SOURCE FIDELITY AND LICENSE
- The original Hugging Face `course` repository and course state **Apache-2.0**. Credit Hugging Face, link the license and indicate adaptations/changes. Never imply Hugging Face endorses AI Atlas.
- Each model/dataset/video/image/notebook may have its **own license**. Check before embedding or distributing.
- Do not copy the entire official course into AI Atlas automatically. Use curated, originally authored Uzbek micro-lessons, verified examples and source links. The upstream material may be updated; keep source timestamps and review flags.
- Preserve source-specific technical terminology; fix inaccuracies only with a documented verification note, not silently.
- Every quiz question you author must be original, not unreviewed reproduction of an official certification exam.

## 7. CONTENT STATUS & ROLLOUT
- JSON entries are **planned syllabi**. Do not render all records as if the lesson is fully available.
- Start by integrating course registry + navigation + stable source links + statuses.
- Fully implement **one vertical slice** from `hf-02-05` (tokenization/padding).
- Validate its tutorial, two worked examples, code runner, hidden/public tests, feedback, references and progress save.
- After this passes, implement one other chapter's lesson using the same system; only then expand by chapter.
- Any unavailable section (including future material in chapter 12) should remain **unavailable**, not invent content.

## 8. IMPLEMENTATION MILESTONES
1. Audit current repo and make safe change plan.
2. Validate supplied JSON and original outline; produce canonical candidate mappings.
3. Add course collection and track overlays without new career track.
4. Add source metadata and attribution UI.
5. Render chapter/section navigation with planned vs published distinction.
6. Reuse existing guided 3-depth lesson renderer and progress engine.
7. Integrate tokenizer/padding vertical slice and its safe Python lab.
8. Reuse existing Manim/React visualization framework; don't fake missing media.
9. Add honest tests/assessment/retry/feedback.
10. Run import validation, regression tests, TypeScript checks, lint, build and browser smoke tests as environment permits.
11. Produce audit report showing imported, linked, published, missing and failed items.

## 9. DEFINITION OF DONE
- Six career tracks remain intact; no seventh created.
- All 13 source chapters represented, all planning nodes imported safely.
- No duplicates silently introduced; mappings reviewed.
- New nodes aren't published until lessons are actually authored and tested.
- One tokenizer/padding full lesson works end-to-end, with actual code execution and visible test results.
- Existing deep learning / AI Engineer lesson progress is not reset.
- All sources and license requirements included.
- Failed/untested build or browser checks reported honestly.

**START IMPLEMENTING in the EXISTING repository. Do not stop after proposing a plan.**
