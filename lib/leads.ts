import { business } from "@/lib/business";

export const LEAD_SOURCES = ["quote-form", "contact-form", "commercial-form", "chat"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export interface Lead {
  name: string;
  phone: string;
  source: LeadSource;
  email?: string;
  projectType?: string;
  message?: string;
  company?: string;
}

const OPTIONAL_FIELDS = ["email", "projectType", "message", "company"] as const;
const MAX_FIELD_LENGTH = 2000;

export function validateLead(input: unknown): { lead: Lead } | { errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (typeof input !== "object" || input === null) {
    return { errors: { body: "Invalid request body" } };
  }
  const raw = input as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  if (!name) errors.name = "Name is required";
  else if (name.length > 200) errors.name = "Name is too long";

  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) errors.phone = "A valid phone number is required";

  const source = typeof raw.source === "string" ? raw.source : "";
  if (!(LEAD_SOURCES as readonly string[]).includes(source)) errors.source = "Unknown lead source";

  if (Object.keys(errors).length > 0) return { errors };

  const lead: Lead = { name, phone, source: source as LeadSource };
  for (const field of OPTIONAL_FIELDS) {
    const value = raw[field];
    if (typeof value === "string" && value.trim()) {
      lead[field] = value.trim().slice(0, MAX_FIELD_LENGTH);
    }
  }
  return { lead };
}

export function formatLeadEmail(lead: Lead): { subject: string; text: string } {
  const project = lead.projectType ?? "New Project";
  const subject = `New Lead: ${project} — ${lead.name} (${lead.phone})`;
  const lines = [
    `New lead from the ${business.name} website`,
    ``,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    ...(lead.email ? [`Email: ${lead.email}`] : []),
    ...(lead.company ? [`Company: ${lead.company}`] : []),
    ...(lead.projectType ? [`Project type: ${lead.projectType}`] : []),
    ...(lead.message ? [``, `Message:`, lead.message] : []),
    ``,
    `Source: ${lead.source}`,
  ];
  return { subject, text: lines.join("\n") };
}

const DEFAULT_TO = business.email;
const DEFAULT_FROM = "Paver World Website <onboarding@resend.dev>";

export async function sendLead(
  lead: Lead,
  env: Record<string, string | undefined> = process.env
): Promise<{ delivered: boolean }> {
  const apiKey = env.RESEND_API_KEY;
  const { subject, text } = formatLeadEmail(lead);
  if (!apiKey) {
    console.log(`[lead:not-delivered] ${subject}\n${text}`);
    return { delivered: false };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL || DEFAULT_FROM,
        to: [env.LEAD_TO_EMAIL || DEFAULT_TO],
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[lead:resend-error] status=${res.status} ${subject}\n${text}`);
      return { delivered: false };
    }
    return { delivered: true };
  } catch (error) {
    console.error(`[lead:resend-error] ${String(error)} ${subject}\n${text}`);
    return { delivered: false };
  }
}
