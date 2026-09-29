# State of Ashes: broader services and guided intake

Date: 2026-09-29
Status: design approved in conversation; written specification for review

## Purpose

State of Ashes should immediately read as a practical technology partner for small and medium businesses, not solely an AI or software architecture studio. A visitor should see three valid reasons to enquire: they need someone to look after day-to-day technology, they have a specific problem, or they need help planning and building what comes next. The offer remains tailored to the business and its constraints; the page must not imply a fixed product stack or a narrow list of eligible problems.

The initial focus is the Western Cape, including outlying areas, with enquiries welcomed from elsewhere in South Africa. Experience managing multiple environments in South Africa and the United States is background credibility, not a promise of current US coverage.

## Experience and page structure

Keep the existing pitch-black/slate palette, restrained ember accents, precise typography, phoenix video, motion language, and exact brand logo where it already appears. Keep the hero video unobstructed: do not place a logo over it or restore the removed “watch the origin film” action. Preserve video playback controls and reduced-motion behavior. Motion supports the story but does not block reading, navigation, or enquiry.

1. **Hero — immediate clarity.** Retain “STATE OF ASHES” as the display headline. Replace the narrow architecture descriptor with “Technology that works for your business.” Supporting line: “We look after the systems you rely on, solve the problems slowing you down, and design what comes next.” Primary action: “Tell us what you need.” A small location line can read “Based in the Western Cape. Working across South Africa.”
2. **Three ways in.** Present “Manage today,” “Solve now,” and “Build next” as equal entry points. Each gives one plain-language example and takes the visitor to a relevant part of the page or opens the guided enquiry with that context. The labels describe situations, not rigid service packages.
3. **Capabilities.** Replace the current three-card AI/software/modernization emphasis with a scannable, expandable set of capability families. Keep enough detail to be credible, with an “If your need does not fit a label, tell us about it” invitation. No card implies a mandatory platform or vendor.
4. **Method.** Retain the Deconstruct / Distill / Reconstruct doctrine as the way work is approached. Clarify that discovery leads to a fit-for-purpose recommendation rather than a predefined solution.
5. **Examples and proof.** Existing illustrative blueprint cards may remain if they are unmistakably labelled as examples. Do not present them as delivered client case studies. A short operator note may say the practice draws on MSP work across South African and US environments. The owner's own Synology mail, Resend relay, DKIM/DMARC, and Cloudflare dynamic DNS setup may be described only as an example of pragmatic problem solving, clearly identified as an internal setup; avoid claims of zero downtime.
6. **Engagement and intake.** State that work may be a focused project or an ongoing managed agreement, depending on what the business needs. Do not publish response times, SLAs, rates, or 24/7 claims yet. Keep the full-page form as an alternative to the guided bubble.

### Capability families and draft language

| Family | What the page can name |
| --- | --- |
| Workplace and tenant operations | Microsoft 365 and Google Workspace setup, administration, and ongoing management. |
| Domains, networks, and infrastructure | Domain management, network management, and practical improvements to the systems a business depends on. |
| Security foundations | Microsoft 365 / Google Workspace hardening, identity and access, backups, and endpoint protection. Other security work is discussed and scoped against the right tools and partners; do not imply a SOC, forensic incident response, or guaranteed breach recovery. |
| Websites and custom software | Website development, bespoke software, internal tools, and integrations that fit the business workflow. |
| Automation and AI architecture | Useful automation and AI integrations with appropriate human oversight, based on a real operational need. |
| Technology direction | vCIO guidance, technology roadmaps, and solutions architecture. |

The page should describe these as examples of where State of Ashes can help, not as a complete catalogue. A possible section line is: “One business can need reliable email today, a safer network tomorrow, and a custom workflow next quarter. We work from the problem outward.”

## Guided enquiry bubble

This is a guided contact flow, not an AI chat or troubleshooting agent. It uses local, authored prompts, so there is no Gemini or Vercel AI API charge. The bubble offers brief orientation and gathers enough context for a human follow-up; it must not imply that it can diagnose, contain, or resolve an incident.

The launcher sits at the lower right on desktop and mobile, remains discoverable without obscuring the main intake button, and can be dismissed. Desktop opens a compact panel; mobile opens a readable bottom sheet. The interaction has clear progress and Back/Close controls, preserves the draft while open, and gives a final editable review before sending. Escape closes it, focus returns to the launcher, keyboard and screen-reader users can complete every step, and reduced-motion preferences remove nonessential transitions. Closing must never submit.

Flow:

1. **Opening:** “What brings you here?” Choices: “Something is down,” “Security concern,” “Project enquiry,” “Planning ahead,” and “Something else.” A service card or three-way entry point may preselect a relevant topic, but the visitor can change it.
2. **Brief guidance:** One short, conditional message. For an outage: “Tell us what is affected and when it started. If the issue is urgent, use your existing support or escalation channel while we review your request.” For a security concern: “If an account may be compromised, use your existing security or administrator contact now. Please do not share passwords or one-time codes here.” For project/planning: “Tell us what you want to change and what is getting in the way.” “Something else” asks for a short description. This is orientation, not a promise of a response time.
3. **Details:** Ask for name, company, email, location, urgency, current systems, and a description of the issue or goal. Name, valid email, urgency, and a description of at least 20 characters are required. Company, location, and current systems are asked explicitly but can be skipped; empty is recorded as “Not provided.” Urgency choices are “Something is down,” “Security concern,” “Project enquiry,” and “Planning ahead,” plus “Other / unsure” to cover the fifth opening path. The chosen opening topic and urgency are separate so a visitor can describe a project with a security angle. Do not ask for passwords, recovery codes, personal data, or confidential records.
4. **Review and send:** Show all answers and a clear “Send enquiry” action. Disable repeat submission while sending. On success, say “Request received” and explain that a human will follow up by email, without claiming a particular response time. On failure, retain the draft, explain that delivery was not confirmed, allow retry, and provide a copy-brief action.

The existing full-page form stays usable. Its headline and labels should shift from “diagnostic/bottleneck” to “enquiry/what do you need help with?” so it accepts routine management and planning work as naturally as a broken system. The floating bubble is an alternative route into the same intake, not a second destination.

## Technical boundaries and delivery

Implement the redesign in the production Git checkout at `C:\Projects\StateOfAshes\repository`. Keep the current Next.js App Router, Tailwind styling, GSAP/Framer Motion patterns, logo/video assets, and `/api/intake` route. The current route accepts `name`, `email`, `bottleneck`, and the hidden honeypot; it stores the request in Supabase, sends the internal Resend notification, and attempts the published auto-reply. Keep the auto-reply's subject and body managed by the published Resend template.

For the guided bubble, send `name` and `email` as today. Format the other answers into the existing `bottleneck` field as labelled plain text: topic, urgency, company, location, current systems, and description. This avoids a database migration and ensures the same context appears in the stored row and notification. Keep the serialized text at or under the route's 5,000-character limit and the JSON body under 12,000 characters; show per-field limits and validate before submit. Set the honeypot field empty. The full-page form continues to post to the same route. Source labels can distinguish guided from full-page enquiries only if the route is changed to validate a small allowlist; otherwise keep its current single source value. Do not add tracking or an AI backend.

The existing route treats a request as received if either Supabase storage or the internal notification succeeds; it reports an error only if both fail. Therefore the UI must say “received,” not “delivered to both destinations.” If the auto-reply fails after receipt, do not ask the visitor to resubmit. Preserve same-origin, honeypot, input-size, and email validation. Any later rate limiting should be based on actual abuse, rather than added as an untested dependency to this change.

## Acceptance criteria

- The first viewport clearly communicates day-to-day IT, specific problem solving, and forward planning without losing the phoenix-led visual identity.
- All six capability families are findable on desktop and mobile, and security claims stay within the stated scope.
- Project and ongoing managed work are both represented; no unsupported SLA, 24/7, pricing, client proof, or guaranteed outcome is implied.
- The guided flow captures the seven requested information points, allows optional fields to be skipped, shows a review step, and uses the existing intake destination and published acknowledgement behavior.
- The full-page form remains usable. Keyboard navigation, focus management, readable errors, contrast, and reduced-motion behavior work on desktop and mobile. The bubble does not obstruct video controls or key actions.
- Verify responsive layouts, form serialization and validation, the route's success/failure behavior, and a production build before release. Use a clearly labelled end-to-end test submission only with the user's existing authorization or renewed authorization if needed for this change.

## Explicitly outside this change

No AI chatbot, automated diagnosis, new paid AI integration, fixed security software stack, published SLA, booking system, pricing table, or database schema change. These can be considered after the broader positioning and intake are live and visitor needs are clearer.
