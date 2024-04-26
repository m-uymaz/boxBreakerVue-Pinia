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
            const timeout = setTimeout(() => {
                store.explodingBoxesN = store.blinkingBoxesN;
                store.blinkingBoxesN = [];
                fillEmptyGridSpaces(store)
                resolve();
            }, time);

            store.timeouts.explodeTimeout = timeout;
        } catch (err) {
            reject(console.error(err));
        }
    });
}

// const fillEmptyGridSpacesDelay = (AppState: AppStateInterface, time: number): Promise<void> => {
//     return new Promise<void>((resolve, reject) => {
//         try {
//             const timeout = setTimeout(() => {
//                 fillEmptyGridSpaces(AppState);
//                 resolve();
//             }, time);

//             AppState.timeouts.fillEmptyGridSpacesTimeout = timeout;
//         } catch (err) {
//             reject(console.error(err));
//         }
//     });
// }

export {clearPrevTimeouts, explodeDelay}