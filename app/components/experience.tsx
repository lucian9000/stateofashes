"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { AnimatePresence, motion, MotionConfig, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";

const ExperienceContext = createContext({ enabled: true, toggle: () => {}, focus: "", setFocus: (_value: string) => {} });
export const useExperience = () => useContext(ExperienceContext);
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(true);
  const [focus, setFocus] = useState("");
  const enabled = motionOn && !reduced;
  return <ExperienceContext.Provider value={{ enabled, toggle: () => setMotionOn(v => !v), focus, setFocus }}><MotionConfig reducedMotion={enabled ? "user" : "always"}><div className={enabled ? "experience" : "experience motion-paused"}>{children}</div></MotionConfig></ExperienceContext.Provider>;
}
export function Brand() {
  return <a href="#top" className="brand" aria-label="State of Ashes home"><img src="/logo.png" width="56" height="56" alt="State of Ashes circuit phoenix"/><span>STATE OF ASHES<small>TECHNOLOGY / ON YOUR TERMS</small></span></a>;
}
export function SiteHeader() {
  const { enabled, toggle } = useExperience();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 35 });
  const links = [["How we help", "ways-in"], ["Services", "architecture"], ["Approach", "doctrine"]];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => { observer.disconnect(); window.removeEventListener("keydown", escape); };
  }, []);
  return <header className="site-header"><motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }}/><div className="shell header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}{active === id && <motion.span layoutId="nav-indicator" className="nav-indicator"/>}</a>)}</nav><div className="header-actions"><button className="motion-toggle mono" onClick={toggle} aria-pressed={enabled} aria-label={enabled ? "Turn motion off" : "Turn motion on"}><Sparkles size={13}/><span>MOTION {enabled ? "ON" : "OFF"}</span></button><a className="header-contact" href="#intake">Let's talk<ArrowUpRight size={16}/></a><button ref={menuButton} className="mobile-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}>{open ? <X size={20}/> : <Menu size={20}/>}</button></div></div><AnimatePresence>{open && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .22 }}>{[...links,["Start an enquiry","intake"]].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17}/></a>)}</motion.nav>}</AnimatePresence></header>;
}
export function ActionLink({ children, href = "#intake", secondary = false, onClick }: { children: ReactNode; href?: string; secondary?: boolean; onClick?: () => void }) {
  const { enabled } = useExperience();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 }), sy = useSpring(y, { stiffness: 200, damping: 20 });
  const move = (event: MouseEvent<HTMLAnchorElement>) => { if (!enabled || !matchMedia("(pointer: fine)").matches) return; const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * .045); y.set((event.clientY - rect.top - rect.height / 2) * .08); };
  return <a href={href} onClick={onClick} className={`action-link ${secondary ? "action-secondary" : ""}`} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}><motion.span className="action-content" style={{ x: sx, y: sy }}>{children}<span className="action-arrow"><ArrowUpRight size={18}/></span></motion.span></a>;
}
