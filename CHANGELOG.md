# Changelog

## 0.3.0

### Minor Changes

- 5e93d99: Fast HTML to Markdown converter with Mozilla Readability extraction, streaming renderer, and LLM-ready output. 3.75x faster than alternatives

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-01-27

### Added

- Initial release of h2m-parser
- Fast HTML to Markdown conversion using htmlparser2
- Mozilla Readability integration for article extraction
- Streaming Markdown rendering with single-pass architecture
- Translator registry for customizing tag rendering
- Output tuning options (tag ignoring, text replacements, link styles)
- YAML front matter generation with metadata
- Content hashing for deduplication
- Heading-aware chunking for LLM processing
- Whitespace normalization and cleanup
- Telemetry hooks for performance monitoring
- NDJSON transform for streaming pipelines
- CLI tool for command-line conversion
- TypeScript support with full type definitions
- Dual ESM/CJS package exports
- Comprehensive test suite
- Performance benchmarks showing 3.75x faster than Turndown

### Performance

- Average processing time: 1.517ms (without Readability)
- Average processing time: 7.731ms (with Readability)
- Linear O(n) scaling confirmed across file sizes

[Unreleased]: https://github.com/gustavovalverde/h2m-parser/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/gustavovalverde/h2m-parser/releases/tag/v0.1.0
