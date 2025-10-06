# h2m-parser Examples

This directory contains practical examples demonstrating various features and use cases of the h2m-parser library.

## Examples

### 1. Basic Usage (`basic.js`)

Simple HTML to Markdown conversion with default and custom options.

```bash
node examples/basic.js
```

**Features demonstrated:**
- Basic HTML to Markdown conversion
- Custom link styles (inline vs referenced)
- Adding front matter metadata

### 2. Readability Integration (`readability.js`)

Extract clean article content from cluttered HTML pages using Mozilla Readability.

```bash
node examples/readability.js
```

**Features demonstrated:**
- Article extraction from complex HTML
- Removing navigation, ads, and irrelevant content
- Preserving article metadata

### 3. Custom Translators (`custom-translator.js`)

Advanced customization of tag rendering using the translator registry.

```bash
node examples/custom-translator.js
```

**Features demonstrated:**
- Custom rendering for specific tags
- Conditional rendering based on attributes
- Ignoring unwanted tags
- Creating custom markdown formats

### 4. Content Chunking (`chunking.js`)

Split large documents into manageable chunks for LLM processing.

```bash
node examples/chunking.js
```

**Features demonstrated:**
- Heading-aware chunking
- Token counting and limits
- Overlap between chunks
- Preparing content for LLM APIs

## Running the Examples

Make sure you've built the project first:

```bash
# Install dependencies
bun install

# Build the library
bun build

# Run an example
node examples/basic.js
```

## Creating Your Own Examples

Feel free to create your own examples based on these templates. The key imports are:

```javascript
// For ESM modules
import { H2MParser } from 'h2m-parser';

// For CommonJS
const { H2MParser } = require('h2m-parser');
```

## Common Use Cases

### Web Scraping Pipeline

```javascript
const converter = new H2MParser({
  extract: { readability: true },
  llm: { frontMatter: true, addHash: true }
});

// Process scraped HTML
const result = await converter.process(scrapedHtml, sourceUrl);
```

### Documentation Conversion

```javascript
const converter = new H2MParser({
  markdown: {
    useReferenceLinks: true,
    linkStyle: 'referenced'
  }
});
```

### Content for LLMs

```javascript
const converter = new H2MParser({
  chunk: {
    enabled: true,
    maxTokens: 2000,
    headingAware: true
  },
  llm: {
    frontMatter: true,
    addHash: true
  }
});
```

## Need Help?

- Check the [main README](../README.md) for detailed API documentation
- Report issues on [GitHub](https://github.com/gustavovalverde/h2m-parser/issues)
- See [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines