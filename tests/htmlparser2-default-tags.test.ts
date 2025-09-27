import { describe, expect, test } from "vitest";
import { htmlToMarkdown } from "../src/convert/htmlparser2-md";
import type { MarkdownOptions } from "../src/types";

function render(html: string, options: MarkdownOptions = {}): string {
  return htmlToMarkdown(html, options).markdown;
}

describe("htmlToMarkdown default tag handling", () => {
  test("line break produces newline", () => {
    expect(render("A<br>B")).toBe("A\nB");
  });

  test("horizontal rule inserts thematic break", () => {
    expect(render("A<hr>B")).toBe("A\n\n---\n\nB");
  });

  test("strong and emphasis markers stay intact", () => {
    expect(render("<strong>a</strong><b>b</b>")).toBe("**a****b**");
    expect(render("<em>a</em><i>b</i>")).toBe("*a**b*");
  });

  test("headings keep hash prefixes", () => {
    expect(render("<h2>Title</h2>")).toBe("## Title");
  });

  test("nested blockquotes retain indentation", () => {
    const expected = ["> a", ">", ">", "> > > b"].join("\n");
    expect(render("<blockquote>a<br><blockquote>b</blockquote></blockquote>")).toBe(expected);
  });

  test("unordered lists include spacing between siblings", () => {
    const html = "<ul><li>First</li><li>Second<ul><li>Child</li></ul></li></ul>";
    const expected = "- First\n\n- Second\n\n  - Child";
    expect(render(html)).toBe(expected);
  });

  test("inline code stays wrapped with backticks", () => {
    expect(render("<code>a * b</code>")).toBe("`a * b`");
  });

  test("code blocks infer language from class", () => {
    const html = '<pre><code class="language-js">console.log(1);\n</code></pre>';
    const expected = "```js\nconsole.log(1);\n```";
    expect(render(html)).toBe(expected);
  });

  test("images and figures emit captions", () => {
    expect(render('<img src="https://img" alt="alt" title="t">')).toBe('![alt](https://img "t")');

    const figureHtml =
      '<figure><img src="https://img" alt="Alt"><figcaption>Caption</figcaption></figure>';
    const figureExpected = "![Alt](https://img)\n\n*Caption*";
    expect(render(figureHtml)).toBe(figureExpected);
  });

  test("links support nested inline formatting", () => {
    expect(render('<a href="https://example.com">a<strong>b</strong></a>')).toBe(
      "[a**b**](https://example.com)",
    );
  });

  test("reference link mode produces definitions", () => {
    const html =
      '<p><a href="https://example.com">https://example.com</a> and <a href="https://example.com/about">About</a></p>';
    const expected = [
      "https://example.com[https://example.com][1] and About[About][2]",
      "",
      "[1]: https://example.com",
      "[2]: https://example.com/about",
    ].join("\n");
    const markdown = render(html, { angleBracketLinks: true, useReferenceLinks: true });
    expect(markdown).toBe(expected);
  });

  test("tables render simple GFM output", () => {
    const html = "<table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>";
    const expected = ["| A | B |", "| --- | --- |", "| 1 | 2 |"].join("\n");
    expect(render(html)).toBe(expected);
  });
});
