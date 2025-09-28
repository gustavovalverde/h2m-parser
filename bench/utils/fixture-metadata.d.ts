export interface FixtureMetadata {
  title?: string;
  domain?: string;
  tables: number;
  links: number;
  scripts: number;
  words: number;
}

export function describeHtml(html: string, baseUrl?: string): FixtureMetadata;

export function describeFixture(path: string, baseUrl?: string): Promise<FixtureMetadata>;

export function describeFixtureFromBenchmark(
  entry: { filename?: string; source?: string },
  datasetDir: string,
): Promise<FixtureMetadata & { filename?: string }>;
