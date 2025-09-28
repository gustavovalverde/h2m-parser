---
"h2m-parser": minor
---

Refined the htmlparser2 renderer to stream nodes directly, which removes the domhandler dependency and unlocks faster parse times on large fixtures.
Expose granular `convert_parse`, `convert_render`, and `convert_postprocess` telemetry events (propagated through `H2MParser` and `htmlToMarkdown`) so downstream tooling can pinpoint hotspots while staying backwards compatible.
