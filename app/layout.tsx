import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "State of Ashes — Systems Architecture Studio",
  description: "Institutional Reconstruction & Custom Solutions Architecture. Autonomous workflows, bespoke software, and structural systems modernization.",
  icons: { icon: "/logo.png" },
  openGraph: { title: "State of Ashes", description: "Dismantle what holds you back. Build what moves you forward.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
