---
"h2m-parser": minor
---

Optimize package size and update Node.js requirements

- Reduce npm package size by 82% (570KB → 103KB) by excluding source maps and enabling minification
- Remove unused `turndown` dependency, moving it to devDependencies for benchmarks only
- Update Node.js requirement to >=22 and test matrix to Node 22 and 24
- Fix tsup config TypeScript error in esbuildOptions
- Update all GitHub Actions workflows to use Node.js 24
- Configure package.json to exclude source maps from published package
- Enable minification in production builds while keeping it disabled for watch mode

These changes improve installation speed and reduce disk usage for end users while
maintaining full functionality.
