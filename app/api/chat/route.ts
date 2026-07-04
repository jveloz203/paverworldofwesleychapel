import { getAIConfig, callAI } from "@/lib/ai";
import { validateChatBody, extractLeadMarker, checkRateLimit, trimToUserStart } from "@/lib/chat";
import { fallbackReply } from "@/lib/fallback-chat";
import { sendLead } from "@/lib/leads";
import { business } from "@/lib/business";

function clientKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request): Promise<Response> {
  if (!checkRateLimit(clientKey(request))) {
    return Response.json(
      { error: `Too many messages — please call ${business.phone.display}.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = validateChatBody(body);
  if (!messages) {
    return Response.json({ error: "Invalid messages" }, { status: 400 });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")!.content;

  const config = getAIConfig();
  if (!config) {
    return Response.json({ reply: fallbackReply(lastUserMessage), source: "fallback" });
  }

  try {
    const raw = await callAI(trimToUserStart(messages), config);
    const { text, lead } = extractLeadMarker(raw);
    if (lead) {
      // Awaited so serverless response freezes can't drop the send (sendLead never throws).
      await sendLead({ ...lead, source: "chat" });
    }
    return Response.json({ reply: text, source: "ai" });
  } catch (error) {
    console.error(`[chat:ai-error] ${String(error)}`);
    return Response.json({ reply: fallbackReply(lastUserMessage), source: "fallback" });
  }
}
