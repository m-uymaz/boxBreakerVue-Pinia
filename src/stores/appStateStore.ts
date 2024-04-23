import { defineStore } from "pinia";

import { generateInitialGrid } from "../modules/gridArray";
import { AppStateInterface } from "../types/types";

export const useAppStateStore = defineStore('appStateStore', {
    state: (): AppStateInterface => ({
        gridArray: generateInitialGrid(),
        timeouts: {
            explodeTimeout: null,
            fillEmptyGridSpacesTimeout: null,
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
    }),
    getters: {
        getScore() {
            if(this.score === 0) return '000000'

            const zerosArr = ['0', '0', '0', '0', '0', '0']
            const appScoreString: string = this.score.toString()

            const scoreToDisplayArr: string[] = zerosArr.slice(0, zerosArr.length - appScoreString.length)

            const scoreString: string = scoreToDisplayArr.join('') + appScoreString

            return scoreString
        }
    },
    // ACTIONS ???
})