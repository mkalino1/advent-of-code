import * as fs from 'fs'

type Rotation = {
  distance: number,
  direction: number,
}

const rotations: Rotation[] = fs.readFileSync('2025/day-01/input.txt', 'utf-8')
  .split(/\r?\n/)
  .map((row: string) => {
    const direction = row[0] === 'R' ? 1 : -1
    const distance = Number(row.slice(1))
    return { distance, direction }
  })

export default rotations