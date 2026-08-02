import type { Config } from "tailwindcss";

/**
 * Design tokens locked to DESAINUI.MD (Precision Telemetry / Command Center).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-container": "#feb127",
        "on-secondary-container": "#613100",
        "surface-variant": "var(--surface-variant)",
        "on-surface-variant": "var(--on-surface-variant)",
        "on-primary": "#003543",
        "surface-dim": "var(--surface-dim)",
        "surface-container-highest": "var(--surface-container-highest)",
        "surface-container-low": "var(--surface-container-low)",
        "surface-bright": "var(--surface-bright)",
        "on-background": "var(--on-surface)",
        "primary-fixed-dim": "#4cd6ff",
        "border-glass": "var(--glass-border)",
        "on-secondary-fixed": "#2f1500",
        "primary-fixed": "#b7eaff",
        secondary: "#ffb77f",
        "error-container": "#93000a",
        tertiary: "var(--tertiary)",
        "primary-container": "var(--primary-container)",
        primary: "var(--primary)",
        "on-secondary": "#4e2600",
        background: "var(--background)",
        "on-tertiary-fixed": "#291800",
        "on-tertiary-container": "#6b4700",
        "inverse-surface": "#e1e2eb",
        error: "var(--error)",
        "secondary-container": "#ff8a00",
        "on-error": "#690005",
        "on-primary-fixed": "#001f28",
        "surface-container-high": "var(--surface-container-high)",
        "tertiary-fixed-dim": "#ffba49",
        "surface-glass": "var(--surface-glass)",
        "on-tertiary-fixed-variant": "#624000",
        "on-error-container": "#ffdad6",
        surface: "var(--surface)",
        "bg-obsidian": "var(--bg-obsidian)",
        "on-surface": "var(--on-surface)",
        "inverse-primary": "#00677f",
        "surface-container": "var(--surface-container)",
        "on-secondary-fixed-variant": "#6f3900",
        outline: "var(--outline)",
        "error-alert": "#FF3D00",
        "tertiary-fixed": "#ffddb1",
        "inverse-on-surface": "#2e3037",
        "surface-tint": "#4cd6ff",
        "on-primary-fixed-variant": "#004e60",
        "on-primary-container": "#00566a",
        "secondary-fixed": "#ffdcc4",
        "outline-variant": "var(--outline-variant)",
        "secondary-fixed-dim": "#ffb77f",
        "on-tertiary": "#442b00",
        "success-glow": "var(--success-glow)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        obsidian: "var(--obsidian)",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "1rem",
        full: "0.75rem",
      },
      spacing: {
        "margin-mobile": "16px",
        "widget-gap": "16px",
        gutter: "24px",
        "margin-desktop": "32px",
        unit: "4px",
      },
      fontFamily: {
        // Space Grotesk = product UI / IoT dashboard titles (Blynk-like clarity)
        "headline-md": ["var(--font-display)", "Space Grotesk", "sans-serif"],
        "display-lg": ["var(--font-display)", "Space Grotesk", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
        // DM Sans = readable body for operator workflows
        "body-base": ["var(--font-body)", "DM Sans", "sans-serif"],
        sans: ["var(--font-body)", "DM Sans", "sans-serif"],
        // JetBrains Mono = live sensor values & caps labels
        "label-caps": ["var(--font-mono)", "JetBrains Mono", "monospace"],
        "data-mono": ["var(--font-mono)", "JetBrains Mono", "monospace"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-md": [
          "24px",
          { lineHeight: "1.25", fontWeight: "600" },
        ],
        "display-lg": [
          "48px",
          {
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "label-caps": [
          "11px",
          {
            lineHeight: "1.35",
            letterSpacing: "0.08em",
            fontWeight: "500",
          },
        ],
        "data-mono": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        "body-base": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      backdropBlur: {
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
