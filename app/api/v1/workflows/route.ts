import { getSearchParams, jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, toNonEmptyString } from "@/lib/api/validate";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  assertWorkflowDefinition,
  runTestWorkflow,
} from "@/lib/workflows/engine";
import type { Json } from "@/types/database.types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** List workflows (Logic Builder library / history). */
export async function GET(request: Request) {
  try {
    const id = getSearchParams(request).get("id");
    const supabase = createAdminClient();

    if (id) {
      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) return jsonError("Failed to load workflow", 500);
      if (!data) return jsonError("Workflow not found", 404);
      return jsonOk({ data });
    }

    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("[workflows] list failed:", error.message);
      return jsonError("Failed to list workflows", 500);
    }

    return jsonOk({ data: data ?? [] });
  } catch (err) {
    console.error("[workflows] GET error:", err);
    return jsonError("Internal server error", 500);
  }
}

/**
 * Save / create workflow OR dry-run test.
 *
 * Body actions:
 * - { action: "save", name, definition, status?, id? }
 * - { action: "test", definition, inputs? }  → runTestWorkflow
 */
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;
    if (!isObject(body.data)) {
      return jsonError("Payload must be a JSON object", 400);
    }

    const action =
      typeof body.data.action === "string" ? body.data.action : "save";

    if (action === "test") {
      const defResult = assertWorkflowDefinition(body.data.definition);
      if (!defResult.ok) return jsonError(defResult.error, 400);

      const inputs =
        isObject(body.data.inputs)
          ? (body.data.inputs as Record<string, number | string | boolean>)
          : undefined;

      const result = runTestWorkflow(defResult.data, { inputs });
      return jsonOk({
        action: "test",
        result,
      });
    }

    if (action !== "save") {
      return jsonError("action must be save | test", 400);
    }

    const name = toNonEmptyString(body.data.name, 160);
    if (!name) return jsonError("name is required", 400);

    const defResult = assertWorkflowDefinition(body.data.definition);
    if (!defResult.ok) return jsonError(defResult.error, 400);

    const status =
      body.data.status === "live" ||
      body.data.status === "archived" ||
      body.data.status === "draft"
        ? body.data.status
        : "draft";

    const supabase = createAdminClient();
    const id = toNonEmptyString(body.data.id, 64);
    const now = new Date().toISOString();

    if (id) {
      const { data: existing } = await supabase
        .from("workflows")
        .select("version")
        .eq("id", id)
        .maybeSingle();

      const { data, error } = await supabase
        .from("workflows")
        .update({
          name,
          status,
          definition: defResult.data as unknown as Json,
          version: (existing?.version ?? 0) + 1,
          updated_at: now,
        })
        .eq("id", id)
        .select("*")
        .single();

      if (error) {
        console.error("[workflows] update failed:", error.message);
        return jsonError("Failed to save workflow", 500);
      }

      return jsonOk({ data, action: "save" });
    }

    const { data, error } = await supabase
      .from("workflows")
      .insert({
        name,
        status,
        definition: defResult.data as unknown as Json,
        version: 1,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) {
      console.error("[workflows] create failed:", error.message);
      return jsonError("Failed to create workflow", 500);
    }

    return jsonOk({ data, action: "save" }, 201);
  } catch (err) {
    console.error("[workflows] POST error:", err);
    return jsonError("Internal server error", 500);
  }
}
