import * as fs from 'fs'

type Link = {
    a: string,
    b: string
}

const links: Link[] = fs.readFileSync('./2024/day-23/input.txt', 'utf8')
    .split(/\r?\n/)
    .map((row: string) => {
        const [ a, b ] = row.split('-')
        return { a, b }
    })

export default links