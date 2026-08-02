"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
    icon: "verified_user",
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

/** Abstract ocean aurora — no photography of people. */
function AuroraOceanBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 12) * 0.7}s`,
        duration: `${8 + (i % 7)}s`,
        size: 2 + (i % 3),
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#05080f]" />

      {/* Deep water gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,120,160,0.35),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(0,209,255,0.18),transparent_50%),radial-gradient(ellipse_at_50%_100%,rgba(0,80,120,0.4),transparent_55%)]" />

      {/* Moving aurora blobs */}
      <div
        className="land-aurora-blob absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#006f8a]/45"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="land-aurora-blob absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-[#00d1ff]/25"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="land-aurora-blob absolute bottom-[-25%] left-[20%] w-[65vw] h-[50vw] rounded-full bg-[#00ffc2]/12"
        style={{ animationDelay: "-11s", animationDuration: "26s" }}
      />

      {/* Soft orbs */}
      <div
        className="land-orb absolute top-[30%] left-[15%] w-40 h-40 rounded-full bg-primary-container/40"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="land-orb absolute top-[55%] right-[20%] w-56 h-56 rounded-full bg-success-glow/20"
        style={{ animationDelay: "-3s", animationDuration: "11s" }}
      />

      {/* Wave SVG layers */}
      <svg
        className="land-wave-layer absolute bottom-0 left-[-10%] w-[120%] h-[45%] opacity-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(0, 209, 255, 0.12)"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      <svg
        className="land-wave-layer absolute bottom-0 left-[-5%] w-[120%] h-[38%] opacity-50"
        style={{ animationDelay: "-4s", animationDuration: "18s" }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(0, 255, 194, 0.08)"
          d="M0,256L60,240C120,224,240,192,360,181.3C480,171,600,181,720,197.3C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>

      {/* Rising particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="land-particle absolute bottom-0 rounded-full bg-primary-container"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: "0 0 8px rgba(0,209,255,0.8)",
          }}
        />
      ))}

      {/* Ripple accents */}
      <span className="land-ripple absolute left-[20%] top-[40%] w-24 h-24 rounded-full border border-primary-container/40" />
      <span
        className="land-ripple absolute right-[25%] top-[55%] w-16 h-16 rounded-full border border-success-glow/30"
        style={{ animationDelay: "1.2s" }}
      />
      <span
        className="land-ripple absolute left-[55%] top-[28%] w-20 h-20 rounded-full border border-primary/30"
        style={{ animationDelay: "2.1s" }}
      />

      <div className="absolute inset-0 kinetic-grid opacity-[0.18]" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian via-bg-obsidian/50 to-transparent" />
    </div>
  );
}

function NodeConstellation({ dense = false }: { dense?: boolean }) {
  const count = dense ? 56 : 36;
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 6 + ((i * 19) % 88),
        y: 10 + ((i * 31) % 78),
        delay: (i % 10) * 0.28,
        size: i % 5 === 0 ? 8 : 3.5,
        hot: i % 6 === 0,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        {nodes.slice(0, Math.floor(count * 0.7)).map((a, i) => {
          const b = nodes[(i + 7) % nodes.length];
          return (
            <line
              key={`l-${a.id}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(0, 209, 255, 0.22)"
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
              ? "0 0 14px rgba(0,255,194,0.75)"
              : "0 0 10px rgba(0,209,255,0.55)",
            animation: `land-float ${3.5 + (n.id % 4)}s ease-in-out infinite`,
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
      <div className="absolute left-0 right-0 h-28 bg-gradient-to-b from-transparent via-primary-container/15 to-transparent land-scan" />
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
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-margin-desktop h-16 land-glass-soft">
        <span className="font-headline-md tracking-tighter font-bold land-shimmer-text">
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
            className="font-label-caps text-[11px] px-4 py-2 rounded-lg land-glass hover:border-primary/40 transition-colors"
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

      <section className="relative min-h-[100svh] flex items-end md:items-center">
        <AuroraOceanBackground />
        <div className="absolute inset-0 opacity-70">
          <NodeConstellation dense />
        </div>

        <div
          className={`relative z-10 w-full px-margin-desktop pb-16 pt-28 ${
            ready ? "land-fade-up" : "opacity-0"
          }`}
        >
          <div className="land-glass rounded-2xl p-8 md:p-12 max-w-3xl land-glow-breathe">
            <p className="font-label-caps text-label-caps text-primary-container tracking-[0.28em] mb-4 land-fade-up land-delay-1">
              PUSAT PANTAU KUALITAS AIR
            </p>
            <h1 className="font-display-lg text-[clamp(2.75rem,8vw,5rem)] leading-[0.95] tracking-tighter mb-5 land-fade-up land-delay-2 land-shimmer-text">
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg land-glass font-label-caps hover:border-primary/50 transition"
              >
                SAYA SUDAH PUNYA AKUN
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 border-y border-white/10 land-glass-soft overflow-hidden py-3">
        <div className="flex whitespace-nowrap land-ticker w-max">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="mx-8 font-label-caps text-[11px] text-on-surface-variant inline-flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success-glow inline-block animate-pulse" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section
        id="jaringan"
        ref={stats.ref}
        className="relative px-margin-desktop py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,209,255,0.06),transparent_60%)] pointer-events-none" />
        <div className="relative">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mb-14">
            {[
              { value: `${nodesCount}+`, label: "TITIK PANTAU", tone: "text-primary-container" },
              { value: String(regionsCount), label: "WILAYAH SIAGA", tone: "text-primary" },
              { value: `${uptimeCount}%`, label: "WAKTU SIAGA", tone: "text-success-glow" },
              { value: "Live", label: "DETAK LAYAR", tone: "text-tertiary-container" },
            ].map((stat) => (
              <div key={stat.label} className="land-glass rounded-xl p-5">
                <p
                  className={`font-display-lg text-3xl md:text-4xl tabular-nums ${stat.tone}`}
                >
                  {stat.value}
                </p>
                <p className="font-label-caps text-[11px] text-on-surface-variant mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden land-glass">
            <div className="absolute inset-0 bg-[#05080f]/60" />
            <NodeConstellation dense />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-obsidian/90 via-transparent to-bg-obsidian/70" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 justify-between items-end">
              <div className="land-glass-soft rounded-xl px-5 py-4 max-w-md">
                <p className="font-label-caps text-[10px] text-success-glow mb-1">
                  SIMULASI JARINGAN AKTIF
                </p>
                <p className="text-on-surface text-sm md:text-base">
                  Titik-titik saling terhubung seperti peta denyut air nasional —
                  siap Anda isi dengan lokasi nyata.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full land-glass">
                <span className="w-2 h-2 rounded-full bg-success-glow animate-pulse" />
                <span className="font-label-caps text-[10px]">125 NODE VISION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-desktop py-16">
        <div className="land-glass rounded-2xl p-8 md:p-10 max-w-4xl">
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
        </div>
      </section>

      <section id="kemampuan" className="px-margin-desktop py-20">
        <p className="font-label-caps text-[11px] text-primary mb-3">
          KEMAMPUAN UNGGULAN
        </p>
        <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] max-w-2xl mb-10 tracking-tight">
          Bukan sekadar angka — ini ruang kendali yang hidup
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
          {CAPABILITIES.map((item) => (
            <li
              key={item.title}
              className="group land-glass rounded-xl p-5 transition-transform duration-300 hover:-translate-y-1.5 hover:border-primary/30"
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

      <section className="px-margin-desktop py-16">
        <div className="land-glass rounded-2xl p-8 md:p-10">
          <p className="font-label-caps text-[11px] text-primary mb-3">
            VISI SKALA BESAR
          </p>
          <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] mb-10 tracking-tight">
            Dirancang untuk tumbuh bersama wilayah Anda
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FUTURE.map((item) => (
              <div key={item.title}>
                <p className="font-display-lg text-3xl land-shimmer-text mb-2">
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
        </div>
      </section>

      <section className="px-margin-desktop py-16">
        <p className="font-label-caps text-[11px] text-primary mb-3">
          CARA MEMULAI
        </p>
        <h2 className="font-headline-md text-[clamp(1.5rem,3vw,2.2rem)] mb-8 tracking-tight">
          Empat langkah, langsung terasa manfaatnya
        </h2>
        <ol className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {JOURNEY.map((step) => (
            <li key={step.n} className="land-glass rounded-xl p-5 flex gap-4">
              <span className="font-data-mono text-primary-container text-xl shrink-0">
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
        <AuroraOceanBackground />
        <div className="absolute inset-0 opacity-50">
          <NodeConstellation />
        </div>
        <div className="relative land-glass rounded-2xl p-8 md:p-12 max-w-3xl land-fade-up">
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
              className="px-6 py-3.5 rounded-lg land-glass font-label-caps hover:border-primary/40"
            >
              PANDUAN SINGKAT
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-margin-desktop py-10 border-t border-white/10 land-glass-soft flex flex-col sm:flex-row justify-between gap-4 text-xs text-on-surface-variant">
        <span className="font-headline-md tracking-tight land-shimmer-text">
          DATAVLOW.ID
        </span>
        <span className="font-label-caps">
          MEMANTAU AIR · MELINDUNGI MASYARAKAT
        </span>
      </footer>
    </div>
  );
}
