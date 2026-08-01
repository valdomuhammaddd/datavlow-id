"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";
import type {
  WorkflowDefinition,
  WorkflowNode,
  WorkflowNodeType,
  WorkflowTestResult,
} from "@/lib/workflows/types";
import type { WorkflowRow } from "@/types/database.types";

const NODE_TYPES: WorkflowNodeType[] = [
  "sensor_in",
  "condition",
  "ai_threshold",
  "notify",
  "actuator_out",
  "timer",
];

const DEFAULT_DEF: WorkflowDefinition = {
  nodes: [
    {
      id: "n1",
      type: "sensor_in",
      label: "Read Temp",
      config: { field: "temp", defaultValue: 26 },
    },
    {
      id: "n2",
      type: "condition",
      label: "Temp > 28?",
      config: { field: "temp", op: ">", threshold: 28 },
    },
    {
      id: "n3",
      type: "notify",
      label: "Telegram Alert",
      config: { channel: "telegram", message: "High temperature" },
    },
  ],
  edges: [
    { id: "e1", source: "n1", target: "n2" },
    { id: "e2", source: "n2", target: "n3", port: "true" },
  ],
};

export function LogicBuilder() {
  const { t } = useGlobalUI();
  const [workflows, setWorkflows] = useState<WorkflowRow[]>([]);
  const [name, setName] = useState("Alert on High Temp");
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [definition, setDefinition] = useState<WorkflowDefinition>(DEFAULT_DEF);
  const [testResult, setTestResult] = useState<WorkflowTestResult | null>(null);
  const [inputs, setInputs] = useState({ temp: 29, ph: 7.1, tds: 320 });
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const load = useCallback(async () => {
    const res = await fetch("/api/v1/workflows", { cache: "no-store" });
    if (!res.ok) return;
    const json = (await res.json()) as { data: WorkflowRow[] };
    setWorkflows(json.data ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const nodeCount = useMemo(() => definition.nodes.length, [definition.nodes]);

  const addNode = (type: WorkflowNodeType) => {
    const id = `n${Date.now().toString(36)}`;
    const node: WorkflowNode = {
      id,
      type,
      label: type.replace("_", " ").toUpperCase(),
      config:
        type === "sensor_in"
          ? { field: "ph", defaultValue: 7 }
          : type === "condition" || type === "ai_threshold"
            ? { field: "ph", op: "<", threshold: 6.5 }
            : { message: "Notify operator" },
    };
    setDefinition((prev) => {
      const last = prev.nodes[prev.nodes.length - 1];
      return {
        nodes: [...prev.nodes, node],
        edges: last
          ? [
              ...prev.edges,
              {
                id: `e${id}`,
                source: last.id,
                target: id,
                port: last.type === "condition" ? "true" : "default",
              },
            ]
          : prev.edges,
      };
    });
  };

  const save = (status: "draft" | "live" = "draft") => {
    start(async () => {
      setError(null);
      const res = await fetch("/api/v1/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          id: workflowId ?? undefined,
          name,
          status,
          definition,
        }),
      });
      const json = (await res.json()) as { data?: WorkflowRow; error?: string };
      if (!res.ok) {
        setError(json.error ?? "Save failed");
        return;
      }
      setWorkflowId(json.data?.id ?? null);
      await load();
    });
  };

  const runTest = () => {
    start(async () => {
      setError(null);
      const res = await fetch("/api/v1/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          definition,
          inputs,
        }),
      });
      const json = (await res.json()) as {
        result?: WorkflowTestResult;
        error?: string;
      };
      if (!res.ok) {
        setError(json.error ?? "Test failed");
        return;
      }
      setTestResult(json.result ?? null);
    });
  };

  const openWorkflow = (row: WorkflowRow) => {
    setWorkflowId(row.id);
    setName(row.name);
    const def = row.definition as unknown as WorkflowDefinition;
    if (def?.nodes) setDefinition(def);
  };

  return (
    <AppShell>
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {t("logicBuilder")}
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Build IF/THEN automation graphs · {nodeCount} nodes
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => save("draft")}
            className="px-4 py-2 rounded-lg border border-border-glass font-label-caps text-xs"
          >
            SAVE DRAFT
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => save("live")}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-caps text-xs font-bold"
          >
            PUBLISH LIVE
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={runTest}
            className="px-4 py-2 rounded-lg bg-surface-container text-primary font-label-caps text-xs"
          >
            DRY-RUN TEST
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary"
          />

          <div className="flex flex-wrap gap-2">
            {NODE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => addNode(type)}
                className="px-3 py-1.5 rounded-lg border border-border-glass text-[10px] font-label-caps hover:border-primary"
              >
                + {type}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {definition.nodes.map((node, idx) => (
              <div key={node.id} className="glass-panel rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-caps text-[10px] text-primary">
                    STEP {idx + 1} · {node.type}
                  </span>
                  <button
                    type="button"
                    className="text-error-alert text-xs"
                    onClick={() =>
                      setDefinition((prev) => ({
                        nodes: prev.nodes.filter((n) => n.id !== node.id),
                        edges: prev.edges.filter(
                          (e) => e.source !== node.id && e.target !== node.id,
                        ),
                      }))
                    }
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={node.label}
                  onChange={(e) =>
                    setDefinition((prev) => ({
                      ...prev,
                      nodes: prev.nodes.map((n) =>
                        n.id === node.id ? { ...n, label: e.target.value } : n,
                      ),
                    }))
                  }
                  className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2 text-sm mb-2"
                />
                <pre className="text-xs font-data-mono text-on-surface-variant overflow-x-auto">
                  {JSON.stringify(node.config, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="glass-panel rounded-xl p-4 space-y-3">
            <h3 className="font-label-caps text-[10px] text-on-surface-variant">
              TEST INPUTS
            </h3>
            {(["temp", "ph", "tds"] as const).map((key) => (
              <label key={key} className="block text-xs space-y-1">
                <span className="uppercase text-on-surface-variant">{key}</span>
                <input
                  type="number"
                  value={inputs[key]}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      [key]: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2"
                />
              </label>
            ))}
          </div>

          {testResult ? (
            <div className="glass-panel rounded-xl p-4 space-y-2">
              <h3 className="font-label-caps text-[10px] text-primary">
                DRY-RUN · {testResult.ops} OPS ·{" "}
                {testResult.success ? "OK" : "FAIL"}
              </h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {testResult.steps.map((step) => (
                  <li
                    key={`${step.nodeId}-${step.detail}`}
                    className="text-xs border-b border-border-glass pb-2"
                  >
                    <span className="text-primary">{step.result}</span> ·{" "}
                    {step.label}
                    <div className="text-on-surface-variant">{step.detail}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="glass-panel rounded-xl p-4">
            <h3 className="font-label-caps text-[10px] text-on-surface-variant mb-3">
              LIBRARY ({workflows.length})
            </h3>
            <ul className="space-y-2 max-h-72 overflow-y-auto">
              {workflows.map((w) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => openWorkflow(w)}
                    className="w-full text-left text-sm hover:text-primary"
                  >
                    {w.name}
                    <span className="block text-[10px] text-on-surface-variant uppercase">
                      {w.status} · v{w.version}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {error ? (
            <p className="text-error-alert text-sm font-label-caps">{error}</p>
          ) : null}
        </aside>
      </div>
    </AppShell>
  );
}
