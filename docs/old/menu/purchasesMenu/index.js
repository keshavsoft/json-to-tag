import { buildSpecElement } from "../../dist/v4/min.js";

const render = async ({ inVariantKey, inMountId }) => {
    const localVariantKey = inVariantKey;
    const localMountId = inMountId;

    const response = await fetch("../menu.json");
    const data = await response.json();
    const spec = data[localVariantKey];

    const element = buildSpecElement({ inSpec: spec });
    const mount = document.getElementById(localMountId);
    mount.appendChild(element);

    // Wire collapse if present
    const toggleBtn = element.querySelector('[data-bs-toggle="collapse"]');
    const collapseTarget = element.querySelector('#mobileNavCollapse');
    if (toggleBtn && collapseTarget) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.bootstrap?.Collapse) {
                const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseTarget, { toggle: false });
                bsCollapse.toggle();
            } else {
                collapseTarget.classList.toggle('show');
            }
        });
    }
};

render({ inVariantKey: "purchasesMenu", inMountId: "header-mount" });
