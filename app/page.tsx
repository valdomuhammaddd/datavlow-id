import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "DATAVLOW.ID | IoT Water Quality Command Center",
  description:
    "Platform telemetri kualitas air realtime: ESP32 ingest, Fuzzy Mamdani, Supabase Realtime, fleet, ledger, logic, dan alert untuk operator.",
};

/** Public professional landing — Command Center lives at /dashboard. */
export default function HomePage() {
  return <LandingPage />;
}
