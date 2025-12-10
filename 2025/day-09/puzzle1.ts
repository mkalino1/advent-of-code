import tiles from "./dataLoad";

let largestArea = 0

for (let i = 0; i < tiles.length; i++)
  for (let j = i + 1; j < tiles.length; j++)
    largestArea = Math.max(
      largestArea,
      (Math.abs(tiles[i].x - tiles[j].x) + 1) * (Math.abs(tiles[i].y - tiles[j].y) + 1)
    )

console.log(largestArea)