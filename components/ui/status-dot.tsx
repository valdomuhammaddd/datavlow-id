"use client";

/** Online = green · Offline/error = red · maintenance = amber */
export function StatusDot({
  status,
  size = "md",
}: {
  status: string | null | undefined;
  size?: "sm" | "md";
}) {
  const s = (status ?? "offline").toLowerCase();
  const dim = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
  if (s === "online") {
    return (
      <span
        className={`${dim} rounded-full bg-success-glow shadow-[0_0_8px_var(--success-glow)] shrink-0`}
        aria-label="online"
      />
    );
  }
  if (s === "maintenance") {
    return (
      <span
        className={`${dim} rounded-full bg-tertiary-container shrink-0`}
        aria-label="maintenance"
      />
    );
  }
  return (
    <span
      className={`${dim} rounded-full bg-error-alert shadow-[0_0_8px_rgba(255,61,0,0.5)] shrink-0`}
      aria-label="offline"
    />
  );
}
