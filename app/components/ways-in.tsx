"use client";

import { ArrowUpRight, Compass, LifeBuoy, Network } from "lucide-react";
import { useExperience } from "./experience";

const paths = [
  { number: "01", title: "Manage today", icon: Network, example: "Keep your workplace, accounts, domains, and network working for the people who use them.", focus: "Day-to-day technology management" },
  { number: "02", title: "Solve now", icon: LifeBuoy, example: "An email concern, a network issue, or a problem that does not fit an off-the-shelf answer.", focus: "A specific technology issue" },
  { number: "03", title: "Build next", icon: Compass, example: "Plan the next move, design a better system, or build a tool around the way your business works.", focus: "Planning and building what comes next" },
];

export function WaysIn() {
  const { setFocus } = useExperience();
  return <section id="ways-in" className="ways-section section shell" aria-labelledby="ways-title">
    <div className="section-eyebrow mono"><span className="tiny-cross">+</span> THREE WAYS FORWARD<span className="eyebrow-line"/><span className="section-index">01 / YOUR STARTING POINT</span></div>
    <div className="section-heading"><h2 id="ways-title">Wherever you are,<br/><span className="muted-heading">we start there.</span></h2><p className="body-copy">One business can need steady support today, a specific fix tomorrow, and a roadmap for what follows.</p></div>
    <div className="ways-grid">{paths.map(({ number, title, icon: Icon, example, focus }) => <a className="way-card" href="#intake" onClick={() => setFocus(focus)} key={title}><span className="way-top mono"><span>{number} / START HERE</span><Icon size={22} strokeWidth={1.3}/></span><span className="way-title">{title}</span><span className="way-example">{example}</span><span className="way-action mono">TELL US ABOUT IT <ArrowUpRight size={15}/></span></a>)}</div>
  </section>;
}
