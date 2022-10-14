import { Container, Panel, GameState, Title, Annoucement } from "./Components/tictactoe.js";
import { WelcomeScreen } from "./Components/welcome.js";
import * as Utility from "../utilities/utility.js";
import { ResetButton, PrevMoveButton, NextMoveButton } from "./Components/controllers.js";
import { PlayerX, PlayerO } from "./Components/users.js";

let isPlayer1 = true;
let player1 = 'PlayerX'
let moveRepo = [];
let currMove = 0;
const app = () => {
  const root = document.getElementById("root");
  const App = Utility.CreateElement("div");
  App.classList.add("app");
  root?.appendChild(App);
  
  let isGameOver = false;
  let isDraw = false;
  let gameState = GameState();

  document.addEventListener("click", (e) => {
    if (e.target.dataset.disable === "true") return      
    if (e.target.dataset.button === "reset") {
      gameState = handleResetGame();
      Utility.GameControllers([], 0);
      return;
    }      
    if (e.target.dataset.button === "previous") {      
      let currState = Utility.CheckPrevMove(moveRepo, currMove, gameState);
      currMove = currState.currMove;
      gameState = currState.state
      isPlayer1 = !isPlayer1;
      Utility.GameControllers(moveRepo, currMove);
      return;
    }
    if (e.target.dataset.button === "next") {
      let currState = Utility.CheckNextMove(moveRepo, currMove, gameState);
      currMove = currState.currMove;
      gameState = currState.state;
      isPlayer1 = !isPlayer1;
      Utility.GameControllers(moveRepo, currMove);
      return;
    }
    if (isGameOver) return;
    if (e.target.dataset.gamepanel !== "gamePanel") return;
    if (e.target.innerHTML.trim() !== "") return;
    let tag = "";
    if (player1 === 'PlayerX') {
      isPlayer1 ? tag = PlayerX(e.target) : tag = PlayerO(e.target);
    } 
    
    if (player1 === 'PlayerO') {
      isPlayer1 ? tag = PlayerO(e.target) : tag = PlayerX(e.target);
    }
    
    currMove += 1;
    isPlayer1 = !isPlayer1;
    gameState[e.target.dataset.row][e.target.dataset.col] = tag;    
    moveRepo[currMove] = {row: e.target.dataset.row, col: e.target.dataset.col, player: tag, gameState }
    Utility.GameControllers(moveRepo, currMove);
    isGameOver = Utility.CheckGameOver(gameState, tag, {row: e.target.dataset.row, col: e.target.dataset.col});
    isDraw = Utility.CheckDrawGame(gameState, isGameOver);
    if (isGameOver || isDraw) {
      Utility.GameControllers([], 0);
    }
  });

  const handleResetGame = () => {
    let allPanels = document.querySelectorAll("[data-gamePanel]");
    [...allPanels].forEach((panels) => {
      panels.innerHTML = "";
      panels.classList.remove('winningPanel')
    });
    isGameOver = false;
    isPlayer1 = true;
    gameState = GameState();
    moveRepo = [];
    document.getElementById('declaration').innerHTML = "";
    return gameState;
  };    
  const PlayerSelected = (data) => {
    document.querySelector('.welcome-panel').style.transform = "translateY(-100vh)";   
    player1 = data.player1
  }

  WelcomeScreen(PlayerSelected)
  TicTacToeGame(App);
};

const TicTacToeGame = (App) => {
  let gameTitle = LoadGameTitle(App);
  let gameAnnoucement = LoadGameAnnouncement(App);
  let gameContainer = LoadGameContainer(App);
  let panelIdx = 0;
  GameState().forEach((arr, rowIdx) => {
    arr.forEach((panel, colIdx) => {
      LoadGamePanel(gameContainer, { rowIdx, colIdx }, panelIdx);
      panelIdx += 1;
    });
  });
  LoadGameController(App);
};

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

const LoadGamePanel = (gameContainer, gameStateIdx, panelIdx) => {
  let gamePanel = Panel();
  gamePanel.setAttribute("data-row", `${gameStateIdx.rowIdx}`);
  gamePanel.setAttribute("data-col", `${gameStateIdx.colIdx}`);
  gamePanel.setAttribute("data-panelidx", `${panelIdx}`);
  gameContainer.appendChild(gamePanel);
  return gamePanel;
};

const LoadGameController = (root) => {
  let gameController = Utility.CreateElement("div");
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

window.addEventListener('load', app, false);
