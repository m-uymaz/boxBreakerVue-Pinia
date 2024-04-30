import { setActivePinia, createPinia } from 'pinia'
import { useAppStateStore } from '../../src/stores/appStateStore'
import { GridColumnsIndices, GridRowIndices, KeyboardInputs, BoxColors } from '../../src/constants/constants'

describe('AppState Store', () => {
    beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
    })

    it('holds state', () => {
        const store = useAppStateStore();
        const boxColors: string[] = Object.values(BoxColors);

        expect(store.gridArray.length).toBe(20);

        store.gridArray.forEach((arr, index) => {
            expect(arr.length).toBe(10);

            if (index < 2) {
                arr.forEach(el => expect(boxColors.includes(el!)).toBeTruthy());
            } else arr.forEach(el => expect(el).toBeNull());
        })
    })

    it('returns score', () => {
        const store = useAppStateStore();

        expect(store.getScore).toEqual('000000');
    })

    it('sets game over', () => {
        const store = useAppStateStore();

        store.setGameOver()

        // Any point of using this?
        expect(() => store.setGameOver).toBeInstanceOf(Function);
        expect(store.gameOverState).toBeTruthy();
    })

    test('catching box from grid', () => {
        const store = useAppStateStore();

        const catchBoxFrom = { y: 1, x: 5 }
        const caughtBoxRGB = store.gridArray[catchBoxFrom.y][catchBoxFrom.x];

        store.catchBox();

        expect(() => store.catchBox).toBeInstanceOf(Function);
        expect(typeof store.caughtBox).toEqual('string');
        expect(store.caughtBox).toEqual(caughtBoxRGB);
        expect(store.gridArray[catchBoxFrom.y][catchBoxFrom.x]).toBeNull();
    })

    test('throwing box to same position it has been caught from', () => {
        const store = useAppStateStore();

        const catchBoxFrom = { y: 1, x: 5 };
        const caughtBoxRGB = store.gridArray[catchBoxFrom.y][catchBoxFrom.x];

        store.catchBox();
        store.throwBox();

        expect(typeof store.gridArray[catchBoxFrom.y][catchBoxFrom.x]).toEqual('string');
        expect(store.gridArray[catchBoxFrom.y][catchBoxFrom.x]).toEqual(caughtBoxRGB);
    })

    test('moving arrow left', () => {
        const store = useAppStateStore();
        let defaultArrowIndex = store.arrowIndex;

        const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowLeft))

        mock();

        expect(mock).toHaveBeenCalledTimes(1);
        expect(store.arrowIndex).toEqual(--defaultArrowIndex);
    })

    test('move arrow far left', () => {
        const store = useAppStateStore();
        const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowLeft));

        // move arrow to the left 10 times
        for (let i = 0; i < 10; i++) mock()

        expect(mock).toHaveBeenCalledTimes(10);
        expect(store.arrowIndex).toEqual(GridColumnsIndices.First);
    })

    test('moving arrow right', () => {
        const store = useAppStateStore();
        let defaultArrowIndex = store.arrowIndex;

        const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowRight))

        mock();

        expect(mock).toHaveBeenCalledTimes(1);
        expect(store.arrowIndex).toEqual(++defaultArrowIndex);
    })

    test('move arrow far right', () => {
        const store = useAppStateStore();
        const mock = jest.fn(() => store.playerMovements(KeyboardInputs.ArrowRight));

        // move arrow to the left 10 times
        for (let i = 0; i < 10; i++) mock()

        expect(mock).toHaveBeenCalledTimes(10);
        expect(store.arrowIndex).toEqual(GridColumnsIndices.Last);
    })

    test('throw box to far left', () => {
        const store = useAppStateStore();
        const farLeftThrowPosition = {y: 2, x: 0}

        store.catchBox();
        const caughtBox = store.caughtBox;

        for (let i = 0; i < 10; i++) store.playerMovements(KeyboardInputs.ArrowLeft)
        
        expect(store.gridArray[farLeftThrowPosition.y][farLeftThrowPosition.x]).toBeNull();

        store.throwBox();

        expect(store.gridArray[farLeftThrowPosition.y][farLeftThrowPosition.x]).toEqual(caughtBox);
    })

    test('throw box to far right', () => {
        const store = useAppStateStore();
        const farLeftDropPosition = {y: 2, x: 9}

        store.catchBox();
        const caughtBox = store.caughtBox;

        for (let i = 0; i < 10; i++) store.playerMovements(KeyboardInputs.ArrowRight)
        
        expect(store.gridArray[farLeftDropPosition.y][farLeftDropPosition.x]).toBeNull();

        store.throwBox();

        expect(store.gridArray[farLeftDropPosition.y][farLeftDropPosition.x]).toEqual(caughtBox);
    })

    test('create 1 new line', () => {
        const store = useAppStateStore();
        const firstLineIndex = 0;
        const secondLineIndex = 1;
        const thirdLineIndex = 2;

        expect(store.gridArray[firstLineIndex].every(el => el !== null)).toBeTruthy();
        expect(store.gridArray[secondLineIndex].every(el => el !== null)).toBeTruthy();

        expect(store.gridArray[thirdLineIndex].every(el => el !== null)).toBeFalsy();

        store.moveDown();

        expect(store.gridArray[thirdLineIndex].every(el => el !== null)).toBeTruthy();
    })

    test('fill grid with lines', () => {
        const store = useAppStateStore();

        for (let i = 0; i < GridRowIndices.Last; i++) store.moveDown();

        for (let i = 0; i < GridRowIndices.Last; i++) {
            expect(store.gridArray[i].every(el => el !== null)).toBeTruthy();
        }
    })
})