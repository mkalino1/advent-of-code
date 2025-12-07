import rows from "./dataLoad"

const initialPosition = rows[0].indexOf('S')
const beams = new Map<number, number>([[initialPosition, 1]])

rows.forEach(row => {
  beams.forEach((count, beam) => {
    if (row[beam] == '^') {
      beams.delete(beam)
      beams.set(beam - 1, (beams.get(beam - 1) ?? 0) + count)
      beams.set(beam + 1, (beams.get(beam + 1) ?? 0) + count)
    }
  })
})

console.log([...beams.values()].reduce((a, b) => a + b))