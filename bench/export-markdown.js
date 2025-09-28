#!/usr/bin/env node
/**
 * Generate Markdown outputs for each fixture using multiple converters.
 * Creates per-library folders under bench/output/ for side-by-side comparison.
 */
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { join, parse, relative, resolve } from "node:path";
import { NodeHtmlMarkdown } from "node-html-markdown";
import TurndownService from "turndown";
import { H2MParser } from "../dist/index.mjs";

const DEFAULT_DATASET = join(process.cwd(), "tests", "fixtures");
const OUTPUT_ROOT = join(process.cwd(), "bench", "output");
const FILE_PROTOCOL = "file://";

const argv = process.argv.slice(2);
let datasetDir = DEFAULT_DATASET;

for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i];
  if (arg === "--") {
    continue;
  }
  switch (arg) {
    case "--dataset":
    case "-d":
      datasetDir = resolve(argv[++i] ?? DEFAULT_DATASET);
      break;
    case "--help":
    case "-h": {
      console.log(`Usage: node bench/export-markdown.js [--dataset <path>]

Generates Markdown output for each HTML file using multiple converters.
Results are stored under bench/output/<library>/`);
      process.exit(0);
      break;
    }
    default:
      throw new Error(`Unknown flag: ${arg}`);
  }
}

async function ensureDistBuilt() {
  const distPath = join(process.cwd(), "dist", "index.mjs");
  try {
    await stat(distPath);
  } catch (_error) {
    throw new Error("dist/index.mjs not found. Run `pnpm build` before exporting markdown.");
  }
}

async function collectHtmlFiles(root) {
  const resolved = resolve(root);
  const info = await stat(resolved);
  if (info.isFile()) {
    const content = await readFile(resolved, "utf8");
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => resolve(line));
  }

  const files = [];
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else if (/\.x?html?$/i.test(entry.name)) {
        files.push(entryPath);
      }
    }
  }
  await walk(resolved);
  return files.sort();
}

function createH2MParserInstance(options) {
  return new H2MParser(options);
}

async function main() {
  await ensureDistBuilt();
  const files = await collectHtmlFiles(datasetDir);
  if (!files.length) {
    console.log(`No HTML files found under ${datasetDir}`);
    return;
  }

  // Prepare converters
  const h2mParserStandard = createH2MParserInstance({
    llm: { frontMatter: true, addHash: false, chunk: false },
  });
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  const nodeHtmlMarkdown = new NodeHtmlMarkdown();

  const converters = [
    {
      name: "h2m-parser",
      description: "h2m-parser default pipeline",
      convert: async (html, baseUrl) => {
        const result = await h2mParserStandard.process(html, baseUrl);
        return result.markdown;
      },
    },
    {
      name: "turndown",
      description: "Turndown",
      convert: async (html) => turndown.turndown(html),
    },
    {
      name: "node-html-markdown",
      description: "node-html-markdown",
      convert: async (html) => nodeHtmlMarkdown.translate(html),
    },
  ];

  // Clean output root
  await rm(OUTPUT_ROOT, { recursive: true, force: true }).catch(() => {});

  console.log(`Exporting markdown for ${files.length} files...`);

  for (const converter of converters) {
    console.log(`\n> ${converter.description}`);
    const baseDir = join(OUTPUT_ROOT, converter.name);
    for (const file of files) {
      const relPath = relative(datasetDir, file);
      const parsed = parse(relPath);
      const outDir = join(baseDir, parsed.dir);
      await mkdir(outDir, { recursive: true });

      const html = await readFile(file, "utf8");
      const baseUrl = `${FILE_PROTOCOL}${resolve(file)}`;
      const markdown = await converter.convert(html, baseUrl);

      const outFile = join(outDir, `${parsed.name}.${converter.name}.md`);
      await writeFile(outFile, markdown, "utf8");
    }
    console.log(`  ✓ wrote outputs under ${join("bench", "output", converter.name)}`);
  }

  console.log("\nDone. Compare outputs in bench/output/<library>/");
}

main().catch((error) => {
  console.error("Export failed:", error.message);
  process.exitCode = 1;
});
