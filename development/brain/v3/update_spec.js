import fs from "fs";

const specPath = "samples/table/dashboard/spec.json";
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));

let savedReportsCount = 0;

function updateNode(node) {
    if (!node || typeof node !== "object") return;

    if (node.tagName === "a" && Array.isArray(node.children)) {
        const svgChild = node.children.find(c => c && c.tagName === "svg");
        if (svgChild && Array.isArray(svgChild.children)) {
            const useChild = svgChild.children.find(c => c && c.tagName === "use");
            const href = useChild?.attributes?.["xlink:href"] || useChild?.attributes?.href;
            
            if (href === "#house-fill" && !node.children.includes("Dashboard")) {
                node.children.push("Dashboard");
            } else if (href === "#file-earmark" && !node.children.includes("Orders")) {
                node.children.push("Orders");
            } else if (href === "#cart" && !node.children.includes("Products")) {
                node.children.push("Products");
            } else if (href === "#people" && !node.children.includes("Customers")) {
                node.children.push("Customers");
            } else if (href === "#graph-up" && !node.children.includes("Reports")) {
                node.children.push("Reports");
            } else if (href === "#puzzle" && !node.children.includes("Integrations")) {
                node.children.push("Integrations");
            } else if (href === "#file-earmark-text") {
                const labels = ["Current month", "Last quarter", "Social engagement", "Year-end sale"];
                const label = labels[savedReportsCount] || "Report";
                if (!node.children.includes(label)) {
                    node.children.push(label);
                }
                savedReportsCount++;
            } else if (href === "#gear-wide-connected" && !node.children.includes("Settings")) {
                node.children.push("Settings");
            } else if (href === "#door-closed" && !node.children.includes("Sign out")) {
                node.children.push("Sign out");
            }
        }
    }

    if (node.tagName === "button" && Array.isArray(node.children)) {
        const svgChild = node.children.find(c => c && c.tagName === "svg");
        if (svgChild && Array.isArray(svgChild.children)) {
            const useChild = svgChild.children.find(c => c && c.tagName === "use");
            const href = useChild?.attributes?.["xlink:href"] || useChild?.attributes?.href;
            if (href === "#calendar3" && !node.children.includes("This week")) {
                node.children.push("This week");
            }
        }
    }

    if (Array.isArray(node.children)) {
        node.children.forEach(child => {
            if (child && typeof child === "object") updateNode(child);
        });
    }
}

if (Array.isArray(spec)) {
    spec.forEach(updateNode);
} else {
    updateNode(spec);
}

fs.writeFileSync(specPath, JSON.stringify(spec, null, 4), "utf8");
console.log("Successfully updated spec.json with mixed text labels!");
