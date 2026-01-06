"use client";

import { useEffect, useLayoutEffect } from "react";
import {
  Fjalla_One,
  Source_Sans_3,
  Alegreya_Sans,
  Poppins,
  Lato,
} from "next/font/google";
import Script from "next/script";
import "../(landing)/landing.css";
import "./g-landing.css";

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
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export default function GLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.remove("dark");
    document.body.classList.add("landing-page-active");

    const footer = document.querySelector("footer.border-t");
    if (footer) {
      (footer as HTMLElement).style.display = "none";
    }

    const rootWrapper = document.querySelector(".min-h-screen.bg-bg-primary");
    if (rootWrapper) {
      (rootWrapper as HTMLElement).style.background = "transparent";
    }

    return () => {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      }
      document.body.classList.remove("landing-page-active");
      if (footer) {
        (footer as HTMLElement).style.display = "";
      }
      if (rootWrapper) {
        (rootWrapper as HTMLElement).style.background = "";
      }
    };
  }, []);

  return (
    <div
      className={`${fjallaOne.variable} ${sourceSans.variable} ${alegreyaSans.variable} ${poppins.variable} ${lato.variable}`}
    >
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
