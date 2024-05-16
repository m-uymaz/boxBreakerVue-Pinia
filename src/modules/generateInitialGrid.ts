import {
  ARROW,
  GridLengths,
  GridRowIndices,
  STARTING_ARROW_COL_INDEX
} from '../constants/constants'
import { randomColor } from './gameLogic'
import { GridArray } from '../types/types'

export const generateInitialGrid = () => {
  const gridArray: GridArray = Array.from(Array(20), () => new Array(10).fill(null))

  for (let y = 0; y < GridLengths.RowLength; y++) {
    for (let x = 0; x < GridLengths.ColumnsLength; x++) {
      if (y < 2) {
        const color = randomColor()
        gridArray[y][x] = color.rgb
      }
      if (y === GridRowIndices.Last && x === STARTING_ARROW_COL_INDEX) gridArray[y][x] = ARROW
    }
  }
  return gridArray
}
