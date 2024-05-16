import { defineStore } from 'pinia'

import {
  generateInitialGrid,
  generateNewLine,
  topHorizontalRtoL,
  topVerticalRToL,
  bottomHorizontalLToR,
  bottomVerticalLToR
} from '../modules/gameLogic'

import { AppStateInterface, newLineArray } from '../types/types'
import {
  GridLengths,
  KeyboardInputs,
  GridColumnsIndices,
  GridRowIndices,
  ARROW
} from '../constants/constants'

export const useAppStateStore = defineStore('appStateStore', {
  state: (): AppStateInterface => ({
    gridArray: generateInitialGrid(),
    timeouts: {
      explodeTimeout: null,
      fillEmptyGridSpacesTimeout: null
    },
    checkBoxPositions: [],
    explodedBoxes: [],
    blinkingBoxesN: [],
    explodingBoxesN: [],
    highestPositionY: 1,
    arrowIndex: 5,
    caughtBox: null,
    caughtBoxFrom: null,
    thrownBox: null,
    gameOverState: false,
    fall: false,
    interval: null,
    countMilliseconds: 0,
    score: 0
  }),
  getters: {
    getScore(): string {
      if (this.score === 0) return '000000'
      const zerosArr = ['0', '0', '0', '0', '0', '0']
      const appScoreString: string = this.score.toString()
      const scoreToDisplayArr: string[] = zerosArr.slice(0, zerosArr.length - appScoreString.length)
      const scoreString: string = scoreToDisplayArr.join('') + appScoreString
      return scoreString
    }
  },

  actions: {
    setGameOver(): void {
      this.gameOverState = true
      this.gameOverBoxDance()
    },
    playerMovements(direction: string): void {
      if (
        (direction === KeyboardInputs.ArrowLeft && this.arrowIndex === GridColumnsIndices.First) ||
        (direction === KeyboardInputs.ArrowRight && this.arrowIndex === GridColumnsIndices.Last)
      )
        return

      this.gridArray[GridRowIndices.Last][this.arrowIndex] = null

      direction === KeyboardInputs.ArrowRight ? this.arrowIndex++ : this.arrowIndex--
      this.gridArray[GridRowIndices.Last][this.arrowIndex] = ARROW
    },
    catchBox(): void {
      for (let y = GridRowIndices.NextToLast; 0 <= y; y--) {
        if (this.explodedBoxes.filter((obj) => obj.y === y && obj.x === this.arrowIndex).length)
          break

        if (this.gridArray[y][this.arrowIndex] === null) {
          continue
        } else {
          this.caughtBox = this.gridArray[y][this.arrowIndex]
          this.gridArray[y][this.arrowIndex] = null
          this.caughtBoxFrom = { y: y, x: this.arrowIndex }
          break
        }
      }
    },
    throwBox(): void {
      for (let yIndex = this.highestPositionY; 0 <= yIndex; yIndex--) {
        // If you try to put a block on the last index line - Game Over
        if (
          yIndex === GridRowIndices.NextToLast &&
          this.gridArray[yIndex][this.arrowIndex] !== null
        ) {
          this.setGameOver()
          break
        }

        if (yIndex === GridRowIndices.First) {
          if (this.gridArray[yIndex][this.arrowIndex] === null) {
            this.gridArray[yIndex][this.arrowIndex] = this.caughtBox
            this.thrownBox = { y: 0, x: this.arrowIndex }
          } else {
            this.gridArray[yIndex + 1][this.arrowIndex] = this.caughtBox
            this.thrownBox = { y: 1, x: this.arrowIndex }
          }
          this.caughtBox = null
        }
        if (this.gridArray[yIndex][this.arrowIndex] === null) continue

        if (yIndex !== GridRowIndices.First) {
          //Put the box on the next Y index
          const upperGridIndex: number = yIndex + 1
          this.gridArray[upperGridIndex][this.arrowIndex] = this.caughtBox

          this.thrownBox = { y: yIndex + 1, x: this.arrowIndex }
          this.caughtBox = null
        }

        //When the box is put, find if it creates a hight
        if (yIndex >= this.highestPositionY) this.highestPositionY++

        if (this.thrownBox) {
          this.checkBoxPositions = [{ y: this.thrownBox.y, x: this.thrownBox.x }]
          this.caughtBoxFrom = null
        }
        break
      }
    },
    moveDown(): void {
      if (this.gameOverState) return

      if (this.checkBoxPositions.length) this.checkBoxPositions.map((position) => position.y++)
      if (this.explodedBoxes.length) this.explodedBoxes.map((position) => position.y++)
      if (this.blinkingBoxesN.length)
        this.blinkingBoxesN = this.blinkingBoxesN.map((boxN) => (boxN += 10))

      const newArray: newLineArray = generateNewLine()
      this.gridArray.pop()
      this.gridArray.unshift(newArray)

      const isUpperRowBlank: boolean = this.gridArray[this.highestPositionY + 1].every(
        (box) => box === null
      )

      if (!isUpperRowBlank) this.highestPositionY++
      if (this.highestPositionY + 1 === GridLengths.RowLength) this.setGameOver()
    },
    gameOverBoxDance() {
      bottomHorizontalLToR(this.gridArray)
      topHorizontalRtoL(this.gridArray)
      bottomVerticalLToR(this.gridArray)
      topVerticalRToL(this.gridArray)
    }
  }
})
