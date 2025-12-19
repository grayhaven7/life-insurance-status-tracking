import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import prisma from "@/lib/db";
import AdminHeader from "@/components/AdminHeader";
import ProgressBar from "@/components/ProgressBar";
import StatusUpdateForm from "@/components/StatusUpdateForm";
import ClientInfoCard from "@/components/ClientInfoCard";
import { STAGES } from "@/lib/stages";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <AdminHeader userName={session.user.name} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/admin/dashboard" className="text-text-tertiary hover:text-text-secondary transition-colors">
            Clients
          </Link>
          <ChevronRightIcon className="w-4 h-4 text-text-muted" />
          <span className="text-text-primary font-medium">{client.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Client info and status update */}
          <div className="lg:col-span-1 space-y-6">
            <ClientInfoCard client={client} />
            <StatusUpdateForm
              clientId={client.id}
              currentStage={client.currentStage}
              stages={STAGES}
            />
          </div>

          {/* Right column - Progress and history */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <div className="rounded-xl border border-border-primary bg-bg-secondary p-6">
              <ProgressBar currentStage={client.currentStage} showDetails={true} />
            </div>

            {/* Status history */}
            <div className="rounded-xl border border-border-primary bg-bg-secondary p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
                  <HistoryIcon className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">Status History</h3>
              </div>
              {client.statusHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-lg bg-bg-tertiary flex items-center justify-center mx-auto mb-3">
                    <ClockIcon className="w-6 h-6 text-text-muted" />
                  </div>
                  <p className="text-sm text-text-tertiary">No status updates yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {client.statusHistory.map((history, index) => {
                    const stage = STAGES.find((s) => s.id === history.stage);
                    const isLast = index === client.statusHistory.length - 1;
                    return (
                      <div
                        key={history.id}
                        className="relative pl-8"
                      >
                        {/* Timeline line */}
                        {!isLast && (
                          <div className="absolute left-[11px] top-8 bottom-0 w-px bg-border-primary" />
                        )}
                        
                        {/* Timeline dot */}
                        <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                        
                        <div className="rounded-lg bg-bg-tertiary border border-border-secondary p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-text-primary">
                              Stage {history.stage}: {stage?.shortName || "Unknown"}
                            </span>
                            <span className="text-xs text-text-muted">
                              {new Date(history.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {history.note && (
                            <p className="text-sm text-text-tertiary mb-2">{history.note}</p>
                          )}
                          <p className="text-xs text-text-muted">
                            Updated by {history.user?.name || "System"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
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

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
