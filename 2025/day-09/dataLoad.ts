import * as fs from 'fs'

type Tile = {
  x: number
  y: number
}

const tiles: Tile[] = fs.readFileSync("2025/day-09/input.txt", "utf8")
  .split(/\r?\n/)
  .map(line => {
    const [x, y] = line.split(',').map(Number)
    return { x, y }
  })

export default tiles