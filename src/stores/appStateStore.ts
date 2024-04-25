import { defineStore } from "pinia";

import { generateInitialGrid } from "../modules/gridArray";
import generateNewLine from "../modules/generateNewLine";

import { AppStateInterface, newLineArray } from "../types/types";
import { GridLengths, KeyboardInputs, GridColumsIndeces, GridRowIndeces, ARROW } from "../constants/constants";

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
        playerMovements(direction: string): void {
            if (
                direction === KeyboardInputs.ArrowLeft && this.arrowIndex === GridColumsIndeces.First
                ||
                direction === KeyboardInputs.ArrowRight && this.arrowIndex === GridColumsIndeces.Last
            ) return;

            this.gridArray[GridRowIndeces.Last][this.arrowIndex] = null;

            direction === KeyboardInputs.ArrowRight ? this.arrowIndex++ : this.arrowIndex--;
            this.gridArray[GridRowIndeces.Last][this.arrowIndex] = ARROW;
        },
        catchBox(): void {
            for (let y = GridRowIndeces.NextToLast; 0 <= y; y--) {
                if (this.explodedBoxes.filter(obj => obj.y === y && obj.x === this.arrowIndex).length) break;

                if (this.gridArray[y][this.arrowIndex] === null) {
                    continue;
                } else {
                    this.coughtBox = this.gridArray[y][this.arrowIndex];
                    this.gridArray[y][this.arrowIndex] = null;
                    this.coughtBoxFrom = { y: y, x: this.arrowIndex }
                    break;
                }
            }
        },
        throwBox() {
            for (let yIndex = this.highestPositionY; 0 <= yIndex; yIndex--) {
                // If you try to put a block on the last index line - Game Over
                if (yIndex === GridRowIndeces.NextToLast && this.gridArray[yIndex][this.arrowIndex] !== null) {
                    this.setGameOver()
                    break;
                };

                if (yIndex === GridRowIndeces.First) {
                    if (this.gridArray[yIndex][this.arrowIndex] === null) {
                        this.gridArray[yIndex][this.arrowIndex] = this.coughtBox;
                        this.thrownBox = { y: 0, x: this.arrowIndex }
                    } else {
                        this.gridArray[yIndex + 1][this.arrowIndex] = this.coughtBox;
                        this.thrownBox = { y: 1, x: this.arrowIndex }
                    }
                    this.coughtBox = null;
                }
                if (this.gridArray[yIndex][this.arrowIndex] === null) continue;

                if (yIndex !== GridRowIndeces.First) {
                    //Put the box on the next Y index
                    let upperGridIndex: number = yIndex + 1;
                    this.gridArray[upperGridIndex][this.arrowIndex] = this.coughtBox;

                    this.thrownBox = { y: yIndex + 1, x: this.arrowIndex }
                    this.coughtBox = null;
                }

                //Find when the box is put, if it creates a new hight
                if (yIndex >= this.highestPositionY) this.highestPositionY++;

                if (this.thrownBox) {
                    this.checkBoxPositions = [{ y: this.thrownBox.y, x: this.thrownBox.x }];
                    this.coughtBoxFrom = null;
                }
                break;
            }
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