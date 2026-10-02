# Development Brain: json-to-tag v9 Upgrade

## Objective
Upgrade `json-to-tag` from `v8` to `v9` without touching `v8` (keeping previous versions intact).
Fix SVG element namespace rendering, SVG attribute handling, and mixed text-node child rendering.

## Completed Tasks
- [x] Create brain documentation in `development/brain/v3/`
- [x] Copy `src/v8` to `src/v9` (keeping `src/v8` intact)
- [x] Implement SVG namespace creation in `src/v9/element/createElement.js`
- [x] Implement SVG attribute compatibility in `src/v9/element/applyAttributes.js` (`class`, `xlink:href`, `href`)
- [x] Verify child text node support in `src/v9/resolve.js` and `src/v9/traverseObject.js`
- [x] Update `src/v9/meta.js`, `src/v9/registerGlobal.js`, and `src/v9/index.js`
- [x] Update `samples/table/dashboard/index.html` to point to `/src/v9/index.js` and set `data-bs-theme="dark"`
- [x] Update `samples/table/dashboard/spec.json` with mixed text labels ("Dashboard", "Orders", "Products", etc.)
- [x] Add interactive theme switcher support in `samples/table/dashboard/index.js` adhering to `{ inParam }` / `localParam` naming convention
- [x] Create and run automated test suite in `development/brain/v3/test_v9.js` (ALL TESTS PASSED)
- [x] Verify complete DOM rendering of `samples/table/dashboard/` with all 12 icons and labels intact

## Results
1. `document.createElementNS("http://www.w3.org/2000/svg", tagName)` creates true `SVGSVGElement` and `SVGElement` nodes instead of `HTMLUnknownElement`.
2. SVG attributes (`class`, `xlink:href`, `href`) are applied correctly without throwing on `SVGAnimatedString`.
3. Mixed content (`<svg>` + text node `"Products"`) resolves and appends in exact order.
4. Old `src/v8` code is 100% untouched.
