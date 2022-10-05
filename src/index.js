import { player } from './Player.js';

// global user and computer player objects
let user
let computer
let played

const renderBoard = (player, playerObj, oppObj, state) => {
  // get Gameboard to render to screen
  const board = document.getElementById(player)
  // clear board
  board.innerHTML = ''
  let playerBoard = null
  let playerGB = null
  if(playerObj === null || state === 'NOT PLAYING') {
    playerBoard = [...Array(10)].map(e => Array(10))
  }
  else {
    playerGB = playerObj.getGameBoard()
    playerBoard = playerGB.getBoard()
  }

  const startBtn = document.getElementById('start-btn')

  if(state === 'GAME READY') {
    startBtn.classList.remove('inactive')
    startBtn.removeEventListener('click', placeShips)
    startBtn.addEventListener('click', newGame)
  }

  if(state === 'WIN' || state === 'LOSE') {
    startBtn.innerText = 'PLAY AGAIN'
  }

  let table = document.createElement('table')
  let tbody = document.createElement('tbody')
  let title = document.createElement('h2')

  let message = player

  if(state === 'WIN' || state === 'LOSE') {
    message = state
  }
  else if(state === 'PLACE SHIPS' && player === 'user') {
    message = state
  }
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
        if(player === 'computer' && state === 'PLAYING') {
          cell.classList.add('unchecked')
          cell.addEventListener('click', () => { attack(i, j, playerObj, oppObj, player) })
        } 
        else {
          cell.classList.add('ship-cell')
        }
      }
      else {
        if(player === 'computer' && state === 'PLAYING') {
          cell.classList.add('unchecked')
          cell.addEventListener('click', () => { attack(i, j, playerObj, oppObj, player) })
        }
        else if(player === 'user' && state === 'PLACE SHIPS') {
          cell.addEventListener('click', () => {
            playerGB.placeShip(i, j)
            
            if(playerGB.allShipsPlaced()) {
              renderBoard('user', playerObj, oppObj, 'GAME READY')
            }
            else {
              renderBoard('user', playerObj, oppObj, state)
            }
          })
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
  const startBtn = document.getElementById('start-btn')

  startBtn.innerText = 'RESTART'
  startBtn.removeEventListener('click', newGame)
  startBtn.addEventListener('click', reset)

  renderBoard('user', user, computer, 'PLAYING')
  renderBoard('computer', computer, user, 'PLAYING')
}

const attack = (x, y, compObj, userObj, player) => {
  let state = 'PLAYING'
  if(compObj.receiveAttack(x, y) === 'GAME OVER') {
    state = 'WIN'
  }

  if(userObj.AiAttack() === 'GAME OVER') {
    state = 'LOSE'
  }

  let compState = state;
  if(compState != 'PLAYING') {
    compState = compState === 'WIN' ? 'LOSE' : 'WIN'
  }
  renderBoard(player, compObj, userObj, compState)
  renderBoard('user', userObj, compObj, state)

  if(compState != 'PLAYING') {
    played = true
  }
}

const reset = () => {
  if(!played) {
    renderBoard('user', null, null, 'NOT PLAYING')
    renderBoard('computer', null, null, 'NOT PLAYING')
  }

  // create user player and computer player objects
  user = player()
  computer = player()

  const startBtn = document.getElementById('start-btn')

  startBtn.innerText = 'PLACE SHIPS'

  startBtn.removeEventListener('click', reset)
  // Add condition to deactivate startBtn until all ships are placed
  startBtn.addEventListener('click', placeShips)
}

const placeShips = () => {
  let userBoard = user.getGameBoard()

  window.removeEventListener('keyup', userBoard.changeShipLength)
  window.removeEventListener('keyup', userBoard.toggleOrientation)

  window.addEventListener('keyup', userBoard.changeShipLength)
  window.addEventListener('keyup', userBoard.toggleOrientation)

  renderBoard('user', user, computer, 'PLACE SHIPS')
  renderBoard('computer', computer, user, 'PLACE SHIPS')

  const startBtn = document.getElementById('start-btn')

  startBtn.innerText = 'PLAY GAME'

  startBtn.classList.add('inactive')

  // Remove place ships event  listener
  startBtn.removeEventListener('click', placeShips)
}

reset()