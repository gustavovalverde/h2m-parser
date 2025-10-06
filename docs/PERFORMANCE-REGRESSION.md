# Performance Regression Detection System

## Overview

h2m-parser includes a comprehensive performance regression detection system to ensure that changes don't degrade performance. The system automatically runs benchmarks on PRs and compares them against baseline metrics.

## Components

### 1. Performance Baseline (`bench/capture-baseline.js`)

Captures current performance metrics as a baseline for comparison.

```bash
bun bench:baseline
```

This creates `bench/.baseline/performance-baseline.json` with:

- Average processing times
- Comparison ratios vs competitors
- Per-file performance metrics
- Environment information

### 2. Regression Detection (`bench/check-regression.js`)

Compares current performance against baseline and reports regressions.

```bash
bun bench:regression
```

Features:

- **10% threshold**: Performance degradation >10% is flagged as regression
- **Detailed reporting**: Shows exact metrics and changes
- **CI integration**: Fails builds with regressions

### 3. Performance Tracking (`bench/track-performance.js`)

Tracks performance over time across commits.

```bash
bun bench:track
```

Generates:

- Historical performance data
- Trend analysis
- ASCII performance charts
- Detailed trend reports

### 4. CI Integration (`.github/workflows/performance-regression.yml`)

Automatic regression detection on PRs:

- Runs benchmarks on PR code
- Compares against main branch baseline
- Comments results on PR
- Fails if regression detected

## Usage

### For Contributors

1. **Before making changes**, capture baseline (100 iterations across the entire `tests/fixtures` set with a 5MB per-file cap):

   ```bash
   git checkout main
   bun bench:baseline
   ```

2. **After changes**, check for regressions (runs the identical configuration as the baseline):

   ```bash
   bun bench:regression
   ```

3. **View trends over time**:

   ```bash
   bun bench:track
   ```

### For Maintainers

1. **Review PR performance comments** - Bot automatically comments with performance impact

2. **Update baseline after improvements**:

   ```bash
   bun bench:baseline
   git add bench/.baseline/performance-baseline.json
   git commit -m "chore: update performance baseline"
   ```

3. **Monitor long-term trends**:

   ```bash
   bun bench:track
   cat bench/.history/trend-report.md
   ```

## Regression Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| Processing time increase | >10% | ❌ Fail build |
| Processing time increase | 5-10% | ⚠️ Warning |
| Processing time decrease | >10% | 🟢 Improvement noted |
| Comparison advantage decrease | >10% | ❌ Fail build |

## Performance Goals

Target metrics to maintain:

- **h2m-parser (no Readability)**: < 2ms average
- **h2m-parser (with Readability)**: < 10ms average
- **vs Turndown**: > 3x faster
- **vs node-html-markdown**: > 2x faster

## Handling Regressions

When a regression is detected:

1. **Review the changes** - Identify what might have caused the slowdown

2. **Profile the code**:

   ```bash
   bun bench:profile
   bun bench:analyze
   ```

3. **Common causes**:
   - Inefficient algorithms (O(n²) instead of O(n))
   - Unnecessary operations in hot paths
   - Memory allocations in loops
   - Regex backtracking
   - DOM traversal inefficiencies

4. **Fix and verify**:

   ```bash
   # After fixes
   bun bench:regression
   ```

## Accepting Performance Changes

Sometimes performance regressions are acceptable (e.g., for important features):

1. **Document the trade-off** in PR description

2. **Update baseline** after merge:

   ```bash
   git checkout main
   git pull
   bun bench:baseline
   git add bench/.baseline/performance-baseline.json
   git commit -m "chore: update baseline after feature X"
   git push
   ```

## Local Development

### Quick Performance Check

```bash
# Quick comparison (10 iterations, 10 files)
bun bench:compare:quick

# Full comparison (1000 iterations, all files)
bun bench:compare:full
```

### Continuous Monitoring

```bash
# Watch mode - rerun on file changes
bun run build:watch & bun bench:compare:quick
```

> ℹ️ **Configuration parity:** `bun bench:baseline`, `bun bench:regression`, and `bun bench:readme --fresh` all invoke the same comparison run (100 iterations, 3 warmups, 5MB per-file limit, dataset `tests/fixtures`). This keeps the baseline, regression gate, and published metrics directly comparable.

### Performance Debugging

```bash
# Memory profiling
bun bench:profile:memory

# Detailed analysis
bun bench:analyze

# Component breakdown
bun bench:analyze
```

## Best Practices

1. **Run regression check before PR** - Catch issues early
2. **Include performance impact in PR description** - Help reviewers
3. **Update baseline after improvements** - Capture gains
4. **Monitor trends regularly** - Spot gradual degradation
5. **Test with production-like data** - Use real HTML fixtures

## Troubleshooting

### "No baseline found"

```bash
bun bench:baseline
```

### "Regression detected but changes seem unrelated"

1. Check environment consistency (Node version, etc.)
2. Run multiple times to rule out variance
3. Compare with different file sets

### "CI failing but local passes"

1. Ensure using same Node version as CI
2. Check baseline is up to date
3. Review CI logs for environment differences

## Architecture

```text
bench/
├── capture-baseline.js      # Baseline capture
├── check-regression.js      # Regression detection
├── track-performance.js     # Historical tracking
├── .baseline/
│   └── performance-baseline.json
├── .history/
│   ├── performance-history.json
│   └── trend-report.md
└── .results/
    ├── comparison-latest.json
    └── regression-report.md
```

## Contributing

When adding new features that might impact performance:

1. **Benchmark before and after** your changes
2. **Document performance impact** in PR
3. **Add specific benchmarks** if introducing new code paths
4. **Consider performance tests** for critical paths

See [CONTRIBUTING.md](../CONTRIBUTING.md) for general guidelines.
