import { setActivePinia, createPinia } from "pinia";
import { explodeDelay, fillEmptyGridSpacesDelay, clearPrevTimeouts } from "../../src/modules/gameLogic";
import { useAppStateStore } from "../../src/stores/appStateStore";
import { AppStore } from "../../src/types/types";

describe("Timeouts", () => {
    let store: AppStore;
    beforeEach(() => {
        setActivePinia(createPinia());
        store = useAppStateStore();
    });

    Object.defineProperty(global, 'performance', {
        writable: true,
    });

    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    describe('explodeDelay()', () => {

        test('explodingBoxeN takes arr values of blinkingBoxesN and blinkingBoxesN is left with no values', () => {
            const seedArrBlinkingBoxes = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            const timeoutFunc = jest.fn(() => explodeDelay(store, 1000));
    
            store.blinkingBoxesN = [...seedArrBlinkingBoxes];
            expect(store.blinkingBoxesN).toEqual(seedArrBlinkingBoxes);
            expect(timeoutFunc).not.toHaveBeenCalled();

            timeoutFunc();
            jest.advanceTimersByTime(500);
    
            expect(store.blinkingBoxesN).toEqual(seedArrBlinkingBoxes);
            expect(store.explodingBoxesN).toEqual([]);

            jest.advanceTimersByTime(500);
    
            expect(timeoutFunc).toHaveBeenCalledTimes(1);
            expect(store.blinkingBoxesN).toEqual([]);
            expect(store.explodingBoxesN).toEqual(seedArrBlinkingBoxes);
        });

        it('should catch err and reject promise', () => {
            const timeoutFunc = jest.fn(() =>
                explodeDelay(store, 1100)
            );

            expect(timeoutFunc).rejects.toThrowErrorMatchingSnapshot();
        });
    });

    describe('fillEmptyGridSpacesDelay', () => {

        it('should resolve',() => {
            const timeoutFunc = jest.fn(() =>
                fillEmptyGridSpacesDelay(store, 500)
            );

            expect(timeoutFunc()).resolves.toMatchSnapshot();
        });

        it('should catch err and reject promise', () => {
            const timeoutFunc = jest.fn(() =>
                fillEmptyGridSpacesDelay(store, 1100)
            );

            expect(timeoutFunc()).rejects.toThrowErrorMatchingSnapshot();
        });
    });

    describe('clearActiveTimeouts', () => {

        it('clears active timeouts', () => {
            const timeoutFunc1 = jest.fn(() => explodeDelay(store, 1000));
            const timeoutFunc2 = jest.fn(() => fillEmptyGridSpacesDelay(store, 1000));

            timeoutFunc1();
            timeoutFunc2();
            jest.advanceTimersByTime(500);

            expect(typeof store.timeouts.explodeTimeout).toBe('number');
            expect(typeof store.timeouts.fillEmptyGridSpacesTimeout).toBe('number');

            clearPrevTimeouts(store);

            expect(store.timeouts.explodeTimeout).toBeNull();
            expect(store.timeouts.fillEmptyGridSpacesTimeout).toBeNull();
        });
    });
});
