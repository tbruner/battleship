import { ship } from './Ship.js';

const Gameboard = (size) => {
  // initialize empty board with empty cells to false
  const board = [...Array(size)].map(() => Array(size).fill(false));
  // when a ship is placed cell will have reference to ship
  // if hit/miss string 'hit'/'miss' will be placed in cell
  // initialize empty array if ships to keep track of how many ships are left
  const ships = [];

  let orientation = true
  let shipLengths = [[1,4],[2,3],[3,2],[4,1]]
  let shipIndex = 3

  const getBoard = () => {
    return board
  }

  const placeShip = (x, y) => {
    if(shipLengths[shipIndex][1]){
      let playerShip = ship(shipLengths[shipIndex][0]);
      ships.push(playerShip);
      for(let i=0; i<playerShip.getLength(); i++) {
        if(orientation && x+i < 10) {
          board[x+i][y] = [playerShip, i];
        }
        else if(!orientation && y+i < 10) {
          board[x][y+i] = [playerShip, i];
        }
      }
      shipLengths[shipIndex][1]--
      let cycle = 4
      while(shipLengths[shipIndex][1] === 0 && cycle) {
        if(shipIndex === 3) {
          shipIndex = 0
        }
        else ++shipIndex
        --cycle
      }
    }
  }

  const changeShipLength = (e) => {
    if(e.key === 'Shift') {
      let cycle = 4
      let invalid = true
      while(invalid && cycle){
        if(shipIndex === 3) {
          shipIndex = 0
        }
        else ++shipIndex
        if(shipLengths[shipIndex][0] != 0) invalid = false
        --cycle
      }
    }
  } 

  const toggleOrientation = (e) => {
    if(e.key === ' ') orientation = orientation ? false : true
  }

  const receiveAttack = (x,y) => {
    if(board[x][y] === false) {
      board[x][y] = 'miss';
      return true;
    }
    else if(typeof board[x][y] === 'object' && board[x][y] != null) {
      board[x][y][0].hit(board[x][y][1]);
      if(board[x][y][0].isSunk()) {
        for(let i = 0; i < ships.length; i++) {
          if(ships[i] === board[x][y][0]) {
            ships.splice(i, 1);
            if(ships.length === 0) {
              return allShipsSunk();
            }
            break;
          }
        }
      }
      board[x][y] = 'hit';
      return true;
    }
    else {
      // square already attacked
      return false;
    }
  }

  const allShipsSunk = () => {
    return 'GAME OVER';
  }

  const allShipsPlaced = () => {
    let empty = true
    for(let i=0; i<4; ++i) {
      if(shipLengths[i][1] != 0) {
        empty = false
        break
      }
    }
    return empty
  }

  return { getBoard, placeShip, receiveAttack, changeShipLength, toggleOrientation, allShipsPlaced }
}

export { Gameboard };