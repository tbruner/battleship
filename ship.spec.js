import { ship } from './Ship.js';

const five = ship(5);

describe('Create ship object', () => {
  test('Ship object has correct length', () => {
    expect(five.length).toBe(5);
  });

  test('Ship isSunk is false by default', () => {
    expect(five.isSunk()).toBe(false);
  });

  test('Ship isSunk is false after one hit', () => {
    five.hit(0);
    expect(five.isSunk()).toBe(false);
  });

  test('Ship isSunk is true after all five hit', () => {
    five.hit(1);
    five.hit(2);
    five.hit(3);
    five.hit(4);
    expect(five.isSunk()).toBe(true);
  });
});