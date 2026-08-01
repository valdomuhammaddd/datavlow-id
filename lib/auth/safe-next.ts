/** Allow only same-origin relative paths (blocks open redirects). */
export function safeNextPath(raw: unknown, fallback = "/dashboard"): string {
  if (typeof raw !== "string") return fallback;
  const next = raw.trim();
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//")) return fallback;
  if (!/^\/[a-zA-Z0-9/_\-?=&%.]*$/.test(next)) return fallback;
  if (next.startsWith("/login") || next.startsWith("/signup") || next.startsWith("/setup")) {
    return fallback;
  }
  return next;
}
