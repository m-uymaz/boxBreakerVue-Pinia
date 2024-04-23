import { GridRowIndeces } from '../constants/constants.js';
import { AppStateInterface } from '../types/types.js';
import gameOver from "./gameOver.js";

// Throw box to the first null location
const throwBox = (store: AppStateInterface): void => {
    for (let yIndex = store.highestPositionY; 0 <= yIndex; yIndex--) {
        // If you try to put a block on the last index line - Game Over
        if (yIndex === GridRowIndeces.NextToLast && store.gridArray[yIndex][store.arrowIndex] !== null) {
            gameOver(store);
            break;
        };

        if (yIndex === GridRowIndeces.First) {
            if (store.gridArray[yIndex][store.arrowIndex] === null) {
                store.gridArray[yIndex][store.arrowIndex] = store.coughtBox;
                store.thrownBox = { y: 0, x: store.arrowIndex }
            } else {
                store.gridArray[yIndex + 1][store.arrowIndex] = store.coughtBox;
                store.thrownBox = { y: 1, x: store.arrowIndex }
            }
            store.coughtBox = null;
        }
        if (store.gridArray[yIndex][store.arrowIndex] === null) continue;

        if (yIndex !== GridRowIndeces.First) {
            //Put the box on the next Y index
            let upperGridIndex: number = yIndex + 1;
            store.gridArray[upperGridIndex][store.arrowIndex] = store.coughtBox;

            store.thrownBox = { y: yIndex + 1, x: store.arrowIndex }
            store.coughtBox = null;
        }

        //Find when the box is put, if it creates a new hight
        if (yIndex >= store.highestPositionY) store.highestPositionY++;

        if (store.thrownBox) {
            store.checkBoxPositions = [{ y: store.thrownBox.y, x: store.thrownBox.x }];
            store.coughtBoxFrom = null;
        }
        break;
    }
}

export default throwBox;

