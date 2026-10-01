# Getting Started

## What is json-to-tag?

`@keshavsoft/json-to-tag` converts a JSON description of an interface into native DOM elements. The package exposes a primary `buildSpecElement` entry point, a `reviewSpec` API, metadata, and a browser-global registration.

## Install

```bash
npm install @keshavsoft/json-to-tag
```

The package also exposes an NPX command:

```bash
npx @keshavsoft/json-to-tag
```

## First render

```javascript
import { buildSpecElement } from "@keshavsoft/json-to-tag";

const buttonSpec = {
  tagName: "button",
  classList: "btn btn-primary",
  textContent: "Save",
  attributes: {
    type: "button"
  }
};

const button = buildSpecElement({ inSpec: buttonSpec });

document.body.appendChild(button);
```

## The basic idea

Think of the JSON as a small UI description:

1. `tagName` says what element to create.
2. `textContent` gives it direct text.
3. `classList` adds CSS classes.
4. `attributes` writes HTML attributes.
5. `properties` assigns JavaScript DOM properties.
6. `children` describes nested content.

The builder recursively turns that description into real DOM nodes.

## Direct specification input

The current v4 entry point resolves the specification from `spec`, `inSpec`, or the argument itself. This makes the API flexible while preserving the repository's single-object parameter convention.

```javascript
buildSpecElement({ inSpec: spec });
buildSpecElement({ spec });
buildSpecElement(spec);
```

## Browser global

The current source registers the public builder and review function through the `globalThis.ks` namespace. Browser integrations can use the registered `json-to-tag` global exposed by the package.

## Try the live documentation

- Playground: https://keshavsoft.github.io/json-to-tag/playground/index.html
- Documentation hub: https://keshavsoft.github.io/json-to-tag/
- NPM: https://www.npmjs.com/package/@keshavsoft/json-to-tag
- Repository: https://github.com/keshavsoft/json-to-tag
