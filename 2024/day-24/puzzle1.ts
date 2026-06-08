import { Gate, gates, initialWires } from "./dataLoad"

const unlocks = new Map<string, Gate[]>() // Map of wire name to gates that gets unlocked by resolving it

gates.forEach((gate: Gate) => {
  if (!unlocks.has(gate.input1)) unlocks.set(gate.input1, [])
  unlocks.get(gate.input1)!.push(gate)

  if (!unlocks.has(gate.input2)) unlocks.set(gate.input2, [])
  unlocks.get(gate.input2)!.push(gate)
})

const processing: Gate[] = []
const resolvedWires = new Map<string, boolean>() // Map of wire name to its resolved value

initialWires.forEach((wire) => {
  resolvedWires.set(wire.name, wire.value)
  if (unlocks.has(wire.name)) processing.push(...unlocks.get(wire.name)!)
})

while (processing.length > 0) {
  const gate = processing.pop()!
  if (resolvedWires.has(gate.input1) && resolvedWires.has(gate.input2)) {
    switch (gate.operator) {
      case 'AND':
        resolvedWires.set(gate.output, resolvedWires.get(gate.input1)! && resolvedWires.get(gate.input2)!)
        break
      case 'OR':
        resolvedWires.set(gate.output, resolvedWires.get(gate.input1)! || resolvedWires.get(gate.input2)!)
        break
      case 'XOR':
        resolvedWires.set(gate.output, (resolvedWires.get(gate.input1)! ? 1 : 0) ^ (resolvedWires.get(gate.input2)! ? 1 : 0) ? true : false)
        break
    }
    if (unlocks.has(gate.output)) processing.push(...unlocks.get(gate.output)!)
  }
}

let bitsum = 0
resolvedWires.forEach((value, key) => {
  if (!key.startsWith('z')) return
  if (value) bitsum += 2 ** parseInt(key.slice(1))
})
console.log(bitsum)
