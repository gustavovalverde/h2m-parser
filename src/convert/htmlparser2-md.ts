/**
 * Streaming HTML → Markdown renderer. Keeps logic linear, easy to inspect, and customisable via
 * tag translators inspired by node-html-markdown while staying TypeScript-friendly.
 */

import { performance } from "node:perf_hooks";
import { Parser } from "htmlparser2";
import type {
  HtmlElementNode,
  HtmlNode,
  HtmlTextNode,
  MarkdownOptions,
  MarkdownResult,
  TagTranslator,
  TagTranslatorContext,
  Telemetry,
} from "../types";

const DEFAULT_OPTIONS: Required<MarkdownOptions> = {
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
};

const LINE_BREAK_RE = /\r?\n/;
const CODE_LANGUAGE_RE = /language-([\w+-]+)/i;
const MULTISPACE_RE = /\s+/g;
const EXCESS_NEWLINES_RE = /\n{3,}/g;
const TRAILING_SPACE_RE = /[ \t]+\n/g;
const CODE_BLOCK_RE = /```[\s\S]+?```/g;
const NON_WORD_RE = /[^\w\s]/g;
const WORD_SPLIT_RE = /\s+/;

// Pre-allocated buffer size
const INITIAL_BUFFER_SIZE = 4096;

const ALWAYS_IGNORED_TAGS = [
  "script",
  "style",
  "noscript",
  "template",
  "head",
  "meta",
  "link",
  "iframe",
  "object",
  "embed",
];

type NodeFrame = {
  element: HtmlElementNode | null;
  skipped: boolean;
};

interface RenderState {
  buffer: string[];
  bufferIndex: number;
  options: Required<MarkdownOptions>;
  listStack: Array<{ type: "ul" | "ol"; index: number }>;
  footnotes: Array<{ index: number; href: string; title?: string; text?: string }>;
  referenceLinks: Map<string, { index: number; href: string; title?: string }>;
  translators: Map<string, TagTranslator>;
  blockTags: Set<string>;
  ignoreTags: Set<string>;
  textReplacements: Array<{ pattern: RegExp; replacement: string }>;
  tagHandlers: Map<
    string,
    (element: HtmlElementNode, state: RenderState, context: RenderContext) => void
  >;
}

interface RenderContext {
  inline: boolean;
  listDepth: number;
  blockquoteDepth: number;
}

function parseHtmlToNodes(html: string, ignoreTags: Set<string>): HtmlNode[] {
  const root: HtmlElementNode = {
    type: "tag",
    name: "#root",
    attribs: {},
    children: [],
    parent: null,
  };

  const stack: NodeFrame[] = [{ element: root, skipped: false }];
  let skipDepth = 0;

  const parser = new Parser(
    {
      onopentag(name, attribs) {
        const lower = name.toLowerCase();
        const shouldSkip = skipDepth > 0 || ignoreTags.has(lower);

        if (shouldSkip) {
          skipDepth += 1;
          stack.push({ element: null, skipped: true });
          return;
        }

        const frame = stack[stack.length - 1];
        const parent = frame?.element ?? root;
        const element: HtmlElementNode = {
          type: "tag",
          name: lower,
          attribs: { ...attribs },
          children: [],
          parent: parent.name === "#root" ? null : parent,
        };
        parent.children.push(element);
        stack.push({ element, skipped: false });
      },
      ontext(data) {
        if (!data || skipDepth > 0) {
          return;
        }
        const frame = stack[stack.length - 1];
        const current = frame?.element ?? root;
        const last = current.children[current.children.length - 1];
        if (last && last.type === "text") {
          last.data += data;
        } else {
          current.children.push({ type: "text", data });
        }
      },
      onclosetag() {
        const frame = stack.pop();
        if (frame?.skipped) {
          skipDepth -= 1;
        }
      },
      oncomment() {
        // ignore comments entirely
      },
    },
    {
      decodeEntities: true,
      lowerCaseTags: false,
    },
  );

  parser.end(html);
  return root.children;
}

/**
 * Optimized HTML to Markdown converter with performance improvements:
 * - Pre-allocated buffer to reduce memory allocations
 * - Map-based tag handlers for O(1) lookup
 * - Minimized context object creation
 * - Batched string operations
 */
export function htmlToMarkdown(
  html: string,
  options: MarkdownOptions = {},
  telemetry?: Telemetry,
): MarkdownResult {
  const resolved = resolveOptions(options);
  const htmlBytes = Buffer.byteLength(html, "utf8");

  // Pre-allocate buffer
  const buffer = new Array(INITIAL_BUFFER_SIZE);

  const state: RenderState = {
    buffer,
    bufferIndex: 0,
    options: resolved,
    listStack: [],
    footnotes: [],
    referenceLinks: new Map(),
    translators: buildTranslatorMap(resolved.translators),
    blockTags: new Set(resolved.blockTags.map((tag) => tag.toLowerCase())),
    ignoreTags: new Set(resolved.ignoreTags.map((tag) => tag.toLowerCase())),
    textReplacements: resolved.textReplacements,
    tagHandlers: createTagHandlers(),
  };

  const telemetryEnabled = Boolean(telemetry);
  let parseStart = 0;
  if (telemetryEnabled) {
    parseStart = performance.now();
  }

  const rootNodes = parseHtmlToNodes(html, state.ignoreTags);

  if (telemetryEnabled) {
    telemetry?.({
      stage: "convert_parse",
      durationMs: performance.now() - parseStart,
      bytesIn: htmlBytes,
    });
  }

  let renderStart = 0;
  if (telemetryEnabled) {
    renderStart = performance.now();
  }
  for (let i = 0; i < rootNodes.length; i++) {
    renderNode(rootNodes[i], state, { inline: false, listDepth: 0, blockquoteDepth: 0 });
  }

  appendFootnotes(state);
  appendReferenceLinks(state);
  if (telemetryEnabled) {
    const renderDuration = performance.now() - renderStart;
    telemetry?.({
      stage: "convert_render",
      durationMs: renderDuration,
      bytesIn: htmlBytes,
    });
  }

  // Build final markdown from buffer
  let finalizeStart = 0;
  if (telemetryEnabled) {
    finalizeStart = performance.now();
  }
  const joined = state.buffer.slice(0, state.bufferIndex).join("");
  const markdown = postProcess(joined.trim(), resolved);
  if (telemetryEnabled) {
    const finalizeDuration = performance.now() - finalizeStart;
    telemetry?.({
      stage: "convert_postprocess",
      durationMs: finalizeDuration,
      bytesIn: Buffer.byteLength(joined, "utf8"),
      bytesOut: Buffer.byteLength(markdown, "utf8"),
    });
  }
  const wordCount = countWords(markdown);

  return {
    markdown,
    meta: {
      wordCount,
      linkFootnotes: state.footnotes.length
        ? state.footnotes.map((footnote) => footnote.href)
        : undefined,
    },
  };
}

function resolveOptions(options: MarkdownOptions): Required<MarkdownOptions> {
  const ignoreTags = options.ignoreTags ?? DEFAULT_OPTIONS.ignoreTags;
  const mergedIgnore = Array.from(new Set([...ignoreTags, ...ALWAYS_IGNORED_TAGS]));
  const blockTags = options.blockTags ?? DEFAULT_OPTIONS.blockTags;
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    textReplacements: options.textReplacements ?? DEFAULT_OPTIONS.textReplacements,
    translators: options.translators ?? DEFAULT_OPTIONS.translators,
    ignoreTags: mergedIgnore,
    blockTags,
  } satisfies Required<MarkdownOptions>;
}

function buildTranslatorMap(record: Record<string, TagTranslator>): Map<string, TagTranslator> {
  const map = new Map<string, TagTranslator>();
  for (const [key, translator] of Object.entries(record)) {
    const tokens = key
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
    for (const token of tokens) {
      map.set(token, translator);
    }
  }
  return map;
}

// Create tag handlers map for O(1) lookup
function createTagHandlers(): Map<
  string,
  (element: HtmlElementNode, state: RenderState, context: RenderContext) => void
> {
  const handlers = new Map<
    string,
    (element: HtmlElementNode, state: RenderState, context: RenderContext) => void
  >();

  // Block elements
  const blockHandler = (element: HtmlElementNode, state: RenderState, context: RenderContext) => {
    openBlock(state);
    renderChildren(element, state, { ...context, inline: true });
  };

  handlers.set("p", blockHandler);
  handlers.set("div", blockHandler);
  handlers.set("section", blockHandler);
  handlers.set("article", blockHandler);

  // Inline formatting
  const boldHandler = (element: HtmlElementNode, state: RenderState, context: RenderContext) => {
    write(state, "**");
    renderChildren(element, state, { ...context, inline: true });
    write(state, "**");
  };

  handlers.set("strong", boldHandler);
  handlers.set("b", boldHandler);

  const italicHandler = (element: HtmlElementNode, state: RenderState, context: RenderContext) => {
    write(state, "*");
    renderChildren(element, state, { ...context, inline: true });
    write(state, "*");
  };

  handlers.set("em", italicHandler);
  handlers.set("i", italicHandler);

  // Special elements
  handlers.set("br", (_element, state, _context) => write(state, "\n"));
  handlers.set("hr", (_element, state, _context) => {
    openBlock(state);
    write(state, "---\n\n");
  });

  handlers.set("code", (element, state, context) => {
    const parent = element.parent;
    if (parent && parent.name === "pre") {
      renderChildren(element, state, { ...context, inline: true });
    } else {
      write(state, "`");
      renderChildren(element, state, { ...context, inline: true });
      write(state, "`");
    }
  });

  handlers.set("pre", (element, state, _context) => {
    const code = collectText(element).trimEnd();
    const language = detectLanguage(element);
    openBlock(state);
    write(state, `${state.options.codeFence}${language}\n${code}\n${state.options.codeFence}\n\n`);
  });

  handlers.set("blockquote", (element, state, context) => {
    openBlock(state);
    renderBlockQuote(element, state, {
      inline: false,
      listDepth: context.listDepth,
      blockquoteDepth: context.blockquoteDepth + 1,
    });
  });

  handlers.set("ul", (element, state, context) => {
    state.listStack.push({ type: "ul", index: 0 });
    renderChildren(element, state, {
      inline: false,
      listDepth: context.listDepth + 1,
      blockquoteDepth: context.blockquoteDepth,
    });
    state.listStack.pop();
  });

  handlers.set("ol", (element, state, context) => {
    state.listStack.push({ type: "ol", index: 0 });
    renderChildren(element, state, {
      inline: false,
      listDepth: context.listDepth + 1,
      blockquoteDepth: context.blockquoteDepth,
    });
    state.listStack.pop();
  });

  handlers.set("li", renderListItem);

  // Headings
  for (let level = 1; level <= 6; level++) {
    handlers.set(`h${level}`, (element, state, context) => {
      openBlock(state);
      const hashes = "#".repeat(level);
      const trailingSpace = state.options.headingSpace ? " " : "";
      write(state, `${hashes}${trailingSpace}`);
      renderChildren(element, state, { ...context, inline: true });
      write(state, "\n\n");
    });
  }

  handlers.set("a", renderLink);
  handlers.set("img", renderImage);
  handlers.set("figure", renderFigure);
  handlers.set("figcaption", (element, state, context) => {
    openBlock(state);
    write(state, "*");
    renderChildren(element, state, { ...context, inline: true });
    write(state, "*\n\n");
  });
  handlers.set("table", renderTable);

  return handlers;
}

// Optimized write function
function write(state: RenderState, text: string): void {
  if (state.bufferIndex >= state.buffer.length) {
    // Grow buffer if needed
    const newBuffer = new Array(state.buffer.length * 2);
    for (let i = 0; i < state.bufferIndex; i++) {
      newBuffer[i] = state.buffer[i];
    }
    state.buffer = newBuffer;
  }
  state.buffer[state.bufferIndex++] = text;
}

function renderNode(
  node: HtmlNode | null | undefined,
  state: RenderState,
  context: RenderContext,
): void {
  if (!node) {
    return;
  }
  if (isElementNode(node)) {
    renderElement(node, state, context);
  } else if (isTextNode(node)) {
    renderText(node, state, context);
  }
}

function renderElement(element: HtmlElementNode, state: RenderState, context: RenderContext): void {
  const tag = element.name.toLowerCase();

  if (state.ignoreTags.has(tag)) {
    return;
  }

  const translator = state.translators.get(tag);
  if (translator) {
    const translatorContext = createTranslatorContext(element, state, context);
    translator(translatorContext, () => defaultRenderElement(element, state, context));
    return;
  }

  defaultRenderElement(element, state, context);
}

function defaultRenderElement(
  element: HtmlElementNode,
  state: RenderState,
  context: RenderContext,
): void {
  const tag = element.name.toLowerCase();

  if (state.blockTags.has(tag)) {
    openBlock(state);
  }

  // Use O(1) handler lookup
  const handler = state.tagHandlers.get(tag);
  if (handler) {
    handler(element, state, context);
  } else {
    renderChildren(element, state, context);
  }
}

function renderChildren(
  element: HtmlElementNode,
  state: RenderState,
  context: RenderContext,
): void {
  const children = element.children ?? [];
  for (let i = 0; i < children.length; i++) {
    renderNode(children[i], state, context);
  }
}

function renderText(node: HtmlTextNode, state: RenderState, context: RenderContext): void {
  let value = normalizeWhitespace(node.data, context.inline);
  if (!value) {
    return;
  }
  for (const { pattern, replacement } of state.textReplacements) {
    value = value.replace(pattern, replacement);
  }
  write(state, value);
}

function renderListItem(
  element: HtmlElementNode,
  state: RenderState,
  context: RenderContext,
): void {
  const listInfo = state.listStack[state.listStack.length - 1];
  if (!listInfo) {
    renderChildren(element, state, context);
    return;
  }

  listInfo.index += 1;
  const marker = listInfo.type === "ul" ? state.options.bullet : `${listInfo.index}.`;
  const indent = "  ".repeat(Math.max(0, context.listDepth - 1));

  openBlock(state);
  write(state, `${indent}${marker} `);

  const bufferBefore = state.bufferIndex;
  renderChildren(element, state, {
    inline: true,
    listDepth: context.listDepth,
    blockquoteDepth: context.blockquoteDepth,
  });

  if (state.bufferIndex === bufferBefore) {
    write(state, "\n");
  } else {
    const lastIndex = state.bufferIndex - 1;
    if (lastIndex >= 0) {
      const lastValue = state.buffer[lastIndex] ?? "";
      if (!lastValue.endsWith("\n")) {
        write(state, "\n");
      }
    }
  }
}

function renderBlockQuote(
  element: HtmlElementNode,
  state: RenderState,
  context: RenderContext,
): void {
  // Use temporary buffer
  const previousBuffer = state.buffer;
  const previousIndex = state.bufferIndex;
  const tempBuffer = new Array(256);

  state.buffer = tempBuffer;
  state.bufferIndex = 0;

  renderChildren(element, state, context);

  const content = tempBuffer.slice(0, state.bufferIndex).join("").trimEnd();

  // Restore original buffer
  state.buffer = previousBuffer;
  state.bufferIndex = previousIndex;

  if (!content) {
    write(state, ">\n\n");
    return;
  }

  const lines = content.split(LINE_BREAK_RE);
  const prefix = "> ".repeat(context.blockquoteDepth);
  for (let i = 0; i < lines.length; i++) {
    write(state, `${prefix + lines[i]}\n`);
  }
  write(state, "\n");
}

function renderLink(element: HtmlElementNode, state: RenderState, context: RenderContext): void {
  const href = element.attribs?.href ?? "";
  const title = element.attribs?.title;
  const textContent = collectText(element).trim() || href;

  if (!href) {
    renderChildren(element, state, { ...context, inline: true });
    return;
  }

  const angleBracketCandidate =
    state.options.angleBracketLinks && textContent === href && state.options.linkStyle === "inline";

  if (state.options.linkStyle === "footnote") {
    const existing = state.footnotes.find(
      (note) => note.href === href && note.text === textContent,
    );
    const footnote = existing ?? createFootnote(state, href, title, textContent);
    renderChildren(element, state, { ...context, inline: true });
    write(state, `[^${footnote.index}]`);
    return;
  }

  if (state.options.useReferenceLinks) {
    const key = `${href}|${title ?? ""}`;
    let definition = state.referenceLinks.get(key);
    if (!definition) {
      definition = { index: state.referenceLinks.size + 1, href, title };
      state.referenceLinks.set(key, definition);
    }
    renderChildren(element, state, { ...context, inline: true });
    write(state, `[${textContent}][${definition.index}]`);
    return;
  }

  if (angleBracketCandidate) {
    write(state, `<${href}>`);
    return;
  }

  write(state, "[");
  // Save current buffer position to trim whitespace
  const startPos = state.bufferIndex;
  renderChildren(element, state, { ...context, inline: true });
  // Trim leading and trailing whitespace from the link text
  if (state.bufferIndex > startPos) {
    // Trim leading whitespace
    if (startPos < state.bufferIndex) {
      const firstValue = state.buffer[startPos] ?? "";
      state.buffer[startPos] = firstValue.trimStart();
    }
    // Trim trailing whitespace
    if (state.bufferIndex > 0) {
      const lastIndex = state.bufferIndex - 1;
      const lastValue = state.buffer[lastIndex] ?? "";
      state.buffer[lastIndex] = lastValue.trimEnd();
    }
  }
  const titlePart = title ? ` "${escapeTitle(title)}"` : "";
  write(state, `](${href}${titlePart})`);
}

function renderImage(element: HtmlElementNode, state: RenderState, _context: RenderContext): void {
  const src = element.attribs?.src;
  if (!src) {
    return;
  }
  const alt = element.attribs?.alt ?? "";
  const title = element.attribs?.title ? ` "${escapeTitle(element.attribs.title)}"` : "";
  openBlock(state);
  write(state, `![${escapeText(alt)}](${src}${title})\n\n`);
}

function renderFigure(element: HtmlElementNode, state: RenderState, context: RenderContext): void {
  const children = element.children ?? [];
  const img = children.find(
    (child): child is HtmlElementNode => isElementNode(child) && child.name === "img",
  );
  const caption = children.find(
    (child): child is HtmlElementNode => isElementNode(child) && child.name === "figcaption",
  );

  if (img) {
    renderImage(img, state, context);
  }
  if (caption) {
    openBlock(state);
    write(state, "*");
    renderChildren(caption, state, { ...context, inline: true });
    write(state, "*\n\n");
  }
}

function renderTable(element: HtmlElementNode, state: RenderState, _context: RenderContext): void {
  const rows = collectElements(element, "tr");
  if (!rows.length) {
    write(state, "_Table omitted:_ (no rows)\n\n");
    return;
  }

  const headerCells = rows.find((row) =>
    row.children?.some((cell) => isElementNode(cell) && cell.name === "th"),
  );
  const firstRow = rows[0];
  if (!firstRow) {
    return;
  }
  const headerContent = headerCells ?? firstRow;
  const headers = (headerContent.children ?? [])
    .filter(
      (child): child is HtmlElementNode =>
        isElementNode(child) && (child.name === "th" || child.name === "td"),
    )
    .map((cell) => collectText(cell).trim() || " ");

  const bodyRows = rows
    .filter((row) => row !== headerContent)
    .map((row) =>
      (row.children ?? [])
        .filter(
          (child): child is HtmlElementNode =>
            isElementNode(child) && (child.name === "td" || child.name === "th"),
        )
        .map((cell) => collectText(cell).trim()),
    );

  write(state, `| ${headers.join(" | ")} |\n`);
  write(state, `| ${headers.map(() => "---").join(" | ")} |\n`);
  bodyRows.forEach((row) => {
    const padded = [...row];
    while (padded.length < headers.length) {
      padded.push("");
    }
    write(state, `| ${padded.join(" | ")} |\n`);
  });
  write(state, "\n");
}

function collectElements(root: HtmlElementNode, tagName: string): HtmlElementNode[] {
  const matches: HtmlElementNode[] = [];
  const children = root.children ?? [];
  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];
    if (!childNode || !isElementNode(childNode)) {
      continue;
    }
    const elementChild = childNode;
    if (elementChild.name === tagName) {
      matches.push(elementChild);
    }
    matches.push(...collectElements(elementChild, tagName));
  }
  return matches;
}

function collectText(element: HtmlElementNode): string {
  let result = "";
  const children = element.children ?? [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!child) {
      continue;
    }
    if (isElementNode(child)) {
      result += collectText(child);
    } else if (isTextNode(child)) {
      result += child.data;
    }
  }
  return result;
}

function detectLanguage(element: HtmlElementNode): string {
  const children = element.children ?? [];
  const codeNode = children.find(
    (child): child is HtmlElementNode => isElementNode(child) && child.name === "code",
  );
  if (!codeNode) {
    return "";
  }
  const classAttr = codeNode.attribs?.class ?? "";
  const match = classAttr.match(CODE_LANGUAGE_RE);
  const language = match?.[1];
  return language ? language.toLowerCase() : "";
}

function escapeTitle(title: string): string {
  return title.replace(/"/g, '\\"');
}

function escapeText(text: string): string {
  return text.replace(/([*_`[\]])/g, "\\$1");
}

function normalizeWhitespace(text: string, inline: boolean): string {
  const collapsed = text.replace(MULTISPACE_RE, " ");
  if (!inline) {
    return collapsed.trim();
  }
  return collapsed;
}

function ensureTrailingBlankLine(state: RenderState): void {
  if (state.bufferIndex === 0) {
    write(state, "\n\n");
    return;
  }
  const lastIndex = state.bufferIndex - 1;
  const last = state.buffer[lastIndex] ?? "";
  if (!last.endsWith("\n\n")) {
    if (!last.endsWith("\n")) {
      write(state, "\n");
    }
    write(state, "\n");
  }
}

function openBlock(state: RenderState): void {
  if (state.bufferIndex === 0) {
    return;
  }
  const lastIndex = state.bufferIndex - 1;
  const last = state.buffer[lastIndex] ?? "";
  if (!last.endsWith("\n\n")) {
    write(state, "\n\n");
  }
}

function createFootnote(
  state: RenderState,
  href: string,
  title: string | undefined,
  text: string | undefined,
): { index: number; href: string; title?: string; text?: string } {
  const footnote = {
    index: state.footnotes.length + 1,
    href,
    title,
    text,
  };
  state.footnotes.push(footnote);
  return footnote;
}

function appendFootnotes(state: RenderState): void {
  if (!state.footnotes.length) {
    return;
  }
  write(state, "\n");
  state.footnotes.forEach((footnote) => {
    write(state, `[^${footnote.index}]: ${footnote.href}`);
    if (footnote.title) {
      write(state, ` — ${footnote.title}`);
    }
    write(state, "\n");
  });
}

function appendReferenceLinks(state: RenderState): void {
  if (!state.referenceLinks.size) {
    return;
  }
  write(state, "\n\n");
  const entries = Array.from(state.referenceLinks.values()).sort((a, b) => a.index - b.index);
  entries.forEach((definition) => {
    const title = definition.title ? ` "${escapeTitle(definition.title)}"` : "";
    write(state, `[${definition.index}]: ${definition.href}${title}\n`);
  });
}

function postProcess(markdown: string, options: Required<MarkdownOptions>): string {
  const cleaned = markdown
    .replace(EXCESS_NEWLINES_RE, "\n\n")
    .replace(TRAILING_SPACE_RE, "\n")
    .trimEnd();

  if (options.softWrap && typeof options.softWrap === "number") {
    return applySoftWrap(cleaned, options.softWrap);
  }
  return cleaned;
}

function applySoftWrap(text: string, width: number): string {
  return text
    .split("\n")
    .map((line) => wrapLine(line, width))
    .join("\n");
}

function wrapLine(line: string, width: number): string {
  if (!width || line.length <= width) {
    return line;
  }
  const words = line.split(" ");
  const wrapped: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current.length) {
      current = word;
      continue;
    }
    if (`${current} ${word}`.length > width) {
      wrapped.push(current);
      current = word;
    } else {
      current += ` ${word}`;
    }
  }
  if (current) {
    wrapped.push(current);
  }
  return wrapped.join("\n");
}

function countWords(markdown: string): number {
  const tokens = markdown
    .replace(CODE_BLOCK_RE, "")
    .replace(NON_WORD_RE, " ")
    .trim()
    .split(WORD_SPLIT_RE)
    .filter(Boolean);
  return tokens.length;
}

function isElementNode(node: HtmlNode): node is HtmlElementNode {
  return typeof node === "object" && node !== null && node.type === "tag";
}

function isTextNode(node: HtmlNode): node is HtmlTextNode {
  return typeof node === "object" && node !== null && node.type === "text";
}

function createTranslatorContext(
  node: HtmlElementNode,
  state: RenderState,
  context: RenderContext,
): TagTranslatorContext {
  return {
    node,
    options: state.options,
    meta: {
      listDepth: context.listDepth,
      blockquoteDepth: context.blockquoteDepth,
    },
    renderChildren: (opts) => {
      renderChildren(node, state, {
        inline: opts?.inline ?? context.inline,
        listDepth: context.listDepth,
        blockquoteDepth: context.blockquoteDepth,
      });
    },
    write: (text: string) => {
      write(state, text);
    },
    openBlock: () => openBlock(state),
    closeBlock: () => ensureTrailingBlankLine(state),
  };
}
