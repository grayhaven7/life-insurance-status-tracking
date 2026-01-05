import type { Metadata } from "next";
import L2Content from "./L2Content";

export const metadata: Metadata = {
  title: "Watch & Apply | Tax-Free Pension Strategy | Emerald Tide Financial",
  description:
    "Watch our video presentation on tax-free retirement strategies and apply for a consultation with our financial experts.",
  openGraph: {
    title: "Watch & Apply | Tax-Free Pension Strategy",
    description:
      "Learn how to create a tax-free pension for life. Watch the video and schedule your consultation.",
    type: "website",
  },
};

export default function L2Page() {
  return <L2Content />;
}
