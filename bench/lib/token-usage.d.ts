import type { tokenizeAndEstimateCost } from "llm-cost";

type TokenEstimate = Awaited<ReturnType<typeof tokenizeAndEstimateCost>>;

type TokenizeFn = (options: {
  model: string;
  input: string;
  output: string;
}) => Promise<TokenEstimate>;

export interface TokenSavingsParams {
  html: string;
  markdown: string;
  model: string;
  tokenize?: TokenizeFn;
}

export interface TokenSavingsResult {
  htmlTokens: TokenEstimate;
  markdownTokens: TokenEstimate;
  savings: number;
  savingsPct: number;
  costDelta: number | null;
}

export function estimateTokenSavings(params: TokenSavingsParams): Promise<TokenSavingsResult>;
