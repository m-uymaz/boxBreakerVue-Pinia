import { randomColor } from "../../src/modules/gameLogic"
import { BoxColors } from "../../src/constants/constants";
describe('randomColor()', () => {
    it('creates a random color object', () => {
        const colorObj = randomColor();

        expect(colorObj).toBeInstanceOf(Object);
        expect(typeof colorObj.rgb).toBe('string');
        expect(typeof colorObj.index).toBe('number');
    });

    test('value of "index" is in correct range', () => {
        for (let i = 0; i < 10; i++) {
            const colorObj = randomColor();
            expect(colorObj.index).toBeGreaterThanOrEqual(0);
            expect(colorObj.index).toBeLessThanOrEqual(5);
        };
    });

    test('value of "rgb" is always from BoxColors enum', () => {
        const boxColors: string[] = Object.values(BoxColors);
        
        for (let i = 0; i < 10; i++) {
            const colorObj = randomColor();
            expect(boxColors.includes(colorObj.rgb))
        };
    });
});