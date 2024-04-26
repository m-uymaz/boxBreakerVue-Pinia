import { GridLengths } from '../../constants/constants.js';
import { ExplodedBoxes, GridArray, CurrentColor, AppStore } from '../../types/types.js';
import { boxPositionN } from './';

function floodFill(store: AppStore, position: { y: number, x: number }) {
    const copyGrid: GridArray = JSON.parse(JSON.stringify(store.gridArray));
    const current: CurrentColor = store.gridArray[position.y][position.x];

    const explodedBoxes: ExplodedBoxes = [];

    fill(copyGrid, position.y, position.x, current, explodedBoxes);

    if (explodedBoxes.length > 2) {
        explodedBoxes.sort((a, b) => a.y - b.y);
        explodedBoxes.forEach((explodedBox) => {
            store.blinkingBoxesN.push(boxPositionN(explodedBox.y, explodedBox.x));
            store.checkBoxPositions.push({ y: explodedBox.y, x: explodedBox.x });
            store.explodedBoxes.push({ y: explodedBox.y, x: explodedBox.x });
        });
    }
};

function fill(copyGrid: GridArray, y: number, x: number, current: CurrentColor, explodedBoxes: ExplodedBoxes): void {
    // If row is less than 0 - bottom case
    if (y < 0) return;

    // If column is less than 0 - bottom case
    if (x < 0) return;

    // If row is greater than copyGrid length - bottom case
    if (y > GridLengths.RowLength - 1) return;

    // If column is greater than copyGrid length - bottom case
    if (x > GridLengths.ColumnsLength - 1) return;

    // If this position does not equal the color or is null - bottom case
    if (copyGrid[y][x] !== current || copyGrid[y][x] === null) return;

    copyGrid[y][x] = null;

    explodedBoxes.push({ y: y, x: x });

    // Fill in all four directions
    // Fill Prev row
    fill(copyGrid, y - 1, x, current, explodedBoxes);

    // Fill next row
    fill(copyGrid, y + 1, x, current, explodedBoxes);

    // Fill prev col
    fill(copyGrid, y, x - 1, current, explodedBoxes);

    // Fill next col
    fill(copyGrid, y, x + 1, current, explodedBoxes);
}

// After flood fill destroys boxes, fill the null spaces with boxes above (if there are any)
function fillEmptyGridSpaces(store: AppStore): void {
    const changedBoxes: ExplodedBoxes = [];


    // SCORE IS ADDED HERE!
    store.explodedBoxes.forEach(position => {
        store.gridArray[position.y][position.x] = null;
        store.score += 10;
    });

    for (let x = 0; x < GridLengths.ColumnsLength; x++) {
        for (let y = 0; y < GridLengths.RowLength - 2; y++) {
            if (store.gridArray[y][x] === null) {
                let nextNonNull = y + 1;
                while (nextNonNull < GridLengths.RowLength && store.gridArray[nextNonNull][x] === null) {
                    nextNonNull++;
                }
                if (nextNonNull < GridLengths.RowLength - 1) {
                    store.gridArray[y][x] = store.gridArray[nextNonNull][x];
                    store.gridArray[nextNonNull][x] = null;
                    changedBoxes.push({ y: y, x: x });
                }
            }
        }
    }

    store.explodedBoxes = [];

    changedBoxes.sort((a, b) => a.y - b.y);

    return changedBoxes.forEach((position) => {
        store.checkBoxPositions.push(position);
    });
}

export { floodFill, fill, fillEmptyGridSpaces };