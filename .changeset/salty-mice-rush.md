---
"h2m-parser": patch
---

- Guard Readability extraction against fragment HTML by reparsing missing `<html>` wrappers, fixing `documentElement` access errors.
- Inline sample article fixtures in tests to avoid Git LFS pointers and keep CI checks working out of the box.
