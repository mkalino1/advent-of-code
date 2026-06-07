import * as fs from 'fs'

const initialSecrets: number[] = fs.readFileSync('./2024/day-22/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map((row: string) => Number(row))

export default initialSecrets