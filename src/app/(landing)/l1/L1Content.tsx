"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function L1Content() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(540);

  useEffect(() => {
    // Handle JotForm iframe height messages
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://form.jotform.com") return;

      if (typeof event.data === "object" && event.data.frameHeight) {
        setIframeHeight(Math.max(event.data.frameHeight, 540));
      }

      // Also handle string messages from JotForm
      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data.frameHeight) {
            setIframeHeight(Math.max(data.frameHeight, 540));
          }
        } catch {
          // Handle setHeight:XXX format
          if (event.data.startsWith("setHeight:")) {
            const height = parseInt(event.data.split(":")[1], 10);
            if (!isNaN(height)) {
              setIframeHeight(Math.max(height, 540));
            }
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="landing-page">
      {/* JotForm Handler Script */}
      <Script
        id="jotform-handler"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var defined_ifr = null;
            function handleIFrameMessage(e) {
              if (typeof e.data === 'object') return;
              var args = e.data.split(":");
              if (args.length > 2) { var iframe = document.getElementById("JotFormIFrame-" + args[(args.length - 1)]); } else { var iframe = document.getElementById("JotFormIFrame"); }
              if (!iframe) return;
              switch (args[0]) {
                case "scrollIntoView":
                  iframe.scrollIntoView();
                  break;
                case "setHeight":
                  iframe.style.height = args[1] + "px";
                  break;
                case "col498":
                  break;
                case "reloadPage":
                  location.reload();
                  break;
              }
            }
            if (window.addEventListener) {
              window.addEventListener("message", handleIFrameMessage, false);
            } else if (window.attachEvent) {
              window.attachEvent("onmessage", handleIFrameMessage);
            }
          `,
        }}
      />

      <main className="landing-hero">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          {/* Main Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-4 animate-fadeIn"
            style={{ color: "#123375" }}
          >
            UNLIMITED TAX-FREE WEALTH STRATEGY
          </h1>

          {/* Subheadline */}
          <p
            className="subhead text-xl md:text-2xl lg:text-3xl mb-8 animate-fadeIn animate-delay-1"
            style={{ color: "#123375" }}
          >
            Create Up to a 6- or 7-Figure Annual Tax-Free Pension For Life!
          </p>

          {/* CTA Text */}
          <p
            className="text-lg md:text-xl mb-6 font-medium animate-fadeIn animate-delay-2"
            style={{ color: "#123375" }}
          >
            Where should we send the video?
          </p>

          {/* JotForm Embed */}
          <div className="jotform-container animate-fadeIn animate-delay-3">
            <iframe
              ref={iframeRef}
              id="JotFormIFrame-252997331553162"
              title="Tax-Free Wealth Strategy Form"
              src="https://form.jotform.com/252997331553162"
              style={{
                height: `${iframeHeight}px`,
                width: "100%",
                transition: "none"
              }}
              scrolling="no"
              allow="geolocation; microphone; camera; fullscreen"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer" style={{ backgroundColor: "#CBE4F6" }}>
        <p>&copy; 2026 Tax Free Pensions. All rights reserved.</p>
      </footer>
    </div>
  );
}
