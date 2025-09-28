import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("bench runner", () => {
  it("supports reuse and fresh instance modes", async () => {
    const dir = await mkdtemp(join(tmpdir(), "h2m-runner-"));
    try {
      const fixturePath = join(dir, "sample.html");
      await writeFile(fixturePath, "<article><h1>Title</h1><p>Body</p></article>", "utf8");

      const baseArgs = [
        "bench/runner.js",
        "--dataset",
        dir,
        "--repeats",
        "1",
        "--concurrency",
        "1",
        "--max-files",
        "1",
        "--no-progress",
        "--no-readability",
      ];

      const reuse = spawnSync("node", [...baseArgs, "--instance-mode", "reuse"], {
        encoding: "utf8",
      });
      expect(reuse.status).toBe(0);

      const fresh = spawnSync("node", [...baseArgs, "--instance-mode", "fresh"], {
        encoding: "utf8",
      });
      expect(fresh.status).toBe(0);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 20000);
});
