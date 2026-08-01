import type {
  WorkflowDefinition,
  WorkflowNode,
  WorkflowTestContext,
  WorkflowTestResult,
  WorkflowTestStep,
} from "@/lib/workflows/types";

/**
 * Dry-run IF/THEN automation graph without side effects.
 */
export function runTestWorkflow(
  definition: WorkflowDefinition,
  context: WorkflowTestContext = {},
): WorkflowTestResult {
  const inputs = context.inputs ?? {};
  const nodesById = new Map(definition.nodes.map((n) => [n.id, n]));
  const outgoing = new Map<string, typeof definition.edges>();

  for (const edge of definition.edges) {
    const list = outgoing.get(edge.source) ?? [];
    list.push(edge);
    outgoing.set(edge.source, list);
  }

  const roots = definition.nodes.filter(
    (n) => !definition.edges.some((e) => e.target === n.id),
  );

  const steps: WorkflowTestStep[] = [];
  const outputs: Array<Record<string, unknown>> = [];
  let ops = 0;

  const visit = (node: WorkflowNode, bag: Record<string, unknown>) => {
    ops += 1;
    const local = { ...bag };

    switch (node.type) {
      case "sensor_in": {
        const key = String(node.config.field ?? "temp");
        const value = inputs[key] ?? node.config.defaultValue ?? null;
        local[key] = value;
        steps.push({
          nodeId: node.id,
          label: node.label,
          type: node.type,
          result: "passed",
          detail: `Read ${key}=${String(value)}`,
        });
        break;
      }
      case "timer": {
        steps.push({
          nodeId: node.id,
          label: node.label,
          type: node.type,
          result: "passed",
          detail: `CRON/timer ok (${String(node.config.cron ?? "* * * * *")})`,
        });
        break;
      }
      case "condition":
      case "ai_threshold": {
        const field = String(node.config.field ?? "temp");
        const op = String(node.config.op ?? ">");
        const threshold = Number(node.config.threshold ?? 0);
        const value = Number(local[field] ?? inputs[field] ?? NaN);
        const passed = compare(value, op, threshold);

        steps.push({
          nodeId: node.id,
          label: node.label,
          type: node.type,
          result: passed ? "triggered" : "skipped",
          detail: `IF ${field} ${op} ${threshold} → ${passed} (value=${value})`,
        });

        const edges = outgoing.get(node.id) ?? [];
        const next = edges.find((e) =>
          passed ? e.port === "true" || !e.port : e.port === "false",
        );
        if (next) {
          const target = nodesById.get(next.target);
          if (target) visit(target, local);
        }
        return;
      }
      case "loop": {
        const times = Number(node.config.times ?? 1);
        steps.push({
          nodeId: node.id,
          label: node.label,
          type: node.type,
          result: "passed",
          detail: `Loop x${times} (dry-run once)`,
        });
        break;
      }
      case "actuator_out":
      case "webhook":
      case "notify": {
        const action = {
          type: node.type,
          target: node.config.target ?? node.config.url ?? "default",
          payload: node.config.payload ?? local,
        };
        outputs.push(action);
        steps.push({
          nodeId: node.id,
          label: node.label,
          type: node.type,
          result: "triggered",
          detail: `Would execute ${node.type} → ${String(action.target)}`,
        });
        break;
      }
      default: {
        steps.push({
          nodeId: node.id,
          label: node.label,
          type: node.type,
          result: "failed",
          detail: "Unknown node type",
        });
      }
    }

    for (const edge of outgoing.get(node.id) ?? []) {
      if (edge.port && edge.port !== "default") continue;
      const target = nodesById.get(edge.target);
      if (target) visit(target, local);
    }
  };

  if (!roots.length && definition.nodes[0]) {
    visit(definition.nodes[0], {});
  } else {
    for (const root of roots) visit(root, {});
  }

  const success = steps.every((s) => s.result !== "failed");
  return { success, ops, steps, outputs };
}

function compare(value: number, op: string, threshold: number): boolean {
  if (!Number.isFinite(value)) return false;
  switch (op) {
    case ">":
      return value > threshold;
    case ">=":
      return value >= threshold;
    case "<":
      return value < threshold;
    case "<=":
      return value <= threshold;
    case "==":
    case "=":
      return value === threshold;
    case "!=":
      return value !== threshold;
    default:
      return false;
  }
}

export function assertWorkflowDefinition(
  value: unknown,
): { ok: true; data: WorkflowDefinition } | { ok: false; error: string } {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "definition must be an object" };
  }
  const def = value as WorkflowDefinition;
  if (!Array.isArray(def.nodes) || !Array.isArray(def.edges)) {
    return { ok: false, error: "definition.nodes and definition.edges required" };
  }
  return { ok: true, data: def };
}
