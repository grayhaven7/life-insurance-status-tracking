import type { Metadata } from "next";
import "./emerald.css";
import EmeraldNav from "@/components/emerald/EmeraldNav";
import EmeraldFooter from "@/components/emerald/EmeraldFooter";
import ChatBot from "@/components/emerald/ChatBot";

export const metadata: Metadata = {
  title: {
    default: "Emerald Tide Financial | Home of the Tax-Free Pension",
    template: "%s | Emerald Tide Financial",
  },
  description:
    "Create a robust, 6- or 7-figure, tax-free pension for life with Emerald Tide Financial. Expert guidance on tax-free retirement strategies.",
  keywords: [
    "tax-free pension",
    "retirement planning",
    "financial services",
    "Emerald Tide Financial",
    "tax-free retirement",
  ],
  authors: [{ name: "Emerald Tide Financial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Emerald Tide Financial",
  },
};

export default function EmeraldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Frutiger Aero Fonts: General Sans (Fontshare) - Nunito loaded via CSS @import */}
      <link
        href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@400,500,700&display=swap"
        rel="stylesheet"
      />
      <div className="emerald-page">
        <EmeraldNav />
        <main className="min-h-screen">{children}</main>
        <EmeraldFooter />
        <ChatBot />
      </div>
    </>
  );
}
