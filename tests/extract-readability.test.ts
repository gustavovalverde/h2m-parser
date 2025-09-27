import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { extractArticle } from "../src/extract/readability";

describe("extractArticle", () => {
  it("extracts main content and resolves relative URLs", async () => {
    const html = await readFile("tests/fixtures/simple.html", "utf8");
    const result = extractArticle(html, "https://example.org/base");
    expect(result.meta.title).toBe("Example Article");
    expect(result.contentHtml).toContain("Intro paragraph");
    expect(result.contentHtml).toContain("https://example.org/link");
  });

  it("strips tracking query parameters", () => {
    const html = '<p><a href="https://example.com/?utm_source=test&ok=1">link</a></p>';
    const result = extractArticle(html, "https://example.com");
    expect(result.contentHtml).toContain("https://example.com/?ok=1");
    expect(result.contentHtml).not.toContain("utm_source");
  });

  it("drops data images by default but preserves when requested", () => {
    const html = '<article><img src="data:image/png;base64,AAA" alt="inline" /></article>';
    const baseUrl = "https://example.com";
    const stripped = extractArticle(html, baseUrl);
    expect(stripped.contentHtml).not.toContain("data:image/png");

    const kept = extractArticle(html, baseUrl, { keepDataImages: true });
    expect(kept.contentHtml).toContain("data:image/png");
  });
});
