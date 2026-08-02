import { redirect } from "next/navigation";

/** Legacy route — ledger spreadsheet now lives at /ledger. */
export default function AnalyticsRedirectPage() {
  redirect("/ledger");
}
