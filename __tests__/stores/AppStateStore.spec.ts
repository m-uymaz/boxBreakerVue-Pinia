import { setActivePinia, createPinia } from 'pinia';
import { useAppStateStore } from '../../src/stores/appStateStore';
import { GridColumnsIndices, GridRowIndices, KeyboardInputs, BoxColors, STARTING_ARROW_COL_INDEX, ARROW } from '../../src/constants/constants';
import { AppStore, GridArray } from '../../src/types/types';

describe('AppState Store', () => {
    let store: AppStore;
    beforeEach(() => {
        setActivePinia(createPinia());
        store = useAppStateStore();
    });

    describe('State', () => {

        describe('gridArray', () => {
            it('holds correct initial grid state', () => {
                const boxColors: string[] = Object.values(BoxColors);

                expect(store.gridArray.length).toBe(20);

                store.gridArray.forEach((row, rowIndex) => {
                    expect(row.length).toBe(10);

                    if (rowIndex < 2) {
                        row.forEach(colEl => expect(boxColors.includes(colEl!)).toBeTruthy());
                    } else {
                        row.forEach((colEl, colIndex) => {
                            if (colIndex === STARTING_ARROW_COL_INDEX && rowIndex === GridRowIndices.Last) {
                                expect(colEl).toBe(ARROW);
                            } else {
                                expect(colEl).toBeNull();
                            }
                        });
                    };
                });
            });
        });
    });

    describe('Getters', () => {

        describe('getScore', () => {
            it('returns default score string', () => {
                expect(store.getScore).toBe('000000');
            });

            it('returns current score, with leading zeros', () => {
                store.score = 50;

                expect(store.getScore).toBe('000050');
            });
        });
    });

    describe('Actions', () => {

        describe('setGameOver()', () => {
            it('sets game over state to true', () => {
                store.setGameOver();

                // Any point of using this?
                expect(store.setGameOver).toBeInstanceOf(Function);
                expect(store.gameOverState).toBeTruthy();
            });
        });

        describe('catchBox()', () => {
            it('catches box from the grid', () => {
                const catchBoxFrom = { y: 1, x: 5 };
                const caughtBoxRGB = store.gridArray[catchBoxFrom.y][catchBoxFrom.x];

                store.catchBox();

                expect(store.catchBox).toBeInstanceOf(Function);
                expect(typeof store.caughtBox).toEqual('string');
                expect(store.caughtBox).toEqual(caughtBoxRGB);
                expect(store.gridArray[catchBoxFrom.y][catchBoxFrom.x]).toBeNull();
            });

            test('boxes soon to explode can not be caught', () => {
                const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                    if (n < 1) return Array(10).fill(BoxColors.red);
                    return Array(10).fill(null);
                });
                store.gridArray = JSON.parse(JSON.stringify(seedGrid));
                const testPosition = { y: 0, x: 5 };

                store.explodedBoxes.push(testPosition);
                store.catchBox();

                expect(store.caughtBox).toBeNull();
                expect(store.gridArray[testPosition.y][testPosition.x]).not.toBeNull();
            });
        });

        describe('throwBox()', () => {
            it('throws box to same position it has been caught from', () => {
                const catchBoxFrom = { y: 1, x: 5 };
                const caughtBoxRGB = store.gridArray[catchBoxFrom.y][catchBoxFrom.x];

                store.catchBox();
                store.throwBox();

                expect(typeof store.gridArray[catchBoxFrom.y][catchBoxFrom.x]).toEqual('string');
                expect(store.gridArray[catchBoxFrom.y][catchBoxFrom.x]).toEqual(caughtBoxRGB);
            });

            test('thrown box on the last index causes game over', () => {
                const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                    if (n < 19) return Array(10).fill(BoxColors.red);
                    return Array(10).fill(null);
                });

                store.gridArray = JSON.parse(JSON.stringify(seedGrid));
                store.caughtBox = BoxColors.blue;
                store.highestPositionY = GridRowIndices.NextToLast;

                store.throwBox();

                expect(store.gameOverState).toBe(true);
            });

            test('thrown box to first row, on a null col, equal the thrown box', () => {
                const seedGrid: GridArray = Array.from(Array(20), (_, n) => {
                    return Array(10).fill(null);
                });
                const testThrownPosition = { y: 0, x: 5 };

                store.gridArray = JSON.parse(JSON.stringify(seedGrid));
                store.caughtBox = BoxColors.red;
                store.throwBox();

                expect(store.gridArray[testThrownPosition.y][testThrownPosition.x]).toBe(BoxColors.red);
            });
        });

        describe('playerMovements()', () => {
            test('moving arrow left', () => {
                let defaultArrowIndex = store.arrowIndex;

                const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowLeft));

                mock();

                expect(mock).toHaveBeenCalledTimes(1);
                expect(store.arrowIndex).toEqual(--defaultArrowIndex);
            });

            test('move arrow far left', () => {
                const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowLeft));

                // move arrow to the left 10 times
                for (let i = 0; i < 10; i++) mock();

                expect(mock).toHaveBeenCalledTimes(10);
                expect(store.arrowIndex).toEqual(GridColumnsIndices.First);
            });

            test('moving arrow right', () => {
                let defaultArrowIndex = store.arrowIndex;

                const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowRight));

                mock();

                expect(mock).toHaveBeenCalledTimes(1);
                expect(store.arrowIndex).toEqual(++defaultArrowIndex);
            });

            test('move arrow far right', () => {
                const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowRight));

                // move arrow to the left 10 times
                for (let i = 0; i < 10; i++) mock();

                expect(mock).toHaveBeenCalledTimes(10);
                expect(store.arrowIndex).toEqual(GridColumnsIndices.Last);
            });
        });

        describe('moveDown()', () => {
            it('creates 1 new grid line', () => {
                const firstLineIndex = 0;
                const secondLineIndex = 1;
                const thirdLineIndex = 2;

                expect(store.gridArray[firstLineIndex].every(el => el !== null)).toBeTruthy();
                expect(store.gridArray[secondLineIndex].every(el => el !== null)).toBeTruthy();

                expect(store.gridArray[thirdLineIndex].every(el => el !== null)).toBeFalsy();

                store.moveDown();

                expect(store.gridArray[thirdLineIndex].every(el => el !== null)).toBeTruthy();
            });

            test('if explodingBoxes and blinkingBoxesN move their positions, proportional to moveDown() being called', () => {
                store.explodedBoxes = [{ y: 1, x: 5 }];
                store.blinkingBoxesN = [10];

                store.moveDown();
                store.moveDown();
                
                expect(store.explodedBoxes[0]).toEqual({ y: 3, x: 5 });
                expect(store.blinkingBoxesN[0]).toBe(30);
            });

            it('fills the whole grid', () => {
                for (let i = 0; i < GridRowIndices.Last; i++) store.moveDown();

                for (let i = 0; i < GridRowIndices.Last; i++) {
                    expect(store.gridArray[i].every(el => el !== null)).toBeTruthy();
                }
            });
        });

        test('throw box to far left', () => {
            const farLeftThrowPosition = { y: 2, x: 0 }

            store.catchBox();
            const caughtBox = store.caughtBox;

            for (let i = 0; i < 10; i++) store.playerMovements(KeyboardInputs.ArrowLeft);
        
            expect(store.gridArray[farLeftThrowPosition.y][farLeftThrowPosition.x]).toBeNull();

            store.throwBox();

            expect(store.gridArray[farLeftThrowPosition.y][farLeftThrowPosition.x]).toEqual(caughtBox);
        });

        test('throw box to far right', () => {
            const farLeftDropPosition = { y: 2, x: 9 }

            store.catchBox();
            const caughtBox = store.caughtBox;

            for (let i = 0; i < 10; i++) store.playerMovements(KeyboardInputs.ArrowRight);
        
            expect(store.gridArray[farLeftDropPosition.y][farLeftDropPosition.x]).toBeNull();

            store.throwBox();

            expect(store.gridArray[farLeftDropPosition.y][farLeftDropPosition.x]).toEqual(caughtBox);
        });

        test('if one box will cause game over, when it reaches the last grid index', () => {
            store.catchBox();
            store.playerMovements(KeyboardInputs.ArrowRight);
            store.throwBox();

            for (let i = 0; i < 20; i++) store.moveDown();

            expect(store.gameOverState).toBe(true);
        });
    });
});