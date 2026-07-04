import type { ChatMessage } from "@/lib/ai";

export interface ChatLead {
  name: string;
  phone: string;
  projectType?: string;
}

const LEAD_MARKER = /\[LEAD\]([\s\S]*?)\[\/LEAD\]/;
const LEAD_MARKER_GLOBAL = /\[LEAD\]([\s\S]*?)\[\/LEAD\]/g;

export function extractLeadMarker(raw: string): { text: string; lead: ChatLead | null } {
  const match = raw.match(LEAD_MARKER);
  const text = raw.replace(LEAD_MARKER_GLOBAL, "").trim();
  if (!match) return { text, lead: null };
  try {
    const parsed = JSON.parse(match[1]) as Record<string, unknown>;
    if (typeof parsed.name === "string" && parsed.name.trim() && typeof parsed.phone === "string" && parsed.phone.trim()) {
      return {
        text,
        lead: {
          name: parsed.name.trim(),
          phone: parsed.phone.trim(),
          ...(typeof parsed.projectType === "string" && parsed.projectType.trim()
            ? { projectType: parsed.projectType.trim() }
            : {}),
        },
      };
    }
  } catch {
    // malformed JSON: fall through — marker already stripped from text
  }
  return { text, lead: null };
}

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;

export function validateChatBody(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null;
  }
  const valid: ChatMessage[] = [];
  for (const m of messages) {
    if (typeof m !== "object" || m === null) return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.length === 0 || content.length > MAX_CONTENT_LENGTH) {
      return null;
    }
    valid.push({ role, content });
  }
  if (!valid.some((m) => m.role === "user")) return null;
  return valid;
}

export function trimToUserStart(messages: ChatMessage[]): ChatMessage[] {
  return messages.slice(messages.findIndex((m) => m.role === "user"));
}

const buckets = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number; now?: number } = {}
): boolean {
  const { limit = 20, windowMs = 5 * 60_000, now = Date.now() } = opts;
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}
