export interface BundleFileInput {
  name: string;
  path: string;
}

export interface BundleFile {
  name: string;
  size: number;
  gzipSize: number;
}

export interface BundleFileWithDiffs extends BundleFile {
  sizeDiff: number | null;
  gzipDiff: number | null;
  sizeDiffPct: number | null;
  gzipDiffPct: number | null;
}

export type BundleReadFile = (path: string) => Promise<Buffer | Uint8Array | string>;

export function collectBundleFiles(
  paths: BundleFileInput[],
  readFile: BundleReadFile,
): Promise<BundleFile[]>;

export interface PreviousBundleSummary {
  files?: Array<{ name: string; size: number; gzipSize: number }>;
}

export interface BundleSummary {
  generatedAt: string;
  files: BundleFileWithDiffs[];
}

export function computeBundleSummary(
  files: BundleFile[],
  previousSummary?: PreviousBundleSummary | null,
): BundleSummary;
