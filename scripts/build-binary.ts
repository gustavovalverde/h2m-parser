#!/usr/bin/env bun
/**
 * Build standalone executables for h2m-parser CLI using Bun's --compile flag.
 * Supports multiple platforms and architectures.
 */

import { mkdir } from "node:fs/promises";
import { join } from "node:path";

type CompileTarget = string;

interface TargetInfo {
  baseline: CompileTarget;
  modern?: CompileTarget;
}

type Platform = "linux-x64" | "linux-arm64" | "darwin-x64" | "darwin-arm64" | "windows-x64";

const TARGETS: Record<Platform, TargetInfo> = {
  "linux-x64": {
    baseline: "bun-linux-x64-baseline",
    modern: "bun-linux-x64-modern",
  },
  "linux-arm64": {
    baseline: "bun-linux-arm64",
  },
  "darwin-x64": {
    baseline: "bun-darwin-x64-baseline",
    modern: "bun-darwin-x64-modern",
  },
  "darwin-arm64": {
    baseline: "bun-darwin-arm64",
  },
  "windows-x64": {
    baseline: "bun-windows-x64-baseline",
    modern: "bun-windows-x64-modern",
  },
} as const;

interface BuildOptions {
  platforms: Platform[];
  modern: boolean;
  outdir: string;
}

async function buildBinary({ platforms, modern, outdir }: BuildOptions): Promise<void> {
  await mkdir(outdir, { recursive: true });

  console.log("🔨 Building h2m binaries...\n");

  const buildPromises = platforms.map(async (platform) => {
    const { target, suffix } = resolveTarget(platform, modern);
    const extension = platform.startsWith("windows") ? ".exe" : "";
    const outfile = join(outdir, `h2m-${platform}${suffix}${extension}`);

    console.log(`📦 Building for ${platform}...`);

    const result = await Bun.build({
      entrypoints: ["src/cli.ts"],
      minify: true,
      sourcemap: "linked",
      compile: {
        // biome-ignore lint/suspicious/noExplicitAny: Bun's type definitions require specific Target type
        target: target as any,
        outfile,
      },
    });

    if (!result.success) {
      for (const log of result.logs) {
        console.error(log);
      }
      throw new Error(`Failed to build binary for ${platform}`);
    }

    const sizeInMB = (Bun.file(outfile).size / (1024 * 1024)).toFixed(2);
    console.log(`✅ Built ${outfile} (${sizeInMB} MB)\n`);
  });

  await Promise.all(buildPromises);

  console.log("🎉 All binaries built successfully!");
  console.log(`📁 Output directory: ${outdir}`);
}

function resolveTarget(
  platform: Platform,
  modern: boolean,
): { target: CompileTarget; suffix: string } {
  const targetInfo = TARGETS[platform];
  if (!targetInfo) {
    throw new Error(`Unknown platform target: ${platform}`);
  }
  if (modern && targetInfo.modern) {
    return { target: targetInfo.modern, suffix: "-modern" };
  }
  return { target: targetInfo.baseline, suffix: "" };
}

function detectPlatforms(all: boolean, explicit?: Platform): Platform[] {
  if (all) {
    return Object.keys(TARGETS) as Platform[];
  }
  if (explicit) {
    return [explicit];
  }

  const os = process.platform;
  const arch = process.arch;

  if (os === "linux") {
    return arch === "arm64" ? ["linux-arm64"] : ["linux-x64"];
  }
  if (os === "darwin") {
    return arch === "arm64" ? ["darwin-arm64"] : ["darwin-x64"];
  }
  if (os === "win32") {
    return ["windows-x64"];
  }

  throw new Error(`Unsupported platform: ${os}-${arch}`);
}

function parseArgs(): BuildOptions {
  const args = process.argv.slice(2);
  let explicitPlatform: Platform | undefined;
  let buildAll = false;
  let modern = false;
  let outdir = "dist/bin";

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    switch (arg) {
      case "--platform":
      case "-p":
        explicitPlatform = args[++i] as Platform;
        break;
      case "--all":
        buildAll = true;
        break;
      case "--modern":
        modern = true;
        break;
      case "--outdir":
      case "-o":
        outdir = args[++i];
        break;
      case "--help":
      // biome-ignore lint/suspicious/noFallthroughSwitchClause: process.exit terminates execution
      case "-h":
        printHelp();
        process.exit(0);
      default:
        if (arg.startsWith("-")) {
          console.error(`Unknown option: ${arg}`);
          printHelp();
          process.exit(1);
        }
    }
  }

  return {
    platforms: detectPlatforms(buildAll, explicitPlatform),
    modern,
    outdir,
  };
}

function printHelp(): void {
  console.log(`
h2m-parser Binary Builder

Usage:
  bun run build:binary [options]

Options:
  -p, --platform <platform>  Build for specific platform (default: current platform)
                             Options: linux-x64, linux-arm64, darwin-x64, darwin-arm64, windows-x64
      --all                  Build for all platforms
      --modern               Prefer the modern CPU build (Haswell/AVX2 or newer)
  -o, --outdir <dir>         Output directory (default: dist/bin)
  -h, --help                 Show this help message

Examples:
  bun run build:binary                     # Build for current platform
  bun run build:binary --platform linux-x64  # Build for Linux x64
  bun run build:binary --all               # Build for all platforms
`);
}

async function main(): Promise<void> {
  const options = parseArgs();
  await buildBinary(options);
}

void main();
