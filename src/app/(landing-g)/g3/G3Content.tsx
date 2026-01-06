"use client";

import Script from "next/script";
import Image from "next/image";

export default function G3Content() {
  return (
    <div className="landing-page g3-page">
      {/* GTM for G3 - Different ID */}
      <Script
        id="gtm-g3"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K6ZBBRP');
          `,
        }}
      />

      {/* ClickMagick for G3 */}
      <Script
        id="clickmagick-g3"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.clickmagick_cmc = {
              uid: '208939',
              hid: '599516250',
              cmc_project: 'TFP',
              cmc_goal: 'e',
              cmc_ref: 'calendly',
              vid_info: 'on',
            }
          `,
        }}
      />
      <Script src="//cdn.clkmc.com/cmc.js" strategy="afterInteractive" />

      {/* Calendly Widget Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      {/* GTM noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K6ZBBRP"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <main className="min-h-screen py-8 px-4">
        <div className="max-w-[960px] mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="https://lh3.googleusercontent.com/TwRGUpv2__PXQHd6g-WaI2yyBnNpn4VEdloOvzwcXUhIMdng8-flLA6IBzU9VRPt9-opHcQo_CYcuRK6OVP1OBGAZ0Y9agD6VTg"
              alt="Emerald Tide Financial"
              width={400}
              height={100}
              className="g3-logo mx-auto"
              unoptimized
            />
          </div>

          {/* Headline */}
          <h1
            className="text-2xl md:text-3xl lg:text-4xl mb-4"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
              fontWeight: 700,
              color: "#000000",
              lineHeight: 1.3,
            }}
          >
            You&apos;re One Step Away From Creating 6- to 7-Figure, Tax-Free, Annual Income For Life!
          </h1>

          {/* Subhead */}
          <p
            className="text-lg md:text-xl mb-6"
            style={{
              fontFamily: "var(--font-poppins), Poppins, sans-serif",
              color: "#000000",
            }}
          >
            👇 Please choose a time below for a 9-minute call: 👇
          </p>

          {/* Calendly Widget */}
          <div
            className="calendly-inline-widget calendly-container mx-auto"
            data-url="https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=73bf44"
          >
            <iframe
              src="https://calendly.com/d/cmd8-9f4-5jf/tax-free-pension-tfp?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=73bf44&embed_domain=localhost&embed_type=Inline"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a call"
              style={{ border: "none", minHeight: "700px" }}
            />
          </div>

          {/* Disclaimer */}
          <div className="mt-8 px-4">
            <p className="g3-disclaimer">
              Emerald Tide Financial does not offer securities or advice about securities. All investing involves risk including the possible loss of principal. Any reference(s) to guarantees refers to an insurance product and never securities or investments. All contract guarantees and payout rates are subject to the claims-paying ability and financial strength of the issuing insurance company.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
