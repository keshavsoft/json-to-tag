import traverseArray from "./traverseArray/index.js";
import extractArrayIndex from "./extractArrayIndex.js";
import traverseObject from "./traverseObject.js";

/*
 * Mapping traversal decides what the current mapping node means.
 * The original transformer branches are intentionally retained.
 *
 * json-to-tag adds one natural case: a JSON object containing tagName is
 * itself a DOM specification, so the same traversal enters DOM construction.
 */
const traverse = (mapping, source, context = {}) => {
    if (mapping === null || mapping === undefined) return mapping;

    if (typeof mapping === "string" || typeof mapping === "number") {
        return mapping;
    }

    if (typeof Node !== "undefined" && mapping instanceof Node) {
        return mapping;
    }

    if (Array.isArray(mapping)) {
        return mapping
            .map((item) => traverse(item, item, context))
            .flat()
            .filter((item) => item !== null && item !== undefined);
    }

    if (
        mapping &&
        typeof mapping === "object" &&
        typeof mapping.tagName !== "undefined"
    ) {
        return traverseObject(mapping, source ?? mapping, context);
    }

    if (
        typeof mapping.list !== "undefined" ||
        typeof mapping.objectify !== "undefined" ||
        typeof mapping.collect !== "undefined"
    ) {
        return traverseArray(mapping, source, context);
    }

    if (typeof mapping.flat !== "undefined") {
        const extracted = extractArrayIndex(mapping.flat, source);
        return traverseObject(mapping.item, extracted, context);
    }

    if (typeof mapping.item !== "undefined") {
        return traverseObject(mapping.item, source, context);
    }

    return traverseObject(mapping, source, context);
};

export { traverse };
