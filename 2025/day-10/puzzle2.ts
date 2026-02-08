import { machines, Machine } from "./dataLoad"
import solver from 'javascript-lp-solver'

function solveMachine(machine: Machine): number {
  const n = machine.joltages.length

  // incidence matrix A: rows=counters, cols=buttons
  const m = machine.switches.length
  const A = Array.from({ length: n }, (_, i) => machine.switches.map(sw => Number(sw.includes(i))))

  // ILP model: minimize total presses subject to exact counter sums
  const model: any = { optimize: 'cost', opType: 'min', constraints: {}, variables: {}, ints: {} }
  for (let i = 0; i < n; i++)
    model.constraints[`c${i}`] = { equal: machine.joltages[i] }

  // each variable xj has coefficient 1 in objective and contributes A[i][j] to constraint i
  for (let j = 0; j < m; j++) {
    const name = `x${j}`
    const obj: any = { cost: 1 }
    for (let i = 0; i < n; i++)
      if (A[i][j])
        obj[`c${i}`] = (obj[`c${i}`] || 0) + A[i][j]

    model.variables[name] = obj
    model.ints[name] = 1
  }

  const res = solver.Solve(model)
  // sum up all button press counts (x0, x1, ...) from the solver result
  return Object.keys(res)
    .filter(k => k.startsWith('x'))
    .reduce((s, k) => s + res[k], 0)
}

// run all machines and print results
const results = machines.reduce((sum, machine) => sum + solveMachine(machine), 0)
console.log(`TOTAL: ${results}`)