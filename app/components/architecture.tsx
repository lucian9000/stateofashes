"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Box, Check, ChevronDown, Code2, Layers3, Network } from "lucide-react";
import { ActionLink, useExperience } from "./experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const capabilities = [
 { icon: Network, title: "Autonomous Workflows", subtitle: "& AI Integration", text: "Intelligence where it matters. Connected workflows that remove friction and give your people room to think.", tags: ["AGENTIC SYSTEMS", "ORCHESTRATION"], focus: "Autonomous workflows & AI", detail: "Connect the tools you already rely on. Route routine work automatically, keep exceptions visible, and reserve human judgment for the decisions that deserve it.", deliverables: ["Workflow and dependency mapping", "AI-assisted routing and automation", "Human review and exception handling"] },
 { icon: Code2, title: "Bespoke Software", subtitle: "& Internal Tooling", text: "Your operation is unique. Your tools should be too. Purpose-built software around the way you actually work.", tags: ["CUSTOM PLATFORMS", "INTERNAL TOOLS"], focus: "Bespoke software & tooling", detail: "Turn the workaround everyone depends on into a dependable product. Define the essential workflow, test it with the people doing the work, and build a tool they can own.", deliverables: ["Product discovery and prototyping", "Custom applications and integrations", "Operational handover and documentation"] },
 { icon: Layers3, title: "Structural Systems", subtitle: "Modernization", text: "Replace the constraints, preserve the knowledge. Rebuild aging infrastructure for what comes next.", tags: ["SYSTEMS AUDIT", "ARCHITECTURE"], focus: "Structural modernization", detail: "Find a path out of brittle systems without losing the knowledge inside them. Make dependencies explicit and replace the highest-friction pieces in deliberate stages.", deliverables: ["Architecture and dependency assessment", "Phased modernization strategy", "Migration planning and validation"] },
];
function CircuitDiagram({ index }: { index: number }) {
 return <div className={`circuit-diagram diagram-${index}`} aria-hidden="true"><div className="diagram-grid"/>{index===0?<><span className="diagram-node node-a"><Box size={17}/></span><span className="diagram-node node-b"><Network size={27}/></span><span className="diagram-node node-c"><Check size={17}/></span><i className="wire wire-a"/><i className="wire wire-b"/><i className="signal signal-a"/><i className="signal signal-b"/></>:index===1?<div className="mini-code"><span><b>const</b> system = architect(&#123;</span><span>&nbsp; purpose: <em>"your operation"</em>,</span><span>&nbsp; constraints: <em>[]</em></span><span>&#125;);<i className="cursor"/></span></div>:<div className="stack-graphic"><i/><i/><i/><span>FOUNDATION.REBUILT</span></div>}</div>;
}
export function Architecture() {
 const { enabled, setFocus } = useExperience();
 const [selected, setSelected] = useState<number|null>(null);
 const root = useRef<HTMLElement>(null);
 useGSAP(() => {
  if (!enabled) return;
  gsap.from(".architecture-card", { y: 35, opacity: .25, stagger: .09, duration: .65, ease: "power3.out", scrollTrigger: { trigger: ".capabilities", start: "top 90%", once: true } });
  const match = gsap.matchMedia();
  match.add("(hover: hover)", () => {
    const cards = gsap.utils.toArray<HTMLElement>(".architecture-card");
    const cleanup: (()=>void)[]=[];
    cards.forEach(card=>{ const visual=card.querySelector(".circuit-diagram"); const tx=gsap.quickTo(visual,"rotationY",{duration:.5,ease:"power3.out"}); const ty=gsap.quickTo(visual,"rotationX",{duration:.5,ease:"power3.out"}); const move=(event:MouseEvent)=>{const rect=card.getBoundingClientRect();tx((event.clientX-rect.left-rect.width/2)*.035);ty(-(event.clientY-rect.top-rect.height/2)*.025);};const reset=()=>{tx(0);ty(0);};card.addEventListener("mousemove",move);card.addEventListener("mouseleave",reset);cleanup.push(()=>{card.removeEventListener("mousemove",move);card.removeEventListener("mouseleave",reset);});});
    return ()=>cleanup.forEach(fn=>fn());
  });return ()=>match.revert();
 }, { scope: root, dependencies:[enabled],revertOnUpdate:true });
 return <section id="architecture" className="architecture-section" ref={root} aria-labelledby="architecture-title"><div className="shell section"><div className="section-eyebrow mono"><span className="tiny-cross">+</span> CORE ARCHITECTURE<span className="eyebrow-line"/><span className="section-index">02 / CAPABILITIES</span></div><div className="section-heading"><h2 id="architecture-title">Built around the problem.<br/><span className="muted-heading">Never the category.</span></h2><p className="body-copy">Technology is the instrument.<br/>A better operation is the outcome.</p></div><div className="capabilities grid md:grid-cols-3 gap-4">{capabilities.map(({icon:Icon,title,subtitle,text,tags},i)=><article key={title} className={`architecture-card ${selected===i?'selected':''}`}><div className="card-icon"><Icon size={24} strokeWidth={1.3}/><span className="mono">CAPABILITY / 0{i+1}</span></div><CircuitDiagram index={i}/><h3>{title}<br/><span>{subtitle}</span></h3><p>{text}</p><div className="tags mono">{tags.map(tag=><span key={tag}>{tag}</span>)}</div><button className="capability-toggle" aria-expanded={selected===i} aria-controls="capability-detail" onClick={()=>setSelected(selected===i?null:i)}>{selected===i?'Close capability':'Explore capability'}<ChevronDown size={17}/></button></article>)}</div><AnimatePresence initial={false}>{selected!==null && <motion.div id="capability-detail" className="capability-detail" onAnimationComplete={() => { if (selected !== null && window.matchMedia("(max-width: 767px)").matches) document.getElementById("capability-detail")?.scrollIntoView({ behavior: enabled ? "smooth" : "instant", block: "center" }); }} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}}><div className="capability-detail-inner"><div><span className="mono">WHERE WE CAN START</span><h3>{capabilities[selected].title}</h3><p>{capabilities[selected].detail}</p></div><ul>{capabilities[selected].deliverables.map(item=><li key={item}><Check size={14}/>{item}</li>)}</ul><ActionLink onClick={()=>setFocus(capabilities[selected].focus)}>Discuss this capability</ActionLink></div></motion.div>}</AnimatePresence><div className="architecture-footnote mono"><span>ONE PRACTICE. MULTIPLE WAYS FORWARD.</span><span>SELECT A CAPABILITY TO LOOK DEEPER <ArrowDown size={12}/></span></div></div></section>;
}
