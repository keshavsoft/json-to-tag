import createElement from "./createElement.js";
import applyTextContent from "./applyTextContent.js";
import applyProperties from "./applyProperties.js";
import applyAttributes from "./applyAttributes.js";
import applyClassList from "./applyClassList.js";

/**
 * Constructs a single DOM element and applies its properties, textContent,
 * attributes, and classList.
 * This is the outside action injected into the decoupled traversal engine.
 */
const buildElement = (spec) => {
    if (!spec || typeof spec !== "object" || Array.isArray(spec)) return null;
    if (!spec.tagName) return null;

    const element = createElement({ inTagName: spec.tagName });
    if (!element) return null;

    applyTextContent({
        inElement: element,
        inTextContent: spec.textContent,
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

    return element;
};

export { buildElement };
export default buildElement;
