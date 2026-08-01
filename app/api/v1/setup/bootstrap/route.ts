import { jsonError, jsonOk, parseJsonBody } from "@/lib/api/http";
import { isObject, toNonEmptyString } from "@/lib/api/validate";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** One-time first-operator bootstrap when no profiles exist yet. */
export async function GET() {
  try {
    const admin = createAdminClient();
    const { count, error } = await admin
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (error) {
      // Table missing → treat as needs setup
      return jsonOk({ needsSetup: true, reason: error.message });
    }

    return jsonOk({ needsSetup: (count ?? 0) === 0 });
  } catch (err) {
    console.error("[setup/bootstrap] GET:", err);
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

    const email = toNonEmptyString(body.data.email, 200);
    const password = toNonEmptyString(body.data.password, 200);
    const displayName =
      toNonEmptyString(body.data.display_name, 120) ?? "Operator";

    if (!email || !password) {
      return jsonError("email and password are required", 400);
    }
    if (password.length < 8) {
      return jsonError("Password must be at least 8 characters", 400);
    }

    const admin = createAdminClient();
    const { count, error: countError } = await admin
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (!countError && (count ?? 0) > 0) {
      return jsonError(
        "Setup already completed. Use /login or /signup.",
        409,
      );
    }

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: displayName, role: "admin" },
    });

    if (error || !data.user) {
      console.error("[setup/bootstrap] createUser:", error?.message);
      return jsonError(error?.message ?? "Failed to create operator", 500);
    }

    await admin.from("profiles").upsert({
      id: data.user.id,
      email,
      display_name: displayName,
      role: "admin",
    });

    // Seed default site if empty
    const { count: siteCount } = await admin
      .from("sites")
      .select("*", { count: "exact", head: true });
    if ((siteCount ?? 0) === 0) {
      await admin.from("sites").insert({
        name: "Indonesia Central",
        region: "Sector-7G",
      });
    }

    return jsonOk({
      ok: true,
      email,
      message: "Operator admin created. You can sign in now.",
    });
  } catch (err) {
    console.error("[setup/bootstrap] POST:", err);
    return jsonError("Internal server error", 500);
  }
}
