import { player } from './Player.js';
import { Gameboard } from './Gameboard.js';

describe('create Player object', () => {
  const board = Gameboard(10);
  const p1 = player();

  test('player object has empty gameboard after initialization', () => {
    expect(p1.getGameBoard().getBoard()).toEqual(board.getBoard());
  });

  test('sendAttack calls recieve attack on targeted players gameboard', () => {
    const p2 = player();
    p1.sendAttack(p2, 0, 0);
    expect(p2.getGameBoard().getBoard()[0][0]).toBe('miss');
  });

  test('AI attack sends valid attack to opposing player', () => {
    const p2 = player();
    expect(p1.AiAttack(p2)).toBe(undefined);
    const receiveAttackSpy = jest.spyOn(p2.getGameBoard(), 'receiveAttack');

    p1.AiAttack(p2);

    expect(receiveAttackSpy).toHaveReturnedWith(true);

    receiveAttackSpy.mockClear();
  });
})