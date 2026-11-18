# AI LEARNING PLATFORM — PRACTICE-FIRST LEARNING ENGINE

## ROLE
You are a Senior Learning Experience Architect, Full-Stack Next.js Engineer, Secure Code Execution Engineer, Curriculum Designer, and Educational Assessment Engineer.

## PROJECT CONTEXT
I already have a working AI Learning Platform with **six existing learning paths**:
1. AI Engineer
2. Machine Learning Engineer
3. Data Scientist
4. Python Developer
5. Data Engineer
6. Prompt Engineering

It already includes or plans a curriculum registry, micro-lessons, three depth levels (Overview / Understand / Master), Guided / Reference modes, a glossary, learning progress, MDX content, interactive React visualizations, and Manim videos.

**Your task is to extend the EXISTING product, not rebuild it.** Audit the real repository before making changes. Reuse existing components, canonical lesson IDs, content, visualizations, progress keys, styling, and navigation. Do not add new unrelated learning paths or change the syllabus.

## 1. CORE PRODUCT RULE
**Every PUBLISHED lesson must lead to active practice, not just reading.**

Default flow:
**Theory → Example 1 → Example 2 → Write/modify code → Run → Check → Explain feedback → Next lesson.**

- Theory: explain ONE small concept at a time in beginner-friendly Uzbek, retaining technical English terms.
- Example 1: extremely simple, with input, output, and a step-by-step explanation.
- Example 2: a slightly more realistic example that uses that same concept; when a second example adds no educational value, document the reason and keep at least one high-quality example.
- Practical task: the learner must write or modify code, not merely click “complete” or watch an animation. Design a meaningful coding task for every coding-relevant lesson.
- For ethics, safety, architecture, or other primarily conceptual lessons, provide a realistic applied exercise; include a small code-based check or inspection task when it meaningfully reinforces the objective. **Do not invent pointless code exercises** to satisfy a quota.
- Run: actually execute supported code in a safe environment.
- Check: provide deterministic assertions/tests for deterministic tasks; use explicit rubrics or human review for subjective tasks.
- Feedback: describe what failed and why, with precise but non-spoiler guidance.
- Next: unlock/offer the following recommended lesson after the required evidence of completion; students may freely explore other lessons.

Do not show fabricated evaluations, test results, learning achievements, model outputs, or simulation results as though they were real.

## 2. USER EXPERIENCE — ONE CLEAR NEXT ACTION
**Onboarding:** user selects an existing path and experience level; preserve selections and progress across sessions. Offer “Continue learning” for returning learners.

**Default Guided lesson layout:**
1. Breadcrumb: Path / Phase / Lesson.
2. Lesson title, one-line goal, and progress through current steps.
3. **Step A: Explanation**, with one visualization when useful.
4. **Step B: Example 1** with annotated code + exact expected output.
5. **Step C: Example 2** with one extra real-world complication + exact expected output.
6. **Step D: Your turn**: real code editor and a clear task description.
7. **Step E: Run & Check**: actual output, test status, helpful feedback.
8. **Step F: Review & Next**: short recap and next lesson.

The current step should be the primary focus. Avoid displaying every panel at once. Keep one primary CTA at a time. Make earlier steps revisitable. Advanced detail and full original research must remain available in Reference mode.

UX copy in Uzbek, e.g., “Misolni ko‘rish”, “Kod yozish”, “Ishga tushirish”, “Tekshirish”, “Maslahat”, “Nega xato?”, “Keyingi dars”.

## 3. PER-LESSON CONTENT CONTRACT
Create validated typed data (extend existing schemas, do not replace them blindly). Example fields:

```ts
type PracticeLanguage = 'python' | 'javascript' | 'typescript' | 'sql' | 'json' | 'shell' | 'prompt';
type LessonPractice = {
  id: string;
  lessonId: string;                 // existing canonical ID
  depth: 'overview' | 'understand' | 'master';
  objective: string;
  prerequisites: string[];
  theorySteps: Array<{ id: string; title: string; bodyMdx: string; visualizationId?: string }>;
  examples: Array<{
    id: string; explanation: string; input?: string;
    code?: string; expectedOutput?: string; walkthrough: string[];
  }>;
  exercise: {
    id: string; title: string; instructions: string;
    language: PracticeLanguage;
    starterCode?: string; editableFiles?: Record<string, string>;
    expectedBehavior: string; publicTests?: string[];
    hints: string[]; difficulty: 'starter' | 'core' | 'challenge';
    assessment: 'deterministic' | 'rubric' | 'manual';
    runtime: 'pyodide' | 'browser-js' | 'browser-sql' | 'isolated-remote' | 'non-executable';
  };
  sourceRefs: string[];
  status: 'planned' | 'draft' | 'reviewed' | 'published';
};
```

Use stable, unique IDs for tasks, examples, and steps. Store code safely as separate content files when appropriate. Preserve old lesson URL and progress mappings. No published lesson may reference missing or broken runnable assets. `prompt` and `shell` exercises must not be passed to a JS/Python evaluator by mistake.

## 4. TWO EXAMPLES — PEDAGOGICAL QUALITY
For each coding-relevant published lesson:
- Example 1 must be short enough to understand line by line; annotate important lines.
- Example 2 must show a realistic variation without jumping to new, unexplained concepts.
- Present **Input → Code → Output → Why this output?**.
- Label synthetic datasets and illustrative values clearly.
- Provide runnable code; make expected output accurate by testing it.
- Do not silently introduce terms the learner has not studied; link prerequisite glossary terms instead.
- Do not invent sources or replace supplied research statements with unverified claims.

If materials are incomplete, mark the lesson as draft and report the missing content instead of publishing fabricated explanations.

## 5. INTERACTIVE CODING PLAYGROUND
Build a reusable `PracticeLab` inside the existing lesson UI using the existing editor infrastructure if present; otherwise choose a well-maintained editor (Monaco or CodeMirror) compatible with the project.

Features:
- Syntax highlighting and appropriate language mode.
- Editable starter code, clearly separated from read-only example code.
- **Run Code**, **Check Answer**, **Reset**, **Show Hint**, **Copy Error**, **Next Lesson** actions that actually work.
- Standard output, stderr, runtime errors, test report, and elapsed execution time (measured, not invented).
- Input fixtures and sample outputs.
- Clear running, success, failure, timeout, and unsupported-runtime states.
- Autosave code attempts by `lessonId + exerciseId + depth`, without overwriting previous student progress.
- Keyboard access, mobile-friendly fallback, and reduced-motion support.
- Allow multiple attempts; never shame students for errors.
- In guided mode show a single task at a time; in Reference mode optionally show examples and theory together.

**Do not fake a “Run” button.** If execution is unavailable, present an explicit “Download/open externally” path and do not grade execution-based tasks as passed.

## 6. REAL CODE EXECUTION AND SECURITY
Prefer local, client-side runtimes for beginner exercises:
- **Python:** Pyodide in a dedicated Web Worker for supported lightweight Python exercises. Load lazily. Capture stdout/stderr and errors. Use a termination/restart strategy for runaway scripts.
- **JavaScript/TypeScript:** choose a controlled browser sandbox/worker strategy. Do not use unrestricted `eval`, `new Function`, or untrusted user code in the application’s privileged origin. TypeScript needs transpilation and isolation.
- **SQL:** isolated browser engine such as DuckDB-Wasm or SQLite-Wasm with disposable synthetic datasets, run in a worker; enforce resource limits.
- **JSON:** schema validation without executing arbitrary code.
- **Prompt Engineering:** inspect/test templates locally; live LLM calls are optional, explicit, backend-proxied, rate-limited and cost-aware. A local mock MUST be clearly labeled as a simulation, not a model answer.
- **Shell, Docker, Kafka, Spark, heavy ML/GPU training:** provide instructions and environment-specific downloadable exercises or notebooks. Run in a genuinely isolated, quota-limited remote sandbox only if the project already has a secure supported infrastructure; never execute these directly on the Next.js/Vercel host or production server.

**Security mandatory:** never run arbitrary learner code in privileged Next.js route handlers or inside a shared application process; no unrestricted file-system, network, secrets, cookies, or API key access. Apply isolation, execution limits, input/output size limits, cancellation, per-user rate limits for remote execution, and resource quotas. Never expose provider API keys in the browser. Browser Web Workers alone do not provide strong security for running hostile code; use origin isolation/sandboxing as appropriate. Explain real runtime limitations, including browser package restrictions.

## 7. PRACTICE DESIGN PER EXISTING LEARNING PATH
Reuse shared canonical lesson IDs across tracks. Depth and practice difficulty can vary by track, but do not duplicate the core theory needlessly.

**Python Developer:** variables, conditions, loops, functions, collections, exceptions, DSA, OOP, generators, decorators, async. Examples: compute filtered totals; implement a stack, queue, or recursive traversal. Use Pyodide where suitable. Avoid testing purely by exact printed text when functional behavior matters.

**AI Engineer:** API request shapes, tokenization, prompt parameters, embeddings, cosine similarity, RAG ingestion/retrieval, tool-call validation, agents, and evals. Provide small local simulated inputs where real services are not available and clearly label them. Example: implement cosine similarity or RAG chunk ranking over a tiny in-memory corpus; add deterministic retrieval assertions.

**Machine Learning Engineer:** feature scaling, train/test splits, leakage, regression, classification metrics, gradient descent, neural-network calculations, attention. Use miniature synthetic datasets and real numeric computations; offer notebooks for heavier training, with manual verification if browser execution cannot support packages.

**Data Scientist:** Pandas-style data cleaning, EDA, SQL, hypothesis tests, confidence intervals, A/B test analysis, CUPED, time series. Use small datasets that fit local execution and check computations with numerical tolerances.

**Data Engineer:** SQL JOIN, partitioning, Parquet concepts, ETL vs ELT, CDC, deduplication, batch processing, orchestration DAGs, data quality. Practice simple ingestion/transformation using Python/SQL locally; use explicit external lab instructions for Spark/Kafka/Airflow/Docker, not fake browser backends.

**Prompt Engineering:** compare zero-shot/few-shot instructions, build reusable prompt templates, parse structured output and test JSON schemas, design prompt injection defenses, evaluate sample responses with rubrics, maintain prompt versions. Where an LLM response is subjective, never claim automated exact-match tests prove quality.

For conceptual lessons, choose a meaningful applied task (e.g., diagnose unsafe tool permissions, identify a data leak, choose an architecture) alongside lightweight code only when appropriate.

## 8. FEEDBACK AND HINTS
- Show public tests and expected behavior before submission where helpful.
- Keep hidden test input/expected outputs on a secure grader if any remote grading is used; do not claim browser-bundled tests are secret.
- For syntax errors, highlight line/column where available and explain in Uzbek.
- For failed assertions, distinguish wrong output, type mismatch, edge cases, and runtime failure.
- Supply up to three gradual hints: concept reminder → algorithmic outline → relevant line-level nudge. Do not reveal a full answer automatically.
- Store an instructor reference solution separately, not in the ordinary client payload if it must remain hidden.
- After the learner passes, show an optional model solution, complexity/explanation, and a challenge extension.
- Let learners retry without penalty. Persist attempts, last code, completion evidence, and timestamps if already supported; protect privacy.

## 9. PROGRESS, COMPLETION, AND ASSESSMENT
Record separate states:
`theoryViewed`, `examplesViewed`, `practiceStarted`, `lastRun`, `testsPassed`, `lessonCompleted`, and separate progress for `overview / understand / master`.

- Reading, clicking, or watching a Manim animation does not equal mastering a coding lesson.
- A lesson's practical milestone is complete only if its defined criterion is met.
- For deterministic coding tasks: require the actual tests to pass.
- For non-deterministic/subjective tasks: use an explicit rubric/manual review, not fabricated pass marks.
- Students can revisit completed lessons, change path, and continue from where they stopped.
- A Shared Lesson completion should be reused across relevant paths only when learning objective, depth, and assessment criteria actually match.
- If using LocalStorage initially, preserve old keys or migrate them safely; do not reset existing user progress. Add optional cloud sync later only when explicitly requested.

## 10. PRACTICE CONTENT PIPELINE
Many existing curriculum entries are planned, not fully authored. Do not interpret a lesson title as a completed lesson.

For each lesson:
1. Inspect the existing source-backed research and canonical content.
2. Verify prerequisite concepts and expected language/runtime.
3. Write one focused Uzbek theory unit.
4. Write and execute Example 1.
5. Write and execute Example 2 (or document why only one is meaningful).
6. Write a student exercise with starter code, expected behavior, and tests/rubric.
7. Add hints, feedback, and optional challenge.
8. Connect existing visualization ID if actually implemented; planned animations must not appear as working.
9. Validate source citation/reference integrity, math, examples, and code.
10. Publish only after review and successful tests.

Maintain authored vs planned coverage reports. Avoid bulk-generated low-quality placeholders. No invented scholarly citations or made-up benchmark data.

## 11. FIRST COMPLETE VERTICAL SLICE
Implement and verify ONE full end-to-end lesson, then generalize the infrastructure. Recommended initial sample: **Python — Functions & Return Values** (if that lesson already exists; otherwise use the nearest verified existing Python lesson).

Expected lesson:
- Tiny explanation of function arguments, return values, and `print` vs `return`.
- Example 1: `add(a, b)`.
- Example 2: a practical `calculate_total(prices)`.
- Exercise: learner implements `calculate_total(prices)` in the editor.
- At least three real tests: empty list, regular list, and decimal values with an appropriate floating-point tolerance.
- Run and Check working in a safe Python runtime.
- Stepwise hints, meaningful error feedback, reset, saved progress, next lesson action.

Then add a SECOND vertical slice from a different track (e.g., Data Engineer SQL deduplication or AI Engineer cosine similarity) to prove runtime and content schema generality.

Do not mark all other roadmap entries as implemented simply because they appear in the navigation.

## 12. TESTING AND ACCEPTANCE
Add real automated validation for:
- Example code actually runs and gives documented outputs.
- Public tests pass for the reference solutions and fail for known wrong submissions.
- Browser runtime startup/error/timeout/reset.
- No unauthorized network/privileged APIs are exposed through code execution.
- Lesson schema and unique IDs.
- Existing URLs, curriculum mappings, shared lesson links.
- Per-depth progress persistence and migration.
- Guided navigation (theory → example → practice → feedback → next).
- Keyboard and mobile accessibility.
- TypeScript checking, linting and a production Next.js build.

Do not assert a security guarantee beyond what the selected sandbox really provides. Record untested scenarios plainly.

## 13. IMPLEMENTATION MILESTONES
1. Inspect existing codebase and document reuse plan.
2. Define backward-compatible practice content schema and registry.
3. Build step-based Guided Practice lesson experience.
4. Add example viewer with traceable inputs and outputs.
5. Implement safe Python execution and test feedback for lightweight tasks.
6. Implement student editor, run/reset/hint controls, and autosave.
7. Add exercises/feedback to one complete Python lesson.
8. Add one second track and appropriate execution/assessment mode.
9. Add additional runtimes progressively (SQL, JS/TS, JSON) when needed.
10. Connect existing Manim/React visuals and glossary popovers.
11. Preserve progress, accessibility and responsiveness.
12. Validate tests/build/security boundaries and write an honest completion report.

**Build and test the first two complete slices before generating hundreds of exercise files.** Then produce a prioritized backlog to expand through the existing six paths.

## 14. REQUIRED DELIVERABLES
- Modified working existing Next.js application.
- Typed lesson-practice schema and data validation.
- Reusable GuidedPractice and PracticeLab UI.
- Genuine supported in-browser execution engine(s) with clear limitations.
- Real tests and actionable feedback.
- At least two complete working lessons across two existing paths.
- Safe progress migration and autosave.
- `PRACTICE_CONTENT_GUIDE.md` for creating future lessons.
- `RUNTIMES_AND_SECURITY.md` documenting sandbox and unsupported task types.
- `PRACTICE_IMPLEMENTATION_REPORT.md` with what was actually built, executed, tested, and still planned.

## FINAL INSTRUCTIONS
Stay strictly within the user's six-path AI Learning Platform and existing course materials. Preserve original knowledge content and current design conventions while simplifying the learning interaction. Build real functionality; do not substitute mock code execution, fake green checks, or decorative demonstrations for student practice.

**Product rule: Read → Understand → See examples → Write code → Run → Learn from mistakes → Continue.**

Inspect the repository and begin implementation. Do not stop at a plan.
