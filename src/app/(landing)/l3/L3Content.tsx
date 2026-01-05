"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function L3Content() {
  useEffect(() => {
    // Initialize Calendly widget when script loads
    const initCalendly = () => {
      if (typeof window !== "undefined" && (window as { Calendly?: { initInlineWidget: (options: { url: string; parentElement: Element | null }) => void } }).Calendly) {
        (window as { Calendly: { initInlineWidget: (options: { url: string; parentElement: Element | null }) => void } }).Calendly.initInlineWidget({
          url: "https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=73c789",
          parentElement: document.getElementById("calendly-inline-widget"),
        });
      }
    };

    // Try to init immediately if Calendly is already loaded
    initCalendly();

    // Also listen for script load
    window.addEventListener("calendly-ready", initCalendly);
    return () => window.removeEventListener("calendly-ready", initCalendly);
  }, []);

  return (
    <div className="landing-page">
      {/* Calendly CSS */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event("calendly-ready"));
        }}
      />

      <main className="landing-hero" style={{ minHeight: "100vh", paddingTop: "2rem", paddingBottom: "2rem" }}>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          {/* Thank You Message */}
          <div className="animate-fadeIn">
            <div className="mb-4">
              <svg
                className="mx-auto w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#123375"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1
              className="text-3xl md:text-4xl mb-2"
              style={{ color: "#123375" }}
            >
              Thank You!
            </h1>

            <p
              className="subhead text-lg md:text-xl mb-6"
              style={{ color: "#333" }}
            >
              Your information has been received. Please schedule your call below.
            </p>
          </div>

          {/* Calendly Inline Widget */}
          <div
            className="bg-white rounded-xl shadow-lg animate-fadeIn animate-delay-1 overflow-hidden"
            style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}
          >
            <div
              id="calendly-inline-widget"
              style={{ minWidth: "320px", height: "700px" }}
            >
              {/* Calendly widget loads here */}
              <iframe
                src="https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=73c789&embed_domain=localhost&embed_type=Inline"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a call"
                style={{ border: "none", minHeight: "700px" }}
              />
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-6 animate-fadeIn animate-delay-2">
            <p className="text-sm" style={{ color: "#666" }}>
              Questions? Contact us at{" "}
              <a
                href="mailto:support@emeraldtidefinancial.com"
                className="underline"
                style={{ color: "#123375" }}
              >
                support@emeraldtidefinancial.com
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer" style={{ backgroundColor: "#CBE4F6" }}>
        <p>&copy;2026 US Tax-Free Retirement Center</p>
      </footer>
    </div>
  );
}
