import Ship from './Ship.js';

describe('Create ship object', () => {
  test('Ship object has correct length', () => {
    expect(Ship(5)).toEqual(5);
  })
})