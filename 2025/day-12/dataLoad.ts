import * as fs from 'fs'

type Region = {
  height: number
  width: number
  boxesToFit: number[]
}

const sections = fs.readFileSync("2025/day-12/input.txt", "utf8").split(/\r\n\r\n/)

const boxes = sections.slice(0, -1).map(boxSection => {
  const lines = boxSection.split(/\r?\n/)
  return lines.slice(1).map(line => line.split(''))
})

const regions: Region[] = sections.at(-1)!.split(/\r?\n/).map(regionLine => {
  const [sizePart, boxesPart] = regionLine.split(':')
  const [width, height] = sizePart.split('x').map(Number)
  const counters = boxesPart.split(' ').filter(Boolean).map(Number)
  const boxesToFit = counters.reduce((arr, counter, index) => {
    arr.push(...Array(counter).fill(index))
    return arr
  }, [] as number[])
  return { height, width, boxesToFit }
})

export { boxes, regions, Region }