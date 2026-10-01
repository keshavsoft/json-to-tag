# `src/v2` JSON Specification Guide

This guide details the schema and syntax rules for constructing JSON specifications compatible with the **`src/v2`** DOM compiler.

---

## Specification Object Schema

A single element specification is a plain JSON-serializable object:

```json
{
  "tagName": "button",
  "textContent": "Submit Order",
  "classList": "btn btn-success px-4 py-2",
  "attributes": {
    "type": "submit",
    "data-action": "submit-order"
  },
  "properties": {
    "id": "order-submit-btn"
  },
  "children": []
}
```

---

## Field Specifications

### 1. `tagName` (`string`, Required)
Specifies the HTML tag name for the element to create.

- Case-insensitive (e.g. `"div"`, `"DIV"` both produce `<div>`).
- **Tag Shortcut `"checkbox"`**: Automatically creates `<input type="checkbox">`.

```json
{
  "tagName": "checkbox",
  "attributes": {
    "id": "subscribe",
    "name": "subscribe"
  }
}
```

---

### 2. `textContent` (`string | number`, Optional)
Sets direct inner text on the created DOM element via `element.textContent`.

```json
{
  "tagName": "h2",
  "textContent": "Account Summary"
}
```

> **Note**: For void elements (such as `<img>`, `<input>`, `<hr>`), prefer using attributes (`value`, `alt`, etc.) rather than `textContent`.

---

### 3. `classList` (`string | string[]`, Optional)
Defines CSS classes to apply to the element using `element.classList.add(...)`.

#### String format (space-separated):
```json
{
  "tagName": "div",
  "classList": "container mx-auto p-4 flex items-center"
}
```

#### Array format:
```json
{
  "tagName": "div",
  "classList": ["container", "mx-auto", "p-4", "flex", "items-center"]
}
```

Both formats are safely parsed; extra whitespace or empty values are stripped automatically.

---

### 4. `attributes` (`object`, Optional)
Sets HTML attributes on the element via `element.setAttribute()`.

```json
{
  "tagName": "input",
  "attributes": {
    "type": "email",
    "name": "email",
    "placeholder": "user@example.com",
    "required": true,
    "disabled": false,
    "aria-label": "User Email Address"
  }
}
```

#### Special Attribute Rules:
- **`class`**: Automatically sets `element.className`.
- **Boolean `true`**: Renders as an empty/presence attribute (e.g. `required=""`, `disabled=""`).
- **Boolean `false`**: Removes the attribute from the element via `element.removeAttribute()`.
- **`data-*` attributes**: Supported as standard strings (e.g. `"data-id": "1001"`).

---

### 5. `properties` (`object`, Optional)
Applies JavaScript object properties directly to the DOM node via `Object.assign(element, properties)`.

```json
{
  "tagName": "input",
  "properties": {
    "id": "txtUsername",
    "value": "guest_user",
    "readOnly": true
  }
}
```

> **Difference between `attributes` and `properties`**:
> - `attributes` writes to the HTML markup (`setAttribute`).
> - `properties` directly modifies the live DOM object properties (`element[key] = value`), allowing non-string values or direct DOM bindings.

---

### 6. `children` (`array`, Optional)
An array defining child nodes to append inside this element. A child item can be:

1. **Another spec object**: Recursively compiled into an `HTMLElement`.
2. **A primitive string or number**: Converted to a native text node via `document.createTextNode()`.
3. **A live DOM `Node`**: Retained and directly appended without transformation.
4. **An array of specs**: Automatically flattened.

```json
{
  "tagName": "p",
  "children": [
    "By registering, you agree to our ",
    {
      "tagName": "a",
      "textContent": "Terms of Service",
      "attributes": {
        "href": "/terms",
        "target": "_blank"
      }
    },
    "."
  ]
}
```

---

## Practical Examples

### Form Component with Input and Checkbox

```javascript
import { buildSpecElement } from "./src/v2/index.js";

const formSpec = {
  tagName: "form",
  classList: "needs-validation p-4 bg-white rounded shadow-sm",
  attributes: {
    novalidate: true
  },
  children: [
    {
      tagName: "div",
      classList: "mb-3",
      children: [
        {
          tagName: "label",
          classList: "form-label",
          textContent: "Email Address",
          attributes: { for: "user-email" }
        },
        {
          tagName: "input",
          classList: "form-control",
          attributes: {
            type: "email",
            id: "user-email",
            placeholder: "name@company.com",
            required: true
          }
        }
      ]
    },
    {
      tagName: "div",
      classList: "form-check mb-3",
      children: [
        {
          tagName: "checkbox",
          classList: "form-check-input",
          attributes: { id: "remember-me" }
        },
        {
          tagName: "label",
          classList: "form-check-label",
          textContent: "Remember my login",
          attributes: { for: "remember-me" }
        }
      ]
    },
    {
      tagName: "button",
      classList: "btn btn-primary",
      textContent: "Sign In",
      attributes: { type: "submit" }
    }
  ]
};

const form = buildSpecElement({ inSpec: formSpec });
document.getElementById("auth-container").appendChild(form);
```

---

### Data Table with Dynamic Row Specs

```javascript
import { buildSpecElement } from "./src/v2/index.js";

const users = [
  { id: 101, name: "Sarah Connor", role: "Administrator", status: "Active" },
  { id: 102, name: "Kyle Reese", role: "Editor", status: "Pending" }
];

const tableSpec = {
  tagName: "table",
  classList: "table table-striped table-hover align-middle",
  children: [
    {
      tagName: "thead",
      classList: "table-dark",
      children: [
        {
          tagName: "tr",
          children: [
            { tagName: "th", textContent: "ID" },
            { tagName: "th", textContent: "Name" },
            { tagName: "th", textContent: "Role" },
            { tagName: "th", textContent: "Status" }
          ]
        }
      ]
    },
    {
      tagName: "tbody",
      children: users.map(user => ({
        tagName: "tr",
        children: [
          { tagName: "td", textContent: user.id },
          { tagName: "td", textContent: user.name },
          { tagName: "td", textContent: user.role },
          {
            tagName: "td",
            children: [
              {
                tagName: "span",
                classList: user.status === "Active" ? "badge bg-success" : "badge bg-warning text-dark",
                textContent: user.status
              }
            ]
          }
        ]
      }))
    }
  ]
};

const table = buildSpecElement({ inSpec: tableSpec });
document.getElementById("table-container").appendChild(table);
```

---

## Edge Case Handling

| Input Case | Result | Behavior |
|---|---|---|
| `null` or `undefined` | `null` | Safe early exit via guards. |
| Existing `Node` instance | The same `Node` | Bypasses creation and returns untouched. |
| Array of specs `[spec1, spec2]` | `Array<HTMLElement>` | Recursively dispatched, flattened, and truthy elements returned. |
| Empty `children: []` | Element with no children | Skips children appending stage. |
| Non-array `children` | Empty children | If `children` is not an array, `buildChildrenNodes` safely returns `[]`. |
| Missing `tagName` | `null` | Validation guards skip elements without a `tagName`. |
| `"checkbox"` tagName | `<input type="checkbox">` | Built-in sugar converts to checkbox input. |
