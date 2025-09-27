#!/usr/bin/env node

/**
 * Example demonstrating content chunking for LLM processing
 * Shows how to split large documents into manageable chunks
 */

import { H2MParser } from "../dist/index.mjs";

async function main() {
  // Simulating a long article/documentation
  const longHtml = `
    <!DOCTYPE html>
    <html>
    <body>
      <article>
        <h1>Complete Guide to Web Development</h1>

        <h2>Chapter 1: Introduction</h2>
        <p>Web development is the process of building and maintaining websites. It encompasses everything from simple static pages to complex web applications.</p>
        <p>In this comprehensive guide, we'll explore all aspects of modern web development, from frontend technologies to backend systems, databases, and deployment strategies.</p>
        <p>Whether you're a beginner or an experienced developer, this guide will provide valuable insights and best practices.</p>

        <h2>Chapter 2: Frontend Development</h2>
        <h3>HTML Basics</h3>
        <p>HTML (HyperText Markup Language) is the foundation of web pages. It provides the structure and content of websites.</p>
        <p>Key HTML concepts include elements, attributes, semantic markup, and accessibility. Modern HTML5 introduces many new elements for better document structure.</p>

        <h3>CSS Fundamentals</h3>
        <p>CSS (Cascading Style Sheets) controls the presentation and layout of web pages. It allows you to apply styles to HTML elements.</p>
        <p>Important CSS topics include selectors, box model, flexbox, grid, animations, and responsive design principles.</p>
        <p>Modern CSS features like custom properties (variables) and container queries provide powerful styling capabilities.</p>

        <h3>JavaScript Essentials</h3>
        <p>JavaScript is the programming language of the web. It enables dynamic and interactive features on websites.</p>
        <p>Core JavaScript concepts include variables, functions, objects, arrays, promises, async/await, and the DOM API.</p>
        <p>Modern JavaScript (ES6+) introduces features like arrow functions, destructuring, modules, and classes.</p>

        <h2>Chapter 3: Backend Development</h2>
        <h3>Server-Side Technologies</h3>
        <p>Backend development involves creating server-side logic, databases, and APIs that power web applications.</p>
        <p>Popular backend technologies include Node.js, Python (Django, Flask), Ruby (Rails), PHP (Laravel), and Java (Spring).</p>
        <p>Each technology has its strengths and is suited for different types of projects and team expertise.</p>

        <h3>Database Management</h3>
        <p>Databases store and manage application data. Understanding database design and management is crucial for backend development.</p>
        <p>SQL databases like PostgreSQL and MySQL provide relational data storage with ACID compliance.</p>
        <p>NoSQL databases like MongoDB and Redis offer flexible data models for specific use cases.</p>

        <h3>API Development</h3>
        <p>APIs (Application Programming Interfaces) enable communication between different software components.</p>
        <p>RESTful APIs follow architectural principles for creating scalable and maintainable web services.</p>
        <p>GraphQL provides a query language for APIs, allowing clients to request specific data.</p>

        <h2>Chapter 4: DevOps and Deployment</h2>
        <h3>Version Control</h3>
        <p>Version control systems like Git track changes to code over time and facilitate collaboration.</p>
        <p>Key Git concepts include repositories, commits, branches, merging, and pull requests.</p>

        <h3>Continuous Integration/Deployment</h3>
        <p>CI/CD pipelines automate the process of testing and deploying code changes.</p>
        <p>Tools like Jenkins, GitHub Actions, and GitLab CI help maintain code quality and streamline deployments.</p>

        <h3>Cloud Platforms</h3>
        <p>Cloud platforms provide infrastructure and services for hosting web applications.</p>
        <p>Major providers include AWS, Google Cloud Platform, Microsoft Azure, and smaller platforms like Vercel and Netlify.</p>

        <h2>Conclusion</h2>
        <p>Web development is a constantly evolving field with new technologies and best practices emerging regularly.</p>
        <p>Successful web developers combine technical skills with problem-solving abilities and continuous learning.</p>
        <p>Remember that building great web applications is not just about using the latest technologies, but about creating value for users and solving real problems.</p>
      </article>
    </body>
    </html>
  `;

  console.log("📚 Processing long document with chunking...\n");

  const converter = new H2MParser({
    extract: {
      readability: true,
    },
    markdown: {
      linkStyle: "inline",
    },
    llm: {
      frontMatter: true,
      addHash: true,
    },
    chunk: {
      enabled: true,
      maxTokens: 500, // Target chunk size in tokens
      overlap: 50, // Token overlap between chunks
      headingAware: true, // Keep related content together
    },
  });

  const result = await converter.process(longHtml, "https://docs.example.com", {
    sourceUrl: "https://docs.example.com/guide",
    retrievedAt: new Date().toISOString(),
  });

  // Display chunks
  if (result.chunks && result.chunks.length > 0) {
    console.log(`📊 Document split into ${result.chunks.length} chunks:\n`);

    result.chunks.forEach((chunk, index) => {
      console.log(`\n--- Chunk ${index + 1} (${chunk.tokenCount} tokens) ---`);
      console.log(`Headings: ${chunk.headings?.join(" > ") || "None"}`);
      console.log(`Preview: ${chunk.content.substring(0, 150)}...`);
    });

    console.log("\n📝 First complete chunk:\n");
    console.log(result.chunks[0].content);
  } else {
    console.log("Document was not chunked (too small or chunking disabled)");
    console.log("\n📄 Full output:\n");
    console.log(result.markdown);
  }

  // Example: Process chunks for LLM
  console.log("\n🤖 Example: Preparing chunks for LLM processing...\n");

  if (result.chunks) {
    result.chunks.forEach((chunk, index) => {
      const _prompt = `
Context: This is chunk ${index + 1} of ${result.chunks.length} from a web development guide.
Section: ${chunk.headings?.join(" > ") || "General"}

Content:
${chunk.content}

Task: Summarize the key points from this section.
      `.trim();

      console.log(`Chunk ${index + 1} ready for LLM (${chunk.tokenCount} tokens)`);
      // In a real application, you would send 'prompt' to your LLM API
    });
  }
}

main().catch(console.error);
