"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Box, Check, ChevronDown, Code2, Compass, Fingerprint, Globe2, Network, ShieldCheck, Workflow } from "lucide-react";
import { ActionLink, useExperience } from "./experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  { icon: Globe2, title: "Workplace & tenants", subtitle: "Keep the essentials dependable.", text: "Microsoft 365 and Google Workspace setup, administration, and ongoing management.", tags: ["MICROSOFT 365", "GOOGLE WORKSPACE"], detail: "From a clean tenant setup to the day-to-day administration that keeps people productive, we work around your team's actual ways of working.", examples: ["Tenant setup and configuration", "Ongoing administration", "Workplace improvements"], focus: "Workplace and tenant operations" },
  { icon: Network, title: "Domains & networks", subtitle: "The systems beneath the work.", text: "Domain management, network management, and practical infrastructure improvements.", tags: ["DOMAINS", "NETWORKS"], detail: "Understand what is connected, where it is fragile, and what needs attention first. The right answer may be a small fix or a staged change.", examples: ["Domain management", "Network assessment and management", "Infrastructure improvements"], focus: "Domains, networks, and infrastructure" },
  { icon: ShieldCheck, title: "Security foundations", subtitle: "Protect what the business relies on.", text: "Workspace hardening, identity and access, backups, and endpoint protection.", tags: ["IDENTITY", "BACKUPS"], detail: "Start with the controls that matter to your environment. Additional security needs are discussed and scoped against the tools and support they require.", examples: ["Microsoft 365 and Google Workspace hardening", "Identity and access", "Backup and endpoint protection"], focus: "Security foundations" },
  { icon: Code2, title: "Web & software", subtitle: "Built for the way you operate.", text: "Websites, bespoke software, internal tools, and the connections between them.", tags: ["WEBSITES", "CUSTOM TOOLS"], detail: "Where existing products fit, use them. Where they do not, design and build something that supports the workflow instead of fighting it.", examples: ["Website development", "Custom applications and internal tools", "Software integrations"], focus: "Websites and custom software" },
  { icon: Workflow, title: "Automation & AI", subtitle: "Useful intelligence, carefully applied.", text: "Automation and AI architecture grounded in a real operational need.", tags: ["WORKFLOWS", "AI ARCHITECTURE"], detail: "Find repetitive friction, connect the right systems, and keep people in control of decisions that need judgment.", examples: ["Workflow mapping", "Practical automation", "AI integration with human oversight"], focus: "Automation and AI architecture" },
  { icon: Compass, title: "Technology direction", subtitle: "Make the next move deliberate.", text: "vCIO guidance, technology roadmaps, and solutions architecture.", tags: ["VCIO", "ROADMAPS"], detail: "Turn scattered technology decisions into a clear direction that fits the business, its resources, and its priorities.", examples: ["Technology roadmaps", "Solutions architecture", "vCIO guidance"], focus: "Technology direction" },
];

function CircuitDiagram({ index }: { index: number }) {
  return <div className={`circuit-diagram diagram-${index % 3}`} aria-hidden="true"><div className="diagram-grid"/>
    {index % 3 === 0 ? <><span className="diagram-node node-a"><Box size={17}/></span><span className="diagram-node node-b"><Network size={27}/></span><span className="diagram-node node-c"><Check size={17}/></span><i className="wire wire-a"/><i className="wire wire-b"/><i className="signal signal-a"/><i className="signal signal-b"/></>
      : index % 3 === 1 ? <div className="mini-code"><span><b>const</b> direction = assess(&#123;</span><span>&nbsp; context: <em>"your business"</em>,</span><span>&nbsp; next: <em>"fit for purpose"</em></span><span>&#125;);<i className="cursor"/></span></div>
        : <div className="stack-graphic"><i/><i/><i/><span>FOUNDATION / EVOLVING</span></div>}
  </div>;
}

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
        const visual = card.querySelector(".circuit-diagram");
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
    <div className="section-heading"><h2 id="architecture-title">Built around the problem.<br/><span className="muted-heading">Never the category.</span></h2><p className="body-copy">One business can need reliable email today, a safer network tomorrow, and a custom workflow next quarter. We work from the problem outward.</p></div>
    <div className="capabilities grid md:grid-cols-2 xl:grid-cols-3 gap-4">{capabilities.map(({ icon: Icon, title, subtitle, text, tags }, i) => <article key={title} className={`architecture-card ${selected === i ? "selected" : ""}`}><div className="card-icon"><Icon size={24} strokeWidth={1.3}/><span className="mono">CAPABILITY / 0{i + 1}</span></div><CircuitDiagram index={i}/><h3>{title}<br/><span>{subtitle}</span></h3><p>{text}</p><div className="tags mono">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="capability-toggle" aria-expanded={selected === i} aria-controls={selected === i ? "capability-detail" : undefined} onClick={() => setSelected(selected === i ? null : i)}>{selected === i ? "Close capability" : "Explore capability"}<ChevronDown size={17}/></button></article>)}</div>
    <AnimatePresence initial={false}>{selected !== null && <motion.div id="capability-detail" className="capability-detail" onAnimationComplete={() => { if (selected !== null && window.matchMedia("(max-width: 767px)").matches) document.getElementById("capability-detail")?.scrollIntoView({ behavior: enabled ? "smooth" : "instant", block: "center" }); }} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: enabled ? .3 : 0 }}><div className="capability-detail-inner"><div><span className="mono">WHERE WE CAN START</span><h3>{capabilities[selected].title}</h3><p>{capabilities[selected].detail}</p></div><ul>{capabilities[selected].examples.map(item => <li key={item}><Check size={14}/>{item}</li>)}</ul><ActionLink onClick={() => setFocus(capabilities[selected].focus)}>Discuss this capability</ActionLink></div></motion.div>}</AnimatePresence>
    <div className="architecture-footnote mono"><span>ONE PRACTICE. MULTIPLE WAYS FORWARD.</span><span>DOESN&apos;T FIT A LABEL? TELL US ABOUT IT <ArrowDown size={12}/></span></div>
  </div></section>;
}
