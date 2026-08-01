"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAudit } from "@/lib/auth/audit";
import { safeNextPath } from "@/lib/auth/safe-next";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  await writeAudit("auth.login", "user", email);
  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName || email.split("@")[0],
        role: "operator",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user?.id) {
    try {
      const admin = createAdminClient();
      await admin.from("profiles").upsert({
        id: data.user.id,
        email,
        display_name: displayName || email.split("@")[0],
        role: "operator",
      });
    } catch {
      // Profile trigger may already handle this
    }
  }

  await writeAudit("auth.signup", "user", email);

  if (!data.session) {
    return {
      error: null,
      needsConfirmation: true,
      message:
        "Akun dibuat. Jika email confirmation aktif di Supabase, cek inbox lalu login. Atau nonaktifkan Confirm email di Auth settings untuk masuk langsung.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await writeAudit("auth.logout", "user", "self");
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
