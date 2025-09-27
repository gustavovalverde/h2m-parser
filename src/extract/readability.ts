/**
 * Readability-based extraction stage. Normalises HTML before the Markdown renderer sees it so that
 * the downstream pipeline can stay pure and predictable.
 */

import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";
import type { ExtractedContent, ExtractOptions } from "../types";

const TRACKING_PARAM_PREFIXES = ["utm_", "icid"];
const TRACKING_PARAM_EXACT = ["fbclid", "gclid", "yclid", "mc_cid", "mc_eid"];

type UrlAttribute = "href" | "src";

const URL_ATTR_SELECTORS: Array<[selector: string, attr: UrlAttribute]> = [
  ["a[href]", "href"],
  ["img[src]", "src"],
  ["link[href]", "href"],
  ["source[src]", "src"],
  ["video[src]", "src"],
];

const SRCSET_SELECTOR = "img[srcset], source[srcset]";
const SRCSET_SPLIT_RE = /\s+/;

/**
 * Run Mozilla Readability on an HTML document, removing noisy elements and optionally resolving
 * links. Returns a minimal fragment alongside metadata for front matter.
 */
export function extractArticle(
  html: string,
  baseUrl: string,
  options: ExtractOptions = {},
): ExtractedContent {
  const resolvedOptions = {
    readability: options.readability ?? true,
    keepFigures: options.keepFigures ?? false,
    resolveRelativeUrls: options.resolveRelativeUrls ?? true,
    stripTrackingParams: options.stripTrackingParams ?? true,
    keepDataImages: options.keepDataImages ?? false,
  } satisfies Required<
    Pick<
      ExtractOptions,
      "readability" | "keepFigures" | "resolveRelativeUrls" | "stripTrackingParams"
    > & {
      keepDataImages: boolean;
    }
  >;

  // Fast path: skip linkedom and Readability when disabled
  if (!resolvedOptions.readability) {
    return {
      contentHtml: html,
      meta: {
        length: html.length,
      },
    };
  }

  // Use linkedom instead of JSDOM for better performance
  const { document } = parseHTML(html);

  // Set the base URL for relative link resolution
  const hasBodyContent = document.body && document.body.childNodes.length > 0;

  if (baseUrl && document.head) {
    const base = document.createElement("base");
    base.href = baseUrl;
    document.head.appendChild(base);
  }

  const readability = new Readability(document, {
    nbTopCandidates: 10,
    keepClasses: true,
  });
  const article = readability.parse();
  const contentHtml = selectContentHtml(article?.content, document, hasBodyContent);
  const container = createContainer(contentHtml, document);

  stripUnwantedNodes(container, resolvedOptions);
  normalizeLinks(container, baseUrl, resolvedOptions);

  const cleanedHtml = container.innerHTML.trim();

  return {
    contentHtml: cleanedHtml,
    meta: {
      title: article?.title ?? document.title ?? undefined,
      byline: article?.byline ?? undefined,
      lang: article?.lang ?? document.documentElement.lang ?? undefined,
      length: cleanedHtml.length,
    },
  };
}

function selectContentHtml(
  articleContent: string | null | undefined,
  document: Document,
  hasBodyContent: boolean,
): string {
  const trimmed = typeof articleContent === "string" ? articleContent.trim() : "";
  if (trimmed.length > 0) {
    return trimmed;
  }

  if (hasBodyContent && document.body) {
    return document.body.innerHTML;
  }

  return document.toString();
}

function createContainer(contentHtml: string, sourceDocument: Document): Element {
  if (contentHtml.trim().length === 0) {
    return sourceDocument.createElement("div");
  }

  // Prefer cloning the existing body when the content came from it to preserve Linkedom internals.
  if (sourceDocument.body && sourceDocument.body.innerHTML === contentHtml) {
    return sourceDocument.body.cloneNode(true) as Element;
  }

  const wrappedHtml = `<!doctype html><html><body>${contentHtml}</body></html>`;
  const { document } = parseHTML(wrappedHtml);
  return document.body ?? document.createElement("div");
}

function stripUnwantedNodes(
  root: Element,
  options: Required<
    Pick<ExtractOptions, "keepFigures" | "resolveRelativeUrls" | "stripTrackingParams"> & {
      keepDataImages: boolean;
    }
  >,
): void {
  root.querySelectorAll("script, style, noscript").forEach((node) => {
    node.remove();
  });

  if (!options.keepFigures) {
    root.querySelectorAll("figure").forEach((figure) => {
      const figcaption = figure.querySelector("figcaption");
      if (figcaption) {
        const paragraph = figure.ownerDocument.createElement("p");
        paragraph.textContent = figcaption.textContent ?? "";
        figure.replaceWith(paragraph);
      } else {
        figure.remove();
      }
    });
  }

  if (!options.keepDataImages) {
    // Drop potentially large inline payloads unless explicitly requested.
    root.querySelectorAll('img[src^="data:"]').forEach((node) => {
      node.remove();
    });
  }
}

/** Resolve/clean href/src attributes across the fragment. */
function normalizeLinks(
  root: Element,
  baseUrl: string,
  options: Required<
    Pick<ExtractOptions, "keepFigures" | "resolveRelativeUrls" | "stripTrackingParams"> & {
      keepDataImages: boolean;
    }
  >,
): void {
  if (!options.resolveRelativeUrls && !options.stripTrackingParams) {
    return;
  }

  for (const [selector, attribute] of URL_ATTR_SELECTORS) {
    root.querySelectorAll<HTMLElement>(selector).forEach((node) => {
      const value = node.getAttribute(attribute);
      if (!value) {
        return;
      }
      const normalized = resolveUrl(value, baseUrl, options.stripTrackingParams);
      node.setAttribute(attribute, normalized);
    });
  }

  if (options.resolveRelativeUrls) {
    root.querySelectorAll<HTMLElement>(SRCSET_SELECTOR).forEach((node) => {
      const value = node.getAttribute("srcset");
      if (!value) {
        return;
      }
      const sources = value
        .split(",")
        .map((part) => part.trim())
        .map((part) => {
          const [urlRaw, descriptor] = part.split(SRCSET_SPLIT_RE, 2);
          if (!urlRaw) {
            return part;
          }
          const normalized = resolveUrl(urlRaw, baseUrl, options.stripTrackingParams);
          return descriptor ? `${normalized} ${descriptor}` : normalized;
        });
      node.setAttribute("srcset", sources.join(", "));
    });
  }
}

function resolveUrl(rawUrl: string, baseUrl: string, stripTracking: boolean): string {
  try {
    const resolved = new URL(rawUrl, baseUrl || undefined);
    if (stripTracking) {
      for (const key of Array.from(resolved.searchParams.keys())) {
        const lowerKey = key.toLowerCase();
        const hasTrackingPrefix = TRACKING_PARAM_PREFIXES.some((prefix) =>
          lowerKey.startsWith(prefix),
        );
        if (hasTrackingPrefix || TRACKING_PARAM_EXACT.includes(lowerKey)) {
          resolved.searchParams.delete(key);
        }
      }
    }
    return resolved.toString();
  } catch (_error) {
    return rawUrl;
  }
}
