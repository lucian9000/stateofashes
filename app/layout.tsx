import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "State of Ashes — Technology That Works for Your Business",
  description: "Technology management, problem solving, and what comes next. Microsoft 365, Google Workspace, networks, security foundations, websites, software, AI architecture, and vCIO guidance in the Western Cape and across South Africa.",
  icons: { icon: "/logo.png" },
  openGraph: { title: "State of Ashes — Technology That Works for Your Business", description: "Day-to-day technology care, focused problem solving, and forward-looking architecture for South African businesses.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
