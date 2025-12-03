import { ranges, Range } from "./dataLoad";

function sumInvalidNumsInRange({ start, end }: Range): number {
  const allNumsInRange = Array.from({ length: end - start + 1 }, (_, i) => i + start)
  return allNumsInRange
    .filter(checkIfInvalid)
    .reduce((sum, num) => sum + num, 0)
}

function checkIfInvalid(num: number): boolean {
  const numStr = String(num)

  for (let i = 1; i <= numStr.length / 2; i++) {
    const segment = numStr.slice(0, i)
    if (numStr.length % segment.length != 0) continue

    const repeatedSegment = segment.repeat(numStr.length / segment.length)
    if (repeatedSegment == numStr) return true
  }
  return false
}

const results = ranges
  .map(sumInvalidNumsInRange)
  .reduce((total, rangeSum) => total + rangeSum)

console.log(results)