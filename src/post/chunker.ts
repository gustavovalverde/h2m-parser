/**
 * Heading-aware chunker for LLM consumption. Keeps overlaps predictable without needing a full
 * tokeniser in simple scenarios.
 */

import type { ChunkConfig } from "../types";

const DOUBLE_NEWLINE_RE = /\n{2,}/g;
const HEADING_RE = /^#{1,6}\s/;

let tokenCounterPromise: Promise<(text: string) => number> | undefined;

/**
 * Split Markdown into roughly even token windows, reusing heading boundaries when possible.
 * We fall back to a string-length heuristic if js-tiktoken is unavailable.
 */
export async function chunkMarkdown(markdown: string, config: ChunkConfig): Promise<string[]> {
  if (!config.targetTokens || config.targetTokens <= 0) {
    return [markdown];
  }

  const counter = await getTokenCounter();
  const sections = await createSections(markdown, counter);
  if (!sections.length) {
    return [];
  }

  const chunks: string[] = [];
  let bucket: Section[] = [];
  let bucketTokens = 0;

  for (const section of sections) {
    const exceeds = bucketTokens + section.tokens > config.targetTokens;
    if (exceeds && bucket.length) {
      chunks.push(joinSections(bucket));
      const overlap = selectOverlap(bucket, config.overlapTokens);
      bucket = [...overlap];
      bucketTokens = overlap.reduce((total, item) => total + item.tokens, 0);
    }

    bucket.push(section);
    bucketTokens += section.tokens;
  }

  if (bucket.length) {
    chunks.push(joinSections(bucket));
  }

  return chunks.map((chunk) => chunk.trim()).filter(Boolean);
}

interface Section {
  text: string;
  tokens: number;
}

async function getTokenCounter(): Promise<(text: string) => number> {
  if (!tokenCounterPromise) {
    tokenCounterPromise = loadTokenizer();
  }
  return tokenCounterPromise;
}

async function loadTokenizer(): Promise<(text: string) => number> {
  try {
    const { encodingForModel } = await import("js-tiktoken");
    const encoding = encodingForModel("gpt-4o-mini");
    return (text: string) => {
      const tokens = encoding.encode(text);
      return tokens.length;
    };
  } catch {
    // Keep the API usable when the optional dependency is missing.
    return (text: string) => Math.max(1, Math.ceil(text.length / 4));
  }
}

async function createSections(
  markdown: string,
  counter: (text: string) => number,
): Promise<Section[]> {
  const rawSections = splitMarkdown(markdown);
  const sections: Section[] = [];
  for (const text of rawSections) {
    const cleaned = text.trim();
    if (!cleaned) {
      continue;
    }
    const tokens = counter(cleaned);
    sections.push({ text: cleaned, tokens });
  }
  return sections;
}

function splitMarkdown(markdown: string): string[] {
  const blocks = markdown
    .split(DOUBLE_NEWLINE_RE)
    .map((block) => block.trim())
    .filter(Boolean);

  const sections: string[] = [];
  let pendingHeading: string | null = null;

  for (const block of blocks) {
    if (HEADING_RE.test(block)) {
      if (pendingHeading) {
        sections.push(pendingHeading);
      }
      pendingHeading = block;
      continue;
    }

    if (pendingHeading) {
      sections.push(`${pendingHeading}\n\n${block}`);
      pendingHeading = null;
      continue;
    }

    sections.push(block);
  }

  if (pendingHeading) {
    sections.push(pendingHeading);
  }

  return sections;
}

function selectOverlap(sections: Section[], overlapTokens: number | undefined): Section[] {
  if (!overlapTokens || overlapTokens <= 0) {
    return [];
  }
  const selected: Section[] = [];
  let runningTotal = 0;
  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const section = sections[index];
    if (!section) {
      continue;
    }
    selected.unshift(section);
    runningTotal += section.tokens;
    if (runningTotal >= overlapTokens) {
      break;
    }
  }
  return selected;
}

function joinSections(sections: Section[]): string {
  return sections.map((section) => section.text).join("\n\n");
}
