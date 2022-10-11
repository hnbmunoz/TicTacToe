import { Container, Panel, GameState } from "./Components/tictactoe.js";
import * as Utility from "../utilities/utility.js";
import { ResetButton } from "./Components/controllers.js";
import { PlayerX, PlayerO } from "./Components/users.js";

const app = () => {
  const root = document.getElementById("root");
  const App = Utility.CreateElement("div");
  App.classList.add("app");
  root?.appendChild(App);

  let isPlayer1 = true;
  let isGameOver = false;
  let gameState = GameState();

  document.addEventListener("click", (e) => {
    if (e.target.dataset.button === "reset") {
      handleResetGame();
    }
    if (isGameOver) return;
    if (e.target.dataset.gamepanel !== "gamePanel") return;
    if (e.target.innerHTML.trim() !== "") return;
    let tag = "";
    isPlayer1 ? (tag = "X") : (tag = "O");
    e.target.innerHTML = tag;
    isPlayer1 = !isPlayer1;
    gameState[e.target.dataset.row][e.target.dataset.col] = tag;
    isGameOver = handleGameOver(gameState, tag, e.target.dataset.panelidx);
  });

  const handleResetGame = () => {
    // let allPanels = document.querySelectorAll("[data-gamePanel=gamePanel]");
    let allPanels = document.querySelectorAll("[data-gamePanel]");
    [...allPanels].forEach((panels) => {
      panels.innerHTML = "";
    });
    isGameOver = false;
    isPlayer1 = true;
    gameState = GameState();
  };

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

const LoadGameContainer = (root) => {
  let gameContainer = Container();
  try {
    root.appendChild(gameContainer);
  } catch {}
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
