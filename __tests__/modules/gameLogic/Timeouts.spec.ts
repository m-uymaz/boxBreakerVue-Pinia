import { setActivePinia, createPinia } from "pinia";
import { explodeDelay, clearPrevTimeouts } from "../../../src/modules/gameLogic";
import { useAppStateStore } from "../../../src/stores/appStateStore";

describe("Timeouts", () => {
    beforeEach(() => {
    setActivePinia(createPinia());
    });

    Object.defineProperty(global, 'performance', {
        writable: true,
    });

    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    test('explodingBoxeN takes arr values of blinkingBoxesN and blinkingBoxesN is left with no values in arr', () => {
        const store = useAppStateStore();
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
    
    test('clearing active timeouts', () => {
        const store = useAppStateStore();
        const timeoutFunc = jest.fn(() => explodeDelay(store, 1000));

        timeoutFunc();
        jest.advanceTimersByTime(500);

        expect(typeof store.timeouts.explodeTimeout).toBe('number');

        clearPrevTimeouts(store);

        expect(store.timeouts.explodeTimeout).toBeNull();
    });
});
