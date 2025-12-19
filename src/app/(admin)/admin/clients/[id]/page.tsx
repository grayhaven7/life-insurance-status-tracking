import { redirect, notFound } from "next/navigation";
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
    <div className="min-h-screen bg-gray-100">
      <AdminHeader userName={session.user.name} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <a href="/admin/dashboard" className="hover:text-primary">
            Clients
          </a>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium">{client.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
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
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ProgressBar currentStage={client.currentStage} showDetails={true} />
            </div>

            {/* Status history */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Status History</h3>
              {client.statusHistory.length === 0 ? (
                <p className="text-muted text-center py-8">No status updates yet.</p>
              ) : (
                <div className="space-y-4">
                  {client.statusHistory.map((history, index) => {
                    const stage = STAGES.find((s) => s.id === history.stage);
                    return (
                      <div
                        key={history.id}
                        className={`relative pl-8 pb-4 ${
                          index !== client.statusHistory.length - 1
                            ? "border-l-2 border-gray-200"
                            : ""
                        }`}
                      >
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow" />
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">
                              Stage {history.stage}: {stage?.shortName || "Unknown"}
                            </span>
                            <span className="text-xs text-muted">
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
                            <p className="text-sm text-gray-600 mb-2">{history.note}</p>
                          )}
                          <p className="text-xs text-muted">
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
