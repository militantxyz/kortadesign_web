"use client";

import { useSearchParams } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type FormStatusNoticeProps = {
  locale: Locale;
};

export function FormStatusNotice({ locale }: FormStatusNoticeProps) {
  const searchParams = useSearchParams();
  const status = searchParams.get("formStatus");

  if (status !== "success" && status !== "error") {
    return null;
  }

  const copy =
    locale === "hr"
      ? {
          error: "Poruku trenutno nije moguce poslati. Pokusajte ponovno ili nam pisite izravno.",
          success: "Poruka je poslana. Javit cemo vam se uskoro.",
        }
      : {
          error: "We could not send the message right now. Please try again or email us directly.",
          success: "Your message was sent. We will reply soon.",
        };

  const isSuccess = status === "success";

  return (
    <p
      className={`border px-4 py-3 text-sm leading-6 ${
        isSuccess
          ? "border-[#8f6747]/30 bg-white/70 text-[#151411]"
          : "border-red-900/20 bg-red-50 text-red-950"
      }`}
      role="status"
    >
      {isSuccess ? copy.success : copy.error}
    </p>
  );
}
