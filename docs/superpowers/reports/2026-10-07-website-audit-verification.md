# Website audit changes — local verification

Implemented in `C:/Projects/StateOfAshes/worktrees/website-audit-improvements`, branch `feat/website-audit-improvements`, based on main commit `80a8106b01859c2f8ebe7ae346b8aba00c468854`.

No push, deployment, provider setting change or live email was sent. The primary checkout still has only its pre-existing README/email work. Its HEAD is unchanged.

## Implemented

- Plain business IT wording across the hero, services, approach and illustrative examples. The six services remain broad, including AI architecture and vCIO.
- One service disclosure at a time, inside its own card, with permanent control IDs and inert closed content. Removed the automatic mobile scroll jump. Preserved the six original distinct illustrations and their micro animations.
- Timing-based urgency choices. Projects, planning and general enquiries go straight to details; outages/security retain useful escalation guidance. Back/edit navigation retains answers.
- Larger mobile text and controls, a corrected 320px headline fit, and clearer direct contact/privacy links. Name autocomplete is now for a person.
- Service directory and six individual service pages, enquiry privacy page, robots.txt, a nine-URL sitemap, individual canonical URLs and accurate Organization metadata.
- Local Manrope, Barlow Condensed and IBM Plex Mono font files and licences. Small derivatives of the exact original logo for navigation, favicon and Apple icon. Original logo, social image and phoenix videos retained.
- Next.js route transitions correctly identify the existing smooth-scroll setting, avoiding an animated trip through the previous scroll position.

## Validation

- Final production build: passed, including TypeScript and static generation of all service pages.
- Guided brief tests: passed. Regression first failed against topic-based urgency choices, then passed with the timing choices. Input-length and labelled-field injection checks passed.
- Video playback tests: passed, covering readiness, already-playing video, blocked autoplay/reduced motion fallback, decode errors and cleanup.
- Intake integration tests: passed on isolated local ports, with local Supabase/Resend mocks. Validation, foreign-origin requests, total failure and partial failure behaved as expected.
- Acknowledgment tests: passed with mocked delivery, preserving published-template ID, recipients and reply routing.
- HTTP checks: all nine pages returned 200 with their correct canonical URL. robots.txt and sitemap.xml returned valid expected content; an unknown service returned 404.
- Browser checks: desktop and 390px mobile layouts, plus the 320px headline fit. No horizontal overflow. Video played on first load. Service details stayed inside their card; closed panels were inert. Project enquiries skipped the redundant step, review/back retained data, urgent security guidance remained, and failed local delivery retained the brief with an email fallback. Service and privacy page navigation worked.
- Diff whitespace check: passed.

## Copy review and exceptions

SlopMonster's independent Claude pass completed. Selected suggestions removed repetition in the approach, service introduction, example and engagement wording. The owner's stated experience across multiple environments was retained as a supplied fact. Safety guidance beside the form was retained because people can arrive directly at that form.

Final checker scores: homepage 4/5, combined service pages 3/5, privacy 5/5. Remaining matches are concrete three-item service/safety lists. The service-page “can help you” match crosses the heading “When this can help” into a following “You…” list item. These were reviewed as valid copy rather than removed to improve a regex score.

Impeccable's static scan retained one pre-existing guidance accent-border warning and two advisory grid-background findings. These are intentional parts of the approved clinical/blueprint design. This is not a Lighthouse or WCAG certification.

## Preview and limits

Preview: http://127.0.0.1:3005/ (production build, bound to loopback only).

The preview has no production mail/storage credentials. Its form deliberately cannot deliver enquiries. Delivery behavior was verified with mocks; no real recipient received a test. No search indexing/ranking claim is made. Client concepts remain explicitly illustrative; no fabricated testimonials, outcomes, metrics or response commitments were added.

Screenshots and machine-readable results are in this audit folder. A 320px measurement confirmed the final headline's right edge is inside the hero boundary.

## Release preparation — 8 October 2026

User approved publication. Removed the repeated concept note, footer location label, and public phone contact details. Fresh production build, 26 enquiry/video checks and five HTTP route checks passed. Production delivery variables remain managed in Vercel; no live enquiry was sent.
