/**
 * json-to-tag v5
 *
 * This version keeps the highest node-json-transformer traversal source as
 * the starting architecture. The transformer files are intentionally kept
 * intact where their generic JSON transformation behavior is not required
 * by JSON-to-DOM.
 *
 * The DOM-specific change is small:
 *   JSON object -> find tagName -> create element -> loop children -> repeat
 */
import { traverse } from "./traverse.js";
import reviewSpec from "../v4/review/index.js";
import meta from "./meta.js";
import registerGlobal from "./registerGlobal.js";

const buildSpecElement = (inArgs = {}) => {
    const localSpec = inArgs?.spec ?? inArgs?.inSpec ?? inArgs;
    return traverse(localSpec, localSpec, {
        rootSource: localSpec,
        configuration: {}
    });
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
