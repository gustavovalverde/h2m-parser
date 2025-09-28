#!/usr/bin/env node

import { runSuite } from "./suites.js";

runSuite("quick").catch((error) => {
  console.error("❌ Quick benchmark suite failed:", error);
  process.exitCode = 1;
});
