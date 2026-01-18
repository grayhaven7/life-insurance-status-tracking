import type { Metadata } from "next";
import "./emerald.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Emerald Tide Financial",
  description:
    "Emerald Tide Financial privacy policy and data protection practices.",
};

export default function EmeraldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="emerald-page">
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
