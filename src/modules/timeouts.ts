import { AppStore } from "../types/types";
import { fillEmptyGridSpaces } from "./floodFillFuncs";

const clearPrevTimeouts = (store: AppStore): void => {
    store.timeouts.explodeTimeout && clearTimeout(store.timeouts.explodeTimeout);
    store.timeouts.explodeTimeout = null;

    store.timeouts.fillEmptyGridSpacesTimeout && clearTimeout(store.timeouts.fillEmptyGridSpacesTimeout);
    store.timeouts.fillEmptyGridSpacesTimeout = null;
}

const explodeDelay = (store: AppStore, time: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        try {
            if (time > 1000) throw new Error('Time given is too big');
            const timeout = setTimeout(() => {
                store.explodingBoxesN = store.blinkingBoxesN;
                store.blinkingBoxesN = [];
                fillEmptyGridSpaces(store)
                resolve();
            }, time);

            store.timeouts.explodeTimeout = timeout;
        } catch (err) {
            reject(err);
        }
    });
}

export {clearPrevTimeouts, explodeDelay}