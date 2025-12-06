import { rows, Task } from "./dataLoad"

const values = rows.map(row => row.split(' ').filter(Boolean))
const tasks: Task[] = []

for (let x = 0; x < values[0].length; x++) {
  tasks.push({
    operands: values.slice(0, -1).map(row => row[x]),
    operator: values[values.length - 1][x] as '*' | '+'
  })
}

const result = tasks
  .map(task => eval(`${task.operands.join(` ${task.operator} `)}`))
  .reduce((sum, val) => sum + val)

console.log(result)
