import { traverse } from "./traverse.js";

/**
 * Resolve one JSON-to-DOM child instruction.
 *
 * A child can be an existing DOM node, a primitive value, a text node specification,
 * an element specification, or an array of child instructions.
 */
const resolveChild = (child) => {
    if (child === null || child === undefined) return null;

    if (typeof Node !== "undefined" && child instanceof Node) {
        return child;
    }

    if (typeof child === "string" || typeof child === "number") {
        return document.createTextNode(String(child));
    }

    if (typeof child === "object") {
        if (child.nodeType === 3 || child.tagName === "#text") {
            return document.createTextNode(child.textContent ?? child.text ?? "");
        }
        if (!child.tagName && (child.textContent !== undefined || child.text !== undefined)) {
            return document.createTextNode(child.textContent ?? child.text ?? "");
        }
    }

    return traverse(child);
};

export { resolveChild };
export default resolveChild;
