# API Reference

## Core Class

### `H2MParser`

The main class for converting HTML to Markdown.

```typescript
import { H2MParser } from 'h2m-parser';
```

#### Constructor

```typescript
new H2MParser(options?: H2MParserOptions)
```

#### Methods

##### `process(html: string, baseUrl: string, meta?: ConvertMeta): Promise<ConvertResult>`

Process HTML and return converted Markdown with metadata.

**Parameters:**
- `html` - The HTML string to convert
- `baseUrl` - Base URL for resolving relative links
- `meta` - Optional metadata (sourceUrl, retrievedAt, etc.)

**Returns:** `ConvertResult` object containing:
- `markdown` - The converted Markdown string
- `metadata` - Extracted metadata (title, author, etc.)
- `chunks` - Array of content chunks (if chunking enabled)
- `contentHash` - SHA256 hash of the content

##### Static: `processHtml(html: string, baseUrl: string, options?: H2MParserOptions): Promise<ConvertResult>`

Convenience method for one-off conversions.

```typescript
const result = await H2MParser.processHtml(html, baseUrl, {
  markdown: { linkStyle: 'inline' }
});
```

## Configuration Options

### `H2MParserOptions`

```typescript
interface H2MParserOptions {
  extract?: ExtractOptions;
  markdown?: MarkdownOptions;
  llm?: LlmOptions;
  chunk?: ChunkConfig;
  telemetry?: H2MParserTelemetry;
}
```

### `ExtractOptions`

Control article extraction behavior:

```typescript
interface ExtractOptions {
  readability?: boolean;  // Enable Mozilla Readability (default: false)
}
```

### `MarkdownOptions`

Configure Markdown output:

```typescript
interface MarkdownOptions {
  linkStyle?: 'inline' | 'referenced' | 'angle';  // Link rendering style
  useReferenceLinks?: boolean;                     // Use reference-style links
  ignoreTags?: string[];                          // Tags to skip
  blockTags?: string[];                           // Additional block-level tags
  textReplacements?: Array<{                      // Text replacements
    pattern: RegExp;
    replacement: string;
  }>;
  translators?: {                                 // Custom tag translators
    [tagName: string]: TagTranslator;
  };
}
```

### `LlmOptions`

Options for LLM-friendly output:

```typescript
interface LlmOptions {
  frontMatter?: boolean;  // Add YAML front matter (default: false)
  addHash?: boolean;      // Include content hash (default: false)
}
```

### `ChunkConfig`

Content chunking configuration:

```typescript
interface ChunkConfig {
  enabled?: boolean;      // Enable chunking (default: false)
  maxTokens?: number;     // Max tokens per chunk (default: 2000)
  overlap?: number;       // Token overlap between chunks (default: 100)
  headingAware?: boolean; // Keep headings with content (default: true)
}
```

### `H2MParserTelemetry`

Performance monitoring:

```typescript
type H2MParserTelemetry = (event: H2MParserTelemetryEvent) => void;

interface H2MParserTelemetryEvent {
  stage: 'extract' | 'convert' | 'post' | 'chunk' | 'total';
  duration: number;  // milliseconds
  meta?: Record<string, any>;
}
```

## Custom Translators

Override how specific tags are rendered:

```typescript
const converter = new H2MParser({
  markdown: {
    translators: {
      // Custom span handler
      span: (ctx, next) => {
        if (ctx.node.attribs?.class === 'highlight') {
          ctx.write('**');
          ctx.renderChildren({ inline: true });
          ctx.write('**');
        } else {
          next(); // Use default
        }
      },

      // Custom div handler
      div: (ctx, next) => {
        const classes = ctx.node.attribs?.class || '';
        if (classes.includes('note')) {
          ctx.write('\n> ');
          ctx.renderChildren({ inline: false });
          ctx.write('\n');
        } else {
          next();
        }
      }
    }
  }
});
```

### `TagTranslatorContext`

Context object passed to translators:

```typescript
interface TagTranslatorContext {
  node: Element;                    // Current HTML element
  write: (text: string) => void;   // Write to output
  renderChildren: (options?: {      // Render child nodes
    inline?: boolean;
    raw?: boolean;
  }) => void;
}
```

## NDJSON Transform

For streaming pipelines:

```typescript
import { createNdjsonTransform } from 'h2m-parser/io';

const transform = createNdjsonTransform(options);

// Use in a pipeline
stream
  .pipe(transform)
  .pipe(outputStream);
```

## CLI Usage

```bash
# Basic conversion
h2m-parser < input.html > output.md

# With URL for relative links
h2m-parser --url https://example.com < input.html

# Enable Readability
h2m-parser --readability < article.html

# With chunking
h2m-parser --chunk --max-tokens 1000 < document.html

# NDJSON streaming
cat urls.ndjson | h2m-parser --ndjson > results.ndjson
```

## Type Exports

All TypeScript types are exported for use in your applications:

```typescript
import type {
  H2MParserOptions,
  ConvertResult,
  MarkdownOptions,
  ChunkConfig,
  TagTranslator,
  TagTranslatorContext,
  ExtractedContent,
  LlmOptions,
  H2MParserTelemetry,
  H2MParserTelemetryEvent
} from 'h2m-parser';
```

## Error Handling

The library throws errors for:
- Invalid HTML that can't be parsed
- Network errors when fetching resources
- Invalid configuration options

Always wrap calls in try-catch for production use:

```typescript
try {
  const result = await converter.process(html, baseUrl);
} catch (error) {
  console.error('Conversion failed:', error);
}
```

## Performance Tips

1. **Reuse instances** - Create one `H2MParser` instance and reuse it
2. **Disable Readability** - Only enable when needed (adds ~6ms overhead)
3. **Use telemetry** - Monitor performance in production
4. **Batch processing** - Process multiple documents in parallel

## Advanced Examples

See the [examples directory](../examples/) for complete working examples:
- [Basic usage](../examples/basic.js)
- [Readability extraction](../examples/readability.js)
- [Custom translators](../examples/custom-translator.js)
- [Content chunking](../examples/chunking.js)