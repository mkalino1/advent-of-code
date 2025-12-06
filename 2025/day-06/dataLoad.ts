import * as fs from 'fs'

type Task = {
  operator: '*' | '+',
  operands: string[]
}

const rows: string[] = fs
  .readFileSync("2025/day-06/input.txt", "utf8")
  .split(/\r?\n/)

export { rows, Task }