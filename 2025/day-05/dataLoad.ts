import * as fs from 'fs'

type Range = {
  start: number,
  end: number
}

const rows: string[] = fs.readFileSync("2025/day-05/input.txt", "utf8").split(/\r?\n/)
const indexOfSeparator = rows.findIndex(row => !Boolean(row))

const ranges: Range[] = rows.slice(0, indexOfSeparator)
  .map(row => row.split('-').map(Number))
  .map(([start, end]) => ({ start, end }))

const numbers: number[] = rows.slice(indexOfSeparator + 1).map(Number)

export { ranges, numbers }