const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const SVG_TAGS = new Set([
    "svg", "path", "symbol", "use", "g", "circle", "ellipse", "rect",
    "line", "polyline", "polygon", "text", "tspan", "defs", "clippath",
    "mask", "pattern", "marker", "lineargradient", "radialgradient", "stop",
    "image", "filter", "fegaussianblur", "femerge", "femergenode"
]);

const createElement = ({ inTagName }) => {
    const localTagName = inTagName?.toLowerCase();
    if (!localTagName) return null;

    if (localTagName === "checkbox") {
        const inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        return inputElement;
    }

    if (SVG_TAGS.has(localTagName)) {
        return document.createElementNS(SVG_NAMESPACE, localTagName);
    }

    return document.createElement(localTagName);
};

export { createElement };
export default createElement;
