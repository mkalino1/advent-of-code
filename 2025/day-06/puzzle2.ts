import { rows, Task} from "./dataLoad"

const operatorsRow = rows.pop()!.split(' ').filter(Boolean)
const tasks: Task[] = []
let operands: string[] = []

for (let x = 0; x < rows[0].length; x++) {
  const col = rows.map(r => r[x]).join('')
  if (col.trim().length) {
    operands.push(col)
  } else {
    tasks.push({ operator: operatorsRow.shift() as '*' | '+', operands })
    operands = []
  }
}
tasks.push({ operator: operatorsRow.shift() as '*' | '+', operands })

const result = tasks
  .map((task: Task) => eval(`${task.operands.join(` ${task.operator} `)}`))
  .reduce((sum, val) => sum + val)

console.log(result)
