import type { Metadata } from "next";
import G3Content from "./G3Content";

export const metadata: Metadata = {
  title: "Schedule Your Call | Emerald Tide Financial",
  description:
    "You're one step away from creating 6- to 7-figure, tax-free, annual income for life. Schedule your 9-minute call now.",
  openGraph: {
    title: "Schedule Your Call | Emerald Tide Financial",
    description:
      "You're one step away from tax-free income for life. Schedule your call now.",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function G3Page() {
  return <G3Content />;
}
