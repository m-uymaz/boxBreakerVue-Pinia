import { defineStore } from "pinia";

import { generateInitialGrid } from "../modules/gridArray";
import { AppStateInterface } from "../types/types";

export const useAppStateStore = defineStore('appStateStore', {
    state: (): AppStateInterface => ({
        gridArray: generateInitialGrid(),
        timeouts: {
            explodeTimeout: null,
            rerenderTimeout: null,
        },
        checkBoxPositions: [],
        explodedBoxes: [],
        blinkingBoxesN: [],
        explodingBoxesN: [],
        highestPositionY: 1,
        arrowIndex: 5,
        coughtBox: null,
        coughtBoxFrom: null,
        thrownBox: null,
        gameOverState: false,
        fall: false,
        interval: null,
        countMilliseconds: 0,
        score: 0,
    })
})