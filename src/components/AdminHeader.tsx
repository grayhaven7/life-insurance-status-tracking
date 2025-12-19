"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  userName: string;
}

export default function AdminHeader({ userName }: Props) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/dashboard", label: "Clients" },
    { href: "/admin/clients/new", label: "Add Client" },
  ];

  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-bold text-white">Financial Planning Group</h1>
            <p className="text-sm text-blue-200">Admin Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        <nav className="flex gap-1 -mb-px">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                pathname === link.href
                  ? "bg-white text-primary"
                  : "text-blue-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
