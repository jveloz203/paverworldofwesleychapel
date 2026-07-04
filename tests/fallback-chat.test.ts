import { describe, it, expect } from "vitest";
import { fallbackReply } from "@/lib/fallback-chat";

describe("fallbackReply", () => {
  it("answers cost questions with the free-estimate pitch and no invented prices", () => {
    const reply = fallbackReply("How much does a paver patio cost?");
    expect(reply.toLowerCase()).toContain("free");
    expect(reply).toContain("(813) 994-8805");
    expect(reply).not.toMatch(/\$\d/);
  });

  it("lists services when asked what they do", () => {
    const reply = fallbackReply("What services do you offer?");
    expect(reply).toContain("patios");
    expect(reply).toContain("driveways");
    expect(reply).toContain("pool decks");
  });

  it("confirms a specific service like pool decks", () => {
    const reply = fallbackReply("Do you do pool decks?");
    expect(reply.toLowerCase()).toContain("pool deck");
  });

  it("answers service-area questions", () => {
    const reply = fallbackReply("Do you serve Land O' Lakes?");
    expect(reply).toContain("Wesley Chapel");
    expect(reply).toContain("Land O' Lakes");
  });

  it("answers hours/location questions", () => {
    const reply = fallbackReply("What are your hours?");
    expect(reply).toContain("9am–5pm");
    expect(reply).toContain("30141 State Road 54");
  });

  it("pushes estimate scheduling toward the phone and form", () => {
    const reply = fallbackReply("I want to schedule an estimate");
    expect(reply).toContain("(813) 994-8805");
    expect(reply.toLowerCase()).toContain("free");
  });

  it("answers commercial questions", () => {
    const reply = fallbackReply("Do you work with HOAs on commercial projects?");
    expect(reply.toLowerCase()).toContain("commercial");
  });

  it("explains factory-direct materials", () => {
    const reply = fallbackReply("Where do you get your materials?");
    expect(reply.toLowerCase()).toContain("direct");
  });

  it("confirms licensing and insurance", () => {
    const reply = fallbackReply("Are you licensed and insured?");
    expect(reply.toLowerCase()).toContain("licensed");
    expect(reply.toLowerCase()).toContain("insured");
  });

  it("greets on a greeting", () => {
    const reply = fallbackReply("hello!");
    expect(reply.toLowerCase()).toContain("paver world");
  });

  it("falls back to a helpful default with the phone number", () => {
    const reply = fallbackReply("zzz unrelated gibberish qqq");
    expect(reply).toContain("(813) 994-8805");
  });
});
