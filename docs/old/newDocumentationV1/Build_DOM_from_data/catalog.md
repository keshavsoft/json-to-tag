# Tag Catalog

The repository keeps a catalog of supported tags and associated rules under `docs/tags`.

The catalog includes:

- `tags.json` — tag definitions
- `tags.schema.json` — catalog schema
- `individualTags/` — per-tag documentation pages
- catalog JavaScript used to compute and render catalog information

The existing documentation describes the catalog as the source used for tag analysis and review.

## What the catalog communicates

Depending on the tag definition, the catalog can describe capabilities such as:

- whether children are allowed
- whether direct text content is allowed
- permitted attributes
- permitted child tags
- JSON authoring examples

## Explore it

- Catalog: https://keshavsoft.github.io/json-to-tag/tags/index.html
- Individual tags: https://keshavsoft.github.io/json-to-tag/tags/individualTags/index.html
- Raw catalog: https://keshavsoft.github.io/json-to-tag/tags/tags.json
- Schema: https://keshavsoft.github.io/json-to-tag/tags/tags.schema.json

## Recommended way to use the catalog

Start with the individual tag page when you are authoring a new specification. Then use the review tools to verify that the complete specification uses tags recognized by the catalog.
