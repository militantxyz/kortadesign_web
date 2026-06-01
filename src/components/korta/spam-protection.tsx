import Script from "next/script";

import { cn } from "@/lib/utils";

type SpamProtectionProps = {
  action: "contact" | "join" | "newsletter" | "quote";
  className?: string;
  size?: "compact" | "flexible";
  theme?: "dark" | "light";
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function SpamProtection({
  action,
  className,
  size = "flexible",
  theme = "light",
}: SpamProtectionProps) {
  return (
    <>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />
      {turnstileSiteKey ? (
        <>
          <Script
            id="cloudflare-turnstile"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className={cn(
              "mt-2 max-w-full",
              size === "compact" ? "min-h-[140px]" : "min-h-[65px]",
              className
            )}
          >
            <div
              className="cf-turnstile"
              data-action={action}
              data-language="auto"
              data-sitekey={turnstileSiteKey}
              data-size={size}
              data-theme={theme}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
