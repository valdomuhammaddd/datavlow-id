import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAudit } from "@/lib/auth/audit";
import { revokeDevice } from "@/lib/devices/service";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    if (!id) return jsonError("device id required", 400);

    const supabase = createAdminClient();
    const result = await revokeDevice(supabase, id);
    if (!result.ok) return jsonError(result.error, result.status);

    await writeAudit("device.revoke", "devices", id, {
      name: result.data.name,
    });

    return jsonOk({ data: result.data });
  } catch (err) {
    console.error("[devices/revoke] error:", err);
    return jsonError("Internal server error", 500);
  }
}
