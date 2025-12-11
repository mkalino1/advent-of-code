import outputs from "./dataLoad"

const cache = new Map<string, number>()

function countPaths(current: string, seenFft: boolean, seenDac: boolean): number {
  if (current == 'out') return Number(seenFft && seenDac)
  if (current == 'fft') seenFft = true
  if (current == 'dac') seenDac = true

  const cacheKey = current + seenFft + seenDac;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!

  const result = outputs.get(current)!.reduce((sum, next) => sum + countPaths(next, seenFft, seenDac), 0)
  cache.set(cacheKey, result)
  return result
}

console.log(countPaths('svr', false, false))
