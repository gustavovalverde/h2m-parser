import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { H2MParser } from "../src";

const FIXTURES_DIR = join(process.cwd(), "tests", "fixtures");

/**
 * Lightweight smoke tests that ensure every HTML fixture we benchmark against can be
 * processed by a single shared h2m-parser instance without throwing. This helps us catch
 * regressions in the extraction or conversion stages that benchmarks alone might miss.
 */
const SMOKE_TIMEOUT_MS = 60_000;

describe("fixtures smoke", () => {
  test(
    "processes every HTML fixture without throwing",
    async () => {
      const entries = await readdir(FIXTURES_DIR);
      const htmlFiles = entries.filter((file) => file.endsWith(".html")).sort();

      expect(htmlFiles.length).toBeGreaterThan(0);

      const converter = new H2MParser();

      for (const file of htmlFiles) {
        // biome-ignore lint/performance/noAwaitInLoops: sequential processing keeps memory usage predictable for the full fixture corpus
        const html = await readFile(join(FIXTURES_DIR, file), "utf8");
        const result = await converter.process(html, `https://fixture.local/${file}`);

        expect(typeof result.markdown).toBe("string");
        expect(result.markdown.length).toBeGreaterThan(0);
        expect(result.meta).toBeDefined();
      }
    },
    SMOKE_TIMEOUT_MS,
  );
});
