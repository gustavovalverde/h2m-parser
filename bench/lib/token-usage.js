import { tokenizeAndEstimateCost } from "llm-cost";

export async function estimateTokenSavings({
  html,
  markdown,
  model,
  tokenize = tokenizeAndEstimateCost,
}) {
  const [htmlTokens, markdownTokens] = await Promise.all([
    tokenize({ model, input: html, output: "" }),
    tokenize({ model, input: markdown, output: "" }),
  ]);

  const savings = htmlTokens.inputTokens - markdownTokens.inputTokens;
  const savingsPct = htmlTokens.inputTokens ? (savings / htmlTokens.inputTokens) * 100 : 0;

  let costDelta = null;
  if (typeof htmlTokens.cost === "number" && typeof markdownTokens.cost === "number") {
    costDelta = htmlTokens.cost - markdownTokens.cost;
  }

  return {
    htmlTokens,
    markdownTokens,
    savings,
    savingsPct,
    costDelta,
  };
}
