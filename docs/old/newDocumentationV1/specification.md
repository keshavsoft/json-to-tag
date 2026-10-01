# Specification

A JSON specification describes one DOM element.

| Property | Type | Purpose |
|---|---|---|
| `tagName` | string | HTML tag name |
| `textContent` | string/number | Element text |
| `classList` | string/array | CSS classes |
| `attributes` | object | HTML attributes |
| `properties` | object | DOM properties |
| `children` | array | Nested child specifications |

Example:

```javascript
const spec = {
  tagName: "button",
  textContent: "Save",
  classList: "btn btn-primary",
  attributes: {
    type: "button"
  }
};
```
