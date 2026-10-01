import assert from "node:assert/strict";
import { buildSpecElement, transform } from "./src/v7/index.js";

class MiniNode {
    constructor() {
        this.childNodes = [];
        this.parentNode = null;
    }

    appendChild(node) {
        this.childNodes.push(node);
        node.parentNode = this;
        return node;
    }

    append(...nodes) {
        nodes.forEach((node) => this.appendChild(node));
    }

    get textContent() {
        return this.childNodes.map((node) => node.textContent).join("");
    }

    set textContent(value) {
        this.childNodes = [new MiniText(String(value))];
    }
}

class MiniText extends MiniNode {
    constructor(value) {
        super();
        this.nodeValue = value;
    }

    get textContent() {
        return this.nodeValue;
    }
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

    setAttribute(name, value) {
        this.attributes[name] = String(value);
    }

    get outerHTML() {
        const attributes = Object.entries(this.attributes)
            .map(([name, value]) => ` ${name}="${value}"`)
            .join("");
        const classAttribute = this.className
            ? ` class="${this.className}"`
            : "";
        return `<${this.tagName.toLowerCase()}${classAttribute}${attributes}>${this.childNodes.map((node) => node.outerHTML ?? node.textContent).join("")}</${this.tagName.toLowerCase()}>`;
    }
}

class MiniDocument {
    createElement(tagName) {
        return new MiniElement(tagName);
    }

    createTextNode(value) {
        return new MiniText(value);
    }
}

const documentValue = new MiniDocument();
globalThis.document = documentValue;
globalThis.Node = MiniNode;

const spec = {
    tagName: "div",
    attributes: { id: "root" },
    classList: ["container", "table"],
    children: [
        {
            tagName: "h1",
            textContent: "Hello"
        },
        {
            tagName: "p",
            children: ["JSON-to-Tag", " V7"]
        }
    ]
};

const element = buildSpecElement(spec);

assert.equal(element.tagName, "DIV");
assert.equal(element.attributes.id, "root");
assert.equal(element.className, "container table");
assert.equal(element.childNodes.length, 2);
assert.equal(element.childNodes[0].textContent, "Hello");
assert.equal(element.childNodes[1].textContent, "JSON-to-Tag V7");

const transformed = transform(
    { name: "Keshav" },
    { mapping: { title: "name" } }
);

assert.deepEqual(transformed, { title: "Keshav" });

console.log("V7 DOM test: PASS");
console.log(element.outerHTML);
console.log("V19 transformer compatibility test: PASS");
