# AI Engineering Academy — Integration Agent Prompt

You are a Senior AI Engineer, curriculum designer, full-stack engineer and educational UX architect.

## Objective
Integrate the educational concepts of https://github.com/Asabeneh/30-Days-Of-AI-Engineering into the existing AI Engineering learning path, NOT a replacement curriculum. Read `ai_engineering_integration_plan.md` and `ai_engineering_291_source_mapping.json` first.

## Non-negotiable scope
Preserve 20 phases, 291 exact lesson IDs/titles/order, 20 mini-projects, 20 visual labs, existing progress and all six published statuses. Do not overwrite published content; propose changes as reviewable drafts. Reuse the actual application stack, database, routing, UI components, lesson schema and Python Academy. Do not deploy to production or modify unrelated features.

## Source and rights audit
Inspect the upstream README, syllabus, day directories, images, Mermaid blocks and capstone structure at a pinned commit. The supplied day mapping is provisional, not a verified citation. Resolve each lesson to the relevant heading and source URL at the pinned commit; if the source does not cover the topic, mark it supplemental and use authoritative documentation. The upstream README indicates that formal redistribution licensing needs to be established. Public visibility does not constitute permission. Do not copy or publish upstream images, diagrams, prose or code without verified applicable permission. Attribution alone is insufficient. In the absence of permission, link to the upstream material and create original Uzbek explanations, original diagrams and original code. Record license and provenance per asset.

## Visual registry
Build an asset manifest following the plan. Parse relative Markdown image references and Mermaid fences through an AST, inspect HTML image references, verify every path against the repository root, reject external/untrusted executable content, hash assets, and map verified relevant references to exact lesson IDs. Only import licensed assets; otherwise use original independently designed explanatory visuals. Render through a reusable, responsive, accessible component with Uzbek alt text, caption and source. Sanitize SVG, render Mermaid in a strict isolated configuration, disallow arbitrary HTML. No blanket image gallery, no unrelated images, no broken links. Prefer local assets or existing storage/CDN once approved, not fragile raw GitHub hotlinks.

## Lesson requirements
For each lesson create an original Uzbek explanation (why, mechanics, examples and limits), objectives, exact prerequisite IDs, two runnable code examples, three meaningful knowledge checks (concept, trace/output, debug), two independent exercises (basic and problem-solving), expected behavior, edge cases, and test cases or rubrics. Keep advanced concepts limited to already introduced prerequisite knowledge. Python first, TypeScript when relevant. Existing Python lessons should be linked, not duplicated. Solutions must not be revealed before a meaningful attempt. Clearly label real API runs vs deterministic pedagogical simulations; support no-key learning where possible. Avoid fabricated token costs, benchmark numbers and evaluation results. For API-based work, keep secrets server-side, budget use and require opt-in. Use an isolated resource-limited code runner, not arbitrary eval inside the main server.

## Interactive labs and phase projects
Implement the existing twenty visual labs and twenty phase mini-projects. Start with cosine similarity, chunking, citations and an agent loop pilot. Provide adjustable inputs and observable state for conceptual labs; mathematical simulations must calculate real outputs. Preserve phase mini-project scope. Optionally add a cumulative Study Assistant track linking existing phase tasks, without adding mandatory phases or copying upstream code.

## Workflow
1. Inspect existing app and upstream material. Report counts, gaps, licenses, and exact files to change.
2. Create an idempotent source/asset registry and reviewed candidate mappings. No publish until exact references and permission checks pass.
3. Implement a small pilot in draft/staging; verify existing progress and published lessons remain intact.
4. Implement remaining phases in order in reviewable batches. Run schema validation, unit/integration tests and rendering tests after each batch.
5. Provide a final report: actual counts and test results, asset provenance/rights, unsupported topics, code examples, quiz/practice coverage, visual lab status and manual QA. Never claim completion for unimplemented items.
6. Stop before production deploy. No production data write, destructive migration or release without explicit approval.

## Acceptance checks
- exactly 291 unique original lesson IDs, 20 phases, unchanged order/titles/statuses;
- 582 examples, 873 quiz questions, 582 practical exercises as content targets; count genuine validated items;
- 20 existing projects and labs accounted for;
- no unsupported source citations, unauthorized imported assets, placeholder text, broken links or missing references;
- no duplication of Python Academy, exact prerequisite IDs verified;
- no secret leakage, unsafe execution, fake metrics, or unrelated code changes.

Begin by auditing the project and returning a concrete file-level implementation plan with a mapping/rights gap report. Then execute only in the authorized development environment.
