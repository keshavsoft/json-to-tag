import { resolveValue } from "./value.js";
import traverseArray from "./traverseArray/index.js";
import { traverse } from "./traverse.js";
import buildDomElement from "./elementBuilder/index.js";

/*
 * The original object-mapping traversal is retained below.
 *
 * A DOM specification is simply another object traversal whose defining
 * instruction is tagName. Once tagName is found, the current object becomes
 * the DOM element to build and children are traversed through the same loop.
 */
const buildDomObject = (spec, source, context) => {
    const element = buildDomElement({ inSpec: spec });
    if (!element) return null;

    if (Array.isArray(spec.children)) {
        spec.children.forEach((child) => {
            const childResult = traverse(child, child, context);

            if (Array.isArray(childResult)) {
                childResult.forEach((item) => {
                    if (typeof Node !== "undefined" && item instanceof Node) {
                        element.appendChild(item);
                    } else if (typeof item === "string" || typeof item === "number") {
                        element.appendChild(document.createTextNode(String(item)));
                    }
                });
                return;
            }

            if (typeof Node !== "undefined" && childResult instanceof Node) {
                element.appendChild(childResult);
            } else if (typeof childResult === "string" || typeof childResult === "number") {
                element.appendChild(document.createTextNode(String(childResult)));
            }
        });
    }

    return element;
};

/*
 * An object mapping defines the output keys. Each instruction tells us how
 * to obtain that output value.
 *
 * The DOM branch is deliberately first: tagName is the natural point at
 * which JSON-to-DOM changes from describing data to creating an element.
 */
const startFunc = (mapping, source, context = {}) => {
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
