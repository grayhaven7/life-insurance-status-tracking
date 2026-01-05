"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function L4Content() {
  useEffect(() => {
    // Fire conversion events when page loads
    // Facebook Pixel - SubmitApplication
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "SubmitApplication");
    }

    // Google Ads conversion
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-10812495902/cwPfCP7hnZUDEJ6w5qMo",
      });
    }
  }, []);

  return (
    <div className="landing-page l4-page">
      {/* Conversion tracking script - fires on page load */}
      <Script
        id="conversion-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Facebook Pixel - SubmitApplication
            if (typeof fbq !== 'undefined') {
              fbq('track', 'SubmitApplication');
            }
            // Google Ads conversion
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {'send_to': 'AW-10812495902/cwPfCP7hnZUDEJ6w5qMo'});
            }
          `,
        }}
      />

      <main className="flex items-center justify-center min-h-screen py-8">
        <div className="l4-card">
          {/* Two-column layout */}
          <div
            className="l4-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Left Column - Thank You Message */}
            <div className="text-center md:text-left">
              {/* Mailman Illustration */}
              <div className="mb-6">
                <svg
                  className="mailman-illustration"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple mailman/envelope illustration */}
                  <circle cx="100" cy="100" r="90" fill="#CBE4F6" />
                  <rect
                    x="50"
                    y="70"
                    width="100"
                    height="70"
                    rx="4"
                    fill="#123375"
                  />
                  <path
                    d="M50 74L100 110L150 74"
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="100" cy="45" r="25" fill="#463F3A" />
                  <rect x="90" y="30" width="20" height="20" rx="2" fill="#CBE4F6" />
                  <path d="M95 38L100 43L105 38" stroke="#123375" strokeWidth="1.5" />
                </svg>
              </div>

              <h1
                className="text-3xl md:text-4xl mb-4"
                style={{ color: "#123375", fontFamily: "var(--font-fjalla), 'Fjalla One', sans-serif" }}
              >
                Thanks for booking your call!
              </h1>

              <p
                className="subhead text-lg md:text-xl"
                style={{ color: "#333", fontFamily: "var(--font-alegreya), 'Alegreya Sans', sans-serif" }}
              >
                You should receive our calendar invite shortly. Please check your
                inbox, junk, and spam folders!
              </p>
            </div>

            {/* Right Column - Resources */}
            <div>
              <h2
                className="text-xl md:text-2xl mb-6"
                style={{ color: "#123375", fontFamily: "var(--font-fjalla), 'Fjalla One', sans-serif" }}
              >
                In the meantime:
              </h2>

              <div className="space-y-1">
                <Link
                  href="https://www.google.com/search?q=%22emerald+tide+financial%22+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l4-link flex items-center gap-2"
                >
                  <span>⭐</span>
                  <span>Read Client Testimonials</span>
                </Link>

                <Link
                  href="https://drive.google.com/file/d/1u8seYfllZQzBfFIADCwdP7a9WsByxWX_/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l4-link flex items-center gap-2"
                >
                  <span>📄</span>
                  <span>Learn About Our Company</span>
                </Link>

                <Link
                  href="https://www.emeraldtidefinancial.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l4-link flex items-center gap-2"
                >
                  <span>🌐</span>
                  <span>Visit Our Website</span>
                </Link>

                <Link
                  href="https://drive.google.com/file/d/1dbiLzKW8h9wu90O38tilvOfGDCZ-LC0h/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l4-link flex items-center gap-2"
                >
                  <span>👤</span>
                  <span>Meet Our CEO</span>
                </Link>

                <Link
                  href="https://www.linkedin.com/in/gronowetter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l4-link flex items-center gap-2"
                >
                  <span>💼</span>
                  <span>Connect on LinkedIn</span>
                </Link>

                <Link
                  href="https://brokercheck.finra.org/individual/summary/6223413"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l4-link flex items-center gap-2"
                >
                  <span>✅</span>
                  <span>View FINRA BrokerCheck Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - minimal on dark background */}
      <footer className="text-center py-4" style={{ color: "rgba(255,255,255,0.6)" }}>
        <p className="text-sm">&copy;2026 US Tax-Free Retirement Center</p>
      </footer>
    </div>
  );
}
