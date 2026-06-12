#!/usr/bin/env node

/*
Node.js CLI Calculator

Supported operations:
- add / plus        : addition (a + b)
- subtract / sub    : subtraction (a - b)
- multiply / mul    : multiplication (a * b)
- divide / div      : division (a / b)

Usage:
  node src/calculator.js <operation> <operand1> <operand2>

Examples:
  node src/calculator.js add 2 3    # prints 5
  node src/calculator.js div 4 0    # prints error and exits 1
*/

function printUsageAndExit() {
  console.error('Usage: node src/calculator.js <operation> <operand1> <operand2>');
  console.error('Supported operations: add|sub|mul|div (aliases allowed)');
  process.exit(1);
}

const [, , opRaw, aRaw, bRaw] = process.argv;
if (!opRaw || !aRaw || !bRaw) {
  printUsageAndExit();
}

const op = String(opRaw).toLowerCase();
const a = Number(aRaw);
const b = Number(bRaw);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Error: operands must be valid numbers');
  process.exit(1);
}

let result;
switch (op) {
  case 'add':
  case 'plus':
    result = a + b;
    break;
  case 'subtract':
  case 'sub':
  case 'minus':
    result = a - b;
    break;
  case 'multiply':
  case 'mul':
  case 'times':
    result = a * b;
    break;
  case 'divide':
  case 'div':
  case '÷':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(1);
    }
    result = a / b;
    break;
  default:
    console.error(`Error: unsupported operation '${opRaw}'`);
    printUsageAndExit();
}

// Print numeric result to stdout
console.log(result);
process.exit(0);
