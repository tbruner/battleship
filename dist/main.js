/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const player = () => {
  let board = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(10);
  
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



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


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
      let playerShip = (0,_Ship_js__WEBPACK_IMPORTED_MODULE_0__.ship)(shipLengths[shipIndex][0]);
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



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
const ship = (length) => {
  let hits = new Array(length).fill(false);

  const getLength = () => {
    return length
  }
  
  const hit = (square) => {
    if(hits[square]) return false;
    hits[square] = true;
    return true;
  }

  const isSunk = () => {
    let i = 0;
    while(i < length) {
      if(!hits[i]) return false;
      i++;
    }

    return true;
  }
  return { getLength, hit, isSunk }
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


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
  user = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__.player)()
  computer = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__.player)()

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
})();

/******/ })()
;