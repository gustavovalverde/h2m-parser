/**
 * Shared type definitions for h2m-parser's extraction, conversion, and post-processing stages.
 * The goal is to expose a compact option surface that still guides newcomers toward safe usage.
 */

/** Markdown link rendering style. */
export type LinkStyle = "inline" | "footnote";

export interface ExtractOptions {
  /** Enable Mozilla Readability for article extraction. Default: true */
  readability?: boolean;
  /** Remove <figure> nodes unless true */
  keepFigures?: boolean;
  /** Resolve relative URLs to absolute using the provided base URL */
  resolveRelativeUrls?: boolean;
  /** Strip common tracking query params like utm_* */
  stripTrackingParams?: boolean;
  /** Keep images with data: URIs instead of dropping them */
  keepDataImages?: boolean;
}

export interface MarkdownOptions {
  /** Bullet marker used for unordered lists. */
  bullet?: "-" | "*" | "+";
  /** Whether to add a space between hash marks and heading text. */
  headingSpace?: boolean;
  linkStyle?: LinkStyle;
  codeFence?: string;
  softWrap?: number | false;
  maxConsecutiveBlankLines?: number;
  /** Element names that should be dropped entirely (no children traversed). */
  ignoreTags?: string[];
  /** Element names that should be treated as block-level with blank lines around them. */
  blockTags?: string[];
  /** Render bare URLs with angle brackets when possible. */
  angleBracketLinks?: boolean;
  /** Emit shared reference link definitions instead of inline links. */
  useReferenceLinks?: boolean;
  /** Regex based replacements applied to text nodes before rendering. */
  textReplacements?: Array<{
    pattern: RegExp;
    replacement: string;
  }>;
  /** Optional per-tag translator overrides. */
  translators?: Record<string, TagTranslator>;
}

export interface ChunkConfig {
  targetTokens: number;
  overlapTokens: number;
}

export interface LlmOptions {
  frontMatter?: boolean;
  addHash?: boolean;
  chunk?: ChunkConfig | false;
}

export type TelemetryStage =
  | "extract"
  | "convert"
  | "convert_parse"
  | "convert_render"
  | "convert_postprocess"
  | "post"
  | "chunk"
  | "total";

export interface TelemetryEvent {
  stage: TelemetryStage;
  durationMs: number;
  bytesIn?: number;
  bytesOut?: number;
}

export type Telemetry = (event: TelemetryEvent) => void;

/** Translator metadata passed alongside the HTML node during rendering. */
export interface TranslatorMeta {
  listDepth: number;
  blockquoteDepth: number;
}

/**
 * Context provided to tag translators. Translators are free to call `next` (within the handler) to
 * fallback to the default behaviour, or skip it to fully override rendering.
 */
export interface HtmlTextNode {
  type: "text";
  data: string;
}

export interface HtmlElementNode {
  type: "tag";
  name: string;
  attribs: Record<string, string>;
  children: HtmlNode[];
  parent?: HtmlElementNode | null;
}

export type HtmlNode = HtmlElementNode | HtmlTextNode;

export interface TagTranslatorContext {
  node: HtmlElementNode;
  options: Required<MarkdownOptions>;
  meta: TranslatorMeta;
  renderChildren: (options?: { inline?: boolean }) => void;
  write: (text: string) => void;
  openBlock: () => void;
  closeBlock: () => void;
}

/** Function signature for a custom translator. Call `next()` to invoke the default renderer. */
export type TagTranslator = (context: TagTranslatorContext, next: () => void) => void;

export interface Options {
  extract?: ExtractOptions;
  markdown?: MarkdownOptions;
  llm?: LlmOptions;
  telemetry?: Telemetry;
}

export interface ExtractedContent {
  /** Sanitised HTML fragment returned from Readability. */
  contentHtml: string;
  meta: {
    title?: string;
    byline?: string;
    lang?: string;
    length?: number;
  };
}

export interface MarkdownResult {
  /** Final Markdown string (without front matter). */
  markdown: string;
  meta: {
    wordCount: number;
    linkFootnotes?: string[];
  };
}

export interface ConvertMeta {
  title?: string;
  byline?: string;
  lang?: string;
  sourceUrl?: string;
  retrievedAt?: string;
  bytes?: number;
  contentHash?: string;
  hashAlgorithm?: "sha256";
  wordCount?: number;
}

export interface ConvertResult {
  markdown: string;
  meta: ConvertMeta;
  chunks?: string[];
}

export interface ProcessOptions {
  html: string;
  baseUrl: string;
  meta?: Partial<ConvertMeta>;
}
