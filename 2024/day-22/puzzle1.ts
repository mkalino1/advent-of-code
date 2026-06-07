import initialSecrets from "./dataLoad"

function mix(secret: number, input: number) {
    return (secret ^ input) >>> 0
}

function prune(secret: number) {
    return (16777216 + secret) % 16777216
}

let secrets = initialSecrets

for (let i = 0; i < 2000; i++) {
    secrets = secrets
        .map(secret => prune(mix(secret, secret << 6)))
        .map(secret => prune(mix(secret, secret >> 5)))
        .map(secret => prune(mix(secret, secret << 11)))
}

console.log(secrets.reduce((acc, secret) => acc + secret))