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

It also includes a basic honeypot anti-spam field (`website`).
