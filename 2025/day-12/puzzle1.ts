import { regions, boxes, Region } from "./dataLoad"

let board: string[][] = []

// For each box type prepare an array of its 4 rotations
const rotations = boxes.map(b => {
  const rotList = [b]
  let current = b
  for (let i = 0; i < 3; i++) {
    current = current[0].map((_, ci) => current.map(row => row[ci]).reverse())
    rotList.push(current)
  }
  return rotList
})

// Count filled cells number per box type
const boxFilledCells = boxes.map(b => b.flat().filter(c => c === '#').length)

function isRegionSolvable(region: Region) {
  board = Array.from({ length: region.height }, () => Array(region.width).fill('.'))
  // If total cells exceed region area, no need to try
  if (region.boxesToFit.reduce((s, i) => s + boxFilledCells[i], 0) > region.height * region.width) return false
  return solveRegion(region)
}

function solveRegion(region: Region, currentIndex = 0): boolean {
  if (currentIndex >= region.boxesToFit.length) return true

  const currentBoxType = region.boxesToFit[currentIndex]
  for (let y = 0; y < region.height - 2; y++)
    for (let x = 0; x < region.width - 2; x++)
      for (const box of rotations[currentBoxType])
        if (canPlaceBox(box, x, y)) {
          applyBox(box, x, y, '#')
          if (solveRegion(region, currentIndex + 1)) return true
          applyBox(box, x, y, '.')
        }
  return false
}

function canPlaceBox(box: string[][], posX: number, posY: number): boolean {
  for (let y = 0; y < box.length; y++)
    for (let x = 0; x < box[0].length; x++)
      if (box[y][x] === '#' && board[posY + y][posX + x] === '#') return false
  return true
}

function applyBox(box: string[][], posX: number, posY: number, value: string) {
  for (let y = 0; y < box.length; y++)
    for (let x = 0; x < box[0].length; x++)
      if (box[y][x] === '#') board[posY + y][posX + x] = value
}

const result = regions.map(isRegionSolvable).reduce((s, v) => s + Number(v), 0)
console.log(result)