import { ranges } from "./dataLoad"

ranges.sort((a, b) => a.start == b.start ? a.end - b.end : a.start - b.start)

for (let i = 0; i < ranges.length - 1; i++) {
  const current = ranges[i]
  const next = ranges[i + 1]

  if (current.end < next.start) {
    // Range A and B don't overlap
    continue
  } else if (current.end >= next.end) {
    // Range A and B overlap fully
    ranges.splice(i + 1, 1)
    i--
  } else {
    // Range A and B overlap partially
    current.end = next.end
    ranges.splice(i + 1, 1)
    i--
  }
}

const fresh = ranges
  .map(range => range.end - range.start + 1)
  .reduce((a, b) => a + b)

console.log(fresh)