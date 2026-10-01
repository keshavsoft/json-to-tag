# Migration & API Notes

This page is intentionally brief and focuses on documentation consistency.

## Current package entry

The current package declares the main module through `index.js` and also exposes the v4 implementation through the package exports.

Use:

```javascript
import { buildSpecElement } from "@keshavsoft/json-to-tag";
```

or the v4 subpath when you specifically need it:

```javascript
import { buildSpecElement, reviewSpec } from "@keshavsoft/json-to-tag/v4";
```

## Parameter style

The codebase uses single-object parameters and commonly uses `in*` names internally.

The public builder accepts:

```javascript
buildSpecElement({ inSpec: spec });
```

and also supports the convenience form:

```javascript
buildSpecElement({ spec });
```

The v4 source additionally resolves a direct spec argument.

## Versioned folders

The repository contains versioned implementations and an archive of earlier versions. The new documentation treats the current source as the primary reference and older material as historical context.

## Documentation rule

When adding a new example, prefer the current public v4 API and verify the example against the current source before publishing it.
