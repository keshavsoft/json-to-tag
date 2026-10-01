/**
 * JSON-to-Tag V7
 *
 * Starting point: node-json-transformer v19 traversal architecture.
 *
 * The original transformer API remains available through `transform`.
 * JSON-to-DOM adds `buildSpecElement`, which uses the same traversal engine
 * with one additional object meaning: an object containing `tagName` is a
 * DOM specification.
 */

import { traverse } from "./traverse.js";
import meta from "./meta.js";
import registerGlobal from "./registerGlobal.js";

const transform = (inData, inTransformation) => {
    let source = inData;
    let transformation = inTransformation;

    if (
        inData !== null &&
        typeof inData === "object" &&
        "inData" in inData &&
        inTransformation === undefined
    ) {
        source = inData.inData;
        transformation = inData.inTransformation;
    }

    const { mapping, config = {} } = transformation;

    return traverse(mapping, source, {
        rootSource: source,
        configuration: config
    });
};

const buildSpecElement = (inArgs = {}) => {
    const localSpec =
        inArgs &&
        typeof inArgs === "object" &&
        "spec" in inArgs
            ? inArgs.spec
            : inArgs;

    return traverse(localSpec, localSpec, {
        rootSource: localSpec,
        configuration: {}
    });
};

const transformHelper = { transform };

registerGlobal({
    inFuncDefinition: buildSpecElement
});

export { transform, buildSpecElement, meta };
export default transformHelper;
