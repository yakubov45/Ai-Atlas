# AI Agent Master Prompt — Split ML and DS into independent tracks

You are an experienced Learning Platform Architect, Machine Learning Engineer, Data Scientist and Full-stack Engineer.

## PURPOSE
Convert the existing *combined* ML & DS study path into TWO fully independent curricula:
1) Machine Learning Engineering — models, training, validation, DL, inference and MLOps.
2) Data Science — business framing, statistics, EDA, SQL, A/B testing, forecasting, data storytelling and decision-making.

## INPUT FILES (read exactly in order)
1. `canonical_source_520.json` — the source of truth, including 9 published lessons.
2. `machine_learning_track.json` — proposed independent ML path.
3. `data_science_track.json` — proposed independent DS path.
4. `data_science_extensions_50.json` — 50 NEW DS-specific modules/lessons, distinct provenance.
5. `validated_crosslinks.json` — candidate ID-valid links to Python/AI Academy.
6. `platform_data_model.json` — planned data model, do not assume DB schema.
7. `ML_DS_TWO_TRACKS_PLAN.md`, `ML_DETAILED_SYLLABUS.md`, `DS_DETAILED_SYLLABUS.md`.

## GLOBAL GUARDRAILS
- Only edit the curriculum and learning experience explicitly scoped here. Never refactor unrelated project areas.
- Read uploaded source and track JSONs, then inspect actual source code and database schema. Do not assume a stack, table names, libraries, routes or that a migration exists.
- Preserve all 520 original `mlds-*` IDs, exact titles, 31 original source phase definitions and 9 published statuses. Never overwrite currently published content or user progress. Any conflict must be reported.
- `mle-*` and `ds-*` are NEW navigation phase IDs, not canonical lesson IDs; `dsx-*` are NEW proposed Data Science lesson IDs. Do not invent duplicates.
- Shared canonical lesson content is stored once and referenced in both paths; track-specific projects, quizzes and certificates stay separate.
- Before migrations: produce dry-run counts, foreign-key validation, backup plan and rollback. Never deploy production without explicit approval.
- No fabricated data, scores, results, passed tests, GPU measurements or real-world experimental claims. Show empty/loading/error states.
- Only code the visual lab when real calculations, input validation and tests are implemented; no fake interactive demos.
- Reference images in user text are not provided. Create independent visuals; inspect licensing before copying third-party diagrams or text.
- Do not expose API keys or sensitive data. Use sandboxing/resource limits for user-submitted Python; do not run arbitrary learner code inside trusted server process.
- Start with one pilot phase per track; validate, then implement phase-by-phase in separate, reviewable commits.
## LESSON AUTHORING CONTRACT
Each planned lesson requires 1) objectives and prerequisites; 2) 200–450 words Uzbek theory with limitations; 3) two verified runnable examples; 4) three conceptual/debugging questions with rationales; 5) two self-solve practical tasks and hidden tests; 6) one misconception case; 7) relevant original interactive lab; 8) references and unique IDs. No placeholder examples, no hardcoded pass statuses.
For published lessons, do not edit in-place: propose additions as non-destructive new version requiring review.
AI tutor should prefer hints and diagnostics over complete solutions, and it must not claim hidden tests passed unless code runner produced the result.

## IMPLEMENTATION STAGES
1. Audit and present exact counts, status diff, existing DB, current progress tables, endpoints and content keys. Read-only.
2. Verify JSON integrity and preserve source immutability.
3. Build two separate route trees, navigation, phase cards, prerequisites and track-specific progress.
4. Implement real ML pilot (e.g. `mle-08`) and real DS pilot (e.g. `ds-07`).
5. Make one shared canonical lesson appear in two routes with separate phase assessment, and test completion semantics.
6. Build isolated course-specific visual labs and tests.
7. Present the 50 `dsx-*` DS extension lessons as optional proposals. Do NOT import or publish them without explicit user approval; on approval add with review states and no overwrite.
8. Validate all links, canonical uniqueness, exact 9 `published`, e2e flows and accessibility.
9. Produce changelog, screenshots, failed/passed test evidence and a rollback strategy. Do not deploy.

## ACCEPTANCE CRITERIA
- All 520 original lesson IDs retained and referenced by >=1 course.
- Exactly two top-level paths, accessible individually; no combined catch-all path presented as the only navigation.
- 9 original published lessons unmodified and accessible via their mappings.
- 50 DS-exclusive supplemental lessons clearly marked as optional proposals, initially planned, not imported without user approval.
- Python Academy and AI Engineering links only use valid IDs and do not duplicate content.
- No broken image/asset links; no copy of unlicensed third-party media.
- Per-track quiz and project reports correspond to actually executed tests; no mocks masquerading as results.
- Summarize changes with file-by-file diff, test commands and blockers.
