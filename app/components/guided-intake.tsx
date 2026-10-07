"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Copy, LoaderCircle, MessageSquareText, Send, X } from "lucide-react";
import { useExperience } from "./experience";
import { formatGuidedBrief, GUIDED_DESCRIPTION_MAX, GUIDED_FIELD_MAX, GUIDED_TOPICS, GUIDED_URGENCIES, type GuidedTopic, type GuidedUrgency } from "./intake-brief";

type Step = "topic" | "guidance" | "details" | "review" | "success";
type Draft = { topic: GuidedTopic | ""; urgency: GuidedUrgency | ""; name: string; company: string; email: string; location: string; systems: string; description: string };

const emptyDraft: Draft = { topic: "", urgency: "", name: "", company: "", email: "", location: "", systems: "", description: "" };
const guidance: Record<GuidedTopic, string> = {
  "Something is down": "Tell us what is affected and when it started. If the issue is urgent, use your existing support or escalation channel while we review your request.",
  "Security concern": "If an account may be compromised, use your existing security or administrator contact now. Please do not share passwords or one-time codes here.",
  "Project enquiry": "Tell us what you want to change and what is getting in the way.",
  "Planning ahead": "Tell us what you want to change and what is getting in the way.",
  "Something else": "Describe what is happening or what you would like to achieve. We will work out the right questions together.",
};

const stepNumber: Record<Step, string> = { topic: "01 / 04", guidance: "02 / 04", details: "03 / 04", review: "04 / 04", success: "RECEIVED" };

export function GuidedIntake() {
  const { enabled } = useExperience();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("topic");
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [intakeInView, setIntakeInView] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const launcher = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = document.getElementById("intake");
    const hero = document.getElementById("origin");
    const intakeObserver = new IntersectionObserver(([entry]) => setIntakeInView(entry.isIntersecting), { threshold: .2 });
    const heroObserver = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { rootMargin: "-130px 0px 0px 0px", threshold: .05 });
    if (section) intakeObserver.observe(section);
    if (hero) heroObserver.observe(hero);
    return () => { intakeObserver.disconnect(); heroObserver.disconnect(); };
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (open) {
      const previousOverflow = document.body.style.overflow;
      if (!modal.open) modal.showModal();
      document.body.style.overflow = "hidden";
      return () => { if (modal.open) modal.close(); document.body.style.overflow = previousOverflow; };
    }
    launcher.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => heading.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open, step]);

  const close = () => { if (!sending) { setOpen(false); if (step === "success") { setStep("topic"); setDraft(emptyDraft); } } };
  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft(current => ({ ...current, [key]: value }));
  const chooseTopic = (topic: GuidedTopic) => { update("topic", topic); setError(""); setStep(topic === "Something is down" || topic === "Security concern" ? "guidance" : "details"); };
  const needsGuidance = draft.topic === "Something is down" || draft.topic === "Security concern";
  const progress = step === "success" ? "RECEIVED" : needsGuidance ? stepNumber[step] : ({ topic: "01 / 03", guidance: "02 / 03", details: "02 / 03", review: "03 / 03" } as const)[step];
  const back = () => { setError(""); setStep(step === "review" ? "details" : step === "details" && needsGuidance ? "guidance" : "topic"); };
  const detailsValid = draft.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()) && draft.urgency !== "" && draft.description.trim().length >= 20;
  const brief = step === "review" && draft.topic && draft.urgency ? formatGuidedBrief({ topic: draft.topic, urgency: draft.urgency, company: draft.company, location: draft.location, systems: draft.systems, description: draft.description }) : "";

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!detailsValid) { setError("Add your name, a valid email, urgency, and at least 20 characters about the issue or goal."); return; }
    try {
      if (!draft.topic || !draft.urgency) throw new Error("Choose a topic and urgency.");
      formatGuidedBrief({ topic: draft.topic, urgency: draft.urgency, company: draft.company, location: draft.location, systems: draft.systems, description: draft.description });
      setError(""); setStep("review");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Please check your answers."); }
  }

  async function submit() {
    if (sending || !brief) return;
    setSending(true); setError(""); setCopied(false);
    try {
      const response = await fetch("/api/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: draft.name.trim(), email: draft.email.trim(), website: "", bottleneck: brief }) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error(result?.error || "Delivery could not be confirmed. Please try again.");
      setStep("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Delivery could not be confirmed. Please try again.");
    } finally { setSending(false); }
  }

  async function copyBrief() {
    try { await navigator.clipboard.writeText(`Name: ${draft.name}\nEmail: ${draft.email}\n\n${brief}`); setCopied(true); }
    catch { setError("Clipboard access is unavailable. You can select and copy the brief below."); }
  }

  return <>
    <button ref={launcher} type="button" className="guided-launcher" aria-label="Start an enquiry" aria-expanded={open} aria-controls="guided-enquiry" hidden={(intakeInView || heroInView) && !open} onClick={() => setOpen(true)}><MessageSquareText size={19} strokeWidth={1.6}/><span>Start an enquiry</span><span className="guided-launcher-pulse" aria-hidden="true"/></button>
    <dialog ref={dialog} id="guided-enquiry" className="guided-dialog" aria-labelledby="guided-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <motion.div key={open ? "open" : "closed"} className="guided-panel" initial={{ opacity: 0, y: enabled ? 12 : 0, scale: enabled ? .985 : 1 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: enabled ? .24 : 0 }}>
        <div className="guided-header"><div className="guided-brand"><img src="/logo-small.webp" alt="" width="37" height="37"/><div><strong>STATE OF ASHES</strong><span>GUIDED ENQUIRY / HUMAN FOLLOW-UP</span></div></div><button type="button" className="guided-icon-button" aria-label="Close enquiry" onClick={close} disabled={sending}><X size={19}/></button></div>
        <div className="guided-progress mono"><span>{progress}</span><span>{step === "success" ? "REQUEST RECEIVED" : "TELL US WHAT MATTERS"}</span></div>
        <div className="guided-content" key={step}>
          {step === "topic" && <><p className="guided-eyebrow mono">START WITH YOUR SITUATION</p><h2 id="guided-title" ref={heading} tabIndex={-1}>What brings<br/>you here?</h2><p className="guided-lead">Choose the closest starting point. Your need does not have to fit a category.</p><div className="guided-options">{GUIDED_TOPICS.map(topic => <button type="button" key={topic} onClick={() => chooseTopic(topic)}>{topic}<ChevronRight size={17}/></button>)}</div></>}
          {step === "guidance" && <><p className="guided-eyebrow mono">{draft.topic.toUpperCase()}</p><h2 id="guided-title" ref={heading} tabIndex={-1}>A useful<br/>starting point.</h2><p className="guided-guidance">{guidance[draft.topic as GuidedTopic]}</p><p className="guided-safety">We will ask for context, not passwords, codes, or confidential records.</p><div className="guided-actions"><button type="button" className="guided-back" onClick={back}><ArrowLeft size={16}/> Back</button><button type="button" className="guided-primary" onClick={() => setStep("details")}>Continue <ArrowRight size={16}/></button></div></>}
          {step === "details" && <><p className="guided-eyebrow mono">YOUR CONTEXT</p><h2 id="guided-title" ref={heading} tabIndex={-1}>Help us understand.</h2><p className="guided-lead">A few details give us a better place to start. Fields marked * are required.</p><form className="guided-form" onSubmit={review}>
            <div className="guided-field"><label htmlFor="guided-name">Name *</label><input id="guided-name" autoComplete="name" required minLength={2} maxLength={160} value={draft.name} onChange={event => update("name", event.target.value)} placeholder="Your name"/></div>
            <div className="guided-field"><label htmlFor="guided-company">Company</label><input id="guided-company" autoComplete="organization" maxLength={GUIDED_FIELD_MAX.company} value={draft.company} onChange={event => update("company", event.target.value)} placeholder="Optional"/></div>
            <div className="guided-field"><label htmlFor="guided-email">Email *</label><input id="guided-email" type="email" autoComplete="email" required maxLength={254} value={draft.email} onChange={event => update("email", event.target.value)} placeholder="you@company.com"/></div>
            <div className="guided-field"><label htmlFor="guided-location">Location</label><input id="guided-location" autoComplete="address-level2" maxLength={GUIDED_FIELD_MAX.location} value={draft.location} onChange={event => update("location", event.target.value)} placeholder="Town or region (optional)"/></div>
            <div className="guided-field guided-field-wide"><label htmlFor="guided-urgency">Urgency *</label><select id="guided-urgency" required value={draft.urgency} onChange={event => update("urgency", event.target.value as GuidedUrgency)}><option value="">Choose the closest fit</option>{GUIDED_URGENCIES.map(value => <option key={value} value={value}>{value}</option>)}</select></div>
            <div className="guided-field guided-field-wide"><label htmlFor="guided-systems">Current systems</label><input id="guided-systems" maxLength={GUIDED_FIELD_MAX.systems} value={draft.systems} onChange={event => update("systems", event.target.value)} placeholder="Microsoft 365, Google Workspace, network equipment… (optional)"/></div>
            <div className="guided-field guided-field-wide"><label htmlFor="guided-description">Describe the issue or goal * <span>{draft.description.length}/{GUIDED_DESCRIPTION_MAX}</span></label><textarea id="guided-description" required minLength={20} maxLength={GUIDED_DESCRIPTION_MAX} rows={5} value={draft.description} onChange={event => update("description", event.target.value)} placeholder="What is happening, or what would you like to change?"/><small>At least 20 characters. Leave out sensitive information. <a href="/privacy">Enquiry privacy</a></small></div>
            {error && <p className="guided-error" role="alert">{error}</p>}
            <div className="guided-actions guided-field-wide"><button type="button" className="guided-back" onClick={back}><ArrowLeft size={16}/> Back</button><button type="submit" className="guided-primary">Review answers <ArrowRight size={16}/></button></div>
          </form></>}
          {step === "review" && <><p className="guided-eyebrow mono">BEFORE SENDING</p><h2 id="guided-title" ref={heading} tabIndex={-1}>Review your enquiry.</h2><p className="guided-lead">A human will read this and follow up by email.</p><dl className="guided-review"><div><dt>Name</dt><dd>{draft.name}</dd></div><div><dt>Company</dt><dd>{draft.company.trim() || "Not provided"}</dd></div><div><dt>Email</dt><dd>{draft.email}</dd></div><div><dt>Location</dt><dd>{draft.location.trim() || "Not provided"}</dd></div><div><dt>Topic</dt><dd>{draft.topic}</dd></div><div><dt>Urgency</dt><dd>{draft.urgency}</dd></div><div><dt>Current systems</dt><dd>{draft.systems.trim() || "Not provided"}</dd></div><div className="guided-review-description"><dt>Issue or goal</dt><dd>{draft.description}</dd></div></dl>{error && <div className="guided-failure" role="alert"><p>{error}</p><p>You can also email <a href="mailto:info@stateofashes.com">info@stateofashes.com</a>.</p><button type="button" onClick={copyBrief}><Copy size={15}/>{copied ? "Copied" : "Copy enquiry"}</button><textarea aria-label="Enquiry brief for copying" readOnly value={`Name: ${draft.name}\nEmail: ${draft.email}\n\n${brief}`} rows={5}/></div>}<div className="guided-actions"><button type="button" className="guided-back" onClick={back} disabled={sending}><ArrowLeft size={16}/> Edit answers</button><button type="button" className="guided-primary" disabled={sending} onClick={submit}>{sending ? <LoaderCircle size={16} className="animate-spin"/> : <Send size={16}/>} {sending ? "Sending…" : "Send enquiry"}</button></div></>}
          {step === "success" && <div className="guided-success"><span className="guided-success-icon"><Check size={27}/></span><p className="guided-eyebrow mono">TRANSMISSION COMPLETE</p><h2 id="guided-title" ref={heading} tabIndex={-1}>Request received.</h2><p>We have your context and will follow up by email. Thank you for telling us what you need.</p><button type="button" className="guided-primary" onClick={close}>Close <X size={16}/></button></div>}
        </div>
        <div className="guided-footer mono"><span>STATE OF ASHES / WESTERN CAPE</span><span>DIRECT HUMAN FOLLOW-UP.</span></div>
      </motion.div>
    </dialog>
  </>;
}
