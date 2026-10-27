import { traverseArray } from "./traverseArray.js";

/**
 * Traverse one JSON element specification and execute the outside function.
 * Decoupled from DOM creation: solely responsible for visiting the node and recursing into children.
 */
const traverseObject = ({ inSpec, inFunc }) => {
    const localSpec = inSpec;
    const localFunc = inFunc;

    if (!localSpec || typeof localSpec !== "object" || Array.isArray(localSpec)) {
        return null;
    }

    const result = typeof localFunc === "function" ? localFunc(localSpec) : null;

    if (Array.isArray(localSpec.children)) {
        const childResults = traverseArray({ inItems: localSpec.children, inFunc: localFunc });
        if (result && typeof result.append === "function" && Array.isArray(childResults)) {
            const validChildren = childResults.filter(Boolean);
            if (validChildren.length) result.append(...validChildren);
        }
    }

    return result;
};

export { traverseObject };
export default traverseObject;
