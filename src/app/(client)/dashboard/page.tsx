import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import prisma from "@/lib/db";
import ProgressBar from "@/components/ProgressBar";
import ClientDashboardHeader from "@/components/ClientDashboardHeader";

export default async function ClientDashboardPage() {
  const session = await getSession();

  if (!session || session.user.role !== "client") {
    redirect("/login");
  }

  const client = await prisma.client.findUnique({
    where: { id: session.user.id },
    include: {
      statusHistory: {
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          user: {
            select: { name: true },
          },
        },
      },
    },
  });

  if (!client) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientDashboardHeader clientName={client.name} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary">
            Hello, {client.name.split(" ")[0]}!
          </h2>
          <p className="text-muted mt-2">
            Track your life insurance application progress below.
          </p>
        </div>

        {/* Progress section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <ProgressBar currentStage={client.currentStage} />
        </div>

        {/* Recent activity */}
        {client.statusHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {client.statusHistory.map((history) => (
                <div
                  key={history.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Status updated to Stage {history.stage}
                    </p>
                    {history.note && (
                      <p className="text-sm text-muted mt-1">{history.note}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(history.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {history.user && ` by ${history.user.name}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact section */}
        <div className="mt-8 bg-gradient-to-r from-primary to-primary-light rounded-2xl shadow-lg p-6 md:p-8 text-white">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-blue-100 mb-4">
            If you have questions about your application, contact your financial advisor.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:neil@financialplanninggroup.com"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
