import * as fs from 'fs'

const rows: string[] = fs
  .readFileSync("2025/day-07/input.txt", "utf8")
  .split(/\r?\n/)

export default rows