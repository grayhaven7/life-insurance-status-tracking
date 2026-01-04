"use client";

import { signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

interface Props {
  clientName: string;
}

export default function ClientDashboardHeader({ clientName }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-primary bg-bg-primary/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                {/* Emerald gem with wave */}
                <path d="M12 3L5 10L12 21L19 10L12 3Z" fill="currentColor" fillOpacity="0.3" />
                <path d="M12 3L5 10L12 21L19 10L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 10H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8.5 10L12 21L15.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-text-primary truncate">Emerald Tide Financial</h1>
              <p className="text-xs text-text-tertiary hidden sm:block">Client Portal</p>
            </div>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center">
                <span className="text-xs font-medium text-accent">
                  {clientName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{clientName}</p>
                <p className="text-xs text-text-tertiary">Client</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/progress" })}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all border border-border-primary"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}
