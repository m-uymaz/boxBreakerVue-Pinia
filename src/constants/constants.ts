const ARROW: string = 'X'
const ALICEBLUE: string = 'aliceblue'

const GRID_BOXES_SIZE: number = 200
const LAST_ROW_N_START: number = 190
const STARTING_ARROW_COL_INDEX = 5

enum KeyboardInputs {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Space = 'Space'
}

enum GridLengths {
  RowLength = 20,
  ColumnsLength = 10
}

enum GridColumnsIndices {
  First = 0,
  Last = 9
}

enum GridRowIndices {
  First = 0,
  NextToLast = 18,
  Last = 19
}

enum BoxColors {
  red = 'rgb(245, 66, 66)',
  green = 'rgb(66, 245, 85)',
  blue = 'rgb(66, 90, 245)',
  purple = 'rgb(245, 70, 225)',
  yellow = 'rgb(245, 240, 70)',
  orange = 'rgb(255, 172, 28)'
}

export {
  BoxColors,
  GridLengths,
  GridRowIndices,
  KeyboardInputs,
  GridColumnsIndices,
  ALICEBLUE,
  ARROW,
  STARTING_ARROW_COL_INDEX,
  GRID_BOXES_SIZE,
  LAST_ROW_N_START
}
