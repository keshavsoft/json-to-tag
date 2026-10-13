
import registerGlobal from "./registerGlobal.js";
import { traverse } from "./traverse.js";
import reviewSpec from "../v4/review/index.js";
import meta from "./meta.js";
import guardFunc from "./guard.js";

// Prepare and validate the specification
const getSpec = (inArgs = {}) => {
    const localSpec =
        inArgs?.spec ??
        inArgs?.inSpec ??
        inArgs?.inspec ??
        inArgs;

    const localShowLog =
        inArgs?.showLog ??
        inArgs?.inShowLog ??
        inArgs?.inshowLog;

    const specJson = {
        spec: localSpec,
        showLog: localShowLog
    };

    guardFunc({ inConfig: specJson });

    return specJson;
};

// Build the DOM element from the validated specification
const buildSpecElement = (inArgs = {}) => {
    const specJson = getSpec(inArgs);

    if (specJson.showLog) {
        console.log("buildSpecElement 1 (spec):", specJson);
    }

    const content = traverse(specJson.spec);

    if (specJson.showLog) {
        console.log("buildSpecElement 2 (content):", content);
    }

    return content;
};

const specToDom = buildSpecElement;
const buildSpec = traverse;

// Public exports
export {
    getSpec,
    buildSpecElement,
    specToDom,
    buildSpec,
    traverse,
    reviewSpec,
    meta,
    guardFunc
};

export { guardFunc as gaurdFunc };

// Register the public API
registerGlobal({
    inFuncDefinition: buildSpecElement,
    inReviewSpec: reviewSpec
});

export default buildSpecElement;
