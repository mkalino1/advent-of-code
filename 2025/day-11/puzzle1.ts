import outputs from "./dataLoad"

function countPaths(current: string): number {
  if (current == 'out') return 1

  return outputs.get(current)!.reduce((sum, next) => sum + countPaths(next), 0)
}

console.log(countPaths('you'))
