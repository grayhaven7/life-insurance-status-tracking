"use client";

import { useEffect, useRef } from "react";

export default function L2Content() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Handle JotForm iframe height
    const handleMessage = (event: MessageEvent) => {
      if (
        typeof event.data === "object" &&
        event.data.frameHeight &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = event.data.frameHeight + "px";
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("application-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      {/* Video Section */}
      <section className="landing-hero" style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          {/* Step 1 Badge */}
          <div className="mb-6 animate-fadeIn">
            <span className="step-badge">
              Step 1: Watch This Video First 🍿
            </span>
          </div>

          {/* Video Container */}
          <div className="video-container animate-fadeIn animate-delay-1">
            <iframe
              src="https://videos.sproutvideo.com/embed/5a9bdeb31017e1ccd0/b692264ebdde77ac?autoPlay=true&loop=true&bigPlayButton=false&showControls=true&nofs=true"
              title="Tax-Free Pension Strategy Video"
              allow="autoplay; fullscreen"
              allowFullScreen={false}
            />
          </div>

          {/* CTA Button after video */}
          <div className="mt-8 animate-fadeIn animate-delay-2">
            <button onClick={scrollToForm} className="landing-btn">
              ⬇️ SUBMIT &amp; SCHEDULE A CALL ⬇️
            </button>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section
        id="application-form"
        className="landing-hero"
        style={{ minHeight: "auto", paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          {/* Step 2 Badge */}
          <div className="mb-6 animate-fadeIn">
            <span className="step-badge">
              Step 2: Sound Interesting? Let&apos;s Talk 🗣️
            </span>
          </div>

          {/* JotForm Embed */}
          <div className="jotform-container animate-fadeIn animate-delay-1">
            <iframe
              ref={iframeRef}
              id="JotFormIFrame-252997935833173"
              title="Application Form"
              src="https://form.jotform.com/252997935833173"
              style={{ minHeight: "600px", width: "100%" }}
              scrolling="no"
              allow="geolocation; microphone; camera; fullscreen"
            />
          </div>

          {/* Bottom CTA Button */}
          <div className="mt-8 animate-fadeIn animate-delay-2">
            <button
              onClick={() => {
                // Scroll to top of form
                const form = document.getElementById("application-form");
                if (form) form.scrollIntoView({ behavior: "smooth" });
              }}
              className="landing-btn"
            >
              ⬇️ SUBMIT &amp; SCHEDULE A CALL ⬇️
            </button>
          </div>

          {/* Bottom Text */}
          <p
            className="mt-6 text-lg animate-fadeIn animate-delay-3"
            style={{ color: "#123375" }}
          >
            On the next page, please choose a day and time you&apos;d like us to call you.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer" style={{ backgroundColor: "#CBE4F6" }}>
        <p>&copy;2026 US Tax-Free Retirement Center</p>
      </footer>
    </div>
  );
}
