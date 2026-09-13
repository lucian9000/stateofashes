# State of Ashes

Single-page systems architecture studio built with Next.js App Router, React, Tailwind CSS, Lucide, GSAP and Framer Motion.

## Run
Use Node.js 20.9 or later. Run `npm ci`, then `npm run dev -- --port 3001`.

`npm run build` validates the production build. `npm start -- --port 3001` serves it. `npm run typecheck` checks TypeScript.

## Experience
The phoenix video leads the hero, with MP4/WebM sources and a static poster fallback. The exact supplied logo.png remains in the header, footer and favicon. The hero has no overlaid logo or separate film-viewing button.

Includes an interactive reconstruction lab, expandable capabilities, blueprint comparisons, contextual diagnostic intake, sticky navigation, GSAP motion, and Framer Motion feedback. Motion can be disabled; video pauses offscreen and when the page is hidden.

## Intake
Copy `.env.example` to `.env.local`, set `INTAKE_WEBHOOK_URL` and optionally `INTAKE_WEBHOOK_TOKEN`, and restart. The endpoint receives name, email, bottleneck, source, and submittedAt as JSON. Use an HTTPS destination with delivery acknowledgment. Without a destination the API returns HTTP 503 and explicitly reports that nothing was sent. No requests are stored locally. Failed delivery offers a copyable diagnostic brief. Configure rate limiting at the hosting edge before public launch.

Run `node scripts/test-intake.mjs` with the unconfigured production app on port 3001. It tests validation, missing configuration, and mock delivery. It temporarily starts an app instance on port 3002 and a local webhook, then stops them.

## Assets and content
`public/logo.png` is the unmodified supplied logo. `public/phoenix.mp4` is the original supplied video, `phoenix.webm` is a compatibility encode, and `phoenix-poster.jpg` is an extracted still. Blueprint cards are illustrative concepts, not verified customer case studies.

Palette: #070709, #0F0F12, #EDECE7, #F59E0B, #EA580C. Type: Barlow Condensed, Manrope and IBM Plex Mono, with system fallbacks.
