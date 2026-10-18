import createElement from "./0.createElement.js";
import applyTextContent from "./1.applyTextContent.js";
import applyProperties from "./2.applyProperties.js";
import applyAttributes from "./3.applyAttributes.js";
import applyClassList from "./4.applyClassList.js";

const buildDomElement = ({ inSpec }) => {
    const localSpec = inSpec;
    if (!localSpec || !localSpec.tagName) return null;

    const element = createElement({ inTagName: localSpec.tagName });
    if (!element) return null;

    applyTextContent({
        inElement: element,
        inTextContent: localSpec.textContent,
        inTagName: localSpec.tagName
    });

    applyProperties({
        inElement: element,
        inProperties: localSpec.properties
    });

    applyAttributes({
        inElement: element,
        inAttributes: localSpec.attributes
    });

    applyClassList({
        inElement: element,
        inClassList: localSpec.classList
    });

    return element;
};

export default buildDomElement;
