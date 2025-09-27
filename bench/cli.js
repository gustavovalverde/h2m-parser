#!/usr/bin/env node

/**
 * Unified benchmark CLI - single entry point for all benchmark operations.
 * Reduces package.json clutter by consolidating 15+ bench scripts.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "child_process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const COMMANDS = {
  // Day-to-day commands
  "1": {
    name: "Quick benchmark (10 iterations, 10 files)",
    cmd: "node bench/compare.js --iterations 10 --max-files 10",
    description: "Fast check for development"
  },
  "2": {
    name: "Update README with benchmark results",
    cmd: "node bench/update-readme.js",
    description: "Update README with latest performance data"
  },
  "3": {
    name: "Check for regressions",
    cmd: "node bench/check-regression.js",
    description: "Compare current performance against baseline"
  },

  // Comprehensive benchmarks
  "4": {
    name: "Full benchmark comparison",
    cmd: "node bench/compare.js",
    description: "Complete benchmark with all files (slower)"
  },
  "5": {
    name: "Production benchmark (1000 iterations)",
    cmd: "node bench/compare.js --iterations 1000 --output markdown",
    description: "High-precision benchmark for releases"
  },

  // Analysis tools
  "6": {
    name: "Performance profiling",
    cmd: "node bench/profile.js",
    description: "Detailed component breakdown"
  },
  "7": {
    name: "Memory analysis",
    cmd: "node --expose-gc bench/profile.js --memory",
    description: "Memory usage and leak detection"
  },
  "8": {
    name: "Deep analysis",
    cmd: "node bench/analyze.js",
    description: "Algorithmic complexity and bottlenecks"
  },

  // Baseline management
  "9": {
    name: "Capture performance baseline",
    cmd: "node bench/capture-baseline.js",
    description: "Save current metrics as baseline"
  },
  "10": {
    name: "Track performance over time",
    cmd: "node bench/track-performance.js",
    description: "Historical trends and analysis"
  },

  // Specialized
  "11": {
    name: "Export markdown results",
    cmd: "node bench/export-markdown.js",
    description: "Generate detailed markdown report"
  },
  "12": {
    name: "Legacy benchmark runner",
    cmd: "node bench/runner.js",
    description: "Original benchmark tool"
  }
};

function showMenu() {
  console.clear();
  console.log("╔══════════════════════════════════════════════════════════════════╗");
  console.log("║                    h2m-parser Benchmark Suite                          ║");
  console.log("╚══════════════════════════════════════════════════════════════════╝");
  console.log();

  console.log("🚀 Quick Actions (Day-to-Day):");
  console.log("  1) Quick benchmark (fast)");
  console.log("  2) Update README");
  console.log("  3) Check regressions");
  console.log();

  console.log("📊 Comprehensive Benchmarks:");
  console.log("  4) Full comparison");
  console.log("  5) Production benchmark (1000x)");
  console.log();

  console.log("🔍 Analysis Tools:");
  console.log("  6) Performance profiling");
  console.log("  7) Memory analysis");
  console.log("  8) Deep analysis");
  console.log();

  console.log("📈 Baseline & Tracking:");
  console.log("  9) Capture baseline");
  console.log("  10) Track trends");
  console.log();

  console.log("📝 Other:");
  console.log("  11) Export markdown");
  console.log("  12) Legacy runner");
  console.log();

  console.log("  q) Quit");
  console.log();
}

async function handleChoice(choice) {
  choice = choice.trim().toLowerCase();

  if (choice === 'q' || choice === 'quit' || choice === 'exit') {
    console.log("👋 Goodbye!");
    process.exit(0);
  }

  const command = COMMANDS[choice];
  if (!command) {
    console.log("❌ Invalid choice. Please try again.");
    return false;
  }

  console.log(`\n▶️  Running: ${command.name}`);
  console.log(`   ${command.description}`);
  console.log("─".repeat(70));
  console.log();

  try {
    execSync(command.cmd, { stdio: 'inherit' });
    console.log("\n✅ Completed successfully!");
  } catch (error) {
    console.log("\n❌ Command failed!");
    if (error.status === 1 && choice === "3") {
      console.log("   Performance regression detected!");
    }
  }

  return true;
}

async function interactiveMode() {
  while (true) {
    showMenu();

    const choice = await new Promise(resolve => {
      rl.question("Enter choice (1-12, or q to quit): ", resolve);
    });

    await handleChoice(choice);

    if (choice !== 'q') {
      await new Promise(resolve => {
        rl.question("\nPress Enter to continue...", resolve);
      });
    }
  }
}

async function main() {
  const args = process.argv.slice(2);

  // Direct command mode
  if (args.length > 0) {
    const subcommand = args[0];

    // Map common subcommands to menu items
    const shortcuts = {
      'quick': '1',
      'readme': '2',
      'regression': '3',
      'full': '4',
      'profile': '6',
      'memory': '7',
      'analyze': '8',
      'baseline': '9',
      'track': '10'
    };

    const choice = shortcuts[subcommand] || subcommand;

    if (COMMANDS[choice]) {
      await handleChoice(choice);
      process.exit(0);
    } else if (subcommand === '--help' || subcommand === '-h') {
      console.log(`
h2m-parser Benchmark CLI

Usage:
  pnpm bench              # Interactive menu
  pnpm bench <command>    # Run specific command

Commands:
  quick       Quick benchmark (10 iterations)
  readme      Update README with results
  regression  Check for performance regressions
  full        Full benchmark comparison
  profile     Performance profiling
  memory      Memory analysis
  analyze     Deep analysis
  baseline    Capture performance baseline
  track       Track performance over time

Examples:
  pnpm bench quick        # Run quick benchmark
  pnpm bench regression   # Check for regressions
  pnpm bench             # Open interactive menu
`);
      process.exit(0);
    } else {
      console.log(`Unknown command: ${subcommand}`);
      console.log("Run 'pnpm bench --help' for usage information");
      process.exit(1);
    }
  }

  // Interactive mode
  console.log("🎯 Starting h2m-parser Benchmark Suite in interactive mode...\n");
  await interactiveMode();
}

main().catch(error => {
  console.error("Error:", error);
  process.exit(1);
});