import { player } from './Player.js';

const newGame = () => {
  // create p1 player and computer player objects
  let p1 = player();
  let computer = player();

  // get Gameboard to render to screen
  const p1Board = document.getElementById('player')
  const computerBoard = document.getElementById('computer')

  let table = document.createElement('table')
  let tbody = document.createElement('tbody')

  let size = p1.getGameBoard().getBoard().length

  for(let i=0; i<size; i++) {
    let row = document.createElement('tr')
    for(let j=0; j<size; j++) {
      let cell = document.createElement('td')
      cell.dataset.y = i+1
      cell.dataset.x = String.fromCharCode(65+j)
      row.appendChild(cell)
      if(i===0) {
        let xAxisLabel = document.createElement('div')
        xAxisLabel.classList.add('x-axis-label')
        xAxisLabel.innerText = cell.dataset.x
        cell.append(xAxisLabel)
      }
      if(j===0) {
        let yAxisLabel = document.createElement('div')
        yAxisLabel.classList.add('y-axis-label')
        yAxisLabel.innerText = `${cell.dataset.y}`
        cell.append(yAxisLabel)
      }
    }
    tbody.appendChild(row)
  }

  table.appendChild(tbody)

  p1Board.appendChild(table)

  let clone = table.cloneNode(true)
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