import * as fs from 'fs'

type Wire = {
    name: string,
    value: boolean
}

type Gate = {
    input1: string,
    input2: string,
    operator: string,
    output: string
}

const [firstChunk, secondChunk] = fs.readFileSync('./2024/day-24/input.txt', 'utf8').split('\r\n\r\n')

const initialWires: Wire[] = firstChunk
    .split('\r\n')
    .map((line: string) => {
        const split = line.split(': ')
        return { name: split[0], value: split[1] == '1' }
    })

const gates: Gate[] = secondChunk
    .split('\r\n')
    .map((line: string) => {
        const splitArrow = line.split(' -> ')
        const splitInputs = splitArrow[0].split(' ')
        return { input1: splitInputs[0], input2: splitInputs[2], operator: splitInputs[1], output: splitArrow[1] }
    })

export { initialWires, gates, Gate }