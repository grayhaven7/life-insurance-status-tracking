"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

interface Props {
  userName: string;
}

export default function AdminHeader({ userName }: Props) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/admin/dashboard", label: "Clients", icon: UsersIcon },
    { href: "/admin/clients/new", label: "Add Client", icon: PlusIcon },
    { href: "/admin/admins", label: "Admins", icon: ShieldIcon },
    { href: "/admin/debug/email-tracking", label: "Email Debug", icon: BugIcon },
  ];

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
              <p className="text-xs text-text-tertiary hidden sm:block">Admin Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? "bg-accent-muted text-accent" 
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                <span className="text-xs font-medium text-text-secondary">
                  {userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{userName}</p>
                <p className="text-xs text-text-tertiary">Administrator</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/portal" })}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all border border-border-primary"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all border border-border-primary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-primary bg-bg-primary/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full
                    ${isActive 
                      ? "bg-accent-muted text-accent" 
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-border-primary">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                  <span className="text-xs font-medium text-text-secondary">
                    {userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{userName}</p>
                  <p className="text-xs text-text-tertiary">Administrator</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/portal" })}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error-muted transition-all w-full mt-1"
              >
                <LogOutIcon className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
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

function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 6v6m-3-3h6m-6 6h6m-3-9a9 9 0 00-9 9c0 1.5.4 2.9 1.1 4.1l-1.1 1.1a1 1 0 000 1.4l1.4 1.4a1 1 0 001.4 0l1.1-1.1c1.2.7 2.6 1.1 4.1 1.1s2.9-.4 4.1-1.1l1.1 1.1a1 1 0 001.4 0l1.4-1.4a1 1 0 000-1.4l-1.1-1.1c.7-1.2 1.1-2.6 1.1-4.1a9 9 0 00-9-9z" />
    </svg>
  );
}
