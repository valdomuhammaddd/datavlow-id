"use client";

import type { ReactNode } from "react";

import { GlobalUIProvider } from "@/context/GlobalUIContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return <GlobalUIProvider>{children}</GlobalUIProvider>;
}
