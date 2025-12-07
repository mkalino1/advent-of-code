import rows from "./dataLoad"

const initialPosition = rows[0].indexOf('S')
const beams = new Set<number>([initialPosition])
let splitCount = 0

rows.forEach(row => {
  beams.forEach(beam => {
    if (row[beam] == '^') {
      splitCount++
      beams.delete(beam)
      beams.add(beam - 1)
      beams.add(beam + 1)
    }
  })
})

console.log(splitCount)