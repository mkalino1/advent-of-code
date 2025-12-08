import * as fs from 'fs'
import PriorityQueue from './priorityQueue'

type Box = {
  x: number
  y: number
  z: number
}

const boxes: Box[] = fs.readFileSync("2025/day-08/input.txt", "utf8")
  .split(/\r?\n/)
  .map(line => {
    const [x, y, z] = line.split(',').map(Number)
    return { x, y, z }
  })

// Put all possible connections into a priority queue
const connectionsQueue = new PriorityQueue((a, b) => b.distance > a.distance)
for (let a = 0; a < boxes.length; a++) {
  for (let b = a + 1; b < boxes.length; b++) {
    const b1 = boxes[a], b2 = boxes[b]
    const distance = Math.hypot(b1.x - b2.x, b1.y - b2.y, b1.z - b2.z)
    connectionsQueue.push({ distance, a, b })
  }
}

export { boxes, connectionsQueue }