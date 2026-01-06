import type { Metadata } from "next";
import G1Content from "./G1Content";

export const metadata: Metadata = {
  title: "Tax-Free Wealth Strategy for Business Owners | Emerald Tide Financial",
  description:
    "Create up to a 6- or 7-figure annual tax-free pension for life. Exclusive strategy for successful business owners making $25k+/year.",
  openGraph: {
    title: "Unlimited Tax-Free Wealth Strategy for Business Owners",
    description:
      "Create up to a 6- or 7-figure annual tax-free pension for life!",
    type: "website",
  },
};

export default function G1Page() {
  return <G1Content />;
}
