import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/types/database.types";

/** Persist an audit row; never throws to callers. */
export async function writeAudit(
  action: string,
  entity: string,
  entityId?: string | null,
  meta: Record<string, unknown> = {},
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();
    await admin.from("audit_logs").insert({
      actor_id: user?.id ?? null,
      action,
      entity,
      entity_id: entityId ?? null,
      meta: meta as Json,
    });
  } catch {
    // Never block primary flow on audit failure
  }
}
