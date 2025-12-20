import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import prisma from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import { STAGES, getProgressPercentage } from "@/lib/stages";
import ClientSearch from "@/components/ClientSearch";

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  const clients = await prisma.client.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      currentStage: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <AdminHeader userName={session.user.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <StatCard
            label="Total Clients"
            value={clients.length}
            icon={<UsersIcon className="w-5 h-5" />}
          />
          <StatCard
            label="In Progress"
            value={clients.filter((c) => c.currentStage > 1 && c.currentStage < 17).length}
            icon={<ClockIcon className="w-5 h-5" />}
            accent="warning"
          />
          <StatCard
            label="Completed"
            value={clients.filter((c) => c.currentStage === 17).length}
            icon={<CheckIcon className="w-5 h-5" />}
            accent="success"
          />
          <StatCard
            label="New This Week"
            value={
              clients.filter(
                (c) =>
                  new Date(c.createdAt) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length
            }
            icon={<SparklesIcon className="w-5 h-5" />}
            accent="info"
          />
        </div>

        {/* Client list header */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary">All Clients</h2>
            <p className="text-sm text-text-tertiary mt-0.5">Manage and track client applications</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 sm:flex-initial">
              <ClientSearch />
            </div>
            <Link
              href="/admin/clients/new"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary !text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Client
            </Link>
          </div>
        </div>

        {/* Client list */}
        {clients.length === 0 ? (
          <div className="rounded-xl border border-border-primary bg-bg-secondary p-12 text-center">
            <div className="w-16 h-16 bg-bg-tertiary rounded-xl flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No clients yet</h3>
            <p className="text-text-tertiary mb-6 max-w-sm mx-auto">
              Get started by adding your first client to track their application progress.
            </p>
            <Link
              href="/admin/clients/new"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-secondary !text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              Add Your First Client
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-border-primary bg-bg-secondary overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary">
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider hidden sm:table-cell">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider hidden lg:table-cell">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, idx) => {
                    const stage = STAGES.find((s) => s.id === client.currentStage);
                    const progress = getProgressPercentage(client.currentStage);
                    const isComplete = client.currentStage === 17;

                    return (
                      <tr 
                        key={client.id} 
                        className={`hover:bg-bg-hover transition-colors ${idx !== clients.length - 1 ? 'border-b border-border-secondary' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-accent">
                                {client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-text-primary truncate">{client.name}</p>
                              <p className="text-xs text-text-tertiary truncate md:hidden">{client.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <p className="text-sm text-text-secondary">{client.email}</p>
                          <p className="text-xs text-text-muted">{client.phone || "-"}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                              isComplete
                                ? "bg-success-muted text-success border-success/20"
                                : "bg-accent-muted text-accent border-accent/20"
                            }`}
                          >
                            {stage?.shortName || `Stage ${client.currentStage}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  isComplete ? "bg-success" : "bg-accent"
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-text-muted tabular-nums w-8">
                              {progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <p className="text-sm text-text-tertiary">
                            {new Date(client.updatedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/clients/${client.id}`}
                            className="inline-flex items-center gap-1 text-text-secondary hover:text-accent text-sm font-medium transition-colors"
                          >
                            View
                            <ChevronRightIcon className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  accent 
}: { 
  label: string; 
  value: number; 
  icon: React.ReactNode;
  accent?: 'success' | 'warning' | 'info';
}) {
  const accentClasses = {
    success: 'text-success bg-success-muted',
    warning: 'text-warning bg-warning-muted',
    info: 'text-info bg-info-muted',
  };

  return (
    <div className="rounded-xl border border-border-primary bg-bg-secondary p-3 sm:p-5">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <p className="text-xs sm:text-sm font-medium text-text-tertiary">{label}</p>
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${accent ? accentClasses[accent] : 'text-text-muted bg-bg-tertiary'}`}>
          {icon}
        </div>
      </div>
      <p className="text-xl sm:text-2xl font-semibold text-text-primary tabular-nums">{value}</p>
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
