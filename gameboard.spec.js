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
  board.placeShip(0, 0, true, three);
  boardTest[0][0] = three;
  boardTest[1][0] = three;
  boardTest[3][0] = three;
  test('Ship placed correctly at (0,0), (1,0), (2,0)', () => {
    expect(board.board).toEqual(boardTest);
  }); 
  const four = ship(4);
  board.placeShip(0, 1, false, four);
  boardTest[0][1] = four;
  boardTest[0][2] = four;
  boardTest[0][3] = four;
  boardTest[0][4] = four;

  test('Vertical ship placed correctly at 0,1 0,2 0,3 0,4', () => {
    expect(board.board).toEqual(boardTest);
  });
});