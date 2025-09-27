#!/usr/bin/env node

/**
 * Example showing how to customize tag rendering with translators
 * Demonstrates advanced customization capabilities
 */

import { H2MParser } from "../dist/index.mjs";

async function main() {
  const html = `
    <div>
      <h1>Custom Rendering Example</h1>
      <p>This example shows how to customize the rendering of specific HTML tags.</p>

      <div class="note">
        <strong>Note:</strong> This is an important note that we want to render specially.
      </div>

      <span class="highlight">This text is highlighted</span> in the original HTML.

      <figure>
        <img src="diagram.png" alt="Architecture diagram">
        <figcaption>System architecture overview</figcaption>
      </figure>

      <div class="code-block" data-language="javascript">
        const greeting = "Hello, World!";
        console.log(greeting);
      </div>

      <table>
        <tr>
          <th>Feature</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>Performance</td>
          <td>✅ Excellent</td>
        </tr>
        <tr>
          <td>Compatibility</td>
          <td>✅ Wide support</td>
        </tr>
      </table>
    </div>
  `;

  console.log("🎨 Converting with custom translators...\n");

  const converter = new H2MParser({
    markdown: {
      // Treat divs with class="note" as blockquotes
      blockTags: ["div.note"],

      // Custom translators for specific tags
      translators: {
        // Custom rendering for spans with highlight class
        span: (ctx, next) => {
          const classes = ctx.node.attribs?.class || "";
          if (classes.includes("highlight")) {
            ctx.write("**");
            ctx.renderChildren({ inline: true });
            ctx.write("**");
          } else {
            // Default behavior for other spans
            next();
          }
        },

        // Custom rendering for div elements
        div: (ctx, next) => {
          const classes = ctx.node.attribs?.class || "";

          if (classes.includes("note")) {
            // Render notes as blockquotes with a prefix
            ctx.write("\n> ℹ️ ");
            ctx.renderChildren({ inline: false });
            ctx.write("\n");
          } else if (classes.includes("code-block")) {
            // Render code blocks with language hint
            const lang = ctx.node.attribs?.["data-language"] || "";
            ctx.write(`\n\`\`\`${lang}\n`);
            ctx.renderChildren({ inline: false, raw: true });
            ctx.write("\n```\n");
          } else {
            // Default div handling
            next();
          }
        },

        // Custom figure handling
        figure: (ctx, _next) => {
          ctx.write("\n---\n");
          ctx.write("**Figure:**\n");
          ctx.renderChildren({ inline: false });
          ctx.write("\n---\n");
        },
      },
    },
  });

  const result = await converter.process(html, "https://example.com");

  console.log("📄 Custom rendered output:\n");
  console.log(result.markdown);

  // Example with different options
  console.log("\n🔄 Same HTML with different translator configuration:\n");

  const minimalConverter = new H2MParser({
    markdown: {
      // Ignore certain tags completely
      ignoreTags: ["figure", "figcaption"],

      // Simple translators
      translators: {
        span: (ctx) => {
          // Just render content, ignore all span formatting
          ctx.renderChildren({ inline: true });
        },
        div: (ctx) => {
          // Treat all divs as simple containers
          ctx.write("\n");
          ctx.renderChildren({ inline: false });
          ctx.write("\n");
        },
      },
    },
  });

  const minimalResult = await minimalConverter.process(html, "https://example.com");
  console.log(minimalResult.markdown);
}

main().catch(console.error);
