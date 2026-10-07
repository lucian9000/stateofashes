"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Check, ChevronDown, Code2, Compass, Globe2, Network, ShieldCheck, Workflow } from "lucide-react";
import { ActionLink, useExperience } from "./experience";
import { CapabilityVisual, visualNames } from "./capability-visuals";
import "./capability-visuals.css";
import Link from "next/link";
import { services } from "../content/services";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const icons = [Globe2, Network, ShieldCheck, Code2, Workflow, Compass];
const capabilities = services;

export function Architecture() {
  const { enabled, setFocus } = useExperience();
  const [selected, setSelected] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!enabled) return;
    gsap.from(".architecture-card", { y: 35, opacity: .25, stagger: .06, duration: .65, ease: "power3.out", scrollTrigger: { trigger: ".capabilities", start: "top 90%", once: true } });
    const match = gsap.matchMedia();
    match.add("(hover: hover)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".architecture-card");
      const cleanup: (() => void)[] = [];
      cards.forEach(card => {
        const visual = card.querySelector(".capability-visual");
        const tx = gsap.quickTo(visual, "rotationY", { duration: .5, ease: "power3.out" });
        const ty = gsap.quickTo(visual, "rotationX", { duration: .5, ease: "power3.out" });
        const move = (event: MouseEvent) => { const rect = card.getBoundingClientRect(); tx((event.clientX - rect.left - rect.width / 2) * .035); ty(-(event.clientY - rect.top - rect.height / 2) * .025); };
        const reset = () => { tx(0); ty(0); };
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", reset);
        cleanup.push(() => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", reset); });
      });
      return () => cleanup.forEach(fn => fn());
    });
    return () => match.revert();
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });

  return <section id="architecture" className="architecture-section" ref={root} aria-labelledby="architecture-title"><div className="shell section">
    <div className="section-eyebrow mono"><span className="tiny-cross">+</span> WHERE WE CAN HELP<span className="eyebrow-line"/><span className="section-index">02 / CAPABILITIES</span></div>
    <div className="section-heading"><h2 id="architecture-title">Technology shaped around<br/><span className="muted-heading">your business.</span></h2><p className="body-copy">From Microsoft 365 administration to custom software, we recommend an approach that fits your systems and resources.</p></div>
    <div className="capabilities grid md:grid-cols-2 xl:grid-cols-3 gap-4">{capabilities.map((service, i) => {
      const Icon = icons[i];
      const expanded = selected === i;
      const panelId = `capability-detail-${service.slug}`;
      return <article key={service.slug} data-art={visualNames[i]} className={`architecture-card ${expanded ? "selected" : ""}`}>
        <div className="card-icon"><Icon size={24} strokeWidth={1.3}/><span className="mono">CAPABILITY / 0{i + 1}</span></div>
        <CapabilityVisual index={i}/><h3>{service.title}<br/><span>{service.subtitle}</span></h3><p>{service.text}</p>
        <div className="tags mono">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <button type="button" className="capability-toggle" aria-label={`${expanded ? "Close" : "Explore"} ${service.title}`} aria-expanded={expanded} aria-controls={panelId} onClick={() => setSelected(expanded ? null : i)}>{expanded ? "Close capability" : "Explore capability"}<ChevronDown size={17}/></button>
        <motion.div id={panelId} className="capability-inline-detail" aria-hidden={!expanded} inert={!expanded} initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: enabled ? .28 : 0 }}>
          <div className="capability-inline-inner"><p>{service.detail}</p><ul>{service.examples.map(item => <li key={item}><Check size={14}/>{item}</li>)}</ul><Link className="text-link" href={`/services/${service.slug}`}>Read about this service <ArrowDown size={14}/></Link><ActionLink onClick={() => setFocus(service.focus)}>Discuss this service</ActionLink></div>
        </motion.div>
      </article>;
    })}</div>
    <div className="service-index-link"><Link href="/services" className="text-link">Explore all services <ArrowDown size={14}/></Link></div>
    <div className="architecture-footnote mono"><span>ONE PRACTICE. MULTIPLE WAYS FORWARD.</span><span>DOESN&apos;T FIT A LABEL? TELL US ABOUT IT <ArrowDown size={12}/></span></div>
  </div></section>;
}
