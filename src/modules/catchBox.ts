import { GridRowIndeces } from '../constants/constants.js';
import { AppStateInterface } from '../types/types.js';

// Catch the first available box
const catchBox = (store: AppStateInterface): void => {
    for (let y = GridRowIndeces.NextToLast; 0 <= y; y--) {
        if (store.explodedBoxes.filter(obj => obj.y === y && obj.x === store.arrowIndex).length) break;

        if (store.gridArray[y][store.arrowIndex] === null) {
            continue;
        } else {
            store.coughtBox = store.gridArray[y][store.arrowIndex];
            store.gridArray[y][store.arrowIndex] = null;
            store.coughtBoxFrom = { y: y, x: store.arrowIndex }
            break;
        }
    }
    // console.clear();
    // console.table(gridArray);
}

export default catchBox;