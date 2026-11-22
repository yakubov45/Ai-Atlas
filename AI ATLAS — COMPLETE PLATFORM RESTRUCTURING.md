# AI ATLAS — COMPLETE PLATFORM RESTRUCTURING & LEARNING OS MASTER PROMPT

## ROLE

You are a Senior Full-Stack Architect, Learning Experience Designer, AI/ML Curriculum Architect, Knowledge Graph Engineer, Technical Content Engineer, and Senior UI/UX Designer.

Your task is to transform my existing **AI Atlas** educational website into a professional, highly organized, interconnected, future-proof **Personal AI Learning Operating System**.

This is an EXISTING project, not a new project.

You must inspect the repository, understand the current implementation, and improve it without breaking existing functionality or losing content.

**IMPORTANT: Do not simply explain what needs to be done. Implement the changes directly in the existing codebase.**

---

# 1. PROJECT CONTEXT

AI Atlas is my long-term personal learning platform.

I use this website to collect, study, practice, and organize everything related to programming, data science, machine learning, deep learning, generative AI, and AI engineering.

I will continue adding new learning materials for years.

The system must remain usable even when it contains thousands of lessons, hundreds of topics, many learning paths, videos, research papers, practical coding exercises, and projects.

Existing visible sections include:

- AI Engineer
- ML Engineer
- Data Science
- Deep Learning — 16 Architectures
- Python Developer
- Data Engineer
- Prompt Engineering
- Hugging Face LLM Course
- 12-Week Learning Plan
- 30 Days Python
- Knowledge Graph / Bilimlar xaritasi
- Learning Roadmaps
- Visual Laboratories
- Videos
- Articles / Maqolalar
- Glossary
- Bookmarks / Saqlanganlar

The existing screenshots show approximately:

- AI Engineer: 20 phases, 291 lessons
- ML Engineer: 22 phases, 466 lessons
- Data Science: 23 phases, 376 lessons
- Python Developer: 20 phases, 344 lessons
- Hugging Face LLM Course: 13 chapters, 99 sections, 220 micro-lessons
- Deep Learning: 16 architectures organized around six fundamental questions

These numbers are reference points from the current UI, not database guarantees.

**Read the actual repository and content data to determine the correct numbers.**

Do not invent lessons, statuses, progress, or metrics.

---

# 2. FIRST: FULL REPOSITORY AUDIT

Before modifying anything, inspect:

1. Framework and dependencies
2. App routing structure
3. Current navigation and layout components
4. Existing pages and features
5. All learning content files
6. Curriculum and course configuration
7. Existing data schemas
8. User progress storage
9. Existing localStorage/database logic
10. Lesson rendering components
11. Knowledge Graph implementation
12. Roadmap implementation
13. Search implementation
14. Published/draft lesson statuses
15. Existing tests and documentation

Produce an internal inventory containing:

- Every existing course
- Every learning track
- Every phase and chapter
- Every lesson
- Every practical exercise
- Every visual laboratory
- Every associated research paper
- Every video reference
- Every glossary term
- Every incomplete lesson
- Every duplicate or overlapping concept
- Every broken lesson or route

Identify the difference between:

- Real completed lesson
- Incomplete lesson
- Placeholder lesson
- Missing lesson
- Duplicate lesson
- Existing unpublished lesson

Do not delete existing content.

Do not replace functional components unnecessarily.

Preserve existing URLs wherever possible.

Before changing schemas, ensure existing user progress can be safely migrated.

---

# 3. NEW PLATFORM INFORMATION ARCHITECTURE

The current website contains too many independent top-level navigation items.

Reorganize the platform into six primary sections.

## A. Dashboard

A single overview of the learner's progress.

Display:

- Continue Learning
- Current learning path
- Current lesson
- Overall progress
- Recently studied concepts
- Upcoming recommended topics
- Current practical projects
- Completed lessons
- Weekly learning activity
- Bookmarked content
- Knowledge gaps

Never display fake statistics.

When progress data is unavailable, show an appropriate empty state.

## B. Global Roadmap

One central learning roadmap that connects all courses and technical concepts.

## C. Learning Library

All courses and learning materials in a hierarchical catalog.

Organize into subject groups:

### Programming Foundations

- Python
- 30 Days Python
- Algorithms and Data Structures
- Other existing programming fundamentals

### Mathematics

- Linear Algebra
- Probability
- Statistics
- Calculus
- Optimization

### Data Engineering & Data Science

- Data Engineering
- Data Science
- Data Processing
- Data Analysis
- Data Visualization

### Artificial Intelligence

- Machine Learning
- Deep Learning
- Neural Networks
- Computer Vision
- Natural Language Processing

### Generative AI & LLM

- Hugging Face LLM Course
- Transformer Architecture
- Tokenization
- Embeddings
- Language Models
- Fine-Tuning
- RAG
- AI Agents
- MCP
- Multimodal AI
- Local LLM Engineering

Only create subject groupings from verified content or clearly identify new curriculum items.

Do not invent completed lessons.

## D. Knowledge Graph

A unified interactive graph connecting related concepts.

## E. Practice & Labs

A central place for coding exercises, interactive visualizations, assessments, experiments, and portfolio projects.

## F. Resources

A searchable library for:

- Videos
- Research papers
- Articles
- Glossary
- Bookmarks
- External educational resources

Resources must link back to their associated lessons and concepts.

---

# 4. NAVIGATION REDESIGN

The current header is overcrowded.

Replace it with a clean, scalable navigation system.

## Desktop

Top navigation should primarily contain:

- AI Atlas logo
- Dashboard
- Global Roadmap
- Learning Library
- Knowledge Graph
- Practice & Labs
- Global Search
- Theme toggle
- Settings / Profile

Move secondary items into grouped navigation.

Use a collapsible sidebar or a well-designed navigation drawer.

## Mobile

Implement a responsive layout with:

- Compact header
- Navigation drawer
- Search access
- Clear current location
- No horizontal overflow

## Mandatory UI behavior

**Do not keep full lesson lists permanently expanded.**

Course navigation should remain collapsed by default unless the user has deliberately expanded it or is reopening an active lesson.

Clicking a course should reveal its phases.

Clicking a phase should reveal its lessons.

Clicking a lesson should open the lesson workspace.

Use expandable accordion sections or a slide-out drawer.

Suggested interaction:

Learning Library → Course → Phase → Lesson

Support:

- Open/close course contents
- Expand/collapse all phases
- Remember preferred expanded sections when appropriate
- Keyboard navigation
- Direct lesson links
- Breadcrumb navigation
- Previous/next lesson controls
- Quick course switching
- Search within the current course

The main content area must not be unnecessarily compressed by a permanently visible lesson list.

Provide a dedicated **"Darslar ro‘yxati"** button that opens the course outline drawer.

When the drawer closes, the main lesson area should use the available width.

---

# 5. CENTRALIZED CONTENT ARCHITECTURE

Currently, the same concept can appear in multiple courses.

For example:

Cosine Similarity appears in Embeddings, Vector Mathematics, Semantic Search, and RAG.

We must avoid maintaining several inconsistent copies of the same core lesson.

Implement a centralized content model.

Required conceptual entities:

- Subject
- Course
- Track
- Phase
- Chapter
- Lesson
- Concept
- Prerequisite
- Learning Objective
- Exercise
- Quiz
- Laboratory
- Project
- Resource
- Research Paper
- User Progress
- Content Version

Every lesson must have a stable unique identifier.

Recommended fields:

```typescript
type Lesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;

  subjectIds: string[];
  courseIds: string[];
  phaseId?: string;

  conceptIds: string[];
  prerequisiteIds: string[];
  relatedLessonIds: string[];

  difficulty: "beginner" | "intermediate" | "advanced";

  estimatedMinutes: number;

  learningObjectives: string[];

  theory: unknown;
  examples: unknown[];
  exercises: unknown[];
  quiz: unknown[];
  labId?: string;

  resourceIds: string[];

  status: "draft" | "review" | "published";

  version: number;
  updatedAt: string;
};
```

Adapt this schema to the existing technology and content architecture.

Do not force a database migration unless necessary.

Use canonical concepts and reusable lesson content.

A single lesson may belong to multiple courses through mappings.

However, distinguish genuinely different depth levels and learning objectives.

A beginner explanation of Attention and an advanced mathematical derivation should not be collapsed into one identical lesson.

---

# 6. GLOBAL ROADMAP — MOST IMPORTANT FEATURE

Build one unified roadmap for the entire AI Atlas ecosystem.

It must not simply be a long list of courses.

It should be a prerequisite-aware, concept-based learning graph.

High-level learning progression:

Programming Fundamentals
→ Mathematics Foundations
→ Data Handling
→ Machine Learning
→ Deep Learning
→ Neural Network Architectures
→ Transformers
→ Language Models
→ Generative AI Engineering
→ Advanced AI Systems

These are major conceptual stages, not rigid restrictions.

Some subjects can be learned in parallel.

## Roadmap requirements

Each roadmap node should represent a concept, module, or meaningful learning milestone.

Each node may have:

- Required prerequisites
- Recommended prerequisites
- Related concepts
- Associated lessons
- Related laboratories
- Associated projects
- Available learning tracks
- Completion status
- Estimated study time

## Branching

After foundations, allow different career paths:

- AI Engineer
- ML Engineer
- Data Scientist
- Data Engineer
- LLM Engineer
- RAG Engineer
- AI Agent / MCP Engineer
- Local AI Engineer
- Multimodal AI Engineer
- Python Developer

The same foundational lesson should be reusable across multiple tracks.

Do not duplicate lesson completion records for the same canonical lesson.

## Roadmap interaction

Users must be able to:

1. View the global learning map.
2. Zoom and pan around the map.
3. Select a topic.
4. Inspect its prerequisites.
5. See why it matters.
6. Open related lessons.
7. Open associated visual laboratories.
8. View dependent topics.
9. See which learning tracks require the topic.
10. Mark content as completed.
11. Return to their previous location.

Add a simple List View for accessibility and mobile devices.

Graph visualization must not be the only way to access content.

## Critical requirement

Do not automatically lock all advanced lessons.

Users should be able to study any topic.

Show prerequisite recommendations instead of unnecessary restrictions.

Use "Recommended before this lesson" warnings when appropriate.

---

# 7. KNOWLEDGE RELATIONSHIP BUTTON

Add a dedicated relationship button to each lesson.

Suggested Uzbek label:

**"Bog‘liqliklar"**

Use a network icon.

The button should open a relationship panel showing:

### Prerequisites

What should I know before this topic?

### Direct relationships

Which concepts are closely connected?

### Used in

Which models and systems use this concept?

### Next topics

What can I learn afterward?

### Practical applications

Where is this concept actually useful?

### Learning paths

Which career roadmaps include this topic?

Example:

Current lesson: Cosine Similarity

Prerequisites:

- Vectors
- Vector Norm
- Dot Product

Related topics:

- Embeddings
- Euclidean Distance
- Semantic Similarity

Used in:

- Semantic Search
- Vector Retrieval
- RAG
- Recommendation Systems

Next topics:

- Vector Databases
- Nearest Neighbor Search
- Hybrid Search
- Reranking

The connections must be based on actual concept relationships, not random shared keywords.

Represent relationships explicitly and use typed edges.

Suggested relationship types:

- prerequisite_of
- related_to
- part_of
- used_in
- extends
- alternative_to
- applied_in

Prevent circular prerequisite dependencies.

A relationship panel should provide both a compact list and an optional mini-graph.

---

# 8. ADD AND INTEGRATE DEEP LEARNING — 16 ARCHITECTURES

The Deep Learning module covers the following 16 architectures:

1. Perceptron
2. Multi-Layer Perceptron
3. Convolutional Neural Network
4. ResNet
5. Word Embeddings
6. Recurrent Neural Network
7. LSTM
8. GRU
9. Sequence-to-Sequence
10. Attention
11. Self-Attention
12. Transformer
13. BERT
14. GPT
15. Mixture of Experts
16. Mamba

Organize them around six learning questions:

1. What can a neuron learn?
2. How can neural networks understand images?
3. How can models process sequences?
4. How can one sequence become another?
5. How can every token interact with other tokens?
6. How can neural networks scale and process longer contexts?

Integrate these lessons into the Global Roadmap and Knowledge Graph.

Each architecture needs:

- Historical motivation
- Problem it solves
- Core mathematical idea
- Architecture diagram
- Tensor shape explanation
- PyTorch implementation
- Training example
- Evaluation example
- Experiments
- Common mistakes
- Limitations
- Connections to other architectures
- Real-world applications
- Relevant original papers

Include practical comparisons:

- Perceptron vs MLP
- CNN vs ResNet
- RNN vs LSTM vs GRU
- Seq2Seq vs Attention
- Attention vs Self-Attention
- BERT vs GPT
- Dense FFN vs MoE
- Transformer vs Mamba

Do not describe Mamba simply as a later version of Transformer.

Clearly explain the design trade-offs.

---

# 9. HUGGING FACE LLM COURSE INTEGRATION

The existing Hugging Face LLM Course must become part of the centralized learning system.

Preserve its actual chapter, section, and lesson structure.

Audit every existing chapter and micro-lesson.

Integrate related concepts into:

- NLP
- Tokenization
- Embeddings
- Transformers
- Pretraining
- Fine-tuning
- Model Evaluation
- Model Deployment
- LLM Engineering

Add source attribution and direct links to the original course.

Implement track overlays:

- Deep Dive
- Supporting
- Overview

For example:

An LLM Engineer may need deep coverage of tokenization.

A Data Scientist may need an overview or supporting coverage.

The underlying canonical lesson should remain the same where its objectives are identical.

Do not duplicate content merely to support another career track.

---

# 10. COMPLETE AND PUBLISH MISSING LESSONS

This is a mandatory task.

Audit the entire platform and identify:

- Lessons not yet written
- Lessons containing only titles
- Incomplete theory content
- Missing code examples
- Missing exercises
- Empty quizzes
- Missing practical laboratories
- Broken navigation links
- Unpublished lessons that are actually complete
- Placeholder content

For every missing or incomplete lesson:

1. Identify its learning objectives.
2. Find related existing curriculum material.
3. Reuse verified canonical content where appropriate.
4. Create missing theory and examples.
5. Add practical Python/PyTorch code when relevant.
6. Add at least two meaningful examples.
7. Add assessment questions.
8. Add a practical exercise.
9. Connect its prerequisite concepts.
10. Add reliable references.
11. Validate all content.
12. Publish the lesson only after it passes quality checks.

## Mandatory publication rules

A lesson cannot be marked as published just because its title exists.

Never create fake content simply to make the lesson count look complete.

Never mark unfinished material as published.

A genuine lesson must contain useful, topic-specific learning material.

Code samples should be executable and tested where the environment allows.

If external API keys, GPU resources, datasets, or other dependencies prevent execution, document the limitation.

Distinguish:

- Fully validated lesson
- Content reviewed but runtime-dependent
- Draft requiring further work

If your environment cannot validate a lesson, do not falsely claim that it passed.

Implement as much complete content as possible within the existing curriculum.

Keep a report of anything that remains unfinished.

Do not invent progress or quietly skip lessons.

## Lesson publishing workflow

Draft → Validation → Review → Published

If the existing system already supports publishing, improve that implementation rather than building a second conflicting one.

Avoid requiring unnecessary manual approval for every valid lesson in the authorized repository.

---

# 11. UNIVERSAL LESSON EXPERIENCE

Every learning lesson should follow a consistent structure.

### Part 1 — Learning Objective

What will the learner understand or be able to build?

### Part 2 — Motivation

Why was this concept invented?

What problem does it solve?

### Part 3 — Theory

Explain clearly in Uzbek.

Keep technical names in English.

Use progressive explanations:

- Level 1: Overview
- Level 2: Understand
- Level 3: Master

### Part 4 — Mathematics

Show relevant formulas and explain their components.

Do not introduce advanced mathematics without connecting prerequisite topics.

### Part 5 — Worked Examples

At least two examples where applicable.

### Part 6 — Interactive Visualization

Use an existing lab or create an appropriate interactive demonstration.

Do not create meaningless animations.

### Part 7 — Practical Coding

Provide readable code that matches the theoretical lesson.

Include:

- Input
- Expected output
- Code explanation
- Common errors
- Suggested modifications

### Part 8 — Quiz

Use meaningful comprehension questions.

Provide explanations for incorrect answers.

### Part 9 — Independent Exercise

Require the learner to modify or write code.

### Part 10 — Relationships

Show prerequisite and related concepts.

### Part 11 — References

Link relevant documentation, original papers, or other credible sources.

### Part 12 — Completion

Allow the user to complete the lesson and navigate to the next one.

The current four-tab structure:

Theory / Examples / Test / Practical Code

may be preserved and enhanced.

Do not replace functional lesson interactions unnecessarily.

---

# 12. BETTER LEARNING WORKSPACE

The current lesson workspace uses a large persistent course list.

Redesign it.

Recommended desktop layout:

Header:
Breadcrumb / Lesson Title / Progress / Relationships / Course Contents

Main content:
Full-width or comfortable reading-width lesson content

Optional:
Collapsible table of contents

Floating or side drawer:
Course → Phase → Lesson list

The course drawer should be closed by default.

Include a clear **"Darslar ro‘yxati"** button.

When the user clicks the button, reveal the complete course navigation.

Clicking a lesson changes the active lesson and closes the drawer on mobile.

## Lesson controls

- Previous Lesson
- Next Lesson
- Mark Completed
- Bookmark
- Relationships
- Open Roadmap Location
- Open Related Lab
- Copy Lesson Link

Support keyboard navigation and accessible focus behavior.

Use responsive layouts.

Ensure that changing lessons does not accidentally reset user progress.

---

# 13. PROGRESS TRACKING

Implement a consistent progress model.

Track:

- Not Started
- In Progress
- Completed

Optionally provide:

- Already Know

Differentiate user-declared "Already Know" from successfully completed assessment.

Progress should work across:

- Learning paths
- Courses
- Lessons
- Practice modules
- Global Roadmap

When the same canonical lesson appears in multiple tracks, its genuine completion status should synchronize.

Do not count a single lesson several times in global completed-learning statistics.

Course-specific progress can be calculated from its mapped lesson set.

Persist progress using the existing architecture.

If guest learning is already supported, preserve it and safely synchronize on authentication where applicable.

---

# 14. GLOBAL SEARCH

Build a unified command-style search interface.

Suggested keyboard shortcut:

Ctrl+K / Cmd+K

Search across:

- Courses
- Phases
- Lessons
- Concepts
- Glossary
- Projects
- Videos
- Papers
- Labs

Support:

- Keyboard navigation
- Search filters
- Highlighted matches
- Direct navigation
- Recent searches when appropriate
- Relevance ranking

The search result should make it clear whether an item is a lesson, glossary concept, course, paper, or laboratory.

Avoid duplicating identical canonical content in search results without indicating its different learning paths.

---

# 15. VISUAL LABORATORY SYSTEM

Organize laboratories by actual subject.

Example groups:

Mathematics Labs:
- Vector Operations
- Dot Product
- Cosine Similarity
- Matrix Multiplication

Machine Learning Labs:
- Linear Regression
- Gradient Descent
- Decision Boundaries
- Clustering

Deep Learning Labs:
- Neuron Visualization
- Backpropagation
- CNN Filters
- RNN Memory
- Attention Heatmaps
- Transformer Components

Do not add labs unrelated to existing lessons simply to increase the number of laboratories.

Every laboratory must be reachable from relevant lessons and visible in its associated roadmap node.

If a lab has no associated lesson, identify it during the content audit.

---

# 16. CONTENT TAXONOMY

Every content item should have clear metadata.

At minimum:

- Subject
- Topic
- Difficulty
- Content type
- Source
- Learning objective
- Prerequisites
- Related concepts
- Estimated time
- Publication status

Provide useful filters rather than overwhelming the user with dozens of tags.

Avoid multiple near-identical names for the same concept.

Examples:

"Embedding", "Embeddings", and "Vector Representation" should be normalized or correctly distinguished according to their meanings.

Preserve standard technical terms.

Create searchable aliases for terminology.

---

# 17. FUTURE-PROOF CONTENT MANAGEMENT

AI Atlas will grow significantly.

The architecture must support the addition of new topics without rebuilding the global navigation or duplicating course infrastructure.

When a new course or learning resource is added:

1. Register its metadata.
2. Detect or map existing concepts.
3. Identify prerequisites.
4. Connect related lessons.
5. Add it to the appropriate category.
6. Register it in the Global Roadmap.
7. Add its resources to the search index.
8. Update relevant progress calculations.

Avoid hardcoded course-specific navigation when a scalable data-driven solution already exists or can be introduced safely.

Prefer maintainable, modular components.

Ensure existing lessons remain accessible after future curriculum changes.

---

# 18. DESIGN SYSTEM

Keep the current AI Atlas identity.

Maintain:

- Dark, professional theme
- Purple primary accents
- Clean typography
- Modern educational interface
- Technical, developer-oriented visual language

Improve:

- Navigation density
- Information hierarchy
- Consistent spacing
- Component consistency
- Readability
- Mobile responsiveness
- Contrast
- Accessibility
- Loading states
- Empty states
- Error states

Reduce excessive banners, repeated information, oversized cards, and unnecessary visual decorations.

The platform should feel like a combination of a modern coding education platform, a knowledge management system, and a technical documentation workspace.

Do not blindly copy an external website.

Avoid unnecessary UI redesigns unrelated to the organizational problems.

---

# 19. PERFORMANCE AND ENGINEERING QUALITY

Preserve the existing framework and dependency architecture unless there is a documented technical reason to modify it.

Requirements:

- Modular reusable components
- Type-safe data structures when TypeScript is used
- Efficient rendering of large lesson catalogs
- Lazy loading of heavy visualizations
- Appropriate code splitting
- Efficient search indexing
- No unnecessary duplicate content loading
- Stable route handling
- Accessible interactive controls
- Consistent progress persistence

Avoid loading the entire knowledge graph or all course content for every page.

Use appropriate loading, error, and empty states.

Preserve existing SEO behavior for publicly accessible lessons.

Use stable routes and redirects where necessary.

---

# 20. REQUIRED IMPLEMENTATION ORDER

Work in the following sequence.

### Phase A — Audit

Inspect the codebase and document existing content, routes, data models, and incomplete material.

### Phase B — Information Architecture

Define centralized metadata and content relationships.

### Phase C — Navigation Refactor

Clean the top navigation and implement collapsible course navigation.

### Phase D — Lesson Workspace

Create the improved focused lesson interface with a toggleable outline.

### Phase E — Global Roadmap

Build the unified prerequisite-based roadmap and learning track overlays.

### Phase F — Knowledge Relationships

Implement lesson relationship buttons and graph connectivity.

### Phase G — Course Integration

Integrate Hugging Face LLM Course, Deep Learning architectures, Python, AI Engineer, ML Engineer, Data Science, and other existing tracks into the shared structure.

### Phase H — Missing Content

Identify, complete, validate, and publish missing lessons.

### Phase I — Progress and Search

Ensure course progress, global progress, bookmarks, and search use canonical content IDs.

### Phase J — Testing and Cleanup

Run available tests, validate routes, check content integrity, and review desktop/mobile UX.

Implement changes incrementally and avoid unnecessarily destructive refactors.

Do not stop after providing a design proposal.

---

# 21. ACCEPTANCE CRITERIA

The task is complete only when the following are true:

- [ ] Existing lessons and resources are preserved.
- [ ] The header is clean and organized.
- [ ] Course lists are collapsed by default.
- [ ] A single button opens course/lesson navigation.
- [ ] Course, phase, and lesson hierarchy works.
- [ ] The lesson workspace provides more reading space.
- [ ] A unified Global Roadmap exists.
- [ ] Courses map to shared canonical concepts.
- [ ] Prerequisite relationships are represented.
- [ ] Every lesson has a relationship entry point.
- [ ] Knowledge Graph and Roadmap use compatible concept IDs.
- [ ] Hugging Face LLM Course is integrated.
- [ ] The 16 Deep Learning architectures are integrated.
- [ ] Missing and unfinished lessons are audited.
- [ ] Validated complete lessons are published.
- [ ] Unfinished lessons are not falsely published.
- [ ] Existing user progress is preserved.
- [ ] Progress synchronization works across tracks.
- [ ] Global search works with the new hierarchy.
- [ ] Desktop and mobile navigation work correctly.
- [ ] All changed routes and internal links are tested.
- [ ] No fake learning statistics are displayed.
- [ ] Production build and existing relevant tests pass, or any failures are explicitly reported.

---

# 22. FINAL OUTPUT REQUIRED

After implementation, provide a clear report in Uzbek containing:

1. What was changed
2. New folder and component architecture
3. New navigation structure
4. Global Roadmap implementation
5. Knowledge Graph changes
6. Number of courses audited
7. Number of lessons audited
8. Number of missing lessons discovered
9. Number of lessons completed
10. Number of lessons actually published
11. Number of lessons still requiring work
12. New reusable components
13. Tests executed and results
14. Remaining technical or content limitations

Only report numbers obtained from actual code and content inspection.

Do not claim that an unfinished feature is complete.

Do not claim that a lesson is published unless it is actually available through the application's publishing logic.

---

# FINAL PRINCIPLE

AI Atlas should not be a collection of unrelated courses.

It must become **one coherent learning ecosystem**.

Every concept should have a place.

Every lesson should connect to related knowledge.

Every course should participate in the Global Roadmap.

Every practical exercise should reinforce a learning objective.

Every learner should be able to answer:

- What am I learning?
- Why am I learning it?
- What knowledge do I need first?
- What does this concept connect to?
- Where is it used in real AI systems?
- What should I learn next?
- What practical project proves that I understand it?

Build the platform with long-term maintainability, genuine educational value, and excellent learning experience as the highest priorities.

**Start by inspecting the existing repository, then implement the restructuring directly. Do not create a separate demo project.**