import * as Utility from "../../../utilities/utility.js";

const AISelected = (gameState, isPlayer1, player1 ) => {  

  Survive(gameState, !isPlayer1, !player1)
  return gameState = PickRandomSlot(gameState, isPlayer1, player1)  
}

const Survive = (gameState, isPlayer1, player1) => {
  gameState.forEach((arr, rowIdx) => {
    arr.forEach((val, colIdx) => {
      
    })
  })
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

export {
  AISelected
}