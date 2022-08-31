import { Gameboard } from './Gameboard.js';

const player = () => {
  let board = Gameboard(10);
  
  const getGameBoard = () => {
    return board;
  }

  const sendAttack = (opp, x, y) => {
    return opp.getGameBoard().receiveAttack(x, y);
  }

  const AiAttack = (opp) => {
    let valid = false;
    do {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      valid = opp.getGameBoard().receiveAttack(x, y);
    } while(!valid);
    return valid;
  }

  // get user input
  return { getGameBoard, sendAttack, AiAttack };
}

export { player };