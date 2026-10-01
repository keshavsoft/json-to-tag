import spec from "./spec.json" with { type: "json" };

const startFunc = () => {
    try {
        // v4 API: direct spec object input without wrapper { inSpec: spec }
        const createDomElement = window.ks.jsonToTag.buildSpecElement(spec);
        console.log("createDomElement : ", createDomElement);

        const cont1 = document.getElementById("form-container");
        if (cont1 && createDomElement) {
            cont1.innerHTML = "";
            cont1.append(createDomElement);
        }

        // Populate Raw Spec viewer if present
        const jsonViewer = document.getElementById("raw-spec-viewer");
        if (jsonViewer) {
            jsonViewer.textContent = JSON.stringify(spec, null, 2);
        }

        const renderStatus = document.getElementById("render-status");
        if (renderStatus && createDomElement) {
            renderStatus.innerHTML = `<i class="bi bi-check-circle-fill text-success me-1"></i> Compiled successfully: &lt;${createDomElement.tagName.toLowerCase()}&gt; with ${createDomElement.children.length} direct sections.`;
        }
    } catch (err) {
        console.error("Failed to render form sample:", err);
        const renderStatus = document.getElementById("render-status");
        if (renderStatus) {
            renderStatus.innerHTML = `<i class="bi bi-exclamation-triangle-fill text-danger me-1"></i> Error: ${err.message}`;
        }
    }
};

// If window.ks.jsonToTag is already registered by /src/v4/index.js, render immediately, otherwise wait
if (window.ks?.jsonToTag?.buildSpecElement) {
    startFunc();
} else {
    window.addEventListener("DOMContentLoaded", () => {
        // Microtask tick to ensure module registration
        setTimeout(startFunc, 0);
    });
}
