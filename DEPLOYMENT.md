# Deployment

Deploy the repository root as a Next.js app on a Node.js-capable hosting service (Node.js 20.9 or later). Install with `npm ci`, build with `npm run build`, and serve with `npm start`. The intake route requires a server runtime; do not deploy as a static export.

Set `INTAKE_WEBHOOK_URL` and optionally `INTAKE_WEBHOOK_TOKEN` in the hosting provider's environment settings to enable diagnostic delivery. Use HTTPS for the site and its webhook destination. No secrets belong in this repository. Without a webhook the form explicitly reports that nothing was sent.

The original site's setup and customization guides are archived under `docs/legacy` for historical reference; use the root README and current App Router files for this version.
