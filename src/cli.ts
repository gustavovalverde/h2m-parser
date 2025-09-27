#!/usr/bin/env node
/**
 * Minimal CLI wrapper around the h2m-parser pipeline. Keeps option parsing lightweight so contributors
 * can extend it without pulling in a heavy argument parser.
 */

import process, { stdin } from "node:process";
import { H2MParser } from "./index";
import type { Options } from "./types";

interface CliOptions {
  url?: string;
  keepFigures?: boolean;
  resolveRelativeUrls?: boolean;
  linkStyle?: "inline" | "footnote";
  frontMatter?: boolean;
  addHash?: boolean;
  chunk?: number;
  overlap?: number;
  printMeta?: boolean;
  help?: boolean;
}

async function main(): Promise<void> {
  try {
    const cliOptions = parseArgs(process.argv.slice(2));
    if (cliOptions.help) {
      printHelp();
      return;
    }

    const baseUrl = cliOptions.url ?? "about:blank";
    const html = await readStdin();
    if (!html.trim()) {
      throw new Error("No HTML found on stdin. Pipe a document into the CLI.");
    }

    const extractOptions: Options["extract"] = {};
    if (cliOptions.keepFigures) {
      extractOptions.keepFigures = true;
    }
    if (cliOptions.resolveRelativeUrls === false) {
      extractOptions.resolveRelativeUrls = false;
    }

    const markdownOptions: Options["markdown"] = { bullet: "-" };
    if (cliOptions.linkStyle) {
      markdownOptions.linkStyle = cliOptions.linkStyle;
    }

    const llmOptions: Options["llm"] = {};
    if (cliOptions.frontMatter === false) {
      llmOptions.frontMatter = false;
    }
    if (cliOptions.addHash) {
      llmOptions.addHash = true;
    }
    if (cliOptions.chunk) {
      llmOptions.chunk = {
        targetTokens: cliOptions.chunk,
        overlapTokens: cliOptions.overlap ?? Math.round(cliOptions.chunk * 0.1),
      };
    }

    const options: Options = {
      extract: extractOptions,
      markdown: markdownOptions,
      llm: llmOptions,
    };

    const converter = new H2MParser(options);
    const result = await converter.process(html, baseUrl, { sourceUrl: baseUrl });
    process.stdout.write(result.markdown.trimEnd());
    process.stdout.write("\n");

    if (cliOptions.printMeta) {
      process.stderr.write(`${JSON.stringify(result.meta, null, 2)}\n`);
    }
  } catch (error) {
    process.stderr.write(`h2m: ${(error as Error).message}\n`);
    process.exitCode = 1;
  }
}

/** Lightweight argv parser tailored for our limited flag set. */
function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (typeof arg !== "string" || !arg) {
      continue;
    }
    switch (arg) {
      case "--url":
      case "-u":
        index += 1;
        options.url = expectValue(argv, index, arg);
        break;
      case "--keep-figures":
        options.keepFigures = true;
        break;
      case "--no-resolve-relative-urls":
        options.resolveRelativeUrls = false;
        break;
      case "--link-style":
        index += 1;
        options.linkStyle = parseLinkStyle(expectValue(argv, index, arg));
        break;
      case "--no-front-matter":
        options.frontMatter = false;
        break;
      case "--hash":
        options.addHash = true;
        break;
      case "--chunk":
        index += 1;
        options.chunk = parsePositiveInteger(expectValue(argv, index, arg), "--chunk");
        break;
      case "--overlap":
        index += 1;
        options.overlap = parsePositiveInteger(expectValue(argv, index, arg), "--overlap");
        break;
      case "--meta":
        options.printMeta = true;
        break;
      case "--help":
      case "-h":
        options.help = true;
        break;
      default:
        if (arg.startsWith("-")) {
          throw new Error(`Unknown option: ${arg}`);
        }
    }
  }
  return options;
}

/** Validate the link style flag while keeping nice error messages. */
function parseLinkStyle(value?: string): "inline" | "footnote" | undefined {
  if (!value) {
    return undefined;
  }
  if (value === "inline" || value === "footnote") {
    return value;
  }
  throw new Error(`Unsupported link style: ${value}`);
}

function parsePositiveInteger(value: string | undefined, flag: string): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Expected a positive integer for ${flag}`);
  }
  return parsed;
}

async function readStdin(): Promise<string> {
  if (stdin.isTTY) {
    return "";
  }
  // Buffer stdin manually so we can accept both string and Buffer chunks.
  const chunks: Buffer[] = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function printHelp(): void {
  const usage =
    `h2m - HTML to Markdown parser\n\n` +
    `Usage: cat page.html | h2m --url https://example.com > page.md\n\n` +
    `Options:\n` +
    `  -u, --url <url>                Base URL for resolving relative links (default: about:blank)\n` +
    `      --keep-figures            Preserve <figure> markup instead of dropping it\n` +
    `      --no-resolve-relative-urls  Skip resolving relative URLs\n` +
    `      --link-style <inline|footnote>  Emit links inline or as footnotes\n` +
    `      --no-front-matter         Skip YAML front matter\n` +
    `      --hash                    Include SHA-256 content hash in metadata\n` +
    `      --chunk <tokens>          Enable heading-aware chunking with the given token budget\n` +
    `      --overlap <tokens>        Chunk overlap (defaults to 10% of chunk size)\n` +
    `      --meta                    Print metadata to stderr\n` +
    `  -h, --help                    Show this message\n`;
  process.stdout.write(usage);
}

function expectValue(args: string[], index: number, flag: string): string {
  const value = args[index];
  if (typeof value !== "string" || !value) {
    throw new Error(`Expected a value after ${flag}`);
  }
  return value;
}

void main();
