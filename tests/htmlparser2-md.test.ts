import { describe, expect, it } from "vitest";
import { htmlToMarkdown } from "../src/convert/htmlparser2-md";
import type { TagTranslator } from "../src/types";

describe("htmlToMarkdown", () => {
  it("converts paragraphs, headings, and strong text", () => {
    const html = "<h1>Title</h1><p>Hello <strong>world</strong>!</p>";
    const result = htmlToMarkdown(html);
    expect(result.markdown).toContain("# Title");
    expect(result.markdown).toContain("Hello **world**!");
    expect(result.meta.wordCount).toBeGreaterThan(0);
  });

  it("renders lists with indentation", () => {
    const html = "<ul><li>First</li><li>Second<ul><li>Nested</li></ul></li></ul>";
    const result = htmlToMarkdown(html);
    expect(result.markdown).toContain("- First");
    expect(result.markdown).toContain("- Second");
    expect(result.markdown).toContain("  - Nested");
  });

  it("handles code blocks with language detection", () => {
    const html = '<pre><code class="language-js">console.log(1);\n</code></pre>';
    const result = htmlToMarkdown(html);
    expect(result.markdown).toContain("```js");
    expect(result.markdown).toContain("console.log(1);");
  });

  it("captures footnote style links", () => {
    const html = '<p>Read <a href="https://example.com">here</a>.</p>';
    const result = htmlToMarkdown(html, { linkStyle: "footnote" });
    expect(result.markdown).toContain("[^1]");
    expect(result.markdown).toContain("[^1]: https://example.com");
  });

  it("applies ignore tags and text replacements", () => {
    const html = "<article><aside>drop me</aside><p>Email foo@example.com</p></article>";
    const result = htmlToMarkdown(html, {
      ignoreTags: ["aside"],
      textReplacements: [{ pattern: /foo@example.com/g, replacement: "[redacted]" }],
    });
    expect(result.markdown).not.toContain("drop me");
    expect(result.markdown).toContain("[redacted]");
  });

  it("formats reference links and angle bracket URLs", () => {
    const html =
      '<p><a href="https://example.com">https://example.com</a> and <a href="https://example.com/about">About</a></p>';
    const result = htmlToMarkdown(html, {
      angleBracketLinks: true,
      useReferenceLinks: true,
    });
    expect(result.markdown).toContain("[https://example.com][1]");
    expect(result.markdown).toContain("[About][2]");
    expect(result.markdown).toContain("[1]: https://example.com");
    expect(result.markdown).toContain("[2]: https://example.com/about");
  });

  it("supports custom translators", () => {
    const translator: TagTranslator = (ctx, next) => {
      if (ctx.node.name === "span") {
        ctx.write("__");
        ctx.renderChildren({ inline: true });
        ctx.write("__");
      } else {
        next();
      }
    };
    const html = "<p>Custom <span>translator</span> rocks.</p>";
    const result = htmlToMarkdown(html, {
      translators: {
        span: translator,
      },
    });
    expect(result.markdown).toContain("__translator__");
  });
});
