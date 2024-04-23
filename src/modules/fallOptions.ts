import { AppStateInterface } from "../types/types";

import moveDown from "./moveDown";

const fallOn = (store: AppStateInterface) => {
    if (store.fall) return;
    store.fall = true;
    store.interval = setInterval(() => {
        if (
            !store.fall
            ||
            store.timeouts.explodeTimeout
            ||
            store.timeouts.rerenderTimeout
        ) return;

        if (store.gameOverState && store.interval) {
            clearInterval(store.interval);
            store.interval = null;
        }

        if (store.countMilliseconds === 2500) {
            moveDown(store);
            store.countMilliseconds = 0;
        }

        store.countMilliseconds += 100;
    }, 100);
}

const fallOff = (store: AppStateInterface) => {
    if (!store.fall) return;
    store.fall = false;
    if (store.interval) {
        clearInterval(store.interval);
        store.interval = null;
        store.countMilliseconds = 0;
    }
}

export {fallOn, fallOff}

