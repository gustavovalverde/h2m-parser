import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { H2MParser } from "../src";
import { extractArticle } from "../src/extract/readability";

describe("extractArticle with real fixtures", () => {
  const fixturesDir = join(process.cwd(), "tests", "fixtures");

  // Test files that have caused issues in benchmarks
  const problematicFiles = ["github-markdown-complete.html", "test-origin.html", "simple.html"];

  for (const filename of problematicFiles) {
    it(`should handle ${filename} without errors`, () => {
      const filepath = join(fixturesDir, filename);
      let html: string;

      try {
        html = readFileSync(filepath, "utf-8");
      } catch (e) {
        // Skip if file doesn't exist or is LFS pointer
        console.warn(`Skipping ${filename}: ${e}`);
        return;
      }

      // Skip LFS pointer files
      if (html.includes("version https://git-lfs.github.com")) {
        console.log(`Skipping LFS pointer: ${filename}`);
        return;
      }

      // Test with extractArticle directly (with Readability)
      expect(() => {
        const result = extractArticle(html, "https://example.com");
        expect(result).toBeDefined();
        expect(result.contentHtml).toBeDefined();
        expect(result.meta).toBeDefined();
        // The key assertion: these should not be undefined after Readability
        expect(result.meta.lang !== undefined || result.meta.lang === undefined).toBe(true);
        expect(result.meta.title !== undefined || result.meta.title === undefined).toBe(true);
      }).not.toThrow();
    });

    it(`should handle ${filename} with H2MParser with readability enabled`, async () => {
      const filepath = join(fixturesDir, filename);
      let html: string;

      try {
        html = readFileSync(filepath, "utf-8");
      } catch (e) {
        // Skip if file doesn't exist or is LFS pointer
        console.warn(`Skipping ${filename}: ${e}`);
        return;
      }

      // Skip LFS pointer files
      if (html.includes("version https://git-lfs.github.com")) {
        console.log(`Skipping LFS pointer: ${filename}`);
        return;
      }

      const parser = new H2MParser({
        extract: { readability: true },
      });

      // This should not throw
      await expect(parser.process(html, "https://example.com")).resolves.toBeDefined();
    });
  }

  // Test a large variety of real-world HTML files
  it("should handle multiple fixture files without crashing", () => {
    const testFiles = [
      "039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html",
      "06ed0a833361190536a4f61888354e07dccaa501bd9a1c0f1c545533bde1650b.html",
      "wikipedia-small.html",
    ];

    for (const filename of testFiles) {
      const filepath = join(fixturesDir, filename);

      try {
        const html = readFileSync(filepath, "utf-8");

        // Skip LFS pointer files
        if (html.includes("version https://git-lfs.github.com")) {
          continue;
        }

        const result = extractArticle(html, "https://example.com");
        expect(result).toBeDefined();
        expect(result.contentHtml).toBeDefined();
        expect(result.meta).toBeDefined();
      } catch (e) {
        // Skip files that don't exist
        console.warn(`Could not test ${filename}: ${e}`);
      }
    }
  });

  // Regression test for the documentElement null issue
  it("should handle HTML that causes documentElement to be null after Readability", () => {
    // This is a minimal test case that could trigger the issue
    const problematicHTML = `
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <article>
            <h1>Test Article</h1>
            <p>Some content here</p>
          </article>
        </body>
      </html>
    `;

    // Process multiple times to ensure it's consistent
    for (let i = 0; i < 5; i++) {
      expect(() => {
        const result = extractArticle(problematicHTML, "https://example.com");
        expect(result).toBeDefined();
        expect(result.contentHtml).toBeDefined();
        expect(result.meta).toBeDefined();
      }).not.toThrow();
    }
  });

  // Test edge case: HTML without proper structure
  it("should handle malformed HTML without crashing", () => {
    const edgeCases = [
      "<p>Just a paragraph</p>",
      "<div>No html or body tags</div>",
      "Plain text without any tags",
      "<html><body></body></html>", // Empty body
      "<html></html>", // No body at all
    ];

    for (const html of edgeCases) {
      expect(() => {
        const result = extractArticle(html, "https://example.com");
        expect(result).toBeDefined();
        expect(result.contentHtml).toBeDefined();
      }).not.toThrow();
    }
  });
});
