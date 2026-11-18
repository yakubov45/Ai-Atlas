import type { z } from "zod";
import type { VisualizationType } from "@/lib/content/schema";
import {
  flowDiagramConfigSchema,
  functionPlotConfigSchema,
  gradientDescentConfigSchema,
  neuralNetworkConfigSchema,
  attentionMatrixConfigSchema,
  embeddingSpaceConfigSchema,
  ragPipelineConfigSchema,
  type FlowDiagramConfig,
  type FunctionPlotConfig,
  type NeuralNetworkConfig,
  type AttentionMatrixConfig,
  type EmbeddingSpaceConfig,
  type RagPipelineConfig,
} from "./configs";

/**
 * Server-side config validation for visualization instances.
 * Kept separate from the metadata registry so zod never ships to the client:
 * instances are parsed on the server and passed to client components already typed.
 */

const CONFIG_SCHEMAS: Partial<Record<VisualizationType, z.ZodType>> = {
  "flow-diagram": flowDiagramConfigSchema,
  "function-plot": functionPlotConfigSchema,
  "gradient-descent": gradientDescentConfigSchema,
  "neural-network": neuralNetworkConfigSchema,
  "attention-matrix": attentionMatrixConfigSchema,
  "embedding-space": embeddingSpaceConfigSchema,
  "rag-pipeline": ragPipelineConfigSchema,
};

export interface ParsedVisualizationConfigMap {
  "flow-diagram": FlowDiagramConfig;
  "function-plot": FunctionPlotConfig;
  "gradient-descent": FunctionPlotConfig;
  "neural-network": NeuralNetworkConfig;
  "attention-matrix": AttentionMatrixConfig;
  "embedding-space": EmbeddingSpaceConfig;
  "rag-pipeline": RagPipelineConfig;
}

export type RenderableVisualizationType = keyof ParsedVisualizationConfigMap;

export type ParsedVisualizationConfig =
  | { type: "flow-diagram"; config: FlowDiagramConfig }
  | { type: "function-plot"; config: FunctionPlotConfig }
  | { type: "gradient-descent"; config: FunctionPlotConfig }
  | { type: "neural-network"; config: NeuralNetworkConfig }
  | { type: "attention-matrix"; config: AttentionMatrixConfig }
  | { type: "embedding-space"; config: EmbeddingSpaceConfig }
  | { type: "rag-pipeline"; config: RagPipelineConfig };

export function parseVisualizationConfig(
  type: VisualizationType,
  config: unknown,
): { ok: true; value: ParsedVisualizationConfig } | { ok: false; errors: string[] } {
  const schema = CONFIG_SCHEMAS[type];
  if (!schema) return { ok: false, errors: [`'${type}' moduli hali amalga oshirilmagan (planned)`] };
  const result = schema.safeParse(config);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.issues.map((issue) => `${issue.path.join(".") || "config"}: ${issue.message}`),
    };
  }
  return { ok: true, value: { type, config: result.data } as ParsedVisualizationConfig };
}

export function validateVisualizationConfig(type: VisualizationType, config: unknown): string[] {
  const result = parseVisualizationConfig(type, config);
  return result.ok ? [] : result.errors;
}
