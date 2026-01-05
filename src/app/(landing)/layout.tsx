"use client";

import { useEffect, useLayoutEffect } from "react";
import { Fjalla_One, Source_Sans_3, Alegreya_Sans } from "next/font/google";
import Script from "next/script";
import "./landing.css";

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fjalla",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const alegreyaSans = Alegreya_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use useLayoutEffect to run synchronously before paint
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    // Force light mode for landing pages - remove dark class immediately
    document.documentElement.classList.remove("dark");

    // Add a class to body to indicate we're on a landing page
    document.body.classList.add("landing-page-active");

    // Hide the site footer from root layout (it's the footer with border-t)
    const footer = document.querySelector("footer.border-t");
    if (footer) {
      (footer as HTMLElement).style.display = "none";
    }

    // Hide the root layout wrapper's dark background
    const rootWrapper = document.querySelector(".min-h-screen.bg-bg-primary");
    if (rootWrapper) {
      (rootWrapper as HTMLElement).style.background = "transparent";
    }

    return () => {
      // Restore dark mode if it was set
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
      document.body.classList.remove("landing-page-active");
      // Restore footer
      if (footer) {
        (footer as HTMLElement).style.display = "";
      }
      // Restore wrapper
      if (rootWrapper) {
        (rootWrapper as HTMLElement).style.background = "";
      }
    };
  }, []);

  return (
    <div
      className={`${fjallaOne.variable} ${sourceSans.variable} ${alegreyaSans.variable}`}
    >
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
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

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-L5529GCZBJ"
        strategy="afterInteractive"
      />
      <Script
        id="ga-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L5529GCZBJ');
            gtag('config', 'AW-10812495902');
          `,
        }}
      />

      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2746742792237015');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* ClickMagick */}
      <Script
        id="clickmagick"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var defined_uid = 208939;
            var defined_hid = 599516250;
            var defined_project = 'TFP';
          `,
        }}
      />
      <Script
        src="//cdn.clktrb.com/cmc.js"
        strategy="afterInteractive"
      />

      {/* NiceJob Widget */}
      <Script
        src="https://cdn.nicejob.co/js/sdk.min.js?id=6663188064501760"
        strategy="lazyOnload"
      />

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K99LFD3H"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* Facebook Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2746742792237015&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>

      {children}
    </div>
  );
}
