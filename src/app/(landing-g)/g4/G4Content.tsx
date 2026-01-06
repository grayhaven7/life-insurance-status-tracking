"use client";

import { useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function G4Content() {
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
    <div className="landing-page g4-page">
      {/* GTM for G4 - Different ID */}
      <Script
        id="gtm-g4"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M3X4JMR');
          `,
        }}
      />

      {/* Google Ads for G4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-10812495902"
        strategy="afterInteractive"
      />
      <Script
        id="gads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10812495902');
          `,
        }}
      />

      {/* ClickMagick for G4 */}
      <Script
        id="clickmagick-g4"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.clickmagick_cmc = {
              uid: '208939',
              hid: '599516250',
              cmc_project: 'TFP',
              cmc_goal: 'e',
              cmc_ref: 'booked',
              vid_info: 'on',
            }
          `,
        }}
      />
      <Script src="//cdn.clkmc.com/cmc.js" strategy="afterInteractive" />

      {/* Conversion tracking script - fires on page load */}
      <Script
        id="conversion-tracking-g4"
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

      {/* GTM noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M3X4JMR"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <main className="flex items-center justify-center min-h-screen py-8 px-4">
        <div className="g4-card">
          {/* Two-column grid */}
          <div className="g4-grid">
            {/* Left Column - Thank You Message */}
            <div>
              <h1
                className="text-2xl md:text-3xl mb-4 font-codec"
                style={{
                  fontFamily: "Codec, Ubuntu, sans-serif",
                  color: "#000000",
                }}
              >
                Thanks for booking your call!
              </h1>
              <p
                className="text-base md:text-lg font-codec"
                style={{
                  fontFamily: "Codec, Ubuntu, sans-serif",
                  color: "#463F3A",
                  lineHeight: 1.6,
                }}
              >
                You should receive our calendar invite shortly.
                <br />
                Please check your inbox, junk, and spam folders!
              </p>
            </div>

            {/* Right Column - Resources */}
            <div>
              <h2
                className="text-2xl md:text-3xl mb-4 font-codec"
                style={{
                  fontFamily: "Codec, Ubuntu, sans-serif",
                  color: "#000000",
                }}
              >
                In the meantime:
              </h2>
              <ul className="g4-list">
                <li>
                  <Link
                    href="https://www.google.com/search?q=%22emerald+tide+financial%22+reviews"
                    target="_top"
                    className="g4-link"
                  >
                    Client testimonials
                  </Link>
                </li>
                <li>
                  Information about{" "}
                  <Link
                    href="https://drive.google.com/file/d/1u8seYfllZQzBfFIADCwdP7a9WsByxWX_/view"
                    target="_top"
                    className="g4-link"
                  >
                    our company
                  </Link>
                </li>
                <li>
                  Our{" "}
                  <Link
                    href="https://www.emeraldtidefinancial.com/"
                    target="_top"
                    className="g4-link"
                  >
                    website
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://drive.google.com/file/d/1dbiLzKW8h9wu90O38tilvOfGDCZ-LC0h/view"
                    target="_top"
                    className="g4-link"
                  >
                    Information about our CEO
                  </Link>
                </li>
                <li>
                  Our CEO&apos;s{" "}
                  <Link
                    href="https://www.linkedin.com/in/gronowetter/"
                    target="_top"
                    className="g4-link"
                  >
                    LinkedIn profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://brokercheck.finra.org/individual/summary/6223413"
                    target="_top"
                    className="g4-link"
                  >
                    FINRA / US Government profile
                  </Link>{" "}
                  of our CEO (note &quot;0 Disclosures&quot; in left corner = ZERO complaints from clients or employers)
                </li>
              </ul>
            </div>
          </div>

          {/* Mailman Image */}
          <Image
            src="https://lh3.googleusercontent.com/x1vboxQgb5Il4NG99GARcYAG3oiXatN130POvIoKTCzwmekAq0u4K0XOqAAjXT0zlY-zGYIO2Avzf_uv9i_HlA"
            alt="Mailman"
            width={352}
            height={352}
            className="g4-mailman"
            unoptimized
          />
        </div>
      </main>
    </div>
  );
}
