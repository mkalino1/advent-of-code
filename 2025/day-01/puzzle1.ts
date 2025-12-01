import rotations from "./dataLoad"

let pointer = 50
let counter = 0

rotations.forEach(({ distance, direction }) => {
  distance = distance % 100 
  pointer = (pointer + direction * distance + 100) % 100
  if (pointer === 0) {
    counter += 1
  }
})

console.log(counter)