"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=2400&q=80";

const TICKER = [
  "Titik 014 · Sungai Ciliwung · Status aman",
  "Titik 067 · Waduk regional · pH stabil",
  "Titik 102 · Instalasi air baku · Siaga ringan",
  "Titik 033 · Kawasan industri · Sinyal pulih",
  "Titik 118 · Desa pesisir · Air jernih",
  "Titik 009 · Reservoir utama · Pantauan 24 jam",
  "Titik 125 · Node baru online",
  "Titik 051 · Suhu dalam batas aman",
];

const JOURNEY = [
  {
    n: "1",
    title: "Buat ruang pantau Anda",
    body: "Daftar sekali, masuk ke pusat kendali, dan siap menerima data dari lapangan.",
  },
  {
    n: "2",
    title: "Pasang titik sensor",
    body: "Setiap lokasi mendapat identitas aman. Tim lapangan cukup menyalakan perangkat.",
  },
  {
    n: "3",
    title: "Lihat air bergerak live",
    body: "Angka dan status kualitas air muncul otomatis di layar — tanpa menunggu laporan manual.",
  },
  {
    n: "4",
    title: "Bertindak lebih cepat",
    body: "Dapatkan peringatan, riwayat lengkap, dan otomatisasi sederhana saat kondisi berubah.",
  },
];

const CAPABILITIES = [
  {
    icon: "radar",
    title: "Jaringan 125+ titik",
    body: "Rancang pantauan dari puluhan hingga ratusan lokasi dalam satu peta kendali — siap tumbuh ke masa depan.",
  },
  {
    icon: "water_drop",
    title: "Kualitas air live",
    body: "Keasaman, kejernihan, zat terlarut, dan suhu tampil jelas. Status mudah dibaca: aman, waspada, atau kritis.",
  },
  {
    icon: "notifications_active",
    title: "Peringatan cerdas",
    body: "Saat kondisi memburuk, sistem memberi sinyal dini agar tim bisa turun tangan sebelum jadi masalah besar.",
  },
  {
    icon: "hub",
    title: "Banyak wilayah, satu layar",
    body: "Kelola waduk, sungai, instalasi, dan desa pantauan dari satu Command Center tanpa spreadsheet berserakan.",
  },
  {
    icon: "auto_graph",
    title: "Riwayat & laporan",
    body: "Unduh catatan harian untuk rapat, audit, atau laporan dinas — rapi, siap dibagikan.",
  },
  {
    icon: "psychology",
    title: "Otomasi ringan",
    body: "Atur aturan sederhana: “jika air buruk, beri tahu operator.” Uji dulu, baru jalankan.",
  },
  {
    icon: "developer_board",
    title: "Uji tanpa risiko",
    body: "Simulasikan perangkat di layar sebelum dipasang di lapangan — cocok untuk pelatihan tim.",
  },
  {
    icon: "shield_with_heart",
    title: "Aman & terkontrol",
    body: "Setiap akses tercatat. Kunci perangkat bisa diganti atau dinonaktifkan saat ada dugaan kebocoran.",
  },
];

const FUTURE = [
  {
    label: "125+",
    title: "Titik pantau",
    body: "Skala jaringan yang dirancang untuk tumbuh dari pilot kecil ke wilayah luas.",
  },
  {
    label: "24/7",
    title: "Mata yang tak tidur",
    body: "Pantauan terus berjalan meski tim istirahat — layar tetap hidup.",
  },
  {
    label: "<3s",
    title: "Detak data",
    body: "Perubahan di lapangan terasa hampir seketika di pusat kendali.",
  },
  {
    label: "∞",
    title: "Wilayah baru",
    body: "Tambah lokasi tanpa merombak cara kerja — pola yang sama, jangkauan lebih luas.",
  },
];

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, active]);

  return value;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

function NodeConstellation() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        x: 8 + ((i * 17) % 84),
        y: 12 + ((i * 29) % 72),
        delay: (i % 9) * 0.35,
        size: i % 5 === 0 ? 7 : 4,
        hot: i % 7 === 0,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        {nodes.slice(0, 28).map((a, i) => {
          const b = nodes[(i + 5) % nodes.length];
          return (
            <line
              key={`l-${a.id}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(0, 209, 255, 0.18)"
              strokeWidth="1"
              className="land-dash"
            />
          );
        })}
      </svg>
      {nodes.map((n) => (
        <span
          key={n.id}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.size,
            height: n.size,
            marginLeft: -n.size / 2,
            marginTop: -n.size / 2,
            background: n.hot ? "#00FFC2" : "#00d1ff",
            boxShadow: n.hot
              ? "0 0 12px rgba(0,255,194,0.7)"
              : "0 0 8px rgba(0,209,255,0.5)",
            animation: `land-float ${4 + (n.id % 4)}s ease-in-out infinite`,
            animationDelay: `${n.delay}s`,
          }}
        >
          {n.hot ? (
            <span
              className="absolute inset-0 rounded-full border border-success-glow/50 land-pulse-ring"
              style={{ animationDelay: `${n.delay}s` }}
            />
          ) : null}
        </span>
      ))}
      <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-primary-container/10 to-transparent land-scan" />
    </div>
  );
}

export function LandingPage() {
  const [ready, setReady] = useState(false);
  const stats = useInView<HTMLElement>();
  const nodesCount = useCountUp(125, 2000, stats.inView);
  const regionsCount = useCountUp(18, 1600, stats.inView);
  const uptimeCount = useCountUp(99, 1400, stats.inView);

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
            href="#jaringan"
            className="hidden sm:inline font-label-caps text-[11px] text-on-surface-variant hover:text-primary transition-colors"
          >
            JARINGAN
          </a>
          <a
            href="#kemampuan"
            className="hidden sm:inline font-label-caps text-[11px] text-on-surface-variant hover:text-primary transition-colors"
          >
            KEMAMPUAN
          </a>
          <Link
            href="/login"
            className="font-label-caps text-[11px] px-4 py-2 rounded-lg border border-border-glass hover:border-primary/50 transition-colors"
          >
            MASUK
          </Link>
          <Link
            href="/setup"
            className="font-label-caps text-[11px] px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-bold hover:brightness-110 transition land-glow-breathe"
          >
            MULAI
          </Link>
        </nav>
      </header>

      <section className="relative min-h-[100svh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 land-float"
          style={{ backgroundImage: `url('${HERO_IMAGE}')`, animationDuration: "14s" }}
          role="img"
          aria-label="Pantauan kualitas air di lapangan"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-bg-obsidian/88 to-bg-obsidian/45" />
        <NodeConstellation />

        <div
          className={`relative z-10 w-full px-margin-desktop pb-14 pt-28 max-w-5xl ${
            ready ? "land-fade-up" : "opacity-0"
          }`}
        >
          <p className="font-label-caps text-label-caps text-primary-container tracking-[0.28em] mb-4 land-fade-up land-delay-1">
            PUSAT PANTAU KUALITAS AIR
          </p>
          <h1 className="font-display-lg text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] tracking-tighter text-primary mb-5 land-fade-up land-delay-2">
            DATAVLOW.ID
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-on-surface/90 leading-relaxed mb-8 land-fade-up land-delay-3">
            Satu layar untuk menjaga ratusan titik air tetap aman — dari desa
            hingga instalasi besar, hidup dan bergerak setiap detik.
          </p>
          <div className="flex flex-wrap gap-3 land-fade-up land-delay-4">
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold hover:brightness-110 transition land-glow-breathe"
            >
              BUKA PUSAT KENDALI
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border-glass font-label-caps hover:border-primary/50 transition backdrop-blur-sm"
            >
              SAYA SUDAH PUNYA AKUN
            </Link>
          </div>
        </div>
      </section>

      <div className="border-y border-border-glass bg-surface-container/40 overflow-hidden py-3">
        <div className="flex whitespace-nowrap land-ticker w-max">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 font-label-caps text-[11px] text-on-surface-variant inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success-glow inline-block" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section
        id="jaringan"
        ref={stats.ref}
        className="px-margin-desktop py-20 border-b border-border-glass"
      >
        <p className="font-label-caps text-[11px] text-primary mb-3">
          JARINGAN MASA DEPAN
        </p>
        <h2 className="font-headline-md text-[clamp(1.6rem,3.5vw,2.4rem)] max-w-3xl mb-4 tracking-tight">
          Dibangun untuk memantau 125+ titik — dan terus bertambah
        </h2>
        <p className="max-w-2xl text-on-surface-variant leading-relaxed mb-12">
          DATAVLOW.ID membayangkan kota, daerah, dan kawasan industri yang
          saling terhubung. Setiap titik seperti denyut nadi: Anda tahu mana
          yang sehat, mana yang perlu diperhatikan.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mb-14">
          <div>
            <p className="font-display-lg text-4xl md:text-5xl text-primary-container tabular-nums">
              {nodesCount}+
            </p>
            <p className="font-label-caps text-[11px] text-on-surface-variant mt-2">
              TITIK PANTAU
            </p>
          </div>
          <div>
            <p className="font-display-lg text-4xl md:text-5xl text-primary tabular-nums">
              {regionsCount}
            </p>
            <p className="font-label-caps text-[11px] text-on-surface-variant mt-2">
              WILAYAH SIAGA
            </p>
          </div>
          <div>
            <p className="font-display-lg text-4xl md:text-5xl text-success-glow tabular-nums">
              {uptimeCount}%
            </p>
            <p className="font-label-caps text-[11px] text-on-surface-variant mt-2">
              WAKTU SIAGA
            </p>
          </div>
          <div>
            <p className="font-display-lg text-4xl md:text-5xl text-tertiary-container">
              Live
            </p>
            <p className="font-label-caps text-[11px] text-on-surface-variant mt-2">
              DETAK LAYAR
            </p>
          </div>
        </div>

        <div className="relative h-56 md:h-72 rounded-xl overflow-hidden border border-border-glass bg-surface-container-low">
          <NodeConstellation />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-obsidian via-transparent to-bg-obsidian/80" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 justify-between items-end">
            <div>
              <p className="font-label-caps text-[10px] text-success-glow mb-1">
                SIMULASI JARINGAN AKTIF
              </p>
              <p className="text-on-surface max-w-md text-sm md:text-base">
                Titik-titik saling terhubung seperti peta denyut air nasional —
                siap Anda isi dengan lokasi nyata.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-success-glow/30 bg-bg-obsidian/70">
              <span className="w-2 h-2 rounded-full bg-success-glow animate-pulse" />
              <span className="font-label-caps text-[10px]">125 NODE VISION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-desktop py-20 border-b border-border-glass">
        <p className="font-label-caps text-[11px] text-on-surface-variant mb-3">
          MENGAPA INI PENTING
        </p>
        <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] max-w-3xl mb-4 tracking-tight">
          Air yang dipantau hari ini melindungi masyarakat besok
        </h2>
        <p className="max-w-3xl text-on-surface-variant leading-relaxed">
          Dari waduk hingga keran komunitas, kualitas air berubah setiap saat.
          DATAVLOW.ID membantu operator melihat perubahan itu secara langsung,
          memahami kondisi dengan bahasa yang jelas, lalu bertindak sebelum
          keluhan datang.
        </p>
      </section>

      <section
        id="kemampuan"
        className="px-margin-desktop py-20 border-b border-border-glass"
      >
        <p className="font-label-caps text-[11px] text-primary mb-3">
          KEMAMPUAN UNGGULAN
        </p>
        <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] max-w-2xl mb-10 tracking-tight">
          Bukan sekadar angka — ini ruang kendali yang hidup
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl">
          {CAPABILITIES.map((item, i) => (
            <li
              key={item.title}
              className="group border-t border-border-glass pt-5 transition-transform duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="material-symbols-outlined text-primary text-2xl mb-3 block group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <h3 className="font-headline-md text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-margin-desktop py-20 border-b border-border-glass">
        <p className="font-label-caps text-[11px] text-primary mb-3">
          VISI SKALA BESAR
        </p>
        <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] mb-10 tracking-tight">
          Dirancang untuk tumbuh bersama wilayah Anda
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl">
          {FUTURE.map((item) => (
            <div key={item.title}>
              <p className="font-display-lg text-3xl text-primary-container mb-2">
                {item.label}
              </p>
              <h3 className="font-label-caps text-label-caps text-on-surface mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-margin-desktop py-20 border-b border-border-glass">
        <p className="font-label-caps text-[11px] text-primary mb-3">
          CARA MEMULAI
        </p>
        <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] mb-10 tracking-tight">
          Empat langkah, langsung terasa manfaatnya
        </h2>
        <ol className="max-w-3xl space-y-8">
          {JOURNEY.map((step) => (
            <li key={step.n} className="flex gap-5">
              <span className="font-data-mono text-primary-container text-xl shrink-0 w-8">
                {step.n}
              </span>
              <div>
                <h3 className="font-headline-md text-lg mb-1">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative px-margin-desktop py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <NodeConstellation />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-bg-obsidian to-bg-obsidian" />
        <div className="relative max-w-3xl land-fade-up">
          <h2 className="font-headline-md text-[clamp(1.75rem,4vw,2.6rem)] tracking-tight mb-4">
            Siap menjaga air di 125 titik — mulai dari yang pertama
          </h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed max-w-xl">
            Bangun pusat pantau Anda hari ini. Besok, tambahkan lokasi baru
            tanpa mengubah cara kerja tim.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/setup"
              className="px-6 py-3.5 rounded-lg bg-primary-container text-on-primary-container font-label-caps font-bold hover:brightness-110 land-glow-breathe"
            >
              MULAI SEKARANG
            </Link>
            <Link
              href="/help"
              className="px-6 py-3.5 rounded-lg border border-border-glass font-label-caps hover:border-primary/40 backdrop-blur-sm"
            >
              PANDUAN SINGKAT
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-margin-desktop py-10 border-t border-border-glass flex flex-col sm:flex-row justify-between gap-4 text-xs text-on-surface-variant">
        <span className="font-headline-md text-primary tracking-tight">
          DATAVLOW.ID
        </span>
        <span className="font-label-caps">
          MEMANTAU AIR · MELINDUNGI MASYARAKAT
        </span>
      </footer>
    </div>
  );
}
