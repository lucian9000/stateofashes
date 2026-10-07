import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/page-shell";
import { services } from "../content/services";

export const metadata: Metadata = {
  title: "Business IT services | State of Ashes",
  description: "Explore Microsoft 365, Google Workspace, networks, security, custom software, automation, AI and vCIO services for businesses in the Western Cape and South Africa.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Business IT services | State of Ashes", url: "/services", description: "Day-to-day IT management, technical problem solving and technology planning for your business." },
};

export default function ServicesPage() {
  return <PageShell><section className="shell information-hero"><Link className="text-link" href="/">← Home</Link><p className="section-eyebrow mono">SERVICES / STATE OF ASHES</p><h1>Technology shaped<br/><span className="text-ember">around your business.</span></h1><p className="information-lead">Day-to-day support, a problem to resolve or a project to build. Explore where we can help, then tell us about your situation.</p><p>Based in the Western Cape. Enquiries welcome from across South Africa; remote and on-site requirements are discussed for each job.</p></section><section className="shell service-directory" aria-label="Service directory">{services.map((service, index) => <Link className="service-directory-row" href={`/services/${service.slug}`} key={service.slug}><span className="mono directory-number">0{index + 1}</span><div><h2>{service.title}</h2><p>{service.text}</p></div><ArrowUpRight size={24}/></Link>)}</section><section className="shell information-cta"><h2>Does your need span more than one service?</h2><p>Start with the problem or goal. We can work through the scope together.</p><Link className="action-link" href="/#intake"><span className="action-content">Tell us what you need <ArrowUpRight size={18}/></span></Link></section></PageShell>;
}
