import { createBrowserClient } from "@supabase/ssr";

import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";
import type { Database } from "@/types/database.types";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null =
  null;

/** Singleton browser client — avoids duplicate Realtime sockets / auth clients. */
export function createClient() {
  if (browserClient) return browserClient;

  browserClient = createBrowserClient<Database>(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
  );

  return browserClient;
}
