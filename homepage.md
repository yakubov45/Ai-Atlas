# AI Learning Platform — Premium Home Page Redesign

You are a Senior Frontend Engineer, Creative UI/UX Designer, Motion Designer, and EdTech Product Architect.

## 1. Primary objective

Redesign and improve the existing website Home Page into a premium, modern, visually engaging AI education platform.

The website already contains four learning tracks:

1. Python Programming
2. AI Engineering
3. Machine Learning Engineering
4. Data Science

**Important:** This is an enhancement of the existing website, not a new website.

First inspect the current project architecture, components, routes, styling, database, video assets, and curriculum data.

Preserve the existing brand identity, design tokens, navigation, backend, authentication, learning progress, and course structures.

Do not modify unrelated pages.

The Home Page must combine:

- High-quality educational videos
- Professional motion design
- Interactive AI and ML visualizations
- Beautiful learning track presentations
- Real course content
- Clear navigation
- Practical coding demonstrations
- Responsive, accessible design

Avoid generic AI-generated landing pages, excessive gradients, decorative clutter, and unnecessary animations.

---

## 2. Hero Section — First impression

Create an impressive, premium educational Hero section.

### Layout

Desktop:
- Left: Strong headline, description, and CTA buttons
- Right: Beautiful interactive AI visualization or an educational video preview

Mobile:
- Stack content vertically
- Preserve headline readability
- Video must remain responsive

### Suggested headline

**Sun'iy intellektni shunchaki o‘qima. Uni yaratishni o‘rgan.**

Supporting description:

Python dasturlashdan Machine Learning, Data Science va zamonaviy AI tizimlarigacha. Nazariyani o‘rganing, kod yozing, algoritmlarni vizual tushuning va haqiqiy loyihalar yarating.

Primary CTA:
**O‘rganishni boshlash**

Secondary CTA:
**Yo‘nalishlarni ko‘rish**

### Hero background

Use a subtle animated visualization inspired by:

- Neural network connections
- Token processing
- Data flow between network layers
- Vector spaces
- Embedding representations

Animations must be elegant and purposeful.

Avoid heavy animations that degrade performance.

Respect `prefers-reduced-motion`.

If an appropriate authorized educational video already exists in the project, use it in the Hero with a poster image and explicit play button.

Never autoplay video with audio.

---

## 3. Video-rich educational experience

Videos are one of the most important parts of this redesign.

Inspect the project's existing videos and video metadata first.

Support:
- User-owned educational videos
- Authorized YouTube embeds
- Other properly licensed educational media
- Self-hosted MP4/WebM files when appropriate

Do not invent video URLs, titles, thumbnails, durations, instructors, or view counts.

Do not download, copy, or rehost copyrighted third-party videos without permission.

### Video sections

A. Featured educational video

Show one high-quality featured lesson related to AI, ML, Python, or Data Science.

B. Explore through videos

Create a beautiful horizontal video card collection.

Each card may display:
- Video thumbnail
- Title
- Related learning track
- Duration, if known
- Lesson link
- Play action

C. How AI works

Add short video explanations or animated technical demonstrations for topics such as:

- Neural Networks
- Transformer Architecture
- Tokenization
- Gradient Descent
- Embeddings
- RAG Pipeline
- AI Agents

D. Video lesson preview

Allow visitors to preview an educational video without immediately leaving the Home Page.

Use a responsive video modal or inline player.

### Video functionality

- Lazy-load iframe embeds
- Load thumbnails before video players
- Pause inactive videos
- Avoid loading many video iframes simultaneously
- Use captions when available
- Support keyboard interaction
- Provide meaningful loading and error states
- Ensure videos never block the initial page render

Videos must complement real lessons, not replace them.

---

## 4. Four Learning Tracks

Build a visually distinctive course exploration section.

### Python Programming

Focus:
- Python fundamentals
- Data structures and algorithms
- OOP
- Functions
- APIs
- Testing

Suggested visualization:
Animated Python execution flow.

### AI Engineering

Focus:
- LLMs
- Prompt Engineering
- Embeddings
- RAG
- AI Agents
- MCP

Suggested visualization:
Interactive RAG pipeline or LLM token flow.

### Machine Learning Engineering

Focus:
- Machine Learning algorithms
- Model training
- Regression and classification
- Neural Networks
- PyTorch
- MLOps

Suggested visualization:
Training loop, neural network, or decision boundary.

### Data Science

Focus:
- SQL
- Pandas
- Statistics
- EDA
- A/B Testing
- Time Series
- Data visualization

Suggested visualization:
Interactive data chart and statistical distribution.

### Track cards

Each track card should contain:
- Track name
- Short description
- Appropriate visual or video preview
- Actual number of published lessons if available
- Learning level when defined in source data
- Direct link to its existing route

Cards must use the actual curriculum.

Never fabricate lessons, completion rates, enrollments, or student numbers.

Ensure Machine Learning Engineering and Data Science remain two independent tracks.

---

## 5. Interactive Learning Showcase

Create a section called:

**Ko‘rib tushun. Kod yozib o‘rgan.**

Visitors should experience what makes the platform different.

Build 3 compact interactive previews.

### Demo A: Neural Network

Allow visitors to change input values and watch weighted sums and activations update.

### Demo B: Gradient Descent

Show a loss function and a moving parameter.

Controls:
- Learning rate
- Step
- Reset

Show real numerical calculations.

### Demo C: Data Science

Allow visitors to explore an example dataset and see how filtering changes a chart.

These are educational demonstrations.

Implement mathematically correct simplified models.

Clearly label simplified demonstrations when necessary.

Do not pretend that illustrative animations are real model training.

Reuse existing Visual Lab components if available.

---

## 6. How Learning Works

Create a clear learning workflow.

Step 1: Choose a learning track.

Step 2: Learn the theory using text, diagrams, and video.

Step 3: Explore the interactive visual laboratory.

Step 4: Solve quizzes and coding exercises.

Step 5: Complete a practical project.

Step 6: Track your actual learning progress.

Present this as a clean visual learning journey.

Use lightweight scroll animations and progressive disclosure.

Avoid long paragraphs.

---

## 7. Real Practical Projects

Show real projects connected to the curriculum.

Potential examples from existing lessons:

- Python CLI application
- Data Analysis Notebook
- ML Classification System
- Neural Network Training
- RAG Document Search
- AI Agent with Tools

Only display projects confirmed in the curriculum.

Each project should link to its actual lesson or phase.

Do not display fake student portfolios or fabricated project completions.

---

## 8. Learning Progress and Personalization

For authenticated users:

- Continue learning
- Current learning track
- Last visited lesson
- Actual completed lessons
- Next recommended lesson based on curriculum prerequisites

For guests:

- Show learning discovery content
- Allow browsing publicly accessible lessons
- Show a clear sign-in option when required

Never show fake progress percentages.

Use existing authentication and database mechanisms.

---

## 9. Design Direction

Design keywords:

- Premium educational experience
- Clean editorial layout
- Modern developer platform
- Visual learning
- Technical sophistication
- Minimal and professional

Use the current project's typography, colors, spacing, and component system as the baseline.

Improve consistency instead of replacing the entire visual identity.

Use:
- Clear visual hierarchy
- Generous whitespace
- Elegant cards
- Subtle borders
- Restrained gradients
- Modern typography
- Carefully designed hover states
- Responsive grids

Motion:
- Framer Motion if already available
- Subtle staggered entrances
- Smooth card interactions
- Lightweight data flow animations

Do not introduce large 3D libraries solely for decoration.

---

## 10. Suggested Home Page Order

1. Navigation
2. Hero with educational visualization/video
3. Four learning tracks
4. Featured video lessons
5. Interactive learning showcase
6. How learning works
7. Practical projects
8. Personalized learning progress (authenticated users)
9. Learning roadmap preview
10. Final CTA
11. Footer

Maintain a logical information hierarchy.

The Home Page should not become extremely long or overloaded.

Use concise copy and allow users to explore deeper content through existing routes.

---

## 11. Video CMS Architecture

If a suitable media-management system already exists, reuse it.

Otherwise, design a minimal extensible video metadata model.

Suggested fields:

```ts
type EducationalVideo = {
  id: string;
  title: string;
  description?: string;
  sourceType: "youtube" | "self-hosted";
  sourceUrl: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  lessonId?: string;
  trackId?: string;
  captionsUrl?: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
};
```

Validate all media URLs and provider identifiers.

Only trusted publishing roles should be able to manage featured videos.

Do not build a redundant CMS if the website already supports media management.

Never expose private videos or unapproved media.

If no video is configured, show a meaningful text-based educational section without broken players or fake placeholders.

---

## 12. Performance and SEO

Requirements:

- Use existing framework image optimization
- Lazy-load below-the-fold videos
- Minimize JavaScript bundles
- Avoid layout shifts
- Provide stable image and video aspect ratios
- Use semantic HTML
- Maintain accessible contrast
- Support keyboard navigation
- Respect reduced-motion preferences
- Preserve existing SEO metadata
- Use meaningful H1/H2 hierarchy
- Optimize mobile performance
- Keep interactive simulations isolated from the main rendering path

Measure before and after performance whenever possible.

Do not claim performance improvements without actual measurements.

---

## 13. Implementation Process

### Stage 1: Audit

Inspect the existing Home Page, components, routing, design tokens, lessons, video resources and authentication.

Document what can be reused.

### Stage 2: Page architecture

Design the new component structure and content hierarchy.

Use existing reusable components whenever possible.

### Stage 3: Core redesign

Implement Hero, four learning tracks, video sections and learning workflow.

### Stage 4: Interactive components

Integrate existing visual laboratories and create only missing demonstrations.

### Stage 5: Data integration

Connect real courses, lessons, video metadata and user progress.

### Stage 6: Testing

Verify:
- Desktop layout
- Mobile layout
- Tablet layout
- Video playback
- Video loading failure
- Guest navigation
- Authenticated navigation
- Course routes
- Accessibility
- Responsive performance
- Dark mode if already supported

### Stage 7: Final review

Remove unused code and unnecessary dependencies.

Provide a summary of:
- Modified files
- Reused components
- New components
- Connected video sources
- Tests performed
- Any remaining limitations

## Non-negotiable restrictions

- Do not rewrite the entire application.
- Do not change authentication.
- Do not modify backend architecture without necessity.
- Do not modify curriculum IDs.
- Do not overwrite published lessons.
- Do not change unrelated pages.
- Do not use fake course metrics or invented videos.
- Do not introduce broken video embeds.
- Do not deploy to production.
- Do not add unrelated features.

**Final outcome:** A professional AI learning platform Home Page that visually communicates the value of Python, AI Engineering, Machine Learning Engineering, and Data Science through rich educational videos, meaningful animations, interactive demonstrations, and a clear learning experience.