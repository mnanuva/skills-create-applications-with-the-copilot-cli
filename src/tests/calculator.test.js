const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(4, 0)).toThrow(/division by zero/);
  });

  // Additional edge cases
  test('operations with negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
    expect(subtract(-1, 2)).toBe(-3);
    expect(multiply(-3, 3)).toBe(-9);
    expect(divide(-6, 3)).toBe(-2);
  });

  test('floating point operations', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.30000000000000004);
    expect(divide(1, 3)).toBeCloseTo(0.3333333333333333);
  });

  // Extended operations from the feature request / image
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow(/division by zero/);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with negative exponent', () => {
    expect(power(2, -3)).toBeCloseTo(1 / 8);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-9)).toThrow(/square root of negative number/);
  });
});