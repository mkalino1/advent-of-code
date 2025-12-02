import * as fs from 'fs'

type Range = {
  start: number,
  end: number
}

const ranges: Range[] = fs.readFileSync('2025/day-02/input.txt', 'utf-8')
  .split(',')
  .map((range: string) => {
    const [start, end] = range.split('-').map(Number)
    return { start, end }
  })

export { ranges, Range }