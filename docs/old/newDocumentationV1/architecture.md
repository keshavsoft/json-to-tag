# Browser Architecture

```text
JSON
 ↓
CDN Library
 ↓
window.ks.jsonToTag
 ↓
buildSpecElement()
 ↓
buildSpec()
 ↓
Element Builder
 ↓
Native DOM
 ↓
Browser Page
```

The specification can represent a single element, an array of specifications, or an existing DOM node. Child specifications are resolved recursively.
