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

// Exported functions for unit testing
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };

// CLI wrapper: only run when executed directly
if (require.main === module) {
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
  try {
    switch (op) {
      case 'add':
      case 'plus':
        result = add(a, b);
        break;
      case 'subtract':
      case 'sub':
      case 'minus':
        result = subtract(a, b);
        break;
      case 'multiply':
      case 'mul':
      case 'times':
        result = multiply(a, b);
        break;
      case 'divide':
      case 'div':
      case '÷':
        result = divide(a, b);
        break;
      default:
        console.error(`Error: unsupported operation '${opRaw}'`);
        printUsageAndExit();
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  // Print numeric result to stdout
  console.log(result);
  process.exit(0);
}
