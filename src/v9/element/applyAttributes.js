const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";

const applyAttributes = ({ inElement, inAttributes }) => {
    const localElement = inElement;
    const localAttributes = inAttributes;

    if (
        !localElement ||
        !localAttributes ||
        typeof localAttributes !== "object"
    ) {
        return localElement;
    }

    const isSvgElement = typeof SVGElement !== "undefined"
        ? localElement instanceof SVGElement
        : localElement.namespaceURI === "http://www.w3.org/2000/svg";

    Object.entries(localAttributes).forEach(([attrName, value]) => {
        if (attrName === "class") {
            if (isSvgElement) {
                localElement.setAttribute("class", String(value));
            } else {
                localElement.className = value;
            }
            return;
        }

        if (attrName === "xlink:href" || attrName === "href") {
            if (value !== undefined && value !== null) {
                const strVal = String(value);
                if (isSvgElement) {
                    try {
                        localElement.setAttributeNS(XLINK_NAMESPACE, "href", strVal);
                    } catch (e) {}
                }
                localElement.setAttribute("href", strVal);
                localElement.setAttribute("xlink:href", strVal);
            }
            return;
        }

        if (typeof value === "boolean") {
            if (value) {
                localElement.setAttribute(attrName, "");
            } else {
                localElement.removeAttribute(attrName);
            }
            return;
        }

        if (value !== undefined && value !== null) {
            localElement.setAttribute(attrName, String(value));
        }
    });

    return localElement;
};

export { applyAttributes };
export default applyAttributes;
