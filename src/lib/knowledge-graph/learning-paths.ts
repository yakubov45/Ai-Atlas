/**
 * Unified AI Knowledge Graph — Learning Path Generator & Topological Ordering
 * 
 * Computes personalized, cycle-safe learning paths based on:
 * - Topological sort of ancestral prerequisites (REQUIRES & RECOMMENDED_BEFORE)
 * - User progress state (`isConceptKnown` / completed lessons)
 * - Goal presets & custom target concepts
 */

import { CANONICAL_CONCEPTS, getConceptById } from "./concepts";
import { CONCEPT_RELATIONS } from "./relations";
import type {
  KnowledgeConcept,
  LearningGoalPreset,
  LearningPathStep,
  PersonalizedLearningPath,
} from "./types";

/** Predefined popular curriculum goals */
export const LEARNING_GOAL_PRESETS: LearningGoalPreset[] = [
  {
    id: "goal-transformers",
    title: "Transformers & LLM Architecture",
    titleUz: "Transformerlar va Katta Til Modellari (LLM)",
    descriptionUz: "Vektorlar va Matritsalardan tortib Self-Attention va zamonaviy Decoder-only LLMlarga bo'lgan to'liq yo'l.",
    targetConceptId: "transformer-architecture",
    category: "LLM & Deep Learning",
    icon: "sparkles",
    estimatedHours: 45,
  },
  {
    id: "goal-rag-systems",
    title: "Production RAG Systems",
    titleUz: "Ishlab Chiqarish Darajasidagi RAG Tizimi",
    descriptionUz: "Matnni bo'laklash, embeddinglar, vektor bazalari, gibrid qidiruv va kontekst orqali aniq faktlar generatsiyasi.",
    targetConceptId: "rag-retrieval-augmented",
    category: "AI Engineering",
    icon: "database",
    estimatedHours: 35,
  },
  {
    id: "goal-ai-agents",
    title: "Autonomous AI Agents & MCP",
    titleUz: "Avtonom AI Agentlar va MCP Protokoli",
    descriptionUz: "Prompting, Function Calling, ReAct sikli va universal Model Context Protocol (MCP) vositalarini yaratish.",
    targetConceptId: "model-context-protocol",
    category: "AI Agents",
    icon: "bot",
    estimatedHours: 40,
  },
  {
    id: "goal-ml-engineer",
    title: "Core Machine Learning Engineering",
    titleUz: "Klassik Mashinali O'rganish va Ansambllar",
    descriptionUz: "Ma'lumotlarni tozalash, regressiya, klassifikatsiya, gradient tushish va zamonaviy XGBoost ansambllari.",
    targetConceptId: "gradient-boosting-xgboost",
    category: "Machine Learning",
    icon: "cpu",
    estimatedHours: 50,
  },
  {
    id: "goal-data-scientist",
    title: "Modern Data Science & Analytics",
    titleUz: "Zamonaviy Data Science va A/B Testlash",
    descriptionUz: "SQL so'rovlari, Pandas ma'lumotlar tahlili, vizualizatsiya, ehtimolliklar va ilmiy A/B eksperimentlar.",
    targetConceptId: "ab-testing-experimentation",
    category: "Data Science",
    icon: "line-chart",
    estimatedHours: 30,
  },
  {
    id: "goal-deep-learning-math",
    title: "Backpropagation & Deep Learning Math",
    titleUz: "Orqaga Tarqalish va Chuqur O'rganish Matematikasi",
    descriptionUz: "Hosilalar, gradientlar, matritsalar ko'paytmasi, zanjir qoidasi va hisoblash graflarida avtodifferensiallash.",
    targetConceptId: "backpropagation-autograd",
    category: "Mathematics & DL",
    icon: "network",
    estimatedHours: 25,
  },
  {
    id: "goal-production-mlops",
    title: "Production MLOps & Observability",
    titleUz: "AI Xizmatlarini Production'ga Joylash va Monitoring",
    descriptionUz: "FastAPI mikroservislari, Docker konteynerlari, xatoliklar monitoringi va LLM kuzatuvi (tracing).",
    targetConceptId: "production-mlops-serving",
    category: "MLOps & Cloud",
    icon: "server",
    estimatedHours: 30,
  },
];

/** Build adjacency map of prerequisites (source must be learned BEFORE target) */
export function buildPrerequisiteAdjacency(includeRecommended = true): {
  prereqsOf: Map<string, string[]>; // target -> sources (what must be learned before target)
  dependentsOf: Map<string, string[]>; // source -> targets (what is unlocked after source)
} {
  const prereqsOf = new Map<string, string[]>();
  const dependentsOf = new Map<string, string[]>();

  for (const concept of CANONICAL_CONCEPTS) {
    prereqsOf.set(concept.id, []);
    dependentsOf.set(concept.id, []);
  }

  for (const rel of CONCEPT_RELATIONS) {
    const isPrereq =
      rel.type === "REQUIRES" || (includeRecommended && rel.type === "RECOMMENDED_BEFORE");

    if (isPrereq) {
      if (prereqsOf.has(rel.target) && dependentsOf.has(rel.source)) {
        prereqsOf.get(rel.target)!.push(rel.source);
        dependentsOf.get(rel.source)!.push(rel.target);
      }
    }
  }

  return { prereqsOf, dependentsOf };
}

/** Check for cycles in the prerequisite graph using DFS */
export function detectPrerequisiteCycles(): string[][] {
  const { dependentsOf } = buildPrerequisiteAdjacency(true);
  const state = new Map<string, 0 | 1 | 2>(); // 0=unvisited, 1=visiting, 2=done
  const stack: string[] = [];
  const cycles: string[][] = [];

  const visit = (nodeId: string) => {
    state.set(nodeId, 1);
    stack.push(nodeId);

    for (const next of dependentsOf.get(nodeId) ?? []) {
      const s = state.get(next) ?? 0;
      if (s === 0) {
        visit(next);
      } else if (s === 1) {
        // Cycle detected
        const cycleStartIndex = stack.indexOf(next);
        if (cycleStartIndex !== -1) {
          cycles.push([...stack.slice(cycleStartIndex), next]);
        }
      }
    }

    stack.pop();
    state.set(nodeId, 2);
  };

  for (const concept of CANONICAL_CONCEPTS) {
    if ((state.get(concept.id) ?? 0) === 0) {
      visit(concept.id);
    }
  }

  return cycles;
}

/** Collect all transitive ancestors (prerequisites) of a target concept */
export function collectAncestors(
  targetId: string,
  prereqsOf: Map<string, string[]>
): Set<string> {
  const ancestors = new Set<string>();
  const queue: string[] = [...(prereqsOf.get(targetId) ?? [])];

  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (!ancestors.has(curr)) {
      ancestors.add(curr);
      for (const parent of prereqsOf.get(curr) ?? []) {
        if (!ancestors.has(parent)) {
          queue.push(parent);
        }
      }
    }
  }

  return ancestors;
}

/**
 * Topologically sort a set of concepts according to their prerequisite constraints.
 * Guarantees that prerequisites appear before the concepts that require them.
 */
export function topologicalSortConcepts(conceptIds: Iterable<string>): KnowledgeConcept[] {
  const targetSet = new Set(conceptIds);
  const { prereqsOf, dependentsOf } = buildPrerequisiteAdjacency(true);

  // In-degree within the induced subgraph
  const inDegree = new Map<string, number>();
  for (const id of targetSet) {
    const parents = (prereqsOf.get(id) ?? []).filter((p) => targetSet.has(p));
    inDegree.set(id, parents.length);
  }

  // Queue nodes with 0 in-degree (foundations)
  const queue: string[] = [];
  for (const id of targetSet) {
    if ((inDegree.get(id) ?? 0) === 0) {
      queue.push(id);
    }
  }

  // Deterministic tie-breaking: Sort by difficulty then domain
  const difficultyRank = { beginner: 1, intermediate: 2, advanced: 3 };
  queue.sort((a, b) => {
    const ca = getConceptById(a);
    const cb = getConceptById(b);
    if (!ca || !cb) return 0;
    return (difficultyRank[ca.difficulty] ?? 1) - (difficultyRank[cb.difficulty] ?? 1);
  });

  const sorted: KnowledgeConcept[] = [];

  while (queue.length > 0) {
    const currId = queue.shift()!;
    const concept = getConceptById(currId);
    if (concept) sorted.push(concept);

    for (const childId of dependentsOf.get(currId) ?? []) {
      if (targetSet.has(childId)) {
        const d = (inDegree.get(childId) ?? 1) - 1;
        inDegree.set(childId, d);
        if (d === 0) {
          queue.push(childId);
          queue.sort((a, b) => {
            const ca = getConceptById(a);
            const cb = getConceptById(b);
            if (!ca || !cb) return 0;
            return (difficultyRank[ca.difficulty] ?? 1) - (difficultyRank[cb.difficulty] ?? 1);
          });
        }
      }
    }
  }

  // Fallback for any nodes missed due to unexpected cycles (should never happen in verified DAG)
  if (sorted.length < targetSet.size) {
    for (const id of targetSet) {
      if (!sorted.some((c) => c.id === id)) {
        const c = getConceptById(id);
        if (c) sorted.push(c);
      }
    }
  }

  return sorted;
}

/**
 * Generate a complete, personalized learning path for a given goal concept.
 * Integrates with the learner's known concepts and lesson completion records.
 */
export function generateLearningPath(
  targetConceptId: string,
  userKnownConceptIds: readonly string[] = [],
  userCompletedLessonIds: readonly string[] = [],
  goalPresetId?: string
): PersonalizedLearningPath | null {
  const targetConcept = getConceptById(targetConceptId);
  if (!targetConcept) return null;

  const { prereqsOf } = buildPrerequisiteAdjacency(true);
  const ancestorIds = collectAncestors(targetConceptId, prereqsOf);
  ancestorIds.add(targetConceptId);

  const orderedConcepts = topologicalSortConcepts(ancestorIds);
  const knownSet = new Set(userKnownConceptIds);
  const completedLessonSet = new Set(userCompletedLessonIds);

  let hasFoundRecommendedNext = false;

  const orderedSteps: LearningPathStep[] = orderedConcepts.map((concept, idx) => {
    // A concept is completed if explicitly known OR if any of its cross-track lessons are done
    const isExplicitlyKnown = knownSet.has(concept.id);
    const hasLessonCompleted = concept.crossTrackLessonLinks.some(
      (link) => completedLessonSet.has(link.lessonId)
    );
    const isCompleted = isExplicitlyKnown || hasLessonCompleted;

    const isTarget = concept.id === targetConceptId;

    let recommendedNext = false;
    if (!isCompleted && !hasFoundRecommendedNext) {
      recommendedNext = true;
      hasFoundRecommendedNext = true;
    }

    // Pick canonical or primary lesson link
    const primaryLessonLink =
      concept.crossTrackLessonLinks.find((l) => l.role === "canonical") ??
      concept.crossTrackLessonLinks[0];

    return {
      stepNumber: idx + 1,
      concept,
      isCompleted,
      isTarget,
      recommendedNext,
      primaryLessonLink,
    };
  });

  const completedSteps = orderedSteps.filter((s) => s.isCompleted).length;
  const totalSteps = orderedSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return {
    goalId: goalPresetId,
    targetConcept,
    orderedSteps,
    totalSteps,
    completedSteps,
    progressPercentage,
  };
}
