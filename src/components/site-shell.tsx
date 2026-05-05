import { FloatingContact } from "@/components/korta/floating-contact";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";

export function SiteShell({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebSiteJsonLd(locale);

  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
      <FloatingContact locale={locale} />
    </>
  );
}
