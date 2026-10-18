import meta from "./meta.js";

/**
 * Register the V7 public API on the browser/SSR global.
 */
const registerGlobal = (inArgs = {}) => {
    const localArgs = inArgs;
    const localFuncDefinition = localArgs?.inFuncDefinition;
    const localReviewSpec = localArgs?.inReviewSpec;

    if (typeof globalThis === "undefined" || !localFuncDefinition) return;

    globalThis.ks ??= {};

    globalThis.ks["json-to-tag"] = {
        meta,
        buildSpecElement: localFuncDefinition,
        reviewSpec: localReviewSpec
    };

    globalThis.ks.jsonToTag = globalThis.ks["json-to-tag"];
};

export default registerGlobal;
