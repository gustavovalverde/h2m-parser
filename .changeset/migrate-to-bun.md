---
"h2m-parser": major
---

**BREAKING CHANGES:** Migrate to Bun and add standalone binary compilation

This release introduces significant infrastructure changes:

- **ESM-only package**: Removed CommonJS builds. The package now exports only ESM format.
- **Bun development requirement**: Development now requires Bun 1.2+ instead of pnpm.
- **Node.js runtime compatibility maintained**: Runtime consumption still supports Node.js 22+.

**New Features:**
- Standalone binary compilation using Bun's `--compile` flag
  - Cross-platform support: linux-x64, linux-arm64, darwin-x64, darwin-arm64, windows-x64
  - Baseline and modern CPU variants (Haswell/AVX2+)
  - Automated GitHub workflow for binary builds on releases
- Runtime detection for Bun.CryptoHasher with Node.js fallback for hash computation

**Build System:**
- Replaced tsup with Bun.build() for faster builds (~0.6s vs 1.5s)
- Simplified package exports to ESM default only
- Updated all 30+ benchmark scripts to use Bun
- Removed pnpm workspace configuration
