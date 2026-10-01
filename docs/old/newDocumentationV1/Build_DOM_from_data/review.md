# Specification Review

`reviewSpec` analyzes a JSON specification instead of rendering it.

## Purpose

A review answers questions such as:

- Which tags are used?
- How often does each tag occur?
- Are tags recognized by the repository's catalog?
- Does the specification pass the catalog check?

## Example

```javascript
import { reviewSpec } from "@keshavsoft/json-to-tag";

const spec = {
  tagName: "div",
  children: [
    { tagName: "h1", textContent: "Dashboard" },
    { tagName: "p", textContent: "Welcome" },
    { tagName: "button", textContent: "Open" }
  ]
};

const result = reviewSpec({ inSpec: spec });

console.log(result);
```

The repository README documents commonly used result fields such as:

```javascript
result.totalTags
result.tagCounts
result.areAllTagsPresent
result.unrecognizedTags
```

## Review workflow

```text
JSON specification
       │
       ▼
   Extract tags
       │
       ▼
   Compare catalog
       │
       ├── recognized
       └── unrecognized
       │
       ▼
   Review result
```

## Related tools

The repository documentation site also contains:

- tag-only summaries
- present-tag validation
- not-present / unrecognized-tag analysis
- a tag catalog
- individual tag pages
- an interactive playground

Open the current site: https://keshavsoft.github.io/json-to-tag/
