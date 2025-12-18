import * as fs from 'fs'

type Machine = {
  initialState: string
  goalState: string
  switches: number[][]
  joltages: string
}

const lightsRegex = /\[([^\]]+)\]/
const switchesRegex = /\(([^)]+)\)/g
const joltagesRegex = /\{([^\}]+)\}/

const machines: Machine[] = fs.readFileSync("2025/day-10/input.txt", "utf8")
  .split(/\r?\n/)
  .map(line => {
    const goalState = line.match(lightsRegex)![1]
    const initialState = '.'.repeat(goalState.length)
    const switches = [...line.matchAll(switchesRegex)].map(match => match[1].split(',').map(Number))
    const joltages = line.match(joltagesRegex)![1]
    return { initialState, goalState, switches, joltages }
  })

export { machines, Machine }