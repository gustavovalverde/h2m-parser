/**
 * Entry point for h2m-parser. Exposes the high-level `H2MParser` pipeline, a static helper for ad-hoc
 * conversions, and utilities for streaming NDJSON integration.
 */

import { createHash } from "node:crypto";
import { performance } from "node:perf_hooks";
import { htmlToMarkdown } from "./convert/htmlparser2-md";
import { extractArticle } from "./extract/readability";
import { createNdjsonTransform } from "./io/ndjson-transform";
import { chunkMarkdown } from "./post/chunker";
import { buildFrontMatter } from "./post/front-matter";
import type {
  ChunkConfig,
  ConvertMeta,
  ConvertResult,
  ExtractedContent,
  ExtractOptions,
  MarkdownOptions,
  MarkdownResult,
  Options,
  Telemetry,
  TelemetryEvent,
} from "./types";

export type {
  ChunkConfig,
  ConvertMeta,
  ConvertResult,
  ExtractedContent,
  ExtractOptions,
  LinkStyle,
  LlmOptions,
  MarkdownOptions,
  MarkdownResult,
  Options,
  ProcessOptions,
  TagTranslator,
  TagTranslatorContext,
  Telemetry,
  TelemetryEvent,
  TranslatorMeta,
} from "./types";

interface ResolvedOptions {
  extract: Required<ExtractOptions>;
  markdown: Required<MarkdownOptions>;
  llm: {
    frontMatter: boolean;
    addHash: boolean;
    chunk: ChunkConfig | false;
  };
  telemetry?: Telemetry;
}

const DEFAULT_OPTIONS: ResolvedOptions = {
  extract: {
    readability: true,
    keepFigures: false,
    resolveRelativeUrls: true,
    stripTrackingParams: true,
    keepDataImages: false,
  },
  markdown: {
    bullet: "-",
    headingSpace: true,
    linkStyle: "inline",
    codeFence: "```",
    softWrap: false,
    maxConsecutiveBlankLines: 2,
    ignoreTags: [],
    blockTags: [],
    angleBracketLinks: false,
    useReferenceLinks: false,
    textReplacements: [],
    translators: {},
  },
  llm: {
    frontMatter: true,
    addHash: false,
    chunk: false,
  },
  telemetry: undefined,
};

/**
 * Orchestrates the full HTML → Markdown pipeline with optional post-processing stages.
 * Construct once and reuse for best performance.
 */
export class H2MParser {
  private readonly options: ResolvedOptions;

  constructor(options: Options = {}) {
    this.options = mergeOptions(options);
  }

  /**
   * Convenience helper for callers who don't need to keep an instance around.
   * Creates a short-lived `H2MParser` under the hood.
   */
  static async processHtml(
    html: string,
    baseUrl: string,
    options: Options = {},
    meta: Partial<ConvertMeta> = {},
  ): Promise<ConvertResult> {
    const pipeline = new H2MParser(options);
    return pipeline.process(html, baseUrl, meta);
  }

  /** Extract the Readability article fragment without performing conversion. */
  extract(html: string, baseUrl: string): ExtractedContent {
    return extractArticle(html, baseUrl, this.options.extract);
  }

  /** Convert a cleaned HTML fragment to Markdown using the configured renderer options. */
  toMarkdown(contentHtml: string): MarkdownResult {
    return htmlToMarkdown(contentHtml, this.options.markdown);
  }

  /**
   * Runs the full pipeline: Readability extraction → Markdown conversion → optional front matter
   * and chunking. Metadata overrides can be supplied via the `meta` argument.
   */
  async process(
    html: string,
    baseUrl: string,
    meta: Partial<ConvertMeta> = {},
  ): Promise<ConvertResult> {
    const htmlBytes = Buffer.byteLength(html, "utf8");
    const totalStart = performance.now();

    const extractStart = performance.now();
    const extracted = this.extract(html, baseUrl);
    const extractDuration = performance.now() - extractStart;
    this.emitTelemetry({
      stage: "extract",
      durationMs: extractDuration,
      bytesIn: htmlBytes,
      bytesOut: Buffer.byteLength(extracted.contentHtml, "utf8"),
    });

    const convertStart = performance.now();
    const markdownResult = this.toMarkdown(extracted.contentHtml);
    const convertDuration = performance.now() - convertStart;
    this.emitTelemetry({
      stage: "convert",
      durationMs: convertDuration,
      bytesIn: Buffer.byteLength(extracted.contentHtml, "utf8"),
      bytesOut: Buffer.byteLength(markdownResult.markdown, "utf8"),
    });

    const combinedMeta: ConvertMeta = {
      ...extracted.meta,
      ...markdownResult.meta,
      sourceUrl: meta.sourceUrl ?? (baseUrl || undefined),
      retrievedAt: meta.retrievedAt ?? new Date().toISOString(),
      bytes: meta.bytes ?? Buffer.byteLength(html, "utf8"),
      ...meta,
    };

    if (this.options.llm.addHash && !combinedMeta.contentHash) {
      combinedMeta.contentHash = computeHash(markdownResult.markdown);
      combinedMeta.hashAlgorithm = "sha256";
    }

    const postStart = performance.now();
    let markdown = markdownResult.markdown.trim();

    if (this.options.llm.frontMatter) {
      const frontMatter = buildFrontMatter(combinedMeta);
      if (frontMatter) {
        markdown = `${frontMatter}${markdown}\n`;
      }
    }

    let chunks: string[] | undefined;
    if (this.options.llm.chunk) {
      const baseContent = this.options.llm.frontMatter ? markdown : markdownResult.markdown;
      const chunkStart = performance.now();
      chunks = await chunkMarkdown(baseContent, this.options.llm.chunk);
      const chunkDuration = performance.now() - chunkStart;
      this.emitTelemetry({
        stage: "chunk",
        durationMs: chunkDuration,
        bytesIn: Buffer.byteLength(baseContent, "utf8"),
        bytesOut: chunks.length ? Buffer.byteLength(chunks.join(""), "utf8") : undefined,
      });
    }

    const postDuration = performance.now() - postStart;
    this.emitTelemetry({
      stage: "post",
      durationMs: postDuration,
      bytesIn: Buffer.byteLength(markdownResult.markdown, "utf8"),
      bytesOut: Buffer.byteLength(markdown, "utf8"),
    });

    const totalDuration = performance.now() - totalStart;
    this.emitTelemetry({
      stage: "total",
      durationMs: totalDuration,
      bytesIn: htmlBytes,
      bytesOut: Buffer.byteLength(markdown, "utf8"),
    });

    return {
      markdown,
      meta: combinedMeta,
      chunks,
    };
  }

  /** Create a Transform stream ready to enrich micrawl NDJSON output. */
  createNdjsonTransform() {
    return createNdjsonTransform({ processor: this.process.bind(this) });
  }

  private emitTelemetry(event: TelemetryEvent): void {
    this.options.telemetry?.(event);
  }
}

/** Convenience wrapper when only the Transform is needed. */
export function createH2MNdjsonTransform(options: Options = {}) {
  const pipeline = new H2MParser(options);
  return pipeline.createNdjsonTransform();
}

/**
 * Merge user supplied options with defaults while keeping arrays deduplicated and translators
 * additive. This keeps cognitive overhead low even as the option surface grows.
 */
function mergeOptions(options: Options): ResolvedOptions {
  const mergedExtract: Required<ExtractOptions> = {
    ...DEFAULT_OPTIONS.extract,
    ...options.extract,
  };

  const markdownOptions = options.markdown ?? {};
  const mergedMarkdown: Required<MarkdownOptions> = {
    ...DEFAULT_OPTIONS.markdown,
    ...markdownOptions,
    ignoreTags: uniqStrings(DEFAULT_OPTIONS.markdown.ignoreTags, markdownOptions.ignoreTags),
    blockTags: uniqStrings(DEFAULT_OPTIONS.markdown.blockTags, markdownOptions.blockTags),
    textReplacements: [
      ...(DEFAULT_OPTIONS.markdown.textReplacements ?? []),
      ...(markdownOptions.textReplacements ?? []),
    ],
    translators: {
      ...(DEFAULT_OPTIONS.markdown.translators ?? {}),
      ...(markdownOptions.translators ?? {}),
    },
  };

  return {
    extract: mergedExtract,
    markdown: mergedMarkdown,
    llm: {
      ...DEFAULT_OPTIONS.llm,
      ...options.llm,
    },
    telemetry: options.telemetry ?? DEFAULT_OPTIONS.telemetry,
  };
}

/** Case-insensitive union helper for tag name lists. */
function uniqStrings(defaults: string[], extra: string[] | undefined): string[] {
  const values = new Set<string>();
  for (const item of defaults) {
    values.add(item.toLowerCase());
  }
  if (extra) {
    for (const item of extra) {
      values.add(item.toLowerCase());
    }
  }
  return Array.from(values);
}

function computeHash(markdown: string): string {
  return createHash("sha256").update(markdown).digest("hex");
}
