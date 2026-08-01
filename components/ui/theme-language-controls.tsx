"use client";

import Link from "next/link";
import { memo } from "react";

import { useGlobalUI, type LocaleCode } from "@/context/GlobalUIContext";

/**
 * Isolated subscriber — theme/locale toggles do not re-render telemetry trees.
 */
export const ThemeLanguageControls = memo(function ThemeLanguageControls() {
  const { theme, locale, setLocale, toggleTheme } = useGlobalUI();

  return (
    <div className="flex items-center gap-4">
      <div className="flex bg-surface-container-high rounded-full p-1 border border-border-glass">
        {(["ID", "EN"] as LocaleCode[]).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={
              locale === code
                ? "px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-label-caps font-label-caps"
                : "px-3 py-1 rounded-full text-on-surface-variant hover:text-on-surface text-label-caps font-label-caps"
            }
          >
            {code}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={toggleTheme}
        className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-all"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </button>
      <Link
        href="/settings"
        className="h-8 w-8 rounded-full border border-border-glass bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
        aria-label="Open settings"
        title="Settings"
      >
        <span className="material-symbols-outlined text-[18px]">person</span>
      </Link>
    </div>
  );
});
