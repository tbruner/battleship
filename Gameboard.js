const Gameboard = (size) => {
  // initialize empty board with empty cells to false
  const board = [...Array(size)].map(() => Array(size).fill(false));
  // when a ship is placed cell will have reference to ship
  // if hit/miss string 'hit'/'miss' will be placed in cell
  // initialize empty array if ships to keep track of how many ships are left
  const ships = [];

  const getBoard = () => {
    return board
  }

  const placeShip = (x, y, orient, ship) => {
    ships.push(ship);
    for(let i=0; i<ship.getLength(); i++) {
      if(orient) board[x+i][y] = [ship, i];
      else board[x][y+i] = [ship, i];
    }
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

  return { getBoard, placeShip, receiveAttack }
}

export { Gameboard };