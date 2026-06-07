import initialSecrets from "./dataLoad"

function mix(secret: number, input: number) {
    return (secret ^ input) >>> 0
}

function prune(secret: number) {
    return (16777216 + secret) % 16777216
}

let secrets = initialSecrets
const prices: number[][] = secrets.map(secret => [secret % 10])
const diffs: number[][] = Array.from({ length: secrets.length }, () => [])

for (let i = 0; i < 2000; i++) {
    secrets = secrets
        .map(secret => prune(mix(secret, secret << 6)))
        .map(secret => prune(mix(secret, secret >> 5)))
        .map(secret => prune(mix(secret, secret << 11)))
    secrets.forEach((secret, j) => prices[j].push(secret % 10))

    if (i > 0) secrets.forEach((_, j) => {
        diffs[j].push(prices[j][i] - prices[j][i-1])
    })
}

const patterns = new Set<string>()
for (let i = 0; i < secrets.length; i++) {
    for (let j = 0; j < 2000 - 4; j++) {
        patterns.add('|' + diffs[i].slice(j, j + 4).join('|') + '|')
    }
}

const diffStrings = diffs.map(diff => '|' + diff.join('|') + '|')
let best = -1

patterns.forEach(pattern => {
    let total = 0
    diffStrings.forEach((diffString, j) => {
        const diffIndex = diffString.indexOf(pattern)

        if (diffIndex !== -1) {
            const sliced = diffString.slice(0, diffIndex)
            const separators = sliced.split('|').length - 1
            total += prices[j][separators + 4]
        }
    })

    best = Math.max(best, total)
})

console.log(best)