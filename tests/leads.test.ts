import { describe, it, expect } from "vitest";
import { validateLead, formatLeadEmail, sendLead, type Lead } from "@/lib/leads";

describe("validateLead", () => {
  it("accepts a minimal valid lead and trims fields", () => {
    const result = validateLead({ name: "  John Doe ", phone: "813-555-0100", source: "quote-form" });
    expect("lead" in result && result.lead).toEqual({
      name: "John Doe",
      phone: "813-555-0100",
      source: "quote-form",
    });
  });

  it("accepts optional fields", () => {
    const result = validateLead({
      name: "Jane",
      phone: "(813) 555-0101",
      source: "commercial-form",
      email: "jane@example.com",
      projectType: "Pool Decks",
      message: "HOA sidewalk repair",
      company: "Oak Creek HOA",
    });
    expect("lead" in result).toBe(true);
    if ("lead" in result) {
      expect(result.lead.company).toBe("Oak Creek HOA");
    }
  });

  it("rejects missing name, short phone, and bad source", () => {
    const noName = validateLead({ name: "  ", phone: "8135550100", source: "quote-form" });
    expect("errors" in noName && noName.errors.name).toBeTruthy();

    const shortPhone = validateLead({ name: "Al", phone: "555", source: "quote-form" });
    expect("errors" in shortPhone && shortPhone.errors.phone).toBeTruthy();

    const badSource = validateLead({ name: "Al", phone: "8135550100", source: "spam-bot" });
    expect("errors" in badSource && badSource.errors.source).toBeTruthy();
  });

  it("rejects a non-object body", () => {
    expect("errors" in validateLead(null)).toBe(true);
    expect("errors" in validateLead("hi")).toBe(true);
  });
});

describe("formatLeadEmail", () => {
  const lead: Lead = {
    name: "John Doe",
    phone: "813-555-0100",
    source: "quote-form",
    projectType: "Driveways",
    message: "Cracked driveway, ~600 sqft",
  };

  it("puts project, name, and phone in the subject", () => {
    const { subject } = formatLeadEmail(lead);
    expect(subject).toContain("Driveways");
    expect(subject).toContain("John Doe");
    expect(subject).toContain("813-555-0100");
  });

  it("includes every provided field and the source in the body", () => {
    const { text } = formatLeadEmail(lead);
    expect(text).toContain("John Doe");
    expect(text).toContain("813-555-0100");
    expect(text).toContain("Cracked driveway");
    expect(text).toContain("quote-form");
  });
});

describe("sendLead without Resend configured", () => {
  it("returns delivered:false instead of throwing", async () => {
    const result = await sendLead(
      { name: "John", phone: "8135550100", source: "chat" },
      {} // empty env — no RESEND_API_KEY
    );
    expect(result).toEqual({ delivered: false });
  });
});
