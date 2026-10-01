# JSON Specification

A specification is a plain JavaScript object that describes one DOM node or a nested UI tree.

## Core fields

| Field | Type | Purpose |
|---|---|---|
| `tagName` | `string` | HTML element name |
| `textContent` | `string \| number` | Direct text |
| `classList` | `string \| string[]` | CSS classes |
| `attributes` | `object` | HTML attributes |
| `properties` | `object` | Live DOM properties |
| `children` | `array` | Nested specs, primitive text, or nodes |

## Example

```json
{
  "tagName": "form",
  "classList": "p-4",
  "attributes": {
    "novalidate": true
  },
  "children": [
    {
      "tagName": "label",
      "textContent": "Email"
    },
    {
      "tagName": "input",
      "attributes": {
        "type": "email",
        "required": true
      }
    },
    {
      "tagName": "button",
      "classList": ["btn", "btn-primary"],
      "textContent": "Submit",
      "attributes": {
        "type": "submit"
      }
    }
  ]
}
```

## Attributes vs properties

Use `attributes` when you want to describe HTML attributes.

```javascript
attributes: {
  type: "text",
  required: true
}
```

Use `properties` when you want to assign directly to the DOM object.

```javascript
properties: {
  value: "John",
  readOnly: true
}
```

The current builder applies properties using direct object assignment and attributes using `setAttribute`/`removeAttribute` rules.

## Classes

Both forms are supported:

```javascript
classList: "container p-4 shadow"
```

```javascript
classList: ["container", "p-4", "shadow"]
```

## Children

A `children` array can contain nested specifications, strings, numbers, existing DOM nodes, and nested arrays that the dispatcher can resolve.

```javascript
{
  tagName: "p",
  children: [
    "Hello ",
    {
      tagName: "strong",
      textContent: "world"
    }
  ]
}
```

## Special tag alias

The builder contains a `checkbox` shortcut. A specification with:

```javascript
{ tagName: "checkbox" }
```

is converted to an `<input type="checkbox">` element by the element-creation stage.
