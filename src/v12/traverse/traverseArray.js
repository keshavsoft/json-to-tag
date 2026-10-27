import { traverse } from "./index.js";

/**
 * Traverse an array of child specifications and delegate each item to the dispatcher.
 */
const traverseArray = ({ inItems, inFunc }) => {
    const localItems = inItems;
    const localFunc = inFunc;

    if (!Array.isArray(localItems)) {
        return [];
    }

    return localItems.map((inItem) => {
        return traverse({ inSpec: inItem, inFunc: localFunc });
    }).flat(Infinity).filter(Boolean);
};

export { traverseArray };
export default traverseArray;
