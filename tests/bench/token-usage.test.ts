import { describe, expect, it } from "vitest";
import { estimateTokenSavings } from "../../bench/lib/token-usage.js";

describe("estimateTokenSavings", () => {
  it("computes savings and cost delta using provided tokenizer", async () => {
    const fakeTokenizer = async ({ input }: { model: string; input: string; output: string }) => ({
      inputTokens: input.length,
      outputTokens: 0,
      cost: input.length * 0.001,
    });

    const result = await estimateTokenSavings({
      html: "<p>hello world</p>",
      markdown: "hello world",
      model: "fake",
      tokenize: fakeTokenizer,
    });

    expect(result.htmlTokens.inputTokens).toBe(18);
    expect(result.markdownTokens.inputTokens).toBe(11);
    expect(result.savings).toBe(7);
    expect(result.savingsPct).toBeCloseTo((7 / 18) * 100);
    expect(result.costDelta).toBeCloseTo(0.007);
  });

  it("handles missing cost information", async () => {
    const tokenizer = async ({ input }: { model: string; input: string; output: string }) => ({
      inputTokens: input.length,
      outputTokens: 0,
      cost: undefined,
    });
    const result = await estimateTokenSavings({
      html: "abc",
      markdown: "ab",
      model: "none",
      tokenize: tokenizer,
    });
    expect(result.costDelta).toBeNull();
  });
});
