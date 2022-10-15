import * as Utility from "../../../utilities/utility.js";



const AISelected = (gameState, ) => {  
  let randomSlot = PickRandomSlot(gameState)  
  // return randomSlots[randomSlots.length -1];
  // return randomSlots
  return randomSlot
}
const PickRandomSlot = (gameState, panelSlot = [{}]) => {
  let state = gameState

  let randomRow = Math.floor(Math.random() * gameState.length)
  let randomCol = Math.floor(Math.random() * gameState[randomRow].length)
  if (state[randomRow][randomCol] === "") {
    return {row: randomRow, col: randomCol}
    debugger
    // alert('')
    PickRandomSlot(state)   
    
  } else {
    PickRandomSlot(state)  
  }
  
}

export {
  AISelected
}