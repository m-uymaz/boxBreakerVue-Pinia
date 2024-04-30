import { setActivePinia, createPinia } from "pinia";
import { BoxColors } from "../../../src/constants/constants";
import { floodFill, fill, fillEmptyGridSpaces, generateNewLine } from "../../../src/modules/gameLogic"
import { useAppStateStore } from "../../../src/stores/appStateStore";
import { GridArray } from "../../../src/types/types";

describe('Flood Fill Functions', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    });

    describe('Fill Function', () => {
        test('destroying the first two rows with same color boxes', () => {
            const colorToDestroy = BoxColors.blue;
            const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                if (n < 2) return Array(10).fill(colorToDestroy);
                return Array(10).fill(null);
            });
            const explodedBoxes = [];
            const testPosition = { y: 1, x: 1 };

            fill(seedGrid, testPosition.y, testPosition.x, colorToDestroy, explodedBoxes);

            expect(explodedBoxes.length).toEqual(20);
        })

        test('destroying the second row with same color boxes', () => {
            const colorToDestroy = BoxColors.blue;
            const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                if (n === 0) return generateNewLine();
                if (n === 1) return Array(10).fill(colorToDestroy);
                return Array(10).fill(null);
            })
            const testPosition = { y: 1, x: 5 };
            const explodedBoxes = [];

            fill(seedGrid, testPosition.y, testPosition.x, colorToDestroy, explodedBoxes);

            expect(explodedBoxes.length).toBeGreaterThanOrEqual(10);
        })
    })

    describe('FloodFill Function', () => {
        test('if floodFill sets correct blinkingBoxes, checkBoxPositions and explodedBoxes array length', () => {
            const store = useAppStateStore();
            const colorToDestroy = BoxColors.red;
            const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                if (n < 6) return Array(10).fill(colorToDestroy);
                return Array(10).fill(null);
            });
            store.gridArray = seedGrid;
            const testPosition = { y: 5, x: 9 };

            floodFill(store, testPosition);

            const blinkingBoxesNLength = store.blinkingBoxesN.length;
            const checkBoxPositionsLength = store.checkBoxPositions.length;
            const explodedBoxesLength = store.explodedBoxes.length;


            expect(store.blinkingBoxesN.length).toBeGreaterThanOrEqual(10);
            expect(store.checkBoxPositions.length).toBeGreaterThanOrEqual(10);
            expect(store.explodedBoxes.length).toBeGreaterThanOrEqual(10);

            const allSameLength = [checkBoxPositionsLength, explodedBoxesLength]
                .every(arrLength => arrLength === blinkingBoxesNLength)

            expect(allSameLength).toBeTruthy();
        })
    })

    describe('FillEmptyGridSpaces Function', () => {
        test('...', () => {
            const store = useAppStateStore();
            const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                if (n < 5 || n > 7) return generateNewLine();
                return Array(10).fill(null);
            });

            store.gridArray = seedGrid;
            const expectedNullIndices = [5, 6, 7];

            const areRowsNull = () => {
                return expectedNullIndices.every((index) => store.gridArray[index].every(el => el === null))
            }

            expect(areRowsNull()).toBeTruthy();

            fillEmptyGridSpaces(store);

            expect(areRowsNull()).toBeFalsy();
        })
    })
})