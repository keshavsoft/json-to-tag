# Documentation Redesign Notes

The existing supplied page is a documentation/tools directory. This redesign keeps the same project but changes the presentation into a guided learning path.

## Main improvements

- Product-style hero section instead of a directory-only opening.
- Clear “Start → Spec → Architecture → Review → Catalog” progression.
- Architecture shown as a visual pipeline.
- API and schema concepts are explained before the deeper reference material.
- Current repository terminology is retained: `buildSpecElement`, `reviewSpec`, `src/v4`, staged `elementBuilder`, tag catalog, playground and review hub.
- Links to the live GitHub Pages tools remain available.

## Suggested folder

```text
json-to-tag-new-documentation/
├── README.md
├── DESIGN-NOTES.md
└── docs/
    ├── index.html
    ├── getting-started.md
    ├── specification.md
    ├── architecture.md
    ├── review.md
    ├── catalog.md
    ├── examples.md
    └── migration.md
```
