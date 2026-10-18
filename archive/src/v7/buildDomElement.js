import domElementBuilder from "./buildSpec/elementBuilder/index.js";

const buildDomElement = ({ inSpec } = {}) => {
    const localSpec = inSpec;

    if (!localSpec || typeof localSpec !== "object" || !localSpec.tagName) {
        return null;
    }

    return domElementBuilder({
        inSpec: {
            ...localSpec,
            children: []
        }
    });
};

export { buildDomElement };
export default buildDomElement;
