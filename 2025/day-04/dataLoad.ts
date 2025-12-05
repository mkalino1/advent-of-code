import * as fs from 'fs'

const board: string[][] = fs.readFileSync('2025/day-04/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map((line) => line.split(''))

export default board