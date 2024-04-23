import { GridLengths } from '../constants/constants.js';
import gameOver from "./gameOver.js";
import generateNewLine from "./generateNewLine.js";

import { newLineArray, AppStateInterface } from "../types/types.js";

const moveDown = (store: AppStateInterface): void => {
    if (store.gameOverState) return;

    if (store.checkBoxPositions.length) store.checkBoxPositions.map(position => position.y++);
    if (store.explodedBoxes.length) store.explodedBoxes.map(position => position.y++);
    if (store.blinkingBoxesN.length) store.blinkingBoxesN = store.blinkingBoxesN.map(boxN => boxN += 10);
    
    const newArray: newLineArray = generateNewLine();
    store.gridArray.pop();
    store.gridArray.unshift(newArray);

    let lineBlank: boolean = store.gridArray[store.highestPositionY + 1].filter(box => box !== null).length ? true : false;

    if (lineBlank) store.highestPositionY++;
    if (store.highestPositionY + 1 === GridLengths.RowLength) gameOver(store);

    // console.clear();
    // console.table(gridArray);
}

export default moveDown;