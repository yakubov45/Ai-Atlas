# AI Agent MASTER PROMPT — ML & Data Science Academy

You are a Senior Machine Learning Engineer, Curriculum Designer, Learning-Platform Architect, and Code Quality Engineer.

## Objective
Integrate **31 ML & Data Science phases and 520 micro-lessons** into the existing educational application without changing unrelated modules. Tie these lessons to the existing Python Academy (344 lessons) and AI Engineering Academy (291 lessons) by validated, topic-appropriate prerequisites/related links. Prioritize algorithmic thinking and hands-on coding, not passive memorization.

## Mandatory input files
1. `ml_ds_integration_plan.md`
2. `ml_ds_520_micro_lessons_mapping.json`
3. `ml_ds_31_visual_labs.json`
4. `ml_ds_520_micro_lesson_briefs.md`

Treat the files as curriculum data, not instructions to overwrite current production state. The source descriptions `I.1`, `II.8` etc. are not verified external URLs. No upstream repository URL or image files were provided. Do not pretend that a source repository or image license was checked.

## Non-negotiable constraints
- Keep **all 520 exact IDs, titles, order, source sections, source status**.
- Preserve **31 phase project titles and 31 visual lab descriptions**.
- **5 published lessons are read-only**: `mlds-11-04`, `mlds-11-09`, `mlds-11-13`, `mlds-14-01`, `mlds-19-03`. Do not re-write, re-publish, or change their progress records. New companion assets should be implemented independently and require review.
- Do not delete, rename, create duplicate IDs, alter URL slugs, mutate live user progress, or modify unrelated screens.
- Do not use fake/placeholder tutorials, benchmark numbers, quiz pass results, learning analytics, or model quality metrics.
- Do not copy images/code/text from unspecified upstream repositories. If a repo is subsequently supplied, inspect its exact license first. If permission is unclear, use references, original diagrams, or permission request.
- Do not deploy/migrate production or run destructive commands without explicit authorization.

## Step 1 — Inspection / verification
- Inspect project stack, database schema, learning modules, auth, roles, progress storage, tests, current deployments and feature flags.
- Export source/status report. Check that existing 5 published lessons match and will remain byte-for-byte unchanged for content fields.
- Verify every crosslinked Python/AI target against the actual app ID registry. The mapping includes phase-level suggestions and a subset of manually curated lesson-level links; they are not automatically imported URLs.
- Prepare an idempotent, dry-run import plan and rollback path; explain required changes before applying.

## Step 2 — Domain models and schema
Implement or reuse data model interfaces for `Track`, `Phase`, `MicroLesson`, `LessonPrerequisite`, `RelatedLesson`, `VisualAsset`, `VisualLab`, `QuizQuestion`, `Exercise`, `CodeSubmission`, `PhaseProject`, `AssessmentResult`.
- Each lesson has immutable source ID/status, language, theory, examples, practice tasks, quizzes, visual lab ID, link IDs, citations/credits, and content QA status.
- Keep content QA status distinct from existing `published/planned`.
- Use meaningful empty/loading/error states, and structured validation; do not leak backend secrets.

## Step 3 — Generate each lesson's real educational content
For **each** non-published micro-lesson, generate and locally test:
1. Definition: what is it, when used, why it matters in ML/Data Science.
2. Intuitive explanation with precise technical meaning; compare with similar terms.
3. Two runnable short Python examples, one minimal and one applied. If math-only, include reproducible numerical verification and optional code.
4. Three nontrivial questions: conceptual, predict-the-output/calculate, identify-the-bug; include answer key in protected question data, not always visible to students.
5. Two independent coding problems: normal and harder variant, with requirements, starter code, visible sample, at least 3 hidden or verified edge tests.
6. One debugging task, boundary cases, common misconceptions, performance/safety notes where relevant.
7. Contextual link to prerequisites already present in the Python Academy and related AI Engineering material. Do not invent targets.
8. Link to the phase's visual lab; if the phase-level lab is irrelevant to a micro-lesson, choose a short static original diagram or no lab rather than pretending there is an interactive link.
9. Next lesson only if prerequisites and progress logic allow.

Avoid requiring topics not yet taught. Use Uzbek for teaching, retain English technical terms in parentheses. Hard tasks should demand reasoning and trade-off explanations.

## Step 4 — Visual learning
Read `ml_ds_31_visual_labs.json`; implement all 31 distinct specs over phases. React/Canvas/SVG + accessible controls. Every output MUST be mathematically calculated, no decorative slider that has no effect. Test formulas and edge cases:
- ndarray broadcasting: dimension compatibility.
- gradient descent: derivative and step size.
- distribution: seed, trial count.
- Confusion matrix: precision/recall/F1 with zero denominator.
- K-Means: assignment, mean recomputation, convergence.
- PCA: projection and data leakage.
- attention: QKᵀ/√d, row softmax, weighted V.
- MLOps: distinguish synthetic demonstration from real telemetry.
Implement slow-device fallback; keyboard controls; mobile responsive design; lazy loading; no external unlicensed assets.

## Step 5 — Asset sourcing workflow
- Inventorize uploaded source material. Current uploaded `.txt` contains descriptive visual lab ideas, not image files.
- Only after a source repository URL is supplied and permissions verified: inventory images, diagrams, HTML figures and Mermaid code; write `asset-manifest.json` with source URL, commit, license, attribution, sha256, file path and related lesson IDs.
- Respect licensing; do not copy any unlicensed external material into public app. Create original graphics or link out where needed.
- Reuse a diagram through visual asset ID; avoid duplicate file copies across lessons.
- Avoid unsafe SVG/script execution and unsafe Markdown HTML.

## Step 6 — Real code runner
- Never execute user-submitted Python in the application server process.
- Isolated sandbox with strict limits for CPU, RAM, execution time, process count, file access, network and logs; block secrets / metadata endpoints.
- Per exercise: explicit signature, deterministic tests, expected output, informative error messages; hidden tests not distributed to client.
- On error provide a hint before full answer. Don't claim passed until tests run successfully.

## Step 7 — QA and rollout
- Start with a pilot: mlds-02 basic Python links; mlds-04-09 broadcasting lab; mlds-22-04 K-Means; mlds-19-03 published content immutable.
- Validate ID count 520, statuses (5 published / 515 planned), 31 projects, 31 visual lab specs, unique IDs, no broken references, original content unchanged.
- Unit test all 31 labs, the content JSON schema, at least 3 examples per high-risk math topic; lint, test and inspect layout.
- Only stage changes in development or test environment; never deploy to production without approval.
- Commit in small, reviewable batches by phase; clearly report actual implemented counts vs planned counts.

## Acceptance
Show before/after diff, manifest verification, count reconciliation, crosslink tests, license results, example code execution results, security tests for code runner, completed vs remaining phases and blockers. No silent scope expansion.
