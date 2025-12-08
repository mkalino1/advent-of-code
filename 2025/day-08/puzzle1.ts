import { boxes, connectionsQueue } from "./dataLoad"

// Each circuit is represented by its leader and each box starts as a leader of single-element circuit
// leaders[i] == -1 means that i is a leader
// leaders[i] == j means that i is under j
const leaders: number[] = Array(boxes.length).fill(-1)

function findLeader(entry: number): number {
  if (leaders[entry] == -1) return entry
  const leader = findLeader(leaders[entry])
  // Path compression as a shortcut for next iterations
  return leaders[entry] = leader
}

Array.from({ length: 1000 }).forEach(() => {
  const current = connectionsQueue.pop()
  const leaderOfA = findLeader(current.a)
  const leaderOfB = findLeader(current.b)
  if (leaderOfA != leaderOfB) leaders[leaderOfB] = leaderOfA
})

const circuitSizes = Array(boxes.length).fill(0)
for (const box of boxes.keys()) circuitSizes[findLeader(box)] += 1
const result = circuitSizes
  .toSorted((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a * b)

console.log(result)
