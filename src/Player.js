import { Gameboard } from './Gameboard.js';

const player = () => {
  let board = Gameboard(10);
  
  const getGameBoard = () => {
    return board;
  }

  const receiveAttack = (x, y) => {
    return board.receiveAttack(x, y);
  }

  const AiAttack = () => {
    let valid = false;
    do {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      valid = board.receiveAttack(x, y);
    } while(!valid);
    return valid;
  }

  // get user input
  return { getGameBoard, receiveAttack, AiAttack };
}

export { player };