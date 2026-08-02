import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

/** Display / UI chrome — geometric tech face used by modern IoT dashboards. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Body copy — calm, highly legible product UI type. */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Telemetry / labels — monospace for live IoT readings. */
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DATAVLOW.ID | IoT Water Monitoring",
  description:
    "Pantau kualitas air realtime seperti dashboard IoT — sensor live, alert, dan kendali operator dalam satu layar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`dark ${spaceGrotesk.variable} ${dmSans.variable} ${jetbrains.variable}`}
      lang="id"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-obsidian text-on-surface font-body-base min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
