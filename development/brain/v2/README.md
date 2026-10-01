# JSON-to-Tag V7 — Brain V2

## Decision

V7 keeps the complete `node-json-transformer/src/v19` traversal architecture.
The DOM model is introduced at the existing object-traversal boundary.

The important rule is simple:

```text
object
  |
  +-- has tagName --> create DOM element --> loop children --> traverse again
  |
  +-- otherwise --> original transformer object mapping
```

## What changed

Only the DOM-specific path was added:

- `buildDomElement.js` creates/configures one element through the existing
  `buildSpec/elementBuilder` boundary.
- `traverseObject.js` recognizes `tagName` and loops `children` through the
  existing `traverse()` function.
- `index.js` keeps the original two-input `transform()` API and adds the
  single-spec `buildSpecElement()` entry point.
- `meta.js` identifies V7.

No V19 source repository is modified.
No old json-to-tag version is modified.

## Test result

The included test uses a small DOM implementation so the V7 traversal can be
executed without requiring a browser. It verifies element creation, attributes,
classList, properties, textContent, nested children, and preservation of the
original transformer API.
