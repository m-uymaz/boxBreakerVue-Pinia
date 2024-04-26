import { ARROW, GridLengths } from '../../constants/constants.js';
import { randomColor } from './';
import { GridArray } from '../../types/types.js';

const generateInitialGrid = () => {
    const gridArray: GridArray = Array.from(Array(20), () => new Array(10).fill(null));
    gridArray[19][5] = ARROW;

    for (let y = 0; y < GridLengths.RowLength; y++) {
        for (let x = 0; x < GridLengths.ColumnsLength; x++) {
            if (y < 2) {
                const color = randomColor();
                gridArray[y][x] = color.rgb;
            }
        }
    }
    return gridArray;
}

export { generateInitialGrid};