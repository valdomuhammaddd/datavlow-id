"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";

import { signIn } from "@/lib/auth/actions";

function LoginForm() {
  const search = useSearchParams();
  const next = search.get("next") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      className="glass-panel rounded-xl p-8 w-full max-w-md space-y-5"
      action={(fd) => {
        start(async () => {
          setError(null);
          const res = await signIn(fd);
          if (res?.error) setError(res.error);
        });
      }}
    >
      <div>
        <h1 className="font-headline-md text-headline-md text-primary">
          DATAVLOW.ID
        </h1>
        <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
          OPERATOR LOGIN
        </p>
      </div>

      <input type="hidden" name="next" value={next} />

      <label className="block space-y-1">
        <span className="font-label-caps text-[10px] text-on-surface-variant">
          EMAIL
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none"
          placeholder="admin@datavlow.id"
        />
      </label>

      <label className="block space-y-1">
        <span className="font-label-caps text-[10px] text-on-surface-variant">
          PASSWORD
        </span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
          className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none"
        />
      </label>

      {error ? (
        <p className="text-error-alert text-sm font-label-caps">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold hover:brightness-110 disabled:opacity-50"
      >
        {pending ? "SIGNING IN…" : "SIGN IN"}
      </button>

      <div className="text-sm text-on-surface-variant text-center space-y-2">
        <p>
          Belum punya akun?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Daftar
          </Link>
        </p>
        <p>
          Pertama kali setup?{" "}
          <Link href="/setup" className="text-primary hover:underline">
            Buat admin pertama
          </Link>
        </p>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg-obsidian flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-on-surface-variant">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
