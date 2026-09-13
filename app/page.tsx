"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, AudioLines } from "lucide-react";
import { ExperienceProvider, SiteHeader, Brand, useExperience } from "./components/experience";
import { HeroExperience } from "./components/hero-experience";
import { DoctrineLab } from "./components/doctrine-lab";
import { Architecture } from "./components/architecture";
import { Blueprints } from "./components/blueprints";
import { IntakeForm } from "./components/intake-form";

gsap.registerPlugin(useGSAP,ScrollTrigger);
function Landing(){
 const {enabled}=useExperience();
 const root=useRef<HTMLDivElement>(null);
 useGSAP(()=>{if(!enabled)return;gsap.utils.toArray<HTMLElement>('.section-heading h2, .intake-copy h2').forEach(heading=>gsap.from(heading,{y:25,opacity:.2,duration:.8,ease:'power3.out',scrollTrigger:{trigger:heading,start:'top 92%',once:true}}));}, {scope:root,dependencies:[enabled],revertOnUpdate:true});
 return <div id="top" ref={root}><a className="skip-link" href="#main">Skip to content</a><SiteHeader/><main id="main"><HeroExperience/><DoctrineLab/><Architecture/><Blueprints/><section id="intake" className="intake-section" aria-labelledby="intake-title"><div className="shell section intake-layout"><div className="intake-copy"><div className="section-eyebrow mono"><span className="tiny-cross">+</span> SECURE INTAKE<span className="eyebrow-line"/></div><h2 id="intake-title">Every breakthrough<br/>starts with a<br/><span className="text-ember">bottleneck.</span></h2><p className="body-copy">Tell us where the friction is.<br/>We'll work out what needs to change.</p><div className="intake-signal"><AudioLines size={30} strokeWidth={1}/><div className="mono">HUMAN INSIGHT. SYSTEMS THINKING.<span>Direct conversation. No sales theatre.</span></div></div><div className="intake-next"><span className="mono">WHAT HAPPENS NEXT</span><p>We read your context, identify the questions worth asking, and start a direct conversation about the right approach.</p></div></div><IntakeForm/></div></section></main><footer className="shell footer"><div className="footer-top"><Brand/><a href="#top" className="back-top mono">BACK TO THE BEGINNING<ArrowUpRight size={20}/></a></div><div className="footer-bottom mono"><span>© {new Date().getFullYear()} STATE OF ASHES</span><span>DECONSTRUCT. DISTILL. RECONSTRUCT.</span><span className="footer-signature">BUILT WITH INTENT.</span></div></footer></div>;
}
export default function Home(){return <ExperienceProvider><Landing/></ExperienceProvider>;}
