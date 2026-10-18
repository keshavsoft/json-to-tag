import { resolveValue } from "./value.js";
import traverseArray from "./traverseArray/index.js";
import { traverse } from "./traverse.js";
import buildDomElement from "./buildDomElement.js";

/*
 * An object mapping defines the output keys. Each instruction tells us how
 * to obtain that output value.
 *
 * JSON-to-DOM adds one natural object case: when the object contains
 * `tagName`, that object is a DOM specification rather than a transformer
 * output object. The existing recursive traversal remains the engine that
 * walks its children.
 */
const appendDomChild = (inElement, inChild) => {
    if (inChild === null || inChild === undefined) return;

    if (typeof Node !== "undefined" && inChild instanceof Node) {
        inElement.appendChild(inChild);
        return;
    }

    if (typeof inChild === "string" || typeof inChild === "number") {
        inElement.appendChild(document.createTextNode(String(inChild)));
    }
};

const buildDomObject = (mapping, source, context) => {
    const element = buildDomElement({
        inSpec: mapping
    });

    if (!element) return null;

    if (!Array.isArray(mapping.children)) {
        return element;
    }

    mapping.children.forEach((child) => {
        if (child === null || child === undefined) return;

        if (
            (typeof Node !== "undefined" && child instanceof Node) ||
            typeof child === "string" ||
            typeof child === "number"
        ) {
            appendDomChild(element, child);
            return;
        }

        const childNode = traverse(child, source, context);

        if (Array.isArray(childNode)) {
            childNode.forEach((node) => appendDomChild(element, node));
            return;
        }

        appendDomChild(element, childNode);
    });

    return element;
};

const startFunc = (mapping, source, context) => {
    if (
        mapping &&
        typeof mapping === "object" &&
        !Array.isArray(mapping) &&
        typeof mapping.tagName !== "undefined"
    ) {
        return buildDomObject(mapping, source, context);
    }

    const result = {};

    Object.keys(mapping).forEach((outputKey) => {
        const instruction = mapping[outputKey];

        if (typeof instruction === "string") {
            result[outputKey] = resolveValue(
                instruction,
                source,
                context.rootSource,
                context.configuration
            );
            return;
        }

        if (Array.isArray(instruction) && instruction.length > 0) {
            result[outputKey] = traverseArray(instruction[0], source, context);
            return;
        }

        if (instruction && typeof instruction === "object") {
            result[outputKey] = traverse(instruction, source, context);
        }
    });

    return result;
};

export default startFunc;
