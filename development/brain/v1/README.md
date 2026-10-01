# JSON-to-Tag V7 — Brain V1

## Objective

Use the highest `node-json-transformer` source as the architectural starting
point for a new JSON-to-DOM experiment.

## Core idea

Do not redesign the transformer.

Preserve its traversal, looping, branching, and function arrangement wherever
possible.

Add only the DOM-specific behavior required by JSON-to-Tag.

## JSON-to-DOM story

```text
JSON specification
        ↓
traverse
        ↓
find tagName
        ↓
create DOM element
        ↓
apply element information
        ↓
find children
        ↓
loop children
        ↓
traverse again
```

## Decisions

1. Existing `src/v2` through the current highest version remain untouched.
2. V7 is created as a new source version.
3. The transformer source is copied rather than rewritten from memory.
4. Existing transformer function signatures are preserved unless a change is
   required for JSON-to-DOM.
5. Existing transformer files are not deleted merely because they appear
   unnecessary.
6. `elementBuilder` remains a conceptual boundary.
7. The implementation should remain understandable as a transformer first and
   a DOM builder second.
8. The generator must be reproducible.
9. The generator must refuse to overwrite an existing V7 unless explicitly
   instructed.
10. Testing happens after generation; the generator itself should not silently
    change older versions.

## Status

This is the design record only.

The generator is:

```text
../tools/create-v7.mjs
```

It has not been executed by this development package.
