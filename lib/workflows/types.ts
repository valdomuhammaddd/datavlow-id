export type WorkflowNodeType =
  | "sensor_in"
  | "timer"
  | "condition"
  | "loop"
  | "actuator_out"
  | "notify"
  | "webhook"
  | "ai_threshold";

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  label: string;
  config: Record<string, unknown>;
  position?: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  /** For condition nodes: true | false branch */
  port?: "true" | "false" | "default";
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface WorkflowRecord {
  id: string;
  name: string;
  status: "draft" | "live" | "archived";
  definition: WorkflowDefinition;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface WorkflowTestContext {
  /** Simulated sensor bag, e.g. { temp: 26.4, ph: 7.1 } */
  inputs?: Record<string, number | string | boolean>;
}

export interface WorkflowTestStep {
  nodeId: string;
  label: string;
  type: WorkflowNodeType;
  result: "passed" | "skipped" | "triggered" | "failed";
  detail: string;
}

export interface WorkflowTestResult {
  success: boolean;
  ops: number;
  steps: WorkflowTestStep[];
  outputs: Array<Record<string, unknown>>;
}
