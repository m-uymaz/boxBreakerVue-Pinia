import { randomColor } from "../../../src/modules/gameLogic"
import { BoxColors } from "../../../src/constants/constants";
describe('Random Color', () => {
    it('creates random color object', () => {
        const colorObj = randomColor();

        expect(colorObj).toBeInstanceOf(Object);
        expect(typeof colorObj.rgb).toEqual('string');
        expect(typeof colorObj.index).toEqual('number');
    })

    test('random color index is in correct range', () => {
        for (let i = 0; i < 10; i++) {
            const colorObj = randomColor();
            expect(colorObj.index).toBeGreaterThanOrEqual(0);
            expect(colorObj.index).toBeLessThanOrEqual(5);
        }
    })

    test('random color rgb is correct', () => {
        const boxColors: string[] = Object.values(BoxColors);
        
        for (let i = 0; i < 10; i++) {
            const colorObj = randomColor();
            expect(boxColors.includes(colorObj.rgb))
        }
    })
})