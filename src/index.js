import { player } from './Player.js';

const render = () => {

} 

const renderBoard = (Gameboard) => {

}

const newGame = () => {
  // create p1 player and computer player objects
  let p1 = player();
  let computer = player();

  // get Gameboard to render to screen
  const p1Board = document.getElementById('player')
  const computerBoard = document.getElementById('computer')

  const grid = document.createElement('div')
  grid.classList.add('grid')

  let size = p1.getGameBoard().getBoard().length;

  for(let i=0; i<size; i++) {
    for(let j=0; j<size; j++) {
      let cell = document.createElement('div')
      cell.classList.add('cell')

      if(j===0) {
        cell.innerText = i
        cell.classList.add('board-labels')
      }
  
      else if(i===0){
        cell.innerText = String.fromCharCode(64+j)
        cell.classList.add('board-labels')
      }

      grid.appendChild(cell)
    }
  }

  p1Board.appendChild(grid)
  let clone = grid.cloneNode(true)
  computerBoard.appendChild(clone)


  p1.getGameBoard();
  computer.getGameBoard();
  
  // Use event listener to get valid user input and run computer turn
  // using a timeout checking each time for a 'GAME OVER' where a 
  // game over screen will display and following a timeout clear and
  // display start screen
}

const reset = () => {
  // clear display and show start screen
  // display start button that calls newGame()
}
newGame()