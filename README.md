# @keshavsoft/json-to-tag

> **Fast, zero-dependency declarative JSON-to-DOM compiler & spec reviewer.**  
> Transforms serializable JSON specifications into live native DOM elements with a 6-stage assembly pipeline and catalog verification.

[![Live Playground](https://img.shields.io/badge/Live_Playground-Interactive_Demo-4f46e5?style=for-the-badge&logo=googlechrome&logoColor=white)](https://keshavsoft.github.io/json-to-tag/)
[![npm](https://img.shields.io/npm/v/@keshavsoft/json-to-tag?style=for-the-badge&color=2563eb)](https://www.npmjs.com/package/@keshavsoft/json-to-tag)

🌐 **Documentation Hub**: [https://keshavsoft.github.io/json-to-tag/](https://keshavsoft.github.io/json-to-tag/)  
📖 **Step-by-Step Guide**: [https://keshavsoft.github.io/json-to-tag/newDocumentation/](https://keshavsoft.github.io/json-to-tag/newDocumentation/)  
🏷️ **Tags Catalog & Rules Analysis**: [https://keshavsoft.github.io/json-to-tag/tags/index.html](https://keshavsoft.github.io/json-to-tag/tags/index.html)  
📊 **Specification Summary Hub**: [https://keshavsoft.github.io/json-to-tag/summary/index.html](https://keshavsoft.github.io/json-to-tag/summary/index.html)
  - 📋 [Tags Only & Frequency Lists](https://keshavsoft.github.io/json-to-tag/summary/tags-only.html)
  - ⚠️ [Not Present (Unrecognized Tags Audit)](https://keshavsoft.github.io/json-to-tag/summary/not-present.html)
  - ✅ [Present (Catalog Verified Tags)](https://keshavsoft.github.io/json-to-tag/summary/present.html)
  - 📦 [Raw tags.json (SSOT)](https://keshavsoft.github.io/json-to-tag/tags/tags.json)

---

## Installation

```bash
npm install @keshavsoft/json-to-tag
```

---

## NPX Usage

You can scaffold and copy the engine directly into your project without installing it globally:

```bash
# Copy latest v3 engine into ./json-to-tag
npx @keshavsoft/json-to-tag

# Copy into a custom destination directory
npx @keshavsoft/json-to-tag ./src/components/json-to-tag

# Copy a specific engine version (e.g. v3)
npx @keshavsoft/json-to-tag ./json-to-tag --version-target=v3

# View version and help
npx @keshavsoft/json-to-tag --version
npx @keshavsoft/json-to-tag --help
```

---

## Import Usage

### 1. Standard ES Module Import (from npm package)

```javascript
// Default and named imports
import buildSpecElement from "@keshavsoft/json-to-tag";
import { buildSpecElement, specToDom, buildSpec, reviewSpec, meta } from "@keshavsoft/json-to-tag";
```

### 2. Local Project Import (after NPX scaffolding)

If you used `npx @keshavsoft/json-to-tag` to copy the engine into your project:

```javascript
import { buildSpecElement, reviewSpec } from "./json-to-tag/index.js";
```

---

## Quick Start Examples

### 1. Build Native DOM Elements

```javascript
import { buildSpecElement } from "@keshavsoft/json-to-tag";

const spec = {
  tagName: "button",
  classList: "btn btn-primary shadow-sm",
  textContent: "Submit",
  attributes: {
    type: "button",
    id: "submit-btn"
  }
};

const buttonElement = buildSpecElement({ inSpec: spec });
document.body.appendChild(buttonElement);
```

### 2. Nested Components (Card)

```javascript
import { buildSpecElement } from "@keshavsoft/json-to-tag";

const cardSpec = {
  tagName: "div",
  classList: "card shadow-sm p-4",
  children: [
    {
      tagName: "h4",
      classList: "card-title text-primary",
      textContent: "User Profile"
    },
    {
      tagName: "p",
      classList: "card-text text-muted",
      textContent: "Manage personal preferences and credentials."
    },
    {
      tagName: "button",
      classList: "btn btn-outline-primary",
      textContent: "Edit Profile",
      attributes: {
        type: "button"
      }
    }
  ]
};

const cardElement = buildSpecElement({ inSpec: cardSpec });
document.getElementById("app").appendChild(cardElement);
```

### 3. Review Specifications (`reviewSpec`)

Analyze JSON specs against `tags.json` to verify tag counts and detect unsupported tags:

```javascript
import { reviewSpec } from "@keshavsoft/json-to-tag";

const spec = {
  tagName: "div",
  children: [
    { tagName: "h1", textContent: "Heading" },
    { tagName: "p", textContent: "Paragraph 1" },
    { tagName: "p", textContent: "Paragraph 2" },
    { tagName: "button", textContent: "Submit" }
  ]
};

const review = reviewSpec({ inSpec: spec });

console.log(review.totalTags);          // 5
console.log(review.tagCounts);          // { div: 1, h1: 1, p: 2, button: 1 }
console.log(review.areAllTagsPresent);  // true
console.log(review.unrecognizedTags);   // []
```

### 4. Browser Global Usage (Without Bundler)

```html
<script type="module" src="./node_modules/@keshavsoft/json-to-tag/src/v9/index.js"></script>
<script type="module">
  const { buildSpecElement, reviewSpec } = window.ks.jsonToTag;

  const el = buildSpecElement({
    inSpec: {
      tagName: "h1",
      classList: "text-xl font-bold",
      textContent: "Hello from json-to-tag!"
    }
  });

  document.body.appendChild(el);
</script>
```

---

## Specification Schema

Each element specification is a plain JavaScript object:

| Field | Type | Description | Example |
|---|---|---|---|
| `tagName` | `string` | **Required**. Native HTML tag name. Supports alias `"checkbox"`. | `"button"`, `"checkbox"` |
| `textContent` | `string \| number` | Text content assigned to the element. | `"Click Me"` |
| `classList` | `string \| string[]` | CSS classes as space-separated string or array. | `"btn btn-primary"`, `["p-2", "m-1"]` |
| `attributes` | `object` | HTML attributes (`true` sets boolean, `false` removes). | `{ type: "text", disabled: true }` |
| `properties` | `object` | Direct DOM properties applied with `Object.assign()`. | `{ id: "user-name", value: "John" }` |
| `children` | `array` | Child specs, strings, numbers, or existing `Node`s. | `[{ tagName: "span", textContent: "Hi" }]` |

---

## Parameter Naming Convention

All functions follow the repository's single-object parameter standard:
- Arguments are passed in a single object with `in`-prefixed property names (`inSpec`, `inChildren`, etc.).
- Internal functions immediately unpack `in`-properties to `local`-prefixed variables.
- Top-level `buildSpecElement` also supports `spec` for convenience:

```javascript
// Recommended:
buildSpecElement({ inSpec: mySpec });

// Also supported:
buildSpecElement({ spec: mySpec });
```

---

## Round-Trip Workflow with `tag-to-json`

`json-to-tag` has a direct reverse companion: [`@keshavsoft/tag-to-json`](https://www.npmjs.com/package/@keshavsoft/tag-to-json).

While `json-to-tag` **builds** DOM elements from JSON specs, `tag-to-json` **extracts** specs from any live rendered DOM element. Together they form a complete lossless round-trip loop:

```javascript
import { tagToJson } from "@keshavsoft/tag-to-json";
import { buildSpecElement } from "@keshavsoft/json-to-tag";

// 1. Capture an existing DOM element as a portable JSON spec
const existingElement = document.querySelector("#my-card");
const spec = tagToJson({ inElement: existingElement });

// 2. Rebuild it anywhere — same markup, zero innerHTML
const clone = buildSpecElement({ inSpec: spec });
document.getElementById("target").appendChild(clone);
```

> 🔁 The spec output from `tagToJson()` is **100% compatible** with `buildSpecElement({ inSpec })` — no transformation needed.

- **[`@keshavsoft/tag-to-json` on npm](https://www.npmjs.com/package/@keshavsoft/tag-to-json)**
- **[Live Demo & Showcase](https://keshavsoft.github.io/tag-to-json/)**
- **[GitHub](https://github.com/keshavsoft/tag-to-json)**

---

## License

[ISC](LICENSE) © [KeshavSoft](https://github.com/keshavsoft)
