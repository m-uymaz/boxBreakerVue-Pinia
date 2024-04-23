import { AppStateInterface } from "../types/types";
import { fillEmptyGridSpaces } from "./floodFillFuncs";

const clearPrevTimeouts = (AppState: AppStateInterface): void => {
    AppState.timeouts.explodeTimeout && clearTimeout(AppState.timeouts.explodeTimeout);
    AppState.timeouts.explodeTimeout = null;

    AppState.timeouts.rerenderTimeout && clearTimeout(AppState.timeouts.rerenderTimeout);
    AppState.timeouts.rerenderTimeout = null;
}

const explodeDelay = (AppState: AppStateInterface , time: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        try {
            const timeout = setTimeout(() => {
                AppState.explodingBoxesN = AppState.blinkingBoxesN;
                AppState.blinkingBoxesN = [];
                resolve();
            }, time);

            AppState.timeouts.explodeTimeout = timeout;
        } catch (err) {
            reject(console.error(err));
        }
    });
}

const fillEmptyGridSpacesDelay = (AppState: AppStateInterface, time: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        try {
            const timeout = setTimeout(() => {
                fillEmptyGridSpaces(AppState);
                resolve();
            }, time);

            AppState.timeouts.rerenderTimeout = timeout;
        } catch (err) {
            reject(console.error(err));
        }
    });
}

export {clearPrevTimeouts, explodeDelay, fillEmptyGridSpacesDelay}