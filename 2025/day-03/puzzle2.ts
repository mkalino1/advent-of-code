import banks from "./dataLoad"

const N = 12

const result = banks.map(bank => {
  // Borders of the window to search for the next max battery
  let leftBorder = 0
  let rightBorder = bank.length - N + 1
  let chosenBatteries = []

  for (let remaining = N; remaining > 0; remaining--) {
    const window = bank.slice(leftBorder, rightBorder)
    const maxVal = Math.max(...window)
    const maxIndex = window.indexOf(maxVal) + leftBorder

    chosenBatteries.push(maxVal)

    leftBorder = maxIndex + 1
    rightBorder = bank.length - remaining + 2
  }

  return Number(chosenBatteries.join(''))
}).reduce((sum, bank) => sum + bank)

console.log(result)
