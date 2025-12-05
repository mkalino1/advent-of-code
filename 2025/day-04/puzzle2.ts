import board from './dataLoad.js'

const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
const HEIGHT = board.length
const WIDTH = board[0].length

let counter = 0
let isChanged = true

while (isChanged) {
  isChanged = false
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell != '@') return

      const rolls = DIRS.filter(([dx, dy]) => {
        const newX = x + dx
        const newY = y + dy

        if (newY < 0 || newY >= HEIGHT) return false
        if (newX < 0 || newX >= WIDTH) return false
        return board[newY][newX] == '@'
      }).length

      if (rolls < 4) {
        counter++
        board[y][x] = '.'
        isChanged = true
      }
    })
  })
}

console.log(counter)