/** Build YAML front matter for downstream LLM consumers. */

import { stringify } from "yaml";
import type { ConvertMeta } from "../types";

/** Serialise the metadata object into YAML, skipping empty fields. */
export function buildFrontMatter(meta: ConvertMeta): string {
  const cleanMeta: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }
    // Preserve original key casing but avoid leaking falsy values.
    cleanMeta[key] = value;
  }

  if (!Object.keys(cleanMeta).length) {
    return "";
  }

  const yaml = stringify(cleanMeta, {
    indent: 2,
    lineWidth: 100,
    aliasDuplicateObjects: false,
    defaultStringType: "PLAIN",
  });

  return `---\n${yaml}---\n\n`;
}
