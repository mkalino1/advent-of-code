import rotations from "./dataLoad"

let pointer = 50
let counter = 0

rotations.forEach(({ distance, direction }) => {
  const isPreviouslyPointingZero = pointer === 0
  const fullCircles = Math.floor(distance / 100)
  const remainingRotation = direction * (distance % 100)

  counter += fullCircles
  pointer = pointer + remainingRotation

  if (pointer <= 0 || pointer >= 100) {
    counter += 1 - Number(isPreviouslyPointingZero)
  }

  pointer = (pointer + 100) % 100
})

console.log(counter)