# Browser Examples

## Button

```javascript
const spec = {
  tagName: "button",
  textContent: "Submit",
  classList: "btn btn-primary"
};

const element =
  window.ks.jsonToTag.buildSpecElement(spec);

document.body.appendChild(element);
```

## Nested Card

```javascript
const spec = {
  tagName: "div",
  classList: "card",
  children: [
    { tagName: "h2", textContent: "Profile" },
    { tagName: "p", textContent: "JSON generated UI" },
    { tagName: "button", textContent: "Open" }
  ]
};

document.body.appendChild(
  window.ks.jsonToTag.buildSpecElement(spec)
);
```
