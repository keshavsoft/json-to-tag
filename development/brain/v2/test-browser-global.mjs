import assert from "node:assert/strict";

class MiniNode {
    constructor() { this.childNodes = []; this.parentNode = null; }
    appendChild(node) { this.childNodes.push(node); node.parentNode = this; return node; }
}

class MiniText extends MiniNode {
    constructor(value) { super(); this.nodeValue = String(value); }
    get textContent() { return this.nodeValue; }
}

class MiniElement extends MiniNode {
    constructor(tagName) {
        super();
        this.tagName = tagName.toUpperCase();
        this.attributes = {};
        this.className = "";
        this.classList = {
            add: (...names) => {
                const current = this.className.split(/\s+/).filter(Boolean);
                this.className = [...new Set([...current, ...names])].join(" ");
            }
        };
    }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    set id(value) { this.attributes.id = String(value); }
    set title(value) { this.attributes.title = String(value); }
    get textContent() { return this.childNodes.map((n) => n.textContent).join(""); }
    set textContent(value) { this.childNodes = [new MiniText(value)]; }
}

class MiniDocument {
    createElement(tagName) { return new MiniElement(tagName); }
    createTextNode(value) { return new MiniText(value); }
}

globalThis.document = new MiniDocument();
globalThis.Node = MiniNode;
globalThis.window = globalThis;

await import("./src/v7/index.js");

assert.ok(window.ks);
assert.ok(window.ks.jsonToTag);
assert.equal(typeof window.ks.jsonToTag.buildSpecElement, "function");

const spec = {
    tagName: "div",
    attributes: { id: "root" },
    classList: ["container", "table"],
    children: [
        { tagName: "h1", textContent: "Hello" },
        { tagName: "p", textContent: "JSON-to-Tag V7" }
    ]
};

const element = window.ks.jsonToTag.buildSpecElement(spec);

assert.equal(element.tagName, "DIV");
assert.equal(element.attributes.id, "root");
assert.equal(element.className, "container table");
assert.equal(element.childNodes.length, 2);
assert.equal(element.childNodes[0].textContent, "Hello");
assert.equal(element.childNodes[1].textContent, "JSON-to-Tag V7");

console.log("window.ks.jsonToTag: PASS");
console.log("buildSpecElement through window.ks: PASS");
console.log("DOM construction: PASS");
