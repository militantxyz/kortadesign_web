import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MailTransporter = ReturnType<typeof nodemailer.createTransport>;
type RateLimitBucket = {
  count: number;
  resetAt: number;
};
type TurnstileResult = {
  action?: string;
  "error-codes"?: string[];
  hostname?: string;
  success?: boolean;
};

let cachedTransporter: MailTransporter | null = null;
const rateLimitBuckets = new Map<string, RateLimitBucket>();

const formRateLimitMax = 8;
const formRateLimitWindowMs = 15 * 60 * 1000;
const turnstileVerifyUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function getEnv(name: string) {
  const value = process.env[name];
  return value?.trim() ? value.trim() : undefined;
}

function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const host = getEnv("SMTP_HOST");
  const portRaw = getEnv("SMTP_PORT");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");

  if (!host || !portRaw || !user || !pass) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS."
    );
  }

  const port = Number.parseInt(portRaw, 10);
  if (Number.isNaN(port)) {
    throw new Error("SMTP_PORT must be a valid number.");
  }

  const secure = getEnv("SMTP_SECURE")
    ? getEnv("SMTP_SECURE") === "true"
    : port === 465;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return cachedTransporter;
}

function toText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function prettifyFieldName(fieldName: string) {
  return fieldName
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildSubject(formType: string, product: string) {
  const byType: Record<string, string> = {
    quote: "Quote Request",
    contact: "Contact Request",
    join: "Career Form",
    newsletter: "Newsletter Signup",
  };

  const base = byType[formType] ?? "Website Form";
  return product ? `[KORTA] ${base} - ${product.toUpperCase()}` : `[KORTA] ${base}`;
}

function getSafeReferer(request: Request) {
  const referer = request.headers.get("referer");
  if (!referer) {
    return undefined;
  }

  try {
    const refererUrl = new URL(referer);
    return refererUrl.hostname === getRequestHostname(request)
      ? refererUrl
      : undefined;
  } catch {
    return undefined;
  }
}

function hasSafeSubmissionOrigin(request: Request) {
  const requestHostname = getRequestHostname(request);
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    try {
      if (new URL(origin).hostname !== requestHostname) {
        return false;
      }
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      if (new URL(referer).hostname !== requestHostname) {
        return false;
      }
    } catch {
      return false;
    }
  }

  return true;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function getRequestHostname(request: Request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  return (
    host?.split(",")[0]?.trim().split(":")[0] ?? new URL(request.url).hostname
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const currentBucket = rateLimitBuckets.get(key);

  if (!currentBucket || currentBucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + formRateLimitWindowMs,
    });
    return false;
  }

  currentBucket.count += 1;
  return currentBucket.count > formRateLimitMax;
}

function toTurnstileAction(formType: string) {
  const action = formType.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 32);
  return action || "general";
}

async function verifyTurnstile(
  request: Request,
  formData: FormData,
  formType: string,
  ip: string
) {
  const secret = getEnv("TURNSTILE_SECRET_KEY");
  if (!secret) {
    return true;
  }

  const token = toText(formData.get("cf-turnstile-response"));
  if (!token) {
    return false;
  }

  try {
    const payload: Record<string, string> = {
      response: token,
      secret,
    };
    if (ip !== "unknown") {
      payload.remoteip = ip;
    }

    const response = await fetch(turnstileVerifyUrl, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = (await response.json()) as TurnstileResult;

    if (!response.ok || !result.success) {
      console.warn("Turnstile verification failed:", result["error-codes"]);
      return false;
    }

    const requestHostname = getRequestHostname(request);
    if (result.hostname && result.hostname !== requestHostname) {
      console.warn("Turnstile hostname mismatch:", result.hostname);
      return false;
    }

    const expectedAction = toTurnstileAction(formType);
    if (result.action && result.action !== expectedAction) {
      console.warn("Turnstile action mismatch:", result.action);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

function respondWithStatus(
  request: Request,
  status: "success" | "error",
  message: string,
  code: number
) {
  const headers = {
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  };

  const refererUrl = getSafeReferer(request);
  if (refererUrl) {
    refererUrl.searchParams.set("formStatus", status);
    return NextResponse.redirect(refererUrl, { status: 303, headers });
  }

  return NextResponse.json(
    { ok: status === "success", message },
    { status: code, headers }
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Honeypot: silently accept bot submissions but do not send mail.
    if (toText(formData.get("website"))) {
      return respondWithStatus(request, "success", "Submitted.", 200);
    }

    const formType = toText(formData.get("form-type")) || "general";
    const product = toText(formData.get("product"));
    const ip = getClientIp(request);

    if (!hasSafeSubmissionOrigin(request)) {
      return respondWithStatus(
        request,
        "error",
        "Invalid form submission.",
        403
      );
    }

    if (isRateLimited(`${ip}:${formType}`)) {
      return respondWithStatus(
        request,
        "error",
        "Too many submissions. Please try again later.",
        429
      );
    }

    const hasVerifiedChallenge = await verifyTurnstile(
      request,
      formData,
      formType,
      ip
    );
    if (!hasVerifiedChallenge) {
      return respondWithStatus(
        request,
        "error",
        "Verification failed. Please try again.",
        400
      );
    }

    const hiddenKeys = new Set([
      "cf-turnstile-response",
      "website",
      "form-type",
      "product",
    ]);
    const fields = new Map<string, string[]>();

    for (const [key, rawValue] of formData.entries()) {
      if (hiddenKeys.has(key) || typeof rawValue !== "string") {
        continue;
      }

      const value = rawValue.trim();
      if (!value) {
        continue;
      }

      const existingValues = fields.get(key) ?? [];
      existingValues.push(value);
      fields.set(key, existingValues);
    }

    if (!fields.size) {
      return respondWithStatus(
        request,
        "error",
        "No form values were provided.",
        400
      );
    }

    const senderEmail = fields.get("email")?.[0];
    const fromAddress = getEnv("SMTP_FROM") ?? getEnv("SMTP_USER");
    const destinationAddress = getEnv("FORMS_TO") ?? "info@kortadesign.com";

    if (!fromAddress) {
      throw new Error("Missing SMTP_FROM or SMTP_USER value.");
    }

    const userAgent = request.headers.get("user-agent") ?? "unknown";

    const textLines: string[] = [
      `Form Type: ${formType}`,
      product ? `Product: ${product}` : "",
      `Submitted: ${new Date().toISOString()}`,
      "",
    ];

    for (const [key, values] of fields) {
      textLines.push(`${prettifyFieldName(key)}: ${values.join(", ")}`);
    }

    textLines.push("", `IP: ${ip}`, `User Agent: ${userAgent}`);
    const text = textLines.filter(Boolean).join("\n");
    const html = `<pre style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;white-space:pre-wrap">${escapeHtml(
      text
    )}</pre>`;

    const transporter = getTransporter();
    await transporter.verify();

    await transporter.sendMail({
      from: fromAddress,
      to: destinationAddress,
      subject: buildSubject(formType, product),
      text,
      html,
      ...(senderEmail ? { replyTo: senderEmail } : {}),
    });

    return respondWithStatus(request, "success", "Submitted.", 200);
  } catch (error) {
    console.error("Form submission failed:", error);
    return respondWithStatus(
      request,
      "error",
      "Unable to send form right now.",
      500
    );
  }
}
