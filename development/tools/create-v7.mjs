/**
 * JSON-to-Tag development tool
 *
 * Purpose:
 *   Create src/v7 from a supplied node-json-transformer source tree.
 *
 * Usage:
 *   node development/tools/create-v7.mjs \
 *       --transformer ../node-json-transformer/src/v19 \
 *       --target ./src/v7
 *
 * Safety:
 *   - Does not modify existing source versions.
 *   - Refuses to overwrite an existing target.
 *   - Copies the transformer tree first.
 *
 * This first version deliberately performs only the safe, reproducible
 * source-copy operation. DOM-specific edits should be added explicitly
 * after the copied architecture has been reviewed.
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const readArgument = (name) => {
    const index = process.argv.indexOf(name);

    if (index === -1) {
        return undefined;
    }

    return process.argv[index + 1];
};

const transformerPath = readArgument("--transformer");
const targetPath = readArgument("--target");

const fail = (message) => {
    console.error(`ERROR: ${message}`);
    process.exit(1);
};

if (!transformerPath || !targetPath) {
    fail(
        "Usage: node create-v7.mjs --transformer <source> --target <src/v7>"
    );
}

const source = path.resolve(process.cwd(), transformerPath);
const target = path.resolve(process.cwd(), targetPath);

if (source === target) {
    fail("Source and target cannot be the same directory.");
}

const sourceStat = await fs.stat(source).catch(() => null);

if (!sourceStat?.isDirectory()) {
    fail(`Transformer source directory does not exist: ${source}`);
}

const targetStat = await fs.stat(target).catch(() => null);

if (targetStat) {
    fail(`Target already exists. Nothing was changed: ${target}`);
}

await fs.mkdir(path.dirname(target), { recursive: true });
await fs.cp(source, target, {
    recursive: true,
    errorOnExist: true,
});

console.log("V7 source created.");
console.log(`From : ${source}`);
console.log(`To   : ${target}`);
console.log("");
console.log("Next step: review the copied architecture before making");
console.log("any DOM-specific changes.");
