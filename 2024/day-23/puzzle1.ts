import links from "./dataLoad"

const adjList = new Map<string, Set<string>>()
links.forEach(({ a, b }) => {
    if (!adjList.has(a)) adjList.set(a, new Set())
    adjList.get(a)?.add(b)
    if (!adjList.has(b)) adjList.set(b, new Set())
    adjList.get(b)?.add(a)
})

const triangles = new Set<string>()

links.forEach(({ a, b }) => {
    const neighborsA = adjList.get(a)!
    const neighborsB = adjList.get(b)!
    neighborsA.intersection(neighborsB).forEach((c: string) => {
        if (![a, b, c].some(el => el.startsWith('t'))) return
        triangles.add([a, b, c].sort().join(','))
    })
})

console.log(triangles.size)