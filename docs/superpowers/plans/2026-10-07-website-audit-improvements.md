# Website Audit Improvements Implementation Plan

> Execution: inline in this session using the approved design. No push or deployment.

**Goal:** Make State of Ashes clearer and easier to enquire with, preserving its approved identity.

**Architecture:** Shared typed service content drives the six homepage cards, service index and static detail pages. Each card owns its accessible inline panel; the existing enquiry API remains unchanged. A shared page shell/contact/footer connects additional pages to the homepage.

**Tech Stack:** Existing Next.js App Router, React, Tailwind, Lucide, GSAP and Framer Motion; standard Node tests; existing image tooling.

## Global constraints

- Local isolated branch only. No push, deployment, production provider edits or outbound test messages.
- Preserve original logo/video, social preview and existing email integration.
- Use supplied owner details and established services. No invented claims or response promises.
- Keep keyboard focus, stable ARIA panel associations and reduced motion. No automatic scroll on service expansion.

## Task 1: Enquiry behavior

- [ ] Run the existing brief tests as a baseline.
- [ ] Extend `scripts/test-intake-brief.mjs` so timing values are accepted and duplicated topic values are rejected. Verify expected failure before changing `app/components/intake-brief.ts`.
- [ ] Use urgency values `Business currently affected`, `Within a few days`, `Planned project`, `Other / unsure`. Verify every choice is carried into `Urgency:` in the formatted message.
- [ ] Adjust `app/components/guided-intake.tsx`: projects/planning/other skip the redundant guidance page, keep meaningful progress numbering, personal-name/email semantics and direct contact fallback.
- [ ] Fix `app/components/intake-form.tsx` personal-name autocomplete and readable privacy/fallback links. Keep endpoint/payload unchanged.

## Task 2: Services and copy

- [ ] Add `app/content/services.ts` as the content source for titles, summaries, examples, scope, common situations and next steps. Use the audit's six service labels.
- [ ] Rewrite `app/components/architecture.tsx` with an inline panel per card, stable IDs, inert collapsed contents, one expanded card and a full-service-page link. Preserve scoped GSAP and unique illustrations.
- [ ] Apply approved wording in hero, ways-in, doctrine, blueprints and engagement. Keep illustrative labels; do not manufacture client cases.
- [ ] Add shared contact/footer and service-page shell components. Make header/home links work from both homepage and subpages.

## Task 3: New pages and search metadata

- [ ] Create `/services`, `/services/[slug]` with six static params, and `/privacy`.
- [ ] Each detail page explains actual situations, what is included and what happens next, with a route back to enquiry and related services. Unknown slugs return 404.
- [ ] Add canonical metadata per page, accurate Organisation JSON-LD on the homepage, `app/robots.ts` and `app/sitemap.ts`. Do not inherit the homepage canonical onto child routes.
- [ ] Verify sitemap URLs correspond to real successful routes; metadata title/description and canonical describe each service.

## Task 4: Responsive and asset improvements

- [ ] Add focused CSS for inline panels, 14–16px supporting text, readable location/helper/disclosure text, 44px controls, compact mobile spacing and editorial service pages.
- [ ] Generate lossless small logo derivatives and favicon from the supplied original, preserving its appearance; retain original media.
- [ ] Download/self-host the existing Google Font faces, preserving type choices and licences. Use local font loading without external CSS import.

## Task 5: Verification and handoff

- [ ] Run brief, video and autoreply tests; typecheck and production build.
- [ ] Start the isolated app on a free localhost port with production email/storage variables absent.
- [ ] Verify desktop/mobile inline panel positioning, keyboard collapse, enquiry timing and project shortcuts, contact links, responsive overflow and service routes. Test a local failed send without contacting providers.
- [ ] Run SlopMonster on rendered homepage/service/privacy copy, review false positives and factual meaning. Obtain its second family editing pass on the public copy as available.
- [ ] Run the Impeccable detector once and assess findings against the pinned brand.
- [ ] Save screenshots and a short local completion note; leave the branch ready for review without pushing or deploying.
