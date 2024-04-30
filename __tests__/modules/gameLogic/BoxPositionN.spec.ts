import { GRID_BOXES_SIZE, GridColumnsIndices, GridRowIndices } from "../../../src/constants/constants";
import { boxPositionN } from "../../../src/modules/gameLogic";

describe('BoxPositionN', () => {
    it('returns fist grid box number', () => {
        const firstBox = 1;
        const indices = { y: 0, x: 0 };

        const boxN = boxPositionN(indices.y, indices.x);

        expect(boxN).toEqual(firstBox);
    })

    it('returns last possible grid box number', () => {
        const indices = { y: GridRowIndices.Last, x: GridColumnsIndices.Last }

        const boxN = boxPositionN(indices.y, indices.x);

        expect(boxN).toEqual(GRID_BOXES_SIZE);
    })

    it('returns the 75th box', () => {
        const targetBox = 75;
        const indices = { y: 7, x: 4 };

        const boxN = boxPositionN(indices.y, indices.x);

        expect(boxN).toEqual(targetBox);
    })
})