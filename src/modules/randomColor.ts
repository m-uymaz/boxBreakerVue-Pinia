import { BoxColors } from '../constants/constants.js';
import { RandomColor } from '../types/types.js';

const randomColor = (): RandomColor => {
    const randomIndex: number = Math.floor(Math.random() * Object.keys(BoxColors).length);
    const colorName = Object.keys(BoxColors)[randomIndex];
    const rgb: string = Object.values(BoxColors)[randomIndex];

    return { color: colorName, rgb: rgb, index: randomIndex };
}

export default randomColor;