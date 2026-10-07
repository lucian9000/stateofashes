"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Box, Fingerprint, ScanLine } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "./experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);
const stages = [
  { title: "Deconstruct", icon: ScanLine, verb: "Find the cause.", body: "Review the systems involved and find what is causing the problem.", output: "A clear map of the constraints.", graphic: "FRAGMENTED SYSTEM", center: "AUDIT", note: "Surface the hidden dependencies." },
  { title: "Distill", icon: Fingerprint, verb: "Agree on the priorities.", body: "Agree on the priorities and choose an approach that fits your business.", output: "A focused architectural direction.", graphic: "SIGNAL ISOLATED", center: "CORE", note: "Strip away the inherited noise." },
  { title: "Reconstruct", icon: Box, verb: "Implement the changes.", body: "Implement the agreed changes and confirm they work as intended.", output: "Changes checked against the agreed requirements.", graphic: "SYSTEM RECONSTRUCTED", center: "SOA", note: "Give every part a purpose." },
];
const modules = [{x:60,y:55},{x:180,y:55},{x:300,y:55},{x:60,y:175},{x:300,y:175},{x:60,y:295},{x:180,y:295},{x:300,y:295}];
const scatter = [{x:-17,y:10,r:-18},{x:15,y:-7,r:13},{x:20,y:13,r:25},{x:-6,y:22,r:-12},{x:9,y:-24,r:12},{x:18,y:-4,r:15},{x:-19,y:8,r:-18},{x:7,y:14,r:-12}];
export function DoctrineLab() {
  const { enabled } = useExperience();
  const [stage, setStage] = useState(0);
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!enabled) return;
    gsap.fromTo(".doctrine-quote .word", { color: "#5d5b5a" }, { color: "#ede9e0", stagger: .06, ease: "none", scrollTrigger: { trigger: ".doctrine-quote", start: "top 85%", end: "bottom 45%", scrub: .35 } });
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });
  useGSAP(() => {
    gsap.to(".system-module", { overwrite: "auto", x: (i: number) => stage === 0 ? scatter[i].x : stage === 1 ? (180-modules[i].x)*.28 : 0, y: (i: number) => stage === 0 ? scatter[i].y : stage === 1 ? (175-modules[i].y)*.28 : 0, rotation: (i: number) => stage === 0 ? scatter[i].r : 0, opacity: (i: number) => stage === 1 && i % 2 ? .15 : 1, duration: enabled ? .7 : 0, stagger: enabled ? .025 : 0, ease: "power3.inOut", transformOrigin: "50% 50%" });
    gsap.to(".system-connection", { strokeDashoffset: stage === 2 ? 0 : stage === 1 ? 130 : 260, opacity: stage === 0 ? .2 : .8, duration: enabled ? .9 : 0, stagger: enabled ? .02 : 0 });
    gsap.to(".system-core", { scale: stage === 1 ? 1.12 : 1, duration: enabled ? .65 : 0, transformOrigin: "50% 50%", ease: "power3.out" });
  }, { scope: visual, dependencies: [stage, enabled] });
  const active = stages[stage];
  return <section id="doctrine" className="doctrine section shell" ref={root} aria-labelledby="doctrine-title"><div className="section-eyebrow mono"><span className="tiny-cross">+</span> THE DOCTRINE <span className="eyebrow-line"/><span className="section-index">03 / APPROACH</span></div><div className="doctrine-intro"><div><h2 id="doctrine-title">Understand the problem.<br/><span className="text-ember">Choose the right change.</span></h2><p className="body-copy">We agree on the scope<br/>before work begins.</p></div><p className="doctrine-quote">{"We investigate the underlying cause before recommending a fix, an upgrade or a rebuild. What already works stays part of the plan.".split(' ').map((word,i) => <span className="word" key={i}>{word} </span>)}</p></div><div className="reconstruction-lab"><div className="lab-left"><div className="lab-label mono"><span className="status-dot"/> RECONSTRUCTION LAB <span>INTERACTIVE</span></div><div className="stage-tabs" role="tablist" aria-label="Reconstruction stages">{stages.map((item,i) => <button key={item.title} id={`stage-${i}`} type="button" role="tab" aria-selected={stage === i} aria-controls="stage-panel" tabIndex={stage === i ? 0 : -1} onClick={() => setStage(i)} onKeyDown={event => { let next = i; if (event.key === "ArrowRight") next = (i+1)%3; else if (event.key === "ArrowLeft") next = (i+2)%3; else if(event.key === "Home") next = 0; else if(event.key === "End") next = 2; else return; event.preventDefault(); setStage(next); document.getElementById(`stage-${next}`)?.focus(); }}><span className="mono">0{i+1}</span>{item.title}{stage === i && <motion.i layoutId="stage-line" transition={{ duration: .25 }}/>}</button>)}</div><div id="stage-panel" role="tabpanel" aria-labelledby={`stage-${stage}`} tabIndex={0}><AnimatePresence mode="wait" initial={false}><motion.div key={stage} initial={{ opacity: 0, y: enabled ? 10 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: enabled ? -6 : 0 }} transition={{ duration: .18 }}><active.icon className="stage-icon" size={27} strokeWidth={1.25}/><h3>{active.verb}</h3><p>{active.body}</p><div className="stage-outcome"><span className="mono">THE OUTPUT</span><span>{active.output}</span><ArrowRight size={17}/></div></motion.div></AnimatePresence></div><div className="lab-hint mono">SELECT A STAGE TO EXPLORE THE PROCESS <ArrowRight size={12}/></div></div><div className={`lab-visual stage-${stage}`} ref={visual} aria-hidden="true"><div className="diagram-grid"/><div className="lab-visual-top mono"><span>STRUCTURE / {active.center}</span><span>0{stage+1}:03</span></div><svg className="system-map" viewBox="0 0 420 410" fill="none"><g className="connection-group">{modules.map((p,i)=><path className="system-connection" key={i} d={`M210 205 L${p.x+30} 205 L${p.x+30} ${p.y+30}`} stroke="#f2b257" strokeWidth="1" strokeDasharray="260"/>)}</g>{modules.map((p,i)=><g key={i} className="system-module"><rect x={p.x} y={p.y} width="60" height="60" rx="2" fill="#16120d" stroke="#9b7445"/><rect x={p.x+8} y={p.y+8} width="44" height="44" stroke="#695034" strokeDasharray="2 4"/><path d={`M${p.x+23} ${p.y+30}h14m-7-7v14`} stroke="#d4b17b"/><circle cx={p.x+52} cy={p.y+8} r="2" fill="#dfaa54"/></g>)}<g className="system-core"><rect x="167" y="162" width="86" height="86" fill="#271b0d" stroke="#e8b96d"/><rect x="173" y="168" width="74" height="74" stroke="#9a6d38" strokeWidth=".5"/><text x="210" y="210" textAnchor="middle" fill="#f4ca89" fontFamily="monospace" fontSize="13" letterSpacing="3">{active.center}</text></g></svg><div className="lab-visual-bottom"><span className="mono"><span className="status-dot"/>{active.graphic}</span><span>{active.note}</span></div></div></div></section>;
}
