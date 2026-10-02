import spec from "./spec.json" with { type: "json" };

const initThemeToggle = ({ inElement } = {}) => {
    const localElement = inElement || document;
    localElement.querySelectorAll("[data-bs-theme-value]").forEach(toggle => {
        toggle.addEventListener("click", () => {
            const theme = toggle.getAttribute("data-bs-theme-value");
            if (theme === "auto") {
                const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
            } else {
                document.documentElement.setAttribute("data-bs-theme", theme);
            }
        });
    });
};

const startFunc = () => {
    try {
        const createDomElement = window.ks.jsonToTag.buildSpecElement(spec);
        console.log("createDomElement : ", createDomElement);
        // container.prepend(...createDomElement);

        const cont1 = document.getElementById("body");
        cont1.prepend(...createDomElement);

        initThemeToggle({ inElement: cont1 });
    } catch (err) {
        console.error("Failed to render v27 sample:", err);
    }
};

startFunc();
