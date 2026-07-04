import { describe, it, expect } from "vitest";
import { business, yearsInBusiness } from "@/lib/business";

describe("business data", () => {
  it("computes years in business from the 2006 founding year", () => {
    expect(yearsInBusiness(2026)).toBe(20);
    expect(yearsInBusiness(2030)).toBe(24);
  });

  it("defaults yearsInBusiness to the current year", () => {
    expect(yearsInBusiness()).toBe(new Date().getFullYear() - 2006);
  });

  it("has correct NAP facts", () => {
    expect(business.name).toBe("Paver World of Wesley Chapel");
    expect(business.phone.display).toBe("(813) 994-8805");
    expect(business.phone.tel).toBe("+18139948805");
    expect(business.email).toBe("paverworldofwesleychapel@gmail.com");
    expect(business.address.street).toBe("30141 State Road 54");
    expect(business.address.city).toBe("Wesley Chapel");
    expect(business.address.state).toBe("FL");
    expect(business.address.zip).toBe("33543");
  });

  it("lists exactly 6 services with unique slugs", () => {
    expect(business.services).toHaveLength(6);
    const slugs = business.services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(6);
    expect(slugs).toContain("patios");
    expect(slugs).toContain("driveways");
    expect(slugs).toContain("pool-decks");
  });

  it("has 6 FAQs and a non-empty service area", () => {
    expect(business.faqs).toHaveLength(6);
    expect(business.serviceAreas).toContain("Wesley Chapel");
    expect(business.serviceAreas.length).toBeGreaterThanOrEqual(6);
  });

  it("marks every testimonial as a placeholder", () => {
    expect(business.testimonials.length).toBeGreaterThanOrEqual(3);
    for (const t of business.testimonials) {
      expect(t.name.toLowerCase()).toContain("placeholder");
    }
  });
});
