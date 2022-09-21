import { player } from './Player.js';

const renderBoard = (player, playerObj, state) => {
  // get Gameboard to render to screen
  const board = document.getElementById(player)
  // clear board
  board.innerHTML = ''
  const playerBoard = playerObj.getBoard()

  let table = document.createElement('table')
  let tbody = document.createElement('tbody')
  let title = document.createElement('h2')

  let message = player
  if(state === 'WIN' || state === 'LOSE') message = state
  title.innerText = message

  let size = playerBoard.length

  for(let i=0; i<size; i++) {
    let row = document.createElement('tr')
    for(let j=0; j<size; j++) {
      let cell = document.createElement('td')
      cell.dataset.y = i+1
      cell.dataset.x = String.fromCharCode(65+j)
      row.appendChild(cell)

      if(playerBoard[i][j] === 'hit') {
        cell.classList.add('sunk-cell')
      }
      else if(playerBoard[i][j] === 'miss') {
        cell.classList.add('miss-cell')
      }
      else if(typeof playerBoard[i][j] === 'object' && playerBoard[i][j] != null) {
        // currently using same name used for html id, maybe add cpu flag in gameboard/player functions to use?
        if(player === 'computer' && state === 'playing') {
          cell.classList.add('unchecked')
          cell.addEventListener('click', function() { attack(i, j, playerObj, player) })
        } 
        else {
          cell.classList.add('ship-cell')
        }
      }
      else {
        if(player === 'computer' && state === 'playing') {
          cell.classList.add('unchecked')
          cell.addEventListener('click', function() { attack(i, j, playerObj, player) })
        }
      }

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
  board.appendChild(title)
  board.appendChild(table)
}

const newGame = () => {
  // create user player and computer player objects
  let user = player()
  let computer = player()

  let userBoard = user.getGameBoard()
  let computerBoard = computer.getGameBoard()

  // manually place ships; to be later replaced with user input ship placement
  userBoard.placeShip(0, 2, false, 3)
  userBoard.placeShip(1, 6, false, 4)
  userBoard.placeShip(2, 0, false, 2)
  userBoard.placeShip(3, 7, true, 2)
  userBoard.placeShip(4, 5, false, 1)
  userBoard.placeShip(5, 0, false, 1)
  userBoard.placeShip(6, 7, false, 3)
  userBoard.placeShip(8, 1, false, 1)
  userBoard.placeShip(8, 4, false, 1)
  userBoard.placeShip(8, 8, true, 2)

  computerBoard.placeShip(0, 2, false, 3)
  computerBoard.placeShip(1, 6, false, 4)
  computerBoard.placeShip(2, 0, false, 2)
  computerBoard.placeShip(3, 7, true, 2)
  computerBoard.placeShip(4, 5, false, 1)
  computerBoard.placeShip(5, 0, false, 1)
  computerBoard.placeShip(6, 7, false, 3)
  computerBoard.placeShip(8, 1, false, 1)
  computerBoard.placeShip(8, 4, false, 1)
  computerBoard.placeShip(8, 8, true, 2)

  renderBoard('user', userBoard, 'playing')
  renderBoard('computer', computerBoard, 'playing')
  
  // Use event listener to get valid user input and run computer turn
  // using a timeout checking each time for a 'GAME OVER' where a 
  // game over screen will display and following a timeout clear and
  // display start screen
}

const attack = (x, y, playerObj, player) => {
  let state = 'playing'
  if(playerObj.receiveAttack(x, y) === 'GAME OVER') {
    state = 'WIN'
  }
  
  renderBoard(player, playerObj, state)
}

const reset = () => {
  // clear display and show start screen
  // display start button that calls newGame()
}
newGame()