import { CreateElement } from "../../utilities/utility.js"
import { ResetButton, PrevMoveButton, NextMoveButton } from "./controllers.js"

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

const LoadGameTitle = (root) => {
  let gameTitle = Title();
  root.appendChild(gameTitle);
  return gameTitle;
};

const LoadGameAnnouncement = (root) => {
  let gameAnnoucement = Annoucement();
  root.appendChild(gameAnnoucement);
  return gameAnnoucement;
};

const LoadGameContainer = (root) => {
  let gameContainer = Container();
  root.appendChild(gameContainer);
  return gameContainer;
};

const LoadGamePanel = (gameContainer, gameStateIdx) => {
  let gamePanel = Panel();
  gamePanel.setAttribute("data-row", `${gameStateIdx.rowIdx}`);
  gamePanel.setAttribute("data-col", `${gameStateIdx.colIdx}`);
  gameContainer.appendChild(gamePanel);
  return gamePanel;
};

const LoadGameController = (root) => {
  let gameController = CreateElement("div");
  gameController.classList.add("gameController")

  let prevButton = PrevMoveButton();
  prevButton.classList.add('disabled-button');
  prevButton.setAttribute('data-disable','true');

  let nextButton = NextMoveButton();
  nextButton.classList.add('disabled-button');
  nextButton.setAttribute('data-disable','true');

  let resetButton = ResetButton();

  gameController.appendChild(prevButton);
  gameController.appendChild(nextButton);
  gameController.appendChild(resetButton);
  root.appendChild(gameController);
  return gameController;
};

const RemoveTicTacToeEdges = (GameState) => {
  document.querySelectorAll(`[data-row='0']`).forEach(panel => {
    panel.style.borderTop = "none";
  })

  document.querySelectorAll(`[data-row='${GameState.length - 1}']`).forEach(panel => {
    panel.style.borderBottom = "none";
  })

  document.querySelectorAll(`[data-col='0']`).forEach(panel => {
    panel.style.borderLeft = "none";
  })

  document.querySelectorAll(`[data-col='${GameState.length - 1}']`).forEach(panel => {
    panel.style.borderRight = "none";
  })
}

const InitializeTicTacToe = (App) => {
  let gameTitle = LoadGameTitle(App);
  let gameAnnoucement = LoadGameAnnouncement(App);
  let gameContainer = LoadGameContainer(App);
  GameState().forEach((arr, rowIdx) => {
    arr.forEach((panel, colIdx) => {
      LoadGamePanel(gameContainer, { rowIdx, colIdx });
    });
  });
  RemoveTicTacToeEdges(GameState());
  LoadGameController(App);
};

export { GameState, InitializeTicTacToe }