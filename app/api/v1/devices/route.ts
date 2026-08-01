import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, toNonEmptyString } from "@/lib/api/validate";
import { writeAudit } from "@/lib/auth/audit";
import { listDevices, registerDevice } from "@/lib/devices/service";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** List fleet devices for Device Management UI. */
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await listDevices(supabase);

    if (error) {
      console.error("[devices] list failed:", error.message);
      return jsonError("Failed to list devices", 500);
    }

    const devices = data ?? [];
    const summary = {
      total: devices.length,
      online: devices.filter((d) => d.status === "online").length,
      offline: devices.filter((d) => d.status === "offline").length,
      error: devices.filter((d) => d.status === "error").length,
    };

    return jsonOk({ data: devices, summary });
  } catch (err) {
    console.error("[devices] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}

/** Device registration wizard. */
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;
    if (!isObject(body.data)) {
      return jsonError("Payload must be a JSON object", 400);
    }

    const name = toNonEmptyString(body.data.name, 120);
    if (!name) return jsonError("name is required", 400);

    const api_key = toNonEmptyString(body.data.api_key, 128) ?? undefined;
    const site_id = toNonEmptyString(body.data.site_id, 64) ?? null;
    const notes = toNonEmptyString(body.data.notes, 500) ?? null;

    const supabase = createAdminClient();
    const { data, error } = await registerDevice(supabase, {
      name,
      api_key,
      site_id,
      notes,
    });

    if (error) {
      console.error("[devices] register failed:", error.message);
      const conflict = error.message.toLowerCase().includes("duplicate");
      return jsonError(
        conflict ? "api_key already registered" : "Failed to register device",
        conflict ? 409 : 500,
      );
    }

    await writeAudit("device.register", "devices", data.id, { name });
    return jsonOk({ data }, 201);
  } catch (err) {
    console.error("[devices] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}
