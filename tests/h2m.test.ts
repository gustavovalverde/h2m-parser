import { describe, expect, it } from "vitest";
import { H2MParser } from "../src";
import { SAMPLE_ARTICLE_HTML } from "./helpers/sample-article";

describe("H2MParser", () => {
  it("runs the full pipeline with front matter and chunking", async () => {
    const converter = new H2MParser({
      markdown: { linkStyle: "inline" },
      llm: { frontMatter: true, addHash: true, chunk: { targetTokens: 120, overlapTokens: 20 } },
    });

    const result = await converter.process(
      SAMPLE_ARTICLE_HTML,
      "https://example.org/articles/test",
      {
        retrievedAt: "2025-09-26T00:00:00.000Z",
      },
    );

    expect(result.markdown).toContain("sourceUrl: https://example.org/articles/test");
    expect(result.markdown).toContain("Example Heading");
    expect(result.meta.contentHash).toBeDefined();
    expect(result.chunks?.length).toBeGreaterThan(0);
  });

  it("supports static process helper with custom translators", async () => {
    const html = "<article><p>Hello <span>world</span></p></article>";
    const result = await H2MParser.processHtml(html, "https://example.org/article", {
      markdown: {
        translators: {
          span: (ctx, _next) => {
            ctx.write("[[");
            ctx.renderChildren({ inline: true });
            ctx.write("]]");
          },
        },
      },
    });

    expect(result.markdown).toContain("[[world]]");
    expect(result.meta.sourceUrl).toBe("https://example.org/article");
  });
});
