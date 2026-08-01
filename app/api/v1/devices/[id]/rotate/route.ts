import { jsonError, jsonOk } from "@/lib/api/http";
import { writeAudit } from "@/lib/auth/audit";
import { rotateDeviceKey } from "@/lib/devices/service";
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
    const result = await rotateDeviceKey(supabase, id);
    if (!result.ok) return jsonError(result.error, result.status);

    await writeAudit("device.rotate_key", "devices", id, {
      name: result.data.name,
    });

    return jsonOk({
      data: result.data,
      warning: "Update ESP32 firmware / secrets with the new api_key immediately.",
    });
  } catch (err) {
    console.error("[devices/rotate] error:", err);
    return jsonError("Internal server error", 500);
  }
}
