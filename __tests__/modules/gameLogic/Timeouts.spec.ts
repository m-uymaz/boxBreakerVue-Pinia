import { setActivePinia, createPinia } from "pinia";
import { explodeDelay } from "../../../src/modules/gameLogic";
import { useAppStateStore } from "../../../src/stores/appStateStore";

describe("Timeouts", () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
  });

  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  test("...", () => {
    const store = useAppStateStore();
    const seedArrBlinkingBoxes = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const timeout = explodeDelay(store, 1000);

    store.blinkingBoxesN = [...seedArrBlinkingBoxes];

    expect(store.blinkingBoxesN).toEqual(seedArrBlinkingBoxes);

    const callBack = jest.fn(() => timeout);

    callBack();
    jest.runAllTimers();

    expect(callBack).toHaveBeenCalledTimes(1);
    expect(store.blinkingBoxesN).toEqual([]);
  });
});
