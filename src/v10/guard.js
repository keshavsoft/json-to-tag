
const guardFunc = ({ inConfig } = {}) => {
    if (
        !inConfig ||
        typeof inConfig !== "object" ||
        Array.isArray(inConfig)
    ) {
        console.error("Config must be an object");
        throw new TypeError("Config must be an object");
    }

    const localSpec = inConfig.spec;
    const localShowLog = inConfig.showLog;

    if (localSpec === null || localSpec === undefined) {
        console.error("spec must not be null or undefined");
        throw new TypeError("spec must not be null or undefined");
    }

    const isNode =
        typeof Node !== "undefined" &&
        localSpec instanceof Node;

    const isArray = Array.isArray(localSpec);

    const isObject =
        typeof localSpec === "object" &&
        localSpec !== null;

    const isPrimitive =
        typeof localSpec === "string" ||
        typeof localSpec === "number";

    if (!isNode && !isArray && !isObject && !isPrimitive) {
        console.error(
            "spec must be an object, array, DOM node, string, or number"
        );

        throw new TypeError(
            "spec must be an object, array, DOM node, string, or number"
        );
    }

    if (isObject && !isArray && !isNode) {
        if (
            !localSpec.tagName &&
            localSpec.textContent === undefined &&
            localSpec.text === undefined
        ) {
            console.error("spec must have a tagName");
            throw new Error("spec must have a tagName");
        }

        if (localSpec.tagName !== undefined) {
            if (
                typeof localSpec.tagName !== "string" ||
                localSpec.tagName.trim() === ""
            ) {
                console.error(
                    "tagName must be a non-empty string"
                );

                throw new TypeError(
                    "tagName must be a non-empty string"
                );
            }
        }
    }

    if (
        localShowLog !== undefined &&
        typeof localShowLog !== "boolean"
    ) {
        console.error("showLog must be a boolean");
        throw new TypeError("showLog must be a boolean");
    }

    return true;
};

export { guardFunc, guardFunc as gaurdFunc };
export default guardFunc;
