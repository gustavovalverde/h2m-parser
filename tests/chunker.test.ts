import { describe, expect, it } from "vitest";
import { chunkMarkdown } from "../src/post/chunker";

const HEADING_ONE_RE = /Heading 1/;
const HEADING_THREE_RE = /Heading 3/;
const HEADING_FIVE_RE = /Heading 5/;

describe("chunkMarkdown", () => {
  it("produces multiple chunks with overlap", async () => {
    const markdown = Array.from(
      { length: 8 },
      (_, index) => `# Heading ${index + 1}\n\nParagraph ${index + 1}.`,
    ).join("\n\n");
    const chunks = await chunkMarkdown(markdown, { targetTokens: 40, overlapTokens: 10 });
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]).toMatch(HEADING_ONE_RE);
    expect(chunks[1]).toMatch(HEADING_THREE_RE);
    expect(chunks[1]).toMatch(HEADING_FIVE_RE);
  });

  it("returns original markdown when below threshold", async () => {
    const markdown = "# Title\n\nShort text.";
    const chunks = await chunkMarkdown(markdown, { targetTokens: 500, overlapTokens: 50 });
    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toContain("Short text");
  });
});
