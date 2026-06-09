import { gates } from "./dataLoad"

const invalidGates = new Set<string>()

// Find the highest z bit to know which one is last (e.g. z45)
const highestZ = gates
  .map(g => g.output)
  .filter(out => out.startsWith('z'))
  .toSorted()
  .at(-1)

for (const g of gates) {
  const { operator, output, input1, input2 } = g;

  const hasInputsXY = input1.startsWith('x') || input2.startsWith('x') || input1.startsWith('y') || input2.startsWith('y');
  const isFirstBit = input1 === 'x00' || input2 === 'x00'

  // Each z output (except the last one) must come from an XOR gate
  if (output.startsWith('z') && output !== highestZ && operator !== 'XOR') {
    invalidGates.add(output)
  }

  // An XOR gate that does not produce z must have x and y as inputs
  if (operator === 'XOR' && !output.startsWith('z')) {
    if (!hasInputsXY) invalidGates.add(output)
  }

  // The result of first layer XOR must go to another XOR
  if (operator === 'XOR' && hasInputsXY && !isFirstBit) {
    const usedInAnotherXor = gates.some(nextG =>
      nextG.operator === 'XOR' && (nextG.input1 === output || nextG.input2 === output)
    );
    if (!usedInAnotherXor) invalidGates.add(output);
  }

  // AND result (except the first bits) must go to an OR gate
  if (operator === 'AND' && !isFirstBit) {
    const usedInOr = gates.some(nextG =>
      nextG.operator === 'OR' && (nextG.input1 === output || nextG.input2 === output)
    );
    if (!usedInOr) invalidGates.add(output);
  }
}

console.log(Array.from(invalidGates).sort().join(','));