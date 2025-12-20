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
  const [step, setStep] = useState(0);
  const [demoStage, setDemoStage] = useState(5);
  const [demoNote, setDemoNote] = useState("");
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [statusHistory, setStatusHistory] = useState<HistoryItem[]>([
    {
      id: 5,
      stage: 5,
      note: "Medical exam completed successfully",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
    {
      id: 4,
      stage: 4,
      note: "Exam scheduled for Tuesday at 10am",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
    {
      id: 3,
      stage: 3,
      note: "Thank you for completing Part 2!",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
    {
      id: 2,
      stage: 2,
      note: "Part 2 forms sent to your email",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
    {
      id: 1,
      stage: 1,
      note: "Application received",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      updatedBy: "Neil Gronowetter",
    },
  ]);

  const progress = getProgressPercentage(demoStage);
  const currentStageData = STAGES.find((s) => s.id === demoStage);

  const handleDemoUpdate = () => {
    const newStage = Math.min(demoStage + 1, 17);
    const newHistory: HistoryItem = {
      id: statusHistory.length + 1,
      stage: newStage,
      note: demoNote || STAGES[newStage - 1].description,
      createdAt: new Date(),
      updatedBy: "You (Demo)",
    };
    setStatusHistory([newHistory, ...statusHistory]);
    setDemoStage(newStage);
    setDemoNote("");
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 2000);
  };

  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
  };

  const steps = [
    { id: "intro", title: "Welcome" },
    { id: "client-login", title: "Client Login" },
    { id: "client-dashboard", title: "Client Dashboard" },
    { id: "client-progress", title: "Progress Tracking" },
    { id: "client-activity", title: "Activity History" },
    { id: "admin-login", title: "Admin Login" },
    { id: "admin-dashboard", title: "Admin Dashboard" },
    { id: "admin-add-client", title: "Add New Client" },
    { id: "admin-client", title: "Client Management" },
    { id: "admin-update", title: "Status Updates" },
    { id: "try-it", title: "Try It Yourself" },
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              FP
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">Life Insurance Status Tracking</h1>
              <p className="text-slate-400 text-xs">Product Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === step ? "bg-blue-500 w-6" : i < step ? "bg-blue-500/50" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Interactive Demo
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Life Insurance Status Tracking Portal
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              See how your clients track their application progress and how your team manages updates.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                Start Tour →
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Client Login */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={1}
              title="Client Login"
              description="Clients receive their login credentials via email and access their personal portal."
            />
            
            <div className="mt-8 max-w-md mx-auto">
              <BrowserFrame url="yoursite.com/login">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold mx-auto mb-3">
                        FP
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Welcome Back</h3>
                      <p className="text-slate-500 text-sm">Sign in to view your application status</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                          type="email"
                          value="john.doe@example.com"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                          type="password"
                          value="••••••••"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        />
                      </div>
                      <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium">
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Clean, branded login page",
              "Secure email & password authentication",
              "Credentials sent automatically when client is added",
            ]} />
          </div>
        )}

        {/* Step 2: Client Dashboard */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={2}
              title="Client Dashboard"
              description="After logging in, clients see their personalized dashboard with progress at a glance."
            />
            
            <div className="mt-8">
              <BrowserFrame url="yoursite.com/dashboard">
                <div className="bg-slate-50 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                        FP
                      </div>
                      <span className="font-semibold text-slate-900">Client Portal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                        JD
                      </div>
                    </div>
                  </div>

                  {/* Welcome */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Hello, John! 👋</h2>
                    <p className="text-slate-500">Track your life insurance application progress below.</p>
                  </div>

                  {/* Progress Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">Application Progress</h3>
                        <p className="text-sm text-slate-500">Track your journey to completion</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-blue-600">{progress}%</span>
                        <p className="text-xs text-slate-500">Complete</p>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Personalized welcome with client's name",
              "Large progress percentage display",
              "Visual gradient progress bar",
            ]} />
          </div>
        )}

        {/* Step 3: Progress Tracking */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={3}
              title="Progress Tracking"
              description="Clients can see exactly where they are in the 17-stage application process."
            />
            
            <div className="mt-8">
              <BrowserFrame url="yoursite.com/dashboard">
                <div className="bg-slate-50 p-6">
                  {/* Current Stage */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                        STEP {demoStage} OF 17
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{currentStageData?.name}</h3>
                    <p className="text-slate-600">{currentStageData?.description}</p>
                  </div>

                  {/* Stage Timeline */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">All Stages</h4>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {STAGES.slice(0, 10).map((stage) => {
                        const isCompleted = stage.id < demoStage;
                        const isCurrent = stage.id === demoStage;
                        const isPending = stage.id > demoStage;

                        return (
                          <div
                            key={stage.id}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                              isCurrent ? "bg-orange-50 border border-orange-200" : ""
                            } ${isCompleted ? "bg-green-50" : ""}`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                isCompleted ? "bg-green-500 text-white" : ""
                              } ${isCurrent ? "bg-orange-500 text-white" : ""} ${
                                isPending ? "bg-slate-200 text-slate-500" : ""
                              }`}
                            >
                              {isCompleted ? "✓" : stage.id}
                            </div>
                            <span className={`text-sm ${isCompleted ? "text-green-700" : ""} ${isCurrent ? "text-orange-700 font-medium" : ""} ${isPending ? "text-slate-400" : ""}`}>
                              {stage.name}
                            </span>
                            {isCurrent && <span className="ml-auto text-xs font-medium text-orange-600">CURRENT</span>}
                            {isCompleted && <span className="ml-auto text-xs font-medium text-green-600">DONE</span>}
                          </div>
                        );
                      })}
                      <p className="text-center text-xs text-slate-400 py-2">...and 7 more stages</p>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Current stage prominently highlighted",
              "Clear description of what's happening now",
              "Complete timeline showing all 17 stages",
              "Green checkmarks for completed stages",
            ]} />
          </div>
        )}

        {/* Step 4: Activity History */}
        {step === 4 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={4}
              title="Activity History"
              description="Clients can see all recent updates and notes from their advisor."
            />
            
            <div className="mt-8 max-w-2xl mx-auto">
              <BrowserFrame url="yoursite.com/dashboard">
                <div className="bg-slate-50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <ActivityIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Recent Activity</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {statusHistory.slice(0, 4).map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">
                              Moved to {STAGES[item.stage - 1]?.name}
                            </p>
                            <p className="text-sm text-slate-500 mt-0.5">{item.note}</p>
                            <p className="text-xs text-slate-400 mt-2">
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
                      </div>
                    ))}
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Complete history of all status changes",
              "Notes from advisor included",
              "Timestamps and who made the update",
              "Clients also receive email notifications",
            ]} />
          </div>
        )}

        {/* Step 5: Admin Login */}
        {step === 5 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={5}
              title="Admin Login"
              description="Your team accesses the admin portal to manage clients and update statuses."
            />
            
            <div className="mt-8 max-w-md mx-auto">
              <BrowserFrame url="yoursite.com/admin/login">
                <div className="bg-slate-900 p-8">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold mx-auto mb-3">
                        FP
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Admin Portal</h3>
                      <p className="text-slate-500 text-sm">Sign in to manage clients</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                          type="email"
                          value="neil@financialplanninggroup.com"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                          type="password"
                          value="••••••••"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        />
                      </div>
                      <button className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium">
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Separate secure login for admins",
              "Only authorized team members can access",
              "Different from client portal",
            ]} />
          </div>
        )}

        {/* Step 6: Admin Dashboard */}
        {step === 6 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={6}
              title="Admin Dashboard"
              description="See all clients at a glance with key statistics and quick search."
            />
            
            <div className="mt-8">
              <BrowserFrame url="yoursite.com/admin/dashboard">
                <div className="bg-slate-50 p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Total Clients", value: "24", color: "blue" },
                      { label: "In Progress", value: "18", color: "orange" },
                      { label: "Completed", value: "5", color: "green" },
                      { label: "New This Week", value: "3", color: "purple" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Search & Add */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                      <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900"
                      />
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">
                      + Add Client
                    </button>
                  </div>

                  {/* Client Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-left text-sm text-slate-500">
                          <th className="px-4 py-3 font-medium">Client</th>
                          <th className="px-4 py-3 font-medium">Status</th>
                          <th className="px-4 py-3 font-medium">Progress</th>
                          <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "John Doe", initials: "JD", stage: 5, status: "Medical Exam Completed" },
                          { name: "Sarah Smith", initials: "SS", stage: 12, status: "Zoom Call Completed" },
                          { name: "Mike Johnson", initials: "MJ", stage: 17, status: "Complete" },
                        ].map((client) => (
                          <tr key={client.name} className="border-b border-slate-100 last:border-0">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                                  {client.initials}
                                </div>
                                <span className="font-medium text-slate-900">{client.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                client.stage === 17 ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                              }`}>
                                {client.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
                                  style={{ width: `${Math.round((client.stage / 17) * 100)}%` }}
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Statistics cards show key metrics",
              "Search clients by name or email",
              "Add new clients with one click",
              "See progress bars for each client",
            ]} />
          </div>
        )}

        {/* Step 7: Add New Client */}
        {step === 7 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={7}
              title="Add New Client"
              description="Create new client accounts in seconds. They'll receive login credentials automatically."
            />
            
            <div className="mt-8 max-w-xl mx-auto">
              <BrowserFrame url="yoursite.com/admin/clients/new">
                <div className="bg-slate-50 p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Add New Client</h3>
                    <p className="text-sm text-slate-500">Create a new client account. They will receive their login credentials via email.</p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value="Sarah Johnson"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value="sarah.johnson@example.com"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Phone Number <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          value="(555) 987-6543"
                          readOnly
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Temporary Password <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={generatedPassword || "xK7mNp2qRs4t"}
                            readOnly
                            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 font-mono"
                          />
                          <button
                            onClick={generatePassword}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                          >
                            <DiceIcon className="w-4 h-4" />
                            Generate
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5">This password will be sent to the client via email.</p>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <input
                          type="checkbox"
                          checked={true}
                          readOnly
                          className="w-4 h-4 rounded border-slate-300 text-blue-600"
                        />
                        <label className="text-sm text-slate-700">
                          Send welcome email with login credentials
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-medium">
                          Cancel
                        </button>
                        <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                          <PlusIcon className="w-4 h-4" />
                          Create Client
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <p className="text-center text-sm text-slate-500 mt-4">
              👆 Try clicking &quot;Generate&quot; to create a secure password!
            </p>

            <FeatureList features={[
              "Simple form with name, email, phone",
              "One-click secure password generator",
              "Automatic welcome email with credentials",
              "Client can log in immediately",
            ]} />
          </div>
        )}

        {/* Step 8: Client Management */}
        {step === 8 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={8}
              title="Client Management"
              description="View detailed client information, contact details, and complete history."
            />
            
            <div className="mt-8">
              <BrowserFrame url="yoursite.com/admin/clients/john-doe">
                <div className="bg-slate-50 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Client Info */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                          JD
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">John Doe</h3>
                          <p className="text-sm text-slate-500">Client since Dec 2024</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-sm">
                          <MailIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">john.doe@example.com</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 text-sm">
                          <PhoneIcon className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-600">(555) 123-4567</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-slate-900">Current Progress</h3>
                        <span className="text-2xl font-bold text-blue-600">{progress}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-orange-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-orange-600 mb-0.5">STEP {demoStage} OF 17</p>
                        <p className="font-semibold text-slate-900">{currentStageData?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Full client contact information",
              "Clickable email and phone links",
              "Visual progress overview",
              "Current stage details",
            ]} />
          </div>
        )}

        {/* Step 9: Status Updates */}
        {step === 9 && (
          <div className="animate-fadeIn">
            <StepHeader
              number={9}
              title="Status Updates"
              description="Update client status with one click - they'll be notified automatically via email."
            />
            
            <div className="mt-8 max-w-xl mx-auto">
              <BrowserFrame url="yoursite.com/admin/clients/john-doe">
                <div className="bg-slate-50 p-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <RefreshIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900">Update Status</h3>
                    </div>

                    {showUpdateSuccess && (
                      <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Status updated! Client notified via email.
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">New Stage</label>
                        <select 
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-slate-900"
                          value={demoStage + 1}
                          onChange={() => {}}
                        >
                          <option>{demoStage + 1}. {STAGES[demoStage]?.name}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Note <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 resize-none"
                          rows={2}
                          placeholder="Add a note for the client..."
                          value={demoNote}
                          onChange={(e) => setDemoNote(e.target.value)}
                        />
                        <p className="text-xs text-slate-500 mt-1">This note will be included in the email notification.</p>
                      </div>

                      <button
                        onClick={handleDemoUpdate}
                        disabled={demoStage >= 17}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <SendIcon className="w-4 h-4" />
                        Update Status & Notify Client
                      </button>
                    </div>
                  </div>

                  <p className="text-center text-sm text-slate-500 mt-4">
                    👆 Try clicking the button to see the update in action!
                  </p>
                </div>
              </BrowserFrame>
            </div>

            <FeatureList features={[
              "Select any of the 17 stages",
              "Add optional notes for context",
              "Client receives email notification automatically",
              "Update history tracked",
            ]} />
          </div>
        )}

        {/* Step 10: Try It Yourself */}
        {step === 10 && (
          <div className="animate-fadeIn">
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm mb-6">
                <CheckIcon className="w-4 h-4" />
                Tour Complete!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Try It Yourself?
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                Use these test credentials to log in and explore the real app.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Client Login */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-xl font-bold text-white mb-2">Client Portal</h3>
                <p className="text-slate-400 text-sm mb-4">
                  See what your clients experience.
                </p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-emerald-400">Email:</span>
                    <span className="text-white">client@test.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400">Password:</span>
                    <span className="text-white">test123</span>
                  </div>
                </div>
                <Link
                  href="/login"
                  className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-lg font-medium transition-colors"
                >
                  Open Client Login →
                </Link>
              </div>

              {/* Admin Login */}
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-6">
                <div className="text-3xl mb-3">👔</div>
                <h3 className="text-xl font-bold text-white mb-2">Admin Portal</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Manage clients and update statuses.
                </p>
                <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-orange-400">Email:</span>
                    <span className="text-white">admin@test.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400">Password:</span>
                    <span className="text-white">test123</span>
                  </div>
                </div>
                <Link
                  href="/admin/login"
                  className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-lg font-medium transition-colors"
                >
                  Open Admin Login →
                </Link>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setStep(0)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Restart Tour
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step > 0 && step < steps.length - 1 && (
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-800">
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-5 py-2.5 text-slate-400 hover:text-white transition-colors"
            >
              ← Previous
            </button>
            <div className="text-slate-500 text-sm">
              {step + 1} of {steps.length}
            </div>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

// Components
function StepHeader({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold mb-4">
        {number}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
    </div>
  );
}

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1">
          <div className="bg-slate-700 rounded-md px-3 py-1 text-slate-400 text-xs">
            {url}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {features.map((feature, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-300 text-sm">
          <CheckIcon className="w-4 h-4 text-green-400" />
          {feature}
        </div>
      ))}
    </div>
  );
}

// Icons
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
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
