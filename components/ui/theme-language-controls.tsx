"use client";

import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";

import { useGlobalUI, type LocaleCode } from "@/context/GlobalUIContext";
import { signOut } from "@/lib/auth/actions";

/**
 * Isolated subscriber — theme/locale toggles do not re-render telemetry trees.
 */
export const ThemeLanguageControls = memo(function ThemeLanguageControls() {
  const { theme, locale, setLocale, toggleTheme, t } = useGlobalUI();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [profileOpen]);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
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

      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={() => setProfileOpen((v) => !v)}
          className="h-9 w-9 rounded-full border border-border-glass bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
          aria-label={t("profile")}
          aria-expanded={profileOpen}
          title={t("profile")}
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
        </button>

        {profileOpen ? (
          <div className="absolute right-0 top-11 w-48 glass-panel rounded-xl border border-border-glass shadow-xl z-[70] overflow-hidden py-1">
            <Link
              href="/settings"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-[var(--row-hover)]"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              {t("settings")}
            </Link>
            <Link
              href="/settings?tab=alerts"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-[var(--row-hover)]"
            >
              <span className="material-symbols-outlined text-[18px]">
                notifications_active
              </span>
              {t("tabAlerts")}
            </Link>
            <Link
              href="/help"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-[var(--row-hover)]"
            >
              <span className="material-symbols-outlined text-[18px]">help</span>
              {t("help")}
            </Link>
            <div className="border-t border-border-glass my-1" />
            <form action={signOut}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error-alert hover:bg-[var(--row-hover)]"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                {t("logout")}
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
});
