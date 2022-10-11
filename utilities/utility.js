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

const MapInBoard = (lastIndexClicked, direction, arrIndex) => {
  let mapDiretion = Object.keys( Object.fromEntries(Object.entries(direction).filter(([key, val]) => val === true)))[0];
  let panelMaxIdx = document.querySelectorAll("[data-gamePanel=gamePanel]").length - 1;
  if (mapDiretion = 'horizontal') {
    // document.querySelector(`[data-panelidx='${lastIndexClicked}']`).style.backgroundColor = "red";
  }
  if (mapDiretion = 'vertical') {//+gameStateLength
    // document.querySelector(`[data-panelidx='${lastIndexClicked}']`).style.backgroundColor = "red";
  }
  if (mapDiretion = 'cornerDiagonal') { //+gameStateLength +1
    // document.querySelector(`[data-panelidx='${lastIndexClicked}']`).style.backgroundColor = "red";
  }
  if (mapDiretion = 'reverseDiagonal') {
    // document.querySelector(`[data-panelidx='${lastIndexClicked}']`).style.backgroundColor = "red";
  }
}

export {
  CreateElement,
  CheckHorizontal,
  CheckCornerDiagonal,
  CheckReverseDiagonal,
  CheckVertical,
  MapInBoard
};
