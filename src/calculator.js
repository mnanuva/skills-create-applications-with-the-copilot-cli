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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// Additional functions: modulo, power, squareRoot
function modulo(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}

// CLI wrapper: only run when executed directly
if (require.main === module) {
  function printUsageAndExit() {
    console.error('Usage: node src/calculator.js <operation> <operand1> <operand2?>');
    console.error('Supported operations: add|sub|mul|div|mod|pow|sqrt (aliases allowed)');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const opRaw = args[0];
  if (!opRaw) printUsageAndExit();

  const op = String(opRaw).toLowerCase();
  // Determine arity
  const twoArgOps = new Set(['add','plus','subtract','sub','minus','multiply','mul','times','divide','div','÷','mod','%','modulo','pow','power','^']);
  const oneArgOps = new Set(['sqrt','sqr','square','squareroot','squareRoot'.toLowerCase()]);

  try {
    let result;
    if (oneArgOps.has(op)) {
      const aRaw = args[1];
      if (!aRaw) printUsageAndExit();
      const a = Number(aRaw);
      if (Number.isNaN(a)) {
        console.error('Error: operand must be a valid number');
        process.exit(1);
      }
      switch (op) {
        case 'sqrt':
        case 'sqr':
        case 'square':
        case 'squareroot':
        case 'squareroot'.toLowerCase():
          result = squareRoot(a);
          break;
        default:
          console.error(`Error: unsupported operation '${opRaw}'`);
          printUsageAndExit();
      }
    } else if (twoArgOps.has(op)) {
      const aRaw = args[1];
      const bRaw = args[2];
      if (!aRaw || !bRaw) printUsageAndExit();
      const a = Number(aRaw);
      const b = Number(bRaw);
      if (Number.isNaN(a) || Number.isNaN(b)) {
        console.error('Error: operands must be valid numbers');
        process.exit(1);
      }

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
        case 'mod':
        case '%':
        case 'modulo':
          result = modulo(a, b);
          break;
        case 'pow':
        case 'power':
        case '^':
          result = power(a, b);
          break;
        default:
          console.error(`Error: unsupported operation '${opRaw}'`);
          printUsageAndExit();
      }
    } else {
      console.error(`Error: unsupported operation '${opRaw}'`);
      printUsageAndExit();
    }

    // Print numeric result to stdout
    console.log(result);
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
