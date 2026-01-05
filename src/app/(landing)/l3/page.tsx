import type { Metadata } from "next";
import L3Content from "./L3Content";

export const metadata: Metadata = {
  title: "Thank You | Schedule Your Call | Emerald Tide Financial",
  description:
    "Thank you for your interest! Please schedule a time for us to call you and discuss your tax-free retirement strategy.",
  openGraph: {
    title: "Thank You | Schedule Your Call",
    description:
      "Schedule a consultation call with Emerald Tide Financial to discuss your tax-free pension options.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function L3Page() {
  return <L3Content />;
}
