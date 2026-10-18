import registerGlobal from "./registerGlobal.js";
import { traverse } from "./traverse.js";
import reviewSpec from "../v4/review/index.js";
import meta from "./meta.js";

const buildSpecElement = (inArgs = {}) => {
    const localSpec = inArgs?.spec ?? inArgs?.inSpec ?? inArgs;
    return traverse(localSpec);
};

const specToDom = buildSpecElement;
const buildSpec = traverse;

export {
    buildSpecElement,
    specToDom,
    buildSpec,
    traverse,
    reviewSpec,
    meta
};

registerGlobal({
    inFuncDefinition: buildSpecElement,
    inReviewSpec: reviewSpec
});

export default buildSpecElement;
