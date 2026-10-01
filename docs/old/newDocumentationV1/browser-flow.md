# Browser Flow

```text
1. Browser loads HTML
2. Browser loads json-to-tag from CDN
3. JSON specification is created
4. buildSpecElement() receives the specification
5. json-to-tag creates native DOM
6. Application appends the returned node
7. Browser renders the result
```
