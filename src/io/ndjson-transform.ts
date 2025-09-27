/**
 * Stream transformer that enriches micrawl NDJSON payloads with Markdown output. Designed to be
 * tolerant of malformed lines and to keep cognitive load low for consumers wiring up pipelines.
 */

import type { TransformCallback } from "node:stream";
import { Transform } from "node:stream";
import type { ConvertMeta, ConvertResult } from "../types";

type Processor = (
  html: string,
  baseUrl: string,
  meta?: Partial<ConvertMeta>,
) => Promise<ConvertResult>;

export interface NdjsonTransformConfig {
  /** Map NDJSON payloads to markdown using the provided processor */
  processor: Processor;
}

/** Factory helper so callers can pass a bound processor (e.g. `h2mParser.process`). */
export function createNdjsonTransform({ processor }: NdjsonTransformConfig): Transform {
  return new NdjsonTransform(processor);
}

class NdjsonTransform extends Transform {
  private buffer = "";

  constructor(private readonly processor: Processor) {
    super({ readableObjectMode: false, writableObjectMode: false });
  }

  override _transform(chunk: Buffer, _encoding: BufferEncoding, callback: TransformCallback): void {
    this.buffer += chunk.toString("utf8");
    const lines = this.buffer.split("\n");
    this.buffer = lines.pop() ?? "";

    // Defer async processing but preserve backpressure once the promise resolves.
    void this.processLines(lines).then(
      () => callback(),
      (error) => callback(error as Error),
    );
  }

  override _flush(callback: TransformCallback): void {
    if (!this.buffer.trim()) {
      callback();
      return;
    }
    void this.processLines([this.buffer])
      .then(() => {
        this.buffer = "";
        callback();
      })
      .catch((error) => callback(error as Error));
  }

  private async processLines(lines: string[]): Promise<void> {
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        this.push("\n");
        continue;
      }

      let payload: NdjsonPayload;
      try {
        payload = JSON.parse(line) as NdjsonPayload;
      } catch (_error) {
        this.push(`${line}\n`);
        continue;
      }

      const page = payload.data?.page;
      if (!page?.content) {
        this.push(`${JSON.stringify(payload)}\n`);
        continue;
      }

      const html = page.content;
      if (typeof html !== "string" || !html.trim()) {
        this.push(`${JSON.stringify(payload)}\n`);
        continue;
      }

      // Try to recover the canonical URL from multiple possible locations.
      const baseUrl: string =
        page.url ?? payload.data?.request?.url ?? payload.data?.job?.url ?? "";

      const meta: Partial<ConvertMeta> = {
        sourceUrl: baseUrl,
        retrievedAt: page.finishedAt ?? page.retrievedAt,
        bytes: typeof page.bytes === "number" ? page.bytes : Buffer.byteLength(html, "utf8"),
      };

      try {
        // biome-ignore lint/performance/noAwaitInLoops: sequential processing preserves NDJSON order
        const result = await this.processor(html, baseUrl, meta);
        page.markdown = result.markdown;
        page.meta = { ...page.meta, ...result.meta };
        if (result.chunks?.length) {
          page.chunks = result.chunks;
        }
      } catch (error) {
        page.markdownError = (error as Error).message;
      }

      this.push(`${JSON.stringify(payload)}\n`);
    }
  }
}

type NdjsonPayload = {
  status?: string;
  data?: {
    page?: {
      url?: string;
      content?: string;
      finishedAt?: string;
      retrievedAt?: string;
      bytes?: number;
      meta?: Record<string, unknown>;
      markdown?: string;
      markdownError?: string;
      chunks?: string[];
    };
    request?: { url?: string };
    job?: { url?: string };
  };
};
