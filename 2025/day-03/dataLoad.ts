import * as fs from 'fs'

const banks: number[][] = fs.readFileSync('2025/day-03/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(row => row.split('').map(Number))

export default banks