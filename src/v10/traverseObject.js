import { resolveValue } from "./value.js";
import createElement from "./element/createElement.js";
import applyTextContent from "./element/applyTextContent.js";
import applyProperties from "./element/applyProperties.js";
import applyAttributes from "./element/applyAttributes.js";
import applyClassList from "./element/applyClassList.js";
import { traverseArray } from "./traverseArray.js";

/**
 * Traverse one JSON element specification and construct its DOM element.
 *
 * This is the DOM equivalent of node-json-transformer's traverseObject:
 * it owns the current output object/element and delegates child traversal.
 */
const traverseObject = (spec) => {
    if (!spec || typeof spec !== "object" || Array.isArray(spec)) return null;
    if (!spec.tagName) return null;

    const element = createElement({ inTagName: spec.tagName });
    if (!element) return null;

    applyTextContent({
        inElement: element,
        inTextContent: resolveValue(spec.textContent),
        inTagName: spec.tagName
    });

    applyProperties({
        inElement: element,
        inProperties: spec.properties
    });

    applyAttributes({
        inElement: element,
        inAttributes: spec.attributes
    });

    applyClassList({
        inElement: element,
        inClassList: spec.classList
    });

    if (Array.isArray(spec.children)) {
        const childNodes = traverseArray(spec.children);
        if (childNodes.length) element.append(...childNodes);
    }

    return element;
};

export { traverseObject };
export default traverseObject;
