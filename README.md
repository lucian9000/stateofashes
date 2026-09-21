# State of Ashes

Single-page systems architecture studio built with Next.js App Router, React, Tailwind CSS, Lucide, GSAP and Framer Motion.

## Run
Use Node.js 20.9 or later. Run `npm ci`, then `npm run dev -- --port 3001`.

`npm run build` validates the production build. `npm start -- --port 3001` serves it. `npm run typecheck` checks TypeScript.

## Experience
The phoenix video leads the hero, with MP4/WebM sources and a static poster fallback. The exact supplied logo.png remains in the header, footer and favicon. The hero has no overlaid logo or separate film-viewing button.

Includes an interactive reconstruction lab, expandable capabilities, blueprint comparisons, contextual diagnostic intake, sticky navigation, GSAP motion, and Framer Motion feedback. Motion can be disabled; video pauses offscreen and when the page is hidden.

## Intake
The form posts to `/api/intake`, which saves the request to Supabase and emails a copy through Resend.

Run `supabase/intake_requests.sql` once in the Supabase SQL Editor to create `public.intake_requests`. Row level security is enabled with no policies, so only the service role key reaches it.

Copy `.env.example` to `.env.local` and set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` and `INTAKE_NOTIFY_EMAIL`. The same variables must be set in the Vercel project for production. Until a sending domain is verified in Resend, the default sender is `onboarding@resend.dev`, which only delivers to the Resend account owner's address; set `INTAKE_FROM_EMAIL` to a verified stateofashes.com address once the domain is added.

A request is accepted if it is either stored or emailed, so one failing channel does not lose a lead. Both failing returns HTTP 502 and the form offers a copyable diagnostic brief. Failures are logged to the Vercel runtime logs. Configure rate limiting at the hosting edge before public launch.

Run `node scripts/test-intake.mjs` with the unconfigured production app on port 3001. It tests validation, the unconfigured case, and storage and email against a local mock on port 3002. It temporarily starts an app instance and a mock server, then stops them.

## Assets and content
`public/logo.png` is the unmodified supplied logo. `public/phoenix.mp4` is the original supplied video, `phoenix.webm` is a compatibility encode, and `phoenix-poster.jpg` is an extracted still. Blueprint cards are illustrative concepts, not verified customer case studies.

Palette: #070709, #0F0F12, #EDECE7, #F59E0B, #EA580C. Type: Barlow Condensed, Manrope and IBM Plex Mono, with system fallbacks.

## Visitor acknowledgement
See [emails/README.md](emails/README.md) for the branded HTML template, Resend publishing steps, and the info@stateofashes.com delivery settings. Set `INTAKE_AUTOREPLY_TEMPLATE_ID` to enable acknowledgement after successful intake.
