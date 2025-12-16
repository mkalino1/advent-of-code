import { Tile, tiles } from "./dataLoad"

type Rectangle = {
  area: number
  sides: Side[]
}

type Side = {
  isVertical: boolean       // true when the side is vertical (x is constant)
  fixed: number             // fixed coordinate value
  from: number, to: number  // inclusive range on the other coordinate
}

// Generate all rectangles from tiles
const rectangles: Rectangle[] = []
for (let i = 0; i < tiles.length; i++) for (let j = i + 1; j < tiles.length; j++) {
  const area = (Math.abs(tiles[i].x - tiles[j].x) + 1) * (Math.abs(tiles[i].y - tiles[j].y) + 1)
  const vertices = [tiles[i], { x: tiles[i].x, y: tiles[j].y }, tiles[j], { x: tiles[j].x, y: tiles[i].y }]
  const sides = vertices.map((v, vi) => buildSideFromVertices(v, vertices[(vi + 1) % 4], true))
  rectangles.push({ area, sides })
}

// Build side representation beetween two vertices. Exclude enpoints for rectangles.
function buildSideFromVertices(a: Tile, b: Tile, excludeEndpoints = false): Side {
  const isVertical = a.x === b.x
  const fixedCoord = isVertical ? 'x' : 'y'
  const varyCoord = isVertical ? 'y' : 'x'
  return {
    isVertical,
    fixed: a[fixedCoord],
    from: Math.min(a[varyCoord], b[varyCoord]) + Number(excludeEndpoints),
    to: Math.max(a[varyCoord], b[varyCoord]) - Number(excludeEndpoints),
  }
}

// Sort rectangles by area descending
rectangles.sort((a, b) => b.area - a.area)

// Prepare all sides of the floor shape
const shapeSides = tiles.map((t, ti) => buildSideFromVertices(t, tiles[(ti + 1) % tiles.length]))

function findBestRectangleArea(rectangles: Rectangle[]) {
  for (const rect of rectangles)
    if (checkIfValid(rect)) return rect.area
}

function checkIfValid(rect: Rectangle): boolean {
  // Check if the floor shape is overlapping with rectangle sides (excluding rectangle corners)
  for (const shapeSide of shapeSides)
    for (const rectSide of rect.sides)
      if (doesSidesOverlap(shapeSide, rectSide)) return false
  return true
}

function doesSidesOverlap(s1: Side, s2: Side): boolean {
  // Parallel sides will never overlap
  if (s1.isVertical == s2.isVertical) return false
  return s1.from <= s2.fixed && s2.fixed <= s1.to && s2.from <= s1.fixed && s1.fixed <= s2.to
}

console.log(findBestRectangleArea(rectangles))
