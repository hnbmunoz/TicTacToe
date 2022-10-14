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

const Title = () => {
  let title = CreateElement('div')
  let appTitle = CreateElement('label');
  title.classList.add('gameTitle');
  appTitle.innerHTML= "Tic Tac Toe";
  title.appendChild(appTitle);
  return title
}

const Annoucement = () => {
  let announcement = CreateElement('div');
  announcement.classList.add('announcement');

  let gameAnnouncement = CreateElement('label');
  gameAnnouncement.setAttribute('id','declaration');

  announcement.classList.add('gameAnnouncement');
  announcement.appendChild(gameAnnouncement);
  return announcement
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
  GameState,
  Title,
  Annoucement   
}