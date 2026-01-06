import type { Metadata } from "next";
import G2Content from "./G2Content";

export const metadata: Metadata = {
  title: "Watch & Apply | Tax-Free Pension Strategy | Emerald Tide Financial",
  description:
    "Watch our video presentation on tax-free retirement strategies for business owners and apply for a consultation.",
  openGraph: {
    title: "Watch & Apply | Tax-Free Pension Strategy",
    description:
      "Learn how successful business owners create tax-free pensions for life.",
    type: "website",
  },
};

export default function G2Page() {
  return <G2Content />;
}
