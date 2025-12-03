import banks from "./dataLoad"

const result = banks.map(bank => {
  let leftBattery = 0
  let rightBattery = 0

  for (let i = 0; i < bank.length; i++) {
    if (bank[i] > leftBattery && i != bank.length - 1) {
      leftBattery = bank[i]
      rightBattery = bank[i + 1]
    } else if (bank[i] > rightBattery) {
      rightBattery = bank[i]
    }
  }

  return Number(`${leftBattery}${rightBattery}`)
}).reduce((sum, bank) => sum + bank)

console.log(result)
