import meta from "./meta.js";

export const registerGlobal = ({ inFuncDefinition, inReviewSpec } = {}) => {
    if (typeof globalThis === "undefined" || !inFuncDefinition) return;

    globalThis.ks ??= {};

    const api = {
        meta,
        buildSpecElement: inFuncDefinition,
        reviewSpec: inReviewSpec
    };

    globalThis.ks["json-to-tag"] = api;
    globalThis.ks.jsonToTag = api;
};

export default registerGlobal;
