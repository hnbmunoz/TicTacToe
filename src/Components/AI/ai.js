import * as Utility from "../../../utilities/utility.js";

const AISelected = (gameState, isPlayer1, player1 ) => {  
  
  let playerTag = AICheckPiece(!isPlayer1, player1)
  let aiTag = AICheckPiece(isPlayer1, player1)

  // let pickCenter = PickCenterSlot(gameState, isPlayer1, player1);
  // if (!pickCenter) {
  //   PickRandomSlot(gameState, isPlayer1, player1)  
  // }

  PickRandomSlot(gameState, isPlayer1, player1)  
}

const Survive = (gameState, playerTag, aiTag) => { 
  const officialGameState = gameState 
  let aiSimulatedGameState = officialGameState
  let surviveNeeded = false
  gameState.forEach((arr, rowIdx) => {    
    arr.forEach((val, colIdx) => {
     
    })
  })
  return surviveNeeded
}

const Kill = (gameState, playerTag, aiTag) => {
  gameState.forEach((arr, rowIdx) => {
    arr.forEach((val, colIdx) => {
      
    })
  })
}

const PickCenterSlot = (gameState,  isPlayer1, player1) => {
  let centerPick = false
  let centerRow = Math.ceil(gameState.length / 2);
  let centerCol = Math.ceil(gameState[centerRow].length / 2);

  if (gameState[centerRow - 1][centerCol - 1] === "" && !isPlayer1) {
    let aiMove = Utility.MapInPanel(isPlayer1, player1,document.querySelector(`[data-row='${centerRow -1}'][data-col='${centerCol -1}']`), gameState)
    Utility.CheckGameOver(gameState, aiMove.tag, {row: centerRow, col: centerCol});
    centerPick = true
  }
  return centerPick
}

const PickRandomSlot = (gameState, isPlayer1, player1) => {  
  let randomRow = Math.floor(Math.random() * gameState.length)
  let randomCol = Math.floor(Math.random() * gameState[randomRow].length)
  if (gameState[randomRow][randomCol] === "") {
    let aiMove = Utility.MapInPanel(isPlayer1, player1,document.querySelector(`[data-row='${randomRow}'][data-col='${randomCol}']`), gameState)
    Utility.CheckGameOver(gameState, aiMove.tag, {row: randomRow, col: randomCol});
  } else {
    PickRandomSlot(gameState, isPlayer1, player1)
  }
}

const AICheckGameState = (gameState) => {
  let isGameOver =
    Utility.CheckHorizontal(gameState) ||
    Utility.CheckCornerDiagonal(gameState) ||
    Utility.CheckReverseDiagonal(gameState) ||
    Utility.CheckVertical(gameState);
  return isGameOver    
}

const AICheckPiece = (isPlayer1, player1) => {  
  let tag 
  if (player1 === 'PlayerX') {
    isPlayer1 ? tag = 'X' : tag = 'O';
  }   
  if (player1 === 'PlayerO') {
    isPlayer1 ? tag = 'O' : tag = 'X';
  }
  return tag
}

export {
  AISelected
}