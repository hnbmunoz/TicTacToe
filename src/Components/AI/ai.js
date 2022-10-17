import * as Utility from "../../../utilities/utility.js";

const AIPlayer = (gameState, isPlayer1, player1 ) => {    
  let playerTag = AICheckPiece(!isPlayer1, player1)
  let aiTag = AICheckPiece(isPlayer1, player1)

  let winGame = WinGame(gameState, aiTag, isPlayer1, player1)
  if (winGame) return;

  let preventLoss = PreventLoss(gameState, playerTag, isPlayer1, player1)
  if (preventLoss) return;

  PickRandomSlot(gameState, isPlayer1, player1)    
}

const PreventLoss = (gameState, playerTag, isPlayer1, player1) => {   
  let surviveNeeded = false
  let goRandom = true
  gameState.forEach((arr, rowIdx) => {    
    arr.forEach((val, colIdx) => {      
      if (gameState[rowIdx][colIdx] === "" && goRandom) {
        surviveNeeded = AICheckGameState(gameState, rowIdx, colIdx, playerTag)
      }
      if (surviveNeeded && goRandom) {
        let aiMove = Utility.MapInPanel(isPlayer1, player1,document.querySelector(`[data-row='${rowIdx}'][data-col='${colIdx}']`), gameState)
        Utility.CheckGameOver(gameState, aiMove.tag, {row: rowIdx, col: colIdx});
        goRandom = false
      }
    })
  })
  return !goRandom
}

const WinGame = (gameState,  aiTag, isPlayer1, player1) => {
  let killTurn = false
  let goRandom = true
  gameState.forEach((arr, rowIdx) => {
    arr.forEach((val, colIdx) => {
      if (gameState[rowIdx][colIdx] === "" && goRandom) {
        killTurn = AICheckGameState(gameState, rowIdx, colIdx, aiTag)
      }
      debugger
      if (killTurn && goRandom) {
        let aiMove = Utility.MapInPanel(isPlayer1, player1,document.querySelector(`[data-row='${rowIdx}'][data-col='${colIdx}']`), gameState)
        Utility.CheckGameOver(gameState, aiMove.tag, {row: rowIdx, col: colIdx});
        goRandom = false
      }
    })
  })
  return !goRandom
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

const AICheckGameState = (gameState, rowIdx, colIdx, playerTag) => {
  gameState[rowIdx][colIdx] = playerTag;
  let isGameOver =  AICheckGameOver(gameState) 
  gameState[rowIdx][colIdx] = ""; 
  return isGameOver
}

const AICheckGameOver = (gameState) => {
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
  AIPlayer
}