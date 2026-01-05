import type { Metadata } from "next";
import L1Content from "./L1Content";

export const metadata: Metadata = {
  title: "Unlimited Tax-Free Wealth Strategy | Emerald Tide Financial",
  description:
    "Create up to a 6- or 7-figure annual tax-free pension for life. Learn the unlimited tax-free wealth strategy from Emerald Tide Financial.",
  openGraph: {
    title: "Unlimited Tax-Free Wealth Strategy",
    description:
      "Create up to a 6- or 7-figure annual tax-free pension for life!",
    type: "website",
  },
};

export default function L1Page() {
  return <L1Content />;
}
