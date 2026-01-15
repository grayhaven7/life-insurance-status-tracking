import { Metadata } from "next";
import EmeraldHome from "./EmeraldHome";

export const metadata: Metadata = {
  title: "Emerald Tide Financial | Home of the Tax-Free Pension",
  description:
    "Create a robust, 6- or 7-figure, tax-free pension for life. Emerald Tide Financial helps you build lasting wealth with tax-free growth and income.",
};

export default function HomePage() {
  return <EmeraldHome />;
}
