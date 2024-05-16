import { GridArray } from '../types/types'
import { GridRowIndices, GridColumnsIndices } from '../constants/constants'
import { RandomColor } from '../types/types'
import { randomColor } from './randomColor'

const randomColorForDance = (gridArray: GridArray, y: number, x: number, ms: number) => {
  let colorObj: RandomColor = randomColor()
  while (gridArray[y][x] === colorObj.rgb) colorObj = randomColor()

  setTimeout(() => {
    gridArray[y][x] = colorObj.rgb
  }, ms)
}

// HORIZONTAL
const bottomHorizontalLToR = (gridArray: GridArray) => {
  let ms = 15

  for (let y = 0; y <= GridRowIndices.Last; y += 2) {
    for (let x = 0; x <= GridColumnsIndices.Last; x++) {
      randomColorForDance(gridArray, y, x, ms)
      ms += 15
    }
  }
}

const topHorizontalRtoL = (gridArray: GridArray) => {
  let ms = 15

  for (let y = GridRowIndices.Last; y >= 0; y--) {
    for (let x = 0; x <= GridColumnsIndices.Last; x++) {
      randomColorForDance(gridArray, y, x, ms)
      ms += 15
    }
  }
}

//VERTICAL
const bottomVerticalLToR = (gridArray: GridArray) => {
  let ms = 15

  for (let x = 0; x <= GridColumnsIndices.Last; x++) {
    for (let y = 0; y <= GridRowIndices.Last; y++) {
      randomColorForDance(gridArray, y, x, ms)
      ms += 15
    }
  }
}

const topVerticalRToL = (gridArray: GridArray) => {
  let ms = 15

  for (let x = GridColumnsIndices.Last; x >= 0; x--) {
    for (let y = GridRowIndices.Last; y >= 0; y--) {
      randomColorForDance(gridArray, y, x, ms)
      ms += 15
    }
  }
}

export { bottomHorizontalLToR, topHorizontalRtoL, bottomVerticalLToR, topVerticalRToL }
