import { describe, it, expect } from "vitest";
import { getAIConfig, buildSystemPrompt } from "@/lib/ai";

describe("getAIConfig", () => {
  it("returns null when AI_API_KEY is not set", () => {
    expect(getAIConfig({})).toBeNull();
    expect(getAIConfig({ AI_API_KEY: "" })).toBeNull();
  });

  it("applies defaults for model and base URL", () => {
    const config = getAIConfig({ AI_API_KEY: "sk-test" });
    expect(config).toEqual({
      apiKey: "sk-test",
      model: "claude-haiku-4-5",
      baseUrl: "https://api.anthropic.com",
    });
  });

  it("honors AI_MODEL and AI_BASE_URL overrides and trims trailing slash", () => {
    const config = getAIConfig({
      AI_API_KEY: "sk-test",
      AI_MODEL: "some-future-model",
      AI_BASE_URL: "https://my-gateway.example.com/",
    });
    expect(config).toEqual({
      apiKey: "sk-test",
      model: "some-future-model",
      baseUrl: "https://my-gateway.example.com",
    });
  });
});

describe("buildSystemPrompt", () => {
  it("embeds the business knowledge base", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("(813) 994-8805");
    expect(prompt).toContain("Wesley Chapel");
    expect(prompt).toContain("factory-direct");
  });

  it("instructs the lead marker protocol and price honesty", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain("[LEAD]");
    expect(prompt).toContain("[/LEAD]");
    expect(prompt.toLowerCase()).toContain("never invent");
  });
});
