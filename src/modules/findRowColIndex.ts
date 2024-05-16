const rowIndex = (boxN: number) => {
  return Math.ceil(boxN / 10) - 1
}

const colIndex = (boxN: number) => {
  if (boxN % 10 === 0) return 9

  return (boxN % 10) - 1
}

export { rowIndex, colIndex }
