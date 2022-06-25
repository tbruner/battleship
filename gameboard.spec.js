import { gameboard } from './Gameboard.js';
import { ship } from './Ship.js';

describe('Create Gameboard object', () => {
  const three = ship(3);
  const board = gameboard(10);
  boardTest = [...Array(10)].map(() => Array(10).fill(false));

  test('All board cells are empty(false) after initialization', () => {
    expect(board.board).toEqual(boardTest);
  });
  // placeShip(x coordinate, y coordinate, boolean(or enum) for horizontal/vertical, ship object)
  //board.placeShip(0, 0, true, three);

  test('Ship placed correctly at (0,0), (1,0), (2,0)', () => {
    const sampleCoordinates = [[[0, 1], false, ]]
    expect(board.coordinates).toEqual(sampleCoordinates);
  });
});