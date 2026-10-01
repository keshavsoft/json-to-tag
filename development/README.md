# Development

This folder contains the development system for `json-to-tag`.

## Structure

```text
development/
├── README.md
├── brain/
│   └── v1/
│       └── README.md
└── tools/
    └── create-v7.mjs
```

## Development flow

```text
brain
  ↓
decision
  ↓
tool
  ↓
src/vN
  ↓
test
  ↓
next brain entry
```

### brain

Records why an experiment is being made, the decisions taken, constraints,
observations, and conclusions.

### tools

Contains reproducible development programs. A tool should create or validate
source rather than requiring manual copying and editing.

### Source versions

Development tools must never modify an existing `src/vN` version.
New experiments are created as new versions.
