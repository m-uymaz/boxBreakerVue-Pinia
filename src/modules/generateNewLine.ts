import randomColor from './randomColor.js';
import { RandomColor, newLineArray } from '../types/types.js';

const generateNewLine = (): newLineArray => {
    const arr: newLineArray = Array.from(Array(10)).map(() => {
        const color: RandomColor = randomColor();
        return color.rgb;
    });
    return arr;
}

export default generateNewLine;