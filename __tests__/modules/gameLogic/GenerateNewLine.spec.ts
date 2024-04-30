import { generateNewLine } from "../../../src/modules/gameLogic"
import { BoxColors } from "../../../src/constants/constants";

describe('Generate New Line', () => {
    it('Generates a new array with a length of 10', () => {
        const arr = generateNewLine();

        expect(arr).toBeInstanceOf(Array);
        expect(arr.length).toEqual(10);
    })

    test('All elements of array must be strings from BoxColors', () => {
        const arr = generateNewLine();
        const boxColors: string[] = Object.values(BoxColors);

        arr.forEach(rgb => expect(boxColors.includes(rgb)).toBeTruthy());
    })
})