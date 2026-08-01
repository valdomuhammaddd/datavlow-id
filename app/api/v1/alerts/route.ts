import { getSearchParams, jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, toNonEmptyString } from "@/lib/api/validate";
import { writeAudit } from "@/lib/auth/audit";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = getSearchParams(request);
    const limit = Math.min(Number(params.get("limit") ?? 50) || 50, 200);
    const unacked = params.get("unacked") === "1";

    const supabase = createAdminClient();
    let query = supabase
      .from("alert_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (unacked) query = query.eq("acknowledged", false);

    const { data, error } = await query;
    if (error) {
      console.error("[alerts] list failed:", error.message);
      return jsonError("Failed to list alerts", 500);
    }

    const { count } = await supabase
      .from("alert_events")
      .select("*", { count: "exact", head: true })
      .eq("acknowledged", false);

    return jsonOk({ data: data ?? [], open: count ?? 0 });
  } catch (err) {
    console.error("[alerts] GET error:", err);
    return jsonError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;
    if (!isObject(body.data)) {
      return jsonError("Payload must be a JSON object", 400);
    }

    const action = typeof body.data.action === "string" ? body.data.action : "";
    const supabase = createAdminClient();

    if (action === "ack") {
      const id = Number(body.data.id);
      if (!Number.isFinite(id)) return jsonError("id is required", 400);

      const { data, error } = await supabase
        .from("alert_events")
        .update({ acknowledged: true })
        .eq("id", id)
        .select("*")
        .maybeSingle();

      if (error) return jsonError("Failed to acknowledge alert", 500);
      if (!data) return jsonError("Alert not found", 404);

      await writeAudit("alert.ack", "alert_events", String(id));
      return jsonOk({ data });
    }

    if (action === "ack_all") {
      const { error } = await supabase
        .from("alert_events")
        .update({ acknowledged: true })
        .eq("acknowledged", false);

      if (error) return jsonError("Failed to acknowledge alerts", 500);
      await writeAudit("alert.ack_all", "alert_events", "all");
      return jsonOk({ ok: true });
    }

    const message = toNonEmptyString(body.data.message, 500);
    if (!message) return jsonError("message is required", 400);

    const severity =
      body.data.severity === "critical" ||
      body.data.severity === "warning" ||
      body.data.severity === "info"
        ? body.data.severity
        : "info";

    const { data, error } = await supabase
      .from("alert_events")
      .insert({
        message,
        severity,
        device_id: toNonEmptyString(body.data.device_id, 128),
        water_status: toNonEmptyString(body.data.water_status, 64),
      })
      .select("*")
      .single();

    if (error) {
      console.error("[alerts] create failed:", error.message);
      return jsonError("Failed to create alert", 500);
    }

    return jsonOk({ data }, 201);
  } catch (err) {
    console.error("[alerts] POST error:", err);
    return jsonError("Internal server error", 500);
  }
}
