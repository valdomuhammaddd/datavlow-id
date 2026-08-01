import { redirect } from "next/navigation";

/** Keep a single dashboard entrypoint to reduce navigation confusion. */
export default function HomePage() {
  redirect("/dashboard");
}
