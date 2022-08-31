import { Gameboard } from '../src/Gameboard.js';
import { ship } from '../src/Ship.js';

describe('Create Gameboard object', () => {
  const three = ship(3);
  const board = Gameboard(10);
  const boardTest = [...Array(10)].map(() => Array(10).fill(false));

  test('All board cells are empty(false) after initialization', () => {
    expect(board.getBoard()).toEqual(boardTest);
  });
  
  function mockPlaceShip() {
    board.placeShip(0, 0, true, three);
    return board.getBoard()
  }
  
  test('Ship placed correctly at (0,0), (1,0), (2,0)', async () => {
    // placeShip(x coordinate, y coordinate, boolean(or enum) for horizontal/vertical, ship object)
    boardTest[0][0] = [three, 0];
    boardTest[1][0] = [three, 1];
    boardTest[2][0] = [three, 2];
    let data = await mockPlaceShip();
    expect(data).toEqual(boardTest);
  }); 

  const four = ship(4);

  test('Vertical ship placed correctly at 0,1 0,2 0,3 0,4', () => {
    board.placeShip(0, 1, false, four);
    boardTest[0][1] = [four, 0];
    boardTest[0][2] = [four, 1];
    boardTest[0][3] = [four, 2];
    boardTest[0][4] = [four, 3];
    expect(board.getBoard()).toEqual(boardTest);
  });

  test('receiveAttack marks a ship hit as "hit"', () => {
    board.receiveAttack(0, 0);
    boardTest[0][0] = 'hit';
    expect(board.getBoard()).toEqual(boardTest);
  });

  test('receiveAttack marks a missed attacked as "miss"', () => {
    board.receiveAttack(1, 1);
    boardTest[1][1] = 'miss';
    expect(board.getBoard()).toEqual(boardTest);
  });

  test('allShipsSunk returns true when all ships have been sunk', () => {
    board.receiveAttack(0,1);
    board.receiveAttack(0,2);
    board.receiveAttack(0,3);
    board.receiveAttack(0,4);
    board.receiveAttack(1,0);
    expect(board.receiveAttack(2,0)).toBe('GAME OVER');
  });
});