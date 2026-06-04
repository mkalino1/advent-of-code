import links from "./dataLoad"

const adjList = new Map<string, Set<string>>()
const allComps = new Set<string>()

links.forEach(({ a, b }) => {
    if (!adjList.has(a)) adjList.set(a, new Set())
    adjList.get(a)?.add(b)
    if (!adjList.has(b)) adjList.set(b, new Set())
    adjList.get(b)?.add(a)

    allComps.add(a)
    allComps.add(b)
})

let groups = links.map(({ a, b }) => [a, b])

while (groups.length > 1) {
    const newGroups: string[][] = []
    const intersections = groups.map(group => 
        group.reduce((acc, comp) => acc.intersection(adjList.get(comp)), new Set<string>(allComps))
    )
    intersections.forEach((intersection, i) => {
        intersection.forEach(comp => newGroups.push(groups[i].concat(comp)))
    })
    // Remove duplicates and sort each group
    groups = Array.from(new Set(newGroups.map(group => group.sort().join(',')))).map(str => str.split(','))
}

console.log(groups[0].sort().join(','))