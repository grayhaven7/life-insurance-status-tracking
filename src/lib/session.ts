import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await auth();
}

export async function requireAdminSession() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return session;
}

export async function requireClientSession() {
  const session = await auth();

  if (!session || session.user.role !== "client") {
    redirect("/login");
  }

  return session;
}
