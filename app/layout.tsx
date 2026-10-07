import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { site } from "./content/services";
export const metadata: Metadata = {
  metadataBase: new URL("https://stateofashes.com"),
  title: "State of Ashes — Technology That Works for Your Business",
  description: "Technology management, problem solving, and what comes next. Microsoft 365, Google Workspace, networks, security foundations, websites, software, AI architecture, and vCIO guidance in the Western Cape and across South Africa.",
  icons: { icon: "/favicon-32.png", apple: "/apple-touch-icon.png" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "State of Ashes — Technology That Works for Your Business",
    description: "Day-to-day technology care, focused problem solving, and forward-looking architecture for South African businesses.",
    type: "website",
    url: "/",
    siteName: "State of Ashes",
    images: [{ url: "/social-preview.png", width: 696, height: 696, alt: "The State of Ashes circuit phoenix" }],
  },
  twitter: {
    card: "summary",
    images: [{ url: "/social-preview.png", alt: "The State of Ashes circuit phoenix" }],
  },
};
const organisation = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, logo: `${site.url}/logo.png`, email: site.email, areaServed: [{ "@type": "AdministrativeArea", name: "Western Cape" }, { "@type": "Country", name: "South Africa" }] };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" data-scroll-behavior="smooth"><head><link rel="preload" href="/fonts/manrope-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/barlow-condensed-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation).replace(/</g, "\\u003c") }}/>{children}</body></html>; }
