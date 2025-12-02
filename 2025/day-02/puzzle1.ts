import { ranges, Range } from "./dataLoad";

function sumInvalidNumsInRange({ start, end }: Range): number {
  const allNumsInRange = Array.from({ length: end - start + 1 }, (_, i) => i + start)
  return allNumsInRange
    .filter(checkIfInvalid)
    .reduce((sum, num) => sum + num, 0)
}

function checkIfInvalid(num: number): boolean {
  const numStr = String(num)
  if (numStr.length % 2 != 0) return false

  const middle = numStr.length / 2
  const firstHalf = numStr.slice(0, middle)
  const secondHalf = numStr.slice(middle)

  return firstHalf == secondHalf
}

const results = ranges
  .map(sumInvalidNumsInRange)
  .reduce((total, rangeSum) => total + rangeSum)

console.log(results)