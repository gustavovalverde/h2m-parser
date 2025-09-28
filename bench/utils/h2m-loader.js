import { spawn } from "node:child_process";
import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

let buildPromise;
let modulePromise;

async function ensureDistBuilt() {
  const distPath = join(process.cwd(), "dist", "index.mjs");
  try {
    await access(distPath, constants.F_OK);
    return;
  } catch (_error) {
    // fall through to build
  }

  if (!buildPromise) {
    buildPromise = new Promise((resolve, reject) => {
      const child = spawn("pnpm", ["build"], {
        cwd: process.cwd(),
        stdio: "inherit",
      });
      child.once("error", reject);
      child.once("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`pnpm build exited with code ${code}`));
        }
      });
    }).finally(() => {
      buildPromise = undefined;
    });
  }

  await buildPromise;
}

export async function loadH2MModule() {
  if (!modulePromise) {
    modulePromise = (async () => {
      await ensureDistBuilt();
      const distPath = join(process.cwd(), "dist", "index.mjs");
      return import(pathToFileURL(distPath).href);
    })();
  }
  return modulePromise;
}

export async function loadH2MParser() {
  const mod = await loadH2MModule();
  if (!mod?.H2MParser) {
    throw new Error("dist/index.mjs does not export H2MParser");
  }
  return mod.H2MParser;
}
