"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Bird logo SVG matching the Emerald Tide Financial branding - horizontal layout
const BirdLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 280 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bird icon */}
    <g transform="translate(0, 5) scale(0.5)">
      {/* Bird body and head - sky blue */}
      <path
        d="M85 25 C95 15 105 20 110 30 C115 40 110 50 100 55 L90 52 C85 50 82 45 85 40 C88 35 87 28 85 25Z"
        fill="url(#blueGradNav)"
      />
      {/* Bird beak */}
      <path d="M110 30 L120 28 L112 35 Z" fill="#0096C7" />
      {/* Bird eye */}
      <circle cx="98" cy="35" r="3" fill="#1A365D" />
      {/* Wing feathers - green gradient */}
      <path
        d="M80 45 C60 35 40 40 20 55 C10 62 5 70 10 75 C20 70 35 60 55 55 C70 52 82 50 80 45Z"
        fill="url(#greenGradNav)"
      />
      <path
        d="M75 55 C55 50 35 55 15 70 C5 78 0 85 5 88 C15 82 30 72 50 67 C65 63 77 60 75 55Z"
        fill="url(#greenGrad2Nav)"
      />
      <path
        d="M70 65 C50 62 30 68 10 82 C2 88 0 93 5 95 C12 90 25 82 45 78 C58 75 72 70 70 65Z"
        fill="url(#greenGrad3Nav)"
      />
    </g>
    {/* Text - Emerald Tide Financial */}
    <text x="70" y="32" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="22" fill="#1A365D">
      Emerald Tide
    </text>
    <text x="70" y="50" fontFamily="Nunito, sans-serif" fontWeight="600" fontSize="14" fill="#00B4D8">
      Financial
    </text>
    <defs>
      <linearGradient id="blueGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#48CAE4" />
        <stop offset="50%" stopColor="#00B4D8" />
        <stop offset="100%" stopColor="#0096C7" />
      </linearGradient>
      <linearGradient id="greenGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9ACD32" />
        <stop offset="50%" stopColor="#7CB518" />
        <stop offset="100%" stopColor="#5A8A0F" />
      </linearGradient>
      <linearGradient id="greenGrad2Nav" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7CB518" />
        <stop offset="100%" stopColor="#5A8A0F" />
      </linearGradient>
      <linearGradient id="greenGrad3Nav" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5A8A0F" />
        <stop offset="100%" stopColor="#3D6008" />
      </linearGradient>
    </defs>
  </svg>
);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

const CALENDLY_URL = "https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp";

export default function EmeraldNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="emerald-nav">
      <div className="emerald-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Horizontal layout with bird + text */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <Image 
              src="/images/emerald-tide-logo.png" 
              alt="Emerald Tide Financial" 
              width={48} 
              height={48}
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105 object-contain"
              style={{ objectPosition: 'top' }}
              priority
            />
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-extrabold text-[#1A365D] leading-tight">
                Emerald Tide
              </span>
              <span className="text-xs md:text-sm font-semibold text-[#00B4D8] leading-tight">
                Financial
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="emerald-nav-link"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="emerald-btn-primary text-sm py-2.5 px-5"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl text-[var(--text-body)] hover:bg-[var(--glass-blue)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Glass panel */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-6 border-t border-[rgba(0,180,216,0.1)]"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.95) 100%)',
              borderRadius: '0 0 24px 24px',
              margin: '0 -1.25rem',
              padding: '1.5rem 1.25rem',
            }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="emerald-nav-link py-3 px-4 rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="emerald-btn-primary text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Call
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
