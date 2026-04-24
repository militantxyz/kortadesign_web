import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let cachedTransporter: nodemailer.Transporter | null = null;

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
    const requestUrl = new URL(request.url);
    return refererUrl.origin === requestUrl.origin ? refererUrl : undefined;
  } catch {
    return undefined;
  }
}

function respondWithStatus(
  request: Request,
  status: "success" | "error",
  message: string,
  code: number
) {
  const refererUrl = getSafeReferer(request);
  if (refererUrl) {
    refererUrl.searchParams.set("formStatus", status);
    return NextResponse.redirect(refererUrl, { status: 303 });
  }

  return NextResponse.json({ ok: status === "success", message }, { status: code });
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

    const hiddenKeys = new Set(["website", "form-type", "product"]);
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

    const ip =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ?? "unknown";
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
