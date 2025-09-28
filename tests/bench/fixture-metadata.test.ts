import { describe, expect, it } from "vitest";
import { describeHtml } from "../../bench/utils/fixture-metadata.js";

describe("fixture metadata", () => {
  it("extracts title, domain, and counts", () => {
    const html = `<!doctype html>
      <html>
        <head>
          <title>Example Article</title>
          <meta property="og:url" content="https://news.example.com/story" />
        </head>
        <body>
          <nav><a href="#">home</a></nav>
          <article>
            <p>Hello <a href="#">world</a></p>
            <table><tr><td>Row</td></tr></table>
          </article>
          <script>console.log('ignored')</script>
        </body>
      </html>`;

    const meta = describeHtml(html);
    expect(meta.title).toBe("Example Article");
    expect(meta.domain).toBe("news.example.com");
    expect(meta.links).toBe(2);
    expect(meta.tables).toBe(1);
    expect(meta.scripts).toBe(1);
    expect(meta.words).toBeGreaterThan(0);
  });

  it("falls back to provided base URL when canonical tags missing", () => {
    const html = "<html><head><title>No Canonical</title></head><body><p>Test</p></body></html>";
    const meta = describeHtml(html, "https://example.org/foo");
    expect(meta.domain).toBe("example.org");
  });
});
