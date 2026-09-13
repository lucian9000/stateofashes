"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Pause, Play } from "lucide-react";
import { useExperience, ActionLink } from "./experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export function HeroExperience() {
  const { enabled } = useExperience();
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const inView = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const sync = () => {
      if (enabled && inView.current && !userPaused.current && !document.hidden) player.play().catch(() => setPlaying(false));
      else player.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { inView.current = entry.isIntersecting; sync(); }, { threshold: .05 });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); player.pause(); };
  }, [enabled]);
  useGSAP(() => {
    if (!enabled) return;
    const intro = gsap.timeline({ defaults: { ease: "power3.out", duration: .85 } });
    intro.from(".hero-art", { opacity: 0, duration: 1.1 }, 0)
      .from(".hero-title-word", { yPercent: 110, stagger: .1 }, .12)
      .from(".hero-kicker, .hero-description, .hero-actions", { opacity: 0, y: 12, stagger: .08 }, .35)
      .from(".art-frame", { opacity: 0, scale: .97 }, .05);
    const match = gsap.matchMedia();
    match.add("(min-width: 768px)", () => {
      gsap.to(".hero-art", { y: 85, scale: 1.05, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: .7 } });
    });
    return () => match.revert();
  }, { scope: root, dependencies: [enabled], revertOnUpdate: true });
  return <section ref={root} id="origin" className="hero" aria-labelledby="hero-title">
    <div className="hero-art" aria-hidden="true"><img className={`video-poster ${hasFrame && !failed ? "poster-hidden" : ""}`} src="/phoenix-poster.jpg" alt="" fetchPriority="high"/><video ref={video} autoPlay={enabled} muted loop playsInline preload="auto" poster="/phoenix-poster.jpg" className={hasFrame && !failed ? "ambient-video video-visible" : "ambient-video"} onPlaying={() => { setPlaying(true); setHasFrame(true); }} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}><source src="/phoenix.webm" type="video/webm"/><source src="/phoenix.mp4" type="video/mp4"/></video><div className="hero-shade"/></div>
    <div className="hero-stage shell"><div className="art-frame"><span className="art-caption mono">SOA / ORIGIN ARTIFACT</span><span className="art-caption art-caption-right mono">ARCH_V1.0</span><i className="frame-corner tl"/><i className="frame-corner tr"/><i className="frame-corner bl"/><i className="frame-corner br"/><span className="art-bottom mono"><span className="status-dot"/> RECONSTRUCTION PROTOCOL / ACTIVE</span></div>
      <div className="hero-side hero-side-left mono"><span>INDEPENDENT THINKING.</span><span>EXACTING EXECUTION.</span><i/></div><div className="hero-side hero-side-right mono"><span>NOTHING EXTRA.</span><span>NOTHING ACCIDENTAL.</span><i/></div>
    </div>
    <div className="hero-content shell"><div className="hero-kicker mono"><span className="status-dot"/>[ SYS_STATUS: OPERATIONAL // ARCH_V1 ]</div><h1 id="hero-title"><span className="word-mask"><span className="hero-title-word">STATE OF</span></span> <span className="word-mask"><span className="hero-title-word title-ember">ASHES</span></span></h1><p className="hero-description">Institutional Reconstruction &amp; Custom Solutions Architecture.</p><div className="hero-actions"><ActionLink>Initialize Diagnostic</ActionLink></div></div>
    <div className="hero-bottom shell mono"><a href="#doctrine"><span className="scroll-line"/>SCROLL TO RECONSTRUCT<ArrowDown size={13}/></a><span>FROM COMPLEXITY. INTO CLARITY.</span><button className="video-control" disabled={failed || !enabled} onClick={() => { const player = video.current; if (!player) return; if (player.paused) { userPaused.current = false; player.play().catch(() => setPlaying(false)); } else { userPaused.current = true; player.pause(); } }} aria-label={playing ? "Pause background video" : "Play background video"}>{playing ? <Pause size={12}/> : <Play size={12}/>}<span>{failed ? "STILL FRAME" : !enabled ? "MOTION PAUSED" : playing ? "LIVE VISUAL FEED" : "PLAY VISUAL FEED"}</span></button></div>
  </section>;
}
