"use client";

import { useState } from "react";
import Link from "next/link";

const stages = [
  { id: 1, name: "Submitted", description: "Application has been submitted and is being processed" },
  { id: 2, name: "Part 2 Sent", description: "Part 2 of the application has been sent to client" },
  { id: 3, name: "Part 2 Completed", description: "Client has completed Part 2" },
  { id: 4, name: "Medical Exam Booked", description: "Medical examination has been scheduled" },
  { id: 5, name: "Medical Exam Completed", description: "Medical examination has been completed" },
  { id: 6, name: "Records Ordered", description: "Medical records have been requested" },
  { id: 7, name: "Records Received", description: "Medical records have been received" },
  { id: 8, name: "Procedure / Report Outstanding", description: "Additional procedures or reports are pending" },
  { id: 9, name: "Procedure / Report Completed", description: "All required procedures and reports are complete" },
  { id: 10, name: "News To Deliver To Client", description: "Update ready to share with client" },
  { id: 11, name: "Zoom Call Scheduled (Review)", description: "Review Zoom call has been scheduled" },
  { id: 12, name: "Zoom Call Completed (Review)", description: "Review Zoom call has been completed" },
  { id: 13, name: "Paperwork Delivered", description: "Final paperwork has been delivered" },
  { id: 14, name: "Zoom Call Scheduled (Signing)", description: "Signing Zoom call has been scheduled" },
  { id: 15, name: "Zoom Call Completed (Signing)", description: "Signing Zoom call has been completed" },
  { id: 16, name: "Paperwork Signed", description: "All paperwork has been signed" },
  { id: 17, name: "Tax-Free Pension In Force", description: "Congratulations! Tax-Free Pension is now in force" },
];

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [demoStage, setDemoStage] = useState(5);

  const progressPercent = Math.round((demoStage / 17) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Financial Planning Group</h1>
            <p className="text-blue-200 text-sm">Life Insurance Status Tracking Portal - Demo</p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              Client Login →
            </Link>
            <Link 
              href="/admin/login" 
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              Admin Login →
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/5 border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "client-portal", label: "Client Portal" },
              { id: "admin-portal", label: "Admin Portal" },
              { id: "stages", label: "17 Stages" },
              { id: "try-it", label: "Try It Yourself" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? "bg-white text-blue-900"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center py-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Life Insurance Status Tracking Portal
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                A modern client portal that lets your clients track their application progress 24/7, 
                while giving your team a powerful dashboard to manage everything.
              </p>
            </div>

            {/* Problem & Solution */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4">😫 The Problem</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✕</span>
                    Constant phone calls asking &quot;What stage is my application at?&quot;
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✕</span>
                    Manually sending status update emails one by one
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✕</span>
                    Clients have no visibility into the 17-stage process
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400">✕</span>
                    Tracking progress across spreadsheets and email threads
                  </li>
                </ul>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">✨ The Solution</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    Clients check their own status anytime - no calls needed
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    Automatic email notifications when status changes
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    Visual progress bar and timeline shows exactly where they are
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400">✓</span>
                    One dashboard to manage all clients and their progress
                  </li>
                </ul>
              </div>
            </div>

            {/* Two Portals */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div 
                className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-8 cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setActiveSection("client-portal")}
              >
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-white mb-2">Client Portal</h3>
                <p className="text-white/70 mb-4">
                  Where your clients log in to see their application progress, timeline, 
                  and receive updates.
                </p>
                <div className="text-emerald-400 font-medium">Click to explore →</div>
              </div>
              <div 
                className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-8 cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setActiveSection("admin-portal")}
              >
                <div className="text-4xl mb-4">👔</div>
                <h3 className="text-2xl font-bold text-white mb-2">Admin Portal</h3>
                <p className="text-white/70 mb-4">
                  Where your team manages clients, updates their status, and tracks 
                  everyone&apos;s progress.
                </p>
                <div className="text-orange-400 font-medium">Click to explore →</div>
              </div>
            </div>
          </div>
        )}

        {/* Client Portal Section */}
        {activeSection === "client-portal" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Client Portal</h2>
                <p className="text-blue-200">What your clients see when they log in</p>
              </div>
              <Link 
                href="/login" 
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
              >
                Try Client Login →
              </Link>
            </div>

            {/* Interactive Demo */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Mock Browser Bar */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-sm text-slate-500 border">
                    yoursite.com/dashboard
                  </div>
                </div>
              </div>

              {/* Mock Client Dashboard */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Hello, John! 👋</h3>
                    <p className="text-slate-500">Track your life insurance application progress below.</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                </div>

                {/* Progress Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-700">Your Progress</h4>
                    <span className="text-3xl font-bold text-blue-600">{progressPercent}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>

                  {/* Current Stage */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-4">
                    <div className="text-xs font-bold text-orange-600 mb-1">STEP {demoStage} OF 17</div>
                    <div className="text-lg font-bold text-slate-900">{stages[demoStage - 1].name}</div>
                    <div className="text-sm text-slate-600">{stages[demoStage - 1].description}</div>
                  </div>
                </div>

                {/* Stage Slider */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <label className="block text-sm font-medium text-blue-800 mb-2">
                    🎮 Interactive: Drag to see different stages
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="17"
                    value={demoStage}
                    onChange={(e) => setDemoStage(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-blue-600 mt-1">
                    <span>Stage 1</span>
                    <span>Stage 17</span>
                  </div>
                </div>

                {/* Mini Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h4 className="font-semibold text-slate-700 mb-4">All Stages</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {stages.slice(0, 6).map((stage) => (
                      <div 
                        key={stage.id}
                        className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
                          stage.id < demoStage 
                            ? "bg-emerald-50 text-emerald-700" 
                            : stage.id === demoStage 
                            ? "bg-orange-100 text-orange-700 font-medium" 
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          stage.id < demoStage 
                            ? "bg-emerald-500 text-white" 
                            : stage.id === demoStage 
                            ? "bg-orange-500 text-white" 
                            : "bg-slate-200 text-slate-500"
                        }`}>
                          {stage.id < demoStage ? "✓" : stage.id}
                        </span>
                        <span className="truncate">{stage.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-center">...and 11 more stages</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: "📊", title: "Visual Progress Bar", desc: "Large percentage display with animated gradient bar" },
                { icon: "📍", title: "Current Stage", desc: "Shows step number, name, and helpful description" },
                { icon: "✅", title: "Full Timeline", desc: "All 17 stages with completion status" },
                { icon: "🕐", title: "Recent Activity", desc: "Last 5 status updates with notes and dates" },
                { icon: "📧", title: "Email Notifications", desc: "Automatic emails when status changes" },
                { icon: "📞", title: "Contact Advisor", desc: "One-click email or phone buttons" },
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-medium text-white">{feature.title}</div>
                  <div className="text-sm text-white/60">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin Portal Section */}
        {activeSection === "admin-portal" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
                <p className="text-blue-200">How your team manages clients and updates</p>
              </div>
              <Link 
                href="/admin/login" 
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
              >
                Try Admin Login →
              </Link>
            </div>

            {/* Admin Dashboard Mock */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Mock Browser Bar */}
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-sm text-slate-500 border">
                    yoursite.com/admin/dashboard
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Clients", value: "24", color: "blue" },
                    { label: "In Progress", value: "18", color: "orange" },
                    { label: "Completed", value: "5", color: "green" },
                    { label: "New This Week", value: "3", color: "purple" },
                  ].map((stat, i) => (
                    <div key={i} className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-xl p-4`}>
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Search and Add */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Search clients by name or email..." 
                      className="w-full px-4 py-3 pl-10 border border-slate-200 rounded-xl"
                      disabled
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium">
                    + Add Client
                  </button>
                </div>

                {/* Client Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr className="text-left text-sm text-slate-500">
                        <th className="px-4 py-3">Client</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Progress</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "John Doe", email: "john@example.com", stage: 5, status: "Medical Exam Completed" },
                        { name: "Sarah Smith", email: "sarah@example.com", stage: 12, status: "Zoom Call Completed" },
                        { name: "Mike Johnson", email: "mike@example.com", stage: 17, status: "Complete ✅" },
                      ].map((client, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {client.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-medium text-slate-900">{client.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-slate-500">{client.email}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              client.stage === 17 ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"
                                style={{ width: `${Math.round((client.stage / 17) * 100)}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                              View →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Features */}
            <h3 className="text-xl font-bold text-white mt-8">Admin Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "📊", title: "Dashboard Overview", desc: "See total clients, in progress, completed, and new this week at a glance" },
                { icon: "🔍", title: "Search & Filter", desc: "Instantly find any client by name or email" },
                { icon: "➕", title: "Add New Clients", desc: "Create client accounts with auto-generated passwords and welcome emails" },
                { icon: "🔄", title: "Update Status", desc: "One-click to update any client to any of the 17 stages" },
                { icon: "📝", title: "Add Notes", desc: "Include notes with status updates that clients see in their portal" },
                { icon: "📜", title: "Full History", desc: "Complete audit trail of all status changes with dates and who made them" },
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5 flex gap-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <div className="font-medium text-white">{feature.title}</div>
                    <div className="text-sm text-white/60">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 17 Stages Section */}
        {activeSection === "stages" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">The 17 Application Stages</h2>
              <p className="text-blue-200">Every life insurance application moves through these stages</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stages.map((stage) => (
                <div 
                  key={stage.id}
                  className={`bg-white/10 border border-white/20 rounded-xl p-4 flex gap-4 ${
                    stage.id === 17 ? "bg-emerald-500/20 border-emerald-500/40" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                    stage.id === 17 ? "bg-emerald-500" : "bg-blue-600"
                  }`}>
                    {stage.id === 17 ? "✓" : stage.id}
                  </div>
                  <div>
                    <div className="font-medium text-white">{stage.name}</div>
                    <div className="text-sm text-white/60">{stage.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Try It Yourself Section */}
        {activeSection === "try-it" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Try It Yourself!</h2>
              <p className="text-blue-200">Use these test accounts to explore the portal</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Client Login */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-2 border-emerald-500/40 rounded-2xl p-8">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-white mb-4">Client Portal</h3>
                <p className="text-white/70 mb-6">
                  See what your clients experience when they check their application status.
                </p>
                
                <div className="bg-black/20 rounded-xl p-4 mb-6 font-mono">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-300 text-sm">URL</span>
                    <span className="text-white">/login</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-300 text-sm">Email</span>
                    <span className="text-white">client@test.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300 text-sm">Password</span>
                    <span className="text-white">test123</span>
                  </div>
                </div>

                <Link 
                  href="/login"
                  className="block w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-center rounded-xl font-medium transition-colors"
                >
                  Open Client Portal →
                </Link>
              </div>

              {/* Admin Login */}
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500/40 rounded-2xl p-8">
                <div className="text-3xl mb-4">👔</div>
                <h3 className="text-2xl font-bold text-white mb-4">Admin Portal</h3>
                <p className="text-white/70 mb-6">
                  See how your team manages clients and updates their status.
                </p>
                
                <div className="bg-black/20 rounded-xl p-4 mb-6 font-mono">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-orange-300 text-sm">URL</span>
                    <span className="text-white">/admin/login</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-orange-300 text-sm">Email</span>
                    <span className="text-white">admin@test.com</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-300 text-sm">Password</span>
                    <span className="text-white">test123</span>
                  </div>
                </div>

                <Link 
                  href="/admin/login"
                  className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-xl font-medium transition-colors"
                >
                  Open Admin Portal →
                </Link>
              </div>
            </div>

            {/* What to Try */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">💡 Suggested Demo Flow</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-orange-400 mb-3">As Admin:</h4>
                  <ol className="space-y-2 text-white/80">
                    <li className="flex gap-3">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                      Log in at /admin/login
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                      View the dashboard with all clients
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                      Click &quot;View&quot; on the test client
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">4</span>
                      Update their status to a new stage
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">5</span>
                      Add a note and click Update
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-emerald-400 mb-3">As Client:</h4>
                  <ol className="space-y-2 text-white/80">
                    <li className="flex gap-3">
                      <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                      Open a new window, go to /login
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                      Log in with client@test.com
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                      See the dashboard with progress
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">4</span>
                      After admin updates, refresh
                    </li>
                    <li className="flex gap-3">
                      <span className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">5</span>
                      See the new status and note!
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="text-center py-8">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-2xl font-bold text-white mb-2">Questions?</h3>
              <p className="text-white/70">Feel free to explore and try anything - these are test accounts!</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/50 text-sm">
          Financial Planning Group - Life Insurance Status Tracking Portal
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
