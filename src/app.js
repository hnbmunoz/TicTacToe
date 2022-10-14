import { Container, Panel, GameState } from "./Components/tictactoe.js";
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
  let gameState = GameState();

  document.addEventListener("click", (e) => {
    if (e.target.dataset.button === "reset") {
      handleResetGame();
      return;
    }
    if (e.target.dataset.button === "previous") {
      let currState = handlePrevMove(moveRepo, currMove, gameState);
      currMove = currState.currMove;
      gameState = currState.state
      isPlayer1 = !isPlayer1;
      return;
    }
    if (e.target.dataset.button === "next") {
      let currState = handleNextMove(moveRepo, currMove, gameState);
      currMove = currState.currMove;
      gameState = currState.state
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
    isGameOver = handleGameOver(gameState, tag, {row: e.target.dataset.row, col: e.target.dataset.col});
    isDraw = handleDrawGame(gameState, isGameOver);
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
  };

  const handlePrevMove = (moveRepo, currMove, gameState) => {
    let newCurrMove = currMove ;
    let cancelMove = moveRepo[newCurrMove];
    document.querySelector(`[data-row='${cancelMove.row}'][data-col='${cancelMove.col}']`).innerHTML = "";
    gameState[cancelMove.row][cancelMove.col] = ''
    return { currMove: newCurrMove - 1 , state: gameState}
  };

  const handleNextMove = (moveRepo, currMove, gameState) => {
    let newCurrMove = currMove + 1  
    let recoverMove = moveRepo[newCurrMove];
    document.querySelector(`[data-row='${recoverMove.row}'][data-col='${recoverMove.col}']`).innerHTML = `${recoverMove.player}`;
    gameState[recoverMove.row][recoverMove.col] = `${recoverMove.player}`;
    return { currMove: newCurrMove , state: gameState}
  };

  const PlayerSelected = (data) => {
    document.querySelector('.welcome-panel').style.transform = "translateY(-100vh)";
    [...document.querySelector('.welcome-panel').children].forEach(el => {
      el.style.transition = 'all 0.5s'
      setTimeout( el.style.opacity = '0', 500)
      setTimeout( el.style.display = 'none', 500)
    });
    player1 = data.player1
  }

  WelcomeScreen(PlayerSelected)
  TicTacToeGame(App);
};

const TicTacToeGame = (App) => {
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

const handleGameOver = (gameState, player, lastIndexClicked) => {
  let isGameOver =
    Utility.CheckHorizontal(gameState) ||
    Utility.CheckCornerDiagonal(gameState) ||
    Utility.CheckReverseDiagonal(gameState) ||
    Utility.CheckVertical(gameState);

  isGameOver && alert(`${player} wins`);
  isGameOver &&
    Utility.MapInBoard(lastIndexClicked, {
      horizontal: Utility.CheckHorizontal(gameState),
      vertical: Utility.CheckVertical(gameState),
      cornerDiagonal: Utility.CheckCornerDiagonal(gameState),
      reverseDiagonal: Utility.CheckReverseDiagonal(gameState),
    }, gameState);
  return isGameOver;
};

const handleDrawGame = (gameState, isGameOver) => {
  let isDraw = true
  gameState.forEach(arr => {
    arr.forEach(val => {
      if (val === "") {
        isDraw = false;
      }
    })
  })
  isDraw && !isGameOver && alert ("Game is a draw")
}

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
  let nextButton = NextMoveButton();
  let resetButton = ResetButton();

  gameController.appendChild(prevButton);
  gameController.appendChild(nextButton);
  gameController.appendChild(resetButton);
  root.appendChild(gameController);
  return gameController;
};

window.addEventListener('load', app, false);
