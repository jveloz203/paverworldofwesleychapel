import { validateLead, sendLead } from "@/lib/leads";

export async function POST(request: Request): Promise<Response> {
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
