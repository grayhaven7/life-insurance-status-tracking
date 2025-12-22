import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import AdminHeader from "@/components/AdminHeader";
import NewClientForm from "@/components/NewClientForm";

export default async function NewClientPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <AdminHeader userName={session.user.name} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-4 sm:mb-6">
          <Link href="/admin/dashboard" className="text-text-tertiary hover:text-text-secondary transition-colors">
            Clients
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-text-muted" />
          <span className="text-text-primary font-medium">Add New Client</span>
        </nav>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-text-primary">Add New Client</h2>
          <p className="text-sm text-text-tertiary mt-1">
            Create a new client account. They will receive their login credentials via email.
          </p>
        </div>

        <div className="rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6 md:p-8">
          <NewClientForm currentAdminId={session.user.id} />
        </div>
      </main>
    </div>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
