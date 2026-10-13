import { traverseArray } from "./traverseArray.js";
import { traverseObject } from "./traverseObject.js";

/**
 * Traverse the JSON-to-DOM specification.
 *
 * This is the central dispatcher, intentionally modeled after the clear
 * traversal boundary used by node-json-transformer.
 */
const traverse = (spec) => {
    if (spec === null || spec === undefined) return null;

    if (typeof Node !== "undefined" && spec instanceof Node) {
        return spec;
    }

    if (Array.isArray(spec)) {
        return traverseArray(spec);
    }

    if (typeof spec === "object") {
        return traverseObject(spec);
    }

    if (typeof spec === "string" || typeof spec === "number") {
        return document.createTextNode(String(spec));
    }

    return null;
};

export { traverse };
export default traverse;
