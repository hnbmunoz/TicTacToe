import * as Utility from "../../../utilities/utility.js";

const AIPlayer = (gameState, isPlayer1, player1 ) => {    
  let playerTag = AICheckPiece(!isPlayer1, player1)
  let aiTag = AICheckPiece(isPlayer1, player1)

  let winGame = BasicMoves(gameState, aiTag, isPlayer1, player1)
  if (!winGame.random) return {tag: winGame.tag, row: winGame.row, col: winGame.col};

  let preventLoss = BasicMoves(gameState, playerTag, isPlayer1, player1)
  if (!preventLoss.random) return {tag: preventLoss.tag, row: preventLoss.row, col: preventLoss.col};

  let getCenter = GetCenter(gameState, isPlayer1, player1)    
  if (!getCenter.random) return {tag: getCenter.tag, row: getCenter.row, col: getCenter.col};

  let getCorner = GetCorner(gameState, playerTag, isPlayer1, player1)    
  if (!getCorner.random) return {tag: getCenter.tag, row: getCenter.row, col: getCenter.col};

  return PickRandomSlot(gameState, isPlayer1, player1)      
}

const BasicMoves = (gameState, tag, isPlayer1, player1) => {
  let goRandom = false
  let selectedRow
  let selectedCol
  gameState.forEach((arr, rowIdx) => {
     arr.forEach((val, colIdx) => {
      if (gameState[rowIdx][colIdx] === "" && !goRandom) {
        goRandom = AICheckGameState(gameState, rowIdx, colIdx, tag)
        if (goRandom) {              
          selectedRow = rowIdx
          selectedCol = colIdx
        }
      }            
    })
  })
  if (goRandom) {
    return {...AIImplementSelection(gameState, isPlayer1, player1, selectedRow, selectedCol), random: !goRandom}
  }
  return {random: !goRandom}
}

const GetCenter = (gameState, isPlayer1, player1) => {
  let centerRow = Math.ceil(gameState.length / 2)
  let centerCol = Math.ceil(gameState[centerRow].length / 2)  
  if (gameState[centerRow - 1][centerCol - 1] === "") {    
    return {...AIImplementSelection(gameState, isPlayer1, player1, (centerRow - 1 ), (centerCol - 1 )), random: false}
  }
  return {random: true}
}

const GetCorner = (gameState, playerMove, isPlayer1, player1) => { 
  let emptyCorners = []
  if (gameState[0][0] === "") {
    emptyCorners.push({row: 0, col: 0})
  }
  if (gameState[0][gameState[0].length - 1] === "") {
    emptyCorners.push({row: 0, col: (gameState[0].length -1)})
  }
  if (gameState[gameState[0].length - 1][0] === "") {
    emptyCorners.push({row: (gameState[0].length - 1), col: 0})
  }
  if (gameState[gameState[0].length - 1][gameState[0].length - 1] === "") {
    emptyCorners.push({row: (gameState[0].length - 1), col: (gameState[0].length - 1)})
  }

  let centerRow = Math.ceil(gameState.length / 2)
  let centerCol = Math.ceil(gameState[centerRow].length / 2) 
  
  let randomEmptyCorner = emptyCorners[Math.floor(Math.random() * emptyCorners.length)]
  if (gameState[centerRow - 1][centerCol - 1] === playerMove && emptyCorners.length > 0) {        
    return {...AIImplementSelection(gameState, isPlayer1, player1, randomEmptyCorner.row, randomEmptyCorner.col), random: false}
  }

  return {random: true}
}

const PickRandomSlot = (gameState, isPlayer1, player1) => {  
  let emptyPanels = [...document.querySelectorAll(`[data-emptypanel='true']`)]
  let randomPanel = emptyPanels[Math.floor(Math.random() * emptyPanels.length)]
  
  return emptyPanels.length > 0 && AIImplementSelection(gameState, isPlayer1, player1, randomPanel.dataset.row, randomPanel.dataset.col)  
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

const AIImplementSelection = (gameState, isPlayer1, player1, selectedRow, selectedCol) => {  
  let aiMove = Utility.MapInPanel(isPlayer1, player1,document.querySelector(`[data-row='${selectedRow}'][data-col='${selectedCol}']`), gameState)
  Utility.CheckGameOver(gameState, aiMove.tag, {row: selectedRow, col: selectedCol});
  document.querySelector(`[data-row='${selectedRow}'][data-col='${selectedCol}']`).dataset.emptypanel = false
  return {tag: aiMove.tag, row: selectedRow, col: selectedCol}
}

export {
  AIPlayer
}