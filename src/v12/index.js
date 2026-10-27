import registerGlobal from "./registerGlobal.js";
import { traverse } from "json-traversal";
import { validate } from "json-to-tag-validate";
import { buildElement } from "./element/buildElement.js";
import meta from "./meta.js";

/**
 * 1. The Classic / High-Speed Function (Unvalidated)
 * Pure DOM compilation using json-traversal with zero validation overhead.
 */
const buildSpecElement = (inArgs = {}) => {
    const localSpec = inArgs?.spec ?? inArgs?.inSpec ?? inArgs;
    return traverse({ inSpec: localSpec, inFunc: buildElement });
};

/**
 * 2. The New Validated Function
 * Runs json-to-tag-validate first, warns on rule mismatches, then compiles.
 */
const buildSpecElementWithValidate = (inArgs = {}) => {
    const localSpec = inArgs?.spec ?? inArgs?.inSpec ?? inArgs;

    const check = validate({ inJson: localSpec });
    if (!check.isValid) {
        console.warn("[json-to-tag] Specification validation issues:", check.errors);
    }

    return traverse({ inSpec: localSpec, inFunc: buildElement });
};

const specToDom = buildSpecElement;
const buildSpec = buildSpecElement;

export {
    buildSpecElement,
    buildSpecElementWithValidate,
    specToDom,
    buildSpec,
    traverse,
    validate,
    meta
};

registerGlobal({
    buildSpecElement,
    buildSpecElementWithValidate
});

export default buildSpecElement;
