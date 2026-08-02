"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { useGlobalUI } from "@/context/GlobalUIContext";

type SectionId = "pairing" | "data" | "fuzzy" | "troubleshoot";

export function HelpCenter() {
  const { t, locale } = useGlobalUI();
  const [section, setSection] = useState<SectionId>("pairing");

  const content = useMemo(() => buildHelp(locale), [locale]);

  const nav: Array<{ id: SectionId; label: string; icon: string }> = [
    { id: "pairing", label: t("helpPairingTitle"), icon: "link" },
    { id: "data", label: t("helpDataTitle"), icon: "monitoring" },
    { id: "fuzzy", label: t("helpFuzzyTitle"), icon: "psychology" },
    { id: "troubleshoot", label: t("helpTroubleshootTitle"), icon: "build" },
  ];

  return (
    <AppShell>
      <header className="mb-8">
        <p className="font-label-caps text-[10px] text-primary tracking-[0.14em] mb-1">
          OPERATOR HELP CENTER
        </p>
        <h2 className="font-headline-md text-headline-md text-on-surface">
          {t("help")}
        </h2>
        <p className="text-on-surface-variant text-sm mt-1 max-w-2xl">
          {t("helpDesc")}
        </p>
      </header>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <nav className="glass-panel rounded-xl p-3 h-fit space-y-1">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={
                section === item.id
                  ? "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-container/20 text-primary border border-primary/30 text-left text-sm"
                  : "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-variant/40 text-left text-sm"
              }
            >
              <span className="material-symbols-outlined text-[18px]">
                {item.icon}
              </span>
              <span className="leading-snug">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          {content[section].map((block) => (
            <article key={block.title} className="glass-panel rounded-xl p-6">
              <h3 className="font-label-caps text-[11px] text-primary mb-3 tracking-wider">
                {block.title}
              </h3>
              <div className="space-y-3 text-sm text-on-surface leading-relaxed">
                {block.body.map((p) => (
                  <p key={p} className="text-on-surface-variant">
                    {p}
                  </p>
                ))}
              </div>
              {block.code ? (
                <pre className="mt-4 font-data-mono text-xs bg-surface-container-low border border-border-glass rounded-lg p-4 overflow-x-auto text-on-surface">
                  {block.code}
                </pre>
              ) : null}
              {block.link ? (
                <Link
                  href={block.link.href}
                  className="inline-flex items-center gap-2 mt-4 text-primary text-sm hover:underline"
                >
                  {block.link.label}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

type HelpBlock = {
  title: string;
  body: string[];
  code?: string;
  link?: { href: string; label: string };
};

function buildHelp(locale: "ID" | "EN"): Record<SectionId, HelpBlock[]> {
  if (locale === "ID") {
    return {
      pairing: [
        {
          title: "1. Daftarkan perangkat",
          body: [
            "Buka menu Perangkat → isi Nama Perangkat (contoh: kambangiwak) → Generate Key.",
            "Salin API key sekali saja. Key ini adalah identitas ESP32 ke cloud.",
          ],
          link: { href: "/devices", label: "Buka Perangkat" },
        },
        {
          title: "2. Flash firmware ESP32",
          body: [
            "Tempel API key ke variabel api_key di firmware.",
            "Endpoint ingest: POST https://<domain>/api/v1/telemetry",
            "Payload wajib: api_key, ph, tds, turbidity, temp.",
          ],
          code: `POST /api/v1/telemetry
{
  "api_key": "dv_....",
  "ph": 7.1,
  "tds": 320,
  "turbidity": 2.4,
  "temp": 26.5
}`,
        },
        {
          title: "3. Verifikasi pairing",
          body: [
            "Setelah ESP32 mengirim data, status di Perangkat berubah Online (titik hijau).",
            "Jika Offline (titik merah): cek Wi-Fi, API key, dan URL Vercel.",
          ],
        },
      ],
      data: [
        {
          title: "Dashboard (grafik realtime)",
          body: [
            "Menampilkan nama perangkat aktif, skor Fuzzy Crisp, KPI pH/TDS/Turbidity/Suhu, dan grafik 30 titik terakhir.",
            "Status Online/Offline perangkat ditampilkan di header dashboard.",
          ],
          link: { href: "/dashboard", label: "Buka Dashboard" },
        },
        {
          title: "Ledger (spreadsheet)",
          body: [
            "Tabel historis dengan Nama Perangkat (bukan hash API key).",
            "Filter status, cari nama perangkat, ekspor CSV, dan hapus baris.",
          ],
          link: { href: "/ledger", label: "Buka Ledger" },
        },
        {
          title: "Simulasi",
          body: [
            "Pilih perangkat terdaftar dari dropdown Nama Perangkat.",
            "Sample Nominal/Alert menulis ke telemetry_logs sehingga Dashboard & Ledger ikut update.",
          ],
          link: { href: "/simulation", label: "Buka Simulasi" },
        },
      ],
      fuzzy: [
        {
          title: "Baku Mutu Air Kelas II",
          body: [
            "Setiap POST telemetri diproses mesin Fuzzy Mamdani di server.",
            "pH: Asam / Normal / Basa · TDS: Rendah / Sedang / Tinggi · Turbidity: Jernih / Agak Keruh / Keruh.",
            "Skor crisp 0–100: >80 Baik · 60–80 Cukup Baik · <60 Tidak Baik.",
          ],
        },
      ],
      troubleshoot: [
        {
          title: "Mode terang / bahasa",
          body: [
            "Toggle matahari/bulan di header mengatur light/dark untuk semua halaman.",
            "ID / EN mengubah label navigasi dan konten halaman (termasuk Ledger & Bantuan).",
          ],
        },
        {
          title: "Data tidak muncul",
          body: [
            "Pastikan API key valid dan belum di-revoke.",
            "Cek Network Health (NET ms) di header — jika merah lama, probe /api/health gagal.",
            "Gunakan Simulasi → Alert Sample untuk uji end-to-end tanpa hardware.",
          ],
        },
      ],
    };
  }

  return {
    pairing: [
      {
        title: "1. Register a device",
        body: [
          "Open Devices → enter a Device Name (e.g. kambangiwak) → Generate Key.",
          "Copy the API key once. This key is the ESP32 identity to the cloud.",
        ],
        link: { href: "/devices", label: "Open Devices" },
      },
      {
        title: "2. Flash ESP32 firmware",
        body: [
          "Paste the API key into the firmware api_key variable.",
          "Ingest endpoint: POST https://<domain>/api/v1/telemetry",
          "Required payload: api_key, ph, tds, turbidity, temp.",
        ],
        code: `POST /api/v1/telemetry
{
  "api_key": "dv_....",
  "ph": 7.1,
  "tds": 320,
  "turbidity": 2.4,
  "temp": 26.5
}`,
      },
      {
        title: "3. Verify pairing",
        body: [
          "After ESP32 posts data, Devices status turns Online (green dot).",
          "If Offline (red dot): check Wi-Fi, API key, and the Vercel URL.",
        ],
      },
    ],
    data: [
      {
        title: "Dashboard (realtime charts)",
        body: [
          "Shows the active device name, Fuzzy Crisp score, KPI cards, and a 30-point multi-line chart.",
          "Device online/offline status appears in the dashboard header.",
        ],
        link: { href: "/dashboard", label: "Open Dashboard" },
      },
      {
        title: "Ledger (spreadsheet)",
        body: [
          "Historical table with Device Name (not raw API key hashes).",
          "Filter by status, search by device name, export CSV, and delete rows.",
        ],
        link: { href: "/ledger", label: "Open Ledger" },
      },
      {
        title: "Simulation",
        body: [
          "Pick a registered device from the Device Name dropdown.",
          "Nominal/Alert samples write to telemetry_logs so Dashboard & Ledger update live.",
        ],
        link: { href: "/simulation", label: "Open Simulation" },
      },
    ],
    fuzzy: [
      {
        title: "Indonesian Class II water quality",
        body: [
          "Every telemetry POST runs the server-side Fuzzy Mamdani engine.",
          "pH: Acid / Normal / Base · TDS: Low / Mid / High · Turbidity: Clear / Slightly Cloudy / Cloudy.",
          "Crisp score 0–100: >80 Good · 60–80 Fair · <60 Poor.",
        ],
      },
    ],
    troubleshoot: [
      {
        title: "Light mode / language",
        body: [
          "The sun/moon toggle in the header switches light/dark across all pages.",
          "ID / EN switches navigation and page copy (including Ledger & Help).",
        ],
      },
      {
        title: "No data appearing",
        body: [
          "Ensure the API key is valid and not revoked.",
          "Check Network Health (NET ms) in the header — persistent red means /api/health probe failed.",
          "Use Simulation → Alert Sample to test end-to-end without hardware.",
        ],
      },
    ],
  };
}
