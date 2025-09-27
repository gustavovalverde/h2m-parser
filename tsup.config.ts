import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    index: "src/index.ts",
    cli: "src/cli.ts",
  },
  format: ["esm", "cjs"],
  target: "node20",
  platform: "node",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  splitting: false,
  treeshake: true,
  minify: false,
  shims: false,
  keepNames: true,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
  esbuildOptions(esbuildOptions, context) {
    if (context.entry === "cli") {
      esbuildOptions.banner = {
        js: "#!/usr/bin/env node",
      };
    }
  },
}));
