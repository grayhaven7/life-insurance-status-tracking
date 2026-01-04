import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  try {
    const session = await auth();

    if (session) {
      if (session.user.role === "admin") {
        redirect("/admin/dashboard");
      } else {
        redirect("/dashboard");
      }
    }
  } catch (error) {
    // If auth fails (e.g., database not connected), redirect to login
    console.error("Auth error on home page:", error);
  }

  redirect("/progress");
}
