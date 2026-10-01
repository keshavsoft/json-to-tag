# Getting Started

## Browser Only

This documentation describes the browser/CDN usage of `json-to-tag`.

## 1. Load the CDN

```html
<script src="https://keshavsoft.github.io/json-to-tag/dist/v4/min.js"></script>
```

## 2. Create a specification

```javascript
const spec = {
  tagName: "button",
  textContent: "Click Me"
};
```

## 3. Build the DOM element

```javascript
const element =
  window.ks.jsonToTag.buildSpecElement(spec);
```

## 4. Append it

```javascript
document.getElementById("app").appendChild(element);
```
