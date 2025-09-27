#!/usr/bin/env node

/**
 * Basic usage example for h2m-parser
 * Demonstrates simple HTML to Markdown conversion
 */

import { H2MParser } from "../dist/index.mjs";

async function main() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Example Article</title>
    </head>
    <body>
      <article>
        <h1>Welcome to h2m-parser</h1>
        <p>This is a <strong>simple</strong> example showing how to convert HTML to Markdown.</p>

        <h2>Features</h2>
        <ul>
          <li>Fast conversion</li>
          <li>Clean output</li>
          <li>Customizable</li>
        </ul>

        <h2>Code Example</h2>
        <pre><code>const result = await converter.process(html);</code></pre>

        <p>Visit our <a href="https://github.com/gustavovalverde/h2m-parser">GitHub repository</a> for more information.</p>
      </article>
    </body>
    </html>
  `;

  console.log("🔄 Converting HTML to Markdown...\n");

  // Basic conversion
  const result = await H2MParser.processHtml(html, "https://example.com");

  console.log("📄 Output:\n");
  console.log(result.markdown);

  // With options
  console.log("\n🔧 With custom options:\n");

  const converter = new H2MParser({
    markdown: {
      linkStyle: "referenced",
      useReferenceLinks: true,
    },
    llm: {
      frontMatter: true,
      addHash: true,
    },
  });

  const customResult = await converter.process(html, "https://example.com", {
    sourceUrl: "https://example.com/article",
    retrievedAt: new Date().toISOString(),
  });

  console.log(customResult.markdown);
}

main().catch(console.error);
