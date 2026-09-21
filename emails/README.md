# Diagnostic acknowledgement

Import `diagnostic-received.html` into Resend Templates using the HTML/code editor. It uses the exact public phoenix logo and the site's Manrope, Barlow Condensed and IBM Plex Mono fonts, with Arial/Courier fallbacks for clients that block web fonts. The layout uses tables and inline styling; email apps may still adjust colors in dark mode. `diagnostic-received.txt` is a plain-text reference.

## Resend template

- Name/alias: `diagnostic-received`
- Subject: `Your diagnostic request is received — State of Ashes`
- From: `State of Ashes <info@stateofashes.com>`
- Reply-To: `info@stateofashes.com`
- Variables: none required.
- Import the HTML, preview desktop/mobile, and publish the template.

## Vercel production environment

Set these in the existing State of Ashes project and redeploy:

```dotenv
INTAKE_NOTIFY_EMAIL=info@stateofashes.com
INTAKE_FROM_EMAIL=State of Ashes <info@stateofashes.com>
INTAKE_AUTOREPLY_TEMPLATE_ID=743ad5e9-3c24-4a46-b628-e6c6b1940368
```

Use the published template's actual ID or alias for the last value. Keep the existing `RESEND_API_KEY` and Supabase settings. The route sends the visitor acknowledgement only when `INTAKE_AUTOREPLY_TEMPLATE_ID` is set. Publishing a template alone does not trigger emails.

The internal notification goes TO info@stateofashes.com with Reply-To set to the visitor. The acknowledgement goes TO the visitor's submitted address with From and Reply-To set to info@stateofashes.com. The request must first have been saved in Supabase or accepted by Resend for internal notification. If the acknowledgement fails, the received lead remains accepted; the failure is logged. There is no durable acknowledgement retry queue in this change.

## Self-hosted mailbox

Verify stateofashes.com for outbound sending in Resend before enabling this template. Keep the domain's incoming MX records pointing at your self-hosted mail server. Use Resend's specified sending DNS records (including its separate return-path subdomain); do not replace your mailbox MX with Resend inbound receiving records. Check existing SPF/DKIM/DMARC alongside Resend's domain instructions, rather than adding a second SPF record at the same hostname.

The recipient change is in Vercel's INTAKE_NOTIFY_EMAIL, not a global Resend recipient setting. Your mailbox stays hosted on your mail server; Resend delivers the automated outgoing messages.

## Verification

`node scripts/test-autoreply.mjs` exercises the route with mocked storage and email endpoints; it sends no real email. After publishing and setting the production variables, make one real form submission using an inbox you control and confirm both the notification and acknowledgement arrive, then reply to the acknowledgement to check mailbox delivery.

References: https://resend.com/docs/api-reference/emails/send-email and https://resend.com/docs/dashboard/domains/introduction
