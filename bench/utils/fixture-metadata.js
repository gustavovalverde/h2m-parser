import { promises as fs } from "node:fs";
import { basename, join } from "node:path";
import { URL } from "node:url";

const STRIP_SCRIPTS = /<script[\s\S]*?<\/script>/gi;
const STRIP_COMMENTS = /<!--.*?-->/gs;
const TITLE_RE = /<title[^>]*>([\s\S]*?)<\/title>/i;
const OG_URL_RE = /<meta[^>]+property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/i;
const CANONICAL_RE = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i;
const TABLE_RE = /<table\b/gi;
const LINK_RE = /<a\b/gi;
const SCRIPT_RE = /<script\b/gi;
const STRIP_STYLES = /<style[\s\S]*?<\/style>/gi;
const TAG_RE = /<[^>]+>/g;
const NON_WORD_RE = /[^\w\s]/g;

function extractHostname(raw) {
  if (!raw) {
    return undefined;
  }
  try {
    return new URL(raw).hostname || undefined;
  } catch {
    return undefined;
  }
}

export function describeHtml(html, baseUrl) {
  const scripts = (html.match(SCRIPT_RE) || []).length;

  const stripped = html.replace(STRIP_SCRIPTS, "").replace(STRIP_COMMENTS, "");
  const tables = (stripped.match(TABLE_RE) || []).length;
  const links = (stripped.match(LINK_RE) || []).length;

  const titleMatch = stripped.match(TITLE_RE);
  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : undefined;

  const text = stripped.replace(STRIP_STYLES, "").replace(TAG_RE, " ");
  const words = text.replace(NON_WORD_RE, " ").trim().split(/\s+/).filter(Boolean).length;

  let canonical = baseUrl;
  const ogUrlMatch = stripped.match(OG_URL_RE);
  if (ogUrlMatch) {
    canonical = ogUrlMatch[1];
  } else {
    const canonicalMatch = stripped.match(CANONICAL_RE);
    if (canonicalMatch) {
      canonical = canonicalMatch[1];
    }
  }

  const domain = extractHostname(canonical);

  return { title, domain, tables, links, scripts, words };
}

export async function describeFixture(path, baseUrl) {
  const html = await fs.readFile(path, "utf8");
  return describeHtml(html, baseUrl);
}

export async function describeFixtureFromBenchmark(entry, datasetDir) {
  const { filename } = entry;
  if (!filename) {
    return { tables: 0, links: 0, scripts: 0, words: 0 };
  }
  const normalized = filename.replace(/\.\.\.$/, "");
  const filePath = join(datasetDir, normalized);

  return {
    ...(await describeFixture(filePath, entry.source)),
    filename: basename(filePath),
  };
}
