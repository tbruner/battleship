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



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
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


const render = () => {

} 

const renderBoard = (Gameboard) => {

}

const newGame = () => {
  // create p1 player and computer player objects
  let p1 = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__.player)();
  let computer = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__.player)();

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
})();

/******/ })()
;