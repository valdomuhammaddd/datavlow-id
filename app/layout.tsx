import type { Metadata } from "next";
import Script from "next/script";

import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "DATAVLOW.ID | Precision Telemetry",
  description: "Real-time IoT water quality command center",
};

const tailwindConfig = `
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "tertiary-container": "#feb127",
          "on-secondary-container": "#613100",
          "surface-variant": "#32353c",
          "on-surface-variant": "#bbc9cf",
          "on-primary": "#003543",
          "surface-dim": "#10131a",
          "surface-container-highest": "#32353c",
          "surface-container-low": "#191c22",
          "surface-bright": "#363940",
          "on-background": "#e1e2eb",
          "primary-fixed-dim": "#4cd6ff",
          "border-glass": "rgba(255, 255, 255, 0.08)",
          "on-secondary-fixed": "#2f1500",
          "primary-fixed": "#b7eaff",
          secondary: "#ffb77f",
          "error-container": "#93000a",
          tertiary: "#ffd59c",
          "primary-container": "#00d1ff",
          primary: "#a4e6ff",
          "on-secondary": "#4e2600",
          background: "#10131a",
          "on-tertiary-fixed": "#291800",
          "on-tertiary-container": "#6b4700",
          "inverse-surface": "#e1e2eb",
          error: "#ffb4ab",
          "secondary-container": "#ff8a00",
          "on-error": "#690005",
          "on-primary-fixed": "#001f28",
          "surface-container-high": "#272a31",
          "tertiary-fixed-dim": "#ffba49",
          "surface-glass": "rgba(255, 255, 255, 0.03)",
          "on-tertiary-fixed-variant": "#624000",
          "on-error-container": "#ffdad6",
          surface: "#10131a",
          "bg-obsidian": "#0B0E14",
          "on-surface": "#e1e2eb",
          "inverse-primary": "#00677f",
          "surface-container": "#1d2026",
          "on-secondary-fixed-variant": "#6f3900",
          outline: "#859399",
          "error-alert": "#FF3D00",
          "tertiary-fixed": "#ffddb1",
          "inverse-on-surface": "#2e3037",
          "surface-tint": "#4cd6ff",
          "on-primary-fixed-variant": "#004e60",
          "on-primary-container": "#00566a",
          "secondary-fixed": "#ffdcc4",
          "outline-variant": "#3c494e",
          "secondary-fixed-dim": "#ffb77f",
          "on-tertiary": "#442b00",
          "success-glow": "#00FFC2",
          "surface-container-lowest": "#0b0e14"
        },
        borderRadius: {
          DEFAULT: "0.125rem",
          lg: "0.25rem",
          xl: "0.5rem",
          full: "0.75rem"
        },
        spacing: {
          "margin-mobile": "16px",
          "widget-gap": "16px",
          gutter: "24px",
          "margin-desktop": "32px",
          unit: "4px"
        },
        fontFamily: {
          "headline-md": ["Inter"],
          "display-lg": ["Inter"],
          "label-caps": ["JetBrains Mono"],
          "data-mono": ["JetBrains Mono"],
          "body-base": ["Inter"]
        },
        fontSize: {
          "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
          "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
          "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "500" }],
          "data-mono": ["14px", { lineHeight: "20px", fontWeight: "400" }],
          "body-base": ["16px", { lineHeight: "24px", fontWeight: "400" }]
        }
      }
    }
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="beforeInteractive"
        />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {tailwindConfig}
        </Script>
      </head>
      <body className="bg-surface-container-lowest">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
