"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./experience";
import { site } from "../content/services";

export function ContactDetails() {
  return <div className="contact-details"><strong>{site.person}</strong><a href={`mailto:${site.email}`}>{site.email}</a></div>;
}

export function SiteFooter({ homePath = "" }: { homePath?: string }) {
  return <footer className="shell footer"><div className="footer-top"><Brand homeHref={`${homePath}#top`}/><ContactDetails/></div><nav className="footer-links" aria-label="Footer navigation"><Link href="/services">Explore all services <ArrowUpRight size={14}/></Link><Link href="/privacy">Enquiry privacy</Link><a href={`${homePath}#intake`}>Contact</a><a href="#top">Back to top ↑</a></nav><div className="footer-bottom mono"><span>© {new Date().getFullYear()} STATE OF ASHES</span><span>TECHNOLOGY / ON YOUR TERMS</span></div></footer>;
}
