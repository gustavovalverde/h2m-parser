import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm", "cjs"],
  target: "node22",
  platform: "node",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  splitting: false,
  treeshake: true,
  minify: !options.watch,
  shims: false,
  keepNames: true,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
  esbuildOptions(esbuildOptions) {
    // Add shebang to CLI entry point
    if (esbuildOptions.entryPoints?.[0]?.includes("cli")) {
      esbuildOptions.banner = {
        js: "#!/usr/bin/env node",
      };
    }
  },
}));
