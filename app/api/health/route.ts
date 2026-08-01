import { jsonOk } from "@/lib/api/http";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public liveness + dependency probe for monitoring. */
export async function GET() {
  const started = performance.now();
  let db: "ok" | "error" = "ok";
  let staleMarked = 0;
  let dbError: string | null = null;

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("devices").select("id").limit(1);
    if (error) {
      db = "error";
      dbError = error.message;
    } else {
      const { data } = await supabase.rpc("mark_stale_devices");
      if (typeof data === "number") staleMarked = data;
    }
  } catch (err) {
    db = "error";
    dbError = err instanceof Error ? err.message : "unknown";
  }

  const latency_ms = Math.round((performance.now() - started) * 100) / 100;

  return jsonOk({
    status: db === "ok" ? "healthy" : "degraded",
    service: "datavlow-id",
    time: new Date().toISOString(),
    latency_ms,
    checks: {
      database: db,
      stale_devices_marked: staleMarked,
      error: dbError,
    },
  });
}
