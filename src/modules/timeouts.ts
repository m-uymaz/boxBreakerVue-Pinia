import { AppStateInterface } from "../types/types";
import { fillEmptyGridSpaces } from "./floodFillFuncs";

const clearPrevTimeouts = (AppState: AppStateInterface): void => {
    AppState.timeouts.explodeTimeout && clearTimeout(AppState.timeouts.explodeTimeout);
    AppState.timeouts.explodeTimeout = null;

    AppState.timeouts.fillEmptyGridSpacesTimeout && clearTimeout(AppState.timeouts.fillEmptyGridSpacesTimeout);
    AppState.timeouts.fillEmptyGridSpacesTimeout = null;
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

            AppState.timeouts.fillEmptyGridSpacesTimeout = timeout;
        } catch (err) {
            reject(console.error(err));
        }
    });
}

export {clearPrevTimeouts, explodeDelay, fillEmptyGridSpacesDelay}