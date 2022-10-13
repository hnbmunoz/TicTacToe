import { Container, Panel, GameState } from "./Components/tictactoe.js";
import { WelcomeScreen } from "./Components/welcome.js";
import * as Utility from "../utilities/utility.js";
import { ResetButton } from "./Components/controllers.js";
import { PlayerX, PlayerO } from "./Components/users.js";

let isPlayer1 = true;
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
    if (isGameOver) return;
    if (e.target.dataset.gamepanel !== "gamePanel") return;
    if (e.target.innerHTML.trim() !== "") return;
    let tag = "";
    isPlayer1 ? (tag = "X") : (tag = "O");
    e.target.innerHTML = tag;
    isPlayer1 = !isPlayer1;
    gameState[e.target.dataset.row][e.target.dataset.col] = tag;
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
    // isPlayer1 = true;
    gameState = GameState();
  };

  const PlayerSelected = (data) => {

    document.querySelector('.welcome-panel').style.transform = "translateY(-100vh)";

    [...document.querySelector('.welcome-panel').children].forEach(el => {
      el.style.transition = 'all 0.5s'
      setTimeout( el.style.opacity = '0', 500)
      setTimeout( el.style.display = 'none', 500)
    });

    data.player1 === "PlayerO" && (isPlayer1 = false);

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
  gamePanel.setAttribute("data-panelIdx", `${panelIdx}`);
  gameContainer.appendChild(gamePanel);
  return gamePanel;
};

const LoadGameController = (root) => {
  let gameController = Utility.CreateElement("div");
  let resetButton = ResetButton();
  gameController.appendChild(resetButton);
  root.appendChild(gameController);
  return gameController;
};

app();
