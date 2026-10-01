# Architecture

The current v4 engine is organized as a small dispatcher plus a staged element builder.

## 1. Public entry point

`src/v4/index.js` exposes:

- `buildSpecElement`
- `specToDom`
- `buildSpec`
- `reviewSpec`
- `meta`

`buildSpecElement` normalizes the incoming argument and sends the resolved spec to the builder.

## 2. Dispatch

`src/v4/buildSpec/index.js` decides what to do with the input:

```text
Input
  │
  ├─ null / undefined ──────> null
  │
  ├─ existing DOM Node ─────> return the same Node
  │
  ├─ Array ─────────────────> buildSpecArray
  │
  └─ single spec ───────────> buildSingleElement
```

## 3. Single-element assembly

`buildSingleElement` first creates/configures the element through `elementBuilder`, then recursively resolves `children`.

## 4. Element builder stages

The builder is split into six numbered stages:

| Stage | Module | Responsibility |
|---|---|---|
| 0 | `0.createElement.js` | Create the DOM element |
| 1 | `1.applyTextContent.js` | Apply direct text |
| 2 | `2.applyProperties.js` | Assign DOM properties |
| 3 | `3.applyAttributes.js` | Apply HTML attributes |
| 4 | `4.applyClassList.js` | Add CSS classes |
| 5 | `5.appendChildren.js` | Append child nodes |

This separation makes each transformation easy to inspect and change.

## 5. Recursive composition

A parent's `children` are sent back through the dispatcher. That means a child can itself contain children, producing a recursive JSON-to-DOM composition model.

## 6. Review layer

The v4 review entry point exports the current review implementation through:

```javascript
reviewSpec
```

The repository also retains versioned review implementations (`reviewSpecV1` and `reviewSpecV2`) behind the public review module.

## Why this structure is useful

The architecture separates concerns cleanly:

**Normalize → Dispatch → Build → Apply → Recurse → Review**

That makes the package easier to document, test, extend, and reason about than a single large rendering function.
