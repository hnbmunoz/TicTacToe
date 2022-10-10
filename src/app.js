import { Container, Panel, GameState } from "./Components/tictactoe.js";
import { CheckHorizontal, CheckCornerDiagonal, CheckReverseDiagonal, CheckVertical, CreateElement } from "../utilities/utility.js";
import { ResetButton } from "./Components/controllers.js";
import { PlayerX, PlayerO } from "./Components/users.js";

const app = () => {
  const root = document.getElementById("root");
  let isPlayer1 = true;
  let isGameOver = false;
  let gameState = GameState();

  const LoadGameContainer = (root) => {
    let gameContainer = Container();
    root.appendChild(gameContainer);
    return gameContainer;
  };

  const LoadGamePanel = (gameContainer, panelIdx) => {
    let gamePanel = Panel();
    gamePanel.setAttribute("data-row", `${panelIdx.rowIdx}`);
    gamePanel.setAttribute("data-col", `${panelIdx.colIdx}`);
    gameContainer.appendChild(gamePanel);
    return gamePanel;
  };

  const LoadGameController = (root) => {
    let gameController = CreateElement('div')
    let resetButton = ResetButton();
    gameController.appendChild(resetButton)
    root.appendChild(gameController);
    return gameController;
  };


  document.addEventListener("click", (e) => {
    if (isGameOver) return;
    if (e.target.dataset.gamepanel !== "gamePanel") return;
    if (e.target.innerHTML.trim() !== "") return;
    let tag = "";
    isPlayer1 ? (tag = "X") : (tag = "O");
    e.target.innerHTML = tag;
    isPlayer1 = !isPlayer1;
    gameState[e.target.dataset.row][e.target.dataset.col] = tag;
    isGameOver = handleGameOver(gameState, tag);
  });

  {
    let gameContainer = LoadGameContainer(root);
    GameState().forEach((arr, rowIdx) => {
      arr.forEach((panel, colIdx) => {
        LoadGamePanel(gameContainer, { rowIdx, colIdx });
      });
    });
    let gameController = LoadGameController(root)

  }
};

const handleNewGame = () => {
  
}

const handleGameOver = (gameState, player) => {  
  let isGameOver = (
    CheckHorizontal(gameState) ||
    CheckCornerDiagonal(gameState) ||
    CheckReverseDiagonal(gameState) ||
    CheckVertical(gameState)
  );

  isGameOver && alert(`${player} wins`)
  return isGameOver;
};

app();
