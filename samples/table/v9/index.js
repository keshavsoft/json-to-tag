import spec from "./spec.json" with { type: "json" };

const startFunc = () => {
    try {
        const createDomElement = window.ks.jsonToTag.buildSpecElement(spec);
        console.log("createDomElement : ", createDomElement);

        const cont1 = document.getElementById("form-container");
        cont1.append(createDomElement);
    } catch (err) {
        console.error("Failed to render v27 sample:", err);
    }
};

startFunc();
