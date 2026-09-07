import "server-only";

import nodemailer, { type Transporter } from "nodemailer";
import { business } from "@/lib/content";

/**
 * Gmail SMTP for quote enquiries.
 *
 * Gmail will not accept an account password over SMTP: the account needs
 * 2-Step Verification switched on and a 16-character **App Password**
 * generated for it (Google Account → Security → 2-Step Verification → App
 * passwords). That value goes in SMTP_PASSWORD, never in the repo — `.env*`
 * is gitignored. See `.env.example`.
 *
 * Gmail also caps a free account at roughly 500 recipients a day and rewrites
 * the From header to the authenticated account, so this sends *as* the
 * mailbox and puts the customer in Reply-To. Hitting reply in the inbox then
 * writes to the customer, which is the whole point of the notification.
 */

export class MailNotConfiguredError extends Error {
  constructor(missing: string[]) {
    super(`Mail is not configured. Missing: ${missing.join(", ")}`);
    this.name = "MailNotConfiguredError";
  }
}

function readConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const missing: string[] = [];
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASSWORD");
  if (missing.length) throw new MailNotConfiguredError(missing);

  return {
    user: user as string,
    pass: pass as string,
    // Where enquiries land. Defaults to the address the site already
    // advertises, so there is one place to change it.
    inbox: process.env.QUOTE_INBOX?.trim() || business.email,
  };
}

/**
 * One transporter for the process, built on first use rather than at import.
 * Building it at import would throw during `next build`, where the secrets are
 * legitimately absent, and would make the module impossible to load in any
 * environment that only renders the marketing pages.
 */
let cached: Transporter | undefined;

function transporter(user: string, pass: string) {
  cached ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // implicit TLS; 587 + STARTTLS also works if 465 is blocked
    auth: { user, pass },
  });
  return cached;
}

export type QuoteEnquiry = {
  reference: string;
  service: string;
  bedrooms: string;
  bathrooms: string;
  pets: string;
  extras: string;
  address: string;
  city: string;
  schedule: string;
  date: string;
  timeSlot: string;
  access: string;
  name: string;
  email: string;
  phone: string;
};

const LABELS: Array<[keyof QuoteEnquiry, string]> = [
  ["service", "Service"],
  ["bedrooms", "Bedrooms"],
  ["bathrooms", "Bathrooms"],
  ["pets", "Pets"],
  ["extras", "Extras"],
  ["address", "Address"],
  ["city", "Service area"],
  ["schedule", "Schedule"],
  ["date", "Preferred date"],
  ["timeSlot", "Preferred time"],
  ["access", "Access notes"],
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
];

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Header injection guard. A newline in a header value can append arbitrary
 * headers, and `name` and `email` come straight off a public form, so anything
 * that reaches a header is stripped of CR/LF first.
 */
const headerSafe = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendQuoteEnquiry(enquiry: QuoteEnquiry) {
  const { user, pass, inbox } = readConfig();

  const rows = LABELS.filter(([key]) => enquiry[key]);

  const text = [
    `New quote request — ${enquiry.reference}`,
    "",
    ...rows.map(([key, label]) => `${label}: ${enquiry[key]}`),
    "",
    `Reply to this email to answer ${enquiry.name} directly.`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1a1710;line-height:1.5">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b6153">New quote request</p>
      <h1 style="margin:0 0 20px;font-size:20px">${escapeHtml(enquiry.reference)}</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([key, label]) => `<tr>
          <td style="padding:8px 16px 8px 0;border-bottom:1px solid #e3d8c6;color:#6b6153;white-space:nowrap;vertical-align:top">${label}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e3d8c6;vertical-align:top">${escapeHtml(enquiry[key])}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;color:#6b6153;font-size:14px">Reply to this email to answer ${escapeHtml(enquiry.name)} directly.</p>
    </div>`;

  await transporter(user, pass).sendMail({
    from: `"${business.name} website" <${user}>`,
    to: inbox,
    replyTo: `"${headerSafe(enquiry.name)}" <${headerSafe(enquiry.email)}>`,
    subject: headerSafe(
      `Quote request — ${enquiry.service}, ${enquiry.city} — ${enquiry.name} (${enquiry.reference})`,
    ),
    text,
    html,
  });
}

/** Proves the credentials and the connection without sending anything. */
export async function verifyMailConnection() {
  const { user, pass } = readConfig();
  await transporter(user, pass).verify();
}
