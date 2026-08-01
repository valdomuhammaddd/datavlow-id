"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { signUp } from "@/lib/auth/actions";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <main className="min-h-screen bg-bg-obsidian flex items-center justify-center p-6">
      <form
        className="glass-panel rounded-xl p-8 w-full max-w-md space-y-5"
        action={(fd) => {
          start(async () => {
            setError(null);
            setInfo(null);
            const res = await signUp(fd);
            if (res?.error) setError(res.error);
            else if (res?.needsConfirmation && res.message) setInfo(res.message);
          });
        }}
      >
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">
            DATAVLOW.ID
          </h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            CREATE OPERATOR ACCOUNT
          </p>
        </div>

        <label className="block space-y-1">
          <span className="font-label-caps text-[10px] text-on-surface-variant">
            DISPLAY NAME
          </span>
          <input
            name="display_name"
            type="text"
            className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none"
            placeholder="Operator Lab"
          />
        </label>

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
            autoComplete="new-password"
            className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm focus:border-primary outline-none"
          />
        </label>

        {error ? (
          <p className="text-error-alert text-sm font-label-caps">{error}</p>
        ) : null}
        {info ? (
          <p className="text-tertiary-container text-sm">{info}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold hover:brightness-110 disabled:opacity-50"
        >
          {pending ? "CREATING…" : "CREATE ACCOUNT"}
        </button>

        <p className="text-sm text-on-surface-variant text-center">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
          {" · "}
          <Link href="/setup" className="text-primary hover:underline">
            First setup
          </Link>
        </p>
      </form>
    </main>
  );
}
