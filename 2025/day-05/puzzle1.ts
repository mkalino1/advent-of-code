import { ranges, numbers } from "./dataLoad";

const result = numbers.filter((num) => ranges.some(({start, end}) => num >= start && num <= end)).length

console.log(result)