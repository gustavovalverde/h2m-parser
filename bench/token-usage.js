#!/usr/bin/env node

/**
 * Estimate LLM token usage for raw HTML vs generated Markdown.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { tokenizeAndEstimateCost } from "llm-cost";
import { loadH2MParser } from "./utils/h2m-loader.js";

const DEFAULT_FIXTURE = resolve(
  join(
    process.cwd(),
    "tests",
    "fixtures",
    "039c4b966d1f2a0c589ac0aad211fe65500ad1cb58c7f45b34251db7056803ec.html",
  ),
);
const DEFAULT_MODEL = process.env.TOKEN_MODEL ?? "gpt-4o-mini";

async function main() {
  const fixture = process.argv[2] ? resolve(process.argv[2]) : DEFAULT_FIXTURE;
  const model = DEFAULT_MODEL;

  console.log(`Estimating token usage for fixture: ${fixture}`);
  console.log(`Model: ${model}\n`);

  const html = await readFile(fixture, "utf8");
  const H2MParser = await loadH2MParser();
  const parser = new H2MParser();
  const result = await parser.process(html, `file://${fixture}`);

  const [htmlTokens, markdownTokens] = await Promise.all([
    tokenizeAndEstimateCost({ model, input: html, output: "" }),
    tokenizeAndEstimateCost({ model, input: result.markdown, output: "" }),
  ]);

  const savings = htmlTokens.inputTokens - markdownTokens.inputTokens;
  const savingsPct = (savings / htmlTokens.inputTokens) * 100;

  console.log("Token usage summary:");
  console.log(`  HTML tokens:     ${htmlTokens.inputTokens}`);
  console.log(`  Markdown tokens: ${markdownTokens.inputTokens}`);
  console.log(`  Savings:         ${savings} (${savingsPct.toFixed(2)}%)`);

  if (typeof htmlTokens.cost === "number" && typeof markdownTokens.cost === "number") {
    const costDelta = htmlTokens.cost - markdownTokens.cost;
    console.log(`  Estimated cost delta: $${costDelta.toFixed(6)}`);
  }

  console.log("\nSet TOKEN_MODEL env var to experiment with different pricing schedules.");

  const resultsDir = join(process.cwd(), "bench", ".results");
  await mkdir(resultsDir, { recursive: true });
  const summary = {
    generatedAt: new Date().toISOString(),
    fixture,
    model,
    htmlTokens,
    markdownTokens,
    savings,
    savingsPct,
    markdownLength: result.markdown.length,
  };

  await writeFile(
    join(resultsDir, "token-usage-latest.json"),
    JSON.stringify(summary, null, 2),
    "utf8",
  );
}

await main();
