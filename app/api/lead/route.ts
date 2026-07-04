import { validateLead, sendLead } from "@/lib/leads";
import { checkRateLimit } from "@/lib/chat";
import { business } from "@/lib/business";

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request): Promise<Response> {
  if (!checkRateLimit(`lead:${clientKey(request)}`)) {
    return Response.json(
      { ok: false, errors: { rate: `Too many requests — please call ${business.phone.display}.` } },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { body: "Invalid JSON" } }, { status: 400 });
  }

  const result = validateLead(body);
  if ("errors" in result) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const { delivered } = await sendLead(result.lead);
  return Response.json({ ok: true, delivered });
}
