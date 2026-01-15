import Link from "next/link";
import Image from "next/image";

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

// Bird logo for footer - light version
const BirdLogoLight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 280 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bird icon */}
    <g transform="translate(0, 5) scale(0.5)">
      <path
        d="M85 25 C95 15 105 20 110 30 C115 40 110 50 100 55 L90 52 C85 50 82 45 85 40 C88 35 87 28 85 25Z"
        fill="#48CAE4"
      />
      <path d="M110 30 L120 28 L112 35 Z" fill="#90E0EF" />
      <circle cx="98" cy="35" r="3" fill="white" />
      <path
        d="M80 45 C60 35 40 40 20 55 C10 62 5 70 10 75 C20 70 35 60 55 55 C70 52 82 50 80 45Z"
        fill="#9ACD32"
      />
      <path
        d="M75 55 C55 50 35 55 15 70 C5 78 0 85 5 88 C15 82 30 72 50 67 C65 63 77 60 75 55Z"
        fill="#7CB518"
      />
      <path
        d="M70 65 C50 62 30 68 10 82 C2 88 0 93 5 95 C12 90 25 82 45 78 C58 75 72 70 70 65Z"
        fill="#5A8A0F"
      />
    </g>
    {/* Text */}
    <text x="70" y="32" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="22" fill="white">
      Emerald Tide
    </text>
    <text x="70" y="50" fontFamily="Nunito, sans-serif" fontWeight="600" fontSize="14" fill="#90E0EF">
      Financial
    </text>
  </svg>
);

export default function EmeraldFooter() {
  return (
    <footer className="emerald-footer">
      {/* Decorative wave at top */}
      <svg
        className="absolute top-0 left-0 w-full h-16 z-0"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 32 Q 360 0 720 32 T 1440 32 V 64 H 0 Z"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M0 40 Q 360 16 720 40 T 1440 40 V 64 H 0 Z"
          fill="rgba(255,255,255,0.03)"
        />
      </svg>

      {/* Main Footer Content */}
      <div className="emerald-container py-16 pt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image 
                src="/images/emerald-tide-logo.png" 
                alt="Emerald Tide Financial" 
                width={48} 
                height={48}
                className="h-10 w-auto brightness-0 invert object-contain"
                style={{ objectPosition: 'top' }}
              />
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white leading-tight">
                  Emerald Tide
                </span>
                <span className="text-sm font-semibold text-[#90E0EF] leading-tight">
                  Financial
                </span>
              </div>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.75)] leading-relaxed mt-3">
              Home of the Tax-Free Pension. We help you create a robust, 6- or
              7-figure, tax-free pension for life.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Contact Us</h3>
            <div className="space-y-4">
              <a
                href="tel:+15753637253"
                className="flex items-center gap-3 text-sm text-[rgba(255,255,255,0.8)] hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center group-hover:bg-[rgba(124,181,24,0.3)] transition-colors">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                (575) 363-7253
              </a>
              <a
                href="mailto:neil@emeraldtidefinancial.com"
                className="flex items-center gap-3 text-sm text-[rgba(255,255,255,0.8)] hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center group-hover:bg-[rgba(124,181,24,0.3)] transition-colors">
                  <EmailIcon className="w-4 h-4" />
                </span>
                neil@emeraldtidefinancial.com
              </a>
              <div className="flex items-start gap-3 text-sm text-[rgba(255,255,255,0.8)]">
                <span className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0">
                  <LocationIcon className="w-4 h-4" />
                </span>
                <span className="leading-relaxed">
                  500 West Putnam Avenue
                  <br />
                  Suite 400
                  <br />
                  Greenwich, CT 06830
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">Quick Links</h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-[rgba(255,255,255,0.8)] hover:text-white hover:translate-x-1 transition-all"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-sm text-[rgba(255,255,255,0.8)] hover:text-white hover:translate-x-1 transition-all"
              >
                About
              </Link>
              <Link
                href="/team"
                className="block text-sm text-[rgba(255,255,255,0.8)] hover:text-white hover:translate-x-1 transition-all"
              >
                Our Team
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-[rgba(255,255,255,0.8)] hover:text-white hover:translate-x-1 transition-all"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Disclaimer */}
      <div className="border-t border-[rgba(255,255,255,0.1)]">
        <div className="emerald-container py-8">
          <p className="text-xs text-[rgba(255,255,255,0.5)] leading-loose">
            The information provided on this website is for general informational
            purposes only and should not be construed as financial, tax, or legal
            advice. Please consult with a qualified professional before making any
            financial decisions. Results may vary based on individual circumstances.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(255,255,255,0.1)]">
        <div className="emerald-container py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[rgba(255,255,255,0.6)]">
              &copy; 2026 Emerald Tide Financial. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/ccpa"
                className="text-sm text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
              >
                CCPA Disclosure
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bubble accents - hidden on small screens */}
      <div
        className="hidden sm:block absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #7CB518 0%, transparent 70%)',
        }}
      />
      <div
        className="hidden sm:block absolute top-40 left-5 w-24 h-24 rounded-full opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #48CAE4 0%, transparent 70%)',
        }}
      />
    </footer>
  );
}
