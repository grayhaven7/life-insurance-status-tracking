"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function G2Content() {
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

  const scrollToForm = () => {
    const formSection = document.getElementById("g2-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      {/* GTM for G2 */}
      <Script
        id="gtm-g2"
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

      {/* ClickMagick for G2 */}
      <Script
        id="clickmagick-g2"
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
        id="jotform-handler-g2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function handleIFrameMessage(e) {
              if (typeof e.data === 'object') return;
              var args = e.data.split(":");
              var iframe = document.getElementById("JotFormIFrame-253425285575161-g2");
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

      <main className="g-hero-bg" style={{ minHeight: "auto" }}>
        <div className="w-full max-w-[1140px] mx-auto px-4 py-12">
          {/* Step 1: Video Section */}
          <section className="text-center mb-12">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl mb-8 flex items-center justify-center gap-2"
              style={{
                fontFamily: "var(--font-fjalla), 'Fjalla One', sans-serif",
                fontWeight: 700,
                color: "#123375",
              }}
            >
              Step 1: Watch This Video First <span>🍿</span>
            </h1>

            {/* Video Container - Square */}
            <div className="g-video-wrap">
              <div className="g-video-container">
                <iframe
                  className="sproutvideo-player"
                  src="https://videos.sproutvideo.com/embed/5a9bdeb31017e1ccd0/b692264ebdde77ac?autoPlay=true&fullscreenButton=false&settingsButton=false&disablePIP=true&loop=true&playsinline=true"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  title="Tax-Free Pension Strategy Video"
                />
              </div>
            </div>
          </section>

          {/* Step 2: Form Section */}
          <section id="g2-form-section" className="text-center">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl mb-6 flex items-center justify-center gap-2"
              style={{
                fontFamily: "var(--font-fjalla), 'Fjalla One', sans-serif",
                fontWeight: 700,
                color: "#123375",
              }}
            >
              Step 2: Sound Interesting? Let&apos;s Talk. <span>🗣️</span>
            </h2>

            {/* Top CTA Button */}
            <div className="mb-6">
              <button onClick={scrollToForm} className="g-cta-button">
                ⬇️ SUBMIT &amp; SCHEDULE A CALL ⬇️
              </button>
            </div>

            {/* JotForm Embed */}
            <div className="jotform-container mx-auto" style={{ maxWidth: "600px" }}>
              <iframe
                ref={iframeRef}
                id="JotFormIFrame-253425285575161-g2"
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

            {/* Bottom CTA Button */}
            <div className="mt-6 mb-4">
              <button onClick={scrollToForm} className="g-cta-button">
                ⬆️ SUBMIT &amp; SCHEDULE A CALL ⬆️
              </button>
            </div>

            {/* Bottom Text */}
            <p
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-source-sans), 'Source Sans Pro', sans-serif",
                color: "#123375",
              }}
            >
              On the next page, please choose a day and time you&apos;d like us to call you.
            </p>
          </section>
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
