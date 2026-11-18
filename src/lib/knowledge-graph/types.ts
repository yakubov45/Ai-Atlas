/**
 * Unified AI Knowledge Graph — Type Definitions
 * 
 * Bridges the 4 platform learning tracks:
 * - Python Programming (`python-dev`, 344 micro-lessons)
 * - AI Engineering (`ai-engineer`, 291 micro-lessons)
 * - Machine Learning Engineering (`ml-engineer`, 520 micro-lessons)
 * - Data Science (`data-science`, 520 micro-lessons)
 */

export type ConceptDomain =
  | "programming"
  | "mathematics"
  | "data-science"
  | "machine-learning"
  | "ai-engineering";

export type ConceptDifficulty = "beginner" | "intermediate" | "advanced";

export type TrackIdentifier =
  | "python-dev"
  | "ai-engineer"
  | "ml-engineer"
  | "data-science"
  | "core";

export type ConceptRelationType =
  | "REQUIRES"
  | "RECOMMENDED_BEFORE"
  | "RELATED_TO"
  | "PART_OF"
  | "APPLIED_IN"
  | "EXTENDS"
  | "ALTERNATIVE_TO"
  | "USED_IN_PROJECT";

export interface CrossTrackLessonLink {
  track: TrackIdentifier;
  lessonId: string;
  title: string;
  role: "canonical" | "prerequisite" | "application" | "deep_dive";
  href: string;
}

export interface ConceptCodeSnippet {
  language: "python" | "sql" | "bash";
  code: string;
  explanationUz: string;
}

export interface ConceptFormula {
  latex: string;
  explanationUz: string;
}

export interface KnowledgeConcept {
  id: string;
  name: string;
  nameUz: string;
  domain: ConceptDomain;
  category: string;
  difficulty: ConceptDifficulty;
  summaryUz: string;
  whatIsItUz: string;
  whyItMattersUz: string;
  aliases: string[];
  crossTrackLessonLinks: CrossTrackLessonLink[];
  visualLabIds: string[];
  codeSnippet?: ConceptCodeSnippet;
  formula?: ConceptFormula;
  keyTakeawayUz: string;
  estimatedMinutes?: number;
}

export interface ConceptRelation {
  id: string;
  source: string; // concept ID (upstream / prerequisite)
  target: string; // concept ID (downstream / dependent)
  type: ConceptRelationType;
  descriptionUz?: string;
}

export interface LearningGoalPreset {
  id: string;
  title: string;
  titleUz: string;
  descriptionUz: string;
  targetConceptId: string;
  category: string;
  icon: string;
  estimatedHours: number;
}

export interface LearningPathStep {
  stepNumber: number;
  concept: KnowledgeConcept;
  isCompleted: boolean;
  isTarget: boolean;
  recommendedNext: boolean;
  primaryLessonLink?: CrossTrackLessonLink;
}

export interface PersonalizedLearningPath {
  goalId?: string;
  targetConcept: KnowledgeConcept;
  orderedSteps: LearningPathStep[];
  totalSteps: number;
  completedSteps: number;
  progressPercentage: number;
}

export interface GraphLayoutNode {
  id: string;
  concept: KnowledgeConcept;
  x: number;
  y: number;
  depth: number;
}
