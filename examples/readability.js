#!/usr/bin/env node

/**
 * Example demonstrating Readability integration
 * Shows how to extract main article content from cluttered HTML
 */

import { H2MParser } from "../dist/index.mjs";

async function main() {
  // Simulating a typical news article page with ads, navigation, etc.
  const cluttered_html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>News Article - Example Site</title>
    </head>
    <body>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <div class="advertisement">
        <img src="ad.jpg" alt="Buy now!">
        <p>Special offer! Click here!</p>
      </div>

      <main>
        <article>
          <h1>Breaking: Major Scientific Discovery</h1>
          <div class="meta">
            <span>By John Doe</span>
            <time>January 27, 2025</time>
          </div>

          <p class="lead">Scientists have made a groundbreaking discovery that could change our understanding of the universe.</p>

          <p>In a remarkable breakthrough, researchers at the International Science Institute have discovered a new fundamental particle that challenges existing theories of physics.</p>

          <p>"This is a game-changer," said Dr. Sarah Johnson, lead researcher on the project. "We're looking at something that could rewrite textbooks."</p>

          <h2>The Discovery Process</h2>

          <p>The team used advanced particle accelerators and quantum computing to analyze millions of collision events. After years of research, they identified patterns that pointed to the existence of this new particle.</p>

          <blockquote>
            <p>We've opened a door to a new realm of physics. The implications are staggering.</p>
            <cite>Dr. Michael Chen, Theoretical Physicist</cite>
          </blockquote>

          <h2>What This Means</h2>

          <p>The discovery has several important implications:</p>

          <ol>
            <li>It validates theories proposed decades ago</li>
            <li>Opens new avenues for quantum computing</li>
            <li>Could lead to revolutionary technologies</li>
          </ol>

          <p>Further research is needed to fully understand the properties of this particle and how it interacts with known physics.</p>
        </article>
      </main>

      <aside>
        <h3>Related Articles</h3>
        <ul>
          <li><a href="/article1">Previous Discovery</a></li>
          <li><a href="/article2">Physics Explained</a></li>
        </ul>
      </aside>

      <footer>
        <p>&copy; 2025 Example News Site. All rights reserved.</p>
        <p>Follow us on social media!</p>
      </footer>
    </body>
    </html>
  `;

  console.log("🧹 Extracting article content with Readability...\n");

  const converter = new H2MParser({
    extract: {
      readability: true, // Enable Mozilla Readability
    },
    markdown: {
      linkStyle: "inline",
    },
    llm: {
      frontMatter: true,
      addHash: true,
    },
  });

  const result = await converter.process(cluttered_html, "https://news.example.com", {
    sourceUrl: "https://news.example.com/article/123",
    retrievedAt: new Date().toISOString(),
  });

  console.log("✨ Clean article extracted:\n");
  console.log(result.markdown);

  console.log("\n📊 Metadata:");
  console.log(`Title: ${result.metadata?.title || "N/A"}`);
  console.log(`Author: ${result.metadata?.author || "N/A"}`);
  console.log(`Content hash: ${result.metadata?.contentHash || "N/A"}`);
}

main().catch(console.error);
