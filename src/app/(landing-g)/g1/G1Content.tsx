"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function G1Content() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(539);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://form.jotform.com") return;

      if (typeof event.data === "object" && event.data.frameHeight) {
        setIframeHeight(Math.max(event.data.frameHeight, 539));
      }

      if (typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (data.frameHeight) {
            setIframeHeight(Math.max(data.frameHeight, 539));
          }
        } catch {
          if (event.data.startsWith("setHeight:")) {
            const height = parseInt(event.data.split(":")[1], 10);
            if (!isNaN(height)) {
              setIframeHeight(Math.max(height, 539));
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
      {/* GTM for G1 */}
      <Script
        id="gtm-g1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K99LFD3H');
          `,
        }}
      />

      {/* ClickMagick for G1 */}
      <Script
        id="clickmagick-g1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.clickmagick_cmc = {
              uid: '208939',
              hid: '599516250',
              cmc_project: 'TFP',
              cmc_goal: 'a',
              cmc_ref: 'optin',
              vid_info: 'on',
            }
          `,
        }}
      />
      <Script src="//cdn.clkmc.com/cmc.js" strategy="afterInteractive" />

      {/* NiceJob Widget */}
      <Script
        src="https://cdn.nicejob.co/js/sdk.min.js?id=6663188064501760"
        strategy="lazyOnload"
      />

      {/* JotForm Handler */}
      <Script
        id="jotform-handler-g1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function handleIFrameMessage(e) {
              if (typeof e.data === 'object') return;
              var args = e.data.split(":");
              var iframe = document.getElementById("JotFormIFrame-253425285575161");
              if (!iframe) return;
              switch (args[0]) {
                case "scrollIntoView":
                  iframe.scrollIntoView();
                  break;
                case "setHeight":
                  iframe.style.height = args[1] + "px";
                  break;
                case "reloadPage":
                  location.reload();
                  break;
              }
            }
            if (window.addEventListener) {
              window.addEventListener("message", handleIFrameMessage, false);
            }
          `,
        }}
      />

      {/* GTM noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K99LFD3H"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <main className="g-hero-bg">
        <div className="w-full max-w-[1140px] mx-auto px-4 py-12 text-center">
          {/* Main Headline */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-fjalla), 'Fjalla One', sans-serif",
              fontWeight: 700,
              color: "#123375",
              lineHeight: 1.2,
            }}
          >
            UNLIMITED TAX-FREE WEALTH STRATEGY FOR
            <br />
            SUCCESSFUL BUSINESS OWNERS
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl md:text-2xl lg:text-3xl mb-8"
            style={{
              fontFamily: "var(--font-alegreya), 'Alegreya Sans', sans-serif",
              color: "#123375",
              lineHeight: 1.4,
            }}
          >
            Create Up to a 6- or 7-Figure
            <br />
            Annual Tax-Free Pension
            <br />
            For Life!
          </p>

          {/* Form Header */}
          <p
            className="text-lg md:text-xl mb-4"
            style={{
              fontFamily: "var(--font-fjalla), 'Fjalla One', sans-serif",
              color: "#123375",
            }}
          >
            👇 Where should we send the video? 👇
          </p>

          {/* JotForm Embed */}
          <div className="jotform-container mx-auto" style={{ maxWidth: "600px" }}>
            <iframe
              ref={iframeRef}
              id="JotFormIFrame-253425285575161"
              title="25K+ Annual - TFP - NPE1 - Biz Owner"
              src="https://form.jotform.com/253425285575161"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                height: `${iframeHeight}px`,
                border: "none",
              }}
              scrolling="no"
              allow="geolocation; microphone; camera; fullscreen"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-6"
        style={{
          backgroundColor: "#CBE4F6",
          fontFamily: "var(--font-source-sans), 'Source Sans Pro', sans-serif",
        }}
      >
        <p>&copy;2026 US Tax-Free Retirement Center</p>
      </footer>

      {/* NiceJob Widget Container */}
      <div className="nj-engage" data-position="left"></div>
    </div>
  );
}
