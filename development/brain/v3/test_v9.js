// Lightweight native DOM mock to test in Node without external dependencies

class MockNode {
    constructor(nodeType, tagName, namespaceURI = null) {
        this.nodeType = nodeType;
        this.tagName = tagName;
        this.namespaceURI = namespaceURI;
        this.childNodes = [];
        this.attributes = {};
        this.className = "";
    }
    get firstElementChild() {
        return this.childNodes.find(c => c.nodeType === 1) || null;
    }
    setAttribute(name, val) {
        this.attributes[name] = String(val);
    }
    getAttribute(name) {
        return this.attributes[name];
    }
    removeAttribute(name) {
        delete this.attributes[name];
    }
    setAttributeNS(ns, name, val) {
        this.attributes[`${ns}:${name}`] = String(val);
        this.attributes[name] = String(val);
    }
    append(...children) {
        this.childNodes.push(...children);
    }
}

class MockTextNode extends MockNode {
    constructor(text) {
        super(3, "#text");
        this.textContent = String(text);
    }
}

class MockElement extends MockNode {
    constructor(tagName, namespaceURI = null) {
        super(1, tagName.toUpperCase(), namespaceURI);
    }
}

class MockSVGElement extends MockElement {
    constructor(tagName) {
        super(tagName, "http://www.w3.org/2000/svg");
    }
}

globalThis.Node = MockNode;
globalThis.SVGElement = MockSVGElement;
globalThis.document = {
    createElement(tagName) {
        return new MockElement(tagName);
    },
    createElementNS(ns, tagName) {
        if (ns === "http://www.w3.org/2000/svg") {
            return new MockSVGElement(tagName);
        }
        return new MockElement(tagName, ns);
    },
    createTextNode(text) {
        return new MockTextNode(text);
    }
};

import buildSpecElement from "../../../src/v9/index.js";

// Test 1: SVG Elements with namespace & xlink:href
const svgSpec = {
    tagName: "svg",
    attributes: {
        class: "bi my-icon",
        viewBox: "0 0 16 16"
    },
    children: [
        {
            tagName: "use",
            attributes: {
                "xlink:href": "#house-fill"
            }
        }
    ]
};

const svgElement = buildSpecElement(svgSpec);
console.log("SVG Tag:", svgElement.tagName);
console.log("SVG Namespace:", svgElement.namespaceURI);
console.log("SVG Class:", svgElement.getAttribute("class"));
console.log("Use Tag:", svgElement.firstElementChild?.tagName);
console.log("Use Namespace:", svgElement.firstElementChild?.namespaceURI);
console.log("Use href:", svgElement.firstElementChild?.getAttribute("href") || svgElement.firstElementChild?.getAttribute("xlink:href"));

if (svgElement.namespaceURI !== "http://www.w3.org/2000/svg") {
    throw new Error("SVG element does not have SVG namespace!");
}
if (svgElement.firstElementChild?.namespaceURI !== "http://www.w3.org/2000/svg") {
    throw new Error("<use> element does not have SVG namespace!");
}

// Test 2: Mixed content (SVG + Text Node child)
const mixedSpec = {
    tagName: "a",
    attributes: {
        class: "nav-link"
    },
    children: [
        {
            tagName: "svg",
            attributes: { class: "bi" },
            children: [{ tagName: "use", attributes: { href: "#cart" } }]
        },
        "Products"
    ]
};

const aElement = buildSpecElement(mixedSpec);
console.log("A Tag childNodes count:", aElement.childNodes.length);
console.log("A Tag child 0:", aElement.childNodes[0].tagName);
console.log("A Tag child 1 type:", aElement.childNodes[1].nodeType, "text:", JSON.stringify(aElement.childNodes[1].textContent));

if (aElement.childNodes.length !== 2) {
    throw new Error("Mixed content failed! Expected 2 childNodes.");
}
if (aElement.childNodes[1].textContent !== "Products") {
    throw new Error("Child text node content mismatch!");
}

console.log("ALL V9 TESTS PASSED SUCCESSFULLY!");
