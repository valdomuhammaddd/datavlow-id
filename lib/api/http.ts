import { NextResponse } from "next/server";

export function jsonOk<T extends Record<string, unknown>>(
  data: T,
  status = 200,
) {
  return NextResponse.json({ success: true, ...data }, { status });
}

export function jsonError(error: string, status = 400, extras?: Record<string, unknown>) {
  return NextResponse.json({ success: false, error, ...extras }, { status });
}

export async function parseJsonBody(
  request: Request,
): Promise<{ ok: true; data: unknown } | { ok: false; response: NextResponse }> {
  try {
    const data = await request.json();
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      response: jsonError("Invalid JSON payload", 400),
    };
  }
}

export function getSearchParams(request: Request): URLSearchParams {
  return new URL(request.url).searchParams;
}
