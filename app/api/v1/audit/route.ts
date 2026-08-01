import { getSearchParams, jsonError, jsonOk } from "@/lib/api/http";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const params = getSearchParams(request);
    const limit = Math.min(Number(params.get("limit") ?? 100) || 100, 500);

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[audit] list failed:", error.message);
      return jsonError("Failed to list audit logs", 500);
    }

    return jsonOk({ data: data ?? [] });
  } catch (err) {
    console.error("[audit] GET error:", err);
    return jsonError("Internal server error", 500);
  }
}
