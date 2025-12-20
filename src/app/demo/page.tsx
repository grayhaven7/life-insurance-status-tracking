"use client";

import { useState } from "react";
import Link from "next/link";
import { STAGES, getProgressPercentage } from "@/lib/stages";

interface HistoryItem {
  id: number;
  stage: number;
  note: string;
  createdAt: Date;
  updatedBy: string;
}

export default function DemoPage() {
  // Sandbox state
  const [currentStage, setCurrentStage] = useState(3);
  const [selectedStage, setSelectedStage] = useState(3);
  const [note, setNote] = useState("");
  const [statusHistory, setStatusHistory] = useState<HistoryItem[]>([
    {
      id: 1,
      stage: 1,
      note: "Application received and processing started",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
    {
      id: 2,
      stage: 2,
      note: "Part 2 forms have been sent to your email",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
    {
      id: 3,
      stage: 3,
      note: "Thank you for completing Part 2!",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  const progress = getProgressPercentage(currentStage);
  const currentStageData = STAGES.find((s) => s.id === currentStage);

  const handleUpdateStatus = () => {
    if (selectedStage === currentStage) return;

    const newHistory: HistoryItem = {
      id: statusHistory.length + 1,
      stage: selectedStage,
      note: note || `Status updated to ${STAGES[selectedStage - 1].name}`,
      createdAt: new Date(),
      updatedBy: "Test Admin",
    };

    setStatusHistory([newHistory, ...statusHistory]);
    setCurrentStage(selectedStage);
    setNote("");
    setShowSuccess(true);
    setShowEmailNotification(true);

    setTimeout(() => setShowSuccess(false), 3000);
    setTimeout(() => setShowEmailNotification(false), 4000);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Interactive Demo</h1>
              <p className="text-blue-100 text-sm">Try the app yourself - changes sync in real-time</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Client Login →
              </Link>
              <Link
                href="/admin/login"
                className="px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
              >
                Admin Login →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Email Notification Popup */}
      {showEmailNotification && (
        <div className="fixed top-20 right-4 z-50 animate-slideIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-80">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MailIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Email Sent!</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Client notified of status change to: {STAGES[currentStage - 1]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Split Screen Demo */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT SIDE - ADMIN PANEL */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <h2 className="font-semibold text-text-primary">Admin View</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Your Team</span>
            </div>

            {/* Admin Panel Container */}
            <div className="rounded-xl border-2 border-orange-200 bg-bg-secondary overflow-hidden">
              {/* Fake Admin Header */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    FP
                  </div>
                  <span className="text-white font-medium text-sm">Admin Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs">
                    TA
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Client Info Card */}
                <div className="rounded-xl border border-border-primary bg-bg-tertiary p-4 mb-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-accent">JD</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">John Doe</h3>
                      <p className="text-sm text-text-tertiary">Client since December 2024</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-secondary text-sm">
                      <MailIcon className="w-4 h-4 text-text-muted" />
                      <span className="text-text-secondary">john.doe@example.com</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-bg-secondary text-sm">
                      <PhoneIcon className="w-4 h-4 text-text-muted" />
                      <span className="text-text-secondary">(555) 123-4567</span>
                    </div>
                  </div>
                </div>

                {/* Status Update Form */}
                <div className="rounded-xl border border-border-primary bg-bg-tertiary p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-accent-muted flex items-center justify-center">
                      <RefreshIcon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-text-primary text-sm">Update Status</h3>
                  </div>

                  {showSuccess && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success-muted border border-success/20 text-sm text-success mb-4">
                      <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />
                      Status updated! Client notified via email.
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        New Stage
                      </label>
                      <select
                        value={selectedStage}
                        onChange={(e) => setSelectedStage(Number(e.target.value))}
                        className="w-full px-3 py-2.5 text-sm bg-bg-secondary border border-border-primary rounded-lg text-text-primary focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-all"
                      >
                        {STAGES.map((stage) => (
                          <option key={stage.id} value={stage.id}>
                            {stage.id}. {stage.name}
                            {stage.id === currentStage ? " (current)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Note <span className="text-text-muted font-normal">(optional)</span>
                      </label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2.5 text-sm bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none resize-none transition-all"
                        placeholder="Add a note for the client..."
                      />
                    </div>

                    <button
                      onClick={handleUpdateStatus}
                      disabled={selectedStage === currentStage}
                      className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-secondary text-btn-text font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <SendIcon className="w-4 h-4" />
                      Update Status & Notify Client
                    </button>
                  </div>
                </div>

                {/* Recent History (Admin View) */}
                <div className="mt-5 rounded-xl border border-border-primary bg-bg-tertiary p-4">
                  <h4 className="font-semibold text-text-primary text-sm mb-3">Recent Updates</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {statusHistory.slice(0, 3).map((item) => (
                      <div key={item.id} className="p-2 rounded-lg bg-bg-secondary text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-text-primary">
                            Stage {item.stage}: {STAGES[item.stage - 1]?.shortName}
                          </span>
                          <span className="text-text-muted">
                            {item.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        {item.note && (
                          <p className="text-text-tertiary mt-1">{item.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - CLIENT VIEW */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <h2 className="font-semibold text-text-primary">Client View</h2>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">What clients see</span>
            </div>

            {/* Client Dashboard Container */}
            <div className="rounded-xl border-2 border-emerald-200 bg-bg-secondary overflow-hidden">
              {/* Fake Client Header */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                    FP
                  </div>
                  <span className="text-white font-medium text-sm">Client Portal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                    JD
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Welcome */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-text-primary">Hello, John! 👋</h3>
                  <p className="text-sm text-text-tertiary">Track your life insurance application progress below.</p>
                </div>

                {/* Progress Section */}
                <div className="rounded-xl border border-border-primary bg-bg-tertiary p-5 mb-5">
                  {/* Progress Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">Application Progress</h4>
                      <p className="text-xs text-text-muted">Track your journey to completion</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-accent tabular-nums">{progress}%</span>
                      <p className="text-xs text-text-muted">Complete</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-bg-secondary rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Current Stage */}
                  {currentStageData && (
                    <div className="relative overflow-hidden rounded-xl border border-accent/20 bg-accent-muted p-4">
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-accent/20 text-accent border border-accent/20">
                            STEP {currentStage} OF 17
                          </span>
                          {currentStage === 17 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-success-muted text-success border border-success/20">
                              COMPLETE
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-semibold text-text-primary mb-1">{currentStageData.name}</h4>
                        <p className="text-xs text-text-secondary">{currentStageData.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stage Timeline (compact) */}
                <div className="rounded-xl border border-border-primary bg-bg-tertiary p-4 mb-5">
                  <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                    All Stages
                  </h4>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
                    {STAGES.map((stage) => {
                      const isCompleted = stage.id < currentStage;
                      const isCurrent = stage.id === currentStage;
                      const isPending = stage.id > currentStage;

                      return (
                        <div
                          key={stage.id}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-xs ${
                            isCurrent ? "bg-accent-muted border border-accent/20" : ""
                          } ${isCompleted ? "bg-success-muted/50" : ""} ${isPending ? "opacity-50" : ""}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 ${
                              isCompleted ? "bg-success text-btn-text" : ""
                            } ${isCurrent ? "bg-accent text-btn-text" : ""} ${
                              isPending ? "bg-bg-secondary text-text-muted border border-border-primary" : ""
                            }`}
                          >
                            {isCompleted ? (
                              <CheckIcon className="w-3 h-3" />
                            ) : (
                              <span>{stage.id}</span>
                            )}
                          </div>
                          <span
                            className={`flex-1 truncate ${isCompleted ? "text-success" : ""} ${
                              isCurrent ? "text-accent font-medium" : ""
                            } ${isPending ? "text-text-muted" : ""}`}
                          >
                            {stage.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[9px] font-medium text-accent uppercase">Current</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl border border-border-primary bg-bg-tertiary p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-accent-muted flex items-center justify-center">
                      <ActivityIcon className="w-3 h-3 text-accent" />
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm">Recent Activity</h4>
                  </div>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {statusHistory.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary border border-border-secondary"
                      >
                        <div className="w-8 h-8 rounded-lg bg-success-muted flex items-center justify-center flex-shrink-0">
                          <CheckCircleIcon className="w-4 h-4 text-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-text-primary">
                            Moved to {STAGES[item.stage - 1]?.name}
                          </p>
                          {item.note && (
                            <p className="text-xs text-text-tertiary mt-0.5">{item.note}</p>
                          )}
                          <p className="text-[10px] text-text-muted mt-1">
                            {item.createdAt.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {" · "}
                            {item.updatedBy}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-xl border border-border-primary bg-bg-secondary p-6">
          <h3 className="font-semibold text-text-primary mb-4">🎯 Try It Now</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">Select a Stage</p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  In the Admin panel, pick a new stage from the dropdown
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">Add a Note</p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  Optionally add a message for the client
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">Watch It Update</p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  See the Client view update instantly!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Try Real App */}
        <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Ready to try the real app?</h3>
              <p className="text-blue-100 text-sm mt-1">
                Use these test credentials to log in and explore everything
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
                <span className="text-blue-200">Client:</span>{" "}
                <code className="text-white">client@test.com</code> / <code className="text-white">test123</code>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
                <span className="text-blue-200">Admin:</span>{" "}
                <code className="text-white">admin@test.com</code> / <code className="text-white">test123</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// Icons
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
    </svg>
  );
}
