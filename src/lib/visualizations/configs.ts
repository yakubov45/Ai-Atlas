import { z } from "zod";
import { validateExpression } from "@/lib/math/expression";

/**
 * Type-specific configuration schemas for visualization instances.
 * Content (JSON files in src/content/visualizations) is validated against these.
 */

// ---------------------------------------------------------------------------
// Flow diagram (node + edge graph with optional step-by-step walkthrough)
// ---------------------------------------------------------------------------

export const FLOW_NODE_KINDS = ["default", "input", "process", "model", "data", "output", "decision"] as const;
export type FlowNodeKind = (typeof FLOW_NODE_KINDS)[number];

const flowIdSchema = z.string().min(1).max(80).regex(/^[A-Za-z0-9_-]+$/, "Faqat harf, raqam, '_' va '-'");

export const flowNodeSchema = z
  .object({
    id: flowIdSchema,
    label: z.string().min(1).max(80),
    sublabel: z.string().min(1).max(80).optional(),
    description: z.string().min(1).max(1200).optional(),
    kind: z.enum(FLOW_NODE_KINDS).default("default"),
    position: z.object({ x: z.number(), y: z.number() }).strict().optional(),
  })
  .strict();

export const flowEdgeSchema = z
  .object({
    id: flowIdSchema.optional(),
    source: flowIdSchema,
    target: flowIdSchema,
    label: z.string().min(1).max(60).optional(),
  })
  .strict();

export const flowStepSchema = z
  .object({
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(1200).optional(),
    /** Node ids active in this step. */
    nodes: z.array(flowIdSchema).default([]),
    /** Edge ids (or "source->target") active in this step. */
    edges: z.array(z.string().min(1)).default([]),
  })
  .strict();

export const flowDiagramConfigSchema = z
  .object({
    nodes: z.array(flowNodeSchema).min(1),
    edges: z.array(flowEdgeSchema).default([]),
    steps: z.array(flowStepSchema).default([]),
    layout: z.enum(["auto-horizontal", "auto-vertical", "manual"]).default("auto-horizontal"),
    /** Milliseconds per step when autoplaying. */
    stepDurationMs: z.number().int().min(400).max(10000).default(1800),
    videoSrc: z.string().optional(),
  })
  .strict()
  .superRefine((config, ctx) => {
    const ids = new Set<string>();
    config.nodes.forEach((node, index) => {
      if (ids.has(node.id)) ctx.addIssue({ code: "custom", path: ["nodes", index, "id"], message: `Takroriy tugun id: ${node.id}` });
      ids.add(node.id);
      if (config.layout === "manual" && !node.position) {
        ctx.addIssue({ code: "custom", path: ["nodes", index, "position"], message: "manual layout uchun position talab qilinadi" });
      }
    });
    const edgeIds = new Set<string>();
    config.edges.forEach((edge, index) => {
      if (!ids.has(edge.source)) ctx.addIssue({ code: "custom", path: ["edges", index, "source"], message: `Noma’lum tugun: ${edge.source}` });
      if (!ids.has(edge.target)) ctx.addIssue({ code: "custom", path: ["edges", index, "target"], message: `Noma’lum tugun: ${edge.target}` });
      edgeIds.add(edge.id ?? `${edge.source}->${edge.target}`);
    });
    config.steps.forEach((step, stepIndex) => {
      step.nodes.forEach((id, i) => {
        if (!ids.has(id)) ctx.addIssue({ code: "custom", path: ["steps", stepIndex, "nodes", i], message: `Noma’lum tugun: ${id}` });
      });
      step.edges.forEach((id, i) => {
        if (!edgeIds.has(id)) ctx.addIssue({ code: "custom", path: ["steps", stepIndex, "edges", i], message: `Noma’lum bog‘lanish: ${id}` });
      });
    });
  });

export type FlowDiagramConfig = z.infer<typeof flowDiagramConfigSchema>;
export type FlowDiagramConfigInput = z.input<typeof flowDiagramConfigSchema>;
export type FlowNodeConfig = z.infer<typeof flowNodeSchema>;
export type FlowEdgeConfig = z.infer<typeof flowEdgeSchema>;
export type FlowStepConfig = z.infer<typeof flowStepSchema>;

export function flowEdgeId(edge: Pick<FlowEdgeConfig, "id" | "source" | "target">): string {
  return edge.id ?? `${edge.source}->${edge.target}`;
}

// ---------------------------------------------------------------------------
// Function plot (parametric mathematical chart, optional 1D gradient descent)
// ---------------------------------------------------------------------------

export const PLOT_COLORS = ["violet", "cyan", "amber", "emerald", "rose", "sky"] as const;
export type PlotColor = (typeof PLOT_COLORS)[number];

const RESERVED = new Set(["x", "pi", "e"]);
const parameterIdSchema = z
  .string()
  .regex(/^[A-Za-z_][A-Za-z0-9_]*$/, "Parametr nomi identifikator bo‘lishi kerak")
  .refine((id) => !RESERVED.has(id), "x, pi va e nomlari band");

export const plotParameterSchema = z
  .object({
    id: parameterIdSchema,
    label: z.string().min(1).max(60),
    min: z.number(),
    max: z.number(),
    step: z.number().positive(),
    default: z.number(),
    description: z.string().max(400).optional(),
  })
  .strict()
  .refine((p) => p.max > p.min, { message: "max > min bo‘lishi kerak" })
  .refine((p) => p.default >= p.min && p.default <= p.max, { message: "default [min, max] oralig‘ida bo‘lishi kerak" });

export const plotExpressionSchema = z
  .object({
    id: flowIdSchema,
    label: z.string().min(1).max(80),
    /** Expression in x and parameter ids, e.g. "a * x^2 + b". */
    expr: z.string().min(1).max(500),
    color: z.enum(PLOT_COLORS).optional(),
  })
  .strict();

const rangeSchema = z.tuple([z.number(), z.number()]).refine(([a, b]) => b > a, "Oraliq [min, max] bo‘lishi kerak");

export const descentConfigSchema = z
  .object({
    /** Id of the expression to optimise. */
    expression: flowIdSchema,
    start: z.number(),
    learningRate: z
      .object({ min: z.number().positive(), max: z.number().positive(), step: z.number().positive(), default: z.number().positive() })
      .strict(),
    maxIterations: z.number().int().min(1).max(500).default(60),
    stepDurationMs: z.number().int().min(80).max(5000).default(450),
  })
  .strict();

export const functionPlotConfigSchema = z
  .object({
    expressions: z.array(plotExpressionSchema).min(1).max(6),
    parameters: z.array(plotParameterSchema).max(8).default([]),
    xDomain: rangeSchema,
    yDomain: rangeSchema.optional(),
    samples: z.number().int().min(20).max(2000).default(320),
    xLabel: z.string().max(40).optional(),
    yLabel: z.string().max(40).optional(),
    videoSrc: z.string().optional(),
    descent: descentConfigSchema.optional(),
  })
  .strict()
  .superRefine((config, ctx) => {
    const allowed = ["x", ...config.parameters.map((p) => p.id)];
    config.expressions.forEach((expression, index) => {
      const error = validateExpression(expression.expr, allowed);
      if (error) ctx.addIssue({ code: "custom", path: ["expressions", index, "expr"], message: error });
    });
    if (config.descent && !config.expressions.some((e) => e.id === config.descent?.expression)) {
      ctx.addIssue({ code: "custom", path: ["descent", "expression"], message: "descent.expression mavjud ifoda id si bo‘lishi kerak" });
    }
  });

export type FunctionPlotConfig = z.infer<typeof functionPlotConfigSchema>;
export type FunctionPlotConfigInput = z.input<typeof functionPlotConfigSchema>;
export type PlotParameter = z.infer<typeof plotParameterSchema>;

/** Gradient descent instances are function plots that must declare `descent`. */
export const gradientDescentConfigSchema = functionPlotConfigSchema.refine((config) => config.descent !== undefined, {
  message: "gradient-descent turi uchun `descent` konfiguratsiyasi talab qilinadi",
  path: ["descent"],
});

// ---------------------------------------------------------------------------
// Neural network explorer (feedforward architecture, forward pass, layer inspections)
// ---------------------------------------------------------------------------

export const neuralNetworkConfigSchema = z
  .object({
    inputCount: z.number().int().min(1).max(5).default(2),
    hiddenCount: z.number().int().min(1).max(8).default(3),
    outputCount: z.number().int().min(1).max(3).default(1),
    hiddenActivation: z.enum(["relu", "sigmoid", "tanh", "linear"]).default("relu"),
    outputActivation: z.enum(["relu", "sigmoid", "tanh", "linear"]).default("sigmoid"),
    videoSrc: z.string().optional(),
  })
  .strict();

export type NeuralNetworkConfig = z.infer<typeof neuralNetworkConfigSchema>;
export type NeuralNetworkConfigInput = z.input<typeof neuralNetworkConfigSchema>;

// ---------------------------------------------------------------------------
// Attention matrix / Q-K-V explorer
// ---------------------------------------------------------------------------

export const attentionMatrixConfigSchema = z
  .object({
    defaultMode: z.enum(["mini-lab", "matrix"]).default("mini-lab"),
    defaultQuery: z.number().default(1.0),
    dk: z.number().positive().default(1.0),
    videoSrc: z.string().optional(),
  })
  .strict();

export type AttentionMatrixConfig = z.infer<typeof attentionMatrixConfigSchema>;
export type AttentionMatrixConfigInput = z.input<typeof attentionMatrixConfigSchema>;

// ---------------------------------------------------------------------------
// Embedding space / Cosine similarity explorer (Phase 12)
// ---------------------------------------------------------------------------

export const embeddingSpaceConfigSchema = z
  .object({
    ax: z.number().default(1.0),
    ay: z.number().default(0.0),
    bx: z.number().default(1.0),
    by: z.number().default(1.0),
    videoSrc: z.string().optional(),
  })
  .strict();

export type EmbeddingSpaceConfig = z.infer<typeof embeddingSpaceConfigSchema>;

// ---------------------------------------------------------------------------
// RAG sandbox pipeline (Phase 14–16)
// ---------------------------------------------------------------------------

export const ragPipelineConfigSchema = z
  .object({
    defaultChunkSize: z.number().int().min(8).max(120).default(28),
    defaultOverlap: z.number().int().min(0).max(40).default(6),
    defaultTopK: z.number().int().min(1).max(5).default(2),
  })
  .strict();

export type RagPipelineConfig = z.infer<typeof ragPipelineConfigSchema>;
