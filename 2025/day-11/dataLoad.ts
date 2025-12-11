import * as fs from 'fs'

type Device = {
  name: string
  outputs: string[]
}

const devices: Device[] = fs.readFileSync("2025/day-11/input.txt", "utf8")
  .split(/\r?\n/)
  .map(line => {
    const [name, outputString] = line.split(':')
    const outputs = outputString.split(' ').filter(Boolean)
    return { name, outputs }
  })

const outputs = new Map(devices.map(el => [el.name, el.outputs]))

export default outputs