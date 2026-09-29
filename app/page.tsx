"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, AudioLines, MoveUpRight } from "lucide-react";
import { ExperienceProvider, SiteHeader, Brand, useExperience } from "./components/experience";
import { HeroExperience } from "./components/hero-experience";
import { WaysIn } from "./components/ways-in";
import { DoctrineLab } from "./components/doctrine-lab";
import { Architecture } from "./components/architecture";
import { Blueprints } from "./components/blueprints";
import { IntakeForm } from "./components/intake-form";
import { GuidedIntake } from "./components/guided-intake";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Landing() {
  const { enabled } = useExperience();
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!enabled) return;
    gsap.utils.toArray<HTMLElement>(".section-heading h2, .intake-copy h2, .engagement-heading").forEach(heading => gsap.from(heading, { y: 25, opacity: .2, duration: .8, ease: "power3.out", scrollTrigger: { trigger: heading, start: "top 92%", once: true } }));
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });

  return <div id="top" ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader/>
    <main id="main">
      <HeroExperience/>
      <WaysIn/>
      <Architecture/>
      <DoctrineLab/>
      <Blueprints/>
      <section className="engagement-section" aria-labelledby="engagement-title">
        <div className="shell section engagement-layout">
          <div><div className="section-eyebrow mono"><span className="tiny-cross">+</span> THE WAY WE WORK<span className="eyebrow-line"/><span className="section-index">05 / ENGAGEMENT</span></div><h2 id="engagement-title" className="engagement-heading">The right shape<br/>for <span className="text-ember">your situation.</span></h2></div>
          <div className="engagement-content"><p>Sometimes the answer is a focused project. Sometimes it is an ongoing partnership keeping the everyday technology in good order. We find what works for your needs, your systems, and your next move.</p><div className="engagement-facts"><span>PROJECT WORK <MoveUpRight size={15}/></span><span>ONGOING MANAGEMENT <MoveUpRight size={15}/></span></div><p className="operator-note">Grounded in MSP experience across multiple environments in South Africa and the United States. Based in the Western Cape, with enquiries welcome from across South Africa.</p></div>
        </div>
      </section>
      <section id="intake" className="intake-section" aria-labelledby="intake-title"><div className="shell section intake-layout"><div className="intake-copy"><div className="section-eyebrow mono"><span className="tiny-cross">+</span> START A CONVERSATION<span className="eyebrow-line"/></div><h2 id="intake-title">Tell us what<br/><span className="text-ember">you need.</span></h2><p className="body-copy">A day-to-day technology need, a specific problem, or a plan taking shape. Start with what matters most to you.</p><div className="intake-signal"><AudioLines size={30} strokeWidth={1}/><div className="mono">HUMAN INSIGHT. SYSTEMS THINKING.<span>Direct conversation. No fixed playbook.</span></div></div><div className="intake-next"><span className="mono">WHAT HAPPENS NEXT</span><p>We read your context and follow up by email to understand the right next step. Please leave out passwords, codes, and confidential records.</p></div></div><IntakeForm/></div></section>
    </main>
    <footer className="shell footer"><div className="footer-top"><Brand/><a href="#top" className="back-top mono">BACK TO THE BEGINNING<ArrowUpRight size={20}/></a></div><div className="footer-bottom mono"><span>© {new Date().getFullYear()} STATE OF ASHES</span><span>DECONSTRUCT. DISTILL. RECONSTRUCT.</span><span className="footer-signature">BUILT WITH INTENT.</span></div></footer>
    <GuidedIntake/>
  </div>;
}

export default function Home() { return <ExperienceProvider><Landing/></ExperienceProvider>; }
