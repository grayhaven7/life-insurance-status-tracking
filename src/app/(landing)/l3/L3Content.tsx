"use client";

import Link from "next/link";

export default function L3Content() {
  return (
    <div className="landing-page">
      <main className="landing-hero" style={{ minHeight: "100vh" }}>
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-center">
          {/* Thank You Message */}
          <div className="animate-fadeIn">
            <div className="mb-8">
              <svg
                className="mx-auto w-24 h-24"
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
              className="text-4xl md:text-5xl mb-4"
              style={{ color: "#123375" }}
            >
              Thank You!
            </h1>

            <p
              className="subhead text-xl md:text-2xl mb-8"
              style={{ color: "#333" }}
            >
              Your information has been received.
            </p>
          </div>

          {/* Next Step */}
          <div
            className="bg-white rounded-xl p-8 shadow-lg animate-fadeIn animate-delay-1"
            style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)" }}
          >
            <h2
              className="text-2xl md:text-3xl mb-4"
              style={{ color: "#123375" }}
            >
              One More Step!
            </h2>

            <p className="text-lg mb-6" style={{ color: "#333" }}>
              Please schedule a time for us to call you. Click the button below
              to choose a convenient day and time.
            </p>

            {/* Calendly Link */}
            <div className="mb-8">
              <Link
                href="https://calendly.com/emeraldtidefinancial"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-btn inline-block"
              >
                📅 Schedule Your Call Now
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              After scheduling, you&apos;ll receive a calendar invite via email.
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-8 animate-fadeIn animate-delay-2">
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
        <p>&copy;2025 US Tax-Free Retirement Center</p>
      </footer>
    </div>
  );
}
