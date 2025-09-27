import { Readable, Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { describe, expect, it } from "vitest";
import { createH2MNdjsonTransform } from "../src";

describe("createH2MNdjsonTransform", () => {
  it("enriches NDJSON payloads with markdown", async () => {
    const payload = {
      status: "success",
      data: {
        page: {
          url: "https://example.com/post",
          content: "<h1>Title</h1><p>Hello world</p>",
          finishedAt: "2025-09-26T00:00:00.000Z",
        },
      },
    };
    const input = Readable.from([`${JSON.stringify(payload)}\n`]);
    const transform = createH2MNdjsonTransform();
    const chunks: string[] = [];
    const output = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk.toString("utf8"));
        callback();
      },
    });

    await pipeline(input, transform, output);
    const enriched = JSON.parse(chunks.join(""));
    expect(enriched.data.page.markdown).toContain("# Title");
    expect(enriched.data.page.meta.sourceUrl).toBe("https://example.com/post");
  });
});
