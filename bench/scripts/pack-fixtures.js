#!/usr/bin/env bun

/**
 * Bundle a fixture directory into a tar.gz archive that can be distributed outside of git.
 */

import { execFile } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

function parseArgs(argv) {
  const opts = {
    source: resolve(join(process.cwd(), "tests", "fixtures")),
    outDir: resolve(join(process.cwd(), "bench", "artifacts")),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--source":
      case "-s":
        opts.source = resolve(argv[++i] ?? opts.source);
        break;
      case "--out-dir":
      case "-o":
        opts.outDir = resolve(argv[++i] ?? opts.outDir);
        break;
      case "--help":
      case "-h": {
        console.log(`
Usage: node bench/scripts/pack-fixtures.js [options]

Options:
  --source, -s    Fixture directory to archive (default: tests/fixtures)
  --out-dir, -o   Destination directory for archives (default: bench/artifacts)
  --help, -h      Show this message

Example:
  node bench/scripts/pack-fixtures.js --source datasets/news-scrape --out-dir /tmp
`);
        process.exit(0);
        break;
      }
      default:
        throw new Error(`Unknown flag: ${arg}`);
    }
  }

  return opts;
}

async function tarDirectory(sourceDir, outputPath) {
  await new Promise((resolveTar, rejectTar) => {
    const child = execFile("tar", ["-czf", outputPath, "-C", sourceDir, "."], (error) => {
      if (error) {
        rejectTar(error);
      } else {
        resolveTar();
      }
    });

    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
  });
}

async function main() {
  const { source, outDir } = parseArgs(process.argv.slice(2));

  try {
    const info = await stat(source);
    if (!info.isDirectory()) {
      throw new Error(`${source} is not a directory`);
    }
  } catch (error) {
    console.error(`❌ Unable to read source directory: ${error.message}`);
    process.exit(1);
  }

  await mkdir(outDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const archiveName = `fixtures-${timestamp}.tar.gz`;
  const archivePath = join(outDir, archiveName);

  try {
    await tarDirectory(source, archivePath);
    console.log(`✅ Created fixture archive: ${archivePath}`);
    console.log(
      "Upload this archive to shared storage so collaborators can download it on demand.",
    );
  } catch (error) {
    console.error(`❌ Failed to create archive: ${error.message}`);
    process.exit(1);
  }
}

await main();
