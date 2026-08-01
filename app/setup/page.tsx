"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function SetupPage() {
  const router = useRouter();
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("Operator Admin");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/v1/setup/bootstrap", { cache: "no-store" });
      const json = (await res.json()) as { needsSetup?: boolean };
      setNeedsSetup(Boolean(json.needsSetup));
    })();
  }, []);

  const create = () => {
    start(async () => {
      setError(null);
      const res = await fetch("/api/v1/setup/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          display_name: displayName,
        }),
      });
      const json = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(json.error ?? "Setup failed");
        return;
      }
      setDone(true);
      window.setTimeout(() => router.push("/login"), 1200);
    });
  };

  return (
    <main className="min-h-screen bg-bg-obsidian flex items-center justify-center p-6">
      <div className="glass-panel rounded-xl p-8 w-full max-w-md space-y-5">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary">
            DATAVLOW.ID
          </h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            FIRST OPERATOR SETUP
          </p>
        </div>

        {needsSetup === null ? (
          <p className="text-sm text-on-surface-variant">Checking platform…</p>
        ) : null}

        {needsSetup === false && !done ? (
          <div className="space-y-3">
            <p className="text-sm text-on-surface-variant">
              Akun operator sudah ada. Lanjut ke login atau daftar tambahan.
            </p>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="flex-1 text-center py-3 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold"
              >
                SIGN IN
              </Link>
              <Link
                href="/signup"
                className="flex-1 text-center py-3 rounded-lg border border-border-glass font-label-caps"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        ) : null}

        {needsSetup && !done ? (
          <>
            <p className="text-sm text-on-surface-variant">
              Buat akun admin pertama. Halaman ini terkunci otomatis setelah
              berhasil.
            </p>
            <label className="block space-y-1">
              <span className="font-label-caps text-[10px] text-on-surface-variant">
                DISPLAY NAME
              </span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block space-y-1">
              <span className="font-label-caps text-[10px] text-on-surface-variant">
                EMAIL
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="admin@datavlow.id"
              />
            </label>
            <label className="block space-y-1">
              <span className="font-label-caps text-[10px] text-on-surface-variant">
                PASSWORD
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                className="w-full bg-bg-obsidian border border-border-glass rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
            {error ? (
              <p className="text-error-alert text-sm font-label-caps">{error}</p>
            ) : null}
            <button
              type="button"
              disabled={pending || !email || password.length < 8}
              onClick={create}
              className="w-full py-3 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold disabled:opacity-50"
            >
              {pending ? "CREATING…" : "CREATE ADMIN ACCOUNT"}
            </button>
          </>
        ) : null}

        {done ? (
          <p className="text-success-glow text-sm font-label-caps">
            Admin siap. Mengalihkan ke login…
          </p>
        ) : null}
      </div>
    </main>
  );
}
