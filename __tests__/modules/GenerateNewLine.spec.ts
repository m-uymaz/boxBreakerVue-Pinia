import { generateNewLine } from "../../src/modules/gameLogic"
import { BoxColors } from "../../src/constants/constants";

describe('generateNewLine()', () => {
    it('generates a new array with a length of 10', () => {
        const arr = generateNewLine();

        expect(arr).toBeInstanceOf(Array);
        expect(arr.length).toBe(10);
    });

    test('all elements of array must be strings from BoxColors', () => {
        const arr = generateNewLine();
        const boxColors: string[] = Object.values(BoxColors);

        arr.forEach(rgb => expect(boxColors.includes(rgb)).toBeTruthy());
    });
});