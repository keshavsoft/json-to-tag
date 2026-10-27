import buildSpecElement, { buildSpecElementWithValidate, meta, validate } from "../src/index.js";
import assert from "node:assert/strict";

// Simple DOM environment mock for Node.js
class MockNode {}
class MockElement extends MockNode {
    constructor(tagName) {
        super();
        this.tagName = tagName.toUpperCase();
        this.attributes = {};
        this.children = [];
        this.textContent = "";
        this.className = "";
        this.classList = {
            classes: [],
            add: (...classes) => this.classList.classes.push(...classes),
            contains: (c) => this.classList.classes.includes(c)
        };
    }
    setAttribute(name, value) {
        this.attributes[name] = String(value);
    }
    removeAttribute(name) {
        delete this.attributes[name];
    }
    append(...nodes) {
        this.children.push(...nodes);
    }
}

class MockTextNode extends MockNode {
    constructor(text) {
        super();
        this.textContent = String(text);
    }
}

globalThis.Node = MockNode;
globalThis.document = {
    createElement: (tag) => new MockElement(tag),
    createElementNS: (ns, tag) => new MockElement(tag),
    createTextNode: (text) => new MockTextNode(text)
};

console.log("--- Testing json-to-tag v12 with json-traversal & json-to-tag-validate ---");
console.log("Meta:", meta);

// Test 1: buildSpecElement (Classic / fast)
const single = buildSpecElement({
    tagName: "div",
    attributes: { id: "main-div", class: "container" },
    textContent: "Hello World"
});
assert.equal(single.tagName, "DIV");
assert.equal(single.attributes.id, "main-div");
assert.equal(single.className, "container");
assert.equal(single.textContent, "Hello World");
console.log("✔ Test 1: buildSpecElement (classic) passed");

// Test 2: Nested Table tree with buildSpecElement
const tableSpec = {
    tagName: "table",
    attributes: { class: "table" },
    children: [
        {
            tagName: "thead",
            children: [
                {
                    tagName: "tr",
                    children: [
                        { tagName: "th", textContent: "Name" },
                        { tagName: "th", textContent: "Age" }
                    ]
                }
            ]
        },
        {
            tagName: "tbody",
            children: [
                {
                    tagName: "tr",
                    children: [
                        { tagName: "td", textContent: "Alice" },
                        { tagName: "td", textContent: "30" }
                    ]
                }
            ]
        }
    ]
};

const domTable = buildSpecElement(tableSpec);
assert.equal(domTable.tagName, "TABLE");
assert.equal(domTable.children.length, 2);
console.log("✔ Test 2: buildSpecElement (nested tree) passed");

// Test 3: buildSpecElementWithValidate (New validated function)
const validatedDomTable = buildSpecElementWithValidate(tableSpec);
assert.equal(validatedDomTable.tagName, "TABLE");
assert.equal(validatedDomTable.children.length, 2);
console.log("✔ Test 3: buildSpecElementWithValidate (valid tree) passed");

// Test 4: validate function directly exported
const check = validate({ inJson: tableSpec });
assert.equal(check.isValid, true);
assert.equal(check.errors.length, 0);
console.log("✔ Test 4: validate export passed");

console.log("--- All v12 tests passed with flying colors! ---");
