import { describe, it, expect } from "vitest";
import { extractLeadMarker, validateChatBody, checkRateLimit, trimToUserStart } from "@/lib/chat";
import type { ChatMessage } from "@/lib/ai";

describe("extractLeadMarker", () => {
  it("extracts a lead and strips the marker from the text", () => {
    const raw = `Thanks Maria! We'll call you shortly.\n[LEAD]{"name":"Maria Lopez","phone":"813-555-0142","projectType":"pool deck"}[/LEAD]`;
    const { text, lead } = extractLeadMarker(raw);
    expect(text).toBe("Thanks Maria! We'll call you shortly.");
    expect(lead).toEqual({ name: "Maria Lopez", phone: "813-555-0142", projectType: "pool deck" });
  });

  it("strips every [LEAD] marker globally, parsing the lead from the first", () => {
    const raw = `Thanks!\n[LEAD]{"name":"Maria Lopez","phone":"813-555-0142"}[/LEAD]\nAnd again:\n[LEAD]{"name":"Second Person","phone":"999-999-9999"}[/LEAD]`;
    const { text, lead } = extractLeadMarker(raw);
    expect(text).not.toContain("[LEAD]");
    expect(text).not.toContain("[/LEAD]");
    expect(text).not.toContain("Second Person");
    expect(lead).toEqual({ name: "Maria Lopez", phone: "813-555-0142" });
  });

  it("returns null lead when there is no marker", () => {
    const { text, lead } = extractLeadMarker("Just a normal reply.");
    expect(text).toBe("Just a normal reply.");
    expect(lead).toBeNull();
  });

  it("strips a malformed marker but returns null lead", () => {
    const { text, lead } = extractLeadMarker("Reply.\n[LEAD]{not json}[/LEAD]");
    expect(text).toBe("Reply.");
    expect(lead).toBeNull();
  });

  it("requires name and phone in the marker", () => {
    const { lead } = extractLeadMarker(`Ok\n[LEAD]{"name":"Bob"}[/LEAD]`);
    expect(lead).toBeNull();
  });
});

describe("validateChatBody", () => {
  it("accepts a valid message list", () => {
    const messages = validateChatBody({
      messages: [
        { role: "assistant", content: "Hi!" },
        { role: "user", content: "Do you do driveways?" },
      ],
    });
    expect(messages).toHaveLength(2);
  });

  it("rejects non-object bodies, missing/empty lists, and lists with no user message", () => {
    expect(validateChatBody(null)).toBeNull();
    expect(validateChatBody({})).toBeNull();
    expect(validateChatBody({ messages: [] })).toBeNull();
    expect(validateChatBody({ messages: [{ role: "assistant", content: "hi" }] })).toBeNull();
  });

  it("rejects bad roles, non-string content, oversized content, and >20 messages", () => {
    expect(validateChatBody({ messages: [{ role: "system", content: "x" }] })).toBeNull();
    expect(validateChatBody({ messages: [{ role: "user", content: 5 }] })).toBeNull();
    expect(
      validateChatBody({ messages: [{ role: "user", content: "x".repeat(2001) }] })
    ).toBeNull();
    const tooMany = Array.from({ length: 21 }, () => ({ role: "user", content: "hi" }));
    expect(validateChatBody({ messages: tooMany })).toBeNull();
  });
});

describe("trimToUserStart", () => {
  it("drops leading assistant messages so the first message is the first user message", () => {
    const messages: ChatMessage[] = [
      { role: "assistant", content: "Hi! Welcome." },
      { role: "assistant", content: "How can I help?" },
      { role: "user", content: "Do you do driveways?" },
      { role: "assistant", content: "Yes we do." },
    ];
    const trimmed = trimToUserStart(messages);
    expect(trimmed[0]).toEqual({ role: "user", content: "Do you do driveways?" });
    expect(trimmed).toHaveLength(2);
  });

  it("leaves a user-first array unchanged", () => {
    const messages: ChatMessage[] = [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Hello" },
    ];
    expect(trimToUserStart(messages)).toEqual(messages);
  });
});

describe("checkRateLimit", () => {
  it("allows up to the limit within the window, then blocks, then resets", () => {
    const opts = { limit: 3, windowMs: 1000 };
    expect(checkRateLimit("ip-a", { ...opts, now: 0 })).toBe(true);
    expect(checkRateLimit("ip-a", { ...opts, now: 10 })).toBe(true);
    expect(checkRateLimit("ip-a", { ...opts, now: 20 })).toBe(true);
    expect(checkRateLimit("ip-a", { ...opts, now: 30 })).toBe(false);
    expect(checkRateLimit("ip-b", { ...opts, now: 30 })).toBe(true);
    expect(checkRateLimit("ip-a", { ...opts, now: 2000 })).toBe(true);
  });
});
