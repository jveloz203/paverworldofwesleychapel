import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/lead/route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/lead", () => {
  it("accepts a valid lead (delivered:false because Resend is unconfigured in tests)", async () => {
    const res = await POST(makeRequest({ name: "John", phone: "8135550100", source: "quote-form" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.delivered).toBe(false);
  });

  it("rejects an invalid lead with field errors", async () => {
    const res = await POST(makeRequest({ name: "", phone: "1", source: "quote-form" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.errors.name).toBeTruthy();
    expect(data.errors.phone).toBeTruthy();
  });

  it("rejects unparseable JSON with 400", async () => {
    const res = await POST(
      new Request("http://localhost/api/lead", { method: "POST", body: "{not json" })
    );
    expect(res.status).toBe(400);
  });
});
