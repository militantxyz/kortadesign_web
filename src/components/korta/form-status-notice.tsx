"use client";

import { useSearchParams } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type FormStatusNoticeProps = {
  locale: Locale;
};

export function FormStatusNotice({ locale }: FormStatusNoticeProps) {
  const searchParams = useSearchParams();
  const status = searchParams.get("formStatus");
  const reason = searchParams.get("formReason");

  if (status !== "success" && status !== "error") {
    return null;
  }

  const copy =
    locale === "hr"
      ? {
          error: "Poruku trenutno nije moguce poslati. Pokusajte ponovno ili nam pisite izravno.",
          errorPrefix: "Sifra greske",
          smtp: "Provjera je prosla, ali email servis nije poslao poruku.",
          turnstile:
            "Cloudflare provjera nije prosla na serveru. Osvjezite stranicu i pokusajte ponovno.",
          success: "Poruka je poslana. Javit cemo vam se uskoro.",
        }
      : {
          error: "We could not send the message right now. Please try again or email us directly.",
          errorPrefix: "Error code",
          smtp: "Verification passed, but the email service could not send the message.",
          turnstile:
            "Cloudflare verification failed on the server. Refresh the page and try again.",
          success: "Your message was sent. We will reply soon.",
        };

  const isSuccess = status === "success";
  const isTurnstileReason =
    reason === "verification" || reason?.startsWith("turnstile-");
  const message =
    reason === "smtp" || reason === "config"
      ? copy.smtp
      : isTurnstileReason
        ? copy.turnstile
        : copy.error;

  return (
    <p
      className={`border px-4 py-3 text-sm leading-6 ${
        isSuccess
          ? "border-[#8f6747]/30 bg-white/70 text-[#151411]"
          : "border-red-900/20 bg-red-50 text-red-950"
      }`}
      role="status"
    >
      {isSuccess ? copy.success : message}
      {!isSuccess && reason ? (
        <span className="mt-2 block text-xs uppercase tracking-[0.14em] opacity-70">
          {copy.errorPrefix}: {reason}
        </span>
      ) : null}
    </p>
  );
}
