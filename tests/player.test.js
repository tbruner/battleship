import { player } from '../src/Player.js';
import { Gameboard } from '../src/Gameboard.js';

describe('create Player object', () => {
  const board = Gameboard(10);
  const p1 = player();

  test('player object has empty gameboard after initialization', () => {
    expect(p1.getGameBoard().getBoard()).toEqual(board.getBoard());
  });

  test('recieveAttack calls recieve attack on board', () => {
    p1.receiveAttack(0, 0);
    expect(p1.getGameBoard().getBoard()[0][0]).toBe('miss');
  });

  test('AI attack sends valid attack to board', () => {
    expect(p1.AiAttack()).toBe(true);
    const receiveAttackSpy = jest.spyOn(p1.getGameBoard(), 'receiveAttack');

    p1.AiAttack();

    expect(receiveAttackSpy).toHaveReturnedWith(true);

    receiveAttackSpy.mockClear();
  });
})