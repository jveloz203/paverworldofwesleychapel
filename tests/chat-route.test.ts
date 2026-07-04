import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/chat/route";

function makeRequest(body: unknown, ip = "203.0.113.7"): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat (no AI_API_KEY in test env)", () => {
  it("answers via the scripted fallback", async () => {
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "What are your hours?" }] })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.source).toBe("fallback");
    expect(data.reply).toContain("9am–5pm");
  });

  it("rejects an invalid body with 400", async () => {
    const res = await POST(makeRequest({ messages: [] }));
    expect(res.status).toBe(400);
  });

  it("rejects unparseable JSON with 400", async () => {
    const res = await POST(
      new Request("http://localhost/api/chat", { method: "POST", body: "{oops" })
    );
    expect(res.status).toBe(400);
  });

  it("rate limits an abusive client with 429", async () => {
    const ip = "198.51.100.99";
    let last: Response | undefined;
    for (let i = 0; i < 21; i++) {
      last = await POST(makeRequest({ messages: [{ role: "user", content: "hi" }] }, ip));
    }
    expect(last!.status).toBe(429);
  });
});
