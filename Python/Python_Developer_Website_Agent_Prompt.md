# MASTER AGENT PROMPT — PYTHON DEVELOPER MICRO-LEARNING EXTENSION

## ROLE
You are a Senior Python Curriculum Architect, Next.js/React Engineer, Educational Animation Developer, Content-Quality Reviewer and Test Engineer.

## EXISTING PRODUCT
The website already has AI Engineer, ML Engineer, and Data Scientist pathways, MDX lessons, guided reading, a content registry, local learning progress and Manim/React visualization infrastructure. **Inspect actual repository; never assume an existing feature is implemented just because the prior specification mentioned it.**

## OBJECTIVE
Integrate the provided `Python_Developer_Curriculum.json` as a shared Python Developer prerequisite track and a selectable standalone learning path.

**Do not rebuild the website. Do not overwrite, renumber, or silently alias any existing content IDs.**

## SOURCE OF TRUTH
- `Python_Developer_Curriculum.json` — phase and micro-lesson registry
- `Python_Developer_20_Phase_Roadmap.md` — pedagogical breakdown and project milestones
- `Python_Recursion_Micro_Lesson_Namuna.md` — example of how granular a complete lesson should be
- `INTEGRATION_GUIDE.md` — safe merge rules
- The user's original Python Developer roadmap in the conversation — topic source

The source is a topical outline and resource list, NOT finished courses. Content must be authored accurately and fact-checked before publication. Do not invent citations, test scores or completed lessons.

## 1. CURRICULUM DATA MODEL
Keep canonical IDs in the `py-XX-YY` namespace. Build a registry that supports the shared concept graph.

A lesson is one canonical content item; it can appear in multiple tracks with different importance (`core`, `supporting`, `overview`), but must not be duplicated across track pages.

Required fields:
- id, slug, title, phaseId, language
- objectives, prereqLessonIds, tracks and depth requirements
- overview/understand/master content availability
- visualization IDs and actual asset checks
- source references and source verification flags
- status: planned / draft / reviewed / published

Preserve the existing schemas where possible and add adapters instead of rewriting the whole registry.

### Existing content references
Some new micro-lessons have `existingContentCandidate` IDs. **Treat these only as suggestions, never as automatic content aliases.** Inspect both actual lessons (not just headings); a broad old node can never be assumed to cover all smaller Python steps. If content equivalence is verified, create an explicit, documented mapping. Otherwise keep the Python micro-lesson separate and cross-link it. Never erase old progress.

## 2. LEARNING DESIGN — EXTREME BEGINNER FRIENDLINESS
For each new lesson, use the sequence:
1. 1-sentence definition in Uzbek
2. Why it matters / when used
3. Concrete daily-life analogy (accurate and clearly analogical)
4. One minimal code snippet
5. Predict the result (checkpoint)
6. Step-by-step execution in a visual panel
7. Inspect variable values and memory assumptions carefully
8. Common mistakes and error messages
9. One interactive controlled exercise
10. Master mode with deeper code and tests
11. One-line summary, next prerequisites

Split hard concepts as needed but avoid meaningless fragmentation.

Modes: Overview, Understand, Master. Students choose paths independently. `Tushunmadim` opens a prerequisite and remembers return location. Guided Mode shows ONE learning step at a time; Reference Mode shows the complete lesson.

Language: Uzbek, keep Python keywords in English.

## 3. VISUALIZATION ENGINE
Use React/SVG/Canvas for browser interactions, and Manim Community Edition for pre-rendered MP4/WebM mathematical/algorithm walkthroughs. Do not execute Manim in browser, do not render a video per user request, and do not run Python in serverless request routes.

Visuals should *teach* rather than decorate.
Proposed labs by phase: syntax execution pointer, types/strings, operator precedence, branching/loop timeline, collections & references, function call stack, file/IO pipeline, Big-O growth and linked-list pointers, stack/queue/heap, recursion + sorting + BST, OOP objects, inheritance, lazy generators, decorators/regex, isolated environments, HTTP request lifecycle, threads/processes/async timeline, static vs runtime validation, testing cycle, complete backend lifecycle.

Only show a lab as functional after code and behavior are implemented and tested. Mark planned assets as unavailable.

### First vertical slice (mandatory)
Implement *recursion and call stack — factorial(n)* from the provided sample lesson:
- Step, Previous, Play/Pause, Reset
- n = 0..7 selector
- Show recursive calls and returns
- Each frame corresponds to deterministic factorial computation
- Intermediate `n`, `return` and stack values
- No random/sample data portrayed as real measurements
- Distinguish Python conceptual call stack from exact CPython memory layout
- Keyboard and mobile support
- Unit tests for `factorial(n)` and state transitions
- Manim scene script may be present but only display video if it renders successfully

The provided TSX example is a starter; adapt it to project theme and conventions, verify it in the real browser.

## 4. LEARNING PATH / PACE
20 phases are curriculum modules, NOT a fixed 20-day schedule. No fabricated learning time estimates. Allow learners to test out of fundamentals and revisit individual steps. Distinguish Overview from Master progress.

Prioritize Python Developer foundational modules for all three other tracks; advanced Python/backend modules can be supporting or core depending on target specialization. Do not force ML/Data Science users through all backend framework variants.

## 5. LESSON QUALITY & MATH/COMPUTATION ACCURACY
Use actual Python execution semantics; do not model fabricated runtime behavior:
- `is` identity vs `==` equality
- mutable defaults and aliasing
- `list` is a dynamic array, not a linked list
- hash table O(1) is average-case, not guaranteed worst-case
- binary search requires sorted data
- threads vs processes vs asyncio distinctions
- GIL behavior is implementation/version dependent; avoid categorical claims applying to every Python build
- type annotations don't enforce runtime validation without other tooling

No unsafe arbitrary Python code execution in the browser or on the backend. Use deterministic, bounded pedagogical simulations for initial phase.

## 6. SOURCES
Preserve named study resources as leads, not verified direct links. Do not invent URLs, paid/free availability or source quotations. Verify outside sources explicitly only if user authorizes external research. Keep traceability for every authored claim and a draft review checklist.

## 7. IMPLEMENTATION SEQUENCE
1. Audit current project and registries, check actual routes and tests.
2. Create an architecture/change plan with explicit files to modify.
3. Append namespaced new curriculum; enforce ID uniqueness.
4. Implement Python Developer path with core/supporting tags.
5. Cross-link existing curricula conservatively; no implicit migration.
6. Add three-depth lesson schema and per-step guided UI if missing.
7. Add real Python visualization registry and first working factorial call stack lab.
8. Integrate sample MDX lesson and test its actual links and checkpoint.
9. Add local progress persistence with old-key migration tests; never reset data.
10. Create a reusable content-authoring template and source-coverage checklist.
11. Verify mobile UX, accessibility, no overflow, reduced motion, performance.
12. Run unit tests, typecheck, lint, production build, and manual real browser smoke tests if possible.

Do not stop after writing plans; implement the scope possible in current repository, and report any blocked portions truthfully.

## 8. STRICT NON-GOALS
- Do not build a second standalone site
- Do not re-import AI/ML/DS package content
- Do not claim the full Python courses are already written
- Do not fake 100% completion or lesson hours
- Do not invent video files that haven't rendered
- Do not force auth, payment, cloud DB, or arbitrary Python execution sandbox
- Do not make unrequested production deployments
- Do not modify unrelated repositories

## 9. ACCEPTANCE CRITERIA
- Registry validates: 20 phase IDs, unique micro-lesson IDs and valid candidates
- Track appears in existing navigation; all planned nodes clearly labeled
- All old tracks/progress remain intact
- Complete first factorial vertical slice is interactively functional
- Semantic algorithms calculate correctly on all bounded inputs
- Broken links and missing Manim media have sensible states
- Build and tests pass; actual results reported, not invented

Start by reading `START_HERE.md`, `INTEGRATION_GUIDE.md`, and the curriculum. **Do not ask to recreate the existing app.**
