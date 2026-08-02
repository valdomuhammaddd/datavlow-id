"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { ThemeLanguageControls } from "@/components/ui/theme-language-controls";
import { NetworkHealthBadge } from "@/components/ui/network-health-badge";
import { useGlobalUI } from "@/context/GlobalUIContext";
import { signOut } from "@/lib/auth/actions";

const NAV = [
  { href: "/dashboard", icon: "dashboard", labelKey: "dashboard" },
  { href: "/devices", icon: "router", labelKey: "devices" },
  { href: "/logic", icon: "account_tree", labelKey: "logicBuilder" },
  { href: "/ledger", icon: "table_chart", labelKey: "analytics" },
  { href: "/simulation", icon: "developer_board", labelKey: "simulation" },
  { href: "/settings", icon: "settings", labelKey: "settings" },
  { href: "/help", icon: "help", labelKey: "help" },
] as const;

const MOBILE_PRIMARY = NAV.slice(0, 4);

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/" || pathname.startsWith("/dashboard");
  }
  if (href === "/ledger") {
    return pathname.startsWith("/ledger") || pathname.startsWith("/analytics");
  }
  return pathname.startsWith(href);
}

export function AppShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  const pathname = usePathname();
  const { t } = useGlobalUI();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface-glass backdrop-blur-xl border-b border-border-glass md:pl-72">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="md:hidden font-headline-md text-primary font-bold tracking-tighter"
          >
            DATAVLOW.ID
          </Link>
          <span className="hidden md:inline font-label-caps text-label-caps text-on-surface-variant">
            COMMAND CENTER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <NetworkHealthBadge />
          <ThemeLanguageControls />
        </div>
      </header>

      <aside className="fixed left-0 top-0 h-full hidden md:flex flex-col py-8 bg-bg-obsidian border-r border-border-glass w-64 z-40">
        <Link href="/dashboard" className="px-6 mb-8 block">
          <div className="font-headline-md text-primary tracking-tight">
            DATAVLOW.ID
          </div>
          <p className="font-label-caps text-[10px] text-on-surface-variant opacity-60">
            {t("commandCenter")}
          </p>
        </Link>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "flex items-center gap-3 px-4 py-3 bg-surface-glass text-primary border-l-4 border-primary rounded-r-lg"
                    : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-glass hover:text-on-surface rounded-lg transition-all"
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    active
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {item.icon}
                </span>
                <span className="font-label-caps text-label-caps uppercase">
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 pt-4 border-t border-border-glass space-y-2">
          <Link
            href="/devices"
            className="w-full bg-primary-container text-on-primary-container font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="font-label-caps text-label-caps uppercase text-[11px]">
              {t("addDevice")}
            </span>
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-error transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-label-caps text-label-caps uppercase text-[11px]">
                {t("logout")}
              </span>
            </button>
          </form>
        </div>
      </aside>

      <main
        className={
          wide
            ? "md:ml-64 pt-20 min-h-screen pb-28 md:pb-8"
            : "md:ml-64 pt-20 px-margin-desktop min-h-screen pb-28 md:pb-8"
        }
      >
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 w-full h-16 bg-surface-container border-t border-border-glass flex justify-around items-center z-50">
        {MOBILE_PRIMARY.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "text-primary flex flex-col items-center"
                  : "text-on-surface-variant flex flex-col items-center"
              }
              aria-label={t(item.labelKey)}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className={
            moreOpen
              ? "text-primary flex flex-col items-center"
              : "text-on-surface-variant flex flex-col items-center"
          }
          aria-label="More"
        >
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </nav>

      {moreOpen ? (
        <div className="md:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute bottom-16 left-3 right-3 glass-panel rounded-xl p-3 space-y-1 border border-border-glass">
            {NAV.slice(4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface hover:bg-surface-glass"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-caps text-label-caps uppercase">
                  {t(item.labelKey)}
                </span>
              </Link>
            ))}
            <form action={signOut}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-error-alert hover:bg-surface-glass"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-caps text-label-caps uppercase">
                  {t("logout")}
                </span>
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
