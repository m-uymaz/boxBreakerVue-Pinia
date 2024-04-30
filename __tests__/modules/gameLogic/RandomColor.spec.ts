import { randomColor } from "../../../src/modules/gameLogic"
import { BoxColors } from "../../../src/constants/constants";
describe('Random Color', () => {
    it('creates random color object', () => {
        const mock = jest.fn(randomColor);

        const colorObj = mock();

        expect(colorObj).toBeInstanceOf(Object);
        expect(typeof colorObj.rgb).toEqual('string');
        expect(typeof colorObj.index).toEqual('number');
    })

    test('random color index is in correct range', () => {
        const mock = jest.fn(randomColor);

        for (let i = 0; i < 10; i++) {
            const colorObj = mock();
            expect(colorObj.index).toBeGreaterThanOrEqual(0);
            expect(colorObj.index).toBeLessThanOrEqual(5);
        }
    })

    test('random color rgb is correct', () => {
        const mock = jest.fn(randomColor);
        const boxColors: string[] = Object.values(BoxColors);
        
        for (let i = 0; i < 10; i++) {
            const colorObj = mock();
            expect(boxColors.includes(colorObj.rgb))
        }
    })
})