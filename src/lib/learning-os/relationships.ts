/**
 * AI Atlas Learning OS — Canonical Knowledge Relationships Engine ("Bog'liqliklar")
 *
 * Powers the dedicated "Bog'liqliklar" button across lessons, courses, and DL architectures.
 * Represents typed edges (`prerequisite_of`, `related_to`, `part_of`, `used_in`, `extends`,
 * `alternative_to`, `applied_in`) mapped explicitly over canonical concepts, MDX slugs, and paths.
 */

import { CANONICAL_CONCEPTS, getConceptById } from "@/lib/knowledge-graph/concepts";
import { CONCEPT_RELATIONS } from "@/lib/knowledge-graph/relations";
import type { ConceptRelationType, KnowledgeConcept } from "@/lib/knowledge-graph/types";
import { SPECIALIZATION_PATHS } from "@/lib/curriculum/paths";
import { SIXTEEN_ARCHITECTURES, getDlArchitectureById } from "@/lib/curriculum/deep-learning-16-architectures";

export type CanonicalEdgeType =
  | "prerequisite_of"
  | "related_to"
  | "part_of"
  | "used_in"
  | "extends"
  | "alternative_to"
  | "applied_in";

export interface RelatedEntityNode {
  id: string;
  title: string;
  titleUz: string;
  href: string;
  edgeType: CanonicalEdgeType;
  reasonUz: string;
  kind: "concept" | "lesson" | "architecture" | "lab";
}

export interface LessonRelationshipBundle {
  queryId: string;
  matchedConceptId: string | null;
  titleUz: string;
  subtitleUz: string;
  summaryUz: string;
  prerequisites: RelatedEntityNode[];
  directRelations: RelatedEntityNode[];
  usedIn: RelatedEntityNode[];
  nextTopics: RelatedEntityNode[];
  practicalApplications: string[];
  learningPaths: Array<{
    id: string;
    title: string;
    role: "core" | "supporting" | "advanced" | "optional";
    href: string;
  }>;
  associatedLabs: Array<{
    id: string;
    title: string;
    href: string;
  }>;
}

const SLUG_TO_CONCEPT_ID: Readonly<Record<string, string>> = {
  "python-basics": "python-variables-types",
  "variables-and-data-types": "python-variables-types",
  functions: "python-functions-scope",
  "py-01-01": "python-variables-types",
  "py-06-01": "python-functions-scope",
  "py-07-01": "python-oop",
  "py-14-01": "python-async-concurrency",
  "py-16-01": "api-rest-fastapi",
  vector: "dot-product-cosine",
  "12.07": "dot-product-cosine",
  "cosine-similarity": "dot-product-cosine",
  matrix: "linear-algebra-matrices",
  "matrix-operations": "linear-algebra-matrices",
  tensor: "linear-algebra-matrices",
  hosila: "calculus-derivatives",
  "partial-derivative": "gradient-multivariate",
  gradient: "gradient-multivariate",
  "chain-rule": "backpropagation-autograd",
  probability: "probability-distributions",
  mean: "exploratory-data-analysis",
  "standard-deviation": "exploratory-data-analysis",
  "math-for-deep-learning": "linear-algebra-matrices",
  "machine-learning": "supervised-learning-foundations",
  "artificial-intelligence": "supervised-learning-foundations",
  "deep-learning": "neural-networks-perceptrons",
  backpropagation: "backpropagation-autograd",
  "gradient-descent": "gradient-descent-optimizers",
  "mlds-11-13": "gradient-descent-optimizers",
  "learning-rate": "gradient-descent-optimizers",
  "loss-functions": "loss-cost-functions",
  optimizers: "gradient-descent-optimizers",
  sgd: "gradient-descent-optimizers",
  adam: "gradient-descent-optimizers",
  "batch-normalization": "neural-networks-perceptrons",
  tokenization: "tokenization-bpe",
  "hf-01-04-01": "tokenization-bpe",
  "hf-02-05-01": "tokenization-bpe",
  embeddings: "embeddings-vector-spaces",
  transformers: "transformer-architecture",
  "hf-01-04-02": "transformer-architecture",
  llm: "transformer-architecture",
  "prompt-engineering": "prompt-engineering-cot",
  "pe-06-06": "prompt-engineering-cot",
  rag: "rag-retrieval-augmented",
  "14.06": "rag-retrieval-augmented",
  "ai-agent": "ai-agents-react-loop",
  "17.05": "ai-agents-react-loop",
  tools: "function-calling-tools",
  memory: "rag-retrieval-augmented",
  "production-ready-ml-structure": "production-mlops-serving",
  "production-ml-pipeline": "production-mlops-serving",
  cnn: "dl-cnn",
  rnn: "dl-rnn",
  lstm: "dl-lstm",
  perceptron: "neural-networks-perceptrons",
  mlp: "neural-networks-perceptrons",
  resnet: "dl-resnet",
  word_embeddings: "embeddings-vector-spaces",
  "word-embeddings": "embeddings-vector-spaces",
  gru: "dl-lstm",
  seq2seq: "attention-mechanism",
  attention: "attention-mechanism",
  self_attention: "attention-mechanism",
  "self-attention": "attention-mechanism",
  transformer: "transformer-architecture",
  bert: "dl-bert",
  gpt: "dl-gpt",
  moe: "dl-moe",
  mamba: "dl-mamba",
  "nn-01-neuron-weight-bias": "neural-networks-perceptrons",
  "nn-02-activation-functions": "neural-networks-perceptrons",
  "nn-03-architecture-layers": "neural-networks-perceptrons",
  "nn-04-forward-pass": "neural-networks-perceptrons",
  "nn-05-loss-functions": "loss-cost-functions",
  "nn-06-derivatives-chain-rule": "backpropagation-autograd",
  "nn-07-backpropagation": "backpropagation-autograd",
  "nn-08-gradient-descent-optimizers": "gradient-descent-optimizers",
  "nn-09-learning-rate": "gradient-descent-optimizers",
  "nn-10-batch-epoch": "gradient-descent-optimizers",
  "nn-11-overfitting-regularization": "supervised-learning-foundations",
  "nn-12-gpu-matmul-pytorch": "linear-algebra-matrices",
  "tr-01-tokenization-bpe": "tokenization-bpe",
  "tr-02-embeddings-rnn-limits": "embeddings-vector-spaces",
  "tr-03-self-attention-qkv": "attention-mechanism",
  "tr-04-transformer-architecture": "transformer-architecture",
  "tr-05-bert-vs-gpt": "dl-gpt",
  "tr-06-scaling-laws-chinchilla": "dl-moe",
  "tr-07-rope-gqa-rmsnorm": "dl-gpt",
  "tr-08-decoding-prompting": "prompt-engineering-cot",
  "tr-09-pretraining-data-bpb": "loss-cost-functions",
  "tr-10-midtraining-yarn-sft": "fine-tuning-lora-peft",
  "tr-11-alignment-rlhf-dpo": "fine-tuning-lora-peft",
  "tr-12-reasoning-grpo-distill": "fine-tuning-lora-peft",
};

const LAB_LABELS: Readonly<Record<string, string>> = {
  "cosine-similarity-explorer": "2D Vektor va Cosine Similarity Laboratoriyasi",
  "function-explorer": "Funksiyalar va Hosila Grafigi (Explorer)",
  "gradient-descent-1d": "Gradient Descent & Learning Rate Simulyatori",
  "neural-network-explorer": "Neyron Tarmoq Forward Pass Laboratoriyasi",
  "self-attention-explorer": "Self-Attention & Q/K/V Heatmap Laboratoriyasi",
  "rag-sandbox-explorer": "RAG Chunking, Retrieval & Hit@k Sandbox",
  "rag-pipeline": "RAG Quvuri Oqim Diagrammasi",
  "rag-pipeline-flow": "RAG Quvuri Oqim Diagrammasi",
  "function-plot": "Desmos & Funksiya Grafigi",
  "flow-diagram": "Oqim va Tizim Diagrammasi",
  "embedding-space": "Vektor va Embedding Fazosi",
  "attention-matrix": "Self-Attention Matritsa Simulyatori",
};

function mapKgRelationType(type: ConceptRelationType): CanonicalEdgeType {
  switch (type) {
    case "REQUIRES":
    case "RECOMMENDED_BEFORE":
      return "prerequisite_of";
    case "PART_OF":
      return "part_of";
    case "APPLIED_IN":
    case "USED_IN_PROJECT":
      return "used_in";
    case "EXTENDS":
      return "extends";
    case "ALTERNATIVE_TO":
      return "alternative_to";
    case "RELATED_TO":
    default:
      return "related_to";
  }
}

function conceptHref(c: KnowledgeConcept): string {
  const core = c.crossTrackLessonLinks.find((l) => l.track === "core");
  if (core) return core.href;
  return c.crossTrackLessonLinks[0]?.href ?? `/learn/map?concept=${c.id}`;
}

export function resolveConceptIdFromEntity(entityIdOrSlug: string): string | null {
  const norm = entityIdOrSlug.trim().toLowerCase();
  if (getConceptById(norm)) return norm;
  if (SLUG_TO_CONCEPT_ID[norm]) return SLUG_TO_CONCEPT_ID[norm]!;
  // Try matching crossTrackLessonLinks
  for (const c of CANONICAL_CONCEPTS) {
    if (c.crossTrackLessonLinks.some((l) => l.lessonId.toLowerCase() === norm || l.href.endsWith(`/${norm}`))) {
      return c.id;
    }
  }
  return null;
}

/**
 * Resolves full semantic knowledge relationships for ANY lesson slug, canonical concept ID,
 * track lesson ID, or 16-Architecture ID.
 */
export function getRelationshipsForEntity(
  entityIdOrSlug: string,
  fallbackMeta?: {
    title?: string;
    summary?: string;
    prerequisites?: readonly string[];
    related?: readonly string[];
    visualizations?: readonly string[];
    mdxLookup?: Readonly<Record<string, { title: string; slug: string }>>;
  },
): LessonRelationshipBundle {
  const matchedConceptId = resolveConceptIdFromEntity(entityIdOrSlug);
  const concept = matchedConceptId ? getConceptById(matchedConceptId) : undefined;
  const dlArch = getDlArchitectureById(entityIdOrSlug);

  const prerequisites: RelatedEntityNode[] = [];
  const directRelations: RelatedEntityNode[] = [];
  const usedIn: RelatedEntityNode[] = [];
  const nextTopics: RelatedEntityNode[] = [];
  const practicalApplications: string[] = [];
  const labSet = new Map<string, { id: string; title: string; href: string }>();

  if (concept) {
    for (const rel of CONCEPT_RELATIONS) {
      if (rel.target === concept.id) {
        const src = getConceptById(rel.source);
        if (!src) continue;
        const node: RelatedEntityNode = {
          id: src.id,
          title: src.name,
          titleUz: src.nameUz,
          href: conceptHref(src),
          edgeType: mapKgRelationType(rel.type),
          reasonUz: rel.descriptionUz || src.summaryUz,
          kind: "concept",
        };
        if (rel.type === "REQUIRES" || rel.type === "RECOMMENDED_BEFORE") {
          prerequisites.push(node);
        } else {
          directRelations.push(node);
        }
      } else if (rel.source === concept.id) {
        const tgt = getConceptById(rel.target);
        if (!tgt) continue;
        const edge = mapKgRelationType(rel.type);
        const node: RelatedEntityNode = {
          id: tgt.id,
          title: tgt.name,
          titleUz: tgt.nameUz,
          href: conceptHref(tgt),
          edgeType: edge,
          reasonUz: rel.descriptionUz || tgt.summaryUz,
          kind: "concept",
        };
        if (rel.type === "APPLIED_IN" || rel.type === "USED_IN_PROJECT") {
          usedIn.push(node);
          practicalApplications.push(`${tgt.nameUz}: ${rel.descriptionUz}`);
        } else if (rel.type === "REQUIRES" || rel.type === "RECOMMENDED_BEFORE" || rel.type === "EXTENDS") {
          nextTopics.push(node);
        } else {
          directRelations.push(node);
        }
      }
    }

    if (concept.whyItMattersUz) {
      practicalApplications.unshift(concept.whyItMattersUz);
    }

    for (const vId of concept.visualLabIds) {
      const normalizedViz =
        vId === "embedding-space"
          ? "cosine-similarity-explorer"
          : vId === "attention-matrix"
          ? "self-attention-explorer"
          : vId === "rag-pipeline"
          ? "rag-pipeline-flow"
          : vId === "function-plot"
          ? "function-explorer"
          : vId;
      if (LAB_LABELS[normalizedViz]) {
        labSet.set(normalizedViz, {
          id: normalizedViz,
          title: LAB_LABELS[normalizedViz]!,
          href:
            normalizedViz === "flow-diagram"
              ? "/visual-lab"
              : `/visual-lab/${normalizedViz}`,
        });
      }
    }
  }

  // Fallback / augment from MDX frontmatter if provided
  if (fallbackMeta?.prerequisites) {
    for (const pSlug of fallbackMeta.prerequisites) {
      if (!prerequisites.some((p) => p.id === pSlug || p.href.endsWith(`/${pSlug}`))) {
        const lookup = fallbackMeta.mdxLookup?.[pSlug];
        prerequisites.push({
          id: pSlug,
          title: lookup?.title ?? pSlug,
          titleUz: lookup?.title ?? pSlug,
          href: `/learn/${pSlug}`,
          edgeType: "prerequisite_of",
          reasonUz: "Ushbu mavzuni tushunish uchun tavsiya etilgan poydevor dars.",
          kind: "lesson",
        });
      }
    }
  }
  if (fallbackMeta?.related) {
    for (const rSlug of fallbackMeta.related) {
      if (!directRelations.some((r) => r.id === rSlug || r.href.endsWith(`/${rSlug}`))) {
        const lookup = fallbackMeta.mdxLookup?.[rSlug];
        directRelations.push({
          id: rSlug,
          title: lookup?.title ?? rSlug,
          titleUz: lookup?.title ?? rSlug,
          href: `/learn/${rSlug}`,
          edgeType: "related_to",
          reasonUz: "Mavzu bilan bevosita bog'liq qo'shimcha material.",
          kind: "lesson",
        });
      }
    }
  }
  if (fallbackMeta?.visualizations) {
    for (const vId of fallbackMeta.visualizations) {
      labSet.set(vId, {
        id: vId,
        title: LAB_LABELS[vId] ?? vId,
        href: `/visual-lab/${vId}`,
      });
    }
  }

  // Augment if this is one of the 16 DL Architectures
  if (dlArch) {
    const idx = SIXTEEN_ARCHITECTURES.findIndex((a) => a.id === dlArch.id);
    if (idx > 0 && prerequisites.length === 0) {
      const prevArch = SIXTEEN_ARCHITECTURES[idx - 1]!;
      prerequisites.push({
        id: prevArch.id,
        title: prevArch.name,
        titleUz: `${prevArch.number}. ${prevArch.fullNameUz}`,
        href: "/learn/deep-learning-architectures",
        edgeType: "prerequisite_of",
        reasonUz: `Tarixiy rivojlanish zanjirida ${prevArch.name} ushbu arxitektura uchun asos bo'lgan.`,
        kind: "architecture",
      });
    }
    if (idx >= 0 && idx < SIXTEEN_ARCHITECTURES.length - 1) {
      const nextArch = SIXTEEN_ARCHITECTURES[idx + 1]!;
      nextTopics.push({
        id: nextArch.id,
        title: nextArch.name,
        titleUz: `${nextArch.number}. ${nextArch.fullNameUz}`,
        href: "/learn/deep-learning-architectures",
        edgeType: "extends",
        reasonUz: `${dlArch.name} cheklovlarini yengish yoki masshtablash uchun keyingi qadam.`,
        kind: "architecture",
      });
    }
  }

  // Learning paths classification
  const learningPaths = SPECIALIZATION_PATHS.map((path) => {
    const slug = entityIdOrSlug.toLowerCase();
    const role: "core" | "supporting" | "advanced" | "optional" = path.coreSlugs.includes(slug)
      ? "core"
      : path.supportingSlugs.includes(slug)
      ? "supporting"
      : path.advancedSlugs.includes(slug)
      ? "advanced"
      : "optional";
    const tabParam =
      path.id === "deep-learning"
        ? "deep-learning"
        : path.id === "mlops-engineer"
        ? "ml-engineer"
        : path.id === "data-engineer"
        ? "data-eng"
        : path.id === "prompt-engineer"
        ? "prompt-eng"
        : path.id === "llm-engineer" || path.id === "agent-engineer"
        ? "ai-engineer"
        : "ml-engineer";
    return {
      id: path.id,
      title: path.title,
      role,
      href: `/roadmap?tab=${tabParam}`,
    };
  }).filter((p) => p.role !== "optional");

  // Always provide a concise default path list if none explicitly core
  const finalLearningPaths =
    learningPaths.length > 0
      ? learningPaths
      : (concept?.crossTrackLessonLinks ?? []).map((link) => ({
          id: link.track,
          title:
            link.track === "python-dev"
              ? "Python Developer"
              : link.track === "ai-engineer"
              ? "AI Engineer"
              : link.track === "ml-engineer"
              ? "ML Engineer"
              : link.track === "data-science"
              ? "Data Scientist"
              : "Asosiy Platforma",
          role: "supporting" as const,
          href: link.href,
        }));

  return {
    queryId: entityIdOrSlug,
    matchedConceptId,
    titleUz: dlArch?.fullNameUz ?? concept?.nameUz ?? fallbackMeta?.title ?? entityIdOrSlug,
    subtitleUz: dlArch ? `${dlArch.number}. ${dlArch.name} (${dlArch.year})` : concept?.name ?? entityIdOrSlug,
    summaryUz: dlArch?.summaryUz ?? concept?.summaryUz ?? fallbackMeta?.summary ?? "",
    prerequisites,
    directRelations,
    usedIn,
    nextTopics,
    practicalApplications: practicalApplications.slice(0, 4),
    learningPaths: finalLearningPaths,
    associatedLabs: Array.from(labSet.values()),
  };
}
