import { ship } from '../src/Ship.js';

const five = ship(5);

describe('Create ship object', () => {
  test('Ship isSunk is false by default', () => {
    expect(five.isSunk()).toBe(false);
  });

  test('Ship has correct length', () => {
    expect(five.getLength()).toBe(5);
  });

  test('Ship hit returns true when unhit section is hit', () => {
    expect(five.hit(0)).toBe(true);
  });

  test('Ship isSunk is false after one hit', () => {
    expect(five.isSunk()).toBe(false);
  });

  test('Shipt hit returns false if attempt to hit section already hit', () => {
    expect(five.hit(0)).toBe(false);
  })

  test('Ship isSunk is true after all five hit', () => {
    five.hit(1);
    five.hit(2);
    five.hit(3);
    five.hit(4);
    expect(five.isSunk()).toBe(true);
  });
});