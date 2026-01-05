import type { Metadata } from "next";
import L4Content from "./L4Content";

export const metadata: Metadata = {
  title: "Call Booked! | Emerald Tide Financial",
  description:
    "Thank you for booking your consultation call. Check your inbox for the calendar invite.",
  openGraph: {
    title: "Call Booked! | Emerald Tide Financial",
    description:
      "Your consultation call has been scheduled. We look forward to speaking with you!",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function L4Page() {
  return <L4Content />;
}
