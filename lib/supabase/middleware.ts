import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    getSupabaseUrl(),
    getSupabasePublishableKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isApi = path.startsWith("/api/");
  const isPublic =
    path.startsWith("/login") ||
    path.startsWith("/signup") ||
    path.startsWith("/setup") ||
    path.startsWith("/api/v1/telemetry") ||
    path.startsWith("/api/v1/telegram") ||
    path.startsWith("/api/v1/setup") ||
    path.startsWith("/api/health") ||
    path.startsWith("/_next") ||
    path === "/favicon.ico";

  if (!user && !isPublic) {
    if (isApi) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (
    user &&
    (path.startsWith("/login") ||
      path.startsWith("/signup") ||
      path.startsWith("/setup"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
