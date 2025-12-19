"use client";

import { signOut } from "next-auth/react";

interface Props {
  clientName: string;
}

export default function ClientDashboardHeader({ clientName }: Props) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">Financial Planning Group</h1>
          <p className="text-sm text-muted">Client Portal</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900">{clientName}</p>
            <p className="text-xs text-muted">Client</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
