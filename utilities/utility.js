import { PlayerX, PlayerO } from "../src/Components/users.js";

const CreateElement = (element) => {
  let el = document.createElement(`${element}`);
  return el;
};

const CheckHorizontal = (gameState) => {
  let horizontalState = gameState.some((arr, idx) => {
    let allEqual = arr.every((val) => val === arr[idx]);
    if (allEqual && arr[idx].trim() !== "") {
      return true;
    }
  });  
  return horizontalState;
};

const CheckCornerDiagonal = (gameState) => {
  let diagonalArray = [];
  gameState.forEach((arr, rowIdx) => {
    diagonalArray.push(gameState[rowIdx][rowIdx]);  
  });
  if (diagonalArray.every((val) => val !== "")) 
    return diagonalArray.every((val) => val === diagonalArray[gameState.length - 1]);
};

const CheckReverseDiagonal = (gameState) => {
  let diagonalArray = [];
  gameState.forEach((arr, rowIdx) => {
    diagonalArray.push(gameState[rowIdx][gameState.length - rowIdx - 1]);
  });
  if (diagonalArray.every((val) => val !== ""))
    return diagonalArray.every((val) => val === diagonalArray[gameState.length - 1]);
};

const CheckVertical = (gameState) => {  
  let verticalArray = [];
  let verticalState = false;
  gameState.forEach((arr, rowIdx) => {
    verticalArray = [];
    arr.forEach((val, colIdx) => {
      verticalArray.push(gameState[colIdx][rowIdx]);
    });   
    if (!verticalState && verticalArray.every((val) => val !== "")) {
      let verticalIndex = rowIdx     
      verticalState = verticalArray.every((val) => val === verticalArray[verticalIndex]);    
    }
  });
  return verticalState
};

const CheckGameOver = (gameState, player, lastIndexClicked) => {
  let isGameOver =
    CheckHorizontal(gameState) ||
    CheckCornerDiagonal(gameState) ||
    CheckReverseDiagonal(gameState) ||
    CheckVertical(gameState);

  isGameOver && (document.getElementById('declaration').innerHTML = `${player} wins`);
  isGameOver &&
    MapInBoard(lastIndexClicked, {
      horizontal: CheckHorizontal(gameState),
      vertical: CheckVertical(gameState),
      cornerDiagonal: CheckCornerDiagonal(gameState),
      reverseDiagonal: CheckReverseDiagonal(gameState),
    }, gameState);
  
  return isGameOver;
};

const CheckDrawGame = (gameState, isGameOver) => {
  let isDraw = true
  gameState.forEach(arr => {
    arr.forEach(val => {
      if (val === "") {
        isDraw = false;
      }
    })
  })
  isDraw && !isGameOver && (document.getElementById('declaration').innerHTML = "Draw Game");
  return isDraw
}

const CheckPrevMove = (moveRepo, currMove, gameState) => {
  let newCurrMove = currMove ;
  let cancelMove = moveRepo[newCurrMove];
  document.querySelector(`[data-row='${cancelMove.row}'][data-col='${cancelMove.col}']`).innerHTML = "";
  gameState[cancelMove.row][cancelMove.col] = ''
  return { currMove: newCurrMove - 1 , state: gameState}
};

const CheckNextMove = (moveRepo, currMove, gameState) => {    
  let newCurrMove = currMove + 1  
  let recoverMove = moveRepo[newCurrMove];
  document.querySelector(`[data-row='${recoverMove.row}'][data-col='${recoverMove.col}']`).innerHTML = `${recoverMove.player}`;
  gameState[recoverMove.row][recoverMove.col] = `${recoverMove.player}`;
  
  return { currMove: newCurrMove , state: gameState}
};

const MapInBoard = (lastIndexClicked, direction, arrIndex) => {
  let mapDiretion = Object.keys( Object.fromEntries(Object.entries(direction).filter(([key, val]) => val === true)))[0];
  if (mapDiretion === 'horizontal') {
    [...document.querySelectorAll(`[data-row='${lastIndexClicked.row}']`)].forEach(panel => {
      panel.classList.add('winningPanel')
    })
  }
  if (mapDiretion === 'vertical') {
    [...document.querySelectorAll(`[data-col='${lastIndexClicked.col}']`)].forEach(panel => {
      panel.classList.add('winningPanel')
    })
  }
  if (mapDiretion === 'cornerDiagonal') { 
    arrIndex.forEach((arr, rowIdx) => {     
      document.querySelector(`[data-row='${rowIdx}'][data-col='${rowIdx}']`).classList.add('winningPanel');
    })
  }
  if (mapDiretion === 'reverseDiagonal') {
    arrIndex.forEach((arr, rowIdx) => {     
      document.querySelector(`[data-row='${rowIdx}'][data-col='${arrIndex.length - rowIdx - 1}']`).classList.add('winningPanel');
    })
  }
}

const MapInPanel = (isPlayer1, player1, panelTarget) => {  
  let tag = "";
  if (player1 === 'PlayerX') {
    isPlayer1 ? tag = PlayerX(panelTarget) : tag = PlayerO(panelTarget);
  }   
  if (player1 === 'PlayerO') {
    isPlayer1 ? tag = PlayerO(panelTarget) : tag = PlayerX(panelTarget);
  }
  return tag
}

const ExecuteGameControllers = (action, moveRepo, currMove, gameState) => {
  if (action === "previous") {
    return CheckPrevMove(moveRepo, currMove, gameState);
  }

  if (action === "next") {
    return CheckNextMove(moveRepo, currMove, gameState);
  }
}

const EnableGameControllers = (moveRepo, currMove) => {
  if (moveRepo.length > 0) {
    document.querySelector(`[data-button='next']`).classList.remove('disabled-button')
    document.querySelector(`[data-button='previous']`).classList.remove('disabled-button')

    document.querySelector(`[data-button='next']`).dataset.disable = 'false'
    document.querySelector(`[data-button='previous']`).dataset.disable = 'false'
  }
  if (currMove === 0) {
    document.querySelector(`[data-button='previous']`).classList.add('disabled-button')
    document.querySelector(`[data-button='previous']`).dataset.disable = 'true'
  }

  if (currMove === moveRepo.length - 1) {
    document.querySelector(`[data-button='next']`).classList.add('disabled-button')
    document.querySelector(`[data-button='next']`).dataset.disable = 'true'
  }
  if (moveRepo.length === 0) {
    document.querySelector(`[data-button='next']`).classList.add('disabled-button')
    document.querySelector(`[data-button='previous']`).classList.add('disabled-button')

    document.querySelector(`[data-button='next']`).dataset.disable = 'true'
    document.querySelector(`[data-button='previous']`).dataset.disable = 'true'
  }
}

const StoreGameMove = ( rowIdx, colIdx, tag, currMove, moveRepo) => {
  moveRepo[currMove] = {row: rowIdx, col: colIdx, player: tag }  
  return moveRepo
}

const ResetGameBoard = () => {
  let allPanels = document.querySelectorAll("[data-gamePanel]");
  [...allPanels].forEach((panels) => {
    panels.innerHTML = "";
    panels.classList.remove('winningPanel')
  });
  document.getElementById('declaration').innerHTML = "";
}

export {
  CreateElement,  
  CheckGameOver,
  CheckDrawGame,
  CheckPrevMove,
  CheckNextMove,
  MapInPanel,
  ExecuteGameControllers,
  EnableGameControllers,
  StoreGameMove,
  ResetGameBoard
};
