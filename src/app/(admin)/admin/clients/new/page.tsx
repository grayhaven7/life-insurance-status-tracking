import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminHeader from "@/components/AdminHeader";
import NewClientForm from "@/components/NewClientForm";

export default async function NewClientPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader userName={session.user.name} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">Add New Client</h2>
          <p className="text-muted mt-1">
            Create a new client account. They will receive their login credentials via email.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <NewClientForm />
        </div>
      </main>
    </div>
  );
}
