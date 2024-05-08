import { BoxColors } from '../constants/constants';
import { RandomColor } from '../types/types';

export const randomColor = (): RandomColor => {
    const randomIndex: number = Math.floor(Math.random() * Object.keys(BoxColors).length);
    const rgb: string = Object.values(BoxColors)[randomIndex];

    return { rgb: rgb, index: randomIndex };
}