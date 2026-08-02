"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=2400&q=80";

const PIPELINE = [
  {
    step: "01",
    title: "Ingest ESP32",
    body: "Node kirim ph, tds, turbidity, temp lewat POST /api/v1/telemetry dengan api_key perangkat.",
  },
  {
    step: "02",
    title: "Fuzzy Mamdani",
    body: "Skor kualitas air dihitung di edge/server → status Baik / Cukup Baik / Tidak Baik + action message.",
  },
  {
    step: "03",
    title: "Supabase Realtime",
    body: "Insert telemetry_logs langsung muncul di Command Center KPI, banner, dan kinetic chart.",
  },
  {
    step: "04",
    title: "Operasi & Alert",
    body: "Fleet health, audit, alert events, export ledger, dan automation dry-run siap dipakai operator.",
  },
] as const;

const MODULES = [
  {
    href: "/dashboard",
    icon: "dashboard",
    title: "Precision Telemetry",
    body: "Live KPI pH · TDS · turbidity · suhu, status fuzzy, dan gelombang kinetik realtime.",
  },
  {
    href: "/devices",
    icon: "router",
    title: "Device Fleet",
    body: "Register node, salin API key, ping latency, rotate/revoke key, pantau online/offline.",
  },
  {
    href: "/analytics",
    icon: "analytics",
    title: "Historical Ledger",
    body: "Tabel telemetri live, filter status, export CSV / JSON / PDF untuk pelaporan.",
  },
  {
    href: "/logic",
    icon: "account_tree",
    title: "Logic Builder",
    body: "Susun IF/THEN automation, simpan draft/live, dry-run tanpa side-effect.",
  },
  {
    href: "/simulation",
    icon: "developer_board",
    title: "Hardware Simulation",
    body: "LCD 16x2 virtual + sample nominal/alert yang ikut mengisi telemetry_logs.",
  },
  {
    href: "/settings",
    icon: "settings",
    title: "Sites · Alerts · Audit",
    body: "Multi-site, acknowledge alert, jejak audit operator, probe /api/health.",
  },
] as const;

export function LandingPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-bg-obsidian text-on-surface overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-margin-desktop h-16 border-b border-border-glass bg-bg-obsidian/70 backdrop-blur-xl">
        <span className="font-headline-md text-primary tracking-tighter font-bold">
          DATAVLOW.ID
        </span>
        <nav className="flex items-center gap-3">
          <a
            href="#pipeline"
            className="hidden sm:inline font-label-caps text-[11px] text-on-surface-variant hover:text-primary"
          >
            PIPELINE
          </a>
          <a
            href="#modules"
            className="hidden sm:inline font-label-caps text-[11px] text-on-surface-variant hover:text-primary"
          >
            MODULES
          </a>
          <Link
            href="/login"
            className="font-label-caps text-[11px] px-4 py-2 rounded-lg border border-border-glass hover:border-primary/50 transition-colors"
          >
            SIGN IN
          </Link>
          <Link
            href="/setup"
            className="font-label-caps text-[11px] px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition"
          >
            START
          </Link>
        </nav>
      </header>

      {/* Hero — one composition: brand, headline, sentence, CTAs, full-bleed visual */}
      <section className="relative min-h-[100svh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          role="img"
          aria-label="Industrial water instrumentation and telemetry field hardware"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-bg-obsidian/85 to-bg-obsidian/40" />
        <div className="absolute inset-0 kinetic-grid opacity-30 pointer-events-none" />

        <div
          className={`relative z-10 w-full px-margin-desktop pb-16 pt-28 max-w-5xl transition-all duration-700 ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-label-caps text-label-caps text-primary-container tracking-[0.25em] mb-4">
            IoT WATER QUALITY PaaS
          </p>
          <h1 className="font-display-lg text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-tighter text-primary mb-5">
            DATAVLOW.ID
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8">
            Command center telemetri kualitas air realtime — dari sensor ESP32
            hingga keputusan operator, dalam satu alur yang bisa diaudit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold hover:brightness-110 transition glow-cyan"
            >
              BUAT AKUN OPERATOR
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border-glass font-label-caps hover:border-primary/50 transition"
            >
              MASUK COMMAND CENTER
            </Link>
          </div>
        </div>
      </section>

      <section className="px-margin-desktop py-20 border-t border-border-glass">
        <p className="font-label-caps text-[11px] text-on-surface-variant mb-3">
          APA ITU DATAVLOW
        </p>
        <h2 className="font-headline-md text-headline-md text-on-surface max-w-3xl mb-4">
          Platform operasional untuk memantau kualitas air berbasis IoT
        </h2>
        <p className="max-w-3xl text-on-surface-variant leading-relaxed">
          DATAVLOW.ID menghubungkan perangkat lapangan (ESP32 + sensor pH, TDS,
          turbidity, suhu) ke backend Next.js + Supabase. Data diingest aman
          dengan API key, diklasifikasi Fuzzy Mamdani, disimpan dengan retensi
          terkontrol, lalu ditampilkan live di Precision Telemetry — siap untuk
          analitik, alert, dan otomasi.
        </p>
      </section>

      <section
        id="pipeline"
        className="px-margin-desktop py-20 border-t border-border-glass"
      >
        <p className="font-label-caps text-[11px] text-primary mb-3">
          PIPELINE
        </p>
        <h2 className="font-headline-md text-headline-md mb-10 max-w-2xl">
          Empat tahap dari sensor ke keputusan
        </h2>
        <ol className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
          {PIPELINE.map((item) => (
            <li key={item.step}>
              <span className="font-data-mono text-primary-container text-sm">
                {item.step}
              </span>
              <h3 className="font-headline-md text-xl mt-2 mb-2">{item.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="modules"
        className="px-margin-desktop py-20 border-t border-border-glass"
      >
        <p className="font-label-caps text-[11px] text-primary mb-3">
          COMMAND CENTER MODULES
        </p>
        <h2 className="font-headline-md text-headline-md mb-4 max-w-2xl">
          Semua modul operator dalam satu shell
        </h2>
        <p className="text-on-surface-variant max-w-2xl mb-10 text-sm leading-relaxed">
          Setelah login, navigasi sidebar membawa Anda ke setiap fungsi. Modul
          dilindungi session; endpoint ingest ESP32 tetap publik dengan API key.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {MODULES.map((mod) => (
            <li key={mod.href} className="border-t border-border-glass pt-5">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <span className="material-symbols-outlined">{mod.icon}</span>
                <h3 className="font-label-caps text-label-caps">{mod.title}</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                {mod.body}
              </p>
              <Link
                href={mod.href}
                className="font-label-caps text-[10px] text-primary hover:underline"
              >
                BUKA →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-margin-desktop py-20 border-t border-border-glass">
        <p className="font-label-caps text-[11px] text-primary mb-3">
          ALUR OPERATOR
        </p>
        <h2 className="font-headline-md text-headline-md mb-8">
          Mulai dari nol hingga node hidup
        </h2>
        <ol className="max-w-2xl space-y-6 text-sm text-on-surface-variant leading-relaxed">
          <li>
            <span className="text-on-surface font-medium">1. Setup admin</span>
            {" — "}
            Buka <Link href="/setup" className="text-primary hover:underline">/setup</Link>{" "}
            untuk membuat akun operator pertama (sekali saja).
          </li>
          <li>
            <span className="text-on-surface font-medium">2. Register device</span>
            {" — "}
            Di Devices, generate API key dan tanamkan ke firmware ESP32.
          </li>
          <li>
            <span className="text-on-surface font-medium">3. Stream telemetry</span>
            {" — "}
            POST ke <code className="font-data-mono text-primary text-xs">/api/v1/telemetry</code>{" "}
            atau uji lewat Simulation Center.
          </li>
          <li>
            <span className="text-on-surface font-medium">4. Operasikan</span>
            {" — "}
            Pantau dashboard live, ledger, alert, logic, dan audit di Settings.
          </li>
        </ol>
      </section>

      <section className="px-margin-desktop py-20 border-t border-border-glass">
        <p className="font-label-caps text-[11px] text-primary mb-3">STACK</p>
        <h2 className="font-headline-md text-headline-md mb-4">
          Fondasi teknis yang dipakai produksi
        </h2>
        <p className="max-w-3xl text-on-surface-variant text-sm leading-relaxed mb-6">
          Next.js App Router · Supabase Auth / Postgres / Realtime · Fuzzy
          Mamdani · Tailwind glass/obsidian dari DESAINUI · Vercel deploy ·
          retensi telemetri 7 hari · offline detector cron · RLS authenticated
          reads.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-data-mono text-xs text-primary-container/90">
          <span>ESP32 → HTTPS</span>
          <span>ingest_telemetry RPC</span>
          <span>postgres_changes INSERT</span>
          <span>mark_stale_devices</span>
          <span>audit_logs</span>
        </div>
      </section>

      <section className="relative px-margin-desktop py-24 border-t border-border-glass overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div
          className={`relative max-w-3xl transition-all duration-700 ${
            ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="font-headline-md text-[clamp(1.75rem,4vw,2.5rem)] tracking-tight mb-4">
            Siap menjalankan Command Center Anda
          </h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            Buat akun admin, daftarkan node pertama, dan lihat kualitas air
            bergerak realtime di DATAVLOW.ID.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/setup"
              className="px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold hover:brightness-110"
            >
              SETUP PERTAMA
            </Link>
            <Link
              href="/help"
              className="px-6 py-3.5 rounded-lg border border-border-glass font-label-caps hover:border-primary/40"
            >
              BACA QUICKSTART
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-margin-desktop py-10 border-t border-border-glass flex flex-col sm:flex-row justify-between gap-4 text-xs text-on-surface-variant">
        <span className="font-headline-md text-primary tracking-tight">
          DATAVLOW.ID
        </span>
        <span className="font-label-caps">
          PRECISION TELEMETRY · WATER QUALITY IoT
        </span>
      </footer>
    </div>
  );
}
