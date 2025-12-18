import { machines, Machine } from "./dataLoad"

const visited = new Set<string>()

function solveMachine(machine: Machine): number {
  visited.clear()
  let queue: string[] = [machine.initialState]
  let steps = 0

  while (queue.length) {
    const nextQueue: string[] = []
    for (const state of queue) {
      if (state === machine.goalState) return steps
      if (visited.has(state)) continue
      visited.add(state)
      nextQueue.push(...machine.switches.map(sw => applySwitchToState(state, sw)))
    }
    queue = nextQueue
    steps++
  }
  return 0
}

function applySwitchToState(state: string, sw: number[]): string {
  const stateArr = state.split('')
  for (const index of sw)
    stateArr[index] = stateArr[index] === '.' ? '#' : '.'
  return stateArr.join('')
}

const result = machines.reduce((sum, machine) => sum + solveMachine(machine), 0)
console.log(result)
