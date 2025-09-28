export interface ComparisonSummary {
  verdict: string;
  averages: Record<string, number>;
  comparisons: Record<string, number>;
  meta?: Record<string, unknown>;
}

export interface AggregatedSummary {
  generatedAt: string;
  comparison: ComparisonSummary | null;
  workflows: unknown;
  memory: unknown;
  tokenUsage: unknown;
  fetchE2E: unknown;
  bundleSize: unknown;
}

export interface AggregateResultsOptions {
  resultsDir?: string;
}

export function aggregateResults(
  options?: AggregateResultsOptions,
): Promise<{ summary: AggregatedSummary; outputPath: string }>;
