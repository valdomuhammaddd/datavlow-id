import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, toNonEmptyString } from "@/lib/api/validate";
import { writeAudit } from "@/lib/auth/audit";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("sites")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[sites] list failed:", error.message);
      return jsonError("Failed to list sites", 500);
    }

    return jsonOk({ data: data ?? [] });
  } catch (err) {
    console.error("[sites] GET error:", err);
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

    const name = toNonEmptyString(body.data.name, 160);
    if (!name) return jsonError("name is required", 400);
    const region = toNonEmptyString(body.data.region, 120) ?? "Sector-7G";

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("sites")
      .insert({ name, region })
      .select("*")
      .single();

    if (error) {
      console.error("[sites] create failed:", error.message);
      return jsonError("Failed to create site", 500);
    }

    await writeAudit("site.create", "sites", data.id, { name, region });
    return jsonOk({ data }, 201);
  } catch (err) {
    console.error("[sites] POST error:", err);
    return jsonError("Internal server error", 500);
  }
}
