import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import prisma from "@/lib/db";
import ProgressBar from "@/components/ProgressBar";
import ClientDashboardHeader from "@/components/ClientDashboardHeader";
import { STAGES } from "@/lib/stages";

export default async function ClientDashboardPage() {
  const session = await getSession();

  if (!session || session.user.role !== "client") {
    redirect("/progress");
  }

  const client = await prisma.client.findUnique({
    where: { id: session.user.id },
    include: {
      assignedAdmin: {
        select: {
          name: true,
          email: true,
          contactEmail: true,
          contactPhone: true,
        },
      },
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
    redirect("/progress");
  }

  // Compute contact info
  const adminEmail = client.assignedAdmin?.contactEmail || client.assignedAdmin?.email || "neil@financialplanninggroup.com";
  const adminName = client.assignedAdmin?.name || "Financial Advisor";
  const adminPhone = client.assignedAdmin?.contactPhone || "+1234567890";

  return (
    <div className="min-h-screen bg-bg-primary">
      <ClientDashboardHeader clientName={client.name} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Hello, {client.name.split(" ")[0]}!
          </h2>
          <p className="text-sm sm:text-base text-text-tertiary mt-1">
            Track your Tax-Free Pension application progress below.
          </p>
        </div>

        {/* Progress section */}
        <div className="rounded-xl border border-border-primary bg-bg-secondary p-6 md:p-8">
          <ProgressBar currentStage={client.currentStage} />
        </div>

        {/* Recent activity */}
        {client.statusHistory.length > 0 && (
          <div className="mt-6 sm:mt-8 rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
                <ActivityIcon className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-base font-semibold text-text-primary">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {client.statusHistory.map((history) => {
                const stage = STAGES.find((s) => s.id === history.stage);
                return (
                  <div
                    key={history.id}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-bg-tertiary border border-border-secondary"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-success-muted flex items-center justify-center flex-shrink-0">
                      <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        Moved to {stage?.name || `Stage ${history.stage}`}
                      </p>
                      {history.note && (
                        <p className="text-sm text-text-tertiary mt-1">{history.note}</p>
                      )}
                      <p className="text-xs text-text-muted mt-2">
                        {new Date(history.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {history.user && ` · ${history.user.name}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact section */}
        <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-xl border border-border-primary bg-bg-secondary p-4 sm:p-6 md:p-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
                <HelpIcon className="w-4 h-4 text-accent" />
              </div>
              <h3 className="text-base font-semibold text-text-primary">Need Help?</h3>
            </div>
            <p className="text-sm text-text-tertiary mb-5">
              If you have questions about your application, contact{" "}
              <span className="font-medium text-text-secondary">{adminName}</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${adminEmail}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bg-tertiary hover:bg-bg-hover border border-border-primary text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
              >
                <MailIcon className="w-4 h-4" />
                Email {adminName.split(" ")[0]}
              </a>
              <a
                href={`sms:${adminPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bg-tertiary hover:bg-bg-hover border border-border-primary text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
              >
                <MessageIcon className="w-4 h-4" />
                Text {adminName.split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
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

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 21.97a5.969 5.969 0 01-2.358-.842 6.014 6.014 0 01.517-3.054A8.18 8.18 0 012.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}
