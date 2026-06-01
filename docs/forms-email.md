# Forms Email Setup (cPanel SMTP)

Create a local environment file named `.env.local` in the project root:

```bash
SMTP_HOST=mail.kortadesign.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@kortadesign.com
SMTP_PASS=YOUR_MAILBOX_PASSWORD
SMTP_FROM="KORTA Website <info@kortadesign.com>"
FORMS_TO=info@kortadesign.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY=YOUR_CLOUDFLARE_TURNSTILE_SECRET_KEY
```

## Values you need from cPanel

- Outgoing SMTP host (usually `mail.kortadesign.com` or your server hostname)
- SMTP port (`465` SSL or `587` TLS)
- SMTP encryption mode (SSL/TLS)
- Mailbox username (`info@kortadesign.com`)
- Mailbox password (or app password, if available)

## Route used by forms

- `POST /api/forms`

The route forwards submissions from:

- Contact form
- Join form
- Product quote forms
- Footer newsletter form

## Spam protection

Every form includes a hidden honeypot field (`korta-url`). The API route also blocks cross-site submissions and rate-limits repeated submissions from the same IP address.

For stronger CAPTCHA-style protection, create a Cloudflare Turnstile widget and add both Turnstile keys to the environment:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` renders the Turnstile widget in forms. Because it is public, set it before building the site.
- `TURNSTILE_SECRET_KEY` is used only by the server to verify `cf-turnstile-response` before any email is sent.

If `TURNSTILE_SECRET_KEY` is missing, forms still work with the honeypot and rate limit layers. Once the secret is configured, submissions without a valid Turnstile token are rejected.
