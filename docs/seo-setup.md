# SEO Setup Notes

## Verification Tokens

Set these environment variables to output verification meta tags automatically:

- `GOOGLE_SITE_VERIFICATION` (or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
- `BING_SITE_VERIFICATION` (or `NEXT_PUBLIC_BING_SITE_VERIFICATION`)

## Search Console Checklist

1. Open Google Search Console and verify the `https://kortadesign.com` property.
2. Submit `https://kortadesign.com/sitemap.xml`.
3. Inspect key URLs (`/`, `/collections`, `/projects`, `/blog`) and request indexing if needed.

## AI Crawler Discovery

- `robots.txt` now includes explicit rules for major AI crawlers.
- `llms.txt` is available at `https://kortadesign.com/llms.txt`.
