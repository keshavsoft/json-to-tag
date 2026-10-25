import registerGlobal from "./registerGlobal.js";
import { traverse } from "./traverse/index.js";
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
    meta
};

registerGlobal(buildSpecElement);

export default buildSpecElement;
