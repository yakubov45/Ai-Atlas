# TASK: Integrate the Extended AI Glossary into the EXISTING AI Learning Platform

You are a Senior Next.js Engineer, Curriculum Graph Architect, Technical Educator and Accessibility Reviewer.

## Context
My existing production-intended platform includes 6 learning paths: AI Engineer, ML Engineer, Data Scientist, Python Developer, Data Engineer, Prompt Engineering. It already has Next.js, TypeScript, Tailwind, MDX, lessons, progress, Manim and React interactive visualizations.

## Input files
- `README.md`
- `SOURCE_ATTRIBUTION.md`
- `AI_Glossary_Detailed.json`
- `AI_Concept_Graph.json`
- `00-INDEX.md`
- `terms/`
- `GLOSSARY_INTEGRATION_GUIDE.md`

## Objective
Create an integrated Uzbek-first knowledge dictionary for all 6 paths. For each term, show: what it is, why it is needed, how it works, one beginner example, prerequisites, related topics, real lesson links when resolvable, and supporting sources.

## Strict requirements
1. Inspect the actual repository before changing code. Do NOT rebuild it.
2. Preserve every existing lesson ID, user progress, bookmark, and research file.
3. Parse JSON through typed validated schemas; never hardcode the entire dictionary into React JSX.
4. Retain canonical glossary term IDs across all tracks; no duplicated definitions across courses.
5. Import entries as `draft-review`. Do not automatically publish unverified content. Support an editor-only preview.
6. Inspect and resolve `lessonRefs` against real existing curriculum IDs; do not invent or approximate IDs.
7. Show an inline, keyboard-friendly term popover inside MDX lessons that does not interfere with links or code blocks.
8. Full `/glossary/[slug]` entry presents Uzbek summary, why, how, example, prerequisites, related terms, and source attribution.
9. Search must support English term, aliases, Uzbek description, category, and accents; filters for 6 learning paths.
10. Implement breadcrumb, alphabetic index and optional knowledge graph. Use a layout with simple default view and expandable details.
11. Visualization ideas are **plans**, not videos. Reuse existing registry only if a corresponding working lab exists.
12. Never invent sources, scientific results, model outputs, citations or formulas. If source coverage is incomplete, say so.
13. Check technical accuracy and status before final publishing. Flag questionable terms instead of silently rewriting original research.
14. Do not add external network requests, backend or paid service unless genuinely needed.
15. Expose understandable empty, loading, and error states.
16. Perform TypeScript build, schema checks, link and prerequisite graph checks, keyboard and mobile tests. Report only actually executed tests.

## Implementation order
1. Audit existing glossary, curriculum, lesson IDs, source architecture.
2. Implement schema and import registry.
3. Build simple glossary list with search, categories and path filters.
4. Build term detail and crosslinks.
5. Integrate lightweight MDX definition popover.
6. Add optional source-linked concept graph.
7. Add one working example, e.g. Vector → Dot Product → Cosine Similarity → Embedding → Semantic Search → RAG; actual diagrams only where implemented.
8. Integrate editorial review workflow and tests.

## Acceptance criteria
- All imported term IDs unique; no broken crosslinks.
- Import does not change existing curriculum or lesson progress.
- Glossary remains usable on small screens.
- Readers can open a 1-sentence definition and optional deeper sections.
- Planned animations never masquerade as working videos.
- No claim that all entries were copied from or verified against Wikipedia.
- Project successfully builds and verified tests reported accurately.

Execute the work in the current repository rather than producing only a plan.
