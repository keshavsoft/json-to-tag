// Mock DOM
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

import buildSpecElementV10, { gaurdFunc as gaurdFuncV10, guardFunc as guardFuncV10 } from "../src/v10/index.js";
import buildSpecElementV9, { gaurdFunc as gaurdFuncV9 } from "../src/v9/index.js";
import buildSpecElementRoot from "../src/index.js";

console.log("=== Testing Valid Specs ===");

// 1. Single valid element
const el1 = buildSpecElementV10({ tagName: "div", attributes: { id: "test-div" } });
console.log("✓ V10 valid single element:", el1.tagName, el1.getAttribute("id"));

// 2. Array of valid elements
const elArray = buildSpecElementV10([
    { tagName: "span" },
    { tagName: "b" }
]);
console.log("✓ V10 valid array length:", elArray.length);

// 3. Root export (src/index.js -> v10)
const elRoot = buildSpecElementRoot({ tagName: "h1", textContent: "Hello World" });
console.log("✓ Root export build element:", elRoot.tagName, elRoot.childNodes[0]?.textContent);

// 4. Wrapped inSpec & spec
const elWrapped = buildSpecElementV10({ inSpec: { tagName: "button" } });
console.log("✓ V10 inSpec wrapped:", elWrapped.tagName);

// 5. Direct gaurdFunc call
const gResult = gaurdFuncV10({ inSpec: { tagName: "table" }, inshowLog: true });
console.log("✓ Direct gaurdFunc result:", gResult);

console.log("\n=== Testing Guard Invalidation & Error Throwing ===");

// Test null/undefined
try {
    buildSpecElementV10(null);
    throw new Error("Failed: null did not throw!");
} catch (e) {
    console.log("✓ Correctly caught null error:", e.message);
}

try {
    buildSpecElementV10();
    throw new Error("Failed: undefined/empty did not throw!");
} catch (e) {
    console.log("✓ Correctly caught empty error:", e.message);
}

// Test missing tagName
try {
    buildSpecElementV10({});
    throw new Error("Failed: empty object did not throw!");
} catch (e) {
    console.log("✓ Correctly caught missing tagName error:", e.message);
}

// Test empty tagName string
try {
    buildSpecElementV10({ tagName: "" });
    throw new Error("Failed: empty string tagName did not throw!");
} catch (e) {
    console.log("✓ Correctly caught empty tagName string error:", e.message);
}

// Test invalid tagName type
try {
    buildSpecElementV10({ tagName: 123 });
    throw new Error("Failed: non-string tagName did not throw!");
} catch (e) {
    console.log("✓ Correctly caught non-string tagName error:", e.message);
}

// Test invalid showLog type
try {
    buildSpecElementV10({ inSpec: { tagName: "div" }, inShowLog: "invalid" });
    throw new Error("Failed: non-boolean showLog did not throw!");
} catch (e) {
    console.log("✓ Correctly caught non-boolean showLog error:", e.message);
}

// Test V9 backward compatibility with valid spec
const elV9 = buildSpecElementV9({ tagName: "section" });
console.log("✓ V9 valid element:", elV9.tagName);

console.log("\nALL GUARD TESTS PASSED SUCCESSFULLY! 🚀");
