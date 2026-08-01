import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, toNonEmptyString } from "@/lib/api/validate";
import { pingDevice } from "@/lib/devices/service";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Re-ping a device: measures latency and updates last_ping / status / health.
 * Body: { device_id: uuid } or { api_key: string }
 */
export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    if (!body.ok) return body.response;
    if (!isObject(body.data)) {
      return jsonError("Payload must be a JSON object", 400);
    }

    const supabase = createAdminClient();
    let deviceId = toNonEmptyString(body.data.device_id, 64);

    if (!deviceId) {
      const apiKey = toNonEmptyString(body.data.api_key, 128);
      if (!apiKey) {
        return jsonError("device_id or api_key is required", 400);
      }

      const { data: device, error } = await supabase
        .from("devices")
        .select("id")
        .eq("api_key", apiKey)
        .maybeSingle();

      if (error) return jsonError("Device lookup failed", 503);
      if (!device) return jsonError("Device not found", 404);
      deviceId = device.id;
    }

    const result = await pingDevice(supabase, deviceId);
    if (!result.ok) {
      return jsonError(result.error, result.status);
    }

    await supabase
      .from("devices")
      .update({
        latency_ms: result.latency_ms,
        health: result.health,
      })
      .eq("id", deviceId);

    return jsonOk({
      device: result.device,
      latency_ms: result.latency_ms,
      last_ping: result.last_ping,
      health: result.health,
    });
  } catch (err) {
    console.error("[devices/ping] unhandled error:", err);
    return jsonError("Internal server error", 500);
  }
}
