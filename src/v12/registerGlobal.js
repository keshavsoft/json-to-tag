import meta from "./meta.js";

export const registerGlobal = (inArg) => {
    if (typeof globalThis === "undefined" || !inArg) return;

    globalThis.ks ??= {};

    const buildSpecElement = typeof inArg === "function" ? inArg : inArg.buildSpecElement;
    const buildSpecElementWithValidate = inArg.buildSpecElementWithValidate;

    const api = {
        meta,
        buildSpecElement,
        ...(buildSpecElementWithValidate ? { buildSpecElementWithValidate } : {})
    };

    globalThis.ks["json-to-tag"] = api;
    globalThis.ks.jsonToTag = api;
};

export default registerGlobal;
