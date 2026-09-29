# Broader Services and Guided Intake Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make State of Ashes clearly offer ongoing IT care, problem solving, and forward-looking architecture, with a guided enquiry path that uses the existing intake delivery.

**Architecture:** Retain the production Next.js single page, video hero, visual tokens, and `/api/intake` route. Add an independent guided-enquiry component and a pure serializer for its data. Rework the page narrative and capability cards without changing the database schema or introducing an AI service.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, GSAP, Framer Motion, Lucide, Node 24 test runner.

## Global Constraints

- Work in `C:\Projects\StateOfAshes\repository`; preserve `/logo.png`, phoenix video, controls, and reduced-motion behavior.
- Use the approved design at `docs/superpowers/specs/2026-09-29-broader-services-guided-intake-design.md` as the copy and scope source.
- Do not imply a SOC, forensic response, guaranteed recovery, 24/7 coverage, fixed SLA, prices, or delivered client cases.
- The form remains active; both routes post to `/api/intake` and retain the Resend template-managed acknowledgement.
- Guided payload: `name`, `email`, `website: ''`, and a labelled `bottleneck` string <=5,000 characters. Whole JSON <=12,000 characters.

## File map

- `app/components/hero-experience.tsx`: clear opening promise without touching video playback code.
- `app/components/experience.tsx`: brand descriptor and navigation.
- `app/components/ways-in.tsx`: three situation-based entry points.
- `app/components/architecture.tsx`: six expandable capability families; retain the existing interaction style.
- `app/components/guided-intake.tsx`: launcher, accessible sheet/dialog, staged questions, review, send, and failure recovery.
- `app/components/intake-brief.ts`: pure serializer and validation constants shared with the guided UI.
- `app/components/intake-form.tsx`: align general form language with wider offer.
- `app/page.tsx`: narrative order, engagement and operator notes, guided bubble mount.
- `app/layout.tsx`: broaden page title, description, and social metadata.
- `app/api/intake/route.ts`: change internal notification and validation wording to "enquiry" without altering delivery behavior or the Resend-managed auto-reply.
- `app/globals.css`: responsive styles for new sections and sheet, focus and reduced-motion states.
- `scripts/test-intake-brief.mjs`: meaningful tests for the serialized request, limits, and optional values.

---

### Task 1: Broad narrative and navigation

**Files:** Modify `app/components/hero-experience.tsx`, `app/components/experience.tsx`, `app/components/intake-form.tsx`, `app/page.tsx`; create `app/components/ways-in.tsx`; modify `app/globals.css`.

**Interfaces:** `WaysIn` takes no props and renders links to `#intake` carrying a context through `useExperience().setFocus`. Existing `ActionLink` remains the hero CTA.

- [x] **Step 1: Replace the hero descriptor and CTA.** Keep `STATE OF ASHES` and all video elements. Render the exact approved promise and supporting line: `Technology that works for your business.` and `We look after the systems you rely on, solve the problems slowing you down, and design what comes next.` Link text: `Tell us what you need`.
- [x] **Step 2: Add the three-way entry component.** Use a data array with `{title, example, focus}` for `Manage today`, `Solve now`, `Build next`; map each to an accessible `<a href="#intake" onClick={() => setFocus(focus)}>`. Keep all three equally prominent.
- [x] **Step 3: Wire page sections and general enquiry language.** Render `<WaysIn/>` after the hero, keep doctrine and blueprints, add Western Cape / South Africa reach and project-or-ongoing copy. Change intake heading to `Tell us what you need.`; change form labels to `Enquiry`, `What do you need help with?`, and `Send enquiry` without changing field names.
- [x] **Step 4: Check responsive layout and compile.** Run `npm run typecheck` and `npm run build`; expected exit code 0. Manually check the first viewport at 390px and 1440px.
- [x] **Step 5: Commit.** `git add app/components/hero-experience.tsx app/components/experience.tsx app/components/intake-form.tsx app/components/ways-in.tsx app/page.tsx app/globals.css` then `git commit -m "Broaden landing page positioning"`.

### Task 2: Capability breadth and honest proof

**Files:** Modify `app/components/architecture.tsx`, `app/components/blueprints.tsx`, `app/components/doctrine-lab.tsx`, `app/globals.css`.

**Interfaces:** Each capability exposes `{title, summary, detail, examples, focus}`. The existing expand/collapse state and `ActionLink` continue to lead to `#intake` with a focus value.

- [x] **Step 1: Replace the three-card data with six families.** Use the approved labels: Workplace and tenant operations; Domains, networks, and infrastructure; Security foundations; Websites and custom software; Automation and AI architecture; Technology direction. Include exactly the grounded service examples in the spec.
- [x] **Step 2: Adjust the responsive grid and detail panel.** Show three columns on wide desktop, two on tablet, one on mobile. Keep keyboard-operable expand buttons, amber circuit hover accent, and the selected-card detail region. Give each button a unique `aria-controls` target and keep the expanded content associated with the chosen card.
- [x] **Step 3: Clarify method and proof.** Add a fit-for-purpose recommendation line to doctrine. Keep `CONCEPT BLUEPRINT` and make the blueprint note explicit that these are illustrative, not delivered cases. Add one short operator note in the page about MSP experience across SA and US environments; identify the mail setup only as the owner's internal example if shown.
- [x] **Step 4: Verify.** Run `npm run typecheck` and `npm run build`; inspect cards at mobile and desktop widths, including keyboard toggling.
- [x] **Step 5: Commit.** `git add app/components/architecture.tsx app/components/blueprints.tsx app/components/doctrine-lab.tsx app/page.tsx app/globals.css` then `git commit -m "Expand and clarify service capabilities"`.

### Task 3: Guided request serialization

**Files:** Create `app/components/intake-brief.ts`, `scripts/test-intake-brief.mjs`.

**Interfaces:** Export `type GuidedBrief`, `formatGuidedBrief(value: GuidedBrief): string`, `GUIDED_DESCRIPTION_MAX`, and `GUIDED_FIELD_MAX`. A brief contains `topic`, `urgency`, `company`, `location`, `systems`, and `description`; optional strings become `Not provided`.

- [x] **Step 1: Write a failing Node test.** `scripts/test-intake-brief.mjs` imports `../app/components/intake-brief.ts` and asserts that an example with topic `Security concern`, urgency `Something is down`, blank company, location `Worcester`, systems `Microsoft 365`, and a 20+ character description yields labelled lines including `Company: Not provided` and stays <=5,000 characters. Assert values containing newlines are normalized to spaces so they cannot spoof labels.
- [x] **Step 2: Run `node --experimental-strip-types scripts/test-intake-brief.mjs`.** Expected failure: module not found.
- [x] **Step 3: Implement the pure formatter.** Normalize user-supplied single-line fields with `replace(/\s+/g, ' ').trim()`, trim the description, and return `Topic: ...\nUrgency: ...\nCompany: ...\nLocation: ...\nCurrent systems: ...\n\nDescription:\n...`. Keep UI field maximums below the route's 5,000-character limit. Throw when any required value is absent or serialized output exceeds 5,000.
- [x] **Step 4: Rerun the test and `npm run typecheck`.** Both should pass.
- [x] **Step 5: Commit.** `git add app/components/intake-brief.ts scripts/test-intake-brief.mjs` then `git commit -m "Format guided enquiries for existing intake"`.

### Task 4: Guided bubble and final verification

**Files:** Create `app/components/guided-intake.tsx`; modify `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `app/components/intake-form.tsx`, `app/api/intake/route.ts`.

**Interfaces:** `GuidedIntake` takes no props, uses `formatGuidedBrief`, posts `{name,email,website:'',bottleneck}` to `/api/intake`, and is mounted once inside `ExperienceProvider`. No route or database change.

- [x] **Step 1: Build the staged UI.** Use `topic -> guidance -> details -> review -> success` as explicit states. Required: name >=2, valid email, urgency, description >=20. Optional company, location, systems can be blank. Provide native labels, max lengths, and visible field counts where appropriate. Let Back preserve answers and Review allow edits.
- [x] **Step 2: Add interaction safety.** Use a launcher button with `aria-expanded` and `aria-controls`, a labelled dialog/bottom sheet, Escape and Close behavior, initial focus inside and return focus to launcher, focus containment, background scroll lock, and no submission on close. Respect `useExperience().enabled` for reduced transitions.
- [x] **Step 3: Connect delivery and recovery.** On review, serialize once and post. Disable repeat sends while pending. Treat HTTP success as `Request received`; retain the draft on failure and offer retry plus copy brief. Never promise that storage and email both succeeded. Do not solve the visitor's issue in the scripted guidance.
- [x] **Step 3a: Align existing language.** Use “enquiry” in the general form, page metadata, internal notification subject/body, and route validation error. Keep the database `bottleneck` field and published Resend auto-reply template unchanged.
- [x] **Step 4: Style and verify.** Add fixed desktop panel and mobile bottom sheet using existing slate/amber tokens; avoid covering video controls and main CTA. Run serializer test, existing `scripts/test-intake.mjs`, `npm run typecheck`, and `npm run build`. Inspect mobile/desktop, keyboard, Escape/focus, reduced motion, and both intake paths. A live delivery test requires the existing user authorization and must be clearly labelled.
- [x] **Step 5: Commit.** `git add app/components/guided-intake.tsx app/components/intake-form.tsx app/page.tsx app/globals.css app/layout.tsx app/api/intake/route.ts docs/superpowers/plans/2026-09-29-broader-services-guided-intake.md` then `git commit -m "Add guided enquiry experience"`.
