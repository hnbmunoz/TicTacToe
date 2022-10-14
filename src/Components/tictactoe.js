import { CreateElement } from "../../utilities/utility.js"

const Container = () => {  
  let container = CreateElement('div')
  container.classList.add('tictactoe-container')
  container.classList.add('gameContainer')
  return container
}

const Panel = () => {
 let panel = CreateElement('div')
 panel.classList.add('tictactoe-panel')
 panel.classList.add('gamePanel')
 panel.setAttribute('data-gamePanel','gamePanel')
 return panel
}

const GameState = () => {
  let gameArr = [
    ["","",""],
    ["","",""],
    ["","",""],
  ]
  return gameArr
}

export {
  Container,
  Panel,
  GameState   
}