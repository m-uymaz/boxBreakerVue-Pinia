import { GridColumnsIndices, GridRowIndices } from "../../../src/constants/constants";
import { rowIndex, colIndex } from "../../../src/modules/gameLogic";

describe('Finds Row index', () => {
    test('returns the first row index', () => {
        const BoxN = 7;
        const boxRowIndex = rowIndex(BoxN);
        
        const expectedIndex = 0;
        expect(boxRowIndex).toBe(expectedIndex);
    });

    test('returns the 5th row index', () => {
        const BoxN = 59;
        const boxRowIndex = rowIndex(BoxN);

        const expectedIndex = 5;
        expect(boxRowIndex).toBe(expectedIndex);
    });

    test('returns the last row index', () => {
        const BoxN = 195;
        const boxRowIndex = rowIndex(BoxN);

        const expectedIndex = GridRowIndices.Last;
        expect(boxRowIndex).toBe(expectedIndex);
    });
});

describe('Finds Column Index', () => {
    test('returns the first column index', () => {
        const BoxN = 1;
        const boxColIndex = colIndex(BoxN);
        
        const expectedIndex = GridColumnsIndices.First;
        expect(boxColIndex).toBe(expectedIndex);
    });

    test('returns the last column index', () => {
        const BoxN = 10;
        const boxColIndex = colIndex(BoxN);
        
        const expectedIndex = GridColumnsIndices.Last;
        expect(boxColIndex).toBe(expectedIndex);
    });

    test('returns the 5th column index', () => {
        const BoxN = 6;
        const boxColIndex = colIndex(BoxN);
        
        const expectedIndex = 5;
        expect(boxColIndex).toBe(expectedIndex);
    });
});