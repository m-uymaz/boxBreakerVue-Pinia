import { defineStore } from "pinia";
import { Store } from "pinia";

import { generateInitialGrid } from "../modules/gridArray";
import { AppStateInterface, newLineArray } from "../types/types";
import { GridLengths } from "../constants/constants";
import generateNewLine from "../modules/generateNewLine";

export type AppStore = Store<"appStateStore", AppStateInterface, {
    getScore(): string;
}, {
    setGameOver(): void;
    moveDown(): void;
}>

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
        getScore(): string {
            if(this.score === 0) return '000000'

            const zerosArr = ['0', '0', '0', '0', '0', '0']
            const appScoreString: string = this.score.toString()

            const scoreToDisplayArr: string[] = zerosArr.slice(0, zerosArr.length - appScoreString.length)

            const scoreString: string = scoreToDisplayArr.join('') + appScoreString

            return scoreString
        }
    },

    actions: {
        setGameOver(): void {
            this.gameOverState = true;
        },
        moveDown(): void {
            if (this.gameOverState) return;

            if (this.checkBoxPositions.length) this.checkBoxPositions.map(position => position.y++);
            if (this.explodedBoxes.length) this.explodedBoxes.map(position => position.y++);
            if (this.blinkingBoxesN.length) this.blinkingBoxesN = this.blinkingBoxesN.map(boxN => boxN += 10);
    
            const newArray: newLineArray = generateNewLine();
            this.gridArray.pop();
            this.gridArray.unshift(newArray);

            let lineBlank: boolean = this.gridArray[this.highestPositionY + 1].filter(box => box !== null).length ? true : false;

            if (lineBlank) this.highestPositionY++;
            if (this.highestPositionY + 1 === GridLengths.RowLength) this.setGameOver();
        }
    }
})