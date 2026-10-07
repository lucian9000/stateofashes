import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "../../components/page-shell";
import { services, findService } from "../../content/services";

export const dynamicParams = false;
export const generateStaticParams = () => services.map(({ slug }) => ({ slug }));
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return { title: `${service.title} | State of Ashes`, description: service.text, alternates: { canonical: `/services/${service.slug}` }, openGraph: { title: `${service.title} | State of Ashes`, description: service.text, url: `/services/${service.slug}` } };
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug);
  if (!service) notFound();
  return <PageShell><section className="shell information-hero"><Link href="/services" className="text-link">← All services</Link><p className="section-eyebrow mono">BUSINESS TECHNOLOGY / WESTERN CAPE & SOUTH AFRICA</p><h1>{service.title}</h1><p className="information-lead">{service.subtitle}</p><p>{service.detail}</p></section><div className="shell service-content"><section><h2>When this can help</h2><ul className="service-situations">{service.situations.map(situation => <li key={situation}>{situation}</li>)}</ul></section><section><h2>What we can work on</h2><ul className="service-inclusions">{service.examples.map(example => <li key={example}><Check size={17}/>{example}</li>)}</ul><p>{service.scope}</p></section><section className="service-start"><p className="section-eyebrow mono">YOUR STARTING POINT</p><h2>Tell us about your situation.</h2><p>{service.startingPoint}</p><Link href="/#intake" className="action-link"><span className="action-content">Discuss this service <ArrowUpRight size={18}/></span></Link><p className="service-contact">Prefer email? <a href="mailto:info@stateofashes.com">info@stateofashes.com</a></p></section></div><nav className="shell related-services" aria-label="Other services"><h2>Other ways we can help</h2>{services.filter(item => item.slug !== service.slug).map(item => <Link key={item.slug} href={`/services/${item.slug}`}>{item.title}<ArrowUpRight size={16}/></Link>)}</nav></PageShell>;
}
